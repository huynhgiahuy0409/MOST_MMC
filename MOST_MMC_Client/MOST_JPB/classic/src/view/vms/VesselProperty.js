Ext.define('MOST.view.vms.VesselProperty', {
	/**
     * @memberOf TSB
     */
	extend: 'Ext.panel.Panel',

	alias: 'widget.app-vesselproperty',
	requires: [
//TO-MIG		'VMS.config.Locale'
	],
	
	layout:{
		type : 'accordion'
	},
	
	scrollable: false,
	
	lblVesselDetailTitle: {type:'bundle', key:'vesseldetailtitle'},
	lblPortDetailTitle: {type:'bundle', key:'portdetailtitle'},
	
	initComponent: function() {
		var me = this;		 
    	var imgLogo = new Image();
    	//imgLogo.src = 'resources/images/dashboard/MaerskLine-logo.png';
    	
		Ext.apply(me, {
			items: [{
				xtype: 'panel',
				title: me.lblVesselDetailTitle,
            	reference: 'refServiceVesselDetail',
				flex: 1,
                items: [{
                	xtype : 'panel',
                	items : [{
                		xtype : 'image',
                		//src: './resources/images/aisship/port60x60_1.png',
                		margin: '1 0 0 0',
                		height : 200
                	}]
                },{
                	xtype : 'panel',
                	items : [{
                		xtype : 'propertygrid',
    					layout : 'fit',
    					sortableColumns : true,
    					bind: {
    						source : {
    							"a00vslName" : '{aisinfo.vesselName}',
//    							"a01lastSeenAt" : '{aisinfo.moveDttm}',
//    							"a02mmsiId" : '{aisinfo.mmsiId}',
    							"a03callSign" : '{aisinfo.callSign}',
//    							"a04imoNo" : '{aisinfo.imoNo}',
//    							"a05moveStatus" : '{aisinfo.moveStatus}',
    							"a06heading" : '{aisinfo.heading}' + ' º'
//    							"a07speed" : '{aisinfo.speed}' + ' knots',
//    							"a08length" : '{aisinfo.length}' + ' m',
//    							"a09vslType" : '{aisinfo.vslType}',
//    							"a10breadth" : '{aisinfo.width}' + ' m',
//    							"a11draught" : '{aisinfo.draught}' + ' m',
//    							"a12dest" : '{aisinfo.dest}',
//    							"a13eta" : '{aisinfo.eta}'
    						}
    					},
    					sourceConfig : {
    						a00vslName : {
    							displayName : MOST.getApplication().bundle.getMsg('vesselname'),
    							editor : {
    								xtype : 'textfield',
    								readOnly : true
    							}
    						},
    						/*a01lastSeenAt : {
    							displayName: VMS.getApplication().bundle.getMsg('lastseenat'),
    							editor : {
    								xtype : 'textfield',
    								readOnly : true
    							}
    						},
    						a02mmsiId : {
    							displayName: VMS.getApplication().bundle.getMsg('mmsi'),
    							editor : {
    								xtype : 'textfield',
    								readOnly : true
    							}
    						},*/
    						a03callSign : {
    							displayName: MOST.getApplication().bundle.getMsg('callsign'),
    							editor : {
    								xtype : 'textfield',
    								readOnly : true
    							}
    						},
    						/*a04imoNo : {
    							displayName: VMS.getApplication().bundle.getMsg('imono'),
    							editor : {
    								xtype : 'textfield',
    								readOnly : true
    							}
    						},*/
    						/*a05moveStatus : {
    							displayName: VMS.getApplication().bundle.getMsg('status'),
    							editor : {
    								xtype : 'textfield',
    								readOnly : true
    							}
    						},*/
    						a06heading : {
    							displayName: MOST.getApplication().bundle.getMsg('heading'),
    							editor : {
    								xtype : 'textfield',
    								readOnly : true
    							}
    						}/*,
    						a07speed : {
    							displayName: VMS.getApplication().bundle.getMsg('speed'),
    							editor : {
    								xtype : 'textfield',
    								readOnly : true
    							}
    						},
    						a08length : {
    							displayName: VMS.getApplication().bundle.getMsg('length'),
    							editor : {
    								xtype : 'textfield',
    								readOnly : true
    							}
    						},
    						a09vslType : {
    							displayName: VMS.getApplication().bundle.getMsg('shiptype'),
    							editor : {
    								xtype : 'textfield',
    								readOnly : true
    							}
    						},
    						a10breadth : {
    							displayName: VMS.getApplication().bundle.getMsg('breadth'),
    							editor : {
    								xtype : 'textfield',
    								readOnly : true
    							}
    						},
    						a11draught : {
    							displayName: VMS.getApplication().bundle.getMsg('draught'),
    							editor : {
    								xtype : 'textfield',
    								readOnly : true
    							}
    						},
    						a12dest : {
    							displayName: VMS.getApplication().bundle.getMsg('destination'),
    							editor : {
    								xtype : 'textfield',
    								readOnly : true
    							}
    						},
    						a13eta : {
    							displayName: VMS.getApplication().bundle.getMsg('eta'),
    							editor : {
    								xtype : 'textfield',
    								readOnly : true
    							}
    						}*/
    					}
                	}]
                }]
				/*170725 HS Commend
                dockedItems: [{
				    xtype: 'toolbar',
				    height : 40,
				    reference: 'refDock',
					dock: 'top',
					margin: '1 0 0 0',
					hidden: false,
					items:[{
						xtype :'label',
						text : 'Vessel Information'
					}]
                }]*/
			},{
            	xtype : 'panel',
            	title: me.lblPortDetailTitle,
            	reference: 'refPortDetail',
            	items: [
            	{
            		xtype: 'propertygrid',
            		layout: 'fit',
            		valueColumnWidth:150,
            		bind: {
            			source: {
//            				"p00portCode" 		: '{aisportinfo.portCode}',
            				"p01portName" 		: '{aisportinfo.portName}',
            				"p02portSeq" 		: '{aisportinfo.portSeq}',
//            				"p03portVesselCode" : '{aisportinfo.portVesselCode}',
            				"p04portVesselName" : '{aisportinfo.portVesselName}',
            				"p05portVesselVoy" 	: '{aisportinfo.portVesselVoy}',
            				"p06portVesselQty"	: '{aisportinfo.portVesselQty}',
//            				"p07portCargoCode"	: '{aisportinfo.portCargoCode}',
            				"p08portCargoName" 	: '{aisportinfo.portCargoName}',
//            				"p09pidCode" 		: '{aisportinfo.pidCode}',
            				"p10codeName" 		: '{aisportinfo.codeName}',
            				"p11etaDtm" 		: '{aisportinfo.etaDtm}',
            				"p12etbDtm" 		: '{aisportinfo.etbDtm}',
            				"p13etdDtm" 		: '{aisportinfo.etdDtm}',
            				"p14lngt" 			: '{aisportinfo.lngt}',
            				"p15ltud" 			: '{aisportinfo.ltud}'
            			}
            		},
            		
            		sourceConfig : {
//            			p00portCode : {
//							displayName : VMS.getApplication().bundle.getMsg('portcode'),
//							editor : {
//								xtype : 'textfield',
//								readOnly : true
//							}
//						},
						p01portName : {
							displayName : MOST.getApplication().bundle.getMsg('portname'),
							editor : {
								xtype : 'textfield',
								readOnly : true
							}
						},
						p02portSeq : {
							displayName : MOST.getApplication().bundle.getMsg('portseq'),
							editor : {
								xtype : 'textfield',
								readOnly : true
							}
						},
//						p03portVesselCode : {
//							displayName : VMS.getApplication().bundle.getMsg('portvesselcode'),
//							editor : {
//								xtype : 'textfield',
//								readOnly : true
//							}
//						},
						p04portVesselName : {
							displayName : MOST.getApplication().bundle.getMsg('portvesselname'),
							editor : {
								xtype : 'textfield',
								readOnly : true
							}
						},
						p05portVesselVoy : {
							displayName : MOST.getApplication().bundle.getMsg('portvesselvoy'),
							editor : {
								xtype : 'textfield',
								readOnly : true
							}
						},
						p06portVesselQty : {
							displayName : MOST.getApplication().bundle.getMsg('portvesselqty'),
							editor : {
								xtype : 'textfield',
								readOnly : true
							}
						},
//						p07portCargoCode : {
//							displayName : VMS.getApplication().bundle.getMsg('portcargocode'),
//							editor : {
//								xtype : 'textfield',
//								readOnly : true
//							}
//						},
						p08portCargoName : {
							displayName : MOST.getApplication().bundle.getMsg('portcargoname'),
							editor : {
								xtype : 'textfield',
								readOnly : true
							}
						},
//						p09pidCode : {
//							displayName : VMS.getApplication().bundle.getMsg('pidcode'),
//							editor : {
//								xtype : 'textfield',
//								readOnly : true
//							}
//						},
						p10codeName : {
							displayName : MOST.getApplication().bundle.getMsg('codename'),
							editor : {
								xtype : 'textfield',
								readOnly : true
							}
						},
						p11etaDtm : {
							displayName : MOST.getApplication().bundle.getMsg('etadtm'),
							editor : {
								xtype : 'textfield',
								readOnly : true
							}
						},
						p12etbDtm : {
							displayName : MOST.getApplication().bundle.getMsg('etbdtm'),
							editor : {
								xtype : 'textfield',
								readOnly : true
							}
						},
						p13etdDtm : {
							displayName : MOST.getApplication().bundle.getMsg('etddtm'),
							editor : {
								xtype : 'textfield',
								readOnly : true
							}
						},
						p14lngt : {
							displayName : MOST.getApplication().bundle.getMsg('longitude'),
							editor : {
								xtype : 'textfield',
								readOnly : true
							}
						},
						p15ltud : {
							displayName : MOST.getApplication().bundle.getMsg('latitude'),
							editor : {
								xtype : 'textfield',
								readOnly : true
							}
						}
            		}
//            		xtype: 'grid',
//     				region: 'south',
//    				bind: {store: '{portListStore}'},
//     				layout: 'fit',
//     				columns: [
//     					new Ext.grid.RowNumberer({
//     						width: 30,
//     						header: '',
//     						align: 'center', sortable: false
//     				}),{
//     					header: me.lblPort,
//     					dataIndex: 'portCode',
//     					minWidth: 70, 
//     					width: 70,	align: 'center', sortable: false, hideable: false, 
//     					renderer: function(value, metaData, record, rowIndex, colIndex, store) {
//     						metaData.style =  'background: #' + record.data.bColor + ';' + 'color: #' + record.data.fColor + ';';	
//     						return value;
//     	            	}
//     				},{
//     					header: me.lblName,
//     					dataIndex: 'portName',
//     					minWidth: 160, 
//     					width: 160,	align: 'left', style: 'text-align:center', sortable: false, hideable: false
//     				}
     				
            	}]
			}]			
		});

		me.callParent();
	}
});