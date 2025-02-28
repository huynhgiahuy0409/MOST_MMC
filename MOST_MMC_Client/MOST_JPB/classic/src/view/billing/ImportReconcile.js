Ext.define('MOST.view.billing.ImportReconcile', {
    extend: 'Ext.form.Panel',
    alias: 'widget.app-importreconcile',
	requires: [
		'MOST.view.billing.ImportReconcileController',
		'MOST.view.billing.ImportReconcileModel',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	controller: 'importreconcile',
	
	viewModel: {
		type: 'importreconcile'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	layout : {type  : 'vbox', align : 'stretch'},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refimportReconcileGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'importReconcileRecclList',	
	
	MF_STORE_NAME: 'importReconcileMfList',	
	
	CERT_STORE_NAME: 'importReconcileOutturnList',	
	
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
				cancelEdit: 'onCancelEdit',
				validateedit:'onValidateEdit',
				edit: 'onEdit'
			}
		});
		
		Ext.apply(me, {
			items: [{
        		xtype: 'tsb-datagrid',
        		margin: '5 5 0 0',
                cls: 'custom-grid-blue',
                reference: me.MAIN_GRID_REF_NAME,
                stateful : true,
				stateId : 'stateimportReconcileGrid',
				flex: 1,
                scrollable: true,
                plugins: [
                	rowEditing,
					'gridexporter',
					'gridfilters',
					'clipboard'
	    		],
	    		bind: {
	    			store: '{' + me.MAIN_STORE_NAME + '}'
	    		},
	    		selModel: {
					type: 'spreadsheet',
					cellSelect: false
				},
	    		listeners: {
	    			cellDblClick: 'onCellClick',
					pagingSearch: 'onSearch'
				},
				columns: {
	    			defaults: {
	            		style : 'text-align:center',
	            		align: 'center'
	            	},
	            	items: GridUtil.getGridColumns('ImportReconcile')
                }
            },{
	            xtype: 'container',
	            hidden: true,
	            layout: {
	                type: 'hbox',
	                align: 'stretch'
	            },
	            items: [{
                    xtype: 'fieldset',
                    flex: 1,
                    margin: '0 0 5 0',
                    hidden: true,
                    title: '<span style="color:#780e9c;">Inward Manifest</span>',
                    items: [{
                    	xtype: 'tsb-datagrid',
    		            flex: 1,
    		            layout:{
                        	type: 'hbox',
                        	align:'strecth'
                        },
    		            cls: 'custom-grid-blue',
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
        	            	items: GridUtil.getGridColumns('ImportReconcile_manifests')
                        }
                    }]
	            },{
                    xtype: 'fieldset',
                    margin: '0 5 5 0',
                    hidden: true,
                    flex: 1,
                    title: '<span style="color:#780e9c;">Outturn Certificate</span>',
                    items: [{
                    	xtype: 'tsb-datagrid',
                        flex: 1,
                        layout:{
                        	type: 'hbox',
                        	align:'strecth'
                        },
                        cls: 'custom-grid-blue',
                        scrollable: true,
                    	stateful : true,
                    	usePagingToolbar : false,
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
        	            	items: GridUtil.getGridColumns('ImportReconcile_Cert')
                        }
                    }]
                }]
	        }],
		    
		    dockedItems: [{
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
		    },{
	    		xtype: 'toolbar',
				enableOverflow: true,
				padding : '0 0 0 0',
				margin: '0 0 0 0',
				defaults: {
					labelAlign: 'right',
				},
				items:[{
					xtype: 'fieldset',
					padding: '0 10 10 10',
					margin: '0 5 0 0',
					autoScroll: true,
					collapsible:true,
					flex:1,
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items:[{
						xtype: 'searchfieldset',
						padding: '0 10 10 10',
						margin: '0 5 0 0',
						title: ViewUtil.getLabel('search'),
						layout: {
							type: 'vbox',
							align: 'stretch'
						},
						defaults: {
							labelWidth: 80,
						},
						items:[
							{
								xtype: 'shipcallnofield',
								reference: 'ctlScn',
								emptyText: ViewUtil.getLabel('shipCallNo'),
								fieldLabel: ViewUtil.getLabel('shipCallNo'),
								bind: {
									value: '{theSearch.scn}',
								},
							},
							{
		  				    	xtype:'vesselcalllistfield',
		  				    	reference:'ctlVesselCallIdfield',
		  				    	fieldLabel:ViewUtil.getLabel('vslcallid'),
		  				    	emptyText:ViewUtil.getLabel('vslcallid'),
		  				    	margin: '5 0 0 0',
								bind : {
									value : '{theSearch.vslCallId}'
								}
	  				    }]
					},{
	                    xtype: 'fieldset',
						padding: '0 10 10 10',
						title: ViewUtil.getLabel('vslInfo'),
	                    layout: {
	                        type: 'hbox',
	                        align: 'stretch'
	                    },
						defaults: {
							flex: 1
						},
						flex: 1,
						margin: '0 0 0 5',
						items: [{
                            xtype: 'container',
    						defaults : {
    							margin : '0 0 5 0',
    							labelAlign : 'right',
    							labelWidth : 80
    						},
    						layout : {
    							type : 'vbox',
								align: 'stretch'
    						},
    						items: [{
                                xtype: 'textfield',
                                fieldLabel: ViewUtil.getLabel('vesselName'),
                                editable:false,
                                reference: 'ctlvesselName',
                                bind:'{theVsl.vslNm}'
                            },{
                                xtype: 'textfield',
								margin : '0 0 0 0',
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
    							margin : '0 0 5 0',
    							labelAlign : 'right',
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
								 margin : '0 0 0 0',
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
    							margin : '0 0 5 0',
    							labelAlign : 'right',
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
								margin : '0 0 0 0',
                                fieldLabel: ViewUtil.getLabel('eTD'),
                                bind: '{theVsl.etd}',
                                readOnly : true,
                                format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
                            }]
                        },
						{
							xtype: 'container'
						}	
					]
					}]
				}]
		    }]
		});
		
		me.callParent();
	}
});