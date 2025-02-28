Ext.define('MOST.view.configuration.CommodityCodeDetail', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-commoditycodedetail',
	
	requires: [
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	listeners: {
		afterrender: 'onDetailLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	
	MAIN_GRID_REF_NAME: 'refcommodityCodeGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'commodityCodeList',
	COMMODITY_CODE_CATEGORY_STORE: 'commodityCodeCategoryCombo',
	COMMODITY_CODE_GROUP_STORE: 'commodityCodeGroupCombo',
	COMMODITY_CODE_GROUP_CODE_STORE: 'commodityCodeGroupCdCombo',
	COMMODITY_CODE_IMDG_STORE: 'commodityCodeImdgCombo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout : {type  : 'vbox', align : 'stretch'},
	
	initComponent: function() {
		var me = this;

		Ext.apply(me, {
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            margin: '0 0 0 0',
			items: [
				{
	                layout: {
	                    type: 'vbox',
	                },
	                margin: '4 4 4 4',
	                defaults: {
	                    labelAlign: 'right',
	                    labelWidth: 81,
	                    margin: '2 2 2 2',
	                    defaults: {
	                        labelAlign: 'right',
	                        labelWidth: 81,
	                    },
	                },
	                items: [
		            	{
							reference : 'refCgTp',
							xtype : 'combo',
							fieldLabel : ViewUtil.getLabel('category'),
							labelWidth: 150,
							emptyText : 'select',
							displayField : 'scdNm',
							valueField : 'scd',
							queryMode: 'local',
							bind : {
								store : '{' + me.COMMODITY_CODE_CATEGORY_STORE + '}',
								value : '{theDetail.cgTp}'
							},
							editable : false
						},{
		                    xtype: 'textfield',
		                    reference: 'refdescr',
		                    labelWidth: 150,
		                    width: 550,
		                    fieldLabel: ViewUtil.getLabel('descr'), 
		                    allowBlank: false,
		                    bind: '{theDetail.descr}',
		                    listeners: {
								change : 'onUpperCase'
							},
		                },{
		                    xtype: 'container',
		                    layout: {
								type: 'hbox',
		                    },
		                    items: [
		                    	{
			                        xtype: 'textfield',
			                        reference: 'refcmdtCd',
			                        labelWidth: 150,
			                        fieldLabel: ViewUtil.getLabel('cmdtCd'), 
			                        allowBlank: false,
			                        bind: '{theDetail.cmdtCd}',
			                        maxLength: 10,
			                        enforceMaxLength: true,
			                        listeners: {
			    						change : 'onUpperCase'
			    					},
			                    },{
									reference : 'refcmdtGrp',
									xtype : 'combo',
									labelWidth: 180,
									fieldLabel : ViewUtil.getLabel('cmdtGrp'),
									displayField: 'scdNm',
									valueField: 'scdNm',
									queryMode: 'local',
									editable : false,
									bind: {
										store: '{' + me.COMMODITY_CODE_GROUP_STORE + '}',
										value : '{theDetail.cmdtGrp}'
									}
								}
			                ]
		                },{
		                    xtype: 'container',
		                    layout: {
								type: 'hbox',
		                    },                   
		                    items: [
		                    	{
									reference : 'refcmdtGrpCd',
									xtype : 'combo',
									fieldLabel : ViewUtil.getLabel('cmdtGrpCd'),
									labelWidth: 150,
									displayField: 'scd',
									valueField: 'scd',
									queryMode: 'local',
									editable : false,
									bind: {
										store: '{' + me.COMMODITY_CODE_GROUP_CODE_STORE + '}',
										value : '{theDetail.cmdtGrpCd}'
									}
								},{
			                        xtype: 'combo',
			                        reference: 'refunno',
			                        fieldLabel: ViewUtil.getLabel('unno'),
			                        queryMode: 'local',
			                        labelWidth: 180,
									displayField : 'unno',
									valueField : 'unno',
									bind : {
										store : '{' + me.COMMODITY_CODE_IMDG_STORE + '}',
										value : '{theDetail.unno}'
									},
									listeners: {
			    						change : 'onChangeUnno'
			    					},
									editable : false
			                    },{
			                        xtype: 'textfield',
			                        reference: 'refImdg',
			                        fieldLabel: ViewUtil.getLabel('imdg'),    
			                        bind: '{theDetail.imdg}',
			                        readOnly: true,
			                    }
			                ]
		                },{
		                    xtype: 'container',
		                    layout: {
								type: 'hbox',
		                    },                   
		                    items: [
		                    	{
			                        xtype: 'textfield',
			                        reference: 'reftonnageCd',
			                        fieldLabel: ViewUtil.getLabel('tonnageCd'),   
			                        bind: '{theDetail.tonnageCd}',
			                        hidden: true,
			                    }
		                    ]
		                },
		            ]
	            }
			]
		});

		me.callParent();
	}
});