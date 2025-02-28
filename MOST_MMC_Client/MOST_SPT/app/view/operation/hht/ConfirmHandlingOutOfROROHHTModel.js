Ext.define('MOST.view.operation.hht.ConfirmHandlingOutOfROROHHTModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.confirmhandlingoutofrorohht',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.ConfirmHandlingOutOfRORO',
		'MOST.model.operation.TheListOfDamageCheckOfRORO',
		'MOST.model.operation.DamageCheck',
	],

	data: {
		selectedColumn : null
	},
	
	formulas:{
	},

	stores: {
		handlingOutUnitItems: {
			model: 'MOST.model.operation.ConfirmHandlingOutOfRORO',
			storeId: 'handlingOutUnitItemsStoreHHT',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlingoutofroro/handlingOutlistHHT'
			}
		},
		
		doItems: {
			model: 'MOST.model.operation.ConfirmHandlingOutOfRORO',
			storeId: 'doItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlingoutofroro/dolistHHT'
			}
		},
		
		handlingOutComboItems: {
			model: 'MOST.model.operation.ConfirmHandlingOutOfRORO',
			storeId: 'handlingOutComboItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlingoutofroro/handlingOutComboListHHT'
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
		unitCombo: {
			fields: ['cdNm','cd']
		},
		
		truckCombo: {
			fields: ['cdNm','cd'],
		},
		
		driverWithTruckCombo: {
			fields: ['cdNm','cd']
		},
		
		driverCombo: {
			fields: ['cdNm','cd'],
		}
		// Combo End
		// ======================================================

	}
});