Ext.define('MOST.view.monitoring.DailyOperationsReport', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-dailyoperationsreport',
	requires: [
		'MOST.view.monitoring.DailyOperationsReportControllerModel',
		'MOST.view.monitoring.DailyOperationsReportController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	controller: 'dailyoperationreport',
	
	viewModel: {
		type: 'dailyoperationreport'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: '',
	MAIN_STORE_NAME: '',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [
//			{
//				xtype: 'tsb-datagrid',
//				reference: me.MAIN_GRID_REF_NAME,
//				flex : 1,
//				stateful : true,
//				stateId : 'stateDischargingGrid',
//				//usePagingToolbar : false,
//				plugins: [
//					'gridexporter',
//					'gridfilters',
//					'clipboard'
//	    		],
//	    		bind: {
//	    			store: '{' + me.MAIN_STORE_NAME + '}'
//	    		},
//				listeners: {
//					pagingSearch: 'onSearch',
//					cellclick: 'onHandlingGridlClick',
//				},
//	    		selModel: {
//					type: 'spreadsheet',
//					cellSelect: false
//				},
//				columns: {
//	            	defaults: {
//	            		style : 'text-align:center',
//	            		align : 'center'
//	            	},
//	            	items: GridUtil.getGridColumns('Discharging')
//				}
//		    }
			],
		    
		    dockedItems: [{
				xtype: 'container',
				style: { "background-color":"white" },
				layout: {
					type: 'hbox',
				},
				defaults: {
					margin: '1 1 1 1'
				},
				items: [{
					xtype: 'tbfill'
				},
//				{
//					xtype: 'button',
//					itemId:'inquiryItemId',
//					reference:'refBtnRetrieve',
//					text: ViewUtil.getLabel('search'),
//					iconCls: 'x-fa fa-search',
//					cls: 'search-button', 
//					hidden:true,
//					listeners: {
//						click: 'onSearch'
//					}
//				},
				{
					xtype: 'button',
					itemId: 'exportToExcelButton',
					text: ViewUtil.getLabel('exportToExcel'),
					iconCls: 'excel-button-image', 
					cls: 'excel-button', 
					listeners: {
						click: 'onPreviewExcel'
					}
				},
				{
					xtype: 'button',
					itemId: 'exportToPdfButton',
					reference:'refBtnPdfButton',
					text: ViewUtil.getLabel('exportToPdf'),
					iconCls: 'x-fa fa-file-pdf-o',
					cls: 'excel-button', 
					listeners: {
						click: 'onPreviewPDF'
					}
				},
//				{
//					xtype: 'button',
//					cls: 'column-setting-button',
//					iconCls: 'x-fa fa-columns',
//					text: ViewUtil.getLabel('column'),
//					listeners: {
//						click: 'onColumnSettingPopup',
//						args: [me.MAIN_GRID_REF_NAME]
//					}
//				}
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
					title: ViewUtil.getLabel('daily_handling_report'),
					autoScroll: true,
					collapsible:true,
                    flex: 1,
                    defaults: {
                		margin: '5 0 0 0',
                        labelAlign: 'right',
                        labelWidth: 100
                    },
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                    	{
		                    xtype:'searchfieldset',
							title: ViewUtil.getLabel('search'),
//		                    margin: '5 5 0 5',
		                    layout: {
		                        type: 'vbox',
		                        align: 'stretch'
		                    },
		                    flex: 0.4,
		                    items: [
		                    	{
		                    		xtype: 'container',
		                    		layout: {
		                    			type: 'vbox',
		                    			align: 'stretch'
		                    		},
		                    		items: [
		                    			{
		                    				xtype: 'shipcallnofield',
											reference: 'ctlScn',
											/*width:240,*/
											flex: 1,
											labelWidth: 70,
											/*emptyText: ViewUtil.getLabel('shipCallNo'),*/
											fieldLabel: ViewUtil.getLabel('shipCallNo'),
											bind: {
												value: '{theSearch.scn}',
											},
		                    			},
		                    			{
		    	           					xtype:'vesselcalllistfield',
		    	           					/*width:240,*/
		    	           					flex: 1,
		    	           					labelWidth: 70,
		    	           					margin: '5 0 0 0',
		    	           					fieldLabel: ViewUtil.getLabel('vessel'),
		    	           					reference:'ctlJpvc',
		    								bind: {
		    									value: '{theSearch.vslCallId}'
		    								}
		                    			},
		                    			{
		    						        //Period
		    						    	xtype: 'container',
		    						    	layout: {
		    									type: 'hbox',
		    									align: 'stretch'
		    								},
		    								margin: '5 0 0 0',
		    								defaults: {
		    									labelAlign: 'right',
		    								},
		    								items:[
		    									{
			    									xtype: 'datetimefield',
			    									reference: 'ctlFromDate',
			    									fieldLabel: ViewUtil.getLabel('fromATW'),
			    									labelWidth: 70,
			    									width: 250,
			    									margin: '0 5 0 0',
			    									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
			    									displayFieldLabel: ViewUtil.getLabel('fromDate'),
			    									listeners: {
							    						change: 'onDateChange'
							    					},
							    					//submitFormat: 'Y-m-d 07:00', // <-- THIS ONE
			    									bind: '{theSearch.fromATW}',
			    									editable: false,
		    									},
		    									{
			    									xtype: 'datetimefield',
			    									reference: 'ctlToDate',
			    									displayFieldLabel: ViewUtil.getLabel('toATW'),
			    									width: 167,
			    									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
			    									listeners: {
							    						change: 'onDateChange'
							    					},
			    									bind: '{theSearch.toATW}',
			    									editable: false,
		    									}
		    								]
		                    			}
		                    		]
		                    	}
		                    ]
		                },
                    	{
		                    xtype:'fieldset',
							title: ViewUtil.getLabel('vslInfo'),
//		                    margin: '5 5 0 5',
		                    layout: {
		                        type: 'vbox',
		                        align: 'stretch'
		                    },
		                    flex: 1,
		                    items: [
		                	{
		                        xtype: 'container',
		                        defaults: {
		                            margin: '0 0 5 5',
		                            labelAlign: 'right',
		                            labelWidth: 50,
		                            width: 200
		                        },
		                        layout: {
		                            type: 'hbox'
		                        },
		                        items: [
		                    	{
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('VslNm'),
		                            bind:'{theSearch.vslNm}',
		                            readOnly:true,
		                            labelWidth: 70,
		                            width: 200
		                        },
		                    	{
		                        	xtype:'datetimefield',
		        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		        					readOnly:true,
		                            fieldLabel: ViewUtil.getLabel('eta'),
		                            bind:'{theSearch.eta}'
		                        },
		                        {
		                        	xtype:'datetimefield',
		        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		        					readOnly:true,
		                            fieldLabel: ViewUtil.getLabel('atb'),
		                            bind:'{theSearch.atb}'
		                        },
		                        {
		                        	xtype:'datetimefield',
		        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		        					readOnly:true,
		                            fieldLabel: ViewUtil.getLabel('atw'),
		                            bind:'{theSearch.atw}'
		                        },
		                        ]
		                    },
		                    {
		                        xtype: 'container',
		                        defaults: {
		                            margin: '0 0 0 5',
		                            labelAlign: 'right',
		                            labelWidth: 50,
		                            width: 200
		                        },
		                        layout: {
		                            type: 'hbox'
		                        },
		                        items: [
		                    	{
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('vesselCode'),
		                            readOnly:true,
		                            bind:'{theSearch.vslCd}',
		                            labelWidth: 70,
		                            width: 200
		                        },
		                    	{
		                        	xtype:'datetimefield',
		        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		        					readOnly:true,
		                            fieldLabel: ViewUtil.getLabel('etd'),
		                            bind:'{theSearch.etd}'
		                        },
		                        {
		                        	xtype:'datetimefield',
		        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		        					readOnly:true,
		                            fieldLabel: ViewUtil.getLabel('atu'),
		                            bind:'{theSearch.atu}'
		                        },
		                        {
		                        	xtype:'datetimefield',
		        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		        					readOnly:true,
		                            fieldLabel: ViewUtil.getLabel('atc'),
		                            bind:'{theSearch.atc}'
		                        },
		                        ]
		                    }]
		                },
                    ]
                },
                ],
			},
			{
				xtype: 'searchfieldset',
				flex: 1,
				layout: {
					type: 'hbox',
					align: 'stretch'
				},
				defaults: {
					labelAlign: 'left',
					margin: '0 760 10 33'
				},
				items:[
				{
					xtype: 'textarea',
					reference: 'refRmkRpt',
					fieldLabel: ViewUtil.getLabel('remarks'),
        			labelWidth: 60,
					width :800,
					height: 300,
				},
				]
			}
			]
		});
		
		me.callParent();
	}
});

