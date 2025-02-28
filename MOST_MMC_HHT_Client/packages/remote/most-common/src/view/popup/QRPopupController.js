Ext.define('MOST.view.popup.QRPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [

	],

	alias: 'controller.qrpopup',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MIN_DATE_PERIOD : 31,	// MIN PERIOD DATE
	MAX_DATE_PERIOD : 31,   // MAX PERIOD DATE
	MAX_PERIOD_DAY : 62,

	QR_ACTIVE: false,
	TXT_CANCEL: 'Cancel',
	TXT_QRSCAN: 'QR Scan',
	FRAME_SIZE: 500,
	html5QrCode: null,
	CANCELED: false,
	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		me.onStartScanBardcode();
	},

	destroy: function(){
		var me = this;
		setTimeout(function() {
			me.onStop();
			//me.onStopScanning(null);				
		}, 1000);
	},

	openQR: function(){
		var me = this;
		me.onStartScanBardcode();
	},

	onStartScanBardcode: function(){
		var me = this;
		var refs = me.getReferences();
		if(me.QR_ACTIVE){
			me.onStopScanning(null);
			//me.setQRButton(false);
			return;
		}

		//me.setQRButton(true);
		me.setHiddenScanner(false);
		me.startDeivce();
	},

	startDeivce: function(){
		var me = this;
		var refs = me.getReferences();
		
		if(me.CANCELED) return;

		var deviceNo = me.getCameraDevice();
		var reader = refs.refPnlPpQrcodereder;
		//me.clearCodeValue(null);
		Html5Qrcode.getCameras().then(devices => {
			/**
			 * devices would be an array of objects of type:
			 * { id: "id", label: "label" }
			 */
			if (devices && devices.length) {
				var device = (devices[deviceNo] == null ? devices[0] : devices[deviceNo])
				var cameraId = device.id ; //devices[0].id
				// .. use this to start scanning.
				me.startScan(cameraId);
			}
		}).catch(err => {
			  // handle err
		});	
	},

	startScan: function(cameraId) {
		var me = this;
		var lastQrCode = null;
		var count = 0;

		me.html5QrCode = new Html5Qrcode(/* element id */ "qr-readerCommon");
		me.html5QrCode.start(
			cameraId,{
				fps: 20,    // Optional frame per seconds for qr code scanning
				qrbox: 250  // Optional if you want bounded box UI
			},
			qrCodeMessage => {
				// scanning
				// stop scan if receive same qrCodeMessages for 3 times 
				if (qrCodeMessage !== lastQrCode) {
					lastQrCode = qrCodeMessage;
					console.log(qrCodeMessage);
					if (count > 0) count = count - 1;
				} else {
					count = count + 1;
				}
				if (count >= 3) {
					console.log('count = ' + count + '; qrCodeMessage = ' + qrCodeMessage);
					me.onReturnData(qrCodeMessage);
					count = 0;
				}
			},
			errorMessage => {
				// parse error, ignore it.
			}
		).catch(err => {
			// Start failed, handle it.
		});
	},

	//QR scan
	getCameraDevice: function (){
		var me = this;
		var refs = me.getReferences();
		var deviceNo = refs.refFrontRearCam.getValue();
		//var deviceNo = refs.refCameraFrontRear.getValue()? 0 : 1;
		return (deviceNo == null) ? 0 : deviceNo;
	},
	
	onChangeSegmentCam: function (){
		var me = this;
		var refs = me.getReferences();
		var deviceNo = refs.refFrontRearCam.getValue();
		if(me.QR_ACTIVE){
			me.startDeivce();
		}
	},

	//Return value to Parrent
	onReturnData: function(value){
		var me = this;
		var window = me.getView().up('window');

		var returnItem = {
			code : value,
			value : value
		}

		me.onStop();
		window.returnValue = returnItem;
       	window.close();
	},

	//On Stop Scanning
    onStop: function() {
		var me = this;
        if(me.html5QrCode) {
			me.html5QrCode.stop().then((ignore) => {
				// QR Code scanning is stopped.
				me.html5QrCode = null;
				me.setHiddenScanner(true);
			}).catch((err) => {
				// Stop failed, handle it.
			});
		}
    },

	//Set Hidden Scanner true or false
	setHiddenScanner(hidden){
		var me = this;
		var refs = me.getReferences();
		var panel = refs.refPnlPpQrcodereder;

		//panel.setHidden(hidden);
		if(hidden){
			//panel.setWidth(1);
			panel.setHeight(0);
		}
		else{
			panel.setWidth(me.FRAME_SIZE);
			panel.setHeight(me.FRAME_SIZE-100);
		}
	},
});