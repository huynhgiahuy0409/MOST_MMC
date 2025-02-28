Ext.define('MOST.view.billing.TariffCodePopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.tariffcodepopup',

	requires: [
	],

	stores: {
		tariffCodeList: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'tariffCodeListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/tariffcodelist'
			}
		},
		
		tariffCodeTypeCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'tariffCodeTypeComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_TRFTP
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			        	  scd: ''
			          }]);
			     }
			}
		},
		
		costCenterCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'costCenterCombo',
			proxy: {
			   type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType : ComboboxServiceConstants.COMBO_COSTCNT_CD
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
		
		billingTypeCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'billingTypeComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd : CodeConstants.LCD_MOST,
					mcd : CodeConstants.MCD_MT_BILLINGTP
				}
			},
			listeners: 
			{
				load: function(store, records) {
					store.insert(0, [{
						scdNm: 'All',
						scd: ''
					}]);
				}
			}
		}	
	}
});