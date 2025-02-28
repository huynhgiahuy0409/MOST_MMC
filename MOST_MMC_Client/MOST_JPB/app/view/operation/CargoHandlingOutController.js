Ext.define('MOST.view.operation.CargoHandlingOutController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.cargohandlingout',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 * 
	 */
	CARGO_HANDLING_OUT_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/cargohandlingout/cargoHandlingOut',
	norManualFlag : false,
	autoNorLocFlag : false,
	amtNorFlag : false,
	autoLocFlag : false,
	empNorLocCount : false,
	amtOverNorLoc : false,
	autoPartialFlag : false,
	
	prevWhItems : new Array(),
	CUST_RELEASE: 'RELEASE', //CUSTOMS MODE
	CUST_HOLD: 'HOLD', //CUSTOMS MODE
	
	whType: '',
	DAMAGE_STORE: 'damageStore',
	DAMAGE_CHECK_STORE: 'damageCheckStore',
	DIMENSION_STORE: 'dimensionStore',
	UPLOAD_STORE: 'uploadStore',
	prevData:null,
	
	packageItems : new Array(),
	/**
	 * CONSTANT END
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
		var store = me.getStore('confirmHandlingOut');
		var params = me.getSearchCondition();
		var window = me.getView().up('window');
		
		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success){
					
					if(record != null && record.length > 0){
						
						me.setDetailInitialize(record[0]);
					}
				}
			}
		});
		window.center();
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

		if(	refs.ctlLoadMt.getValue() <= 0 &&
			refs.ctlLoadM3.getValue() <= 0 &&
			refs.ctlLoadQty.getValue()<= 0){
				
			Ext.MessageBox.show({
		        title : 'Messsage',
			    msg : 'Please input location amount',
			    width : 300,
			    buttons : Ext.MessageBox.OK,
			    icon : Ext.MessageBox.INFO
			});	
			return;
		}
		if(detailItem.get('cgTpCd') == 'LQD'){
			if(refs.ctlLoadM3.getValue() <= 0){
					Ext.MessageBox.show({
				        title : 'Messsage',
					    msg : 'Please input location measurement',
					    width : 300,
					    buttons : Ext.MessageBox.OK,
					    icon : Ext.MessageBox.INFO
					});	
					return;
				}
		}
		selection = Ext.create('MOST.model.operation.CargoHandlingOut', {
			vslCallId: detailItem.get('vslCallId'),
			whTpCd:'G',
			blSn: detailItem.get('blNo'),
			hdlInDt: detailItem.get('hdlOutEndDt'),
			cgNo: refs.ctlBlGr.getValue(),
			grMt: refs.ctlLoadMt.getValue(),
			grM3: refs.ctlLoadM3.getValue(),
			grQty: refs.ctlLoadQty.getValue(),
			catgCd : detailItem.get('catgCd'),
			cgTpCd: detailItem.get('cgTpCd'),
			eachMt: detailItem.get('eachWgt'),
			eachM3: detailItem.get('eachVol'),
		});
		
		selection.title = 'Warehouse Allocation';
		
		me.openCodePopup('app-warehouseofgc', controlName, selection);		
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		if(xtype === 'popup-cmmcdpopup' || xtype === 'popup-lorrylistpopup'){
			return;
		}
		
		else if(targetControl == 'ctlHOLorryNo') {
			if(returnValue){
				detailItem.set('gateTxnNo', returnValue.item.get('gateTxnNo'));
				detailItem.set('sdoNo', returnValue.item.get('sdoNo'));
				detailItem.set('wbTransactionNo', returnValue.item.get('wbTransactionNo'));
				detailItem.set('driverId', returnValue.item.get('driverId'));
			} else {
				detailItem.set('gateTxnNo', '');
				detailItem.set('sdoNo', '');
				detailItem.set('wbTransactionNo', '');
			}
		}
		else if(targetControl === 'HandlingOutUnsetLocIdHHT'){
			var detailItem = me.getViewModel().get('theDetailHHT');
			if(returnValue){
				detailItem.set('locId',returnValue.locId);
				var whItems = new Array();
				for(var i = 0; i < returnValue.arrWHLocation.items.length; i++){
					var invLocItem = returnValue.arrWHLocation.items[i];
					var handlingOutItemHHT = Ext.create('MOST.model.configuration.WhConfiguration', {
						whId: invLocItem.data.whId,
						locId : invLocItem.data.locId,
						vslCallId : invLocItem.data.vslCallId,
						cgNo : invLocItem.data.cgNo,
						wgt: invLocItem.data.wgt,
						msrmt: invLocItem.data.msrmt,
						pkgQty: invLocItem.data.pkgQty,
						whTpCd : invLocItem.data.whTpCd,
						whTpCdNm : invLocItem.data.whwhTpCdNmId,
						spCaCoCd :''
					});
					whItems.push(handlingOutItemHHT.data);
				}
				me.prevWhItems = whItems; 
			} else {
				detailItem.set("locId","");
			}
		} else if(targetControl === 'ConfirmHandlingOutWhAllocationHHT'){
			refs.ConfirmHandlingOutPkgTyCodeHHT.setValue(returnValue.code);
		} else if(targetControl === 'cltPkgNo'){
			if(returnValue){
				var packageItems = new Array();
				var qty = 0;
				var mt = 0;
				var m3 = 0;
				
				for(var i = 0; i < returnValue.item.length; i++){
					var returnItem = returnValue.item[i];
					var pkgItem = Ext.create('MOST.model.operation.PackageJobItem', {
						vslCallId: returnItem.vslCallId,
						mfDocId : returnItem.mfDocId,
						refNo: returnItem.refNo,
						pkgNo: returnItem.packageNo
					});
					packageItems.push(pkgItem.data);
					
					qty += 1;
					mt += Number(returnItem.mt);
					m3 += Number(returnItem.m3);
				}
				me.packageItems = packageItems;
				refs.cltPkgNo.setValue(returnValue.code);
				
				refs.ctlLoadQty.suspendEvents();
				detailItem.set('loadQty', qty);
				detailItem.set('loadMt', mt);
				detailItem.set('loadM3', m3);
			} else{
				me.packageItems = new Array();
				refs.cltPkgNo.setValue();
			}
		} else if(xtype === 'popup-packagenomultipopup'){
			if(returnValue){
				var qty = 0;
				var mt = 0;
				var m3 = 0;
				
				for(select of returnValue.item){
					qty += 1;
					mt += Number(select.mt);
					m3 += Number(select.m3);
				}
				
				detailItem.set('loadQty', qty);
				detailItem.set('loadMt', mt);
				detailItem.set('loadM3', m3);
			}
		}
		else{
			var control = me.lookupReference(targetControl);
			control.setValue(returnValue.data.locId);
			
			var whItems = new Array();
			for(var i = 0; i < returnValue.data.whConfigurationMap.data.items.length; i++){
				var invLocItem = returnValue.data.whConfigurationMap.data.items[i];
				var handlingItem = Ext.create('MOST.model.configuration.WhConfiguration', {
					locTpCd: invLocItem.data.locTpCd,
					whId: invLocItem.data.whId,
					locId : invLocItem.data.locId,
					vslCallId : invLocItem.data.vslCallId,
					cgNo : invLocItem.data.cgNo,
					wgt: invLocItem.data.wgt,
					msrmt: invLocItem.data.msrmt,
					pkgQty: invLocItem.data.pkgQty,
					whTpCd : invLocItem.data.whTpCd,
					whTpCdNm : invLocItem.data.whwhTpCdNmId,
					spCaCoCd :''
				});
				whItems.push(handlingItem.data);
				me.whType = invLocItem.data.locTpCd;
			}
			me.prevWhItems = whItems;
		}
	},	
	
	// Search Event Handler
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();

	},
	
	//Dimension check
	onDimension_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		me.openCodePopup('app-dimensioncheckregistration', 'btnDimension', me.prevData);
	},
	
	onDamage_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		me.openCodePopup('app-damagecheckregistration', 'btnDamage', me.prevData);
	},
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var recvData = me.getView().recvData;
     	var cgInOutCd = 'O'; 

     	if(recvData.get('caTyCd') === 'IM'){
     		cgInOutCd = 'O';
     	} else if(recvData.get('caTyCd') === 'EX'){
     		cgInOutCd = 'I';
     	}
     	
    	var params = {
			vslCallId : recvData.get('vslCallId'),
			scn : recvData.get('scn'),
			blNo : recvData.get('blNo'),
			grNo : recvData.get('grNo'),
			cgNo : recvData.get('cgNo'),
			cgInOutCd : cgInOutCd,
			lorryId : recvData.get('lorryId'),
			shftId : recvData.get('shftId'),
			shftDt : recvData.get('shftDt'),
			cgTpCd : recvData.get('cgTpCd')
		};
    	
    	return params;
	},
	
	// Detail Initialize
	setDetailInitialize:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var cargoTypeCombo = me.getStore('confirmHandlingOutForCargoTypeCombo');
		
		if(masterItem.getData()){
			var currentTime = Ext.Date.format(new Date(), 'd/m/Y H:i');
			refs.startTimeConfirmHO.setValue(currentTime);
			var detailItem = new Ext.create('MOST.model.operation.CargoHandlingOut');
			detailItem.data = masterItem.getData();
			
			if(recvData.get('gateTxnNo')) {
				detailItem.set('lorryId', recvData.get('lorryNo'));
				detailItem.set('lorryNo', recvData.get('lorryNo'));
				detailItem.set('gateTxnNo', recvData.get('gateTxnNo'));
				detailItem.set('wbTransactionNo', recvData.get('wbTransactionNo'));
			}
			
			detailItem.set('sdoNo', recvData.get('sdoNo'));
			
			detailItem.set('cgTpCd', recvData.get('cgTpCd'));
			detailItem.set('cgTpCdNm', recvData.get('cgTpCdNm'));
			detailItem.phantom = false; // UPDATE
			detailItem.commit();
			me.getViewModel().setData({theDetail:detailItem});
			me.getView().recvData = detailItem;
			
			me.prevData = detailItem.clone();
			
			cargoTypeCombo.setData(masterItem.get('cargoTypeList'));
		}
		
		refs.ctlConfirmHandlingOutLocId.setValue('');
	},
	
	// Detail Save
	onSave:function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		var lorrysPopupStore = me.getStore('confirmHandlingOutAssignmentLorrysPopup');
		var infoForm = me.getView().form;
		var lorrySearchType = '';

		if(infoForm.isValid()){
			//Bonded WH validation
			if(!StringUtil.isNullorEmpty(me.whType) && me.whType == CodeConstants.MT_WHTP_BW){
				if(Token.getCustomHoldChk() === 'Y') {
					me.onBondedWhValidation();
				}
				else {
					me.prevSaveCheck();
				}
			}
			else {
				me.prevSaveCheck();
			}
		} else {
			MessageUtil.mandatoryFieldInValid();
		}
	},
	
	onCancel:function(){
		var me = this;
		var window = me.getView().up('window');
       	window.close();
	},
	
	// amtVal
	amtVal : function(){
		var me = this;
		var detailItem;
		if (Ext.platformTags.classic){
			detailItem =  me.getViewModel().get('theDetail');
		}else{
			detailItem =  me.getViewModel().get('theDetailHHT');
		}
		var actMT=0;
		var actM3=0;
		var actQty=0;
	
		actMT = detailItem.get('loadMt');
		actQty = detailItem.get('loadQty');
		actM3 = detailItem.get('loadM3');
		
		var balQty= detailItem.get('balQty');
		var balM3= detailItem.get('balM3');
		var balMT= detailItem.get('balMt');
		var isNormal =false;  
		
		if(detailItem.get('cgTpCd') == CodeConstants.MT_CGTP_BBK){
			if(!(actMT == 0 && actQty ==0)){
				if(balMT <= 0 && balQty <=0){
					MessageUtil.warning('warning_msg', 'confirmhandlingout_wh_balance_msg'); // CT1210090010
					return false;
				}
				
				if( (actMT > balMT || actQty > balQty) ){
					MessageUtil.warning('warning_msg', 'confirmhandlingout_wh_balance_msg'); // CT1210090010 
					return false;
				}
				
				//Validate with package items
				if(me.packageItems.length > 0){
					if(actQty != me.packageItems.length){
						MessageUtil.warning('warning_msg', 'packageItemValidationMsg'); // CT1210060012
						return false;
					}
				}
			} else if (actMT > 0 && actQty <= 0){
				MessageUtil.warning('warning_msg', 'confirmhandlingout_amount_zero_msg'); // CT1210090011
				return false;
			} else if (actMT <= 0 && actQty > 0){
				MessageUtil.warning('warning_msg', 'confirmhandlingout_amount_zero_msg'); // CT1210090011 
				return false;
			}else{
				isNormal = true;
			}
		} else if(detailItem.get('cgTpCd') == CodeConstants.MT_CGTP_LQN || detailItem.get('cgTpCd') == CodeConstants.MT_CGTP_LQE){
			if(!(actM3 == 0)){	
				return true;
			}else if (actM3 == 0 && (actQty > 0 || actMT > 0)){
				MessageUtil.warning('warning_msg', 'confirmhandlingout_amount_m3_msg'); // CT1210090012
				return false;
			} else {
				isNormal = true;
			}
			
		}else{//DBK, DBN, DBE
			if(!(actMT == 0)){	
				return true;
			}
			else if (actMT == 0 && (actQty > 0 || actM3 > 0)){
				MessageUtil.warning('warning_msg', 'confirmhandlingout_amount_mt_msg'); // CT1210090012
				return false;
			} else {
				isNormal = true;
			}	
		}
		
		me.amtNorFlag = isNormal;
		
		if(isNormal){
			MessageUtil.warning('warning_msg', 'confirmhandlingout_amount_empty_msg'); // CT1210090009
			return false;
		}
		
		return true
	},
	
	// isAutoNorLocFlag
	isAutoNorLocFlag : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');

		if(detailItem.get('locId') && me.prevWhItems){
			return false;
		}		
		
		var actMT=0;
		var actM3=0;
		var actQty=0;
		
		actMT =  detailItem.get('loadMt');
		actM3 =  detailItem.get('loadM3');
		actQty =  detailItem.get('loadQty');
		
		var sumMt = detailItem.get('balMt');
		var sumM3 = detailItem.get('balM3');
		var sumQty = detailItem.get('balQty');
		
		me.autoLocFlag = false;
		me.norManualFlag = false;
		me.empNorLocCount = false;
		me.amtOverNorLoc = false;
		
		if(detailItem.get('cgTpCd')){
			////////////Start Normal Case
			if(actMT > 0){ //ACTUAL WGT VALUE - CASE OF BBK
				if(sumMt == actMT){
					if(detailItem.get('locCount') == 1){
						me.autoLocFlag = true;
						me.norManualFlag = false;
					}else if(detailItem.get('locCount')> 1){
						me.autoPartialFlag = false; 						  			
						me.autoLocFlag = true;
						me.norManualFlag = false;
					}else{						   		
						me.autoLocFlag = false;
						me.empNorLocCount = true;
						/* norManualFlag = true; */
					}
				}else if(sumMt > actMT){
					if(detailItem.get('locCount') == 1){
						me.autoLocFlag = true;
						me.norManualFlag = false;
					}else if(detailItem.get('locCount')> 1){
						me.autoPartialFlag = false; 						  			
						me.autoLocFlag = false;//autoLocaFlag
						me.norManualFlag = false;
					}else{						   		
						me.autoLocFlag = false;
						me.empNorLocCount = true;
						/* norManualFlag = true; */
					}
				}else{// amountOver
					me.autoLocFlag = false;
					me.amtOverNorLoc = true;
				}
			}else if(actQty >0){
				if(sumQty == actQty){
					if(detailItem.get('locCount') == 1){
						me.autoLocFlag = true;
						me.norManualFlag = false;
					}else if(detailItem.get('locCount')> 1){
						me.autoPartialFlag = false; 						  			
						me.autoLocFlag = true;
						me.norManualFlag = false;
					}else{						   		
						me.autoLocFlag = false;
						me.empNorLocCount = true;
						/* norManualFlag = true; */
					}
				}else if(sumMt > actMT){
					if(detailItem.get('locCount') == 1){
						me.autoLocFlag = true;
						me.norManualFlag = false;
					}else if(detailItem.get('locCount')> 1){
						me.autoPartialFlag = false; 						  			
						me.autoLocFlag = false;//autoLocaFlag
						me.norManualFlag = false;
					}else{						   		
						me.autoLocFlag = false;
						me.empNorLocCount = true;
						/* norManualFlag = true; */
					}
				}else{// amountOver
					me.autoLocFlag = false;
					me.amtOverNorLoc = true;
				}	
			}else if(actM3 >0){
				if(sumM3 == actM3){
					if(detailItem.get('locCount') == 1){
						me.autoLocFlag = true;
						me.norManualFlag = false;
					}else if(detailItem.get('locCount')> 1){
						me.autoPartialFlag = false; 						  			
						me.autoLocFlag = true;
						me.norManualFlag = false;
					}else{						   		
						me.autoLocFlag = false;
						me.empNorLocCount = true;
						/* norManualFlag = true; */
					}
				}else if(sumM3 > actM3){
					if(detailItem.get('locCount') == 1){
						me.autoLocFlag = true;
						me.norManualFlag = false;
					}else if(detailItem.get('locCount')> 1){
						me.autoPartialFlag = false; 						  			
						me.autoLocFlag = false;//autoLocaFlag
						me.norManualFlag = false;
					}else{						   		
						me.autoLocFlag = false;
						me.empNorLocCount = true;
						/* norManualFlag = true; */
					}
				}else{// amountOver
					me.autoLocFlag = false;
					me.amtOverNorLoc = true;
				}									
			}//////////// End Normal Case
			
		} 
		
		if(me.autoLocFlag){
			me.autoNorLocFlag = true;
			return true;
		}else{					
			if(StringUtil.isNullorEmpty(detailItem.get('locId'))){
				me.norManualFlag = true;//location empty
			}else{
				me.norManualFlag = false;
			}
			me.autoNorLocFlag = false;
			return false;
		}
		/* return autoLocFlag; */
	},
	
	// isAutoLocation
	isAutoLocation : function(){
		var me = this;
		me.autoLocFlag = false;
		me.autoNorLocFlag = false;//normal == auto location 가능성 = true ;  loc != null
		me.norManualFlag = false;
		
		if(!me.amtNorFlag){
			if(me.isAutoNorLocFlag()){	 	 			 
				me.autoLocFlag = true;
				me.autoNorLocFlag = true;
			}
		}
		
		////if autoNorLocflag or autoDmgLocFlag or autoSprLocFlag is true, isAutoLocation is true = autoLocFlag	 	 		
		if(me.autoLocFlag){
			return true
		}
		
		return false;
	},
	
	// getBindingXml
	getBindingXml : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		if(detailItem.get('spCaCoCd') == 'S'){
			/* chkSprYn.selected = true;	 */
			if(detailItem.get('delvTpCd') == 'D'){
				detailItem.set('delvTpCd', 'D');	
			}else{
				detailItem.set('delvTpCd', 'I');
			}
			
		}else{
			detailItem.set('delvTpCd', 'I');
		}
	},
	
	// clearance
	clearance : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		me.getBindingXml();
		
		if(!me.amtVal()){
			return;
		}
		
		if(me.isAutoLocation()){
			if(!me.autoNorLocFlag){ 
				if(me.norManualFlag){
					MessageUtil.warning('warning_msg', 'confirmhandlingout_deallocate_automatically_msg'); // CT1210090013
					return;
				}
			}
		}else{
			if(me.norManualFlag){
				MessageUtil.warning('warning_msg', 'confirmhandlingout_deallocate_automatically_msg'); // CT1210090013
				return;
			}
		}
		
