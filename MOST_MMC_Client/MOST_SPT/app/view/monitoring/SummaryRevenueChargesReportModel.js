Ext.define('MOST.view.monitoring.SummaryRevenueChargesReportModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.summaryrevenuechargesreport',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.monitoring.SummaryRevenueChargesReport',
	],

	stores: {
		
		tariffTypeCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'tariffCodeDetailComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_TRFTP
				}
			}
		},
		
		terminalCombo : {
			fields: ['scdNm','scd'],
			storeId: 'terminalComboStore'
		},
	}
});