Ext.define('MOST.view.codes.GeneralCodeDetail',{
	extend : 'Ext.panel.Panel',
	alias : 'widget.app-codedetail',
	requires : [],
		
	detailViewAlias: 'app-codedetail',
	layout : { type : 'hbox', align : 'stretch'},

	listeners:{
		afterrender:'onDetailLoad'
	},
	
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
		                    xtype: 'container',
		                    layout: {
								type: 'hbox',
		                    },
		                    items: [
		                    	{
			    					reference : 'refSystemCodeId',
			    					xtype : 'combo',
			    					fieldLabel : ViewUtil.getLabel('lcd'),
			    					emptyText : 'Select',
			    					displayField : 'lcdNm',
			    					valueField : 'lcd',
			    					bind : {
			    						store : '{systemCodeComboCud}',
			    						value : '{theDetail.lcd}'
			    					},
			    					editable : false
			    				},{
									reference : 'refCodeItemId',
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('mcd'),
									maxLength: 10,
									enforceMaxLength: true,
									bind:  '{theDetail.mcd}',
									listeners:{
										change: function(){
											this.setValue(this.getValue().toUpperCase());
										}
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
			                        xtype: 'textfield',
			                        reference: 'codeItemNmId',
			                        fieldLabel: ViewUtil.getLabel('name'),
			                        width: 510,
			    					bind: '{theDetail.mcdNm}'
			                    },{
			                        xtype: 'combo',
			                        reference: 'useYnId',
			                        fieldLabel: ViewUtil.getLabel('useyn'),
			                        queryMode: 'local',
			                        emptyText : 'Y',
									displayField : 'codeName',
									valueField : 'code',
									bind : {
										store : '{yesNoValue}',
										value : '{theDetail.useYn}'
									},
									editable : false
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
			                        reference: 'codeItemDescId',
			                        fieldLabel: ViewUtil.getLabel('cddesc'), 
			                        bind: '{theDetail.mcdDesc}'
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