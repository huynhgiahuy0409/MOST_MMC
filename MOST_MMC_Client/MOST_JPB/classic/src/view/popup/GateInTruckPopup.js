Ext.define('MOST.view.popup.GateInTruckPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-gateintruckpopup',
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
	MAIN_GRID_REF_NAME: 'refGateInTruckPopupGrid',
	MAIN_STORE_NAME: 'gateInTruckPopup',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	title:"In-Gate Truck List",
	width: 750,
	height: 400,

	controller: 'gateintruckpopup',
	
	viewModel: {
		type: 'gateintruckpopup'
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
				stateId : 'stateGateInTruckPopupGrid',
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
					items: GridUtil.getGridColumns('InGateLorryListPopup')
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
									hidden: true,
									reference:'refVslCallId',
									fieldLabel: ViewUtil.getLabel('vessel'),
									bind: {value: '{theSearch.vslCallId}'}
				   				},
				   				{
									xtype:'textfield',
									reference:'refTruckNo',
									fieldLabel: ViewUtil.getLabel('truckNo'),
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
							defaults: {
			                    margin: '0 5 2 0',
			                    labelAlign: 'right',
			                    width:250,
			                    labelWidth: 100
			                },
							items: [
								{
									xtype:'combo',
									hidden: true,
									reference:'refShipgNoteNo',
									fieldLabel: ViewUtil.getLabel('SNLSNNo'),
									queryMode: 'local',
				   					bind: {
				    	    			store: '{shipgNoteNoCombo}',
				    	    			value: '{theSearch.shipgNoteNo}',
				    	    		},
				   					displayField: 'scdNm',
				   					valueField: 'shipgNoteNo',
				   					editable: true
				   				},
				   				{
				   					xtype:'combo',
				   					hidden: true,
									reference:'refBlNo',
									fieldLabel: ViewUtil.getLabel('blNo'),
									queryMode: 'local',
				   					bind: {
				    	    			store: '{blNoCombo}',
				    	    			value: '{theSearch.blNo}',
				    	    		},
				   					displayField: 'scdNm',
				   					valueField: 'blNo',
				   					editable: true
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


