Ext.define('MOST.view.operation.CargoDischargingModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.cargodischarging',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.CargoDischarging',
		'MOST.model.operation.OperationSetting'
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
  		},
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
	formulas:{
		
	},
	stores: {
		confirmDischarging: {
			model: 'MOST.model.operation.CargoDischarging',
			storeId: 'confirmDischargingStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargodischarging/cargoDischargingList'
			}
		},
		
		hangingScaleFetchingItems: {
			model: 'MOST.model.operation.HangingScale',
			storeId: 'hangingScaleFetchingItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargodischarging/hangingscale'
			}
		},
		
		confirmDischargingHatchList: {
			model: 'MOST.model.operation.OperationSetting',
			storeId: 'confirmLoadingHatchListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargodischarging/hatchList'
			}
		},
		
		confirmDischargingOperationSetHatch: {
			model: 'MOST.model.operation.OperationSetting',
			storeId: 'confirmDischargingOperationSetHatchStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargodischarging/operationSetHatch'
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
		
		spaceMovementSummary: {
			model: 'MOST.model.planning.SpaceMovementSummary',
			storeId: 'spaceMovementSummaryStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/spacemovementsummary/list'
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
		
		validationCheck: {
			storeId: 'validationCheck',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/validationcode/list',
				
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
		// ======================================================
		// Combo Start
		
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

		confirmDischargingHatchCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'confirmLoadingHatchComboStore',
			autoLoad: true,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
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
		
		confirmDischargingCraneCombo : {
			fields: ['eqFacNo']
		},
		
		confirmDischargingForBbkHatchNoCombo : {
			fields: ['hatchNo']
		},
		
		confirmDischargingForDbkHatchNoCombo : {
			fields: ['hatchNo']
		},
		
		confirmDischargingForModeOfOprCombo : {
			//fields: ['scdNm','scd']
			model: 'MOST.model.foundation.dataitem.DataItem',
			storeId: 'confirmDischargingForModeOfOprComboStore',
			autoLoad: true,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
			        mcd: CodeConstants.MCD_MT_TSPTTP,
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
		
		confirmDischargingForCargoTypeCombo : {
			//fields: ['scdNm','scd']
			model: 'MOST.model.foundation.dataitem.DataItem',
			storeId: 'confirmDischargingForCargoTypeComboStore',
			autoLoad: true,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
			        mcd: CodeConstants.MCD_MT_CGTP,
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
		
		confirmDischargingForDeliveryCombo : {
			//fields: ['scdNm','scd']
			model: 'MOST.model.foundation.dataitem.DataItem',
			storeId: 'confirmDischargingForDeliveryComboStore',
			autoLoad: true,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
			        mcd: CodeConstants.MCD_MT_DELVTP,
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
		confirmDischargingForClearanceModeCombo : {
			fields: ['scdNm','scd'],
			storeId: 'confirmDischargingForClearanceModeComboStore',
			data :  [{"scd":"H", "scdNm":"Hold"},
				{"scd":"R", "scdNm":"Release"},
				{"scd":"I", "scdNm":"Inspection"}
            ]
		},
		ctlConfirmDischargingHatchDrtCombo: {
			fields: ['scdNm','scdNm'],
			storeId: 'ctlConfirmDischargingHatchDrtComboStore',
		},
		// Combo End
		// ======================================================
		
		
		//HHT		
		lorryListPopup: {
//			model: 'MOST.model.popup.LorrysPopup',
//			storeId: 'lorryListPopupStore'
		},
		
		damageCheckStore: {
			model: 'MOST.model.operation.DamageCheck',
			storeId: 'damageCheckStore',
		},
		uploadStore: {
			model : 'MOST.model.common.FileUpload',
			storeId: 'uploadStore',
		},
		
		confirmDischargingHHTForBbkHatchNoCombo: {
			fields: ['scd', 'scdNm'],
			storeId: 'berthWharfCombo',
			autoLoad: true,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: 'MT',
	        		mcd: 'HTC',
	        		scd: '',
	        		searchType: 'CARGO_HHT_HATCH_NO'
		        },
		       
			}
		},
		
		confirmDischargingHHTForTruckNoCombo: {
			fields: ['scdNm', 'scd'],
			storeId: 'berthWharfCombo',
			autoLoad: true,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/yardtruckpopup',
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
		
		packageNoList: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'packageNoListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/packagenolist'
			}
		},
		
		listOfSubDeliveryOrder: {
			model: 'MOST.model.document.DeliveryOrder',
			storeId: 'listOfSubDeliveryOrderStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/deliveryorder/subdolist'
			}
		},
	}
});