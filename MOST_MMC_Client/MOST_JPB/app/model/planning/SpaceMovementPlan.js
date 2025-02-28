Ext.define('MOST.model.planning.SpaceMovementPlan', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
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
		name:'reqLocId',
		type:'string'
	},
	{
		name:'prevLocId',
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
		name:'vslNm',
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
		type: 'date', 
	},
	{
		name:'svcDt',
		type: 'date', 
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
		name:'catgNm',
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
	},
	{
		name:'lotNo',
		type:'string'
	},
	{
		name:'doNo',
		type:'string'
	},
	{
		name:'sdogrNo',
		type:'string'
	},
	{
		name:'noOfVIN',
		type:'string'
	},
	{
		name:'vslCd',
		type:'string'
	},
	{
		name:'callYear',
		type:'string'
	},
	{
		name:'callSeq',
		type:'string'
	},
	{
		name: 'mfDocId',
		type: 'string'
	},

	{
		name: 'cmdtGrpCd',
		type: 'string'
	},
	{
		name: 'cmdtGrpNm',
		type: 'string'
	},

	{
		name: 'cmdtCd',
		type: 'string'
	},
	{
		name: 'cmdtNm',
		type: 'string'
	}, 
	{
		name:'cgTpNm',
		type: 'string'
	},

	{
		name: 'cgTpCd',
		type: 'string'
	}, 
	{
		name:'pkgTpCd',
		type: 'string'
	},
	{
		name: 'pkgTpNm',
		type: 'string'
	}, 
	{
		name: 'scn',
		type: 'string'
	}, 
	{
		name:'totalMT',
		type: 'number'
	},
	{
		name: 'totalM3',
		type: 'number'
	}, 
	{
		name: 'totalQty',
		type: 'number'
	}, 
	{
		name: 'workingStatus',
		type: 'string'
	},
	{
		name:'items',
		mapping: 'spcMovRequestMap'
	},
	
	],
	
    associations: [
    	{
			type: 'hasMany',
			name: 'spcMovRequestMap',
			model: 'MOST.model.planning.SpaceMovementPlan'
    	}
    ]
});