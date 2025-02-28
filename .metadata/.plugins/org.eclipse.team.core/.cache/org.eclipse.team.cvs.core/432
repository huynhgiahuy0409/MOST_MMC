Ext.define('MOST.view.operation.hht.ConfirmLoadingHHTPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.confirmloadinghhtpopup',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.CargoLoading'
	],

	formulas:{
		fnlOpeYnChecked:{
  			bind:{
  				bindTo:'{theDetail.fnlOpeYn}'
  			},
  			get:function(value){
  				var me = this;
  				if(value === 'Y'){
  					return true; 
  				} else {
  					return false;
  				}
  			},
  			set:function(value){
  				var me = this;
  				var stringValue = 'N';
  				
  				if(value == true){
  					stringValue = 'Y';
  				}
  				
				var detailItem = me.getView().getViewModel().get('theDetail');
				detailItem.set('fnlOpeYn', stringValue);
  			}
  		},
  		
  		gatePassYnChecked:{
  			bind:{
  				bindTo:'{theDetail.gatePassYn}'
  			},
  			get:function(value){
  				var me = this;
  				if(value === 'Y'){
  					return true; 
  				} else {
  					return false;
  				}
  			},
  			set:function(value){
  				var me = this;
  				var stringValue = 'N';
  				
  				if(value == true){
  					stringValue = 'Y';
  				}
  				
				var detailItem = me.getView().getViewModel().get('theDetail');
				detailItem.set('gatePassYn', stringValue);
  			}
  		}
	},

	stores: {
		confirmLoading: {
			model: 'MOST.model.operation.CargoLoading',
			storeId: 'confirmLoadingStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargoloading/cargoLoadingList'
			}
		},
		
		hangingScaleFetchingItems: {
			model: 'MOST.model.operation.HangingScale',
			storeId: 'hangingScaleFetchingItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargoloading/hangingscale'
			}
		},
		
		confirmLoadingHatchList: {
			model: 'MOST.model.operation.OperationSetting',
			storeId: 'confirmLoadingHatchListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargoloading/hatchList'
			}
		},
		
		confirmLoadingOperationSetHatch: {
			model: 'MOST.model.operation.OperationSetting',
			storeId: 'confirmLoadingOperationSetHatchStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargoloading/operationSetHatch'
			}
		},
		
		confirmLoadingAssignmentLorrysPopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'confirmLoadingAssignmentLorrysPopupStore',
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
		
		confirmLoadingHatchCombo : {
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
		
		confirmLoadingForModeOfOprCombo : {
			model: 'MOST.model.foundation.dataitem.DataItem',
			storeId: 'modeOfOprComboStore',
			autoLoad: true,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
			        mcd: CodeConstants.MCD_MT_TSPTTP,
			        scdUse:'Y'
			    }
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
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/terminalholdreleasecontrol/checkTerminalHold'
			}
		},

	}
});