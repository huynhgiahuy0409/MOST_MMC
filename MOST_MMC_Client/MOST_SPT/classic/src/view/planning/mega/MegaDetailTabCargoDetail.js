Ext.define('MOST.view.planning.megadetail.MegaDetailTabCargoDetail', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-megadetailtabcargodetail',
	
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	flex:1,
	
	layout : {type  : 'hbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
			ptype: 'cellediting',
			clicksToEdit: 2,
   			pluginId : 'megaDetailTabCargoDetailEditor'
   		});	
		
		Ext.apply(me, {
			items: [
				{
		            xtype: 'container',
		            flex: 1.5,
		            defaults: {
		                margin: '5 5 5 5'
		            },
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            items: [{
		            		xtype:'container',
		                    layout: {
		                        type: 'hbox'
		                    },
		                    defaults:{
		                    	width : 220,
		                    	labelWidth :  80,
		                    	labelAlign:'right'
		                    },
		                    items:[
		                    	{
		                            xtype: 'cmmcdfield',
		                            margin: '1 0 0 0',
		                            fieldLabel: ViewUtil.getLabel('pkgTpCd'),
		                            reference: 'ctlCargoDetailPackage',
		                            params:{
		                            	searchLcd:'MT',
		                            	searchDivCd: 'PKGTP',
	        	   						searchType: 'COMM'
	        	   					}
		                        },{
		                            xtype: 'cmmcdfield',
		                            margin: '1 0 0 10',
		                            labelWidth : 120,
		                            width : 260,
		                            fieldLabel: ViewUtil.getLabel('cmdtCd'),
		                            reference: 'ctlCargoDetailCmdtCode',
	        	   					params:{
	        	   						searchType: 'CMDT'
	        	   					}
		                        },{
	                            	xtype : 'numberfield',
	                            	fieldLabel: 'MT',
		                    		reference: 'refCargoDetailMT',
	    							minValue : 0,
	    							maxValue: 999999999999.999,
	    							align : 'right',
	    							decimalPrecision: 3
	                            },
	                            {
	                                xtype: 'button',
	                                text: 'Update',
	                                iconCls: 'x-fa fa-plus',
	                                cls: 'search-button', 
	                                reference:'refBtnUpdateCargoDetailInfo',
	                                margin : '0 5 0 20',
	                                width : 100,
	                                listeners: {
	                                    click: 'onUpdateCargoDetailInfo'
	                                }
	                            }
		                    ]
		            	},{
							xtype: 'tsb-datagrid',
							reference: 'refMegaDetailCargoDetailGrid',
							usePagingToolbar : false,
		                	flex : 1,
		                	margin : '0 0 0 0',
		                	stateful : true,
		                	stateId : 'stateMegaDetailTabCargoDetailGrid',
		                	plugins: [
		    					cellEditing,
		    					'gridexporter',
		    					'gridfilters',
		    					'clipboard'
		    	    		],
		                	bind: {
		                		store: '{megaDetailCargoDetail}'
		                	},
		                	selModel: {
		                		type: 'spreadsheet'
		                	},
		                	listeners: {
		                		selectionchange :'onChangeCargoDetail'
		                	},
		                	columns: {
		                		defaults: {
		                			style : 'text-align:center',
		                			align : 'center',
		                			width: 80
		                		},
		                		items:GridUtil.getGridColumns('MegaDetailCargoDetail')
		                	}
		                }
		            ]
		        }
			]
		});
		
		me.callParent();
	}
});