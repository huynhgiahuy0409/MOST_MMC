Ext.define('MOST.view.popup.EquipmentCdPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-equipmentcdpopup',
	requires: [
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	title:"Equipment List",
	width: 563,
	height: 360,

	controller: 'equipmentcdpopup',
	
	viewModel: {
		type: 'equipmentcdpopup'
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
				reference: 'refEquipmentListPopupGrid',
				flex : 1,
				stateful : true,
				stateId : 'stateEquipmentListPopupGrid',
				plugins: [
	    		          'gridexporter',
	    		          'gridfilters',
	    		          'clipboard'
	    		],
	    		bind: {
	    			store: '{equipmentListPopup}'
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
            			header:ViewUtil.getLabel('eqNo'),
            			dataIndex: 'eqDivCd',
            			reference: 'refEqDivCd',
            			filter: 'string',
            			width: 100,
            			//hidden: true
            		},
            		{
            			header:ViewUtil.getLabel('eqName'),
            			dataIndex: 'eqDivCdNm',
            			reference: 'refEqDivCdNm',
            			filter: 'string',
            			width: 200,
            		},
            		{
            			header: ViewUtil.getLabel('capa'),
            			dataIndex: 'capaCd',
            			reference: 'refDivCd',
            			filter: 'string',
            			width: 100
	            	},
            		{
            			header: ViewUtil.getLabel('description'),
            			dataIndex: 'capaDescr',
            			reference: 'refDivCdNm',
            			filter: 'string',
            			width: 200
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
	   					width:130,
	   					queryMode: 'local',
	   					bind: {
	    	    			store: '{equipmentListPopupSearchCombo}'
	    	    		},
	   					displayField: 'comName',
	   					valueField: 'comCode',
	   					value : 'CODE',
	   					editable: false,
	   					allowBlank: true
					},
					{
						xtype:'textfield',
						reference:'txtEqDivCd',
						maxLength: 10,
						enforceMaxLength: true,
						margin: '0 5 0 5',
						name: 'divCd',
						width: 180,
						listeners:{
							change: function(){
								var me = this;
								me.setValue(this.getValue().toUpperCase());
							}
						}
					},
					{
						xtype: 'checkboxfield',
						reference: 'refYardTruck',
						boxLabel: ViewUtil.getLabel('cmc_yardtruck'),
						// listeners: {
						// 	change: 'onYardTruckCheck'
						// }
					},
					{
						xtype: 'button',
						text:  ViewUtil.getLabel('search'),
						width: 100,
						height: 33,
						name: 'btnEquipmentListPopup',
						iconCls: 'x-fa fa-search',
						margin: '0 0 0 10',
						listeners:{
							click:'onSearch'
						}
					}]
				}]
			}]
			
		});
		
		me.callParent();
	}
});

