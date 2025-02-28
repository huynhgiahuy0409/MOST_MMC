Ext.define('MOST.view.planning.RentalInfo', {
	extend:'Ext.panel.Panel',
	alias:'widget.app-rentalinfo',
	requires: [
		'MOST.view.planning.RentalModel',
		'MOST.view.planning.RentalInfoController',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	detailViewAlias: 'app-warehouserental',
	controller: 'rentalinfo',
	
	viewModel: {
		type: 'rentalinfo'
	},
	
	listeners:{
		afterrender: 'onLoad',
		
	},
	
	lblperiod: {type: 'bundle', key: 'period'},
	lblTerm: {type: 'bundle', key: 'rentalTerm'},
	lblValid: {type: 'bundle', key: 'rentalValid'},
	lblExpired: {type: 'bundle', key: 'rentalExpired'},
	lblWH: {type: 'bundle', key: 'rentalWH'},
	lblTenant: {type: 'bundle', key: 'rentalTenant'},
	lblRenTalNo: {type: 'bundle', key: 'rentalNo'},
	lblRefNo: {type: 'bundle', key: 'rentalRefNo'},
	lblW_H: {type: 'bundle', key: 'rentalW_H'},
	lblFrom: {type: 'bundle', key: 'rentalFrom'},
	lblTo: {type: 'bundle', key: 'rentalTo'},
	lblStatus: {type: 'bundle', key: 'rentalStatus'},
	
	btnSearch: {type: 'bundle', key: 'search'},
	btnAdd: {type: 'bundle', key: 'add'},
	btnRemove: {type: 'bundle', key: 'remove'},
	btnRefresh: {type: 'bundle', key: 'refresh'},
	btnSave: {type: 'bundle', key: 'save'},
	btnFind: {type: 'bundle', key: 'find'},
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
//		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
//			clicksToEdit: 2,
//			pluginId :'invoiceUnitEditor',
//			listeners: {
//				cancelEdit: 'onCancelEdit',				
//				validateedit: 'onValidateEdit',				
//				edit: 'onEdit'
//			}
//		});
		
		Ext.apply(me, {
			items: [{
				xtype: 'gridpanel',
				reference: 'refRentalInfoGrid',
				flex : 1,
				stateful : true,
				stateId : 'stateRentalInfoGrid',
				viewConfig: {
					getRowClass: function (row, index) {
						var cls = "";
				
						if(row.get("rentalRemind") == 'Y'){
							cls = "red-row";	
							return cls;
						}
					}
				},
				plugins: [
//					rowEditing, 
					'gridexporter',
					'gridfilters',
					'clipboard'
	    		],
	    		bind: {
	    			store: '{rentalList}'
	    		},
	    		selModel: {
					type: 'checkboxmodel',
					checkOnly: false
				},
				listeners: {
					celldblclick: 'onDblClick'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'left'
	            	},
	            	items: [
//	            	{	header: '',
//	            		xtype: 'checkcolumn',
//	            		dataIndex: 'chkCol',
//	            		reference: 'refChkCol',
//	            		//id: 'idpaidSt',
//	            		width: 50,
//	            		listeners:{
//	            			//checkChange: 'onCheckPaidStatus',
//	            			//beforecheckchange: 'onCheckXMS'
//	            		}
//	            	},
	            	{
	            		header: me.lblRenTalNo,
	            		dataIndex: 'conttNo',
	            		width:150,
	            		reference: 'refRentalfNo',
       					
	            	},
	            	{
	            		header: me.lblRefNo,
	            		dataIndex: 'refNo',
	            		reference: 'refRefNo',
	            		width: 150
	            	},
	            	{
	            		header: me.lblTerm,
	            		dataIndex: 'rentTpNm',
	            		reference: 'refTerm',
	            		width: 150
	            	},
	            	{
	            		header: me.lblTenant,
	            		dataIndex: 'tnnt',
	            		reference: 'refTenant',
	            		width: 100
	            	},
	            	{
	            		header: me.lblW_H,
	            		dataIndex: 'locId',
	            		reference: 'refW_H',
	            		width: 100
	            	},
	            	{
	            		header: me.lblFrom,
	            		dataIndex: 'fmYmd',
	            		reference: 'refFrom',
	            		width: 100
	            	},
	            	{
	            		header: me.lblTo,
	            		dataIndex: 'toYmd',
	            		reference: 'refTo',
	            		width: 100
	            	},
	            	{
	            		header: me.lblStatus,
	            		dataIndex: 'status',
	            		reference: 'refStatus',
	            		width: 100
	            	}]
				}
		    }],
		    
		    dockedItems: [{
				xtype: 'container',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [{
    				xtype : 'container',
    				layout: {
    					type: 'hbox',
    				},
    				defaults: {
    					margin: '1 1 1 1'
    				},
    				items: [{
						xtype: 'tbfill'
						},{
    					xtype: 'button',
    					text: me.btnSearch,
    					itemId: 'inquiryItemId',
    					iconCls: 'x-fa fa-search',
    					reference:'refBtnRetrieve',
    					listeners: {
    						click: 'onSearchBtn'
    					}
                	},{
    					xtype: 'button',
    					text: me.btnRefresh,
    					iconCls: 'x-fa fa-refresh',
    					listeners: {
    						click: 'onRefresh'
    					}
                	},{
    					xtype: 'button',
    					text: me.btnAdd,
    					itemId: 'createItemId',
    					ui: 'create-button',
    					reference:'refBtnCreate',
    					iconCls: 'x-fa fa-plus',
    					listeners: {
    						click: 'onCreateWareHouseRental'
    					}
    				}, {
    					xtype: 'button',
    					itemId: 'deleteItemId',
    					reference:'refBtnDelete',
    					text: me.btnRemove,
    					ui: 'delete-button',
    					iconCls: 'x-fa fa-minus',
    					listeners: {
    						click: 'onRemove'
    					}
    				}]
				},{
    				xtype: 'fieldset',
    				margin: '5 5 5 0',
    				layout:{
    					type:'vbox'
    				},
    				items:[
    					{
    			            xtype: 'container',
    			            layout: {
    			                type: 'hbox'
    			            }, 
    			            defaults: {
    	                        labelAlign: 'right',
    							labelWidth: 80,
    	                    },
    						items: [
    							{
    								xtype: 'combo',
    								reference: 'refTermCb',
    								fieldLabel: me.lblTerm,
    								labelWidth: 50,
    								width: 200,
    								bind:{
    									store: '{termCombo}'
    								},
    								displayField: 'name',
    			   					valueField: 'code',
    			   					emptyText: 'Select'
    							},{
    					            xtype: 'checkboxfield',
    					            //name : '',
    					            fieldLabel: me.lblValid,
    					            labelWidth: 50,
    					            reference: 'chkbValid',
    					            //value: 'tomato',
    					            
    					            checked: true
    					        },{
    					            xtype: 'checkboxfield',
    					           // name : 'tomato',
    					            fieldLabel: me.lblExpired,
    					            labelWidth: 50,
    					            reference: 'chkbExpired',
    					            margin: '0 26 0 0',
    					           // value: 'tomato',
    					            //checked: true
    					        },{
    								xtype: 'combo',
    								reference: 'refWHCb',
    								fieldLabel: me.lblWH,
    								displayField: 'locNm',
    			                    valueField: 'locId',
    								bind:{
    									store: '{warehouseRIList}'
    								},
    			   					emptyText: '-'
    							}
    						]
    					},{
    						xtype: 'container',
    				           // flex: 1,
    				            layout: {
    				                type: 'hbox',
    				                align: 'stretch'
    				            }, 
    				            defaults: {
    		                        labelAlign: 'right',
    		                        margin: '5 5 0 0'
    		                    },
    							items: [{
    									xtype: 'textfield',
    									reference: 'refTenantTxt',
    									fieldLabel: me.lblTenant,
    									labelWidth: 50,
    									width: 120,
    								},{
    									xtype: 'textfield',
    									reference: 'refTenantNmTxt',
    									fieldLabel: '',
    									width: 175,
    								},{
    									xtype: 'button',
    									text: me.btnFind,
    									reference: 'refPartnerCode',
    									listeners: {
    										click: 'openPartnerCdTypePopup'
    									}
    								},{
    									xtype: 'combo',
    									reference: 'refPeriodCb',
    									width: 200,
    									fieldLabel: me.lblperiod,
    									bind:{
    										store: '{periodCombo}'
    									},
    									displayField: 'name',
    				   					valueField: 'code',
    				   					emptyText: 'Select'
    								},{
    		                			reference: 'ctlDateFromDtRental',
    		        					xtype: 'datefield',
    		        					//id: 'ctlGaDateFromDt',
    		        					width: 150,
    		        					//fieldLabel: me.lblperiod,
    		        					format: MOST.config.Locale.getShortDate(),
    		                			listeners: {
    		                				change:  'onChangeDate'
    		                			}
    								},{
    		                			reference: 'ctlDateToDtRental',
    		        			        xtype: 'datefield',
    		        			       // id: 'ctlGaDateToDt',
    		        			        width: 150,
    		        			        anchor: '100%',
    		        			        format: MOST.config.Locale.getShortDate(),
    		        			        listeners: {
    		                				change: 'onChangeDate'
    		                			}
    								}
								]
						}]
				}]
		    }]
		});
		
		me.callParent();
	}
});

