Ext.define('MOST.view.billing.ProformaInvoiceModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.proformainvoice',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.billing.ProformaInvoice'
	],
	
	stores: {
		invoiceTypeCombo : {},
		
		proformaInvoiceList : {
			model: 'MOST.model.billing.ProformaInvoice',
			storeId: 'proformaInvoiceListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/proformainvoice/list'
			}
		},
		
		//----------DETAIL---------
		proformaInvoiceDataItems: {
			model: 'MOST.model.billing.ProformaInvoice',
			groupField: 'groupingField',
			storeId: 'proformaInvoiceDataItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/proformainvoice/createproforma'
			}
		},
		
		payerCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'payerComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_DOC_PAYER_INFO
				}
			},
			listeners: {
				load: function(store, records) {
					store.insert(0, [{
						payerNm: 'Select',
						payer: ''
					}]);
				}
			}
		},
		
		blCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'blComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_BL_NO
				}
			}
		},
		
		masterBLCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'masterBLComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_IV_MBL_NO
				}
			}
		},
		
		blSnCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'mfComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_BL_NO_SN_NO
				}
			}
		},
		
		shippingNoteCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shippingNoteComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_SN_NO
				}
			}
		},
		
		bookingNoCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'bookingNoComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_IV_BOOKING_NO
				}
			}
		},
		
		vesselInfo: {
			model: 'MOST.model.popup.VesselCallList',
			storeId: 'vesselInfoStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/vesselcalllistpopup'
			}
		},
		
		gatheringData: {
			model: 'MOST.model.billing.DataGathering',
			storeId: 'gatheringDataStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/proformainvoice/gathering'
			}
		},
		
		settlementData: {
			model: 'MOST.model.billing.DataGathering',
			storeId: 'settlementDataStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/proformainvoice/settlement'
			}
		},
		
		cashCollectionCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'cashCollectionCombo',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_COLTP
				}
			},
		},
	}
});