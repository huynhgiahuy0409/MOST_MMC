Ext.define('MOST.model.planning.roster.ShiftGroupDefItem', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
	{
		name:'shftId',
		type:'string'
	},
	{
		name:'shftDivCd',
		type:'string'
	},
	{
		name:'aplyFmYmd',
		type:'string'
	},
	{
		name:'aplyToYmd',
		type:'string'
	},
	{
		name:'shftNm',
		type:'string'
	},
	{
		name:'fmHhmm',
		type:'string',
		convert:function(value){
			if (value) {
				if (Ext.isDate(value)) 
					return Ext.Date.format(value, 'Hi');
				else
					return value;
			}else{
				return '';
			}
		}
		
	},
	{
		name:'toHhmm',
		type:'string',
		convert:function(value){
			if (value) {
				if (Ext.isDate(value)) 
					return Ext.Date.format(value, 'Hi');
				else
					return value;
			}else{
				return '';
			}
		}
	},
	{
		name:'no',
		type:'string'
	},
	{
		name:'groupCd',
		type:'string'
	},
	{
		name:'groupNm',
		type:'string'
	},
	{
		name:'divCd',
		type:'string'
	},
	{
		name:'scd',
		type:'string'
	},
	{
		name:'scdNm',
		type:'string'
	},
	{
		name:'shftMethCd',
		type:'string'
	},
	{
		name:'shftIdx',
		type:'string'
	},
	{
		name:'useYn',
		type:'string'
	},
	{
		name:'rmk',
		type:'string'
	},
	{
		name:'insertType',
		type:'string'
	}
	]
	
});