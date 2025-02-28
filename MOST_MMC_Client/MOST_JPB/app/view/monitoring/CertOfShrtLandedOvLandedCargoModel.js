Ext.define('MOST.view.monitoring.CertOfShrtLandedOvLandedCargoModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.certofshrtlandedovlandedcargo',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.monitoring.Discharging',
	],

	stores: {
		discharging: {
			model: 'MOST.model.monitoring.Discharging',
			storeId: 'dischargingStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/discharging/list'
			}
		},
		
		dischargingCombo: {
			model: 'MOST.model.monitoring.Discharging',
			storeId: 'dischargingComboForAllStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/discharging/comboList'
			},
//			listeners: 
//			{
//				load: function(store, records) {
//			          store.insert(0, [{
//			        	  blNo: ''
//			          }]);
//			     }
//			}
		},
		
		dischargingBlNoCombo:{
			model: 'MOST.model.monitoring.Discharging',
			storeId: 'dischargingBlNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/discharging/blComboList'
			}
		},
		
		dischargingManifestCombo: { //Master BL
			model: 'MOST.model.monitoring.Discharging',
			storeId: 'dischargingManifestComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/discharging/mfComboList'
			}
		},
		
	}
});