Ext.define('MOST.view.codes.DelayCode',{
	extend : 'Ext.form.Panel',
	alias : 'widget.app-delaycode',
	
	requires: [
		'MOST.view.codes.DelayCodeModel',
		'MOST.view.codes.DelayCodeController',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	detailViewAlias: 'app-delaycodedetail',
	controller: 'delaycode',
	
	viewModel: {
		type: 'delaycode'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refDelayCodeGrid',	// Main Grid Name 
	MAIN_STORE_NAME: 'delayCodeGridList',	// Main Store Name
	DELAYCATEGORY_COMBOBOX_STORE: 'delayCodeCategoryCodeCombo',
	ACCEPTYN_STORE: 'AcceptYnCombo',
	DELAYCODEBULKTYPE_COMBOBOX_STORE: 'delayCodeBulkTypeCombo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	layout : {type : 'vbox',align : 'stretch'},

	initComponent: function() {
		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId :'delayCodeEditor',
			listeners: {
				cancelEdit: 'onCancelEdit',				
				validateedit: 'onValidateEdit',				
				edit: 'onEdit'
			}
		});
		
		Ext.apply(me, {
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
					listeners : {
						celldblclick: 'onDblClick',
						pagingSearch:'onSearch'
					},
					columns: {
						defaults: {
		            		style : 'text-align:center',
		            		align: 'center'
		            	},
		            	items: GridUtil.getGridColumns('DelayCode')
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
							reference : 'refBtnRetrieve',
							text: ViewUtil.getLabel('search'),
							iconCls: 'x-fa fa-search', 
							cls: 'search-button', 
							listeners: {
								click: 'onSearch'
							}
						},{
							xtype: 'button',
							itemId: 'btnAdd',
							reference : 'refBtnCreate',
							text: ViewUtil.getLabel('add'),
							iconCls: 'x-fa fa-plus',
							listeners: {
								click: 'onAdd'
							}
						},{
							xtype: 'button',
							itemId: 'btnDelete',
							reference : 'refBtnDelete',
							text: ViewUtil.getLabel('remove'),
							ui: 'delete-button',
							iconCls: 'x-fa fa-minus',
							listeners: {
								click: 'onRemove'
							}
						},{
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
						},{
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
									xtype:'container',
									layout:{
										type:'hbox'
									},
									defaults:{
										labelAlign: 'right',
										labelWidth: 80,
										margin: '0 0 0 0'
									},
									items:[
										{
					       					xtype: 'combo',
					       					reference: 'ctlBlkType',
					       					labelWidth:80,
					       					width:240,
					       					fieldLabel: ViewUtil.getLabel('DCBulkType'),
					       					queryMode: 'local',
					       					bind: {
					        	    			store: '{' + me.DELAYCODEBULKTYPE_COMBOBOX_STORE + '}',
					        	    			value: '{theSearch.bulkTp}'
					        	    		},
					       					displayField: 'scdNm',
					       					valueField: 'scd',
					       					editable: false
					       				},{
					       					xtype: 'combo',
					       					reference: 'ctlAcceptable',
					       					labelWidth:80,
					       					width:200,
					       					fieldLabel: ViewUtil.getLabel('DCAccept'),
					       					queryMode: 'local',
					       					bind: {
					        	    			store: '{' + me.ACCEPTYN_STORE + '}',
					        	    			value: '{theSearch.chagYN}'
					        	    		},
					       					displayField: 'codeName',
					       					valueField: 'code',
					       					editable: false
					       				},{
					       					xtype: 'combo',
					       					reference: 'ctlCategoryCd',
					       					fieldLabel: ViewUtil.getLabel('DCCategoryCd'),
					       					labelWidth:100,
					       					width:240,
					       					queryMode: 'local',
					       					bind: {
					       						store: '{' + me.DELAYCATEGORY_COMBOBOX_STORE + '}',
					        	    			value: '{theSearch.dlyCatgCd}'
					        	    		},
					       					displayField: 'comName',
					       					valueField: 'comCode',
					       					editable: false
					    				},{
					    					xtype:'textfield',
					    					reference:'ctlCode',
					    					fieldLabel: ViewUtil.getLabel('DCCode'),
					       					labelWidth: 50,
					    					width: 200,
					    					maxLength: 4,
					    					emptyText: ViewUtil.getLabel('DCCode'),
					    					fieldStyle: 'text-transform:uppercase',
					    					listeners: {
					    						change : 'onChange'
					    					},
					    					bind: '{theSearch.dlyCd}'
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