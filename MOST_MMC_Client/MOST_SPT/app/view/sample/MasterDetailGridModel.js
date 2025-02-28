Ext.define('MOST.view.sample.MasterDetailGridModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.masterdetailgrid',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.sample.SingleGrid'
	],

	stores: {
		masterDetailGridMaster: {
			model: 'MOST.model.sample.SingleGrid',
			storeId: 'masterDetailStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/sample/singleGridList'
			}
		},
		
		masterDetailGridDetail: {
			model: 'MOST.model.sample.SingleGrid',
			storeId: 'masterDetailDetailStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/sample/singleGridDetailList'
			}
		},
		
		masterDetailGridDuplicateCheck: {
			model: 'MOST.model.sample.SingleGrid',
			storeId: 'masterDetailGridDuplicateCheckStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/sample/singleGridList/duplicatecheck'
			}
		},
		
		masterDetailGridDetailDuplicateCheck: {
			model: 'MOST.model.sample.SingleGrid',
			storeId: 'masterDetailGridDetailDuplicateCheckStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/sample/singleGridDetailList/duplicatecheck'
			}
		},
		
		masterDetailGridTestTypeCombo : {
			fields: ['comName','comCode'],
			storeId: 'masterDetailGridTestTypeComboStore',
			proxy: {
			    type: 'ajax',
			    url: 'resources/data/SingleGridComboType.json',
			    reader: {
	               type: 'json',
	               rootProperty: 'data'
			    }
			}
		},
		
		masterDetailGridDetailTestTypeCombo : {
			fields: ['comName','comCode'],
			storeId: 'masterDetailGridDetailTestTypeComboStore',
			proxy: {
			    type: 'ajax',
			    url: 'resources/data/SingleGridDetailComboType.json',
			    reader: {
	               type: 'json',
	               rootProperty: 'data'
			    }
			}
		},
		
		masterDetailGridTestTypeSearchCombo : {
			fields: ['comName','comCode'],
			storeId: 'masterDetailGridTestTypeSearchComboStore',
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