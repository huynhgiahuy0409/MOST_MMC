Ext.define('MOST.view.operation.ContainerModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.container',
	requires: [],

	data : {
		selectedRecord: null,
		jpvcItem: null
	},

	stores: {
		containerProcessList: {
			model: 'MOST.model.controller.ContainerProcessItem',
			storeId: 'containerProcessListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/container/list',
			}
		},

		containerGridList: {
			model: 'MOST.model.controller.ContainerProcessItem',
			storeId: 'containerGridListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/container/list',
				writer: {
					type: 'json',
				}
			}
		},
		shiftStore: {
			fields: ['shftId','shftNm','fmHhmm','toHhmm'],
			storeId: 'shiftStore',
        },
        hatchNoStore : {
			// fields: ['cdNm','cd'],
			// storeId: 'hatchNoComboStore'
			fields:['scd', 'scdNm'],
			storeId: 'hatchNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams: {
					lcd: 'MT',
					mcd: 'HTC'
				}
			}
		},
		equipmentStore : {
			fields: ['eqNm','eqNo'],
			storeId: 'equipmentCombo'
		},

		// Combo End
		// ======================================================
	}
});