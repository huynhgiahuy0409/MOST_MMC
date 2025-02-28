Ext.define('MOST.view.operation.rehandleoperation.RehandleCargoLoading', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-confirmrehandleloadingpopup',
	
	title:"Confirm Rehandle Loading",
	
	requires:[
	],
	
	width: 865,
	height: 565,
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	controller: 'confirmrehandleloadingpopup',
	
	viewModel: {
		type: 'confirmrehandleloadingpopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	lblGR:{type:'bundle', key:'gr'},
	lblDeliveryMode:{type:'bundle', key:'deliveryMode'},
	lblJpvc:{type:'bundle', key:'jpvc'},
	lblOk:{type:'bundle', key:'confirm'},
	lblCancel:{type:'bundle', key:'cancel'},
	lblSn:{type:'bundle', key:'sn'},
	lblStevedore:{type:'bundle', key:'stevedore'},
	lblEquipment:{type:'bundle', key:'equipment'},
	lblHatchDrtCd:{type:'bundle', key:'hatchDrtCd'},
	lblHatchNo:{type:'bundle', key:'hatchNo'},
	lblFacility:{type:'bundle', key:'fac'},
	lblStartTime:{type:'bundle', key:'fromtimeTitle'},
	lblShiftNm:{type:'bundle', key:'shift'},
	lblEndTime:{type:'bundle', key:'endtime'},
	lblClearance:{type:'bundle', key:'clearance'},
	lblModeofOperation:{type:'bundle', key:'modeofOperation'},
	lblLorryNo: {type: 'bundle', key: 'rehandleoperationLorryNo'},
	lblLorryCompany:{type: 'bundle', key: 'lorryCompany'},
	lblActAmt:{type: 'bundle', key: 'actAmt'},
	lblMt:{type: 'bundle', key: 'mt'},
	lblM3:{type: 'bundle', key: 'm3'},
	lblQty:{type: 'bundle', key: 'qTY'},
	lblActBalAmt:{type: 'bundle', key: 'actBalAmt'},
	lblLoadedAmt:{type: 'bundle', key: 'loadedAmt'},
	lblLocation:{type: 'bundle', key: 'location'},
	lblPkgAmt:{type:'bundle', key:'packageAmt'},
	lblLoadDMG:{type:'bundle', key:'loadDMG'},
	lblRemark:{type:'bundle', key:'remark'},
	lblWHLocation:{type:'bundle', key:'whDeAllocation'},
	lblGrDocAmt:{type:'bundle', key:'grDocAmt'},
	lblSNLoadingAmt:{type:'bundle', key:'snLoadingAmt'},
	lblSNDocAmt:{type:'bundle', key:'snDocAmt'},
	lblRePkgTpCd:{type:'bundle', key:'rePkgTpCd'},
	lblPkgType:{type:'bundle', key:'packageTp'},
	lblFinalDelivery:{type:'bundle', key:'finalDelivery'},
	lblUseVslCrane:{type:'bundle', key:'useVslCrane'},
	lblLoadedDmg:{type:'bundle', key:'loadedDmg'},
	
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items:[{
				xtype:'fieldset',
				//flex:1,
				layout:{
					type:'vbox',
					align:'stretch',
				},
				margin:'5 5 0 5',
				padding:'5 5 5 5',
				items:[{
					xtype:'container',
					layout:{
						type:'hbox',
						align:'stretch'
					},
					items:[{
						xtype: 'textfield',
	                    fieldLabel: me.lblGR,
	                    reference: 'txtGR',
	                    labelWidth: 50,
	                    bind:'{theRhdlDetail.cgNo}',
	                    width:180,
	                    labelAlign: 'right',
	                    editable:false,
	                    emptyText: me.lblGR
					},{
						xtype: 'combobox',
	                    reference: 'cboDeliveryMode',
	                    fieldLabel: me.lblDeliveryMode,
	                    bind: {
	                    	store: '{deliveryModeCombo}',
	                    	value: '{theRhdlDetail.delvTpCd}'
	                    },
						/*listeners:{
							select:'onSelectShiftDate'
						},*/
	                    matchFieldWidth: true,
	                    //flex:1,
						queryMode: 'local',
				        displayField: 'scdNm',
				        valueField: 'scd',
				        editable: false,
				        disabled:true,
				        labelWidth:100,
				        labelAlign: 'right'
					}]
				},{
					xtype:'container',
					layout:{
						type:'hbox',
						align:'stretch'
					},
					margin:'2 0 0 0',
					items:[{
						xtype: 'textfield',
	                    fieldLabel: me.lblJpvc,
	                    reference: 'txtJpvcNo',
	                    bind:'{theRhdlDetail.vslCallId}',
	                    labelWidth: 50,
	                    width:180,
	                    labelAlign: 'right',
	                    editable:false,
	                  
					},{
						xtype: 'textfield',
	                    reference: 'txtVslNm',
	                    margin:'0 0 0 3',
	                    bind:'{theRhdlDetail.vslNm}',
	                    width:180,
	                    editable:false,
	                  
					},{
						xtype: 'textfield',
	                    fieldLabel: me.lblSn,
	                    reference: 'txtSnNo',
	                    width:220,
	                    bind:'{theRhdlDetail.shipgNoteNo}',
	                    labelWidth: 50,
	                    labelAlign: 'right',
	                    editable:false,
					}]
				}]
			},{
				xtype:'fieldset',
				title:'Break Bulk',
				layout:{
					type:'vbox',
					align:'stretch',
				},
				margin:'0 5 0 5',
				padding : '5 5 5 5',
				items:[{
					xtype:'container',
					reference:'cntBreakBulk',
					layout:{
						type:'hbox',
						align:'stretch'
					},
					items:[{
						xtype: 'textfield',
	                    fieldLabel: me.lblStevedore,
	                    reference: 'txtStevedore',
	                    labelWidth: 70,
	                    bind:'{theOprSetHatch.steveDoreNm}',
	                    width:200,
	                    labelAlign: 'left',
	                    editable:false,
	                    emptyText: me.lblStevedore
					},{
						xtype: 'textfield',
	                    fieldLabel: me.lblEquipment,
	                    bind:'{theOprSetHatch.eqNm}',
	                    reference: 'txtBreakBulkEquip',
	                    labelWidth: 70,
	                    width:200,
	                    labelAlign: 'right',
	                    editable:false,
	                    emptyText: me.lblEquipment
					},{
						xtype: 'textfield',
	                    fieldLabel: me.lblHatchDrtCd,
	                    reference: 'txtHatchDrtCd',
	                    bind:'{theOprSetHatch.hatchDrt}',
	                    labelWidth: 70,
	                    width:150,
	                    labelAlign: 'right',
	                    editable:false,
	                    emptyText: me.lblHatchDrtCd
					},{
						xtype: 'combobox',
	                    reference: 'cboBreakBulkHatchNo',
	                    fieldLabel: me.lblHatchNo,
	                    bind: {
	                    	store: '{hatchNoCombo}',
//	                    	value: '{theRhdlDetail.hatchNo}'
	                    },
						listeners:{
							select:'onSelectHatch'
						},
	                    matchFieldWidth: true,
	                    width:150,
						queryMode: 'local',
				        displayField: 'hatchNo',
				        valueField: 'hatchNo',
				        editable: false,
				        allowBlank:false,
				        labelWidth:70,
				        labelAlign: 'right'
					}]
				}]
			},{
				xtype:'fieldset',
				title:'Dry Bulk',
				reference:'cntDryBulk',
				padding : '5 5 5 5',
				layout:{
					type:'vbox',
					align:'stretch',
				},
				margin:'0 5 2 5',
				items:[{
					xtype:'container',
					layout:{
						type:'hbox',
						align:'stretch'
					},
					items:[{
						xtype: 'textfield',
	                    fieldLabel: me.lblEquipment,
	                    reference: 'txtDryBulkEquip',
	                    bind:'{theOprSetHatch.eqNm}',
	                    labelWidth: 70,
	                    width:200,
	                    labelAlign: 'left',
	                    editable:false,
	                    emptyText: me.lblEquipment
					},{
						xtype: 'textfield',
	                    fieldLabel: me.lblFacility,
	                    reference: 'txtFacility',
	                    labelWidth: 70,
	                    width:200,
	                    labelAlign: 'right',
	                    editable:false,
	                    emptyText: me.lblFacility
					},{
						xtype: 'combobox',
	                    reference: 'cboDryBulkHatchNo',
	                    fieldLabel: me.lblHatchNo,
	                    bind: {
	                    	store: '{hatchNoCombo}',
//	                    	value: '{theRhdlDetail.hatchNo}'
	                    },
	                    listeners:{
							select:'onSelectHatch'
						},
	                    matchFieldWidth: true,
	                    width:150,
						queryMode: 'local',
				        editable: false,
				        labelWidth:70,
				        displayField: 'hatchNo',
                        valueField: 'hatchNo',
				        labelAlign: 'right'
					}]
				},]
			},{
				xtype:'fieldset',
				layout:{
					type:'vbox',
					align:'stretch',
				},
				margin:'2 5 2 5',
				padding : '5 5 5 5',
				items:[{
					xtype:'container',
					layout:{
						type:'hbox',
						align:'stretch'
					},
					items:[{
	                	xtype: 'datetimefield',
	                	reference: 'dtStart',
	                	fieldLabel: me.lblStartTime,
	                	format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
	                	labelAlign: 'left',
	                	labelWidth: 70,
	                	width:250,
	                	editable: false,
	                	disabled: false,
	                	allowBlank:false,
	                	bind:'{theRhdlDetail.startDt}',
						listeners: {
							//blur: 'onDateChange'
						}
	                },{
						xtype: 'textfield',
	                    fieldLabel: me.lblShiftNm,
	                    reference: 'txtShiftNm',
	                    bind:'{theRhdlDetail.shftNm}',
	                    labelWidth: 70,
	                    width:200,
	                    labelAlign: 'right',
	                    editable:false,
	                    emptyText: me.lblShiftNm
					}]
				},{
					xtype:'container',
					layout:{
						type:'hbox',
						align:'stretch'
					},
					margin:'2 0 0 0',
					items:[{
	                	xtype: 'datetimefield',
	                	reference: 'dtEnd',
	                	fieldLabel: me.lblEndTime,
	                	format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
	                	labelAlign: 'left',
	                	labelWidth: 70,
	                	width:250,
	                	editable: false,
	                	disabled: false,
	                	allowBlank:false,
	                	bind:'{theRhdlDetail.endDt}',
						listeners: {
							//blur: 'onDateChange'
						}
	                },{
						xtype: 'combobox',
	                    reference: 'cboClearance',
	                    fieldLabel: me.lblClearance,
	                    matchFieldWidth: true,
	                    width:200,
						queryMode: 'local',
				        displayField: 'scdNm',
				        valueField: 'scd',
				        editable: false,
				        disabled:true,
				        labelWidth:70,
				        labelAlign: 'right'
					},{
						xtype: 'combobox',
	                    reference: 'cboTsptTpCd',
	                    fieldLabel: me.lblModeofOperation,
	                    bind: {
	                    	store: '{modeOfOprCombo}',
	                    	value: '{theRhdlDetail.tsptTpCd}'
	                    },
	                    matchFieldWidth: true,
	                    width:220,
						queryMode: 'local',
				        displayField: 'scdNm',
				        valueField: 'scd',
				        editable: false,
				        labelWidth:120,
				        labelAlign: 'right'
					}]
				},{
					xtype:'container',
					layout:{
						type:'hbox',
						align:'stretch'
					},
					margin:'2 0 0 0',
					items:[{
						xtype:'label',
						text: me.lblLorryNo,
						width:70,
						margin: '2 5 0 0'
					},{
                        xtype: 'truckfield',
                        reference:'ctlLorryNo',
                        labelWidth:70,
                        bind:{
                        	ptnrCd : '{theRhdlDetail.tsptr}',
							vslCallId: '{theRhdlDetail.vslCallId}',
							shipgNoteNo: '{theRhdlDetail.shipgNoteNo}',
							lorryNo: '{theRhdlDetail.lorryId}',
							searchDivCd : 'LR2',
							value: '{theRhdlDetail.lorryId}'
	   					},
                        disabled:false,
                        editable: false,
                        allowBlank:false
                    },{
						xtype: 'textfield',
	                    fieldLabel: me.lblLorryCompany,
	                    reference: 'txtLorryCompany',
	                    labelWidth: 120,
	                    bind:'{theRhdlDetail.tsptr}',
	                    width:300,
	                    labelAlign: 'right',
	                    editable:false,
	                    emptyText: me.lblLorryCompany
					}]
				}]
			},{
				xtype:'fieldset',
				flex:1,
				layout:{
					type:'hbox'
					//align:'stretch'
				},
				margin: '2 5 2 5',
				items:[{
					xtype:'container',
					layout:{
						type:'vbox'
						//align:'stretch'
					},
					items:[{
						xtype:'container',
						flex:1,
						layout:{
							type:'hbox'
							//align:'stretch'
						},
						items:[{
							xtype:'label',
							width:100
						},{
							xtype:'label',
							text:me.lblMt,
							width:70,
							style:{
								'text-align': 'center'
							}
						},{
							xtype:'label',
							margin: '0 0 0 3',
							text:me.lblM3,
							width:70,
							style:{
								'text-align': 'center'
							}
						},{
							xtype:'label',
							margin: '0 0 0 3',
							text:me.lblQty,
							width:70,
							style:{
								'text-align': 'center'
							}
						},{
							xtype:'label',
							width:100
							
						},{
							xtype:'label',
							text:me.lblMt,
							width:70,
							margin:'0 0 0 170',
							style:{
								'text-align': 'center'
							}
						},{
							xtype:'label',
							margin: '0 0 0 3',
							text:me.lblM3,
							width:70,
							style:{
								'text-align': 'center'
							}
						},{
							xtype:'label',
							margin: '0 0 0 3',
							text:me.lblQty,
							width:70,
							style:{
								'text-align': 'center'
							}
						}]
					},{
						xtype:'container',
						flex:1,
						layout:{
							type:'hbox',
							//align:'stretch'
						},
						margin:'2 0 0 0',
						items:[{
							xtype:'textfield',
							fieldLabel: me.lblActAmt,
							maskRe: /[0-9.]/,
							value:0,
							width:170,
							bind:'{theRhdlDetail.mt}',
							labelWidth: 100,
							reference: 'txtActAmt',
							editable:false
						},{
							xtype:'textfield',
							width:70,
							maskRe: /[0-9.]/,
							value:0,
							margin:'0 0 0 3',
							reference: 'txtActM3',
							bind:'{theRhdlDetail.m3}',
							editable:false
						},{
							xtype:'textfield',
							width:70,
							margin:'0 0 0 3',
							maskRe: /[0-9.]/,
							value:0,
							reference: 'txtActQty',
							bind:'{theRhdlDetail.qty}',
							editable:false
						},{
							xtype:'textfield',
							fieldLabel: me.lblGrDocAmt,
							width:170,
							labelWidth: 100,
							maskRe: /[0-9.]/,
							value:0,
							reference: 'txtDocMT',
							bind:'{theRhdlDetail.docMt}',
							margin:'0 0 0 170',
							editable:false
						},{
							xtype:'textfield',
							width:70,
							margin:'0 0 0 3',
							maskRe: /[0-9.]/,
							value:0,
							reference: 'txtDocM3',
							bind:'{theRhdlDetail.docM3}',
							editable:false
						},{
							xtype:'textfield',
							width:70,
							margin:'0 0 0 3',
							reference: 'txtDocQty',
							maskRe: /[0-9.]/,
							value:0,
							bind:'{theRhdlDetail.docQty}',
							editable:false
						}]
					},{
						xtype:'container',
						flex:1,
						layout:{
							type:'hbox'
							//align:'stretch'
						},
						margin:'2 0 0 0',
						items:[{
							xtype:'textfield',
							fieldLabel: me.lblActBalAmt,
							width:170,
							labelWidth: 100,
							reference: 'txtBalAmt',
							maskRe: /[0-9.]/,
							value:0,
							bind:'{theRhdlDetail.balMt}',
							editable:false
						},{
							xtype:'textfield',
							width:70,
							margin:'0 0 0 3',
							reference: 'txtBalM3',
							maskRe: /[0-9.]/,
							value:0,
							bind:'{theRhdlDetail.balM3}',
							editable:false
						},{
							xtype:'textfield',
							width:70,
							margin:'0 0 0 3',
							reference: 'txtBalQty',
							maskRe: /[0-9.]/,
							value:0,
							bind:'{theRhdlDetail.balQty}',
							editable:false
						},{
							xtype:'textfield',
							fieldLabel: me.lblSNLoadingAmt,
							width:170,
							labelWidth: 100,
							reference: 'txtAccMT',
							maskRe: /[0-9.]/,
							value:0,
							bind:'{theRhdlDetail.accuSumWgt}',
							margin:'0 0 0 170',
							editable:false
						},{
							xtype:'textfield',
							width:70,
							margin:'0 0 0 3',
							reference: 'txtAccM3',
							maskRe: /[0-9.]/,
							value:0,
							bind:'{theRhdlDetail.accuSumMsrmt}',
							editable:false
						},{
							xtype:'textfield',
							width:70,
							margin:'0 0 0 3',
							reference: 'txtAccQty',
							maskRe: /[0-9.]/,
							value:0,
							bind:'{theRhdlDetail.accuSumQty}',
							editable:false
						}]
					},{
						xtype:'container',
						flex:1,
						layout:{
							type:'hbox'
							//align:'stretch'
						},
						margin:'2 0 0 0',
						items:[{
							xtype:'textfield',
							fieldLabel: me.lblLoadedAmt,
							bind:'{theRhdlDetail.loadMt}',
							width:170,
							labelWidth: 100,
							reference: 'txtLoadMT',
							maskRe: /[0-9.]/,
							value:0,
							editable:true
						},{
							xtype:'textfield',
							width:70,
							margin:'0 0 0 3',
							reference: 'txtLoadM3',
							bind:'{theRhdlDetail.loadM3}',
							maskRe: /[0-9.]/,
							value:0,
							editable:true
						},{
							xtype:'textfield',
							width:70,
							margin:'0 0 0 3',
							reference: 'txtLoadQty',
							bind:'{theRhdlDetail.loadQty}',
							maskRe: /[0-9.]/,
							value:0,
							editable:true
						},{
							xtype:'textfield',
							fieldLabel: me.lblSNDocAmt,
							width:170,
							labelWidth: 100,
							reference: 'txtSnMT',
							bind:'{theRhdlDetail.snMt}',
							maskRe: /[0-9.]/,
							value:0,
							margin:'0 0 0 170',
							editable:true
						},{
							xtype:'textfield',
							width:70,
							margin:'0 0 0 3',
							reference: 'txtSnM3',
							bind:'{theRhdlDetail.snM3}',
							maskRe: /[0-9.]/,
							value:0,
							editable:true
						},{
							xtype:'textfield',
							width:70,
							margin:'0 0 0 3',
							reference: 'txtSnQty',
							bind:'{theRhdlDetail.snQty}',
							maskRe: /[0-9.]/,
							value:0,
							editable:true
						}]
					},{
						xtype:'container',
						flex:1,
						layout:{
							type:'hbox'
							//align:'stretch'
						},
						margin:'2 0 0 0',
						items:[{
							xtype:'textfield',
							fieldLabel: me.lblLocation,
							width:316,
							labelWidth: 100,
							reference: 'txtLocationId',
							bind:'{theRhdlDetail.locId}',
							editable:false
						},{
							xtype:'button',
							text: me.lblWHLocation,
							margin:'0 0 0 5',
							reference:'btnLocation',
							listeners:{
								click: {
									fn : 'onWarehouseDeAllocation',
									args : ['txtLocationId']
								}	
							}
						}]
					},{
						xtype:'container',
						flex:1,
						margin:'2 0 0 0',
						layout:{
							type:'hbox'
							//align:'stretch'
						},
						items:[{
							xtype:'textfield',
							fieldLabel: me.lblPkgAmt,
							width:170,
							labelWidth: 100,
							reference: 'txtPkgMT',
							bind:'{theRhdlDetail.repkgWgt}',
							maskRe: /[0-9.]/,
							value:0,
							editable:false
						},{
							xtype:'textfield',
							width:70,
							margin:'0 0 0 3',
							reference: 'txtPkgM3',
							bind:'{theRhdlDetail.repkgMsrmt}',
							maskRe: /[0-9.]/,
							value:0,
							editable:false
						},{
							xtype:'textfield',
							width:70,
							margin:'0 0 0 3',
							reference: 'txtPkgQty',
							bind:'{theRhdlDetail.repkgQty}',
							maskRe: /[0-9.]/,
							value:0,
							editable:false
						},{
							xtype: 'cmmcdfield',
                            //flex: 1,
                            bind:{
                            	value : '{theRhdlDetail.repkgTpCd}'
                            },
                            fieldLabel:me.lblRePkgTpCd,
                            labelWidth: 100,
                            width:250,
                            params:{
		   						searchType: 'COMM',
		   						searchDivCd: 'PKGTP',
		   						searchLcd: 'MT',
		   						searchCol1: 'LB'
		   					}
						},{
							xtype: 'cmmcdfield',
                            reference:'ctlConfirmLoadingPacTypeCode',
                            //flex: 2,
                            fieldLabel: me.lblPkgType,
                            labelWidth: 100,
                            width:250,
                            bind:{
                            	value : '{theRhdlDetail.repkgTypeCd}'
                            },
                            params:{
		   						searchType: 'COMM',
		   						searchDivCd: 'PKGTP',
		   						searchLcd: 'MT'
		   					}
						}]
					},{
						xtype:'container',
						flex:1,
						margin:'2 0 0 0',
						layout:{
							type:'hbox'
							//align:'stretch'
						},
						items:[{
							xtype:'textfield',
							fieldLabel: me.lblLoadDMG,
							width:170,
							labelWidth: 100,
							reference: 'txtLoadDmgMT',
							maskRe: /[0-9.]/,
							value:0,
							disabled:true,
							bind:'{theRhdlDetail.loadDmgMt}',
							editable:true
						},{
							xtype:'textfield',
							width:70,
							margin:'0 0 0 3',
							reference: 'txtLoadDmgM3',
							bind:'{theRhdlDetail.loadDmgM3}',
							maskRe: /[0-9.]/,
							disabled:true,
							value:0,
							editable:true
						},{
							xtype:'textfield',
							width:70,
							margin:'0 0 0 3',
							reference: 'txtLoadDmgPkgQty',
							bind:'{theRhdlDetail.loadDmgQty}',
							maskRe: /[0-9.]/,
							disabled:true,
							value:0,
							editable:true
						},{
		                    xtype: 'checkboxfield',
		                    //flex: 2,
		                    boxLabel: me.lblLoadedDmg,
		                    margin: '0 0 0 5',
		                    //labelAlign:'left',
		                    reference: 'chkLoadDmgYn',
		                    listeners: {
		                    	change: 'onLoadDmgCheck'
			    			}
		                },{
		                    xtype: 'checkboxfield',
		                    //flex: 2,
		                    boxLabel: me.lblFinalDelivery,
		                    margin: '0 0 0 150',
		                    reference: 'chkFnlOpeYn',
		                }]
					},{
						xtype:'container',
						margin:'2 0 0 0',
						layout:{
							type:'hbox',
							//align:'stretch'
						},
						items:[{
							xtype:'textfield',
							fieldLabel: me.lblRemark,
							width:450,
							labelWidth: 100,
							reference: 'txtRemark',
							bind:'{theRhdlDetail.rmk}',
							editable:true
						},{
		                    xtype: 'checkboxfield',
		                    //flex: 2,
		                    boxLabel: me.lblUseVslCrane,
		                    reference: 'chkVslCrane',
		                    margin: '0 0 0 118'
		                }]
					}]
				}]
			},{
				xtype:'container',
				layout:{
					type:'hbox',
					align:'middle',
					pack:'center'
				},
				
				margin:'0 5 2 5',
				items:[{
					xtype:'button',
					text: me.lblOk,
                	margin:'0 5 0 5',
                	reference:'btnOk',
                	width : 100,
                	listeners:{
                		click: 'onSave'
                	}
				},{
					xtype:'button',
					text: me.lblCancel,
                	margin:'0 5 0 5',
                	reference:'btnCancel',
                	width : 100,
                	listeners:{
                		click: 'onCancel'
                	}
				}]
			}],
			
		});
		
		me.callParent();
		
	}
})
