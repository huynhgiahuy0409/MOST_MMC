Ext.define('MOST.view.operation.VSRCheckList',{
	extend : 'Ext.panel.Panel',
	alias : 'widget.app-vsrchecklist',
	
	requires : ['MOST.view.operation.VSRCheckListController',
		'MOST.view.operation.VSRCheckListModel',
		'Ext.grid.plugin.RowEditing', 
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard', 
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'],

	detailViewAlias : 'app-vsrchecklistdetail',

	controller : 'vsrchecklist',

	viewModel : {
		type : 'vsrchecklist'
	},

	listeners : {
		afterrender : 'onLoad'
	},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME : 'refVSRCheckListGrid',
	MAIN_STORE_NAME : 'vsrCheckList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	layout : {
		type : 'vbox',
		align : 'stretch'
	},

	initComponent : function(){
		var me = this;

		Ext.apply(me,{
			items : [{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				flex: 1,
				stateful : true,
				stateId : 'stateVSRCheckListGrid',
				plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
				],
				bind: {
					store: '{' + me.MAIN_STORE_NAME + '}'
				},
				viewConfig : {
					stripeRows : true,
					enableTextSelection : true,
				},
				selModel: {
					type: 'spreadsheet',
					cellSelect: false
				},
				listeners : {
					rowdblclick: 'onDblClick',
					pagingSearch:'onSearch'
				},
				
				columns: {
					defaults: {
						style : 'text-align:center',
						align: 'center'
					},
					items: GridUtil.getGridColumns('VSRCheckList')
				}
			}],

			dockedItems : [{//Docked Button
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
					xtype : 'button',
					reference:'refBtnRetrieve',
					text : ViewUtil.getLabel('search'),
					itemId : 'inquiryItemId',
					iconCls : 'x-fa fa-search',
					cls : 'search-button',
					listeners : {
						click : 'onSearch'
					}
				},{
					xtype : 'button',
					itemId : 'createItemId',
					reference : 'refBtnCreate',
					text : ViewUtil.getLabel('add'),
					ui : 'create-button',
					iconCls : 'x-fa fa-plus',
					listeners : {
						click : 'onCreate'
					}
				},{
					xtype : 'button',
					itemId : 'exportToPdfButton',
					text : ViewUtil.getLabel('exportToPdf'),
					iconCls : 'x-fa fa-file-pdf-o',
					cls : 'excel-button',
					listeners : {
						click : 'onPreviewPDF'
					},
				}]
			},
			{
				// Search Condition:
				xtype: 'toolbar',
				enableOverflow: true,
				padding : '0 0 0 0',
				defaults: {
					labelAlign: 'right',
				},
				items:[{
					xtype: 'searchfieldset',
					title: ViewUtil.getLabel('search'),
					autoScroll: true,
					collapsible:true,
					flex:1,
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults: {
						margin: '0 0 5 0'
					},
					items:[{
						xtype: 'container',
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						defaults: {
							labelAlign: 'right',
							labelWidth:80,
							margin: '0 5 0 0'
						},
						items:[{
							xtype : 'vesselcalllistfield',
							reference : 'ctlVslCallId',
							fieldLabel : ViewUtil.getLabel('vslCallId'),
							allowBlank : false,
							width : 245,
							emptyText : ViewUtil.getLabel('vslCallId'),
							bind : {
								value: '{theSearch.vslCallID}'
							}
						},{
							reference : 'ctlFromDt',
							xtype : 'datefield',
							width : 210,
							fieldLabel : ViewUtil.getLabel('vsrDate'),
							format : MOST.config.Locale.getShortDate(),
							listeners : {
								change : 'onDateChange'
							}
						},{
							reference : 'ctlToDt',
							width : 130,
							xtype : 'datefield',
							anchor : '100%',
							format : MOST.config.Locale.getShortDate(),
							listeners : {
								change : 'onDateChange'
							}
						},{
							xtype : 'combo',
							reference : 'ctlShift',
							fieldLabel : ViewUtil.getLabel('shftNm'),
							width : 170,
							align : 'left',
							bind : {
								store : '{shiftCombo}',
								value: '{theSearch.shftId}'
							},
							displayField : 'shftNm',
							valueField : 'shftId',
							queryMode : 'local',
							value : ''
						},{
							xtype : 'container',
							layout : {
								type : 'hbox',
								pack : 'end'
							},
							flex : 1,
							margin : '0 0 0 50',
							items : [{
								xtype : 'button',
								useTooltipAsTextInOverflowMenu : true,
								tooltip : 'Clear Sorters',
								iconCls : 'x-fa fa-sort-alpha-asc',
								handler : 'onClearSorters'
							}]
						}]
					}]
				}]
			}]
		});
		me.callParent();
	}
});
