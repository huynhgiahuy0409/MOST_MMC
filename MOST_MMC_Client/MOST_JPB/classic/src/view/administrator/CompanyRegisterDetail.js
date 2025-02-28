Ext.define('MOST.view.administrator.CompanyRegisterDetail', {
	extend: 'Ext.form.Panel',

	alias: 'widget.app-companyregisterdetail',

	requires: [],

	config: {
		crud: null,
		ptnrTypes: null,
		shippingLines: null,
		contracts: null,
	},

	constructor: function (config) {
		this.callParent(arguments);
	},

	listeners: {
		afterrender: 'onDetailLoad',
	},

	width: 1170,
	scrollable: true,

	layout: {
		type: 'vbox',
		align: 'stretch',
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	SHIPPINGLINE_GRID_REF_NAME: 'refShpList',
	SHIPPINGLINE_LIST_STORE: 'shpList',
	ACCOUNT_NO_GRID_REF_NAME: 'refAccountNo',
	ACCOUNT_NO_LIST_STORE: 'accountNoList',
	FILE_GRID_REF_NAME: 'refFileUploadGrid', // File Grid Name
	FILE_UPLOAD_STORE_NAME: 'fileUploadInfo', // File Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	initComponent: function () {
		var me = this;

		Ext.apply(this, {
			items: [
				{
					xtype: 'form',
					items: [
						{
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							items: [
								{
									//row 1
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									margin: '5 5 0 0',
									defaults: {
										labelAlign: 'right',
										labelWidth: 120,
										flex: 1,
										editable: false
									},
									items: [
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('partnerCode'),
											reference: 'txtPtnrCode',
											name: 'ptnrCode',
											bind: '{theDetail.companyCode}',
											maskRe: /[a-zA-Z0-9]/,
											enforceMaxLength: true,
											allowBlank: false,
											maxLength: 10,
										},
										{
											xtype: 'textfield',
											reference: 'txtPtnrRegNo',
											fieldLabel: ViewUtil.getLabel('partnerRegNo'),
											bind: '{theDetail.regNo}',
											name: 'regNo',
											maskRe: /[a-zA-Z0-9]/,
											enforceMaxLength: true,
											maxLength: 20,
											allowBlank: false,
											enableKeyEvents: true,
										},
										{
											xtype: 'textfield',
											reference: 'txtTIN',
											name: 'tin',
											fieldLabel: ViewUtil.getLabel('tin'),
											maskRe: /[0-9]/,
											enforceMaxLength: true,
											maxLength: 10,
											bind: '{theDetail.tin}',
										},
									],
								},
								{
									//row 2
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									margin: '5 5 0 0',
									defaults: {
										labelAlign: 'right',
										labelWidth: 120,
										flex: 1,
										editable: false
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'txtPtnrName',
											fieldLabel: ViewUtil.getLabel('partnerName'),
											allowBlank: false,
											maskRe: /[a-zA-Z0-9 ]/,
											enforceMaxLength: true,
											maxLength: 60,
											name: 'engSnm',
											bind: '{theDetail.engSnm}',
											enableKeyEvents: true,
											flex: 2,
											listeners: {
												keypress: 'checkName',
											},
										},
										{
											xtype: 'textfield',
											reference: 'txtSSTNo',
											fieldLabel: ViewUtil.getLabel('sstNo'),
											name: 'sstNo',
											maskRe: /[a-zA-Z0-9]/,
											enforceMaxLength: true,
											maxLength: 30,
											bind: '{theDetail.sstNo}',
										},
									],
								},
								{
									//row 3
									xtype: 'checkboxgroup',
									margin: '5 5 0 0',
									fieldLabel: ViewUtil.getLabel('partnerType'),
									labelWidth: 120,
									labelAlign: 'right',
									reference: 'cbxgPtnrTypes',
									columns: 7,
									flex: 1,
									vertical: false,
									defaults: {
										margin: '0 0 0 -5',
										readOnly: true
									},
									items: [
										{
											boxLabel: ViewUtil.getLabel('shippingLine'),
											reference: 'cbxSHP',
											name: 'rb',
											inputValue: 'SHP',
										},
										{
											boxLabel: ViewUtil.getLabel('shippingAgent'),
											reference: 'cbxSHA',
											name: 'rb',
											inputValue: 'SHA',
										},
										{
											boxLabel: ViewUtil.getLabel('trucker'),
											reference: 'cbxTRK',
											name: 'rb',
											inputValue: 'TRK',
										},
										{
											boxLabel: ViewUtil.getLabel('forwarder'),
											reference: 'cbxFWD',
											name: 'rb',
											inputValue: 'FWD',
										},
										{
											boxLabel: ViewUtil.getLabel('shipperConsignee'),
											reference: 'cbxCNS',
											name: 'rb',
											inputValue: 'CNS',
										},
										{
											boxLabel: ViewUtil.getLabel('tally'),
											reference: 'cbxTLY',
											name: 'rb',
											inputValue: 'TLY',
										},
										{
											boxLabel: ViewUtil.getLabel('repairvendor'),
											reference: 'cbxREP',
											name: 'rb',
											inputValue: 'REP',
										},
										{
											boxLabel: ViewUtil.getLabel('government'),
											reference: 'cbxGVM',
											name: 'rb',
											inputValue: 'GVM',
										},
										{
											boxLabel: ViewUtil.getLabel('stvdCompNm'),
											reference: 'cbxSTV',
											name: 'rb',
											inputValue: 'STV',
										},
										{
											boxLabel: ViewUtil.getLabel('broker'),
											reference: 'cbxBRK',
											name: 'rb',
											inputValue: 'BRK',
										},
										{
											boxLabel: ViewUtil.getLabel('containerrepair'),
											reference: 'cbxCRP',
											name: 'rb',
											inputValue: 'CRP',
										},
										{
											boxLabel: ViewUtil.getLabel('marinesurveyor'),
											reference: 'cbxMSY',
											name: 'rb',
											inputValue: 'MSY',
										},
										{
											boxLabel: ViewUtil.getLabel('freezoneoper'),
											reference: 'cbxFZO',
											name: 'rb',
											inputValue: 'FZO',
										},
										{
											boxLabel: ViewUtil.getLabel('indshipmaster'),
											reference: 'cbxISM',
											name: 'rb',
											inputValue: 'ISM',
										},
										{
											boxLabel: ViewUtil.getLabel('fumigator'),
											reference: 'cbxFMG',
											name: 'rb',
											inputValue: 'FMG',
										},
										{
											boxLabel: ViewUtil.getLabel('trimmingco'),
											reference: 'cbxTRM',
											name: 'rb',
											inputValue: 'TRM',
										},
										{
											boxLabel: ViewUtil.getLabel('manufacturer'),
											reference: 'cbxMNF',
											name: 'rb',
											inputValue: 'MNF',
										},
										{
											boxLabel: ViewUtil.getLabel('terminalopr'),
											reference: 'cbxTMO',
											name: 'rb',
											inputValue: 'TMO',
										},
										{
											boxLabel: ViewUtil.getLabel('tenant'),
											reference: 'cbxTNT',
											name: 'rb',
											inputValue: 'TNT',
										},
										{
											boxLabel: ViewUtil.getLabel('contractor'),
											reference: 'cbxCTT',
											name: 'rb',
											inputValue: 'CTT',
										},
										{
											boxLabel: ViewUtil.getLabel('privatecomp'),
											reference: 'cbxPCO',
											name: 'rb',
											inputValue: 'PCO',
										},
									],
								},
								{
									//row 4
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch',
									},
									margin: '5 5 0 0',
									defaults: {
										labelAlign: 'right',
										labelWidth: 120,
										flex: 1,
										readOnly: true
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'txtAddress',
											/*maskRe: /[a-zA-Z0-9_& ]/,*/
											enforceMaxLength: true,
											maxLength: 120,
											fieldLabel: ViewUtil.getLabel('addr'),
											flex: 2,
											name: 'addr',
											bind: '{theDetail.addr}',
										},
										{
											xtype: 'textfield',
											reference: 'txtPostCode',
											name: 'zipCd',
											fieldLabel: ViewUtil.getLabel('postCode'),
											maskRe: /[0-9]/,
											enforceMaxLength: true,
											maxLength: 10,
											bind: '{theDetail.zipCd}',
										},
									],
								},
								{
									//row 5
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									margin: '5 5 0 0',
									defaults: {
										labelAlign: 'right',
										labelWidth: 120,
										flex: 1,
										readOnly: true
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'txtEmail',
											fieldLabel: ViewUtil.getLabel('emailAddress'),
											name: 'email',
											enforceMaxLength: true,
											maxLength: 50,
											bind: '{theDetail.email}',
										},
										{
											xtype: 'textfield',
											reference: 'txtContPerson',
											fieldLabel: ViewUtil.getLabel('contactPerson'),
											maskRe: /[a-zA-Z0-9 ]/,
											enforceMaxLength: true,
											maxLength: 50,
											name: 'representative',
											bind: '{theDetail.representative}',
										},
										{
											xtype: 'textfield',
											reference: 'txtTelNo',
											fieldLabel: ViewUtil.getLabel('telNo'),
											maskRe: /[0-9-/]/,
											enforceMaxLength: true,
											maxLength: 20,
											name: 'telNo',
											bind: '{theDetail.telNo}',
										},
									],
								},
								{
									//row 6
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									margin: '5 5 -5 0',
									defaults: {
										labelAlign: 'right',
										labelWidth: 120,
										flex: 1,
										readOnly: true
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'txtFinanGrp',
											fieldLabel: ViewUtil.getLabel('financialGrp'),
											name: 'financeGrp',
											editable: false,
											bind: '{theDetail.financeGrp}',
										},
										{
											xtype: 'container',
											layout: {
												type: 'hbox',
											},
											defaults: {
												labelAlign: 'right',
												labelWidth: 120,
											},
											items: [
												{
													xtype: 'checkboxfield',
													reference: 'cbxHoldCheck',
													fieldLabel: ViewUtil.getLabel('status'),
													boxLabel: ViewUtil.getLabel('holdCheck'),
													inputValue: 'Y',
													uncheckedValue: 'N',
													name: 'holdChk',
													bind: '{theDetail.holdChk}',
													checked: false,
												},
												{
													xtype: 'checkboxfield',
													reference: 'cbxAccHoldCheck',
													boxLabel: ViewUtil.getLabel('accHoldCheck'),
													margin: '0 0 0 50',
													inputValue: 'Y',
													uncheckedValue: 'N',
													name: 'accountHold',
													bind: '{theDetail.accountHold}',
													checked: false,
												},
											],
										},
										{
											xtype: 'textfield',
											reference: 'txtFaxNo',
											fieldLabel: ViewUtil.getLabel('faxNo'),
											name: 'faxNo',
											maskRe: /[0-9-/]/,
											enforceMaxLength: true,
											maxLength: 20,
											bind: '{theDetail.faxNo}',
										},
									],
								},
								{
									//row 7
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									margin: '10 0 0 0',
									defaults: {
										labelAlign: 'right',
										labelWidth: 120,
									},
									reference: 'refCusSha',
									items: [
										{
											xtype: 'radiogroup',
											margin: '0 5 5 0',
											flex: 1,
											reference: 'rdgShpLineType',
											hidden: true,
											labelAlign: 'right',
											fieldLabel: ViewUtil.getLabel('shpLineType'),
											bind: '{ptnrLevelInput}',
											layout: {
												type: 'hbox',
												align: 'stretch',
											},
											defaults: {
												flex: 1,
											},
											items: [
												{
													xtype: 'radiofield',
													boxLabel: 'Container',
													name: 'ptnrLevel',
													inputValue: 'CON',
													checked: true,
												},
												{
													xtype: 'radiofield',
													boxLabel: 'Vessel',
													name: 'ptnrLevel',
													inputValue: 'VSL',
												},
												{
													xtype: 'radiofield',
													boxLabel: 'BOTH',
													name: 'ptnrLevel',
													inputValue: 'BTH',
												},
											],
										},
										{
											xtype: 'container',
											flex: 2,
										},
									],
								},
								{
									//row 8
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									margin: '0 5 0 0',
									defaults: {
										labelAlign: 'right',
										labelWidth: 120,
										flex: 1,
										readOnly: true
									},
									reference: 'refCusSha',
									hidden: true,
									items: [
										{
											xtype: 'textfield',
											reference: 'txtInitPartnerSha',
											fieldLabel: ViewUtil.getLabel('initPartner'),
											name: 'initPtnrSHA',
											editable: false,
											bind: '{theDetail.initPtnrSHA}',
										},
										{
											xtype: 'textfield',
											reference: 'txtCusLisNoSha',
											name: 'customRefSha',
											maskRe: /[a-zA-Z0-9]/,
											enforceMaxLength: true,
											maxLength: 6,
											fieldLabel: ViewUtil.getLabel('cusLisNo'),
											bind: '{theDetail.customRef}',
											enableKeyEvents: true,
											listeners: {
												keypress: 'checkLicenseSHA',
											},
										},
										{
											xtype: 'checkboxfield',
											reference: 'txtCusLisExtSha',
											fieldLabel: ViewUtil.getLabel('cusLisExt'),
											checked: false,
											boxLabel: ViewUtil.getLabel('extend'),
											name: 'extSHA',
											inputValue: 'Y',
											uncheckedValue: 'N',
											bind: '{theDetail.extSHA}',
										},
									],
								},
								{
									//row 9
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									margin: '5 5 5 0',
									defaults: {
										flex: 1,
									},
									reference: 'refCusDateSha',
									hidden: true,
									items: [
										{
											xtype: 'container',
											layout: {
												type: 'hbox',
											},
											defaults: {
												labelAlign: 'right',
												labelWidth: 120,
												readOnly: true
											},
											items: [
												{
													xtype: 'datefield',
													reference: 'dtCusStatDateSha',
													fieldLabel: ViewUtil.getLabel('cusStartDate'),
													name: 'customSdateSHA',
													format: MOST.config.Locale.getShortDate(),
													bind: '{theDetail.customSdate}',
													flex: 1,
												},
												{
													xtype: 'label',
													margin: '5 0 0 5',
													html: '(Shipping Agent)',
												},
											],
										},
										{
											xtype: 'container',
											layout: {
												type: 'hbox',
											},
											defaults: {
												labelAlign: 'right',
												labelWidth: 120,
												readOnly: true
											},
											items: [
												{
													xtype: 'datefield',
													reference: 'dtCusEndDateSha',
													fieldLabel: ViewUtil.getLabel('cusEndDate'),
													name: 'customEdateSHA',
													format: MOST.config.Locale.getShortDate(),
													bind: '{theDetail.customEdate}',
													flex: 1,
												},
												{
													xtype: 'label',
													margin: '5 0 0 5',
													html: '(Shipping Agent)',
												},
											],
										},
										{
											xtype: 'container',
										},
									],
								},
								{
									//row 10
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									margin: '0 5 0 0',
									defaults: {
										labelAlign: 'right',
										labelWidth: 120,
										flex: 1,
										readOnly: true
									},
									reference: 'refCusFwd',
									hidden: true,
									items: [
										{
											xtype: 'textfield',
											reference: 'txtInitPartnerFwd',
											fieldLabel: ViewUtil.getLabel('initPartner'),
											name: 'initPtnrFWD',
											editable: false,
											bind: '{theDetail.initPtnrFWD}',
										},
										{
											xtype: 'textfield',
											reference: 'txtCusLisNoFwd',
											name: 'customRefFwd',
											maskRe: /[a-zA-Z0-9]/,
											enforceMaxLength: true,
											maxLength: 6,
											fieldLabel: ViewUtil.getLabel('cusLisNo'),
											bind: '{theDetail.customRef}',
											enableKeyEvents: true,
											listeners: {
												keypress: 'checkLicenseFWD',
											},
										},
										{
											xtype: 'checkboxfield',
											reference: 'cbxCusLisExtFwd',
											fieldLabel: ViewUtil.getLabel('cusLisExt'),
											checked: false,
											boxLabel: ViewUtil.getLabel('extend'),
											name: 'extFWD',
											inputValue: 'Y',
											uncheckedValue: 'N',
											bind: '{theDetail.extFWD}',
										},
									],
								},
								{
									//row 11
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									margin: '5 5 5 0',
									defaults: {
										flex: 1,
									},
									reference: 'refCusDateFwd',
									hidden: true,
									items: [
										{
											xtype: 'container',
											layout: {
												type: 'hbox',
											},
											defaults: {
												labelAlign: 'right',
												labelWidth: 120,
											},
											items: [
												{
													xtype: 'datefield',
													reference: 'dtCusStatDateFwd',
													fieldLabel: ViewUtil.getLabel('cusStartDate'),
													name: 'customSdateFWD',
													format: MOST.config.Locale.getShortDate(),
													bind: '{theDetail.customSdate}',
													flex: 1,
												},
												{
													xtype: 'label',
													margin: '5 0 0 5',
													html: '(Forwarder)',
												},
											],
										},
										{
											xtype: 'container',
											layout: {
												type: 'hbox',
											},
											defaults: {
												labelAlign: 'right',
												labelWidth: 120,
											},
											items: [
												{
													xtype: 'datefield',
													reference: 'dtCusEndDateFwd',
													fieldLabel: ViewUtil.getLabel('cusEndDate'),
													name: 'customEdateFWD',
													format: MOST.config.Locale.getShortDate(),
													bind: '{theDetail.customEdate}',
													flex: 1,
												},
												{
													xtype: 'label',
													margin: '5 0 0 5',
													html: '(Forwarder)',
												},
											],
										},
										{
											xtype: 'container',
										},
									],
								},
								{
									//row 12
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									hidden: true,
									margin: '5 5 0 0',
									defaults: {
										labelAlign: 'right',
										labelWidth: 120,
										flex: 1,
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'txtMarineAgentCode',
											fieldLabel: ViewUtil.getLabel('marineAgentCode'),
											editable: false,
											name: 'maAgencyCode',
											maskRe: /[a-zA-Z0-9]/,
											enforceMaxLength: true,
											maxLength: 10,
											bind: '{theDetail.maAgencyCode}',
											hidden: true,
										},
										{
											xtype: 'textfield',
											reference: 'txtMarineAgentNm',
											fieldLabel: ViewUtil.getLabel('marineAgentNm'),
											editable: false,
											name: 'maAgencyNm',
											maskRe: /[a-zA-Z0-9 ]/,
											enforceMaxLength: true,
											maxLength: 120,
											bind: '{theDetail.maAgencyNm}',
											hidden: true,
										},
									],
								},
								{
									//row 13
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									hidden: true,
									margin: '5 5 0 0',
									defaults: {
										labelAlign: 'right',
										labelWidth: 120,
										flex: 1,
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'txtConnQty',
											fieldLabel: ViewUtil.getLabel('connQty'),
											name: 'connQty',
											maskRe: /[0-9]/,
											enforceMaxLength: true,
											maxLength: 5,
											bind: '{theDetail.connQty}',
										},
										{
											xtype: 'combo',
											reference: 'cmbConnType',
											name: 'connType',
											fieldLabel: ViewUtil.getLabel('connType'),
											bind: {
												store: '{connTypeCombo}',
												value: '{theDetail.connType}',
											},
											editable: false,
											displayField: 'scdNm',
											valueField: 'scd',
										},
										{
											xtype: 'combo',
											reference: 'cmbConnSubType',
											name: 'connSubType',
											bind: {
												value: '{theDetail.connSubType}',
												store: '{connSubTypeCombo}',
											},
											hidden: true,
											labelWidth: 130,
											editable: false,
											displayField: 'scdNm',
											valueField: 'scd',
										},
										{
											xtype: 'checkboxfield',
											reference: 'cbxBelongToPort',
											fieldLabel: ViewUtil.getLabel('belongToPort'),
											hidden: true,
											labelWidth: 130,
											margin: '5 5 0 100',
											inputValue: 'Y',
											uncheckedValue: 'N',
											name: 'jpbiShaYn',
											bind: '{theDetail.jpbiShaYn}',
											checked: false,
										},
									],
								},
								{
									//row 14
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									margin: '0 5 0 0',
									defaults: {
										labelAlign: 'right',
										labelWidth: 120,
										flex: 1,
										editable: false,
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'txtGstRefId',
											name: 'gstRefId',
											maskRe: /[a-zA-Z0-9]/,
											enforceMaxLength: true,
											maxLength: 20,
											fieldLabel: ViewUtil.getLabel('gstRefId'),
											bind: '{theDetail.gstRefId}',
										},
										{
											xtype: 'textfield',
											reference: 'txtCommercialId',
											fieldLabel: ViewUtil.getLabel('commercialId'),
											maskRe: /[a-zA-Z0-9 ]/,
											enforceMaxLength: true,
											maxLength: 10,
											hidden: true,
											name: 'gstCommId',
											bind: '{theDetail.gstCommId}',
										},
										{
											xtype: 'radiogroup',
											reference: 'rdgGstStatus',
											labelAlign: 'right',
											fieldLabel: ViewUtil.getLabel('gstStatus'),
											bind: '{gstStatCdInput}',
											layout: {
												type: 'hbox',
												align: 'stretch',
											},
											defaults: {
												readOnly: true
											},
											items: [
												{
													xtype: 'radiofield',
													boxLabel: 'Yes',
													name: 'gstStatCd',
													inputValue: 'Y',
													checked: true,
													margin: '0 5 0 0',
													flex: 1,
												},
												{
													xtype: 'radiofield',
													boxLabel: 'No',
													name: 'gstStatCd',
													inputValue: 'N',
													flex: 1,
												},
											],
										},
										{
											xtype: 'combo',
											reference: 'cmbCompanyStatus',
											name: 'companyStatus',
											fieldLabel: ViewUtil.getLabel('companyStatus'),
											bind: {
												store: '{companyStatusCombo}',
												value: '{theDetail.companyStatus}',
											},
											editable: false,
											readOnly: true,
											displayField: 'codeName',
											valueField: 'code',
											queryMode: 'local',
										},
									],
								},
								{
									//row 15
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									margin: '5 5 0 0',
									defaults: {
										labelAlign: 'right',
										labelWidth: 120,
										flex: 1,
										editable: false,
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'dtGstRegDt',
											fieldLabel: ViewUtil.getLabel('gstRegDt'),
											name: 'gstRegDt',
											bind: '{theDetail.gstRegDt}',
										},
										{
											xtype: 'textfield',
											reference: 'dtGstApplyDt',
											fieldLabel: ViewUtil.getLabel('gstApplyDt'),
											name: 'gstApplyDt',
											bind: '{theDetail.gstApplyDt}',
										},
										{
											xtype: 'textfield',
											reference: 'dtGstExpDt',
											fieldLabel: ViewUtil.getLabel('gstExpDt'),
											bind: '{theDetail.gstExpiredDt}',
											name: 'gstExpiredDt',
										},
									],
								},
								{
									//row 16
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									margin: '5 5 0 0',
									defaults: {
										labelAlign: 'right',
										labelWidth: 120,
										flex: 1,
										editable: false,
									},
									items: [
										{
											xtype: 'combo',
											reference: 'cmbPaymentType',
											name: 'paymentType',
											fieldLabel: ViewUtil.getLabel('paymentType'),
											bind: {
												value: '{theDetail.paymentType}',
												store: '{paymentTypeCombo}',
											},
											allowBlank: false,
											displayField: 'codeName',
											valueField: 'code',
											queryMode: 'local',
											readOnly: true
										},
										{
											xtype: 'textfield',
											reference: 'txtUpdDt',
											fieldLabel: ViewUtil.getLabel('updDt'),
											name: 'updDt',
											editable: false,
											bind: '{theDetail.updDt}',
										},
										{
											xtype: 'combo',
											reference: 'cmbProfileStatus',
											name: 'profileStatus',
											fieldLabel: ViewUtil.getLabel('profileStatus'),
											bind: {
												value: '{theDetail.profileStatus}',
												store: '{profileStatusCombo}',
											},
											editable: false,
											displayField: 'codeName',
											valueField: 'code',
											queryMode: 'local',
											readOnly: true
										},
									],
								},
								{
									//row 17
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									margin: '5 5 0 0',
									defaults: {
										labelAlign: 'right',
										labelWidth: 120,
										flex: 1,
									},
									items: [
										{
											xtype: 'textfield',
											reference: 'txtDepositCredit',
											name: 'creditLimit',
											maskRe: /[0-9]/,
											enforceMaxLength: true,
											maxLength: 12,
											fieldLabel: ViewUtil.getLabel('depositCredit'),
											editable: false,
											bind: '{theDetail.creditLimit ? theDetail.creditLimit : theDetail.depositLimit}',
										},
										{
											xtype: 'textfield',
											reference: 'txtBalance',
											fieldLabel: ViewUtil.getLabel('balance'),
											name: 'bal',
											maskRe: /[0-9]/,
											enforceMaxLength: true,
											maxLength: 12,
											editable: false,
											bind: '{theDetail.bal}',
										},
										{
											xtype: 'textfield',
											reference: 'txtModifier',
											fieldLabel: ViewUtil.getLabel('modifier'),
											name: 'staffCd',
											editable: false,
											bind: '{theDetail.staffCd}',
										},
									],
								},
								{
									//row 18
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									margin: '5 5 5 0',
									defaults: {
										labelAlign: 'right',
										labelWidth: 120,
										flex: 1,
									},
									items: [
										{
											xtype: 'textarea',
											reference: 'txtRemark',
											fieldLabel: ViewUtil.getLabel('remark'),
											maskRe: /[a-zA-Z0-9&-_ ]/,
											enforceMaxLength: true,
											maxLength: 100,
											enforceMaxLength: true,
											name: 'remark',
											editable: false,
											bind: '{theDetail.rmk}',
										},
									],
								},
								//s-AUT-001 Company Register
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch',
									},
									defaults: {
										flex: 1,
									},
									items: [
										{
											xtype: 'grid',
											flex: 1.5,
											style: {
												borderColor: '#AAA',
												borderStyle: 'solid',
												borderWidth: 'thin',
											},
											margin: '0 0 5 5',
											title: ViewUtil.getLabel('account_no_list'),
											reference: me.ACCOUNT_NO_GRID_REF_NAME,
											layout: {
												type: 'fit',
											},
											bind: {
												store: '{' + me.ACCOUNT_NO_LIST_STORE + '}',
											},
											height: 150,
											autoScroll: true,
											columns: {
												defaults: {
													style: 'text-align:center',
													align: 'center',
												},
												items: GridUtil.getGridColumns('CompanyRegisterAccountNo'),
											}
										},
										{
											xtype: 'grid',
											flex: 1,
											style: {
												borderColor: '#AAA',
												borderStyle: 'solid',
												borderWidth: 'thin',
											},
											margin: '0 5 5 5',
											reference: me.FILE_GRID_REF_NAME,
											layout: {
												type: 'fit',
											},
											bind: {
												store: '{' + me.FILE_UPLOAD_STORE_NAME + '}',
											},
											height: 150,
											autoScroll: true,
											listeners: {
												celldblclick: 'onFileDownloadDblClick',
											},
											columns: {
												defaults: {
													style: 'text-align:center',
													align: 'center',
												},
												items: GridUtil.getGridColumns('CompanyRegisterFileUpload'),
											},
										},
									],
								},
								//e-AUT-001 Company Register
								{
									xtype: 'grid',
									flex: 1,
									style: {
										borderColor: '#AAA',
										borderStyle: 'solid',
										borderWidth: 'thin',
									},
									margin: '0 5 5 5',
									title: ViewUtil.getLabel('shipping_line_list_title'),
									reference: me.SHIPPINGLINE_GRID_REF_NAME,
									layout: {
										type: 'fit',
									},
									bind: {
										store: '{' + me.SHIPPINGLINE_LIST_STORE + '}',
									},
									height: 200,
									width: 350,
									autoScroll: true,
									hidden: true,
									listeners: {
										celldblclick: 'openShpLinePopup',
									},
									columns: {
										defaults: {
											style: 'text-align:center',
											align: 'center',
										},
										items: GridUtil.getGridColumns('CompanyShippingLine'),
									},
								},
							],
						},
					],
				},
			],
		});

		me.callParent();
	},
});
