Ext.define('MOST.model.planning.berth.MailItem', {
	extend: 'MOST.model.foundation.dataitem.DataItem',
	
	fields: [{
		name: 'from',
		type: 'string'
	}, {
		name: 'recipientTo',
		type: 'string'
	}, {
		name: 'recipientCc',
		type: 'string'
	}, {
		name: 'subject',
		type: 'string'
	}, {
		name: 'content',
		type: 'string'
	}]
});