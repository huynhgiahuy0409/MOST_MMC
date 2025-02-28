Ext.define('MOST.view.billing.ProofSheetModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.proofsheet',

	requires: [],
	
	data:{
		theTariffByTemplate: {
		},
		theTariffByType:{
		}
	},
	
	stores: {
		tariff: {
			model: 'MOST.model.billing.ProofSheet',
			storeId: 'tariffStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/proofsheet/tariff/list'
			},
			autoLoad:false
		},
		
		tariffByTemplate: {
			model: 'MOST.model.billing.ProofSheet',
			storeId: 'tariffStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/proofsheet/tariff/list'
			}
		},
		
		gathered: {
			model: 'MOST.model.billing.ProofSheet',
			storeId: 'gatheredStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/proofsheet/gathered/list'
			}
		},

		checkForeignExchangeRate: {
			model: 'MOST.model.billing.ProofSheet',
			storeId: 'checkForeignExchangeRateStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/proofsheet/gathered/checkforeignexchangerate',
				extraParams: {
		        }
			}
		},
		
		exchange: {
			model: 'MOST.model.billing.ProofSheet',
			storeId: 'exchangeStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/proofsheet/gathered/exchange',
				extraParams: {
		        }
			}
		},
		
		ptnrRateCombo: {
			model: 'MOST.model.billing.ProofSheet',
			storeId: 'ptnrRateComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/proofsheet/gathered/partnerRates',
				extraParams: {
					prcTpCd: 'P'
				}
			}
		},
		
		payerCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'payerComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_PAYER
				}
			},
			listeners: 
			{
			    load: function(store, records) {
			          store.insert(0, [{
			        	  payer: '',
			        	  payerNm: 'Select'
			          }]);
			    }
			}
		},

		proofSheetUserRefNoCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'proofSheetUserRefNoCombo',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_IV_USER_REF_NO
				}
			},
		},
		
		proofSheetSubBlSNNoCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'proofSheetSubBlSNNoCombo',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_IV_BL_SN
				}
			},
		},
		
		refNoCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'refNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_PROOFSHEET_REF_NO
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  refNo: 'Select'
			          }]);
			     }
			}
		},
		
		tariffTpCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'tariffTpComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_TRFTP
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
		
		templateCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'templateNmCombo',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_INVOICE_TEMPLATE
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
		
		costCenterComboOfPs : {
			fields: ['scdNm', 'scd'],
			storeId: 'costCenterComboOfPs',
			proxy: {
			   type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/proofsheet/combo/costcenter',
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
		
		prefixCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'prefixComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/proofsheet/combo/prefix',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_IVPREFIX
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
		
		currencyCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'currencyCombo',
			proxy: {
			   type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/proofsheet/currency/list',
				extraParams: {
		        }
			},
			listeners:
			{
			    load: function(store, records) {
			          store.insert(0, [{
			        	  currency: 'Select'
			          }]);
			    }
			}
		},
		
		taxTypeCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'gstTypeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_GST_RATE,
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_VATCD,
			        scdUse: 'Y'
				}
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  gstTpCd: 'Select',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		adhocCombo : {}
	}
	
});