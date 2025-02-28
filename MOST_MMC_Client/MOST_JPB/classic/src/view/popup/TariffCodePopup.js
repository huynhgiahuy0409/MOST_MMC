Ext.define('MOST.view.popup.TariffCodePopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-tariffcodepopup',
	requires: [
		'MOST.view.billing.TariffCodePopupModel',
		'MOST.view.billing.TariffCodePopupController',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	title:"Tariff Code List",
	width: 1100,
	height: 550,
	
	controller: 'tariffcodepopup',
	
	viewModel: {
		type: 'tariffcodepopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},

	lblTariffType: {type: 'bundle', key: 'trfTpCd'},
	lblTariffCode: {type: 'bundle', key: 'trfCd'},
	lblSubTrfCd: {type: 'bundle', key: 'subTrfCd'},
	lblSSRTp: {type: 'bundle', key: 'ssrTp'},
	lblDescr: {type: 'bundle', key: 'descr'},
	lblIvUnit1: {type: 'bundle', key: 'ivUnit1'},
	lblIvUnit2: {type: 'bundle', key: 'ivUnit2'},
	lblIvUnit3: {type: 'bundle', key: 'ivUnit3'},
	lblCostCenter: {type: 'bundle', key: 'tariffCostCenter'},
	lblGSTType: {type: 'bundle', key: 'tarifftGSTType'},
	lblGSTValue: {type: 'bundle', key: 'tariffGSTValue'},
	lblSTDRate: {type: 'bundle', key: 'tariffCodeSTDRate'},
	lblBillingType: {type: 'bundle', key: 'billingtype'},
	lblSTDRate: {type: 'bundle', key: 'tariffCodeSTDRate'},
	lblBillingType: {type: 'bundle', key: 'billingtype'},
	lblStaffCode: {type: 'bundle', key: 'staffCode'},
	lblUpdateTime: {type: 'bundle', key: 'tariffUpdateTime'},

	btnAdd: {type: 'bundle', key: 'add'},
	btnSearch: {type: 'bundle', key: 'search'},
	btnCreateTariff: {type: 'bundle', key: 'createtariff'},
	
	config: {
		listData: null
	},
	
	layout:{
		type: 'vbox',
		align: 'stretch'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refTariffCodeGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'tariffCodeList',	
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
	    		selModel: {
					type: 'spreadsheet',
					cellSelect: false
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: [
	            	{
	            		header: 'CK',
	            		reference: 'refChkMulti',
			            xtype: 'checkcolumn',
			            dataIndex: 'chkCdNm',
			            width: 50,
			            defaultType: 'integer',
			            listeners: {
    		                checkchange: 'onMultiCheckChange'
    		            }
				    },{
	            		header: me.lblTariffCode,
	            		dataIndex: 'trfCd',
	            		reference: 'refTariffCode',
	            		filter: 'string',
	            		editable: false,
	            		width: 200
	            	},
	            	{
	            		header: me.lblSubTrfCd,
	            		dataIndex: 'subTrfCd',
	            		reference: 'ctlsubTrfCd',
	            		editable: false,
	            		width: 150,
	            		filter: 'string',
	            	},
	            	{
	            		header: me.lblTariffType,
	            		dataIndex: 'trfTpCd',
	            		reference: 'ctltrfTpCd',
	            		editable: false,
	            		width: 150
	            	},
	            	{
	            		header: me.lblSSRTp,
	            		dataIndex: 'ssrTpCd',
	            		reference: 'ctlSSRTp',
	            		editable: false,
	            		width: 150
	            	},
	            	{
	            		header: me.lblDescr,
	            		dataIndex: 'descr',
	            		reference: 'ctldescr',
	            		editable: false,
	            		width: 300
	            	},
	            	{
	            		header: me.lblIvUnit1,
	            		dataIndex: 'ivUnit1',
	            		reference: 'ctlivUnit1',
	            		editable: false,
	            		width: 100
	            	},
	            	{
	            		header: me.lblIvUnit2,
	            		dataIndex: 'ivUnit2',
	            		reference: 'ctlivUnit2',
	            		editable: false,
	            		width: 100
	            	},
	            	{
	            		header: me.lblIvUnit3,
	            		dataIndex: 'ivUnit3',
	            		reference: 'ctlivUnit3',
	            		editable: false,
	            		width: 100
	            	},{
	            		header: me.lblCostCenter,
       				    reference: 'refCostCenter',
       					dataIndex: 'costCntCd',
       					width: 100
					},{
	            		header: me.lblBillingType,
       				    reference: 'refBillingType',
       					dataIndex: 'billTpCd',
       					width: 100
					},
            		{
	            		header: me.lblStaffCode,
       				    reference: 'refStaffCode',
       					dataIndex: 'staffCd',
       					width: 100
					},
            		{
	            		header: me.lblUpdateTime,
       				    reference: 'refUpdateTime',
       					dataIndex: 'updTime',
       					width: 100
					}]
				}
		    }],
		    dockedItems: [{
				xtype: 'toolbar',
				enableOverflow: true,
				layout: {
	                type: 'vbox',
	                align: 'stretch'
	            }, 
	            
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
		            defaults: {
                        labelAlign: 'right',
                        margin: '5 5 0 0',
                        editable: false
                    },
					items: [
					{
						reference: 'ctlsearchTariffCodeCombo',
	   					xtype: 'combo',
	   					labelWidth:70,
	   					width:300,
	   					fieldLabel: me.lblTariffType,
	   					queryMode: 'local',
	   					bind: {
	    	    			store: '{tariffCodeTypeCombo}'
	    	    		},
	    	    		displayField: 'scdNm',
	   					valueField: 'scd',
	   					value : '',
	   					editable: true,
	   					allowBlank: true,
	   					forceSelection:true,
						listeners: {
							change: 'onSearch'
						}
					},
                    {
                      	xtype : 'combobox',
						editable : false,
						reference : 'ctlCostCenterCondition',
						width : 200,
						fieldLabel : me.lblCostCenter,
						bind : {
							store : '{costCenterCombo}'
						},
						queryMode : 'local',
						displayField : 'scdNm',
						valueField : 'scd',
						editable : false,
						emptyText : 'Select',
						labelAlign : 'right',
						labelWidth: 80
                    },
                    {
						xtype : 'combobox',
						fieldLabel : me.lblBillingType,
						reference : 'ctlBillingType',
						queryMode : 'local',
						bind : {
							store : '{billingTypeCombo}'
						},
						displayField : 'scdNm',
						valueField : 'scd',
						value : '',
						width : 250
					},
    				{
						xtype: 'button',
						text:me.btnSearch,
						iconCls: 'x-fa fa-search',
						reference:'refRetrieve',
						listeners: {
							click: 'onSearch'
						}
					},
					{
						xtype: 'button',
						text: me.btnAdd,
						reference:'refAdd',
						ui: 'create-button',
						iconCls: 'x-fa fa-plus',
						listeners: {
							click: 'onAddTariff'
						}
					}]
				}]
			}]
		});
		me.callParent();
	}
});

