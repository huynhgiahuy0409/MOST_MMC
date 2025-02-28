Ext.define('MOST.view.operation.hht.VesselShiftingHHTModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.vesselshiftinghht',

	requires: [
		'Ext.data.proxy.Rest',
	],
	
	data: {
		theDoubleBanking: null,
		theShipToShip: null,
		theVesselShifting: null,
		theCargoShifting: null
	},

	stores: {
		sftDblBankingList: {
			model: 'MOST.model.operation.ShiftingDoubleBanking',
			storeId: 'sftDblBankingListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/shifting/list'
			}
		},
		
		sftDblBankingRenderList: {
			model: 'MOST.model.operation.ShiftingDoubleBanking',
			storeId: 'sftDblBankingListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/shifting/list'
			}
		},
		stsInfo: {
			model: 'MOST.model.operation.ShiftingDoubleBanking',
			storeId: 'stsInfoStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/shifting/list'
			}
		},
		
		doubleBankingList:{
			model: 'MOST.model.operation.ShiftingDoubleBanking',
			storeId: 'doubleBankingListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/shifting/doubleBanking'
			}
		},
		
		stsOperationList:{
			model: 'MOST.model.operation.ShiftingDoubleBanking',
			storeId: 'stsOperationListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/shifting/shipToShip'
			}
		},
		
		vslShftList:{
			model: 'MOST.model.operation.ShiftingDoubleBanking',
			storeId: 'vslShftListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/shifting/vesselShifting'
			}
		},
		
		vslCurrWharftList:{
			model: 'MOST.model.operation.ShiftingDoubleBanking',
			storeId: 'vslCurrWharftListStore',
		},
		
		cgShftList:{
			model: 'MOST.model.operation.ShiftingDoubleBanking',
			storeId: 'cgShftListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/shifting/cargoShifting'
			}
		},
		
		cmdtCdListCombo:{
			model: 'MOST.model.operation.ShiftingDoubleBanking',
			storeId: 'cmdtCdListComboStore',
		},
		
		cgTpListCombo:{//cargo type combo
			model: 'MOST.model.operation.ShiftingDoubleBanking',
			storeId: 'cgTpListComboStore'
		},
		
		cgTpAllListCombo : {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'cgTpAllListComboStore',
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
		
		cmdtCdAllListCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'cmdtCdAllListComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_CMDT_CD
				}
			}
		},
		
		amountByOPRModeList:{
			model: 'MOST.model.operation.ShiftingDoubleBanking',
			storeId: 'amountByOPRModeListStore',
		},
		
		confirmationSlipList:{
			model: 'MOST.model.operation.ShiftingDoubleBanking',
			storeId: 'confirmationSlipListStore',
		},
		
		bankingTypeCombo:{
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'bankingTypeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_DBLBNKDIV
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		oprModeCombo:{
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'oprModeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_STSOPTP
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		hatchListCombo:{
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'hatchListComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_HTC
				}
			},
		},
		
		apFpListCombo:{
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'apFpListComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_HCHDRT
				}
			}
		},
		
		shiftPositionListCombo:{
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shiftPositionListComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_SHFPST
				}
			}
		},
		
		reasonListCombo:{
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'reasonListComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_SFTRSN
				}
			}
		},
		
		pilotYnCombo:{
			fields: ['scdNm','scd'],
			storeId: 'pilotYnComboStore',
			data :  [
				{'scd':'Y', 'scdNm': 'Yes'},
				{'scd':'N', 'scdNm':'No'}
            ]
		},
		
		crewListCombo:{
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'crewListComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_STCRTP
				}
			}
		},
		
		shftStyleListCombo:{
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shftStyleListComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_VSLSHFTTP
				}
			}
		},
		
		berths: {
			model: 'MOST.model.planning.berth.BerthStructure',
			storeId: 'berthsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/berthplan/berthstructure'
			}
		},
		vesselShiftingBerthInfoCombo : {
			fields: ['berthCd', 'berthCd'],
			model: 'MOST.model.operation.ShiftingDoubleBanking',
			storeId: 'vesselShiftingBerthInfoCombo'
		},
		
		shiftCombo:{
			fields: ['shftId','shftNm'],
			storeId: 'shiftComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/commonCode/shiftlist',
				extraParams: {
					useYn: 'Y',
					shftMethCd: 'Standard'
				}
			}
		},
		
		//HHT Tablet
		VSRValidationCode: {
			fields: ['isValidated'],
			storeId: 'cargoManualCtlValidationCodeStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/validationcode/list'
			}
		},
		
	}
});