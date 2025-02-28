Ext.define('MOST.view.operation.hht.DamageofCargoController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.damagaofcargoctl',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	
	DAMAGE_STORE_NAME: 'theDamageStore', 
	FILE_UPLOAD_STORE_NAME :'uploadedFileDamageStore',
	DEFAULT_MODEL : 'MOST.model.operation.DamageCheck',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	/**
	 * HHT METHOD START
	 * =========================================================================================================================
	 */		
	onHHTLoad: function(){
		var me = this;
		var refs = me.getReferences();	
		var window = me.getView().up('window');
		window.setTitle('Damage Check');
		window.setX(window.getX()/2);
		window.setY(0);
//		var parentView = me.getParentView();
//		var damageStore  = parentView.viewModel.get('roroDamageCheckDetail');
		var recvData = me.getView().recvData;
		var roroDamageCheckDetail = me.getStore('roroDamageCheckDetail');
		roroDamageCheckDetail.removeAll();
		var damageStore = me.getStore('damageStore');
		damageStore.removeAll();
		
		me.getViewModel().setData({theDamageHHT:recvData});
		me.getComboBoxRORODamageCheck();
		refs.refChkDatefield.setValue(Ext.Date.format(new Date(),'d/m/Y H:i'));
		
		
		var damageInfo = me.getViewModel().get('theDamageHHT');
		if(recvData.get('blNo') == null || recvData.get('blNo') == ''){
			if(recvData.get('snNo') == null || recvData.get('snNo') == ''){
				damageInfo.set('blsnNo', recvData.get('shipgNoteNo'));
			}else{
				damageInfo.set('blsnNo', recvData.get('snNo'));
			}
			damageInfo.set('cgNo', recvData.get('grNo'));
			damageInfo.set('scgNo', recvData.get('grNo'));
			damageInfo.set('ixCd', 'X');
		}else{
			damageInfo.set('blsnNo', recvData.get('blNo'));
			damageInfo.set('cgNo', recvData.get('doNo'));
			damageInfo.set('scgNo', recvData.get('doNo'));
			damageInfo.set('ixCd', 'I');
		}

		refs.refFindGRBLTextField.setValue(damageInfo.get('blsnNo'));
		
		if(damageInfo.get('jobNo') != null && damageInfo.get('jobNo') != ''){
			var params = {
				jobNo : damageInfo.get('jobNo'),
				pgmId : 'CF106',
				catgCd: damageInfo.get('jobNo')
			}
			damageStore.load({
				params : params,
				callback: function (records, operation, success) {
					if (success) {
						if(records.length > 0){
							me.loadSavedStore(records[0].data);
							me.loadBasicData(records[0].data);
						}
					}
				}
			});
		}
		
	},
	
	loadBasicData: function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var chkDt = refs.refChkDatefield.getValue();
		var damageInfo = me.getViewModel().get('theDamageHHT');
		damageInfo.set('dmgMt', masterItem.dmgMt);
		damageInfo.set('dmgQty', masterItem.dmgQty);
		damageInfo.set('dmgM3', masterItem.dmgM3);
		damageInfo.set('dmgRemark', masterItem.dmgRemark);
		damageInfo.set('checkTime', masterItem.checkTime);
		damageInfo.set('callSeq', masterItem.items[0].callSeq);
		damageInfo.set('callYear', masterItem.items[0].callYear);
		damageInfo.set('vslCallId', masterItem.items[0].vslCallId);
		damageInfo.set('vslCd', masterItem.items[0].vslCd);
	},
	
	loadSavedStore: function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var damageStore = me.getStore('roroDamageCheckDetail');
		damageStore.setData(masterItem.items);
		damageStore.commitChanges();
	},
	
	getComboBoxRORODamageCheck: function () {
		var me = this;
		var theDamageLevelsStore = me.getStore('theDamageLevels');
		var theDamagePartsStore = me.getStore('theDamageParts');
		theDamageLevelsStore.load({
			callback: function (records, operation, success) {
				if (success) {
					theDamageLevelsStore.insert(0, [{ invNm: 'Select', invCd: '' }]);
				}
			}
		});

		theDamagePartsStore.load({
			callback: function (records, operation, success) {
				if (success) {
					theDamagePartsStore.insert(0, [{ invNm: 'Select', invCd: '' }]);
				}
			}
		});
	},

	
	onConfirmDamageDetail: function(){
		var me = this;
		var refs = me.getReferences();
		var damageInfo = me.getViewModel().get('theDamageHHT');
		
		var parentView = me.getParentView();
		var damageStore  = parentView.viewModel.get('damageCheckStore');
		damageStore.removeAll();
		
		var currentDamageStore = me.getStore('roroDamageCheckDetail'); 
		
		var damageList = new Array();
		
		if(currentDamageStore.data.length < 1){
			return
		}else{
			for(var i = 0; i < currentDamageStore.data.length; i++){
				var damageItem = currentDamageStore.data.items[i];
				var recordDamage = Ext.create(me.DEFAULT_MODEL);
				recordDamage.set('vslCallId', damageInfo.get('vslCallId'));
				recordDamage.set('vslCd', damageInfo.get('vslCd'));
				recordDamage.set('callYear', damageInfo.get('callYear'));
				recordDamage.set('callSeq', damageInfo.get('callSeq'));
				recordDamage.set('cgNo', damageInfo.get('cgNo'));
				recordDamage.set('ixCd', damageItem.get('ixCd'));
				recordDamage.set('catgCd', damageInfo.get('catgCd'));
				recordDamage.set('checkTime', refs.refChkDatefield.getValue());
				recordDamage.set('dmgLevel', damageItem.get('dmgLevel'));
				recordDamage.set('dmgPart', damageItem.get('dmgPart'));
				recordDamage.set('dmgRemark', damageItem.get('dmgRemark'));
				recordDamage.set('dmgMt', refs.refDmt.getValue());
				recordDamage.set('dmgQty', refs.refDqty.getValue());
				recordDamage.set('dmgM3', refs.refDm3.getValue());
				recordDamage.set('jobNo', damageInfo.get('jobNo'));
				recordDamage.set('userId', MOST.config.Token.getUserId());
				recordDamage.set('workingStatus', WorkingStatus.INSERT);
				damageList.push(recordDamage.data);
			}
		}
		
		//Got missing data when insert into parent store directly
		//Change to items 
		if(damageList.length > 0) {
			var damageCover = Ext.create(me.DEFAULT_MODEL);
			damageCover.set('userId', MOST.config.Token.getUserId());
			damageCover.set('items', damageList);
			damageCover.set('workingStatus', WorkingStatus.INSERT);
			
		}
		
		damageStore.insert(0, damageCover);
		
		var win = me.getView().up('window');
		if (win) {
			win.close();
		}
	},
	
	onCancelDamageHHT: function(btn){
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
	
	onAddDamageDetail: function () {
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var detailGrid = me.lookupReference('refDamageHHTGrid');
		var store = me.getStore('roroDamageCheckDetail');
		var record = Ext.create('MOST.model.operation.TheListOfDamageCheckOfRORO');

		var dmgPart = refs.refTxtDamagePartDamageCheck.getValue();
		var dmgLevel = refs.refTxttDamageLevelDamageCheck.getValue();
		
		store.clearFilter();
		
		if (refs.refTxtDamagePartDamageCheck.getValue() == null || refs.refTxttDamageLevelDamageCheck.getValue() == null ) {
			MessageUtil.warning('theListOfDamageCheckOfRORO', 'missedValue');
			return;
		}
		
		var idx = 0;

		if (detailGrid.getSelection() && detailGrid.getSelection().length > 0) {
			idx = store.indexOfId(detailGrid.getSelection()[0].get('id'));
		}
		
		record.set('dmgPartNm', refs.refTxtDamagePartDamageCheck.getValueCollection().items[0].data.invNm);
		record.set('dmgLevelNm', refs.refTxttDamageLevelDamageCheck.getValueCollection().items[0].data.invNm);
		record.set('dmgPart', dmgPart);
		record.set('dmgLevel', dmgLevel);
		record.set('dmgRemark', refs.refRemarkTextField.getValue());
		
		var validate = true;
		store.getData().getRange().forEach(function (record, index, array) {
			if (dmgPart == record.data.dmgPart && dmgLevel == record.data.dmgLevel) {
				validate = false;
			}
		});
		if (validate) {
			store.insert(idx, record);
			//detailGrid.getSelectionModel().select(record);
			//store.commitChanges();
			me.onClearDmg_clickHandler();
		} else {
			MessageUtil.warning('roroDamageCheck', 'duplicatedata_msg');
		}
	},
	
	onUpdateDamageDetail: function(btn){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('roroDamageCheckDetail');
		var grid = me.lookupReference('refDamageHHTGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		if(selection == null) return;
		
		//var record = Ext.create(me.DEFAULT_MODEL);
		//store.clearFilter();
		
		if (refs.refTxtDamagePartDamageCheck.getValue() == null || refs.refTxttDamageLevelDamageCheck.getValue() == null) {
			MessageUtil.warning('damageCheck', 'missedValue');
			return;
		}
		
		//var idx = 0;
		
		//if (store.data.length > 0) {
		//	idx = store.data.length - 1;
		//}
		
		if (grid.getSelection() && grid.getSelection().length > 0) {
			idx = store.indexOfId(grid.getSelection()[0].get('id'));
		}
		
		var dmgPart = refs.refTxtDamagePartDamageCheck.getValue();
		var dmgLevel = refs.refTxttDamageLevelDamageCheck.getValue();
		
		var validate = true;
		store.getData().getRange().forEach(function (record, index, array) {
			if (dmgPart == record.data.dmgPart && dmgLevel == record.data.dmgLevel) {
				validate = false;
			}
		});
		
		if (validate) {
			selection.set('dmgPartNm', refs.refTxtDamagePartDamageCheck.getValueCollection().items[0].data.invNm);
			selection.set('dmgLevelNm', refs.refTxttDamageLevelDamageCheck.getValueCollection().items[0].data.invNm);
			selection.set('dmgPart', dmgPart);
			selection.set('dmgLevel', dmgLevel);
			selection.set('dmgRemark', refs.refRemarkTextField.getValue());
			
			//store.insert(idx, record);
			//grid.getSelectionModel().select(record);
			//me.onClearDmg_clickHandler();
		} else {
			MessageUtil.warning('damageCheck', 'duplicatedata_msg');
		}
		
	},
	
	
	onDeleteDamage: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refDamageHHTGrid');
		var store = me.getStore('roroDamageCheckDetail');
		
		var grid = me.lookupReference('refDamageHHTGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		if(selection == null) return;
		
		MessageUtil.question('remove', 'infodelete_msg', null, function (button) {
			if (button === 'ok') {
				store.remove(selection);
			}
		});
	},
	
	onClearDamage: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refDamageHHTGrid');
		var store = me.getStore('roroDamageCheckDetail');
		
		
		refs.refDmt.setValue();
		refs.refDqty.setValue();
		refs.refDm3.setValue();
		refs.refTxtDamagePartDamageCheck.setValue();
		refs.refTxttDamageLevelDamageCheck.setValue();
		refs.refRemarkTextField.setValue();
		
	},
	
	onClearDmg_clickHandler: function () {
		var me = this;
		var refs = me.getReferences();

		refs.refTxtDamagePartDamageCheck.setValue();
		refs.refTxttDamageLevelDamageCheck.setValue();
		refs.refRemarkTextField.setValue();
	},
	
 	onSearchGLBL:function(){;
		var me = this;
		var refs = me.getReferences();
		var jpvcNo = refs.refJpvcText.getValue();
		var params = {
			title: 'GL/BL Code',
			vslCallId : jpvcNo
		};		
		ViewUtil.openCodePopup(this, 'app-glblpopuphht', 'refFindGRBLTextField', params);
 	},
 	
 	onHHTOneClick : function(){
	 	var me = this;
	 	var refs = me.getReferences();
		var grid = me.lookupReference('refDamageHHTGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		if(selection == null) return;
		
		refs.refTxtDamagePartDamageCheck.setValue(selection.data.dmgPart);
		refs.refTxttDamageLevelDamageCheck.setValue(selection.data.dmgLevel);
		refs.refRemarkTextField.setValue(selection.data.dmgRemark);
 	},
 	
 	setHHTPopupRemarkUpdate : function(){
 		var me = this;
	 	var refs = me.getReferences();
	 	var grid = me.lookupReference('refGatePassPrintingHHTGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		selection.set({
			rmk : refs.refRemarkTextField.getValue()
		});
		
	 	grid.getStore().sync({
	 		success: function(){
            	 grid.getStore().reload();
	 		}
	 	});
 	},
 	
 	onCloseWin :function(){
 		var me = this; 
		var window = me.getView().up('window');
		window.returnValue = "success"
		window.close();
 	},
 	
	onCheckJpvcRadioField: function(radioField, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();

		if(radioField.getValue()=='JPVC'){
			refs.refJpvcText.setDisabled(true);
		}else{
			refs.refJpvcText.setDisabled(false);
			refs.refJpvcText.setValue(null);
		}			
 	},
	
	/**
	 * HHT METHOD END
	 * =========================================================================================================================
	 */		
	
});

