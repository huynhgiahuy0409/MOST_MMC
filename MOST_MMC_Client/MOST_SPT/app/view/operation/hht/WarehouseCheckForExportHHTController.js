Ext.define('MOST.view.operation.hht.WarehouseCheckForExportHHTController', {
	extend : 'MOST.view.foundation.BaseViewController',

	requires : [],

	alias : 'controller.warehousecheckforexporthht',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	WAREHOUSE_CHECK_EXPORT_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/whcheckexport/warehousecheckforexport',
	WAREHOUSE_POPUP_ALIAS : 'app-warehousepopup',
	prevDate : {
		startDt : null,
		endDt : null
	},
	prevWhItems: null,
	DAMAGE_STORE: 'damageStore',
	DIMENSION_STORE: 'dimensionStore',
	UPLOAD_STORE: 'uploadStore',
	
	packageItems : new Array(),
	whType: '',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var params = me.getSearchCondition();

		var store = me.getStore('warehouseCheckForExportList');

		me.prevData = recvData.clone();
		me.booleanDirSpr = false;
		
		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success){
					if(record != null && record.length > 0){
						me.setDetailInitialize(record[0]);
						me.operationSeting();
					}
					
					var lorryStore = me.getStore('assignedInternalTruckListPopup');

					title = 'Yard Truck List';
					
					var recvData = me.getView().recvData;
					
					var paramsForLorryStore  = {
							title: title,
							vslCallId: recvData.get('vslCallId'),
							blNo: '',
							shipgNoteNo: recvData.get('shipgNoteNo'),
							weightCheckYn: '',
						};
					
					lorryStore.load({
						params: paramsForLorryStore,
						callback: function(record, operation, success) {
							if(success){
								if(record != null && record.length > 0){
									refs.refLorryNo.setValue(record[0].get('lorryNo'));
								}
							}
						}
					});
				}
			}
		});
		
		
		
	},


	
	/**
	 * =========================================================================================================================
	 * INITIALIZE END
	 */



	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	 onWarehouseDeAllocation : function(controlName){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		if(controlName === 'refWHCheckExportDeAllocation'){      
			if(!me.onValidateAmtDeAlloc()){
				return;
			}			
			selection = Ext.create('MOST.model.operation.WHCheckExport', {
				vslCallId: detailItem.get('vslCallId'),
				whTpCd:'G',
				blSn: detailItem.get('shipgNoteNo'),
				cgNo: detailItem.get('grNo'),
				cgTpCd: detailItem.get('cgTpCd'),
				grMt: detailItem.get('loadMt'),
				grM3: detailItem.get('loadM3'),
				grQty: detailItem.get('loadQty'),
				catgCd : detailItem.get('catgCd'),
				eachMt : detailItem.get('eachMt'),
				eachM3 : detailItem.get('eachM3'),
			});
		}
		me.openCodePopup('app-warehouseallocation',controlName, selection);		
	},

	onValidateAmtDeAlloc: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var cgTpCd = detailItem.get('cgTpCd');

		var whBalQty = detailItem.get('whBalQty');
		var whBalMt = detailItem.get('whBalMt');
		var whBalM3 = detailItem.get('whBalM3');

		var loadQty = detailItem.get('loadQty');
		var loadMt = detailItem.get('loadMt');
		var loadM3 = detailItem.get('loadM3');
		
		if(cgTpCd === CodeConstants.MT_CGTP_BBK){
//			if(whBalMt === 0){
//				MessageUtil.warning('warning_msg', 'warehousecheckexport_balqty_msg');
//				return false;
//			}
//
//			if(refs.refLoadQty.getValue() <= 0){
//				MessageUtil.warning('warning_msg', 'warehousecheckexport_qty_msg');
//				return false;
//			}

			if(refs.refLoadQty.getValue() > whBalQty){
				MessageUtil.warning('warning_msg', 'warehousecheckexport_bbk_exceed_msg');
				return false;
			}
		}

