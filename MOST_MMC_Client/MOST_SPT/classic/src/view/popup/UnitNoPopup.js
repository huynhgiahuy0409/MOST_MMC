Ext.define('MOST.view.popup.UnitNoPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-unitnopopup',
	requires: [
		'MOST.view.popup.UnitNoPopupModel',
		'MOST.view.popup.UnitNoPopupController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	title:"Find Unit No",
	width: 660,
	height: 440,

	controller: 'unitnopopup',
	
	viewModel: {
		type: 'unitnopopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	initComponent: function() {

		var me = this;
		
		Ext.apply(me, {
			items: [{
				xtype: 'grid',
				reference: 'refUnitNoPopupGrid',
				flex : 1,
				margin:'0 5 5 5',
				stateful : true,
				stateId : 'stateUnitNoPopupGrid',
				plugins: [
	    		          'gridexporter',
	    		          'gridfilters',
	    		          'clipboard'
	    		],
	    		bind: {
	    			store: '{unitNoList}'
	    		},
	    		selModel: {
					type: 'spreadsheet',
					cellSelect: false,
					listeners: {
	    	            select: 'onChecked',
	    	            deselect:'onChecked'
	    	        }
				},
				selType: 'checkboxmodel',
				checkOnly: false,
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: [
	            	{
	            		header:  ViewUtil.getLabel('chk'),
	            		reference: 'refChkUnitNo',
			            xtype: 'checkcolumn',
			            dataIndex: 'chk',
			            width: 40,
			            defaultType: 'integer'
			        },
			        {
			        	header:  ViewUtil.getLabel('unitNo'),
			        	dataIndex: 'cd',
			        	reference: 'refCd',
			        	filter: 'string',
			        	width: 150
			        },
			        {
			        	header:  ViewUtil.getLabel('yardLocation'),
			        	dataIndex: 'yardLoc',
			        	reference: 'refYardLoc',
			        	filter: 'string',
			        	width: 300
			        }]
				}
		    }],
		    
		    dockedItems: [{
		    	xtype: 'toolbar',
				defaults: {
					labelAlign: 'right'
				},
				items: [
				{
					xtype: 'container',
					layout:{
						type: 'hbox'
					},
					defaults : {
	   					width : 300,
	   					labelAlign : 'right',
	   					labelWidth : 100
					},
					items: [
					{
						xtype: 'textfield',
						fieldLabel: ViewUtil.getLabel('unitNo'),
                		width:290,
                		reference: 'refUnitNo',
                		margin: '0 5 0 5',
                		bind: '{theSearch.vslManifestNo}',
					},{
	 					xtype: 'button',
	 					text: ViewUtil.getLabel('search'),
						iconCls: 'x-fa fa-search',
						width:120,
						cls: 'search-button', 
	 					reference:'refBtnRetrieve',
	 					margin: '0 5 0 5',
	 					listeners: {
	 						click: 'onLoad'
	 					}
					},{
	 					xtype: 'button',
	 					text: ViewUtil.getLabel('ok'),
	 					width:120,
	 					margin: '0 5 0 5',
	 					reference:'refBtnOK',
	 					listeners: {
	 						click: 'onUpdate'
	 					}
					}]
				}]
			}]
		});
		
		me.callParent();
	}
});

