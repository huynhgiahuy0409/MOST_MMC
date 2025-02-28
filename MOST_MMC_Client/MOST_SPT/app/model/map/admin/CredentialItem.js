Ext.define('MOST.model.map.admin.CredentialItem', {
	extend : 'MOST.model.map.foundation.dataitem.DataItem',

	fields : [{
		name : 'refreshToken',
		type : 'string'
	}, {
		name : 'revokeYn',
		type : 'string'
	}, {
		name : 'revokeDttm',
		type: 'date',
		dateFormat: 'time'
	}, {
		name : 'accessToken',
		type : 'string'
	}, {
		name : 'expiresInSec',
		type : 'number'
	}, {
		name : 'idToken',
		type : 'string'
	}, {
		name : 'tokenType',
		type : 'string'
	}, {
		name : 'check',
		type : 'string'
	}, {
		name : 'loginFlag',
		type : 'string'
	}, {
		name : 'message',
		type : 'string'
	}]
});