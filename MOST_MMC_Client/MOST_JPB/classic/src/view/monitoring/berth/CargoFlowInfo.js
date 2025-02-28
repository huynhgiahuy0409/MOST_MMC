Ext.define('MOST.view.monitoring.berth.CargoFlowInfo', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.app-cargoflowinfo',

    requires: [
        'MOST.config.Locale',
        'TSB.ux.form.field.DateTimeField',
        'TSB.ux.form.field.DateTimePicker',
        'MOST.view.monitoring.BerthMonitoringController'
    ],

    layout: {type: 'vbox', align: 'stretch'},
    
    UNIT_COMBO_STORE: 'unitCombo',
    
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'container',
                height: '100%',
                defaults: {
	                margin: '10 10 0 2'
	            },
                items: [
            	{
		            xtype: 'container',
		            //reference:'refOperation',
			    	layout: {
			    		type: 'vbox',
			            align: 'stretch'
		    		},
		            items: [
		            	{
		            		xtype: 'label',
			                //margin: '30 0 0 0',
			                width: 200,
			                style: "font-weight:bold;font-size:20px;display:inline-block;text-align:center;color:BLACK",
			            	text: ViewUtil.getLabel('operationType')
	                    },
	                    {
	                    	xtype: 'container',
	    		            //reference:'refOperation',
	    			    	layout: {
	    			    		type: 'hbox',
	    			            align: 'stretch'
	    		    		},
	    		            items: [
	    	                    {
	    		            		xtype:'textfield',
	    			                margin: '10 5 0 0',
	    			                width: 20,
	    			                fieldStyle: 'background-color: #FF0000; background-image: none;'
	    	                    },
	    	                    {
	    		            		xtype: 'label',
	    			                margin: '15 15 0 0',
	    			                width: 50,
									style: "font-size:15px",
	    			            	text: ViewUtil.getLabel('import')
	    	                    },
								{
	    		            		xtype:'textfield',
	    			                margin: '10 5 0 0',
	    			                width: 20,
	    			                fieldStyle: 'background-color: #5c85d6; background-image: none;'
	    	                    },
	    	                    {
	    		            		xtype: 'label',
	    			                 margin: '15 15 0 0',
	    			                width: 50,
									style: "font-size:15px",
	    			            	text: ViewUtil.getLabel('export')
	    	                    },
								{
	    		            		xtype:'textfield',
	    			                margin: '10 5 0 0',
	    			                width: 20,
	    			                fieldStyle: 'background-color: #660066; background-image: none;'
	    	                    },
	    	                    {
	    		            		xtype: 'label',
	    			                margin: '15 0 0 0',
	    			                width: 50,
	    			                style: "font-size:15px",
									text: 'Both'
	    	                    }		
	    		            ]
	                    },
	                   
	                    {
		            		xtype: 'label',
			                margin: '20 0 0 0',
			                width: 200,
			                style: "font-weight:bold;font-size:20px;display:inline-block;text-align:center;color:BLACK",
			            	text: 'Vessel Status'
	                    },
	                    {
	                    	xtype: 'container',
	    		            //reference:'refOperation',
	    			    	layout: {
	    			    		type: 'hbox',
	    			            align: 'stretch'
	    		    		},
	    		            items: [
	    	                    {
	    		            		xtype:'textfield',
	    			                margin: '10 5 0 0',
	    			                width: 20,
	    			                fieldStyle: 'background-color: #4d9900; background-image: none;'
	    	                    },
	    	                    {
	    		            		xtype: 'label',
	    			                margin: '15 0 0 0',
	    			                width: 100,
									style: "font-size:15px",
	    			            	text: 'On Working'
	    	                    },
								{
	    		            		xtype:'textfield',
	    			                margin: '10 5 0 0',
	    			                width: 20,
	    			                fieldStyle: 'background-color: #978b8b; background-image: none;'
	    	                    },
	    	                    {
	    		            		xtype: 'label',
	    			                margin: '15 0 0 0',
	    			                width: 150,
									labelWidth: 100,
									style: "font-size:15px",
	    			            	text: 'Non Working'
	    	                    }
	    		            ]
	                    },
						{
		            		xtype: 'label',
			                margin: '30 0 20 0',
							reference: 'ctlVslCallId',
			                width: 200,
			                style: "font-weight:bold;font-size:30px;display:inline-block;text-align:center;color:RED"
	                    },
						{
							xtype: 'combobox',
							margin: '5 0 0 0',
							fieldLabel: ViewUtil.getLabel('unitType'),
							reference: 'ctlUnit',
							bind: {
								store: '{' + me.UNIT_COMBO_STORE + '}',
								//value : me.unitType
							},
						    width: 200,
							displayField: 'name',
							valueField: 'code',
							emptyText: 'MT',
							editable: false,
							hidden: true,
							listeners: {
								select: 'onSelectUnitType'
							},
							queryMode: 'local'
						}
		            ]
	    		},
            	{
		            xtype: 'container',
		            //reference:'refOperation',
			    	layout: {
			    		type: 'vbox',
			            align: 'stretch'
		    		},
		            items: [
		            	{
	    					xtype: 'panel',
	                    }
		            ]
	    		},
	    		{
		            xtype: 'container',
		            reference:'refStatus',
			    	layout: {
			    		type: 'vbox',
			            align: 'stretch'
		    		},
		            items: [
		            	{
	    					xtype: 'panel',
	                    }
		            ]
	    		},
            	{
		            xtype: 'container',
		            reference:'refDischargeCmmd',
			    	layout: {
			    		type: 'vbox',
			            align: 'stretch'
		    		},
		            items: [
		            	{
	    					xtype: 'panel',
	                    }
		            ]
	    		},{
	    			xtype: 'container',
		            reference:'refLoadingCmmd',
			    	layout: {
			    		type: 'vbox',
			            align: 'stretch'
		    		},
			            items: [
			            	{
	    					xtype: 'panel',
	                    }
			            ]
	    			
	    		}
                ]
            }]
        });

        me.callParent();
    }
});