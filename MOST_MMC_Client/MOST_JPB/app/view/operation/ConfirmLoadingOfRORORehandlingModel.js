Ext.define('MOST.view.operation.ConfirmLoadingOfRORORehandlingModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

    alias: 'viewmodel.rehandlingloadingofroro',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.ConfirmLoadingOfRORO',
		'MOST.model.operation.ConfirmDischargingOfRORO',
	],
	
	stores: {
		cargoItems: {
			model: 'MOST.model.operation.ConfirmLoadingOfRORO',
			storeId: 'confirmLoadingListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmloadingofrororehandling/list'
			}
		},
		unitItems: {
			model: 'MOST.model.operation.ConfirmLoadingOfRORO',
			storeId: 'unitItemsListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmloadingofrororehandling/unitlist'
			}
		},
		
		snCombo: {
			model: 'MOST.model.operation.ConfirmLoadingOfRORO',
			storeId: 'snComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmloadingofrororehandling/snitems'
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
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_CGTP,
					col1: 'RR'
				}
			},
			listeners: {
				load: function(store, records) {
					store.insert(0, [{
						optionName: 'Select',
			        	  optionValue: ''
					}]);
				}
			}
		},
		
		commonComboItems: {
			model: 'MOST.model.operation.ConfirmDischargingOfRORO',
			storeId: 'commonComboItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/commonComboListHHT'
			}
		},
		
		dmodeCombo : {
			fields: ['scdNm','scd'],
			data :  [{"scd":"", "scdNm":"Select"},
					{"scd":"D", "scdNm":"DIRECT"},
					{"scd":"I", "scdNm":"INDIRECT"}
	        ]
		},
		
		damageStore: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'roroDamageCheckDetailStore',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/rorodamagecheckdetail'
			}
		},
		
		roroDamageCheckDetail: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'roroDamageCheckDetailStore',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/rorodamagecheckdetail'
			}
		},
		roroDamageCheckInventory: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'roroDamageCheckInventoryStore',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/rorodamagecheckinventory'
			}
		},
		checkRoRoInventory: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'checkRoRoInventoryStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/checkrorodamagecheckinventory'
			}
		},
		theDamageParts: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'theDamagePartsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/thedamageparts'
			}
		},
		theDamageLevels: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'theDamageLevelsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/thedamagelevels'
			}
		},
		
		uploadedFileDamageStore: {
			model : 'MOST.model.common.FileUpload',
			storeId: 'uploadedFileDamageStore',
		},
	}
});
