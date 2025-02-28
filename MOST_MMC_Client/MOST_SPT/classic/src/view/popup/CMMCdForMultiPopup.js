Ext.define('MOST.view.popup.CMMCdForMultiPopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.popup-cmmcdformultipopup',
	requires: [
		'MOST.view.popup.CMMCdForMultiPopupModel',
		'MOST.view.popup.CMMCdForMultiPopupController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	title:"Common Code For Multi",
	width: 622,
	height: 550,

	controller: 'cmmcdformultipopup',
	
	viewModel: {
		type: 'cmmcdformultipopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	lblCk: {type: 'bundle', key: 'fnChk'},
	lblScd: {type: 'bundle', key: 'scd'},
	lblScdNm: {type: 'bundle', key: 'scdNm'},
	lblCgTp: {type: 'bundle', key: 'cgTp'},
	lblCommoncodemultiCategory: {type: 'bundle', key: 'commoncodemultiCategory'},


	btnSearch: {type: 'bundle', key: 'search'},
	btnUpdate: {type: 'bundle', key: 'update'},
	btnSet: {type: 'bundle', key: 'set'},
	btnClear: {type: 'bundle', key: 'clear'},

	layout : {type  : 'vbox', align : 'stretch'},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refCommonCodeForMultiPopupGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'commonCodeMulti',	
	COMBO_STORE_NAME: 'codeMasterListCommodityCombo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
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
			        	dataIndex: 'code',
			        	reference: 'refScd',
			        	filter: 'string',
			        	width: 100
			        },
			        {
			        	header: me.lblScdNm,
			        	dataIndex: 'codeName',
			        	reference: 'refScdNm',
			        	filter: 'string',
			        	align: 'left',
			        	width: 305
			        },
			        {
			        	header: me.lblCgTp,
			        	dataIndex: 'cmmdTpCd',
			        	reference: 'refCgTp',
			        	filter: 'string',
			        	width: 150
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
	   					reference: 'ctlCargoType',
	   					queryMode: 'local',
	   					fieldLabel: me.lblCommoncodemultiCategory,
	   					labelAlign: 'right',
	   					labelWidth: 80,
	   					width:200,
	   					bind: {
	   						store: '{' + me.COMBO_STORE_NAME + '}'
	    	    		},
	   					displayField: 'scdNm',
	   					valueField: 'scd',
	   					value : '',
	   					editable: false
					},
					{
						xtype:'textfield',
						reference:'txtCargoTypeSearch',
						maxLength: 10,
						editable: true,
						enforceMaxLength: true,
						margin: '0 5 0 5',
						width: 187,
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
						margin: '0 5 0 0',
						listeners:{
							click:{
								fn: 'onSearch',
								args: ['this']
								
							}
						}
					},
					{
						xtype: 'button',
						text: me.btnUpdate,
						width: 91,
						height: 33,
						name: 'btnTransporterCdTypePopupUpdate',
						margin: '0 0 0 0',
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
	   					width:115,
	   					queryMode: 'local',
	   					margin: '0 0 0 85',
	   					bind: {
	    	    			store: '{codeNameCombo}'
	    	    		},
	   					displayField: 'comName',
	   					valueField: 'comCode',
	   					value : 'CD',
	   					editable: false,
					},
					{
						xtype:'textfield',
						reference:'txtSetCds',
						margin: '0 5 0 5',
						name: 'ptnCds',
						width: 187,
						editable: false
					},
					{
						xtype: 'button',
						text: me.btnSet,
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

