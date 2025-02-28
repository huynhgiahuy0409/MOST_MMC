Ext.define('MOST.view.operation.confirmapron.CMCofApronImportTab', {
	extend: 'Ext.Panel',
	alias: 'widget.app-cmcofapronimporttab',
	requires: [
		'Ext.tab.Panel',
		'Ext.tab.Tab',
		'Ext.scroll.Scroller',
		'Ext.layout.overflow.Scroller',
	],
	autoSize: true,
	shadow: false,
	layout: 'hbox',
	scrollable: true,
	border: true,
	items:[
		{
			xtype: 'grid',
			reference: 'refGridImportCargoManualCtlTab',
			bind: {
				store: '{cargoManualCtlTabImport}'
			},
			listeners: {
				//childdoubletap : 'onDblClickForJobMonitoringHHT' 
			},
			selectable: {
				columns: false,
				checkbox: true,
				checkboxSelect: true,
				rows: true,
				cells: false,
				mode: 'single',
				deselectable: true,
				headerCheckbox: false
			},
			columns:[{
				text: {type: 'bundle', key: 'catgNm'},
				dataIndex: 'catgNm',
				filter: 'string',
				width: 110
			},{
				text: {type: 'bundle', key: 'delvTpNm'},
				dataIndex: 'delvTpNm',
				filter: 'string',
				width: 110
			},{
				text: {type: 'bundle', key: 'blNo'},
				dataIndex: 'blNo',
				filter: 'string',
				width: 130
			},{
				text: {type: 'bundle', key: 'doNo'},
				dataIndex: 'doNo',
				filter: 'string',
				width: 150
			},{
				text: {type: 'bundle', key: 'SDONo'},
				dataIndex: 'sdoNo',
				filter: 'string',
				width: 150
			},{
				text: {type: 'bundle', key: 'LALorryNo'},
				dataIndex: 'lorryNo',
				filter: 'string',
				width: 150
			},{
				text: {type: 'bundle', key: 'shpgAgent'},
				dataIndex: 'shpgAgent',
				filter: 'string',
				width: 110
			},{
				text: {type: 'bundle', key: 'fwrAgnt'},
				dataIndex: 'fwrAgnt',
				filter: 'string',
				width: 110
			},{
				text: {type: 'bundle', key: 'cngShp'},
				dataIndex: 'cngShp',
				filter: 'string',
				width: 170
			},{
				text: {type: 'bundle', key: 'cargo'},
				dataIndex: 'cargo',
				filter: 'string',
				width: 140
			},{
				xtype: 'numbercolumn',
				align : 'right',
				format: '0,000.000',
				text: {type: 'bundle', key: 'docMt'},
				dataIndex: 'docMt',
				width: 110
			},{
				xtype: 'numbercolumn',
				align : 'right',
				format: '0,000.000',
				text: {type: 'bundle', key: 'docM3'},
				dataIndex: 'docM3',
				width: 110
			},{
				xtype: 'numbercolumn',
				align : 'right',
				format: '0,000',
				text: {type: 'bundle', key: 'docQty'},
				dataIndex: 'docQty',
				width: 110
			},{
				xtype: 'numbercolumn',
				align : 'right',
				format: '0,000.000',
				text: {type: 'bundle', key: 'mt'},
				dataIndex: 'mt',
				width: 110
			},{
				xtype: 'numbercolumn',
				align : 'right',
				format: '0,000.000',
				text: {type: 'bundle', key: 'm3'},
				dataIndex: 'm3',
				width: 110
			},{
				xtype: 'numbercolumn',
				align : 'right',
				format: '0,000',
				text: {type: 'bundle', key: 'qty'},
				dataIndex: 'qty',
				width: 110
			},{
				text: {type: 'bundle', key: 'status'},
				dataIndex: 'statNm',
				filter: 'string',
				width: 110
			},{
				text: {type: 'bundle', key: 'fnlOpeYn'},
				dataIndex: 'fnlOpeYn',
				width: 110,
				align : 'center',
				renderer: function (value, rec, col, cell) {
	                cell.setTools({
	                	play: {
	                		iconCls: (value === 'Y') ? 'x-fa fa-check-circle-o txt_blue' : 'x-fa fa-circle-thin txt_blue',
	                	}
	                });
		        }
			},{
				text: {type: 'bundle', key: 'fnlDelvYn'},
				dataIndex: 'fnlDelvYn',
				width: 110,
				align : 'center',
				renderer: function (value, rec, col, cell) {
	                cell.setTools({
	                	play: {
	                		iconCls: (value === 'Y') ? 'x-fa fa-check-circle-o txt_blue' : 'x-fa fa-circle-thin txt_blue',
	                	}
	                });
		        }
			},{
				text: {type: 'bundle', key: 'hdlOutDt'},
				dataIndex: 'hdlOutDt',
				reference: 'refCargoManualCtlTabImportHdlOutDt',
				filter: 'string',
				width: 160
			}]
		}
	]
});