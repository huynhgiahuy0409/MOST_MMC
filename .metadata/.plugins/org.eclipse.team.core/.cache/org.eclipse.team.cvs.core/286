Ext.define('MOST.view.codes.CodeMasterModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.codeMaster',

	requires: [
		'Ext.data.proxy.Rest'
	],

	stores: {
		largeCodeCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'largeCodeCombo',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() +  '/v1/combobox/codeMaster',
				extraParams: {
					searchType:ComboboxServiceConstants.COMBO_LCD
				}
			},
			listeners: 
			{
				load: function(store, records) {
			        store.insert(0, [{
			        	lcdNm: 'All',
			            lcd: ''
			       	}]);
				}
			}
		},
		
		largeCodeComboForGrid: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'largeCodeComboForGrid',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() +  '/v1/combobox/codeMaster',
				extraParams: {
					searchType:ComboboxServiceConstants.COMBO_LCD
				}
			}
		},
		
		middleCodeCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'middleCodeCombo',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() +  '/v1/combobox/codeMaster',
				extraParams: {
					searchType:ComboboxServiceConstants.COMBO_MCD
				}
			},
			listeners: 
			{
				load: function(store, records) {
			        store.insert(0, [{
			        	mcdNm: 'All',
			        	mcd: ''
			        }]);
			    }
			}
		},
		
		middleCodeComboForGrid: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'middleCodeComboForGrid',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() +  '/v1/combobox/codeMaster',
				extraParams: {
					searchType:ComboboxServiceConstants.COMBO_MCD,
					lcd: CodeConstants.LCD_MOST
				}
			}
		},
		
		DetailCodeCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'DetailCodeCombo',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/codeMaster/codeMaster'
			}
		},
		
		codeMaster: {
			model: 'MOST.model.codes.CodeMaster',
			storeId: 'codeMasterStore',
			pageSize:CommonConstants.PAGE_SIZE,
			autoLoad: false, 
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/codeMaster/selectCodeMasterSmallCodeList'
			}
		},
		
		duplicateCheck:{
			model: 'MOST.model.codes.CodeMaster',
			storeId: 'duplicateCheckStore',
			proxy:{
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/code/DetailCodes/validateDuplicate'
			}
		},
		
		yesNoValue: {},
		
		duplicateDetailCodeCheck: {
			model: 'MOST.model.codes.CodeMaster',
			storeId: 'duplicateDetailCodeCheckStore',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/codeMaster/duplicationCodeCheck'
			}
		}
	}
});