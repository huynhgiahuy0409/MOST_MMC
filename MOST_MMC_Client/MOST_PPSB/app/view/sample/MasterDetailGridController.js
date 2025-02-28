Ext.define('MOST.view.sample.MasterDetailGridController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.masterdetailgrid',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_DATE_PERIOD : 15,	// MAX PERIOD DATE
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
		var testCombo = me.getStore('masterDetailGridTestTypeCombo');
		var testSearchCombo = me.getStore('masterDetailGridTestTypeSearchCombo');
		var detailTestCombo = me.getStore('masterDetailGridDetailTestTypeCombo');
		
		testCombo.load();
		testSearchCombo.load();
		detailTestCombo.load();

		me.setDateInDays("ctlColDateFromDt", -me.MAX_DATE_PERIOD);
		me.setDateInDays("ctlColDateToDt");
	},
	
	// Initialize Control
	onRefresh:function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlColCombo.setValue("");
		refs.ctlColString.setValue("");
		refs.ctlColDateFromDt.setValue("");
		refs.ctlColDateToDt.setValue("");
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
     	var grid = me.lookupReference('refMasterDetailMasterGrid');
    	var store = me.getStore('masterDetailGridMaster');
    	var detailStore = me.getStore('masterDetailGridDetail');
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length <= 0) {
						detailStore.removeAll();
					} else {
						grid.getSelectionModel().select(records[0]);
					}
				}
			}
		});
	},
	
	// Grid Add
	onAdd: function() {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refMasterDetailMasterGrid');
		var store = me.getStore('masterDetailGridMaster');
		var editor = grid.getPlugin('masterDetailGridEditor');
		var record = Ext.create('MOST.model.sample.SingleGrid'); 
		
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
		store.insert(idx, record);
		grid.getSelectionModel().select(record);
		
		refs.refKey1.getEditor().setEditable(true);
		refs.refKey1.getEditor().setDisabled(false);
		
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
		var duplicateCheckStore = me.getStore('masterDetailGridDuplicateCheck');
		
		var params = {
			key1: context.newValues.key1
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
		var grid = me.lookupReference('refMasterDetailMasterGrid');
		var store = me.getStore('masterDetailGridMaster'); 
		
		me.gridRemoveRow(grid, store);
	},
	
	// Grid Double Click
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference('refMasterDetailMasterGrid');
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		me.setGridColumnEditable(selection.phantom);
	},
	
	// Grid combo Renderer
	onGridComboRenderer: function(val, cell){
		var me = this;
        var refs = me.getReferences();
		
		var codeComboStore = null;
		var displayFieldName = 'comName';
		var codeFieldName = 'comCode';
		
		if(cell.column.dataIndex == 'colCombo'){ 		// COL COMBO
			codeComboStore = me.getViewModel().getStore('masterDetailGridTestTypeCombo');
		} else if(cell.column.dataIndex == 'detailColCombo'){ 		// COL COMBO
			codeComboStore = me.getViewModel().getStore('masterDetailGridDetailTestTypeCombo');
		}

		if(codeComboStore != null){
			var indx = -1;
			
			if(cell.column.dataIndex == 'colCombo'){
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
	
	// Master Grid Selection Change Event
	onMasterSelectionChange: function(selectable, selectRecords, eOpts) {
		var me = this;
		var grid = me.lookupReference('refMasterDetailMasterGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var detailStore = me.getStore('masterDetailGridDetail');
		
		if(selection == null) {
			detailStore.removeAll();
			return;
		}
		
		detailStore.load({
			params: {
				key1:selection.data.key1
			},
			callback:function(records, operation, success){
				if(success){
					// SUCCESS
				}
			}
		});
	},
	
	// Store Filter
	onStoreFilter : function(field, newValue, oldValue){
		var me = this;
		var refs = me.getReferences();
    	var store = me.getStore('masterDetailGridMaster');
    	store.clearFilter();
    	
    	store.filter([{
			filterFn: function(item) {
		    	return (item.get('colString').replace(' ', '').toUpperCase().trim().search(newValue.replace(' ', '').toUpperCase()) != -1);
		    }
    	}]);
    	
    	field.setValue(newValue.toUpperCase());
	},
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * DETAIL GRID START
	 */
	// Detail Grid Row Add
	onDetailAdd: function() {
		var me = this;
		var refs = me.getReferences();
		var masterGrid = me.lookupReference('refMasterDetailMasterGrid');
		var selection = masterGrid.getSelection() == null ? null : masterGrid.getSelection()[0];
		
		if(selection == null) return;
		
		var detailGrid = me.lookupReference('refMasterDetailDetailGrid');
		var store = me.getStore('masterDetailGridDetail');
		var editor = detailGrid.getPlugin('masterDetailDetailGridEditor');
		var record = Ext.create('MOST.model.sample.SingleGrid');
		
		record.set("key1", selection.get("key1"));
		
		editor.cancelEdit();
		
		//Clear filter for Grid
		detailGrid.filters.clearFilters();
		detailGrid.filters.disable();
		
		//Clear filter for Store
		store.clearFilter();
		
		var idx = 0;
		if(detailGrid.getSelection() && detailGrid.getSelection().length>0) {
			idx = store.indexOfId(detailGrid.getSelection()[0].get('id'));
		}
		store.insert(idx, record);
		detailGrid.getSelectionModel().select(record);
		
		refs.refDetailKey2.getEditor().setEditable(true);
		refs.refDetailKey2.getEditor().setDisabled(false);
		
		editor.startEdit(record);
	},
	
	// Detail Grid Edit
	onDetailEdit : function(editor, context){
		var me = this;
		me.gridEdit(editor, context);
	},
	
	// Detail Grid Validate Edit
	onDetailValidateEdit : function(editor, context) {
		var me = this;
		var duplicateCheckStore = me.getStore('masterDetailGridDetailDuplicateCheck');
		
		var params = {
			key1: context.newValues.key1,
			key2: context.newValues.key2
		}
		
		me.gridDupliationCheck(editor, context, duplicateCheckStore, params);
	},
	
	// Detail Grid Cancel Edit
	onDetailCancelEdit : function(rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},
	
	// Detail Grid Row Remove
	onDetailRemove: function() {
		var me = this;
		var grid = me.lookupReference('refMasterDetailDetailGrid');
		var store = me.getStore('masterDetailGridDetail'); 
		
		me.gridRemoveRow(grid, store);
	},
	
	// Detail Grid Row Double Click
	onDetailDblClick: function() {
		var me = this;
		var grid = me.lookupReference('refMasterDetailDetailGrid');
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		me.setDetailGridColumnEditable(selection.phantom);
	},
	
	// Grid Key Column Editable
	setDetailGridColumnEditable:function(isCreate){
		var me = this;
		var refs = me.getReferences();

		if(isCreate){ // ADD
			refs.refDetailKey2.getEditor().setEditable(true);
			refs.refDetailKey2.getEditor().setDisabled(false);
		} else { // UPDATE
			refs.refDetailKey2.getEditor().setEditable(false);
			refs.refDetailKey2.getEditor().setDisabled(true);
		}
	},
	/**
	 * DETAIL GRID END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Grid Key Column Editable
	setGridColumnEditable:function(isCreate){
		var me = this;
		var refs = me.getReferences();

		if(isCreate){ // ADD
			refs.refKey1.getEditor().setEditable(true);
			refs.refKey1.getEditor().setDisabled(false);
		} else { // UPDATE
			refs.refKey1.getEditor().setEditable(false);
			refs.refKey1.getEditor().setDisabled(true);
		}
	},
	
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
    	var colString = refs.ctlColString.getValue();
    	var colCombo = refs.ctlColCombo.getValue();
    	var dateCondition = me.checkPeriodDate("ctlColDateFromDt", "ctlColDateToDt", me.MAX_DATE_PERIOD, true);
		
    	if(dateCondition == null){
    		return null;
    	}
    	
    	var params = {
			colString : colString,
			colCombo : colCombo
		};
    	
    	if(dateCondition != null){
    		params["fromDt"] = dateCondition.fromDtString;
    		params["toDt"] = dateCondition.toDtString;
    	}
    	
    	return params;
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});