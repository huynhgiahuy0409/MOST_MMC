Ext.define('MOST.view.popup.ListofUnitForSnHHTPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.listofunitforsnhhtpopup',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.ConfirmLoadingOfRORO'
	],
	
	data: {
		selectedColumn : null
	},

	stores: {
		
		unitItems: {
			model: 'MOST.model.operation.ConfirmLoadingOfRORO',
			storeId: 'unitItemsListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmloadingofroro/unititemsHHT'
			}
		},
		
	}
});