Ext.define('MOST.view.operation.WarehouseCheckForImportHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [],

	alias: 'controller.warehousecheckforimporthht',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	CUST_RELEASE: 'RELEASE',
	prevDate: { startDt: null, endDt: null },
	prevData: Object,
	CARGO_WHCHECKIMPORT_PROXY_URL: MOST.config.Locale.getRestApiDestUrl() + '/v1/whcheckimport/whcheckimport',
	DAMAGE_STORE: 'damageStore',
	DIMENSION_STORE: 'dimensionStore',
	UPLOAD_STORE: 'uploadStore',
	WSCONNECT: null,
	packageItems : new Array(),
	whType: '',
	/**
	 * CONSTANT END
	 * ============
	 */

	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onLoad: function () {
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var store = me.getStore('whCheckImport');
		
		var params = me.getSearchCondition();

		me.prevData = recvData.clone();
		
		refs.ctlWhCheckImportLocId.setRequired(true);

		store.load({
			params: params,
			callback: function (record, operation, success) {
				if (success) {
					if (record != null && record.length > 0) {
						me.setDetailInitialize(record[0]);
						me.operationSeting();
					}
				}
			}
		});
		me.onConnectWs(); //Connect to WebSocket
	},

	//Refresh Data button:
	onRefresh: function(){
		var me = this;
		var store = me.getStore('whCheckImport');
		var params = me.getSearchCondition();

		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success){
					if(record != null && record.length > 0){
						me.setDetailInitialize(record[0]);
						MessageUtil.infoToast('info_msg', 'hht_msg_data_refreshed');
					}
				}
			}
		});
	},


	/**
	 * =============================================================================
	 * INITIALIZE END
	 */

	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	/*
	* BEGIN CUD:
	**/
	onSave: function () {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');

		//VALIDATE MANDATORY://VALIDATE MANDATORY:
		var validForm = refs.ctlFrmCfrmWHCheckImport.validate();
		if (!validForm) {
			MessageUtil.mandatoryFieldInValid();
			return;
		}

		//CHECK Zero amount:
		if (!me.checkAmountPreSave()) {
			return;
		}
		
		//Bonded WH validation
		if(!StringUtil.isNullorEmpty(me.whType) && me.whType == CodeConstants.MT_WHTP_BW){
			me.onBondedWhValidation();
		}
		else {
			me.prevSaveCheck();
		}
	},
	
	//button Cancel
	onCancel: function(btn){
		MessageUtil.questionModern('Confirm', 'modity_save_confirm_msg',null,
				function(button){
					if (button === 'ok') {
						btn.up('window').close();
				    
			        }else if(button === 'cancel'){
			        	return;
			        };
				}
			);		
	},

	//search to set Loc:
	onWarehouseAllocation: function () {
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		if (detailItem.get('whWgt') == 0 && detailItem.get('whM3') == 0 && detailItem.get('whQty') == 0) {
			MessageUtil.warning('warning_msg', 'confirmdischarging_input_amount_msg');
			return;
		}
		var params = {
			totMt: detailItem.get('whWgt'),
			totM3: detailItem.get('whM3'),
			totQty: detailItem.get('whQty'),
			cgNo: detailItem.get('blNo'),
			whTpCd: 'G',
			vslCallId: detailItem.get('vslCallId'),
			title: 'W/H - Set Location',
			displayOccupiedInfo: true
		};
		ViewUtil.openHhtPopup(this, 'app-whcheckersetlocpopuphht', 'ctlWhCheckImportLocId', params);

	},
	
	//Truck popup
	onOpenTruckPopup: function(){
		var me = this;
		var refs = me.getReferences();
		var targetCtl = 'refLorryNo',
			popupAlias = '', 
			title = '';

		var detailItem = me.getViewModel().get('theDetail');

		title = 'Yard Truck List';
		popupAlias = 'popup-assignedinternaltrucklistpopuphht';
		
		var params = {
				title: title,
				vslCallId: detailItem.get('vslCallId'),
				blNo: detailItem.get('blNo'),
				shipgNoteNo: '',
				weightCheckYn: detailItem.get('weightCheckYn')
			};
	
		if(popupAlias){
			ViewUtil.openHhtPopup(me, popupAlias, targetCtl , params);
		}
	},
	
	//Package No popup
	onOpenPackageNoPopup: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var recvData = me.prevData;
		var targetCtl = 'refPkgNo';
		var title = 'Package No. List';
		
		var params = {
				title: title,
				vslCallId: detailItem.get('vslCallId'),
				blNo: detailItem.get('blNo'),
				shipgNoteNo: '',
				ixCd: 'I',
				jobNo: recvData.get('jobNo'),
				jobPurpCd: 'AW'
			};
		ViewUtil.openHhtPopup(this, 'app-packagenomultipopuphht', targetCtl, params);
	},

	//Pakcage Type Popup
	onSearchPkgType: function () {
		var me = this;
		var targetCtl = 'ctlTxtPkgTypeCd';
		var title = 'Package Type';
		var params = {
			title: title,
			searchType: 'COMM',
			searchDivCd: 'PKGTP',
			searchLcd: 'MT',
			searchCol1: '',
		};
		ViewUtil.openHhtPopup(this, 'app-commoncodepopuphht', targetCtl, params);
	},

	//Change Qty event:
	onChangeQty: function (ctl, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var cgTpCd = detailItem.get('cgTpCd');
		var aprBalQty = detailItem.get('abQty');
		var aprBalMt = detailItem.get('abMt');
		var aprBalM3 = detailItem.get('abM3');

		//Check Over Balance:
		if (!me.checkOverBalance(ctl, newValue)) {
			MessageUtil.warning('warning_msg', 'hht_whcheckimport_bbk_exceed_msg');

			ctl.suspendEvents();
			ctl.setValue(oldValue);
			ctl.resumeEvents();

			return;
		}

		//Start Auto Calculate with BBK:
		if (cgTpCd !== CodeConstants.MT_CGTP_BBK) {
			return;
		}
		var whMt = 0, whM3 = 0;
		if (newValue === aprBalQty) {
			whMt = aprBalMt;
			whM3 = aprBalM3;
		} else {
			var eachWgt = detailItem.get('eachWgt');
			var eachMsrmt = detailItem.get('eachVol');
			var inputQty = Number(newValue);

			whMt = Number(eachWgt * inputQty).toFixed(3);
			whM3 = Number(eachMsrmt * inputQty).toFixed(3);
		}
		//End Auto Calculate with BBK./
		detailItem.set('whWgt', whMt);
		detailItem.set('whM3', whM3);

		refs.ctlTxtWhMt.setValue(whMt);
		refs.ctlTxtWhM3.setValue(whM3);
	},

	onChangeMT: function (ctl, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var cgTpCd = detailItem.get('cgTpCd');

		if (cgTpCd === CodeConstants.MT_CGTP_BBK) {
			return;
		}
		//Check Over Balance:
		if (!me.checkOverBalance(ctl, newValue)) {
			MessageUtil.warning('warning_msg', 'warehousecheckexport_dbk_exceed_msg');

			ctl.suspendEvents();
			ctl.setValue(oldValue);
			ctl.resumeEvents();

			return;
		}
	},

	onChangeM3: function (ctl, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences(ctl, newValue);
		var detailItem = me.getViewModel().get('theDetail');
		var cgTpCd = detailItem.get('cgTpCd');

		if (cgTpCd === CodeConstants.MT_CGTP_BBK) {
			return;
		}
		//Check Over Balance:
		if (!me.checkOverBalance(ctl)) {
			MessageUtil.warning('warning_msg', 'warehousecheckexport_dbk_exceed_msg');

			ctl.suspendEvents();
			ctl.setValue(oldValue);
			ctl.resumeEvents();

			return;
		}
	},
	
	onBondedWhValidation : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var store = me.getStore('validationCheck');
		store.load({
			params : {
				tyCd: 'BONDED_WH_VALIDATION',
				col1: detailItem.get('vslCallId'),
				col2: detailItem.get('mfDocId'),
				col3: 'I'
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(records[0].get('isValidated') == 'N'){
							MessageUtil.warning('warning_msg', 'BondedWH_validation_msg');
							return;
						}
						else {
							me.prevSaveCheck();
						}
					}
					else {
						me.prevSaveCheck();
					}
				}
			}
		});
	},
	
	prevSaveCheck: function(){
		var me = this;
		me.onZb1HoldValidation()
	},

	onZb1HoldValidation : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		var store = me.getStore('validationCheck');
		
		store.load({
			params : {
				tyCd: 'ZB_RELEASED_VALIDATION',
				col1: CodeConstants.DOC_ID_ZB1,
				col2: detailItem.get('vslCd'),
				col3: detailItem.get('scn'),
				col4: detailItem.get('callYear'),
				col5: detailItem.get('callSeq'),
				col6: detailItem.get('blNo')				
			},

			callback: function(records, operation, success) {
				if (success) {
					if(records.length === 0 || (records[0].get('isValidated') != 'Y')){
						MessageUtil.warning('warning_msg', 'confirmdischarging_zb1_blockprocess_msg');
					}else{
						me.onPassedZb1HoldValidation();
					}
					store.removeAll();
					store.commitChanges();
				}
			},
		});
	},

	onPassedZb1HoldValidation : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		var finalYN = detailItem.get('fnlOpeYn');
		if (finalYN && finalYN === 'Y') {
			me.saveHHT(finalYN);
			return;
		}
		me.saveHHT('N');
	},

	saveHHT: function (isFinal) {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var recvData = me.prevData;
		
		if (detailItem.get('fnlOpeYn') === 'Y' || isFinal === 'Y') {
			detailItem.set('fnlOpeYn', isFinal);
			me.fnlOpeYn = true;
			me.cudDataHHT();
		} else {
			me.cudDataHHT();
		}
	},

	cudDataHHT: function () {
		var me = this;
		var window = me.getView().up('window');
		var parentView = me.getParentView();
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var tblDtlDamageCheckStore = me.getStore('tblDtlDamageCheckStore')
		detailItem.set('userId', MOST.config.Token.getUserId());

		detailItem.set('opDelvTpCd', 'A');

		detailItem.set('whConfigurationItems', me.prevWhItems);
		detailItem.set('packageItems', me.packageItems);

		var currentTime = Ext.Date.format(new Date(), 'd/m/Y H:i');
		var startDtStr =  refs.ctlDtmWhCheckImpStart.getValue();
		var endDtStr = currentTime;
		
		detailItem.set('startDtStr', startDtStr);
		detailItem.set('endDtStr', endDtStr);

		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = me.CARGO_WHCHECKIMPORT_PROXY_URL;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('item', detailItem.data);
		updateParm.save({
			callback: function (record, operation, success) {
				if (success) {
					me.saveDamage();
					me.saveDimension();
					detailItem.commit();
					me.broadcastMessage(detailItem);
					if(tblDtlDamageCheckStore.getCount() > 0){
						me.checkDamageCheck(record.data.jobNo)
					}else{
						MessageUtil.saveSuccess(); // Success Message
						if(parentView.getController().onTblRetrieve){
							parentView.getController().onTblRetrieve();
						}
						window.close(); 
					}
				}
			}
		});
	},
	
	checkDamageCheck: function(jobNo){
		var me = this,
		refs = me.getReferences(),
		uploadedFileDamageStore = me.getStore('uploadedFileDamageStore'),
		tblDtlDamageCheckStore = me.getStore('tblDtlDamageCheckStore'),
		frm = refs.fileForm,
		formData = new FormData(frm)		
		
		if(tblDtlDamageCheckStore.getCount() > 0){
			tblDtlDamageCheckStore.each(function(record) {
				if(record.data.workingStatus === 'C'){
					record.data.jobNo = jobNo
				}
			});
			tblDtlDamageCheckStore.commitChanges()
			if(uploadedFileDamageStore.getCount() > 0){
				uploadedFileDamageStore.each(function(record, index){
					record.data.catgCd = jobNo
					formData.append(record.data.fileName, record.data.fileStream);
				});
				uploadedFileDamageStore.commitChanges()
				me.fileDamageCheckUpload(formData);
			} else {
				me.saveDamageCheckProcess(); 
			}
		}
	},
	saveDamageCheckProcess: function () {
        var  me = this
            ,currentUploadStore = me.getStore('uploadedFileDamageStore')
			,tblDtlDamageCheckStore = me.getStore('tblDtlDamageCheckStore')
			,tblDamageCheckDetail = me.getViewModel().get('tblDamageCheckDetail')
            ,uploadList = new Array()
            ,arrayItems = new Array()
        // makeup records C, U, D except R by gridDetailStore combining detailParm.
        for( targetRecord of tblDtlDamageCheckStore.data.items) {
            var copyRecord = tblDamageCheckDetail.copy();
            
            copyRecord.set({
                 cgNo: targetRecord.get('cgNo')
                ,ixCd: copyRecord.get('catgCd') === me.IMPORT_CD ? 'I' : 'X'
                ,dmgPart: targetRecord.get('dmgPart')
                ,dmgLevel: targetRecord.get('dmgLevel')
                ,dmgRemark: targetRecord.get('dmgRemark')
                ,dmgDesc: targetRecord.get('dmgDesc')
                ,locCd:targetRecord.get('locCd')
                ,dmgQty:targetRecord.get('dmgQty')
                ,dmgMt:targetRecord.get('dmgMt')
                ,dmgM3:targetRecord.get('dmgM3')
                ,unitNo:targetRecord.get('unitNo')
                ,modelCd:targetRecord.get('modelCd')
                ,brandCd:targetRecord.get('brandCd')
                ,regNo:targetRecord.get('regNo')
				,jobNo: targetRecord.get('jobNo')
                ,userId: MOST.config.Token.getUserId()
                ,workingStatus: targetRecord.get('workingStatus')
				,remark: targetRecord.get('dmgRemark')
				,seq: targetRecord.get('seq')
            });
            arrayItems.push(copyRecord.data);
        }
        if(currentUploadStore.data.length > 0) {
			for(var i = 0; i < currentUploadStore.data.length; i++) {
				var uploadItem = currentUploadStore.data.items[i];
				var recordUpload = Ext.create('MOST.model.common.FileUpload');
				recordUpload.set('ufileName', uploadItem.get('ufileName'));
				recordUpload.set('pgmId', 'CF106');
				recordUpload.set('fileName', uploadItem.get('fileName'));
				recordUpload.set('fileSize', uploadItem.get('fileSize'));
				recordUpload.set('fileStream', null);
				recordUpload.set('userId', MOST.config.Token.getUserId());
				recordUpload.set('workingStatus', WorkingStatus.INSERT);
				recordUpload.set('catgCd', uploadItem.get('catgCd'))
				uploadList.push(recordUpload.data);
			}
			
			// File Upload DELETE RECORD
			currentUploadStore.getRemovedRecords().forEach(function(record, index, array) {
				record.set('workingStatus', WorkingStatus.DELETE);
				uploadList.push(record.data);
			});
		}

        var proxy = tblDamageCheckDetail.getProxy();
			proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofgc/listDamage';
			tblDamageCheckDetail.phantom = false;
			tblDamageCheckDetail.set("items", arrayItems);
			tblDamageCheckDetail.set('uploadItems', uploadList);
			tblDamageCheckDetail.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
			tblDamageCheckDetail.save({
				success : function(records,success){
					MessageUtil.saveSuccess(); // Success Message
					var parentView = me.getParentView();
					var win = me.getView().up('window');
					if (win) {
						win.close();
					}
					if(parentView.getController().onTblRetrieve){
						parentView.getController().onTblRetrieve();
					}
					me.setMaskedForm(false);
				}
			});
    },
	MS_OPE_T0: 'T0', //DEMO FOR CONFIRMATION OPERATION WITH YT
	broadcastMessage: function(detailItem) {
		var me = this;
		var refs = me.getReferences();
		var content = {
				msgHead		: CodeConstants.MS_OPE_T0,
				mMode		: '',
				sender		: CodeConstants.WS_SENDER_DISCHARGING,
				type		: CodeConstants.WS_TYPE_OPERATE,
				mfDocId		: detailItem.get('mfDocId'), 
				blSnNo		: detailItem.get('blNo'),
				yardTruckNo	: detailItem.get('lorryNo'),
				userId		: MOST.config.Token.getUserId(),
			}
		
		var msg = {
				content: JSON.stringify(content),
		};
		
		me.WSCONNECT.send(me.TOPIC_ALL, {}, JSON.stringify(msg));
	},

	/**
	 * ========================================================================================================================================
	 * EVENT HANDLER END
	 */


	/**
	 * GENERAL METHOD START
	 * =========================================================================================================================
	 */
	afterSetCodePopupData: function (xtype, targetControl, returnValue) {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');

		var control = me.lookupReference(targetControl);

		if (!returnValue) {
			control.setValue('');
			return;
		}

		if (targetControl === 'ctlWhCheckImportLocId') {
			if (!returnValue) {
				detailItem.set("locId", "");
				me.whType = '';
				return;
			}

			detailItem.set('locId', returnValue.locId);
			//refs.ctlWhCheckImportLocId.setValue(returnValue.plannedLoc);
			var whItems = new Array();
			for (var i = 0; i < returnValue.arrWHLocation.items.length; i++) {
				var invLocItem = returnValue.arrWHLocation.items[i];
				var handlingItemHHT = Ext.create('MOST.model.configuration.WhConfiguration', {
					locTpCd: invLocItem.data.locTpCd,
					whId: invLocItem.data.whId,
					locId: invLocItem.data.locId,
					vslCallId: invLocItem.data.vslCallId,
					cgNo: invLocItem.data.cgNo,
					wgt: invLocItem.data.wgt,
					msrmt: invLocItem.data.msrmt,
					pkgQty: invLocItem.data.pkgQty,
					whTpCd: invLocItem.data.whTpCd,
					whTpCdNm: invLocItem.data.whwhTpCdNmId,
					spCaCoCd: ''
				});
				whItems.push(handlingItemHHT.data);
				me.whType = invLocItem.data.locTpCd;
			}
			me.prevWhItems = whItems;
		}
		else if(targetControl === 'refPkgNo'){
			if(returnValue) {
				var packageItems = new Array();
				
				for(var i = 0; i < returnValue.item.length; i++){
					var returnItem = returnValue.item[i];
					var pkgItem = Ext.create('MOST.model.operation.PackageJobItem', {
						vslCallId: returnItem.get('vslCallId'),
						mfDocId : returnItem.get('mfDocId'),
						refNo: returnItem.get('refNo'),
						pkgNo: returnItem.get('packageNo')
					});
					packageItems.push(pkgItem.data);
				}
				me.packageItems = packageItems;
				me.onBindingAmoutnByPackageItems(returnValue);
			}
			else {
				me.packageItems = new Array();
				refs.refPkgNo.setValue();
			}
		}
		else if(targetControl === 'refLorryNo'){
			if(returnValue) {
				detailItem.set('wbTransactionNo',returnValue.item.get('wbTransactionNo'));
			}
			else {
				detailItem.set('wbTransactionNo', '');
			}
		}else if(targetControl === 'refConfirmWarehouseOutDamageBtn'){
			var {modifiedFileUploads, damageChecks, detailItem} = returnValue
			var uploadedFileDamageStore = me.getStore('uploadedFileDamageStore'),
				tblDtlDamageCheckStore = me.getStore('tblDtlDamageCheckStore')
				uploadedFileDamageStore.removeAll()
				tblDtlDamageCheckStore.removeAll()

				uploadedFileDamageStore.setData(modifiedFileUploads)
				uploadedFileDamageStore.commitChanges()
				tblDtlDamageCheckStore.setData(damageChecks)
				tblDtlDamageCheckStore.commitChanges()
				me.getViewModel().set('tblDamageCheckDetail', detailItem)
		}
	},
	
	onBindingAmoutnByPackageItems: function(returnValue){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var mt = 0, m3 = 0, qty = 0;
		
		if(returnValue.item.length > 0){
			for (var i=0; i<returnValue.item.length; i++){
				mt += Number(returnValue.item[i].get('mt'));
				m3 += Number(returnValue.item[i].get('m3'));
				qty++;
			}
		}
		
		refs.ctlTxtWhQty.setValue(qty);
		refs.ctlTxtWhMt.setValue(mt);
		refs.ctlTxtWhM3.setValue(m3);
	},

	// Search Condition
	getSearchCondition: function () {
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;

		var params = {
			vslCallId: recvData.get('vslCallId'),
			cgTpCd: recvData.get('cgTpCd'),
			shftDt: recvData.get('shftDt'),
			shftId: recvData.get('shftId'),
			blNo: recvData.get('blNo'),
			searchType: 'discharging',
			hhtFlags: '1STLD'
		};

		return params;
	},

	setDetailInitialize: function (masterItem) {
		var me = this;
		var refs = me.getReferences();
		var recvData = me.prevData;
		var modeOfOprCombo = me.getStore('whCheckImportForModeOfOprCombo');
		var deliveryCombo = me.getStore('whCheckImportForDeliveryCombo');
		var cargoTypeCombo = me.getStore('whCheckImportsForCargoTypeCombo');

		if (!masterItem) {
			return;
		}

		me.getViewModel().setData({ theDetail: masterItem });

		var detailItem = me.getViewModel().get('theDetail');

		detailItem.set('shftNm', recvData.get('shftNm'));
		detailItem.set('shftId', recvData.get('shftId'));
		detailItem.set('shftDt', recvData.get('shftDt'));
		

		var detailItem = Ext.create('MOST.model.operation.CargoDischarging');
		DateUtil.convertDateToLong(masterItem.get('items')[0], ['startDt', 'endDt']); // date to long
		
		var currentTime = Ext.Date.format(new Date(), 'd/m/Y H:i');
		refs.ctlDtmWhCheckImpStart.setValue(currentTime);
		
		detailItem.set('startDt' ,currentTime);
     	detailItem.set('endDt' , '');

		masterItem.get('items')[0].lorryId = '';
		detailItem.data = masterItem.get('items')[0];

		//Previous Date
		me.prevDate['startDt'] = detailItem.get('startDt');
		me.prevDate['endDt'] = detailItem.get('endDt');

		detailItem.set('preJobNo', recvData.get('jobNo'));
		detailItem.set('shftNm', recvData.get('shftNm'));
		detailItem.set('fnlOpeYn', recvData.get('fnlOpeYn'));
		detailItem.set('lorryNo', recvData.get('lorryNo'));
		detailItem.set('cgNo', detailItem.get('blNo'));
		detailItem.set('whM3', recvData.get('yardTruckM3'));
		detailItem.set('whWgt', recvData.get('yardTruckMT'));
		detailItem.set('whQty', recvData.get('yardTruckQty'));
		
		detailItem.set('wbTransactionNo', recvData.get('wbTransactionNo'));
		
		detailItem.phantom = false; // UPDATE
		detailItem.commit();
		me.getViewModel().setData({ theDetail: detailItem });
		me.getView().recvData = detailItem;

		modeOfOprCombo.setData(masterItem.get('modeOfOprList'));
		modeOfOprCombo.insert(0, { scd: '', scdNm: 'Selected' });
		deliveryCombo.setData(masterItem.get('deliveryList'));
		cargoTypeCombo.setData(masterItem.get('cargoTypeList'));

		// Set Editable Amount base on cargo Type:
		var cgTpCd = detailItem.get('cgTpCd');
		var isBBK = (cgTpCd === CodeConstants.MT_CGTP_BBK);
		var isDBK = (cgTpCd === CodeConstants.MT_CGTP_DBN || cgTpCd === CodeConstants.MT_CGTP_DBE);

		refs.ctlTxtWhMt.setEditable(isDBK);
		refs.ctlTxtWhM3.setEditable(isDBK);

		refs.ctlTxtWhMt.setClearable(isDBK);
		refs.ctlTxtWhM3.setClearable(isDBK);
		
		var store = me.getStore('loadLocation');

		store.load({
			params:{
				vslCallId : detailItem.get('vslCallId'),
				blNo : detailItem.get('blNo'),
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records != null && records.length > 0) {
						if (records.length > 1) {
							var res = records[0].data.locId.split('-'),
								locId = records[0].data.whId;
								
								locId += '(' + res[1] + ',' + records.length + ')';
								detailItem.set('locId',locId);
							return;
						}else{
							var whItems = new Array();
							var handlingItem = Ext.create('MOST.model.configuration.WhConfiguration', {
								locTpCd:  records[0].get('locTpCd'),
								whId: records[0].get('whId'),
								locId :records[0].get('locId'),
								vslCallId : detailItem.get('vslCallId'),
								cgNo : detailItem.get('blNo'),
								wgt:  recvData.get('yardTruckMT'),
								msrmt: recvData.get('yardTruckM3'),
								pkgQty:  recvData.get('yardTruckQty'),
								whTpCd:'G',
								// whTpCdNm : invLocItem.data.whwhTpCdNmId,
								spCaCoCd :''
							});
							whItems.push(handlingItem.data);
							me.prevWhItems = whItems;
							detailItem.set('locId', records[0].get('location'));
							
							if(recvData.get('jobNo')){
								me.getPackageNoList();
							}
						}
					}
					
				}
			}
		});

		//me.setDefaultLoadAmount();

	},
	
	getPackageNoList: function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.prevData;
		
		var store = me.getStore('packageNoList');
		store.load({
			params:{
				vslCallId : recvData.get('vslCallId'),
				blNo : recvData.get('blNo'),
				ixCd: 'I',
				jobPurpCd: 'AW',
				jobNo: recvData.get('jobNo')
			},
			callback: function(record, operation, success) {
				if(success){
					if(record != null && record.length > 0){
						me.packageItems = new Array();
						var pkgNo = '';
						var mt = 0, m3 = 0, qty = 0;
						for(var i = 0; i < record.length; i++){
							var returnItem = record[i];
							var pkgItem = Ext.create('MOST.model.operation.PackageJobItem', {
								vslCallId: returnItem.get('vslCallId'),
								mfDocId : returnItem.get('mfDocId'),
								refNo: returnItem.get('refNo'),
								pkgNo: returnItem.get('packageNo')
							});
							me.packageItems.push(pkgItem.data);
							if(pkgNo == '') {
								pkgNo = returnItem.get('packageNo');
							} else {
								pkgNo = pkgNo + ', ' + returnItem.get('packageNo');
							}
							
							mt += Number(returnItem.get('mt'));
							m3 += Number(returnItem.get('m3'));
							qty++;
						}
						refs.refPkgNo.setValue(pkgNo);
						
						refs.ctlTxtWhQty.setValue(qty);
						refs.ctlTxtWhMt.setValue(mt);
						refs.ctlTxtWhM3.setValue(m3);
					}
				}
			}
		});
	},

	operationSeting: function () {
		var me = this;
		var recvData = me.prevData;
		var refs = me.getReferences();

		var bbkItem = new Ext.create('MOST.model.operation.CargoDischarging');
		me.updateRecord(bbkItem, recvData);
		bbkItem.commit();
		me.getViewModel().setData({ theBBK: bbkItem });

		var dbkItem = new Ext.create('MOST.model.operation.CargoDischarging');
		me.updateRecord(dbkItem, recvData);
		dbkItem.commit();
		me.getViewModel().setData({ theDBK: dbkItem });

		var cgTpCd = recvData.get('cgTpCd');
		var isBBK = (cgTpCd === CodeConstants.MT_CGTP_BBK);
		var isDBK = (cgTpCd === CodeConstants.MT_CGTP_DBN || cgTpCd === CodeConstants.MT_CGTP_DBE);

		if (!isBBK && !isDBK) {
			MessageUtil.warning('warning_msg', 'hht_whcheckimport_cannot_operation_msg', cgTpCd);
			var window = me.getView().up('window');
			window.close();
		}
	},

	checkOverBalance: function (ctl, newValue) {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var cgTpCd = recvData.get('cgTpCd');
		var isBBK = (cgTpCd === CodeConstants.MT_CGTP_BBK);
		var isDBK = (cgTpCd === CodeConstants.MT_CGTP_DBN || cgTpCd === CodeConstants.MT_CGTP_DBE);

		var aprBalQty = detailItem.get('abQty');
		var aprBalMt = detailItem.get('abMt');
		var aprBalM3 = detailItem.get('abM3');

		if (!newValue) {
			newValue = 0;
		}

		if (ctl.reference === 'ctlTxtWhQty' 
			&& newValue > aprBalQty
			&& isBBK) {
			return false;
		} 
//		else if (ctl.reference === 'ctlTxtWhMt' && newValue > aprBalMt) {
//			return false;
//		} else if (ctl.reference === 'ctlTxtWhM3' && newValue > aprBalM3) {
//			return false;
//		}
		return true;
	},

	//Check Zero/ Empty Amount
	checkAmountPreSave: function () {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var cgTpCd = detailItem.get('cgTpCd');

		var aprBalQty = detailItem.get('abQty');
		var aprBalMt = detailItem.get('abMt');

		var whQty = detailItem.get('whQty');
		var whMt = detailItem.get('whMt');

		var isBBK = (cgTpCd === CodeConstants.MT_CGTP_BBK);
		var isDBK = (cgTpCd === CodeConstants.MT_CGTP_DBN || cgTpCd === CodeConstants.MT_CGTP_DBE);


		if (isBBK && aprBalQty <= 0) {
			MessageUtil.warning('warning_msg', 'hht_whcheckimport_bbk_empty_bal');
			return false;
		} 
//		else if (cgTpCd == CodeConstants.MT_CGTP_DBN && aprBalMt <= 0) {
//			MessageUtil.warning('warning_msg', 'hht_whcheckimport_dbn_empty_bal');
//			return false;
//		}

		if (isBBK && whQty <= 0) {
			MessageUtil.warning('warning_msg', 'hht_whcheckimport_bbk_zero_amount');
			return false;

		} else if (isDBK && whMt <= 0) {
			MessageUtil.warning('warning_msg', 'hht_whcheckimport_dbn_zero_amount');
			return false;
			
		}
		
		return true;
	},


	// Validate Working Time:
	validateOperationTime: function () {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetailHHT');
		var recvData = me.prevData;

		// Time check
		var startDt = me.prevDate['startDt'];
		var endDt = me.prevDate['endDt'];
		var newStartDate = Ext.Date.parse(refs.ctlDtmWhCheckImpStart.getValue(), 'd/m/Y H:i');
		var newEndDate = Ext.Date.parse(refs.ctlDtmWhCheckImpEnd.getValue(), 'd/m/Y H:i');
		var startDateFormat = Ext.Date.format(me.prevDate['startDt'], MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var endDateFormat = Ext.Date.format(me.prevDate['endDt'], MOST.config.Locale.getDefaultDateFormatWithNoSeconds());

		if (newStartDate != null) {
			if (startDt > newStartDate || endDt < newStartDate) {
				MessageUtil.warning('warning_msg', Ext.String.format('Shift Start : {0}<br>Shift End : {1}', startDateFormat, endDateFormat));
				return false;
			}
		}

		if (newEndDate != null) {
			if (startDt > newEndDate || endDt < newEndDate) {
				MessageUtil.warning('warning_msg', Ext.String.format('Shift Start : {0}<br>Shift End : {1}', startDateFormat, endDateFormat));
				return false;
			}

			if (newEndDate < newStartDate) {
				MessageUtil.warning('warning_msg', 'confirmloading_start_end_date_msg');
				return false;
			}
		}

		return true;
	},

	onWHiTabDamage: function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		ViewUtil.openHhtPopup(this, 'app-damageofcargo', 'refsWHiBtnDamage', recvData);

	},

	onWHiTabDimension: function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		ViewUtil.openHhtPopup(this, 'app-dimensionofcargohht', 'refsWHiBtnDimension', recvData);
	},
	
	saveDamage : function(){
		var me = this;
		var refs = me.getReferences();
		var damageStore = me.getStore(me.DAMAGE_STORE);
		if(damageStore.data.length > 0){
			var insertItem = damageStore.data.items[0];
			var isCreated = false;
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			
			updateParm.getProxy().url = damageStore.getProxy().url;
			updateParm.phantom = isCreated;
			updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
			updateParm.set('userId', MOST.config.Token.getUserId());
			updateParm.set('item', insertItem.data);
			updateParm.save({
				callback: function(record, operation, success) {
					if(success){
						
					}
				}
			});
		}
	},
	
	saveDimension : function(){
		var me = this;
		var refs = me.getReferences();
		var dimensionStore = me.getStore(me.DIMENSION_STORE);
		if(dimensionStore.data.length > 0){
			var item = dimensionStore.data.items[0];
			var isCreated = false;
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			updateParm.getProxy().url = dimensionStore.getProxy().url;
			updateParm.phantom = isCreated;
			updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
			updateParm.set('userId', MOST.config.Token.getUserId());
			updateParm.set('item', item.data);
			updateParm.save({
				callback: function(record, operation, success) {
					if(success){
						
					}
				}
			});
		}
	},

	onOpenTblDamageCheck: function() {
		var  me = this
			,currentTimeFormatted = Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds())
			,detailItem = me.getViewModel().get('theDetail')
		;

		detailItem.set({
			isOperationScreen: true
		   ,checkedDt: currentTimeFormatted
		   ,title: 'The Detail of Damage Check'
		   ,locCd: 'YARD'
	   });
		ViewUtil.openHhtPopup(me, 'app-damagecheckhhtpopup', 'refConfirmWarehouseOutDamageBtn', detailItem);
	},
	/**
	 * GENERAL METHOD END
	 * ==================
	 */
});