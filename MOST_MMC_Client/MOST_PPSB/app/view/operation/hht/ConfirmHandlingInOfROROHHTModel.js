Ext.define('MOST.view.operation.hht.ConfirmHandlingInOfROROHHTModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.confirmhandlinginofrorohht',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.ConfirmHandlingInOfRORO',
		'MOST.model.operation.TheListOfDamageCheckOfRORO',
		'MOST.model.operation.DamageCheck',
		'MOST.model.foundation.dataitem.DataItem'
	],

	formulas:{
	},

	stores: {
		handlingInItems: {
			model: 'MOST.model.operation.ConfirmHandlingInOfRORO',
			storeId: 'handlingInItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlinginofroro/handlinginlistHHT'
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
		damageCheckStore: {
			model: 'MOST.model.operation.DamageCheck',
			storeId: 'damageCheckStoreHHT',
		},
		// Combo Start
		// ======================================================
		// D.Mode
		
		// Combo End
		// ======================================================

	}
});