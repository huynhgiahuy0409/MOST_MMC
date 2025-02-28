Ext.define('MOST.view.administrator.ParameterSettingController', {
	extend: 'MOST.view.foundation.BaseViewController',
	
	requires: [
	],
		
	alias: 'controller.parametersetting',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME : 'refParameterSettingGrid',						// Main Grid Name 
	MAIN_STORE_NAME : 'parametersettinglist',								// Main Store Name
	PARAMETTER_CHECK_COMBOBOX_STORE: 'parametercheckCombo',			// PORT TYPE COMBO STORE NAME
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	
	
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.administrator.SearchParameterSetting');
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.YES_NO, me.PARAMETTER_CHECK_COMBOBOX_STORE); 	// MOVE TYPE COMBO
		
		me.onSearch(me);
		
		searchParm.set('progress', 'N');
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
	onSearch: function(control) {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore(me.MAIN_STORE_NAME);
    	
    	if(control.xtype !== CommonConstants.PAGING_TOOLBAR_TYPE){
    		store.currentPage = 1;
    	}
    	
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
    	store.clearFilter();
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if(records && records.length <= 0){
						MessageUtil.noMatchData();
					}
				}
			}
		});
	},
	
	// Grid Row Double
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		//me.setGridColumnEditable(selection.phantom);
	},
	
	
	onCancelEdit : function(rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},
	
	// Grid Edit
	onEdit : function(editor, context){
		var me = this;
		me.gridEdit(editor, context);
	},
	
	
	// Grid Validate Edit
	onValidateEdit : function(editor, context) {
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		
	},
	
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.MAIN_STORE_NAME);
     	var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		
		var form = me.getView();
    	
    	if(!form.isValid()){
    		return null;
    	}
    	var params = {
			pgmCode : MOST.config.Token.getPgmCode(),
			usingSession: '',
			code : ''
    	};
    	
    	params['userType'] = me.USER_TYPE;
    	params['pageNo'] = pageNo;
     	params['sizePerPage'] = sizePerPage;
    	
    	return params;
	},
	
	onChange: function(field, newValue){
		field.setValue(newValue.toUpperCase());
	}, 
	
	onExportExcelPdfWithServer: function(gridNameString, isExcel){
		var me = this;
		var searchBizParm = me.getSearchCondition();
		searchBizParm.classID = 'com.tsb.most.basebiz.parm.parameters.SearchCommonParameterSettingBizParm';
		searchBizParm.serviceID = 'MOST.parametersetting.searchItems';
		me.exportExcelPdfWithServer(gridNameString, searchBizParm, isExcel);
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});