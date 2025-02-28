Ext.define('MOST.view.operation.warehouse.WarehouseMovement', {
	extend: 'Ext.panel.Panel',
	
	alias: 'widget.app-warehousemovement',
	
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
	
	controller: 'warehousemovement',
	
	viewModel: {
		type: 'warehousemovement'
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
			        type: 'vbox',
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
		                    xtype: 'container',
		                    margin: '0 5 0 5',
		                    layout:{
		                    	type:'hbox',
		                    	align:'left'
		                    },
		                    items:[
		                    	{
                                    xtype: 'button',
                                    ui: 'create-button',
                                    iconCls: 'fa fa-check-square-o',
                                    reference: 'btnAllocation',
                                    margin: '0 0 0 5',
                                    width : 150,
                                    text: 'Allocation',
                                    enableToggle: true,
                                	listeners: {
                                		click: 'onClickAllocation'
                                    }
                                },{
                                    xtype: 'button',
                                    ui: 'create-button',
                                    iconCls: 'x-fa fa-minus',
                                    margin:'0 0 0 5',
                                    width : 100,
                                    text: 'ToolTip',
                                    listeners: {
                                		click: 'onClickToolTip'
                                    }
                                },{
                                	xtype:'container',
                                	layout:{
                                		  type:'hbox',
                                		  pack:'end'
                                	},
                                	flex : 1,
                                	items:[
										{
											xtype: 'button',
											ui: 'create-button',
											iconCls: 'fa fa-floppy-o',
											margin: '0 0 0 20',
											width : 80,
											text: 'Ok',
											listeners: {
												click: 'onClickOk'
											}
										},{
											xtype: 'button',
											ui: 'delete-button',
											iconCls: 'x-fa fa-minus',
											margin:'0 0 0 5',
											width : 80,
											text: 'Cancel',
											listeners: {
												click: 'onCancel'
											}
										}
                                	]
                                }
		                    ]
						},{
				            xtype: 'panel',
				            height: 200,
				            layout: {
				                type: 'hbox',
				                align: 'stretch'
				            },
				            items: [,
				                {
			                    xtype: 'fieldset',
			                    flex: 0.4,
			                    margin: '0 5 0 5',
			                    padding : '5 5 5 5',
			                    title: 'Cargo Info in selected cell',
			                    layout:{
			                    	type:'vbox',
			                    	align:'stretch'
			                    },
			                    items:[{
	                                    xtype: 'container',
	                                    layout: {
	                                        type: 'hbox'
	                                    },
	                                    margin: '0 0 0 0',
	                                    defaults: {
	        		                        labelAlign: 'right',
	        		                        margin: '0 0 0 0',
	        		                        labelWidth: 100,
	        		                        width : 220
	        		                    },
	                                    items: [{
	                                            xtype: 'textfield',
	                                            reference:'refCelltoMove',
	                                            fieldLabel: 'Cell to Move'
	                                        },{
	                                            xtype: 'label',
	                                            margin: '5 0 0 5',
	                                            text: 'Amount to Move'
	                                        }
	                                    ]
	                                },{
	                                    xtype: 'grid',
	                                    reference: 'refCargoInfoGrid',
	                    	    		bind: {
	                    	    			store: '{cargoInfoInSelectedCell}'
	                    	    		},
	                    	    		flex: 1,
	    			                    selType: 'checkboxmodel',
	    		    		            selModel: {
	    									type: 'spreadsheet',
	    									mode: 'single',
											checkboxSelect: true,
	    									listeners:{
	    										select: 'onCount',
	    										deselect:'onCount'
	    									}
	    		    		            },
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
	                                            width: 70
	                                        },{
	                                        	header: 'Cell',
	                                            dataIndex: 'locId',
	                                            width: 80
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
	                                    	cellClick:'onCargoInfoCellClick'
	                                    }
	                                }]
				                },{
				                    xtype: 'fieldset',
				                    flex: 0.6,
				                    layout:{
			                    	    type:'vbox',
			                    	    align:'stretch'
			                        },
				                    margin: '0 5 0 0',
				                    padding : '5 5 5 5',
				                    title: 'Movement Cargo Amount',
				                    reference: 'refFrameCargoAmount',
				                    items:[{ xtype: 'container',
	                                    layout: {
	                                        type: 'hbox'
	                                    },
	                                    defaults: {
            		                        labelAlign: 'right',
            		                        margin: '0 0 0 0',
            		                        labelWidth: 50,
            		                        width : 150
            		                    },
	                                    items: [
	                                        {
	                                            xtype: 'numberfield',
	                                            reference:'refAllocatedMT',
												minValue: 0,
                            					maxValue: 999999999999999.999,
	                                            fieldLabel: 'MT',
	                                            decimalPrecision: 3,
												listeners: {
                                            		change: 'onChangeM3MTQtyMovement'
                                                },
	                                        },
	                                        {
	                                            xtype: 'numberfield',
	                                            reference:'refAllocatedM3',
												minValue: 0,
                            					maxValue: 999999999999999.999,
	                                            fieldLabel: 'M3',
	                                            decimalPrecision: 3,
												listeners: {
                                            		change: 'onChangeM3MTQtyMovement'
                                                },
	                                        },
	                                        {
	                                            xtype: 'numberfield',
	                                            reference:'refAllocatedQty',
	                                            fieldLabel: 'Qty',
												minValue: 0,
                            					maxValue: 999999999999999.999,
												listeners: {
                                            		change: 'onChangeM3MTQtyMovement'
                                                },

	                                        },{
	                                            xtype: 'button',
	                                            ui: 'create-button',
	                                            reference: 'btnMovementInfoUpdate',
	                                            iconCls: 'fa fa-floppy-o',
	                                            margin: '0 0 0 20',
	                                            width : 80,
	                                            text: 'Update',
                                            	listeners: {
                                            		click: 'onMovementInfoUpdate'
                                                },
                                                disabled: false
	                                        },
	                                        {
	                                            xtype: 'button',
	                                            ui: 'delete-button',
	                                            iconCls: 'x-fa fa-minus',
	                                            margin:'0 0 0 3',
	                                            width : 80,
	                                            text: 'Delete',
	                                            listeners: {
                                            		click: 'onMovementInfoDelete'
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
	                                            dataIndex: 'cgNo',
	                                            header: 'CargoNo',
	                                            width: 100
	                                        },
	                                        {
	                                            dataIndex: 'fmLocId',
	                                            header: 'From Cell',
	                                            width: 120
	                                        },
	                                        {
	                                            dataIndex: 'toLocId',
	                                            header: 'To Cell',
	                                            width: 120
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
	                                }]
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