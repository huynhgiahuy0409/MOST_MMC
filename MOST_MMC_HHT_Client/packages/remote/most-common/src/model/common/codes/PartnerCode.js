Ext.define('MOST.model.common.codes.PartnerCode', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'ptyCd',
		type: 'string'
	}, {
		name: 'engPtyNm',
		type: 'string'
	}, {
		name: 'ptyDivCd',
		type: 'string'
	}, {
		name: 'addr',
		type: 'string'
	}, {
		name: 'representative',
		type: 'string'
	}, {
		name: 'holdChk',
		type: 'string'
	},{
		name: 'accountHold',
		type: 'string'
	},{
		name: 'tyCd',
		type: 'string'
	}]
});