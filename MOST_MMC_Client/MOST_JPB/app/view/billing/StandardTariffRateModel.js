Ext.define('MOST.view.billing.StandardTariffRateModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.standardtariffrate',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.billing.StandardTariffRate'
	],

	stores: {
		standardtariffrateList: {
			model: 'MOST.model.billing.StandardTariffRate',
			storeId: 'foreignExchangeRateListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/standardtariffrate/list'
			}
		},
		
		copyStandardTariffRate: {
			model: 'MOST.model.billing.StandardTariffRate',
			storeId: 'copyStandardTariffRateStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/standardtariffrate/copy'
			}
		},
		applyDateCombo: {
			model: 'MOST.model.billing.StandardTariffRate',
			storeId: 'applyDateComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/standardtariffrate/combo'
			}
		},
		
		tariffCodeCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'SBUComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
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
		
		gstTypeCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'gstTypeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_GST_RATE,
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_VATCD,
			        scdUse: 'Y'
				}
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  gstTpCd: 'Select',
			        	  scd: ''
			          }]);
			     }
			}
		},
	}
});