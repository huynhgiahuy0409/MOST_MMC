Ext.define('MOST.view.configuration.AllowanceConfigurationModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.allowanceconfiguration',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.configuration.AllowanceConfiguration'
	],

	stores: {
		allDataStore: {
			model: 'MOST.model.configuration.AllowanceConfiguration',
			storeId: 'allDataStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/allowance/allowanceconfiglist',
			}
		},
		
		allowanceValidate: {
			model: 'MOST.model.common.codes.Code',
			storeId: 'allowanceValidateStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/allowance/allowancevalidate',
			}
		},
		
		allowanceList: {
			model: 'MOST.model.configuration.AllowanceConfiguration',
			storeId: 'allowanceListStore'
		},
		
		multiskillList: {
			model: 'MOST.model.configuration.AllowanceConfiguration',
			storeId: 'multiskillListStore'
		},
		
		incentiveList: {
			model: 'MOST.model.configuration.AllowanceConfiguration',
			storeId: 'incentiveListStore'
		},
		
		fuelList: {
			model: 'MOST.model.configuration.AllowanceConfiguration',
			storeId: 'fuelListStore'
		},
		
		tonnageList: {
			model: 'MOST.model.configuration.AllowanceConfiguration',
			storeId: 'tonnageListStore'
		}, 

		dayoffList: {
			model: 'MOST.model.configuration.AllowanceConfiguration',
			storeId: 'dayoffListStore'
		},     

		bonusRmList: {
			model: 'MOST.model.configuration.AllowanceConfiguration',
			storeId: 'bonusRmListStore'
		},             
		
		allowanceType: {
			model: 'MOST.model.codes.DetailCode',
			storeId: 'allowanceTypeStore'
		},
		
		roleList: {
			model: 'MOST.model.codes.DetailCode',
			storeId: 'roleListStore'
		},
		
		gradeList: {
			model: 'MOST.model.codes.DetailCode',
			storeId: 'gradeList'
		},
		
		multiSkillTag:{
			fields:['scd','scdNm', 'disabled'],
			storeId: 'multiSkillTagStore',
			data :  [
				{"scdNm": "All", "scd": "all", "disabled": false},
				{"scdNm": "FD (Forklift Driver)", "scd": "FD", "disabled": false},
				{"scdNm": "OC (Operation Cleark)", "scd": "OC", "disabled": false},
				{"scdNm": "CO (Crane Operation)", "scd": "CO", "disabled": false},
				{"scdNm": "OS (Operation Supervisor)", "scd": "OS", "disabled": false}
            ]
		},
		
		staffList:{
			model: 'MOST.model.configuration.AllowanceConfiguration',
			storeId: 'staffListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/allowance/stafflist',
			}
		},
		
		capacityCodeEquipmentTypeGridCombo: {
			storeId: 'capacityCodeEquipmentTypeGridCombo',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/capacitycode/allCapacityCodeList',
				extraParams: {
					searchTp: 'EQ_TP'
				}
			}
		},
		
		capacityCodeEquipmentTypeCombo: {
			storeId: 'capacityCodeEquipmentTypeCombo',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/capacitycode/allCapacityCodeList',
				extraParams: {
					searchTp: 'EQ_TP'
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

		// leaveTypeCombo: {
		// 	fields: ['scdNm','scd'],
		// 	storeId: 'leaveTypeComboStore',
		// 	data :  [
		// 		{"scdNm": "Select Role", "scd": ""},
		// 		{"scdNm": "MC", "scd": "MC"},
		// 		{"scdNm": "HL", "scd": "HL"},
		// 		{"scdNm": "IAL", "scd": "IAL"},
        //     ]
		// },
	}
});