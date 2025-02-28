Ext.define('MOST.view.operation.warehouse.WarehouseOfGC', {
	extend: 'Ext.panel.Panel',
	
	alias: 'widget.app-warehouseofgc',
	
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
	
	controller: 'warehouseofgc',
	
	viewModel: {
		type: 'warehouseofgc'
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
				                    title: 'Allocated Cargo Amount',
				                    reference: 'refFrameCargoAmount',
				                    flex:0.6, 
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
			                                },{
			                                    xtype: 'container',
			                                    layout: {
			                                        type: 'hbox'
			                                    },
			                                    defaults: {
		            		                        labelAlign: 'right',
		            		                        margin: '5 0 0 0',
		            		                        labelWidth: 50
		            		                    },
			                                    items: [
			                                        {
			                                            xtype: 'numberfield',
			                                            reference: 'ctlTotalMT',
			                                            flex: 1,
			                                            readOnly: true,
			                                            minValue : 0,
			        		                        	maxValue: 999999999999.999,
			        		                        	decimalPrecision: 3,
			                                            fieldLabel: 'Tot MT'
			                                        },
			                                        {
			                                            xtype: 'numberfield',
			                                            reference: 'ctlTotalM3',
			                                            flex: 1,
			                                            readOnly: true,
			                                            minValue : 0,
			        		                        	maxValue: 999999999999.999,
			        		                        	decimalPrecision: 3,
			                                            fieldLabel: 'Tot M3'
			                                        },
			                                        {
			                                            xtype: 'numberfield',
			                                            reference: 'ctlTotalQty',
			                                            flex: 1,
			                                            readOnly: true,
			                                            minValue : 0,
			        		                        	maxValue: 999999999999,
			                                            fieldLabel: 'Tot Qty'														
			                                        }
			                                    ]
			                                },{
			                                    xtype: 'container',
			                                    layout: {
			                                        type: 'hbox'
			                                    },
			                                    defaults: {
		            		                        labelAlign: 'right',
		            		                        margin: '5 0 0 0',
		            		                        labelWidth: 50
		            		                    },
			                                    items: [
			                                        {
			                                            xtype: 'numberfield',
			                                            flex: 1,
			                                            reference:'refAllocatedMT',
			                                            minValue : 0,
			        		                        	maxValue: 999999999999.999,
			        		                        	decimalPrecision: 3,
			                                            fieldLabel: 'MT'
			                                        },
			                                        {
			                                            xtype: 'numberfield',
			                                            reference:'refAllocatedM3',
			                                            minValue : 0,
			        		                        	maxValue: 999999999999.999,
			        		                        	decimalPrecision: 3,
			                                            flex: 1,
			                                            fieldLabel: 'M3'
			                                        },
			                                        {
			                                            xtype: 'numberfield',
			                                            reference:'refAllocatedQty',
			                                            minValue : 0,
			        		                        	maxValue: 999999999999,
			                                            flex: 1,
			                                            fieldLabel: 'Qty',
														listeners:{
															change: "onChangePkgQty"
														}
			                                        }
			                                    ]
			                                },{
			                                    xtype: 'container',
			                                    layout:{
			                                    	type: 'hbox',
			                                    	pack: 'end'
			                                    },
			                                    margin : '5 0 0 0',
			                                    defaults: {
		            		                        margin: '5 5 0 0',
		            		                    },
			                                    items: [
			                                        {
			                                            xtype: 'button',
			                                            ui: 'create-button',
			                                            iconCls: 'fa fa-floppy-o',
			                                            margin: '0 0 0 250',
			                                            width : 80,
			                                            text: 'Update',
		                                            	listeners: {
		                                            		click: 'onUpdate'
		                                                }
			                                        },
			                                        {
			                                            xtype: 'button',
			                                            ui: 'delete-button',
			                                            iconCls: 'x-fa fa-minus',
			                                            margin:'0 0 0 5',
			                                            width : 80,
			                                            text: 'Delete',
			                                            listeners: {
		                                            		click: 'onDelete'
		                                                }
			                                        }
			                                    ]
			                                },{
			                                    xtype: 'grid',
			                                    flex: 1,
			                                    margin: '5 0 0 0',
			                                    reference: 'refAllocationCargoInfoGrid',
			                    	    		bind: {
			                    	    			store: '{allocatedCargoAmount}'
			                    	    		},
			                    	    		listeners:{
			                    	    			cellClick:'onAllocationGridCellClick'
			                    	    		},
			                                    columns: [
			                                        {
			                                            dataIndex: 'locId',
			                                            header: 'Cell',
			                                            width: 100
			                                        },
			                                        {
			                                            dataIndex: 'whTpCdNm',
			                                            header: 'CG.Cond',
			                                            width: 150
			                                        },
			                                        {
			                                            dataIndex: 'wgt',
			                                            header: 'MT',
			                                            width: 80
			                                        },
			                                        {
			                                            dataIndex: 'msrmt',
			                                            header: 'M3',
			                                            width: 80
			                                        },
			                                        {
			                                            dataIndex: 'pkgQty',
			                                            header: 'Qty',
			                                            width: 80
			                                        }
			                                    ]
			                                }
				                    ]
				                },{
				                    xtype: 'fieldset',
				                    flex: 0.4,
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
		                                        	header: ViewUtil.getLabel('blNo'),
		                                            dataIndex: 'blNo',
		                                            width: 80
		                                        },
		                                        {
		                                        	header: ViewUtil.getLabel('snNo'),
		                                            dataIndex: 'shipgNoteNo',
		                                            width: 150
		                                        },
		                                        {
		                                        	header: ViewUtil.getLabel('lotNo'),
		                                            dataIndex: 'lotNo',
		                                            width: 80
		                                        },
		                                    	{
		                                        	header: ViewUtil.getLabel('cargoNo'),
		                                            dataIndex: 'cgNo',
		                                            width: 100
		                                        },
		                                        {
		                                        	header: ViewUtil.getLabel('packageTp'),
		                                            dataIndex: 'pkgTpNm',
		                                            width: 80
		                                        },
		                                        {
		                                        	header: ViewUtil.getLabel('cgCondition'),
		                                            dataIndex: 'whTpCdNm',
		                                            width: 100
		                                        },
		                                        {
		                                        	header: ViewUtil.getLabel('mT'),
		                                            dataIndex: 'wgt',
		                                            width: 80
		                                        },
		                                        {
		                                        	header: ViewUtil.getLabel('m3'),
		                                            dataIndex: 'msrmt',
		                                            width: 80
		                                        },
		                                        {
		                                        	header: ViewUtil.getLabel('gatePassListQty'),
		                                            dataIndex: 'pkgQty',
		                                            width: 80
		                                        }
		                                    ],
		                                    listeners:{
		                                    	cellClick:'onCargoInfoCellClick'
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
	                    	handler: 'onDisplayPlannedOccupyInfor'
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
//    ,
//
//	afterRender : function(){
//		var me = this;
//		var ref = me.up().up().getController().getReferences().refWarehouseLayoutView;
//		ref.getScrollable().on("scroll", me.up().up().getController().onScroll, me.up().up().getController());
//		ref.on("resize", me.up().up().getController().onResize, me.up().up().getController());
//
//		me.callParent(arguments);
//	}
	
});