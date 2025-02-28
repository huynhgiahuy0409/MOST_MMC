Ext.define('MOST.view.operation.VORLiquidBulkModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.vorliquidbulk',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.VORLiquidBulk'
	],
	
	formulas:{
  		
	},
	
	data: {
		selectedCargoSummary: null,
		selectedDelay: null
	},
	
	stores: {
		berthAndOperationInfo: {
			model: 'MOST.model.operation.VORLiquidBulk',
			storeId: 'berthAndOperationInfoStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vorliquidbulk/berthandoperation'
			}
		},
		
		vorSummary: {
			model: 'MOST.model.operation.VORLiquidBulk',
			storeId: 'vorSummaryStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vorliquidbulk/vorsummary'
			}
		},
		
		vorDelaySummary: {
			model: 'MOST.model.operation.VORLiquidBulk',
			storeId: 'vorDelaySummaryStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vorliquidbulk/vordelaysummary'
			}
		},
		
		cgOprType: {
			model: 'MOST.model.operation.VORLiquidBulk',
			storeId: 'cgOprTypeStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vorliquidbulk/cgOprType'
			}
		},
		
		confirmationSlipDetailItem: {
			model: 'MOST.model.operation.VORLiquidBulk',
			storeId: 'confirmationSlipDetailItemStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vorliquidbulk/confirmationslipdetail'
			}
		},
		
		shiftCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shiftComboStore',
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
		
		cmdtCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'cmdtComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_VORLQ_CMDT
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
		
		tkOprCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'tkOprComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_VORLQ_TMNLOPE
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
		
		shprCnsneCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shprCnsneComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_VORLQ_SHPR
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
		
		cnsneCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'cnsneComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_VORLQ_CNSNE
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
		
		pkgTpCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'pkgTpComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_VORLQ_PKGTP
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
		
		cargoLiquidCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'cargoLiquidComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd : CodeConstants.LCD_MOST,
					mcd : CodeConstants.MCD_MT_CGTPLQ
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
		
		operationTpCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'operationTpComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd : CodeConstants.LCD_MOST,
					mcd : CodeConstants.MCD_MT_CGOPETP
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
		
		hoseTpCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'hoseTpComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd : CodeConstants.LCD_MOST
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
		
		vorLiquidBulkDetail: {
			model: 'MOST.model.operation.VORLiquidBulk',
			storeId: 'vorLiquidBulkDetailStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vorliquidbulk/detail'
			}
		},
		
		delayCodePopup: {
			model: 'MOST.model.operation.VesselDelay',
			storeId: 'delayCodePopupStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseldelay/delaycodelist'
			}
		},
		
		cargoSummary: {
			model: 'MOST.model.operation.VORLiquidBulk',
		},
		
		delaySummary: {
			model: 'MOST.model.operation.VORLiquidBulk',
		},
		lineComboTbl: {
			// fields: ['cmdtCd','no'],
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'lineComboTblStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams:{
					lcd: CodeConstants.LCD_MOST,
			        mcd: CodeConstants.MCD_MT_HSTP,
				}
				 
			},
		},
		cmdtComboTbl: {
			// fields: ['cmdtCd','no'],
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'cmdtComboTblStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_VORLQ_CMDT
				}
			},
		},
		blSnComboTbl: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'blSnComboTblStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_VORLQ_BLSN
				}
			},
		},
		hatchComboTbl: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'blSnComboTblStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams:{
					lcd: CodeConstants.LCD_MOST,
			        mcd: CodeConstants.MCD_MT_HTC,
			        scdUse:'Y'
				}
			},
			autoLoad: true
		},
		vorliquidbulkcmdt: {
			model: 'MOST.model.operation.VORLiquidBulk',
			storeId: 'vorSummaryStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vorliquidbulk/vorliquidbulkcmdtlist'
			}
		},

		vesselShifting: {
			model: 'MOST.model.operation.VORLiquidBulk',
		},
		jettyOprValidate:{
			model: 'MOST.model.operation.VORLiquidBulk',
			storeId: 'jettyOprValidate',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/validationcode/list'
			}
		},
		cgTpStore:{
			storeId: 'cgTpStore',
			fields:['cgTpCd'],
		},
		jobTpCdStore:{
			storeId: 'jobTpCdStore',
			fields:['jobTpCd'],
		},
		tkOprStore:{
			fields:['tkOpr'],
		},
		pkgTpCdStore:{
			fields:['pkgTpCd'],
		},
		shprCnsneStore:{
			fields:['shprCnsne'],
		},
		cnsneStore:{
			fields:['cnsne'],
		},
		oprTimeSetStore:{
			model: 'MOST.model.operation.VORLiquidBulk',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vorliquidbulk/oprtimesetlist'
			}
		},
		cboCgtpStore:{
			fields: ['cgTpCd','cgTpNm'],
			storeId: 'cboCgtpStore',
			data:[
				{cgTpCd:'Select', cgTpNm:'select'},
				{cgTpCd:'LQE', cgTpNm:'Edible'},
				{cgTpCd:'LQN', cgTpNm:'Non Edible'},
			]
		},
		delayCtgList: {
			fields: ['dlyCgt'],
			storeId: 'delayCtgListStore',
			data: [
				{ dlyCgt: 'A' },
				{ dlyCgt: 'B' },
				{ dlyCgt: 'C' },
				{ dlyCgt: 'D' },
				{ dlyCgt: 'E' },
				{ dlyCgt: 'F' },
				{ dlyCgt: 'G' },
				{ dlyCgt: 'H' },
				{ dlyCgt: 'I' },
				{ dlyCgt: 'J' },
				{ dlyCgt: 'K' },
				{ dlyCgt: 'L' },
				{ dlyCgt: 'M' },
				{ dlyCgt: 'N' },
				{ dlyCgt: 'O' },
				{ dlyCgt: 'P' },
				{ dlyCgt: 'Q' },
				{ dlyCgt: 'R' },
				{ dlyCgt: 'S' },
			]
		},
		delayCodeTbl: {
			model: 'MOST.model.operation.VORLiquidBulk',
			storeId: 'delayCodePopupStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vorliquidbulk/delaycodelist'
			}
		},
		delayJettyValidate:{
			model: 'MOST.model.operation.VORLiquidBulk',
			storeId: 'delayJettyValidateStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/validationcode/list'
			}
		},
		delayTimeSum: {
			model: 'MOST.model.operation.VORLiquidBulk',
			storeId: 'delayTimeSumStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vorliquidbulk/delayTimeSum'
			}
		},
		equipmentComboList : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'equipmentComboListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_EQ
				}
			},
		},
	}
});