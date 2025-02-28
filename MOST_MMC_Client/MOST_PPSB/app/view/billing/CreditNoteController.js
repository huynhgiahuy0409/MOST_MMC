Ext.define('MOST.view.billing.CreditNoteController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [],

	alias: 'controller.creditnote',

	/** =========================================================================================================================
	 * CONSTANT START
	 */

	MAIN_GRID_REF_NAME: 'refCreditNoteGrid',
	MAIN_STORE_NAME: 'creditNoteStore',
	DETAIL_GRID_REF_NAME: 'refCreditNoteDetailGrid',
	DETAIL_STORE_NAME: 'creditNoteDetailStore',
	MAX_PERIOD_DAY: 90,

	INVOICE_STATUS: 'IV',
	CREATE_STATUS: 'CR',
	REJECT_STATUS: 'RJ',
	PTNR_PAYMENT_TYPE: 'PaymentType',

	CREDIT_NOTE_DTL_REPORT_PDF_FILE: 'CreditNote.jrxml',
	CREDIT_NOTE_DTL_REPORT_PDF_FUNCTION: 'MOST.billingReport.getCreditNoteReportItems',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onLoad: function () {
		var me = this,
			invoiceTypeCombo = me.getStore('invoiceTypeCombo');
		var searchParm = Ext.create('MOST.model.billing.SearchCreditNoteParm');

		me.setSearchParm(searchParm);
		me.getViewModel().setData({ theSearch: searchParm });
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');

		invoiceTypeCombo.load();
		me.setComboBoxWithLocalCache(me.PTNR_PAYMENT_TYPE, 'paymentTypeCombo');
		me.setDateInDays('ctlDateFromDt', -me.MAX_PERIOD_DAY);
		me.setDateInDays('ctlDateToDt');
		me.onRetreive();
	},
	/**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onRetreive: function () {
		var me = this,
			mainStore = me.getStore(me.MAIN_STORE_NAME),
			params = me.getSearchCondition();

		mainStore.load({
			params: params,
		});
	},

	onCreateCreditNote: function (btn, e, eOpts) {
		var me = this,
			grid = me.lookupReference(me.MAIN_GRID_REF_NAME),
			selection = grid.getSelection()[0];
		if (!selection) {
			MessageUtil.warning('warning_msg', 'Please Select a record.');
			return;
		}

		// check whether a selected record have the credit Note no
		if (!StringUtil.isNullorEmpty(selection.get('creditNoteNo'))) {
			MessageUtil.warning('warning_msg', 'The invoice have a credite Note.');
			return;
		}

		selection.set({
			userId: MOST.config.Token.getUserId(),
			workingStatus: WorkingStatus.INSERT,
		});

		me.openDetailPopup(selection);
	},

	onDBClickGrid: function (grid, record, element, rowIndex, e, eOpts) {
		var me = this;
		if (StringUtil.isNullorEmpty(record.get('creditNoteNo'))) {
			MessageUtil.warning('warning_msg', 'Please Create first.');
			return;
		}

		record.set({
			userId: MOST.config.Token.getUserId(),
			workingStatus: WorkingStatus.UPDATE,
		});

		me.openDetailPopup(record);
	},
	/**
     * EVENT HANDLER END
     * =========================================================================================================================
     * /
     /**
     * =========================================================================================================================
     * GENERAL METHOD START
     */
	getSearchCondition: function () {
		var me = this,
			refs = me.getReferences(),
			searchParm = me.getViewModel().get('theSearch'),
			params = me.createParam(searchParm),
			store = me.getStore(me.MAIN_STORE_NAME),
			pageNo = store.currentPage,
			sizePerPage = CommonConstants.PAGE_SIZE;

		params['vslCallId'] = refs.refMainVslCallIdfield.getValue();
		params['searchType'] = searchParm.get('searchType');
		params['fromDate'] = refs.ctlDateFromDt.getRawValue();
		params['toDate'] = refs.ctlDateToDt.getRawValue();

		return params;
	},
	/**
     * GENERAL METHOD END
     * =========================================================================================================================
     * /
     /**
     * =========================================================================================================================
     * DETAIL START
     */

	onDetailLoad: function () {
		var me = this,
			detailView = me.getDetailBizView(),
			recvData = detailView.items.get(0).recvData;

		me.getViewModel().set('creditNoteDetail', recvData.copy());
		me.onLoadCreditNoteDetail(recvData);
		me.dtlBtnControl(recvData);
	},

	dtlBtnControl: function (recvData) {
		var me = this,
			crnStatCode = recvData.get('crnStatCd'),
			dtlBtnSave = me.lookupReference('reBtnDetailSave'),
			dtlBtnIssued = me.lookupReference('refBtnIssuedCreditNote'),
			isAvailableSaveBtn = crnStatCode == me.INVOICE_STATUS ? true : false,
			isAvailableSIssuedBtn =
				crnStatCode == me.INVOICE_STATUS || StringUtil.isNullorEmpty(crnStatCode) ? true : false;

		dtlBtnSave.setDisabled(isAvailableSaveBtn);
		dtlBtnIssued.setDisabled(isAvailableSIssuedBtn);
		dtlBtnSave.setHidden(isAvailableSaveBtn);
		dtlBtnIssued.setHidden(isAvailableSIssuedBtn);
	},

	onLoadCreditNoteDetail: function (recvData) {
		var me = this,
			grid = me.lookupReference(me.DETAIL_GRID_REF_NAME),
			detailStore = me.getStore(me.DETAIL_STORE_NAME);

		var params = {
			ivNo: recvData.get('invoiceNo'),
		};

		detailStore.load({
			params: params,
			callback: function (records, success) {
				if (success) {
					if (records.length > 0) {
						var removeList = records.filter((record) => record.get('crnStatCd') == me.REJECT_STATUS);
						grid.setSelection(removeList);
						me.onReCalculateSummary();
					}
				}
			},
		});
	},

	onDtlDeselectCheck: function (RowModel, record, index, eOpts) {
		var me = this;

		record.set({ crnStatCd: me.CREATE_STATUS });

		// re-calculate sumamry
		me.onReCalculateSummary();
	},

	onDtlSelectCheck: function (RowModel, record, index, eOpts) {
		var me = this;

		record.set({ crnStatCd: me.REJECT_STATUS });

		// re-calculate sumamry
		me.onReCalculateSummary();
	},

	onReCalculateSummary: function () {
		var me = this,
			theDetail = me.getViewModel().get('creditNoteDetail'),
			detailStore = me.lookupReference(me.DETAIL_GRID_REF_NAME).getStore();

		var amt = 0,
			gstAmt = 0,
			totalAmt = 0,
			exRate = Number(theDetail.get('exRate')),
			frgnAmt = 0,
			frgnGstAmt = 0,
			frgnTotalAmt = 0;

		detailStore
			.getData()
			.items.filter((record) => record.get('crnStatCd') !== 'RJ')
			.forEach((record) => {
				amt += Number(record.get('aplyAmt'));
				gstAmt += Number(record.get('gstAmt'));
				totalAmt += Number(record.get('totalAmt'));
			});

		// multiply exRate for foreign rate
		frgnAmt = amt * exRate;
		frgnGstAmt = gstAmt * exRate;
		frgnTotalAmt = frgnAmt + frgnGstAmt;

		theDetail.set({
			aplyAmt: amt,
			gstAmt: gstAmt,
			totalAmt: totalAmt,
			frgnAmt: frgnAmt,
			frgnGstAmt: frgnGstAmt,
			ivAmt: frgnTotalAmt,
		});
	},

	onReCalculateUnits: function (record, newValues) {
		var me = this,
			theDetail = me.getViewModel().get('creditNoteDetail'),
			exRate = Number(theDetail.get('exRate')),
			aplyRate = Number(record.get('aplyRate')),
			gstRate = Number(record.get('gstRate')),
			ivUnit1 = record.get('ivUnit1'),
			ivUnit2 = record.get('ivUnit2'),
			ivUnit3 = record.get('ivUnit3'),
			unit1Val = Number(newValues.unit1Val),
			unit2Val = Number(newValues.unit2Val),
			unit3Val = Number(newValues.unit3Val);

		var units = 0,
			aplyAmt = 0,
			gstAmt = 0,
			totalAmt = 0,
			frgnAmt = 0,
			frgnGstAmt = 0,
			frgnTotalAmt = 0;

		if (ivUnit1) {
			if (units == 0) {
				units = unit1Val;
			}
		}
		if (ivUnit2) {
			if (units == 0) {
				units = unit2Val;
			} else {
				units = units * unit2Val;
			}
		}

		if (ivUnit3) {
			if (units == 0) {
				units = unit3Val;
			} else {
				units = units * unit3Val;
			}
		}

		aplyAmt = Number((units * aplyRate).toFixed(3));
		gstAmt = Number((aplyAmt * (gstRate / 100)).toFixed(3));
		totalAmt = Number((aplyAmt + gstAmt).toFixed(3));
		frgnAmt = aplyAmt * exRate;
		frgnGstAmt = gstAmt * exRate;
		frgnTotalAmt = Number((frgnAmt + frgnGstAmt).toFixed(3));

		record.set({
			unit1Val: unit1Val,
			unit2Val: unit2Val,
			unit3Val: unit3Val,
			aplyAmt: aplyAmt,
			gstAmt: gstAmt,
			totalAmt: totalAmt,
			frgnAmt: frgnAmt,
			frgnGstAmt: frgnGstAmt,
			frgnTotalAmt: frgnTotalAmt,
		});
	},

	onBtnDetailSave: function (btn, e, eOpts) {
		var me = this,
			theDetail = me.getViewModel().get('creditNoteDetail'),
			detailStore = me.getStore(me.DETAIL_STORE_NAME),
			formView = me.getView().down('form'),
			valueOfWorkingStatus = theDetail.get('workingStatus'),
			statusPhantom = valueOfWorkingStatus == WorkingStatus.INSERT ? true : false,
			isIssuedButton = btn.reference === 'refBtnIssuedCreditNote',
			window = me.getView().down('window');

		if (!formView.isValid()) {
			MessageUtil.warning('warning_msg', 'Please fill out madatory field.');
			return;
		}

		var creditNoteWrapperList = me.makeCreditNoteList(isIssuedButton);

		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = detailStore.getProxy().url;
		updateParm.phantom = statusPhantom;
		updateParm.set('workingStatus', valueOfWorkingStatus);
		updateParm.set('items', creditNoteWrapperList);

		updateParm.save({
			success: function () {
				MessageUtil.saveSuccess();
				window.destroy();
				if (isIssuedButton) me.onPrintCreditNoteReport(theDetail);
				me.onRetreive();
			},
		});
	},

	makeCreditNoteList: function (isIssuedButton) {
		var me = this,
			theDetail = me.getViewModel().get('creditNoteDetail'),
			detailStore = me.getStore(me.DETAIL_STORE_NAME),
			creditNoteDataList = new Array(),
			updateParmItems = new Array(),
			crnStatusCode = isIssuedButton ? me.INVOICE_STATUS : theDetail.get('crnStatCd');

		detailStore.getModifiedRecords().forEach(record => {
            var detailGridRecord = record.copy();
			detailGridRecord.set({
				userId: MOST.config.Token.getUserId(),
			});
			creditNoteDataList.push(detailGridRecord.data);
        });

		var copyDetail = theDetail.copy();
		copyDetail.set({
			crnStatCd: crnStatusCode,
			ivNos: creditNoteDataList,
			userId: MOST.config.Token.getUserId(),
		});

		updateParmItems.push(copyDetail.data);

		return updateParmItems;
	},

	onPrintCreditNoteReport: function (parm) {
		var me = this,
			theDetail = me.getViewModel().get('creditNoteDetail'),
			searchParm = Ext.create('MOST.model.pdfprint.SearchReportBizParm'),
			params = me.createParam(searchParm, ['file', 'serviceId', 'param1']);

		params['file'] = me.CREDIT_NOTE_DTL_REPORT_PDF_FILE;
		params['serviceId'] = me.CREDIT_NOTE_DTL_REPORT_PDF_FUNCTION;
		params['branchCode'] = MOST.config.Token.getBranchCode();
		params['param1'] = theDetail.get('vslCallId');
		params['param2'] = theDetail.get('creditNoteNo');
		params['param6'] = 'PDF';
		params['param7'] = 'creditNote';

		me.openPDFPreview(params);
	},

	//############################################################################################
	//# Grid edit Method - Start
	//############################################################################################
	onBeforeEdit: function (editor, context, eOpts) {
		var me = this,
			refs = me.getReferences(),
			recvData = me.getDetailBizView().items.get(0).recvData,
			grid = me.lookupReference(me.DETAIL_GRID_REF_NAME),
			selection = grid.getSelection()[0],
			isExistedUnit1 = StringUtil.isNullorEmpty(selection.get('ivUnit1')),
			isExistedUnit2 = StringUtil.isNullorEmpty(selection.get('ivUnit2')),
			isExistedUnit3 = StringUtil.isNullorEmpty(selection.get('ivUnit3'));

		if (recvData.get('crnStatCd') === me.INVOICE_STATUS) {
			return false;
		}

		refs.refEditUnit1.setDisabled(isExistedUnit1);
		refs.refEditUnit2.setDisabled(isExistedUnit2);
		refs.refEditUnit3.setDisabled(isExistedUnit3);
	},

	// Grid Edit
	onEdit: function (editor, context, eOpts) {
		var me = this,
			record = context.record,
			newValues = context.newValues;

		me.onReCalculateUnits(record, newValues);
	},

	openSearchVslInquiryPopup: function () {
		var me = this;
		var refs = me.getReferences();
		var params = {};
		me.openCodePopup('popup-vesselinquirypopup', 'refMainVslCallIdfield', params);
	},
	//############################################################################################
	//# Grid edit Event - END
	//############################################################################################
});
