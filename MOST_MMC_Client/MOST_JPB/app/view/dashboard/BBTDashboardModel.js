// Web server communication javascript file
Ext.define('MOST.view.dashboard.BBTDashboardModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.bbtdashboard',

	requires: [
		'Ext.data.proxy.Rest'
	],

	stores: {

		shiftCombo:{
			fields: ['shftId','shftNm', 'fmHhmm', 'toHhmm'],
			storeId: 'shiftComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/bbtdashboard/shiftList'

			}
		},

		vesselCountStore : {
			storeId : 'dashboardcounts',
			proxy : {
				type : 'rest',
				showProgressBar : false,
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/bbtdashboard/selectVesselCount'
			}
		},

		terminalOccupancyStore : {
			storeId : 'terminalOccupancy',
			proxy : {
				type : 'rest',
				showProgressBar : false,
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/bbtdashboard/selectTerminalOccupancy'
			}
		},

		weatherForecastStore : {
			storeId : 'weatherForecastStore',
			proxy : {
				type : 'rest',
				showProgressBar : false,
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/bbtdashboard/selectWeatherForecast'
			}
		},

		accidentsIncidentsStore : {
			storeId : 'accidentsIncidentsStore',
			proxy : {
				type : 'rest',
				showProgressBar : false,
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/bbtdashboard/selectAccidentCounts'
			}
		},

		cargoOperationStore : {
			storeId : 'cargoOperation',
			proxy : {
				type : 'rest',
				showProgressBar : false,
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/bbtdashboard/selectCargoOperation'
			}
		},

        breakBulkSummaryStore : {
			storeId : 'breakBulkSummary',
			proxy : {
				type : 'rest',
				showProgressBar : false,
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/bbtdashboard/selectBulkSummary'
			}
		},

		liquidBulkSummaryStore : {
			storeId : 'liqiuidBulkSummary',
			proxy : {
				type : 'rest',
				showProgressBar : false,
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/bbtdashboard/selectBulkSummary'
			}
		},

		breakBulkHandlingBalanceStore : {
			storeId : 'breakBulkHandlingBalance',
			proxy : {
				type : 'rest',
				showProgressBar : false,
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/bbtdashboard/selectBulkHandlingBalanceCompare'
			}
		},

		liquidBulkHandlingBalanceStore : {
			storeId : 'liquidBulkHandlingBalance',
			proxy : {
				type : 'rest',
				showProgressBar : false,
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/bbtdashboard/selectBulkHandlingBalanceCompare'
			}
		},

		breakDryBulkProductivityStore : {
			storeId : 'breakDryBulkProductivityStore',
			proxy : {
				type : 'rest',
				showProgressBar : false,
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/bbtdashboard/selectBulkProductivity'
			}
		},

		liquidBulkProductivityStore : {
			storeId : 'liquidBulkProductivityStore',
			proxy : {
				type : 'rest',
				showProgressBar : false,
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/bbtdashboard/selectBulkProductivity'
			}
		},

		lorriesTurnaroundStore : {
			storeId : 'lorriesTurnaroundStore',
			proxy : {
				type : 'rest',
				showProgressBar : false,
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/bbtdashboard/selectLorriesTurnaround'
			}
		},

		warehouseYardHandlingStore : {
			storeId : 'warehouseYardHandlingStore',
			fields: ['jobTypeCd', 'jobTypeNm', 'handlingWgt'],
			proxy : {
				type : 'rest',
				showProgressBar : false,
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/bbtdashboard/selectWhYdHandling'
			}
		},

		breakDryBulkDelayStore : {
			storeId : 'breakDryBulkDelayStore',
			proxy : {
				type : 'rest',
				showProgressBar : false,
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/bbtdashboard/selectBulkDelay'
			}
		},

		liquidBulkDelayStore : {
			storeId : 'liquidBulkDelayStore',
			proxy : {
				type : 'rest',
				showProgressBar : false,
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/bbtdashboard/selectBulkDelay'
			}
		},

		breakDryBulkVslProductivityStore : {
			storeId : 'breakDryBulkVslProductivityStore',
		},

		breakDryBulkCrnProductivityStore : {
			storeId : 'breakDryBulkCrnProductivityStore',
		}

	}
});