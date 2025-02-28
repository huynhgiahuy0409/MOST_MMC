Ext.define('MOST.model.codes.SearchCountryCodeParm',{
	extend: 'MOST.model.foundation.parm.BizParm',
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