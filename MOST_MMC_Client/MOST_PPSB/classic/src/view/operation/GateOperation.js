Ext.define('MOST.view.operation.GateOperation', {
    extend: 'Ext.form.Panel',

    alias: 'widget.app-gateoperation',

    requires: [

    ],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    controller: 'gateoperation',
    
    listeners: {
    	afterrender: 'onLoad'
    },
     
    viewModel: {
    	type: 'gateoperation'
    },

    initComponent: function() {
        var me = this;
        Ext.apply(this, {
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
            	{
                xtype: 'tabpanel',
                reference:'ctlMasterTab',
                margin: '0 5 5 0',
                listeners:{
					tabchange:'onMasterTabChange'
		        },
                items: [
                	//Gate-in
                	{
                        xtype: 'panel',
                        title: ViewUtil.getLabel('gateoperation.gatein'),
                        items: [{
                            xtype: 'tabpanel',
                            reference:'ctlGateInTab',
                            margin: '0 0 0 8',
                            listeners:{
    	    					tabchange:'onTabChange'
    	    		        },
                            items: [
                            	//General Cargo
                            	{
                                    xtype: 'app-gateincargo',
                                    reference:'refGateInGeneralCargo',
                                    name: 'GeneralCargoGateIn',
                                    title: ViewUtil.getLabel('gateoperation.generalcargo')
                                },
                                //Roro 
                                {	
                                	xtype: 'app-gateinroro',
                		    		reference: 'refGateInRORO',
                                    name: 'ROROGateIn',
                                	title: ViewUtil.getLabel('gateoperation.roro')
                                }
                            ]
                        }]
                    },
                    //Gate-out
                    {
                        xtype: 'panel',
                        title: ViewUtil.getLabel('gateoperation.gateout'),
                        items: [{
                            xtype: 'tabpanel',
                            reference:'ctlGateOutTab',
                            margin: '0 0 5 10',
                            listeners:{
    	    					tabchange:'onTabChange'
    	    		        },
                            items: [
                            	//General Cargo
                            	{
                                    xtype: 'app-gateoutcargo',
                                    reference:'refGateOutGeneralCargo',
                                    name: 'GeneralCargoGateOut',
                                    title: ViewUtil.getLabel('gateoperation.generalcargo')
                                },
                                //Roro 
                                {
                                	xtype: 'app-gateoutroro',
                                    reference:'refGateOutRORO',
                                    name: 'ROROGateOut',
                                    title: ViewUtil.getLabel('gateoperation.roro')
                                }
                            ]
                        }]
                    }
                ]
            }],
            dockedItems: [{
                xtype: 'container',
                style: {
                    "background-color": "white"
                },
                layout: {
                    type: 'hbox'
                },
                defaults: {
                    margin: '1 1 1 1'
                },
                items: [{
                        xtype: 'tbfill'
                    }, 
                    {
						xtype: 'button',
						reference:'refBtnPreview',
						text: ViewUtil.getLabel('preview'),
						iconCls: 'x-fa fa-file-pdf-o',
						cls: 'excel-button',
						listeners: {
							click: {
								fn: 'onPreview',
							}
						}
					},
                    {
                        xtype: 'button',
                        reference: 'btnDamage',
                        text: 'Damage',
                        listeners: {
							click:'onDamage_clickHandler'
						}
                    },                  
                    {
                        xtype: 'button',
                        reference: 'btnDimension',
                        text: 'Dimension',
                        listeners: {
							click:'onDimension_clickHandler'
						}
                    }   
                ]
            }, ]
        });
        me.callParent();
    }
});