Ext.define('MOST.view.operation.WHCheckImportForROROController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.whcheckimportforroro',
	
	/**
	 * =========================================================================================================================
	 * VARIABLE, CONSTANT START
	 */
	CONFIRM_DISCHARGING_RORO_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/whcheckimport/whCheckImportForRORO',
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
	whType: '',
	
	DAMAGE_STORE: 'damageStore',
	DAMAGE_CHECK_STORE: 'damageCheckStore',
	DIMENSION_STORE: 'dimensionStore',
	UPLOAD_STORE: 'uploadStore',
	
	packageItems : new Array(),
	
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
		var store = me.getStore('whCheckImportForRORO');
		var params = me.getSearchCondition();
		var window = me.getView().up('window');
		me.prevData = recvData.clone();
		
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
		
		//window.center();
	},

    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onCancel:function(){
		var me = this;
		var window = me.getView().up('window');
		
		window.close();
	},
	
	// Detail Save
	onSave:function(){
		var me = this;
		me.maskConfirmProcess();
		var detailItem = me.getViewModel().get('theRRDetail');
		var refs = me.getReferences();
		
		if(StringUtil.isNullorEmpty(detailItem.get('locId'))){
			MessageUtil.warning('warning_msg', 'whCheckImportSelectLocation');

			me.unMaskConfirmProcess();
			return;
		}
		
		
		var infoForm = me.getView().form;
		if(infoForm.isValid()){
			var whQty = Number(refs.ctlWhQty.getValue());
			if(whQty <= 0){
				MessageUtil.warning('warning_msg', 'confirmdischarging_qty_zero_msg');
				me.unMaskConfirmProcess();
				return;
			}
		} else {
			MessageUtil.mandatoryFieldInValid();
			me.unMaskConfirmProcess();
		}
		me.save();
	},
	
	
	// WarehouseAllocation
	onWarehouseAllocation : function(controlName){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		var control = me.lookupReference(controlName);
		var title = 'Warehouse Allocation';
		var selection;
	
		if(controlName === 'ctlWhCheckImportLocId'){
			// Validation
			// Validation
			if(	refs.ctlWhMt.getValue() <= 0 &&
				refs.ctlWhM3.getValue() <= 0 &&
				refs.ctlWhQty.getValue()<= 0){
				
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
				blSn: detailItem.get('blNo'),
				hdlInDt: detailItem.get('endDt'),
				cgNo: refs.ctlCgNo.getValue(),
				grMt: refs.ctlWhMt.getValue(),
				grM3: refs.ctlWhM3.getValue(),
				grQty: refs.ctlWhQty.getValue(),
				catgCd : detailItem.get('catgCd'),
				cgTpCd: detailItem.get('cgTpCd'),
				eachMt: detailItem.get('eachWgt'),
				eachM3: detailItem.get('eachVol'),
				title: 'Warehouse Allocation',
			});
			selection.title = 'Warehouse Allocation';
		}

		me.openCodePopup('app-warehouseofgc',controlName, selection);
	},
	
	//OPR-001
	openAssignmentYardTruckPopup:function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.prevData;
		var params = {
				vslCallId : recvData.get('vslCallId'),
				blNo : recvData.get('blNo')
			}
		me.openCodePopup('popup-assignmentyardtruckpopup', 'refYardTruck', params);
	},
	
	onOpenPkgNoPopup: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var params = {
				vslCallId: detailItem.get('vslCallId'),
				blNo: detailItem.get('blNo'),
				ixCd: 'I',
				jobPurpCd: 'AW'
		}
		
		me.openCodePopup('popup-packagenomultipopup', 'cltPkgNo', params);
	},
	
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
	setDetailInitialize:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.prevData;
		var modeOfOprCombo = me.getStore('whCheckImportForModeOfOprCombo');
		var deliveryCombo = me.getStore('whCheckImportForDeliveryCombo');
		var cargoTypeCombo = me.getStore('whCheckImportsForCargoTypeCombo');
