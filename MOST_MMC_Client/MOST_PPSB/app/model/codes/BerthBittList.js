Ext.define('MOST.model.codes.BerthBittList',{
	extend: 'MOST.model.foundation.dataitem.DataItem',
	fields:[{
		name:'berthCd',
		type:'string'
	},{
		name:'bittCd',
		type:'string'
	},{
		name:'xpos',
		type:'string'
	},{
		name:'ypos',
		type:'string'
	},{
		name: 'updUserId',
		type: 'string'
	},{
		name: 'updDtm',
		type: 'string'
	}]
});