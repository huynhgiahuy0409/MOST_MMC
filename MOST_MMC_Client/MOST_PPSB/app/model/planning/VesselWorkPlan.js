Ext.define('MOST.model.planning.VesselWorkPlan', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'vslCallId',
			type:'string'
		},
		{
			name:'vslSeq',
			type:'string'
		},
		{
			name:'blSNNo',
			type:'string'
		},
		{
			name:'craneNo',
			type:'string'
		},
		{
			name:'hatchNo',
			type:'string'
		},
		{
			name:'deckLoc',
			type:'string',
			convert: function (value, record) {
                if(record.get('deckLoc') === "1"){
                    value = 'Deck';
                } else if (record.get('deckLoc') === "2"){
                    value = 'Hold'
                }
                return value;
            }
		},
		{
			name:'hatchSeq',
			type:'string'
		},
		{
			name:'catgCd',
			type:'string'
		},
		{
			name:'catgNm',
			type:'string',
			convert: function (value, record) {
                if(record.get('catgCd') === "I"){
                    value = 'Import';
                } else if (record.get('catgCd') === "T"){
                    value = 'Transhipment'
                } else{
                	value = 'Export'
                }
                return value;
            }
		},
		{
			name:'mt',
			type:'string'
		},
		{
			name:'qty',
			type:'string'
		},
		{
			name:'rmk',
			type:'string'
		},
		{
			name:'userId',
			type:'string'
		},
		{
			name:'updTime',
			type:'string'
		},
		{
			name:'pod',
			type:'string'
		},
		{
			name:'commodity',
			type:'string'
		},
		{
			name:'pkgType',
			type:'string'
		},
		{
			name:'fwd',
			type:'string'
		},
		{
			name:'dg',
			type:'string'
		}

	]
});