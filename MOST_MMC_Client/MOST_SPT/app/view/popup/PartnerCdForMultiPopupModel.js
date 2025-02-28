Ext.define('MOST.view.popup.PartnerCdForMultiPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.partnercdformultipopup',

	requires: [
	],
	
	stores: {
		partnerCdForMultiList: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'partnerCdForMultiListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/partnercdpopup'
			}
		},
		
		partnerCdForMultiCdNmCombo: {}
	}
});