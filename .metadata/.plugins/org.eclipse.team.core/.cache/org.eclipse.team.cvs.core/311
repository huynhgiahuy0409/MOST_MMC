Ext.define('MOST.view.dashboard.CargoFlowDashboardModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.cargoflowdashboard',

	requires: [
		'Ext.data.proxy.Rest'
	],
	
	stores: {
		vesselschedule: {
			model: 'MOST.model.dashboard.CargoFlowDashboard',
			storeId: 'cargoFlowDashboardStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargoflowdashboard/vesselschedule'
			}
		},
		dischargingcommoditylist: {
			model: 'MOST.model.dashboard.CargoFlowDashboard',
			storeId: 'cargoFlowDashboardStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargoflowdashboard/dischargingcommoditylist'
			}
		},
		loadingcommoditylist: {
			model: 'MOST.model.dashboard.CargoFlowDashboard',
			storeId: 'cargoFlowDashboardStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargoflowdashboard/loadingcommoditylist'
			}
		},
		discharginghatchvessellist: {
			model: 'MOST.model.dashboard.CargoFlowDashboard',
			storeId: 'cargoFlowDashboardStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargoflowdashboard/discharginghatchvessellist'
			}
		},
		loadinghatchvessellist: {
			model: 'MOST.model.dashboard.CargoFlowDashboard',
			storeId: 'cargoFlowDashboardStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargoflowdashboard/loadinghatchvessellist'
			}
		},
		unitCombo : {}
		
		
	}
});