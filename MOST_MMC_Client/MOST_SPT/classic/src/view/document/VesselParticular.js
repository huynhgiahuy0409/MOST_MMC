Ext.define('MOST.view.document.VesselParticular', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-vesselparticular',
	
	requires: [],
	
	detailViewAlias: 'app-vesselparticulardetail',
	controller: 'vesselparticular',

	viewModel: {
		type: 'vesselparticular'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refVesselParicularGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'vslParticularList',
	VESSEL_PARTICULAR_CONFIRM_STORE: 'vpConfirmCombo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	listeners: {
		afterrender:'onLoad'
	},
	
	
	layout : {type  : 'vbox', align : 'stretch'},
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				flex: 1,
				stateId: 'stateVesselParicularGrid',
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
					cellDblClick: 'onDblClick',
					pagingSearch: 'onSearch'
				},
				columns :{
					defaults: {
						style: 'text-align:center',
						align: 'center'
					},
					items: GridUtil.getGridColumns('VesselParticular')
				}
			}],
			
   			dockedItems: [{
				xtype : 'container',
				style: { "background-color":"white" },
				layout: {
					type: 'hbox',
				},
				defaults: {
					margin: '1 1 1 1'
				},
				items:[{
					xtype: 'tbfill'
				},{
					xtype: 'button',
					reference : 'refBtnRetrieve',
					text: ViewUtil.getLabel('search'),
					iconCls: 'x-fa fa-search', 
					cls: 'search-button', 
					listeners: {
						click: 'onSearch'
					}
				},
				{
					xtype: 'button',
					itemId:'createItemId',
					reference:'refBtnCreate',
					ui: 'create-button',
					text: ViewUtil.getLabel('add'),
					iconCls: 'x-fa fa-plus',
					listeners: {
						click: 'onAdd'
					}
				},
				{
					xtype: 'button',
					itemId: 'deleteItemId',
					reference:'refBtnDelete',
					text: ViewUtil.getLabel('remove'),
					ui: 'delete-button',
					iconCls: 'x-fa fa-minus',
					listeners: {
						click: 'onRemove'
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
            	}]
   			},{
				xtype : 'toolbar',
				enableOverflow: true,
				padding : '0 0 0 0',
				defaults: {
					labelAlign: 'right',
				},
				items: [{
					xtype: 'searchfieldset',
					title: ViewUtil.getLabel('search'),
					autoScroll: true,
					collapsible:true,
					flex:1,
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					defaults:{
						margin: '0 0 5 0'
					},
					items: [{
						xtype: 'container',
						flex: 1,
						layout: {
							type: 'vbox',
							align: 'stretch'
						},
						defaults: {
							labelAlign: 'right',
							margin: '0 0 0 0'
						},
						items: [{
    						xtype:'container',
    						layout:{
    							type:'hbox'
    						},
    						defaults:{
    							labelAlign: 'right',
    							labelWidth: 80,
    							margin: '0 0 0 0'
    						},
    						items:[{
    								xtype: 'textfield',
    								reference: 'ctlVslNm',
    								fieldLabel: ViewUtil.getLabel('vslpatiVslNm'),
    								labelWidth: 100,
    								width: 250,
    								listeners:{
    									change: 'onUpperCase'
    								},
    								bind: '{theSearch.vslNm}'
    							},{
    								reference: 'ctrlConfirm',
    								xtype: 'combo',
    								fieldLabel: ViewUtil.getLabel('status'),
    								labelWidth: 60,
    								width: 220,
    								emptyText: 'Select',
    								queryMode:'local',
    								displayField: 'scdNm',
    								valueField: 'scd',
    								bind: {
    									store: '{' + me.VESSEL_PARTICULAR_CONFIRM_STORE + '}',
    									value: '{theSearch.confCk}'
    								},
    								editable: false,
    							},{
    								reference: 'ctlDateFromDt',
    								xtype: 'datefield',
    								fieldLabel: ViewUtil.getLabel('vslpatisubDate'),
    								labelWidth: 100,
    								width: 230,
    								format: MOST.config.Locale.getShortDate(),
    								bind: '{theSearch.sdt}'
    							},{
    								reference: 'ctlDateToDt',
    								margin: '0 0 0 5',
    						        xtype: 'datefield',
    						        width:130,
    						        anchor: '100%',
    						        format: MOST.config.Locale.getShortDate(),
    						        bind: '{theSearch.edt}'
    						    }
    						]
						},{
							xtype:'container',
							layout:{
								type:'hbox'
							},
							defaults:{
								labelAlign: 'right',
								labelWidth: 100,
								margin : '5 0 0 0'
							},
							items:[{
								xtype: 'textfield',
								reference: 'ctrlShpOfNo',
								fieldLabel: ViewUtil.getLabel('vslpatiShpOfNo'),
								labelWidth: 100,
								width: 250,
								listeners:{
									change: 'onUpperCase'
								},
								bind: '{theSearch.shipOffNo}'
							},{
								xtype: 'textfield',
								reference: 'ctrlImoNo',
								fieldLabel: ViewUtil.getLabel('vslpatiImoNo'),
								labelWidth: 60,
								width: 220,
								listeners:{
									change: 'onUpperCase'
								},
								bind: '{theSearch.imoNo}'
							},{
								margin : '5 0 0 105',
								xtype: 'button',
								text: ViewUtil.getLabel('vslpatiSchedule'),
								reference:'refBtnCreateVslSch',
								ui: 'create-button',
								iconCls: 'x-fa fa-plus',
								listeners: {
									click: 'createVslSch'
								}
							}]
						}]
					}]
				}]
			}]
		});
		
		me.callParent();
	}	
});