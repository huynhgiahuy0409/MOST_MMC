Ext.define('MOST.view.popup.GateTicketNoPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.gateticketnopopup',

	requires: [],
	
	stores: {
		gateTicketNoPopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'gatePassPopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/gateticketnopopup'
			}
		}
	}
});