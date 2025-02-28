Ext.define('MOST.view.popup.RORODamageCheckHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.rorodamagecheckhhtctl',

	/**
	 * =========================================================================================================================
	 * VARIABLE, CONSTANT START
	 */
	MAX_PERIOD_DAY: 14,
	MAX_DATE_ALLOW: 14,
	NON_CALL_ID: CommonConstants.NON_CALL_ID,
	cgIndex: 0,
	DEFAULT_MODEL : 'MOST.model.operation.DamageCheck',
	
	/**
	 * VARIABLE, CONSTANT END
	 * =========================================================================================================================
	 */	
	
	
	/**
	 * =========================================================================================================================
	 * HHT TABLET START.
	 * 
	 */
	onPopupHHTLoad : function(){
		var me = this;
     	var refs = me.getReferences();
     	var window = me.getView().up('window');
		window.setTitle('Damage Check');
     	var recvData = me.getView().recvData;
		
     	me.getViewModel().setData({theDamageCheck:recvData});
     	
     	var roroDamageCheckDetail = me.getStore('roroDamageCheckDetail');
     	roroDamageCheckDetail.removeAll();
		var damageStore = me.getStore('damageStore');
		damageStore.removeAll();
		
     	me.getComboBoxRORODamageCheck();

     	if(recvData.data.statCd == 'OD') {
     		if(recvData.data.searchType == 'DSYard') {
     			recvData.set('chkLoc', 'YARD');
     			
     			refs.refRadioVessel.disable();
             	refs.refRadioYard.setChecked(true);
             	refs.refRadioGate.disable();
             	
         		me.getDetailCgList(recvData);
             	me.getInvList(null);
     		}
     	}else if(recvData.data.statCd == 'ST') {
     		
     		recvData.set('chkLoc', 'YARD');
     		
     		me.getDetailCgList(null);
         	me.getInvList(null);
         	
         	refs.refRadioVessel.disable();
         	refs.refRadioYard.setChecked(true);
         	refs.refRadioGate.disable();

     	}else if(recvData.data.statCd == 'RS') {
     		
     		if(recvData.data.searchType == 'DSApronChecker') {
     			
     			recvData.set('chkLoc', 'VSL');
     			
         		me.getDetailCgList(null);
             	me.getInvList(null);
             	
             	refs.refRadioVessel.setChecked(true);
             	refs.refRadioYard.disable();
             	refs.refRadioGate.disable();
             	
     		}else {
     			
     			recvData.set('chkLoc', 'GATE');
         		
         		me.getDetailCgList(recvData);
             	me.getInvList(null);
             	
             	refs.refRadioVessel.disable();
             	refs.refRadioYard.disable();
             	refs.refRadioGate.setChecked(true);
             		
     		}
     		
     	}else if(recvData.data.searchType == 'YardCheckLoading') {
     		
     		if(recvData.get('delvTpCd') == 'I'){
     			recvData.set('chkLoc', 'YARD')
    		}else if(recvData.get('delvTpCd') == 'D'){
    			recvData.set('chkLoc', 'GATE')
    		}
     		
     		me.getDetailCgList(null);
         	me.getInvList(null);
         	
         	refs.refRadioVessel.disable();
         	refs.refRadioGate.disable();
         	refs.refRadioYard.setChecked(true);

     	}else if(recvData.data.statCd == 'OL') {
     		
     		if(recvData.data.searchType == 'ApronCheckLoading') {
     			if(recvData.get('delvTpCd') == 'I'){
     				recvData.set('chkLoc', 'VSL');
     				refs.refRadioVessel.setChecked(true);
     				
         			//recvData.set('chkLoc', 'YARD');
     				//refs.refRadioVessel.disable();
         			//refs.refRadioYard.setChecked(true);
                 	//refs.refRadioGate.disable();

        		}else if(recvData.get('delvTpCd') == 'D'){
        			recvData.set('chkLoc', 'VSL');
        			refs.refRadioVessel.setChecked(true);
                 	refs.refRadioYard.disable();
                 	refs.refRadioGate.disable();
        		}
     		}else {
     			if(recvData.get('delvTpCd') == 'I'){
         			recvData.set('chkLoc', 'YARD');
         			refs.refRadioVessel.disable();
         			refs.refRadioYard.setChecked(true);
                 	refs.refRadioGate.disable();

        		}else if(recvData.get('delvTpCd') == 'D'){
        			recvData.set('chkLoc', 'GATE');
        			refs.refRadioVessel.disable();
                 	refs.refRadioYard.disable();
                 	refs.refRadioGate.setChecked(true);
        		}
     		}
     		
     		me.getDetailCgList(recvData);
         	me.getInvList(null);
         	
     	} else {
     		
     		me.getDetailCgList(recvData);
         	me.getInvList();
         	refs.refRadioGate.disable();
         	
     	}
     	
	},
	
	getDetailCgList: function (items) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('roroDamageCheckDetail');
		store.removeAll();
		if(items == null) return;
		var params = {
			vslCallId: items.get('vslCallId'),
			cgNo: items.get('cgNo'),
			unitNo: items.get('unitNo'),
			chkLoc : items.get('chkLoc'),	// 'VSL' 'GATE' 'YARD'
			pgmId : 'CF106',
		};
		store.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						me.loadSavedStore(records[0].data);
					}
				}
			}
		});
	},
	
	getInvList: function (params) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('roroDamageCheckInventory');
		var grid = me.lookupReference('refRORODamageCheckInventoryHHTGrid');
		var arrSelectedRecord = new Array();
		var unitNo = refs.refTxtUnitNoDamageCheck.getValue();
		var unitItem = me.getView().recvData;
		var cgNo;
		var vslCallId = unitItem.data.vslCallId;
		
		if(unitItem.data.catgCd == 'E'){
			cgNo = unitItem.data.snNo;
		}else if(unitItem.data.catgCd == 'I'){
			cgNo = unitItem.data.blNo;
		}
		
		var params = {
			vslCallId: vslCallId,
			cgNo: cgNo,
			unitNo: unitNo,
		};
		
		store.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
				}
			}
		});
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
	
	onSelectGridDamageCheckDetailHHT: function(){
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference('refRORODamageCheckGridHHT');
		var unitItem = grid.getSelection() == null ? null : grid.getSelection();
		if(unitItem == null) return;
		
		refs.refTxtDamagePartDamageCheck.setValue(unitItem.data.dmgPart);
		refs.refTxttDamageLevelDamageCheck.setValue(unitItem.data.dmgLevel);
		refs.refTxtRemarkDamageCheck.setValue(unitItem.data.remark);
		
		if(unitItem.data.locCd == 'VSL'){
			refs.refRadioVessel.setChecked(true)
		}else if(unitItem.data.locCd == 'YARD'){
			refs.refRadioYard.setChecked(true)
		}else if(unitItem.data.locCd == 'GATE'){
			refs.refRadioGate.setChecked(true);
		}
		
//		refs.refBtnDamageCheckListUpdate.setDisabled(false);
//		refs.refBtnDamageCheckListDelete.setDisabled(false);
	},
	
	onSelectDamageCheckHHTGrid: function(){
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference('refMainGrdDamageCheckHHT');
		var unitItem = grid.getSelection();
		
		me.getViewModel().setData({theDamageCheck:unitItem});
		
		me.getDetailCgList(unitItem);
		
	},
	
	onDetailSave: function () {
		var me = this;
		var refs = me.getReferences();
		var cgREInfo = me.getView().recvData;
		var damageInfo = me.getViewModel().get('theDamageCheck');
		var currentDamageStore = me.getStore('roroDamageCheckDetail'); 
		
		var parentView = me.getParentView();
		var damageStore  = parentView.viewModel.get('damageStore');
		damageStore.removeAll();
		
		var arrDamage = new Array();
		
		if(currentDamageStore.data.length < 1) {
			return;
		}else {
			currentDamageStore.getData().getRange().forEach(function (record, index, array) {
				if (record.get('workingStatus') != WorkingStatus.DELETE) {
					record.set('vslCallId', cgREInfo.get('vslCallId'));
					record.set('vslCd', cgREInfo.get('vslCd'));
					record.set('callSeq', cgREInfo.get('callSeq'));
					record.set('callYear', cgREInfo.get('callYear'));
					record.set('cgNo', refs.refTxtSubBlSnDamageCheck.getValue());
					record.set('unitNo', refs.refTxtUnitNoDamageCheck.getValue());
					record.set('brandCd', refs.refTxtBrandDamageCheck.getValue());
					record.set('modelCd', refs.refTxtModelDamageCheck.getValue());
					record.set('ixCd', 'I');
					record.set('catgCd', 'I');
					record.set('dmgChkCd', 'DMG');
					record.set('locCd', record.data.locCd);
					record.set('dmgPart', record.data.dmgPart);
					record.set('dmgLevel', record.data.dmgLevel);
					record.set('remark',  record.data.remark);
					record.set('workingStatus', WorkingStatus.INSERT);
					record.set('userId', MOST.config.Token.getUserId());
				}
				arrDamage.push(record.data);
			});
		}
		
		//Got missing data when insert into parent store directly
		//Change to items 
		if (arrDamage.length > 0) {
			var damageCover = Ext.create('MOST.model.operation.TheListOfDamageCheckOfRORO');
			damageCover.set('userId', MOST.config.Token.getUserId());
			damageCover.set('items', arrDamage);
			damageCover.set('workingStatus', WorkingStatus.INSERT);
		}
		
		damageStore.insert(0, damageCover);
		//damageStore.commitChanges();
		
		var win = me.getView().up('window');
		if (win) {
			win.close();
		}
	},
	
	onAddDamageDetail: function () {
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var detailGrid = me.lookupReference('refRORODamageCheckGridHHT');
		var store = me.getStore('roroDamageCheckDetail');
		var record = Ext.create('MOST.model.operation.TheListOfDamageCheckOfRORO');

		var locNm = '';
		var locCd = '';
		
		if(refs.refRadioVessel.isChecked() == true){
			locNm = 'Vessel';
			locCd = 'VSL';
		}else if(refs.refRadioYard.isChecked() == true){
			locNm = 'Yard';
			locCd = 'YARD';
		}else if(refs.refRadioGate.isChecked() == true){
			locNm = 'Gate';
			locCd = 'GATE';
		}
		
		var dmgPart = refs.refTxtDamagePartDamageCheck.getValue();
		var dmgLevel = refs.refTxttDamageLevelDamageCheck.getValue();
		
		//Clear filter for Grid
		//detailGrid.filters.clearFilters();
		//detailGrid.filters.disable();
		//Clear filter for Store
		store.clearFilter();
		
		if (refs.refTxtDamagePartDamageCheck.getValue() == null 
				|| refs.refTxttDamageLevelDamageCheck.getValue() == null 
				|| refs.refTxtSubBlSnDamageCheck.getValue() == '' 
				|| refs.refTxtUnitNoDamageCheck.getValue() == '') {
			MessageUtil.warning('theListOfDamageCheckOfRORO', 'missedValue');
		} else {
			var idx = 0;

			if (detailGrid.getSelection() && detailGrid.getSelection().length > 0) {
				idx = store.indexOfId(detailGrid.getSelection()[0].get('id'));
			}
			
			record.set('dmgPartNm', refs.refTxtDamagePartDamageCheck.getValueCollection().items[0].data.invNm);
			record.set('dmgLevelNm', refs.refTxttDamageLevelDamageCheck.getValueCollection().items[0].data.invNm);
			record.set('dmgPart', dmgPart);
			record.set('dmgLevel', dmgLevel);
			record.set('locNm', locNm);
			record.set('locCd', locCd);
			record.set('remark', refs.refTxtRemarkDamageCheck.getValue());
			
			var validate = true;
			store.getData().getRange().forEach(function (record, index, array) {
				if (locCd == record.data.locCd 
						&& dmgPart == record.data.dmgPart 
						&& dmgLevel == record.data.dmgLevel) {
					validate = false;
				}
			});
			if (validate) {
				store.insert(idx, record);
				//detailGrid.getSelectionModel().select(record);
				//store.commitChanges();
				me.onClear();
			} else {
				MessageUtil.warning('roroDamageCheck', 'duplicatedata_msg');
			}
		}
	},
	
	onUpdateDamageDetail: function () {
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		
		var store = me.getStore('roroDamageCheckDetail');
		var grid = me.lookupReference('refRORODamageCheckGridHHT');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		if(selection == null) return;
		
		var locNm = '';
		var locCd = '';
		
		if(refs.refRadioVessel.isChecked() == true){
			locNm = 'Vessel';
			locCd = 'VSL';
		}else if(refs.refRadioYard.isChecked() == true){
			locNm = 'Yard';
			locCd = 'YARD';
		}else if(refs.refRadioGate.isChecked() == true){
			locNm = 'Gate';
			locCd = 'GATE';
		}
		
		//var locCd = (refs.refRadioYard.isChecked()) ? 'VSL' : 'YARD';
		var dmgPart = refs.refTxtDamagePartDamageCheck.getValue();
		var dmgLevel = refs.refTxttDamageLevelDamageCheck.getValue();
		
		var validate = true;
		store.getData().getRange().forEach(function (record, index, array) {
			if (locCd == record.data.locCd && dmgPart == record.data.dmgPart && dmgLevel == record.data.dmgLevel) {
				validate = false;
			}
		});
		if (validate) {
			selection.set('dmgPartNm', refs.refTxtDamagePartDamageCheck.getValueCollection().items[0].data.invNm);
			selection.set('dmgLevelNm', refs.refTxttDamageLevelDamageCheck.getValueCollection().items[0].data.invNm);
			selection.set('dmgPart', dmgPart);
			selection.set('dmgLevel', dmgLevel);
			selection.set('locCd', locCd);
			selection.set('locNm', locNm);
			selection.set('remark', refs.refTxtRemarkDamageCheck.getValue());
		} else {
			MessageUtil.warning('roroDamageCheck', 'duplicatedata_msg');
		}
		
	},
	
	onDeleteDamage: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('roroDamageCheckDetail');
		var grid = me.lookupReference('refRORODamageCheckGridHHT');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		if(selection == null) return;
		
		MessageUtil.question('remove', 'infodelete_msg', null, function (button) {
			if (button === 'ok') {
				store.remove(selection);
				//me.onDetailSave();
			}
		});
	},
	
	onClear: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('roroDamageCheckDetail');
		var grid = me.lookupReference('refRORODamageCheckGridHHT');

		refs.refTxtDamagePartDamageCheck.setValue('');
		refs.refTxttDamageLevelDamageCheck.setValue('');
		refs.refTxtRemarkDamageCheck.setValue('');
		
		refs.refRadioVessel.setValue({ location_radio: 'VSL' });
	},
	
	onCancelDamageHHT: function(btn){
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		MessageUtil.questionModern('Confirm', 'modity_save_confirm_msg',null,
			function(button){
				if (button === 'ok') {
					window.close();
				}
			}
		);		
	},
	
	onTblUnitClick: function(){
		var me = this;
		var refs = me.getReferences();
		var unitItem = me.getView().recvData;
		var unitNo = refs.refTxtUnitNoDamageCheck.getValue();

		if(unitNo){
			unitItem.set('unitNo', unitNo);
		}
			
		var params = {
			title : 'Unit No',
			vslCallId : unitItem.get("vslCallId"),
			statCd: unitItem.get("statCd"),
			cgNo: unitItem.get("cgNo"),
			unitNo: unitItem.get("unitNo"),
			brandCd: unitItem.get("brandCd"),
		};
		
		ViewUtil.openHhtPopup(me, 'app-listofunitfordamagecheckhhtpopup', 'refTxtUnitNoDamageCheck', params);
	},

