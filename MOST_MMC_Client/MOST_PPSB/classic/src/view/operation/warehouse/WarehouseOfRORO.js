Ext.define('MOST.view.operation.warehouse.WarehouseOfRORO', {
	extend: 'Ext.panel.Panel',
	
	alias: 'widget.app-warehouseofroro',
	
    requires: [
	    'Ext.draw.Container',
	    'MOST.config.Locale'
	],
   	layout: {
		type: 'vbox',
		align: 'stretch'
    },
    
	width: 1100,
	height: 590,
	scrollable: true,
	
	controller: 'warehouseofroro',
	
	viewModel: {
		type: 'warehouseofroro'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
    
    lblKeepFitYardToWindow: {type: 'bundle', key: 'keepFitBerthToWindow'},
    lblWarehouseZoom: {type: 'bundle', key: 'warehouseZoom'},
    lblWarehouseId: {type: 'bundle', key: 'WHId'},
    lblSetUnusedBlock: {type: 'bundle', key: 'setUnusedBlock'},
	
    config: {
		recvData : null
	},
	
	initComponent: function() {
		var me = this;

		Ext.apply(me, {
			items: [{
				xtype: 'panel',
				itemId: 'warehouseAllocationId',
				flex: 1,
			    layout: {
			        type: 'hbox',
			        align: 'stretch'
			    },
				items: [{
							xtype: 'panel',
				            flex: 1,
				            margin: '5 5 5 0',
							reference: 'refWarehouseLayoutView',
							layout: {
								type: 'absolute'
							},
							scrollable: true,
							listeners : {
								'render': 'onLayoutViewRender'
							}
						},{
				            xtype: 'panel',
				            width: 470,
				            layout: {
				                type: 'vbox',
				                align: 'stretch'
				            },
				            items: [{
                                xtype: 'container',
                                layout:{
                                	type: 'hbox',
                                	pack: 'end'
                                },
                                defaults: {
    		                        margin: '0 5 0 0',
    		                    },
                                items: [
                                	 {
                                         xtype: 'button',
                                         ui: 'create-button',
                                         iconCls: 'fa fa-floppy-o',
                                         margin: '3 0 0 0',
                                         width : 80,
                                         text: 'Ok',
                                     	listeners: {
                                     		click: 'onSave'
                                         }
                                     },
                                     {
                                         xtype: 'button',
                                         ui: 'delete-button',
                                         iconCls: 'x-fa fa-minus',
                                         margin:'3 10 0 2',
                                         width : 80,
                                         text: 'Cancel',
                                         listeners: {
                                     		click: 'onCancel'
                                         }
                                     }
                                ]
                            },{
				                    xtype: 'fieldset',
				                    margin: '0 5 0 0',
				                    title: '',
				                    reference: 'refFrameCargoAmount',
				                    flex:0.3, 
				                    layout:{
				                    	type:'vbox',
				                    	align:'stretch'
				                    },				                    
				                    items:[
				                    	 {
			                                    xtype: 'container',
			                                    layout: {
			                                        type: 'hbox'
			                                    },
			                                    defaults: {
		            		                        labelAlign: 'right',
		            		                        margin: '5 5 0 0'		            		                        
		            		                    },
			                                    items: [
			                                        {
			                                            xtype: 'textfield',
														reference : 'refSelectedCell',
			                                            labelWidth: 80,
			                                            reference: 'refSelectedCell',
			                                            width: 200,
			                                            fieldLabel: 'Selected Cell'
			                                        },
			                                        {
			                                            xtype: 'textfield',
			                                            reference: 'refCgNo',
			                                            labelWidth: 50,
			                                            width: 200,
			                                            fieldLabel: 'CG No'
			                                        }
			                                    ]
			                                }
				                    ]
				                },{
				                    xtype: 'fieldset',
				                    flex: 0.7,
				                    margin: '5 5 5 0',
				                    title: 'Cargo Info in selected cell',
				                    layout:{
				                    	type:'hbox',
				                    	align:'stretch'
				                    },
				                    items:[
				                    	{
		                                    xtype: 'grid',
		                                    reference: 'refCargoInfoGrid',
		                    	    		bind: {
		                    	    			store: '{cargoInfoInSelectedCell}'
		                    	    		},
		                    	    		flex:1,
		                                    columns: [
		                                        {
		                                        	header: 'Cargo No',
		                                            dataIndex: 'cgNo',
		                                            width: 100
		                                        },{
		                                        	header: 'SP.CG',
		                                            dataIndex: 'spCaCoCdNm',
		                                            width: 100
		                                        },{
		                                        	header: 'CG.Cond',
		                                            dataIndex: 'whTpCdNm',
		                                            width: 100
		                                        },{
		                                        	header: 'MT',
		                                            dataIndex: 'wgt',
		                                            width: 80
		                                        },{
		                                        	header: 'M3',
		                                            dataIndex: 'msrmt',
		                                            width: 80
		                                        },{
		                                        	header: 'Qty',
		                                            dataIndex: 'pkgQty',
		                                            width: 80
		                                        }
		                                    ],
		                                    listeners:{
		                                    	//cellClick:'onCargoInfoCellClick'
		                                    }
		                                }
				                    ]
				                }
				            ]
				        }],		            	
                dockedItems: [{
				    xtype: 'toolbar',
					dock: 'top',
					margin: '1 0 0 0',
					hidden: false,
					items: [{
							xtype: 'combo',
							fieldLabel: 'Warehouse',
							editable: false,
							allowBlank: true,
							reference: 'refWarehouse',
							emptyText: me.lblEmptyText,
						   	displayField: 'locNm',
	            		   	valueField: 'locId',
							labelWidth: 60,
							margin: '0 40 0 0',
							queryMode: 'local',
							bind: {
								store: '{warehouseList}'
							},
							listeners : {
								select : 'onWarehouseSelect'
							}
						},{
	                       	xtype:'button',					
				            text: 'Mode',
				            iconCls: 'fa fa-qrcode',
				            arrowAlign:'right',
				            reference:'refMode',
				            menu: [{ 
				            	xtype: 'segmentedbutton',
				            	vertical: false,
				            	items:[{
					            	text: 'Occupied', 
					            	value: 'occupied',
					            	reference: 'refOccupied',
					            	pressed: true,
					            	listeners: {
					            		click: 'onChangeColorBy'
					            	} 
					            },{
					            	text: 'Plan', 
					            	value: 'plan',
					            	reference: 'refPlan',
					            	listeners: {
					            		click: 'onChangeColorBy'
					            	}
					            }]
				            }]	                   
	                    },{
	                       	xtype:'button',					
				            text: 'By Color',
				            iconCls: 'fa fa-th-large',
				            arrowAlign:'right',
				            menu: [{ 
				            	xtype: 'segmentedbutton',
				            	vertical: false,
				            	items:[{
					            	text: 'Vessel', 
					            	value: 'vessel',
					            	reference: 'refColorByCargo',
					            	pressed: true,
					            	listeners: {
					            		click: 'onWarehouseColorModeChange'
					            	} 
					            },{
					            	text: 'Category', 
					            	value: 'category',
					            	reference: 'refColorByPOD',
					            	listeners: {
					            		click: 'onWarehouseColorModeChange'
					            	}
					            },{
					            	text: 'Cargo Type', 
					            	value: 'cargo',
					            	reference: 'refColorByCntry',
					            	listeners: {
					            		click: 'onWarehouseColorModeChange'
					            	}
					            }]
				            }]	                   
	                    },{
	                    	xtype:'button',					
	                    	text: 'Planned Info',
	                    	reference : 'refPlannedInfo',
	                    	iconCls: 'fa fa-list-alt',
	                    	handler: 'onDisplayLegend'
	                    },{
	                    	xtype:'button',					
	                    	text: 'Legend',
	                    	iconCls: 'fa fa-list-alt',
	                    	handler: 'onDisplayLegend'
	                    },{
	                    	xtype:'button',					
				            text: me.lblWarehouseZoom,
	                    	iconCls: 'x-fa fa-search-plus',
				            arrowAlign:'right',
				            tooltip: me.lblWarehouseZoom,
				            menu: [{ 
				            	xtype: 'segmentedbutton',
				            	vertical: false,
				            	items:[{
					            	text: '-20%', 
					            	tooltip: 'Zoom Out (-20%)',
					            	handler: 'onZoomWarehouse',
					            	value: '-20'
					            }, {
									xtype: 'button',
									text: '100%',
						        	tooltip: 'Zoom to 100%',
									handler: 'onZoomWarehouse',
									value: 100,
					            	pressed: true
					            }, {
					            	text: '+20%', 
					            	tooltip: 'Zoom In (+20%)',
					            	handler: 'onZoomWarehouse',
					            	value: '20'
					            }]
				            }]			
	                    },{
	                    	xtype: 'checkboxfield',
	                    	boxLabel: 'Keep Fit Warehouse To Window',
	                    	name: 'fitWindow',
	                    	reference: 'refFit',
	                    	listeners: {
	                    		change: 'onFitToScreenWarehouse'
	                    	}	
	                    }
	                ]
                }]
			}]
		});
		
		me.callParent();
	}
});