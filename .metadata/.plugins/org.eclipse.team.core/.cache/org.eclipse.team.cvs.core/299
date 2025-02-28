Ext.define('MOST.view.configuration.BizConfigurationModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.bizConfiguration',

	requires: [
		'Ext.data.proxy.Rest'
	],

	stores: {
		bizConfigurationItems: {
			model: 'MOST.model.configuration.BizConfiguration',
			storeId: 'bizConfigurationItemsStore',
			pageSize:CommonConstants.PAGE_SIZE,
			autoLoad: false, 
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/bizconfiguration/list'
			}
		},
		
		yesNoValue: {},
		
		duplicateCheck: {
			model: 'MOST.model.configuration.BizConfiguration',
			storeId: 'duplicateCheckStore',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/bizconfiguration/duplicatecheck'
			}
		}
	}
});