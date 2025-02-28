Ext.define('MOST.view.popup.DeliveryPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-deliverypopup',
	requires: [
		'MOST.view.popup.DeliveryPopupModel',
		'MOST.view.popup.DeliveryPopupController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	title:"Delivery Code",
	width: 622,
	height: 550,

	controller: 'deliverypopup',
	
	viewModel: {
		type: 'deliverypopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	config: {
		recvData: null
	},
	lblCk: {type: 'bundle', key: 'fnChk'},
	lblScd: {type: 'bundle', key: 'scd'},
	lblScdNm: {type: 'bundle', key: 'scdNm'},

	btnApply: {type: 'apply', key: 'set'},
	btnClear: {type: 'bundle', key: 'clear'},

	layout : {type  : 'vbox', align : 'stretch'},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refCommonCodeForMultiPopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'deliveryList',	
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
				stateId : 'stateCommonCodeForMultiPopupGrid',
				plugins: [
	    		          'gridexporter',
	    		          'gridfilters',
	    		          'clipboard'
	    		],
	    		bind: {
	    			store: '{' + me.MAIN_STORE_NAME + '}'
	    		},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: [
	            	{
	            		header: me.lblCk,
	            		reference: 'refChkCommonCodeForMulti',
			            xtype: 'checkcolumn',
			            dataIndex: 'chkCdNm',
			            width: 46,
			            defaultType: 'integer',
			            listeners: {
    		                checkchange: 'onCommonCodeForMultiCheckChange'
    		            }
			        },
			        {
			        	header: me.lblScd,
			        	dataIndex: 'cd',
			        	reference: 'refScd',
			        	filter: 'string',
			        	width: 100
			        },
			        {
			        	header: me.lblScdNm,
			        	dataIndex: 'cdNm',
			        	reference: 'refScdNm',
			        	filter: 'string',
			        	align: 'left',
			        	width: 305
			        },
			       ]
				}
		    }],
		    
		    dockedItems: [{
		    	xtype: 'toolbar',
		    	docked: 'bottom',
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
					items: [{xtype: 'textfield',
							reference: 'refCdtxt'},
						{
							xtype: 'button',
							text: 'Apply',
							width: 99,
							height: 33,
							name: 'btnCdTypeApply',
							margin: '0 5 0 5',
							listeners:{
								click:'onUpdate'
							}
						},{
							xtype: 'button',
							text: 'Set',
							width: 99,
							height: 33,
							name: 'btnCdTypeSet',
							margin: '0 5 0 0',
							listeners:{
								click:'onSet'
							}
						},
						{
							xtype: 'button',
							text: me.btnClear,
							width: 92,
							height: 33,
							name: 'btnCdTypeClear',
							listeners:{
								click:'onClear'
							}
						}]
				}]
					
			}]
		});
		
		me.callParent();
	}
});

