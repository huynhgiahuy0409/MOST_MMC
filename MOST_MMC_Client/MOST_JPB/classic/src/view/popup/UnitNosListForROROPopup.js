Ext.define('MOST.view.popup.UnitNosListForROROPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-unitnoforrorolistpopup',
	requires: [
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	title:"List of Unit Nos.",
	width: 1100,
	height: 400,

	controller: 'unitnoforrorolistpopup',
	
	viewModel: {
		type: 'unitnoforrorolistpopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
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
									            		header:  ViewUtil.getLabel('chk'),
									            		reference: 'refChkUnitNo',
											            xtype: 'checkcolumn',
											            dataIndex: 'unitChk',
											            width: 40,
											            defaultType: 'integer',
											            listeners: {
								    		                checkchange: 'onMultiCheckChange'
								    		            }
											        },
									            	{
									            		header:  ViewUtil.getLabel('BLSNNo'),
									            		reference: 'refMBLSNo',
											            dataIndex: 'cgNo',
											            width: 140,
											            defaultType: 'integer'
											        },
											        {
											        	header:  ViewUtil.getLabel('sdogrNo'),
											        	dataIndex: 'sdogrNo',
											        	reference: 'refBLNo',
											        	filter: 'string',
											        	width: 140
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
	        ],
	        dockedItems: [{
		    	xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right'
				},
				items: [
				{
					xtype: 'container',
					flex: 1,
					layout:{
						type: 'hbox',
					     align: 'stretch'
					},
					items: [
					{
						xtype: 'button',
						text: ViewUtil.getLabel('save'),
						width: 100,
						height: 28,
						name: 'btnSaveUnitNoPopup',
						iconCls: 'x-fa fa-save',
						margin: '0 0 0 0',
						listeners:{
							click:'onSaveUnitNoList'
						}
					}]
				}]
			}]
		});
		
		me.callParent();
	}
});

