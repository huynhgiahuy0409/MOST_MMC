Ext.define('MOST.view.planning.MegaModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.mega',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.planning.Mega'
	],
	
	data: {
		selectedColumn : null
	},
	
	formulas:{
		shipClewYnChecked:{
  			bind:{
  				bindTo:'{theCrew.shipClewYn}'
  			},
  			get:function(value){
  				var me = this;
  				if(value === "Y"){
  					return true; 
  				} else {
  					return false;
  				}
  			},
  			set:function(value){
  				var me = this;
  				var stringValue = "N";
  				
  				if(value == true){
  					stringValue = "Y";
  				}
  				
				var detailItem = me.getView().getViewModel().get('theCrew');
				detailItem.set("shipClewYn", stringValue);
  			}
  		},
  		whApprYnChecked:{
  			bind:{
  				bindTo:'{theMain.whApprYn}'
  			},
  			get:function(value){
  				var me = this;
  				if(value === "Y"){
  					return true; 
  				} else {
  					return false;
  				}
  			},
  			set:function(value){
  				var me = this;
  				var stringValue = "N";
  				
  				if(value == true){
  					stringValue = "Y";
  				}
  				
				var detailItem = me.getView().getViewModel().get('theMain');
				detailItem.set("whApprYn", stringValue);
  			}
  		}
	},

	stores: {
		megaRequisition: {
			model: 'MOST.model.planning.Mega',
			storeId: 'megaRequisitionStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/mega/list'
			}
		},
		
		megaRequisitionForInsertData: {
			model: 'MOST.model.planning.Mega',
			storeId: 'megaRequisitionStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/mega/list'
			}
		},
		
		megaRequisitionShiftCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'megaRequisitionShiftComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SHFTTP,
					shftMethCd : ComboboxServiceConstants.COMBO_STANDARD
				}
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  shftNm: 'Select',
			        	  shftId: ''
			          }]);
			     }
			}
		},
		
		megaRequisitionDeploymentCombo: {},
		
		megaRequisitionPurposeCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'megaRequisitionComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_MGPURP,
					scdUse: 'Y'
				}
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		megaRequisitionMegaStatusCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'megaRequisitionMegaStatusComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_MEGASTAT,
					scdUse: 'Y'
				}
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		megaDetailYNCombo : {},
		
		// ======================================================
		// Mega Detail Start
		megaDetailList: {
			model: 'MOST.model.planning.Mega',
			storeId: 'megaDetailListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/mega/megadetail'
			}
		},
		
		megaDetailVesselScheduleWarehouse: {
			model: 'MOST.model.planning.Mega',
			storeId: 'megaDetailVesselScheduleWarehouseStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/mega/warehouseSnDoList'
			}
		},
		
		megaDetailVesselScheduleSn: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'megaDetailVesselScheduleSnStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SN_NO
				}
			},
		},
		
		megaDetailVesselScheduleDo: {
			fields: ['dono','dono']
		},
		
		megaDetailValidationCode: {
			model: 'MOST.model.planning.Mega',
			storeId: 'megaDetailValidationCodeStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/mega/validationCode'
			}
		},
		
		megaDetailPenalty: {
			model: 'MOST.model.planning.Mega',
			storeId: 'megaDetailPenaltyStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/mega/penalty'
			}
		},
		
		megaDetailEqTypeComboForMechanical: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'megaDetailEqTypeComboForMechanicalStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_EQFCTPCD,
					scdLgv: CodeConstants.MT_EQFCDIVCD_EQ,
					scdVal: CodeConstants.MT_EQCD_MC,
					scdUse: 'Y',
					isMega: 'Y'
				}
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		megaDetailMechanicalCapacityCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'megaDetailMechanicalCapacityComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_EQU_CAPA_CD,
					scdLgv: CodeConstants.MT_EQFCDIVCD_EQ,
					scdVal: CodeConstants.MT_EQCD_MC
				}
			}
		},
		
		megaDetailEqTypeComboForPortCrane: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'megaDetailEqTypeComboForPortCraneStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					scdLgv: CodeConstants.MT_EQFCDIVCD_EQ,
					scdVal: ComboboxServiceConstants.COMBO_PORT_CRANE_CD,
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_EQFCTPCD,
					scdUse: 'Y',
					isPortCrane: 'Y'
				}
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		megaDetailPortCraneCapacityCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'megaDetailPortCraneCapacityComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_EQU_CAPA_CD,
					scdLgv: CodeConstants.MT_EQFCDIVCD_EQ,
					scdVal: ComboboxServiceConstants.COMBO_PORT_CRANE_CD
				}
			}
		},
		
		megaDetailEqTypeComboForGears: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'megaRequisitionMegaStatusComboStore',
			fields: ['scd', 'scdNm'],
		    data: [
		        { scd: 'GR', scdNm: 'GEAR' }
		    ]
		},
		
		megaDetailGearsCapacityCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'megaRequisitionGearsCapacityComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_EQU_CAPA_CD,
					scdLgv: CodeConstants.MT_EQFCDIVCD_EQ,
					scdVal: CodeConstants.MT_EQCD_GR
				}
			}
		},
		
		confirmationSlipDryBreakBulk: {
			model: 'MOST.model.planning.Mega',
			storeId: 'confirmationSlipDryBreakBulkStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/mega/confirmationSlipDryBreakBulk'
			}
		},
		
		megaStevedoreList: {
			model: 'MOST.model.planning.Mega',
			storeId: 'megaStevedoreListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/mega/stervedoreList'
			}
		},
		
		// Mega Detail End
		//=====================================================
		
		megaDetailForkliftCapacityCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'megaDetailForkliftCapacityComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_EQU_CAPA_CD,
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_EQFCTPCD,
					eqDivCd: CodeConstants.MT_EQFCTPCD_FL,
					scdLgv: CodeConstants.MT_EQFCDIVCD_EQ
				}
			}
		},
		
		megaDetailTrailerCapacityCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'megaDetailTrailerCapacityComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_EQU_CAPA_CD,
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_EQFCTPCD,
					eqDivCd: CodeConstants.MT_EQFCTPCD_TR
				}
			}
		},
		
		megaDetailShiftCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'megaDetailShiftComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SHFTTP,
					shftMethCd: ComboboxServiceConstants.COMBO_STANDARD
				}
			}
		},
		
		megaDetailPurposeCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'megaDetailPurposeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_MGPURP,
					scdUse: 'Y'
				}
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select Purpose',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		megaDetailCargoTypeCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'megaDetailCargoTypeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_CGTP,
					scdUse: 'Y'
				}
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		megaDetailGears: {
			model: 'MOST.model.planning.Mega',
			storeId: 'megaDetailGearsStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/mega/equipmentList',
				extraParams:{
					divCd: CodeConstants.MT_EQFCDIVCD_EQ,
					eqDivCdType: CodeConstants.MT_EQCD_GR
				}
			},
		},
		
		megaDetailTabGearsCompany: {
			model: 'MOST.model.planning.OperInfo'
		},
		
		megaDetailForklift: {
			model: 'MOST.model.planning.Mega',
			storeId: 'megaDetailForkliftStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/mega/equipmentList',
				extraParams:{
					divCd: CodeConstants.MT_EQFCDIVCD_EQ,
					eqDivCdType: CodeConstants.MT_EQCD_FL
				}
			},
		},
		
		megaDetailTabForkliftCompany: {
			model: 'MOST.model.planning.OperInfo'
		},
		
		megaDetailTrailer: {
			model: 'MOST.model.planning.Mega',
			storeId: 'megaDetailTrailerStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/mega/equipmentList',
				extraParams:{
					divCd: CodeConstants.MT_EQFCDIVCD_EQ,
					eqDivCdType: CodeConstants.MT_EQCD_TR
				}
			},
		},
		
		megaDetailTabTrailerCompany: {
			model: 'MOST.model.planning.OperInfo'
		},
		
		megaDetailMechanical: {
			model: 'MOST.model.planning.Mega',
			storeId: 'megaDetailMechanicalStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/mega/equipmentList',
				extraParams:{
					divCd: CodeConstants.MT_EQFCDIVCD_EQ,
					eqDivCdType: CodeConstants.MT_EQCD_MC
				}
			},
		},
		
		megaDetailTabMechanicalCompany: {
			model: 'MOST.model.planning.OperInfo'
		},
		
		megaDetailPortCrane: {
			model: 'MOST.model.planning.Mega',
			storeId: 'megaDetailPortCraneStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/mega/equipmentList',
				extraParams:{
					divCd: CodeConstants.MT_EQFCDIVCD_EQ,
					eqDivCdType: ComboboxServiceConstants.COMBO_PORT_CRANE_CD
				}
			},
		},
		
		megaDetailTabPortCraneCompany: {
			model: 'MOST.model.planning.OperInfo'
		},
		
		megaDetailCargoDetail: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'megaDetailCargoDetailStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_CGDESC,
					scdUse: 'Y'
				}
			}
		},
		
		megaDetailCargoDetailList: {
			model: 'MOST.model.planning.Mega',
			storeId: 'megaDetailCargoDetailListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/mega/selectCargoDetail',
			}
		},
		
		megaDetailCargoDetailInfo: {
			model: 'MOST.model.planning.Mega'
		},
		
		generatePDF: {
			model: 'MOST.model.planning.Mega',
			storeId: 'generatePDFStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/mega/previewpdf'
			}
		},
		
		ptnrList: {
			model: 'MOST.model.administrator.SearchUserRegisterParm',
			storeId: 'ptnrList',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl()  + '/v1/ptnr/ptnrList'
			}
		},
		
		vesselCallIdList: {
			model: 'MOST.model.common.SearchVesselCall',
			storeId: 'searchVesselCallDetailStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/mega/selectSearchVesselCallId'
			}
		}
		// Mega Detail End
		// ======================================================
	}
});