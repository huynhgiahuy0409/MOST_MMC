Ext.define('MOST.view.popup.ShippingNoteForStoragePopup', {
	extend: "Ext.panel.Panel",
	alias: 'widget.popup-shippingnoteforstoragepopup',
	
	requires: [
		'MOST.view.popup.ShippingNoteForStoragePopupModel',
		'MOST.view.popup.ShippingNoteForStoragePopupController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	title:"Shipping Note for Storage",
	width: 350,
	height: 320,

	controller: 'shippingnoteforstoragepopupctl',
	
	viewModel: {
		type: 'shippingnoteforstoragepopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	lblNo: {type: 'bundle', key: 'gridNo'},
	lblEstArrivalDate: {type: 'bundle', key: 'estArrivalDate'},
	lblShipgNoteNo: {type: 'bundle', key: 'shipNoteNoTitle'},
	lblFrom: {type: 'bundle', key: 'from'},
	lblTo: {type: 'bundle', key: 'to'},

	btnSearch: {type: 'bundle', key: 'search'},
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [{
				xtype: 'tsb-datagrid',
				usePagingToolbar : false,
				reference: 'refShippingNoteForStoragePopupGrid',
				flex : 1,
				stateful : true,
				stateId : 'stateShippingNoteForStoragePopupGrid',
				plugins: [
	    		          'gridexporter',
	    		          'gridfilters',
	    		          'clipboard'
	    		],
	    		bind: {
	    			store: '{shippingNoteForStoragePopupStore}'
	    		},
	    		selModel: {
					type: 'spreadsheet',
					cellSelect: false
				},
				listeners: {
					cellDblClick: 'onDblClick'
				},
				columns:[
					{
	            		header: me.lblNo,
	            		xtype: 'rownumberer',
	            		width : 50,
	            		align : 'center'
	            	},{
            			header: me.lblShipgNoteNo,
            			dataIndex: 'shipgNoteNo',
            			reference: 'refShipgNoteNo',
            			filter: 'string',
            			width: 290
	            	}
				]
		    }],
		    
		    dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right'
				},
				items: [{
						xtype: 'container',
						flex: 1,
						layout:{
							type: 'vbox',
                            align: 'stretch'
						},
						items: [{
							xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [{
                            	 xtype: 'label',
                                 width: 130,
                                 text: me.lblEstArrivalDate,
                                 margin: '5 0 5 0'
                            }]
						},{

							xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [{
                                     xtype: 'datefield',
                                     fieldLabel: me.lblFrom,
                 					 reference:'refFromDate',
                                     format: MOST.config.Locale.getShortDate(),
                                     labelWidth: 50,
                                     margin: '5 10 5 0'
                                 },
                                 {
                                 	xtype: 'button',
                 					text: me.btnSearch,
                 					width: 90,
                 					height: 33,
                 					iconCls: 'x-fa fa-search',
                 					margin: '5 0 5 0',
                 					listeners:{
                 						click:'onSearch'
                 					}
                                 }
                            
                            ]
						
						},{
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: me.lblTo,
                					reference:'refToDate',
                                    format: MOST.config.Locale.getShortDate(),
                                    labelWidth: 50,
                                    margin: '0 10 5 0'
							}]
						}]
					}
					
				]
		    }]
		});
		
		me.callParent();
	}
});


