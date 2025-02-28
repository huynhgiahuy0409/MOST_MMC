Ext.define('MOST.view.billing.InvoiceUnitController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.invoiceunit',
	

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refinvoiceUnitGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'invoiceUnitList',	
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
		var searchParm = Ext.create('MOST.model.billing.SearchInvoiceUnitParm');
		
		var invoiceUnitTypeCombo = me.getStore('invoiceUnitTypeCombo');
		var SearchinvoiceUnitTypeCombo = me.getStore('SearchinvoiceUnitTypeCombo');
		
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		
		searchParm.set('progress', 'N');
		
		SearchinvoiceUnitTypeCombo.load();
		invoiceUnitTypeCombo.load();
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
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					// SUCCES
				}
			}
		});
	},
	
	// Grid Add
	onAdd: function() {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var editor = grid.getPlugin('invoiceUnitEditor');
		var record = Ext.create('MOST.model.billing.InvoiceUnit');
		
		editor.cancelEdit();
		
		//Clear filter for Grid
		grid.filters.clearFilters();
		grid.filters.disable();
		
		//Clear filter for Store
		store.clearFilter();
		
		var idx = 0;
		if(grid.getSelection() && grid.getSelection().length>0) {
			idx = store.indexOfId(grid.getSelection()[0].get('id'));
		}
		
		record.data.userId=MOST.config.Token.getUserId();    	
		store.insert(idx, record);
		grid.getSelectionModel().select(record);
		refs.refUnitCd.getEditor().setEditable(true);
		refs.refUnitCd.getEditor().setDisabled(false);
		
		editor.startEdit(record);
	},
	
	// Grid Edit
	onEdit : function(editor, context){
		var me = this;
		me.gridEdit(editor, context);
	},
	
	// Grid Validate Edit
	onValidateEdit : function(editor, context) {
		var me = this;
		var refs = me.getReferences();
		var duplicateCheckStore = me.getStore('InvoiceUnitDuplicateCheck');
		var code = context.newValues.unitCd;
		
		var params = {
				searchTp:'IV_UNIT',
				unitCd: code
		}
		
		me.gridDupliationCheck(editor, context, duplicateCheckStore, params);
	},
	
	// Grid Cancel Edit
	onCancelEdit : function(rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},
	
	// Grid Row Remove
	onRemove: function() {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME); 
		
		var selection = grid.getSelection() == null ? null: grid.getSelection()[0];
		
		if(selection){
			Ext.Msg.show({
				   title:  MOST.getApplication().bundle.getMsg('remove'),
				   message: MOST.getApplication().bundle.getMsg('removeyn_msg'),
			       buttons: Ext.Msg.YESNO,
			       icon: Ext.Msg.QUESTION,
			       fn: function(btn) {
			    	   if (btn === 'yes') {
			    		store.remove(selection);
						store.sync({
							success: function(){
								store.reload({
									callback: function(records, operation, success) {
										if(success){
											var success = MOST.getApplication().bundle.getMsg('success_msg');
									        var msg = MOST.getApplication().bundle.getMsg('savesuccess_msg');
									        Ext.Msg.alert(success, msg);
										}
									}
								});
								
							}
						})
			    		
			    	   }
			       }
			 });
		}else{
			Ext.Msg.alert('Warning', TSB.locale.i18n.Bundle.instance.getMsg('selectdatatoremove_msg'));
		}
		
	},
	
	// Grid Row Double
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		me.setGridColumnEditable(selection.phantom);
	},
	
	// Key Column Editable
	setGridColumnEditable:function(isCreate){
		var me = this;
		var refs = me.getReferences();

		if(isCreate){ // ADD
			refs.refUnitCd.getEditor().setEditable(true);
			refs.refUnitCd.getEditor().setDisabled(false);
		} else { // UPDATE
			refs.refUnitCd.getEditor().setEditable(false);
			refs.refUnitCd.getEditor().setDisabled(true);
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
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var unitTpCd = StringUtil.toUpperCase(searchParm.data.unitTpCd);
		if(unitTpCd == 'SELECT'){
			unitTpCd = '';
		}
		
    	
		var params = me.createParam(searchParm);
		
		params['unitTpCd'] = unitTpCd;
        params['unitCd'] = StringUtil.toUpperCase(searchParm.data.unitCd);
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		
    	return params;
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.billing.SearchInvoiceUnitParm';
		searchBizParm.serviceID = 'MOST.invoiceUnit.selectInvoiceUnit';

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
   
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});