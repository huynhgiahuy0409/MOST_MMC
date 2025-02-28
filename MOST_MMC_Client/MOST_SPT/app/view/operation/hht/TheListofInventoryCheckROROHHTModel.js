Ext.define('MOST.view.operation.hht.TheListofInventoryCheckROROHHTModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.thelistofinventorycheckrorohht',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.TheListOfDamageCheckOfRORO',
	],

	formulas:{
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
			storeId: 'roroDamageCheckInventoryStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/rorodamagecheckinventoryHHT'
			}
		},
		
		checkRoRoInventory: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'checkRoRoInventoryStoreHT',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/checkrorodamagecheckinventory'
			}
		},
		
		// Combo Start
		// ======================================================

		
		// Combo End
		// ======================================================

	}
});