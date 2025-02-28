Ext.define('MOST.view.datagathering.DataGatheringDetailGatheredData', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-datagatheringdetailgathereddata',
	
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
			ptype: 'cellediting',
			clicksToEdit: 2,
			pluginId :'standardtariffrateEditor',
			listeners: {		
				edit: 'onEdit'
			}
		});
		
		Ext.apply(me, {
			items: [
				{
		            xtype: 'container',
                    margin: '5 0 0 0',
		            items: [
		                {
		                    xtype: 'container',
		                    layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'end'
                            },
                            defaults:{
                            	margin: '5 0 0 5',
        						labelAlign: 'right'
        					},
		                    items: [
		                    	{
                                    xtype: 'combobox',
                                    labelWidth:50,
                                    width:200,
                                    reference:'ctlDetailPayerCombo',
                                    fieldLabel: ViewUtil.getLabel('datagatheringdetailpayer'),
                                    bind: {
                                    	store: '{dataGatheringPayerCombo}'
                                    },
                                    queryMode: 'local',
        							displayField: 'payerName',
        					        valueField: 'payer',
        					        emptyText: 'Select Data',
        					        forceSelection:true,
        					        hidden: true
                                },
                                {
                					xtype: 'button',
                					margin: '5 0 0 2',
                 					iconCls: 'x-fa fa-search',
                					listeners: {
                						click: 'onDetailSearch'
                					},
                					hidden: true
                				},
		                    	{
									xtype: 'button',
									margin: '5 0 0 10',
									itemId: 'deleteButton',
									text: ViewUtil.getLabel('remove'),
									ui: 'delete-button',
									iconCls: 'x-fa fa-minus',
									listeners: {
										click: 'onRemoveDetail'
									},
									hidden: true
								}
		                    ]
		                }
		            ]
		        },{
    				xtype: 'tsb-datagrid',
    				itemId: 'masterDetailDetailGrid',
					usePagingToolbar : false,
    				reference: 'refDataGatheringDetailGatheredDataGrid',
    				flex: 1,
    				margin: '5 5 5 5',
    				stateful : true,
    				scrollable: true,
    				stateId : 'stateDataGatheringDetailGatheredDataGrid',
    				plugins: [
    					cellEditing, 
    			        'gridexporter',
    			        'gridfilters',
    			        'clipboard'
    	    		],
    	    		bind: {
    	    			store: '{dataGatheringGatheredDataList}'
    	    		},
    	    		selModel: {
    					type: 'spreadsheet',
    					cellSelect: false
    				},
    				listeners: {
    					celldblclick: 'onCellClick'
    				},
    				columns: {
    	            	defaults: {
    	            		style : 'text-align:center',
    	            		align : 'center'
    	            	},
    	            	items: GridUtil.getGridColumns('DataGatheringDetailGatheredData')
    				}
    		    }
		    ]
		});
		
		me.callParent();
	}
});

