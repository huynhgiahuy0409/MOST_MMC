Ext.define('MOST.view.popup.CMMCdPopupHHTModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.cmmcdpopuphht',

	requires: [
	],

	stores: {
		commonCodePopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'commonCodePopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/cmmcdpopupmultiselect'
			}
		},
		
		commonCodeListStore: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'commonCodePopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/codeMaster'
			}
		},
		
		locationCodeListStore: {
			fields: ['scd','scdNm'],
			storeId: 'whComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/locationCodeList',			
			}
		},
		
		partnerCdPopupStore: {
//			model: 'MOST.model.popup.PartnerCdPopup',
			storeId: 'partnerCdPopupStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/partnercdpopup'
			}
		},
		
		commonCodePopupSearchCombo: {
			fields: ['comName','comCode'],
			storeId: 'commonCodePopupSearchComboStore',
			data :  [
				{"comName": "Code",	"comCode": "CD"},
				{"comName": "Name",	"comCode": "NM"}
			]
		},
		
		grideStore: {
			storeId: 'workingAreaHHTPopupGridStore',
		}
	}
});