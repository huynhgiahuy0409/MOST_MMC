Ext.define('MOST.model.popup.VesselCallIdListPopup', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
	{
		name:'vslCallId',
		type:'string'
	},
	{
		name:'vslCd',
		type:'string'
	},
	{
		name:'callYear',
		type:'string'
	},
	{
		name:'callSeq',
		type:'string'
	},
	{
		name:'callSign',
		type:'string'
	},
	{
		name:'vslNm',
		type:'string'
	},
	{
		name:'inbVoy',
		type:'string'
	},
	{
		name:'outbVoy',
		type:'string'
	},
	{
		name:'eta',
		type: 'date',
		dateFormat: 'time',
		convert:function(value, record){
			if(Ext.isDate(value)){
				var colDateValue;
				if(record.get('eta')){
					colDateValue = DateUtil.convertDate(Ext.Date.format(new Date(value), 'Ymd'));
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
	},
	{
		name:'etd',
		type: 'date',
		dateFormat: 'time',
		convert:function(value, record){
			if(Ext.isDate(value)){
				var colDateValue;
				if(record.get('etd')){
					colDateValue = DateUtil.convertDate(Ext.Date.format(new Date(value), 'Ymd'));
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
	},
	{
		name:'etb',
		type: 'date',
		dateFormat: 'time',
		convert:function(value, record){
			if(Ext.isDate(value)){
				var colDateValue;
				if(record.get('etb')){
					colDateValue = DateUtil.convertDate(Ext.Date.format(new Date(value), 'Ymd'));
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
	},
	{
		name:'vslTp',
		type:'string'
	},
	{
		name:'vslOperator',
		type:'string'
	},
	{
		name:'voyage',
		type:'string'
	},
	{
		name:'berthLoc',
		type:'string'
	},
	{
		name:'etw',
		type: 'date',
		dateFormat: 'time'
	},
	{
		name:'arrvSaId',
		type:'string'
	},
	{
		name:'flagCd',
		type:'string'
	},
	{
		name:'scn',
		type:'string'
	},
	{
		name:'portCd',
		type:'string'
	},
	{
		name:'cgTpCd',
		type:'string'
	},
	{
		name:'cgTpNm',
		type:'string'
	},
	{
		name:'atb',
		type: 'date'//'string'
	},
	{
		name:'atu',
		type:'date'//string'
	},
	{
		name:'atd',
		type:'string'
	},
	{
		name:'loa',
		type:'string'
	},
	{
		name:'purpCall',
		type:'string'
	},
	{
		name:'purpCallCd',
		type:'string'
	},
	{
		name:'depSaId',
		type:'string'
	},
	{
		name:'depSaNm',
		type:'string'
	},
	{
		name:'vslTpNm',
		type:'string'
	},
	{
		name:'arrvSaNm',
		type:'string'
	},
	{
		name:'wharfStart',
		type:'string'
	},
	{
		name:'wharfEnd',
		type:'string'
	},
	{
		name:'atw',
		type:'date'//'string'
	},
	{
		name:'etc',
		type:'string'
	},
	{
		name:'atc',
		type:'date'//'string'
	},
	{
		name:'etu',
		type:'string'
	},
	{
		name:'curAtb',
		type:'string'
	},
	{
		name:'berthTp',
		type:'string'
	},
	{
		name:'configDoc',
		type:'string'
	},
	{
		name:'bbtLoc',
		type:'string'
	},
	{
		name:'currAtw',
		type:'string'
	},
	{
		name:'currAtc',
		type:'string'
	},
	
	{
		name: 'atbPilotCheck',
		type: 'bool',
		convert:function(value, record){
			if(Ext.isBoolean(value)){
				return value;
			} else if(value){
				return 'true' === value ? true : false;
			}
		}		
	}, {
		name: 'atbMooring',
		type: 'string'
	}, {
		name: 'atbTug',
		type: 'string'
	}, {
		name: 'atuPilotCheck',
		type: 'bool',
		convert:function(value, record){
			if(Ext.isBoolean(value)){
				return value;
			} else if(value){
				return 'true' === value ? true : false;
			}
		}		
	}, {
		name: 'atuMooring',
		type: 'string'
	}, {
		name: 'atuTug',
		type: 'string'
	},
	
	{
		name:'mode',
		type:'string'
	}
	]
});