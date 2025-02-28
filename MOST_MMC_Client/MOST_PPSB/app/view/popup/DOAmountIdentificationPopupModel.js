Ext.define('MOST.view.popup.DOAmountIdentificationPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.doamountidentificationpopup',

	requires: [
	],

	stores: {
		updateDoWgtStore: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'updateDoWgtStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/blinfo/updateDoWgt'
			}
		},
	}
});