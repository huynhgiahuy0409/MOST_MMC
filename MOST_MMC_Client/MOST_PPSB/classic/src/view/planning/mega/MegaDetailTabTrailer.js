Ext.define('MOST.view.planning.megadetail.MegaDetailTabTrailer', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-megadetailtabtrailer',
	
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
						margin: '5 5 5 0',
						padding: '10 10 10 10',
						items: [
							{
								xtype: 'container',
								flex: 6.5,
								layout: {
									type: 'vbox'
								},
								padding: '0 5 0 0',
								items: [
									{
										xtype: 'container',
										layout: {
											type: 'hbox',
											align: 'stretch'
										},
										defaults: {
											margin: '0 0 5 0',
										},
										width: '100%',
										items: [
											{
												xtype: 'combobox',
												reference: 'cboCapacityTrailer',
												fieldLabel: ViewUtil.getLabel('trailerEquipment'),
												queryMode: 'local',
												emptyText: '--Select--',
												editable: true,
												forceSelection: true,
												bind: {
													store: '{megaDetailTrailerCapacityCombo}'
												},
												displayField: 'capaDesc',
												valueField: 'capaCd',
												filter: 'string',
												matchFieldWidth: true,
												getDisplayValue: function () {
													return Ext.String.htmlDecode(this.displayTpl.apply(this.displayTplData))
												},
												labelWidth: 100, 
												width: '100%',
												labelAlign: 'right',
											},
										]
									},
									{
										xtype: 'container',
										width: '100%',
										layout: {
											type: 'hbox',
											align: 'stretch'
										},
										defaults: {
											margin: '0 0 5 0',
										},
										items: [
											{
												xtype: 'textfield',
												align: 'left',
												reference: 'ctlWorkingAreaTrailer',
												fieldLabel: ViewUtil.getLabel('workingArea'),
												labelWidth: 100,
												width: '50%',
												editable: true,
												labelAlign: 'right',
												matchFieldWidth: true,
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
												align: 'right',
												value: 1,
												placeholder: 0,
												minValue: 0,
												maxValue: 999999,
												reference: 'confQtyFieldTrailer',
												fieldLabel: ViewUtil.getLabel('confirmQty'),
												labelWidth: 100,
												width: '50%',
												labelAlign: 'right',
												listeners: {
													blur: function () {
														var me = this;
														if (this.getValue() === null || this.getValue() === '') {
															this.setValue(0);
														}
													}
												}
											},
											{
												xtype: 'numberfield',
												align: 'right',
												value: 1,
												placeholder: 0,
												minValue: 0,
												maxValue: 999999,
												reference: 'reqQtyFieldTrailer',
												fieldLabel: ViewUtil.getLabel('requestQty'),
												labelWidth: 100,
												width: '50%',
												labelAlign: 'right', 
												listeners: {
													blur: function () {
														var me = this;
														if (this.getValue() === null || this.getValue() === '') {
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
										margin: '0 0 0 0',
										width: '100%',
										items: [
											{
												xtype: 'container',
												flex: 1,
												layout: {
													type: 'hbox'
												},
												defaults: {
													margin: '0 0 0 0',
													labelWidth: 100,
													labelAlign: 'right',
													width: '50%',
												},
												reference: 'cardTimeViewForTrailer',
												items: [
													{
														xtype: 'datetimefield',
														fieldLabel: ViewUtil.getLabel('startTime'),
														reference: 'refStartTimeTrailer',
														editable: false,
														format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
													}, {
														xtype: 'datetimefield',
														fieldLabel: ViewUtil.getLabel('endTime'),
														reference: 'refEndTimeTrailer',
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
								xtype :'container',
								flex: 3.5,
								layout: {
									type: 'hbox',
									align: 'right',
									pack: 'end'
								},
								margin : '0 0 0 0',
								reference: 'cardCudBtnViewForTrailer',
								defaults:{
									width : 80,
									margin : '0 0 0 5'
								},
								items:[
									{
										xtype: 'button',
										reference:'ctlMegaDetailAddForTrailer',
										iconCls: 'x-fa fa-plus',
										text: ViewUtil.getLabel('add'),
										listeners: {
											click: 'onAddForTrailer'
										}
									},{
										xtype: 'button',
										reference:'ctlMegaDetailUpdateForTrailer',
										ui: 'update-button',
										iconCls: 'x-fa fa-plus',
										text: ViewUtil.getLabel('update'),
										listeners: {
											click: 'onGridUpdateForTrailer'
										}
									},{
										xtype: 'button',
										reference:'ctlMegaDetailDeleteForTrailer',
										ui: 'delete-button',
										iconCls: 'x-fa fa-minus',
										text: ViewUtil.getLabel('delete'),
										listeners: {
											click: 'onGridRemoveForTrailer'
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
						flex: 1,
						margin:'0 5 0 0',
						padding: '0 0 0 0',
						items:[
							{
								xtype: 'tsb-datagrid',
								reference: 'refMegaDetailTrailerGrid',
								usePagingToolbar : false,
								flex : 1,		
								margin: '0 0 0 0',
								stateful : true,
								stateId : 'stateMegaDetailTabTrailerGrid',
								plugins: [
									'gridexporter',
									'gridfilters',
									'clipboard'
								],
								bind: {
									store: '{megaDetailTrailer}'
								},
								selModel: {
									type: 'spreadsheet',
									cellSelect: false
								},
								listeners: {
									celldblclick: 'onDblClickForTrailer',
									selectionchange: 'onMasterSelectionChangeForTrailer'
								},
								columns: {
									defaults: {
										style : 'text-align:center',
										align : 'center',
										
									},
									items:GridUtil.getGridColumns('MegaDetailTrailer')
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
	            reference: 'ctlCompanyTrailer',
	            items: [
					{
						xtype:	'fieldset',
						layout: {
							type: 'vbox',
							align: 'stretch'
						},
						margin: '5 0 5 0',
						padding: '10 10 10 10',
						items:[
							{
								xtype: 'container',
								layout: {
									type: 'hbox',
									align: 'stretch'
								},
								defaults:{
									margin: '0 0 5 0',								
								},
								items:[
									{
										xtype: 'partnercdfield',
										fieldLabel: ViewUtil.getLabel('contractor'),
										reference: 'cboContractorTrailer',
										width: '100%',
										labelWidth: 90,
										labelAlign: 'right',
										params: {
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
									margin: '0 0 5 0',								
								},
								items:[{
									xtype: 'numberfield',
									minValue: 1,
									maxValue: 99999,
									reference: 'ctlNoOfTrailer',
									fieldLabel: ViewUtil.getLabel('nosofTrailer'),
									value: 1,
									placeholder: 0,
									width: '100%',
									labelWidth: 90,
									labelAlign: 'right',
									listeners: {
										blur: function () {
											var me = this;
											if (this.getValue() === null || this.getValue() === '') {
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
								margin: '0 0 0 0',	
								items:[
									{
										xtype: 'container',
										layout: {
											type: 'hbox',
											pack: 'end'
										},
										defaults:{
											margin: '0 0 0 5',								
										},
										items: [
											{
												xtype: 'button',
												reference:'ctlMegaDetailAddForTrailerCompany',
												iconCls: 'x-fa fa-plus',
												text: ViewUtil.getLabel('add'),
												listeners: {
													click: 'onAddForTrailerCompany'
												}
											},
											{
												xtype: 'button',
												reference:'ctlMegaDetailUpdateForTrailerCompany',
												ui: 'update-button',
												iconCls: 'x-fa fa-plus',
												text: ViewUtil.getLabel('update'),
												listeners: {
													click: 'onGridUpdateForTrailerCompany'
												}
											},
											{
												xtype: 'button',
												reference:'ctlMegaDetailDeleteForTrailerCompany',
												ui: 'delete-button',
												iconCls: 'x-fa fa-minus',
												text: ViewUtil.getLabel('delete'),
												listeners: {
													click: 'onGridRemoveForTrailerCompany'
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
						margin: '0 0 0 0',
						padding: '0 0 0 0',
						items:[{
							xtype: 'tsb-datagrid',
							reference: 'refMegaDetailTrailerCompanyGrid',
							usePagingToolbar : false,
							flex : 1,
							stateful : true,
							stateId : 'stateMegaDetailTabTrailerCompanyGrid',
							plugins: [
								'gridexporter',
								'gridfilters',
								'clipboard'
							],
							bind: {
								store: '{megaDetailTabTrailerCompany}'
							},
							selModel: {
								type: 'spreadsheet',
								cellSelect: false
							},
							listeners: {
								selectionchange: 'onCompanySelectionChangeForTrailer'
							},
							columns: {
								defaults: {
									style : 'text-align:center',
									align : 'center'
								},
								items:GridUtil.getGridColumns('MegaDetailTabTrailerCompany')
							}
						}]
					}
	            ]
	        },
	        {
	            xtype: 'container',
	            reference:'ctlDetailTrailerImage',
	            flex: 0.3,
	            defaults: {
	                margin: '5 5 5 5'
	            },
	            layout: 'auto',
	            items: [
	            	{
                        xtype: 'image',
                        src:'resources/images/mega/MegaDtl_Mechanical.gif',
                        region:'center'
                    }
	            ]
	        }
			]
		});
		
		me.callParent();
	}
});