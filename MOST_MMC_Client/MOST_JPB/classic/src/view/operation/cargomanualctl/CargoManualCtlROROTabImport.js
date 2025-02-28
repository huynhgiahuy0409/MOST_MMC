Ext.define('MOST.view.operation.cargomanualctl.CargoManualCtlROROTabImport', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-cargomanualctlrorotabimport',
	
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
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [
				{
		            xtype: 'container',
					hidden: true,
		            margin: '5 5 0 5',
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
                            xtype: 'combobox',
                            reference: 'ctlCargoManualCtlImportDeliveryCombo',
                            width: 220,
                            labelWidth: 60,
                            fieldLabel: ViewUtil.getLabel('delivery'),
                            queryMode: 'local',
                            hidden: true,
    	   					bind: {
    	   						store: '{cargoManualCtlForImportDeliveryCombo}',
    	   						value: '{theSearch.delvTpCd}'},
    	   					displayField: 'scdNm',
    	   					valueField: 'scd',
    	   					value: '',
                        },
                        {
		                    xtype: 'textfield',
		                    reference: 'ctlCargoManualCtlImportTruckNo',
		                    width: 200,
		                    fieldLabel: ViewUtil.getLabel('lorryNo'),
		                    labelWidth: 50,
		                    bind:'{theSearch.truckNo}',
	    					fieldStyle: 'text-transform:uppercase',	    					
	    					listeners:{
	    						change: 'onUpperCase'
	    					}
		                },
		                {
		                    xtype: 'container',
		                    flex: 2,
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'datefield',
		                            reference: 'ctlCargoManualCtlImportFromDt',
		                            width: 260,
		                            fieldLabel: ViewUtil.getLabel('handlingOutTime'),
		                            labelAlign: 'right',
		                            labelWidth: 120,
			    					format: MOST.config.Locale.getShortDate()
		                        },
		                        {
		                            xtype: 'datefield',
		                            reference: 'ctlCargoManualCtlImportToDt',
		                            width: 140,
		                            margin: '0 0 0 5',
			    					format: MOST.config.Locale.getShortDate()
		                        }
		                    ]
		                },
		                {
		                    xtype: 'textfield',
		                    reference: 'ctlCargoManualCtlImportHatchNo',
		                    fieldLabel: ViewUtil.getLabel('cargoDischargingListHatchNo'),
		                    labelWidth: 50,
		                    readOnly: true,
		                    bind:'{theSearch.hatchNo}',
	    					fieldStyle: 'text-transform:uppercase',	    					
	    					listeners:{
	    						change: 'onUpperCase'
	    					}
		                },
		                {
	                  		xtype:'button',
	                 		iconCls: 'x-fa fa-search',
	                 		reference:'btnHatchNo',
	                 		listeners:{
	                 			click:{
	    							fn: 'onOpenCommonPopup',
	    							args: ['hatchNo'] //categoryType
	    						}
	                 		}
	                 	},
		                {
							xtype: 'tbfill'
		                },
		            ]
		        },
		        {
		        	xtype: 'tsb-datagrid',
					reference: 'refCargoManualCtlROROTabImportGrid',
					flex : 1,
					margin: '5 5 5 5',
					gridName:'Import',
					stateful : true,
					stateId : 'stateCargoManualCtlROROTabImportGrid',
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
		    		],
		    		bind: {
		    			store: '{cargoManualCtlROROTabImport}'
		    		},
		    		selModel: {
						type: 'spreadsheet',
						cellSelect: false
					},
					listeners: {
						// celldblclick: 'onDblClickForJobMonitoring',
						celldblclick: 'onDblClickForImportTab',
						pagingSearch:'onSearch'
					},
					columns: {
		            	defaults: {
		            		style : 'text-align:center',
		            		align : 'center'
		            	},
		            	items: GridUtil.getGridColumns('CargoManualCtlROROTabImport')
					}
			    }
			]
		});
		
		me.callParent();
	}
});