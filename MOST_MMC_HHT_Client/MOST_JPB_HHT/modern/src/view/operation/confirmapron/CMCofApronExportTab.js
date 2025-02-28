Ext.define('MOST.view.operation.confirmapron.CMCofApronExportTab', {
	extend: 'Ext.Panel',
	alias: 'widget.app-cmcofapronexporttab',
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
		{//Row1: Data Grid GR Loading Direct
			xtype: 'fieldset',
			reference: 'refFlsGrLoadingGrid',
			hidden: true,
			flex: 1,
			border: true,				
			autoSize: true,
			shadow: false,
			scrollable: true,
			margin: '5 5 5 5',
			style: 'border-style: inherit; border-radius: 3px; border-color: #FFE0B2',
			layout:{
				type : 'vbox',
				align : 'stretch'
			},
			items: [
				{
					xtype:'label',
					style: 'color: red; font-weight: bold',
					html:'G/R List - To Confirm Loading (Direct)',
				},
				{
					xtype: 'grid',
					flex: 1,
					border: true,
					reference: 'refGridCmcLoadingDirectList',
					bind: {
						store: '{cargoManualCtlTabExport}'
					},
					listeners: {
						//childdoubletap: 'onDblClickForJobMonitoringHHT'
					},
					selectable: {
						columns: false,
						checkbox: true,
						checkboxSelect: true,
						rows: true,
						cells: false,
						mode: 'single',
						headerCheckbox: false,
					},
					columns: [
						{
							text: {type: 'bundle', key: 'vslCallId'},
							dataIndex: 'vslCallId',
							filter: 'string',
							width: 150
						},
						{
							text: {type: 'bundle', key: 'category'},
							dataIndex: 'catgNm',
							filter: 'string',
							width: 110
						},
						{
							text: {type: 'bundle', key: 'delvTpNm'},
							dataIndex: 'delvTpNm',
							filter: 'string',
							width: 110
						},
						{
							text: {type: 'bundle', key: 'sNNo'},
							dataIndex: 'shipgNoteNo',
							filter: 'string',
							width: 180
						},
						{
							text: {type: 'bundle', key: 'gRNo'},
							dataIndex: 'cgNo',
							filter: 'string',
							width: 110
						},
						{
							text: {type: 'bundle', key: 'truckNo'},
							dataIndex: 'lorryNo',
							'hidden': false,
							filter: 'string',
							width: 110
						},
						{
							text: {type: 'bundle', key: 'statNm'},
							dataIndex: 'statNm',
							filter: 'string',
							width: 110
						},
						{
							text: {type: 'bundle', key: 'shippingAgent'},
							dataIndex: 'shaCd',
							filter: 'string',
							width: 150
						},
						{
							text: {type: 'bundle', key: 'forwardingAgent'},
							dataIndex: 'fwdCd',
							filter: 'string',
							width: 150
						},
						{
							text: {type: 'bundle', key: 'shipperConsignee'},
							dataIndex: 'shpCnsCd',
							filter: 'string',
							width: 110
						},
						{
							text: {type: 'bundle', key: 'cargoType'},
							dataIndex: 'cgTpCdNm',
							filter: 'string',
							width: 150
						},
						{
							text: {type: 'bundle', key: 'commodityGroup'},
							dataIndex: 'cmdtGrpNm',
							filter: 'string',
							width: 200
						},
						{
							text: {type: 'bundle', key: 'commodity'},
							dataIndex: 'cmdtNm',
							filter: 'string',
							width: 200
						},
						{
							text: {type: 'bundle', key: 'packageType'},
							dataIndex: 'pkgTpNm',
							filter: 'string',
							width: 200
						},
						{
							text: {type: 'bundle', key: 'marksAndNos'},
							dataIndex: 'marksNo',
							filter: 'string',
							width: 200
						},
						{
							text: {type: 'bundle', key: 'pckTrfPackageNo'},
							dataIndex: 'pkgNo',
							filter: 'string',
							width: 200
						},
						{
							text: {type: 'bundle', key: 'SNDescrGoods'},
							dataIndex: 'goodsRmk',
							filter: 'string',
							width: 200
						},
						{
							xtype: 'numbercolumn',
							align : 'right',
							format: '0,000.000',
							text: {type: 'bundle', key: 'docMt'},
							dataIndex: 'docMt',
							width: 110
						},
						{
							xtype: 'numbercolumn',
							align : 'right',
							format: '0,000.000',
							text: {type: 'bundle', key: 'docM3'},
							dataIndex: 'docM3',
							width: 110
						},
						{
							xtype: 'numbercolumn',
							align : 'right',
							format: '0,000',
							text: {type: 'bundle', key: 'docQty'},
							dataIndex: 'docQty',
							width: 110
						},
						{
							text: {type: 'bundle', key: 'eachWeight'},
							dataIndex: 'eachMt',
							filter: 'string',
							width: 110
						},
						{
							text: {type: 'bundle', key: 'eachVolume'},
							dataIndex: 'eachM3',
							filter: 'string',
							width: 110
						},
						{
							text: {type: 'bundle', key: 'length'},
							dataIndex: 'length',
							filter: 'string',
							width: 110
						},
						{
							text: {type: 'bundle', key: 'width'},
							dataIndex: 'width',
							filter: 'string',
							width: 110
						},
						{
							text: {type: 'bundle', key: 'height'},
							dataIndex: 'height',
							filter: 'string',
							width: 110
						},
						{
							text: {type: 'bundle', key: 'hatchNo'},
							dataIndex: 'hatchNo',
							filter: 'string',
							width: 110
						},
						{
							text: {type: 'bundle', key: 'loadedMT'},
							dataIndex: 'loadedMt',
							filter: 'string',
							width: 110
						},
						{
							text: {type: 'bundle', key: 'loadedM3'},
							dataIndex: 'loadedM3',
							filter: 'string',
							width: 110
						},
						{
							text: {type: 'bundle', key: 'loadedQty'},
							dataIndex: 'loadedQty',
							filter: 'string',
							width: 110
						},
						{
							text: {type: 'bundle', key: 'storedMT'},
							dataIndex: 'storedMt',
							filter: 'string',
							width: 110
						},
						{
							text: {type: 'bundle', key: 'storedM3'},
							dataIndex: 'storedM3',
							filter: 'string',
							width: 110
						},
						{
							text: {type: 'bundle', key: 'storedQty'},
							dataIndex: 'storedQty',
							filter: 'string',
							width: 110
						},
						{
							text: {type: 'bundle', key: 'gateInMT'},
							dataIndex: 'gateInMt',
							filter: 'string',
							width: 110
						},
						{
							text: {type: 'bundle', key: 'gateInM3'},
							dataIndex: 'gateInM3',
							filter: 'string',
							width: 110
						},
						{
							text: {type: 'bundle', key: 'gateInQty'},
							dataIndex: 'gateInQty',
							filter: 'string',
							width: 110
						},
						{
							text: {type: 'bundle', key: 'rhdlMode'},
							dataIndex: 'rhdlMode',
							width: 110,
							items: [{
								getClass: function (value, meta, record) {
									return (record.data.rhdlMode === 'Y') ? 'x-fa fa-check green' : '';
								}
							}]
						},
						{
							text: {type: 'bundle', key: 'statNm'},
							dataIndex: 'statNm',
							reference: '',
							filter: 'string',
							width: 110
						},
						{
							text: {type: 'bundle', key: 'fnlOpeYn'},
							dataIndex: 'fnlOpeYn',
							width: 110,
							items: [{
								getClass: function (value, meta, record) {
									return (record.data.fnlOpeYn === 'Y') ? 'x-fa fa-check green' : '';
								}
							}]
						}
					]
				}
			]
		},
		
		{//Row2: Data Grid Loading InDirect (AV)
			xtype: 'fieldset',
			reference: 'refFlsJobLoadingGrid',
			flex: 1,
			border: true,				
			autoSize: true,
			shadow: false,
			scrollable: true,
			margin: '5 5 5 5',
			style: 'border-style: inherit; border-radius: 3px; border-color: #FFE0B2',
			layout:{
				type : 'vbox',
				align : 'stretch'
			},
			items: [
				{
					xtype:'label',
					style: 'color: red; font-weight: bold',
					html:'WA Jobs List - To Confirm Loading (Indirect)',
				},
				{
					xtype: 'grid',
					flex: 1,
					border: true,
					reference: 'refGridCmcLoadingInDirectList',
					bind: {
						store: '{cargoManualCtlTabExport}'
					},
					listeners: {
						//childdoubletap: 'onDblClickForJobMonitoringHHT'
					},
					selectable: {
						columns: false,
						checkbox: true,
						checkboxSelect: true,
						rows: true,
						cells: false,
						mode: 'single',
						headerCheckbox: false,
					},
					columns: [
						{
							text: {type: 'bundle', key: 'vslCallId'},
							dataIndex: 'vslCallId',
							filter: 'string',
							width: 150
						},
						{
							text: {type: 'bundle', key: 'category'},
							dataIndex: 'catgNm',
							filter: 'string',
							width: 110
						},
						{
							text: {type: 'bundle', key: 'delvTpNm'},
							dataIndex: 'delvTpNm',
							filter: 'string',
							width: 110
						},
						{
							text: {type: 'bundle', key: 'sNNo'},
							dataIndex: 'shipgNoteNo',
							filter: 'string',
							width: 180
						},
						
						{
							text: { type: 'bundle', key: 'actMt'},
							dataIndex: 'yardTruckMt',
							format: '0,000.000',
							reference: '',
							filter: 'string',
							width: 110
						},
						{
							text: { type: 'bundle', key: 'actM3'},
							dataIndex: 'yardTruckM3',
							format: '0,000.000',
							reference: '',
							filter: 'string',
							width: 110
						},
						{
							text: { type: 'bundle', key: 'actQty'},
							dataIndex: 'yardTruckQty',
							format: '0,000',
							reference: '',
							filter: 'string',
							width: 110
						},
						{
							text: {type: 'bundle', key: 'truckNo'},
							dataIndex: 'lorryNo',
							'hidden': false,
							filter: 'string',
							width: 110
						},
						// {
						// 	text: {type: 'bundle', key: 'statNm'},
						// 	dataIndex: 'statNm',
						// 	filter: 'string',
						// 	width: 110
						// },
						// {
						// 	text: {type: 'bundle', key: 'shippingAgent'},
						// 	dataIndex: 'shaCd',
						// 	filter: 'string',
						// 	width: 150
						// },
						// {
						// 	text: {type: 'bundle', key: 'forwardingAgent'},
						// 	dataIndex: 'fwdCd',
						// 	filter: 'string',
						// 	width: 150
						// },
						// {
						// 	text: {type: 'bundle', key: 'shipperConsignee'},
						// 	dataIndex: 'shpCnsCd',
						// 	filter: 'string',
						// 	width: 110
						// },
						{
							text: {type: 'bundle', key: 'cargoType'},
							dataIndex: 'cgTpCdNm',
							filter: 'string',
							width: 150
						},
						{
							text: {type: 'bundle', key: 'commodityGroup'},
							dataIndex: 'cmdtGrpNm',
							filter: 'string',
							width: 200
						},
						{
							text: {type: 'bundle', key: 'commodity'},
							dataIndex: 'cmdtNm',
							filter: 'string',
							width: 200
						},
						{
							text: {type: 'bundle', key: 'packageType'},
							dataIndex: 'pkgTpNm',
							filter: 'string',
							width: 200
						},
						{
							text: {type: 'bundle', key: 'marksAndNos'},
							dataIndex: 'marksNo',
							filter: 'string',
							width: 200
						},
						{
							text: {type: 'bundle', key: 'pckTrfPackageNo'},
							dataIndex: 'pkgNo',
							filter: 'string',
							width: 200
						},
						{
							text: {type: 'bundle', key: 'SNDescrGoods'},
							dataIndex: 'goodsRmk',
							filter: 'string',
							width: 200
						},
					]
				}
			]
		},
	]
});