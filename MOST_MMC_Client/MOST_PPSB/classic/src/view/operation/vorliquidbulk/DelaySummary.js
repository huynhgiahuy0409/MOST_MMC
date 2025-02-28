Ext.define('MOST.view.operation.vorliquidbulk.DelaySummary', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-delaySummary',
	
	requires: [
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	
	layout : {type  : 'vbox', align : 'stretch'},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refDelaySummaryGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'delaySummary',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	
	initComponent: function() {
		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId :'delaySummaryGridEditor',
			listeners: {
				cancelEdit: 'onCancelEdit',
				validateedit: 'onValidateDelaySummaryEdit',
				edit: 'onEdit'
			}
		});
				
		Ext.apply(me, {
			items: [{
	                xtype: 'container',
	                layout: {
	              	  type: 'hbox',
	              	  align: 'stretch'
	                },
	                defaults:{
	                	labelWidth: 100,
	                	labelAlign :'right',
	                	margin : '2 0 0 5',
	                },
	                items:[
	                	{
	            			xtype: 'textfield',
	            			fieldLabel: ViewUtil.getLabel('vorDelayCode'),
	            			bind: '{selectedDelay.delayCode}',
	            			reference:'refTxtDelayCode',
	            			allowBlank: true,
	    					triggers: {
	    	                    someField: {
	    	                        cls: 'fa-search',
	    	                        scope: 'controller',
	    	                        handler: 'onOpenDelayCodePopup'
	    	                    }
	    	                },
	            			listeners: {
	            				change: function(field, newValue){
          			        	   field.setValue(newValue.toUpperCase());
	            				},
	            				focusleave:'onCheckedContractor'
	            			}
						},{ 
	       					xtype: 'textfield',
	       					fieldLabel: ViewUtil.getLabel('vorDelayDesc'),
	       					flex:1,
	       					bind: '{selectedDelay.delayDesc}',
	       					reference:'refTxtDelayCodeName',
	       					editable: false
	            		},{ 
	       					xtype: 'textfield',
	       					fieldLabel: ViewUtil.getLabel('vorAccDelay'),
	       					bind: '{selectedDelay.accDelay}',
	       					width : 160,
	       					reference:'refTxtAcptYN',
	       					editable: false
	            		}
	                ]
	            },{
	                xtype: 'container',
	                layout: {
	              	  type: 'hbox',
	              	  align: 'stretch'
	                },
	                defaults:{
	                	labelWidth: 100,
	                	labelAlign :'right',
	                	margin : '2 0 0 5',
	                },
	                items:[{
							xtype: 'combo',
							fieldLabel: ViewUtil.getLabel('vorCargoType'),
							reference : 'refCargoType',
							bind: {
								store: '{cargoLiquidCombo}',
								value: '{selectedDelay.cgTpCd}'
							},
					        displayField: 'scdNm',
					        valueField: 'scd',
					        queryMode: 'local',
					        editable: false,
					        allowBlank: true,
					        forceSelection : true,
					        matchFieldWidth: true,
						},{
							xtype: 'datetimefield',
							reference : 'refDelayStartTime',
							fieldLabel: ViewUtil.getLabel('vorStartTime'),
							bind: '{selectedDelay.startTime}',
	   						format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
	   						listeners: {
	   							select: 'calcRowDelayTime',
							},
							allowBlank: true,
							width : 250,
							editable : true
						},{
							xtype: 'datetimefield',
							reference : 'refDelayEndTime',
							fieldLabel: ViewUtil.getLabel('vorEndTime'),
							bind: '{selectedDelay.endTime}',
							margin : '2 0 0 20',
							labelWidth : 50,
							width : 200,
	   						format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
	   						listeners: {
	   							select: 'calcRowDelayTime',
							},
							allowBlank: true,
							editable : true
						},
						{
							xtype: 'combo',
							fieldLabel: ViewUtil.getLabel('hatchNo'),
							reference : 'refHatchNoCombo',
							bind: {
								store: '{hatchNoCombo}',
								value: '{selectedDelay.hatchNo}'
							},
							labelWidth: 120,
					        displayField: 'scdNm',
					        valueField: 'scd',
					        queryMode: 'local',
					        editable: false,
					        allowBlank: true,
					        forceSelection : true,
					        matchFieldWidth: true,
						}
	                ]
	            },{
	                xtype: 'container',
	                layout: {
	              	  type: 'hbox',
	              	  align: 'stretch'
	                },
	                defaults:{
	                	labelWidth: 100,
	                	labelAlign :'right',
	                	margin : '2 0 0 5',
	                },
	                items:[{
							xtype: 'textfield',
							fieldLabel: ViewUtil.getLabel('rmk'),
							bind: '{selectedDelay.remark}',
							reference: 'refRemarks',
							flex: 0.6
						},{
							xtype: 'textfield',
							reference: 'refDelayTimeHourMin',
							fieldLabel: 'Time(Hour/Minute)',
							bind: '{selectedDelay.timeHourMin}',
							margin : '2 0 0 20',
							flex: 0.2
						},{
							xtype: 'textfield',
							labelWidth: 80,
							reference: 'refDelayTimeHourly',
							fieldLabel: 'Time(Hourly)',
							bind: '{selectedDelay.timeHourly}',
							flex: 0.2
						}
	                ]
	            },{
		            xtype: 'container',
		            flex: 1,
		            layout: {
		                type: 'hbox',
		                align: 'stretch'
		            },
		            items: [
		                {

		                    xtype: 'tsb-datagrid',
		                    reference: me.MAIN_GRID_REF_NAME,
		                    usePagingToolbar : false,
		    				stateful : true,
		    				flex:1,
		    				stateId : 'stateDelaySummaryGrid',
		    				plugins: [
		    					//rowEditing,
		    					'gridexporter',
		    					'gridfilters',
		    					'clipboard'
		    	    		],
		    	    		margin : '5 0 0 0',
		    	    		bind: {
		    	    			store: '{' + me.MAIN_STORE_NAME + '}'
		    	    		},
		    	    		selModel: {
		    					type: 'spreadsheet',
		    					cellSelect: false
		    				},
		    				listeners: {
	    						cellclick: 'onDelaySummaryGridClick'
		    				},
		                    columns: {
		    	            	defaults: {
		    	            		style : 'text-align:center',
		    	            		align : 'center',
		    	            		width : 120
		    	            	},
		    	            	items: GridUtil.getGridColumns('DelaySummary'),
		                    }
				        }
		            ]
		        }
			],
			dockedItems: [{
				xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right',
					margin : '0 0 0 2'
	        	},
				items: [{
                    xtype: 'textfield',
                    reference: 'refVORTotalDelayTime',
                    fieldLabel: ViewUtil.getLabel('vorTotalDelayTime'),
                    readOnly : true,
                    labelAlign :'right',
                    labelWidth: 100
                },'->',{
					xtype: 'button',
					reference : 'btnNewDelay',
					text: ViewUtil.getLabel('clear'),
					ui: 'create-button',
					iconCls: 'fa fa-refresh',
					listeners: {
						click: 'onNewDelaySummary'
					}
				},{
					xtype: 'button',
					text: ViewUtil.getLabel('add'),
					ui: 'create-button',
					iconCls: 'x-fa fa-plus',
					listeners: {
						click: 'onAddDelaySummary'
					}
				},{
					xtype: 'button',
					reference: 'refDelaySaveBtn',
					text: ViewUtil.getLabel('update'),
					ui: 'update-button',
					iconCls: 'x-fa fa-plus',
					listeners: {
						click: 'onSaveDelaySummary'
					}
				}, {
					xtype: 'button',
					itemId: 'deleteButton',
					reference :'refDelayDeleteBtn',
					text: ViewUtil.getLabel('remove'),
					ui: 'delete-button',
					iconCls: 'x-fa fa-minus',
					listeners: {
						click: 'onRemoveDelaySummary'
					}
				}]
			}]
		});
		
		me.callParent();
	}
});