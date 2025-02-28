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
		shiftCombo: {
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
		
		equipmentCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'equipmentComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_DEPLOYED_EQ
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
		
		facilityCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'facilityComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd : CodeConstants.LCD_MOST,
					mcd : CodeConstants.MCD_MT_EQFCTPCD,
					scdLgv : CodeConstants.MT_EQFCDIVCD_FC
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
		
		vesselOprSettingList: {
			model: 'MOST.model.operation.VesselOprSetting',
			storeId: 'vesselOprSettingListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseloprsetting/list'
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
		
		saChangeCombo: {
			fields: ['label','data'],
			storeId: 'saChangeComboStore',
			data :  [
				{"data":null, "label":null}
			]
		},
		
		hatchNoCombo : {
			fields: ['cdNm','cd'],
			storeId: 'hatchNoComboStore'
		},
		
		apfpCombo: {},
		
		topCleanCombo: {},
		
		breakDryBulkCombo : {},
	}
});