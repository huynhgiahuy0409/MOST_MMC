Ext.define("MOST.view.codes.CountryCodeDetail",{
	extend: "Ext.panel.Panel",
    
    alias: 'widget.app-countrycodedetail',
    requires: [
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
   	],

	listeners: {
		afterrender: 'onDetailLoad'
	},

   	layout: {type:'hbox', align:'stretch'},

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
		   	       					reference: 'txtCountryCd',
		   	       					xtype: 'textfield',
		   	       					fieldLabel: ViewUtil.getLabel('countrycode'),
		   	       					labelWidth: 120,
		   	       					allowBlank :false,
		   	       					maxLength: 2,
		   	       		            enforceMaxLength: true,
									listeners: {
										blur: function() {
											 this.setValue(this.getValue().toUpperCase());
										}
									},
		   	       		            bind: '{theDetail.cntryCd}'
		   	       				}
	                        ]
	                    },{
	      					reference: 'txtCountryNm',
	      					xtype: 'textfield',
	      					labelWidth: 120,
	      					width: 500,
	      					fieldLabel: ViewUtil.getLabel('countryname'),
	      					allowBlank :false,
	      					maxLength: 50,
	      		            enforceMaxLength: true,
		       		        listeners: {
								blur: function() {
									 this.setValue(this.getValue().toUpperCase());
								}
		       		        },
	      		            bind: '{theDetail.cntryNm}'
		      			}
	                ]
                }
            ]
		});

		me.callParent();
	}
});
