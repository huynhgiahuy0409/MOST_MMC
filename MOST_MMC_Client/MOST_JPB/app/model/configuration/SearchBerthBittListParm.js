Ext.define('MOST.model.configuration.SearchBerthBittListParm',{
	extend: 'MOST.model.foundation.parm.BizParm',
	fields:[{
		name: 'check',
		type: 'boolean'
	},{
		name:'berthCd',
		type:'string'
	},{
		name:'bittCd',
		type:'string'
	},{
		name:'xPos',
		type:'string'
	},{
		name:'yPos',
		type:'string'
	},{
		name: 'insUserId',
		type: 'string'
	},{
		name: 'insDtm',
		type: 'string'
	},{
		name: 'updUserId',
		type: 'string'
	},{
		name: 'updDtm',
		type: 'string'
	}]

});