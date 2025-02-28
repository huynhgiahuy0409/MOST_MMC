Ext.define('MOST.view.popup.CMMCdPopupMultiSelectModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.cmmcdpopupmultiselect',

	requires: [
	],

	stores: {
		commonCodeMultiSelect: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'payerCdTypeComboPopupModelStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/cmmcdpopupmultiselect'
			}
		},
		
		commonCodePopupSearchCombo: {}
	}
});