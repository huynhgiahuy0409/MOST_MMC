Ext.define('MOST.view.document.ConsolDeconsolidationModel', {
	extend: 'MOST.view.foundation.BaseViewModel',
	
	alias: 'viewmodel.consoldeconsolidation',
	
	requires: [
		'Ext.data.proxy.Rest'
	],
	
	stores:{
		consolDeconsolidationList: {
			model: 'MOST.model.document.ConsolDeconsolidation',
			storeId: 'consolDeconsolidationListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/consoldeconsolidation/list'
			}
		},

		snCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'snComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_SN_NO
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			              snNo: ''
			          }]);
			     }
			}
		},
		
		cargoStatusCombo : {
			model: 'MOST.model.document.ConsolDeconsolidation',
			storeId: 'cargoStatusComboStore',
			proxy: {
			   type: 'rest',
			   showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/consoldeconsolidation/cargoStatusCombo'
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
		
		blCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'blComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BL_NO
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
		
		warehouseList: {
			model: 'MOST.model.configuration.WarehouseDefinition',
			storeId: 'warehouseList',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/warehouse/list',
				extraParams:{
					locDivCd : 'WHO',
					areaId : 'BBT',
					locUseYn : 'Y'
				}
			}
		},
		
		masterBlNoCombo: { //Master BL
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'masterBlNoComboStore',
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
			        	  mfDocId : ''
			          }]);
			     }
			}
		},
		
		bookingNoCombo: { //Booking No
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'bookingNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BOOKING_NO 
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
	}
});