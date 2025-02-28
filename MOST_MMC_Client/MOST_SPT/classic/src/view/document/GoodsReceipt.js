Ext.define('MOST.view.document.GoodsReceipt', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-goodsreceipt',
	requires: [
		'MOST.view.document.GoodsReceiptController',
		'MOST.view.document.GoodsReceiptModel',
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	detailViewAlias: 'app-goodsreceiptdetail',
	
	controller: 'goodsreceipt',
	
	viewModel: {
		type: 'goodsreceipt'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refGoodsReceiptGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'goodsReceipt',			// Main Store Name
	QUANTITY_COMBO_STORE: 'quantityCombo',
	SN_COMBO_STORE: 'snCombo',
	GR_COMBO_STORE: 'grCombo',
	DELIVERY_MODE_STORE: 'dmodeCombo',
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
		Ext.apply(me,{
			layout: {
				type: 'vbox', 
				align: 'stretch' 
			},
			items: [{//Copy GoodsReceip to create...
				xtype: 'fieldset',
				layout: {
					type: 'hbox',
					align: 'stretch'
				},
				margin: '5 5 5 5',
				defaults:{
					margin: '5 5 5 5',
					pack: 'center'
				},
				items: [{
					xtype: 'textfield',
					width:50,
					maskRe: /[0-9]/,
					enforceMaxLength: true,
					emptyText:'1',
					reference:'refTxtCopyQuantity',
					fieldStyle: 'text-align: center;'
				},{
					xtype: 'button',
					text: ViewUtil.getLabel('copy'),
					listeners: {
						click: 'onCopy'
					}
				},{
					xtype: 'combobox',
					reference: 'ctlQuantity',
					labelWidth:100,
					width: 150,
					bind: {
						store: '{' + me.QUANTITY_COMBO_STORE + '}'
					},
					displayField: 'name',
					valueField: 'code',
					editable: false,
					listeners: {
						select: 'selectQuantity'
					},
					queryMode: 'local'
				},{
					xtype: 'textfield',
					reference: 'ctlCumulativeTotalReceived',
					labelWidth:170,
					width: 320,
					fieldLabel: ViewUtil.getLabel('cumulativeTotalReceived'),
					labelAlign: 'right',
					editable: false
				},{
					xtype: 'textfield',
					reference: 'ctlBalanceToReceive',
					labelWidth:150,
					width: 290,
					fieldLabel: ViewUtil.getLabel('balanceToReceive'),
					labelAlign: 'right',
					editable: false
				}]
			},{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				flex: 1,
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
				listeners : {
					celldblclick: 'onDblClick',
					pagingSearch:'onSearch'
				},
				columns: {
					defaults: {
						style : 'text-align:center',
						align: 'center'
					},
					items: GridUtil.getGridColumns('GoodsReceipt')
				}
			}],
			// DockageItems --------------------------------
			dockedItems:[{//Toolbar buttons:
				xtype : 'container',
				style: { "background-color":"white" },
				layout: {
					type: 'hbox',
				},
				defaults: {
					margin: '1 1 1 1'
				},
				items: [{
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
					itemId:'createItemId',
					reference:'refBtnCreate',
					text:  ViewUtil.getLabel('add'),
					ui: 'create-button',
					iconCls: 'x-fa fa-plus',
					listeners: {
						click: 'onAdd'
					}
				},{
					xtype: 'button',
					itemId:'deleteItemId',
					reference:'refBtnDelete',
					text: ViewUtil.getLabel('remove'),
					ui: 'delete-button',
					iconCls: 'x-fa fa-minus',
					listeners: {
						click: 'onRemove'
					},
				},
				{
					xtype: 'button',
					itemId: 'exportToExcelButton',
					text: ViewUtil.getLabel('exportToExcel'),
					iconCls: 'excel-button-image', 
					cls: 'excel-button'
				},
				{
					xtype: 'button',
					itemId: 'exportToPdfButton',
					text: ViewUtil.getLabel('exportToPdf'),
					iconCls: 'x-fa fa-file-pdf-o',
					cls: 'excel-button'
				},
				{
					xtype : 'button',
					itemId : 'downloadItemId',
					text : ViewUtil.getLabel('export'),
					cls : 'excel-button',
					iconCls : 'fa fa-file-excel-o',
					hidden : true
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
			},{// Toolbar SearchCondition and VesselInfo:
				xtype: 'toolbar',
				enableOverflow: true,
				padding : '0 0 0 0',
				margin: '0 0 0 0',
				defaults: {
					labelAlign: 'right',
				},
				items:[{
					xtype: 'fieldset',
					autoScroll: true,
					collapsible:true,
					margin: '5 5 5 5',
					flex:1,
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults:{
						margin: '0 0 5 0'
					},
					items:[{// Left: Search Condition
						xtype: 'searchfieldset',
						title: ViewUtil.getLabel('search'),
						layout: {
							type: 'vbox'
						},
						items: [{
							xtype: 'container',
							layout: { type: 'hbox'},
							defaults:{
								margin: '0 0 0 5',
								labelAlign: 'right'
							},
							items: [{
								xtype:'vesselcalllistfield',
								reference:'ctlJpvc',
								fieldLabel: ViewUtil.getLabel('vslcallid'),
								labelWidth: 85,
								width:300,
								flex: 1,
								bind:{value: '{theSearch.vslCallId}'}
							}]
						},{
							xtype: 'container',
							layout: {
								type: 'hbox'
							},
							flex:1,
							defaults:{
								margin: '5 5 0 0',
								labelAlign: 'right'
							},
							items: [{
								xtype: 'combobox',
								reference:'ctlSNN',
								fieldLabel: ViewUtil.getLabel('sNNo'),
								//editable: false,
								bind: {
									store: '{' + me.SN_COMBO_STORE + '}',
									value: '{theSearch.shipgNoteNo}'
								},
								displayField: 'shipgNoteNo',
								valueField: 'shipgNoteNo',
								queryMode: 'local',
								flex: 1,
								labelWidth: 90,
								width:305,
								listeners : {
									select: 'onSelectShipgNoteNoCombo'
								},
								anyMatch: true
							}]
						},{
							xtype: 'container',
							layout: {
								type: 'hbox'
							},
							flex:1,
							defaults:{
								margin: '5 5 0 0',
								labelAlign: 'right'
							},
							items: [{
								xtype: 'combobox',
								reference:'ctlGRNo',
								fieldLabel: ViewUtil.getLabel('gRNo'),
								bind: {
									store: '{' + me.GR_COMBO_STORE + '}',
									value: '{theSearch.grNo}'
								},
								displayField: 'grNo',
								valueField: 'grNo',
								queryMode: 'local',
								anyMatch: true,
								flex: 1,
								labelWidth: 90,
								width:305
							}]
						},{
							xtype: 'container',
							layout: { type: 'hbox'},
							flex:1,
							defaults:{
								margin: '5 5 0 0',
								labelAlign: 'right'
							},
							items: [{
								xtype: 'combobox',
								reference:'ctlDMode',
								editable: false,
								fieldLabel: ViewUtil.getLabel('dMode'),
								valueField: 'DMode',
								queryMode: 'local',
								bind: {
									store: '{' + me.DELIVERY_MODE_STORE + '}',
									value: '{theSearch.delvTpCd}'
								},
								displayField: 'name',
								valueField: 'code',
								value : '',
								flex:1,
								labelWidth: 90,
								width:305
							}]
						},
						{
                            xtype: 'checkboxfield',
                            width: 250,
							reference:'ctlReturnToShipper',
                            fieldLabel: ViewUtil.getLabel('returnToshipper'),
                            inputValue: 'Y',
                            uncheckedValue: 'N',
                            name: 'RTS',
                        }]
					},{//Right: VesselInfo:
						xtype: 'fieldset',
						title: ViewUtil.getLabel('vslInfo'),
						layout: {
							type: 'vbox',
							align: 'stretch'
						},
						flex: 1,
						margin: '0 0 5 5',
						items: [{
							xtype: 'container',
							layout: {
								type: 'hbox'
							},
							defaults:{
								margin: '5 5 0 0',
								labelAlign: 'right'
							},
							items: [
								{
									xtype: 'textfield',
									width: 250,
									editable: false,
									fieldLabel:  ViewUtil.getLabel('vesselCode'),
									bind: '{theVslCallId.vslCd}',
									labelWidth: 90,
								},
								{
									xtype: 'textfield',
									width: 220,
									editable: false,
									fieldLabel: ViewUtil.getLabel('arrvSaId'),
									bind: '{theVslCallId.arrvSaId}',
									labelWidth: 50,
									hasFocus: false,
								},
								{
									xtype: 'textfield',
									width: 250,
									editable: false,
									fieldLabel: ViewUtil.getLabel('berthingLoc'),
									bind: '{theVslCallId.berthLoc}',
									labelWidth: 80,
								}
							]
						},{
							xtype: 'container',
							layout: {
								type: 'hbox'
							},
							defaults:{
								margin: '5 5 0 0',
								labelAlign: 'right'
							},
							items: [
								{
									xtype: 'textfield',
									width: 250,
									editable: false,
									fieldLabel: ViewUtil.getLabel('vesselName'),
									bind: '{theVslCallId.vslNm}',
									labelWidth: 90
								},
								{
									xtype:'textfield',
									reference:'dtEta',
									editable: false,
									width: 220,
									fieldLabel: ViewUtil.getLabel('deprSaId'),
									bind: '{theVslCallId.depSaId}',
									labelWidth: 50
								},
								{
									xtype: 'textfield',
									width: 250,
									editable: false,
									fieldLabel: ViewUtil.getLabel('storageLoc'),
									labelWidth: 80
								}
							]
						},{
							xtype: 'container',
							layout: {
								type: 'hbox'
							},
							defaults:{
								margin: '5 5 0 0',
								labelAlign: 'right'
							},
							items: [{
								xtype: 'textfield',
								editable: false,
								width: 250,
								fieldLabel: ViewUtil.getLabel('voyage'),
								bind: '{theVslCallId.voyage}',
								labelWidth: 90
							},{
								xtype:'datefield',
								editable: false,
								readOnly:true,
								width: 220,
								fieldLabel: ViewUtil.getLabel('eta'),
								bind: '{theVslCallId.eta}',
								format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
								labelWidth: 50
							},{
								xtype:'datefield',
								editable: false,
								readOnly:true,
								width: 250,
								fieldLabel: ViewUtil.getLabel('etd'),
								bind: '{theVslCallId.etd}',
								format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
								labelWidth: 80
							}]
						}]
					}]
				}]
			}]
		});
		
		me.callParent();
	}
});

