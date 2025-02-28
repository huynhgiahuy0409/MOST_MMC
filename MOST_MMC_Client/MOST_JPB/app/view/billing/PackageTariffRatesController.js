Ext.define('MOST.view.billing.PackageTariffRatesController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	mixins: {
		tariffCodeController: 'MOST.view.billing.TariffCodeController'
	},

	alias: 'controller.packagetariffrates',


	MAX_PERIOD_DAY: 93,
	SUM_RATE: '',
	tempValue: '',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */

	onLoad: function () {
		var me = this;
		var refs = me.getReferences();
		var searchTariffCodeCombo = me.getStore('tariffCodeComboPkg');
		searchTariffCodeCombo.load();
	},

	onSearch: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('masterPackTariffList');
		var sumStore = me.getStore('packageSumList');
		var peFromDate = refs.ctlPeDateFromDt == null ? null : refs.ctlPeDateFromDt.getValue();
		var peToDate = refs.ctlPeDateToDt == null ? null : refs.ctlPeDateToDt.getValue();
		var tariffCombo = refs.ctlTrfTypeCombo;
		var tariffTp = tariffCombo.getValue();
		var partnerCode = refs.cltPartnerCodetxf.getValue();
		var stringFromDate = peFromDate == null ? null : Ext.Date.format(peFromDate, MOST.config.Locale.getShortDate());
		var stringToDate = peToDate == null ? null : Ext.Date.format(peToDate, MOST.config.Locale.getShortDate());

		var params = {
			ptnrCd: partnerCode,
			trfTp: tariffTp,
			startDtm: stringFromDate,
			endDtm: stringToDate
		};
		if (params == null) {
			return;
		}
		var grid = me.lookupReference('refPackageTariffRateGrid');
		var myMask = new Ext.LoadMask({
			msg: 'Loading...',
			target: grid
		});
		myMask.show();
		store.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					var sumList = records[0].get('sumList');
					sumStore.setData(sumList);
					myMask.hide();
				}
			}
		});
	},

	// Not Used
	getSearchCondition: function () {
		var me = this;
		var refs = me.getReferences();
		var peFromDate = refs.ctlPeDateFromDt == null ? null : refs.ctlPeDateFromDt.getValue();
		var peToDate = refs.ctlPeDateToDt == null ? null : refs.ctlPeDateToDt.getValue();
		var tariffTp = refs.ctlTrTypeCombo.getValue();
		var partnerCode = refs.cltPartnerCodetxf.getValue();

		var stringFromDate = peFromDate == null ? null : Ext.Date.format(peFromDate, MOST.config.Locale.getShortDate());
		var stringToDate = peToDate == null ? null : Ext.Date.format(peToDate, MOST.config.Locale.getShortDate());
		var params = {
			ptnrCd: partnerCode,
			trfTp: tariffTp,
			startDtm: stringFromDate,
			endDtm: stringToDate
		};
		return params;
	},


	onBDClick: function () {
		var me = this;
		var grid = me.lookupReference('refPackageTariffRateGrid');
		var item = grid.getSelection()[0];
		var selection = grid.getSelection() === null ? null : grid.getSelection()[0];
		selection.set('workingStatus', 'U');
		if (selection === null) return;
		var title = 'Package Taiff Rates Detail';
		me.getView().detailViewAlias = 'app-packagetariffratedetail';
		me.openDetailPopup(selection, title, false);
	},

	openPartnerCdTypePopup: function () {
		var me = this;
		var params = {
			searchModule: 'MT'
		};
		me.openCodePopup('popup-partnercdtypepopup', 'cltPartnerCodetxf', params);
	},
	openPartnerCdTypePopupHead: function () {
		var me = this;
		var params = {
			searchModule: 'MT'
		};
		me.openCodePopup('popup-partnercdtypepopup', 'refPartnertxt', params);
	},
	openPartnerCdForMultiPopup: function () {
		var me = this;
		var params = {
			searchPtyDivCd: 'TRK',  // CNS, FWD, TRK
			initSearch: true		// true, false
		};
		me.openCodePopup('popup-partnercdformultipopup', 'refConsignee', params);
	},

	openCommonCodeForMultiPopup: function () {
		var me = this;
		var params = {
			searchDivCd: 'CMDT',
			initSearch: false
		};
		me.openCodePopup('popup-cmmcdformultipopup', 'refComdt', params);
	},

	// ?
	onAdd: function () {
		var me = this;
		var refs = me.getReferences();
		var selection = Ext.create('MOST.model.billing.PackageTariffRate');
		var title = 'Package Taiff Rates Detail';
		me.getView().detailViewAlias = 'app-packagetariffratedetail';
		selection.set('workingStatus', 'C');
		me.openDetailPopup(selection, title);
	},

	openPackageTariffDetail: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refPackageTariffRateDetailGrid');
		me.getView().detailViewAlias = 'app-tariffcodesdetail';
		var item = grid.getSelection()[0];
		var selection = grid.getSelection() === null ? null : grid.getSelection()[0];
		selection.set('searchTp', 'TRF_DTL');
		selection.set('openDtl', 'Y');
		me.openDetailPopup(selection, 'Package Tariff Rates Detail');
	},
	
	onBlur: function () {
		var me = this;
		var dateCondition = me.checkFromToDate('ctlPeDateFromDt', 'ctlPeDateToDt');
		if (dateCondition == null) {
			return null;
		}
	},
	onChangeDate: function (field, newValue, oldValue) {
		var me = this;
		var refs = me.getReferences();
		var fromDate = refs.ctlPeDateFromDt.getValue();
		var toDate = refs.ctlPeDateToDt.getValue();
		/*if(fromDate == null && toDate == null) {
			MessageUtil.alert('Warning', 'mandatoryForm_msg');
			return;
		}*/
		if (fromDate >= toDate && (fromDate != null) && (toDate != null)) {
			MessageUtil.alert('Warning', 'validPeriod_msg');
			field.setValue(null);
			return;
		}
	},

	onClear: function () {
		var me = this;
		var refs = me.getReferences();
		refs.refTrCd.setValue('');
		refs.refDesc.setValue('');
		refs.refPartnerRate.setValue('');
		refs.refRate.setValue('');
		refs.btnFindTariff.setDisabled(false);
		//var store= me.getStore('partnerTariffRateDetailGrid');
		var grid = me.lookupReference('refPackageTariffRateDetailGrid');
		grid.getSelectionModel().clearSelections();
		//store.clearData();
	},

	/**
	 * =========================================================================================================================
	 * DETAIL START
	 */
	// [ADD] Detail View Initialization Part
	onPackageDetailLoad: function () {
		var me = this;
		var recvData = me.getDetailBizView().items.get(0).recvData;
		me.getView().center();
		me.onDetailPackageLoad();
		me.configureToolButtons(recvData);
	},

	configureToolButtons: function () {
		var me = this;
		var bizView = me.getDetailBizView();
		me.visibleDetailToolButton(ViewUtil.TOOL_SAVE, true);
	},


	onDetailPackageLoad: function () {
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var infoForm = detailView.down('form').getForm();
		var recvData = detailView.items.get(0).recvData;
		infoForm.isValid(); // Mandatory to appear red for.

		if (recvData.data.workingStatus == 'C' || recvData.data.workingStatus == 'U') {
			refs.btnFindTariff.setDisabled(false);
		} else {
			refs.btnFindTariff.setDisabled(true);
		}
		me.setDetailInitialize();
	},

	setDetailInitialize: function () {
		var me = this;
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var masterStore = me.getStore('masterPackTariffList');
		var pkgTrfStore = me.getStore('packageTariffRateList');
		var berthStore = me.getStore('berthListStore');
		berthStore.load({
			params: null,
			callback: function (records, ope, success) {
				if (success) {
				}
			}
		});
		var detailgridStore = me.getStore("packageTariffRateList");
		detailgridStore.removeAll();
		detailgridStore.commitChanges();
		if (recvData.data.workingStatus === 'C') {
			me.getViewModel().setData({ theCurrentDetail: recvData });
		} else {
			me.setDetailControlTab(recvData);

		}
	},
	setDetailControlTab: function (recvData) {
		var me = this;
		var refs = me.getReferences();
		var masterStore = me.getStore('masterPackTariffList');
		var pkgTrfStore = me.getStore('packageTariffRateList');
		var masterItem = masterStore.getData().items[0];
		var pkgTrfData = masterItem.get('packTrfList');
		var pkgArr = [];
		var pkgCondList = masterItem.get('condsList');
		var pkgCondData = [];
		var pkgPrptList = masterItem.get('prptList');
		var pkgPrptData = [];
		var sumRate = 0;
		Ext.Array.forEach(pkgTrfData, function (item) {
			if (recvData.get('pkgTrfNo') == item.pkgTrfNo) {
				sumRate += Number(item.unitPrc);
				pkgArr.push(item);
			}
		});
		pkgTrfStore.setData(pkgArr);
		pkgTrfStore.clearFilter();

		Ext.Array.forEach(pkgCondList, function (item) {
			if (item.agreNo === recvData.get('pkgTrfNo')) {
				pkgCondData.push(item);
			}
		});

		Ext.Array.forEach(pkgPrptList, function (item) {
			if (item.agreNo === recvData.get('pkgTrfNo')) {
				pkgPrptData.push(item);
			}
		});
		me.getViewModel().setData({ theCurrentDetail: recvData });
		refs.refAplDt.setValue(recvData.get('aplyYmd'));
		refs.refExpDt.setValue(recvData.get('exprYmd'));

		var deliveryStr = '';
		var berthString = '';
		var formVsl = '', formCargo = '';
		var toVsl = '', toCargo = '';
		var cargoType = '', commodity = '';
		var CheckLOA = false;

		Ext.Array.forEach(pkgCondData, function (item) {

			if (item.prptCd === 'PC2') {
				if (commodity === '') {
					if (item.chrVal === null || item.chrVal === 'null')
						commodity += '';
					else { commodity += item.chrVal; }
				}
				else {
					commodity += ',' + item.chrVal;
				}
			}
			if (item.prptCd === 'PC1') {
				if (cargoType === '') {
					if (item.chrVal === null || item.chrVal === 'null')
						cargoType += '';
					else { cargoType += item.chrVal; }
				}
				else {
					cargoType += ',' + item.chrVal;
				}
			}

			if (item.prptCd === 'P2') {
				berthString = item.chrVal;
			}

			//Vessel Fieldset
			if (item.prptCd === 'PV1' && item.tierVal1 != null && item.tierVal2 != null) {
				formVsl = item.tierVal1;
				toVsl = item.tierVal2;
				CheckLOA = true;
			}
			if (item.prptCd === 'PV2' && item.tierVal1 != null && item.tierVal2 != null) {
				formVsl = item.tierVal1;
				toVsl = item.tierVal2;
				CheckLOA = false;

			}
			if (item.prptCd === 'PC3' && item.tierVal1 != null && item.tierVal2 != null) {
				formCargo = item.tierVal1;
				toCargo = item.tierVal2;

			}
		});


		refs.refBerthNo.setValue(berthString);
		refs.refcargoType.setValue(cargoType);
		refs.refFormVsl.setValue(formVsl);
		refs.refToVsl.setValue(toVsl);
		refs.refComdt.setValue(commodity);
		refs.refFromCargo.setValue(formCargo);
		refs.refToCargo.setValue(toCargo);
		if (CheckLOA) {
			refs.refLOA.setValue(true);
		} else {
			refs.refDWT.setValue(true);
		}
		var checkedCrgo = refs.chbCargo.checked;
		var checkedVsl = refs.chbVsl.checked;

		if (formVsl !== '' || toVsl !== '') {
			me.onFieldsetDisabled(refs.fieldSetVsl, false);
			Ext.getCmp('cbVsl').setValue(true);
		} else {
			// refs.fieldSetVsl.setDisabled(true);
			me.onFieldsetDisabled(refs.fieldSetVsl, true);
			Ext.getCmp('cbVsl').setValue(false);
		}
		if (toCargo !== '' || formCargo !== '' || cargoType !== '' || commodity !== '') {
			// refs.fieldSetCargo.setDisabled(false);
			me.onFieldsetDisabled(refs.fieldSetCargo, false);
			Ext.getCmp('cbCargo').setValue(true);
		} else {
			// refs.fieldSetCargo.setDisabled(true);
			me.onFieldsetDisabled(refs.fieldSetCargo, true);
			Ext.getCmp('cbCargo').setValue(false);

		}
		refs.operator.setText('=');
		refs.sumRate.setText(sumRate.toString());

	},


	setComboStore: function (masterItem) {
		var me = this;
		var refs = me.getReferences();
		var berthCombo = me.getStore('berthComboStore');
		var berthItems = masterItem.berthList;
		berthCombo.setData(berthItems);

	},


	onCellClick: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refPackageTariffRateDetailGrid');

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if (selection == null) return;

		refs.btnFindTariff.setDisabled(true);
		refs.refTrCd.setValue(selection.data.trfCd);
		refs.refDesc.setValue(selection.data.descr);
		refs.refPartnerRate.setValue(selection.data.unitPrc);
		refs.refRate.setValue(selection.data.stdPrc);

	},

	/*
		The check boxs of Detail Head
	 */
	onCheckedChangeVsl: function () {
		var me = this;
		var refs = me.getReferences();
		var checkedVsl = refs.chbVsl.checked;

		if (checkedVsl == false) {
			me.onFieldsetDisabled(refs.fieldSetVsl, true);
			refs.refFormVsl.setValue('');
			refs.refToVsl.setValue('');
		} else {
			me.onFieldsetDisabled(refs.fieldSetVsl, false);
		}
	},
	onCheckedChangeCargo: function () {
		var me = this;
		var refs = me.getReferences();
		var checkedCrgo = refs.chbCargo.checked;
		// var fdsetCrgo = refs.fieldSetCargo;

		if (checkedCrgo == false) {
			me.onFieldsetDisabled(refs.fieldSetCargo, true);// fdsetCrgo.setDisabled(true);
			refs.refFromCargo.setValue('');
			refs.refToCargo.setValue('');
			refs.refcargoType.setValue('');
			refs.refComdt.setValue('');
		} else {
			me.onFieldsetDisabled(refs.fieldSetCargo, false);// fdsetCrgo.setDisabled(false);
		}
	},

	openCargoPopup: function () {
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recv = refs.refcargoType.getValue();

		var params = {
			data: recv,
			initSearch: false
		};

		me.openCodePopup('popup-cargotypepopup', 'refcargoType', params);
	},
	openVesselMultiPopup: function () {
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		//var recv = detailView.items.get(0).recvData;
		var recv = refs.refVesselCode.getValue();
		var params = {
			data: recv,
			initSearch: false
		};
		me.openCodePopup('popup-vesselcalllistmulti', 'refVesselCode', params);
	},


	onChangeUppercase: function (field, newValue) {
		field.setValue(newValue.toUpperCase());
	},

	/** toolbar button of details */
	onDetailSave: function () {
		var me = this;

		me.saveProcess();
	},
	saveProcess: function () {
		var me = this;
		var refs = me.getReferences();
		var detailStore = me.getStore('packageTariffRateList');
		var deletedStore = me.getStore('deletedPackageTariffRateList');
		var masterItem = Ext.create('MOST.model.billing.PackageTariffRate');
		var detailView = me.getDetailBizView();
		var arrTab1 = [];
		var detailItem = me.getViewModel().getData().theCurrentDetail;
		var isCreated = detailItem.phantom;
		var appDate = refs.refAplDt.getValue();
		var expDate = refs.refExpDt.getValue();
		var stringAppDate = appDate == null ? null : Ext.Date.format(appDate, MOST.config.Locale.getShortDate());
		var stringExpDate = expDate == null ? null : Ext.Date.format(expDate, MOST.config.Locale.getShortDate());
		var dataStore = detailStore.data.items;
		var dataDeletedStore = deletedStore.data.items;
		var pkgNmField = refs.refPackagetxt;
		var partnerField = refs.refPartnertxt;
		var refNoField = refs.refRefNoTxt;
		var pkgRateField = refs.refPackageRatetxt;
		var appDateField = refs.refAplDt;
		var expDateField = refs.refExpDt;

		if (StringUtil.isNullorEmpty(pkgRateField.getValue()) || isNaN(pkgRateField.getValue())) {
			MessageUtil.warning("PackageTariffRate", "Package rate is not number or empty");
			return;
		}

		if (StringUtil.isNullorEmpty(partnerField.getValue())) {
			MessageUtil.warning("PackageTariffRate", "partnerCd_pack_tariff_rate_warning_msg");
			return;
		}
		if (StringUtil.isNullorEmpty(pkgNmField.getValue())) {
			MessageUtil.warning("PackageTariffRate", "pack_Name_tariff_rate_warning_msg");
			return;
		}

		if (StringUtil.isNullorEmpty(stringAppDate)) {
			MessageUtil.warning("PackageTariffRate", "applyDate_pack_tariff_rate_warning_msg");
			return;
		}
		if (StringUtil.isNullorEmpty(stringExpDate)) {
			MessageUtil.warning("PackageTariffRate", "expiredDate_pack_tariff_rate_warning_msg");
			return;
		}

		if (appDate >= expDate) {
			MessageUtil.alert('Warning', 'validPeriod_msg');
			return;
		}

		// check the package rate in detail tab
		var check = false;
		Ext.Array.forEach(dataStore, function (item) {
			if (StringUtil.isNullorEmpty(item.get('unitPrc'))) {
				check = true;
			}
		});

		if (check) {
			MessageUtil.alert('Warning', 'Please insert Rate by each row at grid in tab Detail');
			return;
		}

		Ext.Array.forEach(dataStore, function (item) {
			item.set('pkgNm', pkgNmField.getValue());
			item.set('pkgPrc', pkgRateField.getValue());
			item.set('ptnrCd', partnerField.getValue());
			item.set('aplyYmd', stringAppDate);
			item.set('exprYmd', stringExpDate);
			item.set('rmk', refNoField.getValue());
		});

		me.setConditionPakageRate(detailItem);

		if (detailItem.dirty == true || detailStore.getModifiedRecords().length > 0 || dataDeletedStore.length > 0) {//update
			// CREATE, UPDATE RECORD

			detailStore.getModifiedRecords().forEach(function (record, index, array) {
				record.set('userId', MOST.config.Token.getUserId());
				if (record.get('pkgTrfNo') == '') {
					record.set('pkgTrfNo', detailItem.data.pkgTrfNo);
				}
				if (record.get('workingStatus') == null || record.get('workingStatus') == '') {
					record.set('workingStatus', detailItem.get('workingStatus'));
				}
				arrTab1.push(record.data);
			});
			var delCount = 0;
			dataDeletedStore.forEach(function (record, index, array) {
				if (record.get('pkgTrfNo') == '') {
					record.set('pkgTrfNo', detailItem.data.pkgTrfNo);
				}
				record.set('workingStatus', 'D');
				delCount++;
				arrTab1.push(record.data);
			});
			if (dataStore.length == 0 && delCount == 0) {
				MessageUtil.warning("Warning", "add_partner_tariff_rate_warning_msg");
				return;
			}

			var pkgRate = detailItem.data.pkgPrc;
			var sumRate = 0;
			dataStore.forEach(function (item) {
				sumRate += Number(item.get('unitPrc'));
			});
			if (Number(pkgRate) != Number(sumRate)) {
				MessageUtil.warning("Warning", "pack_rate_not_equal_msg");
				return;
			}

			detailItem.set('packTrfList', arrTab1);

			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/packagetariffrate/detaillist';
			updateParm.phantom = isCreated;
			updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
			updateParm.set('userId', MOST.config.Token.getUserId());
			updateParm.set("item", detailItem.data);

			updateParm.save({
				success: function (records) {
					records.data.workingStatus = 'U';
					detailItem.commit();
					detailStore.commitChanges();
					me.onSearch();
					MessageUtil.saveSuccess();
					deletedStore.removeAll();
				}
			});

		}

	},
	onUpdateDetailGrid: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refPackageTariffRateDetailGrid');
		var selection = grid.getSelectionModel().getSelection()[0];
		var txtPartnerRate = refs.refPartnerRate.getValue();

		if (!selection) {
			MessageUtil.warning("PackageTariffRate", "select_record_warning_msg");	 // select_record_warning_msg: Must be selected a record first in tab Detail.
			return;
		}

		selection.set('unitPrc', txtPartnerRate);
	},

	afterSetCodePopupData: function (xtype, targetControl, returnValue) {
		var control = this.lookupReference(targetControl);
		var me = this
		if (targetControl === 'btnFindTariff') {
			var result = returnValue.item;
			var arrTariff = new Array();

			Ext.Array.forEach(result, function (item) {
				var it = Ext.create('MOST.model.billing.PackageTariffRate');
				it.set('trfCd', item.trfCd);
				it.set('subTrfCd', item.subTrfCd);
				it.set('trfTpCd', item.trfTpCd);
				it.set('descr', item.descr);
				it.set('stdPrc', item.stdPrc);
				//it.set('unitPrc', item.unitPrc);
				it.set('pkgPrc', item.pkgPrc);
				it.set('ivUnit1', item.ivUnit1);
				it.set('ivUnit2', item.ivUnit2);
				it.set('ivUnit3', item.ivUnit3);
				it.set('costCntCd', item.costCntCd);
				it.set('billTpCd', item.billTpCd);
				it.set('prcTpCd', 'K');
				it.set('workingStatus', 'C');
				arrTariff.push(it);
			});

			//var storePartner = me.getStore('packageTariffRateList');
			var grid = me.lookupReference('refPackageTariffRateDetailGrid');
			var storePartner = grid.store;
			if (storePartner.data.length == 0) {
				storePartner.setData(arrTariff);
			} else {
				var indexStore = storePartner.data.length;
				for (var i = 0; i < arrTariff.length; i++) {
					//storePartner.insert(i+indexStore, arrTariff[i]);
					grid.store.add(arrTariff[i]);
				}
			}

		} else {
			if (returnValue) {
				control.setValue(returnValue.code);
			} else {
				control.setValue("");
			}
		}

	},
	onRemove: function () {
		var me = this;
		var grid = me.lookupReference('refPackageTariffRateGrid');
		var store = me.getStore('masterPackTariffList');

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if (selection == null) return;

		MessageUtil.question('remove', 'infodelete_msg', null,
			function (button) {
				if (button === 'ok') {
					var delPackageItem = new Ext.create('MOST.model.billing.PackageTariffRate');
					delPackageItem.set({
						'workingStatus': WorkingStatus.DELETE,
						packTrfList: [],
						condsList: [],
						prptList: []
					});
					delPackageItem.phantom = false;
					delPackageItem.proxy.type = 'rest';
					delPackageItem.proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/packagetariffrate/list';

					target_pkgTrfNo = selection.get('pkgTrfNo');
					delPackageItem.set('pkgTrfNo', target_pkgTrfNo);
					store.getData().getAt(0).get('packTrfList').forEach(record => {
						if (record.pkgTrfNo == target_pkgTrfNo) {
							record.workingStatus = WorkingStatus.DELETE;
							delPackageItem.get('packTrfList').push(record)
						}
					})
					store.getData().getAt(0).get('condsList').forEach(record => {
						if (record.agreNo == target_pkgTrfNo) {
							record.workingStatus = WorkingStatus.DELETE;
							delPackageItem.get('condsList').push(record)
						}
					})
					store.getData().getAt(0).get('prptList').forEach(record => {
						if (record.agreNo == target_pkgTrfNo) {
							record.workingStatus = WorkingStatus.DELETE;
							delPackageItem.get('prptList').push(record)
						}
					})
					delPackageItem.erase({
						success: function () {
							MessageUtil.saveSuccess();
							me.onSearch();
						}
					});
				}
			});
	},
	onRemoveGridDetail: function () {
		var me = this;
		var grid = me.lookupReference('refPackageTariffRateDetailGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var deletedStore = me.getStore('deletedPackageTariffRateList');
		var store = me.getStore('packageTariffRateList');
		if (selection && selection.data.trfRegNo && selection.data.trfRegNo != '') {
			deletedStore.add(selection);
		}
		store.remove(selection);
	},
	//Tariff popup
	openTariffCodePopup: function () {
		var me = this;
		var params = {
			title: 'Tariff Code List'
		}
		me.openCodePopup('app-tariffcodepopup', 'btnFindTariff', params);
	},
	setConditionPakageRate: function (detailItem) {
		var me = this;
		var refs = me.getReferences();
		seq = 1;
		pkgRateCondArr = new Array();
		pkgRatePrptArr = new Array();

		for (var i = 1; i <= 7; i++) {
			if (i == 1) {
				var vslCd = refs.refVesselCode.getValue().split(',');
				vslCd.forEach(function (data) {
					var pkgCondItem = Ext.create('MOST.model.billing.PackageTariffRateConds');

					pkgCondItem.set('prptCd', 'P1');
					pkgCondItem.set('seq', seq);
					pkgCondItem.set('oprIdtCd', 'EQ');
					pkgCondItem.set('chrVal', data);
					pkgCondItem.set('newVersion', me.generateUuid());
					pkgCondItem.set('workingStatus', 'C');
					pkgCondItem.set('userId', MOST.config.Token.getUserId());

					pkgRateCondArr.push(pkgCondItem.getData());
					seq++;
				});

				var pkgCondPrptItem = Ext.create('MOST.model.billing.PackageTariffRatePrpt');

				pkgCondPrptItem.set('prptCd', 'P1');
				pkgCondPrptItem.set('prcTpCd', 'K');
				pkgCondPrptItem.set('prptNm', 'Vessel Codes');
				pkgCondPrptItem.set('dataTpCd', 'CHAR');
				pkgCondPrptItem.set('dataLen', '4');
				pkgCondPrptItem.set('newVersion', me.generateUuid());
				pkgCondPrptItem.set('workingStatus', 'C');
				pkgCondPrptItem.set('userId', MOST.config.Token.getUserId());

				pkgRatePrptArr.push(pkgCondPrptItem.getData());
			}
			if (i == 2) {
				var perthNo = refs.refBerthNo.getValue();

				var pkgCondItem = Ext.create('MOST.model.billing.PackageTariffRateConds');

				pkgCondItem.set('prptCd', 'P2');
				pkgCondItem.set('seq', seq);
				pkgCondItem.set('oprIdtCd', 'EQ');
				pkgCondItem.set('chrVal', perthNo);
				pkgCondItem.set('newVersion', me.generateUuid());
				pkgCondItem.set('workingStatus', 'C');
				pkgCondItem.set('userId', MOST.config.Token.getUserId());

				pkgRateCondArr.push(pkgCondItem.getData());

				var pkgCondPrptItem = Ext.create('MOST.model.billing.PackageTariffRatePrpt');

				pkgCondPrptItem.set('prptCd', 'P2');
				pkgCondPrptItem.set('prcTpCd', 'K');
				pkgCondPrptItem.set('prptNm', 'Berth No');
				pkgCondPrptItem.set('dataTpCd', 'CHAR');
				pkgCondPrptItem.set('dataLen', '4');
				pkgCondPrptItem.set('newVersion', me.generateUuid());
				pkgCondPrptItem.set('workingStatus', 'C');
				pkgCondPrptItem.set('userId', MOST.config.Token.getUserId());

				pkgRatePrptArr.push(pkgCondPrptItem.getData());
			}
			if (i == 3) {
				var cargoType = refs.refcargoType.getValue().split(',');
				cargoType.forEach(function (data) {
					var pkgCondItem = Ext.create('MOST.model.billing.PackageTariffRateConds');

					pkgCondItem.set('prptCd', 'PC1');
					pkgCondItem.set('seq', seq);
					pkgCondItem.set('oprIdtCd', 'EQ');
					pkgCondItem.set('chrVal', data);
					pkgCondItem.set('newVersion', me.generateUuid());
					pkgCondItem.set('workingStatus', 'C');
					pkgCondItem.set('userId', MOST.config.Token.getUserId());

					pkgRateCondArr.push(pkgCondItem.getData());
					seq++;
				});

				var pkgCondPrptItem = Ext.create('MOST.model.billing.PackageTariffRatePrpt');

				pkgCondPrptItem.set('prptCd', 'PC1');
				pkgCondPrptItem.set('prcTpCd', 'K');
				pkgCondPrptItem.set('prptNm', 'Cargo Type');
				pkgCondPrptItem.set('dataTpCd', 'CHAR');
				pkgCondPrptItem.set('dataLen', '5');
				pkgCondPrptItem.set('newVersion', me.generateUuid());
				pkgCondPrptItem.set('workingStatus', 'C');
				pkgCondPrptItem.set('userId', MOST.config.Token.getUserId());

				pkgRatePrptArr.push(pkgCondPrptItem.getData());
			}
			if (i == 4) {
				var commodity = refs.refComdt.getValue().split(',');
				commodity.forEach(function (data) {
					var pkgCondItem = Ext.create('MOST.model.billing.PackageTariffRateConds');

					pkgCondItem.set('prptCd', 'PC2');
					pkgCondItem.set('seq', seq);
					pkgCondItem.set('oprIdtCd', 'EQ');
					pkgCondItem.set('chrVal', data);
					pkgCondItem.set('newVersion', me.generateUuid());
					pkgCondItem.set('workingStatus', 'C');
					pkgCondItem.set('userId', MOST.config.Token.getUserId());

					pkgRateCondArr.push(pkgCondItem.getData());
					seq++;
				});

				var pkgCondPrptItem = Ext.create('MOST.model.billing.PackageTariffRatePrpt');

				pkgCondPrptItem.set('prptCd', 'PC2');
				pkgCondPrptItem.set('prcTpCd', 'K');
				pkgCondPrptItem.set('prptNm', 'Commodity');
				pkgCondPrptItem.set('dataTpCd', 'CHAR');
				pkgCondPrptItem.set('dataLen', '5');
				pkgCondPrptItem.set('newVersion', me.generateUuid());
				pkgCondPrptItem.set('workingStatus', 'C');
				pkgCondPrptItem.set('userId', MOST.config.Token.getUserId());

				pkgRatePrptArr.push(pkgCondPrptItem.getData());
			}
			if (i == 5) {
				var tierQtyFr = refs.refFromCargo.getValue();
				var tierQtyTo = refs.refToCargo.getValue();
				var pkgCondItem = Ext.create('MOST.model.billing.PackageTariffRateConds');

				pkgCondItem.set('prptCd', 'PC3');
				pkgCondItem.set('seq', seq);
				pkgCondItem.set('oprIdtCd', 'EQ');
				pkgCondItem.set('tierVal1', tierQtyFr);
				pkgCondItem.set('tierVal2', tierQtyTo);
				pkgCondItem.set('newVersion', me.generateUuid());
				pkgCondItem.set('workingStatus', 'C');
				pkgCondItem.set('userId', MOST.config.Token.getUserId());

				pkgRateCondArr.push(pkgCondItem.getData());

				var pkgCondPrptItem = Ext.create('MOST.model.billing.PackageTariffRatePrpt');

				pkgCondPrptItem.set('prptCd', 'PC3');
				pkgCondPrptItem.set('prcTpCd', 'K');
				pkgCondPrptItem.set('prptNm', 'Handled Qty');
				pkgCondPrptItem.set('dataTpCd', 'TIER');
				pkgCondPrptItem.set('dataLen', '5');
				pkgCondPrptItem.set('newVersion', me.generateUuid());
				pkgCondPrptItem.set('workingStatus', 'C');
				pkgCondPrptItem.set('userId', MOST.config.Token.getUserId());

				pkgRatePrptArr.push(pkgCondPrptItem.getData());
			}
			if (i == 6) {
				var ckLoa = refs.rdGrpVsl.getValue().rd;
				var tierLoaFr = '';
				var tierLoaTo = '';
				if (ckLoa == '1') {
					tierLoaFr = refs.refFormVsl.getValue();
					tierLoaTo = refs.refToVsl.getValue();
				}

				var pkgCondItem = Ext.create('MOST.model.billing.PackageTariffRateConds');

				pkgCondItem.set('prptCd', 'PV1');
				pkgCondItem.set('seq', seq);
				pkgCondItem.set('oprIdtCd', 'EQ');
				pkgCondItem.set('tierVal1', tierLoaFr);
				pkgCondItem.set('tierVal2', tierLoaTo);
				pkgCondItem.set('newVersion', me.generateUuid());
				pkgCondItem.set('workingStatus', 'C');
				pkgCondItem.set('userId', MOST.config.Token.getUserId());

				pkgRateCondArr.push(pkgCondItem.getData());

				var pkgCondPrptItem = Ext.create('MOST.model.billing.PackageTariffRatePrpt');

				pkgCondPrptItem.set('prptCd', 'PV1');
				pkgCondPrptItem.set('prcTpCd', 'K');
				pkgCondPrptItem.set('prptNm', 'LOA');
				pkgCondPrptItem.set('dataTpCd', 'TIER');
				pkgCondPrptItem.set('dataLen', '5');
				pkgCondPrptItem.set('newVersion', me.generateUuid());
				pkgCondPrptItem.set('workingStatus', 'C');
				pkgCondPrptItem.set('userId', MOST.config.Token.getUserId());

				pkgRatePrptArr.push(pkgCondPrptItem.getData());
			}
			if (i == 7) {
				var ckLoa = refs.rdGrpVsl.getValue().rd;
				var tierLoaFr = '';
				var tierLoaTo = '';
				if (ckLoa == '2') {
					tierLoaFr = refs.refFormVsl.getValue();
					tierLoaTo = refs.refToVsl.getValue();
				}

				var pkgCondItem = Ext.create('MOST.model.billing.PackageTariffRateConds');

				pkgCondItem.set('prptCd', 'PV2');
				pkgCondItem.set('seq', seq);
				pkgCondItem.set('oprIdtCd', 'EQ');
				pkgCondItem.set('tierVal1', tierLoaFr);
				pkgCondItem.set('tierVal2', tierLoaTo);
				pkgCondItem.set('newVersion', me.generateUuid());
				pkgCondItem.set('workingStatus', 'C');
				pkgCondItem.set('userId', MOST.config.Token.getUserId());

				pkgRateCondArr.push(pkgCondItem.getData());

				var pkgCondPrptItem = Ext.create('MOST.model.billing.PackageTariffRatePrpt');

				pkgCondPrptItem.set('prptCd', 'PV2');
				pkgCondPrptItem.set('prcTpCd', 'K');
				pkgCondPrptItem.set('prptNm', 'DWT');
				pkgCondPrptItem.set('dataTpCd', 'TIER');
				pkgCondPrptItem.set('dataLen', '5');
				pkgCondPrptItem.set('newVersion', me.generateUuid());
				pkgCondPrptItem.set('workingStatus', 'C');
				pkgCondPrptItem.set('userId', MOST.config.Token.getUserId());

				pkgRatePrptArr.push(pkgCondPrptItem.getData());
			}
			seq++
		}

		detailItem.set('condsList', pkgRateCondArr);
		detailItem.set('prptList', pkgRatePrptArr);
	},

	onFieldsetDisabled: function (refer, flag) {
		var me = this;
		var refs = me.getReferences();

		refer.setDisabled(flag);
	},
});