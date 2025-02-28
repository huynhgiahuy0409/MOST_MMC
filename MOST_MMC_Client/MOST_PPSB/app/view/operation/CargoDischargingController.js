Ext.define('MOST.view.operation.CargoDischargingController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.cargodischarging',
	
	/**
	 * =========================================================================================================================
	 * VARIABLE, CONSTANT START
	 */
	CARGO_DISCHARGING_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/cargodischarging/cargoDischarging',
	prevDate:{ startDt: null, endDt: null},
	prevDateHHT:{ startDt: null, endDt: null},
	prevData:null,
	prevHHTData:null,
	prevWhItems : new Array(),
	prevDmgWhItems : new Array(),
	eqFacNo: '',
	
	isFirstLoad: true,
	currBl: '',
	CUST_RELEASE: 'RELEASE', //CUSTOMS MODE
	CUST_HOLD: 'HOLD', //CUSTOMS MODE
	
	DAMAGE_STORE: 'theDamageStore',
	DAMAGE_CHECK_STORE: 'damageCheckStore',
	DIMENSION_STORE: 'dimensionStore',
	UPLOAD_STORE: 'uploadStore',
	
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
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var store = me.getStore('confirmDischarging');
		
		me.prevData = recvData.clone();
		var params = me.getSearchCondition();
		var window = me.getView().up('window');
		
		var modeOfOprCombo = me.getStore('confirmDischargingForModeOfOprCombo');
		var deliveryCombo = me.getStore('confirmDischargingForDeliveryCombo');
		var cargoTypeCombo = me.getStore('confirmDischargingForCargoTypeCombo');
		var confirmDischargingHatchCombo = me.getStore('confirmDischargingHatchCombo');
		me.setComboBoxWithLocalCache(CacheServiceConstants.APFP_COMBOBOX, 'ctlConfirmDischargingHatchDrtCombo');

		modeOfOprCombo.load();
		deliveryCombo.load();
		cargoTypeCombo.load();
		confirmDischargingHatchCombo.load();
		
		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success){
					if(record != null && record.length > 0){
						record[0].set('workYmd', params.workYmd);
						me.setDetailInitialize(record[0]);
						me.operationSetting(params.startDtStr, params.endDtStr);
					}
				}
			}
		});
		
		refs.txtInternalTruckNo.refs.ctlField.setReadOnly(true);
		refs.ctlConfirmDischargingLorryNo.refs.ctlField.setReadOnly(true);
		refs.txtABTruckNo.refs.ctlField.setReadOnly(true);
		
		//No need for Shift and Start/End time if cargo type is not BBK/DBN/DBE
		var cgTpCdList = ['BBK', 'DBN', 'DBE'];
		if (!cgTpCdList.includes(recvData.data.cgTpCd)) {
		    refs.ctlConfirmDischargingStartDt.setAllowBlank(true);
		    refs.ctlConfirmDischargingStartDt.validate(); 
		    refs.ctlConfirmLoadingShift.setAllowBlank(true);
		    refs.ctlConfirmLoadingShift.validate();
		} else {
			refs.ctlConfirmDischargingStartDt.setAllowBlank(false);
		    refs.ctlConfirmDischargingStartDt.validate(); 
		    refs.ctlConfirmLoadingShift.setAllowBlank(false);
		    refs.ctlConfirmLoadingShift.validate();
		}
		
		if (recvData.data.projectCargo == 'Y') {
			refs.ctlConfirmDischargingWhQty.setDisabled(true);
			refs.ctlConfirmDischargingWhMt.setDisabled(true);
			refs.ctlConfirmDischargingWhM3.setDisabled(true);

			refs.ctlConfirmDischargingLoadQty.setDisabled(false);
			var ctlConfirmDischargingPackNoCode = this.lookupReference('ctlConfirmDischargingPackNoCode');
			if (ctlConfirmDischargingPackNoCode) {
				ctlConfirmDischargingPackNoCode.allowBlank = false; 
			}
		} else {
			refs.ctlConfirmDischargingWhQty.setDisabled(false);
			refs.ctlConfirmDischargingWhMt.setDisabled(false);
			refs.ctlConfirmDischargingWhM3.setDisabled(false);

			refs.ctlConfirmDischargingLoadQty.setDisabled(false);
			var ctlConfirmDischargingPackNoCode = this.lookupReference('ctlConfirmDischargingPackNoCode');
			if (ctlConfirmDischargingPackNoCode) {
				ctlConfirmDischargingPackNoCode.allowBlank = true; 
			}
		}
		
		var infoForm = me.getView().form;
		infoForm.isValid();
		
		refs.ctlConfirmDischargingPackNoCode.refs.ctlField.setReadOnly(true);
	},

    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// WarehouseAllocation
	onWarehouseAllocation : function(controlName){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var control = me.lookupReference(controlName);
		var title = 'Warehouse Allocation';
		var selection;
	
		if(controlName === 'ctlConfirmHandlingInDmgLocId'){
			// Validation
			if(	refs.ctlConfirmDischargingDmgMt.getValue() <= 0 &&
				refs.ctlConfirmDischargingDmgM3.getValue() <= 0 &&
				refs.ctlConfirmDischargingDmgQty.getValue()<= 0){
				
				Ext.MessageBox.show({
			        title : 'Messsage',
				    msg : 'Please input location amount',
				    width : 300,
				    buttons : Ext.MessageBox.OK,
				    icon : Ext.MessageBox.INFO
				});	
				
				return;
			}			

			selection = Ext.create('MOST.model.operation.CargoHandlingIn', {
				vslCallId: refs.ctlVslCallId.getValue(),
				whTpCd:'D',
				cgNo: refs.ctlCgNo.getValue(),
				grMt: refs.ctlConfirmDischargingDmgMt.getValue(),
				grM3: refs.ctlConfirmDischargingDmgM3.getValue(),
				grQty: refs.ctlConfirmDischargingDmgQty.getValue(),
				catgCd : detailItem.get('catgCd')
			});
		}else{
			
			// Validation
			if(	refs.ctlConfirmDischargingWhMt.getValue() <= 0 &&
				refs.ctlConfirmDischargingWhM3.getValue() <= 0 &&
				refs.ctlConfirmDischargingWhQty.getValue()<= 0){
				
				Ext.MessageBox.show({
			        title : 'Messsage',
				    msg : 'Please input location amount',
				    width : 300,
				    buttons : Ext.MessageBox.OK,
				    icon : Ext.MessageBox.INFO
				});	
				
				return;
			}
			
			selection = Ext.create('MOST.model.operation.CargoHandlingIn', {
				vslCallId: refs.ctlVslCallId.getValue(),
				whTpCd:'G',
				cgNo: refs.ctlCgNo.getValue(),
				grMt: refs.ctlConfirmDischargingWhMt.getValue(),
				grM3: refs.ctlConfirmDischargingWhM3.getValue(),
				grQty: refs.ctlConfirmDischargingWhQty.getValue(),
				catgCd : detailItem.get('catgCd')
			});
		}

		me.openCodePopup('app-warehouseallocation',controlName, selection);
	},
	
	// Direct/Indirect Mode change
	onDirectModeChange : function(control, newValue){
		var me = this;
		var refs = me.getReferences();
		var clearItem = new Ext.create('MOST.model.operation.CargoDischarging');
		var detailItem = me.getViewModel().get('theDetail');
		
		refs.ctlConfirmDischargingPackNoCode.setValue('');
		
		//Change AB check status when select radio button or not
		if(refs.ctlBargeOperationAB.checked == false){			
			detailItem.set("abCheck", 'N');
		}
		//Change AB check status when select radio button or not
		if(refs.ctlIndirectOperation.checked == false){			
			detailItem.set("vaCheck", 'N');
		}
		//Change AB check status when select radio button or not
		if(refs.ctlDirectOperation.checked == false){			
			detailItem.set("vgCheck", 'N');
		}
		
		//reset VA and AB truck fields
		detailItem.set('abLorryNo', '');
		detailItem.set('vaLorryNo', '');
		
		//reset package list
		me.packageItems = new Array();//btnPackageNo
		if(control == refs.ctlDirectOperation && refs.ctlDirectOperation.checked){
			//Change VG check status when select radio button or not
			detailItem.set("vgCheck", 'Y');
			me.getViewModel().setData({directMode:newValue});
			me.getViewModel().setData({apronMode:!newValue});
			me.getViewModel().setData({indirectMode:!newValue});
			me.updateRecordWithNoCommit(detailItem, clearItem, ['dmgWgt', 'dmgM3', 'dmgQty', 'whQty', 'whWgt', 'whM3', 'aprQty' , 'aprM3' , 'aprMt', 'vbQty', 'vbMt', 'vbM3']);
			refs.ctlConfirmDischargingLorryNo.setEditableControl(true);
			refs.ctlConfirmDischargingApronLorryNo.setEditableControl(false);
			refs.ctlConfirmDischargingApronLorryNo.setValue('');
			refs.txtInternalTruckNo.allowBlank = true;

			if(refs.refCargoType.getValue() == CodeConstants.MT_CGTP_BBK){
				refs.ctlConfirmDischargingLoadQty.setAllowBlank(false);
				refs.ctlConfirmDischargingLoadMt.setAllowBlank(true);
				refs.ctlConfirmDischargingLoadQty.setReadOnly(false);
				refs.ctlConfirmDischargingLoadMt.setReadOnly(true);
				refs.ctlConfirmDischargingLoadM3.setReadOnly(true);
			}else {
				refs.ctlConfirmDischargingLoadMt.setAllowBlank(false);
				refs.ctlConfirmDischargingLoadQty.setAllowBlank(true);
				refs.ctlConfirmDischargingLoadQty.setReadOnly(false);
				refs.ctlConfirmDischargingLoadMt.setReadOnly(false);
				refs.ctlConfirmDischargingLoadM3.setReadOnly(false);
			}
			var craneStore = me.getStore('confirmDischargingCraneCombo');
			craneStore.removeAll();
			refs.ctlConfirmDischargingCrane.setValue('');
			refs.ctlConfirmDischargingWhQty.setReadOnly(true);
			refs.ctlConfirmDischargingWhMt.setReadOnly(true);
			refs.ctlConfirmDischargingWhM3.setReadOnly(true);
			refs.ctlConfirmDischargingAprQty.setReadOnly(true);
			refs.ctlConfirmDischargingAprMt.setReadOnly(true);
			refs.ctlConfirmDischargingAprM3.setReadOnly(true);
			
			refs.ctlIndirectOperation.setValue(!newValue);
			refs.ctlApronOperation.setValue(!newValue);
			
			//Barge
			refs.ctlBargeOperationVB.setValue(!newValue);
			refs.ctlBargeOperationAB.setValue(!newValue);
			
			if(detailItem.get('projectCargo') == 'Y'){				
				refs.ctlConfirmDischargingLoadQty.setAllowBlank(false);
				refs.ctlConfirmDischargingLoadMt.setAllowBlank(false);
				refs.ctlConfirmDischargingLoadQty.setReadOnly(false);
				refs.ctlConfirmDischargingLoadMt.setReadOnly(true);
				refs.ctlConfirmDischargingLoadM3.setReadOnly(true);
			}
		} else if(control == refs.ctlIndirectOperation && refs.ctlIndirectOperation.checked){
			//Change VA check status when select radio button or not
			detailItem.set("vaCheck", 'Y');
			refs.txtInternalTruckNo.allowBlank = false;
			
			detailItem.set('vaLorryNo', detailItem.get('internalLorryNo'));
			detailItem.set('abLorryNo', '');
			
			me.getViewModel().setData({directMode:!newValue});
			me.getViewModel().setData({apronMode:!newValue});
			me.getViewModel().setData({indirectMode:newValue});
			me.updateRecordWithNoCommit(detailItem, clearItem, ['loadQty', 'loadMt', 'loadM3', 'aprQty' , 'aprM3' , 'aprMt', 'aprQty', 'aprMt', 'aprM3']);
			refs.ctlConfirmDischargingLorryNo.setEditableControl(false);
			refs.ctlConfirmDischargingApronLorryNo.setEditableControl(false);
			refs.ctlConfirmDischargingLorryNo.setValue('');
			refs.ctlConfirmDischargingApronLorryNo.setValue('');
			if(refs.refCargoType.getValue() == CodeConstants.MT_CGTP_BBK){
				if(detailItem.get('projectCargo') == 'N'){				
					refs.ctlConfirmDischargingWhQty.setAllowBlank(false);
					refs.ctlConfirmDischargingWhMt.setAllowBlank(true);
					refs.ctlConfirmDischargingWhQty.setReadOnly(false);
					refs.ctlConfirmDischargingWhMt.setReadOnly(true);
					refs.ctlConfirmDischargingWhM3.setReadOnly(true);
				}else{
					refs.ctlConfirmDischargingWhQty.setAllowBlank(false);
					refs.ctlConfirmDischargingWhMt.setAllowBlank(false);
					refs.ctlConfirmDischargingWhQty.setReadOnly(false);
					refs.ctlConfirmDischargingWhMt.setReadOnly(true);
					refs.ctlConfirmDischargingWhM3.setReadOnly(true);
				}
			}else{
				refs.ctlConfirmDischargingWhQty.setAllowBlank(true);
				refs.ctlConfirmDischargingWhMt.setAllowBlank(false);
				refs.ctlConfirmDischargingWhQty.setReadOnly(false);
				refs.ctlConfirmDischargingWhMt.setReadOnly(false);
				refs.ctlConfirmDischargingWhM3.setReadOnly(false);
			}

			if(me.eqFacNo != ''){
				var craneStore = me.getStore('confirmDischargingCraneCombo');
				craneStore.removeAll();
				craneStore.insert(0, {eqFacNo:me.eqFacNo});
				craneStore.commitChanges();
				refs.ctlConfirmDischargingCrane.setValue(me.eqFacNo);
			}
			
			refs.ctlConfirmDischargingLoadQty.setReadOnly(true);
			refs.ctlConfirmDischargingLoadMt.setReadOnly(true);
			refs.ctlConfirmDischargingLoadM3.setReadOnly(true);
			refs.ctlConfirmDischargingAprQty.setReadOnly(true);
			refs.ctlConfirmDischargingAprMt.setReadOnly(true);
			refs.ctlConfirmDischargingAprM3.setReadOnly(true);
			refs.ctlDirectOperation.setValue(!newValue);
			refs.ctlApronOperation.setValue(!newValue);
			
			//Barge
			refs.ctlBargeOperationVB.setValue(!newValue);
			refs.ctlBargeOperationAB.setValue(!newValue);
		}else  if(control == refs.ctlApronOperation  && refs.ctlApronOperation.checked){
			me.getViewModel().setData({apronMode:newValue});
			me.getViewModel().setData({directMode:!newValue});
			me.getViewModel().setData({indirectMode:!newValue});
			me.updateRecordWithNoCommit(detailItem, clearItem, ['loadQty', 'loadMt', 'loadM3', 'whQty', 'whWgt', 'whM3', 'aprQty', 'aprMt', 'aprM3', 'vbQty', 'vbMt', 'vbM3']);
			refs.ctlConfirmDischargingLorryNo.setEditableControl(false);
			refs.ctlConfirmDischargingApronLorryNo.setEditableControl(true);
			refs.ctlConfirmDischargingLorryNo.setValue('');
			if(refs.refCargoType.getValue() == CodeConstants.MT_CGTP_BBK){
				refs.ctlConfirmDischargingAprQty.setAllowBlank(false);
				refs.ctlConfirmDischargingAprMt.setAllowBlank(true);
				refs.ctlConfirmDischargingAprQty.setReadOnly(false);
				refs.ctlConfirmDischargingAprMt.setReadOnly(true);
				refs.ctlConfirmDischargingAprM3.setReadOnly(true);
			}else{
				refs.ctlConfirmDischargingAprQty.setAllowBlank(true);
				refs.ctlConfirmDischargingAprMt.setAllowBlank(false);
				refs.ctlConfirmDischargingAprQty.setReadOnly(false);
				refs.ctlConfirmDischargingAprMt.setReadOnly(false);
				refs.ctlConfirmDischargingAprM3.setReadOnly(false);
			}
			var craneStore = me.getStore('confirmDischargingCraneCombo');
			craneStore.removeAll();
			refs.ctlConfirmDischargingCrane.setValue('');
			refs.ctlConfirmDischargingLoadQty.setReadOnly(true);
			refs.ctlConfirmDischargingLoadMt.setReadOnly(true);
			refs.ctlConfirmDischargingLoadM3.setReadOnly(true);
			refs.ctlConfirmDischargingWhQty.setReadOnly(true);
			refs.ctlConfirmDischargingWhMt.setReadOnly(true);
			refs.ctlConfirmDischargingWhM3.setReadOnly(true);
			refs.ctlDirectOperation.setValue(!newValue);
			refs.ctlIndirectOperation.setValue(!newValue);
			
			//Barge
			refs.ctlBargeOperationVB.setValue(!newValue);
			refs.ctlBargeOperationAB.setValue(!newValue);
		} else if(control == refs.ctlBargeOperationVB && refs.ctlBargeOperationVB.checked){
			me.updateRecordWithNoCommit(detailItem, clearItem, ['loadQty', 'loadMt', 'loadM3', 'whQty', 'whWgt', 'whM3', 'aprQty', 'aprMt', 'aprM3', 'vbQty', 'vbMt', 'vbM3']);
			refs.txtInternalTruckNo.allowBlank = true;
			if(refs.refCargoType.getValue() == CodeConstants.MT_CGTP_BBK){
				if(detailItem.get('projectCargo') == 'N'){				
					refs.ctlConfirmDischargingVslBargeQty.setAllowBlank(false);
					refs.ctlConfirmDischargingVslBargeMt.setAllowBlank(true);
					refs.ctlConfirmDischargingVslBargeQty.setReadOnly(false);
					refs.ctlConfirmDischargingVslBargeMt.setReadOnly(true);
					refs.ctlConfirmDischargingVslBargeM3.setReadOnly(true);
				}else{
					refs.ctlConfirmDischargingVslBargeQty.setAllowBlank(false);
					refs.ctlConfirmDischargingVslBargeMt.setAllowBlank(false);
					refs.ctlConfirmDischargingVslBargeQty.setReadOnly(true);
					refs.ctlConfirmDischargingVslBargeMt.setReadOnly(true);
					refs.ctlConfirmDischargingVslBargeM3.setReadOnly(true);
				}
			}else {
				refs.ctlConfirmDischargingVslBargeMt.setAllowBlank(false);
				refs.ctlConfirmDischargingVslBargeQty.setAllowBlank(true);
				refs.ctlConfirmDischargingVslBargeQty.setReadOnly(false);
				refs.ctlConfirmDischargingVslBargeMt.setReadOnly(false);
				refs.ctlConfirmDischargingVslBargeM3.setReadOnly(false);
			}
			
			refs.ctlDirectOperation.setValue(!newValue);
			refs.ctlIndirectOperation.setValue(!newValue);
			refs.ctlBargeOperationAB.setValue(!newValue);
			
		} else if(control == refs.ctlBargeOperationAB && refs.ctlBargeOperationAB.checked){
			detailItem.set('abLorryNo', detailItem.get('internalLorryNo'));
			detailItem.set('vaLorryNo', '');
			
			//Change AB check status when select radio button or not
			detailItem.set("abCheck", 'Y');
			
			me.updateRecordWithNoCommit(detailItem, clearItem, ['loadQty', 'loadMt', 'loadM3', 'whQty', 'whWgt', 'whM3', 'aprQty', 'aprMt', 'aprM3', 'vbQty', 'vbMt', 'vbM3']);
			refs.txtInternalTruckNo.allowBlank = true;
			if(refs.refCargoType.getValue() == CodeConstants.MT_CGTP_BBK){
				if(detailItem.get('projectCargo') == 'N'){				
					refs.ctlConfirmDischargingAprBargeQty.setAllowBlank(false);
					refs.ctlConfirmDischargingAprBargeMt.setAllowBlank(true);
					refs.ctlConfirmDischargingAprBargeQty.setReadOnly(false);
					refs.ctlConfirmDischargingAprBargeMt.setReadOnly(true);
					refs.ctlConfirmDischargingAprBargeM3.setReadOnly(true);
				}else{
					refs.ctlConfirmDischargingAprBargeQty.setAllowBlank(false);
					refs.ctlConfirmDischargingAprBargeMt.setAllowBlank(true);
					refs.ctlConfirmDischargingAprBargeQty.setReadOnly(false);
					refs.ctlConfirmDischargingAprBargeMt.setReadOnly(false);
					refs.ctlConfirmDischargingAprBargeM3.setReadOnly(false);
				}
			}else {
				refs.ctlConfirmDischargingAprBargeMt.setAllowBlank(false);
				refs.ctlConfirmDischargingAprBargeQty.setAllowBlank(true);
				refs.ctlConfirmDischargingAprBargeQty.setReadOnly(false);
				refs.ctlConfirmDischargingAprBargeMt.setReadOnly(false);
				refs.ctlConfirmDischargingAprBargeM3.setReadOnly(false);
			}
			
			refs.ctlDirectOperation.setValue(!newValue);
			refs.ctlIndirectOperation.setValue(!newValue);
			refs.ctlBargeOperationVB.setValue(!newValue);
		}
		
	},
	
	onDimension_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		me.openCodePopup('app-dimensioncheckregistration', 'btnDimension', me.prevData);
	},
	
	onDamage_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		me.prevData.set('locCd', 'VSL')
		me.prevData.set('isOperationScreen', true)
		me.openCodePopup('app-damagecheckregistration', 'btnDamage', me.prevData);
	},
	
	onHangingScaleFetch_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.prevData;
		var detailItem = me.getViewModel().get('theDetail');
		
		if(refs.ctlBargeOperationVB.checked) {
			var store = me.getStore('hangingScaleFetchingItems');
			store.load({
				params:{
					vslCallId	: detailItem.get('vslCallId'),
					mfDocId 	: detailItem.get('mfDocId'),
					blNo 		: detailItem.get('blNo'),
					sdoNo 		: detailItem.get('sdoNo'),
					
				},
				callback: function(records, operation, success) {
					if (success) {
						me.hangingScaleItems = new Array();
						
						if(records.length > 0) {
							
							for (var i=0; i<records.length; i++){
								me.hangingScaleItems.push(records[i].data);
							}
							
							refs.ctlConfirmDischargingVslBargeQty.setValue(records[0].get('pkgQty'));
							refs.ctlConfirmDischargingVslBargeMt.setValue(records[0].get('cgWgt'));
							refs.ctlConfirmDischargingVslBargeM3.setValue(records[0].get('cgVol'));
						}
					}
				}
			});
		}
	},
	
	onQtyChange: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var qty = 0;
		var balanceQty = 0;
		var eachVol = Number(detailItem.get('eachVol')).toFixed(3);
		var eachWgt = Number(detailItem.get('eachWgt')).toFixed(3);
		var refsQty = '';
		var refsMt = '';
		var refsM3 = '';

		// if(detailItem.get('projectCargo') == '' || detailItem.get('projectCargo') == null || detailItem.get('projectCargo') == 'N'){			
			if(refs.ctlIndirectOperation.checked){
				balanceQty = Number(refs.refBalanceQty.getValue());
				qty = Number(refs.ctlConfirmDischargingWhQty.getValue());
				refsQty = refs.ctlConfirmDischargingWhQty;
				refsMt = refs.ctlConfirmDischargingWhMt;
				refsM3 = refs.ctlConfirmDischargingWhM3;
				refs.ctlConfirmDischargingWhMt.setValue(0);
				refs.ctlConfirmDischargingWhM3.setValue(0);
			}else if(refs.ctlDirectOperation.checked){
				balanceQty = Number(refs.refBalanceQty.getValue());
				qty = Number(refs.ctlConfirmDischargingLoadQty.getValue());
				refsQty = refs.ctlConfirmDischargingLoadQty;
				refsMt = refs.ctlConfirmDischargingLoadMt;
				refsM3 = refs.ctlConfirmDischargingLoadM3;
				refs.ctlConfirmDischargingLoadMt.setValue(0);
				refs.ctlConfirmDischargingLoadM3.setValue(0);
			}else if(refs.ctlBargeOperationVB.checked){//Vessel to Barge
				balanceQty = Number(refs.refBalanceQty.getValue());
				qty = Number(refs.ctlConfirmDischargingVslBargeQty.getValue());
				refsQty = refs.ctlConfirmDischargingVslBargeQty;
				refsMt = refs.ctlConfirmDischargingVslBargeMt;
				refsM3 = refs.ctlConfirmDischargingVslBargeM3;
				refs.ctlConfirmDischargingVslBargeMt.setValue(0);
				refs.ctlConfirmDischargingVslBargeM3.setValue(0);
			}else if(refs.ctlBargeOperationAB.checked){//Apron to Barge
				balanceQty = Number(refs.ctlConfirmDischargingAQty.getValue());
				qty = Number(refs.ctlConfirmDischargingAprBargeQty.getValue());
				refsQty = refs.ctlConfirmDischargingAprBargeQty;
				refsMt = refs.ctlConfirmDischargingAprBargeMt;
				refsM3 = refs.ctlConfirmDischargingAprBargeM3;
//			refs.ctlConfirmDischargingAprBargeMt.setValue(0);
//			refs.ctlConfirmDischargingAprBargeM3.setValue(0);
			}else{
				balanceQty = Number(refs.ctlConfirmDischargingAQty.getValue());
				qty = Number(refs.ctlConfirmDischargingAprQty.getValue());
				refsQty = refs.ctlConfirmDischargingAprQty;
				refsMt = refs.ctlConfirmDischargingAprMt;
				refsM3 = refs.ctlConfirmDischargingAprM3;
				refs.ctlConfirmDischargingAprMt.setValue(0);
				refs.ctlConfirmDischargingAprM3.setValue(0);
			}
			
			
			if(qty - balanceQty > 0){
				//refsQty.setValue(0);
				if(refs.ctlApronOperation.checked
						|| refs.ctlBargeOperationAB.checked){
					if(detailItem.get('cgTpCd') === CodeConstants.MT_CGTP_BBK){
						refsQty.setValue(0);
						MessageUtil.warning('warning_msg', 'confirmdischarging_qty_afron_exceed_msg');
					}
					
				}else{
					if(detailItem.get('cgTpCd') === CodeConstants.MT_CGTP_BBK){
						refsQty.setValue(0);
						MessageUtil.warning('warning_msg', 'confirmdischarging_qty_exceed_msg');
					}
				}
				return;
			}
			
			if(refs.refCargoType.getValue() == CodeConstants.MT_CGTP_BBK){			
				
				var mt = eachWgt * qty;
				var m3 = eachVol * qty;
				
				refsMt.setValue(mt);
				refsM3.setValue(m3);
				
			}
		// }
	},
	
	onMtChange: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var mt = 0;
		var refsMt;
		var balanceMt = 0;

		balanceMt = Number(refs.refBalanceMT.getValue()).toFixed(3);
		
		if(refs.ctlIndirectOperation.checked){
			mt = Number(refs.ctlConfirmDischargingWhMt.getValue()).toFixed(3);
			refsMt = refs.ctlConfirmDischargingWhMt;

		}else if(refs.ctlDirectOperation.checked){
			mt = Number(refs.ctlConfirmDischargingLoadMt.getValue()).toFixed(3);
			refsMt = refs.ctlConfirmDischargingLoadMt;

		}else if(refs.ctlBargeOperationVB.checked){//Vessel to Barge
			mt = Number(refs.ctlConfirmDischargingVslBargeMt.getValue()).toFixed(3);
			refsMt = refs.ctlConfirmDischargingVslBargeMt;

		}else if(refs.ctlBargeOperationAB.checked){//Apron to Barge
			balanceMt = Number(refs.ctlConfirmDischargingAMt.getValue()).toFixed(3);
			mt = Number(refs.ctlConfirmDischargingAprBargeMt.getValue()).toFixed(3);
			refsMt = refs.ctlConfirmDischargingAprBargeMt;

		}else{
			balanceMt = Number(refs.ctlConfirmDischargingAMt.getValue()).toFixed(3);
			mt =Number(refs.ctlConfirmDischargingAprMt.getValue()).toFixed(3);
			refsMt = refs.ctlConfirmDischargingAprMt;
		}
		
	},

	onM3Change: function(ref){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var m3 = 0;
		var refsMt;
		var balanceM3 = 0;
		
		balanceM3 = Number(refs.refBalanceM3.getValue()).toFixed(3);
		
		if(refs.ctlIndirectOperation.checked){
			m3 = Number(refs.ctlConfirmDischargingWhM3.getValue()).toFixed(3);

		}else if(refs.ctlDirectOperation.checked){
			m3 = Number(refs.ctlConfirmDischargingLoadM3.getValue()).toFixed(3);

		}else if(refs.ctlBargeOperationVB.checked){//Vessel to Barge
			m3 = Number(refs.ctlConfirmDischargingVslBargeM3.getValue()).toFixed(3);

		}else if(refs.ctlBargeOperationAB.checked){//Apron to Barge
			balanceM3 = Number(refs.ctlConfirmDischargingAM3.getValue()).toFixed(3);
			m3 = Number(refs.ctlConfirmDischargingAprBargeM3.getValue()).toFixed(3);

		}else{
			balanceM3 = Number(refs.ctlConfirmDischargingAM3.getValue()).toFixed(3);
			m3 = Number(refs.ctlConfirmDischargingAprM3.getValue()).toFixed(3);
		}
	},
	
	onCargoTypeChange: function(){
		var me = this;
		var refs = me.getReferences();
		
		if(refs.refCargoType.getValue() == CodeConstants.MT_CGTP_BBK){
			if(refs.ctlIndirectOperation.checked){
				refs.ctlConfirmDischargingWhQty.setAllowBlank(false);
				refs.ctlConfirmDischargingWhMt.setAllowBlank(true);
				refs.ctlConfirmDischargingWhQty.setReadOnly(false);
				refs.ctlConfirmDischargingWhMt.setReadOnly(true);
				refs.ctlConfirmDischargingWhM3.setReadOnly(true);
			}else if(refs.ctlDirectOperation.checked){
				refs.ctlConfirmDischargingLoadQty.setAllowBlank(false);
				refs.ctlConfirmDischargingLoadMt.setAllowBlank(true);
				refs.ctlConfirmDischargingLoadQty.setReadOnly(false);
				refs.ctlConfirmDischargingLoadMt.setReadOnly(true);
				refs.ctlConfirmDischargingLoadM3.setReadOnly(true);
			}else if(refs.ctlApronOperation.checked){
				refs.ctlConfirmDischargingAprQty.setAllowBlank(false);
				refs.ctlConfirmDischargingAprMt.setAllowBlank(true);
				refs.ctlConfirmDischargingAprQty.setReadOnly(false);
				refs.ctlConfirmDischargingAprMt.setReadOnly(true);
				refs.ctlConfirmDischargingAprM3.setReadOnly(true);
			}
			
		}else{
			if(refs.ctlIndirectOperation.checked){
				refs.ctlConfirmDischargingWhMt.setAllowBlank(false);
				refs.ctlConfirmDischargingWhQty.setReadOnly(false);
				refs.ctlConfirmDischargingWhMt.setReadOnly(false);
				refs.ctlConfirmDischargingWhM3.setReadOnly(false);
			}else if(refs.ctlDirectOperation.checked){
				refs.ctlConfirmDischargingLoadMt.setAllowBlank(false);
				refs.ctlConfirmDischargingLoadQty.setReadOnly(false);
				refs.ctlConfirmDischargingLoadMt.setReadOnly(false);
				refs.ctlConfirmDischargingLoadM3.setReadOnly(false);
			}else if(refs.ctlApronOperation.checked){
				refs.ctlConfirmDischargingAprMt.setAllowBlank(false);
				refs.ctlConfirmDischargingAprQty.setReadOnly(false);
				refs.ctlConfirmDischargingAprMt.setReadOnly(false);
				refs.ctlConfirmDischargingAprM3.setReadOnly(false);
			}
			
		}
	},
	
	onCancel:function(){
		var me = this;
		var window = me.getView().up('window');
		
		window.close();
	},
	
	// Detail Save
	onSave:function(){
		var me = this;
		var refs = me.getReferences();
		var infoForm = me.getView().form;
		
		if(infoForm.isValid()){
			me.prevSaveCheck();
		} else {
			MessageUtil.mandatoryFieldInValid();
		}
	},
	
	onVesselDelay_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
					
		var recvData = {
				vslCallId: detailItem.get('vslCallId')
			};
		
		me.loadMenuView('app-vesseldelay', recvData);
	},

	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	setDetailInitialize:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var parentRefs = me.getParentView().getReferences();
		var recvData = me.prevData;
		if(masterItem.get('items') != null && masterItem.get('items').length > 0){
			var detailItem = Ext.create('MOST.model.operation.CargoDischarging');
			var hatchNoIsSet = parentRefs.refCboHatchNo.getValue();
			DateUtil.convertDateToLong(masterItem.get('items')[0], ['startDt', 'endDt']); // date to long
			
			masterItem.get('items')[0].lorryId = '';
			detailItem.data = masterItem.get('items')[0];

			me.prevData.set('vslCallId', detailItem.get('vslCallId'))
			me.prevData.set('vslCd', detailItem.get('vslCd'))
			me.prevData.set('scn', detailItem.get('scn'))
			me.prevData.set('callSeq', detailItem.get('callSeq'))
			me.prevData.set('callYear', detailItem.get('callYear'))
			
			detailItem.set('bargeCheck', recvData.get('bargeCheck'));
			detailItem.set('fnlOpeYn', recvData.get('fnlOpeYn'));
			detailItem.set('cgNo', detailItem.get('blNo'));
			
			detailItem.set('gateTxnNo', recvData.get('gateTxnNo'));
			detailItem.set('wbTransactionNo', recvData.get('wbTransactionNo')); 
			detailItem.set('workYmd', masterItem.get('workYmd'));
			//sMantis: 0178278
			if(StringUtil.isNullorEmpty(detailItem.get('hatchNo'))) {
				detailItem.set('hatchNo', hatchNoIsSet);
			}
			//eMantis: 0178278
			detailItem.phantom = false; // UPDATE
			detailItem.commit();
			me.getViewModel().setData({theDetail:detailItem});
			me.getView().recvData = detailItem;

			if(masterItem.get('items')[0].delvTpCd == 'I'){
				refs.ctlIndirectOperation.setValue(true);
				refs.refCtnLorryOperationVA.setDisabled(false);
				refs.refCtnLorryOperationVG.setDisabled(true);
				refs.ctlApronOperation.setDisabled(true);
				detailItem.set('dqty', 0);
				detailItem.set('dmt', 0);
				detailItem.set('dm3', 0);
				
				detailItem.set('aqty', 0);
				detailItem.set('amt', 0);
				detailItem.set('am3', 0);
				
				//Barge
				refs.refCtnBargeOperationVB.setDisabled(true);
				refs.refCtnBargeOperationAB.setDisabled(true);
				
			}else{
				if(detailItem.get('doNo') == null ||  detailItem.get('doNo') == ''){
					refs.ctlIndirectOperation.setValue(true);
					
					//Barge
					refs.refCtnBargeOperationVB.setDisabled(true);
					refs.refCtnBargeOperationAB.setDisabled(true);
					
				}else{
					//SEA >> Barge Operation
					if(!StringUtil.isNullorEmpty(detailItem.get('sdoNo'))
							&& recvData.get('bargeCheck') == 'Y') {
						if(detailItem.get('tsptTpCd') == CodeConstants.CGMST_TSPT_TP_SE)
						{
							refs.ctlDirectOperation.setValue(false);
							
							refs.refCtnLorryOperationVG.setDisabled(true);
							refs.refCtnLorryOperationVA.setDisabled(false);
							
							refs.refCtnBargeOperationVB.setDisabled(false);							
							//Auto check to VB radio when load with Barge Operation
							refs.ctlBargeOperationVB.setValue(true);
							refs.refCtnBargeOperationAB.setDisabled(false);
						}
					}
					else {
						refs.ctlDirectOperation.setValue(true);
						refs.refCtnLorryOperationVG.setDisabled(false);
						refs.refCtnLorryOperationVA.setDisabled(false);
						
						refs.refCtnBargeOperationVB.setDisabled(true);
						refs.refCtnBargeOperationAB.setDisabled(true);
					}					
				}			
			}
			
			me.getDeployedEquipmentNoList();
		}
	},
	
	//// operationSetting ADP set Hatch:
	operationSetting : function(startDtStr, endDtStr){
		var me = this;
     	var recvData = me.prevData;
     	var refs = me.getReferences();
		var theDetail = me.getViewModel().get('theDetail');
		
		if (startDtStr && endDtStr) {
		    theDetail.set('startDt', new Date(startDtStr));
		    theDetail.set('endDt', new Date(endDtStr));
		} else {
		    theDetail.set('startDt', null); 
		    theDetail.set('endDt', null); 
		}

		if(recvData.get('truckType') === 'I'){
			theDetail.set('internalLorryNo', recvData.get('lorryNo'));
		}else{
			theDetail.set('externalLorryNo', recvData.get('lorryNo'));
		}
		
		if(theDetail.get('projectCargo') == 'Y'){				
			refs.ctlConfirmDischargingLoadQty.setAllowBlank(false);
			refs.ctlConfirmDischargingLoadMt.setAllowBlank(false);
			refs.ctlConfirmDischargingLoadQty.setReadOnly(false);
			refs.ctlConfirmDischargingLoadMt.setReadOnly(true);
			refs.ctlConfirmDischargingLoadM3.setReadOnly(true);
		}
		
		/*if(recvData.get('cgTpCd') !== CodeConstants.MT_CGTP_BBK
				&& recvData.get('cgTpCd') !== CodeConstants.MT_CGTP_DBN && recvData.get('cgTpCd') !== CodeConstants.MT_CGTP_LQN){
			MessageUtil.warning('warning_msg', 'ConfirmDischarging_can_not_operation_msg', recvData.get('cgTpCd'));
			var window = me.getView().up('window');
			window.close();
		}*/
	},
	
	validateAndAdjustDate: function(dateStr, operation = null, unit = null, amount = 0, dateFormat = "DD/MM/YYYY") {
	    let day, month, year;
	    
	    if(dateFormat === "DD/MM/YYYY"){
	    	[day, month, year] = dateStr.split("/").map(Number);
	    } else if (dateFormat === "YYYYMMDD") {
	        year = Number(dateStr.slice(0, 4));
	        month = Number(dateStr.slice(4, 6));
	        day = Number(dateStr.slice(6, 8));
	    }
	    
	    if (isNaN(day) || isNaN(month) || isNaN(year)) {
	        return false;
	    }

	    let date = new Date(year, month - 1, day);

	    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
	        return false;
	    }

	    if (operation && unit && amount) {
	        switch (unit) {
	            case "day":
	                date.setDate(date.getDate() + (operation === "increase" ? amount : -amount));
	                break;
	            case "month":
	                date.setMonth(date.getMonth() + (operation === "increase" ? amount : -amount));
	                break;
	            case "year":
	                date.setFullYear(date.getFullYear() + (operation === "increase" ? amount : -amount));
	                break;
	            default:
	                return false;
	        }
	    }

	    const adjustedDay = String(date.getDate()).padStart(2, '0');
	    const adjustedMonth = String(date.getMonth() + 1).padStart(2, '0');
	    const adjustedYear = date.getFullYear();

	    return `${adjustedMonth}/${adjustedDay}/${adjustedYear}`;
	},
	
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var recvData = me.getView().recvData;
     	
     	var dateStr = recvData.get('shftDtFromCbbx');
     	var shift = recvData.get('shftCdFromCbbx');
     	
     	if (shift) {
     		if(shift.includes('1ST')){
            	var start = me.validateAndAdjustDate(dateStr, null, null, 0, "YYYYMMDD") + ' 07:00';
            	var end = me.validateAndAdjustDate(dateStr, null, null, 0, "YYYYMMDD") + ' 14:59';
            } else if(shift.includes('2ND')){
            	var start = me.validateAndAdjustDate(dateStr, null, null, 0, "YYYYMMDD") + ' 15:00';
            	var end = me.validateAndAdjustDate(dateStr, null, null, 0, "YYYYMMDD") + ' 22:59';
            } else if (shift.includes('3RD')){
            	var start = me.validateAndAdjustDate(dateStr, null, null, 0, "YYYYMMDD") + ' 23:00';
            	var end = me.validateAndAdjustDate(dateStr, "increase", "day", 1, "YYYYMMDD") + ' 06:59';
            }
     	}
     	
        //Get shift from Shift Date combo box:
        var startDate = '';
		var endDate = '';
        if (start != null && start !== '') {
			startDate = Ext.Date.format(new Date(start), 'm/d/Y H:i');
		}
		if (end != null && end !== '') {
			endDate = Ext.Date.format(new Date(end), 'm/d/Y H:i');
		}

    	var params = {
			vslCallId : recvData.get('vslCallId'),
			cgTpCd : recvData.get('cgTpCd'),
			startDtStr: startDate,
			endDtStr: endDate,
			blNo : recvData.get('blNo'),
			searchType : recvData.get('bargeCheck') == 'Y' ? 'BARGE' : 'discharging',
			gateTxnNo: recvData.get('gateTxnNo'),
			sdoNo: recvData.get('sdoNo'),
			hhtFlags : '1STLD',
			workYmd : dateStr
		};
    	
    	return params;
	},
	
	// save
	save: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var recvData = me.prevData;

		var totalMt = detailItem.get('loadMt'); 
		var totalQty = detailItem.get('loadQty');
		var balMt = detailItem.get('balMt'); 
		var balQty = detailItem.get('balQty');
		
		if(detailItem.get('jobPurpCd') == 'AB'){
			balMt = detailItem.get('amt'); 
			balQty = detailItem.get('aqty');
		}
		
		if(detailItem.get('cgTpCd') !=  null 
				&& detailItem.get('cgTpCd') == CodeConstants.MT_CGTP_BBK){
			if (totalQty == balQty){
				MessageUtil.question('info_msg', 'confirmdischarging_isfinalope_msg', null, // CT1210060001 
					function(button){
						if(button == 'ok'){
							detailItem.set('fnlOpeYn', 'Y');
						}else{
							detailItem.set('fnlOpeYn', 'N');
						}
						me.cudData();
					}
				);
			}
			else{
				detailItem.set('fnlOpeYn', 'N');
				me.cudData();
			}
			
		}else {
			if (totalMt > balMt){
				MessageUtil.question('info_msg', 'balValidation_msg', null,
						function(button){
							if(button == 'ok'){
								MessageUtil.question('info_msg', 'confirmdischarging_isfinalope_msg', null, // CT1210060001 
										function(button){
											if(button == 'ok'){
												detailItem.set('fnlOpeYn', 'Y');
											}else{
												detailItem.set('fnlOpeYn', 'N');
											}
											me.cudData();
										}
									);
							}
						}
					);
				
				
			}else{
				detailItem.set('fnlOpeYn', 'N');
				me.cudData();
			}
		}
	},

	// cudData
	cudData : function(){
		var me = this;
		var window = me.getView().up('window');
		var parentView = me.getParentView();
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var damageCheckDetail = me.getStore('damageCheckDetail')

		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = me.CARGO_DISCHARGING_PROXY_URL;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('item', detailItem.data);
		updateParm.save({
			callback: function(record, operation, success) {
				if(success){
					me.saveDimension(record);
					detailItem.commit();
					// me.saveDamage(record);
					if(damageCheckDetail.getCount() > 0){
						me.checkDamageCheck(record)
					}else{
						MessageUtil.saveSuccess(); // Success Message
						me.onLoad();
						if(parentView.getController().onSearch){
							if(parentView.getController().onCallBackFromOperationScreen){
								parentView.getController().onCallBackFromOperationScreen();
							}
							
							parentView.getController().onSearch();
						}
						window.close(); 
					}
				}
			}
		});
	},
	
	getDeployedEquipmentNoList: function(){
		var me = this;
		var refs = me.getReferences();
		var theDetail = me.getViewModel().get('theDetail');
		var store = me.getStore('deployedEquipmentNoList');
		var equipmentStore = me.getStore('confirmDischargingHatchList');
		var hatchStore = me.getStore('confirmDischargingHatchCombo');
		
		equipmentStore.load({
			params: {
				vslCallId 	: theDetail.get('vslCallId'),
				cgTpCd 		: ['DBE', 'DBN'].includes(theDetail.get('cgTpCd')) ? 'DBK' : 'BBK',
				workYmd 	: theDetail.get('workYmd'),
				shftId 		: theDetail.get('shftId')
			},
			callback: function (records, operation, success) {
				if (success) {
					for(i in records){
						var item;
						if(theDetail.get('cgTpCd') == 'DBE' || theDetail.get('cgTpCd') == 'DBN'){
							if(records[i].data.dbkOpHatchList != null && records[i].data.dbkOpHatchList.length > 0){
								item = records[i].data.dbkOpHatchList[0];
							}
						} else {
							if(records[i].data.bbkOpHatchList != null && records[i].data.bbkOpHatchList.length > 0){
								item = records[i].data.bbkOpHatchList[0];
							}
						}
					}
					
					store.load({
//						params: {
//							vslCallId : theDetail.get('vslCallId'),
//						},
						callback: function (records, operation, success) {
							if (success) {
								for(i in records){
									if(item){
										if(item.eqFacNo != null && item.eqFacNo != '' && records[i].data.scd == item.eqFacNo){
											refs.ctlConfirmDischargingEquiptment.setValue(records[i]);
										}
										
										if(item.hatchNo != null && item.hatchNo != ''){
											refs.ctlConfirmDischargingBBKHatchNo.setValue(item.hatchNo);
										}
										if(theDetail.get('projectCargo') == 'Y'){
											refs.ctlConfirmDischargingLoadQty.setAllowBlank(false);
											refs.ctlConfirmDischargingLoadMt.setAllowBlank(false);
											refs.ctlConfirmDischargingLoadQty.setReadOnly(false);
											refs.ctlConfirmDischargingLoadMt.setReadOnly(true);
											refs.ctlConfirmDischargingLoadM3.setReadOnly(true);
										}
									}
								}
							}
						}
					});
				}
			}
		});
	},
	
	saveDimension : function(obj){
		var me = this;
		var refs = me.getReferences();
		var dimensionStore = me.getStore(me.DIMENSION_STORE);
		if(dimensionStore.data.length > 0){
			var item = dimensionStore.data.items[0];
			if(obj){
				item.set('jobNo', obj.get('jobNo'))
			}
			
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			updateParm.getProxy().url = dimensionStore.getProxy().url;
			updateParm.phantom = true;
			updateParm.set('workingStatus', WorkingStatus.INSERT);
			updateParm.set('item', item.data);
			updateParm.save({
				callback: function(record, operation, success) {
					if(success){
						
					}
				}
			});
		}
	},
	
	saveDamage : function(obj){
		var me = this;
		var refs = me.getReferences();
		var damageStore = me.getStore(me.DAMAGE_STORE);
		
		if(damageStore.data.length > 0){
			var insertItem = damageStore.data.items[0];
			var isCreated = true;
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			
			if(obj){
				insertItem.set('jobNo', obj.get('jobNo'))
			}
			
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
				MessageUtil.saveSuccess();
				me.onLoad()
				var parentView = me.getParentView();
				if(parentView.getController().onSearch){
					if(parentView.getController().onCallBackFromOperationScreen){
						parentView.getController().onCallBackFromOperationScreen();
					}
					
					parentView.getController().onSearch();
				}
				var win = me.getView().up('window');
				if (win) {
					win.close();
				}			
			}
		});
		
    },

	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		if(targetControl === 'ctlConfirmDischargingLorryNo'){
			if(returnValue) {
				detailItem.set("lorryId",returnValue.item.get('lorryNo'));
				detailItem.set("lorryNo",returnValue.item.get('lorryNo'));
				detailItem.set("gateTxnNo",returnValue.item.get('gateTxnNo'));
				detailItem.set('sdoNo', returnValue.item.get('sdoNo'));
				detailItem.set('wbTransactionNo', returnValue.item.get('wbTransactionNo'));

				var subDoStore = me.getStore('listOfSubDeliveryOrder');
		
				subDoStore.load({
					params:{
						vslCallId: detailItem.data.vslCallId,
						blno: detailItem.data.blNo,
						doNo: detailItem.data.doNo,
						sdono: detailItem.data.sdoNo
					},
					callback: function(records, operation, success) {
						if (success) {
							var packageStore = me.getStore('packageNoList');
							
							var setChkPtyCdValue = '';
							var cnt = 0;
							var storeTotal = packageStore.data.items.length;
							var selectArray = new Array();
					
							packageStore.load({
								params: {
									vslCallId: detailItem.data.vslCallId,
									blNo: detailItem.data.blNo,
									doNo: detailItem.data.doNo,
									jobPurpCd: records[0].data.delvTpCd == 'D' ? 'VG' : 'AW',
									ixCd: 'I'
								}, 
								callback: function(records, operation, success) {
									if (success) {
										var packageItems = new Array();
										var qty = 0;
										var mt = 0;
										var m3 = 0;
										
										packageStore.each(function(record,idx){
											if(packageStore.data.items.length > cnt){
												
												qty += 1;
												mt += Number(record.get('mt'));
												m3 += Number(record.get('m3'));
												
												if(setChkPtyCdValue === ''){
													setChkPtyCdValue = record.get("packageNo")
												} else {
													setChkPtyCdValue += "," + record.get("packageNo")
												}
												
												var pkgItem = Ext.create('MOST.model.operation.PackageJobItem', {
													vslCallId: record.get('vslCallId'),
													mfDocId : record.get('mfDocId'),
													refNo: record.get('refNo'),
													pkgNo: record.get('packageNo')
												});
												packageItems.push(pkgItem.data);
											}
											cnt++;
										});
										me.packageItems = packageItems;
										refs.ctlConfirmDischargingLoadQty.setValue(qty);
										refs.ctlConfirmDischargingLoadMt.setValue(mt);
										refs.ctlConfirmDischargingLoadM3.setValue(m3);
										refs.ctlConfirmDischargingPackNoCode.setValue(setChkPtyCdValue);
									}
								}
							});
						}
					}
				});
			}
			else {
				detailItem.set("lorryId", '');
				detailItem.set("lorryNo", '');
				detailItem.set("gateTxnNo", '');
				detailItem.set('sdoNo', '');
				detailItem.set('wbTransactionNo', '');
			}
		}
		else if(targetControl === 'txtInternalTruckNo'
				|| targetControl === 'txtABTruckNo'){
			
			if(targetControl === 'txtInternalTruckNo'){		
				detailItem.set('sdoNo', '');
			}
			
			if(targetControl === 'txtABTruckNo'){	
				if((detailItem.get('sdoNo') == null || detailItem.get('sdoNo') == '') 
					&& (me.prevData.get('sdoNo') != null && me.prevData.get('sdoNo') != '')){		
					detailItem.set('sdoNo', me.prevData.get('sdoNo'));
				}
			}
			
			if(returnValue) {
				detailItem.set("abLorryNo",returnValue.item.get('lorryNo'));
				detailItem.set("lorryId",returnValue.item.get('lorryNo'));
				detailItem.set("lorryNo",returnValue.item.get('lorryNo'));
				detailItem.set("gateTxnNo",returnValue.item.get('gateTxnNo'));
				detailItem.set('wbTransactionNo', returnValue.item.get('wbTransactionNo'));
					
				if(targetControl === 'txtABTruckNo') {
					refs.ctlConfirmDischargingAprBargeQty.setValue(returnValue.item.get('pkgQty'));
					refs.ctlConfirmDischargingAprBargeMt.setValue(returnValue.item.get('mt'));
					refs.ctlConfirmDischargingAprBargeM3.setValue(returnValue.item.get('m3'));
				}
			}
			else {
				detailItem.set("lorryId", '');
				detailItem.set("lorryNo", '');
				detailItem.set("gateTxnNo", '');
				detailItem.set('wbTransactionNo', '');
					
				if(targetControl === 'txtABTruckNo') {
					refs.ctlConfirmDischargingAprBargeQty.setValue();
					refs.ctlConfirmDischargingAprBargeMt.setValue();
					refs.ctlConfirmDischargingAprBargeM3.setValue();
				}
			}
		}
		
		else if(targetControl === 'cltPkgNo'){
			if(returnValue){
				var packageItems = new Array();
				for(var i = 0; i < returnValue.item.length; i++){
					var returnItem = returnValue.item[i];
					var pkgItem = Ext.create('MOST.model.operation.PackageJobItem', {
						vslCallId: returnItem.vslCallId,
						mfDocId : returnItem.mfDocId,
						refNo: returnItem.refNo,
						pkgNo: returnItem.packageNo
					});
					packageItems.push(pkgItem.data);
				}
				me.packageItems = packageItems;
				refs.cltPkgNo.setValue(returnValue.code);
			} else {
				me.packageItems = new Array();
				refs.cltPkgNo.setValue();
			}
		}else if(xtype === 'popup-packagenomultipopup'){
			if(returnValue){
				var packageItems = new Array();
				var qty = 0;
				var mt = 0;
				var m3 = 0;
				
				for(select of returnValue.item){
					qty += 1;
					mt += Number(select.mt);
					m3 += Number(select.m3);
					
					var pkgItem = Ext.create('MOST.model.operation.PackageJobItem', {
						vslCallId: select.vslCallId,
						mfDocId : select.mfDocId,
						refNo: select.refNo,
						pkgNo: select.packageNo
					});
					packageItems.push(pkgItem.data);
				}
				me.packageItems = packageItems;
				
				if(refs.ctlIndirectOperation.checked){
					refs.ctlConfirmDischargingWhQty.setValue(qty);
					refs.ctlConfirmDischargingWhMt.setValue(mt);
					refs.ctlConfirmDischargingWhM3.setValue(m3);
				} else if(refs.ctlDirectOperation.checked){
					refs.ctlConfirmDischargingLoadQty.setValue(qty);
					refs.ctlConfirmDischargingLoadMt.setValue(mt);
					refs.ctlConfirmDischargingLoadM3.setValue(m3);
				} else if(refs.ctlBargeOperationVB.checked){
					refs.ctlConfirmDischargingVslBargeQty.setValue(qty);
					refs.ctlConfirmDischargingVslBargeMt.setValue(mt);
					refs.ctlConfirmDischargingVslBargeM3.setValue(m3);
				} else if(refs.ctlBargeOperationAB.checked){
					refs.ctlConfirmDischargingAprBargeQty.setValue(qty);
					refs.ctlConfirmDischargingAprBargeMt.setValue(mt);
					refs.ctlConfirmDischargingAprBargeM3.setValue(m3);
				}
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
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	/**
	 * VALIDATION METHOD START
	 * =========================================================================================================================
	 */
	//Mandantory check
	prevSaveCheck : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		if(detailItem.get('fnlDis') === 'Y'){
			MessageUtil.warning('warning_msg', 'confirmdischarging_final_operation_msg'); // CT1210060004
			return;
		}
		
		// Forklift & Prime Mover
		if(refs.ctlConfirmDischargingForklift.getValue() != '' || refs.ctlConfirmDischargingForklift.getValue() != null) {
			detailItem.set('forkliftNo', refs.ctlConfirmDischargingForklift.getValue());
		}
		
		if(refs.ctlConfirmDischargingPrime.getValue() != '' || refs.ctlConfirmDischargingPrime.getValue() != null) {
			detailItem.set('primeNo', refs.ctlConfirmDischargingPrime.getValue());
		}
		
		//Hatch No
		if(StringUtil.isNullorEmpty(detailItem.get('hatchNo'))
				&& !refs.ctlBargeOperationAB.checked){
			MessageUtil.warning('warning_msg', 'confirmloading_hatch_no_empty_msg');
			return;
		}
		
		
		//Barge No
		if(refs.ctlBargeOperationVB.checked){
			if(refs.ctlBargeNoVB.getValue() == ''){
				MessageUtil.warning('warning_msg', 'confirmdischarging_input_bargeNo');
				return;
			}
		}
		if(refs.ctlBargeOperationAB.checked){
			if(refs.ctlBargeNoAB.getValue() == ''){
				MessageUtil.warning('warning_msg', 'confirmdischarging_input_bargeNo');
				return;
			}
		}
		
		if(refs.ctlDirectOperation.checked
				|| refs.ctlBargeOperationVB.checked
				|| refs.ctlBargeOperationAB.checked){
			if(detailItem.get('doNo') != null &&  detailItem.get('doNo') != ''){
				if(detailItem.get('delvTpCd') == null ||
					detailItem.get('delvTpCd') == '' ||
					detailItem.get('delvTpCd') == 'I'){
					MessageUtil.warning('warning_msg', 'confirmdischarging_direct_case_msg'); // CT1210060008
					return;
				}
				if(refs.ctlDirectOperation.checked && refs.ctlConfirmDischargingLorryNo.getValue() == '' && detailItem.get('tsptTpCd') === 'LR'){
					MessageUtil.warning('warning_msg', 'confirmdischarging_lorry_empty_msg'); // CT1210060010
					return;
				}
			}else{
				MessageUtil.warning('warning_msg', 'confirmdischarging_do_require_msg'); // CT1210060007
				return;
			}
			if(detailItem.get('cgTpCd') == 'LQD'){
				if(detailItem.get('tsptTpCd') === 'PL'){
					if(Number(detailItem.get('loadQty')) > Number(detailItem.get('dqty'))
						|| Number(detailItem.get('loadMt')) > Number(detailItem.get('dmt'))
						|| Number(detailItem.get('loadM3')) > Number(detailItem.get('dm3'))){  
						MessageUtil.warning('warning_msg', 'confirmdischarging_exceed_pil_amount'); 
						return;
					}
				}
				if((detailItem.get('loadM3') == null || detailItem.get('loadM3') == '') && (detailItem.get('vbM3') == null || detailItem.get('vbM3') == '') 
						&& (detailItem.get('aprM3') == null || detailItem.get('aprM3') == '') ){
					MessageUtil.warning('warning_msg', 'shippingNoteInquiry_DM101026'); 
					return;
				}
			}else{
				
			}
		}
		else if(refs.ctlIndirectOperation.checked){
//			if(detailItem.get('cgTpCd') == 'LQD'){
//				if(refs.refConfirmLoadingModeOfOpr.getValue() != null && refs.refConfirmLoadingModeOfOpr.getValue() == 'PL'){
//					if(refs.txtInternalTruckNo.getValue() == null || refs.txtInternalTruckNo.getValue() == ''){
//						MessageUtil.question('info_msg', 'This cargo lorry is empty. Do you want to keep this confirmation?',null,
//						function(button){
//							if(button == 'ok'){
//								detailItem.set('fnlOpeYn', 'Y');
//							}else{
//								return;
//							}
//						}
//					);
//					}else{
//						MessageUtil.warning('warning_msg', 'confirmdischarging_lorry_empty_msg'); // CT1210060010
//						return;
//					}
//				}
//			}else {
//				if(refs.txtInternalTruckNo.getValue() == ''){
//					MessageUtil.warning('warning_msg', 'confirmdischarging_lorry_empty_msg'); // CT1210060010
//					return;
//				}
//			}
			
			if(detailItem.get('cgTpCd') == 'LQD'){
				if(detailItem.get('whM3') == null || detailItem.get('whM3') == '' ){
					MessageUtil.warning('warning_msg', 'shippingNoteInquiry_DM101026'); 
					return;
				}
			}
		}
		
		//Binding data
		detailItem.set('userId', MOST.config.Token.getUserId());
		
		if(refs.ctlDirectOperation.checked){					
			detailItem.set('opDelvTpCd', 'D');
			detailItem.set('jobPurpCd', 'VG'); 
			detailItem.set('lorryId', refs.ctlConfirmDischargingLorryNo.getValue()); 
			detailItem.set('lorryNo', detailItem.get('externalLorryNo')); 
		}else if(refs.ctlIndirectOperation.checked){
			detailItem.set('opDelvTpCd', 'I');
			detailItem.set('jobPurpCd', 'VA'); 
			detailItem.set('lorryNo', detailItem.get('vaLorryNo')); 
		
			detailItem.set('loadQty', detailItem.get('whQty'));
			detailItem.set('loadMt', detailItem.get('whWgt'));
			detailItem.set('loadM3', detailItem.get('whM3'));
		}else if(refs.ctlBargeOperationVB.checked){
			detailItem.set('opDelvTpCd', 'D');
			detailItem.set('jobPurpCd', 'VB');
			
			detailItem.set('loadQty', detailItem.get('vbQty'));
			detailItem.set('loadMt', detailItem.get('vbMt'));
			detailItem.set('loadM3', detailItem.get('vbM3'));
		}else if(refs.ctlBargeOperationAB.checked){
			detailItem.set('opDelvTpCd', 'D');
			detailItem.set('jobPurpCd', 'AB');
			
			detailItem.set('lorryNo', detailItem.get('abLorryNo'));
			
			detailItem.set('loadQty', detailItem.get('aprQty'));
			detailItem.set('loadMt', detailItem.get('aprMt'));
			detailItem.set('loadM3', detailItem.get('aprM3'));
		}
		detailItem.set('whConfigurationItems', me.prevWhItems);
		detailItem.set('packageItems', me.packageItems);
		detailItem.set('hangingScaleItems', me.hangingScaleItems);

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
		
		//Set Mode of Operation combo as Lorry or Vessel by default in corresponding case
		if(me.getViewModel().get('theSearch').get('bargeCheckYn') == 'true'){
			if(detailItem.get('cgTpCd') != 'LQD'){
				refs.refConfirmLoadingModeOfOpr.setValue('SE');
			}
		}else{
			if(detailItem.get('cgTpCd') != 'LQD'){
				refs.refConfirmLoadingModeOfOpr.setValue('LR');
			}
		}
	    if(refs.ctlIndirectOperation.checked){
			if(detailItem.get('cgTpCd') == 'LQD'){
				if(refs.refConfirmLoadingModeOfOpr.getValue() != null && refs.refConfirmLoadingModeOfOpr.getValue() == 'PL'){
					if(refs.txtInternalTruckNo.getValue() == null || refs.txtInternalTruckNo.getValue() == ''){
						MessageUtil.question('info_msg', 'This cargo lorry is empty. Do you want to keep this confirmation?',null,
						function(button){
							if(button == 'ok'){
								if(Token.getTmnlHoldChk() === 'Y') {
									me.onTerminalHoldValidation ();
								} else {
									me.onPassedTerminalHoldValidation();
								}
							}else{
								return;
							}
						});
					}else{
						if(Token.getTmnlHoldChk() === 'Y') {
							me.onTerminalHoldValidation ();
						} else {
							me.onPassedTerminalHoldValidation();
						}
					}
				}else{
					// if(refs.txtInternalTruckNo.getValue() == ''){
					// 	MessageUtil.warning('warning_msg', 'confirmdischarging_lorry_empty_msg'); // CT1210060010
					// 	return;
					// }
				}
			}else {
				// if(refs.txtInternalTruckNo.getValue() == ''){
				// 	MessageUtil.warning('warning_msg', 'confirmdischarging_lorry_empty_msg'); // CT1210060010
				// 	return;
				// }
				//01-Terminal Hold Validation
				if(Token.getTmnlHoldChk() === 'Y') {
					me.onTerminalHoldValidation ();
				} else {
					me.onPassedTerminalHoldValidation();
				}
			}
		}else{
			//01-Terminal Hold Validation
			if(Token.getTmnlHoldChk() === 'Y') {
				me.onTerminalHoldValidation ();
			} else {
				me.onPassedTerminalHoldValidation();
			}
		}
		
	},
	
	//01: TERMINAL HOLD VALIDATION
	onTerminalHoldValidation : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var store = me.getStore('validationCheck');
		store.load({
			params : {
				tyCd: 'OPE_TMNLHOLD_VALIDATION',
				col1: detailItem.get('vslCallId'),
				col2: detailItem.get('blNo'),
				col3: CodeConstants.TMNL_HOLD_CDS
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						var detailItem = me.getViewModel().get('theDetail');
						
						if(records[0].get('isValidated') == 'N'){
							MessageUtil.warning('warning_msg', 'terminal_hold_msg');
							return false;
						} else {
							me.onPassedTerminalHoldValidation();
						}
					}else{
						me.onPassedTerminalHoldValidation();
					}
				}
			}
		});
	},
	
	onPassedTerminalHoldValidation : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		if(detailItem.get('bargeCheck') == 'Y'){
			me.onBillingDocumentHoldValidation();
		}
		else {
			me.onPassedBillingDocumentHoldValidation();
		}
	},
	
	//02: BILLING/DOCUMENT HOLD CHECK (FOR BARGE OPERATION)
	onBillingDocumentHoldValidation : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var store = me.getStore('validationCheck');
		
		store.load({
			params : {
				tyCd: 'OPE_BILL_DOCUMENT_HOLD_VALIDATION',
				col1: detailItem.get('vslCallId'),
				col2: detailItem.get('blNo'),
				col3: CodeConstants.TMNL_HOLD_IMT
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(records[0].get('isValidated') == 'N'){
							MessageUtil.warning('warning_msg', 'billing_document_hold_msg');
							return false;
						} else {
							me.onPassedBillingDocumentHoldValidation();
						}
					}else{
						me.onPassedBillingDocumentHoldValidation();
					}
				}
			}
		});
	},
	
	onPassedBillingDocumentHoldValidation : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		if(detailItem.get('domesticChk') == 'N' && Token.getCustomHoldChk() == 'Y'){
			me.onCustomsHoldValidation();
		}else{
			me.onPassedCustomsHoldValidation();
		}
	},
	
	//03: CUSTOMS RELEASED VALIDATION
	onCustomsHoldValidation : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var store = me.getStore('validationCheck');
		
		store.load({
			params : {
				tyCd: 'CUSTOMS_RELEASED_VALIDATION',
				col1: detailItem.get('vslCd'),
				col2: detailItem.get('mfDocId'),
				col3: 'I'
			},
			callback: function(records, operation, success) {
				if (success) {
					/* PPSB_MOST_CUSP_Operation - GAP ID: OPR-20 */
					var isCustomBlockProcess = 'N'
					if(records.length === 0 || (records[0].get('isValidated') !== 'Y')){
						if(isCustomBlockProcess === 'Y'){
							MessageUtil.warning('warning_msg', 'confirmdischarging_clearance_blockprocess_msg');
						}else{
							MessageUtil.question('info_msg', 'confirmhandlingout_clearance_msg', null,
								function(button){
									if(button == 'ok'){
										me.onPassedCustomsHoldValidation();
									}
								}
							);
						}
					}else{
						me.onPassedCustomsHoldValidation();
					}
				}
			}
		});
	},
	
	onPassedCustomsHoldValidation : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		me.onWeightingScaleValidation();
	},
	
	//04: WEIGHTING SCALE VALIDATION
	//VA job: 1st scaled Internal truck + Previous trip has been done full process (WH checked Import)
	//VG job: 1st scaled External truck 
	//**Result: N - has been done 2 times scaling/ Y: just passed 1st time scaling
	onWeightingScaleValidation: function (){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		if(!StringUtil.isNullorEmpty(detailItem.get('wbTransactionNo'))) {
			var store = me.getStore('validationCheck');
			var params = {
				tyCd: '2ND_WEIGHTED_VALIDATION',
				col1: detailItem.get('wbTransactionNo')
			};
			store.load({
				params : params,
				
				callback: function(records, operation, success) {
					if (success) {
						if(records.length > 0){
							if(detailItem.get('jobPurpCd') === 'VA'
								|| detailItem.get('jobPurpCd') === 'VG'){
								
								if(records[0].get('isValidated') == 'Y'){
									me.onPassedWeightingScaleValidation();
								}
								else {
									MessageUtil.question('info_msg', 'truckValidation_msg01', null,
											function(button){
												if(button == 'ok'){
													me.onPassedWeightingScaleValidation();
												}
											}
										);
								}
							}
							else {
								me.onPassedWeightingScaleValidation();
							}
							
						}
						else {
							me.onPassedWeightingScaleValidation();
						}
					}
				}
			});
		}
		else {
			me.onPassedWeightingScaleValidation();
		}
	},
	
	onPassedWeightingScaleValidation: function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		if(detailItem.get('jobPurpCd') === 'VA'){
			me.onInternalTruckJobValidation();
		}
		else {
			me.onPassedInternalTruckJobValidation();
		}
	},
	
	//04.1: 
	//VA job: Previous trip has been done full process (WH checked Import)
	//Result: 'N' - blocked since the truck do not finish previous trip yet
	onInternalTruckJobValidation: function (){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		if(!StringUtil.isNullorEmpty(detailItem.get('lorryNo'))) {
			var store = me.getStore('validationCheck');
			var params = {
				tyCd: 'INTERNALTRUCK_APRON_OPE_VALIDATION',
				col1: detailItem.get('lorryNo')
			};
			store.load({
				params : params,
				
				callback: function(records, operation, success) {
					if (success) {
						if(records.length > 0){
							if(records[0].get('isValidated') == 'Y'){
								me.onPassedInternalTruckJobValidation();
							}
							else {
								MessageUtil.question('info_msg', 'truckValidation_msg02', null,
										function(button){
											if(button == 'ok'){
												me.onPassedInternalTruckJobValidation();
											}
										}
									);
							}
							
						}
						else {
							me.onPassedInternalTruckJobValidation();
						}
					}
				}
			});
		}
		else {
			me.onPassedInternalTruckJobValidation();
		}
	},
	
	onPassedInternalTruckJobValidation: function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		//Amount validation
		if(me.onAmountValidation()){
			return;
		}
		
		me.save();
	},
	
	//05: AMOUNT VALIDATION
	onAmountValidation : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var cgTpCd = detailItem.get('cgTpCd');
		var isAB = refs.ctlBargeOperationAB.checked;
		
		var actMT = detailItem.get('loadMt');
		var actM3 = detailItem.get('loadM3');
		var actQty = detailItem.get('loadQty');
		
		var balMt = detailItem.get('balMt'); 
		var balQty = detailItem.get('balQty');
		
		if(detailItem.get('jobPurpCd') == 'AB'){
			balMt = detailItem.get('amt'); 
			balQty = detailItem.get('aqty');
		}
		
		if(cgTpCd == CodeConstants.MT_CGTP_BBK){
			if(actQty <=0){
				MessageUtil.warning('warning_msg', 'confirmdischarging_qty_zero_msg'); // CT1210060012
				return true;
			}
			
			if (actQty > balQty){
				MessageUtil.warning('warning_msg', 'confirmloading_qty_over_msg'); // CT1210060009
				return true;
			}
		}
		else if(cgTpCd == CodeConstants.MT_CGTP_DBN){
			if(actMT <= 0 && actM3 <= 0 && actQty <=0){
				MessageUtil.warning('warning_msg', 'confirmdischarging_amount_zero_msg'); // CT1210060012
				return true;
			}
		}
		
		return false;
	},
	
	onSelectEquiptment: function(ctl){
		var me = this;
		var refs = me.getReferences();

		
		if(ctl.reference === 'ctlConfirmDischargingEquiptment'){
			if(ctl.getValue() == 'PIPLINE 01'){
				refs.refConfirmLoadingModeOfOpr.setValue('PL');
			}
		}
	},
	
	onSelectModeOfOperation: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		if(refs.refConfirmLoadingModeOfOpr.getValue() == 'PL'){ 
			refs.ctlNormalLabel.setHidden(true);
			refs.ctlPiplineLabel.setHidden(false);
			refs.ctlDirectMt.setValue(detailItem.get('piplineDMt'));
			refs.ctlDirectM3.setValue(detailItem.get('piplineDM3'));
			refs.ctlDirectQty.setValue(detailItem.get('piplineDQty'));
		}else{
			refs.ctlPiplineLabel.setHidden(true);
			refs.ctlNormalLabel.setHidden(false);
			refs.ctlDirectMt.setValue(detailItem.get('norDMt'));
			refs.ctlDirectM3.setValue(detailItem.get('norDM3'));
			refs.ctlDirectQty.setValue(detailItem.get('norDQty'));
		}
	}
	
	/**
	 * VALIDATION METHOD END
	 * =========================================================================================================================
	 */
	
});