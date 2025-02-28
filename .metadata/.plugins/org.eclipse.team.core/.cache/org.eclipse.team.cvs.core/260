Ext.define('MOST.view.billing.CostCenterController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.costcenter',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refcostCenterGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'costCenterList',	
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
		var searchParm = Ext.create('MOST.model.billing.SearchCostCenterParm');
		
		var searchSBUCombo = me.getStore('searchSBUCombo');
		var SBUCombo = me.getStore('SBUCombo');
		var cargoTypeCombo = me.getStore('cargoTypeCombo');
		var deliveryCombo = me.getStore('deliveryCombo');
		
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		
		searchParm.set('progress', 'N');
		
		searchSBUCombo.load();
		SBUCombo.load();
		cargoTypeCombo.load();
		deliveryCombo.load();
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
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
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
		
		var editor = grid.getPlugin('costCenterEditor');
		var record = Ext.create('MOST.model.billing.CostCenter');
		
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
		
		refs.refCostCenterCd.getEditor().setEditable(true);
		refs.refCostCenterCd.getEditor().setDisabled(false);
		
		refs.refFinancialCode.getEditor().setEditable(true);
		refs.refFinancialCode.getEditor().setDisabled(false);
		
		// refs.refSBUcode.getEditor().setEditable(true);
		refs.refSBUcode.getEditor().setDisabled(false);
		
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

		var validationCode = me.getStore('validationCode');
		validationCode.load({
			params : {
				codeCostCenter : context.newValues.codeCostCenter,
				codeFinancial : context.newValues.codeFinancial
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						if(records[0].get('value') === 'Y'){
							MessageUtil.error('fail_msg', 'duplicatedata_msg');
							me.onCancelEdit(editor, context);
						} else {
							me.onEdit(editor, context);
						}
					}
				}
			}
		});
		
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
		
		if(selection == null) {
			return;
		}
		
		me.setGridColumnEditable(selection.phantom);
	},
	
	// Grid combo Renderer
	onGridComboRenderer: function(val, cell){
		var me = this;
        var refs = me.getReferences();
		var codeComboStore = null;
		var displayFieldName = 'scdNm';
		var codeFieldName = 'scd';
		
		if(cell.column.dataIndex == 'codeSBU'){ 		
			codeComboStore = me.getViewModel().getStore('SBUCombo');
		}
		
		if(cell.column.dataIndex == 'typeCargo'){ 		
			codeComboStore = me.getViewModel().getStore('cargoTypeCombo');
		}
		
		if(cell.column.dataIndex == 'typeDelivery'){ 		
			codeComboStore = me.getViewModel().getStore('deliveryCombo');
		}

		if(codeComboStore != null){
			var indx = -1;
			
			if(cell.column.dataIndex == 'codeSBU'||cell.column.dataIndex == 'typeCargo'||cell.column.dataIndex == 'typeDelivery'){
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
    	
		var params = me.createParam(searchParm);
		
		params['codeSBU'] = StringUtil.toUpperCase(searchParm.data.codeSBU);
        params['codeCostCenter'] = StringUtil.toUpperCase(searchParm.data.codeCostCenter);
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		
    	return params;
	},
	// Key Column Editable
	setGridColumnEditable:function(isCreate){
		var me = this;
		var refs = me.getReferences();

		if(isCreate){ // ADD
			refs.refCostCenterCd.getEditor().setEditable(true);
			refs.refCostCenterCd.getEditor().setDisabled(false);
			
			// refs.refSBUcode.getEditor().setEditable(true);
			refs.refSBUcode.getEditor().setDisabled(false);
			
			refs.refFinancialCode.getEditor().setEditable(true);
			refs.refFinancialCode.getEditor().setDisabled(false);
		} else { // UPDATE
			refs.refCostCenterCd.getEditor().setEditable(false);
			refs.refCostCenterCd.getEditor().setDisabled(true);
			
			refs.refSBUcode.getEditor().setEditable(false);
			refs.refSBUcode.getEditor().setDisabled(true);
			
			refs.refFinancialCode.getEditor().setEditable(false);
			refs.refFinancialCode.getEditor().setDisabled(true);
		}
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.billing.SearchCostCenterParm';
		searchBizParm.serviceID = 'MOST.costCenter.selectCostCenter';

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});