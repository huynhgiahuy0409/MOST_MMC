Ext.define('MOST.view.popup.InternalTruckPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.internaltruckpopup',

	requires: [],
	
	stores: {
		lorryListPopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'lorryListPopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/internaltruckpopup'
			}
		}
	}
});