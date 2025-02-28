Ext.define('MOST.view.operation.hht.YardCheckerDamageCheckofROROHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.yardcheckerdamagecheckofrorohhtctl',

	/**
	 * =========================================================================================================================
	 * VARIABLE, CONSTANT START
	 */
	MAX_PERIOD_DAY: 14,
	MAX_DATE_ALLOW: 14,
	NON_CALL_ID: CommonConstants.NON_CALL_ID,
	cgIndex: 0,
	prevData:null,
	
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
		var params = me.getSearchCondition();
     	var cgStore = me.getStore('theListOfDamageCheckOfRORO');
     	var snStore = me.getStore('snCombo');
		var blStore = me.getStore('blCombo');

		me.getComboBoxRORODamageCheck();
     	me.getViewModel().setData({theDamageCheck:params});
     	
     	if(params.shipgNoteNo){
     		me.getSnComboItems();
     		refs.refTxtSubBlSnDamageCheck.setValue(params.shipgNoteNo);
			
		}else {
			me.getBlComboItems();
			refs.refTxtSubBlSnDamageCheck.setValue(params.blNo);
		}
     	
     	me.getDetailCgList(params);
     	
     	if(params.searchType == 'YardDischarged') {
     		
     		refs.refRadioVessel.setChecked(true);
         	refs.refRadioYard.disable();
         	refs.refRadioGate.disable();

         	params.chkLoc = 'VSL';
         	
         	me.getDetailCgList(params);
         	//me.getInvList();
     	}

//     	cgStore.load({
//			params : {
//				vslCallId : vslCallId,
//				blNo: blNo,
//				snNo: snNo,
//				
//			},
//			
//			callback: function(record, operation, success) {
//				if(success){
//					if(record != null && record.length > 0){
//
//					}
//				}
//			}
//		});
	},
	
	getDetailCgList: function (params) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('roroDamageCheckDetail');
		store.removeAll();
		
		var unitNo = refs.refTxtUnitNoDamageCheck.getValue();
		var cgNo = refs.refTxtSubBlSnDamageCheck.getValue();
		
		var params = {
			vslCallId: params.vslCallId,
			unitNo: unitNo,
			cgNo: cgNo,
			chkLoc : params.chkLoc,	// 'VSL' 'GATE' 'YARD'
		};
		
		store.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					if(records.length > 0) {
						me.loadSavedStore(records[0].data);
					}
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
	
	getBlComboItems: function () {
		var me = this;
		var refs = me.getReferences();
		var blCombo = me.getStore('blCombo');
		var unitItem = me.getView().recvData;
		var vslCallId = unitItem.data.vslCallId;
		var blNo =  unitItem.data.blNo;
		
		blCombo.load({
			params: {
				vslCallId: vslCallId
			},

			callback: function (records, operation, success) {
				if (success) {
					if (records.length > 0) {
						blCombo.insert(0, [{ cdNm: 'Select', cd: '' }]);
						refs.refCboSNDamageCheck.setValue(blNo);
					}
				}
			}
		});
	},
	
	getSnComboItems: function () {
		var me = this;
		var refs = me.getReferences();
		var snCombo = me.getStore('snCombo');
		var unitItem = me.getView().recvData;
		
		var vslCallId = unitItem.data.vslCallId;
		var snNo =  unitItem.data.shipgNoteNo;
//		var searchParm = me.getViewModel().get('theSearch');
//		if (refs.ctlETAFromDt.getValue() != null && refs.ctlETAToDt.getValue() != null) {
//			dateCondition = me.checkPeriodDate("ctlETAFromDt", "ctlETAToDt", me.MAX_DATE_ALLOW, true);
//			var estArrvFromDt = dateCondition.fromDtString;
//			var estArrvToDt = dateCondition.toDtString;
//		}
		
		snCombo.load({
			params: {
				vslCallId: vslCallId,
			},

			callback: function (records, operation, success) {
				if (success) {
					if (records.length > 0) {
						snCombo.insert(0, [{ cdNm: 'Select', cd: '' }]);
						refs.refCboSNDamageCheck.setValue(snNo);
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
	
	onSearch: function () {
		var me = this;
		var refs = me.getReferences();
		
		me.onPopupHHTLoad();
	},
	
	onSelectGridDamageCheckDetailHHT: function(){
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference('refGrdDamageCheckDetail');
		var unitItem = grid.getSelection();
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
		var window = me.getView().up('window');
		var params = me.getSearchCondition();
		var unitItem = me.getViewModel().get('theDamageCheck');
		
		var arrDamage = new Array();
		
		var storeDamage = me.getStore('roroDamageCheckDetail');

		if(storeDamage.data.length > 0) {
			storeDamage.getData().getRange().forEach(function (record, index, array) {
				if (record.get('workingStatus') != WorkingStatus.DELETE) {
					record.set('vslCallId', params.vslCallId);
					record.set('vslCd', 	params.vslCd);
					record.set('callSeq', 	params.callSeq);
					record.set('callYear', 	params.callYear);
					record.set('cgNo', refs.refTxtSubBlSnDamageCheck.getValue());
					record.set('unitNo', refs.refTxtUnitNoDamageCheck.getValue());
					record.set('ixCd', 'I');
					record.set('catgCd', 'I');
					record.set('dmgChkCd', 'DMG');
					record.set('locCd', record.data.locCd);
					record.set('dmgPart', record.data.dmgPart);
					record.set('dmgLevel', record.data.dmgLevel);
					record.set('brandCd', params.brandCd);
					record.set('modelCd', params.modelCd);
					record.set('remark', refs.refTxtRemarkDamageCheck.getValue());
					record.set('workingStatus', WorkingStatus.INSERT);
					record.set('userId', MOST.config.Token.getUserId());
				}
				arrDamage.push(record.data);
			});
		}
		
		if (arrDamage.length > 0) {
			var dmgItem = Ext.create('MOST.model.operation.TheListOfDamageCheckOfRORO');
			dmgItem.set('userId', MOST.config.Token.getUserId());
			dmgItem.set('vslCallId', 	params.vslCallId);
			dmgItem.set('vslCd', 		params.vslCd);
			dmgItem.set('callSeq', 		params.callSeq);
			dmgItem.set('callYear', 	params.callYear);
			dmgItem.set('cgNo', 		params.cgNo);
			dmgItem.set('unitNo',		refs.refTxtUnitNoDamageCheck.getValue());
			dmgItem.set('ixCd', 		params.ixCd);
			dmgItem.set('catgCd', 		params.catgCd);
			dmgItem.set('dmgChkCd', 'DMG');
			dmgItem.set("items", arrDamage);
			dmgItem.set('workingStatus', WorkingStatus.INSERT);
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			updateParm.getProxy().url = storeDamage.getProxy().url;
			updateParm.set('workingStatus', WorkingStatus.INSERT);
			updateParm.set('items', new Array());
			updateParm.get('items').push(dmgItem.data);
			updateParm.save({
				success: function (records) {
					storeDamage.commitChanges();
					me.onClear();
					MessageUtil.saveSuccess();
					window.close();
				}
			});
		}
		
//		if (arrDamage.length == 0) {
//			dmgItem.set('vslCallId', 	params.vslCallId);
//			dmgItem.set('vslCd', 		params.vslCd);
//			dmgItem.set('callSeq', 		params.callSeq);
//			dmgItem.set('callYear', 	params.callYear);
//			dmgItem.set('cgNo', 		params.cgNo);
//			dmgItem.set('unitNo', refs.refTxtUnitNoDamageCheck.getValue());
//			dmgItem.set('ixCd', 		params.ixCd);
//			dmgItem.set('catgCd', 		params.catgCd);
//			dmgItem.set('dmgChkCd', 'DMG');
//			dmgItem.set('workingStatus', WorkingStatus.DELETE);
//			dmgItem.set('userId', MOST.config.Token.getUserId());
//			
//			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
//			updateParm.getProxy().url = storeDamage.getProxy().url;
//			updateParm.phantom = false;
//			updateParm.drop();
//			updateParm.set('workingStatus', WorkingStatus.DELETE);
//			updateParm.set('items', new Array());
//
//			updateParm.get('items').push(dmgItem.data);
//			updateParm.save({
//				success: function (records) {
//					storeDamage.commitChanges();
//					me.onClear();
//					storeDamage.reload();
//					MessageUtil.saveSuccess();
//					//me.onSearch();
//
//				}
//			});
//		}
	},
	
	onAddDamageDetail: function () {
		var me = this;
		var refs = me.getReferences();
		var vessel = refs.refRadioVessel.getValue();
		var yard = refs.refRadioYard.getValue();
		var unitItem = me.getView().recvData;
		var detailGrid = me.lookupReference('refGrdDamageCheckDetail');
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
			record.set('locCd', locCd);
			record.set('locNm', locNm);
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
				//me.onDetailSave();
				me.onClear();
			} else {
				MessageUtil.warning('roroDamageCheck', 'duplicatedata_msg');
			}
		}
	},
	
	onUpdateDamageDetail: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('roroDamageCheckDetail');
		
		var grid = me.lookupReference('refGrdDamageCheckDetail');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
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
		//me.onDetailSave();
	},
	
	onDeleteDamage: function () {
		var me = this;
		refs = me.getReferences();
		var refs = me.getReferences();
		var store = me.getStore('roroDamageCheckDetail');
		var grid = me.lookupReference('refGrdDamageCheckDetail');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		MessageUtil.question('remove', 'infodelete_msg', null, function (button) {
			if (button === 'ok') {
				store.remove(selection);
				me.onDetailSave();
			}
		});
	},
	
	onClear: function () {
		var me = this;
		var refs = me.getReferences();

		refs.refTxtDamagePartDamageCheck.setValue('');
		refs.refTxttDamageLevelDamageCheck.setValue('');
		refs.refTxtRemarkDamageCheck.setValue('');
		
		refs.refRadioVessel.setValue({ location_radio: 'VSL' });
	},
	
	onTblUnitClick: function(){
		var me = this;
		var refs = me.getReferences();
		var params = me.getSearchCondition();
		
		if(!params) return;
		
		ViewUtil.openHhtPopup(me, 'app-listofunitfordamagecheckhhtpopup', 'refTxtUnitNoDamageCheck', params);
	},

	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'refTxtUnitNoDamageCheck'){ 	// Add for HHT
			if(returnValue){
				refs.refTxtUnitNoDamageCheck.setValue(returnValue.code);	// Unit No
				refs.refTxtSubBlSnDamageCheck.setValue(returnValue.cgNo); // Sub BL/SN
				refs.refCboSNDamageCheck.setValue(returnValue.snNo);
				refs.refCboBlNoDamageCheck.setValue(returnValue.blNo);
			}
		}
		
	},
	
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
	

	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var recvData = me.getView().recvData;
     	me.prevData = recvData.clone();

     	var params = {
			vslCallId 	: me.prevData.get('vslCallId'),
			vslCd 		: me.prevData.get('vslCd'),
			callSeq 	: me.prevData.get('callSeq'),
			callYear 	: me.prevData.get('callYear'),
			searchType	: recvData.get('searchType'),
			grNo 		: me.prevData.get('grNo'),
			cgNo 		: me.prevData.get('cgNo'),
			shipgNoteNo : me.prevData.get('shipgNoteNo'),
			blNo 		: me.prevData.get('blNo'),
			unitNo 		: me.prevData.get('unitNo'),
			brandCd		: me.prevData.get('brandCd'),
			modelCd		: me.prevData.get('modelCd'),
			cgTpCd 		: me.prevData.get('cgTpCd'),
			catgCd 		: me.prevData.get('catgCd'),
			shftDt 		: me.prevData.get('shftDt'),
			shftId	 	: me.prevData.get('shftId'),
			ixCd		: me.prevData.get('ixCd'),
			gateTxnNo	: me.prevData.get('gateTxnNo'),
			remark		: me.prevData.get('remark'),
		};
    	
    	return params;
	},
	/**
	 * =========================================================================================================================
	 * HHT TABLET END.
	 * 
	 */
});