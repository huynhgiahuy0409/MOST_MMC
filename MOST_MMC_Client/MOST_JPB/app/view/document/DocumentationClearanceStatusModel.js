Ext.define('MOST.view.document.DocumentationClearanceStatusModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.docclearancestatus',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.document.DocumentationClearanceStatus'
	],

	stores: {
		documentationClearanceStatus: {
			model: 'MOST.model.document.DocumentationClearanceStatus',
			storeId: 'documentationClearanceStatus',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/document/DocumentationClearanceStatus'
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