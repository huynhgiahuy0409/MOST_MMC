Ext.define('MOST.view.billing.InvoiceTemplateModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.invoicetemplate',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.billing.InvoiceTemplate'
	],

	data: {
		theInvoiceTemplate: null
	},
	
	stores: {
		invoiceTemplateList: {
			model: 'MOST.model.billing.InvoiceTemplate',
			storeId: 'invoiceTemplateStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/invoiceTemplate/templatelist'
			}
		},
		
		invoiceTemplateTariffTypeList: {
			model: 'MOST.model.billing.TariffCode',
			storeId: 'invoiceTemplateTariffTypeListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/invoiceTemplate/tarifftypelist'
			}
		},
		
		invoiceTemplateTariffTypeComboList: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'invoiceTemplateTariffTypeListComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_TRFTP
				}
			}
		},
		
		invoiceTemplatePayerCombo : {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'invoiceTemplatePayerCombo'
		},
	
		searchCargoTpCdCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'CargoTpCdComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_CGTP
				}
			}
		},
		
		searchCategoryCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'CategoryComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_CATGTP
				}
			}
		},
		
		searchDeliveryTpCdCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'DeliveryTpCdComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_DELVTP
				}
			}
		},
		
		tariffByTemplate: {
			model: 'MOST.model.billing.ProofSheet',
			storeId: 'tariffStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/proofsheet/tariff/list'
			}
		}
	}
});