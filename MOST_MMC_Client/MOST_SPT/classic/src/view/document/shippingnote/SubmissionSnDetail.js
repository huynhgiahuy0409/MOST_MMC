Ext.define('MOST.view.document.submissionshippingnote.SubmissionSnDetail', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-submissionsndetail',
	
	requires: [
	],
	
	layout : {type  : 'hbox', align : 'stretch'},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	FILE_GRID_REF_NAME : 'refShippingNoteFileUploadGrid', // File Grid Name  
	FILE_UPLOAD_STORE_NAME : 'shippingNoteFileUpload', // File Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [
				{
		            xtype: 'container',
		            flex: 1,
		            defaults: {
		                margin: '5 5 0 5',
		                labelAlign: 'right',
		                labelWidth: 80
		            },
		            reference: 'ctlRow1',
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            items: [
		            	{
		                    xtype: 'container',
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    defaults: {
		    	                labelAlign: 'right',
		    	                labelWidth: 80
		    	            },
		                    items: [
				                {
				                    xtype: 'textfield',
				                    labelAlign: 'right',
				                    width: 144,
				                    fieldLabel: ViewUtil.getLabel('pol'),
				                    reference:'ctlPol',
				                    value : CONSTANTS.LAIP_PORT_CODE,
				                    readOnly:true
				                },{
		                            xtype: 'textfield',
		                            flex: 1,
		                            margin: '0 0 0 5',
		                            padding: '',
		                            labelAlign: 'right',
		                            reference: 'ctlPolNm',
		                            editable : false,
		                            value: CONSTANTS.LAIP_PORT_NAME
		                        }
			                ]
		            	},{
		                    xtype: 'container',
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    defaults: {
		    	                labelAlign: 'right',
		    	                labelWidth: 80,
		    	            },
		                    items: [
		                        {
		                            xtype: 'portcodefield',
		                            reference:'',
		                            width: 175,
		                            padding: '0 0 0 0',
		                            fieldLabel: ViewUtil.getLabel('por'),
		                            reference:'ctlCntryofOrg',
		                            bind:{
		                            	value : '{theShippingNote.cntryOfOrg}'
		                            },
		                            labelAlign: 'right',
		                            allowBlank: true
		                        },{
		                            xtype: 'textfield',
		                            margin: '0 0 0 5',
		                            flex: 1,
		                            padding: '',
		                            labelAlign: 'right',
		                            reference: 'ctlPorNm',
		                            editable : false,
		                            bind:{
		                            	value : '{theShippingNote.cntryOfOrgNm}'
		                            }
		                        }
		                    ]
		                },{
		                    xtype: 'container',
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    defaults: {
		    	                labelAlign: 'right',
		    	                labelWidth: 80
		    	            },
		                    items: [
		                        {
		                            xtype: 'portcodefield',
		                            padding: '0 0 0 0',
		                            fieldLabel: ViewUtil.getLabel('pod'),
		                            width: 175,
		                            reference:'ctlportOfDis',
		                            bind:{
		                            	value : '{theShippingNote.portOfDis}'
		                            },
		                            labelAlign: 'right',
		                            allowBlank: false
		                        },{
		                            xtype: 'textfield',
		                            margin: '0 0 0 5',
		                            flex: 1,
		                            padding: '',
		                            labelAlign: 'right',
		                            reference: 'ctlPodNm',
		                            editable : false,
		                            bind:{
		                            	value : '{theShippingNote.portOfDisNm}'
		                            },
		                        }
		                    ]
		                },{
		                    xtype: 'container',
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    defaults: {
		    	                labelAlign: 'right',
		    	                labelWidth: 80
		    	            },
		                    items: [
		                        {
		                            xtype: 'portcodefield',
		                            padding: '0 0 0 0',
		                            fieldLabel: ViewUtil.getLabel('fnd'),
		                            width: 175,
		                            reference:'ctlfnlDest',
		                            bind:{
		                            	value : '{theShippingNote.fnlDest}'
		                            },
		                            labelAlign: 'right',
		                            allowBlank: true
		                        },{
		                            xtype: 'textfield',
		                            margin: '0 0 0 5',
		                            flex: 1,
		                            padding: '',
		                            labelAlign: 'right',
		                            reference: 'ctlFndNm',
		                            editable : false,
		                            bind:{
		                            	value : '{theShippingNote.fnlDestNm}'
		                            },
		                        }
		                    ]
		                },{
		                    xtype: 'textfield',
		                    fieldLabel: ViewUtil.getLabel('SNLBookingNo'),//SNMFDocId
		                    reference: 'ctlMfDocId',
		                    bind: {
		                    	value: '{theShippingNote.mfDocId}',
		                    },
		                    maskRe: /[0-9A-Za-z]/,
		                    fieldStyle: 'text-transform:uppercase',
	    					listeners: {
	    						blur : 'onCheckMfDocId',
	    						change: 'onUpperCase'
	    					},
	    					maxLength: 20,
	    					enforceMaxLength: true,
	    					allowBlank: true,
	    					hidden: true
		                },{//New MF_DOC_ID
		                	xtype: 'textfield',
		                	fieldLabel: ViewUtil.getLabel('SNLBookingNo'),//SNMFDocId
		                	reference: 'ctlNewMfDocId',
		                	bind: {
		                		value: '{theShippingNote.newMfDocId}',
		                	},
		                	//maskRe: /[0-9A-Za-z]/,
		                	fieldStyle: 'text-transform:uppercase',
		                	listeners: {
		                		change: 'onChangeKeyDoc'
		                	},
		                	maxLength: 20,
	    					enforceMaxLength: true,
		                	allowBlank: false
		                },{
		                    xtype: 'textfield',
		                    fieldLabel: ViewUtil.getLabel('cBRNo'),
		                    reference: 'ctlCBRNo',
		                    bind: '{theShippingNote.cbrNo}',
		                    maskRe: /[0-9A-Za-z]/,
		                    fieldStyle: 'text-transform:uppercase',
	    					listeners: {
	    						blur : 'checkCBRNo'
	    					},
	    					hidden:true,
	    					allowBlank: true,
		                },{
		                    xtype: 'combo',
		                    reference: 'ctlCategory',
		                    fieldLabel: ViewUtil.getLabel('category'),
		                    bind: {
		                    	store: '{categoryCombo}',
		                    	value: '{theShippingNote.catgCd}',
		                    },
							queryMode: 'local',
					        displayField: 'scdNm',
					        valueField: 'scd',
					        editable: false,
					        allowBlank: false,
					        emptyText: 'Select',
					        value: '',
					        listeners:{
					        	select:'onComboBoxChange'
					        }
		                },{
		                    xtype: 'textfield',
		                    fieldLabel: ViewUtil.getLabel('SNMafiparentId'),
		                    reference:'ctlmafiparent',
		                    bind: '{theShippingNote.mafiParentId}',
	    					maxLength: 20,
	    					enforceMaxLength: true,
	    					maskRe: /[0-9A-Za-z]/,
	    					hidden: true
		                },{
		                	xtype: 'textfield',
		                	fieldLabel: ViewUtil.getLabel('SNParentcmdt'),
		                	reference:'ctlparentcmdt',
		                	bind: '{theShippingNote.parentCmdt}',
	    					maxLength: 20,
	    					enforceMaxLength: true,
	    					maskRe: /[0-9A-Za-z]/,
	    					hidden: true
		                },
						{
		                    xtype: 'textareafield',
		                    fieldLabel: ViewUtil.getLabel('mAndN'),
		                    reference: 'ctlMAndN',
		                    bind: '{theShippingNote.markNo}',
							maxLength: 350,
	    					enforceMaxLength: true,
	    					hidden: false
	                	},
						{
		                	xtype: 'textareafield',
		                	fieldLabel: ViewUtil.getLabel('SNDescrGoods'),
		                	reference:'ctldescrgoods',
		                	bind: '{theShippingNote.goodsDescr}',
	    					maxLength: 300,
	    					enforceMaxLength: true,
		                },
						{
							xtype: 'container',
							padding: '0 0 0 85',
							defaults: {
								margin: '0 5 0 0',
							},
							items: [
								{
									xtype: 'checkboxfield',
									boxLabel: ViewUtil.getLabel('bondedWh'),
									reference: 'refBondedWhYn',
									bind: '{theShippingNote.bondedWhYn}',
									inputValue: 'Y',
									uncheckedValue: 'N',
									checked:false
								},
								{
									xtype: 'checkboxfield',
									boxLabel: ViewUtil.getLabel('domesticCargo'),
									reference: 'refDomesticChk',
									bind: '{theShippingNote.domesticChk}',
									inputValue: 'Domestic Cargo',
									uncheckedValue: 'N',
									checked:false
								},
								{
									xtype: 'checkboxfield',
									boxLabel: ViewUtil.getLabel('projectCargo'),
									reference: 'refProjectCargo',
									bind: '{theShippingNote.projectCargo}',
									inputValue: 'Y',
									uncheckedValue: 'N',
									disabled: true,
									checked: false,
									listeners: {
										change: 'onPackageDetailTabSetting1'
									}
								},
								{
									xtype: 'checkboxfield',
									boxLabel: ViewUtil.getLabel('notToWgt'),
									reference: 'refWeightChk',
									bind: '{theShippingNote.wgtChk}',
									inputValue: 'N',
									uncheckedValue: 'Y',
									checked:false
								}
							]
						}
		            ]
		        },{
		            xtype: 'container',
		            flex: 1.4,
		            defaults: {
		                margin: '5 5 0 5',
		                labelAlign: 'right',
		                labelWidth: 120
		            },
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            items: [
		                {
		                    xtype: 'combo',
		                    fieldLabel: ViewUtil.getLabel('typeofCargo'),
		                    reference: 'ctlTypeofCargo',
		                    bind: {
		                    	store: '{typeCargoCombo}',
		                    	value: '{theShippingNote.cgTpCd}'
		                    },
							queryMode: 'local',
					        displayField: 'scdNm',
					        valueField: 'scd',
					        editable: false,
					        allowBlank: false,
					        emptyText: 'Select',
					        value : '',
					        listeners:{
					        	select:'onComboBoxChange',
					        	change: 'onChangeCargoType'
					        }
		                },{
		                    xtype: 'container',
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                    	{
		                            xtype: 'cmmcdfield',
		                            width: 220,
		                            padding: '0 0 0 0',
		                            fieldLabel: ViewUtil.getLabel('commodityGroup'),
		                            reference: 'ctlCommodityGroupCode',
		                            bind:{
		                            	value : '{theShippingNote.cmdtGroupCd}',
		                            	cgTpCd: '{theShippingNote.cgTpCd}'
		                            },
		                            labelAlign: 'right',
		                            labelWidth: 120,
		                            allowBlank: false,
		    	   					params:{
		    	   						searchType: 'CMDT_GRP',		    	   					
		    	   					}
		                        },{
		                            xtype: 'textfield',
		                            margin: '0 0 0 5',
		                            flex: 1,
		                            padding: '',
		                            labelAlign: 'right',
		                            reference: 'ctlCommodityGroupName',
		                            bind: '{theShippingNote.cmdtGroupCdNm}',
		                            labelWidth: 120,
		                            editable : false
		                        }
		                    ]
		                },{
		                	xtype: 'container',
		                	layout: {
		                		type: 'hbox',
		                		align: 'stretch'
		                	},
		                	items: [
		                		{
		                			xtype: 'cmmcdfield',
		                			width: 220,
		                			padding: '0 0 0 0',
		                			fieldLabel: ViewUtil.getLabel('commodityCode'),
		                			reference: 'ctlCommodityCode',
		                			bind:{
		                				value : '{theShippingNote.cmdtCd}',
		                				cgTpCd: '{theShippingNote.cgTpCd}',
		                				cmdtGrpCd: '{theShippingNote.cmdtGroupCd}'
		                				
		                			},
		                			labelAlign: 'right',
		                			labelWidth: 120,
		                			allowBlank: false,
		                			params:{
		                				searchType: 'CMDT'
		                			}
		                		},{
		                            xtype: 'textfield',
		                            margin: '0 0 0 5',
		                            flex: 1,
		                            padding: '',
		                            labelAlign: 'right',
		                            reference: 'ctlCommodityName',
		                            bind: '{theShippingNote.cmdtCdNm}',
		                            labelWidth: 120,
		                            editable : false,
		                            listeners:{
	        	   						change: 'onChangeCommodityCode',
	        	   					}
		                        }
		                	]	
		                },{
		                    xtype: 'container',
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'cmmcdfield',
		                            width: 220,
		                            padding: '0 0 0 0',
		                            fieldLabel: ViewUtil.getLabel('typeofpackages'),
		                            reference: 'ctlTypeofPackage',
		                            bind:{
		                            	value : '{theShippingNote.pkgTpCd}',
		                            	cgTpCd: '{theShippingNote.cgTpCd}',
		                				cmdtGrpCd: '{theShippingNote.cmdtGroupCd}',
		                				cmdtCd: '{theShippingNote.cmdtCd}'
		                            },
		                            labelAlign: 'right',
		                            labelWidth: 120,
		                            allowBlank: false,
		                            params:{
		                            	searchType: 'COMM',
				   						searchDivCd: 'PKGTP',
				   						searchLcd:CodeConstants.LCD_MOST,
			                            searchMcd: CodeConstants.MCD_MT_PKGTP
	        	   					}
		                        },{
		                            xtype: 'textfield',
		                            margin: '0 0 0 5',
		                            flex: 1,
		                            labelAlign: 'right',
		                            reference: 'ctlPackageName',
		                            bind: '{theShippingNote.pkgTpCdNm}',
		                            labelWidth: 120,
		                            editable : false,
		                            listeners:{
	        	   						change: 'onChangePackageType',
	        	   					},
		                        }
		                    ]
		                },{
		                	xtype: 'container',
		                	layout: {
		                		type: 'hbox',
		                		align: 'stretch'
		                	},
		                	items: [
		                		{
		                			xtype: 'textfield',
		                			flex: 1,
		                			padding: '0 0 0 0',
		                			fieldLabel: ViewUtil.getLabel('packagenumber'),
		                			reference: 'ctlpackagenumber',
		                			bind:{
		                				value : '{theShippingNote.pkgNumber}'
		                			},
		                			labelAlign: 'right',
		                			labelWidth: 120,
		        					maxLength: 30,
		        					enforceMaxLength: true,
		        					maskRe: /[0-9A-Za-z]/,
		        					hidden: true
		                		}
		                	]
		                },{
		                    xtype: 'container',
							margin: '0 5 0 5',
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('uNNoClass'),
		        					reference:'ctlUnno',
		                            bind: '{theShippingNote.unno}',
		                            labelAlign: 'right',
		                            labelWidth: 120,
									enableKeyEvents: true,
									listeners: {
										keydown : 'onKeyDown'
									}
		                        },{
		                            xtype: 'cmmcdfield',
		                            margin: '0 0 0 5',
		        					reference:'ctlImdg',
		                            bind:{
		                            	value : '{theShippingNote.imdg}'
		                            },
		                            flex: 0.8,
		                            labelAlign: 'right',
		                            editlable : false,
	        	   					params:{
	        	   						searchType: 'IMDG'
	        	   					}
		                        }
		                    ]
		                },{
	                		xtype: 'container',
	                		margin: '5 5 0 5',
	                		layout:{
	                			type: 'hbox',
	                			align: 'stretch'
	                		},
	                		defaults: {
			                    labelAlign: 'right',
			                    labelWidth: 120,
			                },
	                		items:[
	                			{
						            xtype: 'textfield',
						            margin: '0 5 0 0',
						            fieldLabel: 'H.S Code:',
						            reference:'ctlHSCode',
						            maxLength: 20,
						            flex: 0.8,
									enforceMaxLength: true,
									maskRe: /[0-9A-Za-z]/,
									fieldStyle : 'text-transform: uppercase',
						            listeners: {
//												        	beforeRender: 'onRenderField',
//												        	focus : 'onFocus',
//												        	focusleave: 'onFieldFocusleave',
							        	change: function(){
											var me = this;
											me.setValue(this.getValue().toUpperCase());
										}
									},
									bind:{
										value : '{theShippingNote.hsCode}'
									},
						        },{
									xtype: 'button',
									reference:'ctlHSCodeButton',
									iconCls: 'x-fa fa-search',
									fieldStyle : 'text-transform: uppercase',
									listeners:{
										click: 'openHsCodePopup'
									}
								},{
									xtype: 'textfield',
									reference:'ctlHSCodeName',
									margin: '0 0 0 5',
									editable: false,
									flex: 0.725,
									bind:{
										value : '{theShippingNote.hsNm}'
									}
								}
	                		]
                        },{
		                    xtype: 'container',
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    hidden: true,
		                    items: [
		                        {
		                            xtype: 'numberfield',
		                            flex: 1,
		                            padding: '0 5 0 0',
		                            fieldLabel: ViewUtil.getLabel('grossWeight'),
		                            reference : 'ctlGrossWgt',
		                            bind: '{theShippingNote.cgWgt}',
		                            labelAlign: 'right',
		                            labelWidth: 120,
		                            minValue: 0,
		                            maxValue:999999.999,
		                            decimalPrecision: 3,
		                            allowDecimals: true,
		                            allowBlank: false,
		                            selectOnFocus : true,
		    						listeners: {
		    	                        change: 'onChangeMtM3Qty'
		    	                    },
		    	                    hideTrigger: true,
		                        },{
		                        	 xtype: 'numberfield',
		                        	 reference : 'ctlWgtEach',
			                         width: 120,
			                         labelWidth: 32,
			                         editable: false,
			                         //disabled: true,
			                         fieldLabel: ViewUtil.getLabel('each'),
			                         bind: {
			                        	 value: '{theShippingNote.eachWgt}',
			                         },
			                         hideTrigger: true,
			                         keyNavEnabled: false,
			                         mouseWheelEnabled: false,
			                         minValue: 0,
			                         maxValue:999999.999,
			                         decimalPrecision: 3,
		                        },
		                        
		                    ]
		                },{
		                    xtype: 'container',
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    hidden: true,
		                    items: [
		                        {
		                            xtype: 'numberfield',
		                            flex: 1,
		                            padding: '0 5 0 0',
		                            fieldLabel: ViewUtil.getLabel('measurement'),
		                            reference : 'ctlMeasurement',
		                            bind: '{theShippingNote.cgMsrmt}',
		                            labelAlign: 'right',
		                            labelWidth: 120,
		                            minValue : 0,
		                            maxValue:999999.999,
		                            decimalPrecision: 3,
		                            selectOnFocus : true,
		                            allowBlank: false,
		                            allowDecimals: true,
		    						listeners: {
	                        	 		change: 'onChangeMtM3Qty'
		    						},
		    	                    hideTrigger: true,
		                        },{
		                        	 xtype: 'numberfield',
		                        	 reference : 'ctlMeasurementEach',
		                        	 editable: false,
		                        	 width: 120,
			                         labelWidth: 32,
			                         //disabled: true,
			                         fieldLabel: ViewUtil.getLabel('each'),
			                         bind: {
			                        	 value: '{theShippingNote.eachMsrmt}',
			                         },
			                         hideTrigger: true,
			                         keyNavEnabled: false,
			                         mouseWheelEnabled: false,
			                         minValue: 0,
			                         maxValue:999999.999,
			                         decimalPrecision: 3,
		                        }
		                    ]
		                },{
							xtype: 'container',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							hidden: true,
							items: [
								{
									xtype : 'numberfield',
									margin : '0 0 0 0',
									padding : '0 5 0 0',
									fieldLabel : ViewUtil.getLabel('quantity'),
									reference : 'ctlQuantity',
									bind : '{theShippingNote.pkgQty}',
									labelAlign : 'right',
									labelWidth : 120,
									minValue : 0,
									maxValue : 999999,
									selectOnFocus : true,
									allowDecimals : false,
									allowBlank: false,
									listeners : {
										change : 'onChangeMtM3Qty'
									},
		    	                    hideTrigger: true,
								}
							]
		                },{
							xtype: 'container',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype : 'numberfield',
									flex: 1,
									margin : '0 0 0 0',
									padding : '0 0 0 0',
									fieldLabel : ViewUtil.getLabel('freightton'),
									reference : 'ctlFreightTon',
									bind : '{theShippingNote.freightTon}',
									labelAlign : 'right',
									labelWidth : 120,
									minValue : 0,
									maxValue : 999999.999,
									decimalPrecision: 3,
									selectOnFocus : true,
									allowDecimals : true,
									listeners : {
									},
									hideTrigger: true,
									editable: false
								},
								{
									xtype: 'numberfield',
									reference : 'ctlWgtEach',
									flex: 0.82,
									labelWidth: 50,
									labelAlign : 'right',
									editable: false,
									fieldLabel: ViewUtil.getLabel('eachMt'),
									bind: {
										value: '{theShippingNote.eachWgt}',
									},
									hideTrigger: true,
									keyNavEnabled: false,
									mouseWheelEnabled: false,
									minValue: 0,
									maxValue:999999.999,
									decimalPrecision: 3,
									margin: '0 0 0 0'
		                        },
							]
		                },
		                { 	
		                	xtype: 'container',
		                	layout: {
		                		type: 'hbox',
		                		align: 'stretch'
		                	},
		                	items: [
		                		{
		                			xtype: 'numberfield',
		                			reference : 'ctlMeasurementEach',
		                			editable: false,
		                			width: 215,
		                			labelWidth: 50,
									labelAlign: 'right',
		                			fieldLabel: ViewUtil.getLabel('eachM3'),
		                			bind: {
		                				value: '{theShippingNote.eachMsrmt}',
		                			},
		                			hideTrigger: true,
		                			keyNavEnabled: false,
		                			mouseWheelEnabled: false,
		                			minValue: 0,
		                			maxValue:999999.999,
		                			decimalPrecision: 3,
		                			margin: '0 0 0 264'
		                		},
		                	]
		                },
		                {
                            xtype: 'fieldset',
                            title: 'DIRECT',
                            reference:'refFsDirect', //Fs = fieldset
                            layout: {
                                type: 'hbox'
                            },
                            height: 165,
                            margin: '-5 5 0 0',
                            padding: '0 0 0 0',
                            disabled: false,
                            defaults: {
                                labelAlign: 'right',
                                labelWidth: 100,
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    layout: { 
                                    	type: 'vbox',
                                    	align: 'stretch'
                                    },
                                    defaults: {
                                    	margin: '5 5 0 0',
                                    },
                                    margin: '10 0 0 0',
                                    items: [
                                    	{
		                                    xtype: 'container',
		                                    flex: 1,
		                                    defaults: {
		                                        labelAlign: 'right',
		                                        labelWidth: 55
		                                    },
		                                    layout: {
		                                        type: 'hbox',
		                                        align: 'stretch'
		                                    },
		                                    items: [
		                                        {
		                                        	xtype: 'numberfield',
		                                        	flex: 1,
		    	                                    fieldLabel: ViewUtil.getLabel('totalDMt'),
		    	                                    reference:'ctlDmt',
		    	                                    bind: '{theShippingNote.dmt}',
		    	                                    maskRe: /[0-9.]/,
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999.999,
		    	    	                            decimalPrecision: 3,
		    	    	                            allowDecimals: true,
		    	    	    						allowNegative: false,
		    	    	    						width: 140,
		    	    	    						readOnly: true,
		    	    	    						listeners: {
		    	    	    							change: 'onChangeMtDirectField'
		    	    	    						}
		                                        }
		                                    ]
		                                },{
		                                    xtype: 'container',
		                                    defaults: {
		                                        labelAlign: 'right',
		                                        labelWidth: 55
		                                    },
		                                    layout: {
		                                        type: 'hbox',
		                                        align: 'stretch'
		                                    },
		                                    flex: 1,
		                                    items: [
		                                        {
		                                        	xtype: 'numberfield',
		                                        	flex: 1,
		    	                                    fieldLabel: ViewUtil.getLabel('totalDM3'),
		    	                                    reference:'ctlDM3',
		    	                                    name: 'dm3',
		    	                                    bind: '{theShippingNote.dm3}',
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999.999,
		    	    	                            decimalPrecision: 3,
		    	    	                            allowDecimals: true,
		    	    	    						allowNegative: false,
		    	    	    						width: 140,
		    	    	    						readOnly: true,
		    	    	    						listeners: {
		    	    	    							change: 'onChangeM3DirectField'
		    	    	    						}
		                                        }
		                                    ]
		                                },{
		                                    xtype: 'container',
		                                    defaults: {
		                                        labelAlign: 'right',
		                                        labelWidth: 55
		                                    },
		                                    layout: {
		                                        type: 'hbox',
		                                        align: 'stretch'
		                                    },
		                                    flex: 1,
		                                    items: [
		                                        {
		                                        	xtype: 'numberfield',
		                                        	flex: 1,
		    	                                    fieldLabel: ViewUtil.getLabel('totalDQty'),
		    	                                    reference:'ctlDQty',
		    	                                    name: 'dqty',
		    	                                    bind: '{theShippingNote.dqty}',
//		    	                                    fieldStyle: 'background-color:#60ec08;background-image:none',
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999,
		    	    	                            decimalPrecision: 0,
		    	    	                            allowDecimals: false,
		    	    	    						allowNegative: false,
		    	    	    						listeners: {
		    	    	    							change: 'onChangeQtyDirectField'
		    	    	    						},
		    	    	    						width: 140,
		    	    	    						readOnly: true
		                                        },
		                                    ]
		                                }
		                            ]
                                },
                                {
                                    xtype: 'fieldset',
                                    margin : '-7 0 0 5',
                                    title: 'Vessel',
                                    reference:'ctlVesselDirectField',
                                    layout: { 
                                    	type: 'vbox',
                                    	align: 'stretch'
                                    },
                                    defaults: {
                                        labelAlign: 'left',
                                        margin : '5 5 0 0',
                                    },
                                    items: [{
		                                    xtype: 'container',
		                                    flex: 1,
		                                    layout: {
		                                        type: 'hbox',
		                                        align: 'stretch'
		                                    },
		                                    items: [
		                                        {
		                                        	xtype: 'numberfield',
		                                        	flex: 1,
		    	                                    fieldLabel: ViewUtil.getLabel('mt'),
		    	                                    reference:'ctlVslDmt',
		    	                                    bind: '{theShippingNote.dVslMt}',
		    	                                    maskRe: /[0-9.]/,
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999.999,
		    	    	                            decimalPrecision: 3,
		    	    	                            allowBlank: false,
		    	    	                            allowDecimals: true,
		    	    	    						allowNegative: false,
		    	    	    						width: 130,
		    	    	    						labelWidth: 20,
		    	    	    						listeners: {
		    	    	    							change: 'onChangeDMtVslField'
		    	    	    						}
		                                        }
		                                    ]
		                                },{
		                                    xtype: 'container',
		                                    layout: {
		                                        type: 'hbox',
		                                        align: 'stretch'
		                                    },
		                                    flex: 1,
		                                    items: [
		                                        {
		                                        	xtype: 'numberfield',
		                                        	flex: 1,
		    	                                    fieldLabel: ViewUtil.getLabel('m3'),
		    	                                    reference:'ctlVslDm3',
		    	                                    bind: '{theShippingNote.dVslM3}',
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999.999,
		    	    	                            decimalPrecision: 3,
		    	    	                            allowBlank: false,
		    	    	                            allowDecimals: true,
		    	    	    						allowNegative: false,
		    	    	    						width: 130,
		    	    	    						labelWidth: 20,
		    	    	    						listeners: {
		    	    	    							change: 'onChangeDM3VslField'
		    	    	    						}
		                                        }
		                                    ]
		                                },{
		                                    xtype: 'container',
		                                    layout: {
		                                        type: 'hbox',
		                                        align: 'stretch'
		                                    },
		                                    flex: 1,
		                                    items: [
		                                        {
		                                        	xtype: 'numberfield',
		                                        	flex: 1,
		    	                                    fieldLabel: ViewUtil.getLabel('qty'),
		    	                                    reference:'ctlVslDQty',
		    	                                    bind: '{theShippingNote.dVslQty}',
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999,
		    	    	                            decimalPrecision: 0,
		    	    	                            allowBlank: false,
		    	    	                            allowDecimals: false,
		    	    	    						allowNegative: false,
		    	    	    						width: 130,
		    	    	    						labelWidth: 20,
		    	    	    						listeners: {
		    	    	    							change: 'onChangeDQtyVslField'
		    	    	    						}
		                                        },
		                                    ]
		                                }
		                            ]
                                },
                                {
                                    xtype: 'fieldset',
                                    margin : '-7 0 0 5',
                                    title: 'Lorry',
                                    reference:'ctlLorryDirectField',
                                    layout: { 
                                    	type: 'vbox',
                                    	align: 'stretch'
                                    },
                                    defaults: {
                                        labelAlign: 'left',
                                        margin : '5 5 0 0',
                                    },
                                    items: [{
		                                    xtype: 'container',
		                                    flex: 1,
		                                    layout: {
		                                        type: 'hbox',
		                                        align: 'stretch'
		                                    },
		                                    items: [
		                                        {
		                                        	xtype: 'numberfield',
		                                        	flex: 1,
		    	                                    fieldLabel: ViewUtil.getLabel('mt'),
		    	                                    reference:'ctlLorryDmt',
		    	                                    bind: '{theShippingNote.dLrMt}',
		    	                                    maskRe: /[0-9.]/,
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999.999,
		    	    	                            decimalPrecision: 3,
		    	    	                            allowBlank: false,
		    	    	                            allowDecimals: true,
		    	    	    						allowNegative: false,
		    	    	    						width: 130,
		    	    	    						labelWidth: 20,
		    	    	    						listeners: {
		    	    	    							change: 'onChangeDMtLrField'
		    	    	    						}
		                                        }
		                                    ]
		                                },{
		                                    xtype: 'container',
		                                    layout: {
		                                        type: 'hbox',
		                                        align: 'stretch'
		                                    },
		                                    flex: 1,
		                                    items: [
		                                        {
		                                        	xtype: 'numberfield',
		                                        	flex: 1,
		    	                                    fieldLabel: ViewUtil.getLabel('m3'),
		    	                                    reference:'ctlLorryDm3',
		    	                                    bind: '{theShippingNote.dLrM3}',
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999.999,
		    	    	                            decimalPrecision: 3,
		    	    	                            allowBlank: false,
		    	    	                            allowDecimals: true,
		    	    	    						allowNegative: false,
		    	    	    						width: 130,
		    	    	    						labelWidth: 20,
		    	    	    						listeners: {
		    	    	    							change: 'onChangeDM3LrField'
		    	    	    						}
		                                        }
		                                    ]
		                                },{
		                                    xtype: 'container',
		                                    layout: {
		                                        type: 'hbox',
		                                        align: 'stretch'
		                                    },
		                                    flex: 1,
		                                    items: [
		                                        {
		                                        	xtype: 'numberfield',
		                                        	flex: 1,
		    	                                    fieldLabel: ViewUtil.getLabel('qty'),
		    	                                    reference:'ctlLorryDQty',
		    	                                    bind: '{theShippingNote.dLrQty}',
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999,
		    	    	                            decimalPrecision: 0,
		    	    	                            allowBlank: false,
		    	    	                            allowDecimals: false,
		    	    	    						allowNegative: false,
		    	    	    						width: 130,
		    	    	    						labelWidth: 20,
		    	    	    						listeners: {
		    	    	    							change: 'onChangeDQtyLrField'
		    	    	    						}
		                                        },
		                                    ]
		                                }
		                            ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'INDIRECT',
                            margin: '0 5 0 0',
                            padding: '0 0 0 0',
                            reference:'refFsInDirect',
                            layout: {
                                type: 'hbox'
                            },
                            height: 135,
                            disabled: false,
                            items: [
                            	{    
                            		xtype: 'container',
                                    margin : '0 0 0 80',
                                    layout: { 
                                    	type: 'vbox',
                                    	align: 'stretch'
                                    },
                                    defaults: {
                                    	margin : '5 5 0 0',
                                    },
		                            items: [
		                            	{
		                            		xtype: 'container',
		                            		defaults: {
		                            			labelAlign: 'right',
		                            			labelWidth: 90
		                            		},
		                            		layout: {
		                            			type: 'hbox'
		                            		},
		                            		items: [
		                            			{
		                            				xtype: 'numberfield',
		                            				fieldLabel: ViewUtil.getLabel('grossWeight'),
		                            				reference:'ctlImt',
		                            				bind: '{theShippingNote.imt}',
		                            				maskRe: /[0-9.]/,
		                            				minValue: 0,
		                            				maxValue:999999999999999.999,
		                            				decimalPrecision: 3,
		    	    	                            allowBlank: false,
		                            				allowDecimals: true,
		                            				allowNegative: false,
		                            				readOnly: false,
		                            				width: 300,
		                            				listeners: {
		    	    	    							change: 'onChangeMtIndirectField'
		    	    	    						}
		                            			}
		                            			]
		                            	},{
		                            		xtype: 'container',
		                            		defaults: {
		                            			labelAlign: 'right',
		                            			labelWidth: 90
		                            		},
		                            		layout: {
		                            			type: 'hbox'
		                            		},
		                            		items: [
		                            			{
		                            				xtype: 'numberfield',
		                            				fieldLabel: ViewUtil.getLabel('measurement'),
		                            				reference:'ctlIm3',
		                            				name: 'im3',
		                            				bind: '{theShippingNote.im3}',
		                            				name: 'grMsrmt',
		//    	                                    fieldStyle: 'background-color:#60ec08;background-image:none',
		                            				minValue: 0,
		                            				maxValue:999999999999999.999,
		                            				decimalPrecision: 3,
		    	    	                            allowBlank: false,
		                            				allowDecimals: true,
		                            				allowNegative: false,
		                            				readOnly: false,
		                            				width: 300,
		                            				listeners: {
		    	    	    							change: 'onChangeM3IndirectField'
		    	    	    						}
		                            			}
		                            			]
		                            	},{
		                            		xtype: 'container',
		                            		defaults: {
		                            			labelAlign: 'right',
		                            			labelWidth: 90
		                            		},
		                            		layout: {
		                            			type: 'hbox'
		                            		},
		                            		items: [
		                            			{
		                            				xtype: 'numberfield',                 
		                            				fieldLabel: ViewUtil.getLabel('quantity'),
		                            				reference:'ctlIQty',
		                            				name: 'iqty',
		                            				bind: '{theShippingNote.iqty}',
		//    	                                    fieldStyle: 'background-color:#60ec08;background-image:none',
		                            				minValue: 0,
		                            				maxValue:999999999999999,
		                            				decimalPrecision: 0,
		    	    	                            allowBlank: false,
		                            				allowDecimals: false,
		                            				allowNegative: false,
//		                            				listeners: {
//		    	    	    							change: 'onChangeQtyIndirectField'
//		                            				},
		                            				readOnly: false,
		                            				width: 300,
		                            				listeners: {
		    	    	    							change: 'onChangeQtyIndirectField'
		    	    	    						}
		                            			}
		                            			]
		                            	}
		                            	]
                            	}
                            ]
                        },
		                {//Length:
							xtype: 'container',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype : 'numberfield',
									margin : '0 0 0 0',
									padding : '0 5 0 0',
									fieldLabel : ViewUtil.getLabel('length'),
									reference : 'ctlLength',
									bind : '{theShippingNote.cgLen}',
									labelAlign : 'right',
									labelWidth : 120,
									minValue: 0,
									maxValue: 999999999999999.999,
									decimalPrecision: 3,
		                            selectOnFocus : true,
									allowDecimals : true,
//									listeners : {
//										change: 'onChangeLWH'
//									},
		    	                    hideTrigger: true,
		    	                    keyNavEnabled: true,
		    	                    hidden: true
								}
							]
		                },{//Width:
							xtype: 'container',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype : 'numberfield',
									margin : '0 0 0 0',
									padding : '0 5 0 0',
									fieldLabel : ViewUtil.getLabel('width'),
									reference : 'ctlWidth',
									bind : '{theShippingNote.cgWth}',
									labelAlign : 'right',
									labelWidth : 120,
									minValue: 0,
									maxValue: 999999999999999.999,
									decimalPrecision: 3,
		                            selectOnFocus : true,
									allowDecimals : true,
//									listeners : {
//										change: 'onChangeLWH'
//									},
		    	                    hideTrigger: true,
		    	                    hidden: true
								}
							]
		                },{//Height:
							xtype: 'container',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
									xtype : 'numberfield',
									margin : '0 0 0 0',
									padding : '0 5 0 0',
									fieldLabel : ViewUtil.getLabel('height'),
									reference : 'ctlHeight',
									bind : '{theShippingNote.cgHgt}',
									labelAlign : 'right',
									labelWidth : 120,
									minValue: 0,
									maxValue: 999999999999999.999,
									decimalPrecision: 3,
		                            selectOnFocus : true,
									allowDecimals : true,
//									listeners : {
//										change: 'onChangeLWH'
//									},
		    	                    hideTrigger: true,
		    	                    hidden: true
								}
							]
		                }
		            ]
		        },
				{
		            xtype: 'container',
		            flex: 1,
		            defaults: {
		                margin: '5 5 0 5',
		                labelAlign: 'right',
		                labelWidth: 120
		            },
		            layout: {
		                type: 'vbox',
		                align: 'stretch'
		            },
		            items: [
		                {
		                    xtype: 'container',
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'partnercdfield',
		                            flex: 1,
		                            padding: '0 0 0 0',
		                            fieldLabel: ViewUtil.getLabel('fAgent'),
		                            reference : 'ctlFAgent',
		                            bind:{value : '{theShippingNote.fwrd}'},
		                            labelAlign: 'right',
		                            labelWidth: 120,
		    	   					params:{
		    	   						ptnrType: CodeConstants.CM_PTNRTP_FWD // CNS, FWD, TRK
		    	   					}
		                        }
		                    ]
		                },
						{
		                    xtype: 'container',
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'container',
		                            width: 125
		                        },{
		                            xtype: 'textfield',
		                            flex: 1,
		                            reference :'ctlFAgentName',
		                            bind: '{theShippingNote.fwrdNm}',
		                            labelAlign: 'right',
		                            labelWidth: 120,
		                            editable: false
		                        }
		                    ]
		                },
						{
		                    xtype: 'container',
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'partnercdfield',
		                            flex: 1,
		                            padding: '0 0 0 0',
		                            reference:'ctlTransporter',
		                            fieldLabel: ViewUtil.getLabel('transporter'),
		                            bind:{
		                            	value : '{theShippingNote.tsptComp}'
		                            },
		                            labelAlign: 'right',
		                            fieldStyle : 'text-transform: uppercase',
		                            labelWidth: 120,
		                            readOnly:true,
		    	   					params:{
		    	   						ptnrType: CodeConstants.CM_PTNRTP_TRK // CNS, FWD, TRK
		    	   					},
		    	   					allowBlank: false
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'container',
		                            width: 125
		                        },{
		                            xtype: 'textfield',
		                            flex: 1,
		                            reference :'ctlTransporterName',
		                            bind: '{theShippingNote.tsptCompNm}',
		                            labelAlign: 'right',
		                            labelWidth: 120,
		                            editable: false
		                        }
		                    ]
		                },
						{
		                	xtype:'container',
							padding: '0 0 0 120',
							margin: '-5 0 -10 5',
							hidden: true,
							items:[
								{
		    						xtype: 'checkboxfield',
		    						boxLabel: ViewUtil.getLabel('additionalLoading'),
		    						reference: 'refAdditionalChk',
		    						bind: '{theShippingNote.additionalChk}',
		    						inputValue: 'Y',
		                            uncheckedValue: 'N',
		                            checked:false
		    					}
							]
		                },{
		                    xtype: 'container',
		                    margin: '0 5 0 5',
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'label',
		                            html: '<p style="text-align:right;font-size:11px;font-family:tahoma">Estimated Cargo<br/>Arrival Date<br/></p>',
		                            margin: '0 5 0 0',
		                            width: 120
		                        },{
		                            xtype: 'container',
		                            flex: 1,
		                            layout: {
		                                type: 'hbox',
		                                align: 'middle'
		                            },
		                            items: [
		                                {
		                                    xtype: 'datetimefield',
		                                    flex: 1,
		                                    reference:'ctlAstArrvDt',
		                                    bind: '{theShippingNote.estArrvDt}',
		                                    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		                                    allowBlank: false
		                                }
		                            ]
		                        }
		                    ]
		                },{
		                    xtype: 'container',
		                    height: 20,
							hidden: true,
		                    margin: '0 0 0 0',
		                    layout: {
		                        type: 'hbox'
		                    },
		                    items: [
		                        {
		                            xtype: 'container',
		                            width: 120
		                        },{
		                            xtype: 'label',
		                            flex: 1,
		                            html: '<div style="text-align:center">Mode</div>',
		                            text: ''
		                        },{
		                            xtype: 'label',
		                            dock: 'top',
		                            html: '<div style="text-align:center">MT</div>',
		                            width: 90,
		                            text: ''
		                        }
		                    ]
		                },
						{
		                    xtype: 'container',
							hidden: true,
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'container',
		                            width: 120
		                        },{
		                            xtype: 'textfield',
		                            reference: 'ctlMode1',
		                            bind: '{theShippingNote.shippingNoteMode1}',
		                            editable : false,
		                            flex: 1
		                        },{
		                            xtype: 'numberfield',
		                            reference: 'ctlMt1',
		                            bind: '{theShippingNote.cgWgt}',
		        					minValue : 0,
		        					maxValue:999999.999,
			                        decimalPrecision: 3,
			                        selectOnFocus : true,
			                        allowDecimals: true,
			    					hideTrigger: true,
		                            margin: '0 0 0 5',
		                            width: 90
		                        }
		                    ]
		                },
						{
		                    xtype: 'container',
							hidden: true,
		                    layout: {
		                        type: 'hbox',
		                        align: 'stretch'
		                    },
		                    items: [
		                        {
		                            xtype: 'container',
		                            width: 120
		                        },{
		                            xtype: 'textfield',
		                            reference: 'ctlMode2',
		                            bind: '{theShippingNote.shippingNoteMode2}',
		                            editable : false,
		                            flex: 1
		                        },{
		                            xtype: 'numberfield',
		                            reference: 'ctlMt2',
		                            bind: '{theShippingNote.shippingNoteMT2}',
		                            minValue : 0,
		                            maxValue:999999.999,
		                            decimalPrecision: 3,
		                            selectOnFocus : true,
		                            allowDecimals: true,
		    						hideTrigger: true,
		                            margin: '0 0 0 5',
		                            width: 90,
		                        }
		                    ]
		                }, 
						{
					    	xtype: 'container',
							margin: '0 5 0 5',
							layout: {
		                    	type: 'hbox',
		    	                pack: 'end'
		                    },
							items:[
								{
	                            	xtype: 'filefield',
	                				name : 'fileUpload',
	                				reference : 'refBtnAddFile',
	                				margin: '0 -56 0 5',
	                				itemId: 'createButton',
	                				id:'shippingNoteFileUpload',
	                				style: 'text-align:left',
	                				method: 'POST',
	                				fileUpload: true,
	                            	enctype: 'multipart/form-data',
	                				buttonText: '',
	                		        buttonOnly: true,
	                		        multiple: true,
	                				buttonConfig: {
	                					text:  ViewUtil.getLabel('add'),
	                					iconCls: 'x-fa fa-plus' 
	                		    	},
	                		    	listeners: {
	                		    		change: 'onFileGridAdd',
	                		    		afterrender:function(cmp){
	                		                cmp.fileInputEl.set({
	                		                    multiple:'multiple'
	                		                });
	                		            }
	                			    }
	                            },{
	                                xtype: 'button',
	                                margin: '0 0 0 5',
	                                reference : 'refBtnRemoveFile',
	                                ui: 'delete-button',
	                                iconCls: 'x-fa fa-minus',
	                                text: ViewUtil.getLabel('remove'),
	            					listeners: {
	            						click: 'onRemoveForFileUpload'
	            					}
	                            }
							]
						},{
                        	xtype: 'tsb-datagrid',
                        	reference: me.FILE_GRID_REF_NAME,
                        	height: 316,
							margin: '5 5 5 0',
                        	stateful : true,
                        	usePagingToolbar : false,
                        	style: {
                        		borderColor: '#AAA', 
                        		borderStyle: 'solid', 
                        		borderWidth: 'thin'
                        	},
                        	stateId : 'stateShippingNoteUploadGrid',
                        	plugins: [
                        		'gridexporter',
                        		'gridfilters',
                        		'clipboard'
                        	],
                        	bind: {
                        		store: '{'+me.FILE_UPLOAD_STORE_NAME +'}'
                        	},
                        	listeners: {
                        		celldblclick: 'onFileDownloadDblClick'
                        	},
                        	selModel: {
            		            type: 'checkboxmodel',  
            		            checkOnly: false,
            		            showHeaderCheckbox: true
                        	},
                        	columns: {
                        		defaults: {
                        			style : 'text-align:center',
                        			align : 'center'
                        		},
                        		items: GridUtil.getGridColumns('ShippingNoteFileUpload')
                        	}
		                }
		            ]
		        }
			]
		});
		
		me.callParent();
	}
});