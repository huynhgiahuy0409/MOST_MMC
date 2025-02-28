Ext.define('MOST.view.operation.vsrchecklist.MechanicalEquipmentMega', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-mechanicalequipmentmega',
	
	requires: [
		'Ext.grid.plugin.Exporter',
		'Ext.grid.plugin.RowEditing',
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	ME_EQUIPMENT_MEGA_REF_NAME: 'refMegaMEGrid',
	ME_EQUIPMENT_MEGA_STORE_NAME: 'megaMEList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			items: [{
				xtype: 'container',
				layout: {
					type: 'hbox',
					align: 'stretch'
				},			
				items: [{
					xtype: 'fieldset',
					title: ViewUtil.getLabel('megaSum'),
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					flex: 1,
					margin: '0 0 0 0',
					items: [{
						xtype: 'combo',
						reference:'ctlMEPurpose',
						fieldLabel: ViewUtil.getLabel('purpose'),
						labelWidth: 50,
						width:300,
						align : 'left',
						bind: {
							store: '{purposeCombo}'
						},
						editable: false,
						displayField: 'scdNm',
						valueField: 'scd',
						queryMode: 'local',
						value: '',
						listeners: {
							select : 'onChangeMEPurpose'
						}
					},{
						xtype: 'panel',
						layout: 'fit',
						flex: 1,
						items: [{
							xtype: 'tsb-datagrid',
							reference: me.ME_EQUIPMENT_MEGA_REF_NAME,
							flex: 1,
							stateful : true,
		    				stateId : 'stateMegaMEGrid',
		    				usePagingToolbar : false,
							plugins: [
								'gridexporter',
								'gridfilters',
								'clipboard'
							],
							bind: {
								store: '{' + me.ME_EQUIPMENT_MEGA_STORE_NAME + '}'
							},
							selModel: {
								type: 'spreadsheet',
								cellSelect: false
							},
							listeners : {
								cellclick: 'onForkliftDevploymentGridClick'
							},
							
							columns: {
								defaults: {
									style : 'text-align:center',
									align: 'center'
								},
								items: GridUtil.getGridColumns('VSRMechanicalEquipmentMega')
							}
						}]
					}]
				},{
					xtype: 'fieldset',
					title: 'Detail',
					layout: {
						type: 'vbox'
					},
					padding : '3 3 3 3',
					margin: '0 0 0 5',
					items: [{
						xtype: 'container',
						layout: {
							type: 'hbox',
						},
						items:[{
							xtype: 'container',
							layout: {
								type: 'vbox',
							},
							defaults: {
								labelAlign: 'right',
								labelWidth: 90,
								margin: '2 0 0 0'
							},
							items: [{
								xtype: 'container',
								layout: {
									type: 'hbox',
								},
								defaults: {
									labelAlign: 'right',
									labelWidth: 90,
									margin: '2 0 0 0'
								},
								items:[{
									xtype:'textfield',
									reference:'ctlMEEquipmentCode',
									fieldLabel: ViewUtil.getLabel('vsrEQType'),
									allowBlank: false,
									editable:false,
									width: 250,
									margin: '0 0 0 0'
				   				},
				   				{
									xtype: 'button',
									iconCls: 'x-fa fa-search',
									margin: '0 0 0 2',
									listeners:{
										click:'openMEEquipmentCdPopup'
									}
				   				},
				   				{
									xtype:'textfield',
									reference:'ctlMEEquipmentName',
									fieldLabel: ViewUtil.getLabel('vsrEQType'),
									hidden :true,
									width: 250,
				   				},
				   				{
									xtype:'textfield',
									reference:'ctlMEEquipmentType',
									fieldLabel: ViewUtil.getLabel('vsrEQType'),
									hidden :true,
									width: 250,
				   				}]
							},{
								xtype: 'numberfield',
								anchor: '100%',
								value: 0,
								maxValue: 9999,
								minValue: 0,
								reference:'ctlMENos',
								fieldStyle: 'background-color: #66ff99;',
								fieldLabel: ViewUtil.getLabel('nos'),
								width: 220,
			   				},{
								xtype: 'textfield',
								reference: 'refMEWONo',
								fieldLabel: ViewUtil.getLabel('vsrWONo'),
								fieldStyle: 'text-transform:uppercase; background-color: #66ff99;',
								listeners:{
			   						change: 'onUpperCase'
			   					},
								width:250,
							},{
								xtype:'combo',
								reference:'refMEWorkingArea',
								fieldLabel: ViewUtil.getLabel('vsrWorkingArea'),
								bind: {
									store: '{workAreaCombo}'
								},
								displayField: 'scdNm',
								valueField: 'scd',
								queryMode: 'local',
								editable: false,
								emptyText: 'Select',
								allowBlank: false,
								forceSelection: true,
								listeners: {
									change : 'onChangeMEWorkArea'
								},
								width: 250
			   				},{
								xtype:'combo',
								reference:'refMEWorkLocCd',
								labelAlign: 'right',
								displayField: 'cdNm',
								valueField: 'cd',
								queryMode: 'local',
								editable: false,
								emptyText: 'Select',
								allowBlank: false,
								margin: '2 0 0 95',
								forceSelection: true,
								width: 155
			   				},{
								xtype: 'container',
								layout: {
									type: 'hbox',
								},
								items: [{
									xtype : 'radiogroup',
									reference : 'ctl_GroupME',
									layout : {
										type : 'vbox',
										align : 'stretch'
									},
									padding : '3 3 3 3',
									listeners: {
										change: 'onChangeGroupME'
									},
									items : [{
										xtype : 'radiofield',
										reference : 'ctlMEContractor',
										name: 'gr',
										inputValue: 'contractor',
										margin : '2 0 0 0',
										checked : true,
										boxLabel : ViewUtil.getLabel('contractor')
									},{
										xtype : 'radiofield',
										reference : 'ctlMEShipCrew',
										name: 'gr',
										margin : '2 0 0 0',
										inputValue: 'shipCrew',
										checked : false,
										boxLabel : ViewUtil.getLabel('vsrShipCrew')
									}]
								},{
									xtype: 'container',
									layout: {
										type: 'vbox',
									},
									items : [{
										xtype: 'container',
										layout: {
											type: 'hbox',
										},
										items:[
											{
							   					xtype:'partnercdfield',
							   					reference:'refMEContractorCd',
							   					width:150,
							   					fieldLabel: '',
							   					params:{
							   						ptnrType: CodeConstants.CM_PTNRTP_CTT	//Contractor
							   					}
							   				}
										]
									}]
								}]
							}]
						},{
							xtype: 'container',
							layout: {
								type: 'vbox',
							},
							defaults: {
								labelAlign: 'right',
								labelWidth: 110,
								margin: '2 0 0 0'
							},													
							items: [{
								xtype: 'combo',
								reference:'refMECargoType',
								fieldLabel: ViewUtil.getLabel('cargoTp'),
								allowBlank: false,
								width:260,
								bind: {
									store: '{cargoCombo}'
								},
								displayField: 'scdNm',
			   					valueField: 'scd',
			   					queryMode: 'local',
			   					editable: false,
		   						value : ''
							},{
								xtype: 'container',
								layout: {
									type: 'hbox',
								},
								defaults: {
									labelAlign: 'right',
									labelWidth: 110,
									margin: '0 0 0 0'
								},	
								items: [
									{
					   					xtype:'partnercdtypefield',
										width: 260,
					   					fieldLabel:ViewUtil.getLabel('requestor'),
					   					allowBlank: false,
					   					reference:'refMERequestor',
					   					params:{
					   						ptnrType: CodeConstants.CM_PTNRTP_RQT	//Requestor
					   					}
					   				}
				   				]
							},{
								xtype: 'container',
								layout: {
									type: 'hbox',
								},
								hidden: true,
								defaults: {
									labelAlign: 'right',
									labelWidth: 110,
									margin: '2 0 0 0'
								},	
								items: [{
									xtype: 'label',
									margin: '2 0 0 30',
									width: 50,
									html: ViewUtil.getLabel('refNo')
								},{
									xtype : 'radiogroup',
									reference : 'ctl_ME_RefNo',
									layout : {
										type : 'vbox',
										align : 'stretch'
									},
									padding : '3 3 3 3',
									margin : '0 0 0 0',
									items : [{
										xtype : 'radiofield',
										name: 'rfNo',
										margin: '2 0 0 15',
										inputValue: 'Y',
										reference : 'ctlMECmbRef',
										checked : false,
									},
									{
										xtype : 'radiofield',
										name: 'rfNo',
										inputValue: 'N',
										margin: '2 0 0 15',
										reference : 'ctlMETxtRef',
										checked : false,
									}]
								},{
									xtype: 'container',
									layout: {
										type: 'vbox',
									},
									defaults: {
										labelAlign: 'right',
										labelWidth: 110,
										margin: '2 0 0 0'
									},	
									items : [{
										xtype: 'textfield',
										margin: '2 0 0 0',
										reference:'refMECmbRefNo',
										width: 140,
										editable: false,
										value : ''
									},
									{
										xtype: 'textfield',
										margin: '2 0 0 0',
										reference: 'refMETxtRefNo',
										editable: false,
										width: 140
									}]
								}]
							},{
								reference: 'refMechanicalEqEQArrTime',
								margin: '2 0 0 0',
								width:260,
								xtype: 'datetimefield',
								allowBlank: false,
								fieldLabel: ViewUtil.getLabel('vsrEQArrTime'),
								anchor: '100%',
								editable:false,
								format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
							},{
								reference: 'refMechanicalEqStartTime',
								margin: '2 0 0 0',
								width:260,
								xtype: 'datetimefield',
								allowBlank: false,
								fieldLabel: ViewUtil.getLabel('startTime'),
								anchor: '100%',
								editable:false,
								format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
							},{
								reference: 'refMechanicalEqEndTime',
								margin: '2 0 0 0',
								width:260,
								xtype: 'datetimefield',
								allowBlank: false,
								fieldLabel: ViewUtil.getLabel('endTime'),
								editable:false,
								format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
							},{
								xtype: 'textfield',
								margin: '2 0 0 0',
								reference: 'refMERemarks',
								fieldLabel: ViewUtil.getLabel('remarks'),
								fieldStyle: 'text-transform:uppercase; background-color: #66ff99;',
								listeners:{
								change: 'onUpperCase'
								},
								width:250
							}]
						}]
					}]
				}]
			}]
		});
		
		me.callParent();
	}
});