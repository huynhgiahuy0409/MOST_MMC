Ext.define('MOST.view.vms.VesselMonitoringModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.vesselmonitoring',

	requires: [
		'Ext.data.proxy.Rest'
	],

	data: {
		aisinfo: null,
		aisportinfo: null
	},

	stores: {
		vesselStore: {
			model: 'MOST.model.map.common.Vessel',
			storeId: 'vesselStore'
		},
		
		vesselBulkStore: {
			model: 'MOST.model.map.common.Vessel',
			storeId: 'vesselBulkStore',
			proxy: {
				type: 'rest',			 
				//url: CONSTANTS.REST_DEST_URL + '/v1/bulk/vessels'
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/bulk/vessels'				
			}
		},
		vesselCarStore: {
			model: 'MOST.model.map.common.Vessel',
			storeId: 'vesselCarStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cars/vessels'
			}
		},
		vesselCoastStore: {
			model: 'MOST.model.map.common.Vessel',
			storeId: 'vesselCoastStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/coast/vessels'
			}
		},
		
		routeCodeStore: {
			model: 'MOST.model.map.common.Vessel',
			storeId: 'routeCodeStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/coast/routecodes'
				
			},
			listeners: {
				load: function (store) {
					var rec = Ext.create('MOST.model.map.common.Vessel', {id: 0, routeCode: 'ALL'});
					store.add(rec);
					store.getSorters().add('id');
				}
			}
		},
		
		vesselKindStore:{
			model: 'MOST.model.map.common.Vessel',
			storeId: 'vesselKindStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/coast/vesselkinds'
			}
		},

//		areaStore:{
//			model: 'MOST.model.map.common.Area',
//			storeId: 'areaStore',
//			proxy: {
//				type: 'rest',
//				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/area/data'
//			}
//		},		
		
		vesselKindLocalStore:{},
		
		portListStore: {
			model: 'MOST.model.map.port.Port',
			storeId: 'portListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/port/portlist'
			}
		},
		
		vesselScheduleOfPortStore: {
			model: 'MOST.model.map.port.Port',
			storeId: 'vesselScheduleOfPortStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/port/vesselScheduleofport'
			}
		},
		
		vesselScheduleOfPortSumStore: {
			model: 'MOST.model.map.port.Port',
			storeId: 'vesselScheduleOfPortSumStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/port/vesselScheduleofportsum'
			}
		},
		
		vesselImageStore:{
			model: 'MOST.model.map.common.VesselImage',
			storeId: 'vesselImageStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/coast/vesselimage'
			}
		},
		
		vesselLocationModifyStore:{
			model: 'MOST.model.map.common.Vessel',
			storeId: 'vesselLocationModifyStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/bulk/vessellocationmodify'
			}
		},
		
		vesselMovementStore:{
			model: 'MOST.model.map.common.Vessel',
			storeId: 'vesselMovementStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/coast/vesselmovements'
			}
		},
		
		simulationConditionStore:{
			model: 'MOST.model.map.common.SimulationCondition',
			storeId: 'simulationConditionStore'
		},
		
		simulationResultStore:{
			model: 'MOST.model.map.common.SimulationResult',
			storeId: 'simulationResultStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/port/netpas'
			}
		},
		
		netpasPortStore:{
			model: 'MOST.model.map.port.Port',
			storeId: 'netpasPortStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/port/netpasport'
			}
		}
	}
	
});