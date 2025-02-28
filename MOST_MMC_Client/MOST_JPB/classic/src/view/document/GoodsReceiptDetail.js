Ext.define('MOST.view.document.GoodsReceiptDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-goodsreceiptdetail',
	
	requires: [
	  
	],
	
	width: 1000,
	height: 730,
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	TRANSPORT_MODE_STORE: 'trasLRModeCombo',
	CONTAINER_GRID_REF_NAME: 'refGRPkgDetailGrid',				// Main Grid Name 
	CONTAINER_STORE_NAME: 'grPkgDetail',
	CONTAINER_GRID_REF_NAME: 'refGRPkgDetailGrid',
	RORO_GRID_REF_NAME: 'refROROGrid',
	RORO_STORE_NAME: 'unitList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	listeners:{
		afterrender: 'onDetailLoad'
	},
	
	confg:{
		balanceWgt: 0.0,
		balanceMsrmt: 0.0,
		balanceQty: 0.0
	},
	
	
	config: {
		recvData : null
	},
	
	initComponent: function() {
		var me = this;
		Ext.apply(this, {
			xtype:'form',
			defaults:{
				margin: '5 5 0 5' // top, right, bottom, left
			},
			layout : {
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
                        xtype: 'fieldset',
                        title: ViewUtil.getLabel('shippingNote'),
                        margin: '0 0 0 0',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                        	{
	                    		xtype:'textfield',
	        					fieldLabel: ViewUtil.getLabel('sNNo'),
	        					editable:false,
	           					labelWidth: 50,
	           					name: 'shipgNoteNo',
	        					bind: '{theMain.shipgNoteNo}',
	                    	}
                        ]
                    },{
                        xtype: 'fieldset',
                        title: ViewUtil.getLabel('vslInfo'),
                        margin: '0 0 0 5',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        flex:1,
                        items: [
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'hbox',
                                    align:'stretch'
                                },
                                margin: '0 0 2 0',
                                defaults:{
            						margin: '0 5 0 0',
            						labelAlign: 'right'
            					},
            					flex: 1,
                                items: [
                                    {
                                        xtype: 'textfield',
                                        flex: 1,
                                        fieldLabel: ViewUtil.getLabel('scn'),
                                        editable:false,
                                        name: 'scn',
                                        bind: '{theMain.scn}',
                                        labelWidth: 80
                                    },
                                	{
    									xtype:'textfield',
    									editable: false,
    									name: 'eta',
    									flex: 1,
    									fieldLabel: ViewUtil.getLabel('eta'),
    									bind: '{theMain.eta}',
    									labelWidth: 50
    								},{
                                        xtype: 'textfield',
                                        flex: 1,
                                        name: 'storLoc',
                                        editable:false,
                                        fieldLabel: ViewUtil.getLabel('storeLoc'),
                                        labelWidth: 110
                                    }
                                ]
                            },{
                                xtype: 'container',
                                layout: {
                                    type: 'hbox',
                                    align:'stretch'
                                },
                                margin: '0 0 2 0',
                                defaults:{
            						margin: '0 5 0 0',
            						labelAlign: 'right'
            					},
            					flex: 1,
                                items: [
                                    {
                                        xtype: 'textfield',
                                        flex: 1,
                                        fieldLabel: ViewUtil.getLabel('vslCallId'),
                                        editable:false,
                                        name: 'vslCallId',
                                        bind: '{theMain.vslCallId}',
                                        labelWidth: 80
                                    },
                                	{
    									xtype:'textfield',
    									editable: false,
    									name: 'etb',
    									flex: 1,
    									fieldLabel: ViewUtil.getLabel('etb'),
    									bind: '{theMain.etb}',
    									labelWidth: 50
    								},{
                                        xtype: 'textfield',
                                        flex: 1,
                                        fieldLabel: ViewUtil.getLabel('berLoc'),
                                        editable:false,
                                        name: 'berthLoc',
                                        bind: '{theMain.berthLoc}',
                                        labelWidth: 110
                                    }
                                ]
                            },{
                                xtype: 'container',
                                layout: {
                                    type: 'hbox'
                                },
                                flex: 1,
                                defaults:{
            						margin: '0 5 0 0',
            						labelAlign: 'right'
            					},
                                items: [
                                    {
                                        xtype: 'textfield',
                                        flex: 1,
                                        fieldLabel: ViewUtil.getLabel('arrvSaId'),
                                        editable:false,
                                        name: 'arrvSaId',
                                        bind: '{theMain.arrvSaId}',
                                        labelWidth: 80
                                    },
                                    {
                                        xtype: 'textfield',
                                        flex: 1,
                                        name: 'depSaId',
                                        editable:false,
                                        bind: '{theMain.depSaId}',
                                        fieldLabel: ViewUtil.getLabel('deprSaId'),
                                        labelWidth: 80
                                    },
                                    {
                                        flex: 1
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
			{ // Row : 2
				xtype: 'fieldset',
				margin : '5 5 5 5',
				layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'container',
                    defaults: {
                        margin: '2 0 0 5',
                        labelAlign: 'right',
                        labelWidth:95
                    },
                    layout: {
                        type: 'hbox',
                    },
                    items: [{
                    	xtype:'textfield',
    					fieldLabel: ViewUtil.getLabel('gRNo'),
    					editable:false,
    					reference: 'ctlGdsrecvNo',
    					labelStyle: "color:red;font-weight:bold;",
       					labelWidth: 80,
    					width: 215,
    					name: 'gdsRecvNo',
    					bind: '{theMain.gdsRecvNo}',
                    },{
                    	xtype:'textfield',
    					fieldLabel: ViewUtil.getLabel('operationMode'),
    					editable:false,
    					labelStyle: "color:red;font-weight:bold;",
       					labelWidth: 120,
    					width: 270,
    					name: 'delvTpCdNm',
    					bind: '{theMain.tsptTpCdNm}',
                    },{
						xtype: 'checkboxfield',
						margin: '0 0 0 30',
						boxLabel: ViewUtil.getLabel('vslpatiDomestic'),
						reference: 'refDomesticChk',
						bind: '{theMain.domesticChk}',
						inputValue: 'Domestic',
                        uncheckedValue: 'N',
                        disabled: true,
                        checked:false
					},{
						xtype: 'label',
						margin: '10 0 0 30',
						reference: 'refTransit',
						style: "color:blue;font-weight:bold;",
						hidden: true,
						bind: '{theMain.catgCdNm}'
					}]
	            }]
			},{
                xtype: 'tabpanel',
                defaults: {
                    margin: '0 0 0 0',
                },
                margin:'0 5 2 5',
                flex: 1,
                items: [{
                	xtype:'panel',
                	title: ViewUtil.getLabel('cargoInfo'),
                	defaults: {
                		labelAlign: 'right',
                        margin: '2 0 0 0'// top, right, bottom, left
                    },
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items:[{	//Shipping Note
                        xtype: 'container',
                        flex: 1,
                        defaults: {
                            labelAlign: 'right',
                            margin: '2 0 0 0',
                            labelWidth: 150
                        },
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [{
                        	xtype: 'label',
                            html: ViewUtil.getLabel('shippingNote'),
                            margin: '0 0 0 50',
                            style: 'text-align:left;font-weight: bold; color: blue;',
                            text: ''
                        },{
                            xtype: 'textfield',
                            width: 250,
                            fieldLabel: ViewUtil.getLabel('SNLBookingNo'),
                            name: 'bookingNo',
                            bind: '{theMain.mfDocId}',
							editable : false
                        },{
                            xtype: 'textfield',
                            width: 250,
                            fieldLabel: ViewUtil.getLabel('modeOfOperation'),
                            name: 'tsptTpCdNm',
                            bind: '{theMain.tsptTpCdNm}',
							editable : false
                        },{
                            xtype: 'container',
                            width: 100,
                            defaults: {
                                margin: '0 0 0 5',
                                labelAlign: 'right',
                                labelWidth: 145,
                                width: 270,
                            },
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [{
                            	xtype: 'textfield',
                                fieldLabel: ViewUtil.getLabel('grossWeight'),
                                name: 'cgWgt',
                                bind: '{theMain.cgWgt}',
								editable : false
                            },{
                                xtype: 'label',
                                margin: '2 0 0 5',
                                width: 100,
                                html: ViewUtil.getLabel('mT'),
                            }]
                        },{
                            xtype: 'container',
                            width: 100,
                            defaults: {
                                margin: '0 0 0 5',
                                labelAlign: 'right',
                                labelWidth: 145,
                                width: 270,
                            },
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [{
                            	xtype: 'textfield',
                                fieldLabel: ViewUtil.getLabel('measurement'),
                                name: 'measurement',
                                bind: '{theMain.measurement}',
								editable : false
                            },{
                                xtype: 'label',
                                margin: '2 0 0 5',
                                width: 50,
                                html: ViewUtil.getLabel('m3'),
                            }]
                        },{
                            xtype: 'textfield',
                            width: 250,
                            fieldLabel: ViewUtil.getLabel('quantity'),
                            name: 'pkgQty',
                            bind: '{theMain.pkgQty}',
							editable : false
                        },{
                            xtype: 'cmmcdfield',
                            width: 250,
                            fieldLabel: ViewUtil.getLabel('packageTp'),
                            reference: 'ctlTypeofPackage',
                            bind:{
                            	value : '{theMain.pkgTpCd}',
                            	cgTpCd: '{theMain.cgTpCd}',
                				cmdtGrpCd: '{theMain.cmdtGroupCd}',
                				cmdtCd: '{theMain.cmdtCd}'
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
                            width: 250,
                            fieldLabel: ViewUtil.getLabel('fdest'),
                            name: 'portOfDis',
                            bind: '{theMain.portOfDis}',
							editable : false
                        },{
                            xtype: 'textfield',
                            width: 250,
                            fieldLabel: ViewUtil.getLabel('cargoTp'),
                            name: 'cgTpCdNm',
                            bind: '{theMain.cgTpCdNm}',
							editable : false
                        },{
                            xtype: 'textfield',
                            width: 250,
                            fieldLabel: ViewUtil.getLabel('delvMode'),
                            name: 'delvTpCdNm',
                            bind: '{theMain.delvTpCdNm}',
							editable : false
                        }]
                    },{	//Goods Receipt
                        xtype: 'container',
                        flex: 1,
                        defaults: {
                            labelAlign: 'right',
                            margin: '2 0 0 0',
                            labelWidth: 150
                        },
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                        	{
	                        	xtype: 'label',
	                        	margin: '0 0 0 50',
	                            html: ViewUtil.getLabel('goodsReceipt'),
	                            style: 'text-align:left;font-weight: bold; color: blue;',
	                            text: ''
	                        },
	                        {
	                            xtype: 'combo',
	                            width: 250,
	                            name: 'grTsptTpCd',
	                            fieldLabel: ViewUtil.getLabel('modeOfTransport'),
	                            queryMode: 'local',
	                            reference:'refCboModeOfTransport',
	          					bind: {
	          						value: '{theMain.grTsptTpCd}',
	                                store: '{' + me.TRANSPORT_MODE_STORE + '}'
	                            },
	            	    		allowBlank:false,
	            	    		emptyText: 'Select',
	           					displayField: 'scdNm',
	           					valueField: 'scd',
								editable : false,
								listeners: {
				    				select: 'onSelectModeOfTransCombo'
				    			}
	                        },
//	                        {
//	                            xtype: 'textfield',
//	                            width: 250,
//	                            fieldLabel: ViewUtil.getLabel('tsptrOrigin'),
//	                            name: 'tsptr',
//	                            bind: '{theMain.tsptr}',
//								editable : false
//	                        },
	                        {
	                        	xtype:'partnercdformultifield',
	                        	width: 250,
	        					fieldLabel: ViewUtil.getLabel('tsptrOrigin'),
	        					reference:'ctlTsptrComp',
	                            bind: {
	                            	value : '{theMain.tsptr}'
	                            },
	                            readOnly:true,
	                            labelAlign: 'right',
	                            fieldStyle : 'text-transform: uppercase',
	    	   					params:{
	    	   						ptnrType: CodeConstants.CM_PTNRTP_TRK
	    	   					}
	                    	},
	                    	{
	                            xtype: 'container',
	                            width: 100,
	                            defaults: {
	                                margin: '0 0 0 5',
	                                labelAlign: 'right',
	                                labelWidth: 145
	                            },
	                            layout: {
	                                type: 'hbox',
	                                align: 'stretch'
	                            },
	                            items: [{
	                            	xtype: 'numberfield',
	                            	reference: 'refWeight',
	                                width: 280,
	                                fieldLabel: ViewUtil.getLabel('weight'),
	                                minValue: 0,
		                            maxValue:999999999999999.999,
		                            decimalPrecision: 3,
		                            allowDecimals: true,
		    						allowNegative: false,
	                                name: 'grWgt',
	                                bind: '{theMain.grWgt}',
	                                fieldStyle: 'background-color:#60ec08;background-image:none',
									editable : true,
//									listeners: {
//										change: 'onChangeMtM3',
//										//blur : 'onMtOver'
//						            }
	                            },{
	                                xtype: 'label',
	                                margin: '2 0 0 5',
	                                width: 50,
	                                html: ViewUtil.getLabel('mT'),
	                            }]
	                        },
	                        {
	                            xtype: 'container',
	                            width: 100,
	                            defaults: {
	                                margin: '0 0 0 5',
	                                labelAlign: 'right',
	                                labelWidth: 145
	                            },
	                            layout: {
	                                type: 'hbox',
	                                align: 'stretch'
	                            },
	                            items: [{
	                            	xtype: 'numberfield',
	                                width: 280,
	                                reference: 'refM3',
	                                fieldLabel: ViewUtil.getLabel('measurement'),
	                                minValue: 0,
		                            maxValue:999999999999999.999,
		                            decimalPrecision: 3,
		                            allowDecimals: true,
		    						allowNegative: false,
	                                name: 'grMsrmt',
	                                bind: '{theMain.grMsrmt}',
	                                fieldStyle: 'background-color:#60ec08;background-image:none',
//									listeners: {
//										change: 'onChangeMtM3',
//										//blur : 'onM3Over'
//						            }
	                            },{
	                                xtype: 'label',
	                                margin: '5 0 0 5',
	                                width: 50,
	                                html: ViewUtil.getLabel('m3'),
	                            }]
	                        },
	                        {
	                            xtype: 'container',
	                            width: 100,
	                            defaults: {
	                                margin: '0 0 0 5',
	                                labelAlign: 'right',
	                                labelWidth: 145
	                            },
	                            layout: {
	                                type: 'hbox',
	                                align: 'stretch'
	                            },
	                            items: [{
	                            	xtype: 'numberfield',
	                                width: 280,
	                                reference: 'refPkgQty',
	                                fieldLabel: ViewUtil.getLabel('quantity'),
	                                minValue: 0,
		                            maxValue:99999999,
		                            allowDecimals: false,
		    						allowNegative: false,
	                                name: 'grQty',
	                                bind: {
	                                	value: '{theMain.grQty}',
	                                },
	                                fieldStyle: 'background-color:#60ec08;background-image:none',
									editable : true,
									listeners: {
										change: 'onChangeMtM3',
										//blur : 'onQtyOver'
						            }
	                            },{
	                                xtype: 'label',
	                                margin: '2 0 0 5',
	                                width: 50,
	                                html: ''
	                            }]
	                        },
	                        {
	                            xtype: 'textfield',
	                            width: 250,
	                            fieldLabel: ViewUtil.getLabel('cargoTp'),
	                            name: 'cgTpCdNm',
	                            bind: '{theMain.cgTpCdNm}',
								editable : false
	                        },
	                        {
	                            xtype: 'textfield',
	                            width: 250,
	                            fieldLabel: ViewUtil.getLabel('commodity'),
	                            name: 'cmdtCd',
	                            bind: '{theMain.cmdtCd}',
								editable : false
	                        },
	                        {
	                            xtype: 'datetimefield',
	                            reference: 'ctlGrValidDate',
	                            width: 250,
	                            fieldLabel: ViewUtil.getLabel('grValidDate'),
	                            editable : false,
	                            readOnly : false,
	                            //bind: '{theMain.validDate}',
	                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
	                        },
	                        {
                            	xtype: 'datetimefield',
                            	width: 250,
                                reference: 'ctlETAFromDt',
                                fieldLabel: ViewUtil.getLabel('expLorryArr'),
                                //bind: '{theMain.estArrvDt}',
                                editable : false,
	                            readOnly : false,
	                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
	                            allowBlank: false
                            },
	                        {
	                            xtype: 'checkboxfield',
	                            width: 250,
	                            fieldLabel: ViewUtil.getLabel('spareCargo'),
	                            labelStyle: "font-size:16;font-weight:bold;",
	                            inputValue: 'Y',
	                            uncheckedValue: 'N',
	                            name: 'spCargoChk',
	                            bind: '{spCargoChecked}',
								listeners: {
				    				change: 'onSquareCargoChange'
				    			},
				    			hidden: true,//ADP removed
	                        },
	                        {
	                            xtype: 'checkboxfield',
	                            width: 250,
	                            fieldLabel: ViewUtil.getLabel('addCargo'),
	                            labelStyle: "font-size:16;font-weight:bold;",
	                            inputValue: 'Y',
	                            uncheckedValue: 'N',
	                            name: 'adCargoChk',
	                            bind: '{adCargoChecked}',
	                            listeners: {
				    				change: 'onAddCargoChange'
				    			},
				    			hidden: true, //ADP removed
	                        },
	                        {
			                	xtype:'container',
			                	padding: '0 0 0 145',
								items:[{
									xtype: 'checkboxfield',
									boxLabel: ViewUtil.getLabel('notToWgt'),
									reference: 'refWeightChk',
									bind: '{theMain.wgtChk}',
									inputValue: 'N',
			                        uncheckedValue: 'Y',
			                        disabled: true,
			                        checked:false
								}]
	    					},
	    					{
			                	xtype:'container',
			                	padding: '0 0 0 145',
			                	margin: '-15 0 0 0',
								items:[{
									xtype: 'checkboxfield',
									boxLabel: ViewUtil.getLabel('projectCargo'),
									reference: 'refProjectCargo',
									bind: '{theMain.projectCargo}',
									inputValue: 'Y',
			                        uncheckedValue: 'N',
			                        checked:false,
			                        disabled: true
								}]
	    					},
	    					{
	    						xtype:'container',
			                	padding: '0 0 0 145',
			                	margin: '-15 0 0 0',
								items:[{
									xtype: 'checkboxfield',
									boxLabel: ViewUtil.getLabel('returnToshipper'),
									reference: 'ctlReturnToShipper',
									inputValue: 'Y',
			                        uncheckedValue: 'N',
			                        name: 'RTS',
			                        listeners: {
					    				change: 'onReturnToShipperCheck'
					    			},
								}]
	                           
	                        },
	                        {
			   					reference: 'ctlWarehouseCombo',
			   					xtype: 'combo',
			   					fieldLabel: ViewUtil.getLabel('consolDeconsolWh'),
			   					queryMode: 'local',
			   					bind: {
			    	    			store: '{warehouseRtsList}'
			    	    		},
			   					displayField: 'rtsLocNm',
			   					valueField: 'rtsLocId',
			   					forceSelection: true,
			   					emptyText:'Selected',
			   					editable: false,
			   					hidden: true,
			   					listeners: {
				    				change: 'onSelectWhRtsCombo'
				    			},
			   				},
			   				{
	                            xtype: 'textfield',
	                            reference: 'ctlTxtLocationRTS',
	                            fieldLabel: ViewUtil.getLabel('whId'),
								editable : false,
								hidden: true
	                        },
	                        {
	                            xtype: 'textfield',
	                            reference: 'ctlBalWgtLocRTS',
	                            fieldLabel: ViewUtil.getLabel('balmt'),
								editable : false,
								hidden: true
	                        }
    					]
                    },{	//Others
                        xtype: 'container',
                        flex: 1,
                        defaults: {
                            labelAlign: 'right',
                            margin: '2 0 0 0',
                            labelWidth: 150
                        },
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [{
                        	xtype: 'label',
                            html: ViewUtil.getLabel('remarks'),
                            margin: '0 0 0 20',
                            style: 'text-align:left;',
                            text: ''
                        },{
                            xtype: 'textareafield',
                            margin: '0 0 0 20',
                            width: 250,
                            name: 'grRmk',
                            bind: '{theMain.grRmk}',
                            fieldStyle: 'background-color:#60ec08;background-image:none',
							editable : true
                        },{
                        	xtype: 'label',
                        	margin: '5 0 0 20',
                            html: ViewUtil.getLabel('descOfGoods'),
                            style: 'text-align:left;',
                        },{
                            xtype: 'textareafield',
                            margin: '0 0 0 20',
                            width: 250,
                            name: 'snRmk',
                            bind: '{theMain.snRmk}',
							editable : false
                        },{
                        	xtype: 'label',
                            html: ViewUtil.getLabel('cargoBalance'),
                            margin: '5',
                            style: 'text-align:left;font-weight: bold; color: blue;',
                            text: ''
                        },{
                            xtype: 'container',
                            width: 100,
                            defaults: {
                                margin: '0 0 0 5',
                                labelAlign: 'right',
                                labelWidth: 120
                            },
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [{
                            	xtype: 'textfield',
                                fieldLabel: ViewUtil.getLabel('balance'),
                                editable : false,
                                reference:'refTxtBalWgt',
	                        	name: 'sumMt'
                            },{
                                xtype: 'label',
                                margin: '2 0 0 5',
                                width: 100,
                                html: ViewUtil.getLabel('mT'),
                            }]
                        },{
                            xtype: 'container',
                            width: 100,
                            defaults: {
                                margin: '0 0 0 5',
                                labelAlign: 'right',
                                labelWidth: 120
                            },
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [{
                        		xtype: 'label',
                                width: 120,
                                html: ''
                            },{
                            	xtype: 'textfield',
                                editable : false,
	                        	name: 'sumM3',
	                        	reference:'refTxtBalMsrmt',
                            },{
                                xtype: 'label',
                                margin: '2 0 0 5',
                                width: 100,
                                html: ViewUtil.getLabel('m3'),
                            }]
                        },{
                            xtype: 'container',
                            width: 100,
                            defaults: {
                                margin: '0 0 0 5',
                                labelAlign: 'right',
                                labelWidth: 120
                            },
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [{
                        		xtype: 'label',
                                width: 120,
                                html: ''
                            },{
                            	xtype: 'textfield',
                                editable : false,
                                reference:'refTxtBalQty',
	                        	name: 'sumQty'
                            },{
                                xtype: 'label',
                                margin: '2 0 0 5',
                                width: 100,
                                html: ViewUtil.getLabel('qty'),
                            }]
                        },{
    						xtype: 'checkboxfield',
    						margin: '0 0 0 130',
    						boxLabel: ViewUtil.getLabel('additionalLoading'),
    						reference: 'refAdditionalChk',
    						bind: '{theMain.additionalChk}',
    						inputValue: 'Y',
    						checkedValue: 'Y',
                            uncheckedValue: 'N',
                            checked:false
    					}]
                    }]
	            },{
	            	xtype:'panel',
	            	title: ViewUtil.getLabel('shipperConsignee'),
	            	defaults: {
	            		labelAlign: 'right',
	                    margin: '5 0 5 0'// top, right, bottom, left
	                },
	            	items:[{
	            		margin: '5 0 0 0',
	                    xtype: 'textfield',
	                    width: 1000,
	                    fieldLabel: ViewUtil.getLabel('gRShipper'),
	                    name: 'shprNm',
						bind: '{theMain.shprNm}',
						editable : false,
						labelWidth: 200
	            	},{
	                    xtype: 'textfield',
	                    width: 1000,
	                    fieldLabel: ViewUtil.getLabel('gRAddressofShipper'),
	                    name: 'shprAddr',
						bind: '{theMain.shprAddr}',
						editable : false,
						labelWidth: 200
	            	},{
	                    xtype: 'textfield',
	                    width: 1000,
	                    fieldLabel: ViewUtil.getLabel('gRConsignee'),
	                    name: 'cnsneNm',
						bind: '{theMain.cnsneNm}',
						editable : false,
						labelWidth: 200
	            	},{
	                    xtype: 'textfield',
	                    width: 1000,
	                    fieldLabel: ViewUtil.getLabel('gRAddressofConsignee'),
	                    name: 'cnsneAddr',
						bind: '{theMain.cnsneAddr}',
						editable : false,
						labelWidth: 200
	            	}]
	            },{
	            	xtype:'panel',
	            	title: 'RORO',
					reference: 'refROROTab',
	            	defaults: {
	            		labelAlign: 'right',
	                    margin: '5 0 5 0'// top, right, bottom, left
	                },
	            	items:[
	            		{
							xtype: 'tsb-datagrid',
							height: 300,
							reference: me.RORO_GRID_REF_NAME,
							usePagingToolbar : false,
							plugins: [
		    		          'gridexporter',
		    		          'gridfilters',
		    		          'clipboard'
	    		            ],
	    		            bind:{
						    	 store: '{' + me.RORO_STORE_NAME + '}'
	    		            },
	    		            selModel: {
								type: 'spreadsheet',
								cellSelect: false
	    		            },
							columns:{
								defaults: {
				            		style : 'text-align:center'
				            	},
				            	items: GridUtil.getGridColumns('dogrroroUnitGridColumns')
							}
	            		}
	            	]
	            },{
	            	xtype:'panel',
	            	title: 'Package Detail',
	            	reference: 'refDeliveryPackageDetail',
	            	defaults: {
	            		labelAlign: 'right',
	                    margin: '5 0 0 0'// top, right, bottom, left
	                },
	            	items:[{
		            xtype: 'container',
		            flex: 1,
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
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('quantity'),
									reference:'ctlPackageDetailQty',
									margin: '5 5 10 10',
									labelAlign: 'left',
									labelWidth: 80,
									fieldStyle: 'background-color:#60ec08;background-image:none',
	                        	}
						]
		                },
						{
							xtype: 'tsb-datagrid',
							flex: 1,
							height: 400,
							reference: me.CONTAINER_GRID_REF_NAME,
							usePagingToolbar : false,
							plugins: [
								'gridexporter',
								'gridfilters',
								'clipboard'
	    		            ],
	    		            bind:{
						    	 store: '{' + me.CONTAINER_STORE_NAME + '}'
	    		            },
	    		            selType: 'checkboxmodel',
	    		            selModel: {
								type: 'spreadsheet',
								cellSelect: false,
								listeners:{
									select: 'onCount',
									deselect:'onCount',
								}
	    		            },
	    		            viewConfig: {
	    		                getRowClass: function (row, index) {
	    		                	var cls = "";
	    		                    if ((row.get("gdsRecvNo") !== null && row.get("gdsRecvNo") !== "")) {
	    		                    	cls = "red-row";
	    		                    }
	    		                    return cls;
	    		                }
	    		            },
							columns:{
								defaults: {
				            		style : 'text-align:center'
				            	},
				            	items: GridUtil.getGridColumns('GoodsReceiptPackageDetail')
							}
						}]
	            	}]
	            }]
	        },{
	            xtype: 'container',
	            defaults: {
	                margin: '0 0 5 5',
	            },
	            layout: {
	                type: 'hbox',
	                align: 'stretch',
	                pack: 'end'
	            },
	            items: [{
	                xtype: 'button',
	                width: 110,
	                reference : 'ctlTruckAssignment',
	                text: ViewUtil.getLabel('truckAssignment'),
	                listeners: {
	                	click: 'openTruckAssignment'
	                }
	            },{
	                xtype: 'button',
	                width: 110,
	                reference : 'ctlSASubmit',
	                text: ViewUtil.getLabel('submit'),
	                listeners: {
	                	click: 'onSubmit'
	                }
	            },{
	                xtype: 'button',
	                width: 110,
	                reference : 'ctlClose',
	                text: ViewUtil.getLabel('close'),
	                listeners: {
	                	click: 'onClose'
	                }
	            }]
	        }]
		});
		
		me.callParent();
	}
});