Ext.define('MOST.view.operation.ConfirmHandlingOutOfRORORehandlingModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.rehandlinghandlingoutofroro',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.ConfirmHandlingOutOfRORO'
	],
	
	data: {
		selectedColumn : null
	},
	
	stores: {
		cargoItems: {
			model: 'MOST.model.operation.ConfirmHandlingOutOfRORO',
			storeId: 'cargoItemsStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlingoutofrororehandling/cargolist'
			}
		},
		
		stackedUnitItems: {
			model: 'MOST.model.operation.ConfirmHandlingOutOfRORO',
			storeId: 'stackedUnitItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlingoutofrororehandling/stackedunitlist'
			}
		},
		
		handlingOutUnitItems: {
			model: 'MOST.model.operation.ConfirmHandlingOutOfRORO',
			storeId: 'handlingOutUnitItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlingoutofrororehandling/handlingoutlist'
			}
		},
		
		handlingOutComboItems: {
			model: 'MOST.model.operation.ConfirmHandlingOutOfRORO',
			storeId: 'handlingOutComboItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlingoutofrororehandling/handlingoutcombolist'
			}
		},
		
		snCombo: {
			model: 'MOST.model.operation.ConfirmHandlingOutOfRORO',
			storeId: 'snComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlingoutofrororehandling/sncombo'
			}
		},

		truckCombo: {
			fields: ['cdNm','cd']
		},
		
		driverWithTruckCombo: {
			fields: ['cdNm','cd']
		},
		
		driverCombo: {
			fields: ['cdNm','cd']
		},
		
		damageStore: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'roroDamageCheckDetailStoreHHT',
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