Ext.define('MOST.view.operation.WHReconciliation', {
    extend: 'Ext.form.Panel',
    alias: 'widget.app-whreconciliation',

    requires: [
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
    ],

	detailViewAlias: 'app-whreconciliationdetail',
    
	controller: 'whreconciliation',
	
	viewModel: {
		type: 'whreconciliation'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refWHReconcilGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'whReconcilList',
	MAIN_STORE_PIVOT : 'pivotList',			 			// Main Pivot Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
	initComponent: function() {
		var me = this;
		Ext.apply(this, {
			// xtype:'form',
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
            items: [
                {
		            xtype: 'tabpanel',
		            reference:'refWhReconcilList',
		        	height: 310,
		        	minHeight: 310,
		            deferredRender:false,
		            margin : '0 5 5 5',
		            activeTab: 0,
		            flex : 1,
		            items: [{
		            	xtype: 'tsb-datagrid',
						reference: me.MAIN_GRID_REF_NAME,
						flex : 1,
						stateful : true,
						title: 'List',
						stateId : 'stateWHReconcilGrid',
						plugins: [
							'gridexporter',
							'gridfilters',
							'clipboard'
						],
						bind: {
							store: '{' + me.MAIN_STORE_NAME + '}'
						},
						listeners: {
							celldblclick: 'onWHGridDblClick',
							pagingSearch: 'onSearch'
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
							items: GridUtil.getGridColumns('WHReconcilList'),
						}
		            },{
		            	xtype: 'app-whreconciliationpivot',
	                    reference: 'refWhreconciliationpivot',
	                    title: 'Pivot'
		            }
		          ]
				}],
            dockedItems:[{
				xtype: 'container',
				style: { "background-color":"white" },
				layout: {
					type: 'hbox'
				},
				defaults: {
					margin: '1 1 1 1'
				},
				items: [{
					xtype: 'tbfill'
				},
				{
					xtype: 'button',
					itemId: 'inquiryItemId',
					reference:'refBtnRetrieve',
					text: ViewUtil.getLabel('search'),
					iconCls: 'x-fa fa-search',
					cls: 'search-button', 
					listeners: {
						click: 'onSearch'
					}
				
				},{
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
            	},{
					xtype: 'button',
					cls: 'column-setting-button',
					iconCls: 'x-fa fa-columns',
					text: ViewUtil.getLabel('column'),
					listeners: {
						click: 'onColumnSettingPopup',
						args: [me.MAIN_GRID_REF_NAME]
					}
				
            	}]
			},{
				xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right'
            	},
				items: [
					{
						xtype: 'fieldset',
						title: ViewUtil.getLabel('search'),
						autoScroll: true,
						collapsible:true,
						flex: 1,
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
                                defaults:{
                                	margin : '5 5 0 0',
                                	width: 270,
                                	labelWidth:70,
                			        labelAlign: 'right'
                                },
                                items: [
    								{
    									xtype: 'shipcallnofield',
    									reference: 'ctlScn',
    									//emptyText: ViewUtil.getLabel('shipCallNo'),
    									fieldLabel: ViewUtil.getLabel('shipCallNo'),
    									bind: {
    										value: '{theSearch.scn}',
    									},
    								},
                                	{
                                        xtype: 'vesselcalllistfield',
                                        reference:'ctlVslCallId',
                                        fieldLabel:ViewUtil.getLabel('vessel'),
                                        bind: {
											value: '{theSearch.vslCallId}'
										},
                       					change: function(field, newValue){
                 			        	   field.setValue(newValue.toUpperCase());
                       					}
                                	}
                                ]
	                    	},
	                    	{
                                xtype: 'container',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                defaults:{
                                	margin : '5 5 0 0',
                                	width: 270,
                                	labelWidth:70,
                			        labelAlign: 'right'
                                },
                                items: [
                                	{
										xtype: 'combobox',
										reference:'ctlMBlNoCombo',
										fieldLabel: ViewUtil.getLabel('cmc_masterbl'),
										queryMode: 'local',
										bind: {
											store: '{masterBlCombo}',
											value: '{theSearch.masterBlNo}'
										},
										displayField: 'scdNm',
										valueField: 'mfDocId',
										emptyText:'Select',
										forceSelection: true,
										listeners: {
											select: 'onMasterBLBookingNoChange'
										}
									},
									{
										xtype: 'combobox',
										reference:'ctlBookingNoCombo',
										fieldLabel: ViewUtil.getLabel('cmc_bookingno'),
										queryMode: 'local',
										bind: {
											store: '{bookingNoCombo}',
											value: '{theSearch.bookingNo}'
										},
										displayField: 'scdNm',
					   					valueField: 'mfDocId',
										emptyText:'Select',
										forceSelection: true,
										editable: false,
										listeners: {
											select: 'onMasterBLBookingNoChange'
										}
									},
                                	{
            							xtype: 'combobox',
            							reference: 'refWHId',
            							fieldLabel: ViewUtil.getLabel('WHId'),
                                        bind:{
                                        	store: '{warehouseListCombo}',
                                        	value: '{theSearch.whLocId}'
                                        },
                                        emptyText:'Select',
            							displayField: 'scdNm',
            							valueField: 'scd'
            						},
                                ]
	                    	},
	                    	{
                                xtype: 'container',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                defaults:{
                                	margin : '5 5 0 0',
                                	width: 270,
                                	labelWidth:70,
                			        labelAlign: 'right'
                                },
                                items: [
                                	{
			                    		xtype: 'combobox',
			                    		reference:'refBlNo',
			                    		fieldLabel: ViewUtil.getLabel('bl'),
			                    		queryMode: 'local',
			                    		bind: {
			                    			store: '{blNoCombo}',
			                    			value: '{theSearch.blNo}'
			                    		},
			                    		displayField: 'scdNm',
			                    		valueField: 'blNo',
			                    		emptyText:'Select',
			                    		forceSelection: true,
			                    		editable: false,
			                    		listeners: {
											select: 'onBLSnNoChange'
										}
				                    },
				                    {
			                    		xtype: 'combobox',
			                    		reference:'refSnNoCombo',
			                    		fieldLabel: ViewUtil.getLabel('sn'),
			                    		queryMode: 'local',
			                    		bind: {
			                    			store: '{snNoCombo}',
			                    			value: '{theSearch.snNo}'
			                    		},
			                    		displayField: 'scdNm',
			                    		valueField: 'shipgNoteNo',
			                    		emptyText:'Select',
			                    		forceSelection: true,
			                    		editable: false,
			                    		listeners: {
			                    			select: 'onBLSnNoChange'
										}
			                    	},
			                    	{
					   					xtype: 'combo',
					   					reference: 'ctlWarehouseType',
										fieldLabel: ViewUtil.getLabel('WHType'),
										queryMode: 'local',
					   					bind: {
					    	    			store: '{warehouseTypeCombo}',
					    	    			value: '{theSearch.whTpCd}'
					    	    			
					    	    		},
					   					displayField: 'scdNm',
					   					valueField: 'scd',
					   					value : '',
					   					emptyText:'Select',
					   					editable: false
					   				},
                                ]
	                    	},
	                    	{
                                xtype: 'container',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                defaults:{
                                	margin : '5 0 0 50',
                                	width: 220,
                                	labelWidth:70,
                			        labelAlign: 'right'
                                },
                                items: [
                                	{
        								xtype: 'cmmcdfield',
        	                            fieldLabel: ViewUtil.getLabel('commodity'),
        	                            reference: 'ctlCommodity',
        	                            bind:{
        									value : '{theSearch.cmdtCd}'
        								},
        								params:{
        	                				searchType: 'CMDT',
        									searchCol1: '',
        	                			},
        							},
				                    { 
	    		       					xtype: 'partnercdfield',
	    		       					fieldLabel: ViewUtil.getLabel('consignee'),
	    		       					reference:'refTxtConsignee',
	    		       					bind:{
	    		       						value:'{theSearch.cnsne}'
	    		       					},
	    		       					params:{
	    			   						ptnrType: CodeConstants.CM_PTNRTP_CNS
	    			   					}
	    		            		},
			                    	{
					   					xtype: 'textfield',
					   					reference: 'ctlLotNo',
										fieldLabel: ViewUtil.getLabel('lotNo'),
					   					bind: {
					    	    			value: '{theSearch.lotNo}'
					    	    		},
					    	    		change: function(field, newValue){
	                 			        	field.setValue(newValue.toUpperCase());
	                       				}
					   				},
                                ]
	                    	},
	                    	{
                                xtype: 'container',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                defaults:{
                                	margin : '5 0 0 50',
                                	width: 220,
                                	labelWidth:70,
                			        labelAlign: 'right'
                                },
                                items: [
                                	{
                                        xtype: 'container',
                                        flex: 1
                                	},
                                	{
                                        xtype: 'container',
                                        flex: 1
                                	},
                                	{
                                		xtype:'button',
                                		text: ViewUtil.getLabel('jobMonitoringTitle'),
                                		cls: 'preview-button',
                                		iconCls: 'fa fa-window-maximize',
                                		listeners: {
                    						click: 'onOpenWHReconcilJobMonitoring'
                    					}
                                	},
                                	{
                                		xtype:'button',
                                		text: ViewUtil.getLabel('settlement'),
                                		ui: 'delete-button',
                                		iconCls: 'fa fa-balance-scale',
                                		listeners: {
                    						click: 'onSettlement'
                    					}
                                	}
                                ]
	                    	}
	                    ]
					}
				]
			}]
            
		});
		
		me.callParent();
	}
});