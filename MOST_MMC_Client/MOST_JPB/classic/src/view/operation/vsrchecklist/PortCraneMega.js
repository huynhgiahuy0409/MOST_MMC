Ext.define('MOST.view.operation.vsrchecklist.PortCraneMega', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-portcranemega',
	
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
	 PORTCRANE_MEGA_GRID_REF_NAME: 'refMegaPCGrid',  // Main Grid Name 
	 PORTCRANE_MEGA_STORE_NAME: 'megaPCList',			// Main Store Name
	 
	 ADP: 'ADP',
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
	                flex: 1,
	                margin: '0 0 0 0',
		            items: [{
	                    xtype: 'combo',
	                    reference:'ctlPCPurpose',
						fieldLabel: ViewUtil.getLabel('purpose'),
						labelWidth: 50,
	                    width:300,
	                    labelAlign : 'right',
	                    bind: {
	    	    			store: '{purposeCombo}',
	    	    			value: '{thePortCrane.purpose}'
	    	    		},
	    	    		editable: false,
	    	    		displayField: 'scdNm',
	   					valueField: 'scd',
	   					queryMode: 'local',
	   					value : '',
	   					listeners: {
				        	select : 'onChangePortCranePurpose'
						}
	                },{
    		            xtype: 'panel',
    		            layout: 'fit',
    		            flex: 1,
    		            items: [{
    		            	xtype: 'tsb-datagrid',
    		 				reference: me.PORTCRANE_MEGA_GRID_REF_NAME,
    		 				flex: 1,
    		 				usePagingToolbar : false,
    		 				plugins: [
    		 					'gridexporter',
    		 					'gridfilters',
    		 					'clipboard'
    		 				],
    		 				bind: {
    		 					store: '{' + me.PORTCRANE_MEGA_STORE_NAME + '}'
    		 				},
    		 				selModel: {
    		 					type: 'spreadsheet',
    		 					cellSelect: false
    		 				},
    		 				listeners : {
    		 					celldblclick: 'onPortCraneMegaGridClick',
    		 				},
    		 				
    		 				columns: {
    		 					defaults: {
    		 						style : 'text-align:center',
    		 						align: 'center'
    		 					},
    		 					items: GridUtil.getGridColumns('VSRPortcraneMega')
	    	            	}
	    				}]
	            	}]
	            }, {
            		xtype: 'container',
	    		    layout: {
	    		    	type: 'vbox',
	    		        align: 'stretch'
    		        },
	    		    width: 565,
	    		    minWidth: 565,
	    		    items: [{
    		    		xtype: 'fieldset',
    		    		title: 'Detail',
	    			    layout: {
	    			    	type: 'hbox'
    			        },
	    			    margin: '0 0 0 5',
	    			    padding: '3 3 3 3',
	    			    defaults: {
	    			    	labelAlign: 'right',
    		            },
	    			    items: [{
		            		xtype: 'container',
	    			    	layout: {
	    			    		type: 'hbox'
	    			    	},
	    			    	flex: 1,
	    			    	margin: '0 0 0 0',
	    			    	defaults:{
	    			    		margin: '0 0 0 0'
    			    		},
	    			    	items: [{
								xtype : 'radiogroup',
								padding:'3 3 3 3',
								reference : 'ctl_Crane',
								layout : {
									type : 'vbox'
								},
					    		listeners: {
					    			change : 'onChangeCraneGroup'
				    			},
					    		margin: '0 0 0 0',
								items : [{
									xtype : 'radiofield',
									name: 'gr',
									margin: '2 0 0 0',
									reference : 'ctlPortCrane',
									inputValue: 'portCrane',
									checked : true,
									boxLabel : ViewUtil.getLabel('portCrane')
								},{
									xtype : 'radiofield',
									name: 'gr',
									margin: '2 0 0 0',
									inputValue: 'shipCrane',
									reference : 'ctlShipCrane',
									checked : false,
									boxLabel : ViewUtil.getLabel('vsrShipCrane')
								}]
	    			    	},{
					        	xtype: 'combo',
					        	margin: '0 0 0 10',
					        	reference:'refPCEqNo',
					        	forceSelection: true,
					    		labelWidth: 100,
					    		width : 250,
					    		bind: {
					    			store: '{eqPCCombo}'
				                },
					            displayField: 'engNm',
					            valueField: 'eqNo',
					            queryMode: 'local',
					            editable: false,
					           	value : '',
					           	listeners: {
					           		change : 'onChangeEqType',
				    			},
				        	},{
					        	xtype: 'combo',
					        	margin: '0 0 0 10',
					        	reference:'refPCShipCrane',
					        	hidden: true,
					        	forceSelection: true,
					    		labelWidth: 100,
					    		width: 200,
					    		bind: {
					    			store: '{shipCraneCombo}'
				                },
					            displayField: 'scdNm',
					            valueField: 'scd',
					            queryMode: 'local',
					            editable: false,
					           	value : ''
				        	},{
	    	        			xtype:'textfield',
	    	        			reference:'refPCCapaCd',
	    	        			hidden: true,
	    	        			fieldLabel: ViewUtil.getLabel('requestor'),
	    	        			labelAlign: 'right',
	    	        			labelWidth: 70,
	    	        			width: 210
    	        			},{
	    	        			xtype:'textfield',
	    	        			reference:'refPCCapaDesc',
	    	        			hidden: true,
	    	        			fieldLabel: ViewUtil.getLabel('requestor'),
	    	        			labelAlign: 'right',
	    	        			labelWidth: 70,
	    	        			width: 210
    	        			}]
			    		}]
	    		    },{
	                	xtype: 'fieldset',
		                layout: {
		                	type: 'hbox',
    			        },
    			        flex: 1,
	    			    margin: '2 0 0 5',
	    			    defaults: {
    			    		labelAlign: 'right'
    		            },
	    			    items: [{
		    	            xtype: 'container',
			    	    	layout: {
			    	    		type: 'vbox',
		    	    		},
			    	    	margin: '0 0 0 0',
			    	    	items:[{
		    	    		   xtype: 'container',
			    			   layout: {
			    				   type: 'hbox'
			    			   },
			    			   margin: '0 0 0 0',
			    			   items: [{
									xtype : 'radiogroup',
									padding : '3 3 3 3',
									reference : 'ctl_GroupPortCrane',
									layout : {
										type : 'vbox'
									},
							    	listeners: {
						    			change : 'onChangeContractor'
							    	},															
									items : [{
										xtype : 'radiofield',
										margin: '2 0 0 0',
										name: 'portcranecontractor',
										inputValue: me.ADP,
										reference : 'ctlPCJPB',
										checked : true,
										boxLabel : ViewUtil.getLabel('jPB')
									},{
										xtype : 'radiofield',
										margin: '2 0 0 0',
										name: 'portcranecontractor',
										inputValue: 'contractor',
										reference : 'ctlPCContractor',
										checked : false,
										boxLabel : ViewUtil.getLabel('contractor')
									}]
								},{
					    	    	xtype: 'container',
					    			layout: {
					    				type: 'vbox',
				    			    },
									items : [{
								        xtype: 'combo',
									    margin: '0 0 0 0',
									    reference:'refPCCmbJPB',
									    matchFieldWidth: false,
									    width: 175,
									    bind: {
									    	store: '{empPCCombo}'
								        },
									    displayField: 'empNm',
									    valueField: 'empId',
									    queryMode: 'local',
									    editable: false,
									    value : ''
								    },{
								    	xtype: 'container',
									    layout: {
									    	type: 'hbox'
								    	},
									    items:[
									    	{
					    	   					xtype:'partnercdfield',
					    	   					reference:'refPCContractorCd',
					           					width:175,
					    	   					fieldLabel: '',
					    	   					params:{
					    	   						ptnrType: CodeConstants.CM_PTNRTP_CTT	//Contractor
					    	   					}
					    	   				}
										]
								    }]
								}]
	    		            },{
		    			    	xtype: 'container',
	    			    		layout: {
	    			    			type: 'hbox',
		    			    	},
			    			    defaults: {
			    			    	margin: '2 0 0 5',
			    	    		    labelAlign: 'right',
			    	    		    labelWidth: 85,
		    	    		    },
			    			    items: [{
		    			            reference: 'refPortCraneStartTime',
			    			    	width:250,
			    			    	xtype: 'datetimefield',
			    			    	allowBlank: false,
			    			    	fieldLabel: ViewUtil.getLabel('startTime'),
			    			    	forceSelection: true,
			    			    	editable:false,
			    			    	format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		    			        },{
		    			        	reference: 'refPortCraneEndTime',
			    			        width:250,
			    			    	xtype: 'datetimefield',
			    			    	margin: '0 0 0 10',
			    			    	allowBlank: false,
			    			    	fieldLabel: ViewUtil.getLabel('endTime'),
			    			    	forceSelection: true,
			    			    	editable:false,
			    			    	format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		    			        }]
	    			    	},{
		    			    	xtype: 'container',
			    			    layout: {
			    			    	type: 'hbox',
			    			    },
			    			    defaults: {
			    			    	margin: '2 0 0 5',
			    	    		    labelAlign: 'right',
			    	    		    labelWidth: 85
		    	    		    },
			    			    items: [
			    			    	{
					   					xtype:'partnercdtypefield',
										width: 250,
					   					fieldLabel:ViewUtil.getLabel('requestor'),
					   					allowBlank: false,
					   					labelAlign: 'right',
					   					reference:'refPCRequestor',
					   					params:{
					   						ptnrType: CodeConstants.CM_PTNRTP_RQT	//Requestor
					   					}
					   				},
			    	        		{
								      xtype: 'combo',
								      reference:'refPCCargoType',
								      fieldLabel: ViewUtil.getLabel('cargoTp'),
								      allowBlank: false,
								      forceSelection: true,
								      width:250,
								      bind: {
								    	  store: '{cargoCombo}'
								      },
								      displayField: 'scdNm',
								      valueField: 'scd',
								      queryMode: 'local',
								      editable: false,
								      value : ''
			    	        		}]
	    			    	},{
	    			    		xtype: 'container',
			    			    layout: {
			    			    	type: 'hbox',
		    			    	},
			    			    defaults: {
			    			    	margin: '2 0 0 5',
			    	    		    labelAlign: 'right',
			    	    		    labelWidth: 85
		    	    		    },
			    			    items: [{
		    						xtype: 'textfield',
			    					reference: 'refPCRemarks',
			    					fieldLabel: ViewUtil.getLabel('remarks'),
			    					fieldStyle: 'text-transform:uppercase; background-color: #66ff99;',
			    					listeners:{
			    						change: 'onUpperCase'
		    					    },
			    					width:'100%'
		    					}]
	    			    	}]
    			        }]
    		        }]
	            }]
			}]
		});
		
		me.callParent();
	}
});