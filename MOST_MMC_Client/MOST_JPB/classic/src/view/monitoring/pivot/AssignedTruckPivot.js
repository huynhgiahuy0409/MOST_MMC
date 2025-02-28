Ext.define('MOST.view.monitoring.pivot.AssignedTruckPivot', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-assignedtruckpivot',
	
	requires: [
	],
	
	flex:1,
	
	layout : {type  : 'vbox', align : 'stretch'},

	listeners:{
		afterrender: 'onLoad', 
		tabchange: 'onTabChange'
	},
	
	initComponent: function() {
		var me = this;
		
		var myStore = Ext.create('Ext.data.Store', {
		     model: 'MOST.model.monitoring.pivot.AssignedTruckPivot',
		     proxy: {
		    	 type: 'memory',
		 		reader: {
		 			type: 'json',
		 			rootProperty: 'items'
		 		}
		     }
		 });	
		
		Ext.apply(me, {
			items: [
		        {
		            xtype: 'container',
		            flex: 1,
		            height: 200,
		            layout: {
		                type: 'hbox',
		                align: 'stretch'
		            },
		            items: [
		            	{

						    xtype: 'pivotgrid',
							region : 'center',
							flex : 1, 
							reference:'ctlPivotGrid',
						    collapsible: false,
						    multiSelect: false,
						    columnLines: true,
						    startRowGroupsCollapsed: false,
						    startColGroupsCollapsed: false,
//							    colSubTotalsPosition  : 'none',
//								rowSubTotalsPosition : 'first',
						    selModel: {
						        type: 'spreadsheet'
						    },
						    plugins: [{
						        ptype: 'pivotexporter',
						        pluginId: 'exporter'
						    }],
						    matrix: {
						    	store:myStore,
						    	colSubTotalsPosition: 'none',
						        aggregate: [{
						            dataIndex: 'total',
						            header: 'Total',
						            aggregator: 'sum',
						            width: 100
						        }],
						    },
						
				        },
				        {
							
							margin : '0 0 0 0',
							width : 350,
							split : false,
							collapsible : false,
							region : 'east',
		            		xtype : 'container',
		            		
			                layout: {
			                    type: 'vbox',
			                    align : 'stretch'
			                },
			               
		                    defaults: {
		                        margin: '1 1 1 1',
		                        labelAlign: 'right',
		                    },
		                    items:[
		                    	{
		                    		xtype : 'container',
		        	                layout: {
		        	                    type: 'hbox',
		        	                },
		        	               
		                            defaults: {
		                                margin: '1 1 1 1',
		                                labelAlign: 'right',
		                            },
		                            items:[
		                            	{
	    	    							reference: 'ctlCalculate',
	    	    							fieldLabel:ViewUtil.getLabel('pivot.value'),
	    	    							allowBlank: false,
	    	    							forceSelection : true,
	    	    							xtype: 'combobox',
	    	    							width: 120,
	    	    							labelWidth: 30,
	    	    							displayField: 'text',
	    	    		                    valueField: 'cal',
	    	    		                    store: Ext.create('Ext.data.Store',{
	    	    		                    	fields : ['cal', 'text'],
	    	    		                    	data : [
	    	    		                    		['sum','SUM']
	    	    		                    	]
	    	    		                    }), 
	    	    		                    listeners: {
	    	       			              	    afterrender: function(combo) {
	    	       			              	    	 var recordSelected = combo.getStore().getAt(0);                     
	    	       			               	        combo.setSelection(recordSelected);
	    	       			              	    },
	    	       			              	}, 
	    	    						},
	    	    						{
	    	    							reference: 'ctlValue',
	    	    							fieldLabel: ViewUtil.getLabel('pivot.calcurate'),
	    	    							allowBlank: false,
	    	    							forceSelection : true,
	    	    							xtype: 'combobox',
	    	    							width: 100,
	    	    							labelWidth: 20,
	    	    							displayField: 'text',
	    	    		                    valueField: 'cal',
	    	    		                    bind: '{theSearch.aggregate}',
	    	    		                    store: Ext.create('Ext.data.Store',{
	    	    		                    	fields : ['cal', 'text'],
	    	    		                    	data : [
	    	    		                    		['qty', 'QTY'],['mt','MT']
	    	    		                    	]
	    	    		                    }), 
	    	    		                    listeners: {
	    	       			              	    afterrender: function(combo) {
	    	       			              	    	 var recordSelected = combo.getStore().getAt(0);                     
	    	       			               	        combo.setSelection(recordSelected);
	    	       			              	    },
	    	       			              	}, 
	    	    						},
	    	    						{
	    	    							reference: 'ctlDelvTp',
	    	    							fieldLabel: ViewUtil.getLabel('pivot.deliveryType'),
	    	    							allowBlank: false,
	    	    							forceSelection : true,
	    	    							xtype: 'combobox',
	    	    							width: 120,
	    	    							labelWidth: 40,
	    	    							displayField: 'text',
	    	    		                    valueField: 'cal',
	    	    		                    bind: '{theSearch.delvTpCd}',
	    	    		                    store: Ext.create('Ext.data.Store',{
	    	    		                    	fields : ['cal', 'text'],
	    	    		                    	data : [
	    	    		                    		['I', 'Indirect'],['D','Direct'],['B','Both']
	    	    		                    	]
	    	    		                    }), 
	    	    		                    listeners: {
	    	       			              	    afterrender: function(combo) {
	    	       			              	    	 var recordSelected = combo.getStore().getAt(0);                     
	    	       			               	        combo.setSelection(recordSelected);
	    	       			              	    },
	    	       			              	}, 
	    	    						}
		                            	]
		                    	},
		                    	
		                    	{
		            				xtype: 'tsb-datagrid',
		            				usePagingToolbar : false,
		            				useRecordToolbar : false,
		            				title: 'Fields',
		            				reference: 'ctlPivotItems',
//		            				autoScroll: true,
		            				flex : 1,
		            				plugins: [
		            					'gridexporter',
		            					'gridfilters',
		            					'clipboard'
		            	    		],
		            				bind: {
		            	    			store: '{pivotItems}'
		            	    		},	
		            				columns: {
		            					items: [{
		            						dataIndex: 'text',
		            						text: 'Field Name',
		            						flex: true
		            					}]
		            				},				
		            				viewConfig: {
		            					plugins: {
		            						ptype: 'gridviewdragdrop'
		            					},
		            					listeners: {
		            		                drop: 'onDropGrid'
		            		            }
		            				}
		            			},
		            			{
		            				xtype: 'splitter',
		            				border: 1,
		            				style: {borderColor: '#3193c', borderStype: 'solid'}
		            			},
		            			{
		            				xtype: 'tsb-datagrid',
		            				usePagingToolbar : false,
		            				useRecordToolbar : false,
		            				title: 'Top Axis',
		            				reference: 'ctlTopAxis',
		            				flex : 1,
		            				 plugins: [Ext.create("Ext.grid.plugin.CellEditing", {
		            		                clicksToEdit: 2,
		            		                enabled: true,
		            		                listeners: {
		            		                    beforeedit: function (e, editor) {
		            		                        //  if (editor.rowIdx == 1)
		            		                        //   return false;
		            		                    }
		            		                }
		            		            })],
		            				store: {
//		            					type: 'leftAxisItems'
		            				},
		            				columns: {
		            					items: [{
		            						dataIndex: 'text',
		            						text: 'Field Name',
		            						css: 'height:20px',
		            						editable: false,
		            						width:155
		            					},
		            					{
		            						dataIndex: 'value',
		            						text: 'Value',
		            						flex: 1,
		            						editor: {
		            		                    xtype: 'textfield',
		            		                    enableKeyEvents: true,
		            		                    selectOnFocus: true,
		            		                    flex: 1,
		            		                    listeners: {
		            		                        specialkey: function (field, e) {
//		            		                            specialKeyFunction(field, e);
		            		                        }
		            		                    }
		            		                }
		            					}
		            					]
		            				},
		            				viewConfig: {
		            					plugins: {
		            						ptype: 'gridviewdragdrop'
		            					},
		            					listeners: {
		            		                drop: 'onDropGrid'
		            		            }
		            				},
		            			},
		            			{
		            				xtype: 'splitter',
		            				border: 1,
		            				style: {borderColor: '#3193c', borderStype: 'solid'}
		            			},
		            			{
		            				xtype: 'tsb-datagrid',
		            				usePagingToolbar : false,
		            				useRecordToolbar : false,
		            				title: 'Left Axis',
		            				reference: 'ctlLeftAxis',
		            				flex:1,
		            				store: {
//		            					type: 'leftAxisItems'
		            				},
		            				columns: {
		            					items: [{
			            						dataIndex: 'text',
			            						text: 'Field Name',
			            						css: 'height:20px',
			            						editable: false,
			            						width:155
			            					},
			            					{
			            						dataIndex: 'value',
			            						text: 'Value',
			            						flex: 1,
			            						editor: {
			            							allowBlank:true
			            						}
			            					}
		            					]
	            				},
	            				viewConfig: {
	            					plugins: {
	            						ptype: 'gridviewdragdrop'
	            					},
	            					listeners: {
	            		                drop: 'onDropGrid'
	            		            }
	            				},
	            				
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