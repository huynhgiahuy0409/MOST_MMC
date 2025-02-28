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
		
		delayCodeTypeCombo : {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'delayCodeTypeCombo',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_SHFTTP
				}
			},
			listeners: {
				load: function(store, records) {
					let delayOp = ['TO0001', 'VO0001'];
					let filteredRecords = records.filter(record => delayOp.includes(record.data.scd));
									
					store.removeAll();
					store.add(filteredRecords);
				}
			}
		},
		
		duplicateCheckStore:{
			model: 'MOST.model.codes.DelayCode',
			storeId: 'duplicateCheckStore',
			proxy:{
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/delaycode/validateDuplicate'
			}
		},
		
		delayCodeYesNoCombo: {}
	}
});