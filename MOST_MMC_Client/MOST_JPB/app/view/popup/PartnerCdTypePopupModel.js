Ext.define('MOST.view.popup.PartnerCdTypePopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.partnercdtypepopup',

	requires: [
	],

	stores: {
		ptnrTypeComboStore: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'payerCdTypeComboPopupModelStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd : CodeConstants.LCD_MOST,
					mcd : CodeConstants.MCD_CM_PTNRTP
				}
			},
			listeners: {
				load: function(store, records) {
					store.insert(0, [{
						scdNm: 'Select',
						scd: ''
					}]);
				}
			}
		},
		
		ptnrListPopupStore: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'payerCdTypePopupModelStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/partnercdpopup'
			}
		},
		
		codeNameComboStore: {
			fields: ['comName','comCode'],
			storeId: 'codeNameComboStoreId',
			data :  [
				{"comName": "Code",	"comCode": "CD"},
				{"comName": "Name",	"comCode": "NM"}
			]
		},
		
		payerCdTypeComboPopupModelStore: {
			storeId: 'payerCdTypeComboPopupModelStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/partnercodetype'
			}
		},
	}
});