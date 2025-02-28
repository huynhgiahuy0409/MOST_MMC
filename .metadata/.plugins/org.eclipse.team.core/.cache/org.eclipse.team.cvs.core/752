Ext.define('MOST.view.operation.RehandlingOfRORODetail', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-rehandlingofrorodetail',
	
	requires: [
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	height: 560,
    width: 1200,
	
	listeners: {
		afterrender: 'onDetailLoad',
		destroy: 'onSearch'
	},
	
	layout: {
		type: 'vbox', 
		align: 'stretch' 
	},
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			layout: {
				type: 'hbox', 
				align: 'stretch' 
			},
			defaults: {
				margin: '5 0 5 5'
			},
			items: [
			    {
					xtype : 'container',
					flex: 1,
					layout: {
						type: 'vbox', 
						align: 'stretch' 
					},
					items: [
					    {
							xtype: 'tsb-datagrid',
							reference: 'refStackedUnitGrid',
							flex: 1,
							usePagingToolbar : false,
							plugins: [
								'gridexporter',
								'gridfilters',
								'clipboard'
							],
							bind: {
								store: '{stackedUnitItems}'
							},
							selModel: {
								type: 'spreadsheet',
								cellSelect: false
							},
							listeners : {
								//cellclick: 'onStackedUnitItems_Click',
							},
							columns: {
								defaults: {
									style : 'text-align:center',
									align: 'center'
								},
								items: GridUtil.getGridColumns('RehandlingOfROROStackedUnitItems')
							}
						},
					]
			    },
				
				{
					xtype : 'container',
					style: { "background-color":"white" },
					width: 80,
					layout : {
						type : 'vbox',
						align: 'center',
                        pack: 'center'
					},
					defaults: {
						margin: '0 5 5 5'
					},
					items : [
						{
		 					xtype: 'button',
		 					width: 70,
		 					reference:'refBtnDtlAdd',
		 					disabled: false,
		 					text: ViewUtil.getLabel('add'),
		 					ui: 'create-button',
							iconCls: 'x-fa fa-plus',
		 					listeners: {
		 						click: 'onDtlAdd_clickHandler'
		 					}
		                 },
		                 
		                 {
							xtype: 'button',
							width: 70,
							reference:'refBtnDtlRemove',
							disabled: false,
							text: ViewUtil.getLabel('delete'),
							ui: 'delete-button',
							iconCls: 'x-fa fa-minus',
							listeners: {
								click: 'onDtlRemove_clickHandler'
							}
						 },
					]
				},
				
				{
					xtype : 'container',
					margin: '5 5 5 5',
					flex: 1,
					layout: {
						type: 'vbox', 
						align: 'stretch' 
					},
					items: [
					    {
					        xtype: 'tsb-datagrid',
							reference: 'refRehandlingUnitGrid',
							flex: 1,
							usePagingToolbar : false,
							plugins: [
								'gridexporter',
								'gridfilters',
								'clipboard'
							],
							bind: {
								store: '{rehandlingUnitItems}'
							},
							selModel: {
								type: 'spreadsheet',
								cellSelect: false
							},
							listeners : {
								//cellclick: 'onRehandlingUnitItems_Click',
							},
							columns: {
								defaults: {
									style : 'text-align:center',
									align: 'center'
								},
								items: GridUtil.getGridColumns('RehandlingOfROROUnitItems')
							}
						}
					]
				}
							
			],
			
			dockedItems:[
				{
					xtype : 'container',
					flex: 1,
					style: { "background-color":"white" },
					layout: {
						type: 'hbox',
					},
	                items: [
	                	{
		    				xtype: 'container',
		    				flex: 1,
				    		layout: {
				    			type: 'hbox',
				    			//align: 'stretch',
				    			pack: 'end'
				    		},
				    		defaults: {
								margin: '5 5 0 5'
							},
				    		items: [
				    			{
				 					xtype: 'button',
				 					reference:'refBtnConfirm',
				 					disabled: false,
				 					text: ViewUtil.getLabel('confirm'),
				 					listeners: {
				 						click: 'onDtlConfirm_clickHandler'
				 					}
				                 },
				    		]
	                	}
	                ]
				},
				
				{//Search Condition and Vessel information:
					xtype: 'toolbar',
					enableOverflow: true,
					padding : '0 0 0 0',
					margin: '0 0 0 0',
					defaults: {
						labelAlign: 'right',
					},
					items:[
						{
						xtype: 'fieldset',
						autoScroll: true,
						collapsible: false,
						margin: '5 5 5 5',
						padding : '10 10 10 10',
						flex:1,
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						defaults:{
							width : 250,
                            labelAlign : 'right',
							labelWidth : 80,
						},
						items:[
							//1
							{
								xtype: 'container',
								flex: 1,
								layout: {
						    		type: 'vbox'
					    		},
					    		defaults:{
					    			width: 350,
					    			labelAlign: 'right',
			                        labelWidth: 100, 
					    		},
						    	items: [
									{
										xtype : 'combo',
										flex: 1,
										fieldLabel : ViewUtil.getLabel('rehandleRehandleMode'),
										reference : 'ctlDtlRhdlMode',
										margin: '0 0 5 0',
										emptyText : ViewUtil.getLabel('rehandleRehandleMode'),
										bind: {
			            	    			store: '{rehandlingModeCombo}'
			            	    		},
			            	    		displayField: 'scdNm',
			           					valueField: 'scd',
			           					queryMode: 'local',
			           					value : '',
		                                editable : false, 
		                                listeners: {
					 						change: 'onDtlRhdlMode_changeHandler'
					 					}
									},
									{
										xtype : 'vesselcalllistfield',
										reference : 'ctlDtlNextVslCallId',
										fieldLabel : ViewUtil.getLabel('nextVslcallid'),
										emptyText : ViewUtil.getLabel('nextVslcallid'),
										editableControl: false
									}
									
						    	]
							},
							//2
							{
								xtype: 'container',
								flex: 1, 
								layout: {
						    		type: 'vbox'
					    		},
					    		defaults:{
					    			width: 350,
					    			labelAlign: 'right',
			                        labelWidth: 100,
			                        margin: '0 0 0 5'
					    		},
						    	items: [
						    		{
										xtype : 'textfield',
										fieldLabel : ViewUtil.getLabel('nextSnNo'),
										margin: '0 0 5 5',
										reference : 'ctlDtlNextSnNo',   
			           					value : '',
		                                editable : false
									},
									{
										xtype:'textfield',
										reference:'ctlNextSnQty',
										editable : false,
										fieldLabel: ViewUtil.getLabel('docQty'),
										fieldStyle: 'text-transform:uppercase'
									}
						    	]
							}
						]
					}
				]
			}
			]
		});
		
		me.callParent();
	}
});