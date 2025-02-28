Ext.define('MOST.view.operation.vorliquidbulk.CargoSummary', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-cargoSummary',
	
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
	MAIN_GRID_REF_NAME: 'refCargoSummaryGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'cargoSummary',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [{
	            xtype: 'container',
	            margin: '0 0 0 0', // top, right, bottom, left
	            defaults:{
					margin: '0 0 0 0' // top, right, bottom, left
				},
	            layout: {
	                type: 'vbox',
	                align: 'stretch'
	            },
	            items: [{
	            	xtype :'fieldset',
	            	layout:{
	            		type:'hbox',
	            		align : 'strecth',
	            	},
	            	items:[{
	            		xtype :'container',
		            	layout:{
		            		type:'vbox'
		            	},
		            	margin : '0 0 0 0',
		            	defaults:{
		            		width : 420,
		            		labelWidth : 120,
		            		labelAlign : 'right',
		            		margin: '2 5 0 0'
		            	},
		            	items:[
		            		{
		            			xtype: 'container',
		            			width : 420,
		            			layout:{
				            		type:'hbox'
				            	},
				            	defaults:{
				            		labelAlign : 'right',
				            		//margin: '2 5 0 0'
				            	},
				            	items:[
				            		{
			            				xtype: 'combo',
			            				labelWidth : 120,
			            				width: 220,
			            				fieldLabel:  ViewUtil.getLabel('vorCommodity'),
			            				reference: 'ctlCommodityCombo',
			            				bind: {
			            					store: '{cmdtCombo}',
			            					value: '{selectedCargoSummary.cmdtCd}',			            						
			            				},
			    	    	    		displayField: 'scdNm',
			    	   					valueField: 'scd',
			    	   					queryMode: 'local',
			    	   					value : '',
			    	   					emptyText: 'Select',
			    	   					forceSelection:true,
			    	   					allowBlank: false,
			    	   					listeners: {
											change: 'cmdtChanged'
										}
			            			}
				            		,{
			            				xtype: 'combobox',
			            				width: 200,
			            				labelWidth: 60,
			            				reference :'ctlBlNo',
										fieldLabel:  ViewUtil.getLabel('blSnNo'),
			            				bind: '{selectedCargoSummary.blNo}',
		    							editable: false,
										bind: {
			            					store: '{blSnCombo}',
			            					value: '{selectedCargoSummary.blNo}',			    
			            				},
										displayField: 'scdNm',
			    	   					valueField: 'scd',
										queryMode: 'local',
										forceSelection:true,
			    	   					allowBlank: false,
										listeners: {
											change: 'blSnChanged'
										}
			            			}
				            	]
		            		}
		            		
		            		,{
            				xtype: 'combo',
            				fieldLabel:  ViewUtil.getLabel('vorCargoType'),
            				reference: 'ctlCargoType',
							bind: {
								store: '{cargoLiquidCombo}',
								value: '{selectedCargoSummary.cgTpCd}',
							},
					        displayField: 'scdNm',
					        valueField: 'scd',
    	   					queryMode: 'local',
    	   					value : '',
    	   					emptyText: 'Select',
    	   					forceSelection:true
            			},{
            				xtype: 'combo',
            				fieldLabel:  ViewUtil.getLabel('vorTerminalOperator'),
            				reference: 'ctlTerminalOperator',
            				bind: {
            						store: '{tkOprCombo}',
            						value: '{selectedCargoSummary.tkOpr}',
            				},
					        displayField: 'scdNm',
					        valueField: 'scd',
    	   					queryMode: 'local',
    	   					value : '',
    	   					emptyText: 'Select',
    	   					forceSelection:true
            			},{
            				xtype: 'combo',
            				fieldLabel:  ViewUtil.getLabel('vorPkgType'),
            				reference: 'ctlPkgType',
							bind: {
									store: '{pkgTpCombo}',
									value: '{selectedCargoSummary.pkgTpCd}',	
							},
					        displayField: 'scdNm',
					        valueField: 'scd',
    	   					queryMode: 'local',
    	   					value : '',
    	   					emptyText: 'Select',
    	   					forceSelection:true
            			},{
            				xtype: 'numberfield',
            				reference: 'ctlTonHdlAmt',
            				fieldLabel: ViewUtil.getLabel('vorTonnageHandled'),
							allowBlank: false,
							minValue : 0,
							decimalPrecision : 3,
							bind: '{selectedCargoSummary.tonHdlAmt}',
							listeners: {
								change: 'calcPumpRate',
							}
            			}]
	            	},{
	            		xtype :'container',
		            	layout:{
		            		type:'vbox'
		            	},
		            	defaults:{
		            		width : 270,
		            		labelWidth : 150,
		            		labelAlign : 'right',
		            		margin: '2 5 0 0'
		            	},				            	
		            	items:[{
            				xtype: 'combo',
            				fieldLabel: ViewUtil.getLabel('vorLoadDischarge'),
            				reference: 'ctlLoadDischarge',
            				bind: {
            						store: '{operationTpCombo}',
            						value: '{selectedCargoSummary.jobTpCd}',
            				},
    	    	    		displayField: 'scdNm',
    	   					valueField: 'scd',
    	   					queryMode: 'local',
    	   					value : '',
    	   					emptyText: 'Select',
    	   					forceSelection:true
            			},{
            				xtype: 'combo',
            				fieldLabel: ViewUtil.getLabel('vorShipper'),
            				reference: 'ctlShipper',
							bind: {
								store: '{shprCnsneCombo}',
								value: '{selectedCargoSummary.shprCnsne}',
							},
					        displayField: 'scdNm',
					        valueField: 'scd',
    	   					queryMode: 'local',
    	   					value : '',
    	   					emptyText: 'Select',
    	   					forceSelection:true
            			},{
            				xtype: 'combo',
            				fieldLabel: ViewUtil.getLabel('vorConsignee'),
            				reference: 'ctlConsigne',
							bind: {
								store: '{cnsneCombo}',
								value: '{selectedCargoSummary.cnsne}',
							},
					        displayField: 'scdNm',
					        valueField: 'scd',
    	   					queryMode: 'local',
    	   					value : '',
    	   					emptyText: 'Select',
    	   					forceSelection:true
            			},{
            				xtype: 'combo',
            				fieldLabel: ViewUtil.getLabel('vorLines'),
            				reference: 'ctlVORLines',
							bind: {
									store: '{hoseTpCombo}',
									value: '{selectedCargoSummary.hoseTpCd}',
							},
					        displayField: 'scdNm',
					        valueField: 'scd',
    	   					queryMode: 'local',
    	   					value : '',
    	   					emptyText: 'Select',
    	   					forceSelection:true,
    	   					allowBlank: false
            			},{
            				xtype: 'numberfield',
            				reference :'ctlPumpRate',
            				decimalPrecision: 3,
            				fieldLabel: ViewUtil.getLabel('vorPumpingRate'),
            				bind: '{selectedCargoSummary.pumpRate}',
							allowBlank: false,
							readOnly: true
            			}]
	            	},{
	            		xtype :'container',
		            	layout:{
		            		type:'vbox'
		            	},
		            	margin : '0 0 0 0',
		            	defaults:{
		            		width : 290,
		            		labelWidth : 100,
		            		labelAlign : 'right',
		            		margin: '2 5 0 0'
		            	},				            	
		            	items:[{
	            			xtype: 'datetimefield',
	            			reference :'ctlHoseOnDt',
	            			fieldLabel : ViewUtil.getLabel('vorHoseOn'),
	            			bind: '{selectedCargoSummary.hoseOnDt}',
       						format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
						
	            		},{
	            			xtype: 'datetimefield',
	            			reference :'ctlStDt',
	            			fieldLabel : ViewUtil.getLabel('vorCommenceTime'),
	            			bind: '{selectedCargoSummary.stDt}',
       						format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							listeners: {
								change: function() {
									var sc = this.lookupReferenceHolder();
									sc.calcPumpRate();
								}
							}
	            		},{
	            			xtype: 'datetimefield',
	            			reference :'ctlEndDt',
	            			fieldLabel : ViewUtil.getLabel('vorCompletionTime'),
	            			bind: '{selectedCargoSummary.endDt}',
       						format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							listeners: {
								change: function() {
									var sc = this.lookupReferenceHolder();
									sc.calcPumpRate();
								}
							}
	            		},{
	            			xtype: 'datetimefield',
	            			reference :'ctlHoseOffDt',
	            			fieldLabel : ViewUtil.getLabel('vorHoseOff'),
	            			bind: '{selectedCargoSummary.hoseOffDt}',
       						format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
	            		},{
	            			xtype : 'container',
	            			layout:{
	            				type : 'hbox',
	            				align: 'stretch'
	            			},
	            			width : 400,
			            	defaults:{
			            		width : 160,
			            		labelWidth : 100,
			            		labelAlign : 'right',
			            		margin: '0 5 0 0'
			            	},					            			
	            			items:[{
	            				xtype: 'textfield',
	            				reference :'ctlLineNo',
	            				fieldLabel: ViewUtil.getLabel('noOfLine'),
	            				bind: '{selectedCargoSummary.lineNumber}',
	            				maskRe: /[0-9]/,
    							allowBlank: false
	            			},{
	            				xtype: 'checkbox',
	            				reference :'ctlJobCmplYn',
	            				bind: '{selectedCargoSummary.jobCmplYn}',
                                inputValue: 'Y',
                                uncheckedValue: 'N',
	            				width : 90,
	            				labelWidth : 70,
    							allowBlank: false,
    							fieldLabel: 'Completed'
	            			}]
	            		}]
	            	}]
	            },{
                    xtype: 'fieldset',
                    hidden: true,
                    title: 'OGA Status',
                    padding : '0 3 3 3',
                    layout: {
                        type: 'hbox'
                    },
                    margin: '0 0 0 0',
                    defaults:{
                    	labelAlign:'right',
                    	margin: '3 5 0 0'
                    },
                    items: [{
                        xtype: 'textfield',
                        reference: 'refOGAStatus',
                        labelWidth: 50,
                        width: 170,
                        editable:false,
                        fieldLabel: ViewUtil.getLabel('vorHealth')
                  	},{
                        xtype: 'textfield',
                        reference: 'refOGADate',
                        width: 130,
                        editable:false
                  	},{
                        xtype: 'textfield',
                        reference: 'refOGAQuarantine',
                        width: 300,
                        fieldStyle: 'background-color: #ffff33;',
                        editable:false
                  	}]
	            }]
			},{
	        	xtype: 'panel',
	        	layout: 'fit',
	        	flex: 1,
	        	margin: '3 0 0 0',
	        	items: [{				
	                xtype: 'tsb-datagrid',
	                reference: me.MAIN_GRID_REF_NAME,
	                usePagingToolbar : false,
					stateful : true,
					stateId : 'stateCargoSummaryGrid',
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
		            	cellClick: 'onClickCargoSummaryList'
		         	},   
	                columns: {
		            	defaults: {
		            		style : 'text-align:center',
		            		align : 'center'
		            	},
		            	items: GridUtil.getGridColumns('CargoSummary'),
	                }				
	        	}]
				
				
			},{
    	         	
	            xtype: 'container',
	            padding : '3 3 3 3',
	            margin: '0 0 0 0',
	            defaults:{
					margin: '0 0 3 0' // top, right, bottom, left
				},
	            layout: {
	                type: 'vbox',
	                align: 'stretch'
	            },
	            items: [{    	         	
                    xtype: 'fieldset',
                    padding : '3 3 3 3',
                    margin : '0 0 0 0',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                        labelAlign: 'right',
                        labelWidth: 70
                    },
                    items: [{
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        defaults: {
                            labelAlign: 'right'
                        },
                        items: [{
                              xtype: 'label',
                              width: 90,
                              margin: '0 0 0 90',
                              text: ViewUtil.getLabel('vorPlannedMt')
                    	},{
							  xtype: 'label',
							  width: 90,
							  margin: '0 0 0 5',
							  text: ViewUtil.getLabel('vorTotalMtHandled')
						},{
						      xtype: 'label',
							  width: 120,
							  margin: '0 0 0 40',
							  text: ViewUtil.getLabel('vorBalance')
						},{
                              xtype: 'label',
                              width: 90,
                              margin: '0 0 0 70',
                              text: ViewUtil.getLabel('vorPlannedMt')
                    	},{
							  xtype: 'label',
							  width: 90,
							  margin: '0 0 0 0',
							  text: ViewUtil.getLabel('vorTotalMtHandled')
						},{
						      xtype: 'label',
							  width: 90,
							  margin: '0 0 0 40',
							  text: ViewUtil.getLabel('vorBalance')
						}]
                    },{
                        xtype: 'container',
                        defaults: {
                            labelAlign: 'right'
                        },
                        layout: {
                            type: 'hbox'
                        },
                        items: [{
                            xtype: 'label',
                            margin: '3 0 0 20',
                            width: 50,
                            text: ViewUtil.getLabel('vorLoading')
                        },{
                            xtype: 'textfield',
                            reference : 'ctlLoadPlanMt',
                            margin: '0 5 0 0',
                            width: 100,
                            fieldLabel: '',
                            readOnly:true
                            //bind: '{theBerthing.loadPlanMtS}'
                        },{
                            xtype: 'textfield',
                            reference : 'ctlLoadActualMt',
                            margin: '0 5 0 0',
                            fieldLabel: '',
                            width: 100,
                            readOnly:true
                            //bind: '{theBerthing.loadActualMtS}'
                        },{
                            xtype: 'textfield',
                            reference : 'ctlLoadBalance',
                            margin: '0 5 0 0',
                            //reference: 'refVORBalLoadMt',
                            fieldLabel: '',
                            width: 100,
                            readOnly:true
                            //bind: '{theBerthing.balLoadMt}'
                        },{
                        	xtype: 'label',
                        	 margin: '3 0 0 40',
                        	width: 60,
                            text: ViewUtil.getLabel('vorDischarge')
                        },{
                            xtype: 'textfield',
                            reference : 'ctlDisPlanMt',
                            margin: '0 5 0 0',
                            width: 100,
                            fieldLabel: '',
                            readOnly:true
                        },{
                            xtype: 'textfield',
                            reference : 'ctlDisActuaMt',
                            margin: '0 5 0 0',
                            fieldLabel: '',
                            width: 100,
                            readOnly:true
                        },{
                            xtype: 'textfield',
                            reference : 'ctlDisBalance',
                            margin: '0 5 0 0',
                            fieldLabel: '',
                            width: 100,
                            readOnly:true
                        }]
                    }]
	            }]
	        }],
	        
			dockedItems: [{
    				xtype: 'toolbar',
    				enableOverflow: true,
    				defaults: {
    					labelAlign: 'right',
    					margin : '0 0 0 2',
    	        	},
    				items: ['->',{
    					xtype: 'button',
    					reference : 'btnNew',
    					text: ViewUtil.getLabel('clear'),
    					ui: 'create-button',
    					iconCls: 'fa fa-refresh',
    					listeners: {
    						click: 'onNewCargoSummary'
    					}
    				},{
    					xtype: 'button',
    					reference : 'btnAdd',
    					text: ViewUtil.getLabel('add'),
    					ui: 'create-button',
    					iconCls: 'x-fa fa-plus',
    					listeners: {
    						click: 'onAddCargoSummary'
    					}
    				}
    				, {
    					xtype: 'button',
    					reference : 'btnUpdate',
    					text: ViewUtil.getLabel('update'),
    					ui: 'create-button',
    					iconCls: 'x-fa fa-plus',
    					listeners: {
    						click: 'onUpdateCargoSummary'
    					}
    				},{
    					xtype: 'button',
    					reference : 'btnDelete',
    					itemId: 'deleteButton',
    					text: ViewUtil.getLabel('delete'),
    					ui: 'delete-button',
    					iconCls: 'x-fa fa-minus',
    					listeners: {
    						click: 'onRemoveCargoSummary'
    					}
    				}]
//    			}]
			}]	
		});
		
		me.callParent();
	}
});