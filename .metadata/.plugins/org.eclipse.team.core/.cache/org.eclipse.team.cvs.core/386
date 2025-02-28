Ext.define('MOST.view.operation.DamageCheckController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.damagecheck',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	DAMAGE_STORE_REF_NAME: 'refDamamageStore',  
	DAMAGE_STORE_NAME: 'theDamageStore',           
	FILE_UPLOAD_STORE_NAME :'uploadedFileDamageStore',
	FILE_UPLOAD_REF_NAME : 'refFileUpload',
	DEFAULT_MODEL : 'MOST.model.operation.DamageCheck',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 * 
	 * 
	 * /**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;	
		var parentView = me.getParentView();
		
		var me = this;
		var theDamageLevelsStore = me.getStore('theDamageLevels');
		var theDamagePartsStore = me.getStore('theDamageParts');
		
		theDamageLevelsStore.load();
		theDamagePartsStore.load();	
		
		if(recvData != undefined){
			
			var damageStore  = parentView.viewModel.get('damageStore');
			damageStore.removeAll();
			me.getViewModel().setData({
				theDmg : recvData
			});
			var damageInfo = me.getViewModel().get('theDmg');
			
			refs.ctlSearchBlNo.setValue(damageInfo.get('cargoNo'));
			refs.ctlSearchGRNo.setValue(damageInfo.get('scgNo'));
			refs.ctlSearchBlNo.setDisabled(true);
			refs.ctlSearchGRNo.setDisabled(true);
			var returnValue = {
					code: damageInfo.get('vslCallId')
			}
			me.getSnBlCombo(returnValue);
			me.getDoGrCombo();
			
			if(parentView.reference != null || me.getParentView().xtype !== 'app-thelistofdamagecheckofgc'){
				refs.btnConfirm.setDisabled(false);
				if(recvData.get('blSn') != null && recvData.get('blSn') != ''){
					damageInfo.set('blSnNo', recvData.get('blSn'));
					damageInfo.set('cgNo', recvData.get('blSn'));
					damageInfo.set('doGrCd', recvData.get('cgNo'));
					if(recvData.get('grNo') != null && recvData.get('grNo') != ''){
						damageInfo.set('ixCd', 'X');
					}else{
						damageInfo.set('ixCd', 'I');
					}
					damageInfo.set('mfDocId', recvData.get('mfDocId'));
				}
				else if(recvData.get('blNo') == null || recvData.get('blNo') == ''){
					if(recvData.get('shipgNoteNo') != '' || recvData.get('snNo') == null || recvData.get('snNo') == ''){
						damageInfo.set('blSnNo', recvData.get('shipgNoteNo'));
					}else{
						damageInfo.set('blSnNo', recvData.get('snNo'));
					}
					damageInfo.set('cgNo', recvData.get('shipgNoteNo'));
					damageInfo.set('doGrCd', recvData.get('grNo'));
					damageInfo.set('ixCd', 'X');
					damageInfo.set('mfDocId', recvData.get('mfDocId'));
				}else{
					damageInfo.set('blSnNo', recvData.get('blNo'));
					damageInfo.set('cgNo', recvData.get('blNo'));
					damageInfo.set('doGrCd', recvData.get('sdoNo'));
					damageInfo.set('ixCd', 'I');
					damageInfo.set('mfDocId', recvData.get('mfDocId'));
				}
				
				if(damageInfo.get('jobNo') != null && damageInfo.get('jobNo') != ''){
					var params = {
							jobNo : damageInfo.get('jobNo'),
							pgmId : FileConstant.DAMAGECHECK_SCREEN_PGM_ID,
							catgCd: damageInfo.get('jobNo')
					}
					damageStore.load({
						params : params,
						callback: function (records, operation, success) {
							if (success) {
								if(records.length > 0){
									me.loadSavedStore(records[0].data);
									me.loadBasicData(records[0].data);
								}else{
									var currentDay = new Date();
									var today = Ext.Date.format(currentDay, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
									refs.ctlCheckTime.setValue(today);
								}
							}
						}
					});
				}else{
					var currentDay = new Date();
					var today = Ext.Date.format(currentDay, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
					refs.ctlCheckTime.setValue(today);
				}
			} else {
				refs.btnConfirm.setDisabled(true);
				if(damageInfo.get('jobNo') != null && damageInfo.get('jobNo') != ''){
					var params = {
							jobNo : damageInfo.get('jobNo'),
							pgmId : FileConstant.DAMAGECHECK_SCREEN_PGM_ID,
							catgCd: damageInfo.get('jobNo')
					}
					damageStore.load({
						params : params,
						callback: function (records, operation, success) {
							if (success) {
								if(records.length > 0){
									me.loadSavedStore(records[0].data);
									me.loadBasicData(records[0].data);
								}else{
									var currentDay = new Date();
									var today = Ext.Date.format(currentDay, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
									refs.ctlCheckTime.setValue(today);
								}
							}
						}
					});
				}
			}	
		}else{
			var currentDay = new Date();
			var today = Ext.Date.format(currentDay, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			if(parentView.viewModel.get('theDmg') == null){
				refs.ctlCheckTime.setValue(today);
			}
			
			var returnValue = {
					code: parentView.viewModel.get('theDmg').vslCallId
			}
			me.getSnBlCombo(returnValue);
			me.getDoGrCombo();
			
			refs.btnConfirm.setDisabled(false);
		}	
	},
	
	loadBasicData: function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var damageInfo = me.getViewModel().get('theDmg');
		damageInfo.set('dmgMt', masterItem.dmgMt);
		damageInfo.set('dmgQty', masterItem.dmgQty);
		damageInfo.set('dmgM3', masterItem.dmgM3);
		damageInfo.set('dmgRemark', masterItem.dmgRemark);
		damageInfo.set('checkTime', masterItem.checkTime);
		damageInfo.set('callSeq', masterItem.items[0].callSeq);
		damageInfo.set('callYear', masterItem.items[0].callYear);
		damageInfo.set('vslCallId', masterItem.items[0].vslCallId);
		
		if(masterItem.items[0].vslCd != null && masterItem.items[0].vslCd != ''){
			damageInfo.set('vslCd', masterItem.items[0].vslCd);
		}else{
			damageInfo.set('vslCd', masterItem.items[0].vslCode);
		}
	},
	
	loadSavedStore: function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var damageStore = me.getStore(me.DAMAGE_STORE_NAME);
		damageStore.removeAll();
		var uploadStore = me.getStore(me.FILE_UPLOAD_STORE_NAME);
		uploadStore.removeAll();
		damageStore.setData(masterItem.items);
		damageStore.commitChanges();
		uploadStore.setData(masterItem.uploadItems);
		uploadStore.commitChanges();
	},
	

	
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	
	onAddFile_clickHandler : function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.FILE_UPLOAD_STORE_NAME);
    	var input = document.querySelector("input[id='fileUpload-button-fileInputEl']");
    	var damageInfo = me.getViewModel().get('theDmg');
    	var frm = refs.fileForm;
    	var formData = new FormData(frm);

    	for(var i=0; i<input.files.length; i++){
    		var record = Ext.create('MOST.model.common.FileUpload');
    		var file = input.files[i];
    		record.set('pgmId', FileConstant.DAMAGECHECK_SCREEN_PGM_ID);
    		record.set('fileStream', file);
    		record.set('fileName', file.name);
    		record.set('fileSize', file.size);
    		record.set('workingStatus', WorkingStatus.INSERT);
    		store.insert(0, record);
    	}
	},
	
	//GET ufileName
	fileUpload : function(formData){
		var me = this;
		var store = me.getStore(me.FILE_UPLOAD_STORE_NAME);
    	var xhr = new XMLHttpRequest();
    	
    	xhr.addEventListener('loadend', function(){
    		if(xhr.status === 200){
    			var rtnData = JSON.parse(xhr.responseText); // get filename - uuid
    			
    			store.getModifiedRecords().forEach(function(record, index, array){
    	    		record.set('ufileName', rtnData[record.get('fileName')]);
    	    	});
  
    		}else{
    			MessageUtil.warning('warning_msg', 'fail_msg');
    		}
    		
    		Ext.MessageBox.hide();
    	});
    	
    	xhr.open('POST',MOST.config.Locale.getRestApiDestUrl() + '/file/manage/fileupload');
    	xhr.setRequestHeader('Authorization', MOST.config.Token.getTokenType() + ' ' + MOST.config.Token.getAccessToken());
    	xhr.send(formData);
    	
    	var msgBox = Ext.MessageBox.show({
			msg: 'Uploading your data...',
			progressText: 'Progressing...',
			width:300,
			wait:true,
			waitConfig: {interval:200}
		});
	},
	
	onRemoveFile_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.FILE_UPLOAD_STORE_NAME);
		var grid = me.lookupReference(me.FILE_UPLOAD_REF_NAME);
		
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection == null) return;
		
		Ext.each(selection, function (record) {
			store.remove(record);
		});
	},
	
	onAddDmg_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.DAMAGE_STORE_NAME);
		var grid = me.lookupReference(me.DAMAGE_STORE_REF_NAME);
		var record = Ext.create(me.DEFAULT_MODEL);
		var dmgPart = refs.ctlTheDamagePart.getValue();
		var dmgLevel = refs.ctlTheDamageLevel.getValue();
		//Clear filter for Grid
		grid.filters.clearFilters();
		grid.filters.disable();

		//Clear filter for Store
		store.clearFilter();
		if (refs.ctlTheDamagePart.getValue() == null || refs.ctlTheDamageLevel.getValue() == null) {
			MessageUtil.warning('warning_msg', 'missedValue');
		} else {
			var idx = 0;

			if (store.data.length > 0) {
				idx = store.data.length;
			}
			var idx = 0;

			if (grid.getSelection() && grid.getSelection().length > 0) {
				idx = store.indexOfId(grid.getSelection()[0].get('id'));
			}
			record.set('dmgPartNm', refs.ctlTheDamagePart.displayTplData[0].scdNm);
			record.set('dmgLevelNm', refs.ctlTheDamageLevel.displayTplData[0].scdNm);
			record.set('dmgPart', dmgPart);
			record.set('dmgLevel', dmgLevel);

			var validate = true;
			store.getData().getRange().forEach(function (record, index, array) {
				if (dmgPart == record.data.dmgPart && dmgLevel == record.data.dmgLevel) {
					validate = false;
				}
			});
			if (validate) {
				store.insert(idx, record);
				grid.getSelectionModel().select(record);
			} else {
				MessageUtil.warning('damageCheck', 'duplicatedata_msg');
			}
		}
	},
	
	onUpdateDmg_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.DAMAGE_STORE_NAME);
		var grid = me.lookupReference(me.DAMAGE_STORE_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var dmgPart = refs.ctlTheDamagePart.getValue();
		var dmgLevel = refs.ctlTheDamageLevel.getValue();
		
		if(selection == null){
			MessageUtil.warning('warning_msg', 'vslchecklist_select_update');
			return;
		}else{
			if(dmgPart == null || dmgLevel == null){
				MessageUtil.warning('warning_msg', 'missedValue');
				return;
			}
		}
		
		var validate = true;
		store.getData().getRange().forEach(function (record, index, array) {
			if (dmgPart == record.data.dmgPart && dmgLevel == record.data.dmgLevel) {
				validate = false;
			}
		});
		if (validate) {
			selection.set('dmgPartNm', refs.ctlTheDamagePart.displayTplData[0].invDesc);
			selection.set('dmgLevelNm', refs.ctlTheDamageLevel.displayTplData[0].invDesc);
			selection.set('dmgPart', dmgPart);
			selection.set('dmgLevel', dmgLevel);
		} else {
			MessageUtil.warning('warning_msg', 'duplicatedata_msg');
		}
	},
	
	onRemoveDmg_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.DAMAGE_STORE_REF_NAME);
		var store = me.getStore(me.DAMAGE_STORE_NAME);
		
		MessageUtil.question('remove', 'infodelete_msg', null, function (button) {
			if (button === 'ok') {
				var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
				store.remove(selection);
			}
		});
	},
	
	onClearDmg_clickHandler: function () {
		var me = this;
		var refs = me.getReferences();

		refs.ctlTheDamagePart.setValue();
		refs.ctlTheDamageLevel.setValue();

	},
	
	onConfirm_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var damageInfo = me.getViewModel().get('theDmg');
		
		var parentView = me.getParentView();
		//var damageStore  = parentView.viewModel.get('damageCheckStore');
		var damageStore  = parentView.viewModel.get('damageStore');
		var currentDamageStore = me.getStore(me.DAMAGE_STORE_NAME); 
		var currentUploadStore = me.getStore(me.FILE_UPLOAD_STORE_NAME);
		var damageStoreCheck  = me.getStore('theDamageStore');
		
		var damageList = new Array();
		var uploadList = new Array();
		
		var recordDamage = Ext.create(me.DEFAULT_MODEL);
		var store = me.getStore('snBlCombo');
		var blSnItem = refs.ctlSearchBlNo.getSelection();
		
		if(parentView.reference != null || me.getParentView().xtype == 'app-gateoperations' 
			|| me.getParentView().xtype == 'popup-confirmrehandleloadingpopup'
				|| me.getParentView().xtype == 'popup-confirmrehandlehandlingoutpopup'){
			
			if(damageStore != null){
				damageStore.removeAll();
			}
			
			if(currentDamageStore.data.length < 1){
				MessageUtil.warning('warning_msg', 'no_damage_to_confirm');
				return
			}else{
				for(var i = 0; i < currentDamageStore.data.length; i++){
					var damageItem = currentDamageStore.data.items[i];
					var recordDamage = Ext.create(me.DEFAULT_MODEL);
					recordDamage.set('vslCallId', damageInfo.get('vslCallId'));
					recordDamage.set('vslCd', damageInfo.get('vslCd'));
					
					if(damageInfo.get('vslCd') != null && damageInfo.get('vslCd') != ''){
						recordDamage.set('vslCd', damageInfo.get('vslCd'));
					}else{
						recordDamage.set('vslCd', damageInfo.get('vslCode'));
					}
					
					recordDamage.set('callYear', damageInfo.get('callYear'));
					recordDamage.set('callSeq', damageInfo.get('callSeq'));
					recordDamage.set('cgNo', damageInfo.get('cgNo'));
					recordDamage.set('mfDocId', damageInfo.get('mfDocId'));
					recordDamage.set('sdoNo', damageInfo.get('ixCd') == 'I' ? damageInfo.get('doGrCd') : '');
					recordDamage.set('grNo', damageInfo.get('ixCd') == 'X' ? damageInfo.get('doGrCd') : '');
					recordDamage.set('ixCd', damageInfo.get('ixCd'));
					recordDamage.set('catgCd', damageInfo.get('catgCd'));
					recordDamage.set('checkTime', refs.ctlCheckTime.getValue());
					recordDamage.set('dmgLevel', damageItem.get('dmgLevel'));
					recordDamage.set('dmgPart', damageItem.get('dmgPart'));
					recordDamage.set('dmgMt', refs.ctlDmgAmtMT.getValue());
					recordDamage.set('dmgQty', refs.ctlDmgAmtQty.getValue());
					recordDamage.set('dmgM3', refs.ctlDmgAmtM3.getValue());
					recordDamage.set('jobNo', damageInfo.get('jobNo'));
					recordDamage.set('dmgRemark', refs.ctlDamageRemark.getValue());
					recordDamage.set('userId', MOST.config.Token.getUserId());
					recordDamage.set('workingStatus', WorkingStatus.INSERT);
					damageList.push(recordDamage.data);
				}
			}
			
			if(currentUploadStore.data.length > 0){
				for(var i = 0; i < currentUploadStore.data.length; i++){
					var uploadItem = currentUploadStore.data.items[i];
					var recordUpload = Ext.create('MOST.model.common.FileUpload');
					recordUpload.set('ufileName', uploadItem.get('fileName').substring(0, 10)).concat(Math.floor(Math.random() * 1000));
					recordUpload.set('pgmId', FileConstant.DAMAGECHECK_SCREEN_PGM_ID);
					recordUpload.set('fileName', uploadItem.get('fileName'));
					recordUpload.set('fileSize', uploadItem.get('fileSize'));
					recordUpload.set('fileStream', null);
					recordUpload.set('userId', MOST.config.Token.getUserId());
					recordUpload.set('workingStatus', WorkingStatus.INSERT);
					uploadList.push(recordUpload.data);
				}
				
				// File Upload DELETE RECORD
				currentUploadStore.getRemovedRecords().forEach(function(record, index, array){
					record.set('workingStatus', WorkingStatus.DELETE);
					uploadList.push(record.data);
				});
			}
			
			//Got missing data when insert into parent store directly
			//Change to items 
			var damageCover = Ext.create(me.DEFAULT_MODEL);
			damageCover.set('jobNo', damageInfo.get('jobNo'));
			damageCover.set('userId', MOST.config.Token.getUserId());
			damageCover.set('uploadItems', uploadList);
			damageCover.set('items', damageList);
			damageCover.set('workingStatus', WorkingStatus.INSERT);
			damageStore.insert(0, damageCover);
			var win = me.getView().up('window');
			if (win) {
				win.close();
			}			
		}else{
			for(var i = 0; i < currentDamageStore.data.length; i++){
				var recordDamage = Ext.create(me.DEFAULT_MODEL);
				var damageItem = currentDamageStore.data.items[i];
				recordDamage.set('vslCallId', refs.ctlVslCallId.getValue());
				recordDamage.set('cgNo', refs.ctlSearchBlNo.getValue());
				recordDamage.set('checkTime', refs.ctlCheckTime.getValue());
				recordDamage.set('dmgLevel', damageItem.get('dmgLevel'));
				recordDamage.set('dmgPart', damageItem.get('dmgPart'));
				recordDamage.set('dmgMt', refs.ctlDmgAmtMT.getValue());
				recordDamage.set('dmgQty', refs.ctlDmgAmtQty.getValue());
				recordDamage.set('dmgM3', refs.ctlDmgAmtM3.getValue());
				recordDamage.set('dmgRemark', refs.ctlDamageRemark.getValue());
				recordDamage.set('userId', MOST.config.Token.getUserId());
				recordDamage.set('workingStatus', WorkingStatus.INSERT);
				recordDamage.set('catgCd', blSnItem.get('catgCd'));
				recordDamage.set('ixCd', blSnItem.get('ixCd'));
				recordDamage.set('mfDocId', blSnItem.get('mfDocId'));
				recordDamage.set('sdoNo', blSnItem.get('ixCd') == 'I' ? refs.ctlSearchGRNo.getValue() : '');
				recordDamage.set('grNo', blSnItem.get('ixCd') == 'X' ? refs.ctlSearchGRNo.getValue() : '');
				
				damageList.push(recordDamage.data);
			}					
			
			if(currentUploadStore.data.length > 0){
				for(var i = 0; i < currentUploadStore.data.length; i++){
					var uploadItem = currentUploadStore.data.items[i];
					var recordUpload = Ext.create('MOST.model.common.FileUpload');
					recordUpload.set('ufileName', uploadItem.get('fileName').substring(0, 10)).concat(Math.floor(Math.random() * 1000));
					recordUpload.set('pgmId', FileConstant.DAMAGECHECK_SCREEN_PGM_ID);
					recordUpload.set('fileName', uploadItem.get('fileName'));
					recordUpload.set('fileSize', uploadItem.get('fileSize'));
					recordUpload.set('fileStream', null);
					recordUpload.set('userId', MOST.config.Token.getUserId());
					recordUpload.set('workingStatus', WorkingStatus.INSERT);
					uploadList.push(recordUpload.data);
				}
				
				// File Upload DELETE RECORD
				currentUploadStore.getRemovedRecords().forEach(function(record, index, array){
					record.set('workingStatus', WorkingStatus.DELETE);
					uploadList.push(record.data);
				});
			}
			
			var damageCover = Ext.create(me.DEFAULT_MODEL);
			damageCover.set('userId', MOST.config.Token.getUserId());
			damageCover.set('uploadItems', uploadList);
			damageCover.set('items', damageList);
			damageCover.set('workingStatus', WorkingStatus.INSERT);
			
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			updateParm.getProxy().url = damageStoreCheck.getProxy().url;
			updateParm.set('workingStatus', WorkingStatus.INSERT);
			updateParm.set('items', new Array());
			updateParm.get('items').push(damageCover.data);
			updateParm.save({
				success: function (records) {
					if (records.data.items.length > 0) {
						MessageUtil.saveSuccess();
						var win = me.getView().up('window');
						if (win) {
							win.close();
						}
					}		
				}
			});
		}	
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
						
		if(targetControl == 'ctlVslCallId'){
			if(returnValue != null){
				me.getViewModel().setData({ theUnitInfo: returnValue.item.data });
				me.getSnBlCombo(returnValue);
			}
		}	
	},
	
	getSnBlCombo: function(returnValue){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('snBlCombo');
		var jpvc = returnValue.code;			
		
		store.load({
			params:{
				vslCallId : jpvc					
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						store.insert(0, [{ cdNm: 'Select', cd: '' }]);
					}
				}
			}
		});
	},
	
	getDoGrCombo: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('doGrCombo');
		var jpvc = refs.ctlVslCallId.getValue() ;
		var blsn = refs.ctlSearchBlNo.getValue();
		refs.ctlSearchGRNo.setValue('');
		store.load({
			params:{
				vslCallId : jpvc,
				blNo: blsn
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						store.insert(0, [{ doGrNm: 'Select', doGrCd: '' }]);
					}
				}
			}
		});
	},
	
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	
});