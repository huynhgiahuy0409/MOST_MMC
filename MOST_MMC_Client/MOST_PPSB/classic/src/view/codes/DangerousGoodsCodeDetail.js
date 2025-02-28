Ext.define("MOST.view.codes.DangerousGoodsCodeDetail",{
	extend: "Ext.panel.Panel",
    
    alias: 'widget.app-dangerousgoodscodedetail',
    requires: [],
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
			    					reference : 'refColUnno',
			    					xtype : 'textfield',
			    					fieldLabel : ViewUtil.getLabel('unno'),
			    					bind :  '{theDetail.unno}',
			    					listeners: {
							            blur: function() {
											this.setValue(this.getValue().toUpperCase());
										}
						            },
						            maxLength: 4,
			                        enforceMaxLength: true,
						            allowBlank : false
			    				},{
									reference : 'refColClass',
									fieldLabel : ViewUtil.getLabel('gridtitleClass'),
									xtype : 'textfield',
			    					bind :  '{theDetail.unnoClass}',
						            maxLength: 3,
			                        enforceMaxLength: true,
						            allowBlank : false
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
			                        reference: 'refColSubstance',
			                        fieldLabel: ViewUtil.getLabel('subtance'),
			                        width: 510,
			                        maxLength: 1000,
			                        enforceMaxLength: true,
			    					bind: '{theDetail.substance}',
						            allowBlank : false
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
			                        reference: 'refTxtPackingGrp',
			                        fieldLabel: ViewUtil.getLabel('packingGrp'),    
			                        maxLength: 5,
			                        allowBlank: false,
			                        bind: '{theDetail.packingGrp}',
			                        enforceMaxLength: true,
			                    },{
			                        xtype: 'textfield',
			                        reference: 'refPageNo',
			                        fieldLabel: ViewUtil.getLabel('pageNo'),      
			                        maxLength: 7,
			                        bind: '{theDetail.pageNo}',
			                        enforceMaxLength: true,
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
			                        reference: 'refTxtPsa',
			                        fieldLabel: ViewUtil.getLabel('psa'),
			                        maxLength: 3,
			                        bind: '{theDetail.psa}',
			                        enforceMaxLength: true,
			                    },{
			                        xtype: 'textfield',
			                        reference: 'refPageNo',
			                        fieldLabel: ViewUtil.getLabel('emsNo'),
			                        maxLength: 9,
			                        bind: '{theDetail.emsNo}',
			                        enforceMaxLength: true,
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
			                        reference: 'refTxtSubRiskLabel',
			                        fieldLabel: ViewUtil.getLabel('subRiskLabel'),    
			                        maxLength: 255,
			                        bind: '{theDetail.subRiskLabel}',
			                        enforceMaxLength: true,
			                    },{
			                        xtype: 'textfield',
			                        reference: 'refFlashPoint',
			                        fieldLabel: ViewUtil.getLabel('flashPoint'),      
			                        maxLength: 8,
			                        bind: '{theDetail.flashPoint}',
			                        enforceMaxLength: true,
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
			                        reference: 'refTxtMFag',
			                        fieldLabel: ViewUtil.getLabel('mFag'),    
			                        maxLength: 10,
			                        bind: '{theDetail.mfag}',
			                        enforceMaxLength: true,
			                    },{
			                        xtype: 'textfield',
			                        reference: 'refMarinePolu',
			                        fieldLabel: ViewUtil.getLabel('marinePolu'),      
			                        maxLength: 10,
			                        bind: '{theDetail.marinePolu}',
			                        enforceMaxLength: true,
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
			                        reference: 'refTxtSpecReq',
			                        fieldLabel: ViewUtil.getLabel('specReq'),    
			                        maxLength: 3,
			                        bind: '{theDetail.specReq}',
			                        enforceMaxLength: true,
			                    },{
			                        xtype: 'textfield',
			                        reference: 'refSpecReqRmk',
			                        fieldLabel: ViewUtil.getLabel('specReqRmk'),      
			                        maxLength: 255,
			                        bind: '{theDetail.specReqRmk}',
			                        enforceMaxLength: true,
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
			                        reference: 'refTxtRemark',
			                        fieldLabel: ViewUtil.getLabel('remark'),    
			                        maxLength: 100,
			                        bind: '{theDetail.remark}',
			                        enforceMaxLength: true,
			                    },{
			                        xtype: 'textfield',
			                        reference: 'refLpk',
			                        fieldLabel: ViewUtil.getLabel('lpk'),      
			                        maxLength: 3,
			                        bind: '{theDetail.lpk}',
			                        enforceMaxLength: true,
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
			                        reference: 'refTxtFireCode',
			                        fieldLabel: ViewUtil.getLabel('fireCode'),    
			                        maxLength: 2,
			                        bind: '{theDetail.fireCode}',
			                        enforceMaxLength: true,
			                    },{
			                        xtype: 'textfield',
			                        reference: 'refPremiumCd',
			                        fieldLabel: ViewUtil.getLabel('premiumCd'),      
			                        maxLength: 2,
			                        bind: '{theDetail.premiumCd}',
			                        enforceMaxLength: true,
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
			                        reference: 'refTxtImdgDiv',
			                        fieldLabel: ViewUtil.getLabel('imdgDiv'),    
			                        maxLength: 1,
			                        bind: '{theDetail.imdgDiv}',
			                        enforceMaxLength: true,
			                    },{
			                        xtype: 'textfield',
			                        reference: 'refPriCode',
			                        fieldLabel: ViewUtil.getLabel('priCode'),      
			                        maxLength: 5,
			                        bind: '{theDetail.priCode}',
			                        enforceMaxLength: true,
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
