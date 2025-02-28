Ext.define('MOST.view.document.GoodsReceiptController', {
	extend: 'MOST.view.foundation.BaseViewController',

	alias: 'controller.goodsreceipt',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refGoodsReceiptGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'goodsReceipt',			// Main Store Name
	PACKAGE_DETAIL_GRID_REF_NAME: 'refGRPkgDetailGrid',
	PACKAGE_DETAIL_STORE: 'grPkgDetail',
	SN_COMBO_STORE: 'snCombo',
	GR_COMBO_STORE: 'grCombo',
	GENERATE_PDF_GR_STORE: 'generatePDFGoodsReceipt',
	GR_INFO_CREATING_STORE: 'grInfoForCreating',
	GR_OF_RORO_STORE: 'goodsReceiptOfRORO',
	GR_DETAIL_STORE: 'goodsReceiptDetail',
	LORRY_MODE_STORE: 'trasLRModeCombo',

	QUANTITY_COMBO_STORE: 'quantityCombo',
	DELIVERY_MODE_STORE: 'dmodeCombo',
	
	authority: '',
	
	GR_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/goodsreceipt/list',
	balanceWgt: 0.0,
	balanceMsrmt: 0.0,
	balanceQty: 0.0,
	tempQty : 0,
 	tempM3 : 0.0,
 	tempMt : 0.0,	
 	sumSnQty : 0,
 	sumSnM3 : 0.0,
 	sumSnMt : 0.0,
 	roroQty : 0,
 	
 	GR_PDF_FILE: 'RCS017.jrxml',
	GR_PDF_FUNCTION: 'MOST.documentReport.previewGoodsReceipt',
	RORO_GRID_REF_NAME: 'refROROGrid',
	RORO_STORE_NAME: 'unitList',
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
		
		if(MOST.config.Token.getUserType() === CONSTANTS.USER_TYPE_EXTERNAL){
			if(me.existsPatnerType(CodeConstants.CM_PTNRTP_SHA)){
				me.authority = 'SHA';
			} 
			if (me.existsPatnerType(CodeConstants.CM_PTNRTP_CNS)){
				me.authority = 'CNS';
			} 
			if(me.existsPatnerType(CodeConstants.CM_PTNRTP_FWD)){
				me.authority = 'FWD';
			} 
			if(me.existsPatnerType(CodeConstants.CM_PTNRTP_SHA) && me.existsPatnerType(CodeConstants.CM_PTNRTP_FWD)){
				me.authority = 'BH';
			}
		}
		
		var store = me.getStore(me.MAIN_STORE_NAME);
		store.loadData([],false);
		
		var shippingNoteData = me.getViewModel().get('shippingNoteData');
		var searchParm = Ext.create('MOST.model.document.SearchGoodsReceiptParm');
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.DIRECT_INDIRECT_COMBOBOX, me.DELIVERY_MODE_STORE);
		me.setComboBoxWithLocalCache(CacheServiceConstants.QUANTITY_COMBOBOX, me.QUANTITY_COMBO_STORE);
		
		me.setSearchParm(searchParm)
		me.getViewModel().setData({theSearch:searchParm});
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		var recvData = me.getView().recvData;
		
		if(recvData != null){
			refs.ctlJpvc.suspendEvents();
			refs.ctlSNN.suspendEvents();
			
	     	refs.ctlJpvc.setValue(recvData.vslCallId);
	     	refs.ctlSNN.setValue(recvData.shipgNoteNo);
			refs.ctlJpvc.lookupReference('ctlField').onFocusLeave();
	     	me.onSearch();
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
	// Search Event Handler
	onSearch:function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore(me.MAIN_STORE_NAME);
    	store.loadData([],false);
    	var snComboStore = me.getStore(me.SN_COMBO_STORE);
    	var params = me.getSearchCondition();
    	var recvData = me.getView().recvData;
    	var ctlJpvc = refs.ctlJpvc;
    	var ctlScn = refs.ctlScn.getValue();
    	
    	if((ctlJpvc.getValue() == null || ctlJpvc.getValue() == '') && (ctlScn == null || ctlScn == '')){
    		MessageUtil.warning("goodsReceipt", "goodsreceipt_jpvc_input_msg");
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						var theMainModel = Ext.create('MOST.model.document.GoodsReceipt');
						theMainModel.data = records[0].data;
					}else{
						MessageUtil.warning("goodsReceipt", "goodsreceipt_nodata");
						return;
					}
				}
				
				refs.ctlJpvc.resumeEvents();
				refs.ctlSNN.resumeEvents();
			}
		});
	},
	
	calBalance:function(snNo){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var existedSnNo = new Array();
		var data = store.getData().items;
		var tempShipgNoteNo;
		
		tempQty = 0;
     	tempM3 = 0.0;
     	tempMt = 0.0;	
     	sumSnQty = 0;
     	sumSnM3 = 0.0;
     	sumSnMt = 0.0;
     	
		for(var i = 0; i<data.length; i++){
			var found = false;

			tempShipgNoteNo = data[i].data.shipgNoteNo;
			
			for(var j = 0; j < existedSnNo.length && ! found; j++){
     			found = tempShipgNoteNo == existedSnNo[j];
     		}
			if( !found && data[i].data.spCargoChk != "Y" ){
     			existedSnNo.push(tempShipgNoteNo);
     			
         		sumSnQty += parseFloat(data[i].data.sumQty);
     			sumSnM3 += parseFloat(data[i].data.sumM3);
     			sumSnMt += parseFloat(data[i].data.sumMt);
     		}
			
			if( snNo == null && data[i].data.spCargoChk != "Y" ){
     			tempQty += parseFloat(data[i].data.grQty);
     			tempM3 += parseFloat(data[i].data.grMsrmt);
     			tempMt += parseFloat(data[i].data.grWgt);
     		}else if(snNo == tempShipgNoteNo && data[i].data.spCargoChk != "Y" ) {
     			tempQty += parseFloat(data[i].data.grQty);
     			tempM3 += parseFloat(data[i].data.grMsrmt);
     			tempMt += parseFloat(data[i].data.grWgt);
     		}
		}
	},
	
	onClick:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		me.calBalance(selection.data.shipgNoteNo);
		
		if(refs.ctlQuantity.getValue() == 'MT'){
			var numWgt = selection.data.cgWgt - tempMt;
			refs.ctlBalanceToReceive.setValue(Ext.util.Format.number(numWgt, '0,000.000'));
			refs.ctlCumulativeTotalReceived.setValue(Ext.util.Format.number(tempMt, '0,000.000'));
		}else if(refs.ctlQuantity.getValue() == 'QTY'){
			var numQty = selection.data.pkgQty - tempQty;
			refs.ctlBalanceToReceive.setValue(Ext.util.Format.number(numQty, '0,000'));
			refs.ctlCumulativeTotalReceived.setValue(Ext.util.Format.number(tempQty, '0,000'));
		}else if(refs.ctlQuantity.getValue() == 'M3'){
			var numM3 = selection.data.measurement - tempM3;
			refs.ctlBalanceToReceive.setValue(Ext.util.Format.number(numM3, '0,000.000'));
			refs.ctlCumulativeTotalReceived.setValue(Ext.util.Format.number(tempM3, '0,000.000'));
		}
	},
	
	selectQuantity:function(){
		var me = this;
		var refs = me.getReferences();
		var tempShipgNoteNo;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection != null){
			me.onClick();
		}else{
			me.calBalance();
			if(refs.ctlQuantity.getValue() == 'MT'){
				var numWgt = sumSnMt - tempMt;
				refs.ctlBalanceToReceive.setValue(Ext.util.Format.number(numWgt, '0,000.000'));
				refs.ctlCumulativeTotalReceived.setValue(Ext.util.Format.number(tempMt, '0,000.000'));
				
			}else if(refs.ctlQuantity.getValue() == 'QTY'){
				var numQty = sumSnQty - tempQty;
				refs.ctlBalanceToReceive.setValue(Ext.util.Format.number(numQty, '0,000'));
				refs.ctlCumulativeTotalReceived.setValue(Ext.util.Format.number(tempQty, '0,000'));
				
			}else if(refs.ctlQuantity.getValue() == 'M3'){
				var numM3 = sumSnM3 - tempM3;
				refs.ctlBalanceToReceive.setValue(Ext.util.Format.number(numM3, '0,000.000'));
				refs.ctlCumulativeTotalReceived.setValue(Ext.util.Format.number(tempM3, '0,000.000'));
			}
		}
	},
	
	onSave:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theMain');
		var pkgNoStore = me.getStore(me.PACKAGE_DETAIL_STORE);
		var pkgNoGrid = me.lookupReference(me.PACKAGE_DETAIL_GRID_REF_NAME);
		var pkgSelection = pkgNoGrid.getSelection();
		
		if(detailItem.get('projectCargo') == 'Y'){			
			if(pkgSelection.length == 0){
				MessageUtil.warning("goodsReceipt", "goodsreceipt_selectPkgNo_msg");
				return;
			}
			
			for(var i = 0; i < pkgSelection.length; i++){				
				if(detailItem.get('gdsRecvNo') == null || detailItem.get('gdsRecvNo') == ''){
					if(pkgSelection[i].get('gdsRecvNo') != null && pkgSelection[i].get('gdsRecvNo') != ''){
						MessageUtil.warning("goodsReceipt", "goodsreceipt_pkgNoOrtherGR_msg");
						return;
					}
				}else{
					if(pkgSelection[i].get('gdsRecvNo') != null && pkgSelection[i].get('gdsRecvNo') != '' && pkgSelection[i].get('gdsRecvNo') != detailItem.get('gdsRecvNo')){
						MessageUtil.warning("goodsReceipt", "goodsreceipt_pkgNoOrtherGR_msg");
						return;
					}
				}
			}
		}
		
		detailItem.set('userId', MOST.config.Token.getUserId());
		
		if(detailView){
			var infoForm = detailView.down('form').getForm();
			
			if(infoForm.isValid()){
				if((refs.refCboModeOfTransport.getValue() == '' || refs.refCboModeOfTransport.getValue() == null) && detailItem.data.tsptTpCd !== 'SE'){
					MessageUtil.warning("goodsReceipt", "goodsreceipt_modeOfTrans_blank");
					return;
				}
				
				if(refs.refAdditionalChk.getValue()==false){					
					if(refs.refProjectCargo.checked && Number(detailItem.get('grQty')) != Number(refs.ctlPackageDetailQty.getValue())){
						MessageUtil.warning("goodsReceipt", "duplicate_package_no");
						return;
					}
				}
				
				me.saveProcess();
			} else {
				MessageUtil.mandatoryFieldInValid();
			}
		}
	},
	
	saveProcess:function(){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var detailItem = me.getViewModel().get('theMain');
		var detailView = me.getDetailBizView();
		var infoForm = detailView.down('form').getForm();
		var recvData = detailView.items.get(0).recvData;
		var unitListStore = me.getStore('unitList');
		var isCreated = detailItem.phantom;
		
		var sumMt = 0; 
		var sumM3 = 0; 
		var sumQty = 0;
		
		if(detailItem.get('cgTpCd') != 'DBN'){
			if(detailItem.get('cgTpCd') == 'LQD'){
				//Liquid
				if(Number(infoForm.findField('sumM3').getValue()) < 0){
					MessageUtil.warning("goodsReceipt", "goodsreceipt_exceed");
					return;
				}
				
				//Validate MT, M3, Qty in case Direct of Pipline with Lorry amount
				if(detailItem.get('delvTpCd') == 'D' && (detailItem.get('grTsptTpCd') == 'LR' || detailItem.get('grTsptTpCd') == 'PL')){
					//Check sum MT, M3, QTY existed in GR store
					if(store.data.length > 0){
						store.each(function (rec) { if(detailItem.get('gdsRecvNo') != rec.get('gdsRecvNo') && 
								detailItem.get('grTsptTpCd') == rec.get('grTsptTpCd')){   	
							sumMt += Number(rec.get('grWgt')); 
							sumM3 += Number(rec.get('grMsrmt')); 
							sumQty += Number(rec.get('grQty'));
						}
						});
						
						sumMt += Number(detailItem.get('grWgt')); 
						sumM3 += Number(detailItem.get('grMsrmt')); 
						sumQty += Number(detailItem.get('grQty'));
						
						if((sumMt > Number(detailItem.get('dLrMt')) || sumM3 > Number(detailItem.get('dLrM3'))) 
								&& (detailItem.get('additionalChk') == 'N' || detailItem.get('additionalChk') == '')){
							MessageUtil.warning("goodsReceipt", "goodsreceipt_direct_lorry_exceed");
							return;
						}
					}else{
						if((Number(detailItem.get('grWgt')) > Number(detailItem.get('dLrMt')) || 
								Number(detailItem.get('grMsrmt')) > Number(detailItem.get('dLrM3'))) 
								&& (detailItem.get('additionalChk') == 'N' || detailItem.get('additionalChk') == '')){
							MessageUtil.warning("goodsReceipt", "goodsreceipt_direct_lorry_exceed");
							return;
						}
					}
				}
			}else{
				if((Number(infoForm.findField('sumMt').getValue()) < 0 
					|| Number(infoForm.findField('sumM3').getValue()) < 0 
					|| Number(infoForm.findField('sumQty').getValue()) < 0)
					&& (detailItem.get('additionalChk') == 'N' || detailItem.get('additionalChk') == '')){
					MessageUtil.warning("goodsReceipt", "goodsreceipt_exceed");
					return;
				}
			}
		}else{
			//Validate MT, M3, Qty in case Direct Lorry
			if(detailItem.get('delvTpCd') == 'D' && detailItem.get('grTsptTpCd') == 'LR'){
				//Check sum MT, M3, QTY existed in GR store
				if(store.data.length > 0){
					store.each(function (rec) { if(detailItem.get('gdsRecvNo') != rec.get('gdsRecvNo') && 
							detailItem.get('grTsptTpCd') == rec.get('grTsptTpCd')){   	
						sumMt += Number(rec.get('grWgt')); 
						sumM3 += Number(rec.get('grMsrmt')); 
						sumQty += Number(rec.get('grQty'));
					}
					});
					
					sumMt += Number(detailItem.get('grWgt')); 
					sumM3 += Number(detailItem.get('grMsrmt')); 
					sumQty += Number(detailItem.get('grQty'));
					
					if((sumMt > Number(detailItem.get('dLrMt')) || sumM3 > Number(detailItem.get('dLrM3'))) 
							&& (detailItem.get('additionalChk') == 'N' || detailItem.get('additionalChk') == '')){
						MessageUtil.warning("goodsReceipt", "goodsreceipt_direct_lorry_exceed");
						return;
					}
				}else{
					if((Number(detailItem.get('grWgt')) > Number(detailItem.get('dLrMt')) || 
							Number(detailItem.get('grMsrmt')) > Number(detailItem.get('dLrM3'))) 
							&& (detailItem.get('additionalChk') == 'N' || detailItem.get('additionalChk') == '')){
						MessageUtil.warning("goodsReceipt", "goodsreceipt_direct_lorry_exceed");
						return;
					}
				}
			}
			
			
			//Validate MT, M3, Qty in case Direct Vessel
			if(detailItem.get('delvTpCd') == 'D' && detailItem.get('grTsptTpCd') == 'SE'){
				//Check sum MT, M3, QTY existed in GR store
				if(store.data.length > 0){
					store.each(function (rec) { if(detailItem.get('gdsRecvNo') != rec.get('gdsRecvNo') &&
							detailItem.get('grTsptTpCd') == rec.get('grTsptTpCd')){   	
						sumMt += Number(rec.get('grWgt')); 
						sumM3 += Number(rec.get('grMsrmt')); 
						sumQty += Number(rec.get('grQty'));
					}
					});
					
					sumMt += Number(detailItem.get('grWgt')); 
					sumM3 += Number(detailItem.get('grMsrmt')); 
					sumQty += Number(detailItem.get('grQty'));
					
					if((sumMt > Number(detailItem.get('dVslMt')) || sumM3 > Number(detailItem.get('dVslM3'))) 
							&& (detailItem.get('additionalChk') == 'N' || detailItem.get('additionalChk') == '')){
						MessageUtil.warning("goodsReceipt", "goodsreceipt_direct_vessel_exceed");
						return;
					}
				}else{
					if((Number(detailItem.get('grWgt')) > Number(detailItem.get('dVslMt')) || 
							Number(detailItem.get('grMsrmt')) > Number(detailItem.get('dVslM3'))) 
							&& (detailItem.get('additionalChk') == 'N' || detailItem.get('additionalChk') == '')){
						MessageUtil.warning("goodsReceipt", "goodsreceipt_direct_vessel_exceed");
						return;
					}
				}
			}
			
			//Validate MT, M3, Qty in case Indirect (not RTS)
			if(detailItem.get('delvTpCd') == 'I' && refs.ctlReturnToShipper.checked == false){
				//Check sum MT, M3, QTY existed in GR store
				if(store.data.length > 0){
					store.each(function (rec) { if(detailItem.get('gdsRecvNo') != rec.get('gdsRecvNo')){   	
						sumMt += Number(rec.get('grWgt')); 
						sumM3 += Number(rec.get('grMsrmt')); 
						sumQty += Number(rec.get('grQty'));
					}
					});
					
					sumMt += Number(detailItem.get('grWgt')); 
					sumM3 += Number(detailItem.get('grMsrmt')); 
					sumQty += Number(detailItem.get('grQty'));
					
					if((sumMt > Number(detailItem.get('imt')) || sumM3 > Number(detailItem.get('im3'))) 
							&& (detailItem.get('additionalChk') == 'N' || detailItem.get('additionalChk') == '')){
						MessageUtil.warning("goodsReceipt", "goodsreceipt_indirect_exceed");
						return;
					}
				}else{
					if((Number(detailItem.get('grWgt')) > Number(detailItem.get('imt')) || 
							Number(detailItem.get('grMsrmt')) > Number(detailItem.get('im3'))) 
							&& (detailItem.get('additionalChk') == 'N' || detailItem.get('additionalChk') == '')){
						MessageUtil.warning("goodsReceipt", "goodsreceipt_indirect_exceed");
						return;
					}
				}
			}
			
			//Validate MT, M3, Qty in case Indirect RTS
			if(detailItem.get('delvTpCd') == 'I' && refs.ctlReturnToShipper.checked == true){
				if((Number(detailItem.get('rhdlMt')) - Number(detailItem.get('sumRhdlMt'))) < Number(detailItem.get('grWgt'))
						&& (detailItem.get('additionalChk') == 'N' || detailItem.get('additionalChk') == '')){
					MessageUtil.warning("goodsReceipt", "goodsreceipt_indirect_exceed");
					return;
				}
			}
		}
		
		if(infoForm.findField('RTS').getValue()){
			detailItem.data.rhdlMode = 'R'
		}
		else {
			detailItem.data.rhdlMode = ''
		}
		var roroItems = new Array();
		if(detailItem.get('cgTpCd') == 'RCV'){
			unitListStore.each(function(record){
				if(record.get('chkCdNm') == 1){
					roroItems.push(record.data);
				}
			});
			detailItem.set('unitItems',roroItems);
			
			if(me.roroQty == 0){
				MessageUtil.warning('warning_msg', 'Please select Units Number');
				return;
			}
		}
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		//Format the location ID
		var rtsLocId = refs.ctlTxtLocationRTS.getValue();
		if(refs.ctlTxtLocationRTS.getValue().includes("-")) {
			var rtsLocIdArr = refs.ctlTxtLocationRTS.getValue().split('-');
			var whId = rtsLocIdArr[0];
			var locId = rtsLocIdArr[1]
			rtsLocId = `${whId}(${locId},1)`;
		} 
		detailItem.set('domesticChk', refs.refDomesticChk.checked ? 'Y' : 'N');
		detailItem.set('additionalChk', refs.refAdditionalChk.checked ? 'Y' : 'N');
		detailItem.set('wgtChk', refs.refWeightChk.checked ? 'N' : 'Y');
		detailItem.set('validDate',Ext.Date.format(refs.ctlGrValidDate.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));

		detailItem.set('estArrvDt', Ext.Date.format(refs.ctlETAFromDt.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		
		detailItem.set('rtsLocId', rtsLocId);
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('userId', MOST.config.Token.getUserId());
		updateParm.set('item', detailItem.data)
		
		updateParm.save({
			success: function(record) {
				detailItem.set('gdsRecvNo', record.get('gdsRecvNo'));
				detailItem.set('version', record.get('newVersion'));
				detailItem.commit();
				refs.ctlWarehouseCombo.setDisabled(true);
				
				var crStore = me.getStore('validationCheck');
				
				crStore.load({
					params : {
						tyCd: 'CUSTOMS_RELEASED_VALIDATION',
						col1: detailItem.get('vslCd'),
						col2: detailItem.get('mfDocId'),
						col3: 'E',
						col4: detailItem.get('scn')
					},
					callback: function(records, operation, success) {
						if (success) {
							if(records.length === 0 || (records[0].get('isValidated') !== 'Y')){
								MessageUtil.show(Ext.Msg.WARNING,'warning_msg' ,'customsCargoReleaseControl_release_msg','',
										function(button){
											if (button === 'ok') {
												me.onSearch();
												detailView.close();
											}
										}
									);
							}else{
								MessageUtil.show(Ext.Msg.INFO, 'success_msg','savesuccess_msg','',
									function(button){
										if (button === 'ok') {
											me.onSearch();
											detailView.close();
										}
									}
								);
							}
						}
					}
				});
			}
		});
		
//		if(detailView){
//			detailView.close();
//		}
	},
	
	onCopy:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() ;
		var sn = refs.ctlSNN.getValue();
		var partnerInfos = MOST.config.Token.getPatnerInfos();
		var isFWD = false;
		
		if((selection.length == 0) || (selection == null) ){
			MessageUtil.warning("goodsReceipt", "goodsreceipt_selectSn_msg");
		}else{
			var tempQty = 0;
	     	var tempM3 = 0.0;
	     	var tempMt = 0.0;	
			
	     	selection = grid.getSelection()[0];
	     	
	     	tempQty += parseFloat(selection.data.grQty);
			tempM3 += parseFloat(selection.data.grM3);
			tempMt += parseFloat(selection.data.grWgt);
	     	
			var copyQuantity = parseFloat(refs.refTxtCopyQuantity.getValue() == "" ? "1" : refs.refTxtCopyQuantity.getValue());
			var copyQty = tempQty * copyQuantity;
			var copyM3 = tempM3 * copyQuantity;
			var copyMt = tempMt * copyQuantity;
			var numQty = parseFloat(selection.data.pkgQty) - tempQty;
			var numWgt = parseFloat(selection.data.cgWgt) - tempMt;
			var numM3 = parseFloat(selection.data.measurement) - tempM3;
			var totalGrMt = parseFloat(selection.data.totGrMt);
			var totalGrQty = parseFloat(selection.data.totGrQty);
			var totalGrM3 = parseFloat(selection.data.totGrM3);
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			var grCopyArr = new Array();
			
			if((copyQty + totalGrQty) > parseFloat(selection.data.pkgQty)){
					/*&& selection.data.spCargoChk == 'N' && selection.data.adCargoChk == 'N'   Hidden so removed this logic.*/
				MessageUtil.warning("goodsReceipt", "goodsreceipt_copy_exceed_quanity");
				return; 
			}
			
			if((copyM3 + totalGrM3) > parseFloat(selection.data.measurement)){
				MessageUtil.warning("goodsReceipt", "goodsreceipt_copy_exceed_m3");
				return;
			}
			
			if((copyMt + totalGrMt) > parseFloat(selection.data.cgWgt)){
					/*&& selection.data.spCargoChk == 'N' && selection.data.adCargoChk == 'N'  Hidden so removed this logic.*/
				MessageUtil.warning("goodsReceipt", "goodsreceipt_copy_exceed_mt_copy");
				return; 
			}
			
			for(var i = 0; i < copyQuantity; i++){
				var model = new MOST.model.document.GoodsReceipt();
				
				model.data.vslCd = selection.data.vslCd;
				model.data.callYear = selection.data.callYear;
				model.data.callSeq = selection.data.callSeq;
				model.data.vslCallId = selection.data.vslCallId;
				model.data.shipgNoteNo = selection.data.shipgNoteNo;
				model.data.grTsptTpCd = selection.data.grTsptTpCd;
				model.data.spCargoChk = selection.data.spCargoChk;
				model.data.adCargoChk = selection.data.adCargoChk;
				model.data.grWgt = selection.data.grWgt;
				model.data.grMsrmt = selection.data.grMsrmt;
				model.data.grQty = selection.data.grQty;
				model.data.grRmk = selection.data.grRmk;
				model.data.pkgTpCd = selection.data.pkgTpCd;
				model.data.cmdtCd = selection.data.cmdtCd;
				model.data.userId = MOST.config.Token.getUserId();
				model.data.mfDocId = selection.data.mfDocId;
				
				grCopyArr.push(model.data);
			}
			
			updateParm.getProxy().url = store.getProxy().url;
			updateParm.phantom = true;
			updateParm.set('workingStatus', WorkingStatus.INSERT);
			updateParm.set('userId', MOST.config.Token.getUserId());
			updateParm.set('items', grCopyArr)
			
			updateParm.save({
				success: function(record) {
					var params = me.getSearchCondition();
					
					store.load({
						params: params
					});
					MessageUtil.saveSuccess(); // Success Message
				}
			});
		}
	},
	
	onAdd: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
     	var sn = refs.ctlSNN.getValue();
     	var jpvcNo = refs.ctlJpvc.getValue();
     	
		if(sn == null || sn == ""){
			MessageUtil.warning("goodsReceipt", "goodsreceipt_selectSn_msg");
		}else if (jpvcNo == null || jpvcNo == ""){
			MessageUtil.warning("goodsReceipt", "goodsreceipt_selectJpvc_msg");
		}else{
//			if(refs.ctlSNN.getSelection().get('cgTpCd') == 'RCV'){
//				me.getView().detailViewAlias = 'app-goodsreceiptdetailofroro';
//				me.openDetailPopup(refs.ctlSNN.getSelection(), 'GR of RORO');
//			}
//			else {
				me.getView().detailViewAlias = 'app-goodsreceiptdetail';
				me.openDetailPopup(null, 'Submission of GR');
//			}
		}
	},
	
	onRemove:function(){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		for(var i =0; i < selection.length; i++){
			if(selection[i].get('statCD') != 'RS'){
				MessageUtil.warning("goodsReceipt", "goodsreceipt_delete_status_msg");
				selection.splice(i);
				return;
			}
		}
		
		if(selection.length > 0){
			if(selection[0].get('isAssigned') != null && selection[0].get('isAssigned') != ''){
				MessageUtil.warning("goodsReceipt", "goodsreceipt_remove_exist_truck_msg");
				return;
			}else{	
				MessageUtil.question('remove', 'goodsreceipt_delete_msg', null,
						function(button){
					if (button === 'ok') {
						store.remove(selection);
						store.sync({
							success: function(){
								me.selectQuantity();
								MessageUtil.saveSuccess(); // Success Message
							}
						});
					}
				}
				);
			}
		}
	},
	
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) {
			return;		
		}
		
		me.getView().detailViewAlias = 'app-goodsreceiptdetail';
		me.openDetailPopup(selection, 'Submission of GR');
	},
	
	onSquareCargoChange: function(chk, newValue, oldValue, eOpts) {
		var me = this;
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theMain');
		var infoForm = detailView.down('form').getForm();
		
		if(chk.value){
			if(detailItem.data.catgCd == 'R'){
				MessageUtil.warning("goodsReceipt", "goodsreceipt_create_rejected_msg");
			}else{
				infoForm.findField('sumMt').setValue('0.000');
				infoForm.findField('sumM3').setValue('0.000');
				infoForm.findField('sumQty').setValue('0.');
			}
		} else {
			var numMt = parseFloat(detailItem.data.cgWgt) - parseFloat(detailItem.data.sumGrMt);
			infoForm.findField('sumMt').setValue(numMt);
			
			var numM3 = parseFloat(detailItem.data.measurement) - parseFloat(detailItem.data.sumGrM3);
			infoForm.findField('sumM3').setValue(numM3);
			
			var numQty = parseFloat(detailItem.data.pkgQty) - parseFloat(detailItem.data.sumGrQty);
			infoForm.findField('sumQty').setValue(numQty);
		}
	},
	
	onAddCargoChange: function(chk, newValue, oldValue, eOpts) {
		var me = this;
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theMain');
		var infoForm = detailView.down('form').getForm();
		
		if(chk.value){
			infoForm.findField('sumMt').setValue('0.000');
			infoForm.findField('sumM3').setValue('0.000');
			infoForm.findField('sumQty').setValue('0.');
		} else {
			var numMt = parseFloat(detailItem.data.cgWgt) - parseFloat(detailItem.data.sumGrMt);
			infoForm.findField('sumMt').setValue(numMt);
			var numM3 = parseFloat(detailItem.data.measurement) - parseFloat(detailItem.data.sumGrM3);
			infoForm.findField('sumM3').setValue(numM3);
			var numQty = parseFloat(detailItem.data.pkgQty) - parseFloat(detailItem.data.sumGrQty);
			infoForm.findField('sumQty').setValue(numQty);
		}
	},
	
	onMtOver: function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theMain');
		var infoForm = detailView.down('form').getForm();
		
		if(detailItem.get('cgTpCd') === 'DBN'){
			if(!infoForm.findField('spCargoChk').getValue() && !infoForm.findField('adCargoChk').getValue()){
				var sumGrWgt = detailItem.data.sumGrMt;
				var numMt = parseFloat(sumGrWgt) + parseFloat(infoForm.findField('grWgt').getValue());
				
				numMt = numMt - parseFloat(detailItem.data.grWgt1);
				
				var balanceMt = parseFloat(detailItem.data.cgWgt) - numMt;
				
				if(balanceMt < 0){
					if(refs.refAdditionalChk.getValue()){
						
					} else {
						MessageUtil.warning("goodsReceipt", "goodsreceipt_mt_msg");
						infoForm.findField('grWgt').setValue('');
						return;
					}
				}
				
				infoForm.findField('sumMt').setValue(Ext.util.Format.number(balanceMt, '0,000.000'));
			}
		}
	},
	
	onM3Over: function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theMain');
		var infoForm = detailView.down('form').getForm();
		
		if(detailItem.get('cgTpCd') === 'DBN'){
			if(!infoForm.findField('spCargoChk').getValue() && !infoForm.findField('adCargoChk').getValue()){
				var sumGrM3 = detailItem.data.sumGrM3;
				var numM3 = parseFloat(sumGrM3) - parseFloat(detailItem.data.grMsrmt1); 
				
				numM3 = numM3 + parseFloat(infoForm.findField('grMsrmt').getValue());
				
				var balanceM3 = parseFloat(detailItem.data.measurement) - numM3;
				
				if(balanceM3 < 0){
					if(refs.refAdditionalChk.getValue()){
						
					} else {
						MessageUtil.warning("goodsReceipt", "goodsreceipt_m3_msg");
						infoForm.findField('grMsrmt').setValue('');
						return;
					}
				}
				
				infoForm.findField('sumM3').setValue(Ext.util.Format.number(balanceM3, '0,000.000'));
			}
		}
	},
	
	onQtyOver: function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theMain');
		var infoForm = detailView.down('form').getForm();
		
		if(detailItem.get('cgTpCd') === 'DBN'){
			if(!infoForm.findField('spCargoChk').getValue() && !infoForm.findField('adCargoChk').getValue()){
				var sumGrQty = detailItem.data.sumGrQty;
				var numQty = parseFloat(sumGrQty) - parseFloat(detailItem.data.grQty1) + parseFloat(infoForm.findField('grQty').getValue());
				var balanceQty = parseFloat(detailItem.data.pkgQty) - numQty;
				
				if(balanceQty < 0){
					if(refs.refAdditionalChk.getValue()){
						
					} else {
						MessageUtil.warning("goodsReceipt", "goodsreceipt_qty_msg");
						infoForm.findField('grQty').setValue('');
						return;
					}
				}
				
				infoForm.findField('sumQty').setValue(Ext.util.Format.number(balanceQty, '0,000'));
			}
		}
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		var snCombo = me.getStore(me.SN_COMBO_STORE);
		var ctlSNN = refs.ctlSNN;
		var authority = '';
     	var ptnrCd = '';
		
     	if(MOST.config.Token.getUserType() === CONSTANTS.USER_TYPE_EXTERNAL){
     		if(me.existsPatnerType(CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY) || 
					  (me.existsPatnerType(CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY) && me.existsPatnerType(CONSTANTS.PTNR_TYPE_FORWARDER))){
     			if(me.existsPatnerType(CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY) && me.existsPatnerType(CONSTANTS.PTNR_TYPE_FORWARDER)){
     				authority = 'BH'
     			} else if(me.existsPatnerType(CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY)){
     				authority = CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY
     			}	
     		} else if(me.existsPatnerType(CONSTANTS.PTNR_TYPE_FORWARDER)){
     			authority = CONSTANTS.PTNR_TYPE_FORWARDER
     		} else if(me.existsPatnerType(CONSTANTS.PTNR_TYPE_SHIPPER_CONSIGNEE)){
     			authority = CONSTANTS.PTNR_TYPE_SHIPPER_CONSIGNEE
     		}
     		
     		ptnrCd = MOST.config.Token.getPtnrCode();
     	}
		
		if(targetControl == 'ctlJpvc'){ 
			if(returnValue){
				
				refs.ctlSNN.setValue('');
				refs.ctlGRNo.setValue('');
				refs.ctlDMode.setValue('');
				
				me.getViewModel().setData({theVslCallId:returnValue.item});
				
				refs.ctlScn.setValue(returnValue.item.get('scn'));

				snCombo.load({
					params:{
						vslCallId: returnValue.item.get('vslCallId'),
						authority: authority,
		    	        ptnrCd: ptnrCd
					}
				});
				
//				var recvData = me.getView().recvData;
//				
//				if(!recvData){
//					me.onSearch();
//				}
			} else {
				me.getViewModel().setData({theVslCallId:null});
				var snCombo = me.getStore(me.SN_COMBO_STORE);
				snCombo.loadData([],false);
				ctlSNN.reset();
			}
		} else if(targetControl === 'refJpvcText'){ // GRID CONTROL POPUP
			if(!StringUtil.isNullorEmpty(returnValue.code)){
				me.onSetComboBox(returnValue.code);
			}
		} else if(targetControl === 'ctlScn'){ 
			if(returnValue){
				refs.ctlScn.setValue(returnValue.code);

				if(!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))){
					refs.ctlJpvc.setValue(returnValue.item.get('vslCallId'));
					
					refs.ctlSNN.setValue('');
					refs.ctlGRNo.setValue('');
					refs.ctlDMode.setValue('');
					
					me.getViewModel().setData({theVslCallId:returnValue.item});
					snCombo.load({
						params:{
							vslCallId: returnValue.item.get('vslCallId'),
							authority: authority,
			    	        ptnrCd: ptnrCd
						}
					});
					me.onSearch();
				}else {
					
					if(!StringUtil.isNullorEmpty(returnValue.item.get('scn'))){
						
						refs.ctlSNN.setValue('');
						refs.ctlGRNo.setValue('');
						refs.ctlDMode.setValue('');
						
						snCombo.load({
							params:{
								scn: returnValue.item.get('scn'),
								authority: authority,
				    	        ptnrCd: ptnrCd
							}
						});
					}
					
					refs.ctlJpvc.setValue('');
					me.getViewModel().setData({theVslCallId:null});
				}
			} 
		}
	},
	
	onDownload : function(){
		var me = this;
		var refs = me.getReferences();
		
		var detailItem = me.getViewModel().get('theMain');
		var searchParm = Ext.create("MOST.model.pdfprint.SearchReportBizParm");
		
		var params = me.createParam(searchParm, ['file','serviceId','param1']);
		
		params['file'] = me.GR_PDF_FILE; // report format file name
		params['serviceId'] = me.GR_PDF_FUNCTION; // calling function 
		params['branchCode'] = MOST.config.Token.getBranchCode(); // branch code fro multi db
		params['param1'] = detailItem.get("vslCallId"); //vessel call id
		params['param2'] = detailItem.get("shipgNoteNo"); //shipping Note No
		params['param3'] = detailItem.get("gdsRecvNo"); //GR NO.
		params['param4'] = MOST.config.Token.getUserId(); //user Id
		
		me.openPDFPreview(params);
		
//		var params = me.getSearchCondition();
//		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
//		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
//		
//		if(selection == null){
//			MessageUtil.warning("goodsReceipt", "goodsreceipt_select_record_preview");
//			return;
//		} 
//		params['userId'] = MOST.config.Token.getUserId();
//		
//		var numMt = selection.data.cgWgt - selection.data.sumGrMt;
//		var numQty = selection.data.pkgQty - selection.data.sumGrQty;
//		
//		params['balanceQty'] = numQty.toString();
//		params['balanceMT'] = numMt.toString();
//		params['rptNo'] = "RCS017";
//		params['gdsRecvNo'] = selection.data.gdsRecvNo;
//		params['searchType'] = 'select';
//		params['printType'] = '';
//		
//		me.getView().detailViewAlias = 'app-goodreceiptgeneratepdf';
//		me.openDetailPopup(params, 'Download Report');
	},
	
	onPreview:function(){
		var me = this;
		var refs = me.getReferences();
		
		var detailItem = me.getViewModel().get('theMain');
		var searchParm = Ext.create("MOST.model.pdfprint.SearchReportBizParm");
		
		var params = me.createParam(searchParm, ['file','serviceId','param1']);
		
		params['file'] = me.GR_PDF_FILE; // report format file name
		params['serviceId'] = me.GR_PDF_FUNCTION; // calling function 
		params['branchCode'] = MOST.config.Token.getBranchCode(); // branch code fro multi db
		params['param1'] = detailItem.get("vslCallId"); //vessel call id
		params['param2'] = detailItem.get("shipgNoteNo"); //shipping Note No
		params['param3'] = detailItem.get("gdsRecvNo"); //GR NO.
		params['param4'] = MOST.config.Token.getUserId(); //user Id
		
		me.openPDFPreview(params);
	},
	
	onDetailPreview:function(){
		var me = this;
		var refs = me.getReferences();
		
		me.onPreview();
	},
	
	onDetailDownload:function(){
		var me = this;
		var refs = me.getReferences();
		
		me.onDownload();
	},
	
	onSubmit:function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theMain');
		var weight = parseFloat(refs.refWeight.getValue());
		var cbm = parseFloat(refs.refM3.getValue());
		//check permission for externals
		var userAgency = MOST.config.Token.getAgencyCode();
		var ctlTsptrCompValue = refs.ctlTsptrComp.getValue();
		var shprCd = me.getViewModel().get('theMain.shpr');
		
		if (me.authority != '' && me.authority != CodeConstants.CM_PTNRTP_BH && me.authority != CodeConstants.CM_PTNRTP_FWD){
			MessageUtil.warning("goodsReceipt", "goodsreceipt_sn_notassign_msg");
			return;
		}
		
		
		if(detailItem.get('cgTpCd') == 'LQD' ||
				detailItem.get('cgTpCd') == 'LQN' || 
					detailItem.get('cgTpCd') == 'LQE'){
			//Liquid
			if(cbm == 0 || cbm === ""){
				MessageUtil.warning("goodsReceipt", "goodsreceipt_cbm_zero");
				return;
			}
		}else{
			if(weight == 0 || weight === ""){
				MessageUtil.warning("goodsReceipt", "goodsreceipt_weight_zero");
				return;
			}
		}
		
		if(detailItem.get('delvTpCd') == 'I' && detailItem.get('grTsptTpCd') == 'PL'){
			MessageUtil.warning("goodsReceipt", "cannotAssignPipline");
			return;
		}
		
		//Check validations in case RTS
		if(refs.ctlReturnToShipper.checked == true){
			if((refs.ctlTxtLocationRTS.getValue() == '' || refs.ctlTxtLocationRTS.getValue() == null)
					&& refs.ctlTxtLocationRTS.hidden == false){
				MessageUtil.warning("goodsReceipt", "Please select Warehouse Location to create GR for Return to shipper");
				return;
			}
			
			if((Number(refs.refWeight.getValue()) > Number(refs.ctlBalWgtLocRTS.getValue()))
					&& refs.ctlBalWgtLocRTS.hidden == false){
				MessageUtil.warning("goodsReceipt", "Weight is greater than balance of this location");
				return;
			}
		}
		
		if(detailItem.crudState == 'U'){			
			if(detailItem.get('oldGrTsptTpCd') != detailItem.get('grTsptTpCd')){
				MessageUtil.warning("goodsReceipt", "You can not change mode of transport");
				return;
			}
		}
		
		me.onSave();
	},
	
	onClose:function(){
		var me = this;
		var detailView = me.lookupReference(me.getView().detailViewAlias);
		
		if(detailView){
			detailView.close();
		}
	},
	
	openTruckAssignment: function(recvData){
		var me = this;
		var prefix = 'menu';
		var menuId = 'MPDM108';
		var id = prefix + '_' + menuId;
		var mainView = me.getView().findParentByType('app-main');
		var tabs = mainView.lookupReference('ref-maintab');
		var tab = tabs.items.getByKey(id);
		var theMain = me.getViewModel().get('theMain');
		
		if(!tab){
			me.loadMenuView('app-lorryassignment', theMain.clone());
		} else {
			me.fireEvent('onRedirectTruckAssignment', theMain.clone());
			tabs.setActiveTab(tab);
		}
	},
	
	onSelectShipgNoteNoCombo: function(){
		var me = this;
		var refs = me.getReferences();
		var grList = me.getStore(me.GR_COMBO_STORE);
		var searchParm = me.getViewModel().get('theSearch');
		
		searchParm.set('grNo', '');
		
		grList.load({
			params: {
				vslCallId: searchParm.get('vslCallId'),
				shipgNoteNo: searchParm.get('shipgNoteNo')
			},
			callback: function(records, operation, success){
				if(success){
					
				}
			}
		});
		
		me.onSearch();
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
     	var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
     	var store = me.getStore(me.MAIN_STORE_NAME);
     	var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
     	var vslCallId = StringUtil.toUpperCase(searchParm.data.vslCallId);
     	var scn = StringUtil.toUpperCase(searchParm.data.scn);
     	var delvTpCd = searchParm.data.delvTpCd;
     	var shipgNoteNo = searchParm.data.shipgNoteNo;
     	var grNo = searchParm.data.grNo;
     	var authority = '';
     	var ptnrCd = '';
     	
     	var isReturnToShipperChk = refs.ctlReturnToShipper.getValue();
		var isReturnToShipper = '';
		if (isReturnToShipperChk) {
			var isReturnToShipper = 'R';
		}
     	
     	if(shipgNoteNo == 'Select'){
     		shipgNoteNo = '';
     	};
     	
     	if(MOST.config.Token.getUserType() === CONSTANTS.USER_TYPE_EXTERNAL){
     		if(me.existsPatnerType(CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY) || 
					  (me.existsPatnerType(CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY) && me.existsPatnerType(CONSTANTS.PTNR_TYPE_FORWARDER))){
     			if(me.existsPatnerType(CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY) && me.existsPatnerType(CONSTANTS.PTNR_TYPE_FORWARDER)){
     				authority = 'BH'
     			} else if(me.existsPatnerType(CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY)){
     				authority = CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY
     			}	
     		} else if(me.existsPatnerType(CONSTANTS.PTNR_TYPE_FORWARDER)){
     			authority = CONSTANTS.PTNR_TYPE_FORWARDER
     		} else if(me.existsPatnerType(CONSTANTS.PTNR_TYPE_SHIPPER_CONSIGNEE)){
     			authority = CONSTANTS.PTNR_TYPE_SHIPPER_CONSIGNEE
     		}
     		
     		ptnrCd = MOST.config.Token.getPtnrCode();
     	}
     	
     	var searchType = 'main';
    	var params = {
    		vslCallId : vslCallId,
    		scn: scn,
    		delvTpCd: delvTpCd,
    		shipgNoteNo: shipgNoteNo,
    		grNo: grNo,
    		searchType: searchType,
    		authority: authority,
    		ptnrCd: ptnrCd,
    		isReturnToShipper: isReturnToShipper,
    		sizePerPage: sizePerPage,
    		pageNo: pageNo,
    		sort : grid.getSortString()
		};
    	
    	return params;
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * DETAIL INITIALIZE START
	 */
	onDetailLoad:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
		if (recvData) {
			var cargoType = recvData.data.cgTpCd;
			if (cargoType == 'RCV') {
				refs.refWeight.setReadOnly(true);
				refs.refM3.setReadOnly(true);
				refs.refPkgQty.setReadOnly(true);
				
				refs.refWeight.setEditable(false);
				refs.refM3.setEditable(false);
				refs.refPkgQty.setEditable(false);
			} else {
				refs.refWeight.setReadOnly(false);
				refs.refM3.setReadOnly(false);
				refs.refPkgQty.setReadOnly(false);
				
				refs.refWeight.setEditable(true);
				refs.refM3.setEditable(true);
				refs.refPkgQty.setEditable(true);
			}
		}
	
		me.setDetailInitialize();
	},
	
	onDetailLoadOfRORO:function(){
		var me = this;
		var refs = me.getReferences();
		
		me.visibleDetailToolButton(ViewUtil.TOOL_SAVE, false);
		
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
		if(recvData != null){
			me.onGetInfoForCreating(recvData);
		}
	},
	
	onGetInfoForCreating: function(recvData){
		var me = this;
		var refs = me.getReferences();
		var grInfo = me.getStore(me.GR_INFO_CREATING_STORE);
		
		if(recvData){
			grInfo.load({
				params: {
					vslCallId : recvData.get('vslCallId'),
					shipgNoteNo : recvData.get('shipgNoteNo'),
					mfDocId : recvData.get('mfDocId')
				},
				callback: function(records, operation, success) {
					if (success) {
						me.getViewModel().setData({theSn:records[0]});
					}
				}
			})
		}
	},
	
	onROROGrGeneration: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theSn');
		
		if(StringUtil.isNullorEmpty(refs.refROROQty.getValue()) 
			|| (!StringUtil.isNullorEmpty(refs.refROROQty.getValue()) && Number(refs.refROROQty.getValue()) == 0)
			){
			MessageUtil.warning("goodsReceipt", "goodsreceipt_qty_zero");
			return;
		}
		
		if(Number(refs.refROROQty.getValue()) > Number(detailItem.get('balanceQty'))){
			MessageUtil.warning("goodsReceipt", "goodsreceipt_qty_msg");
			return;
		}
		
		var store = me.getStore(me.GR_OF_RORO_STORE);
		var detailView = me.getDetailBizView();
		
		detailItem.set('userId', MOST.config.Token.getUserId());
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = true;
		updateParm.set('workingStatus', WorkingStatus.INSERT);
		updateParm.set('userId', MOST.config.Token.getUserId());
		updateParm.set('item', detailItem.data)
		
		updateParm.save({
			success: function(record) {
				detailItem.set('version', record.get('newVersion'));
				detailItem.commit();

				MessageUtil.show(Ext.Msg.INFO, 'success_msg',
					'savesuccess_msg', 
					'',
					function(button) {
						if (button === 'ok') {
							me.onSearch();
						}
					}
				);
			}
		});
		
		if(detailView){
			detailView.close();
		}
	},
	
	/**
	 * =========================================================================================================================
	 * DETAIL INITIALIZE END
	 */
	
	
	/**
	 * =========================================================================================================================
	 * DETAIL HANDLE EVENT START
	 */
	onChangeNumber: function(e, text, prev) {
		var me = this;
		var detailItem = me.getViewModel().get('theMain');
		
		if(detailItem.get('cgTpCd') === 'DBN'){
			if (!/^(?!^\.)[0-9]*(\.[0-9]{0,2})?$/gm.test(text)){   
	            e.setValue(prev);
	        }
		}
	},
	
	onChangeMtM3: function(e, newVal, oldVal){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theMain');
		var infoForm = detailView.down('form').getForm();
		var pkgQty = detailItem.get('pkgQty');
		var allowDecimalLength = 3;
		var a = false;
		
		if(detailItem.get('cgTpCd') != null && detailItem.get('cgTpCd') != 'RCV'){
			newVal = (newVal == '') ? 0 : newVal;
			oldVal = (oldVal == '') ? 0 : oldVal;
			
			//In case Direct, have to select mode of operation first to auto count Mt, M3
			if(detailItem.crudState == 'C'){	
				if(detailItem.get('delvTpCd') == 'D' && (refs.refCboModeOfTransport.getValue() == null || refs.refCboModeOfTransport.getValue() == '')
						&& (Number(detailItem.get('dLrMt')) > 0 && Number(detailItem.get('dVslMt')) > 0)){
					MessageUtil.warning("goodsReceipt", "goodsreceipt_mode_of_operation_select");
					return;
				}
			}
			
			//In case Direct, re-calculate eachWgt, eachVol to auto load Mt. M3
			if(detailItem.get('delvTpCd') == 'D' &&  (Number(detailItem.get('dLrMt')) > 0 && Number(detailItem.get('dVslMt')) > 0)){
				if(refs.refCboModeOfTransport.getValue() == 'LR' || detailItem.get('tsptTpCd') == 'LR'){
					detailItem.set('eachWgt', String(Number(detailItem.get('dLrMt')) / Number(detailItem.get('dLrQty'))));
					detailItem.set('eachVol', String(Number(detailItem.get('dLrM3')) / Number(detailItem.get('dLrQty'))));
				}
				
				if(refs.refCboModeOfTransport.getValue() == 'SE' || detailItem.get('tsptTpCd') == 'SE'){
					detailItem.set('eachWgt', String(Number(detailItem.get('dVslMt')) / Number(detailItem.get('dVslQty'))));
					detailItem.set('eachVol', String(Number(detailItem.get('dVslM3')) / Number(detailItem.get('dVslQty'))));
				}
			}
			
			if(detailItem.get('delvTpCd') == 'D' &&  (Number(detailItem.get('dLrMt')) > 0 && Number(detailItem.get('dVslMt')) <= 0)){
				if(refs.refCboModeOfTransport.getValue() == 'LR' || detailItem.get('tsptTpCd') == 'LR'){
					detailItem.set('eachWgt', String(Number(detailItem.get('dLrMt')) / Number(detailItem.get('dLrQty'))));
					detailItem.set('eachVol', String(Number(detailItem.get('dLrM3')) / Number(detailItem.get('dLrQty'))));
				}
			}
			
			if(detailItem.get('delvTpCd') == 'D' &&  (Number(detailItem.get('dLrMt')) <= 0 && Number(detailItem.get('dVslMt')) > 0)){
				if(refs.refCboModeOfTransport.getValue() == 'SE' || detailItem.get('tsptTpCd') == 'SE'){
					detailItem.set('eachWgt', String(Number(detailItem.get('dVslMt')) / Number(detailItem.get('dVslQty'))));
					detailItem.set('eachVol', String(Number(detailItem.get('dVslM3')) / Number(detailItem.get('dVslQty'))));
				}
			}
			//sMantis: 0167892
			if(refs.refProjectCargo.getValue() == false){
				if(refs.refPkgQty.bind.value.lastValue != infoForm.findField('grQty').getValue()){
					a = true;
				}
				if(detailItem.get('cgTpCd') !== CodeConstants.MT_CGTP_DBN && detailItem.get('cgTpCd') !== CodeConstants.MT_CGTP_DBE && detailItem.get('cgTpCd') !== CodeConstants.MT_CGTP_LQNE && detailItem.get('cgTpCd') !== CodeConstants.MT_CGTP_LQE) {
					refs.refM3.setReadOnly(true);
					refs.refPkgQty.setReadOnly(false);
					refs.refWeight.setReadOnly(false);
					
					refs.refPkgQty.setFieldStyle('background-color:#60ec08;background-image:none');
					refs.refWeight.setFieldStyle('background-color:#60ec08;background-image:none');
					
					
					if(infoForm.findField('RTS').getValue()){
						var qty = refs.refTxtBalQty.getValue();
						
						var balanceRhdMt = detailItem.get('rhdlMt') - detailItem.get('sumRhdlMt');
						var balanceRhdM3 = detailItem.get('rhdlM3') - detailItem.get('sumRhdlM3');
						
						var eachWgt = parseFloat(detailItem.get('rhdlMt') / detailItem.get('rhdQty')).toFixed(20);
						var eachVol = parseFloat(detailItem.get('rhdlM3') / detailItem.get('rhdQty')).toFixed(20);
						
						if(parseInt(newVal) == 0) {
							grWgt =  0;
							grM3 = 0;
						}
						else { 
							
							if (detailItem.get('sumRhdQty') == 1 && parseInt(newVal) == parseInt(detailItem.get('rhdQty'))) {
								grWgt =  parseFloat(detailItem.get('rhdlMt')).toFixed(3);
								grM3 = parseFloat(detailItem.get('rhdlM3')).toFixed(3);
							} else {
								if (parseInt(newVal) == parseInt(detailItem.get('rhdQty')) - parseInt(detailItem.get('sumRhdQty'))) {
									grWgt =  parseFloat(balanceRhdMt).toFixed(3);
									grM3 = parseFloat(balanceRhdM3).toFixed(3);
								} 
								else if ( (parseInt(newVal) + parseInt(detailItem.get('sumRhdQty')) - parseInt(detailItem.get('grQty1')) == parseInt(detailItem.get('pkgQty')))) {
									grWgt = (parseFloat(detailItem.get('grWgt1')) + parseFloat(balanceRhdMt)).toFixed(3);
									grM3 = (parseFloat(detailItem.get('grMsrmt1')) + parseFloat(balanceRhdM3)).toFixed(3);
								}
								else {// Not Rounding, Truncate over 3 decimal numbers
									grWgt = Math.floor(parseFloat(eachWgt * newVal) * Math.pow(10, allowDecimalLength) ) / Math.pow(10, allowDecimalLength);	//var grWgt = parseFloat(eachWgt * newVal).toFixed(allowDecimalLength);
									grM3 = Math.floor(parseFloat(eachVol * newVal) * Math.pow(10, allowDecimalLength) ) / Math.pow(10, allowDecimalLength);	//var grM3 = parseFloat(eachVol * newVal).toFixed(3);
								}
							}
						}
						
						refs.refWeight.setValue(grWgt);
						refs.refM3.setValue(grM3);
						
						var sumGrWgt = detailItem.get('sumRhdlMt');
						var numMt = (parseFloat(sumGrWgt) - parseFloat(detailItem.data.grWgt1)).toFixed(3);
						numMt = (parseFloat(numMt) + parseFloat(infoForm.findField('grWgt').getValue())).toFixed(3);
						var balanceMt = (parseFloat(detailItem.get('rhdlMt')) - parseFloat(numMt)).toFixed(3);
						
						var sumGrM3 = detailItem.get('sumRhdlM3');
						var numM3 = (parseFloat(sumGrM3) - parseFloat(detailItem.data.grMsrmt1)).toFixed(3);
						numM3 = (parseFloat(numM3) + parseFloat(infoForm.findField('grMsrmt').getValue())).toFixed(3);
						var balanceM3 = (parseFloat(detailItem.get('rhdlM3')) - parseFloat(numM3)).toFixed(3);
						
						var sumGrQty = detailItem.get('sumRhdQty');
						var numQty = parseFloat(sumGrQty) - parseFloat(detailItem.data.grQty1);
						numQty = numQty + parseFloat(infoForm.findField('grQty').getValue());
						var balanceQty = parseFloat(detailItem.get('rhdQty')) - numQty;
						
						if(balanceMt < 0 && refs.refAdditionalChk.getValue() == false){
							MessageUtil.warning("goodsReceipt", "goodsreceipt_mt_msg");
							infoForm.findField('grWgt').setValue('');
							infoForm.findField('grMsrmt').setValue('');
							infoForm.findField('grQty').setValue('');
							return;
						}
						
						infoForm.findField('sumMt').setValue(Ext.util.Format.number(balanceMt, '0,000.000'));
						
						//balance M3
						if(balanceM3 < 0 && refs.refAdditionalChk.getValue() == false){
							MessageUtil.warning("goodsReceipt", "goodsreceipt_m3_msg");
							infoForm.findField('grMsrmt').setValue('');
							return;
						}
						infoForm.findField('sumM3').setValue(Ext.util.Format.number(balanceM3, '0,000.000'));
						
						//balance qty
						var numQty = parseFloat(sumGrQty) - parseFloat(detailItem.data.grQty1) + parseFloat(infoForm.findField('grQty').getValue());
						if(balanceQty < 0 && refs.refAdditionalChk.getValue() == false){
							MessageUtil.warning("goodsReceipt", "goodsreceipt_qty_RTS_msg");
							infoForm.findField('grQty').setValue('');
							return;
						}
						infoForm.findField('sumQty').setValue(Ext.util.Format.number(balanceQty, '0,000'));
					} else {
						if(detailItem.get('delvTpCd') == 'I'){	
							var eachWgt = (detailItem.get('cgWgt') == 0 ||  detailItem.get('pkgQty') == 0) ? 0 : parseFloat(detailItem.get('cgWgt')/detailItem.get('pkgQty')).toFixed(20);
							var eachVol = (detailItem.get('measurement') == 0 ||  detailItem.get('pkgQty') == 0) ? 0 : parseFloat(detailItem.get('measurement')/detailItem.get('pkgQty')).toFixed(20);
						}
						
						if(detailItem.get('delvTpCd') == 'D'){	
							var eachWgt = parseFloat(detailItem.get('eachWgt')).toFixed(20);
							var eachVol = parseFloat(detailItem.get('eachVol')).toFixed(20);
						}
						
						if (parseInt(pkgQty) == parseInt(newVal)) {
							var grWgt = detailItem.get('cgWgt');
							var grM3 = detailItem.get('measurement');
						} else {
							var grWgt = parseFloat(eachWgt * newVal).toFixed(20);
							var grM3 = parseFloat(eachVol * newVal).toFixed(20);
						}
						
						refs.refWeight.setValue(grWgt);
						refs.refM3.setValue(grM3);
						
						if(!infoForm.findField('spCargoChk').getValue() && !infoForm.findField('adCargoChk').getValue()){
							//Check balance Qty
							if(detailItem.get('delvTpCd') == 'D' &&  (refs.refCboModeOfTransport.getValue() == 'LR' || detailItem.get('tsptTpCd') == 'LR')){							
								var sumGrQty = detailItem.data.sumDLrQty;
								var numQty = parseFloat(sumGrQty) - parseFloat(detailItem.data.grQty1) + parseFloat(infoForm.findField('grQty').getValue());
							}
							
							if(detailItem.get('delvTpCd') == 'D' &&  (refs.refCboModeOfTransport.getValue() == 'SE' || detailItem.get('tsptTpCd') == 'SE')){							
								var sumGrQty = detailItem.data.sumDVslQty;
								var numQty = parseFloat(sumGrQty) - parseFloat(detailItem.data.grQty1) + parseFloat(infoForm.findField('grQty').getValue());
							}
							
							if(detailItem.get('delvTpCd') == 'I'){							
								var sumGrQty = detailItem.data.sumGrQty;
								var numQty = parseFloat(sumGrQty) - parseFloat(detailItem.data.grQty1) + parseFloat(infoForm.findField('grQty').getValue());
							}
							
							if(detailItem.get('delvTpCd') == 'D' &&  (refs.refCboModeOfTransport.getValue() == 'LR' || detailItem.get('tsptTpCd') == 'LR')){							
								var balanceQty = (parseFloat(detailItem.data.dLrQty) - numQty) < 0 ? 0 : (parseFloat(detailItem.data.dLrQty) - numQty);
							}
							
							if(detailItem.get('delvTpCd') == 'D' &&  (refs.refCboModeOfTransport.getValue() == 'SE' || detailItem.get('tsptTpCd') == 'SE')){							
								var balanceQty = (parseFloat(detailItem.data.dVslQty) - numQty) < 0 ? 0 : (parseFloat(detailItem.data.dVslQty) - numQty);
							}
							
							if(detailItem.get('delvTpCd') == 'I'){							
								var balanceQty = (parseFloat(detailItem.data.iqty) - numQty) < 0 ? 0 : (parseFloat(detailItem.data.iqty) - numQty);
							}
							
							if(balanceQty < 0 && a == true){
								if(refs.refAdditionalChk.getValue()==false){
									MessageUtil.warning("goodsReceipt", "goodsreceipt_balqty_msg");
									infoForm.findField('grWgt').setValue('');
									infoForm.findField('grMsrmt').setValue('');
									infoForm.findField('grQty').setValue('');	
									return;
								} 
								//					else {
								//						MessageUtil.warning("goodsReceipt", "goodsreceipt_qty_msg");
								//						infoForm.findField('grQty').setValue('');
								//						return;
								//					}
							}
							infoForm.findField('sumQty').setValue(Ext.util.Format.number(balanceQty, '0,000'));
							
							//Check balance MT
							if(detailItem.get('delvTpCd') == 'D' &&  (refs.refCboModeOfTransport.getValue() == 'LR' || detailItem.get('tsptTpCd') == 'LR')){							
								var sumGrWgt = detailItem.data.sumDLrMt;
								var numMt = parseFloat(sumGrWgt) + Number(parseFloat(infoForm.findField('grWgt').getValue()).toFixed(20));
							}
							
							if(detailItem.get('delvTpCd') == 'D' &&  (refs.refCboModeOfTransport.getValue() == 'SE' || detailItem.get('tsptTpCd') == 'SE')){							
								var sumGrWgt = detailItem.data.sumDVslMt;
								var numMt = parseFloat(sumGrWgt) + Number(parseFloat(infoForm.findField('grWgt').getValue()).toFixed(20));
							}
							
							if(detailItem.get('delvTpCd') == 'I'){							
								var sumGrWgt = detailItem.data.sumGrMt;
								var numMt = parseFloat(sumGrWgt) + Number(parseFloat(infoForm.findField('grWgt').getValue()).toFixed(20));
							}
							
							numMt = numMt - parseFloat(detailItem.data.grWgt1);
							
							if(detailItem.get('delvTpCd') == 'D' &&  (refs.refCboModeOfTransport.getValue() == 'LR' || detailItem.get('tsptTpCd') == 'LR')){
								var balanceMt = (parseFloat(detailItem.data.dLrMt) - parseFloat(numMt)) < 0 ? 0 : (parseFloat(detailItem.data.dLrMt) - parseFloat(numMt));
								
							}
							if(detailItem.get('delvTpCd') == 'D' &&  (refs.refCboModeOfTransport.getValue() == 'SE' || detailItem.get('tsptTpCd') == 'SE')){							
								var balanceMt = (parseFloat(detailItem.data.dVslMt) - parseFloat(numMt)) < 0 ? 0 : (parseFloat(detailItem.data.dVslMt) - parseFloat(numMt));
							}
							
							if(detailItem.get('delvTpCd') == 'I'){
								var balanceMt = (parseFloat(detailItem.data.imt) - numMt) < 0 ? 0 : (parseFloat(detailItem.data.imt) - numMt);
							}
							
							if(balanceQty == 0 && balanceMt != 0){
								balanceMt = 0;
							}
							
							if(balanceMt < 0 && a == true){
								if(refs.refAdditionalChk.getValue()==false){
									MessageUtil.warning("goodsReceipt", "goodsreceipt_balmt_msg");
									infoForm.findField('grWgt').setValue('');
									infoForm.findField('grMsrmt').setValue('');
									infoForm.findField('grQty').setValue('');
									return;
								} 
			    			/*
							else {
									MessageUtil.warning("goodsReceipt", "goodsreceipt_mt_msg");
									infoForm.findField('grWgt').setValue('');
									return;
								}
							*/
							}
							infoForm.findField('sumMt').setValue(Ext.util.Format.number(balanceMt, '0,000.000'));
							
							//Check balance M3
							if(detailItem.get('delvTpCd') == 'D' &&  (refs.refCboModeOfTransport.getValue() == 'LR' || detailItem.get('tsptTpCd') == 'LR')){							
								var sumGrM3 = detailItem.data.sumDLrM3;
								var numM3 = parseFloat(sumGrM3) - parseFloat(detailItem.data.grMsrmt1); 
							}
							
							if(detailItem.get('delvTpCd') == 'D' &&  (refs.refCboModeOfTransport.getValue() == 'SE' || detailItem.get('tsptTpCd') == 'SE')){							
								var sumGrM3 = detailItem.data.sumDVslM3;
								var numM3 = parseFloat(sumGrM3) - parseFloat(detailItem.data.grMsrmt1); 
							}
							
							if(detailItem.get('delvTpCd') == 'I'){							
								var sumGrM3 = detailItem.data.sumGrM3;
								var numM3 = parseFloat(sumGrM3) - parseFloat(detailItem.data.grMsrmt1); 
							}
							
							numM3 = numM3 + Number(parseFloat(infoForm.findField('grMsrmt').getValue()).toFixed(20));
							
							if(detailItem.get('delvTpCd') == 'D' &&  (refs.refCboModeOfTransport.getValue() == 'LR' || detailItem.get('tsptTpCd') == 'LR')){
								var balanceM3 = (parseFloat(detailItem.data.dLrM3) - parseFloat(numM3)) < 0 ? 0 : (parseFloat(detailItem.data.dLrM3) - parseFloat(numM3));
							}
							
							if(detailItem.get('delvTpCd') == 'D' &&  (refs.refCboModeOfTransport.getValue() == 'SE' || detailItem.get('tsptTpCd') == 'SE')){
								var balanceM3 = (parseFloat(detailItem.data.dVslM3) - parseFloat(numM3)) < 0 ? 0 : (parseFloat(detailItem.data.dVslM3) - parseFloat(numM3));
							}
							
							if(detailItem.get('delvTpCd') == 'I'){							
								var balanceM3 = (parseFloat(detailItem.data.im3) - numM3) < 0 ? 0 : (parseFloat(detailItem.data.im3) - numM3);
							}
							
							if(balanceQty == 0 && balanceM3 != 0){
								balanceM3 = 0;
							}
							
							if(balanceM3 < 0 && a == true){
								if(refs.refAdditionalChk.getValue()==false){
									MessageUtil.warning("goodsReceipt", "goodsreceipt_balm3_msg");
									infoForm.findField('grWgt').setValue('');
									infoForm.findField('grMsrmt').setValue('');
									infoForm.findField('grQty').setValue('');
									return;
								} 
		    				/*
							else {
								MessageUtil.warning("goodsReceipt", "goodsreceipt_m3_msg");
								infoForm.findField('grMsrmt').setValue('');
								return;
							}
							*/
							}
							infoForm.findField('sumM3').setValue(Ext.util.Format.number(balanceM3, '0,000.000'));						
						}
					}
					
				} else {
					refs.refWeight.setReadOnly(false);
					refs.refM3.setReadOnly(false);
					//refs.refPkgQty.setReadOnly(true);
					refs.refWeight.setFieldStyle('background-color:#60ec08;background-image:none');
					refs.refM3.setFieldStyle('background-color:#60ec08;background-image:none');
				}
			}
		}else{
			
			refs.refWeight.setReadOnly(true);
			refs.refM3.setReadOnly(true);
			
			if(newVal != 0 && newVal != detailItem.get('grQty') /*Old is newVal != me.roroQty, revert if it's not correct.*/){
				MessageUtil.warning("GoodsReceipt", "Package quantity is different number of units.");
				refs.refPkgQty.setValue(detailItem.get('grQty'));
			}
		}
		
	},
	
	onValidateNumber: function(v) {
        return /^(?!^\.)[0-9]*(\.[0-9]{1,2})?$/.test(v)? true : 'Only positive/negative float (x.yy)/int formats allowed!';
    },
    
    onCount : function (model, record, index, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.PACKAGE_DETAIL_GRID_REF_NAME);
		var pkgStore = me.getStore(me.PACKAGE_DETAIL_STORE);
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		var theMain = me.getViewModel().get('theMain');
		var pkgArr = new Array();
		var pkgMt = 0;
		var pkgM3 = 0;
		
		for(var i = 0; i < selection.length; i++){
			pkgArr.push(grid.getSelection().at(i).data);
			pkgMt += Number(selection.at(i).data.pkgMt);
			pkgM3 += Number(selection.at(i).data.pkgM3);
		}

		theMain.set('pkgItems', pkgArr);
		theMain.set('grWgt', pkgMt);
		theMain.set('grMsrmt', pkgM3);	
		
		refs.ctlPackageDetailQty.setValue(selection.length);
		refs.refPkgQty.setValue(selection.length);	
    },
	/**
	 * =========================================================================================================================
	 * DETAIL HANDLE EVENT END
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Detail Initialize
	setDetailInitialize:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var theVessel = me.getViewModel().get('theVslCallId');
		
		if(recvData == null){
			recvData = Ext.create('MOST.model.document.GoodsReceipt');
			recvData.data.workingStatus = WorkingStatus.INSERT;
		} 	
		
		me.setDetailControl(recvData);
	},
	
	setDetailControl:function(recvData){
		var me = this;
		var refs = me.getReferences();
		var trasModeStore = null;
		var theMainModel = recvData;
		var theVessel = me.getViewModel().get('theVslCallId');
		var rtsLocationStore = me.getStore('warehouseRtsList');
		
		rtsLocationStore.load({
			params:{
				vslCallId: me.getViewModel().get('theSearch').get('vslCallId'),
				shipgNoteNo: me.getViewModel().get('theSearch').get('shipgNoteNo'),
				pageNo: 1,
				sizePerPage: 25
			}
		});
		
		if (recvData.data.rhdlMode === 'R') {
			refs.ctlReturnToShipper.setRawValue(true);
			refs.refPkgQty.setReadOnly(true);
			refs.refM3.setReadOnly(true);
			refs.refWeight.setReadOnly(true);
		}
		
		//me.setComboBoxWithLocalCache(CacheServiceConstants.LORRY_MODE_COMBOBOX, me.LORRY_MODE_STORE);
		var transportMode = me.getStore(me.LORRY_MODE_STORE);
		transportMode.load();
		
//		me.setComboBoxWithLocalCache(CacheServiceConstants.LORRY_CONVAYOR_MODE_COMBOBOX, me.LORRY_CONVAYER_MODE_STORE);
//		me.setComboBoxWithLocalCache(CacheServiceConstants.CONVAYOR_MODE_COMBOBOX, me.CONVAYER_MODE_STORE);
//		me.setComboBoxWithLocalCache(CacheServiceConstants.LORRY_WAGON_MODE_COMBOBOX, me.LORRY_WAGON_MODE_STORE);
//		me.setComboBoxWithLocalCache(CacheServiceConstants.WAGON_MODE_COMBOBOX, me.WAGON_MODE_STORE);
		if(recvData.get(WorkingStatus.FIELD_NAME) != WorkingStatus.INSERT){
			refs.refAdditionalChk.setValue((theMainModel.data.additionalChk == 'Y' ? true : false));
		}
		refs.refTxtBalWgt.setValue(me.balanceWgt);
		refs.refTxtBalMsrmt.setValue(me.balanceMsrmt);
		refs.refTxtBalQty.setValue(me.balanceQty);
		
		refs.ctlTypeofPackage.refs.ctlField.setEditable(false);
		
		if(recvData.get(WorkingStatus.FIELD_NAME) == WorkingStatus.INSERT){
			var goodsReceiptDetail = me.getStore(me.GR_DETAIL_STORE);
			var sn = refs.ctlSNN.getValue();
			var vslCallId = refs.ctlJpvc.getValue();
			var theMainModel = recvData;
			
			goodsReceiptDetail.load({
				params: {
					vslCallId : vslCallId,
					shipgNoteNo : sn,
					searchType: 'create',
					pageNo: 1,
					sizePerPage: 25
				},
				callback: function(records, operation, success) {
					if (success) {
						if (records.length > 0) {
							var pkgStore = me.getStore(me.PACKAGE_DETAIL_STORE);
							
							
							theMainModel.data = records[0].data;
							theMainModel.data.wgtChk = 'Y';
							theMainModel.data.grQty = '0';
							theMainModel.data.grWgt = '0';
							theMainModel.data.grMsrmt = '0';													
							theMainModel.data.gdsRecvNo = '';
							theMainModel.data.grTsptTpCd = '';
							theMainModel.data.grRmk = '';
							theMainModel.data.lorryId = '';	
							theMainModel.data.vslCallId =  theVessel.data.vslCallId;
							theMainModel.data.vslCd =  theVessel.data.vslCd;
							theMainModel.data.callYear =  theVessel.data.callYear;
							theMainModel.data.callSeq = theVessel.data.callSeq;
							theMainModel.data.arrvSaId = theVessel.data.arrvSaId
							theMainModel.data.berthLoc = theVessel.data.berthLoc
							theMainModel.data.depSaId = theVessel.data.depSaId
							theMainModel.set('eta', Ext.Date.format( theVessel.data.eta, MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
							theMainModel.set('etb', Ext.Date.format( theVessel.data.etb, MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
							theMainModel.data.crud = 'C';
							theMainModel.data.spCargoChk = 'N';	
							theMainModel.data.adCargoChk = 'N';	
							theMainModel.data.sumGrMt = records[0].data.totGrMt;
							theMainModel.data.sumGrM3 = records[0].data.totGrM3;
							theMainModel.data.sumGrQty = records[0].data.totGrQty;
							theMainModel.data.grQty1 = theMainModel.data.grQty;
							theMainModel.data.grWgt1 = theMainModel.data.grWgt;
							theMainModel.data.grMsrmt1 = theMainModel.data.grMsrmt;
							
							if(theMainModel.get('delvTpCd') == 'D'){
								if(Number(theMainModel.get('dLrMt')) > 0 && Number(theMainModel.get('dVslMt')) <= 0){
									theMainModel.set('tsptTpCdNm', 'Lorry');
									theMainModel.set('grTsptTpCd', 'LR');
								}
								if(Number(theMainModel.get('dLrMt')) <= 0 && Number(theMainModel.get('dVslMt')) > 0){
									theMainModel.set('tsptTpCdNm', 'Vessel');
									theMainModel.set('grTsptTpCd', 'SE');
								}
								if(Number(theMainModel.get('dLrMt')) > 0 && Number(theMainModel.get('dVslMt')) > 0){
									theMainModel.set('tsptTpCdNm', 'Lorry, Vessel');
									theMainModel.set('grTsptTpCd', 'LR');
								}
								
								transportMode.setData([
								     { scd: 'LR', scdNm: 'LORRY' },
								     { scd: 'SE', scdNm: 'VESSEL' }
								 ]);
							}
							
							if(theMainModel.get('delvTpCd') == 'I' ) { 
								theMainModel.set('grTsptTpCd', 'LR');
								theMainModel.set('tsptTpCdNm', 'Lorry');
								refs.refCboModeOfTransport.setDisabled(true);
								
								transportMode.setData([
								     { scd: 'LR', scdNm: 'LORRY' },
								     { scd: 'PL', scdNm: 'PIPELINE' }
								 ]);
							}
							
							me.getViewModel().setData({theMain:theMainModel});
							
							refs.ctlGrValidDate.setValue(records[0].data.validDate);
							refs.ctlETAFromDt.setValue(records[0].data.estArrvDt);
							
							var detailView = me.getDetailBizView();
							var infoForm = detailView.down('form').getForm();
							
							//refs.refCboModeOfTransport.setValue(theMainModel.data.tsptTpCd);
							
							var numMt = theMainModel.data.cgWgt - theMainModel.data.sumGrMt;
							infoForm.findField('sumMt').setValue(Ext.util.Format.number(numMt < 0 ? 0 : numMt, '0,000.000'));
							
							var numM3 = theMainModel.data.measurement - theMainModel.data.sumGrM3;
							infoForm.findField('sumM3').setValue(Ext.util.Format.number(numM3 < 0 ? 0 : numM3, '0,000.000'));
							
							var numQty = theMainModel.data.pkgQty - theMainModel.data.sumGrQty;
							infoForm.findField('sumQty').setValue(Ext.util.Format.number(numQty < 0 ? 0 : numQty, '0,000'));
							
							if(me.getViewModel().get('theMain').get('cgTpCd') == CodeConstants.MT_CGTP_BBK ||
									me.getViewModel().get('theMain').get('cgTpCd') == CodeConstants.MT_CGTP_DBN ||
									me.getViewModel().get('theMain').get('cgTpCd') == CodeConstants.MT_CGTP_DBE){
								refs.refWeightChk.setDisabled(MOST.config.Token.getUserType() == CodeConstants.USER_TYPE_INTERNAL ? false : true);
							}
							
							if(me.getViewModel().get('theMain').get('cgTpCd') == 'DBN'){
								refs.ctlTypeofPackage.refs.ctlOpenPopupButton.setDisabled(false);
							}else{
								refs.ctlTypeofPackage.refs.ctlOpenPopupButton.setDisabled(true);
							}
							
							if(me.getViewModel().get('theMain').get('projectCargo') == 'Y'){
								refs.refTxtBalWgt.setValue(0);
								refs.refTxtBalMsrmt.setValue(0);
								refs.refTxtBalQty.setValue(0);
								refs.refTxtBalWgt.setDisabled(true);
								refs.refTxtBalMsrmt.setDisabled(true);
								refs.refTxtBalQty.setDisabled(true);
								refs.refDeliveryPackageDetail.setDisabled(false);
							} else {
								refs.refTxtBalWgt.setDisabled(false);
								refs.refTxtBalMsrmt.setDisabled(false);
								refs.refTxtBalQty.setDisabled(false);
								refs.refDeliveryPackageDetail.setDisabled(true);
							}
							//sMantis: 0167040, 0167892
							var cgTpCd = me.getViewModel().get('theMain').get('cgTpCd');
							if(cgTpCd == CodeConstants.MT_CGTP_LQNE || cgTpCd == CodeConstants.MT_CGTP_LQE) {
								refs.refM3.setReadOnly(false);
								refs.refM3.setEditable(true);
								refs.refM3.setFieldStyle('background-color:#60ec08;background-image:none');
							} else {
								refs.refM3.setReadOnly(true);
								refs.refM3.setEditable(false);
							}
							//eMantis: 0167040, 0167892
							
							pkgStore.load({
								params: {
									mfDocId: me.getViewModel().get('theMain').get('mfDocId'),
									vslCallId: me.getViewModel().get('theMain').get('vslCallId'),
									shipgNoteNo: me.getViewModel().get('theMain').get('shipgNoteNo')
								}								
							});
							
							var theMain = me.getViewModel().get('theMain');
							//Display RORO tab
							if(theMain.get('cgTpCd') == CodeConstants.MT_CGTP_RCV){
								refs.refROROTab.setDisabled(false);
								refs.refChkMulti.setHidden(false);
								var unitList = me.getStore(me.RORO_STORE_NAME);
								unitList.load({
									params:{
										vslCallId	: theVessel.get('vslCallId'),
										mfDocId 	: theMain.get('mfdocid'),
										shipgNoteNo : theMain.get('shipgNoteNo'),
										searchFlag	: 'GR'
									},
									callback: function(records, operation, success) {
										if(success){}
									}
								});
							}else{
								refs.refROROTab.setDisabled(true);
							}
						}
					}
				}
			});
		} else {
			var goodsReceiptDetail = me.getStore(me.GR_DETAIL_STORE);
			refs.ctlReturnToShipper.setDisabled(true);
			goodsReceiptDetail.load({
				params: {
					vslCallId : recvData.data.vslCallId,
					shipgNoteNo : recvData.data.shipgNoteNo,
					gdsRecvNo: recvData.data.gdsRecvNo,
					searchType: 'update'
				},
				callback: function(records, operation, success) {
					if (success) {
						if (records.length > 0) {
							var pkgStore = me.getStore(me.PACKAGE_DETAIL_STORE);
							
							theMainModel.data.vslCallId = theVessel != null ? theVessel.data.vslCallId : theMainModel.data.vslCallId;
							theMainModel.data.scn =  theVessel != null ? theVessel.data.scn : theMainModel.data.scn;
							theMainModel.data.vslCd =  theVessel != null ? theVessel.data.vslCd : theMainModel.data.vslCd;
							theMainModel.data.callYear =  theVessel != null ? theVessel.data.callYear : theMainModel.data.callYear;
							theMainModel.data.callSeq = theVessel != null ? theVessel.data.callSeq : theMainModel.data.callSeq;
							theMainModel.data.arrvSaId = theVessel != null ? theVessel.data.arrvSaId : theMainModel.data.arrvSaId;
							theMainModel.data.berthLoc = theVessel != null ? theVessel.data.berthLoc : theMainModel.data.berthLoc;
							theMainModel.data.depSaId = theVessel != null ? theVessel.data.depSaId : theMainModel.data.depSaId;
							theMainModel.set('eta', Ext.Date.format( theVessel != null ? theVessel.data.eta : theMainModel.data.eta, MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
							theMainModel.set('etb', Ext.Date.format( theVessel != null ? theVessel.data.etb : theMainModel.data.etb, MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
							theMainModel.data.grQty1 = theMainModel.data.grQty;
							theMainModel.data.grWgt1 = theMainModel.data.grWgt;
							theMainModel.data.grMsrmt1 = theMainModel.data.grMsrmt;
							
							theMainModel.data.sumRhdlMt = records[0].data.sumRhdlMt;
							theMainModel.data.sumRhdlM3 = records[0].data.sumRhdlM3;
							theMainModel.data.sumRhdQty = records[0].data.sumRhdQty;

							theMainModel.data.rhdlMt = records[0].data.rhdlMt;
							theMainModel.data.rhdlM3 = records[0].data.rhdlM3;
							theMainModel.data.rhdQty = records[0].data.rhdQty;
							
							if(theMainModel.get('delvTpCd') == 'D'){
								if(Number(theMainModel.get('dLrMt')) > 0 && Number(theMainModel.get('dVslMt')) <= 0){
									theMainModel.set('tsptTpCdNm', 'Lorry');
								}
								if(Number(theMainModel.get('dLrMt')) <= 0 && Number(theMainModel.get('dVslMt')) > 0){
									theMainModel.set('tsptTpCdNm', 'Vessel');
								}
								if(Number(theMainModel.get('dLrMt')) > 0 && Number(theMainModel.get('dVslMt')) > 0){
									theMainModel.set('tsptTpCdNm', 'Lorry, Vessel');
								}
//								refs.refCboModeOfTransport.setValue(theMainModel.data.tsptCd);
//								refs.refCboModeOfTransport.setDisabled(false);
							}
							
							if(theMainModel.get('delvTpCd') == 'I' ) {
								theMainModel.set('grTsptTpCd', 'LR');
								theMainModel.set('tsptTpCdNm', 'Lorry');
								refs.refCboModeOfTransport.setDisabled(true);
							}
							
							me.getViewModel().setData({theMain:theMainModel});

							//refs.refAdditionalChk.setValue((theMainModel.data.additionalChk == 'Y' ? true : false));
							//refs.refAdditionalChk.checked = refs.refAdditionalChk.getValue();
							refs.ctlGrValidDate.setValue(records[0].data.validDate);
							refs.refDomesticChk.checked = theMainModel.data.domesticChk == 'Domestic' ? true : false;
							refs.refWeightChk.checked = theMainModel.data.wgtChk == 'N' ? true : false;
							refs.ctlETAFromDt.setValue(records[0].data.estArrvDt);
							
							var detailView = me.getDetailBizView();
							var infoForm = detailView.down('form').getForm();
							
							if (records[0].data.rhdlMode === 'R') {
								var numMt = (records[0].data.rhdlMt - records[0].data.sumRhdlMt) < 0 ? 0 : (records[0].data.rhdlMt - records[0].data.sumRhdlMt);
								var numM3 = (records[0].data.rhdlM3 - records[0].data.sumRhdlM3) < 0 ? 0 : (records[0].data.rhdlM3 - records[0].data.sumRhdlM3);
								var numQty = (records[0].data.rhdQty - records[0].data.sumRhdQty) < 0 ? 0 : (records[0].data.rhdQty - records[0].data.sumRhdQty);
							} else {
								var numMt = (theMainModel.data.cgWgt - theMainModel.data.sumGrMt) < 0 ? 0 : (theMainModel.data.cgWgt - theMainModel.data.sumGrMt);
								var numM3 = (theMainModel.data.measurement - theMainModel.data.sumGrM3) < 0 ? 0 : (theMainModel.data.measurement - theMainModel.data.sumGrM3);
								var numQty = (theMainModel.data.pkgQty - theMainModel.data.sumGrQty) < 0 ? 0 : (theMainModel.data.pkgQty - theMainModel.data.sumGrQty);
							}
							
							infoForm.findField('sumMt').setValue(Ext.util.Format.number(numMt, '0,000.000'));
							infoForm.findField('sumM3').setValue(Ext.util.Format.number(numM3, '0,000.000'));
							infoForm.findField('sumQty').setValue(Ext.util.Format.number(numQty, '0,000'));

							if(me.getViewModel().get('theMain').get('cgTpCd') == CodeConstants.MT_CGTP_BBK ||
									me.getViewModel().get('theMain').get('cgTpCd') == CodeConstants.MT_CGTP_DBN){
								refs.refWeightChk.setDisabled(MOST.config.Token.getUserType() == CodeConstants.USER_TYPE_INTERNAL ? false : true);
							}
							
							if(me.getViewModel().get('theMain').get('cgTpCd') == 'DBN' || me.getViewModel().get('theMain').get('cgTpCd') == 'LQD'){
								refs.ctlTypeofPackage.refs.ctlOpenPopupButton.setDisabled(false);
							}else{
								refs.ctlTypeofPackage.refs.ctlOpenPopupButton.setDisabled(true);
							}
							
							if(me.getViewModel().get('theMain').get('projectCargo') == 'Y'){
								refs.refTxtBalWgt.setValue(0);
								refs.refTxtBalMsrmt.setValue(0);
								refs.refTxtBalQty.setValue(0);
								refs.refTxtBalWgt.setDisabled(true);
								refs.refTxtBalMsrmt.setDisabled(true);
								refs.refTxtBalQty.setDisabled(true);
								refs.refDeliveryPackageDetail.setDisabled(false);
							} else {
								refs.refTxtBalWgt.setDisabled(false);
								refs.refTxtBalMsrmt.setDisabled(false);
								refs.refTxtBalQty.setDisabled(false);
								refs.refDeliveryPackageDetail.setDisabled(true);
							}

							//sMantis: 0167040, 0167892
							var cgTpCd = me.getViewModel().get('theMain').get('cgTpCd');
							if(cgTpCd == CodeConstants.MT_CGTP_LQNE || cgTpCd == CodeConstants.MT_CGTP_LQE) {
								refs.refM3.setReadOnly(false);
								refs.refM3.setEditable(true);
								refs.refM3.setFieldStyle('background-color:#60ec08;background-image:none');
							} else {
								refs.refM3.setReadOnly(true);
								refs.refM3.setEditable(false);
							}
							//eMantis: 0167040, 0167892
							
							if(me.getViewModel().get('theMain').get('catgCd') == 'A'){
								refs.refTransit.setHidden(false);
							} else {
								refs.refTransit.setHidden(true);
							}
							var gdsRecvNo = me.getViewModel().get('theMain').get('gdsRecvNo');
							pkgStore.load({
								params: {
									mfDocId: me.getViewModel().get('theMain').get('mfDocId'),
									vslCallId: me.getViewModel().get('theMain').get('vslCallId'),
									shipgNoteNo: me.getViewModel().get('theMain').get('shipgNoteNo'),
									gdsRecvNo: gdsRecvNo
								},
								//sMantis: 0167424
								callback: function(records, operation, success) {
									if(success) {
										var selectedCount = 0;
										var selectedRows = [];
										var pkgGrid = me.lookupReference(me.PACKAGE_DETAIL_GRID_REF_NAME);
										if(records.length > 0) { 
											for(let i = 0; i < records.length; i++) {
												if(records[i].data.gdsRecvNo == gdsRecvNo) {
													selectedCount ++;
													selectedRows.push(records[i]);
												}
											}
										}
										refs.ctlPackageDetailQty.setValue(selectedCount);
										pkgGrid.getSelectionModel().select(selectedRows);
									}
								}
								//eMantis: 0167424
							});
							var theMain = me.getViewModel().get('theMain');
							//Display RORO tab
							if(theMain.get('cgTpCd') == CodeConstants.MT_CGTP_RCV){
								refs.refROROTab.setDisabled(false);
								refs.refChkMulti.setHidden(true);
								var unitList = me.getStore(me.RORO_STORE_NAME);
								unitList.load({
									params:{
										vslCallId	: theVessel.get('vslCallId'),
										mfDocId 	: theMain.get('mfdocid'),
										shipgNoteNo : theMain.get('shipgNoteNo'),
										grNo   		:  me.getViewModel().get('theMain').get('gdsRecvNo')
									},
									callback: function(records, operation, success) {
										if(success){}
									}
								});
							}else{
								refs.refROROTab.setDisabled(true);
							}
						}
					}
				}
			});
		}
		
	},
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD END.
	 */

	
	/**
	 * HHT METHOD START
	 * =========================================================================================================================
	 */		
    onHHTLoad: function(){
		var me = this;
		var refs = me.getReferences();		
	},
	
	onSearchHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
    	var params = me.getSearchConditionHHT();

		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
		
					}else{
						MessageUtil.warning("goodsReceipt", "goodsreceipt_nodata");
					}
				}
			}
		});
	},
	
	getSearchConditionHHT : function(){
		var me = this;
     	var refs = me.getReferences();
    	var jpvcNo = refs.refJpvcText.getValue();
    	var gdsRecvNo = refs.refGRNO.getValue();
    	var shipgNoteNo = refs.refcomboSNNO.getValue();
     	var authority = '';
     	var ptnrCd = '';
    	var arrvDtFm =  Ext.Date.format(refs.refFromWorkDateDatePickerfield.getValue(), 'd/m/Y');
		var arrvDtTo = Ext.Date.format(refs.refToWorkDateDatePickerfield.getValue(), 'd/m/Y');

     	if(shipgNoteNo == 'Select'){
     		shipgNoteNo = '';
     	};
     	
     	if(MOST.config.Token.getUserType() === CONSTANTS.USER_TYPE_EXTERNAL){
     		if(me.existsPatnerType(CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY) || 
					  (me.existsPatnerType(CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY) && me.existsPatnerType(CONSTANTS.PTNR_TYPE_FORWARDER))){
     			if(me.existsPatnerType(CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY) && me.existsPatnerType(CONSTANTS.PTNR_TYPE_FORWARDER)){
     				authority = 'BH'
     			} else if(me.existsPatnerType(CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY)){
     				authority = CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY
     			}	
     		} else if(me.existsPatnerType(CONSTANTS.PTNR_TYPE_FORWARDER)){
     			authority = CONSTANTS.PTNR_TYPE_FORWARDER
     		} else if(me.existsPatnerType(CONSTANTS.PTNR_TYPE_SHIPPER_CONSIGNEE)){
     			authority = CONSTANTS.PTNR_TYPE_SHIPPER_CONSIGNEE
     		}
     		ptnrCd = MOST.config.Token.getPtnrCode();
     	}
     	
     	var searchType = 'main';
    	var params = {
    		vslCallId : jpvcNo,
    		shipgNoteNo: shipgNoteNo,
    		searchType: searchType,
    		authority: authority,
    		ptnrCd: ptnrCd,
    		arrvDtFm: arrvDtFm,
    		arrvDtTo: arrvDtTo,
    		gdsRecvNo : gdsRecvNo
		};
    	
    	return params;
	},
	
	 onCheckJpvcRadioField: function(radioField, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var snCombo = me.getStore(me.SN_COMBO_STORE);
		
		if(radioField.getValue()=='JPVC'){
			refs.refJpvcText.setDisabled(true);
			refs.refcomboSNNO.setDisabled(true);
		}else{
			refs.refJpvcText.setDisabled(false);
			refs.refcomboSNNO.setDisabled(false);
			snCombo.removeAll();
		}
	 },
	 
	// Grid Row Double
	onHHTDblClick: function() {
		var me = this; 
		var window = me.getView().up('window');
		
    	window.returnValue = me.getReturnData();
       	window.close();
	},
	
	// Returns the popup result.
	getReturnData:function(){
		var me = this;
		var grid = me.lookupReference('refLorryPopupHHTGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		var returnItem = {
			code : selection.data.gdsRecvNo,
			codeName : selection.data.gdsRecvNo,
			item : selection
		}
		
		return returnItem;
	},
	
	onSetComboBox: function(paramVslCallId) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.SN_COMBO_STORE);
		var vslCallId = '';

		if(!StringUtil.isNullorEmpty(paramVslCallId)){
			vslCallId = paramVslCallId;
		}
		
		var authority = '';
     	var ptnrCd = '';
		
     	if(MOST.config.Token.getUserType() === CONSTANTS.USER_TYPE_EXTERNAL){
     		if(me.existsPatnerType(CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY) || 
					  (me.existsPatnerType(CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY) && me.existsPatnerType(CONSTANTS.PTNR_TYPE_FORWARDER))){
     			if(me.existsPatnerType(CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY) && me.existsPatnerType(CONSTANTS.PTNR_TYPE_FORWARDER)){
     				authority = 'BH'
     			} else if(me.existsPatnerType(CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY)){
     				authority = CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY
     			}	
     		} else if(me.existsPatnerType(CONSTANTS.PTNR_TYPE_FORWARDER)){
     			authority = CONSTANTS.PTNR_TYPE_FORWARDER
     		} else if(me.existsPatnerType(CONSTANTS.PTNR_TYPE_SHIPPER_CONSIGNEE)){
     			authority = CONSTANTS.PTNR_TYPE_SHIPPER_CONSIGNEE
     		}
     		ptnrCd = MOST.config.Token.getPtnrCode();
     	}

		store.load({
			params: {
				vslCallId: vslCallId,
				authority: authority,
    	        ptnrCd: ptnrCd
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						store.removeAll();
						for(var i = 0 ; i < records.length ; i++){
							store.insert(i, [{shipgNoteNo: records[i].data.shipgNoteNo, shipgNoteNm: records[i].data.shipgNoteNoNm}]);
						}
					}
					store.insert(0, [{shipgNoteNo: '',shipgNoteNm: 'All'}]);
				}
			}
		});
	},
	
	onSelectData : function(ref){
		var me = this; 
		var window = me.getView().up('window');
		
		if(ref.getReference() == 'refBtnSelectGRATAHHT'){//Select from JPVC:
			window.returnValue = me.getJPVCReturnDataHHT();
		}
		if(window.returnValue != null){
			window.close();	
		}
	},
	
	getJPVCReturnDataHHT : function() {
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		var grid = me.lookupReference('refLorryPopupHHTGrid');
		
		selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection == null){
			MessageUtil.warning('Warning', 'tbl_sts_select');
			return null;
		}
		
		var returnItem = {
			code : selection.data.gdsRecvNo,
			codeName : selection.data.gdsRecvNo,
			item : selection
		}

    	window.returnValue = returnItem;
		
		if(window.returnValue != null){
			window.close();	
		}
	},
	
	onReturnToShipperCheck: function(chk, newValue, oldValue, eOpts) {
		var me = this,
			refs = me.getReferences(),
		 	detailView = me.getDetailBizView(),
			recvData = detailView.items.get(0).recvData,
			returnToShipperStore = me.getStore('goodsReceiptRTS'),
			vslCallId = refs.ctlJpvc.getValue(),
			shipgNoteNo = refs.ctlSNN.getValue(),
			gdsRecvNo = '';
		var theMain = me.getViewModel().get('theMain');

		var infoForm = detailView.down('form').getForm();
		infoForm.findField('grWgt').setValue(0);
		infoForm.findField('grMsrmt').setValue(0);
		infoForm.findField('grQty').setValue(0);
		/*refs.refPkgQty.setReadOnly(true);
		refs.refM3.setReadOnly(true);
		refs.refWeight.setReadOnly(true);*/

		if(chk.value){
			refs.ctlWarehouseCombo.setHidden(false);
			refs.ctlTxtLocationRTS.setHidden(false);
			refs.ctlBalWgtLocRTS.setHidden(false);
			if(recvData != null){ 
				gdsRecvNo = recvData.data.gdsRecvNo
			}
			returnToShipperStore.load({
				params: {
					vslCallId : vslCallId,
					shipgNoteNo : shipgNoteNo,
				},
				callback: function(records, operation, success) {
					if (success) {
						if (records.length > 0) {
							 	var numMt = records[0].data.totGrMt,
							 	numM3 = records[0].data.totGrM3,
							 	numQty = records[0].data.totGrQty,
								detailItem = me.getViewModel().get('theMain');
								
								if (detailItem) {
									detailItem.data.sumGrMt = records[0].data.totGrMt;
									detailItem.data.sumGrM3 = records[0].data.totGrM3;
									detailItem.data.sumGrQty = records[0].data.totGrQty;
									detailItem.data.rhdlNo = records[0].data.rhdlNo;
								}
								
							me.getViewModel().setData({theMain:detailItem});

							/*infoForm.findField('grWgt').setValue(numMt);
							infoForm.findField('grMsrmt').setValue(numM3);
							infoForm.findField('grQty').setValue(numQty);*/
							
							infoForm.findField('sumMt').setValue(Ext.util.Format.number(Number(detailItem.get('rhdlMt')) - Number(detailItem.get('sumRhdlMt')), '0,000.000'));
							infoForm.findField('sumM3').setValue(Ext.util.Format.number(Number(detailItem.get('rhdlM3')) - Number(detailItem.get('sumRhdlM3')), '0,000.000'));
							infoForm.findField('sumQty').setValue(Ext.util.Format.number(Number(detailItem.get('rhdQty')) - Number(detailItem.get('sumRhdQty')), '0,000'));
							//me.onChangeMtM3();

						} else {
							infoForm.findField('grWgt').setValue(0);
							infoForm.findField('grMsrmt').setValue(0);
							infoForm.findField('grQty').setValue(0);
							infoForm.findField('sumMt').setValue(Ext.util.Format.number(0, '0,000.000'));
							infoForm.findField('sumM3').setValue(Ext.util.Format.number(0, '0,000.000'));
							infoForm.findField('sumQty').setValue(Ext.util.Format.number(0, '0,000'));

						}
					}
				}
			});
			if(theMain && theMain.get('cgTpCd') == CodeConstants.MT_CGTPNLQ_RCV) {
				me.loadRSTForRORO();
			}
		}
		else {
			refs.ctlWarehouseCombo.setHidden(true);
			refs.ctlTxtLocationRTS.setHidden(true);
			refs.ctlBalWgtLocRTS.setHidden(true);
			me.setDetailInitialize();
		}
		
	},
	
	onSelectModeOfTransCombo: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theMain');
		var transMode = refs.refCboModeOfTransport.getValue();
		var workingStatus = detailItem.crudState;
		var store = me.getStore(me.MAIN_STORE_NAME);
		
		var sumExistedMt = 0;
		var sumExistedM3 = 0;
		var sumExistedQty = 0;
		
		var deliveryMode = me.getViewModel().get('theMain').get('delvTpCdNm');
		
		//In case select Lorry
		if(transMode == 'LR'){
			//In case create status
			if(workingStatus == 'C'){
				detailItem.set('grWgt', 0);
				detailItem.set('grMsrmt', 0);
				detailItem.set('grQty', 0);
				
				//Count sum MT, M3, Qty existed of SN
				if(store.data.length > 0){
					store.each(function (rec) { 
						if(rec.get('shipgNoteNo') == detailItem.get('shipgNoteNo') && (rec.get('grTsptTpCd') == 'LR')){	
							sumExistedMt += Number(rec.get('grWgt')); 
							sumExistedM3 += Number(rec.get('grMsrmt'));
							sumExistedQty += Number(rec.get('grQty'));
						}
					});
				}
			}
			//In case update status
			else if(workingStatus == 'U'){
				//Count sum MT, M3, Qty existed of SN except current GR
				store.each(function (rec) { 
					if(rec.get('gdsRecvNo') == detailItem.get('gdsRecvNo') && rec.get('shipgNoteNo') == detailItem.get('shipgNoteNo') 
							&& (rec.get('grTsptTpCd') == 'LR')){			
						sumExistedMt += Number(rec.get('grWgt')); 
						sumExistedM3 += Number(rec.get('grMsrmt'));
						sumExistedQty += Number(rec.get('grQty'));
					}
				});
			}
			
			//Set values for Balance fields
			if (deliveryMode == 'DIRECT') {
				refs.refTxtBalWgt.setValue(Number(detailItem.get('dLrMt')) - sumExistedMt);
				refs.refTxtBalMsrmt.setValue(Number(detailItem.get('dLrM3')) - sumExistedM3);
				refs.refTxtBalQty.setValue(Number(detailItem.get('dLrQty')) - sumExistedQty);
			} else if (deliveryMode == 'INDIRECT') {
				refs.refTxtBalWgt.setValue(Number(detailItem.get('imt')) - sumExistedMt);
				refs.refTxtBalMsrmt.setValue(Number(detailItem.get('im3')) - sumExistedM3);
				refs.refTxtBalQty.setValue(Number(detailItem.get('iqty')) - sumExistedQty);
			}
		}
		//In case select Vessel
		else if(transMode == 'SE'){
			//In case create status
			if(workingStatus == 'C'){
				detailItem.set('grWgt', 0);
				detailItem.set('grMsrmt', 0);
				detailItem.set('grQty', 0);
				
				//Count sum MT, M3, Qty existed of SN
				if(store.data.length > 0){
					store.each(function (rec) { 
						if(rec.get('shipgNoteNo') == detailItem.get('shipgNoteNo') && rec.get('grTsptTpCd') == 'SE'){		
							sumExistedMt += Number(rec.get('grWgt')); 
							sumExistedM3 += Number(rec.get('grMsrmt'));
							sumExistedQty += Number(rec.get('grQty'));
						}
					});
				}
			}
			//In case update status
			else if(workingStatus == 'U'){
				//Count sum MT, M3, Qty existed of SN except current GR
				store.each(function (rec) { 
					if(rec.get('gdsRecvNo') != detailItem.get('gdsRecvNo') && rec.get('shipgNoteNo') == detailItem.get('shipgNoteNo') 
							&& rec.get('grTsptTpCd') == 'SE'){			
						sumExistedMt += Number(rec.get('grWgt')); 
						sumExistedM3 += Number(rec.get('grMsrmt'));
						sumExistedQty += Number(rec.get('grQty'));
					}
				});
			}

			//Set values for Balance fields
			if (deliveryMode == 'DIRECT') {
				refs.refTxtBalWgt.setValue(Number(detailItem.get('dVslMt')) - sumExistedMt);
				refs.refTxtBalMsrmt.setValue(Number(detailItem.get('dVslM3')) - sumExistedM3);
				refs.refTxtBalQty.setValue(Number(detailItem.get('dVslQty')) - sumExistedQty);
			} else if (deliveryMode == 'INDIRECT') {
				refs.refTxtBalWgt.setValue(Number(detailItem.get('imt')) - sumExistedMt);
				refs.refTxtBalMsrmt.setValue(Number(detailItem.get('im3')) - sumExistedM3);
				refs.refTxtBalQty.setValue(Number(detailItem.get('iqty')) - sumExistedQty);
			}
		} else if (transMode == 'PL') {
			refs.refTxtBalWgt.setValue(0);
			refs.refTxtBalMsrmt.setValue(0);
			refs.refTxtBalQty.setValue(0);
		}
	},
	
	onMultiCheckChange:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('unitList');
		var theSDO = me.getViewModel().get('theMain');
		var qty = 0, wgt = 0, msrmt = 0 ;
		store.each(function(record){
			if(record.get('chkCdNm') == 1){
				wgt += Number(record.get('roroMt'));
				msrmt += Number(record.get('cbm'));
				qty +=1;
			}
		});
		theSDO.set('grQty', qty);
		theSDO.set('grWgt', wgt);
		theSDO.set('grMsrmt', msrmt);
		me.roroQty = qty;
	},
	
	onSelectWhRtsCombo:function(){
		var me = this;
		var refs = me.getReferences();
		var locIdValue = refs.ctlWarehouseCombo.getValue();
		var balWgtStr = '';
		var locationStore = me.getStore('warehouseRtsList');
		
		locationStore.each(function(rec){
			if(locIdValue == rec.get('rtsLocId')){
				balWgtStr += rec.get('balWgtWhForRts');
			}
		});
		
		if(locIdValue != null && locIdValue != ''){		
			refs.ctlBalWgtLocRTS.setValue(balWgtStr);
		}else{
			refs.ctlBalWgtLocRTS.setValue('');
		}
		refs.ctlTxtLocationRTS.setValue(locIdValue);
	},
	/**
	 * HHT METHOD END
	 * =========================================================================================================================
	 */		

	loadRSTForRORO: function() {
		var me = this;
		var refs = me.getReferences();
		var rtsUnitList = me.getStore('rtsUnitList');
		var unitList = me.getStore('unitList');
		var theMain = me.getViewModel().get('theMain');
		var warehouseRtsList = me.getStore("warehouseRtsList");
		var params = {
			vslCallId: theMain.get('vslCallId'),
			shipgNoteNo: theMain.get('shipgNoteNo')
		}
		rtsUnitList.load({
			params: params,
			callback: function(records, operation, success) {
				if(success) {
					if (records.length > 0) {
                        unitList.setData(records);
                        const locIdArr = records.map((item) =>
                            item.get("locId")
                        );
                        const uniqueLocIdArr = [...new Set(locIdArr)];

                        const whLocationArr = uniqueLocIdArr.map((locId) => {
                            let whLocation = Ext.create(
                                "MOST.model.document.GoodsReceipt"
                            );
                            whLocation.set("rtsLocId", locId);
                            whLocation.set("rtsLocNm", locId);
							let balWgtWhForRts = records
                                .filter((item) => item.get("locId") == locId)
                                .reduce(
                                    (accumulator, currentValue) =>
                                        accumulator +
                                        Number(currentValue.get("roroMt")),
                                    0
                                );
                            whLocation.set("balWgtWhForRts", balWgtWhForRts);
                            return whLocation;
                        });
                        warehouseRtsList.setData(whLocationArr); 
                    }
				}
			}
		})
	}
});