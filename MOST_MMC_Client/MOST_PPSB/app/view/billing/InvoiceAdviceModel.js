Ext.define('MOST.view.billing.InvoiceAdviceModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.invoiceadvice',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.billing.InvoiceAdvice',
		'MOST.model.billing.InvoiceAdviceDetail',
		'MOST.model.popup.VesselCallList'
	],

	stores: {
		invoiceAdviceList: {
			model: 'MOST.model.billing.InvoiceAdvice',
			storeId: 'invoiceAdviceListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/invoiceadvice/list'
			}
		},
		
		invoiceAdviceDetailList: {
			model: 'MOST.model.billing.InvoiceAdvice',
			storeId: 'invoiceAdviceDetailList',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/invoiceadvice/detaillist'
			}
		},
		
		InvoiceAdviceDetailValidationCode: {
			fields: ['isValidated'],
			storeId: 'InvoiceAdviceDetailValidationCodeStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/validationcode/list'
			}
		},
		
		invoiceAdviceDetailValidationCode: {
			fields: ['isValidated'],
			storeId: 'invoiceAdviceDetailValidationCode',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/validationcode/list'
			}
		},
		
		tariffTypeCombo : {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'tariffTypeComboStore',
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
		
		loadingAndDischargingCombo: {},
		
		invoiceAdviceHeadList:{
			model:'MOST.model.billing.InvoiceAdviceDetail'
		},
		
		invoiceAdviceDetailGridList:{
			model:'MOST.model.billing.InvoiceAdviceDetail',
		},
		
		invoiceAdviceDetailHistoryGridList:{
			model:'MOST.model.billing.InvoiceAdviceDetail'
		},
		
		invoiceAdviceDetailDuplicate:{
			model:'MOST.model.billing.InvoiceAdviceDetail'
		},
		
		ionvoiceAdviceDetailCommodityCodeCombo : {
			storeId: 'commodityCodeCategoryStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/codeMaster/selectCommodityCodeCombo',
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
		
		ionvoiceAdviceDetailRquesterCombo : {
			fields: ['ptyTpCd','ptyCd'],
			storeId: 'ionvoiceAdviceDetailRquesterCombo'
		},
		
		ionvoiceAdviceDetailPayerCombo : {
			fields: ['ptyTpCd','ptyCd'],
			storeId: 'ionvoiceAdviceDetailPayerCombo'
		},
		
		ionvoiceAdviceDetailBillingItemCombo : {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'ionvoiceAdviceDetailBillingItemCombo',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_BL_NO
				}
			}
		},
		
		ionvoiceAdviceDetailShippingNoteItemCombo : {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'ionvoiceAdviceDetailShippingNoteItemCombo',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_SN_NO
				}
			}
		},
		
		generatePDFInvoiceAdvice: {
			model: 'MOST.model.billing.InvoiceAdviceDetail',
			storeId: 'generatePDFInvoiceAdviceStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/invoiceadvice/previewpdfinvoiceadvice'
			}
		},
		
		exportReport: {
			model: 'MOST.model.billing.InvoiceAdviceDetail',
			storeId: 'exportReportStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/invoiceadvice/export'
			}
		},

		vesselCallListPopupStore: {
			model: 'MOST.model.popup.VesselCallList',
			storeId: 'JPVCPopupStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/vesselcalllistpopup'
			}
		},
		
	}
});