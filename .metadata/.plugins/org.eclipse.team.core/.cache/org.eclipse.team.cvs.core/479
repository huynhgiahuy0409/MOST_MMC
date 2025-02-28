Ext.define('MOST.view.planning.RosterConfigurationOthersController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.rosterconfigurationmonthlyothers',	

	MAX_DAY_COUNT : 7,
	selectWeekGap : 0,
	arrColor : ['#FFFFFF','#FFFFAD','#80FF80','#8080C0','#FF8080','#FF8040','#FFACFF'],
	dragValue : '',
	dragName: '',
	dragType: '',
	dragColor : '',
	dragObj : {
		startRowIndex : 0,
		endRowIndex : 0,
		startCellIndex : 0,
		endCellIndex : 0
	},
	
	MAIN_GRID_REF_NAME: 'refRosterOthersGrid',
	MAIN_STORE_NAME: 'stafflList',
	UNIT_DROP_DOWN_STORE: 'unitDropDownListCombo',
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var view = me.getView();
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.planning.SearchRosterConfigurationOthersParm');
		
		me.setDateInDays("ctlStartingDate");
		
		refs.ctlBtn1Week.setUI("create-button");
		refs.refRadioField.setValue({
			rst : 'select'
		});

		var costCenterCombo = me.getStore('costCenterCombo');
		var workingAreaCombo = me.getStore('workingAreaCombo');
		var roleCombo = me.getStore('roleCombo');
		var shiftTypeCombo = me.getStore('shiftTypeCombo');
		var reasonCombo = me.getStore('reasonCombo');

		me.setComboBoxWithLocalCache(CacheServiceConstants.UNIT_DROP_DOWN_COMBOBOX, me.UNIT_DROP_DOWN_STORE);
		
		costCenterCombo.load();
		workingAreaCombo.load();
		roleCombo.load();
		shiftTypeCombo.load();
		reasonCombo.load();
		
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		me.setGridHeader();
	},
	
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	
	onSearch: function(){
		var me = this;
		var stafflListStore = me.getStore(me.MAIN_STORE_NAME);
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
    	stafflListStore.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					me.setGridHeader();
				}
			}
		});
	},
	
	onSave: function(){
		var me = this;
    	var refs = me.getReferences();	
    	var store = me.getStore(me.MAIN_STORE_NAME);
    	var arrItems = new Array();
    	var masterItem = Ext.create('MOST.model.planning.RosterConfigurationOthers');
    	var grid = refs.refRosterOthersGrid;
    	
		store.each(function(record,index){
			if(record.dirty){
				for ( var i = 0 ; i < grid.getColumns().length - 5; i++){
					var deliUpdateCd = record.data.deliUpdateCd.trim();
					var deliDeleteCd = record.data.deliDeleteCd.trim();
					var arrUpdates = deliUpdateCd.split('|');
					var arrExists = new Array();
					var bExists = false;
					
					if(grid.getView().getRow(index) != null){
						var cdDateNm = "cdDate" + (i+1);
						var cdTpDateNm = "cdTpDate" + (i+1);
						var codeValue = record.get(cdDateNm);
						var codeType = record.get(cdTpDateNm);
	
						if(codeValue.trim() == ""){
							deliUpdateCd = '';
							
							for (var j=0; j<arrUpdates.length; j++) {
								if (arrUpdates[j].toString() != (i+1).toString()) {
									if (deliUpdateCd == '') {
										deliUpdateCd = arrUpdates[j].toString();
									} else {
										deliUpdateCd += '|' + arrUpdates[j].toString();
									}
								}
							}
						}else {
							if (deliUpdateCd == '') {
								deliUpdateCd = (i+1).toString();
							} else {
								arrExists = deliUpdateCd.split('|');
								bExists = false;
								
								for (var j=0; j<arrExists.length; j++) {
									if (arrExists[j].toString() == (i+1).toString()) {
										bExists = true;
										break;
									}
								}
								
								if (bExists == false) {
									deliUpdateCd += '|' + (i+1).toString();
								}
							}
						}
						
						var cdNmDateNm = "cdNmDate" + (i+1);
						
						if (deliDeleteCd == '') {
							if(record.get(cdNmDateNm).trim() == ''){
								deliDeleteCd = (i+1).toString();
							}
						} else {
							arrExists = deliDeleteCd.split('|');
							bExists = false;
							
							for (var k=0; k<arrExists.length; k++) {
								if (arrExists[k].toString() == (i+1).toString()) {
									bExists = true;
									break;
								}
							}
							
							if (bExists == false) {
								if(record.get(cdNmDateNm).trim() == ''){
									deliDeleteCd += '|' + (i+1).toString();
								}
							}
						}
						
						record.data.deliUpdateCd =deliUpdateCd;
						record.data.deliDeleteCd =deliDeleteCd;
						record.data.userId = MOST.config.Token.getUserId();
					}
				}
				
				arrItems.push(record.data);
			}
		});

		if(arrItems.length>0){
			var proxy = masterItem.getProxy();
			
			proxy.url=store.getProxy().url;
			masterItem.set("items",arrItems);
			grid.setLoading(true);
			
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			var isCreated = masterItem.phantom;
			
			updateParm.getProxy().url = store.getProxy().url;
			updateParm.phantom = isCreated;
			updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
			updateParm.set('userId', MOST.config.Token.getUserId());
			updateParm.set('item', masterItem.data);
			
			updateParm.save({
				success:function(){
					grid.setLoading(false);
					MessageUtil.saveSuccess();
					me.onSearch();
				}
			});
		}
    },
    
    onClickWeek: function (control){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refRosterOthersGrid;
     	var intWeek;
     	
		refs.ctlBtn1Week.setUI("default-toolbar-small");
		refs.ctlBtn2Week.setUI("default-toolbar-small");
		refs.ctlBtn3Week.setUI("default-toolbar-small");
		refs.ctlBtn4Week.setUI("default-toolbar-small");
		refs.ctlBtn5Week.setUI("default-toolbar-small");

     	if(control.reference == 'ctlBtn1Week'){
     		intWeek = 0;
     	}else if(control.reference == 'ctlBtn2Week'){
     		intWeek = 7;
     	}else if(control.reference == 'ctlBtn3Week'){
     		intWeek = 14;
     	}else if(control.reference == 'ctlBtn4Week'){
     		intWeek = 21;
     	}else if(control.reference == 'ctlBtn5Week'){
     		intWeek = 28;
     	}
     	
     	control.setUI("create-button");
     	
     	me.selectWeekGap = intWeek;
     	me.setGridHeader();
	},
	
	onChangeShiftType:function(field, newValue){
		var me = this;
		var refs = me.getReferences();
		var ctlReason = refs.ctlReason;
		
		if(ctlReason.getValue() == null || ctlReason.getValue() == ""){
			var ctlColor = refs.ctlColor;
			var colorStyle = "background-color: #FFFFFF";
			
			ctlColor.setFieldStyle(colorStyle);
			me.dragValue = "";
			me.dragName = "";
			me.dragType - "";
			me.dragColor = "#FFFFFF";
		}
		
		var shiftGroupCombo =  me.getStore('shiftGroupCombo');
		var ctlShiftGroup = refs.ctlShiftGroup;
		
		ctlShiftGroup.setValue("");
		shiftGroupCombo.load({
			params : {
				shftDivCd : newValue.data.shftTpCd,
			}
		});
	},
	
	onChangeShift: function(field, newValue){
		var me = this;
		var refs = me.getReferences();
		var ctlReason = refs.ctlReason;
		var ctlColor = refs.ctlColor;
		var colorStyle = "background-color: " + me.arrColor[newValue.data.shftIdx] + ";";

		if(newValue.data.shftId === ""){
			colorStyle = "background-color: #FFFFFF";
			ctlReason.setValue('');
			ctlColor.setFieldStyle(colorStyle);
			me.dragValue = "";
			me.dragName = "";
			me.dragType = "";
			me.dragColor = null;
			
			return;
		}

		ctlReason.setValue('');
		ctlColor.setFieldStyle(colorStyle);
		
		me.dragValue = newValue.data.shftId;
		me.dragName = newValue.data.shftNm;
		me.dragType = "";
		me.dragColor = me.arrColor[newValue.data.shftIdx];
	},
	
	onChangeReason: function(field, newValue){
		var me = this;
		var refs = me.getReferences();
		var ctlShiftGroup = refs.ctlShiftGroup;
		var ctlColor = refs.ctlColor;
		var colorStyle = "background-color: #83B1F9";

		if(newValue.data.scd === ""){
			colorStyle = "background-color: #FFFFFF";
			ctlColor.setFieldStyle(colorStyle);
			me.dragValue = "";
			me.dragName = "";
			me.dragType = "";
			me.dragColor = null;
			
			return;
		}

		var shiftGroupCombo =  me.getStore('shiftGroupCombo');
		
		ctlShiftGroup.setValue('');
		ctlColor.setFieldStyle(colorStyle);
		
		me.dragValue = newValue.data.scd;
		me.dragName = newValue.data.scdNm;
		me.dragType = "DOSHFT";
		me.dragColor = "#83B1F9";
	},

	onRosterOthersPreviewPDF:function(){
		var me = this;
		var refs = me.getReferences();
		var generatePDF = me.getStore('generatePDF');
		var params = me.getSearchCondition();
		
		generatePDF.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					me.openPDFPreview (records, operation, success);
				}
			}
		})
	},

	onExportBtnClick:function(){
		var me = this;
		var refs = me.getReferences();

		me.getView().detailViewAlias = 'popup-exporttypepopup';
		me.openDetailPopup(null);
	},

	onExport : function(){
		var me = this;
		
		me.onDetailDownload();
	},

	onCancle:function(){
		var win = Ext.WindowManager.getActive();
		
		if (win){
			win.close();
		}
	},
	
	onPreviewLoad:function(){
		var me = this;
		var refs = me.getReferences();
		
		me.visibleDetailToolButton(ViewUtil.TOOL_SAVE, false);
		me.visibleDetailToolButton(ViewUtil.TOOL_DELETE, false);
		me.visibleDetailToolButton(ViewUtil.TOOL_PREVIEW, false);
	},
	
	onDetailDownload:function(){
		var me = this;
		var refs = me.getReferences();
		var params = me.getSearchCondition();
		var generatePDF = me.getStore('generatePDF');
		
		params['exportTp'] = refs.refRadioReportType.getValue().rb
		
		generatePDF.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					var content = records[0].data.content.replace(/&lt;/gi,'<').replace(/&gt;/gi,'>'); 
					
					Ext.exporter.File.saveBinaryAs(content, records[0].data.fileName);
				}
			}
		})
	},
	
	onDownloadExport:function(){
		var me = this;
		var detailView = me.lookupReference(me.getView().detailViewAlias);
		
		me.onDetailDownload();
		
		if(detailView){
			detailView.close();
		}
	},
	
	onDownloadCancel:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.lookupReference(me.getView().detailViewAlias);
		
		if(detailView){
			detailView.close();
		}
	},
	
	onExportExcelPdfWithServer: function(){
		
	},
	
	onSelectTypeChange : function(radio, newValue, oldValue, eOpts){
		var me= this;
		var grid = me.lookupReference('refRosterOthersGrid');
		
		me.shiftSetType = radio.getValue().rst;
		
		if(me.shiftSetType === 'drag'){
			grid.getSelectionModel().setRowSelect(false);
			grid.getSelectionModel().setCellSelect(true);
			Ext.ComponentQuery.query('[xtype="rownumberer"]', grid)[0].setHidden(false);
		} else {
			grid.getSelectionModel().setRowSelect(true);
			grid.getSelectionModel().setCellSelect(false);
		}
	},

	onCellMouseDown : function(cell, td, cellIndex, record, tr, rowIndex, e, eOpts){
		var me = this;
		
		if(cellIndex < 4){
			return;
		}
		
		me.dragObj.startRowIndex = rowIndex;
		me.dragObj.startCellIndex = cellIndex;
	},

	onCellMouseUp : function(cell, td, cellIndex, record, tr, rowIndex, e, eOpts){
		var me = this;
		
		if(cellIndex < 4 || (me.dragObj.startCellIndex !== cellIndex && me.dragObj.startRowIndex !== rowIndex)){
			return;
		}
		
		me.dragObj.endRowIndex = rowIndex;
		me.dragObj.endCellIndex = cellIndex;

		if(me.shiftSetType === 'drag'){
			if(me.dragObj.startRowIndex === me.dragObj.endRowIndex
				&& me.dragObj.startCellIndex !== me.dragObj.endCellIndex){
				me.selectDragHorizontal();
			} else {
				me.selectDragVertical();
			}
		} else {
			me.showCellInfo(td, record);
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
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
     	var rstrYmd = refs.ctlStartingDate.getRawValue();
     	
    	params['rstrYmd'] = rstrYmd;
    	params['userId'] = MOST.config.Token.getUserId();
    	params['exportTp'] = '';
    	
    	return params;
	},
	
	setGridHeader : function(){
		var me = this;
     	var refs = me.getReferences();
     	var rstrYmd = refs.ctlStartingDate.getValue();
     	var grid = refs.refRosterOthersGrid;
     	var incDay = "";
     	var headerDay = ""
     	var dt = new Date(rstrYmd);
     	
     	dt.setDate(dt.getDate()+me.selectWeekGap);
     	
     	for (var i = 5; i < grid.getColumns().length; i++){
			var column = grid.getColumns()[i];
			
			column.hide();
		}
     	
		for (var i = me.selectWeekGap; i < (me.selectWeekGap + me.MAX_DAY_COUNT); i++){
			headerDay = Ext.Date.format(dt, 'd/m\\(') + Ext.Date.format(dt, 'l').substring(0,3) + ")";
			dt.setDate(dt.getDate()+1);
			
			var column = grid.getColumns()[i+5];
			
			grid.headerCt.getHeaderAtIndex(i+5).setText(headerDay);
			
			column.renderer = function(value,data) {
				if(data != null){
					incDay = 'cdNmDate' + (data.column.fullColumnIndex-3);
					value = data.record.get(incDay);
					
					var colorNm = incDay.replace('cdNmDate','cdColor');
					var colorCd = data.record.get(colorNm);
					var colorStr = colorCd.replace('0x', '#');
					var colorStyle = "background-color: " + colorStr + ";";
					
					data.style = colorStyle;
					
					return value;
				}
            }
			
			column.show();
		}
	},
	
	selectDragHorizontal : function(){
		var me= this;
		var startIdx = (me.dragObj.startCellIndex < me.dragObj.endCellIndex) ? me.dragObj.startCellIndex : me.dragObj.endCellIndex;
		var endIdx = (me.dragObj.startCellIndex < me.dragObj.endCellIndex) ? me.dragObj.endCellIndex : me.dragObj.startCellIndex;
		var grid = me.lookupReference('refRosterOthersGrid');
		var view = grid.getView();
		var row = view.getRow(me.dragObj.startRowIndex);
		var record = view.getRecord(row);

		for(var i = startIdx; i <= endIdx; i++){
			var cell = view.getCell(record, view.getGridColumns()[i-me.selectWeekGap + 1]);
			
			me.selectCell(cell, record);
		}
	},

	selectDragVertical : function(){
		var me = this;
		var startIdx = (me.dragObj.startRowIndex < me.dragObj.endRowIndex) ? me.dragObj.startRowIndex : me.dragObj.endRowIndex;
		var endIdx = (me.dragObj.startRowIndex < me.dragObj.endRowIndex) ? me.dragObj.endRowIndex : me.dragObj.startRowIndex;
		var grid = me.lookupReference('refRosterOthersGrid');
		var view = grid.getView();

		for(var i = startIdx; i <= endIdx; i++){
			var row = view.getRow(i);
			var record = view.getRecord(row);
			var cell = view.getCell(record, view.getGridColumns()[me.dragObj.startCellIndex-me.selectWeekGap + 1]);
			
			me.selectCell(cell, record);
		}
	},

	selectCell : function(cell, record){
		var me = this;
		
		me.setCellStyle(cell);
		me.setRecord(cell, record);
	},

	setCellStyle : function(cell){
		var me = this;
		
		cell.style.backgroundColor = me.dragColor;
		cell.textContent = me.dragName;
		cell.id =  me.dragType + "|" + me.dragValue;
		cell.style.textAlign = 'center';
		cell.style.verticalAlign = 'middle';
	},

	setRecord : function(cell, record){
		var me = this;
		var cdDateNm = "cdDate" + (cell.cellIndex - 3 + me.selectWeekGap);
		var cdTpDateNm = "cdTpDate" + (cell.cellIndex - 3 + me.selectWeekGap);
		var cdNmDate = "cdNmDate" + (cell.cellIndex - 3 + me.selectWeekGap);
		var cdColor = "cdColor" + (cell.cellIndex - 3 + me.selectWeekGap);

		record.set(cdDateNm,me.dragValue);
		record.set(cdTpDateNm,me.dragType);
		record.set(cdNmDate,me.dragName);
		record.set(cdColor,me.dragColor);
		record.data.userId = MOST.config.Token.getUserId();
	},

	showCellInfo : function(cell, record){
		var me = this;
		var cdNmDate = "cdNmDate" + (cell.cellIndex-4);
		var shiftName = record.get(cdNmDate);
		
		me.lookupReference('refShiftNm').setValue(shiftName);
	},

	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */

});