Ext.define('MOST.view.operation.CargoHandlingInModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.cargohandlingin',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.CargoHandlingIn'
	],

	formulas:{
		fnlOpeYnChecked:{
  			bind:{
  				bindTo:'{theDetail.fnlOpeYn}'
  			},
  			get:function(value){
  				var me = this;
  				if(value === "Y"){
  					return true; 
  				} else {
  					return false;
  				}
  			},
  			set:function(value){
  				var me = this;
  				var stringValue = "N";
  				
  				if(value == true){
  					stringValue = "Y";
  				}
  				
				var detailItem = me.getView().getViewModel().get('theDetail');
				detailItem.set("fnlOpeYn", stringValue);
  			}
  		}
	},
	
	stores: {
		confirmHandlingIn: {
			model: 'MOST.model.operation.CargoHandlingIn',
			storeId: 'confirmHandlingInStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargohandlingin/cargohandlinginlist'
			}
		},
		
		confirmHandlingInAssignmentLorrysPopup: {
			model: 'MOST.model.popup.LorrysPopup',
			storeId: 'confirmHandlingInAssignmentLorrysPopupStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/assignedlorrylistpopup'
			}
		},

		loadLocation: {
			model: 'MOST.model.operation.CargoHandlingIn',
			storeId: 'loadLocationStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargohandlingin/loadlocation'
			}
		},
		
		validationCheck: {
			storeId: 'validationCheck',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/validationcode/list',
				
			}
		},
		
		validationTruckGateInStore: {
			model: 'MOST.model.operation.CargoArrvDelvItem',
			storeId: 'validationTruckGateInStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/validationcode/validatetruckgateinlist'
			}
		},
		
		dimensionStore: {
			model: 'MOST.model.operation.DimensionCheck',
			storeId: 'dimensionStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/dimensioncheck/list'
			}
		},
		// ======================================================
		// Combo Start
		confirmHandlingInForShiftCombo : {
			fields: ['shftNm','shftId'],
		},
		
		confirmHandlingInForCargoTypeCombo : {
			fields: ['scdNm','scd']
		},
		
		confirmHandlingInForDeliveryCombo : {
			fields: ['scdNm','scd']
		},
		
		confirmHandlingInForRehandleModeCombo : {
			fields: ['scdNm','scd'],
			storeId: 'confirmHandlingInForRehandleModeComboStore',
			data :  [{"scd":null, "scdNm":""},
				{"scd":"R", "scdNm":"Return to Shipper"},
				{"scd":"C", "scdNm":"Change Vessel"}
	        ]
		},
		
		confirmHandlingInForDmgRehandleModeCombo : {
			fields: ['scdNm','scd'],
			storeId: 'confirmHandlingInForRehandleModeComboStore',
			data :  [{"scd":null, "scdNm":""},
				{"scd":"R", "scdNm":"Return to Shipper"},
				{"scd":"C", "scdNm":"Change Vessel"}
	        ]
		},
		// Combo End
		lorryListGrid:{
//			model: 'MOST.model.popup.LorrysPopup',
//			storeId: 'lorryListGridStore'
		},
		// ======================================================
		
		damageStore: {
			model: 'MOST.model.operation.DamageCheck',
			storeId: 'damageStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/damagecheck/list'
			}
		},
		
		damageCheckStore: {
			model: 'MOST.model.operation.DamageCheck',
			storeId: 'damageCheckStore',
		},
		
		uploadStore: {
			model : 'MOST.model.common.FileUpload',
			storeId: 'uploadStore',
		},
		
//		dimensionStore: {
//			model: 'MOST.model.operation.DimensionCheck',
//			storeId: 'dimensionStore',
//			pageSize:CommonConstants.PAGE_SIZE,
//			proxy: {
//				type: 'rest',
//				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/damageDimensionCheck/listDimension'
//			}
//		},
		jobNoStore: {
			model: 'MOST.model.operation.DamageCheck',
			storeId: 'jobNoStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/damageDimensionCheck/jobNo'
			}
		},
		
		terminalHoldCheckStore: {
			model: 'MOST.model.document.TerminalHoldReleaseControl',
			storeId: 'terminalHoldCheckStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/terminalholdreleasecontrol/checkterminalhold'
			}
		},
	}
});