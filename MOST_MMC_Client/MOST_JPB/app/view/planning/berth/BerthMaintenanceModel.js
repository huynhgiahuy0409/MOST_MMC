Ext.define('MOST.view.planning.berth.BerthMaintenanceModel', {
	extend: 'MOST.view.foundation.BaseViewModel',
	
	alias: 'viewmodel.berthmaintenance',

	requires: [
        'Ext.data.proxy.Rest',
		'MOST.model.planning.berth.BerthMaintenance'
	],
	
	
	stores: {
		berthMaintenanceList: {
			model: 'MOST.model.planning.berth.BerthMaintenance',
			storeId: 'berthMaintenanceListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/berthmaintenance/list'
			}
		},

        berthLocCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'berthLocComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_BERTH_LOC
				}
			},
		},

        bittCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'bittComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_BITT
				}
			},
		},

        stoppageReasonCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'stoppageReasonComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_STOPPAGE_REASON
				}
			},
		},

        checkDuplicate: {
			model: 'MOST.model.planning.berth.BerthMaintenance',
			storeId: 'checkDuplicateStore',
			proxy:{
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/berthmaintenance/checkduplicate'
			}
		},
	}
});