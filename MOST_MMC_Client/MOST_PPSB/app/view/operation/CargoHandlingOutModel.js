Ext.define('MOST.view.operation.CargoHandlingOutModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.cargohandlingout',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.CargoHandlingOut'
	],
	
	formulas:{
		isMultiCargoCheck:{
			bind:{
				bindTo:'{theDetail.isMultiCargo}'
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
			  detailItem.set("isMultiCargo", stringValue);
			}
		},
		
		whFnlDelvYnChecked:{
  			bind:{
  				bindTo:'{theDetail.whFnlDelvYn}'
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
				detailItem.set("whFnlDelvYn", stringValue);
  			}
  		},
  		whFnlDelvYnHHTChecked:{
  			bind:{
  				bindTo:'{theDetailHHT.whFnlDelvYn}'
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
				detailItem.set("whFnlDelvYn", stringValue);
  			}
  		}
	},

	stores: {
		confirmHandlingOut: {
			model: 'MOST.model.operation.CargoHandlingOut',
			storeId: 'confirmHandlingOutStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargohandlingout/cargoHandlingOutList'
			}
		},
		
		confirmHandlingOutAssignmentLorrysPopup: {
			model: 'MOST.model.popup.LorrysPopup',
			storeId: 'confirmHandlingOutAssignmentLorrysPopupStore',
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
		
		validationTruckGateInStore: {
			model: 'MOST.model.operation.CargoArrvDelvItem',
			storeId: 'validationTruckGateInStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/validationcode/validatetruckgateinlist'
			}
		},
		
		
		// ======================================================
		// Combo Start
		confirmHandlingOutForCargoTypeCombo : {
			fields: ['scdNm','scd']
		},
		// Combo End
		// ======================================================
		//HHT		
		lorryListPopup: {
//			model: 'MOST.model.popup.LorrysPopup',
//			storeId: 'lorryListPopupStore'
		},
		shiftList: {
//			fields: ['shftId', 'shftNm', 'shftDivCd', 'fmHhmm', 'toHhmm'],
//			storeId: 'shiftListStore',
//			proxy: {
//				type: 'rest',
//				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/shiftlist',
//			}
		},
		
		WhViewList: {
			model: 'MOST.model.configuration.WarehouseDefinition',
			storeId: 'WhViewListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/warehouse/whViewList'
			}
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
		
		dimensionStore: {
			model: 'MOST.model.operation.DimensionCheck',
			storeId: 'dimensionStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/dimensioncheck/list'
			}
		},
		
		BLSNNoDetail: {
			model: 'MOST.model.document.TruckAssignment',
			storeId: 'BLSNNoDetailStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/truckAssignment/changeBLSNo'
			}
		},
		
		terminalHoldCheckStore: {
			model: 'MOST.model.document.TerminalHoldReleaseControl',
			storeId: 'terminalHoldCheckStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/terminalholdreleasecontrol/checkTerminalHold'
			}
		},
		
		confirmHandlingOutAssignmentLorrysHHTPopup: {
			model: 'MOST.model.popup.LorrysPopup',
			storeId: 'confirmHandlingOutAssignmentLorrysPopupStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/lorrygateinlistpopup'
			}
		},
		uploadedFileDamageStore: {
			model : 'MOST.model.common.FileUpload',
			storeId: 'uploadedFileDamageStore',
		},
		theDamageStore:{
			model: 'MOST.model.operation.DamageCheck',
			storeId: 'theDamageStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/damageDimensionCheck/listDamage'
			}
		},
		damageCheckDetail: {
			model : 'MOST.model.operation.DamageCheck',
			storeId: 'damageCheckDetailStore',
		},
	}
});