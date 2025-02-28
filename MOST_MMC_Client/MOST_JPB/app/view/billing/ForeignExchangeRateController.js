Ext.define('MOST.view.billing.ForeignExchangeRateController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.foreignexchangerate',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refforeignexchangerateGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'foreignExchangeRateList',
	MAX_PERIOD_DAY: 100,
	CREAT_FLAG: 'FALSE',
	UPDATE_FLAG: 'FALSE',

	LIST_PROXY_URL: MOST.config.Locale.getRestApiDestUrl() + '/v1/foreignexchangerate/list',
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
		var applyDateComboStore = me.getStore('applyDateCombo');
		var searchParm = Ext.create('MOST.model.billing.SearchForeignExchangeRateParm');

		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({ theSearch: searchParm });
		me.updateViewStyle(me.getView());

		searchParm.set('progress', 'N');

		applyDateComboStore.load({
			callback: function (records, operation, success) {
				if (success) {
					refs.refBtnCopyRate.setDisabled(true);
					refs.refCopyRateApplyDateCombo.setDisabled(true);

					if (records && records.length > 0) {
						refs.refApplyDateCombo.setValue(records[records.length - 1]);
						refs.refApplyDateDt.setValue(records[records.length - 1].data.applyDate);
						refs.refExpireDateDt.setValue(records[records.length - 1].data.expireDate);
						me.onSearch();
					}
				}
			}
		});
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
	onSearch: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();

		if (params == null) {
			return;
		}

		store.getProxy().url = me.LIST_PROXY_URL;
		store.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					if (records.length > 0) {
						refs.refBtnCopyRate.setDisabled(true);
						refs.refCopyRateApplyDateCombo.setDisabled(true);
						refs.refApplyDateDt.setDisabled(true);
						refs.refExpireDateDt.setDisabled(true);
						me.CREAT_FLAG = "FALSE";
					}
				}
			}
		});
	},

	// Grid Add
	onAdd: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var currencyMaster = me.getStore('currencyMaster');

		refs.refApplyDateDt.setDisabled(false);
		refs.refExpireDateDt.setDisabled(false);
		refs.refBtnCopyRate.setDisabled(false);
		refs.refCopyRateApplyDateCombo.setDisabled(false);

		store.getProxy().url = currencyMaster.getProxy().url;
		store.load({
			callback: function (records, operation, success) {
				if (success) {
					refs.refApplyDateDt.setValue(null);
					refs.refExpireDateDt.setValue(null);

					records.forEach(function (record, index) {
						record.set("workingStatus", WorkingStatus.INSERT);
					});
					me.CREAT_FLAG = "TRUE";
				}
			}
		});
	},

	onCopyRate: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var copyStore = me.getStore('copyForeignExchangeRate');
		var applyDate = refs.refCopyRateApplyDateCombo.lastMutatedValue.split('~');

		if (applyDate == '') {
			MessageUtil.warning("foreignexchangerate", "select_applyDate_msg");
			return null;
		}

		copyStore.load({
			params: {
				applyDate: applyDate[0].trim(),
				expireDate: applyDate[1].trim(),
			},
			callback: function (records, operation, success) {
				if (success) {
					records.forEach(function (record, index) {
						var idx = store.findBy(function (item) {
							return (item.get('currency') === record.get('currency'));
						});

						if (idx >= 0) {
							store.getAt(idx).set('rate', record.get("rate"));
							store.getAt(idx).set('descr', record.get("descr"));
						}
					});
				}
			}
		});
	},

	onUpdate: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refforeignexchangerateGrid');
		var store = me.getStore(me.MAIN_STORE_NAME);
		var masterItem = Ext.create('MOST.model.billing.ForeignExchangeRate');
		var arrItems = new Array();

		var applyDate = me.checkDate("refApplyDateDt");
		var expireDate = me.checkDate("refExpireDateDt");

		var dateCondition = me.checkFromToDate("refApplyDateDt", "refExpireDateDt");
		var duplicateDate = me.getStore('foreignExchangeRateListDuplicateDate');

		var applyDateDt = refs.refApplyDateDt.getValue();
		var expireDateDt = refs.refExpireDateDt.getValue();

		if (dateCondition == null) {
			return null;
		}

		if (applyDateDt == null || applyDateDt == '' || expireDateDt == null || expireDateDt == '') {
			MessageUtil.warning("foreignexchangerate", "foreignexchangerate_date_update_msg");
			return null;
		}

		me.UPDATE_FLAG = "TRUE";

		if (me.CREAT_FLAG == "TRUE" && me.UPDATE_FLAG == "TRUE") {
			duplicateDate.load({
				params: {
					applyDate: applyDate.dateString,
					expireDate: expireDate.dateString
				},
				callback: function (records, operation, success) {
					if (success) {
						if (records.length > 0) {
							MessageUtil.warning("foreignexchangerate", "foreignexchangerate_date_overlapped_msg");
							me.onLoad();
							return null;
						} else {
							store.getModifiedRecords().forEach(function (record, index, array) {
								record.data.applyNewDate = applyDate.dateString;
								record.data.expireNewDate = expireDate.dateString;
								record.data.workingStatus = WorkingStatus.INSERT;
								arrItems.push(record.data);
							});

							//To perform the save logic only when modified
							if (masterItem.dirty || arrItems.length > 0) {
								var proxy = masterItem.getProxy();
								proxy.url = me.LIST_PROXY_URL;

								masterItem.set("workingStatus", WorkingStatus.UPDATE);
								masterItem.set("items", arrItems);
								masterItem.save({
									success: function () {
										store.reload();
										MessageUtil.saveSuccess();
										me.onLoad();
									}
								});
							}
						}
					}
				}
			});
		} else if (me.CREAT_FLAG == "FALSE" && me.UPDATE_FLAG == "TRUE") {
			store.getModifiedRecords().forEach(function (record, index, array) {
				record.data.applyDate = applyDate.dateString;
				record.data.expireDate = expireDate.dateString;
				record.set("workingStatus", WorkingStatus.UPDATE);

				if (record.data.rate != null || record.data.rate != 0) {
					arrItems.push(record.data);
				}
			});

			//To perform the save logic only when modified
			if (masterItem.dirty || arrItems.length > 0) {
				var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
				updateParm.getProxy().url = me.LIST_PROXY_URL;
				updateParm.phantom = false;
				updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));

				updateParm.set('items', arrItems);
				updateParm.save({
					success: function () {
						masterItem.commit();
						store.commitChanges();
						store.reload();
						MessageUtil.saveSuccess();
					}
				});
			}
		}
	},

	// Grid Edit
	onEdit: function (editor, context) {
		var me = this;
	},

	// Grid Validate Edit
	onValidateEdit: function (editor, context) {
		var me = this;
		var refs = me.getReferences();
		var code = context.newValues.codeCostCenter;
		var params = {
			codeCostCenter: code
		}

		me.gridDupliationCheck(editor, context, duplicateCheckStore, params);
	},

	// Grid Cancel Edit
	onCancelEdit: function (rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},

	onRemove: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference('refforeignexchangerateGrid');
		var arrItems = new Array();

		var applyDate = me.checkDate("refApplyDateDt");

		MessageUtil.question('remove', 'infodelete_msg', null,
			function (button) {
				if (button === 'ok') {
					store.each(function (record, index) {
						if (record.data.applyDate != '' && record.data.expireDate != '') {
							record.data.workingStatus = WorkingStatus.DELETE
							arrItems.push(record.data);
							return false;
						}
					});

					//To perform the save logic only when modified
					if (arrItems.length > 0) {
						var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');

						updateParm.getProxy().url = me.LIST_PROXY_URL;
						updateParm.phantom = false;
						updateParm.drop();
						updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
						updateParm.set('items', new Array());

						updateParm.get('items').push(arrItems[0]);
						updateParm.save({
							success: function () {
								store.reload();
								MessageUtil.saveSuccess();
								me.onLoad();
								me.onSearch();
							}
						});
					}
				}
			}
		);
	},

	onCboApplyDtSelect: function (combo, records, eOpts) {
		var me = this;
		var refs = me.getReferences();

		refs.refApplyDateDt.setValue(records.data.applyDate);
		refs.refExpireDateDt.setValue(records.data.expireDate);
	},
	// Grid Row Double
	onDblClick: function () {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
	},

	onExportExcelPdfWithServer: function (gridNameString, isExcel) {
		var me = this;
		var refs = me.getReferences();
		var searchBizParm = me.getSearchCondition();

		searchBizParm.classID = 'com.tsb.most.biz.parm.billing.SearchForeignExchangeRateParm';
		searchBizParm.serviceID = 'MOST.foreignExchangeRate.selectCurrencyList'

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

		var dateCondition = me.checkPeriodDate("refApplyDateDt", "refExpireDateDt");

		var frmDate = dateCondition.fromDtString;
		var toDate = dateCondition.toDtString;

		var params = me.createParam(searchParm);

		params['applyDate'] = frmDate;
		params['expireDate'] = toDate;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();

		return params;
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});