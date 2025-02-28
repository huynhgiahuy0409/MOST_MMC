Ext.define('MOST.model.common.export.FileExportBizParm', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'fileName',
			type:'string'
		},
		{
			name:'refNo',
			type:'string'
		},
		{
			name:'showTitle',
			type:'boolean'
		},
		{
			name:'isExcel',
			type:'boolean'
		},
		{
			name:'showBorder',
			type:'boolean'
		}
	],
	
	hasOne: [
        {
        	name: 'gridItem',
	        model: 'MOST.model.common.export.GridItem',
	        associationKey: 'gridItem',
	        getterName: 'getGridItem',
	        associatedName: 'gridItem'
        },
        {
        	name: 'searchDataBizParm',
	        model: 'MOST.model.common.export.FileExportServiceBizParm',
	        associationKey: 'searchDataBizParm',
	        getterName: 'getSearchDataBizParm',
	        associatedName: 'searchDataBizParm'
        }
    ]
});