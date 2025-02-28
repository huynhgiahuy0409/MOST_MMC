Ext.define('MOST.view.billing.SsrListController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.ssrlist',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_PERIOD_DAY : 90,
	MAIN_GRID_REF_NAME: 'refSsrListGrid',
	MAIN_STORE_NAME: 'ssrListList',	
	
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
		
		var ssrStatusSt = me.getStore('ssrStatusCombo');
		var ssrTypeSt = me.getStore('ssrTypeCombo');
		var berthSt = me.getStore('berthNoCombo');
		var whIdSt = me.getStore('whIdCombo');
		
		//Detail:
		var gstTypeCombo = me.getStore('gstCombo');
		var whTaxCombo = me.getStore('wthTaxCombo');
		var invoicePrefixCombo = me.getStore('invoicePrefixCombo');
		var costCenter = me.getStore('costCenterCombo');
		me.setComboBoxWithLocalCache(CacheServiceConstants.PTNR_PAYMENT_TYPE, 'typePaymentCombo');
		
		me.setDateInDays("ctlFrmDate", -7);
		me.setDateInDays("ctlToDate", 0);
		
		ssrStatusSt.load();
		ssrTypeSt.load();
		berthSt.load();
		whIdSt.load();
		
		gstTypeCombo.load(); 
		whTaxCombo.load();
		costCenter.load(); 
		invoicePrefixCombo.load({
			callback: function(records, operation, success){
				if(success){
					invoicePrefixCombo.filterBy(function(rec) {
						if(rec.get('scd')){
							if(rec.get('scd') == 'PRF'){
								return false;
							} else {
							    return true;
							}	
						}
					});
				}
			}
		});
	},

	onChecked:function(control, newValue){
		var me = this;
		var refs = me.getReferences();
		var value = control.getValue();
		
		var headItem = me.getViewModel().getData().theHeadDetail;
		if(headItem != null && headItem != undefined){
			if(value == true){
				//Non-JPVC
				refs.ctlDetailVesselField.setEditableControl(false);
				
				headItem.set('vslCallId', '');
				headItem.set('vesselName', 'Dummy Vessel');
				headItem.set('voyage','');
				headItem.set('berthLoc','');	
				headItem.set('eta','');
				headItem.set('etd','');
				headItem.set('sa','');
			}else{
				//JPVC
				refs.ctlDetailVesselField.setEditableControl(true);
				
				headItem.set('vslCallId', '');
				headItem.set('vesselName', '');
				headItem.set('voyage', '');
				headItem.set('berthLoc', '');	
				headItem.set('eta', '');
				headItem.set('etd', '');
				headItem.set('sa', '');
			}
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
	
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore('ssrListList');
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					
				}
			}
		});
	},
	
	// Grid Row Double
	onDblclick: function() {
		var me = this;
		var grid = me.lookupReference('refSsrListGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var title = 'Special Service Request Detail';
		
		me.getView().detailViewAlias = 'app-ssrdetail';
		
		if(selection == null) {
			return;
		}
		
		selection.set("viewType", me.VIEW_TYPE_UPDATE);
		selection.set('workingStatus', 'U');
		
		me.openDetailPopup(selection, title, true);
	},
	
	onAdd: function(){
		var me = this;
		var refs = me.getReferences(); 
		var selection = Ext.create('MOST.model.billing.SsrList');
		var title = 'Special Service Request Detail';
		
		me.getView().detailViewAlias = 'app-ssrdetail';
		selection.set('workingStatus', 'C');
		
		if(refs.cltvesselCallId.getValue() !== ''){
			selection.set('vslCallId', refs.cltvesselCallId.getValue());
		}
		
		me.openDetailPopup(selection, title, true);
	},
	
	// Key Column Editable
	setGridColumnEditable:function(isCreate){
		var me = this;
		var refs = me.getReferences();

		if(isCreate){ // ADD
			refs.ctlRequester.getEditor().setEditable(true);
			refs.ctlRequester.getEditor().setDisabled(false);
		} else { // UPDATE
			refs.ctlRequester.getEditor().setEditable(false);
			refs.ctlRequester.getEditor().setDisabled(true);
		}
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'cltDetailTabHeaderPartner'){
			if(returnValue){
				refs.cltDetailTabHeaderAccNo.setValue(returnValue.item.get('accountNo'));
				refs.cltDetailTabHeaderTpPay.setValue(returnValue.item.get('payType'));
				refs.cltDetailTabHeaderPayerTpCd.setValue(returnValue.item.get('ptyDivCd'));
				refs.cltDetailTabHeaderPaymTerm.setValue(returnValue.item.get('paymTerm'));
			}else {
				refs.cltDetailTabHeaderAccNo.setValue();
				refs.cltDetailTabHeaderTpPay.setValue();
				refs.cltDetailTabHeaderPayerTpCd.setValue();
			}
		}
		
		if(targetControl === 'ctlDetailVesselField'){
			if(returnValue){
				var headItem = me.getViewModel().getData().theHeadDetail;
				
				headItem.set('vesselName',returnValue.item.data.vslNm);
				headItem.set('voyage',returnValue.item.data.voyage);
				headItem.set('berthLoc',returnValue.item.data.berthLoc);
				
				headItem.set('eta',Ext.Date.format(returnValue.item.data.eta, MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
				headItem.set('etd',Ext.Date.format(returnValue.item.data.etd, MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
				headItem.set('sa',returnValue.item.data.arrvSaNm);
				headItem.set('shp',returnValue.item.data.shipLineNm);
				
				me.getRefNoCombo(returnValue);
			}
		}else if (targetControl === 'ctlScn') {
			if (returnValue) {
				refs.ctlScn.setValue(returnValue.code);

				if (!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))) {
					refs.cltvesselCallId.setValue(returnValue.item.get('vslCallId'));
				} else {
					refs.cltvesselCallId.setValue('');
				}
			}
		}
	},
	
	getRefNoCombo: function(returnValue){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('snBlCombo');
		var vslCallId;
		
		if(returnValue.code){
			vslCallId = returnValue.code;
		}else{
			vslCallId = returnValue;
		}			
		
		store.load({
			params:{
				vslCallId : vslCallId					
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						store.insert(0, [{ cdNm: 'Select', cd: '' }]);
					}
				}
			}
		});
	},

	openPSPopup:function(){
		var me = this;
		var recv = me.getViewModel().getData().theHeadDetail;
		var recvData = {
				vslCallId: recv.data.vslCallId
			};
		
		me.loadMenuView('app-proofsheet',recvData);	
		
	},
	
	isAdministrator:function(){
		return (MOST.config.Token.getUserType() == CONSTANTS.USER_TYPE_INTERNAL);
	},
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	/**
	 * DETAIL START
	 * =========================================================================================================================
	 */
	onResetDetailData: function(){
		var me = this;
		var refs = me.getReferences();
		
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
		recvData.set('workingStatus', 'C');
		recvData.set('vslCallId', '');
		recvData.set('ssrNo', '');
		recvData.set('berthNo', '');
		recvData.set('whId', '');
		recvData.set('refNo', '');
		recvData.set('payerCd', '');
		
		recvData.set('accountNo', '');
		recvData.set('payerTpCd', '');
		recvData.set('ivPrfx', '');
		recvData.set('rmk', '');
		
		//Header
		refs.refStatus.setValue('');
	},
	
	onDetailLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var storePayer = me.getStore('payerStore');
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var infoForm = detailView.down('form').getForm();
		var objDetail = me.getViewModel().getData().theHeadDetail;
		
		infoForm.isValid();
		
		if(recvData.data.workingStatus === 'C'){
			recvData.set('ssrStatCd', 'CR');
		}
		
		if(recvData.data.ssrStatCd === 'CREATE' || recvData.data.ssrStatCd === 'Created'){
			refs.refStatus.setValue('Created');
			refs.ctlVerify.setDisabled(false);
		}
		
		if(recvData.data.ssrStatCd === 'VERIFIED' || recvData.data.ssrStatCd === 'Verified'){
			refs.refStatus.setValue('Verified');
		}
		
		if(recvData.data.ssrStatCd === 'INVOICED' || recvData.data.ssrStatCd === 'Invoiced'){
			refs.refStatus.setValue('Invoiced');
		}
		
		me.setDetailInitialize(recvData);
		me.setDataToControl(recvData);
		refs.cltDetailTabHeaderIVPrx.setValue(recvData.data.ivPrfx);
		
