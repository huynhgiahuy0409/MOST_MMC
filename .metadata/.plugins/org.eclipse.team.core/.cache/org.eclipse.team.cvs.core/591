Ext.define('MOST.view.sample.SingleGridCellModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.singlegridcell',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.sample.SingleGrid'
	],

	stores: {
		singleGridCell: {
			model: 'MOST.model.sample.SingleGrid',
			storeId: 'singleGridCellCellStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/sample/singleGridList'
			}
		},
		
		singleGridCellDuplicateCheck: {
			model: 'MOST.model.sample.SingleGrid',
			storeId: 'singleGridCellDuplicateCheckStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/sample/singleGridList/duplicatecheck'
			}
		},
		
		singleGridCellTestTypeCombo : {
			fields: ['comName','comCode'],
			storeId: 'singleGridCellTestTypeComboStore',
			proxy: {
			    type: 'ajax',
			    url: 'resources/data/SingleGridComboType.json',
			    reader: {
	               type: 'json',
	               rootProperty: 'data'
			    }
			}
		},
		
		singleGridCellTestTypeSearchCombo : {
			fields: ['comName','comCode'],
			storeId: 'singleGridCellTestTypeSearchComboStore',
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
		
		singleGridCellYn : {
			fields: ['comName','comCode'],
			storeId: 'singleGridCellYnStore',
			data :  [{"comCode":null, "comName":""},
				{"comCode":"Y", "comName":"Y"},
				{"comCode":"N", "comName":"N"}
            ]
		}
	}
});