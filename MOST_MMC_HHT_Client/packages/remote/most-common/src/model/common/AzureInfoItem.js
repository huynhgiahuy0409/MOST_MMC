Ext.define('MOST.model.common.AzureInfoItem', {
	extend : 'MOST.model.foundation.dataitem.DataItem',

	fields : [{
		name : 'cliendID',
		type : 'string'
	}, {
		name : 'tenant',
		type : 'string'
	}]
});