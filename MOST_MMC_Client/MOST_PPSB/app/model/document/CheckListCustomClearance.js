Ext.define('MOST.model.document.CheckListCustomClearance', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'vslCallId',
			type:'string'
		},
		{
			name:'jobNo',
			type:'string'
		},
		{
			name:'docStatCd',
			type:'string'
		},
		{
			name:'jobNoBl1',
			type:'string'
		},
		{
			name:'docStatCdBl1',
			type:'string'
		},
		{
			name:'jobNoMf1',
			type:'string'
		},
		{
			name:'docStatCdMf1',
			type:'string'
		},
		{
			name:'jobNoCg1',
			type:'string'
		},
		{
			name:'docStatCdCg1',
			type:'string'
		},
		{
			name:'blNo',
			type:'string'
		},
		{
			name:'status',
			type:'string',
			convert:function(value, record){
				if(value == '00' || value == null || value == ''){
					value = 'No';
				} else if(value == '01'){
					value = 'Yes';
				}
				return value;
			}
		},
		{
			name:'dgYn',
			type:'string'
		},
		{
			name:'dgStatus',
			type:'string'
		},
		{
			name:'regNo',
			type:'string'
		},
		{
			name:'regNoMf1',
			type:'string'
		},
		{
			name:'blRegNo',
			type:'string'
		},
		{
			name:'cbr',
			type:'string'
		},
		{
			name:'snNo',
			type:'string'
		},
		{
			name:'vslNm',
			type:'string'
		},
		{
			name:'no',
			type:'string'
		},
		{
			name:'ieCd',
			type:'string'
		},
		{
			name:'vslCd',
			type:'string'
		},
		{
			name:'cnsneCd',
			type:'string'
		},
		{
			name:'releaseNo',
			type:'string'
		},
		{
			name:'customsAprvStat',
			type:'string'
		},
		{
			name:'delvTpCd',
			type:'string'
		},
		{
			name:'lastDateStg',
			type:'string'
		},
		{
			name:'customAgent',
			type:'string'
		},{
			name:'ivNo',
			type:'string'
		},
		{
			name:'customClearanceType',
			type:'string',
			convert:function(value, record){
				if(record.get('releaseNo') != null && record.get('releaseNo') != ''){
					value = 'Release';
				} else{
					value = 'Hold';
				}
				return value;
			}
		}
		]

});