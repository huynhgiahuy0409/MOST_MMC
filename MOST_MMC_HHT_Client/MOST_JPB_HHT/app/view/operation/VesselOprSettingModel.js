Ext.define('MOST.view.operation.VesselOprSettingModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.vesseloprsetting',	

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.VesselOprSetting',
	],
	theHatchEq:[
		
	],
	
	data: {
		theEquipmentSetting: null
	},	
	
	stores: {
		vesselOprSettingList: {
			model: 'MOST.model.operation.VesselOprSetting',
			storeId: 'vesselOprSettingListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseloprsetting/list'
			}
		},
		
		equipmentBreakBulkAllComboSet: {
			model: 'MOST.model.operation.VesselOprSetting',
			storeId: 'equipmentBreakBulkAllComboSetStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseloprsetting/common'
			}
		},
		
		equipmentSettingRts: {
			model: 'MOST.model.operation.VesselOprSetting',
			storeId: 'equipmentSettingListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseloprsetting/rts'
			}
		},
		
		isOverlapped:{
			model: 'MOST.model.operation.VORDryBreakBulk',
			storeId: 'isOverlappedStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseloprsetting/isOverlappedWithFinitePeriod'
			}
		},
		
		equipCombo: {
			model: 'MOST.model.operation.VesselOprSetting',
			storeId: 'equipComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseloprsetting/common'
			}
		},
		
		breakDryBulkCombo : {},
		
		// hatchNoCombo : {
		// 	fields: ['cdNm','cd'],
		// 	storeId: 'hatchNoComboStore'
		// },
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
			// listeners: 
			// {
			// 	load: function(store, records) {
			//           store.insert(0, [{
			//         	  scdNm: 'Select',
			//               scd: ''
			//           }]);
			//      }
			// }
		},
		
		
		
		shiftCombo: {
			fields: ['shftNm','shftId'],
			storeId: 'shiftComboStore'
		},

		opeShiftCombo : {
			model: 'MOST.model.foundation.dataitem.DataItem',
			storeId: 'opeShiftComboStoreId',
			autoLoad: true,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams:{
					shftMethCd: CodeConstants.SHIFT_METH_STAND
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
		
		equipmentCombo: {
			fields: ['eqFacNm','eqFacNo'],
			storeId: 'equipmentComboStore',
		},
		equipmentCombo2: { //Full EQ for BBK
			fields: ['eqFacNm','eqFacNo'],
			storeId: 'equipmentCombo2Store',
		},
		
		facilityCombo: {
			fields: ['scdNm','scd'],
			storeId: 'equipmentComboStore'
		},
		
		portCraneCombo: {
			fields: ['eqFacNm','eqFacNo'],
			storeId: 'portCraneComboStore'
		},
		
		apfpCombo: {},
		
		topCleanCombo: {},
		
		saChangeCombo: {
			fields: ['label','data'],
			storeId: 'saChangeComboStore',
			data :  [
				{"data":null, "label":null}
			]
		},
		
		staffAndEquipmentDetail:{
			model: 'MOST.model.operation.StaffAndDeployment',
			storeId: 'staffAndEquipmentDetailStore',
			autoLoad:false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/mega/staffandequipmentdetail'
			}
		},
		
		/*
		 * ********************************************* Tablet version ********************************************* 
		 * */
		detailCgTopCleanList:{
			model: 'MOST.model.operation.ConfirmationSlip',
			storeId: 'detailCgTopCleanListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselscheduleinternal/ConfirmationSlipBreakBulkList'
			}
		},
		equipmentSettingValidate: {
			fields: ['count'],
			storeId: 'equipmentSettingValidateStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseloprsetting/validate'
			}
		},
		
		vesselPopupStore: {
			model: 'MOST.model.popup.VesselPopup',
			storeId: 'vesselPopupStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/vesselcalllistpopup'
			}
		},
		
		shiftList: {
			fields: ['shftId', 'shftNm', 'shftDivCd', 'fmHhmm', 'toHhmm'],
			storeId: 'shiftListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseloprsetting/shift',
			}
		}
	}
});