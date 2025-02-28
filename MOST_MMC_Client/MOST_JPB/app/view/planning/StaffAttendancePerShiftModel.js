Ext.define('MOST.view.planning.StaffAttendancePerShiftModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.staffattendancepershift',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.planning.StaffAttendance'
	],

	stores: {
		staffAttendancePerShiftStore: {
			model: 'MOST.model.planning.StaffAttendance',
			storeId: 'staffAttendancePerShiftStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/staffattendancepershift/list'
			}
		},
		// ======================================================

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
			storeId: 'CostCenterComboId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/ssrlist/costCenter',
			},
			listeners: {
				load: function (store, records) {
					store.insert(0, [{ codeDescription: 'Select', codeCostCenter: '' }])
				}
			}
		},

		yNStore: {
			fields: ['scdNm', 'scd'],
			data: [{ 'scd': 'Y', 'scdNm': 'Y' },
			{ 'scd': 'N', 'scdNm': 'N' }]

		}
		// Combo End
		// ======================================================
	}
});