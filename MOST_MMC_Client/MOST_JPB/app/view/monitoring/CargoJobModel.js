Ext.define('MOST.view.monitoring.CargoJobModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.jobmonitoring',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.CargoJob'
	],
	data: {
		selectedRecord: null
	},	
	stores: {
		jobMonitoringAllData: {
			model: 'MOST.model.operation.CargoJob',
			storeId: 'jobMonitoringAllDataStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargojob/list'
			}
		},
		
		jobMonitoring: {
			model: 'MOST.model.operation.CargoJob',
			storeId: 'jobMonitoringStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargojob/list'
			}
		},
		
		shiftList: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shiftListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: 'SHFTTP',
					shftMethCd: 'Standard'
				}
			}
		},
		
		jobMonitoringHatchNoCombo: {
			model: 'MOST.model.foundation.dataitem.DataItem',
			storeId: 'jobMonitoringHatchNoComboStore',
			autoLoad: true,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
			        mcd: CodeConstants.MCD_MT_HTC,
			        scdUse:'Y'
			    }
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			              scd: ''
			          }]);
			     }
			}
		},
		
		jobMonitoringModeOfOprCombo: {
			model: 'MOST.model.foundation.dataitem.DataItem',
			storeId: 'jobMonitoringModeOfOprComboStore',
			autoLoad: true,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
			        mcd: CodeConstants.MCD_MT_TSPTTP,
			        scdUse:'Y',
			        isCargoJob: 'Y'
			    }
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			              scd: ''
			          }]);
			     }
			}
		},
		
		jobMonitoringPackageTypeCombo: {
			fields: ['scdNm','scd']
		},
		
		jobMonitoringYnCombo : {
			fields: ['scdNm','scd'],
		    data :  [{"scd":"Y", "scdNm":"Y"},
		    	     {"scd":"N", "scdNm":"N"}]
		},

		validationCheck: {
			storeId: 'validationCheckStoreId',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/validationcode/list',
				
			}
		},
	}
});