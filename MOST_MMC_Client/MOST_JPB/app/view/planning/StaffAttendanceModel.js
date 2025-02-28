Ext.define('MOST.view.planning.StaffAttendanceModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.staffattendance',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.planning.StaffAttendance',
		'MOST.model.planning.VOperationDeploy'
	],

	stores: {
		staffAttendanceStore: {
			model: 'MOST.model.planning.StaffAttendance',
			storeId: 'staffAttendanceListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffattendance/list'
			}
		},

		generatePDFStaffAttendance: {
			model: 'MOST.model.planning.StaffAttendance',
			storeId: 'generatePDFStaffAttendanceStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffattendance/generatepdfstfattd'
			}
		},

		staffAttendancePerShiftList: {
			model: 'MOST.model.planning.StaffAttendance',
			storeId: 'staffAttendancePerShiftListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffattendancepershift/list'
			}
		},

		staffAttendanceGrid: {
			model: 'MOST.model.planning.StaffAttendance',
			storeId: 'staffAttendanceGridStore',
		},

		staffAttendancePerShiftGrid: {
			model: 'MOST.model.planning.StaffAttendance',
			storeId: 'staffAttendanceGridStore',
		},
		// ======================================================
		// Combo Start
		shiftCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shiftComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_SHFTTP,
					shftMethCd: ComboboxServiceConstants.COMBO_STANDARD
				}
			},
			listeners: {
				load: function (store, records) {
					store.insert(0, [{
						shftNm: 'Select Shift',
						shftId: ''
					}]);
				}
			}
		},

		costCenterCombo: {
			fields: ['codeDescription', 'codeCostCenter'],
			storeId: 'CostCenterComboId'
		},

		yNStore: {
			fields: ['scdNm', 'scd'],
			data: [
				{ 'scd': 'Y', 'scdNm': 'Y' },
				{ 'scd': 'N', 'scdNm': 'N' }
			]

		},

		maYnStore: {
			fields: ['scdNm', 'scd'],
			data: [
				{ 'scd': 'Y', 'scdNm': 'Y' },
				{ 'scd': 'N', 'scdNm': 'N' }
			]

		},

		eaYnStore: {
			fields: ['scdNm', 'scd'],
			data: [
				{ 'scd': 'Y', 'scdNm': 'Y' },
				{ 'scd': 'N', 'scdNm': 'N' }
			]

		},

		berthUnberthingYnStore: {
			fields: ['scdNm', 'scd'],
			data: [
				{ 'scd': 'Y', 'scdNm': 'Y' },
				{ 'scd': 'N', 'scdNm': 'N' }
			]
		},

		incentiveYnStore: {
			fields: ['scdNm', 'scd'],
			data: [
				{ 'scd': 'Y', 'scdNm': 'Y' },
				{ 'scd': 'N', 'scdNm': 'N' }
			]

		},

		//End Added
		vOperationDeployList: {
			model: 'MOST.model.planning.VOperationDeploy',
			storeId: 'vOperationDeployListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/mega/VOperationDeployList'
			}
		},

		leaveTypeCombo: {
			fields: ['scdNm', 'scd'],
			data: [
				{ "scd": "", "scdNm": "Select Data" },
				{ "scdNm": "MC", "scd": "MC" },
				{ "scdNm": "HL", "scd": "HL" },
				{ "scdNm": "IAL", "scd": "IAL" },
			]
		},
		// Combo End
		// ======================================================
	}
});