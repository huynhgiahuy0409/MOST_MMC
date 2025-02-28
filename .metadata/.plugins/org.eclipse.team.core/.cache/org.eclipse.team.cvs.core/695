Ext.define('MOST.view.document.deliveryorderdetail.SdoMainTab', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-sdomaintab',
	
	layout : {type  : 'vbox', align : 'stretch'},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	FILE_GRID_REF_NAME : 'refDeliveryOrderFileUploadGrid', // File Grid Name  
	FILE_UPLOAD_STORE_NAME : 'deliveryOrderFileUpload', // File Store Name
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
		            layout: {
		                type: 'hbox',
		                align: 'stretch'
		            },
		            items: [
	                    {	
                            xtype: 'container',
                            flex: 1,
                            defaults: {
                                labelAlign: 'right',
                                margin: '2 0 0 0',
                                labelWidth: 120
                            },
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                            	{
                                    xtype: 'textfield',
                                    width: 250,
                                    fieldLabel: ViewUtil.getLabel('subDoNo'),
                                    reference: 'refTxtSubDoNo',
                                    labelStyle: "color:blue;",
                                    name: 'sdono',
                                    maxLength: 50,
                                    readOnly: true,
                                    enforceMaxLength : true,
                                    bind: '{theMain.sdono}',
                                    listeners: {
			    						change: 'onUpperCase'
			    					}
                                },
                                {
                                    xtype: 'textfield',
                                    width: 250,
                                    reference:'refTxtFA',
                                    fieldLabel: ViewUtil.getLabel('forwardingAgent'),
                                    name: 'ptnrcd',
                                    bind: '{theMain.ptnrcd}',
									editable : false
                                },{
                                    xtype: 'container',
                                    width: 250,
                                    margin : '2 0 0 0',
                                    defaults: {
                                        //margin: '0 0 0 2',
                                        labelAlign: 'right',
                                        labelWidth: 120
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                        	xtype: 'textfield',
                                        	width: 220,
    	                                    fieldLabel: ViewUtil.getLabel('uNNoClass'),
    	                                    name: 'tfzunno',
    	                                    bind: '{theMain.tfzunno}',
    										editable : false
                                        },{
                                            xtype: 'textfield',
                                            margin: '0 0 0 2',
                                            flex:1,
                                            name: 'imdgclass',
    	                                    bind: '{theMain.imdgclass}',
    	                                    editable : false,
                                            fieldLabel: ''
                                        }
                                    ]
                                },{
                                    xtype: 'container',
                                    defaults: {
                                        //margin: '0 0 0 2',
                                        labelAlign: 'right',
                                        labelWidth: 120
                                    },
                                    margin : '2 0 0 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                        	xtype: 'textfield',
    	                                    fieldLabel: ViewUtil.getLabel('docMtM3Qty'),
    	                                    reference:'ctlDocMt',
    	                                    flex: 2.8,
    	                                    name: 'wgt',
    	                                    bind: '{theMain.wgt}',
    										editable : false,
                                        },{
                                            xtype: 'textfield',
                                            margin: '0 0 0 2',
                                            flex:1,
                                            reference:'ctlVol',
                                            name: 'vol',
    	                                    bind: '{theMain.vol}',
    	                                    editable : false,
                                            fieldLabel: ''
                                        },{
                                            xtype: 'textfield',
                                            margin: '0 0 0 2',
                                            flex:1,
                                            reference:'ctlPkgQty',
                                            name: 'pkgqty',
    	                                    bind: '{theMain.pkgqty}',
    	                                    editable : false,
                                            fieldLabel: ''
                                        }
                                    ]
                                },{
                                    xtype: 'textfield',
                                    width: 250,
                                    fieldLabel: ViewUtil.getLabel('goodsDesc'),
                                    name: 'gdsrmk',
                                    bind: '{theMain.gdsrmk}',
									editable : false
                                },
                                {
									xtype: 'checkboxfield',
									margin: '0 0 0 125',
									boxLabel: ViewUtil.getLabel('notToWgt'),
									reference: 'refWeightChk',
									bind: '{theMain.sdoWgtChk}',
									inputValue: 'N',
			                        uncheckedValue: 'Y',
			                        disabled: true,
			                        checked:false
								},
								{
									xtype: 'checkboxfield',
									margin: '0 0 0 125',
									boxLabel: ViewUtil.getLabel('additionalLoading'),
									reference: 'refAdditionalChk',
									bind: '{theMain.sdoAdditionalChk}',
									inputValue: 'Y',
			                        uncheckedValue: 'N',
			                        hidden: false,
			                        checked:false
								}
                            ]
	                    },{	
                            xtype: 'container',
                            flex: 1,
                            defaults: {
                                labelAlign: 'right',
                                margin: '2 0 0 0',
                                labelWidth: 120
                            },
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    width: 100,
                                    defaults: {
                                        margin: '0 0 0 5',
                                        labelAlign: 'right',
                                        labelWidth: 115
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                    	{
                                        	xtype: 'textfield',
                                            width: 184,
                                            fieldLabel: ViewUtil.getLabel('cargoType'),
                                            reference:'refTxtCargoType',
                                            name: 'cgTpCdNm',
                                            bind: '{theMain.cgtpcd}',
        									editable : false
        								},{
        		                            xtype: 'textfield',
        		                            flex: 1,
        		                            margin: '0 0 0 5',
        		                            padding: '',
        		                            labelAlign: 'right',
        		                            reference: 'refTxtCargoTypeNm',
        		                            bind: '{theMain.cgTpCdNm}',
        		                            editable : false,
        		                        }
                                    ]
                                },{
                                    xtype: 'container',
                                    width: 100,
                                    defaults: {
                                        margin: '0 0 0 5',
                                        labelAlign: 'right',
                                        labelWidth: 115
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                    	{
                                        	xtype: 'textfield',
                                            width: 184,
                                            fieldLabel: ViewUtil.getLabel('cmdtGrp'),
                                            reference:'refTxtCmdtGrpCd',
                                            name: 'cmdtGrpCd',
                                            bind: '{theMain.cmdtGroupCd}',
        									editable : false
        								},{
        		                            xtype: 'textfield',
        		                            flex: 1,
        		                            margin: '0 0 0 5',
        		                            padding: '',
        		                            labelAlign: 'right',
        		                            reference: 'refTxtCmdtGrpNm',
        		                            bind: '{theMain.cmdtGroupCdNm}',
        		                            editable : false,
        		                        }
                                    ]
                                },{
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5',
                                        labelAlign: 'right',
                                        labelWidth: 115
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                    	{
                                        	xtype: 'textfield',
                                            width: 184,
                                            fieldLabel: ViewUtil.getLabel('cmdtCd'),
                                            reference:'ctlCommodity',
                                            name: 'cmdtCd',
                                            bind: '{theMain.cmdtcd}',
        									editable : false
        								},{
        		                            xtype: 'textfield',
        		                            flex: 1,
        		                            margin: '0 0 0 5',
        		                            padding: '',
        		                            labelAlign: 'right',
        		                            reference: 'ctlCommodityNm',
        		                            bind: '{theMain.cmdtcdnm}',
        		                            editable : false,
        		                        }
                                    ]
                                },{
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5',
                                        labelAlign: 'right',
                                        labelWidth: 115
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                    	{
                                            xtype: 'cmmcdfield',
                                            width: 200,
                                            fieldLabel: ViewUtil.getLabel('packageTp'),
                                            reference: 'ctlTypeOfPackage',
                                            bind:{
                                            	value : '{theMain.pkgtpcd}',
                                            	cgTpCd: '{theMain.cgTpCd}',
                                				cmdtGrpCd: '{theMain.cmdtGroupCd}',
                                				cmdtCd: '{theMain.cmdtcd}'
                                            },
                                            editable: false,
                                            params:{
                                            	searchType: 'COMM',
                		   						searchDivCd: 'PKGTP',
                		   						searchLcd:CodeConstants.LCD_MOST,
                	                            searchMcd: CodeConstants.MCD_MT_PKGTP
                    	   					}
                                        },{
        		                            xtype: 'textfield',
        		                            flex: 1,
        		                            margin: '0 0 0 5',
        		                            padding: '',
        		                            labelAlign: 'right',
        		                            reference: 'ctlPkgTpNm',
        		                            bind: '{theMain.pkgtpnm}',
        		                            editable : false,
        		                        }
                                    ]
                                },{
                                    xtype: 'textfield',
                                    fieldLabel: ViewUtil.getLabel('cargoMark'),
                                    name: 'pkgmark',
                                    bind: '{theMain.markNo}',
									editable : false
                                },
                                {
									xtype: 'checkboxfield',
									margin: '0 0 0 125',
									boxLabel: ViewUtil.getLabel('projectCargo'),
									reference: 'refProjectCargo',
									bind: '{theMain.projectCargo}',
									inputValue: 'Y',
			                        uncheckedValue: 'N',
			                        checked:false,
			                        disabled: true
								},
								{
		                        	xtype: 'textfield',
		            				reference: 'refTxtSDORmk',
		            				fieldLabel: ViewUtil.getLabel('rmk'),
		            				bind: '{theMain.sdormk}',
		            				labelAlign: 'left',
		            				labelWidth: 50,
		            				margin: '0 0 0 30',
		            				width: 300
		                        }
                            ]
	                    },{	
                            xtype: 'container',
                            flex: 1,
                            defaults: {
                                labelAlign: 'right',
                                margin: '2 0 0 0',
                                labelWidth: 120
                            },
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                            	{
	                            	xtype:'partnercdformultifield',
	            					fieldLabel: ViewUtil.getLabel('tsptrOrigin'),
	            					reference:'ctlPartnerCodeMultiField',
	                                bind: {
	                                	value : '{theMain.tsptr}'
	                                },
		                            readOnly:true,
		                            labelAlign: 'right',
		                            fieldStyle : 'text-transform: uppercase',
		    	   					params:{
		    	   						ptnrType: CodeConstants.CM_PTNRTP_TRK // CNS, FWD, TRK
		    	   					},
		    	   					allowBlank: false
                            	},{
                                	xtype: 'datetimefield',
                                    reference: 'ctlETAFromDt',
                                    fieldLabel: ViewUtil.getLabel('expLorryArr'),
                                    bind: '{theMain.estArrvDt}',
                                    editable : false,
    	                            readOnly : false,
    	                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
    	                            allowBlank: false
//    	                            hidden: true
                                },
                                {
                                    xtype: 'datetimefield',
                                    reference: 'ctlSdoValidDate',
                                    fieldLabel: ViewUtil.getLabel('grValidDate'),
                                    hidden: false,
                                    editable : false,
                                    readOnly : false,
                                    //bind: '{theMain.validDate}',
                                    format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5',
                                        labelAlign: 'right',
                                        labelWidth: 115
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                    	{
                                        	xtype: 'textfield',
                                            width: 184,
                                            fieldLabel: ViewUtil.getLabel('pol'),
                                            reference:'ctlPol',
                                            bind: '{theMain.pol}',
        									editable : false
        								},{
        		                            xtype: 'textfield',
        		                            flex: 1,
        		                            margin: '0 0 0 5',
        		                            padding: '',
        		                            labelAlign: 'right',
        		                            reference: 'ctlPolNm',
        		                            bind: '{theMain.polnm}',
        		                            editable : false,
        		                        }
                                    ]
                                },{
                                    xtype: 'container',
                                    defaults: {
                                        margin: '0 0 0 5',
                                        labelAlign: 'right',
                                        labelWidth: 115
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                    	{
                                        	xtype: 'textfield',
                                            width: 184,
                                            fieldLabel: ViewUtil.getLabel('fdest'),
                                            reference:'ctlPod',
                                            bind: '{theMain.pod}',
        									editable : false
        								},{
        		                            xtype: 'textfield',
        		                            flex: 1,
        		                            margin: '0 0 0 5',
        		                            padding: '',
        		                            labelAlign: 'right',
        		                            reference: 'ctlPodNm',
        		                            bind: '{theMain.podnm}',
        		                            editable : false,
        		                        }
                                    ]
                                },{
                                    xtype: 'container',
                                    width: 100,
                                    defaults: {
                                        margin: '0 0 0 5',
                                        labelAlign: 'right',
                                        labelWidth: 115
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                    	{
                                        	xtype:'textfield',
                                        	width: 184,
                        					fieldLabel: ViewUtil.getLabel('finalDes'),
                        					reference:'ctlFinalDes',
                        					name: 'dofnlportcd',
    	                                    bind: '{theMain.dofnlportcd}',
    	                                    fieldStyle:'text-transform:uppercase',
    	                                    editable : false,
                                        },{
        		                            xtype: 'textfield',
        		                            flex: 1,
        		                            margin: '0 0 0 5',
        		                            padding: '',
        		                            labelAlign: 'right',
        		                            reference: 'ctlFinalDesNm',
        		                            bind: '{theMain.dofnlportcdnm}',
        		                            editable : false,
        		                        }
                                    ]
                                }
                            ]
	                    }
                    ]
		        },{
		            xtype: 'container',
		            layout: {
		                type: 'hbox'
		            },
		            items: [
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            title: 'DIRECT',
                            
                            layout: {
                                type: 'hbox'
                            },
                            defaults: {
                                labelAlign: 'right',
                                labelWidth: 150,
                                margin: '2 5 0 0'
                            },
                            items: [
                                {
                                    xtype: 'container', 
                                    reference:'refFsDirect', //Fs = fieldset
                                    margin : '0 0 0 0',
                                    layout: { 
                                    	type: 'vbox',
                                    	align: 'stretch'
                                    },
                                    defaults: {
                                        labelAlign: 'right',
                                        width: 300,
                                        labelWidth: 100,
                                        margin: '2 0 0 0'
                                    },
                                    //flex: 0.55,
                                    items: [
	                                    {
	                                    	xtype: 'combobox',
	                                        reference:'ctlModeOper',
	                                        fieldLabel: ViewUtil.getLabel('modeofOperation'),
	                                        flex: 1,
	                                        name: 'tspttpcd',
	                                        bind: {
	                                        	store: '{directTstpCombo}',
	                                        	value: '{theMain.tspttpcd}'
	                                        },
	                                        queryMode: 'local',
	                				        displayField: 'scdNm',
	                				        valueField: 'scd',
	                				        editable:false,
	                				        listeners: {
    	    	    							select: 'onDisplayDirectMtM3QtyForSDO'
    	    	    						}
	                                    },{
		                                    xtype: 'container',
		                                    flex: 1,
		                                    defaults: {
		                                        labelAlign: 'right',
		                                        labelWidth: 100
		                                    },
		                                    layout: {
		                                        type: 'hbox',
		                                        align: 'stretch'
		                                    },
		                                    items: [
		                                        {
		                                        	xtype: 'numberfield',
		                                        	flex: 1,
		    	                                    fieldLabel: ViewUtil.getLabel('grossWeight'),
		    	                                    reference:'ctlDDmt',
		    	                                    bind: '{theMain.dmt}',
		    	                                    maskRe: /[0-9.]/,
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999.999,
		    	    	                            decimalPrecision: 3,
		    	    	                            allowDecimals: true,
		    	    	    						allowNegative: false,
		                                        }
		                                    ]
		                                },{
		                                    xtype: 'container',
		                                    defaults: {
		                                        labelAlign: 'right',
		                                        labelWidth: 100
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
		    	                                    fieldLabel: ViewUtil.getLabel('measurement'),
		    	                                    reference:'ctlDM3',
		    	                                    name: 'dm3',
		    	                                    bind: '{theMain.dm3}',
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999.999,
		    	    	                            decimalPrecision: 3,
		    	    	                            allowDecimals: true,
		    	    	    						allowNegative: false,
		                                        }
		                                    ]
		                                },{
		                                    xtype: 'container',
		                                    defaults: {
		                                        labelAlign: 'right',
		                                        labelWidth: 100
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
		    	                                    fieldLabel: ViewUtil.getLabel('quantity'),
		    	                                    reference:'ctlDQty',
		    	                                    name: 'dqty',
		    	                                    bind: '{theMain.dqty}',
		    	                                    //fieldStyle: 'background-color:#60ec08;background-image:none',
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999,
		    	    	                            decimalPrecision: 0,
		    	    	                            allowDecimals: false,
		    	    	    						allowNegative: false,
		    	    	    						listeners: {
		    	    	    							change:'validateAmount2'
		    	    	    						}
		                                        },
		                                    ]
		                                }
		                            ]
                                }
                            ]
                        },{
                            xtype: 'fieldset',
                            title: 'INDIRECT',
                            margin: '0 5 0 5',
                            
                            layout: {
                                type: 'vbox'
                            },
                            flex: 1,
                            defaults: {
                                labelAlign: 'right',
                                labelWidth: 100,
                                margin: '2 5 0 0'
                            },
                            items: [
                            	{
                                    xtype: 'container', 
                                    reference:'refFsInDirect',
                                    margin : '0 0 0 0',
                                    layout: { 
                                    	type: 'vbox',
                                    	align: 'stretch'
                                    },
                                    defaults: {
                                        labelAlign: 'right',
                                        width: 300,
                                        labelWidth: 100,
                                        margin: '2 0 0 0'
                                    },
                                    items: [
                                    	{
                                        	xtype: 'combo',
                                            reference:'ctlIModeOper',
                                            fieldLabel: ViewUtil.getLabel('modeofOperation'),
                                            name: 'itspttpcd',
                                            editable:false,
                                            bind: {
                                            	store: '{indirectTstpCombo}',
                                            	value: '{theMain.itspttpcd}'
                                            },
                                            queryMode: 'local',
                    				        displayField: 'scdNm',
                    				        valueField: 'scd',
                    				        listeners: {
    	    	    							select: 'onSelectSDOIndirectModeOfOperation'
    	    	    						}
                                        },
                                        {
                                        	xtype: 'numberfield',
    	                                    fieldLabel: ViewUtil.getLabel('grossWeight'),
    	                                    reference:'ctlImt',
    	                                    //name: 'imt',
    	                                    bind: '{theMain.imt}',
    	                                    maskRe: /[0-9.]/,
    	                                    minValue: 0,
    	    	                            maxValue:999999999999999.999,
    	    	                            decimalPrecision: 3,
    	    	                            allowDecimals: true,
    	    	    						allowNegative: false,
                                        },
                                        {
                                        	xtype: 'numberfield',
    	                                    fieldLabel: ViewUtil.getLabel('measurement'),
    	                                    reference:'ctlIm3',
    	                                    name: 'im3',
    	                                    bind: '{theMain.im3}',
    	                                    name: 'grMsrmt',
    	                                    //fieldStyle: 'background-color:#60ec08;background-image:none',
    	                                    minValue: 0,
    	    	                            maxValue:999999999999999.999,
    	    	                            decimalPrecision: 3,
    	    	                            allowDecimals: true,
    	    	    						allowNegative: false,
                                        },
                                        {
                                        	xtype: 'numberfield',                 
                                        	fieldLabel: ViewUtil.getLabel('quantity'),
    	                                    reference:'ctlIQty',
    	                                    name: 'iqty',
    	                                    bind: '{theMain.iqty}',
    	                                    //fieldStyle: 'background-color:#60ec08;background-image:none',
    	                                    minValue: 0,
    	    	                            maxValue:999999999999999,
    	    	                            decimalPrecision: 0,
    	    	                            allowDecimals: false,
    	    	    						allowNegative: false,
    	    	    						listeners: {
    	    	    							change: 'validateAmount2'
    	    	    						}
                                        },
                                    ]
                            	}
                            ]
                        }
                    ]
		        },
