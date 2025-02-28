Ext.define('MOST.view.popup.GroupListPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-grouplistpopup',
	requires: [
		'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	title:"Group Inquiry",
	width: 800,
	height: 600,
	
	controller: 'grouplistpopup',
	
	viewModel: {
		type: 'grouplistpopup'
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
	MAIN_GRID_REF_NAME: 'groupListPopupRef',				// Main Grid Name 
	MAIN_STORE_NAME: 'groupList',	
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
				stateId : 'groupListPopupGrid',
				plugins: [
	    		          'gridexporter',
	    		          'gridfilters',
	    		          'clipboard'
	    		],
	    		bind: {
	    			store: '{' + me.MAIN_STORE_NAME + '}'
	    		},
				listeners: {
					celldblclick: 'onSelectGrp'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: [	
	            		{	        
		            		xtype: 'rownumberer',
		            		locked: true,
		    				lockable: false,
		    				hideable: false,
		            		header: 'No.',
		            		width : 50		            		
		            	},
		            	{		            	
		            		header: ViewUtil.getLabel('grpCd'),
		            		dataIndex: 'authGrp',
		            		width: 130		            		
		            	}, 	
						{
							header: ViewUtil.getLabel('grpNm'),
							dataIndex: 'authGrpName',
							width: 130
						 }
		            	]
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
						  xtype: 'textfield',
						  fieldLabel: 'Group Code',
						  reference: 'txtAuthGrpId',
						  listeners:{
								change: function(){
									this.setValue(this.getValue().toUpperCase());
								}
							}
					}, {
						  xtype: 'textfield',
						  fieldLabel: 'Group Name',
						  margin: '0 5 0 5',
						  reference: 'txtAuthGrpNmId'
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

