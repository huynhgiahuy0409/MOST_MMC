Ext.define('MOST.view.monitoring.GateIn', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-listofgatein',
	requires: [
		'MOST.view.monitoring.GateInModel',
		'MOST.view.monitoring.GateInController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	controller: 'listofgatein',
	
	viewModel: {
		type: 'listofgatein'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
		MAIN_GRID_REF_NAME: 'refListOfGateInGrid',
		MAIN_STORE_NAME: 'listOfGateIn',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			layout: {
				type: 'vbox', 
				align: 'stretch' 
			},
			items: [{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				margin: '5 5 5 0',
				flex : 1,
				stateful : true,
				stateId : 'stateListOfGateInGrid',
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
					pagingSearch: 'onSearch'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: GridUtil.getGridColumns('ListOfGateIn')
				}
		    }],
		    dockedItems: [{
				xtype: 'container',
				enableOverflow: true,
        		margin: '0 0 0 0',
				style: { "background-color":"white" },
				layout: {
					type: 'hbox',
				},
				margin: '0 0 0 0',
				defaults: {
					margin: '1 1 1 1'
				},
				items: [
					{
						xtype: 'tbfill'
					},
					{
						xtype: 'button',
						itemId:'inquiryItemId',
						reference:'refBtnRetrieve',
						text: ViewUtil.getLabel('search'),
						iconCls: 'x-fa fa-search',
						cls: 'search-button', 
						listeners: {
							click: 'onSearch'
						}
					},
					{
						xtype: 'button',
						itemId: 'btnAdd',
						reference:'refBtnCreate',
						text: ViewUtil.getLabel('add'),
						iconCls: 'x-fa fa-plus'
					},
					{
						xtype: 'button',
						itemId: 'btnDelete',
						reference:'refBtnDelete',
						text: ViewUtil.getLabel('remove'),
						ui: 'delete-button',
						iconCls: 'x-fa fa-minus'
					},
					{
						xtype: 'button',
						itemId: 'exportToExcelButton',
						text: ViewUtil.getLabel('exportToExcel'),
						iconCls: 'excel-button-image', 
						cls: 'excel-button', 
						listeners: {
							click: {
								fn: 'onExportExcelPdfWithServer',
								args:[me.MAIN_GRID_REF_NAME, true]
							}
						}
					},
					{
						xtype: 'button',
						itemId: 'exportToPdfButton',
						text: ViewUtil.getLabel('exportToPdf'),
						iconCls: 'x-fa fa-file-pdf-o',
						cls: 'excel-button', 
						listeners: {
							click: {
								fn: 'onExportExcelPdfWithServer',
								args:[me.MAIN_GRID_REF_NAME, false]
							}
						}
					},
					{
						xtype: 'button',
						cls: 'column-setting-button',
						iconCls: 'x-fa fa-columns',
						text: ViewUtil.getLabel('column'),
						listeners: {
							click: 'onColumnSettingPopup',
							args: [me.MAIN_GRID_REF_NAME]
						}
					}	
				]
		    },
			{
				xtype: 'toolbar',
				enableOverflow: true,
				padding : '0 0 0 0',
				defaults: {
					labelAlign: 'right',
				},
				items: [
					{
						xtype:'searchfieldset',
						title: ViewUtil.getLabel('search'),
						autoScroll: true,
						collapsible:true,
						layout:{
							type:'vbox',
							align:'stretch'
						},
						defaults:{
							margin: '0 0 5 0'
						},
						flex: 1,
						items:[
							{
				                xtype: 'container',
				                defaults: {
				                	margin: '0 5 0 0',
									labelAlign: 'right'
				            	},
				            	layout: {
				                    type: 'hbox',
				                    align: 'stretch'
				                },
				                items:[
				                	{
				       					xtype:'vesselcalllistfield',
				       					width:270,
				       					fieldLabel: ViewUtil.getLabel('vessel'),
				                        labelWidth: 100,
				       					reference:'ctlListOfGateInJpvc',
										bind: {
											value: '{theSearch.vslCallId}'
										}
				       				},
				       				{
				                        xtype: 'combobox',
				                        labelWidth : 50,
				                        width:220,
				                        reference:'ctlListOfGateInSnNoCombo',
				                        fieldLabel: ViewUtil.getLabel('snNo'),
				                        queryMode: 'local',
					   					bind: {
					    	    			store: '{listOfGateInSnNoCombo}',
											value: '{theSearch.shipgNoteNo}'
					    	    		},
					   					displayField: 'shipgNoteNo',
					   					valueField: 'shipgNoteNo',
					   					value : '',
					   					emptyText:'Select',
				       					forceSelection:true,
										fieldStyle: 'text-transform:uppercase',
										listeners:{
											select: 'onSelectSnCombo'
										}
				                    },
				                    {
					   					xtype:'partnercdfield',
					   					reference:'ctlListOfGateInForwarder',
					   					labelWidth: 80,
				    					width: 240,
					   					fieldLabel:ViewUtil.getLabel('forwarder'),
					   					emptyText:ViewUtil.getLabel('forwarder'),
					   					params:{
					   						searchDivCd: CodeConstants.MT_PTNRTP_FWD
					   					},
										fieldStyle: 'text-transform:uppercase',
										bind: '{theSearch.fwrAgnt}'	
					   				},
				                    {
		                                xtype: 'combobox',
		                                reference: 'ctlWarehouse',
		                                fieldLabel: ViewUtil.getLabel('whLocation'),
		                                width: 250,
		        	                    bind: {
		        	                    	store: '{whLocCombo}',
		        	                    	value: '{theSearch.whLoc}'
	    	                    		},
	    	                    		emptyText: 'SELECT', 
		        						queryMode: 'local',
		        				        displayField: 'scdNm',
		        				        valueField: 'scd',
		        				        editable: false
		                            }
				               	]
							},
							{
				                xtype: 'container',
				                defaults: {
				                	margin: '5 5 0 0',
									labelAlign: 'right'
				            	},
				            	layout: {
				                    type: 'hbox',
				                    align: 'stretch'
				                },
				                items:[
				                	{
				                        xtype: 'combobox',
				                        labelWidth : 100,
				                        width:270,
				                        reference:'ctlListOfGateInMasterBlNoCombo',
				                        fieldLabel: ViewUtil.getLabel('masterBLNo'),
				                        queryMode: 'local',
					   					bind: {
					    	    			store: '{masterBlCombo}',
											value: '{theSearch.mfDocId}'
					    	    		},
					   					displayField: 'scdNm',
					   					valueField: 'mfDocId',
					   					value : '',
					   					emptyText:'Select',
				       					forceSelection:true,
										fieldStyle: 'text-transform:uppercase',
										listeners: {
											select: 'onSelectMasterBl'
										}
				                    },
				                	{
				                        xtype: 'combobox',
				                        labelWidth : 50,
				                        labelAlign: 'right',
				                        width:220,
				                        reference:'ctlListOfGateInBlNoCombo',
				                        fieldLabel: ViewUtil.getLabel('bLNo'),
				                        queryMode: 'local',
					   					bind: {
					    	    			store: '{listOfGateInBlNoCombo}',
											value: '{theSearch.blNo}'
					    	    		},
					   					displayField: 'blNo',
					   					valueField: 'blNo',
					   					value : '',
					   					emptyText:'Select',
				       					forceSelection:true,
										fieldStyle: 'text-transform:uppercase',
										listeners:{
											select: 'onSelectBlCombo'
										}
				                    },
				                	{
				                		xtype: 'datetimefield',
				    					reference: 'ctlListOfGateInFromDt',
				    					labelWidth: 80,
				    					Width: 300,
				    					fieldLabel: ViewUtil.getLabel('firstGateInDt'),
				    					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
				    					listeners: {
				    						change: 'onDateChange'
				    					}
				    				},
				    				{
				    					xtype: 'datetimefield',
				    					reference: 'ctlListOfGateInToDt',
				    			        width:220,
				    			        format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
				    					listeners: {
				    						change: 'onDateChange'
				    					}
				    			    },
				    			    {
				    					xtype:'textfield',
				    					reference:'ctlListOfGateInLorryNo',
				    					fieldLabel: ViewUtil.getLabel('lorryNo'),
				       					labelWidth: 80,
				    					width: 240,
				    					emptyText: ViewUtil.getLabel('lorryNo'),
				    					fieldStyle: 'text-transform:uppercase',
				    					listeners:{
				    						change: 'onUpperCase'
				    					},
										bind: '{theSearch.lorryNo}'	
				       				}
				                ]
							}					
						]
					}
				],
			}]
		});
		
		me.callParent();
	}
});

