Ext.define('MOST.view.billing.CostCenterModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.costcenter',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.billing.CostCenter'
	],

	stores: {
		costCenterList: {
			model: 'MOST.model.billing.CostCenter',
			storeId: 'costCenterStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/costcenter/list'
			}
		},
		costCenterDuplicateCheck: {
			model: 'MOST.model.billing.CostCenter',
			storeId: 'costCenterDuplicateCheckStore',
			proxy: {
				showProgressBar : false,
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/costcenter/list/duplicatecheck'
			}
		},
		
		validationCode: {
			storeId: 'validationCode',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/costcenter/list/duplicatedCostERP'
			}
		},
		
		searchSBUCombo : {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'SBUComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: 'MT',
					mcd: 'SBU'
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			        	  scd: ''
			          }]);
			     }
			}
		},

				
		SBUCombo : {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'SBUComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: 'MT',
					mcd: 'SBU'
				}
			}
		},
		cargoTypeCombo : {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'cargoTypeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: 'MT',
					mcd: 'CGTP'
				}
			}
		},
		deliveryCombo : {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'deliveryComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: 'MT',
					mcd: 'DELVTP'
				}
			}
		},
	}
});