Ext.define('MOST.model.foundation.CredentialItem', {
	extend : 'MOST.model.foundation.dataitem.DataItem',

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
		name : 'userLevel',
		type : 'string'
	}, {
		name : 'ptnrCode',
		type : 'string'
	}, {
		name : 'userType',
		type : 'string'
	}, {
		name : 'accessDevice',
		type : 'string'
	}, {
		name : 'branchCode',
		type : 'string'
	}, {
		name : 'accessType',
		type : 'string'
	}]
});