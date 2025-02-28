Ext.define('MOST.view.billing.InvoiceListModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.invoicinglist',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.billing.InvoiceList'
	],
	stores:{
		//INVOICE LIST
		///////////////////////////////////////////////////////////////////////////
		invoiceListStore:{
			model: 'MOST.model.billing.InvoiceList',
			storeId: 'invoiceListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy:{
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/invoiceList/list'
			}
		},

		masterBlCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'masterBlCombo',
			proxy:{
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_MBL_NO
				}
			},
			listeners:{
				load: function(store, records){
					store.insert(0,[{scdNm: 'Select', mfDocId: ''}])
				}
			}
		},

		bookingNoCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'bookingNoCombo',
			proxy:{
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_BOOKING_NO
				}
			},
			listeners:{
				load: function(store, records){
					store.insert(0,[{scdNm: 'Select', mfDocId: ''}])
				}
			}
		},
		
		statusCombo:{
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'statusComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_IVSTAT
				}
			},
			listeners:{
				load: function(store, records){
					store.insert(0,[{scdNm: 'Select', scd: ''}])
				}
			}
		},

		invoiceTypeCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'invoiceTypeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_BILLINGTP
				}
			},
			listeners:{
				load: function(store, records){
					store.insert(0,[{scdNm: 'Select', scd: ''}])
				}
			}
		},
		
		prefixCombo:{
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'prefixComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_IVPREFIX
				}
			},
			listeners:{
				load: function(store, records){
					store.insert(0,[{scdNm: 'Select', scd: ''}])
				}
			}
		},

		paymentCombo:{},
		
		//DETAIL---------------------------------------------------
		costCentreCombo:{
			fields: ['scdNm', 'scd'],
			storeId: 'costCentreComboStore',
			proxy: {
			   type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/proofsheet/combo/costcenter',
			}
		},
		
		invPrefixCombo:{
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'invPrefixComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_IVPREFIX
				}
			}
		},
		
		invoiceCombo:{
			model: 'MOST.model.billing.InvoiceList',
			storeId: 'invoiceComboStore',
			field:['ivNo']
		},
		
		payerCombo:{
			model: 'MOST.model.billing.InvoicePayer',
			storeId: 'payerComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_PAYER
				}
			}
		},

		prefixDetailCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'prefixDetailComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_IV_PREFIX
				}
			}
		},
	
		invoiceListDetail:{
			model: 'MOST.model.billing.InvoiceList',
			storeId: 'invoiceListDetailStore',
			proxy:{
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/invoiceList/invoicelistdetail'
			}
		},
		
		invoiceList:{
			model: 'MOST.model.billing.InvoiceList',
		},
		
		vslCallIdPopup: {
			model: 'MOST.model.popup.VesselCallList',
			storeId: 'vslCallIdPopupStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/vesselcalllistpopup',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_PAYER
				}
			}
		},

//		invoiceTrfList:{
//			model: 'MOST.model.billing.InvoiceList',
//			storeId: 'invoiceTrfListStore',
//			proxy:{
//				type: 'rest',
//				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/artransaction/tranffer'
//			}
//		},
//
		currencyDetailCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'currencyComboStore',
			proxy:{
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_CURRENCY
				}
			}
		},
		
//			model: 'MOST.model.billing.Currency',
//			storeId: 'currencyDetailComboStore',
//			proxy:{
//				type: 'rest',
//				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/commonCode/comboCode'
//			}
//		},
//
		ivDetailUpload: {
			model : 'MOST.model.common.FileUpload',
			storeId: 'ivDetailUploadStore',
		},

//		currencyCombo: {
//			model: 'MOST.model.combobox.ComboBoxService',
//			storeId: 'currencyComboStore',
//			proxy:{
//				type: 'rest',
//				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
//				extraParams: {
//					searchType: ComboboxServiceConstants.COMBO_CURRENCY
//				}
//			}
//		},
//		
//		ivDownload : {
//			model : 'MOST.model.common.FileUpload',
//			storeId: 'ivDownloadStore',
//			proxy: {
//				type: 'rest',
//				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/filedownload/download'
//			}
//		},
//		
//		jpvcInfo:{
//			model: 'MOST.model.common.SearchVesselCall',
//			storeId: 'searchVesselCallDetailStore',
//			proxy: {
//				type: 'rest',
//				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/searchVesselCall/searchVesselCallList'
//			}
//		},
//		
//		generatePDFInvoice: {
//			model: 'MOST.model.billing.InvoiceList',
//			storeId: 'generatePDFInvoiceStore',
//			proxy: {
//				type: 'rest',
//				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/invoiceList/previewpdfinvoice'
//			}
//		},
		
	}

});