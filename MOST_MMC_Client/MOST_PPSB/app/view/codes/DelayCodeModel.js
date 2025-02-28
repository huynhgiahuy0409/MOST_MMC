Ext.define('MOST.view.codes.DelayCodeModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.delaycode',

	requires: [
		'Ext.data.proxy.Rest'
	],

	stores: {
		delayCodeGridList: {
			model: 'MOST.model.codes.DelayCode',
			storeId: 'delayCodeGridList',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/delaycode/delayCodeGridList'
			}
		},
		
		delayCodeBulkTypeCombo : {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'delayCodeBulkTypeCombo',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_CGTP
				}
			}
		},
		
		delayCodeCategoryCodeCombo: {},
		
		AcceptYnCombo : {},
	}
});