Ext.define('MOST.view.popup.DriverListPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.driverlistpopup',

	requires: [
	],

	stores: {
		driverListPopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'commonCodePopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/driverspopup'
			}
		},
		
		driverListPopupSearchCombo: {},
		
	}
});