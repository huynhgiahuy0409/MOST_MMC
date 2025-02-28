Ext.define('MOST.view.popup.CMMCdPopupMultiSelect', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-cmmcdpopupmultiselect',
	requires: [
	],
	
	title:"Common Code Popup",
	width: 523,
	height: 360,
	
	controller: 'cmmcdpopupmultiselect',
	
	viewModel: {
		type: 'cmmcdpopupmultiselect'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refCommonCodePopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'commonCodeMultiSelect',	
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
				stateId : 'stateCommonCodePopupGrid',
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
        				header: ViewUtil.getLabel('popuplistChk'),
        				xtype: 'checkcolumn',
        	        	dataIndex: 'chkLorryMulti',
        	        	width: 70,
        	        	defaultType: 'integer',
 			            listeners: {
     		               checkchange: 'onMultiCheckChange'
     		            }
        			},{
            			header: ViewUtil.getLabel('scd'),
            			dataIndex: 'code',
            			reference: 'refScd',
            			filter: 'string',
            			width: 150
            		},
            		{
            			header: ViewUtil.getLabel('scdNm'),
            			dataIndex: 'codeName',
            			reference: 'refScdNm',
            			align: 'left',
            			filter: 'string',
            			width: 300
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
					xtype: 'searchfieldset',
					flex: 1,
					layout: {
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
	    	    			store: '{commonCodePopupSearchCombo}'
	    	    		},
	    	    		displayField: 'comName',
	    	    		valueField: 'comCode',
	    	    		value : 'CD',
	    	    		editable: false,
	    	    		allowBlank: true
					},{
						xtype:'textfield',
						reference:'txtSearchCommonCdNm',
						maxLength: 20,
						enforceMaxLength: true,
						margin: '0 5 0 5',
						width: 180,
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
						height: 33,
						iconCls: 'x-fa fa-search',
						margin: '0 0 0 0',
						listeners:{
							click:'onSearch'
						}
					},{
						xtype: 'button',
						text: ViewUtil.getLabel('update'),
						width: 91,
						height: 33,
						name: 'btnUpdate',
						margin: '0 0 0 5',
						listeners:{
							click:'onUpdate'
						}
					}]
				}]
		    }]
		});
		
		me.callParent();
	}
});

