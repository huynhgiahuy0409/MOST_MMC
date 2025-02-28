Ext.define('MOST.view.controller.GatePassListModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.gatepasslist',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.controller.GatePassList',
		// 'MOST.model.popup.CargoMaster'
	],

	stores: {
		gatePassListData: {
			model: 'MOST.model.controller.GatePassList',
			storeId: 'gatePassListDataStore',	
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gatepasslist/gatePassList'
			}
		},
		generatePDFGatePass: {
			model: 'MOST.model.controller.GatePassList',
			storeId: 'generatePDFGatePassStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gatepasslist/generatepdfgatepass'
			}
		},
		// cargoMasterCombo: {
		// 	model: 'MOST.model.popup.CargoMaster',
		// 	storeId: 'cargoMasterComboStore',	
		// 	proxy: {
		// 		type: 'rest',
		// 		url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gatepasslist/cargoMasterCombo'
		// 	}
		// },
		blCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'blComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_OPR_BLNO
				}
			}			
		},
		snCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'snComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_OPR_SNNO
				}
			}		
		},
		grCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'snComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_OPR_GR
				}
			}		
		},
		generatePDFGatePassDetail: {
			model: 'MOST.model.controller.GatePassImport',
			storeId: 'generatePDFGatePassStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gatepassdetail/generatepdfgatepassdetail'
			}
		},
		
		gatePassDetail: {
			model: 'MOST.model.controller.GatePassImport',
			storeId: 'gatePassDetailStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gatepassdetail/gatePassDetailList'
			}
		},
		arrSchDModeCombo : {
			fields: ['label','data'],
			storeId: 'arrSchDModeComboStore',
			data :  [
				{label:"Select",               data:""},
				{label:"Both Direct/Indirect", data:"B"},
				{label:"Indirect",             data:"I"},
				{label:"Direct",               data:"D"}
			]
		},
		
		arrShftIdCombo : {
			fields: ['label','data'],
			storeId: 'arrSchDModeComboStore',
			data :  [
				{label:"Select Shift",         data:""},
				{label:"1ST",				   data:"SF0014"},
				{label:"2ND",             	   data:"SF0012"},
				{label:"3RD",             	   data:"SF0013"}
			]
		},
				
		// sn2Combo: {	// MPTS : c3cmbSN
		// 	model: 'MOST.model.popup.CargoMaster',
		// 	storeId: 'sn2ComboStore'
		// },
		
		// blCombo: {	// MPTS : c2cmbBL
		// 	model: 'MOST.model.popup.CargoMaster',
		// 	storeId: 'blComboStore'
		// },
		
		// sn1Combo: {	// MPTS : c2cmbSN
		// 	model: 'MOST.model.popup.CargoMaster',
		// 	storeId: 'sn1ComboStore'	
		// },

		// docList:{
		// 	model: 'MOST.model.controller.WHReconciliationItem',
		// 	storeId: 'docListStore',
		// 	proxy: {
		// 		type: 'rest',
		// 		url: MOST.config.Locale.getRestApiDestUrl() + '/v1/whreconciliation/list',
		// 	}
		// },

		shippingNoteListCombo:{
			fields:['docNo'],
			storeId:'shippingNoteListComboStore'
		},

		blListCombo:{
			fields:['docNo'],
			storeId:'blListComboStore'
		},

		grListCombo:{
			fields:['docNo', 'shipgNoteNo'],
			storeId:'grListCombo'
		},

	}
	
});