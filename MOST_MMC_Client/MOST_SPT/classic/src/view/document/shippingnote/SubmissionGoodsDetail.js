Ext.define('MOST.view.document.shippingnote.submissionshippingnote.SubmissionGoodsDetail', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-submissiongoodsdetail',
	
	requires: [
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	layout : {type  : 'vbox', align : 'stretch'},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	 GOODSDETAIL_GRID_REF_NAME: 'refSNGoodsGrid',  // Main Grid Name  
	 GOODSDETAIL_STORE_NAME: 'goodsListGrid',      // Main Store Name
	 /**
	  * CONSTANT END
	  * =========================================================================================================================
	  */
	
	initComponent: function() {
		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId :'goodsListGridEditor',
			listeners: {
				cancelEdit: 'onCancelEdit',				
				edit: 'onEdit',
				validateedit: 'onValidateGoodsDetailEdit',
			}
		});
			
		Ext.apply(me, {
			xtype: 'container',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			flex: 1,
			items: [{
				xtype: 'tsb-datagrid',
				reference: me.GOODSDETAIL_GRID_REF_NAME,
				flex: 1,
				usePagingToolbar : false,
				plugins: [
					rowEditing,
					'gridexporter',
					'gridfilters',
					'clipboard'
				],
				bind: {
					store: '{' + me.GOODSDETAIL_STORE_NAME + '}'
				},
				selModel: {
					type : 'spreadsheet',
					cellSelect : false
				},
				listeners : {
					celldblclick: 'onDetailDblClick',
				},
				columns: {
					defaults: {
	            		style : 'text-align:center',
	            		align: 'center'
	            	},
	            	items: GridUtil.getGridColumns('SubmissionSNGoods')
				}
			},
			{
                xtype: 'textfield',
                fieldLabel:ViewUtil.getLabel('SNRemark'),
                reference: 'ctlRemark',
                labelAlign: 'right',
                labelWidth: 80,
                margin : '5 5 5 5',
                bind: '{theShippingNote.rmk}',
                maxLength: 100,
				maskRe: /[0-9A-Za-z ]/,
            }],
            
            dockedItems: [{
	            xtype: 'toolbar',
	            defaults: {
	                margin: '0 5 0 0',
	            },
	            dock :'top',
	            layout: {
	                type: 'hbox',
	                align: 'stretch'
	            },
	            items: ['->',{
					xtype: 'container',
					style: { "background-color":"white" },
					layout: {
						align:'left'
					},
					defaults: {
						margin: '1 1 1 1'
					},
					items: [
						{
							xtype: 'button',
							ui: 'create-button',
							reference:'refBtnCreate',
							text: ViewUtil.getLabel('add'),
							iconCls: 'x-fa fa-plus',
							listeners: {
								click: 'onAdd'
							}
						},
						{
							xtype: 'button',
							itemId:'deleteItemId',
							reference:'refBtnDelete',
							text: ViewUtil.getLabel('remove'),
							ui: 'delete-button',
							iconCls: 'x-fa fa-minus',
							listeners: {
								click: 'onRemove'
							}
						}
					]}
	            ]
	        }]
		});
		
		me.callParent();
	}
});