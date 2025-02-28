Ext.define('MOST.view.popup.PartnerCdPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-partnercdpopup',
	requires: [
		'MOST.view.popup.PartnerCdPopupModel',
		'MOST.view.popup.PartnerCdPopupController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	title:"Partner Code List",
	width: 558,
	height: 360,
	
	controller: 'partnercdpopup',
	
	viewModel: {
		type: 'partnercdpopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},

	config:{
		ptnrType: ''
	},
	
	lblNo: {type: 'bundle', key: 'gridNo'},
	lblPtyCd: {type: 'bundle', key: 'ptyCd'},
	lblPtyDivCd: {type: 'bundle', key: 'ptyDivCd'},
	lblPtyDivName: {type: 'bundle', key: 'ptyDivName'},
	lblEngPtyNm: {type: 'bundle', key: 'engPtyNm'},
	
	btnSearch: {type: 'bundle', key: 'search'},

	layout : {type  : 'vbox', align : 'stretch'},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refPartnerCdPopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'partnerCdPopupStore',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	initComponent: function() {

		var me = this;
		
		Ext.apply(me, {
			items: [{
				xtype: 'grid',
				reference: me.MAIN_GRID_REF_NAME,
				flex : 1,
				stateful : true,
				stateId : 'statePartnerCdPopupGrid',
				plugins: [
	    		          'gridexporter',
	    		          'gridfilters',
	    		          'clipboard'
	    		],
	    		bind: {
	    			store: '{' + me.MAIN_STORE_NAME + '}'
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
	            			header: me.lblNo,
	            			xtype: 'rownumberer',
	            			width : 50,
	            			align : 'center'
	            		},
	            		{
	            			header: me.lblPtyCd,
	            			dataIndex: 'ptnrCode',
	            			reference: 'refPtyCd',
	            			filter: 'string',
	            			width: 80
	            		},
	            		{
	            			header: me.lblPtyDivName,
	            			dataIndex: 'ptnrTpNm',
	            			reference: 'refPtyDivName',
	            			filter: 'string',
	            			width: 160
	            		},
	            		{
	            			header: me.lblEngPtyNm,
	            			dataIndex: 'ptnrName',
	            			reference: 'refEngPtyNm',
	            			filter: 'string',
	            			align: 'left',
	            			width: 245
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
	   					width:100,
	   					queryMode: 'local',
	   					bind: {
	    	    			store: '{partnerCdPopupSearchCombo}'
	    	    		},
	   					displayField: 'comName',
	   					valueField: 'comCode',
	   					value: 'CD',
	   					editable: false
					},
					{
						xtype:'textfield',
						reference:'txtPtyCd',
						maxLength: 10,
						enforceMaxLength: true,
						margin: '0 5 0 5',
						name: 'ptyCd',
						width: 180,
						allowBlank: false,
						listeners:{
							change: function(){
								var me = this;
								me.setValue(this.getValue().toUpperCase());
							},
							specialkey: function(field, e){
			                    if (e.getKey() == e.ENTER) {
			                    	me.getController().onSearch();
			                    }
			                }
						},
					},
					{
						xtype: 'button',
						text: me.btnSearch,
						width: 100,
						height: 28,
						name: 'btnPartnerTypeInfoPopup',
						iconCls: 'x-fa fa-search',
						margin: '0 0 0 0',
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

