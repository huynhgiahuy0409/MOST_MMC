Ext.define('MOST.view.popup.PartnerCdForGridPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-partnercdforgridpopup',
	requires: [
		'MOST.view.popup.PartnerCdPopupModel',
		'MOST.view.popup.PartnerCdForGridPopupController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	title:"Partner Type Info List",
	width: 437,
	height: 360,
	
	controller: 'partnercdforgridpopup',
	
	viewModel: {
		type: 'partnercdpopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	lblNo: {type: 'bundle', key: 'gridNo'},
	lblPtyCd: {type: 'bundle', key: 'ptnrCode'},
	lblPtyDivCd: {type: 'bundle', key: 'ptyDivCd'},
	lblPtyDivName: {type: 'bundle', key: 'ptyDivName'},
	lblEngPtyNm: {type: 'bundle', key: 'ptnrName'},
	
	btnSearch: {type: 'bundle', key: 'search'},

	layout : {type  : 'vbox', align : 'stretch'},


	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refPartnerCdForGridPopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'partnerCdPopupStore',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	initComponent: function() {

		var me = this;
		
		Ext.apply(me, {
			items: [{
				xtype: 'tsb-datagrid',
				usePagingToolbar : false,
				reference: me.MAIN_GRID_REF_NAME,
				flex : 1,
				stateful : true,
				stateId : 'statePartnerCdForGridPopupGrid',
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
	            	items: [
            		{
            			header: me.lblPtyCd,
            			dataIndex: 'ptnrCode',
            			reference: 'refPtyCd',
            			filter: 'string',
            			width: 80
            		},
            		{
            			header: me.lblPtyDivCd,
            			dataIndex: 'ptnrType',
            			reference: 'refPtyDivCd',
            			filter: 'string',
            			width: 0,
            			hidden: true
            		},
            		{
            			header: me.lblEngPtyNm,
            			dataIndex: 'ptnrName',
            			reference: 'refEngPtyNm',
            			filter: 'string',
            			align: 'left',
            			width: 285
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
	   					value : 'CD',
	   					editable: false,
	   					allowBlank: true
					},
					{
						xtype:'textfield',
						reference:'txtPtyCd',
						maxLength: 10,
						enforceMaxLength: true,
						margin: '0 5 0 5',
						name: 'ptnrCode',
						width: 180,
						allowBlank: false,
						listeners:{
							change: function(){
								var me = this;
								me.setValue(this.getValue().toUpperCase());
							}
						}

					},
					{
						xtype: 'button',
						text: me.btnSearch,
						width: 100,
						height: 33,
						name: 'btnPartnerTypeInfoPopup',
						iconCls: 'x-fa fa-search',
						listeners:{
							click:{
								fn: 'onSearch',
								args: ['this']
							}
						}
					}]
				}]
			}]
			
		});
		
		me.callParent();
	}
});

