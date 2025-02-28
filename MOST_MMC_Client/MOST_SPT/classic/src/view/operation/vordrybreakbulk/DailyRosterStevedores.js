Ext.define('MOST.view.operation.vordrybreakbulk.DailyRosterStevedores', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-dailyRosterStevedores',
	
	requires: [
	],
	layout:{
		type:'hbox',
		align:'stretch'
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	STEVEDORE_GRID_REF_NAME: 'refListStevedoreGrid',			
	STEVEDORE_STORE_NAME: 'stevedoreList',
	TRIMMING_GRID_REF_NAME: 'refListTrimmingGrid',			
	TRIMMING_STORE_NAME: 'trimmingList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	initComponent: function() {
		var me = this;
			
		Ext.apply(me, {
			items: [
				{
					xtype: 'container',
		            layout: {
		                type: 'hbox',
		                align: 'stretch'
		            },
		            flex:1,
		            items:
		            	[{
		            		xtype: 'container',
		            		layout: {
		    	                type: 'vbox',
		    	                align:'stretch'
		    	            },
		    	            margin: '3 0 3 5',
		    	            defaults: {
		                        margin: '2 0 0 5',
		                        labelAlign: 'right'
		                    },
		                    flex:1,
		                    items: [{
			                    	xtype: 'fieldset',
			                    	title: ViewUtil.getLabel('vorPortWorker'),
			                    	height: '80',
			                    	layout:{
			                    		type: 'vbox'
			                    	},
			                    	defaults: {
				                        margin: '2 5 0 5',
				                        labelAlign: 'right',
				                        labelWidth: 80
				                    },
			                    	items:[{
				                      		xtype: 'textfield',
				                            flex: 1,
				                            fieldLabel: ViewUtil.getLabel('vorSupervisor'),
				    						bind: '{theVslOperation.supervisor}',
				    						editable : false
				                      	}
			                    	]
			                    },{
			                    	xtype: 'fieldset',
			                    	title: ViewUtil.getLabel('vorCraneOperator'),
			                    	layout:{
			                    		type: 'vbox'
			                    	},
			                    	flex:4,
			                    	defaults: {
				                        margin: '2 5 0 5',
				                        labelAlign: 'right',
				                        labelWidth: 80
				                    },
			                    	items:[
			                    		 {
					                      		xtype: 'textfield',
					                            flex:1,
					                            fieldLabel: ViewUtil.getLabel('vorBG'),
					    						bind: '{theVslOperation.bg}',
					    						editable : false
					                      	},{
					                      		xtype: 'textfield',
					                      		flex:1,
					                            fieldLabel: ViewUtil.getLabel('vorLL'),
					    						bind: '{theVslOperation.ll}',
					    						editable : false
					                      	},{
					                            xtype: 'textfield',
					                            flex:1,
					                            fieldLabel: ViewUtil.getLabel('vorCU'),
					    						bind: '{theVslOperation.cu}',
					    						editable : false
					                        },{
					                            xtype: 'textfield',
					                            flex:1,
					                            fieldLabel: ViewUtil.getLabel('vorSHIPCR'),
					    						bind: '{theVslOperation.conventional}',
					    						editable : false
					                        }
			                    	]
			                    },{
			                    	xtype: 'fieldset',
			                    	flex :3,
			                    	title: ViewUtil.getLabel('vorForkliftDrivers'),
			                    	layout:{
			                    		type: 'vbox'
			                    	},
			                    	defaults: {
				                        margin: '2 5 0 5',
				                        labelAlign: 'right',
				                        labelWidth: 80
				                    },
			                    	items:[
			                    		{
				                            xtype: 'textfield',
				                            flex:1,
											fieldLabel: ViewUtil.getLabel('vorWharf'),
											labelWidth:90,
				    						bind: '{theVslOperation.wharf}',
				    						editable : false
				                        },{
				                            xtype: 'textfield',
				                            flex:1,
											fieldLabel: ViewUtil.getLabel('vorHatch'),
											labelWidth:90,
				    						bind: '{theVslOperation.hatch}',
				    						editable : false
				                        },{
				                            xtype: 'textfield',
				                            flex:1,
											fieldLabel: ViewUtil.getLabel('vorWarehouseYard'),
											labelWidth:90,
				    						bind: '{theVslOperation.yard}',
				    						editable : false
				                        }
			                    	]
			                    }
		                    ]
		            	},{
		            		xtype: 'fieldset',
		            		flex: 1,
		            		margin: '17 0 3 5',
		                    layout: {
		    	                type: 'vbox',
		    	                align: 'stretch'
		    	            },
		    	            defaults: {
		                        margin: '5 5 0 5',
		                        labelAlign: 'right',
		                        labelWidth: 100
		                    },
		                    items: [{
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('vorStevedoresCont'),
		    						bind: '{theVslOperation.steveComp}',
		    						editable : false
		                        },{
		    	                    xtype: 'tsb-datagrid',
		    	                    reference: me.STEVEDORE_GRID_REF_NAME,
		    	                    usePagingToolbar : false,
		    	    				stateful : true,
		    	    				flex:1,
		    	    				stateId : 'stateListStevedoreGrid',
		    	    				plugins: [
		    	    					'gridexporter',
		    	    					'gridfilters',
		    	    					'clipboard'
		    	    	    		],
		    	    	    		bind: {
		    	    	    			store: '{' + me.STEVEDORE_STORE_NAME + '}'
		    	    	    		},
		    	    	    		selModel: {
		    	    					type: 'spreadsheet',
		    	    					cellSelect: false
		    	    				},
		    	                    columns: {
		    	    	            	defaults: {
		    	    	            		style : 'text-align:center',
		    	    	            		align : 'center'
		    	    	            	},
		    	    	            	items: GridUtil.getGridColumns('StevedoreList'),
		    	                    }
		    			        }
	                    	]
		            	},{
		            		xtype: 'fieldset',
		            		flex: 1,
		            		margin: '17 0 3 5',
		            		defaults: {
		                        labelAlign: 'right',
		                        labelWidth: 85
		                    },
		                    layout: {
		    	                type: 'vbox',
		    	                align: 'stretch'
		    	            },
		    	            defaults: {
		                        margin: '5 5 0 5',
		                        labelAlign: 'right'
		                    },
		                    items: [
		                    	{
		                      		xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('vorTrimmingCont'),
									bind: '{theVslOperation.trimmingComp}',
									editable : false,
									labelWidth: 100
		                        },{
		    	                    xtype: 'tsb-datagrid',
		    	                    reference: me.TRIMMING_GRID_REF_NAME,
		    	                    usePagingToolbar : false,
		    	    				stateful : true,
		    	    				flex:1,
		    	    				stateId : 'stateListStevedoreGrid',
		    	    				plugins: [
		    	    					'gridexporter',
		    	    					'gridfilters',
		    	    					'clipboard'
		    	    	    		],
		    	    	    		bind: {
		    	    	    			store: '{' + me.TRIMMING_STORE_NAME + '}'
		    	    	    		},
		    	    	    		selModel: {
		    	    					type: 'spreadsheet',
		    	    					cellSelect: false
		    	    				},
		    	    				listeners: {
		    	    						
		    	    				},
		    	                    columns: {
		    	    	            	defaults: {
		    	    	            		style : 'text-align:center',
		    	    	            		align : 'center'
		    	    	            	},
		    	    	            	items: GridUtil.getGridColumns('TrimmingList')
		    	                    }
		    			        }
	                    	]
	            	}]
				}
			]
		});
		
		me.callParent();
	}
});