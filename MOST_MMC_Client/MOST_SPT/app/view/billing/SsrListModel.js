Ext.define('MOST.view.billing.SsrListModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.ssrlist',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.billing.SsrList'
	],

	stores: {
		
		ssrListList:{
			model: 'MOST.model.billing.SsrList',
			storeId:  'ssrListListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/ssrlist/list'
			}
		},
		ssrDetailList:{
			model: 'MOST.model.billing.SsrList',
			storeId:  'ssrDetailListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/ssrlist/detaillist'
			}
		},
		ssrValidation:{
			model: 'MOST.model.billing.SsrList',
			storeId:  'ssrValidationStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/ssrlist/ssrValidation'
			}
		},
		
		ssrDetailGrid:{
			model: 'MOST.model.billing.SsrList',
			storeId:  'ssrDetailGridStore',
		},
		
		ssrStatusCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'ssrStatusComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_IVSTAT
				}
			},
			listeners:{
				load: function(store, records){
					store.insert(0,[{scdNm: ' - ', scd: ''}])
				}
			}
		},
		
		ssrTypeCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'ssrTypeComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_SSRTP
				}
			},
			listeners:{
				load: function(store, records){
					store.insert(0,[{scdNm: ' - ', scd: ''}])
				}
			}
		},
		
		berthNoCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: '',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster', 
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_BERTH_LOC,
					locCd: CodeConstants.VC_TMNL_BBT,
					berthTp: CodeConstants.CM_BERTH_TP_WRF
				}
			},
			listeners:{
				load: function(store, records){
					store.insert(0,[{locNm: ' - ', locId: ''}])
				}
			}
		},
		
		whIdCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: '',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_WAREHOUSE_LOC,
					locDivCd: CodeConstants.MT_LOCDIV1_WHO //locDivCd
				}
			},
			listeners:{
				load: function(store, records){
					store.insert(0,[{scdNm: ' - ', scd: ''}])
				}
			}
		},
		
		vesselInfoStore: {
			model: 'MOST.model.billing.SsrList',
			storeId:  'IdVesselInfoStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/ssrlist/vessel'
			}
		},
		
		invoicePrefixCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId:'invoicePrefixComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: 'MT',
					mcd: 'IVPREFIX'
				}
			},
			listeners:{
				load: function(store, records){
					store.insert(0,[{scdNm: ' - ', scd: ''}])
				}
			}
		},
		payerStore: {
			fields: ['payerCd', 'accountNo', 'accountType'],
			storeId: 'payerStoreId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/ssrlist/ssrPayer'
			}
		},
		
		tariffCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId:'tariffComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_TRF_CD
				}
			},
			listeners:{
				load: function(store, records){
					store.insert(0,[{displayName: ' - ', trfCd: ''}])
				}
			}
		},
		
		costCenterCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId:'costCenterComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_COSTCNT_CD
				}
			},
			listeners:{
				load: function(store, records){
					store.insert(0,[{scdNm: 'Select', scd: ''}])
				}
			}
		},

		wthTaxCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'gstTypeComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_WHTAXTP
				}
			}
		},
		
		gstCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'taxTypeComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_TAXTP
				}
			}
		},
		
		tariffTypeCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'tariffTypeComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_TRFTP
				}
			}
		},
		
		invoiceListStore:{
			model: 'MOST.model.billing.InvoiceList',
			storeId: 'invoiceListStore',
			proxy:{
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/ssrlist/invoice'
			}
		},
		
		generatePDFSsr: {
			model: 'MOST.model.billing.SsrList',
			storeId: 'generatePDFSsrStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/ssrlist/previewpdfssr'
			}
		},

		ssrPDFStore:{
//			model: 'MOST.model.opertaion.GateOperations',
			model: 'MOST.model.billing.SsrList',
			storeId: 'gateOperationsPDFStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/pdfservice/getPrint'
			}
		},
		
		snBlCombo: {
			model: 'MOST.model.operation.DamageCheck',	
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/damageDimensionCheck/blSnNo'
			}
		},
		
		typePaymentCombo:{},
	}
});