Ext.define('MOST.view.popup.LorrysMultiPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.lorrysmultipopup',

	requires: [],
	
	stores: {
		lorryMultiListiPopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'lorryMultiListiPopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/lorryspopup'
			}
		}
	}
});