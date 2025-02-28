Ext.define('MOST.view.document.deliveryorderdetail.DeliveryMain', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-deliverymain',
	
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
                                    fieldLabel: ViewUtil.getLabel('doNo'),
                                    reference: 'refTxtDoNo',
                                    labelStyle: "color:blue;",
                                    name: 'dono',
                                    maxLength: 30,
                                    enforceMaxLength : true,
                                    readOnly: true,
                                    bind: '{theMain.dono}',
                                    listeners: {
			    						change: 'onUpperCase'
			    					}
                                },{
                                    xtype: 'textfield',
                                    fieldLabel: ViewUtil.getLabel('subDoNo'),
                                    reference: 'refTxtSubDoNo',
                                    labelStyle: "color:blue;",
                                    name: 'sdono',
                                    maxLength: 30,
                                    hidden: true,
                                    readOnly: true,
                                    enforceMaxLength : true,
                                    bind: '{theMain.sdono}',
                                    listeners: {
			    						change: 'onUpperCase'
			    					}
                                },{
                                    xtype: 'textfield',
                                    width: 250,
                                    reference:'refTxtFA',
                                    fieldLabel: ViewUtil.getLabel('forwardingAgent'),
                                    name: 'ptnrcd',
                                    bind: '{theMain.ptnrNm}',	//Showing name instead of code based on BA req.
									editable : false
                                },{
                                    xtype: 'container',
                                    width: 250,
                                    margin : '2 0 0 0',
                                    defaults: {
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
    	                                    flex: 2.5,
    	                                    name: 'wgt',
    	                                    bind: '{theMain.wgt}',
    										editable : false,
                                        },{
                                            xtype: 'textfield',
                                            flex:1,
                                            reference:'ctlVol',
                                            name: 'vol',
    	                                    bind: '{theMain.vol}',
    	                                    editable : false,
                                            fieldLabel: ''
                                        },{
                                            xtype: 'textfield',
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
                                },{
        		                	xtype:'container',
        		                	flex:1,
        		                	padding: '0 0 0 120',
        		                	margin: '0 0 -5 0',
        							items:[
        								{
        									xtype: 'checkboxfield',
        									boxLabel: ViewUtil.getLabel('notToWgt'),
        									reference: 'refWeightChk',
        									bind: '{theMain.wgtChk}',
        									inputValue: 'N',
        			                        uncheckedValue: 'Y',
        			                        disabled: true,
        			                        checked:false
        								}
        							]
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
	    									xtype: 'cmmcdfield',
	    									fieldLabel: ViewUtil.getLabel('cmdtGrp'),
	    									reference: 'refTxtCmdtGrpCd',
	    									width: 215,
	    									name: 'cmdtGrpCd',
	    		                            bind:{
	    		                            	value : '{theMain.cmdtGroupCd}',
	    		                            	cgTpCd: '{theMain.cgtpcd}'
	    		                            },
	    		                            labelAlign: 'right',
	    		                            allowBlank: false,
	    		    	   					params:{
	    		    	   						searchType: 'CMDT_GRP'
	    		    	   					}
	    								},{
	    									xtype: 'textfield',
	    									reference:'refTxtCmdtGrpNm',
	    									margin: '0 0 0 5',
	    									editable: false,
	    									flex: 1,
	    									bind:{
	    										value : '{theMain.cmdtGroupCdNm}'
	    									}
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
	    									fieldLabel: ViewUtil.getLabel('cmdtCd'),
	    									reference: 'ctlCommodity',
	    									width: 215,
	    									name: 'cmdtCd',
	    		                			bind:{
	    		                				value : '{theMain.cmdtcd}',
	    		                				cgTpCd: '{theMain.cgtpcd}',
	    		                				cmdtGrpCd: '{theMain.cmdtGroupCd}'
	    		                			},
	    		                			labelAlign: 'right',
	    		                			allowBlank: false,
	    		                			editable: false,
	    		                			params:{
	    		                				searchType: 'CMDT'
	    		                			}
	    								},{
	    									xtype: 'textfield',
	    									reference:'ctlCommodityNm',
	    									margin: '0 0 0 5',
	    									editable: false,
	    									flex: 1,
	    									bind:{
	    										value : '{theMain.cmdtcdnm}'
	    									}
	    								}
                                    ]
                                },
                                {
			                		xtype: 'container',
			                		flex: 1,
			                		layout:{
			                			type: 'hbox',
			                			align: 'stretch'
			                		},
			                		defaults: {
			                			margin: '0 0 0 5',
			                			labelAlign: 'right',
			                			labelWidth: 115
	    			                },
			                		items:[
			                			{
	    									xtype: 'cmmcdfield',
	    									fieldLabel: ViewUtil.getLabel('deliveryOrderPackageType'),
	    									reference: 'ctlTypeOfPackage',
	    									name: 'pkgtpcd',
	    									width: 215,
	    		                            bind:{
	    		                            	value : '{theMain.pkgtpcd}',
	    		                            },
	    		                            labelAlign: 'right',
	    		                            allowBlank: false,
	    		                            editable: false,
	    		                            fieldStyle:'text-transform:uppercase',
	    		                            params:{
	    		                            	searchLcd	: CodeConstants.LCD_MOST,
	    		                            	searchMcd	: CodeConstants.MCD_MT_PKGTP,
	    	        	   						searchType	: 'COMM'
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
		                        }
//                                {
//                                    xtype: 'container',
//                                    defaults: {
//                                        margin: '0 0 0 5',
//                                        labelAlign: 'right',
//                                        labelWidth: 115
//                                    },
//                                    layout: {
//                                        type: 'hbox',
//                                        align: 'stretch'
//                                    },
//                                    items: [
//                                    	{
//                                    		xtype: 'textfield',
//                                            fieldLabel: ViewUtil.getLabel('deliveryOrderPackageType'),
//                                            width: 184,
//                                            reference:'ctlTypeOfPackage',
//                                            name: 'pkgtpcd',
//    	                                    bind: '{theMain.pkgtpcd}',
//    	                                    fieldStyle:'text-transform:uppercase',
//    	                                    editable : false,
//                                        },{
//        		                            xtype: 'textfield',
//        		                            flex: 1,
//        		                            margin: '0 0 0 5',
//        		                            padding: '',
//        		                            labelAlign: 'right',
//        		                            reference: 'ctlPkgTpNm',
//        		                            bind: '{theMain.pkgtpnm}',
//        		                            editable : false,
//        		                        }
//                                    ]
//                                }
                                ,{
                                    xtype: 'textfield',
                                    fieldLabel: ViewUtil.getLabel('cargoMark'),
                                    name: 'pkgmark',
                                    bind: '{theMain.markNo}',
									editable : true
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: ViewUtil.getLabel('hsCode'),
                                    name: 'hscd',
                                    bind: '{theMain.hscd}',
									editable : false
                                },{
                                    xtype: 'container',
                                    defaults: {
            		                	margin: '0 0 -5 0',
            		                	padding: '0 0 0 10',
                                        flex: 1,
                                    },
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                    	{ xtype: 'component', flex: 1 },
                                    	{
                                            xtype: 'checkboxfield',
                                            boxLabel: ViewUtil.getLabel('nilMarks'),
                                            reference: 'refNilMarks',
                                            labelStyle: "color:blue;font-weight:bold;",
                                            name: 'nilmarks',
                                            bind: '{theMain.nilmarks}',
                                            inputValue: 'Y',
        			                        uncheckedValue: 'N',
        			                        checked: false
                                        },
        								{
        									xtype: 'checkboxfield',
        									boxLabel: ViewUtil.getLabel('projectCargo'),
        									reference: 'refProjectCargo',
											bind: '{theMain.projectCargo}',
											inputValue: 'Y',
					                        uncheckedValue: 'N',
					                        checked:false,
        			                        disabled: true
        								}
                                    ]
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
                                    hidden: true,
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
	    		                            xtype: 'portcodefield',
	    		                            fieldLabel: ViewUtil.getLabel('finalDes'),
	    		                            reference:'ctlFinalDes',
	    		                            name: 'dofnlportcd',
	    		                            width: 215,
//	    		                            flex: 2,
	    									bind:{
	    										value: '{theMain.dofnlportcd}',
	    									},
	    									fieldStyle:'text-transform:uppercase',
	    		                        },{
	    									xtype: 'textfield',
	    									reference:'ctlFinalDesNm',
	    									margin: '0 0 0 5',
	    									flex: 1,
	    									bind:{
	    										value: '{theMain.dofnlportcdnm}'
	    									},
	    									editable : false,
	    								}
                                    ]
                                },{
                                	xtype: 'textfield',
                                    fieldLabel: ViewUtil.getLabel('fzTypeOfPack'),
                                    reference: 'fzTypeOfPackage',
                                    bind: '{theMain.fzippkgtpcd}',
                                    editable : false,
                                },{
        		                	xtype:'container',
        		                	flex:1,
        		                	padding: '0 0 0 120',
        		                	margin: '0 0 -5 0',
        							items:[
        								{
        									xtype: 'checkboxfield',
        									boxLabel: ViewUtil.getLabel('additionalLoading'),
        									reference: 'refAdditionalChk',
											bind: '{theMain.additionalChk}',
											inputValue: 'Y',
					                        uncheckedValue: 'N',
					                        hidden: true,
					                        checked:false
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
                            reference:'refFsDirect', //Fs = fieldset
                            layout: {
                                type: 'hbox'
                            },
                            disabled: false,
                            defaults: {
                                labelAlign: 'right',
                                labelWidth: 100,
                                margin: '2 5 0 0'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    margin : '25 0 0 0',
                                    layout: { 
                                    	type: 'vbox',
                                    	align: 'stretch'
                                    },
                                    defaults: {
                                        labelAlign: 'right',
                                        labelWidth: 80,
                                        margin: '2 0 0 0'
                                    },
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
    	    	    						readOnly: true,
    	    	                            hidden: true,
	                                    },{
		                                    xtype: 'container',
		                                    flex: 1,
		                                    defaults: {
		                                        labelAlign: 'right',
		                                        labelWidth: 90
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
		    	                                    bind: '{theMain.doDMt}',
		    	                                    maskRe: /[0-9.]/,
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999.999,
		    	    	                            decimalPrecision: 3,
		    	    	                            allowDecimals: true,
		    	    	    						allowNegative: false,
		    	    	    						width: 180,
		    	    	    						readOnly: true
		                                        }
		                                    ]
		                                },{
		                                    xtype: 'container',
		                                    defaults: {
		                                        labelAlign: 'right',
		                                        labelWidth: 90
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
		    	                                    bind: '{theMain.doDM3}',
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999.999,
		    	    	                            decimalPrecision: 3,
		    	    	                            allowDecimals: true,
		    	    	    						allowNegative: false,
		    	    	    						width: 180,
		    	    	    						readOnly: true
		                                        }
		                                    ]
		                                },{
		                                    xtype: 'container',
		                                    defaults: {
		                                        labelAlign: 'right',
		                                        labelWidth: 90
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
		    	                                    bind: '{theMain.doDQty}',
//		    	                                    fieldStyle: 'background-color:#60ec08;background-image:none',
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999,
		    	    	                            decimalPrecision: 0,
		    	    	                            allowDecimals: false,
		    	    	    						allowNegative: false,
		    	    	    						listeners: {
//		    	    	    							change:{
//		    	    	    								fn: 'validateAmount',
//		    	    	    							} 
		    	    	    						},
		    	    	    						width: 180,
		    	    	    						readOnly: true
		                                        },
		                                    ]
		                                }
		                            ]
                                },
                                {
                                    xtype: 'fieldset',
                                    margin : '0 0 0 10',
                                    title: 'Vessel',
                                    layout: { 
                                    	type: 'vbox',
                                    	align: 'stretch'
                                    },
                                    defaults: {
                                        labelAlign: 'left',
                                        labelWidth: 60
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
		    	                                    reference:'ctlDoVslDmt',
		    	                                    bind: '{theMain.doDVslMt}',
		    	                                    maskRe: /[0-9.]/,
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999.999,
		    	    	                            decimalPrecision: 3,
		    	    	                            allowDecimals: true,
		    	    	    						allowNegative: false,
		    	    	    						width: 150,
		    	    	    						labelWidth: 30,
		    	    	    						listeners:{
		    	    	    							change: 'onChangeMtDirectField'
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
		    	                                    reference:'ctlDoVslDm3',
		    	                                    bind: '{theMain.doDVslM3}',
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999.999,
		    	    	                            decimalPrecision: 3,
		    	    	                            allowDecimals: true,
		    	    	    						allowNegative: false,
		    	    	    						width: 150,
		    	    	    						labelWidth: 30,
		    	    	    						listeners: {
		    	    	    							change: 'onChangeM3DirectField'
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
		    	                                    reference:'ctlDoVslDQty',
		    	                                    bind: '{theMain.doDVslQty}',
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999,
		    	    	                            decimalPrecision: 0,
		    	    	                            allowDecimals: false,
		    	    	    						allowNegative: false,
		    	    	    						width: 150,
		    	    	    						labelWidth: 30,
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
                                    margin : '0 0 0 10',
                                    title: 'Lorry',
                                    layout: { 
                                    	type: 'vbox',
                                    	align: 'stretch'
                                    },
                                    defaults: {
                                        labelAlign: 'left',
                                        labelWidth: 60
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
		    	                                    reference:'ctlDoLorryDmt',
		    	                                    bind: '{theMain.doDLrMt}',
		    	                                    maskRe: /[0-9.]/,
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999.999,
		    	    	                            decimalPrecision: 3,
		    	    	                            allowDecimals: true,
		    	    	    						allowNegative: false,
		    	    	    						width: 150,
		    	    	    						labelWidth: 30,
		    	    	    						listeners:{
		    	    	    							change: 'onChangeMtDirectField'
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
		    	                                    reference:'ctlDoLorryDm3',
		    	                                    bind: '{theMain.doDLrM3}',
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999.999,
		    	    	                            decimalPrecision: 3,
		    	    	                            allowDecimals: true,
		    	    	    						allowNegative: false,
		    	    	    						width: 150,
		    	    	    						labelWidth: 30,
		    	    	    						listeners: {
		    	    	    							change: 'onChangeM3DirectField'
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
		    	                                    reference:'ctlDoLorryDQty',
		    	                                    bind: '{theMain.doDLrQty}',
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999,
		    	    	                            decimalPrecision: 0,
		    	    	                            allowDecimals: false,
		    	    	    						allowNegative: false,
		    	    	    						width: 150,
		    	    	    						labelWidth: 30,
		    	    	    						listeners: {
		    	    	    							change: 'onChangeDQtyLorryField'
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
                            margin: '0 5 0 0',
                            reference:'refFsInDirect',
                            layout: {
                                type: 'hbox'
                            },
                            height: 158,
                            disabled: false,
                            flex: 1,
                            defaults: {
                                labelAlign: 'right',
                                labelWidth: 100,
                                margin: '2 0 0 0'
                            },
                            items: [
                            	{    
                            		xtype: 'container',
                                    margin : '15 0 0 130',
                                    layout: { 
                                    	type: 'vbox',
                                    	align: 'stretch'
                                    },
                                    defaults: {
                                        labelAlign: 'right',
                                        labelWidth: 80,
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
		                            		readOnly: true,
		                            		hidden: true,
		                            	},{
		                            		xtype: 'container',
		                            		defaults: {
		                            			labelAlign: 'right',
		                            			margin:'2 0 0 0',
		                            			labelWidth: 90
		                            		},
		                            		flex: 1,
		                            		margin:'0 0 0 0',
		                            		layout: {
		                            			type: 'hbox'
		                            		},
		                            		items: [
		                            			{
		                            				xtype: 'numberfield',
		                            				fieldLabel: ViewUtil.getLabel('grossWeight'),
		                            				reference:'ctlImt',
		                            				bind: '{theMain.doIMt}',
		                            				maskRe: /[0-9.]/,
		                            				minValue: 0,
		                            				maxValue:999999999999999.999,
		                            				decimalPrecision: 3,
		                            				allowDecimals: true,
		                            				allowNegative: false,
		                            				readOnly: false,
		                            				width: 300
		                            			}
		                            			]
		                            	},{
		                            		xtype: 'container',
		                            		margin:'0 0 0 0',
		                            		defaults: {
		                            			labelAlign: 'right',
		                            			margin:'2 0 0 0',
		                            			labelWidth: 90
		                            		},
		                            		flex: 1,
		                            		layout: {
		                            			type: 'hbox'
		                            		},
		                            		items: [
		                            			{
		                            				xtype: 'numberfield',
		                            				fieldLabel: ViewUtil.getLabel('measurement'),
		                            				reference:'ctlIm3',
		                            				name: 'im3',
		                            				bind: '{theMain.doIM3}',
		                            				name: 'grMsrmt',
		   	                                    	// fieldStyle: 'background-color:#60ec08;background-image:none',
		                            				minValue: 0,
		                            				maxValue:999999999999999.999,
		                            				decimalPrecision: 3,
		                            				allowDecimals: true,
		                            				allowNegative: false,
		                            				readOnly: false,
		                            				width: 300
		                            			}
		                            			]
		                            	},{
		                            		xtype: 'container',
		                            		defaults: {
		                            			labelAlign: 'right',
		                            			margin:'2 0 0 0',
		                            			labelWidth: 90
		                            		},
		                            		margin:'0 0 0 0',
		                            		flex: 1,
		                            		layout: {
		                            			type: 'hbox'
		                            		},
		                            		items: [
		                            			{
		                            				xtype: 'numberfield',                 
		                            				fieldLabel: ViewUtil.getLabel('quantity'),
		                            				reference:'ctlIQty',
		                            				name: 'iqty',
		                            				bind: '{theMain.doIQty}',
		   	                                    	// fieldStyle: 'background-color:#60ec08;background-image:none',
		                            				minValue: 0,
		                            				maxValue:999999999999999,
		                            				decimalPrecision: 0,
		                            				allowDecimals: false,
		                            				allowNegative: false,
		                            				listeners: {
		    	    	    							change: 'onChangeQtyIndirectField'
		                            				},
		                            				readOnly: false,
		                            				width: 300
		                            			}
		                            			]
		                            	}
		                            	]
                            	},
                            	{
                                    xtype: 'fieldset',
                                    margin : '0 0 0 10',
                                    title: 'Vessel',
                                    hidden: true,
                                    layout: { 
                                    	type: 'vbox',
                                    	align: 'stretch'
                                    },
                                    defaults: {
                                        labelAlign: 'left',
                                        labelWidth: 60
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
		    	                                    reference:'ctlDoVslImt',
		    	                                    bind: '{theMain.doIVslMt}',
		    	                                    maskRe: /[0-9.]/,
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999.999,
		    	    	                            decimalPrecision: 3,
		    	    	                            allowDecimals: true,
		    	    	    						allowNegative: false,
		    	    	    						width: 150,
		    	    	    						labelWidth: 30,
//		    	    	    						listeners: {
//		    	    	    							change: 'onChangeMtIndirectField'
//		    	    	    						}
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
		    	                                    reference:'ctlDoVslIm3',
		    	                                    bind: '{theMain.doIVslM3}',
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999.999,
		    	    	                            decimalPrecision: 3,
		    	    	                            allowDecimals: true,
		    	    	    						allowNegative: false,
		    	    	    						width: 150,
		    	    	    						labelWidth: 30,
//		    	    	    						listeners: {
//		    	    	    							change: 'onChangeM3IndirectField'
//		    	    	    						}
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
		    	                                    reference:'ctlDoVslIQty',
		    	                                    bind: '{theMain.doIVslQty}',
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999,
		    	    	                            decimalPrecision: 0,
		    	    	                            allowDecimals: false,
		    	    	    						allowNegative: false,
		    	    	    						width: 150,
		    	    	    						labelWidth: 30,
//		    	    	    						listeners: {
//		    	    	    							change: 'onChangeIQtyVslField'
//		    	    	    						}
		                                        },
		                                    ]
		                                }
		                            ]
                                },
                                {
                                    xtype: 'fieldset',
                                    margin : '0 0 0 10',
                                    title: 'Lorry',
                                    hidden: true,
                                    layout: { 
                                    	type: 'vbox',
                                    	align: 'stretch'
                                    },
                                    defaults: {
                                        labelAlign: 'left',
                                        labelWidth: 60
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
		    	                                    reference:'ctlDoLorryImt',
		    	                                    bind: '{theMain.doILrMt}',
		    	                                    maskRe: /[0-9.]/,
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999.999,
		    	    	                            decimalPrecision: 3,
		    	    	                            allowDecimals: true,
		    	    	    						allowNegative: false,
		    	    	    						width: 150,
		    	    	    						labelWidth: 30,
//		    	    	    						listeners: {
//		    	    	    							change: 'onChangeMtIndirectField'
//		    	    	    						}
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
		    	                                    reference:'ctlDoLorryIm3',
		    	                                    bind: '{theMain.doILrM3}',
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999.999,
		    	    	                            decimalPrecision: 3,
		    	    	                            allowDecimals: true,
		    	    	    						allowNegative: false,
		    	    	    						width: 150,
		    	    	    						labelWidth: 30,
//		    	    	    						listeners: {
//		    	    	    							change: 'onChangeM3IndirectField'
//		    	    	    						}
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
		    	                                    reference:'ctlDoLorryIQty',
		    	                                    bind: '{theMain.doILrQty}',
		    	                                    minValue: 0,
		    	    	                            maxValue:999999999999999,
		    	    	                            decimalPrecision: 0,
		    	    	                            allowDecimals: false,
		    	    	    						allowNegative: false,
		    	    	    						width: 150,
		    	    	    						labelWidth: 30,
//		    	    	    						listeners: {
//		    	    	    							change: 'onChangeIQtyLorryField'
//		    	    	    						}
		                                        },
		                                    ]
		                                }
		                            ]
                                }
                            ]
                        }
                    ]
		        },{
			    	xtype: 'container',
			    	margin: '5 0 5 5',
			    	flex: 1,
					layout: {
                    	type: 'hbox',
    	                pack: 'end'
                    },
					items:[
						{
                        	xtype: 'textfield',
            				reference: 'refTxtDORmk',
            				fieldLabel: ViewUtil.getLabel('rmk'),
            				bind: '{theMain.rmk}',
            				labelAlign: 'left',
            				labelWidth: 50,
            				width: 710
                        },
						{
                        	xtype: 'filefield',
            				name : 'fileUpload',
            				margin: '0 -56 0 5',
            				itemId: 'createButton',
            				id:'doFileUpload',
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
                	height: 110,
                	stateful : true,
                	usePagingToolbar : false,
                	style: {
                		borderColor: '#AAA', 
                		borderStyle: 'solid', 
                		borderWidth: 'thin'
                	},
                	stateId : 'stateDeliveryOrderUploadGrid',
                	plugins: [
                		'gridexporter',
                		'gridfilters',
                		'clipboard'
                	],
                	bind: {
                		store: '{'+me.FILE_UPLOAD_STORE_NAME+'}'
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
                		items: GridUtil.getGridColumns('DeliveryOrderFileUpload')
                	}
                }
		    ]
		});
		
		me.callParent();
	}
});