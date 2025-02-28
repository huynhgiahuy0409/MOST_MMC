Ext.define('MOST.view.monitoring.GatePassListModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.gatepasslist',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.monitoring.GatePassList'
	],

	stores: {
		gatePassListData: {
			model: 'MOST.model.monitoring.GatePassList',
			storeId: 'gatePassListDataStore',	
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gatepasslist/gatePassList'
			}
		},
	
		generatePDFGatePass: {
			model: 'MOST.model.monitoring.GatePassList',
			storeId: 'generatePDFGatePassStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gatepasslist/generatepdfgatepass'
			}
		},
	
		generatePDFGatePassDetail: {
			model: 'MOST.model.monitoring.GatePassImport',
			storeId: 'generatePDFGatePassStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gatepassdetail/generatepdfgatepassdetail'
			}
		},
	
		gatePassDetail: {
			model: 'MOST.model.monitoring.GatePassImport',
			storeId: 'gatePassDetailStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gatepassdetail/gatePassDetailList'
			}
		},
		
		arrSchDModeCombo : {},
	
		arrShftIdCombo : {},
			
		sn2Combo: {	// MPTS : c3cmbSN
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shipgNoteComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SN_NO
				}
			}
		},
	
		blCombo: {	// MPTS : c2cmbBL
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'blNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BL_NO
				}
			}
		},
	
		sn1Combo: {	// MPTS : c2cmbSN
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shipgNoteComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SN_NO
				}
			}
		}
	}
});