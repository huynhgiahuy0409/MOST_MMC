/**
 * Robert added Commmon QR Scanner Popup.
 * Purpose: To have a common QR Scanner Popup for all the modules.
 * Date: 2024-07-15
 * 
*/

Ext.define('MOST.view.popup.QRScannerPopup', {
	extend: 'Ext.Panel',
	alias: 'widget.popup-qrscannerpopup',

	requires: [
		'MOST.view.popup.QRPopupController',
    ],

    controller: 'qrpopup',	
	viewModel: {
		//type: 'qrscannerpopup'
	},
    
	/**
	 * =========================================================================================================================
	*/
	listeners: {
		painted: 'onLoad',
	},
	closeAction: 'destroy',
	/**
	 * =========================================================================================================================
	*/

	FRAME_SIZE: 500,
    autoSize: true,
    shadow: false,
    layout: 'vbox',
    scrollable: true,
    padding: '0 0 0 0',
	margin: '0 0 0 0',
	layout:{
		type: 'vbox',
		align: 'stretch'
	},	
	style: 'background-color: transparent;',
	
	items:[
		{
			xtype: 'fieldset',
			style: 'background-color: transparent; border-style: inherit; border-radius: 5px; border-color: #FFE0B2',
			flex: 1,
			layout:{
				type: 'vbox',
				align: 'stretch'
			},
			padding: '0 0 0 0',
			margin: '0 0 0 0',
			items: [
				{
					xtype: 'container',
					layout:{
						type: 'hbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'segmentedbutton',
							hidden: true,
							reference: 'refFrontRearCam',
							//flex: 1,
							listeners: {
								change: 'onChangeSegmentCam'
							},
							items: [
								{
									text: 'R',
									value: 1,
									pressed: true
								}, {
									text: 'F',
									value: 0
								}
							]
						},
						{
							xtype: 'spacer',
							width: 10
						},
						// {
						// 	xtype: 'button',
						// 	reference: 'refBtnOpenQR',
						// 	iconCls: 'x-fa fa-qrcode fa-10x',
						// 	textAlign : 'center',
						// 	text: 'QR',
						// 	ui: 'delete-button-modern',
						// 	handler: 'openQR'
						// }
					]
				},
				{
					xtype: 'panel',
					width: this.FRAME_SIZE,
					height: this.FRAME_SIZE,
					reference: 'refPnlPpQrcodereder',
					style: 'border-style: solid 1px; border-radius: 5px; border-color: #FFE0B2; margin: auto;',
					html: "<div id='qr-readerCommon'></div>",
					
				},
			]
		}
	]
});
 