Ext.define('MOST.view.popup.ChassisPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.chassispopup',

	requires: [],
	
	stores: {
		chassisListPopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'chassisListPopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/chassispopup'
			}
		}
	}
});