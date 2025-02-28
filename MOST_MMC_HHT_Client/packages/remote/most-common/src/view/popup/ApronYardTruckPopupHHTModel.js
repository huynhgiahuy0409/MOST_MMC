Ext.define('MOST.view.popup.ApronYardTruckPopupHHTModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.apronyardtruckpopuphht',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.popup.PopupService'
	],
	
	stores: {

		apronYardTruckListPopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'apronYardTruckListPopup',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/apronyardtruckpopup'
			}
		}
	}
	
});