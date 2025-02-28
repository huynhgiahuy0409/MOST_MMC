Ext.define('MOST.model.codes.SearchBrandModelCodeParm',{
	extend: 'MOST.model.foundation.parm.BizParm',
	fields:[
		{
		    name:'brandCd',
            type:'string'
        },{
			name:'brandNm',
			type:'string'
		},{
            name:'modelCd',
            type:'string'
        },{
			name:'modelNm',
			type:'string'
		}
	]
});