//		if (recvData.data.ivPrfx != null && recvData.data.ivPrfx != ''){
//			refs.cltDetailTabHeaderIVPrx.setDisabled(true);
//		};
		
		if (recvData.data.ssrStatCd == 'Invoiced' || recvData.data.ssrStatCd == 'Verified'){
			refs.cltDetailTabHeaderIVPrx.setDisabled(true);
		};
		
		recvData.commit();
	},
	
	onChangeIvPrefix:function(me, newValue){
		var me = this;
		var refs= me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
		//Temporary for creating IV of Credit as well
		refs.ctlCreateIv.setDisabled(false);
		
		if(recvData.data.ssrStatCd == 'Invoiced' || recvData.data.ssrStatCd == 'Verified') {
			refs.cltDetailTabHeaderIVPrx.setDisabled(true);
		}
	},
	
	onChangePayTp:function(me, newValue){
		var me = this;
		var refs= me.getReferences();
		var invoicePrefixCombo = me.getStore('invoicePrefixCombo');
		
		invoicePrefixCombo.load();
		
		if(newValue === 'M'){
			refs.cltDetailTabHeaderIVPrx.setValue('XMS');
			refs.cltDetailTabHeaderIVPrx.setDisabled(true);
		}else{
			indexXMS = invoicePrefixCombo.findExact('scd', 'XMS');
			invoicePrefixCombo.removeAt(indexXMS);
			refs.cltDetailTabHeaderIVPrx.setDisabled(false);
		}
	},
	
	onChangeSSRTp: function(me, newValue){
		var me = this;
		var refs = me.getReferences();
		var SSRTpStore = me.getStore('tariffCombo');
		
		refs.cltTabDetailCostCenter.setValue('');
		refs.ctlTabDetailSubTrf.setValue('');
		refs.ctlTabDetailTrfRate.setValue('');
		refs.cltTabDetailGstType.setValue('');
		refs.ctlTabDetailTrfDesc.setValue('');
		refs.ctlTabDetailGstValue.setValue('');
		refs.ctlTabDetailQtyU1.setValue('');
		refs.ctlTabDetailQtyU2.setValue('');
		refs.ctlTabDetailQtyU3.setValue('');
		refs.ctlTabDetailQtyU1.setDisabled(true);
		refs.ctlTabDetailQtyU2.setDisabled(true);
		refs.ctlTabDetailQtyU3.setDisabled(true);
		
		SSRTpStore.load({
			params: {
				ssrTpCd: newValue,
				ptnrCd: refs.cltDetailTabHeaderPartner.getValue(),
				issuedDate: refs.cltDetailTabHeaderIssueDate.getValue(),
			},
			callback: function(records, eOp, success){
				if(success){
					
				}
			}
		});
	},
	
	onChangeCost: function( combo, record, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		refs.ctlTabDetailFinancialCode.setValue(record.get('codeFinancial'));
	},
	
	onChangeTariff: function(me, newValue){
		var me = this;
		var refs = me.getReferences();
		var SSRTpStore = me.getStore('tariffCombo');
		var selectedItem = refs.cltTabDetailTrfCombo.getSelection();
		
		if(selectedItem != null){
			refs.ctlTabDetailQtyU1.setDisabled(true);
			refs.ctlTabDetailQtyU2.setDisabled(true);
			refs.ctlTabDetailQtyU3.setDisabled(true);
			refs.ctlLblTabDetailUnit1.setText('Unit1');
			refs.ctlLblTabDetailUnit2.setText('Unit2');
			refs.ctlLblTabDetailUnit3.setText('Unit3');
			
			if(selectedItem.data.ivUnit1 != null && selectedItem.data.ivUnit1 != ''){
				refs.ctlTabDetailQtyU1.setDisabled(selectedItem.data.ivUnit1 == '' ? true : false);
				refs.ctlTabDetailQtyU1.setEditable(true);
				refs.ctlLblTabDetailUnit1.setText(selectedItem.data.ivUnit1);
			}
			
			if(selectedItem.data.ivUnit2 != null && selectedItem.data.ivUnit2 != ''){
				refs.ctlTabDetailQtyU2.setDisabled(selectedItem.data.ivUnit1 == '' ? true : false);
				refs.ctlTabDetailQtyU2.setEditable(true);
				refs.ctlLblTabDetailUnit2.setText(selectedItem.data.ivUnit2);
			}
			
			if(selectedItem.data.ivUnit3 != null && selectedItem.data.ivUnit3 != ''){
				refs.ctlTabDetailQtyU3.setDisabled(selectedItem.data.ivUnit1 == '' ? true : false);
				refs.ctlTabDetailQtyU3.setEditable(true);
				refs.ctlLblTabDetailUnit3.setText(selectedItem.data.ivUnit3);
			}
		}
	},
	
	onSelectTariff: function(me, newValue){
		var me = this;
		var refs = me.getReferences();
		var selectedItem = refs.cltTabDetailTrfCombo.getSelection();
		var detailItem = me.getViewModel().get('theDetail');
		
		if(selectedItem != null){
			refs.cltTabDetailCostCenter.setValue(selectedItem.data.costCenter);
			refs.ctlTabDetailFinancialCode.setValue(selectedItem.get('financialCode'));
			refs.ctlTabDetailSubTrf.setValue(selectedItem.data.subTrfCd);
			refs.ctlTabDetailTrfRate.setValue(selectedItem.data.trfRate);
//			refs.cltTabDetailGstType.value  = selectedItem.data.gstDesc;
			refs.ctlTabDetailTrfDesc.setValue(selectedItem.data.trfName);
			refs.ctlTabDetailGstValue.setValue(selectedItem.data.gstRate);
			refs.ctlTabDetailWHTaxValue.setValue(selectedItem.data.wthTaxValue);
			refs.ctlTabDetailApRate.setValue(selectedItem.data.appliedRate);
			refs.ctlTabDetailQtyU1.setValue('');
			refs.ctlTabDetailQtyU2.setValue('');
			refs.ctlTabDetailQtyU3.setValue('');
			refs.ctlTabDetailQtyU1.setDisabled(true);
			refs.ctlTabDetailQtyU2.setDisabled(true);
			refs.ctlTabDetailQtyU3.setDisabled(true);
			refs.ctlLblTabDetailUnit1.setText('Unit1');
			refs.ctlLblTabDetailUnit2.setText('Unit2');
			refs.ctlLblTabDetailUnit3.setText('Unit3');
			refs.ctlTabDetailTTQty.setValue('0');

			detailItem.set('gstTpCd',selectedItem.data.gstTpCd);
			detailItem.set('gstRate',selectedItem.data.gstRate);
			detailItem.set('wthTaxTpCd',selectedItem.data.wthTaxTpCd);
			
			if(selectedItem.data.ivUnit1 != null){
				refs.ctlTabDetailQtyU1.setDisabled(selectedItem.data.ivUnit1 == '' ? true : false);
				refs.ctlTabDetailQtyU1.setEditable(true);
				refs.ctlLblTabDetailUnit1.setText(selectedItem.data.ivUnit1);
			}
			
			if(selectedItem.data.ivUnit2 != null){
				refs.ctlTabDetailQtyU2.setDisabled(selectedItem.data.ivUnit2 == '' ? true : false);
				refs.ctlTabDetailQtyU2.setEditable(true);
				refs.ctlLblTabDetailUnit2.setText(selectedItem.data.ivUnit2);
			}
			
			if(selectedItem.data.ivUnit3 != null){
				refs.ctlTabDetailQtyU3.setDisabled(selectedItem.data.ivUnit3 == '' ? true : false);
				refs.ctlTabDetailQtyU3.setEditable(true);
				refs.ctlLblTabDetailUnit3.setText(selectedItem.data.ivUnit3);
			}
		}
	},
	
	onChangeText: function(me,e){
		var m = this;
		var refs = m.getReferences();
		var valueNb = 0 ;
		
		if (refs.ctlTabDetailQtyU1.getValue()) {
    		if (valueNb == 0){
    			valueNb = 1;
    		}
    		
    		valueNb *= Number(refs.ctlTabDetailQtyU1.getValue());
    	}
		
    	if (refs.ctlTabDetailQtyU2.getValue()) {
    		if (valueNb == 0){
    			valueNb = 1;
    		}
    		
    		valueNb *= Number(refs.ctlTabDetailQtyU2.getValue());
    	}
    	
    	if (refs.ctlTabDetailQtyU3.getValue()) {
    		if (valueNb == 0){
    			valueNb = 1;
    		}
    		
    		valueNb *= Number(refs.ctlTabDetailQtyU3.getValue());
    	}
    	
    	valueNb = valueNb.toFixed(3);
		valueTT = valueNb.toString();
		
		refs.ctlTabDetailTTQty.setValue(valueTT);
		
		var disRate = refs.ctlTabDetailDissurRate.getValue();
		var rate = refs.ctlTabDetailApRate.getValue();
		var disAmount = 0;
		
		if(disRate != null && disRate != '' && rate != null && rate != ''){
			disAmount = (parseFloat(valueTT) * parseFloat(rate)) * (parseFloat(disRate) / Ext.Number.parseFloat(100));
			disAmount = disAmount.toFixed(3);
			disAmount = disAmount.toString();
			
			refs.ctlTabDetailDiscurAmt.setValue(disAmount);
		}
	},
	
	onChangeFocus:function(control, ev, eOpts){
		var me = this;
		var refs = me.getReferences();
		var valueTT = refs.ctlTabDetailTTQty.getValue();
		var valueNb = Ext.Number.parseFloat(valueTT);
		
		if(control){
			valueNb /= Ext.Number.parseFloat(control.getValue());
			valueNb = valueNb.toFixed(3);
			valueTT = valueNb.toString();
			refs.ctlTabDetailTTQty.setValue(valueTT);
			
			if(control.getValue() == '0'){
				refs.ctlTabDetailTTQty.setValue(valueTT);
			}
		}else{
			refs.ctlTabDetailTTQty.setValue(valueTT);
		}
	},
	
	onClearTabDeatil:function(){
		var me = this; 
		var refs = me.getReferences();
		var grid = me.lookupReference('refSsrDetailTabDetailGrid');
	
		refs.cltDetailTabDetailSsrType.setValue('');
		refs.cltTabDetailCostCenter.setValue('');
		refs.cltTabDetailTrfCombo.setValue('');
		refs.ctlTabDetailSubTrf.setValue('');
		refs.ctlTabDetailTrfRate.setValue('');
		refs.cltTabDetailGstType.setValue('');
		refs.cltTabDetailWTHType.setValue('');
		refs.ctlTabDetailWHTaxValue.setValue('');
		refs.ctlTabDetailTrfDesc.setValue('');
		refs.ctlTabDetailGstValue.setValue('');
		refs.ctlTabDetailQtyU1.setValue('');
		refs.ctlTabDetailQtyU2.setValue('');
		refs.ctlTabDetailQtyU3.setValue('');
		refs.ctlTabDetailDissurRate.setValue('');
		refs.ctlTabDetailDiscurAmt.setValue('');
		refs.ctlTabDetailFinancialCode.setValue('');
		refs.ctlTabDetailQtyU1.setDisabled(true);
		refs.ctlTabDetailQtyU2.setDisabled(true);
		refs.ctlTabDetailQtyU3.setDisabled(true);
		refs.ctlLblTabDetailUnit1.setText('Unit1');
		refs.ctlLblTabDetailUnit2.setText('Unit2');
		refs.ctlLblTabDetailUnit3.setText('Unit3');
		refs.ctlTabDetailTTQty.setValue('');
		refs.ctlTabDetailApRate.setValue('');
		refs.ctlTabDetailAmount.setValue('');
		refs.cltDetailTabDetailSsrType.setDisabled(false);
		grid.getSelectionModel().clearSelections();
	},
	
	onChangeUnit:function(control, newVal, oldVal){
		var me = this;
		var refs = me.getReferences();
		var valueTT = refs.ctlTabDetailTTQty.getValue();
		var valueNb = 1;
	
		if(valueTT == null){
			valueTT = ''
		}else{
			if(valueTT === ''){
				valueNb *= Ext.Number.parseFloat(newVal);
			}else{
				if(valueTT === '0') {
					valueNb = 1;
				} else {
					valueNb = Ext.Number.parseFloat(valueTT);
				}

				valueNb *= Ext.Number.parseFloat(newVal);
				valueNb /= Ext.Number.parseFloat(oldVal);
			}
			
			valueTT = valueNb.toString();
		}
		
		refs.ctlTabDetailTTQty.setValue(valueTT);
	},
	
	onChangeRate: function(me, e){
		var m = this;
		var refs = m.getReferences();
		var valueTT = refs.ctlTabDetailTTQty.getValue();
		var valueRate = refs.ctlTabDetailApRate.getValue();
		var valueNmb = 1;
		
		if(valueTT !== ''){
			if(me.getValue() === ''){
				valueNmb *= Ext.Number.parseFloat(valueTT);
			}else{
				valueNmb = Ext.Number.parseFloat(valueTT) * Ext.Number.parseFloat(valueRate);;
			}
			
			if(refs.ctlTabDetailDissurRate.getValue() != null && refs.ctlTabDetailDissurRate.getValue() != ''){
				var disRate = refs.ctlTabDetailDissurRate.getValue();
				var disAmt = 1;
				
				disAmt = valueNmb * (Ext.Number.parseFloat(disRate)/100);
				disAmt = disAmt.toFixed(3);
				
				refs.ctlTabDetailDiscurAmt.setValue(disAmt.toString());
			}

			valueNmb = valueNmb.toFixed(3);
			refs.ctlTabDetailAmount.setValue(valueNmb.toString());
		}
	},
	
	onChangeDisRate: function(me, e){
		var m = this;
		var refs = m.getReferences();
		var amount = refs.ctlTabDetailAmount.getValue();
		var disRate = refs.ctlTabDetailDissurRate.getValue();
		var valueNmb = 1;
		
		if(amount !== '' && amount > 0){
			if(me.getValue() === ''){
				valueNmb *= Ext.Number.parseFloat(amount);
			}else{
				valueNmb = Ext.Number.parseFloat(amount) * (Ext.Number.parseFloat(disRate)/100);
			}
			
			valueNmb = valueNmb.toFixed(3);
			refs.ctlTabDetailDiscurAmt.setValue(valueNmb);
		}else{
			valueNmb = 0.000;
			refs.ctlTabDetailDiscurAmt.setValue(valueNmb.toString());
		}
	},
	
	onChangeTTQty: function(me, e){
		var m = this;
		var refs = m.getReferences();
		var valueTT = refs.ctlTabDetailTTQty.getValue();
		var valueRate = refs.ctlTabDetailApRate.getValue();
		var result = Ext.Number.parseFloat(valueTT) * Ext.Number.parseFloat(valueRate);
		
		result = result.toFixed(3);
		refs.ctlTabDetailAmount.setValue(result.toString());
	},
	
	onClickDetail:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refSsrDetailTabDetailGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var ttqty = 1;
		var ssrTypeCombo = me.getStore('ssrTypeCombo');
		var tariffCombo = me.getStore('tariffCombo');
		
		if(selection == null) {
			return;
		}
		
		refs.ctlTabDetailQtyU1.setDisabled(true);
		refs.ctlTabDetailQtyU2.setDisabled(true);
		refs.ctlTabDetailQtyU3.setDisabled(true);
		refs.cltDetailTabDetailSsrType.setDisabled(true);
		refs.cltDetailTabDetailSsrType.setValue(selection.data.ssrTpCd);
		refs.cltTabDetailCostCenter.setValue(selection.data.costCenter);
		refs.ctlTabDetailFinancialCode.setValue(selection.data.financialCode);
		refs.cltTabDetailTrfCombo.setValue(selection.data.subTrfCd);
		refs.ctlTabDetailSubTrf.setValue(selection.data.subTrfCd);
		refs.ctlTabDetailTrfRate.setValue(selection.data.stdRate);
		refs.cltTabDetailGstType.setValue(selection.data.gstTpCd);
		refs.ctlTabDetailTrfDesc.setValue(selection.data.trfDescr);
		refs.ctlTabDetailGstValue.setValue(selection.data.gstValue);
		refs.ctlTabDetailDissurRate.setValue(selection.data.disSurRate);
		refs.ctlTabDetailDiscurAmt.setValue(selection.data.disSurAmount);
		refs.ctlTabDetailWHTaxValue.setValue(selection.data.wthValue);
		refs.ctlLblTabDetailUnit1.setText(selection.data.ivUnit1);
		refs.ctlLblTabDetailUnit2.setText(selection.data.ivUnit2);
		refs.ctlLblTabDetailUnit3.setText(selection.data.ivUnit3);
		
		if(Number(selection.data.unitQty1) !== 0){
			refs.ctlTabDetailQtyU1.setValue(selection.data.unitQty1);
			refs.ctlTabDetailQtyU1.setDisabled(false);
			ttqty *= Ext.Number.parseFloat(selection.data.unitQty1);
		}
		
		if(Number(selection.data.unitQty2) !== 0){
			refs.ctlTabDetailQtyU2.setDisabled(false);
			refs.ctlTabDetailQtyU2.setValue(selection.data.unitQty2);
			ttqty *= Ext.Number.parseFloat(selection.data.unitQty2);
		}
		
		if(Number(selection.data.unitQty3) !== 0){
			refs.ctlTabDetailQtyU3.setDisabled(false);
			refs.ctlTabDetailQtyU3.setValue(selection.data.unitQty3);
			ttqty *= Ext.Number.parseFloat(selection.data.unitQty3);
		}
		
		refs.ctlTabDetailApRate.setValue(selection.data.aplyUnitPrc);
		refs.ctlTabDetailTTQty.setValue(ttqty.toString());
	},
	
	onUpdateDetaiGrid: function(){
		var me = this;
		var refs = me.getReferences();
		var theDetail = me.getViewModel().get('theDetail');
		var ssrTp = refs.cltDetailTabDetailSsrType.getValue();
		var costCenter = refs.cltTabDetailCostCenter.getValue();
		var trfCd = refs.cltTabDetailTrfCombo.getSelection().get('trfCd');
		var subTrfCd = refs.ctlTabDetailSubTrf.getValue();
		var stdRate = refs.ctlTabDetailTrfRate.getValue();
		var gstTpCd = refs.cltTabDetailGstType.getValue();
		var trfDescr = refs.ctlTabDetailTrfDesc.getValue();
		var gstValue = refs.ctlTabDetailGstValue.getValue();
		var wthTaxValue = refs.ctlTabDetailWHTaxValue.getValue();
		var unitQty1 = refs.ctlTabDetailQtyU1.getValue();
		var unitQty2 = refs.ctlTabDetailQtyU2.getValue();
		var unitQty3 = refs.ctlTabDetailQtyU3.getValue();
		var aplyUnitPrc = refs.ctlTabDetailApRate.getValue();
		var totalQty = refs.ctlTabDetailTTQty.getValue();
		var amount = refs.ctlTabDetailAmount.getValue();
		var dissurRate = refs.ctlTabDetailDissurRate.getValue();
		var dissurAmt = refs.ctlTabDetailDiscurAmt.getValue();
		var taxAmt = 0.000;
		var wthAmt = 0.000;
		var totalAmt = 0.000;
		var payableAmount = 0.000;
		
		if(StringUtil.isNullorEmpty(ssrTp)){
 			MessageUtil.info('info_msg','SSRTypeNoneMsg');
			return;
 		}
		
		if(StringUtil.isNullorEmpty(trfCd)){
 			MessageUtil.info('info_msg','SSRTariffMsg');
			return;
 		}
		
		if(!aplyUnitPrc){
 			MessageUtil.info('info_msg','SSRAplRateNoneMsg');
			return;
 		}
		
		if(!refs.ctlTabDetailQtyU1.disabled){
			if(refs.ctlLblTabDetailUnit1.text !== 'Unit1'){
				if(!unitQty1){
		 			MessageUtil.info('info_msg','SSRAplUnit1NoneMsg');
					return;
		 		}
			}
		}
		
		if(!refs.ctlTabDetailQtyU2.disabled){
			if(refs.ctlLblTabDetailUnit2.text !== 'Unit2'){
				if(!unitQty2){
		 			MessageUtil.info('info_msg','SSRAplUnit2NoneMsg');
					return;
		 		}
			}
		}
		
		if(!refs.ctlTabDetailQtyU3.disabled){
			if(refs.ctlLblTabDetailUnit3.text !== 'Unit3'){
				if(!unitQty3){
		 			MessageUtil.info('info_msg','SSRAplUnit3NoneMsg');
					return;
		 		}
			}
		}
		
		var grid = me.lookupReference('refSsrDetailTabDetailGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) {
			return;
		}
		
		if(dissurAmt != null && dissurAmt != ''){
			totalAmt = parseFloat(amount) + parseFloat(dissurAmt);
			amount = parseFloat(amount) + parseFloat(dissurAmt);
		}else{
			totalAmt = parseFloat(amount);
			amount = parseFloat(amount);
		}
		
		if(gstValue != null && gstValue != ''){
			taxAmt = Math.round((parseFloat(amount) * (parseFloat(gstValue)/parseFloat(100)))*1000)/1000;
		}
		if(wthTaxValue != null && wthTaxValue != ''){
			wthAmt = -parseFloat(amount) * (parseFloat(wthTaxValue)/parseFloat(100));
		}
		
		payableAmount = Math.round((totalAmt + taxAmt + wthAmt)*1000)/1000;
		
		var exclAmount = refs.ctlLblTabDetailAmtTTExclValue.text;
		var inclAmount = refs.ctlLblTabDetailAmtTTIn.text;
		
		if(exclAmount != ''){
			exclAmount = (Ext.Number.parseFloat(exclAmount) - Ext.Number.parseFloat(selection.get('totalAmount')) + Ext.Number.parseFloat(totalAmt)).toString();
			inclAmount = (Ext.Number.parseFloat(inclAmount) - Ext.Number.parseFloat(selection.get('payableAmount')) + Ext.Number.parseFloat(payableAmount)).toString();
		}
		
		selection.set('ssrTpCd', ssrTp);
		selection.set('costCenter', costCenter);
		selection.set('financialCode', refs.ctlTabDetailFinancialCode.getValue());
		selection.set('trfCd', trfCd);
		selection.set('subTrfCd', subTrfCd);
		selection.set('stdRate', stdRate);
		selection.set('gstTpCd', gstTpCd);
		selection.set('trfDescr', trfDescr);
		selection.set('disSurRate', dissurRate);
		selection.set('disSurAmount', dissurAmt);
		selection.set('gstValue', gstValue);
		selection.set('gstAmount', taxAmt);
		selection.set('wthValue', wthTaxValue);
		selection.set('wthAmount', wthAmt);
		unitQty1 = unitQty1 == ''?'0':unitQty1;
		unitQty2 = unitQty2 == ''?'0':unitQty2;
		unitQty3 = unitQty3 == ''?'0':unitQty3;
		selection.set('unitQty1', unitQty1);
		selection.set('unitQty2', unitQty2);
		selection.set('unitQty3', unitQty3);
		selection.set('aplyUnitPrc', aplyUnitPrc);
		selection.set('amount', totalQty);
		selection.set('payableAmount', payableAmount.toString());
		selection.set('totalAmount', totalAmt.toString());
		
		if(selection.get('workingStatus') == WorkingStatus.INSERT){
			selection.set('crud', WorkingStatus.INSERT);
			selection.set('workingStatus', WorkingStatus.INSERT);
		} else {
			selection.set('crud', WorkingStatus.UPDATE);
			selection.set('workingStatus', WorkingStatus.UPDATE);
		}
//		selection.set('ssrStatCd', 'VF');

		refs.ctlLblTabDetailAmtTTExclValue.setText(exclAmount);
		refs.ctlLblTabDetailAmtTTIn.setText(inclAmount);

		me.onClearTabDeatil();
	},
	
	onAddToGrid: function(){
		var me =  this;
		var refs = me.getReferences();
		var ssrTp = refs.cltDetailTabDetailSsrType.getValue();
		var costCenter = refs.cltTabDetailCostCenter.getValue();
		var trfCd = refs.cltTabDetailTrfCombo.getSelection().get('trfCd');
		var subTrfCd = refs.ctlTabDetailSubTrf.getValue();
		var stdRate = refs.ctlTabDetailTrfRate.getValue();
		var gstTpCd = refs.cltTabDetailGstType.getValue();
		var trfDescr = refs.ctlTabDetailTrfDesc.getValue();
		var gstValue = refs.ctlTabDetailGstValue.getValue();
		var wthTaxValue = refs.ctlTabDetailWHTaxValue.getValue();
		var unitQty1 = refs.ctlTabDetailQtyU1.getValue();
		var unitQty2 = refs.ctlTabDetailQtyU2.getValue();
		var unitQty3 = refs.ctlTabDetailQtyU3.getValue();
		var aplyUnitPrc = refs.ctlTabDetailApRate.getValue();
		var totalQty = refs.ctlTabDetailTTQty.getValue();
		var amount = refs.ctlTabDetailAmount.getValue();
		var dissurRate = refs.ctlTabDetailDissurRate.getValue();
		var dissurAmt = refs.ctlTabDetailDiscurAmt.getValue();
		var detailItem = Ext.create('MOST.model.billing.SsrList');
        var taxAmt = 0.000;
		var wthAmt = 0.000;
		var totalAmt = 0.000;
		var payableAmount = 0.000;
		var ivUnit1 = refs.ctlLblTabDetailUnit1.text;
		var ivUnit2 = refs.ctlLblTabDetailUnit2.text;
		var ivUnit3 = refs.ctlLblTabDetailUnit3.text;
		
		if(StringUtil.isNullorEmpty(ssrTp)){
 			MessageUtil.info('info_msg','SSRTypeNoneMsg');
			return;
 		}
		
		//removed by Leslie(2022.10.05) - Mantis 0133306
//		if(StringUtil.isNullorEmpty(costCenter)){
// 			MessageUtil.info('info_msg','SSRCostCenterNoneMsg');
//			return;
// 		}
		
		if(StringUtil.isNullorEmpty(trfCd)){
 			MessageUtil.info('info_msg','SSRTariffMsg');
			return;
 		}
		
		if(!aplyUnitPrc){
 			MessageUtil.info('info_msg','SSRAplRateNoneMsg');
			return;
 		}
		
		if(!refs.ctlTabDetailQtyU1.disabled){
			if(refs.ctlLblTabDetailUnit1.text !== 'Unit1'){
				if(!unitQty1){
					MessageUtil.info('info_msg','SSRAplUnit1NoneMsg');
					return;
				}
			}
		}
		
		if(!refs.ctlTabDetailQtyU2.disabled){
			if(refs.ctlLblTabDetailUnit2.text !== 'Unit2'){
				if(!unitQty2){
					MessageUtil.info('info_msg','SSRAplUnit2NoneMsg');
					return;
				}
			}
		}
		
		if(!refs.ctlTabDetailQtyU3.disabled){
			if(refs.ctlLblTabDetailUnit3.text !== 'Unit3'){
				if(!unitQty3){
		 			MessageUtil.info('info_msg','SSRAplUnit3NoneMsg');
					return;
		 		}
			}
		}
		
		if(dissurAmt != null && dissurAmt != ''){
			totalAmt = parseFloat(amount) + parseFloat(dissurAmt);
			amount = parseFloat(amount) + parseFloat(dissurAmt);
		}else{
			totalAmt = parseFloat(amount);
			amount = parseFloat(amount);
		}
		
		if(gstValue != null && gstValue != ''){
			taxAmt = parseFloat(amount) * (parseFloat(gstValue)/parseFloat(100));
			taxAmt = parseFloat(taxAmt.toFixed(2));
			detailItem.set('gstAmount', taxAmt.toString());
		}
		
		if(wthTaxValue != null && wthTaxValue != ''){
			wthAmt = -parseFloat(amount) * (parseFloat(wthTaxValue)/parseFloat(100));
			wthAmt = parseFloat(wthAmt.toFixed(2));
			detailItem.set('wthAmount', wthAmt.toString());
		}
		
		payableAmount = totalAmt + taxAmt + wthAmt;
		detailItem.set('ssrTpCd', ssrTp);
		detailItem.set('costCenter', costCenter);
		detailItem.set('financialCode', refs.ctlTabDetailFinancialCode.getValue());
		detailItem.set('trfCd', trfCd);
		detailItem.set('subTrfCd', subTrfCd);
		detailItem.set('stdRate', stdRate);
		detailItem.set('gstTpCd', gstTpCd);
		detailItem.set('trfDescr', trfDescr);
		detailItem.set('disSurRate', dissurRate);
		detailItem.set('disSurAmount', dissurAmt);
		detailItem.set('gstValue', gstValue);
		detailItem.set('wthValue', wthTaxValue);
		unitQty1 = unitQty1 == ''?'0':unitQty1;
		unitQty2 = unitQty2 == ''?'0':unitQty2;
		unitQty3 = unitQty3 == ''?'0':unitQty3;
		
		detailItem.set('unitQty1', unitQty1);
		detailItem.set('unitQty2', unitQty2);
		detailItem.set('unitQty3', unitQty3);
		detailItem.set('ivUnit1', ivUnit1);
		detailItem.set('ivUnit2', ivUnit2);
		detailItem.set('ivUnit3', ivUnit3);
		detailItem.set('aplyUnitPrc', aplyUnitPrc);
		detailItem.set('amount', totalQty);
		detailItem.set('payableAmount', payableAmount.toString());
		detailItem.set('totalAmount', totalAmt.toString());
		detailItem.set('workingStatus', 'C');
		detailItem.set('ssrStatCd', 'CR');
		
		var storeGrid = me.getStore('ssrDetailGrid');
		var exclAmount = refs.ctlLblTabDetailAmtTTExclValue.text;
		var inclAmount = refs.ctlLblTabDetailAmtTTIn.text;
		var check = true;
		
//		storeGrid.data.items.forEach(function(record, index, array){
//			if(record.data.trfCd == detailItem.get('trfCd') && record.data.subTrfCd == detailItem.get('subTrfCd')){
//				check = false;
//				MessageUtil.warning('warning_msg', 'This Tariff Code is duplicated.');
//				return;
//			}
//		});
		
		if(check){
			//sMantis: 0167048
			if(exclAmount != ''){
				exclAmount = (Ext.Number.parseFloat(exclAmount) + totalAmt).toFixed(2).toString();
				inclAmount = (Ext.Number.parseFloat(inclAmount) + payableAmount).toFixed(2).toString();
			}else{
				exclAmount = totalAmt.toFixed(2).toString();
				inclAmount = payableAmount.toFixed(2).toString();
			}
			//sMantis: 0167048
			refs.ctlLblTabDetailAmtTTExclValue.setText(exclAmount);
			refs.ctlLblTabDetailAmtTTIn.setText(inclAmount);
			
			storeGrid.add(detailItem);
			me.onClearTabDeatil();
		}
	},
	
	onCreateIv: function(){
		var me = this;
		var refs = me.getReferences();
		
		if(refs.refStatus.getValue() !== 'Verified'){
			MessageUtil.info('info_msg','ssrMsgVerifyFirst');
			return;
		}
		
		if(refs.cltDetailTabHeaderSSRNo.getValue() == ''){
			MessageUtil.info('info_msg','ssrMsgSavingFirst_BL01201005');
			return;
		}
		
		var objDetail = me.getViewModel().getData().theHeadDetail;
		var storeDetail = me.getStore('ssrDetailGrid');
		var dataDetail = storeDetail.data.items;
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var ivList = Ext.create('MOST.model.billing.InvoiceList');
		var issueDt = refs.cltDetailTabHeaderIssueDate.getValue();
		var dateString = issueDt==null?null:Ext.Date.format(issueDt, MOST.config.Locale.getShortDate());
		var arrIv = new Array();
		
		objDetail.set('issueDt', dateString);
		objDetail.set('userId', MOST.config.Token.getUserId());
		objDetail.set('workingStatus', 'U');
		
		Ext.Array.forEach(dataDetail, function(item){
			var ivItem = Ext.create('MOST.model.billing.InvoiceList');
			var gatherNo = item.data.gatherNo;
			
			item.data.cType = CodeConstants.MT_IVSTAT_IV;
			
			me.GenerateIvData(objDetail.data, item.data, ivItem);
			ivItem.set('gatherNo', gatherNo);
			arrIv.push(ivItem.data);
		});
		
		ivList.set('invoiceList', arrIv);
		
		MessageUtil.question("Confirm", "ssrMsgCreateIv_BL01410",null,
				function(button){
					if (button === 'ok') {
						var prx = ivList.getProxy();
						
						prx.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/ssrlist/invoice';
						
						ivList.save({
							success: function(record){
								objDetail.set('ivNo', record.data.ivNo);
								objDetail.set('ssrStatCd', CodeConstants.MT_IVSTAT_IV);
								objDetail.set('ivDt', objDetail.issueDt);
								objDetail.set('ivDueDt', objDetail.issueDt);
								
								objDetail.phantom = false;
								
								var proxy = objDetail.getProxy();
								proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/ssrlist/detaillist';
								
								objDetail.save();
								refs.refStatus.setValue('Invoiced');
								recvData.set('ssrStatCd', "Invoiced");
								
								me.onSearch();
								me.onDetailLoad();
								MessageUtil.saveSuccess();
							}
						});
					}
			});
	},
	
	onDeleteDetail:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refSsrDetailTabDetailGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var store = me.getStore('ssrDetailGrid');
		
		var payableAmountWithTax = selection.data.payableAmount;
		var payableAmountNoTax = selection.data.totalAmount;
		
		var tmpAmountNoTax = refs.ctlLblTabDetailAmtTTExclValue.text;
		var tmpAmountWithTax = refs.ctlLblTabDetailAmtTTIn.text;
		
		var ttAmountWithTax = '';
		var ttAmountNoTax = '';
		
		if(tmpAmountWithTax != '' && tmpAmountNoTax != ''){
			ttAmountWithTax = (Ext.Number.parseFloat(tmpAmountWithTax) - Ext.Number.parseFloat(payableAmountWithTax)).toString();
			ttAmountNoTax = (Ext.Number.parseFloat(tmpAmountNoTax) - Ext.Number.parseFloat(payableAmountNoTax)).toString();
		}else{
			ttAmountWithTax = '';
			ttAmountNoTax = ''
		}
		
		refs.ctlLblTabDetailAmtTTExclValue.setText(ttAmountNoTax);
		refs.ctlLblTabDetailAmtTTIn.setText(ttAmountWithTax);
		
		store.remove(selection);
		
		selection.set('crud', 'D');
		selection.set('workingStatus', 'D');
	},
	/**
	 * DETAIL END
	 * =========================================================================================================================
	 */
	
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */	
	//Search Authority
	getPatnerType: function(){
		var me = this;
		var userType = MOST.config.Token.getUserType();
		var ptnrType = MOST.config.Token.getPtnrType();
		var authCd;
		
		if(userType == CONSTANTS.USER_TYPE_EXTERNAL){
			if(me.existsPatnerType(CodeConstants.CM_PTNRTP_SHA) || (me.existsPatnerType(CodeConstants.CM_PTNRTP_SHA) && me.existsPatnerType(me.FORWARDER))){
				if(me.existsPatnerType(CodeConstants.CM_PTNRTP_SHA) && me.existsPatnerType(me.FORWARDER)){
					authCd = "BH";
				}else if(me.existsPatnerType(CodeConstants.CM_PTNRTP_SHA)){
					authCd = CodeConstants.MT_PTNRTP_SHA;
				}
			}else if(me.existsPatnerType(me.FORWARDER)){
				authCd = CodeConstants.MT_PTNRTP_FWD;
			}else if(me.existsPatnerType(CodeConstants.CM_PTNRTP_CNS)){
				authCd = CodeConstants.MT_PTNRTP_CNS;
			}
		}else if(userType == CONSTANTS.USER_TYPE_INTERNAL){
			authCd="CSC";
		}
		
		return authCd;
	},
	
	onChangeDateMain:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		
		var toDate = refs.ctlToDate.getValue();
		var fromDate = refs.ctlFrmDate.getValue();
        
        var Difference_In_Time = null; 
        var Difference_In_Days = null; 
        
        if(control === refs.ctlFrmDate){
        	Difference_In_Time = toDate.getTime() - control.getValue().getTime();
        	Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)-1; 
        	
        	if (Difference_In_Days > 89){
        		me.setDateInDaysByDate('ctlToDate', me.MAX_PERIOD_DAY, control.getValue());
        	}
		}else {
			Difference_In_Time = control.getValue().getTime() - fromDate.getTime();
			Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)-1;
			
			if (Difference_In_Days > 89){
				me.setDateInDaysByDate('ctlFrmDate', -me.MAX_PERIOD_DAY, control.getValue());
			}
		}
	},
	
	// Search Condition
	getSearchCondition : function(){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
     	var refs = me.getReferences();
     	var vslCallId = refs.cltvesselCallId.getValue();
     	var scn = refs.ctlScn.getValue();
     	var partner = refs.ctlPartner.getValue();
     	var wh = refs.cltWhId.getValue();
     	var statCd = refs.cltStatus.getValue();
     	var berth = refs.cltBerthNo.getValue();
     	var userId = MOST.config.Token.getUserId();
     	var dateCondition = me.checkPeriodDate("ctlFrmDate", "ctlToDate", me.MAX_PERIOD_DAY, true);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
     	
     	if(dateCondition == null){
    		return null;
    	}
     	
     	var params = {
         		vslCallId: vslCallId,
         		scn: scn,
         		payerCd: partner,
         		ssrStatCd: statCd,
         		berthNo: berth,
         		whId: wh,
         		dateFrom: dateCondition.fromDtString,
         		dateTo: dateCondition.toDtString,
         		ssrType: refs.cltSsrType.getValue(),
         		startRow: 1,
         		endRow: 1000,
         		userId: userId,
				pageNo: pageNo,
				sizePerPage: sizePerPage
    		};
     	
    	return params;
	},
	
	
	setDetailInitialize: function(recvData){
		var me = this;
		var refs = me.getReferences();
		var payerStyle = refs.cltDetailTabHeaderPartner;
	
		if(recvData.data.ssrStatCd === "Invoiced" || recvData.data.ssrStatCd === "Verified"){
			refs.ctlCreateIv.setDisabled(true);
			refs.cltDetailTabHeaderIssueDate.setDisabled(true);
			refs.cltDetailTabHeaderDueDate.setDisabled(true);
			refs.cltDetailTabHeaderBerthNo.setDisabled(true);
			refs.cltDetailTabHeaderWhId.setDisabled(true);
			refs.cltDetailTabHeaderRefNo.setDisabled(true);
			refs.cltDetailTabHeaderPartner.setDisabled(true);
			refs.cltDetailTabHeaderTpPay.setDisabled(true);
			refs.cltDetailTabHeaderIVPrx.setDisabled(true);
			refs.cltDetailTabHeaderRemark.setDisabled(true);
			refs.cltTabDetailCostCenter.setDisabled(true);
			refs.cltTabDetailTrfCombo.setDisabled(true);
			refs.btnAddTabDetail.setDisabled(true);
			refs.btnClearTabDetail.setDisabled(true);
			refs.btnUpdateTabDetail.setDisabled(true);
			refs.btnDeleteTabDetail.setDisabled(true);
			refs.ctlTabDetailQtyU1.setDisabled(true);
			refs.ctlTabDetailQtyU2.setDisabled(true);
			refs.ctlTabDetailQtyU3.setDisabled(true);
		}else{
			refs.cltDetailTabHeaderSSRNo.setDisabled(false);
			refs.cltDetailTabHeaderIssueDate.setDisabled(false);
			refs.cltDetailTabHeaderDueDate.setDisabled(false);
			refs.cltDetailTabHeaderBerthNo.setDisabled(false);
			refs.cltDetailTabHeaderWhId.setDisabled(false);
			refs.cltDetailTabHeaderRefNo.setDisabled(false);
			refs.cltDetailTabHeaderPartner.setDisabled(false);
			refs.cltDetailTabHeaderAccNo.setDisabled(false);
			refs.cltDetailTabHeaderTpPay.setDisabled(false);
			refs.cltDetailTabHeaderIVPrx.setDisabled(false);
			refs.cltDetailTabHeaderRemark.setDisabled(false);
			
			if(recvData.data.workingStatus === WorkingStatus.INSERT){
				refs.cltDetailTabDetailSsrType.setDisabled(false);
			}
			
			refs.cltTabDetailCostCenter.setDisabled(false);
			refs.cltTabDetailTrfCombo.setDisabled(false);
			refs.btnAddTabDetail.setDisabled(false);
			refs.btnClearTabDetail.setDisabled(false);
			refs.btnUpdateTabDetail.setDisabled(false);
			refs.btnDeleteTabDetail.setDisabled(false);
			refs.ctlTabDetailQtyU1.setDisabled(false);
			refs.ctlTabDetailQtyU2.setDisabled(false);
			refs.ctlTabDetailQtyU3.setDisabled(false);
		}
	},
	
	setDataToControl: function(recvData){
		var me = this; 
		var refs = me.getReferences();
		var detailStore = me.getStore('ssrDetailList');
		var gridDetailStore = me.getStore('ssrDetailGrid');
		var ssrNo = recvData.data.ssrNo;
		var masterItem = Ext.create('MOST.model.billing.SsrList');
		var TTAmountInt = 0;
		var TTAmountExt = 0;
		var params = me.getSearchCondition();
		
		detailStore.removeAll();
		gridDetailStore.removeAll();
		detailStore.commitChanges();
		gridDetailStore.commitChanges();
		
		me.getViewModel().setData({theDetail:masterItem});
		me.getRefNoCombo(recvData.data.vslCallId);
		
		if(recvData.data.workingStatus === WorkingStatus.INSERT){
			var vslCallId = recvData.data.vslCallId;
			var currentDate = new Date();
			
			if(vslCallId !== ''){
				var vesselStore = me.getStore('vesselInfoStore');
				
				vesselStore.load({
					params:{
						vslCallId: vslCallId
					},
					callback: function(records, eOp, success){
						if(success){
							recvData.set('vesselName',records[0].data.vesselName);
							recvData.set('voyage',records[0].data.voyage);
							recvData.set('berthLoc',records[0].data.berthLoc);
							recvData.set('eta',records[0].data.eta);
							recvData.set('etd',records[0].data.etd);
							recvData.set('sa',records[0].data.saNm);
							recvData.set('shp',records[0].data.shipLineNm);
						}
					}
				});
			}
			
			refs.cltDetailTabHeaderIssueDate.setValue(currentDate);
			
			me.getViewModel().setData({theHeadDetail:recvData});
		}else{
			detailStore.load({
				params: {
					dateTo: params.dateTo,
					dateFrom: params.dateFrom,
					ssrNo: ssrNo,
					startRow: 1
				},
				callback: function(records, eOp, success){
					if(success){
						masterItem.data = records[0].data.arrHeadSSR[0];
						var arrDetailItem = records[0].data.arrSSRDetail;
						var vslCallId = recvData.data.vslCallId;
						var vesselStore = me.getStore('vesselInfoStore');

						if(arrDetailItem.length != 0){
							me.invoiceNo = arrDetailItem[0].ivNo;
						}
						
						gridDetailStore.setData(arrDetailItem);
						gridDetailStore.commitChanges();
						
						Ext.Array.forEach(arrDetailItem, function(item){
							TTAmountInt += Ext.Number.parseFloat(item.payableAmount);
							TTAmountExt += Ext.Number.parseFloat(item.totalAmount);
						});
						
						refs.ctlLblTabDetailAmtTTExclValue.setText(TTAmountExt.toString());
						refs.ctlLblTabDetailAmtTTIn.setText(TTAmountInt.toString());
						refs.cltDetailTabHeaderIssueDate.setValue(masterItem.data.issueDt);
						refs.cltDetailTabHeaderDueDate.setValue(masterItem.data.dueDt);
						
						me.getViewModel().setData({theHeadDetail:masterItem});
						
						vesselStore.load({
							params:{
								vslCallId: vslCallId
							},
							callback: function(records, eOp, success){
								if(success){
									var theHeadDetail = me.getViewModel().get('theHeadDetail');
									
									theHeadDetail.set('vesselName', records[0].data.vesselName);
									theHeadDetail.set('voyage',records[0].data.voyage);
									theHeadDetail.set('berthLoc',records[0].data.berthLoc);
									theHeadDetail.set('eta',records[0].data.eta);
									theHeadDetail.set('etd',records[0].data.etd);
									theHeadDetail.set('sa',records[0].data.saNm);
									theHeadDetail.set('shp',records[0].data.shipLineNm);
								}
							}
						});
					}
				}
			});
		}
	},
	
	onDetailSave: function(){
		var me =  this;
		
		me.saveProcess();
	},	
	
	saveProcess: function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
		if (recvData.get('workingStatus') == WorkingStatus.UPDATE && (recvData.get('ssrStatCd') == 'Invoiced' || recvData.get('ssrStatCd') == 'Verified')){
			MessageUtil.warning("warning", "ssrMsgDelete_BL01201007");
			return;
		}
		
		var store = me.getStore('ssrDetailList');
		var gridDetailStore = me.getStore('ssrDetailGrid');
		var objHead = me.getViewModel().getData().theHeadDetail;
		var objHeamItem = Ext.create('MOST.model.billing.SsrList');
		var refNo = refs.cltDetailTabHeaderRefNo.getValue();
		
		if(objHead.get('ssrStatCd') == 'Created'){
			objHead.set('ssrStatCd', CodeConstants.MT_IVSTAT_CR);
		} else if(objHead.get('ssrStatCd') == 'Verified'){
			objHead.set('ssrStatCd', CodeConstants.MT_IVSTAT_VF);
		}
		
		objHeamItem = objHead;

		objHeamItem.set('paymentType', 'C');
		
		if(!objHeamItem.get('workingStatus')){
			objHeamItem.set('workingStatus', recvData.get('workingStatus'));
		}

		if(objHeamItem.data.workingStatus !== WorkingStatus.INSERT){
			objHeamItem.phantom = false;
		}
		
		var vslCallId = refs.ctlDetailVesselField.getValue();
		var partnerCd = refs.cltDetailTabHeaderPartner.getValue();
		var ivPrefixCd = refs.cltDetailTabHeaderIVPrx.getValue();
		var accNo = refs.cltDetailTabHeaderAccNo.getValue();
		
