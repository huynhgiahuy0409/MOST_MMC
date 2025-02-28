Ext.define('MOST.view.operation.VesselDelayModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.vesseldelayhht',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.VesselDelay'
	],
	
	formulas:{
  		
	},
	data:{
		theDelay : null
	},
	stores: {
		
		vesselDelayList: {
			model: 'MOST.model.operation.VesselDelay',
			storeId: 'vesselDelayListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseldelay/list'
			}
		},
//		generatePDFvesselDelay: {
//			model: 'MOST.model.operation.VesselDelay',
//			storeId: 'generatePDFVesselDelayStore',
//			proxy: {
//				type: 'rest',
//				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseldelay/generatepdfvsldl'
//			}
//		},
		vesselDelayCombo: {
			model: 'MOST.model.operation.VesselDelay',
			storeId: 'vesselDelayComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseldelay/list'
			},
			listeners: 
			{
				load: function(store, records) {
					
			     }
			}
		},
		
		
//		shiftCombo : {
//			fields: ['name','code'],
//			storeId: 'shiftComboStore',
//			data :  [
//						{"shftId":"", "shftNm":"All"},
//						{"shftId":"SF0014", "shftNm":"1ST"},
//						{"shftId":"SF0012", "shftNm":"2ND"},
//						{"shftId":"SF0013", "shftNm":"3RD"}
//					]
//		},
		
		equipmentCombo: {
			fields: ['eqFacNm','eqFacNo'],
			storeId: 'equipmentComboStore'
		},
		
		shiftCombo: {
			fields: ['shftNm','shftId'],
			storeId: 'shiftComboStore',
		},
		
		deployedEquipmentNoList:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'deployedEquipmentNoListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_CRANE_EQ
				}
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		hatchNoCombo : {
			model: 'MOST.model.foundation.dataitem.DataItem',
			storeId: 'hatchNoComboStore',
			autoLoad: true,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
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
		
		apfpCombo: {},
		
		delayCodeList: {
			fields: ['rsnCd', 'rsnCdNm', 'acptYN'],
			storeId: 'delayCodeListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseldelay/list',
				extraParams: {
					bulkTp : 'BRK',
					searchType : 'acceptedDelayCode'
		        }
			}
		},
		
//		vesselDelayDuplicatedValidationCode: {
//			fields: ['isValidated'],
//			storeId: 'vesselDelayDuplicatedValidationCodeStore',
//			proxy: {
//				type: 'rest',
//				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/requestcode/validationCode'
//			}
//		},
		
		
		
		/*
		 *HHT Table added:
		 */
		//Delay Grid Code:
		delayCodePopup: {
			//model: 'MOST.model.controller.VesselDelay',
			fields: ['scd', 'scdNm', 'fullCdNm', 'acptYN'],
			storeId: 'delayCodePopupStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseldelay/delaycodelist'
			}
		},
//		delayVesselValidate: {
//			fields: ['isValidated'],
//			storeId: 'delayVesselValidateStore',
//			proxy: {
//				type: 'rest',
//				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/requestcode/validationCode'
//			}
//		},
		hatchNoCombo2 : {
			fields: ['hatchNo','hatchNo'],
			storeId: 'hatchNoComboStore',
		},
		dalyCtgList: {
			fields: ['dlyCgt'],
			storeId: 'dalyCtgListStore',
			data: [
				{ dlyCgt: 'A' },
				{ dlyCgt: 'B' },
				{ dlyCgt: 'C' },
				{ dlyCgt: 'D' },
				{ dlyCgt: 'E' },
				{ dlyCgt: 'F' },
				{ dlyCgt: 'G' },
				{ dlyCgt: 'H' },
				{ dlyCgt: 'I' },
				{ dlyCgt: 'J' },
				{ dlyCgt: 'K' },
				{ dlyCgt: 'L' },
				{ dlyCgt: 'M' },
				{ dlyCgt: 'N' },
				{ dlyCgt: 'O' },
				{ dlyCgt: 'P' },
				{ dlyCgt: 'Q' },
				{ dlyCgt: 'R' },
				{ dlyCgt: 'S' },
			]
		},
//		equipmentSettingList: {
//			model: 'MOST.model.operation.EquipmentSetting',
//			storeId: 'equipmentSettingListStore',
//			proxy: {
//				type: 'rest',
//				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/equipmentsetting/equipmentSettingList'
//			}
//		},
	}
	
});