Ext.define('MOST.view.operation.ConfirmLoadingOfRORORehandling', {
    extend: 'Ext.form.Panel',
    alias: 'widget.app-rehandlingloadingofroro',

    requires: [
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
		'MOST.view.operation.ConfirmLoadingOfRORORehandlingController',
		'MOST.view.operation.ConfirmLoadingOfRORORehandlingModel'
    ],

	controller: 'rehandlingloadingofroro',
	
	viewModel: {
		type: 'rehandlingloadingofroro'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
    /**
     * =========================================================================================================================
     * CONSTANT START
     */
	MAIN_GRID_REF_NAME: 'refCargoGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'cargoItems',            // Main Store Name
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
            autoScroll: true,
            items: [
            {
                xtype: 'container',
                height : 150,
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
//                        viewConfig: {
//                            stripeRows: true,
//                            enableTextSelection: true,
//                        },
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
                            cellClick: 'onCargoGridItemClick',
                            pagingSearch: 'onSearch'
                        },
                        columns: {
                            defaults: {
                                style : 'text-align:center',
                                align : 'center'
                            },
                            items:GridUtil.getGridColumns('LoadingOfRORORehandlingCargoItems')
                        }
                    }
                ]
            },
            {
                xtype: 'container',
                flex : 1,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'fieldset',
                        title: ViewUtil.getLabel('unitList'),
                        margin: '0 5 0 0',
                        flex: 1,
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                        	{
								xtype: 'tsb-datagrid',
								reference: 'refUnitGrid',
								flex: 1,
								usePagingToolbar : false,
								plugins: [
									'gridexporter',
									'gridfilters',
									'clipboard'
								],
								bind: {
									store: '{unitItems}'
								},
								selModel: {
									type: 'spreadsheet',
									cellSelect: false
								},
								listeners : {
									cellclick: 'onUnitGrid_ItemClick',
								},
								columns: {
									defaults: {
					            		style : 'text-align:center',
					            		align: 'center'
					            	},
					            	items: GridUtil.getGridColumns('LoadingOfRORORehandlingUnitItems')
								}
							}
                        ]
                        
                    },
                    {
						xtype: 'container',
						width: 500,
				    	layout: {
				    		type: 'vbox',
				            align: 'stretch'
			    		},
				    	items: [
				    		{
						    	xtype: 'fieldset',
						    	reference: 'ctlYardChecker',
						    	flex: 1,
						    	autoScroll: true,
						    	title: ViewUtil.getLabel('yardChecker'),
					    		layout: {
					    			type: 'vbox',
					    			//align: 'stretch'
					    		},
					    		defaults:{
					    			width: 300,
					    			labelAlign: 'right',
			                        labelWidth: 120,
			                        margin: '0 0 5 5'
					    		},
					    		items: [
					    			 {
                                         xtype: 'textfield',
                                         reference: 'ctlCudUnitNo',
                                         bind: '{theDetail.unitNo}',
                                         fieldLabel: ViewUtil.getLabel('unitNo'),
                                         editable: false
                                     },
                                     {
                                         xtype: 'textfield',
                                         reference: 'ctlCudYardLoc',
                                         bind: '{theDetail.yardLoc}',
                                         fieldLabel: ViewUtil.getLabel('yardPosition'),
                                         editable: false
                                     },
                                     {
                                         xtype: 'datetimefield',
                                         reference: 'ctlOutDtm',
                                         fieldLabel: ViewUtil.getLabel('yardCheckTime'),
                                         format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                         //bind: '{theDetail.outDate}',
                                         listeners: {
                                             //change: 'onDateChange'
                                         },
                                         editable: false
                                     },
                                     {
                                         xtype: 'textfield',
                                         reference: 'ctlStevedoreId',
                                         bind: '{theDetail.stevedoreId}',
                                         fieldLabel: ViewUtil.getLabel('stevedoreId'),
                                         editable: false
                                     },
                                     {
                                         xtype: 'textfield',
                                         reference: 'ctlOutRemark',
                                         bind: '{theDetail.ycRemarks}',
                                         fieldLabel: ViewUtil.getLabel('remark'),
                                         editable: false
                                     },
                                     {
			                            xtype: 'button',
			                            //flex: 1,
			                            reference: 'btnYardCheck',
			                            text: ViewUtil.getLabel('yardCheck'),
			                            disabled: true,
			                            listeners: {
											click:'onYardCheck_clickHandler'
										}
			                        }
					    		]
				    		},
				    		{
						    	xtype: 'fieldset',
						    	flex: 1,
						    	autoScroll: true,
						    	title: ViewUtil.getLabel('apronChecker'),
					    		layout: {
					    			type: 'vbox',
					    			//align: 'stretch'
					    		},
					    		defaults:{
					    			width: 300,
					    			labelAlign: 'right',
			                        labelWidth: 120,
			                        margin: '0 0 5 5'
					    		},
					    		items: [
					    			 {
                                         xtype: 'datetimefield',
                                         reference: 'ctlLoadingDtm',
                                         fieldLabel: ViewUtil.getLabel('loadingCheckTime'),
                                         format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                         //bind: '{theDetail.loadingTime}',
                                         listeners: {
                                             //change: 'onDateChange'
                                         },
										 editable: false
                                     },
                                    
                                     {
                                         xtype: 'checkboxfield',
                                         boxLabel: ViewUtil.getLabel('mhc'),
                                         value: 'false',
                                         reference: 'ctlMhc',
                                         bind:{
                                             value: '{theDetail.crane}',
                                         },
                                         disabled: true
                                     },
                                     {
                                         xtype: 'textfield',
                                         reference: 'ctlLdRemarks',
                                         bind: '{theDetail.ldRemarks}',
                                         fieldLabel: ViewUtil.getLabel('remark'),
                                         editable: false
                                     },
                                     {
			                            xtype: 'button',
			                            reference: 'btnLoadingCheck',
			                            text: ViewUtil.getLabel('loadingCheck'),
			                            disabled: true,
			                            listeners: {
											click:'onLoadingCheck_clickHandler'
										}
			                        }
					    		]
				    		}
				    	]
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
					reference: 'refBtnClear',
					text: ViewUtil.getLabel('clear'),
					iconCls: 'fa fa-file-o',
					listeners: {
						click: 'onClear_clickHandler'
					}					
				},
				{
                    xtype: 'button',
                    reference:'refBtnDelete',
                    text: ViewUtil.getLabel('remove'),
                    ui: 'delete-button',
                    iconCls: 'x-fa fa-minus',
                    listeners: {
                        click: 'onRemove_clickHandler'
                    }
                },
                