//		if(cgTpCd === CodeConstants.MT_CGTP_DBN){
//			if(whBalMt === 0){
//				MessageUtil.warning('warning_msg', 'warehousecheckexport_balmt_msg');
//				return false;
//			}
//
//			if(refs.refLoadMt.getValue() <= 0){
//				MessageUtil.warning('warning_msg', '');
//				return false;
//			}
//
//			if(loadMt > whBalMt || loadM3 > whBalM3 || loadQty > whBalQty){
//				MessageUtil.warning('warning_msg', 'warehousecheckexport_dbk_exceed_msg');
//				return false;
//			}
//		}

		return true;
	},	
	
	onChangeHandlingAmt: function(ref, newValue, oldValue, eOpts){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var cgTpCd = detailItem.get('cgTpCd');
		
		if(!me.checkOverBalance(ref, newValue)){
			MessageUtil.warning('warning_msg', 'warehousecheckexport_dbk_exceed_msg');
			
			ref.suspendEvents();
			ref.setValue(oldValue);
			ref.resumeEvents();
			
			return;
		}

		//Auto Calculate with BBK:
		if(ref.reference === 'refLoadQty' && cgTpCd === CodeConstants.MT_CGTP_BBK){
			var eachWgt = detailItem.get('eachMt');
			var eachMsrmt = detailItem.get('eachM3');
			var inputQty = Number(newValue);   
			
			if (inputQty == detailItem.get('whBalQty')) {
				var mt =  detailItem.get('whBalMt');
				var m3 =  detailItem.get('whBalM3');
			}
			else {
				var mt =  (eachWgt * inputQty).toFixed(3);
				var m3 =   (eachMsrmt * inputQty).toFixed(3);
			}
			
			detailItem.set('loadMt', mt );
			detailItem.set('loadM3', m3);
		}
		
//		if(cgTpCd === CodeConstants.MT_CGTP_DBN){
//			var mt =Number(refs.refLoadMt.getValue()).toFixed(3),
//				qty = Number(refs.refLoadQty.getValue()),
//				m3 =Number(refs.refLoadM3.getValue()).toFixed(3),
//
//				balanceMt = Number(detailItem.get('whBalMt')).toFixed(3),
//				balanceM3 = Number(detailItem.get('whBalM3')).toFixed(3),
//				balanceQty = Number(detailItem.get('whBalQty')),
//
//				refsQty = refs.refLoadQty,
//				refsMt = refs.refLoadMt,
//				refsM3 = refs.refLoadM3;
//	
//			if(mt - balanceMt > 0){
//				MessageUtil.warning('warning_msg', 'confirmhandlingout_mt_exceed_msg');
//				refsMt.setValue(0);
//				return;
//			}
//			if(m3 - balanceM3 > 0){
//				MessageUtil.warning('warning_msg', 'confirmhandlingout_m3_exceed_msg');
//				refsM3.setValue(0);
//				return;
//			}
//			if(qty - balanceQty > 0){
//				refsQty.setValue(0);
//				MessageUtil.warning('warning_msg', 'confirmhandlingoutg_qty_exceed_msg');
//				return;
//			}
//		}

		//If change Amount after set DeAllocation => has to Re-DeAllocation with new Amount
		if(detailItem.get('locId') != '' || me.prevWhItems != null){
			detailItem.set('locId', '');
			me.prevWhItems = null;
		}
		
		me.autoDeAllocation();
		
	},
	
	autoDeAllocation: function () {
		var me = this, searchType,
		 	recvData = me.getView().recvData,
			refs = me.getReferences(),
		 	loadQty = refs.refLoadQty.getValue(),
		 	balQty = refs.refBalQty.getValue();

		var viewPlanInfoStore = me.getStore('WhViewList');
		searchType = 'viewPlanInfo';
		viewPlanInfoStore.load({
			params: {
				searchType: searchType,
				whId: '',
				bayQty: 0,
				rowQty: 0,
				vslCallId: recvData.data.vslCallId,
				shipgNoteNo: recvData.data.shipgNoteNo
			},
			callback: function(records, operation, success) {
				if(records && records.length > 0 && records[0].data.locId){
					if (records.length > 1 && loadQty < balQty) {
						var loc = records[0].data.locId,
							sameLoc = true,
							whItems = new Array();
						for(var i = 0; i < records.length; i++){
							if(loc != records[i].data.locId)
							{
								sameLoc = false;
								me.prevWhItems = null;
								refs.refWHCheckExportDeAllocation.setValue();
								return;
							}
						}
						if (sameLoc) {
							var qtyLoad = loadQty;
							for(var i = 0; i < records.length; i++){
								var invLocItem = records[i];
								if (qtyLoad > 0) {
									if (invLocItem.data.pkgQty <= qtyLoad) {
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
										
									}
									else {
										var eachMt = (Number(invLocItem.data.wgt)/Number(invLocItem.data.pkgQty)).toFixed(3),
											eachM3 = (Number(invLocItem.data.msrmt)/Number(invLocItem.data.pkgQty)).toFixed(3),
											newMt = (Number(eachMt) * Number(qtyLoad)).toFixed(3),
											newM3 = (Number(eachM3) * Number(qtyLoad)).toFixed(3);
										var handlingItem = Ext.create('MOST.model.configuration.WhConfiguration', {
												locTpCd: invLocItem.data.locTpCd,
												whId: invLocItem.data.whId,
												locId : invLocItem.data.locId,
												vslCallId : invLocItem.data.vslCallId,
												cgNo : invLocItem.data.cgNo,
												wgt: newMt,
												msrmt: newM3,
												pkgQty: qtyLoad,
												whTpCd : invLocItem.data.whTpCd,
												whTpCdNm : invLocItem.data.whwhTpCdNmId,
												spCaCoCd :''
											});
											whItems.push(handlingItem.data);
									}
									qtyLoad = Number(qtyLoad) - Number(invLocItem.data.pkgQty);
								}
								me.whType = invLocItem.data.locTpCd;
							}
	
							me.prevWhItems = whItems;
	
							var res = records[0].data.locId.split('-'),
								locId = records[0].data.whLocId;
							locId += '(' + res[1] + ',' + 1 + ')';
	
							refs.refWHCheckExportDeAllocation.setValue(locId);
						}
						else {
							me.prevWhItems = null;
							refs.refWHCheckExportDeAllocation.setValue();
							return;
						}
					}
					else if(records.length > 1 && loadQty == balQty){

						var whItems = new Array();
						for(var i = 0; i < records.length; i++){
							var invLocItem = records[i];
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

						var res = records[0].data.locId.split('-');
						
						var locId = records[0].data.whLocId;
						locId += '(' + res[1] + ',' + records.length + ')';

						refs.refWHCheckExportDeAllocation.setValue(locId);
					} 
					else {
						var whItems = new Array();
						for(var i = 0; i < records.length; i++){
							var invLocItem = records[i];
							var handlingItem = Ext.create('MOST.model.configuration.WhConfiguration', {
								locTpCd: invLocItem.data.locTpCd,
								whId: invLocItem.data.whId,
								locId : invLocItem.data.locId,
								vslCallId : invLocItem.data.vslCallId,
								cgNo : invLocItem.data.cgNo,
								wgt: refs.refLoadMt.getValue(),
								msrmt: refs.refLoadM3.getValue(),
								pkgQty: refs.refLoadQty.getValue(),
								whTpCd : invLocItem.data.whTpCd,
								whTpCdNm : invLocItem.data.whwhTpCdNmId,
								spCaCoCd :''
							});
							whItems.push(handlingItem.data);
							me.whType = invLocItem.data.locTpCd;
						}
						me.prevWhItems = whItems;

						var res = records[0].data.locId.split('-');
						
						var locId = records[0].data.whLocId;
						locId += '(' + res[1] + ',' + records.length + ')';

						refs.refWHCheckExportDeAllocation.setValue(locId);
					}
				}
			}
		});
	},

	checkOverBalance: function(ref, newValue){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');

		var whBalQty = detailItem.get('whBalQty');
		var whBalMt = detailItem.get('whBalMt');
		var whBalM3 = detailItem.get('whBalM3');

		var loadQty = detailItem.get('loadQty');
		var loadMt = detailItem.get('loadMt');
		var loadM3 = detailItem.get('loadM3');

		if(!newValue){
			newValue = 0;
		}

		if(ref.reference === 'refLoadQty' 
			&& newValue > whBalQty
			&& detailItem.get('cgTpCd') == CodeConstants.MT_CGTP_BBK){
			return false;
		}
//		else if (ref.reference === 'refLoadMt' && newValue > whBalMt){
//			return false;
//		}else if (ref.reference === 'refLoadM3' && newValue > whBalM3){
//			return false;
//		}
		return true;
	},

	setDefaultLoadAmount: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');

		var whBalQty = detailItem.get('whBalQty');
		var whBalMt = detailItem.get('whBalMt');
		var whBalM3 = detailItem.get('whBalM3');

		detailItem.set('loadQty', whBalQty);
		detailItem.set('loadMt', whBalMt);
		detailItem.set('loadM3', whBalM3);
	},

	onSave:function(){
		var me = this;
		var refs = me.getReferences();

		var detailItem = me.getViewModel().get('theDetail');
		var lorrysPopupStore = me.getStore('confirmLoadingAssignmentLorrysPopup');
		var infoForm = me.getView().form;

		var validForm = refs.refFrmWHCheckExport.validate();

		if(!validForm){
			MessageUtil.mandatoryFieldInValid();
			return;
		}
		
		//Check Amount:
		if(!me.onValidateAmtDeAlloc()){
			return;
		}
		
		if(detailItem.get('locId') == '' || detailItem.get('locId') == null
			//|| me.prevWhItems == null
			){
			MessageUtil.warning('warning_msg', "warehousecheckexport_deAlloc_msg");
			return;
		}else{
			//Bonded WH validation
			if(!StringUtil.isNullorEmpty(me.whType) && me.whType == CodeConstants.MT_WHTP_BW){
				if(Token.getCustomHoldChk() === 'Y') {
					me.onBondedWhValidation();
				} else {
					me.onWhBalanceCheck();
				}
			}
			else {
				me.onWhBalanceCheck();
			}
		}
	},

	//////////////////////////
	//Search Package Type:
	onSearchPkgTpHHT:function(refBtn){;
		var me = this;
		var targetref = '';
		var title = 'Package Type';
		var params = '';
		targetref = 'refPkgTypeCode';
		params = {
			title: title,
			searchType: 'COMM',
			searchDivCd: 'PKGTP',
			searchLcd : 'MT',
			searchCol1 : '',
		};	
		if(params && targetref){
			ViewUtil.openCodePopup(this, 'app-commoncodepopuphht', targetref, params);
		}
	},

	//Unset Location HHT:
	onUnSetLocCofrmLoadingHHT: function(refBtn){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var refValue = refBtn.reference;
		var targetref = '';
		var params = '';

		if(refValue === 'refWHCheckExportDeAllocation'){ // Normal Unset Loc
			if(detailItem.get('loadMt') == 0 && detailItem.get('loadM3') == 0 && detailItem.get('loadQty') == 0){
				MessageUtil.warning('warning_msg', 'Input Loading Amount');//testing
				return;
			}
			targetref = 'refWHCheckExportDeAllocation';
			params = {
				title: 'W/C - DeAllocation',
				vslCallId: detailItem.get('vslCallId'),
				whTpCd:'G',
				isGeneralCg: true,
				shipgNoteNo: detailItem.get('shipgNoteNo'),
				hdlInDt: detailItem.get('endDt'),
				cgNo: detailItem.get('grNo'),
				cgTpCd: detailItem.get('cgTpCd'),
				totMt: detailItem.get('loadMt'),
				totM3: detailItem.get('loadM3'),
				totQty: detailItem.get('loadQty'),
				catgCd : detailItem.get('catgCd'),
				eachMt : detailItem.get('eachMt'),
				eachM3 : detailItem.get('eachM3'),
			};	
		}

		ViewUtil.openHhtPopup(this, 'app-wcunsetpopuphht', targetref, params); //WHCheckerUnSetPopupHHT
	},
	
	onCancel: function(btn){
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
	
	onWHTabDamage: function(){
		var me = this;
		var refs = me.getReferences();
//		var recvData = me.prevHHTData.recvData;
		var recvData = me.getView().recvData;
		ViewUtil.openCodePopup(this, 'app-damageofcargo', 'refsWHBtnDamage', recvData);

	},

	onWHTabDimension: function(){
		var me = this;
		var refs = me.getReferences();
//		var recvData = me.prevHHTData.recvData;
		var recvData = me.getView().recvData;
		ViewUtil.openCodePopup(this, 'app-dimensionofcargohht', 'refsWHBtnDimension', recvData);
	},
	
	//Truck popup
	onOpenTruckPopup: function(){
		var me = this;
		var refs = me.getReferences();
		var targetCtl = 'refLorryNo',
			popupAlias = '', 
			title = '';

		var detailItem = me.getViewModel().get('theDetail');

		title = 'Yard Truck List';
		popupAlias = 'app-assignedinternaltrucklistpopuphht';
		
		var params = {
				title: title,
				vslCallId: detailItem.get('vslCallId'),
				blNo: '',
				shipgNoteNo: detailItem.get('shipgNoteNo'),
				weightCheckYn: detailItem.get('weightCheckYn'),
			};
	
		if(popupAlias){
			ViewUtil.openCodePopup(me, popupAlias, targetCtl , params);
		}
	},
	
	//Package No popup
	onOpenPackageNoPopup: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var recvData = me.prevData;
		var targetCtl = 'refPkgNo';
		var title = 'Package No. List';
		
		var params = {
				title: title,
				vslCallId: detailItem.get('vslCallId'),
				blNo: '',
				shipgNoteNo: detailItem.get('shipgNoteNo'),
				ixCd: 'X',
				jobPurpCd: 'WA'
			};
		ViewUtil.openCodePopup(this, 'app-packagenomultipopuphht', targetCtl, params);
	},

	/**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */

	
	/**
	 * GENERAL METHOD START
	 * =========================================================================================================================
	 */
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');

		var control = me.lookupReference(targetControl);
		
		if(!returnValue){
			control.setValue('');
			return;
		}

		//PkgTp:
		if(targetControl === 'refBtnPkgTpSearch'){
			detailItem.set('repkgTypeCd', returnValue.code);			
		}

		//UnsetLoc WH:
		else if(targetControl === 'refWHCheckExportDeAllocation'){
			detailItem.set('locId', returnValue.locId);
			var whItems = new Array();
			for(var i = 0; i < returnValue.arrWHLocation.items.length; i++){
				var invLocItem = returnValue.arrWHLocation.items[i];
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
		
		else  if(targetControl === 'refPkgNo'){
			if(returnValue) {
				var packageItems = new Array();
				
				for(var i = 0; i < returnValue.item.length; i++){
					var returnItem = returnValue.item[i];
					var pkgItem = Ext.create('MOST.model.operation.PackageJobItem', {
						vslCallId: returnItem.get('vslCallId'),
						mfDocId : returnItem.get('mfDocId'),
						refNo: returnItem.get('refNo'),
						pkgNo: returnItem.get('packageNo')
					});
					packageItems.push(pkgItem.data);
				}
				me.packageItems = packageItems;
				me.onBindingAmoutnByPackageItems(returnValue);
			}
			else {
				me.packageItems = new Array();
				refs.refPkgNo.setValue();
			}
		}
		
		else   if(targetControl === 'refLorryNo'){
			if(returnValue) {
				detailItem.set('wbTransactionNo',returnValue.item.get('wbTransactionNo'));
			}
			else {
				detailItem.set('wbTransactionNo', '');
			}
		}
	},	
	
	onBindingAmoutnByPackageItems: function(returnValue){
		var me = this;
		var refs = me.getReferences();
		var mt = 0, m3 = 0, qty = 0;
		
		if(returnValue.item.length > 0){
			for (var i=0; i<returnValue.item.length; i++){
				mt += Number(returnValue.item[i].get('mt'));
				m3 += Number(returnValue.item[i].get('m3'));
				qty++;
			}
		}
		
		refs.refLoadQty.setValue(qty);
		refs.refLoadMt.setValue(mt);
		refs.refLoadM3.setValue(m3);
	},
	
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var recvData = me.getView().recvData;
    	
    	var params = {
			vslCallId : recvData.get('vslCallId'),
			grNo : recvData.get('grNo'),
			cgNo : recvData.get('cgNo'),
			stat : recvData.get('stat'),
			cgTpCd : recvData.get('cgTpCd'),
			shftDt : recvData.get('shftDt'),
			shftId : recvData.get('shftId'),
			shipgNoteNo : recvData.get('shipgNoteNo'),
			delvTpCd : recvData.get('delvTpCd')
		};
    	
    	return params;
	},


	setDetailInitialize: function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.prevData;
		var modeOfOprCombo = me.getStore('confirmLoadingForModeOfOprCombo');
		var deliveryCombo = me.getStore('confirmLoadingForDeliveryCombo');
		var cargoTypeCombo = me.getStore('confirmLoadingForCargoTypeCombo');

		if(!masterItem){
			return;
		}
			
		masterItem.set('pkgNo',recvData.get('pkgNo'))	
		masterItem.set('repkgTypeCd',recvData.get('pkgTpNm'))	
		me.getViewModel().setData({theDetail:masterItem});

		var detailItem = me.getViewModel().get('theDetail');
		
		var currentTime = Ext.Date.format(new Date(), 'd/m/Y H:i');
		refs.refConfirmLoadingStartDt.setValue(currentTime);
		
		detailItem.set('startDt' ,currentTime);
     	detailItem.set('endDt' , '');
		
		detailItem.set('shftNm', recvData.get('shftNm'));
		detailItem.set('shftId', recvData.get('shftId'));
		detailItem.set('shftDt', recvData.get('shftDt'));
		
		

		var cgTpCd = detailItem.get('cgTpCd');
		var isDBK = (cgTpCd === CodeConstants.MT_CGTP_DBN || cgTpCd === 'DBE' || cgTpCd === 'DBK');
		
		refs.refLoadMt.setEditable(isDBK);
		refs.refLoadM3.setEditable(isDBK);

		refs.refLoadMt.setClearable(isDBK);
		refs.refLoadM3.setClearable(isDBK);
	},
	
	operationSeting: function(){

	},
	
	onCheckAutoDeAllocate: function(){		
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		var store = me.getStore('checkAmoutLocation');
		
		var whBalQty = detailItem.get('whBalQty');
		var whBalMt = detailItem.get('whBalMt');
		var whBalM3 = detailItem.get('whBalM3');
		
		var actMT = detailItem.get('loadMt');
		var actM3 = detailItem.get('loadM3');
		var actQty = detailItem.get('loadQty');
		
		var params = {
				vslCallId : detailItem.get('vslCallId'),
				grNo : detailItem.get('grNo'),
				shipgNoteNo : detailItem.get('shipgNoteNo'),
				loadMt : actMT,
				loadM3 : actM3,
				loadQty : actQty
			};
		
		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success){
					if(record != null && record.length > 0
							&& record[0].get('locCount') > 0){
						
						detailItem.set('autoLocFlag', 'true');
						detailItem.set('autoNorLocFlag', 'true')
						
						me.prevSaveCheck();
					}else{
						MessageUtil.warning('warning_msg', "warehousecheckexport_deny_autoDeAlloc_msg");
						return;
					}
				}
			}
		});
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
							return;
						}
						else {
							me.onWhBalanceCheck();
						}
					}
					else {
						me.onWhBalanceCheck();
					}
				}
			}
		});
	},
	
	onWhBalanceCheck: function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		//OPR-013 Warehouse balance checking (keep 60 MT into WH due to payment reason)
		if(detailItem.get('whBalMt') - detailItem.get('loadMt') < CommonConstants.WH_BALANCE_MT) {
			MessageUtil.question('warning_msg', 'warehousecheckexport_whBalance_msg', CommonConstants.WH_BALANCE_MT,
					function(button){
						if (button === 'ok') {
							me.prevSaveCheck();
						}
					}
				);
		} else {
			me.prevSaveCheck();
		}
	},

	prevSaveCheck: function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');

		//Check Status Operation:
		if(detailItem.get('fnlLoadYn') === 'Y'){
			MessageUtil.warning('warning_msg', 'warehousecheckexport_final_msg');
			return;
		}

		//Check Custom Status
		if(Token.getCustomHoldChk() === 'Y') {
			if(detailItem.get('custMode') !== me.CUST_RELEASE) {
				MessageUtil.question('confirm', 'confirmloading_norelease_msg',null,
					function(button){
						if (button === 'ok') {
							me.clearance();
						}else{
							return;
						}
				});
			}
		}
		else {
			me.clearance();
		}
	},

	clearance: function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');		

		//Check Amount:
		if(!me.onValidateAmtDeAlloc){
			return;
		}
		
		//Process:
		me.saveProcess();
	},

	idrLocValidation: function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		var whBalQty = detailItem.get('whBalQty');
		var whBalMt = detailItem.get('whBalMt');
		var whBalM3 = detailItem.get('whBalM3');
		
		var actMT = detailItem.get('loadMt');
		var actM3 = detailItem.get('loadM3');
		var actQty = detailItem.get('loadQty');

		
		//BBK: just input Qty => ato calculate MT M3 by eachWgt eachM3:
		if(detailItem.get('cgTpCd') && detailItem.get('cgTpCd') === CodeConstants.MT_CGTP_BBK){
			if(actMT <= 0){
				MessageUtil.warning('warning_msg', 'confirmhandlingin_amount_qty_zero');
				return false;
			}
			if(actQty > whBalQty){
				MessageUtil.warning('warning_msg', 'confirmhandlingin_amount_qty');
				return false;
			}
		}
		
		//DBN: DryBulk
		if(detailItem.get('cgTpCd') && detailItem.get('cgTpCd') === CodeConstants.MT_CGTP_DBN){
			if(actMT > whBalMt || actQty > whBalQty || actM3 > whBalM3){
				MessageUtil.warning('warning_msg', 'confirmhandlingin_amount_mt');
				return false;
			}
		}	

	},

	saveProcess : function() {
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		var detailItem = me.getViewModel().get('theDetail');
		detailItem.set('whConfigurationItems', me.prevWhItems);
		detailItem.set('packageItems', me.packageItems);
		detailItem.set('userId', MOST.config.Token.getUserId());

		var currentTime = new Date();
		var startDtStr =  refs.refConfirmLoadingStartDt.getValue();
		var endDtStr = currentTime;
		detailItem.set('endDt', endDtStr);
					
		var proxy = detailItem.getProxy();
		proxy.url = me.WAREHOUSE_CHECK_EXPORT_PROXY_URL;
		detailItem.save({
			callback: function(records, operation, success) {
				if (success) {
					detailItem.commit();
					me.saveDamage();
					me.saveDimension();
					MessageUtil.saveSuccess(); // Success Message
					
					var parentView = me.getParentView();
					if(parentView.getController().onTblRetrieve){
						parentView.getController().onTblRetrieve();
					}
					window.close(); 
				}
			}
		});
		
	},

	saveDamage : function(){
		var me = this;
		var refs = me.getReferences();
		var damageStore = me.getStore(me.DAMAGE_STORE);
		if(damageStore.data.length > 0){
			var insertItem = damageStore.data.items[0];
			var isCreated = true;
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			
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
	
	saveDimension : function(){
		var me = this;
		var refs = me.getReferences();
		var dimensionStore = me.getStore(me.DIMENSION_STORE);
		if(dimensionStore.data.length > 0){
			var item = dimensionStore.data.items[0];
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
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});