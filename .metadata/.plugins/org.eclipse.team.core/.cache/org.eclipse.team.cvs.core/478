Ext.define('MOST.view.planning.RosterConfigurationMonthlyModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.rosterconfigurationmonthly',

	requires: [
		'Ext.data.proxy.Rest'
	],

	stores: {
        previewPDFRosterConfiguration: {
        	model: 'MOST.model.planning.RosterConfigurationMonthly',
        	storeId: 'previewPDFRosterConfiguration',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rosterconfigurationmonthly/previewpdf'
			}
		},
		
		shiftTypeCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shiftTypeComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_SHFT_TYPE,
					shftMethCd: ComboboxServiceConstants.COMBO_GROUP,
					useYn: 'Y'
				}
			}
		},
	}
});