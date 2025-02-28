Ext.define('MOST.view.vms.VesselList', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.app-vessellist',
	requires: [
//TO-MIG	    'VMS.config.Locale'//,
		//'VMS.view.vms.PortRotationModel',
		//'VMS.view.vms.PortRotationController'
	],

	requires: [
//TO-MIG   		'VMS.config.Locale'
   	],

	bind: {
		store: '{vesselStore}'
	},
   	
	listeners: {
		cellclick: 'onCellClick'
	},

	//lblSvcLaneCd: {type: 'bundle', key: 'lane'},
	//lblImoNo: {type: 'bundle', key: 'imono'},
	//lblSvcCode: {type: 'bundle', key: 'svccode'},
	lblVesselKind : {type: 'bundle', key: 'vesselkind'},
	lblRouteCode : {type: 'bundle', key: 'route'},
	lblCallSign : {type : 'bundle', key: 'callsign'},
	lblVslNm: {type: 'bundle', key: 'name'},
	
    layout: {type: 'fit', align: 'stretch'},    

	initComponent: function() {
    	me = this;
		
	    Ext.apply(this, {
	    	
			columns: [
				new Ext.grid.RowNumberer({
				width: 50,
				header: '',
				align: 'center', sortable: false
		    }), {
				header: me.lblVesselKind,
				dataIndex: 'vesselKind',
				minWidth: 100, align: 'center',
				width: 100,	editable: false,
//				,  //, disabled: true, hidden: true, hideable: false	
				renderer: function(value, metaData, record, rowIndex, colIndex, store) {
					if (record.data.vesselKind === 'BK') {
						return 'Break Bulk';
					} else if (record.data.vesselKind === 'DN') {
						return 'Dry Bulk';
					} else if (record.data.vesselKind === 'CR') {
						return 'RORO';
					} else {
						//return '연안해송';
						//modified by Movie (2021.12.06)
						return 'Wind Power';
					}
//					metaData.style =  'background: #' + record.data.svcLaneColor + ';';	
					//metaData.Attr = 'style="background-color:#' + record.data.bColor + ';color:#' + record.data.fColor + ';"';
//					return value;
            	}
			},
			/*,{  					
				header: this.lblImoNo,
				dataIndex: 'imoNo',
				minWidth: 80, align: 'center',
				width: 80,	editable: false,  //, disabled: true, hidden: true, hideable: false
			}*/
			{	  					
				header: me.lblCallSign,
				dataIndex: 'callSign',
				minWidth: 80, align: 'center',
				width: 80,	editable: false  //, disabled: true, hidden: true, hideable: false		
			},{	  					
				header: me.lblVslNm,
				dataIndex: 'vesselName',
				minWidth: 180, align: 'left', 
				style: 'text-align:center',
				width: 180,	editable: false  //, disabled: true, hidden: true, hideable: false
			}],
			
			dockedItems: [{
				xtype: 'toolbar',
				layout : {
					type : 'vbox',
					//align : 'stretch'
					align : 'left'
				},
				defaults:{
					margin : '0 0 5 0'
				},
				items: [
					{
						xtype: 'toolbar',
						enableOverflow: true,
						items: [
							{
								xtype: 'button',
								iconCls: 'x-fa fa-ship',
								text: ViewUtil.getLabel('vesselDetail'),
								handler: 'onVesselParticularClick'
							}, '->', {
								xtype: 'button',
								margin: '0 0 0 190',
								iconCls: 'x-fa fa-map-marker',
								text: ViewUtil.getLabel('originalPos'),
								listeners:{
									click: 'onOriginalLocationSet'
								}
							}
						]
					},{
					xtype: 'combo',
					fieldLabel: me.lblVesselKind,
					reference: 'refVesselKindCbo',
					emptyText: 'vesselkind',
					displayField: 'value',
					valueField: 'code',
					queryMode: 'local',
					value: 'ALL',
					bind: {
						store: '{vesselKindLocalStore}'
					},
					listeners: {
						select: 'onSetFilter'
					}
				}]
			}]
	    });
	    me.callParent();
	    
	}
});