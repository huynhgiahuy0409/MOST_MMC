Ext.define('MOST.view.monitoring.LoadingListHHT', {
    extend: 'Ext.Panel',
    alias: 'widget.app-loadinglisthht',
  
    requires: [
        'MOST.view.monitoring.LoadingController',
        'MOST.view.monitoring.LoadingModel',
        'MOST.view.common.DateTimeLocalField',
        'MOST.view.popup.RequesterPopupHHT'  
          
    ],

    controller: 'loading',
    listeners: {
       initialize: 'onLoadTbl'
    },
    viewModel: {
        type: 'loading'
    },

    lblJpvcno: { type: 'bundle', key: 'loading_jpvcno' },
    lblUnclosedBlSn: { type: 'bundle', key: 'loading_unclosedBlSn' },

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
        padding: 0,
        layout: 'vbox',
        items: [        	
        //Row 1- hidden
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
			                text: { type: 'bundle', key: 'loading_ok' },  
			                width: 150,
			                handler: 'onCancelHHT',
			                hidden:true
			            }, {
			                xtype: 'datetimelocalfield',
			                margin: '0 0 0 40',
			                flex: 1,
			                reference: 'refWorkDate',
			                labelAlign: 'left',
			                required: true,
			                label:{ type: 'bundle', key: 'loading_WorkDate' },
			                inputType: 'date',
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(), //'d/m/Y',
			                bind: {
			                    disabled: true,
			                },
			            }, {
			                xtype: 'combobox',
			                reference: 'refCboShift',
			                bind: {
			                    store: '{loadingShiftCombo}'
			                },
			                width: 150,
			                label:{ type: 'bundle', key: 'loading_Shift' },
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
        //Row 2	detail form
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
			                items: [{
			                	xtype: 'combobox',
			                	reference: 'refcboSN',
			                	flex: 2,
			                	label:{ type: 'bundle', key: 'loading_SNNo' },
			                	labelWidth: 70,
			                	labelAlign: 'left',
			                	labelTextAlign: 'right',
			                	displayField: 'shipgNoteNo',
			                	valueField: 'shipgNoteNo',
			                	queryMode: 'local',
			                	clearable: true,
			                	bind: {
			                		store: '{loadingSNComboHHT}',
			                	},
			                	listeners: {
			                		change: 'onSNChange',
			                	},
			                	editable: false,
			                	typeAhead: true
			                },
			                {
			                	xtype: 'combobox',
			                	reference: 'refCboHatch',
			                	flex: 2,
			                	label:{ type: 'bundle', key: 'loading_Hatch' },
			                	labelWidth: 70,
			                	labelAlign: 'left',
			                    labelTextAlign: 'right',
			                	displayField: 'scdNm',
			                	valueField: 'scd',
			                	queryMode: 'local',
			                	clearable: true,
			                	bind: {
			                		store: '{loadingHatchNoCombo}',
			                	},
			                	listeners: {
			                		change: 'onChangeConditionTbl' //'onCboWHNOChange',
			                	},
			                	editable: false,
			                	typeAhead: true
			                }]
			            }, 
			            {
			            	xtype: 'container',
			            	layout: 'hbox',
			            	items: [{
			            		xtype: 'textfield',
			            		reference: 'reftxtFAgent',
			            		minValue: 0,
			            		defaultValue: 0,
			            		label:{ type: 'bundle', key: 'loading_FAgent' },
			            		labelAlign: 'left',
			            		labelTextAlign: 'right',
			            		labelWidth: 70,
			            		flex: 0.5,
			            		//style: 'background-color: #ffff90',
			            		bind: {
			            			//  value:'{theWarehouse.wgt}'
			            		},
			            		triggers: {
									someField: {
										iconCls: 'x-fa fa-search',
										ui: 'retrieve-button-modern',
										scope: 'controller',
										handler: 'onFAgentClick'
									}
								},
			            	}
			            	/* m,
			            	{
			            		xtype: 'button',
			            		iconCls: 'x-fa fa-search',
			            		ui: 'Search',
			            		handler: 'onFAgentClick'
			            	}
			            	*/
			            	]
			            },{//Doc Row
			                xtype: 'container',
			                layout: 'hbox',
			                items: [{
			                    xtype: 'numberfield',
			                    label:{ type: 'bundle', key: 'loading_Doc' },
			                    labelWidth:70,
			                    labelAlign: 'left',
			                    labelTextAlign: 'right',
			                    ui: 'field-inputcolor',
			                    flex:1,
			                    minValue: 0,
			                    defaultValue: 0,
			                    disabled: true,
			                    bind: { value: '{theCalc.docMtTotal}' }
			    
			                },
			                {
			                	xtype: 'spacer',
			                	width: 10
			                },
			                {
			                    xtype: 'numberfield',
			                    labelWidth: 70,
			                    labelAlign: 'left',
			                    labelTextAlign: 'right',
			                    ui: 'field-inputcolor',
			                    flex:1,
			                    minValue: 0,
			                    defaultValue: 0,
			                    disabled: true,
			                    bind: { value: '{theCalc.docM3Total}' }
			    
			                },
			                {
			                	xtype: 'spacer',
			                	width: 10
			                },
			                {
			                    xtype: 'numberfield',
			                    labelWidth:70,
			                    labelAlign: 'left',
			                    labelTextAlign: 'right',
			                    ui: 'field-inputcolor',
			                    flex:1,
			                    minValue: 0,
			                    defaultValue: 0,
			                    disabled: true,
			                    bind: { value: '{theCalc.docQtyTotal}' }
			    
			                }]
			            },
			            {//Act Row
			            	 xtype: 'container',
			                 layout: 'hbox',
			                 items: [{
			                     xtype: 'numberfield',
			                     label:{ type: 'bundle', key: 'loading_Act' },
			                     labelAlign: 'left',
			                     ui: 'field-inputcolor',
			                     flex:1,
			                     labelWidth: 70,
			                     minValue: 0,
			                     defaultValue: 0,
			                     disabled: true,
			                     bind: { value: '{theCalc.actMtTotal}' }
			                 },
			                 {
			                 	xtype: 'spacer',
			                 	width: 10
			                 },
			                 {
			                     xtype: 'numberfield',
			                     labelAlign: 'left',
			                     ui: 'field-inputcolor',
			                     flex:1,
			                     labelWidth: 70,
			                     minValue: 0,
			                     defaultValue: 0,
			                     disabled: true,
			                     bind: { value: '{theCalc.actM3Total}' }
			                 },
			                 {
			                 	xtype: 'spacer',
			                 	width: 10
			                 },
			                 {
			                     xtype: 'numberfield',
			                     labelAlign: 'left',
			                     ui: 'field-inputcolor',
			                     flex:1,
			                     labelWidth: 70,
			                     minValue: 0,
			                     defaultValue: 0,
			                     disabled: true,
			                     bind: { value: '{theCalc.actQtyTotal}' }
			                 }
			                 ]
			            },
			            {//Bal Row
			               	xtype: 'container',
			                layout: 'hbox',
			                items: [{
			                    xtype: 'numberfield',
			                    label:{ type: 'bundle', key: 'loading_Bal' },
			                    labelAlign: 'left',
			                    ui: 'field-inputcolor',
			                    flex:1,
			                    labelWidth: 70,
			                    minValue: 0,
			                    defaultValue: 0,
			                    disabled: true,
			                    bind: { value: '{theCalc.balanceMtTotal}' }
			                },
			                {
			                	xtype: 'spacer',
			                	width: 10
			                },
			                {
			                    xtype: 'numberfield',
			                    labelAlign: 'left',
			                    ui: 'field-inputcolor',
			                    flex:1,
			                    labelWidth: 70,
			                    minValue: 0,
			                    defaultValue: 0,
			                    disabled: true,
			                    bind: { value: '{theCalc.balanceM3Total}' }
			                },
			                {
			                	xtype: 'spacer',
			                	width: 10
			                },
			                {
			                    xtype: 'numberfield',
			                    labelAlign: 'left',
			                    ui: 'field-inputcolor',
			                    flex:1,
			                    labelWidth: 70,
			                    minValue: 0,
			                    defaultValue: 0,
			                    disabled: true,
			                    bind: { value: '{theCalc.balanceQtyTotal}' }
			                }]
			            },
			            {//MT/M3/QTY
			                xtype: 'combobox',
			                reference: 'ctlCompareCombo',
			                label: { type: 'bundle', key: 'loading_MT_M3_QTY'},
			                labelWidth: 70,
			                width: 300,
			                labelAlign: 'left',
			                displayField: 'scdNm',
			                valueField: 'scd',
			                queryMode: 'local',
			                clearable: true,
			                bind: {
			                    store: '{loadingCompareCombo}',
			                },
			                listeners: {
			                    select: 'onCompareModeChangeTbl',
			                },
			                editable: false,
			                typeAhead: true,
			                hidden: true,
			                disabled: true,
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
		                iconCls: 'x-fa fa-search',
		                reference: 'refBtnLoadingListRetrieve',
		                text: { type: 'bundle', key: 'loading_search' },
		                handler: 'onSearchTbl',
		                width: 150,
		                //flex:1,
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
					margin: '5 5 5 5',
					responsiveConfig: {
						small: {
							flex: 1
						},
						large: {
							flex: undefined,
							height: 300
						}
					},
                reference: 'refLoadingHHTGrid',
                bind: {
                   store: '{loading}'
                },
                columns: [
                	
                	{
				    text:{ type: 'bundle', key: 'loading_No' },
					xtype: 'rownumberer',
					width : 40,
					align : 'center'
				},
//				{
//                    text: 'JPVC',
//                    dataIndex: 'vslCallId',
//                    width: 110
//                },
				
                {
                    text:{ type: 'bundle', key: 'loading_SN' },
                    dataIndex: 'shipgNoteNo',
                    width: 150
                }, {
                    text:{ type: 'bundle', key: 'loading_GR' },
                    dataIndex: 'grNo',
                    width: 110
                }, {
                    text: { type: 'bundle', key: 'loading_DeliveryMode' },
                    dataIndex: 'delvTpCd',
                    filter: 'string',
                    width: 110
                }, {
                    xtype: 'numbercolumn',
                    align: 'right',
                    text: { type: 'bundle', key: 'loading_DocMT' },
                    dataIndex: 'wgt',
                    reference: 'refLoadingWgt',
                    width: 110,
                    renderer: 'renderBlueColorForFloat'
                },
                {
                    xtype: 'numbercolumn',
                    align: 'right',
                    dataIndex: 'msrmt',
                    text: { type: 'bundle', key: 'loading_DocM3' },
                    reference: 'refLoadingMsrmt',
                    width: 110,
                    renderer: 'renderBlueColorForFloat'
                },
                {
                    xtype: 'numbercolumn',
                    align: 'right',
                    dataIndex: 'pkgQty',
                    text:{ type: 'bundle', key: 'loading_DocQty' },
                    reference: 'refLoadingPkgQty',
                    width: 110,
                    renderer: 'renderBlueColorForInt'
                }, {
                    xtype: 'numbercolumn',
                    align: 'right',
                    text:{ type: 'bundle', key: 'loading_ActMT' },
                    dataIndex: 'totInWgt',
                    reference: 'refLoadingTotInWgt',
                    width: 110,
                    renderer: 'renderRedColorForFloat'
                },
                {
                    xtype: 'numbercolumn',
                    align: 'right',
                    text:{ type: 'bundle', key: 'loading_ActM3' },
                    dataIndex: 'totInMsrmt',
                    reference: 'refLoadingTotInMsrmt',
                    width: 110,
                    renderer: 'renderRedColorForFloat'
                },
                {
                    xtype: 'numbercolumn',
                    align: 'right',
                    text: { type: 'bundle', key: 'loading_ActQty' },
                    dataIndex: 'totInPkgQty',
                    reference: 'refLoadingTotInPkgQty',
                    width: 110,
                    renderer: 'renderRedColorForInt'
                }, {
                    text: { type: 'bundle', key: 'loading_Hatch' },
                    dataIndex: 'hatchNo',
                    reference: 'refLoadingHatchNo',
                    filter: 'string',
                    width: 110
                }
               
                ]
                 
            }]
        }
    
        ]
    }]
    
    
});

