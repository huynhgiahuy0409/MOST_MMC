Ext.define('MOST.view.monitoring.GateOut', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-gateout',
	requires: [
		'MOST.view.monitoring.GateOutModel',
		'MOST.view.monitoring.GateOutController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	controller: 'gateout',
	
	viewModel: {
		type: 'gateout'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	 MAIN_GRID_REF_NAME: 'refGateOutGrid',
	 MAIN_STORE_NAME: 'gateOut',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			layout: {
				type: 'vbox', 
				align: 'stretch' 
			},
			items: [{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				margin: '5 5 5 0',
				flex : 1,
				stateful : true,
				stateId : 'stateGateOutGrid',
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
					pagingSearch: 'onSearch'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: GridUtil.getGridColumns('GateOut')
				}
		    }],
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
					itemId:'inquiryItemId',
					reference:'refBtnRetrieve',
					text: ViewUtil.getLabel('search'),
					iconCls: 'x-fa fa-search',
					cls: 'search-button', 
					listeners: {
						click: 'onSearch'
					}
				},{
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
					itemId: 'previewItemId',
					reference:'refBtnPreview',
					text: ViewUtil.getLabel('preview'),
					iconCls: 'x-fa fa-file-pdf-o',
					cls: 'excel-button',
					listeners: {
						click: {
							fn: 'onPreview',
						}
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
				}	
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
						xtype: 'container',
						flex: 1,
						defaults: {
							margin: '0 5 0 0',
							labelAlign: 'right'
						},
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						items:[
							{
								xtype:'vesselcalllistfield',
								width:270,
								fieldLabel: ViewUtil.getLabel('vessel'),
								labelWidth: 100,
								reference:'ctlGateOutJpvc',
								bind: {
									value: '{theSearch.vslCallId}'
								}	
							},
							{
								reference: 'ctlGateOutFromDt',
								xtype: 'datetimefield',
								labelWidth: 80,
								width: 220,
								fieldLabel: ViewUtil.getLabel('gateOutGoutDate'),
								format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							}, 
							{
								reference: 'ctlGateOutToDt',
								xtype: 'datetimefield',
								width:140,
								format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							}, 
							{
								xtype:'textfield',
								reference:'ctlGateOutLorryNo',
								fieldLabel: ViewUtil.getLabel('gateOutLorryNo'),
								labelWidth: 70,
								width: 240,
								emptyText: ViewUtil.getLabel('gateOutLorryNo'),
								fieldStyle: 'text-transform:uppercase',
								listeners:{
									change: 'onUpperCase'
								},
								bind: '{theSearch.lorryNo}'	
							}, 
							{
								xtype:'textfield',
								reference:'ctlGateOutGrGpNo',
								fieldLabel: ViewUtil.getLabel('gateOutGrGpNo'),
								labelWidth: 80,
								width: 240,
								emptyText: ViewUtil.getLabel('gateOutGrGpNo'),
								fieldStyle: 'text-transform:uppercase',
								listeners:{
									change: 'onUpperCase'
								},
								bind: '{theSearch.gatePassNo}'	
							}
						]
					},{
						xtype: 'container',
						flex: 1,
						defaults: {
							margin: '5 5 0 0',
							labelAlign: 'left'
						},
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						items:[
							{
								xtype:'partnercdfield',
								reference:'ctlGateOutForwarder',
								labelWidth: 100,
								width: 270,
								fieldLabel:ViewUtil.getLabel('forwarder'),
								emptyText:ViewUtil.getLabel('forwarder'),
								params:{
									searchDivCd: 'FWD'
								},
								fieldStyle: 'text-transform:uppercase',
								bind: '{theSearch.fwrAgnt}'	
							},
							{
								xtype: 'combobox',
								labelWidth : 80,
								width:250,
								reference:'ctlGateOutSnNoCombo',
								hidden: true, //ADP Mantis 0130372
								fieldLabel: ViewUtil.getLabel('snNo'),
								queryMode: 'local',
								bind: {
									store: '{gateOutSnNoCombo}',
									value: '{theSearch.sn}'	
								},
								displayField: 'shipgNoteNo',
								valueField: 'shipgNoteNo',
								value : '',
								emptyText:'Select',
								forceSelection:true,
								fieldStyle: 'text-transform:uppercase'
							},
							{
								xtype: 'combobox',
								labelWidth : 80,
								width: 250,
								reference:'ctlGateOutMasterBlNoCombo',
								fieldLabel: ViewUtil.getLabel('masterBlNo'),
								queryMode: 'local',
								bind: {
									store: '{masterBlCombo}',
									value: '{theSearch.mfDocId}'	
								},
								displayField: 'scdNm',
								valueField: 'mfDocId',
								value : '',
								emptyText:'Select',
								forceSelection:true,
								fieldStyle: 'text-transform:uppercase',
								listeners:{
									select: 'onSelectMasterBl'
								}
							},
							{
								xtype: 'combobox',
								labelWidth : 60,
								labelAlign: 'right',
								width: 250,
								reference:'ctlGateOutBlNoCombo',
								fieldLabel: ViewUtil.getLabel('blNo'),
								queryMode: 'local',
								   bind: {
									store: '{BLNoList}',
									value: '{theSearch.blNo}'	
								},
								displayField: 'blNo',
								valueField: 'blNo',
								value : '',
								emptyText:'Select',
								forceSelection:true,
								fieldStyle: 'text-transform:uppercase'	
							}
						]
					}					
				]
			   }],
		}]
		});
		me.callParent();
	}
});

