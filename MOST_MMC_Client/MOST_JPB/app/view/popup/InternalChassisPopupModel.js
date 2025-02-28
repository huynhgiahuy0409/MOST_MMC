Ext.define('MOST.view.popup.InternalChassisPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.internalchassispopup',

	requires: [],
	
	stores: {
		chassisListPopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'chassisListPopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/internalchassispopup'
			}
		}
	}
});