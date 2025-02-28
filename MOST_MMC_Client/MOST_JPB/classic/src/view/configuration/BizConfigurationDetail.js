Ext.define('MOST.view.configuration.BizConfigurationDetail', {
	extend: 'Ext.panel.Panel',

	alias: 'widget.app-bizconfigurationdetail',

	requires: [
	],
	
	listeners:{
		afterrender:'onDetailLoad'
	},
	
	layout: {type:'hbox', align:'stretch'},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	
	YES_NO_VALUE_STORE: 'yesNoValue',
	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

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
	                    align: 'stretch'
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
		                    xtype: 'container',
		                    layout: {
								type: 'hbox',
								align: 'stretch'
		                    },                   
		                    items: [
		                    	{
			                        xtype: 'textfield',
			                        flex: 1,
			                        reference: 'refDetailCode',
			                        fieldLabel: ViewUtil.getLabel('DCCode'),
			                        maxLength: 20,
			                        listeners: {
			    						change : 'onUpperCase'
			    					},
			    					bind: '{theDetail.code}',
			    					enforceMaxLength : true,
			                    },
			                    {
			                        xtype: 'textfield',
			                        flex: 1,
			                        reference: 'refDetailValue',
			                        fieldLabel: ViewUtil.getLabel('value'),                   
			                        maxLength: 100,
			                        bind: '{theDetail.value}',
			                        enforceMaxLength: true,
			                        listeners: {
			    						change : 'onUpperCase'
			    					}
			                    },
			                    {
			                        xtype: 'combo',
			                        flex: 1,
			                        reference: 'refUseYN',
			                        fieldLabel: ViewUtil.getLabel('useyn'),
			                        queryMode: 'local',
			                        emptyText : 'Yes',
									displayField : 'codeName',
									valueField : 'code',
									bind : {
										store: '{' + me.YES_NO_VALUE_STORE + '}',
										value : '{theDetail.useYn}'
									},
									editable : false
			                    }
			                ]
		                },{
		                    xtype: 'container',
		                    layout: {
								type: 'hbox',
								align: 'stretch'
		                    },                   
		                    items: [
		                    	{
			                        xtype: 'textfield',
			                        flex: 2,
			                        reference: 'refDetailDesc',
			                        fieldLabel: ViewUtil.getLabel('DCDesc'),                   
			                        maxLength: 300,
			                        bind: '{theDetail.description}',
			                        enforceMaxLength: true,
			                        listeners: {
			    						change : 'onUpperCase'
			    					}
			                    },
			                    {
			                        xtype: 'textfield',
			                        flex: 1,
			                        reference: 'refDetailCategory',
			                        fieldLabel: ViewUtil.getLabel('category'),                   
			                        maxLength: 20,
			                        bind: '{theDetail.category}',
			                        enforceMaxLength: true,
			                        listeners: {
			    						change : 'onUpperCase'
			    					}
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