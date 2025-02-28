Ext.define('MOST.view.operation.vorliquidbulk.BerthAndOperationInfo', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-berthAndOperationInfo',
	
	requires: [
	],
	
	layout : {type  : 'vbox', align : 'stretch'},
	
	initComponent: function() {
		var me = this;
			
		Ext.apply(me, {
			items: [
				{
					xtype: 'container',
					layout: {
						type: 'vbox',
	                    align: 'stretch'
					},
					defaults: {
						margin: '0 0 10 0'
					},
					items: [
						// Time
						{
							xtype: 'container',
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							margin: '5 0 0 0',
							defaults: {
								margin: '5 0 0 0'// top, right, bottom, left
							},
							items: [
								{
									xtype: 'container', 
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										margin: '0 5 0 5',
										labelAlign: 'right',
										labelWidth: 60
									},
									items: [
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('eta'),
											name: 'eta',
											bind: '{theBerthing.eta}',
											editable : false
										},
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('atw'),
											name: 'atw',
											bind: '{theBerthing.atw}',
											editable : false
										},
										{
											xtype: 'container',
											flex: 3
										}
									]
								},{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										margin: '0 5 0 5',
										labelAlign: 'right',
										labelWidth: 60
									},
									items: [
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('etw'),
											name: 'etw',
											bind: '{theBerthing.etw}',
											editable : false
										},
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('atc'),
											name: 'atc',
											bind: '{theBerthing.atc}',
											editable : false
										},
										{
											xtype: 'container',
											flex: 3
										}
									]
								},{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										margin: '0 5 0 5',
										labelAlign: 'right',
										labelWidth: 60
									},
									items: [
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('ata'),
											name: 'ata',
											bind: '{theBerthing.ata}',
											editable : false
										},
										{
											xtype:'textfield',
											editable:false,
											fieldLabel: ViewUtil.getLabel('atu'),
											flex: 1,
											name: 'atu',
											bind: '{theBerthing.atu}'
										},
										{
											xtype: 'container',
											flex: 3
										}
									]
								},{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										margin: '0 5 0 5',
										labelAlign: 'right',
										labelWidth: 60
									},
									items: [
										{
											xtype: 'textfield',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('atb'),
											name: 'atb',
											bind: '{theBerthing.atb}',
											editable : false
										},
										{
											xtype:'textfield',
											editable:false,
											fieldLabel: ViewUtil.getLabel('atd'),
											flex: 1,
											name: 'atd',
											bind: '{theBerthing.atd}'
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
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							defaults: {
								margin: '0 5 0 0'// top, right, bottom, left
							},
							items: [
								{
									xtype: 'fieldset',
									title: ViewUtil.getLabel('vor_tankerSubmissionForSA'),
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {

									},
									items: [
										{
											xtype: 'container',
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											defaults: {
												padding: '0 10 0 0',
											},
											items: [
												{
													xtype: 'datetimefield',
													reference: 'ctlHoseOnSA',
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													fieldLabel: ViewUtil.getLabel('vslschlHoseOnTime'),
													flex: 1,
													readOnly: true
												},
												{
													xtype: 'datetimefield',	
													reference: 'ctlCommenceTimeSA',
													fieldLabel: ViewUtil.getLabel('vslschlCommenceTime'),
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													flex: 1,
													readOnly: true
												},
												{
													xtype: 'textfield',
													reference: 'ctlCgWgtSA',
													fieldLabel: ViewUtil.getLabel('vor_cargoMt'),
													readOnly: true
												}		
											]
										},
										{
											xtype: 'container',
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											defaults: {
												padding: '0 10 0 0',
											},
											items: [
												{
													xtype: 'datetimefield',
													reference: 'ctlHoseOffSA',
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													fieldLabel: ViewUtil.getLabel('vslschlHoseOffTime'),
													readOnly: true,
													flex: 1
												},
												{
													xtype: 'datetimefield',
													reference: 'ctlCompletionTimeSA',
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													fieldLabel: ViewUtil.getLabel('vslschlCompletionTime'),
													flex: 1,
													readOnly: true
												},
												{
													xtype: 'container',
													flex: 1
												}			
											]
										},
									]
								},
								{
									xtype: 'fieldset',
									title: ViewUtil.getLabel('vor_tankerSubmissionForOperator'),
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'container',
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											defaults: {
												padding: '0 10 0 0',
											},
											items: [
												{
													xtype: 'datetimefield',
													reference: 'ctlHoseOnOP',
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													fieldLabel: ViewUtil.getLabel('vslschlHoseOnTime'),
													bind: '{theTanker.hoseOnDt}',
													flex: 1,
													readOnly: true
												},
												{
													xtype: 'datetimefield',	
													reference: 'ctlCommenceTimeOP',
													fieldLabel: ViewUtil.getLabel('vslschlCommenceTime'),
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													bind: '{theTanker.stDt}',
													flex: 1,
													readOnly: true
												},
												{
													xtype: 'container',
													flex: 1
												}		
											]
										},
										{
											xtype: 'container',
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											defaults: {
												padding: '0 10 0 0',
											},
											items: [
												{
													xtype: 'datetimefield',
													reference: 'ctlHoseOffOP',
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													fieldLabel: ViewUtil.getLabel('vslschlHoseOffTime'),
													readOnly: true,
													bind: '{theTanker.hoseOffDt}',
													flex: 1
												},
												{
													xtype: 'datetimefield',
													reference: 'ctlCompletionTimeOP',
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													fieldLabel: ViewUtil.getLabel('vslschlCompletionTime'),
													bind: '{theTanker.endDt}',
													flex: 1,
													readOnly: true
												},		
												{
													xtype: 'container',
													flex: 1
												}		
											]
										},
									]
								},
							]
						}
						// Tanker
					]
				},
			]
		});
		
		me.callParent();
	}
});