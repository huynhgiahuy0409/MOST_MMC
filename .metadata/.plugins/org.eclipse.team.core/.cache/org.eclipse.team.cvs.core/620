Ext.define('MOST.view.billing.ExportReconcile', {
    extend: 'Ext.form.Panel',
    alias: 'widget.app-exportreconcile',
	requires: [
		'MOST.view.billing.ExportReconcileController',
		'MOST.view.billing.ExportReconcileModel',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	controller: 'exportreconcile',
	
	viewModel: {
		type: 'exportreconcile'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	
	layout : {type  : 'vbox', align : 'stretch'},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refexportReconcileGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'exportReconcileList',	
	
	SUB_GRID_REF_NAME: 'refExportManifestGrid',				// Main Grid Name 
	SUB_STORE_NAME: 'exportManifestList',	
	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	initComponent: function() {
		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToMoveEditor: 2,
			clicksToEdit: 2,
			pluginId :'ixportReconcileEditor',
			listeners: {
				cancelEdit: 'onCancelEdit',
				validateedit:'onValidateEdit',
				edit: 'onEdit'
			}
		});
		
		Ext.apply(me, {
			layout: {
				type: 'vbox', 
				align: 'stretch' 
			},
			items: [{
	        	xtype: 'tsb-datagrid',
                margin: '5 5 0 0',
                reference: me.MAIN_GRID_REF_NAME,
				stateId : 'stateexportReconcileGrid',
				stateful : true,
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
					celldblclick: 'onCellClick',
					pagingSearch: 'onSearch'
				},
                columns: {
	    			defaults: {
	            		style : 'text-align:center',
	            		align: 'center'
	            	},
	            	items: GridUtil.getGridColumns('ExportReconcile')
                }
            },{
	            xtype: 'container',
	            hidden: true,
                flex: 1,
	            layout: {
	                type: 'hbox',
	                align: 'stretch'
	            },
	            items: [{
                    xtype: 'fieldset',
                    hidden: true,
                    flex: 1,
                    margin: '0 0 5 0',
                    title: '<span style="color:#780e9c;">Outward Manifest</span>',
                    items: [{
                    	xtype: 'tsb-datagrid',
                    	flex: 1,
                        margin: '5 0 5 0',
                        scrollable: true,
                    	stateful : true,
                    	usePagingToolbar : false,
                    	reference: me.SUB_GRID_REF_NAME,
                        bind: {
                        	store: '{' + me.SUB_STORE_NAME + '}'
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
        	            	items: GridUtil.getGridColumns('ExportReconcile_subGrid')
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
					autoScroll: true,
					collapsible:true,
					margin: '0 5 0 0',
					padding: '0 10 10 10',
					flex:1,
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items:[{
						xtype: 'searchfieldset',
						margin: '0 5 0 0',
						padding: '0 10 10 10',
						title: ViewUtil.getLabel('search'),
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						items: [
							{
								xtype: 'vesselcalllistfield',
								reference: 'ctlVesselCallIdfield',
								fieldLabel: ViewUtil.getLabel('vslcallid'),
								emptyText: ViewUtil.getLabel('vslcallid'),
								labelWidth: 70,
								bind: {
									value: '{theSearch.vslCallId}'
								}
							}
						]
					},{
	                    xtype: 'fieldset',
						title: ViewUtil.getLabel('vslInfo'),
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
    					flex: 1,
    					margin: '0 0 0 5',
						padding: '0 10 10 10',
						defaults: {
							flex: 1
						},
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

