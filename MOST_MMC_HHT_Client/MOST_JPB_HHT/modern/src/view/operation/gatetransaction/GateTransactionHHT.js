Ext.define('MOST.view.operation.gatetransaction.GateTransactionHHT', {
	extend: 'Ext.Panel',
	alias: 'widget.app-gatetransactionhht',

	requires: [
		
		//Controller, model:
		'MOST.view.operation.GateTransactionHHTModel',
		'MOST.view.operation.GateTransactionHHTController',
		
		//Tab:
		'MOST.view.operation.gatetransaction.GateInTab', 
		'MOST.view.operation.gatetransaction.GateOutTab',
		
		//Popup:
//		'MOST.view.popup.GRHHTPopup',
//		'MOST.view.popup.LorryForGateHHTPopup',
//		'MOST.view.popup.SDOPopupHHT',
//		'MOST.view.popup.GatePassListHHTPopup',
//		'MOST.view.popup.VesselHHTPopup'
	],

	controller: 'gatetransactionhht',
	viewModel: {
		type: 'gatetransactionhht'
	},

	listeners: {
		initialize: 'onLoad',
	},

	layout: 'fit',
	shadow: false,
	padding: 5,
	minWidth: CommonConstants.HHT_MIN_WIDTH ,

	items: [
		{
			xtype: 'formpanel',
			reference: 'refFormGateTxn',
			padding: 0,
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
					hidden: true,
					xtype: 'fieldset',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
						{
							// Wk Date, Shift
							xtype: 'fieldset',
							hidden: true,
							flex: 1,
							layout: {
								type: 'hbox',
								align: 'right'
							},
							items: [
								{
									xtype: 'datefield',
									reference: 'refWorkingDate',
									flex: 1,
									label: {
										type: 'bundle',
										key: 'workingYMD'
									},
									dateFormat: 'd/m/Y',
									labelAlign: 'left',
									required: true,
									disableTime: true,
									disabled: true
								},
								{
									xtype: 'combobox',
									flex: 1,
									reference: 'refCbxShft',
									style: 'margin-left: 20px',
									bind: {
										store: '{shiftCombo}',
									},
									label: 'Shift',
									labelAlign: 'left',
									labelWidth: 70,
									required: true,
									displayField: 'shftNm',
									valueField: 'shftId',
									queryMode: 'local',
									clearable: true,
									typeAhead: true,
									readOnly: true,
									disabled: true
								}
							]
						}
					]
				},
				{// Row button Confirm Cancel
					xtype: 'container',
					margin: '0 0 0 0',
					layout: {
						type: 'hbox',
						pack: 'end'
					},
					items: [
						{
							xtype: 'segmentedbutton',
							hidden: true,
							reference: 'refFrontRearCam',
							flex: 1,
							listeners: {
								change: 'onChangeSegmentCam'
							},
							items: [{
								text: 'R',
								value: 1,
								pressed: true
							}, {
								text: 'F',
								value: 0
							}]
						},
						{
							xtype: 'button',
							margin: '5 15 0 0',
							reference: 'refBtnQRScanApron',
							iconCls: 'x-fa fa-qrcode fa-10x',
							textAlign : 'center', 
							text: { type: 'bundle', key: 'hht_qrscan' },
							ui: 'delete-button-modern',
							width: 150,
							handler: 'onTblBtnBarcode'
						},
					]
				},
				{
					xtype: 'container',
					margin: '0 0 5 0',
					hidden: false,
					layout: 
					{
						type: 'hbox',
						align: 'stretch'
					},
					items:[{
						xtype: 'panel',
						style: 'border-style: inherit; border-radius: 5px; border-color: 0000ff; margin-left: auto; margin-right: auto;',
						reference: 'refPnlqrcoderedercomp',
						html: "<div id='qr-readerGtxn' style='width:400px'></div>",
						width: 1,
						height: 1,
						}
					]
				},
				{
					// tab
					xtype: 'tabpanel',
					reference: 'refTabGateTxn',
					flex: 1,
					// tabBar: {
					// 	layout: {
					// 		pack: 'start',
					// 		overflow: 'scroller'
					// 	}
					// },
					defaults: {
						scrollable: true,
						layout: 'fit',
						userCls: 'card',
						tab: {
							flex: 1,
							ui: 'md-tab'
						}
					},
					layout: {
						animation: null
					},
					tabBarPosition: 'top',
					
					listeners: {
						activeitemchange: 'onTabChange'
					},
					items: [
						{
							xtype: 'app-gateintab',
							flex: 1,
							title: 'GateIn'
						},
						{
							xtype: 'app-gateouttab',
							flex: 1,
							title: 'GateOut'
						}
					]

				}
			]
		}
	]
});
