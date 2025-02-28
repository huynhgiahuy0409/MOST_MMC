Ext.define('MOST.view.operation.ConfirmDischargingOfROROModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.confirmdischargingofroro',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.ConfirmDischargingOfRORO'
	],
	
	data: {
		selectedColumn : null
	},
	
	stores: {
		confirmDischargingforRORO: {
			model: 'MOST.model.operation.ConfirmDischargingOfRORO',
			storeId: 'confirmDischargingforROROStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmdischargingofroro/cargolist'
			}
		},
		
		unitItems: {
			model: 'MOST.model.operation.ConfirmDischargingOfRORO',
			storeId: 'unitItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmdischargingofroro/unitlist'
			}
		},
		
		blCombo: {
			model: 'MOST.model.operation.ConfirmDischargingOfRORO',
			storeId: 'blComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmdischargingofroro/comboList'
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
		
		validationCheck: {
			storeId: 'validationCheck',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/validationcode/list',
				
			}
		},
		confirmDischargingForModeOfOprCombo : {
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
		validationCheck: {
			storeId: 'validationCheck',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/validationcode/list',
				
			}
		},
	}
});