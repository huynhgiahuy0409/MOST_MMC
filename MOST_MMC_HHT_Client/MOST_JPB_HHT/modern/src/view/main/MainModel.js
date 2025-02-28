Ext.define('MOST.view.main.MainModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.main',

	requires: [
       'Ext.data.proxy.Rest',
       'MOST.model.main.Device'
	],
	
	data: {
		globalJpvcCheck: false,
		globalVesselCallId: null,
		globalVesselName: null,
		globalVesselLoa: null,
		globalWorkDate: null,
		globalWorkShift: null,
		globalWorkShiftDisplay: null,
		globalWorkShiftInfo: null,
		globalBerthNo: null,
		globalBerthFrom: null,		
		globalBerthTo: null,		
		globalWharfStart: null,		
		globalWharfEnd: null,		
		globalEta: null,
		globalAtb: null,
		globalArrivalPilotCheck: false,
		globalArrivalMooring: null,	
		globalArrivalTug: null,		
		globalAtw: null,
		globalAtc: null,
		globalAtu: null,
		globalDeparturePilotCheck: false,	
		globalDepartureMooring: null,
		globalDepartureTug: null,
		prevGlobalVsl: null,
		
	},
	
	stores: {
		cameraStore: {
			storeId: 'cameraStore',
			model: 'MOST.model.main.Device',
			autoLoad: false
		},
		
		berthListCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'berthListComboStore',
			//autoLoad: true,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselschedule/berthinfolist'	
			}
		},
		
		vesselScheduleDetailHHT: {
			model:'MOST.model.planning.VesselSchedule',
			storeId: 'vesselScheduleDetailHHTStore',

			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselschedule/vesseldetail'	
			}
		},
		
		menuListHHT: {
			storeId: 'menuListHHTStore',

			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/menu/hht'
			}
		},

		standardShift: {
			fields: ['scd', 'scdNm', 'shftId', 'fmHhMm', 'toHhMm'],
			storeId: 'standardShiftStoreId',
		},
		
		cacheServiceInfo:{
			model: 'MOST.model.common.LocalCacheInfo',
			storeId: 'cacheServiceInfoStore',
			proxy: {
			    type: 'ajax',
			    url: 'resources/data/LocalCacheInfo.json',
			    reader: {
	               type: 'json',
	               rootProperty: 'data'
			    }
			} 
		},
		
		opeShiftInfo: {
			fields: ['shftId','shftNm'],
			storeId: 'opeShiftInfoStoreId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/commonCode/shiftlist',
				extraParams: {
					useYn: 'Y',
					shftMethCd: 'Standard'
				}
			}
		},
	}
});