//		if(StringUtil.isNullorEmpty(accNo)){
//			MessageUtil.info('info_msg','ssrAccNoEmptyMsg');
//			return;
//		}

		if(StringUtil.isNullorEmpty(vslCallId)){
 			MessageUtil.warning("info_msg","SSRVslCallIdNoneMsg");
			return;
 		}
		
		if(StringUtil.isNullorEmpty(partnerCd)){
 			MessageUtil.info('info_msg','SSRPartnerNoneMsg');
			return;
 		}
		
		if(StringUtil.isNullorEmpty(ivPrefixCd)){
 			MessageUtil.info('info_msg','SSRInvPreFixNoneMsg');
			return;
 		}
	
		if(gridDetailStore.data.length == 0){
			MessageUtil.info('info_msg','SSRGridTabDetailNoneNoneMsg');
			
			if(gridDetailStore.getRemovedRecords().length == 0 ){
				return;
			}
		}
		
		var arrDetailIem = new Array();
		var arrDetailIemDel = new Array();
		
		var issueDt = refs.cltDetailTabHeaderIssueDate.getValue();
		var dateString = issueDt==null?null:Ext.Date.format(issueDt, MOST.config.Locale.getShortDate());
		
		objHeamItem.set('issueDt', dateString);
		
		var dueDt = refs.cltDetailTabHeaderDueDate.getValue();
		var dueDtString = dueDt==null?null:Ext.Date.format(dueDt, MOST.config.Locale.getShortDate());
		var paymTerm = refs.cltDetailTabHeaderPaymTerm.getValue();
		
		objHeamItem.set('dueDt', dueDtString);
		objHeamItem.set('paymTerm', paymTerm);
		objHeamItem.set('refNo', refNo);
		objHeamItem.set('userId', MOST.config.Token.getUserId());
		
		if(refs.refStatus.getValue() != 'Invoiced'){
			if(issueDt > dueDt){
				MessageUtil.info('info_msg','SSRInvDueDtMsg');
				return;
			}
		}else{
			refs.cltDetailTabHeaderDueDate.setEditable(false);
		}
		
		gridDetailStore.getModifiedRecords().forEach(function(item){
			item.set('cType', 'ID');
			item.set('userId', MOST.config.Token.getUserId());
			arrDetailIem.push(item.data);
		});
		
		gridDetailStore.getRemovedRecords().forEach(function(item){
			item.set('workingStatus', WorkingStatus.DELETE);
			arrDetailIem.push(item.data);
		});

		if((objHeamItem.dirty || arrDetailIem.length>0)){
			objHeamItem.set('arrSSRDetail', arrDetailIem);
			var proxy = objHeamItem.getProxy();
			
			proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/ssrlist/detaillist';
			
			objHeamItem.save({
				success: function(records){
					recvData.set('ssrNo', records.data.ssrNo);
					recvData.set('workingStatus', WorkingStatus.UPDATE);
					
					if(records.data.arrSSRDetail.length > 0){
						if(records.data.arrSSRDetail[0].workingStatus !== WorkingStatus.DELETE){
							var ssrListItem = records.data;
							var arrDetail = ssrListItem.arrSSRDetail;
							
							if(arrDetail.length>0){
								var ivList = Ext.create('MOST.model.billing.InvoiceList');
								var arrIv = new Array();
								
								Ext.Array.forEach(arrDetail, function(item){
									var ivItem = Ext.create('MOST.model.billing.InvoiceList');
									
									me.GenerateIvData(ssrListItem, item, ivItem);
									arrIv.push(ivItem.data);
								});
								
								ivList.set('invoiceList', arrIv);
							
								if(ivList.phantom == true || arrIv.lenght>0){
									var prx = ivList.getProxy();
									prx.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/ssrlist/invoice';
									ivList.save({
										success: function(record){
											//me.onDetailLoad();
											me.setDataToControl(recvData);
											MessageUtil.saveSuccess();
										}
									});
								}
							}
						}
					}
					
					refs.refStatus.setValue('Created');
					refs.ctlVerify.setDisabled(false);
					gridDetailStore.commitChanges();
					me.onSearch();
				}
			});
		}
	},
	
	onDetailRemove:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
		if (recvData.get('workingStatus') == WorkingStatus.UPDATE && (recvData.get('ssrStatCd') == 'Invoiced' || recvData.get('ssrStatCd') == 'Verified')){
			MessageUtil.warning("warning", "ssrMsgDelete_BL01201007");
			return;
		}
		
		var validationStore = me.getStore('ssrValidation');
		var objHead = me.getViewModel().getData().theHeadDetail;
		var objHeamItem = Ext.create('MOST.model.billing.SsrList');
		
		objHeamItem = objHead;
		objHeamItem.set('workingStatus', WorkingStatus.DELETE);
		
		if(objHeamItem.data.ssrNo != ''){
			if(objHeamItem.data.ssrStatCd === CodeConstants.MT_IVSTAT_IV || objHeamItem.data.ssrStatCd === 'PD'){
				MessageUtil.warning("warning", "ssrMsgDelete_BL01201006");
				return null;
			} else {
				Ext.Msg.show({
					   title:  MOST.getApplication().bundle.getMsg('remove'),
					   message: MOST.getApplication().bundle.getMsg('removeyn_msg'),
				       buttons: Ext.Msg.YESNO,
				       icon: Ext.Msg.QUESTION,
				       fn: function(btn) {
				    	   if (btn === 'yes') {
				    		   validationStore.load({
									params : {
										vslCallId : objHeamItem.data.vslCallId,
										ssrNo : objHeamItem.data.ssrNo
									},
									callback: function(records, operation, success) {
										if (success) {
											if(records != null && records.length > 0){
												MessageUtil.warning("warning", "ssrMsgDelete_BL01201006");
												return null;
											} else {
												me.onDeleteProceed();
											}
										}
									}
								});
				    	   }
				       }
				 });
			}
		}
	},
	
	onDeleteProceed:function(){
		var me = this;
		var refs = me.getReferences();
		
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var arrCud = new Array();
	
		var objHead = me.getViewModel().getData().theHeadDetail;
		var objHeamItem = Ext.create('MOST.model.billing.SsrList');
		
		objHeamItem = objHead;
		
		if(objHeamItem.data.ssrNo != ''){
			var cudItem = Ext.create('MOST.model.billing.SsrList');
			
			cudItem.set('vslCallId', objHeamItem.data.vslCallId);
			cudItem.set('ssrNo', objHeamItem.data.ssrNo);
			cudItem.set('workingStatus', WorkingStatus.DELETE);
			
			arrCud.push(cudItem.data);
			
			objHeamItem.set('arrSSRDetail', arrCud);
			objHeamItem.phantom = false;
			
			var proxy = objHeamItem.getProxy();
			proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/ssrlist/list';
			
			objHeamItem.erase({
				success : function(){
					MessageUtil.saveSuccess(); // Success Message
					me.onDetroyView();
					me.onSearch();
					me.onResetDetailData();
					me.onDetailLoad();
				}
			});
		}
	},

	onDetroyView: function () {
        this.getDetailBizView().destroy();
    },
	
	GenerateIvData: function(SSRItem, SSRDetailItem, IvItem ){
		var gstAmount = Ext.Number.parseFloat(SSRDetailItem.gstAmount);
		var TTAmount = Ext.Number.parseFloat(SSRDetailItem.totalAmount);

		IvItem.set('vslCallId', SSRItem.vslCallId);
		IvItem.set('trfCd', SSRDetailItem.trfCd);
		IvItem.set('trfDescr', SSRDetailItem.trfDescr);
		IvItem.set('payer', SSRItem.payerCd);
		IvItem.set('subTrfCd', SSRDetailItem.subTrfCd);
		IvItem.set('unit1Val', SSRDetailItem.unitQty1);
		IvItem.set('unit2Val', SSRDetailItem.unitQty2);
		IvItem.set('unit3Val', SSRDetailItem.unitQty3);
		IvItem.set('aplyRate', SSRDetailItem.aplyUnitPrc);
		IvItem.set('aplyAmt', SSRDetailItem.totalAmount);
		IvItem.set('stdRate', SSRDetailItem.stdRate);
		IvItem.set('refNo', SSRDetailItem.seq);
		IvItem.set('refNo2', SSRDetailItem.ssrNo);
		IvItem.set('refNo3', SSRDetailItem.seq);
		IvItem.set('costCentCd', SSRDetailItem.costCenter);
		IvItem.set('financialCode', SSRDetailItem.financialCode);
		IvItem.set('payTpCd', SSRItem.paymentType);
		IvItem.set('payerTpCd', SSRItem.payerTpCd);
		IvItem.set('gstAmount', SSRDetailItem.gstAmount);
		IvItem.set('disSurRate', SSRDetailItem.disSurRate);
		IvItem.set('disSurAmount', SSRDetailItem.disSurAmount);
		IvItem.set('wthAmount', SSRDetailItem.wthAmount);
		
		if(SSRItem.gstAmount === "" || SSRItem.gstAmount === null){
			IvItem.set('gstAmount', "0");
			gstAmount = 0;
		}
		
		var TTAmt = (gstAmount + TTAmount).toString();
		
		IvItem.set('gstAmt', '');
		IvItem.set('totalAmount', TTAmt);
		IvItem.set('totalAmt', "");
		IvItem.set('payableAmount', SSRDetailItem.payableAmount);
		IvItem.set('gstTpCd', SSRDetailItem.gstTpCd);
		IvItem.set('gstValue', SSRDetailItem.gstValue);
		
		var gstValue =  SSRDetailItem.gstValue;
		
		if(gstValue === "" || gstValue == null){
			IvItem.set('gstValue', "0");
			gstValue = "0"
		}
		
		var gstPer = Ext.Number.parseFloat(gstValue) * 100;
		
		IvItem.set('gstPercent', gstPer);
		IvItem.set('gatherNo', SSRDetailItem.gatherNo);
		IvItem.set('gatherDt', SSRItem.issueDt);
		
		if(SSRDetailItem.cType !== 'IV'){
			IvItem.set('cType', "ID");
		}else{
			IvItem.set('cType', SSRDetailItem.cType);
			IvItem.set('ivDt', SSRItem.issueDt);
			IvItem.set('ivDueDt', SSRItem.issueDt);
		}
		
		IvItem.set('scrId', "SSR");
		IvItem.set('userId', SSRItem.userId);
		IvItem.set('vslCallId', SSRItem.vslCallId);
		IvItem.set('ivPrfx', SSRItem.ivPrfx);
		IvItem.set('isPrfx', "true");
//		IvItem.set('revsUnit1Val', SSRItem.paymentType === 'C' ? SSRDetailItem.unitQty1 : '' ); // when set credit :: Mantis 130002
//		IvItem.set('revsUnit2Val', SSRItem.paymentType === 'C' ? SSRDetailItem.unitQty2 : '' ); // when set credit :: Mantis 130002
//		IvItem.set('revsUnit3Val', SSRItem.paymentType === 'C' ? SSRDetailItem.unitQty3 : '' ); // when set credit :: Mantis 130002
//		IvItem.set('revsRate', SSRItem.paymentType === 'C' ? SSRDetailItem.aplyUnitPrc : ''); // when set credit :: Mantis 130002
//		IvItem.set('revsAmt', '');
		
		if(SSRDetailItem.ssrStatCd === CodeConstants.MT_IVSTAT_VF || SSRDetailItem.cType === CodeConstants.MT_IVSTAT_IV){
			IvItem.set('adhocYn', 'N');
		}else{
			IvItem.set('adhocYn', 'Y');
		}
		
		IvItem.set('userId', MOST.config.Token.getUserId());
		IvItem.set('ivTpCd', 'N');//Normal Invoice
	},
	
	checkPeriodDateSSR:function(me, fromDateControlName, toDateControlName, maxDatePeriod, isMandatory){
		var arrFromToDate = DateUtil.checkFromToDate(me, fromDateControlName, toDateControlName, isMandatory);
		
		if(arrFromToDate == null) {
			return null;
		}
		
		var periodDay = Ext.Date.diff(arrFromToDate.fromDt, arrFromToDate.toDt, Ext.Date.DAY);
		
		if(periodDay > maxDatePeriod){
			var fromDateControl = me.lookupReference(fromDateControlName);
			
			MessageUtil.alert('Warning','validPeriodWithMonth_msg', maxDatePeriod);
			fromDateControl.focus();
			
			return null;
		}
		
		return arrFromToDate;
	},
	
	onSsrListPreview:function(){
		var me = this;
		var refs = me.getReferences();
		
		var startDate = refs.ctlFrmDate.getValue();
        var endDate = refs.ctlToDate.getValue();

        var Difference_In_Time = endDate.getTime() - startDate.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)-1;
        var record = 'preview'
        
        if (Difference_In_Days > 29){
        	Ext.Msg.alert('Warning', 'Only preview/dowload reports within 1 month');
        	return;
        } 
		
		me.getView().detailViewAlias = 'popup-reportssrlistpopup';
		
		me.openDetailPopup(record);
	},
	
	onSsrListDownload:function(){
		var me = this;
		var refs = me.getReferences();
		
		var startDate = refs.ctlFrmDate.getValue();
        var endDate = refs.ctlToDate.getValue();

        var Difference_In_Time = endDate.getTime() - startDate.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)-1;
        
        if (Difference_In_Days > 29){
        	Ext.Msg.alert('Warning', 'Only preview/dowload reports within 1 month');
        	return;
        } 
		
		me.getView().detailViewAlias = 'popup-reportssrlistpopup';
		var record = 'download'
		
		me.openDetailPopup(record);
	},
	
	onPreviewSSRListLoad:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
		if(recvData == 'preview'){
			me.visibleDetailToolButton(ViewUtil.TOOL_DOWNLOAD, false);
		}else{
			me.visibleDetailToolButton(ViewUtil.TOOL_PREVIEW, false);
		}
		
		me.visibleDetailToolButton(ViewUtil.TOOL_SAVE, false);
		me.visibleDetailToolButton(ViewUtil.TOOL_DELETE, false);
	},
	
	onRadioSSRListReportChange:function(obj, newValue, oldValue, eOpts){
		
	},
	
	onDetailPreview:function(){
		var me = this;
		var refs = me.getReferences();
		var generatePDFSsr = me.getStore('generatePDFSsr');
		var params = me.getSearchCondition();
		
		if(me.getView().detailViewAlias == 'popup-reportssrlistpopup'){
			if(refs.refRadioSSRReport.getValue().rb == 'SSR_SUM'){
				params['rptTp'] = 'summary';
			}else if(refs.refRadioSSRReport.getValue().rb == 'SSR_LIST'){
				params['rptTp'] = 'list';
			}
		}else if(me.getView().detailViewAlias == 'app-ssrdetail'){
			params['ssrNo'] = refs.cltDetailTabHeaderSSRNo.getValue();
			params['rptTp'] = 'detail';
		}

		generatePDFSsr.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					me.openPDFPreview (records, operation, success);
				}
			}
		})
	},
	
