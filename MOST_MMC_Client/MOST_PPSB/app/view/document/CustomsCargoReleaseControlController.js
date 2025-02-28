Ext.define('MOST.view.document.CustomsCargoReleaseControlController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		'Ext.exporter.text.CSV',
		'Ext.exporter.text.TSV',
		'Ext.exporter.text.Html',
		'Ext.exporter.excel.Xml',
		'Ext.exporter.excel.Xlsx'
	],

	alias: 'controller.customscargoreleasecontrol',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refCustomsCargoReleaseControlGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'customsCargoReleaseControl',			// Main Store Name
	IMPORT_CAT_CD: 'I',
	EXPORT_CAT_CD: 'E',
	TRANSHIPMENT_CAT_CD: 'T',
	CATEGORY_STORE: 'categoryCombo',
	maxReleaseMt: 0.0,
	maxReleaseM3: 0.0,
	maxReleaseQty: 0.0,
	BBKCargo: 'BBK',
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
		var searchParm = Ext.create('MOST.model.document.SearchCustomsCargoReleaseControlParm');
		var channelCombo = me.getStore('channelCombo');

		me.setSearchParm(searchParm);
		me.getViewModel().setData({ theSearch: searchParm });
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');

		refs.refsAddBtn.setDisabled(false);
		refs.refsUpdateBtn.setDisabled(true);
		refs.refsRemoveBtn.setDisabled(true);

		var recvData = me.getView().recvData;

		channelCombo.load();

		me.setComboBoxWithLocalCache(CacheServiceConstants.CATEGORY_CUSTOM_CARGO_RELEASE, me.CATEGORY_STORE);

		var form = me.getView();

		form.isValid();
	},

	/**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */

	onSearch: function () {
		var me = this;
		var refs = me.getReferences();
		var store = this.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();

		if (params == null) {
			return;
		}

		store.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					me.onDetailClear();

					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
				}
			}
		});
	},

	onCellClick: function (ctx, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var docNoStore = me.getStore('docNoItems');
		var blSnItemsStore = me.getStore('blSnItems');
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var blNoStore = me.getStore('blNoItems');
		var shipgNoteNoStore = me.getStore('shipgNoteNoItems');
		var detailItem = me.getViewModel().get('theDetail');
		var categoryCd;

		me.getViewModel().setData({ theDetail: null });
		if (selection == null) {
			return;
		}

		me.rowIndex = rowIndex;

		if (selection.data.categoryCd == "IM") {
			categoryCd = "I";
		} else if (selection.data.categoryCd == "EX") {
			categoryCd = "E";
		} else if (selection.data.categoryCd == "TS") {
			categoryCd = "T";
		}

		refs.refsAddBtn.setDisabled(true);
		refs.refsUpdateBtn.setDisabled(false);
		refs.refsRemoveBtn.setDisabled(false);

		refs.refDtlCategory.setDisabled(true);
		refs.refDtlDocumentNo.setDisabled(true);

		if (selection.data.categoryCd == "IM") {
			docNoStore.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/customscargoreleasecontrol/masterBlItems';
		} else if (selection.data.categoryCd == "EX" || selection.data.categoryCd == "TS") {
			docNoStore.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/customscargoreleasecontrol/bookingNoItems';
		}

		docNoStore.load({
			params: {
				vslCallId: selection.data.vslCallId,
				vslManifestNo: selection.data.vslManifestNo,
				categoryCd: categoryCd
			}
		});

		blNoStore.load({
			params: {
				vslCallId: selection.data.vslCallId,
				mfDocNo: selection.data.docNo,
				categoryCd: categoryCd
			}
		});
		//sMantis: 0167587
		shipgNoteNoStore.load({
			params: {
				vslCallId: selection.data.vslCallId,
				mfDocNo: selection.data.docNo,
				categoryCd: categoryCd
			}
		});

		blSnItemsStore.load({
			params: {
				vslCallId: selection.data.vslCallId,
				vslManifestNo: selection.data.vslManifestNo,
				categoryCd: categoryCd,
				docNo: selection.data.docNo
			}
		});
		//eMantis: 0167587
		if (selection.get('bondedWhYn') == 'Y') {
			refs.ctlBondedWhYn.setValue(true);
			refs.ctlGateInTime.setDisabled(false);
			refs.ctlGateOutTime.setDisabled(false);

			refs.ctlGateInTime.setValue(selection.get('custGetIn'));
			refs.ctlGateOutTime.setValue(selection.get('custGetOut'));

		} else if (selection.get('bondedWhYn') == 'N') {
			refs.ctlBondedWhYn.setValue(false);
			refs.ctlGateInTime.setDisabled(true);
			refs.ctlGateOutTime.setDisabled(true);

			refs.ctlGateInTime.setValue();
			refs.ctlGateOutTime.setValue();
		}

		me.getViewModel().setData({ theDetail: selection });
		me.maxReleaseMt = Number(selection.data.balanceMt) + Number(selection.data.releaseMt);
		me.maxReleaseM3 = Number(selection.data.balanceM3) + Number(selection.data.releaseM3);
		me.maxReleaseQty = Number(selection.data.balanceQty) + Number(selection.data.releaseQty);

		if (me.isReleaseFull()) {
			me.setMetricFieldsReadOnly(true);
		} else {
			me.setMetricFieldsReadOnly(false);
		}
	},

	onSelectCategory: function (field, newValue, oldValue) {
		var me = this;
		var refs = me.getReferences();
		var categoryCd = '';
		var searchParm = me.getViewModel().get('theSearch');
		var docNoStore = me.getStore('docNoItems');

		//sMantis: 0167587
		if (newValue.data.scd == "IM") {
			categoryCd = "I";
		} else if (newValue.data.scd == "EX") {
			categoryCd = "E";
		} else if (newValue.data.scd == "TS") {
			categoryCd = "T";
		}
		var paramsForBLOrSNNo = {
			vslCallId: refs.ctlVslCallId.getValue(),
			categoryCd: categoryCd
		}
		me.blSnStoreLoad(paramsForBLOrSNNo);
		me.setBLNoOrShipgNoteComboDisable(categoryCd);
		me.setMetricFieldsReadOnly(true);
		//eMantis: 0167587

		if (newValue.data.scd == "IM") {
			docNoStore.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/customscargoreleasecontrol/masterBlItems';
		} else if (newValue.data.scd == "EX" || newValue.data.scd == "TS") {
			refs.refDtlDamNo.setEditable(true);
			docNoStore.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/customscargoreleasecontrol/bookingNoItems';
		}
		docNoStore.load({
			params: {
				vslCallId: searchParm.data.vslCallId,
				categoryCd: categoryCd
			},
			callback: function (records, operation, success) {
				if (success) {
					if (records.length > 0) {
					}
				}
			}
		});


	},

	onRefresh: function () {
		var me = this;
		var refs = me.getReferences();
		var store = this.getStore(me.MAIN_STORE_NAME);
		var blNoComboStore = me.getStore('blNoCombo');
		var shipgNoteNoComboStore = me.getStore('shipgNoteNoCombo');

		shipgNoteNoComboStore.removeAll();
		blNoComboStore.removeAll();
		refs.ctlSNNo.setValue('');
		refs.ctlBlNo.setValue('');

		refs.ctlFromDt.setValue("");
		refs.ctlToDt.setValue("");
		refs.ctlMasterBlCombo.setValue("");
		refs.ctlBookingNo.setValue("");

		me.onDetailClear();
		store.removeAll();
	},

	onSelectDocNo: function (field, newValue, oldValue) {
		var me = this;
		var refs = me.getReferences();
		var categoryCd = '';
		var searchParm = me.getViewModel().get('theSearch');
		var docNo = newValue.data.cd;

		if (refs.refDtlCategory.getValue() == "IM") {
			categoryCd = "I";
		} else if (refs.refDtlCategory.getValue() == "EX") {
			categoryCd = "E";
		} else if (refs.refDtlCategory.getValue() == "TS") {
			categoryCd = "T";
		}
		//sMantis: 0167587
		var paramsForBLOrSNNo = {
			vslCallId: refs.ctlVslCallId.getValue(),
			mfDocNo: docNo,
			categoryCd: categoryCd
		}
		me.blSnStoreLoad(paramsForBLOrSNNo);
		me.setMetricFieldsReadOnly(true);
		//eMantis: 0167587
		var docNoInfoStore = me.getStore('docNoInfo');

		docNoInfoStore.load({
			params: {
				vslCallId: searchParm.data.vslCallId,
				categoryCd: categoryCd,
				docNo: docNo
			},
			callback: function (records, operation, success) {
				if (success) {
					if (records.length > 0) {
						records[0].data.docNo = docNo;
						records[0].data.categoryCd = refs.refDtlCategory.getValue();
						records[0].data.customReleaseDT = Ext.Date.format(refs.ctlReleaseDate.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
						me.maxReleaseMt = Number(records[0].data.balanceMt);
						me.maxReleaseM3 = Number(records[0].data.balanceM3);
						me.maxReleaseQty = Number(records[0].data.balanceQty);
						me.getViewModel().setData({ theDetail: records[0] });
					}
				}
			}
		});
	},

	onUpdate: function () {
		var me = this;
		var phantom = false;
		var detailItem = me.getViewModel().get('theDetail');
		var releaseMt = Number(detailItem.get('releaseMt'));
		var releaseM3 = Number(detailItem.get('releaseM3'));
		var releaseQty = Number(detailItem.get('releaseQty'));

		if (releaseMt == 0 && releaseM3 == 0 && releaseQty == 0) {
			MessageUtil.warning("customsCargoReleaseTitle", "customsCargoReleaseControl_releaseMetricsLessThan0_msg");
			return;
		} else {
			if (releaseMt > me.maxReleaseMt || releaseM3 > me.maxReleaseM3 || releaseQty > me.maxReleaseQty) {
				MessageUtil.warning("customsCargoReleaseTitle", "customsCargoReleaseControl_releaseNotEnough_msg");
				return;
			}
		};

		me.saveProcess(phantom);
	},

	onAdd: function () {
		var me = this;
		var refs = me.getReferences();
		var phantom = true;
		var searchParm = me.getViewModel().get('theSearch');
		var detailItem = me.getViewModel().get('theDetail');
		var msg = "";
		var items = "";

		if (!refs.refDtlCategory.getValue()) {
			msg = ViewUtil.getLabel('customsCargoReleaseControl_mendatoryField_msg');/*, DAM No, Release MT'*/
		} else if (refs.refDtlCategory.getValue() == 'IM') {
			if (!refs.ctlReleaseDate.getValue() /* || refs.refDtlDamNo.getValue() == '' */
				|| !refs.refDtlDocumentNo.getValue() /* || refs.refDtlReleaseMt.getValue() == '' */) {
				msg = ViewUtil.getLabel('customsCargoReleaseControl_mendatoryField_msg'); /*, DAM No, Release MT'*/
			}
		} else {
			if (!refs.ctlReleaseDate.getValue() /* || refs.refDtlDamNo.getValue() == '' */
				|| !refs.refDtlDocumentNo.getValue() /* || refs.refDtlReleaseMt.getValue() == '' || refs.refDtlRdNo.getValue() == '' */) {
				msg = ViewUtil.getLabel('customsCargoReleaseControl_mendatoryField_msg'); /*, DAM No, Release MT'*/
			}
		}

		if (refs.ctlBondedWhYn.getValue()) {
			if (!refs.ctlGateInTime.getValue()
				&& !refs.ctlGateOutTime.getValue()) {
				msg = ViewUtil.getLabel('mandatoryField_msg'); /*, DAM No, Release MT'*/
				items += "[Gate In/ Gate Out Date]";
			}
		}

		if (msg != '') {
			//MessageUtil.show(Ext.Msg.INFO,'insert' , msg, items);
			MessageUtil.warning("warning_msg", msg, items);
			return;
		};

		if (me.isReleaseFull()) {
			if (!me.validationMetricsForReleaseFull()) {
				MessageUtil.warning("customsCargoReleaseTitle", "customsCargoReleaseControl_cannotReleaseFull_msg");
				return;
			}
		};

		var releaseMt = Number(detailItem.get('releaseMt'));
		var releaseM3 = Number(detailItem.get('releaseM3'));
		var releaseQty = Number(detailItem.get('releaseQty'));

		if (releaseMt == 0 && releaseM3 == 0 && releaseQty == 0) {
			MessageUtil.warning("customsCargoReleaseTitle", "customsCargoReleaseControl_releaseMetricsLessThan0_msg");
			return;
		} else {
			if (releaseMt > me.maxReleaseMt || releaseM3 > me.maxReleaseM3 || releaseQty > me.maxReleaseQty) {
				MessageUtil.warning("customsCargoReleaseTitle", "customsCargoReleaseControl_releaseNotEnough_msg");
				return;
			}
		};

		detailItem.data.vslCallId = searchParm.data.vslCallId;
		me.saveProcess(phantom);
	},

	onDateFieldSet: function () {
		var me = this;
		var refs = me.getReferences();

		if (refs.ctlBondedWhYn.getValue()) {
			refs.ctlGateInTime.setDisabled(false);
			refs.ctlGateOutTime.setDisabled(false);
		} else {
			refs.ctlGateInTime.setDisabled(true);
			refs.ctlGateOutTime.setDisabled(true);
		}
	},

	validationMetricsForReleaseFull: function () {
		var me = this;
		var refs = me.getReferences();
		var docNo = refs.refDtlDocumentNo.getValue();
		var blNo = refs.refDtlBlNo.getValue();
		var snNo = refs.refDtlSNNo.getValue();
		var cargoNo = blNo != null ? blNo : snNo;
		var docMt = refs.refDtlDocMt.getValue();
		var docM3 = refs.refDtlDocM3.getValue();
		var docQty = refs.refDtlDocQty.getValue();
		var balMt = refs.refDtlBalanceMt.getValue();
		var balMt3 = refs.refDtlBalanceM3.getValue();
		var balQty = refs.refDtlBalanceQty.getValue();

		if (docMt !== balMt || docM3 !== balMt3 || docQty !== balQty) {
			return false;
		}
		return true;
	},

	saveProcess: function (phantom) {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var detailItem = me.getViewModel().get('theDetail');

		if (refs.ctlBondedWhYn.getValue() == true) {
			detailItem.set('bondedWhYn', 'Y');
			detailItem.set('custGetIn', Ext.Date.format(refs.ctlGateInTime.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
			detailItem.set('custGetOut', Ext.Date.format(refs.ctlGateOutTime.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		} else {
			detailItem.set('bondedWhYn', 'N');
			detailItem.set('custGetIn', '');
			detailItem.set('custGetOut', '');
		}

		var detailView = me.getDetailBizView();
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');

		detailItem.set("userId", MOST.config.Token.getUserId());

		updateParm.getProxy().url = store.getProxy().url;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('item', detailItem.data);
		updateParm.phantom = phantom;
		updateParm.save({
			success: function (record) {
				detailItem.set('version', record.get('newVersion'));
				detailItem.commit();

				MessageUtil.show(Ext.Msg.INFO, 'success_msg', 'savesuccess_msg', '',
					function (button) {
						if (button === 'ok') {
							me.onSearch();
						}
					});
			}
		});
	},

	onRemove: function () {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var deleteItems = new Array();
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if (selection == null) return;

		deleteItems.push(selection.data);

		MessageUtil.question('remove', 'infodelete_msg', null,
			function (button) {
				if (button === 'ok') {
					var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');

					updateParm.getProxy().url = store.getProxy().url;
					updateParm.phantom = false;
					updateParm.drop();
					updateParm.set('workingStatus', WorkingStatus.DELETE);
					updateParm.set('items', deleteItems);
					updateParm.save({
						success: function (record, operation) {
							MessageUtil.show(Ext.Msg.INFO, 'success_msg', 'savesuccess_msg', '',
								function (button) {
									if (button === 'ok') {
										updateParm.commit();
										me.onDetailClear();
										store.reload();
									}
								});
						}
					});
				}
			}
		);
	},


	onExportExcelPdfWithServer: function (gridNameString, isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();

		searchBizParm.classID = 'com.tsb.most.biz.parm.document.SearchCustomsCargoReleaseControlParm';
		searchBizParm.serviceID = 'MOST.customsCargoReleaseControl.getCustomsCargoReleaseList';

		me.exportExcelPdfWithServer(gridNameString, searchBizParm, isExcel);
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
	getSearchCondition: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);

		if (searchParm.data.vslCallId == '') {
			MessageUtil.warning("Customs Cargo Release Control", "customsCargoReleaseControl_vslCallId_msg");
			return;
		}

		var dtFromVal = Ext.Date.format(refs.ctlFromDt.getValue(), MOST.config.Locale.getShortDate());
		var dtToVal = Ext.Date.format(refs.ctlToDt.getValue(), MOST.config.Locale.getShortDate());

		params['vslCallId'] = searchParm.data.vslCallId;
		params['startDate'] = dtFromVal;
		params['endDate'] = dtToVal;
		params['vslManifestNo'] = searchParm.data.vslManifestNo;
		params['bookingNo'] = searchParm.data.bookingNo;
		params['masterBL'] = searchParm.data.masterBL;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		params['bondedWhYn'] = refs.ctlBondedWhYn.getValue() ? 'Y' : 'N';

		return params;
	},

	afterSetCodePopupData: function (xtype, targetControl, returnValue) {
		var me = this;
		var form = me.getView();
		var mainItem = me.getView().getViewModel().get('theMain');
		var detailItem = me.getView().getViewModel().get('theConfirmationSlip');
		var refs = me.getReferences();

		if (targetControl === 'ctlVslCallId') {
			if (returnValue) {
				me.getViewModel().setData({ theVslInfo: returnValue.item });
				me.getMasterBlNoList();
				me.getBookingNoList();

				me.loadShipgNoteNoComboData();
				me.loadBLNoComboData();

				var store = me.getStore(me.MAIN_STORE_NAME);

				store.removeAll();
				me.onDetailClear();

				refs.refDtlDocumentNo.setDisabled(false);
				refs.refDtlCategory.setDisabled(false);
				form.isValid();
			} else {
				refs.refDtlDocumentNo.setDisabled(true);
				refs.refDtlCategory.setDisabled(true);
				me.getViewModel().setData({ theVslInfo: null });
			}
		}
	},

	getMasterBlNoList: function () {
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var store = me.getStore('masterBlItems');

		store.load({
			params: {
				vslCallId: searchParm.data.vslCallId,
				vslManifestNo: searchParm.data.vslManifestNo
			},
			callback: function (records, success) {
				if (success) {
				}
			}
		});

	},

	getBookingNoList: function () {
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var store = me.getStore('bookingNoItems');

		store.load({
			params: {
				vslCallId: searchParm.data.vslCallId,
				vslManifestNo: searchParm.data.vslManifestNo
			},

			callback: function (records, success) {
				if (success) {
				}
			}
		});
	},

	loadBLNoComboData: function (combo, newValue, oldValue) {
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var store = me.getStore('blNoCombo');
		var params = {
			categoryCd: me.IMPORT_CAT_CD,
			vslCallId: searchParm.data.vslCallId
		};
		if (newValue) {
			params['mfDocNo'] = newValue;
		}
		store.load({
			params: params,
			callback: function (records, success) {
				if (success) {
				}
			}
		});
	},

	loadShipgNoteNoComboData: function (combo, newValue, oldValue) {
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var store = me.getStore('shipgNoteNoCombo');
		var params = {
			categoryCd: me.EXPORT_CAT_CD,
			vslCallId: searchParm.data.vslCallId
		};
		if (newValue) {
			params['mfDocNo'] = newValue;
		}
		store.load({
			params: params,

			callback: function (records, success) {
				if (success) {
				}
			}
		});
	},

	getBlSnItems: function () {
		var me = this;
		var refs = me.getReferences();
		var categoryCd = '';
		var searchParm = me.getViewModel().get('theSearch');
		var docNo = refs.refDtlDocumentNo.getValue();
		var blSnItemsStore = me.getStore('blSnItems');

		if (refs.refDtlCategory.getValue() == "IM") {
			categoryCd = "I";
		} else if (refs.refDtlCategory.getValue() == "EX") {
			categoryCd = "E";
		} else if (refs.refDtlCategory.getValue() == "TS") {
			categoryCd = "T";
		}

		blSnItemsStore.load({
			params: {
				vslCallId: searchParm.data.vslCallId,
				categoryCd: categoryCd,
				docNo: docNo
			},
			callback: function (records, operation, success) {
				if (success) {
					var detailItem = me.getViewModel().get('theDetail');
					detailItem.set('releaseMt', records[0].data.releaseMt);
					detailItem.set('releaseQty', records[0].data.releaseQty);
				}
			}
		});
	},

	onClear: function () {
		var me = this;

		me.onDetailClear();

		var store = me.getStore(me.MAIN_STORE_NAME);

		if (store.data.length > 0)
			store.reload();
	},

	onDetailClear: function () {
		var me = this;
		var refs = me.getReferences();
		var docNoItems = me.getStore('docNoItems');
		var blSnItems = me.getStore('blSnItems');
		var blNoStore = me.getStore('blNoItems');

		refs.refDtlCategory.setValue("");
		refs.refDtlDocumentNo.setValue("");
		refs.ctlReleaseDate.setValue("");
		refs.refDtlDamNo.setValue("");
		refs.refDtlRemark.setValue("");
		refs.refDtlDocMt.setValue("");
		refs.refDtlDocQty.setValue("");
		refs.ctlGateInTime.setValue("");
		refs.ctlGateOutTime.setValue("");



		refs.refsAddBtn.setDisabled(false);
		refs.refsUpdateBtn.setDisabled(true);
		refs.refsRemoveBtn.setDisabled(true);
		refs.refDtlCategory.setDisabled(false);
		refs.refDtlDocumentNo.setDisabled(false);



		var item = Ext.create('MOST.model.document.CustomsCargoReleaseControl');

		me.getViewModel().setData({ theDetail: item });

		docNoItems.removeAll();
		blSnItems.removeAll();
		//sMantis: 0167587
		blNoStore.removeAll();
		refs.refDtlBlNo.setValue("");
		refs.refDtlSNNo.setValue("");
		refs.refDtlBlNo.setDisabled(true);
		refs.refDtlSNNo.setDisabled(true);
		//eMantis: 0167587
	},

	//sMantis: 0167587
	blSnStoreLoad: function (params) {
		var me = this;
		var refs = me.getReferences();
		var blNoStore = me.getStore('blNoItems');
		var shipgNoteStore = me.getStore('shipgNoteNoItems');

		blNoStore.removeAll();
		shipgNoteStore.removeAll();
		refs.refDtlBlNo.setValue('');
		refs.refDtlSNNo.setValue('');

		if (params.categoryCd) {
			if (params.categoryCd == me.IMPORT_CAT_CD) {
				blNoStore.load({
					params: params
				});
			} else if (params.categoryCd == me.EXPORT_CAT_CD) {
				shipgNoteStore.load({
					params: params
				});
			} else if (params.categoryCd == me.TRANSHIPMENT_CAT_CD) {
				blNoStore.load({
					params: params
				});
				shipgNoteStore.load({
					params: params
				});
			}
		}
	},

	setBLNoOrShipgNoteComboDisable: function (categoryCd) {
		var me = this;
		var refs = me.getReferences();

		if (categoryCd == me.IMPORT_CAT_CD) {
			refs.refDtlBlNo.setDisabled(false);
			refs.refDtlSNNo.setDisabled(true);
		} else if (categoryCd == me.EXPORT_CAT_CD || categoryCd == me.TRANSHIPMENT_CAT_CD) {
			refs.refDtlBlNo.setDisabled(true);
			refs.refDtlSNNo.setDisabled(false);
		}
	},

	setMetricFieldsReadOnly: function (flags) {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var refDtlMt = refs.refDtlMt;
		var refDtlQty = refs.refDtlQty;
		var refDtlM3 = refs.refDtlM3;

		refDtlMt.setReadOnly(flags);
		refDtlQty.setReadOnly(flags);
		refDtlM3.setReadOnly(flags);

	},

	onSelectCargoNo: function () {
		var me = this;
		var refs = me.getReferences();
		var cargoNoInfoStore = me.getStore('cargoNoInfo');
		var categoryCd = refs.refDtlCategory.getValue().substring(0, 1);
		var blNo = refs.refDtlBlNo.getValue();
		var snNo = refs.refDtlSNNo.getValue();
		var refNo = null;
		if (categoryCd == me.IMPORT_CAT_CD) {
			refNo = blNo;
		} else if (categoryCd == me.EXPORT_CAT_CD || categoryCd == me.TRANSHIPMENT_CAT_CD) {
			refNo = snNo;
		}
		var params = {
			vslCallId: refs.ctlVslCallId.getValue(),
			docNo: refs.refDtlDocumentNo.getValue(),
			categoryCd: categoryCd,
			blNo: blNo,
			snNo: snNo
		}
		me.setMetricFieldsReadOnly(false);
		cargoNoInfoStore.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					if (records.length > 0) {
						records[0].data.categoryCd = refs.refDtlCategory.getValue();
						records[0].data.refNo = refNo;
						records[0].data.customReleaseDT = Ext.Date.format(refs.ctlReleaseDate.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
						me.maxReleaseMt = Number(records[0].data.balanceMt);
						me.maxReleaseM3 = Number(records[0].data.balanceM3);
						me.maxReleaseQty = Number(records[0].data.balanceQty);
						me.getViewModel().setData({ theDetail: records[0] });
					}
				}
			}
		})

	},

	isReleaseFull: function () {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var refNo = detailItem.get('refNo');
		if (refNo != null && refNo != '') {
			return false;
		}
		return true;
	},

	onchangeCargoMetrics: function (field) {
		var me = this;
		var refs = me.getReferences();
		if (field.reference == 'refDtlMt') {
			if (field.value > me.maxReleaseMt) {
				MessageUtil.warning("customsCargoReleaseTitle", "customsCargoReleaseControl_releaseAmount_msg");
				refs.refDtlMt.setValue(me.maxReleaseMt);
			}
		}

		if (field.reference == 'refDtlM3') {
			if (field.value > me.maxReleaseM3) {
				MessageUtil.warning("customsCargoReleaseTitle", "customsCargoReleaseControl_releaseAmount_msg");
				refs.refDtlM3.setValue(me.maxReleaseM3);
			}
		}

		if (field.reference == 'refDtlQty') {
			if (field.value > me.maxReleaseQty) {
				MessageUtil.warning("customsCargoReleaseTitle", "customsCargoReleaseControl_releaseAmount_msg");
				refs.refDtlQty.setValue(me.maxReleaseQty);
			}
		}
		me.updateCargoMetric(field.reference);
	},

	updateCargoMetric: function (targetControl) {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var newBalanceMt = 0.0;
		var newBalanceM3 = 0.0;
		var newBalanceQty = 0.0;
		var eachWgt = 0.0;
		var eachVol = 0.0;
		var newReleaseMTForBBK = 0;
		var newReleaseM3ForBBK = 0;
		var docMt = Number(refs.refDtlDocMt.getValue());
		var docM3 = Number(refs.refDtlDocM3.getValue());
		var docQty = Number(refs.refDtlDocQty.getValue());
		var releaseQty = refs.refDtlQty.getValue();

		if (detailItem.get('cgTpCd') == me.BBKCargo && targetControl =='refDtlQty') {
			eachWgt = docMt / docQty;
			eachVol = docM3 / docQty;
			newReleaseMTForBBK = eachWgt * releaseQty;
			newReleaseM3ForBBK = eachVol * releaseQty;
			refs.refDtlMt.setValue(newReleaseMTForBBK);
			refs.refDtlM3.setValue(newReleaseM3ForBBK);
		}

		var releaseMt = refs.refDtlMt.getValue();
		var releaseM3 = refs.refDtlM3.getValue();


		newBalanceMt = me.maxReleaseMt - releaseMt;
		newBalanceM3 = me.maxReleaseM3 - releaseM3;
		newBalanceQty = me.maxReleaseQty - releaseQty;

		refs.refDtlBalanceMt.setValue(newBalanceMt);
		refs.refDtlBalanceM3.setValue(newBalanceM3);
		refs.refDtlBalanceQty.setValue(newBalanceQty);
	}

	//eMantis: 0167587

	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * DETAIL START
	 */


	/**
	 * ISPS END
	 * =========================================================================================================================
	 */
});