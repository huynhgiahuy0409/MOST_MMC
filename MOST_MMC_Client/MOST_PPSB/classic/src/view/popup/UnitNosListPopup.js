Ext.define('MOST.view.popup.UnitNosListPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-spacemovementplanUnitdetail',
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
		afterrender: 'onUnitListLoad'
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
											height: 300,
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
									            		header:  ViewUtil.getLabel('masterBlNo'),
									            		reference: 'refMBLSNo',
											            dataIndex: 'docNo',
											            width: 140,
											            defaultType: 'integer'
											        },
											        {
											        	header:  ViewUtil.getLabel('blnolabel'),
											        	dataIndex: 'blNo',
											        	reference: 'refBLNo',
											        	filter: 'string',
											        	width: 140
											        },
											        {
											        	header:  ViewUtil.getLabel('doNo'),
											        	dataIndex: 'doNo',
											        	reference: 'refDONo',
											        	filter: 'string',
											        	width: 300
											        },
											        {
											        	header:  ViewUtil.getLabel('sdoNo'),
											        	dataIndex: 'sdoNo',
											        	reference: 'refSDONo',
											        	filter: 'string',
											        	width: 170
											        },
											        {
											        	header:  ViewUtil.getLabel('bookingNo'),
											        	dataIndex: 'bookingNo',
											        	reference: 'refBookingNo',
											        	filter: 'string',
											        	width: 130
											        },
											        {
											        	header:  ViewUtil.getLabel('snNo'),
											        	dataIndex: 'snNo',
											        	reference: 'refSNNo',
											        	filter: 'string',
											        	width: 170
											        },
											        {
											        	header:  ViewUtil.getLabel('grNo'),
											        	dataIndex: 'grNo',
											        	reference: 'refGRNo',
											        	filter: 'string',
											        	width: 170
											        },
											        {
											        	header:  ViewUtil.getLabel('unitNo'),
											        	dataIndex: 'unitNo',
											        	reference: 'refUnitNo',
											        	filter: 'string',
											        	width: 170
											        },
											        {
											        	header:  ViewUtil.getLabel('brand'),
											        	dataIndex: 'brandCd',
											        	reference: 'refBrand',
											        	filter: 'string',
											        	width: 170
											        },
											        {
											        	header:  ViewUtil.getLabel('model'),
											        	dataIndex: 'modelCd',
											        	reference: 'refModel',
											        	filter: 'string',
											        	width: 170
											        },
											        {
											        	header:  ViewUtil.getLabel('mt'),
											        	dataIndex: 'docWgt',
											        	reference: 'refMT',
											        	filter: 'string',
											        	width: 130
											        },
											        {
											        	header:  ViewUtil.getLabel('newCar'),
											        	dataIndex: 'newYn',
											        	reference: 'refNewCar',
											        	filter: 'string',
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

