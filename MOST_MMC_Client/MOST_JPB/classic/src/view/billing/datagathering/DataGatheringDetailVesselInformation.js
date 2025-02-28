Ext.define('MOST.view.datagathering.DataGatheringDetailVesselInformation', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-datagatheringdetailvesselinformation',
	
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
		'Ext.form.FieldSet',
	    'Ext.form.field.Text',
	    'Ext.form.Label'
	],
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [
				{
		            xtype: 'fieldset',
		            defaults: {
		                margin: '3 5 0 5',
		                labelAlign: 'right',
		                labelWidth: 100
		            },
		            title: ViewUtil.getLabel('dataGatheringDetailVesselInformationVesselParticular'),
		            layout: {
		                type: 'vbox'
		            },
		            items: [
		                {
		                    xtype: 'container',
		                    flex: 1,
		                    layout: {
		                        type: 'hbox'
		                    },
		                    defaults: {
		                        margin: '3 0 0 5',
		                        labelAlign: 'right',
		                        labelWidth: 100
		                    },
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            width: 250,
		                            labelWidth: 150,
		                            fieldLabel: ViewUtil.getLabel('dataGatheringDetailVesselInformationVesselIdName'),
		                            bind:'{theVesselInfo.vesselID}',
		    		                editable:false
		                        },{
		                            xtype: 'textfield',
		                            bind:'{theVesselInfo.vesselName}',
		    		                editable:false,
		    		                width : 350
		                        },
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('dataGatheringDetailVesselInformationloa'),
		                            bind:'{theVesselInfo.loa}',
		    		                editable:false
		                        },
		                        {
		                            xtype: 'label',
		                            width: 20,
		                            text: 'm'
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
		                        margin: '0 0 0 5',
		                        labelAlign: 'right',
		                        labelWidth: 100
		                    },
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            width: 250,
		                            labelWidth: 150,
		                            fieldLabel: ViewUtil.getLabel('dataGatheringDetailVesselInformationSACodeName'),
		                            bind:'{theVesselInfo.saCode}',
		    		                editable:false
		                        },
		                        {
		                            xtype: 'textfield',
		                            margin: '0 0 0 5',
		                            width: 350,
		                            bind:'{theVesselInfo.saName}',
		    		                editable:false
		                        },
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('dataGatheringDetailVesselInformationdwt'),
		                            labelWidth: 100,
		                            bind:'{theVesselInfo.dwt}',
		    		                editable:false
		                        },
		                        {
		                            xtype: 'label',
		                            margin: '5 0 0 5',
		                            width: 20,
		                            text: 'MT'
		                        },
		                        {
		                            xtype: 'textfield',
		                            width: 150,
		                            fieldLabel: ViewUtil.getLabel('dataGatheringDetailVesselInformationgrt'),
		                            labelWidth: 50,
		                            bind:'{theVesselInfo.grt}',
		    		                editable:false
		                        },
		                        {
		                            xtype: 'label',
		                            margin: '5 0 0 5',
		                            width: 20,
		                            text: 'MT'
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
		                        margin: '0 0 0 5',
		                        labelAlign: 'right',
		                        labelWidth: 100
		                    },
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            width: 250,
		                            labelWidth: 150,
		                            fieldLabel: ViewUtil.getLabel('dataGatheringDetailVesselInformationDSACodeName'),
		                            bind:'{theVesselInfo.dpSaCd}',
		    		                editable:false
		                        },
		                        {
		                            xtype: 'textfield',
		                            margin: '0 0 0 5',
		                            width: 350,
		                            bind:'{theVesselInfo.dpSaName}',
		    		                editable:false
		                        },
		                        {
		                            xtype: 'textfield',
		                            //width: 200,
		                            fieldLabel: ViewUtil.getLabel('dataGatheringDetailVesselInformationPurposeOfCall'),
		                            labelWidth: 100,
		                            bind:'{theVesselInfo.purpCall}',
		    		                editable:false
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    flex: 1,
		                    layout: {
		                        type: 'hbox'
		                    },
		                    defaults: {
		                        margin: '0 0 3 5',
		                        labelAlign: 'right',
		                        labelWidth: 100
		                    },
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            width: 300,
		                            labelWidth: 150,
		                            fieldLabel: ViewUtil.getLabel('dataGatheringDetailVesselInformationVesselType'),
		                            bind:'{theVesselInfo.vesselType}',
		    		                editable:false
		                        },
		                        {
		                            xtype: 'textfield',
		                            width: 250,
		                            fieldLabel: ViewUtil.getLabel('dataGatheringDetailVesselInformationvslServiceType'),
		                            labelWidth: 130,
		                            bind:'{theVesselInfo.vslServiceType}',
		    		                editable:false
		                        }
		                    ]
		                }
		            ]
		        },
		        {
		            xtype: 'fieldset',
		            defaults: {
		                margin: '0 5 3 5',
		                labelAlign: 'right',
		                labelWidth: 100
		            },
		            title: ViewUtil.getLabel('dataGatheringDetailVesselInformationVesselCalling'),
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            items: [
		                {
		                    xtype: 'container',
		                    defaults: {
		                        margin: '0 0 0 5',
		                        labelAlign: 'right',
		                        labelWidth: 100
		                    },
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('dataGatheringDetailVesselInformationno'),
		                            width : 200,
		                            bind:'{theVesselInfo.berthNo}',
		    		                editable:false
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    flex: 1,
		                    defaults: {
		                        margin: '0 0 0 5',
		                        labelAlign: 'right',
		                        labelWidth: 100
		                    },
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('dataGatheringDetailVesselInformationatb'),
		                            bind:'{theVesselInfo.atb}',
		    		                editable:false,
		    		                width : 280
		                        },
		                        {
		                            xtype: 'textfield',
		                            width : 200,
		                            fieldLabel: ViewUtil.getLabel('dataGatheringDetailVesselInformationBerthingHours'),
		                            bind:'{theVesselInfo.berthingHours}',
		    		                editable:false
		                            
		                        },
		                        {
		                            xtype: 'label',
		                            margin: '3 0 0 5',
		                            width: 20,
		                            text: 'hrs'
		                        },
		                        {
		                            xtype: 'textfield',
		                            width : 150,
		                            fieldLabel: ViewUtil.getLabel('dataGatheringDetailVesselInformationAcceptableDelay'),
		                            bind:'{theVesselInfo.normalAcceptDelay}',
		    		                editable:false
		                        },
		                        {
		                            xtype: 'label',
		                            margin: '3 0 0 5',
		                            width: 20,
		                            text: 'hrs'
		                        },
		                        {
		                            xtype: 'textfield',
		                            labelWidth:200,
		                            width : 250,
		                            fieldLabel: ViewUtil.getLabel('dataGatheringDetailVesselInformationArrivalTiemMonthScheduled'),
		                            bind:'{theVesselInfo.arrivalTimeInMonthAsScheduled}',
		    		                editable:false
		                            
		                        },
		                        {
		                            xtype: 'label',
		                            margin: '3 0 0 5',
		                            width: 50,
		                            text: 'Time(s)'
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    flex: 1,
		                    defaults: {
		                        margin: '0 0 0 5',
		                        labelAlign: 'right',
		                        labelWidth: 100
		                    },
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('dataGatheringDetailVesselInformationatw'),
		                            bind:'{theVesselInfo.atw}',
		    		                editable:false,
		    		                width : 280
		                        },
		                        {
		                            xtype: 'textfield',
		                            width : 200,
		                            fieldLabel: ViewUtil.getLabel('dataGatheringDetailVesselInformation1stDouble'),
		                            bind:'{theVesselInfo.oneStDouble}',
		    		                editable:false
		                        },
		                        {
		                            xtype: 'label',
		                            margin: '3 0 0 5',
		                            width: 20,
		                            text: 'hrs'
		                        },
		                        {
		                            xtype: 'textfield',
		                            width : 150,
		                            fieldLabel: ViewUtil.getLabel('dataGatheringDetailVesselInformationAcceptableDelay'),
		                            bind:'{theVesselInfo.acceptableDelay}',
		    		                editable:false
		                        },
		                        {
		                            xtype: 'label',
		                            margin: '3 0 0 5',
		                            width: 20,
		                            text: 'hrs'
		                        },
		                        {
		                            xtype: 'textfield',
		                            labelWidth: 200,
		                            width : 250,
		                            fieldLabel: ViewUtil.getLabel('dataGatheringDetailVesselInformationArrivalTiemMonth'),
		                            bind:'{theVesselInfo.arrivalTimeInMonth}',
		    		                editable:false
		                        },
		                        {
		                            xtype: 'label',
		                            margin: '3 0 0 5',
		                            width: 50,
		                            text: 'Time(s)'
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    flex: 1,
		                    defaults: {
		                        margin: '0 0 0 5',
		                        labelAlign: 'right',
		                        labelWidth: 100
		                    },
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            width : 280,
		                            fieldLabel: ViewUtil.getLabel('dataGatheringDetailVesselInformationatc'),
		                            bind:'{theVesselInfo.atc}',
		    		                editable:false
		                        },
		                        {
		                            xtype: 'textfield',
		                            width : 200,
		                            fieldLabel: ViewUtil.getLabel('dataGatheringDetailVesselInformation2ndDouble'),
		                            bind:'{theVesselInfo.twoNdDouble}',
		    		                editable:false
		                        },
		                        {
		                            xtype: 'label',
		                            margin: '3 0 0 5',
		                            width: 20,
		                            text: 'hrs'
		                        },
		                        {
		                            xtype: 'textfield',
		                            width : 150,
		                            fieldLabel: ViewUtil.getLabel('dataGatheringDetailVesselInformationAcceptableDelay'),
		                            bind:'{theVesselInfo.secondAcceptDelay}',
		    		                editable:false
		                        },
		                        {
		                            xtype: 'label',
		                            margin: '3 0 0 5',
		                            width: 20,
		                            text: 'hrs'
		                        },
		                        {
		                            xtype: 'textfield',
		                            labelWidth: 200,
		                            width : 250,
		                            fieldLabel: ViewUtil.getLabel('dataGatheringDetailVesselInformationDoubleBanking'),
		                            bind:'{theVesselInfo.doubleBanking}',
		    		                editable:false
		                        },
		                        {
		                            xtype: 'label',
		                            margin: '3 0 0 5',
		                            width: 50,
		                            text: 'Time(s)'
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    flex: 1,
		                    defaults: {
		                        margin: '0 0 0 5',
		                        labelAlign: 'right',
		                        labelWidth: 100
		                    },
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            width : 280,
		                            fieldLabel: ViewUtil.getLabel('dataGatheringDetailVesselInformationatu'),
		                            bind:'{theVesselInfo.atu}',
		    		                editable:false
		                        },
		                        {
		                            xtype: 'textfield',
		                            width : 200,
		                            fieldLabel: ViewUtil.getLabel('dataGatheringDetailVesselInformation3rdDouble'),
		                            bind:'{theVesselInfo.threeRdDouble}',
		    		                editable:false
		                        },
		                        {
		                            xtype: 'label',
		                            margin: '3 0 0 5',
		                            width: 20,
		                            text: 'hrs'
		                        }
		                    ]
		                }
		            ]
		        }
		    ]
		});
		
		me.callParent();
	}
});

