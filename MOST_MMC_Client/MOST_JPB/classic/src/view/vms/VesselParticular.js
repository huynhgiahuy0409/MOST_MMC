Ext.define('MOST.view.vms.VesselParticular', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-vmsvesselparticular',
	requires: [
	],
	
	constructor: function (config) {
        this.callParent(arguments);
    },	
	
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				items: [{			
					xtype: 'button',
					text: ViewUtil.getLabel('changeVslLoc'),
					iconCls: 'x-fa fa-location-arrow',
					reference: 'refVesselLocationModify',
					handler: 'onVesselLocationModifyWin'
				},'->',{
					xtype: 'form',
					reference: 'refAddVesselImageForm',
					standardSubmit: false,
					layout: 'hbox',
					items: [{
						xtype: 'filefield',
						name: 'file',
						buttonText: ViewUtil.getLabel('upload') + ' Image',
						buttonOnly: true,
						width:100,
						labelWidth: 0,
						columnWidth: 0,
						margin:  '0 15 0 0',
						accept: [
			                'image/png',
			                'image/jpeg'
			            ],
						buttonConfig: {
							iconCls: 'x-fa fa-plus'
						},
						listeners: {
							change: 'onAddVesselImage'
						}
					},{
						xtype : 'button',
						itemId : 'deleteItemId',
						reference : 'refBtnDelete',
						text : ViewUtil.getLabel('remove'),
						ui : 'delete-button',
						iconCls : 'x-fa fa-minus',
						listeners : {
							click : 'onRemoveVesselImage'
						}
					}]
				}],
				height: 40
			}],
			
			items: [{
				xtype: 'container',
				height: 450,
				reference: 'refVesselParticular',
				layout: {
					type: 'hbox',
					align: 'stretch'
				},
				items: [{
					xtype: 'container',
					width: 300,
					reference: 'refVesselParticular',
					bind: {
						html: 
							'<table class="tableTypeA">' +
							'<tr>' +
							'<th>Vessel Type</th>' +
							'<td>{theVessel.vesselKind}&nbsp;({theVessel.vesselType})</td>' +
							'</tr>' +
							'<tr>' +
							'<th>Type</th>' +
							'<td>{theVessel.vesselGroupCode}</td>' +
							'</tr>' +
							'<tr>' +
							'<th>Flag</th>' +
							'<td>{theVessel.flagName}</td>' +
							'</tr>' +
							'<tr>' +
							'<th>Build Year</th>' +
							'<td>{theVessel.buildYear}</td>' +
							'</tr>' +
							'<tr>' +
							'<th>LOA*Width</th>' +
							'<td>{theVessel.loa} x {theVessel.width}&nbsp;M</td>' +
							'</tr>' +
							'<tr>' +
							'<th>Draft</th>' +
							'<td>{theVessel.draft}&nbsp;M</td>' +
							'</tr>' +
							'<tr>' +
							'<th>DWT</th>' +
							'<td>{theVessel.dwt:number("0,000")}&nbsp;Mt</td>' +
							'</tr>' +
							'<tr>' +
							'<th>GRT</th>' +
							'<td>{theVessel.grt:number("0,000")}&nbsp;Mt</td>' +
							'</tr>' +
							'<tr>' +
							'<th>IMO</th>' +
							'<td>{theVessel.imoNo}</td>' +
							'</tr>' +
							'<tr>' +
							'<th>Call Sign</th>' +
							'<td>{theVessel.callSign}</td>' +
							'</tr>' +
							'<tr>' +
							'<th>Speed Laden</th>' +
							'<td>{theVessel.speedLaden} &nbsp;Knots</td>' +
							'</tr>' +
							'<tr>' +
							'<th>Speed Ballast</th>' +
							'<td> {theVessel.speedBallast} &nbsp;Knots</td>' +
							'</tr>' +
							'<tr>' +
							'<th>Latitude</th>' +
							'<td>{theVessel.latitude}</td>' +
							'</tr>' +
							'<tr>' +
							'<th>Longitude</th>' +
							'<td>{theVessel.longitude}</td>' +
							'</tr>' +
							'</table>' 
					}
				}, {
					xtype: 'image',
					margin: '1 -1 0 0',
					padding: '0 1 0 0',
					reference: 'refVesselParticularImage',
					flex: 1,
					style: {
						borderStyle: 'solid',
						borderWidth: '1px',
						borderColor: '#647cac'
					},
					bind: {
		            	src: '{imgData}'
		            }
				}]
			},{
				xtype: 'container',
				layout: 'fit',
				height: 130,
//				flex: 1,
				bind: {
					html: 
						'<table class="tableTypeC">' +
						  '<tr>' +
						    '<th rowspan=2 align="center">Fuel</th>' +
						    '<th rowspan=2 align="center">Speed</th>' +
						    '<th colspan=2 align="center">Sea</th>' +
						    '<th rowspan=2 align="center">Work / Idle</th>' +
						    '<th colspan=2 align="center">Port</th>' +
						  '</tr>' +
						  '<tr>' +
						    '<th align="center">FO</th>' +
						    '<th align="center">DO</th>' +
						    '<th align="center">FO</th>' +
						    '<th align="center">DO</th>' +
						  '</tr>' +
						  '<tr>' +
						    '<td align="center">FULL</td>' +
						    '<td align="right">{theFuelConsumption.speedLdn}</td>' +
						    '<td align="right">{theFuelConsumption.laSeaFo}</td>' +
						    '<td align="right">{theFuelConsumption.laSeaDo}</td>' +
						    '<td align="center">Work</td>' +
						    '<td align="right">{theFuelConsumption.laPortFo}</td>' +
						    '<td align="right">{theFuelConsumption.laPortDo}</td>' +
						  '</tr>' +
						    '<tr>' +
						    '<td align="center">ECO</td>' +
						    '<td align="right">{theFuelConsumption.speedEco}</td>' +
						    '<td align="right">{theFuelConsumption.ecSeaFo}</td>' +
						    '<td align="right">{theFuelConsumption.ecSeaDo}</td>' +
						    '<td align="center">Idle</td>' +
						    '<td align="right">{theFuelConsumption.ecPortFo}</td>' +
						    '<td align="right">{theFuelConsumption.ecPortDo}</td>' +
						  '</tr>' +
					'</table>' 
				}
			}]
		});
		
		me.callParent(arguments);
	}
});
