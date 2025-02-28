Ext.define('MOST.view.administrator.CompanyRegisterDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.companyregisterdetail',
	
	requires: [
	],

	config: {
		crud: null,
		ptnrTypes: null,
		shippingLines: null,
		contracts: null
	},
	
	constructor: function(config) {
		this.callParent(arguments);
	},
	
	btnSave: {type: 'bundle', key: 'save'},
	btnCancel: {type: 'bundle', key: 'cancel'},
	
	listeners:{
		afterrender: 'onDetailLoad'
	},
	
	 /**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'companyRegsiterGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'companyRegister',            // Main Store Name
	PARTNER_TYPE_STORE: 'ptnrTypeList',
	CONN_TYPE_COMBO_STORE: 'connTypeCombo',
	CONNSUB_TYPE_COMBO_STORE: 'connSubTypeCombo',
	COMPANY_STATUS_STORE: 'companyStatusCombo',
	PROFILE_STAUTS_STORE: 'profileStatusCombo',
	SHIPPER_LIST_STORE: 'shpList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	width: 1455,
	height: 350,
	scrollable: true,

    layout: {
    	type: 'hbox',
		align: 'stretch'
	},
	
	//modified by John (2022.01.06)
	initComponent: function() {
		var me = this;
		
		Ext.apply(this, {
			xtype: 'fieldset',
			margin: '5 5 5 5',
			items: [
				{
					xtype: 'container',
					width: 286,
					layout: 'vbox',
					items:[
						{
				        	xtype: 'image',
				        	reference: 'refImageUploadPreview',
				            shrink: true,
				            width: 280,
				            height: 250,
				            bind: {
				            	src: '{imgData}'
				            }
				        },{
				        	xtype: 'container',
				        	layout: 'hbox',
				        	flex: 1,
				        	margin: '5 0 0 0',
				        	defaults:{
								labelAlign: 'right'
							},
							items:[
								{
						            xtype: 'filefield',
						            buttonOnly: true,
						            width: 80,
						            buttonText: ViewUtil.getLabel('upload'),
						            accept: [
						                'image/png',
						                'image/jpeg'
						            ],
						            listeners: {
						            	change:'onUploadImage'
						            }
								},{
									xtype:'button',
									text: ViewUtil.getLabel('remove'),
									width: 60,
									reference:'refBtnRemove',
									listeners:{
										click:'onImageRemove'
									}
								}
							]
				        }
				    ]
				},{
					xtype:'fieldset',
					width: 1154,
					margin: '0 5 0 0',
					items:[
						{
							layout: {
								type: 'vbox',
								align: 'stretch',
							},
							items:[
								{ //row 1
									defaults:{
										margin: '10 5 0 0',
										labelAlign: 'right',
										width : 390,
										labelWidth: 150
									},
									layout: 'hbox',
									items:[
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('partnerCode'),
											reference:'refPtnrCode',
											name: 'ptnrCode',
											bind: '{theDetail.companyCode}',
										    maskRe: /[a-zA-Z0-9]/,
										    maxLength : 4,
										    allowBlank: false,
											enforceMaxLength: true,
											fieldStyle: 'text-transform : uppercase'
										},{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('partnerName'),
											reference: 'refPtnrName',
											name: 'engSnm',
											bind: '{theDetail.engSnm}',
											//maskRe: /[a-zA-Z0-9 ]/,
											maxLength : 60,
											allowBlank: false,
											enforceMaxLength: true,
											enableKeyEvents: true,
											listeners: {
												keypress: 'checkName'
											}
										},{
											xtype: 'textfield',
											width:300,
											labelWidth: 130,
											fieldLabel: ViewUtil.getLabel('postCode'),
											reference: 'refPostCode',
											name : 'zipCd',
											bind: '{theDetail.zipCd}',
											maskRe: /[0-9]/,
											maxLength : 10,
											enforceMaxLength: true
										}
									]
								},{ //row 2
									defaults:{
										margin: '5 5 0 0',
										labelAlign: 'right',
				                        labelWidth: 150
									},
									layout: 'hbox',
									items:[
										{
											xtype: 'textfield',
											width : 785,
											fieldLabel: ViewUtil.getLabel('address'),
											reference: 'refAddress',
											name: 'addr',
											bind: '{theDetail.addr}',
											//maskRe: /[a-zA-Z0-9_& ]/,
											maxLength : 150,
											enforceMaxLength: true
										},{
											xtype: 'textfield',
											width:300,
											labelWidth: 130,
											fieldLabel: ViewUtil.getLabel('fastCusCode'),
											reference: 'refCusCd',
											bind: '{theDetail.custCd}',
											allowBlank: true,
											maxLength : 16,
											enforceMaxLength: true
										}
									]
								},{ //row 3
									defaults:{
										margin: '5 5 0 0',
										labelAlign: 'right',
										width : 390,
				                        labelWidth: 150
									},
									layout: 'hbox',
									items:[
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('emailAddress'),
											reference: 'refEmail',
											name: 'email',
											bind: '{theDetail.email}',
											maxLength : 50,
											enforceMaxLength: true
										},{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('contactPerson'),
											reference: 'refContPerson',
											name : 'representative',
											bind: '{theDetail.representative}',
//											maskRe: /[a-zA-Z0-9 ]/,
											maxLength : 50,
											enforceMaxLength: true
										},{
											xtype: 'textfield',
											width:300,
											labelWidth: 130,
											fieldLabel: ViewUtil.getLabel('telNo'),
											reference: 'refTelNo',
											name: 'telNo',
											bind: '{theDetail.telNo}',
											maskRe: /[0-9-/]/,
											maxLength : 20,
											enforceMaxLength: true
										}
									]
								},{ //row 4
									defaults:{
										margin: '5 5 0 0',
										labelAlign: 'right',
										width : 390,
				                        labelWidth: 150
									},
									layout: 'hbox',
									items:[
										{
											xtype: 'combo',
											fieldLabel: ViewUtil.getLabel('companyStatus'),
											reference: 'refCompanyStatus',
											name : 'companyStatus',
											bind: {
												value: '{theDetail.companyStatus}',
												store: '{' + me.COMPANY_STATUS_STORE + '}'
											},
											displayField: 'codeName',
					       					valueField: 'code',
					       					queryMode: 'local',
					       					editable : false
										},{
											xtype: 'combo',
											fieldLabel: ViewUtil.getLabel('profileStatus'),
											reference: 'refProfileStatus',
											name : 'profileStatus',
											bind: {
												value: '{theDetail.profileStatus}',
												store: '{' + me.PROFILE_STAUTS_STORE + '}'
											},
											displayField: 'codeName',
											valueField: 'code',
											queryMode: 'local',
											editable : false,
											hidden: true
										},{
											xtype: 'combo',
											fieldLabel: ViewUtil.getLabel('paymentType'),
											reference: 'refPaymentType',
											name : 'paymentType',
											//width:300,
											//labelWidth: 130,
											bind: {
												value: '{theDetail.paymentType}',
												store: '{paymentTypeCombo}'
											},
											editable : false,
											allowBlank: false,
											displayField: 'codeName',
					       					valueField: 'code',
					       					queryMode: 'local',
										},{
											xtype: 'textfield',
											width:300,
											labelWidth: 130,
											fieldLabel: ViewUtil.getLabel('taxCd'),
											reference: 'refTaxCd',
											bind: '{theDetail.taxCd}',
											maxLength : 18,
											enforceMaxLength: true
										},{
											xtype: 'radiogroup',
											layout: 'hbox',
											width:400,
											labelWidth: 130,
											fieldLabel : ViewUtil.getLabel('shpLineType'),
											reference: 'refShpLineType',
											labelAlign: 'right',
											bind: '{ptnrLevelInput}',
											hidden: true,
											items: [
												{
													boxLabel  : 'Container',
													xtype: 'radiofield',
													name      : 'ptnrLevel',
													inputValue: 'CON',
													checked: true,
													margin: '0 0 0 5'
												},{
													boxLabel  : 'Vessel',
													xtype: 'radiofield',
													name      : 'ptnrLevel',
													inputValue: 'VSL',
													margin: '0 0 0 5'
												},{
													boxLabel  : 'BOTH',
													xtype: 'radiofield',
													name      : 'ptnrLevel',
													inputValue: 'BTH',
													margin: '0 0 0 5'
												}
											]
										}
									]
								},{
									defaults:{
										margin: '5 5 0 55',
										labelAlign: 'right',
										width: 200
									},
									layout: 'hbox',
									items:[
										{
											xtype: 'checkboxfield',
											width: 100,
											labelWidth: 100,
											flex:1,
											labelAlign: 'right',
											fieldLabel  : ViewUtil.getLabel('accountHold'),
											reference:'refAccountHold',
											inputValue: 'Y',
					                        uncheckedValue: 'N',
					                        //checked:false,
					                        bind: '{theDetail.accountHold}'									   
										},{
											xtype: 'checkboxfield',
											width: 100,
											labelWidth: 50,
											flex:1,
											labelAlign: 'right',
											fieldLabel  : ViewUtil.getLabel('holdChk'),
											reference:'refHoldChk',
											inputValue: 'Y',
					                        uncheckedValue: 'N',
					                        //checked:false,
									        bind: '{theDetail.holdChk}'
										}
									]
								},{ 
									defaults:{
										margin: '5 5 0 0',
										labelAlign: 'right',
										width : 390,
				                        labelWidth: 150
									},
									layout: 'hbox',
									reference: 'refCusSha',
									hidden: true,
									items:[
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('initPartner'),
											reference: 'refInitPartnerSha',
											name: 'initPtnrSHA',
											bind: '{theDetail.initPtnrSHA}',
											editable : false,
										},{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('cusLisNo'),
											reference: 'refCusLisNoSha',
											name: 'customRefSha',
											bind: '{theDetail.custCd}',
											maskRe: /[a-zA-Z0-9]/,
											maxLength : 6,
											enforceMaxLength: true,
											enableKeyEvents: true,
											listeners: {
												keypress: 'checkLicenseSHA',
											}
										},{
											xtype: 'checkboxfield',
											width:300,
											labelWidth: 130,
											fieldLabel: ViewUtil.getLabel('cusLisExt'),
											boxLabel: ViewUtil.getLabel('extend'),
											reference: 'refCusLisExtSha',
											name : 'extSHA',
											bind: '{theDetail.extSHA}',
											inputValue: 'Y',
					                        uncheckedValue: 'N',
					                        checked:false
										},
									]
								},{
									defaults:{
										margin: '5 5 0 0',
										labelAlign: 'right',
				                        labelWidth: 150,
									},
									layout: 'hbox',
									reference: 'refCusDateSha',
									hidden: true,
									items:[
										{
											xtype: 'datefield',
											width: 277,
											fieldLabel: ViewUtil.getLabel('cusStatDate'),
											reference: 'refCusStatDateSha',
											name: 'customSdateSHA',
											bind: '{theDetail.customSdate}',
											format: MOST.config.Locale.getShortDate()
										},{
											xtype: 'label',
											margin: '10 0 0 0',
											width: 112,
											html: '(Shipping Agent)'
										},{
											xtype: 'datefield',
											width: 277,
											fieldLabel: ViewUtil.getLabel('cusEndDate'),
											reference: 'refCusEndDateSha',
											name: 'customEdateSHA',
											bind: '{theDetail.customEdate}',
											format: MOST.config.Locale.getShortDate()
											
										},{
											xtype: 'label',
											margin: '10 0 0 0',
											width: 112,
											html: '(Shipping Agent)'
										}
									]
								},{
									defaults:{
										margin: '5 5 0 0',
										labelAlign: 'right',
										width : 390,
				                        labelWidth: 150,
									},
									layout: 'hbox',
									reference: 'refCusFwd',
									hidden: true,
									items:[
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('initPartner'),
											reference: 'refInitPartnerFwd',
											name: 'initPtnrFWD',
											bind: '{theDetail.initPtnrFWD}',
											editable : false,
										},{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('cusLisNo'),
											reference: 'refCusLisNoFwd',
											name : 'customRefFwd',
											bind: '{theDetail.custCd}',
											maskRe: /[a-zA-Z0-9]/,
											maxLength : 6,
											enforceMaxLength: true,
											enableKeyEvents: true,
											listeners: {
												keypress: 'checkLicenseFWD',
											}
										},{
											xtype: 'checkboxfield',
											width:300,
											labelWidth: 130,
											fieldLabel: ViewUtil.getLabel('cusLisExt'),
											boxLabel: ViewUtil.getLabel('extend'),
											reference: 'refCusLisExtFwd',
											name : 'extFWD',
											bind: '{theDetail.extFWD}',
											inputValue: 'Y',
					                        uncheckedValue: 'N',
					                        checked:false
										}
									]
								},{
									defaults:{
										margin: '5 5 0 0',
										labelAlign: 'right',
				                        labelWidth: 150,
									},
									layout: 'hbox',
									reference: 'refCusDateFwd',
									hidden: true,
									items:[
										{
											xtype: 'datefield',
											width: 277,
											fieldLabel: ViewUtil.getLabel('cusStatDate'),
											reference: 'refCusStatDateFwd',
											name : 'customSdateFWD',
											bind: '{theDetail.customSFWD}',
											format: MOST.config.Locale.getShortDate()
										},{
											xtype: 'label',
											width: 112,
											margin: '10 0 0 0',
											html: '(Forwarder)'
										},{
											xtype: 'datefield',
											width: 277,
											fieldLabel: ViewUtil.getLabel('cusEndDate'),
											reference: 'refCusEndDateFwd',
											name : 'customEdateFWD',
											bind: '{theDetail.customEFWD}',
											format: MOST.config.Locale.getShortDate()
										},{
											xtype: 'label',
											width: 112,
											margin: '10 0 0 0',
											html: '(Forwarder)'
										}
									]
								},{
									xtype: 'container',
									hidden: true,
									defaults:{
										margin: '5 5 0 0',
										labelAlign: 'right',
										labelWidth: 150,
										width : 390
									},
									layout: 'hbox',
									items:[
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('depositCredit'),
											reference: 'refDepositCredit',
											name : 'creditLimit',
											bind: '{theDetail.creditLimit}',
											maskRe: /[0-9]/,
											maxLength : 12,
											enforceMaxLength: true,
											hidden: true
										},{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('balance'),
											reference: 'refBalance',
											name : 'bal',
											bind: '{theDetail.bal}',
											maskRe: /[0-9]/,
											maxLength : 12,
											enforceMaxLength: true,
											hidden: true,
										}
									]
								},{
									xtype: 'container',
									hidden: true,
									defaults:{
										margin: '5 5 0 0',
										labelAlign: 'right',
				                        labelWidth: 150,
				                        width: 390
									},
									layout: 'hbox',
									items:[
										{
											xtype: 'textfield',
											reference: 'refMarineAgentCode',
											fieldLabel: ViewUtil.getLabel('marineAgentCode'),
											editable : false,
											name : 'maAgencyCode',
											maskRe: /[a-zA-Z0-9]/,
											enforceMaxLength: true,
											maxLength : 10,
											bind: '{theDetail.maAgencyCode}',
											hidden: true,
										},{
											xtype: 'textfield',
											reference: 'refMarineAgentNm',
											fieldLabel: ViewUtil.getLabel('marineAgentNm'),
											editable : false,
											name: 'maAgencyNm',
											maskRe: /[a-zA-Z0-9 ]/,
											enforceMaxLength: true,
											maxLength : 150,
											bind: '{theDetail.maAgencyNm}',
											hidden: true,
										}
									]
								},{
									xtype: 'container',
									hidden: true,
									defaults:{
										margin: '5 5 0 0',
										labelAlign: 'right',
										width : 390,
				                        labelWidth: 150,
									},
									layout: 'hbox',
									items:[
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('connQty'),
											reference: 'refConnQty',
											name: 'connQty',
											bind: '{theDetail.connQty}',
											maskRe: /[0-9]/,
											maxLength : 5,
											enforceMaxLength: true
										},{
											xtype: 'combo',
											width:295,
											fieldLabel: ViewUtil.getLabel('connType'),
											reference: 'refConnType',
											name : 'connType',
											bind: {
												value: '{theDetail.connType}',
												//store: '{' + me.CONN_TYPE_COMBO_STORE + '}'
											},
											displayField: 'scdNm',
					       					valueField: 'scd',
					       					editable : false,
					       					listeners: {
												change	: 'onConnTypeSelect'
											}
										},{
											xtype: 'combo',
											width:90,
											labelWidth: 130,
											reference: 'refConnSubType',
											name : 'connSubType',
											bind: {
												value: '{theDetail.connSubType}',
												//store: '{' + me.CONNSUB_TYPE_COMBO_STORE + '}'
											},
											displayField: 'scdNm',
					       					valueField: 'scd',
					       					editable : false,
				       						hidden: true
										},{
											xtype: 'checkboxfield',
											width: 300,
											labelWidth: 130,
											margin: '5 5 0 100',
											fieldLabel: ViewUtil.getLabel('belongToPort'),
											reference: 'refBelongToPort',
											name: 'jpbiShaYn',
											bind: '{theDetail.jpbiShaYn}',
											inputValue: 'Y',
					                        uncheckedValue: 'N',
											checked:false,
											hidden : true
										}
									]
								},{
									xtype: 'checkboxgroup',
									width: 450,
									labelWidth: 150,
									margin: '5 5 0 0',
									flex:1,
									columns: 4,
									labelAlign: 'right',
									fieldLabel  : ViewUtil.getLabel('partnerType'),
									reference:'refChkGrpPtnrTypes',
							        vertical: false,
							        listeners: {
							        	change:'onCheckChanged'
							        },
							        items: [ 
							            { boxLabel: ViewUtil.getLabel('shippingLine'), reference:'refChkSHP', name: 'rb', inputValue: 'SHP' },
							            { boxLabel: ViewUtil.getLabel('shippingAgent'),reference:'refChkSHA', name: 'rb', inputValue: 'SHA'},
							            { boxLabel: ViewUtil.getLabel('trucker'), reference:'refChkTRK', name: 'rb', inputValue: 'TRK' },
							            { boxLabel: ViewUtil.getLabel('contractor'),  reference:'refChkCTT', name: 'rb', inputValue: 'CTT' },
							            { boxLabel: ViewUtil.getLabel('fowarder'),reference:'refChkFWD', name: 'rb', inputValue: 'FWD' },
							            { boxLabel: ViewUtil.getLabel('shipperConsignee'), reference:'refChkCNS', name: 'rb', inputValue: 'CNS' },
							            { boxLabel: ViewUtil.getLabel('tally'),  reference:'refChkTLY', name: 'rb', inputValue: 'TLY' }
							        ]
								},{
									xtype: 'grid',
									title:'Shipping Line List',
									width: 350,
									height: 200,
									flex: 1,
									margin:'10 0 0 0',
									layout: {
										type: 'fit'
									},
									style: {
										borderColor: '#AAA',
										borderStyle: 'solid',
										borderWidth: 'thin'
									},
									reference:'refShpList',
									bind: {
										store: '{' + me.SHIPPER_LIST_STORE + '}'
									},
									columns: {
										defaults: {
						            		style : 'text-align:center',
						            		align: 'center'
						            	},
						            	items: GridUtil.getGridColumns('CompanyShippingLine')
									},
									listeners: {
										celldblclick: 'openShpLinePopup'
									},
									autoScroll: true,
									hidden: true,
									dockedItems: [
										{
									        xtype: 'toolbar',
									        dock: 'top',
									        items: [
									        	{
										        	xtype: 'button',
													text: ViewUtil.getLabel('add'),
													iconCls: 'x-fa fa-plus',
													ui: 'create-button',
													listeners: {
														click: 'addShippingLine'
													}
										        },{
										        	xtype: 'button',
													text: ViewUtil.getLabel('remove'),
													iconCls: 'x-fa fa-minus',
													ui: 'delete-button',
													listeners: {
														click: 'removeShippingLine'
													}
										        }
										    ]
									    }
									]
								}
							]
						}
					]
				}
			]
		});
		
		this.callParent();
	}
});