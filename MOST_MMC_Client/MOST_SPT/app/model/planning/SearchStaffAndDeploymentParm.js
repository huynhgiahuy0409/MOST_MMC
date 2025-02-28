Ext.define('MOST.model.planning.SearchStaffAndDeploymentParm', {
	extend : 'MOST.model.foundation.parm.BizParm',
    fields: [
        {
            name:'vslCallId',
            type:'string'
        },
        {
            name:'purpTpCd',
            type:'string'
        },
        {
            name:'shftId',
            type:'string'
        },
        {
            name:'tyCd',
            type:'string'
        },
        {
            name:'empId',
            type:'string'
        },
        {
        	name:'roleCd',
        	type:'string'
        },
        {
            name:'workYmd',
            type:'string'
        }
    ]
});