Ext.define('MOST.view.monitoring.berth.BerthMonitoring', {
	extend: 'Ext.panel.Panel',
	
	alias: 'widget.app-berthmonitoring',

	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',		
		'TSB.gux.berth.BerthRenderer',
		'MOST.view.monitoring.BerthMonitoringModel',
		'MOST.view.monitoring.BerthMonitoringController',
		'MOST.view.planning.berth.VesselSchduleInfoTab',
		'MOST.view.planning.berth.BerthVesselList',
		'MOST.view.planning.berth.BerthVesselSchDetailInfo'
	],
	
	config: {
	    selectedCell:{},
	    prevCell: {}
	}, 
	
	constructor: function(config) {
		this.callParent(arguments);
	},
	
	controller: 'berthmonitoring',
	viewModel: {
		type: 'berthmonitoring'
	},
	
	layout: {
        type: 'border'
    },

	stateful : true,
	stateId : 'stateareBerthExplorere',   
	
    initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
            items: [{
				region: 'center',
				xtype: 'panel',
				height: '100%',
				width: '100%',
				flex: 1,
				reference: 'refBerthLayout',
				layout: {
					type: 'absolute'
				},
				scrollable: true
			},
			{
				xtype: 'app-cargoflowinfo',
				header: false,
				collapsible: true,
				collapsed: false,	
				split: true,
				stateId: 'stateCargoFlowInfo',
				stateful: true,
				region: 'east',
				animCollapse: false,
				width: 250
			},{
				xtype: 'app-berthvesselmonitoring',
				header: false,
				collapsible: true,
				collapsed: false,	
				split: true,
				stateId: 'stateBerthExplorerVessehScheduleInfoTab',
				stateful: true,
				region: 'south',
				height: 250
			}],
			dockedItems: [
                        {
                            xtype: 'container',
                            style: { "background-color":"white" },
                            layout: {
                                type : 'hbox',
                            },
                            defaults: {
                                margin: '1 1 1 1'
                            },
                            items: [{
                                xtype: 'tbfill'
                            },
                            {
                                xtype: 'button',
                                text: ViewUtil.getLabel('search'),
                                iconCls: 'x-fa fa-search',
                                cls: 'search-button', 
                                reference:'refbtnRetrieve',
                                listeners: {
                                    click: 'onSearch'
                                },
                            	//hidden: true,
                            }
                        ]
                        }
                        ,{
					    xtype: 'toolbar',
					    overflowHandler: 'menu',
						dock: 'top',
						margin: '1 0 0 0',
						hidden: true,
						items: [{
							xtype:'combobox',
							reference: 'refBerthType',
	                        labelAlign: 'right',
	                        labelWidth: 30,
							fieldLabel: ViewUtil.getLabel('berth'),
							queryMode: 'local',
							displayField: 'scdNm',
							valueField: 'scd',
							width : 130,
							matchFieldWidth: false,
							editable: false,
							bind: {
								store: '{terminals}'
							},
			            	listeners: {
			            		change: 'onTerminalSelectionChange'
			            	} 
						},{
							xtype : 'datefield',
							reference : 'ctlFromYearMonth',
							width : 120,
							margin : '5 0 0 5',
							format : MOST.config.Locale.getShortDate(),
							labelAlign : 'right',
							labelWidth : 50,
							listeners : {
								blur : 'onMonthfieldChanged'
							}
						},{
							xtype : 'datefield',
							reference : 'ctlToYearMonth',
							width : 120,
							margin : '5 0 0 5',
							format : MOST.config.Locale.getShortDate(),
							labelAlign : 'right',
							labelWidth : 50,
							listeners : {
								blur : 'onMonthfieldChanged',
								specialkey: function(field, e){
				                    if (e.getKey() == e.ENTER) {
				                    	me.getController().onMonthfieldRetrevie();
				                    }
				                }
							}
						
						},{
							xtype:'combobox',
							reference: 'refBerthStatus',
	                        labelAlign: 'right',
	                        labelWidth: 80,
							fieldLabel: ViewUtil.getLabel('berthingstatus'),
							matchFieldWidth: false,
							queryMode: 'local',
							displayField: 'scdNm',
							valueField: 'scd',
							width : 250,
							value : '',
							bind: {
								store: '{berthingStatusCombo}'
							}
						},{
           					xtype:'vesselcalllistfield',
           					labelWidth:40,
           					width:200,
           					reference:'ctlJpvc',
							fieldStyle: 'background-color:#ebd1ea;'
                       }, {
                           xtype: 'checkboxfield',
                           reference:'ctlPlanCheckbox',
                           margin: '2 0 0 0',
                           boxLabel: 'Plan',
                           checked: false
                       },
                       '->',
                      '-', {
		                	xtype: 'segmentedbutton',
		                	reference: 'refTglWorkMode',
		                    items: [{
		                    	iconCls: 'fa fa-cogs',
		                    	tooltip: 'Planning by Auto',
		                    	value: 'auto',
		                    	pressed: true,
		                    	handler: 'onSearchClick'
		                    }, {
								iconCls: 'fa fa-keyboard-o',
					        	tooltip: 'Planning by Manual',
								value: 'manual',
								handler: 'onSearchClick',
		                    }]
						},'-',{
	                    	xtype:'button',					
				            text: ViewUtil.getLabel('timeZoom'),
	                    	iconCls: 'x-fa fa-search-plus',
				            arrowAlign:'right',
				            tooltip: 'Time Zoom',
				            menu: [{ 
				            	xtype: 'segmentedbutton',
				            	vertical: false,
				            	items:[{
					            	text: '-20%', 
					            	tooltip: 'Zoom Out (-20%)',
					            	handler: 'onZoomTime',
					            	value: '-20'
					            }, {
									xtype: 'button',						//return 100% size
									text: '100%',
						        	tooltip: 'Zoom to 100%',
									handler: 'onZoomTime',
									value: 100,
					            	pressed: true
					            }, {
					            	text: '+20%', 
					            	tooltip: 'Zoom In (+20%)',
					            	handler: 'onZoomTime',
					            	value: '20'
					            }]
				            }]			
	                    }, {
	                    	xtype:'button',					
	                    	text: ViewUtil.getLabel('berthZoom'),
	                    	iconCls: 'x-fa fa-search-plus',
	                    	arrowAlign:'right',
	                    	tooltip: 'Berth Zoom',
	                    	menu: [{ 
	                    		xtype: 'segmentedbutton',
	                    		vertical: false,
	                    		items:[{
	                    			text: '-20%', 
	                    			tooltip: 'Zoom Out (-20%)',
	                    			handler: 'onZoomBerth',
	                    			value: '-20'
	                    		}, {
	                    			xtype: 'button',						//return 100% size
	                    			text: '100%',
	                    			tooltip: 'Zoom to 100%',
	                    			handler: 'onZoomBerth',
	                    			value: 100,
	                    			pressed: true
	                    		}, {
	                    			text: '+20%', 
	                    			tooltip: 'Zoom In (+20%)',
	                    			handler: 'onZoomBerth',
	                    			value: '20'
	                    		}, {
	                    			text: 'Fit', 
	                    			tooltip: 'Fit to Window',
	                    			handler: 'onZoomBerth',
	                    			value: 'fit'
	                    		}]
	                    	}]	
	                    }, 
//	                    {
//	                    	xtype:'button',	
//	                    	enableToggle: true,
//	                    	text: me.lbl'SnapBerth,
//	                    	iconCls: 'x-fa fa-magnet',
//	                    	tooltip: 'Snap per Meters',
//	                    	reference: 'refSnapBerth'
//	                    }, {
//	                    	xtype:'button',	
//	                    	enableToggle: true,
//	                    	text: me.lbl'SnapTime,
//	                    	iconCls: 'x-fa fa-magnet',
//	                    	tooltip: 'Snap per Times',
//	                    	reference: 'refSnapTime'
//	                    }, 
	                    {
	                    	xtype:'button',					
	                    	text: 'Undo',
	                    	iconCls: 'x-fa fa-undo',
	                    	handler: 'onUndo',
	                    	bind: {
	                    		disabled: '{!undoRemained}'
	                    	}
	                    }, {
	                    	xtype: 'checkboxfield',
	                    	boxLabel: ViewUtil.getLabel('keepFitBerthToWindow'),
	                    	name: 'fitWindow',
	                    	reference: 'refFit',
	                    	listeners: {
	                    		change: 'onFitChecked'
	                    	}	
	                    }]
	                }]
        });
		
		me.callParent();
	},

	afterRender : function(){
		var me = this;
		
		me.getController().onLoad();
		
		//var ref = me.getReferences().refBerthLayout;
		//ref.getScrollable().on("scroll", me.getController().onScroll, me.getController());
		//ref.on("resize", me.getController().onResize, me.getController());

		me.callParent(arguments);
	}
});