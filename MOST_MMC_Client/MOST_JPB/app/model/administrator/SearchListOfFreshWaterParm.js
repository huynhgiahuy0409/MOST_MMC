Ext.define('MOST.model.administrator.SearchListOfFreshWaterParm', {
	extend : 'MOST.model.foundation.parm.BizParm',
	fields: [
        {
            name:'searchType',
            type:'string'
        },
        {
            name:'vslCallId',
            type:'string'
        },
        {
            name:'scn',
            type:'string'
        },
        {
            name:'splyStDt',
            type:'string'
        },
        {
            name:'splyEndDt',
            type:'string'
        },
	]
});
