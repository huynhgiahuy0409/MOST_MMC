Ext.define('MOST.view.operation.RehandleOperationGC', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-rehandleoperationlist',

    requires: [
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
		'MOST.view.operation.RehandleOperationGCModel',
		'MOST.view.operation.RehandleOperationGCController'
    ],

	controller: 'rehandleoperationlist',
	
	viewModel: {
		type: 'rehandleoperationlist'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	 MAIN_GRID_REF_NAME: 'refRehandleOperationGrid',
	 MAIN_STORE_NAME: 'rehandleOperationList',
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
		Ext.apply(me, {
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
				stateId : 'stateAssignedLorryListGrid',
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
					celldblclick:'onDblClickForJobMonitoring',
					pagingSearch: 'onSearch'
				},
				margin:'0 5 5 0',
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items:GridUtil.getGridColumns('RehandleOperation')
				}
		    }],
            dockedItems:[{
				xtype: 'container',
				style: { "background-color":"white" },
				layout: {
					type: 'hbox',
				},
				defaults: {
					margin: '1 1 1 1'
				},
				items: [
				{
					xtype: 'tbfill'
				},
				{
            		xtype: 'button',
            		itemId: 'inquiryItemId',
					text: ViewUtil.getLabel('search'),
					iconCls: 'x-fa fa-search',
					cls: 'search-button', 
					reference:'refBtnRetrieve',
					listeners: {
						click: 'onSearch'
					}
				},{
					xtype: 'button',
                    reference: 'btnLoading',
                    width: 150,
                    iconCls: 'x-fa fa-level-up',
                    text: ViewUtil.getLabel('loading'),
 					listeners:{
 						click:'onConfirmRehandleLoading'
 					}
				},{
					xtype: 'button',
                    reference: 'btnHandlingOut',
                    width: 150,
                    iconCls: 'x-fa fa-sign-out',
                    text: ViewUtil.getLabel('handlingOut'),
 					listeners:{
 						click:'onConfirmRehandleHandlingOut'
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
							xtype:'container',
							layout:{
								type:'hbox'
							},
							defaults:{
								labelAlign:'right',
								labelWidth: 85
							},
							margin : '5 0 10 0',
							items:[
								{
									xtype: 'vesselcalllistfield',
									width: 245,
									reference:'ctlRehandleJpvc',
									fieldLabel: ViewUtil.getLabel('vessel'),
									labelAlign: 'right',
									emptyText: ViewUtil.getLabel('vessel'),
									bind: {
										value: '{theSearch.vslCallId}'
									}
								},{
									xtype: 'combobox',
									reference: 'cboShiftDate',
									fieldLabel: 'Shift Date',
									bind: {store: '{shiftDateList}'},
									listeners:{
										select:'onSelectShiftDate'
									},
									matchFieldWidth: true,
									queryMode: 'local',
									displayField: 'shftDtDsp',
									valueField: 'shftDt',
									editable: false,
									width:190,
									labelAlign: 'right'
								},{
									xtype: 'combobox',
									reference: 'cboShiftNo',
									bind: {store: '{shiftNoList}'},
									matchFieldWidth: true,
									queryMode: 'local',
									displayField: 'shftNm',
									valueField: 'shftId',
									editable: false,
									margin : '0 0 0 2',
									width:100,
									labelAlign: 'right'
								}
							]
						},
						{
							xtype: 'container',
							layout:{
								type:'hbox',
								aling:'strecth'
							},
							flex: 1,
							defaults: {
								labelAlign: 'right',
								labelWidth: 80,
								margin: '0 0 0 5'
							},
							items:[{
								xtype: 'combobox',
								reference: 'ctlRehandleSn',
								fieldLabel: ViewUtil.getLabel('gateOutBlNo'),
								bind: {store: '{rehandleBlSnNoCombo}'},
								listeners:{
									select:'onSelectBlSn'
								},
								matchFieldWidth: true,
								width:240,
								queryMode: 'local',
								displayField: 'blSn',
								valueField: 'grNo',
								editable: false,
								forceSelection:true,
								labelAlign: 'right'
							},{
								xtype: 'textfield',
								fieldLabel: ViewUtil.getLabel('gr'),
								labelWidth: 80,
								reference: 'txtGrNo',
								width:180,
								labelAlign: 'right',
								emptyText: ViewUtil.getLabel('gr')
							},{
								xtype: 'datefield',
								reference: 'dtRehandleFrom',
								fieldLabel: ViewUtil.getLabel('rehandleDt'),
								format: MOST.config.Locale.getShortDate(),
								labelAlign: 'right',
								editable: false,
								width:197,
								listeners: {
									//blur: 'onDateChange'
								}
							},{
								xtype: 'datefield',
								reference: 'dtRehandleTo',
								format: MOST.config.Locale.getShortDate(),
								width:120,
								editable: false,
								listeners: {
									//blur: 'onDateChange'
								}
							}]
						},{
							xtype:'container',
							layout:{
								type:'hbox',
								aling:'strecth'
							},
							flex: 1,
							defaults: {
								labelAlign: 'right',
								labelWidth: 80,
								margin: '0 0 0 5'
							},
							margin: '5 5 0 0',
							items:[{
								xtype: 'checkboxfield',
								boxLabel: ViewUtil.getLabel('nonVessel'),
								margin: '0 0 0 70',
								reference: 'chkNonJpvc',
								listeners: {
									change: 'onNonJPVCChange'
								}
							},{
								xtype: 'datefield',
								reference: 'dtEstArrvDtFrom',
								fieldLabel: ViewUtil.getLabel('estArrvDt'),
								format: MOST.config.Locale.getShortDate(),
								margin: '-5 0 0 62',
								labelWidth: 110,
								width:240,
								editable: false,
								disabled: true,
								listeners: {
									//blur: 'onDateChange'
								}
							},{
								xtype: 'datefield',
								reference: 'dtEstArrvDtTo',
								format: MOST.config.Locale.getShortDate(),
								width:120,
								editable: false,
								disabled: true,
								listeners: {
									//blur: 'onDateChange'
								}
							},{
								xtype: 'combobox',
								reference: 'cboNonJPVCSN',
								fieldLabel: ViewUtil.getLabel('nonVesselSN'),
								bind: {store: '{nonJPVCSNCombo}'},
								//listeners:{
									//select:'onSelectCargoType'
								//},
								matchFieldWidth: true,
								width:270,
								labelWidth: 90,
								queryMode: 'local',
								displayField: 'shipgNoteNo',
								valueField: 'shipgNoteNo',
								editable: false,
								disabled: true
							},{
								xtype:'button',
								text: ViewUtil.getLabel('findNonVesselSN'),
								iconCls: 'x-fa fa-search',
								width:145,
								disabled: true,
								reference: 'btnFindNonJPVCSN',
								listeners:{
									click:'onFindNonJPVCSN'
								}
							}]
						},{
							xtype:'container',
							layout:{
								type:'hbox',
								aling:'strecth'
							},
							flex: 1,
							defaults: {
								labelAlign: 'right',
								labelWidth: 80,
								margin: '0 0 0 5'
							},
							margin: '5 5 0 0',
							items:[{
								xtype: 'combobox',
								reference: 'cboCategory',
								fieldLabel: ViewUtil.getLabel('category'),
								bind: {
									store: '{categoryCombo}'
								},
								displayField: 'scdNm',
								valueField: 'scd',
								matchFieldWidth: true,
								width:240,
								queryMode: 'local',
								editable: false
							},{
								xtype: 'combobox',
								reference: 'ctlRehandleRehandleMode',
								fieldLabel: ViewUtil.getLabel('rhdlMode'),
								bind: {
									store: '{rehandleModeCombo}'
								},
								matchFieldWidth: true,
								labelWidth: 80,
								width:250,
								queryMode: 'local',
								displayField: 'scdNm',
								valueField: 'scd',
								editable: false
							},{
								xtype: 'combobox',
								reference: 'cboCGCondition',
								fieldLabel: ViewUtil.getLabel('cgCondition'),
								bind: {
									store: '{cargoConditionCombo}'
								},
								//listeners:{
									//select:'onSelectCargoType'
								//},
								matchFieldWidth: true,
								labelWidth: 90,
								width:220,
								queryMode: 'local',
								displayField: 'scdNm',
								valueField: 'scd',
								editable: false
							},{
								xtype: 'combobox',
								reference: 'cboSpecCGCondition',
								fieldLabel: ViewUtil.getLabel('specCgCondition'),
								bind: {
									store: '{specCargoConditionCombo}'
								},
								matchFieldWidth: true,
								labelWidth: 120,
								width:295,
								queryMode: 'local',
								displayField: 'scdNm',
								valueField: 'scd',
								editable: false
							}]
						}	
					]
				}],
			}
		]
		});
		
		me.callParent();
	}
});