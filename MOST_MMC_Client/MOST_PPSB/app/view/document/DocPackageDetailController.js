Ext.define('MOST.view.document.DocPackageDetailController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [

	],

	alias: 'controller.docpackagedetail',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	DETAIL_GRID_REF_NAME: 'refBlSnPkgDetailGrid',
	PACKAGE_DETAIL_SN_STORE: 'dtlShippingNotePkgDetail',
	PACKAGE_DETAIL_BL_STORE: 'dtlBlPkgDetail',

	CMDT_GROUP_CODE: '',
	PACKING_LIST: 'PL',
	MEASUREMENT_CARGO: 'MC',

	shipNoteItem: null,
	blItem: null,
	IX_CD: '',

	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onDetailLoad: function () {
		var me = this;
		var refs = me.getReferences();
		var initData = me.getView().shipNoteInitData;
		var detailView = me.getDetailBizView();
		var recvData = me.getView().recvData;

		var snNo = recvData.get('shipgNoteNo');
		var blNo = recvData.get('blNo');

		if (snNo) {
			me.loadPkgDetailSn();
			me.shipNoteItem = recvData;
			me.IX_CD = 'X';
			me.CMDT_GROUP_CODE = recvData.get('cmdtGroupCd');

		} else if (blNo) {
			me.loadPkgDetailBl();
			me.blItem = recvData;
			me.IX_CD = 'I';
			me.CMDT_GROUP_CODE = recvData.get('cmdtGroupCd');
		}

		me.setDetailSettingControl();
	},

	loadPkgDetailSn: function () {
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var pkgDetailListStore = me.getStore(me.PACKAGE_DETAIL_SN_STORE);
		var grid = me.lookupReference(me.DETAIL_GRID_REF_NAME);
		grid.setStore(pkgDetailListStore);

		pkgDetailListStore.removeAll();

		pkgDetailListStore.load({
			params: {
				vslCallId: recvData.get('vslCallId'),
				mfDocId: recvData.get('mfDocId'),
				shipgNoteNo: recvData.get('shipgNoteNo')
			},
			callback: function (records, operation, success) {
				if (success) {
				}
			}
		});

		var thePgkDetail = Ext.create('MOST.model.document.ShippingNote');
		thePgkDetail.commit();
		me.getViewModel().set({ thePgkDetail: thePgkDetail });

		// me.getViewModel().setData({theMain:recvData});
		// me.setDetailComboBox();
		// me.setDetailInitialize();
		// me.setDetailSettingControl(searchType);

		// var infoForm = detailView.down('form').getForm();
		// infoForm.isValid();	
	},

	loadPkgDetailBl: function () {
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var pkgDetailListStore = me.getStore(me.PACKAGE_DETAIL_BL_STORE);
		var grid = me.lookupReference(me.DETAIL_GRID_REF_NAME);
		grid.setStore(pkgDetailListStore);

		pkgDetailListStore.removeAll();

		pkgDetailListStore.load({
			params: {
				vslCallId: recvData.get('vslCallId'),
				mfDocId: recvData.get('mfDocId'),
				blNo: recvData.get('blNo'),
				orgBlNo: recvData.get('orgBlNo'),
			},
			callback: function (records, operation, success) {
				if (success) {
				}
			}
		});

		var thePgkDetail = Ext.create('MOST.model.document.BL');
		me.getViewModel().set({ thePgkDetail: thePgkDetail });
	},

	setDetailInitialize: function () {

	},

	setDetailControl: function (masterItem) {

	},

	setDetailSettingControl: function (searchType) {
		var me = this;
		var refs = me.getReferences();
		
		refs.refTotalQty.allowBlank = false;
		refs.refTotalMt.allowBlank = false;
		refs.refLength.allowBlank = true;
		refs.refWidth.allowBlank = true;
		refs.refHeight.allowBlank = true;
		refs.refMsrmt.allowBlank = true;

		if(me.CMDT_GROUP_CODE === me.PACKING_LIST) {
			refs.refPkgAgentId.allowBlank = true;
			refs.refMsrmt.setEditable (true);

		} else if(me.CMDT_GROUP_CODE === me.MEASUREMENT_CARGO) {
			refs.refLength.allowBlank = false;
			refs.refWidth.allowBlank = false;
			refs.refHeight.allowBlank = false;
			refs.refMsrmt.allowBlank = false;

			refs.refMsrmt.setEditable (false);
		} 

		me.onClearPackage();
	},
	/**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */

	/**
	 * Detail Package
	*/
	onChangePkgDetailQty: function (obj, newQty, oldQty) {
		var me = this;
		var refs = me.getReferences();
		var thePgkDetail = me.getViewModel().get('thePgkDetail');
		var inTotalPkgDtlQty = thePgkDetail.get('pkgUnitQty');
		var inTotalPkgDtlMt = thePgkDetail.get('pkgTotalWgt');
		var unitWgt = 0, unitVol = 0, totalVol = 0;

		if (newQty === 0 || newQty === '')
			return;

		//Calculate unit weight:
		unitWgt = Number(Number(inTotalPkgDtlMt / newQty).toFixed(3));

		//Calculate unit volume and Total volume
		var dL = thePgkDetail.get('length');
		var dW = thePgkDetail.get('width');
		var dH = thePgkDetail.get('height');
		var eachPkgVol = thePgkDetail.get('eachPkgVol');


		//If eachPkgVol is not null, calculate total volume
		if (eachPkgVol != '' && eachPkgVol > 0) {
			totalVol = Number(eachPkgVol * newQty);
			thePgkDetail.set('pkgTotalVol', Number(totalVol.toFixed(3)));
		}

		thePgkDetail.set('eachPkgWgt', unitWgt);
	},

	/**
	 * PPSB_20241115.Re-calculate the Unit TotalVol of package detail
	*/
	onChangePkgUnitVol: function (ctlField, newValue, oldValue, eOpts) {
		var me = this;
		var thePgkDetail = me.getViewModel().get('thePgkDetail');
		var inTotalPkgDtlQty = thePgkDetail.get('pkgUnitQty');
		var pkgTotalVol;

		pkgTotalVol = Number(newValue * inTotalPkgDtlQty).toFixed(3);
		thePgkDetail.set('pkgTotalVol', Number(pkgTotalVol));
	},

	/**
	 * PPSB_20241115. Re-calculate the Unit CgWgt of package detail
	*/
	onChangePkgTotalWgt: function (ctlField, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var thePgkDetail = me.getViewModel().get('thePgkDetail');
		var inTotalPkgDtlQty = thePgkDetail.get('pkgUnitQty');
		var unitWgt = 0;

		if (StringUtil.isNullorEmpty(inTotalPkgDtlQty) || inTotalPkgDtlQty == 0) {
			return;
		}

		unitWgt = Number(newValue / inTotalPkgDtlQty).toFixed(3)
		thePgkDetail.set('eachPkgWgt', unitWgt);
	},

	/**
	 * PPSB_20241115. Re-calculate the Unit CgVol of package detail
	 */
	onChangeLWH: function (ctl) {
		var me = this;
		var refs = me.getReferences();
		var thePgkDetail = me.getViewModel().get('thePgkDetail');
		var cgLen = 0, cgWth = 0, cgHgt = 0;

		cgLen = refs.refLength.getValue();
		cgWth = refs.refWidth.getValue();
		cgHgt = refs.refHeight.getValue();

		var pkgUnitMrsmt = cgLen * cgWth * cgHgt;

		refs.refMsrmt.suspendEvents();
		thePgkDetail.set('eachPkgVol', pkgUnitMrsmt.toFixed(3));
		refs.refMsrmt.resumeEvents();
	},

	/**
	 * Package Detail Grid Item Click
	*/
	onPkgGridItemClick: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.DETAIL_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if (selection == null)
			return;

		// Suspend events on the SNPackageDetail component
		refs.refTotalQty.suspendEvents(false);
		refs.refLength.suspendEvents(false);
		refs.refWidth.suspendEvents(false);
		refs.refHeight.suspendEvents(false);
		refs.refMsrmt.suspendEvents(false);

		refs.refTxtDtlPackageNo.setEditable(false);
		refs.refBtnUpdatePackage.setDisabled(false);
		refs.refBtnRemovePackage.setDisabled(false);

		// Perform data binding
		me.getViewModel().set({ thePgkDetail: selection.copy() });

		// Resume events on the SNPackageDetail component
		setTimeout(function () {
			refs.refTotalQty.resumeEvents();
			refs.refLength.resumeEvents();
			refs.refWidth.resumeEvents();
			refs.refHeight.resumeEvents();
			refs.refMsrmt.resumeEvents();
		}, 1000);
	},

	onClearPackage: function () {
		var me = this;
		var refs = me.getReferences();
		var thePgkDetail = me.getViewModel().get('thePgkDetail');

		me.clearPkgDetail(thePgkDetail);

		refs.refBlSnPkgDetailGrid.setSelection(null);
		refs.refBtnClearPackage.setDisabled(false);
		refs.refBtnAddPackage.setDisabled(false);
		refs.refBtnUpdatePackage.setDisabled(true);
		refs.refBtnRemovePackage.setDisabled(true);

		refs.refTxtDtlPackageNo.focus(true);
		refs.refTxtDtlPackageNo.setEditable(true);
		
	},

	/**
	 * PPSB_20241115 Add Package Detail
	*/
	onAddPackage: function () {
		var me = this;
		var recvData = me.getView().recvData;
		var shipgNoteNo = recvData.get('shipgNoteNo');
		var bl = recvData.get('shipgNoteNo');

		if (me.IX_CD == 'X') {
			me.addPackageSN(recvData);
		} else if (me.IX_CD == 'I') {
			me.addPackageBL(recvData);
		}
	},

	/**
	 * PPSB_20241115 Update Package row
	*/
	onUpdatePackage: function () {
		var me = this;

		if (me.IX_CD == 'X') {
			me.updatePackageSN();
		} else if (me.IX_CD == 'I') {
			me.updatePackageBL();
		}
	},

	/**
	 * Remove Package:
	*/
	onRemovePackage: function () {
		var me = this;

		if (me.IX_CD == 'X') {
			me.removePackageSN();
		} else if (me.IX_CD == 'I') {
			me.removePackageBL();
		}
	},

	/**
	 * Save button (CUD):
	*/
	onDetailSave: function () {
		var me = this;

		MessageUtil.question('confirm', 'infosave_msg', null,
			function (button) {
				if (button === 'ok') {
					if (me.IX_CD == 'X') {
						me.savePkgDetailSN();
					} else if (me.IX_CD == 'I') {
						me.savePkgDetailBL();
					}
				}
			}
		);
	},

	/**
   * =========================================================================================================================
   * EVENT HANDLER ENDrefPkgDetailGrid
   */

	/**
	 * GENERAL METHOD START
	 * =========================================================================================================================
	 */

	savePkgDetailSN: function () {
		var me = this;
		var pkgDetailArr = new Array();
		var store = me.getStore(me.PACKAGE_DETAIL_SN_STORE);
		var grid = me.lookupReference(me.DETAIL_GRID_REF_NAME);
		
		if(store.getModifiedRecords().length == 0){
			MessageUtil.warning("warning_msg", "There is no mandatory filled up, please recheck.", "");
			return;
		}

		store.getModifiedRecords().forEach(function (record) {
			pkgDetailArr.push(record.data);
		});

		var theSN = me.shipNoteItem;
		theSN.set('pkgItems', pkgDetailArr);


		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var isCreated = theSN.phantom;
		var proxy = theSN.getProxy();
		proxy.url = store.getProxy().url;
		//theSN.set('newVersion', me.generateUuid());		

		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('userId', MOST.config.Token.getUserId());
		updateParm.set('item', theSN.data);
		updateParm.save({
			success: function (record) {
				theSN.set("version", theSN.get('newVersion'));
				theSN.commit();

				store.each(function (record) {
					if(record.get('workingStatus') === WorkingStatus.DELETE){
						store.remove(record);

					} else {
						record.set('action', WorkingStatus.SELECT);
						record.set('workingStatus', WorkingStatus.SELECT);
					}
				});

				store.commitChanges();

				MessageUtil.confirmation('success_msg', 'savesuccess_msg', null,
					function (button) {
						if (button === 'ok') {

						}
					}
				);
			}
		});
	},

	savePkgDetailBL: function () {
		var me = this;
		var pkgDetailArr = new Array();
		var store = me.getStore(me.PACKAGE_DETAIL_BL_STORE);
		var grid = me.lookupReference(me.DETAIL_GRID_REF_NAME);
		
		if(store.getModifiedRecords().length == 0){
			MessageUtil.warning("warning_msg", "There is no mandatory filled up, please recheck.", "");
			return;
		}

		store.getModifiedRecords().forEach(function (record, index, array) {
			pkgDetailArr.push(record.data);
		});

		var theBL = me.blItem;
		theBL.set('pkgItems', pkgDetailArr);

		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var isCreated = theBL.phantom;
		var proxy = theBL.getProxy();
		proxy.url = store.getProxy().url;

		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('userId', MOST.config.Token.getUserId());
		updateParm.set('item', theBL.data);
		updateParm.save({
			success: function (record) {
				theBL.set("version", theBL.get('newVersion'));
				theBL.commit();

				store.each(function (record) {
					if(record.get('workingStatus') === WorkingStatus.DELETE){
						store.remove(record);

					} else {
						record.set('action', WorkingStatus.SELECT);
						record.set('workingStatus', WorkingStatus.SELECT);
					}
				});

				store.commitChanges();

				MessageUtil.confirmation('success_msg', 'savesuccess_msg', null,
					function (button) {
						if (button === 'ok') {
							var window = me.getView().up('window');
							var parentView = me.getParentView()
							if(parentView.getController().onSearch){
								parentView.getController().onSearch();
							}
							window.close()
						}
					}
				);
			}
		});
	},

	/**
	 * Add clear value of Package Detail model
	*/
	clearPkgDetail: function (model) {
		var me = this;
		var refs = me.getReferences();

		if (!model) {
			return;
		}
		refs.refTotalQty.suspendEvents(false);
		refs.refLength.suspendEvents(false);
		refs.refWidth.suspendEvents(false);
		refs.refHeight.suspendEvents(false);
		refs.refMsrmt.suspendEvents(false);		
	
		// Resume events on the SNPackageDetail component
		model.set('vslCallId', null);
		model.set('vslCd', null);
		model.set('callYear', null);
		model.set('callSeq', null);
		model.set('mfDocId', null);
		model.set('shipgNoteNo', null);
		model.set('pkgNo', null);
		model.set('pkgDesc', null);
		model.set('pkgTotalWgt', null);
		model.set('pkgTotalVol', null);
		model.set('eachPkgWgt', null);
		model.set('eachPkgVol', null);
		model.set('pkgUnitQty', null);
		model.set('length', null);
		model.set('width', null);
		model.set('height', null);
		model.set('pkgAgentId', null);
		model.set('pkgAgentRmk', null);
		model.set('pkgRmk', null);
		model.commit();

		setTimeout(function () {
			refs.refTotalQty.resumeEvents();
			refs.refLength.resumeEvents();
			refs.refWidth.resumeEvents();
			refs.refHeight.resumeEvents();
			refs.refMsrmt.resumeEvents();
		}, 1000);
	},

	/**
	 * Add Package for Shipping Note
	*/
	addPackageSN: function (theSN) {
		var me = this;
		var refs = me.getReferences();
		var thePgkDetail = me.getViewModel().get('thePgkDetail');
		var store = me.getStore(me.PACKAGE_DETAIL_SN_STORE);
		var newRecord = Ext.create('MOST.model.document.ShippingNote');
		var strValidation = "";
		var freighTon = 0;

		//1. Build the newRecord Model
		var listFields = ['vslCallId', 'vslCd', 'callSeq', 'callYear', 'mfDocId', 'shipgNoteNo'];
		var listFields2 = ['vslCallId', 'vslCd', 'callSeq', 'callYear', 'mfDocId', 'shipgNoteNo'
			, 'pkgNo', 'pkgDesc', 'pkgTotalWgt'
			, 'pkgTotalVol', 'eachPkgWgt', 'eachPkgVol'
			, 'pkgUnitQty', 'length', 'width'
			, 'height', 'pkgRmk', 'pkgAgentId'
			, 'pkgAgentRmk', 'pkgRmk'];

		me.updateRecord(thePgkDetail, theSN, listFields, false);
		me.updateRecord(newRecord, thePgkDetail, listFields2, false);

		//2.Validation
		var isValidPkgDtl = me.validatePackageDetail();
		if (!isValidPkgDtl) {
			return;
		}

		newRecord.set('ixCd', me.IX_CD);
		newRecord.set('userId', Token.getUserId());
		newRecord.set('workingStatus', WorkingStatus.INSERT);
		newRecord.set('action', WorkingStatus.INSERT);

		//3.Duplication check and Add
		if (me.onPkgDuplicatedValidation(refs.refTxtDtlPackageNo.getValue())) {
			store.insert(0, newRecord);

			//Canclulate total Qty, Weight, Measurement for SN:
			var totalQty = 0, totalWeight = 0, totalMsrmt = 0;
			store.each(function (record) {
				if (record.get('workingStatus') != WorkingStatus.DELETE) {
					totalQty += parseInt(record.get('pkgUnitQty'));
					totalWeight += parseFloat(record.get('pkgTotalWgt'));
					totalMsrmt += parseFloat(record.get('pkgTotalVol'));
				}
			});
			
			if (theSN.get('delvTpCd') == CodeConstants.MT_DELVTP_D) {
				theSN.set('dLrMt', totalWeight.toFixed(3));
				theSN.set('dLrM3', totalMsrmt.toFixed(3));
				theSN.set('dLrQty', stotalQty);

			} else if (theSN.get('delvTpCd') == CodeConstants.MT_DELVTP_I) {
				theSN.set('imt', totalWeight.toFixed(3));
				theSN.set('im3', totalMsrmt.toFixed(3));
				theSN.set('iqty', totalQty);
			}

			freighTon = Math.max(totalWeight, totalMsrmt);
			theSN.set('freightTon', freighTon.toFixed(3));
		}

		me.onClearPackage();
	},

	/**
	 * Add Package for BL
	*/
	addPackageBL: function (theBL) {
		var me = this;
		var refs = me.getReferences();
		var thePgkDetail = me.getViewModel().get('thePgkDetail');
		var store = me.getStore(me.PACKAGE_DETAIL_BL_STORE);
		var newRecord = Ext.create('MOST.model.document.BL');
		var freighTon = 0;

		var listFields = ['vslCallId', 'vslCd', 'callSeq', 'callYear', 'mfDocId', 'blNo'];
		var listFields2 = ['vslCallId', 'vslCd', 'callSeq', 'callYear', 'mfDocId', 'blNo'
			, 'pkgNo', 'pkgDesc', 'pkgTotalWgt'
			, 'pkgTotalVol', 'eachPkgWgt', 'eachPkgVol'
			, 'pkgUnitQty', 'length', 'width'
			, 'height', 'pkgRmk', 'pkgAgentId'
			, 'pkgAgentRmk', 'pkgRmk'];

		me.updateRecord(thePgkDetail, theBL, listFields, false);
		me.updateRecord(newRecord, thePgkDetail, listFields2, false);

		//1.Validation
		var isValidPkgDtl = me.validatePackageDetail();
		if (!isValidPkgDtl) {
			return;
		}

		newRecord.set('ixCd', me.IX_CD);
		newRecord.set('userId', Token.getUserId());
		newRecord.set('workingStatus', WorkingStatus.INSERT);
		newRecord.set('action', WorkingStatus.INSERT);

		//2.Douplication check
		if (me.onPkgDuplicatedValidation(newRecord.get('pkgNo'))) {
			store.insert(0, newRecord);
			var totalQty = 0, totalWeight = 0, totalMsrmt = 0;
			store.each(function (record) {
				if (record.get('workingStatus') != WorkingStatus.DELETE) {
					totalQty += parseInt(record.get('pkgUnitQty'));
					totalWeight += parseFloat(record.get('pkgTotalWgt'));
					totalMsrmt += parseFloat(record.get('pkgTotalVol'));
				}
			});

			freighTon = Math.max(totalWeight, totalMsrmt);
			theBL.set('wgt', totalWeight.toFixed(3));
			theBL.set('vol', totalMsrmt.toFixed(3));
			theBL.set('pkgQty', totalQty);
			theBL.set('freightTon', freighTon.toFixed(3));
			var eachWgt = totalWeight / totalQty
			var eachVol = totalMsrmt / totalQty
			theBL.set('eachWgt', eachWgt.toFixed(3));
			theBL.set('eachVol', eachVol.toFixed(3));
		}

		//me.getViewModel().set({thePgkDetail: Ext.create('MOST.model.document.BL')});
		me.onClearPackage();
	},

	updatePackageSN: function () {
		var me = this;
		var refs = me.getReferences();
		var theSN = me.shipNoteItem;
		var thePgkDetail = me.getViewModel().get('thePgkDetail');
		var grid = me.lookupReference(me.DETAIL_GRID_REF_NAME);
		var store = grid.getStore();
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if (selection == null)
			return;

		var isValidPkgDtl = me.validatePackageDetail();
		if (!isValidPkgDtl) {
			return;
		}

		//Check Duplicated Package No:
		if (selection.get('pkgNo') != thePgkDetail.get('pkgNo')
			&& me.onPkgDuplicatedValidation(refs.refTxtDtlPackageNo.getValue())) {
			return;
		}

		var freighTon = 0;
		var listFields = ['vslCallId', 'vslCd', 'callSeq', 'callYear', 'mfDocId', 'shipgNoteNo'
			, 'pkgNo', 'pkgDesc', 'pkgTotalWgt'
			, 'pkgTotalVol', 'eachPkgWgt', 'eachPkgVol'
			, 'pkgUnitQty', 'length', 'width'
			, 'height', 'pkgRmk', 'pkgAgentId'
			, 'pkgAgentRmk', 'pkgRmk'];

		me.updateRecord(selection, thePgkDetail, listFields, false);
		selection.set('workingStatus', WorkingStatus.UPDATE);

		//Canclulate total Qty, Weight, Measurement for SN:
		var totalQty = 0, totalWeight = 0, totalMsrmt = 0;
		store.each(function (record) {
			if (record.get('workingStatus') != WorkingStatus.DELETE) {
				totalQty += parseInt(record.get('pkgUnitQty'));
				totalWeight += parseFloat(record.get('pkgTotalWgt'));
				totalMsrmt += parseFloat(record.get('pkgTotalVol'));
			}
		});

		if (me.shipNoteItem.get('delvTpCd') == CodeConstants.MT_DELVTP_D) {
			theSN.set('dLrMt', totalWeight.toFixed(3));
			theSN.set('dLrM3', totalMsrmt.toFixed(3));
			theSN.set('dLrQty', stotalQty);

		} else if (me.shipNoteItem.get('delvTpCd') == CodeConstants.MT_DELVTP_I) {
			theSN.set('imt', totalWeight.toFixed(3));
			theSN.set('im3', totalMsrmt.toFixed(3));
			theSN.set('iqty', totalQty);
		}

		//Update Freight Ton
		freighTon = Math.max(totalWeight, totalMsrmt);
		theSN.set('freightTon', freighTon.toFixed(3));

		me.onClearPackage();
	},

	updatePackageBL: function () {
		var me = this;
		var refs = me.getReferences();
		var thePgkDetail = me.getViewModel().get('thePgkDetail');
		var theBL = me.blItem;
		var grid = me.lookupReference(me.DETAIL_GRID_REF_NAME);
		var store = grid.getStore();
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var currPkgNo;
		var strValidation = "";

		if (selection == null)
			return;

		var isValidPkgDtl = me.validatePackageDetail();
		if (!isValidPkgDtl) {
			return;
		}

		//Check Duplicated Package No:
		if (selection.get('pkgNo') != thePgkDetail.get('pkgNo')
			&& me.onPkgDuplicatedValidation(refs.refTxtDtlPackageNo.getValue())) {
			return;
		}

		var listFields = ['pkgNo', 'pkgDesc', 'pkgTotalWgt'
			, 'pkgTotalVol', 'eachPkgWgt', 'eachPkgVol'
			, 'pkgUnitQty', 'length', 'width'
			, 'height', 'pkgRmk', 'pkgAgentId'
			, 'pkgAgentRemark', 'pkgRmk'];

		me.updateRecord(selection, thePgkDetail, listFields, false);
		selection.set('workingStatus', WorkingStatus.UPDATE);

		var totalQty = 0, totalWeight = 0, totalMsrmt = 0;
		store.each(function (record) {
			totalQty += parseInt(record.get('pkgUnitQty'));
			totalWeight += parseFloat(record.get('pkgTotalWgt'));
			totalMsrmt += parseFloat(record.get('pkgTotalVol'));
		});

		theBL.set('wgt', totalWeight);
		theBL.set('vol', totalMsrmt);
		theBL.set('pkgQty', totalQty);

		var eachWgt = totalWeight / totalQty
		var eachVol = totalMsrmt / totalQty
		theBL.set('eachWgt', eachWgt.toFixed(3));
		theBL.set('eachVol', eachVol.toFixed(3));

		//Update Freight Ton
		freighTon = Math.max(totalWeight, totalMsrmt);
		theBL.set('freightTon', freighTon.toFixed(3));

		me.onClearPackage();

	},

	validatePackageDetail: function () {
		var me = this;
		var detailView = me.getDetailBizView();
		var infoForm =  me.getView().getForm();
		
		var isValidForm = infoForm.isValid ();
		if (!isValidForm) {
			MessageUtil.warning("warning_msg", "mandatoryForm_msg", "");
			return false;
		}

		var thePgkDetail = me.getViewModel().get('thePgkDetail');
		var strValidation = "";

		if (StringUtil.isNullorEmpty(thePgkDetail.get('pkgNo'))) {
			if (StringUtil.isNullorEmpty(strValidation)) {
				strValidation += ViewUtil.getLabel('packageNo');
			} else {
				strValidation = strValidation + ", " + ViewUtil.getLabel('packageNo');
			}
		}

		if (StringUtil.isNullorEmpty(thePgkDetail.get('pkgTotalWgt'))) {
			if (StringUtil.isNullorEmpty(strValidation)) {
				strValidation += ViewUtil.getLabel('mt');
			} else {
				strValidation = strValidation + ", " + ViewUtil.getLabel('mt');
			}
		}

		if (StringUtil.isNullorEmpty(thePgkDetail.get('pkgUnitQty')) || thePgkDetail.get('pkgUnitQty') == 0) {
			if (StringUtil.isNullorEmpty(strValidation)) {
				strValidation += ViewUtil.getLabel('qty');
			} else {
				strValidation = strValidation + ", " + ViewUtil.getLabel('qty');
			}
		}

		if (StringUtil.isNullorEmpty(thePgkDetail.get('vslCallId'))) {
			if (StringUtil.isNullorEmpty(strValidation)) {
				strValidation += ViewUtil.getLabel('vslcallid');
			} else {
				strValidation = strValidation + ", " + ViewUtil.getLabel('vslcallid');
			}
		}

		if (StringUtil.isNullorEmpty(thePgkDetail.get('mfDocId'))) {
			if (StringUtil.isNullorEmpty(strValidation)) {
				strValidation += ViewUtil.getLabel('mfDocId');
			} else {
				strValidation = strValidation + ", " + ViewUtil.getLabel('vslcallid');
			}
		}

		if (!StringUtil.isNullorEmpty(strValidation)) {
			MessageUtil.warning("warning_msg", "mandatoryField_msg", strValidation);
			return false;
		}

		return true;
	},

	removePackageSN: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.PACKAGE_DETAIL_SN_STORE);
		var grid = me.lookupReference(me.DETAIL_GRID_REF_NAME);
		var selectionArr = grid.getSelection() == null ? null : grid.getSelection();
		var theSN = me.shipNoteItem;

		if (theSN.get('statCd') == 'AP') {
			MessageUtil.warning("warning_msg", "sn_hasBeenApproved");
			return;
		}

		if (selectionArr == null || selectionArr.length == 0) return;

		Ext.each(selectionArr, function (record) {
			if (record.get('workingStatus') == WorkingStatus.INSERT)
				store.remove(record);
			else {
				record.set('workingStatus', WorkingStatus.DELETE);
				record.set('action', WorkingStatus.DELETE);
			}
		});

		//Canclulate total Qty, Weight, Measurement for SN:
		var totalQty = 0, totalWeight = 0, totalMsrmt = 0;
		store.each(function (record) {
			if (record.get('workingStatus') != WorkingStatus.DELETE) {
				totalQty += parseInt(record.get('pkgUnitQty'));
				totalWeight += parseFloat(record.get('pkgTotalWgt'));
				totalMsrmt += parseFloat(record.get('pkgTotalVol'));
			}
		});

		if (theSN.get('delvTpCd') == CodeConstants.MT_DELVTP_D) {
			theSN.set('dLrMt', totalWeight.toFixed(3));
			theSN.set('dLrM3', totalMsrmt.toFixed(3));
			theSN.set('dLrQty', stotalQty);

		} else if (theSN.get('delvTpCd') == CodeConstants.MT_DELVTP_I) {
			theSN.set('imt', totalWeight.toFixed(3));
			theSN.set('im3', totalMsrmt.toFixed(3));
			theSN.set('iqty', totalQty);
		}

		//Update Freight Ton
		freighTon = Math.max(totalWeight, totalMsrmt);
		theSN.set('freightTon', freighTon.toFixed(3));

		me.onClearPackage();
	},

	removePackageBL: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.PACKAGE_DETAIL_BL_STORE);
		var grid = me.lookupReference(me.DETAIL_GRID_REF_NAME);
		var selectionArr = grid.getSelection() == null ? null : grid.getSelection();
		var theBL = me.blItem;

		if (selectionArr == null || selectionArr.length == 0) return;

		Ext.each(selectionArr, function (record) {
			if (record.get('workingStatus') == WorkingStatus.INSERT) {
				store.remove(record);
			} else {
				record.set('workingStatus', WorkingStatus.DELETE);
				record.set('action', WorkingStatus.DELETE);
			}
		});

		var totalQty = 0, totalWeight = 0, totalMsrmt = 0;
		store.each(function (record) {
			if (record.get('workingStatus') != WorkingStatus.DELETE) {
				totalQty += parseInt(record.get('pkgUnitQty'));
				totalWeight += parseFloat(record.get('pkgTotalWgt'));
				totalMsrmt += parseFloat(record.get('pkgTotalVol'));
			}
		});

		var freighTon = Math.max(totalWeight, totalMsrmt);
		theBL.set('wgt', totalWeight.toFixed(3));
		theBL.set('vol', totalMsrmt.toFixed(3));
		theBL.set('pkgQty', totalQty);
		theBL.set('freightTon', freighTon.toFixed(3));

		me.onClearPackage();
	},

	onPkgDuplicatedValidation: function (pkgNo) {
		var me = this;
		var refs = me.getReferences();
		var store;

		if (me.IX_CD == 'X') {
			store = me.getStore(me.PACKAGE_DETAIL_SN_STORE);
		} else if (me.IX_CD == 'I') {
			store = me.getStore(me.PACKAGE_DETAIL_BL_STORE);
		}

		if (store.data.length == 0) {
			return true;
		}

		for (var j = 0; j < store.data.length; j++) {
			if (pkgNo === store.data.items[j].get('pkgNo')) {
				MessageUtil.warning('warning_msg', 'validate_duplicate_package_no');
				return false;
			}
		}

		return true;
	},

	onWeightChkSetting: function (recvData) {
		var me = this;
		var refs = me.getReferences();
		var theSN = me.getViewModel().get('theMain');

		refs.refWeightChk.setDisabled(true);
		refs.refWeightChk.setValue(false);

		if ((recvData && recvData.get('cgTpCd') == CodeConstants.MT_CGTP_BBK) || theSN && theSN.get('cgTpCd') == CodeConstants.MT_CGTP_BBK
			|| (recvData && recvData.get('cgTpCd') == CodeConstants.MT_CGTP_DBN) || theSN && theSN.get('cgTpCd') == CodeConstants.MT_CGTP_DBN) {
			refs.refWeightChk.setDisabled(MOST.config.Token.getUserType() == CodeConstants.USER_TYPE_INTERNAL ? false : true);
		}
	},

	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});