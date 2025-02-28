Ext.define('MOST.model.administrator.ScreenAuthority', {
	extend: 'MOST.model.foundation.dataitem.DataItem',
	fields: [{
		name: 'pgmId',
		type: 'string'
	},{
		name: 'cgTpCd',
		type: 'string'
	},{
		name: 'refId',
		type: 'string'
	},{
		name: 'refName',
		type: 'string'
	}, {
		name: 'xtype',
		type: 'string'
	}, {
		name: 'screenType',
		type: 'string'
	}, {
		name: 'hidden',
		type: 'string'
	}, {
		name: 'hiddenYn',
		type: 'boolean',
		convert:function(value, record){
			if(record.get('hidden') != null && record.get('hidden') == 'Y'){
				return true;
			}else{
				return false;
			}
			
		}
	}, {
		name: 'disabled',
		type: 'string'
	}, {
		name: 'disabledYn',
		type: 'boolean',
		convert:function(value, record){
			if(record.get('disabled') != null && record.get('disabled') == 'Y'){
				return true;
			}else{
				return false;
			}
			
		}
	}, {
		name: 'readOnly',
		type: 'string'
	}, {
		name: 'readOnlyYn',
		type: 'boolean',
		convert:function(value, record){
			if(record.get('readOnly') != null && record.get('readOnly') == 'Y'){
				return true;
			}else{
				return false;
			}
			
		}
	}, {
		name: 'useYn',
		type: 'string'
	}, {
		name: 'GrpCode',
		type: 'string'
	}, {
		name: 'authGrp',
		type: 'string'
	}, {
		name: 'userId',
		type: 'string'
	}
	]

});