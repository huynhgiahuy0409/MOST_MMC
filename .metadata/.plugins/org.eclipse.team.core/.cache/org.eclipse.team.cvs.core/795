Ext.define('MOST.view.operation.vsrchecklist.TrailerMega', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-trailermega',
	
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
	TRAILER_MEGA_REF_NAME: 'refMegaTRGrid',  // Main Grid Name 
	TRAILER_MEGA_NAME: 'megaTRList',			// Main Store Name
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
	            items: [{
					xtype: 'fieldset',
					title: ViewUtil.getLabel('megaSum'),
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
					flex:1,
					margin: '0 0 0 0',
	                items: [{
		            		xtype: 'combo',
		            		reference:'ctlTRPurpose',
		            		fieldLabel: ViewUtil.getLabel('purpose'),
		            		labelWidth: 50,
		            		width:300,
		            		align : 'left',
		            		bind: {
		            			store: '{purposeCombo}'
		            		},
		            		editable: false,
		            		displayField: 'scdNm',
		            		valueField: 'scd',
		            		queryMode: 'local',
		            		value: '',
		            		listeners: {
		            			select : 'onChangeTRPurpose'
		            		}
	                },{
			            xtype: 'panel',
			            layout: 'fit',
			            flex:1,
		            	items: [{
	            			xtype: 'tsb-datagrid',
	        				reference: me.TRAILER_MEGA_REF_NAME,
	        				flex: 1,
	        				usePagingToolbar : false,
	        				plugins: [
	        					'gridexporter',
	        					'gridfilters',
	        					'clipboard'
	        				],
	        				bind: {
	        					store: '{' + me.TRAILER_MEGA_NAME + '}'
	        				},
	        				selModel: {
	        					type: 'spreadsheet',
	        					cellSelect: false
	        				},
	        				listeners : {
	        					cellclick: 'onTrailerMegaGridClick'
	        				},
	        				
	        				columns: {
	        					defaults: {
		    						style : 'text-align:center',
		    						align: 'center'
		    					},
	        					items: GridUtil.getGridColumns('VSRTrailerMega')
	        				}
		            	}]
		            }]
                },{
                	xtype: 'fieldset',
                	title: 'Detail',
	                layout: {
	                    type: 'vbox'
	                },
	                padding:'3 3 3 3',
	                margin: '0 0 0 5',
	                items: [{
                		xtype: 'container',
    		            layout: {
    		                type: 'hbox',
    		            },
    		            items:[{
		            		xtype: 'container',
	    		            layout: {
	    		                type: 'vbox',
	    		            },
	    		            defaults: {
		                        labelAlign: 'right'
		                    },
		                    margin : '0 0 0 0',
	    		            items: [{
    	                		xtype: 'container',
    	    		            layout: {
    	    		                type: 'hbox',
    	    		            },
    	    		            margin : '0 0 0 0',
    	    		            items:[{
	    							xtype:'textfield',
	    							reference:'ctlTREquipmentCodeDesc',
	    							fieldLabel: ViewUtil.getLabel('vsrEQType'),
	    							labelAlign: 'right',
	    							editable:false,
	    							forceSelection: true,
	    							allowBlank: false,
	    							labelWidth: 70,
	    							width: 250,
	    							listeners: {
	    								afterrender: function(textfield) {
									        if (!textfield.isValid()) {
									        	textfield.addCls('x-form-invalid-field');
									        } else {
									        	textfield.removeCls('x-form-invalid-field');
									        }
									    }
	    							}
	    		   				},
	    		   				{
	    							xtype: 'button',
	    							iconCls: 'x-fa fa-search',
	    							margin: '0 0 0 5',
	    							listeners:{
	    								click:'openTREquipmentCdPopup'
	    							}
	    		   				},
	    		   				{
	    							xtype:'textfield',
	    							reference:'ctlTREquipmentDivCd',
	    							labelAlign: 'right',
	    							hidden :true,
	    							labelWidth: 70,
	    							width: 250,
	    		   				},
	    		   				{
	    							xtype:'textfield',
	    							reference:'ctlTREquipmentCode',
	    							labelAlign: 'right',
	    							hidden :true
	    		   				}]
	    		            },{
	    		            	xtype:'combo',
								reference:'refTRWorkingArea',
								margin: '2 0 0 0',
								fieldLabel: ViewUtil.getLabel('vsrWorkingArea'),
								labelAlign: 'right',
								bind: {
                	    			store: '{workAreaCombo}'
                	    		},
                	    		displayField: 'scdNm',
    					        valueField: 'scd',
    					        queryMode: 'local',
    					        editable: false,
    					        emptyText: 'Select',
    					        allowBlank: false,
    					        forceSelection: true,
    					        listeners: {
    					        	change : 'onChangeTRWorkArea',
    					        	afterrender: function(combo) {
								        if (!combo.isValid()) {
								        	combo.addCls('x-form-invalid-field');
								        } else {
								        	combo.removeCls('x-form-invalid-field');
								        }
								    }
    							},
			   					labelWidth: 70,
								width: 250
	    		            },{
								xtype:'combo',
								margin: '2 5 2 75',
								reference:'refTRWorkLocCd',
								labelAlign: 'right',
                	    		displayField: 'cdNm',
    					        valueField: 'cd',
    					        queryMode: 'local',
    					        editable: false,
    					        emptyText: 'Select',
    					        allowBlank: false,
    					        forceSelection: true,
								width: 175
			   				},{
    	                		xtype: 'container',
    	    		            layout: {
    	    		                type: 'hbox'
    	    		            },
    	    		            margin : '0 0 0 0',
    	    		            items:[{
	    		            		xtype: 'numberfield',
									anchor: '100%',
									value: 0,
									maxValue: 9999,
									minValue: 0,
	    							margin: '2 0 0 0',
	    							reference:'ctlTRNos',
	    							fieldStyle: 'background-color: #66ff99;',
	    							fieldLabel: ViewUtil.getLabel('nos'),
	    							labelAlign: 'right',
	    							labelWidth: 70,
	    							width: 150
	    		   				},{
    								xtype:'combo',
    								reference:'refTRApFp',
    								fieldLabel: ViewUtil.getLabel('apFp'),
    								margin: '2 0 0 5',
    								labelAlign: 'right',
    								bind: {
	                	    			store: '{APFPCombo}'
	                	    		},
	                	    		displayField: 'name',
	    					        valueField: 'code',
	    					        queryMode: 'local',
	    					        editable: false,
	    					        hidden:true,
    			   					labelWidth: 40,
    								width: 130
    			   				}]
	    		            },{
    	                		xtype: 'container',
    	    		            layout: {
    	    		                type: 'hbox'
    	    		            },
    	    		            defaults: {
    		                        labelAlign: 'right',
    		                        labelWidth: 70,
    		                        margin: '0 0 0 0'
    		                    },
    	    		            items:[
    	    		            	{
			    	   					xtype:'partnercdfield',
			    	   					reference:'refTRContractorCd',
			           					width:250,
			           					allowBlank: false,
			           					fieldLabel: ViewUtil.getLabel('contractor'),
			    	   					params:{
			    	   						ptnrType: CodeConstants.CM_PTNRTP_CTT	//Contractor
			    	   					}
			    	   				}
								]
        					},{
								xtype: 'textfield',
								margin: '2 0 0 0',
								reference: 'refTRRemarks',
								fieldLabel: ViewUtil.getLabel('remarks'),
								labelWidth: 70,
								fieldStyle: 'text-transform:uppercase; background-color: #66ff99;',
		       					listeners:{
		       						change: 'onUpperCase'
		       					},
								width:280
							}]
    		            },{
		            		xtype: 'container',
	    		            layout: {
	    		                type: 'vbox',
	    		            },
	    		            margin : '0 0 0 0',
	    		            defaults: {
		                        labelAlign: 'right',
		                        labelWidth: 110
		                    },
	    		            items: [{
        						xtype: 'combo',
        						reference:'refTRCargoType',
        						fieldLabel: ViewUtil.getLabel('cargoTp'),
        						forceSelection: true,
        						allowBlank: false,
    							width:260,
                                bind: {
                	    			store: '{cargoCombo}'
                	    		},
                	    		displayField: 'scdNm',
               					valueField: 'scd',
               					queryMode: 'local',
               					editable: false,
           						value : '',
           						margin : '0 0 0 0'
        					},{
	    		            	xtype: 'container',
		    		            layout: {
		    		                type: 'hbox'
		    		            },
		    		            margin : '0 0 0 0',
		    		            defaults: {
    		                        labelAlign: 'right',
    		                        labelWidth: 110
    		                    },
		    		            items: [
		    		            	{
					   					xtype:'partnercdtypefield',
										width: 260,
					   					fieldLabel:ViewUtil.getLabel('requestor'),
					   					allowBlank: false,
					   					reference:'refTRRequestor',
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
		    		            	margin: '0 0 0 5',
    		                        labelAlign: 'right'
    		                    },
		    		            items: [{
	    		                    xtype: 'label',
	    		                    margin: '8 0 0 30',
	    		                    width: 50,
	    		                    html: ViewUtil.getLabel('refNo')
	    		                },{
									xtype : 'radiogroup',
									reference : 'ctl_TR_RefNo',
									layout : {
										type : 'vbox',
										align : 'stretch'
									},
									padding : '3 3 3 3',
									items : [{
										xtype : 'radiofield',
										margin: '0 0 0 0',
										name: 'rfNo',
										inputValue: 'Y',
										reference : 'ctlTRCmbRef',
										checked : false,
									},{
										xtype : 'radiofield',
										margin: '2 0 0 0',
										name: 'rfNo',
										inputValue: 'N',
										reference : 'ctlTRTxtRef',
										checked : false,
									}]
								},{
		    		            	xtype: 'container',
			    		            layout: {
			    		                type: 'vbox',
			    		            },
			    		            defaults: {
			    		            	margin: '0 0 0 5',
	    		                        labelAlign: 'right',
	    		                    },
	    		                    items : [{
		        						xtype: 'textfield',
		        						margin: '2 0 0 0',
		        						reference:'refTRCmbRefNo',
		    							width: 140,
		               					editable: false,
		           						value : ''
		        					},{
										xtype: 'textfield',
										margin: '2 0 0 0',
										reference: 'refTRTxtRefNo',
										editable: false,
										width: 140,
									}]
    		                    }]
		                    },{
                                xtype: 'combo',
                                reference:'ctlTRDMode',
                                margin: '2 0 0 5',
                                editable: false,
                                fieldLabel: ViewUtil.getLabel('dMode'),
                                forceSelection: true,
                                allowBlank: false,
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
    							width:260,
                            },{
                            	reference: 'refTrailerEQArrTime',
                            	margin: '2 0 0 5',
                            	width:260,
    	    			        xtype: 'datetimefield',
    	    			        allowBlank: false,
    	    			        fieldLabel: ViewUtil.getLabel('vsrEQArrTime'),
    	    			        editable:false,
    	    			        format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                            },{
                            	reference: 'refTrailerStartTime',
                            	margin: '2 0 0 5',
    	    					width:260,
    	    			        xtype: 'datetimefield',
    	    			        allowBlank: false,
    	    			        fieldLabel: ViewUtil.getLabel('startTime'),
    	    			        editable:false,
    	    			        format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                            },{
                            	reference: 'refTrailerEndTime',
                            	margin: '2 0 0 5',
                            	width:260,
    	    			        xtype: 'datetimefield',
    	    			        allowBlank: false,
    	    			        fieldLabel: ViewUtil.getLabel('endTime'),
    	    			        editable:false,
    	    			        format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                            }]
    		            }]
                	}]
                }]
            }]
		});
		
		me.callParent();
	}
});