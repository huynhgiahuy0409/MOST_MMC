Ext.define('MOST.view.popup.DriverListPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-driverlistpopup',
	requires: [],
	
	title:"Driver List Popup",
	width: 523,
	height: 360,
	
	controller: 'driverlistpopup',
	
	viewModel: {
		type: 'driverlistpopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},

	layout : {type  : 'vbox', align : 'stretch'},

	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refDriverListPopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'driverListPopup',	
	COMBO_BOX_STORE :'driverListPopupSearchCombo',
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
	            		header: ViewUtil.getLabel('gridNo'),
	            		xtype: 'rownumberer',
	            		width : 50,
	            		align : 'center'
            		},
            		{
            			header: ViewUtil.getLabel('LADriverIC'),
            			dataIndex: 'driverId',
            			reference: 'refScd',
            			filter: 'string',
            			width: 150
            		},
            		{
            			header: ViewUtil.getLabel('LADriverNm'),
            			dataIndex: 'driverName',
            			reference: 'refScdNm',
            			align: 'left',
            			filter: 'string',
            			width: 300
            		},
            		{
            			header: ViewUtil.getLabel('ptnrCd'),
            			dataIndex: 'ptnrCode',
            			reference: 'refCmdtCd',
            			filter: 'string',
            			width: 150,
            		},
            		{
            			header: ViewUtil.getLabel('companyName'),
            			dataIndex: 'transportName',
            			reference: 'refCmdtName',
            			filter: 'string',
            			width: 150,
            		}]
				},
				
				viewConfig: {
					loadMask: true 
				},
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
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
					{
						xtype: 'combo',
						reference: 'ctlCdNmCombo',
						queryMode: 'local',
						width:100,
	   					bind: {
	    	    			store: '{driverListPopupSearchCombo}',
	    	    			value:'{theSearch.reqType}',
	    	    		},
	    	    		displayField: 'comName',
	    	    		valueField: 'comCode'
					},{
						xtype:'textfield',
						reference:'txtSearchCommonCdNm',
						maxLength: 20,
						enforceMaxLength: true,
						margin: '0 5 0 5',
						width: 180,
						fieldStyle : 'text-transform: uppercase',
						listeners:{
							change: function(){
								var me = this;
								me.setValue(this.getValue().toUpperCase());
							}	
						}
					},{
						xtype: 'button',
						text: ViewUtil.getLabel('search'),
						width: 100,
						height: 28,
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

