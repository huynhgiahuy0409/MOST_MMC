Ext.define('MOST.view.billing.TariffCodeModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.tariffcode',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.billing.TariffCode'
	],

	stores: {
		tariffCodeList: {
			model: 'MOST.model.billing.TariffCode',
			storeId: 'tariffCodeListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/tariffcode/list'
			}
		},
		
		tariffCodeDetail: {
			model: 'MOST.model.billing.TariffCode',
			storeId: 'tariffCodeDetailStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/tariffcode/detail'
			}
		},
		
		duplicateCheckStore: {
			model: 'MOST.model.billing.TariffCode',
			storeId: 'duplicateCheckStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/tariffcode/list'
			}
		},
		
		validRefChildBeforeDelete: {
			model: 'MOST.model.billing.TariffCode',
			storeId: 'validRefChildBeforeDeleteStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/tariffcode/validRefChildBeforeDelete'
			}
		},
		
		tariffCodeCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'SBUComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_TRFTP
				}
			}
		},
		
		tariffCodeDetailCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'tariffCodeDetailComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_TRFTP
				}
			}
		},
		
		costCenterCombo : {
			fields: ['costCntCd'],
			storeId: 'costCenterCombo',
			proxy: {
			   type: 'rest',
			   showProgressBar : false,
			   url: MOST.config.Locale.getRestApiDestUrl() + '/v1/tariffcode/costcenter',
			}
		},
		
		financialCodeCombo : {
			fields: ['financialCode'],
			storeId: 'financialCodeCombo',
			proxy: {
			   type: 'rest',
			   showProgressBar : false,
			   url: MOST.config.Locale.getRestApiDestUrl() + '/v1/tariffcode/financialcode',
			}
		},
		
		billingTypeCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'billingTypeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_BILLINGTP
				}
			}
		},
		
		ssrTypeCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'ssrTypeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_SSRTP
				}
			}
		},
		
		standardTraderCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'standardTraderComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_PTNRTP,
					col2: 'STANDARD_PAYER'
				}
			}
		},
		
		purposeOfCallCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'purposeOfCallComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_VCS,
					mcd: CodeConstants.MCD_VC_POC
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		vesselTypeCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'vesselTypeComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_VCS,
					mcd: CodeConstants.MCD_VC_VSLTP
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		categoryCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'categoryCombotore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_CATGTP
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		invoiceUnit1Combo:{
			model:'MOST.model.billing.InvoiceUnit',
			fields:['unitCd'],
			storeId: 'invoiceUnit1ComboStore',
			
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/invoiceunit/list',
				extraParams: {
					unitTpCd: 'UNIT1'
				}
			}
		},
		
		invoiceUnit2Combo:{
			model:'MOST.model.billing.InvoiceUnit',
			fields:['unitCd'],
			storeId: 'invoiceUnit2ComboStore',
			
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/invoiceunit/list',
				extraParams: {
					unitTpCd: 'UNIT2'
				}
			}
		},
		
		invoiceUnit3Combo:{
			model:'MOST.model.billing.InvoiceUnit',
			fields:['unitCd'],
			storeId: 'invoiceUnit3ComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/invoiceunit/list',
				extraParams: {
					unitTpCd: 'UNIT3'
				}
			}
		},
		
		gstTypeCombo:{
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
		
		freshwaterServiceCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'freshwaterServiceComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_FWSVC,
			        scdUse: CommonConstants.YES
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
		
		tariffConditionList:{
			//fields:['scd', 'scdNm'],
			storeId: 'tariffConditionListStore'
		},
		
		tradeTypeListCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'tradeTypeListComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_VCS1,
					mcd: CodeConstants.MCD_VC_TOV,
			        scdUse: CommonConstants.YES
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
		
		dockageTypeListCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'dockageTypeListComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_DKGTP,
			        scdUse: CommonConstants.YES
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
		
		equipmentTypeListCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'equipmentTypeListComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_EQFCTPCD,
			        scdUse: CommonConstants.YES
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
		
		equipmentCapaListCombo:{
			fields:['capaCd', 'capaDescr'],
			storeId: 'equipmentCapaListComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/capacitycode/capacityCodeList',
				extraParams: {
					searchTp: 'CAPA_LIST'
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  capaDescr: 'Select',
			        	  capaCd: ''
			          }]);
			     }
			}
		},
		
		wireTypeListCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'wireTypeListComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_WTYPE
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
		
		operationTypeCombo:{},
		
		vehicleCombo:{},
		
		wbLryUseCombo:{},

		//s-BILL-003 Tariff Code – Another tab Modification
		chargePerWBCombo:{
			data: [
				{
					scd: 1,
					scdNm: '1 Time'
				},
				{
					scd: 2,
					scdNm: '2 Times'
				}
			]
		},
		//e-BILL-003 Tariff Code – Another tab Modification
		operatorCombo : {
			fields: ['scd',{
				name:'scdNm',
				convert: function(value) {
					return Ext.htmlDecode(value);
				}
			}],
			storeId: 'operatorComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: 'COPC'
				},
			},
			listeners: 
			{
				load: function(store, records) {
					store.insert(0, [{
						scdNm: null,
						scd: ''
					}]);
				}
			}
		},
		
		category1FilterComboStore : {
            model: 'MOST.model.combobox.ComboBoxService',
            storeId: 'category1FilterComboStore',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
                extraParams: {
                	lcd: CodeConstants.LCD_MOST,
                	mcd: CodeConstants.MCD_MT_SVCORDCTG1
                }
            }
        },

        category2FilterComboStore : {
        	model: 'MOST.model.combobox.ComboBoxService',
            storeId: 'category2FilterComboStore',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
                extraParams: {
                	lcd: CodeConstants.LCD_MOST,
                	mcd: CodeConstants.MCD_MT_SVCORDCTG2
                }
            }
        },

        category3FilterComboStore : {
        	model: 'MOST.model.combobox.ComboBoxService',
            storeId: 'category3FilterComboStore',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
                extraParams: {
                	lcd: CodeConstants.LCD_MOST,
                	mcd: CodeConstants.MCD_MT_SVCORDCTG3
                }
            }
        },
        
        proformaYNComboStore : {}
	}
});