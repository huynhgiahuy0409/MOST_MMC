Ext.define('MOST.model.configuration.SearchDriverTruckRegistrationParm', {
	extend : 'MOST.model.foundation.parm.BizParm',
	fields: [
	{
		name:'ptnrCd',
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
				else
					return new Date(value);
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
				else
					return new Date(value);
			}else{
				return '';
			}
		}
	},
	{
		name:'plateNo',
		type:'string'
	}]
});