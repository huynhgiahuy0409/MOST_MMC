Ext.define('MOST.view.planning.SpaceMovementPlanController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.spacemovementplan',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refSpaceMovementPlanGrid',
	MAIN_STORE_NAME: 'spaceMovementPlan',
	DETAIL_GRID_REF_NAME: 'refSpaceMovementPlanDetailGrid',
	DETAIL_STORE_NAME: 'spaceMovementPlanDetail',
	MAX_PERIOD_DAY: 31,	// MAX PERIOD DATE
	alertYN: 'N',
	alertTp: '',
	PARAMETTER_CHECK_SPACE_MOVEMENT_PLAN_FOR_REQ_TYPE_COMBO_STORE: 'spaceMovementPlanForReqTypeCombo',
	PARAMETTER_CHECK_SPACE_MOVEMENT_PLAN_FOR_STATUS_COMBO_STORE: 'spaceMovementPlanForStatusCombo',
	PARAMETTER_CHECK_SPACE_MOVEMENT_REQUEST_TYPE_COMBO_STORE: 'spaceMovementRequestTypeCombo',
	PARAMETTER_CHECK_SPACE_MOVEMENT_REQUEST_TYPE_EXTRA_COMBO_STORE: 'spaceMovementRequestTypeExtraCombo',
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

		me.setComboBoxWithLocalCache(CacheServiceConstants.SPACE_MOVEMENT_PLAN_FOR_REQ_TYPE_COMBO, me.PARAMETTER_CHECK_SPACE_MOVEMENT_PLAN_FOR_REQ_TYPE_COMBO_STORE);
		me.setComboBoxWithLocalCache(CacheServiceConstants.SPACE_MOVEMENT_PLAN_FOR_STATUS_COMBO, me.PARAMETTER_CHECK_SPACE_MOVEMENT_PLAN_FOR_STATUS_COMBO_STORE);
		me.setDateInDays('ctlSpaceMovementPlanFromDt', -me.MAX_PERIOD_DAY);
		me.setDateInDays('ctlSpaceMovementPlanToDt');

		var recvData = me.getView().recvData;

		if (recvData != null) {
			refs.ctlSpaceMovementPlanFromDt.setValue('');
			refs.ctlSpaceMovementPlanToDt.setValue('');
			me.alertYN = 'Y';
			me.alertTp = recvData.alertTp;

		}
		var searchParm = Ext.create('MOST.model.planning.SearchSpaceMovementPlanParm');

		me.setSearchParm(searchParm);
		me.getViewModel().setData({ theSearch: searchParm });
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		//me.onSearch();
	},

	onUnitListLoad: function () {
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var store = me.getStore('unitNosList');

		store.load({
			params: {
				vslCallId: recvData.get('vslCallId'),
				blNo: recvData.get('blSn'),
				shipgNoteNo: recvData.get('blSn'),
				doNo: recvData.get('doNo'),
				sdoNo: recvData.get('sdogrNo'),
				grNo: recvData.get('sdogrNo'),
				catgCd: recvData.get('catgCd')
			},
			callback: function (records, operation, success) {
				if (success) {
				}
			}
		});

	},

	onDetailLoad: function () {
		var me = this;
		var mainItem = new Ext.create('MOST.model.planning.SpaceMovementPlan');
		var searchParm = Ext.create('MOST.model.planning.SearchSpaceMovementPlanParm');

		me.setDetailInitialize();
		me.setComboBoxWithLocalCache(CacheServiceConstants.SPACE_MOVEMENT_REQUEST_TYPE_EXTRA_COMBO, me.PARAMETTER_CHECK_SPACE_MOVEMENT_REQUEST_TYPE_EXTRA_COMBO_STORE);
		me.setComboBoxWithLocalCache(CacheServiceConstants.SPACE_MOVEMENT_REQUEST_TYPE_COMBO, me.PARAMETTER_CHECK_SPACE_MOVEMENT_REQUEST_TYPE_COMBO_STORE);

		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
	},

	setDetailInitialize: function (masterItem) {
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var vslStore = me.getStore('VesselCallIdPopupStore');
		var store = me.getStore(me.DETAIL_STORE_NAME);
		var locationStore = me.getStore('locationCombo');
		var theDetail = me.getViewModel().get('theDetail');
		 
		me.getViewModel().setData({ theDetail: recvData });

		locationStore.load();

		refs.ctlSpaceMovementRequestDetailMvTp.setVisible(false);

		if(theDetail && !StringUtil.isNullorEmpty(theDetail.get('vslCallId'))) {
			vslStore.load({
				params: {
					vslCallId: theDetail.get('vslCallId'),
					mode: 'textfield'
				},
				callback: function (records, operation, success) {
					if (success) {
						if (records.length > 0) {
							refs.ctlVesselName.setValue(records[0].get('vslNm'));
						}	
					}
				}
			});
		}
		
		if (!StringUtil.isNullorEmpty(recvData.get('reqNo'))) {
			refs.cttReqNo.setValue(recvData.get('reqNo'));
			refs.ctlJpvc.updateEditableControl(false);
			refs.ctlDetailScn.updateEditableControl(false);
			
			var params = {
				vslCallId: recvData.get('vslCallId'),
				vslCd: recvData.get('vslCd'),
				reqNo: recvData.get('reqNo'),
			}

			store.load({
				params: params,
				callback: function (records, operation, success) {
					if (success) {
						store.commitChanges();
					}
				}
			});
		} else {
			me.setDetailInitializeForNewRequest();
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
		me.alertYN = 'N';
		me.onSearch();
	},

	onSearch: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('spaceMovementPlan');
		var params = me.getSearchCondition();

		if (params == null) {
			return;
		}

		store.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
				}
			}
		});
	},

	onAdd: function () {
		var me = this;
		var refs = me.getReferences();
		var item = Ext.create('MOST.model.planning.SpaceMovementPlan');
		var vesselDetail = me.getViewModel().get('vesselDetail');

		if (vesselDetail) {
			item.set('vslCallId', vesselDetail.get('vslCallId'));
			item.set('scn', vesselDetail.get('scn'));
			item.set('vslNm', vesselDetail.get('vslNm'));
		} else {
			item.set('vslCallId', refs.ctlSpaceMovementPlanVesselCallId.getValue());
			item.set('scn', refs.ctlScn.getValue());
		}

		item.set('reqNo', '');

		me.getView().detailViewAlias = 'app-spacemovementplandetail';

		me.openDetailPopup(item);
	},

	onDblClick: function () {
		var me = this;
		var grid = me.lookupReference('refSpaceMovementPlanGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if (selection == null) return;

		me.getMfDocIdWhenDblClickFromGrid(selection.get('vslCallId'));

		me.getView().detailViewAlias = 'app-spacemovementplandetail';
		me.openDetailPopup(selection);
	},

	onDetailDblClick: function () {
		var me = this;
		var grid = me.lookupReference(me.DETAIL_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if (selection == null) return;
		if (selection.get('cgTpCd') != 'RCV') {
			return;
		} else {
			me.getView().detailViewAlias = 'popup-spacemovementplanUnitdetail';
			me.openDetailPopup(selection);
		}

	},

	onRemove: function () {
		var me = this;
		var grid = me.lookupReference('refSpaceMovementPlanGrid');
		var store = me.getStore('spaceMovementPlan');
		var addItem = Ext.create('MOST.model.planning.SpaceMovementPlan');
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var selections = grid.getSelection() == null ? null : grid.getSelection();
		var validateDelete = true;
		var deleteItems = new Array();

		if (selections.length == 0) {
			return;
		}

		selections.every(function (record) {
			if (record.get('statCd') === 'CNF') {
				return (validateDelete = false);
			}
			record.set('workingStatus', WorkingStatus.DELETE);
			deleteItems.push(record.data);
		});

		if (!validateDelete) {
			MessageUtil.warning('warning_msg', 'spacemovement_planned_msg'); // PN114018
			return;
		}

		MessageUtil.question('remove', 'infodelete_msg', null,
			function (button) {
				if (button === 'ok') {
					me.deleteProcess(deleteItems, selections);
				}
			}
		);
	},

	onRetrieve: function () {
		var me = this
			, store = me.getStore(me.DETAIL_STORE_NAME)
			, params = me.getDetailSearchCondition();

		if (params == null) {
			return;
		}

		store.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					} else {
						store.commitChanges();
					}
				}
			}
		});
	},

	onCellLocBtnClicked: function () {
		var me = this;
		var refs = me.getReferences();
		var theDetail = me.getViewModel().get('theDetail');

		if (!theDetail) {
			return;
		}

		if (me.lookupReference('ctlAreaLocation').getValue() == null || me.lookupReference('ctlAreaLocation').getValue() == '') {
			MessageUtil.warning('warning', 'msgSelectLocation');
			return;
		} else {
			var params = {
				locId: me.lookupReference('ctlAreaLocation').getValue(),
				locIds: refs.ctlAreaCell.getValue()
			};

			me.openCodePopup('popup-spacemovementallocationpopup', 'ctlAreaLocation', params);
		}
	},

	onGridRowClick: function (grid, record, column, rowIndex, e) {
		var me = this;
		var mfDocId = record.get('mfDocId'); 
		var theUpdateDetail = Ext.create('MOST.model.planning.SpaceMovementPlan');
		var id = theUpdateDetail.get('id');
		
		theUpdateDetail.set(record.data);
		theUpdateDetail.set('id', id);

		if (record.get('catgCd') === 'I') {
			theUpdateDetail.set('masterBL', mfDocId);
			me.getBlCombo();
			me.getDoCombo(record);
		} else if (record.get('catgCd') === 'E') {
			theUpdateDetail.set('bookingNo', mfDocId);
			me.getSnCombo();
			me.getGrCombo();
		}
		
		theUpdateDetail.commit();

		me.getViewModel().set('theDetail', theUpdateDetail);
	},


	onSelectionChange: function (grid) {
		var me = this;
		var refs = me.getReferences();
		var totalMT = 0;
		var totalM3 = 0;
		var totalQty = 0;
		var selections = grid.getSelection();

		selections.forEach(function (record) {
			totalMT = totalMT + Number(record.get('reqWgt'));
			totalM3 = totalM3 + Number(record.get('reqMsrmt'));
			totalQty = totalQty + Number(record.get('reqQty'));
		})

		refs.ctlTotalMT.setValue(totalMT);
		refs.ctlTotalM3.setValue(totalM3);
		refs.ctlTotalQty.setValue(totalQty);
	}, 

	onSelectDate: function () {
		var me = this;

		me.getPeriodDays();
	},

	onConfirm: function () {
		var me = this;
		var detailStore = me.getStore('spaceMovementPlanDetail');
		var missingIdRecords = [];

		for (let i = 0; i < detailStore.getCount(); i++) {
			if (StringUtil.isNullorEmpty(detailStore.getAt(i).get('planLocId'))) {
				missingIdRecords.push(i + 1);
			}
		}
		if (missingIdRecords.length > 0) {
			MessageUtil.warning('warning', "Missing Plan location for records: " + missingIdRecords.join(", ") + ".");
			return;
		}
		MessageUtil.question('Space/Movement Plan', 'spcMovPlanConfirmMsg', null,
			function (button) {
				if (button === 'ok') {
					me.fncConfirm();
				}
			}
		);
	},

	fncConfirm: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = refs[me.DETAIL_GRID_REF_NAME];
		var theDetail = me.getViewModel().get('theDetail');
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var detailStore = grid.getStore();
		var modifiedRecords = detailStore.getModifiedRecords();
		var detailView = me.getDetailBizView();

		var updateItems = [...modifiedRecords].map(item => {
			item.set('userId', MOST.config.Token.getUserId());
			return item.data;
		});

		updateParm.getProxy().url = detailStore.getProxy().url;
		updateParm.set('items', updateItems);
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);

		updateParm.save({
			callback: function (records, operation, success) {
				if (success) {
					detailView.items.get(0).recvData.dirty = false;
					theDetail.commit();

					MessageUtil.confirmation('success_msg', 'savesuccess_msg', null,
						function (button) {
							if (button === 'ok') {
								detailView.close();
								me.onSearch();
							}
						}
					);
				}
			}
		});

	}, 
	
	onReject: function () {
		var me = this;

		MessageUtil.question('Space/Movement Plan', 'spcMovPlanRejectMsg', null,
			function (button) {
				if (button === 'ok') {
					me.fncReject();
				}
			}
		);
	},

	fncReject: function () {
		var me = this;
		var store = me.getStore(me.DETAIL_STORE_NAME);
		
		var recvData = me.getDetailBizView().items.get(0).recvData;
		recvData.set('insertType', 'reject');

		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');

		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = false;
		updateParm.set({
			'workingStatus': WorkingStatus.UPDATE,
			'item': recvData.data
		});

		updateParm.save({
			callback: function (records, operation, success) {
				if (success) {
					var theDetail = me.getViewModel().get('theDetail');
					var detailView = me.getDetailBizView();

					if (theDetail) {
						theDetail.commit();
					}
					detailView.items.get(0).recvData.dirty = false;

					MessageUtil.confirmation('success_msg', 'savesuccess_msg', null,
						function (button) {
							if (button === 'ok') {
								detailView.close();
								me.onSearch();
							}
						}
					);
				}
			}
		})
	},

	onRefresh: function () {
		var me = this;
		var refs = me.getReferences();
		var detailGrid = refs[me.DETAIL_GRID_REF_NAME];
		var controlArray = [
			'ctlMasterBL', 'ctlBookingNo', 'ctlCommodityGroup', 'ctlShpCns',
			'ctlPod', 'ctlBlVessel', 'ctlSnVessel', 'ctlAreaLocation',
			'ctlAreaCell', 'ctlAreaM2', 'ctlAreaMT', 'ctlEstArrvDt',
			'ctlEstDelvDt', 'ctlPeriod', 'ctlRemark',
		];

		detailGrid.getSelectionModel().clearSelections();
		controlArray.forEach(control => refs[control].setValue());

		me.getViewModel().setData({ theCargoInfo: null });
	},

	onSelectLocation: function (combo, record, eOpts) {
		var me = this;
		var theDetail = me.getViewModel().get('theDetail');
		var whDefinitionStore = me.getStore('warehouseDefinitionList');
		var whRecord = whDefinitionStore.findRecord('locId', record.data.scd);

		theDetail.set({
			reqM2: whRecord.get('totDims'),
			reqMt: whRecord.get('fbCapa'),
			locId: whRecord.get('locId'),
			planLocId: ''
		});
	},

	onSelectedMfDocId: function (combo, record, eOpts) {
		var me = this
			, snCombo = me.getViewModel().getStore('snCombo')
			, blCombo = me.getViewModel().getStore('blCombo');

		if (combo.reference === 'ctlMasterBL') {
			me.lookupReference('ctlBookingNo').reset();
			me.lookupReference('ctlSnVessel').reset();
			me.lookupReference('refSearchGrNo').reset();
			snCombo.removeAll();
			me.getBlCombo();
		} else if (combo.reference === 'ctlBookingNo') {
			me.lookupReference('ctlMasterBL').reset();
			me.lookupReference('ctlBlVessel').reset();
			me.lookupReference('refSearchDONo').reset();
			blCombo.removeAll();
			me.getSnCombo();
		}

		me.clearDetailInfor();
	},

	clearDetailInfor: function () {
		var me = this;
		var refs = me.getReferences();
		var fields = ['ctlCommodityGroup', 'ctlShpCns', 'ctlPod', 'ctlLotNo'];

		fields.forEach(ref => refs[ref].reset());
	},

	onOpenTerminalView: function () {
		var me = this;

		me.loadMenuView('app-terminalview', me);
	}, 

	onPlanLocComboLoad: function () {
		var me = this;
		var refs = me.getReferences();
		var planLocStore = me.getStore('planLocationCombo');

		refs.ctlPlanBayRow.setValue();

		planLocStore.load({
			params: {
				reqPos: refs.ctlPlanLocation.getValue()
			}
		});
	},
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	setDetailInitializeForNewRequest: function () {
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;

		me.getViewModel().setData({ theDetail: recvData });
		refs.ctlRequester.setValue(MOST.config.Token.getUserId());

		me.fncClear();
		me.selectMfDocIdCombo();
	},

	deleteProcess: function (deleteItems, selections) {
		var me = this;
		var store = me.getStore('spaceMovementPlan');
		var deleteItem = Ext.create('MOST.model.planning.SpaceMovementPlan');
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');

		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = false;
		updateParm.drop();
		updateParm.set('workingStatus', WorkingStatus.DELETE);
		updateParm.set('items', deleteItems);
		updateParm.save({
			success: function (record, operation) {
				selections.forEach(function (item) {
					item.commit();
					store.remove(item);
				});
				updateParm.commit();
				store.commitChanges();
				MessageUtil.saveSuccess();
			}
		});
	},

	getSearchCondition: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var reqr = StringUtil.toUpperCase(searchParm.data.reqr);
		var reqTpCd = StringUtil.toUpperCase(searchParm.data.reqTpCd);
		var statCd = StringUtil.toUpperCase(searchParm.data.statCd);
		var vslCallId = searchParm.data.vslCallId;
		var reqPos = searchParm.data.reqPos;
		var planLocId = searchParm.data.planLocId;
		var lotNo = searchParm.data.lotNo;
		var scn = searchParm.data.scn;

		if (me.alertYN == 'N') {
			var dateCondition = me.checkFromToDate('ctlSpaceMovementPlanFromDt', 'ctlSpaceMovementPlanToDt');

			if (dateCondition == null) {
				return null;
			}
		} else {
			statCd = me.alertTp;
			reqTpCd = '';
			reqr = '';
		}

		if (searchParm.data.nonVesselYN) {
			vslCallId = 'STRG';
		}

		var params = me.createParam(searchParm);

		params['reqr'] = reqr;
		params['reqTpCd'] = reqTpCd;
		params['statCd'] = statCd;
		params['vslCallId'] = vslCallId;
		params['scn'] = scn;
		params['isPlanned'] = 'Y';
		params['isPlanned'] = 'infoList';
		params['alertYn'] = me.alertYN;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		params['reqPos'] = reqPos;
		params['planLocId'] = planLocId;
		params['lotNo'] = lotNo;

		if (dateCondition != null) {
			params['reqStDt'] = dateCondition.fromDtString;
			params['reqEndDt'] = dateCondition.toDtString;
		}

		return params;
	},

	getDetailSearchCondition: function () {
		var me = this;
		var recvData = me.getDetailBizView().items.get(0).recvData;
		var searchParm = me.getViewModel().get('theSearch');
		var theDetail = me.getViewModel().get('theDetail');

		if (StringUtil.isNullorEmpty(theDetail.get('vslCallId'))) {
			MessageUtil.warning("warning", "Please set the Vessel Call Id first.")
			return;
		}

		var params = {
			vslCallId: (theDetail ? theDetail.get('vslCallId') : recvData.get('vslCallId'))
			, masterBL: searchParm.get('masterBL')
			, bookingNo: searchParm.get('bookingNo')
			, blNo: searchParm.get('blNo')
			, shipgNoteNo: searchParm.get('shipgNoteNo')
			, cmdtGrpCd: searchParm.get('cmdtGrpCd')
			, cngShp: searchParm.get('cngShp')
			, pod: searchParm.get('pod')
			, isNotPlanned: searchParm.get('isNotPlanned')
			, lotNo: searchParm.get('lotNo')
			, grNo: searchParm.get('grNo')
			, sdoNo: searchParm.get('subDoNo')
		}

		return params;
	},

	afterSetCodePopupData: function (xtype, targetControl, returnValue) {
		var me = this;
		var refs = me.getReferences();

		if (targetControl === 'ctlJpvc') {
			if (returnValue) {
				var bLCombo = me.getStore('blCombo');
				var snNoCombo = me.getStore('snCombo');
				var doCombo = me.getStore('doCombo');
				var grNoCombo = me.getStore('goodsReceiptCombo');
				
				
				refs.ctlVesselName.setValue(returnValue.codeName);
				refs.ctlDetailScn.setValue(returnValue.item.get('scn'));
				me.getViewModel().setData({ vesselDetail: returnValue.item });
				me.selectMfDocIdCombo();
				bLCombo.removeAll();
				bLCombo.commitChanges();
				
				snNoCombo.removeAll();
				snNoCombo.commitChanges();

				doCombo.removeAll();
				doCombo.commitChanges();

				grNoCombo.removeAll();
				grNoCombo.commitChanges();

				me.getSpaceMovementRequestDetail();

			} else {
				var masterBLCombo = me.getStore('masterBLCombo');
				var bookingNoCombo = me.getStore('bookingNoCombo');

				masterBLCombo.removeAll();
				masterBLCombo.commitChanges();

				bookingNoCombo.removeAll();
				bookingNoCombo.commitChanges();
			}
		} else if (targetControl == "ctlSnNonVessel") {
			refs.ctlSnNonVessel.setValue(returnValue.code);
			if (refs.ctlSnNonVessel.getValue() != "" && refs.ctlSnNonVessel.getValue() != null) {
				refs.ctlCategory.setValue("S");
				me.getGrNonJpvcCombo();
				me.getSpaceMmovementInfo(1);
			}
		} else if (targetControl === 'ctlPayer') {
			if (returnValue) {
				refs.ctlPayer.setValue(returnValue.code);
				refs.ctlPayerNm.setValue(returnValue.codeName);
			} else {
				refs.ctlPayer.setValue("");
				refs.ctlPayerNm.setValue("");
			}
		} else if (xtype === 'popup-spacemovementallocationpopup') {
			me.setWhLocData(returnValue);
		} else if (targetControl === 'ctlRequester') {
			if (returnValue) {
				refs.ctlRequesterNm.setValue(returnValue.codeName);
			} else {
				refs.ctlRequesterNm.setValue("");
			}
		} else if (targetControl === 'ctlScn' || targetControl === 'ctlScnDetail') {
			if (returnValue) {
				if (targetControl === 'ctlScn') {
					refs.ctlScn.setValue(returnValue.code);

					if (!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))) {
						refs.ctlSpaceMovementPlanVesselCallId.setValue(returnValue.item.get('vslCallId'));
					} else {
						refs.ctlSpaceMovementPlanVesselCallId.setValue('');
					}
				} else {
					refs.ctlScnDetail.setValue(returnValue.code);

					if (!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))) {
						refs.ctlJpvc.setValue(returnValue.item.get('vslCallId'));
						refs.ctlVesselName.setValue(returnValue.item.get('vslNm'));
					} else {
						refs.ctlJpvc.setValue('');
					}
				}
			}
		} else if (targetControl === 'ctlSpaceMovementPlanVesselCallId') {
			if (returnValue) {
				refs.ctlScn.setValue(returnValue.item.get('scn'));
				me.getViewModel().setData({ vesselDetail: returnValue.item });
			} else {
				refs.ctlScn.setValue('');
			}
		}
	},

	getSpaceMovementRequestDetail: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.DETAIL_STORE_NAME);
		var vesselDetail = me.getViewModel().get('vesselDetail');
		var theDetail = me.getViewModel().get('theDetail');
		var params = {
			vslCallId: vesselDetail.get('vslCallId'),
			vslCd: vesselDetail.get('vslCd'),
		}

		store.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					store.commitChanges();
					if (records.length > 0) {
						var masterItem = records[0];
						theDetail.set('reqNo', masterItem.get('reqNo'));
						theDetail.set('statNm', masterItem.get('statNm'));
						theDetail.set('payer', masterItem.get('payer'));
						theDetail.set('reqr', masterItem.get('reqr'));
					}
				}
			}
		});
	},

	getPeriodDays: function () {
		var me = this;
		var refs = me.getReferences();

		if (refs.ctlEstArrvDt.getValue() !== "" && refs.ctlEstDelvDt.getValue() !== "") {
			var date1 = Ext.Date.format(refs.ctlEstArrvDt.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			var date2 = Ext.Date.format(refs.ctlEstDelvDt.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			var result = new Date(me.changeFormatDateTime(date2)) - new Date(me.changeFormatDateTime(date1));
			var differenceDays = (result / (1000 * 3600 * 24)) + 1;

			if (differenceDays < 0 || isNaN(differenceDays)) {
				refs.ctlPeriod.setValue(0);
				return;
			} else {
				refs.ctlPeriod.setValue(differenceDays);
			}
		}
	},

	setWhLocData: function (whAllocData) {
		var me = this;
		var area = me.getM2AreaValue(whAllocData);

		var planLocId = whAllocData[0].get('locIdArr').join(',');
		me.setWhFieldValues(planLocId, area);
	}, 

	setWhFieldValues: function (planLocId, area) {
		this.lookupReference('ctlAreaCell').setValue(planLocId);
		this.lookupReference('ctlAreaM2').setValue(area);
	}, 

	getM2AreaValue: function (allocData) {
		var area = 0;

		Ext.Array.each(allocData, function (data) {
			Ext.Array.each(data.get('items'), function (cell) {
				area += (cell.get('len') * cell.get('wth'));
			});
		});
		return area;
	},

	selectMfDocIdCombo: function () {
		var me = this;
		var refs = me.getReferences();
		var vesselDetail = me.getViewModel().get('vesselDetail');
		var masterBLCombo = me.getStore('masterBLCombo');
		var bookingNoCombo = me.getStore('bookingNoCombo');

		var params = {
			vslCallId: vesselDetail? vesselDetail.get('vslCallId') : refs.ctlJpvc.getValue()
		};

		masterBLCombo.load({
			params: params
		})

		bookingNoCombo.load({
			params: params
		})
	},

	selectMultipleSearchFilterCombo: function (targetVslCallId) {
		var me = this
			, commdityGroupStore = me.getStore('commodityGroupCombo')
			, podCombo = me.getStore('podCombo')
			, cngShpCombo = me.getStore('cngShpCombo')
			;

		commdityGroupStore.load({
			params: {
				searchType: 'cmdtGrpCombo'
				, vslCallId: targetVslCallId
			}
		});

		podCombo.load({
			params: {
				searchType: 'podCombo'
				, vslCallId: targetVslCallId
			}
		});

		cngShpCombo.load({
			params: {
				searchType: 'cngShpCombo'
				, vslCallId: targetVslCallId
			}
		});
	},

	getBlCombo: function () {
		var me = this;
		var refs = me.getReferences();
		var blStore = me.getViewModel().getStore('blCombo');
		var vesselDetail = me.getViewModel().get('vesselDetail');

		var params = {
			vslCallId: vesselDetail == null ? refs.ctlJpvc.getValue() : vesselDetail.get('vslCallId'),
			mfDocNo: refs.ctlMasterBL.getValue(),
		};

		blStore.load({
			params: params,
		});
	},

	getSnCombo: function () {
		var me = this;
		var refs = me.getReferences();
		var snStore = me.getViewModel().getStore('snCombo');
		var vesselDetail = me.getViewModel().get('vesselDetail');

		var params = {
			vslCallId: vesselDetail == null ? refs.ctlJpvc.getValue() : vesselDetail.get('vslCallId'),
			mfDocNo: refs.ctlBookingNo.getValue()
		};

		snStore.load({
			params: params,
		});
	},

	getGrCombo: function () {
		var me = this;
		var refs = me.getReferences();
		var grListStore = me.getViewModel().getStore('goodsReceiptCombo');

		grListStore.load({
			params: {
				searchType: ComboboxServiceConstants.COMBO_GR_NO,
				vslCallId: refs.ctlJpvc.getValue(),
				shipgNoteNo: refs.ctlSnVessel.getValue(),
				blNo: ''
			},

			callback: function (records, success) {
				if (success) {
				}
			}
		});
	},

	getDoCombo: function (requestItem) {
		var me = this;
		var doListStore = me.getViewModel().getStore('doCombo');

		doListStore.load({
			params: {
				searchType: ComboboxServiceConstants.COMBO_DO_NO,
				vslCd: requestItem.get('vslCd'),
				mfDocId: requestItem.get('mfDocId'),
				vslCallId: requestItem.get('vslCallId'),
				blNo: requestItem.get('blNo'),
			},

			callback: function (records, success) {
				if (success) {
				}
			}
		});
	}, 

	getGrNonJpvcCombo: function () {
		var me = this;
		var refs = me.getReferences();
		var grNonJpvcStore = me.getViewModel().getStore('grNonJpvcCombo');

		var params = {
			shipgNoteNo: refs.ctlSnNonVessel.getValue()
		};

		grNonJpvcStore.load({
			params: params
		});
	},

	changeFormatDateTime(str) {
		var date = "";
		var splitDateTime = str.split(" ");
		var splitDate = splitDateTime[0].split("/");
		var result = date.concat(splitDate[1], '/', splitDate[0], '/', splitDate[2]);

		return result;
	},

	fncSubmit: function () {
		var me = this
			, grid = me.lookupReference(me.DETAIL_GRID_REF_NAME)
			, theDetail = me.getViewModel().get('theDetail')
			, selection = grid.getSelection()
			;

		var detailView = me.getDetailBizView();

		var infoForm = detailView.down('form').getForm();

		if (!infoForm.isValid()) {
			MessageUtil.mandatoryFieldInValid();
			return;
		}

		for (record of selection) {
			record.set({
				reqr: theDetail.get('reqr')
				, reqNo: theDetail.get('reqNo')
				, reqTpCd: theDetail.get('reqTpCd')
				, reqPos: theDetail.get('reqPos')
				, planLocId: theDetail.get('planLocId')
				, planList: theDetail.get('planList')
				, locId: theDetail.get('locId')
				, eta: theDetail.get('eta')
				, svcDt: theDetail.get('svcDt')
				, period: theDetail.get('period')
				, rmk: theDetail.get('rmk')
			})
		}
	},

	fncDelete: function () {
		var me = this
			, store = me.getStore(me.DETAIL_STORE_NAME)
			, grid = me.lookupReference(me.DETAIL_GRID_REF_NAME)
			, selection = grid.getSelection()
			, deleteItems = new Array()
			, updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm')
			;

		var validObj = {
			valid: true
		}

		// Valid 01 :: need to selected
		if (selection <= 0) {
			MessageUtil.warning("spaceMovementPlanDetail", "spaceMovementPlan_SelectBeforeRemove");
			return;
		}

		// Valid 02 :: check the phantom of record.
		// check the working status is 'updated'.
		for (record of selection) {
			var cloneRecord = record.copy();
			var recordStatus = record.get('workingStatus');

			if (recordStatus === WorkingStatus.INSERT) {
				validObj.valid = false; break;
			} else {
				deleteItems.push(cloneRecord.data); // push the array as dataitems
			}
		}

		if (!validObj.valid) {
			MessageUtil.warning("spaceMovementPlanDetail", "There isn't include the planned data.");
			return;
		}

		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = false;
		updateParm.set({
			'items': deleteItems
		});
		updateParm.erase({
			callback: function (records, operation, success) {
				if (success) {
					MessageUtil.confirmation("spaceMovementPlanDetail", "Success to remove.");
					me.onRetrieve();
				}
			}
		});
	},  

	fncClear: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('spaceMovementRequestDetail');

		store.removeAll();

		me.lookupReference('cttReqNo').setValue();
		me.lookupReference('ctlStatus').setValue();
		me.lookupReference('ctlRequestTp').setValue();
		me.lookupReference('ctlSpaceMovementRequestDetailMvTp').setValue();
		me.lookupReference('ctlSpaceMovementRequestDetailMvTp').setVisible(false);

		me.onRefresh();
	},

	//Select SN combo
	onSelectSNNo: function (combobox) {
		var me = this;
		var refs = me.getReferences();
		var grListStore = me.getViewModel().getStore('goodsReceiptCombo');

		if (!StringUtil.isNullorEmpty(refs.ctlSnVessel.getValue())) {
			grListStore.load({
				params: {
					searchType: ComboboxServiceConstants.COMBO_GR_NO,
					vslCallId: refs.ctlJpvc.getValue(),
					shipgNoteNo: refs.ctlSnVessel.getValue(),
					blNo: ''
				},

				callback: function (records, success) {
					if (success) {
					}
				}
			});
		}
		else {
			grListStore.loadData([], false);
			refs.refSearchGrNo.reset();
		}

		me.updateRequestDetailInfo();
	},

	//Select BL combo
	onSelectBLNo: function (combobox) {
		var me = this;
		var refs = me.getReferences();
		var doListStore = me.getViewModel().getStore('doCombo');
		var vesselDetail = me.getViewModel().get('vesselDetail');
		var theDetail = me.getViewModel().get('theDetail');

		if (!StringUtil.isNullorEmpty(combobox.getValue())) {
			doListStore.load({
				params: {
					searchType: ComboboxServiceConstants.COMBO_DO_NO,
					vslCd: theDetail.get('vslCd') || vesselDetail.get('vslCd'),
					mfDocId: theDetail.get('masterBL'),
					vslCallId: theDetail.get('vslCallId') || vesselDetail.get('vslCallId'),
					blNo: combobox.getValue(),
				},

				callback: function (records, success) {
					if (success) {
					}
				}
			});
		} else {
			doListStore.loadData([], false);
			refs.refSearchDONo.reset();
		}

		me.updateRequestDetailInfo();
	},

	updateRequestDetailInfo: function () {
		var me = this;
		var refs = me.getReferences();
		var theDetail = me.getViewModel().get('theDetail');
		var mfDocId = theDetail.get('masterBL') || theDetail.get('bookingNo');
		var cargoInfoStore = me.getStore('cargoInfo');
		var vesselDetail = me.getViewModel().get('vesselDetail');

		var params = {
			vslCallId: theDetail.get('vslCallId'),
			shipgNoteNo: theDetail.get('shipgNoteNo'),
			blNo: theDetail.get('blNo'),
			mfDocId: mfDocId,
			vslCd: theDetail.get('vslCd') || vesselDetail.get('vslCd'),
		}

		cargoInfoStore.load({
			params: params,
			callback: function (records, operation, success) {
				if (success && records.length > 0) {
					var keys = Object.keys(records[0].data);
					
					keys.forEach(function (key) {
						if (!StringUtil.isNullorEmpty(records[0].data[key])) {
							theDetail.set(key, records[0].data[key]);
						}
					})
				}
			}
		});
		
	},

	getMfDocIdWhenDblClickFromGrid: function (vslCallId) {
		var me = this
			, masterBLCombo = me.getStore('masterBLCombo')
			, bookingNoCombo = me.getStore('bookingNoCombo');

		var params = {
			vslCallId: vslCallId
		};

		masterBLCombo.load({
			params: params
		})

		bookingNoCombo.load({
			params: params
		})
	}, 

	onUpdateForDetail: function () {
		var me = this;
		var grid = me.lookupReference(me.DETAIL_GRID_REF_NAME);
		var selection = grid.getSelection()[0];
		var theDetail = me.getViewModel().get('theDetail');
		var modified = theDetail.modified;
		
		if(modified) {
			var keys = Object.keys(modified);

			keys.forEach(function (key) {
				selection.set(key, theDetail.get(key));
			})

			selection.set('workingStatus', WorkingStatus.UPDATE);
		}
	},

	/**
	 * 
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});