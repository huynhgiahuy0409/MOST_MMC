Ext.define('MOST.view.popup.PartnerCdPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.partnercdpopup',

	requires: [
	],

	stores: {
		partnerCdPopupStore: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'partnerCdPopupStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/partnercdpopup'
			}
		},
		
		partnerCdPopupSearchCombo: {
			fields: ['comName','comCode'],
			storeId: 'partnerCdPopupSearchComboId',
			data :  [
				{"comName": "Code",	"comCode": "CD"},
				{"comName": "Name",	"comCode": "NM"}
			]
		}
	}
});