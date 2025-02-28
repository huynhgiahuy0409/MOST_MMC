Ext.define("MOST.view.codes.UNLocationCodeDetail",{
	extend: "Ext.panel.Panel",
    alias: 'widget.app-unlocatioindscodedetail',
    requires: [
	],
	
	detailViewAlias: 'app-unlocatioindscodedetail',
	
	listeners:{
		afterrender: 'onDetailLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	COUNTRY_COMBO_STORE_NAME: 'countryCombo',
	MAIN_STORE_NAME: 'unLocationCode',
	MAIN_GRID_REF_NAME: 'refUNLocationCodeGrid',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	layout : {
		type : 'hbox',
		align : 'stretch'
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
			    					reference : 'refColCountryName',
			    					xtype : 'combo',
			    					fieldLabel : ViewUtil.getLabel('countryName'),
			    					emptyText : 'select',
			    					displayField : 'scdNm',
			    					valueField : 'scd',
			    					queryMode: 'local',
			    					maxLength: 50, 
									enforceMaxLength: true, 
			    					bind : {
			    						store : '{' + me.COUNTRY_COMBO_STORE_NAME + '}',
			    						value : '{theDetail.cntryCd}'
			    					},
			    					listeners : {
			    						blur: function(){ 
											if(this.getValue()){
												this.setValue(this.getValue().toUpperCase());
											}
										} 
			    					},
			    					editable : true
			    				},{
									reference : 'refColPortCode',
									xtype : 'textfield',
									fieldLabel : ViewUtil.getLabel('portCode'),
									allowBlank: false,
									maskRe: /[A-Za-z]/,
									maxLength: 3, 
									enforceMaxLength: true, 
									listeners : {
			    						blur: function(){ 
			    							this.setValue(this.getValue().toUpperCase()); 
										} 
			    					},
									bind:  '{theDetail.portCd}'
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
			                        reference: 'refColPortName',
			                        fieldLabel: ViewUtil.getLabel('portName'),
			                        allowBlank: false,
			                        maxLength: 100, 
									enforceMaxLength: true, 
			                        maskRe: /[a-zA-Z0-9_&-\\ ]/,
			                        width: 510,
			                        listeners: {
			    						blur: function(){ 
			    							this.setValue(this.getValue().toUpperCase()); 
										} 
			    					},
			    					bind: '{theDetail.portNm}'
			                    },{
			                        xtype: 'textfield',
			                        reference: 'refPortVal',
			                        fieldLabel: ViewUtil.getLabel('portVal'),
			                        maxLength: 5, 
									enforceMaxLength: true, 
									bind: '{theDetail.portVal}'
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
