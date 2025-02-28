Ext.define('MOST.view.administrator.listoffreshwater.ListOfFreshWaterJpvcTab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-listoffwsjpvctab',

    requires: [
    	'Ext.form.FieldSet',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
    ],
    /**
     * =========================================================================================================================
     * CONSTANT START
     */
    LIST_OF_FW_JPVC_GRID_REF_NAME: 'refListOfFWJpvcGrid',  
    LIST_OF_FW_JPVC_STORE_NAME: 'fwsList',            
    /**
    * CONSTANT END
    * =========================================================================================================================
    */
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            items: [
                {
                    xtype: 'searchfieldset',
                    title: ViewUtil.getLabel('search'),
                    autoScroll: true,
                    collapsible:true,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults:{
                        margin: '0 0 5 0',
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            defaults: {
                                labelAlign: 'right',
                                margin: '0 0 0 0',
                                labelWidth: 80,
                            },
                            items: [
                                {
                                    xtype : 'shipcallnofield',
                                    reference : 'ctlScn',
                                    fieldLabel : ViewUtil.getLabel('shipCallNo'),
                                    fieldLabel: ViewUtil.getLabel('shipCallNo'),
									bind: {
										value: '{theSearch.scn}',
									},
                                },
                                {
                                    reference: 'ctlFromDtJpvc',
                                    xtype: 'datefield',
                                    margin: '0 5 0 0',
                                    fieldLabel: ViewUtil.getLabel('workYmd'),
                                    format: MOST.config.Locale.getShortDate(),
                                    listeners: {
                                        select: 'onDateChangeJpvc'
                                    },
                                    editable: true,
                                },
                                {
                                    reference: 'ctlToDtJpvc',
                                    xtype: 'datefield',
                                    anchor: '100%',
                                    format: MOST.config.Locale.getShortDate(),
                                    listeners: {
                                        select: 'onDateChangeJpvc'
                                    },
                                    editable: true,
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            defaults: {
                                labelAlign: 'right',
                                margin: '0 0 0 0',
                                labelWidth: 80,
                            },
                            items: [
                                {
                                    xtype : 'vesselcalllistfield',
									reference: 'ctlVslCallId',
                                    fieldLabel: ViewUtil.getLabel('vslschCallId'),
									change: function (field, newValue) {
										field.setValue(newValue.toUpperCase());
									},
									bind: { value: '{theSearch.vslCallId}' }
                                }
                            ]
                        },
                    ]
                },
            	{
                    xtype: 'tsb-datagrid',
                    reference: me.LIST_OF_FW_JPVC_GRID_REF_NAME,
                    flex: 1,
                    margin: '0 0 5 0',
                    stateful: true,
                    stateId: '',
                    viewConfig: {
                        stripeRows: true,
                        enableTextSelection: true,
                    },
                    plugins: [
                        'gridfilters',
                        'clipboard'
                    ],
                    bind: {
                        store: '{' + me.LIST_OF_FW_JPVC_STORE_NAME + '}'
                    },
                    selModel: {
                        type: 'spreadsheet',
                        cellSelect: false
                    },
                    listeners: {
                        celldblClick: 'onDblClick'
                    },
                    columns: {
                        defaults: {
                            style: 'text-align:center',
                            align: 'center'
                        },
                        items: GridUtil.getGridColumns('FreshWaterListJpvc')
                    }
                }
            ],
        });

        me.callParent();
    }
});