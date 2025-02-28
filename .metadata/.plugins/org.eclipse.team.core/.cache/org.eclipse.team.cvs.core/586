Ext.define('MOST.view.sample.DetailPopupSampleController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.detailpopupsample',

	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var testCombo = me.getStore('detailPopupSampleTestTypeCombo');
		var testSearchCombo = me.getStore('detailPopupSampleTestTypeSearchCombo');
		
		testCombo.load();
		
		if(testSearchCombo.data.items.length == 0){
			testSearchCombo.load();
		}
		
		// ControlSampleController - <onOpenDetailPopupSample()> event
		if(recvData){
			refs.ctlColCombo.setValue(recvData.colCombo);
			me.onSearch();
		}
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
    	var store = me.getStore('detailPopupSample');
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
		var grid = me.lookupReference('refDetailPopupSampleGrid');
		
		me.openDetailPopup(null);
	},
	
	// Grid Row Remove
	onRemove: function() {
		var me = this;
		var grid = me.lookupReference('refDetailPopupSampleGrid');
		var store = me.getStore('detailPopupSample');
		
		me.gridRemoveRow(grid, store);
	},
	
	// Grid Row Double
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference('refDetailPopupSampleGrid');
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		me.openDetailPopup(selection, null, false);
	},
	
	// Grid combo Renderer
	onGridComboRenderer: function(val, cell){
		var me = this;
        var refs = me.getReferences();
		
		var codeComboStore = null;
		var displayFieldName = 'comName';
		var codeFieldName = 'comCode';
		
		if(cell.column.dataIndex == 'colCombo'){ 		// COL COMBO
			codeComboStore = me.getViewModel().getStore('detailPopupSampleTestTypeCombo');
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
    	var store = me.getStore('detailPopupSample');
    	store.clearFilter();
    	
    	store.filter([{
			filterFn: function(item) {
		    	return (item.get('colString').replace(' ', '').toUpperCase().trim().search(newValue.replace(' ', '').toUpperCase()) != -1);
		    }
    	}]);
    	
    	field.setValue(newValue.toUpperCase());
	},
    
    // Visible Save Button Toogle
	onVisibleSaveButton:function(btn){
		var me = this;
		me.visibleDetailToolButton(ViewUtil.TOOL_SAVE, btn.pressed);
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
    	var dateCondition = me.checkFromToDate("ctlColDateFromDt", "ctlColDateToDt");
		
    	var params = {
			colString : colString,
			colCombo : colCombo
		};
    	
    	if(dateCondition != null){
    		params["fromDt"] = dateCondition.fromDtString;
    		params["toDt"] = dateCondition.toDtString;
    	}
    	
    	return params;
	},
	
	// Receive Popup Data
	receivePopupData: function(recvData){
		var me = this;
     	var refs = me.getReferences();
     	refs.ctlPopupString.setValue(recvData);
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
	onDetailLoad:function(view, eventArgs, recvData){
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
		
		if(recvData == null){ // CREATE
			recvData = Ext.create('MOST.model.sample.SingleGrid');
		}
		
		this.setDetailControl(recvData);
	},
	
	// Detail Control Setting
	setDetailControl:function(record){
		var me = this;
		var refs = me.getReferences();
		
		// Key Control Enable/Disable
		if(record.phantom){
			refs.ctlDetailKey1.setEditable(true);
			detailView.items.get(0).recvData = recvData;
		} else {
			refs.ctlDetailKey1.setEditable(false);
		}
		
		me.getViewModel().setData({theDetail:record});
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
					var duplicateCheckStore = me.getStore('detailPopupSampleDuplicateCheck');
					
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
		var grid = me.lookupReference('refDetailPopupSampleGrid');
		var store = me.getStore('detailPopupSample');
		var detailItem = me.getViewModel().get('theDetail');
		var detailView = me.getDetailBizView();
		var isCreated = detailItem.phantom;
		
		var proxy = detailItem.getProxy();
		proxy.url = store.getProxy().url; // You can set it as store Proxy Url, or you can put another URL.
		
		detailItem.set('newVersion', me.generateUuid());
		
		detailItem.save({
			success : function(){
				detailItem.set("version", detailItem.get('newVersion'));
				detailItem.commit();
				
				if(isCreated){
					store.insert(0, detailItem);
					grid.getSelectionModel().select(detailItem);
				}
				
				MessageUtil.saveSuccess(); // Success Mesage
			}
		});
	},
	
	// Call Parent Function
	onCallParent : function(){
		var me = this;
		me.receivePopupData("test");
	}
	/**
	 * DETAIL END
	 * =========================================================================================================================
	 */
});