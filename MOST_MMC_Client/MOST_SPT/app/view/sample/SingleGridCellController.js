Ext.define('MOST.view.sample.SingleGridCellController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.singlegridcell',
	
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
		var testCombo = me.getStore('singleGridCellTestTypeCombo');
		var testSearchCombo = me.getStore('singleGridCellTestTypeSearchCombo');
		
		testCombo.load();
		testSearchCombo.load();

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
     	var refs = me.getReferences();
    	var store = me.getStore('singleGridCell');
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
	
	// Cell Click
	onCellClick: function(ctx, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var refs = me.getReferences();
		
		me.setGridColumnEditable(record.phantom);		
	},
	
	// Key Column Editable
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
	
	// Grid Add
	onAdd: function() {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refSingleGridCellGrid');
		var store = me.getStore('singleGridCell');
		var editor = grid.getPlugin('singleGridCellEditor');
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
	},
	
	// Grid Edit
    onEdit: function(editor, context) {
    	context.store.sync();
    },
	
	// Grid Row Remove
	onRemove: function() {
		var me = this;
		var grid = me.lookupReference('refSingleGridCellGrid');
		var store = me.getStore('singleGridCell'); 
		
		me.gridRemoveRow(grid, store);
	},
	
	// Grid combo Renderer
	onGridComboRenderer: function(val, cell){
		var me = this;
        var refs = me.getReferences();
		
		var codeComboStore = null;
		var displayFieldName = 'comName';
		var codeFieldName = 'comCode';
		
		if(cell.column.dataIndex == 'colCombo'){ 		// COL COMBO
			codeComboStore = me.getViewModel().getStore('singleGridCellTestTypeCombo');
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

	// Store Filter
	onStoreFilter : function(field, newValue, oldValue){
		var me = this;
		var refs = me.getReferences();
    	var store = me.getStore('singleGridCell');
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
	 * GENERAL METHOD START
	 */
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