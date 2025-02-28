Ext.define("MOST.view.controller.LogMonitoring", {
	extend: "Ext.panel.Panel",

	alias: 'widget.app-logmonitoring',
	
	requires: [
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	controller: 'logmonitoring',
	
	viewModel: {
		type: 'logmonitoring'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refHistoricalDataGrid',
	MAIN_STORE_NAME: 'historicalDataStore',

	FILE_UPLOAD_STORE_NAME: 'uploadedFileDamageStore',
	FILE_UPLOAD_REF_NAME: 'refFileUpload',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	reference : 'refFrmLogMonitoring',
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	initComponent: function () {
		var me = this;
		
		Ext.apply(me, {
			xtype: 'form',
			defaults: {
				margin: '0 0 0 0' // top, right, bottom, left
			},
			layout: {
				type: 'vbox',
				align: 'stretch',
			},
			flex: 1,
			items: [
				{
					xtype:'tabpanel',
					margin: '5 5 5 0',
					reference:'tabLogMonitoring',
					activeTab: 0,
					listeners:{
		            	tabchange:'onSearch'
		            },
					flex: 1,
					items:[
					{
						title: 'MOST',
						xtype: 'app-logmostmonitoringtab',
			    		reference: 'refLogMOSTMonitoringTab',
//			    		listeners: {
//			    			activate: 'onColumnButtonSetting'
//			    	    }
					},{
						title: 'Weight Bridge',
						xtype: 'app-logwbmonitoringtab',
			    		reference: 'refLogWBMonitoringTab',
//				    	listeners: {
//			    			activate: 'onColumnButtonSetting'
//			    	    }
					},{
						title: 'Hanging Scale',
						xtype: 'app-loghangingscalemonitoringtab',
			    		reference: 'refLogHangingScaleMonitoringTab',
//				    	listeners: {
//			    			activate: 'onColumnButtonSetting'
//			    	    }
					}]
		        }
			],
			dockedItems: [
				{
					xtype: 'container',
					style: { "background-color":"white" },
					layout: {
						type: 'hbox',
						align: 'left'
					},
					defaults: {
						margin : '1 1 1 1'
					},
					items: [
						{
							xtype: 'tbfill'
						},
						{
							xtype: 'button',
							itemId: 'inquiryItemId',
							text: ViewUtil.getLabel('search'),
							iconCls: 'x-fa fa-search',
							cls: 'search-button',
							reference: 'refBtnRetrieve',
							listeners: {
								click: 'onSearch'
							}
		
						},
						{
							xtype: 'button',
							text: ViewUtil.getLabel('download'),
							listeners: {
								click:'onDownload'
							}
						}
					]
				}
			]
		});
		
		me.callParent();
	}

});
