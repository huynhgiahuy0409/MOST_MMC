Ext.define('MOST.view.configuration.SulphurConfigurationModel', {
	extend: 'MOST.view.foundation.BaseViewModel',
	
	alias: 'viewmodel.sulphurconfiguration',

	requires: [
		'Ext.data.proxy.Rest'
	],

	stores: {
		sulphurConfigurationItems: {
			model: 'MOST.model.configuration.SulphurConfiguration',
			storeId: 'sulphurConfigurationItems',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/warehouse/sulphurList'
			}
		}
	}
});