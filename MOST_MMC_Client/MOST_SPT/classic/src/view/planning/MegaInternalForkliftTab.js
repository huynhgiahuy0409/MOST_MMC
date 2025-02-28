Ext.define('MOST.view.planning.MegaInternalForkliftTab', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-megainternalforklifttab',
	
	requires: [
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	flex:1,
	
	lblMegaNo: {type: 'bundle', key: 'megaNo'},
	lblVslCallId: {type: 'bundle', key: 'jPVC'},
	lblReqr: {type: 'bundle', key: 'reqr'},
	lblReqDt: {type: 'bundle', key: 'spaceMovementRequestReqDt'},
	lblShftNm: {type: 'bundle', key: 'shftNm'},
	lblWorkYmd: {type: 'bundle', key: 'workYmd'},
	lblLocId: {type: 'bundle', key: 'whNo'},
	lblSndo: {type: 'bundle', key: 'sndo'},
	lblCapaDescr: {type: 'bundle', key: 'flCapa'},
	lblReqQty: {type: 'bundle', key: 'reqQty'},
	lblWhQty: {type: 'bundle', key: 'whQty'},
	lblConfmQty: {type: 'bundle', key: 'confmQty'},
	lblServiceDate: {type: 'bundle', key: 'workYmd'},
	lblWarehouse: {type: 'bundle', key: 'warehouse'},
	lblForwarder: {type: 'bundle', key: 'forwarder'},
	lblShift: {type: 'bundle', key: 'shift'},
	lblPurpose: {type: 'bundle', key: 'purpose'},
	lblJpvc: {type: 'bundle', key: 'jpvc'},
	lblSa: {type: 'bundle', key: 'sa'},
	lblReqQty: {type: 'bundle', key: 'reqQty'},
	lblWhQty: {type: 'bundle', key: 'whQty'},
	lblConfQty: {type: 'bundle', key: 'confmQty'},
	lblTotal: {type: 'bundle', key: 'total'},
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId :'singleGridEditor',
			listeners: {
				cancelEdit: 'onCancelEdit',
				validateedit: 'onValidateEdit',
				edit: 'onEdit'
			}
		});
		
		Ext.apply(me, {
			items: [{
					xtype:'fieldset',
					layout:{
						type:'hbox'
					},
					margin : '5 0 0 0',
					defaults:{
						labelAlign:'right',
						labelWidth: 80,
						margin : '5 0 0 0',
					},
					items:[
						 {
		                    xtype: 'textfield',
		                    fieldLabel: 'MEGA No',
		                    flex: 1,
		                    editable: false,
		                    bind: '{selectedForkLift.megaNo}'
		                },{
		                    xtype: 'textfield',
		                    fieldLabel: 'F/L Cap',
		                    flex: 2,
		                    editable: false,
		                    bind: '{selectedForkLift.capaDescr}'
		                },{
		                    xtype: 'textfield',
		                    fieldLabel: 'Req.Qty',
		                    flex: 1,
		                    editable: false,
		                    bind: '{selectedForkLift.reqQty}'
		                },{
		                    xtype: 'numberfield',
                            minValue : 0,
	    					maxValue: 999999,
		                    fieldLabel: 'Confirmed',
		                    flex: 1,
		                    allowBlank: false,
		                    bind: '{selectedForkLift.confmQty}'
		                },{
		                    xtype: 'numberfield',
	                        minValue : 0,
	                        maxValue: 999999,
	                        allowBlank: false,
	                        flex: 1,
		                    fieldLabel: 'W/H Qty',
		                    bind: '{selectedForkLift.whQty}'
		                }
					]
				},{
    				xtype: 'grid',
    				reference: 'refMegaInternalGrid',
    				flex : 1,
    				margin : '5 0 0 0',
    				stateful : true,
    				stateId : 'stateMegaInternalGrid',
    				plugins: [
    					//rowEditing, 
    					'gridexporter',
    					'gridfilters',
    					'clipboard'
    	    		],
    	    		bind: {
    	    			store: '{megaInternal}'
    	    		},
    	    		selModel: {
    					type: 'spreadsheet',
    					cellSelect: false
    				},
    				listeners: {
    					//celldblclick: 'onDblClick',
    					cellClick: 'onForkliftGridClick'
    				},
    	            
    				columns: {
    	            	defaults: {
    	            		style : 'text-align:center',
    	            		align : 'center'
    	            	},
    	            	items: [
                		{
                			header: me.lblMegaNo,
                			dataIndex: 'megaNo',
                			reference: 'refMegaNo',
                			filter: 'string',
                			width: 120,
              				renderer : 'renderMegaNoColor'
                		},
                		{
                			header: me.lblVslCallId,
                			dataIndex: 'vslCallId',
                			reference: 'refVslCallId',
                			filter: 'string',
                			width: 180
                		},
                		{
                			header: me.lblReqr,
                			dataIndex: 'reqr',
                			reference: 'refReqr',
                			filter: 'string',
                			align: 'left',
                			width: 250
                		},
                		{
                			header: me.lblReqDt,
                			dataIndex: 'reqDt',
                			reference: 'refReqDt',
                			xtype: 'datecolumn',
    						format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
    						width: 130,
							exportRenderer: function(value, record, dataIndex, cell, column){
								return Ext.util.Format.date(value, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
							}
                		},
                		{
                			header: me.lblShftNm,
                			dataIndex: 'shftNm',
                			reference: 'refShftNm',
                			filter: 'string',
                			width: 110
                		},
                		{
                			header: me.lblWorkYmd,
                			dataIndex: 'workYmd',
                			reference: 'refWorkYmd',
                			xtype: 'datecolumn',
    						format: MOST.config.Locale.getShortDate(),
                			width: 110,
							exportRenderer: function(value, record, dataIndex, cell, column){
								return Ext.util.Format.date(value, MOST.config.Locale.getShortDate());
							}
                		},
                		{
                			header: me.lblLocId,
                			dataIndex: 'locId',
                			reference: 'refLocId',
                			filter: 'string',
                			align: 'left',
                			width: 110
                		},
                		{
                			header: me.lblSndo,
                			dataIndex: 'sndo',
                			reference: 'refSndo',
                			filter: 'string',
                			width: 110
                		},
                		{
                			header: me.lblCapaDescr,
                			dataIndex: 'capaDescr',
                			reference: 'refCapaDescr',
                			filter: 'string',
                			width: 110
                		},
                		{
                			header: me.lblReqQty,
                			dataIndex: 'reqQty',
                			reference: 'refReqQty',
                			xtype: 'numbercolumn',
    						align : 'right',
    						format: '0,000',
                			width: 110
                		},
                		{
                			header: me.lblConfmQty,
                			dataIndex: 'confmQty',
                			reference: 'refConfmQty',
                			xtype: 'numbercolumn',
    						align : 'right',
    						format: '0,000',
    						editor : {
    							xtype : 'numberfield',
    							minValue : 0,
    							maxValue: 9999999999,
    							align : 'right',
    							decimalPrecision: 2,
    							selectOnFocus : true
    						},
                			width: 110
                		},
                		{
                			header: me.lblWhQty,
                			dataIndex: 'whQty',
                			reference: 'refWhQty',
                			xtype: 'numbercolumn',
    						align : 'right',
    						format: '0,000',
    						editor : {
    							xtype : 'numberfield',
    							minValue : 0,
    							maxValue: 9999999999,
    							align : 'right',
    							decimalPrecision: 2,
    							selectOnFocus : true
    						},
                			width: 110
                			
                		}
    	            	]
    				}
    		    }
			]
		});
		
		me.callParent();
	}
});

