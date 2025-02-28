Ext.define('MOST.view.vessel.vesselschedule.VesselScheduleDetail', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-vesselschedulevcsdetail',
	
	listeners:{
		afterrender: 'onDetailLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refVesselParicularGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'vslParticularList',
	VESSEL_PARTICULAR_CONFIRM_STORE: 'vpConfirmCombo',
	TERMINAL_COMBO_STORE: 'terminalCombo',
	BERTH_WHARF_COMBO_STORE: 'berthWharfCombo',
	BERTH_ALONGSIDE_COMBO_STORE: 'berthAlongSideCombo',
	PURPOSE_CALL_COMBO_STORE: 'purpCallCombo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	scrollable: true,
	
	config:{
		vslCd: '',
		vslParticular: null,
		mode:''
	},
	
	height: 947,
	width: 1200,
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			xtype:'form',
			defaults:{
				margin: '0 5 0 5'
			},
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
	                xtype: 'container',
	                defaults:{
	                	padding: '0 10 10 10'
	                },
	                items: [
	    				{
	    					xtype: 'fieldset', 				
	    					title: ViewUtil.getLabel('vslPartInfo'),
	    					items:[
	    						{
	    							xtype: 'container',  		// row 1
	    							layout: {
	    								type: 'hbox',
	    								align: 'stretch'
	    							},
	    							defaults:{
	    								labelAlign: 'right',
	    								labelWidth: 100,
	    								margin: '0 0 5 0'	
	    							},
	    							items:[
	    								{
	    									xtype:'textfield',
	    									reference: 'txtVslId',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslpatiVslCd'),
	    									editable: false,
	    									bind: {
	    										value: '{theVslSchl.vslPartiItem.vslCd}',
	    									}
	    								},{
	    									xtype:'textfield',
	    									reference: 'txtVslNm',
	    									flex: 2,
	    									fieldLabel: ViewUtil.getLabel('vslpatiVslNm'),
	    									editable: false,
	    									bind: {
	    										value: '{theVslSchl.vslPartiItem.vslNm}',
	    									}
	    								},{
	    									xtype:'textfield',
	    									reference: 'txtVslTp',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslschlVslTp'),
	    									editable: false,
	    									bind: {
	    										value: '{theVslSchl.vslPartiItem.vslTpNm}',
	    									}
	    								},
	    							]
	    						},{
	    							xtype: 'container',  		// row 2
	    							layout: {
	    								type: 'hbox',
	    								align: 'stretch'
	    							},
	    							defaults:{
	    								labelAlign: 'right',
	    								labelWidth: 100,
	    								margin: '5 0 5 0'	
	    							},
	    							items:[
	    								{
	    									xtype:'textfield',
	    									reference: 'txtLoa',
	    									flex:1,
	    									fieldLabel: ViewUtil.getLabel('vslschlLoa'),
	    									editable: false,
	    									bind: {
	    										value: '{theVslSchl.vslPartiItem.loa}',
	    									}
	    								},{
	    									xtype: 'container',
	    									flex: 2,
	    									layout:{
	    										type: 'hbox',
	    										align: 'stretch'
	    									},
	    									defaults:{
	    										labelAlign: 'right',
	    										labelWidth: 100
	    									},
	    									items:[
		    									{
			    									xtype:'textfield',
			    									reference: 'txtnrt',
			    									flex: 1,
			    									fieldLabel: ViewUtil.getLabel('vslpatiNRT'),
			    									editable: false,
			    									bind: {
			    										value: '{theVslSchl.vslPartiItem.nrt}',
			    									}
			    								},{
			    									xtype:'textfield',
			    									reference: 'txtgrt',
			    									flex: 1,
			    									fieldLabel: ViewUtil.getLabel('vslpatiGRT'),
			    									editable: false,
			    									bind: {
			    										value: '{theVslSchl.vslPartiItem.grt}',
			    									}
			    								}
	    									]
	    								},{
	    									xtype:'textfield',
	    									reference: 'txtDisplacement',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslpatiDisplacement'),
	    									editable: false,
	    									bind: {
	    										value: '{theVslSchl.vslPartiItem.disp}',
	    									}
	    								}
	    							]
	    						},{
	    							xtype: 'container',  		// row 3
	    							layout: {
	    								type: 'hbox',
	    								align: 'stretch'
	    							},
	    							defaults:{
	    								labelAlign: 'right',
	    								labelWidth: 100,
	    								margin: '5 0 5 0'	
	    							},
	    							items:[
	    								{
	    									xtype:'textfield',
	    									hidden: true,
	    									reference: 'txtISSCNo',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslpatiISSCNo'),
	    									editable: false,
	    									bind: {
	    										value: '{theVslSchl.vslPartiItem.issNo}',
	    									}
	    								},{
	    									xtype:'textfield',
	    									reference: 'txtExpiryDate',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslpatiExpiryDate'),
	    									editable: false,
	    									bind: {
	    										value: '{theVslSchl.vslPartiItem.isscExprDt}',
	    									}
	    								},{
	    									xtype:'textfield',
	    									hidden: true,
	    									reference: 'txtAuthority',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslschlAuthority'),
	    									editable: false,
	    									bind: {
	    										value: '{theVslSchl.vslPartiItem.isscNmAuth}',
	    									}
	    								},{
											xtype:'textfield',
											reference: 'txtIMoNo',
											flex: 1,
											fieldLabel: ViewUtil.getLabel('vslschlImono'),
											editable: false,
											bind: {
												value: '{theVslSchl.vslPartiItem.imoNo}',
											}
										}
	    							]
	    						},{
	    							xtype: 'container',  		// row 4
	    							layout: {
	    								type: 'hbox',
	    								align: 'stretch'
	    							},
	    							defaults:{
	    								labelAlign: 'right',
	    								labelWidth: 100,
	    								margin: '5 0 5 0'	
	    							},
	    							items:[
	    								{
	    									xtype:'textfield',
	    									reference: 'txtVesselOwner',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslpatiVesselOwner'),
	    									editable: false,
	    									bind: {
	    										value: '{theVslSchl.vslPartiItem.vesselOwner}',
	    									}
	    								},{
	    									xtype:'textfield',
	    									reference: 'txtSA',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslpatiSA'),
	    									editable: false,
	    									bind: {
	    										value: '{theVslSchl.vslPartiItem.saCorpId}',
	    									}
	    								},{
	    									xtype:'textfield',
	    									reference: 'txtSANm',
	    									margin: '5 0 5 5',
	    									flex: 1,
	    									editable: false,
	    									bind: {
	    										value: '{theVslSchl.vslPartiItem.corpNm}',
	    									}
	    								},{
	    									xtype:'textfield',
	    									reference: 'txtCallSign',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslpatiCallSign'),
	    									editable: false,
	    									bind: {
	    										value: '{theVslSchl.vslPartiItem.callSign}',
	    									}
	    								}
	    							]
	    						},{
	    							xtype: 'container',  		// row 5
	    							layout: {
	    								type: 'hbox',
	    								align: 'stretch'
	    							},
	    							defaults:{
	    								labelAlign: 'right',
	    								labelWidth: 100,
	    								margin: '5 0 0 0'	
	    							},
	    							items:[
	    								{
	    									xtype:'textfield',
	    									reference: 'txtShippingLine',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslpatiShippingLine'),
	    									editable: false,
	    									bind: {
	    										value: '{theVslSchl.vslPartiItem.shippingLineCd}',
	    									}
	    								},{
	    									xtype:'textfield',
	    									reference: 'txtDwt',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('dwt'),
	    									readOnly: true,
	    									bind: {
	    										value: '{theVslSchl.vslPartiItem.dwt}',
	    									}
	    								},{
	    									xtype:'container',
	    									flex: 3,
	    								}
	    							]
	    						}
	    					]
	    				},
	    				{
	    					xtype: 'fieldset',
	    					title: ViewUtil.getLabel('vslschlVoyInfo'),
	    					items:[
	    						{
	    							xtype: 'container',  		// row 1
	    							layout: {
	    								type: 'hbox'
	    							},
	    							defaults:{
	    								labelAlign: 'right',
	    								labelWidth: 100,
	    								margin: '0 0 0 0'
	    							},
	    							items:[
	    								{
	    									xtype: 'partnercdtypefield',
	    									fieldLabel: ViewUtil.getLabel('shippingAgent'),
	    									reference: 'ctlPartner',
	    									flex: 1,
	        			   					params:{
	        			   						ptnrType: CodeConstants.CM_PTNRTP_SHA
	        			   					},
	    									change: function (field, newValue) {
	    										field.setValue(newValue.toUpperCase());
	    									},
	    									bind: {
	    										value: '{theVslSchl.arrvSaId}',
	    									},
	    									editable: false
	    								},{
	    									xtype:'textfield',
	    									reference: 'txtDeptSA',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslschlDeptSA'),
	    									editable: false,
	    									bind: {
	    										value: '{theVslSchl.deprSaId}',
	    									}
	    								},{
	    									xtype:'textfield',
	    									reference: 'txtShipCallNo',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('shipCallNo'),
	    									bind: {
	    										value: '{theVslSchl.scn}',
	    									}
	    								},{
	    									xtype: 'container',
	    									flex: 1,
	    									items:[
	    										{
			    									xtype:'container',
			    									padding: '0 0 0 100',
			    									flex: 1,
			    									items:[
			    										{
			    											xtype: 'checkboxfield',
			    											boxLabel: ViewUtil.getLabel('domesticService'),
			    											reference: 'refDomesticChk',
			    											bind: '{theVslSchl.domesticChk}',
			    											inputValue: 'Y',
			    					                        uncheckedValue: 'N',
			    					                        checked:false
			    										}
			    									]
												}
	    									]
	    								}
	    							]
	    						},{
	    							xtype: 'container',  		// row 2
	    							layout: {
	    								type: 'hbox',
	    								align: 'stretch'
	    							},
	    							defaults:{
	    								labelAlign: 'right',
	    								labelWidth: 100,
	    								margin: '0 0 5 0'	
	    							},
	    							items:[
	    								{
	    									xtype:'textfield',
	    									reference: 'txtJPVC',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslschlJPVCNo'),
	    									editable: false,
	    									bind: {
	    										value: '{theVslSchl.vslCallId}',
	    									}
	    								},{
	    									xtype:'textfield',
	    									hidden: true,
	    									reference: 'txtShpCNo',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslschlShpCNo'),
	    									editable: false,
	    									bind: {
	    										value: '{theVslSchl.scn}',
	    									}
	    								},{
	    									xtype:'textfield',
	    									reference: 'txtCntNM',
	    									flex: 1,
	    									allowBlank: false,
	    									fieldLabel: ViewUtil.getLabel('vslschlCntNM'),
	    									bind: {
	    										value: '{theVslSchl.contNm}',
	    									},
	    									listeners:{
	    										change: 'onUpperCase'
	    									}
	    								}
	    							]
	    						},{
	    							xtype: 'container',  		// row 3
	    							layout: {
	    								type: 'hbox',
	    								align: 'stretch'
	    							},
	    							defaults:{
	    								labelAlign: 'right',
	    								labelWidth: 100,
	    								margin: '5 0 5 0'	
	    							},
	    							items:[
	    								{
	    									xtype: 'combo',
	    									reference: 'cboPurpCall',
	    		        					flex: 1,
	    		        					fieldLabel: ViewUtil.getLabel('vslschlPurposeCall'),
	    		        					emptyText: 'Select',
	    		        					bind:{
	    		        						value: '{theVslSchl.purpCall}',
	    		        						store: '{' + me.PURPOSE_CALL_COMBO_STORE + '}'
	    		        					},
	    		        					displayField:'scdNm',
	    		        					valueField: 'scd',
	    		        					listeners: {
	    		        						select: 'onSelectPurpo'
	    		        					},
	    									allowBlank: false
	    								},{
	    									xtype: 'combo',
	    									reference: 'cboPurposeCall1',
	    									fieldLabel: ViewUtil.getLabel('operationType'),
	    		        					flex: 1,
	    		        					emptyText: 'Select',
	    		        					bind:{
	    		        						value: '{theVslSchl.cargoOpTp}',
	    		        						store: '{cgOpTypeCombo}'
	    		        					},
	    		        					listeners:{
	    		        						select: 'onSelectcgTp'
	    		        					},
	    		        					displayField:'optionName',
	    		        					valueField: 'optionValue',
	    		        					queryMode: 'local',
	    		        					hidden: true,
	    								},{
	    									xtype:'textfield',
	    									reference: 'txtPurposeCall',
	    									fieldLabel: ' ',
	    									flex: 1,
	    									bind: {
	    										value: '{theVslSchl.cargoOpTp}',
	    									},
	    									hidden: true,
	    								},{
	    									xtype: 'container',
	    									reference: 'refSpace',
	    									flex: 1
	    								},{
	    									xtype:'textfield',
	    									reference: 'txtCntNo',
	    									flex: 1,
	    									allowBlank: false,
	    									fieldLabel: ViewUtil.getLabel('vslschlCntNo'),
	    									bind: {
	    										value: '{theVslSchl.contNo}',
	    									},
	    									listeners:{
	    										change: 'onUpperCase'
	    									}
	    								}
	    							]
	    						},{
	    							xtype: 'container',  		// row 4
	    							layout: {
	    								type: 'hbox',
	    								align: 'stretch'
	    							},
	    							defaults:{
	    								labelAlign: 'right',
	    								labelWidth: 100,
	    								margin: '5 0 5 0'	
	    							},
	    							items:[
	    								{
	    									xtype: 'combo',
	    									reference: 'cboBerthLoc',
	    									hidden: true,
	    		        					flex: 1,
	    		        					fieldLabel: ViewUtil.getLabel('vslschlBerthLoc'),
	    		        					emptyText: 'Select',
	    		        					bind: {
	    		        						value: '{theVslSchl.locCd}',
	    										store: '{' + me.TERMINAL_COMBO_STORE + '}'
	    									},
	    									displayField:'scdNm',
	    									valueField: 'scd',
	    									allowBlank: true,
	    									listeners:{
	    										select:'onSelectBerth'
	    									}
	    								},{
	    									xtype: 'container',
	    									flex: 2
	    								}
	    							]
	    						},{
	    							xtype: 'container',  		// row 5
	    							layout: {
	    								type: 'hbox',
	    								align: 'stretch'
	    							},
	    							defaults:{
	    								labelAlign: 'right',
	    								labelWidth: 100,
	    								margin: '5 0 5 0'	
	    							},
	    							items:[
	    								{
	    									xtype: 'combo',
	    									reference: 'cboBerthWharf',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslschlBerthLoc'),
	    		        					emptyText: 'Select',
	    		        					bind:{
	    		        						value: '{theVslSchl.berthLoc}',
	    		        						store: '{' + me.BERTH_WHARF_COMBO_STORE + '}'
	    		        					},
	    		        					displayField:'locNm',
	    		        					valueField: 'locId',
	    						            queryMode: 'local'
	    								},{
                                            xtype: 'container',
                                            layout: {
                                                flex: 1,
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            defaults: {
                                                labelAlign: 'right',
                                                margin: '0 5 0 0',
                                                labelWidth: 90
                                            },
                                            items: [
                                                {
                                                    xtype: 'numberfield',
                                                    reference: 'refStartPos',
                                                    fieldLabel: ViewUtil.getLabel('wharfmark'),
                                                    bind: {
                                                        readOnly: '{disable}',
                                                        value: '{theVslSchl.startPos}'
                                                    },
                                                    width: 200,
                                                    fieldStyle: 'background-color:#faff91;',
                                                },{
                                                    xtype: 'textfield',
                                                    reference: 'refEndPos',
                                                    bind: {
                                                        value: '{theVslSchl.endPos1}'
                                                    },
                                                    fieldLabel: '',
                                                    editable: false,
                                                    width: 80,
                                                    fieldStyle: 'background-color:#faff91;',
                                                }
                                            ]
                                        },{
	    									xtype: 'combo',
											reference: 'cboBerthAlongSide',
				        					flex: 1,
				        					fieldLabel: ViewUtil.getLabel('vslpatiBerthAlongSide'),
				        					emptyText: 'Select',
				        					bind:{
				        						value: '{theVslSchl.berthAlongSide}',
				        						store: '{' + me.BERTH_ALONGSIDE_COMBO_STORE + '}'
				        					},
				        					displayField:'berthAlongSideNm',
				        					valueField: 'berthAlongSide',
				        					queryMode: 'local'
										}
	    							]
	    						},{
	    							xtype: 'container',  		// row 6
	    							layout: {
	    								type: 'hbox'
	    							},
	    							defaults:{
	    								labelAlign: 'right',
	    								labelWidth: 100,
	    								margin: '5 0 5 0'	
	    							},
	    							items:[
	    								{
	    									xtype: 'combo',
	    									reference: 'cboCargoType',
	    		        					flex: 1,
	    		        					fieldLabel: ViewUtil.getLabel('vslschlCargoTp'),
	    		        					emptyText: 'Select',
	    		        					bind:{
	    		        						value: '{theVslSchl.cargoTpMpts}',
	    		        						store: '{cargoTypeCombo}'
	    		        					},
	    		        					displayField:'scdNm',
	    		        					valueField: 'scd',
	    									allowBlank: false,
	    									listeners:{
	    										select: 'onSelectCargoType'
	    									}
	    								},{
											xtype: 'checkboxfield',
											reference: 'refCheckBarterTrade',
											boxLabel: ViewUtil.getLabel('vslschlBarterTrade'),
											margin: '5 0 0 20',
											readOnly: true,
											inputValue: 'Y',
					                        uncheckedValue: 'N',
											bind: {
												value: '{theVslSchl.barterTrade}'
											},
											flex: 1
										},{
	    									xtype:'textfield',
	    									reference: 'txtRefJPVCNo',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslschlRefVslCallId'),
	    									bind:{
	    		        						value: '{theVslSchl.refVslCallId}',
	    		        						
	    		        					},
	    								}
	    							]
	    						},{
	    							xtype: 'container',  		// row 7
	    							layout: {
	    								type: 'hbox'
	    							},
	    							defaults:{
	    								labelAlign: 'right',
	    								labelWidth: 100,
	    								margin: '5 0 5 0'	
	    							},
	    							items:[
	    								{
	    									xtype:'textfield',
	    									reference: 'txtIboundVoy',
	    									flex: 1,
	    									maskRe: /[a-zA-Z0-9\/\-\.]/,
	    									allowBlank: false,
	    									fieldLabel: ViewUtil.getLabel('vslschlIboundVoy'),
	    									bind:{
	    		        						value: '{theVslSchl.inbVoy}',
	    		        					},
	    		        					listeners:{
	    		        						change: 'onChangeInOutVoyage'
	    		        					},
	    		        					maxLength: 15,
	    		        					enforceMaxLength: true
	    								},{
	    									xtype: 'container',
	    									flex: 1
	    								},{
	    									xtype:'textfield',
	    									reference: 'txtOboundVoy',
	    									flex: 1,
	    									allowBlank: false,
	    									maskRe: /[a-zA-Z0-9\/\-\.]/,
	    									fieldLabel: ViewUtil.getLabel('vslschlOboundVoy'),
	    									bind:{
	    		        						value: '{theVslSchl.outbVoy}',
	    		        					},
	    		        					listeners:{
	    		        						change: 'onChangeInOutVoyage',
	    		        						//focusleave: 'onLostFocusOutVoyage'
	    		        					},
	    		        					maxLength: 15,
	    		        					enforceMaxLength: true
	    								}
	    							]
	    						},{
	    							xtype: 'container',  		// row 8
	    							layout: {
	    								type: 'hbox'
	    							},
	    							defaults:{
	    								labelAlign: 'right',
	    								labelWidth: 100,
	    								margin: '5 0 5 0'
	    							},
	    							items:[
	    								{
	    									xtype:'textfield',
	    									reference: 'txtIBServLn',
	    									margin: '0 0 0 0',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslschlIBServLn'),
	    									bind: {
	    										value: '{theVslSchl.ibSrvLane}',
	    									},
	    									maxLength: 10,
	    									enforceMaxLength: true
	    								},{
	    									xtype: 'combo',
	    									hidden: true,
	    									reference: 'cboBrtWd',
	    									margin: '7 0 0 0',
	    		        					flex: 1,
	    		        					fieldLabel: ViewUtil.getLabel('vslschlBrtWd'),
	    		        					editable: false,
	    		        					emptyText: 'Select',
	    								},{
	    									xtype:'textfield',
	    									reference: 'txtOBServLn',
	    									margin: '0 0 0 0',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslschlOBServLn'),
	    									bind: {
	    										value: '{theVslSchl.obSrvLane}',
	    									},
	    									maxLength: 10,
	    									enforceMaxLength: true
	    								}
	    							]
	    						},{
	    							xtype: 'container',  		// row 9
	    							layout: {
	    								type: 'hbox',
	    								align: 'stretch'
	    							},
	    							defaults:{
	    								labelAlign: 'right',
	    								labelWidth: 100,
	    								margin: '5 0 5 0'	
	    							},
	    							items:[
	    								{
	    									xtype: 'datetimefield',
	    									reference: 'ctlEta',
	    		        					flex: 1,
	    		        					fieldLabel: ViewUtil.getLabel('vslschlETA'),
	    		        					allowBlank: false,
	    		        					editable: false,
	    		        					listeners:{
	    		        						select: 'onSelectEta'
	    		        					},
	    		        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
	    								},{
	    									xtype: 'datetimefield',
	    									reference: 'ctlAta',
	    		        					flex: 1,
	    		        					editable: false,
	    		        					fieldLabel: ViewUtil.getLabel('vslschlATA'),
	    		        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
	    		        					bind:{	    				
	    		        						readOnly: true
	    		        					},
	    		        					readOnly: true
	    								},{
	    									xtype:'datetimefield',
	    									reference: 'ctlYot',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslschlYOT'),
	    									editable: false,
	    									// bind: {
	    									// 	value: '{theVslSchl.yot}',
	    									// }
	    								}
	    							]
	    						},{
	    							xtype: 'container',  		// row 10
	    							layout: {
	    								type: 'hbox',
	    								align: 'stretch'
	    							},
	    							defaults:{
	    								labelAlign: 'right',
	    								labelWidth: 100,
	    								margin: '5 0 5 0'	
	    							},
	    							items:[
	    								{
	    									xtype: 'datetimefield',
	    									reference: 'ctlEtd',
	    		        					flex: 1,
	    		        					fieldLabel: ViewUtil.getLabel('vslschlETD'),
	    		        					allowBlank: false,
	    		        					editable: false,
	    		        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
	    								},{
	    									xtype: 'datetimefield',
	    									reference: 'ctlAtd',
	    									flex: 1,
	    									editable: false,
	    		        					fieldLabel: ViewUtil.getLabel('vslschlATD'),
	    		        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
	    		        					bind:{	    				
	    		        						readOnly: true
	    		        					},
	    		        					readOnly: true
	    								},{
	    									xtype:'datetimefield',
	    									reference: 'ctlYct',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslschlYCT'),
	    									editable: false,
	    									// bind: {
	    									// 	value: '{theVslSchl.yct}',
	    									// }
	    								}
	    							]
	    						},{
	    							xtype: 'container',  		// row 11
	    							layout: {
	    								type: 'hbox',
	    								align: 'stretch'
	    							},
	    							defaults:{
	    								labelAlign: 'right',
	    								labelWidth: 100,
	    								margin: '5 0 5 0'	
	    							},
	    							items:[
	    								{
	    									xtype: 'datetimefield',
	    									reference: 'ctlEtw',
	    		        					flex: 1,
	    		        					editable: false,
	    		        					fieldLabel: ViewUtil.getLabel('vslschlETW'),
	    		        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
	    								},{
	    		        					xtype: 'datetimefield',
	    		        					reference: 'ctlAtb',
	    		        					flex: 1,
	    		        					editable: false,
	    		        					fieldLabel: ViewUtil.getLabel('vslschlATB'),
	    		        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
	    		        					readOnly: true,
	    								},{
	    		        					xtype: 'datetimefield',
	    		        					reference: 'ctlBtr',
	    		        					flex: 1,
	    		        					editable: false,
	    		        					fieldLabel: ViewUtil.getLabel('vslschlBTR'),
	    		        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
	    								}
	    							]
	    						},{
	    							xtype: 'container',  		// row 12
	    							layout: {
	    								type: 'hbox',
	    								align: 'stretch'
	    							},
	    							defaults:{
	    								labelAlign: 'right',
	    								labelWidth: 100,
	    								margin: '5 0 5 0'	
	    							},
	    							items:[
	    								{
	    									xtype:'datetimefield',
	    									reference: 'ctlEtb',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslschlETB'),
	    									editable: false,
	    									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
	    								},{
	    									xtype: 'datetimefield',
	    									reference: 'ctlAtu',
	    		        					flex: 1,
	    		        					editable: false,
	    		        					fieldLabel: ViewUtil.getLabel('vslschlATU'),
	    		        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
	    		        					readOnly: true
	    								},{
	    									xtype:'textfield',
	    									reference: 'txtTopTier',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslschlTopTier'),
	    									bind: {
	    										value: '{theVslSchl.topTier}',
	    									}
	    								}
	    							]
	    						},{
	    							xtype: 'container',  		// row 13
	    							layout: {
	    								type: 'hbox',
	    								align: 'stretch'
	    							},
	    							defaults:{
	    								labelAlign: 'right',
	    								labelWidth: 100
	    							},
	    							items:[
	    								{
	    									xtype:'label',
	    									text: ViewUtil.getLabel('drfArrv'),
	    									padding: '0 0 0 40',
	    									flex: 1
	    								},{
	    									xtype:'label',
	    									text: ViewUtil.getLabel('drfDeptr'),
	    									padding: '0 0 0 25',
	    									flex: 1
	    								},{
	    									xtype:'container',
	    									flex: 1,
	    								}
	    							]
	    						},{
	    							xtype: 'container',  		// row 14
	    							layout: {
	    								type: 'hbox',
	    								align: 'stretch'
	    							},
	    							defaults:{
	    								labelAlign: 'right',
	    								labelWidth: 100,
	    								margin: '5 0 5 0'	
	    							},
	    							items:[
	    								{
	    									xtype:'textfield',
	    									reference: 'refArrvFwdDraft',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('fowardDraft'),
	    									maxLength: 30,
	    									fieldStyle: 'background-Color: #c6e2ff;',
	    									enforceMaxLength: true,
	    									bind: {
	    										value: '{theVslSchl.arrvFwdDrf}',
	    									}
	    								},{
	    									xtype:'textfield',
	    									reference: 'refDeptFwrdDraft',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('fowardDraft'),
	    									maxLength: 30,
	    									fieldStyle: 'background-Color: #c6e2ff;',
	    									enforceMaxLength: true,
	    									bind: {
	    										value: '{theVslSchl.deptFwdDrf}',
	    									}
	    								},{
	    									xtype:'textfield',
	    									reference: 'txtHighestPoint',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslschlHighestPoint'),
	    									bind: {
	    										value: '{theVslSchl.highestPoint}',
	    									}
	    								}
	    							]
	    						},{
	    							xtype: 'container',  		// row 15
	    							layout: {
	    								type: 'hbox',
	    								align: 'stretch'
	    							},
	    							defaults:{
	    								labelAlign: 'right',
	    								labelWidth: 100,
	    								margin: '5 0 5 0'	
	    							},
	    							items:[
	    								{
	    									xtype:'textfield',
	    									reference: 'refArrvAfterDraft',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('afterDraft'),
	    									fieldStyle: 'background-Color: #c6e2ff;',
	    									maxLength: 30,
	    									enforceMaxLength: true,
	    									bind: {
	    										value: '{theVslSchl.arrvAfterDrf}',
	    									}
	    								},{
	    									xtype:'textfield',
	    									reference: 'refDeptAfterDraft',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('afterDraft'),
	    									fieldStyle: 'background-Color: #c6e2ff;',
	    									maxLength: 30,
	    									enforceMaxLength: true,
	    									bind: {
	    										value: '{theVslSchl.deptAfterDrf}',
	    									}
	    								},{
	    									xtype:'textfield',
	    									reference: 'txtShiftQty',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslschlShiftQty'),
	    									maskRe: /[0-9]/,
	    									bind: {
	    										value: '{theVslSchl.shiftCgQty}',
	    									}
	    								}
	    							]
	    						},{
	    							xtype: 'container',  		// row 16
	    							layout: {
	    								type: 'hbox'
	    							},
	    							defaults:{
	    								labelAlign: 'right',
	    								labelWidth: 100,
	    								margin: '5 0 0 0'
	    							},
	    							items:[
	    								{
	    									xtype:'textfield',
	    									reference: 'txtLoadCargo',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslschlLoadCargo'),
	    									//maskRe: /[a-zA-Z]/,
	    									editable: false,
	    									bind: {
	    										value: '{theVslSchl.loadCg}',
	    									}
	    								},{
	    									xtype:'textfield',
	    									reference: 'txtDischCargo',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslschlDischCargo'),
	    									//maskRe: /[a-zA-Z]/,
	    									editable: false,
	    									bind: {
	    										value: '{theVslSchl.dischCg}',
	    									}
	    								},{
	    									xtype:'textfield',
	    									reference: 'refSurveyWgt',
	    									flex: 1,
	    									margin: '-2 0 0 0',
	    									fieldLabel: ViewUtil.getLabel('draftSurveyWgt'),
	    									fieldStyle: 'background-Color: #c6e2ff;',
	    									maskRe: /[0-9]/,
	    									bind: {
	    										value: '{theVslSchl.drfWgt}',
	    									},
	    									hidden: false
	    								}
	    							]
	    						},{
	    							xtype: 'container',  		// row 17
	    							layout: {
	    								type: 'hbox',
	    								align: 'stretch'
	    							},
	    							defaults:{
	    								labelAlign: 'right',
	    								labelWidth: 100,
	    								margin: '5 0 5 0'	
	    							},
	    							items:[
	    								{
	    									xtype:'textfield',
	    									reference: 'txtLoadQty',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslschlLoadQty'),
	    									editable: false,
	    									maskRe: /[0-9]/,
	    									bind: {
	    										value: '{theVslSchl.loadCgQty}',
	    									}
	    								},{
	    									xtype:'textfield',
	    									reference: 'txtDischQty',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslschlDischQty'),
	    									maskRe: /[0-9]/,
	    									editable: false,
	    									bind: {
	    										value: '{theVslSchl.dischCgQty}',
	    									}
	    								},{
	    									xtype:'container',
	    									flex: 1
	    								}
	    							]
	    						},{
	    							xtype: 'container',  		// row 18
	    							layout: {
	    								type: 'hbox',
	    								align: 'stretch'
	    							},
	    							defaults:{
	    								labelAlign: 'right',
	    								labelWidth: 100,
	    								margin: '5 0 5 0'	
	    							},
	    							items:[
	    								{
	    									xtype: 'radiogroup',
	    									hidden: true,
	    			                		fieldLabel: ViewUtil.getLabel('vslschlQtyBunker'),
	    			                		flex: 1,
	    			                		reference: 'rdQtyBunker',
	    			                		bind: {value:'{theVslSchl.rqQtyBkr}'},
	    			                		items:[
	    			                			{
	    			                				boxLabel: ViewUtil.getLabel('vslpatiYes'),
	    			                				name: 'QtyBkr',
	    			                				inputValue: 'Y',
	    			                				bind:{
	    			                					value:'{theVslSchl.rqQtyBkr}'
	    				        					}
	    			                			},
	    			                			{
	    			                				boxLabel: ViewUtil.getLabel('vslpatiNo'),
	    			                				name: 'QtyBkr',
	    			                				inputValue: 'N',
	    			                				width: 50,
	    			                				bind:{
	    			                					value:'{theVslSchl.rqQtyBkr}'
	    				        					},
	    				        					checked: true
	    			                			}
	    			                		]
	    								},{
	    									xtype: 'radiogroup',
	    			                		fieldLabel: ViewUtil.getLabel('vslschlChandelling'),
	    			                		flex: 1,
	    			                		reference: 'rdChandelling',
	    			                		bind: {value:'{theVslSchl.rqChangdelling}'},
	    			                		items:[
	    			                			{
	    			                				boxLabel: ViewUtil.getLabel('vslpatiYes'),
	    			                				name: 'rbChdl',
	    			                				inputValue: 'Y',
	    			                				bind:{
	    			                					value:'{theVslSchl.rqChangdelling}'
	    				        					}
	    			                			},{
	    			                				boxLabel: ViewUtil.getLabel('vslpatiNo'),
	    			                				name: 'rbChdl',
	    			                				inputValue: 'N',
	    			                				width: 50,
	    			                				bind:{
	    			                					value:'{theVslSchl.rqChangdelling}'
	    				        					},
	    				        					checked: true
	    			                			}
	    			                		]
	    								},{
	    									xtype: 'radiogroup',
	    			                		fieldLabel: ViewUtil.getLabel('vslschlFreshWater'),
	    			                		flex: 1,
	    			                		reference: 'rdFreshWater',
	    			                		bind: {value:'{theVslSchl.rqFreshWt}'},
	    			                		items:[
	    			                			{
	    			                				boxLabel: ViewUtil.getLabel('vslpatiYes'),
	    			                				name: 'rbFWt',
	    			                				inputValue: 'Y',
	    			                				bind:{
	    			                					value:'{theVslSchl.rqFreshWt}'
	    				        					},
	    			                			},
	    			                			{
	    			                				boxLabel: ViewUtil.getLabel('vslpatiNo'),
	    			                				name: 'rbFWt',
	    			                				inputValue: 'N',
	    			                				width: 50,
	    			                				bind:{
	    			                					value:'{theVslSchl.rqFreshWt}'
	    				        					},
	    				        					checked: true
	    			                			}
	    			                		]
	    								}
	    							]
	    						},{
	    							xtype: 'container',  		// row 19
	    							layout: {
	    								type: 'hbox'
	    							},
	    							defaults:{
	    								labelAlign: 'right',
	    								labelWidth: 100,
	    								margin: '5 0 5 0'	
	    							},
	    							items:[
	    								{
	    									xtype:'textfield',
	    									hidden: true,
	    									reference: 'txtBunkerQty',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslschlBunkerQty'),
	    									maskRe: /[0-9]/,
	    									maxLength : 1,
	    									bind: {
	    										value: '{theVslSchl.bunkerQty}',
	    									}
	    								},{
	    									xtype:'textfield',
	    									reference: 'txtNoCrane',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslschlNoCrane'),
	    									 maskRe: /[0-9]/,
	    									bind: {
	    										value: '{theVslSchl.noCrane}',
	    									}
	    								},{
	    									xtype:'textfield',
	    									reference: 'txtFshWtQty',
	    									maskRe: /[0-9]/,
	    									margin: '0 0 0 0',
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslschlFshWtQty'),
	    									bind: {
	    										value: '{theVslSchl.frsWRQty}',
	    									}
	    								}
	    							]
	    						},{
	    							xtype: 'container',  		// row 20
	    							layout: {
	    								type: 'hbox'
	    							},
	    							defaults:{
	    								labelAlign: 'right',
	    								labelWidth: 100,
	    								margin: '5 0 5 0'	
	    							},
	    							items:[
	    								{
	    									xtype:'textfield',
	    									reference: 'txtNoFirearm',
	    									maskRe: /[0-9]/,
	    									flex: 1,
	    									fieldLabel: ViewUtil.getLabel('vslschlNoFirearm'),
	    									bind: {
	    										value: '{theVslSchl.noFirearm}',
	    									}
	    								},{
	    									xtype:'textfield',
	    									reference: 'txtSpecInstr',
	    									flex: 2,
	    									fieldLabel: ViewUtil.getLabel('vslschlSpecInstr'),
	    									bind: {
	    										value: '{theVslSchl.specIntr}',
	    									}
	    								}
	    							]
	    						},{
	    							xtype: 'container',  		// row 21
	    							layout: {
	    								type: 'hbox'
	    							},
	    							defaults:{
	    								labelAlign: 'right',
	    								labelWidth: 100,
	    								margin: '5 0 0 0'	
	    							},
	    							items:[
	    								{
	    									xtype:'textfield',
	    									reference: 'txtRemark',
	    									fieldLabel: ViewUtil.getLabel('rmk'),
	    									flex: 1,
	    									maxLength: 100,
	    									enforceMaxLength: true,
	    									bind: {
	    										value: '{theVslSchl.rmk}',
	    									}
	    								}
	    							]
	    						}
	    					]
	    				}
	    			]
				}
	        ],
			dockedItems: [{
				xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right'
	        	},
				items: [{
					xtype: 'textfield',
					reference:'refVesselStatus',
					width: 75,
					readOnly: true,
					bind: {
						value: '{theVslSchl.statCdNm}'
					}
				},'->',{
					xtype: 'button',
					text: 'Save',
					reference:'refBtnSave',
					ui: 'create-button',
					listeners: {
						click: 'onDetailSave'
					}
				},{
					xtype: 'button',
					text: "Approval",
					ui: 'create-button',
					reference:'refBtnApprove',
					listeners: {
						click: 'onApprove'
					}
				}]
			}]
		});
		
		me.callParent();
	}
});