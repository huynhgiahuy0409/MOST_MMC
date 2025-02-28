Ext.define('MOST.view.operation.RehandlingOfROROModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.rehandlingofroro',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.RehandlingOfRORO'
	],
	
	stores: {
		cargoItems: {
			model: 'MOST.model.operation.RehandlingOfRORO',
			storeId: 'cargoItemsStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandlingofroro/cargolist'
			}
		},
		
		rehandlingItems: {
			model: 'MOST.model.operation.RehandlingOfRORO',
			storeId: 'rehandlingItemsStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandlingofroro/rehandlinglist'
			}
		},
		
		categoryCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'categoryComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_CATGTP
				}
			},
			listeners: {
				load: function(store, records) {
					store.insert(0, [{
						scdNm: 'Select',
			        	scd: ''
					}]);
				}
			}
		},	
		
		rehandlingModeCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'rehandlingModeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_RHDLMODE,
					col3: 'RH'
				}
			},
			listeners: {
				load: function(store, records) {
					store.insert(0, [{
						scdNm: 'Select',
			        	scd: ''
					}]);
				}
			}
		},
		
		documentCombo: {
			model: 'MOST.model.operation.RehandlingOfRORO',
			storeId: 'documentComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandlingofroro/documentComboList'
			}
		},
		
		blCombo: {
			fields: ['cdNm','cd']
		},
		
		snCombo: {
			fields: ['cdNm','cd']
		},
		
		nextSnCombo: {
			fields: ['cdNm','cd']
		},
		
		nextDtlSnCombo: {
			fields: ['cdNm','cd']
		},
		
		stackedUnitItems: {
			model: 'MOST.model.operation.RehandlingOfRORO',
			storeId: 'stackedUnitItemsStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandlingofroro/stackedUnitList'
			}
		},
		
		rehandlingUnitItems: {
			model: 'MOST.model.operation.RehandlingOfRORO',
			storeId: 'rehandlingUnitItemsStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandlingofroro/rehandlingUnitList'
			}
		},
		
		validationCheck: {
			storeId: 'validationCheck',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/validationcode/list',
				
			}
		},
	}
});