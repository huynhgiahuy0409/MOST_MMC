Ext.define('MOST.view.planning.ShiftingApprovalModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.shiftingapproval',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.planning.ShiftingApproval'
	],

	stores: {
		shiftingAprrovalStore:{
			model: 'MOST.model.planning.ShiftingApproval',
			storeId: 'idComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/shiftingapproval/list'
			}
		},
		generatePDFShftApprv: {
			model: 'MOST.model.planning.ShiftingApproval',
			storeId: 'generatePDFStaffAttendanceStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/shiftingapproval/generatepdfshftapprv'
			}
		},
		comboStore: {
			model: 'MOST.model.planning.ShiftingApproval',
			storeId: 'idComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/shiftingapproval/combo'
			}
		},
		positionStore: {
			field: ['scd', 'scdNm'],
			storeId: 'idPositionStore'
		},
		reasonStore: {
			field: ['scd', 'scdNm'],
			storeId: 'idReasonStore'
		},
		ATBCombo:{
			fields:['scd', 'scdNm'],
			storeId: 'idATBComboStore',
			data :  [
				{'scd':'ATB', 'scdNm':'ATB'},
				{'scd':'ETB', 'scdNm':'ETB'}
            ]
		},
	}
});