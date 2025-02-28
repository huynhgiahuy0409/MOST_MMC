Ext.define('MOST.view.main.MainController', {
	/**
     * @memberOf TSB 
     */
	extend: 'MOST.view.foundation.BaseViewController',
		
    alias: 'controller.main',
    
    requires: [
    	'MOST.view.login.LoginController',,
    	'MOST.model.main.Device'
    ],

    listen: {
		component: {
			'*': {
			}
		},
		
		controller: {
			'*': {
				createTab: 'createTab',
				closeTab: 'closeTab',
				closeAllTab: 'onCloseAllTab',
				setVesselSchedule: 'onSetVesselSchedule'
			}
		}
	}, 
	  
	VSLCALLID_SCREEN: ["cmcofapronhht", "cmcofwarehousehht", "vesseldelayhht", "shftgdbank", "stevedore", "equipmentsettinghht", "jettyoperation", "unclosed", "containers", "cargocmc", "vsrchecklisthht", "discharginglisthht", "loadinglisthht", "vesselInfoHHT"],
	NON_VSLCALLID_SCREEN: ["vsrchecklistnonjpvchht"],

    init: function() {
    	var me = this;
		var menuHHTStore = me.getStore('menuListHHT');
		var shiftStore = me.getStore('standardShift');
		var selectedShiftItem = null;
		
		//Load Standard Shift:
		me.setComboBoxWithLocalCache(CacheServiceConstants.STANDARD_SHIFT_COMBOBOX, 'standardShift');
		selectedShiftItem = shiftStore.findRecord('shftId', MOST.config.Token.getWorkShift());
		
		if (selectedShiftItem) {
			me.getViewModel().set('globalWorkShiftInfo', selectedShiftItem.data);
		}

    	if (Ext.ComponentQuery.query('[reference="refUserIdLabel"]').length > 0 && MOST.config.Token.getUserId()) {
    		Ext.ComponentQuery.query('[reference="refUserIdLabel"]')[0].setHtml(MOST.config.Token.getUserId())
    	}
		me.getViewModel().set('globalWorkDate',Ext.Date.format(MOST.config.Token.getWorkDate(), 'd/m/Y'));
		me.getViewModel().set('globalWorkShift',  MOST.config.Token.getWorkShift());
		me.getViewModel().set('globalWorkShiftDisplay', MOST.config.Token.getWorkShiftDisplay());
    	
    	menuHHTStore.load({
    		params:{
				userId: MOST.config.Token.getUserId()
			},
			callback:function(records,operation, success){
				if(records.length > 0){
					var list = new Array();
					
					for (var i = 0; i < records.length; i++) {
					 	var item = records[i].data;
					 	list.push({
							xtype: 'button',
				    		text: item.menuScreenName,
				    		value: item.screenPathAddress,
				    		iconAlign: 'left',
				            iconCls: item.screenIconDefineCode,
				            scope: me,
				            handler: me.onMenuClick		
						})
					}
					
					me.menu = Ext.create({
			            xtype: 'actionsheet',
			            displayed: false,
			            side: 'left',
			            scrollable: 'y',
			            reveal: true,
			            bodyStyle: 'background: #32404e; font-color:#FFFFFF;',
			            layout: {
			            	type: 'vbox',
			            	align: 'left'
			            },
			            defaults: {
			            	style: {'font-size' : '14px'},
			            	ui: 'menu-button-modern'
			            },            
			            items:list
			        });
				}
			}
		});
    },
    
    destroy: function() {
        this.menu = Ext.destroy(this.menu);
        this.callParent();
    },
    
    onToggleMenu: function() {
        var menu = this.menu,
        mode = 'cover';			//cover (fix screen position) / reveal (move screen position as much as menu width)

        if(menu){
        	menu.setConfig({
    	        side: 'left',
    	        reveal: mode === 'reveal',
    	        cover: mode === 'cover'
    	    });
    	
    	    menu.setDisplayed(!menu.getDisplayed());
        }
	    
	},
    
    hideMenu: function() {
        this.menu.hide();
    },	
    //End of Menu
    
    //Tab controll
    closeTab: function(id) {
    	var me = this;
    	var tabs = me.lookupReference('refMainTab');
    	var tab = tabs.items.getByKey(id);
    	
    	if (tab) {
    		tab.destroy();
    	}
    },
    
	onCloseAllTab: function () {
		var me = this;
		var centertab = me.lookupReference('refMainTab');
		me.onCloseAllTabExecute(centertab);
	},
	
	onCloseAllTabExecute: function(centertab) {
		var me = this;
		var menuscreen = centertab.items.items;		
		var ln = menuscreen.length;
		
		if (menuscreen){
			for (i = ln - 1; i > -1; i--) {
				var screen = menuscreen[i];
				if (screen.tab && screen._closable && screen.getClosable()) {
					screen.close();
				}
			}
		}
	},
	
    createTab: function(prefix, cfg) {
    	var me = this;
        var tabs = me.lookupReference('refMainTab');
        var id = prefix + '_' + cfg.xtype;
        var tab = tabs.getComponent(cfg.itemId);

        if (!tab) {
            tab = tabs.add(cfg);
        }

        tabs.setActiveItem(tab);
    },	
	onMenuClick: function (btn) {
		var me = this;
		if(this.VSLCALLID_SCREEN.includes(btn.getValue()) && !me.checkGlobalJpvcNo()){
			MessageUtil.warning('warning_msg', 'tbl_global_jpvc_selected');
			me.hideMenu();
			return;
		}
		if(this.NON_VSLCALLID_SCREEN.includes(btn.getValue())){
			var refs = me.lookupReference('vesselschedulePicker'); //.refNonJpvcRadiofield;
			var refChkJPVC = refs.lookupReference('refJpvcRadiofield');
			var refChkNonJPVC = refs.lookupReference('refNonJpvcRadiofield');
			
			if(!refChkNonJPVC.getChecked()){
				MessageUtil.warning('warning_msg', 'tbl_global_nonjpvc_screen');
				me.hideMenu();
				return;
			}
            if(refChkJPVC.getChecked()){			   
            	refChkNonJPVC.setChecked(true);
            	me.hideMenu();
            }
		}
		me.createTab('menu', {
			xtype: 'app-' + btn.getValue(),
			itemId: btn.id,
			iconAlign: btn.getIconAlign(),
			iconCls: btn.getIconCls(),
			title: btn.getText(),
			layout: 'fit',
			userCls: 'card',
			closable: true,
            scrollable: true			
		});
		
		me.hideMenu();
    },
    checkGlobalJpvcNo: function(){
		var me = this;
		var refs = me.getReferences();
		var globalVesselCallId = me.getViewModel().get('globalVesselCallId');
		if(!globalVesselCallId){
			MessageUtil.warning('warning_msg', 'tbl_global_jpvc_selected');
			return false;
		}
		return true;
	},
    
    //end of main menu
    
    
    
    //vessel schedule
	onSetVesselSchedule: function(setType, source) {
		var me = this;
		if (setType === 'INIT' || setType === 'NON-VESSEL') {
			if (setType === 'INIT') {
				me.getViewModel().set('globalVesselCallIdCheck', true);
			} else if (setType === 'NON-VESSEL') {
				me.getViewModel().set('globalVesselCallIdCheck', false);
			}
			me.getViewModel().set('globalVesselCallId', 		CodeConstants.VESSEL_SCHEDULE_STRG);		
			me.getViewModel().set('globalVesselCd', 			CodeConstants.VESSEL_CODE_STRG);		
			me.getViewModel().set('globalVesselCallYear', 		CodeConstants.VESSEL_CALL_YEAR_STRG);		
			me.getViewModel().set('globalVesselCallSeq', 		CodeConstants.VESSEL_CALL_SEQ_STRG);		
			me.getViewModel().set('globalVesselCallIdCheck', 	false);
			me.getViewModel().set('globalVesselName', 			null);
			me.getViewModel().set('globalVesselLoa', 			null);
			me.getViewModel().set('globalBerthNo', 				null);
			me.getViewModel().set('globalBerthFrom', 			null);
			me.getViewModel().set('globalBerthTo', 				null);
			me.getViewModel().set('globalWharfStart', 			null);
			me.getViewModel().set('globalWharfEnd', 			null);	
			me.getViewModel().set('globalEta', 					null);
			me.getViewModel().set('globalAtb', 					null);
			me.getViewModel().set('globalArrivalPilotCheck', 	false);
			me.getViewModel().set('globalArrivalMooring', 		null);
			me.getViewModel().set('globalArrivalTug', 			null);
			me.getViewModel().set('globalAtw', 					null);
			me.getViewModel().set('globalAtc', 					null);
			me.getViewModel().set('globalAtu', 					null);
			me.getViewModel().set('globalDeparturePilotCheck', 	false);
			me.getViewModel().set('globalDepartureMooring', 	null);	
			me.getViewModel().set('globalDepartureTug', 		null);	
		} else if (setType === 'VESSEL') {
			me.getViewModel().set('globalVesselCallId', 		source.data.vslCallId);
			me.getViewModel().set('globalVesselCd', 			source.data.vslCd);		
			me.getViewModel().set('globalVesselCallYear', 		source.data.callYear);		
			me.getViewModel().set('globalVesselCallSeq', 		source.data.callSeq);		
			me.getViewModel().set('globalVesselCallIdCheck', 	true);	
			me.getViewModel().set('globalVesselName', 			source.data.vslNm);
			me.getViewModel().set('globalVesselLoa', 			source.data.loa);
			me.getViewModel().set('globalBerthNo', 				source.data.berthLoc);
			me.getViewModel().set('globalBerthFrom', 			source.data.berthFrom);
			me.getViewModel().set('globalBerthTo', 				source.data.berthTo);
			me.getViewModel().set('globalWharfStart', 			source.data.wharfStart);
			me.getViewModel().set('globalWharfEnd', 			source.data.wharfEnd);
			me.getViewModel().set('globalEta', 					source.data.eta);
			me.getViewModel().set('globalAtb', 					source.data.atb);
			me.getViewModel().set('globalArrivalPilotCheck', 	source.data.atbPilotCheck);
			me.getViewModel().set('globalArrivalMooring', 		source.data.atbMooring);
			me.getViewModel().set('globalArrivalTug', 			source.data.atbTug);
			me.getViewModel().set('globalAtw', 					source.data.atw);
			me.getViewModel().set('globalAtc', 					source.data.atc);
			me.getViewModel().set('globalAtu', 					source.data.atu);
			me.getViewModel().set('globalDeparturePilotCheck', 	source.data.atuPilotCheck);
			me.getViewModel().set('globalDepartureMooring', 	source.data.atuMooring);
			me.getViewModel().set('globalDepartureTug', 		source.data.atuTug);
			me.getViewModel().set('theVessel',source.data);
			
			me.getViewModel().set('prevGlobalVsl',source);
		}
		
		if(!source || !source.data || !source.data.isInit){
			me.onCloseAllTab();
		}		
		
		if (setType === 'NON-VESSEL') {
			me.fireEvent('clearVesslDetailInfo');
			me.getViewModel().set('theVessel',null);
		} else {
			me.fireEvent('loadVesselDetailHHT');	//call VesselInfoHHTController.onLoadHHT
		}
		
	},
	
	onMoveScheduleTabClick: function() {
    	var me = this;
        var tabs = me.lookupReference('refMainTab');
        var tab = tabs.getComponent('scheduleTabItemId');
        tabs.setActiveItem(tab);
        tabs.getTabBar().getScrollable().scrollTo(0);
	},
	
	onHhtLogout: function(btn) {


		buttons = Ext.MessageBox.OKCANCEL;
		buttons = {
			ok: {text: 'Yes'},
			cancel: {text: 'No'}
		}
		
		Ext.Msg.show({
			title: 'Logout',
			message: 'Do you want to logout?',
			buttons: buttons,
			//icon: icon,
			fn: function(button) {
				if(button === 'ok'){
					
					var item = Ext.create('MOST.model.foundation.CredentialItem', {
						accessToken: MOST.config.Token.getAccessToken(),
						userId: MOST.config.Token.getUserId(),
						accessDevice: 'HHT'
					});					
					
					var proxy = item.getProxy();
					proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/auth/logout';
					
					item.save({
						callback: function(record, operation, success) {
							if (success) {
								Ext.util.Cookies.clear('mosttoken');
								location.reload();

								localStorage.removeItem('globalvslCallId');
								localStorage.removeItem('globalvsItem', '');
							}
						}
					});
				}
			}
		}).setAlwaysOnTop(true);		 
	},
	
	onTestMessageAndPopup: function(btn) {
		var me = this;
		
		var successMsg = MOST.getApplication().bundle.getMsg('success_msg')
		
		//this.mixins.messageUtil.testAlert(successMsg);
		
		MessageUtil.error('warning_msg','blblinquiry_zb55_notapprove');  
		MessageUtil.infoToast('warning_msg','buttonTestKey'); 
		
//		var params = {
//				title: 'Hatch Equip'
//		};		
		//ViewUtil.openCodePopup(this, 'app-hatchequip', btn.getReference(), params);
		
	},

	//DO NOT DELETE BELOW methods
//	onRequestCamera: function() {
//		var startTime = Date.now();
//		var timeThreshold = 1000;
//		var detectPermissionDialog = function(allowed) {
//		  if (Date.now() - startTime > timeThreshold) {
//		    // dialog was shown
//		  }
//		};
//		var successCallback = function(error) {
//		  detectPermissionDialog(true);
//		};
//		var errorCallback = function(error) {
//		  if ((error.name == 'NotAllowedError') ||
//		    (error.name == 'PermissionDismissedError')) {
//		    detectPermissionDialog(false);
//		  }
//		};
//		navigator.mediaDevices.getUserMedia({video:true})
//		  .then(successCallback, errorCallback);
//	},
	
	onFindCamera: function() {
		var me = this;
		var cameraStore = me.getStore('cameraStore');

        cameraStore.removeAll();
        cameraStore.commitChanges();

		Html5Qrcode.getCameras().then(devices => {
			/**
			 * devices would be an array of objects of type:
			 * { id: "id", label: "label" }
			 */
			
			for(var i=0; i<devices.length; i++) {
				var cameraId = devices[i].id;
				var deviceLabel = devices[i].label;
				var newRow = Ext.create('MOST.model.main.Device');
				newRow.data.deviceId = cameraId;
				newRow.data.deviceName = deviceLabel;
				cameraStore.add(newRow);
				cameraStore.commitChanges();
			}
		}).catch(err => {
			  // handle err
		});			
		
	},
	
	onReadBarcode: function(combo, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var reader = refs.refqrcoderedercomp;
		me.onStopScanning();
		if (newValue) {
		    me.onStartScanning(newValue);	
		}
	},
	
	onStartScanning: function(cameraId) {
		var me = this;
		var refs = me.getReferences();
		var lastQrCode = null;
		var html5QrCode = document.getElementById('qr-reader');
		var count = 0;
		
        if (html5QrCode.children.length > 0) {
        	me.onStopScanning(null);
        }

		html5QrCode = new Html5Qrcode(/* element id */ "qr-reader");
		html5QrCode.start(
			cameraId, 
			{
				fps: 10,    // Optional frame per seconds for qr code scanning
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
					//turn off camera with stop scanning
					refs.refQrCodeResult.setValue(qrCodeMessage);
					me.onStopScanning(null);
					html5QrCode = null;
				}
			},
			errorMessage => {
				// parse error, ignore it.
			}).catch(err => {
				// Start failed, handle it.
			});		
	},
	
	onStopScanning: function() {
		var html5QrCode = document.getElementById('qr-reader');
		if (html5QrCode.children && html5QrCode.children.length > 0) {
			var mediaStream = html5QrCode.children[0].srcObject;
			var tracks = mediaStream.getTracks();
			tracks[0].stop();
		}
		html5QrCode = null;
	}
	
	// end of vessel schedule
});
