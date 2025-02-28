Ext.define('MOST.view.administrator.listoffreshwater.ListOfFreshWaterNonJpvcTab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-listoffwsnonjpvctab',

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
    LIST_OF_FW_NON_JPVC_GRID_REF_NAME: 'refListOfFWNonJpvcGrid',			
	LIST_OF_FW_NON_JPVC_STORE_NAME: 'fwsNonJpvcList',            
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
                                    reference: 'ctlFromDtNonJpvc',
                                    xtype: 'datefield',
                                    margin: '0 5 0 0',
                                    fieldLabel: ViewUtil.getLabel('workYmd'),
                                    format: MOST.config.Locale.getShortDate(),
                                    listeners: {
                                        select: 'onDateChangeNonJpvc'
                                    },
                                    // editable: false
                                    editable: true
                                },
                                {
                                    reference: 'ctlToDtNonJpvc',
                                    xtype: 'datefield',
                                    anchor: '100%',
                                    format: MOST.config.Locale.getShortDate(),
                                    listeners: {
                                        select: 'onDateChangeNonJpvc'
                                    },
                                    editable: true
                                }
                            ]
                        }
                    ]
                },
            	{
                    xtype: 'tsb-datagrid',
                    reference: me.LIST_OF_FW_NON_JPVC_GRID_REF_NAME,
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
                        store: '{' + me.LIST_OF_FW_NON_JPVC_STORE_NAME + '}'
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
                        items: GridUtil.getGridColumns('FreshWaterListNonJpvc')
                    }
                }
            ],
        });

        me.callParent();
    }
});