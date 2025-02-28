Ext.define('MOST.view.operation.VesselOprSetting', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-equipmentsetting',
	requires: [
		'MOST.view.operation.VesselOprSettingModel',
		'MOST.view.operation.VesselOprSettingController',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refVesselOprSettingGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'vesselOprSettingList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	controller: 'vesseloprsetting',
	
	viewModel: {
		type: 'vesseloprsetting'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},

	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;

		Ext.apply(me, {
			items: [{
                xtype: 'fieldset',
                margin: '5 5 5 0',
				padding: '10 10 10 10',
                layout: {
                    type: 'hbox',
					align: 'stretch'
                },
				items:[
					{
						xtype: 'container',
						flex: 1,
						layout:{
							type :'vbox'
						},
						defaults:{
							labelWidth : 100,
							labelAlign: 'right',
							margin : '0 0 5 0',
							width: '100%'
						},
						items:[
							{
								xtype: 'combo',
								fieldLabel: ViewUtil.getLabel('equipmentSettingCgtpcd'),
								bind: {
									store: '{breakDryBulkCombo}',
									value: '{theEquipmentSetting.cgTpCd}',
								},
								queryMode: 'local',
						        displayField: 'cdNm',
						        valueField: 'cd',
						        emptyText : 'Select',
						        forceSelection : true,
						        allowBlank: false,
						        reference:'refCboBreakDryBulk',
						        listeners:{
						        	change: 'onBreakDryBulkSet'
						        }
							},{
								xtype: 'datefield',
								fieldLabel: ViewUtil.getLabel('equipmentSettingWorkymd'),
								format: MOST.config.Locale.getShortDate(),
						        allowBlank: false,
						        //bind:'{theEquipmentSetting.workYmd}',
						        reference:'refWorkYmd',
						        listeners:{
						        	change:'getEquipmentCodeFromWorkDate'
						        }
							},{
								xtype: 'combo',
								fieldLabel: ViewUtil.getLabel('equipmentSettingShftnm'),
								bind: {
									store: '{shiftCombo}',
									value: '{theEquipmentSetting.shftId}',
								},
								queryMode: 'local',
						        displayField: 'shftNm',
						        valueField: 'shftId',
						        reference:'refCboShift',
						        emptyText: ViewUtil.getLabel('select'),
						        forceSelection : true,
						        allowBlank: false,
						        listeners:{
						        	select:'getEquipmentCode'
						        }
							},{
								xtype: 'combo',
								margin: '0 0 0 0',
								fieldLabel: ViewUtil.getLabel('equipmentSettingHatchdrtcd'),
								bind: {
									store: '{apfpCombo}',
									value: '{theEquipmentSetting.hatchDrtCd}',
								},
								queryMode: 'local',
						        displayField: 'scdNm',
						        valueField: 'scd',
						        reference: 'refsEditAPFP',
						        emptyText: ViewUtil.getLabel('select'),
						        editable: false
							}
						]
					},
					{
						xtype: 'container',
						flex: 1,
						layout: {
							type: 'vbox'
						},
						defaults: {
							labelWidth: 100,
							labelAlign: 'right',
							margin: '0 0 5 0',
							width: '100%'
						},
						items: [
							{
								xtype: 'combo',
								fieldLabel: ViewUtil.getLabel('equipmentSettingHatchno'),
								bind: {
									store: '{hatchNoCombo}',
									value: '{theEquipmentSetting.hatchNo}',
								},
								queryMode: 'local',
								displayField: 'cdNm',
								valueField: 'cd',
								reference: 'refCboHatchNo',
								emptyText: ViewUtil.getLabel('select'),
								allowBlank: false,
								forceSelection: true
							},
							{
								xtype: 'combo',
								fieldLabel: ViewUtil.getLabel('equipmentSettingEqfacno'),
								bind: {
									store: '{equipmentCombo}',
									value: '{theEquipmentSetting.eqFacNo}',
								},
								queryMode: 'local',
								reference: 'refCboEquip',
								displayField: 'scdNm',
								valueField: 'scd',
								emptyText: ViewUtil.getLabel('select'),
								forceSelection: true,
								editable: true,
								disabled: false,
								allowBlank: true,
								fieldStyle: ''
							},
							{
								xtype: 'combo',
								fieldLabel: ViewUtil.getLabel('equipmentSettingFacilityname'),
								bind: {
									store: '{facilityCombo}',
									value: '{theEquipmentSetting.facilityName}',
								},
								queryMode: 'local',
								displayField: 'scdNm',
								valueField: 'scd',
								reference: 'refsEditFacility',
								emptyText: ViewUtil.getLabel('select'),
								editable: false
							},
							{
								xtype: 'combo',
								margin: '0 0 0 0',
								fieldLabel: ViewUtil.getLabel('equipmentSettingSACharge'),
								bind: {
									store: '{saChangeCombo}',
									value: '{theEquipmentSetting.dptAgent}',
								},
								reference: 'refComboDptAgent',
								queryMode: 'local',
								displayField: 'label',
								valueField: 'data',
								value: '',
								listeners: {
									change: 'onSaChangeCombo'
								}
							}
						]
					},
					{
						xtype: 'container',
						flex: 1,
						layout: {
							type: 'vbox'
						},
						defaults: {
							labelWidth: 100,
							labelAlign: 'right',
							margin: '0 0 5 0',
							width: '100%'
						},
						items: [
							{
								xtype: 'datetimefield',
								fieldLabel: ViewUtil.getLabel('equipmentSettingStartDate'),
								reference: 'refWorkStDt',
								bind: '{theEquipmentSetting.workStDt}',
								allowBlank: false,
								format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
							}, {
								xtype: 'datetimefield',
								fieldLabel: ViewUtil.getLabel('equipmentSettingEndDate'),
								reference: 'refWorkEndDt',
								bind: '{theEquipmentSetting.workEndDt}',
								allowBlank: false,
								format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
							}, {
								xtype: 'combo',
								fieldLabel: ViewUtil.getLabel('equipmentSettingTopclean'),
								bind: {
									store: '{topCleanCombo}',
									value: '{theEquipmentSetting.topClean}',
								},
								queryMode: 'local',
								displayField: 'scdNm',
								valueField: 'scd',
								reference: 'refsEditTopClean',
								emptyText: ViewUtil.getLabel('select'),
								editable: false
							}
						]
					},
					{
						xtype: 'container',
						flex: 1,
						layout: {
							type: 'vbox',
							align: 'stretch'
						},
						defaults: {
							labelWidth: 100,
							labelAlign: 'right',
							margin: '0 0 0 0',
							width: '100%',
							flex: 1
						},
						items: [
							{
								xtype: 'textarea',
								fieldLabel: ViewUtil.getLabel('equipmentSettingRemark'),
								reference: 'refTextfieldRemark',
								bind: '{theEquipmentSetting.remark}',
								maxLength: 200,
								enforceMaxLength: true
							}
						]
					}
				]
			},
			{
				xtype:'container',
				layout:{
					type : 'hbox',
				},
				defaults:{
					labelWidth : 100,
					width : 600,
					labelAlign: 'right',
				},				
				items: [
					{
						xtype: 'container',
						flex: 1,
						layout: {
							type: 'hbox',
							align: 'bottom'
						},
						defaults: {
							margin: '5 5 0 0'
						},
						items: [
							{
								xtype: 'tbfill'
							},
							{
								xtype: 'button',
								text: ViewUtil.getLabel('equipmentSettingClear'),
								iconCls: 'fa fa-file-o',
								reference: 'refRefresh',
								listeners: {
									click: 'onClear'
								}
							},
							{
								xtype: 'button',
								itemId: 'createItemId',
								text: ViewUtil.getLabel('add'),
								reference: 'refBtnCreate',
								ui: 'create-button',
								iconCls: 'x-fa fa-plus',
								listeners: {
									click: 'onAdd'
								}
							},
							{
								xtype: 'button',
								itemId: 'saveItemId',
								text: ViewUtil.getLabel('equipmentSettingSave'),
								ui: 'update-button',
								iconCls: 'x-fa fa-save',
								reference: 'refBtnSave',
								disabled: true,
								listeners: {
									click: 'onSave'
								}
							},
							{

								xtype: 'button',
								reference: 'refBtnDelete', 
								itemId: 'deleteItemId',
								text: ViewUtil.getLabel('delete'),
								ui: 'delete-button',
								iconCls: 'x-fa fa-minus',
								disabled: true,
								listeners: {
									click: 'onRemove'
								}
							}
						]

					}

				]
			},{
				xtype: 'tsb-datagrid',
				margin: '0 5 5 0',
				reference: me.MAIN_GRID_REF_NAME,
				flex : 1,
				stateful : true,
				stateId : 'stateEquipmentSettingGrid',
				plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
	    		],
	    		bind: {
	    			store: '{' + me.MAIN_STORE_NAME + '}'
	    		},
	    		listeners: {
	    			cellClick: 'onEquipmentSettingGridClick',
	    			pagingSearch: 'onSearch'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: GridUtil.getGridColumns('EquipmentSettingList'),
				}
		    },
		    ],
		    
		    dockedItems: [{
		    	xtype: 'container',
		    	style: { "background-color":"white" },
		    	layout:{
					type : 'hbox',
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
					text: ViewUtil.getLabel('search'),
					iconCls: 'x-fa fa-search',
					cls: 'search-button',
					reference:'refBtnRetrieve',
					listeners: {
						click: 'onSearch'
					}
				
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
		    	padding : '0 0 0 0',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right'
            	},
				items: [
					{
						xtype: 'fieldset',
						title: ViewUtil.getLabel('search'),
						autoScroll: true,
						collapsible: true,
						flex: 1,
						padding : '0 10 10 10',
						margin: '0 5 0 0',
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						items: [
							{
								xtype: 'searchfieldset',
								title: ViewUtil.getLabel('search'),
								margin: '0 5 0 0',
								padding: '0 10 10 10',
								flex: 2.5,
								layout: {
									type: 'vbox',
									align: 'stretch'
								},
								items: [
									{
										xtype: 'shipcallnofield',
										reference: 'ctlScn',
										/*emptyText: ViewUtil.getLabel('shipCallNo'),*/
										fieldLabel: ViewUtil.getLabel('shipCallNo'),
										labelWidth: 70,
										bind: {
											value: '{theSearch.scn}',
										},
									},
									{
										xtype: 'vesselcalllistfield',
										labelWidth: 70,
										margin: '5 0 0 0',
										fieldLabel: ViewUtil.getLabel('vslCallId'),
										bind: {
											value: '{theSearch.vslCallId}'
										},
										reference: 'ctlVslCallId',
									}
								]
							}, 
							{
								xtype: 'fieldset',
								title: ViewUtil.getLabel('vslInfo'),
								margin: '0 0 0 5',
								padding: '0 10 10 10',
								flex: 7.5,
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
										flex: 1,
										defaults: {
											labelAlign: 'right',
											margin: '0 0 5 0',
											flex: 1
										},
										items: [
											{
												xtype: 'textfield',
												fieldLabel: ViewUtil.getLabel('equipmentSettingVesselcode'),
												readOnly: true,
												bind: '{theEqSet.vslCd}'
											}, {
												xtype: 'textfield',
												fieldLabel: ViewUtil.getLabel('equipmentSettingVesselname'),
												readOnly: true,
												bind: '{theEqSet.vslNm}'
											}, {
												xtype: 'textfield',
												margin: '0 0 0 0',
												fieldLabel: ViewUtil.getLabel('equipmentSettingVoyage'),
												readOnly: true,
												bind: '{theEqSet.voyage}'
											}
										]
									},
									{
										xtype: 'container',
										layout: {
											type: 'vbox',
											align: 'stretch'
										},
										flex: 1,
										defaults: {
											labelAlign: 'right',
											flex: 1,
											margin: '0 0 5 0'
										},
										items: [
											{
												xtype: 'textfield',
												fieldLabel: ViewUtil.getLabel('equipmentSettingAsa'),
												readOnly: true,
												bind: '{theEqSet.arrvSaId}'
											}, {
												xtype: 'datetimefield',
												format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
												readOnly: true,
												fieldLabel: ViewUtil.getLabel('equipmentSettingEta'),
												bind: '{theEqSet.eta}'
											}, {
												xtype: 'datetimefield', 
												margin: '0 0 0 0',
												format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
												readOnly: true,
												fieldLabel: ViewUtil.getLabel('equipmentSettingEtb'),
												bind: '{theEqSet.etb}'
											},
										]
									},
									{
										xtype: 'container', 
										layout: {
											type: 'vbox',
											align: 'stretch'
										},
										flex: 1,
										defaults: {
											labelAlign: 'right',
											margin: '0 0 5 0'
										},
										items: [{
											xtype: 'textfield',
											readOnly: true,
											fieldLabel: ViewUtil.getLabel('equipmentSettingBerthingloc'),
											bind: '{theEqSet.berthLoc}'
										}, {
											xtype: 'textfield',
											readOnly: true,
											fieldLabel: ViewUtil.getLabel('equipmentSettingStorageloc'),
											bind: '{theEqSet.bbtLoc}'
										}, {
											xtype: 'datetimefield',
											margin: '0 0 0 0',
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
											readOnly: true,
											fieldLabel: ViewUtil.getLabel('equipmentSettingEtd'),
											bind: '{theEqSet.etd}'
										}
										]
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

