Ext.define('MOST.view.popup.ExternalTruckPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.externaltruckpopup',

	requires: [
		 'MOST.model.popup.PopupService',
	],
	
	stores: {
		lorryListPopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'lorryListPopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/lorryspopup'
			}
		}
	}
});