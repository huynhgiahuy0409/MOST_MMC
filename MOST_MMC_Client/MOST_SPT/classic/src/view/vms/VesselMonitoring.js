Ext.define('MOST.view.vms.VesselMonitoring', {
	/**
     * @memberOf TSB
     */
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-vesselmonitoring',
	requires: [
			   'MOST.view.vms.VesselProperty',
	           'MOST.view.vms.VesselMonitoringController',
	           'MOST.view.vms.VesselMonitoringModel'
//TO-MIG	           'MOST.model.port.Port'
	           ],
	
	controller: 'vesselmonitoring',
	
	viewModel: {
		type: 'vesselmonitoring'
	},
	
	config: {	
		cfgLon: '',
		cfgLat: '',
		cfgVesselCode : '',
		cfgCallSign : '',
		handlingType: 'MAP',			//OTHER (by click grid, handling by other function) / MAP (click Map)
		cfgIndividualScreen: true
	}, 	
	
	layout: {
    	type  : 'border'
	},
	
	// 170725 HS ADD
	lblPort: {type:'bundle', key: 'port'},
	lblPortName: {type:'bundle', key: 'portname'},
	lblVessel: {type:'bundle', key:'vessel'},
	lblVesselList: {type:'bundle', key:'vessellist'},
	lblPortList: {type:'bundle', key:'portlist'},
	
	// 170725 HS ADD
	//config > cfgIsChanged : getter / setter / update / apply
    updateCfgImoNo: function(newValue, oldValue) {
    	if (!!oldValue && this.getHandlingType() === "OTHER") {
    		this.getController().onChageVessel();
    	}
    },
	
	constructor: function (config) {
        this.callParent(arguments);
        this.initConfig(config);	// 170725 HS ADD
    },	
	
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			scrollable: false,
				items: [{
	        	   xtype : 'panel',
	        	   region : 'west',
	        	   width : 450,
	        	   split: true,
	        	   collapsible: true,
                   header: false,
                   reference: 'refWestPanel',
                   layout: {
                       type: 'accordion'
                   },
	        	   items :[
	        	     {  
	     		    	xtype: 'app-vessellist',			
	                    reference: 'refServiceVesselList',
	                    split: true,
	                    region: 'north',
	                    title: me.lblVesselList
	                 },{
	                	xtype : 'panel',
	                	title: me.lblPortList,
	                	reference: 'refPortListPanel',
	                	items: [{
	                		xtype: 'grid',
	                		scrollable: true,
	                		reference: 'refPortList',
		     				region: 'south',
		     				bind: {
		     					store: '{portListStore}'
		     				},
		     				layout: 'fit',
		     				columns: [
		     					new Ext.grid.RowNumberer({
		     						width: 30,
		     						header: '',
		     						align: 'center', sortable: false
		     				}),
		     				{
		     					header: me.lblPort,
		     					dataIndex: 'portCode',
		     					minWidth: 70, 
		     					width: 70,	align: 'center', 
//		     					sortable: false, 
		     					hideable: false 
//		     					renderer: function(value, metaData, record, rowIndex, colIndex, store) {
//		     						metaData.style =  'background: #' + record.data.bColor + ';' + 'color: #' + record.data.fColor + ';';	
//		     						return value;
//		     	            	}
		     				},{
		     					header: me.lblPortName,
		     					dataIndex: 'portName',
		     					minWidth: 200, 
		     					width: 200,	align: 'left', style: 'text-align:center', sortable: false, hideable: false
		     				}]
	                	}]
	                 }]
				},{
	            	xtype: 'panel',
			    	reference: 'refMap',
			    	flex: 1,
			    	region: 'center',
			    	layout: 'fit',
			    	items: [{
			    		xtype: 'container',
			    		reference: 'refMapContainer'
			    	}],
			    	listeners: {
			    	    // The resize handle is necessary to set the map!
			    	    resize: 'onMapResize'
			    	},
			    	dockedItems: [{
					    xtype: 'toolbar',
					    reference: 'refDock',
						dock: 'top',
						margin: '1 0 0 0',
						hidden: false,
						items: [{
	                    	xtype:'button',					
	                    	text: 'Base Map',
	                    	iconCls: 'x-fa fa-map',
	                    	arrowAlign:'right',
	                    	tooltip: 'Base Map',
	                    	reference: 'refBaseMap',
	                    	menu: [{ 
	                    		xtype: 'radiogroup',
	                    		vertical: true,
	                    		columns: 1,
	                    		width: 200,
	                    		defaults: {
	                    			handler: 'onBaseMapOptions'
	                    		},
	                    		items:[{
	                    			boxLabel: 'Open Street Map',
	                    			inputValue: 'OSM'
	                    		},/*{
	                    			boxLabel: 'Bing - Satellite',
	                    			inputValue: 'BING'
	                    		},{
	                    			boxLabel: 'Google - Satellite',
	                    			inputValue: 'GOOGLE'
	                    		},*/{
	                    			boxLabel: 'Esri - Street',
	                    			inputValue: 'ESRI_STREET'
	                    		},{
	                    			boxLabel: 'Esri - Oceans',
	                    			inputValue: 'ESRI_OCEANS',
	                				checked: true
	                    		},{
	                    			boxLabel: 'Esri - Imagery',
	                    			inputValue: 'ESRI_IMAGERY'
	                    		}/*,{
	                    			boxLabel: 'Mapbox - Pirates',
	                    			inputValue: 'MAPBOX_PIRATES'
	                    		},{
	                    			boxLabel: 'Mapbox - Light',
	                    			inputValue: 'MAPBOX_LIGHT'
	                    		}*/]
	                    	}]	
						},{
	                    	xtype:'button',	
	                    	enableToggle: true,
	                    	text: 'Sea Map',
	                    	iconCls: 'x-fa fa-map',
	                    	tooltip: 'Display Sea Map',
	                    	reference: 'refSeaMap',
	                    	value: 'seamap',
	                    	handler: 'onMapOptions',
	                    	pressed: false
	                    },{
	                    	xtype:'button',	
	                    	enableToggle: true,
	                    	text: 'Ships',
	                    	iconCls: 'x-fa fa-ship',
	                    	tooltip: 'Display Ship',
	                    	reference: 'refShip',
	                    	value: 'ship',
	                    	handler: 'onMapOptions',
	                    	pressed: true
	                    },{
	                    	xtype:'button',	
	                    	enableToggle: true,
	                    	text: 'Ports',
//	                    	iconCls: 'x-fa fa-anchor',
	                    	iconCls: 'ticon-port-marker',
	                    	tooltip: 'Display Port',
	                    	reference: 'refPort',
	                    	value: 'port',
	                    	handler: 'onMapOptions',
	                    	pressed: true
	                    }, {
	                    	xtype:'button',	
	                    	enableToggle: true,
	                    	text: 'Route',
	                    	iconCls: 'x-fa fa-expand',
	                    	tooltip: 'Display Route',
	                    	reference: 'refRouter',
	                    	value: 'router',
	                    	handler: 'onMapOptions',
	                    	hidden: true,
	                    	pressed: false
	                    }, {
	                    	xtype:'button',					
	                    	text: 'Area',
	                    	iconCls: 'x-fa fa-map-signs',
	                    	arrowAlign:'right',
	                    	tooltip: 'Display Area on the Map',
	                    	menu: [{ 
	                    		xtype: 'checkboxgroup',
	                    		reference: 'refAreaCheckGroup',
	                    		vertical: true,
	                    		columns: 1,
	                    		defaults: {
	                    			handler: 'onAreaOptions'
	                    		}
	                    	}, '-', {
	                    		iconCls: 'x-fa fa-cog',
	                    		text: 'Manage',
	                    		handler: 'onAreaManage'
	                    	}, {
	                    		iconCls: 'x-fa fa-trash',
	                    		text: 'Delete Checked Area',
	                    		handler: 'onAreaDelete'
	                    	}],
	                    	hidden: true
	                    },/*'-',*/{
	                    	xtype:'button',					
	                    	text: 'Simulation',
	                    	iconCls: 'x-fa fa-share-alt',
	                    	arrowAlign:'right',
	                    	tooltip: 'Display Simulation on the Map',
	                    	handler: 'onSimulation',
	                    	hidden: true
	                    },'-',{
	                    	xtype:'button',					
	                    	text: 'Weather',
	                    	iconCls: 'x-fa fa-cloud',
	                    	arrowAlign:'right',
	                    	tooltip: 'Display Open Weather Map',
	                    	reference: 'refOpenWeather',
	                    	menu: [{ 
	                    		xtype: 'checkboxgroup',
	                    		reference: 'refOwmCheckGroup',
	                    		vertical: true,
	                    		columns: 1,
	                    		width: 200,
	                    		defaults: {
	                    			handler: 'onOpenWeatherMapOptions'
	                    		},
	                    		items:[{
	                    			boxLabel: 'Wind',
	                    			name: 'wind'
	                    		},{
	                    			boxLabel: 'Temperature',
	                    			name: 'temp'
	                    		},{
	                    			boxLabel: 'Clouds',
	                    			name: 'clouds'
	                    		},{
	                    			boxLabel: 'Precipitation',
	                    			name: 'precipitation'
	                    		},{
	                    			boxLabel: 'Pressure',
	                    			name: 'pressure'                    				
	                    		}]
	                    	}]	
	                    },'-',{
	                		xype: 'button',
	                		text: ViewUtil.getLabel('legend'),
	                		iconCls: 'x-fa fa-th-list',
	                		menu: [{
	                			text: ViewUtil.getLabel('coastalShipping'),
	                			disabled: true
	                		},{ 
	                			text: ViewUtil.getLabel('ballastVsl'),
	                			reference: 'refCoastalBallestVsl',
	                			disabled: true,
	                			listeners: {
	                				beforerender: 'onImageSet'
	                			}
	                		},{ 
	                			text: ViewUtil.getLabel('ladenVsl'),
	                			reference: 'refCoastalLadenVsl',
	                			disabled: true,
	                			listeners: {
	                				beforerender: 'onImageSet'
	                			}
	                		},{ 
	                			text: ViewUtil.getLabel('waiting'),
	                			reference: 'refCoastalWaitingVsl',
	                			disabled: true,
	                			listeners: {
	                				beforerender: 'onImageSet'
	                			}
	                		},{ 
	                			text: ViewUtil.getLabel('loadingCtl'),
	                			reference: 'refCoastalLoadingVsl',
	                			disabled: true,
	                			listeners: {
	                				beforerender: 'onImageSet'
	                			}
	                		},{ 
	                			text: ViewUtil.getLabel('dischargingCtl'),
	                			reference: 'refCoastalDischargingVsl',
	                			disabled: true,
	                			listeners: {
	                				beforerender: 'onImageSet'
	                			}
	                		},'-',{ 
	                			text: ViewUtil.getLabel('equbulk'),
	                			disabled: true
	                		},{ 
	                			text: ViewUtil.getLabel('ballastVsl'),
	                			reference: 'refBulkBallestVsl',
	                			disabled: true,
	                			listeners: {
	                				beforerender: 'onImageSet'
	                			}
	                		},{ 
	                			text: ViewUtil.getLabel('ladenVsl'),
	                			reference: 'refBulkLadenVsl',
	                			disabled: true,
	                			listeners: {
	                				beforerender: 'onImageSet'
	                			}
	                		},{ 
	                			text: ViewUtil.getLabel('waiting'),
	                			reference: 'refBulkWaitingVsl',
	                			disabled: true,
	                			listeners: {
	                				beforerender: 'onImageSet'
	                			}
	                		},{ 
	                			text: ViewUtil.getLabel('loadingCtl'),
	                			reference: 'refBulkLoadingVsl',
	                			disabled: true,
	                			listeners: {
	                				beforerender: 'onImageSet'
	                			}
	                		},{ 
	                			text: ViewUtil.getLabel('dischargingCtl'),
	                			reference: 'refBulkDischargingVsl',
	                			disabled: true,
	                			listeners: {
	                				beforerender: 'onImageSet'
	                			}
	                		},'-',{ 
	                			text: ViewUtil.getLabel('roro'),
	                			disabled: true
	                		},{ 
	                			text: ViewUtil.getLabel('ballastVsl'),
	                			reference: 'refRoroBallestVsl',
	                			disabled: true,
	                			listeners: {
	                				beforerender: 'onImageSet'
	                			}
	                		},{ 
	                			text: ViewUtil.getLabel('ladenVsl'),
	                			reference: 'refRoroLadenVsl',
	                			disabled: true,
	                			listeners: {
	                				beforerender: 'onImageSet'
	                			}
	                		},{ 
	                			text: ViewUtil.getLabel('waiting'),
	                			reference: 'refRoroWaitingVsl',
	                			disabled: true,
	                			listeners: {
	                				beforerender: 'onImageSet'
	                			}
	                		},{ 
	                			text: ViewUtil.getLabel('loadingCtl'),
	                			reference: 'refRoroLoadingVsl',
	                			disabled: true,
	                			listeners: {
	                				beforerender: 'onImageSet'
	                			}
	                		},{ 
	                			text: ViewUtil.getLabel('dischargingCtl'),
	                			reference: 'refRoroDischargingVsl',
	                			disabled: true,
	                			listeners: {
	                				beforerender: 'onImageSet'
	                			}
	                		}]
	                    },'->',{
		        			xtype: 'splitbutton',
							iconCls: 'x-fa fa-cogs',
							tooltip: 'Auto Refresh Setting',
							menu:[{
								xtype: 'numberfield',
								reference: 'refAutoRefreshInterval',
								fieldLabel:'Cycle(sec)',
								labelWidth: 70,
								width: 160,
					            value: 180,
					            minValue: 1,
					            allowBlank: false
							}, {
								xtype: 'button',
								reference: 'refAutoRotateAction',
								iconCls: 'x-fa fa-play',
								enableToggle: true,
								text: 'Start',
								handler: 'onAutoRefreshAction'
					        }]
	    				}]
	                }]
			    }]
		});
		me.callParent(arguments);
	},
	
	afterRender : function(){
		var me = this;
		me.getController().loadData();
		me.callParent(arguments);
	},
	
	destroy: function () {
		var me = this;
		me.getController().onDestroy();
		me.callParent(arguments);
    }
	
});
