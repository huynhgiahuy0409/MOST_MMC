Ext.define('MOST.view.monitoring.InternalTruckMonitoringModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.internaltruckmonitoring',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.monitoring.Loading'
	],

	stores: {
		internalTruckMonitoringList: {
			model: 'MOST.model.monitoring.InternalTruckMonitoring',
			storeId: 'internalTruckMonitoringListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/internalTruckMonitoring/list'
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
		
		blListCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'blListComboStore',
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
		
		grListCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'grListComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_GR_NO
				}
			}
		},
		
		subDoCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'subDoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SUB_DO_NO
				}
			}
		},
		
		warehouseListCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'warehouseListComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_WAREHOUSE_LOC,
					locDivCd: CodeConstants.MT_LOCDIV1_WHO
				}				
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
});