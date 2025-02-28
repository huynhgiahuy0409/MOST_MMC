Ext.define('MOST.view.popup.UserTypePopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.usertypepopup',

	requires: [
		'Ext.data.proxy.Rest'
	],

	stores: {
		userTypePopup: {
			fields: ['staffCd','ptnrType','ptnrCode','engNm'],
			storeId: 'userTypePopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/usertypepopup'
			}
		},
		
		userTypeComboAllData: {
			storeId: 'userTypeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/usertypepopupcombo'
			}
		},
		
		userTypeCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'userTypeComboStore',
			proxy: {
			   type: 'rest',
			   showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd : CodeConstants.LCD_MOST,
					mcd : CodeConstants.MCD_MT_PTNRTP
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
		}
	}
});