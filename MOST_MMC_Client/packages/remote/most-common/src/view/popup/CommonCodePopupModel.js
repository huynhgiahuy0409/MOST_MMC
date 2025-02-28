Ext.define('MOST.view.popup.CommonCodePopupModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.commoncodepopup',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.popup.CommonCodePopup'
	],

	stores: {
		commonCodePopup: {
			model: 'MOST.model.popup.CommonCodePopup',
			storeId: 'commonCodePopupStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popupservice/popupList'
			}
		}
	}
});