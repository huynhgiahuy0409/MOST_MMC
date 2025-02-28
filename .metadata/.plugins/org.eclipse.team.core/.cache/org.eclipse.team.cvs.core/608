Ext.define('MOST.view.vms.VesselScheduleOfPort', {
	/**
     * @memberOf TSB
     */
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-vesselscheduleofport',
	requires: [
	],

	lblPortVesselName: {type: 'bundle', key: 'portvesselname'},
	lblPortVesselVoyage: {type: 'bundle', key: 'portvesselvoyage'},
	lblPortVesselAeu: {type: 'bundle', key: 'portvesselaeu'},
	lblEtaDtm: {type: 'bundle', key: 'etadtm'},
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	constructor: function (config) {
        this.callParent(arguments);
    },	
	
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [{
				xtype: 'panel',
				flex: 1,
				scrollable: false,
				items:[{
					xtype: 'grid',
					reference: 'refVesselScheduleOfPortGrid',
					bind: {
						store: '{vesselScheduleOfPortStore}'
					},
					height: 300,
	 				columns: {
	 					defaults: {
	 						style: 'text-align: center'
	 					},
	 					items: [{
	 						header: me.lblPortVesselName,
	 						dataIndex: 'portVesselName',
	 						width: 215,
	 						align: 'left'
	 					},{
	 						header: me.lblPortVesselVoyage,
	 						dataIndex: 'portVesselVoy',
	 						width: 50,
	 						align: 'center'
	 					},{
	 						header: 'TAG',
	 						dataIndex: 'tag',
	 						width: 50,
	 						align: 'center'
	 					},{
	 						header: 'ETA/B/D',
//	 						header: me.lblEtaDtm,
	 						dataIndex: 'portDate',
	 						width: 160,
	 						align: 'center',
	 						formatter: 'date("Y-m-d H:i")'
	 					},{
	 						header: 'Status',
	 						dataIndex: 'status',
	 						width: 100,
	 						align: 'center'
	 					},{
	 						header: 'QTY',
	 						dataIndex: 'portVesselQty',
	 						width: 80,
	 						align: 'center'
	 					},{
	 						header: 'CARGO',
	 						dataIndex: 'portCargoCode',
	 						width: 80,
	 						align: 'center'
	 					},{
	 						header: '',
	 						width: 5							
	 					}]
	 				}
				},{
					xtype: 'grid',
					flex: 1,
					reference: 'refVesselScheduleOfPortSumGrid',
					bind: {
						store: '{vesselScheduleOfPortSumStore}'
					},
					height: 200,
	 				columns: {
	 					defaults: {
	 						style: 'text-align: center'
	 					},
	 					items: [{
	 						dataIndex: 'winDayQty',
	 						width: 215,
	 						align: 'left'
	 					}]
	 				}
				}]
			}]
		});
		me.callParent(arguments);
	}
	
});
