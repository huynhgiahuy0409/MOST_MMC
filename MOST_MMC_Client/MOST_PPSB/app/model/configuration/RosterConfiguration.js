Ext.define('MOST.model.configuration.RosterConfiguration', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [{
			name:'engNm',
			type:'string'
		},
		{
			name:'empId',
			type:'string'
		},
		{
			name:'tuserId',
			type:'string'
		},
		{
			name:'tuserNm',
			type:'string'
		},
		{
			name:'grdCd',
			type:'string'
		},
		{
			name:'grdCdNm',
			type:'string'
		},
		{
			name:'statCd',
			type:'string'
		},
		{
			name:'statCdNm',
			type:'string'
		},
		{
			name:'proleCd',
			type:'string'
		},
		{
			name:'proleCdNm',
			type:'string'
		},
		{
			name:'roleCd',
			type:'string'
		},
		{
			name:'roleCdNm',
			type:'string'
		},
		{
			name:'workLocCd',
			type:'string'
		},
		{
			name:'workLocCdNm',
			type:'string'
		},
		{
			name:'conttDiv',
			type:'string'
		},
		{
			name:'conttDivNm',
			type:'string'
		},
		{
			name:'costCentCd',
			type:'string'
		},
		{
			name:'costCentNm',
			type:'string'
		},
		{
			name:'shftGroupNm',
			type:'string'
		},
		{
			name:'shftGroupCd',
			type:'string'
		},
		{
			name:'useYn',
			type:'string'
		},
		{
			name:'shftUseYn',
			type:'string'
		},
		{
			name:'no',
			type:'string'
		},
		{
			name:'remark',
			type:'string'
		},
		{
			name:'chgItemYn',
			type:'string'
		},
		{
			name:'email',
			type:'string'
		},
		{
			name:'hiddenEmpId',
			type:'string'
		},
		{
			name:'shftTpCd',
			type:'string'
		},
		{
			name:'shftTpCdNm',
			type:'string'
		},
		{
			name:'rate',
			type:'string'
		},
		{
			name:'updDt',
			type:'string'
		},
		{
			name:'updBy',
			type:'string'
		},
		{
			name:'unitDiv',
			type:'string'
		},
		{
			name:'rsnCd',
			type:'string'
		},
		{
			name:'rsnCdNm',
			type:'string'
		},
		{
			name:'fmYmd',
			type:'string'
		},
		{
			name:'toYmd',
			type:'string'
		},
		{
			name:'fmYmdKey',
			type: 'date',
			dateFormat: 'time',
			convert:function(value, record){
				if(Ext.isDate(value)){
					var colDateValue  = value;
					return colDateValue;
				} else if(value){
					return new Date(value);
				} else {
					return value;
				}
			}
		},
		{
			name:'toYmdKey',
			type: 'date',
			dateFormat: 'time',
			convert:function(value, record){
				if(Ext.isDate(value)){
					var colDateValue  = value;
					return colDateValue;
				} else if(value){
					return new Date(value);
				} else {
					return value;
				}
			}
		},
		{
			name:'days',
			type:'string'
		},
		{
			name:'removeFmYmd',
			type:'string'
		},
		{
			name:'removeToYmd',
			type:'string'
		},
		{
			name:'removeRsnCd',
			type:'string'
		},
		{
			name:'unavailYmd',
			type:'string'
		},
		{
			name:'unavailYmdKey',
			type:'string'
		},
		{
			name:'shftGrpCd',
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
			name:'intvlTpCd',
			type:'string'
		},
		{
			name:'intvlVal',
			type:'int'
		},
		{
			name:'shftDivCd',
			type:'string'
		},
		{
			name:'shftId',
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
			name:'rmk',
			type:'string'
		},
		{
			name:'insertType',
			type:'string'
		},
		{
			name:'shftNm',
			type:'string'
		}
	]
});