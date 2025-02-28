Ext.define('MOST.view.administrator.UserRegister', {
	extend: 'Ext.panel.Panel',
	
	alias: 'widget.app-userregister',
	
	reference: 'userRegisterRef',
	
	requires: [],
    
    layout : {
    	type  : 'hbox',
    	align : 'stretch'
	},
 
    controller: 'userregister',
    
    viewModel: {
    	type: 'userregister'
    },
    
    listeners:{
    	afterrender:'onLoad'
    },
    
    detailViewAlias: 'app-userregisterdetail',
    
	layout : {type  : 'vbox', align : 'stretch'},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'userRegsiterGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'userRegister',            // Main Store Name
	USER_TYPE_STORE: 'userTypeCombo',
	PARTNER_SELECTION_STORE: 'partnerSelection',
	CONFIRM_COMBO_STORE: 'confirmCombo',
	REGISTRY_STATUS_STORE: 'registryStatusCombo',
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
						rowdblclick: 'onDblClick',
						pagingSearch:'onSearch'
					},
					columns: {
						defaults: {
		            		style : 'text-align:center',
		            		align: 'center'
		            	},
		            	items: GridUtil.getGridColumns('UserRegister')
					},
					viewConfig: {
						enableTextSelection: true,
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
		 					itemId:'createItemId',
		 					reference:'refBtnCreate',
							text:  ViewUtil.getLabel('add'),
							ui: 'create-button',
							iconCls: 'x-fa fa-plus',
							listeners: {
								click: 'onGridAdd'
							}
						},{
							xtype: 'button',
							itemId:'deleteItemId',
							reference:'refBtnDelete',
							text: ViewUtil.getLabel('remove'),
							ui: 'delete-button',
							iconCls: 'x-fa fa-minus',
							listeners: {
								click: 'onGridRemove'
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
    									labelWidth: 120,
    									margin : '2 0 0 0'
    								},
    								items:[
    									{
    										xtype: 'textfield',
    										reference: 'cmbUserId',
    										fieldLabel: ViewUtil.getLabel('userRegId'),
    										listeners:{
    					                		change: function(){
    					                			var me = this;
    					                			me.setValue(this.getValue().toUpperCase());
    					                		},
    					                	},
    					                	bind: '{theSearch.regUserId}'
    									},{
    										xtype: 'textfield',
    										reference: 'refTxtUserName',
    										fieldLabel: ViewUtil.getLabel('userName'),
    					                	bind: '{theSearch.regUserNm}'
    									},{
    										xtype:'combo',
    										reference:'refCboUserType',
    										fieldLabel:ViewUtil.getLabel('userType'),
    										bind:{
    											store:'{' + me.USER_TYPE_STORE + '}',
    											value: '{theSearch.regUserType}'
    										},
    										emptyText:'Select',
    										displayField:'scdNm',
    										valueField:'scd',
    										queryMode:'local'
    									}
    								]
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
    							        	xtype: 'combo',
    							        	reference: 'cmbPartnerType',
    										fieldLabel: ViewUtil.getLabel('partnerType'),
    										emptyText:'Select',
    										editable: false,
    										displayField: 'scdNm',
    										valueField: 'scd',
    										queryMode:'local',
    										bind: {
    											store: '{' + me.PARTNER_SELECTION_STORE + '}',
    											value: '{theSearch.ptnrType}'
    										}
    									},{
    										xtype: 'textfield',
    										reference: 'txtPartnerCode',
    										fieldLabel: ViewUtil.getLabel('partnerCode'),
											triggers: {
							                    someField: {
							                        cls: 'fa-search',
							                        scope: 'controller',
							                        handler: 'openPartnerCdTypePopup'
							                    }
							                },
							                listeners:{
						                		change: function(){
						                			var me = this;
						                			me.setValue(this.getValue().toUpperCase());
						                		},
						                	},
    					                	bind: {
    											value: '{theSearch.ptnrCd}'
    										}
    									},{
    										xtype: 'combo',
    										reference: 'cboConfirmYn',
    										fieldLabel: ViewUtil.getLabel('userRegConfirm'),
    										editable: false,
    										displayField: 'scdNm',
    										valueField: 'scd',
    										emptyText:'Select',
    										queryMode:'local',
    										bind: {
    											store: '{' + me.CONFIRM_COMBO_STORE + '}',
    											value: '{theSearch.useYn}'
    										}
    									}
    								]
    							},{
    								xtype:'container',
    								layout:{
    									type:'hbox'
    								},
    								defaults:{
    									labelAlign: 'right',
    									labelWidth: 120,
    									margin : '2 0 0 7'
    								},
    								items:[
    									{
    							        	xtype: 'combo',
    							        	reference: 'refCboStatus',
    										fieldLabel: ViewUtil.getLabel('status'),
    										emptyText:'Select',
    										editable: false,
    										displayField: 'scdNm',
    										valueField: 'scd',
    										queryMode:'local',
    										labelWidth:113,
    										bind: {
    											store: '{' + me.REGISTRY_STATUS_STORE + '}',
    											value: '{theSearch.status}'
    										}
    									},{
    					                    xtype: 'datefield',
    					                    reference: 'refDtFrom',
    					                    margin: '2 0 0 40',
    					                    fieldLabel: ViewUtil.getLabel('activeTime'),
    					                    format: MOST.config.Locale.getShortDate(),
    					                    labelWidth: 80,
    					                    width:255,
    					                    hidden: true
    					                },{
    					                    xtype: 'datefield',
    					                    reference: 'refDtTo',
    					                    margin: '2 0 0 5',
    					                    format: MOST.config.Locale.getShortDate(),
    					                    width:175,
    					                    hidden: true
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