//	afterSetCodePopupData:function(xtype, targetControl, returnValue){
//		var me = this;
//		var refs = me.getReferences();
//		
//		if(targetControl === 'refTxtUnitNoDamageCheck'){ 	// Add for HHT
//			if(returnValue){
//				refs.refTxtUnitNoDamageCheck.setValue(returnValue.code);	// Unit No
//				refs.refTxtSubBlSnDamageCheck.setValue(returnValue.cgNo); // Sub BL/SN
//				refs.refCboSNDamageCheck.setValue(returnValue.snNo);
//				refs.refCboBlNoDamageCheck.setValue(returnValue.blNo);
//			}
//		}
//		
//	},
	
	onInventoryPopupHHTLoad:function(){
		var me = this;
		var refs = me.getReferences();
		
		me.onTblDamageCheckInventoryHHT();
	},
	
	onTblDamageCheckInventoryHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('roroDamageCheckInventory');
		var grid = me.lookupReference('refMainGrdDamageCheckHHT');
		var arrSelectedRecord = new Array();
		
		var unitItem = me.getView().recvData;
		
		unitItem.set('unitNo', refs.refTxtUnitNoDamageCheck.getValue());
		
		if (unitItem == null){
			MessageUtil.warning('Inventory Check', 'Please select UnitNo');
			return;
		}
		
		ViewUtil.openHhtPopup(me, 'app-damagecheckinventoryofrorohht', 'refBtnInventoryDamageCheck', unitItem);
	},
	

	/**
	 * =========================================================================================================================
	 * HHT TABLET END.
	 * 
	 */
});