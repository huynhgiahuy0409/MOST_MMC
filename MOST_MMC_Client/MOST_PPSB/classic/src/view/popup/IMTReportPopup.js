Ext.define('MOST.view.popup.IMTReportPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-imtreportpopup',
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

	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	title:"IMT Report",
	width: 300,
	height: 170,

	controller: 'imtreportpopup',
	
	viewModel: {
		type: 'imtreportpopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {

		var me = this;
		
		Ext.apply(me, {
			items: [
				{
					xtype: 'container',
					layout:{
						type: 'vbox',
					     align: 'stretch'
					},
					defaults: {
	                    margin: '5 5 2 0',
	                    labelAlign: 'right',
	                    width:250,
	                    labelWidth: 70
	                },
					items: [
						{
		                    xtype: 'combobox',
		                    reference: 'ctlGateNo',
		                    fieldLabel: ViewUtil.getLabel('gateNo'),
		                    bind: {
		                    	store: '{gateCombo}'
		                    },
							queryMode: 'local',
					        displayField: 'scdNm',
					        valueField: 'scd',
					        editable: false
		                },
		                {
		                    xtype: 'combobox',
		                    reference: 'ctlScaleNo',
		                    fieldLabel: ViewUtil.getLabel('scaleNo'),
		                    bind: {
		                    	store: '{scaleCombo}'
		                    },
							queryMode: 'local',
					        displayField: 'scdNm',
					        valueField: 'scd',
					        editable: false
		                }
					]
				},
				{
					xtype: 'container',
					margin: '5 0 0 0',
					layout:{
						type: 'hbox',
					    pack: 'center'
					},
					items: [
						{
							xtype: 'button',
							text: ViewUtil.getLabel('ok'),
							name: 'btnSearch',
							listeners:{
								click:'onOk'
							}
						}
					]
				}
			],

		});
		
		me.callParent();
	}
});


