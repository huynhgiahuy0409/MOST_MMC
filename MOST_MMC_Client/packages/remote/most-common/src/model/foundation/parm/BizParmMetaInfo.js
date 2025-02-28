Ext.define('MOST.model.foundation.parm.BizParmMetaInfo', {
	extend : 'Ext.data.Model',
	fields: [
		{
			name:'serviceID',
			type:'string'
		},{ //added by Brian (2020/06/10)
			name:'ptnrType',
			type:'string'
		},{ //added by Brian (2020/06/10)
			name:'ptnrCode',
			type:'string'
		},{ //added by Brian (2020/06/10)
			name:'contextRoot',
			type:'string'
		},{ //added by Brian (2020/06/10)
			name:'branchCode',
			type:'string'
		}
		
	]
});