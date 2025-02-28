Ext.define('MOST.view.popup.GatePassPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.gatepasspopup',

	requires: [],
	
	stores: {
		gatePassPopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'gatePassPopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/gatepasspopup'
			}
		}
	}
});