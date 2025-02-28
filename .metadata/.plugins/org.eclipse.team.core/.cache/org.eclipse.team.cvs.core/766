Ext.define('MOST.view.operation.cargomanualctl.CargoManualCtlTabGatePass', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-cargomanualctltabgatepass',
	
	requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	lblLorry: {type: 'bundle', key: 'lorry'},
	lblGpTime: {type: 'bundle', key: 'gpTime'},
	lblCatgNm: {type: 'bundle', key: 'catgNm'},
	lblVslCallId: {type: 'bundle', key: 'jpvc'},
	lblGatePassNo: {type: 'bundle', key: 'gatePassNoGatePass'},
	lblGatePassIssueDt: {type: 'bundle', key: 'gpTime'},
	lblLorryNo: {type: 'bundle', key: 'lorry'},
	lblNoTrips: {type: 'bundle', key: 'noTripsGatePass'},
	lblWgt: {type: 'bundle', key: 'wgtGatePass'},
	lblMsrmt: {type: 'bundle', key: 'msrmtGatePass'},
	lblPkgQty: {type: 'bundle', key: 'pkgQtyGatePass'},
	lblCgNo: {type: 'bundle', key: 'cgNoGatePass'},
	lblRehandle: {type: 'bundle', key: 'rehandleGatePass'},
	lblDelvStat: {type: 'bundle', key: 'delvStatGatePass'},
	lblTsptTpNm: {type: 'bundle', key: 'tsptTpNmGatePass'},
	lblDelvTpNm: {type: 'bundle', key: 'delvTpNmGatePass'},
	lblIssued: {type: 'bundle', key: 'issued'},

	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [
				{
		            xtype: 'toolbar',
		            margin: '5 5 0 5',
					overflowHandler: 'menu',
					enableOverflow: true,
		            defaults: {
		                margin: '0 0 0 5',
		                labelAlign: 'right'
		            },
		            layout: {
		                type: 'hbox',
		                align: 'stretch'
		            },
		            items: [
		                {
		                    xtype: 'textfield',
		                    reference: 'ctlCargoManualCtlGatePassLorryNo',
		                    width: 200,
		                    fieldLabel: ViewUtil.getLabel('lorry'),
		                    labelWidth: 50,
	    					fieldStyle: 'text-transform:uppercase',
	    					listeners:{
	    						change: 'onUpperCase'
	    					},
	    					bind: {
	    						value: '{theSearch.lorryNo}'
	    					}
		                	
		                },
		                {
		                    xtype: 'container',
		                    width: 420,
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'datefield',
		                            reference: 'ctlCargoManualCtlGatePassFromDt',
		                            width: 200,
		                            fieldLabel: ViewUtil.getLabel('gpTime'),
		                            labelAlign: 'right',
		                            labelWidth: 60,
			    					format: MOST.config.Locale.getShortDate()
		                        },
		                        {
		                            xtype: 'datefield',
		                            reference: 'ctlCargoManualCtlGatePassToDt',
		                            width: 140,
		                            margin: '0 0 0 5',
			    					format: MOST.config.Locale.getShortDate()
		                        }
		                    ]
		                },
		                {
                            xtype: 'checkboxfield',
                            reference: 'ctlCargoManualCtlGatePassIssued',
                            boxLabel: ViewUtil.getLabel('issued'),
                            width: 110,
                            bind: {
                            	value: '{theSearch.issued}'
                            }
                        },
                        {
							xtype: 'tbfill'
		                },
		            ]
		        },
		        {
		        	xtype: 'tsb-datagrid',
					reference: 'refCargoManualCtlTabGatePassGrid',
					flex : 1,
					margin: '5 5 5 5',
					stateful : true,
					gridName:'Gate Pass',
					stateId : 'stateCargoManualCtlTabGatePassGrid',
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
		    		],
		    		bind: {
		    			store: '{cargoManualCtlTabGatePass}'
		    		},
		    		selModel: {
						type: 'spreadsheet',
						cellSelect: false
					},
					listeners: {
						celldblclick: 'onDblClickForGatePassDetail'
					},
					columns: {
		            	defaults: {
		            		style : 'text-align:center',
		            		align : 'center'
		            	},
		            	items: GridUtil.getGridColumns('CargoManualCtlTabGatePass')
					}
			    }
			]
		});
		
		me.callParent();
	}
});