Ext.define('MOST.view.controller.WarehouseHistoryModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.warehousehistory',

	requires: [
		'Ext.data.proxy.Rest'
	],
	
	
	stores: {
		JPVCPopupStore: {
			model: 'MOST.model.popup.VesselCallIdListPopup',
			storeId: 'JPVCPopupStoreId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/jpvcpopup'
			}
		},
		
		categoryCombo: {
			fields: ['scdNm','scd'],
			storeId: 'categoryComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: 'MT',
					mcd: 'CATGTP',
					scdUse: 'Y'
				},
				listeners: 
				{
					load: function(store, records) {
				          store.insert(0, [{
				        	  scdNm: 'Select',
				              scd: ''
				          }]);
				     }
				}
			},
		},
		
		snListCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'snListComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SN_NO
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  shipgNoteNo: ''
			          }]);
			     }
			}
		},
		
		masterBlCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'masterBlComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_MBL_NO
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  mfDocId: ''
			          }]);
			     }
			}
		},
		
		blListCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'blListComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BL_NO,
					//divCd: ComboboxServiceConstants.COMBO_TRUCK
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  blNo: ''
			          }]);
			     }
			}
		},
		
		grListCombo:{
			model: 'MOST.model.document.TruckAssignment',
			storeId: 'grListComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/truckAssignment/grItems'
			}
		},
		
		whHistoryList:{
			model: 'MOST.model.planning.WarehouseHistory',
			storeId: 'whHistoryListStore',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy:{
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/warehouseHistory/historyList',
			}
		},
		
		docList:{
			model: 'MOST.model.operation.WHReconciliation',
			storeId: 'docListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/warehouseHistory/list',
			}
		},
		
		cgcondCombo: {
			fields: ['scdNm','scd'],
			storeId: 'cgcondComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: 'MT',
					mcd: 'CGCOCD',
					scdUse: 'Y'
				},
				listeners: 
				{
					load: function(store, records) {
						store.insert(0, [{
							scdNm: 'Select',
							scd: ''
						}]);
					}
				}
			},
		}
		
	}
});