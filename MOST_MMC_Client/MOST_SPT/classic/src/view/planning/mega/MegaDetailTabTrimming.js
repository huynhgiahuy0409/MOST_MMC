Ext.define('MOST.view.planning.megadetail.MegaDetailTabTrimming', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-megadetailtabtrimming',
	
	requires: [
	],
	
	flex:1,
	
	layout : {type  : 'hbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			margin: '0 0 5 5',
			items: [
				{
		            xtype: 'container',
					width: '100%',
		            flex: 1,
		            margin: '25 0 0 5',
		            defaults: {
		                margin: '5 0 0 5',
		                labelAlign: 'right',
		                labelWidth: 120,
						width: '100%',
		            },
		            layout: {
		                type: 'vbox'
		            },
		            items: [
						{
							xtype: 'container',
							defaults: {
								margin: '0 0 0 5',
								labelAlign: 'right',
								labelWidth: 120
							},
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'partnercdfield', 
									flex: 1,
									bind: { value: '{theTrimming.trmgComp}' },
									reference: 'ctlDetailMegaStedoreTrimmingCompany',
									fieldLabel: ViewUtil.getLabel('trimmingCompany'),
									params: {
										ptnrType: CodeConstants.MT_PTNRTP_TRM
									}
								}
							]
						},
						{
							xtype: 'container',
							defaults: {
								margin: '0 0 0 5',
								labelAlign: 'right',
								labelWidth: 120
							},
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'workingareamultifield',
									reference: 'ctlTrimmingWorkingArea',
									flex: 1,
									fieldLabel: ViewUtil.getLabel('workingArea'),
									bind: {
										value: '{theTrimming.locId}'
									}
								}
							]
						},
						{
							xtype: 'container',
							width: '100%',
							defaults: {
								margin: '0 0 0 5',
								labelAlign: 'right',
								labelWidth: 120
							},
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 23,
									selectOnFocus: true,
									flex: 2,
									reference: 'ctlTrimReqHh',
									fieldLabel: ViewUtil.getLabel('reqTime'),
									bind: '{theTrimming.reqTime}'
								},
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 59,
									selectOnFocus: true,
									flex: 1,
									bind: '{theTrimming.reqMin}'
								}
							]
						},
						{
							xtype: 'container', 
							defaults: {
								margin: '0 0 0 5',
								labelAlign: 'right',
								labelWidth: 120
							},
							layout: {
								type: 'hbox'
							},
							items: [
								{
									xtype: 'numberfield',
									width: '100%',
									minValue: 0,
									maxValue: 999999999,
									fieldLabel: ViewUtil.getLabel('nosofHatch'),
									bind: '{theTrimming.nofHatch}',
									reference: 'cltTrimmingNosofHatch'
								}
							]
						}
		            ]
		        },
				{
					xtype: 'container',
					flex: 1,
					defaults: {
						margin: '5 0 0 5',
						labelAlign: 'right',
						labelWidth: 120
					},
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'label',
							text: ViewUtil.getLabel('nonTonnage'),
							style: 'text-align:center;'
						},
						{
							xtype: 'container',
							defaults: {
								margin: '0 0 0 5',
								labelAlign: 'right',
								labelWidth: 120
							},
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999,
									flex: 1,
									fieldLabel: ViewUtil.getLabel('supervisor'),
									bind: '{theTrimming.nofTrmgSprr}'
								}
							]
						},
						{
							xtype: 'container',
							defaults: {
								margin: '0 0 0 5',
								labelAlign: 'right',
								labelWidth: 120
							},
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999,
									flex: 1,
									fieldLabel: ViewUtil.getLabel('signalMen'),
									bind: '{theTrimming.nofSglmn}',
									reference: 'ctlTrimmingNofSglmn'
								}
							]
						},
						{
							xtype: 'container',
							defaults: {
								margin: '0 0 0 5',
								labelAlign: 'right',
								labelWidth: 120
							},
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999,
									flex: 1,
									fieldLabel: ViewUtil.getLabel('deckMen'),
									bind: '{theTrimming.nofDekmn}',
									reference: 'ctlTrimmingNofDekmn'
								}
							]
						},
						{
							xtype: 'container',
							defaults: {
								margin: '0 0 0 5',
								labelAlign: 'right',
								labelWidth: 120
							},
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999,
									flex: 1,
									fieldLabel: ViewUtil.getLabel('hoperMen'),
									bind: '{theTrimming.nofHopmn}',
									reference: 'ctlTrimmingNofHopmn'
								}
							]
						},
						{
							xtype: 'container',
							defaults: {
								margin: '0 0 0 5',
								labelAlign: 'right',
								labelWidth: 120
							},
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'numberfield',
									minValue: 0,
									maxValue: 999999999,
									flex: 1,
									fieldLabel: ViewUtil.getLabel('generalWorkers'),
									bind: '{theTrimming.nofTrmgGwker}',
									reference: 'ctlTrimmingNofTrmgGwker'
								}
							]
						}
					]
				},
		        {
		            xtype: 'container',
		            flex: 1,
		            defaults: {
		                margin: '5 0 0 5',
		                labelAlign: 'right',
		                labelWidth: 120,
						width: '100%'
		            },
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            items: [
		                {
		                    xtype: 'label',
		                    text: ViewUtil.getLabel('summary'),
		                    style: 'text-align:center;'
		                },
		                {
		                    xtype: 'container',
		                    defaults: {
		                        margin: '0 0 0 5',
		                        labelAlign: 'right',
		                        labelWidth: 120
		                    },
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                        	xtype: 'numberfield',
		                        	minValue : 0,
		                        	maxValue: 999999999,
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('supervisor'),
		                            bind:'{theTrimming.nofTrmgSprr}',
		                            readOnly: true,
		                            reference: 'ctlTrimmingNofTrmgSprr'
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    defaults: {
		                        margin: '0 0 0 5',
		                        labelAlign: 'right',
		                        labelWidth: 120
		                    },
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                        	xtype: 'numberfield',
		                        	minValue : 0,
		                        	maxValue: 999999999,
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('nonTonnage'),
		                            bind:'{theTrimming.trmgNonTon}',
		                            readOnly:true
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