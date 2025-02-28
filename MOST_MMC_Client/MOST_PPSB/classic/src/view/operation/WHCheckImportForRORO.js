Ext.define('MOST.view.operation.WHCheckImportForRORO', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-whcheckimportforroro',
	
	requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.field.Checkbox'
	],
	
	reference:'refWHCheckImportForROROPopup',
	
	width: 820,
	height: 420,
	scrollable: true,
	
	controller: 'whcheckimportforroro',
	
	viewModel: {
		type: 'whcheckimportforroro'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	config: {
		recvData : null
	},

	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items: [
				{
		            xtype: 'fieldset',
		            margin: '5 5 5 5',
		            defaults: {
		                margin: '0 5 0 0',
		                labelAlign: 'right',
		                labelWidth: 80
		            },
		            layout: {
		                type: 'hbox',
		                align: 'stretch'
		            },
		            items: [
		                {
		                    xtype: 'textfield',
		                    width: 200,
		                    reference: 'ctlVslCallId',
		                    fieldLabel: ViewUtil.getLabel('confirmLoadingJpvc'),
		                    readOnly:true,
		                    bind:'{theRRDetail.vslCallId}',
		                    readOnly:true
		                },
		                {
		                    xtype: 'textfield',
		                    width: 250,
		                    bind:'{theRRDetail.vslNm}',
		                    readOnly:true
		                }
		            ]
		        },{
		            xtype: 'fieldset',
		            margin: '0 5 5 5',
		            defaults: {
		                margin: '0 5 0 0',
		                labelAlign: 'right',
		                labelWidth: 80
		            },
		            layout: {
		                type: 'hbox',
		                align: 'stretch'
		            },
		            items: [
		                {
		                    xtype: 'textfield',
		                    width: 200,
		                    fieldLabel: ViewUtil.getLabel('confirmDischargingBlDo'),
		                    reference: 'ctlCgNo',
		                    readOnly:true,
		                    bind:'{theRRDetail.blNo}'
		                },
		                {
		                    xtype: 'textfield',
		                    width: 250,
		                    bind: {
		                    	value: '{theRRDetail.delvTpNm}'
		                    },
		                    readOnly:true
		                }
		            ]
		        },
				{
		            xtype: 'fieldset',
		            margin: '0 5 5 5',
		            defaults: {
		                margin: '0 5 0 5',
		                labelAlign: 'right',
		                layout: {
		                    type: 'vbox',
		                    align: 'stretch'
		                },
		                defaults: {
		                    margin: '0 5 2 0',
		                    labelAlign: 'right',
		                    labelWidth: 140
		                }
		            },
		            layout: {
		                type: 'hbox',
		                align: 'stretch'
		            },
		            items: [
		                {
		                    xtype: 'container',
		                    flex: 3,
		                    items: [
		                        {
		                            xtype: 'datetimefield',
		                            flex: 3,
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingStartDateTime'),
		                            reference: 'ctlWhCheckImportStartDt',
		                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									readOnly:true,
		                        },
		                        {
		                           
		                            xtype: 'datetimefield',
		                            flex: 3,
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingEndDateTime'),
		                            reference: 'ctlWhCheckImportEndDt',
		                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									readOnly:true,
		                        },
		                        
		                        {
				                    xtype: 'container',
				                    flex: 3,
				                    layout: {
				                        type: 'hbox',
				                        align: 'stretch'
				                    },
				                    defaults: {
					                    margin: '0 5 2 0',
					                    labelAlign: 'right',
					                    labelWidth: 140
					                },
				                    items: [
				                    	{
				                            xtype: 'label',
				                            style: {
				                                'text-align': 'right'
				                            },
				                            width: 140,
				                            text: ''
				                        },
				                    	{
				                            xtype: 'label',
				                            flex: 1,
				                            margin: '2 0 0 0',
				                            style: {
				                                'text-align': 'center'
				                            },
				                            text: 'Qty'
				                        },
				                        {
				                            xtype: 'label',
				                            flex: 1,
				                            margin: '2 0 0 0',
				                            style: {
				                                'text-align': 'center'
				                            },
				                            text: 'MT'
				                        },
				                        {
				                            xtype: 'label',
				                            flex: 1,
				                            margin: '2 0 0 0',
				                            style: {
				                                'text-align': 'center'
				                            },
				                            text: 'M3'
				                        },
				                    ]
		                        },
		                        
		                        //Doc Amt
		                        {
				                    xtype: 'container',
				                    flex: 3,
				                    layout: {
				                        type: 'hbox',
				                        align: 'stretch'
				                    },
				                    defaults: {
					                    margin: '0 5 2 0',
					                    labelAlign: 'right',
					                    labelWidth: 140
					                },
				                    items: [
				                    	{
				                            xtype: 'label',
				                            style: {
				                                'text-align': 'right'
				                            },
				                            width: 140,
				                            text: ViewUtil.getLabel('whCheckImportDocAmt')
				                        },
				                    	{
				                            xtype: 'textfield',
				                            flex: 1,
						                    readOnly:true,
						                    bind:'{theRRDetail.docQty}',
											maxValue: 999999,
											decimalPrecision: 3,
				                        },
				                        {
				                            xtype: 'textfield',
				                            flex: 1,
						                    readOnly:true,
											maxValue: 999999.999,
											decimalPrecision: 3,
						                    bind:'{theRRDetail.docMt}'
				                        },
				                        {
				                            xtype: 'textfield',
				                            flex: 1,
						                    readOnly:true,
											maxValue: 999999.999,
											decimalPrecision: 3,
						                    bind:'{theRRDetail.docM3}'
				                        },
				                    ]
		                        },
		                        
		                        //Buffer Amt
		                        {
				                    xtype: 'container',
				                    flex: 3,
				                    layout: {
				                        type: 'hbox',
				                        align: 'stretch'
				                    },
				                    defaults: {
					                    margin: '0 5 2 0',
					                    labelAlign: 'right',
					                    labelWidth: 140
					                },
				                    items: [
				                    	{
				                            xtype: 'label',
				                            style: {
				                                'text-align': 'right'
				                            },
				                            width: 140,
				                            text: ViewUtil.getLabel('whCheckImportBalance')
				                        },
				                    	{
				                        	xtype : 'numberfield',
				                        	reference: 'refBalanceQty',
				                        	minValue : 0,
				                        	maxValue: 999999,
				                            flex: 1,
				                            bind:'{theRRDetail.balQty}',
				                            readOnly:true
				                        },
				                        {
				                        	xtype : 'numberfield',
				                        	minValue : 0,
				                        	reference: 'refBalanceMT',
				                        	maxValue: 999999.999,
											decimalPrecision: 3,
											decimalPrecision: 3,
				                            flex: 1,
				                            bind:'{theRRDetail.balMt}',
				                            readOnly:true
				                        },
				                        {
				                        	xtype : 'numberfield',
				                        	reference: 'refBalanceM3',
				                        	minValue : 0,
				                        	maxValue: 999999.999,
											decimalPrecision: 3,
				                            flex: 1,
				                            bind:'{theRRDetail.balM3}',
											decimalPrecision: 3,
				                            readOnly:true
				                        },
				                    ]
		                        },
		                        
		                        //WH Amt
		                        {
				                    xtype: 'container',
				                    flex: 3,
				                    layout: {
				                        type: 'hbox',
				                        align: 'stretch'
				                    },
				                    defaults: {
					                    margin: '0 5 2 0',
					                    labelAlign: 'right',
					                    labelWidth: 140
					                },
				                    items: [
				                    	{
				                            xtype: 'label',
				                            style: {
				                                'text-align': 'right'
				                            },
				                            width: 140,
				                            text: ViewUtil.getLabel('whCheckImportWHAmt')
				                        },
				                    	{
											xtype : 'numberfield',
											minValue : 0,
											maxValue: 999999999,
											selectOnFocus : true,
											flex: 1,
											margin: '0 5 0 0',
											reference: 'ctlWhQty',
											readOnly: true,
											bind:'{theRRDetail.whQty}'
										},
										{
											xtype : 'numberfield',
											minValue : 0,
											maxValue: 999999.999,
											decimalPrecision: 3,
											selectOnFocus : true,
//											readOnly: true,
											flex: 1,
											margin: '0 5 0 0',
											reference: 'ctlWhMt',
											bind:'{theRRDetail.whWgt}'
										},
										{
											xtype : 'numberfield',
											minValue : 0,
											maxValue: 999999.999,
											decimalPrecision: 3,
											readOnly: true,
											selectOnFocus : true,
											flex: 1,
											margin: '0 5 0 0',
											bind:'{theRRDetail.whM3}',
											reference: 'ctlWhM3',
										},
				                    ]
		                        },
		                        
		                        //Location
		                        {
				                    xtype: 'container',
				                    flex: 3,
				                    layout: {
				                        type: 'hbox',
				                        align: 'stretch'
				                    },
				                    defaults: {
					                    margin: '0 5 2 0',
					                    labelAlign: 'right',
					                    labelWidth: 140
					                },
				                    items: [
				                    	{
				                            xtype: 'label',
				                            style: {
				                                'text-align': 'right'
				                            },
				                            width: 140,
				                            text: ViewUtil.getLabel('confirmLoadingLocation')
				                        },
				                    	{
				                            xtype: 'textfield',
				                            reference: 'ctlWhCheckImportLocId',
				                            flex: 2,
						                    readOnly:true,
						                    allowBlank: false,
						                    bind:{
						                    	value : '{theRRDetail.locId}'
						                    }
				                        },
				                        {
				                            xtype: 'button',
				                            flex: 1,
				                            text: ViewUtil.getLabel('confirmLoadingWhAllocation'),
				                            bind:{
				                            	disabled : '{directMode}'
				                            },
				                            listeners: {
												click: {
													fn : 'onWarehouseAllocation',
													args : ['ctlWhCheckImportLocId']
												}
											}
				                        },
				                    ]
		                        },
		                        //Package No
		                        {
				                    xtype: 'container',
				                    flex: 3,
				                    layout: {
				                        type: 'hbox',
				                        align: 'stretch'
				                    },
				                    defaults: {
					                    margin: '0 5 2 0',
					                    labelAlign: 'right',
					                    labelWidth: 140
					                },
				                    items: [
				                    	{
				                            xtype: 'packagenofield',
				                            hidden: true,
				                            reference:'ctlConfirmDischargingPackNoCode',
				                            flex: 3,
				                            fieldLabel: ViewUtil.getLabel('confirmLoadingPackageNo'),
				                            bind:{
				                            	value : '{theRRDetail.pkgNo}',
				                            	vslCallId: '{theRRDetail.vslCallId}',
				                            	blNo: '{theRRDetail.blNo}',
				                            	ixCd: 'I',
				                            	jobPurpCd: 'AW'
				                            }
				                        },
				                        {
											xtype: 'label',
											margin: '2 5 0 0',
											style: {
												'text-align': 'right'
											},
											width: 100,
											text: ViewUtil.getLabel('confirmLoadingPackageNo')
										},
										{
											xtype: 'textfield',
											reference: 'cltPkgNo',
											flex: 1,
											bind:'{theRRDetail.pkgNo}',
											fieldStyle: 'text-transform:uppercase',
											listeners:{
												change: 'onUpperCase'
											},
											editable: false
										},
										{
				                            xtype: 'button',
				                            reference: 'btnPackageNo',
				                            iconCls: 'x-fa fa-search',
						 					listeners: {
						 						click: 'onOpenPkgNoPopup'
						 					}
				                        },
				                    ]
		                        }
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    flex: 2,
		                    items: [
		                    	{
		                            xtype: 'textfield',
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingShift'),
		                            bind:'{theRRDetail.shiftNm}',
		                            readOnly:true
		                        },
		                        {
		                            xtype: 'textfield',
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingModeOfOpr'),
		                            bind: {
		                            	value: '{theRRDetail.tsptTpCd}'
		                            },
									readOnly: true,
		                        },
		                        {
		                            flex: 1,
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingClearance'),
		                            bind: {
		                            	value: '{theRRDetail.custMode}'
		                            },
		                            forceSelection:true,
		                            readOnly:true
		                        },
		                        {
		                            xtype: 'textfield',
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingCargoType'),
		                            reference: 'refCargoType',
		                            bind: {
		                            	value: '{theRRDetail.cgTpCdNm}'
		                            }
		                        },
		                        {
		                            xtype: 'checkboxfield',
		                            reference:'ctlWhCheckImportFinal',
		                            flex: 1,
		                            hidden:true,
		                            margin: '0 0 0 145',
		                            boxLabel: ViewUtil.getLabel('whCheckImportFinalDischarging'),
		                            bind:'{theRRDetail.fnlOpeYn}'	
		                        },
		                        {
		                            xtype: 'cmmcdfield',
		                            reference:'ctlWhCheckImportPacTypeCode',
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingPkgType'),
		                            bind:{
		                            	value : '{theRRDetail.rePkgTpCd}'
		                            },
		                            params:{
		                            	searchType: 'COMM',
				   						searchDivCd: 'PKGTP',
				   						searchLcd:CodeConstants.LCD_MOST,
			                            searchMcd: CodeConstants.MCD_MT_PKGTP
				   					},  
									editable: false,                          
		                        },{
				                    xtype: 'container',
				                    flex: 3,
				                    layout: {
				                        type: 'hbox',
				                        align: 'stretch'
				                    },
				                    defaults: {
					                    labelAlign: 'right',
					                },
				                    items: [
				                    	{
		             	   					xtype:'textfield', //Display list of vin
		             	   					fieldLabel: ViewUtil.getLabel('unitNo'),
		                                    labelWidth: 60,
		                                    labelAlign: 'right',
		       							 	width: 185,
		     								margin: '2 5 50 79',
		             	   					reference:'ctlUnitNoSearchField',
		             	   					readOnly:true,
						                    bind:{
						                    	value : '{theRRDetail.unitNo}'
						                    }
		                                 },{
		     								xtype: 'button',
		     								disabled: false,
		     								margin: '2 5 50 0',
		             	   					reference:'ctlBtnUnitNoSearchField',
		     			 					iconCls: 'x-fa fa-search',
		     			 					listeners: {
		     			 						click: 'openUnitListPopup'
		     			 					}
		     							}
				                    ]
		                        },
                                {
        		                    xtype: 'container',
        		                    flex: 1,
        		                    layout: {
				                        type: 'hbox',
				                        pack: 'end'
				                    },
				                    hidden:true,
				                    defaults: {
					                    margin: '0 5 2 0',
					                    labelAlign: 'right',
					                    labelWidth: 140
					                },
        		                    items: [
        		                    	{
        		                            xtype: 'button',
        		                            reference: 'btnDamage',
        		                            text: ViewUtil.getLabel('damageCheck'),
        		                            listeners: {
        		    							click:'onDamage_clickHandler'
        		    						}
        		                        },
        		                        {
        		                            xtype: 'button',
        		                            reference: 'btnDimension',
        		                            text: ViewUtil.getLabel('dimensionCheck'),
        		                            listeners: {
        		    							click:'onDimension_clickHandler'
        		    						}
        		                        },
        		                    ]
                                
                                },
		                    ]
		                }
		            ]
		        }
			],
		    
		    dockedItems: [{
                xtype:'toolbar',
                dock : 'bottom',
                items : [{
						xtype: 'container',
						style: { "background-color":"white" },
						layout: {
							type: 'vbox',
							align:'center'
						},
						flex:1,
						items: [{
							xtype:'container',
							reference: 'ctlCtnConfirmWHCheckImportForROROBtn',
							layout: {
								type: 'hbox',
								align:'center'
						    },
						    items:[
								{
									xtype:'button',
									margin:'0 5 5 0',
									text: ViewUtil.getLabel('confirm'),
									reference:'btnOk',
									iconCls: 'fa fa-floppy-o',
									cls: 'search-button',                 	
									listeners:{
										click: 'onSave'
									}
								},{
									xtype:'button',
									ui: 'delete-button',
									text: ViewUtil.getLabel('cancel'),
									reference:'btnCancel',
									iconCls: 'fa fa-window-close',             	
									listeners:{
										click: 'onCancel'
									}
								}
						    ]
						}
                    ]
					}
               	]
		    }]
		});
		
		me.callParent();
	}
});