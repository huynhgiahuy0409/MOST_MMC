Ext.define("MOST.view.operation.RORODamageCheck", {
	extend: "Ext.panel.Panel",

	alias: "widget.app-rorodamagecheck",
	requires: [
		"Ext.grid.plugin.RowEditing",
		"Ext.grid.plugin.Exporter",
		"Ext.grid.plugin.Clipboard",
		"Ext.grid.filters.Filters",
		"Ext.grid.selection.SpreadsheetModel",
	],
	width: 985,
	height: 500,

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: "refRORODamageCheckGrid",
	MAIN_STORE_NAME: "roroDamageCheckDetail",
	FILE_UPLOAD_REF_NAME : 'refRoRoFileUpload',
	FILE_UPLOAD_STORE_NAME :'uploadedRoRoFileDamageStore',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	listeners:{
		afterrender: 'onDetailLoad'
	},

	layout: { type: "vbox", align: "stretch" },
	initComponent: function () {
		var me = this;
		var rowEditing = Ext.create("Ext.grid.plugin.RowEditing", {
			clicksToEdit: 2,
			pluginId: "theListOfDamageCheckOfROROEditor",
			autoCancel: false,
			listeners: {
				cancelEdit: "onCancelEdit",
				edit: "onROROInvEdit",
			},
		});

		Ext.apply(me, {
			items: [
				{
					xtype:'container',
					flex: 1,
					layout : {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
						//DAMAGE PART
						{
							xtype: 'container',
							flex: 1,
							defaults: {
								labelAlign: 'right',
								labelWidth: 80,
								margin: '2 0 0 0',
							},
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							
							items: [
								//1.1 CARGO/ UNIT
								{
									xtype: 'container',
									//flex: 1,
									width: 400,
									defaults: {
										labelAlign: 'right',
										width: 250,
										labelWidth: 100,
										margin: '2 0 0 0',
									},
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									
									items: [
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('unitNo'),
											reference: 'ctlUnitNo',
											editable: false,
											bind: { value: '{theUnitInfo.unitNo}' },
											triggers:{
				    							someField: {
							                        cls: 'fa-search',
							                        scope: 'controller',
							                        handler: 'openUnitNoPopupDamage'
							                    }
                       	   					}
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('brand'),
											reference: 'ctlBrand',
											bind: '{theUnitInfo.brandNm}',
											fieldStyle: 'text-transform:uppercase',
											readOnly: true,
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('model'),
											reference: 'ctlModel',
											bind: '{theUnitInfo.modelNm}',
											fieldStyle: 'text-transform:uppercase',
											readOnly: true,
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('bl_sn'),
											reference: 'ctlBLSN',
											bind: '{theUnitInfo.cgNo}',
											fieldStyle: 'text-transform:uppercase',
											readOnly: true,
										},
										
										//UPLOAD
										{
											xtype: 'fieldset',
											margin: '5 0 5 0',
											defaults: {
												labelAlign: 'right',
												labelWidth: 80
											},
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											flex: 1,
											items: [
												{
						                            xtype: 'container',
						                            margin: '0 0 5 0',
						                            layout: {
						                                type: 'hbox',
						                                align: 'stretch',
						                                pack: 'end'
						                            },
						                            items: [{
						                            	xtype: 'filefield',
						                				name : 'fileUpload',
						                				itemId: 'createButton',
						                				reference: 'refBtnAddFile',
						                				id:'roroDmgFileUpload',
						                				style: 'text-align:left',
						                				method: 'POST',
						                				width:100,
						                				fileUpload: true,
						                            	enctype: 'multipart/form-data',
						                				buttonText: '',
						                		        buttonOnly: true,
						                		        multiple: true,
						                				buttonConfig: {
						                					text:  ViewUtil.getLabel('add'),
						                					iconCls: 'x-fa fa-plus' 
						                		    	},
						                		    	listeners: {
						                		    		change: 'onAddFile_clickHandler',
						                		    		afterrender:function(cmp){
						                		                cmp.fileInputEl.set({
						                		                    multiple:'multiple'
						                		                });
						                		            }
						                			    }
						                            },{
						                                xtype: 'button',
						                                reference: 'refBtnRemoveFile',
						                                ui: 'delete-button',
						                                iconCls: 'x-fa fa-minus',
						                                text: ViewUtil.getLabel('remove'),
						                                width: 100,
						            					listeners: {
						            						click: 'onRemoveFile_clickHandler'
						            					}
						                            }]
						                        },
						                        
						                        {
						                        	xtype: 'tsb-datagrid',
						                        	reference: me.FILE_UPLOAD_REF_NAME,
						                        	flex : 1,
						                        	stateful : true,
						                        	usePagingToolbar : false,
						                        	stateId : 'stateRORODamageUploadGrid',
						                        	plugins: [
						                        		'gridexporter',
						                        		'gridfilters',
						                        		'clipboard'
						                        	],
						                        	bind: {
						                        		store: '{'+me.FILE_UPLOAD_STORE_NAME+'}'
						                        	},
						                        	listeners: {
						                        		celldblclick: 'onFileDownloadDblClick'
						                        	},
						                        	selModel: {
						                        	},
						                        	columns: {
						                        		defaults: {
						                        			style : 'text-align:center',
						                        			align : 'center'
						                        		},
						                        		//items: GridUtil.getGridColumns('PermitCertificateFileList')
						                        		items: GridUtil.getGridColumns('ShippingNoteFileUpload')
						                        	}
								                }
											]
										}
									]
								},
								
								//1.2 DAMAGEPART
								{
									xtype: 'container',
									flex: 1,
									defaults: {
										labelAlign: 'right',
										labelWidth: 100,
										margin: '2 5 0 0',
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
												align: 'stretch'
											},
											items: [
												{
													xtype: 'label',
													margin: "3 0 0 25",
													text: 'Check Location',
												},
												{
													xtype: 'radiogroup',
													layout: 'hbox',
													reference: 'ctlTypeOfLocation',
													items: [
														{
															xtype: "radiofield",
															boxLabel: ViewUtil.getLabel("vessel"),
															reference: "refRadioVessel",
															name: "location_radio",
															margin: "0 0 0 23",
															inputValue: "VSL",
															checked: true,
														},
														{
															xtype: "radiofield",
															boxLabel: ViewUtil.getLabel("yards"),
															reference: "refRadioYards",
															name: "location_radio",
															margin: "0 0 0 23",
															inputValue: "YARD",
														},
														{
															xtype: "radiofield",
															boxLabel: 'Gate',
															reference: "refRadioGate",
															name: "location_radio",
															margin: "0 0 0 23",
															inputValue: "GATE",
														},
													]
												}
											]
										},
										
										{
											xtype: 'combobox',
											reference: 'ctlTheDamagePart',
											fieldLabel: ViewUtil.getLabel('theDamagePart'),
											emptyText: "Select",
											bind: {
												store: '{theDamageParts}',
											},
											queryMode: 'local',
											displayField: 'invNm',
											valueField: 'invCd',
											allowBlank: false,
										},
										{
											xtype: 'combobox',
											reference: 'ctlTheDamageLevel',
											fieldLabel: ViewUtil.getLabel('theDamageLevel'),
											emptyText: "Select",
											bind: {
												store: '{theDamageLevels}',
											},
											queryMode: 'local',
											displayField: 'invNm',
											valueField: 'invCd',
											allowBlank: false,
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('remark'),
											reference: 'ctlRemark',
											bind: '{theUnitInfo.remark}',
										},
										
										{
											xtype: 'container',
											layout: {
												type: 'hbox',
												align: 'stretch',
												pack: 'end'
											},
											items: [
												{
													xtype: 'button',
													reference: 'ctlDamageCheckClear',
													margin: '5 1 5 1',
													text: ViewUtil.getLabel('clear'),
													listeners: {
														click: 'onClearDamage'
													}
												},
												{
													xtype: 'button',
													margin: '5 1 5 1',
													reference: 'ctlDamageCheckAdd',
													text: ViewUtil.getLabel('add'),
													cls: 'search-button',
													iconCls: 'x-fa fa-plus',
													listeners: {
														click: 'onAddDamageDetail'
													}
												},
												{
													xtype: 'button',
													margin: '5 1 5 1',
													reference: 'ctlDamageCheckUpdate',
													text: ViewUtil.getLabel('update'),
													disabled: true,
													listeners: {
														click: 'onUpdateDamageDetail'
													}
												},
												{
													xtype: 'button',
													margin: '5 5 5 1',
													disabled: true,
													reference: 'ctlDamageCheckRemove',
													text: ViewUtil.getLabel('remove'),
													ui: 'delete-button',
													iconCls: 'x-fa fa-minus',
													listeners: {
														click: 'onDamageCheckRemove'
													}
												}
											]
										},
										{
											xtype: "tsb-datagrid",
											flex: 1,
											margin: '5 5 5 5',
											reference: me.MAIN_GRID_REF_NAME,
											stateful : true,
				                        	usePagingToolbar : false,
											stateId: "roroDamagePartGrid",
											plugins: ["gridfilters", "clipboard"],
											bind: {
												store: '{' + me.MAIN_STORE_NAME + '}'
											},
											selModel: {
												type: "spreadsheet",
												cellSelect: false,
											},
											listeners: {
												cellClick: "onClickRORODamageCheck",
												pagingSearch: "onSearch",
											},
											columns: {
												defaults: {
													style: "text-align:center",
													align: "center",
												},
												items: GridUtil.getGridColumns("RORODamageCheck"),
											}
										}
									]
								}
							]
						},
						
						//DAMAGE INVENTORY
//						{
//							xtype: 'container',
//							defaults: {
//								labelAlign: 'right',
//								labelWidth: 80,
//								margin: '2 0 0 0',
//							},
//							layout: {
//								type: 'vbox',
//								align: 'stretch'
//							},
//							width: 400,
//							items: [
//								{
//									xtype: "tsb-datagrid",
//									reference: "refRORODamageCheckInventoryGrid",
//									flex: 1,
//									style: 'border: solid black 1px',
//									margin: "0 5 5 0",
//									stateful: true,
//									viewConfig: {
//										stripeRows: true,
//										enableTextSelection: true,
//									},
//									plugins: [
//										rowEditing,
//										'gridexporter',
//										'gridfilters',
//										'clipboard'
//									],
//									bind: {
//										store: "{roroDamageCheckInventory}",
//									},
//									selModel: {
//										type: "spreadsheet",
//										cellSelect: false,
//									},
//									listeners: {
//										celldblclick: "onDbClickROROInv",
//										pagingSearch: "onSearch",
//									},
//									columns: {
//										defaults: {
//											style: "text-align:center",
//											align: "center",
//										},
//										items: GridUtil.getGridColumns("RORODamageCheckInventory"),
//									}
//								}
//							]
//						}
					]
				}
			],
			
			dockedItems: [
				{//Search Condition and VP infor:
					xtype: 'toolbar',
					enableOverflow: true,
					padding : '0 0 0 0',
					margin: '0 0 0 0',
					defaults: {
						labelAlign: 'right',
					},
					items:[
						{
							xtype: 'fieldset',
							autoScroll: true,
							collapsible:true,
							margin: '5 5 5 0',
							flex:1,
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							defaults:{
								margin: '0 0 5 0'
							},
							items:[
								{// Left: Search Condition
									xtype: 'searchfieldset',
									title: ViewUtil.getLabel('search'),
									layout: {
										type: 'vbox'
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 60,
										margin: '2 5 0 0'
									},
									items: [
										{
											xtype: 'vesselcalllistfield',
											fieldLabel: ViewUtil.getLabel('vessel'),
											width: 280,
											reference: 'ctlVsl',
											emptyText: ViewUtil.getLabel('vslcallid'),
											change: function (field, newValue) {
												field.setValue(newValue.toUpperCase());
											},
											bind: { value: '{theRORODamageSearch.vslCallId}' }
										}
									]
								},
								{//Right: VesselInfo:
									xtype: 'fieldset',
									title: ViewUtil.getLabel('vslInfo'),
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									flex: 1,
									margin: '0 0 5 5',
									items:[
										{
											xtype: 'container',
											defaults: {
												labelAlign: 'right',
												margin: '2 0 0 0',
												labelWidth: 90
											},
											flex:1,
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											items: [
												{
													xtype: "textfield",
													reference: "ctlVesselCode",
													bind: "{theVslInfo.vslCd}",
													fieldLabel: ViewUtil.getLabel("vesselCode"),
													readOnly: true,
												},
												{
													xtype: "textfield",
													reference: "ctlVesselName",
													bind: "{theVslInfo.vslNm}",
													fieldLabel: ViewUtil.getLabel("vesselName"),
													readOnly: true,
												}
											]
										},
										{
											xtype: 'container',
											defaults: {
												labelAlign: 'right',
												margin: '2 0 0 0',
												labelWidth: 90
											},
											flex:1,
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											items: [
												{
													xtype: "textfield",
													reference: "ctlASA",
													bind: "{theVslInfo.arrvSaId}",
													fieldLabel: ViewUtil.getLabel("SNLASA"),
													readOnly: true,
												},
												{
													xtype: "datefield",
													reference: "ctlETA",
													fieldLabel: ViewUtil.getLabel("eta"),
													bind: "{theVslInfo.eta}",
													format:
														MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													readOnly: true,
												}
											]
										},
										{
											xtype: 'container',
											defaults: {
												labelAlign: 'right',
												margin: '2 0 0 0',
												labelWidth: 90
											},
											flex:1,
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											items: [
												{
													xtype: "textfield",
													reference: "ctlBerthingLoc",
													fieldLabel: ViewUtil.getLabel("berthingLoc"),
													bind: "{theVslInfo.berthLoc}",
													readOnly: true,
												},
												{
													xtype: "datefield",
													reference: "ctlETD",
													fieldLabel: ViewUtil.getLabel("etd"),
													bind: "{theVslInfo.etd}",
													format:
														MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													readOnly: true,
												}
											]
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
	},
});
