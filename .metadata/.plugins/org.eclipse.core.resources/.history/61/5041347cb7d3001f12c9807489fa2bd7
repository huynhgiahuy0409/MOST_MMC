Ext.define('MOST.view.codes.DelayCodeController', {
	extend: 'MOST.view.foundation.BaseViewController',
	
	requires: [
	],
		
	alias: 'controller.delaycode',
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	
	MAIN_GRID_REF_NAME: 'refDelayCodeGrid',
	MAIN_STORE_NAME: 'delayCodeGridList',
	DELAYCATEGORY_COMBOBOX_STORE: 'delayCodeCategoryCodeCombo',
	ACCEPTYN_STORE: 'AcceptYnCombo',
	DELAYCODEBULKTYPE_COMBOBOX_STORE: 'delayCodeBulkTypeCombo',
	ALL: 'All',
	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.codes.SearchDelayCodeParm');
		var bulkTypeCombo = me.getViewModel().getStore(me.DELAYCODEBULKTYPE_COMBOBOX_STORE);
		var categoryCombo = me.getViewModel().getStore(me.DELAYCATEGORY_COMBOBOX_STORE);
		var acceptCombo = me.getViewModel().getStore(me.ACCEPTYN_STORE);
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.YES_NO, me.ACCEPTYN_STORE);
		me.setComboBoxWithLocalCache(CacheServiceConstants.DELAY_CATEGORY, me.DELAYCATEGORY_COMBOBOX_STORE);
		
		bulkTypeCombo.load();
		
		acceptCombo.insert(0, [{codeName: me.ALL,code: ''}]);
		categoryCombo.insert(0, [{comName: me.ALL,comCode: ''}]);
		
		acceptCombo.commitChanges();
		categoryCombo.commitChanges();
		
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		
		me.updateViewStyle(me.getView());
	},
	
	onDetailLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var categoryCombo = me.getViewModel().getStore(me.DELAYCATEGORY_COMBOBOX_STORE);
		var bulkTypeCombo = me.getViewModel().getStore(me.DELAYCODEBULKTYPE_COMBOBOX_STORE);
		var acceptCombo = me.getViewModel().getStore(me.ACCEPTYN_STORE);
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.YES_NO, me.ACCEPTYN_STORE);
		me.setComboBoxWithLocalCache(CacheServiceConstants.DELAY_CATEGORY, me.DELAYCATEGORY_COMBOBOX_STORE);
		
		bulkTypeCombo.load();
		
		acceptCombo.insert(0, [{codeName: me.ALL,code: ''}]);
		categoryCombo.insert(0, [{comName: me.ALL,comCode: ''}]);
		
		acceptCombo.commitChanges();
		categoryCombo.commitChanges();
		
		if(recvData){
			refs.refdlyCd.setDisabled(true);
			refs.refbulkTp.setDisabled(true);
		}else{
			var recvData = Ext.create('MOST.model.codes.DelayCode');
		}
		
		me.getViewModel().setData({theDetail:recvData});
		me.updateViewStyle(me.getDetailBizView());
	},
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// Search Event Handler
	
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.MAIN_STORE_NAME);
    	var params = me.getSearchCondition();
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
	},
	
	// Grid Add
	onAdd: function() {
		var me = this;
		var refs = me.getReferences();
		
		me.openDetailPopup();
	},
	
	// Grid Row Double
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		me.openDetailPopup(selection);
	},
	
	// Key Column Editable
	setGridColumnEditable:function(isCreate){
		var me = this;
		var refs = me.getReferences();

		if(isCreate){ // ADD
			refs.refdlyCd.getEditor().setEditable(true);
			refs.refdlyCd.getEditor().setDisabled(false);
		} else { // UPDATE
			refs.refdlyCd.getEditor().setEditable(false);
			refs.refdlyCd.getEditor().setDisabled(true);
		}
	},
	
	// Grid Row Remove
	onRemove: function() {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME); 
		
		me.gridRemoveRow(grid, store, me.removeComplete);
	},
	
	onGridBilkComboRenderer: function(val, cell){
		var me = this;
        var refs = me.getReferences();
		var codeComboStore = null;
		var displayFieldName = 'scdDesc';
		var codeFieldName = 'scd';
		
		if(cell.column.dataIndex == 'bulkTp'){ 	
			codeComboStore = me.getViewModel().getStore(me.DELAYCODEBULKTYPE_COMBOBOX_STORE);
		}

		if(codeComboStore != null){
			var indx = -1;
			
			if(cell.column.dataIndex == 'bulkTp'){
				indx = codeComboStore.find(codeFieldName, val);
			} else {
				indx = codeComboStore.find(codeFieldName, val);
			}				

			if (indx != -1){
				return codeComboStore.getAt(indx).get(displayFieldName); 
			}
		}
		
		return '';
	},
	
	onChange: function(field, newValue){
		field.setValue(newValue.toUpperCase());
	},
	
	onExportExcelPdfWithServer: function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.codes.SearchDelayCodeParm';
		searchBizParm.serviceID = 'MOST.delayCode.selectDelayCodeList'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	
	 /**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */
	
	/**
	 * GENERAL METHOD START
	 * =========================================================================================================================
	 */
	// Search Condition
	getSearchCondition : function(){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		
		return params;
	},
	
	onDetailSave:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theDetail');
		
		if(detailView){
			if(me.validateDataByReference(me.DETAIL_REQUIRED_FIELDS, null) == false){
				MessageUtil.mandatoryFieldInValid();
				return;
			}
			me.saveProcess();
		}
	},
	
	saveProcess:function(){
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var detailItem = me.getViewModel().get('theDetail');
		var detailView = me.getDetailBizView();
		var isCreated = detailItem.phantom;
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
//		if(detailItem.get('bulkTp') == null || detailItem.get('bulkTp') == ''){
//			MessageUtil.warning("warning_msg", "Please select Bulk Type");
//			return;
//		}
		
		detailItem.set('userId',MOST.config.Token.getUserId());
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('userId', MOST.config.Token.getUserId());
		updateParm.set('item', detailItem.data);
		
		updateParm.save({
			success: function(record) {
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
						if (button === 'ok') {
							store.commitChanges();
							store.reload();
							me.onSearch();
							detailView.close();
						}
				});
			}
		});
	},
	
	removeComplete : function(me){
		MessageUtil.saveSuccess(); // Success Message
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});