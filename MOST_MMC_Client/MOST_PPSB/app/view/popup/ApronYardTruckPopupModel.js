Ext.define('MOST.view.popup.ApronYardTruckPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.apronyardtruckpopup',

	requires: [],
	
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