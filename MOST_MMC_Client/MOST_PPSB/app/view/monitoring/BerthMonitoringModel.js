Ext.define('MOST.view.monitoring.BerthMonitoringModel', {
	extend: 'MOST.view.foundation.BaseViewModel',
	
	alias: 'viewmodel.berthmonitoring',

	requires: [
		'MOST.model.common.Locale',
		'MOST.model.planning.berth.BerthStructure',
		'MOST.model.planning.berth.BittStructure',
		'MOST.model.planning.berth.BerthPlan'
	],
	
	data: {
		selectedBerthPlan: null,
		selectedSftBerthPlan: null,
		planIndex: -1,
		undoStack: [],
		undoRemained: 0,
		vesselSchedule: null
	},
    formulas: {
  		disable:{
  			bind:{
  				bindTo:'{selectedBerthPlan.vslStat}'
  			},
  			get:function(value){
				if(value === 'DPV') {
					return true;
				}else{
					return false;
				}
  			}
  		}
    },
	stores: {
		meta: {
			model: 'MOST.model.common.Locale',
			storeId: 'metaDrawingStore',
			proxy: {
				type: 'ajax',
				url: 'resources/data/MetaDrawBerthExplorer.json',
				reader: {
					type: 'json',
					rootProperty: 'data'
				}
			}
		},
		
		berths: {
			model: 'MOST.model.planning.berth.BerthStructure',
			storeId: 'berthsStore',
			proxy: {
				showProgressBar : false,
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/berthmonitoring/berthstructure'
			}
		},

		
		plans: {
			model: 'MOST.model.planning.berth.BerthPlan',
			storeId: 'plansStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/berthmonitoring/plans'
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
		bitts: {
			model: 'MOST.model.planning.berth.BittStructure',
			storeId: 'bittsStore',
			proxy: {
				showProgressBar : false,
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl()+ '/v1/berthplan/bittcodes'
			}
		},
		unitCombo : {}
	}
});