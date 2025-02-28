Ext.define('MOST.model.billing.FreeStorageDays', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
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
			name:'cmdtCdNm',
			type:'string'
		},
		{
			name:'aplyYmd',
			type:'date',
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
			name:'exprYmd',
			type:'date',
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
			name:'incldSunYnDisplay',
			type:'boolean',
			convert:function(value, record){
				if(record.get('incldSunYn') != null && record.get('incldSunYn') == 'Y'){
					return true;
				}else{
					return false;
				}
				
			}
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