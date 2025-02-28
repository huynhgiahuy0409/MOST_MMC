Ext.define('MOST.model.billing.SearchFreeStorageDaysParm', {
	extend : 'MOST.model.foundation.parm.BizParm',
	fields: [
		{
			name:'ptnrCd',
			type:'string'
		},
		{
			name:'opeClassCd',
			type:'string'
		},
		{
			name:'cgTpCd',
			type:'string'
		},
		{
			name:'cmdtCd',
			type:'string'
		},
		{
			name:'aplyYmd',
			type:'date',
			convert:function(value){
				if (value) {
					if (Ext.isDate(value)) 
						return value;
						//return Ext.Date.format(value, 'd/m/Y');
					else
						return new Date(value);
						//return Ext.Date.format(new Date(value), 'd/m/Y');;
				}else{
					return '';
				}
			}
		},
		{
			name:'exprYmd',
			type:'date',
			convert:function(value){
				if (value) {
					if (Ext.isDate(value)) 
						return value;
						//return Ext.Date.format(value, 'd/m/Y');
					else
						return new Date(value);
						//return Ext.Date.format(new Date(value), 'd/m/Y');;
				}else{
					return '';
				}
			}
		},
		
		{
			name:'freeDd',
			type:'int'
		},
		{
			name:'rmk',
			type:'string'
		},
		{
			name:'incldSunYn',
			type:'string'
		},
		{
			name:'por',
			type:'string'
		},
		{
			name:'no',
			type:'string'
		}

	]

});