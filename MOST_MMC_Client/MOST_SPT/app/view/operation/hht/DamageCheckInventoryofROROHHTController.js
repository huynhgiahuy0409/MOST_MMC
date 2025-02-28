Ext.define('MOST.view.operation.hht.DamageCheckInventoryofROROHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.damagecheckinventoryofrorohhtctl',

	/**
	 * VARIABLE, CONSTANT START
	 * =========================================================================================================================
	 */

	
	/**
	 * VARIABLE, CONSTANT END
	 * =========================================================================================================================
	 */
	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onInventoryPopupHHTLoad: function(){
		var me = this;
     	var refs = me.getReferences();
     	
     	var store = me.getStore('roroDamageCheckInventory');
		var grid = me.lookupReference('refRORODamageCheckInventoryHHTGrid');
		var unitItem = me.getView().recvData;
		
		var vslCallId = unitItem.data.vslCallId;
		var catgCd = unitItem.data.catgCd;
		var shipgNoteNo =  unitItem.data.shipgNoteNo;
     	var blNo =  unitItem.data.blNo;
     	var doNo =  unitItem.data.doNo;
     	var unitNo =  unitItem.data.unitNo;
		
		refs.refTxtUnitNoInv.setValue(unitNo);
		
		var cgNo;
		
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
	
	onROROInvEdit: function (editor, context) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('roroDamageCheckInventory');
		var checkInventory = me.getStore('checkRoRoInventory');
		var unitItem = me.getView().recvData;
		
		var vslCallId = unitItem.data.vslCallId;
     	var unitNo =  unitItem.data.unitNo;
     	var cgNo =  unitItem.data.cgNo;
     	var unitNo =  unitItem.data.unitNo;
     	var invNm = refs.refTxtInvNm.getValue();
     	var invCnt = refs.refTxtInvCnt.getValue();
    	var invCd = refs.refTxtInvCd.getValue();
    	var cdNum = refs.refTxtCdNum.getValue();
    	
     	if (unitItem.data.cgNo == '' || unitItem.data.unitNo == '') {
			MessageUtil.warning('theListOfDamageCheckOfRORO', 'missedValue');
		}
		else {
			var workingStatus = WorkingStatus.convertInt(WorkingStatus.INSERT);
			var isCreated = true;
			checkInventory.load({
				params: {
					vslCallId: vslCallId,
					invCd: invCd,
					unitNo: unitNo,
					cgNo: cgNo,
				},
				callback: function (records, operation, success) {
					if (success) {
						if (records && records.length > 0) {
							var invItem = Ext.create('MOST.model.operation.TheListOfDamageCheckOfRORO');
							invItem.set('vslCallId', vslCallId);
							invItem.set('cgNo', unitItem.data.cgNo);
							invItem.set('unitNo', unitItem.data.unitNo);
							invItem.set('invCd', invCd);
							invItem.set('invCnt', invCnt);
							invItem.set('userId', MOST.config.Token.getUserId());
							var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
							updateParm.getProxy().url = store.getProxy().url;
							updateParm.phantom = false;
							updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
							updateParm.set('items', new Array());
							updateParm.get('items').push(invItem.data);
							updateParm.save({
								success: function (records, operation) {
									store.commitChanges();
									MessageUtil.saveSuccess();
//									me.onClear();
//									store.reload();
//									me.onSearch();
								}
							});
						}
						else {
							var invItem = Ext.create('MOST.model.operation.TheListOfDamageCheckOfRORO');
							invItem.set('vslCallId', unitItem.data.vslCallId);
							invItem.set('vslCd', unitItem.data.vslCd);
							invItem.set('callSeq', unitItem.data.callSeq);
							invItem.set('callYear',unitItem.data.callYear);
							invItem.set('cgNo', unitItem.data.cgNo);
							invItem.set('unitNo', unitItem.data.unitNo);
							invItem.set('ixCd', unitItem.data.ixCd);
							invItem.set('catgCd', unitItem.data.catgCd);
							invItem.set('dmgChkCd', 'INV');
							invItem.set('locCd', null);
							invItem.set('dmgPart', null);
							invItem.set('dmgLevel', null);
							invItem.set('invCd', invCd);
							invItem.set('invCnt', invCnt);
							invItem.set('cdNum', cdNum);
							invItem.set('brandCd', unitItem.data.brandCd);
							invItem.set('modelCd', unitItem.data.modelCd);
							invItem.set('remark',  unitItem.data.remark);
							invItem.set('userId', MOST.config.Token.getUserId());
							
							var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
							updateParm.getProxy().url = store.getProxy().url;
							updateParm.phantom = false;
							updateParm.set('workingStatus', WorkingStatus.UPDATE);

//							updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
							updateParm.set('items', new Array());
							updateParm.get('items').push(invItem.data);
							updateParm.save({
								success: function (records, operation) {
									store.commitChanges();
									MessageUtil.saveSuccess();

									me.getInvList();
								}
							});
						}
					}
				}
			});

		}

	},
	
	onConfirmInventory: function (params) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('roroDamageCheckInventory');
		
		me.onROROInvEdit();
//		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
//		updateParm.getProxy().url = store.getProxy().url;
//		updateParm.phantom = false;
//		updateParm.set('workingStatus', WorkingStatus.UPDATE);
//		updateParm.set('item', unitItem.data);
//		updateParm.save({
//			success : function(record, operation) {
//				unitStore.commitChanges();
//				MessageUtil.saveSuccess();
//				
//			}
//		});
		
	},
	
	getInvList: function (params) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('roroDamageCheckInventory');
		var unitItem = me.getView().recvData;
		
		var vslCallId = unitItem.data.vslCallId;
     	var unitNo =  unitItem.data.unitNo;
     	var cgNo =  unitItem.data.cgNo;
     	var unitNo =  unitItem.data.unitNo;
     	
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
	
	onDbClickROROInventory: function () {
		var me = this;
		var grid = me.lookupReference('refRORODamageCheckInventoryHHTGrid');

		var selection = grid.getSelection() == null ? null : grid.getSelection();

		if (selection == null) return;
		
		me.getViewModel().setData({theInventory:selection});
		//me.setInvGridColumnEditable(selection.phantom);
	},
	
	setInvGridColumnEditable: function (isCreate) {
		var me = this;
		var refs = me.getReferences();

		if (isCreate) { //ADD
			refs.refTxtInvCnt.setEditable(true);
			refs.refTxtInvCnt.setDisabled(false);
			refs.refRORODamageCheckCount.getEditor().setEditable(true);
			refs.refRORODamageCheckCount.getEditor().setDisabled(false);
		} else {		//UPDATE
			refs.refTxtInvCnt.setEditable(false);
			refs.refTxtInvCnt.setDisabled(true);
			refs.refRORODamageCheckCount.getEditor().setEditable(false);
			refs.refRORODamageCheckCount.getEditor().setDisabled(true);
		}
	},
	
	
	
	onCancelEdit: function (rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},
});