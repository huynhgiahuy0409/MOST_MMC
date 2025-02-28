Ext.define('MOST.view.popup.CountryCodePopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-countrycodepopup',
	requires: [
	],
	
	title:"Country Code Inquiry",
	controller: 'countrypopup',
	
	viewModel: {
		type: 'countrypopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	layout: {type: 'fit', align: 'stretch'},
	
	lblCountryCd: {type: 'bundle', key: 'countrycode'},
	lblCountryNm: {type: 'bundle', key: 'countryname'},
	lblSearch: {type: 'bundle', key: 'search'},
	width: 610,
	height: 400,
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refCountryPopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'countrylist',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items:[{
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
	    		selModel: {
					type: 'spreadsheet',
					cellSelect: false
				},
	    		listeners: {
	    			cellDblClick: 'dblclick'
	    		},
	    		columns: [
	    					{
	    						header: me.lblCountryCd,
	    						dataIndex: 'code',
	    						filter : 'string',
	    						width: 80,
	    					}, {
	    						header: me.lblCountryNm,
	    						dataIndex: 'codeName',
	    						filter : 'string',
	    						width: 300,
	    					}
	    				]
			}],
			dockedItems: [{
		    	xtype: 'toolbar',
				defaults: {
					labelAlign: 'right'
				},
				items: [
				{
					xtype: 'searchfieldset',
					flex: 1,
					layout: {
						type: 'hbox',
						align: 'stretch',
						labelAlign: 'right'
					},
                    defaults: {
                        labelAlign: 'right',
                        labelWidth: 100,
                        margin: '5 5 0 0'
                    },
					items: [
					{
						xtype: 'textfield',
						fieldLabel: me.lblCountryCd,
						fieldStyle: 'text-transform : uppercase',
						width: 210,
						reference: 'txtCountryCd',
						bind: '{theSearch.scd}'
					},{
						xtype: 'textfield',
						fieldLabel: me.lblCountryNm,
						width: 250,
						fieldStyle: 'text-transform : uppercase',
						reference: 'txtCountryNm',
						bind: '{theSearch.scdNm}'
					},{
						xtype: 'button',
						text:  me.lblSearch,
						width: 85,
						iconCls: 'x-fa fa-search',
						listeners: {
							click: 'onSearch'
						}
					}]
				}]
		    }]
		});
		
		me.callParent();
	}
});

