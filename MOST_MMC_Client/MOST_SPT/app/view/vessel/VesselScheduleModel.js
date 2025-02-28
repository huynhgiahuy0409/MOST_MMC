Ext.define('MOST.view.vessel.VesselScheduleModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.vesselschedule',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.vessel.VesselSchedule',
		'MOST.model.planning.BerthInfoItem',
		'MOST.model.planning.VesselSchedule',
	],
	
    formulas: {
        vesselDetailFormDisabled: function(get) {
            return (new Boolean(get('globalJpvcNo'))) == true ? false : true ;
        }
    },	
	
	stores: {
		
		terminalCombo: {
			fields: ['optionName', 'optionValue'],
			storeId: 'terminalCombo',
			autoLoad: true,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: 'TCM',
		    		mcd: 'BERTH_TP' 
		        },
			
			}
		},
		
		berthWharfCombo: {
			fields: ['optionName', 'optionValue'],
			storeId: 'berthWharfCombo',
			autoLoad: true,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: 'TCM',
	        		mcd: 'BERTH_LOC',
	        		scd: ''
		        },
		       
			}
		},
		
		filterWharfCombo: {
			fields: ['optionName', 'optionValue'],
			storeId: 'filterWharfCombo',
		},

		purpCallCombo: {
			fields: ['optionName', 'optionValue'],
			storeId: 'purpCallCombo',
			//autoLoad: true,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: 'VC',
	        		mcd: 'POC',
	        		scd: ''
		        },
		       
			}
		},

		cargoTypeCombo: {
			fields: ['scd', 'scdNm'],
			storeId: 'CargoTypeCombo',
			//autoLoad: true,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/commonCode/cargotplist',
		       
			}
		},
		vesselScheduleList: {
			model:'MOST.model.vessel.VesselSchedule',
			storeId: 'vesselScheduleList',
			
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselschedulevcs/list',
		       
			}
		},
		vesselScheduleDetail: {
			model:'MOST.model.vessel.VesselSchedule',
			storeId: 'vesselScheduleDetail',
			
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselschedulevcs/detail',
		       
			}
		},
		vesselScheduleStatus: {
			model:'MOST.model.vessel.VesselSchedule',
			storeId: 'vesselScheduleDetail',
			
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselschedulevcs/detail/status',
		       
			}
		},
		duplicateJPVCStore: {
			model:'MOST.model.vessel.VesselSchedule',
			storeId: 'vesselScheduleDetail',
			
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselschedulevcs/duplicatejpvcno',
		       
			}
		},
		prvPortList: {
			model: 'MOST.model.vessel.VesselSchedulePort',
			storeId: 'prvPortList',
		},
		statesList: {
			 fields: ['abbr', 'name'],
			 data : [
			        {"abbr":"AP", "name":"Approved"},
			        {"abbr":"CC", "name":"Cancelled"},
			        {"abbr":"RS", "name":"Resubmitted"}, 
			        {"abbr":"RC", "name":"Cancel Request"},
			        {"abbr":"CC", "name":"Cancelled"},
			        {"abbr":"SV", "name":"Saved"},
			        {"abbr":"ST", "name":"Submitted"}
			        //...
			    ]
		},
		confirmStates: {
			fields: ['scd', 'scdNm'],
			storeId: 'confirmStates',
			data:[
				{'scd':'', 'scdNm': 'Select'},
				{'scd':'AP', 'scdNm': 'Confirm'},
				{'scd':'ST', 'scdNm': 'Not Confirm'},
			]
		},
		freshWtCombo:{
			fields: ['scd', 'scdNm'],
			data:[
				{'scd':'', 'scdNm': 'Select'},
				{'scd':'Y', 'scdNm': 'Yes'},
				{'scd':'N', 'scdNm': 'No'},
			]
		},
		chandellingCombo:{
			fields: ['scd', 'scdNm'],
			data:[
				{'scd':'', 'scdNm': 'Select'},
				{'scd':'Y', 'scdNm': 'Yes'},
				{'scd':'N', 'scdNm': 'No'},
			]
		},
		qtyBunkerCombo:{
			fields: ['scd', 'scdNm'],
			data:[
				{'scd':'', 'scdNm': 'Select'},
				{'scd':'Y', 'scdNm': 'Yes'},
				{'scd':'N', 'scdNm': 'No'},
			]
		},
		berthAlongSideCombo:{
  			fields: ['berthAlongSideNm', 'berthAlongSide'],
			data : [
				{'berthAlongSideNm' : 'Select', 'berthAlongSide' : 'B'},
		        {'berthAlongSideNm' : 'Portside', 'berthAlongSide' : 'P'},
		        {'berthAlongSideNm' : 'Starboard', 'berthAlongSide' : 'S'}
	        ]
  		},
  		cgOpTypeCombo: {
  			fields: ['optionName', 'optionValue'],
  			autoLoad: false,
			data : [
				{'optionName' : 'Select', 'optionValue' : ''},
		        {'optionName' : 'Loading and Discharging', 'optionValue' : 'B'},
		        {'optionName' : 'Discharging Only', 'optionValue' : 'D'},
		        {'optionName' : 'Loading Only', 'optionValue' : 'L'}
	        ]
  		},
  		ispsCombo:{ //for prev port, temp solution
  			fields: ['ispsVal', 'ispsDesc'],
  			data:[
  				{'ispsVal' : '1', 'ispsDesc': 'ISPS 1'},
  				{'ispsVal' : '2', 'ispsDesc': 'ISPS 2'},
  				{'ispsVal' : '3', 'ispsDesc': 'ISPS 3'}
  			]
  		},
  		timeCombo:{
  			fields: ['scd', 'scdNm'],
			data:[
				{'scd':'48PRE', 'scdNm': 'Previos 48'},
				{'scd':'48NEXT', 'scdNm': 'After 48'},
			]
		  },
		  
		  
		  
		/*
		 * HHT Tablet:
		 * */
		JPVCPopupStore: {
			model: 'MOST.model.popup.JPVCPopup',
			storeId: 'JPVCPopupStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/vesselcalllistpopup'
			}
		},
		
		berthingListCombo: {
//			model:'MOST.model.planning.BerthInfoItem',
//			storeId: 'berthingListComboStore',
//			proxy: {
//				type: 'rest',
//				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselscheduleinternal/berthinfolist'	
//			}
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'vesselScheduleBerthInfoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_BERTH_LOC
				}
			},
			listeners: {
				load: function(store, records) {
					store.insert(0, [{
						locNm: 'All',
						locId: ''
			        }]);
			     }
			}
		},
		
		vesselScheduleDetailHHT: {
			model:'MOST.model.planning.VesselSchedule',
			storeId: 'vesselScheduleDetailHHTStore',

			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselscheduleinternal/vesseldetail'	
			}
		},
		
		globalShiftCombo:{
			fields: ['shftId','shftNm'],
			storeId: 'globalShiftComboStore',
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