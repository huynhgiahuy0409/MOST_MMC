Ext.define('MOST.view.operation.hht.YardCheckerHHTModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.yardcheckerhht',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.ConfirmDischargingOfRORO',
		'MOST.model.operation.ConfirmLoadingOfRORO',
		'MOST.model.operation.ConfirmHandlingInOfRORO',
		'MOST.model.operation.ConfirmHandlingOutOfRORO'
	],

	formulas:{},

	stores: {
//		vesselScheduleDetailHHT: {
//			model:'MOST.model.planning.VesselSchedule',
//			storeId: 'vesselScheduleDetailHHTStore',
//
//			proxy: {
//				type: 'rest',
//				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselschedule/vesseldetail'	
//			}
//		},
		
		yardCheckerHHTTabExport:{
			model: 'MOST.model.operation.ConfirmLoadingOfRORO',
			storeId: 'yardCheckerHHTTabExportStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmloadingofroro/yardExportListHHT'
			}
		},
		
		yardCheckerHHTTabImport:{
			model: 'MOST.model.operation.ConfirmDischargingOfRORO',
			storeId: 'yardCheckerHHTTabExportStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmdischargingofroro/yardImportListHHT'
			}
		},
		
		// Combo Start
		// ======================================================
		// D.Mode
		dmodeCombo : {
			fields: ['scdNm','scd'],
			data :  [{"scd":"", "scdNm":"Select"},
					{"scd":"D", "scdNm":"Direct"},
					{"scd":"I", "scdNm":"Indirect"}
	        ]
		},
		
		snCombo: {
			model: 'MOST.model.operation.ConfirmHandlingInOfRORO',
			storeId: 'snComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlinginofroro/sncombolist'
			}
		},
		
		blCombo: {
			model: 'MOST.model.operation.ConfirmHandlingOutOfRORO',
			storeId: 'blComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlingoutofroro/comboList'
			}
		},
		// Combo End
		// ======================================================

	}
});