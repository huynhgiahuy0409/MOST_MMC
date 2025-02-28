Ext.define('MOST.view.vessel.VesselSchedule', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-vesselschedule',
	
	requires: [],
	
	controller: 'vesselscheduleregister',

	viewModel: {
		type: 'vesselscheduleregister'
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refVesselScheduleGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'vesselScheduleList',
	CONFIRM_STATES_STORE: 'confirmStates',
	FRESH_WATER_COMBO_STORE: 'freshWtCombo',
	CHANDLLING_COMBO_STORE: 'chandellingCombo',
	TERMINAL_COMBO_STORE: 'terminalCombo',
	QUANTITY_BUNKER_COMBO_STORE: 'qtyBunkerCombo',
	BERTH_WHARF_COMBO_STORE: 'berthWharfCombo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	listeners: {
		afterrender: 'onLoad'
	},
	
	layout : {type  : 'vbox', align : 'stretch'},
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [{
				xtype: 'tsb-datagrid',
				reference: me.MAIN_GRID_REF_NAME,
				flex: 1,
				stateId: 'stateVesselScheduleGrid',
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
					cellDblClick: 'onDblClick',
					pagingSearch: 'onSearch'
				},
				columns :{
					defaults: {
						style: 'text-align:center',
						align: 'center'
					},
					items: GridUtil.getGridColumns('VesselSchedule')
				}
			}],
			
			dockedItems: [{
                xtype: 'container',
                style: { "background-color":"white" },
                layout: {
                	type: 'hbox',
                },
                defaults: {
                    margin: '1 1 1 1'
                },
   				items: [{
					xtype: 'tbfill'
				},{
                    xtype: 'button',
                    itemId:'inquiryItemId',
                    reference: 'refBtnRetrieve',
                    text: ViewUtil.getLabel('search'),
                    iconCls: 'x-fa fa-search',
                    cls: 'search-button', 
                    listeners: {
                        click: 'onSearch'
                    }
                },{
                    xtype: 'button',
                    text: ViewUtil.getLabel('vslpatiRecopy'),
                    ui: 'create-button',
                    iconCls: 'x-fa fa-plus',
                    listeners: {
                        click: 'onCopy'
                    }
                },{
                	xtype: 'button',
					text: ViewUtil.getLabel('vslschlReSumit'),
					ui: 'delete-button',
					listeners: {
						click: 'onResubmit'
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
				xtype : 'toolbar',
				enableOverflow: true,
				padding : '0 0 0 0',
				defaults: {
					labelAlign: 'right',
				},
				items: [{
					xtype: 'searchfieldset',
					title: ViewUtil.getLabel('search'),
					autoScroll: true,
					collapsible:true,
					flex:1,
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults:{
						margin: '0 0 5 0'
					},
					items: [
						{
							xtype: 'container',
							//flex: 1,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							defaults: {
								labelAlign: 'right',
								width: 280,
								labelWidth: 80,
								margin: '5 0 0 0'
							},
							items: [
								{
									xtype: 'shipcallnofield',
									reference: 'ctlScn',
									//emptyText: ViewUtil.getLabel('shipCallNo'),
									fieldLabel: ViewUtil.getLabel('shipCallNo'),
									bind: {
										value: '{theSearch.scn}',
									},
									
								},
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('vslschCallId'),
									reference: 'txtVslCallId',
									bind: '{theSearch.vslCallId}',
									listeners:{
										change: 'onUpperCase'
									}
								},
								{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('vslschlImono'),
									bind: '{theSearch.imoNo}',
									reference: 'txtImono',
									listeners:{
										change: 'onUpperCase'
									}
								},
								{
									reference: 'ctrlConfirm',
									xtype: 'combo',
									fieldLabel: ViewUtil.getLabel('status'),
									emptyText: 'Select',
									bind:{
										store: '{' + me.CONFIRM_STATES_STORE + '}',
										value: '{theSearch.summitStt}'
									},
									queryMode:'local',
									displayField:'scdNm',
									valueField: 'scd'
								}
							]
						},
						{
							xtype: 'container',
							//flex: 1,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							defaults: {
								labelAlign: 'right',
								width: 400,
								labelWidth: 120,
								margin: '5 0 0 0'
							},
							items: [
								{
    								xtype: 'textfield',
    								fieldLabel: ViewUtil.getLabel('vslschlVslName'),
    								reference: 'txtVslNm',
    								bind: '{theSearch.vslNm}',
    								listeners:{
    									change: 'onUpperCase'
    								}
    							},
    							{
    	    						xtype:'container',
    	    						layout:{
    	    							type:'hbox'
    	    						},
    	    						defaults:{
    	    							labelAlign: 'right'
    	    						},
    	    						items:[
    	    							{
    	    								reference: 'ctlDateFromDt',
    	    								xtype: 'datefield',
    	    								fieldLabel: ViewUtil.getLabel('vslschlETA'),
    	    								labelWidth: 120,
    	    								width: 260,
    	    								bind: '{theSearch.eta}',
    	    								format: MOST.config.Locale.getShortDate()
    	    							},
    	    							{
    	    								reference: 'ctlDateToDt',
    	    								margin: '0 0 0 5',
    	    						        xtype: 'datefield',
    	    						        width: 135,
    	    						        anchor: '100%',
    	    						        bind: '{theSearch.etd}',
    	    						        format: MOST.config.Locale.getShortDate()
    	    						    }
    	    						]
    							},
    							{
    								reference: 'ctrlBerthLoc',
    								xtype: 'combo',
    								fieldLabel: ViewUtil.getLabel('vslschlBerthLoc'),
    								emptyText: 'Select',
    								bind: {
    									store: '{' + me.BERTH_WHARF_COMBO_STORE + '}'
    								},
    								displayField:'locNm',
    								valueField: 'locId',
    								queryMode:'local'
    							}
    							
							]
						},
						{
							xtype: 'container',
							//flex: 1,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							defaults: {
								labelAlign: 'right',
								width: 280,
								labelWidth: 120,
								margin: '5 0 0 0'
							},
							items: [
								{
									xtype: 'partnercdtypefield',
									fieldLabel: ViewUtil.getLabel('shippingAgent'),
									reference: 'txtSAgent',
				   					params:{
				   						ptnrType: CodeConstants.CM_PTNRTP_SHA
				   					},
									change: function (field, newValue) {
										field.setValue(newValue.toUpperCase());
									},
									editable: false
								},
								{
									xtype: 'checkboxfield',
									margin: '5 0 0 125',
					                boxLabel: ViewUtil.getLabel('vslschlShipPort'),
					                reference: 'chbShipPort',
					                name: 'vhfYn',
					                //boxLabelAlign: 'before',
					                inputValue: 'Y',
					                bind: '{theSearch.shipPort}'
								}
							]
						}
					]
				}]
			}]
		});
		
		me.callParent();
	}	
});