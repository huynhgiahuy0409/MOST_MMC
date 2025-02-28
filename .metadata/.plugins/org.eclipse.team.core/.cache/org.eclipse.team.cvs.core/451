Ext.define('MOST.view.operation.hht.YardCheckerDamageCheckofROROHHTModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.yardcheckerdamagecheckofrorohht',

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
			storeId: 'roroDamageCheckDetailStoreHHT',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/rorodamagecheckdetail'
			}
		},
		
		blCombo: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'blComboHHTStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/blitemsHHT'
			}
		},

		snCombo: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'snComboHHTStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/snitemsHHT'
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