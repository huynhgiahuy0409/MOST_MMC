Ext.define('MOST.view.operation.GateOperationController', {
	extend: 'MOST.view.foundation.BaseViewController',
	
	requires: [
	
	],

	alias: 'controller.gateoperation',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	vslCallId: '',
	tabMode: '',
	isCreated : false,
	DEFAULT_MODEL : 'MOST.model.controller.GateOperations',
	PDF_FILE: 'RMT002.jrxml',
	PDF_FUNCTION: 'MOST.monitoringReport.getGatePass',
	UNIT_NO_LIST_FOR_BL_STORE: 'unitNoListForBLStore',
	UNIT_NO_LIST_FOR_SN_STORE: 'unitNoListForSNStore',
	
	writer : null,
	reader : null,
	intervalId : null,
	serialPort : null,
	isConnected : false,
	debounceTimer: null,
	prevData:null,
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		
		var currentDate = new Date();
		var days = 0;
		var dateValue = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+days, currentDate.getHours(), currentDate.getMinutes());
				
		me.onComboList();
		
		me.setEditableUserControl('refGateInGr');
		me.tabMode = 'gateIn';
		me.setReadOnlyMode(true);
		var roroGateInstore = me.getStore('gateInForRoRo');
		roroGateInstore.load({
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
		
		var roroGateOutstore = me.getStore('gateOutForRoRo');
		roroGateOutstore.load({
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
		
		//Load Gate In General Cargo
		var gateInGCStore = me.getStore('gateInCargo');
		gateInGCStore.load({
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
		
		//Load Gate Out General Cargo
		var gateOutGCStore = me.getStore('gateOutCargo');
		gateOutGCStore.load({
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});

		var gateInGC = Ext.create('MOST.model.operation.GateOperation');
		me.getViewModel().setData({
			gateInGC: gateInGC
		});
	},
	
	
	/**
	 *  INITIALIZE END
	 * =========================================================================================================================
	 */
	
	
	/**
	 * =========================================================================================================================
	 * EVENT START
	 */
	onComboList: function(){
		var me = this;
		var store = me.getStore('gateComboList');
		
		store.load();
	},
	
	//General Cargo/ROROTab Change Event
	onTabChange : function(tabPanel, newCard, oldCard, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var tabTitle = tabPanel.getActiveTab().name;	
		
		switch(tabTitle) {
			case 'GeneralCargoGateIn':
				me.tabMode = 'gateIn';
				me.setEditableUserControl('refGateInGr');
				break;
			case 'ROROGateIn':
				me.tabMode = 'gateIn';
				me.setEditableUserControl('refGateInGr');
				break;
			case 'GeneralCargoGateOut':
				me.tabMode = 'gateOut';
				me.setEditableUserControl('refGateInGr');
				break;
			case 'ROROGateOut':
				me.tabMode = 'gateOut';
				me.setEditableUserControl('refGateOutGp');
				break;
		}
		
		if(me.tabMode == 'gateIn'){
			if(tabTitle == 'ROROGateIn'){
				var searchType = '';
				if(refs.refGateInTruck.value){
					searchType = 'TRUCK'
				}else if(refs.refGateInDriver.value){
					searchType = 'DRIVER'
				}
				var roroGateInstore = me.getStore('gateInForRoRo');
				roroGateInstore.load({
					params : {
						searchType : searchType
					},
					callback: function(records, operation, success) {
						if (success) {
						}
					}
				});
			}else{
				var gateInGCStore = me.getStore('gateInCargo');
				gateInGCStore.load({
					callback: function(records, operation, success) {
						if (success) {
						}
					}
				});
			}
			
		}else{
			if(tabTitle == 'ROROGateOut'){
				var searchType = '';
				if(refs.refGateOutTruck.value){
					searchType = 'TRUCK'
				}else if(refs.refGateOutDriver.value){
					searchType = 'DRIVER'
				}
				var roroGateOutstore = me.getStore('gateOutForRoRo');
				roroGateOutstore.load({
					params : {
						searchType : searchType
					},
					callback: function(records, operation, success) {
						if (success) {
						}
					}
				});
			}else{
				var gateOutGCStore = me.getStore('gateOutCargo');
				gateOutGCStore.load({
					callback: function(records, operation, success) {
						if (success) {
						}
					}
				});
			}
		}
	},
	
	//Gate In/Out Tab Change Event
	onMasterTabChange : function(tabPanel, newCard, oldCard, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var tabTitle = tabPanel.getActiveTab().title;	
		
		
		//Clear data when change tab (Gate In)
		refs.refGateInGCLorryField.setValue('');
		refs.refGateInDateTime.setValue('');
		refs.refGateInGateCombo.setValue('');
		me.getViewModel().setData({gateInGC: Ext.create('MOST.model.operation.GateOperation')});
		
		
		refs.refGateInRoRoLorryField.setValue('');
		refs.ctlGateInRoRoDriverIdField.setValue('');
		refs.refGateInRoRoDateTime.setValue('');
		refs.ctlGateInRoRoGateCombo.setValue('');
		me.getViewModel().setData({gateInRORO: null});
		
		//Clear data when change tab (Gate Out)
		refs.ctlGateOutLorryField.setValue('');
		refs.refGateOutDateTime.setValue('');
		refs.ctlGateOutGateCombo.setValue('');
		me.getViewModel().setData({gateOutLorry: null});
		
		refs.refGateOutRoRoLorryField.setValue('');
		refs.refGateOutRoRoDriverIdField.setValue('');
		refs.refGateOutRoRoCombo.setValue('');
		refs.refGateOutRoRoDateTime.setValue('');
		me.getViewModel().setData({gateOutRORO: null});
		me.getViewModel().setData({theDriver: null});
		me.getViewModel().setData({sdoInfo: null});
		
		switch(tabTitle) {
			case ' GateIn':
				me.tabMode = 'gateIn';
				break;
			case ' GateOut':
				me.tabMode = 'gateOut';
				break;
		}
		
		if(me.tabMode == 'gateIn'){
			var gateInGCStore = me.getStore('gateInCargo');
			gateInGCStore.removeAll();
			gateInGCStore.load({
				callback: function(records, operation, success) {
					if (success) {
					}
				}
			});
			
			//RORO
			var searchType = '';
			if(refs.refGateInTruck.value){
				searchType = 'TRUCK'
			}else if(refs.refGateInDriver.value){
				searchType = 'DRIVER'
			}
			var roroGateInstore = me.getStore('gateInForRoRo');
			roroGateInstore.load({
				params : {
					searchType : searchType
				},
				callback: function(records, operation, success) {
					if (success) {
					}
				}
			});
		}else{
			var gateOutGCStore = me.getStore('gateOutCargo');
			gateOutGCStore.removeAll();
			gateOutGCStore.load({
				callback: function(records, operation, success) {
					if (success) {
					}
				}
			});
			
			//RORO
			var searchType = '';
			if(refs.refGateOutTruck.value){
				searchType = 'TRUCK'
			}else if(refs.refGateOutDriver.value){
				searchType = 'DRIVER'
			}
			var roroGateOutstore = me.getStore('gateOutForRoRo');
			roroGateOutstore.load({
				params : {
					searchType : searchType
				},
				callback: function(records, operation, success) {
					if (success) {
					}
				}
			});
		}
	},
	
	onOk: function() {
		var me = this;
		var refs = me.getReferences();

		if (me.tabMode === 'gateIn') {
			var tabTitle = refs.ctlGateInTab.getActiveTab().title.trim();
			//Terminal Hold
			if(Token.getTmnlHoldChk() === 'Y') {
				/*
				if(me.isTerminalHoldGateIn()){
					MessageUtil.warning('warning_msg', 'terminal_hold_msg');
					return;
				}else{
					if(tabTitle === 'General Cargo'){
						me.saveGateInCargo();
					}else if(tabTitle === 'RORO'){
						me.saveGateInRORO();
					}
				}*/
				me.isTerminalHoldGateIn().then(function(isHeld) {
					if (isHeld) {
						MessageUtil.warning('warning_msg', 'terminal_hold_msg');
						return;
					} else {
						if(tabTitle === 'General Cargo'){
							me.saveGateInCargo();
						}else if(tabTitle === 'RORO'){
							me.saveGateInRORO();
						}
					}
				});
			} else {
				if(tabTitle === 'General Cargo'){
					me.saveGateInCargo();
				}else if(tabTitle === 'RORO'){
					me.saveGateInRORO();
				}			
			}
		}else if(me.tabMode === 'gateOut') {
			var tabTitle = refs.ctlGateOutTab.getActiveTab().title.trim();
			//Terminal Hold
			if(Token.getTmnlHoldChk() === 'Y') {
				if(me.isTerminalHoldGateOut()){
					MessageUtil.warning('warning_msg', 'terminal_hold_msg');
					return;
				}else{
					if(tabTitle === 'General Cargo'){
						me.saveGateOutCargo();
					}else if(tabTitle === 'RORO'){
						me.saveGateOutRORO();
					}
				}
			}else{
				if(tabTitle === 'General Cargo'){
					me.saveGateOutCargo();
				}else if(tabTitle === 'RORO'){
					me.saveGateOutRORO();
				}			
			}
		} 
		
	},
	
	isTerminalHoldGateIn: function(){
		var me = this;
		var refs = me.getReferences();
		var terminalHoldGateInCheckStore = me.getStore('validationCheck');
		var flag = false;
		var col1 = me.vslCallId, col2 = '';		
		var store = me.getStore('validationCheck');
		var theGateInGr = me.getViewModel().get('gateInGr');
		var theGateInBldo = me.getViewModel().get('gateInBldo');
		var tabTitle = refs.ctlGateInTab.getActiveTab().title.trim();
		var gateInGC = me.getViewModel().get("gateInGC");
				
		if (theGateInBldo) {
            col2 = theGateInBldo.get("blNo");
        } else if (theGateInGr) {
            col2 = theGateInGr.get("shipgNoteNo");
        } else {
			if(tabTitle === 'General Cargo') {
				if (!StringUtil.isNullorEmpty(refs.ctlGateInGCGrField.getValue())) {
					col1 = gateInGC.get("vslCallId"); 
					col2 = gateInGC.get("shipgNoteNo");
				} else {
					col1 = gateInGC.get("vslCallId");
					col2 = gateInGC.get("blNo");
				}
			} 
        }
		
		params = {
				tyCd: 'OPE_TMNLHOLD_VALIDATION',
				col1: col1,
				col2: col2,
				col3: CodeConstants.TMNL_HOLD_CGI
			};
		/*
		store.load({
			params : params,
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(records[0].get('isValidated') == 'N'){
							flag = true;
						}
					}
				}
			}
		});
		return flag;
		*/

		return new Ext.Promise(function(resolve, reject) {
			store.load({
				params : params,
				
				callback: function(records, operation, success) {
					if (success) {
						if(records.length > 0){
							if(records[0].get('isValidated') == 'N'){
								resolve(true);
							} else {
								resolve(false);
							}
						}
					} else {
						resolve(false);
					}
				}
			})
		})
		
	},
	
	isTerminalHoldGateOut: function(){
		var me = this;
		var refs = me.getReferences();
		var flag = false;		
		var params = null;
		var col1 = me.vslCallId, col2 = '';		
		var store = me.getStore('validationCheck');
		var gateOutGrItem = me.getViewModel().get('gateOutGr');
		var gateOutGpItem = me.getViewModel().get('gateOutGp');
		
		if(gateOutGpItem){
			col2 = gateOutGpItem.get('blNo');
		}
		else if(gateOutGrItem){
			col2 = gateOutGrItem.get('shipgNoteNo');
		};
		
		params = {
				tyCd: 'OPE_TMNLHOLD_VALIDATION',
				col1: col1,
				col2: col2,
				col3: CodeConstants.TMNL_HOLD_CGO
		};
		
		store.load({
			params : params,
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(records[0].get('isValidated') == 'N'){
							flag = true;
						}
					}
				}
			}
		});
		
		return flag;
		
	},
	
	onTerminalHoldValidation : function(){
		var me = this;
		var refs = me.getReferences();
		var params = null;
		var col1 = me.vslCallId, col2 = '';
		var tabTitle = refs.ctlMasterTab.getActiveTab().title.trim();
		
		var store = me.getStore('validationCheck');
		if(me.tabMode === 'gateIn') {
			var gateInRORO = me.getViewModel().get('gateInRORO');
			var gateInLorry = me.getViewModel().get('gateInLorry');
			
			if(tabTitle === 'General Cargo'){
				if(gateInLorry.get('blNo') != null && gateInLorry.get('blNo') != ''){
					col2 = gateInLorry.get('blNo');
				}
				if(gateInLorry.get('shipgNoteNo') != null && gateInLorry.get('shipgNoteNo') != ''){
					col2 = gateInLorry.get('shipgNoteNo');
				};
			}else if(tabTitle === 'RORO'){
				if(gateInRORO.get('blNo') != null && gateInRORO.get('blNo') != ''){
					col2 = gateInRORO.get('blNo');
				}
				if(gateInRORO.get('shipgNoteNo') != null && gateInRORO.get('shipgNoteNo') != ''){
					col2 = gateInRORO.get('shipgNoteNo');
				};
			}
			params = {
					tyCd: 'OPE_TMNLHOLD_VALIDATION',
					col1: col1,
					col2: col2,
					col3: CodeConstants.TMNL_HOLD_CGI
				};
		} else {
			var gateOutGrItem = me.getViewModel().get('gateOutGr');
			var gateOutGpItem = me.getViewModel().get('gateOutGp');
			
			if(gateOutGpItem){
				col2 = gateOutGpItem.get('blNo');
			}
			else if(gateOutGrItem){
				col2 = gateOutGrItem.get('shipgNoteNo');
			};
			
			params = {
					tyCd: 'OPE_TMNLHOLD_VALIDATION',
					col1: col1,
					col2: col2,
					col3: CodeConstants.TMNL_HOLD_CGO
				};
		}
		
		store.load({
			params : params,
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(records[0].get('isValidated') == 'N'){
							MessageUtil.warning('warning_msg', 'terminal_hold_msg');
							return false;
						}
						else {
							me.onPassedTerminalHoldValidation();
						}
					}
					else {
						me.onPassedTerminalHoldValidation();
					}
				}
			}
		});
	},
	
	//Hailey modified on 26/04/2023
	saveGateInRORO: function(){
		var me = this;
		var refs = me.getReferences();
		var roroGateInstore = me.getStore('gateInForRoRo');
		var gateInRORO = me.getViewModel().get('gateInRORO');
		var theDriver = me.getViewModel().get('theDriver');
		var grid = me.lookupReference('refGateInRoRo');
		var insertItem = grid.getSelection() == null ? null : grid.getSelection()[0];
		var gateNo = refs.ctlGateInRoRoGateCombo.getValue();
		
		if(gateNo == null || gateNo == ''){
			MessageUtil.error('warning_msg','gateoprations_gateNo_inquiry_msg');
			return;
		}
		if(refs.refGateInTruck.value == true && (gateInRORO.get('lorryNo') == null || gateInRORO.get('lorryNo') == '')){
			MessageUtil.error('warning_msg','gateoprations_truckNo_inquiry_msg');
			return;
		}
		if(refs.refGateInDriver.value == true && (theDriver.get('driverId') == null || theDriver.get('driverId') == '')){
			MessageUtil.error('warning_msg','gateoprations_driverId_inquiry_msg');
			return;
		}
		if(insertItem.get('catgCd') == 'I'){
			insertItem.set('cgNo', insertItem.get('blNo'));
			insertItem.set('cgInOutCd', 'O');
		}else if(insertItem.get('catgCd') == 'E'){
			insertItem.set('cgNo', insertItem.get('grNo'));
			insertItem.set('cgInOutCd', 'I');
		}
		
		insertItem.set('searchType', 'gateIn');
		insertItem.set('cgTpCd', 'RCV');
		insertItem.set('lorryNo', refs.refGateInRoRoLorryField.getValue());
		insertItem.set('driverId', refs.ctlGateInRoRoDriverIdField.getValue());
		insertItem.set('userId', MOST.config.Token.getUserId());
		if(refs.refGateInRoRoDateTime.getValue() != null && refs.refGateInRoRoDateTime.getValue() != ''){
			var gateInDate = Ext.Date.format( new Date(refs.refGateInRoRoDateTime.getValue()), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()); 
			insertItem.set('gateInDt', gateInDate);
		}else{
			var gateInDate = Ext.Date.format( new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()); 
			insertItem.set('gateInDt', gateInDate);
		}
		insertItem.set('gateCd', gateNo);
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var isCreated = insertItem.phantom;
		//Mantis: 0167274
		var searchType = refs.refGateInTruck.getValue() ? 'TRUCK' : 'DRIVER';
		
		updateParm.getProxy().url = roroGateInstore.getProxy().url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('userId', MOST.config.Token.getUserId());
		updateParm.set('item', insertItem.data);
		updateParm.save({
			success: function(record) {
				me.getViewModel().setData({
					gateInRORO : null
				});
				me.getViewModel().setData({ theDriver : null });
				refs.refGateInRoRoDateTime.setValue('');
				refs.ctlGateInRoRoGateCombo.setValue('');
				refs.refGateInRoRoLorryField.setValue('');
				refs.ctlGateInRoRoDriverIdField.setValue('');
				MessageUtil.saveSuccess();
				roroGateInstore.removeAll();
				roroGateInstore.load({
					params : {
						searchType : searchType
					},
				});
			}
		});
	},
	
	//Hailey modified on 05/05/2023
	saveGateInCargo: function(){
		var me = this;
		var refs = me.getReferences();
		var gcGateInstore = me.getStore('gateInCargo');
		var gateInGC = me.getViewModel().get('gateInGC');
		var insertItem = me.getViewModel().get('gateInGC');
		var gateNo = refs.refGateInGateCombo.getValue();
		var proxy = gateInGC.getProxy();
		var damageCheckDetail = me.getStore('damageCheckDetail')
		
		//Check Is truck in terminal or not
		var gcGateOutstore = me.getStore('gateOutCargo');
		var isInTerminal = false;
		
		gcGateOutstore.load({
			callback: function(records, operation, success) {
				if (success) {
					var gateInLorry = records.find(record => record.get('lorryNo') == insertItem.get('lorryNo'));

					if (gateInLorry) {
						MessageUtil.warning('warning_msg', "gateoprations_truckInTermina_msg");
						return;
					}

					if (StringUtil.isNullorEmpty(refs.refGateInGCLorryField.getValue())) {
						MessageUtil.error('warning_msg', 'gateoprations_truckNo_inquiry_msg');
						return;
					}
					
					if(gateNo == null || gateNo == ''){
						MessageUtil.error('warning_msg','gateoprations_gateNo_inquiry_msg');
						return;
					}

					if(!refs.ctlBlDoNoField.value && !refs.ctlShipgNoteNoField.value){
						MessageUtil.error('warning_msg','gateoprations_documentNo_inquiry_msg');
						return;
					}
					
					if (insertItem.get('blNo') == '' || insertItem.get('blNo') == null) {
						insertItem.set('cgNo', insertItem.get('grNo'));
						insertItem.set('cgInOutCd', 'I');
					} else if (insertItem.get('shipgNoteNo') == '' || insertItem.get('shipgNoteNo') == null) {
						insertItem.set('cgNo', insertItem.get('blNo'));
						insertItem.set('cgInOutCd', 'O');
					}
					
					insertItem.set('searchType', 'gateIn');
					insertItem.set('lorryNo', refs.refGateInGCLorryField.getValue());
					insertItem.set('userId', MOST.config.Token.getUserId());
					
					if(refs.refGateInDateTime.getValue()){			
						var gateInDate = Ext.Date.format( new Date(refs.refGateInDateTime.getValue()), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()); 
					}else{
						var gateInDate = Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
					}
					insertItem.set('gateCd', gateNo);
					insertItem.set('gateInDt', gateInDate);
					var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
					var isCreated = insertItem.phantom;
					
					if(insertItem.get('agChkInTime') != '' && insertItem.get('agChkInTime') != null){
						proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/gateoperation/cargoArrivalDeliveryChkInTime';
						updateParm.phantom = isCreated;
					}else{
						proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/gateoperation/cargoArrivalDelivery';
					}
					updateParm.getProxy().url = proxy.url;
					updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
					updateParm.set('userId', MOST.config.Token.getUserId());
					updateParm.set('item', insertItem.data);
					updateParm.save({
						success: function(record, operation, success) {
							if(damageCheckDetail.getCount() > 0){
								me.checkDamageCheck(record)
							}else{
								MessageUtil.saveSuccess();
								//Refresh Data after save
								refs.refGateInGCLorryField.setValue('');
								refs.refGateInDateTime.setValue('');
								refs.refGateInGateCombo.setValue('');
								gcGateInstore.removeAll();
								gcGateInstore.load();
								me.getViewModel().setData({gateInGC: Ext.create('MOST.model.operation.GateOperation')});
							}
						}
					});
					
				}
			}
		});
	},

	
	checkDamageCheck: function(insertedJob){
		var me = this,
		refs = me.getReferences(),
		uploadedFileDamageStore = me.getStore('uploadedFileDamageStore'),
		damageCheckDetail = me.getStore('damageCheckDetail'),
		frm = refs.fileForm,
		formData = new FormData(frm)		
		
		damageCheckDetail.each(function(record) {
			if(record.data.workingStatus === WorkingStatus.INSERT){
				record.data.jobNo = insertedJob.data.jobNo
			}
		});
		damageCheckDetail.commitChanges()
		if(uploadedFileDamageStore.getCount() > 0){
			uploadedFileDamageStore.each(function(record, index){
				if(record.get('workingStatus') === WorkingStatus.INSERT){
					formData.append(record.data.fileName, record.data.fileStream);
				}
			});
			me.fileDamageCheckUpload(formData);
		} else {
			me.saveDamageCheckProcess(); 
		}
	},

	fileDamageCheckUpload : function(formData) {
		var me = this;
		var uploadedFileDamageStore = me.getStore('uploadedFileDamageStore')
    	var xhr = new XMLHttpRequest();
    	
    	xhr.addEventListener('loadend', function() {
    		if(xhr.status === 200) {
    			var rtnData = JSON.parse(xhr.responseText); // get filename - uuid
    			uploadedFileDamageStore.each(function(record, index, array) {
					if(record.get('workingStatus') === WorkingStatus.INSERT){
						record.set('ufileName', rtnData[record.get('fileName')]);
					}
    	    	});
				uploadedFileDamageStore.commitChanges()
                me.saveDamageCheckProcess();
    		}else{
    			MessageUtil.warning('warning_msg', 'fail_msg');
    		}
    		
    	});
    	
    	xhr.open('POST',MOST.config.Locale.getRestApiDestUrl() + '/file/manage/fileupload');
    	xhr.setRequestHeader('Authorization', MOST.config.Token.getTokenType() + ' ' + MOST.config.Token.getAccessToken());
    	xhr.send(formData);
    	
	},

	saveDamageCheckProcess: function () {
        var me = this,
			refs = me.getReferences(),
			theDamageStore = me.getStore('theDamageStore'),
			currentUploadStore = me.getStore('uploadedFileDamageStore'),
			damageCheckDetailStore = me.getStore('damageCheckDetail'),
			detailItem = me.getViewModel().get('theDmg'),
			gcGateInstore = me.getStore('gateInCargo'),
			sendArray = new Array(),
			uploadList = new Array()
		;

		damageCheckDetailStore.data.items.forEach(item => {
			sendArray.push(item.data)
		})

		if(currentUploadStore.data.length > 0) {
			for(var i = 0; i < currentUploadStore.data.length; i++) {
				var uploadItem = currentUploadStore.data.items[i];
				var recordUpload = Ext.create('MOST.model.common.FileUpload');
				recordUpload.set('ufileName', uploadItem.get('ufileName'));
				recordUpload.set('pgmId', 'mpct239');
				recordUpload.set('fileName', uploadItem.get('fileName'));
				recordUpload.set('fileSize', uploadItem.get('fileSize'));
				recordUpload.set('fileStream', null);
				recordUpload.set('workingStatus', uploadItem.get('workingStatus'));
				recordUpload.set('catgCd', uploadItem.get('catgCd'))
				uploadList.push(recordUpload.data);
			}
			
		}

		var proxy = detailItem.getProxy();
		proxy.url = theDamageStore.getProxy().url;
		detailItem.phantom = false;
		detailItem.set("items", sendArray);
		detailItem.set('uploadItems', uploadList);
		detailItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		detailItem.save({
			success : function(records,success){
				if(me.tabMode == 'gateIn'){
					MessageUtil.saveSuccess(); // Success Message
					//Refresh Data after save
					refs.refGateInGCLorryField.setValue('');
					refs.refGateInDateTime.setValue('');
					refs.refGateInGateCombo.setValue('');
					gcGateInstore.removeAll();
					gcGateInstore.load();
					me.getViewModel().setData({gateInGC: Ext.create('MOST.model.operation.GateOperation')});
				}else{
					MessageUtil.saveSuccess();
					me.onPrintGatePass(records);
					//Refresh Data after save
					refs.ctlGateOutLorryField.setValue('');
					refs.refGateOutDateTime.setValue('');
					refs.ctlGateOutGateCombo.setValue('');
					gcGateOutstore.removeAll();
					gcGateOutstore.load();
					me.getViewModel().setData({gateOutLorry: null});
				}
			}
		});
		
    },
	
	saveGateOutCargo: function(){
		var me = this;
		var refs = me.getReferences();
		var gcGateOutstore = me.getStore('gateOutCargo');
		var gateOutGC = me.getViewModel().get('gateOutLorry');
		var grid = me.lookupReference('refGateOutCargo');
		var damageCheckDetail = me.getStore('damageCheckDetail')
		var insertItem = grid.getSelection() == null ? null : grid.getSelection()[0];
		var gateNo = refs.ctlGateOutGateCombo.getValue();
		var proxy = gateOutGC.getProxy();
		proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/gateoperation/cargoArrivalDelivery';
		
		if(gateNo == null || gateNo == ''){
			MessageUtil.error('warning_msg','gateoprations_gateNo_inquiry_msg');
			return;
		}
		
		if(refs.refGateInGCTruck.value == true && (gateOutGC.get('lorryNo') == null || gateOutGC.get('lorryNo') == '')){
			MessageUtil.error('warning_msg','gateoprations_truckNo_inquiry_msg');
			return;
		}
		
		if(refs.refGateInGCDriver.value == true && (gateOutGC.get('driverID') == null || gateOutGC.get('driverID') == '')){
			MessageUtil.error('warning_msg','gateoprations_driverId_inquiry_msg');
			return;
		}

		if(!insertItem){
			MessageUtil.error('warning_msg','gateoprations_selection_msg');
			return;
		}
		
		if(insertItem.get('blNo') == '' || insertItem.get('blNo') == null){
			insertItem.set('cgNo', insertItem.get('grNo'));
		}else if(insertItem.get('shipgNoteNo') == '' || insertItem.get('shipgNoteNo') == null){
			insertItem.set('cgNo', insertItem.get('blNo'));
		}
		
		//insertItem.set('cgInOutCd', 'O');
		insertItem.set('searchType', 'gateOut');
		insertItem.set('lorryNo', refs.ctlGateOutLorryField.getValue());
		insertItem.set('userId', MOST.config.Token.getUserId());
		
		if(refs.refGateOutDateTime.getValue()){			
			var gateOutDate = Ext.Date.format( new Date(refs.refGateOutDateTime.getValue()), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()); 
		}else{
			var gateOutDate = Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		}
		 
		insertItem.set('gateCd', gateNo);
		insertItem.set('gateOutDt', gateOutDate);
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var isCreated = insertItem.phantom;
		
		updateParm.getProxy().url = proxy.url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('userId', MOST.config.Token.getUserId());
		updateParm.set('item', insertItem.data);
		
		var leftOverCheck = false;
		
		if(gcGateOutstore.data.items != null && gcGateOutstore.data.items.length > 0){
			for(var i = 0; i < gcGateOutstore.data.items.length; i++){

				var gateOutItem = gcGateOutstore.data.items[i].data;
				
				if((insertItem.get('sdoNo') == gateOutItem.sdoNo) && (gateOutItem.chk == 'Y')){
					leftOverCheck = true;
				}
			}
		}
		
		if(leftOverCheck){
			MessageUtil.question('warning_msg', 'This SDO still have package need to confirm. Do you want to continue?', null,
					function(button){
						if (button === 'ok') {
							updateParm.save({
								success: function() {
									MessageUtil.saveSuccess();
								}
							});
							//Refresh Data after save
							 refs.ctlGateOutLorryField.setValue('');
							refs.refGateOutDateTime.setValue('');
							refs.ctlGateOutGateCombo.setValue('');
							gcGateOutstore.removeAll();
							gcGateOutstore.load();
							me.getViewModel().setData({gateOutLorry: null});
						}
					}
				);	
		} else {
			updateParm.save({
				success: function(record, operation, success) {
					if(damageCheckDetail.getCount() > 0){
						me.checkDamageCheck(record)
					}else{
						MessageUtil.saveSuccess();
						me.onPrintGatePass(record);
						//Refresh Data after save
						refs.ctlGateOutLorryField.setValue('');
						refs.refGateOutDateTime.setValue('');
						refs.ctlGateOutGateCombo.setValue('');
						gcGateOutstore.removeAll();
						gcGateOutstore.load();
						me.getViewModel().setData({gateOutLorry: null});
					}

				}
			});
			
		}
	},

	saveGateOutRORO: function(){
		var me = this;
		var refs = me.getReferences();
		var roroGateOutstore = me.getStore('gateOutForRoRo');
		var gateOutRR = me.getViewModel().get('gateOutRORO');
		var theDriver = me.getViewModel().get('theDriver');
		var grid = me.lookupReference('refGateOutRoRoExGrid');
		var insertItem = grid.getSelection() == null ? null : grid.getSelection()[0];
		var gateNo = refs.refGateOutRoRoCombo.getValue();
		var proxy = gateOutRR.getProxy();
		proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/gateoperation/roroArrivalDelivery';
		
		if(gateNo == null || gateNo == ''){
			MessageUtil.error('warning_msg','gateoprations_gateNo_inquiry_msg');
			return;
		}
		
		if(refs.refGateOutTruck.value == true && (gateOutRR.get('lorryNo') == null || gateOutRR.get('lorryNo') == '')){
			MessageUtil.error('warning_msg','gateoprations_truckNo_inquiry_msg');
			return;
		}
		
		if(refs.refGateOutDriver.value == true && (theDriver.get('driverId') == null || theDriver.get('driverId') == '')){
			MessageUtil.error('warning_msg','gateoprations_driverId_inquiry_msg');
			return;
		}
		
		if(insertItem.get('blNo') == '' || insertItem.get('blNo') == null){
			insertItem.set('cgNo', insertItem.get('grNo'));
		}else if(insertItem.get('shipgNoteNo') == '' || insertItem.get('shipgNoteNo') == null){
			insertItem.set('cgNo', insertItem.get('blNo'));
		}
		
		//insertItem.set('cgInOutCd', 'O');
		insertItem.set('searchType', 'gateOut');
		insertItem.set('lorryNo', refs.refGateOutRoRoLorryField.getValue());
		insertItem.set('driverId', refs.refGateOutRoRoDriverIdField.getValue());
		insertItem.set('userId', MOST.config.Token.getUserId());
		
		if(refs.refGateOutRoRoDateTime.getValue()){			
			var gateOutDate = Ext.Date.format( new Date(refs.refGateOutRoRoDateTime.getValue()), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()); 
		}else{
			var gateOutDate = Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		}
		 
		insertItem.set('gateCd', gateNo);
		insertItem.set('gateOutDt', gateOutDate);
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var isCreated = insertItem.phantom;
		//Mantis: 0167274
		var searchType = refs.refGateInTruck.getValue() ? 'TRUCK' : 'DRIVER';
		
		updateParm.getProxy().url = proxy.url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('userId', MOST.config.Token.getUserId());
		updateParm.set('item', insertItem.data);
		updateParm.save({
			success: function() {
				MessageUtil.saveSuccess();
				//Refresh Data after save
				refs.refGateOutRoRoLorryField.setValue('');
				refs.refGateOutRoRoDriverIdField.setValue('');
				refs.refGateOutRoRoDateTime.setValue('');
				refs.refGateOutRoRoCombo.setValue('');
				roroGateOutstore.removeAll();
				roroGateOutstore.load({
					params: {
						searchType: searchType
					}
				});
				me.getViewModel().setData({gateOutRORO: null});
				me.getViewModel().setData({sdoInfo: null});
				me.getViewModel().setData({theDriver: null});
			}
		});
		
		
	},
	
	
	onSave: function() {
		var me = this;
		var refs = me.getReferences();
		
		if(me.tabMode === 'gateIn') {
			me.checkDriverLicenseGI();
		} else {
			me.checkDriverLicenseGO();
		}
	},
	
	onPassedTerminalHoldValidation : function(){
		var me = this;
		
		if(me.tabMode === 'gateIn') {
			me.checkDriverLicenseGI();
		} else {
			me.checkDriverLicenseGO();
		}
	},
	
	onOpenAssignmentTruckPopup:function(field, button, e){
		var me = this;
		var refs = me.getReferences();
		
		var params = {
				lorryNo: refs.ctlGateInLorryField.getValue()
			};
		me.openCodePopup('popup-assignmenttruckpopup', field.reference, params);
	},
	
	onOpenGRPopup:function(field, button, e){
		var me = this;
		var refs = me.getReferences();
		
		if(field.reference === 'ctlGateInGrField'){
			if (StringUtil.isNullorEmpty(refs.ctlGateInLorryField.getValue())) {
				MessageUtil.warning('portsafetyconfirmation_validcheck_gate_mandatory_title', "portsafetyconfirmation_validcheck_lorry_mandatory_msg");
				return;
			}
			
			var params = {
					lorryNo: refs.ctlGateInLorryField.getValue()
				};
			me.openCodePopup('popup-goodsreceiptpopup', field.reference, params);
		}
		else if(field.reference === 'ctlGateOutGrField'){
			
		}	
	},
	
	onOpenSDOPopup:function(field, button, e){
		var me = this;
		var refs = me.getReferences();
		
		if (StringUtil.isNullorEmpty(refs.ctlGateInLorryField.getValue())) {
			MessageUtil.warning('portsafetyconfirmation_validcheck_gate_mandatory_title', "portsafetyconfirmation_validcheck_lorry_mandatory_msg");
			return;
		}
		
		var params = {
				lorryNo: refs.ctlGateInLorryField.getValue()
			};
		me.openCodePopup('popup-subdeliveryorderpopup', field.reference, params);
	},
	
	onOpenInGateTruckPopup:function(field, button, e){
		var me = this;
		var refs = me.getReferences();
	},
	
	onOpenGatePassPopup:function(field, button, e){
		var me = this;
		var refs = me.getReferences();
	},
	
	onBindingDriverInfo: function (gateInOut, obj){
		var me = this;
		var refs = me.getReferences();
		
		if(gateInOut === 'GI'){
			refs.ctlGateInDriverIdField.setValue(obj.get('driverId'));
			refs.txtGateInDriverName.setValue(obj.get('driverName'));
			refs.txtGateInLicenseNo.setValue(obj.get('licenseNo'));
			refs.txtGateInExpiryDate.setValue(obj.get('licenseExpired'));
			refs.txtGateInTransporter.setValue(obj.get('transportCd'));
			refs.txtGateInTransporterName.setValue(obj.get('transportName'));
			//refs.txtGICustomStatus.setValue(obj.get('customsReleasedStatus'));
		}
		else {
			refs.ctlGateOutDriverIdField.setValue(obj.get('driverId'));
			refs.txtGateOutDriverName.setValue(obj.get('driverName'));
			refs.txtGateOutLicenseNo.setValue(obj.get('licenseNo'));
			refs.txtGateOutExpiryDate.setValue(obj.get('licenseExpired'));
			refs.txtGateOutTransporter.setValue(obj.get('transportCd'));
			refs.txtGateOutTransporterName.setValue(obj.get('transportName'));
			//refs.txtGOCustomStatus.setValue(obj.get('customsReleasedStatus'));
			refs.ctlGateOutTicketNoField.setValue(obj.get('gateTxnNo'));
		}
	},
	
	onBindingDocumentInfo: function (gateInOut, obj){
		var me = this;
		var refs = me.getReferences();
		
		if(gateInOut === 'GI'){
			if(obj) {
				refs.txtGateInCommodity.setValue(obj.get('cmdtName'));
				refs.txtGateInMt.setValue(obj.get('mt'));
				refs.txtGateInM3.setValue(obj.get('m3'));
				refs.txtGateInQty.setValue(obj.get('pkgQty'));
				me.vslCallId = obj.get('vslCallId');
				refs.txtGateInTxnNo.setValue(obj.get('gateTxnNo'));
				refs.txtDMode.setValue(obj.get('delvTpName'));
				refs.txtGateInToLocation.setValue(obj.get('location'));
				
				refs.txtGICustomStatus.setValue(obj.get('customsReleasedStatus'));
			}
			else {
				refs.txtGateInCommodity.setValue();
				refs.txtGateInMt.setValue();
				refs.txtGateInQty.setValue();
				me.vslCallId = '';
				refs.txtDMode.setValue();
				refs.txtGateInToLocation.setValue();
				
				refs.txtGICustomStatus.setValue();
			}
		}
		else {
			if(obj) {
				refs.txtGateOutCommodity.setValue(obj.get('cmdtName'));
				refs.txtGateOutMt.setValue(obj.get('mt'));
				refs.txtGateOutM3.setValue(obj.get('m3'));
				refs.txtGateOutQty.setValue(obj.get('pkgQty'));
				me.vslCallId = obj.get('vslCallId');
				//refs.txtGateTxnNo.setValue(obj.get('gateTxnNo'));
				refs.refGiOfGateOutDateTimeLink.setValue(obj.get('gateInDate'));
				
				refs.txtGOCustomStatus.setValue(obj.get('customsReleasedStatus'));
			}
			else {
				refs.txtGateOutCommodity.setValue();
				refs.txtGateOutMt.setValue();
				refs.txtGateOutM3.setValue();
				refs.txtGateOutQty.setValue();
				me.vslCallId = '';
				//refs.txtGateTxnNo.setValue();
				refs.refGateInDateTimeLink.setValue();
				
				refs.txtGOCustomStatus.setValue();
			}
		}
	},

	onChangeLorry: function(gateInOut){
		var me = this;
		var refs = me.getReferences();

		if(gateInOut === 'GI'){
			
			refs.ctlGateInRoRoGrField.setValue('');
			refs.ctlDgCombo.setValue('');
			refs.ctlDgStatusCombo.setValue('');
			refs.txtDMode.setValue('');
			refs.txtGateInCommodity.setValue('');
			refs.txtGateInMt.setValue('');
			refs.txtGateInQty.setValue('');

			refs.ctlGateInGrField.setValue('');
			refs.ctlDgCombo.setValue('');
			refs.ctlDgStatusCombo.setValue('');
			refs.txtDMode.setValue('');
			refs.txtGateInCommodity.setValue('');
			refs.txtGateInMt.setValue('');
			refs.txtGateInQty.setValue('');
		}
		if(gateInOut === 'GO'){

			//refs.ctlGateOutGrField.setValue('');
			refs.txtGateOutCommodity.setValue('');
			refs.txtGateOutMt.setValue('');
			refs.txtGateOutQty.setValue('');

			refs.ctlGateOutTicketNoField.setValue('');
			
			refs.txtGateOutCommodity.setValue('');
			refs.txtGateOutMt.setValue('');
			refs.txtGateOutQty.setValue('');
			
		}
	},
	
	onFindLorryDriver: function(value){
		var me = this;
		var refs = me.getReferences();
		var popUpDivCd = value;
		var lorryDriverItem;
		
		if (me.tabMode === 'gateIn') {
			if (popUpDivCd === 'LR2') {
				lorryDriverItem = me.getViewModel().get('gateInLorry');
			} else if (popUpDivCd === 'DV') {
				lorryDriverItem = me.getViewModel().get('gateInDriverId');
			}
		} else {
			if (popUpDivCd === 'LR2') {
				lorryDriverItem = me.getViewModel().get('gateOutLorry');
			} else if (popUpDivCd === 'DV') {
				lorryDriverItem = me.getViewModel().get('gateOutDriverId');
			}
		}
		
		if (popUpDivCd === 'LR') {
			if(me.tabMode === 'gateIn'){
				if(me.vslCallId === 'STRG') {
					refs.ctlGateInLorryField.setValue(lorryDriverItem.get('cd'));
				} else {
					refs.ctlGateInLorryField.setValue(lorryDriverItem.get('lorryNo'));
				}
			// Gate Out
			} else {
				if(me.vslCallId === 'STRG') {
					refs.ctlGateOutLorryField.setValue(lorryDriverItem.get('cd'));
				} else {
					refs.ctlGateOutLorryField.setValue(lorryDriverItem.get('lorryNo'));
				}
				
				if (StringUtil.isNullorEmpty(refs.txtGateOutTransporter.getValue())) {
					me.insGateOutData.set('tsptCompNm', lorryDriverItem.get('tsptrNm'));
					refs.txtGateOutTransporter.setValue(lorryDriverItem.get('ptnrCd'));
					refs.txtGateOutTransporterName.setValue(lorryDriverItem.get('tsptrNm'));
				} else {
					me.insGateOutData.set('tsptCompNm', lorryDriverItem.get('tsptrNm'));
					refs.txtGateOutTransporterName.setValue(lorryDriverItem.get('tsptrNm'));
				}
			}
		}
		
		if (popUpDivCd === 'DV') {
			if(me.tabMode === 'gateIn'){
				refs.ctlGateInDriverIdField.setValue(lorryDriverItem.get('cd'));
				refs.txtGateInLicenseNo.setValue(lorryDriverItem.get('licsNo'))
				refs.txtGateInExpiryDate.setValue(lorryDriverItem.get('licsExprYmd'))
				refs.txtGateInDriverName.setValue(lorryDriverItem.get('cdNm'))
			// Gate Out
			} else {
				refs.ctlGateOutDriverIdField.setValue(lorryDriverItem.get('cd'));
				refs.txtGateOutLicenseNo.setValue(lorryDriverItem.get('licsNo'))
				refs.txtGateOutExpiryDate.setValue(lorryDriverItem.get('licsExprYmd'))
				refs.txtGateOutDriverName.setValue(lorryDriverItem.get('cdNm'))
			}
		}
		
		if (popUpDivCd == 'LR2') {	
			if(me.tabMode === 'gateIn'){
				refs.ctlGateInLorryField.setValue(lorryDriverItem.get('cd'));
				refs.txtGateInTransporter.setValue(lorryDriverItem.get('ptnrCd'))
				refs.txtGateInTransporterName.setValue(lorryDriverItem.get('tsptrNm'))
			// Gate Out
			} else {
				refs.ctlGateOutLorryField.setValue(lorryDriverItem.get('cd'));
				refs.txtGateOutTransporter.setValue(lorryDriverItem.get('ptnrCd'))
				refs.txtGateOutTransporterName.setValue(lorryDriverItem.get('tsptrNm'))
				me.searchLorryGateIn();
			}
		}
	},
	
	onGetGateOutGateTicketInformation: function () {
		var me = this;
		var refs = me.getReferences();
		var gateOutLorryItem = me.getViewModel().get('gateOutLorry');
		
		var store = me.getStore('gateTicketNoPopup');
		store.load({
			params: {
				lorryNo: gateOutLorryItem.get('lorryNo'),
				vslCallId: gateOutLorryItem.get('vslCallId'),
				gateTxnNo: gateOutLorryItem.get('gateTxnNo')
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						me.getViewModel().setData({ gateOutGp: records[0]});
						
						me.vslCallId = records[0].get('vslCallId');
						refs.ctlGateOutTicketNoField.setValue(records[0].get('gateTxnNo'));
						refs.refGateInDateTimeLink.setValue(records[0].get('gateInDate'));
						refs.txtGateOutCommodity.setValue(records[0].get('cmdtCode'));
						refs.txtGateOutMt.setValue(records[0].get('mt'));
						refs.txtGateOutQty.setValue(records[0].get('pkgQty'));
						refs.txtGateOutM3.setValue(records[0].get('m3'));
						
						refs.txtGOCustomStatus.setValue(records[0].get('customsReleasedStatus'));
					}
				}
			}
		});
	},
	onDamage_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		if(me.tabMode === 'gateIn'){
			me.prevData = me.getViewModel().get('gateInGC')
		}else if(me.tabMode === 'gateOut'){
			me.prevData = me.getViewModel().get('gateOutLorry')
		}
		
		if(me.prevData){
			me.prevData.set('locCd', 'GATE')
			me.prevData.set('isOperationScreen', true)
			var blNo = me.prevData.get('blNo')
			var snNo = me.prevData.get('shipgNoteNo')
			var vslCallId = me.prevData.get('vslCallId')
			if((StringUtil.isNullorEmpty(blNo) || StringUtil.isNullorEmpty(snNo)) && StringUtil.isNullorEmpty(vslCallId)) {
				MessageUtil.error('warning_msg','gateoprations_documentNo_inquiry_msg');
				return;
			}
			me.openCodePopup('app-damagecheckregistration', 'btnDamage', me.prevData);
		}
	},
	
	onDimension_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		
		me.openCodePopup('app-dimensioncheck', 'Dimension Check', me.prevData);
		
	},
	
	onGridGOREClick1:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refGateOutCargo');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var theGateOutLorry = me.getViewModel().get('gateOutLorry');
		
		if(selection == null) return;
		
		if(theGateOutLorry != null){	
			if(theGateOutLorry.driverId == undefined){
				var driverId = theGateOutLorry.get('driverId');
				var driverNm = theGateOutLorry.get('driverNm');
				var liscNo = theGateOutLorry.get('liscNo');
				var expdate = theGateOutLorry.get('expdate');
				var tsptr = theGateOutLorry.get('tsptr');
				var tsptCompNm = theGateOutLorry.get('tsptCompNm');
			}else{
				var driverId = theGateOutLorry.driverId;
				var driverNm = theGateOutLorry.driverNm;
				var liscNo = theGateOutLorry.liscNo;
				var expdate = theGateOutLorry.expdate;
				var tsptr = theGateOutLorry.tsptr;
				var tsptCompNm = theGateOutLorry.tsptCompNm;
			}		
			
			if(selection.data.driverId == null || selection.data.driverId == ''){
				selection.data.driverId = driverId;
				selection.data.driverNm = driverNm;
				selection.data.liscNo = liscNo;
				selection.data.expdate = expdate;
				selection.data.tsptr = tsptr;
				selection.data.tsptCompNm = tsptCompNm;
			}
			
			me.getViewModel().setData({gateOutLorry: selection});
		}else{
			me.getViewModel().setData({gateOutLorry: selection});
		}
	},
	
	onRadioEditableChange : function(field, newValue, oldValue) {
		var me = this;
		var refs = me.getReferences();
		
		if(!oldValue){
			me.setEditableUserControl(field.getReference());
		}
	},
	
	onPreview: function() {
		var me = this;
		var refs = me.getReferences();
		
		if(refs.ctlGateOutTab.activeTab.id.indexOf('gateoutcargo') != -1){			
			var grid = me.lookupReference('refGateOutCargo');
			var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
			
			if(selection == null) 
				return;
			
			var searchParm = Ext.create("MOST.model.pdfprint.SearchReportBizParm");
			var params = me.createParam(searchParm, ['file','serviceId','param1']);
			
			params['file'] = me.PDF_FILE; // report format file name
			params['serviceId'] = me.PDF_FUNCTION; // calling function 
			params['branchCode'] = MOST.config.Token.getBranchCode(); // branch code fro multi db
			params['param1'] = selection.get("vslCallId");
			params['param2'] = selection.get("lorryNo");
			params['param3'] = selection.get("gateTxnNo");
			params['param4'] = selection.get("sdoNo");
			params['param5'] = selection.get("grNo");
			params['param6'] = MOST.config.Token.getUserId(); //user Id
			params['param7'] = MOST.config.Token.getUserName();
			
			me.openPDFPreview(params);
			
			me.onUpdateCirYnItem();
		}
	},

	onPrintGatePass: function(record) {
		var me = this;
		var refs = me.getReferences();
		
		if(refs.ctlGateOutTab.activeTab.id.indexOf('gateoutcargo') != -1){						
			var searchParm = Ext.create("MOST.model.pdfprint.SearchReportBizParm");
			var params = me.createParam(searchParm, ['file','serviceId','param1']);
			
			params['file'] = me.PDF_FILE;
			params['serviceId'] = me.PDF_FUNCTION;
			params['branchCode'] = MOST.config.Token.getBranchCode();
			params['param1'] = record.get("vslCallId");
			params['param2'] = record.get("lorryNo");
			params['param3'] = record.get("gateTxnNo");
			params['param4'] = record.get("sdoNo");
			params['param5'] = record.get("grNo");
			params['param6'] = MOST.config.Token.getUserId(); 
			params['param7'] = MOST.config.Token.getUserName();
			params['param8'] = record.get("vslCd");
			
			me.openPDFPreview(params);
			
			me.onUpdateCirYnItem();
		}
	},
	
	onUpdateCirYnItem: function(){
		var me = this;
	    var refs = me.getReferences();
	    
	    if(refs.ctlGateOutTab.activeTab.id.indexOf('gateoutcargo') != -1){    	
	    	var grid = me.lookupReference('refGateOutCargo');
	    	var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
	    	
	    	if(selection == null) 
	    		return;
	    	
	    	var record = Ext.create('MOST.model.operation.CargoArrvDelv');
	    	record.set('vslCallId', selection.get("vslCallId"));
	    	record.set('gateTxnNo', selection.get("gateTxnNo"));
	    	record.set('lorryNo', selection.get("lorryNo"));
	    	record.set('cgNo', (selection.get("sdoNo") != '' ? selection.get("blNo") : selection.get("grNo")));
	    	record.set('printCirYn', 'Y');
	    	record.set('userId', MOST.config.Token.getUserId());
	    	
	    	
	    	var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
	    	updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/assignedtrucklist/cir';
	    	updateParm.phantom = false;
	    	updateParm.set('workingStatus', WorkingStatus.UPDATE);
	    	updateParm.set('userId', MOST.config.Token.getUserId());
	    	updateParm.set('item', record.data);
	    	
	    	updateParm.save({
	    		success: function(record) {
	    		}
	    	});
	    }
	},
	onGateInROROGridItemClick:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refGateInRoRo');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var unitNoGrid = me.lookupReference('refRoRoUnitForGateInList');
		
		if(selection == null) return;
		me.getViewModel().setData({gateInRORO: selection});
		me.getViewModel().setData({theDriver: selection});
		//sMantis: 0167331
		me.loadRoRoUnitNoList(selection, unitNoGrid);
		//eMantis: 0167331
	},
	
	onGateOutROROGridItemClick:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refGateOutRoRoExGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var unitNoGrid = me.lookupReference('refRoRoUnitForGateOutList');
		
		if(selection == null) return;
		me.getViewModel().setData({gateOutRORO: selection});
		me.getViewModel().setData({sdoInfo: selection});
		me.getViewModel().setData({theDriver: selection});
		//sMantis: 0167331
		me.loadRoRoUnitNoList(selection, unitNoGrid);
		//eMantis: 0167331
	},

	
	onWBConnect:function(){
		var me = this;
		var refs = me.getReferences();
		var decoder = new TextDecoder();
		//var writer = null;
		//var reader = null;
		//var intervalId = null;
		
   		navigator.serial.requestPort().then((port) => {
   			
         this.serialPort = port;
         this.serialPort.open({ baudRate: 9600 }).then((result) => { //9600 is port number
        	 //After Serial Port Connected
        	 this.isConnected = true;
        	 this.writer = this.serialPort.writable.getWriter();
        	 this.reader = this.serialPort.readable.getReader();
        	 
        	 this.intervalId = setInterval(() => {
        		 this.reader.read().then((e) => {
	                   if (e.value) {
	                     refs.refWBTest.setValue(decoder.decode(e.value));
	                   }
	                 });
	             }, 1000);
            })
        });
	},
	
	destroy:function(){
		var me = this;
		var refs = me.getReferences();
		
		if(this.isConnected == false){
			return;
		}
		
		clearInterval(this.intervalId);
		this.writer.releaseLock();
		
		this.reader.cancel().then(() => {
		      this.reader.releaseLock();
		      this.serialPort.close();
		      this.isConnected = false;
				
		 });

	},
	
	
	/**
	 * EVENT END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		var saChangeCombo = me.getStore('saChangeCombo');
		var insGateInData =  Ext.create('MOST.model.operation.CargoArrvDelv');
		var insGateOutData = Ext.create('MOST.model.operation.CargoArrvDelv');
		// GateIn afterSetCodePopupData -----------------------------------------------------------
		
		if(targetControl != 'btnDamage' ){
			if (targetControl === 'refGateInRoRoLorryField' || 
				targetControl === 'ctlGateInRoRoDriverIdField' || 
				targetControl === 'refGateInGCLorryField' || 
				targetControl === 'refGateInDriverIdField' || 
				targetControl === 'ctlGateInRoRoGrField' || 
				targetControl === 'ctlGateInRoRoBldoField' || 
				targetControl === 'ctlGateInGrField' || 
				targetControl === 'ctlGateInBldoField' ||
				targetControl === 'ctlBlDoNoField' ||
				targetControl === 'ctlShipgNoteNoField' ||
				targetControl === 'ctlGateInGCDriverIdField' 
			) {
	
				me.tabMode = 'gateIn';
				
			}
		}

		if (
			targetControl === 'ctlGateInGrField' 	|| 
			targetControl === 'ctlGateInBldoField'  || 
			targetControl === 'ctlGateOutTicketNoField'   || 
			targetControl === 'ctlGateOutGrField') {

				me.getViewModel().setData({gateInGr: null});
				me.getViewModel().setData({gateInBldo: null});
				me.getViewModel().setData({gateOutGp: null});
				me.getViewModel().setData({gateOutGr: null});
		}	
		
		//Hailey modified
		if(targetControl === 'refGateInRoRoLorryField'){
			if(returnValue){
				var gateInRoRoStore = me.getStore('gateInForRoRo');
				gateInRoRoStore.load({
					params : {
						searchType: 'TRUCK',
						lorryNo: returnValue.code
					},
					callback: function(records, operation, success) {
						if (success) {
						}
					}
				});
			} else {
				me.getViewModel().setData({gateInRORO: null});
			}
		} else if (targetControl === 'refGateInGCLorryField') {
			if (returnValue) {
				var returnData = returnValue.item;
				refs.ctlGateInGCDriverIdField.setValue(returnData.get('driverId'));
				refs.refGateInDriverName.setValue(returnData.get('driverName'));
				refs.refGateInLicenseNo.setValue(returnData.get('licenseNo'));
				refs.refGateInExpiryDate.setValue(returnData.get('licenseExpired'));
				refs.refGateInTransporter.setValue(returnData.get('transportCd'));
				refs.refGateInTransporterName.setValue(returnData.get('transportName'));
				refs.refGateInTransporter.setValue(returnData.get('ptnrCode'));
				refs.refGateInGCLorryField.setValue(returnData.get('lorryNo'));
				
				var gateInGCStore = me.getStore('gateInCargo');
				gateInGCStore.load({
					params: {
						lorryNo: returnValue.code
					},
					callback: function (records, operation, success) {
						if (success) {
						}
					}
				});
			} else {
				me.getViewModel().setData({ gateInGC: Ext.create('MOST.model.operation.GateOperation') });
			}
		} else if (targetControl === 'ctlGateInRoRoDriverIdField') {
			if(returnValue){
				var gateInRoRoStore = me.getStore('gateInForRoRo');
				me.getViewModel().setData({theDriver: returnValue.item});
				refs.ctlGateInRoRoDriverIdField.setValue(returnValue.code);
				refs.txtGateInRoRoDriverName.setValue(returnValue.codeName);
				gateInRoRoStore.load({
					params : {
						searchType: 'DRIVER',
						driverId: returnValue.code
					},
					callback: function(records, operation, success) {
						if (success) {
						}
					}
				});
			} else {
				me.getViewModel().setData({gateInRORO: null});
			}
		}
		// GateOut afterSetCodePopupData =============================================================
		else if (targetControl === 'ctlGateOutLorryField') {
			//me.onChangeLorry('GO');
			if (returnValue) {
				var returnData = returnValue.item.getData();

				me.getViewModel().setData({ gateOutLorry: null });
				me.getViewModel().setData({ gateOutLorry: returnValue.item });
				refs.ctlGateOutDriverIdField.setValue(returnData.driverId);
				refs.txtGateOutDriverName.setValue(returnData.driverName);
				refs.txtGateOutLicenseNo.setValue(returnData.licenseNo);
				refs.txtGateOutExpiryDate.setValue(returnData.licenseExpired);
				refs.txtGateOutTransporter.setValue(returnData.transportCd);
				refs.txtGateOutTransporterName.setValue(returnData.transportName);

				// me.onBindingDriverInfo('GO', returnValue.item);
				// me.onBindingDocumentInfo('GO', returnValue.item);
				// me.onGetGateOutGateTicketInformation();

				var gateOutGCStore = me.getStore('gateOutCargo');
				gateOutGCStore.load({
					params : {
						lorryNo: returnValue.code
					},
					callback: function(records, operation, success) {
						if (success) {
						}
					}
				});
			} else {
				me.getViewModel().setData({gateOutLorry: null});
			}
		}else if(targetControl === 'refGateOutRoRoLorryField'){
			if(returnValue){
				var gateOutRoRoStore = me.getStore('gateOutForRoRo');
				gateOutRoRoStore.load({
					params : {
						searchType: 'TRUCK',
						lorryNo: returnValue.code
					},
					callback: function(records, operation, success) {
						if (success) { }
					}
				});
			} else {
				me.getViewModel().setData({gateOutRORO: null});
			}
		}  else if (targetControl === 'refGateOutRoRoDriverIdField') {
			if(returnValue){
				me.getViewModel().setData({theDriver: returnValue.item});
				refs.refGateOutRoRoDriverIdField.setValue(returnValue.code);
				refs.refGateOutRoRoDriverName.setValue(returnValue.codeName);
				var gateOutRoRoStore = me.getStore('gateOutForRoRo');
				gateOutRoRoStore.load({
					params : {
						searchType: 'DRIVER',
						driverId: returnValue.code
					},
					callback: function(records, operation, success) {
						if (success) {
						}
					}
				});
			}  else {
				me.getViewModel().setData({theDriver: null});
			}
		} else if (targetControl === 'ctlGateInGCDriverIdField') {
			if (returnValue && returnValue.item) {
				me.setGateDetailsBasedOnTransportInfo({reference: 'ctlGateInGCDriverIdField'}, returnValue.item);
			}
		} else if (targetControl === 'ctlBlDoNoField') {
			if (returnValue && returnValue.item) {
				me.setGateInDetailsBasedOnDocument(returnValue.item);
			}
		} else if (targetControl === 'ctlShipgNoteNoField') {
			if (returnValue && returnValue.item) {
				me.setGateInDetailsBasedOnDocument(returnValue.item);
			}
		}else if(targetControl === 'btnDamage'){
			var {modifiedFileUploads, damageChecks, theDmg} = returnValue
			var uploadedFileDamageStore = me.getStore('uploadedFileDamageStore'),
				damageCheckDetail = me.getStore('damageCheckDetail')
				uploadedFileDamageStore.removeAll()
				damageCheckDetail.removeAll()

				uploadedFileDamageStore.setData(modifiedFileUploads)
				uploadedFileDamageStore.commitChanges()
				damageCheckDetail.setData(damageChecks)
				damageCheckDetail.commitChanges()
				me.getViewModel().set('theDmg', theDmg)
		}

	},
	
	setReadOnlyMode: function(mode){
		var me = this;
		
		me.getViewModel().setData({readOnlyMode: mode});
		me.getViewModel().setData({disabledMode: mode});
		me.getViewModel().setData({editableMode: !mode});
	},
	
	dgValidCheck: function(){
		var me = this;
		var refs = me.getReferences();
		
		var dgSubmit = refs.ctlDgStatusCombo.getValue();
		var dgYn = refs.ctlDgCombo.getValue();
		var bSuccess = true;
		
		if(dgYn === 'Y'){
			if(dgSubmit === 'Y'){
				bSuccess = true;
			}else{
				bSuccess = false;// can not go out to gate
			}
		}else{
			bSuccess = true;
		}
		return bSuccess;
		
	},
	
	dateCompare: function() {
		var me = this;
		var refs = me.getReferences();
		
		if(me.tabMode === 'gateIn') {
			var licsExprYmd =Ext.Date.format(new Date(refs.txtGateInExpiryDate.getValue()), 'Ymd');
			var gateInDt = Ext.Date.format(refs.refGateInDateTime.getValue(), 'Ymd');
		} else {
			var licsExprYmd =Ext.Date.format(new Date(refs.txtGateOutExpiryDate.getValue()), 'Ymd');
			var gateInDt = Ext.Date.format(refs.refGateOutDateTime.getValue(), 'Ymd');
		}
		
		if(gateInDt > licsExprYmd){
			return true;
		} else if (StringUtil.isNullorEmpty(licsExprYmd)) {
			return true;
		}
		return false;
	},
	
	saveGateIn: function() {
		var me = this;
		var refs = me.getReferences();
		me.getBindingXml();
		
		me.validCheck();
	},
	
	saveGateOut: function() {
		var me = this;
		
		me.getBindingXml();
		me.validCheck();
	},
	
	validCheck: function() {
		var me = this;
		var refs = me.getReferences();
		var store = null;
		var gateItem;
		
		if (me.tabMode === 'gateIn') {
			gateItem = me.getViewModel().get('theGateIn'); 
			var cgNo = gateItem.get('cgNo');
			var lorryNo = gateItem.get('lorryNo');
			var cgInOutCd = gateItem.get('cgInOutCd');
			var gatePassNo = gateItem.get('gatePassNo');
			var gateTicketNo = gateItem.get('gateTicketNo');
			var vslCallId = gateItem.get('vslCallId');
			
			store = me.getStore('searchGateInList');
			
		} else {
			gateItem = me.getViewModel().get('theGateOut'); 
			var cgNo = gateItem.get('cgNo');
			var lorryNo = gateItem.get('lorryNo');
			var cgInOutCd = gateItem.get('cgInOutCd');
			var gatePassNo = gateItem.get('gatePassNo');
			var gateTicketNo = gateItem.get('gateTicketNo');
			var vslCallId = gateItem.get('vslCallId');
			
			store = me.getStore('selectGateOutCheck');
			
			
		}
		
		store.load({
			params: {
				cgNo : cgNo,
				lorryNo :  lorryNo,
				cgInOutCd : cgInOutCd,
				gatePassNo : gatePassNo,
				gateTxnNo: gateTicketNo,
				vslCallId :  vslCallId,
				searchType : searchType
			},
			callback:function(records,operation, success){
				if(success){
					if(records.length > 0){
						if (me.tabMode === 'gateIn') {
							MessageUtil.info('portsafetyconfirmation_validcheck_gateinout_validcheck_title', "portsafetyconfirmation_validcheck_gatein_ispass_msg");
							return;
						} else {
							me.getViewModel().get('theGateOut').set('seq', records[0].get('seq'));
							me.getViewModel().get('theGateOut').phantom = false;	// UPDATE
							me.getViewModel().get('theGateOut').commit();
							me.cudData();
						}
					} else {
						if (me.tabMode === 'gateIn') {
							me.getViewModel().get('theGateIn').phantom = true;	// INSERT
							me.cudData();
						} else {
							if(cgInOutCd == "I"){
								me.getViewModel().get('theGateOut').phantom = false;	// not INSERT/ update
								me.cudData();
							}
						}
					}
				}
			}
		});
	},
	
	functionGRDO: function() {
		var me = this;
		var refs = me.getReferences();
		
		if (refs.refGateInGr.getValue()) {
			refs.ctlGateInBldoField.setValue('');
			refs.ctlDgCombo.setValue('');
			refs.ctlDgStatusCombo.setValue('');
			refs.txtDMode.setValue('');
			refs.txtGateInCommodity.setValue('');
			refs.txtGateInMt.setValue('');
			refs.txtGateInQty.setValue('');
		} else if (refs.refGateInBlDo.getValue()) {
			refs.ctlGateInGrField.setValue('');
			refs.ctlDgCombo.setValue('');
			refs.ctlDgStatusCombo.setValue('');
			refs.txtDMode.setValue('');
			refs.txtGateInCommodity.setValue('');
			refs.txtGateInMt.setValue('');
			refs.txtGateInQty.setValue('');
		}
	},
	
	functionGPGR: function() {
		var me = this;
		var refs = me.getReferences();
		
		if(refs.refGateOutGp.getValue()) {
			refs.ctlGateOutGrField.setValue('');
			
			insGateOutData.set('tsptr', '');
			
			refs.txtGateOutCommodity.setValue('');
			refs.txtGateOutMt.setValue('');
			refs.txtGateOutQty.setValue('');
		} else if (refs.refGateOutGr.getValue()) {
			refs.ctlGateOutTicketNoField.setValue('');
			
			insGateOutData.set('tsptr', '');
			
			refs.txtGateOutCommodity.setValue('');
			refs.txtGateOutMt.setValue('');
			refs.txtGateOutQty.setValue('');
		}
	},
	
	saveDG: function() {
		var me = this;
		var refs = me.getReferences();
		
		me.checkDriverLicenseGI();
	},
	
	checkDriverLicenseGI: function() {
		var me = this;
		var refs = me.getReferences();
		
		me.gateInValidation();
	},
	
	cudData: function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('gateComboList');
		var uploadItem;
		
		if(me.tabMode === 'gateIn') {
			uploadItem = me.getViewModel().get('theGateIn');
		} else {
			uploadItem = me.getViewModel().get('theGateOut');
		}

		var proxy = uploadItem.getProxy();
		proxy.url = me.PORTSAFETY_CONFIRMATION_PROXY_URL;
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var isCreated = uploadItem.phantom;
		
		uploadItem.set('userId', MOST.config.Token.getUserId());
		
		updateParm.phantom = isCreated;
		updateParm.getProxy().url = proxy.url;
		updateParm.set('item', uploadItem.data);
		updateParm.save({
			success : function(){
				MessageUtil.saveSuccess();
				me.clearInputGateInFields();
				me.clearInputGateOutFields();
			}
		});
	},
	
	checkDriverLicenseGO : function() {
		var me = this;
		var refs = me.getReferences();
		
		me.gateOutValidation();
	},
	
	gateInValidation: function(){
		var me = this;
		var refs = me.getReferences();
		
		if (StringUtil.isNullorEmpty(refs.refGateInRoRoLorryField.getValue())) {
			MessageUtil.warning('portsafetyconfirmation_validcheck_gate_mandatory_title', "portsafetyconfirmation_validcheck_lorry_mandatory_msg");
			return;
		}

		if (StringUtil.isNullorEmpty(refs.ctlGateInRoRoGateCombo.getValue())) {
			MessageUtil.warning('portsafetyconfirmation_validcheck_gate_mandatory_title', "portsafetyconfirmation_validcheck_gate_mandatory_msg");
			return;
		}

		me.saveGateIn();
	},
	
	gateOutValidation: function() {
		var me = this;
		var refs = me.getReferences();
		
		if (StringUtil.isNullorEmpty(refs.ctlGateOutLorryField.getValue())) {
			MessageUtil.warning('portsafetyconfirmation_validcheck_gate_mandatory_title', "portsafetyconfirmation_validcheck_lorry_mandatory_msg");
			return;
		}
		
		if (StringUtil.isNullorEmpty(refs.ctlGateOutTicketNoField.getValue())) {
			MessageUtil.warning('portsafetyconfirmation_validcheck_gate_mandatory_title', "portsafetyconfirmation_validcheck_gt_mandatory_msg");
			return;
		}
		
		if (StringUtil.isNullorEmpty(refs.ctlGateOutGateCombo.getValue())) {
			MessageUtil.warning('portsafetyconfirmation_validcheck_gate_mandatory_title', "portsafetyconfirmation_validcheck_gate_mandatory_msg");
			return;
		}

		me.saveGateOut();
	},
	
	searchLorryGateIn: function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('selectCargoLorryGateIn');
		
		store.load({
			params: {
				searchType: 'lorryGateIn',
				lorryNo: me.getViewModel().get('gateOutLorry').get('lorryNo')
			},
			callback:function(records,operation, success){
				if(success){
					if (records.length > 0) {
						refs.ctlGateOutTicketNoField.setValue(records[0].get('gateTicketNo'));
						refs.ctlGateOutTicketNoField.getController().onFieldFocusleave();
					}
				}
			}
		});
	},
	
	clearInputGateInFields: function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlGateInLorryField.setValue('');
		refs.ctlGateInBldoField.setValue('');
		refs.ctlGateInGrField.setValue('');
		refs.ctlGateInDriverIdField.setValue('');
		refs.txtGateInDriverName.setValue('');
		refs.txtGateInLicenseNo.setValue('');
		refs.txtGateInExpiryDate.setValue('');
		refs.txtGateInTransporter.setValue('');
		refs.txtGateInTransporterName.setValue('');
		refs.ctlDgCombo.setValue('');
		refs.ctlDgStatusCombo.setValue('');
		refs.txtDMode.setValue('');
		refs.txtGateInCommodity.setValue('');
		refs.txtGateInMt.setValue('');
		refs.txtGateInQty.setValue('');
		refs.txtGateInM3.setValue('');
		
	},
	
	clearInputGateOutFields: function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlGateOutLorryField.setValue('');
		refs.ctlGateOutDriverIdField.setValue('');
		refs.txtGateOutDriverName.setValue('');
		refs.txtGateOutLicenseNo.setValue('');
		refs.txtGateOutExpiryDate.setValue('');
		refs.txtGateOutTransporter.setValue('');
		refs.txtGateOutTransporterName.setValue('');
		refs.txtGateOutMt.setValue('');
		refs.txtGateOutQty.setValue('');
		refs.txtGateOutCommodity.setValue('');
		refs.ctlGateOutTicketNoField.setValue('');
		refs.txtGateOutM3.setValue('');
		refs.refGateInDateTimeLink.setValue('');
	},
	
	getBindingXml: function() {
		var me = this;
		var refs = me.getReferences();
		
		var insGateInData =  Ext.create('MOST.model.operation.CargoArrvDelv');
		var insGateOutData = Ext.create('MOST.model.operation.CargoArrvDelv');
		
		//GATE IN
		if (me.tabMode === 'gateIn') {
			var theGateInGr = me.getViewModel().get('gateInGr');
			var theGateInBldo = me.getViewModel().get('gateInBldo');
			var theGateInLorry = me.getViewModel().get('gateInLorry');
			
			//GR GateIn:
			if(!StringUtil.isNullorEmpty(refs.ctlGateInGrField.getValue())){
				insGateInData.set('catgCd', theGateInGr.get('opeClassCd'));
				insGateInData.set('pkgTpCd', theGateInGr.get('pkgTpCd'));
				insGateInData.set('rePkgTpCd', theGateInGr.get('rePkgTpCd'));
				insGateInData.set('grNo', theGateInGr.get('grNo'));
				insGateInData.set('subDoNo', '');
				insGateInData.set('tsptTpCd', theGateInGr.get('tsptTpCd'));
				insGateInData.set('delvTpCd', theGateInGr.get('delvTpCode'));
				insGateInData.set('delvTpNm', theGateInGr.get('delvTpName'));
				insGateInData.set('shipgNoteNo', theGateInGr.get('shipgNoteNo'));
				insGateInData.set('msrmt',  theGateInGr.get('m3'));
			}
			else if(!StringUtil.isNullorEmpty(refs.ctlGateInBldoField.getValue())){
				insGateInData.set('doNo', theGateInBldo.get('doNo'));
				insGateInData.set('subDoNo', theGateInBldo.get('sdoNo'));
				insGateInData.set('grNo', '');
				insGateInData.set('blNo', theGateInBldo.get('blNo'));
				insGateInData.set('catgCd', theGateInBldo.get('opeClassCd'));
				insGateInData.set('tsptTpCd', theGateInBldo.get('tspttpcd'));
				insGateInData.set('delvTpCd', theGateInBldo.get('delvTpCode'));
				insGateInData.set('pkgTpCd', theGateInBldo.get('pkgTpCd'));
				insGateInData.set('rePkgTpCd', theGateInBldo.get('rePkgTpCd'));
			}
					
			//LorryDetail:
			if(theGateInLorry){
				insGateInData.set('lorryNo', theGateInLorry.get('lorryNo'));
				insGateInData.set('tsptCompNm', theGateInLorry.get('transportName'));
				insGateInData.set('tsptr', theGateInLorry.get('transportCd'));
			}

			if(refs.refGateInBlDo.getValue() && !StringUtil.isNullorEmpty(theGateInBldo.get('doNo'))) {
				insGateInData.set('cgInOutCd', 'O');
				insGateInData.set('cgNo', me.getViewModel().get('gateInBldo') != null ? me.getViewModel().get('gateInBldo').get('blNo') : '');
				
			} else if (refs.refGateInGr.getValue() && !StringUtil.isNullorEmpty(theGateInGr.get('grNo'))) {
				insGateInData.set('cgInOutCd', 'I');
				insGateInData.set('cgNo', me.getViewModel().get('gateInGr') != null ?  me.getViewModel().get('gateInGr').get('grNo') : '');
			} else {
				return null;
			}

			if(refs.refGateInDateTime.getValue()){
				insGateInData.set('gateInDt', Ext.Date.format(refs.refGateInDateTime.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
			}else{
				insGateInData.set('gateInDt', Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
			}

			
			insGateInData.set('vslCallId', me.vslCallId);
			insGateInData.set('gateCd', refs.ctlGateInGateCombo.getValue());
			insGateInData.set('wgt', refs.txtGateInMt.getValue());
			insGateInData.set('pkgQty', refs.txtGateInQty.getValue());
			insGateInData.set('cmdtCd', me.getViewModel().get('gateInBldo') != null ? me.getViewModel().get('gateInBldo').get('cmdte') : me.getViewModel().get('gateInGr').get('cmdtCode'));
			insGateInData.set('driverId', refs.ctlGateInDriverIdField.getValue());
			insGateInData.set('searchType', 'gateIn');
			insGateInData.set('crud', 'I');

			me.getViewModel().setData({theGateIn: me.insGateInData});

		
		} else {// GATE OUT:
			var gateOutGpItem = me.getViewModel().get('gateOutGp');
			var gateOutLorryItem = me.getViewModel().get('gateOutLorry');

			insGateOutData.set('cgNo', gateOutGpItem.get('cgNo'));
			//insGateOutData.set('seq', gateOutGpItem.get('seq'));
			insGateOutData.set('catgCd', gateOutGpItem.get('opeClassCd'));
			insGateOutData.set('delvTpCd', gateOutGpItem.get('delvTpCode') );

			insGateOutData.set('lorryNo', gateOutLorryItem.get('lorryNo'));
			
			insGateOutData.set('tsptr',refs.txtGateOutTransporter.getValue());
			insGateOutData.set('gateTicketNo', gateOutGpItem.get('gateTxnNo'));
			insGateOutData.set('gateTxnNo', gateOutGpItem.get('gateTxnNo'));
			insGateOutData.set('subDoNo', gateOutGpItem.get('sdoNo'));
			insGateOutData.set('vslCallId', me.vslCallId);
			
			insGateOutData.set('wgt', refs.txtGateOutMt.getValue());
			insGateOutData.set('pkgQty', refs.txtGateOutQty.getValue());
			insGateOutData.set('msrmt', refs.txtGateOutM3.getValue());
			insGateOutData.set('cmdtCd',refs.txtGateOutCommodity.getValue());
			insGateOutData.set('pkgTpCd', gateOutGpItem.get('pkgTpCd'));
			insGateOutData.set('rePkgTpCd', gateOutGpItem.get('rePkgTpCd'));
			
			insGateOutData.set('gateOutCd',refs.ctlGateOutGateCombo.getValue());
			if(refs.refGateOutDateTime.getValue()){
				insGateOutData.set('gateOutDt', Ext.Date.format(refs.refGateOutDateTime.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
			}else{
				insGateOutData.set('gateOutDt', Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
			}
			
			insGateOutData.set('crud', 'I');
			insGateOutData.set('cgInOutCd', gateOutGpItem.get('cgInOutCd'));
			insGateOutData.set('searchType', 'gateOut');
			
			me.getViewModel().setData({theGateOut: me.insGateOutData});
		}
		
	},
	
	openDriverIDPopup:function(field, button, e){
		var me = this;
		var refs = me.getReferences();
		var isCargoGateIn = field.reference === 'ctlBtnDriverGCGIField';
		var params = {
			driverId: refs.ctlGateInRoRoDriverIdField.getValue(),
			cgTpCd: isCargoGateIn ? '' : 'RCV',
			// codeType: 'GI'
		};
		if(isCargoGateIn) {
			me.openCodePopup('popup-driverlistpopup',  'ctlGateInGCDriverIdField', params);
		} else {
			me.openCodePopup('popup-driverlistpopup',  'ctlGateInRoRoDriverIdField', params);
		}
	},
	
	openDriverIDPopupForGateOut:function(field, button, e){
		var me = this;
		var refs = me.getReferences();
		var params = {
			driverId: refs.refGateOutRoRoDriverIdField.getValue(),
			cgTpCd: 'RCV',
			codeType: 'GI'
		};
	    me.openCodePopup('popup-driverlistpopup',  'refGateOutRoRoDriverIdField', params);
	},
	

	//sMantis: 0167331
	loadRoRoUnitNoList: function(selection, unitNoGrid) {
		var me = this;
		var isBLOrSN = selection.get('shipgNoteNo') != null && selection.get('shipgNoteNo') != '';
		var unitNoListStore = isBLOrSN ? me.getStore(me.UNIT_NO_LIST_FOR_SN_STORE) : me.getStore(me.UNIT_NO_LIST_FOR_BL_STORE);
		unitNoListStore.load({
			params:{
				vslCallId	: selection.get('vslCallId'),
				mfDocId 	: selection.get('mfdocid'),
				shipgNoteNo : selection.get('shipgNoteNo'),
				grNo   		: selection.get('grNo'),
				blNo 		: selection.get('blNo'),
				sdoNo 		: selection.get('sdoNo')
			},
			callback: function(records, operation, success) {
				if(success){
					unitNoGrid.getStore().removeAll();
					unitNoGrid.getStore().add(records);
				}
			}
		});
	},
	//eMantis: 0167331
	
	setEditableUserControl: function(value){
		var me = this;
		var refs = me.getReferences();
		var roroGateInstore = me.getStore('gateInForRoRo');
		var roroGateOutstore = me.getStore('gateOutForRoRo');
		
		if (value === 'refGateInTruck') {
			refs.ctlGateInRoRoDriverIdField.setValue('');
			refs.refGateInRoRoLorryField.getReferences().ctlOpenPopupButton.setDisabled(false);
			refs.ctlBtnDriverROROGIField.setDisabled(true);
			me.getViewModel().setData({gateInRORO: null});
			roroGateInstore.load({
				params : {
					searchType : 'TRUCK'
				},
				callback: function(records, operation, success) {
					if (success) {
					}
				}
			});
		} else if (value === 'refGateInDriver') {
			refs.refGateInRoRoLorryField.setValue('');
			refs.refGateInRoRoLorryField.getReferences().ctlOpenPopupButton.setDisabled(true);
			refs.ctlBtnDriverROROGIField.setDisabled(false);
			me.getViewModel().setData({gateInRORO: null});
			roroGateInstore.load({
				params : {
					searchType : 'DRIVER'
				},
				callback: function(records, operation, success) {
					if (success) {
					}
				}
			});
		}
		if(value === 'refGateOutTruck'){
			refs.refGateOutRoRoDriverIdField.setValue('');
			refs.refGateOutRoRoLorryField.getReferences().ctlOpenPopupButton.setDisabled(false);
			refs.ctlBtnDriverROROGOField.setDisabled(true);
			me.getViewModel().setData({gateOutRORO: null});
			roroGateOutstore.load({
				params : {
					searchType : 'TRUCK'
				},
				callback: function(records, operation, success) {
					if (success) {
					}
				}
			});
		}else if(value === 'refGateOutDriver'){
			refs.refGateOutRoRoLorryField.setValue('');
			refs.refGateOutRoRoLorryField.getReferences().ctlOpenPopupButton.setDisabled(true);
			refs.ctlBtnDriverROROGOField.setDisabled(false);
			me.getViewModel().setData({gateOutRORO: null});
			roroGateOutstore.load({
				params : {
					searchType : 'DRIVER'
				},
				callback: function(records, operation, success) {
					if (success) {
					}
				}
			});
		}
	},

	onDriverIdFieldFocus: function() {
		var me = this;
		var driverIdStore = me.getStore('driverListStore');
		driverIdStore.load({
			params: {
				codeType: 'GI'
			},
			callback: function(records, operation, success) {
			}
		});
	},

	onGateInFieldFocusLeave: function (combobox) {
		var me = this;
		var store = combobox.getStore();
		var value = combobox.getValue();
		var selection = combobox.getSelection();

		if (selection && !selection.phantom) {
			selection = selection;
		} else {
			selection = store.getAt(store.findExact(combobox.displayField, value));
		}

		const referenceGroups = {
			transportInfo: ['ctlGateInGCDriverIdField', 'refGateInGCLorryField'],
			document: ['ctlShipgNoteNoField', 'ctlBlDoNoField']
		};

		if (referenceGroups.transportInfo.includes(combobox.reference)) {
			me.setGateDetailsBasedOnTransportInfo(combobox, selection);
		} else if (referenceGroups.document.includes(combobox.reference)) {
			me.setGateInDetailsBasedOnDocument(selection);
		}

	},

	setGateDetailsBasedOnTransportInfo: function (field, selection) {
		var me = this;
		var refs = me.getReferences();
		var gateInGC = me.getViewModel().get('gateInGC');
		
		switch (field.reference) {
			case 'ctlGateInGCDriverIdField':
				gateInGC.set('driverId', !selection ? '' : selection.get('driverId'));
				gateInGC.set('driverNm', !selection ? '' : selection.get('driverName'));
				break;
			case 'refGateInGCLorryField':
				gateInGC.set('lorryNo', !selection ? '' : selection.get('lorryNo'));
				gateInGC.set('tsptr', !selection ? '' : selection.get('transportCd'));
				gateInGC.set('tsptCompNm', !selection ? '' : selection.get('transportName'));
				break;
		}
		
	},

	setGateInDetailsBasedOnDocument: function (document) {
		var me = this;
		var gateInGC = me.getViewModel().get('gateInGC');

		if (gateInGC == null) {
			return;
		}

		const fields = [
			'vslCallId', 	'scn', 			'doNo', 		'vslNm',
			'shipper', 		'cnsneNm', 		'delvTpName', 	'cmdtName',
			'pkgQty', 		'wgt', 			'msrmt', 		'customsReleasedStatus',
			'shipgNoteNo', 	'shipperNm', 	'blNo', 		'vslCd',
			'callSeq', 		'callYear',		'mfDocId',		'cmdtCd',
			'cgTpCd', 		'locId',		'gatePassNo',	'grNo',
			'catgCd'
		];

		var isDocumentAvailabel = !!document;
		
		fields.forEach(field => {
			gateInGC.set(field, isDocumentAvailabel ? document.get(field) : null);
		});
	},

	onSelectDocumentRadio: function(radio, newValue, oldValue) {
		var me = this;
		var refs = me.getReferences();
		if (newValue) {
			var isBlSelected = radio.modelValue === 'bl';

			refs.ctlShipgNoteNoField.setDisabled(isBlSelected);
			refs.ctlBtnShipgNoteNo.setDisabled(isBlSelected);
			refs.ctlBlDoNoField.setDisabled(!isBlSelected);
			refs.ctlBtnBlDoNoField.setDisabled(!isBlSelected);

			me.setGateInDetailsBasedOnDocument(null);
		}
	},

	openBLDOPopup:function(field, button, e){
		var me = this;
		var refs = me.getReferences();
		var isCargoGateIn = field.reference === 'ctlBtnBlDoNoField';
		var params = {
			driverId: refs.ctlGateInRoRoDriverIdField.getValue(),
			cgTpCd: isCargoGateIn ? '' : 'RCV',
			codeType: 'GI'
		};
		me.openCodePopup('popup-bldolistpopup',  'ctlBlDoNoField', params);
	},
	
	openShippingNotePopup:function(field, button, e){
		var me = this;
		var refs = me.getReferences();
		var isCargoGateIn = field.reference === 'ctlBtnShipgNoteNo';
		var params = {
			driverId: refs.ctlGateInRoRoDriverIdField.getValue(),
			cgTpCd: isCargoGateIn ? '' : 'RCV',
			codeType: 'GI'
		};
		me.openCodePopup('popup-shippingnotelistpopup',  'ctlShipgNoteNoField', params);
	},	
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */

	isExistedRecord: function (store, field) {
		return store.findBy(function (record) {
			return record.get(field.valueField).toLowerCase().indexOf(field.rawValue.toLowerCase()) !== -1;
		}) !== -1
	},

	openLorrysPopup: function () {
		var me = this;
		var refs = me.getReferences();

		var params = {
			ptnrCode: '',
			vslCallId: '',
			shipgNoteNo: '',
			blNo: ''
		}
		me.openCodePopup('popup-externaltruckpopup', 'refGateInGCLorryField', params);
	},

	onTruckFieldChange: function (field, event, eOpts) {
		var me = this;
		var store = field.getStore();

		if (me.isExistedRecord(store, field)) {
			return;
		}

		var params = {
			lorryNo: field.rawValue
		}
		me.getSuggestionList(field, store, params);
	},

	onDriverFieldChange: function (field, event, eOpts) {
		var me = this;
		var store = field.getStore();

		if (me.isExistedRecord(store, field)) {
			return;
		}

		var params = {
			driverId: field.rawValue
		}

		me.getSuggestionList(field, store, params);
	},

	onBLDOFieldChange: function (field, event, eOpts) {
		var me = this;
		var store = field.getStore();

		if (me.isExistedRecord(store, field)) {
			return;
		}

		var params = {
			blNo: field.rawValue
		}
		me.getSuggestionList(field, store, params);
	},

	onShipgNoteFieldChange: function (field, event, eOpts) {
		var me = this;
		var store = field.getStore();

		if (me.isExistedRecord(store, field)) {
			return;
		}

		var params = {
			shipgNoteNo: field.rawValue
		}
		me.getSuggestionList(field, store, params);
	},

	getSuggestionList: function (field, store, params) {
		var me = this;
		var debounceDelay = 300;

		clearTimeout(me.debounceTimer);

		me.debounceTimer = setTimeout(() => {
			if (field.rawValue.length >= 3) {
				store.load({
					params: params,
					callback: function (records, operation, success) {
						if (success && records.length > 0) {
							field.expand();
						}
					}
				});
			}
		}, debounceDelay);
	}, 

	onSelectShippingNote: function (field) {
		var me = this;
		var selection = field.getSelection();
		me.setGateInDetailsBasedOnDocument(selection);
	},

	onSelectBLDO: function (field) {
		var me = this;
		var selection = field.getSelection();
		me.setGateInDetailsBasedOnDocument(selection);
	}
});

