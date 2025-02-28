Ext.define('MOST.view.popup.ColumnSettingPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		'MOST.model.common.ColumnSetting',
		'MOST.model.common.ColumnDisplay'
	],

	alias: 'controller.columnsettingpopup',	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_STORE_NAME : 'columnSettingCombo',					// Main Condition Store Name
	HIDDEN_COLUMN_GRID_REF_NAME : 'refHiddenColumnGrid',	// Hidden Column Grid Name 
	HIDDEN_COLUMN_STORE_NAME : 'columnSettingHiddenColumn',	// Hidden Column Store Name
	SHOW_COLUMN_GRID_REF_NAME : 'refShowColumnGrid',		// Show Column Grid Name
	SHOW_COLUMN_STORE_NAME : 'columnSettingShowColumn',		// Show Column Setting Store Name
	loadJsonString : null,										// SAVE JSON SEARCH CONDITION STRING
	DETAIL_MODEL_FULL_NAME : 'MOST.model.common.ColumnSetting',	// DETAIL MODEL
	DISPLAY_MODEL_FULL_NAME : 'MOST.model.common.ColumnDisplay', // DISPLAY MODEL
	GRID_COLUMN_STORE_NAME : 'columnSettingGridColumn',	// Grid Column Store Name
	DETAIL_ITEM_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/columnsetting/searchItems',	// DETAIL ITEM PROXY URL
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	
	activeGrid: null,
	gridList: null,
	
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		me.initializeControl();
	},
	
	initializeControl:function(){
		var me = this;
		var refs = me.getReferences();
		var gridStore = me.getStore(me.GRID_COLUMN_STORE_NAME);
		var detailItem = Ext.create(me.DETAIL_MODEL_FULL_NAME);
		var gridNameList = new Array();
		
		//added by Brian (2022/11/22) - to get grid list
		if(me.getView().recvData.screenType === CONSTANTS.SCREEN_MODE_DETAIL){
			this.gridList = Ext.ComponentQuery.query('tsb-datagrid', this.getParentView().down('form'));
		}else{
			this.gridList = Ext.ComponentQuery.query('tsb-datagrid', this.getParentView());
		}
		
		for(let grid of this.gridList){
			
			if(grid.referenceKey === me.SHOW_COLUMN_GRID_REF_NAME ||
			   grid.referenceKey === me.HIDDEN_COLUMN_GRID_REF_NAME){
				
				continue;
			}
			
			var gridNameItem = Ext.create(me.DETAIL_MODEL_FULL_NAME);
			
			gridNameItem.set("gridName",grid.referenceKey);
			
			if(grid.gridName !== ""){
				gridNameItem.set("gridName",grid.gridName);
				gridNameItem.set("gridReference",grid.referenceKey);
			}else{
				gridNameItem.set("gridName",grid.referenceKey);
				gridNameItem.set("gridReference",grid.referenceKey);
			}
			
			gridNameList.push(gridNameItem);
			
		}
		
		
		if(gridNameList.length > 0){
			detailItem.set('defaultCheck', 'N');
			detailItem.set('gridReference', gridNameList.at(0).get("gridReference"));
			me.getViewModel().setData({theDetail:detailItem});

			gridStore.setData(gridNameList)
			gridStore.commitChanges();
		}

	},
	
	
	loadViewSetting:function(grid){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		if(grid.lockedCount){
			detailItem.set('fixedColumn', grid.lockedCount);
		}
		
		var columns = grid.getVisibleColumns();
		grid.displayColumns = new Array(); 
		
		columns.forEach(function(column){
			grid.displayColumns.push(column.dataIndex);
    	});
	},
	
	
	// Grid Column Display
	displayHiddenGridColumn : function(arrHeader){
		
		var me = this;
		var showGrid = activeGrid;
		var hiddenColumnStore = me.getStore(me.HIDDEN_COLUMN_STORE_NAME);
		var showColumnStore = me.getStore(me.SHOW_COLUMN_STORE_NAME);
	    var columns = GridUtil.getColumns(showGrid);
		var displayItems = new Array();
		var sequenceDisplayItems = new Array();
		var hiddenItems = new Array();
		
		
		columns.forEach(function(column){
			var headerString = GridUtil.getGroupHeaderString(showGrid, column);;
			
			
			var copyDisplayModel = Ext.create(me.DISPLAY_MODEL_FULL_NAME);
			if(headerString)
			{
				copyDisplayModel.set('columnText', headerString);
			}else
			{
				copyDisplayModel.set('columnText', column.text);
			}
			
			copyDisplayModel.set('columnDataIndex', column.dataIndex);
			
			if(me.excludeSystemColumn(column) === false){
				if(me.isDisplayHeader(arrHeader, column)){
					displayItems.push(copyDisplayModel);
				} else {
					hiddenItems.push(copyDisplayModel);
				}
			}
		});
		
		if(arrHeader){
			arrHeader.forEach(function(columnName){
	    		var addColumn = Ext.Array.findBy(displayItems, function(column){
	    						if(column.get('columnDataIndex') === columnName){
	    							return true;
	    						}
	    					});
	    		if(addColumn !== null && addColumn){
	    			sequenceDisplayItems.push(addColumn);
	    		}
	    	});
		} else {
			sequenceDisplayItems = displayItems;
		}
		
		
		hiddenColumnStore.setData(hiddenItems);
		hiddenColumnStore.commitChanges();
		
		showColumnStore.setData(sequenceDisplayItems);
		showColumnStore.commitChanges();
	},
	
	// Is display header
	isDisplayHeader : function(arrHeader, column){
		if(arrHeader){
			var idx = arrHeader.indexOf(column.dataIndex);
			
			if(idx >= 0){
				return true;
			} else {
				return false;
			}
		}
		
		return true;
	},
	
	// Search Event Handler
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore(me.MAIN_STORE_NAME);
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
    	store.load({
			params: params,
			callback: function(records, operation, success) {
				if(success){
					
					if(activeGrid.columnId){
						var detailItem = me.getViewModel().get('theDetail');
						detailItem.set('no', activeGrid.columnId);
					}
				}
			}
		});
	},
	
	// Delete Button Event Handler
	onDelete : function(){
		var me = this;
		var refs = me.getReferences();
		var selectionItem = refs.ctlColumnSettingPopupDefaultCombo.getSelection();
		
		if(selectionItem){
			MessageUtil.question('remove', 'infodelete_msg', null,
					function(button){
						if (button === 'ok') {
							me.deleteProcess(selectionItem);
						}
					}
				);
		}
	},
	
	// Delete Process
	deleteProcess : function(selectionItem){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		var store = me.getStore(me.MAIN_STORE_NAME);
		
		store.remove(selectionItem);
		
		store.sync({
			success: function(){
				detailItem.set('no', null);
				me.displayHiddenGridColumn();
			}
		});
	},

	// Ok Button Event Handler
	onOk:function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var window = this.getView().up('window');
    	window.returnValue = me.getReturnData();
    	
    	var headerString = me.getHeaderString();
    	
    	activeGrid.displayColumns = headerString.split(GridUtil.SPLIT_CHAR); //값이 잘 세팅되는지?
    	activeGrid.columnId = refs.ctlColumnSettingPopupDefaultCombo.getValue(); //값이 잘 세팅되는지?
    	activeGrid.lockedCount = detailItem.get('fixedColumn');//값이 잘 세팅되는지?
    	
    	
    	GridUtil.settingColumn(activeGrid);
    	
       	window.close();
	},
	
	onCancel:function(){
		var me = this;
		var window = this.getView().up('window');
    	window.returnValue = null;
       	window.close();
	},
	
	// Save Button
	onSave : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var infoForm = me.getView();
		
		if(infoForm.isValid()){
			me.saveProcess();
			
		} else {
			MessageUtil.mandatoryFieldInValid();
		}
	},
	
	// Combo Change Event Handler
	onColumnSettingGridComboChange : function(combo){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		
		store.clearFilter();
		store.clearData();
		store.commitChanges();
		
		for(let grid of this.gridList) {
           if(grid.referenceKey === combo.getSelection().get("gridReference")){
        	   	activeGrid = grid
        	   	
	       		if(activeGrid.enableFreeze === false){
	       			refs.ctlColumnSettingPopupFreezeCount.setDisabled(!me.getView().recvData.enableFreeze);
	       		}
        	   	
        	   break;
           }
	    }
		
		var params = me.getSearchCondition();
 	   
		
 	   	store.load({
 			params: params,
 			callback: function(records, operation, success) {
 				var detailItem = me.getViewModel().get('theDetail');
 				
 				if(success){
 					
 					if(activeGrid.columnId){
 						var detailItem = me.getViewModel().get('theDetail');
 						detailItem.set('no', activeGrid.columnId);
 						
 	 					me.loadViewSetting(activeGrid);
 						me.displayHiddenGridColumn(activeGrid.displayColumns);
 						
 					}else if(records.length > 0){ 
 						activeGrid.columnId = records[0].get("no");
 						detailItem.set('no', activeGrid.columnId);
 						detailItem.set('defaultCheck', records[0].get("defaultCheck"));
 					}else{
 						activeGrid.columnId = "";
 						detailItem.set('no', "");
 						detailItem.set('defaultCheck', "N");
 						
 	 					me.loadViewSetting(activeGrid);
 						me.displayHiddenGridColumn(activeGrid.displayColumns);
 					}
 				}
 			}
 	   	}); 
		
	},
	
	// Combo Change Event Handler
	onColumnSettingPopupComboChange : function(combo){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		if(combo.getSelection()){
			var selectionItem = combo.getSelection();
			
			//added by Brian (2022/11/28)
			detailItem.set('defaultCheck', selectionItem.get('defaultCheck'));
			
			if(!refs.ctlColumnSettingPopupFreezeCount.disabled)
			{
				detailItem.set('fixedColumn', selectionItem.get('fixedColumn'));
			}
			me.setColumnWithHeaderString(selectionItem);
		} else {
			if(StringUtil.isNullorEmpty(combo.getValue())){
				detailItem.set('no', null);
			}
		}
	},
	
	// Reset Event Handler
	onReset : function(){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var detailItem = me.getViewModel().get('theDetail');
		var columnId = detailItem.get('no');
		
		var idx = store.findExact('no', columnId);
		
		if(idx >= 0){
			var selectionItem = store.getAt(idx);
			
			detailItem.set('defaultCheck', selectionItem.get('defaultCheck'));
			detailItem.set('fixedColumn', selectionItem.get('fixedColumn'));
			
			me.setColumnWithHeaderString(selectionItem);
		}
	},
	
	// Set Column with header string
	setColumnWithHeaderString : function(selectionItem){
		var me = this;
		
		if(selectionItem){
			var header = selectionItem.get('header');
			
			if(!StringUtil.isNullorEmpty(header)){
				var arrHeader = header.split(GridUtil.SPLIT_CHAR);
				
				if(CONSTANTS.MODULE == 'Stat')
				{
					var newHeaders =  new Array();
					
					var grid = activeGrid;
					var columns = grid.getVisibleColumns();
					columns.forEach(function(column){
						
						if(column.dataIndex.startsWith('group'))
						{
							newHeaders.push(column.dataIndex);
						}
			    	});
					
					arrHeader.forEach(function(column){
						
						if(!column.startsWith('group'))
						{
							
							newHeaders.push(column);
						}
			    	});
					
					arrHeader = newHeaders;

				}
				
				me.displayHiddenGridColumn(arrHeader);
			}
		}
	},
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Exclude System Column
	excludeSystemColumn : function(column){
		if(StringUtil.isNullorEmpty(column.dataIndex)){
			return true;
		}
		
		return false;
	},
	
	// Save Process
	saveProcess : function(){
		var me = this;
		var parentView = me.getParentView();
		var viewId = parentView.xtype;
     	var pgmCode = MOST.config.Token.getPgmCode();
		var detailItem = me.getViewModel().get('theDetail');
		
		var previousFixedColumn  = detailItem.get('fixedColumn');
		
		
		detailItem.set('code', pgmCode);
		detailItem.set('menu', viewId);
		detailItem.set('seq', 0);
		detailItem.set('header', me.getHeaderString());
		
		if(detailItem.get('header').indexOf('group') != -1)
		{
			detailItem.set('fixedColumn', 0);
		}
		
		var proxy = detailItem.getProxy();
		proxy.url = me.DETAIL_ITEM_PROXY_URL;
		
		detailItem.save({
			success : function(record){
				detailItem.set('fixedColumn', previousFixedColumn);
				me.onOk();
			}
		});
	},
	
	// Header List String
	getHeaderString : function(){
		var me = this;
		var header = '';
		var showColumnStore = me.getStore(me.SHOW_COLUMN_STORE_NAME);
		var i = 0;
		
		showColumnStore.each(function(record){
			if(i===0){
				header = record.get('columnDataIndex');
			} else {
				header += GridUtil.SPLIT_CHAR + record.get('columnDataIndex');
			}
				
			i++;
		});
		
		return header;
	},
	
	// Get return data
	getReturnData:function(record){
		var me = this;
		var refs = me.getReferences();
		
		return null;
	},
	
	// Get Search Condition
	getSearchCondition : function(){
		var me = this;
		var refs = me.getReferences();
		
		var parentView = me.getParentView();
		var viewId = parentView.xtype;
     	var pgmCode = MOST.config.Token.getPgmCode();
     	
		var params = {
			code : pgmCode,
			menu : viewId,
			gridReference: refs.ctlColumnSettingPopupGridCombo.getValue()
		}
		
    	return params;
		
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GRID EVENT HANDLER START
	 */
	// Grid Drop Event
	selectedDrop : function(node, data, dropRec, dropPosition){
		var me = this;
		me.setDisplayColumn();
	},
	
	// Set Display Column Data
	setDisplayColumn : function(){
		var me = this;
		var store = me.getStore(me.SHOW_COLUMN_STORE_NAME);
		var selectionData = '';
		
		store.each(function(record, idx) {
			selectionData += ',' + record.get('dataIndexName');
		});
		
		me.view.selectionData = selectionData;
	},
	
	// right Arrow
	onGridRight: function() {
		var me = this;
		var leftStore = me.getStore(me.HIDDEN_COLUMN_STORE_NAME);
		var rightStore = me.getStore(me.SHOW_COLUMN_STORE_NAME);
		var leftGrid = me.lookupReference(me.HIDDEN_COLUMN_GRID_REF_NAME);
		var selections = leftGrid.getSelection() == null ? null : leftGrid.getSelectionModel().getSelection();
		
		leftGrid.getSelectionModel().deselectAll();
		leftGrid.getSelectionModel().clearSelections();
		
		Ext.each(selections, function (record) {
			rightStore.add(record);
			leftStore.remove(record);
		});
		
		leftStore.commitChanges();
		rightStore.commitChanges();
	},
	
	// left Arrow
	onGridLeft: function() {
		
		var me = this;
		var leftStore = me.getStore(me.HIDDEN_COLUMN_STORE_NAME);
		var rightStore = me.getStore(me.SHOW_COLUMN_STORE_NAME);
		var rightGrid = me.lookupReference(me.SHOW_COLUMN_GRID_REF_NAME);
		var selections = rightGrid.getSelection() == null ? null : rightGrid.getSelectionModel().getSelection();
		
		rightGrid.getSelectionModel().deselectAll();
		rightGrid.getSelectionModel().clearSelections();
		
		Ext.each(selections, function (record) {
			if(record.data.columnDataIndex.indexOf('group') == -1)
			{
				leftStore.add(record);
				rightStore.remove(record);
			}
			
		});
		
		leftStore.commitChanges();
		rightStore.commitChanges();
	},
	
	// Left Grid double click
	onHiddenColumnGridDblClick: function (dv, record, item, index, e) {
		var me = this;
		me.onGridRight();
	},
	
	// Right Grid double click
	onShowColumnGridDblClick: function (dv, record, item, index, e) {
		var me = this;
		me.onGridLeft();
	},
	
	// List Grid Selection Change
	onHiddenColumnGridSelectionChange: function(selectable, selectRecords, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.HIDDEN_COLUMN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection && selection.length > 0){
			refs.ctlColumnSettingRight.setDisabled(false);
		} else {
			refs.ctlColumnSettingRight.setDisabled(true);
		}
	},
	
	// Confirm Grid Selection Change
	onShowColumnGridSelectionChange: function(selectable, selectRecords, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.SHOW_COLUMN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection && selection.length > 0){
			refs.ctlColumnSettingLeft.setDisabled(false);
		} else {
			refs.ctlColumnSettingLeft.setDisabled(true);
		}
	}
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
});