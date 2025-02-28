Ext.define('MOST.view.monitoring.DischargingModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.discharging',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.monitoring.Discharging'
	],

	stores: {
		discharging: {
			model: 'MOST.model.monitoring.Discharging',
			storeId: 'dischargingStore',
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

		dischargingBlNoCombo:{
			fields: ['blNo']
		},
		
		dischargingBlNoComboForAll: {
			model: 'MOST.model.monitoring.Discharging',
			storeId: 'dischargingBlNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/discharging/blComboList'
			}
		},
		
		//dischargingOprCombo
//		dischargingOprCombo: {
//			fields: ['tsptTpCdNm','tsptTpCd']
//		},
		dischargingOprCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'dischargingOprComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_MOD_OPR
				}
				 
			},
		},
		//end
		
		//dischargingHatchNoCombo
//		dischargingHatchNoCombo: {
//			fields: ['scdNm','scd']
//		},
		dischargingHatchNoCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'dischargingHatchNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_HATCH_NO_HHT
				}
			}
		},
		//end
		
		//dischargingShiftCombo
//		dischargingShiftCombo: {
//			fields: ['shftNm','shftId']
//		},
		loadingShiftCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'loadingShiftComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SHFTTP
				}
			}			
		},
		//end
		
		dischargingCompareCombo : {
			fields: ['scdNm','scd'],
		    data :  [{"scd":"Mt", "scdNm":"MT"},
		    	     {"scd":"M3", "scdNm":"M3"},
		    	     {"scd":"Qty", "scdNm":"QTY"}]
		},
		
		//dischargingBlNoComboHHT
		/*Add for HHT */
//		dischargingBlNoComboHHT: {
//			model: 'MOST.model.monitoring.Discharging',
//			storeId: 'dischargingBlNoHHTComboStore',
//			proxy: {
//				type: 'rest',
//				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/discharging/blComboListHHT'
//			}
//		},
		dischargingBlNoComboHHT: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'dischargingBlNoComboHHTStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BLNO
				}
			}			
		},
		//end
		
		
	}
});