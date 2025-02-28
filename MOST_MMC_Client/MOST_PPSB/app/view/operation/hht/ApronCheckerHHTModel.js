Ext.define('MOST.view.operation.hht.ApronCheckerHHTModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.aproncheckerhht',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.ApronCheckerHHT',
		'MOST.model.operation.CargoManualCtl',
		'MOST.model.operation.ConfirmDischargingOfRORO',
		'MOST.model.operation.ConfirmLoadingOfRORO',
	],

	data: {
		selectedColumn : null
	},
	
	stores: {
		apronCheckerHHTTabExport: {
			model: 'MOST.model.operation.ConfirmLoadingOfRORO',
			storeId: 'confirmLoadingListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
//				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmloadingofroro/apronExportListHHT'
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmloadingofroro/list'
			}
		},
		
		apronCheckerHHTTabImport: {
			model: 'MOST.model.operation.ConfirmDischargingOfRORO',
			storeId: 'apronCheckerHHTTabImportStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmdischargingofroro/apronImportListHHT'
			}
		},
		
		// ======================================================
		// Combo Start
		snCombo: {
			model: 'MOST.model.operation.CargoManualCtl',
			storeId: 'snComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_SNNO_HHT
		        },
			},
		},
		
		blCombo: {
			model: 'MOST.model.operation.CargoManualCtl',
			storeId: 'blComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_BLNO_HHT
		        },
			},
		},
		
		apronCheckerSnCombo : {
			fields: ['scdNm','shipgNoteNo']
		},
		
		apronCheckerBlCombo : {
			fields: ['scdNm','blNo']
		},
		
		shiftCombo:{
			fields: ['shftId','shftNm'],
			storeId: 'shiftComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/commonCode/shiftlist',
				extraParams: {
					useYn: 'Y',
					shftMethCd: 'Standard'
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
		
		// Combo End
		// ======================================================
	},
	
});