Ext.define('MOST.view.codes.GeneralCodeModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.generalcode',

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
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType:ComboboxServiceConstants.COMBO_LCD
				}
			},
		},
		
		systemCodeComboCud: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'systemCodeComboCud',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType:ComboboxServiceConstants.COMBO_LCD
				}
			}
		},
		
		CodeCombo: {
			fields: ['mcd'],
			storeId: 'CodeCombo',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/generalcode/selectCode'
			}
		},

		generalCode: {
			model:'MOST.model.codes.GeneralCode',
			storeId: 'generalCodeStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/generalcode/selectCodesList'
			}
		},
		
		checkDuplicate:{
			model: 'MOST.model.codes.GeneralCode',
			storeId: 'checkDuplicateStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/generalcode/selectCodesList'
			}
		},
		
		codeInUseCheck: {
			model: 'MOST.model.codes.GeneralCode',
			storeId: 'codeInUseCheck',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/generalcode/entities/checkCodeInUse'
			}
		},
		
		yesNoValue:{}
	}
});