//		
		if(masterItem != null){
			var detailItem = Ext.create('MOST.model.operation.ConfirmDischargingOfRORO');
			DateUtil.convertDateToLong(masterItem.data, ['startDt', 'endDt']); // date to long
			
			detailItem.data = recvData.data;
			
			var currentTime = Ext.Date.format(new Date(), 'd/m/Y H:i');
			refs.ctlWhCheckImportStartDt.setValue(currentTime);
			me.prevDate['startDt'] = currentTime;	
			
			detailItem.set('startDt', currentTime);
			detailItem.set('preJobNo', recvData.get('jobNo'));
			detailItem.set('shiftNm', recvData.get('shiftNm'));
			detailItem.set('delvTpNm', recvData.get('delvTpNm'));
			detailItem.set('fnlOpeYn', recvData.get('fnlOpeYn'));
			detailItem.set('lorryNo', recvData.get('lorryNo'));
			detailItem.set('balQty', masterItem.get('balQty'));
			detailItem.set('balMt', masterItem.get('balMt'));
			detailItem.set('balM3', masterItem.get('balM3'));
			detailItem.set('cgNo', detailItem.get('blNo'));
			detailItem.set('cgTpCdNm', recvData.get('cgTpCdNm'));
			detailItem.set('pkgTpNm', recvData.get('pkgTpNm'));
			detailItem.set('rePkgTpCd', recvData.get('pkgTpCd'));
			detailItem.set('secondWgt', recvData.get('secondWgt'));
			detailItem.set('unitNo', masterItem.get('unitNo'));
			

//			detailItem.set('whQty', recvData.get('dischargedQty'));
//			detailItem.set('whWgt', recvData.get('dischargedMT'));
//			detailItem.set('whM3', recvData.get('dischargedM3'));
			detailItem.set('whM3', masterItem.get('yardTruckM3'));
			detailItem.set('whWgt', masterItem.get('yardTruckMt'));
			detailItem.set('whQty', masterItem.get('yardTruckQty'));
			detailItem.phantom = false; // UPDATE
			detailItem.commit();
			me.getViewModel().setData({theRRDetail:detailItem});
			me.getView().recvData = detailItem;
			
			refs.refCargoType.setReadOnly(true);

			var store = me.getStore('loadLocation');

			store.load({
				params:{
					vslCallId : detailItem.get('vslCallId'),
					blNo : detailItem.get('blNo'),
				},
				callback: function(records, operation, success) {
					if (success) {
						if (records != null && records.length > 0) {
							if (records.length > 1) {
								var res = records[0].data.locId.split('-'),
									locId = records[0].data.whId;
									
									locId += '(' + res[1] + ',' + records.length + ')';
									detailItem.set('locId',locId);
								return;
							}else{
								var whItems = new Array();
								var handlingItem = Ext.create('MOST.model.configuration.WhConfiguration', {
									locTpCd:  records[0].get('locTpCd'),
									whId: records[0].get('whId'),
									locId :records[0].get('locId'),
									vslCallId : detailItem.get('vslCallId'),
									cgNo : detailItem.get('blNo'),
									wgt:  recvData.get('yardTruckMT'),
									msrmt: recvData.get('yardTruckM3'),
									pkgQty:  recvData.get('yardTruckQty'),
									whTpCd:'G',
									spCaCoCd :''
								});
								whItems.push(handlingItem.data);
								me.prevWhItems = whItems;
								detailItem.set('locId', records[0].get('location'));
							}
						}
						
					}
				}
			});

		}
	},
	
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var recvData = me.getView().recvData;

    	var params = {
			vslCallId : recvData.get('vslCallId'),
			cgTpCd : recvData.get('cgTpCd'),
			blNo : recvData.get('blNo'),
			searchType : 'JOBVA',
			hhtFlags : '1STLD'
		};
    	
    	return params;
	},

	// save
	save: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		var recvData = me.prevData;

		//Time check
		var startDt = me.prevDate['startDt'];
		var endDt = me.prevDate['endDt'];
		var newStartDate = detailItem.get('startDt');
		var newEndDate = detailItem.get('endDt');
		var startDateFormat = Ext.Date.format(me.prevDate['startDt'], MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var endDateFormat = Ext.Date.format(me.prevDate['endDt'], MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		
		if(newEndDate != null){
			if(newEndDate < newStartDate){
				MessageUtil.warning('warning_msg', 'confirmloading_start_end_date_msg'); // "Start Date Should Be Less Than End Date"
				
				me.unMaskConfirmProcess();
				return;
			}
		}

		if(me.amtValidation()){
			
			me.unMaskConfirmProcess();
			return;
		}
		
		me.cudData();
	},

	// cudData
	cudData : function(){
		var me = this;
		var window = me.getView().up('window');
		var parentView = me.getParentView();
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		detailItem.set('userId', MOST.config.Token.getUserId());
		
		detailItem.set('opDelvTpCd', 'A');  
		
		detailItem.set('whConfigurationItems', me.prevWhItems);
		detailItem.set('packageItems', me.packageItems);

		var currentTime = Ext.Date.format(new Date(), 'd/m/Y H:i');
		var startDtStr =  Ext.Date.format(refs.ctlWhCheckImportStartDt.getValue(), 'd/m/Y H:i');
		var endDtStr = currentTime;
		detailItem.set('startDtStr', startDtStr); 
		detailItem.set('endDtStr', endDtStr); 
		detailItem.set('inDate', endDtStr);
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = me.CONFIRM_DISCHARGING_RORO_PROXY_URL;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('item', detailItem.data);
		updateParm.save({
			callback: function(record, operation, success) {
				if(success){
//					me.saveDimension(record);
//					me.saveDamage(record);
					
					MessageUtil.saveSuccess(); // Success Message
					detailItem.commit();
					me.onLoad();
					if(parentView.getController().onSearch){
						
						if(parentView.getController().onCallBackFromOperationScreen){
							parentView.getController().onCallBackFromOperationScreen();
						}
						
						parentView.getController().onSearch();
					}

					me.unMaskConfirmProcess();
					window.close(); 
				}
			}
		});
	},

	maskConfirmProcess: function(){
		var me = this;
		var refs = me.getReferences();
		
		if(refs.ctlCtnConfirmWHCheckImportBtn){
			var win = refs.ctlCtnConfirmWHCheckImportBtn.up('panel');
			if(win){
				win.getEl().mask('Processing...');
			}
		}
	},

	unMaskConfirmProcess: function(){
		var me = this;
		var refs = me.getReferences();

		if(refs.ctlCtnConfirmWHCheckImportForROROBtn){
			var win = refs.ctlCtnConfirmWHCheckImportForROROBtn.up('panel');
			if(win){
				win.getEl().unmask();
			}
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
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		
		if(targetControl === 'ctlWhCheckImportLocId'){
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
			refs.ctlWhCheckImportLocId.setValue(returnValue.data.locId);
			
		} else if(targetControl === 'cltPkgNo'){
			if(returnValue){
				var qty = 0;
				var mt = 0;
				var m3 = 0;
				var packageItems = new Array();
				
				for(var i = 0; i < returnValue.item.length; i++){
					var returnItem = returnValue.item[i];
					var pkgItem = Ext.create('MOST.model.operation.PackageJobItem', {
						vslCallId: returnItem.vslCallId,
						mfDocId : returnItem.mfDocId,
						refNo: returnItem.refNo,
						pkgNo: returnItem.packageNo
					});
					
					qty += 1;
					mt += Number(returnValue.item.at(i).mt);
					m3 += Number(returnValue.item.at(i).m3);
					
					packageItems.push(pkgItem.data);
				}
				
				detailItem.set('whQty', qty);
				detailItem.set('whWgt', mt);
				detailItem.set('whM3', m3);
				
				me.packageItems = packageItems;
				refs.cltPkgNo.setValue(returnValue.code);
			} else {
				me.packageItems = new Array();
				refs.cltPkgNo.setValue();
			}
		} else if(targetControl === 'refYardTruck'){
			if(returnValue){
				detailItem.set('wbTransactionNo', returnValue.item.get('wbTransactionNo'));
			}
			else {
				detailItem.set('wbTransactionNo', '');
			}
		}else if(targetControl === 'ctlUnitNoSearchField'){
			if(returnValue){
				refs.ctlUnitNoSearchField.setValue(returnValue.code);
				refs.ctlWhMt.setValue(returnValue.totalMT);
				refs.ctlWhQty.setValue(returnValue.totalCnt);
				detailItem.set('sdoNo', returnValue.items[0].sdoNo);
			}
		}
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */

	
	/**
	 * =========================================================================================================================
	 * VALIDATION METHOD START
	 */
	
	
	//4: amtValidation
	amtValidation : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		
		var actMT=0;
		var actM3=0;
		var actQty=0;
		
		actMT = detailItem.get('whWgt');
		actM3 =  detailItem.get('whM3');
		actQty =  detailItem.get('whQty');
		
		if(actQty <=0){
			MessageUtil.warning('warning_msg', 'confirmdischarging_qty_zero_msg'); // CT1210060012
			return true;
		}
		
		//Validate with package items
		if(me.packageItems.length > 0){
			if(actQty != me.packageItems.length){
				MessageUtil.warning('warning_msg', 'packageItemValidationMsg'); // CT1210060012
				return true;
			}
		}
		
		return false;
	},
	
	
	openUnitListPopup:function(field, button, e){
		var me = this;
		var refs = me.getReferences();

     	var recvData = me.getView().recvData;
     	recvData.set('jobPurpCd', 'AW');
     	recvData.set('searchType', 'WHIP');
//     	recvData.set('flag', 'Y');
	    me.openCodePopup('popup-unitnoforrorolistpopup',  'ctlUnitNoSearchField' , recvData);
	},
	/**
	 * =========================================================================================================================
	 * VALIDATION METHOD START
	 */

});