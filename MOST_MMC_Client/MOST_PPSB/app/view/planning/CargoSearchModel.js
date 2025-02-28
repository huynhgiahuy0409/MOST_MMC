Ext.define('MOST.view.planning.CargoSearchModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.cargosearch',

	requires: [
	],

	stores: {
		cargoSearchList: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'cargoSearchListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargosearch/list'
			}
		},
		
		cargoSearchGoGr: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'cargoSearchGoGrStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargosearch/goGr'
			}
		},
		
		masterBlCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'masterBlComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
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
		
		blNoCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'blNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BL_NO
				}
			}
		},
		
		snNoCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shipgNoteComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SN_NO
				}
			}
		},
		
		categoryCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'categoryComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_CATGTP
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
		
		deliveryModeCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'deliveryModeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_DELVTP
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
	}
	
});