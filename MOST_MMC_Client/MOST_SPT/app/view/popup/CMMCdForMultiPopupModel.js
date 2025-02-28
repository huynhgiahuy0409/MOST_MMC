Ext.define('MOST.view.popup.CMMCdForMultiPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.cmmcdformultipopup',

	requires: [
	],
	
	stores: {
		commonCodeMulti: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'commonCodeMultiStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/cmmcdpopupmultiselect'
			}
		},
		
		codeMasterListCommodityCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'codeMasterListCommodityComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
		     		lcd :CodeConstants.LCD_MOST,
		     		mcd:CodeConstants.MCD_MT_CGTP
				}
			},
			listeners: 
			{
				load: function(store, records) {
					store.insert(0, [{
						scdNm: '-',
						scd: ''
					}]);
				}
			}
		},
		
		codeNameCombo: {}
	}
});