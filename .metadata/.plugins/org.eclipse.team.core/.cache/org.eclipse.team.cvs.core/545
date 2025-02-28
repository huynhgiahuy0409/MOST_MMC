Ext.define('MOST.view.popup.MasterBLForMultiPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.masterblformultipopup',

	requires: [
		'MOST.model.monitoring.Discharging',
		'MOST.model.combobox.ComboBoxService',
	],
	
	stores: {
		commonCodeMulti: {
			model: 'MOST.model.monitoring.Discharging',
			storeId: 'commonCodeMultiStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/masterblpopupmultiselect'
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
		     		mcd:CodeConstants.MCD_MT_MSBL
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