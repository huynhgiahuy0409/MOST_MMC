Ext.define('MOST.view.sample.DetailPopupComplexSampleController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.detailpopupcomplexsample',
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var testCombo = me.getStore('detailPopupComplexSampleTestTypeCombo');
		var testSearchCombo = me.getStore('detailPopupComplexSampleTestTypeSearchCombo');
		var detailTestCombo = me.getStore('detailPopupComplexSampleDetailTestTypeCombo');
		
		testCombo.load();
		testSearchCombo.load();
		detailTestCombo.load();
	},
	
	// Initialize Control
	onRefresh:function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlColCombo.setValue('');
		refs.ctlColString.setValue('');
		refs.ctlColDateFromDt.setValue('');
		refs.ctlColDateToDt.setValue('');
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
    	var store = me.getStore('detailPopupComplexSample');
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
		var grid = me.lookupReference('refDetailPopupComplexSampleGrid');
		
		me.openDetailPopup(null);
	},
	
	// Grid Row Remove
	onRemove: function() {
		var me = this;
		var grid = me.lookupReference('refDetailPopupComplexSampleGrid');
		var store = me.getStore('detailPopupComplexSample');
		
		// If there is a detail window, declare the CallBack function and close the Detail window.
		me.gridRemoveRow(grid, store, function(){
			var detailView = me.getDetailBizView();
			
			if(detailView){
				detailView.close();
			}
		});
	},
	
	// Grid Row Double
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference('refDetailPopupComplexSampleGrid');
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		me.openDetailPopup(selection);
	},
	
	// Grid combo Renderer
	onGridComboRenderer: function(val, cell){
		var me = this;
        var refs = me.getReferences();
		
		var codeComboStore = null;
		var displayFieldName = 'comName';
		var codeFieldName = 'comCode';
		
		if(cell.column.dataIndex == 'colCombo'){ 		// COL COMBO
			codeComboStore = me.getViewModel().getStore('detailPopupComplexSampleTestTypeCombo');
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
    	var store = me.getStore('detailPopupComplexSample');
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
    	var dateCondition = me.checkFromToDate('ctlColDateFromDt', 'ctlColDateToDt');
		
    	var params = {
			colString : colString,
			colCombo : colCombo
		};
    	
    	if(dateCondition != null){
    		params['fromDt'] = dateCondition.fromDtString;
    		params['toDt'] = dateCondition.toDtString;
    	}
    	
    	return params;
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
		
	/**
	 * =========================================================================================================================
	 * DETAIL START
	 */
	// Detail Load
	onDetailLoad:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var infoForm = detailView.down('form').getForm();
		infoForm.isValid(); // Mandatory to appear red for.
		
		me.setDetailInitialize();
	},
	
	// Detail Initialize
	setDetailInitialize:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var store = me.getStore('detailPopupComplexSampleDetailMain');
		var tab1Store = me.getStore('detailPopupComplexSampleDetailTab1');
		
		store.removeAll();
		store.commitChanges();
		
		tab1Store.removeAll();
		tab1Store.commitChanges();
		
		if(recvData == null){ // CREATE
			recvData = Ext.create('MOST.model.sample.SingleGrid'); 
			me.setDetailControl(recvData);
		} else {
			store.load({
				params: {
					key1:recvData.get('key1')
				},
				callback:function(records, operation, success){
					if(success){
						if(records.length > 0){
							me.setDetailControl(records[0]);
						}
					}
				}
			});
		}
	},
	
	// Detail Control Setting
	setDetailControl:function(record){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var tab1Store = me.getStore('detailPopupComplexSampleDetailTab1');
		
		// Key Control Enable/Disable
		if(record.phantom){
			refs.ctlDetailKey1.setEditable(true);
			detailView.items.get(0).recvData = record;
		} else {
			refs.ctlDetailKey1.setEditable(false);
		}
		
		me.getViewModel().setData({theDetail:record});
		
		tab1Store.setData(record.get('items'));
		tab1Store.commitChanges();
	},
	
	// Detail Save
	onDetailSave:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theDetail');
		
		if(detailView){
			var infoForm = detailView.down('form').getForm();
			
			if(infoForm.isValid()){
				if(detailItem.phantom){
					var duplicateCheckStore = me.getStore('detailPopupComplexSampleDuplicateCheck');
					
					var params = {
						key1: detailItem.get('key1')
					}
					
					duplicateCheckStore.load({
						params: params,
						callback: function(records, operation, success) {
							if (success) {
								if(records.length > 0){
									MessageUtil.duplicationFail();
								} else {
									me.saveProcess();
								}
							}
						}
					});
				} else { // UPDATE
					me.saveProcess();
				}
			} else {
				MessageUtil.mandatoryFieldInValid();
			}
		}

	},
	
	// Server Save Process
	saveProcess:function(){
		var me = this;
		var grid = me.lookupReference('refDetailPopupComplexSampleGrid');
		var store = me.getStore('detailPopupComplexSample');
		var tab1Store = me.getStore('detailPopupComplexSampleDetailTab1');
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var arrTab1 = new Array();
		var detailItem = me.getViewModel().get('theDetail');
		var isCreated = detailItem.phantom;
		
		// Set on DATE + TIME model
//		detailView.data.colDate = me.changeDateToControl('ctlColDate', 'ctlColDateTime');

		// CREATE, UPDATE RECORD
		tab1Store.getModifiedRecords().forEach(function(record, index, array){
			record.set('newVersion', me.generateUuid());
			arrTab1.push(record.data);
		});
		
		// DELETE RECORD
		tab1Store.getRemovedRecords().forEach(function(record, index, array){
			arrTab1.push(record.data);
		});
		
		// To perform the save logic only when modified.
		if(detailItem.dirty ||
		   arrTab1.length > 0){
			
			var proxy = detailItem.getProxy();
			proxy.url = store.getProxy().url; // You can set it as store Proxy Url, or you can put another URL.
			
			detailItem.set('items', arrTab1); // Tab1 Grid Array Data Setting
			detailItem.set('newVersion', me.generateUuid());
			
			detailItem.save({
				success : function(){
					detailItem.set('version', detailItem.get('newVersion'));
					detailItem.commit();
					
					if(isCreated){
						store.insert(0, detailItem);
						grid.getSelectionModel().select(detailItem);
					} else {
						me.updateRecord(recvData, detailItem);
					}
					
					me.onDetailLoad();
					MessageUtil.saveSuccess(); // Success Message
				}
			});
		}
	},
	/**
	 * DETAIL END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * TAB1 GRID START
	 */
	// Grid combo Renderer
	onGridComboRenderer: function(val, cell){
		var me = this;
        var refs = me.getReferences();
		
		var codeComboStore = null;
		var displayFieldName = 'comName';
		var codeFieldName = 'comCode';
		
		if(cell.column.dataIndex == 'colCombo'){ 		// COL COMBO
			codeComboStore = me.getViewModel().getStore('detailPopupComplexSampleTestTypeCombo');
		} else if(cell.column.dataIndex == 'detailColCombo'){ 		// COL COMBO
			codeComboStore = me.getViewModel().getStore('detailPopupComplexSampleDetailTestTypeCombo');

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
	
	// Detail Grid Row Add
	onDetailTab1GridAdd: function() {
		var me = this;
		var refs = me.getReferences();
		var detailGrid = me.lookupReference('refDetailPopupComplexSampleDetailTab1lGrid');
		var store = me.getStore('detailPopupComplexSampleDetailTab1');
		var editor = detailGrid.getPlugin('detailPopupComplexSampleDetailTab1GridEditor');
		var record = Ext.create('MOST.model.sample.SingleGrid');
		
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
		record.set('newVersion', me.generateUuid());
		detailGrid.getSelectionModel().select(record);
		
		refs.refDetailKey2.getEditor().setEditable(true);
		refs.refDetailKey2.getEditor().setDisabled(false);
		
		editor.startEdit(record);
	},
	
	// Detail Grid Edit
	onDetailEdit : function(editor, context){
		context.record.data.workingStatus = context.record.crudState;
	},
	
	// Detail Grid Validate Edit
	onDetailValidateEdit : function(editor, context) {
		var me = this;
		
		if(context.record.phatom){
			var store = me.getStore('detailPopupComplexSampleDetailTab1');
			var index = store.find('key2', context.newValues.key2);
			
			if(index > 0){
				MessageUtil.duplicationFail();
				return false;
			}
		}
	},
	
	// Detail Grid Cancel Edit
	onDetailCancelEdit : function(rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},
	
	// Detail Delete
	onDetailRemove: function() {
		var me = this;
		me.onRemove();
	},
	
	// Detail Grid Row Remove
	onDetailTab1GridRemove: function() {
		var me = this;
		var grid = me.lookupReference('refDetailPopupComplexSampleDetailTab1lGrid');
		var store = me.getStore('detailPopupComplexSampleDetailTab1');		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		selection.data.workingStatus = WorkingStatus.DELETE;
		store.remove(selection);
	},
	
	// Detail Grid Row Double Click
	onDetailDblClick: function() {
		var me = this;
		var grid = me.lookupReference('refDetailPopupComplexSampleDetailTab1lGrid');
		
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
	}
	/**
	 * TAB1 GRID END
	 * =========================================================================================================================
	 */
});