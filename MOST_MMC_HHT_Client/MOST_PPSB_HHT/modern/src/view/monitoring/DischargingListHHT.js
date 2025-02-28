Ext.define('MOST.view.monitoring.DischargingListHHT', {
    extend: 'Ext.Panel',
    alias: 'widget.app-discharginglisthht',
    requires: [
        'MOST.view.monitoring.DischargingController',
        'MOST.view.monitoring.DischargingModel',
        'MOST.view.common.DateTimeLocalField',
        'MOST.view.popup.RequesterPopupHHT'    
    ],

    controller: 'discharging',
    listeners: {
        initialize: 'onLoadTbl'
    },
    viewModel: {
        type: 'discharging'
    },
    layout: 'fit',
	shadow: false,
	padding: 5,	
	minWidth: CommonConstants.HHT_MIN_WIDTH,
	scrollable: true, 
	responsiveFormulas: {
		small: CommonConstants.SMALL_WIDTH,
		large: CommonConstants.LARGE_WIDTH
	},
	
    items: [{
        xtype: 'formpanel',
        layout: 'vbox',
        padding: 0,       
        items: [ 
        	//Row1
        	{
        		xtype: 'fieldset',
    			scrollable: true, 
    			hidden: true,
    			padding: '5 0 0 5',
    			layout: { 
    				type: 'hbox',
    				align: 'top',
    				pack: 'end'
    			},
    			defaults: {
    				margin: '0 5 0 0'
    			},
    			items: [
    				{
    					xtype: 'container',
    					
    					margin: '0 0 0 5',
    					responsiveConfig: {
    						small: {
    							margin: '0 0 0 5',
    							layout: {
    								type: 'vbox',
    								align: 'stretch'
    							},
    							defaults: {
    								//margin: '0 0 5 0',
    								//padding: '0 0 10 0'
    							},
    						},
    						large: {
    							margin: '0 0 0 5',
    							layout: {
    								type: 'hbox',
    								align: 'stretch'
    							},					
    							defaults: {
    								//margin: '0 5 0 0',
    								//flex: 1,							
    							},
    						}
    					},
    					
    					defaults: {
    						labelAlign: 'left',
    						labelTextAlign: 'right',
    						labelWidth: 90,
    					},
    					items:[ 
				            {
				                xtype: 'button',
				                ui: 'action',
				                margin: '0 0 0 10',
				                text: { type: 'bundle', key: 'discharging_ok' },
				                width: 150,
				                hidden:true
				            }, {
				                xtype: 'datetimelocalfield',
				                margin: '0 0 0 40',
				                flex: 1,
				                reference: 'refWorkDate',
				                labelAlign: 'left',
				                required: true,
				                label: { type: 'bundle', key: 'discharging_workDate' }, 
				                inputType: 'date',
								format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
				                bind: {
				                    disabled: true,
				                }
				            }, {
				                xtype: 'combobox',
				                reference: 'refCboShift',
				                bind: {
				                    store: '{dischargingShiftCombo}'
				                },
				                width: 150,
				                label: { type: 'bundle', key: 'discharging_Shift' },
				                labelWidth: 50,
				                labelAlign: 'left',
				                displayField: 'shftNm',
				                valueField: 'shftId',
				                queryMode: 'local',
				                clearable: true,
				                typeAhead: true,
				            }]
    				}]
        },
        //Row 2 detail form
        {   
        	xtype: 'container',
			//padding: '5 0 0 5',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			defaults: {
			 	margin: '0 5 0 0',
			 	padding: '5 0 0 5'
			 },
			responsiveConfig: {
				small: {
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					defaults: {
						margin: '0 0 5 0',
						padding: '0 0 10 0'
					},
				},
				large: {
					layout: {
						type: 'hbox',
						align: 'stretch'
					},					
					defaults: {
						//margin: '0 5 0 0',
						flex: 1,							
					},
				}
			},
			items:[				
				{
					xtype: 'fieldset',
					flex: 1,
					reference: 'refContSnNo',
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					defaults: {
						labelAlign: 'left',
						labelTextAlign: 'right',
						labelWidth: 70,
						
					},
					border: true,
					style: 'border-style: inherit; border-radius: 5px; border-color: antiquewhite',
					items:[
						{ 
			                xtype: 'container',
			                layout: 'hbox',
			                items:[
			                // {
			                //     xtype: 'label',
			                //     html: 'F.Agent',
			                //     width: 90,
			                //     margin: '7 0 0 0',
			                // },
			            	{
			                    xtype: 'combobox',
			                    reference: 'refcboBL',
			                    label: { type: 'bundle', key: 'discharging_BL' },
			                    labelWidth: 70,
			                    flex:1,
			                    labelAlign: 'left',
			                    labelTextAlign: 'right',
			                    displayField: 'blNo',
			                    valueField: 'blNo',
			                    queryMode: 'local',
			                    clearable: true,
			                    required: true,
			                    bind: {
			                        store: '{dischargingBlNoComboHHT}',
			                    },
			                    listeners: {
			                        change: 'onBlChange',
			                    },
			                    editable: false,
			                    typeAhead: true
			                },
			                {
			                    xtype: 'spacer',
			                    width: 10
			                },
			                {
			                    xtype: 'textfield',
			                    reference: 'reftxtFAgent',
			                    minValue: 0,
			                    defaultValue: 0,
			                    label: { type: 'bundle', key: 'discharging_FAgent' },
			                    labelAlign: 'left',
			                    labelTextAlign: 'right',
			                    labelWidth: 70,
			                    flex:1,
			                    //width: 170,
			                    //style: 'background-color: #ffff90',
			                    //required: true,
			                    bind: {
			                        //  value:'{theWarehouse.wgt}'
			                    },
			                    listeners: {
			                    	change: 'onUpperCaseTextFWD'
			                    		
			                    },
			                    triggers: {
									someField: {
										iconCls: 'x-fa fa-search',
										ui: 'retrieve-button-modern',
										scope: 'controller',
										handler: 'onFAgentClick'
									}
								},
			                },
			                /*{
			                    xtype: 'button',
			                    iconCls: 'x-fa fa-search',
			                    ui: 'Search',
			                    handler: 'onFAgentClick'
			                }*/
			                ]
			            }, 
			            {
			                xtype: 'container',
			                layout: 'hbox',
			                items: [{
			                    xtype: 'combobox',
			                    reference: 'refcboActDelv',
			                    flex: 1,
			                    label: { type: 'bundle', key: 'discharging_ActDelv' },
			                    labelWidth: 70,
			                    labelAlign: 'left',
			                    labelTextAlign: 'right',
			                    placeholder: 'Both',
			                    displayField: 'scdNm',//'tsptTpCdNm',
			                    valueField: 'scd',//'tsptTpCd',
			                    queryMode: 'local',
			                    clearable: true,
			                    bind: {
			                        store: '{dischargingOprCombo}',
			                    },
			                    listeners: {
			                        change: 'onChangeConditionTbl' //'onBlChange',
			                    },
			                    editable: false,
			                    typeAhead: true
			                },
			                {
			                    xtype: 'spacer',
			                    width: 10
			                },
			                {
			                    xtype: 'combobox',
			                    reference: 'refCboHatch',
			                    flex: 1,
			                    label: { type: 'bundle', key: 'discharging_Hatch' },
			                    labelWidth: 70,
			                    labelAlign: 'left',
			                    labelTextAlign: 'right',
			                    displayField: 'scdNm',
			                    valueField: 'scd',
			                    queryMode: 'local',
			                    placeholder: 'All',
			                    clearable: true,
			                    bind: {
			                        store: '{dischargingHatchNoCombo}',
			                    },
			                    listeners: {
			                        change: 'onChangeConditionTbl'  //'onCboWHNOChange',
			                    },
			                    editable: false,
			                    typeAhead: true
			                }]
			            }, 
			            {//Doc Row ************************
			                xtype: 'container',
			                layout: 'hbox',
			                items: [{
			                    xtype: 'numberfield', //Doc Mt
			                    label: { type: 'bundle', key: 'discharging_Doc' },
			                    labelWidth: 70,
			                    labelAlign: 'left',
			                    labelTextAlign: 'right',
			                    minValue: 0,
			                    defaultValue: 0,
			                    ui: 'field-inputcolor',
			                    flex:1,
			                    disabled: true,
			                    bind: { value: '{theCalc.docMtTotal}' }
			    
			                },
			                {
			                    xtype: 'spacer',
			                    width: 10
			                },
			                {
			                    xtype: 'numberfield', //Doc M3
			                    labelWidth: 70,
			                    labelAlign: 'left',
			                    labelTextAlign: 'right',
			                    minValue: 0,
			                    defaultValue: 0,
			                    ui: 'field-inputcolor',
			                    flex:1,
			                    disabled: true,
			                    bind: { value: '{theCalc.docM3Total}' }
			    
			                },
			                {
			                    xtype: 'spacer',
			                    width: 10
			                },
			                {
			                    xtype: 'numberfield', //Doc Qty
			                    labelWidth: 70,
			                    labelAlign: 'left',
			                    labelTextAlign: 'right',
			                    minValue: 0,
			                    defaultValue: 0,
			                    ui: 'field-inputcolor',
			                    flex:1,
			                    disabled: true,
			                    bind: { value: '{theCalc.docQtyTotal}' }
			    
			                }]
			            },
			            
			            {//Act Row ************************
			                xtype: 'container',
			                layout: 'hbox',
			                items: [{
			                    xtype: 'numberfield', // Act MT
			                    label: { type: 'bundle', key: 'discharging_Act' },
			                    labelAlign: 'left',
			                    labelWidth: 70,
			                    labelTextAlign: 'right',
			                    ui: 'field-inputcolor',
			                    minValue: 0,
			                    defaultValue: 0,
			                    flex:1,
			                    disabled: true,
			                    bind: { value: '{theCalc.actMtTotal}' }
			                },
			                {
			                    xtype: 'spacer',
			                    width: 10
			                },
			                {
			                    xtype: 'numberfield',// Act M3
			                    labelAlign: 'left',
			                    labelWidth: 70,
			                    labelTextAlign: 'right',
			                    ui: 'field-inputcolor',
			                    minValue: 0,
			                    defaultValue: 0,
			                    flex:1,
			                    disabled: true,
			                    bind: { value: '{theCalc.actM3Total}' }
			                },
			                {
			                    xtype: 'spacer',
			                    width: 10
			                },
			                {
			                    xtype: 'numberfield', // Act Qty
			                    labelAlign: 'left',
			                    labelWidth: 70,
			                    labelTextAlign: 'right',
			                    ui: 'field-inputcolor',
			                    minValue: 0,
			                    defaultValue: 0,
			                    flex:1,
			                    disabled: true,
			                    bind: { value: '{theCalc.actQtyTotal}' }
			                }]
			            },
			            {//Bal Row ************************
			                xtype: 'container',
			                layout: 'hbox',
			                items: [{
			                    xtype: 'numberfield', //Bal MT
			                    label: { type: 'bundle', key: 'discharging_Bal' },
			                    labelAlign: 'left',
			                    labelTextAlign: 'right',
			                    labelWidth: 70,
			                    minValue: 0,
			                    defaultValue: 0,
			                    ui: 'field-inputcolor',
			                    flex:1,
			                    disabled: true,
			                    bind: { value: '{theCalc.balanceMtTotal}' }
			                },
			                {
			                    xtype: 'spacer',
			                    width: 10
			                },
			                {
			                    xtype: 'numberfield', //Bal M3
			                    labelAlign: 'left',
			                    labelTextAlign: 'right',
			                    labelWidth: 70,
			                    minValue: 0,
			                    defaultValue: 0,
			                    ui: 'field-inputcolor',
			                    flex:1,
			                    disabled: true,
			                    bind: { value: '{theCalc.balanceM3Total}' }
			                },
			                {
			                    xtype: 'spacer',
			                    width: 10
			                },
			                {
			                    xtype: 'numberfield', //Bal Qty
			                    labelAlign: 'left',
			                    labelTextAlign: 'right',
			                    labelWidth: 70,
			                    minValue: 0,
			                    defaultValue: 0,
			                    ui: 'field-inputcolor',
			                    flex:1,
			                    disabled: true,
			                    bind: { value: '{theCalc.balanceQtyTotal}' }
			                }]
			            }, {//MT/M3/QTY
			                xtype: 'combobox',
			                reference: 'ctlCompareCombo',
			                label:  { type: 'bundle', key: 'discharging_MT_M3_QTY' },
			                labelWidth: 70,
			                width: 250,
			                labelAlign: 'left',
			                labelTextAlign: 'right',
			                displayField: 'scdNm',
			                valueField: 'scd',
			                queryMode: 'local',
			                clearable: true,
			                bind: {
			                    store: '{dischargingCompareCombo}',
			                },
			                listeners: {
			                    select: 'onCompareModeChangeTbl',
			                },
			                editable: false,
			                typeAhead: true,
			                disabled: true,
			                hidden: true,
			            }]
				}]
        },        
        //Row 3 button
        {
        	xtype: 'container',
    		responsiveConfig: {
    			small: {
    				layout: {
    					type: 'vbox',
    					pack: 'top',
    				},
    				
    			},
    			large: {
    				layout: {
    					type: 'hbox',
    					align: 'right',
    					pack: 'end',
    					
    				},
    			}
    		},
    		items: [
    			{
    				xtype: 'container',
    				layout: {
    					type: 'hbox',
    					align: 'right',
    					pack: 'end',
    					
    				},
    				responsiveConfig: {
    					small: {							
    						margin: '5 0 0 0',
    						defaults: {
    							margin: '0 5 0 0',
    						},
    					},
    					large: {
    						defaults: {
    							margin: '5 5 0 0',
    						},
    						
    					}
    				},
    				items:[
    					{            		
		                xtype: 'button',
		                reference: 'refBtnDischargingListRetrieve',
		                text: { type: 'bundle', key: 'discharging_retrive' },
		                handler: 'onSearchTbl',
		               // width: 140,
		                flex:1,
		                ui: 'retrieve-button-modern',
		            }]
    			 }]
        },
        //Row 4 grid
        {
        	xtype: 'container',
            layout: 'hbox',
 			scrollable: true,
 			flex: 1,
            items: [
             	{
             	
             		xtype: 'grid',
 					margin: '5 0 5 5',
 					responsiveConfig: {
 						small: {
 							flex: 1
 						},
 						large: {
 							flex: undefined,
 							height: 300
 						}
 					},
             reference: 'refDischargingGrid',
             bind: {
                    store: '{discharging}'
                },
                columns: [{
				    text: { type: 'bundle', key: 'discharging_No' },
					xtype: 'rownumberer',
					width : 40,
					align : 'center'
				},
//                {
//                    text: 'JPVC',
//                    dataIndex: 'vslCallId',
//                    width: 110
//                },
                {
                    text: { type: 'bundle', key: 'discharging_BL' },
                    dataIndex: 'blNo',
                    width: 110
                }, {
                    text: { type: 'bundle', key: 'discharging_DO' },
                    dataIndex: 'delvOdrNo',
                    width: 150
                }, {
                    text: { type: 'bundle', key: 'discharging_DeliveryMode' },
                    dataIndex: 'delvTpCd',
                    filter: 'string',
                    width: 110
                }, {
                    xtype: 'numbercolumn',
                    align: 'right',
                    text: { type: 'bundle', key: 'discharging_GrossMT' },
                    dataIndex: 'wgt',
                    width: 110,
                    renderer: 'renderBlueColorForFloat'
                },
                {
                    xtype: 'numbercolumn',
                    align: 'right',
                    dataIndex: 'vol',
                    text:{ type: 'bundle', key: 'discharging_GrossM3' },
                    width: 110,
                    renderer: 'renderBlueColorForFloat'
                },
                {
                    xtype: 'numbercolumn',
                    align: 'right',
                    dataIndex: 'pkgQty',
                    text: { type: 'bundle', key: 'discharging_GrossQty' },
                    width: 110,
                    renderer: 'renderBlueColorForInt'
                }, {
                    xtype: 'numbercolumn',
                    align: 'right',
                    text: { type: 'bundle', key: 'discharging_ActMT' },
                    dataIndex: 'outWgt',
                    width: 110,
                    renderer: 'renderRedColorForFloat'
                },
                {
                    xtype: 'numbercolumn',
                    align: 'right',
                    text: { type: 'bundle', key: 'discharging_ActM3' },
                    dataIndex: 'outMsrmt',
                    width: 110,
                    renderer: 'renderRedColorForFloat'
                },
                {
                    xtype: 'numbercolumn',
                    align: 'right',
                    text: { type: 'bundle', key: 'discharging_ActQty' },
                    dataIndex: 'outQty',
                    width: 110,
                    renderer: 'renderRedColorForInt'
                }, {
                    text: { type: 'bundle', key: 'discharging_Hatch' },
                    dataIndex: 'hatchNo',
                    filter: 'string',
                    width: 110
                }]
            }]
        }]
    }]
});
