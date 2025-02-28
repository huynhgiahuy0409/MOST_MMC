Ext.define('MOST.view.operation.VesselDelayModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.vesseldelay',

	requires: [
	],
	
	formulas:{
  		
	},
	data:{
		theDelay : null
	},
	stores: {
		vesselInformation: {
			model: 'MOST.model.popup.VesselCallList',
			storeId: 'vesselInformationStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/vesselcalllistpopup'
			}
		},
		
		vesselDelayCombo: {
			model: 'MOST.model.operation.VesselDelay',
			storeId: 'vesselDelayComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseldelay/combo'
			},
			listeners: 
			{
				load: function(store, records) {
					
			     }
			}
		},
		
		vesselDelayList: {
			model: 'MOST.model.operation.VesselDelay',
			storeId: 'vesselDelayListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseldelay/list'
			}
		},

		equipmentCombo: {
			fields: ['eqFacNm','eqFacNo'],
			storeId: 'equipmentComboStore'
		},
		
		shiftCombo: {
//			fields: ['shftNm','shftId'],
//			storeId: 'shiftComboStore',
			
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shiftComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SHFTTP,
					shftMethCd : ComboboxServiceConstants.COMBO_STANDARD
				}
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  shftNm: 'Select',
			        	  shftId: ''
			          }]);
			     }
			}
		},
		
		deployedEquipmentNoList:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'deployedEquipmentNoListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
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
//			fields: ['cdNm','cd'],
//			storeId: 'hatchNoComboStore',
			
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'hatchNoComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_HTC
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
		
		vesselDelayDuplicatedValidationCode: {
			fields: ['isValidated'],
			storeId: 'vesselDelayDuplicatedValidationCodeStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/validationcode/list'
			}
		},
		
		/*
		 *HHT Table added:
		 */
		//Delay Grid Code:
		delayCodePopup: {
			fields: ['scd', 'scdNm', 'fullCdNm', 'acptYN'],
			storeId: 'delayCodePopupStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseldelay/delaycodelist'
			}
		},
		delayVesselValidate: {
			fields: ['isValidated'],
			storeId: 'delayVesselValidateStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/validationcode/list'
			}
		},
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
		equipmentSettingList: {
			model: 'MOST.model.operation.VesselOprSetting',
			storeId: 'equipmentSettingListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseloprsetting/list'
			}
		},
	}
	
});