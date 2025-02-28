Ext.define('MOST.view.operation.VORLiquidBulkDetail', {
    extend: 'Ext.form.Panel',
    alias: 'widget.app-vorliquidbulkdetail',

    requires: [
    ],
    
	width: 1300,
	height: 720,
	
	listeners:{
		afterrender: 'onDetailLoad'
	},

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
	initComponent: function() {
		var me = this;
		Ext.apply(this, {
			xtype:'container',
			defaults:{
				type: 'vbox',
				align: 'stretch'
			},
            items: [      {
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'fieldset',
                        margin: '5 5 5 5',
                        layout: {
                            type: 'vbox'
                        },
                        defaults:{
                        	margin: '2 0 0 0',
                        	labelWidth: 80,
                        	labelAlign: 'right',
                        	width: 250
                        },
                        items: [
                        	 {
								xtype:'textfield',
								reference: 'refVslCallId',
								fieldLabel: ViewUtil.getLabel('vslcallid'),
								bind: '{theVessel.vslCallId}',
								readOnly : true,
								emptyText: ViewUtil.getLabel('vslcallid')
                             },{
                             	xtype: 'datefield',
             					reference:'refWorkYmd',
             					fieldLabel: ViewUtil.getLabel('vorDate'),
     	    			        editable:false,
                                format: MOST.config.Locale.getShortDate(),
                                listeners:{
                                	change :'setVORInitializeInfo'
                                }
                             },{
                             	xtype:'combo',
             					reference:'refShift',
             					fieldLabel: ViewUtil.getLabel('vorShift'),
                                bind: {
                 	    			store: '{shiftCombo}'
                 	    		},
                 	    		displayField: 'shftNm',
              					valueField: 'shftId',
               					queryMode: 'local',
               					emptyText: 'Select',
               					value : '',
               					listeners:{
                                	change :'setVORInitializeInfo'
                                }
                             }
                        ]
                    },{
                        xtype: 'fieldset',
                        margin: '5 5 5 0',
                        flex : 1,
                        layout: {
                            type: 'vbox'
                        },
                        items: [
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'hbox'
                                },
                                defaults:{
                                	margin: '2 0 0 0',
                                	labelWidth: 80,
                                	labelAlign: 'right',
                                	width: 220
                                },
                                items: [
                                	{
                                        xtype: 'textfield',
                                        fieldLabel: ViewUtil.getLabel('vesselCode'),
                                        bind: '{theVessel.vslCd}',
                                        readOnly : true
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: ViewUtil.getLabel('SNLASA'),
                                        bind: '{theVessel.arrvSaId}',
                                        readOnly : true
                                    },
                                    {
                                        xtype: 'textfield',
                                        labelWidth: 100,
                                        fieldLabel: ViewUtil.getLabel('berthingLoc'),
                                        bind: '{theVessel.berthLoc}',
                                        readOnly : true,
                                        margin: '2 0 0 20'
                                    }
                                    
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'hbox'
                                },
                                defaults:{
                                	margin: '2 0 0 0',
                                	labelWidth: 80,
                                	labelAlign: 'right',
                                	width: 220
                                },
                                items: [
                                	{
                                        xtype: 'textfield',
                                        fieldLabel: ViewUtil.getLabel('vesselName'),
                                        bind: '{theVessel.vslNm}',
                                        readOnly : true
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: ViewUtil.getLabel('eta'),
                                        bind: '{theVessel.eta}',
                                        readOnly : true,
        	                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
                                    },
                                    {
                                        xtype: 'textfield',
                                        labelWidth: 100,
                                        fieldLabel: ViewUtil.getLabel('scn'),
                                        bind: '{theVessel.scn}',
                                        readOnly : true,
                                        margin: '2 0 0 20'
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'hbox'
                                },
                                defaults:{
                                	margin: '2 0 0 0',
                                	labelWidth: 80,
                                	labelAlign: 'right',
                                	width: 220
                                },
                                items: [
                                	{
                                    	xtype:'textfield',
                    					fieldLabel: ViewUtil.getLabel('voyage'),
                    					readOnly : true,
                    					name: 'inbVoy',
                    					width : 147,
                    					bind: '{theVessel.inbVoy}'
                                    },
                                    {
                                    	xtype:'textfield',
                                    	readOnly : true,
                    					name: 'outbVoy',
                    					margin : '2 0 0 5',
                    					width : 68,
                    					bind: '{theVessel.outbVoy}'
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: ViewUtil.getLabel('etd'),
                                        bind: '{theVessel.etd}',
                                        readOnly : true,
                                        format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
                                    },
                                    {
                                        xtype: 'textfield',
                                        labelWidth: 100,
                                        fieldLabel: ViewUtil.getLabel('operationType'),
                                        bind: '{theVessel.purpCall}',
                                        readOnly : true,
                                        margin: '2 0 0 20'
                                    }
                                ]
                            }
                        ]
                    }]
            	},{
                    xtype: 'tabpanel',
                    flex: 1,
                    margin: '0 5 5 5',
                    items: [
                    {
                    	xtype:'panel',
                    	xtype: 'app-berthAndOperationInfoDetail',
                    	title: ViewUtil.getLabel('berthAndOperationInfo'),
                    	reference: 'refBerthAndOperationInfoDetail',
                    	flex: 1
                    },{
                    	
	                	xtype:'panel',
	                	layout: 'fit',
	                	title: ViewUtil.getLabel('vorCargoSummary'),
	                	items : [{
							xtype: 'app-cargoSummary',
				    		reference: 'refCargoSummary'
						}]	                            	
                    },
                    {
	                	xtype:'panel',
	                	layout: 'fit',
	                	title: ViewUtil.getLabel('vorDelaySummary'),
	                	items : [{
							xtype: 'app-delaySummary',
				    		reference: 'refDelaySummary',
                        	flex: 1
						}]	                            	
                    }
                    ]
    			}
            ]
		});
		
		me.callParent();
	}
});