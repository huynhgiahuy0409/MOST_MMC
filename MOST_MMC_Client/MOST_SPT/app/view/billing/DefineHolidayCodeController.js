Ext.define('MOST.view.billing.DefineHolidayCodeController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.defineholidaycode',
		
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refdefineholidaycodeGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'defineHolidayCodeList',	
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
		me.onSearch();
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
		
		var editor = grid.getPlugin('defineHolidaycodeEditor');
		var record = Ext.create('MOST.model.billing.DefineHolidayCode');
		
		
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
		
		record.data.userId = MOST.config.Token.getUserId();
		
		store.insert(idx, record);
		grid.getSelectionModel().select(record);
		
		//refs.ctlholidayCd.getEditor().setEditable(true);
		//refs.ctlholidayCd.getEditor().setDisabled(false);
		
		me.setGridColumnEditable(true);
		
		editor.startEdit(record);
	},
	
	// Grid Edit
	onEdit : function(editor, context){
		var me = this;
		//var duplicateCheckStore = me.getStore('defineHolidayCodeDuplicateCheck');
		
		//me.gridEdit(editor, context);
/*		var params = {
			strHlDayCd: context.newValues.strHlDayCd,
			strHlDayYmd: context.newValues.strHlDayYmd,
			strHlMonthYmd: context.newValues.strHlMonthYmd
		}*/

		/*duplicateCheckStore.load({
			params:params,
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
//						MessageUtil.duplicationFail();
						MessageUtil.error('fail_msg', 'invoiceunit_duplicate_data_msg');
						
					} else {
						me.gridEdit(editor, context);
					}
				}
			}
		});*/
	},

	// Grid Validate Edit
	onValidateEdit : function(editor, context) {
		var me = this;
		var refs = me.getReferences();
		var duplicateCheckStore = me.getStore('defineHolidayCodeDuplicateCheck');
	
		var params = {
			strHlDayCd: context.newValues.strHlDayCd,
			strHlDayYmd: context.newValues.strHlDayYmd,
			strHlMonthYmd: context.newValues.strHlMonthYmd
		}

		duplicateCheckStore.load({
			params:params,
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(context.record.crudState == records[0].crudState){
							if((context.newValues.strHlDayYmd == records[0].data.strHlDayYmd) || (context.newValues.strHlDayCd==records[0].data.strHlDayCd)){
								MessageUtil.error('fail_msg', 'invoiceunit_duplicate_data_msg');
								return;
							} else {
								me.gridEdit(editor, context, false);
							}
						} else {
							if (records.length > 0 && records.length <2) {
								if((context.newValues.strHlDayYmd == records[0].data.strHlDayYmd) && (context.newValues.strHlDayCd==records[0].data.strHlDayCd) && (context.newValues.strDescr==records[0].data.strDescr)){
									MessageUtil.error('fail_msg', 'invoiceunit_duplicate_data_msg');
									return;
							    } else {
							    	me.gridEdit(editor, context, false);
							    }
							}
							if (records.length > 1) {
								MessageUtil.error('fail_msg', 'invoiceunit_duplicate_data_msg');
								return;
							}
						}
					} else {
						me.gridEdit(editor, context, false);
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
		
		me.gridRemoveRow(grid, store, function(){
			MessageUtil.saveSuccess(); 
		});
	},
	
	// Grid Row Double
	onDblClick: function() {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refdefineholidaycodeGrid');
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		me.setGridColumnEditable(selection.phantom);
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
		
     	var params = {
		};
    	return params;
		
	},
	
	// Key Column Editable
	setGridColumnEditable:function(isCreate){
		var me = this;
		var refs = me.getReferences();

		if(isCreate){ // ADD
			refs.refHolidayCd.getEditor().setEditable(true);
			refs.refHolidayCd.getEditor().setDisabled(false);
			
		} else { // UPDATE
			refs.refHolidayCd.getEditor().setEditable(false);
			refs.refHolidayCd.getEditor().setDisabled(true);
		}
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.billing.SearchDefineHolidayCodeParm';
		searchBizParm.serviceID = 'MOST.defineHolidayCode.selectDefineHolidayCodeList';

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});