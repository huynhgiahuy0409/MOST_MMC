Ext.define('MOST.model.operation.CargoMonitoringPickupSulphur', {
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
			name: "shipgNoteNo",
			type: "string",
		},
		{
			name: "stcsFinalYn",
			type: "string",
		},
		{
			name: "lorryNo",
			type: "string",
		},
		{
			name: "siloStartTime",
			type: "date",
			dateFormat: "d/m/Y H:i:s"
		},
		{
			name: "siloEndTime",
			type: "date",
			dateFormat: "d/m/Y H:i:s"
		},
		{
			name: "siloWgt",
			type: "float"
		}
	]
});