Ext.define('MOST.view.popup.ShippingNoteForStoragePopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.shippingnoteforstoragepopup',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.popup.ShippingNoteForStoragePopup'
	],

	stores: {
		shippingNoteForStoragePopupStore: {
			model: 'MOST.model.popup.ShippingNoteForStoragePopup',
			storeId: 'shippingNoteForStoragePopupStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/shippingnoteforstoragepopup'
			}
		}
	}
});