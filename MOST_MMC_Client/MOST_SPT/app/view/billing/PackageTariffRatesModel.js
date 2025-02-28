Ext.define('MOST.view.billing.PackageTariffRatesModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.packagetariffrates',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.billing.PackageTariffRate',
	],
	stores:{
		
		masterPackTariffList: {
			model: 'MOST.model.billing.PackageTariffRate',
			storeId: 'masterPackTariffListId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/packagetariffrate/list',
			},
		},
		
		tariffCodeComboPkg : {
			fields: ['scdNm','scd'],
			storeId: 'SBUComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/commonCode/codeMasterList',
				extraParams: {
					lcd: 'MT',
					mcd: 'TRFTP'
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
		
		packageSumList:{
			model: 'MOST.model.billing.PackageTariffRate',
			storeId: 'packageSumListId',
		},
		
		berthListStore: {
			model: 'MOST.model.billing.PartnerTariffRate',
			storeId: 'bertStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/partnertariffrate/berth'
			}
		},
		
		packageTariffRateList:{
			model: 'MOST.model.billing.PackageTariffRate',
			storeId: 'packageTariffRateList',
		},

		deletedPackageTariffRateList:{
			model: 'MOST.model.billing.PackageTariffRate',
			storeId: 'deletePackageTariffRateList',
		},

		//Tariff Code Stores
		invoiceUnit1Combo:{
			model:'MOST.model.billing.InvoiceUnit',
			fields:['unitCd'],
			storeId: 'invoiceUnit1ComboStore'
		},
		
		invoiceUnit2Combo:{
			model:'MOST.model.billing.InvoiceUnit',
			fields:['unitCd'],
			storeId: 'invoiceUnit2ComboStore'
		},
		
		invoiceUnit3Combo:{
			model:'MOST.model.billing.InvoiceUnit',
			fields:['unitCd'],
			storeId: 'invoiceUnit3ComboStore'
		},
		
		gstTypeCombo:{
			fields:['gstTpCd', 'gstDesc', 'gstValue'],
			storeId: 'gstTypeComboStore'
		},
		
		freshwaterServiceCombo:{
			fields:['scd', 'scdNm'],
			storeId: 'freshwaterServiceComboStore'
		},
		
		tariffConditionList:{
			//fields:['scd', 'scdNm'],
			storeId: 'tariffConditionListStore'
		},
		
		tradeTypeListCombo:{
			fields:['scd', 'scdNm'],
			storeId: 'tradeTypeListComboStore'
		},
		
		dockageTypeListCombo:{
			fields:['scd', 'scdNm'],
			storeId: 'dockageTypeListComboStore'
		},
		
		equipmentTypeListCombo:{
			fields:['scd', 'scdNm'],
			storeId: 'equipmentTypeListComboStore'
		},
		
		equipmentCapaListCombo:{
			fields:['capaCd', 'capaDescr'],
			storeId: 'equipmentCapaListComboStore'
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

		tariffCodeDetail: {
			model: 'MOST.model.billing.TariffCode',
			storeId: 'tariffCodeDetailStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/tariffcode/detail'
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
	}
		
});
