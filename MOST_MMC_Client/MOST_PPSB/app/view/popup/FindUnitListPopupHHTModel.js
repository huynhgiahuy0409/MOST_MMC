Ext.define('MOST.view.popup.FindUnitListPopupHHTModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.findunitlistpopuphht',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.ConfirmLoadingOfRORO'
	],
	
	data: {
		selectedColumn : null
	},

	stores: {
		unitItemsList: {
			model: 'MOST.model.operation.ConfirmLoadingOfRORO',
			storeId: 'unitItemsListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmloadingofroro/unititemsHHT'
			}
		},
		
		inDirectUnitItemsList: {
		},
		directUnitItemsList: {
		},
		
		brandCombo: {
			model: 'MOST.model.operation.ConfirmLoadingOfRORO',
			storeId: 'brCbStoreHHT',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/brandcomboListHHT'
			}
		},
	}
});