Ext.define('MOST.view.operation.ConfirmLoadingHHTPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.confirmloadinghhtpopup',
	
	/**
	 * =========================================================================================================================
	 * VARIABLE, CONSTANT START
	 */
	CARGO_LOADING_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/cargoloading/cargoLoading',
	prevDate:{ startDt: null, endDt: null},
	booleanDirSpr : false,
 	prevData:null,

 	CUST_RELEASE: 'RELEASE', //CUSTOMS MODE
	CUST_HOLD: 'HOLD', //CUSTOMS MODE
	INIT: true,
	FORM_REF: 'refFrmCfrmLoading',
	
	packageItems : new Array(),
	hangingScaleItems : new Array(),
	/**
	 * VARIABLE, CONSTANT END
	 * =========================================================================================================================
	 */	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		//me.setMaskedForm(true);
		var recvData = me.getView().recvData;
		me.prevData = recvData.clone();
		me.getViewModel().setData({theDetail:null});
		
		var confirmLoadingHatchCombo = me.getStore('confirmLoadingHatchCombo');
		var deployedEquipmentNoList = me.getStore('deployedEquipmentNoList');
		var confirmLoadingForModeOfOprCombo = me.getStore('confirmLoadingForModeOfOprCombo');
		confirmLoadingHatchCombo.load();
		deployedEquipmentNoList.load();
		confirmLoadingForModeOfOprCombo.load();
		me.setComboBoxWithLocalCache(CacheServiceConstants.APFP_COMBOBOX, 'confirmLoadingHatchDrtCombo');
		/*Get Detail ConfirmLoading Item*/
		var params = me.getSearchCondition();
		var store = me.getStore('confirmLoading');
		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success){
					if(record != null && record.length > 0){
						me.setDetailInitialize(record[0]);
						me.operationSetting();
						//me.setMaskedForm(false);
					}
				}
			}
		});
	},
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE END
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	//Start button Confirm Loading HHT: ===============================================================
	onDetailSaveHHT: function(){
		var me = this;
		var refs = me.getReferences();

		var detailItem = me.getViewModel().get('theDetail');
		detailItem.data.lorryNo = '1102-EX2'
		var lorryGridStore = me.getStore('confirmLoadingAssignmentLorrysPopup');
		var validForm = refs.refFrmCfrmLoading.validate();

		if(!validForm){
			MessageUtil.mandatoryFieldInValid();
			me.setMaskedForm(false);
			return;
		}

//		//Validate TruckNo
//		if(refs.refRadioCfmLoadingGV.getChecked()){
//			me.validateTruckNo();
//		}else{
//			me.saveCheckHHT();			
//		}
		
		me.saveCheckHHT();	
	},

	onCancelHHT: function(btn){
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
	
	onHangingScaleFetch_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		if(refs.refRadioCfmLoadingBV.getChecked()) {
			var store = me.getStore('hangingScaleFetchingItems');
			store.load({
				params:{
					vslCallId	: detailItem.get('vslCallId'),
					mfDocId 	: detailItem.get('mfDocId'),
					shipgNoteNo : detailItem.get('shipgNoteNo'),
					grNo 		: detailItem.get('grNo'),
					
				},
				callback: function(records, operation, success) {
					if (success) {
						me.hangingScaleItems = new Array();
						
						if(records.length > 0) {
							
							for (var i=0; i<records.length; i++){
								me.hangingScaleItems.push(records[i].data);
							}
							
							refs.refLoadBvQty.setValue(records[0].get('pkgQty'));
							refs.refLoadBvMt.setValue(records[0].get('cgWgt'));
							refs.refLoadBvM3.setValue(records[0].get('cgVol'));
						}
					}
				}
			});
		}
	},
	
	onChangeHandlingAmt: function(ref, newValue, oldValue, eOpts){
		var me = this;
		var refs = me.getReferences();

		if(me.INIT){
			me.INIT = false;
			return;
		}

		var detailItem = me.getViewModel().get('theDetail');

		if(!me.checkOverBalance(ref, newValue)){
			if(detailItem.get('cgTpCd') === CodeConstants.MT_CGTP_BBK) {
				MessageUtil.warning('warning_msg', 'warehousecheckexport_dbk_exceed_msg');
				ref.suspendEvents();
				ref.setValue(oldValue);
				ref.resumeEvents();
				return;
			}
		}

		//If CargoType: BBK and Field Change is Qty of Gate to VSL => Auto Calculate Mt and M3
		if(detailItem.get('cgTpCd') === CodeConstants.MT_CGTP_BBK 
				&& (ref.reference == 'refLoadGvQty' || ref.reference == 'refLoadBvQty') ){
			me.autoCalculateAmount(ref, newValue);
		}
		me.checkFinal(ref);
	},
	
	//Check Box  Event:
	onCheckLoadingType: function(ctl , newValue, oldValue, eOpts ) {
		if(!newValue){
			return;
		}
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var delvTpCd = detailItem.get('delvTpCd');
		var cgTpCd = detailItem.get('cgTpCd');

//		if(delvTpCd){
//			refs.refRadioCfmLoadingGV.setDisabled(delvTpCd === 'I');
//		}

		var isGV = refs.refRadioCfmLoadingGV.getChecked();
		var isAV = refs.refRadioCfmLoadingAV.getChecked();
		var isBV = refs.refRadioCfmLoadingBV.getChecked();
		
		if(isGV || isAV){
			refs.refTxtCfmLoadingLorryNo.setRequired(true);
			refs.refTxtCfmLoadingBargeNo.setRequired(false);
		} else {
			refs.refTxtCfmLoadingLorryNo.setRequired(false);
			refs.refTxtCfmLoadingBargeNo.setRequired(true);
		}

		//Set Editable Amount input:
		refs.refLoadGvMt.setEditable(cgTpCd !== CodeConstants.MT_CGTP_BBK);
		refs.refLoadGvM3.setEditable(cgTpCd !== CodeConstants.MT_CGTP_BBK);
		
		refs.refLoadBvMt.setEditable(cgTpCd !== CodeConstants.MT_CGTP_BBK);
		refs.refLoadBvM3.setEditable(cgTpCd !== CodeConstants.MT_CGTP_BBK);
		
		refs.refLoadAvMt.setEditable(cgTpCd !== CodeConstants.MT_CGTP_BBK);
		refs.refLoadAvM3.setEditable(cgTpCd !== CodeConstants.MT_CGTP_BBK);

		//Set Editable Amount input:
		refs.refLoadGvMt.setClearable(cgTpCd !== CodeConstants.MT_CGTP_BBK);
		refs.refLoadGvM3.setClearable(cgTpCd !== CodeConstants.MT_CGTP_BBK);
		
		refs.refLoadBvMt.setClearable(cgTpCd !== CodeConstants.MT_CGTP_BBK);
		refs.refLoadBvM3.setClearable(cgTpCd !== CodeConstants.MT_CGTP_BBK);

		refs.refLoadAvMt.setClearable(cgTpCd !== CodeConstants.MT_CGTP_BBK);
		refs.refLoadAvM3.setClearable(cgTpCd !== CodeConstants.MT_CGTP_BBK);

		refs.refLoadGvMt.setDisabled(!isGV);
		refs.refLoadGvM3.setDisabled(!isGV);
		refs.refLoadGvQty.setDisabled(!isGV);
		
		refs.refLoadBvMt.setDisabled(!isBV);
		refs.refLoadBvM3.setDisabled(!isBV);
		refs.refLoadBvQty.setDisabled(!isBV);

		refs.refLoadAvMt.setDisabled(!isAV);
		refs.refLoadAvM3.setDisabled(!isAV);
		refs.refLoadAvQty.setDisabled(!isAV);

		if(isGV){
			detailItem.set('loadAvMt', 0);
			detailItem.set('loadAvM3', 0);
			detailItem.set('loadAvQty', 0);
			
			detailItem.set('loadBvMt', 0);
			detailItem.set('loadBvM3', 0);
			detailItem.set('loadBvQty', 0);
		} else if (isAV){
			detailItem.set('loadGvMt', 0);
			detailItem.set('loadGvM3', 0);
			detailItem.set('loadGvQty', 0);
			
			detailItem.set('loadBvMt', 0);
			detailItem.set('loadBvM3', 0);
			detailItem.set('loadBvQty', 0);
		} else if(isBV){
			detailItem.set('loadAvMt', 0);
			detailItem.set('loadAvM3', 0);
			detailItem.set('loadAvQty', 0);
			
			detailItem.set('loadGvMt', 0);
			detailItem.set('loadGvM3', 0);
			detailItem.set('loadGvQty', 0);
		}

	},

	onOpenTblDamageCheck: function(btn, e, eOpts){
		var  me = this
			,meMainView = me.getView()
			,meWindow = meMainView.up('window')
			,mainView = meMainView.up('app-main')
			,mainTab = mainView.lookupReference('refMainTab')
			,mainViewController = mainView.getController()
			,detailItem = me.getViewModel().get('theDetail')
		;
		
		meWindow.hide();
		var isExistedMenu = Ext.Array.findBy(mainTab.getInnerItems(), (item, index) => {
			if(item.xtype === 'app-' + btn.getValue()) {
				item.recvData = detailItem;
				return item;
			};
		});

		if(isExistedMenu) {
			mainTab.setActiveItem(isExistedMenu);
			isExistedMenu.getController().setTblRecvData(detailItem, isExistedMenu.getViewModel().get('theSearch'));
		} else {
			btn.recvData = detailItem;
			mainViewController.onMenuClick(btn);
		}
	},
	
	onOpenTruckPopup: function(){
		var me = this;
		var refs = me.getReferences();
		var targetCtl = 'refTxtCfmLoadingLorryNo',
			popupAlias = '', 
			title = '';
		var detailItem = me.getViewModel().get('theDetail');
		var isGV = refs.refRadioCfmLoadingGV.getChecked();
		var isAV = refs.refRadioCfmLoadingAV.getChecked();

		if(isAV){
			title = 'Yard Truck List';
			popupAlias = 'popup-assignedinternaltrucklistpopuphht';
		}else{
			title = 'In-Gate Truck List';
			popupAlias = 'popup-ingatetrucklistpopuphht';
		}

		var params = {
				title: title,
				vslCallId: detailItem.get('vslCallId'),
				lorryNo: refs.refTxtCfmLoadingLorryNo.getValue(),
				blNo: '',
				shipgNoteNo: detailItem.get('shipgNoteNo'),
				grNo: detailItem.get('grNo'),
				weightCheckYn: detailItem.get('weightCheckYn')
			};
	
		if(popupAlias){
			ViewUtil.openHhtPopup(me, popupAlias, targetCtl , params);
		}
	},
	
	//Barge No popup
	onOpenBargePopup: function(){
		var me = this;
		var refs = me.getReferences();
		
		var isBV = refs.refRadioCfmLoadingBV.getChecked();

		if(isBV){
			var detailItem = me.getViewModel().get('theDetail');
			var targetCtl = 'refTxtCfmLoadingBargeNo';
			var title = 'Barge No. List';
			
			var params = {
					title: title,
					vslCallId: detailItem.get('vslCallId')
				};
			
			ViewUtil.openHhtPopup(this, 'app-assignmentbargepopuphht', targetCtl, params);
		}
	},
	
	//Package No popup
	onOpenPackageNoPopup: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		//var recvData = me.prevData;
		var recvData = me.getView().recvData;
		
		var targetCtl = 'refTxtPkgNo';
		var title = 'Package No. List';
		var jobNo = '';
		if(recvData.get('jobNo')){
			jobNo = recvData.get('jobNo');
		}
		var isGV = refs.refRadioCfmLoadingGV.getChecked();
		var isAV = refs.refRadioCfmLoadingAV.getChecked();
		
		var params = {
				title: title,
				vslCallId: detailItem.get('vslCallId'),
				shipgNoteNo: detailItem.get('shipgNoteNo'),
				ixCd: 'X',
				jobPurpCd: (isAV ? 'AV' : ''),
				jobNo: jobNo
			};
		ViewUtil.openHhtPopup(this, 'app-packagenomultipopuphht', targetCtl, params);
	},
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	setDetailInitialize:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.prevData;

		if(masterItem.get('items') != null && masterItem.get('items').length > 0){
			var detailItem = new Ext.create('MOST.model.operation.CargoLoading');
			DateUtil.convertDateToLong(masterItem.get('items')[0], ['startDt', 'endDt']); // date to long
			detailItem.data = masterItem.get('items')[0];

			me.getViewModel().setData({theDetail:detailItem});
			me.getView().recvData = detailItem;
			
			var delvTpCd = detailItem.get('delvTpCd');
			var cgTpCd = detailItem.get('cgTpCd');
			
			refs.refCtnConfirmLoadingGV.setHidden(true);
			refs.refCtnConfirmLoadingBV.setHidden(true);
			refs.refCtnConfirmLoadingAV.setHidden(true);
			if(delvTpCd === 'I'){
				refs.refRadioCfmLoadingAV.setChecked(true);
				refs.refCtnConfirmLoadingAV.setHidden(false);
			}else{
				if(recvData.get('bargeCheck') == 'Y' && CodeConstants.CGMST_TSPT_TP_SE == detailItem.get('tsptTpCd')) {
					refs.refRadioCfmLoadingBV.setChecked(true);
					refs.refCtnConfirmLoadingBV.setHidden(false);
				}
				else {
					refs.refRadioCfmLoadingGV.setChecked(true);
					refs.refCtnConfirmLoadingGV.setHidden(false);
				}
			}

			if(recvData.get('jobNo') || recvData.get('jobGroup')){//Load from WA Job
				//Amount Indirect:
				detailItem.set('jobGroup', recvData.get('jobGroup'));
				detailItem.set('loadAvQty', recvData.get('yardTruckQty'));
				detailItem.set('loadAvMt', recvData.get('yardTruckMt'));
				detailItem.set('loadAvM3', recvData.get('yardTruckM3'));
				detailItem.set('prevJobNo', recvData.get('jobNo'));
				detailItem.set('internalLorryNo', recvData.get('lorryNo'));
				detailItem.set('lorryNo', recvData.get('lorryNo'));
				
				detailItem.set('internalLorryNo', recvData.get('lorryNo'));
				detailItem.set('wbTransactionNo', recvData.get('wbTransactionNo'));
				
				me.getPackageNoList();
			}else{
				//Direct
				detailItem.set('externalLorryNo', recvData.get('lorryNo'));
				detailItem.set('lorryNo', recvData.get('lorryNo'));
				detailItem.set('gateTxnNo', recvData.get('gateTxnNo'));
				detailItem.set('wbTransactionNo', recvData.get('wbTransactionNo'));
			}
			
			detailItem.set('freightTon', Math.max(detailItem.get('snMt'),detailItem.get('snM3')));
			detailItem.set('startDt', new Date()); //Set Start Time
			detailItem.set('fnlOpeYn', recvData.get('fnlOpeYn'));
			detailItem.set('loadMt', 0);
			detailItem.set('loadM3', 0);
			detailItem.set('loadQty', 0);

			//Set Hatch-Gang-Stevedore
			detailItem.set('hatchNo', recvData.get('hatchNo'));
			detailItem.set('steveComp', recvData.get('steveComp'));
			detailItem.set('gangNo', recvData.get('gangNo'));
			detailItem.set('pkgNo', recvData.get('pkgNo'));

			detailItem.phantom = false; // UPDATE
			detailItem.commit();
		}
		me.INIT = false;
	},
	
	getPackageNoList: function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.prevData;
		
		var store = me.getStore('packageNoList');
		store.load({
			params:{
				vslCallId : recvData.get('vslCallId'),
				shipgNoteNo : recvData.get('shipgNoteNo'),
				ixCd: 'X',
				jobPurpCd: 'AV',
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
						refs.refTxtPkgNo.setValue(pkgNo);
						
						refs.refLoadAvQty.setValue(qty);
						refs.refLoadAvMt.setValue(mt);
						refs.refLoadAvM3.setValue(m3);
					}
				}
			}
		});
	},

	/*
	 * =============================
	 * */
	operationSetting : function(){
		var me = this;
     	var recvData = me.prevData;
     	var refs = me.getReferences();
		var isBBK = false;
		var isDBK = false;
		var listType = ''; //Get from CMC;

		listType = recvData.get('listType');
		isBBK = (recvData.get('cgTpCd') === CodeConstants.MT_CGTP_BBK);
		isDBK = (recvData.get('cgTpCd') === CodeConstants.MT_CGTP_DBN || recvData.get('cgTpCd') === CodeConstants.MT_CGTP_DBE);
		
		if(!(isBBK || isDBK)){
			MessageUtil.warning('warning_msg', 'confirmloading_can_not_operation_msg', recvData.get('cgTpCd'));
			var window = me.getView().up('window');
			window.close();
		}
		
		//Set ReadOnly Amount
		refs.refLoadAvQty.setReadOnly(listType == 'JOBWA');
		refs.refLoadAvMt.setReadOnly(listType == 'JOBWA' || isBBK);
		refs.refLoadAvM3.setReadOnly(listType == 'JOBWA' || isBBK);
		refs.refLoadGvMt.setReadOnly(isBBK);
		refs.refLoadGvM3.setReadOnly(isBBK);

	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		var detailItem = me.getViewModel().get('theDetail');
		
		if(targetControl === 'refTxtCfmLoadingLorryNo'){
			if(returnValue) {
				detailItem.set('externalLorryNo',returnValue.item.get('lorryNo'));
				detailItem.set('gateTxnNo',returnValue.item.get('gateTxnNo'));
				detailItem.set('wbTransactionNo',returnValue.item.get('wbTransactionNo'));
			}
			else {
				detailItem.set('externalLorryNo', '');
				detailItem.set('gateTxnNo', '');
				detailItem.set('wbTransactionNo', '');
			}
		}
		else  if(targetControl === 'refTxtPkgNo'){
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
		}else if(targetControl === 'refBtnCfmLoadingDamage'){
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

	fileDamageCheckUpload : function(formData) {
		var me = this;
		var uploadedFileDamageStore = me.getStore('uploadedFileDamageStore')
    	var xhr = new XMLHttpRequest();
    	
    	xhr.addEventListener('loadend', function() {
    		if(xhr.status === 200) {
    			var rtnData = JSON.parse(xhr.responseText); // get filename - uuid
    			
    			uploadedFileDamageStore.each(function(record, index, array) {
    	    		record.set('ufileName', rtnData[record.get('fileName')]);
    	    	});
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


	onBindingAmoutnByPackageItems: function(returnValue){
		var me = this;
		var refs = me.getReferences();
		var mt = 0, m3 = 0, qty = 0;
		var isGV = refs.refRadioCfmLoadingGV.getChecked();
		var isAV = refs.refRadioCfmLoadingAV.getChecked();
		
		if(returnValue.item.length > 0){
			for (var i=0; i<returnValue.item.length; i++){
				mt += Number(returnValue.item[i].get('mt'));
				m3 += Number(returnValue.item[i].get('m3'));
				qty++;
			}
		}
		
		if(isAV){
			refs.refLoadAvQty.setValue(qty);
			refs.refLoadAvMt.setValue(mt);
			refs.refLoadAvM3.setValue(m3);
		}
		else if(isGV){
			refs.refLoadGvQty.setValue(qty);
			refs.refLoadGvMt.setValue(mt);
			refs.refLoadGvM3.setValue(m3);
		}
		
	},
	
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var recvData = me.prevData;
    	 
    	var params = {
			vslCallId : recvData.get('vslCallId'),
			mfDocId: recvData.get('mfDocId'),
			grNo : recvData.get('grNo'),
			cgNo : recvData.get('cgNo'),
			stat : recvData.get('stat'),
			cgTpCd : recvData.get('cgTpCd'),
			shftDt : recvData.get('shftDt'),
			shftId : recvData.get('shftId'),
			shipgNoteNo : recvData.get('shipgNoteNo'),
			delvTpCd : recvData.get('delvTpCd'),
			jobGroup: recvData.get('jobGroup'),
		};
    	return params;
	},
	
	autoCalculateAmount: function (ref, newValue) { // Just for BBK
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var cgTpCd = detailItem.get('cgTpCd');

		var isGV = refs.refRadioCfmLoadingGV.getChecked();
		var isAV = refs.refRadioCfmLoadingAV.getChecked();
		var isBV = refs.refRadioCfmLoadingBV.getChecked();

		if(cgTpCd != CodeConstants.MT_CGTP_BBK) return;

		var eachMt = detailItem.get('eachMt');
		var eachM3 = detailItem.get('eachM3');
		var inputQty = Number(newValue);
		var avBalQty = Number(detailItem.get('avBalQty'));
		var balQty = Number(detailItem.get('balQty')); //Gate to Vessel, Gate to Apron
		

		if(ref.reference  === 'refLoadGvQty'){
			if(inputQty === balQty){
				detailItem.set('loadGvMt', Number(detailItem.get('balMt')));
				detailItem.set('loadGvM3', Number(detailItem.get('balM3')));
			}else{
				detailItem.set('loadGvMt', eachMt * inputQty);
				detailItem.set('loadGvM3', eachM3 * inputQty);
			}
			
		}else if(ref.reference  === 'refLoadBvQty'){
			if(inputQty === balQty){
				detailItem.set('loadBvMt', Number(detailItem.get('balMt')));
				detailItem.set('loadBvM3', Number(detailItem.get('balM3')));
			}else{
				detailItem.set('loadBvMt', eachMt * inputQty);
				detailItem.set('loadBvM3', eachM3 * inputQty);
			}
		}else if(ref.reference  === 'refLoadAvQty'){
			if(inputQty === avBalQty){
				detailItem.set('loadAvMt', Number(detailItem.get('avBalMt')));
				detailItem.set('loadAvM3', Number(detailItem.get('avBalM3')));
			}else{
				detailItem.set('loadAvMt', eachMt * inputQty);
				detailItem.set('loadAvM3', eachM3 * inputQty);
			}
			
		}
	},
	
	checkFinal: function (ref) {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var cgTpCd = detailItem.get('cgTpCd');

		var isGV = refs.refRadioCfmLoadingGV.getChecked();
		var isAV = refs.refRadioCfmLoadingAV.getChecked();
		var isBV = refs.refRadioCfmLoadingBV.getChecked();
		
		var loadGvQty = detailItem.get('loadGvQty');
		var loadGvMt = detailItem.get('loadGvMt');
		var balQty = detailItem.get('balQty');
		var balMt = detailItem.get('balMt');


		var loadAvQty = detailItem.get('loadAvQty');
		var loadAvMt = detailItem.get('loadAvMt');
		var avBalQty = detailItem.get('avBalQty');
		var avBalMt= detailItem.get('avBalMt');
		
		var loadBvQty = detailItem.get('loadBvQty');
		var loadBvMt = detailItem.get('loadBvMt');

		var isFinalLoad = false;
		if(isGV){
			if(cgTpCd == CodeConstants.MT_CGTP_BBK && loadGvQty >= balQty){
				isFinalLoad = true;
			}
		}
		
		else if(isAV){
			if(cgTpCd == CodeConstants.MT_CGTP_BBK && loadAvQty >= avBalQty){
				isFinalLoad = true;
			}
		}
		
		else if(isBV){
			if(cgTpCd == CodeConstants.MT_CGTP_BBK && loadBvQty >= balQty){
				isFinalLoad = true;
			}
		}
		refs.refChkCfmLoadingFinalLoad.setChecked(isFinalLoad);
		
	},

	setLoadingAmt: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');

		var delvTpCd = detailItem.get('delvTpCd');

		if(!delvTpCd){
			return;
		}
		
		var loadMt = loadM3 = loadQty = 0;
		var jobPurpCd = "";

		if(delvTpCd === 'D'){
			if(refs.refRadioCfmLoadingGV.getChecked()){//Direct Gate to vesel
				loadMt = refs.refLoadGvMt.getValue();
				loadM3 = refs.refLoadGvM3.getValue();
				loadQty = refs.refLoadGvQty.getValue();
				jobPurpCd = 'GV';
			}else if(refs.refRadioCfmLoadingBV.getChecked()){//Direct Barge to Vessel
				loadMt = refs.refLoadBvMt.getValue();
				loadM3 = refs.refLoadBvM3.getValue();
				loadQty = refs.refLoadBvQty.getValue();
				jobPurpCd = 'BV';
			}
		}

		if(delvTpCd === 'I'){
			loadMt = refs.refLoadAvMt.getValue();
			loadM3 = refs.refLoadAvM3.getValue();
			loadQty = refs.refLoadAvQty.getValue();
		}
		
		detailItem.set('loadMt', loadMt);
		detailItem.set('loadQty', loadQty);
		detailItem.set('loadM3', loadM3);		
		detailItem.set('jobPurpCd', jobPurpCd);
	},
	
	saveWithNoRelease: function(detailItem){
		var me = this;
		if(StringUtil.isNullorEmpty(detailItem.get('hatchNo'))){
			MessageUtil.warning('warning_msg', 'confirmloading_hatch_no_empty_msg');
			return;
		}

		me.saveHHT();
	},
	
	// clearanceHHT
	clearanceHHT : function(){
		
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		//Time check
		var startDt = me.prevDate['startDt'];
		var endDt = me.prevDate['endDt'];
		var newStartDate = detailItem.get('startDt');
		var newEndDate = new Date(); //detailItem.get('endDt');
		var startDateFormat = Ext.Date.format(me.prevDate['startDt'], MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var endDateFormat = Ext.Date.format(me.prevDate['endDt'], MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
	
//		if(newEndDate < newStartDate){
//			MessageUtil.warning('warning_msg', 'confirmloading_start_end_date_msg'); // "Start Date Should Be Less Than End Date"
//			return;
//		}
		
		if(StringUtil.isNullorEmpty(detailItem.get('hatchNo'))){
			MessageUtil.warning('warning_msg', 'confirmloading_hatch_no_empty_msg'); // CT1210005
			return;
		}

		var cgTpCd = detailItem.get('cgTpCd');
		var isDBK = (CodeConstants.MT_CGTP_DBN === cgTpCd || CodeConstants.MT_CGTP_DBE === cgTpCd );
		var actMTLoad = detailItem.get('accuSumWgt');
		var actQtyLoad = detailItem.get('accuSumQty');	
		var actM3Load = detailItem.get('accuSumMsrmt');	
		var dcMT = detailItem.get('snMt');
		var dcQty = detailItem.get('snQty');	
		var dcM3 = detailItem.get('snM3');
		var isLoadingMT = detailItem.get('loadMt');
		var isLoadingQty = detailItem.get('loadQty');	
		var isLoadingM3 = detailItem.get('loadM3');
		
		if ((((actM3Load + isLoadingM3) > dcM3 && dcM3 > 0) || ((actMTLoad + isLoadingMT) > dcMT && dcMT > 0)  || ((actQtyLoad + isLoadingQty) > dcQty && dcQty > 0 ))  &&
			( detailItem.get('fnlOpeYn') === 'N')){
			
		
			if(detailItem.get('cgTpCd') && isDBK){
				MessageUtil.questionModern('info_msg', 'balValidation_msg', null,
						function(button){
							if(button == 'ok'){
								MessageUtil.questionModern('info_msg', 'confirmloading_final_loading_continue_loading_msg', null, 
										function(button){
											me.continueLoadingHHT(button);
										}
									);
							}
				}
				);
			}
			else {
				MessageUtil.questionModern('info_msg', 'confirmloading_final_loading_continue_loading_msg', null, 
						function(button){
							me.continueLoadingHHT(button);
						}
					);
			}
			
			return;
		 }

		if(!me.allAmountValidationHHT()){
			return;
		}else{
			me.saveHHT();
		}
	},	
	
	// SAVE PROCESS
	saveHHT : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		var recvData = me.prevData;
		
		var actMTLoad = detailItem.get('accuSumWgt');
		var actQtyLoad = detailItem.get('accuSumQty');	
		var actM3Load = detailItem.get('accuSumMsrmt');	
		var dcMT = detailItem.get('snMt');
		var dcQty = detailItem.get('snQty');	
		var dcM3 = detailItem.get('snM3');
		var isLoadingMT = detailItem.get('loadMt');
		var isLoadingQty = detailItem.get('loadQty');	
		var isLoadingM3 = detailItem.get('loadM3');
		var cgTpCd = detailItem.get('cgTpCd');
		var isDBK = (CodeConstants.MT_CGTP_DBN === cgTpCd || CodeConstants.MT_CGTP_DBE === cgTpCd );
		
		if ((((actM3Load + isLoadingM3) >= dcM3 && dcM3 > 0) || ((actMTLoad + isLoadingMT) >= dcMT && dcMT > 0)  || ((actQtyLoad + isLoadingQty) >= dcQty && dcQty > 0 ))  &&
			( detailItem.get('fnlOpeYn') === 'N')){
			
			if(cgTpCd && isDBK){
				MessageUtil.questionModern('info_msg', 'balValidation_msg', null,
						function(button){
							if(button == 'ok'){
								MessageUtil.questionModern('info_msg', 'confirmloading_final_loading_continue_loading_msg', null, 
										function(button){
									 		me.cudFunctionHHT();
										}
									);
							}
				}
				);
			}
			else {
				MessageUtil.questionModern('info_msg', 'confirmloading_final_loading_continue_loading_msg', null, 
						function(button){
					 		me.cudFunctionHHT();
						}
					);
			}
			
			return;
		 }

		if(!me.allAmountValidationHHT()){
			return;
		}
		
		if(!me.endTimeCheckHHT()){
			return;
		}

		me.cudFunctionHHT();
	},


	// continueLoading
	continueLoadingHHT : function(isOk){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		if (isOk === 'ok') {
			detailItem.set('fnlOpeYn', 'Y');
		}
		me.cudFunctionHHT();
	},

	// cudFunction HHT
	cudFunctionHHT : function() {
		var me = this;
		var refs = me.getReferences();
		me.setMaskedForm(true);

		var window = me.getView().up('window');
		var detailItem = me.getViewModel().get('theDetail');

		var startDtStr = Ext.Date.format(detailItem.get('startDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var endDtStr = '';

		var crrDateTime =  new Date();
		var shftDtStr = endDtStr = Ext.Date.format(crrDateTime, 'Ymd');
		if(detailItem.get('endDt')){
			endDtStr = Ext.Date.format(detailItem.get('endDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());// "d/m/Y"
		}else{
			endDtStr = Ext.Date.format(crrDateTime, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		}

		detailItem.set('startDtStr', startDtStr); 
		detailItem.set('endDtStr', endDtStr); 
		detailItem.set('shftDt', shftDtStr); 
		
		detailItem.set('userId', MOST.config.Token.getUserId());
		detailItem.set('packageItems', me.packageItems);
		detailItem.set('hangingScaleItems', me.hangingScaleItems);
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
				
		updateParm.getProxy().url = me.CARGO_LOADING_PROXY_URL;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('item', detailItem.data);
		updateParm.save({
			callback: function(records, operation, success) {
				if (success) {
					detailItem.commit();
					me.checkDamageCheck(records.data.jobNo)
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

	onOpenTblDamageCheck: function() {
		var  me = this
			,currentTimeFormatted = Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds())
			,detailItem = me.getViewModel().get('theDetail')
		;

		detailItem.set({
			isOperationScreen: true
		   ,checkedDt: currentTimeFormatted
		   ,title: 'The Detail of Damage Check'
		   ,locCd: 'VSL'
	   });
		ViewUtil.openHhtPopup(me, 'app-damagecheckhhtpopup', 'refBtnCfmLoadingDamage', detailItem);
	},
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD END
	 */

	/**
	 * =========================================================================================================================
	 * VALIDATION METHOD START
	 */
	checkOverBalance: function(ref, newValue){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var balQty = 0;
		var balMt = 0;
		var balM3 = 0;

		balQty = detailItem.get('balQty');
		balMt = detailItem.get('balMt');
		balM3 = detailItem.get('balM3');

		var isGV = refs.refRadioCfmLoadingGV.getChecked();
		var isAV = refs.refRadioCfmLoadingAV.getChecked();


		//Gate to vessel:
		if(isGV){
			if(ref.reference === 'refLoadGvQty' && newValue > balQty){
				return false;
			}else if (ref.reference === 'refLoadGvMt' && newValue > balMt){
				return false;
			}else if (ref.reference === 'refLoadGvM3' && newValue > balM3){
				return false;
			}
		}
		
		//Barge to vessel:
		if(isGV){
			if(ref.reference === 'refLoadBvQty' && newValue > balQty){
				return false;
			}else if (ref.reference === 'refLoadBvMt' && newValue > balMt){
				return false;
			}else if (ref.reference === 'refLoadBvM3' && newValue > balM3){
				return false;
			}
		}
		
		//Apron to Vessel:
		if(isAV){
			balQty = detailItem.get('avBalQty');
			balMt = detailItem.get('avBalMt');
			balM3 = detailItem.get('avBalM3');

			if(ref.reference === 'refLoadAvQty' && newValue > balQty){
				return false;
			}else if (ref.reference === 'refLoadAvMt' && newValue > balMt){
				return false;
			}else if (ref.reference === 'refLoadAvM3' && newValue > balM3){
				return false;
			}
		}
		return true;
	},

	validateTruckNo: function() {
		var me = this,
		refs = me.getReferences(),
		store = me.getStore('validationTruckGateInStore'),
		detailItem = me.getViewModel().get('theDetail');
		me.setMaskedForm(true);
		var params = {
			vslCallId: detailItem.get('vslCallId'),	
			lorryNo: detailItem.get('lorryNo'),
			cgNo: detailItem.get('cgNo'),
		};

		store.load({
			params,
			callback: function(records, operation, success) {
				if (success) {
					if (records != null && records.length > 0) {
						var gateTxnNo = records[0].get('gateTxnNo');
						detailItem.set('gateTxnNo', gateTxnNo);
						me.saveCheckHHT();
					}
					else {
						MessageUtil.warning('warning_msg', 'confirm_truck_fail_msg', params["lorryNo"]); 
						me.setMaskedForm(false);
						return;
					}
				}
				me.setMaskedForm(false);
			}
		});
	},

	// Prev Save Check - okSaveButton   prevSaveCheck
	saveCheckHHT : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		//Terminal Hold
		if(Token.getTmnlHoldChk() === 'Y') {
			me.onTerminalHoldValidation();
		} else {
			me.onPassedTerminalHoldValidation();
		}
	},
	
	onTerminalHoldValidation : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		me.setMaskedForm(true);

		var store = me.getStore('validationCheck');
		store.load({
			params : {
				tyCd: 'OPE_TMNLHOLD_VALIDATION',
				col1: detailItem.get('vslCallId'),
				col2: detailItem.get('shipgNoteNo'),
				col3: CodeConstants.TMNL_HOLD_CLD
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(records[0].get('isValidated') == 'N'){
							MessageUtil.warning('warning_msg', 'terminal_hold_msg');
							me.setMaskedForm(false);
							return false;
						}
						else {
							me.onPassedTerminalHoldValidation();
						}
					}
					else {
						me.onPassedTerminalHoldValidation();
					}
					me.setMaskedForm(false);
				}
			}
		});
	},
	
	onPassedTerminalHoldValidation : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var isCustomBlockProcess = 'N'

		me.setLoadingAmt();
		
		if(detailItem.get('fnlLoadYn') === 'Y'){
			MessageUtil.warning('warning_msg', 'confirmloading_loading_final_msg');
			return;
		}
		
		if(detailItem.get('custMode') !== me.CUST_RELEASE) {
			if(isCustomBlockProcess === 'Y'){
				MessageUtil.warning('warning_msg', 'confirmloading_clearance_blockprocess_msg');
			}else{
				MessageUtil.questionModern('Confirm', 'confirmloading_norelease_msg',null,
					function(button){
					   if (button === 'ok'){
						   me.saveWithNoRelease(detailItem);
					   }else{
						   return;
					   }
				});
			}
		} else {
			me.clearanceHHT();
		}
	},
	
	// allAmountValidation
	allAmountValidationHHT:function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		if(!StringUtil.isNullorEmpty(detailItem.get('delvTpCd')) &&
		  (detailItem.get('delvTpCd') !== 'D' || (detailItem.get('delvTpCd') === 'D' && me.booleanDirSpr))){
			return me.amtIndirectValHHT();
		} else {
			return me.amtDirectValHHT();
		}
	},

	// amtInDVal
	amtIndirectValHHT : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');

		if(!me.checkInDirectBalanceAmt())
			return false;
		return true;
	},

	checkInDirectBalanceAmt: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');

		var loadQty = loadMt = balQty = balMt = 0;

		if(refs.refRadioCfmLoadingAV.getChecked()){//Direct Apron to Vessel
			loadQty = Number(detailItem.get('loadAvQty'));
			loadMt = Number(detailItem.get('loadAvMt'));
			loadM3 = Number(detailItem.get('loadAvM3'));

			balQty = Number(detailItem.get('avBalQty'));			
			balMt = Number(detailItem.get('avBalMt'));
			balM3 = Number(detailItem.get('avBalM3'));
		}

		//BBK: Check base on Qty
		if(detailItem.get('cgTpCd') && detailItem.get('cgTpCd') === CodeConstants.MT_CGTP_BBK){
			if(!loadQty || loadQty == 0){
				MessageUtil.warning('warning_msg', 'confirmloading_qty_zero_msg');
				return false;
			}
			if(loadQty > balQty){
				MessageUtil.warning('warning_msg', 'confirmloading_qty_over_msg');
				return false;
			}
			
			//Validate with package items
			if(me.packageItems.length > 0){
				if(loadQty != me.packageItems.length){
					MessageUtil.warning('warning_msg', 'packageItemValidationMsg'); // CT1210060012
					return false;
				}
			}
		}		
		//DBN: Check base on MT
//		if(detailItem.get('cgTpCd') && detailItem.get('cgTpCd') === CodeConstants.MT_CGTP_DBN){
//			if(!loadMt || loadMt == 0){
//				MessageUtil.warning('warning_msg', 'confirmloading_mt_zero_msg');
//				return false;
//			}
//			if(loadMt > balMt || loadM3 > balM3 || loadQty > balQty){
//				MessageUtil.warning('warning_msg', 'confirmloading_over_bal_amt_msg');
//				return false;
//			}
//		}
		return true;
	},
	
	// amtDirectVal
	amtDirectValHHT : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		return me.checkDirectBalanceAmt();
	},

	checkDirectBalanceAmt: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var eachMt = detailItem.get('eachMt');
		var eachM3 = detailItem.get('eachM3');
		
		var loadQty = loadMt = balQty = balMt = 0;
		
		if(refs.refRadioCfmLoadingGV.getChecked()){//Direct Gate to vesel
			loadQty = Number(detailItem.get('loadGvQty'));
			loadMt = Number(detailItem.get('loadGvMt'));
			loadM3 = Number(detailItem.get('loadGvM3'));

			balQty = Number(detailItem.get('balQty'));
			balMt = Number(detailItem.get('balMt'));
			balM3 = Number(detailItem.get('balM3'));			
		}else if(refs.refRadioCfmLoadingAV.getChecked()){//Direct Barge to Vessel
			loadQty = Number(detailItem.get('loadBvQty'));
			loadMt = Number(detailItem.get('loadBvMt'));
			loadM3 = Number(detailItem.get('loadBvM3'));

			balQty = Number(detailItem.get('balQty'));
			balMt = Number(detailItem.get('balMt'));
			balM3 = Number(detailItem.get('balM3'));	
		}


		//BBK: Check base on Qty
		if(detailItem.get('cgTpCd') && detailItem.get('cgTpCd') === CodeConstants.MT_CGTP_BBK){
			if(!loadQty || loadQty == 0){
				MessageUtil.warning('warning_msg', 'Quantity should be greater than zero');
				return false;
			}
			if(loadQty > balQty){
				MessageUtil.warning('warning_msg', 'Quantity can’t exceed the quantity in Balance Amount');
				return false;
			}
			
			//Validate with package items
			if(me.packageItems.length > 0){
				if(loadQty != me.packageItems.length){
					MessageUtil.warning('warning_msg', 'packageItemValidationMsg'); // CT1210060012
					return false;
				}
			}
		}		
		//DBN: Check base on MT
//		if(detailItem.get('cgTpCd') && detailItem.get('cgTpCd') === CodeConstants.MT_CGTP_DBN){
//			if(!loadMt || loadMt == 0){
//				MessageUtil.warning('warning_msg', 'MT should be greater than zero');
//				return false;
//			}
//			if(loadMt > balMt || loadM3 > balM3 || loadQty > balQty){
//				MessageUtil.warning('warning_msg', 'MT and M3 can’t exceed the Balance Amount');
//				return false;
//			}
//		}
		return true;
	},
	
	// endTimeCheck
	endTimeCheckHHT : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		if(detailItem.get('gatePassYn') === 'Y'){
			if(detailItem.get('endDt') == null){
				MessageUtil.warning('warning_msg', 'confirmloading_input_endtime_msg');
				return false;
			}
			
			if(StringUtil.isNullorEmpty(detailItem.get('lorryNo')) && detailItem.get('tsptTpCd') === 'LR'){
				MessageUtil.warning('warning_msg', 'confirmloading_input_lorryid_msg');
				return false;
			}
		}
		
		return true;
	},

	

	/**
	 * =========================================================================================================================
	 * VALIDATION METHOD END
	 */
	
	setMaskedForm (value){
		var me = this;
		var ctl = me.lookupReference(me.FORM_REF);
		if(ctl){
			me.setMaskedHHT(me, ctl.reference, value);
		}
	},
});