//		//OPR-013 Warehouse balance checking (keep 60 MT into WH due to payment reason)
//		if(detailItem.get('balMt') - detailItem.get('loadMt') < CommonConstants.WH_BALANCE_MT) {
//			MessageUtil.question('warning_msg', 'warehousecheckexport_whBalance_msg', CommonConstants.WH_BALANCE_MT,
//					function(button){
//						if (button === 'ok') {
//							me.save();
//						}
//					}
//				);
//		} else {
//			me.save();
//		}
		
		//Remove the 60 MT checking logic.
		me.save();
	},
	
	// Prev Save Check - okSaveButton
	prevSaveCheck : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var mt = Number(refs.ctlLoadMt.getValue()).toFixed(3);
		var balanceMt = Number(refs.ctlBalMt.getValue()).toFixed(3);

		if(detailItem.get('cgTpCd') != CodeConstants.MT_CGTP_BBK){
			if(mt - balanceMt > 0){
				MessageUtil.question('info_msg', 'balValidation_msg', null,
						function(button){
							if(button == 'ok'){
								//Terminal Hold
								if(Token.getTmnlHoldChk() === 'Y') {
									me.onTerminalHoldValidation();
								} else {
									me.onPassedTerminalHoldValidation();
								}	
							}
						}
				);
			} else {
				//Terminal Hold
				if(Token.getTmnlHoldChk() === 'Y') {
					me.onTerminalHoldValidation();
				} else {
					me.onPassedTerminalHoldValidation();
				}	
			}
		} else {
			//Terminal Hold
			if(Token.getTmnlHoldChk() === 'Y') {
				me.onTerminalHoldValidation();
			} else {
				me.onPassedTerminalHoldValidation();
			}
		}
	},
	
	// save
	save : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		if((!StringUtil.isNullorEmpty(detailItem.get('blNo'))) && StringUtil.isNullorEmpty(detailItem.get('doNo'))){
			MessageUtil.warning('warning_msg', 'confirmhandlingout_dono_not_exist_msg'); // CT1210090003
			return;
		}
		
		//Time check
		var startDate = detailItem.get('hdlOutStDt');
		var endDate = detailItem.get('hdlOutEndDt');
		var startDateFormat = Ext.Date.format(startDate, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var endDateFormat = Ext.Date.format(endDate, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		
		if(startDate != null && endDate != null){
			if(endDate < startDate){
				MessageUtil.warning('warning_msg', 'confirmhandlingout_start_end_date_msg'); // "Start Date Should Be Less Than End Date"
				return;
			}
		}
		
		me.cudData();
	},
	
	// cudData
	cudData : function(){
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		var detailItem = me.getViewModel().get('theDetail');
		
		var proxy = detailItem.getProxy();
		proxy.url = me.CARGO_HANDLING_OUT_PROXY_URL;

		var currentTime = Ext.Date.format(new Date(), 'd/m/Y H:i');
		var startDtStr =  Ext.Date.format(refs.startTimeConfirmHO.getValue(), 'd/m/Y H:i');
		var endDtStr = currentTime;
		detailItem.set('hdlOutStDt', startDtStr); 
		detailItem.set('hdlOutEndDt', endDtStr); 
	
		detailItem.set('autoLocFlag', me.autoLocFlag);
		detailItem.set('autoNorLocFlag', me.autoNorLocFlag);
		detailItem.set('jobCoCd', 'G');		
		
		detailItem.set('wgt', detailItem.get('loadMt'));
		detailItem.set('pkgQty', detailItem.get('loadQty'));
		detailItem.set('msrmt', detailItem.get('loadM3'));
		detailItem.set('whTpCd', 'G');
		detailItem.set('whConfigurationItems', me.prevWhItems);
		detailItem.set('userId', MOST.config.Token.getUserId());
		
		detailItem.set('packageItems', me.packageItems);
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = me.CARGO_HANDLING_OUT_PROXY_URL;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('item', detailItem.data);
		updateParm.save({
			callback: function(records, operation, success) {
				if (success) {
					me.saveDimension(records);
					me.saveDamage(records);
					
					MessageUtil.saveSuccess(); // Success Message
					detailItem.commit();
					me.onLoad();
					var parentView = me.getParentView();
					
					if(parentView.getController().onSearch){
						
						if(parentView.getController().onCallBackFromOperationScreen){
							parentView.getController().onCallBackFromOperationScreen();
						}
						
						parentView.getController().onSearch();
					}
					window.close(); 
				}
			}
		});
	},
	
	onQtyChange: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var recvData = me.getView().recvData;
		var qty = '';
		var balanceQty = '';
		var eachVol = Number(detailItem.get('eachVol')).toFixed(3);
		var eachWgt = Number(detailItem.get('eachWgt')).toFixed(3);
		var refsQty = '';
		var refsMt = '';
		var refsM3 = '';

		balanceQty = Number(refs.ctlBalQty.getValue());
		qty = Number(refs.ctlLoadQty.getValue());
		refsQty = refs.ctlLoadQty;
		refsMt = refs.ctlLoadMt;
		refsM3 = refs.ctlLoadM3;
		refs.ctlLoadMt.setValue(0);
		refs.ctlLoadM3.setValue(0);

		if(recvData.get('cgTpCd') == CodeConstants.MT_CGTP_BBK){
			if(qty - balanceQty > 0){
				refsQty.setValue(0);
				MessageUtil.warning('warning_msg', 'confirmhandlingoutg_qty_exceed_msg');
				return;
			}
		}
		
		var mt = eachWgt * qty;
		var m3 = eachVol * qty;
		refsMt.setValue(mt);
		refsM3.setValue(m3);
	},
	
	onMtChange: function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var mt = '';
		var refsMt;
		var balanceMt = '';
		
		mt =Number(refs.ctlLoadMt.getValue()).toFixed(3);
		refsMt = refs.ctlLoadMt;
		balanceMt = Number(refs.ctlBalMt.getValue()).toFixed(3);

		if(recvData.get('cgTpCd') != CodeConstants.MT_CGTP_BBK){
			if(mt - balanceMt > 0){
				MessageUtil.warning('warning_msg', 'confirmhandlingout_mt_exceed_msg');
				refsMt.setValue(0);
				return;
			}
		}
	},
	
	onCargoTypeChange: function(){
		var me = this;
		var refs = me.getReferences();
		if(refs.refCargoType.getValue() == CodeConstants.MT_CGTP_BBK){
			refs.ctlLoadQty.setAllowBlank(false);
			refs.ctlLoadMt.setAllowBlank(true);
			refs.ctlLoadQty.setReadOnly(false);
			refs.ctlLoadMt.setReadOnly(true);
			refs.ctlLoadM3.setReadOnly(true);
		}else{
			refs.ctlLoadMt.setAllowBlank(false);
			refs.ctlLoadQty.setReadOnly(false);
			refs.ctlLoadMt.setReadOnly(false);
			refs.ctlLoadM3.setReadOnly(false);
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
				col3: 'O'
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(records[0].get('isValidated') == 'N'){
							MessageUtil.warning('warning_msg', 'BondedWH_validation_msg');
							return false;
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
				col3: CodeConstants.TMNL_HOLD_CHO
			},
			
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
	
	onPassedTerminalHoldValidation : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		if(Token.getCustomHoldChk() === 'Y' && detailItem.get('domesticChk') == 'N') {
			if(detailItem.get('custMode') !== me.CUST_RELEASE) {
				MessageUtil.warning('warning_msg', 'confirmhandlingout_clearance_blockprocess_msg');
			} else {
				me.clearance();
			}
		} else {
			me.clearance();
		}
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
	
	onOpenPkgNoPopup: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		if(detailItem.get('lorryId') == null || detailItem.get('lorryId') == ''){
			MessageUtil.warning('warning_msg', 'Please select Truck first');
			return;
		}
		
		var params = {
				vslCallId: detailItem.get('vslCallId'),
				blNo: detailItem.get('blNo'),
				ixCd: 'I',
				jobPurpCd: 'WG'
		}
		
		me.openCodePopup('popup-packagenomultipopup', 'cltPkgNo', params);
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});