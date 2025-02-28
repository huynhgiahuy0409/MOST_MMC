Ext.define('MOST.view.monitoring.UnitNoDetailForRORO', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-unitnodetailforroro',
	requires: [
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	title:"List of Unit Nos.",
	width: 1100,
	height: 400,

	listeners:{
		afterrender: 'onUnitListDetailLoad'
	},
	
	initComponent: function() {

		var me = this;
		
		Ext.apply(me, {
			xtype:'container',
			defaults:{
				margin: '5 0 0 0'
			},
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items:[
				{
					xtype: 'fieldset',
					margin: '5 0 5 0',
					padding: '0 5 0 5',
					height: 361,
					items:[
						{
							xtype: 'container',
							layout: {
								type  : 'vbox', 
								align : 'stretch' 
							},
							items:[
								{
									xtype: 'container',
									items: [
										{
											xtype: 'tsb-datagrid',
											height: 350,
											reference: 'refUnitNosListPopupGrid',
											stateId : 'stateUnitNosListPopupGrid',
											usePagingToolbar : false,
											plugins: [
						    		          'gridexporter',
						    		          'gridfilters',
						    		          'clipboard'
					    		            ],
					    		            bind:{
										    	 store: '{unitNosList}'
					    		            },
					    		            selModel: {
												type: 'spreadsheet',
												cellSelect: false
					    		            },
											columns:{
												defaults: {
								            		style : 'text-align:center'
								            	},
								            	items: [
								            		{
								            			header:  ViewUtil.getLabel('unitNo'),
								            			dataIndex: 'unitNo',
								            			reference: 'refUnitNo',
								            			width: 170
								            		},
								            		{
									            		header:  ViewUtil.getLabel('vslCallId'),
									            		reference: 'refVslCallId',
											            dataIndex: 'vslCallId',
											            width: 140
											        },
									            	{
									            		header:  ViewUtil.getLabel('masterBlNo'),
									            		reference: 'refMBLSNo',
											            dataIndex: 'masterBlNo',
											            width: 140
											        },
											        {
											        	header:  ViewUtil.getLabel('blnolabel'),
											        	dataIndex: 'blNo',
											        	reference: 'refBLNo',
											        	width: 140
											        },
											        {
											        	header:  ViewUtil.getLabel('sdoNo'),
											        	dataIndex: 'sdoNo',
											        	reference: 'refSDONo',
											        	width: 170
											        },
											        {
											        	header:  ViewUtil.getLabel('bookingNo'),
											        	dataIndex: 'bookingNo',
											        	reference: 'refBookingNo',
											        	width: 130
											        },
											        {
											        	header:  ViewUtil.getLabel('snNo'),
											        	dataIndex: 'shipgNoteNo',
											        	reference: 'refSNNo',
											        	width: 170
											        },
											        {
											        	header:  ViewUtil.getLabel('grNo'),
											        	dataIndex: 'grNo',
											        	reference: 'refGRNo',
											        	width: 170
											        },
											        {
											        	header:  ViewUtil.getLabel('brand'),
											        	dataIndex: 'brandCd',
											        	reference: 'refBrand',
											        	width: 170
											        },
											        {
											        	header:  ViewUtil.getLabel('model'),
											        	dataIndex: 'modelCd',
											        	reference: 'refModel',
											        	width: 170
											        },
											        {
											        	header:  ViewUtil.getLabel('mt'),
											        	dataIndex: 'unitWgt',
											        	reference: 'refMT',
											        	width: 130
											        }]
											}
										}
									]
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

