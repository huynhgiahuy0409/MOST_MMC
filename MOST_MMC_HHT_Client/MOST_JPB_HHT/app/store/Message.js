Ext.define('MOST.store.Message',{
	extend: 'Ext.data.Store',
	alias: 'store.message',
	model : 'MOST.model.message.Message',
	pageSize: 50,
	proxy : {
		type : 'rest',
		url: MOST.config.Locale.getRestApiDestUrl() + '/v1/notifications/messages',
        reader: {
            type: 'json',
//            successProperty: 'success',
            totalProperty: 'response.totalCount'
        }
	}
});