Ext.define('MOST.view.document.VesselParticularModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.vesselparticular',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.document.VesselParticular'
	],
	stores: {
		vslParticularList: {
			model: 'MOST.model.document.VesselParticular',
			storeId: 'vslParticularListId',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselparticular/list'
			}
		},
		
		vslTypeCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'vslTypeCombo',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
	                lcd: CodeConstants.LCD_VCS1,
	                mcd: CodeConstants.MCD_VC_VSLTP
		        }
			}
		},
		
		flagCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'flagCombo',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
	                searchType: ComboboxServiceConstants.COMBO_CNTRY_CD
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
			}
		},
		
		tradeCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
		    storeId: 'tradeCombo',
		    autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
	                lcd: CodeConstants.LCD_VCS1,
	                mcd: CodeConstants.MCD_VC_TT
		        }
			}
		},
		
		vslDesignCombo:{},
		
		vslTermCombo:{},
		
		vslTradeCombo:{},
		
		shaCombo:{
		    fields: ['cd', 'cdNm'],
		    storeId: 'shaCombo',
		    autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselparticular/shaList'
			},
//			listeners:{
//				load: function(store, records) {
//			          store.insert(0, [{
//			        	  cdNm: 'Select',
//			        	  cd: ''
//			          }]);
//			     }
//			}
		},
		
		agencyCode: {
			model: 'MOST.model.document.VesselParticular',
			storeId: 'agencyCodeId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselparticular/agency'
			}
		},
		
		shpCombo:{
		    fields: ['cd', 'cdNm'],
		    storeId: 'shpCombo',
		    autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselparticular/shpList'
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  cdNm: 'Select',
			        	  cd: ''
			          }]);
			     }
			}
		},
		
		vslPartDetail: {
			model: 'MOST.model.document.VesselParticular',
			storeId: 'vslPartDetail',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselparticular/detail'
			}
		},
		
		vslIdDuplicateCheck: {
			model: 'MOST.model.document.VesselParticular',
			storeId: 'vslIdDuplicateCheck',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselparticular/vslIdDuplicateCheck'
			}
		},
	
		validateForMQ: {
			model: 'MOST.model.document.VesselParticular',
			storeId: 'vslIdDuplicateCheck',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselparticular/validateformq'
			}
		},
		
		cargoTypeCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'CargoTypeCombo',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd: CodeConstants.LCD_COM,
					mcd: CodeConstants.MCD_CM_USERLVL
				}
			}
		},
		
		vesselScheduleDetail: {
			model:'MOST.model.document.VesselScheduleRegister',
			storeId: 'vesselScheduleDetail',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselschedulevcs/detail',
			}
		},
		
		berthAlongSideCombo:{},
  		
		vslChangeList: {
			storeId: 'vslParticularListId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselparticular/vslChange'
			}
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
		        },
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
					searchType: ComboboxServiceConstants.COMBO_BERTH_LOC
		        },
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
		
		vpConfirmCombo:{
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
		}
	}
});