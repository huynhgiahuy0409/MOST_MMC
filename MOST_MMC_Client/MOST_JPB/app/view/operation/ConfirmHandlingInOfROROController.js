Ext.define('MOST.view.operation.ConfirmHandlingInOfROROController', {
    extend: 'MOST.view.foundation.BaseViewController',
    requires: [
           	],
    alias: 'controller.confirmHandlingInOfRORO',
    
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
    CARGO_HANDLING_IN_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlinginofroro/handlinginlist',
	MAIN_GRID_REF_NAME: 'refCargoGrid',
	MAIN_STORE_NAME: 'cargoItems',
	prevDate:{ startDt: null, endDt: null},
	prevLorryId : null,
	cgIndex:0,
	

 	whType: '',
	prevWhItems : new Array(),
 	shuWhItems : new Array(),
 	dbgWhItems : new Array(),
	packageItems : new Array(),
	/**
	 * =========================================================================================================================
	 * CONSTANT END
	 */

    
    /**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
    onLoad : function() {
    	var me = this;
		var refs = me.getReferences();
		var store = me.getStore('cargoItems');
		var params = me.getSearchCondition();
		var window = me.getView().up('window');
		var cargoTypeCombo = me.getStore('confirmHandlingInForCargoTypeCombo');

		cargoTypeCombo.load();
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
		
	},
	// Detail Initialize
	setDetailInitialize:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var detailItem = me.getViewModel().get('theRRDetail');
		var deliveryCombo = me.getStore('confirmHandlingInForDeliveryCombo');
		var cargoTypeCombo = me.getStore('confirmHandlingInForCargoTypeCombo');
		
		
		if(masterItem.data){
			var detailItem = new Ext.create('MOST.model.operation.CargoHandlingIn');
			var currentTime = Ext.Date.format(new Date(), 'd/m/Y H:i');
			refs.confirmHandlingInStartTime.setValue(currentTime);
			DateUtil.convertDateToLong(masterItem.data, ['startDt', 'endDt', 'hdlInStDt']); // date to long
			detailItem.data = masterItem.data;
			
			//Calculate WH balance:
			detailItem.set('whBalWgt', detailItem.get('snMt') - detailItem.get('accuSumWgt'));
			detailItem.set('whBalMsrmt', detailItem.get('snM3') - detailItem.get('accuSumMsrmt'));
			detailItem.set('whBalQty', detailItem.get('snQty') - detailItem.get('accuSumQty'));
			
			// Previous Date
			me.prevDate['startDt'] = detailItem.get('startDt');
			me.prevDate['endDt'] = detailItem.get('endDt');
			me.prevLorryId = detailItem.get('lorryId');
			
			detailItem.set('lorryId', recvData.get('lorryNo'));
			detailItem.set('driverId', recvData.get('driverId'));
			detailItem.set('lorryNo', recvData.get('lorryNo'));
			detailItem.set('gateTxnNo', recvData.get('gateTxnNo'));
			detailItem.set('opDelvTpCd', 'I');
			detailItem.set('rePkgTpCd', detailItem.get('pkgTpCd'));
			if(detailItem.get('unitNo') != null && detailItem.get('unitNo') != ''){
				refs.ctlUnitNoSearchField.setValue(detailItem.get('unitNo'));
			}
			detailItem.phantom = false; // UPDATE
			detailItem.commit();
			
			me.getViewModel().setData({theRRDetail:detailItem});
			me.getView().recvData = detailItem;
			me.prevData = detailItem.clone();
			
			refs.confirmHandlingInDelvTpCd.setValue(masterItem.get('delvTpCd'));
//			deliveryCombo.setData(masterItem.get('deliveryList'));
//			cargoTypeCombo.setData(masterItem.get('cargoTypeList'));
		    refs.ctlLoadMt.setEditable(detailItem.get('cgTpCd') !== CodeConstants.MT_CGTP_BBK);
		    refs.ctlLoadM3.setEditable(detailItem.get('cgTpCd') !== CodeConstants.MT_CGTP_BBK)

//		    refs.refCboCargoTp.setValue("");
		    
		}
	},
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
   
    /**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore(me.MAIN_STORE_NAME);
    	var cgGrid = me.lookupReference(me.MAIN_GRID_REF_NAME);
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
					else {
						cgGrid.getSelectionModel().select(me.cgIndex);
						me.onCargoGrid_CellClick();
					}
				}
			}
		});
	},
	
	onCargoGrid_CellClick:function(){
		var me = this;
		var refs = me.getReferences();
		
		me.onClear_clickHandler();
		
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		me.cgIndex = grid.store.indexOf(selection);
		
		//get GI List
		me.getGateInItems(selection);
		
		//get HI List
		me.getHandlingInItems(selection);
	},
	
	onGateInGrid_CellClick:function(){
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference('refGateInGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		
		me.onSetActionButton('GI');
		
		//binding
		me.getViewModel().setData({unitItem:selection});
		
		if(!StringUtil.isNullorEmpty(selection.get('yardPlanLoc'))) {
			refs.txtLocId.setValue(selection.get('yardPlanLoc'));
		}
	},
	
	onHandlingInGrid_CellClick:function(){
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference('refHandlingInGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		
		me.onSetActionButton('HI');
		
		//binding
		me.getViewModel().setData({unitItem:selection});
	},
	
	onClear_clickHandler: function (){
		var me = this;
		var refs = me.getReferences();
		
		me.getViewModel().setData({unitItem:null});
		var grid = me.lookupReference('refGateInGrid');
		grid.setSelection(null);
		
		var hiGrid = me.lookupReference('refHandlingInGrid');
		hiGrid.setSelection(null);
		
		refs.ctlInDt.setValue();
	},
	
	onAdd_clickHandler: function (){
		var me = this;
		var refs = me.getReferences();
		var unitStore = me.getStore('handlingInItems');
		
		var grid = me.lookupReference('refGateInGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		
		if(StringUtil.isNullorEmpty(refs.txtLocId.getValue())){
			MessageUtil.warning("warning_msg", "mandatoryField_msg", ViewUtil.getLabel('WHLocId'));
			return;
		}
		
		var unitItem = me.getViewModel().get('unitItem');
		unitItem.set('inDate', Ext.Date.format(refs.ctlInDt.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		unitItem.set('statCd', 'ST');
		unitItem.set('delvTpCd', 'I');
		
		if(!StringUtil.isNullorEmpty(unitItem.get('correctionNo'))
				&& unitItem.get('correctionNo') != unitItem.get('unitNo')){
			unitItem.set('correctionUnitNoYN', 'Y');
		}
		unitItem.set('userId', Token.getUserId());
		unitItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = unitStore.getProxy().url;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		updateParm.set('items', new Array());
		
		updateParm.get('items').push(unitItem.data);
		updateParm.save({
			success : function(record, operation) {
				unitStore.commitChanges();
				MessageUtil.saveSuccess();
				
				me.onSearch();
			}
		});
	},
	
	onRemove_clickHandler: function (){
		var me = this;
		var refs = me.getReferences();
		
		var unitStore = me.getStore('handlingInItems');
		
		var grid = me.lookupReference('refHandlingInGrid');
		var unitItem = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(unitItem == null) return;
		
		if(!StringUtil.isNullorEmpty(unitItem.get('outDate'))
				|| !StringUtil.isNullorEmpty(unitItem.get('rhdlNo'))){
			//Msg_CT243001: This cargo has been loaded or rehandled  already. Please check it again!
			return;
		}
		unitItem.set('delvTpCd', null);
		unitItem.set('inDate', null);
		unitItem.set('yardLoc', null);
		unitItem.set('hiRemarks', null);
		unitItem.set('statCd', 'RS');//just for temporary for CUD without WB application. Originally it should be "IC"
		unitItem.set('userId', Token.getUserId());
		unitItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = unitStore.getProxy().url;
		updateParm.phantom = false;
		//updateParm.drop();
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
		updateParm.set('items', new Array());
		
		updateParm.get('items').push(unitItem.data);
		updateParm.save({
			success : function(record, operation) {
				unitStore.commitChanges();
				MessageUtil.saveSuccess();
				
				me.onSearch();
			}
		});	
	},
	
	// WarehouseAllocation
	onWarehouseAllocation : function(controlName){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		var control = me.lookupReference(controlName);
		var title = 'Warehouse Allocation';
		var selection;
	
		if(controlName === 'ctlConfirmHandlingInLocId'){
			// Validation
			// Validation
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
			
			selection = Ext.create('MOST.model.operation.CargoHandlingIn', {
				vslCallId: detailItem.get('vslCallId'),
				whTpCd:'G',
				blSn: detailItem.get('shipgNoteNo'),
				hdlInDt: detailItem.get('hdlInEndDt'),
				cgNo: detailItem.get('shipgNoteNo'),
				grMt: refs.ctlLoadMt.getValue(),
				grM3: refs.ctlLoadM3.getValue(),
				grQty: refs.ctlLoadQty.getValue(),
				catgCd : detailItem.get('catgCd'),
				cgTpCd: detailItem.get('cgTpCd'),
				eachMt: detailItem.get('eachWgt'),
				eachM3: detailItem.get('eachMsrmt'),
				title: 'Warehouse Allocation',
			});
			selection.title = 'Warehouse Allocation';
		}

		me.openCodePopup('app-warehouseofgc',controlName, selection);
	
	},

    /**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */
		
	/**
	 * GENERAL METHOD START
	 * =========================================================================================================================
	 */
	getSearchCondition : function() {
		var me = this;
     	var refs = me.getReferences();
		var store = me.getStore('cargoItems');
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
     	var recvData = me.getView().recvData;

		if(recvData){
			var params = me.createParam(recvData);
			params['pageNo'] = pageNo;
			params['sizePerPage'] = sizePerPage;
			
			params['vslCallId'] = recvData.get('vslCallId');
			params['shipgNoteNo'] = recvData.get('shipgNoteNo');
			params['grNo'] = recvData.get('grNo');
			params['cgTpCd'] = recvData.get('cgTpCd');
			params['unitNo'] = recvData.get('unitNo');
			return params;
		}
		
    	return null;
	},
	
	// Popup After Setting
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		if(targetControl === 'ctlVslCallId'){
			if(returnValue){
				me.getViewModel().setData({theVslInfo:returnValue.item});
				me.getSnComboItems();
			} 
			else {
				me.getViewModel().setData({theVslInfo:null});
				var snCombo = me.getStore('snCombo');
				snCombo.loadData([],false);
				refs.ctlSearchSnNo.reset();
			}
		}else if(targetControl === 'ctlUnitNoSearchField'){
			if(returnValue){
				refs.ctlUnitNoSearchField.setValue(returnValue.code);
				refs.ctlLoadMt.setValue(returnValue.totalMT);
				refs.ctlLoadQty.setValue(returnValue.totalCnt);
				refs.ctlLoadM3.setValue(returnValue.totalCbm);
				me.getSnComboItems();
			} 
			else {
				me.getViewModel().setData({theVslInfo:null});
				var snCombo = me.getStore('snCombo');
				snCombo.loadData([],false);
				refs.ctlSearchSnNo.reset();
			}
		}
		else {
			if(returnValue){
				refs.ctlConfirmHandlingInLocId.setValue(returnValue.data.locId);
			}
			else {
				refs.ctlConfirmHandlingInLocId.setValue();
			}
		}
	},
	
	getSnComboItems: function(){
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('theVslInfo');
		if(theVslInfo){
			var snCombo = me.getStore('snCombo');
			snCombo.load({
				params : {
					vslCallId:theVslInfo.get('vslCallId')
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if(records.length > 0){
							//snCombo.insert(0, [{cdNm: 'Select',cd: ''}]);
							refs.ctlSearchSnNo.setValue('');
						}
					}
				}
			});
		}
	},
	
	getHandlingInItems: function(record){
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('theVslInfo');
		var handlingInItems = me.getStore('handlingInItems');
		handlingInItems.load({
			params : {
				vslCallId: record.get('vslCallId'),
				shipgNoteNo: record.get('shipgNoteNo'),
				unitNo: record.get('unitNo')
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
					}
				}
			}
		});
	},
	
	getGateInItems: function(record){
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('theVslInfo');
		var gateInItems = me.getStore('gateInItems');
		gateInItems.load({
			params : {
				vslCallId: record.get('vslCallId'),
				shipgNoteNo: record.get('shipgNoteNo')
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
					}
				}
			}
		});
	},
	
	onSetActionButton: function (strTp){
		var me = this;
		var refs = me.getReferences();
		
		refs.refBtnCreate.setDisabled(true);
		refs.refBtnDelete.setDisabled(true);
		
		refs.txtRemarks.setEditable(false);
		refs.txtCorrectionNo.setEditable(false);
		refs.btnSetLocId.setDisabled(true);
		
		if(strTp == 'GI'){
			refs.refBtnCreate.setDisabled(false);
			
			refs.ctlInDt.setValue(new Date());
			refs.txtRemarks.setEditable(true);
			refs.txtCorrectionNo.setEditable(true);
			refs.btnSetLocId.setDisabled(false);
		}
		else if(strTp == 'HI'){
			refs.refBtnDelete.setDisabled(false);
		}
	},
	
	// Text Upper Case
	onUpperCase : function(control){
		control.setValue(control.getValue().toUpperCase());
	},

	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
    keyup: function () {

    },
    
    onChangeHandlingInAmt: function(clt, newValue, oldValue, eOpts){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		
		var cgTpCd = detailItem.get('cgTpCd');
	
		var eachWgt = detailItem.get('eachWgt');
		var eachMsrmt = detailItem.get('eachMsrmt');
		var inputQty = Number(newValue);   
//		
//		detailItem.set('wgt', eachWgt * inputQty);
//		detailItem.set('msrmt', eachMsrmt * inputQty);

		//If change Amount after set Allocation => has to Re-Allocation with new Amount
		if(detailItem.get('locId') != '' || me.prevWhItems != null){
			detailItem.set('locId', '');
			me.prevWhItems = null;
		}	
	},

	openUnitListPopup:function(field, button, e){
		var me = this;
		var refs = me.getReferences();

     	var recvData = me.getView().recvData;
     	recvData.set('jobTpCd', 'LF');
		//NTH2407: Hide items that have been processed through handling in.
		recvData.set('searchType', 'LF');
	    me.openCodePopup('popup-unitnoforrorolistpopup',  'ctlUnitNoSearchField' , recvData);
	},
	
	// Detail Save
	onSave:function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		var lorrysPopupStore = me.getStore('confirmHandlingInAssignmentLorrysPopup');
		var infoForm = me.getView().form;
		var theSearch = me.getViewModel().get('theSearch');
		
		if(theSearch.get('driverId') != null && theSearch.get('driverId') != '' ){
			if(detailItem.get('driverId') == null || detailItem.get('driverId') == ''){
				MessageUtil.warning('warning_msg', 'Please select the Driver ID');
				return;
			}
		}else if(theSearch.get('lorryNo') != null && theSearch.get('lorryNo') != ''){
			if(detailItem.get('lorryNo') == null || detailItem.get('lorryNo') == ''){
				MessageUtil.warning('warning_msg', 'Please select the Truck Number');
				return;
			}
		}

		if(StringUtil.isNullorEmpty(detailItem.get('unitNo'))){
			MessageUtil.warning('warning_msg', 'confirmLoadingOfRORO_noUnit_msg');
			return;
		}
		
		if(infoForm.isValid()){//Checking Lorry input by manual:
			//Bonded WH validation
			if(!StringUtil.isNullorEmpty(me.whType) && me.whType == CodeConstants.MT_WHTP_BW){
				if(Token.getCustomHoldChk() === 'Y') {
					me.onBondedWhValidation();
				} else {
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
	
	// Prev Save Check - okSaveButton
	prevSaveCheck : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		
		var actNorMT = detailItem.get('wgt');
		var whBalWgt = detailItem.get('whBalWgt');

		if(actNorMT - whBalWgt > 0){
			MessageUtil.question('info_msg', 'balValidation_msg', null,
					function(button){
						if(button == 'ok'){
							//Terminal Hold
							if(Token.getTmnlHoldChk() === 'Y') {
								me.onTerminalHoldValidation ();
							} else {
								me.onPassedTerminalHoldValidation();
							}
						}
					}
			);
		}else {
			//Terminal Hold
			if(Token.getTmnlHoldChk() === 'Y') {
				me.onTerminalHoldValidation ();
			} else {
				me.onPassedTerminalHoldValidation();
			}
		}
	},
	
	onTerminalHoldValidation : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		
		var store = me.getStore('validationCheck');
		store.load({
			params : {
				tyCd: 'OPE_TMNLHOLD_VALIDATION',
				col1: detailItem.get('vslCallId'),
				col2: detailItem.get('shipgNoteNo'),
				col3: CodeConstants.TMNL_HOLD_CHI
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
		var detailItem = me.getViewModel().get('theRRDetail');
		
		if(me.delvCheck()){
			return;
		} 

		if (!me.timeValidCheck()) {
			return;
		}
		
		var actMTLoad = detailItem.get('accuSumWgt');
        var actQtyLoad = detailItem.get('accuSumQty');    
        var actM3Load = detailItem.get('accuSumMsrmt');    
        var dcMT = detailItem.get('snMt');
        var dcQty = detailItem.get('snQty');    
        var dcM3 = detailItem.get('snM3');
        var isLoadingMT = detailItem.get('wgt');
        var isLoadingQty = detailItem.get('pkgQty');    
        var isLoadingM3 = detailItem.get('msrmt');
	
        if(isLoadingMT > 0 || isLoadingM3 >0 || isLoadingQty > 0){
			if(StringUtil.isNullorEmpty(detailItem.get('locId'))){
				MessageUtil.warning('warning_msg', 'confirmhandlingin_input_location_msg');
				return false;
			}
		}
        if(!me.amtVal())
			 return;
		me.cudData();
	},
	
	delvCheck : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theRRDetail');
		
		if(detailItem.get('delvTpCd') === 'D' && detailItem.get('spCaCoCd') !== 'S'){
			MessageUtil.warning('warning_msg', 'confirmhandlingin_delivery_direct_msg'); // CT1210080003
			return true;
		} else {
			return false;
		}
	},
	
	// timeValidCheck
	timeValidCheck : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theRRDetail');
		
		//Time check
		var startDate = detailItem.get('hdlInStDt');
		var endDate = detailItem.get('hdlInEndDt');
		var startDateFormat = Ext.Date.format(startDate, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var endDateFormat = Ext.Date.format(endDate, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		
		if(startDate != null && endDate != null){
			if(endDate < startDate){
				MessageUtil.warning('warning_msg', 'confirmhandlingin_start_end_date_msg'); // "Start Date Should Be Less Than End Date"
				return false;
			}
		}
		
		return true;
	},
	
	// Cargo Type Save Data - getBindingXml()
	setCargoTypeSaveData : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theRRDetail');
		var refs = me.getReferences();
		
		detailItem.set('cgInOutCd', 'I');
		detailItem.set('delvTpCd', 'I');
		
		detailItem.set('loadCnclMode', 'N');
	},
	
	// cudData
	cudData : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theRRDetail');
		
		me.setCargoTypeSaveData();
		
		if(!me.amtVal()){
			return;
		} else {
			if(StringUtil.isNullorEmpty(me.prevLorryId)){
				detailItem.set('lorryFlag', false);
				me.cudFunction();
			}else if(me.prevLorryId === detailItem.get('lorryId')){
				detailItem.set('lorryFlag', false);
				me.cudFunction();
			}else{
				MessageUtil.question('info_msg', 'confirmhandlingin_change_lorry_no_msg', null, // CT1210001
					function(button){
						me.lorryCudData(button);
					}
				);
			}
		}
	},
	
	// cudFunction
	cudFunction : function(){
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		var detailItem = me.getViewModel().get('theRRDetail');
		detailItem.set('userId', MOST.config.Token.getUserId());
		detailItem.set('packageItems', me.packageItems);
		
		if(detailItem.get('spCaCoCd') === 'S'){
			if(detailItem.get('delvTpCd') === 'D'){
				me.booleanDirSpr = true;
			} else {
				me.booleanDirSpr = false;		
			}
		} else {
			me.booleanDirSpr = false;
		}
		
		if(me.booleanDirSpr){
			var arrWhConfiguration = new Array();
			var whConfigurationItem = new Ext.create('MOST.model.configuration.WhConfiguration');
			me.updateRecordWithNoCommit(whConfigurationItem, detailItem, ['locId', 'spCaCoCd', 'wgt', 'msrmt', 'pkgQty', 'vslCallId', 'cgNo']);
			whConfigurationItem.set('whTpCd', 'G');
			whConfigurationItem.set('locId', detailItem.get('spLocId'));
			arrWhConfiguration.push(whConfigurationItem.data);
			detailItem.set('whConfigurationItems', arrWhConfiguration);
		} else {
			if(me.shuWhItems){
				for(var i =0; i<me.shuWhItems.length; i++){
					me.prevWhItems.push(me.shuWhItems[i]);
				}
			}
			if(me.dmgWhItems){
				for(var i =0; i<me.dmgWhItems.length; i++){
					me.prevWhItems.push(me.dmgWhItems[i]);
				}
			}
			detailItem.set('whConfigurationItems', me.prevWhItems);
		}

		var currentTime = Ext.Date.format(new Date(), 'd/m/Y H:i');
		var startDtStr =  Ext.Date.format(refs.confirmHandlingInStartTime.getValue(), 'd/m/Y H:i');
		var endDtStr = currentTime;
		detailItem.set('hdlInStDtStr', startDtStr); 
		detailItem.set('hdlInEndDtStr', endDtStr); 		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = me.CARGO_HANDLING_IN_PROXY_URL;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('item', detailItem.data);
		updateParm.save({
			callback: function(records, operation, success) {
				if (success) {
//					me.saveDimension(records);
//					me.saveDamage(records);
					
					detailItem.commit();
					MessageUtil.saveSuccess(); // Success Message
					
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
	

	// lorryCudData
	lorryCudData : function(isOk){
		var me = this;
		var detailItem = me.getViewModel().get('theRRDetail');
		
		if (isOk === 'ok') {
			detailItem.set('lorryFlag', true);
		} else {
			detailItem.set('lorryFlag', false);
			detailItem.set('lorryId', me.prevLorryId);
		}
		
		me.cudFunction();
	},
	
	
	// amtVal
	amtVal : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theRRDetail');
		
		var actNorMT = detailItem.get('wgt');
		var actNorM3 = detailItem.get('msrmt');
		var actNorQty = detailItem.get('pkgQty');

		var whBalWgt = detailItem.get('whBalWgt');
		var whBalMsrmt = detailItem.get('whBalMsrmt');
		var whBalQty = detailItem.get('whBalQty');
		
		//Input Qty => auto calculate MT M3 by eachWgt eachM3:
		if(actNorQty <= 0){
			MessageUtil.warning('warning_msg', 'confirmhandlingin_amount_qty_zero');
			return false;
		}
		
		if(actNorQty > whBalQty){
			MessageUtil.warning('warning_msg', 'confirmhandlingin_amount_qty');
			return false;
		}
		
		//Validate with package items
		if(me.packageItems.length > 0){
			if(actNorQty != me.packageItems.length){
				MessageUtil.warning('warning_msg', 'packageItemValidationMsg'); // CT1210060012
				return false;
			}
		}
		return true;
	},
	
	onCancel:function(){
		var me = this;
		var window = me.getView().up('window');
		window.close();
	},
	
	openDriversPopup:function(field, button, e){
		var me = this;
		var refs = me.getReferences();
		var params = {
			driverId: refs.ctlDriverID.getValue(),
			cgTpCd: 'RCV'
		};
	    me.openCodePopup('popup-driverlistpopup',  'ctlDriverID', params);
	},
});

