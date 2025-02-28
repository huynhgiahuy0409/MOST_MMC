Ext.define('MOST.view.operation.WHCheckImport', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-whcheckimport',
	
	requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.field.Checkbox'
	],
	
	reference:'refWHCheckImportPopup',
	
	width: 820,
	height: 420,
	scrollable: true,
	
	controller: 'whcheckimport',
	
	viewModel: {
		type: 'whcheckimport'
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
		                    bind:'{theDetail.vslCallId}',
		                    readOnly:true
		                },
		                {
		                    xtype: 'textfield',
		                    width: 250,
		                    bind:'{theDetail.vslNm}',
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
		                    bind:'{theDetail.blNo}'
		                },
		                {
		                    xtype: 'textfield',
		                    width: 250,
		                    bind: {
		                    	value: '{theDetail.delvTpNm}'
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
						                    bind:'{theDetail.qty}',
											maxValue: 999999,
											decimalPrecision: 3,
				                        },
				                        {
				                            xtype: 'textfield',
				                            flex: 1,
						                    readOnly:true,
											maxValue: 999999.999,
											decimalPrecision: 3,
						                    bind:'{theDetail.mt}'
				                        },
				                        {
				                            xtype: 'textfield',
				                            flex: 1,
						                    readOnly:true,
											maxValue: 999999.999,
											decimalPrecision: 3,
						                    bind:'{theDetail.m3}'
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
				                            bind:'{theDetail.abQty}',
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
				                            bind:'{theDetail.abMt}',
				                            readOnly:true
				                        },
				                        {
				                        	xtype : 'numberfield',
				                        	reference: 'refBalanceM3',
				                        	minValue : 0,
				                        	maxValue: 999999.999,
											decimalPrecision: 3,
				                            flex: 1,
				                            bind:'{theDetail.abM3}',
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
											bind:'{theDetail.whQty}'
										},
										{
											xtype : 'numberfield',
											minValue : 0,
											maxValue: 999999.999,
											decimalPrecision: 3,
											selectOnFocus : true,
											readOnly: true,
											flex: 1,
											margin: '0 5 0 0',
											reference: 'ctlWhMt',
											bind:'{theDetail.whWgt}'
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
											bind:'{theDetail.whM3}',
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
						                    	value : '{theDetail.locId}'
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
				                            	value : '{theDetail.pkgNo}',
				                            	vslCallId: '{theDetail.vslCallId}',
				                            	blNo: '{theDetail.blNo}',
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
											bind:'{theDetail.pkgNo}',
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
		                            bind:'{theDetail.shiftNm}',
		                            readOnly:true
		                        },
		                        {
		                            xtype: 'textfield',
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingModeOfOpr'),
		                            bind: {
		                            	value: '{theDetail.tsptTpCd}'
		                            },
									readOnly: true,
		                        },
		                        {
		                            flex: 1,
		                            xtype: 'textfield',
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingClearance'),
		                            bind: {
		                            	value: '{theDetail.custMode}'
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
		                            	value: '{theDetail.cgTpCdNm}'
		                            }
		                        },
		                        {
		                            xtype: 'checkboxfield',
		                            reference:'ctlWhCheckImportFinal',
		                            flex: 1,
		                            margin: '0 0 0 145',
		                            boxLabel: ViewUtil.getLabel('whCheckImportFinalDischarging'),
		                            bind:'{theDetail.fnlOpeYn}'	
		                        },
		                        {
		                            xtype: 'cmmcdfield',
		                            reference:'ctlWhCheckImportPacTypeCode',
		                            flex: 1,
		                            fieldLabel: ViewUtil.getLabel('confirmLoadingPkgType'),
		                            bind:{
		                            	value : '{theDetail.rePkgTpCd}'
		                            },
		                            params:{
		                            	searchType: 'COMM',
				   						searchDivCd: 'PKGTP',
				   						searchLcd:CodeConstants.LCD_MOST,
			                            searchMcd: CodeConstants.MCD_MT_PKGTP
				   					},  
									editable: false,                          
		                        },
		                        {
            	   					xtype:'truckfield',
            	   					flex:1,
            	   					fieldLabel: ViewUtil.getLabel('yardTruck'),
            	   					reference:'refYardTruck',
            	   					bind :{ 
            	   						value: '{theDetail.lorryNo}',
            	   						vslCallId: '{theDetail.vslCallId}',
            	   						blNo: '{theDetail.blNo}',
            	   						lorryNo: '{theDetail.lorryNo}',
            	   						searchDivCd : 'APRON',
            	   						isAutoLoad: 'true',
            	   						weightCheckYn: '{theDetail.weightCheckYn}'
            	   					}
                                },
                                
                                {
        		                    xtype: 'container',
        		                    flex: 1,
        		                    layout: {
				                        type: 'hbox',
				                        pack: 'end'
				                    },
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
							reference: 'ctlCtnConfirmWHCheckImportBtn',
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