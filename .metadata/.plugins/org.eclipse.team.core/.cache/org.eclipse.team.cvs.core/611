Ext.define('MOST.view.administrator.CompanyRegister', {
	extend: 'Ext.panel.Panel',
	
	alias: 'widget.app-companyregister',
	
	requires: [],
    
    layout : {
    	type  : 'vbox',
    	align : 'stretch'
	},
	
	listeners: {
    	afterrender: 'onLoad'
	},
    
    controller: 'companyregister',
    
    viewModel: {
    	type: 'companyregister'
    },
    
    detailViewAlias: 'companyregisterdetail',
    
    /**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'companyRegsiterGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'companyRegister',            // Main Store Name
	PARTNER_TYPE_STORE: 'ptnrTypeList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
    
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
					rowdblclick: 'onDblClick',
					pagingSearch:'onSearch'
				},
				columns: {
					defaults: {
	            		style : 'text-align:center',
	            		align: 'center'
	            	},
	            	items: GridUtil.getGridColumns('CompanyRegister')
				}
			}],
			
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
							defaults:{
								margin: '0 0 5 0'
							},
							items:[
								{
									xtype:'container',
									layout:{
										type:'hbox'
									},
									defaults:{
										labelAlign: 'right',
										labelWidth: 100,
										margin : '2 0 0 5'
									},
									items:[
										{	
										    xtype: 'radiogroup',
											reference: 'radChk',
											layout: {
												type: 'hbox',
											},
											margin : '2 0 0 31',
											items:[
												{	
												    xtype: 'radiofield',
													boxLabel: ViewUtil.getLabel('newMem'),
													margin : '0 10 0 0',
													name: 'member',
													inputValue: 'N'
												},{
													xtype: 'radiofield',
													boxLabel: ViewUtil.getLabel('regMem'),
													checked : true,
													name: 'member',
													inputValue: 'Y'
												}
									        ]
										},{	
										    xtype: 'textfield',
											reference: 'txtAccNo',
											margin: '0 0 0 40',
											bind: '{theSearch.accNo}',
		    			   					fieldLabel: ViewUtil.getLabel('accountno'),
		    			   					hidden: true
										},{	
										    xtype: 'textfield',
											reference: 'txtBalStart',
											maskRe: /[0-9]/,
											bind: '{theSearch.balRangeTo}',
											fieldLabel: ViewUtil.getLabel('balanceRange'),
											hidden: true
										},{	
										    xtype: 'textfield',
											reference: 'txtBalEnd',
											bind: '{theSearch.contractor}',
											maskRe: /[0-9]/,
											hidden: true
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
										margin : '2 0 0 0'
									},
									items:[
										{
										    xtype: 'combo',
											reference: 'cmbPtnrType',
											fieldLabel: ViewUtil.getLabel('partnerType'),
											editable: false,
											margin: '0 -3 0 0',
											displayField: 'scdNm',
											valueField: 'scd',
											emptyText: 'Partner Type',
											bind: {
												store: '{' + me.PARTNER_TYPE_STORE + '}',
												value: '{theSearch.ptnrType}'
											}
										},{
										    xtype: 'textfield',
											reference: 'txtPtnrCode',
											fieldLabel: ViewUtil.getLabel('partnerCode'),
											margin: '0 0 0 30',
											bind: '{theSearch.companyCode}',
											listeners:{
												change: function(){
													this.setValue(this.getValue().toUpperCase());
												}
											}
										},{
											xtype: 'textfield',
											reference: 'txtPtnrNm',
											margin: '0 0 0 5',
											bind: '{theSearch.engSnm}',
											fieldLabel: ViewUtil.getLabel('partnerName'),
										}, {
											xtype: 'datefield',
											fieldLabel: ViewUtil.getLabel('regDate'),
											reference: 'txtDateFrom',
											editable: true,
											format: MOST.config.Locale.getShortDate(),
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