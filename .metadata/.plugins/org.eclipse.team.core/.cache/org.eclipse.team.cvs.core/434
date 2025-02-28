Ext.define('MOST.view.operation.hht.DamageCheckInventoryofROROHHTModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.damagecheckinventoryofrorohht',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.TheListOfDamageCheckOfRORO',
	],

	formulas:{
	},

	stores: {
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