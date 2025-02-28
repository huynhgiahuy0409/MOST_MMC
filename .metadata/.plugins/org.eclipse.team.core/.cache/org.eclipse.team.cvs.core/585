Ext.define('MOST.view.sample.DetailPopupComplexSampleModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.detailpopupcomplexsample',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.sample.SingleGrid'
	],

	stores: {
		detailPopupComplexSample: {
			model: 'MOST.model.sample.SingleGrid',
			storeId: 'detailPopupComplexSampleStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/sample/singleGridList'
			}
		},
		
		detailPopupComplexSampleDuplicateCheck: {
			model: 'MOST.model.sample.SingleGrid',
			storeId: 'detailPopupComplexSampleDuplicateCheckStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/sample/singleGridList/duplicatecheck'
			}
		},
		
		detailPopupComplexSampleTestTypeCombo : {
			fields: ['comName','comCode'],
			storeId: 'detailPopupComplexSampleTestTypeComboStore',
			proxy: {
			    type: 'ajax',
			    url: 'resources/data/SingleGridComboType.json',
			    reader: {
	               type: 'json',
	               rootProperty: 'data'
			    }
			}
		},
		
		detailPopupComplexSampleTestTypeSearchCombo : {
			fields: ['comName','comCode'],
			storeId: 'detailPopupComplexSampleTestTypeSearchComboStore',
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
		
		detailPopupComplexSampleDetailMain: {
			model: 'MOST.model.sample.SingleGrid',
			storeId: 'detailPopupComplexSampleDetailMainStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/sample/singleGridDetailMainList'
			}
		},
		
		detailPopupComplexSampleDetailTab1: {
			model: 'MOST.model.sample.SingleGrid',
			storeId: 'detailPopupComplexSampleDetailTab1Store',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/sample/singleGridDetailList'
			}
		},
		
		detailPopupComplexSampleDetailTab1DuplicateCheck: {
			model: 'MOST.model.sample.SingleGrid',
			storeId: 'detailPopupComplexSampleDetailTab1DuplicateCheckStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/sample/singleGridDetailList/duplicatecheck'
			}
		},
		
		detailPopupComplexSampleDetailTestTypeCombo : {
			fields: ['comName','comCode'],
			storeId: 'detailPopupComplexSampleDetailTestTypeComboStore',
			proxy: {
			    type: 'ajax',
			    url: 'resources/data/SingleGridDetailComboType.json',
			    reader: {
	               type: 'json',
	               rootProperty: 'data'
			    }
			}
		}
	}
});