Ext.define('MOST.view.planning.SpaceMovementSummaryModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.spacemovementsummary',

	requires: [
		'Ext.data.proxy.Rest'
	],

	stores: {
		masterListspaceMovementSummary: {
			model: 'MOST.model.planning.SpaceMovementSummary',
			storeId: 'spaceMovementSummaryStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/spacemovementsummary/list'
			}
		},
		
		spaceMovementSummary: {
			model: 'MOST.model.planning.SpaceMovementSummary',
			storeId: 'spaceMovementSummaryStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/spacemovementsummary/list'
			}
		},
		
		
		spaceMovementPlanForReqTypeCombo : {
		},
		
		whCombo: {
			fields: ['code','codeName'],
			storeId: 'whComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/locationCodeList',
				extraParams: {
					locDivCd: 'WHO',
					searchType: 'LocDef'
				}
			}
		},

		masterBLCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'masterBLComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_MBL_NO
				}
			}
		},

		bookingNoCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'bookingNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BOOKING_NO
				}
			}
		},
		
		snBlCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'snComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SN_NO
				}
			}
		},
		
		rehandleBlNoCombo:{
			fields: ['blNo']
		},
		
		rehandleSnNoCombo:{
			fields: ['shipgNoteNo']
		},
		
		grNonJpvcCombo: {
			model: 'MOST.model.planning.SpaceMovementSummary',
			fields: ['grNo'],
			storeId: 'grNonJpvcComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/spacemovementrequest/gr'
			}
		},

		grCombo: {
			model: 'MOST.model.planning.SpaceMovementSummary',
			fields: ['grNo'],
			storeId: 'grComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/spacemovementrequest/gr'
			}
		},
		
		blCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'blComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BL_NO
				}				
			}
		},
		
		snCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'snComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SN_NO
				}
			}
		},
		

	}
});