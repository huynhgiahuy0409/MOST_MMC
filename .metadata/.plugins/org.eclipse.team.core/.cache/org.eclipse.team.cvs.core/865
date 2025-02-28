Ext.define('MOST.view.popup.ServiceOrderSettingPopup', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.popup-serviceordersetting',

    requires: [
        'MOST.view.popup.ServiceOrderSettingPopupModel',
        'MOST.view.popup.ServiceOrderSettingPopupController',
        'Ext.grid.plugin.Exporter',
        'Ext.grid.plugin.Clipboard',
        'Ext.grid.filters.Filters',
        'Ext.grid.selection.SpreadsheetModel'
    ],

    title:"Select Service Order Setting",

    controller: 'serviceordersettingpopup',

    viewModel: {
        type: 'serviceordersettingpopup'
    },

    listeners:{
        afterrender: 'onLoad'
    },
    
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refServiceOrderSettingPopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'serviceOrderSettingPopupListStore',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

    lblCat1: {type:'bundle', key:'soc_cat1'},
    lblCat2: {type:'bundle', key:'soc_cat2'},
    lblCat3: {type:'bundle', key:'soc_cat3'},

    btnRetrieve: {type: 'bundle', key: 'retrieve'},

    layout : 'fit',

    width: 800,
    height: 400,

    initComponent: function() {

        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'tsb-datagrid',
                reference: me.MAIN_GRID_REF_NAME,
                usePagingToolbar : false,
                flex: 1,
                plugins: [
                    'gridexporter',
                    'gridfilters',
                    'clipboard'
                ],
                bind: {
                    store: '{' + me.MAIN_STORE_NAME + '}'
                },
                selModel: {
                    type: 'spreadsheet',
                    cellSelect: false
                },
                listeners: {
                    itemdblclick: 'onGridItemDoubleClick'
                },
                columns: {
                    defaults: {
                        style: 'text-align:center',
                        align: 'center'
                    },
                    items: GridUtil.getGridColumns('ServiceOrderSetting')
                }
            }],
            dockedItems: [{
                xtype: 'container',
                layout: 'fit',
                margin: '1 1 1 1',
                items: [{
                    xtype: 'fieldset',
                    margin: '5 5 5 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'left'
                    },
                    defaults: {
                        labelAlign: 'right'
                    },
                    items: [{
                        xtype: 'combo',
                        reference: 'refCategory1FilterCombo',
                        fieldLabel: ViewUtil.getLabel('soc_cat1'),
                        width: 220,
                        labelWidth: 80,
                        queryMode: 'local',
                        bind: {
                            store: '{category1PopupFilterComboStore}'
                        },
                        displayField: 'scdNm',
                        valueField: 'scd',
                        listeners: {
                            change: 'onCategoryChange'
                        }
                    }, {
                        xtype: 'combo',
                        reference: 'refCategory2FilterCombo',
                        fieldLabel: ViewUtil.getLabel('soc_cat2'),
                        width: 220,
                        labelWidth: 80,
                        queryMode: 'local',
                        bind: {
                            store: '{category2PopupFilterComboStore}'
                        },
                        displayField: 'scdNm',
                        valueField: 'scd',
                        listeners: {
                            change: 'onCategoryChange'
                        }
                    }, {
                        xtype: 'combo',
                        reference: 'refCategory3FilterCombo',
                        fieldLabel: ViewUtil.getLabel('soc_cat3'),
                        width: 220,
                        labelWidth: 80,
                        queryMode: 'local',
                        bind: {
                            store: '{category3PopupFilterComboStore}'
                        },
                        displayField: 'scdNm',
                        valueField: 'scd'
                    },{
                        xtype: 'button',
                        text: ViewUtil.getLabel('retrieve'),
                        margin: '0 0 0 20',
                        iconCls: 'x-fa fa-search',
                        cls: 'search-button',
                        reference: 'refBtnRetrieve',
                        listeners: {
                            click: 'onRetrieve'
                        }
                    }]
                }]
            }]
        });

        me.callParent();
    }
});


