Ext.define('MOST.view.configuration.TerminalDefinition', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-terminaldefinition',
	
	requires: [
		'MOST.view.configuration.TerminalDefinitionModel',
		'MOST.view.configuration.TerminalDefinitionController',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	controller: 'terminaldefinition',
	
	viewModel: {
		type: 'terminaldefinition'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	layout : {type  : 'vbox', align : 'stretch'},
	
	initComponent: function() {
		var me = this;
			
		Ext.apply(me, {
			xtype:'form',
			defaults:{
				margin: '5 5 5 0' // top, right, bottom, left
			},
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
		        {
		            xtype: 'container',
		            height: 600,
	                layout: {
	                    type: 'hbox',
	                    align: 'stretch'
	                },
	                defaults: {
                        margin: '5 0 0 0'// top, right, bottom, left
                    },
		            
		            items: [
		            	{
		            		xtype: 'container',
		            		height: 34,
		            		defaults: {
                                labelAlign: 'right',
                                labelWidth: 85
                            },
		            		layout: {
				                type: 'vbox',
				                align: 'stretch'
				            },
				            defaults: {
		                        margin: '5 5 0 5',
		                        labelAlign: 'right',
		                    },
		                    items: [
				            	{
		                            xtype: 'textfield',
		                            reference: 'refTerminalCode',
		                            width: 230,
		                            fieldLabel: ViewUtil.getLabel('tmnlDefTerminalCode'),
		                            bind: '{theTerminal.ptyCd}',
		                            fieldStyle: 'background-color: #ddd;',
									editable : false,
									labelWidth: 100
		                        },{
		                            xtype: 'textfield',
		                            reference: 'refTerminalType',
		                            width: 230,
		                            fieldLabel: ViewUtil.getLabel('tmnlDefTerminalType'),
		                            bind: '{theTerminal.tmnlTpCd}',
		                            fieldStyle: 'background-color: #ddd;',
									editable : false,
									labelWidth: 100
		                        },{
		                            xtype: 'textfield',
		                            reference: 'refTerminalName',
		                            width: 230,
		                            fieldLabel: ViewUtil.getLabel('tmnlDefTerminalName'),
		                            bind: '{theTerminal.engPtyNm}',
		                            fieldStyle: 'background-color: #87CEFA;',
									labelWidth: 100
		                        },{
		                            xtype: 'textfield',
		                            reference: 'refCompanyNo',
		                            width: 230,
		                            fieldLabel: ViewUtil.getLabel('tmnlDefCompanyNo'),
		                            bind: '{theTerminal.compRegNo}',
									labelWidth: 100
		                        },{
		                            xtype: 'textfield',
		                            reference: 'refRepresentative',
		                            width: 230,
		                            fieldLabel: ViewUtil.getLabel('tmnlDefRepresentative'),
		                            bind: '{theTerminal.rpstvNm}',
									labelWidth: 100
		                        },{
		                            xtype: 'textfield',
		                            reference: 'refPhoneNo',
		                            width: 230,
		                            fieldLabel: ViewUtil.getLabel('tmnlDefPhoneNo'),
		                            bind: '{theTerminal.telNo}',
									labelWidth: 100
		                        },{
		                            xtype: 'textfield',
		                            reference: 'refFaxNo',
		                            width: 230,
		                            fieldLabel: ViewUtil.getLabel('tmnlDefFaxNo'),
		                            bind: '{theTerminal.faxNo}',
									labelWidth: 100
		                        },{
		                            xtype: 'textfield',
		                            reference: 'refEmail',
		                            width: 230,
		                            fieldLabel: ViewUtil.getLabel('tmnlDefEmail'),
		                            bind: '{theTerminal.email}',
									labelWidth: 100
		                        },{
		                            xtype: 'textfield',
		                            reference: 'refWebsite',
		                            width: 230,
		                            fieldLabel: ViewUtil.getLabel('tmnlDefWebsite'),
		                            bind: '{theTerminal.webSite}',
									labelWidth: 100
		                        },{
		                            xtype: 'textfield',
		                            reference: 'refAddress',
		                            width: 330,
		                            fieldLabel: ViewUtil.getLabel('tmnlDefAddress'),
		                            bind: '{theTerminal.addr}',
									labelWidth: 100
		                        },{
		                            xtype: 'textfield',
		                            reference: 'refRemark',
		                            width: 330,
		                            fieldLabel: ViewUtil.getLabel('tmnlDefRemark'),
		                            bind: '{theTerminal.rmk}',
									labelWidth: 100
		                        },{
		                            xtype: 'textfield',
		                            reference: 'refFileReference',
		                            width: 330,
		                            fieldLabel: ViewUtil.getLabel('tmnlDefFileReference'),
									labelWidth: 100
		                        },
		                    ]
		            	},{
		            		xtype: 'container',
		            		defaults: {
                                labelAlign: 'right',
                                labelWidth: 85
                            },
		            		layout: {
				                type: 'vbox',
				                align: 'stretch'
				            },
				            defaults: {
		                        margin: '5 5 0 5',
		                        labelAlign: 'right'
		                    },
		                    items: [
		                    	{
				            		xtype: 'container',
				            		height: 26,
				            		defaults: {
				            			labelWidth: 85,
				            			labelAlign: 'right'
		                            },
				            		layout: {
						                type: 'hbox',
						                align: 'stretch'
						            },
				                    items: [
				                        {
				                            xtype: 'textfield',
				                            reference: 'refTerminalLayoutLength',
				                            width: 430,
				                            fieldLabel: ViewUtil.getLabel('tmnlDefTerminalLayoutLength'),
				                            bind: '{theTerminal.loLen}',
											labelWidth: 170
				                        },{
			                            	xtype:'label',
			                            	margin: '10 5 0 10',
			                            	text:'M'
			                            },
				                    ]
				            	},
				            	{
				            		xtype: 'container',
				            		height: 26,
				            		defaults: {
				            			labelWidth: 85,
										labelAlign: 'right'
		                            },
				            		layout: {
						                type: 'hbox',
						                align: 'stretch'
						            },
				                    items: [
				                    	{
				                            xtype: 'textfield',
				                            reference: 'refTerminalLayoutWidth',
				                            width: 430,
				                            fieldLabel: ViewUtil.getLabel('tmnlDefTerminalLayoutWidth'),
				                            bind: '{theTerminal.loWth}',
											labelWidth: 170
				                        },{
			                            	xtype:'label',
			                            	margin: '10 5 0 10',
			                            	text:'M'
			                            },
				                    ]
				            	},
				            	{
				    				xtype: 'container',
				            		height: 26,
				            		defaults: {
										labelAlign: 'right'
		                            },
				            		layout: {
						                type: 'hbox',
						                align: 'stretch'
						            },
				                    items: [
										{
											xtype: 'textfield',
											reference: 'refUNLOCode',
											width: 430,
											fieldLabel: ViewUtil.getLabel('tmnlDefUNLOCode'),
											fieldStyle: 'background-color: #ddd;',
											bind: '{theTerminal.unnoCd}',
											editable : false,
											labelWidth: 170
										}
									]
		                        },
								{
									xtype: 'container',
				            		height: 26,
				            		defaults: {
										labelAlign: 'right'
		                            },
				            		layout: {
						                type: 'hbox',
						                align: 'stretch'
						            },
				                    items: [
				                    	{
		            				    	xtype: 'datefield',
		            						reference: 'refContractYear',
											width: 430,
		            				        fieldLabel: ViewUtil.getLabel('tmnlContractYear'),
		            				        format: MOST.config.Locale.getShortDate(),
		            				        bind:'{theTerminal.contractYear}',
											labelWidth: 170,
											fieldStyle: 'background-color: #87CEFA;'
		            				    },
				                    ]
								}
		                    ]
		            	}
		            ]
		        }
			],
            dockedItems:[
            	{
					xtype: 'container',
					style: { "background-color":"white" },
					layout: {
	                	type: 'hbox',
	                },
					defaults: {
						margin: '1 1 1 1'
		        	},
					items: [
						{
							xtype: 'tbfill'
						},{
							xtype: 'button',
							itemId: 'saveItemId',
							reference:'refBtnSave',
							text: ViewUtil.getLabel('save'),
							iconCls: 'x-fa fa-save',
							listeners: {
								click: 'onSave'
							}
						}
					]
				}
            ]
		});
		
		me.callParent();
	}
});