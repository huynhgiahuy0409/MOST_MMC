Ext.define('MOST.view.planning.Mega', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-mega',
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	controller: 'mega',
	
	detailViewAlias: 'app-megadetail',
	
	viewModel: {
		type: 'mega'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refMegaRequisitionGrid',
	MAIN_STORE_NAME: 'megaRequisition',	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				flex : 1,
				margin: '0 5 0 0',
				stateful : true,
				stateId : 'stateMegaRequisitionGrid',
				plugins: [
	    		          'gridexporter',
	    		          'gridfilters',
	    		          'clipboard'
	    		],
	    		bind: {
	    			store: '{' + me.MAIN_STORE_NAME + '}'
	    		},
	    		selModel: {
		            type: 'checkboxmodel',  
		            checkOnly: false,
					showHeaderCheckbox: true,
            	},
				listeners: {
					celldblclick: 'onDblClick',
					pagingSearch: 'onSearch'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items:GridUtil.getGridColumns('MegaRequisition')
				}
		    }],
		    
		    dockedItems: [{
                xtype: 'container',
				style: { "background-color":"white" },
				layout: {
					type : 'hbox',
				},
                defaults: {
                    margin: '5 5 0 0'
                },
                items: [
				{
					xtype: 'tbfill'
				},{
                    xtype: 'button',
                    itemId: 'inquiryItemId',
                    reference:'refBtnRetrieve',
                    text: ViewUtil.getLabel('search'),
                    iconCls: 'x-fa fa-search',
                    cls: 'search-button', 
                    listeners: {
                        click: 'onSearchBtn'
                    }
                },{
                    
                    xtype: 'button',
                    itemId: 'createItemId',
                    reference:'refBtnCreate',
                    text: ViewUtil.getLabel('add'),
                    ui: 'create-button',
                    iconCls: 'x-fa fa-plus',
                    listeners: {
                        click: 'onAdd'
                    }
                },{
                    xtype: 'button',
                    itemId: 'deleteItemId',
                    reference:'refBtnDelete',
                    text: ViewUtil.getLabel('remove'),
                    ui: 'delete-button',
                    iconCls: 'x-fa fa-minus',
                    listeners: {
                        click: 'onRemove'
                    }
                },{
                    xtype: 'button',
                    itemId: 'previewItemId',
                    reference:'refBtnPreview',
                    text: ViewUtil.getLabel('preview'),
                    name: 'detailPreview',
                    cls: 'excel-button',
                    iconCls: 'fa fa-file-pdf-o',
                    listeners:{
						click:'onMegaPreviewPDF'
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
				},
			]
            },{
				xtype: 'toolbar',
				enableOverflow: true,
				padding : '0 0 0 0',
				defaults: {
					labelAlign: 'right',
				},
				items: [{
					xtype:'searchfieldset',
					margin: '0 5 0 0',
					title: ViewUtil.getLabel('search'),
					autoScroll: true,
					collapsible:true,
					layout:{
						type:'vbox',
						align:'stretch'
					},
					defaults:{
						margin: '0 0 5 0'
					},
					flex: 1,
					items: [{ //Row 1
						xtype: 'container',
						layout: {
							type: 'hbox'
						},
						defaults: {
							labelAlign: 'right',
							margin: '0 0 0 0'
						},
						items:[
							{
								xtype: 'shipcallnofield',
								reference: 'ctlScn',
								width: 295,
								fieldLabel: ViewUtil.getLabel('shipCallNo'),
								labelWidth: 70,
								bind: {
									value: '{theSearch.scn}',
								},

							},
							{
								xtype: 'partnercdfield',
								labelWidth: 40,
								fieldStyle: 'background-color: #ffccff;',
								width: 295,
								fieldLabel: ViewUtil.getLabel('sa'),
								reference: 'ctlSa',
								params: {
									ptnrType: CodeConstants.MT_PTNRTP_SHA
								},
								bind: {
									value: '{theSearch.saId}'
								}
							},
							{
								reference: 'ctlServiceDate',
								xtype: 'datefield',
								labelWidth: 100,
								width: 200,
								fieldLabel: ViewUtil.getLabel('workYmd'),
								format: MOST.config.Locale.getShortDate(),
								listeners: {
									change: 'onServiceDateChange'
								}
							},
						{
							xtype:'cmmcdfield',
							labelWidth: 80,
							width:230,
							fieldLabel: ViewUtil.getLabel('commodity'),
							reference:'ctlCommodity',
							fieldStyle: 'background-color: #ffccff;',
							params:{
								searchType : 'CMDT'
							},
							bind: {
								value: '{theSearch.cmdt}'
							}
						},{
							reference: 'ctlShiftCombo',
							xtype: 'combo',
							labelWidth: 80,
							width: 230,
							fieldLabel: ViewUtil.getLabel('shift'),
							queryMode: 'local',
							bind: {
								store: '{megaRequisitionShiftCombo}',
								value: '{theSearch.shftId}'
							},
							displayField: 'shftNm',
							valueField: 'shftId',
							value : '',
							editable: false,
							allowBlank: true
						}]
					},{//Row 2
						xtype: 'container',
						layout: {
							type: 'hbox'
						},
						defaults: {
							labelAlign: 'right',
							margin: '0 0 0 0'
						},
						items:[
							{
								xtype: 'vesselcalllistfield',
								width: 295,
								fieldLabel: ViewUtil.getLabel('vessel'),
								labelWidth: 70,
								allowBlank: false,
								reference: 'ctlJpvc',
								bind: {
									value: '{theSearch.vslCallId}'
								}
							},
							{
							reference: 'ctlFromDt',
							xtype: 'datefield',
							labelWidth: 40,
							width: 170,
							/*allowBlank: false,*/
							fieldLabel: ViewUtil.getLabel('eta'),
							format: MOST.config.Locale.getShortDate(),
							listeners: {
								change: 'onDateChange'
							},
							editable: false
						},{
							reference: 'ctlToDt',
							xtype: 'datefield',
							width : 120,
							margin: '0 0 0 5',
							/*allowBlank: false,*/
							format: MOST.config.Locale.getShortDate(),
							listeners: {
								change: 'onDateChange'
							},
							editable: false
						},{
							reference: 'ctlDeploymentCombo',
							xtype: 'combo',
							labelWidth:100,
							width:200,
							fieldLabel: ViewUtil.getLabel('deploymentYn'),
							queryMode: 'local',
							bind: {
							 	store: '{megaRequisitionDeploymentCombo}',
								value: '{theSearch.depyYn}'
							},
							displayField: 'scdNm',
							valueField: 'scd',
							value : '',
							editable: false,
							allowBlank: true
						},{
							xtype:'textfield',
							reference:'ctlMegaNo',
							fieldLabel: ViewUtil.getLabel('megaNo'),
							labelWidth:80,
							width: 230,
							fieldStyle: 'text-transform:uppercase',
							listeners:{
								change: 'onUpperCase'
							},
							bind: {
								value: '{theSearch.megaNo}'
							}
						},{
							reference: 'ctlPurposeCombo',
							xtype: 'combo',
							labelWidth: 80,
							width:230,
							fieldLabel: ViewUtil.getLabel('purpose'),
							queryMode: 'local',
							bind: {
								store: '{megaRequisitionPurposeCombo}',
								value: '{theSearch.purpTpCd}'
							},
							displayField: 'scdNm',
							valueField: 'scd',
							value : '',
							matchFieldWidth: false,
							editable: false,
							allowBlank: true
						},{
							reference: 'ctlMegaStatusCombo',
							xtype: 'combo',
							labelWidth:90,
							width:255,
							fieldLabel: ViewUtil.getLabel('megaStatus'),
							queryMode: 'local',
							bind: {
							 	store: '{megaRequisitionMegaStatusCombo}',
								value: '{theSearch.statCd}'
							},
							displayField: 'scdNm',
							valueField: 'scd',
							value : '',
							editable: false,
							allowBlank: true
						}]
					}]
				}]
            }]
		});
		
		me.callParent();
	}
});

