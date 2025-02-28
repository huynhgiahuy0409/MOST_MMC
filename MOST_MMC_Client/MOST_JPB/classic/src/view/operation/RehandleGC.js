Ext.define('MOST.view.operation.RehandleGC', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-rehandle',
	requires: [
		'MOST.view.operation.RehandleGCModel',
		'MOST.view.operation.RehandleGCController',
		'Ext.grid.plugin.CellEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	controller: 'rehandle',
	
	viewModel: {
		type: 'rehandle'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	 MAIN_GRID_REF_NAME: 'refRehandleGrid', 
	 RHD_DETAIL_GRID_REF_NAME: 'refRehandleDataGrid',
	 MAIN_STORE_NAME: 'rehandle',
	 RHD_DETAIL_STORE_NAME: 'rehandleDetailList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
//		var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
//			ptype: 'cellediting',
//			clicksToEdit: 1,
//			pluginId :'singleGridEditor',
//			listeners: {
//				edit: 'onEdit',
//				cancelEdit: 'onCancelEdit',
//				beforeedit: 'onBeforeEdit'
//			}
//		});
		
		Ext.apply(me, {
			items: [
			{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				flex : 1,
				stateful : true,
				stateId : 'stateRehandleGrid',
				usePagingToolbar: false,
				plugins: [
					//cellEditing, 
					'gridexporter',
					'gridfilters',
					'clipboard'
	    		],
	    		margin:'5 5 5 0',
	    		bind: {
	    			store: '{' + me.MAIN_STORE_NAME + '}'
	    		},
	    		// selModel: {
	    		// 	type: 'checkboxmodel',  
		        //     checkOnly: false,
		        //     showHeaderCheckbox: false
				// },
				selModel: {
					type: 'spreadsheet',
					rowSelect: true,
					cellSelect: false,
					mode: 'SINGLE',
				},
				listeners: {
					//celldblclick: 'onDblClick',
					cellclick:'onClick',
					pagingSearch: 'onSearch'
				},
	            
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items:GridUtil.getGridColumns('Rehandle')
				}
		    },
			{
				xtype:'container',
				reference: 'ctlRhdlCtnRehandleAmt',
				scrollable: true,
				layout:{
					type: 'hbox'
				},
				margin:'5 5 5 0',
				defaults:{
					labelAlign:'right',
					width: 190,
					labelWidth: 70,
				},
				items:[
					{
						xtype:'numberfield',
						reference:'ctlRhdlPkgQty',
						fieldLabel: 'RhdlPkgQty',
						bind: '{theRHDAmt.rhdlPkgQty}',
						selectOnFocus : true,
						maxValue: 999999,
						minValue : 0,
						decimalPrecision: 0,
						hideTrigger: true,
						listeners:{
							change: 'onChangeRhdlQty'
						}
					},
					{
						xtype:'numberfield',
						reference:'ctlRhdlWgt',
						fieldLabel: 'RhdlWgt',
						bind: '{theRHDAmt.rhdlWgt}',
						margin:'0 0 0 15',
						selectOnFocus : true,					
						maxValue: 999999.999,
						minValue : 0,
						decimalPrecision: 3,
						hideTrigger: true,
					},
					{
						xtype:'numberfield',
						reference:'ctlRhdlM3',
						fieldLabel: 'RhdlM3',
						bind: '{theRHDAmt.rhdlMsrmt}',
						margin:'0 0 0 15',
						selectOnFocus : true,
						maxValue: 999999.999,
						minValue : 0,
						decimalPrecision: 3,
						hideTrigger: true,
					},
					{
						xtype: 'button',
						text: ViewUtil.getLabel('update'),
						// cls: 'search-button', 
						margin:'0 0 0 10',
						reference:'ctlRhdlBtnUpdate',
						listeners: {
							click: 'onUpdateRHD'
						},
						width: 100,
					},
					{
						xtype: 'button',
						text: ViewUtil.getLabel('rehandling'),
						cls: 'print-button', 
						margin:'0 0 0 10',
						reference:'ctlRhdlBtnRehandling',
						listeners: {
							click: 'onRehandle'
						},
						width: 100,
					},
					{
						xtype: 'tbfill'
					},
					{
						xtype: 'button',
						text: ViewUtil.getLabel('update'),
						reference:'ctlUpdateAfterCreate',
						listeners: {
							click: 'onUpdateAfterCreate'
						},
						width: 100,
					},
					{
						xtype: 'button',
						itemId: 'btnDelete',
						reference: 'ctlRhdlBtnRemove',
						text: ViewUtil.getLabel('remove'),
						ui: 'delete-button',
						iconCls: 'x-fa fa-minus',
						width: 100,
						listeners: {
							click: 'onRehandleDetailRemove'
						}
					},
				]
			},
			{
				xtype: 'tsb-datagrid',
				reference: me.RHD_DETAIL_GRID_REF_NAME,
				flex : 1,
				stateful : true,
				stateId : 'stateRehandleDetailGrid',
				usePagingToolbar: false,
				plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
	    		],
	    		selModel: {
					type: 'spreadsheet',
					cellSelect: false,
					mode: 'SINGLE',
				},
	    		margin:'5 5 5 0',
	    		bind: {
	    			store: '{' + me.RHD_DETAIL_STORE_NAME + '}'
	    		},
				listeners: {
					//celldblclick: 'onDblClick',
					cellclick:'onDetailClick',
					//pagingSearch: 'onSearch'
				},
	            
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items:GridUtil.getGridColumns('RehandleDetail')
				}
		    },
		],
			dockedItems: [
				{
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
        					reference:'ctlRehandleModeButton',
        					text: ViewUtil.getLabel('rehandleButton'),
        					iconCls: 'fa fa-balance-scale',
							hidden: true,
        					listeners: {
        						click: 'onRehandle'
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
					defaults: {
						labelAlign: 'right',
					},
					items: [
						{
							xtype:'searchfieldset',
							title: ViewUtil.getLabel('search'),
							autoScroll: true,
							collapsible:true,
							layout: {
								type:'vbox',
								align:'stretch'
							},
							defaults: {
								margin: '0 0 5 0'
							},
							flex: 1,
							items: [
								{
									xtype: 'container',
									layout:{
										type:'hbox'
									},
									defaults:{
										labelAlign:'right',
										labelWidth: 80
									},
									margin: '5 0 0 0',
									items: [
										{
											xtype: 'datefield',
											reference: 'ctlEstArrFromDt',
											labelWidth: 100,
											flex: 0.7,
											fieldLabel: ViewUtil.getLabel('rehandleYardInDate'),
											format: MOST.config.Locale.getShortDate(),
											listeners: {
												select: {
													fn: 'onCheckDateTimeValid',
													args: ['ctlEstArrFromDt', 'ctlEstArrToDt']
												}
											},
											bind: {
												value: '{theSearch.yardInDateFrom}'
											}
										},{
											xtype: 'datefield',
											reference: 'ctlEstArrToDt',
											margin: '0 0 0 5',
											flex: 0.37,
											format: MOST.config.Locale.getShortDate(),
											listeners: {
												select: {
													fn: 'onCheckDateTimeValid',
													args: ['ctlEstArrFromDt', 'ctlEstArrToDt']
												}
											},
											bind: {
												value: '{theSearch.yardInDateTo}'
											}
										},{
											// xtype: 'button',
											// text: ViewUtil.getLabel('find'),
											// margin: '0 0 0 5',
											// iconCls: 'x-fa fa-search',
											// listeners: {
											// 	click: 'onSnFind'
											// }
										},{
											xtype: 'shipcallnofield',
											reference: 'ctlScn',
											flex: 1,
											labelWidth: 100,
											/*emptyText: ViewUtil.getLabel('shipCallNo'),*/
											fieldLabel: ViewUtil.getLabel('shipCallNo'),
											bind: {
												value: '{theSearch.scn}',
											},
										},{
											xtype: 'shipcallnofield',
											reference: 'ctlNextScn',
											flex: 1,
											labelWidth: 100,
											/*emptyText: ViewUtil.getLabel('shipCallNo'),*/
											fieldLabel: ViewUtil.getLabel('shipCallNo'),
											bind: {
												value: '{theSearch.nxScn}',
											},
										},{
											xtype: 'container',
											flex: 1
										},{
											xtype: 'container',
											flex: 1
										},
									]
								},{
									xtype: 'container',
									layout:{
										type:'hbox'
									},
									defaults:{
										labelAlign:'right',
										labelWidth: 80
									},			
									margin: '5 0 0 0',
									items: [
										{
											reference: 'ctlRehandleCategory',
											xtype: 'combo',
											flex: 1.08,
											labelWidth: 100,
											fieldLabel: ViewUtil.getLabel('rehandleCategory'),
											queryMode: 'local',
											bind: {
												store: '{categoryCombo}',
												value: '{theSearch.opeClassCd}'
											},
											displayField: 'scdNm',
											valueField: 'scd',
											forceSelection:true,
											emptyText:'All'
										},{
											xtype:'vesselcalllistfield',
											flex: 1,
											labelWidth: 100,
											fieldLabel: ViewUtil.getLabel('vessel'),
											reference:'ctlRehandleJpvc',
											bind: {
												value: '{theSearch.vslCallId}'
											}
										},{
											xtype:'vesselcalllistfield',
											flex: 1,
											labelWidth: 100,
											fieldLabel: ViewUtil.getLabel('rehandleNextVessel'),
											reference:'ctlRehandleNextJpvc',
											bind: {
												value: '{theSearch.nxVslCallId}'
											},
											allowSetVessel: false,
										},{
											xtype: 'container',
											flex: 1
										},{
											xtype: 'container',
											flex: 1
										}
									]
								},{
									xtype: 'container',
									layout: {
										type:'hbox'
									},
									defaults:{
										labelAlign:'right',
										labelWidth: 100
									},
									margin: '5 0 0 0',
									items: [
										{
											reference: 'ctlRehandleRehandleModeSearch',
											xtype: 'combo',
											flex: 1.077,
											fieldLabel: ViewUtil.getLabel('rehandleRehandleMode'),
											queryMode: 'local',
											bind: {
												store: '{rehandleModeSearchCombo}',
												value: '{theSearch.rhdlMode}'
											},
											displayField: 'scdNm',
											valueField: 'scd',
											forceSelection:true,
											emptyText:'All'
										},{
											reference: 'ctlRehandleMasterBlNo',
											xtype: 'combo',
											flex: 1.0035,
											labelWidth: 100.03,
											fieldStyle: 'text-transform:uppercase',
											fieldLabel: ViewUtil.getLabel('masterBlNo'),
											queryMode: 'local',
											bind: {
												store: '{rehandleMasterBlNoCombo}',
												value: '{theSearch.masterBlNo}'
											},
											listeners:{
												select: 'onChangeMasterBl'
											},
											emptyText:'Select',
											displayField: 'scdNm',
											valueField: 'mfdocid',
											forceSelection:true
										},{
											reference: 'ctlRehandleNextSn',
											xtype: 'combo',
											flex: 1,
											labelWidth: 100,
											fieldStyle: 'text-transform:uppercase',
											fieldLabel: ViewUtil.getLabel('rehandleNextSn'),
											queryMode: 'local',
											bind: {
												store: '{rehandleNextSnNoCombo}',
												value: '{theSearch.nxRefNo}'
											},
											emptyText:'Select',
											displayField: 'scdNm',
											valueField: 'shipgNoteNo',
											forceSelection:true
										},{
											xtype: 'container',
											flex: 1
										},{
											xtype: 'container',
											flex: 1
										}
									]
								},{
									xtype: 'container',
									layout: {
										type:'hbox'
									},
									defaults: {
										labelAlign:'right',
										labelWidth: 100
									},			
									margin: '5 0 0 0',
									items: [
										{
											xtype: 'container',
											flex: 1
										},{
											reference: 'ctlRehandleBl',
											xtype: 'combo',
											flex: 1.079,
											labelWidth: 124.5,
											fieldLabel: ViewUtil.getLabel('rehandleBl'),
											queryMode: 'local',
											fieldStyle: 'text-transform:uppercase',
											bind: {
												store: '{rehandleBlNoCombo}',
												value: '{theSearch.blNo}'
											},
											emptyText:'Select',
											displayField: 'scdNm',
											valueField: 'blno',
											forceSelection:true
										},{
											reference: 'ctlCommodityGroup',
											xtype: 'combo',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('commodityGroup'),
											queryMode: 'local',
											fieldStyle: 'text-transform:uppercase',
											bind: {
												store: '{commodityGroupCombo}',
												value: '{theSearch.cmdtGrCd}'
											},
											emptyText:'Select',
											displayField: 'scdNm',
											valueField: 'scd',
											forceSelection:true,
											listeners:{
												select: 'onChangeCommodityGroup'
											},
										},{
											xtype: 'textfield',
											reference: 'ctlPackageNo',
											flex: 1,
											labelWidth: 80,
											fieldLabel: ViewUtil.getLabel('packageNo'),
											bind: {
												value: '{theSearch.pkgNo}'
											},
											fieldStyle: 'text-transform:uppercase',
										},{
											xtype: 'container',
											flex: 1
										}
									]
								},{
									xtype: 'container',
									layout:{
										type:'hbox'
									},
									defaults:{
										labelAlign:'right',
										labelWidth: 100
									},			
									margin: '5 0 0 0',
									items: [
										{
											xtype: 'container',
											flex: 1
										},{
											reference: 'ctlRehandleBookingNo',
											xtype: 'combo',
											flex: 1.079,
											labelWidth: 125,
											fieldLabel: ViewUtil.getLabel('SNLBookingNo'),
											queryMode: 'local',
											fieldStyle: 'text-transform:uppercase',
											bind: {
											store: '{rehandleBookingNoCombo}',
											value: '{theSearch.bookingNo}'
											},
											emptyText:'Select',
											displayField: 'scdNm',
											valueField: 'mfDocId',
											forceSelection:true,
											listeners:{
												select: 'onChangeBookingNo'
											},
										},{
											reference: 'ctlCommodityCode',
											xtype: 'combo',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('commodityCode'),
											queryMode: 'local',
											fieldStyle: 'text-transform:uppercase',
											bind: {
												store: '{commodityCodeCombo}',
												value: '{theSearch.cmdtCd}'
											},
											emptyText:'Select',
											displayField: 'scdNm',
											valueField: 'scd',
											forceSelection:true,
										},{
											xtype: 'container',
											flex: 1
										},{
											xtype: 'container',
											flex: 1
										}
									]
								},{
									xtype: 'container',
									layout: {
										type:'hbox'
									},
									flex: 1,
									defaults: {
										labelAlign:'right',
										labelWidth: 100
									},			
									margin: '5 0 0 0',
									items: [
										{
											xtype: 'container',
											flex: 1
										},{
											reference: 'ctlRehandleSn',
											xtype: 'combo',
											flex: 1.079,
											labelWidth: 125,
											fieldStyle: 'text-transform:uppercase',
											fieldLabel: ViewUtil.getLabel('rehandleSn'),
											queryMode: 'local',
											bind: {
												store: '{rehandleSnNoCombo}',
												value: '{theSearch.shipgNoteNo}'
											},
											emptyText:'Select',
											displayField: 'scdNm',
											valueField: 'shipgNoteNo',
											forceSelection:true
										},{
											xtype:'partnercdfield',
											reference:'ctlShipperConsignee',
											fieldLabel: ViewUtil.getLabel('shipperConsignee'),
											flex: 1,
											labelWidth: 100,
											align : 'left',
											params: {
												searchPtyDivCd: CONSTANTS.PTNR_TYPE_SHIPPER_CONSIGNEE 
											},
											bind: {
												value: '{theSearch.shipgAgentCd}'
											}
										},{
											xtype: 'container',
											flex: 1
										},{
											xtype: 'container',
											flex: 1
										}
									]
								}
							]
						}
					],
				}
		    ]			
		});
		me.callParent();
	}
});

