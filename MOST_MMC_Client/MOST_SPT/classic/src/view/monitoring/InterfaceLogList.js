Ext.define('MOST.view.monitoring.InterfaceLogList', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-interfaceloglist',
	requires: [
	],
	
	controller: 'interfaceLogList',
	viewModel: {
		type: 'interfaceLogList'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refInterfaceLogListGrid',	// Main Grid Name 
	MAIN_STORE_NAME: 'interfaceLogList',		// Main Store Name
	
	SYSTEM_TYPE_STORE_NAME : 'systemTypeCombo',
	MESSAGE_TYPE_STORE_NAME : 'messageTypeCombo',
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
				// gridColumnName: 'InterfaceLogList',
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
					cellSelect: false,
					listeners: {
						select: 'onChecked',
						deselect:'onChecked'
					}
				},
				selType: 'checkboxmodel',
				checkOnly: false,
				listeners: {
					pagingSearch: 'onSearch',
					selectionchange: 'onSelectionchange'
				},
				columns: {
					defaults: {
						style: 'text-align: center',
						align: 'center'
					},
					items: GridUtil.getGridColumns('InterfaceLogList'),
				},
			}, 
			{
				xtype: 'splitter'   // A splitter between the two child items
			},
			{
				xtype : 'fieldset',
				collapsible: true,
				defaults: {
					margin: '1 1 1 1'
				},
				items:[{
					xtype: 'container',
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					items: [{
						title: ViewUtil.getLabel('errDetail'),
						margin: '1 1 1 1',
						items:[{
							xtype: 'textareafield',
							reference: 'ctlErrDetail',
							width: '100%',
							height: 100,
							margin: '0 0 0 0',
							grow: true,
							readOnly: true,
							bind: '{theDetail.errDetailMsg}',
						}]
					},
					{
						xtype: 'container',
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						margin: '1 1 1 1',
						items: [{
							title: ViewUtil.getLabel('request'),
							margin: '1 1 1 1',
							flex: 1,
							items:[{
								xtype: 'textareafield',
								reference: 'ctlRequest',
								width: '100%',
								height: 150,
								margin: '0 0 0 0',
								grow: true,
								readOnly: true,
								bind: '{theDetail.requestMsg}',
							}]
						},
						{
							title: ViewUtil.getLabel('response'),
							margin: '1 1 1 1',
							flex: 1,
							items:[{
								xtype: 'textareafield',
								reference: 'ctlResponse',
								width: '100%',
								height: 150,
								margin: '0 0 0 0',
								grow: true,
								readOnly: true,
								bind: '{theDetail.responseMsg}',
							}]
						}]
					}]
				}]
			}],
			
			dockedItems: [{
				xtype : 'container',
				style: { "background-color":"white" },
				layout: {
					type: 'hbox',
				},
				defaults: {
					margin: '1 1 1 1'
				},
				items:[{
					xtype: 'tbfill'
				},
				{
					xtype: 'button',
					reference:'refBtnRetrieve',
					text: ViewUtil.getLabel('search'),
					iconCls: 'x-fa fa-search', 
					cls: 'search-button', 
					listeners: {
						click: 'onSearch'
					}
				},
				/*
				{
					xtype: 'button',
					itemId: 'btnAdd',
					reference:'refBtnCreate',
					text: ViewUtil.getLabel('add'),
					iconCls: 'x-fa fa-plus',
					listeners: {
						click: 'onGridAdd'
					}
				},
				{
					xtype: 'button',
					itemId: 'btnDelete',
					reference:'refBtnDelete',
					text: ViewUtil.getLabel('remove'),
					ui: 'delete-button',
					iconCls: 'x-fa fa-minus',
					listeners: {
						click: 'onGridRemove'
					}
				},
				*/
				{
					xtype: 'button',
					itemId: 'exportToExcelButton',
					text: ViewUtil.getLabel('exportToExcel'),
					iconCls: 'excel-button-image', 
					cls: 'excel-button', 
					listeners: {
						click: {
							fn: 'onExportExcel',
							args:[me.MAIN_GRID_REF_NAME]
						}
					}
				},
				{
					xtype: 'button',
					itemId: 'btnColumnSetting',
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
				items: [{
					xtype: 'fieldset',
					title: ViewUtil.getLabel('search'),
					autoScroll: true,
					collapsible:true,
					flex:1,
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults:{
						margin: '0 0 5 0'
					},
					items: [{
						xtype: 'container',
						layout: {
							type: 'vbox',
							align: 'stretch'
						},
						defaults: {
							labelAlign: 'right',
							labelWidth: 75,
							width: 225,
							margin: '1 1 1 1'
						},
						items: [{
					        //Trans Type
					        xtype: 'combo',
					        reference: 'ctlTransType',
					        // comboMode: CommonConstants.TCOMBO_MODE_LOCAL,
					        // param: CacheServiceConstants.INTERFACE_LOG_TRANS_TYPE,
					        fieldLabel: ViewUtil.getLabel('transType'),
							queryMode: 'local',
					        displayField: 'scdNm',
        					valueField: 'scd',
					        bind: {
								 store: '{transTypeCombo}'
								,value: '{theSearch.transType}'
							},
					        listeners: {
					            afterChange: 'onAfterChange',
					            change:'onCboTransType_change',
					        },
					        editable: false,
					    },
					    {
					        //Status
					        xtype: 'combo',
					        reference: 'ctlStatus',
					        // comboMode: CommonConstants.TCOMBO_MODE_LOCAL,
					        // param: CacheServiceConstants.INTERFACE_LOG_APPLY_STATUS,
					        fieldLabel: ViewUtil.getLabel('status'),
							queryMode: 'local',
					        displayField: 'scdNm',
        					valueField: 'scd',
					        bind: {
								 store: '{statusCombo}'
								,value: '{theSearch.status}'
							}
					    }]
					},
					{
						xtype: 'container',
						layout: {
							type: 'vbox',
							align: 'stretch'
						},
						defaults: {
							margin: '1 1 1 1'
						},
						items: [{
					        //Message Type
					        xtype: 'combo',
					        reference: 'ctlMsgType',
					        labelAlign: 'right',
					        labelWidth: 87,
					        // comboMode: CommonConstants.TCOMBO_MODE_POPUP,
					        // param: PopupServiceConstants.INTERFACE_RECV_MSG_TYPE,
					        fieldLabel: ViewUtil.getLabel('msgType'),
					        displayField: 'codeName',
					        valueField: 'code',
					        queryMode: 'local',
					        editable: false,
					        bind: {
					        	value: '{theSearch.msgType}',
					        	store:  '{' + me.MESSAGE_TYPE_STORE_NAME + '}',
					        },
					        listeners: {
					        	// afterStoreDataLoad: 'onAfterStoreDataLoad'
					        }
					    },
					    {
					        //Period
					    	xtype: 'container',
					    	layout: {
								type: 'hbox',
								align: 'stretch'
							},
							defaults: {
								labelAlign: 'right',
							},
							items:[{
								xtype: 'datetimefield',
								reference: 'ctlFromDate',
								fieldLabel: ViewUtil.getLabel('period'),
								labelWidth: 87,
								width: 237,
								margin: '0 2 0 0',
								format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
								displayFieldLabel: ViewUtil.getLabel('fromDate'),
								value: new Date(),
								bind: '{fromDateTimeString}'
							},
							{
								xtype: 'datetimefield',
								reference: 'ctlToDate',
								displayFieldLabel: ViewUtil.getLabel('toDate'),
								width: 150,
								format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
								value: new Date(),
								bind: '{toDateTimeString}'
							}]
					    }]
					},
					{
						xtype: 'container',
						layout: {
							type: 'vbox',
							align: 'stretch'
						},
						defaults: {
							labelAlign: 'right',
							labelWidth: 65,
							width: 265,
							margin: '1 1 1 1'
						},
						items: [{
					        //Request
							xtype: 'textfield',
							reference: 'ctlRequestFilter',
                            fieldLabel: ViewUtil.getLabel('request'),
							bind: '{theSearch.request}'
					    },
					    {
					        //Response
					    	xtype: 'textfield',
					    	reference: 'ctlResponseFilter',
                            fieldLabel: ViewUtil.getLabel('response'),
							bind: '{theSearch.response}'
					    }]
					},
					{
						xtype: 'container',
						layout: {
							type: 'vbox',
							align: 'stretch'
						},
						defaults: {
							labelAlign: 'right',
							labelWidth: 65,
							width: 265,
							margin: '1 1 1 1'
						},
						items: [{
					        //System Type
					        xtype: 'combo',
					        reference: 'ctlSysType',
					        fieldLabel: ViewUtil.getLabel('sysType'),
					        labelAlign: 'right',
					        labelWidth: 87,
					        bind: {
					        	value: '{theSearch.sysType}',
					        	store: '{' + me.SYSTEM_TYPE_STORE_NAME + '}',
					        },
				        	// comboMode: CommonConstants.TCOMBO_MODE_POPUP,
					        // param: PopupServiceConstants.INTERFACE_RECV_MSG_TYPE,
					        listeners: {
					        	change:'onCboSystemType_change',
					        	// afterStoreDataLoad: 'onAfterStoreDataLoad'
					        },
					        displayField: 'codeName',
	       					valueField: 'code',
					        queryMode: 'local',
					        editable: false
					    }]
					},{
						xtype: 'container',
						layout: {
							type: 'vbox',
							align: 'stretch'
						},
						items: [{
							xtype: 'button',
							margin: '1 1 1 5',
							text: ViewUtil.getLabel('send'),
							iconCls: 'fa fa-envelope-o',
		 					listeners: {
		 						click: 'onReSendMessage'
		 					}
						}]
					}]
				}]
			}]
		});

		me.callParent();
	}
});