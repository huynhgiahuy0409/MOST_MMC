Ext.define('MOST.view.planning.SpaceMovementRequestModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.spacemovementrequest',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.planning.SpaceMovementPlan'
	],

	stores: {
		spacemovementrequest: {
			model: 'MOST.model.planning.SpaceMovementPlan',
			storeId: 'spacemovementrequestStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/spacemovementrequest/list'
			}
		},
		
		spaceMovementRequestDetail: {
			model: 'MOST.model.planning.SpaceMovementPlan',
			storeId: 'spaceMovementRequestDetailStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/spacemovementrequest/spcmovementrequestdetail'
			}
		},

		roroYardPlanCargoItems: {
			model: 'MOST.model.planning.RoRoYardPlan',
			storeId: 'roroYardPlanUnitItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/roroyardplan/unitlist'
			}
		},
		
		warehouseDefinitionList: {
			model: 'MOST.model.configuration.WarehouseDefinition',
			storeId: 'warehouseDefinitionGridStore',
			pageSize: CommonConstants.PAGE_SIZE,
			autoLoad: true,
			proxy: {
				type: 'rest',
				extraParams: {
					locDivCd: CodeConstants.MT_LOCDIV1_WHO
				},
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/warehouse/list'
			}
		},
		
		unitNosList: {
			model: 'MOST.model.planning.RoRoYardPlan',
			id: 'unitNosListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			autoLoad:false,
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/roroyardplan/unitlist'
			}
		},
		
		// ======================================================
		// Combo Start
		spaceMovementRequestTypeCombo : {},
		
		spaceMovementRequestTypeExtraCombo : {},
		
		locationCombo:{
			storeId: 'locationComboStore',
			proxy:{
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_WAREHOUSE_LOC,
					locDivCd: CodeConstants.MT_LOCDIV1_WHO
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

		commodityGroupCombo: {
			model: 'MOST.model.planning.SpaceMovementPlan',
			storeId: 'commodityGroupComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/spacemovementrequest/multiplesearchfiltercombo'
			}
		},

		podCombo: {
			model: 'MOST.model.planning.SpaceMovementPlan',
			storeId: 'podComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/spacemovementrequest/multiplesearchfiltercombo'
			}
		},

		cngShpCombo: {
			model: 'MOST.model.planning.SpaceMovementPlan',
			storeId: 'cngShpComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/spacemovementrequest/multiplesearchfiltercombo'
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
		
		grJpvcCombo: {
			model: 'MOST.model.planning.SpaceMovementPlan',
			storeId: 'grJpvcComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/spacemovementrequest/gr'
			}
		},
		
		grNonJpvcCombo: {
			model: 'MOST.model.planning.SpaceMovementPlan',
			storeId: 'grNonJpvcComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/spacemovementrequest/gr'
			}
		},
		// Combo End
		spaceMovementInfo: {
			model: 'MOST.model.planning.SpaceMovementPlan',
			storeId: 'spaceMovementInfoStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/spacemovementrequest/space-movement-info'
			}
		},

		cargoInfo: {
			model: 'MOST.model.planning.SpaceMovementPlan',
			storeId: 'cargoInfoStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/spacemovementrequest/cargo-info'
			}
		},
		// ======================================================
		
		// ======================================================
		// Combo Start
		spaceMovementRequestForReqTypeCombo : {},
		
		spaceMovementRequestForStatusCombo : {},
		
		warehouseViewCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'warehouseViewComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_WAREHOUSE_LOC,
					locDivCd: CodeConstants.MT_LOCDIV1_WHO
				}				
			}
		},
		
		planLocationCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'planLocationComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_PLAN_LOC_ID
				}				
			}
		},
		
		goodsReceiptCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'goodsReceiptComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster'
			}
		},
		
		doCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'doComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster'
			}
		},
		
		VesselCallIdPopupStore: {
			model: 'MOST.model.popup.VesselCallList',
			storeId: 'JPVCPopupStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/vesselcalllistpopup'
			}
		},

		duplicatedRequest: {
			model: 'MOST.model.planning.SpaceMovementPlan',
			storeId: 'checkDuplicatedRequestStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/spacemovementrequest/duplicated-request'
			}
		}
		
		// Combo End
		// ======================================================
	}
});