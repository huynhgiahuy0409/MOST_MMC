Ext.define('MOST.view.billing.ProformaInvoiceController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.proformainvoice',
	
	/**
     * =========================================================================================================================
     * CONSTANT START
     */
	MAIN_GRID_REF_NAME: 'refGridProformaInvoice',
	MAIN_STORE_NAME: 'proformaInvoiceList',
	MAX_PERIOD_DAY: 90,
	
	DETAIL_GRID_REF_NAME: 'refProformaInvoiceGenerationGrid',  // Main Grid Name 
	DETAIL_STORE_NAME: 'proformaInvoiceDataItems',
	REPORT_PDF_FILE: 'CashReceipt.jrxml',
	REPORT_PDF_FUNCTION: 'MOST.billingReport.getCashReceiptReportItems',
	
	INVOICE_TYPE_COMBO: 'invoiceTypeCombo',
	
	flag: '',
	selectedRecord: null,
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
		var searchParm = Ext.create('MOST.model.billing.SearchProformaInvoiceParm');
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.INVOICE_TYPE_COMBO, me.INVOICE_TYPE_COMBO);
		
		me.setSearchParm(searchParm); 
		me.getViewModel().setData({theSearch:searchParm});
		me.getViewModel().setData({isRetrieve:false});
		me.getViewModel().setData({isSettingJPVC:false});
	
		me.initializeComponents();
		
		me.updateViewStyle(me.getView());
	},
	
	initializeComponents: function(){
		var me = this;
		var refs = me.getReferences();
		
		me.setDateInDays('refDtFrom', -me.MAX_PERIOD_DAY);
        me.setDateInDays('refDtTo');

		refs.refBtnCredit.setDisabled(true);
		refs.refBtnProforma.setDisabled(false);
		refs.refBtnAdditional.setDisabled(true);
	},
	
	onDetailLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.billing.SearchProformaInvoiceParm');

		
		me.setDateInDays('ctlExpectedDt');

		me.setSearchParm(searchParm); 
		me.getViewModel().setData({theDetail:searchParm});

		var recvData = me.getDetailBizView().items.items[0].recvData;
		var theDetail = me.getViewModel().get('theDetail');

		if(recvData && !StringUtil.isNullorEmpty(recvData.get('vslCallId'))){
			var vesselStore = me.getStore('vesselInfo');

			theDetail.set('vslCallId', recvData.get('vslCallId'));

			if(recvData.get('category') == 'Import'){
				theDetail.set('masterBL', recvData.get('docNo'));
			} else if(recvData.get('category') == 'Export'){
				theDetail.set('bookingNo', recvData.get('docNo'));
			}
			
			vesselStore.load({
                params: {
                    mode: 'textfield',
                    vslCallId: recvData.get('vslCallId')
                },
                callback: function (records, operation, success) {
                    if (success) {
                        me.getViewModel().setData({theVslInfo: records[0]});
                        me.getComboMasterItem();
						me.onDetailSearch();
                    }
                }
            });
			me.initializeSetValue(recvData);
		} else {
			var detailStore = me.getStore(me.DETAIL_STORE_NAME);
			var bookingNoStore = me.getStore('bookingNoCombo');
			var masterBLStore = me.getStore('masterBLCombo');
			detailStore.clearData();
			bookingNoStore.clearData();
			masterBLStore.clearData();
		}
	},
	
	onUnitUpdateLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getDetailBizView().items.items[0].recvData;
		
        refs.refUpdateUnit1.setDisabled(StringUtil.isNullorEmpty(recvData.get('ivUnit1')));
		refs.refUpdateUnit2.setDisabled(StringUtil.isNullorEmpty(recvData.get('ivUnit2')));
		refs.refUpdateUnit3.setDisabled(StringUtil.isNullorEmpty(recvData.get('ivUnit3')));
		
		refs.refUpdateUnit1.setFieldLabel(recvData.get('ivUnit1') != null ? recvData.get('ivUnit1') : ViewUtil.getLabel('ivUnit1'));
		refs.refUpdateUnit2.setFieldLabel(recvData.get('ivUnit2') != null ? recvData.get('ivUnit2') : ViewUtil.getLabel('ivUnit2'));
		refs.refUpdateUnit3.setFieldLabel(recvData.get('ivUnit3') != null ? recvData.get('ivUnit3') : ViewUtil.getLabel('ivUnit3'));
	},
	
	/**
     * =========================================================================================================================
     * INITIALIZE END
     */
	
	/**
     * =========================================================================================================================
     * EVENT HANDLER START
     */
	onSearch: function(){
		var me = this;
		var refs = me.getReferences();
		var proformaInvoiceList = me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();
		
		if(params == null){
    		return;
    	}
		
		proformaInvoiceList.load({
			params: params
		});
		
		me.getViewModel().setData({isRetrieve:true});
	},
	
	onProformaInvoiceGrid_cellClick: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null){
			return;
		}
		
		refs.refBtnAdditional.setDisabled(true);
		refs.refBtnCredit.setDisabled(true);
		
		if(!StringUtil.isNullorEmpty(selection.get('operationMT'))
				&& selection.get('ivTp') == 'P' 
				&& selection.get('allowCreateAddCredit') == 'Y'){
			//Additional Case
			if(Number(selection.get('operationMT')) > Number(selection.get('issuedMT'))){
				refs.refBtnAdditional.setDisabled(false);
				refs.refBtnCredit.setDisabled(true);
			} else if(Number(selection.get('operationMT')) < Number(selection.get('issuedMT'))){
				//Credit Note case
				refs.refBtnCredit.setDisabled(false);
				refs.refBtnAdditional.setDisabled(true);
			}
		}
	},
	
	onProformaInvoiceGrid_cellDblClick: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) {
			return;
		}
		
     	me.getView().detailViewAlias = 'app-proformainvoicedetail';
     	me.openDetailPopup(selection, 'app-proformainvoicedetail');
	},
	
	onChecked : function (model, record, index, eOpts) {
		var me = this;
		
		if(record.data.chk){
			record.data.chk=false;
		} else{
			record.data.chk=true;
		}
    },
    
	oncheckBoxClick: function(context, record,index){
		var me = this;
     	var refs = me.getReferences();
     	
     	if ( record.allowCreateAddCredit == "0" ){
     		if(refs.refCboInvoiceType.value == "Additional" || refs.refCboInvoiceType.value == "Credit"){
				MessageUtil.warning('warning_msg', 'BL0290002');
				return;
			}
		}
	},
	
	createProforma: function(){
		var me = this;
     	var refs = me.getReferences();
     	var selection = Ext.create('MOST.model.billing.ProformaInvoice', {
			vslCallId: refs.ctlVslCallId.getValue()
		});
     	
     	me.getView().detailViewAlias = 'app-proformainvoicedetail';
     	me.openDetailPopup(selection, 'app-proformainvoicedetail');
	},
	
	createCredit: function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		if(selection == null) {
			return;
		}
		
		selection.set('userId', Token.getUserId());
		selection.set('creditNote', 'C');
		selection.set('creditNoteYn', 'Y');
		
		updateParm.getProxy().url = store.getProxy().url;
		
		updateParm.phantom = true;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.INSERT));
		updateParm.set('items', new Array());
		updateParm.get('items').push(selection.data);
	
		updateParm.save({
			success : function(record, operation) {
				store.commitChanges();
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
						if (button === 'ok') {
							me.onSearch();
						}
					});
			}
		});
	},
	
	createAdditional: function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		if(selection == null) {
			return;
		}
		
		selection.set('userId', Token.getUserId());
		selection.set('creditNote', 'A');
		selection.set('creditNoteYn', 'N');
		
		updateParm.getProxy().url = store.getProxy().url;
		
		updateParm.phantom = true;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.INSERT));
		updateParm.set('items', new Array());
		updateParm.get('items').push(selection.data);
	
		updateParm.save({
			success : function(record, operation) {
				store.commitChanges();
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
						if (button === 'ok') {
							me.onSearch();
						}
					});
			}
		});
	},

	onClickCreateInvoice: function() {
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection();
		var validFlag = true;

		for( record of selection ) {
			if(record.get('statusCd') != 'SM') {
				validFlag = false;
				break;
			}
		}

		if(!validFlag) {
			MessageUtil.warning('warning_msg', 'warnMsgCreateIV');
			return;
		}

		if(selection.length > 0) {
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			
			updateParm.getProxy().url = store.getProxy().url;
			updateParm.phantom = false;
			updateParm.set('items', new Array());

			for( record of selection ) {
				var cloneItem = record.copy();
				
				cloneItem.set({
					 userId: Token.getUserId(),
					statusCd: 'IV'
				});
				
				updateParm.get('items').push(cloneItem.data);
			}
			updateParm.save({
				success : function(record, operation) {
					me.onSearch();
					MessageUtil.saveSuccess();
				}
			});
		} else {
			MessageUtil.warning('warning_msg', 'tbl_sts_select');
		}
	},
	
	/**
     * =========================================================================================================================
     * EVENT HANDLER END
     */
	
	 /**
     * =========================================================================================================================
     * GENERAL METHOD START
     */
	getSearchCondition: function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');

		var params = me.createParam(searchParm);
		
     	var dateFrom = Ext.Date.format(refs.refDtFrom.getValue(), MOST.config.Locale.getShortDate());
     	var dateTo = Ext.Date.format(refs.refDtTo.getValue(), MOST.config.Locale.getShortDate());

    	params['vslCallId'] = refs.ctlVslCallId.getValue();
    	params['scn'] = refs.ctlScn.getValue();
    	params['fromDate'] = dateFrom;
    	params['toDate'] =  dateTo;
    	params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		
		if(refs.refDtFrom.getValue() != null && refs.refDtTo.getValue() != null){
            var dateCondition = me.validateFromToDate(refs.refDtFrom.getValue(), refs.refDtTo.getValue());
            
            if(!dateCondition){
            	refs.refDtFrom.reset();
            	refs.refDtTo.reset();
            	params['fromDate'] = '';
            	params['toDate'] =  '';
            }
		}
		
		if (StringUtil.isNullorEmpty(params.scn) 
				&& StringUtil.isNullorEmpty(params.vslCallId)
				&& StringUtil.isNullorEmpty(params.fromDate)
				&& StringUtil.isNullorEmpty(params.toDate)
				&& StringUtil.isNullorEmpty(params.ivNo)
				) {
			MessageUtil.warning('warning_msg', 'BL02901');
			return null;
		}
    	
    	return params;
	},

	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl == 'refBtnProforma'){
			if(returnValue){
				refs.ctlVslCallId.setValue(returnValue.vslCallId);
				refs.refCboInvoiceType.setValue(returnValue.invoiceType);
				me.onSearch();
			}
		} else if(targetControl === 'ctlDtlVslCallId'){
			if(returnValue){
				me.getViewModel().setData({theVslInfo:returnValue.item});
				me.getComboMasterItem();
				refs.ctlScn.setValue(returnValue.item.get('scn'));
				//MMC
				refs.ctlBookingNo.reset();
				refs.ctlMaterBL.reset();
			} else {
				me.getViewModel().setData({theVslInfo:null});
				
				var blCombo = me.getStore('blCombo');
				var snCombo = me.getStore('shippingNoteCombo');

				refs.ctlScn.setValue('');

				blCombo.loadData([],false);
				refs.ctlBlNo.reset();

				snCombo.loadData([],false);
				refs.ctlSNNo.reset();

			}
		} else if (targetControl == 'btnAddItem') {
            var result = returnValue.item;
            var arrTariff = new Array();
            var invoiceStore = me.getStore(me.DETAIL_STORE_NAME);
            var length = invoiceStore.getData().items.length;

            Ext.Array.forEach(result, function (item) {
                var it = Ext.create('MOST.model.billing.ProformaInvoice');
                
                if(me.selectedRecord){
                	it.set('vslCallId', me.selectedRecord.get('vslCallId'));
                	it.set('scn', me.selectedRecord.get('scn'));
                	it.set('blSnNo', me.selectedRecord.get('blSnNo'));
                	it.set('docNo', me.selectedRecord.get('docNo'));
                	it.set('delvTpCd', me.selectedRecord.get('delvTpCd'));
                	it.set('delvTpNm', me.selectedRecord.get('delvTpNm'));
                	it.set('opClassCd', me.selectedRecord.get('opClassCd'));
                	
                	it.set('payerCd', me.selectedRecord.get('payerCd'));
                	it.set('payerNm', me.selectedRecord.get('payerNm'));
                	it.set('payerTp', me.selectedRecord.get('payerTp'));
                	it.set('ivPrfx', me.selectedRecord.get('ivPrfx'));
                	it.set('ivTp', me.selectedRecord.get('ivTp'));
                	it.set('paymentType', me.selectedRecord.get('paymentType'));
                	it.set('groupingField', me.selectedRecord.get('groupingField'));
                }
                
                it.set('unit1Val', '0');
                it.set('unit2Val', '0');
                it.set('unit3Val', '0');
                it.set('ivUnit1', item.ivUnit1);
                it.set('ivUnit2', item.ivUnit2);
                it.set('ivUnit3', item.ivUnit3);
                it.set('applyRate', item.stdPrc);
                it.set('taxCd', item.gstTpCd);
                it.set('taxValue', item.gstRate);
                it.set('taxAmt', '0');
                it.set('ivAmt', '0');
                
                it.set('trfTpCd', item.trfTpCd);
                it.set('trfTpNm', item.trfTpCdNm);
                it.set('trfCd', item.trfCd);
                it.set('subTrf', item.subTrfCd);
                it.set('trfTpCd', item.trfTpCd);
                it.set('trfDesc', item.descr);
                it.set('adhocYn', 'Y');
                it.set('paidYn', 'N');
                it.set('itemStatus', 'Extra Item');
                it.set('userId', MOST.config.Token.getUserId());

                invoiceStore.insert(length, it);
            });

            invoiceStore.commitChanges();
        } else if (xtype == 'app-unitupdatepopup') {
    		var grid = me.lookupReference(me.DETAIL_GRID_REF_NAME);
    		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
    		var theUnit = me.getViewModel().get('theUnit');
    		var gridStore = grid.getStore();
    		
    		me.calcAmount(theUnit.get('unit1Val'), theUnit.get('unit2Val'), theUnit.get('unit3Val'), selection.get('applyRate'), true, selection.get('adhocYn'));
    		me.calcTotalAmount(gridStore.getData().items);
        } else if(targetControl === 'ctlScn'){ 
			if(returnValue){
				if(targetControl === 'ctlScn'){
					refs.ctlScn.setValue(returnValue.code);
					if(!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))){
						refs.ctlVslCallId.setValue(returnValue.item.get('vslCallId'));
						me.getViewModel().setData({theVslInfo:returnValue.item});
					} else {
						refs.ctlVslCallId.setValue('');
						me.getViewModel().setData({theVslInfo:null});
					}
				}
			} 
		}
	},
	
	// Text Upper Case
	onUpperCase : function(control){
		control.setValue(control.getValue().toUpperCase());
	},
	
	 /**
     * =========================================================================================================================
     * DETAIL START
     */
	
	initializeSetValue: function(recvData) {
		var me = this
			,colTpField = me.lookupReference('refCollectionType')
			,payDtField = me.lookupReference('refPaymentDate')
			,payRefNoField = me.lookupReference('refPaymentRefNo')
			,bankNmField = me.lookupReference('refBankName')
			,rmkField = me.lookupReference('refRemark')
		;

		colTpField.setValue(recvData.get('erpColTpCd'));
		payDtField.setValue(Ext.Date.parse(recvData.get('erpPayDt'), MOST.config.Locale.getShortDate() ));
		payRefNoField.setValue( (recvData.get('erpColTpCd') == 'CS') ? null : recvData.get('erpPayNo'));
		bankNmField.setValue(recvData.get('bankNm'));
		rmkField.setValue(recvData.get('rmk'));
	},
	
	onCtlBlNo_ChangeEvent: function(){
		var me = this;
     	var refs = me.getReferences();
     	
     	if(!StringUtil.isNullorEmpty(refs.ctlBlNo.getValue())){
     		me.onSearchPayer();
     	} else {
     		var store = me.getStore('payerCombo');
     		store.removeAll();
     	}
	},
	
	onCtlMasterBL_ChangeEvent: function(){
		var me = this;
     	var refs = me.getReferences();
     	var theDetail = me.getViewModel().get('theDetail');
		this.isSelectedMasterBL = true;

     	theDetail.set('bookingNo', '');

     	if(!StringUtil.isNullorEmpty(theDetail.get('masterBL'))){
     		me.onSearchPayer();
     		//Get current gathered data
     		me.onDetailSearch();
     	} else {
     		var store = me.getStore('payerCombo');
     		var mainStore = me.getStore(me.DETAIL_STORE_NAME);

     		store.removeAll();
     		mainStore.removeAll();
     	}
	},
	
	onCtlSNNo_ChangeEvent: function(){
		var me = this;
     	var refs = me.getReferences();
     	
     	if(!StringUtil.isNullorEmpty(refs.ctlSNNo.getValue())){
     		refs.ctlBlNo.setValue();
     	}
	},
	
	onCtlBookingNo_ChangeEvent: function(){
		var me = this;
     	var refs = me.getReferences();
     	var theDetail = me.getViewModel().get('theDetail');

     	theDetail.set('masterBL', '');

     	if(!StringUtil.isNullorEmpty(theDetail.get('bookingNo'))){
     		me.onSearchPayer();
     		//Get current gathered data
     		me.onDetailSearch();
     	} else {
     		var store = me.getStore('payerCombo');
     		var mainStore = me.getStore(me.DETAIL_STORE_NAME);

     		store.removeAll();
     		mainStore.removeAll();
     	}
	},
	
	onSelectCashCollection: function( combo, record, eOpts )  {
		var  me = this
			,refs = me.getReferences()
			,refPaymentRefNo = refs.refPaymentRefNo
		;
		var isAvailable = ['CQ', 'PS'].includes(record.get('scd'));

		refPaymentRefNo.setDisabled(!isAvailable);
		refPaymentRefNo.allowBlank = !isAvailable;
	},
	
    btnCalculation_clickHandler: function(){
    	var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore('gatheringData');
     	var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
     	var blCombo =  me.getStore('blCombo');
     	var shippingNoteCombo =  me.getStore('shippingNoteCombo');
     	var theDetail = me.getViewModel().get('theDetail');
     	var masterBLValue = theDetail.get('masterBL');
		var bookingNoValue = theDetail.get('bookingNo');
     	var isSelectedMasterBL = !StringUtil.isNullorEmpty(masterBLValue);
     	
     	if(StringUtil.isNullorEmpty(theDetail.get('vslCallId'))){
     		MessageUtil.warning("warning_msg", "mandatoryField_msg", ViewUtil.getLabel('proformaInvoiceVslCallId'));
     		return;
     	}
     	
     	if(StringUtil.isNullorEmpty(theDetail.get('masterBL')) && StringUtil.isNullorEmpty(theDetail.get('bookingNo'))){
     		MessageUtil.warning("warning_msg", "mandatoryField_msg", ViewUtil.getLabel('proformaInvoiceMaterBL') + " or " + ViewUtil.getLabel('proformaInvoiceBookingNo'));
     		return;
     	}
     	
     	if(refs.ctlPayer.getValue() == null || refs.ctlPayer.getValue() == ''){
     		MessageUtil.warning("warning_msg", "proformaCNSValidationMsg");
     		return;
     	}
     	
		updateParm.getProxy().url = store.getProxy().url;
		
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.INSERT));
		updateParm.set('items', new Array());
		
		var targetMfDocId = isSelectedMasterBL ? masterBLValue : bookingNoValue;
		var cargoCombo = isSelectedMasterBL ? blCombo : shippingNoteCombo;
		//Get BL List by MF_DOC_ID (removed by Brian - to support export proforma)
		cargoCombo.clearFilter();
		cargoCombo.filterBy(function(rec) {
			if(rec.get('mfDocId')){
				if(rec.get('mfDocId').indexOf(targetMfDocId) > -1){
					return true;
				}else {
				    return false;
				}
			}
		});

		if(cargoCombo.data.length > 0) {
			for(var i = 0; i < cargoCombo.data.length; i++){
				var gatheringItems = new Ext.create('MOST.model.billing.DataGathering');
				
				gatheringItems.set('vslCallId', theDetail.get('vslCallId'));
				gatheringItems.set('blNo', cargoCombo.data.getAt(i).get('blNo'));
				gatheringItems.set('shipgNoteNo', cargoCombo.data.getAt(i).get('shipgNoteNo'));
				gatheringItems.set('masterBL', theDetail.get('masterBL') );
				gatheringItems.set('bookingNo', theDetail.get('bookingNo'));
				gatheringItems.set('delvTpCd', cargoCombo.data.items[i].get('delvTpCd'));
				gatheringItems.set('payerCd', theDetail.get('payer'));
				gatheringItems.set('payer', theDetail.get('payer'));
				gatheringItems.set('userId', Token.getUserId())
				gatheringItems.set('estDt', Ext.Date.format(refs.ctlExpectedDt.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
				//MMC - Settlement
				gatheringItems.set('expectedDeliveryDay', Ext.Date.format(refs.ctlExpectedDt.getValue(), 'YmdHi'));
				gatheringItems.set('opeClassCd', isSelectedMasterBL ? 'I' : 'E');
				gatheringItems.set('docNo', targetMfDocId);
				gatheringItems.set('cargoType', cargoCombo.data.items[i].data.cgTpCd);

				if(cargoCombo.data.getAt(i).get('blNo') != null && cargoCombo.data.getAt(i).get('blNo') != ''){
					gatheringItems.set('consignee', theDetail.get('payer'));
					gatheringItems.set('blSnNo', cargoCombo.data.getAt(i).get('blNo'));
				}else{
					gatheringItems.set('shipper', theDetail.get('payer'));
					gatheringItems.set('blSnNo', cargoCombo.data.getAt(i).get('shipgNoteNo'));
				}
				
				if(theDetail.get('payer') != null && theDetail.get('payer') != ''){
					gatheringItems.set('payerTpCd', refs.ctlPayer.getSelection().get('payerTp'));
					gatheringItems.set('payTpCd', refs.ctlPayer.getSelection().get('payTpCd'));
				}
				
				updateParm.get('items').push(gatheringItems.data);
			}
		}
		
		Ext.MessageBox.show({
			title : 'Calculate',
			msg: 'progressing...',
			width:320,
			height:0,
			wait:true,
			waitConfig: {interval:200, text:''}
		});
		
		updateParm.save({
			success : function(record, operation) {
				store.commitChanges();
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
						if (button === 'ok') {
							me.onDetailSearch();
							me.flag = 'CALCULATE';
							Ext.MessageBox.hide();
						}
				});
			}
		});
	},
	
	onDetailSave: function(){
		var me = this;
		
		me.saveProcess();
	},
	
	saveProcess: function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.DETAIL_STORE_NAME);
     	var grid = me.lookupReference(me.DETAIL_GRID_REF_NAME);
		var selection = grid.getSelection();
     	var cnt = 0;
     	var hgFlag = '';
     	var ivPrfx = 'PFI';
		var validForm = me.getView().getForm();
		var targetList = (selection.length > 0) ? selection: store.data.items;
		var theDetail = me.getViewModel().get('theDetail');
		var detailView = me.getDetailBizView();
		var bizViewAlias = me.getView().detailViewAlias;

     	if(targetList.length > 0) {
     		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
     		
    		updateParm.getProxy().url = store.getProxy().url;
    		
    		updateParm.phantom = true;
    		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.INSERT));
    		updateParm.set('items', new Array());
    		
    		for(var i = 0; i < targetList.length; i++){
    			if(targetList[i].data.paidYn == 'N'){
    				if(targetList[i].data.trfTpCd == 'HG' && targetList[i].data.trfTpCd != 'Extra Item'){
    					hgFlag = 'Y';
    					ivPrfx = 'PFI';
    					break;
    				}
    			}
    		}
    		
    		for(var i = 0; i < targetList.length; i++){
    			if(targetList[i].data.paidYn == 'N'){
    				cnt += 1;
    				
    				targetList[i].set('hgFlag', hgFlag);
    				targetList[i].set('ivPrfx', ivPrfx);
    				targetList[i].set('action', 'save');
    				targetList[i].set('payerCd', refs.ctlPayer.getSelection().get('payer'));
					targetList[i].set('payerTp', refs.ctlPayer.getSelection().get('payerTp'));
					targetList[i].set('erpPayDt', Ext.Date.format(refs.refPaymentDate.getValue(), MOST.config.Locale.getShortDate()));
					targetList[i].set('erpPayNo', theDetail.get('erpPayNo'));
					targetList[i].set('bankNm', theDetail.get('bankNm'));
					targetList[i].set('rmk', theDetail.get('rmk'));
					targetList[i].set('userId', Token.getUserId());
					
        			updateParm.get('items').push(targetList[i].data);
    			}
    		}
    		
    		if(cnt > 0){
    			Ext.MessageBox.show({
    				title : 'Save',
    				msg: 'progressing...',
    				width:320,
    				height:0,
    				wait:true,
    				waitConfig: {interval:200, text:''}
    			});
    			
    			updateParm.save({
        			success : function(record, operation) {
        				store.commitChanges();
        				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
    						function(button){
        						if (button === 'ok') {
        							me.onDetailSearch();
									//receipt printing
									if(refs.ctlPrintReceipt.getValue() && record){
										me.onPrintReceiptReport(record);
									}
        							if(bizViewAlias == 'app-proformainvoiceunitupdate'){
        								detailView.close();
        							}
        							Ext.MessageBox.hide();
        						}
        					});
        			}
        		});
    		}
     	}
	},
	
	onBtnPrintReceipt_click: function(){
		var me = this;
        var refs = me.getReferences();
        var grid = me.lookupReference(me.DETAIL_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null){
			MessageUtil.info('info_msg', 'msgSelectRecord');
		    return;
		}
		
		me.onPrintReceiptReport(selection);
	},
	
	openTariffCodePopup: function () {
        var me = this;
        var refs = me.getReferences();
        var grid = me.lookupReference(me.DETAIL_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null){
			MessageUtil.info('info_msg', 'msgSelectRecord');
		    return;
		}
        
		me.selectedRecord = selection;
		
        var params = {
            title: ViewUtil.getLabel('tariffCodeList')
        };

        me.openCodePopup('app-tariffcodepopup', 'btnAddItem', params);
    },
	
	onDetailSearch: function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.DETAIL_STORE_NAME);
     	var params = me.getSearchDetailCondition();
     	
     	if(params == null){
    		return;
    	}
     	
     	store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					} else{
						me.onCalculateSubTotalAmnt();
					}
				}
			}
		});
	},
	
	onCalculateSubTotalAmnt: function(){
		var me = this;
     	var refs = me.getReferences();
     	var subTotal = 0;
     	var store = me.getStore(me.DETAIL_STORE_NAME);
     	
     	for(var i = 0; i < store.data.length; i++){
     		if(store.data.items[i].data.paidYn == 'N'){
     			subTotal += Number(store.data.items[i].data.totalAmt);
     		}
		}
     	
     	refs.refsSubTotal.setValue(Ext.util.Format.number(subTotal, '0,000.00'));
     	refs.refsCashRequired.setValue(Ext.util.Format.number(subTotal, '0,000.00'));
	},
	
	getSearchDetailCondition: function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.DETAIL_STORE_NAME);
		var grid = me.lookupReference(me.DETAIL_GRID_REF_NAME);
		var searchParm = me.getViewModel().get('theDetail');
		var params = me.createParam(searchParm);
		var searchTp = !StringUtil.isNullorEmpty(searchParm.get('masterBL')) ? 'BL' : 'SN';

		params['blNo'] = searchParm.get('blNo');
		params['masterBL'] = searchParm.get('masterBL');
		params['bookingNo'] = searchParm.get('bookingNo');
		params['blNoSnNo'] = searchParm.get('blNoSnNo');
		params['shipgNoteNo'] = searchParm.get('shipgNoteNo');
    	params['searchTp'] = searchTp;
    	
    	if(StringUtil.isNullorEmpty(params.vslCallId) && (StringUtil.isNullorEmpty(params.masterBL) || StringUtil.isNullorEmpty(params.bookingNo))){
			MessageUtil.warning('Warning', 'msgBL02902');
    		return null;
		}
    	
    	return params;
	},
	
	getComboMasterItem: function(){
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('theVslInfo');
		var blCombo = me.getViewModel().get('blCombo');
		var blSnCombo = me.getViewModel().get('blSnCombo');
		var shippingNoteCombo = me.getViewModel().get('shippingNoteCombo');
		var cashCollectionCombo = me.getStore('cashCollectionCombo');
		var masterBLCombo = me.getStore('masterBLCombo');
		var bookingNoCombo = me.getStore('bookingNoCombo');
		var theDetail = me.getViewModel().get('theDetail');
		var recvData = me.getDetailBizView().items.items[0].recvData;
		
		cashCollectionCombo.load();
		
		if(theVslInfo){
			blCombo.load({
				params: {
					vslCallId: theVslInfo.get('vslCallId')
				}
			});

//			blSnCombo.load({
//				params: {
//					vslCallId: theVslInfo.get('vslCallId')
//				}
//			});
			
			masterBLCombo.load({
				params: {
					vslCallId: theVslInfo.get('vslCallId')
				}
			});
			
			shippingNoteCombo.load({
				params: {
					vslCallId: theVslInfo.get('vslCallId')
				}
			});
			
			bookingNoCombo.load({
				params: {
					vslCallId: theVslInfo.get('vslCallId')
				}
			});

			me.onSearchPayer();
		}
		
		//Receiving data from List screen
		if(recvData && !StringUtil.isNullorEmpty(recvData.get('blSnNo'))){
			theDetail.set('blNoSnNo', recvData.get('blSnNo'));
		}
	},
	
	onSearchPayer: function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore('payerCombo');
     	var params = me.getSearchDetailCondition();
     	var theDetail = me.getViewModel().get('theDetail');
     	
     	if(params == null){
    		return;
    	}
     	
     	store.load({
     		params: params,
            callback: function (records, operation, success) {
                if (success && records[0] != null) {
                	var temp = false;
                	for(record of records){
            			if(record.get('payerTp') == CodeConstants.MT_PTNRTP_CNS){
            				refs.ctlPayer.reset();
            				refs.ctlPayer.setValue(record.get('payer'));
            				theDetail.set('payer', record.get('payer'));
            				temp = true;
            			}
                	}
                	if(temp == false){
                		theDetail.set('payer', '');
                	}
                }
            }
		});
	},
    
    calcAmount: function (unit1, unit2, unit3, aplyRate, isChangeRate, adhocYn) {
        var me = this;
        var refs = me.getReferences();
        var invoiceGrid = me.lookupReference(me.DETAIL_GRID_REF_NAME);
        var selection = invoiceGrid.getSelection()[0];
        var actualRate = isChangeRate ? aplyRate: parseFloat(selection.get('applyRate'));
        var rate = parseFloat(actualRate);
        var gstRate = selection.get('taxValue');
        var amount = 1;
        var amountGst = 1;
        var totalAmt = 0;
        var totalAmt = 0;
        var dirtyFlag = true;

        if (unit1 != '0') {
            amount = parseFloat(amount) * parseFloat(unit1);
            selection.set('unit1Val', unit1);
            dirtyFlag = true;
        }

        if (unit2 != '0') {
            amount = parseFloat(amount) * parseFloat(unit2);
            selection.set('unit2Val', unit2);
            dirtyFlag = true;
        }

        if (unit3 != '0') {
            amount = parseFloat(amount) * parseFloat(unit3);
            selection.set('unit3Val', unit3);
            dirtyFlag = true;
        }

        amount = parseFloat(amount) * parseFloat(rate);
        amountGst = parseFloat(amount) * gstRate;
        amountGst = parseFloat(amountGst) / 100;
        
        totalAmt = parseFloat(amountGst) + parseFloat(amount);
        
        if (!dirtyFlag) {
            amount = 0;
        }

        selection.set('ivAmt', amount);
        selection.set('taxAmt', amountGst);
        selection.set('totalAmt', totalAmt);
        
        if (isChangeRate) {
            selection.set('applyRate', aplyRate);
        }
    },
    
    calcTotalAmount: function (invoiceList) {
        var me = this;
        var refs = me.getReferences();
        var appliedAmt = 0;
        var standardAmt = 0;
        var differenceAmt = 0;
        var theDetail = me.getViewModel().get('theDetail');
        
        for (var i = 0; i < invoiceList.length; i++) {
            appliedAmt = parseFloat(appliedAmt) + parseFloat(invoiceList[i].get('totalAmt'));
            standardAmt = parseFloat(standardAmt) + parseFloat(invoiceList[i].get('stdAmt'));
        }

        differenceAmt = parseFloat(appliedAmt) - parseFloat(standardAmt);

        theDetail.set('aplyAmt', Ext.util.Format.number(appliedAmt, '0,000.00'));
        theDetail.set('stdAmt', Ext.util.Format.number(standardAmt, '0,000.00'));
        theDetail.set('diffAmt', Ext.util.Format.number(differenceAmt, '0,000.00'));
    },
    
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference(me.DETAIL_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var params = {
		        title: 'Unit Update'
		    };
		
		if((selection.get('itemStatus') != 'Extra Item') &&
				!(selection.get('itemStatus') == 'Gathered' && selection.get('adhocYn') == 'Y')){
        	return false;
        }
		
		me.getViewModel().set('theUnit', selection);
		
        me.openCodePopup('app-unitupdatepopup', params);

	},

	btnSettlement_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('settlementData');
		var blCombo =  me.getStore('blCombo');
		var shippingNoteCombo =  me.getStore('shippingNoteCombo');
		var gridStore = me.getStore('proformaInvoiceDataItems');
		var gridItems = gridStore.getData().items;
		var payerValue = refs.ctlPayer.getValue();
		var masterBLValue = refs.ctlMaterBL.getValue();
		var bookingNoValue = refs.ctlBookingNo.getValue();
		var isSelectedMasterBL = !StringUtil.isNullorEmpty(masterBLValue);

		if(StringUtil.isNullorEmpty(refs.ctlDtlVslCallId.getValue())){
			MessageUtil.warning("warning_msg", "mandatoryField_msg", ViewUtil.getLabel('proformaInvoiceVslCallId'));
			return;
		}

		if(!isSelectedMasterBL && StringUtil.isNullorEmpty(bookingNoValue) ) {
			MessageUtil.warning("warning_msg", "mandatoryField_msg", ViewUtil.getLabel('userRefNo'));
			return;
		}

		if(StringUtil.isNullorEmpty(payerValue)){
			MessageUtil.warning("warning_msg", "mandatoryField_msg", ViewUtil.getLabel('payer'));
			return;
		}

		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = store.getProxy().url;

		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.INSERT));
		updateParm.set('items', new Array());

		//Get BL List by MF_DOC_ID
		var targetMfDocId = isSelectedMasterBL ? masterBLValue : bookingNoValue;
		var cargoCombo = isSelectedMasterBL ? blCombo : shippingNoteCombo;
		cargoCombo.clearFilter();
		cargoCombo.filterBy(function(rec) {
			if(rec.get('mfDocId')){
				if(rec.get('mfDocId').indexOf(targetMfDocId) > -1){
					return true;
				}
				else {
					return false;
				}
			}
		});
		if(cargoCombo.data.length > 0) {
			for(var i = 0; i < cargoCombo.data.length; i++){
				var proformaItems = new Array();
				var gatheringItems = new Ext.create( 'MOST.model.billing.DataGathering');
				var cd = isSelectedMasterBL ? 'blNo' : 'shipgNoteNo';
				gatheringItems.set('vslCallId', refs.ctlDtlVslCallId.getValue());
				gatheringItems.set('opeClassCd', isSelectedMasterBL ? 'I' : 'E');
				gatheringItems.set('docNo', targetMfDocId);
				gatheringItems.set('delvTpCd', cargoCombo.data.items[i].data.delvTpCd);
				gatheringItems.set('payer', payerValue);
				gatheringItems.set('payerCd', payerValue);
				gatheringItems.set('payerTpCd', refs.ctlPayer.selection.get('payerTp'));
				gatheringItems.set('userId', Token.getUserId())
				gatheringItems.set('estDt', Ext.Date.format(refs.ctlExpectedDt.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
				gatheringItems.set('expectedDeliveryDay', Ext.Date.format(new Date(), 'YmdHi'));
				gatheringItems.set('cargoType', cargoCombo.data.items[i].data.cgTpCd);
				gatheringItems.set('blSnNo', cargoCombo.data.getAt(i).get(cd));

				for( ivItem of gridItems) {
					if((ivItem.get('blSnNo') == cargoCombo.data.items[i].data.blNo
						|| ivItem.get('blSnNo') == cargoCombo.data.items[i].data.shipgNoteNo
						|| StringUtil.isNullorEmpty(ivItem.get('blSnNo'))
					) && ivItem.get('statusCd') != 'GT') {
						var cloneIvItem = ivItem.copy();
						proformaItems.push(cloneIvItem.data);
					}
				}
				gatheringItems.set('proformaItems', proformaItems);

				updateParm.get('items').push(gatheringItems.data);
			}
		}

		Ext.MessageBox.show({
			title : 'Settlement',
			msg: 'progressing...',
			width:320,
			height:0,
			wait:true,
			waitConfig: {interval:200, text:''}
		});

		updateParm.save({
			success : function(record, operation) {
				store.commitChanges();
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
						if (button === 'ok') {
							me.onSearch();
							me.onDetailSearch();
							me.flag = 'CALCULATE';
							Ext.MessageBox.hide();
						}
					});
			}
		});
	},

	// MMC
	onClickApplyFreeDays: function() {
		var me = this;
		var refs = me.getReferences();
		var theDetail = me.getViewModel().get('theDetail');
		var vslCallId = theDetail.get('vslCallId');
		var selectMasterBL = theDetail.get('masterBL');
		var selectBookingNo = theDetail.get('bookingNo');
		var isImport = selectMasterBL != null && selectMasterBL != '';
		var selectMfDocId = isImport ? selectMasterBL : selectBookingNo;
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var proformaItem = Ext.create('MOST.model.billing.ProformaInvoiceItem');
		;

		if(StringUtil.isNullorEmpty(vslCallId)
			|| StringUtil.isNullorEmpty(selectMfDocId))
		{
			MessageUtil.info("info", "datagatheringdetaile_madatory_applyfreedays");
			return;
		} else {
			if(StringUtil.isNullorEmpty(selectMfDocId)) {
				MessageUtil.info("info", "datagatheringdetaile_madatory_applyfreedays");
				return;
			}
		}

		var  mfDocIdValue = selectMfDocId;
		var opClassCd = isImport ? 'I' : 'E';
		;

		proformaItem.set({
			vslCallId: vslCallId,
			refNo2: mfDocIdValue,
			opClassCd: opClassCd,
			applyFreeDays: refs.ctlApplyFreeDays.getValue()
		});

		updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/proformainvoice/applyfreedays';
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		updateParm.set('items', new Array());
		updateParm.get('items').push(proformaItem.data);

		updateParm.save({
			success:function(){
				MessageUtil.info("info", "Save Apply FreeDays successfully");
			}
		});
	},

	//MMC
	onPrintReceiptReport: function(rec){
		var me = this;
		var refs = me.getReferences();

		var searchParm = Ext.create("MOST.model.pdfprint.SearchReportBizParm");
		var params = me.createParam(searchParm/*, ['file','serviceId','param1']*/);

		params['file'] = me.REPORT_PDF_FILE;
		params['serviceId'] = me.REPORT_PDF_FUNCTION;
		params['branchCode'] = MOST.config.Token.getBranchCode();
		params['userId'] = MOST.config.Token.getUserId();

		params['param1'] = rec.data.vslCallId;
		params['param2'] = rec.data.ivNo;
		params['param3'] = Token.getUserId();
		params['param4'] = "PDF";


		me.openPDFPreview(params);
	}
	
});