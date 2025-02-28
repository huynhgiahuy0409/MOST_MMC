Ext.define('MOST.view.administrator.authoritygroupdetail', {
	extend: 'Ext.form.Panel',
	alias: 'widget.authoritygroupdetail',

	requires: [
	],
	
	listeners: {
		afterrender: 'onDetailLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	AUTH_ACCESS_GRID_REF_NAME: 'refAuthorityGrid',
	
	AUTH_ACCESS_CODE_STORE_NAME: 'accessAuthCodeList',
	AUTH_ACCESS_CONF_STORE_NAME: 'accessAuthConfList',
	AUTH_ACCESS_ADMIN_STORE_NAME: 'accessAuthAdminList',
	AUTH_ACCESS_DOC_STORE_NAME: 'accessAuthDocList',
	AUTH_ACCESS_PLAN_STORE_NAME: 'accessAuthPlanList',
	AUTH_ACCESS_OPE_STORE_NAME: 'accessAuthOpeList',
	AUTH_ACCESS_MONITOR_STORE_NAME: 'accessAuthMonitorList',
	AUTH_ACCESS_BILLING_STORE_NAME: 'accessAuthBillingList',
	AUTH_ACCESS_TABLET_STORE_NAME: 'accessAuthTabletList',
	
	YES_NO_VALUE_STORE: 'yesNoCombo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			xtype:'container',
			layout:{
				type:'vbox'
			},
			defaults:{
				labelAlign: 'right',
				labelWidth: 120,
				width:1325
			},
			items:[
				{
					xtype: 'fieldset',
					title: 'Group Information',
					layout: 'hbox',
					margin: '0 5 5 5',
					defaults:{
						flex:1,
						labelAlign: 'right',
						labelWidth: 80,
						width: 245
					},
					items:[
						{
							xtype: 'textfield',
							reference: 'refTxtGroupCd',
							fieldLabel: ViewUtil.getLabel('grpCd'),
							editable: false,
							bind: '{theDetail.authGrp}',
							listeners:{
								change: function(){
									this.setValue(this.getValue().toUpperCase());
								}
							}
						},{
							xtype: 'textfield',
							reference: 'refTxtGroupNm',
							fieldLabel: ViewUtil.getLabel('grpNm'),
							maskRe: /[^$]/,
			                bind: '{theDetail.authGrpNm}',
			                allowBlank:false,
						},{
							xtype:'combo',
							fieldLabel: ViewUtil.getLabel('usage'),
							displayField: 'codeName',
						    valueField: 'code',
						    queryMode:'local',
							bind: {
								store: '{' + me.YES_NO_VALUE_STORE + '}',
								value: '{theDetail.usage}'
							}
						},{
							xtype:'combo',
							fieldLabel: ViewUtil.getLabel('grant'),
							displayField: 'codeName',
						    valueField: 'code',
						    queryMode:'local',
						    allowBlank:false,
							bind: {
								store: '{' + me.YES_NO_VALUE_STORE + '}',
								value: '{theDetail.grantYn}',
							},
						}
					]
				},{
		            xtype: 'tabpanel',
		            deferredRender:false,
		            margin: '0 5 5 5',
		            activeTab: 0,
		            height: 500,
		            flex: 1,
		            items: [
		            	{
							xtype: 'tsb-datagrid',
							title:  'Codes',
				    		reference: me.AUTH_ACCESS_GRID_REF_NAME,
				    		usePagingToolbar : true,
				    		flex: 1,
				    		plugins: [
								'gridexporter',
								'gridfilters',
								'clipboard'
							],
				    		bind: {
				    			store: '{' + me.AUTH_ACCESS_CODE_STORE_NAME + '}'
				    		},
				    		selModel: {
								type: 'spreadsheet',
			                    cellSelect:false,
							},
				    		listeners: {
				    			pagingSearch: 'searchAuthorityCodeList'
				    		},
				    		columns:{
				    			defaults: {
				            		style : 'text-align:center',
				            		align: 'center'
				            	},
				            	items: GridUtil.getGridColumns('AccessAuthorityAuth')
				    		}
						},
						{
							xtype: 'tsb-datagrid',
							title: 'Configuration',
				    		reference: me.AUTH_ACCESS_GRID_REF_NAME,
				    		usePagingToolbar : true,
				    		flex: 1,
				    		plugins: [
								'gridexporter',
								'gridfilters',
								'clipboard'
							],
				    		bind: {
				    			store: '{' + me.AUTH_ACCESS_CONF_STORE_NAME + '}'
				    		},
				    		selModel: {
								type: 'spreadsheet',
			                    cellSelect:false,
							},
				    		listeners: {
				    			pagingSearch: 'searchAuthorityConfList'
				    		},
				    		columns:{
				    			defaults: {
				            		style : 'text-align:center',
				            		align: 'center'
				            	},
				            	items: GridUtil.getGridColumns('AccessAuthorityAuth')
				    		}
						},
						{
							xtype: 'tsb-datagrid',
							title: 'Authority',
				    		reference: me.AUTH_ACCESS_GRID_REF_NAME,
				    		usePagingToolbar : true,
				    		flex: 1,
				    		plugins: [
								'gridexporter',
								'gridfilters',
								'clipboard'
							],
				    		bind: {
				    			store: '{' + me.AUTH_ACCESS_ADMIN_STORE_NAME + '}'
				    		},
				    		selModel: {
								type: 'spreadsheet',
			                    cellSelect:false,
							},
				    		listeners: {
				    			pagingSearch: 'searchAuthorityAdminList'
				    		},
				    		columns:{
				    			defaults: {
				            		style : 'text-align:center',
				            		align: 'center'
				            	},
				            	items: GridUtil.getGridColumns('AccessAuthorityAuth')
				    		}
						},
						{
							xtype: 'tsb-datagrid',
							title: 'Document',
				    		reference: me.AUTH_ACCESS_GRID_REF_NAME,
				    		usePagingToolbar : true,
				    		flex: 1,
				    		plugins: [
								'gridexporter',
								'gridfilters',
								'clipboard'
							],
				    		bind: {
				    			store: '{' + me.AUTH_ACCESS_DOC_STORE_NAME + '}'
				    		},
				    		selModel: {
								type: 'spreadsheet',
			                    cellSelect:false,
							},
				    		listeners: {
				    			pagingSearch: 'searchAuthorityDocList'
				    		},
				    		columns:{
				    			defaults: {
				            		style : 'text-align:center',
				            		align: 'center'
				            	},
				            	items: GridUtil.getGridColumns('AccessAuthorityAuth')
				    		}
						},
						{
							xtype: 'tsb-datagrid',
							title: 'Planning',
				    		reference: me.AUTH_ACCESS_GRID_REF_NAME,
				    		usePagingToolbar : true,
				    		flex: 1,
				    		plugins: [
								'gridexporter',
								'gridfilters',
								'clipboard'
							],
				    		bind: {
				    			store: '{' + me.AUTH_ACCESS_PLAN_STORE_NAME + '}'
				    		},
				    		selModel: {
								type: 'spreadsheet',
			                    cellSelect:false,
							},
				    		listeners: {
				    			pagingSearch: 'searchAuthorityPlanList'
				    		},
				    		columns:{
				    			defaults: {
				            		style : 'text-align:center',
				            		align: 'center'
				            	},
				            	items: GridUtil.getGridColumns('AccessAuthorityAuth')
				    		}
						},
						{
							xtype: 'tsb-datagrid',
							title: 'Execution',
				    		reference: me.AUTH_ACCESS_GRID_REF_NAME,
				    		usePagingToolbar : true,
				    		flex: 1,
				    		plugins: [
								'gridexporter',
								'gridfilters',
								'clipboard'
							],
				    		bind: {
				    			store: '{' + me.AUTH_ACCESS_OPE_STORE_NAME + '}'
				    		},
				    		selModel: {
								type: 'spreadsheet',
			                    cellSelect:false,
							},
				    		listeners: {
				    			pagingSearch: 'searchAuthorityOpeList'
				    		},
				    		columns:{
				    			defaults: {
				            		style : 'text-align:center',
				            		align: 'center'
				            	},
				            	items: GridUtil.getGridColumns('AccessAuthorityAuth')
				    		}
						},
						{
							xtype: 'tsb-datagrid',
							title: 'Monitoring',
				    		reference: me.AUTH_ACCESS_GRID_REF_NAME,
				    		usePagingToolbar : true,
				    		flex: 1,
				    		plugins: [
								'gridexporter',
								'gridfilters',
								'clipboard'
							],
				    		bind: {
				    			store: '{' + me.AUTH_ACCESS_MONITOR_STORE_NAME + '}'
				    		},
				    		selModel: {
								type: 'spreadsheet',
			                    cellSelect:false,
							},
				    		listeners: {
				    			pagingSearch: 'searchAuthorityMonitorList'
				    		},
				    		columns:{
				    			defaults: {
				            		style : 'text-align:center',
				            		align: 'center'
				            	},
				            	items: GridUtil.getGridColumns('AccessAuthorityAuth')
				    		}
						},
						{
							xtype: 'tsb-datagrid',
							title: 'Billing',
				    		reference: me.AUTH_ACCESS_GRID_REF_NAME,
				    		usePagingToolbar : true,
				    		flex: 1,
				    		plugins: [
								'gridexporter',
								'gridfilters',
								'clipboard'
							],
				    		bind: {
				    			store: '{' + me.AUTH_ACCESS_BILLING_STORE_NAME + '}'
				    		},
				    		selModel: {
								type: 'spreadsheet',
			                    cellSelect:false,
							},
				    		listeners: {
				    			pagingSearch: 'searchAuthorityBillingList'
				    		},
				    		columns:{
				    			defaults: {
				            		style : 'text-align:center',
				            		align: 'center'
				            	},
				            	items: GridUtil.getGridColumns('AccessAuthorityAuth')
				    		}
						},
						{
							xtype: 'tsb-datagrid',
							title: 'Tablet',
				    		reference: me.AUTH_ACCESS_GRID_REF_NAME,
				    		usePagingToolbar : true,
				    		flex: 1,
				    		plugins: [
								'gridexporter',
								'gridfilters',
								'clipboard'
							],
				    		bind: {
				    			store: '{' + me.AUTH_ACCESS_TABLET_STORE_NAME + '}'
				    		},
				    		selModel: {
								type: 'spreadsheet',
			                    cellSelect:false,
							},
				    		listeners: {
				    			pagingSearch: 'searchAuthorityTabletList'
				    		},
				    		columns:{
				    			defaults: {
				            		style : 'text-align:center',
				            		align: 'center'
				            	},
				            	items: GridUtil.getGridColumns('AccessAuthorityAuth')
				    		}
						}
		            ]
		        }
			]
		});
		
		me.callParent();
	}
});