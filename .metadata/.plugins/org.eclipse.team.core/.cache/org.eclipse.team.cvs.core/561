Ext.define('MOST.view.popup.RORODamageCheckHHTModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.rorodamagecheckhht',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.TheListOfDamageCheckOfRORO',
	],

	data: {
		selectedColumn : null
	},
	
	stores: {
		theListOfDamageCheckOfRORO: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'theListOfDamageCheckOfROROHHTStore',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/listHHT'
			}
		},
		
		roroDamageCheckInventory: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'roroDamageCheckInventoryStoreHHT',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/rorodamagecheckinventoryHHT'
			}
		},
		
		roroDamageCheckDetail: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'roroDamageCheckDetailStoreHHT1',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/rorodamagecheckdetail'
			}
		},

		damageStore: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'roroDamageCheckDetailStoreHHT2',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/rorodamagecheckdetail'
			}
		},
		
		theDamageParts: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'theDamagePartsHHTStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/thedamageparts'
			}
		},
		
		theDamageLevels: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'theDamageLevelsHHTStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/thedamagelevels'
			}
		},
	},
	
	
});