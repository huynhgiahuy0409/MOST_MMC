Ext.define('MOST.view.planning.roster.RosterConfiguration', {
	extend: 'Ext.panel.Panel',
	xtype: 'calendar-panel',
	alias: 'widget.app-rosterconfigurationmonthly',
	
	requires: [
		 'Ext.calendar.panel.Panel',
		 'MOST.model.planning.roster.RosterMonthlyEvent'
	],

	controller: 'rosterconfigurationmonthly',
	
	viewModel: {
		type: 'rosterconfigurationmonthly'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	config: {
		context : null,
		eOpts : null
	},

    layout: 'fit',

	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			items: [{
				reference: 'refRosterMonthCalendar',
		        xtype: 'calendar',
		        createButton: {
		            hidden : true,
		        },
		        views: {
		        	day:null,
		            week: null,
		            month: {
		            	xtype: 'calendar-month',
		            	region: 'west',
		            	width: 150,
		            	label: 'Month',
		            	view: {
		            		xtype: 'calendar-monthview',
		            		addForm: null,
		            		editForm: null,
		            		titleTpl: '{start:date("j M")} - {end:date("j M")}',
		            		firstDayOfWeek: 1,
		            		dayHeaderFormat: 'D d',
		            		listeners: {
		            			select : 'onEventTap',
								valuechange: 'onMonthChange'
		            		}
		                 },
		            }
		        },
		        timezoneOffset: 0,
		        store: {
		            autoLoad: true,
		            model: 'MOST.model.planning.roster.RosterMonthlyEvent',
		            proxy: {
		            	type: 'ajax',
						url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rosterconfigurationmonthly/shift',
		            },
		            
		            listeners: {
	            		beforeload: function(st, operation, options){
	            			var params = {};
	            			params.shftDivCd = me.lookupReference("ctlShiftTypeCd").getValue();
	            			st.getProxy().extraParams = params;
                        }
	            	 },
		            
		            eventStoreDefaults: {
		            	 autoLoad: false ,
		            	 model: 'Ext.calendar.model.Event',
		            	 proxy: {
			            	type: 'ajax',
							url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rosterconfigurationmonthly/data',
		            	 },
		            	 listeners: {
		            		beforeload: function(st, operation, options){
		            			var params = {};
		            			
		            			params.shftDivCd = me.lookupReference("ctlShiftTypeCd").getValue();
		            			st.getProxy().extraParams = params;
                            }
		            	}
		            },
		        }
		    }],

			dockedItems : [{
		    	xtype : 'container',
		    	style: { "background-color":"white" },
				layout: {
					type: 'hbox',
				},
				defaults: {
					margin: '5 5 0 0'
				},
            	items: [
            		{
    					xtype: 'tbfill'
    				},
            		{
						xtype: 'button',
						itemId: 'previewItemId',
						reference:'refBtnPreview',
						text: ViewUtil.getLabel('exportToPdf'),
						name: 'detailPreview',
						cls: 'excel-button',
						iconCls: 'excel-button-image',  
						listeners:{
						      click:'onPreview'
						   }
	                },
					{
						xtype: 'button',
						itemId: 'downloadItemId',
						reference:'refBtnDownload',
						text: ViewUtil.getLabel('exportToPdf'),
						cls: 'excel-button',
						iconCls: 'x-fa fa-file-pdf-o',
						listeners:{
						      click:'onDownload'
						   }
	                }
    			]
			},
			{
				xtype: 'container',
				layout: {
					align:'left'
				},
				defaults: {
					margin: '5 5 0 0'
				},
				items: [{
					xtype: 'toolbar',
					overflowHandler: 'menu',
					dock: 'top',
					margin: '1 0 0 0',
					hidden: false,
					defaults: {
						labelAlign: 'right'
					},
					items: [{
						reference: 'refRosterMonthField',
						xtype: 'monthfield',
						showButtons: false,
						labelWidth: 100,
						width: 300,
						fieldLabel: ViewUtil.getLabel('rstOthersStartingDate'),
						format: MOST.config.Locale.getShortMonth(),
						editable: false,
						listeners : {
							render: 'onMonthFieldRender',
							change: 'onMonthPicked'
						}
					},
					{
                    	reference: 'ctlShiftTypeCd',
       					xtype: 'combo',
       					fieldLabel: ViewUtil.getLabel('shiftType'),
       					width:300,
       					queryMode: 'local',
       					align: 'right',
       					bind: {
        	    			store: '{shiftTypeCombo}'
        	    		},
       					displayField: 'shftTpCdNm',
       					valueField: 'shftTpCd',
       					emptyText: ViewUtil.getLabel('searchType'),
       					editable: false,
       					listeners: {
       						change: 'onCtlShiftTypeCd_changeEvent',
						}
                    }]
				}]
			}]
		});
		
		me.callParent();
	}
});

