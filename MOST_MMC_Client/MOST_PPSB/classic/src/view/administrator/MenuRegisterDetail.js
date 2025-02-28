Ext.define('MOST.view.administrator.MenuRegisterDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.menuregisterdetail',
	
	requires: [
		'Ext.grid.plugin.RowEditing',
	],

	config: {
		crud: null,
		ptnrTypes: null,
		shippingLines: null,
		contracts: null
	},
	
	constructor: function(config) {
		this.callParent(arguments);
	},
	
	listeners:{
		afterrender: 'onDetailLoad'
	},
	width: 1270,
	height:560,
	scrollable: true,

    layout: {
    	type: 'vbox',
		align: 'stretch'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */

	PROGRAM_GRID_REF_NAME: 'refProgramInfoGrid', // Program Grid Name 
	PROGRAM_STORE_NAME: 'programInfoList',	// Program Store Name
	PARAMETTER_CHECK_COMBOBOX_STORE: 'yesNoCombo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	initComponent: function() {
		var me = this;
		
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId: 'programInfoEditor',
			listeners: {
				cancelEdit: 'onCancelEdit',				
				validateedit: 'onValidateEdit',				
				edit: 'onEdit'
			}
		});
		
		Ext.apply(me, {
			xtype:'container',
			layout: {
				type: 'vbox',
				align: 'stretch',
			},
			margin : '0 0 0 0',
			items: [
				{
					xtype:'fieldset',
	                margin: '5 5 5 5',
					  layout:{
	            		type :'vbox'
	            	},
	            	items:[
	            		{
			            	xtype:'fieldset',
			                margin: '0 0 0 0',
			                title: 'Menu Info.',
			            	layout:{
			            		type :'vbox'
			            	},
			            	items:[
			            		{
				                    xtype: 'container',
				                    margin: '0 0 0 0',
				                    defaults: {
				                    	margin: '5 5 0 0',
				                        labelAlign: 'right',
				                        labelWidth: 100,
				                        width: 390
				                    },
				                    layout: {
				                        type: 'hbox'
				                    },
				                    items: [
				                        {
				                            xtype: 'textfield',
				                            fieldLabel: ViewUtil.getLabel('programId'),
				                            bind: '{theDetail.pgmId}',
				                            allowBlank:false,
				                            reference: 'txtPgmId',
				                            labelWidth: 70,
				                        },{
				                            xtype: 'textfield',
				                            fieldLabel: ViewUtil.getLabel('programNm'),
				                            reference: 'txtPgmNm',
				                            allowBlank:false,
				                            bind: '{theDetail.pgmNm}',
				                        },{
				                            xtype: 'textfield',
				                            fieldLabel: ViewUtil.getLabel('upperMenuId'),
				                            reference: 'txtUpperMenuId',
				                            allowBlank:true,
				                            bind: '{theDetail.upperMenuId}',
				                        }
				                    ]
				                },{
				                    xtype: 'container',
				                    margin: '0 0 0 0',
				                    defaults: {
				                    	margin: '5 5 0 0',
				                        labelAlign: 'right',
				                        labelWidth: 100,
				                        width: 390
				                    },
				                    layout: {
				                        type: 'hbox'
				                    },
				                    items: [
				                        {
				                            xtype: 'textfield',
				                            fieldLabel: ViewUtil.getLabel('aClass'),
				                            allowBlank:false,
				                            bind: '{theDetail.laClsf}',
				                            labelWidth: 70,
				                        },{
				    	                	xtype: 'textfield',
				                            fieldLabel: ViewUtil.getLabel('bClass'),
				                            allowBlank:false,
				                            bind: '{theDetail.midClsf}',
				                        },{
				    	                	xtype: 'textfield',
				                            fieldLabel: ViewUtil.getLabel('cClass') ,
				                            allowBlank:false,
				                            bind: '{theDetail.smClsf}',
				                        }
				                    ]
				                },{
				                    xtype: 'container',
				                    margin: '0 0 0 0',
				                    defaults: {
				                    	margin: '5 5 0 0',
				                        labelAlign: 'right',
				                        labelWidth: 100,
				                        width: 390
				                    },
				                    layout: {
				                        type: 'hbox'
				                    },
				                    items: [
				                        {
				                        	xtype: 'combo',
				                            fieldLabel: ViewUtil.getLabel('useyn'),
				                            emptyText : 'No',
				    						displayField : 'codeName',
				    						valueField : 'code',
				    						queryMode: 'local',
				                            labelWidth: 70,
				                            bind : {
				    							store : '{' + me.PARAMETTER_CHECK_COMBOBOX_STORE + '}',
				    							value : '{theDetail.pgmUseYn}'
				    						},
				                            editable : false
				                        },{
				                            xtype: 'textfield',
				                            fieldLabel: ViewUtil.getLabel('scrnPathAddr'),
				                            bind: '{theDetail.scrnPathAddr}',
				                        },{
				                            xtype: 'textfield',
				                            fieldLabel: ViewUtil.getLabel('scrnIcn'),
				                            bind: '{theDetail.scrnIcnDefCd}',
				                        }
				                    ]
				                },{
				                    xtype: 'container',
				                    margin: '0 0 0 0',
				                    defaults: {
				                    	margin: '5 5 10 0',
				                        labelAlign: 'right',
				                    },
				                    layout: {
				                        type: 'hbox'
				                    },
				                    items: [
				                        {
				                        	labelWidth: 70,
				                            xtype: 'textfield',
				                            fieldLabel: ViewUtil.getLabel('rmk'),
				                            bind: '{theDetail.rmk}',
				                            width: 1180,
				                        }
				                    ]
				                }
			            	]
			            }
	            	]
				},{
					xtype: 'tsb-datagrid',
					reference: me.PROGRAM_GRID_REF_NAME,
					flex:2,
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
					],
					bind: {
						store: '{' + me.PROGRAM_STORE_NAME + '}'
					},
					selModel: {
						type: 'spreadsheet',
						cellSelect: false
					},
					listeners : {
						pagingSearch:'onSearch'
					},
					columns: {
						defaults: {
		            		style : 'text-align:center',
		            		align: 'center'
		            	},
		            	items: GridUtil.getGridColumns('MenuRegisterProgramMng')
					}
				}
			]
		});
		
		me.callParent();
	}
});