Ext.define('MOST.view.billing.ImportReconcileForLiquid', {
    extend: 'Ext.form.Panel',
    alias: 'widget.app-importreconcileforliquid',
	requires: [
		'MOST.view.billing.ImportReconcileForLiquidController',
		'MOST.view.billing.ImportReconcileForLiquidModel',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	controller: 'importreconcileforliquid',
	
	viewModel: {
		type: 'importreconcileforliquid'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	layout : {type  : 'vbox', align : 'stretch'},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	
	MAIN_GRID_REF_NAME: 'refImportReconcileForLiquidGrid',
	MAIN_STORE_NAME: 'importReconcileForLiquidList',	
	
	MF_GRID_REF_NAME: 'refImportReconcileForLiquidMfGrid',
	MF_STORE_NAME: 'importReconcileForLiquidMfList',	
	
	CERT_GRID_REF_NAME: 'refImportReconcileForLiquidOutturnGrid',
	CERT_STORE_NAME: 'importReconcileForLiquidOutturnList',	
	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	initComponent: function() {
		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToMoveEditor: 2,
			clicksToEdit: 2,
			pluginId :'importReconcileEditor',
			autoCancel: false,
			errorsText: 'Warning',
			listeners: {
				beforeedit: 'onValidateBeforEdit',
				cancelEdit: 'onCancelEdit',
				validateedit:'onValidateEdit',
				edit: 'onEdit'
			}
		});
		
		Ext.apply(me, {
			items: [
				 {
			   		xtype: 'tsb-datagrid',
				   	margin: '5 5 0 0',
				   	cls: 'custom-grid-blue',
				   	reference: me.MAIN_GRID_REF_NAME,
				   	stateful : true,
				   	stateId : 'stateimportReconcileLiquidGrid',
				   	flex:1,
				   	scrollable: true,
				   	plugins: [
				   		rowEditing, 
					   'gridexporter',
					   'gridfilters',
					   ],
					bind: { store: '{' + me.MAIN_STORE_NAME + '}'},
					selModel: {
						type: 'spreadsheet',
						cellSelect: false
					},
					listeners: {
						celldblclick: 'onCellClick',
					pagingSearch: 'onSearch'
					},
					columns: {
						defaults: {
					    	style : 'text-align:center',
					    	align: 'center'
						},
						items: GridUtil.getGridColumns('ImportReconcileLiquid')
					}
               },
               {
			        xtype: 'splitter',
			        collapseOnDblClick: false
			   },
			   {/*Inward Manifest & Outturn Certificate Grid*/
		            xtype: 'container',
		            height: 300,
		            layout: {
		                type: 'hbox',
		                align: 'stretch'
		            },
		            items: [
		                {
		                	/*Inward Manifest Grid*/
		                    xtype: 'fieldset',
		                    flex: 1,
		                    title: '<span style="color:#780e9c;">Inward Manifest</span>',
		                    margin: '0 0 5 0',
		                    items: [
		                        {
		                            xtype: 'tsb-datagrid',
		                            reference: me.MF_GRID_REF_NAME,
		                            cls: 'custom-grid-blue',
		                            flex: 1,
		                            layout:{
		                            	type: 'hbox',
		                            	align:'strecth'
		                            },
		                            scrollable: true,
		                        	stateful : true,
		                        	usePagingToolbar : false,
		                            bind: {
		            	    			store: '{' + me.MF_STORE_NAME + '}'
		            	    		},
		            	    		selModel: {
		            					type: 'spreadsheet',
		            					cellSelect: false
		            				},
		                            columns: {
		                            	defaults: {
		            	            		style : 'text-align:center',
		            	            		align: 'center'
		            	            	},
		            	            	items: GridUtil.getGridColumns('ImportReconcileLiquid_manifests')
		                            }	
		                        }
		                    ]
		                },{
					        xtype: 'splitter',
					        collapseOnDblClick: false
					    },{
		                    xtype: 'fieldset',
		                    flex: 1,
		                    title: '<span style="color:#780e9c;">Outturn Certificate</span>',
		                    margin: '0 5 5 0',
		                    items: [
		                        {
		                            xtype: 'tsb-datagrid',
		                            reference: me.CERT_GRID_REF_NAME,
		                            cls: 'custom-grid-blue',
		                            flex: 1,
		                            layout:{
		                            	type: 'hbox',
		                            	align:'strecth'
		                            },
		                            scrollable: true,
		                            stateful: true,
		                        	usePagingToolbar: false,
		                            bind: {
		            	    			store: '{' + me.CERT_STORE_NAME + '}'
		            	    		},
		            	    		selModel: {
		            					type: 'spreadsheet',
		            					cellSelect: false
		            				},
		                            columns: {
		                            	defaults: {
		            	            		style : 'text-align:center',
		            	            		align: 'center'
		            	            	},
		            	            	items: GridUtil.getGridColumns('ImportReconcileLiquid_Cert')
		                            }
		                        }
		                    ]
		                }
		            ]
		        }
		    ],
		    
		    dockedItems: [
		    	{
					xtype : 'container',
					style: { "background-color":"white" },
					layout: {
						type: 'hbox',
					},
					defaults: {
						margin: '1 1 1 1'
					},
		            items:[{
						xtype: 'tbfill'
					},{
	            		xtype: 'button',
	            		reference:'refBtnRetrieve',
						text: ViewUtil.getLabel('search'),
						iconCls: 'x-fa fa-search', 
						cls: 'search-button', 
						listeners: {
							click: 'onSearch'
						}
					},{
						xtype: 'button',
						itemId: 'saveItemId',
						reference:'refBtnSave',
						text: ViewUtil.getLabel('save'),
						ui: 'update-button',
						iconCls: 'x-fa fa-save',
						listeners: {
							click: 'onSave'
						}
					},{
						xtype: 'button',
						itemId: 'exportToPdfButton',
						text: ViewUtil.getLabel('exportToPdf'),
						iconCls: 'x-fa fa-file-pdf-o',
						cls: 'excel-button',
						listeners: {
							click: {
								fn: 'onExportExcelPdfWithServer',
								args:[me.MAIN_GRID_REF_NAME, false]
							}
						}
	            	},{
						xtype: 'button',
						cls: 'column-setting-button',
						iconCls: 'x-fa fa-columns',
						text: ViewUtil.getLabel('column'),
						listeners: {
							click: 'onColumnSettingPopup',
							args: [me.MAIN_GRID_REF_NAME]
						}
					
	            	},{
						xtype: 'textfield',
						disable: true,
						reference: 'ctlVerifyText',
						width: 100,
						fieldStyle: 'background-color:#c0c0c0;background-image:none;font-weight:bold;text-align: center;',
					},{
						xtype: 'button',
						reference: 'ctlVerifybtn',
						text: me.btnVerify,
						listeners: {
							click: 'onVerify'
						}
					}]
			    },
			    {
		    		xtype: 'toolbar',
					enableOverflow: true,
					padding : '0 0 0 0',
					margin: '0 0 0 0',
					defaults: {
						labelAlign: 'right',
					},
					items:[{
						xtype: 'fieldset',
						autoScroll: true,
						collapsible:true,
						margin: '5 5 5 5',
						flex:1,
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						defaults:{
							margin: '0 5 5 0'
						},
						items:[{
							xtype: 'searchfieldset',
							title: ViewUtil.getLabel('search'),
							layout: {
								type: 'vbox'
							},
							items:[{
								xtype: 'shipcallnofield',
								reference: 'ctlScn',
								flex: 1,
								labelWidth:70,
								emptyText: ViewUtil.getLabel('shipCallNo'),
								fieldLabel: ViewUtil.getLabel('shipCallNo'),
								bind: {
									value: '{theSearch.scn}',
								},
							},{
		  				    	xtype:'vesselcalllistfield',
		  				    	reference:'ctlVesselCallIdfield',
								margin : '5 0 0 0',
								flex: 1,
		  				    	fieldLabel:ViewUtil.getLabel('vslcallid'),
		  				    	emptyText:ViewUtil.getLabel('vslcallid'),
		  				    	labelWidth:70,
								bind : {
									value : '{theSearch.vslCallId}'
								}
		  				    }]
						},{
		                    xtype: 'fieldset',
							title: ViewUtil.getLabel('vslInfo'),
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
							flex: 1,
							margin: '0 0 5 5',
							items: [{
	                            xtype: 'container',
	    						defaults : {
	    							margin : '0 5 5 0',
	    							labelAlign : 'right',
	    							width : 230,
	    							labelWidth : 80
	    						},
	    						layout : {
	    							type : 'vbox'
	    						},
	    						items: [{
	                                xtype: 'textfield',
	                                fieldLabel: ViewUtil.getLabel('vesselName'),
	                                editable:false,
	                                reference: 'ctlvesselName',
	                                bind:'{theVsl.vslNm}'
	                            },{
	                                xtype: 'textfield',
	                                fieldLabel: ViewUtil.getLabel('voyage'),
	                                editable:false,
	                                reference: 'ctlvoyage',
	                                bind:'{theVsl.voyage}'
	                            }]
	                        },{
	                            xtype: 'container',
	                            layout: {
	                                type: 'vbox',
	                                align: 'stretch'
	                            },
	                            defaults:{
	    							margin : '0 5 5 0',
	    							labelAlign : 'right',
	    							width : 230,
	    							labelWidth : 80
	    						},
	    						items: [{
	                                xtype: 'textfield',
	                                fieldLabel: ViewUtil.getLabel('sA'),
	                                editable:false,
	                                reference: 'ctlSA',
	                                bind:'{theVsl.arrvSaId}',
	                                format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
	                            },{
	                            	 xtype: 'textfield',
	                                 fieldLabel: ViewUtil.getLabel('berthNo'),
	                                 editable:false,
	                                 reference: 'ctlberthNo',
	                                bind:'{theVsl.berthLoc}'
	                            }]
	                        },{
	                            xtype: 'container',
	                            layout: {
	                                type: 'vbox',
	                                align: 'stretch'
	                            },
	                            defaults:{
	    							margin : '0 5 5 0',
	    							labelAlign : 'right',
	    							width : 230,
	    							labelWidth : 80
	    						},
	    						items: [{
	                                xtype: 'datefield',
	                                fieldLabel: ViewUtil.getLabel('eTA'),
	                                bind: '{theVsl.eta}',
	                                readOnly : true,
		                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
	                            },{
	                                xtype: 'datefield',
	                                fieldLabel: ViewUtil.getLabel('eTD'),
	                                bind: '{theVsl.etd}',
	                                readOnly : true,
	                                format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
	                            }]
	                        }]
						}]
					}]
			    }
		    	
		    	]
			});
		me.callParent();
	}
});

