Ext.define('MOST.view.vms.VesselLocationModify', {
//	extend: 'Ext.grid.Panel',
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-vessellocationmodify',
	requires: [
//TO-MIG	    'VMS.config.Locale',
	    'Ext.grid.plugin.RowEditing',
	    'Ext.grid.selection.SpreadsheetModel'
	],
   	
	lblVesselName: {type: 'bundle', key: 'coastMaritimeVesselName'},
    lblLongitude: {type: 'bundle', key: 'longitude'},
    lblLangitude: {type: 'bundle', key: 'latitude'},    
    lblHeading: {type: 'bundle', key: 'heading'},    

	initComponent: function() {
    	me = this;
    	
	    Ext.apply(this, {

			xtype: 'form',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'numberfield',
				padding: '5 5 2 5',
				reference: 'refLongitudeModify',
				fieldLabel: me.lblLangitude,
				editable: true,
				labelWidth: 80,
				width: 70,
				bind: '{theVessel.latitude}'
			}, {
				xtype: 'numberfield',
				padding: '5 5 2 5',
				reference: 'refLangitudeModify',
				fieldLabel: me.lblLongitude,
				editable: true,
				labelWidth: 80,
				width: 70,
				bind: '{theVessel.longitude}'
			},{
				xtype: 'numberfield',
				padding: '5 5 2 5',
				reference: 'refHeadingModify',
				fieldLabel: me.lblHeading,
				editable: true,
				labelWidth: 80,
				width: 70,
				bind: '{theVessel.heading}'
			}],
			buttons: [{ 
				text: ViewUtil.getLabel('modify'), 
				handler: 'onVesselLocationModifyCrud',
				formBind: true
			}, { 
				text: ViewUtil.getLabel('cancel'),
				handler: function() {
					me.up().close();
				}
			}]
		
	    	
//	    	xtype: 'grid',
//			reference: 'refVesselLocationModifyGrid',
//			plugins: [rowEditing],
////			listeners: {
////				celldblclick : 'onVesselLocationModifyCellDblClick'
////			},
//			bind: {
//				store: '{}'
//			},
//			columns: {
//            	defaults: {
//            		style : 'text-align:center'
//            	},
//            	items: [{
//            		header: me.lblLangitude,
//            		dataIndex: 'latitude',
//            		minWidth: 80, align: 'center',
//            		width: 80
//            	},{	  					
//            		header: me.lblLongitude,
//            		dataIndex: 'longitude',
//            		minWidth: 180, align: 'center', 
//            		width: 180
//            	},{	  					
//            		header: me.lblHeading,
//            		dataIndex: 'heading',
//            		minWidth: 180, align: 'center', 
//            		width: 180
//            	}],
//			}
			
//			dockedItems: [{
//				xtype: 'toolbar',
//				layout : {
//					type : 'vbox',
//					//align : 'stretch'
//					align : 'left'
//				},
//				defaults:{
//					margin : '0 0 5 0'
//				},
//				items: [{
//					xtype: 'toolbar',
//					items: 
//					[
//					{
//						xtype: 'button',
//						text: me.btnRemove,
//						iconCls: 'x-fa fa-minus',
//						listeners: 
//						{
//							click: 'onRemove'
//						},
//						disabled: false
//					}]
//				}]
//			}]
	    });
	    me.callParent();
	    
	}
});