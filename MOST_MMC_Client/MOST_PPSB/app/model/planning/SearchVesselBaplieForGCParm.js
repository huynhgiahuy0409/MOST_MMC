Ext.define('MOST.model.planning.SearchVesselBaplieForGCParm', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'hatchNo',
			type:'string'
		},
		{
			name:'vslCallId',
			type:'string'
		},
		{
			name:'deckLoc',
			type:'string',
			convert: function (value) {
				if(value === "1"){
					return 'Deck';
				}else if(value === "2"){
					return 'Hold';
				}
    		}
		},
		{
			name:'hatchSeq',
			type:'string'
		},
		{
			name:'blNo',
			type:'string'
		},
		{
			name:'marksNo',
			type:'string'
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
		}
		]

});