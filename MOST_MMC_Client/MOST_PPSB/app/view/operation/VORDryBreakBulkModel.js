Ext.define('MOST.view.operation.VORDryBreakBulkModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.vordrybreakbulk',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.VORDryBreakBulk',
		'MOST.model.operation.ShiftingDoubleBanking',
	],
	
	formulas:{
  		
	},
	
	stores: {
		
		vorDryBreakBulk: {
			model: 'MOST.model.operation.VORDryBreakBulk',
			storeId: 'vorDryBreakBulkStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vordrybreakbulk/list'
			}
		},
		
		vorList: {
			model: 'MOST.model.operation.VORDryBreakBulk',
		},
		
		summaryOfHandling: {
			model: 'MOST.model.operation.VORDryBreakBulk',
		},
		
		vesselInformation: {
			model: 'MOST.model.operation.VORDryBreakBulk',
		},
		
		vesselOperationReport: {
			model: 'MOST.model.operation.VORDryBreakBulk',
			storeId: 'vesselInformationStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vordrybreakbulk/vesselinformation'
			}
		},

		generatePDFDryBreakBulk: {
			model: 'MOST.model.operation.VORDryBreakBulk',
			storeId: 'generatePDFDryBreakBulkStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vordrybreakbulk/generatepdfdrybreak'
			}
		},
		generatePDFDryBreakBulkDtl:  {
			model: 'MOST.model.operation.VORDryBreakBulk',
			storeId: 'generatePDFDryBreakBulkDtlStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vordrybreakbulk/generatepdfdrybreakdtl'
			}
		},

		generatePDFDryBreakBulk: {
			model: 'MOST.model.operation.VORDryBreakBulk',
			storeId: 'generatePDFDryBreakBulkStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vordrybreakbulk/generatepdfdrybreak'
			}
		},
		generateExcelDryBreakBulk: {
			model: 'MOST.model.operation.VORDryBreakBulk',
			storeId: 'generatePDFDryBreakBulkStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vordrybreakbulk/generateexceldrybreak'
			}
		},
		generatePDFDryBreakBulkDtl:  {
			model: 'MOST.model.operation.VORDryBreakBulk',
			storeId: 'generatePDFDryBreakBulkDtlStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vordrybreakbulk/generatepdfdrybreakdtl'
			}
		},

		handlingServiceReport: {
			model: 'MOST.model.operation.VORDryBreakBulk',
			storeId: 'handlingServiceReport',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vordrybreakbulk/handlingservicereport'
			}
		},
		
		
		checkDocumentDataStore: {
			model: 'MOST.model.operation.VORDryBreakBulk',
			storeId: 'handlingServiceReport',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vordrybreakbulk/checkdocumentdatastore'
			}
		},
		
		sftDblBankingList: {
			model: 'MOST.model.operation.ShiftingDoubleBanking',
			storeId: 'sftDblBankingListStore',
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
		
		detailOfHandling: {
			model: 'MOST.model.operation.VORDryBreakBulk',
		},
		
		stevedoreList: {
			model: 'MOST.model.operation.VORDryBreakBulk',
		},
		
		trimmingList: {
			model: 'MOST.model.operation.VORDryBreakBulk',
		},
		
		bulk: {
			model: 'MOST.model.operation.VORDryBreakBulk',
		},
		
		breakBulk: {
			model: 'MOST.model.operation.VORDryBreakBulk',
		},
		
		facilityList: {
			model: 'MOST.model.operation.VORDryBreakBulk',
		},
		
		deliveryMode: {
			model: 'MOST.model.operation.VORDryBreakBulk',
		},
		
		shiftCombo : {
			fields: ['name','code'],
			storeId: 'shiftComboStore',
			data :  [
						{"shftId":"", "shftNm":"All"},
						{"shftId":"SF0014", "shftNm":"1ST"},
						{"shftId":"SF0012", "shftNm":"2ND"},
						{"shftId":"SF0013", "shftNm":"3RD"}
					]
		},
	}
	
});