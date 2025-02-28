Ext.define('MOST.view.popup.AssignmentYardTruckPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-assignmentyardtruckpopup',
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
	MAIN_GRID_REF_NAME: 'refAssignmentTruckListPopupGrid',
	MAIN_STORE_NAME: 'assignmentYardTruckListPopup',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	title:"Assignment Truck List",
	width: 750,
	height: 400,

	controller: 'assignmentyardtruckpopup',
	
	viewModel: {
		type: 'assignmentyardtruckpopup'
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
				stateId : 'stateAssignmentTruckListPopupGrid',
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
					items: GridUtil.getGridColumns('AssignmentYardTruckPopup')
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
									xtype:'textfield',
									reference:'refVslCallId',
									fieldLabel: ViewUtil.getLabel('vessel'),
									fieldStyle : 'text-transform: uppercase',
									listeners:{
										change: function(){
											var me = this;
											me.setValue(this.getValue().toUpperCase());
										}
									},
									bind: '{theSearch.vslCallId}',
									readOnly: true
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
									xtype:'textfield',
									reference:'refShipgNoteNo',
									fieldLabel: ViewUtil.getLabel('SNLSNNo'),
									fieldStyle : 'text-transform: uppercase',
									listeners:{
										change: function(){
											var me = this;
											me.setValue(this.getValue().toUpperCase());
										}
									},
									bind: '{theSearch.shipgNoteNo}',
									readOnly: true
				   				},
				   				{
				   					xtype:'textfield',
									reference:'refBlNo',
									fieldLabel: ViewUtil.getLabel('blNo'),
									fieldStyle : 'text-transform: uppercase',
									listeners:{
										change: function(){
											var me = this;
											me.setValue(this.getValue().toUpperCase());
										}
									},
									bind: '{theSearch.blNo}',
									readOnly: true
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


