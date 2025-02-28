Ext.define('MOST.view.planning.terminalviewfiltering', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-terminalviewfiltering',

	requires: [
		'TSB.gux.terminal.TerminalRenderer',
	],
	
	reference:'refWarehouseFiltering',
	
	width: 805,
	height: 247,
	
	controller: 'terminalview',
	
	listeners:{
		afterrender : 'onFilteringLoad'
	},
	
	viewModel: {
		type: 'terminalview'
	},
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			xtype: 'container',
			layout: {
				type: 'vbox'
			},
			items:[
				{
					xtype:'container',
					layout:{
						type:'hbox'
					},
					items:[
						{
							xtype: 'container',
							layout: 'vbox',
							items:[
								{
									xtype: 'fieldset',
									layout:{
										type: 'vbox'
									},
									margin: '5 5 5 5',
									items:[
										{
											xtype : 'vesselcalllistfield',
											margin : '0 0 0 5',
											width : 230,
											reference : 'ctlJpvc',
											fieldLabel : ViewUtil.getLabel('vslcallid'),
											labelAlign : 'right',
											labelWidth : 80,
											emptyText : ViewUtil.getLabel('jpvc'),
											bind: {
												value: '{theSearch.vslCallId}'
											}
										},
										{
											xtype: 'container',
											layout:{
												type: 'hbox'
											},
											items:[
												{
													xtype : 'combobox',
													margin: '5 0 0 5',
													width : 230,
													labelWidth : 80,
													reference : 'ctlMasterBL',
													fieldLabel : ViewUtil.getLabel('masterBlNo'),
													bind : {
														store: '{masterBlCombo}',
														value: '{theSearch.masterBl}'
													},
													queryMode : 'local',
													displayField: 'mfDocId',
				        		   					valueField: 'mfDocId',
													editable : false,
													labelAlign : 'right',
													listeners : {
														select: 'onSelectSnBlCombo'
													}
												},{
													xtype : 'combobox',
													margin: '5 0 0 0',
													width : 230,
													labelWidth : 80,
													reference : 'ctlSubBL',
													fieldLabel : ViewUtil.getLabel('subBlNo'),
													bind : {
														store: '{subBlCombo}',
														value: '{theSearch.subBl}'
													},
													queryMode : 'local',
													displayField: 'blNo',
				        		   					valueField: 'blNo',
													editable : false,
													labelAlign : 'right',
													listeners : {
													}
												}
											]
										},{
											xtype: 'container',
											layout:{
												type: 'hbox'
											},
											items:[
												{
													xtype : 'combobox',
													margin: '5 0 0 5',
													width : 230,
													labelWidth : 80,
													reference : 'ctlBookingNo',
													fieldLabel : ViewUtil.getLabel('SNLBookingNo'),
													bind : {
														store: '{bookingNoCombo}',
														value: '{theSearch.bookingNo}'
													},
													queryMode : 'local',
													displayField: 'mfDocId',
				        		   					valueField: 'mfDocId',
													editable : false,
													labelAlign : 'right',
													listeners : {
														select: 'onSelectSnBlCombo'
													}
												},{
													xtype : 'combobox',
													margin: '5 0 0 0',
													width : 230,
													labelWidth : 80,
													reference : 'ctlSNNo',
													fieldLabel : ViewUtil.getLabel('LASNNo'),
													bind : {
														store: '{shippingNoteCombo}',
														value: '{theSearch.shipgNoteNo}'
													},
													queryMode : 'local',
													displayField: 'shipgNoteNo',
				        		   					valueField: 'shipgNoteNo',
													editable : false,
													labelAlign : 'right',
													listeners : {
													}
												}
											]
										}
									]
								},{
									xtype: 'fieldset',
									layout:{
										type: 'vbox',
									},
									width: 497,
									height : 62,
									margin: '0 5 5 5',
									items:[
										{
											xtype: 'checkboxgroup',
											margin:'5 0 0 0',
											reference:'refChkFiltering',
											width:497,
									        vertical: false,
									        items: [
									        	{ boxLabel: ViewUtil.getLabel('import'), disabled:false, reference:'refImport', flex: 1, name: 'rb'},
									            { boxLabel: ViewUtil.getLabel('export'), disabled:false, reference:'refExport', flex: 1, name: 'rb'},
									            { boxLabel: ViewUtil.getLabel('custClearanceTranshipment'), disabled:false, reference:'refTranshipment', flex: 1, name: 'rb'},
									            { boxLabel: ViewUtil.getLabel('storage'), disabled:false, reference:'refStorage', flex: 1, name: 'rb'},
									            { boxLabel: ViewUtil.getLabel('dg'), disabled:false, reference:'refDg', flex: 1, name: 'rb'},
									        ]
										}
									]
								}
							]
						},{
							xtype: 'fieldset',
							margin: '5 5 5 0',
							layout:{
								type: 'vbox'
							},
							items:[
								{
									xtype : 'combobox',
									margin: '0 0 5 5',
									width : 250,
									labelWidth : 100,
									reference : 'ctlCargoType',
									fieldLabel : ViewUtil.getLabel('cargotype'),
									bind : {
										store: '{cargoTypeCombo}',
										value: '{theSearch.cargoTp}'
									},
									queryMode : 'local',
									displayField: 'scdNm',
        		   					valueField: 'scd',
									editable : false,
									labelAlign : 'right'
								},{
									xtype : 'combobox',
									margin: '0 0 5 5',
									width : 250,
									labelWidth : 100,
									reference : 'ctlCmdtGrp',
									fieldLabel : ViewUtil.getLabel('commodityGroup'),
									bind : {
										store: '{commodityCodeGroupCombo}',
										value: '{theSearch.cmdtGrp}'
									},
									queryMode : 'local',
									displayField: 'scdNm',
        		   					valueField: 'scd',
									editable : false,
									labelAlign : 'right',
									listeners : {
										select: 'onSelectCmdtCombo'
									}
								},{
									xtype : 'combobox',
									margin: '0 0 5 5',
									width : 250,
									labelWidth : 100,
									reference : 'ctlCmdt',
									fieldLabel : ViewUtil.getLabel('commodity'),
									bind : {
										store: '{commodityCodeCombo}',
										value: '{theSearch.cmdt}'
									},
									queryMode : 'local',
									displayField: 'scdNm',
        		   					valueField: 'scd',
									editable : false,
									labelAlign : 'right'
								},{
									xtype: 'container',
									layout:{
										type: 'hbox'
									},
									defaults:{
										labelAlign : 'right'
									},
									items:[
										{
											xtype: 'textfield',
											labelWidth: 105,
											width: 222,
											fieldLabel: ViewUtil.getLabel('agent'),
											bind: '{theSearch.agent}',
											reference: 'txtPartnerCode',
											listeners:{
												change: 'onUpperCase'
											}
										},{
											xtype: 'button',
											margin: '0 0 5 5',
											iconCls: 'x-fa fa-search',
											reference:'refBtnSearchAgent',
											listeners: {
												click: 'onTxtPtnrCdTriggerClick'
											}
										}
									]
								},{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									defaults:{
										labelAlign : 'right'
									},
									items: [
										{
											xtype: 'textfield',
											fieldLabel: ViewUtil.getLabel('pod'),
											reference:'txtPodCd',
											bind: '{theSearch.pod}',
											labelWidth:105,
											width: 222
										},{
											xtype: 'button',
											iconCls: 'x-fa fa-search',
											margin: '0 0 5 5',
											reference:'refBtnPOD',
											listeners:{
												click: 'openPortPopup'
											}
										}
									]
								}
							]
						}
					]
				},{
					xtype: 'container',
					width: 800,
                    layout: {
                    	type: 'hbox',
    	                pack: 'end'
                    },
					items: [
						{
							xtype: 'button',
							margin: '0 5 0 5',
							text: ViewUtil.getLabel('clear'),
							iconCls: 'x-fa fa-refresh',
							listeners: {
		                        click: 'onClear'
		                    }
						},{
		                    xtype: 'button',
		                    margin: '0 5 0 0',
		                    text: 'Apply To The View', 
		                    iconCls: 'x-fa fa-search',
		                    cls: 'search-button', 
		                    reference:'refBtnRetrieve',
		                    listeners: {
		                        click: 'onFilteringSearch'
		                    }
		                },{
							xtype: 'button',
							margin: '0 5 0 0',
							text: ViewUtil.getLabel('close'),
							iconCls: 'x-fa fa-close',
							listeners: {
		                        click: 'onClose'
		                    }
						}
					]
				}
			]
		}),
		
		me.callParent();
	}
});