Ext.define('MOST.model.operation.CargoMonitoringExportSulphur', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
		{
			name: "vslCallId",
			type: "string"
		},
		{
			name: "transactionNo",
			type: "string"
		},
		{
			name: "stcsStartTime",
			type: "date",
			dateFormat: "d/m/Y H:i:s"
		},
		{
			name: "stcsEndTime",
			type: "date",
			dateFormat: "d/m/Y H:i:s"
		},
		{
			name: "stcsWgt",
			type: "float"
		},
		{
			name: "stcsFinalYn",
			type: "string",
		},
		{
			name: "stcsWgt",
			type: "float"
		},
        {
            name: "docMt",
            type: "float"
        },
		{
			name: "actualMt",
			type: "float"
		}
	]
});