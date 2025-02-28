Ext.define('MOST.view.configuration.LorryAssignmentConfigurationModel', {
	extend: 'MOST.view.foundation.BaseViewModel',
	
	alias: 'viewmodel.lorryassignmentconfiguration',

	requires: [
		'Ext.data.proxy.Rest',
	],

	stores: {
		lorryAssignmentConfiguration: {
			model: 'MOST.model.codes.CodeMaster',
			storeId: 'lorryAssignmentConfiguration',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/codeMaster/lorryAssignmentList'
			}
		}
	}
});