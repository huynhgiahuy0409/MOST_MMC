Ext.define('MOST.view.billing.InvoiceUnitModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.invoiceunit',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.billing.InvoiceUnit'
	],

	stores: {
		invoiceUnitList: {
			model: 'MOST.model.billing.InvoiceUnit',
			storeId: 'invoiceUnitStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/invoiceunit/list'
			}
		},
		invoiceUnitUsedList: {
			model: 'MOST.model.billing.InvoiceUnit',
			storeId: 'invoiceUnitStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/invoiceunit/list/inusedlist'
			}
		},
		InvoiceUnitDuplicateCheck: {
			model: 'MOST.model.billing.InvoiceUnit',
			storeId: 'InvoiceUnitDuplicateCheckStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/invoiceunit/list/duplicatecheck'
			}
		},
		
		invoiceUnitTypeCombo : {
			fields: ['scdNm','scd'],
			storeId: 'invoiceUnitTypeComboSearchComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: 'MT',
					mcd: 'INVUNITTP'
				}
			}
		},
				
		SearchinvoiceUnitTypeCombo : {
			fields: ['scdNm','scd'],
			storeId: 'invoiceUnitTypeComboSearchComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: 'MT',
					mcd: 'INVUNITTP'
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scd: 'Select'
			          }]);
			     }
			}
		}
	}
});