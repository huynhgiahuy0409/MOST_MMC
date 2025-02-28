Ext.define('MOST.model.codes.SearchCapacityCodeParm',{
	extend: 'MOST.model.foundation.parm.BizParm',
	fields:[	
    {
        name:'eqTpCd',
        type:'string'
    },
    {
        name:'eqTpNm',
        type:'string'
    },
    {
        name:'capaCd',
        type:'string'
    },
    {
        name:'capaDescr',
        type:'string'
    },
    {
        name: 'capaQty',
        type: 'string'
    },
    {
        name:'updTime',
        type:'date',
        dateFormat: 'time'
    }
]
});