Ext.define('MOST.view.operation.ConfirmDischargingHHTPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.confirmdischarginghhtpopup',

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
		
		validationCheck: {
			storeId: 'validationCheck',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/validationcode/list',
				
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
		
		
		dimensionStore: {
			model: 'MOST.model.operation.DimensionCheck',
			storeId: 'dimensionStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/dimensioncheck/list'
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

		terminalHoldCheckStore: {
			model: 'MOST.model.document.TerminalHoldReleaseControl',
			storeId: 'terminalHoldCheckStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/terminalholdreleasecontrol/checkTerminalHold'
			}
		},
		// ======================================================
		// Combo Start
		hatchNoCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'hatchNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
			        mcd: CodeConstants.MCD_MT_HTC,
			        scdUse:'Y'
			    }
			}
		},
		
		equipmentNoList:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'equipmentNoListStore',
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
		
		modeOfOprCombo : {
			model: 'MOST.model.foundation.dataitem.DataItem',
			storeId: 'modeOfOprComboStore',
			autoLoad: true,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
			        mcd: CodeConstants.MCD_MT_TSPTTP,
			        scdUse:'Y'
			    }
			}
		},

		confirmDischargingHatchDrtCombo: {
			fields: ['scdNm','scdNm'],
			storeId: 'confirmDischargingHatchDrtComboStore',
		},

		uploadedFileDamageStore: {
			model : 'MOST.model.common.FileUpload',
			storeId: 'uploadedFileDamageStore',
		},

		tblDtlDamageCheckStore: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfGC',
			storeId: 'tblDtlDamageCheckStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofgc/tbldamagecheckdetaillist'
			}
		},
	}
});