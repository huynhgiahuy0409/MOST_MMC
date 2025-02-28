Ext.define('MOST.view.operation.vsrchecklist.ForkliftMega', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-forkliftmega',
	
	requires: [
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	 FORKLIFT_MEGA_GRID_REF_NAME: 'refMegaFGrid',
	 FORKLIFT_MEGA_STORE_NAME: 'megaFList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			items: [{
	    		xtype: 'container',
	            layout: {
	                type: 'hbox',
	                align: 'stretch'
	            },
	            items: [
	            	{
						xtype: 'fieldset',
						title: ViewUtil.getLabel('megaSum'),
		                layout: {
		                    type: 'vbox',
		                    align: 'stretch'
		                },
		                flex: 1,
		                margin: '0 0 0 0',
			            items: [
			            	{
			                    xtype: 'combo',
			                    reference:'ctlFLPurpose',
								fieldLabel: ViewUtil.getLabel('purpose'),
								labelWidth: 50,
			                    width:300,
			                    align : 'right',
			                    bind: {
			    	    			store: '{purposeCombo}'
			    	    		},
			    	    		editable: false,
			    	    		displayField: 'scdNm',
			   					valueField: 'scd',
			   					queryMode: 'local',
			   					value: '',
			   					listeners: {
						        	select : 'onChangeFLPurpose'
								}
			            	},
			            	{
					            xtype: 'panel',
					            layout: 'fit',
					            flex: 1,
					            items: [{	
				    				xtype: 'tsb-datagrid',
				    				reference: me.FORKLIFT_MEGA_GRID_REF_NAME,
				    				flex: 1,
				    				usePagingToolbar : false,
				    				stateful : true,
				    				stateId : 'stateMegaFGrid',
				    				plugins: [
				    					'gridexporter',
				    					'gridfilters',
				    					'clipboard'
				    				],
				    				bind: {
				    					store: '{' + me.FORKLIFT_MEGA_STORE_NAME + '}'
				    				},
				    				selModel: {
				    					type: 'spreadsheet',
				    					cellSelect: false
				    				},
				    				listeners : {
				    					cellclick: 'onForkliftMegaGridClick'
				    				},
				    				
				    				columns: {
				    					defaults: {
				    						style : 'text-align:center',
				    						align: 'center'
				    					},
				    					items: GridUtil.getGridColumns('VSRForkliftMega')
				    				}
			    				}]
			            	}]
	            		},
		            	{
		                	xtype: 'fieldset',
		                	title: 'Detail',
		                	padding : '3 3 3 3',
			                layout: {
			                    type: 'vbox'
			                },
			                margin: '0 0 0 5',
			                items: [{
		                		xtype: 'container',
		    		            layout: {
		    		                type: 'hbox'
		    		            },
		    		            margin: '0 0 0 0',
		    		            items:[{
	    		            		xtype: 'container',
			    		            layout: {
			    		                type: 'vbox'
			    		            },
			    		            margin: '0 0 0 0',
	    	    		            flex : 1,
			    		            defaults: {
				                        labelAlign: 'right',
				                        labelWidth: 92,
				                        margin: '2 0 0 0'
				                    },
				                    items: [{
		        						xtype: 'combo',
		        						fieldLabel: ViewUtil.getLabel('flNo'),
		        						reference:'refFlNo',
		    							width: 250,
		                                bind: {
		                	    			store: '{flNoCombo}'
		                	    		},
		    							displayField: 'engNm',
		    					        valueField: 'eqNo',
		               					queryMode: 'local',
		               					editable: false,
		               					listeners: {
		    								change : 'onChangeFlNo',
		    								select: 'onFlNoSelect',
		    								afterrender: function(combo) {
		    							        if (!combo.isValid()) {
		    							            combo.addCls('x-form-invalid-field');
		    							        } else {
		    							            combo.removeCls('x-form-invalid-field');
		    							        }
		    							    }
		    							},
		    							emptyText: 'Select',
		    							forceSelection: true,
		    							allowBlank: false
		        					},{
	    								xtype:'textfield',
	    								reference:'refFLCapacity',
	    								fieldLabel: ViewUtil.getLabel('capacity'),
	    								hidden:true,
	    								editable:false,
	    								width: 250
	    			   				},{
	    								xtype:'textfield',
	    								reference:'refFLCapacityDescr',
	    								fieldLabel: ViewUtil.getLabel('capacity'),
	    								editable:false,
	    								width: 250
	    			   				},{
	    								xtype:'combo',
	    								reference:'refFLWorkingArea',
	    								fieldLabel: ViewUtil.getLabel('vsrWorkingArea'),
	    								bind: {
		                	    			store: '{workAreaCombo}'
		                	    		},
		                	    		displayField: 'scdNm',
		    					        valueField: 'scd',
		    					        queryMode: 'local',
		    					        emptyText: 'Select',
		    					        allowBlank: false,
		    					        forceSelection: true,
		    					        listeners: {
		    					        	select : 'onChangeFLWorkArea',
		    					        	afterrender: function(combo) {
		    							        if (!combo.isValid()) {
		    							            combo.addCls('x-form-invalid-field');
		    							        } else {
		    							            combo.removeCls('x-form-invalid-field');
		    							        }
		    							    }
		    							},
	    								width: 250
	    			   				},{
		    		            		xtype: 'container',
				    		            layout: {
				    		                type: 'vbox'
				    		            },
				    		            defaults: {
					                        labelAlign: 'right'
					                    },
				    		            items: [
				    		            	{
		        								xtype:'combo',
		        								reference:'refFLApFp',
		        								margin: '0 0 2 0',
		        								hidden:true,
		        								fieldLabel: ViewUtil.getLabel('apFp'),
		        								labelAlign: 'right',
		        								bind: {
				                	    			store: '{APFPCombo}'
				                	    		},
				                	    		displayField: 'name',
				    					        valueField: 'code',
												queryMode: 'local',
												value: '_',
				    					        editable: false,
				    					        labelWidth: 92,
		        			   					width: 250
		        			   				},
		        			   				{
		    	                            	//xtype:'workingareamultifield',
		        			   					xtype:'textfield',
		    	            					reference:'ctlFLWorkingArea',
		    	            					allowBlank: false,
		    	            					fieldStyle: 'background-color: #ccffff;',
		    	            					margin: '0 2 0 97',
		    	            					width:183,
		    	            					listeners: {
		    	            					    afterrender: function(textfield) {
		    	            					        if (!textfield.isValid()) {
		    	            					            textfield.addCls('x-form-invalid-field'); 
		    	            					        } else {
		    	            					        	textfield.removeCls('x-form-invalid-field');
				    							        }
		    	            					    }
		    	            					}

		    	                            }
				    		            ]
				                    },{
		    		            		xtype: 'container',
				    		            layout: {
				    		                type: 'hbox'
				    		            },
				    		            defaults: {
					                        margin: '0 0 0 5',
					                        labelAlign: 'right'
					                    },
					                    items: [{
											xtype : 'radiogroup',
											reference : 'ctl_GroupForklift',
											layout : {
												type : 'vbox',
												align : 'stretch'
											},
											padding: '3 3 3 3 ',
			    					        listeners: {
			    					        	change : 'onChangeForkliftContractor'
			    							},																		
											items : [{
												xtype : 'radiofield',
												reference : 'ctlFLJPB',
												checked : false,
												name: 'contractor',
												inputValue: 'ADP',
												margin:'2 0 0 0 ',
												boxLabel : ViewUtil.getLabel('jPB')
											},
											{
												xtype : 'radiofield',
												reference : 'ctlFLContractor',
												name: 'contractor',
												inputValue: 'contractor',
												checked : false,
												margin:'2 0 0 0 ',
												boxLabel : ViewUtil.getLabel('contractor')
											},
											{
												xtype : 'radiofield',
												name: 'contractor',
												inputValue: 'nodriver',
												reference : 'ctlNoDriver',
												checked : true,
												margin:'2 0 0 0 ',
												boxLabel : ViewUtil.getLabel('vsrNoDriver')
											}]
										},{
	    	    		            		xtype: 'container',
	    			    		            layout: {
	    			    		                type: 'vbox',
	    			    		            },
	    			    		            items : [{
				        						xtype: 'combo',
				        						margin: '0 0 0 0',
				        						reference:'refFLCmbJPB',
				    							width: 140,
				                                bind: {
				                	    			store: '{empFLCombo}'
												},
												listeners: {
													select : 'onChangeJPB',
												},
				                	    		displayField: 'empNm',
				               					valueField: 'empId',
				               					queryMode: 'local',
				               					editable: false,
				           						value : 'Select'
				        					},{
				    	                		xtype: 'container',
				    	    		            layout: {
				    	    		                type: 'hbox',
				    	    		            },
				    	    		            items:[
				    	    		            	{
							    	   					xtype:'partnercdfield',
							    	   					reference:'refFLContractorCd',
							           					width:150,
							    	   					fieldLabel: '',
							    	   					params:{
							    	   						ptnrType: CodeConstants.CM_PTNRTP_CTT	//Contractor
							    	   					}
							    	   				}
												]
				        					}]
										}]
			    		            }]
		    		            },{
	    		            		xtype: 'container',
			    		            layout: {
			    		                type: 'vbox',
			    		            },
			    		            defaults: {
	    		                        labelAlign: 'right',
	    		                        labelWidth: 100,
	    		                        margin: '0 0 0 5'
	    		                    },
			    		            flex : 1,
			    		            items: [{
		        						xtype: 'combo',
		        						reference:'refFLCargoType',
		        						fieldLabel: ViewUtil.getLabel('cargoTp'),
		        						forceSelection: true,
		        						allowBlank: false,
		    							width:250,
		                                bind: {
		                	    			store: '{cargoCombo}'
		                	    		},
		                	    		displayField: 'scdNm',
		               					valueField: 'scd',
		               					queryMode: 'local',
		               					editable: false,
		           						value : ''
		        					},{
			    		            	xtype: 'container',
				    		            layout: {
				    		                type: 'hbox'
				    		            },
				    		            defaults: {
		    		                        labelAlign: 'right',
		    		                        labelWidth: 100,
		    		                        margin: '2 0 0 0',
		    		                    },
				    		            items: [
				    		            	{
							   					xtype:'partnercdtypefield',
												width: 250,
							   					fieldLabel:ViewUtil.getLabel('requestor'),
							   					allowBlank: false,
							   					reference:'refFLRequestor',
							   					params:{
					   								ptnrType: CodeConstants.CM_PTNRTP_RQT	//Requestor
							   					}
							   				}
	        			   				]
		        					},{
			    		            	xtype: 'container',
				    		            layout: {
				    		                type: 'hbox',
				    		            },
				    		            defaults: {
				    		            	margin: '2 0 0 0',
				    		            	labelWidth: 100,
		    		                        labelAlign: 'right'
		    		                    },
		    		                    items: [{
			    		                    xtype: 'label',
			    		                    width: 50,
			    		                    margin: '5 0 0 25',
			    		                    html: ViewUtil.getLabel('refNo')
			    		                },{
											xtype : 'radiogroup',
											reference : 'ctl_FL_RefNo',
											layout : {
												type : 'vbox',
												margin: '2 0 0 10',
											},
											padding: '3 3 3 3',
											items : [{
												xtype : 'radiofield',
												name: 'rfNo',
												margin :'2 0 0 0 ',
												inputValue: 'Y',
												reference : 'ctlFLCmbRef',
												checked : false
											},{
												xtype : 'radiofield',
												name: 'rfNo',
												margin :'2 0 0 0',
												inputValue: 'N',
												reference : 'ctlFLTxtRef',
												checked : true
											}]
										},{
				    		            	xtype: 'container',
	    			    		            layout: {
	    			    		                type: 'vbox'
	    			    		            },
	    			    		            defaults: {
	    			    		            	margin: '0 0 0 0',
	    			    		            	labelWidth: 100,
	    	    		                        labelAlign: 'right'
	    	    		                    },
	    	    		                    items : [{
				        						xtype: 'textfield',
				        						reference:'refFLCmbRefNo',
				    							width: 140,
				               					editable: false,
				           						value : ''
				        					},
				        					{
												xtype: 'textfield',
												margin: '2 0 0 0',
												reference: 'refFLTxtRefNo',
												editable: true,
												width: 140,
											}]
		    		                    }]
	    		                    },{
	                                    xtype: 'combo',
	                                    reference:'ctlFLDMode',
	                                    margin: '0 0 0 5',
	                                    editable: false,
	                                    fieldLabel: ViewUtil.getLabel('dMode'),
	                                    allowBlank: false,
	                                    forceSelection: true,
	                                    valueField: 'DMode',
	                                    queryMode: 'local',
	                   					bind: {
	                    	    			store: '{dmodeCombo}'
	                    	    		},
	                    	    		listeners: {
	                    	    			afterrender: function(combo) {
		    							        if (!combo.isValid()) {
		    							            combo.addCls('x-form-invalid-field');
		    							        } else {
		    							            combo.removeCls('x-form-invalid-field');
		    							        }
		    							    }
	                    	    		},
	                   					displayField: 'name',
	                   					valueField: 'code',
	                   					value : '',
		    							width:250,
	                                },{
		                            	reference: 'refForkliftEQArrTime',
		                            	margin: '2 0 0 5',
		    	    					width:250,
		    	    			        xtype: 'datetimefield',
		    	    			        allowBlank: false,
		    	    			        forceSelection: true,
		    	    			        fieldLabel: ViewUtil.getLabel('vsrEQArrTime'),
		    	    			        anchor: '100%',
		    	    			        editable:false,
		    	    			        format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		                            },{
		                            	reference: 'refForkliftStartTime',
		                            	margin: '2 0 0 5',
		    	    					width:250,
		    	    			        xtype: 'datetimefield',
		    	    			        allowBlank: false,
		    	    			        forceSelection: true,
		    	    			        fieldLabel: ViewUtil.getLabel('startTime'),
		    	    			        anchor: '100%',
		    	    			        editable:false,
		    	    			        format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		                            },{
		                            	reference: 'refForkliftEndTime',
		                            	margin: '2 0 0 5',
		                            	width:250,
		    	    			        xtype: 'datetimefield',
		    	    			        allowBlank: false,
		    	    			        forceSelection: true,
		    	    			        fieldLabel: ViewUtil.getLabel('endTime'),
		    	    			        anchor: '100%',
		    	    			        editable:false,
		    	    			        format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		                            }]
		    		            }]
	    		            },{
	    		            	xtype:'container',
	    		            	layout:{
	    		            		type:'hbox',
	    		            		align :'strecth'
	    		            	},
	    		            	flex: 1,
	    		            	items :[{
									xtype: 'textfield',
									margin: '2 0 0 5',
									flex: 1,
									labelAlign: 'right',
									labelWidth: 92,
									width : 535,
									reference: 'refForkliftRemarks',
									fieldLabel: ViewUtil.getLabel('remarks'),
									fieldStyle: 'text-transform:uppercase; background-color: #66ff99;',
			       					listeners:{
			       						change: 'onUpperCase'
			       					}
								}]
	    		            }]
                    }]
			}]
		});
		
		me.callParent();
	}
});