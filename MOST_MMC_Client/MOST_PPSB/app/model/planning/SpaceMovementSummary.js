Ext.define('MOST.model.planning.SpaceMovementSummary', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
	{
		name:'workingStatus',
		type:'string'
	},
	{
		name:'reqNo',
		type:'string'
	},
	{
		name:'seq',
		type:'string'
	},
	{
		name:'reqTpCd',
		type:'string'
	},
	{
		name:'reqTpNm',
		type:'string'
	},
	{
		name:'reqDt',
		type:'string'
	},
	{
		name:'reqr',
		type:'string'
	},
	{
		name:'reqrNm',
		type:'string'
	},
	{
		name:'reqrTpCd',
		type:'string'
	},
	{
		name:'reqrTpNm',
		type:'string'
	},
	{
		name:'planDt',
		type:'string'
	},
	{
		name:'cgRefNo',
		type:'string'
	},
	{
		name:'reqPos',
		type:'string'
	},
	{
		name:'planLocId',
		type:'string'
	},
	{
		name:'planLocId',
		type:'string'
	},
	{
		name:'prevCellId',
		type:'string'
	},
	{
		name:'rmk',
		type:'string'
	},
	{
		name:'reqQty',
		type:'string'
	},
	{
		name:'reqMsrmt',
		type:'string'
	},
	{
		name:'reqWgt',
		type:'string'
	},
	{
		name:'statCd',
		type:'string'
	},
	{
		name:'statNm',
		type:'string'
	},
	{
		name:'opeClassCd',
		type:'string'
	},
	{
		name:'refNo',
		type:'string'
	},
	{
		name:'vslCallId',
		type:'string'
	},
	{
		name:'shipgNoteNo',
		type:'string'
	},
	{
		name:'blNo',
		type:'string'
	},
	{
		name:'cgNo',
		type:'string'
	},
	{
		name:'blSn',
		type:'string'
	},
	{
		name:'shipgAgnt',
		type:'string'
	},
	{
		name:'fwdAgnt',
		type:'string'
	},
	{
		name:'cngShp',
		type:'string'
	},
	{
		name:'cnsne',
		type:'string'
	},
	{
		name:'shpr',
		type:'string'
	},
	{
		name:'strgNoteNo',
		type:'string'
	},
	{
		name:'insertType',
		type:'string'
	},
	{
		name:'chk',
		type:'string'
	},
	{
		name:'divCd',
		type:'string'
	},
	{
		name:'locId',
		type:'string'
	},
	{
		name:'reqSeq',
		type:'string'
	},
	{
		name:'eta',
		type:'string'
	},
	{
		name:'svcDt',
		type:'string'
	},
	{
		name:'period',
		type:'string'
	},
	{
		name:'reqM2',
		type:'string'
	},
	{
		name:'reqMt',
		type:'string'
	},
	{
		name:'grNo',
		type:'string'
	},
	{
		name:'dgYn',
		type:'string'
	},
	{
		name:'cgType',
		type:'string'
	},
	{
		name:'cgPkgType',
		type:'string'
	},
	{
		name:'reqYn',
		type:'string'
	},
	{
		name:'catgCd',
		type:'string'
	},
	{
		name:'payer',
		type:'string'
	},
	{
		name:'payerNm',
		type:'string'
	},
	{
		name:'no',
		type:'string'
	},
	{
		name:'mvTp',
		type:'string'
	},
	{
		name:'planBy',
		type:'string'
	},
	{
		name:'planSeq',
		type:'string'
	}
	],
	
    associations: [
    	{
			type: 'hasMany',
			name: 'spcMovRequestMap',
			model: 'MOST.model.planning.SpaceMovementRequest'
    	}
    ]
});