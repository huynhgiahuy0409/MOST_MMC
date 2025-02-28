Ext.define('MOST.view.administrator.ListOfFreshWaterDetail', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-listoffwsdetail',

    requires: [
    ],
    
    title:'Fresh Water Service Detail',
	
	layout:'fit',
	
	listeners:{
		afterrender: 'onDetailLoad',
	},

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

	initComponent: function() {
		var me = this;
		Ext.apply(this, {
			defaults:{
				margin: '2 5 2 0' // top, right, bottom, left
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
                            margin: '0 0 0 5',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            defaults:{
        						margin: '0 0 5 0',
        						labelAlign: 'right',
        						labelWidth: 60
        					},
                            items: [
                                {
                                    xtype: 'container',
                                    layout: { type: 'hbox'},
                                    defaults:{
                						margin: '0 0 0 5',
                						labelAlign: 'right'
                					},
                                    items: [
                        				{
                                     		xtype: 'radiogroup',
                                     		columns: 1,
                                            vertical: true,
                                            margin:'0 0 0 5',
                                            reference:'refRadioGroupWorkingTime',
                                            //flex:0.5,
                                            // listeners: {
        		                            //     change: 'onJpvcRadioDetailChange'
        		                            // },
                                            items:[{ 
                                            		boxLabel: ViewUtil.getLabel('fwlVslCallId'), 
                                            		inputValue: 'jpvc',
                                            		name:'rb',
                                            		flex:1,
                                            		reference:'refRadioJpvc',
                                            		checked:true,
													readOnly: true
                                            	
                                            	},{ 
                                            		boxLabel: ViewUtil.getLabel('fwlNonVsl'),
                                            		inputValue: 'nonjpvc' ,
                                            		name:'rb',
                                            		flex:1,
                                            		reference:'refRadioNonJpvc',
													readOnly: true
                                            	}]
                                     	},{
	                                        xtype: 'textfield',
	                                        flex:1,
	                                        width: 170,
	                                        reference:'refTxtJpvc',
	                                        bind:'{fwsRequestDetail.vslCallId}',
	                                        labelAlign: 'right',
	                                        triggers: {
	    					                    someField: {
	    					                        cls: 'fa-search',
	    					                        scope: 'controller',
	    					                        handler: 'openJPVCPopup'
	    					                    }
	    					                },
                                            editable: false,
                                            readOnly: true,
                                    	}
                                    ]
                                },
                                {
									xtype: 'textfield',
									flex:1,
									reference:'ctlDetailDocNo',
									fieldLabel: ViewUtil.getLabel('fwlDocNo'),
									editable: false,
                                    readOnly: true,
									bind:'{fwsRequestDetail.docNo}'
								},
								{
									xtype: 'textfield',
									flex:1,
									reference:'ctlStatus',
									fieldLabel: ViewUtil.getLabel('lblStatus'),
									editable: false,
                                    readOnly: true,
									bind:'{fwsRequestDetail.statCdNm}'
								}
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            margin: '0 0 0 5',
                            flex:1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex:1,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults:{
                						margin: '0 5 5 0',
                						labelAlign: 'right',
                						width: 250,
                						labelWidth: 70
                					},
                                    items: [
                                        {
											xtype:'textfield',
											fieldLabel: ViewUtil.getLabel('vesselCode'),
											bind:'{vslDetail.vslCd}',
											editable: false,
                                            readOnly: true,
										},{
											xtype:'textfield',
											fieldLabel: ViewUtil.getLabel('sa'),
											bind:'{vslDetail.arrvSaId}',
											editable: false,
                                            readOnly: true,
										},{
											xtype:'textfield',
											fieldLabel: ViewUtil.getLabel('berthLoc'),
											bind:'{vslDetail.berthLoc}',
											editable: false,
                                            readOnly: true,
										}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults:{
                						margin: '0 5 5 0',
                						labelAlign: 'right',
                						width: 250,
                						labelWidth: 70
                					},
                					flex:1,
                                    items: [
                                        {
											xtype:'textfield',
											fieldLabel: ViewUtil.getLabel('fwlVslName'),
											bind:'{vslDetail.vslNm}',
											editable: false,
                                            readOnly: true,
										},{
											xtype:'datefield',
											fieldLabel: ViewUtil.getLabel('fwlEta'),
											bind:'{vslDetail.eta}',
											editable:false,
                                            readOnly : true,
                                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
										
										},{
											xtype:'textfield',
											fieldLabel: ViewUtil.getLabel('fwlStorageLoc'),
											editable: false,
                                            readOnly: true,
										}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaults:{
                						margin: '0 5 5 0',
                						labelAlign: 'right',
                						width: 250,
                						labelWidth: 70
                					},
                					flex:1,
                                    items: [
                                        {
											xtype:'textfield',
											fieldLabel: ViewUtil.getLabel('fwlVslCallSign'),
											bind:'{vslDetail.callSign}',
											editable: false,
                                            readOnly: true,
										},{
											xtype:'datefield',
											fieldLabel: ViewUtil.getLabel('fwlEtd'),
											bind:'{vslDetail.etd}',
											editable:false,
                                            readOnly : true,
                                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
											
										},{
											xtype:'datefield',
											fieldLabel: ViewUtil.getLabel('fwlEtw'),
											bind:'{vslDetail.etw}',
											editable:false,
                                            readOnly : true,
                                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
										}
                                    ]
                                },
								{
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox'
                                    },
                                   defaults:{
                						margin: '0 5 0 0',
                						labelAlign: 'right',
                						width: 250,
                						labelWidth: 70
                					},
                					flex:1,
                                    items: [
                                        {
											xtype:'textfield',
											fieldLabel: ViewUtil.getLabel('fwlVoyage'),
											bind:'{vslDetail.voyage}',
											editable: false,
                                            readOnly: true,
										}
                                    ]
                                }
                            ]
                        }
                    ]
                }

                ,{
                	xtype:'container',
                	layout:{
                		align:'stretch',
                		type:'vbox'
                	},
                	reference:'refCtnInvoiceInfo',
                	items:[{
                        xtype: 'fieldset',
                        flex: 0.7,
                        margin:'0 0 0 5',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [{
                        	xtype:'container',
                        	margin: '5 0 0 5',
                        	layout:{
                        		type:'hbox',
                        		align:'stretch'
                        	},
                        	defaults:{
    			            	labelAlign: 'right',
    			            	labelWidth: 150,
    			            },
                        	items:[
                        		{
    		    					xtype:'textfield',
    	        					reference:'refTxtCompany',
    	        					fieldLabel: ViewUtil.getLabel('fwlLblCompany'),
    	                            width:300,
                   					bind:{value : '{fwsRequestDetail.comp}'},
    	                            params:{
    	                            	searchDivCd: 'SHA'
    	     	   					},
                                    editable: false,
                                    readOnly: true,
    	                        },{
    	                        	xtype:'textfield',
    	                        	margin: '0 0 0 5',
    	                        	width: 250,
    	                        	reference:'refTxtCompanyNm',
    	                        	bind: '{fwsRequestDetail.saNm}',
    	                        	editable: false,
                                    readOnly: true,
    	                        	//fieldStyle: 'background-color:#E8D4F7',
    	                        }
    	                    ]
                        },{
                        	xtype:'container',
                        	layout:{
                        		type:'hbox',
                        		align:'stretch'
                        	},
                        	margin: '5 0 0 5',
                        	defaults:{
    			            	labelAlign: 'right',
    			            	labelWidth: 150,
    			            },
                        	items:[
                        		{
    	                            xtype: 'textfield',
    	                            width: 300,
    	                            fieldLabel: ViewUtil.getLabel('reqAmt'),
    	                            reference : 'refReqTon',
    	                            bind:'{fwsRequestDetail.reqAmt}',
                                    editable: false,
                                    readOnly: true,
    	                        }]
                        },{
                        	xtype:'container',
                        	layout:{
                        		type:'hbox',
                        		align:'stretch'
                        	},
                        	margin: '5 0 0 5',
                        	defaults:{
    			            	labelAlign: 'right',
    			            	labelWidth: 150,
    			            },
                        	items:[{
                        		xtype:'datetimefield',
                        		reference:'refReqDt',
                        		fieldLabel: ViewUtil.getLabel('reqDateTime'),
                        		bind:'{fwsRequestDetail.reqDt}',
                        		allowBlank:false,
                        		width:300,
                                editable: false,
                                readOnly: true,
               					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
                        	}]
                        },{
                        	xtype:'container',
                        	layout:{
                        		type:'hbox',
                        		align:'stretch'
                        	},
                        	margin: '5 0 0 5',
                        	defaults:{
    			            	labelAlign: 'right',
    			            	labelWidth: 150,
    			            },
                        	items:[{
                        		bind:'{fwsRequestDetail.locId}',
                        		xtype: 'textfield',
								width : 300,
								reference: 'refTxtWorkingArea',
								fieldLabel: ViewUtil.getLabel('fwlLblWorkingArea'),
								editable: false,
                                readOnly: true,
								matchFieldWidth: true,
								displayField: 'cd',
								valueField: 'cd',
               					triggers: {
				                    someField: {
				                        cls: 'fa-search',
				                        scope: 'controller',
				                        //handler: 'openWorkingAreaPopup'
				                        handler: 'onTriggerClick'
				                    }
				                },
				                listeners:{
									change: function(field, newValue){
										field.setValue(newValue.toUpperCase());
									}
								}
                        	}]
                        }]
                    },{
                        xtype: 'fieldset',
                        flex: 0.7,
                        margin:'5 0 0 5',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [{
                        	xtype:'container',
                        	margin: '5 0 0 5',
                        	layout:{
                        		type:'hbox',
                        		align:'center',
                        		pack: 'center'
                        	},
                        	defaults:{
    			            	//labelAlign: 'right'
    			            },
                        	items:[{
                        		xtype:'textfield',
                        		reference:'refTxtMeterNo',
                        		bind:'{fwsRequestDetail.meterNo}',
                        		fieldLabel: ViewUtil.getLabel('meterNo'),
                        		labelWidth:150,
                        		//width:250,
                        		flex:0.3,
                                editable: false,
                                readOnly: true,
                        	},{
                        		xtype:'label',
                        		text: ViewUtil.getLabel('meterStarting'),
                        		margin: '0 -105 0 110',
                        		style: 'display:inline-block;vertical-align:middle; color:#0000ff',
                        		flex:0.7
                        	}]
                        },{
                        	xtype:'container',
                        	layout:{
                        		type:'hbox',
                        		align:'stretch'
                        	},
                        	margin: '5 0 0 5',
                        	defaults:{
    			            	//labelAlign: 'right',
    			            	
    			            },
                        	items:[{
                        		xtype:'textfield',
                        		reference:'refTxtCommencement',
                        		fieldLabel: ViewUtil.getLabel('commencement'),
                        		bind:'{fwsRequestDetail.splyStDt}',
                        		labelWidth:150,
                        		flex:0.3,
                                editable: false,
                                readOnly: true,
                        	},{
                        		xtype:'textfield',
                        		reference:'refTxtAtCommencement',
                        		fieldLabel: ViewUtil.getLabel('atCommencement'),
                        		bind:'{fwsRequestDetail.befAmt}',
                        		//labelWidth:180,
                        		labelAlign:'right',
                        		labelWidth:250,
                        		margin: '0 0 0 5',
                        		flex:0.7,
                                editable: false,
                                readOnly: true,
                        	}]
                        },{
                        	xtype:'container',
                        	layout:{
                        		type:'hbox',
                        		align:'stretch'
                        	},
                        	margin: '5 0 0 5',
                        	defaults:{
    			            	//labelAlign: 'right',
    			            	
    			            },
                        	items:[{
                        		xtype:'textfield',
                        		reference:'refTxtCompletion',
                        		fieldLabel: ViewUtil.getLabel('completion'),
                        		bind:'{fwsRequestDetail.splyEndDt}',
                        		labelWidth:150,
                        		flex:0.3,
                                editable: false,
                                readOnly: true,
                        	},{
                        		xtype:'textfield',
                        		flex:0.7,
                        		reference:'refTxtAtCompletion',
                        		fieldLabel: ViewUtil.getLabel('atCompletion'),
                        		bind:'{fwsRequestDetail.afrAmt}',
                        		labelAlign:'right',
                        		labelWidth:250,
                        		editable:false,
                        		margin: '0 0 0 5'
                        	}]
                        },{
                        	xtype:'container',
                        	layout:{
                        		type:'hbox',
                        		align:'center',
                        		pack:'center'
                        	},
                        	margin: '5 0 0 5',
                        	defaults:{
    			            	//labelAlign: 'right',
    			            	
    			            },
                        	items:[{
                        		xtype:'label',
                        		flex:0.3,
                        	},{
                        		xtype:'textfield',
                        		flex:0.6,
                        		reference:'refTxtQuantitySupp',
                        		fieldLabel: ViewUtil.getLabel('quantitySupp'),
                        		labelAlign:'right',
                        		labelWidth:250,
                        		editable: false,
                                readOnly: true,
                        		bind:'{fwsRequestDetail.qtySply}',
                        		margin: '0 0 0 5',
                        		fieldStyle: 'background-color:#c0c0c0',
                        	},{
                        		xtype:'label',
                        		text:me.lblTon,
                        		margin: '0 0 0 5',
                        		flex:0.1
                        	}]
                        }]
                    },{
                        xtype: 'container',
                        flex: 1,
                        margin:'5 0 0 5',
                        layout: {
                        	align: 'stretch',
        	                pack: 'end',
        	                type:'hbox'
                        },
                        items: [{
                    		xtype:'button',
                    		reference:'refBtnRequest',
                    		text: ViewUtil.getLabel('request'),
                    		listeners:{
                    			click:'onBtnRequestClick'
                    		},
                            hidden:true
                    	},{
                    		xtype:'button',
                    		margin:'0 0 0 5',
                    		reference:'refBtnCancelRequest',
                    		text: ViewUtil.getLabel('cancelRequest'),
                    		listeners:{
                    			click:'onBtnCancelRequestClick'
                    		},
                            hidden:true
                    	}]
                    },{
                        xtype: 'container',
                        flex: 1,
                        margin:'5 0 0 5',
                        layout: {
                        	align: 'stretch',
        	                pack: 'end',
        	                type:'hbox'
                        },
                        items: []
                    }]
                }]
		});
		
		me.callParent();
	}
});