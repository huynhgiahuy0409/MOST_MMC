Ext.define('MOST.model.codes.CountryCode',{
	extend: 'MOST.model.foundation.dataitem.DataItem',
	fields:[{
		name:'cntryCd',
		type:'string'
	},{
		name:'cntryNm',
		type:'string'
	},{
		name:'isEuro',
		type: 'string'
	},{
		name:'flagState',
		type:'string'
	},{
		name: 'updatedBy',
		type: 'string'
	},{
		name: 'updatedTime',
		type: 'date',
		convert:function(value){
			var d = null;
			if (value){
				d = new Date();
				d.setTime(value);
			}
			return d;
		}
	}]
});