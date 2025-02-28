Ext.define('MOST.view.planning.megadetail.MegaDetailTabForklift', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-megadetailtabforklift',
	
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	flex:1,
	layout: {type: 'hbox', align: 'stretch'},

	initComponent: function() {
		var me = this;
			
		Ext.apply(me, {
			items: [
				{
		            xtype: 'container',
		            flex: 0.7,
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            items: [
						{
							xtype: 'fieldset',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							margin: '5 5 0 0',
							padding: '10 10 10 10',
							items: [
								{
									xtype: 'container',
									flex: 7,
									padding: '0 5 0 0',
									layout: {
										type: 'vbox',
									},
									items: [
										{
											xtype: 'container',
											layout: {
												type: 'hbox'
											},
											width: '100%',
											defaults: {
												margin: '0 0 5 0',
											},
											items: [
												{
													xtype: 'combobox',
													reference: 'cboCapacityForklift',
													fieldLabel: ViewUtil.getLabel('forkliftEquipment'),
													queryMode: 'local',
													emptyText: '--Select--',
													bind: {
														store: '{megaDetailForkliftCapacityCombo}'
													},
													displayField: 'capaDesc',
													valueField: 'capaCd',
													editable: true,
													forceSelection: true,
													matchFieldWidth: true,
													getDisplayValue: function () {
														return Ext.String.htmlDecode(this.displayTpl.apply(this.displayTplData))
													},
													width: '50%',
													labelWidth: 100,
													labelAlign: 'right',
												},
												{
													xtype: 'combobox',
													reference: 'cboForkliftDriver',
													fieldLabel: ViewUtil.getLabel('forkliftDriver'),
													queryMode: 'local',
													value: 'Y',
													bind: {
														store: '{megaDetailYNCombo}'
													},
													displayField: 'comName',
													valueField: 'comCode',
													matchFieldWidth: false,
													editable: false,
													labelWidth: 100,
													labelAlign: 'right',
													width: '50%',
												}, 
											]
										},
										{
											xtype: 'container',
											layout: {
												type: 'hbox'
											},
											defaults: {
												margin: '0 0 5 0',
											},
											width: '100%',
											items: [
												{
													xtype: 'textfield',
													align: 'left',
													reference: 'ctlWorkingAreaForklift',
													fieldLabel: ViewUtil.getLabel('workingArea'),
													width: '50%',
													labelWidth: 100,
													labelAlign: 'right',
													matchFieldWidth: true,
													editable: true,
													displayField: 'cd',
													valueField: 'cd',
													emptyText: '--Select--',
													triggers: {
														someField: {
															cls: 'fa-search',
															scope: 'controller',
															handler: 'onTriggerClick'
														}
													},
													listeners: {
														change: function (field, newValue) {
															field.setValue(newValue.toUpperCase());
														}
													}
												},
												{
													xtype: 'numberfield',
													width: '50%',
													labelWidth: 100,
													align: 'right',
													value: 1,
													placeholder: 0,
													minValue: 0,
													maxValue: 999999,
													reference: 'confQtyFieldForklift',
													fieldLabel: ViewUtil.getLabel('confirmQty'),
													labelAlign: 'right',
													listeners: {
														blur: function () {
															var me = this;
															if (this.getValue() === null) {
																this.setValue(0);
															}
														}
													}
												},
												{
													xtype: 'numberfield',
													width: '50%',
													labelWidth: 100,
													align: 'right',
													value: 1,
													placeholder: 0,
													minValue: 0,
													maxValue: 999999,
													reference: 'reqQtyFieldForklift',
													fieldLabel: ViewUtil.getLabel('requestQty'),
													labelAlign: 'right',
													listeners: {
														blur: function () {
															var me = this;
															if (this.getValue() === null) {
																this.setValue(0);
															}
														}
													}
												}
											]
										},
										{
											xtype: 'container', 
											layout: {
												type: 'hbox'
											},
											width: '100%',
											items: [{
												xtype: 'container',
												flex: 1,
												layout: {
													type: 'hbox'
												},
												defaults: {
													margin: '0 0 0 0',
													labelWidth: 100,
													labelAlign: 'right',
													width: '50%'
												},
												reference: 'cardTimeViewForForklift',
												items: [
													{
														xtype: 'datetimefield',
														fieldLabel: ViewUtil.getLabel('startTime'),
														reference: 'refStartTimeForklift',
														editable: false,
														format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
													}, {
														xtype: 'datetimefield',
														fieldLabel: ViewUtil.getLabel('endTime'),
														reference: 'refEndTimeForklift',
														editable: false,
														format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
													}

												]
											},
											]
										}
									]
								},
								{ 
									xtype: 'container',
									flex: 3,
									layout: {
										type: 'hbox',
										align: 'right',
										pack: 'end'
									},
									margin: '0 0 0 0',
									reference: 'cardCudBtnViewForForklift',
									defaults: {
										margin: '0 0 0 5'
									},
									items: [
										{
											xtype: 'button',
											reference: 'ctlMegaDetailAddForForklift',
											iconCls: 'x-fa fa-plus',
											text: ViewUtil.getLabel('add'),
											listeners: {
												click: 'onAddForForklift'
											}
										}, {
											xtype: 'button',
											reference: 'ctlMegaDetailUpdateForForklift',
											ui: 'update-button',
											iconCls: 'x-fa fa-plus',
											text: ViewUtil.getLabel('update'),
											listeners: {
												click: 'onGridUpdateForForklift'
											}
										}, {
											xtype: 'button',
											reference: 'ctlMegaDetailDeleteForForklift',
											ui: 'delete-button',
											iconCls: 'x-fa fa-minus',
											text: ViewUtil.getLabel('delete'),
											listeners: {
												click: 'onGridRemoveForForklift'
											}
										}
									]

								} 
							]
						},
						{
							xtype: 'fieldset',
							layout: {
								type: 'vbox',
								align: 'stretch'						
							},
							margin: '5 5 0 0',
							padding: '0 0 0 0',
							flex: 1,
							items:[
								{
									xtype: 'tsb-datagrid',
									reference: 'refMegaDetailForkliftGrid',
									usePagingToolbar : false,
									flex : 1,
									margin: '0 0 0 0',
									stateful : true,
									stateId : 'stateMegaDetailTabForkliftGrid',
									plugins: [
										'gridexporter',
										'gridfilters',
										'clipboard'
									],
									bind: {
										store: '{megaDetailForklift}'
									},
									selModel: {
										type: 'spreadsheet',
										cellSelect: false
									},
									listeners: {
										celldblclick: 'onDblClickForForklift',
										selectionchange: 'onMasterSelectionChangeForForklift'
									},
									columns: {
										defaults: {
											style : 'text-align:center',
											align : 'center',
											
										},
										items:GridUtil.getGridColumns('MegaDetailForkLift')
									}
								}
							]
						}
		            ]
		        },
				{
		            xtype: 'container',
		            flex: 0.3,
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            reference: 'ctlCompanyForklift',
		            items: [
						{	
							xtype:	'fieldset',
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							margin: '5 0 0 0',
							padding: '10 10 10 10',
							items:[
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults:{
										margin: '0 0 0 0',								
									}, 
									items:[						
										{
											xtype: 'radiogroup',
											reference: 'ctlContractorForklift',
											cls: 'x-check-group-alt',
											listeners : {
												change: 'onContractorSelectedChangeForklift'
											},
											items: [
												{
													xtype: 'radiofield',
													boxLabel: ViewUtil.getLabel('jPB'),
													inputValue: 1,
													name: 'radioFlBtn',
													checked: 'true'
												},
												{
													xtype: 'radiofield',
													margin: '0 0 0 10',
													boxLabel: ViewUtil.getLabel('contractor'),
													name: 'radioFlBtn',
													inputValue : 2
												}
											]
										},
										{
				    	   					xtype:'partnercdfield',
				    	   					reference:'cboContractorForklift',
				    	   					flex: 1,
			        	   					params:{
			        	   						ptnrType: CodeConstants.MT_PTNRTP_CTT
			        	   					}
				    	   				}
									]
								},														
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults:{
										margin: '5 0 0 0',								
									},
									items:[
										{
											xtype: 'numberfield',
											minValue: 1,
											maxValue: 99999,
											reference: 'ctlNoOfForklift',
											fieldLabel: ViewUtil.getLabel('nosofDriver'),
											value: 1,
											placeholder: 0,
											width: '100%',
											labelWidth: 146,
											labelAlign: 'right',
											listeners: {
												blur: function () {
													var me = this;
													if (this.getValue() === null) {
														this.setValue(1);
													}
												}
											},
										}															
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									items:[
										{
											xtype: 'container',
											layout: {
												type: 'hbox',
												pack: 'end'
											},
											defaults:{
												margin: '5 0 0 5',								
											},
											items: [
												{
													xtype: 'button',
													reference:'ctlMegaDetailAddForForkliftCompany',
													iconCls: 'x-fa fa-plus',
													text: ViewUtil.getLabel('add'),
													listeners: {
														click: 'onAddForForkliftCompany'
													}
												},
												{
													xtype: 'button',
													reference:'ctlMegaDetailUpdateForForkliftCompany',
													ui: 'update-button',
													iconCls: 'x-fa fa-plus',
													text: ViewUtil.getLabel('update'),
													listeners: {
														click: 'onGridUpdateForForkliftCompany'
													}
												},
												{
													xtype: 'button',
													reference:'ctlMegaDetailDeleteForForkliftCompany',
													ui: 'delete-button',
													iconCls: 'x-fa fa-minus',
													text: ViewUtil.getLabel('delete'),
													listeners: {
														click: 'onGridRemoveForForkliftCompany'
													}
												}							
												
											]
										}
									]
								}
							]		
						},
						{
							xtype: 'fieldset',
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							flex: 1,
							margin: '5 0 0 0',
							padding: '0 0 0 0',
							items: [
								{
									xtype: 'tsb-datagrid',
									reference: 'refMegaDetailForkliftCompanyGrid',
									usePagingToolbar: false,
									flex: 1,
									margin: '0 0 0 0',
									stateful: true,
									stateId: 'stateMegaDetailTabForkliftCompanyGrid',
									plugins: [
										'gridexporter',
										'gridfilters',
										'clipboard'
									],
									bind: {
										store: '{megaDetailTabForkliftCompany}'
									},
									selModel: {
										type: 'spreadsheet',
										cellSelect: false
									},
									listeners: {
										selectionchange: 'onCompanySelectionChangeForForklift'
									},
									columns: {
										defaults: {
											style: 'text-align:center',
											align: 'center'
										},
										items: GridUtil.getGridColumns('MegaDetailTabForkliftCompany')
									}
								}
							]
						}
		            ]
		        },
				{
					xtype: 'container',
					reference: 'ctlDetailForkliftImage',
					flex: 0.3,
					defaults: {
						margin: '5 5 5 5'
					},
					layout: 'auto',
					items: [
						{
							xtype: 'image',
							src: 'resources/images/mega/MegaDtl_Forklift.gif',
							region: 'center'
						}
					]
				}
			]
		});
		
		me.callParent();
	}
});