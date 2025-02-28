Ext.define('MOST.view.planning.berth.BerthVesselList', {
	extend: 'Ext.panel.Panel',
	
	alias: 'widget.app-berthvessellist',
	
	requires: [
	   'MOST.config.Locale'
   ],
   
   layout : 'fit',
   
   lblVVD: {type: 'bundle', key: 'vvd'},
   lblVesselName: {type: 'bundle', key: 'vesselname'},
   lblBerth: {type: 'bundle', key: 'berth'},
   
   initComponent: function() {
	   var me = this;
	   Ext.apply(me, {
		   items: [{
               xtype: 'grid',			
               reference: 'refvessellistgrid',
               bind: {
           		store: '{plans}'
           	},
            listeners: {
         	    select: 'selectVessel'
         	},           	
           	flex: 1,
            viewConfig: {
            	getRowClass: function(rec, index) {
                    var vslBackcolor;
                	if(rec.get('atb')) {
            			vslBackcolor = rec.get('atu') ? 'berth-status-departed' :  'berth-status-berthing';
            		} else {
            			vslBackcolor = rec.get('planYn') !== 'Y' ? 'berth-status-planned' :  'berth-status-unplanned';
            		}                
                    return vslBackcolor;
                }
            },
           	columns: [
     				{
       					align: 'center',
       					width: 30,
       					tdCls: 'ID'
       				},{
     					header: me.lblVVD,
     					dataIndex: 'vesselCallId',
     					width: 120,
     					align: 'center'
     				},{
     					header: me.lblBerth,
     					dataIndex: 'berthCd',
     					width: 50,
     					align: 'center'
     				}, {
     					header: me.lblVesselName,
     					dataIndex: 'vesselName',
     					width: 170,
     					align: 'center'
     				}
     			]
           }]
	   });
	   me.callParent();
   }
});