//                {
//                    xtype: 'button',
//                    itemId: 'btnAdd',
//                    text: ViewUtil.getLabel('add'),
//                    iconCls: 'x-fa fa-plus',
//                    listeners: {
//                        click: 'onAdd'
//                    }
//                },
//                {
//                    xtype: 'button',
//                    itemId: 'btnDelete',
//                    text: ViewUtil.getLabel('remove'),
//                    ui: 'delete-button',
//                    iconCls: 'x-fa fa-minus',
//                    listeners: {
//                        click: 'onRemove'
//                    }
//                },
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
                                bind : {
									value : '{theSearch.vslCallId}'
								}
                            },
                            {
                                xtype: 'combobox',
                                reference:'ctlSearchSnno',
                                fieldLabel: ViewUtil.getLabel('SNLSNNo'),
                                emptyText: "select",
                                bind: {
                                    store: '{snCombo}',
									value: '{theSearch.shipgNoteNo}'
                                },
                                listeners:{
                                },
                                displayField: 'cdNm',
                                valueField: 'cd',
                                queryMode: 'local',
                                forceSelection : true,
                                editable : false
                            },
                            {
                                xtype: 'combobox',
                                reference:'ctlSearchCgTp',
                                fieldLabel: ViewUtil.getLabel('cargoTp'),
                                emptyText: "",
                                bind: {
                                    store: '{cargoTypeCombo}',
                                    value: '{theSearch.cgTpCd}'
                                },
                                listeners:{
                                },
                                displayField: 'scdNm',
	           					valueField: 'scd',
	           					queryMode: 'local',
	           					value : '',
                                editable : false,
                                hidden: true
                            },
                            {
                                xtype: 'textfield',
                                bind: '{theSearch.unitNo}',
                                fieldLabel: ViewUtil.getLabel('unitNo')
                            }
                        ]
                    },
                    {//Right: VesselInfo:
						xtype: 'searchfieldset',
						title: ViewUtil.getLabel('vslInfo'),
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						flex: 1,
						margin: '0 0 5 5',
						items: [
						{
							xtype : 'container',
							defaults : {
								margin : '5 5 0 0',
								labelAlign : 'right',
								width : 230,
								labelWidth : 80
							},
							layout : {
								type : 'vbox'
							},
							items : [
							{
								xtype : 'textfield',
								margin : '0 5 0 0',
								fieldLabel : ViewUtil.getLabel('vesselCode'),
								bind : '{theVslInfo.vslCd}',
								readOnly : true
							},
							{
								xtype : 'textfield',
								fieldLabel : ViewUtil.getLabel('vesselType'),
								bind : '{theVslInfo.vslTp}',
								readOnly : true
							},
							{
								xtype : 'textfield',
								fieldLabel : ViewUtil.getLabel('voyage'),
								bind : '{theVslInfo.voyage}',
								readOnly : true
							},
							{
								xtype : 'textfield',
								fieldLabel : ViewUtil.getLabel('SNLDSA'),
								bind : '{theVslInfo.depSaId}',
								readOnly : true
							}]
						},
						{
							xtype : 'container',
							defaults : {
								margin : '0 5 5 0',
								labelAlign : 'right',
								width : 180,
								labelWidth : 40
							},
							layout : {
								type : 'vbox'
							},
							items : [
							{
								xtype : 'textfield',
								fieldLabel : ViewUtil.getLabel('SNLASA'),
								bind : '{theVslInfo.arrvSaId}',
								readOnly : true
							},
							{
								xtype : 'datefield',
								fieldLabel : ViewUtil.getLabel('SNLETA'),
								bind : '{theVslInfo.eta}',
								readOnly : true,
								format : MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
							},
							{
								xtype : 'datefield',
								fieldLabel : ViewUtil.getLabel('etd'),
								bind : '{theVslInfo.etd}',
								readOnly : true,
								format : MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
							}]
						},
						{
							xtype : 'container',
							defaults : {
								margin : '0 5 5 0',
								labelAlign : 'right',
								width : 230,
								labelWidth : 100
							},
							layout : {
								type : 'vbox'
							},
							items : [
							{
								xtype : 'textfield',
								fieldLabel : ViewUtil.getLabel('berthingLoc'),
								bind : '{theVslInfo.berthLoc}',
								readOnly : true
							},
							{
								xtype : 'textfield',
								fieldLabel : ViewUtil.getLabel('storageLoc'),
								readOnly : true
							}]
						}]
					}]
                }]
            }]
            
		});
		
		me.callParent();
	}
});