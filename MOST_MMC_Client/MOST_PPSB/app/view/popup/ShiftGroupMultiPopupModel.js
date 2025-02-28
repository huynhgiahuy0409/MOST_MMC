Ext.define('MOST.view.popup.ShiftGroupMultiPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.shiftgroupmultipopup',

	requires: [
		'Ext.data.proxy.Rest'
	],
	
	stores: {
		shiftList: {
			model: 'MOST.model.planning.RosterConfigurationMonthly',
			storeId: 'shiftListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rosterconfigurationmonthly/shiftdef'
			}
		},

		shiftGroupListOnlyStore: {
			model: 'MOST.model.planning.RosterConfigurationMonthly',
			storeId: 'shiftGroupListOnlyStoreId',
			showProgressBar : false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rosterconfigurationshift/shiftGroupListOnly'
			}
		},
		//added by Tim 19/03/2024
		deployedGroupStaffListOnlyStore: {
			model: 'MOST.model.configuration.RosterConfiguration',
			storeId: 'deployedGroupStaffListOnlyStoreStoreId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rosterconfigurationshift/deployedGroupStaffListOnly'
			}
		},
		getShiftGrpCdOnlyStore: {
			model: 'MOST.model.planning.RosterConfigurationMonthly',
			storeId: 'getShiftGrpCdOnlyStoreId',
			showProgressBar : false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rosterconfigurationshift/getShiftGrpCdOnly'
			}
		}
		,

		staffListStore: {
			model: 'MOST.model.configuration.RosterConfiguration',
			storeId: 'internalStaffMngListOnlyId',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rosterconfigurationshift/internalStaffMngListOnly'
			}
		},
		
		shiftGroupMultiList: {
			model: 'MOST.model.planning.RosterConfigurationMonthly',
			storeId: 'shiftGroupMultiListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rosterconfigurationmonthly/shiftgrouppopup'
			}
		},

		shiftGroupMultiList2: {
			model: 'MOST.model.planning.RosterConfigurationMonthly',
			storeId: 'shiftGroupMultiListStore2',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rosterconfigurationmonthly/shiftgrouppopup'
			}
		},
		
		shiftGroupMultiList3: {
			model: 'MOST.model.planning.RosterConfigurationMonthly',
			storeId: 'shiftGroupMultiListStore3',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rosterconfigurationmonthly/shiftgrouppopup'
			}
		},

		shiftGroupMultiList4: {
			model: 'MOST.model.planning.RosterConfigurationMonthly',
			storeId: 'shiftGroupMultiListStore4',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rosterconfigurationmonthly/shiftgrouppopup'
			}
		}
	}
});