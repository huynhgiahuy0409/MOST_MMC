Ext.define('MOST.view.billing.PartnerTariffRate', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-partnertariffrates',
	requires: [
		'MOST.view.billing.PartnerTariffRateModel',
		'MOST.view.billing.PartnerTariffRateController',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	detailViewAlias: 'app-partnertariffratedetail',
	controller: 'partnertariffrates',
	
	viewModel: {
		type: 'partnertariffrates'
	},
	
	listeners:{
		afterrender: 'onLoad',
		
	},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refPartnerTariffRateGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'partnertariffrateList',        // Main Store Name
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
				reference: 'refPartnerTariffRateGrid',
				flex : 1,
				stateful : true,
				stateId : 'statePartnerTariffRateGrid',
				plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
	    		],
	    		margin: '5 5 5 0',
	    		bind: {
	    			store: '{' + me.MAIN_STORE_NAME + '}'	
	    		},
	    		selModel: {
					type: 'spreadsheet',
					cellSelect: false
				},
				listeners: {
					celldblclick: 'onDblClick'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'left'
					},
					items: GridUtil.getGridColumns('PartnerTariffRates')
				}
		    }],
		    
		    dockedItems: [{
				xtype: 'container',
				style: { "background-color":"white" },
				flex: 1,
				layout: {
					type: 'hbox'
				},
				defaults: {
					margin: '5 5 0 0'
				},
				items: [{
					xtype: 'tbfill'
				},
				{
					xtype: 'button',
					reference:'refBtnRetrieve',
					text: ViewUtil.getLabel('search'),
					iconCls: 'x-fa fa-search',
					cls: 'search-button', 
					listeners: {
						click: 'onSearch'
					}
				},{
					xtype: 'button',
					reference:'refBtnCreate',
					text: ViewUtil.getLabel('add'), 
					ui: 'create-button',
					reference:'refBtnCreate',
					iconCls: 'x-fa fa-plus',
					listeners: {
						click: 'onAdd'
					}
				},{
					xtype: 'button',
					itemId: 'deleteButton',
					reference:'refBtnDelete',
					text: ViewUtil.getLabel('remove'), 
					ui: 'delete-button',
					iconCls: 'x-fa fa-minus',
					listeners: {
						click: 'onRemove'
					}
				},{
					xtype: 'button',
					itemId: 'exportToExcelButton',
					text: ViewUtil.getLabel('exportToExcel'),
					iconCls: 'excel-button-image', 
					cls: 'excel-button', 
					listeners: {
						click: {
							fn: 'onExportExcelPdfWithServer',
							args:[me.MAIN_GRID_REF_NAME, true]
						}
					}
				},{
					xtype: 'button',
					itemId: 'exportToPdfButton',
					text: ViewUtil.getLabel('exportToPdf'),
					iconCls: 'x-fa fa-file-pdf-o',
					cls: 'excel-button',
					listeners: {
						click: {
							fn: 'onExportExcelPdfWithServer',
							args:[me.MAIN_GRID_REF_NAME, false]
						}
					}
            	},{
					xtype: 'button',
					cls: 'column-setting-button',
					iconCls: 'x-fa fa-columns',
					text: ViewUtil.getLabel('column'),
					listeners: {
						click: 'onColumnSettingPopup',
						args: [me.MAIN_GRID_REF_NAME]
					}
            	}]
			},{
				xtype: 'toolbar',
				enableOverflow: true,
				padding : '0 5 0 0',
				defaults: {
					labelAlign: 'right',
					margin: '0 0 0 0'
            	},
				items: [{
					xtype: 'searchfieldset',
					title: ViewUtil.getLabel('search'),
					autoScroll: true,
					collapsible:true,
					flex:1,
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					defaults:{
						margin: '0 0 5 0'
					},
					items: [{
			            xtype: 'container',
			            flex: 1,
			            layout: {
			                type: 'hbox',
			                align: 'stretch'
			            }, 
			            defaults: {
	                        labelAlign: 'right',
	                        margin: '0 5 0 0'
	                    },
						items: [{
        					xtype: 'datefield',
        					reference: 'refPeDateFromDt',
        					id: 'refPeDateFromDt',
        					labelWidth: 50,
        					width: 180,
        					fieldLabel:  ViewUtil.getLabel('period'),
        					format: MOST.config.Locale.getShortDate(),
        					bind: '{theSearch.aplyYmd}',
        					listeners: {
		                    	focusleave: 'onAutoFillDate',
		                    	focusenter: 'onAutoSelect'
        					}
						},{	
							xtype: 'datefield',
                			reference: 'refPeDateToDt',
        			        id: 'refPeDateToDt',
        			        width: 130,
        			        format: MOST.config.Locale.getShortDate(),
        			        bind: '{theSearch.exprYmd}',
        			        listeners: {
		                    	focusleave: 'onAutoFillDate',
		                    	focusenter: 'onAutoSelect'
                			}
	                	},{
		   					xtype: 'combo',
		   					reference: 'ctlTrTypeCombo',
		   					id: 'comboTariff',
		   					labelWidth:80,
		   					width:250,
		   					fieldLabel:  ViewUtil.getLabel('tariffType'), 	
		   					queryMode: 'local',
		   					bind: {
		    	    			store: '{tariffCodeComboType}',
		    	    			value: '{theSearch.trfTpCd}'
		    	    		},
		    	    		displayField: 'scdNm',
		   					valueField: 'scd',
		   					forceSelection:true
		   				},{
							xtype:'textfield',
							reference:'cltPartnerCodetxf',
							fieldLabel: ViewUtil.getLabel('partnerCode'),
		   					labelWidth: 100,
							width: 240,
							emptyText: 'Partner Code',
							bind: '{theSearch.ptnrCd}',
							listeners:{
								change: 'onUpperCase'
							}
		   				},{
							xtype: 'button',
							text:  ViewUtil.getLabel('find'), 
							reference: 'refPartnerCode',
							listeners: {
								click: 'openPartnerCdTypePopup'
							}
						},{
							xtype: 'checkboxfield',
							reference: 'refExpireDtChk',
							boxLabel: ViewUtil.getLabel('expirePartner'),
							margin: '0 0 0 10',
							uncheckedValue: 'N',
							bind: '{theSearch.expireDtChk}',
	                        checked: false,
	                        listeners: {
								change: 'onExpiredPartnerSearch'
							}
						}]
					}]
				}]
			}]
		});
		
		me.callParent();
	}
});

