Ext.define('MOST.model.monitoring.SearchInterfaceLogList',{
	extend: 'MOST.model.foundation.dataitem.DataItem',
	field: [
		{
			name:'transType',
			type:'string'
		},
		{
			name:'msgType',
			type:'string'
		},
		{
			name:'status',
			type:'string'
		},
		{
			name:'fromDate',
			type:'string'
		},
		{
			name:'toDate',
			type:'string'
		},
		{
			name:'request',
			type:'string'
		},
		{
			name:'response',
			type:'string'
		}
	],
	
	constructor: function() {
        this.callParent(arguments);
        
        this.set('transType', 'R');	//Receive
        this.set('status', '');		//All
        this.set('msgType', '*');	//All
    }
});