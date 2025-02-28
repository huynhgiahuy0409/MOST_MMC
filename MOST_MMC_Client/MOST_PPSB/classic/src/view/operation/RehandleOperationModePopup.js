Ext.define('MOST.view.operation.RehandleOperationModePopup', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-rehandleoperationmodepopup',
	
	requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.field.Checkbox'
	],
	
	width: 400,
	height: 400,
	
	listeners:{
		afterrender: 'onDetailLoad'
	},
	
    defaults: {
        padding: '5 0 5 0',
        margin: '5 5 0 5',
        layout: {
            type: 'hbox',
            align: 'stretch'
        }
    },
    
	layout : {
		type  : 'vbox', 
		align : 'stretch'
	},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [
				{
		            xtype: 'fieldset',
		            defaults: {
		                margin: '0 5 0 5',
		                labelAlign: 'right',
		                labelWidth: 120
		            },
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            items: [
		                {
		   					reference: 'ctlRehandleOpModeRehandleMode',
		   					xtype: 'combo',
		   					fieldLabel: ViewUtil.getLabel('rehandleRehandleMode'),
		   					queryMode: 'local',
		   					bind: {
		    	    			store: '{rehandleModeCombo}',
		    	    			value: '{theDetail.rhdlMode}'
		    	    		},
		   					displayField: 'scdNm',
		   					valueField: 'scd',
		   					forceSelection: true,
		   					emptyText:'Selected',
		   					editable: false,
        					listeners: {
        						change: 'onChangeRehandleMode'
        					}
		   				}
		            ]
		        },
		        {
		            xtype: 'fieldset',
		            defaults: {
		                margin: '5 5 0 5',
		                labelAlign: 'right',
		                labelWidth: 120,
						with: 220,
		            },
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            items: [
		                {
		                	xtype:'vesselcalllistfield',
		                	reference:'ctlRehandleOpModeNextJpvc',
		                    margin: '0 5 0 5',
		                    fieldLabel: ViewUtil.getLabel('rehandleNextVessel'),
		                    //editableControl: false,
		                    bind:{
		                    	value : '{theDetail.nxVslCallId}'
		                    },
							allowSetVessel: false,
		                },
						{
							xtype: 'container',
							defaults: {
								labelAlign: 'right',
							},
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'checkboxfield',
									reference: 'refCbxAutoGeneration',
			                        checked: false,
									margin: '0 0 0 50',
									listeners: {
										change: 'onCbNxtSNChange'
									}
								},
								{
									xtype: 'combobox',
									reference:'ctlTxtRehandleOpModeSNNo',
									fieldLabel: ViewUtil.getLabel('rehandleNextSn'),
									queryMode: 'local',
									bind: {
										store: '{snBlCombo}',
										value: '{theDetail.nxRefNo}'
									},
									flex: 1,
									editable: false,
									labelWidth: 51,
									with: 220,
									displayField: 'shipgNoteNo',
		   							valueField: 'shipgNoteNo',
									listeners: {
										select: 'onChangeNxRefNo'
									}
								},
							]
						},
						{
		                    xtype: 'textfield',
		                    reference:'ctlTxtRehandleOpModeBkNo',
		                    fieldLabel: ViewUtil.getLabel('bookingNo'),
		   					queryMode: 'local',
		   					bind: {
		    	    			value: '{theDetail.bookingNo}'
		    	    		},
		                },
		                {
		                    xtype: 'combo',
							hidden: true, //========================================================================================
		                    reference:'ctlRehandleOpModeSnNoCombo',
		                    fieldLabel: ViewUtil.getLabel('rehandleNextSn'),
		   					queryMode: 'local',
		   					bind: {
		    	    			store: '{rehandleOpModeNextSnNoCombo}',
		    	    			value: '{theDetail.nxRefNo}'
		    	    		},
		    	    		emptyText:'Select',
		   					displayField: 'shipgNoteNo',
		   					valueField: 'shipgNoteNo',
		   					forceSelection:true,
        					listeners: {
        						change: 'onOpModeNextSnChange'
        					}
		                },
		                {
		                    xtype: 'combobox',
							hidden: true, //========================================================================================
		                    reference:'ctlRehandleOpModeGrNoCombo',
		                    fieldLabel: ViewUtil.getLabel('rehandleNextGrNo'),
		                    readOnly:true,
		   					queryMode: 'local',
		   					bind: {
		    	    			store: '{rehandleOpModeNextGrNoCombo}',
		    	    			value: '{theDetail.nxCgNo}'
		    	    		},
		    	    		emptyText:'Select',
		   					displayField: 'nxCgNo',
		   					valueField: 'nxCgNo',
		   					forceSelection:true
		                },
		                {
				            xtype: 'fieldset',
				            defaults: {
				                margin: '5 5 0 5',
				                labelAlign: 'right',
				                labelWidth: 120,
								with: 220,
				            },
				            layout: {
				                type: 'hbox',
				                align: 'stretch'
				            },
				            items: [				            	
				            	{
				            		xtype: 'textfield',
				            		reference: 'ctlRehandleLocId',
				            		flex: 1,
				            		bind: '{theDetail.locId}',
				            		enforceMaxLength: true,
				            		fieldStyle: 'text-transform:uppercase',
				            		listeners: {
				            			change: 'onUpperCase'
				            		},
				            		editable: false,
				            	},
				            	{
				            		xtype: 'button',
				            		reference: 'ctlRehandleWhAllocation',
				            		flex: 1,
				            		text: ViewUtil.getLabel('confirmLoadingWhAllocation'),
				            		bind: { disabled: '{spareCargoCheck}' },
				            		listeners: {
				            			click: {
				            				fn: 'onWarehouseAllocation',
				            				args: ['ctlRehandleWhAllocation']
				            			}
				            		}
				            	}
				            ]
				          },
		            ]
		        },
		        {
		            xtype: 'fieldset',
		            margin: '5 5 5 5',
					flex: 1,					
					title: 'RHD Amount',
		            defaults: {
		                margin: '5 5 0 5',
		                labelAlign: 'right',
		                labelWidth: 120
		            },
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            items: [
		                {
		                    xtype: 'container',
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch',
		                        pack: 'end'
		                    },
		                    items: [
		                        {
		                            xtype: 'checkboxfield',
		                            reference: 'ctlRehandleOpModePartialOperation',
		                            boxLabel: ViewUtil.getLabel('rehandlePartialOperation'),
		                            margin: '0 5 0 5',
		                            readOnly: true,
		                            hidden: true
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container',
							margin: '2 2 2 2',
							border: 1,
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
							defaults:{
								margin: '2 2 2 2',
								padding: '0 0 10 0',
							},
		                    items: [
		                        {
		                            xtype: 'container',
		                            flex: 1,
		                            padding: '0 5 0 5',
		                            defaults: {
		                                margin: '5 5 0 5',
		                                labelAlign: 'right',
		                                labelWidth: 50
		                            },
		                            layout: {
		                                type: 'vbox',
		                                align: 'stretch'
		                            },
		                            items: [
		                                {
		                                    xtype: 'numberfield',
		                                    readOnly: true,
		                                    fieldLabel: ViewUtil.getLabel('rehandleWgt'),
		                                    bind:'{theDetail.wgt}'
		                                },
		                                {
		                                    xtype: 'numberfield',
		                                    readOnly: true,
		                                    fieldLabel: ViewUtil.getLabel('rehandleMsrmt'),
		                                    bind:'{theDetail.msrmt}'
		                                },
		                                {
		                                    xtype: 'numberfield',
		                                    readOnly: true,
		                                    fieldLabel: ViewUtil.getLabel('rehandlePkgQty'),
		                                    bind:'{theDetail.pkgQty}'
		                                }
		                            ]
		                        },
		                        {
		                            xtype: 'container',
		                            flex: 1,
		                            defaults: {
		                                margin: '5 20 0 5',
		                                labelAlign: 'right',
		                                labelWidth: 50
		                            },
		                            layout: {
		                                type: 'vbox',
		                                align: 'stretch'
		                            },
		                            items: [
		                                {
		                                    xtype: 'numberfield',
		                                    readOnly: true,
		                                    fieldLabel: ViewUtil.getLabel('rehandleRhdlWgt'),
		                                    bind:'{theDetail.rhdlWgt}'
		                                },
		                                {
		                                    xtype: 'numberfield',
		                                    readOnly: true,
		                                    fieldLabel: ViewUtil.getLabel('rehandleRhdlMsrmt'),
		                                    bind:'{theDetail.rhdlMsrmt}'
		                                },
		                                {
		                                    xtype: 'numberfield',
		                                    readOnly: true,
		                                    fieldLabel: ViewUtil.getLabel('rehandleRhdlPkgQty'),
		                                    bind:'{theDetail.rhdlPkgQty}'
		                                }
		                            ]
		                        }
		                    ]
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