Ext.define('MOST.view.popup.IMTReportPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.imtreportpopup',

	requires: [],
	
	stores: {
		gateCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'gateComboStore',
			proxy: {
			   type: 'rest',
			   showProgressBar : false,
			   url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
			   extraParams: {
				   lcd: CodeConstants.LCD_MOST,
				   mcd: CodeConstants.MCD_MT_GATECD
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
		scaleCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'scaleComboStore',
			proxy: {
			   type: 'rest',
			   showProgressBar : false,
			   url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
			   extraParams: {
				   lcd: CodeConstants.LCD_MOST,
				   mcd: CodeConstants.MCD_MT_WBCD
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