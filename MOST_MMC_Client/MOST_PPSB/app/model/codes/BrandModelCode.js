Ext.define('MOST.model.codes.BrandModelCode',{
	extend: 'MOST.model.foundation.dataitem.DataItem',
	fields:[
        {
		    name:'brandCd',
            type:'string'
        },
        {
            name:'brandNm',
            type:'string'
        },
        {
            name:'modelNm',
            type: 'string'
        },
        {
            name:'modelCd',
            type:'string'
        }
    ]
});