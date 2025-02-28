Ext.define('MOST.view.popup.PartnerCdForMultiPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-partnercdformultipopup',
	requires: [
		'MOST.view.popup.PartnerCdForMultiPopupModel',
		'MOST.view.popup.PartnerCdForMultiPopupController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	title:"Partner Code For Multi",
	width: 580,
	height: 550,

	controller: 'partnercdformultipopup',
	
	viewModel: {
		type: 'partnercdformultipopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	lblNo: {type: 'bundle', key: 'gridNo'},
	lblPartner: {type: 'bundle', key: 'partner'},
	lblCk: {type: 'bundle', key: 'userCheck'},
	lblCd: {type: 'bundle', key: 'cd'},
	lblCdNm: {type: 'bundle', key: 'cdNm'},

	btnSearch: {type: 'bundle', key: 'search'},
	btnUpdate: {type: 'bundle', key: 'update'},
	btnSet: {type: 'bundle', key: 'set'},
	btnClear: {type: 'bundle', key: 'clear'},

	layout : {type  : 'vbox', align : 'stretch'},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refTransporterCdTypePopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'partnerCdForMultiList',	
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
				stateId : 'stateTransporterCdTypePopupGrid',
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
	            		reference: 'refChkPtyCd',
			            xtype: 'checkcolumn',
			            dataIndex: 'chkTransportCd',
			            width: 60,
			            defaultType: 'integer',
			            listeners: {
    		                checkchange: 'onCheckChange'
    		            }
			        },
			        {
			        	header: me.lblCd,
			        	reference: 'refPtyCd',
			        	dataIndex: 'ptnrCode',
			        	filter: 'string',
			            width: 100
			        },
			        {
			        	header: me.lblCdNm,
			        	reference: 'refPtyCdNm',
			        	dataIndex: 'ptnrName',
			        	align: 'left',
			        	filter: 'string',
			            width: 345
			        }]
				}
		    }],
		    
		    dockedItems: [{
		    	xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right'
				},
				margin: '0 0 0 0',
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
	   					width:124,
	   					queryMode: 'local',
	   					margin: '0 5 0 10',
	   					bind: {
	    	    			store: '{partnerCdForMultiCdNmCombo}',
	    	    			value:'{theSearch.reqType}'
	    	    		},
	   					displayField: 'comName',
	   					valueField: 'comCode',
					},
					{
						xtype:'textfield',
						reference:'txtSearchKey',
						fieldStyle : 'text-transform: uppercase',
						maxLength: 10,
						width: 187,
						editable: true,
						enforceMaxLength: true,
						margin: '0 5 0 0'
					},
					{
						xtype: 'button',
						text: me.btnSearch,
						width: 100,
						name: 'btnTransporterCdTypePopupSearch',
						margin: '0 5 0 0',
						listeners:{
							click: 'onSearch'
						}
					},
					{
						xtype: 'button',
						text: me.btnUpdate,
						width: 91,
						name: 'btnTransporterCdTypePopupUpdate',
						listeners:{
							click:'onUpdate'
						}
					}]
				}]
			},
			{

		    	xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right'
				},
				margin: '0 0 0 0',
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
						xtype:'textfield',
						fieldLabel: me.lblPartner,
						reference:'txtPtyCds',
						margin: '0 5 0 0',
						name: 'ptnCds',
						width: 326,
						labelAlign: 'right',
	                    labelPad: 10,
	                    labelWidth: 130,
						editable: false
					},
					{
						xtype: 'button',
						text: me.btnSet,
						width: 99,
						name: 'btnTransporterCdTypePopupSet',
						margin: '0 5 0 0',
						listeners:{
							click:'onSet'
						}
					},
					{
						xtype: 'button',
						text: me.btnClear,
						width: 92,
						name: 'btnTransporterCdTypePopupClear',
						margin: '0 0 0 0',
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

