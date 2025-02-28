Ext.define('MOST.view.controller.StaffAndEquipmentDetailPopUp', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.app-staffandequipmentdetailpopup',
	
	requires: [
		'Ext.plugin.Viewport',
		
	],
	
	controller: 'staffandequipmentdeploymentpopup',
	
	viewModel: {
		type: 'staffandequipmentdeployment'
	},
	
	width:1300,
	height:580,
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	listeners:{
		afterrender: 'onDetailLoad',
		destroy:'onDetailDestroy'
	},
	
	

	lblJpvc: {type: 'bundle', key: 'jpvc'},
	lblEta: {type: 'bundle', key: 'eta'},
	lblArrvSaId: {type: 'bundle', key: 'arrvSaId'},
	lblStoreLoc: {type: 'bundle', key: 'storeLoc'},
	lblBerLoc: {type: 'bundle', key: 'berLoc'},
	lblVoyage: {type: 'bundle', key: 'voyage'},
	lblScn: {type: 'bundle', key: 'scn'},
	lblFlag: {type: 'bundle', key: 'flag'},
	lblSNLDSA: {type: 'bundle', key: 'SNLDSA'},
	lblVesselname: {type: 'bundle', key: 'vesselname'},
	lblBlno: {type: 'bundle', key: 'blno'},
	lblDate: {type: 'bundle', key: 'date'},
	lblShift: {type: 'bundle', key: 'shift'},
	
	lblManPower: {type: 'bundle', key: 'manPower'},
	lblStevedore: {type: 'bundle', key: 'stevedore'},
	lblPortCrane: {type: 'bundle', key: 'portCrane'},
	lblForklift: {type: 'bundle', key: 'forklift'},
	lblTrailer: {type: 'bundle', key: 'trailer'},
	lblMechanicalEquipment: {type: 'bundle', key: 'mechanicalEquipment'},
	
	lblPurpose:{type:'bundle', key:'purpose'},
	lblVslNm:{type:'bundle', key:'vesselname'},
	lblBerthLoc:{type:'bundle', key:'berthingLoc'},
	lblCgType:{type:'bundle', key:'cargoTp'},
	lblEtb:{type:'bundle', key:'etb'},
	lblAtd:{type:'bundle', key:'atd'},
	lblRetrieveStaffEquip:{type:'bundle', key:'retreivestaffequip'},
	
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
                xtype: 'fieldset',
                height: 130,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
	                    xtype: 'container',
	                    defaults: {
	                        margin: '5 0 0 5',
	                        labelAlign: 'right',
	                        labelWidth:95
	                    },
	                    layout: {
	                        type: 'vbox',
	                        align: 'stretch'
	                    },
	                    items: [
                        {
                        	xtype:'jpvcfield',
        					fieldLabel: me.lblJpvc,
        					editable:false,
        					//width: 250,
        					name: 'vslCallId',
        					reference: 'refVslCallId',
        					bind: {
        						value:'{theSearchDetail.vslCallId}'
        					}
                        },{
                        	xtype:'textfield',
        					fieldLabel: me.lblPurpose,
        					bind: {
            	    			value:'{theSearchDetail.purpTpCdNm}'
            	    		},
        					editable:false,
        					width: 250,
        					matchFieldWidth: true,
        	                width:220,
        					queryMode: 'local',
        					name: 'purpose',
        					reference: 'txtPurpose'
                        }]
	                },{
	                    xtype: 'container',
	                    layout: {
	                        type: 'vbox',
	                        align: 'stretch'
	                    },
	                    items: [{
    	                    xtype: 'container',
    	                    defaults: {
    	                        margin: '5 0 0 5',
    	                        labelAlign: 'right',
    	                        labelWidth:95
    	                    },
    	                    layout: {
    	                        type: 'hbox',
    	                        align: 'stretch'
    	                    },
    	                    items: [{
    	                        	xtype:'datefield',
    	        					fieldLabel: me.lblDate,
    	        					editable:false,
    	        					format: MOST.config.Locale.getShortDate(),
    	        					width: 250,
    	        					name: 'workYmd',
    	        					reference: 'txtWorkYmd',
    	        					bind: '{theSearchDetail.workYmd}'
    	                    },{
	                        	xtype:'textfield',
	        					fieldLabel: me.lblVslNm,
	        					editable:false,
	        					width: 250,
	        					name: 'vesselName',
	        					reference: 'txtVslNm',
	        					bind: '{theSearchDetail.vslNm}'
	                    }]
	               },{
    	                    xtype: 'container',
    	                    defaults: {
    	                        margin: '5 0 0 5',
    	                        labelAlign: 'right',
    	                        labelWidth:95
    	                    },
    	                    layout: {
    	                        type: 'hbox',
    	                        align: 'stretch'
    	                    },
    	                    items: [{
                            	xtype:'textfield',
            					fieldLabel: me.lblShift,
            					editable:false,
            					width: 250,
            					name: 'shift',
            					reference: 'txtShift',
            					bind: {
                	    			value: '{theSearchDetail.shftNm}'
                	    		},
                                matchFieldWidth: true,
            					queryMode: 'local',
            			        editable: false,
                            },{
                            	xtype:'textfield',
            					fieldLabel: me.lblCgType,
            					editable:false,
            					width: 250,
            					name: 'flagCd',
            					reference:'txtCgType',
            					bind: '{theSearchDetail.cgTpNm}'
                            }]
                        },{
    	                    xtype: 'container',
    	                    defaults: {
    	                        margin: '5 0 0 5',
    	                        labelAlign: 'right',
    	                        labelWidth:95
    	                    },
    	                    layout: {
    	                        type: 'hbox',
    	                        pack : 'end'
    	                    },
    	                    items: [{
    	                    	xtype:'button',
    	                    	text:me.lblRetrieveStaffEquip,
    	                    	reference:'btnRetrieveStaffEquip',
    	                    	iconCls: 'x-fa fa-search',
    	                    	listeners:{
    	                    		click:'onRetrieveStaffEquip'
    	                    	}
    	                    },{
                            	xtype:'textfield',
            					fieldLabel: me.lblBerthLoc,
            					editable:false,
            					width: 250,
            					name: 'berthLoc',
            					reference:'txtBerthLoc',
            					bind: '{theSearchDetail.berthLoc}'
                            }]
                        }]
	                },{
	                    xtype: 'container',
	                    defaults: {
	                        margin: '5 0 0 5',
	                        labelAlign: 'right',
	                        labelWidth:95
	                    },
	                    layout: {
	                        type: 'vbox',
	                        align: 'stretch'
	                    },
	                    items: [{
        					xtype: 'datefield',
                            fieldLabel: me.lblEta,
                            bind: '{theSearchDetail.eta}',
                            width: 310,
                            reference:'txtEta',
                            readOnly : true,
                            format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
                        },{
                        	xtype:'datefield',
        					fieldLabel: me.lblEtb,
        					width: 310,
        					name: 'eta',
        					reference:'txtEtb',
        					bind: '{theSearchDetail.eta}',
        					readOnly : true,
        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
                        },{
                        	xtype:'datefield',
        					fieldLabel: me.lblAtd,
        					readOnly:true,
        					width: 310,
        					name: 'eta',
        					reference:'txtAtd',
        					bind: '{theSearchDetail.atd}',
        					format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds()
                        }]
	                }
                ]
            },
			{ // Row : 2
				xtype: 'fieldset',
				height:560,
				layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
	                {
	                    xtype: 'tabpanel',
	                    height:554,
	                    deferredRender:false, //all tab load
	                    defaults: {
	                    	margin: '0 0 0 0',
	                    },
	                    items: [
                        {
                        	xtype:'panel',
                        	title: me.lblManPower,
                        	reference:'refStaffManPowerPnl',
                        	autoScroll: true,
                        	autoHeight: false,
                        	loadMask: true,
                        	disabled:false,
				    		layout:'fit',
                        	items : [
        						{
        							xtype: 'app-staffandequipmentmanpower',
        				    		reference: 'refStaffManPower',
        				    		flex: 1,
        				    		
        						}
        					]
                        },
                        {
                        	xtype:'panel',
                        	title: me.lblPortCrane,
                        	reference:'refStaffPortCranePnl',
                        	autoScroll: true,
                        	autoHeight: false,
                        	loadMask: true,
				    		layout:'fit',
				    		disabled:false,
                        	items : [
        						{
        							xtype: 'app-staffandequipmentportcrane',
        				    		reference: 'refPortCrane',
        				    		flex: 1,
        				    		
        						}
        					]
                        },{
                        	xtype:'panel',
                        	title: me.lblForklift,
                        	reference:'refStaffForkLiftPnl',
                        	loadMask: true,
                        	disabled:false,
                        	items : [
        						{
        							xtype: 'app-staffandequipmentforklift',
        				    		reference: 'refForklift',
        				    		flex: 1
        						}
        					]
                        },
                        {
                        	xtype:'panel',
                        	title: me.lblStevedore,
                        	reference:'refStaffStevedorePnl',
                        	loadMask: true,
                        	disabled:false,
                        	items : [
        						{
        							xtype: 'app-staffandequipmentstevedore',
        				    		reference: 'refStevedore',
        				    		flex: 1
        						}
        					]
                        }]
	                }]
			}]
		});
		me.callParent();
	}
});