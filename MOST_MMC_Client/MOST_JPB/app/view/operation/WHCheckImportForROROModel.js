Ext.define('MOST.view.operation.WHCheckImportForROROModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.whcheckimportforroro',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.ConfirmDischargingOfRORO',
		'MOST.model.operation.OperationSetting'
	],
	
	formulas:{
		fnlOpeYnChecked:{
  			bind:{
  				bindTo:'{theRRDetail.fnlOpeYn}'
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
  				
				var detailItem = me.getView().getViewModel().get('theRRDetail');
				detailItem.set("fnlOpeYn", stringValue);
  			}
  		}
	},
	formulas:{
		fnlOpeYnHHTChecked:{
  			bind:{
  				bindTo:'{theDetailHHT.fnlOpeYn}'
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
  				
				var detailItem = me.getView().getViewModel().get('theDetailHHT');
				detailItem.set("fnlOpeYn", stringValue);
  			}
  		}
	},
	stores: {
		whCheckImportForRORO: {
			model: 'MOST.model.operation.ConfirmDischargingOfRORO',
			storeId: 'whCheckImportStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/whcheckimport/whCheckImportForROROList'
			}
		},

		loadLocation: {
			model: 'MOST.model.operation.OperationSetting',
			storeId: 'loadLocationStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/whcheckimport/loadlocation'
			}
		},
		
		whCheckImportHatchList: {
			model: 'MOST.model.operation.OperationSetting',
			storeId: 'whCheckImportHatchListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/whcheckimport/hatchList'
			}
		},
		
		confirmDischargingOperationSetHatch: {
			model: 'MOST.model.operation.OperationSetting',
			storeId: 'confirmDischargingOperationSetHatchStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/whcheckimport/operationSetHatch'
			}
		},
		
		confirmDischargingAssignmentLorrysPopup: {
			model: 'MOST.model.popup.LorrysPopup',
			storeId: 'confirmDischargingAssignmentLorrysPopupStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/assignedlorrylistpopup'
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
		
		dimensionStore: {
			model: 'MOST.model.operation.DimensionCheck',
			storeId: 'dimensionStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/dimensioncheck/list'
			}
		},
		
		packageNoList: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'packageNoListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/packagenolist'
			}
		},
		// ======================================================
		// Combo Start
		
		whCheckImportForBbkHatchNoCombo : {
			fields: ['hatchNo']
		},
		
		whCheckImportForDbkHatchNoCombo : {
			fields: ['hatchNo']
		},
		
		whCheckImportForModeOfOprCombo : {
			fields: ['scdNm','scd']
		},
		
		whCheckImportsForCargoTypeCombo : {
			fields: ['scdNm','scd']
		},
		
		whCheckImportForDeliveryCombo : {
			fields: ['scdNm','scd']
		},
		
		confirmDischargingForClearanceModeCombo : {
			fields: ['scdNm','scd'],
			storeId: 'confirmDischargingForClearanceModeComboStore',
			data :  [{"scd":"H", "scdNm":"Hold"},
				{"scd":"R", "scdNm":"Release"},
				{"scd":"I", "scdNm":"Inspection"}
            ]
		},
		// Combo End
		// ======================================================
		
		
		//HHT		
		lorryListPopup: {
//			model: 'MOST.model.popup.LorrysPopup',
//			storeId: 'lorryListPopupStore'
		},
		
		
		//HHT		
		lorryListPopup: {
			model: 'MOST.model.popup.LorrysPopup',
			storeId: 'lorryListPopupStore'
		},
		
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
	}
});