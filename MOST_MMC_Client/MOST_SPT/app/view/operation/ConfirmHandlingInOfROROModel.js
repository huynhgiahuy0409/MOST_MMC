Ext.define('MOST.view.operation.ConfirmHandlingInOfROROModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

    alias: 'viewmodel.confirmHandlingInOfRORO',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.ConfirmHandlingInOfRORO'
	],
	
	data: {
		selectedColumn : null
	},
	
	stores: {
		snCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shippingNoteComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SN_NO,
					tyCd: CodeConstants.CGMST_TSPT_TP_RR
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
		
		cargoTypeCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'cargoTypeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_CGTP,
					col1: 'RR'
				}
			}
		},
		
		cargoItems: {
			model: 'MOST.model.operation.ConfirmHandlingInOfRORO',
			storeId: 'cargoItemsStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlinginofroro/cargolist'
			}
		},
		
		gateInItems: {
			model: 'MOST.model.operation.ConfirmHandlingInOfRORO',
			storeId: 'gateInItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlinginofroro/gateinlist'
			}
		},
		
		handlingInItems: {
			model: 'MOST.model.operation.ConfirmHandlingInOfRORO',
			storeId: 'handlingInItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlinginofroro/handlinginlist'
			}
		},
		
		confirmHandlingInForCargoTypeCombo : {
			model: 'MOST.model.foundation.dataitem.DataItem',
			storeId: 'confirmHandlingInForCargoTypeComboStore',
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
	}
});
