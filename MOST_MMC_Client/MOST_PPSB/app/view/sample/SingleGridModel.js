Ext.define('MOST.view.sample.SingleGridModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.singlegrid',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.sample.SingleGrid'
	],

	stores: {
		singleGrid: {
			model: 'MOST.model.sample.SingleGrid',
			storeId: 'singleGridStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/sample/singleGridList'
			}
		},
		
		singleGridDuplicateCheck: {
			model: 'MOST.model.sample.SingleGrid',
			storeId: 'singleGridDuplicateCheckStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/sample/singleGridList/duplicatecheck'
			}
		},
		
		singleGridTestTypeCombo : {
			fields: ['comName','comCode'],
			storeId: 'singleGridTestTypeComboStore',
			proxy: {
			    type: 'ajax',
			    url: 'resources/data/SingleGridComboType.json',
			    reader: {
	               type: 'json',
	               rootProperty: 'data'
			    }
			}
		},
		
		singleGridTestTypeSearchCombo : {
			fields: ['comName','comCode'],
			storeId: 'singleGridTestTypeSearchComboStore',
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
		},
		
		singleGridYn : {
			fields: ['comName','comCode'],
			storeId: 'singleGridYnStore',
			data :  [{"comCode":null, "comName":""},
				{"comCode":"Y", "comName":"Y"},
				{"comCode":"N", "comName":"N"}
            ]
		}
	}
});