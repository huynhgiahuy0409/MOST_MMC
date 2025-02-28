Ext.define('MOST.view.operation.hht.TheListofInventoryCheckROROHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.thelistofinventorycheckrorohhtctl',

	/**
	 * VARIABLE, CONSTANT START
	 * =========================================================================================================================
	 */
	prevData:null,
	
	/**
	 * VARIABLE, CONSTANT END
	 * =========================================================================================================================
	 */
	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onPopupHHTLoad: function(){
		var me = this;
     	var refs = me.getReferences();
     	var window = me.getView().up('window');
		window.setTitle('Inventory');
		var params = me.getSearchCondition();
     	var cgStore = me.getStore('theListOfDamageCheckOfRORO');
     	var store = me.getStore('roroDamageCheckInventory');
		var grid = me.lookupReference('refGrdInventoryCheck');
		var cgNo = '';
		
		if(params.shipgNoteNo){
			cgNo = params.shipgNoteNo;
		}else {
			cgNo = params.blNo;
		}
		
		store.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
				}
			}
		});
		
		cgStore.load({
			params : {
				vslCallId : params.vslCallId,
				blNo: params.blNo,
				snNo: params.shipgNoteNo,
				cgNo: cgNo,
			},
			callback: function(record, operation, success) {
				if(success){
					if(record != null && record.length > 0){

					}
				}
			}
		});
		
		me.getViewModel().setData({theInventoryCheck:params});
		//refs.refTxtUnitNoInventoryCheck.setValue(unitNo);
		refs.refTxtSubBlSnInventoryCheck.setValue(cgNo);
	},
	
	onUpdateInventoryDtl: function () {
		var me = this;
		var refs = me.getReferences();
		var params = me.getSearchCondition();
		var store = me.getStore('roroDamageCheckInventory');
//		var checkInventory = me.getStore('checkRoRoInventory');

		var invNm = refs.refTxtInvNm.getValue();
     	var invCnt = refs.refTxtInvCnt.getValue();
    	var invCd = refs.refTxtInvCd.getValue();
    	var cdNum = refs.refTxtCdNum.getValue();
    	
		var invItem = Ext.create('MOST.model.operation.TheListOfDamageCheckOfRORO');
		invItem.set('vslCallId', params.vslCallId);
		invItem.set('cgNo', params.cgNo);
		invItem.set('unitNo', params.unitNo);
		invItem.set('invCd', invCd);
		invItem.set('invCnt', invCnt);
		invItem.set('dmgChkCd', 'INV');
		invItem.set('userId', MOST.config.Token.getUserId());
		invItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));

		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
