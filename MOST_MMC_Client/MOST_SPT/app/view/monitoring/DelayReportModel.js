Ext.define('MOST.view.monitoring.DelayReportModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.delayreport',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.monitoring.DelayReport',
	],

	stores: {
		
		delayGroupCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'delayGroupComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_DELAYGRP
				}
			}
		},
		
		terminalCombo : {
			fields: ['scdNm','scd'],
			storeId: 'terminalComboStore'
		},
	}
});