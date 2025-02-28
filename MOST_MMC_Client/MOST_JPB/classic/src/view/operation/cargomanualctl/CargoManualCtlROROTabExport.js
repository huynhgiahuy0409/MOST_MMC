Ext.define('MOST.view.operation.cargomanualctl.CargoManualCtlROROTabExport', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-cargomanualctlrorotabexport',
	
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
		                    xtype: 'textfield',
		                    reference: 'ctlCargoManualCtlExportLorryNo',
		                    width: 200,
		                    fieldLabel: ViewUtil.getLabel('lorryNo'),
		                    labelWidth: 50,
							//bind:'{theSearch.lorryNo}',
	    					fieldStyle: 'text-transform:uppercase',	    					
	    					listeners:{
	    						change: 'onUpperCase'
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
		                            reference: 'ctlCargoManualCtlExportFromDt',
		                            width: 260,
		                            fieldLabel: ViewUtil.getLabel('handlingInTime'),
		                            labelAlign: 'right',
		                            labelWidth: 120,
			    					format: MOST.config.Locale.getShortDate()
		                        },
		                        {
		                            xtype: 'datefield',
		                            reference: 'ctlCargoManualCtlExportToDt',
		                            width: 140,
		                            margin: '0 0 0 5',
			    					format: MOST.config.Locale.getShortDate()
		                        }
		                    ]
		                },
						{
		                    xtype: 'textfield',
		                    reference: 'ctlCargoManualCtlHatchNoExportTab',
		                    fieldLabel: ViewUtil.getLabel('cargoLoadingListHatchNo'),
		                    labelWidth: 50,
							width: 200,
		                    readOnly: true,
		                    //bind:'{theSearch.hatchNo}',
	    					fieldStyle: 'text-transform:uppercase',	    					
	    					listeners:{
	    						change: 'onUpperCase'
	    					}
		                },
						{
							xtype:'button',
						   iconCls: 'x-fa fa-search',
						   reference:'btnHatchNoExportTab',
						   listeners:{
							   click:{
								  fn: 'onOpenCommonPopup',
								  args: ['hatchNoExportTab'] //categoryType
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
					reference: 'refCargoManualCtlROROTabExportGrid',
					flex : 1,
					margin: '5 5 5 5',
					stateful : true,
					stateId : 'stateCargoManualCtlROROTabExportGrid',
					gridName:'Export',
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
		    		],
		    		bind: {
		    			store: '{cargoManualCtlROROTabExport}'
		    		},
		    		selModel: {
						type: 'spreadsheet',
						cellSelect: false
					},
					listeners: {
						celldblclick: 'onDblClickForExportTab',
						cellclick: 'onClickForExportTab',
						pagingSearch:'onSearch'
					},
					columns: {
		            	defaults: {
		            		style : 'text-align:center',
		            		align : 'center'
		            	},
		            	items: GridUtil.getGridColumns('CargoManualCtlROROTabExport')
					}
			    }
			]
		});
		
		me.callParent();
	}
});