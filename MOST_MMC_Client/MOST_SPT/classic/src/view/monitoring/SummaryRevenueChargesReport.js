Ext.define('MOST.view.monitoring.SummaryRevenueChargesReport', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-summaryrevenuechargesreport',
	requires: [
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
		
		'MOST.view.monitoring.SummaryRevenueChargesReportController',
		'MOST.view.monitoring.SummaryRevenueChargesReportModel',
	],

	controller: 'summaryrevenuechargesreport',
	
	viewModel: {
		type: 'summaryrevenuechargesreport'
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
	
	TERMINAL_STORE: 'terminalCombo',
	TARIFF_TYPE_STORE: 'tariffTypeCombo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [
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
					title: ViewUtil.getLabel('summaryRevenueChargesReport'),
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
    	                    xtype: 'container',
    	                    layout: {
    	                        type: 'vbox',
    	                        align: 'stretch'
    	                    },
    	                    items: [
    	                    	{
    	           					xtype:'vesselcalllistfield',
    	           					width:220,
    	           					margin: '15 5 0 60',
    	           					fieldLabel: ViewUtil.getLabel('vessel'),
    	           					reference:'ctlJpvc',
    								bind: {
    									value: '{theSearch.vslCallId}'
    								}
    	           				},
    							{
    						    	xtype: 'container',
    						    	layout: {
    									type: 'hbox',
    									align: 'stretch'
    								},
    								margin: '5 5 0 5',
    								defaults: {
    									labelAlign: 'right',
    								},
    								items:[
    									{
    	    								xtype : 'combobox',
    	    								labelWidth: 87,
        									width: 420,
    	    								reference : 'refCboTerminalSumRevRpt',
    	    								fieldLabel : ViewUtil.getLabel('terminalopr'),
    	    								bind : {
    	    									store: '{' + me.TERMINAL_STORE + '}',
    	    									value: '{theSearch.terminalCode}'
    	    								},
    	    								queryMode : 'local',
    	    								displayField : 'scdNm',
    	    								valueField : 'scd',
    	    								value: '',
    	    								editable : false,
    	    							},
    								]
    						    },
    						    {
    						    	xtype: 'container',
    						    	layout: {
    									type: 'hbox',
    									align: 'stretch'
    								},
    								margin: '5 5 0 5',
    								defaults: {
    									labelAlign: 'right',
    								},
    								items:[
    									{
    										xtype:'partnercdtypefield',
    										reference:'ctlPartner',
    										fieldLabel:ViewUtil.getLabel('payerCd'),
    										emptyText:ViewUtil.getLabel('payerCd'),
    										params:{
    											searchModule: 'MT'
    										},
    										change: function(field, newValue){
    											   field.setValue(newValue.toUpperCase());
    										},
    										labelWidth: 87,
    										width:220,
    										editable: false
    									},
    									{
    			                            xtype: 'textfield',
			                            	reference:'ctlPartnerName',
    			                            width: 200,
    			                            readOnly:true,
    			                        },
    								]
    						    },
    						    {
    						        //Period
    						    	xtype: 'container',
    						    	layout: {
    									type: 'hbox',
    									align: 'stretch'
    								},
    								margin: '5 5 0 5',
    								defaults: {
    									labelAlign: 'right',
    								},
    								items:[
    									{
    										xtype: 'combobox',
    										reference: 'refCboTariffType',
    										fieldLabel: ViewUtil.getLabel('trfTpCd'),
    										labelAlign: 'right',
    										labelWidth: 87,
    										width:420,
    										queryMode: 'local',
    										bind: {
    											store: '{' + me.TARIFF_TYPE_STORE + '}',
    											value: '{theSearch.trfTpCd}',
    										},
    										displayField: 'scdNm',
    										valueField: 'scd',
    										emptyText: 'Select',
    										listeners: {
    											//select: 'onChangeTariffType',
    										},
    										editable: true,
    										forceSelection: true,
    										allowBlank: false,
    									},
    								]
    						    },
    	           				{
    						        //Period
    						    	xtype: 'container',
    						    	//hidden: true,
    						    	layout: {
    									type: 'hbox',
    									align: 'stretch'
    								},
    								margin: '5 5 0 5',
    								defaults: {
    									labelAlign: 'right',
    								},
    								items:[{
    									xtype: 'datetimefield',
    									reference: 'ctlFromDate',
    									fieldLabel: ViewUtil.getLabel('inDate'),
    									labelWidth: 87,
    									width: 237,
    									margin: '0 10 0 0',
    									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
    									//displayFieldLabel: ViewUtil.getLabel('fromDate'),
    									listeners: {
				    						change: 'onDateChange'
				    					},
				    					//submitFormat: 'Y-m-d 07:00', // <-- THIS ONE
    									bind: '{fromDateTimeString}',
    									editable: false,
    								},
    								{
    									xtype: 'datetimefield',
    									reference: 'ctlToDate',
    									margin: '0 0 0 20',
    									displayFieldLabel: ViewUtil.getLabel('toATW'),
    									width: 150,
    									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
    									listeners: {
				    						change: 'onDateChange'
				    					},
    									bind: '{toDateTimeString}',
    									editable: false,
    								}]
    						    }
    							]
                    	},
                    	{
		                    xtype:'fieldset',
							title: ViewUtil.getLabel('vslInfo'),
		                    //margin: '5 5 0 5',
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
					hidden: true,
				},
				]
			}
			]
		});
		
		me.callParent();
	}
});

