Ext.define("MOST.view.codes.UNLocationCode",{
	extend: "Ext.panel.Panel",
    alias: 'widget.app-unlocatioindscode',
    requires: [
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
	],
	
	detailViewAlias: 'app-unlocatioindscodedetail',
	controller: 'unlocatioindscode',
	
	viewModel: {
		type: 'unlocatioindscode'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	COUNTRY_COMBO_STORE_NAME: 'countryCombo',
	MAIN_STORE_NAME: 'unLocationCode',
	MAIN_GRID_REF_NAME: 'refUNLocationCodeGrid',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	layout : {
		type : 'hbox',
		align : 'stretch'
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
		    		listeners: {
		    			celldblclick: 'onDblClick',
		    			pagingSearch: 'onSearch'
		    		},
	   				columns: {
	   					defaults: {
		            		style : 'text-align:center',
		            		align: 'center'
		            	},
		            	items: GridUtil.getGridColumns('UNLocationCode')
		            	
	   				}	
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
						},{
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
							itemId:'createItemId',
							reference:'refBtnCreate',
							text: ViewUtil.getLabel('add'),
							ui: 'create-button',
							iconCls: 'x-fa fa-plus',
							listeners: {
								click: 'onAdd'
							}
						},{
							xtype: 'button',
							itemId: 'deleteItemId',
							reference:'refBtnDelete',
							text: ViewUtil.getLabel('remove'),
							ui: 'delete-button',
							iconCls: 'x-fa fa-minus',
							listeners: {
								click: 'onRemove'
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
							items: [
								{
			                		xtype: 'container',
			   	       				layout:{
			   	       					type:'hbox'
			   	       				},
			   	       				defaults:{
			   	       					labelAlign: 'right',
			   	       					labelWidth:80,
			   	       					margin:'5 5 5 0'
			   	       				},
				   	       			items:[
				   	       				{
					       					reference: 'txtPortCode',
					       					xtype: 'textfield',
					       					inputType: "search",
					       					selectOnFocus: true,
					       					fieldLabel: ViewUtil.getLabel('portCode'),
					       					enableKeyEvents :true,
					       					labelWidth: 100,
					       					bind:{
					       						value: '{theSearch.portCd}'
					       					},
					    					listeners:{
					    						change: function(){
					    							this.setValue(this.getValue().toUpperCase());
					    						}
					    					},
					       		            enforceMaxLength: true,
					       		            maxLength: 5
					       				},{
					       					reference: 'txtPortName',
					       					xtype: 'textfield',
					       					selectOnFocus: true,
					       					fieldLabel: ViewUtil.getLabel('portName'),
					       					labelWidth:100,
					       					maskRe: /[a-zA-Z0-9_&-\\ ]/ ,
					       					maxLength: 100,
					       		            enforceMaxLength: true,
					       					bind:{
					       						value: '{theSearch.portNm}'
					       					},
					       				},{
					       					reference: 'cmbCountry',
					       					xtype: 'combo',
					       					fieldLabel: ViewUtil.getLabel('countryName'),
					       					emptyText: 'Select',
					       					editable: false,
					       					labelWidth:100,
					       					bind:{
					       						store:'{' + me.COUNTRY_COMBO_STORE_NAME + '}',
					       						value: '{theSearch.cntryCd}'
					       					},
					       					queryMode: 'local',
									        displayField: 'scdNm',
									        valueField: 'scd',
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
