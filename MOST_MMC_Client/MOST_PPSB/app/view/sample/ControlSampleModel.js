Ext.define('MOST.view.sample.ControlSampleModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.controlsample',

	requires: [
		'Ext.data.proxy.Rest'
	],

	stores: {
		tagFieldCombo : {
			fields: ['comName','comCode'],
			storeId: 'tagFieldComboStore',
			proxy: {
			    type: 'ajax',
			    url: 'resources/data/SingleGridComboType.json',
			    reader: {
	               type: 'json',
	               rootProperty: 'data'
			    }
			}
		},
		
		controlSampleTestTypeSearchCombo : {
			fields: ['comName','comCode'],
			storeId: 'controlSampleTestTypeSearchComboStore',
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