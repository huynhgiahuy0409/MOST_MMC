Ext.define('MOST.view.monitoring.HandlingInOutList', {
    extend: 'Ext.form.Panel',
    alias: 'widget.app-handlinginoutlist',

    requires: [
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
    ],
    
	controller: 'handlinginoutlist',
	
	viewModel: {
		type: 'handlinginoutlist'
	},
	
	detailViewAlias: 'app-unitnodetailforroro',
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	 MAIN_GRID_REF_NAME: 'refHandlingGrid',
	 MAIN_STORE_NAME: 'handlingList',	
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
			defaults:{
				margin: '5 5 0 5' // top, right, bottom, left
			},
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
            items: [
                {
                    xtype: 'container',
                    flex: 1,
					margin: '0 5 0 0',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
            				xtype: 'tsb-datagrid',
            				reference: me.MAIN_GRID_REF_NAME,
            				flex : 1, 
            				stateful : true,
            				multiColumnSort: true,
            				stateId : 'stateHandlingGrid',
            				plugins: [
            					'gridexporter',
            					'gridfilters',
            					'clipboard'
            	    		],
            	    		bind: {
            	    			store: '{' + me.MAIN_STORE_NAME + '}'
            	    		},
            				listeners: {
            					cellclick: 'onHandlingGridlClick',
            					cellDblClick: 'onDblClick',
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
								items: GridUtil.getGridColumns('HandlingInOut')
            				}
                        }
                    ]
                },{
                	xtype:'fieldset',
                	layout: {
                        type: 'hbox',
                    },  
					padding: '10 10 10 10',
					margin: '0 5 0 0',
                    items:[
                    	{
	                    	xtype:'combobox',
	                    	flext:1,
	                    	bind: {
	        	    			store: '{compareModeCombo}'
	        	    		},
	        	    		reference:'cboCompareMode',
	       					displayField: 'scdNm',
	       					valueField: 'scd',
	       					value : 'Mt',
	       					queryMode:'local',
	       					listeners:{
	       						select: 'onCboCompareModeSelect'
	       					}
	                    },{
	                    	xtype:'textfield',
	                    	flext:1,
	                    	fieldLabel: ViewUtil.getLabel('docTotal'),
	                    	reference:'txtDocTotal',
	                    	readOnly:true,
	                    	labelAlign:'right',
	                    	//decimalPrecision: 3
	                    },{
		                	xtype:'textfield',
		                	flext:1,
		                	fieldLabel: ViewUtil.getLabel('actualTotal'),
		                	reference:'txtActTotal',
		                	readOnly:true,
		                	labelAlign:'right',
		                	//decimalPrecision: 3
		                },{
	                    	xtype:'textfield',
	                    	fieldLabel: ViewUtil.getLabel('balance'),
	                    	reference:'txtBalTotal',
	                    	readOnly:true,
	                    	labelAlign:'right',
	                    	//decimalPrecision: 3
	                    }
		            ]
                }
            ],
			dockedItems: [
				{
					xtype : 'container',
					style: { "background-color":"white" },
					layout: {
						type: 'hbox',
					},
					defaults: {
						margin: '1 1 1 1'
					},
					items:[
						{
							xtype: 'tbfill'
						},
						{
							xtype: 'button',
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
				},{
					xtype: 'toolbar',
					enableOverflow: true,
					padding : '0 0 0 0',
					margin: '0 -3 5 0',
					defaults: {
						labelAlign: 'right',
					},
					items: [
						{
							xtype: 'fieldset',
							title: ViewUtil.getLabel('search'),
							autoScroll: true,
							collapsible:true,
							flex:1,
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							padding: '0 10 10 10',
							items: [
								{
									xtype: 'searchfieldset',
									margin: '0 5 0 0',
									padding: '5 10 10 10',
									flex: 1,
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									defaults:{
										margin: '0 0 0 0',
										labelAlign: 'right',
										labelWidth: 60
									},
									items: [
										{
											xtype: 'radiogroup',
											columns: 4,
											vertical: true,
											reference:'refRdGrpHandlingInOut',
											items:[
												{ 
													boxLabel: ViewUtil.getLabel('handlingIn'), 
													reference:'rdHandlingIn',
													checked: true,
													name: 'rdgInOut',
													inputValue : 'IN',
													listeners: {
														change: 'rgChange'
													}
												},{ 
													boxLabel: ViewUtil.getLabel('handlingOut'),
													reference:'rdHandlingOut',
													name: 'rdgInOut',
													inputValue : 'OUT',
													listeners: {
														change: 'rgChange'
													}
												}
											]
										},
										{
											xtype: 'container',
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											defaults: {
												labelWidth: 80,
												labelAlign: 'right', 
												flex: 1
											},
											width: '100%',
											items: [
												{
													xtype: 'vesselcalllistfield',
													reference: 'txtVslCallId',
													fieldLabel: ViewUtil.getLabel('vslcallid'),
													emptyText: ViewUtil.getLabel('vslcallid'),
													bind: {
														value: '{theSearch.vslCallId}'
													}
												},
												{
													xtype: 'combobox',
													reference: 'cboShift',
													fieldLabel: ViewUtil.getLabel('saShift'),
													bind: {
														store: '{shiftCombo}',
														value: '{theSearch.shftId}'
													},
													displayField: 'shftNm',
													valueField: 'shftId',
													matchFieldWidth: true,
													queryMode: 'local',
													editable: false,
													emptyText: 'Select'
												}
											]
										},
										{
											xtype: 'container',
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											defaults: {
												labelWidth: 80,
												labelAlign: 'right',
												flex: 1
											},
											items: [
												{
													xtype: 'datetimefield',
													reference: 'ctlLoadedFromDt',
													fieldLabel: ViewUtil.getLabel('whReconcilDateFrom'),
													margin:'5 0 5 0',
													disabled:false,
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													bind: {
														value: '{theSearch.fromDate}'
													},
													listeners: {
														change: 'onDateChange'
													}
												},{
													xtype: 'datetimefield',
													reference: 'ctlLoadedToDt',
													fieldLabel: ViewUtil.getLabel('whReconcilDateTo'),                  
													margin:'5 0 5 0',
													disabled:false,
													format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
													listeners: {
														change: 'onDateChange'
													},
													bind: {
														   value: '{theSearch.toDate}'
													}
												}
											]
										}
									]
								},
								{
									xtype: 'fieldset',
									margin: '0 0 0 5',
									padding: '10 10 10 10',
									flex: 2,
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'container',
											flex:1,
											layout: {
												type: 'hbox'
											},
											defaults:{
												labelAlign: 'right',
												labelWidth: 80,
												flex: 1
											},
											items: [
												{
													xtype: 'combobox',
													reference: 'cboCategory',
													fieldLabel: ViewUtil.getLabel('SNLCategory'),
													bind: {
														store: '{categoryCombo}',
														value: '{theSearch.catgCd}'
													},
													displayField: 'scdNm',
													valueField: 'scd',
													emptyText: 'ALL',
													matchFieldWidth: true,
													queryMode: 'local',
													editable: false,
													labelAlign: 'right'
												}, {
													xtype: 'partnercdfield',
													reference: 'ctlFwdAgent',
													fieldLabel: ViewUtil.getLabel('forwarder'),
													params: {
														searchPtyDivCd: 'FWD' // CNS, FWD, TRK
													},
													bind: {
														value: '{theSearch.fwrAgnt}'
													}
												},
												{
													xtype: 'textfield',
													reference: 'ctlLotNo',
													fieldLabel: ViewUtil.getLabel('lotNo'),
													bind: {
														value: '{theSearch.lotNo}'
													},
													fieldStyle: 'text-transform: uppercase'
												},
												{
													xtype: 'partnercdfield',
													labelAlign: 'right',
													reference: 'ctlCnsnee',
													fieldLabel: ViewUtil.getLabel('csgnee'),
													bind: {
														value: '{theBL.cnsne}'
													},
													labelAlign: 'right',
													params: {
														ptnrType: CodeConstants.CM_PTNRTP_CNS // CNS, FWD, TRK
													}
												}
											]
										},
										{
											xtype: 'container',
											layout: {
												type: 'hbox'
											},
											defaults: {
												labelAlign: 'right',
												labelWidth: 80,
												flex: 1
											},
											flex: 1,
											margin: '5 0 0 0',
											items: [
												{
													xtype: 'combobox',
													reference:'cboMasterBL',
													fieldLabel: ViewUtil.getLabel('masterBLNo'),
													queryMode: 'local',
													bind: {
														store: '{masterBlCombo}',
													},
													displayField: 'scdNm',
													valueField: 'mfDocId',
													forceSelection: true,
													labelAlign:'right',
													emptyText: 'Select',
													listeners : {
														select: 'onSelectMasterBl'
													}
												},{
													xtype: 'combobox',
													reference:'cboWH',
													fieldLabel: ViewUtil.getLabel('handlingIOWh'),
													queryMode: 'local',
													bind:{
														store: '{whCombo}',
														value: '{theSearch.locId}'
													},
													displayField: 'locNm',
													valueField: 'locId',
													emptyText:'ALL',
													forceSelection: true,
													labelAlign:'right'
												},
												{
	    	    									xtype: 'cmmcdfield',
	    	    									fieldLabel: ViewUtil.getLabel('commodity'),
	    	    									reference: 'ctlCommodity',
	    	    		                			bind:{
	    	    		                				value : '{theBL.cmdtCd}',
	    	    		                				cgTpCd: '{theBL.cgTpCd}',
	    	    		                				cmdtGrpCd: '{theBL.cmdtGrpCd}'
	    	    		                			},
	    	    		                			labelAlign: 'right',
	    	    		                			allowBlank: false,
	    	    		                			editable: false,
	    	    		                			params:{
	    	    		                				searchType: 'CMDT'
	    	    		                			}
	    	    								},
												{
													xtype: 'container'
												}
											]
										},
										{
											xtype: 'container',
											margin: '5 0 5 0',
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											defaults: {
												labelAlign: 'right',
												labelWidth: 80,
												flex: 1
											},
											flex: 1,
											items: [
												{
													xtype: 'combobox',
													reference:'cboBL',
													fieldLabel: ViewUtil.getLabel('bl'),
													queryMode: 'local',
													bind: {
														store: '{BLNoList}',
													},
													displayField: 'blNo',
													valueField: 'blNo',
													forceSelection: true,
													labelAlign:'right',
													emptyText: 'Select'
												},
												{
													xtype: 'combobox',
													reference:'cboSN',
													fieldLabel: ViewUtil.getLabel('whReconcilSN'),
													queryMode: 'local',
													disabled: false,
													bind: {
														store: '{shippingNoteListCombo}',
														value: '{theSearch.shipgNoteNo}'
													},
													displayField: 'shipgNoteNo',
													valueField: 'shipgNoteNo',
													forceSelection: true,
													labelAlign:'right',
												},
												{
			    				   					xtype: 'combo',
			    				   					reference: 'ctlWarehouseType',
			    									fieldLabel: ViewUtil.getLabel('WHType'),
			    									queryMode: 'local',
			    				   					bind: {
			    				    	    			store: '{warehouseTypeCombo}',
			    				    	    			value: '{theSearch.locTpCd}'
			    				    	    			
			    				   					},
			    				   					displayField: 'scdNm',
			    				   					valueField: 'scd',
			    				   					value : '',
			    				   					editable: false
			    				   				},{
													xtype :'container',
													layout:{
														type : 'hbox',
														pack : 'end'
													},
													flex : 1,
													items:[
														{
															xtype : 'button',
															useTooltipAsTextInOverflowMenu: true,
															tooltip : 'Clear Sorters',
															iconCls: 'x-fa fa-sort-alpha-asc',
															handler: 'onClearSorters'
														}
													]
												}
											]
										},
										{
											xtype: 'container',
											layout: {
												type: 'hbox'
											},
											defaults:{
												labelAlign: 'right',
												labelWidth: 80,
												flex: 1
											},
											items: [
												{
													xtype: 'combo',
													reference: 'ctlCgTp',
													fieldLabel: ViewUtil.getLabel('cargoTp'),
													queryMode: 'local',
													bind: {
														store: '{cargoTpCombo}',
														value: '{theSearch.cargoTp}'
													},
													displayField: 'scdNm',
													valueField: 'scd',
													value: '',
													editable: true,
													emptyText: "Select",
													listeners : {
														select: 'onSelectCargoTpCombo'
													}
												},
												{
													xtype : 'textfield',
													reference : 'ctlUnitNo',
													fieldLabel : ViewUtil.getLabel('unitNo'),
													listeners : {
														change : function() {
															var me = this;
															me.setValue(this.getValue().toUpperCase());
														}
													},
													bind: {
														value: '{theSearch.unitNo}'
													},
													maxLength: 30,
													enforceMaxLength: true
												},
												{
													xtype: 'container',  
												},
												{
													xtype: 'container',  
												}
											]
										}
									]
								}
							]
						}
					]
				}
			]
		});
		
		me.callParent();
	}
});