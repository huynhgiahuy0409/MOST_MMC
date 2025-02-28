Ext.define('MOST.view.popup.MechanicalCdPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-mechanicalcdpopup',
	requires: [
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	title:"Mechanical Equipment",
	width: 800,
	height: 360,

	controller: 'mechanicalcdpopup',
	
	viewModel: {
		type: 'mechanicalcdpopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},

	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [{
				xtype: 'grid',
				margin:'0 5 5 5',
				reference: 'refMechanicalEquipmentListPopupGrid',
				flex : 1,
				stateful : true,
				stateId : 'stateMechanicalEquipmentListPopuprid',
				plugins: [
	    		          'gridexporter',
	    		          'gridfilters',
	    		          'clipboard'
	    		],
	    		bind: {
	    			store: '{mechanicalEquipmentListPopup}'
	    		},
				listeners: {
					celldblclick: 'onDblClick'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: [{
		            		header: ViewUtil.getLabel('gridNo'),
		            		xtype: 'rownumberer',
		            		width : 50,
		            		align : 'center'
	            		},
	            		{	
	            			header: ViewUtil.getLabel('mecharicalEqDivCdNm'),
	            			dataIndex: 'eqDivCdNm',
	            			reference: 'refEqDivCdNm',
	            			filter: 'string',
	            			width: 130
	            		},
	            		{
	            			header: ViewUtil.getLabel('eqFacNm'),
	            			dataIndex: 'eqFacNm',
	            			reference: 'refEqFacNm',
	            			filter: 'string',
	            			hidden: true
	            		},
	            		{
	            			header: ViewUtil.getLabel('capaDescr'),
	            			dataIndex: 'capaDescr',
	            			reference: 'refCapaDescr',
	            			filter: 'string',
	            			width: 230
	            		},
	            		{
	            			header: ViewUtil.getLabel('ownDivNm'),
	            			dataIndex: 'ownDivNm',
	            			reference: 'refOwnDivNm',
	            			filter: 'string',
	            			width: 130
	            	}]
				}
		    }],
		    
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
	   					xtype: 'combo',
	   					reference: 'ctlCdNmCombo',
	   					margin: '5 0 0 5',
	   					fieldLabel: ViewUtil.getLabel('mechanicalEquipmentType'),
	   					labelWidth:32,
	   					width:220,
	   					labelAlign: 'right',
	   					queryMode: 'local',
	   					bind: {
	    	    			store: '{mechanicalEquipmentComboStore}'
	    	    		},
	   					displayField: 'scdNm',
	   					valueField: 'scd',
	   					value : '',
	   					editable: false,
	   					allowBlank: true,
	   					listeners: {
							select: 'onSearchComboSelect'
						}
					},
					{
						xtype: 'combo',
						reference:'ctlListGear',
						fieldLabel: 'Gear',
						labelAlign: 'right',
						editable:false,
						hidden:true,
						labelWidth: 70,
						width: 230,
						bind: {
	    	    			store: '{mechanicalEquipmentListGear}'
	    	    		},
						displayField: 'gearNm',
	   					valueField: 'gearCd',
						value : '',
						margin: '5 0 0 5',
						listeners: {
							select: 'onGearSelect'
						}
	   				},
					{
						xtype:'textfield',
						reference:'ctlGearDescription',
						fieldLabel: 'Description',
						labelAlign: 'right',
						editable:true,
						hidden:true,
						labelWidth: 70,
						width: 230,
						margin: '5 0 0 5'
	   				},
					   {
						xtype: 'button',
						text: 'Search',
						reference:'btnSearch',
						hidden:true,
						iconCls: 'x-fa fa-search',
						margin: '5 0 0 5',
						listeners: {
							click: 'onSearchComboSelect'
						}
					}]
				}]
			}]
			
		});
		
		me.callParent();
	}
});

