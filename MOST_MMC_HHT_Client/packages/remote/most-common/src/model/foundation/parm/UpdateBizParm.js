Ext.define('MOST.model.foundation.parm.UpdateBizParm',{
	extend: 'MOST.model.foundation.parm.BizParm',
	field: [
        {
			name:'item',
			type:'MOST.model.foundation.dataitem.DataItem'
		},
		{
			name:'items',
			type:'Ext.Array'
		}
		
	]
});