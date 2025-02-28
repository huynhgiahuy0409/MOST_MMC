Ext.define('MOST.view.operation.vorliquidbulk.BerthAndOperationInfoDetail', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-berthAndOperationInfoDetail',
	
	requires: [
	],
	
	layout : {type  : 'vbox', align : 'stretch'},
	
	initComponent: function() {
		var me = this;
			
		Ext.apply(me, {
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
                            xtype: 'fieldset',
                            title: ViewUtil.getLabel('vorVesselSchedule'),
                            margin: '5 5 5 5',
                            layout: {
                                type: 'vbox',
                                margin: '0 0 5 0',
                                align: 'stretch'
                            },
                            defaults:{
                            	width: 230,
                            	labelWidth : 80,
                            	labelAlign : 'right',
                            	margin: '5 5 0 0',
                            },
                            items: [
                            	{
		                            xtype: 'datetimefield',
		                            fieldLabel: ViewUtil.getLabel('eta'),
		                            name: 'eta',
									bind: '{theBerthing.eta}',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									editable : false,
									readOnly: true
		                        },{
		                            xtype: 'datetimefield',
		                            fieldLabel: ViewUtil.getLabel('etw'),
		                            name: 'etw',
									bind: '{theBerthing.etw}',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									editable : false,
									readOnly: true
		                        },{
		                            xtype: 'datetimefield',
		                            fieldLabel: ViewUtil.getLabel('ata'),
		                            name: 'ata',
									bind: '{theBerthing.ata}',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									editable : false,
									readOnly: true
		                        },{
		                            xtype: 'datetimefield',
		                            reference :'refAtb',
		                            fieldLabel: ViewUtil.getLabel('atb'),
		                            name: 'atb',
									bind: '{theBerthing.atb}',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									editable : false,
									readOnly: true
		                        },{
	                            	xtype:'datetimefield',
	            					editable:false,
	            					readOnly: true,
	            					fieldLabel: ViewUtil.getLabel('atu'),
	            					reference :'refAtu',
	            					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
	            					name: 'atu',
	            					bind: '{theBerthing.atu}'
	                            },{
	                            	xtype:'textfield',
	            					editable:false,
	            					fieldLabel: ViewUtil.getLabel('vorLastPortCall'),
	            					name: 'lastCallPort',
	            					bind: '{theVessel.portCd}'
	                            }
                            ]
                        },{
                            xtype: 'fieldset',
                            title : 'Vessel Operation',
                            flex : 1,
                            margin: '5 5 5 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox'
                                    },
                                    margin: '0 0 5 0',
                                    defaults:{
                						margin: '5 5 0 5',
                						labelAlign: 'right'
                					},
                                    items: [
                                      	{
        		                            xtype: 'textfield',
        		                            width: 330,
        		                            fieldLabel: ViewUtil.getLabel('atw'),
        		                            name: 'atw',
        									bind: '{theBerthing.atw}',
        									editable : false,
        									labelWidth: 140
        		                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('vorTotalLineForLoading'),
                                            width: 330,
//                                            bind: '{theVessel.arrvSaId}',
                                            readOnly : true,
                                            labelWidth: 230
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ViewUtil.getLabel('vorTotalLineForDischarging'),
                                            width: 330,
//                                            bind: '{theVessel.berthLoc}',
                                            readOnly : true,
                                            labelWidth: 230
                                        },
                                        {
                                            xtype: 'textfield',
                                            reference: 'refVORNoForLoading',
                                            fieldLabel: ViewUtil.getLabel('vorNoForLoading'),
                                            width: 330,
//                                            bind: '{theVessel.berthLoc}',
                                            readOnly : true,
                                            labelWidth: 230
                                        },
                                        {
                                            xtype: 'textfield',
                                            reference: 'refVORNoForDischarging',
                                            fieldLabel: ViewUtil.getLabel('vorNoForDischarging'),
//                                            bind: '{theVessel.berthLoc}',
                                            width: 330,
                                            readOnly : true,
                                            labelWidth: 230
                                        },
                                        {
                                            xtype: 'textfield',
                                            reference: 'refVORFender',
                                            fieldLabel: ViewUtil.getLabel('vorFender'),
//                                            bind: '{theVessel.berthLoc}',
                                            width: 330,
                                            readOnly : true,
                                            labelWidth: 200
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox'
                                    },
                                    margin: '0 0 5 0',
                                    defaults:{
                						margin: '5 5 0 5',
                						labelAlign: 'right'
                					},
                                    items: [
                                      	{
        		                            xtype: 'textfield',
        		                            padding: '-5 0 0 0',
        		                            width: 300,
        		                            fieldLabel: ViewUtil.getLabel('atc'),
//        									bind: '{theBerthing.atc}',
        									editable : false,
        									labelWidth: 140
        		                        },
                                        {
                                            xtype: 'textfield',
                                            padding: '-5 0 0 0',
                                            fieldLabel: ViewUtil.getLabel('vorEstimatedProductivity'),
//                                            bind: '{theVessel.scn}',
                                            readOnly : true,
                                            width: 300,
                                            labelWidth: 230
                                        },
                                        {
                                            xtype: 'textfield',
                                            padding: '-5 0 0 0',
                                            fieldLabel: ViewUtil.getLabel('vorEstimatedTimeForOperation'),
//                                            bind: '{theVessel.scn}',
                                            readOnly : true,
                                            width: 300,
                                            labelWidth: 230
                                        },
                                        {
                                            xtype: 'textfield',
                                            reference: 'refVORTerminalOperator1',
                                            padding: '-5 0 0 0',
                                            fieldLabel: ViewUtil.getLabel('vorTerminalOperator1'),
//                                            bind: '{theVessel.scn}',
                                            readOnly : true,
                                            width: 300,
                                            labelWidth: 230
                                        },
                                        {
                                            xtype: 'textfield',
                                            reference: 'refVORTerminalOperator2',
                                            padding: '-5 0 0 0',
                                            fieldLabel: ViewUtil.getLabel('vorTerminalOperator2'),
//                                            bind: '{theVessel.scn}',
                                            readOnly : true,
                                            width: 300,
                                            labelWidth: 230
                                        },
                                        {
                                            xtype: 'textfield',
                                            reference: 'refVORTerminalOperator3',
                                            padding: '-5 0 0 0',
                                            fieldLabel: ViewUtil.getLabel('vorTerminalOperator3'),
//                                            bind: '{theVessel.scn}',
                                            readOnly : true,
                                            width: 300,
                                            labelWidth: 230
                                        },
                                        {
                                            xtype: 'textfield',
                                            reference: 'refVORTerminalOperator4',
                                            padding: '-5 0 0 0',
                                            fieldLabel: ViewUtil.getLabel('vorTerminalOperator4'),
//                                            bind: '{theVessel.scn}',
                                            readOnly : true,
                                            width: 300,
                                            labelWidth: 230
                                        }
                                    ]
                                }
                            ]
                        }
		            ]
				}
				
			]
		});
		
		me.callParent();
	}
});