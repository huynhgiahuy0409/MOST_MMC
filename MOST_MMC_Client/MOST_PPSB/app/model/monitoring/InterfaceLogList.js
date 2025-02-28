Ext.define('MOST.model.monitoring.InterfaceLogList', {
	extend: 'MOST.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'transactionId',
			type:'string'
		},
		{
			name:'msgId',
			type:'string'
		},
		{
			name:'transType',
			type:'string'
		},
		{
			name:'msgType',
			type:'string'
		},
		{
			name:'applyStatus',
			type:'string'
		},
		{
			name:'applyDate',
			type:'string'
		},
		{
			name:'errMsg',
			type:'string'
		},
		{
			name:'retry',
			type:'string'
		},
		{
			name:'errDetailMsg',
			type:'string'
		},
		{
			name:'requestMsg',
			type:'string'
		},
		{
			name:'responseMsg',
			type:'string'
		},
		{
			name: 'displayTransType',
			type:'string'
		},
		{
			name: 'displayMsgType',
			type:'string'
		},
		{
			name: 'displayApplyStatus',
			type:'string'
		},
	]
});