//	onDetailDownload:function(){
//		var me = this;
//		var refs = me.getReferences();
//		var params = me.getSearchCondition();
//		var bridge = null;
//		var detailView = me.getDetailBizView();
//		var recvData = detailView.items.get(0).recvData;
//		
//		if((recvData.get('ssrStatCd') != 'Invoiced' && recvData.get('ssrStatCd') != 'Verified') &&
//				(refs.refStatus.getValue() != 'Invoiced' && refs.refStatus.getValue() != 'Verified')){
//			MessageUtil.info('info_msg', 'After creating an invoice or verify this SSR, you can print it out.');
//        	return;
//		}
//		
//		if(me.getView().detailViewAlias == 'app-ssrdetail'){
//			params['ssrNo'] = refs.cltDetailTabHeaderSSRNo.getValue();
//			params['rptTp'] = 'detail';
//			
//			if(recvData.get('ivNo') == null || recvData.get('ivNo') == ''){
//				params['ivNo'] = me.invoiceNo;
//			}else{
//				params['ivNo'] = recvData.get('ivNo');
//			}
//			
//			params['vslCallId'] = recvData.get('vslCallId');
//			params['ssrStatCd'] = recvData.get('ssrStatCd');
//			bridge = 'app-ssrdetail';
//		}else if(me.getView().detailViewAlias == 'popup-reportssrlistpopup'){
//			if(refs.refRadioSSRReport.getValue().rb == 'SSR_SUM'){
//				params['rptTp'] = 'summary';
//			}else if(refs.refRadioSSRReport.getValue().rb == 'SSR_LIST'){
//				params['rptTp'] = 'list';
//			}
//			
//			bridge = 'popup-reportssrlistpopup';
//		}
//		
//		me.getView().detailViewAlias = 'app-ssrgeneratepdf';
//		me.openDetailPopup(params, 'Download');
//		me.getView().detailViewAlias = bridge;
//	},
	
    exportTo: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
    	var grid = refs.refSsrListGrid;
        var cfg = Ext.merge({
            title: 'Special Service Request',
            fileName: 'Special_Service_Request' + '.' + (btn.cfg.ext || btn.cfg.type)
        }, btn.cfg);

        grid.saveDocumentAs(cfg);
    },
    
    onVerify: function(){
    	var me = this;
    	var refs = me.getReferences();
    	var store = me.getStore('ssrListList');
    	var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
    	if((recvData.get('ssrStatCd') == 'Created' || recvData.get('ssrStatCd') == CodeConstants.MT_IVSTAT_CR) && recvData.phantom == false){
			var proxy = recvData.getProxy();
			
			proxy.url = store.getProxy().url;
			
    		recvData.set('ssrStatCd', CodeConstants.MT_IVSTAT_VF);
    		recvData.set('userId', MOST.config.Token.getUserId());
    		recvData.set('verifiedBy', MOST.config.Token.getUserId());
    		recvData.save({
    			success: function(record) {
    				me.onSearch();
    				refs.refStatus.setValue('Verified');
    				refs.ctlVerify.setDisabled(true);
    		    	MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','');
    			}
    		});
    	}
    },
    
    onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.billing.SearchSSRListParm';
		searchBizParm.serviceID = 'MOST.ssrList.selectSSRList'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});
