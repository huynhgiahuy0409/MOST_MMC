Ext.define('MOST.view.planning.RosterConfigurationOthers', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-rosterconfigurationmonthlyothers',
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	controller: 'rosterconfigurationmonthlyothers',
	
	viewModel: {
		type: 'rosterconfigurationmonthlyothers'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	layout : {type  : 'vbox', align : 'stretch'},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refRosterOthersGrid',
	MAIN_STORE_NAME: 'stafflList',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [{
				xtype:'container',
				layout:{
				    type:'hbox'					    
				},
				defaults:{
					 margin:'5 5 0 0',
					 labelAlign:'right'
				},
				items:[{
					xtype:'textfield',
					fieldStyle: 'background-color:lightblue;',
					fieldLabel: ViewUtil.getLabel('rstOthersShiftName'),
					reference:'refShiftNm',
					labelWidth: 100,
					editable: false,
					width: 300
				},{
					xtype: 'button',
					reference: 'ctlBtn1Week',
					text: ViewUtil.getLabel('rstOthers1stWeek'),
					listeners: {
						click: 'onClickWeek'
					}
				},{
					xtype: 'button',
					reference: 'ctlBtn2Week',
					text: ViewUtil.getLabel('rstOthers2ndWeek'),
					listeners: {
						click: 'onClickWeek'
					}
				},{
					xtype: 'button',
					reference: 'ctlBtn3Week',
					text: ViewUtil.getLabel('rstOthers3rdWeek'),
					listeners: {
						click: 'onClickWeek'
					}
				},{
					xtype: 'button',
					reference: 'ctlBtn4Week',
					text: ViewUtil.getLabel('rstOthers4thWeek'),
					listeners: {
						click: 'onClickWeek'
					}
				},{
					xtype: 'button',
					reference: 'ctlBtn5Week',
					text: ViewUtil.getLabel('rstOthers5thWeek'),
					listeners: {
						click: 'onClickWeek'
					}
				}]
			},{
				xtype: 'tsb-datagrid',
				margin:'5 5 5 0',
				reference: me.MAIN_GRID_REF_NAME,
				flex : 1,
				stateful : true,
				stateId : 'stateRosterOthersGrid',
				viewConfig: {
		            stripeRows: true,
		            enableTextSelection: true,
		        },
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
					cellmousedown : 'onCellMouseDown',
					cellmouseup : 'onCellMouseUp',
					pagingSearch: 'onSearch',
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: GridUtil.getGridColumns('RosterOthersList')
				}
		    }],
		    
		    dockedItems: [{
            	xtype: 'container',
            	style: { "background-color":"white" },
	            layout: {
	                type: 'hbox'
	            },
	            defaults:{
	            	margin: '5 5 0 0'
	            },
	            items:[{
					xtype: 'tbfill'
				},{
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
					text: ViewUtil.getLabel('refresh'),
					iconCls: 'x-fa fa-refresh',
					listeners: {
						click: 'onSearch'
					}
				},{
					xtype: 'button',
					itemId:'createItemId',
					reference:'refBtnCreate',
					text: ViewUtil.getLabel('add'),
					ui: 'create-button',
					iconCls: 'x-fa fa-plus',
				},{
                	xtype: 'button',
                	itemId: 'saveItemId',
                	reference: 'refBtnSave',
					text: ViewUtil.getLabel('save'),
					iconCls: 'x-fa fa-save',
					listeners: {
						click: 'onSave'
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
				},{
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
    				labelAlign: 'right',
    			},
				padding: '0 0 0 0',
    			items:[{
    				xtype: 'fieldset',
    				title: ViewUtil.getLabel('search'),
    				autoScroll: true,
    				collapsible:false,
    				padding: '0 10 10 10',
					margin: '0 5 5 0',
    				flex: 1,
    				layout: {
    					type: 'hbox',
    					align: 'stretch'
    				},

					items: [
						{
							xtype: 'searchfieldset',
							layout: {
								type: 'vbox', align: 'stretch'
							},
							flex: 1,
							margin: '0 5 0 0',
							padding: '5 10 10 10',
							items: [
								{
									xtype: 'container',
									layout: { type: 'hbox', align: 'stretch' },
									defaults: {
										labelAlign: 'right',
										labelWidth: 80,
										margin: '5 0 0 0'
									},
									items: [
										{
											xtype: 'datefield',
											reference: 'ctlStartingDate',
											fieldLabel: ViewUtil.getLabel('rstOthersStartingDate'),
											format: MOST.config.Locale.getShortDate(),
											flex: 1
										},
										{
											xtype: 'combobox',
											reference: 'ctlWorkingArea',
											fieldLabel: ViewUtil.getLabel('rstOthersWorkingArea'),
											editable: false,
											value: '',
											flex: 2,
											bind: {
												store: '{workingAreaCombo}',
												value: '{theSearch.workLocCd}'
											},
											displayField: 'scdNm',
											valueField: 'scd',
											queryMode: 'local'
										}
									]
								},
								{
									xtype: 'container',
									layout: { type: 'hbox', align: 'stretch' },
									defaults: {
										margin: '5 0 0 0',
										labelAlign: 'right',
										labelWidth: 80
									},
									items: [
										{
											xtype: 'combobox',
											reference: 'ctlRole',
											fieldLabel: ViewUtil.getLabel('rstOthersRole'),
											flex: 1,
											editable: false,
											bind: {
												store: '{roleCombo}',
												value: '{theSearch.roleCd}'
											},
											displayField: 'scdNm',
											valueField: 'scd',
											value: '',
											queryMode: 'local'
										},
										{
											xtype: 'combobox',
											reference: 'ctlCostCenter',
											fieldLabel: ViewUtil.getLabel('rstOthersCostCenter'),
											editable: false,
											matchFieldWidth: false,
											value: '',
											bind: {
												store: '{costCenterCombo}',
												value: '{theSearch.costCentCd}'
											},
											flex: 2,
											displayField: 'scdNm',
											valueField: 'scd',
											queryMode: 'local'
										}
									]
								},
								{
									xtype: 'container',
									layout: { type: 'hbox', align: 'stretch' },
									defaults: {
										margin: '5 0 0 0',
										labelAlign: 'right',
										labelWidth: 80
									},
									items: [
										{
											xtype: 'container',
											flex: 1
										},
										{
											xtype: 'combo',
											fieldLabel: 'Unit',
											reference: 'ctlUnit',
											bind: {
												store: '{unitDropDownListCombo}',
												value: '{theSearch.unitDiv}',
											},
											flex: 2,
											queryMode: 'local',
											displayField: 'scdNm',
											valueField: 'scd',
											emptyText: 'Select'
										}
									]
								}
							]
						}, 
						{
							xtype: 'fieldset',
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							padding: '10 10 10 10',
							margin: '0 0 0 5',
							flex: 1,
							items: [
								{
									xtype: 'container',
									layout: { type: 'hbox'},
									defaults: { 
										labelAlign: 'right',
										labelWidth: 80,
									},
									items: [
										{
											xtype: 'combobox',
											reference: 'ctlShiftType',
											fieldLabel: ViewUtil.getLabel('rstOthersShiftType'),
											editable: false,
											value: '',
											flex: 1,
											bind: {
												store: '{shiftTypeCombo}'
											},
											displayField: 'shftTpCdNm',
											valueField: 'shftTpCd',
											queryMode: 'local',
											listeners: {
												select: 'onChangeShiftType'
											}
										},
										{
											xtype: 'combobox',
											reference: 'ctlShiftGroup',
											fieldLabel: ViewUtil.getLabel('rstOthersShift'),
											editable: false,
											value: '',
											bind: {
												store: '{shiftGroupCombo}'
											},
											displayField: 'shftNm',
											valueField: 'shftId',
											flex: 1,
											queryMode: 'local',
											listeners: {
												select: 'onChangeShift'
											}
										}
									]
								}, 
								{
									xtype: 'container',
									layout: { 
										type: 'hbox',
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 80,
									}, 
									items: [
										{
											xtype: 'radiogroup',
											reference: 'refRadioField',
											margin: '0 0 0 0',
											layout: 'hbox',
											flex: 1,
											defaults: {
												labelWidth: 80,
											},
											listeners: {
												change: 'onSelectTypeChange'
											},
											items: [
												{
													boxLabel: ViewUtil.getLabel('rstOthersSelect'),
													xtype: 'radiofield',
													margin: '5 20 0 80',
													name: 'rst',
													inputValue: 'select',
													id: 'rdSelect'
												},
												{
													boxLabel: ViewUtil.getLabel('rstOthersDrag'),
													xtype: 'radiofield',
													margin: '5 20 0 0',
													name: 'rst',
													inputValue: 'drag',
													id: 'rdDrag'
												},
												{
													xtype: 'textfield',
													reference: 'ctlColor',
													margin: '5 10 0 0',
													editable: false,
													width: 60,
												},
											]
										}, 
										{
											xtype: 'combobox',
											reference: 'ctlReason',
											fieldLabel: ViewUtil.getLabel('rstOthersReason'),
											labelWidth: 80,
											margin: '5 0 0 0',
											editable: false,
											value: '',
											flex: 1,
											bind: {
												store: '{reasonCombo}'
											},
											displayField: 'scdNm',
											valueField: 'scd',
											queryMode: 'local',
											listeners: {
												select: 'onChangeReason'
											}
										}
									]
								}
							]
						}
					]
    			}]
            }]			
		});
		
		me.callParent();
	}
});

