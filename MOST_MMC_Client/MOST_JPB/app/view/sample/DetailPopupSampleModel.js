Ext.define('MOST.view.sample.DetailPopupSampleModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.detailpopupsample',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.sample.SingleGrid'
	],

	stores: {
		detailPopupSample: {
			model: 'MOST.model.sample.SingleGrid',
			storeId: 'detailPopupSampleStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/sample/singleGridList'
			}
		},
		
		detailPopupSampleDuplicateCheck: {
			model: 'MOST.model.sample.SingleGrid',
			storeId: 'detailPopupSampleDuplicateCheckStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/sample/singleGridList/duplicatecheck'
			}
		},
		
		detailPopupSampleTestTypeCombo : {
			fields: ['comName','comCode'],
			storeId: 'detailPopupSampleTestTypeComboStore',
			proxy: {
			    type: 'ajax',
			    url: 'resources/data/SingleGridComboType.json',
			    reader: {
	               type: 'json',
	               rootProperty: 'data'
			    }
			}
		},
		
		detailPopupSampleTestTypeSearchCombo : {
			fields: ['comName','comCode'],
			storeId: 'detailPopupSampleTestTypeSearchComboStore',
			proxy: {
			    type: 'ajax',
			    url: 'resources/data/SingleGridComboType.json',
			    reader: {
	               type: 'json',
	               rootProperty: 'data'
			    }
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  comName: 'All',
			              comCode: ''
			          }]);
			     }
			}
		}
	}
});