Ext.define('MOST.view.planning.StaffAndDeployment', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-staffanddeployment',

    requires: [
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
    ],

	detailViewAlias: 'app-staffanddeploymentdetail',
    
	controller: 'staffanddeployment',
	
	viewModel: {
		type: 'staffanddeployment'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	 MAIN_GRID_REF_NAME: 'refVOperationDeployGrid',
	 MAIN_STORE_NAME: 'vOperationDeployList',
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
			items: [
			{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				flex : 1,
				stateful : true,
				multiColumnSort: true,	
				stateId : 'stateStaffandequipmentdeployment',
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
					cellDblClick: 'onDblClick',
					pagingSearch: 'onSearch'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items:GridUtil.getGridColumns('StaffDeployment')
				}
		    }],
            dockedItems:[
            	{
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
						itemId: 'inquiryItemId',
						reference: 'refBtnRetrieve',
						text: ViewUtil.getLabel('search'),
						iconCls: 'x-fa fa-search',
						cls: 'search-button',
						listeners: {
							click: 'onSearch'
						}
					},{
						xtype: 'button',
						itemId: 'createItemId',
						reference: 'refBtnCreate',
						text: ViewUtil.getLabel('add'),
						ui: 'create-button',
						iconCls: 'x-fa fa-plus',
						listeners: {
							click: 'onAddStaffAndEquip'
						}
					},
					{
						xtype: 'button',
						itemId: 'deleteItemId',
						reference:'refBtnDelete',
						text: ViewUtil.getLabel('remove'),
						ui: 'delete-button',
						iconCls: 'x-fa fa-minus'
					},
					{
						xtype: 'button',
						itemId:'previewItemId',
						reference: 'refBtnPreview',
						text: ViewUtil.getLabel('preview'),
						cls: 'preview-button',
						iconCls: 'x-fa fa-file-pdf-o',
						name: 'detailPreview',
						listeners: {
							click: 'onStaffPreviewPDF'
						}
					},
					{
						xtype: 'button',
						itemId: 'downloadItemId',
						reference: 'refBtnDownload',
						iconCls: 'x-fa fa-file-pdf-o',
						text: ViewUtil.getLabel('download'),
						cls: 'download-button',
						name: 'detailDownload',
						listeners: {
							click: 'onExport'
						}
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
							type:'hbox',
							align:'stretch'
						},
						defaults:{
							labelAlign: 'right',
							labelWidth: 50,
							margin:'5 0 0 5',
					},
					flex: 1,
					items:[
					{
						xtype: 'vesselcalllistfield',
						width: 230,
						reference:'ctlJpvc',
						fieldLabel: ViewUtil.getLabel('vessel'),
						emptyText: ViewUtil.getLabel('vessel'),
						bind: {
							value: '{theSearch.vslCallId}'
						}
					},
					{
						xtype: 'datefield',
						reference: 'dtETAFrom',
						fieldLabel: ViewUtil.getLabel('date'),
						format: MOST.config.Locale.getShortDate(),
						editable: false,
						width:180,
						listeners: {
							change: 'onDateChange'
						}
					},
					{
						xtype: 'datefield',
						reference: 'dtETATo',
						format: MOST.config.Locale.getShortDate(),
						width:130,
						editable: false,
						listeners: {
							change: 'onDateChange'
						}
					},
					{
						xtype: 'combobox',
						reference: 'cboPurpose',
						fieldLabel: ViewUtil.getLabel('purpose'),
						bind: {
							store: '{purposeCombo}',
							value: '{theSearch.purpTpCd}'
						},
						displayField: 'scdNm',
						valueField: 'scd',
						matchFieldWidth: true,
						width:220,
						queryMode: 'local',
						editable: false,
						margin:'5 0 0 20'
					},
					{
						xtype: 'combobox',
						reference: 'cboShift',
						fieldLabel: ViewUtil.getLabel('shift'),
						bind: {
							store: '{shiftCombo}',
							value: '{theSearch.shftId}'
						},
						displayField: 'shftNm',
						valueField: 'shftId',
						matchFieldWidth: true,
						width:220,
						queryMode: 'local',
						editable: false
					},
					{
						xtype :'container',
						layout:{
							type : 'hbox',
							pack : 'end'
						},
						flex : 1,
						margin : '5 0 0 0',
						items:[
						{
							xtype : 'button',
							useTooltipAsTextInOverflowMenu: true,
							tooltip : 'Clear Sorters',
							iconCls: 'x-fa fa-sort-alpha-asc',
							handler: 'onClearSorters'
						}
						]
					}]
					}],
				}
			]
		});
		
		me.callParent();
	}
});