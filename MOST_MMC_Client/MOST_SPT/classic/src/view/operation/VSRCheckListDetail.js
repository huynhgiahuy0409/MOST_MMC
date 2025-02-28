Ext.define('MOST.view.operation.VSRCheckListDetail', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-vsrchecklistdetail',
	
	requires: [
	  
	],
	
	width: 1100,
	height: 800,
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	listeners:{
		afterrender: 'onDetailLoad'
	},
	
	config: {
		recvData : null
	},
	
	initComponent: function() {
		var me = this;
		Ext.apply(this, {
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [{
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'fieldset',
                    margin: '5 0 0 5',
                    padding : '3 3 3 3',
                    defaults: {
                        margin: '2 0 0 5',
                        labelAlign: 'right',
                        labelWidth:47
                    },
                    layout: {
                        type: 'vbox'
                    },
                    items: [{
                    	xtype:'textfield',
    					reference:'refVslCallId',
    					fieldLabel: ViewUtil.getLabel('vslcallid'),
                        width:250,
    					emptyText: ViewUtil.getLabel('vslcallid'),
    					editable:false,
    					bind: '{theVsl.vslCallId}'
                    },{
                    	reference: 'refWorkYmd',
    					width:250,
    			        xtype: 'datefield',
    			        fieldLabel: ViewUtil.getLabel('date'),
    			        anchor: '100%',
    			        editable:false,
						format: MOST.config.Locale.getShortDate(),
   						listeners: {
							change : 'onVSRInfoByShift',
						}							
                    },{
                    	xtype:'combo',
    					reference:'refShift',
    					fieldLabel: ViewUtil.getLabel('shift'),
                        width:250,
                        align : 'left',
                        editable:false,
                        bind: {
        	    			store: '{shiftCombo}'
						},
   						listeners: {
							change : 'onVSRInfoByShift',
						},							
        	    		displayField: 'shftNm',
       					valueField: 'shftId',
       					queryMode: 'local',
       					value : ''
                    }]
                },{
                	xtype :'fieldset',
                	margin: '5 5 0 5',
                	padding : '3 3 3 3',
                	flex: 1,
                	layout:{
                		type:'hbox'
                	},
                	items:[{
	                    xtype: 'container',
	                    defaults: {
	                        margin: '2 0 0 5',
	                        labelAlign: 'right',
	                        width: 220,
	                        labelWidth:80
	                    },
	                    layout: {
	                        type: 'vbox'
	                    },
	                    items: [{
                        	xtype:'textfield',
        					fieldLabel: ViewUtil.getLabel('vesselCode'),
        					editable:false,
        					bind: '{theVsl.vslCd}'
                        },{
                        	xtype:'textfield',
        					fieldLabel: ViewUtil.getLabel('vesselName'),
        					editable:false,
        					bind: '{theVsl.vslNm}'
                        },{
                        	xtype:'textfield',
        					fieldLabel: ViewUtil.getLabel('voyage'),
        					editable:false,
        					bind: '{theVsl.voyage}'
                        }]
	                },{
	                    xtype: 'container',
	                    defaults: {
	                        margin: '2 0 0 5',
	                        labelAlign: 'right',
	                        width: 230,
	                        labelWidth:75
	                    },
	                    layout: {
	                        type: 'vbox'
	                    },
	                    items: [{
                        	xtype:'textfield',
        					fieldLabel: ViewUtil.getLabel('sA'),
        					editable:false,
        					name: 'berthLoc',
        					bind: '{theVsl.arrvSaId}'
                        },{
                        	xtype:'datetimefield',
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
        					fieldLabel: ViewUtil.getLabel('eta'),
        					editable:false,
        					name: 'storLoc',
        					bind: '{theVsl.eta}'
                        },{
                        	xtype:'datetimefield',
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
        					fieldLabel: ViewUtil.getLabel('etd'),
        					editable:false,
        					name: 'depSaId',
        					bind: '{theVsl.etd}'
                        }]
	                },{
	                    xtype: 'container',
	                    defaults: {
	                        margin: '2 0 0 5',
	                        labelAlign: 'right',
	                        width: 240,
	                        labelWidth:120
	                    },
	                    layout: {
	                        type: 'vbox'
	                    },
	                    items: [{
                        	xtype:'textfield',
        					fieldLabel: ViewUtil.getLabel('berLoc'),
        					editable:false,
        					name: 'berthLoc',
        					bind: '{theVsl.berthLoc}'
                        },{
                        	xtype:'textfield',
        					fieldLabel: ViewUtil.getLabel('storeLoc'),
        					editable:false,
        					name: 'storLoc'
                        },{
	                    	xtype:'button',
	                    	text:ViewUtil.getLabel('verify'),
	                    	reference:'refBtnVerify',
	                    	margin:'5 0 0 45',
	                    	width: 200,
	                    	listeners:{
	                    		click:'onVerify'
	                    	}
	                    }]
	                }]
                }]
            },
			{ // Row : 2
                xtype: 'tabpanel',
                flex:1,
                deferredRender:false, //all tab load
                defaults: {
                	margin: '0 0 0 0',
                },
                listeners:{
	            	tabchange:'onTabChange'
	            },
	            margin: '5 5 5 5',
                items: [{
                	xtype:'panel',
                	layout: 'fit',
                	title: ViewUtil.getLabel('manPower'),
                	items : [{
						xtype: 'app-manpower',
			    		reference: 'refManPower'
					}]
                },{
                	xtype:'panel',
                	layout: 'fit',
                	title: ViewUtil.getLabel('stevedore'),
                	items : [{
						xtype: 'app-stevedore',
			    		reference: 'refStevedore'
					}]
                },{
                	xtype:'panel',
                	layout: 'fit',
                	title: ViewUtil.getLabel('portCrane'),
                	items : [{
						xtype: 'app-portcrane',
			    		reference: 'refPortCrane'
					}]
                },{
                	xtype:'panel',
                	layout: 'fit',
                	title: ViewUtil.getLabel('forklift'),
                	items : [{
						xtype: 'app-forklift',
			    		reference: 'refForklift'
					}]
                },{
                	xtype:'panel',
                	layout: 'fit',
                	title: ViewUtil.getLabel('trailer'),
                	items : [{
						xtype: 'app-trailer',
			    		reference: 'refTrailer'
					}]
                },{
                	xtype:'panel',
                	layout: 'fit',
                	title: ViewUtil.getLabel('mechanicalEquipment'),
                	items : [{
						xtype: 'app-mechanicalequipment',
			    		reference: 'refMechanicalEquipment'
					}]
                }]
			}]
		});
		me.callParent();
	}
});