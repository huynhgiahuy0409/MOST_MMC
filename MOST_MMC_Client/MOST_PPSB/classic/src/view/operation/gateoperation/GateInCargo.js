Ext.define('MOST.view.operation.GateInCargo', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-gateincargo',
	requires: [],

	layout: {
		type: 'vbox',
		align: 'stretch',
	}, 
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refGateInCargo',
	MAIN_STORE_NAME: 'gateInCargo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{
					xtype: 'fieldset',
					padding: '5 5 5 5',
					margin: '0 0 0 0',
					height: 805,
					layout: {
						type: 'hbox',
						align: 'stretch',
					},
					items: [
						{
							xtype: 'fieldset',
							padding: '10 10 5 10',
							margin: '0 0 0 0',
							flex: 1,
							layout: {
								type: 'hbox',
								align: 'stretch',
							},
							items: [
								{
									xtype: 'container',
									flex: 1,
									layout: {
										type: 'vbox',
										align: 'stretch',
									},
									defaults: {
										margin: '0 0 5 0',
										labelAlign: 'right',
										labelWidth: 95,
									},
									items: [
										{
											xtype: 'container',
											layout: {
												type: 'hbox',
												align: 'stretch',
											},
											width: 300,
											items: [
												{
													xtype: 'radiofield',
													reference: 'refGateInGCTruck',
													name: 'gateInGCRadio',
													inputValue: 'gateInGCTruckVal',
													width: 30,
													checked: true,
													hidden: true,
												},
												{
													xtype: 'container',
													width: '100%',
													defaults: {
														labelAlign: 'right',
														labelWidth: 95,
													},
													layout: {
														type: 'hbox',
														align: 'stretch',
													},
													items: [
														{
															xtype: 'combobox',
															reference: 'refGateInGCLorryField',
															flex: 1,
															fieldLabel: ViewUtil.getLabel('gateoperation.truck'),
															fieldStyle: 'text-transform : uppercase',
															editable: true,
															hideTrigger: true,
															enableKeyEvents: true,
															enforceSelection: true,
															queryMode: 'local',
															bind: {
																value: '{gateInGC.lorryNo}',
																store: '{lorryListStore}',
															},
															displayField: 'lorryNo',
															valueField: 'lorryNo',
															listeners: {
																focusleave: 'onGateInFieldFocusLeave',
																keyup: 'onTruckFieldChange',
															},
														},
														{
															xtype: 'button',
															margin: '0 0 0 5',
															iconCls: 'x-fa fa-search',
															listeners: {
																click: 'openLorrysPopup',
															},
														},
													],
												},
											],
										},
										{
											xtype: 'container',
											margin: '0 0 5 0',
											layout: {
												type: 'hbox',
												align: 'stretch',
											},
											items: [
												{
													xtype: 'radiofield',
													reference: 'refGateInGCDriver',
													name: 'gateInGCRadio',
													inputValue: 'gateInGCDriverVal',
													width: 20,
													margin: '5 0 5 0',
													hidden: true,
												},
												{
													xtype: 'combobox',
													fieldLabel: ViewUtil.getLabel('gateoperation.driverid'),
													labelWidth: 95,
													fieldStyle: 'text-transform : uppercase',
													flex: 1,
													labelAlign: 'right',
													reference: 'ctlGateInGCDriverIdField',
													editable: true,
													hideTrigger: true,
													enableKeyEvents: true,
													enforceSelection: true,
													displayField: 'driverId',
													valueField: 'driverId',
													queryMode: 'local',
													bind: {
														value: '{gateInGC.driverId}',
														store: '{driverListStore}',
													},
													listeners: {
														focusleave: 'onGateInFieldFocusLeave',
														keyup: 'onDriverFieldChange',
													},
												},
												{
													xtype: 'button',
													margin: '0 0 0 5',
													reference: 'ctlBtnDriverGCGIField',
													iconCls: 'x-fa fa-search',
													listeners: {
														click: 'openDriverIDPopup',
													},
												},
											],
										},
										{
											xtype: 'container',
											width: '100%',
											layout: {
												type: 'hbox',
												align: 'stretch',
											},
											defaults: {
												labelAlign: 'right',
												labelWidth: 95,
											},
											items: [
												{
													xtype: 'container',
													width: 95,
													margin: '0 5 0 0',
													layout: {
														type: 'hbox',
														align: 'right',
														pack: 'end',
													},
													labelWidth: 50,
													items: [
														{
															xtype: 'radiofield',
															reference: 'refBLDO',
															name: 'documentRadio',
															inputValue: 'bl',
															checked: true,
															listeners: {
																change: 'onSelectDocumentRadio',
															},
														},
														{
															xtype: 'label',
															text: ViewUtil.getLabel('gateoperation.bldo') + ':',
															style: 'text-align: right',
															width: 50,
															margin: '5 0 0 0',
														},
													],
												},
												{
													xtype: 'combobox',
													reference: 'ctlBlDoNoField',
													flex: 1,
													fieldStyle: 'text-transform : uppercase',
													editable: true,
													hideTrigger: true,
													enableKeyEvents: true,
													enforceSelection: true,
													queryMode: 'local',
													bind: {
														value: '{gateInGC.blNo}',
														store: '{blDOListStore}',
													},
													displayField: 'blNo',
													valueField: 'blNo',
													listeners: {
														focusleave: 'onGateInFieldFocusLeave',
														keyup: 'onBLDOFieldChange',
													},
												},
												{
													xtype: 'button',
													margin: '0 0 0 5',
													reference: 'ctlBtnBlDoNoField',
													iconCls: 'x-fa fa-search',
													listeners: {
														click: 'openBLDOPopup',
													},
												},
											],
										},
										{
											xtype: 'container',
											width: '100%',
											layout: {
												type: 'hbox',
												align: 'stretch',
											},
											defaults: {
												labelAlign: 'right',
												labelWidth: 95,
											},
											items: [
												{
													xtype: 'container',
													width: 95,
													margin: '0 5 0 0',
													layout: {
														type: 'hbox',
														align: 'right',
														pack: 'end',
													},
													labelWidth: 50,
													items: [
														{
															xtype: 'radiofield',
															reference: 'refBLNo',
															name: 'documentRadio',
															inputValue: 'sn',
															listeners: {
																change: 'onSelectDocumentRadio',
															},
														},
														{
															xtype: 'label',
															text: ViewUtil.getLabel('gateoperation.snNo') + ':',
															style: 'text-align: right',
															width: 50,
															margin: '5 0 0 0',
														},
													],
												},
												{
													xtype: 'combobox',
													reference: 'ctlShipgNoteNoField',
													flex: 1,
													fieldStyle: 'text-transform : uppercase',
													editable: true,
													hideTrigger: true,
													enableKeyEvents: true,
													enforceSelection: true,
													queryMode: 'local',
													bind: {
														value: '{gateInGC.shipgNoteNo}',
														store: '{shippingNoteListStore}',
													},
													displayField: 'shipgNoteNo',
													valueField: 'shipgNoteNo',
													listeners: {
														focusleave: 'onGateInFieldFocusLeave',
														keyup: 'onShipgNoteFieldChange',
													},
													disabled: true,
												},
												{
													xtype: 'button',
													margin: '0 0 0 5',
													reference: 'ctlBtnShipgNoteNo',
													iconCls: 'x-fa fa-search',
													listeners: {
														click: 'openShippingNotePopup',
													},
													disabled: true,
												},
											],
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('gateoperation.scn'),
											reference: 'refGateInScn',
											bind: {
												value: '{gateInGC.scn}',
											},
										},
										{
											xtype: 'textfield',
											reference: 'refGateInCommodity',
											fieldLabel: ViewUtil.getLabel('gateoperation.commodity'),
											bind: {
												readOnly: '{readOnlyMode}',
												value: '{gateInGC.cmdtName}',
											},
										},
										{
											xtype: 'textfield',
											reference: 'refGateInCommodity',
											fieldLabel: ViewUtil.getLabel('gateoperation.shipper'),
											bind: {
												readOnly: '{readOnlyMode}',
												value: '{gateInGC.shipperNm}',
											},
										},
										{
											xtype: 'textfield',
											reference: 'refGateInTransporter',
											fieldLabel: ViewUtil.getLabel('gateoperation.transporterId'),
											bind: {
												readOnly: '{readOnlyMode}',
												value: '{gateInGC.tsptr}',
											},
										},
										{
											xtype: 'textfield',
											reference: 'refGateInToLocation',
											fieldLabel: ViewUtil.getLabel('gateoperation.tolocation'),
											bind: {
												readOnly: '{readOnlyMode}',
												value: '{gateInGC.locId}',
											},
										},
										{
											xtype: 'combo',
											reference: 'refGateInGateCombo',
											fieldLabel: ViewUtil.getLabel('gateoperation.gate'),
											queryMode: 'local',
											bind: {
												store: '{gateComboList}',
											},
											editable: false,
											displayField: 'scdNm',
											valueField: 'scd',
											value: '',
										},
										{
											xtype: 'combo',
											hidden: true,
											reference: 'refDgCombo',
											fieldLabel: ViewUtil.getLabel('gateoperation'),
											queryMode: 'local',
											bind: {
												store: '{dgYnCombo}',
												editable: '{editableMode}',
												disabled: '{disabledMode}',
											},
											readOnly: true,
											displayField: 'label',
											valueField: 'data',
										},
										{
											xtype: 'combo',
											hidden: true,
											reference: 'refDgStatusCombo',
											fieldLabel: ViewUtil.getLabel('gateoperation.dgstatus'),
											queryMode: 'local',
											bind: {
												store: '{dgStatusCombo}',
												editable: '{editableMode}',
												disabled: '{disabledMode}',
											},
											displayField: 'label',
											valueField: 'data',
										},
										{
											xtype: 'container',
											hidden: true,
											layout: {
												type: 'hbox',
												align: 'stretch',
											},
											defaults: {
												labelAlign: 'right',
											},
											items: [
												{
													xtype: 'textfield',
													reference: 'refGateInLicenseNo',
													flex: 1,
													labelWidth: 95,
													fieldLabel: ViewUtil.getLabel('gateoperation.licenseno'),
													bind: {
														readOnly: '{readOnlyMode}',
														value: '{gateInGC.liscNo}',
													},
												},
												{
													xtype: 'textfield',
													reference: 'refGateInExpiryDate',
													flex: 1,
													fieldLabel: ViewUtil.getLabel('gateoperation.expirydate'),
													labelWidth: 95,
													bind: {
														readOnly: '{readOnlyMode}',
														value: '{gateInGC.expdate}',
													},
												},
											],
										},
										{
											xtype: 'datetimefield',
											reference: 'refGateInDateTime',
											fieldLabel: ViewUtil.getLabel('gateoperation.gateintime'),
											format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
											anchor: '100%',
											editable: false,
										},
										{
											xtype: 'container',
											layout: {
												type: 'hbox',
												align: 'stretch',
											},
											items: [
												{
													xtype: 'container',
													flex: 1,
												},
												{
													xtype: 'button',
													width: 80,
													text: ViewUtil.getLabel('ok'),
													listeners: {
														click: 'onOk',
													},
												},
											],
										},
									],
								},
								{
									xtype: 'container',
									flex: 1,
									layout: {
										type: 'vbox',
										align: 'stretch',
									},
									defaults: {
										margin: '0 0 5 5',
										labelAlign: 'right',
										labelWidth: 95,
									},
									items: [
										{
											xtype: 'container',
											height: 26,
										},
										{
											xtype: 'textfield',
											reference: 'refGateInDriverName',
											fieldLabel: ViewUtil.getLabel('gateoperation.drivername'),
											bind: {
												readOnly: '{readOnlyMode}',
												value: '{gateInGC.driverNm}',
											},
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('doNo'),
											reference: 'ctlGateInGCDOField',
											readOnly: true,
											bind: {
												value: '{gateInGC.doNo}',
											},
										},
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('gateoperation.gr'),
											reference: 'ctlGateInGCGrField',
											readOnly: true,
											bind: {
												value: '{gateInGC.grNo}',
											},
										},
										{
											xtype: 'container',
											width: '100%',
											layout: {
												type: 'hbox',
												align: 'stretch',
											},
											items: [
												{
													xtype: 'textfield',
													reference: 'refVslNm',
													fieldLabel: ViewUtil.getLabel('gateoperation.vslNm'),
													labelAlign: 'right',
													labelWidth: 95,
													flex: 3,
													bind: {
														value: '{gateInGC.vslNm}',
													},
												},
												{
													xtype: 'textfield',
													reference: 'refVslCallId',
													flex: 1,
													margin: '0 0 0 5',
													bind: {
														value: '{gateInGC.vslCallId}',
													},
													emptyText: 'Vessel Call Id',
												},
											],
										},
										{
											xtype: 'container',
											width: '100%',
											layout: {
												type: 'hbox',
												align: 'stretch',
											},
											defaults: {
												labelAlign: 'right',
												labelWidth: 30,
											},
											items: [
												{
													xtype: 'label',
													text: ViewUtil.getLabel('gateoperation.qty'),
													style: 'text-align: right',
													width: 95,
													margin: '5 5 0 0',
												},
												{
													xtype: 'numberfield',
													reference: 'refGateInCargoQty',
													flex: 0.65,
													maxValue: 9999999,
													minValue: 0,
													bind: {
														readOnly: '{readOnlyMode}',
														value: '{gateInGC.pkgQty}',
													},
												},
												{
													xtype: 'numberfield',
													reference: 'refGateInCargoMt',
													flex: 1,
													maxValue: 999999.999,
													minValue: 0,
													decimalPrecision: 3,
													fieldLabel: ViewUtil.getLabel('gateoperation.mt'),
													bind: {
														readOnly: '{readOnlyMode}',
														value: '{gateInGC.wgt}',
													},
												},
												{
													xtype: 'numberfield',
													reference: 'refGateInCargoM3',
													flex: 1,
													maxValue: 999999.999,
													minValue: 0,
													decimalPrecision: 3,
													fieldLabel: ViewUtil.getLabel('gateoperation.m3'),
													bind: {
														readOnly: '{readOnlyMode}',
														value: '{gateInGC.msrmt}',
													},
												},
											],
										},
										{
											xtype: 'textfield',
											reference: 'refGateInConsignee',
											fieldLabel: ViewUtil.getLabel('gateoperation.consignee'),
											bind: {
												readOnly: '{readOnlyMode}',
												value: '{gateInGC.cnsneNm}',
											},
										},
										{
											xtype: 'textfield',
											reference: 'refGateInTransporterName',
											fieldLabel: ViewUtil.getLabel('gateoperation.transporter'),
											bind: {
												readOnly: '{readOnlyMode}',
												value: '{gateInGC.tsptCompNm}',
											},
										},
										{
											xtype: 'textfield',
											reference: 'refGateInCargoDMode',
											width: '100%',
											fieldLabel: ViewUtil.getLabel('gateoperation.dmode'),
											bind: {
												readOnly: '{readOnlyMode}',
												value: '{gateInGC.delvTpName}',
											},
										},
										{
											xtype: 'textfield',
											reference: 'refGateInCargoCustomStatus',
											fieldLabel: ViewUtil.getLabel('gateoperation.custom'),
											editable: false,
											bind: {
												readOnly: '{readOnlyMode}',
												value: '{gateInGC.customsReleasedStatus}',
											},
										},
										{
											xtype: 'textfield',
											reference: 'refGatePassNo',
											fieldLabel: ViewUtil.getLabel('gateoperation.gatePassNo'),
											editable: false,
											bind: {
												readOnly: '{readOnlyMode}',
												value: '{gateInGC.gatePassNo}',
											},
										},
										{
											xtype: 'container',
											width: '100%',
											hidden: true,
											layout: {
												type: 'hbox',
												align: 'stretch',
											},
											items: [
												{
													xtype: 'textareafield', //WB Test
													reference: 'refWBTest',
													fieldLabel: 'Weight Scale',
													labelWidth: 95,
													height: 26,
													flex: 1,
													maxLength: 500,
													labelAlign: 'right',
												},
												{
													xtype: 'button',
													margin: '0 0 0 5',
													reference: 'ctlWBTest',
													iconCls: 'fa fa-balance-scale',
													listeners: {
														click: 'onWBConnect',
													},
												},
											],
										},
										{},
										{},
									],
								},
							],
						},
						{
							xtype: 'fieldset',
							flex: 1,
							padding: '0 0 0 0',
							margin: '0 0 0 5',
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							items: [

							],
						},
					],
				},
			],
		});
		me.callParent();
	},
});
