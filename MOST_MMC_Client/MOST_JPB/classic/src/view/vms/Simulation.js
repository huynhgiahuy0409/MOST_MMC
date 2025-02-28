Ext.define('MOST.view.vms.Simulation', {
	/**
     * @memberOf TSB
     */
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-simulation',
	requires: [
	           'Ext.grid.plugin.RowEditing',
	           'Ext.grid.selection.SpreadsheetModel',
	           'TSB.ux.form.field.DateTimePicker',
	           'TSB.ux.form.field.DateTimeField'
	           ],
	
	controller: 'vesselmapcontroller',
	
	viewModel: {
		type: 'vesselmonitoring'
	},
	           
	constructor: function (config) {
        this.callParent(arguments);
        this.initConfig(config);	// 170725 HS ADD
    },	
    
    layout: {
    	type: 'vbox',
    	align: 'stretch'
    },
    
    lblPortName: {type: 'bundle', key:'portname'},
    lblDistance: {type: 'bundle', key:'distance'},
    lblWeather: {type: 'bundle', key:'weather'},
    lblSpeed: {type: 'bundle', key:'speed'},
    lblAnchorDate: {type: 'bundle', key:'anchordate'},
    lblArrival: {type: 'bundle', key:'arrival'},
    lblDeparture: {type: 'bundle', key:'departure'},
    lblVesselSchedule: {type: 'bundle', key:'vesselschedule'},
    btnAdd: {type: 'bundle', key: 'add'},
    btnRefresh: {type: 'bundle', key: 'refresh'},
	
	initComponent: function () {
		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId: 'simulationEditor',
			autoCancel: false,
			listeners: {
				cancelEdit: function(rowEditing, context) {
					if (context.record.phantom) {
						context.store.remove(context.record);
					}
				},
				edit:function(editor, context){
					context.store.commitChanges();
				}
			}
		});
		
		Ext.apply(me, {
			dockedItems:[{
				xtype: 'toolbar',
				items: [{
					xtype: 'button',
					text: me.btnAdd,
					ui: 'create-button',
					listeners: {
						click: 'onSimulationAdd'
					}
				},'->',{
					xtype: 'datetimefield',
					reference: 'refSimulationDepartureDate',
		            fieldLabel: '출발시각',
		            name: 'departureDate',
		            allowBlank: false,
		            value: new Date(),
		            format: 'Y-m-d G'
				}, {
					xtype: 'button',
					text: '시뮬레이션',
					listeners: {
						click: 'onSimulationRun'
					}
				},{
					xtype: 'button',
					text: '초기화',
					ui: 'retrieve-button',
					iconCls: 'x-fa fa-refresh',
					listeners: {
						click: 'onSimulationReset'
					}
				}]
			}],
			
			items: [{
				xtype: 'grid',
				sortableColumns : false,
				reference: 'refSimulationGrid',
				height: 250,
				padding: '0 0 0 0',
				margin: '0 0 0 0',
				plugins: [rowEditing],
				style : {
					borderColor: 'lightGray',
					borderStyle: 'solid',
					borderWeight: '1px'
				},
				bind :
				{
					store : '{simulationConditionStore}'
				},
				listeners: {
					cellDblClick : 'onSimulationDblClick'
				},
				selModel :
				{
					type:'spreadsheet',
					cellSelect: false
				},
				columns: {
					defaults : 
					{
						style : 'text-align:center'
					},
					items: [{
						header: me.lblPortName,
						reference: 'refSimulationPortName',
						dataIndex: 'portName',
						align: 'left',
						width: 200,
						height: 30,
						editor: {
							xtype: 'combo',
							reference:'refSimulationPortNameCombo',
							bind: 
							{
								store: '{netpasPortStore}'
							},
							queryMode: 'local',
							emptyText: 'select',
							displayField: 'portName',
							valueField: 'portName',
							allowBlank : false,
							forceSelection: true,		
							allowBlank: false, 
							typeAhead: true,
							listeners: {
								select: 'onNetpasPortCodeSelect'
							}
						}
					},{
						reference: 'refSimulationPortCode',
						dataIndex: 'portCode',
						align: 'center',
						hidden: true
					},{
						header: me.lblDistance,
						reference: 'refSimulationDistance',
						dataIndex: 'distance',
						width: 95,
						align: 'right'
					},{
						header: me.lblWeather,
						reference: 'refSimulationWeather',
						dataIndex: 'weather',
						width: 80,
						align: 'right',
						editor: {
							xtype: 'textfield',
							reference:'refSimulationWeatherField'
						}
					},{
						header: me.lblSpeed,
						reference: 'refSimulationSpeed',
						dataIndex: 'speed',
						width: 80,
						align: 'right',
						editor: {
							xtype: 'textfield',
							reference:'refSimulationSpeedField'
						}
					},{
						header: me.lblAnchorDate,
						reference: 'refSimulationAnchorDate',
						dataIndex: 'portDays',
						width: 90,
						align: 'right',
						editor: {
							xtype: 'textfield',
							reference:'refSimulationAnchorDateField'
						}
					},{
						header: me.lblVesselSchedule,
						reference: 'refSimulationVesselSchedule',
						align: 'center',
						columns: [{
							header: me.lblArrival,
							reference: 'refSimulationArrival',
							dataIndex: 'arrivalDate',
							width: 195,
							align: 'center'
						},{
							header: me.lblDeparture,
							reference: 'refSimulationDeparture',
							dataIndex: 'departureDate',
							width: 195,
							align: 'center'
						}]
					}]
				}
				
			},{
				xtype: 'panel',
				layout: {
					type: 'hbox',
					align: 'stretch'
				},
				height: 50,
				items: [{
					xtype: 'panel',
					flex: 3,
					layout: {
						type: 'hbox',
						align: 'stretch',
						pack: 'center'
					},
// 					margin: '0 0 0 0',
					
					dockedItems: [{
						xtype: 'toolbar',
						layout: {
							type: 'hbox',
							pack: 'center'
						},
						items:[{
							xtype: 'label',
							text: '거 리 :',
							labelWidth: 120,
							cls:'bold'
						}, {
							xtype: 'displayfield',
							region: 'center',
							margin: '5 0 0 0',
							width : 200, 
// 							style: {
// 								background:'#e8e8e8',
// 							},
							reference: 'refSimulationTotalDistance',
							value: ''
						},'-',{
							xtype: 'label',
							text: '총 소요시간(시차적용) : ',
							labelWidth: 130,
							cls:'bold'
						}, {
							xtype: 'displayfield',
							width : 100, 
							reference: 'refSimulationTotalTime',
							value: ''
						},'-',{
							xtype: 'label',
							text: '총 소요일(시차적용) : ',
							labelWidth: 130,
							cls:'bold'
						}, {
							xtype: 'displayfield',
							reference: 'refSimulationTotalDay',
					        width : 100, 
					        value: ''
						}]
				        
					}]
				}]
			},
			{
            	xtype: 'panel',
		    	reference: 'refMap',
		    	flex: 1,
		    	layout: 'fit',
		    	items: [{
		    		xtype: 'container',
		    		reference: 'refSimulationMapContainer'
		    	}],
		    	listeners: {
		    	    // The resize handle is necessary to set the map!
		    	    resize: 'onMapResize',
		    	}
		    }]
		});
		me.callParent(arguments);
	},
	
	afterRender : function(){
		var me = this;
		me.getController().simulationDefaultRowAdd();
		me.getController().loadMap(null, null, 
				me.lookupReference('refSimulationMapContainer'),
				null,
				null,
				'SIM');
		me.callParent(arguments);
	}
});
