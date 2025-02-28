Ext.define('MOST.view.monitoring.LoadingModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.loading',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.monitoring.Discharging',
		'MOST.model.monitoring.Loading'
	],

	stores: {	

		loading: {
			model: 'MOST.model.monitoring.Discharging',
			storeId: 'loadingStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/loading/list'
			}
		},
		
		loadingCombo: {
			model: 'MOST.model.monitoring.Discharging',
			storeId: 'loadingComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/loading/comboList'
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  shipgNoteNo: ''
			          }]);
			     }
			}
		},			
		
		//loadingSnNoCombo
		/* old 
		loadingSnNoCombo: {			
			model: 'MOST.model.document.GoodsReceipt',
			storeId: 'loadingSnNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/loading/snlist'
			}			
		},
		*/
		loadingSnNoCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'loadingSnNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SN_NO
				}
			}			
		},
		//end
		
		
		
		//loadingOprCombo
//		loadingOprCombo: {
//			fields: ['tsptTpCdNm','tsptTpCd']
//		},
		loadingOprCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'loadingOprComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_MOD_OPR
				}
			},			
		},
		//end
		
		
		//loadingHatchNoCombo	
//		loadingHatchNoCombo: {
//			fields: ['scdNm','scd']
//		},	
		loadingHatchNoCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'loadingHatchNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_HATCH_NO_HHT
				}
			}			
		},
		//end
		
		//loadingShiftCombo
//		loadingShiftCombo: {
//			fields: ['shftNm','shftId']
//		},
		loadingShiftCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'loadingShiftComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SHFTTP
				}
			}			
		},
		//end
		
		loadingCompareCombo : {
			fields: ['scdNm','scd'],
		    data :  [{"scd":"Mt", "scdNm":"MT"},
		    	     {"scd":"M3", "scdNm":"M3"},
		    	     {"scd":"Qty", "scdNm":"QTY"}]
		},
		
		
		//loadingSNComboHHT
		/*Add for HHT*/
//		loadingSNComboHHT: {
//			model: 'MOST.model.monitoring.Loading',
//			storeId: 'loadingSNComboStore',
//			proxy: {
//				type: 'rest',
//				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/loading/listHHT'
//			}
//		},
		loadingSNComboHHT: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'loadingSNComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				
			}			
		},
		//end
		
		
	}
});