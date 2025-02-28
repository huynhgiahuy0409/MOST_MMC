Ext.define('MOST.view.monitoring.LoadingModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.loading',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.monitoring.Loading'
	],

	stores: {
		loading: {
			model: 'MOST.model.monitoring.Loading',
			storeId: 'loadingStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/loading/list'
			}
		},
		
		loadingCombo: {
			model: 'MOST.model.monitoring.Loading',
			storeId: 'loadingComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/loading/comboList'
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  shipgNoteNo: ''
			          }]);
			     }
			}
		},
		
		loadingSnNoCombo: {
			model: 'MOST.model.monitoring.Loading',
			storeId: 'loadingSnNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/loading/sncombolist'
			}
		},

		loadingManifestCombo: { //BookingNo
			model: 'MOST.model.monitoring.Loading',
			storeId: 'loadingManifestComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/loading/bookingcombolist'
			}
		},
		
		loadingReportList: {
			model: 'MOST.model.monitoring.Loading',
			storeId: 'loadingReportStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/loading/loadingreportlist'
			},
		},
		
		loadingOprCombo: {
			fields: ['tsptTpCdNm','tsptTpCd']
		},
		
		loadingHatchNoCombo: {
			fields: ['scdNm','scd']
		},
		
		loadingShiftCombo: {
			fields: ['shftNm','shftId']
		},
		
		loadingCompareCombo : {
		},
		
		jobPurposeModeCombo: {
			fields: ['scd','scdNm'],
			data :  [
				{"scd":"", "scdNm":"All"},
		    	{"scd":"GV", "scdNm":"Gate to Vessel (Direct)"},
		    	{"scd":"AV", "scdNm":"Apron to Vessel (Indirect)"},
		    	{"scd":"BV", "scdNm":"Bargo to Vessel (Direct)"},
		    	{"scd":"WA", "scdNm":"Warehouse to Apron (Indirect)"},
		    	{"scd":"GW", "scdNm":"Gate to Warehouse (Indirect)"}
			]
		},
		
		/*Add for HHT*/
		loadingSNComboHHT: {
			model: 'MOST.model.monitoring.Loading',
			storeId: 'loadingSNComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/loading/listHHT'
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
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/assignedtrucklist/unitNoListForROROExport'
			}
		},
	}
});