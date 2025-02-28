Ext.define('MOST.view.planning.MegaInternal', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-megainternal',
	requires: [
		'MOST.view.planning.MegaInternalModel',
		'MOST.view.planning.MegaInternalController',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
		'MOST.view.planning.MegaInternalForkliftTab',
		'MOST.view.planning.MegaInternalMechanicalTab',
	],

	controller: 'megainternal',
	
	viewModel: {
		type: 'megainternal'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	lblMegaNo: {type: 'bundle', key: 'megaNo'},
	lblScn: {type: 'bundle', key: 'scn'},
	lblVslCallId: {type: 'bundle', key: 'jPVC'},
	lblReqr: {type: 'bundle', key: 'reqr'},
	lblReqDt: {type: 'bundle', key: 'spaceMovementRequestReqDt'},
	lblShftNm: {type: 'bundle', key: 'shftNm'},
	lblWorkYmd: {type: 'bundle', key: 'workYmd'},
	lblLocId: {type: 'bundle', key: 'whNo'},
	lblSndo: {type: 'bundle', key: 'sndo'},
	lblCapaDescr: {type: 'bundle', key: 'flCapa'},
	lblReqQty: {type: 'bundle', key: 'reqQty'},
	lblWhQty: {type: 'bundle', key: 'whQty'},
	lblConfmQty: {type: 'bundle', key: 'confmQty'},
	lblServiceDate: {type: 'bundle', key: 'workYmd'},
	lblWarehouse: {type: 'bundle', key: 'warehouse'},
	lblForwarder: {type: 'bundle', key: 'forwarder'},
	lblShift: {type: 'bundle', key: 'shift'},
	lblPurpose: {type: 'bundle', key: 'purpose'},
	lblJpvc: {type: 'bundle', key: 'jpvc'},
	lblSa: {type: 'bundle', key: 'sa'},
	lblReqQty: {type: 'bundle', key: 'reqQty'},
	lblWhQty: {type: 'bundle', key: 'whQty'},
	lblConfQty: {type: 'bundle', key: 'confmQty'},
	lblTotal: {type: 'bundle', key: 'total'},
	
	lblForklift: {type: 'bundle', key: 'forklift'},
	lblMechanical: {type: 'bundle', key: 'mechanical'},
	
	btnRetrieve: {type: 'bundle', key: 'retrive'},
	btnCreate: {type: 'bundle', key: 'create'},
	btnDelete: {type: 'bundle', key: 'delete'},
	btnRefresh: {type: 'bundle', key: 'refresh'},
	btnSave: {type: 'bundle', key: 'save'},
	btnSave: {type: 'bundle', key: 'save'},
	btnSearch: {type: 'bundle', key: 'search'},
	btnRemove: {type: 'bundle', key: 'remove'},
	btnRefresh: {type: 'bundle', key: 'refresh'},
	btnExportToExcel: {type: 'bundle', key: 'exportToExcel'},
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;		
		Ext.apply(me, {
			items: [{
				xtype: 'fieldset',
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				margin: '0 5 0 0',
				padding: '10 10 10 10',
				items: [ 
					{
						xtype: 'container',
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						defaults: {
							labelAlign: 'right',
							editable: false,
							flex: 1,
							labelWidth: 80,
						},
						items: [
							{
								xtype: 'shipcallnofield',
								reference: 'ctlScn',
								fieldLabel: ViewUtil.getLabel('shipCallNo'),
							},
							{
								xtype: 'container',
								layout: {
									type: 'hbox',
									align: 'stretch'
								},
								items: [
									{
										xtype: 'label',
										text: ViewUtil.getLabel('workYmd') + ':',
										style: 'text-align: right; margin-top: 5px;',
										width: 80
									},
									{
										reference: 'ctlFromDt',
										xtype: 'datefield',
										flex: 0.5,
										margin: '0 0 0 5',
										format: MOST.config.Locale.getShortDate(),
									}, {
										reference: 'ctlToDt',
										xtype: 'datefield',
										flex: 0.5,
										margin: '0 0 0 5',
										format: MOST.config.Locale.getShortDate(),
									}, 
								]
							}, 
							{
								xtype: 'partnercdfield',
								reference: 'ctlForwarder',
								fieldLabel: me.lblForwarder,
								params: {
									searchDivCd: 'FWD'
								}
							},
							{
								reference: 'ctlShiftCombo',
								xtype: 'combo',
								fieldLabel: me.lblShift,
								queryMode: 'local',
								bind: {
									store: '{megaInternalShiftCombo}'
								},
								displayField: 'shftNm',
								valueField: 'shftId',
								value: '',
								editable: true,
								forceSelection: true
							},
							{
								xtype: 'container'
							}
						]
					},
					{
						xtype: 'container',
						flex: 1,
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						defaults: {
							labelAlign: 'right',
							margin: '5 0 0 0',
							editable: false,
							flex: 1,
							labelWidth: 80,
						},
						items: [
							{
								xtype: 'vesselcalllistfield',
								fieldLabel: me.lblJpvc,
								reference: 'ctlVessel'
							},
							{
								reference: 'ctlPurposeCombo',
								xtype: 'combo',
								fieldLabel: me.lblPurpose,
								queryMode: 'local',
								bind: {
									store: '{megaInternalPurposeCombo}'
								},
								displayField: 'scdNm',
								valueField: 'scd',
								value: '',
								editable: true,
								forceSelection: true
							}, 
							{
								xtype: 'partnercdfield',
								fieldLabel: me.lblSa,
								reference: 'ctlSa',
								params: {
									searchDivCd: 'SHA'
								}
							},
							{
								reference: 'ctlWarehouseCombo',
								xtype: 'combo',
								fieldLabel: me.lblWarehouse,
								queryMode: 'local',
								bind: {
									store: '{megaInternalWarehouseCombo}'
								},
								displayField: 'locNm',
								valueField: 'locId',
								value: '',
								matchFieldWidth: false,
								editable: true,
								forceSelection: true
							}, 
							{
								xtype: 'container'
							}
						]
					}
				]
			},{
        		xtype: 'container',
        		flex: 1,
        		margin:'5 5 5 0',
        		defaults: {
                    labelAlign: 'right',
                    labelWidth: 85
                },
        		layout: {
	                type: 'hbox',
	                align: 'stretch'
	            },
                items: [
                	{
    					defaults:{
    						margin: '0 0 0 0'
    					},
    					xtype:'tabpanel',
    					reference:'tabMegaInternal',
    					flex: 1,
    					items:[
    					{
    						xtype: 'panel',
    						title: me.lblForklift,
    						layout: {
    							type: 'vbox',
    							align: 'stretch'
    						},
    						items : [{
    							xtype: 'app-megainternalforklifttab',
    				    		reference: 'refMegaInternalForkliftTab',
    				    		flex: 1
    						}]
    					}
    					,{
    						xtype: 'panel',
    						title: me.lblMechanical,
    						layout: {
    							type: 'vbox',
    							align: 'stretch'
    						},
    						items : [{
    							xtype: 'app-megainternalmechanicaltab',
    				    		reference: 'refMegaInternalMechanicalTab',
    				    		flex: 1
    						}]
    					
    					}]
    		        }
                ]
			},{
				xtype: 'fieldset',
				layout: {
					type: 'hbox',
					align: 'stretch'
				},
				defaults: {
					labelAlign: 'right',
					margin: '5 5 0 0',
					editable: false
				},
				margin:'0 5 5 0',
				items:[
					{
			            xtype: 'container',
			            width: 500,
			            defaults: {
			                margin: '0 0 0 5',
			                labelWidth: 60,
			                labelAlign: 'right'
			            },
			            layout: {
			                type: 'hbox',
			                align: 'stretch'
			            },
			            items: [
			                {
			                    xtype: 'container',
			                    layout: {
			                        type: 'vbox',
			                        align: 'stretch',
			                        pack: 'center'
			                    },
			                    items: [
			                        {
			                            xtype: 'label',
			                            width: 70,
			                            text: me.lblTotal
			                        }
			                    ]
			                },
			                {
			                    xtype: 'textfield',
			                    flex: 1,
			                    reference: 'ctlMegaInternalReqQty',
			                    fieldLabel: me.lblReqQty,
			                    value: '0',
			                    editable: false
			                },
			                {
			                    xtype: 'textfield',
			                    flex: 1,
			                    reference: 'ctlMegaInternalWhQty',
			                    fieldLabel: me.lblWhQty,
			                    value: '0',
			                    editable: false
			                },
			                {
			                    xtype: 'textfield',
			                    flex: 1,
			                    reference: 'ctlMegaInternalConfQty',
			                    fieldLabel: me.lblConfQty,
			                    value: '0',
			                    editable: false
			                }
			            ]
			        }
				]
			}],
		    
			dockedItems: [{
				xtype: 'container',
				layout: {
					type : 'hbox',
				},
				defaults: {
					margin: '5 5 5 0'
				},
				items: [
					{
						xtype: 'tbfill'
					},
					{
						xtype: 'button',
						text: ViewUtil.getLabel('search'),
						itemId: 'inquiryItemId',
						iconCls: 'x-fa fa-search',
						cls: 'search-button',
						reference: 'refBtnRetrieve',
						listeners: {
							click: 'onSearchBtn'
						}
					}, {
						xtype: 'button',
						text: 'Save',
						itemId: 'saveItemId',
						ui: 'update-button',
						iconCls: 'x-fa fa-save',
						reference: 'refBtnSave',
						listeners: {
							click: 'onSave'
						}
					}, {
						xtype: 'button',
						text: me.btnRefresh,
						iconCls: 'x-fa fa-refresh',
						listeners: {
							click: 'onRefresh'
						},

					}, {
						xtype: 'button',
						itemId: 'downloadItemId',
						text: me.btnExportToExcel,
						cls: 'excel-button',
						reference: 'refBtnDownload',
						iconCls: 'excel-button-image',
						listeners: {
							click: {
								fn: 'onExportExcel',
								args: ['refMegaInternalGrid']
							}
						}
					},
				]
			}]
		});
		
		me.callParent();
	}
});

