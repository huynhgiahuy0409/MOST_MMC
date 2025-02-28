Ext.define('MOST.view.operation.WHCheckImportController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.whcheckimport',
	
	/**
	 * =========================================================================================================================
	 * VARIABLE, CONSTANT START
	 */
	CARGO_DISCHARGING_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/whcheckimport/whCheckImport',
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
		var store = me.getStore('whCheckImport');
		var hatchListStore = me.getStore('whCheckImportHatchList');
		var hatchNoComboForBbk = me.getStore('whCheckImportForBbkHatchNoCombo');
		var hatchNoComboForDbk = me.getStore('whCheckImportForDbkHatchNoCombo');
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
		
		hatchListStore.load({
			params:{
				vslCallId : params.vslCallId,
				shftId : params.shftId,
				shftDt : params.shftDt
			},
			callback: function(record, operation, success) {
				if(success){
					if(record != null && record.length > 0){
						hatchNoComboForBbk.setData(record[0].get('bbkOpHatchList'));
						hatchNoComboForBbk.insert(0, {hatchNo:''});
						hatchNoComboForDbk.setData(record[0].get('dbkOpHatchList'));
						hatchNoComboForDbk.insert(0, {hatchNo:''});
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
		var detailItem = me.getViewModel().get('theDetail');
		var refs = me.getReferences();
		
		
		if(me.prevWhItems.length == 0){
			MessageUtil.warning('warning_msg', 'whCheckImportSelectLocation');

			me.unMaskConfirmProcess();
			return;
		}
		
		
		var infoForm = me.getView().form;
		if(infoForm.isValid()){

			var whQty = Number(refs.ctlWhQty.getValue());
			if(refs.refCargoType.getValue() == CodeConstants.MT_CGTP_BBK){
				if(whQty <= 0){
					MessageUtil.warning('warning_msg', 'confirmdischarging_qty_zero_msg');
					refs.ctlConfirmDischargingWhQty.setValue(0);
					
					me.unMaskConfirmProcess();
					return;
				}
			}
			
			// if(detailItem.get('cgTpCd') == CodeConstants.MT_CGTP_LQN){
			// 	if(detailItem.get('tsptTpCd') != null && detailItem.get('tsptTpCd') != '' && detailItem.get('tsptTpCd') == 'PL'){

			// 		if(StringUtil.isNullorEmpty(detailItem.get('lorryNo'))){
			// 			MessageUtil.question('info_msg', 'This cargo lorry is empty. Do you want to keep this confirmation?',null,
			// 					function(button){
			// 						if(button == 'ok'){
			// 							//Bonded WH validation
			// 							if(!StringUtil.isNullorEmpty(me.whType) && me.whType == CodeConstants.MT_WHTP_BW){
			// 								me.onBondedWhValidation();
											
			// 							} else {
			// 								me.onWeightingScaleValidation();
			// 							}
			// 						}else{
			// 							return;
			// 						}
			// 					});
			// 		}else{
			// 			//Bonded WH validation
			// 			if(!StringUtil.isNullorEmpty(me.whType) && me.whType == CodeConstants.MT_WHTP_BW){
			// 				me.onBondedWhValidation();
							
			// 			} else {
			// 				me.onWeightingScaleValidation();
			// 			}
			// 		}
			// 	}else{
			// 		if(StringUtil.isNullorEmpty(detailItem.get('lorryNo'))){
			// 			MessageUtil.warning("warning_msg", "mandatoryField_msg", ViewUtil.getLabel('yardTruck'));
						
			// 			me.unMaskConfirmProcess();
			// 			return;
			// 		}else{

			// 			//Bonded WH validation
			// 			if(!StringUtil.isNullorEmpty(me.whType) && me.whType == CodeConstants.MT_WHTP_BW){
			// 				me.onBondedWhValidation();
							
			// 			} else {
			// 				me.onWeightingScaleValidation();
			// 			}
			// 		}
			// 	}
			// }else{
			// 	if(StringUtil.isNullorEmpty(detailItem.get('lorryNo'))){
			// 		MessageUtil.warning("warning_msg", "mandatoryField_msg", ViewUtil.getLabel('yardTruck'));
					
			// 		me.unMaskConfirmProcess();
			// 		return;
			// 	}
			// 	//Bonded WH validation
			// 	if(!StringUtil.isNullorEmpty(me.whType) && me.whType == CodeConstants.MT_WHTP_BW){
			// 		me.onBondedWhValidation();
					
			// 	} else {
			// 		me.onWeightingScaleValidation();
			// 	}
			// }

			if(StringUtil.isNullorEmpty(detailItem.get('lorryNo'))){
				MessageUtil.warning("warning_msg", "mandatoryField_msg", ViewUtil.getLabel('yardTruck'));
				
				me.unMaskConfirmProcess();
				return;
			}

			me.onZb1HoldValidation();
			
		} else {
			MessageUtil.mandatoryFieldInValid();
			me.unMaskConfirmProcess();
		}
	},
	
	
	// WarehouseAllocation
	onWarehouseAllocation : function(controlName){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
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
		
		if(masterItem.get('items') != null && masterItem.get('items').length > 0){
			var detailItem = Ext.create('MOST.model.operation.CargoDischarging');
			DateUtil.convertDateToLong(masterItem.get('items')[0], ['startDt', 'endDt']); // date to long
			
			masterItem.get('items')[0].lorryId = '';
			detailItem.data = masterItem.get('items')[0];
			
			var currentTime = Ext.Date.format(new Date(), 'd/m/Y H:i');
			refs.ctlWhCheckImportStartDt.setValue(currentTime);
			me.prevDate['startDt'] = currentTime;
			
			me.prevData.set('vslCallId', detailItem.get('vslCallId'))
            me.prevData.set('vslCd', detailItem.get('vslCd'))
            me.prevData.set('scn', detailItem.get('scn'))
            me.prevData.set('callSeq', detailItem.get('callSeq'))
            me.prevData.set('callYear', detailItem.get('callYear'))
			
			detailItem.set('startDt', currentTime);
			detailItem.set('preJobNo', recvData.get('jobNo'));
			detailItem.set('shiftNm', recvData.get('shiftNm'));
			detailItem.set('delvTpNm', recvData.get('delvTpNm'));
			detailItem.set('fnlOpeYn', recvData.get('fnlOpeYn'));
			detailItem.set('lorryNo', recvData.get('lorryNo'));
			detailItem.set('whM3', recvData.get('yardTruckM3'));
			detailItem.set('whWgt', recvData.get('yardTruckMT'));
			detailItem.set('whQty', recvData.get('yardTruckQty'));
			detailItem.set('cgNo', detailItem.get('blNo'));
			detailItem.set('cgTpCdNm', recvData.get('cgTpCdNm'));
			detailItem.set('pkgTpNm', recvData.get('pkgTpNm'));
			detailItem.set('pkgNo', recvData.get('pkgNo'));
			
			detailItem.set('wbTransactionNo', recvData.get('wbTransactionNo'));
			detailItem.set('secondWgt', recvData.get('secondWgt'));
			
			detailItem.phantom = false; // UPDATE
			detailItem.commit();
			me.getViewModel().setData({theDetail:detailItem});
			me.getView().recvData = detailItem;
			
			modeOfOprCombo.setData(masterItem.get('modeOfOprList'));
			modeOfOprCombo.insert(0, {scd:'', scdNm:'Selected'});
			deliveryCombo.setData(masterItem.get('deliveryList'));
			cargoTypeCombo.setData(masterItem.get('cargoTypeList'));
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
									//Mantis: 0167985
									detailItem.set('locId', "");
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
			
			var packageStore = me.getStore('packageNoList');
			
			var setChkPtyCdValue = '';
			var cnt = 0;
			var storeTotal = packageStore.data.items.length;
			var selectArray = new Array();
			
			packageStore.load({
				params: {
					vslCallId: detailItem.data.vslCallId,
					blNo: detailItem.data.blNo,
					jobPurpCd: detailItem.data.delvTpCd == 'D' ? 'VG' : 'AW',
					ixCd: 'I'
				},
				callback: function(records, operation, success) {
					if (success) {
						packageStore.each(function(record,idx){
							if(packageStore.data.items.length > cnt && detailItem.get('pkgNo').includes(record.get("packageNo"))){
								if(setChkPtyCdValue === ''){
									setChkPtyCdValue = record.get("packageNo")
								} else {
									setChkPtyCdValue += "," + record.get("packageNo")
								}
								
								var pkgItem = Ext.create('MOST.model.operation.PackageJobItem', {
									vslCallId: record.get("vslCallId"),
									mfDocId : record.get("mfDocId"),
									refNo: record.get("refNo"),
									pkgNo: record.get("packageNo")
								});
								
								selectArray.push(pkgItem.data);
							}
							cnt++;
						});
						me.packageItems = selectArray;
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
			shftDt : recvData.get('shftDt'),
			shftId : recvData.get('shftId'),
			blNo : recvData.get('blNo'),
			searchType : 'discharging',
			hhtFlags : '1STLD'
		};
    	
    	return params;
	},

	// save
	save: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
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
		var detailItem = me.getViewModel().get('theDetail');
		detailItem.set('userId', MOST.config.Token.getUserId());
		
		detailItem.set('opDelvTpCd', 'A');  
		
		detailItem.set('whConfigurationItems', me.prevWhItems);
		detailItem.set('packageItems', me.packageItems);

		var currentTime = Ext.Date.format(new Date(), 'd/m/Y H:i');
		var startDtStr =  Ext.Date.format(refs.ctlWhCheckImportStartDt.getValue(), 'd/m/Y H:i');
		var endDtStr = currentTime;
		detailItem.set('startDtStr', startDtStr); 
		detailItem.set('endDtStr', endDtStr); 
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = me.CARGO_DISCHARGING_PROXY_URL;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('item', detailItem.data);
		updateParm.save({
			callback: function(record, operation, success) {
				if(success){
					me.saveDimension(record);
					me.saveDamage(record);
					
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

		if(refs.ctlCtnConfirmWHCheckImportBtn){
			var win = refs.ctlCtnConfirmWHCheckImportBtn.up('panel');
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
		var detailItem = me.getViewModel().get('theDetail');
		
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

	//MOST_MMC_JPB.OPR-005. Check ZB1 release
	onZb1HoldValidation : function(){
		var me = this;
		
		// var isCheckZB1 = (Token.getZb1HoldChk() != 'Y');		
		// if(isCheckZB1){
		// 	me.onPassedZb1HoldValidation();
		// 	return;
		// }
		
		var detailItem = me.getViewModel().get('theDetail');
		var store = me.getStore('validationCheck');
		
		store.load({
			params : {
				tyCd: 'ZB_RELEASED_VALIDATION',
				col1: CodeConstants.DOC_ID_ZB1,
				col2: detailItem.get('vslCd'),
				col3: detailItem.get('scn'),
				col4: detailItem.get('callYear'),
				col5: detailItem.get('callSeq'),
				col6: detailItem.get('blNo')				
			},

			callback: function(records, operation, success) {
				if (success) {
					if(records.length === 0 || (records[0].get('isValidated') != 'Y')){
						MessageUtil.warning('warning_msg', 'confirmdischarging_zb1_blockprocess_msg');
						me.unMaskConfirmProcess();
					}else{
						me.onWeightingScaleValidation();
					}
					store.removeAll();
					store.commitChanges();
				} else {
					me.unMaskConfirmProcess();
				}
			},
		});
	},
	
	onBondedWhValidation : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var store = me.getStore('validationCheck');
		me.onWeightingScaleValidation();
		store.load({
			params : {
				tyCd: 'BONDED_WH_VALIDATION',
				col1: detailItem.get('vslCallId'),
				col2: detailItem.get('mfDocId'),
				col3: 'I'
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(records[0].get('isValidated') == 'N'){
							MessageUtil.warning('warning_msg', 'BondedWH_validation_msg');
							me.unMaskConfirmProcess();
							return false;
						}
						else {
							me.onWeightingScaleValidation();
						}
					}
					else {
						me.onWeightingScaleValidation();
					}
				}
			}
		});
	},
	
	//3. TRUCK VALIDATION
	//**Result: N - has been done 2 times scaling/ Y: just passed 1st time scaling
	onWeightingScaleValidation : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var store = me.getStore('validationCheck');
		me.save();
		/*
		store.load({
			params : {
				tyCd: '2ND_WEIGHTED_VALIDATION',
				col1: detailItem.get('wbTransactionNo')
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(records[0].get('isValidated') == 'Y'){
							MessageUtil.question('info_msg', 'truckValidation_msg03', null,
									function(button){
										if(button == 'ok'){
											me.save();
										}
										else {
											me.unMaskConfirmProcess();
											return false;
										}
									}
								);
						}
						else {
							me.save();
						}
					}
					else {
						me.save();
					}
				}
			}
		});
		 */
	},
	
	//4: amtValidation
	amtValidation : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var actMT=0;
		var actM3=0;
		var actQty=0;
		
		actMT = detailItem.get('whWgt');
		actM3 =  detailItem.get('whM3');
		actQty =  detailItem.get('whQty');
		
		if(detailItem.get('cgTpCd') !=  null && detailItem.get('cgTpCd') == 'BBK'){
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
		}
		
		return false;
	},
	/**
	 * =========================================================================================================================
	 * VALIDATION METHOD START
	 */

});