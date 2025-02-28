Ext.define('MOST.view.operation.hht.UpdatingLoadingOfROROHHTModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.updatingloadingofrorohht',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.popup.LorrysPopup',
		'MOST.model.operation.ConfirmLoadingOfRORO'
	],
	
	stores: {
		unitItemsList: {
			model: 'MOST.model.operation.ConfirmLoadingOfRORO',
			storeId: 'unitItemsListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmloadingofroro/unititemsHHT'
			}
		},
		
		inDirectUnitItemsList: {
			model: 'MOST.model.operation.ConfirmLoadingOfRORO',
			storeId: 'inDirectUnitItemsListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmloadingofroro/indirectunititemshht'
			}
		},
		
		directUnitItemsList: {
			model: 'MOST.model.operation.ConfirmLoadingOfRORO',
			storeId: 'directUnitItemsListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmloadingofroro/directunititemshht'
			}
		},
		
		
		// ======================================================
		// Combo Start
		snCombo:{
			model: 'MOST.model.operation.ConfirmLoadingOfRORO',
			storeId: 'snComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmloadingofroro/snitemsHHT'
			}
		},
		
		brandCombo: {
			model: 'MOST.model.operation.ConfirmLoadingOfRORO',
			storeId: 'brandComboStoreHHT',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/brandcomboListHHT'
			}
		},
		// Combo End
		// ======================================================
	}
	
	
});