Ext.define('MOST.model.popup.FindUnitNoPopup', {
	extend: 'MOST.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'catgCd',
			type:'string'
		},
		{
			name:'catgNm',
			type:'string'
		},
		{
			name:'cgTpCd',
			type:'string'
		},
		{
			name:'cgTpNm',
			type:'string'
		},
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
        },
		{
			name:'unitNo',
			type:'string'
		},
		{
            name:'inDate',
            type:'string'
        },
		{
			name:'yardLoc',
			type:'string'
		},
		{
			name:'cgNo',
			type:'string'
		},
		{
			name:'ixCd',
			type:'string'
		}
	]
});