Ext.define('MOST.view.popup.GateTicketNoPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-gateticketnopopup',
	requires: [
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refGateTicketNoPopupGrid',
	MAIN_STORE_NAME: 'gateTicketNoPopup',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	title:"Gate Ticket No List",
	width: 750,
	height: 400,

	controller: 'gateticketnopopup',
	
	viewModel: {
		type: 'gateticketnopopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {

		var me = this;
		
		Ext.apply(me, {
			items: [{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				flex: 1,
				margin: '5 5 5 5',
				stateful : true,
				stateId : 'stateGateTicketNoPopupGrid',
				usePagingToolbar : false,
				plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
				],
				bind: {
					store: '{' + me.MAIN_STORE_NAME + '}'
				},
				selModel: {
					type: 'spreadsheet',
					cellSelect: false
				},
				listeners : {
					celldblclick: 'onDblClick'
				},
				
				columns: {
					defaults: {
						style : 'text-align:center',
						align: 'center'
					},
					items: GridUtil.getGridColumns('GateTicketNoPopupList')
				}
			}],
		    
		    dockedItems: [{
		    	xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right'
				},
				items: [{
					xtype: 'container',
					flex: 1,
					layout:{
						type: 'hbox',
					     align: 'stretch'
					},
					items: [
						{
							xtype: 'container',
							flex: 1,
							layout:{
								type: 'vbox',
							     align: 'stretch'
							},
							defaults: {
			                    margin: '0 5 2 0',
			                    labelAlign: 'right',
			                    width:250,
			                    labelWidth: 100
			                },
							items: [
								{
									xtype:'vesselcalllistfield',
									reference:'refVslCallId',
									fieldLabel: ViewUtil.getLabel('vessel'),
									bind: {value: '{theSearch.vslCallId}'}
				   				},
				   				{
				   					xtype:'textfield',
									reference:'refGateTicketNo',
									fieldLabel: ViewUtil.getLabel('gateTicketNo'),
									fieldStyle : 'text-transform: uppercase',
									listeners:{
										change: function(){
											var me = this;
											me.setValue(this.getValue().toUpperCase());
										}
									},
									bind: '{theSearch.gateTicketNo}'
				   				},
				   				
							]
						},
						{
							xtype: 'container',
							flex: 1,
							layout:{
								type: 'vbox',
							     align: 'stretch'
							},
							defaults: {
			                    margin: '0 5 2 0',
			                    labelAlign: 'right',
			                    width:250,
			                    labelWidth: 100
			                },
							items: [
								{
									xtype:'textfield',
									reference:'refTruckNo',
									fieldLabel: ViewUtil.getLabel('gpPopupLorryNo'),
									fieldStyle : 'text-transform: uppercase',
									listeners:{
										change: function(){
											var me = this;
											me.setValue(this.getValue().toUpperCase());
										}
									},
									bind: '{theSearch.lorryNo}'
				   				}
							]
						},
						{
							xtype: 'container',
							flex: 1,
							layout:{
								type: 'vbox',
							     align: 'stretch'
							},
							items: [
								{
									xtype: 'button',
									text: ViewUtil.getLabel('search'),
									margin: '0 3 0 5',
									name: 'btnSearch',
									iconCls: 'x-fa fa-search',
									listeners:{
										click:'onSearch'
									}
								}
							]
						}]
		    	}]
			}]
		});
		
		me.callParent();
	}
});


