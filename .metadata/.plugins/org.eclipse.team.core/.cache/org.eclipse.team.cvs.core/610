Ext.define('MOST.view.administrator.AuthorityGroup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-authoritygroup',
	
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	detailViewAlias: 'authoritygroupdetail',
	
	controller: 'authoritygroup',

	viewModel: {
		type: 'authoritygroup'
	},

	listeners: {
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refAuthorityGroupGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'authGrpList',            // Main Store Name
	USER_GRID_REF_NAME: 'refUserListGrid',  // UserList Grid Name 
	USER_STORE_NAME: 'userList',            // UserList Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout : {
		type  : 'vbox', 
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
					listeners : {
						cellclick:'onCellClick',
						celldblclick: 'onDblClick',
						pagingSearch:'onSearch'
					},
					columns: {
						defaults: {
		            		style : 'text-align:center',
		            		align: 'center'
		            	},
		            	items: GridUtil.getGridColumns('AuthorityGroup')
					}
				},{
					xtype: 'tsb-datagrid',
					reference: me.USER_GRID_REF_NAME,
					flex: 1,
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
					],
					bind: {
						store: '{' + me.USER_STORE_NAME + '}'
					},
					selModel: {
						type: 'spreadsheet',
						cellSelect: false
					},
					listeners : {
						pagingSearch:'searchUserList'
					},
					columns: {
						defaults: {
		            		style : 'text-align:center',
		            		align: 'center'
		            	},
		            	items: GridUtil.getGridColumns('AuthorityGroupUserList')
					}
				}
			],
			
			dockedItems:[
				{
					xtype : 'container',
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
		 					reference:'refBtnCreate',
		 					itemId:'createItemId',
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
    				items:[
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
							items:[
								{
									xtype:'container',
									layout:{
										type:'hbox'
									},
									defaults:{
										labelAlign: 'right',
										labelWidth: 120
									},
									items:[
										{
											xtype: 'textfield',
											reference: 'refTxtGroupCd',
											fieldLabel: ViewUtil.getLabel('grpCd'),
											labelWidth: 130,
											width: 300,
											maskRe: /[^$]/,
											listeners:{
												change: function(){
													this.setValue(this.getValue().toUpperCase());
												}
											},
											bind: '{theSearch.authGrp}'
										},{
											reference: 'refTxtGroupNm',
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('grpNm'),
											labelWidth: 130,
											width: 300,
											maskRe: /[^$]/,
							                bind: '{theSearch.authGrpNm}'
										},{
		   	 								xtype: 'button',
		   	 								iconCls: 'x-fa fa-search',
		   	 								reference:'btnGroupName',
		   	 								margin: '0 0 0 5',
		   	 								listeners: {
		   	 									click: 'openGroupNamePopup'
		   	 								}
	   	 								
										},{
											xtype:'container',
											layout:{
												type:'hbox'
											},
											defaults:{
												labelAlign: 'right',
												labelWidth: 120,
												margin : '2 0 0 0'
											},
											items:[
												{
								   					reference: 'reflblGrant',
													xtype: 'label',
													text: ViewUtil.getLabel('grant'),
													margin : '5 0 0 100',
													width: 30
								   				},{
													xtype: 'radiogroup',
								                	reference: 'ctlRadioJpvc',
								                	layout: {
										                type: 'hbox',
										            },
								                	items: [
								                		{
								            				xtype: 'radiofield',
								            				margin: '0 0 5 5',
								                			reference: 'rdJPVC',
								                			boxLabel: ViewUtil.getLabel('yes'),
								    	   					width:  70,
								                			name: 'radio',
								                			inputValue : 'Y',
								                			checked: true,
								        				},{
								                			xtype: 'radiofield',
								                			margin: '0 0 5 -15',
								                			reference: 'rdNonJPVC',
								                			boxLabel:  ViewUtil.getLabel('no'),
								                			labelWidth:50,
								    	   					width:70,
								                			name: 'radio',
								                			inputValue : 'N'
								                		}
								                	]
												}
											]
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