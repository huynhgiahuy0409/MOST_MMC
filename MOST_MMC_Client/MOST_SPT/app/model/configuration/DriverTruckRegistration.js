Ext.define('MOST.model.configuration.DriverTruckRegistration', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
	{
		name:'ptnrCd',
		type:'string'
	},
	{
		name:'ptnrNm',
		type:'string'
	},
	{
		name:'seq',
		type:'int'
	},
	{
		name:'divCd',
		type:'string'
	},
	{
		name:'lorryId',
		type:'string'
	},
	{
		name:'lorryNo',
		type:'string'
	},
	{
		name:'driverId',
		type:'string'
	},
	{
		name:'driverNm',
		type:'string'
	},
	{
		name:'licsNo',
		type:'string'
	},
	{
		name:'licsExprYmd',
		type: 'date',
		convert:function(value){
			if (value) {
				if (Ext.isDate(value)) 
					return value;
//					return Ext.Date.format(value, 'd/m/Y');
				else
					return new Date(value);
//					return Ext.Date.format(new Date(value), 'd/m/Y');;
			}else{
				return '';
			}
		}
	},
	{
		name:'nat',
		type:'string'
	},
	{
		name:'tareWgt',
		type:'string'
	},
	{
		name:'meaDt',
		type: 'string',
		dateFormat: 'time',
		convert:function(value){
			if (value) {
				if (Ext.isDate(value)) 
					return value;
//					return Ext.Date.format(value, 'd/m/Y');
				else
					return new Date(value);
//					return Ext.Date.format(new Date(value), 'd/m/Y');;
			}else{
				return '';
			}
		}
	},
	{
		name:'no',
		type:'int'
	},
	{
		name:'userId',
		type:'string'
	},
	{
		name:'cntryCd',
		type:'string'
	},
	{
		name:'rfIdNo',
		type:'string'
	},
	{
		name:'category',
		type:'string'
	},
	{
		name:'useYn',
		type:'string'
	},
	{
		name:'remark',
		type:'string'
	},
	{
		name:'plateNo',
		type:'string'
	},
	{
		name:'allowWgt',
		type:'string'
	},
	{
		name:'measureDt',
		type: 'date',
		convert:function(value){
			if (value) {
				if (Ext.isDate(value)) 
					return value;
				else
					return new Date(value);
			}else{
				return '';
			}
		}
	},
	{
		name:'vldYn',
		type:'string'
	},
	{
		name:'rmk',
		type:'string'
	},
	{
		name:'verifyYn',
		type:'string'
	},
	{
		name:'towedWgt',
		type:'string'
	}]
});