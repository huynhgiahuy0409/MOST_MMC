Ext.define('MOST.view.operation.CargoMovement', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-cargomovement',
	
	requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width:900,
	height: 560,
	scrollable: true,
	
	controller: 'cargomovement',
	
	viewModel: {
		type: 'cargomovement'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	defaults: {
        padding: '5 0 5 0',
        margin: '0 5 5 5',
        layout: {
            type: 'hbox',
            align: 'stretch'
        }
    },
    
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [
				{
		            xtype: 'fieldset',
		            margin: '5 5 5 5',
		            defaults: {
		                margin: '0 5 0 5',
		                labelAlign: 'right',
		                labelWidth: 100
		            },
		            layout: {
		                type: 'hbox',
		                align: 'stretch'
		            },
		            items: [
		                {
		                    xtype: 'textfield',
		                    reference: 'ctlBlGr',
		                    flex: 2,
		                    fieldLabel: ViewUtil.getLabel('confirmMovementGrBl'),
		                    bind:'{theDetail.cgNo}'
		                },
		                {
		                    xtype: 'container',
		                    flex: 4
		                }
		            ]
		        },
		        {
		            xtype: 'fieldset',
		            margin: '5 5 5 5',
		            defaults: {
		                margin: '0 5 0 5',
		                labelAlign: 'right',
		                labelWidth: 100
		            },
		            layout: {
		                type: 'hbox',
		                align: 'stretch'
		            },
		            items: [
		            	{
                            xtype: 'datetimefield',
                            reference: 'refConfirmMovementPopupMoveDateTime',
                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
					        fieldLabel: ViewUtil.getLabel('confirmMovementMvDateTime'),
	    					listeners: {
	    						select: 'onDateChange'
	    					},
	    					flex: 1
                        },
                        {
                            xtype: 'textfield',
                            reference: 'refShift',
                            hidden: true,
                            readOnly:true,
                            fieldLabel: ViewUtil.getLabel('confirmMovementShift'),
    		                labelWidth: 50,
                            bind:'{theDetail.shftNm}',
                            flex: 1.2
                        },
//                        {
//							xtype: 'textfield',
//							flex: 1,
//							fieldLabel: ViewUtil.getLabel('yardTruck'),
//							reference: 'refYardTruck',
//							editable: false,
//							bind:{
//		                    	value : '{theDetail.lorryNo}'
//		                    },
//		                    triggers:{
//    							someField: {
//			                        cls: 'fa-search',
//			                        scope: 'controller',
//			                        handler: 'openAssignmentYardTruckPopup'
//			                    }
//    						}
//                        }
                        {
    	   					xtype:'truckfield',
    	   					flex:1,
    	   					fieldLabel: ViewUtil.getLabel('yardTruck'),
    	   					reference:'refYardTruck',
    	   					bind :{ 
    	   						value: '{theDetail.lorryNo}',
    	   						vslCallId: '{theDetail.vslCallId}',
    	   						shipgNoteNo: '{theDetail.shipgNoteNo}',
    	   						blNo: '{theDetail.blNo}',
    	   						lorryNo: '{theDetail.lorryNo}',
    	   						searchDivCd : 'YT',
    	   						isAutoLoad: 'true'
    	   					}
                        },
		            ]
		        },
		        {
		            xtype: 'fieldset',
		            defaults: {
		                margin: '0 5 0 5',
		                labelAlign: 'right',
		                defaults: {
		                    margin: '0 5 5 0',
		                    labelAlign: 'right',
		                    labelWidth: 100,
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    }
		                }
		            },
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            items: [
		                {
		                    xtype: 'container',
		                    flex: 1,
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            reference: 'ctlFromLocation',
		                            readOnly:true,
		                            flex: 2.5,
		                            fieldLabel: ViewUtil.getLabel('confirmMovementFromLocation'),
		                            bind:'{theDetail.fmLocId}'
		                        },
		                        {
		                            xtype: 'label',
		                            flex: 1,
		                            margin: '5 5 0 0',
		                            style: {
		                                'text-align': 'center'
		                            },
		                            text: 'MT'
		                        },
		                        {
		                            xtype: 'label',
		                            flex: 1,
		                            margin: '5 5 0 0',
		                            style: {
		                                'text-align': 'center'
		                            },
		                            text: 'M3'
		                        },
		                        {
		                            xtype: 'label',
		                            flex: 1,
		                            margin: '5 5 0 0',
		                            style: {
		                                'text-align': 'center'
		                            },
		                            text: 'Qty'
		                        },
		                        {
		                            xtype: 'container',
		                            flex: 5
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            reference: 'ctlToLocation',
		                            readOnly:true,
		                            flex: 2.5,
		                            fieldLabel: ViewUtil.getLabel('confirmMovementToLocation'),
		                            bind:'{theDetail.toLocId}'
		                        },
		                        {
		                        	xtype : 'numberfield',
		                        	reference: 'ctlMovementWgt',
		                            readOnly:true,
		                            flex: 1,
		                            bind:'{theDetail.wgt}'
		                        },
		                        {
		                        	xtype : 'numberfield',
		                        	reference: 'ctlMovementWgtMsrmt',
		                            readOnly:true,
		                            flex: 1,
		                            bind:'{theDetail.msrmt}'
		                        },
		                        {
		                        	xtype : 'numberfield',
		                        	reference: 'ctlMovementWgtMsrmtPkgQty',
		                            readOnly:true,
		                            flex: 1,
		                            bind:'{theDetail.pkgQty}'
		                        },
		                        {
		                            xtype: 'button',
		                            flex: 2,
		                            text: ViewUtil.getLabel('confirmMovementSetLocation'),
			                        listeners: {
										click: {
											fn : 'onWarehouseAllocation',
											args : ['ctlFromLocation','ctlToLocation']
										}
									}		                        
		                        },
		                        {
		                            xtype: 'container',
		                            flex: 3
		                        }
		                    ]
		                }
		            ]
		        },
		        {
		            xtype: 'container',
		            flex: 1,
		            marging: '5 5 0 5',
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            items:[
		            	{
							xtype: 'grid',
							reference: 'refConfirmMovementGrid',
							flex : 1,
							stateful : true,
							stateId : 'stateConfirmMovementGrid',
							plugins: [
								'gridexporter',
								'gridfilters',
								'clipboard'
				    		],
				    		bind: {
				    			store: '{confirmMovementList}'
				    		},
				    		selModel: {
								type: 'spreadsheet',
								cellSelect: false
							},
							columns: {
				            	defaults: {
				            		style : 'text-align:center',
				            		align : 'center'
				            	},
				            	items: [
				            		{
				            			header: ViewUtil.getLabel('confirmMovementCgNo'),
				            			dataIndex: 'cgNo',
				            			reference: 'refConfirmMovementCgNo',
				            			filter: 'string',
				            			width: 110
				            		},
				            		{
				            			header: ViewUtil.getLabel('confirmMovementVslCallId'),
				            			dataIndex: 'vslCallId',
				            			reference: 'refConfirmMovementVslCallId',
				            			filter: 'string',
				            			width: 110
				            		},
				            		{
				            			header: ViewUtil.getLabel('confirmMovementFmPkgQty'),
				            			dataIndex: 'fmPkgQty',
				            			reference: 'refConfirmMovementFmPkgQty',
				            			xtype: 'numbercolumn',
			    						align : 'right',
			    						format: '0,000',
				            			width: 110
				            		},
				            		{
				            			header: ViewUtil.getLabel('confirmMovementFmWgt'),
				            			dataIndex: 'fmWgt',
				            			reference: 'refConfirmMovementFmWgt',
				            			xtype: 'numbercolumn',
			    						align : 'right',
			    						format: '0,000.000',
				            			width: 110
				            		},
				            		{
				            			header: ViewUtil.getLabel('confirmMovementFmMsrmt'),
				            			dataIndex: 'fmMsrmt',
				            			reference: 'refConfirmMovementFmMsrmt',
				            			xtype: 'numbercolumn',
			    						align : 'right',
			    						format: '0,000.000',
				            			width: 110
				            		},
				            		{
				            			header: ViewUtil.getLabel('confirmMovementFmLocId'),
				            			dataIndex: 'fmLocId',
				            			reference: 'refConfirmMovementFmLocId',
				            			filter: 'string',
				            			width: 110
				            		},
				            		{
				            			header: ViewUtil.getLabel('confirmMovementPkgQty'),
				            			dataIndex: 'pkgQty',
				            			reference: 'refConfirmMovementPkgQty',
				            			xtype: 'numbercolumn',
			    						align : 'right',
			    						format: '0,000',
				            			width: 110
				            		},
				            		{
				            			header: ViewUtil.getLabel('confirmMovementWgt'),
				            			dataIndex: 'wgt',
				            			reference: 'refConfirmMovementWgt',
				            			xtype: 'numbercolumn',
			    						align : 'right',
			    						format: '0,000.000',
				            			width: 110
				            		},
				            		{
				            			header: ViewUtil.getLabel('confirmMovementMsrmt'),
				            			dataIndex: 'msrmt',
				            			reference: 'refConfirmMovementMsrmt',
				            			xtype: 'numbercolumn',
			    						align : 'right',
			    						format: '0,000.000',
				            			width: 110
				            		},
				            		{
				            			header: ViewUtil.getLabel('confirmMovementToLocId'),
				            			dataIndex: 'toLocId',
				            			reference: 'refConfirmMovementToLocId',
				            			filter: 'string',
				            			width: 110
				            		}
				            	]
							}
					    }
		            ]
		        }
			],
		    
		    dockedItems: [
		    	
		    ]
		});
		
		me.callParent();
	}
});