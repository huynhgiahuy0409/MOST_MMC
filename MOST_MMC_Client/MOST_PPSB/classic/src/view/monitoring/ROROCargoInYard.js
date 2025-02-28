Ext.define('MOST.view.monitoring.ROROCargoInYard', {
    extend: 'Ext.form.Panel',
    alias: 'widget.app-rorocargoinyard',

    requires: [
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
		'MOST.view.monitoring.ROROCargoInYardController',
		'MOST.view.monitoring.ROROCargoInYardModel'
		
    ],

	controller: 'roroCargoInYard',
	
	viewModel: {
		type: 'roroCargoInYard'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
    /**
     * =========================================================================================================================
     * CONSTANT START
     */
    MAIN_GRID_REF_NAME: 'refROROCargoInYardGrid',
    MAIN_STORE_NAME: 'ROROCargoInYardList',	
    /**
    * CONSTANT END
    * =========================================================================================================================
    */
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
	initComponent: function() {
		var me = this;
		Ext.apply(this, {
			xtype:'container',
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
            items: [
            {
                xtype: 'container',
                flex: 1.4,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'tsb-datagrid',
                        reference: me.MAIN_GRID_REF_NAME,
                        flex : 1,
                        margin : '0 5 5 0',
                        stateful : true,
                        stateId : '',
                        viewConfig: {
                            stripeRows: true,
                            enableTextSelection: true,
                        },
                        plugins: [
                            'gridfilters',
                            'clipboard'
                        ],
                        bind: {
                            store:  '{' + me.MAIN_STORE_NAME + '}'
                        },
                        selModel: {
                            type: 'spreadsheet',
                            cellSelect: false
                        },
                        listeners: {
                            pagingSearch:'onSearch'
                        },
                        columns: {
                            defaults: {
                                style : 'text-align:center',
                                align : 'center'
                            },
                            items:GridUtil.getGridColumns('ROROCargoInYard')
                        }
                    }
                ]
            }
            ],
            dockedItems:[{//Toolbar buttons:
                xtype : 'container',
                style: { "background-color":"white" },
                layout: {
                    type: 'hbox',
                },
                defaults: {
                    margin: '1 1 1 1'
                },
                items: [{
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    reference:'refBtnRetrieve',
                    text: ViewUtil.getLabel('search'),
                    iconCls: 'x-fa fa-search', 
                    cls: 'search-button', 
                    listeners: {
                        click: 'onSearch'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'btnAdd',
                    reference:'refBtnCreate',
                    text: ViewUtil.getLabel('add'),
                    iconCls: 'x-fa fa-plus',
                    listeners: {
                        click: 'onAdd'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'btnDelete',
                    reference:'refBtnDelete',
                    text: ViewUtil.getLabel('remove'),
                    ui: 'delete-button',
                    iconCls: 'x-fa fa-minus',
                    listeners: {
                        click: 'onRemove'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'exportToExcelButton',
                    text: ViewUtil.getLabel('exportToExcel'),
                    iconCls: 'excel-button-image', 
                    cls: 'excel-button'
                },
                {
                    xtype: 'button',
                    itemId: 'exportToPdfButton',
                    text: ViewUtil.getLabel('exportToPdf'),
                    iconCls: 'x-fa fa-file-pdf-o',
                    cls: 'excel-button'
                },
                {
                    xtype: 'button',
                    cls: 'column-setting-button',
                    iconCls: 'x-fa fa-columns',
                    text: ViewUtil.getLabel('column'),
                    listeners: {
                        click: 'onColumnSettingPopup',
                        args: [me.MAIN_GRID_REF_NAME]
                    }
                
                }]
            },
            {// Toolbar SearchCondition and VesselInfo:
                xtype: 'toolbar',
                enableOverflow: true,
                padding : '0 0 0 0',
                margin: '0 0 0 0',
                defaults: {
                    labelAlign: 'right',
                },
                items:[{
                    xtype: 'fieldset',
                    autoScroll: true,
                    collapsible:true,
                    margin: '5 5 5 5',
                    flex:1,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults:{
                        margin: '0 0 0 0'
                    },
                    items:[{// Left: Search Condition
                        xtype: 'searchfieldset',
                        title: ViewUtil.getLabel('search'),
                        defaults: {
                            labelAlign: 'right',
                            labelWidth: 60,
                            margin: '2 5 0 0'
                        },
                        layout: {
                            type: 'vbox',
                        },
                        items: [
                            {
                                xtype: 'vesselcalllistfield',
                                reference:'ctlVslCallId',
                                fieldLabel: ViewUtil.getLabel('vessel'),
                                emptyText: ViewUtil.getLabel('vessel'),
                                allowBlank: false,
                                bind: {
                                    value: '{theSearch.vslCallId}'
                                },
                            },
                            {
                                xtype: 'combobox',
                                reference:'ctlBlNo',
                                fieldLabel: ViewUtil.getLabel('blno'),
                                emptyText: "Select",
                                bind: {
                                    store: '{BLCombo}',
                                    value: '{theSearch.blNo}'
                                },
                                listeners:{
                                    select : 'onSelectBLSNNo',
                                    change:'onSearch'
                                },
                                displayField: 'scdNm',
	           					valueField: 'blNo',
	           					queryMode: 'local',
	           					value : ''
                            },
                            {
                                xtype: 'combobox',
                                reference:'ctlSnNo',
                                fieldLabel: ViewUtil.getLabel('LASNNo'),
                                emptyText: "select",
                                bind: {
                                    store: '{SNCombo}',
                                    value: '{theSearch.shipgNoteNo}'
                                },
                                displayField: 'scdNm',
                                valueField: 'shipgNoteNo',
                                queryMode: 'local',
                                value : ''
                            }
                            
                        ]
                    },
                    {//Right: VesselInfo:
                        xtype: 'fieldset',
                        title: ViewUtil.getLabel('vslInfo'),
                        margin: '0 5 0 5',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        flex: 1,
                        items:[
                            {
                                xtype: 'container',
                                defaults: {
                                    labelAlign: 'right',
                                    margin: '4 0 0 0',
                                    labelWidth: 90
                                },
                                flex:1,
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        bind: '{theVslInfo.vslCd}',
                                        fieldLabel: ViewUtil.getLabel('vesselCode'),
                                        readOnly : true
                                    },
                                    {
                                        xtype: 'textfield',
                                        bind: '{theVslInfo.vslNm}',
                                        fieldLabel: ViewUtil.getLabel('vesselName'),
                                        readOnly : true
                                    },
                                    {
                                        xtype: 'textfield',
                                        bind: '{theVslInfo.voyage}',
                                        fieldLabel: ViewUtil.getLabel('voyage'),
                                        readOnly : true
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                defaults: {
                                    labelAlign: 'right',
                                    margin: '4 0 0 0',
                                    labelWidth: 90
                                },
                                flex:1,
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        bind: '{theVslInfo.arrvSaId}',
                                        fieldLabel: ViewUtil.getLabel('SNLASA'),
                                        readOnly : true
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: ViewUtil.getLabel('eta'),
                                        bind: '{theVslInfo.eta}',
                                        format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                        readOnly : true,
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: ViewUtil.getLabel('etd'),
                                        bind: '{theVslInfo.etd}',
                                        format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                        readOnly : true,
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                defaults: {
                                    labelAlign: 'right',
                                    labelWidth: 90,
                                    margin: '4 0 0 0',
                                },
                                flex:1,
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: ViewUtil.getLabel('berthingLoc'),
                                        bind: '{theVslInfo.berthLoc}',
                                        readOnly : true
                                    }
                                ]
                            }                            	
                        ]
                    }]
                }]
            }]
            
		});
		
		me.callParent();
	}
});