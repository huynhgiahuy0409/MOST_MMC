Ext.define('MOST.view.operation.RehandleOperationForUpdatePopup', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-rehandleoperationforupdatepopup',
	
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
		afterrender: 'onDetailLoadForUpdate'
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
		   					disabled: true
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
		                	xtype:'textfield',
		                	reference:'ctlRehandleOpModeNextJpvc',
		                    margin: '0 5 0 5',
		                    fieldLabel: ViewUtil.getLabel('rehandleNextVessel'),
		                    readOnly: true,
		                    bind:{
		                    	value : '{theDetail.nxVslCallId}'
		                    }
		                },
						{
		                    xtype: 'textfield',
		                    reference:'ctlTxtRehandleOpModeSNNo',
		                    fieldLabel: ViewUtil.getLabel('rehandleNextSn'),
		   					queryMode: 'local',
		   					bind: {
		    	    			value: '{theDetail.nxRefNo}'
		    	    		},
		    	    		readOnly: true
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
		            reference: 'ctlWhLocationFieldSet',
		            layout: {
		                type: 'hbox',
		                align: 'stretch'
		            },
		            items: [				            	
		            	{
		            		xtype: 'textfield',
		            		reference: 'ctlRehandleLocIdForUpdate',
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
		            		reference: 'ctlRehandleWhAllocationForUpdate',
		            		flex: 1,
		            		text: ViewUtil.getLabel('confirmLoadingWhAllocation'),
		            		bind: { disabled: '{spareCargoCheck}' },
		            		listeners: {
		            			click: {
		            				fn: 'onWarehouseAllocation',
		            				args: ['ctlRehandleWhAllocationForUpdate']
		            			}
		            		}
		            	}
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
		                                    fieldLabel: ViewUtil.getLabel('actMt'),
		                                    bind:'{theDetail.actMt}'
		                                },
		                                {
		                                    xtype: 'numberfield',
		                                    readOnly: true,
		                                    fieldLabel: ViewUtil.getLabel('actM3'),
		                                    bind:'{theDetail.actM3}'
		                                },
		                                {
		                                    xtype: 'numberfield',
		                                    readOnly: true,
		                                    fieldLabel: ViewUtil.getLabel('actQty'),
		                                    bind:'{theDetail.actQty}'
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
		                                    readOnly: false,
		                                    fieldLabel: ViewUtil.getLabel('rehandleRhdlWgt'),
		                                    bind:'{theDetail.rhdlWgt}',
		                                    decimalPrecision: 3,
		                                    reference:'refsRhdlMt'
		                                },
		                                {
		                                    xtype: 'numberfield',
		                                    readOnly: false,
		                                    fieldLabel: ViewUtil.getLabel('rehandleRhdlMsrmt'),
		                                    bind:'{theDetail.rhdlMsrmt}',
		                                    decimalPrecision: 3,
		                                    reference:'refsRhdlM3',
		                                },
		                                {
		                                    xtype: 'numberfield',
		                                    readOnly: false,
		                                    reference:'refsRhdlQty',
		                                    fieldLabel: ViewUtil.getLabel('rehandleRhdlPkgQty'),
		                                    bind:'{theDetail.rhdlPkgQty}',
		                                    decimalPrecision: 0,
//		                                    listeners: {
//		                                        change: 'onChangeQtyForUpdate'
//		                                    }
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