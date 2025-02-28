Ext.define('MOST.view.document.VesselScheduleRegisterModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.vesselscheduleregister',

	requires: [
		'Ext.data.proxy.Rest',
	],
	
    formulas: {
        vesselDetailFormDisabled: function(get) {
            return (new Boolean(get('globalVesselCallId'))) == true ? false : true ;
        }
    },	
	
	stores: {
		terminalCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'terminalCombo',
			autoLoad: true,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_VCS1,
		    		mcd: CodeConstants.MCD_VC_TMNL
		        },
			},
			listeners: 
			{
				load: function(store, records) {
					store.insert(0, [{
						optionName: 'Select',
						optionValue: ''
					}]);
				}
			}
		},
		
		berthWharfCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'berthWharfCombo',
			autoLoad: true,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_BERTH_LOC,
	        		scd: ''
		        },
			}
		},
		
		filterWharfCombo: {
			fields: ['optionName', 'optionValue'],
			storeId: 'filterWharfCombo',
		},
		
		purpCallCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'purpCallCombo',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_VCS1,
	        		mcd: CodeConstants.MCD_VC_POC,
	        		scd: ''
		        }
			},
			listeners: 
			{
				load: function(store, records) {
					store.insert(0, [{
						optionName: 'Select',
						optionValue: ''
					}]);
				}
			}
		},

		cargoTypeCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'CargoTypeCombo',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
	        		mcd: CodeConstants.MCD_MT_CGTP,
	        		scd: ''
		        }
			},
			listeners: 
			{
				load: function(store, records) {
					store.insert(0, [{
						optionName: 'Select',
						optionValue: ''
					}]);
				}
			}
		},
		
		vesselScheduleList: {
			model:'MOST.model.document.VesselScheduleRegister',
			storeId: 'vesselScheduleList',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselscheduleregister/list',
			}
		},
		
		vesselScheduleDetail: {
			model:'MOST.model.document.VesselScheduleRegister',
			storeId: 'vesselScheduleDetail',
			
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselscheduleregister/detail',
			}
		},
		
		vesselScheduleStatus: {
			model:'MOST.model.document.VesselScheduleRegister',
			storeId: 'vesselScheduleDetail',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselscheduleregister/detail/status',
			}
		},
		
		duplicateVesselCallIdStore: {
			model:'MOST.model.document.VesselScheduleRegister',
			storeId: 'vesselScheduleDetail',
			
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselscheduleregister/duplicatevesselcallid',
			}
		},
		
		confirmStates: {
			fields: ['scd','scdNm'],
			data: [
				{
					"scd" : "", 
					"scdNm": "Select"
				},
				{
					"scd" :"AP", 
					"scdNm" :"Approved"
				},
				{
					"scd" :"ST", 
					"scdNm":"Submitted"
				}
			]
		},
		
		freshWtCombo:{},
		
		chandellingCombo:{},
		
		qtyBunkerCombo:{},
		
		berthAlongSideCombo:{},
  		
  		cgOpTypeCombo: {}
	}
});