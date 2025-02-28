Ext.define('MOST.view.operation.VesselDelayPenaltyReportModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.vesseldelaypenaltyreport',

	requires: [
		'Ext.data.proxy.Rest',
	],

	formulas: {

	},

	stores: {

		vesselDelayPntyList: {
			model: 'MOST.model.operation.VesselDelayPenaltyReport',
			storeId: 'vesselDelayPntyListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseldelaypnty/list'
			}
		},

		particularsCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'particularsComboStore',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/codeMaster/selectCodeMasterList',
			},
		},

		roleComboVesselDelay: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'particularsComboStore',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/codeMaster/selectCodeMasterList',
			},
		},

		shiftCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shiftComboStore',
			proxy: {
				type: 'rest',
				showProgressBar: false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_SHFTTP,
					shftMethCd: ComboboxServiceConstants.COMBO_STANDARD
				}
			},
			listeners: {
				load: function (store, records) {
					store.insert(0, [{
						shftNm: 'Select',
						shftId: ''
					}]);
				}
			}
		},

		hatchNoCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'hatchNoComboStore',
			proxy: {
				type: 'rest',
				showProgressBar: false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_HTC
				}
			},
			listeners: {
				load: function (store, records) {
					store.insert(0, [{
						scdNm: 'Select',
						scd: ''
					}]);
				}
			}
		},

		machineCombo: {
			fields: ['name', 'code'],
			storeId: 'machineComboStore',
			data: [{ "code": "SH", "name": "Shovel" },
			{ "code": "EX", "name": "Excavator" },
			{ "code": "BO", "name": "Both" },
			]
		},
	}
});