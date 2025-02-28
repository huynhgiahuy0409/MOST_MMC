Ext.define('MOST.view.planning.VesselScheduleTankerSubmissionPopup', {
	extend: 'Ext.form.Panel',
	alias: 'widget.popup-vesselscheduletankersubmissionpopup',

	requires: [
		'MOST.view.popup.VesselScheduleTankerSubmissionPopupModel',
		'MOST.view.popup.VesselScheduleTankerSubmissionPopupController',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

    title: 'Tanker Submission',

	controller: 'vesselscheduletankersubmissionpopup',
	
	viewModel: {
		type: 'vesselscheduletankersubmissionpopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	 /**
	 * =========================================================================================================================
	 * CONSTANT START
	 */		// Main Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	width: 1024,
	height: 512,

	layout: {
		type: 'vbox', 
		align: 'stretch' 
	},	

	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
                {
                    xtype: 'form',
                    reference: 'refTankerSubmissionForm',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '5 5 5 5',
                            defaults: {
                                margin: '0 0 0 5',
                                labelAlign: 'right',
                                labelWidth: 110
                            },
                            items: [
                                {
                                    xtype: 'datetimefield',
                                    reference: 'ctlHoseOn',
                                    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                    fieldLabel: ViewUtil.getLabel('vslschlHoseOnTime'),
                                    bind: '{theTanker.hoseOnDt}',
                                    flex: 1,
                                    allowBlank: false
                                },
                                {
                                    xtype: 'datetimefield',
                                    reference: 'ctlCompletionTime',
                                    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                    fieldLabel: ViewUtil.getLabel('vslschlCompletionTime'),
                                    bind: '{theTanker.endDt}',
                                    flex: 1,
                                    allowBlank: false
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '5 5 5 5',
                            defaults: {
                                margin: '0 0 0 5',
                                labelAlign: 'right',
                                labelWidth: 110
                            },
                            items: [
                                {
                                    xtype: 'datetimefield',	
                                    reference: 'ctlCommenceTime',
                                    fieldLabel: ViewUtil.getLabel('vslschlCommenceTime'),
                                    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                    bind: '{theTanker.stDt}',
                                    flex: 1,
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'datetimefield',
                                    reference: 'ctlHoseOff',
                                    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                    fieldLabel: ViewUtil.getLabel('vslschlHoseOffTime'),
                                    allowBlank: false,
                                    bind: '{theTanker.hoseOffDt}',
                                    flex: 1
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '5 5 5 5',
                            defaults: {
                                margin: '0 0 0 5',
                                labelAlign: 'right',
                                labelWidth: 110
                            },
                            items: [
                                {
                                    xtype: 'partnercdfield',
                                    flex: 1,
                                    reference: 'ctlTmnlOpr',
                                    fieldLabel: ViewUtil.getLabel('terminalopr'),
                                    bind: {
                                        value: '{theTanker.tmnlOpr}'
                                    },
                                    allowBlank: false,
                                    params: {
                                        ptnrType: CodeConstants.CM_PTNRTP_CNS,
                                        initSearch: false
                                    }
                                },
                                {
                                    xtype: 'numberfield',
                                    flex: 1,
                                    fieldLabel: ViewUtil.getLabel('vslschlCargoVolume'),
                                    reference: 'ctlCargoVolume',
                                    minValue: 0,
                                    maxValue: 999999999999.999,
                                    align: 'right',
                                    selectOnFocus: true,
                                    allowBlank: false,
                                    bind: {
                                        value: '{theTanker.cgWgt}'
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '5 5 5 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'end'
                            },
                            defaults: {
                                margin: '0 0 0 5',
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    text: ViewUtil.getLabel('add'),
                                    cls: 'search-button',
                                    iconCls: 'x-fa fa-plus',
                                    listeners: {
                                        click: 'onAddTankerSubmission'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: ViewUtil.getLabel('update'),
                                    listeners: {
                                        click: 'onUpdateTankerSubmission'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: ViewUtil.getLabel('remove'),
                                    ui: 'delete-button',
                                    iconCls: 'x-fa fa-minus',
                                    listeners: {
                                        click: 'onRemoveTankerSubmission'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: ViewUtil.getLabel('save'),
                                    listeners: {
                                        click: 'onSaveTankerSubmission'
                                    }
                                },
                            ]
                        },
                    ]
                },
                {//Grid
                    xtype: 'tsb-datagrid',
                    margin: '0 5 0 0',
                    reference: 'refTankerSubmissionGrid',
                    flex: 1,
                    stateful : true,
                    stateId : 'stateTankerSubmissionGrid',
                    plugins: [
                        'gridexporter',
                        'gridfilters',
                        'clipboard'
                    ],
                    bind: {
                        store: '{tankerSubmission}'
                    },
                    selModel: {
                        type: 'spreadsheet',
                        cellSelect: false
                    },
                    listeners : {
                        celldblclick: 'onDblClick',
                        pagingSearch:'onSearch'
                    },
                    columns: {
                        defaults: {
                            style : 'text-align:center',
                            align: 'center'
                        },
                        items: GridUtil.getGridColumns('TankerSubmission')
                    }
			    }
            ],
			
		});
		me.callParent();
	}
});

