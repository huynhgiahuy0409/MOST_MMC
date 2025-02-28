Ext.define('MOST.model.sample.SingleGrid', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
	{
		name: 'workingStatus',
		type: 'string'
	},
	{
		name: 'newVersion',
		type: 'string'
	},
	{
		name:'key1',
		type:'string'
	},
	{
		name:'crud',
		type:'string'
	},
	{
		name:'colString',
		type:'string'
	},
	{
		name:'colDate',
		type: 'date',
		dateFormat: 'time',
		convert:function(value, record){
			if(Ext.isDate(value)){
				var colDateValue;
				
				if(record.get('colDateTime')){
					colDateValue = DateUtil.convertDate(Ext.Date.format(new Date(value), 'Ymd') + record.get('colDateTime').replace(':', ''));
				} else {
					colDateValue = value;
				} 
				
				return colDateValue;
			} else if(value){
				return new Date(value);
			} else {
				return value;
			}
		}
	}
	,
	{
		name:'colDateTime',
		type: 'string',
		convert:function(value, record){
			if(Ext.isDate(value)){
				var colDateValue = DateUtil.convertDate(Ext.Date.format(new Date(record.get('colDate')), 'Ymd') + Ext.Date.format(value, 'Hi'));
				if(!isNaN(colDateValue)) record.data.colDate = colDateValue;
				return Ext.Date.format(value, 'H:i');
			} else {
				var returnValue = record.get('colDate');
				
				if (returnValue) {
					return Ext.Date.format(returnValue, 'H:i');
				}else{
					return '';
				}
			}
		}
	},
	{
		name:'colTime',
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
		name:'colInt',
		type:'int'
	},
	{
		name:'colDouble',
		type:'float'
	},
	{
		name:'staffCd',
		type:'string'
	},
	{
		name:'updateTime',
		type: 'date',
		dateFormat: 'time'
	},
	{
		name:'key2',
		type:'string'
	},
	{
		name:'detailColString',
		type:'string'
	},
	{
		name:'detailColDate',
		type: 'date',
		dateFormat: 'time'
	},
	{
		name:'detailColInt',
		type:'int'
	},
	{
		name:'detailColDouble',
		type:'float'
	},
	{
		name:'colCombo',
		type:'string'
	},
	{
		name:'detailColCombo',
		type:'string'
	},
	{
		name:'colUseYn',
		type: 'string'
	},
	{
		name:'items',
		mapping: 'singleGridMap'
	}
	],
    associations: [{
		type: 'hasMany',
		name: 'singleGridMap',
		model: 'MOST.model.sample.SingleGrid'
	}]
});