//		        {
//			    	xtype: 'container',
//			    	margin: '5 0 5 5',
//			    	flex: 1,
//					layout: {
//                    	type: 'hbox',
//    	                pack: 'end'
//                    },
//					items:[
//						{
//                        	xtype: 'filefield',
//            				name : 'fileUpload',
//            				margin: '0 0 0 5',
//            				itemId: 'createButton',
//            				id:'doFileUpload',
//            				style: 'text-align:left',
//            				method: 'POST',
//            				fileUpload: true,
//                        	enctype: 'multipart/form-data',
//            				buttonText: '',
//            		        buttonOnly: true,
//            		        multiple: true,
//            				buttonConfig: {
//            					text:  ViewUtil.getLabel('add'),
//            					iconCls: 'x-fa fa-plus' 
//            		    	},
//            		    	listeners: {
//            		    		change: 'onFileGridAdd',
//            		    		afterrender:function(cmp){
//            		                cmp.fileInputEl.set({
//            		                    multiple:'multiple'
//            		                });
//            		            }
//            			    }
//                        },{
//                            xtype: 'button',
//                            margin: '0 0 0 5',
//                            reference : 'refBtnRemoveFile',
//                            ui: 'delete-button',
//                            iconCls: 'x-fa fa-minus',
//                            text: ViewUtil.getLabel('remove'),
//        					listeners: {
//        						click: 'onRemoveForFileUpload'
//        					}
//                        }
//					]
//				},{
//                	xtype: 'tsb-datagrid',
//                	reference: me.FILE_GRID_REF_NAME,
//                	height: 100,
//                	stateful : true,
//                	usePagingToolbar : false,
//                	style: {
//                		borderColor: '#AAA', 
//                		borderStyle: 'solid', 
//                		borderWidth: 'thin'
//                	},
//                	stateId : 'stateDeliveryOrderUploadGrid',
//                	plugins: [
//                		'gridexporter',
//                		'gridfilters',
//                		'clipboard'
//                	],
//                	bind: {
//                		store: '{'+me.FILE_UPLOAD_STORE_NAME+'}'
//                	},
//                	listeners: {
//                		celldblclick: 'onFileDownloadDblClick'
//                	},
//                	selModel: {
//    		            type: 'checkboxmodel',  
//    		            checkOnly: false,
//    		            showHeaderCheckbox: true
//                	},
//                	columns: {
//                		defaults: {
//                			style : 'text-align:center',
//                			align : 'center'
//                		},
//                		items: GridUtil.getGridColumns('DeliveryOrderFileUpload')
//                	}
//                }
		    ]
		});
		
		me.callParent();
	}
});