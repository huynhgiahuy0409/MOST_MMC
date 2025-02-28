Ext.define('MOST.view.operation.hht.UpdatingHandlingOutofROROHHTModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.updatinghandlingoutofrorohht',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.ConfirmHandlingOutOfRORO',
		
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
			storeId: 'doItemsStoreHHT',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlingoutofroro/dolist'
			}
		},
		
		// Combo Start
		// ======================================================
		handlingOutComboItems: {
			model: 'MOST.model.operation.ConfirmHandlingOutOfRORO',
			storeId: 'handlingOutComboItemsStoreHHT',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlingoutofroro/handlingOutComboListHHT'
			}
		},
		
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