Ext.define('MOST.view.operation.RehandlingOfGC', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-rehandle1',
	requires: [
		'MOST.view.operation.RehandlingOfGCModel',
		'MOST.view.operation.RehandlingOfGCController',
		'Ext.grid.plugin.CellEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	controller: 'rehandle1',
	
	viewModel: {
		type: 'rehandle1'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	 MAIN_GRID_REF_NAME: 'refRehandleGrid',
	 MAIN_STORE_NAME: 'rehandle',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;

		Ext.apply(me, {
			items: [
				{
				xtype:'container',
				layout:{
					type: 'hbox'
				},
				margin:'5 5 5 0',
				defaults:{
					labelAlign:'right'
				},
				items:[
					{
						xtype:'numberfield',
						reference:'ctlRhdlWgt',
						fieldLabel: 'RhdlWgt',
						bind: '{selectedItem.rhdlWgt}',
	   					labelWidth: 80,
						width: 180
					},{
						xtype:'numberfield',
						reference:'ctlRhdlM3',
						fieldLabel: 'RhdlM3',
						bind: '{selectedItem.rhdlMsrmt}',
	   					labelWidth: 80,
						width: 180
					},{
						xtype:'numberfield',
						reference:'ctlRhdlPkgQty',
						fieldLabel: 'RhdlPkgQty',
						bind: '{selectedItem.rhdlPkgQty}',
	   					labelWidth: 80,
						width: 180
					},
				]
			},{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				flex : 1,
				stateful : true,
				stateId : 'stateRehandleGrid',
				plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
	    		],
	    		margin:'5 5 5 0',
	    		bind: {
	    			store: '{' + me.MAIN_STORE_NAME + '}'
	    		},
	    		selModel: {
	    			type: 'checkboxmodel',  
		            checkOnly: false,
		            showHeaderCheckbox: true
				},
				listeners: {
					celldblclick: 'onDblClick',
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
		    }],
		    
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
    						cls: 'search-button', 
        					listeners: {
        						click: 'onSearch'
        					}
        				},{
        					xtype: 'button',
        					reference:'ctlRehandleModeButton',
        					text: ViewUtil.getLabel('rehandleButton'),
        					iconCls: 'fa fa-balance-scale',
        					listeners: {
        						click: 'onRehandle'
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
							layout:{
							   type:'vbox',
							   align:'stretch'
						   	},
						   	defaults:{
							margin: '0 0 5 0'
						},
						flex: 1,
						items:[{
							xtype: 'container',
							layout:{
								type:'hbox'
							},
							defaults:{
								labelAlign:'right',
								labelWidth: 80
							},
							margin: '5 0 0 0',
							items:[
								{
									xtype: 'datefield',
									reference: 'ctlEstArrFromDt',
									labelWidth: 100,
									width:240,
									fieldLabel: ViewUtil.getLabel('rehandleEstArrivalDate'),
									format: MOST.config.Locale.getShortDate(),
									listeners: {
										change: 'onDateChange'
									}
								},{
									xtype: 'datefield',
									reference: 'ctlEstArrToDt',
									margin: '0 0 0 5',
									width:120,
									format: MOST.config.Locale.getShortDate(),
									listeners: {
										change: 'onDateChange'
									}
								},
								{
									// xtype: 'button',
									// text: ViewUtil.getLabel('find'),
									// margin: '0 0 0 5',
									// iconCls: 'x-fa fa-search',
									// listeners: {
									// 	click: 'onSnFind'
									// }
								},
								{
									reference: 'ctlRehandleCategory',
									xtype: 'combo',
									width:270,
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
									reference: 'ctlRehandleRehandleModeSearch',
									xtype: 'combo',
									labelWidth: 110,
									width:300,
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
							items:[
								{
									xtype:'vesselcalllistfield',
									width:290,
									fieldLabel: ViewUtil.getLabel('vessel'),
									reference:'ctlRehandleJpvc',
									bind:{
										value: '{theSearch.vslCallId}'
									}
								},{
									reference: 'ctlRehandleSn',
									xtype: 'combo',
									labelWidth: 155,
									width:345,
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
									reference: 'ctlRehandleBl',
									xtype: 'combo',
									labelWidth: 110,
									width:300,
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
								},				
						]},{
							xtype: 'container',
							layout:{
								type:'hbox'
							},
							defaults:{
								labelAlign:'right',
								labelWidth: 100
							},			
							margin: '5 0 0 0',
							items:[
								{
									xtype:'vesselcalllistfield',
									width:290,
									fieldLabel: ViewUtil.getLabel('rehandleNextVessel'),
									reference:'ctlRehandleNextJpvc',
									bind: {
										value: '{theSearch.nxVslCallId}'
									}
								},{
									reference: 'ctlRehandleNextSn',
									xtype: 'combo',
									labelWidth: 155,
									width:345,
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
								}					
							]}
						]
					}],
				}
		    ]			
		});
		
		me.callParent();
	}
});

