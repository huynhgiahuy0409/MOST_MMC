Ext.define('MOST.view.monitoring.DischargingModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.discharging',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.monitoring.Discharging'
	],

	stores: {
		discharging: {
			model: 'MOST.model.monitoring.Discharging',
			storeId: 'dischargingStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/discharging/list'
			}
		},
		
		dischargingCombo: {
			model: 'MOST.model.monitoring.Discharging',
			storeId: 'dischargingComboForAllStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/discharging/comboList'
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  blNo: ''
			          }]);
			     }
			}
		},
		
		dischargingReportList: {
			model: 'MOST.model.monitoring.Discharging',
			storeId: 'dischargingReportListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/discharging/dischargeReportList'
			},
		},
		
		dischargingBlNoCombo:{
			model: 'MOST.model.monitoring.Discharging',
			storeId: 'dischargingBlNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/discharging/blComboList'
			}
		},
		
		dischargingManifestCombo: { //Master BL
			model: 'MOST.model.monitoring.Discharging',
			storeId: 'dischargingManifestComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/discharging/mfComboList'
			}
		},
		
		dischargingOprCombo: {
			fields: ['tsptTpCdNm','tsptTpCd']
		},

		jobPurposeModeCombo: {
			fields: ['scd','scdNm'],
			data :  [
				{"scd":"", "scdNm":"All"},
		    	{"scd":"VG", "scdNm":"Vessel to Gate (Direct)"},
		    	{"scd":"VB", "scdNm":"Vessel to Barge (Direct)"},
		    	{"scd":"AB", "scdNm":"Apron to Barge (Direct)"},
		    	{"scd":"AW", "scdNm":"Apron to Warehouse (InDirect)"}
			]
		},
		
		dischargingHatchNoCombo: {
			fields: ['scdNm','scd']
		},
		
		dischargingShiftCombo: {
			fields: ['shftNm','shftId']
		},
		
		dischargingCompareCombo : {
		},
		
		/*Add for HHT */
		dischargingBlNoComboHHT: {
			model: 'MOST.model.monitoring.Discharging',
			storeId: 'dischargingBlNoHHTComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/discharging/blComboListHHT'
			}
		},
		
		cargoTpCombo: {
			storeId: 'cargoTpStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_CGTP
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		unitNosList: {
			model: 'MOST.model.monitoring.AssignedTruck',
			id: 'unitNosListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			autoLoad:false,
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/assignedtrucklist/unitNoListForROROImport'
			}
		},
	}
});