Ext.define('MOST.view.popup.TenantPartnerCdTypePopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-tntpartnercdtypepopup',
	requires: [
	],
	
	title:"Partner Code Type List",
	width: 875,
	height: 400,

	controller: 'tntpartnercdtypepopup',
	
	viewModel: {
		type: 'tntpartnercdtypepopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	config:{
		ptnrType: ''
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refPayerCdTypePopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'ptnrListPopupStore',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {

		var me = this;
		
		Ext.apply(me, {
			items: [{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				usePagingToolbar : false,
				flex : 1,
				stateful : true,
				stateId : 'statePayerCdTypePopupGrid',
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
	            	items: GridUtil.getGridColumns('PartnerTypeCode')
				}
		    }],
		    
		    dockedItems: [{
		    	xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right',
					labelWidth:80,
				},
				items: [
				{
					xtype: 'searchfieldset',
					flex: 1,
					layout:{
						type: 'hbox',
					     align: 'stretch'
					},
					items: [
					{
	   					xtype: 'combo',
	   					reference: 'ctlPtnrTypeCombo',
	   					fieldLabel: ViewUtil.getLabel('ptyDivName'),
	   					labelWidth:35,
	   					width: 200,
	   					queryMode: 'local',
	   					bind: {
	    	    			store: '{ptnrTypeComboStore}',
	    	    			value: '{theSearch.ptnrType}'
	    	    		},
	   					displayField: 'scdNm',
	   					valueField: 'scd',
						queryMode: 'local',
	   					value : '',
	   					emptyText : ViewUtil.getLabel('select'),
	   					editable: false,
	   					allowBlank: true,
	   					margin: '5 5 0 0'
					},
					{
	   					xtype: 'combo',
	   					reference: 'ctlCdNmCombo',
	   					width:100,
	   					queryMode: 'local',
	   					bind: {
	    	    			store: '{codeNameComboStore}'
	    	    		},
	   					displayField: 'comName',
	   					valueField: 'comCode',
	   					value : 'NM',
	   					editable: false,
	   					allowBlank: true,
	   					margin: '5 5 0 0'
					},
					{
						xtype:'textfield',
						reference:'txtPayerCdNm',
						maxLength: 10,
						inputType: 'search',
						enforceMaxLength: true,
						margin: '5 5 0 0',
						width: 150,
						allowBlank: true,
						listeners:{
							change: function(){
								var me = this;
								me.setValue(this.getValue().toUpperCase());
							}
						}
					},
					{
						xtype: 'button',
						text: ViewUtil.getLabel('search'),
						reference: 'refsSearch',
						width: 100,
						height: 20,
						name: 'btnPayerCdTypePopup',
						iconCls: 'x-fa fa-search',
						margin: '5 5 0 0',
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

