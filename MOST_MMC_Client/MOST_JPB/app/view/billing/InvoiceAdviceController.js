Ext.define('MOST.view.billing.InvoiceAdviceController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		'MOST.model.popup.PopupService',
		'MOST.model.billing.InvoiceAdviceDetail',
		'MOST.model.billing.InvoiceAdviceDetailHead',
		'MOST.model.billing.InvoiceAdvice',

	],

	alias: 'controller.invoiceadvice',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_PERIOD_DAY: 93,
	USER_TYPE_INTERNAL: "I", 				// MOST.config.Token.getUserType()\
	USER_TYPE_EXTERNAL: "E", 				// MOST.config.Token.getUserType()
	FORWARDER: "FWD",				//UserConfig.FORWARDER
	SHIPPING_AGENCY: "SHA",		//UserConfig.SHIPPING_AGENCY
	SHIPPER_CONSIGNEE: "CNS",		//UserConfig.SHIPPER_CONSIGNEE
	alertYN: 'N',
	alertTp: '',
	flagAction: '',
	VIEW_TYPE_CREATE: 'CREATE',
	VIEW_TYPE_UPDATE: 'UPDATE',
	CURRENT_VIEW_TYPE: '',
	MAIN_GRID_REF_NAME: 'refInvoiceAdviceGrid',
	MAIN_STORE_NAME: 'invoiceAdviceList',
	LOADING_DISCHARGING_STORE: 'loadingAndDischargingCombo',
	INVOICE_ADVICE_DTL_REPORT_PDF_FILE: 'InvoiceAdviceDetailReportToPDF.jrxml',
	INVOICE_ADVICE_DTL_REPORT_EXCEL_FILE: 'InvoiceAdviceDetailReportToExcel.jrxml',
	INVOICE_ADVICE_DTL_REPORT_FUNCTION: 'MOST.billingReport.getInvoiceAdviceDetailReportItems',
	INVOICE_ADVICE_LIST_REPORT_PDF_FILE: 'InvoiceAdviceListReportToPDF.jrxml',
	INVOICE_ADVICE_LIST_REPORT_EXCEL_FILE: 'InvoiceAdviceListReportToExcel.jrxml',
	INVOICE_ADVICE_LIST_REPORT_PDF_FILE: 'InvoiceAdviceListReportToPDF.jrxml',
	INVOICE_ADVICE_LIST_REPORT_FUNCTION: 'MOST.billingReport.getInvoiceAdviceListReportItems',
	REPORT_TYPE_PDF: 'PDF',
	REPORT_TYPE_EXCEL: 'EXCEL',
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
		var tariffTypeCombo = me.getStore('tariffTypeCombo');

		me.setDateInDays("ctlFromDt", -7);
		me.setDateInDays("ctlToDt");

		tariffTypeCombo.load();

		me.setComboBoxWithLocalCache(CacheServiceConstants.LOADING_DISCHARGING_COMBO, me.LOADING_DISCHARGING_STORE);

		var recvData = me.getView().recvData;

		if (recvData != null && recvData.srcScreen == 'vesselSchedule') {
			refs.refMainVslCallIdfield.setValue(recvData.vslCallId);
			me.onSearch();
		} else if (recvData != null) {
			refs.ctlFromDt.setValue('');
			refs.ctlToDt.setValue('');
			refs.ctlFromDt.allowBlank = true;
			refs.ctlToDt.allowBlank = true;
			me.alertTp = recvData.alertTp;
			me.alertYN = 'Y';
			me.onSearch();
		}
	},

	// Initialize Control
	onRefresh: function () {
		var me = this;
		var refs = me.getReferences();

		refs.refMainVslCallIdfield.setValue("");
		refs.ctlPartner.setValue("");
		refs.ctlAdviceNo.setValue("");
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
		me.alertYN = 'N';
		me.onSearch();
	},

	onSearch: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('invoiceAdviceList');
		var params = me.getSearchCondition();

		if (params == null) {
			return;
		}

		store.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					if (records.length > 0) {
						var recvData = me.getView().recvData;
						if (recvData != null && recvData.srcScreen == 'vesselSchedule') {
							me.openDetailPopup(records[0], 'Invoice Advice Detail');
						}
					}
					else {
						MessageUtil.noMatchData();
					}
				}
			}
		});
	},

	// Date Change Event
	onDateChange: function (control, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();

		var toDate = refs.ctlToDt.getValue();
		var fromDate = refs.ctlFromDt.getValue();

		var Difference_In_Time = null;
		var Difference_In_Days = null;
		if (control === refs.ctlFromDt) {
			Difference_In_Time = toDate.getTime() - control.getValue().getTime();
			Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24) - 1;
			if (Difference_In_Days > me.MAX_PERIOD_DAY) me.setDateInDaysByDate('ctlToDt', me.MAX_PERIOD_DAY, control.getValue());
		}
		else {
			Difference_In_Time = control.getValue().getTime() - fromDate.getTime();
			Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24) - 1;
			if (Difference_In_Days > me.MAX_PERIOD_DAY) me.setDateInDaysByDate('ctlFromDt', -me.MAX_PERIOD_DAY, control.getValue());
		}
	},

	onTxtPtnrCdTriggerClick: function (field, button, e) {
		var me = this;
		var refs = me.getReferences();
		var params = {
			searchModule: 'MT',
			sttPartner: 'active'
		};

		me.openCodePopup('popup-partnercdtypepopup', field.reference, params);
	},

	onAdd: function () {
		var me = this;
		var grid = me.lookupReference('refInvoiceAdviceGrid');
		var refs = me.getReferences();
		var store = me.getStore('invoiceAdviceList');
		var vslCallId = refs.refMainVslCallIdfield.getValue();
		var jpvc = store.findRecord('vesselCallingID', vslCallId);

		me.CURRENT_VIEW_TYPE = me.VIEW_TYPE_CREATE;
		if (vslCallId != '') {
			var recvData = Ext.create('MOST.model.billing.InvoiceAdviceDetail');
			recvData.set('vesselCallingID', vslCallId);
			me.openDetailPopup(recvData);
			me.getVesselInfo(vslCallId);
		} else {
			me.openDetailPopup(null);
		}

	},

	onAddDetail: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refinvoiceAdviceDetailGrid');
		var store = me.getStore('invoiceAdviceDetailGridList');
		var editor = grid.getPlugin('invoiceAdviceDetailtabEditor');
		var record = Ext.create('MOST.model.billing.InvoiceAdviceDetail');
		var detailView = me.getDetailBizView();
		var vslItem = me.getViewModel().get('theVsl');
		var detailItem = me.getViewModel().get('theDetailHead');

		var userType = MOST.config.Token.getUserType();


		editor.cancelEdit();

		//Clear filter for Grid
		grid.filters.clearFilters();
		grid.filters.disable();

		//Clear filter for Store
		store.clearFilter();

		if (userType === me.USER_TYPE_EXTERNAL) {
			editor.grid.down('[dataIndex=partnerCode]').getEditor().setValue(MOST.config.Token.getPtnrCode());
			record.data.partnerCode = MOST.config.Token.getPtnrCode();
		}
		var idx = 0;
		if (grid.getSelection() && grid.getSelection().length > 0) {
			idx = store.indexOfId(grid.getSelection()[0].get('id'));
		}

		store.insert(idx, record);
		grid.getSelectionModel().select(record);

		refs.ctlRequester.getEditor().setEditable(true);
		refs.ctlRequester.getEditor().setDisabled(false);

		editor.startEdit(record);
	},

	applyBusinessRule13: function () {
		var me = this;
		var refs = me.getReferences();
		var vslItem = me.getViewModel().get('theVsl');
		var cgTpCd = vslItem.get("cgTpCd");
		var trfType = refs.refTariffTp.getValue();
		var operationType = refs.refLdDs.getValue();
		var blNo = refs.refBlNo.getValue();
		var snNo = refs.refSnNo.getValue();

		if (cgTpCd != 'OIMR' && cgTpCd != 'LQN' && cgTpCd != 'LQE') {
			if ((trfType === 'GC' || trfType === 'WC')) {
				if (operationType == null || operationType == '') {
					MessageUtil.warning("invoiceadvicedetail", "ivAdvice_BL01101004B_msg");
					return;
				} else {
					if (operationType === 'LD' && (snNo == null || snNo == '')) {
						MessageUtil.warning("invoiceadvicedetail", "ivAdvice_BL01101004_msg");
						return;
					} else if (operationType === 'DS' && (blNo == null || blNo == '')) {
						MessageUtil.warning("invoiceadvicedetail", "ivAdvice_BL01101005_msg");
						return;
					} else {
						me.confirmAddUpdate();
					}
				}
			} else {
				if (operationType != null && operationType != '') {
					if ((snNo == null || snNo == '') && (blNo == null || blNo == '')) {
						MessageUtil.question('invoiceadvicedetail', 'ivAdvice_BL01101003_msg', null,
							function (button) {
								if (button === 'ok') {
									me.confirmAddUpdate();
								}
							}
						);
					} else {
						me.confirmAddUpdate();
					}
				} else {
					me.confirmAddUpdate();
				}
			}
		} else {
			me.confirmAddUpdate();
		}
	},

	confirmAddUpdate: function () {
		var me = this;
		if (me.flagAction === 'ADD') {
			me.onAddIvAdviceDetail();
		} else if (me.flagAction === 'UPDATE') {
			me.onUpdateIvAdviceDetail();
		}
	},

	onAddIvAdviceDetailBtnClick: function () {
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var requester = me.getViewModel().get('theRequester');
		var store = me.getStore('invoiceAdviceDetailGridList');

		if (detailView) {
			var infoForm = detailView.down('form').getForm();

			if (infoForm.isValid()) {
				//Validation: should select specific JPVC No.
				if (refs.ctlDetailJpvcfield.getValue() == null || refs.ctlDetailJpvcfield.getValue() == '') {
					MessageUtil.warning("warning_msg", "goodsreceipt_jpvc_input_msg");
					return;
				}

				//Validation: Requester should be unique
				if (requester != null) {
					var storeData = store.getData();
					var idx = 0;
					for (idx = 0; idx < storeData.length; idx++) {
						if (storeData.getAt(idx).get("partnerCode") !== refs.refRequester.getValue()) {
							MessageUtil.warning("invoiceadvicedetail", "requester_unique_msg");
							return;
						}
					}
				}

				//Validation: Mt/M3 shoulbe be less than 100000
				if (refs.refMT.getValue() >= 100000 || refs.refM3.getValue() >= 100000) {
					MessageUtil.warning("invoiceadvicedetail", "ivAdvice_MtM3_msg");
					return;
				}

				me.flagAction = "ADD";
				me.applyBusinessRule13();
			} else {
				MessageUtil.mandatoryFieldInValid();
			}
		}

	},

	onAddIvAdviceDetail: function () {
		var me = this;
		var refs = me.getReferences();
		var detailGrid = me.lookupReference('refinvoiceAdviceDetailGrid');
		var store = me.getStore('invoiceAdviceDetailGridList');
		var record = Ext.create('MOST.model.billing.InvoiceAdviceDetail');
		var detailView = me.getDetailBizView();
		var vslItem = me.getViewModel().get('theVsl');
		var detailItem = me.getViewModel().get('theDetailHead');
		var userType = MOST.config.Token.getUserType();

		var requester = me.getViewModel().get('theRequester');
		var payer = me.getViewModel().get('thePayer');

		//Clear filter for Grid
		detailGrid.filters.clearFilters();
		detailGrid.filters.disable();

		//Clear filter for Store
		store.clearFilter();

		var idx = 0;

		if (detailGrid.getSelection() && detailGrid.getSelection().length > 0) {
			idx = store.indexOfId(detailGrid.getSelection()[0].get('id'));
		}

		if (requester.data) {
			record.set('partnerTypeCode', (requester.data != null ? requester.data.ptnrType : ''));
			record.set('partnerName', (requester.data != null ? requester.data.ptnrName : ''));
		} else {
			record.set('partnerTypeCode', (requester != null ? requester.ptnrType : ''));
			record.set('partnerName', (requester != null ? requester.ptnrName : ''));
		}

		if (payer.data) {
			record.set('payerTpCd', (payer.data != null ? payer.data.ptnrType : ''));
			record.set('payerName', (payer.data != null ? payer.data.ptnrName : ''));
		} else {
			record.set('payerTpCd', (payer != null ? payer.ptnrType : ''));
			record.set('payerName', (payer != null ? payer.ptnrName : ''));
		}

		record.set('partnerCode', refs.refRequester.getValue());
		record.set('payerCd', refs.refPayer.getValue());

		record.set('tarrifTypeCode', refs.refTariffTp.getValue());
		record.set('tarrifTypeName', refs.refTariffTp.getRawValue());

		record.set('operationTypeCode', refs.refLdDs.getValue());
		record.set('operationTypeName', refs.refLdDs.getRawValue() === 'Select' ? '' : refs.refLdDs.getRawValue());

		var cmdt = refs.ctlCmdtCode.getValue();
		if (StringUtil.isNullorEmpty(cmdt)) {
			cmdt = null;
		}

		record.set('commodityCode', cmdt);
		record.set('wgt', refs.refMT.getValue());
		record.set('msrmt', refs.refM3.getValue());
		record.set('qty', refs.refQty.getValue());
		record.set('rmk', refs.refRemark.getValue());
		record.set('blNo', refs.refBlNo.getValue());
		record.set('shipgNoteNo', refs.refSnNo.getValue());
		record.set('userId', MOST.config.Token.getUserId());
		record.set('workingStatus', 'C');
		record.set('ackStatusCode', 'P');

		//Duplicated Validation
		var isValidated = (me.onDuplicatedValidation(record, -1));
		if (isValidated) {
			store.insert(idx, record);
			detailGrid.getSelectionModel().select(record);

			me.onInitializeControls();
		}
	},

	onInitializeControls: function () {
		var me = this;
		var refs = me.getReferences();

		//refs.refRequester.setValue('');
		refs.refPayer.setValue('');
		refs.refTariffTp.setValue('');

		refs.refLdDs.setValue('');
		refs.ctlCmdtCode.setValue('');
		refs.refMT.setValue('');
		refs.refM3.setValue('');
		refs.refQty.setValue('');

		refs.refBlNo.setValue('');
		refs.refSnNo.setValue('');
		refs.refRemark.setValue('');

		refs.refBtnCreate.setDisabled(false);
		refs.refRequester.setDisable(true);

		me.setSummaryInfoCalc();
	},

	onDuplicatedValidation: function (record, index) {
		var me = this;
		var cgNo = '';
		var refs = me.getReferences();
		var detailGrid = me.lookupReference('refinvoiceAdviceDetailGrid');
		var store = me.getStore('invoiceAdviceDetailGridList');
		var keys = ['partnerCode', 'payerCd', 'tarrifTypeCode', 'shipgNoteNo', 'blNo'];

		if (index === -1) {
			cgNo = (record.get('operationTypeName') === '') ? ''
				: (record.get('operationTypeName') === 'LD') ? record.get('shipgNoteNo') : record.get('blNo');
			var compareValue = record.getData().partnerCode + record.getData().payerCd + record.getData().tarrifTypeCode + cgNo;
		} else {
			cgNo = (refs.refLdDs.getValue() === '') ? ''
				: (refs.refLdDs.getValue() === 'LD') ? refs.refSnNo.getValue() : refs.refBlNo.getValue();
			var compareValue = refs.refRequester.getValue() + refs.refPayer.getValue() + refs.refTariffTp.getValue() + cgNo;
		}

		var idx = store.findBy(function (item) {
			return me.getRecordConcatString(item, keys) === compareValue;
		});

		if (idx >= 0) {
			if (store.getAt(idx) == record) {
				return true;
			} else {
				MessageUtil.warning('warning_msg', 'ivAdvice_Douplicated_BL01101016_msg');
				return false;
			}
		}

		return true;
	},

	onUpdateIvAdviceDetailBtnClick: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refinvoiceAdviceDetailGrid;
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var detailView = me.getDetailBizView();
		var userType = MOST.config.Token.getUserType();

		if (selection == null) return;
		selection.set('ackStatusCode', 'P');
		//Validation: Cannot update Acknowledge data
		if (selection.data.ackStatusCode === "C") {
			MessageUtil.warning("invoiceadvicedetail", "remove_invoiceadvicedetail_msg");
			return;
		}

		if (detailView) {
			var infoForm = detailView.down('form').getForm();

			if (infoForm.isValid()) {
				//Duplicated Validation
				var isValidated = (me.onDuplicatedValidation(selection));
				if (isValidated) {
					//Validation: Mt/M3 shoulbe be less than 100000
					if (refs.refMT.getValue() >= 100000 || refs.refM3.getValue() >= 100000) {
						MessageUtil.warning("invoiceadvicedetail", "ivAdvice_MtM3_msg");
						return;
					}
					me.flagAction = "UPDATE";
					me.applyBusinessRule13();
				}
			} else {
				MessageUtil.mandatoryFieldInValid();
			}
		}
	},

	onUpdateIvAdviceDetail: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refinvoiceAdviceDetailGrid;
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var detailView = me.getDetailBizView();
		var payer = me.getViewModel().get('thePayer');

		if (selection.crudState != 'C')
			selection.set('workingStatus', WorkingStatus.UPDATE);
		if (payer.data) {
			selection.set('payerTpCd', (payer.data != null ? payer.data.ptnrType : ''));
			selection.set('payerName', (payer.data != null ? payer.data.ptnrName : ''));
		} else {
			selection.set('payerTpCd', (payer != null ? payer.ptnrType : ''));
			selection.set('payerName', (payer != null ? payer.ptnrName : ''));
		}
		selection.set('payerCd', refs.refPayer.getValue());
		selection.set('tarrifTypeCode', refs.refTariffTp.getValue());
		selection.set('tarrifTypeName', refs.refTariffTp.getRawValue());
		selection.set('operationTypeCode', refs.refLdDs.getValue());
		selection.set('operationTypeName', refs.refLdDs.getRawValue());

		var cmdt = refs.ctlCmdtCode.getValue();
		if (StringUtil.isNullorEmpty(cmdt)) {
			cmdt = null;
		}
		selection.set('commodityCode', cmdt);
		selection.set('wgt', refs.refMT.getValue());
		selection.set('msrmt', refs.refM3.getValue());
		selection.set('qty', refs.refQty.getValue());
		selection.set('rmk', refs.refRemark.getValue());
		selection.set('blNo', refs.refBlNo.getValue());
		selection.set('shipgNoteNo', refs.refSnNo.getValue());
		selection.set('userId', MOST.config.Token.getUserId());
		selection.set('ackStatusCode', 'P');

		me.setSummaryInfoCalc();
	},

	onDeleteIvAdviceDetailBtnClick: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('invoiceAdviceDetailGridList');
		var grid = refs.refinvoiceAdviceDetailGrid;
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var detailView = me.getDetailBizView();
		var userType = MOST.config.Token.getUserType();
		if (selection == null) return;

		//Validation: Permision
		if (userType === 'E') {
			//Validation: Cannot update Acknowledge data
			if (selection.data.ackStatusCode === "C") {
				MessageUtil.warning("invoiceadvicedetail", "remove_invoiceadvicedetail_msg");
				return;
			}

			if (MOST.config.Token.getPtnrCode() != selection.data.partnerCode
				&& MOST.config.Token.getPtnrCode() != refs.ctlSA.getValue()) {
				MessageUtil.warning("invoiceadvicedetail", "modifyingPermission_msg");
				return;
			}
		}

		if (selection.crudState == 'C') {
			Ext.each(selection, function (record) {
				record.set('workingStatus', WorkingStatus.DELETE);
				store.remove(record);
			});
		}
		else {
			Ext.each(selection, function (record) {
				selection.set('workingStatus', WorkingStatus.DELETE);
			});
		}
	},

	onClearIvAdviceDetailBtnClick: function () {
		var me = this;
		var refs = me.getReferences();

		if (MOST.config.Token.getUserType() == 'E') {
			var requesterItem = new Ext.create('MOST.model.popup.PopupService')
			if (MOST.config.Token.getAgencyCode() != '') {
				requesterItem.set('ptnrCode', MOST.config.Token.getAgencyCode());
				requesterItem.set('ptnrName', MOST.config.Token.getPtnrNm());
				requesterItem.set('ptnrType', 'SHA');
			} else {
				var patnerInfos = MOST.config.Token.getPatnerInfos();
				requesterItem.set('ptnrCode', MOST.config.Token.getPtnrCode());
				requesterItem.set('ptnrName', MOST.config.Token.getPtnrNm());
				requesterItem.set('ptnrType', patnerInfos[0].ptnrType);
			}
			me.getViewModel().setData({ theRequester: requesterItem });
			// refs.refRequester.setValue(MOST.config.Token.getPtnrCode());
			refs.refRequester.setValue('');
		} else {
			refs.refRequester.setValue('');
			me.getViewModel().setData({ theRequester: new Ext.create('MOST.model.popup.PopupService') });
		}

		me.getViewModel().setData({ thePayer: new Ext.create('MOST.model.popup.PopupService') });
		refs.refPayer.setValue();
		refs.refTariffTp.setValue();
		refs.refLdDs.setValue();
		refs.ctlCmdtCode.setValue();
		refs.refMT.setValue();
		refs.refM3.setValue();
		refs.refQty.setValue();
		refs.refRemark.setValue();
		refs.refBlNo.setValue();
		refs.refSnNo.setValue();
		refs.refRequester.setDisable(false);

		if (refs.refBtnCreate) {
			refs.refBtnCreate.setDisabled(false);
		}
		if (refs.refBtnUpdate) {
			refs.refBtnUpdate.setDisabled(true);
		}
		if (refs.refBtnClear) {
			refs.refBtnClear.setDisabled(false);
		}
		if (refs.refBtnDelete) {
			refs.refBtnDelete.setDisabled(true);
		}
	},

	onIvAdviceDetailGrid_CellClick: function (ctx, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refinvoiceAdviceDetailGrid;
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if (selection == null) return;

		var requesterItem = new Ext.create('MOST.model.popup.PopupService');
		requesterItem.set('ptnrCode', selection.get("partnerCode"));
		requesterItem.set('ptnrName', selection.get("partnerName"));
		requesterItem.set('ptnrType', selection.get("partnerTypeCode"));
		me.getViewModel().setData({ theRequester: requesterItem });

		var payerItem = new Ext.create('MOST.model.popup.PopupService');
		payerItem.set('ptnrCode', selection.get("payerCd"));
		payerItem.set('ptnrName', selection.get("payerName"));
		payerItem.set('ptnrType', selection.get("payerTpCd"));
		me.getViewModel().setData({ thePayer: payerItem });

		refs.refRequester.setDisable(true);
		refs.refRequester.setValue(selection.get("partnerCode"));

		refs.refPayer.setValue(selection.get("payerCd"));
		refs.refTariffTp.setValue(selection.get("tarrifTypeCode"));
		refs.refLdDs.setValue(selection.get("operationTypeCode"));
		refs.ctlCmdtCode.setValue(selection.get("commodityCode"));
		refs.refMT.setValue(selection.get("wgt"));
		refs.refM3.setValue(selection.get("msrmt"));
		refs.refQty.setValue(selection.get("qty"));
		refs.refRemark.setValue(selection.get("rmk"));
		refs.refBlNo.setValue(selection.get("blNo"));
		refs.refSnNo.setValue(selection.get("shipgNoteNo"));

		refs.refBtnCreate.setDisabled(false);
		refs.refBtnUpdate.setDisabled(false);
		refs.refBtnClear.setDisabled(false);
		refs.refBtnDelete.setDisabled(false);
	},

	//detailView checkGrid
	onChecked: function (model, record, index, eOpts) {
		if (record.data.itChk) {
			record.data.itChk = false;
		}
		else {
			record.data.itChk = true;
		}
	},

	// Grid Row Double
	onDblClick: function () {
		var me = this;
		var grid = me.lookupReference('refInvoiceAdviceGrid');

		me.getView().detailViewAlias = 'app-invoiceadvicedetail';

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if (selection == null) return;

		me.CURRENT_VIEW_TYPE = me.VIEW_TYPE_UPDATE;

		me.openDetailPopup(selection);
		me.getVesselInfo(selection.data.vesselCallingID);
	},

	getVesselInfo: function (vslCallId) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('vesselCallListPopupStore');
		refs.ctlDetailJpvcfield.setDisabled(true);
		var params;
		params = {
			vslCallId: vslCallId,
		}
		store.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					refs.ctlDetailJpvcfield.setValue(records[0].data.vslCallId);
					refs.ctlvoyage.setValue(records[0].data.voyage);
					refs.ctlvesselName.setValue(records[0].data.vslNm);
					refs.ctlSA.setValue(records[0].data.arrvSaId);
					refs.ctlDetailETA.setValue(records[0].data.eta);
					refs.ctlberthNo.setValue(records[0].data.berthLoc);
					refs.ctlDetailETD.setValue(records[0].data.etd);
					me.getViewModel().setData({ theVsl: records[0] });
				}
			}
		});
	},

	//detail grid
	onEditForDetail: function (editor, context, row) {
		var me = this;
		var refs = me.getReferences();
		var requesterStore = me.getStore("ionvoiceAdviceDetailRquesterCombo");
		var payerStore = me.getStore("ionvoiceAdviceDetailPayerCombo");
		context.record.data.workingStatus = context.record.crudState;
		context.record.set("ackStatusCode", "P");
		var grid = me.lookupReference('refinvoiceAdviceDetailGrid');
		var ptnrType = '';
		//		var requestIdx = requesterStore.findBy(function(item) {
		//          return (item.get('ptnrCode') === context.record.data.partnerCode);
		//		});
		//		
		//		if(requestIdx >=0 ){
		//			var record = requesterStore.getAt(requestIdx);
		//			context.record.set("partnerTypeCode", record.get("ptyDivCd"));
		//		}
		ptnrType = context.record.data.partnerTypeCode;

		requesterStore.each(function (record) {
			if (record.get('ptnrCode') == context.record.data.partnerCode && record.get('ptnrType') == ptnrType) {
				// 				filterValue = record;
			}
		});


		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var payerIdx = payerStore.findBy(function (item) {
			return (item.get('ptnrCode') === context.record.data.payerCd);
		});

		if (payerIdx >= 0) {
			var record = payerStore.getAt(payerIdx);
			context.record.set("payerTpCd", record.get("ptyDivCd"));
		}
		refs.ctlRequester.getEditor().setValue(context.record.data.partnerCode);
		refs.ctlPayer.getEditor().setValue(context.record.data.payerCd);
	},

	// Grid Validate Edit
	onValidateEdit: function (editor, context) {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetailHead');
		var partnerItem = me.getViewModel().get('theRequester');
		if (detailItem != null) {
			if (partnerItem != null) {
				context.newValues.partnerCode = partnerItem.data.ptyCd;
				var idx = context.store.findExact("partnerCode", context.newValues.partnerCode);
				if (idx < 0) {
					MessageUtil.warning("invoiceadvicedetail", "requester_unique_msg");
					return false;
				}
			}


			var idx2 = context.store.findBy(function (item) {
				return (item.get('payerCd') === context.newValues.payerCd && item.get('tarrifTypeCode') === context.newValues.tarrifTypeCode)
			});

			if (idx2 > 0) {

				MessageUtil.warning("invoiceadvicedetail", "payer_tariff_unique_msg");
				return false;


			}

		}
		if (context.record.data.operationTypeCode == null || context.record.data.operationTypeCode === '') {
			if (StringUtil.isNullorEmpty(refs.ctlBLNo.getEditor().getValue()) && StringUtil.isNullorEmpty(refs.ctlSNNo.getEditor().getValue())) {
				MessageUtil.question('invoiceadvicedetail', 'add_invoiceadvicedetail_operationType_msg', null,
					function (button) {
						if (button === 'cancel') {
							return false;
						}
					}
				);
			}
		}
	},

	// Grid Cancel Edit
	onCancelEdit: function (rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},

	//detail tab Double Click
	onDblClickDetail: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refinvoiceAdviceDetailGrid');

		var requesterStore = me.getStore('ionvoiceAdviceDetailRquesterCombo');
		var payerStore = me.getStore('ionvoiceAdviceDetailPayerCombo');
		var editor = grid.getPlugin('invoiceAdviceDetailtabEditor');

		var filterValue;

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if (selection == null) return;
		var ptnrTypeCode = selection.data.partnerCode.substring(5);
		//var ptnrTypeCode = selection.data.partnerTypeCode;
		var payerTpCd = selection.data.payerTpCd;

		requesterStore.each(function (record) {
			/*if(record.get('ptnrCode') == selection.data.partnerCode && record.get('ptnrType') == ptnrTypeCode) {
				filterValue = record;
			}*/
			if (record.get('ptnrCode') == selection.data.partnerCode.substring(0, 4) && record.get('ptnrType') == ptnrTypeCode) {
				filterValue = record;
			}
		});
		editor.grid.down('[dataIndex=partnerCode]').getEditor().setValue(filterValue.data.ptyTpCd);

		payerStore.each(function (record) {
			if (record.get('ptnrCode') == selection.data.payerCd && record.get('ptnrType') == payerTpCd) {
				filterValue = record;
			}
		});
		editor.grid.down('[dataIndex=payerCd]').getEditor().setValue(filterValue.data.ptyTpCd);

		me.setGridColumnEditable(selection.phantom);
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

	onRemoveDetail: function () {
		var me = this;
		var grid = me.lookupReference('refinvoiceAdviceDetailGrid');
		var store = me.getStore('invoiceAdviceDetailGridList');
		var selection = grid.getSelection() == null ? null : grid.getSelection();

		if (selection == null) return;

		Ext.each(selection, function (record) {
			if (record.data.ackStatusCode === "C") {
				MessageUtil.warning("invoiceadvicedetail", "remove_invoiceadvicedetail_msg");
			} else {
				record.set('workingStatus', WorkingStatus.DELETE);
				store.remove(record);
			}

		});
	},

	// Text Upper Case
	onUpperCase: function (control) {
		control.setValue(control.getValue().toUpperCase());
	},

	afterSetCodePopupData: function (xtype, targetControl, returnValue) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('invoiceAdviceList');

		if (targetControl === 'ctlDetailJpvcfield' || targetControl === 'refMainVslCallIdfield') { // JPVC Popup
			if (returnValue) {
				me.getViewModel().setData({ theVsl: returnValue.item });
				store.load({
					params: {
						vesselCallingID: returnValue.code,
						authority: me.getPatnerType(),
						ptnrCd: MOST.config.Token.getPtnrCode(),
					},
					callback: function (records, operation, success) {
						if (success) {
							if (records.length > 0) {
								if (records[0].data != null) {
									if (targetControl === 'ctlDetailJpvcfield') {
										MessageUtil.question('invoiceadvicedetail', 'duplicate_adviceNo_msg', null,
											function (button) {
												if (button === 'ok') {
													me.setDetailInitialize(records[0]);
												}
											}
										);
									}
								}
							} else {
								if (targetControl === 'ctlDetailJpvcfield') {
									me.setDetailInitialize(null);
								}
							}
						}
					}
				});
			}
			else {
				me.getViewModel().setData({ theVsl: null });
			}
		} else if (targetControl == 'refRequester') {
			me.getViewModel().setData({ theRequester: returnValue.item });
		} else if (targetControl == 'refPayer') {
			me.getViewModel().setData({ thePayer: returnValue.item });
		} else if(targetControl === 'ctlScn'){ 
			if(returnValue){
				refs.ctlScn.setValue(returnValue.code);

				if(!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))){
					refs.refMainVslCallIdfield.setValue(returnValue.item.get('vslCallId'));
					me.getViewModel().setData({theVsl:returnValue.item});
				}else {
					refs.refMainVslCallIdfield.setValue('');
					me.getViewModel().setData({theVsl:null});
				}
			} 
		}
	},


	// Grid combo Renderer
	onGridComboRenderer: function (val, cell, row) {
		var me = this;
		var refs = me.getReferences();
		var codeComboStore = null;
		var displayFieldName = 'scdNm';
		var codeFieldName = 'scd';
		var ptnrType = '';

		if (cell.column.dataIndex === 'partnerCode') {
			var displayFieldName = 'ptyTpCd';
			var codeFieldName = 'ptyTpCd';
			ptnrType = row.data.partnerTypeCode;
			codeComboStore = me.getViewModel().getStore('ionvoiceAdviceDetailRquesterCombo');

		}
		if (cell.column.dataIndex === 'payerCd') {
			var displayFieldName = 'ptyTpCd';
			var codeFieldName = 'ptyTpCd';
			ptnrType = row.data.payerTpCd;
			codeComboStore = me.getViewModel().getStore('ionvoiceAdviceDetailPayerCombo');
		}
		if (cell.column.dataIndex === 'tarrifTypeCode') {
			codeComboStore = me.getViewModel().getStore('tariffTypeCombo');
		}

		if (codeComboStore != null) {
			var indx = -1;
			if (cell.column.dataIndex == 'partnerCode') {
				var filterValue;
				codeComboStore.each(function (record) {
					/*if(record.get('ptnrCode') == val.substring(0,4) && record.get('ptnrType') == val.substring(5)) {
						filterValue = record;
					}*/
					if (record.get('ptnrCode') == val.substring(0, 4) && record.get('ptnrType') == ptnrType) {
						filterValue = record;
					}
				});
				indx = codeComboStore.indexOf(filterValue);
			} else if (cell.column.dataIndex == 'payerCd' || cell.column.dataIdex == 'tarrifTypeCode') {
				var filterValue;
				codeComboStore.each(function (record) {
					/*if(record.get('ptnrCode') == val.substring(0,4) && record.get('ptnrType') == val.substring(5)) {
						filterValue = record;
					}*/
					if (record.get('ptnrCode') == val.substring(0, 4) && record.get('ptnrType') == ptnrType) {
						filterValue = record;
					}
				});
				indx = codeComboStore.indexOf(filterValue);
				//				indx = codeComboStore.find(codeFieldName, val);
			} else {
				indx = codeComboStore.find(codeFieldName, val);
			}

			if (indx != -1) {
				return codeComboStore.getAt(indx).get(displayFieldName);
			}
		}

		return '';
	},

	isAdministrator: function () {
		return (MOST.config.Token.getUserType() == me.USER_TYPE_INTERNAL);
	},

	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * ACK START
	 */
	onACK: function () {
		var me = this;
		var refs = me.getReferences();
		var detailstore = me.getStore('invoiceAdviceDetailGridList');
		var detailItems = me.getViewModel().get('theDetailHead');
		var ackItems = new Ext.create('MOST.model.billing.InvoiceAdviceDetail');
		ackItems.phantom = false
		var isCreated = ackItems.phantom;
		var ackItem = new Array();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;

		var ackIdx = detailstore.findBy(function (item) {
			if (item.get('payerCd') === MOST.config.Token.getPtnrCode()) {
				item.set('newVersion', me.generateUuid());
				item.set('ackStatusCode', "C");
				item.set('workingStatus', 'U');
				item.set('userId', MOST.config.Token.getUserId());
				ackItem.push(item.data);
			}
		});

		if ((detailItems.data.adviceNo != null) && (detailItems.data.adviceNo != "")) {
			if (detailItems.dirty == true || ackItem.length > 0) {
				var proxy = ackItems.getProxy();
				proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/invoiceadvice/detaillist';
				ackItems.set("items", ackItem); // Tab1 Grid Array Data Setting
				ackItems.set('searchType', "ACK");
				ackItems.set('adviceNo', detailItems.data.adviceNo);
				ackItems.set('vesselCallingID', detailItems.data.vesselCallingID);
				ackItems.set('workingStatus', 'U');

				var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
				updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/invoiceadvice/detaillist';
				// updateParm.phantom = false;
				updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
				updateParm.set('items', new Array());
				updateParm.get('items').push(ackItems.data);
				updateParm.save({
					success: function () {
						ackItems.set("version", ackItems.get('newVersion'));
						ackItems.commit();

						if (isCreated) {
							store.insert(0, ackItems);
							grid.getSelectionModel().select(ackItems);
						} else {
							me.updateRecord(recvData, ackItems);
						}
						detailstore.commitChanges();
						me.onDetailLoad();
						MessageUtil.saveSuccess(); // Success Message
					}
				});
			} else {
				MessageUtil.warning("invoiceadvicedetail", "modifyingPermission_msg");
				return;
			}
		}
	},

	/**
	 * =========================================================================================================================
	 * ACK END
	 */


	/**
	 * =========================================================================================================================
	 * HISTORY START
	 */
	onHistoryOfACK: function () {
		var me = this;
		me.openCodePopup('app-invoiceadvicedetailhistoryofack');
	},

	onHistorySearch: function () {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getStore('invoiceAdviceDetailList');
		var detailHistorygridStore = me.getStore("invoiceAdviceDetailHistoryGridList");
		var detailItemList = me.getViewModel().get('theDetailHead');
		var ptnrCd = MOST.config.Token.getPtnrCode();

		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;

		detailItem.load({
			params: {
				searchType: "HIST",
				adviceNo: detailItemList.data.adviceNo,
				ptnrCd: ptnrCd,
				authority: MOST.config.Token.getUserType() !== 'E' ? '' : (ptnrCd === recvData.data.shippingAgent ? '' : 'SHA')
			},
			callback: function (records, operation, success) {
				if (success) {

					var detailList = records[0].get("detailList");
					var historyList = new Array();
					//					var historyItem =Ext.Array.findBy(detailList, function(item) {
					//						if(ptnrCd != null && ptnrCd !=" "){
					//							if(item.partnerCode === ptnrCd){
					//								historyList.push(item);
					//							}
					//							detailHistorygridStore.setData(historyList);
					//						}
					//						else{
					//							detailHistorygridStore.setData(detailList);
					//						}
					//					});
					detailHistorygridStore.setData(detailList);

					detailHistorygridStore.commitChanges();
				}
			}
		});
	},
	/**
	 * =========================================================================================================================
	 * HISTORY END
	 */

	// Detail Load
	onDetailLoad: function () {
		var me = this;
		var detailView = me.getDetailBizView();
		var infoForm = detailView.down('form').getForm();
		infoForm.isValid(); // Mandatory to appear red for.

		me.getViewModel().setData({ theVsl: null });
		me.onClearIvAdviceDetailBtnClick();

		me.setDetailInitialize(null);

	},

	// Detail Initialize
	setDetailInitialize: function (masterItem) {
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var ptnrCd = MOST.config.Token.getPtnrCode();
		var recvData = detailView.items.get(0).recvData;
		var detailItem = me.getStore('invoiceAdviceDetailList');
		detailItem.removeAll();
		detailItem.commitChanges();

		if (recvData != null && recvData.data.vesselCallingID != null && recvData.data.vesselCallingID != '') {
			refs.ctlDetailJpvcfield.setValue(recvData.data.vesselCallingID);
		}

		if (me.CURRENT_VIEW_TYPE == me.VIEW_TYPE_CREATE) {
			if (MOST.config.Token.getUserType() == 'E') {
				var requesterItem = new Ext.create('MOST.model.popup.PopupService');
				if (MOST.config.Token.getAgencyCode() != '') {
					requesterItem.set('ptnrCode', MOST.config.Token.getAgencyCode());
					requesterItem.set('ptnrName', MOST.config.Token.getPtnrNm());
					requesterItem.set('prntType', 'SHA');
				} else {
					var patnerInfos = MOST.config.Token.getPatnerInfos();
					requesterItem.set('ptnrCode', MOST.config.Token.getPtnrCode());
					requesterItem.set('ptnrName', MOST.config.Token.getPtnrNm());
					requesterItem.set('prntType', patnerInfos[0].ptnrType);
				}
				me.getViewModel().setData({ theRequester: requesterItem });
				// refs.refRequester.setValue(MOST.config.Token.getPtnrCode());
			}
			refs.ctlDetailJpvcfield.setEditableControl(true);
			refs.ctlHistorybtn.setDisabled(false);
			refs.refRequester.setEditable(false);
			refs.refPayer.setEditable(false);

			if (refs.ctlDetailJpvcfield.getValue() != null && refs.ctlDetailJpvcfield.getValue() != '') {//JPVC duplicate
				refs.ctlDetailJpvcfield.setEditableControl(false);

				refs.ctlHistorybtn.setDisabled(false);
				detailItem.load({
					params: {
						searchType: "COMMON",
						authCd: me.getPatnerType(),
						adviceNo: (masterItem != null ? masterItem.data.adviceNo : ''),
						vesselCallingID: refs.ctlDetailJpvcfield.getValue(),
						ptnrCd: (masterItem != null ? masterItem.data.partnerCode : MOST.config.Token.getPtnrCode()),
					},
					callback: function (records, operation, success) {
						if (success) {
							if (records.length > 0) {
								me.setDetailTabControl(records[0]);
								me.setComboStore(records[0].data);
							}
						}
					}
				});
			} else {//Non JPVC
				refs.ctlHistorybtn.setDisabled(true);
				recvData = Ext.create('MOST.model.billing.InvoiceAdviceDetail');
				detailItem.load({
					params: {
						authCd: me.getPatnerType(),
					},
					callback: function (records, operation, success) {
						if (success) {
							if (records.length > 0) {
								me.setDetailTabControl(recvData);
								me.setComboStore(records[0].data);
							}
						}
					}
				});
			}
		} else {
			refs.ctlHistorybtn.setDisabled(false);

			if (MOST.config.Token.getUserType() == 'E') {
				refs.ctlACKbtn.setDisabled(false);
			}

			detailItem.load({
				params: {
					searchType: "COMMON",
					authCd: me.getPatnerType(),
					adviceNo: (recvData != null ? recvData.data.adviceNo : ''),
					vesselCallingID: refs.ctlDetailJpvcfield.getValue(),
					ptnrCd: ptnrCd
				},
				callback: function (records, operation, success) {
					if (success) {
						if (records.length > 0) {
							me.setDetailTabControl(records[0]);
							me.setComboStore(records[0].data);
						}
					}
				}
			});
		}

	},

	setSummaryInfoCalc: function () {
		var me = this;
		var refs = me.getReferences();
		var strPayerCd;
		var strPayerTpCd;
		var strStatus;
		var strAdviceNo;
		var strUpdateTime;
		var numloadingTotalWgt, numloadingTotalMsrmt, numloadingTotalQty;
		var numdischargingTotalWgt, numdischargingTotalMsrmt, numdischargingTotalQty;
		var authority = MOST.config.Token.getUserType();
		var ptnrType = MOST.config.Token.getPtnrType();

		var headStore = me.getStore("invoiceAdviceHeadList");
		var detailgridStore = me.getStore("invoiceAdviceDetailGridList");

		headStore.removeAll();

		for (var i = 0; i < detailgridStore.data.length; i++) {
			var record = detailgridStore.data.items[i].data;
			//loadingData start
			if (record.loadingTotalWgt == null || record.loadingTotalWgt == "") {
				numloadingTotalWgt = 0.00;
			} else {
				numloadingTotalWgt = record.loadingTotalWgt;
			}

			if ((record.loadingTotalMsrmt == null || record.loadingTotalMsrmt == "")) {
				numloadingTotalMsrmt = 0.00;
			} else {
				numloadingTotalMsrmt = record.loadingTotalMsrmt;
			}

			if ((record.loadingTotalQty == null || record.loadingTotalQty == "")) {
				numloadingTotalQty = 0;
			} else {
				numloadingTotalQty = record.loadingTotalQty;
			}
			//loadingData end

			//DischargingData start
			if ((record.dischargingTotalWgt == null || record.dischargingTotalWgt == "")) {
				numdischargingTotalWgt = 0.00;
			} else {
				numdischargingTotalWgt = record.dischargingTotalWgt;
			}

			if ((record.dischargingTotalMsrmt == null || record.dischargingTotalMsrmt == "")) {
				numdischargingTotalMsrmt = 0.00;
			} else {
				numdischargingTotalMsrmt = record.dischargingTotalMsrmt;
			}

			if ((record.dischargingTotalQty == null || record.dischargingTotalQty == "")) {
				numdischargingTotalQty = 0;
			} else {
				numdischargingTotalQty = record.dischargingTotalQty;
			}
			//DischargingData end

			if (record.payerCd != null) {
				strPayerCd = record.payerCd;
			}
			if (record.payerTpCd != null) {
				strPayerTpCd = record.payerTpCd;
			}

			if (record.ackStatusCode != "C") {//"p"
				if (me.isAdministrator() || (authority == me.USER_TYPE_EXTERNAL) && ptnrType == me.SHIPPING_AGENCY) {
					if (strPayerTpCd == me.SHIPPING_AGENCY) {
						strStatus = "REQ";
					} else {
						strStatus = "NOT ACK";
					}
				} else {
					if (strPayerTpCd == me.SHIPPING_AGENCY) {
						strStatus = "REQ";
					}
					else {
						strStatus = "NOT ACK";
					}
				}
			}
			else if (record.ackStatusCode == "C") {
				strStatus = "ACK";
			}
			var idx = headStore.findBy(function (item) {
				return (item.get('payerCd') === strPayerCd &&
					item.get('confirmAcceptPayment') === strStatus);
			});

			if (idx >= 0) {
				var totalTariffs = headStore.getAt(idx).get("totalTariffs");
				headStore.getAt(idx).set("totalTariffs", totalTariffs + 1);
			} else {
				headItem = new Ext.create('MOST.model.billing.InvoiceAdviceDetailHead');
				headItem.data.updateTimeField = strUpdateTime;
				headItem.data.payerCd = strPayerCd;
				headItem.data.confirmAcceptPayment = strStatus;
				headItem.data.adviceNo = record.adviceNo;
				headItem.data.vesselCallingID = record.vesselCallingID;
				headItem.data.shippingAgent = record.shippingAgent;


				headItem.data.loadingTotalWgt = numloadingTotalWgt;
				headItem.data.loadingTotalMsrmt = numloadingTotalMsrmt;
				headItem.data.loadingTotalQty = numloadingTotalQty;

				headItem.data.dischargingTotalWgt = numdischargingTotalWgt;
				headItem.data.dischargingTotalMsrmt = numdischargingTotalMsrmt;
				headItem.data.dischargingTotalQty = numdischargingTotalQty;

				headItem.data.totalTariffs = 1;
				headStore.insert(0, headItem);
			}
		};
		headStore.commitChanges();
	},

	setDetailTabControl: function (masterItem) {
		var me = this;
		var refs = me.getReferences();
		var strPayerCd;
		var strPayerTpCd;
		var strStatus;
		var strAdviceNo;
		var strUpdateTime;
		var numloadingTotalWgt, numloadingTotalMsrmt, numloadingTotalQty;
		var numdischargingTotalWgt, numdischargingTotalMsrmt, numdischargingTotalQty;
		var authority = MOST.config.Token.getUserType();
		var ptnrType = MOST.config.Token.getPtnrType();
		var headStore = me.getStore("invoiceAdviceHeadList");
		var detailgridStore = me.getStore("invoiceAdviceDetailGridList");
		var jpvcDetailItem = new Ext.create('MOST.model.billing.InvoiceAdvice');
		var detailHeadlItem = new Ext.create('MOST.model.billing.InvoiceAdviceDetail');
		var headItem = new Ext.create('MOST.model.billing.InvoiceAdviceDetailHead');
		var detailList = masterItem.get("detailList");
		var vslCallId = refs.ctlDetailJpvcfield.getValue();
		headStore.removeAll();
		detailgridStore.removeAll();
		detailgridStore.setData(detailList);

		if (!masterItem.phantom) {
			if (masterItem.get("jpvcList") != null || detailList != null) {
				jpvcDetailItem.phantom = false;
				detailHeadlItem.phantom = false;

				detailHeadlItem = detailList;

				if (detailList.length > 0)
					strUpdateTime = detailList[0].updateTimeField;
			}
			detailList.forEach(function (record, index) {
				//loadingData start
				if (record.loadingTotalWgt == null || record.loadingTotalWgt == "") {
					numloadingTotalWgt = 0.00;
				} else {
					numloadingTotalWgt = record.loadingTotalWgt;
				}

				if ((record.loadingTotalMsrmt == null || record.loadingTotalMsrmt == "")) {
					numloadingTotalMsrmt = 0.00;
				} else {
					numloadingTotalMsrmt = record.loadingTotalMsrmt;
				}

				if ((record.loadingTotalQty == null || record.loadingTotalQty == "")) {
					numloadingTotalQty = 0;
				} else {
					numloadingTotalQty = record.loadingTotalQty;
				}
				//loadingData end

				//DischargingData start
				if ((record.dischargingTotalWgt == null || record.dischargingTotalWgt == "")) {
					numdischargingTotalWgt = 0.00;
				} else {
					numdischargingTotalWgt = record.dischargingTotalWgt;
				}

				if ((record.dischargingTotalMsrmt == null || record.dischargingTotalMsrmt == "")) {
					numdischargingTotalMsrmt = 0.00;
				} else {
					numdischargingTotalMsrmt = record.dischargingTotalMsrmt;
				}

				if ((record.dischargingTotalQty == null || record.dischargingTotalQty == "")) {
					numdischargingTotalQty = 0;
				} else {
					numdischargingTotalQty = record.dischargingTotalQty;
				}
				//DischargingData end

				if (record.payerCd != null) {
					strPayerCd = record.payerCd;
				}
				if (record.payerTpCd != null) {
					strPayerTpCd = record.payerTpCd;
				}

				if (record.ackStatusCode != "C") {//"p"
					if (me.isAdministrator() || (authority == me.USER_TYPE_EXTERNAL) && ptnrType == me.SHIPPING_AGENCY) {
						if (strPayerTpCd == me.SHIPPING_AGENCY) {
							strStatus = "REQ";
						} else {
							strStatus = "NOT ACK";
						}
					} else {
						if (strPayerTpCd == me.SHIPPING_AGENCY) {
							strStatus = "REQ";
						}
						else {
							strStatus = "NOT ACK";
						}
					}
				}
				else if (record.ackStatusCode == "C") {
					strStatus = "ACK";
				}
				var idx = headStore.findBy(function (item) {
					return (item.get('payerCd') === strPayerCd &&
						item.get('confirmAcceptPayment') === strStatus);
				});

				if (idx >= 0) {
					var totalTariffs = headStore.getAt(idx).get("totalTariffs");
					headStore.getAt(idx).set("totalTariffs", totalTariffs + 1);
				} else {
					headItem = new Ext.create('MOST.model.billing.InvoiceAdviceDetailHead');
					headItem.data.updateTimeField = strUpdateTime;
					headItem.data.payerCd = strPayerCd;
					headItem.data.confirmAcceptPayment = strStatus;
					headItem.data.adviceNo = record.adviceNo;
					headItem.data.vesselCallingID = record.vesselCallingID;
					headItem.data.shippingAgent = record.shippingAgent;


					headItem.data.loadingTotalWgt = numloadingTotalWgt;
					headItem.data.loadingTotalMsrmt = numloadingTotalMsrmt;
					headItem.data.loadingTotalQty = numloadingTotalQty;

					headItem.data.dischargingTotalWgt = numdischargingTotalWgt;
					headItem.data.dischargingTotalMsrmt = numdischargingTotalMsrmt;
					headItem.data.dischargingTotalQty = numdischargingTotalQty;

					headItem.data.totalTariffs = 1;
					headStore.insert(0, headItem);
				}
			});

			// DateUtil.convertDateToLong(jpvcDetailItem.data, ['eta', 'etd', 'etw']);
			// me.getViewModel().setData({theVsl:jpvcDetailItem.data});
			me.getViewModel().setData({ theDetailHead: headItem });

			var ackIdx = detailgridStore.findBy(function (item) {
				return (item.get('payerCd') === MOST.config.Token.getPtnrCode());
			});

			//			if(ackIdx>=0 ){
			//				refs.ctlACKbtn.setDisabled(false);	
			//			}
			//			else{
			//				refs.ctlACKbtn.setDisabled(true);	
			//			}

			headStore.commitChanges();
			detailgridStore.commitChanges();

		}
		else {
			headStore.removeAll();
			headStore.clearData();
			me.getViewModel().setData({ theDetailHead: null });
		}
	},

	// Toolbar Save Button
	onDetailSave: function () {
		var me = this;
		var detailView = me.getDetailBizView();
		var userType = MOST.config.Token.getUserType();

		if (detailView) {
			me.detailSaveProcess();
		}
	},

	// Detail Save Process
	detailSaveProcess: function () {
		var me = this;
		var userType = MOST.config.Token.getUserType();
		var vslItem = me.getViewModel().get('theVsl');
		var validationCodeStore = me.getStore('InvoiceAdviceDetailValidationCode');
		var validationMsg = "";

		var crudDetailHeadItem = new Ext.create('MOST.model.billing.InvoiceAdviceDetail');
		crudDetailHeadItem.phantom = false;

		if (vslItem == null || vslItem == "") {
			MessageUtil.warning("invoiceadvicedetail", "selectvesselid_msg");
			return null;
		}

		if (userType === me.USER_TYPE_EXTERNAL) {
			if (vslItem.get("bbtLoc") === "BBT") {
				if (vslItem.get("cgTpCd") === "BT") {
					validationMsg = "This is Batter Trade Vessel. So You have to summit this document before {0} hour(s) prior to ETA!";
				} else {
					validationMsg = "You have to summit this document before {0} hour(s) prior to ETA!";
				}

				validationCodeStore.load({
					params: {
						tyCd: 'createDocument',
						col1: vslItem.get("vslCallId"),
						col2: vslItem.get("cgTpCd")
					},

					callback: function (records, operation, success) {
						if (success) {
							if (records != null && records.length > 0) {
								if (records[0].get("isValidated") === "Y") {
									me.onSaveInfo();
								} else {
									MessageUtil.warning('warning_msg', validationMsg, vslItem.get("configDoc"));
								}
							} else {
								MessageUtil.warning('warning_msg', validationMsg, vslItem.get("configDoc"));
							}
						}
					}
				});
			}
			else {
				me.onSaveInfo();
			}
		} else {
			me.onSaveInfo();
		}
	},

	onSaveInfo: function () {
		var me = this;
		var refs = me.getReferences();
		var detailgrid = me.lookupReference('refinvoiceAdviceDetailGrid');
		var grid = me.lookupReference('refinvoiceAdviceGrid');
		var store = me.getStore('invoiceAdviceList');
		var detailstore = me.getStore('invoiceAdviceDetailGridList');
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var arrTab1 = new Array();
		var detailItem = me.getViewModel().get('theDetailHead');
		var requesterItem = me.getViewModel().get('theRequester');
		var payerItem = me.getViewModel().get('thePayer');
		var vslItem = me.getViewModel().get('theVsl');
		var vslCallId = refs.ctlDetailJpvcfield.getValue();

		detailstore.getModifiedRecords().forEach(function (record, index, array) {
			if (record.get('workingStatus') != WorkingStatus.DELETE) {
				record.set('newVersion', me.generateUuid());
				record.set("vesselCallingID", vslCallId);
				record.set("userId", MOST.config.Token.getUserId());
			}
			arrTab1.push(record.data);
		});

		if (detailItem == null)
			detailItem = new Ext.create('MOST.model.billing.InvoiceAdviceDetail');

		if (arrTab1.length > 0) {
			var workingStatus = WorkingStatus.INSERT;
			if (arrTab1[0].workingStatus == 'D') {
				workingStatus = WorkingStatus.DELETE;
			}
			if (arrTab1[0].workingStatus == 'U') {
				workingStatus = WorkingStatus.UPDATE;
			}
			detailItem.set("vesselCallingID", vslCallId);
			detailItem.set("items", arrTab1);
			detailItem.set('newVersion', me.generateUuid());
			detailItem.set('shippingAgent', me.lookupReference('ctlSA').getValue());
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/invoiceadvice/detaillist';
			detailItem.set("userId", MOST.config.Token.getUserId());
			if (workingStatus == 'C') {
				updateParm.phantom = true;
			}
			else if (workingStatus == 'D') {
				updateParm.drop();
				updateParm.phantom = false;
			}
			else {
				updateParm.phantom = false;
			}
			updateParm.set('workingStatus', workingStatus);
			updateParm.set('items', new Array());

			updateParm.get('items').push(detailItem.data);
			updateParm.save({
				success: function () {
					detailItem.set("version", detailItem.get('newVersion'));
					detailItem.commit();
					store.load({
						params: {
							vesselCallingID: detailItem.data.vesselCallingID,
							authority: me.getPatnerType(),
						},
						callback: function (records, operation, success) {
							if (success) {
								me.CURRENT_VIEW_TYPE = me.VIEW_TYPE_UPDATE;
								if (records.length > 0)
									me.setDetailInitialize(records[0]);
								else
									me.setDetailInitialize(null);
							}
							MessageUtil.infoToast('success_msg', 'savesuccess_msg');
						}
					});
					detailstore.commitChanges();
				}
			});
		}
	},

	onDetailRemove: function () {
		var me = this;
		var refs = me.getReferences();
		var userType = MOST.config.Token.getUserType();
		var vslItem = me.getViewModel().get('theVsl');
		var validationCodeStore = me.getStore('InvoiceAdviceDetailValidationCode');
		var validationMsg = "";

		var crudDetailHeadItem = new Ext.create('MOST.model.billing.InvoiceAdviceDetail');
		crudDetailHeadItem.phantom = false;

		if (vslItem == null || vslItem == "") {
			MessageUtil.warning("invoiceadvicedetail", "selectvesselid_msg");
			return null;
		}

		if (userType === me.USER_TYPE_EXTERNAL) {
			if (vslItem.get("bbtLoc") === "BBT") {
				if (vslItem.get("cgTpCd") === "BT") {
					validationMsg = "This is Batter Trade Vessel. So You have to summit this document before {0} hour(s) prior to ETA!";
				} else {
					validationMsg = "You have to summit this document before {0} hour(s) prior to ETA!";
				}

				validationCodeStore.load({
					params: {
						tyCd: 'createDocument',
						col1: vslItem.get("vslCallId"),
						col2: vslItem.get("cgTpCd")
					},

					callback: function (records, operation, success) {
						if (success) {
							if (records != null && records.length > 0) {
								if (records[0].get("isValidated") === "Y") {
									me.onDeleteAllValidation();
								} else {
									MessageUtil.warning('warning_msg', validationMsg, vslItem.get("configDoc"));
								}
							} else {
								MessageUtil.warning('warning_msg', validationMsg, vslItem.get("configDoc"));
							}
						}
					}
				});
			}
			else {
				me.onDeleteAllValidation();
			}
		} else {
			me.onDeleteAllValidation();
		}
	},

	onDeleteAllValidation: function () {
		var me = this;
		var refs = me.getReferences();
		var validationCodeStore = me.getStore('InvoiceAdviceDetailValidationCode');
		var detailstore = me.getStore('invoiceAdviceDetailGridList');
		var storeData = detailstore.getData();
		var vslItem = me.getViewModel().get('theVsl');

		if (refs.refChkDeleteAll.getValue() === true) {
			if (storeData.length > 0) {
				//Permission
				if (MOST.config.Token.getUserType() === 'E') {
					var idx = 0;
					for (idx = 0; idx < storeData.length; idx++) {
						if (storeData.getAt(idx).set("partnerCode") != MOST.config.Token.getPtnrCode()
							&& MOST.config.Token.getPtnrCode() != refs.ctlSA.getValue()) {
							MessageUtil.warning("invoiceadvicedetail", "modifyingPermission_msg");
							return false;
						}
					}
				}

				validationCodeStore.load({
					params: {
						tyCd: 'deleteAllIvAdviceStatusValidation',
						col1: vslItem.get("vslCallId")
					},

					callback: function (records, operation, success) {
						if (success) {
							if (records != null && records.length > 0) {
								if (records[0].get("isValidated") === "Y") {
									me.onDeleteAllIvAdviceDetail();
								} else {
									if (MOST.config.Token.getUserType() === 'E') {
										MessageUtil.warning("invoiceadvicedetail", "remove_invoiceadvicedetail_msg");
										return;
									} else {
										me.onDeleteAllIvAdviceDetail();
									}
								}
							} else {
								MessageUtil.warning("invoiceadvicedetail", "remove_invoiceadvicedetail_msg");
								return;
							}
						}
					}
				});
			}
		} else {
			me.onDeleteIvAdviceDetail();
		}
	},

	onDeleteIvAdviceDetail: function () {
		var me = this;
		var detailgrid = me.lookupReference('refinvoiceAdviceDetailGrid');
		var grid = me.lookupReference('refinvoiceAdviceGrid');
		var store = me.getStore('invoiceAdviceList');
		var detailstore = me.getStore('invoiceAdviceDetailGridList');
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var arrTab1 = new Array();
		var detailItem = me.getViewModel().get('theDetailHead');
		var requesterItem = me.getViewModel().get('theRequester');
		var payerItem = me.getViewModel().get('thePayer');
		var vslItem = me.getViewModel().get('theVsl');

		detailstore.getModifiedRecords().forEach(function (record, index, array) {
			if (record.get('workingStatus') === WorkingStatus.DELETE) {
				record.set('newVersion', me.generateUuid());
				record.set("vesselCallingID", vslItem.data.vslCallId);
				record.set("userId", MOST.config.Token.getUserId());
				arrTab1.push(record.data);
			}
		});

		if (detailItem == null)
			detailItem = new Ext.create('MOST.model.billing.InvoiceAdviceDetail');

		if (arrTab1.length > 0) {
			var proxy = detailItem.getProxy();
			proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/invoiceadvice/detaillist';
			detailItem.set("vesselCallingID", vslItem.data.vslCallId);
			detailItem.set("items", arrTab1);
			detailItem.set('newVersion', me.generateUuid());

			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/invoiceadvice/detaillist';
			detailItem.set("userId", MOST.config.Token.getUserId());
			// updateParm.phantom = isCreated;		
			updateParm.set('workingStatus', WorkingStatus.DELETE);
			updateParm.set('items', new Array());

			updateParm.get('items').push(detailItem.data);
			updateParm.save({
				// detailItem.save({
				success: function () {
					detailItem.set("version", detailItem.get('newVersion'));
					detailItem.commit();
					store.load({
						params: {
							vesselCallingID: detailItem.data.vesselCallingID,
							authority: me.getPatnerType(),
						},
						callback: function (records, operation, success) {
							if (success) {
								if (records.length > 0)
									me.setDetailInitialize(records[0]);
								else
									me.setDetailInitialize(null);
							}
						}
					});

					detailstore.commitChanges();
					me.onDetailLoad();
					MessageUtil.saveSuccess(); // Success Message
				}
			});
		}
	},

	onDeleteAllIvAdviceDetail: function () {
		var me = this;
		var detailgrid = me.lookupReference('refinvoiceAdviceDetailGrid');
		var grid = me.lookupReference('refinvoiceAdviceGrid');
		var store = me.getStore('invoiceAdviceList');
		var detailstore = me.getStore('invoiceAdviceDetailGridList');
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var arrTab1 = new Array();
		var detailItem = me.getViewModel().get('theDetailHead');
		var requesterItem = me.getViewModel().get('theRequester');
		var payerItem = me.getViewModel().get('thePayer');
		var vslItem = me.getViewModel().get('theVsl');

		var storeData = detailstore.getData();
		var idx = 0;
		for (idx = 0; idx < storeData.length; idx++) {
			storeData.getAt(idx).set("workingStatus", 'D');
			arrTab1.push(storeData.getAt(idx).data);
		}


		if (detailItem == null)
			detailItem = new Ext.create('MOST.model.billing.InvoiceAdviceDetail');

		if (arrTab1.length > 0) {
			detailItem.set("vesselCallingID", vslItem.data.vslCallId);
			detailItem.set("items", arrTab1);
			detailItem.set('newVersion', me.generateUuid());
			//sMantis: Invoice Advice Screen
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/invoiceadvice/detaillist';
			updateParm.set('items', new Array());
			updateParm.get('items').push(detailItem.data);
			if (arrTab1[0].workingStatus == 'D') {
				workingStatus = WorkingStatus.DELETE;
			}
			if (arrTab1[0].workingStatus == 'U') {
				workingStatus = WorkingStatus.UPDATE;
			}
			updateParm.phantom = false;
			updateParm.save({
				success: function () {
					detailItem.set("version", detailItem.get('newVersion'));
					detailItem.commit();
					store.load({
						params: {
							vesselCallingID: detailItem.data.vesselCallingID,
							authority: me.getPatnerType(),
						},
						callback: function (records, operation, success) {
							if (success) {
								me.CURRENT_VIEW_TYPE = me.VIEW_TYPE_CREATE;
								if (records.length > 0)
									me.setDetailInitialize(records[0]);
								else
									me.setDetailInitialize(null);
							}
						}
					});

					detailstore.commitChanges();
					me.onDetailLoad();
					MessageUtil.infoToast('success_msg', 'savesuccess_msg');
				}
			});
			//sMantis: Invoice Advice Screen
		}
	},

	setComboStore: function (masterItem) {
		var me = this;
		var refs = me.getReferences();
		var theVsl = me.getViewModel().get('theVsl');
		var ionvoiceAdviceDetailBillingItemCombo = me.getStore('ionvoiceAdviceDetailBillingItemCombo');
		var ionvoiceAdviceDetailShippingNoteItemCombo = me.getStore('ionvoiceAdviceDetailShippingNoteItemCombo');
		var vslCallId = theVsl != null ? (theVsl.vslCallId != undefined ? theVsl.vslCallId : theVsl.get('vslCallId')) : '';

		ionvoiceAdviceDetailBillingItemCombo.load({
			params: {
				vslCallId: vslCallId
			}
		});
		ionvoiceAdviceDetailShippingNoteItemCombo.load({
			params: {
				vslCallId: vslCallId
			}
		});
	},

	onValidationPatnerType: function (combo, value, obj) {
		var me = this;
		var grid = combo.up("grid");
		var patnerTypeValidationStore = me.getStore("ionvoiceAdviceDetailRquesterCombo");

		var requesterItem = patnerTypeValidationStore.findRecord('ptyTpCd', value);
		var Idx = patnerTypeValidationStore.findBy(function (item) {
			return (item.get('ptyTpCd') === value);
		});
		if (Idx >= 0) {
			var record = patnerTypeValidationStore.getAt(Idx);
			if (record.data.accountHold == "Y" || record.data.holdChk == "Y") {
				MessageUtil.warning("invoiceadvicedetail", "hold_check_msg");
				return false;
			}

			me.getViewModel().setData({ theRequester: requesterItem });

		}
	},

	onGetPayerItem: function (combo, value, obj) {
		var me = this;
		var grid = combo.up("grid");
		var payerComboStore = me.getStore("ionvoiceAdviceDetailPayerCombo");
		var payerItem = payerComboStore.findRecord('ptyTpCd', value);
		me.getViewModel().setData({ thePayer: payerItem });
	},

	// Category Combo Change Event
	onCategoryComboChange: function (combo, value, obj) {
		var me = this;
		var refs = me.getReferences();

		refs.refBlNo.setValue('');
		refs.refSnNo.setValue('');

		if (value === "LD") {
			refs.refBlNo.setDisabled(true);
			refs.refSnNo.setDisabled(false);
		}
		else if (value === "DS") {
			refs.refBlNo.setDisabled(false);
			refs.refSnNo.setDisabled(true);
		} else {
			refs.refBlNo.setDisabled(true);
			refs.refSnNo.setDisabled(true);
		}
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
	getPatnerType: function () {
		var me = this;
		var userType = MOST.config.Token.getUserType();
		var ptnrType = MOST.config.Token.getPtnrType();
		var authCd;

		if (userType == me.USER_TYPE_EXTERNAL) {
			if (me.existsPatnerType(me.SHIPPING_AGENCY) || (me.existsPatnerType(me.SHIPPING_AGENCY) && me.existsPatnerType(me.FORWARDER))) {
				if (me.existsPatnerType(me.SHIPPING_AGENCY) && me.existsPatnerType(me.FORWARDER)) {
					authCd = "BH";
				}
				else if (me.existsPatnerType(me.SHIPPING_AGENCY)) {
					authCd = "SHA";
				}
			} else if (me.existsPatnerType(me.FORWARDER)) {
				authCd = "FWD";
			} else if (me.existsPatnerType(me.SHIPPER_CONSIGNEE)) {
				authCd = "CNS";
			}

		} else if (userType == me.USER_TYPE_INTERNAL) {
			authCd = "CSC";
		}
		return authCd;
	},

	// Search Condition
	getSearchCondition: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var vslCallId = refs.refMainVslCallIdfield.getValue();
		var partnerCode = refs.ctlPartner.getValue();
		var adviceNo = refs.ctlAdviceNo.getValue();
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var alertYn = '';
		if (partnerCode === '') {
			partnerCode = MOST.config.Token.getPtnrCode();
		}

		if (me.alertYN == 'N') {
			refs.ctlFromDt.allowBlank = false;
			refs.ctlToDt.allowBlank = false;
			var dateCondition = me.checkPeriodDate("ctlFromDt", "ctlToDt", me.MAX_PERIOD_DAY, true);
			if (dateCondition == null) {
				return null;
			}
		} else {
			alertYn = 'Y';
			if (me.alertTp == 'IVAdvice') {
				partnerCode = '';
			}
			adviceNo = '';
			vslCallId = '';
		}
		var params = {
			ptnrCd: partnerCode,
			scn: refs.ctlScn.getValue(),
			adviceNo: adviceNo,
			authority: me.getPatnerType(),
			alertYn: alertYn,
			alertTp: me.alertTp,
			pageNo: pageNo,
			sizePerPage: sizePerPage,
			sort: grid.getSortString()
		};


		if (vslCallId != "" && vslCallId != null) {
			params["vesselCallingID"] = vslCallId;
		}
		else {
			if (dateCondition != null) {
				params["eta"] = dateCondition.fromDtString;
				params["fromDt"] = dateCondition.fromDtString;
				params["toDt"] = dateCondition.toDtString;
			}
		}
		return params;
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * Detail Hisotry Of ACK START
	 */
	// Detail History Of ACK Load - Initialize
	onDetailHistoryOfACKLoad: function () {
		var me = this;
		me.onHistorySearch();
	},

	onDetailPreview: function () {
		var me = this;
		var refs = me.getReferences();
		var generatePDFInvoiceAdvice = me.getStore('generatePDFInvoiceAdvice');

		var userType = MOST.config.Token.getUserType();
		var authCd = '';
		var ptnrType = '';
		var partnerInfos = MOST.config.Token.getPatnerInfos();
		var theVsl = me.getViewModel().get('theVsl');
		var theDetailHead = me.getViewModel().get('theDetailHead');

		if (theVsl == null || theVsl == "") {
			MessageUtil.warning("invoiceadvicedetail", "selectvesselid_msg");
			return null;
		}

		partnerInfos.forEach(function (item, index) {
			if (ptnrType == '') {
				ptnrType = item.ptnrType;
			} else {
				ptnrType += ',' + item.ptnrType;
			}

		})

		if (userType == 'I') {
			authCd = 'CSC';
		} else if (userType == 'E') {
			if (ptnrType.indexOf('SHA') > -1 || (ptnrType.indexOf('SHA') > -1 && ptnrType.indexOf('FWD') > -1)) {
				if (ptnrType.indexOf('SHA') > -1 && ptnrType.indexOf('FWD') > -1) {
					authCd = 'BH';
				} else if (ptnrType.indexOf('SHA') > -1) {
					authCd = 'SHA';
				}
			} else if (ptnrType.indexOf('FWD') > -1) {
				authCd = 'FWD';
			} else if (ptnrType.indexOf('CNS') > -1) {
				authCd = 'CNS';
			}
		}

		var params = {
			ptnrCd: MOST.config.Token.getPtnrCode(),
			adviceNo: theDetailHead.get('adviceNo'),
			authority: me.getPatnerType(),
			vesselName: theVsl.get('vslNm'),
			shippingAgent: theVsl.get('arrvSaId'),
			authCd: authCd,
			vesselCallingID: theVsl.get('vslCallId'),
			userId: MOST.config.Token.getUserId()
		};

		generatePDFInvoiceAdvice.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					me.openPDFPreview(records, operation, success);
				}
			}
		})

	},

	onDetailDownload: function () {
		var me = this;
		var refs = me.getReferences();

		var theVsl = me.getViewModel().get('theVsl');
		if (theVsl == null || theVsl == "") {
			MessageUtil.warning("invoiceadvicedetail", "selectvesselid_msg");
			return null;
		}

		var params = {
			initSearch: true
		};

		me.openCodePopup('popup-exporttypepopup', 'refBtnDownload', params);

	},

	onDownloadExport: function () {
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create("MOST.model.pdfprint.SearchReportBizParm");
		var params = me.createParam(searchParm, ['file', 'serviceId', 'param1']);

		var exportReport = me.getStore('exportReport');

		var userType = MOST.config.Token.getUserType();
		var authCd = '';
		var ptnrType = '';
		var partnerInfos = MOST.config.Token.getPatnerInfos();
		var theVsl = me.getViewModel().get('theVsl');
		var theDetailHead = me.getViewModel().get('theDetailHead');

		partnerInfos.forEach(function (item, index) {
			if (ptnrType == '') {
				ptnrType = item.ptnrType;
			} else {
				ptnrType += ',' + item.ptnrType;
			}

		})

		if (userType == me.USER_TYPE_INTERNAL) {
			authCd = 'CSC';
		} else if (userType == me.USER_TYPE_EXTERNAL) {
			if (ptnrType.indexOf(me.SHIPPING_AGENCY) > -1 || (ptnrType.indexOf(me.SHIPPING_AGENCY) > -1 && ptnrType.indexOf('FWD') > -1)) {
				if (ptnrType.indexOf(me.SHIPPING_AGENCY) > -1 && ptnrType.indexOf(me.FORWARDER) > -1) {
					authCd = 'BH';
				} else if (ptnrType.indexOf(me.SHIPPING_AGENCY) > -1) {
					authCd = me.SHIPPING_AGENCY;
				}
			} else if (ptnrType.indexOf(me.FORWARDER) > -1) {
				authCd = me.FORWARDER;
			} else if (ptnrType.indexOf(me.SHIPPER_CONSIGNEE) > -1) {
				authCd = me.SHIPPER_CONSIGNEE;
			}
		}

		params['file'] = me.INVOICE_ADVICE_DTL_REPORT_PDF_FILE;
		params['serviceId'] = me.INVOICE_ADVICE_DTL_REPORT_FUNCTION;
		params['branchCode'] = MOST.config.Token.getBranchCode();
		params['param1'] = theVsl.get('vslCallId'),
		params['param2'] = theDetailHead.get('adviceNo');
		params['param3'] = MOST.config.Token.getPtnrCode();
		params['param4'] = theVsl.get('arrvSaId');
		params['param5'] = Token.getUserId();
		params['param6'] = refs.refRadioReportType.getValue().rb;
		params['param7'] = authCd;
		params['param8'] = theVsl.get('vslNm');

		var reportType = refs.refRadioReportType.getValue().rb;
		if(reportType == me.REPORT_TYPE_PDF) {
			params['file'] = me.INVOICE_ADVICE_DTL_REPORT_PDF_FILE;
			params['printType']= me.REPORT_TYPE_PDF;
			me.openPDFPreview(params);
		} else if( reportType == me.REPORT_TYPE_EXCEL) {
			params['file'] = me.INVOICE_ADVICE_DTL_REPORT_EXCEL_FILE;
			me.downloadExcel(params);
		}

	},

	onDownloadCancel: function (ownWin) {
		var me = this;
		var winAlias = "popupAliaspopup-exporttypepopup";
		var win = me.lookupReference(winAlias);

		win.close();

	},

	onPreviewLoad: function () {
		var me = this;
		var refs = me.getReferences();

		me.visibleDetailToolButton(ViewUtil.TOOL_SAVE, false);
		me.visibleDetailToolButton(ViewUtil.TOOL_DELETE, false);
		me.visibleDetailToolButton(ViewUtil.TOOL_PREVIEW, false);
	},

	beforeexporttppopupclose: function () {
		var me = this;
		var refs = me.getReferences();

		//me.getView().detailViewAlias = 'app-invoiceadvicedetail';
	},

	exportToExcel: function(btn) {
		var me = this;
    	var params =  me.getParamsForExport();
		params['file'] = me.INVOICE_ADVICE_LIST_REPORT_EXCEL_FILE;
		me.downloadExcel(params);
    },

	exportToPDF: function(btn) {
		var me = this;
    	var params =  me.getParamsForExport();
		params['file'] = me.INVOICE_ADVICE_LIST_REPORT_PDF_FILE;
		me.openPDFPreview(params);
    },
	
	getParamsForExport: function() {
		var me = this;
    	var refs = me.getReferences();
        var params = {};
		var fromDt = refs.ctlFromDt.getValue();
		var toDt = refs.ctlToDt.getValue();
		var vslCallId = refs.refMainVslCallIdfield.getValue();
		var adviceNo = refs.ctlAdviceNo.getValue();
		var ptnrCd = refs.ctlPartner.getValue();

		if(fromDt != null && toDt != null){
            var dateCondition = me.validateFromToDate(fromDt, toDt);
            if(!dateCondition){
            	fromDt = '';
            	toDt =  '';
            } else {
				fromDt = Ext.Date.format(fromDt, MOST.config.Locale.getShortDate());
            	toDt = Ext.Date.format(toDt, MOST.config.Locale.getShortDate());
			}
		}

		params['serviceId'] = me.INVOICE_ADVICE_LIST_REPORT_FUNCTION;
		params['branchCode'] = MOST.config.Token.getBranchCode();
		params['param1'] = vslCallId,
		params['param2'] = adviceNo;
		params['param3'] = MOST.config.Token.getPtnrCode();
		params['param4'] = ptnrCd;
		params['param5'] = Token.getUserId();
		params['param6'] = me.getPatnerType();
		if(vslCallId == null || vslCallId == '') {
			params['param7'] = fromDt;
			params['param8'] = toDt;
		} else {
			params['param7'] = '';
			params['param8'] = '';
		};

		return params;
	}

});
