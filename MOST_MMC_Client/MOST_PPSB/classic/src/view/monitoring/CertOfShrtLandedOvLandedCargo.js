Ext.define('MOST.view.monitoring.CertOfShrtLandedOvLandedCargo', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-certificateofshortlandedoverlandedcargo',
	 
	requires: [
		'MOST.view.monitoring.CertOfShrtLandedOvLandedCargoModel',
		'MOST.view.monitoring.CertOfShrtLandedOvLandedCargoController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	controller: 'certofshrtlandedovlandedcargo',
	
	viewModel: {
		type: 'certofshrtlandedovlandedcargo'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refDischargingGrid',
	MAIN_STORE_NAME: 'discharging',
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
				items: [{
					xtype:'fieldset',
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
					items: [{
	                    xtype: 'container',
	                    margin: '0 0 0 0',
	                    layout: {
	                        type: 'hbox',
	                        align: 'stretch'
	                    },
	                    flex: 1,
	                    items: [
                    	{
							xtype:'searchfieldset',
							title: ViewUtil.getLabel('search'),
                            margin: '5 0 0 0',
                            defaults: {
                                labelAlign: 'right',
                                labelWidth: 70
                            },
                            layout: {
                                type: 'vbox',
                                align: 'stretch',
                            },
                            items: [
                            	{
									xtype: 'shipcallnofield',
									reference: 'ctlScn',
									width:240,
									/*emptyText: ViewUtil.getLabel('shipCallNo'),*/
									fieldLabel: ViewUtil.getLabel('shipCallNo'),
									bind: {
										value: '{theSearch.scn}',
									},
								},
                            	{
                   					xtype:'vesselcalllistfield',
                   					width:240,
                                    margin: '5 0 0 0',
                   					fieldLabel: ViewUtil.getLabel('vessel'),
                   					reference:'ctlJpvc',
									bind: {
										value: '{theSearch.vslCallId}'
									}
                   				}
                            ]
	                    },
	                    {
                            xtype:'fieldset',
							title: ViewUtil.getLabel('vslInfo'),
                            margin: '5 5 0 5',
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
                                    bind:'{theVsl.vslNm}',
                                    readOnly:true,
                                    labelWidth: 70,
                                    width: 200
                                },
                            	{
                                	xtype:'datetimefield',
                					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                					readOnly:true,
                                    fieldLabel: ViewUtil.getLabel('eta'),
                                    bind:'{theVsl.eta}'
                                },
                                {
                                	xtype:'datetimefield',
                					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                					readOnly:true,
                                    fieldLabel: ViewUtil.getLabel('atb'),
                                    bind:'{theVsl.atb}'
                                },
                                {
                                	xtype:'datetimefield',
                					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                					readOnly:true,
                                    fieldLabel: ViewUtil.getLabel('atw'),
                                    bind:'{theVsl.atw}'
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
                                    bind:'{theVsl.vslCd}',
                                    labelWidth: 70,
                                    width: 200
                                },
                            	{
                                	xtype:'datetimefield',
                					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                					readOnly:true,
                                    fieldLabel: ViewUtil.getLabel('etd'),
                                    bind:'{theVsl.etd}'
                                },
                                {
                                	xtype:'datetimefield',
                					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                					readOnly:true,
                                    fieldLabel: ViewUtil.getLabel('atu'),
                                    bind:'{theVsl.atu}'
                                },
                                {
                                	xtype:'datetimefield',
                					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                					readOnly:true,
                                    fieldLabel: ViewUtil.getLabel('atc'),
                                    bind:'{theVsl.atc}'
                                },
                                ]
                            }]
                        }
	                    ]
					},
					{
                        xtype:'fieldset',
						title: ViewUtil.getLabel('certificate_of_shortlanded_overlanded_cargo'),
                        margin: '5 5 0 5',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        flex: 1,
                        items: [
                        	{
        	                    xtype: 'container',
        	                    margin: '5 0 5 0',
        	                    defaults: {
        	                        margin: '0 5 0 5',
        	                        labelAlign: 'right',
        	                        labelWidth: 100
        	                    },
        	                    layout: {
        	                        type: 'hbox'
        	                    },
        	                    items: [
    		                    {
									xtype: 'textfield',
									reference: 'ctlMasterBLCombo',
									fieldLabel: ViewUtil.getLabel('cmc_masterbl'),
									bind: '{theSearch.mfDocId}',
									labelWidth : 100,
									margin: '0 0 0 0',
									width:500,
									fieldStyle: 'text-transform:uppercase',
									listeners: {
										change: 'onUpperCase'
									},
									enforceMaxLength: true,
									//maxLength: 30,
									enforceMaxLength: true,
									//maskRe: /[0-9A-Za-z]/,
									readOnly: true
								},
								{
									xtype: 'button',
									margin: '0 0 0 5',
				 					iconCls: 'x-fa fa-search',
				 					listeners: {
				 						click: 'onOpenMasterBLPopup'
				 					}
								},
    	                    	{
    		                        xtype: 'combobox',
    		                        labelWidth : 100,
    		                        reference:'ctlDischargingBlNoCombo',
    		                        fieldLabel: ViewUtil.getLabel('bl'),
    		                        queryMode: 'local',
    			   					bind: {
    			    	    			store: '{dischargingBlNoCombo}',
    									value: '{theSearch.blNo}'
    			    	    		},
    			   					displayField: 'scdNm',
    			   					valueField: 'scd',
    			   					emptyText:'Select',
    			   					hidden: true,
    		       					forceSelection:true,
    		       					width: 350,
    		                    },
                                ]
        	                }
                    	]
					},
	                ]
				}],
			},
			]
		});
		
		me.callParent();
	}
});

