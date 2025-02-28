Ext.define('MOST.view.configuration.TerminalDefinitionModel', {
	extend: 'MOST.view.foundation.BaseViewModel',
	
	alias: 'viewmodel.terminaldefinition',

	requires: [
		'Ext.data.proxy.Rest'
	],

	stores: {
		terminalDefinitionItems: {
			model: 'MOST.model.configuration.TerminalDefinition',
			storeId: 'terminalDefinitionItems',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/terminaldefinition/items'
			}
		},
	}
});