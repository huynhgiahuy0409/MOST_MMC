Ext.define('MOST.view.planning.SpaceMovementSummary', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-spacemovementsummary',
	requires: [
		'MOST.view.planning.SpaceMovementSummaryModel',
		'MOST.view.planning.SpaceMovementSummaryController',
		'MOST.view.sample.SingleGridModel',
		'MOST.view.sample.SingleGridController',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	controller: 'spacemovementsummary',
	
	viewModel: {
		type: 'spacemovementsummary'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	 MAIN_GRID_REF_NAME: 'refSingleGridGrid',
	 MAIN_STORE_NAME: 'spaceMovementSummary',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			layout: {
				type: 'vbox', 
				align: 'stretch' 
			},
			items: [{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				flex : 1,
				stateful : true,
				stateId : 'stateSingleGridGrid',
				margin:'5 0 0 0',
				plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
	    		],
	    		bind: {
	    			store: '{' + me.MAIN_STORE_NAME + '}'
	    		},
				selModel: {
					type: 'spreadsheet',
					cellSelect: false
				},
				listeners: {
					pagingSearch: 'onSearch'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items:GridUtil.getGridColumns('SpaceMovementSummary')
				}
		    }],
		    
			dockedItems: [{
				xtype: 'container',
				style: { "background-color":"white" },
				layout: {
					type: 'hbox',
				},
				defaults: {
					margin: '1 1 1 1'
				},
				items: [{
					xtype: 'tbfill'
				},
				{
					xtype: 'button',
					reference:'refBtnRetrieve',
					text: ViewUtil.getLabel('search'),
					iconCls: 'x-fa fa-search', 
					cls: 'search-button', 
					listeners: {
						click: 'onSearch'
					}
				},
				{
					xtype: 'button',
					itemId: 'exportToExcelButton',
					text: ViewUtil.getLabel('exportToExcel'),
					iconCls: 'excel-button-image', 
					cls: 'excel-button',
					listeners: {
						click: {
							fn: 'onExportExcelPdfWithServer',
							args:[me.MAIN_GRID_REF_NAME, true]
						}
					}
				},{
					xtype: 'button',
					itemId: 'exportToPdfButton',
					text: ViewUtil.getLabel('exportToPdf'),
					iconCls: 'x-fa fa-file-pdf-o',
					cls: 'excel-button',
					listeners: {
						click: {
							fn: 'onExportExcelPdfWithServer',
							args:[me.MAIN_GRID_REF_NAME, false]
						}
					}
            	},{
					xtype: 'button',
					cls: 'column-setting-button',
					iconCls: 'x-fa fa-columns',
					text: ViewUtil.getLabel('column'),
					listeners: {
						click: 'onColumnSettingPopup',
						args: [me.MAIN_GRID_REF_NAME]
					}
            	}]
			},{
				xtype: 'toolbar',
				enableOverflow: true,
				padding : '0 0 0 0',
				defaults: {
					labelAlign: 'right',
				},
				items: [{
					xtype:'searchfieldset',
					title: ViewUtil.getLabel('search'),
					autoScroll: true,
					collapsible:true,
					layout:{
						type:'vbox',
						align:'stretch'
					},
					defaults:{
						margin: '0 0 5 0'
					},
					flex: 1,
					items: [{
						xtype: 'container',
						layout: {
							type: 'hbox',
						},
						items: [{
							xtype: 'radiogroup',
							layout: 'vbox',
							reference: 'ctl_optJPVC',
							listeners: {
								change: 'onJpvcRadioChange'
							},
							items:[{
								xtype: 'radiofield',
								boxLabel: ViewUtil.getLabel('nonVessel'),
								reference:'refRadioNonJpvc',
								margin: '5 0 0 0',
								width: 80,
								labelWidth: 70,
								name: 'jpvc_radio',
								inputValue : false,
							},{
								xtype: 'radiofield',
								boxLabel: ViewUtil.getLabel('vessel'),
								name: 'jpvc_radio',
								reference:'refRadioJpvc',
								inputValue : true,
								width: 80,
								checked: true
							}]   
						},{
							xtype: 'container',
							flex: 0.2,
							layout: {
								type: 'vbox',
								align: 'stretch',
							}, 
							defaults: {
								labelAlign: 'right',
								margin: '0 0 5 0',
							},
							items: [{
								xtype: 'container',
								layout: {
									type: 'hbox'
								}, 
								defaults: {
									labelAlign: 'right',
									margin: '0 0 0 0',
								},
								items: [{
                                    xtype:'textfield',
                                    reference:'ctlShippingNoteStorage',
                                    fieldLabel: ViewUtil.getLabel('shipgNoteNo'),
                                    margin: '0 0 0 290',
                                    editable:true,
                                    disabled: true,
                                    labelWidth: 50,
                                    width: 212,
                                    fieldStyle: 'text-transform:uppercase',
                                    bind: {
                                        value: '{theSearch.shipgNoteNo}'
                                    },
                                },{
                                    xtype: 'button',
                                    reference:'ctlShippingNoteStorage1',
                                    disabled: true,
                                    margin: '0 0 0 5',
                                    iconCls: 'x-fa fa-search',
                                    listeners:{
                                        click:'openShippingNoteForStoragePopup'
                                    }
                                },{
                                    xtype: 'combobox',
                                    reference: 'ctlGRnonJPVC',
                                    disabled: true,
                                    queryMode: 'local',
                                    width: 200,
                                    bind: {
                                        store: '{grNonJpvcCombo}'
                                    },
                                    value : '',
                                    displayField: 'grNo',
                                    valueField: 'grNo'
                                }]
							},{
								xtype: 'container',
								layout: {
									type: 'hbox'
								}, 
								defaults: {
									labelAlign: 'right',
									margin: '0 0 0 0',
								},
								items: [{
									xtype:'vesselcalllistfield',
									width:240,
									emptyText:ViewUtil.getLabel('vslcallid'),
									labelWidth: 50,
									reference:'txtJPVCNo',
									bind: {
										value: '{theSearch.vslCallId}'
									}
								},{
                                    xtype: 'textfield',
                                    reference: 'ctlreqNo',
                                    labelWidth:100,
                                    width:250,
                                    fieldLabel: ViewUtil.getLabel('spaceMovementRequestReqNo'),
                                    bind: {
                                        value: '{theSearch.reqNo}'
                                    },
                                    fieldStyle: 'text-transform:uppercase'
								},{
                                    reference: 'ctlReqTpNm',
                                    xtype: 'combo',
                                    labelWidth:100,
                                    width:250,
                                    fieldLabel: ViewUtil.getLabel('spaceMovementRequestReqTpNm'),
                                    queryMode: 'local',
                                    bind: {
                                        store: '{spaceMovementPlanForReqTypeCombo}'
                                    },
                                    emptyText:'All',
                                    displayField: 'scdNm',
                                    valueField: 'scd',
                                    forceSelection:true
                                },{
									reference: 'ctlWarehouseCombo',
									xtype: 'combo',
									labelWidth:100,
									width:300,
									fieldLabel: ViewUtil.getLabel('spaceMovementSummaryPlannedWH'),
									queryMode: 'local',
									bind: {
										store: '{whCombo}'
									},
									displayField: 'codeName',
									valueField: 'code',
									editable:true,
									forceSelection:true
								}]
							}]
						}]    
					},{
						xtype: 'container',
						enableOverflow: true,
						layout:'hbox',
						defaults: {
							labelAlign: 'right',
							margin: '0 0 5 0'
						},
						items: [{
							xtype: 'combo',
							reference: 'ctlMasterBL',
							fieldLabel: ViewUtil.getLabel('spaceMovementSummaryMasterBL'),
							queryMode: 'local',
							labelWidth: 80,
							bind: {
								store: '{masterBLCombo}',
								value: '{theSearch.codeMaster}'
							},
							listeners: {
								select: 'onSelectedMfDocId'
							},
							value : '',
							displayField: 'scdNm',
							valueField: 'mfDocId',
							fieldStyle: 'text-transform:uppercase',
							editable: false,
		   					forceSelection:true
						},{
							xtype: 'combo',
							reference: 'ctlBookingNo',
							fieldLabel: ViewUtil.getLabel('spaceMovementSummaryBookingNo'),
							bind: {
								store: '{bookingNoCombo}',
								value: '{theSearch.codeMaster}'
							},
							listeners: {
								select: 'onSelectedMfDocId'
							},
							value : '',
							displayField: 'scdNm',
							valueField: 'mfDocId',
							fieldStyle: 'text-transform:uppercase',
							editable: false,
		   					forceSelection:true
						},{
							reference: 'ctlFromDt',
							xtype: 'datefield',
							labelWidth: 100,
							width: 295,
							fieldLabel: ViewUtil.getLabel('eta'),
							format: MOST.config.Locale.getShortDate(),
							editable: true,
						},{
							reference: 'ctlToDt',
							xtype: 'datefield',
							margin: '0 0 0 10',
							width: 195,
							format: MOST.config.Locale.getShortDate(),
							editable: true,
						}]
					},{
						xtype: 'container',
						enableOverflow: true,
						layout:'hbox',
						defaults: {
							labelAlign: 'right',
						},
						items: [{
							xtype: 'combo',
							reference: 'ctlBlLabel',
							fieldLabel: ViewUtil.getLabel('spaceMovementSummarySubBL'),
							queryMode: 'local',
							labelWidth: 80,
							bind: {
								store: '{blCombo}',
								value: '{theSearch.blNo}'
							},
							//value : '',
							displayField: 'blNo',
							valueField: 'blNo',
							fieldStyle: 'text-transform:uppercase',
							editable: false,
		   					forceSelection:true
						},{
							xtype: 'combo',
							reference: 'ctlShipgNoteNo',
							fieldLabel: ViewUtil.getLabel('spaceMovementSummarySN'),
							queryMode: 'local',
							labelWidth: 100,
							bind: {
								store: '{snCombo}',
								value: '{theSearch.shipgNoteNo1}'
							},
							displayField: 'shipgNoteNo',
							valueField: 'shipgNoteNo',
							listeners: {
								//select: 'selectSN'
							},
							fieldStyle: 'text-transform:uppercase',
							editable: false,
		   					forceSelection:true
						}]
					}]
				}],
			}]
		});
		
		me.callParent();
	}
});

