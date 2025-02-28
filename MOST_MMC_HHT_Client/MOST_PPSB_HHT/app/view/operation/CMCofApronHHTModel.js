Ext.define('MOST.view.operation.CMCofApronHHTModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.cmcofapronhht',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.CargoManualCtl'
	],

	formulas:{
		truckTypeCheck:{
			bind:{

			},
			get:function(value){
				var me = this;
				if(value === 'I'){
					return true; 
				} else {
					return false;
				}
			},
	
			set: function(value){
				var me = this;
				var strValue = 'E'; //External
				if(value){
					strValue = 'I';
				}
				var theSearch = me.getView().getViewModel().get('theSearch');
				theSearch.set('truckType', strValue);
			}
		}
	},

	stores: {
		
		bookingNoStore: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'bookingNoStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/document',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BOOKING_NO
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  bookingNo: ''
			          }]);
			     }
			}
		},
		
		shipgNoteNoStore: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shipgNoteNoStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/document',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SN_NO
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  shipgNoteNo: ''
			          }]);
			     }
			}
		},
		
		mblNoStore: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'mblNoStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/document',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_MBL_NO
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  masterBL: ''
			          }]);
			     }
			}
		},
		
		blNoStore: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'blNoStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/document',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BL_NO
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  blNo: ''
			          }]);
			     }
			}
		},
		
		cargoManualCtlTabExport: {
			model: 'MOST.model.operation.CargoManualCtl',
			storeId: 'cargoManualCtlTabExportStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargomanualctl/cargoManualCtlExportList'
			}
		},
		
		cargoManualCtlTabImport: {
			model: 'MOST.model.operation.CargoManualCtl',
			storeId: 'cargoManualCtlTabImportStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargomanualctl/cargoManualCtlImportList'
			}
		},
		
		cargoManualCtlValidationCode: {
			fields: ['isValidated'],
			storeId: 'cargoManualCtlValidationCodeStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/validationcode/list'
			}
		},
		
		qrScanning: {
			model: 'MOST.model.operation.TruckAssignment',
			storeId: 'qrScanningStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargomanualctl/qr'
			}
		},
		
		/////////////////////////////////////////////////

		yardTruckWhImportList: {
			model: 'MOST.model.operation.CargoManualCtl',
			storeId: 'yardTruckWhImportListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargomanualctl/yardTruckWhImportList'
			}
		},

		handlingOutImportList: {
			model: 'MOST.model.operation.CargoManualCtl',
			storeId: 'handlingOutImportListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargomanualctl/handlingOutImportList'
			}
		},

		handlingInExportGRList: {
			model: 'MOST.model.operation.CargoManualCtl',
			storeId: 'handlingInExportGRList',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargomanualctl/handlinginexportgrlist'
			}
		},
		
		cargoManualCtlCargoGeneral: {
			model: 'MOST.model.operation.CargoManualCtl',
			storeId: 'cargoManualCtlCargoGeneralListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargomanualctl/cargoGeneralList'
			}
		},
		
		cargoManualCtlTabGatePass: {
			model: 'MOST.model.operation.CargoManualCtl',
			storeId: 'cargoManualCtlTabGatePassStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargomanualctl/cargoManualCtlGatePassList'
			}
		},
		
		cargoManualCtlValidationCode: {
			fields: ['isValidated'],
			storeId: 'cargoManualCtlValidationCodeStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/validationcode/list'
			}
		},
		
		cargoManualCtlGeneralTabChart : {},
		// ======================================================
		// Combo Start
		cargoManualCtlForSnCombo : {
			//fields: ['scdNm','shipgNoteNo']
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'cargoManualCtlForSnComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/document',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SN_NO
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  shipgNoteNo: ''
			          }]);
			     }
			}
		},
		
		cargoManualCtlForBlCombo : {
			//fields: ['scdNm','blno']
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'cargoManualCtlForBlComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/document',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BL_NO
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  blNo: ''
			          }]);
			     }
			}
		},
		
		cargoManualCtlForBookingNoCombo : {
			//fields: ['scdNm','mfDocId']
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'cargoManualCtlForBookingNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/document',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BOOKING_NO
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  mfDocId: ''
			          }]);
			     }
			}
		},
		
		cargoManualCtlForMasterBlCombo : {
			//fields: ['scdNm','mfDocId']
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'cargoManualCtlForMasterBlComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/document',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_MBL_NO
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  mfDocId: ''
			          }]);
			     }
			}
		},

		cargoManualCtlCargoGeneralCombo: {
			model: 'MOST.model.operation.CargoManualCtl',
			storeId: 'cargoManualCtlCargoGeneralComboListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargomanualctl/cargoGeneralComboList'
			}
		},
		
		cargoManualCtlForCategoryCombo : {
			fields: ['scdNm','scd']
		},
		
		cargoManualCtlForDeliveryCombo : {
			fields: ['scdNm','scd']
		},
		
		cargoManualCtlForImportDeliveryCombo : {
			fields: ['scdNm','scd']
		},
		
		cargoManualCtlForModeOfOprCombo : {
			fields: ['scdNm','scd']
		},
		
		cargoManualCtlForCargoTypeCombo : {
			fields: ['scdNm','scd']
		},
		
		cargoManualCtlForPackageTypeCombo : {
			fields: ['scdNm','scd']
		},
		
		cargoManualCtlForShiftDtCombo : {
			fields: ['shftDtDsp','shftDt'],
			storeId: 'cargoManualCtlForShiftDtComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargomanualctl/shiftDtList'
			}
		},
		
		cargoManualCtlForShiftNoCombo : {
			fields: ['shftNm','shftId'],
			storeId: 'cargoManualCtlForShiftNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargomanualctl/shiftList'
			}
		},
		
		cargoManualCtlForGoGr : {
			model: 'MOST.model.operation.CargoManualCtl',
			storeId: 'cargoManualCtlForGoGrtore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargomanualctl/goGr'
			}
		},
		
		cargoManualCtlForGoGp : {
			model: 'MOST.model.operation.CargoManualCtl',
			storeId: 'cargoManualCtlForGoGptore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargomanualctl/goGp'
			}
		},
		hatchNoCombo : {
			fields: ['cdNm','cd'],
			storeId: 'hatchNoComboStore'
		},
		// Combo End
		// ======================================================
		//HHT TABLET:
		shiftCombo:{
			fields: ['shftId','shftNm'],
			storeId: 'shiftComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/commonCode/shiftlist',
				extraParams: {
					useYn: 'Y',
					shftMethCd: 'Standard'
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
		
		grblPopupGrideStore: {
			storeId: 'grblPopupGrideStore',
		},
		
		cargoManualCtlGeneralTabRemain : {},
		
		cargoManualCtlGeneralTabTotal : {},
	}
});