Ext.define('MOST.view.billing.InvoiceListController', {
    extend: 'MOST.view.foundation.BaseViewController',

    requires: [],

    alias: 'controller.invoicinglist',

    /**
     * =========================================================================================================================
     * CONSTANT START
     */
    INIT_DATE_INTERVAL: 14,
    MAX_PERIOD_DAY: 90,
    MAX_DOWNLOAD_PERIOD: 30,

    PAY_TP_CASH: "Cash",
    PAY_TP_CREDIT: "Credit",

    dataSelection: '',
    detailView: '',
    alertYn: 'N',
    
    MAIN_GRID_REF_NAME: 'refInvoiceListGrid',
	MAIN_STORE_NAME: 'invoiceListStore',
	
	DETAIL_GRID_REF_NAME: 'refInvoiceDetailListGrid',
	DETAIL_STORE_NAME: 'invoiceListDetail',
	
	IVDTL_REPORT_PDF_FILE: 'RBL004.jrxml',
	IVDTL_REPORT_PDF_FUNCTION: 'MOST.billingReport.getInvoiceDetailReportItems',

	CASHDTL_REPORT_PDF_FILE: 'CashReceipt.jrxml',
	CASHDTL_REPORT_PDF_FUNCTION: 'MOST.billingReport.getCashReceiptReportItems',
    /**
     * CONSTANT END
     * =========================================================================================================================
     */
    /**
     * =========================================================================================================================
     * INITIALIZE START
     */
    // After Renderer Event
    onLoad: function () {
        var me = this;
        var refs = me.getReferences();
        
        var searchParm = Ext.create('MOST.model.billing.SearchInvoiceParm');

		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');

        if(MOST.config.Token.getUserType() === CONSTANTS.USER_TYPE_EXTERNAL) {
        	refs.refTransfer.setHidden(true);
        	refs.refTransferAll.setHidden(true);
        	refs.refPaid.setHidden(true);
        }
        
        me.setDateInDays('ctlDateFromDt', -me.INIT_DATE_INTERVAL);
        me.setDateInDays('ctlDateToDt');
        
        var fromDate = refs.ctlDateFromDt.getValue();
        var toDate = refs.ctlDateToDt.getValue();
        var dateString = fromDate == null ? null : Ext.Date.format(fromDate, MOST.config.Locale.getShortDate());
        
        var statusStore = me.getStore('statusCombo');
        var invoiceTypeStore = me.getStore('invoiceTypeCombo');
        var prefixStore = me.getStore('prefixCombo');
        
        statusStore.load();
        invoiceTypeStore.load();
        prefixStore.load();
        
        me.setComboBoxWithLocalCache(CacheServiceConstants.PTNR_PAYMENT_TYPE, 'paymentCombo');

//        var currencyStore = me.getStore('currencyCombo');
//        currencyStore.load({
//            params: {
//                col1: dateString
//            },
//            callback: function (records, ope, success) {
//                if (success) {
//                    var cur = currencyStore.findRecord('currency', 'VND');
//                    Ext.getCmp('ctlforeignCuCombo').select(cur);
//
//                }
//            }
//        });

        var recvData = me.getView().recvData;

        if (recvData != null) {
            me.alertYn = 'Y';
            refs.ctl_optATB.setValue({ATB_radio: 2});
            me.setDateInDays('ctlDateFromDt', -me.MAX_PERIOD_DAY);
            me.setDateInDays('ctlDateToDt');
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
    onSearchBtn: function () {
        var me = this;
        
        me.alertYn = 'N';

        me.onSearch();
    },

    onSearch: function () {
        var me = this;
        var refs = me.getReferences();
        var store = me.getStore(me.MAIN_STORE_NAME);
        var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
        var params = me.getSearchCondition();
        var theSearch = me.getViewModel().get('theSearch');
        
        if (params == null) {
            return;
        }
        
        if(!StringUtil.isNullorEmpty(params.invoiceNo)){
        	params['fromDate'] = '';
        	params['toDate'] = '';
        	
        	refs.ctlDateFromDt.setValue();
        	refs.ctlDateToDt.setValue();
        }

        if(theSearch.get('crcyCd') != null){
        	refs.refAmountFor.setText('Amount(' + theSearch.get('crcyCd') + ')');
        }
        
        store.load({
            params: params,
            callback: function (records, operation, success) {
                if (success) {
                    store.each(function (record, index) {
                        if(record.data.billDays < 0) {
                            record.data.billDays = 0;
                        }

                        if (record.data.paidSt === 'true') {
                            record.data.paidSt = true;
                        } else {
                            record.data.paidSt = false;
                        }

                        if (record.data.isFileAtt === 'Y') {
                            record.data.isFileAtt = true;
                        } else {
                            record.data.isFileAtt = false;
                        }
                    });
                    
                    store.commitChanges();
                }
                
                grid.getView().refresh();
            }
        });
    },

    onDateChange: function (control, newValue, oldValue, eOpts) {
        var me = this;
        var refs = me.getReferences();
        
        control.suspendEvent('change');
        
        if (me.alertYn == 'N') {
            if (control == refs.ctlDateFromDt) {
                validateDate = me.validatePeriodDate(newValue, refs.ctlDateToDt.getValue(), me.MAX_PERIOD_DAY);
                if (!validateDate) {
                    me.setDateInDaysByDate('ctlDateToDt', me.MAX_PERIOD_DAY, control.getValue());
                }
            } else {
                validateDate = me.validatePeriodDate(refs.ctlDateFromDt.getValue(), newValue, me.MAX_PERIOD_DAY);
                if (!validateDate) {
                    me.setDateInDaysByDate('ctlDateFromDt', -me.MAX_PERIOD_DAY, control.getValue());
                }
            }
        }
        
        control.resumeEvent('change');
    },
    
    //Non-Vessel radio button checked event
    onRadioNonVsl_CheckHandler: function (me, checked) {
        var me = this;
        var refs = me.getReferences();
        
        if (checked) {
            refs.txtVslCallId.setDisabled(true);
            if (refs.ctl_optATB.getValue().ATB_radio == '1') {
                refs.refRadioInDt.setValue(true);
                refs.refRadioAtb.setValue(false);
                refs.refRadioErp.setValue(false);
            }
        } else {
            refs.txtVslCallId.setDisabled(false);
        }
    },

    //ERP radio button checked event
    onRadioERP_CheckHandler: function (me, checked) {
        var me = this;
        var refs = me.getReferences();

        if (checked) {
            refs.refTransferAll.setDisabled(false);
        } else {
            refs.refTransferAll.setDisabled(true);
        }
    },

    // selected currency
    onSelectedCurrency: function (combo, record, eOp) {
        var me = this;
        Ext.getCmp('idAmountFor').setText('Amount' + '(' + record.data.currency + ')');
        me.onSearch();
    },
    
    //detailView checkGrid
    onChecked: function (model, record, index, eOpts) {
        if (record.data.itChk) {
            record.data.itChk = false;
        } else {
            record.data.itChk = true;
        }
    },

    // Grid Row Double
    onDblClick: function () {
        var me = this;
        var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
        var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
        
        if (selection == null) {
        	return;
        }

        selection.set('viewType', WorkingStatus.UPDATE);

        me.getView().detailViewAlias = 'app-invoicedetail';

        me.openDetailPopup(selection);
    },

    // Key Column Editable
    setGridColumnEditable: function (isCreate) {
        var me = this;
        var refs = me.getReferences();

        if (isCreate) { // ADD
            refs.ctlRequester.getEditor().setEditable(true);
            refs.ctlRequester.getEditor().setDisabled(false);
        } else { // UPDATE
            refs.ctlRequester.getEditor().setEditable(false);
            refs.ctlRequester.getEditor().setDisabled(true);
        }
    },
    
    isAdministrator: function () {
        return (MOST.config.Token.getUserType() == CONSTANTS.USER_TYPE_INTERNAL);
    },
    
    onAdd: function () {
    	var me = this;
        var refs = me.getReferences();
        
        if(MOST.config.Token.getUserType() === CONSTANTS.USER_TYPE_EXTERNAL) {
        	MessageUtil.warning("warning", "externalCreateIvMsg_BL0140");
    		return;
        } else {
            var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
            var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
            var detailView = me.getDetailBizView();
            var theVsl = me.getViewModel().get('theVsl');
            var record = Ext.create('MOST.model.billing.InvoiceList');

            me.getView().detailViewAlias = 'app-invoicedetail';

            if (theVsl != null && !StringUtil.isNullorEmpty(theVsl.get('vslCallId'))) {
            	var theVsl = me.getViewModel().get('theVsl');
                record.data = theVsl.getData();
            }
            
            record.set('viewType', WorkingStatus.INSERT);
            me.openDetailPopup(record);
        }
    },

    /**
     * EVENT HANDLER END
     * =========================================================================================================================
     */
    /**
     * DETAIL Start
     * =========================================================================================================================
     */

    onLoadDetail: function () {
        var me = this;
        var refs = me.getReferences();
        var today = new Date();
		var currencyDetailCombo = me.getStore('currencyDetailCombo');
        var costCentreCombo = me.getStore('costCentreCombo');
        var invPrefixCombo = me.getStore('invPrefixCombo');
        var invoiceCombo = me.getStore('invoiceCombo');
        var invoiceTypeStore = me.getStore('invoiceTypeCombo');
        var masterBlCombo = me.getStore('masterBlCombo');
        var bookingNoCombo = me.getStore('bookingNoCombo');
        var payerCombo = me.getStore('payerCombo');
        var prefixDetailCombo = me.getStore('prefixDetailCombo');
        var recvData = me.getDetailBizView().items.get(0).recvData;
        var payerDetail = Ext.create('MOST.model.billing.InvoiceList');

        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        var dateValue = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
        var dueDate = dateValue.getDate() + '/' + (dateValue.getMonth() + 1) + '/' + dateValue.getFullYear();
        
        me.getViewModel().setData({theDetail:recvData});
        me.getViewModel().setData({payerDetail:recvData});
        
        me.recvData = recvData;

        var theDetail = me.getViewModel().get('theDetail');
        
        DateUtil.setDateInDaysByDate(me, 'txtDueDate', 30, today);

        me.getView().center();

        theDetail.set('inDate', date);
        theDetail.set('dueDate', dueDate);
        theDetail.set('date', date);
        theDetail.set('exchangeRate', Ext.util.Format.number('1', '0.0000'));

        invPrefixCombo.load();
        costCentreCombo.load();
        invoiceCombo.removeAll();
        
        currencyDetailCombo.commitChanges();
        invPrefixCombo.commitChanges();
        costCentreCombo.commitChanges();
        invoiceCombo.commitChanges();

        if (recvData != undefined && recvData.get('viewType') == WorkingStatus.UPDATE) {
            var vslCallId = recvData.get('vslCallId');
            var jpvcListStore = me.getStore('vslCallIdPopup');
            var currency = recvData.get('currency');

            refs.txtDtlVslCallId.setValue(vslCallId);
            
            jpvcListStore.load({
                params: {
                    mode: 'textfield',
                    vslCallId: vslCallId
                },
                callback: function (records, operation, success) {
                    if (success) {
                        me.getViewModel().setData({vslDetail: records[0].data});
                    }
                }
            })
            
            if (currency == null || currency == '') {
            	theDetail.set('frCrcy', 'VND');
            }
            
            theDetail.set('ivNo', recvData.get('ivNo'));
            theDetail.set('rmk', recvData.get('rmk'));
            theDetail.set('inDate', recvData.get('ivDt'));
            theDetail.set('dueDate', recvData.get('ivDueDt'));
            
            refs.refFrCurrency.setDisabled(true);
            refs.cboPayer.setDisabled(true);
            refs.cboInvoiceNo.setDisabled(true);
            refs.refCboInvoiPre.setDisabled(true);
            refs.cboPaymentTp.setDisabled(true);
            refs.btnCreateInvoice.setDisabled(true);
            refs.btnAddItem.setDisabled(true);
            refs.btnAddFile.setDisabled(false);
            refs.btnDelFile.setDisabled(false);
            
            me.visibleDetailToolButton(ViewUtil.TOOL_DELETE, recvData.get('erpStatCd') != CommonConstants.YES);

            me.onSearchDetail();
        } else if (recvData != undefined && recvData.get('viewType') == WorkingStatus.INSERT) {
        	me.getViewModel().setData({vslDetail: recvData});

        	var vslData = me.getViewModel().get('vslDetail');
            
            refs.txtDtlVslCallId.setValue(recvData.get('vslCallId'));

            me.visibleDetailToolButton(ViewUtil.TOOL_SAVE, false);
            me.visibleDetailToolButton(ViewUtil.TOOL_DELETE, false);
            
//            prefixDetailCombo.load({
//            	params: {
//            		vslCallId: vslData.get('vslCallId')
//	        	}
//            });
            
            payerCombo.load({
            	params: {
            		vslCallId: vslData.get('vslCallId')
            	}
            });
        }
        
        masterBlCombo.load({
        	params: {
        		vslCallId: recvData.get('vslCallId')
        	}
        });
        
        bookingNoCombo.load({
        	params: {
        		vslCallId: recvData.get('vslCallId')
        	}
        });
        
        currencyDetailCombo.load({
            params: {
                col1: date
            },
            callback: function (records, operation, success) {
                if (success) {
                	 var crcyCd = recvData.get('crcyCd');
                	 
                     if (crcyCd == null || crcyCd == '') {
                    	 theDetail.set('crcyCd', 'VND');
                    	 theDetail.set('exRate', '1.000');
                     }
                     
                     for(var i = 0; i < records.length; i++){
                    	 if(records[i].get('crcyCd') == crcyCd){
                    		 theDetail.set('crcyCd', crcyCd);
                    		 theDetail.set('exRate', Ext.util.Format.number(records[i].get('ref1'), '0.0000'));
                    		 
                    		 me.onSelectCurrency(null, records[i], i);
                    		 return;
                    	 }
                     }
                }
            }
        });
        
        recvData.commit();
    },
    
    onSelectCurrency: function (ele, rec, idx) {
        var me = this;
        var refs = me.getReferences();
        var invoiceList = me.getStore('invoiceList');
        var invoiceData = invoiceList.getData().items;
        var theDetail = me.getViewModel().get('theDetail');
//        refs.txtExchangeRate.setValue(Ext.util.Format.number(rec.get('ref1'), '0.0000'));
        var rate = rec.get('ref1');

        for (var i = 0; i < invoiceData.length; i++) {
            var data = invoiceData[i];
            var frgnAmt = 0;
            var frgnGstAmt = 0;
            var totalFrgn = 0;
            
            if(data.get('frgnAmt') != null && data.get('frgnAmt') != ''){
            	frgnAmt = data.get('frgnAmt');
            }
            
            if(data.get('frgnGstAmt') != null && data.get('frgnGstAmt') != ''){
            	frgnGstAmt = data.get('frgnGstAmt');
            }
            
            if(data.get('totalFrgn') != null && data.get('totalFrgn') != ''){
            	totalFrgn = data.get('totalFrgn');
            }

            frgnAmt = parseFloat(data.get('revsAmt')) / parseFloat(rate);
            frgnGstAmt = parseFloat(data.get('gstAmt')) / parseFloat(rate);
            totalFrgn = parseFloat(data.get('payableIncsTax')) / parseFloat(rate);
            data.set('frgnAmt', frgnAmt.toFixed(3));
            data.set('frgnGstAmt', frgnGstAmt.toFixed(3));
            data.set('totalFrgn', totalFrgn.toFixed(3));
        }
    },

    //refBtnDtlRetrieve click event
    onSearchDetail: function (btn, e, eOpts) {
        var me = this;
        var paymentTp;
        var invoiceNo = '';

        var refs = me.getReferences();
        var exchangeRate = refs.txtExchangeRate.getValue();
        var invoiceListDetail = me.getStore(me.DETAIL_STORE_NAME);
        var invoiceList = me.getStore('invoiceList');
        var recvData = me.getDetailBizView().items.get(0).recvData;
        var ivDetailUpload = me.getStore('ivDetailUpload');
        var prefixDetailCombo = me.getStore('prefixDetailCombo');
        var payerCombo = me.getStore('payerCombo');
        var vslDetail = me.getViewModel().get('vslDetail');
        
        var masterBl = recvData.get('masterBl');
        var bookingNo = recvData.get('bookingNo');
        var userRefNo = new Array();
        
        if(vslDetail != null){
        	var vslCallId = vslDetail.vslCallId;
        } else {
        	var vslCallId = recvData.get('vslCallId');
        }
        
        if (StringUtil.isNullorEmpty(refs.txtDtlVslCallId.getValue())) {
            MessageUtil.info('info_msg', 'invoiceDetailJpvcEmptyMsg');
            return;
        }

        if (StringUtil.isNullorEmpty(refs.cboPaymentTp.getValue())) {
            paymentTp = "-";
        } else {
            paymentTp = refs.cboPaymentTp.getValue();
            
            if(paymentTp === me.PAY_TP_CASH || paymentTp === 'M'){
                paymentTp = 'M';
            } else if (paymentTp === me.PAY_TP_CREDIT || paymentTp === 'C') {
                paymentTp = 'C';
            } else {
                paymentTp = '-';
            }
        }
        
        if (recvData != null && StringUtil.isNullorEmpty(recvData.get('ivNo'))) {
        	invoiceNo = "";
        } else {
        	if(recvData.get('ivNo') === 'All'){
        		invoiceNo = "";
        	} else {
        		invoiceNo = recvData.get('ivNo');
        	}
        }
        
        if (masterBl != null && masterBl != '' && bookingNo != null && bookingNo != '') {
            userRefNo.push(Ext.String.format("'{0}'", masterBl));
			userRefNo.push(Ext.String.format("'{0}'", bookingNo));
        }

        if ((masterBl != null && masterBl != '') && (bookingNo == null || bookingNo == '')) {
            userRefNo.push(Ext.String.format("'{0}'", masterBl));
        }
        
        if ((masterBl == null || masterBl == '') && (bookingNo != null && bookingNo != '')) {
            userRefNo.push(Ext.String.format("'{0}'", bookingNo));
        }
        
        if (vslCallId == CommonConstants.NON_CALL_ID) {
        	prefixDetailCombo.load({
            	params: {
            		vslCallId: vslCallId
            	}
            });
            
            payerCombo.load({
            	params: {
            		vslCallId: vslCallId
            	}
            });
            
            prefixDetailCombo.commitChanges();
            payerCombo.commitChanges();
        }
        
        invoiceListDetail.load({
            params: {
                vslCallId: vslCallId,
                paymentTp: paymentTp,
                payer: recvData.get('payer'),
                ivPrfx: recvData.get('ivPrfx'),
                invoiceNo: invoiceNo,
                userRefNo: userRefNo.toString()
            },
            callback: function (records, success) {
                if (success) {
                    var ivList = records[0].get('invoiceList');
                    var theDetail = me.getViewModel().get('theDetail');

                    ivList.forEach(function (record, index, array) {
                        var amt = record.revsAmt;
                        var gstAmt = record.gstAmt;
                        var frgnAmt = parseFloat(amt) * parseFloat(exchangeRate);
                        var frgnGstAmt = parseFloat(gstAmt) * parseFloat(exchangeRate);
                        var totalFrgn = frgnAmt + frgnGstAmt;

                        record.frgnAmt = frgnAmt;
                        record.frgnGstAmt = frgnGstAmt;
                        record.totalFrgn = totalFrgn;
                        record.userId = MOST.config.Token.getUserId();
                    });

                    invoiceList.setData(records[0].get('invoiceList'));
                    
                    var amtCalcList = records[0].get('amtCalcList');
                    
                    me.calcTotalAmount(invoiceList.getData().items);
                    invoiceList.commitChanges();

                    if (recvData !== undefined && btn === undefined) {
                        var viewModel = me.getViewModel();
                        var data = viewModel.getData();
                        
                        refs.cboPayer.setValue(recvData.get('payer'));
                        viewModel.setData({payerDetail: records[0].get('invoiceList')[0]});

                        if(data.payerDetail){
                            var dueDt = data.payerDetail.ivDueDt.substr(0, 10);
                            theDetail.set('dueDate', dueDt);
                        }

                        refs.ctlIvProformaRatio.setDisabled(records[0].get('invoiceList')[0].ivPrfx === 'PRF' ? false : true);
                        
                        ivDetailUpload.setData(records[0].get('uploadItemsList'));
                        ivDetailUpload.commitChanges();
                    }
                }
            }
        });
    },
    
    //Select IV Detail Item again after choosing Payer/ IV Prefix/ Payment Type
    onSearchInvoiceDetailList: function(){
        var me = this;
        var paymentTp;
        var vslCallId = '';
        var invoiceNo = '';

        var refs = me.getReferences();
        var exchangeRate = refs.txtExchangeRate.getValue();
        var invoiceList = me.getStore('invoiceList');
        var prefixDetailCombo = me.getStore('prefixDetailCombo');
        var payerCombo = me.getStore('payerCombo');
        var invoiceListDetail = me.getStore(me.DETAIL_STORE_NAME);
        var theDetail = me.getViewModel().get('theDetail');
        var payerDetail = me.getViewModel().get('payerDetail');
        
        if (StringUtil.isNullorEmpty(refs.txtDtlVslCallId.getValue())) {
            MessageUtil.info('info_msg', 'invoiceDetailJpvcEmptyMsg');
            return;
        }
        
        vslCallId = theDetail.get('vslCallId');

        if (StringUtil.isNullorEmpty(refs.cboPaymentTp.getValue())) {
            paymentTp = "-";
        } else {
        	if(payerDetail != null){
	            paymentTp = payerDetail.get('payTpCd');
	            
	            if(paymentTp === me.PAY_TP_CASH || paymentTp === 'M'){
	                paymentTp = 'M';
	            } else if (paymentTp === me.PAY_TP_CREDIT || paymentTp === 'C') {
	                paymentTp = 'C';
	            } else {
	                paymentTp = '-';
	            }
        	}
        }
        
        if (StringUtil.isNullorEmpty(theDetail.get('ivNo'))) {
        	invoiceNo = "";
        } else {
        	if(refs.cboInvoiceNo.getValue() === 'All'){
        		invoiceNo = "";
        	} else {
        		invoiceNo = theDetail.get('ivNo');
        	}
        }
        
        if (vslCallId == CommonConstants.NON_CALL_ID) {
        	prefixDetailCombo.load({
            	params: {
            		vslCallId: vslCallId
            	}
            });
            
            payerCombo.load({
            	params: {
            		vslCallId: vslCallId
            	}
            });
            
            prefixDetailCombo.commitChanges();
            payerCombo.commitChanges();
        }

        invoiceListDetail.load({
            params: {
            	vslCallId: vslCallId,
                paymentTp: paymentTp,
                payer: refs.cboPayer.getValue(),
                ivPrfx: refs.refCboInvoiPre.getValue(),
                invoiceNo: invoiceNo
            },
            callback: function (records, success) {
                if (success) {
                    var ivList = records[0].get('invoiceList');

                    ivList.forEach(function (record, index, array) {
                        var amt = record.revsAmt;
                        var gstAmt = record.gstAmt;
                        var frgnAmt = parseFloat(amt) * parseFloat(exchangeRate);
                        var frgnGstAmt = parseFloat(gstAmt) * parseFloat(exchangeRate);
                        var totalFrgn = frgnAmt + frgnGstAmt;

                        record.frgnAmt = frgnAmt;
                        record.frgnGstAmt = frgnGstAmt;
                        record.totalFrgn = totalFrgn;
                        record.userId = MOST.config.Token.getUserId();
                    });

                    invoiceList.setData(records[0].get('invoiceList'));
                    
                    var amtCalcList = records[0].get('amtCalcList');
                    
                    me.calcTotalAmount(invoiceList.getData().items);
                    invoiceList.commitChanges();
                }
            }
        })
    },
    
    onInvoiceComboChange: function(combo, value, obj){
    	var me = this;
        var refs = me.getReferences();
        var theDetail = me.getViewModel().get('theDetail');
        
        if(theDetail.get('ivNo') != null && theDetail.get('ivNo') != ''){
        	me.onSearchDetail();
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

        theDetail.set('aplyAmt', Ext.util.Format.number(appliedAmt, '0,000'));
        theDetail.set('stdAmt', Ext.util.Format.number(standardAmt, '0,000'));
        theDetail.set('diffAmt', Ext.util.Format.number(differenceAmt, '0,000'));
    },

    calcAmount: function (unit1, unit2, unit3, aplyRate, discount, isChangeRate, adhocYn) {
        var me = this;
        var refs = me.getReferences();
        var invoiceGrid = refs.refInvoiceDetailListGrid;
        var selection = invoiceGrid.getSelection()[0];
        var unit1Val = parseFloat(selection.get('unit1Val'));
        var unit2Val = parseFloat(selection.get('unit2Val'));
        var unit3Val = parseFloat(selection.get('unit3Val'));
        var rateValue = parseFloat(selection.get('aplyRate'));
        var actualRate = parseFloat(selection.get('aplyRate'));
        var amountValue = parseFloat(selection.get('aplyAmt'));
        var gstRate = parseFloat(selection.get('gstRate'));
        var exRate = parseFloat(refs.txtExchangeRate.getValue());
        var amount = 1;
        var amountGst = 1;
        var totalAmt = 0;
        var totalFrgnAmt = 0;
        var dirtyFlag = true;
        var tempGstValue = 100;

        if (isChangeRate) {
            actualRate = aplyRate;
        }

        if (actualRate != rateValue) {
            rateValue = actualRate;
        }

        var rate = parseFloat(rateValue);

        if (rate != 0) {
            if (unit1 != '0') {
                amount = parseFloat(amount) * parseFloat(unit1);
                selection.set('unit1Val', unit1);
                dirtyFlag = true;
            } else {
                selection.set('unit1Val', unit1);
                dirtyFlag = true;
            }

            if (unit2 != '0') {
                amount = parseFloat(amount) * parseFloat(unit2);
                selection.set('unit2Val', unit2);
                dirtyFlag = true;
            } else {
                selection.set('unit2Val', unit2);
                dirtyFlag = true;
            }

            if (unit3 != '0') {
                amount = parseFloat(amount) * parseFloat(unit3);
                selection.set('unit3Val', unit3);
                dirtyFlag = true;
            } else {
                selection.set('unit3Val', unit3);
                dirtyFlag = true;
            }

            amount = (adhocYn != 'Y') ? amountValue : parseFloat(amount) * parseFloat(rate);
            amountGst = parseFloat(amount) * gstRate;
            amountGst = parseFloat(amountGst) / parseFloat(tempGstValue);

            totalAmt = parseFloat(amountGst) + parseFloat(amount);
            
            if (discount != 0 && !StringUtil.isNullorEmpty(discount)) {
                totalAmt = parseFloat(totalAmt) + parseFloat(discount);
            }
            
            totalFrgnAmt = totalAmt * exRate;
            frgnGstAmt = amountGst * exRate;
            frgnAmt = amount * exRate;

            if (!dirtyFlag) {
                amount = 0;
            }
        }

        selection.set('revsAmt', amount.toFixed(3));
        
        if(adhocYn == 'Y') {
        	selection.set('aplyAmt', amount.toFixed(3));
        }
        
        selection.set('revsAmt', amount.toFixed(3));
        selection.set('revsRate', rate.toFixed(3));
        selection.set('revsUnit1Val', unit1Val.toFixed(3));
        selection.set('revsUnit2Val', unit2Val.toFixed(3));
        selection.set('revsUnit3Val', unit3Val.toFixed(3));
        selection.set('stdAmt', amount.toFixed(3));
        selection.set('gstPercent', gstRate.toFixed(3));
        selection.set('gstAmt', amountGst.toFixed(3));
        selection.set('frgnAmt', frgnAmt.toFixed(3));
        selection.set('totalAmt', totalAmt.toFixed(3));
        selection.set('frgnGstAmt', frgnGstAmt.toFixed(3));
        selection.set('totalFrgn', totalFrgnAmt.toFixed(3));
        selection.set('dcAmt', discount);

        if (isChangeRate) {
            selection.set('aplyRate', aplyRate);
        }
    },

    // Toolbar Save Button
    onDetailSave: function () {
        var me = this;
        var refs = me.getReferences();
        var detailView = me.getDetailBizView();
        
        me.onUploadProcess();
    },

    // check paid status change
    onCheckPaidStatus: function (me, rowIndex, checked, record) {
        var me = this;
        var refs = me.getReferences();
        var store = me.getStore(me.MAIN_STORE_NAME);
        var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
        var prefixString = record.data.ivNo.substr(0, 3);
        var masterItem = Ext.create('MOST.model.billing.InvoiceList');
        
        //PFI: Proforma Invoice
        if (prefixString !== 'PRF') {
            MessageUtil.show(Ext.Msg.WARNING, 'Warning', 'prf_update_paid', {}, function () {
                record.set('paidSt', 'false');
                me.onSearch();
            });
            
            return;
        }
        
        if (record.get('erpStatCd') === 'Y') {
            MessageUtil.show(Ext.Msg.WARNING, 'Warning', 'iv_msg_update_rejected_data_already_transfer_erp', {}, function () {
                record.set('paidSt', 'false');
                me.onSearch();
            });
            
            return;
        }
        
        if(MOST.config.Token.getUserType() === CONSTANTS.USER_TYPE_EXTERNAL) {
            MessageUtil.warning("warning", "externalCreateIvMsg_BL0140");
            return;
        }
        
        masterItem = record;
        
        if (masterItem.dirty) {
            var proxy = masterItem.getProxy();
            
            proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/invoiceList/list';
            masterItem.set('isUpdatePaid', 'true');
            
            if (masterItem.data.paidSt === 'true') {
                masterItem.set('paidSt', 'Y');
            } else {
                masterItem.set('paidSt', 'N');
            }
            
            masterItem.save({
                success: function (record) {
                    me.onSearch();
                }
            });
        }
    },

    beforeclose: function () {
        var me = this;
        var refs = me.getReferences();
        var detailView = me.getDetailBizView();
        var invoiceList = me.getStore('invoiceList');
        var payerCombo = me.getStore('payerCombo');
        var ivDetailUpload = me.getStore('ivDetailUpload');

        invoiceList.clearData();
        payerCombo.clearData();
        ivDetailUpload.clearData();

        me.getViewModel().getData().vslDetail = '';
        me.getViewModel().getData().payerDetail = '';

        invoiceList.commitChanges();
        payerCombo.commitChanges();
        ivDetailUpload.commitChanges();
    },

    onSelectPayer: function (ele, newValue, oldValue, eOpts) {
        var me = this;
        var refs = me.getReferences();
        var prefixDetailCombo = me.getStore('prefixDetailCombo');
        var invoiceList = me.getStore('invoiceList');
        var payerStore = me.getStore('payerCombo');
        
        if(newValue === null && oldValue !== null){
            ele.setValue(oldValue);
            ele.fireEvent('change', ele, oldValue, "", eOpts);
            
            return;
        }

        var payerDetail = payerStore.getAt(payerStore.find('payer', newValue));
        
        me.getViewModel().setData({payerDetail: payerDetail});

        invoiceList.clearFilter();
//        prefixDetailCombo.clearFilter();

//        if (newValue != 'All') {
//        	payerDetail.set('ivPrfx', '');
//        	
//            prefixDetailCombo.filterBy(function(record){
//                if(record.get('ivPrfx') !== 'All' && record.get('payer') !== newValue){
//                    return false;
//                }
//                
//                return true;
//            }, me);
//        }

        me.calcTotalAmount(invoiceList.getData().items);
        
        //Get related IV Detail Items
        me.onSearchInvoiceDetailList();
    },
    
    onSelectCurrency: function (ele, rec, idx) {
        var me = this;
        var refs = me.getReferences();
        var invoiceList = me.getStore('invoiceList');
        var invoiceData = invoiceList.getData().items;
        var rate = rec.get('ref1');
        
        refs.txtExchangeRate.setValue(Ext.util.Format.number(rec.get('ref1'), '0.0000'));

        for (var i = 0; i < invoiceData.length; i++) {
            var data = invoiceData[i];
            var frgnAmt = data.get('frgnAmt');
            var frgnGstAmt = data.get('frgnGstAmt');
            var totalFrgn = data.get('totalFrgn');

            frgnAmt = parseFloat(data.get('aplyAmt')) / parseFloat(rate);
            frgnGstAmt = parseFloat(data.get('gstAmt')) / parseFloat(rate);
            totalFrgn = frgnAmt + frgnGstAmt;

            data.set('frgnAmt', frgnAmt.toFixed(2));
            data.set('frgnGstAmt', frgnGstAmt.toFixed(2));
            data.set('totalFrgn', totalFrgn.toFixed(2));
        }
    },

    onCreateInvoice: function () {
        var me = this;
        var refs = me.getReferences();
        var sendArray = new Array();
        var invoiceItem = Ext.create('MOST.model.billing.InvoiceList');
        var payerDetail = me.getViewModel().get('payerDetail');
        var theDetail = me.getViewModel().get('theDetail');
        var invoiceList = me.getStore('invoiceList');
        var invoiceListDetail = me.getStore(me.DETAIL_STORE_NAME);
        var invoiceCombo = me.getStore('invoiceCombo');
        var selectedRecord = refs.refInvoiceDetailListGrid.getSelectionModel().getSelection();

        if (StringUtil.isNullorEmpty(payerDetail.get('payer'))) {
            MessageUtil.info('info_msg', 'createInvoicePayerEmptyMsg');
            return;
        } else if (StringUtil.isNullorEmpty(payerDetail.get('ivPrfx'))) {
            MessageUtil.info('info_msg', 'createInvoicePrefixEmptyMsg');
            return;
        }/* else if (StringUtil.isNullorEmpty(refs.txtAccNo.getValue())) {
            MessageUtil.info('info_msg', 'createAccNoEmptyMsg');
            return;
        }*/

        if (selectedRecord.length == 0) {
            MessageUtil.info('info_msg', 'createRecordEmptyMsg');
            return;
        }

        selectedRecord.forEach(function (record, index, array) {
            if(record.crudState !== WorkingStatus.SELECT){
                record.set('workingStatus', record.crudState);
            }
            
            if(record.get('scrId') == 'Proforma'){
            	if(record.get('payTpCd') == me.PAY_TP_CREDIT){
            		record.set('payTpCd', me.PAY_TP_CASH);
            	}
            	
            	record.set('ivTp', 'P');
            }
            
            (record.get('ivPrfx') === 'PRF') ? record.set({'payTpCd' : "M"}) : record.set({'payTpCd' : "C"});
            
            sendArray.push(record.data);
        });
        
        var exChangeRate = Number(refs.txtExchangeRate.getValue());

        invoiceItem.set({
            invoiceList: sendArray,
            erpIvTpCd: refs.refCboInvoiceType.getValue(),
            currency: refs.refFrCurrency.getValue(),
            exRate: exChangeRate,
            rmk: refs.refRemark.getValue()
        });

        var proxy = invoiceItem.getProxy();
        proxy.url = invoiceListDetail.getProxy().url;

        invoiceItem.set('scrId', invoiceItem.get('invoiceList')[0].scrId);
        
        invoiceItem.save({
            success: function (records, success) {
            	MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
						if (button === 'ok') {
							 me.onDetroyView();
	                         me.onSearch();
						}
					});
            }
        })
    },
    
    // Detail Grid
    onGridChange: function (ld, newValue, oldValue, opts) {
        var me = this;
        var refs = me.getReferences();
        var invoiceGrid = refs.refInvoiceDetailListGrid;
        var selection = invoiceGrid.getSelection()[0];
        var adhocYn = selection.get('adhocYn');

        if (!StringUtil.isNullorEmpty(newValue)) {
            if (ld.dataIndex == 'unit1Val') {
                var unit1 = newValue;
                var unit3 = selection.get('unit3Val');
                var unit2 = selection.get('unit2Val');
                var rate = selection.get('aplyRate');
                var discount = selection.get('dcAmt');
                var isChangeRate = false;
            } else if (ld.dataIndex == 'unit2Val') {
                var unit1 = selection.get('unit1Val');
                var unit3 = selection.get('unit3Val');
                var unit2 = newValue;
                var discount = selection.get('dcAmt');
                var rate = selection.get('aplyRate');
                var isChangeRate = false;
            } else if (ld.dataIndex == 'unit3Val') {
                var unit1 = selection.get('unit1Val');
                var unit3 = newValue;
                var unit2 = selection.get('unit2Val');
                var rate = selection.get('aplyRate');
                var discount = selection.get('dcAmt');
                var isChangeRate = false;
            } else if (ld.dataIndex == 'aplyRate') {
                var unit1 = selection.get('unit1Val');
                var unit3 = selection.get('unit3Val');
                var unit2 = selection.get('unit2Val');
                var rate = newValue;
                var discount = selection.get('dcAmt');
                var isChangeRate = true;
            } else if (ld.dataIndex == 'dcAmt') {
                var unit1 = selection.get('unit1Val');
                var unit3 = selection.get('unit3Val');
                var unit2 = selection.get('unit2Val');
                var discount = newValue;
                var rate = selection.get('aplyRate');
                var isChangeRate = false;
            }

            me.calcAmount(unit1, unit2, unit3, rate, discount, isChangeRate, adhocYn);
        }
    },

    onInvoiceDetailGridDblClick: function () {
        var me = this;
        var refs = me.getReferences();
        var grid = me.lookupReference(me.DETAIL_GRID_REF_NAME);
        var gridStore = grid.getStore();
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var params = {
	        title: 'Unit Update'
	    };
		
        me.dataSelection = grid.getSelection()[0];
        
        me.getViewModel().set('theUnit', selection);
        
        me.openCodePopup('app-unitupdatepopup', params);
    },

    onInvoiceDetailGridClick: function () {
        var me = this;
        var refs = me.getReferences();
        var grid = refs.refInvoiceDetailListGrid;
        var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
        var theDetail = me.getViewModel().get('theDetail');
        
        if (selection == null) {
        	return;
        }

        theDetail.set('snNo', selection.data.snNo);
        theDetail.set('blNo', selection.data.blNo);
    },

    onIvGridBeforEdit: function (editor, e) {
        var me = this;
        var refs = me.getReferences();
        var invoiceDetailGrid = me.lookupReference(me.DETAIL_GRID_REF_NAME);
        var selection = invoiceDetailGrid.getSelection()[0];
        var recvData = me.getDetailBizView().items.get(0).recvData;

        if (recvData.get('viewType') !== 'C') {
            return false;
        }

        refs.cboCostCentre.setDisabled(true);
        refs.refTxtTrfDescr.setDisabled(true);
        refs.refTxtUnit1.setDisabled(StringUtil.isNullorEmpty(selection.get('ivUnit1')) || selection.get('adhocYn') != 'Y' );
		refs.refTxtUnit2.setDisabled(StringUtil.isNullorEmpty(selection.get('ivUnit2')) || selection.get('adhocYn') != 'Y' );
		refs.refTxtUnit3.setDisabled(StringUtil.isNullorEmpty(selection.get('ivUnit3')) || selection.get('adhocYn') != 'Y' );
        refs.refTxtRate.setDisabled(true);
        refs.refTxtInvoicePrefix.setDisabled(true);
    },

    onEdit: function (editor, context, row) {
        var me = this;
        var refs = me.getReferences();
        var invoiceGrid = refs.refInvoiceDetailListGrid;
        var gridStore = invoiceGrid.getStore();

        me.dataSelection = invoiceGrid.getSelection()[0];

        me.calcTotalAmount(gridStore.getData().items);
    },

    onValidateEdit: function (editor, context) {
        var me = this;
        var detailItem = me.getViewModel().get('theDetailHead');
    },

    onCancelEdit: function (rowEditing, context) {
        var me = this;

        context.record.data = me.dataSelection.data;
    },

    // Tariff Popup
    openTariffCodePopup: function () {
        var me = this;
        var refs = me.getReferences();
        var params = {
            title: 'Tariff Code List'
        };

        if (StringUtil.isNullorEmpty(refs.cboPayer.getValue())) {
            MessageUtil.info('info_msg', 'createInvoicePayerEmptyMsg');
            return;
        }
        
        if (StringUtil.isNullorEmpty(refs.refCboInvoiPre.getValue())) {
            MessageUtil.info('info_msg', 'createInvoicePrefixEmptyMsg');
            return;
        }

        me.openCodePopup('app-tariffcodepopup', 'btnAddItem', params);
    },

    onCancelInvoice: function () {
        var me = this;
        var refs = me.getReferences();
        var recvData = me.getDetailBizView().items.get(0).recvData;
        var invoiceList = me.getStore('invoiceList');
        var invoiceListDetail = me.getStore(me.DETAIL_STORE_NAME);
        var record = refs.refInvoiceDetailListGrid.store.data.items[0];
        var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
        
        me.detailView = me.getDetailBizView();
        
        if((recvData != null && !recvData.get('vslCallId')) || invoiceList.data.items.length == 0){
			MessageUtil.warning("Invoice", "selectvesselid_msg");
			return null;
        }
     
        if(recvData != null && !recvData.get('rmk')){
        	MessageUtil.warning("Invoice", "cancelRmkChk_msg");
			return null;
        }
        
        if(recvData != null && recvData.get('erpStatCd') === 'Y'){
            MessageUtil.info('info_msg', 'deleteErpRecordIVMsg');
            return;
        } else {
            invoiceList.remove(record);
        }
        
        record.set('rmk', recvData.get('rmk'));
        
		updateParm.getProxy().url = invoiceListDetail.getProxy().url;
		updateParm.phantom = false;
		updateParm.drop();
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
		updateParm.set('items', new Array());

        MessageUtil.question('confirm', 'invoicedetail_delete_message', null,
            function (button) {
                if (button === 'ok') {
                	updateParm.get('items').push(record.data);
                	updateParm.save({
            			success : function(record, operation) {
            				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
        						function(button){
            						if (button === 'ok') {
            							me.onDetroyView();
            							me.onSearch();
            						}
        						});
            			}
            		});
                } else {
                    me.onSearchDetail();
                }
            });
    },

    onDetroyView: function () {
        this.getDetailBizView().destroy();
    },

    initializeDetailStores : function(){
        var me = this;
        var refs = me.getReferences();
        var prefixDetailCombo = me.getStore('prefixDetailCombo');
        var invoiceList = me.getStore('invoiceList');
        var payerCombo = me.getStore('payerCombo');
        var invoiceGrid = refs.refInvoiceDetailListGrid;
        var gridStore = invoiceGrid.getStore();

        prefixDetailCombo.clearData();
        invoiceList.clearData();
        payerCombo.clearData();
        gridStore.clearData();

        prefixDetailCombo.removeAll();
        invoiceList.removeAll();
        payerCombo.removeAll();
        gridStore.removeAll();

        prefixDetailCombo.commitChanges();
        invoiceList.commitChanges();
        payerCombo.commitChanges();
        gridStore.commitChanges();
        invoiceGrid.view.refresh();
    },

    removeAllFromPrefix : function(commitYn){
        var me = this;
        var store = me.getStore('prefixDetailCombo');
        
        store.removeAt(store.findExact('ivPrfx', 'All'));
        
        if(commitYn){
        	store.commitChanges();
        }
    },

    insertAllToPrefix : function(commitYn){
        var me = this;
        var store = me.getStore('prefixDetailCombo');
        
        store.insert(0, [{
            ivPrfx : 'All'
        }]);

        if(commitYn){
        	store.commitChanges();
        }
    },

    insertAllToPayer: function(commitYn){
        var me = this;
        var store = me.getStore('payerCombo');
        
        store.insert(0, [{
            ptnrCd: 'All'
        }]);

        if(commitYn){
        	store.commitChanges();
        }
    },

    //COMBOBOX PAYER SELECT HANDLER EVENT (IV DETAIL SCREEN)
    onSelectPaymentType: function (ele, rec, idx) {
        var me = this;
        var refs = me.getReferences();
        var payerDetail = me.getViewModel().get('payerDetail');

        if (rec.get('code') == 'M') {
            if (!StringUtil.isNullorEmpty(payerDetail.get('ivPrfx')) && payerDetail.get('ivPrfx') != 'PRF') {
                MessageUtil.info('info_msg', 'paymentPrefixCashMsg');
                payerDetail.set('payTpCd', '');
                return;
            } else {
                MessageUtil.info('info_msg', 'paymentCashMsg');
            }
        }

        if (rec.get('code') == 'C') {
            if (!StringUtil.isNullorEmpty(payerDetail.get('ivPrfx')) && payerDetail.get('ivPrfx') == 'PRF') {
                MessageUtil.info('info_msg', 'paymentPrefixCreditMsg');
                refs.cboPaymentTp.setValue('');
                return;
            }
        }
        
        //Get Related IV Detail Items
        me.onSearchInvoiceDetailList();
    },

    //COMBOBOX INVOICE PREFIX SELECT HANDLER EVENT (IV DETAIL SCREEN)
	onSelectInvoicePrefix: function (ele, rec, idx) {
        var me = this;
        var refs = me.getReferences();
        
        refs.ctlIvProformaRatio.setDisabled(rec.get('ivPrfx') === 'PRF' ? false : true);
        
        //Get related invoice detail items
        me.onSearchInvoiceDetailList();
    },

    /**
     * DETAIL END
     * =========================================================================================================================
     */


    /**
     * =========================================================================================================================
     * GENERAL METHOD START
     */
    afterSetCodePopupData: function (xtype, targetControl, returnValue, me, parent) {
        var me = this;
        var refs = me.getReferences();
        var payerCombo = me.getStore('payerCombo');
        var prefixDetailCombo = me.getStore('prefixDetailCombo');

        if (targetControl === 'txtDtlVslCallId') {
            if (returnValue != null) {
                me.getViewModel().setData({vslDetail: returnValue.item.data});

                prefixDetailCombo.load({
                	params: {
                		vslCallId: returnValue.code
                	}
                });
                payerCombo.load({
                	params: {
                		vslCallId: returnValue.code
                	}
                });
            } else{
            	me.getViewModel().setData({vslDetail: null});
            }
        } else if (targetControl == 'btnAddItem') {
            var result = returnValue.item;
            var arrTariff = new Array();
            var invoiceStore = me.getStore('invoiceList');
            var length = invoiceStore.getData().items.length;

            Ext.Array.forEach(result, function (item) {
                var it = Ext.create('MOST.model.billing.InvoiceList');
                
                it.set('trfCd', item.trfCd);
                it.set('subTrfCd', item.subTrfCd);
                it.set('trfTpCd', item.trfTpCdNm);
                it.set('trfDescr', item.descr);
                it.set('costCentCd', item.costCntCd);
                it.set('erpStatCd', item.erpCostCent);
                it.set('gstType', item.gstTpCd);
                it.set('gstRate', item.gstRate);
                it.set('adhocYn', 'Y');
                it.set('unit1Val', '0');
                it.set('unit2Val', '0');
                it.set('unit3Val', '0');
                it.set('ivUnit1', item.ivUnit1);
                it.set('ivUnit2', item.ivUnit2);
                it.set('ivUnit3', item.ivUnit3);
                it.set('vslCallId', refs.txtDtlVslCallId.getValue());
                it.set('payer', refs.cboPayer.getValue());
                it.set('ivPrfx', refs.refCboInvoiPre.getValue());
                it.set('aplyRate', item.stdPrc);
                it.set('revsAmt', '0');
                it.set('gstAmt', '0');
                it.set('totalAmt', '0');

                it.set('frgnAmt', '0');
                it.set('frgnGstAmt', '0');
                it.set('totalFrgn', '0');

                it.set('stdRate', '0');
                it.set('stdAmt', '0');
                it.set('refNo', refs.txtRefNo.getValue());
                it.set('cud', 'C');
                it.set('userId', MOST.config.Token.getUserId());

                invoiceStore.insert(length, it);

                refs.refInvoiceDetailListGrid.getSelectionModel().select(length, true);
                length++;
            });

            invoiceStore.commitChanges();
        } else if (targetControl == 'txtVslCallId') {
        	if (returnValue != null) {
        		me.getViewModel().setData({theVsl: returnValue.item});
        		refs.ctlScn.setValue(returnValue.item.get('scn'));
				
				prefixDetailCombo.load({
                	params: {
                		scn: returnValue.item.get('scn'),
                		vslCallId: returnValue.code
                	}
                });
                payerCombo.load({
                	params: {
                		scn: returnValue.item.get('scn'),
                		vslCallId: returnValue.code
                	}
                });
        	} else {
        		me.getViewModel().setData({theVsl: null});
        	}
        } else if (xtype == 'app-unitupdatepopup') {
    		var grid = me.lookupReference(me.DETAIL_GRID_REF_NAME);
    		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
    		var theUnit = me.getViewModel().get('theUnit');
    		var gridStore = grid.getStore();
    		
    		me.calcAmount(theUnit.get('unit1Val'), theUnit.get('unit2Val'), theUnit.get('unit3Val'), selection.get('aplyRate'), 0, true, selection.get('adhocYn'));
    		me.calcTotalAmount(gridStore.getData().items);
        } else if(targetControl === 'ctlScn'){ 
			if(returnValue){
				refs.ctlScn.setValue(returnValue.code);

				if(!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))){
					refs.txtVslCallId.setValue(returnValue.item.get('vslCallId'));
					me.getViewModel().setData({theVsl:returnValue.item});
					me.onSearch();
					
					prefixDetailCombo.load({
	                	params: {
	                		scn: returnValue.item.get('scn'),
	                		vslCallId: returnValue.item.get('vslCallId')
	                	}
	                });
	                payerCombo.load({
	                	params: {
	                		scn: returnValue.item.get('scn'),
	                		vslCallId: returnValue.item.get('vslCallId')
	                	}
	                });
					
				}else {
					refs.txtVslCallId.setValue('');
					me.getViewModel().setData({theVsl:null});
					
					prefixDetailCombo.load({
	                	params: {
	                		scn: returnValue.item.get('scn'),
	                	}
	                });
	                payerCombo.load({
	                	params: {
	                		scn: returnValue.item.get('scn'),
	                	}
	                });
					
				}
			} 
		} else if(targetControl === 'ctlDtlScn'){ 
			if(returnValue){
				refs.ctlDtlScn.setValue(returnValue.code);

				if(!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))){
					refs.txtDtlVslCallId.setValue(returnValue.item.get('vslCallId'));
					me.getViewModel().setData({theVsl:returnValue.item});
					me.onSearch();
					
					prefixDetailCombo.load({
	                	params: {
	                		scn: returnValue.item.get('scn'),
	                		vslCallId: returnValue.item.get('vslCallId')
	                	}
	                });
	                payerCombo.load({
	                	params: {
	                		scn: returnValue.item.get('scn'),
	                		vslCallId: returnValue.item.get('vslCallId')
	                	}
	                });
					
				}else {
					refs.txtDtlVslCallId.setValue('');
					me.getViewModel().setData({theVsl:null});
					
					prefixDetailCombo.load({
	                	params: {
	                		scn: returnValue.item.get('scn'),
	                	}
	                });
	                payerCombo.load({
	                	params: {
	                		scn: returnValue.item.get('scn'),
	                	}
	                });
					
				}
			} 
		} 
    },

    // Search Condition
    getSearchCondition: function () {
        var me = this;
        var refs = me.getReferences();
        var store = me.getStore(me.MAIN_STORE_NAME);
        var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
        var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		var invoiceNo = searchParm.get('invoiceNo');
		var radioATB = refs.ctl_optATB.getValue().ATB_radio;
		var fromDate = refs.ctlDateFromDt.getValue();
		var toDate = refs.ctlDateToDt.getValue();
		
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		params['alertYn'] = me.alertYn;

        if(StringUtil.isNullorEmpty(invoiceNo)){
        	var dateCondition = me.checkPeriodDate("ctlDateFromDt", "ctlDateToDt", me.MAX_PERIOD_DAY, true);
        }

        if (params["ivPrfx"] === 'All') {
            params["ivPrfx"] = '';
        }

        if (dateCondition == null && invoiceNo == '') {
            return null;
        }
        
        if (dateCondition != null) {
            params["fromDate"] = dateCondition.fromDtString;
            params["toDate"] = dateCondition.toDtString;
        }

        if (radioATB === '1') {
            params['atb'] = 'true';
        } else if (radioATB === '2') {
            params['invoiceDate'] = 'true';
        } else if (radioATB === '3') {
            params['erpStatCd'] = 'true';
        }
        
        return params;
    },

    getPreviewCondition: function () {
        var me = this;
        var refs = me.getParentView().getReferences();
        var vslCallId = refs.txtVslCallId.getValue();
        var payer = refs.refsPayer.getValue();
        var invoieNo = refs.ctrlInvoiceNo.getValue();
        var status = refs.ctlstatusCombo.getValue();
        var currency = refs.ctlforeignCuCombo.getValue();
        var invoiceType = refs.ctlInvoiceTypeCombo.getValue();
        var prefix = refs.ctlInPrefixCombo.getValue();
        var radioATB = refs.ctl_optATB.getValue().ATB_radio;
        var fromDate = refs.ctlDateFromDt.getValue();
        var toDate = refs.ctlDateToDt.getValue();

        if (prefix === 'All') {
            prefix = '';
        }
        
        var params = {
            crcyCd: currency,
            jpvc: vslCallId,
            status: status,
            invoiceType: invoiceType,
            ivPrfx: prefix,
            payer: payer,
            invoiceNo: invoieNo
        };

        params["fromDate"] = Ext.Date.format(refs.ctlDateFromDt.getValue(), MOST.config.Locale.getShortDate());
        params["toDate"] = Ext.Date.format(refs.ctlDateToDt.getValue(), MOST.config.Locale.getShortDate());

        if (radioATB === '1') {
            params['atb'] = 'true';
        } else if (radioATB === '2') {
            params['invoiceDate'] = 'true';
        }
        
        return params;
    },

    checkDate: function (me, refs, dateFrom, dateTo) {
        var curDate = new Date();
        var valueCurDate = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate());
        var vlCurDate = Date.parse(valueCurDate);
        var vlDateForm = Date.parse(new Date(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate()));
        var vlDateTo = Date.parse(new Date(dateTo.getFullYear(), dateTo.getMonth(), dateTo.getDate()));
        var day = Ext.Date.DAY;
        var periodDay = Ext.Date.diff(dateFrom, dateTo, day);
        var dayToDate = Ext.Date.diff(valueCurDate, dateTo, day);
        var dayFromDate = Ext.Date.diff(dateFrom, valueCurDate, day);

        if (vlDateTo >= vlCurDate) {
            if (dayFromDate <= 90) {
                me.setDateInDays('ctlDateToDt');
            } else {
                if (dayFromDate >= me.MAX_PERIOD_DAY) {
                    me.setDateInDaysByDate('ctlDateToDt', me.MAX_PERIOD_DAY, dateFrom);
                } else {
                    me.setDateInDays('ctlDateFromDt', -dayFromDate);
                }
            }
        }
        
        if (vlDateTo < vlCurDate && periodDay != 0) {
            if (dayFromDate >= me.MAX_PERIOD_DAY) {
                me.setDateInDaysByDate('ctlDateFromDt', me.MAX_PERIOD_DAY, dateFrom);
            } else {
                me.setDateInDays('ctlDateFromDt', -dayFromDate);
            }
        }
        
        if (periodDay < 0) {
            if (dayFromDate <= 90) {
                me.setDateInDays('ctlDateToDt');
            } else {
                me.setDateInDaysByDate('ctlDateToDt', me.MAX_PERIOD_DAY, dateFrom);
            }
        }

        dateFrom = refs.ctlDateFromDt.getValue();
        dateTo = refs.ctlDateToDt.getValue();
        periodDay = Ext.Date.diff(dateFrom, dateTo, day);

        if (periodDay > me.MAX_DATE_PERIOD) {
            me.checkDate(me, refs, dateFrom, dateTo);
        }
        
        MessageUtil.alert('Warning', 'validMaxPeriod_msg', me.MAX_PERIOD_DAY);
        
        var stringFromDate = dateFrom == null ? null : Ext.Date.format(dateFrom, MOST.config.Locale.getShortDate());
        var stringToDate = dateTo == null ? null : Ext.Date.format(dateTo, MOST.config.Locale.getShortDate());

        return {
            stringFromDate: stringFromDate,
            stringToDate: stringToDate
        }
    },

    /**
     * GENERAL METHOD END
     * =========================================================================================================================
     */

    onSelectCostCentre: function (ele, rec, idx) {
        var me = this;
        var refs = me.getReferences();
        var invoiceGrid = refs.refInvoiceDetailListGrid;
        var selection = invoiceGrid.getSelection()[0];

        selection.set('costCentCd', rec.get('cd'));
    },

    onTxtTrfDescrChange: function (ld, newValue, oldValue, opts) {
        var me = this;
        var refs = me.getReferences();
        var invoiceGrid = refs.refInvoiceDetailListGrid;
        var selection = invoiceGrid.getSelection()[0];

        selection.set('trfDescr', newValue);
    },

    onAddForFileUpload: function (btn, fileField) {
        var me = this;
        var recvData = me.getDetailBizView().items.get(0).recvData;
        var store = me.getStore('ivDetailUpload');
        var input = document.querySelector("input[id='ivDetailFileUpload-button-fileInputEl']");
        
        for (var i = 0; i < input.files.length; i++) {
            var record = Ext.create('MOST.model.common.FileUpload');
            
            file = input.files[i];

            record.set('pgmId', 'BL01401');
            record.set('catgCd', recvData.get('ivNo'));
            record.set('fileStream', file);
            record.set('fileName', file.name);
            record.set('fileSize', file.size);
            record.set('workingStatus', WorkingStatus.INSERT);
            store.insert(0, record);
        }
    },

    onDelFile: function () {
        var me = this;
        var refs = me.getReferences();
        var fileGrid = refs.refIvUploadGrid;
        var fileStore = fileGrid.getStore();
        var selection = fileGrid.getSelection() == null ? null : fileGrid.getSelection();
        
        if(selection == null){
        	return;
        }
        
        Ext.each(selection, function (record) {
			record.set('workingStatus', WorkingStatus.DELETE);
			fileStore.remove(record);
		});
    },

    onIvFileDownloadDblClick: function () {
    	var me = this;
        var recvData = me.getDetailBizView().items.get(0).recvData;
        var grid = me.lookupReference('refIvUploadGrid');
        var store = me.getStore('ivDownload');
        var pgmId;
        var catgCd;
        var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
        
        if (selection == null){
        	return;
        }
        
        catgCd = recvData.get('ivNo');

        store.load({
            params: {
                pgmId: 'BL01401',
                catgCd: catgCd
            },
            callback: function (records, operation, success) {
                if (success) {
                    var content = records[0].data.content.replace(/&lt;/gi, '<').replace(/&gt;/gi, '>');
                    Ext.exporter.File.saveBinaryAs(content, records[0].data.fileName);
                }
            }
        })
    },
    
	onUploadProcess : function() {
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var store = me.getStore('ivDetailUpload');
		var frm = refs.fileForm;
    	var isFileUpload = false;
		
		if(detailView){
			var infoForm = detailView.down('form').getForm();
			
			if(infoForm.isValid()){
				var formData = new FormData(frm);
				
				store.getModifiedRecords().forEach(function(record, index, array){
					formData.append(record.data.fileName, record.data.fileStream);
					isFileUpload = true;
		    	});
				
				if(isFileUpload){
					this.fileUpload(formData);
				} else {
					me.onServerSendingProcess(); // SERVER SAVE
				}
			} else {
				MessageUtil.mandatoryFieldInValid();
			}
		}
	},
	
	fileUpload : function(formData){
		var me = this;
		var store = me.getStore('ivDetailUpload');
    	var xhr = new XMLHttpRequest();
    	
    	xhr.addEventListener('loadend', function(){
    		if(xhr.status === 200){
    			var rtnData = JSON.parse(xhr.responseText); // get filename - uuid
    			
    			store.getModifiedRecords().forEach(function(record, index, array){
    	    		record.set('ufileName', rtnData[record.get('fileName')]);
    	    	});
    			
    			me.onServerSendingProcess(); // SERVER SAVE
    		}else{
    			MessageUtil.warning('warning_msg', 'fail_msg');
    		}
    		
    		Ext.MessageBox.hide();
    	});
    	
    	xhr.open('POST',MOST.config.Locale.getRestApiDestUrl() + '/file/manage/fileupload');
    	xhr.setRequestHeader('Authorization', MOST.config.Token.getTokenType() + ' ' + MOST.config.Token.getAccessToken());
    	xhr.send(formData);
    	
    	var msgBox = Ext.MessageBox.show({
			msg: 'Uploading your data...',
			progressText: 'Progressing...',
			width:300,
			wait:true,
			waitConfig: {interval:200}
		});
	},
	
	onServerSendingProcess:function(){
		var me = this;
		var uploadItems = new Array();
		var detailView = me.getDetailBizView();
		var detailItem = me.getDetailBizView().items.get(0).recvData;
		
		if (detailItem == null) {
			return;
		}
		
		var store = me.getStore('invoiceListDetail');
		var fileUploadStore = me.getStore('ivDetailUpload');
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		// File Upload CREATE, UPDATE RECORD
		fileUploadStore.getModifiedRecords().forEach(function(record, index, array){
			record.set('fileStream', null);
			record.set('userId', MOST.config.Token.getUserId());
			record.set('workingStatus', WorkingStatus.INSERT);
			uploadItems.push(record.data);
		});
		
		// File Upload DELETE RECORD
		fileUploadStore.getRemovedRecords().forEach(function(record, index, array){
			record.set('workingStatus', WorkingStatus.DELETE);
			uploadItems.push(record.data);
		});
		
		detailItem.set('uploadItemsList', uploadItems);
		detailItem.set('userId', MOST.config.Token.getUserId());
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('userId', MOST.config.Token.getUserId());
		updateParm.set('item', detailItem.data);
		
		updateParm.save({
			success: function(record) {
				fileUploadStore.commitChanges();
				
				detailItem.set('version', record.get('newVersion'));
				detailItem.commit();
				
				MessageUtil.saveSuccess(); // Success Message
			}
		});
	},

    onTxtJpvcFocusLeave: function (val) {
        var me = this;
        var refs = me.getReferences();
        var jpvcInfo = me.getStore('jpvcInfo');

        jpvcInfo.load({
            params: {
                vslCallId: val.getValue(),
                mode: 'textfield'
            },
            callback: function (records, ope, success) {
                if (success) {

                }
            }
        })
    },

    onDetailPreview: function () {
        var me = this;
        var refs = me.getReferences();
        var params = null;
        var generatePDFInvoice = me.getStore('generatePDFInvoice');
        var detailViewAlias = me.getView().detailViewAlias;

        if (detailViewAlias == 'popup-reportinvoicelistpopup') {
            var dateFrom = refs.ctlDateFromDt.getValue();
            var dateTo = refs.ctlDateToDt.getValue();
            
            if (!(me.validatePeriodDate(dateFrom, dateTo, 30))) {
                return false;
            }
            
            params = me.getSearchCondition();
            
            var curr;
            var rateForeign;
            
            if (refs.ctlforeignCuCombo.getValue() === null) {
                curr = 'VND';
                rateForeign = '1';
            } else {
                curr = refs.ctlforeignCuCombo.getValue();
                rateForeign = rateForeign = refs.ctlforeignCuCombo.getStore().queryRecords('currency', curr)[0].get('rate');
            }
            
            params['curr'] = curr;
            params['rateForeign'] = rateForeign;
            params['userId'] = MOST.config.Token.getUserId();
            params["rptTp"] = refs.refRadioInvReportTime.getValue().rb;
            params["exportTp"] = 'PDF';
        } else if (detailViewAlias == 'app-invoicedetail') {
            me.getView().detailViewAlias = 'popup-reportinvoicedetailpopup';
            
            var record = {
                mode: 'preview'
            }
            me.openDetailPopup(record);
        } else if (detailViewAlias == 'popup-reportinvoicedetailpopup') {
            var invoiceList = me.getViewModel().getData().invoiceList.getData().items[0];
            
            if(!invoiceList){
            	MessageUtil.info('info_msg', 'After creating an invoice, you can print it out.');
            	return;
            }
            
            var isJpvc = false;
            var curr;
            var rateForeign;

            if (invoiceList.get('vslCallId') != 'NonCallId') {
                isJpvc = true
            } else {
                isJpvc = false
            }

            if (refs.refRdGrpCurrency.getValue().rb == 'rm') {
                curr = 'VND';
                rateForeign = '1';
            } else {
                if (StringUtil.isNullorEmpty(refs.cboCurrency.getValue())) {
                    MessageUtil.warning('warning_msg', 'invoice_detail_preview_currencyBlank');
                    return;
                }
                
                curr = refs.cboCurrency.getValue();
                rateForeign = refs.cboCurrency.getStore().queryBy('currency', refs.cboCurrency.getValue()).items[0].get('rate');
            }

            params = {
                vslNm: invoiceList.get('vslNm'),
                atw: invoiceList.get('atw'),
                atc: invoiceList.get('atc'),
                loa: invoiceList.get('loa'),
                grt: invoiceList.get('grt'),
                atb: invoiceList.get('atb'),
                atu: invoiceList.get('atu'),
                jpvc: invoiceList.get('vslCallId'),
                rptTp: 'IV_DTL',
                isJPVC: isJpvc,
                invoiceNo: invoiceList.get('ivNo'),
                rateForeign: rateForeign,
                curr: curr,
                exportTp: 'PDF'
            }
        }

        if (params != null) {
            generatePDFInvoice.load({
                params: params,
                callback: function (records, operation, success) {
                    if (success) {

                        me.openPDFPreview(records, operation, success);
                    }
                }
            })
        }
    },

    onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var refs = me.getReferences();
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.billing.SearchInvoiceParm';
		searchBizParm.serviceID = 'MOST.invoiceList.selectInvoiceItemList';

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},	
    
    onDetailDownload: function () {
        var me = this;
        var refs = me.getReferences();
        var params = null;
        var generatePDFInvoice = me.getStore('generatePDFInvoice');
        var detailViewAlias = me.getView().detailViewAlias;
        var recvData = me.recvData;
        
        if (detailViewAlias == 'popup-reportinvoicelistpopup') {
            var dateFrom = refs.ctlDateFromDt.getValue();
            var dateTo = refs.ctlDateToDt.getValue();
            
            if (!(me.validatePeriodDate(dateFrom, dateTo, 30))) {
                return false;
            }
            
            params = me.getSearchCondition();
            
            var curr;
            var rateForeign;
            
            if (refs.ctlforeignCuCombo.getValue() === null) {
                curr = 'VND';
                rateForeign = '1';
            } else {
                curr = refs.ctlforeignCuCombo.getValue();
                rateForeign = refs.ctlforeignCuCombo.getStore().queryRecords('currency', curr)[0].get('rate');
            }
            
            params['curr'] = curr;
            params['rateForeign'] = rateForeign;
            params['userId'] = MOST.config.Token.getUserId();
            params["rptTp"] = refs.refRadioInvReportTime.getValue().rb;
            params['exportTp'] = refs.refRadioReportType.getValue().exporttype;
        } else if (detailViewAlias == 'app-invoicedetail') {
            me.getView().detailViewAlias = 'popup-reportinvoicedetailpopup';
            
            var payerType = recvData.get('payTpCd');
            var record = {
                 mode: 'download'
                ,payerTpCd: payerType
            }
            
            me.openDetailPopup(record);
        } else if (detailViewAlias == 'popup-reportinvoicedetailpopup') {
            var invoiceList = me.getViewModel().getData().invoiceList.getData().items[0];
            var curr;
            var rateForeign;
            
            if(!invoiceList){
            	MessageUtil.info('info_msg', 'After creating an invoice, you can print it out.');
            	return;
            }
            
            if (refs.refRdGrpCurrency.getValue().rb == 'rm') {
                curr = 'VND';
                rateForeign = '1';
            } else {
                if (StringUtil.isNullorEmpty(refs.cboCurrency.getValue())) {
                    MessageUtil.warning('warning_msg', 'invoice_detail_preview_currencyBlank');
                    return;
                }
                
                curr = refs.cboCurrency.getValue();
                rateForeign = refs.cboCurrency.getStore().queryBy('currency', refs.cboCurrency.getValue()).items[0].get('rate');
            }

            params = {
                vslCallId: invoiceList.get('vslCallId'),
                invoiceNo: invoiceList.get('ivNo'),
                rateForeign: rateForeign,
                curr: curr,
                userId: Token.getUserId(),
                prfRatio: refs.ctlIvProformaRatio.getValue()
            }
            
            params['exportTp'] = refs.refDetailRadioReportType.getValue().exporttype;

            if(invoiceList.get('ivPrfx') == 'PRF'){
            	me.onSelectCashDetailReport(params);
            } else {
            	me.onSelectInvoiceDetailReport(params);
            }
            
//            if (refs.refDetailRadioReportPaymentType.getValue().paymentType == 'INVOICE') {
//                me.onSelectInvoiceDetailReport(params);
//            } else {
//                me.onSelectCashDetailReport(params);
//            }
        }
    },
    
    onSelectInvoiceDetailReport : function(parm) {
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create("MOST.model.pdfprint.SearchReportBizParm");
		var params = me.createParam(searchParm, ['file','serviceId','param1']);
		
		params['file'] = me.IVDTL_REPORT_PDF_FILE; // report format file name
		params['serviceId'] = me.IVDTL_REPORT_PDF_FUNCTION; // calling function 
		params['branchCode'] = MOST.config.Token.getBranchCode(); // branch code fro multi db
		params['param1'] = parm.vslCallId;
		params['param2'] = parm.invoiceNo;
		params['param3'] = parm.rateForeign;
		params['param4'] = parm.curr;
		params['param5'] = Token.getUserId();
		params['param6'] = 'PDF'; //print type
        params['param7'] = 'invoice' // Search Type
		
		me.openPDFPreview(params);
	},

    onSelectCashDetailReport : function(parm) {
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create("MOST.model.pdfprint.SearchReportBizParm");
		var params = me.createParam(searchParm, ['file','serviceId','param1']);
		
		params['file'] = me.CASHDTL_REPORT_PDF_FILE; // report format file name
		params['serviceId'] = me.CASHDTL_REPORT_PDF_FUNCTION; // calling function 
		params['branchCode'] = MOST.config.Token.getBranchCode(); // branch code fro multi db
		params['param1'] = parm.vslCallId;
		params['param2'] = parm.invoiceNo;
		params['param3'] = parm.prfRatio;
		params['param4'] = parm.curr;
		
		me.openPDFPreview(params);
	},

    onInvoicePreview: function (field, button, e) {
        var me = this;
        var refs = me.getReferences();
        var periodDay = Ext.Date.diff(refs.ctlDateFromDt.getValue(), refs.ctlDateToDt.getValue(), Ext.Date.DAY);
        var curr = refs.ctlforeignCuCombo.getValue();
        var mode = (field.reference == 'refBtnPreview') ? 'preview' : 'download';
        var rate;
        
        if (periodDay > me.MAX_DOWNLOAD_PERIOD) {
            MessageUtil.alert('Warning', 'invList_period_for_download_preview', me.MAX_DOWNLOAD_PERIOD);
            return;
        }
        
        if (curr === null) {
            curr = 'VND';
            rate = '1';
        } else {
            rate = refs.ctlforeignCuCombo.getStore().queryBy('currency', refs.ctlforeignCuCombo.getValue()).items[0].get('rate');
        }
        
        me.getView().detailViewAlias = 'popup-reportinvoicelistpopup';
        
        var recv = {
            curr: curr,
            rateForeign: rate,
            mode: mode
        }

        me.openDetailPopup(recv);
    },

    onPreviewLoad: function () {
        var me = this;
        var refs = me.getReferences();
        var recvData = me.getDetailBizView().items.get(0).recvData;
        
        if (recvData.mode == 'preview') {
            me.visibleDetailToolButton(ViewUtil.TOOL_PREVIEW, true);
            me.visibleDetailToolButton(ViewUtil.TOOL_DOWNLOAD, false);

            refs.refRadioExcel.setHidden(true);
            refs.refRadioPdf.setHidden(true);
        } else {
            me.visibleDetailToolButton(ViewUtil.TOOL_PREVIEW, false);
            me.visibleDetailToolButton(ViewUtil.TOOL_DOWNLOAD, true);

            refs.refRadioExcel.setHidden(false);
            refs.refRadioPdf.setHidden(false);
        }

        me.visibleDetailToolButton(ViewUtil.TOOL_SAVE, false);
        me.visibleDetailToolButton(ViewUtil.TOOL_DELETE, false);
    },

    onDetailPreviewLoad: function () {
        var me = this;
        var refs = me.getReferences();
        var recvData = me.getDetailBizView().items.get(0).recvData;

        if (recvData.mode == 'preview') {
            me.visibleDetailToolButton(ViewUtil.TOOL_PREVIEW, true);
            me.visibleDetailToolButton(ViewUtil.TOOL_DOWNLOAD, false);

            refs.refDetailRadioExcel.setHidden(true);
            refs.refDetailRadioPdf.setHidden(true);
        } else {
            me.visibleDetailToolButton(ViewUtil.TOOL_PREVIEW, false);
            me.visibleDetailToolButton(ViewUtil.TOOL_DOWNLOAD, true);

            refs.refDetailRadioExcel.setHidden(false);
            refs.refDetailRadioPdf.setHidden(false);

            if( recvData.payerTpCd != null ) {
                if(recvData.payerTpCd == 'Credit' ) {
                    refs.refDetailRadioCashReceipt.setHidden(true);
                    refs.refDetailRadioCashReceipt.setDisabled(true);
                }
            }
        }

        me.visibleDetailToolButton(ViewUtil.TOOL_SAVE, false);
        me.visibleDetailToolButton(ViewUtil.TOOL_DELETE, false);
    },

    beforerptivdetailpopupclose: function () {
        var me = this;
        var refs = me.getReferences();

        me.getView().detailViewAlias = 'app-invoicedetail';
    },

    onRdGroupChange: function (obj, newValue, oldValue, eOpts) {
        var me = this;
        var refs = me.getReferences();

        if (newValue.rb == 'others') {
            refs.cboCurrency.setDisabled(false);
        } else {
            refs.cboCurrency.setDisabled(true);
        }
    },

    onTransfer: function() {
        var  me = this
            ,store = me.getStore(me.MAIN_STORE_NAME)
            ,grid = me.lookupReference(me.MAIN_GRID_REF_NAME)
            ,selection = grid.getSelection()
            ,updateBizParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm')
            ,arrItems = new Array()
        ;

        var validObj = {
            valid: true,
            msg: null
        };

        if( selection <= 0 ) {
            MessageUtil.warning("info_msg", "notCheckTrsf_msg");
            return;
        }

        for( record of selection ) {
            var targetRecord = record.copy();
            // 1. check status
            if( record.get('statCd') != 'IV' ) {
                validObj.msg = 'notCheckTrsf_msg';
                validObj.valid = false;
                break;
            }

            // 2. check prefix
            if( record.get('ivNo').includes('PRF') ) {
                validObj.msg = 'Not Allow PRF to transfer at ERP.';
                validObj.valid = false;
                break;
            }

            // 3. 
            if( record.get('erpStatCd') === 'Y' ) {
                validObj.msg = 'iv_msg_data_already_tranffer';
                validObj.valid = false;
                break;
            }

            arrItems.push(targetRecord.data);
        }

        if( !validObj.valid ) {
            MessageUtil.warning("info_msg", validObj.msg);
            return;
        }

        MessageUtil.question("Confirm", "qestionMsgForErp", null,
	        function (button) {
	            if (button === 'ok') {
	                var proxy = updateBizParm.getProxy();
	                
	                proxy.type = 'rest';
	                proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/invoiceList/transfer';
	                
	                updateBizParm.phantom = false; // update
	                updateBizParm.set('items', arrItems);
	                updateBizParm.save({
	                    success: function (record) {
	                        me.onSearch();
	                        MessageUtil.saveSuccess();
	                    }
	                });
	            }
	        });
    },

    onTranfferAll: function () {
        var me = this;
        var msg = '';
        var refs = me.getReferences();
        var store = me.getStore(me.MAIN_STORE_NAME);
        var storeTrf = me.getStore('invoiceTrfList');
        var objIv = Ext.create('MOST.model.billing.InvoiceList');
        var arTrf = new Array();
        
        MessageUtil.question("Confirm", "Do you want to transfer these data to FAST System?", null,
            function (button) {
                if (button === 'ok') {
                    var stt = true;
                    
                    store.each(function (record, idx) {
                        if (record.get('payTpCd') === me.PAY_TP_CASH && record.get('paidSt') === false) {
                            msg = "stpaid_msg";
                        } else if (record.get('payTpCd') === me.PAY_TP_CREDIT && record.get('paidSt') === true) {
                            msg = "incorrect_paid_status_msg";
                        } else if (record.get('erpStatCd') === 'Y') {
                            msg = "iv_msg_data_already_tranffer";
                        }

                        if (msg !== "") {
                            return false;
                        }
                        
                        arTrf.push(record.data);
                    });
                    
                    objIv.set('invoiceTrfList', arTrf);
                    objIv.phantom = false;
                    
                    if (stt == false) {
                        return;
                    }
                    
                    if (objIv.dirty || arTrf.length > 0) {
                        var proxy = objIv.getProxy();
                        
                        proxy.type = 'rest';
                        proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/invoiceList/tranffer';
                        
                        objIv.save({
                            success: function (record) {
                                me.onSearch();
                                MessageUtil.saveSuccess();
                            }
                        })
                    }
                }
            });
    },

    onCheckedTrf: function (chkbox, rowIdx, checked, record, e, eOpts) {
        var me = this;
        var refs = me.getReferences();
        var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
        var store = me.getStore(me.MAIN_STORE_NAME);
        var selection = grid.getSelection() === null ? null : grid.getSelection()[0];

        if (checked) {
            record.data.chkTrf = true;
        } else {
            record.data.chkTrf = false;
        }
    },

    validatePeriodDate: function (fromDate, toDate, maxDatePeriod) {
        var me = this;

        if(fromDate == null || toDate == null){
            return true;
        }

        if (!DateUtil.validateFromToDate(fromDate, toDate)) {
            return false;
        } else if (!DateUtil.validatePeriodDate(fromDate, toDate, maxDatePeriod)) {
            return false;
        }

        return true;
    },
    
    // Text Upper Case
    onUpperCase: function (control) {
        control.setValue(control.getValue().toUpperCase());
    }
});