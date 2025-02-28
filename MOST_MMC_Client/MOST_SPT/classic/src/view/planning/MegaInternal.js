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
//		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
//			clicksToEdit: 2,
//			pluginId :'singleGridEditor',
//			listeners: {
//				cancelEdit: 'onCancelEdit',
//				validateedit: 'onValidateEdit',
//				edit: 'onEdit'
//			}
//		});
		
		Ext.apply(me, {
			items: [{
				xtype: 'fieldset',
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				margin:'5 5 5 0',
				items: [ 
					{
						xtype: 'container',
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						defaults: {
							labelAlign: 'right',
							margin: '5 5 0 0',
							editable: false
						},
						items:[
							{
								reference: 'ctlFromDt',
								xtype: 'datefield',
								labelWidth: 80,
								width: 210,
								fieldLabel: me.lblServiceDate,
								format: MOST.config.Locale.getShortDate(),
//								listeners: {
//									change: 'onDateChange'
//								}
							}, {
								reference: 'ctlToDt',
						        xtype: 'datefield',
						        width:130,
						        format: MOST.config.Locale.getShortDate(),
//								listeners: {
//									change: 'onDateChange'
//								}
						    }, {
	           					xtype:'vesselcalllistfield',
	           					labelWidth:60,
	           					width:270,
	           					fieldLabel:me.lblJpvc,
	           					reference:'ctlVessel'
	           				}, {
			   					reference: 'ctlShiftCombo',
			   					xtype: 'combo',
			   					labelWidth:70,
			   					width:230,
			   					fieldLabel: me.lblShift,
			   					queryMode: 'local',
			   					bind: {
			    	    			store: '{megaInternalShiftCombo}'
			    	    		},
			   					displayField: 'shftNm',
			   					valueField: 'shftId',
			   					value : '',
			   					editable:true,
//			   					emptyText:'All',
			   					forceSelection:true
                               }, 
                            //    {
							// 	xtype: 'button',
							// 	text: me.btnSearch,
							// 	reference: 'refBtnRetrieve',
							// 	iconCls: 'x-fa fa-search',
							// 	listeners: {
							// 		click: 'onSearchBtn'
							// 	}
							// }
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
							margin: '5 5 0 0',
							editable: false
						},
						items:[
							{
			   					reference: 'ctlPurposeCombo',
			   					xtype: 'combo',
			   					labelWidth:80,
			   					width:345,
			   					fieldLabel: me.lblPurpose,
			   					queryMode: 'local',
			   					bind: {
			    	    			store: '{megaInternalPurposeCombo}'
			    	    		},
			   					displayField: 'scdNm',
			   					valueField: 'scd',
			   					value : '',
			   					editable:true,
			   					forceSelection:true
			   				}, {
        	   					xtype:'partnercdfield',
        	   					reference:'ctlForwarder',
        	   					labelWidth:60,
	           					width:270,
        	   					fieldLabel:me.lblForwarder,
        	   					params:{
        	   						searchDivCd: 'FWD'
        	   					}
        	   				}, {
			   					reference: 'ctlWarehouseCombo',
			   					xtype: 'combo',
			   					labelWidth:70,
			   					width:230,
			   					fieldLabel: me.lblWarehouse,
			   					queryMode: 'local',
			   					bind: {
			    	    			store: '{megaInternalWarehouseCombo}'
			    	    		},
			   					displayField: 'locNm',
			   					valueField: 'locId',
			   					value : '',
			   					matchFieldWidth: false,
			   					editable:true,
//			   					emptyText:'All',
			   					forceSelection:true
			   				}, {
	    	   					xtype:'partnercdfield',
	    	   					labelWidth: 40,
								width: 200,
	    	   					fieldLabel:me.lblSa,
	    	   					reference:'ctlSa',
        	   					params:{
        	   						searchDivCd: 'SHA'
        	   					}
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
		    
		    dockedItems: [         {
                xtype: 'container',
                layout: {
                    //type: 'hbox',
                    align:'left'
                },
                defaults: {
                    margin: '1 1 1 1'
                },
                items: [
                {
                    xtype: 'button',
                    text: me.btnRetrieve,
                    itemId: 'inquiryItemId',
                    iconCls: 'x-fa fa-search',
                    cls: 'search-button', 
                    reference:'refBtnRetrieve',
                    listeners: {
                        click: 'onSearchBtn'
                    }
                },{
    				xtype: 'button',
    				text: 'Save',
    				itemId: 'saveItemId',
    				ui: 'update-button',
    				iconCls: 'x-fa fa-save',
    				reference:'refBtnSave',
    				listeners: {
    					click: 'onSave'
    				}
    			},{
                    xtype: 'button',
                    text: me.btnRefresh,
                    iconCls: 'x-fa fa-refresh',
                    listeners: {
                        click: 'onRefresh'
                    },
                
                },{
                    xtype: 'button',
                    itemId: 'downloadItemId',
                    text: me.btnExportToExcel,
                    cls: 'excel-button',
                    reference:'refBtnDownload',
                    iconCls: 'excel-button-image',
                    listeners:{
                        click: {
                            fn: 'onExportExcel',
                            args:['refMegaInternalGrid']
                        }
                        }
                },
                ]
            }]			
		});
		
		me.callParent();
	}
});

