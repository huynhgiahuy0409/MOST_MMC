Ext.define('MOST.view.popup.ChassisMultiPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.chassismultipopup',

	requires: [],
	
	stores: {
		chassisMultiListiPopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'chassisMultiListiPopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/chassispopup'
			}
		}
	}
});