//		updateParm.set('items', new Array());
//		updateParm.get('items').push(invItem.data);
		updateParm.set('item', invItem.data);
		updateParm.save({
			success: function (records, operation) {
				store.commitChanges();
				MessageUtil.saveSuccess();
			}
		});
	},
	
	onAddInventory: function() {
		var me = this;
		var refs = me.getReferences();
		var params = me.getSearchCondition();
		var store = me.getStore('roroDamageCheckInventory');
		var checkInventory = me.getStore('checkRoRoInventory');
		
     	var invNm = refs.refTxtInvNm.getValue();
     	var invCnt = refs.refTxtInvCnt.getValue();
    	var invCd = refs.refTxtInvCd.getValue();
    	var cdNum = refs.refTxtCdNum.getValue();
    	
     	if (params.cgNo == '' || params.unitNo == '') {
			MessageUtil.warning('theListOfDamageCheckOfRORO', 'missedValue');
		}
		else {
			var workingStatus = WorkingStatus.INSERT;
			var isCreated = true;
			checkInventory.load({
				params: {
					vslCallId: params.vslCallId,
					invCd: invCd,
					unitNo: params.unitNo,
					cgNo: params.cgNo,
				},
				callback: function (records, operation, success) {
					if (success) {
						if (records && records.length > 0) {
							var invItem = Ext.create('MOST.model.operation.TheListOfDamageCheckOfRORO');
							invItem.set('vslCallId', params.vslCallId);
							invItem.set('cgNo', params.cgNo);
							invItem.set('unitNo', params.unitNo);
							invItem.set('invCd', invCd);
							invItem.set('invCnt', invCnt);
							invItem.set('dmgChkCd', 'INV');
							invItem.set('userId', MOST.config.Token.getUserId());
							invItem.set('workingStatus', WorkingStatus.INSERT);

							var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
							updateParm.getProxy().url = store.getProxy().url;
							updateParm.phantom = false;
							updateParm.set('workingStatus',WorkingStatus.INSERT);
							updateParm.set('item', invItem.data);
							updateParm.save({
								success: function (records, operation) {
									store.commitChanges();
									MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
									function(button){
										if (button === 'ok') {
										}
									});
								}
							});
						}
						else {
							var invItem = Ext.create('MOST.model.operation.TheListOfDamageCheckOfRORO');
							invItem.set('vslCallId', params.vslCallId);
							invItem.set('vslCd', params.vslCd);
							invItem.set('callSeq', params.callSeq);
							invItem.set('callYear', params.callYear);
							invItem.set('cgNo', params.cgNo);
							invItem.set('unitNo', params.unitNo);
							invItem.set('ixCd', params.ixCd);
							invItem.set('catgCd', params.catgCd);
							invItem.set('dmgChkCd', 'INV');
							invItem.set('locCd', null);
							invItem.set('dmgPart', null);
							invItem.set('dmgLevel', null);
							invItem.set('invCd', invCd);
							invItem.set('invCnt', invCnt);
							invItem.set('cdNum', cdNum);
							invItem.set('brandCd', params.brandCd);
							invItem.set('modelCd', params.modelCd);
							invItem.set('remark',  params.remark);
							invItem.set('userId', MOST.config.Token.getUserId());
							invItem.set('workingStatus', WorkingStatus.INSERT);
							
							var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
							updateParm.getProxy().url = store.getProxy().url;
							updateParm.phantom = false;
							updateParm.set('workingStatus', WorkingStatus.INSERT);
							updateParm.set('item', invItem.data);
							updateParm.save({
								success: function (records, operation) {
									store.commitChanges();
									MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
									function(button){
										if (button === 'ok') {
										}
									});
								}
							});
						}
					}
				}
			});

		}

	},
	
	onSelectGridInventoryCheckDetailHHT: function () {
		var me = this;
		var grid = me.lookupReference('refGrdInventoryCheck');

		var selection = grid.getSelection() == null ? null : grid.getSelection();

		if (selection == null) return;
		
		me.getViewModel().setData({theInventoryDtl:selection});
	},
	
	onSelectInventoryCheckHHTGrid: function(){
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference('refMainGrdInventoryCheckHHT');
		var unitItem = grid.getSelection();
		var unitNo = unitItem.data.unitNo;
		
		refs.refTxtUnitNoInventoryCheck.setValue(unitNo);
		//me.getViewModel().setData({theInventoryCheck:unitItem});
	},
	
	onCancelEdit: function (rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},
	
	onClear: function () {
		var me = this;
		var refs = me.getReferences();

		refs.refTxtRemarkInventoryCheck.setValue();
		refs.refTxtInvNm.setValue();
		refs.refTxtInvCnt.setValue();
	},
	
	onTblUnitClick: function(){
		var me = this;
		var refs = me.getReferences();
		var unitItem = me.getView().recvData;
		var params = me.getSearchCondition();
		var cgStore = me.getStore('theListOfDamageCheckOfRORO');
		var unitNo = refs.refTxtUnitNoInventoryCheck.getValue();
		var brandCd = refs.refTxtBrandInventoryCheck.getValue();
		var cgNo = refs.refTxtSubBlSnInventoryCheck.getValue();

		var params = {
			title : 'Unit No',
			vslCallId : params.vslCallId,
			unitNo: unitNo,
			brandCd: brandCd,
			catgCd: params.catgCd,
			cgNo: cgNo,
		};
		
		cgStore.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
					}
				}
			}
		});
		ViewUtil.openHhtPopup(me, 'app-listofunitfordamagecheckhhtpopup', 'refTxtUnitNoInventoryCheck', params);
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'refTxtUnitNoInventoryCheck'){ 	// Add for HHT
			if(returnValue){
				refs.refTxtUnitNoInventoryCheck.setValue(returnValue.code);	// Unit No
				refs.refTxtSubBlSnInventoryCheck.setValue(returnValue.cgNo); // Sub BL/SN
//				refs.refCboSNDamageCheck.setValue(returnValue.snNo);
//				refs.refCboBlNoDamageCheck.setValue(returnValue.blNo);
			}
		}
		
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
    	
     	if(!params.cgNo) {
     		if(params.shipgNoteNo) {
     			params.cgNo = params.shipgNoteNo;
     		}else {
     			params.cgNo = params.blNo;
     		}
     	}
     	
     	if(!params.unitNo) {
     		params.unitNo = refs.refTxtUnitNoInventoryCheck.getValue();
     	}
     	
    	return params;
	},
});