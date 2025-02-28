Ext.define('MOST.model.foundation.dataitem.DataItem', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'id',
		type: 'string'
	},{
		name: 'collection',
		type: 'auto'
	},{
		name: 'version',
		type: 'string'
	},{
		name: 'userId',
		type: 'string'
	},{
		name: 'userName',
		type: 'string'
	},{
		name: 'roleId',
		type: 'string'
	},{
		name: 'userType',
		type: 'string'
	},{
		name: 'registeredUserId',
		type: 'string'
	},{
		name: 'registeredUserName',
		type: 'string'
	},{
		name: 'registeredTime',
		type: 'date',
		dateFormat: 'time'
	},{
		name: 'modifiedUserId',
		type: 'string'
	},{
		name: 'modifiedUserName',
		type: 'string'
	},{
		name: 'modifiedTime',
		type: 'date',
		dateFormat: 'time'
	},{//added by Brian (for Audit) 2022/12/19
		name: 'pgmId',
		type: 'string',
	},{//added by Mandy (for Audit) 2023/04/03
		name: 'staffCd',
		type: 'string',
		convert: function (value) {
			return MOST.config.Token.getStaffCd(MOST.config.Token.getPgmId());
		}
	}],
	proxy: {
		type: 'rest',
		url: ''
	}
});