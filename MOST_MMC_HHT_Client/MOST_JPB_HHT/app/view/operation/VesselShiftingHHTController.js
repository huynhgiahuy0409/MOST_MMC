Ext.define('MOST.view.operation.VesselShiftingHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [

	],

	alias: 'controller.vesselshiftinghht',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_PERIOD_DAY: 62,	// MAX PERIOD DATE
	SHIPPING_AGENCY: 'SHA',
	FORWARDER: 'FWD',
	REF_TAB_DBL_BNK: 'refDoubleBankingPnl',
	REF_TAB_STS: 'refShipToShipPnl',
	REF_TAB_VSL_SHFT: 'refVslShiftingPnl',
	REF_TAB_CG_SHFT: 'refCargoShiftingPnl',

	jpvcData: null,
	thirdJpvcData: null,
	mode: null,
	isEdit: false, //Double banking grid edit status 
	isStsEdit: false,// Ship to Ship grid edit status
	isVslShftEdit: false, //Vessel Shifting grid edit status

	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * PROP START
	 */
	previousSTSSelection: null,
	/**
	 * PROP END
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

		me.initComboStores();
		me.initViewModelData();

		refs.refCboBankingType.setDisabled(true);
		refs.refTxtNextJpvc.setDisabled(true);

		var searchParm = Ext.create('MOST.model.operation.SearchShiftingDoubleBankingParm');
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({ theSearch: searchParm });
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');

		if (me.getView().recvData) {
			if (!StringUtil.isNullorEmpty(me.getView().recvData.vslCallId)) {
				refs.txtJpvc.setValue(me.getView().recvData.vslCallId);

				me.onReceiveJpvcOnLoad();
				me.onSearch();
			}
		}
	},

	initComboStores: function () {
		var me = this;

		me.initComboStore('bankingTypeCombo', false);
		me.initComboStore('oprModeCombo', true);
		me.initComboStore('hatchListCombo', true);
		me.initComboStore('apFpListCombo', true);
		me.initComboStore('shiftPositionListCombo', true);
		me.initComboStore('reasonListCombo', true);
		me.initComboStore('crewListCombo', true);
		me.initComboStore('shftStyleListCombo', true);
		me.initComboStore('berths', true);
		me.initComboStore('cgTpAllListCombo', true);
		me.initComboStore('cmdtCdAllListCombo', true);

	},

	initComboStore: function (comboStoreStr, isCommit) {
		var me = this;
		var comboStore = me.getStore(comboStoreStr);
		comboStore.load();

		if (isCommit) { comboStore.commitChanges(); }
	},

	initViewModelData: function () {
		var me = this;
		me.initShftDblItm('theDoubleBanking');
		me.initShftDblItm('theShipToShip');
		me.initShftDblItm('theVesselShifting');
		me.initShftDblItm('theCargoShifting');
	},

	// Combo Setting
	setCombo: function (masterItem) {
		var me = this;
		var refs = me.getReferences();

	},
	/**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */

	onReceiveJpvcOnLoad: function () {

		var me = this;
		var refs = me.getReferences();
		var vslCallId = refs.txtJpvc.getValue().toUpperCase();
		if (!StringUtil.isNullorEmpty(vslCallId)) {
			var sftDblBankingList = me.getStore('sftDblBankingList');
			if (StringUtil.isNullorEmpty(refs.txtJpvc.getValue())) {
				MessageUtil.warning('warning', 'shiftingdoublebanking_search_jpvc_empty');
				return;
			}
			var vslcallid = refs.txtJpvc.getValue().toUpperCase();
			sftDblBankingList.load({
				params: {
					vslCallId: vslCallId,
					searchType: 'info'
				},
				callback: function (records, operation, success) {
					if (success) {
						me.getViewModel().setData({ vslDetail: records[0].get('vslInfo')[0] });
						me.jpvcData = records[0].get('vslInfo')[0];
						me.setCUDBtnActive(true);
						refs.tabpnl.setDisabled(false);
					}
				}
			});
		}
	},


	// Search Event Handler
	onSearch: function () {
		var me = this;
		var refs = me.getReferences();

		if (StringUtil.isNullorEmpty(refs.txtJpvc.getValue())) {
			MessageUtil.warning('warning', 'shiftingdoublebanking_search_jpvc_empty');
			return;
		}

		var searchParm = me.getViewModel().get('theSearch');

		var sftDblBankingList = me.getStore('sftDblBankingList');
		var doubleBankingList = me.getStore('doubleBankingList');
		var stsOperationList = me.getStore('stsOperationList');
		var vslShftList = me.getStore('vslShftList');
		var cgShftList = me.getStore('cgShftList');
		var bankingTypeCombo = me.getStore('bankingTypeCombo');
		var vslCurrWharftList = me.getStore('vslCurrWharftList');
		var vslcallid = searchParm.data.vslCallId.toUpperCase();

		bankingTypeCombo.load();
		bankingTypeCombo.commitChanges();

		sftDblBankingList.removeAll();
		sftDblBankingList.commitChanges();
		sftDblBankingList.load({
			params: {
				vslCallId: vslcallid,
				searchType: 'info'
			},
			callback: function (records, operation, success) {
				if (success) {
					me.getViewModel().setData({ vslDetail: records[0].get('vslInfo')[0] });
					me.setCUDBtnActive(true);

					doubleBankingList.setData(records[0].get('doubleBankingList'));
					stsOperationList.setData(records[0].get('stsOperationList'));
					vslShftList.setData(records[0].get('vslShftList'));
					cgShftList.setData(records[0].get('crgShftList'));
					vslCurrWharftList.setData(records[0].get('vslCurrWharftList'));

					doubleBankingList.commitChanges();
					stsOperationList.commitChanges();
					vslShftList.commitChanges();
					cgShftList.commitChanges();

					me.getViewModel().set('theVesselShifting', me.initVslShftgItem());
				}
			}
		});
		me.onClear();
	},

	onClear: function () {
		var me = this;

		me.initShftDblItm('theCargoShifting');
		me.initShftDblItm('theVesselShifting');
	},

	onTabpnlActivate: function (tabPanel, newCard, oldCard, eOpts) {
		var me = this;
		var btnActive = true;
		var refs = me.getReferences();

		if (Ext.isEmpty(me.jpvcData)) {
			btnActive = false;
		}

		me.setCUDBtnActive(btnActive);
	},


	afterSetCodePopupData: function (xtype, targetControl, returnValue) {
		var me = this;
		var refs = me.getReferences();

		// if(targetControl === 'txtJpvc'){
		// 	if(returnValue != null){
		// 		me.getViewModel().setData({vslDetail: returnValue.item.data});
		// 		me.jpvcData = returnValue.item.data;
		// 		refs.refCboBankingType.setDisabled(false);
		// 		me.onSearch();
		// 	} else {
		// 		me.getViewModel().setData({vslDetail: null});
		// 		me.jpvcData = null;
		// 		refs.refCboBankingType.setValue('');
		// 		refs.refCboBankingType.setDisabled(true);
		// 		me.setCUDBtnActive(false);
		// 	}
		// } else if(targetControl === 'refTxtNextJpvc'){
		// 	if(returnValue != null){
		// 		var record = me.getViewModel().get('theShipToShip');
		// 		record.set('nextCalCallId',	returnValue.item.data.vslCallId);
		// 		me.onLoadStsInfo(returnValue.item.data.vslCallId);
		// 	}

		// } else if(targetControl === 'refTxtJpvcDB'){
		// 	if(returnValue != null){
		// 		me.setSecondJpvcData(returnValue.item.data);
		// 	}			
		// } else if(targetControl == 'refTxt3rdJpvcDB'){
		// 	if(returnValue != null){
		// 		me.setThirdJpvcData(returnValue.item.data);
		// 	}		
		// } else if(targetControl == 'refTxt4thJpvcDB'){
		// 	if(returnValue != null){
		// 		me.setFourthJpvcData(returnValue.item.data);
		// 	}		
		// } else if(targetControl === 'txtPkgTpCd'){
		// 	refs.refPkgTpName.setValue(returnValue.codeName);
		// }

		//HHT Tablet
		if (Ext.isModern) {
			if (targetControl === 'refTxtJpvcDB') {
				if (returnValue != null) {
					this.jpvcData = returnValue.item.data;
					me.set2ndJPVCTblDBbanking();
				} else {
					//Clear reference
				}
			} else if (targetControl === 'refTxt3rdJpvcDB') {
				if (returnValue != null) {
					this.thirdJpvcData = returnValue.item.data;
					me.set3rdJPVCTblDBbanking();
				} else {
					//Clear reference
				}
			} else if (targetControl === 'refTxtNextJpvc') {//STS
				if (returnValue != null) {
					this.onLoadStsInfo(returnValue.item.data.vslCallId)
				} else {
					//Clear reference
				}
			} else if (targetControl === 'refTxtPkgTpSTS') {
				if (returnValue != null) {
					refs.refTxtPkgTpSTS.setValue(returnValue.code);
				} else {
					//Clear reference
				}
			} else if (targetControl === 'refPkgTypeCgShftTextField') {
				refs.refPkgTypeCgShftTextField.setValue(returnValue.code);
			} else if (targetControl === 'refSearchRequesterVSHHT') {
				refs.refRequesterShiftgTextField.setValue(returnValue.code);
			}
		}
	},

	onAdd: function () {
		var me = this;
		var refs = me.getReferences();
		var valid = true;
		me.mode = WorkingStatus.INSERT;
		me.isEdit = false;

		if (refs.tabpnl.getActiveTab().getReference() == "refDoubleBankingPnl") {
			valid = me.onAddDoubleBankingClick();
		} else if (refs.tabpnl.getActiveTab().getReference() == "refShipToShipPnl") {
			valid = me.onAddShipToShipClick();
		} else if (refs.tabpnl.getActiveTab().getReference() == "refVslShiftingPnl") {
			valid = me.onAddVesselShifting();
		} else if (refs.tabpnl.getActiveTab().getReference() == "refCargoShiftingPnl") {
			valid = me.onAddCargoShifting();
		}

		if (valid) {
			me.onSave();
		}
	},

	onDoubleBankingCancelEdit: function (rowEditing, context) {
		var me = this;
		var refs = me.getReferences();

		me.mode = WorkingStatus.UPDATE;

		me.on2ndVesselDisableControl('', false, true, false, false, false, false);
		me.on3rdVesselDisableControl('', false, true, false, false, false, false);
		if (!me.isEdit) {
			me.gridCancelEdit(rowEditing, context);
		}
	},

	onStsCancelEdit: function (rowEditing, context) {
		var me = this;
		var refs = me.getReferences();

		if (!me.isStsEdit) {
			me.gridCancelEdit(rowEditing, context);
		}
	},

	onVslShftCancelEdit: function (rowEditing, context) {
		var me = this;
		var refs = me.getReferences();

		if (!me.isVslShftEdit) {
			me.gridCancelEdit(rowEditing, context);
		}
	},

	onCgShiftingCancelEdit: function (rowEditing, context) {
		var me = this;
		var refs = me.getReferences();

		if (!me.isVslShftEdit) {
			me.gridCancelEdit(rowEditing, context);
		}
	},


	onDoubleBankingEdit: function (editor, context, row) {
		var me = this;
		var refs = me.getReferences();
		var date1 = '';
		var date2 = '';
		var date3 = '';
		var date4 = '';
		var date3rd1 = '';
		var date3rd2 = '';
		var date3rd3 = '';
		var date3rd4 = '';

		if (!Ext.isEmpty(refs.refCol2ndAtb.getEditor().getValue())) {
			date1 = new Date(refs.refCol2ndAtb.getEditor().getValue())
			var dateStr = Ext.Date.format(date1, 'd/m/Y H:i');
			if (isNaN(date1))
				context.record.set('ship1Atb', refs.refCol2ndAtb.getEditor().getValue());
			else
				context.record.set('ship1Atb', Ext.Date.format(date1, 'd/m/Y H:i'));
		}
		if (!Ext.isEmpty(refs.refCol2ndAtu.getEditor().getValue())) {
			date2 = new Date(refs.refCol2ndAtu.getEditor().getValue());
			var dateStr = Ext.Date.format(date2, 'd/m/Y H:i');
			if (isNaN(date2))
				context.record.set('ship1Atu', refs.refCol2ndAtu.getEditor().getValue());
			else
				context.record.set('ship1Atu', Ext.Date.format(date2, 'd/m/Y H:i'));

		}
		if (!Ext.isEmpty(refs.refCol2ndAtw.getEditor().getValue())) {
			date3 = new Date(refs.refCol2ndAtw.getEditor().getValue());
			var dateStr = Ext.Date.format(date3, 'd/m/Y H:i');
			if (isNaN(date3))
				context.record.set('ship1Atw', refs.refCol2ndAtw.getEditor().getValue());
			else
				context.record.set('ship1Atw', Ext.Date.format(date3, 'd/m/Y H:i'));

		}
		if (!Ext.isEmpty(refs.refCol2ndAtc.getEditor().getValue())) {
			date4 = new Date(refs.refCol2ndAtc.getEditor().getValue());
			var dateStr = Ext.Date.format(date4, 'd/m/Y H:i');
			if (isNaN(date4))
				context.record.set('ship1Atc', refs.refCol2ndAtc.getEditor().getValue());
			else
				context.record.set('ship1Atc', Ext.Date.format(date4, 'd/m/Y H:i'));

		}
		if (!Ext.isEmpty(refs.refCol3rdAtb.getEditor().getValue())) {
			date3rd1 = new Date(refs.refCol3rdAtb.getEditor().getValue());
			var dateStr = Ext.Date.format(date3rd1, 'd/m/Y H:i');
			if (isNaN(date3rd1))
				context.record.set('ship2Atb', refs.refCol3rdAtb.getEditor().getValue());
			else
				context.record.set('ship2Atb', Ext.Date.format(date3rd1, 'd/m/Y H:i'));

		}
		if (!Ext.isEmpty(refs.refCol3rdAtu.getEditor().getValue())) {

			date3rd2 = new Date(refs.refCol3rdAtu.getEditor().getValue());
			var dateStr = Ext.Date.format(date3rd2, 'd/m/Y H:i');
			if (isNaN(date3rd2))
				context.record.set('ship2Atu', refs.refCol3rdAtu.getEditor().getValue());
			else
				context.record.set('ship2Atu', Ext.Date.format(date3rd2, 'd/m/Y H:i'));
		}
		if (!Ext.isEmpty(refs.refCol3rdAtw.getEditor().getValue())) {
			date3rd3 = new Date(refs.refCol3rdAtw.getEditor().getValue());
			var dateStr = Ext.Date.format(date3rd3, 'd/m/Y H:i');
			if (isNaN(date3rd3))
				context.record.set('ship2Atw', refs.refCol3rdAtw.getEditor().getValue());
			else
				context.record.set('ship2Atw', Ext.Date.format(date3rd3, 'd/m/Y H:i'));

		}
		if (!Ext.isEmpty(refs.refCol3rdAtc.getEditor().getValue())) {
			date3rd4 = new Date(refs.refCol3rdAtc.getEditor().getValue());
			var dateStr = Ext.Date.format(date3rd4, 'd/m/Y H:i');
			if (isNaN(date3rd4))
				context.record.set('ship2Atc', refs.refCol3rdAtc.getEditor().getValue());
			else
				context.record.set('ship2Atc', Ext.Date.format(date3rd4, 'd/m/Y H:i'));
		}

		context.record.set('dblBnkDivCd', refs.refCboBankingType.getValue());

		context.record.data.dblBnkShip1 = refs.refCol2ndJpvc.getEditor().getValue();
		context.record.data.dblBnkShip2 = refs.refCol3rdJpvc.getEditor().getValue();
		context.record.set('ship1Loa', refs.refCol2ndLoa.getEditor().getValue());
		me.isEdit = true;
	},

	onStsEdit: function (editor, context, row) {
		var me = this;
		var refs = me.getReferences();

		context.record.set('nextCalCallId', refs.refColNextJpvc.getEditor().getValue());
		context.record.set('stDt', Ext.Date.format(refs.refColStsStartTime.getEditor().getValue(), 'd/m/Y H:i'));
		context.record.set('endDt', Ext.Date.format(refs.refColStsEndTime.getEditor().getValue(), 'd/m/Y H:i'));

		me.isStsEdit = true;

	},

	onSTSCgTpChange: function (combo, newValue, oldValue, eOpts) {
		var me = this;
		var cgTpStore = me.getStore('cgTpAllListCombo');
		var selection = me.lookupReference('refStsGrid').getSelection()[0];
		var cgTp = cgTpStore.getAt(cgTpStore.findExact('scd', newValue));

		if (selection) {
			if (cgTp) {
				selection.data.cgTpNm = cgTp.get('scdNm');
			}

		}
	},

	onVslShftEdit: function (editor, context, row) {
		var me = this;
		var refs = me.getReferences();

		context.record.set('atbDt', Ext.Date.format(refs.refColNewAtb.getEditor().getValue(), 'd/m/Y H:i'));
		context.record.set('atuDt', Ext.Date.format(refs.refColNewAtu.getEditor().getValue(), 'd/m/Y H:i'));

		me.isStsEdit = true;
	},

	onCgShiftingtEdit: function (rowEditing, context) {
		var me = this;
		var refs = me.getReferences();

		context.record.set('stDt', Ext.Date.format(refs.refColCgShftStDt.getEditor().getValue(), 'd/m/Y H:i'));
		context.record.set('endDt', Ext.Date.format(refs.refColCgShftEndDt.getEditor().getValue(), 'd/m/Y H:i'));

		me.isStsEdit = true;
	},

	onDobuleBankingGridDblClick: function (dv, record, index, item, e) {
		var me = this;
		var refs = me.getReferences();

		me.isEdit = true;

		if (item.get('workingStatus') == WorkingStatus.UPDATE) {
			me.on2ndVesselDisableControl(item.get('dblBnkDivCd'), false, true, true, false, false, true);
			me.on3rdVesselDisableControl(item.get('dblBnkDivCd'), false, false, true, true, true, true);
		} else if (item.get('workingStatus') == WorkingStatus.INSERT) {
			var bankingItem = Ext.create('MOST.model.common.codes.DetailCode');

			bankingItem.set('scd', item.get('dblBnkDivCd'));
		}
	},

	onDobuleBankingGridClick: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refsGridDbBanking');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		if (selection == null) return;

		selection.set('ship1AtbDt', Ext.Date.parse(selection.get('ship1Atb'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		selection.set('ship1AtwDt', Ext.Date.parse(selection.get('ship1Atw'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		selection.set('ship1AtcDt', Ext.Date.parse(selection.get('ship1Atc'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		selection.set('ship1AtuDt', Ext.Date.parse(selection.get('ship1Atu'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		selection.set('ship2AtbDt', Ext.Date.parse(selection.get('ship2Atb'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		selection.set('ship2AtwDt', Ext.Date.parse(selection.get('ship2Atw'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		selection.set('ship2AtcDt', Ext.Date.parse(selection.get('ship2Atc'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		selection.set('ship2AtuDt', Ext.Date.parse(selection.get('ship2Atu'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));

		selection.set('ship3AtbDt', Ext.Date.parse(selection.get('ship3Atb'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		selection.set('ship3AtwDt', Ext.Date.parse(selection.get('ship3Atw'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		selection.set('ship3AtcDt', Ext.Date.parse(selection.get('ship3Atc'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		selection.set('ship3AtuDt', Ext.Date.parse(selection.get('ship3Atu'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));

		me.getViewModel().set('theDoubleBanking', selection);

		refs.refTxtJpvcDB.setValue(selection.data.dblBnkShip1);
		refs.refTxt3rdJpvcDB.setValue(selection.data.dblBnkShip2);
		refs.refTxt4thJpvcDB.setValue(selection.data.dblBnkShip3);
		// if(selection.phantom){
		// 	refs.refCboBankingType.setDisabled(false);
		// }else{
		// 	refs.refCboBankingType.setDisabled(true);
		// }

		me.onSelectGridBankingType(selection.data.dblBnkDivCd);
		me.initSTSJPVCFields();
	},

	onStsGridClick: function (dv, record, index, item, e) {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refStsGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if (selection == null) return;
		selection.set('stDate', Ext.Date.parse(selection.get('stDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		selection.set('endDate', Ext.Date.parse(selection.get('endDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));

		me.onLoadStsInfo(item.get('nextCalCallId'));

		if (selection) {
			me.getViewModel().set('theShipToShip', selection);
		}

	},

	onVslShftGridClick: function (dv, record, index, item, e) {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refVesselShiftingGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if (selection == null) return;
		selection.set('prevAtbDate', Ext.Date.parse(selection.get('prevAtb'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		selection.set('prevAtuDate', Ext.Date.parse(selection.get('prevAtu'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		selection.set('atuDate', Ext.Date.parse(selection.get('atuDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		selection.set('atbDate', Ext.Date.parse(selection.get('atbDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		selection.set('atwDate', Ext.Date.parse(selection.get('atw'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		selection.set('atcDate', Ext.Date.parse(selection.get('atc'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		selection.set('reqr', selection.get('reqr'));

		me.getViewModel().set('theVesselShifting', selection);
	},

	onCargoShiftingGridClick: function (dv, record, index, item, e) {
		var me = this;
		var refs = me.getReferences();

		var grid = me.lookupReference('refCargoShiftingGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if (selection == null) return;
		selection.set('stDate', Ext.Date.parse(selection.get('stDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		selection.set('endDate', Ext.Date.parse(selection.get('endDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));

		if (selection.get('sftTp') === 'S3') {
			refs.refCboCgShftNHatch.setDisabled(false);
		} else {
			refs.refCboCgShftNHatch.setDisabled(true);
		}
		me.getViewModel().set('theCargoShifting', selection);
	},

	onResetDatabyBankingTp: function () {
		var me = this;
		var refs = me.getReferences();

		refs.refCol2ndJpvc.getEditor().setValue();
		refs.refCol2ndJpvcNm.getEditor().setValue();
		refs.refCol2ndLoa.getEditor().setValue();
		refs.refCol2ndAtb.getEditor().setValue();
		refs.refCol2ndAtw.getEditor().setValue();
		refs.refCol2ndAtc.getEditor().setValue();
		refs.refCol2ndAtu.getEditor().setValue();

		refs.refCol3rdJpvc.getEditor().setValue();
		refs.refCol3rdJpvcNm.getEditor().setValue();
		refs.refCol3rdLoa.getEditor().setValue();
		refs.refCol3rdAtb.getEditor().setValue();
		refs.refCol3rdAtw.getEditor().setValue();
		refs.refCol3rdAtc.getEditor().setValue();
		refs.refCol3rdAtu.getEditor().setValue();
	},

	onSelectOprMode: function (ele, rec, idx) {
		var me = this;
		me.onAutoFetchingAmountInfo();
	},

	onSelectCargoType: function (ele, rec, idx) {
		var me = this;
		var refs = me.getReferences();
		var amountByOPRModeList = me.getStore('amountByOPRModeList');
		var stsGrid = refs.refStsGrid;
		var selection = stsGrid.getSelection()[0];

		if (!StringUtil.isNullorEmpty(refs.refColOprMode.getEditor().getValue())) {
			amountByOPRModeList.clearFilter();
			var oprMode = '';

			if (refs.refColOprMode.getEditor().getValue() === 'DS') {
				oprMode = 'SD';
			} else if (refs.refColOprMode.getEditor().getValue() === 'LD') {
				oprMode = 'SL';
			}

			amountByOPRModeList.filterBy(function (record, id) {
				if (record.get('cgTpCd') === rec.get('cgTpCd') && record.get('cgOptTpCd') === oprMode) {
					return record;
				}
			});

			if (amountByOPRModeList.getData().items.length > 0) {
				var filterData = amountByOPRModeList.getData().items[0];

				refs.refColDocMt.getEditor().setValue(filterData.get('mt'));
				refs.refColDocM3.getEditor().setValue(filterData.get('m3'));
				refs.refColDocQty.getEditor().setValue(filterData.get('qty'));

				refs.refColBalMt.getEditor().setValue(filterData.get('balMt'));
				refs.refColBalM3.getEditor().setValue(filterData.get('balM3'));
				refs.refColBalQty.getEditor().setValue(filterData.get('balQty'));

				selection.set('docMt', filterData.get('mt'));
				selection.set('docM3', filterData.get('m3'));
				selection.set('docQty', filterData.get('qty'));

				selection.set('balMt', filterData.get('balMt'));
				selection.set('balM3', filterData.get('balM3'));
				selection.set('balQty', filterData.get('balQty'));
			} else {
				refs.refColDocMt.getEditor().setValue('0');
				refs.refColDocM3.getEditor().setValue('0');
				refs.refColDocQty.getEditor().setValue('0');

				refs.refColBalMt.getEditor().setValue('0');
				refs.refColBalM3.getEditor().setValue('0');
				refs.refColBalQty.getEditor().setValue('0');

				selection.set('docMt', '0');
				selection.set('docM3', '0');
				selection.set('docQty', '0');

				selection.set('balMt', '0');
				selection.set('balM3', '0');
				selection.set('balQty', '0');
			}

		}
	},

	onSelectCgShftHatchType: function (ele, rec, idx) {
		var me = this;
		var refs = me.getReferences();
		var cgShftgItem = me.getViewModel().getData().theCargoShifting;

		if (rec.get('scd') === 'S3') {
			refs.refCboCgShftNHatch.setDisabled(false);
		} else {
			cgShftgItem.set({ nextHatchNo: '' });
			refs.refCboCgShftNHatch.setValue('');
			refs.refCboCgShftNHatch.setDisabled(true);
		}
	},

	////////////////////////////////
	// Double Banking

	setSecondJpvcData: function (vesselDetail) {
		var me = this;
		var refs = me.getReferences();
		var record = me.getViewModel().get('theDoubleBanking');

		record.set('dblBnkShip1', vesselDetail.vslCallId);
		record.set('dblBnkShip1Nm', vesselDetail.vslNm);
		record.set('ship1Loa', vesselDetail.loa);
		record.set('ship1AtbDt', vesselDetail.atb);
		record.set('ship1AtwDt', vesselDetail.atw);
		record.set('ship1AtcDt', vesselDetail.atc);
		record.set('ship1AtuDt', vesselDetail.atu);

		//		if(refs.refCboBankingType.getValue() != 'TG' && refs.refCboBankingType.getValue() != 'BG' && refs.refCboBankingType.getValue() != 'BT'){
		//			record.set('dblBnkShip2',	vesselDetail.vslCallId);
		//			record.set('dblBnkShip2Nm',	vesselDetail.vslNm);
		//			record.set('ship2Loa',		'');
		//			record.set('ship2AtbDt',	vesselDetail.atb);
		//			record.set('ship2AtwDt',	vesselDetail.atw);
		//			record.set('ship2AtcDt',	vesselDetail.atc);
		//			record.set('ship2AtuDt',	vesselDetail.atu);
		//			
		//			refs.refTxt3rdJpvcDB.setValue(vesselDetail.vslCallId);
		//		}				
	},
	setThirdJpvcData: function (vesselDetail) {
		var me = this;
		var refs = me.getReferences();
		var record = me.getViewModel().get('theDoubleBanking');

		record.set('dblBnkShip2', vesselDetail.vslCallId);
		record.set('dblBnkShip2Nm', vesselDetail.vslNm);
		record.set('ship2Loa', vesselDetail.loa);
		record.set('ship2AtbDt', vesselDetail.atb);
		record.set('ship2AtwDt', vesselDetail.atw);
		record.set('ship2AtcDt', vesselDetail.atc);
		record.set('ship2AtuDt', vesselDetail.atu);
	},

	setFourthJpvcData: function (vesselDetail) {
		var me = this;
		var refs = me.getReferences();
		var record = me.getViewModel().get('theDoubleBanking');

		record.set('dblBnkShip3', vesselDetail.vslCallId);
		record.set('dblBnkShip3Nm', vesselDetail.vslNm);
		record.set('ship3Loa', vesselDetail.loa);
		record.set('ship3AtbDt', vesselDetail.atb);
		record.set('ship3AtwDt', vesselDetail.atw);
		record.set('ship3AtcDt', vesselDetail.atc);
		record.set('ship3AtuDt', vesselDetail.atu);
	},

	onSelectBankingType: function (ele, rec, idx) {
		var me = this;
		var refs = me.getReferences();
		var bankingType = rec.get('scd');
		var vesselDetail = me.getViewModel().get('vslDetail');
		var record = me.getViewModel().get('theDoubleBanking');

		record.set('vslCallId', vesselDetail.vslCallId);
		record.set('dblBnkShip1Nm', vesselDetail.vslNm);
		record.set('dblBnkShip1', vesselDetail.vslCallId);
		record.set('dblBnkShip2', vesselDetail.vslCallId);
		record.set('vslCallId', vesselDetail.vslCallId);
		record.set('searchType', 'doubleBanking');
		record.set('dblBnkDivCd', bankingType);
		record.set('dblBnkShip1', vesselDetail.vslCallId);
		record.set('ship1Loa', vesselDetail.loa);
		record.set('ship1AtbDt', vesselDetail.atb);
		record.set('ship1AtwDt', vesselDetail.atw);
		record.set('ship1AtcDt', vesselDetail.atc);
		record.set('ship1AtuDt', vesselDetail.atu);
		record.set('dblBnkShip2', vesselDetail.vslCallId);
		record.set('ship2Loa', vesselDetail.loa);
		record.set('ship2AtbDt', vesselDetail.atb);
		record.set('ship2AtwDt', vesselDetail.atw);
		record.set('ship2AtcDt', vesselDetail.atc);
		record.set('ship2AtuDt', vesselDetail.atu);

		refs.refTxtJpvcDB.setValue(vesselDetail.vslCallId);
		refs.refTxt3rdJpvcDB.setValue(vesselDetail.vslCallId);

		me.onControlByBankingType(bankingType, 'COMBO');

		refs.refBtnCreate.setDisabled(false);
	},

	/// Grid Click
	onSelectGridBankingType: function (bankingType) {
		var me = this;
		me.onControlByBankingType(bankingType, 'GRID');
	},

	onControlByBankingType: function (bankingType, workType) {
		var me = this;
		var vesselDetail = me.getViewModel().get('theDoubleBanking');

		if (bankingType === '') {
			me.on2ndVesselDisableControl(bankingType, workType, true, true, true, true, true, true, vesselDetail);
			me.on3rdVesselDisableControl(bankingType, workType, true, true, true, true, true, true, vesselDetail);

			me.on4thVesselDisableControl(bankingType, workType, true, true, true, true, true, true, vesselDetail);
		} else if (bankingType === 'BT' || bankingType === 'BG') {
			me.on2ndVesselDisableControl(bankingType, workType, false, true, false, false, false, false, vesselDetail);
			me.on3rdVesselDisableControl(bankingType, workType, false, true, false, false, false, false, vesselDetail);

			me.on4thVesselDisableControl(bankingType, workType, false, true, false, false, false, false, vesselDetail);
		} else if (bankingType === 'TG') {
			me.on2ndVesselDisableControl(bankingType, workType, false, false, true, true, true, true, vesselDetail);
			me.on3rdVesselDisableControl(bankingType, workType, false, true, true, true, true, true, vesselDetail);

			me.on4thVesselDisableControl(bankingType, workType, true, true, true, true, true, true, vesselDetail);
		} else if (bankingType === 'TA') {
			me.on2ndVesselDisableControl(bankingType, workType, true, false, false, false, false, false, vesselDetail);
			me.on3rdVesselDisableControl(bankingType, workType, true, true, true, true, true, true, vesselDetail);

			me.on4thVesselDisableControl(bankingType, workType, true, true, true, true, true, true, vesselDetail);
		} else if (bankingType === 'TR') {
			me.on2ndVesselDisableControl(bankingType, workType, true, false, true, true, true, false, vesselDetail);
			me.on3rdVesselDisableControl(bankingType, workType, false, false, false, true, true, true, vesselDetail);

			me.on4thVesselDisableControl(bankingType, workType, true, true, true, true, true, true, vesselDetail);
		} else if (bankingType === 'VL') {
			me.on2ndVesselDisableControl(bankingType, workType, false, true, false, true, true, false, vesselDetail);
			me.on3rdVesselDisableControl(bankingType, workType, true, true, true, true, true, true, vesselDetail);

			me.on4thVesselDisableControl(bankingType, workType, true, true, true, true, true, true, vesselDetail);
		}
	},

	on2ndVesselDisableControl: function (bankingType, workType, isJpvc, isLoa, isAtb, isAtw, isAtc, isAtu, vesselDetail) {
		var me = this;
		var refs = me.getReferences();
		/*
		Vessel				VL
		Barge/Tug			BT
		Tug					TG
		Tug Replacement		TR
		Tug Alongside		TA
		Barge				BG
		 */
		if (workType === 'COMBO') {
			if (bankingType === 'TG' || bankingType === 'TA') {
				vesselDetail.set('ship1Loa', '');
			} else if (bankingType === 'TR') {
				vesselDetail.set('ship1Loa', '');
				vesselDetail.set('ship1AtcDt', '');
				vesselDetail.set('ship1AtuDt', '');
			} else {
				refs.refTxtJpvcDB.setValue('');
				vesselDetail.set('dblBnkShip1', '');
				vesselDetail.set('ship1Loa', '');
				vesselDetail.set('ship1AtbDt', '');
				vesselDetail.set('ship1AtwDt', '');
				vesselDetail.set('ship1AtcDt', '');
				vesselDetail.set('ship1AtuDt', '');
			}
		}

		refs.refTxtJpvcDB.setDisabled(isJpvc);
		refs.refTxtLOA.setDisabled(isLoa);
		refs.refTxtATB.setDisabled(isAtb);
		refs.refTxtATW.setDisabled(isAtw);
		refs.refTxtATC.setDisabled(isAtc);
		refs.refTxtATU.setDisabled(isAtu);

		if (bankingType === CodeConstants.MT_DBLBNKDIV_BG) {
			var params = {
				vslTp: CodeConstants.VC_VSLTP_BRGE
			};
			refs.refTxtJpvcDB.params = params;
		} else {
			refs.refTxtJpvcDB.params = null;
		}
	},

	on3rdVesselDisableControl: function (bankingType, workType, isJpvc, isLoa, isAtb, isAtw, isAtc, isAtu, vesselDetail) {
		var me = this;
		var refs = me.getReferences();
		/*
			Vessel				VL
			Barge/Tug			BT
			Tug					TG
			Tug Replacement		TR
			Tug Alongside		TA
			Barge				BG
		 */
		if (workType === 'COMBO') {
			if (bankingType === 'TR') {
				vesselDetail.set('ship2Loa', '');
				vesselDetail.set('ship2AtbDt', '');
				vesselDetail.set('ship2AtwDt', '');
			} else {
				refs.refTxt3rdJpvcDB.setValue('');
				vesselDetail.set('dblBnkShip2', '');
				vesselDetail.set('ship2Loa', '');
				vesselDetail.set('ship2AtbDt', '');
				vesselDetail.set('ship2AtwDt', '');
				vesselDetail.set('ship2AtcDt', '');
				vesselDetail.set('ship2AtuDt', '');
			}
		}

		refs.refTxt3rdJpvcDB.setDisabled(isJpvc);
		refs.refTxt3rdLOA.setDisabled(isLoa);
		refs.refTxt3rdATB.setDisabled(isAtb);
		refs.refTxt3rdATW.setDisabled(isAtw);
		refs.refTxt3rdATC.setDisabled(isAtc);
		refs.refTxt3rdATU.setDisabled(isAtu);

		if (bankingType === CodeConstants.MT_DBLBNKDIV_BG) {
			var params = {
				vslTp: CodeConstants.VC_VSLTP_BRGE
			};
			refs.refTxt3rdJpvcDB.params = params;
		} else {
			refs.refTxt3rdJpvcDB.params = null;
		}
	},

	on4thVesselDisableControl: function (bankingType, workType, isJpvc, isLoa, isAtb, isAtw, isAtc, isAtu, vesselDetail) {
		var me = this;
		var refs = me.getReferences();
		/*
			Vessel				VL
			Barge/Tug			BT
			Tug					TG
			Tug Replacement		TR
			Tug Alongside		TA
			Barge				BG
		 */
		refs.refTxt4thJpvcDB.setDisabled(isJpvc);
		refs.refTxt4thLOA.setDisabled(isLoa);
		refs.refTxt4thATB.setDisabled(isAtb);
		refs.refTxt4thATW.setDisabled(isAtw);
		refs.refTxt4thATC.setDisabled(isAtc);
		refs.refTxt4thATU.setDisabled(isAtu);

		if (bankingType === CodeConstants.MT_DBLBNKDIV_BG) {
			var params = {
				vslTp: CodeConstants.VC_VSLTP_BRGE
			};
			refs.refTxt4thJpvcDB.params = params;
		} else {
			refs.refTxt4thJpvcDB.params = null;
		}
	},

	onAddDoubleBankingClick: function () {
		var me = this;
		var refs = me.getReferences();
		var validObj = me.isDoubleBankingValid();

		if (refs.refCboBankingType.getValue() == null || refs.refCboBankingType.getValue() == '') {
			MessageUtil.warning('warning_msg', "Please select Banking type");
			return;
		}

		if ((refs.refTxtJpvcDB.getValue() == null || refs.refTxtJpvcDB.getValue() == '')
			&& (refs.refTxt3rdJpvcDB.getValue() == null || refs.refTxt3rdJpvcDB.getValue() == '')
			&& (refs.refTxt4thJpvcDB.getValue() == null || refs.refTxt4thJpvcDB.getValue() == '')) {
			MessageUtil.warning('warning_msg', "Please select child Vessel");
			return;
		}

		if ((refs.refTxtJpvcDB.getValue() != null && refs.refTxtJpvcDB.getValue() != '')
			&& (refs.ctl2ndAtb.getValue() == null || refs.ctl2ndAtb.getValue() == '')) {
			MessageUtil.warning('warning_msg', "Please select ATB of 2nd Vessel");
			return;
		}

		if ((refs.refTxt3rdJpvcDB.getValue() != null && refs.refTxt3rdJpvcDB.getValue() != '')
			&& (refs.ctl3ndAtb.getValue() == null || refs.ctl3ndAtb.getValue() == '')) {
			MessageUtil.warning('warning_msg', "Please select ATB of 3rd Vessel");
			return;
		}

		if ((refs.refTxt4thJpvcDB.getValue() != null && refs.refTxt4thJpvcDB.getValue() != '')
			&& (refs.ctl4thAtb.getValue() == null || refs.ctl4thAtb.getValue() == '')) {
			MessageUtil.warning('warning_msg', "Please select ATB of 4th Vessel");
			return;
		}

		if (((refs.refTxtJpvcDB.getValue() != '' && refs.refTxt3rdJpvcDB.getValue() != '')
			&& (refs.refTxtJpvcDB.getValue() === refs.refTxt3rdJpvcDB.getValue()))
			&& (Ext.Date.format(refs.ctl2ndAtb.getValue(), 'd/m/Y H:i') === Ext.Date.format(refs.ctl3ndAtb.getValue(), 'd/m/Y H:i'))) {
			MessageUtil.warning('warning_msg', "Duplicated Data between 2nd Vessel and 3rd Vessel, please recheck");
			return;
		}

		if (((refs.refTxtJpvcDB.getValue() != '' && refs.refTxt4thJpvcDB.getValue() != '')
			&& (refs.refTxtJpvcDB.getValue() === refs.refTxt4thJpvcDB.getValue()))
			&& (Ext.Date.format(refs.ctl2ndAtb.getValue(), 'd/m/Y H:i') === Ext.Date.format(refs.ctl4thAtb.getValue(), 'd/m/Y H:i'))) {
			MessageUtil.warning('warning_msg', "Duplicated Data between 2nd Vessel and 4th Vessel, please recheck");
			return;
		}

		if (((refs.refTxt3rdJpvcDB.getValue() != '' && refs.refTxt4thJpvcDB.getValue() != '')
			&& (refs.refTxt3rdJpvcDB.getValue() === refs.refTxt4thJpvcDB.getValue()))
			&& (Ext.Date.format(refs.ctl3ndAtb.getValue(), 'd/m/Y H:i') === Ext.Date.format(refs.ctl4thAtb.getValue(), 'd/m/Y H:i'))) {
			MessageUtil.warning('warning_msg', "Duplicated Data between 3rd Vessel and 4th Vessel, please recheck");
			return;
		}

		if (!validObj.valid) {
			MessageUtil.warning('warning_msg', validObj.msg);
			return false;
		}

		me.insertNewDoubleBankingData(me);
		me.initShftDblItm('theDoubleBanking');

		return true;
	},

	isDoubleBankingValid: function () {
		var me = this;
		var refs = me.getReferences();
		var errMsg = MOST.getApplication().bundle.getMsg('mandatoryField_msg') + "<br>";

		var validObj = {
			valid: true,
			msg: errMsg
		};

		if (Ext.isEmpty(refs.refCboBankingType.getValue())) {
			validObj.valid = false;
			validObj.msg += MOST.getApplication().bundle.getMsg('bankingtptbl');
			return validObj;
		}

		//temporary comment regarding OP-012
		//		validObj.msg += me.getDblBnkFieldsetInvalidItems(refs.ref2ndVslFldset.items.items, '2nd');
		//		validObj.msg += me.getDblBnkFieldsetInvalidItems(refs.ref3rdVslFldset.items.items, '3nd');

		if (validObj.msg.length > errMsg.length) {
			validObj.valid = false;
		}

		return validObj;
	},

	getDblBnkFieldsetInvalidItems: function (items, prefix) {
		var str = '';
		Ext.Array.forEach(items, function (el) {
			if (!el.isDisabled()
				&& Ext.isEmpty(el.getValue())) {
				str += prefix + ' ' + el.getFieldLabel() + '<br>';
			}
		});

		return str;
	},

	insertNewDoubleBankingData: function (me) {
		var doubleBankingList = me.getStore('doubleBankingList');
		var record = Ext.create('MOST.model.operation.ShiftingDoubleBanking');

		Ext.Object.merge(record.data, me.getViewModel().getData().theDoubleBanking.data);
		record.set('workingStatus', WorkingStatus.INSERT);

		if (record.data.atb == " ") {
			record.set('atb', null);
		}
		if (record.data.atw == " ") {
			record.set('atw', null);
		}
		if (record.data.atc == " ") {
			record.set('atc', null);
		}
		if (record.data.atu == " ") {
			record.set('atu', null);
		}
		if (record.data.stDt == " ") {
			record.set('stDt', null);
		}
		if (record.data.endDt == " ") {
			record.set('endDt', null);
		}
		if (record.data.ship1Atb == " ") {
			record.set('ship1Atb', null);
		}
		if (record.data.ship1Atw == " ") {
			record.set('ship1Atw', null);
		}
		if (record.data.ship1Atc == " ") {
			record.set('ship1Atc', null);
		}
		if (record.data.ship1Atu == " ") {
			record.set('ship1Atu', null);
		}
		if (record.data.ship2Atb == " ") {
			record.set('ship2Atb', null);
		}
		if (record.data.ship2Atc == " ") {
			record.set('ship2Atc', null);
		}
		if (record.data.ship2Atw == " ") {
			record.set('ship2Atw', null);
		}
		if (record.data.ship2Atu == " ") {
			record.set('ship2Atu', null);
		}
		if (record.data.ship3Atb == " ") {
			record.set('ship3Atb', null);
		}
		if (record.data.ship3Atw == " ") {
			record.set('ship3Atw', null);
		}
		if (record.data.ship3Atc == " ") {
			record.set('ship3Atc', null);
		}
		if (record.data.ship3Atu == " ") {
			record.set('ship3Atu', null);
		}

		doubleBankingList.insert(0, record.clone());
	},

	onAddShipToShipClick: function () {
		var me = this;
		var validObj = me.isShipToShipValid();
		var refs = me.getReferences();

		if (!validObj.valid) {
			MessageUtil.warning('warning_msg', validObj.msg);
			return false;
		}

		me.insertNewShipToShipData();
		me.initShftDblItm('theShipToShip');

		return true;
	},

	isShipToShipValid: function () {
		var me = this;
		var vldFldNmArr = ['refStsOprMode', 'refSTSHatchNo', 'refStsCargoType',
			'refSTSCmdty', 'refSTSStDtm', 'refSTSEndDtm'];
		var refs = me.getReferences();

		var validObj = {
			valid: true,
			msg: MOST.getApplication().bundle.getMsg('mandatoryField_msg') + "<br>"
		};

		if (Ext.isEmpty(refs.refTxtNextJpvc.getValue())) {
			validObj.valid = false;
			validObj.msg += refs.refTxtNextJpvc.getFieldLabel();
			return validObj;
		}

		Ext.Array.forEach(vldFldNmArr, function (ref) {
			var el = refs[ref];
			if (Ext.isEmpty(el.getValue())) {
				validObj.valid = false;
				validObj.msg += el.getFieldLabel() + '<br>';
			}
		});

		return validObj;
	},

	insertNewShipToShipData: function () {
		var cgTp;
		var me = this;
		var refs = me.getReferences();
		var stsOperationList = me.getStore('stsOperationList');
		var cgTpStore = me.getStore('cgTpAllListCombo');
		var record = Ext.create('MOST.model.operation.ShiftingDoubleBanking');

		Ext.Object.merge(record.data, me.getViewModel().get('theShipToShip').data);
		cgTp = cgTpStore.getAt(cgTpStore.findExact('scd', record.get('cgTpCd')));

		record.set('vslCallId', refs.txtJpvc.getValue());
		record.set('workingStatus', WorkingStatus.INSERT);
		record.set('userId', MOST.config.Token.getUserId());
		record.set({ 'cgTpNm': cgTp.get('scdNm') });

		stsOperationList.insert(0, record);
		me.initShftDblItm('theShipToShip');
	},

	onAddVesselShifting: function () {
		var me = this;
		var vslShftItem;
		var refs = me.getReferences();
		var vldObj = me.validateVslShftgItem();

		var vslCurrWharftList = me.getStore('vslCurrWharftList');
		var vslCurrWharftData = vslCurrWharftList.getData().items[0];
		var vesselShiftingList = me.getStore('vslShftList');

		//Validation: Have to unberth at previous one first before request a new one.
		if (!vldObj.valid) {
			MessageUtil.warning('Warning', vldObj.msg);
			return false;
		}

		vslShftItem = me.getViewModel().getData().theVesselShifting;
		vslShftItem.set({ workingStatus: WorkingStatus.INSERT });
		vesselShiftingList.insert(0, vslShftItem);
		//vslShftItem = me.initVslShftgItem();

		return true;
	},

	validateVslShftgItem: function () {
		var me = this;
		var refs = me.getReferences();
		var dateObj;
		var validObj = {};

		validObj.valid = true;
		validObj.msg = "";

		var vldFldNmArr = ['refNewBerthNo', 'txtWharfMarkFm',
			'refCobShftPosition', 'refCobReason'];

		if (Ext.isEmpty(refs.refPrevAtu.getValue())) {
			validObj.valid = false;
			validObj.msg = MOST.getApplication().bundle.getMsg('shiftingdoublebanking_Shftg_noAtu');
			return validObj;
		}

		if (refs.txtMooring.getValue() < 0) {
			validObj.valid = false;
			validObj.msg = 'Mooring value cannot be below 0';
			return validObj;
		}

		if (refs.txtTug.getValue() < 0) {
			validObj.valid = false;
			validObj.msg = 'Tug value cannot be below 0';
			return validObj;
		}

		if (!validObj.valid) {
			return validObj;
		}

		validObj.msg = MOST.getApplication().bundle.getMsg('mandatoryField_msg') + "<br>";

		Ext.Array.forEach(vldFldNmArr, function (ref) {
			var el = refs[ref];
			if (Ext.isEmpty(el.getValue())) {
				validObj.valid = false;
				validObj.msg += el.getFieldLabel() + '<br>';
			}
		});

		return validObj;
	},

	validateVslShftgDateFields: function (record) {
		var me = this;
		var refs = me.getReferences();

		var valid = true;
		var msg = 'Time should be followed :<br/>' +
			'Prev ATB -> Prev ATU -> New ATB -> ATW -> ATC -> New ATU';

		dateObj = {
			currAtb: (record) ? record.get('prevAtbDate') : refs.refPrevAtb.getValue(),
			currAtu: (record) ? record.get('prevAtuDate') : refs.refPrevAtu.getValue(),
			newAtb: (record) ? record.get('atbDate') : refs.refNewAtb.getValue(),
			atw: (record) ? record.get('atwDate') : refs.refNewAtw.getValue(),
			atc: (record) ? record.get('atcDate') : refs.refNewAtc.getValue(),
			newAtu: (record) ? record.get('atuDate') : refs.refNewAtu.getValue()
		}

		Ext.Object.each(dateObj, function (key, value, myself) {
			if (value !== null && key !== 'newAtb' && ['currAtu', 'currAtb'].includes(key)
				&& value > dateObj.newAtb) {
				valid = false;
			}

			if (value !== null && key !== 'newAtu' && ['currAtu', 'currAtb', 'newAtb', 'atw', 'atc'].includes(key)
				&& value > dateObj.newAtu) {
				valid = false;
			}
		});

		return { valid: valid, msg: (valid) ? '' : msg };
	},

	initVslShftgItem: function () {
		var me = this;
		var refs = me.getReferences();
		var vslCurrWharftList = me.getStore('vslCurrWharftList');
		var vslCurrWharftData = vslCurrWharftList.getData().items[0];
		var record = Ext.create('MOST.model.operation.ShiftingDoubleBanking');

		record.set('vslCallId', me.getViewModel().get('globalVesselCallId').toUpperCase());
		record.set('currWharf', vslCurrWharftData.get('currWharf'));
		record.set('currWharfMakrFm', vslCurrWharftData.get('currWharfMakrFm'));
		record.set('currWharfMakrTo', vslCurrWharftData.get('currWharfMakrTo'));
		record.set('prevAtbDate', Ext.Date.parse(vslCurrWharftData.get('prevAtb'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		record.set('prevAtuDate', Ext.Date.parse(vslCurrWharftData.get('prevAtu'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		record.set('atbDate', Ext.Date.parse(vslCurrWharftData.get('prevAtu'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));

		return record;
	},

	onAddCargoShifting: function () {
		var me = this;
		var refs = me.getReferences();
		var cargoShiftingList = me.getStore('cgShftList');
		var cgShftgItem = me.getViewModel().getData().theCargoShifting;
		var vldObj = me.validateCgoShftgItem(cgShftgItem);

		if (!vldObj.valid) {
			MessageUtil.warning('Warning', vldObj.msg);
			return false;
		}

		cgShftgItem.set('vslCallId', refs.txtJpvc.getValue());
		cgShftgItem.set('workingStatus', WorkingStatus.INSERT);

		cargoShiftingList.insert(0, cgShftgItem);

		me.initShftDblItm('theCargoShifting');

		return true;
	},

	validateCgoShftgItem: function (record) {
		var me = this;
		var refs = me.getReferences();
		var vldFldNmArr = [
			'refCboCrewList',
			'refShftTypeCombo',
			'refCgShftStartTime',
			'refCgShfEndTime'
		];

		var vldObj = {
			valid: true,
			msg: MOST.getApplication().bundle.getMsg('mandatoryField_msg') + "<br>"
		};

		if (record.get('sftTp') === 'S3' && !record.get('nextHatchNo')) {
			vldObj.valid = false;
			vldObj.msg = 'Please input the next hatch.';
			return vldObj;

		} else if (record.get('sftTp') === 'S4' && !record.get('pkgTpCd')) {
			vldObj.valid = false;
			vldObj.msg = 'Please input Package type.';
			return vldObj;
		} else if ((record.get('mt') === '0' || record.get('mt') === '') && (record.get('m3') === '0' || record.get('m3') === '') && (record.get('qty') === '0' || record.get('qty') === '')) {
			vldObj.valid = false;
			vldObj.msg = 'Please input MT and M3, Qty.';
			return vldObj;

		} else if (record.get('stDate') && record.get('endDate')) {
			if (record.get('stDate') > record.get('endDate')) {
				vldObj.valid = false;
				vldObj.msg = 'Please check the start and end time.';
				return vldObj;
			}
		}

		Ext.Array.forEach(vldFldNmArr, function (ref) {
			var el = refs[ref];
			if (Ext.isEmpty(el.getValue())) {
				vldObj.valid = false;
				vldObj.msg += el.getFieldLabel() + '<br>';
			}
		});

		return vldObj;
	},

	onTxt2ndJpvcRender: function (val) {
		var me = this;
		var refs = me.getReferences();
		var selection = refs.refsGridDbBanking.getSelection()[0];

		if (refs.refsGridDbBanking.getSelection()[0] != null) {
			if (refs.refsGridDbBanking.getSelection()[0].modified != null) {
				refs.refsGridDbBanking.getSelection()[0].modified.dblBnkShip1 = refs.refCol2ndJpvc.getEditor().getValue();
				val = refs.refCol2ndJpvc.getEditor().getValue().toUpperCase();
			}
		}

		return val;
	},

	onDateTimeColRenderer: function (val) {
		var me = this;
		var refs = me.getReferences();

		var date = new Date(val);

		if (!isNaN(date.getDate())) {
			return Ext.Date.format(new Date(val), 'd/m/Y H:i')
		} else {
			return val;
		}
	},

	onBankingTypeComboRender: function (val, cell) {
		var me = this;
		var refs = me.getReferences();
		var bankingTypeCombo = me.getStore('bankingTypeCombo');

		if (cell.column.dataIndex == 'dblBnkDivCd') {
			if (bankingTypeCombo != null) {
				if (!StringUtil.isNullorEmpty(val)) {
					var indx = -1;
					indx = bankingTypeCombo.find('scd', val);

					if (indx != -1) {
						return bankingTypeCombo.getAt(indx).get('scdNm');
					} else {
						return bankingTypeCombo.getAt(0).get('scdNm');;
					}
				}
			}
		}
	},

	onOprModeComboRender: function (val, cell) {
		var me = this;
		var refs = me.getReferences();
		var oprModeCombo = me.getStore('oprModeCombo');

		if (cell.column.dataIndex == 'stsOpTp') {
			if (oprModeCombo != null) {
				if (!StringUtil.isNullorEmpty(val)) {
					var indx = -1;
					indx = oprModeCombo.find('scd', val);

					if (indx != -1) {
						return oprModeCombo.getAt(indx).get('scdNm');
					} else {

						return oprModeCombo.getAt(0).get('scdNm');;
					}
				}
			}
		}
	},

	onCmdtCdComboRender: function (val, cell) {
		var me = this;
		var refs = me.getReferences();
		var commodityListCombo = me.getStore('commodityListCombo');

		if (cell.column.dataIndex == 'cmdtCd') {
			if (commodityListCombo != null) {
				if (!StringUtil.isNullorEmpty(val)) {
					var indx = -1;
					indx = commodityListCombo.find('cmdtCd', val);

					if (indx != -1) {
						return commodityListCombo.getAt(indx).get('cmdtCdNm');
					} else {

						return commodityListCombo.getAt(0).get('cmdtCdNm');;
					}
				}
			}
		}
	},

	onCboCgTpRender: function (val, cell) {
		var me = this;
		var refs = me.getReferences();
		var cgTpListCombo = me.getStore('cgTpListCombo');

		if (cell.column.dataIndex == 'cgTpCd') {
			if (cgTpListCombo != null) {
				if (!StringUtil.isNullorEmpty(val)) {
					var indx = -1;
					indx = cgTpListCombo.find('cgTpCd', val);

					if (indx != -1) {
						return cgTpListCombo.getAt(indx).get('cgTpNm');
					} else {

						return cgTpListCombo.getAt(0).get('cgTpNm');;
					}
				}
			}
		}
	},

	onDateTimeColAfterrender: function (val) {
		var me = this;
		var refs = me.getReferences();
	},

	onSave: function () {
		var me = this;
		var refs = me.getReferences();
		var sendArray = new Array();
		var stsSendArray = new Array();

		var doubleBankingList = me.getStore('doubleBankingList');
		var sftDblBankingList = me.getStore('sftDblBankingList');
		var stsOperationList = me.getStore('stsOperationList');
		var vslShftList = me.getStore('vslShftList');
		var cgShftList = me.getStore('cgShftList');
		var doubleBankingData = doubleBankingList.getData().items;
		var cudData = Ext.create('MOST.model.operation.ShiftingDoubleBanking');
		var bankingTypeCombo = me.getStore('bankingTypeCombo');
		var comboData = bankingTypeCombo.getData();

		var currTab = me.getActiveTabReference();
		var saveSuccess = false;

		if (currTab === me.REF_TAB_DBL_BNK) {
			for (var i = 0; i < doubleBankingList.getModifiedRecords().length; i++) {
				var record = doubleBankingList.getModifiedRecords()[i];
				if (!StringUtil.isNullorEmpty(record.get('workingStatus'))) {

					if (!record.get('dblBnkDivCd')) {
						MessageUtil.info('info_msg', 'ShftDblBankNoneType');
						return;
					}

					if (record.get('dblBnkDivCd') === 'BT' || record.get('dblBnkDivCd') === 'BG') {
						if (!record.get('dblBnkShip1')) {
							MessageUtil.warning('warning_msg', 'mandatoryField_msg', '2nd Jpvc');
							return;
						}
					} else if (record.get('dblBnkDivCd') === 'TG') {
						if (!record.get('ship1Loa')) {
							MessageUtil.warning('warning_msg', 'mandatoryField_msg', '2nd Loa');
							return;
						}
					} else if (record.get('dblBnkDivCd') === 'TA') {
						if (!record.get('ship1Loa')) {
							MessageUtil.warning('warning_msg', 'mandatoryField_msg', '2nd Loa');
							return;
						}
					} else if (record.get('dblBnkDivCd') === 'TR') {
						if (!record.get('ship1Loa')) {
							MessageUtil.warning('warning_msg', 'mandatoryField_msg', '2nd Loa');
							return;
						}
						if (!record.get('ship1Atu')) {
							MessageUtil.warning('warning_msg', 'mandatoryField_msg', '2nd Atu');
							return;
						}
						if (!record.get('dblBnkShip2')) {
							MessageUtil.warning('warning_msg', 'mandatoryField_msg', '2nd Jpvc');
							return;
						}
						if (!record.get('ship2Loa')) {
							MessageUtil.warning('warning_msg', 'mandatoryField_msg', '3nd Loa');
							return;
						}
						if (!record.get('ship2Atb')) {
							MessageUtil.warning('warning_msg', 'mandatoryField_msg', '3nd Atb');
							return;
						}
					} else if (record.get('dblBnkDivCd') === 'VL') {
						if (!record.get('dblBnkShip1')) {
							MessageUtil.warning('warning_msg', 'mandatoryField_msg', '2nd Jpvc');
							return;
						}
					}

					record.set('searchType', 'doubleBanking');
					record.set('userId', MOST.config.Token.getUserId());
					//					sendArray.push(record.data);

					record.set('stDtNoSecond', record.get('stDt'));
					record.set('endDtNoSecond', record.get('endDt'));
					record.set('ship1AtbNoSecond', record.get('ship1Atb'));
					record.set('ship1AtwNoSecond', record.get('ship1Atw'));
					record.set('ship1AtcNoSecond', record.get('ship1Atc'));
					record.set('ship1AtuNoSecond', record.get('ship1Atu'));
					record.set('ship2AtbNoSecond', record.get('ship2Atb'));
					record.set('ship2AtwNoSecond', record.get('ship2Atw'));
					record.set('ship2AtcNoSecond', record.get('ship2Atc'));
					record.set('ship2AtuNoSecond', record.get('ship2Atu'));
					record.set('prevAtbNoSecond', record.get('prevAtb'));
					record.set('prevAtuNoSecond', record.get('prevAtu'));
					record.set('atuDtNoSecond', record.get('atuDt'));
					record.set('atbDtNoSecond', record.get('atbDt'));
					record.set('atwNoSecond', record.get('atwNo'));
					record.set('atcNoSecond', record.get('atcNo'));

					record.set('ship3AtbNoSecond', record.get('ship3Atb'));
					record.set('ship3AtwNoSecond', record.get('ship3Atw'));
					record.set('ship3AtcNoSecond', record.get('ship3Atc'));
					record.set('ship3AtuNoSecond', record.get('ship3Atu'));

					var proxy = record.getProxy();
					proxy.url = doubleBankingList.getProxy().url;
					record.save({

					});
					saveSuccess = true;
				}
			}

			if (saveSuccess) {
				MessageUtil.saveSuccess();
			}
			me.onSearch();
			return;
		} else if (currTab === me.REF_TAB_STS) {
			for (var i = 0; i < stsOperationList.getModifiedRecords().length; i++) {
				var record = stsOperationList.getModifiedRecords()[i];
				if (!record.get('stDt')) {
					MessageUtil.warning('warning_msg', 'Please check the start time.');
					return;
				}
				if (!record.get('endDt')) {
					MessageUtil.warning('warning_msg', 'Please check the end time.');
					return;
				}
				if (record.get('stDate') && record.get('endDate')) {
					if (record.get('stDate') > record.get('endDate')) {
						MessageUtil.warning('warning_msg', 'Please check the start and end time.');
						return;
					}
				}
				if (!(record.get('mt') && record.get('m3') && record.get('qty'))) {
					MessageUtil.warning('warning_msg', 'Please check the actual amount.');
					return;
				}

				if (parseFloat(record.get('balMt')) < 0 || parseFloat(record.get('balM3')) < 0 || parseFloat(record.get('balQty')) < 0) {
					MessageUtil.warning('warning_msg', 'Balance Amount(MT, M3, Qty) is under zero.');
					return;
				}

				if (!StringUtil.isNullorEmpty(record.get('workingStatus'))) {
					record.set('searchType', 'stsOperation');
					record.set('userId', MOST.config.Token.getUserId());
					record.set('stDtNoSecond', record.get('stDt'));
					record.set('endDtNoSecond', record.get('endDt'));
					record.set('ship1AtbNoSecond', record.get('ship1Atb'));
					record.set('ship1AtwNoSecond', record.get('ship1Atw'));
					record.set('ship1AtcNoSecond', record.get('ship1Atc'));
					record.set('ship1AtuNoSecond', record.get('ship1Atu'));
					record.set('ship2AtbNoSecond', record.get('ship2Atb'));
					record.set('ship2AtwNoSecond', record.get('ship2Atw'));
					record.set('ship2AtcNoSecond', record.get('ship2Atc'));
					record.set('ship2AtuNoSecond', record.get('ship2Atu'));
					record.set('prevAtbNoSecond', record.get('prevAtb'));
					record.set('prevAtuNoSecond', record.get('prevAtu'));
					record.set('atuDtNoSecond', record.get('atuDt'));
					record.set('atbDtNoSecond', record.get('atbDt'));
					record.set('atwNoSecond', record.get('atwNo'));
					record.set('atcNoSecond', record.get('atcNo'));

					var proxy = record.getProxy();
					proxy.url = stsOperationList.getProxy().url;
					record.save({

					});
					saveSuccess = true;
				}
			}
			if (saveSuccess) {
				MessageUtil.saveSuccess();
			}
			me.onSearch();
			return;

		} else if (currTab === me.REF_TAB_VSL_SHFT) {
			for (var i = 0; i < vslShftList.getModifiedRecords().length; i++) {
				var record = vslShftList.getModifiedRecords()[i];
				var validObj;

				record.set('vslCallId', refs.txtJpvc.getValue());

				if (!record.get('wharfMarkTo')) {
					MessageUtil.warning('warning_msg', 'Please select a New Location');
					return;
				}
				if (!record.get('berthAlongside')) {
					MessageUtil.warning('warning_msg', "Please select Shifting Position");
					return;
				}
				if (!record.get('rsnCd')) {
					MessageUtil.warning('warning_msg', 'Please select a Reason');
					return;
				}

				if (Ext.isEmpty(record.get('nxBerthNo'))) {
					MessageUtil.warning('warning_msg', 'Please input the New Loc');
					return;
				}

				if (!StringUtil.isNullorEmpty(record.get('workingStatus'))) {
					record.set('searchType', 'vesselShifting');
					record.set('userId', MOST.config.Token.getUserId());

					record.set('stDtNoSecond', record.get('stDt'));
					record.set('endDtNoSecond', record.get('endDt'));
					record.set('ship1AtbNoSecond', record.get('ship1Atb'));
					record.set('ship1AtwNoSecond', record.get('ship1Atw'));
					record.set('ship1AtcNoSecond', record.get('ship1Atc'));
					record.set('ship1AtuNoSecond', record.get('ship1Atu'));
					record.set('ship2AtbNoSecond', record.get('ship2Atb'));
					record.set('ship2AtwNoSecond', record.get('ship2Atw'));
					record.set('ship2AtcNoSecond', record.get('ship2Atc'));
					record.set('ship2AtuNoSecond', record.get('ship2Atu'));
					record.set('prevAtbNoSecond', record.get('prevAtb'));
					record.set('prevAtuNoSecond', record.get('prevAtu'));
					record.set('atuDtNoSecond', record.get('atuDt'));
					record.set('atbDtNoSecond', record.get('atbDt'));
					record.set('atwNoSecond', record.get('atwNo'));
					record.set('atcNoSecond', record.get('atcNo'));

					var proxy = record.getProxy();
					proxy.url = vslShftList.getProxy().url;
					record.save({

					});
					saveSuccess = true;
				}
			}
			if (saveSuccess) {
				MessageUtil.saveSuccess();
			}
			me.onSearch();
			return;
		} else if (currTab === me.REF_TAB_CG_SHFT) {
			for (var i = 0; i < cgShftList.getModifiedRecords().length; i++) {
				var record = cgShftList.getModifiedRecords()[i];

				if (!record.get('hatchNo')) {
					MessageUtil.warning('warning_msg', 'Please check the Hatch.');
					return;
				}
				if (!record.get('stcrDiv')) {
					MessageUtil.warning('warning_msg', "Please check the Steveedore / Ship's crew.");
					return;
				}
				if (!record.get('sftTp')) {
					MessageUtil.warning('warning_msg', 'Please check the Shifting Type');
					return;
				}
				if (record.get('sftTp') === 'S3' && !record.get('nextHatchNo')) {
					MessageUtil.warning('warning_msg', 'Please input the next hatch.');
					return;
				}
				if (record.get('sftTp') === 'S4' && !record.get('pkgTpCd')) {
					MessageUtil.warning('warning_msg', 'Please input Package type.');
					return;
				}
				if (!record.get('stDate')) {
					MessageUtil.warning('warning_msg', 'Please check the start time.');
					return;
				}
				if (!record.get('endDate')) {
					MessageUtil.warning('warning_msg', 'Please check the end time.');
					return;
				}
				if ((record.get('mt') === '0' || record.get('mt') === '') && (record.get('m3') === '0' || record.get('m3') === '') && (record.get('qty') === '0' || record.get('qty') === '')) {
					MessageUtil.warning('warning_msg', 'Please input MT and M3, Qty.');
					return;
				}
				if (record.get('stDate') && record.get('endDate')) {
					if (record.get('stDate') > record.get('endDate')) {
						MessageUtil.warning('warning_msg', 'Please check the start and end time.');
						return;
					}
				}

				if (!StringUtil.isNullorEmpty(record.get('workingStatus'))) {
					record.set('searchType', 'cargoShifting');
					record.set('userId', MOST.config.Token.getUserId());
					record.set('stDtNoSecond', record.get('stDt'));
					record.set('endDtNoSecond', record.get('endDt'));
					record.set('ship1AtbNoSecond', record.get('ship1Atb'));
					record.set('ship1AtwNoSecond', record.get('ship1Atw'));
					record.set('ship1AtcNoSecond', record.get('ship1Atc'));
					record.set('ship1AtuNoSecond', record.get('ship1Atu'));
					record.set('ship2AtbNoSecond', record.get('ship2Atb'));
					record.set('ship2AtwNoSecond', record.get('ship2Atw'));
					record.set('ship2AtcNoSecond', record.get('ship2Atc'));
					record.set('ship2AtuNoSecond', record.get('ship2Atu'));
					record.set('prevAtbNoSecond', record.get('prevAtb'));
					record.set('prevAtuNoSecond', record.get('prevAtu'));
					record.set('atuDtNoSecond', record.get('atuDt'));
					record.set('atbDtNoSecond', record.get('atbDt'));
					record.set('atwNoSecond', record.get('atwNo'));
					record.set('atcNoSecond', record.get('atcNo'));

					var proxy = record.getProxy();
					proxy.url = cgShftList.getProxy().url;
					record.save({

					});
					saveSuccess = true;
				}
			}
			if (saveSuccess) {
				MessageUtil.saveSuccess();
			}
			me.onSearch();
			return;
		}

	},

	onTriggerClick: function (field, button, e) {
		var me = this;
		var refs = me.getReferences();

		me.openCodePopup('popup-vesselcallidlistpopup', 'txtNextJpvc');
	},

	onTxtJpvcTriggerClick: function (field, button, e) {
		var me = this;
		var refs = me.getReferences();

		if (field.reference === 'txt2ndJpvc' && refs.refCboBankingType.getValue() === 'TG') {
			var params = {
				vslTp: '09'
			};
			me.openCodePopup('popup-vesselcallidlistpopup', field.reference, params);
		} else
			me.openCodePopup('popup-vesselcallidlistpopup', field.reference);
	},

	onTriggerPkgClick: function (field, button, e) {
		var me = this;
		var refs = me.getReferences();
		var params = {
			searchLcd: 'MT',
			searchDivCd: 'PKGTP',
			searchType: 'COMM'
		};
		me.openCodePopup('popup-cmmcdpopup', 'txtPkgTpCd', params);
	},

	onRequesterTriggerClick: function (field, button, e) {
		var me = this;
		me.openCodePopup('popup-usertypepopup', 'txtRequester');
	},

	onCboShftPositionRender: function (val, cell) {
		var me = this;
		var refs = me.getReferences();
		var shiftPositionListCombo = me.getStore('shiftPositionListCombo');

		if (cell.column.dataIndex == 'berthAlongside') {
			if (shiftPositionListCombo != null) {
				if (!StringUtil.isNullorEmpty(val)) {
					var indx = -1;
					indx = shiftPositionListCombo.find('scd', val);

					if (indx != -1) {
						return shiftPositionListCombo.getAt(indx).get('scdNm');
					} else {

						return shiftPositionListCombo.getAt(0).get('scdNm');;
					}
				}
			}
		}
	},

	onCboReasonRender: function (val, cell) {
		var me = this;
		var refs = me.getReferences();
		var reasonListCombo = me.getStore('reasonListCombo');

		if (cell.column.dataIndex == 'rsnCd') {
			if (reasonListCombo != null) {
				if (!StringUtil.isNullorEmpty(val)) {
					var indx = -1;
					indx = reasonListCombo.find('scd', val);

					if (indx != -1) {
						return reasonListCombo.getAt(indx).get('scdNm');
					} else {

						return reasonListCombo.getAt(0).get('scdNm');;
					}
				}
			}
		}
	},

	onCboCrewListRender: function (val, cell) {
		var me = this;
		var refs = me.getReferences();
		var crewListCombo = me.getStore('crewListCombo');

		if (cell.column.dataIndex == 'stcrDiv') {
			if (crewListCombo != null) {
				if (!StringUtil.isNullorEmpty(val)) {
					var indx = -1;
					indx = crewListCombo.find('scd', val);

					if (indx != -1) {
						return crewListCombo.getAt(indx).get('scdNm');
					} else {

						return crewListCombo.getAt(0).get('scdNm');;
					}
				}
			}
		}
	},

	onCboShftTypeListRender: function (val, cell) {
		var me = this;
		var refs = me.getReferences();
		var shftStyleListCombo = me.getStore('shftStyleListCombo');

		if (cell.column.dataIndex == 'sftTp') {
			if (shftStyleListCombo != null) {
				if (!StringUtil.isNullorEmpty(val)) {
					var indx = -1;
					indx = shftStyleListCombo.find('scd', val);

					if (indx != -1) {
						return shftStyleListCombo.getAt(indx).get('scdNm');
					} else {

						return shftStyleListCombo.getAt(0).get('scdNm');;
					}
				}
			}
		}
	},

	onRemove: function () {
		var me = this;
		var grid;
		var searchType;
		var sendArray = [];

		var refs = me.getReferences();
		var currTab = me.getActiveTabReference();
		var sftDblBankingList = me.getStore('sftDblBankingList');
		var cudData = Ext.create('MOST.model.operation.ShiftingDoubleBanking');

		if (currTab === me.REF_TAB_DBL_BNK) {
			grid = refs.refsGridDbBanking;
			searchType = 'doubleBanking';

			var doubleBankingList = me.getStore('doubleBankingList');
			var record = grid.getSelectionModel().getSelection();
			MessageUtil.question('remove', 'infodelete_msg', null,
				function (button) {
					if (button === 'ok') {
						doubleBankingList.remove(record);
						doubleBankingList.sync({
							success: function () {
								MessageUtil.saveSuccess();
								me.onSearch();

								// double banking
								var record = Ext.create('MOST.model.operation.ShiftingDoubleBanking');
								record.set('workingStatus', WorkingStatus.INSERT);
								me.getViewModel().set('theDoubleBanking', record);

								refs.refTxtJpvcDB.setValue('');
								refs.refTxt3rdJpvcDB.setValue('');
								refs.refCboBankingType.setDisabled(false);
								refs.refCboBankingType.setValue('');
							}
						});

					}
				}
			);

			return;
		} else if (currTab === me.REF_TAB_STS) {
			grid = refs.refStsGrid;
			searchType = 'stsOperation';

			var stsOperationList = me.getStore('stsOperationList');
			var record = grid.getSelectionModel().getSelection();
			MessageUtil.question('remove', 'infodelete_msg', null,
				function (button) {
					if (button === 'ok') {
						stsOperationList.remove(record);
						stsOperationList.sync({
							success: function () {
								MessageUtil.saveSuccess();
								me.onSearch();

								// double banking
								var record = Ext.create('MOST.model.operation.ShiftingDoubleBanking');
								record.set('workingStatus', WorkingStatus.INSERT);
								me.getViewModel().set('theDoubleBanking', record);

								refs.refTxtJpvcDB.setValue('');
								refs.refTxt3rdJpvcDB.setValue('');
								refs.refCboBankingType.setDisabled(false);
								refs.refCboBankingType.setValue('');

							}
						});
					}
				}
			);

			return;
		} else if (currTab === me.REF_TAB_VSL_SHFT) {
			grid = refs.refVesselShiftingGrid;
			searchType = 'vesselShifting';
			var vslShftList = me.getStore('vslShftList');
			var record = grid.getSelectionModel().getSelection();
			MessageUtil.question('remove', 'infodelete_msg', null,
				function (button) {
					if (button === 'ok') {
						vslShftList.remove(record);
						vslShftList.sync({
							success: function () {
								MessageUtil.saveSuccess();
								me.onSearch();

								// double banking
								var record = Ext.create('MOST.model.operation.ShiftingDoubleBanking');
								record.set('workingStatus', WorkingStatus.INSERT);
								me.getViewModel().set('theDoubleBanking', record);

								refs.refTxtJpvcDB.setValue('');
								refs.refTxt3rdJpvcDB.setValue('');
								refs.refCboBankingType.setDisabled(false);
								refs.refCboBankingType.setValue('');
							}
						});

					}
				}
			);

			return;
		} else if (currTab === me.REF_TAB_CG_SHFT) {
			grid = refs.refCargoShiftingGrid;
			searchType = 'cargoShifting';
			var cgShftList = me.getStore('cgShftList');
			var record = grid.getSelectionModel().getSelection();
			MessageUtil.question('remove', 'infodelete_msg', null,
				function (button) {
					if (button === 'ok') {
						cgShftList.remove(record);
						cgShftList.sync({
							success: function () {
								MessageUtil.saveSuccess();
								me.onSearch();
								// double banking
								var record = Ext.create('MOST.model.operation.ShiftingDoubleBanking');
								record.set('workingStatus', WorkingStatus.INSERT);
								me.getViewModel().set('theDoubleBanking', record);

								refs.refTxtJpvcDB.setValue('');
								refs.refTxt3rdJpvcDB.setValue('');
								refs.refCboBankingType.setDisabled(false);
								refs.refCboBankingType.setValue('');
							}
						});

					}
				}
			);

			return;
		}
	},

	onLoadStsInfo: function (jpvc) {
		var me = this;
		var refs = me.getReferences();
		var stsInfo = me.getStore('stsInfo');
		var cgTpListCombo = me.getStore('cgTpListCombo');
		var cmdtCdListCombo = me.getStore('cmdtCdListCombo');
		var amountByOPRModeList = me.getStore('amountByOPRModeList');
		var confirmationSlipList = me.getStore('confirmationSlipList');
		var cgTpAllListCombo = me.getStore('cgTpAllListCombo');
		var cmdtCdAllListCombo = me.getStore('cmdtCdAllListCombo');
		if (!StringUtil.isNullorEmpty(jpvc)) {
			stsInfo.load({
				params: {
					searchType: 'stsInfo',
					vslCallId: jpvc
				},
				callback: function (records, success) {
					if (success) {
						cmdtCdListCombo.setData(records[0].get('commodityList'));
						cgTpListCombo.setData(records[0].get('cargoList'));
						amountByOPRModeList.setData(records[0].get('amountByOPRModeList'));
						confirmationSlipList.setData(records[0].get('confirmationSlipInfo'));

						cgTpAllListCombo.clearFilter();
						cgTpAllListCombo.filterBy(function (record) {
							for (var i = 0; i < records[0].get('cargoList').length; i++) {
								var rec = records[0].get('cargoList')[i];
								if (record.data.scd === rec.cgTpCd) {
									return true;
								}
							}
						});

						cmdtCdAllListCombo.clearFilter();
						cmdtCdAllListCombo.filterBy(function (record) {
							for (var i = 0; i < records[0].get('commodityList').length; i++) {
								var rec = records[0].get('commodityList')[i];
								if (record.data.scd === rec.cmdtCd) {
									return true;
								}
							}
						});

						cmdtCdListCombo.commitChanges();
						cgTpListCombo.commitChanges();
						amountByOPRModeList.commitChanges();
						confirmationSlipList.commitChanges();

						me.onAutoFetchingConfirmationSlipInfo();
					}
				}
			})
		}
	},

	onAutoFetchingConfirmationSlipInfo: function () {
		var me = this;
		var refs = me.getReferences();
		var stsGrid = refs.refStsGrid;
		var confirmationSlipList = me.getStore('confirmationSlipList');

		var selectedRecord = me.getViewModel().get('theShipToShip')
		if (confirmationSlipList.data.length > 0) {

			if (selectedRecord.get('workingStatus') === WorkingStatus.INSERT) {
				var filterData = confirmationSlipList.getData().items[0];
				selectedRecord.set('stsOpTp', filterData.get('stsOpTp'));
				selectedRecord.set('cgTpCd', filterData.get('cgTpCd'));
				selectedRecord.set('cgTpNm', filterData.get('cgTpNm'));
				selectedRecord.set('hatchNo', filterData.get('hatchNo'));
				selectedRecord.set('cmdtCd', filterData.get('cmdtCd'));
				selectedRecord.set('pkgTpCd', filterData.get('pkgTpCd'));
			}

			me.onAutoFetchingAmountInfo();
		} else {
			selectedRecord.set('stsOpTp', '');
			selectedRecord.set('cgTpCd', '');
			selectedRecord.set('cgTpNm', '');
			selectedRecord.set('hatchNo', '');
			selectedRecord.set('cmdtCd', '');
			selectedRecord.set('pkgTpCd', '');

			me.onAutoFetchingAmountInfo();
		}
	},

	onAutoFetchingAmountInfo: function () {
		var me = this;
		var refs = me.getReferences();
		var selection = me.getViewModel().get('theShipToShip');

		var amountByOPRModeList = me.getStore('amountByOPRModeList');
		var oprMode = selection.get('stsOpTp') === 'LD' ? 'SL' : 'SD';

		amountByOPRModeList.clearFilter();
		amountByOPRModeList.filterBy(function (record, id) {
			if (record.get('cgOptTpCd') === oprMode && record.get('cgTpCd') === selection.get('cgTpCd')) {
				return record;
			}
		});

		if (amountByOPRModeList.getData().items.length > 0) {
			var filterData = amountByOPRModeList.getData().items[0];

			selection.set('docMt', filterData.get('mt'));
			selection.set('docM3', filterData.get('m3'));
			selection.set('docQty', filterData.get('qty'));
			selection.commit();
		} else {
			selection.set('docMt', '0');
			selection.set('docM3', '0');
			selection.set('docQty', '0');
			selection.commit();
		}
	},

	onActMtChange: function (field, newValue, oldValue) {
		var me = this;
		var refs = me.getReferences();
		var stsGrid = refs.refStsGrid;
		var selection = stsGrid.getSelection()[0];

		var docMt = parseFloat(selection.get('docMt'));
		var balMt = docMt - parseFloat(newValue);

		if (balMt < 0) {
			MessageUtil.error('warning_msg', 'shiftingdoublebanking_balance_mt_under_zero');
			field.setValue(selection.get('mt'));
			return;
		}

		if (isNaN(balMt)) {
			balMt = selection.get('balMt');
		}

		refs.refColBalMt.getEditor().setValue(balMt);
	},

	onActM3Change: function (field, newValue, oldValue) {
		var me = this;
		var refs = me.getReferences();
		var stsGrid = refs.refStsGrid;
		var selection = stsGrid.getSelection()[0];

		var docM3 = parseFloat(selection.get('docM3'));
		var balM3 = docM3 - parseFloat(newValue);

		if (balM3 < 0) {
			MessageUtil.error('warning_msg', 'shiftingdoublebanking_balance_m3_under_zero');
			field.setValue(selection.get('m3'));
			return;
		}

		refs.refColBalM3.getEditor().setValue(balM3);
	},

	onActQtyChange: function (field, newValue, oldValue) {
		var me = this;
		var refs = me.getReferences();
		var stsGrid = refs.refStsGrid;
		var selection = stsGrid.getSelection()[0]

		var docQty = parseFloat(selection.get('docQty'));
		var balQty = docQty - parseFloat(newValue);

		if (balQty < 0) {
			MessageUtil.error('warning_msg', 'shiftingdoublebanking_balance_qty_under_zero');
			field.setValue(selection.get('qty'));
			return;
		}

		refs.refColBalQty.getEditor().setValue(balQty);
	},

	onLeaveFocusJPVCGrid: function (val) {

		var me = this;
		var refs = me.getReferences();
		var vslTp = '';
		if (refs.refCboBankingType.getValue() === 'TG') {
			vslTp = '09'; //Barge Tug
		}

		if (!StringUtil.isNullorEmpty(val.getValue())) {
			var sftDblBankingList = me.getStore('sftDblBankingRenderList');

			sftDblBankingList.load({
				params: {
					vslCallId: val.getValue().toUpperCase(),
					searchType: 'info',
					vslTp: vslTp
				},
				callback: function (records, operation, success) {
					if (success) {

						var vslInfo = records[0].data.vslInfo[0];
						if (vslInfo != null && vslInfo != undefined) {
							if (refs.refCboBankingType.getValue() === 'BT'
								|| refs.refCboBankingType.getValue() === 'BG') {
								if (val.reference === 'txt3rdJpvc') {
									refs.txt3rdLoa.setValue(vslInfo.loa);
									refs.refCol3rdJpvcNm.getEditor().setValue(vslInfo.vslNm);
									if (vslInfo.atu != null)
										refs.refCol3rdAtu.getEditor().setValue(Ext.Date.format(new Date(vslInfo.atu), 'd/m/Y H:i'));
									if (vslInfo.atb != null)
										refs.refCol3rdAtb.getEditor().setValue(Ext.Date.format(new Date(vslInfo.atb), 'd/m/Y H:i'));
									if (vslInfo.atw != null)
										refs.refCol3rdAtw.getEditor().setValue(Ext.Date.format(new Date(vslInfo.atw), 'd/m/Y H:i'));
									if (vslInfo.atc != null)
										refs.refCol3rdAtc.getEditor().setValue(Ext.Date.format(new Date(vslInfo.atc), 'd/m/Y H:i'));
								} else {
									refs.txt2ndLoa.setValue(vslInfo.loa);
									refs.refCol2ndJpvcNm.getEditor().setValue(vslInfo.vslNm);
									if (vslInfo.atb != null)
										refs.refCol2ndAtb.getEditor().setValue(Ext.Date.format(new Date(vslInfo.atb), 'd/m/Y H:i'));
									if (vslInfo.atu != null)
										refs.refCol2ndAtu.getEditor().setValue(Ext.Date.format(new Date(vslInfo.atu), 'd/m/Y H:i'));
									if (vslInfo.atc != null)
										refs.refCol2ndAtc.getEditor().setValue(Ext.Date.format(new Date(vslInfo.atc), 'd/m/Y H:i'));
									if (vslInfo.atw != null)
										refs.refCol2ndAtw.getEditor().setValue(Ext.Date.format(new Date(vslInfo.atw), 'd/m/Y H:i'));
								}
							} else if (refs.refCboBankingType.getValue() === 'TR') {
								refs.txt3rdLoa.setValue(vslInfo.loa);
								refs.refCol3rdJpvcNm.getEditor().setValue(vslInfo.vslNm);
								if (vslInfo.atu != null)
									refs.refCol3rdAtu.getEditor().setValue(Ext.Date.format(new Date(vslInfo.atu), 'd/m/Y H:i'));
								if (vslInfo.atb != null)
									refs.refCol3rdAtb.getEditor().setValue(Ext.Date.format(new Date(vslInfo.atb), 'd/m/Y H:i'));
								if (vslInfo.atw != null)
									refs.refCol3rdAtw.getEditor().setValue(Ext.Date.format(new Date(vslInfo.atw), 'd/m/Y H:i'));
								if (vslInfo.atc != null)
									refs.refCol3rdAtc.getEditor().setValue(Ext.Date.format(new Date(vslInfo.atc), 'd/m/Y H:i'));
							} else if (refs.refCboBankingType.getValue() === 'VL') {
								refs.txt2ndLoa.setValue(vslInfo.loa);
								refs.refCol2ndJpvcNm.getEditor().setValue(vslInfo.vslNm);
								if (vslInfo.atb != null)
									refs.refCol2ndAtb.getEditor().setValue(Ext.Date.format(new Date(vslInfo.atb), 'd/m/Y H:i'));
								if (vslInfo.atu != null)
									refs.refCol2ndAtu.getEditor().setValue(Ext.Date.format(new Date(vslInfo.atu), 'd/m/Y H:i'));
								if (vslInfo.atc != null)
									refs.refCol2ndAtc.getEditor().setValue(Ext.Date.format(new Date(vslInfo.atc), 'd/m/Y H:i'));
								if (vslInfo.atw != null)
									refs.refCol2ndAtw.getEditor().setValue(Ext.Date.format(new Date(vslInfo.atw), 'd/m/Y H:i'));

							} else if (refs.refCboBankingType.getValue() === 'TG') {
								refs.txt2ndLoa.setValue(vslInfo.loa);
								refs.refCol2ndJpvcNm.getEditor().setValue(vslInfo.vslNm);

								refs.refCol3rdJpvcNm.getEditor().setValue(vslInfo.vslNm);
								refs.refCol3rdJpvc.getEditor().setValue(vslInfo.vslCallId);
								refs.txt3rdLoa.setValue(vslInfo.loa);

								if (vslInfo.atb != null) {
									refs.refCol2ndAtb.getEditor().setValue(Ext.Date.format(new Date(vslInfo.atb), 'd/m/Y H:i'));
									refs.refCol3rdAtb.getEditor().setValue(Ext.Date.format(new Date(vslInfo.atb), 'd/m/Y H:i'));
								}

								if (vslInfo.atu != null) {
									refs.refCol2ndAtu.getEditor().setValue(Ext.Date.format(new Date(vslInfo.atu), 'd/m/Y H:i'));
									refs.refCol3rdAtu.getEditor().setValue(Ext.Date.format(new Date(vslInfo.atu), 'd/m/Y H:i'));
								}

								if (vslInfo.atc != null) {
									refs.refCol2ndAtc.getEditor().setValue(Ext.Date.format(new Date(vslInfo.atc), 'd/m/Y H:i'));
									refs.refCol3rdAtc.getEditor().setValue(Ext.Date.format(new Date(vslInfo.atc), 'd/m/Y H:i'));
								}

								if (vslInfo.atw != null) {
									refs.refCol2ndAtw.getEditor().setValue(Ext.Date.format(new Date(vslInfo.atw), 'd/m/Y H:i'));
									refs.refCol3rdAtw.getEditor().setValue(Ext.Date.format(new Date(vslInfo.atw), 'd/m/Y H:i'));
								}
							}
						}

					}
				}
			});
		}
	},

	onWharfMarkToCalculation: function () {
		var me = this;
		var refs = me.getReferences();
		var loa = 0;
		if (me.jpvcData != null) {
			loa = me.jpvcData.loa;
		}
		refs.txtWharfMarkTo.setValue(Number(refs.txtWharfMarkFm.getValue()) + Number(loa));
	},

	onClearField: function () {
		var me = this;
		var tabRef = me.getActiveTabReference();

		if (tabRef === me.REF_TAB_DBL_BNK) {
			me.initDblBnkJPVCFields();
			me.initShftDblItm('theDoubleBanking');
			me.lookupReference('refCboBankingType').setDisabled(false);

		} else if (tabRef === me.REF_TAB_STS) {
			me.initSTSJPVCFields();
			me.initShftDblItm('theShipToShip');

		} else if (tabRef === me.REF_TAB_VSL_SHFT) {
			me.getViewModel().set({ 'theVesselShifting': me.initVslShftgItem() });

		} else if (tabRef === me.REF_TAB_CG_SHFT) {
			me.initShftDblItm('theCargoShifting');
		}
	},

	initDblBnkJPVCFields: function () {
		this.lookupReference('refTxtJpvcDB').setValue('');
		this.lookupReference('refTxt3rdJpvcDB').setValue('');

		this.lookupReference('refTxt4thJpvcDB').setValue('');
	},

	initSTSJPVCFields: function () {
		var me = this;
		var refs = me.getReferences();
		var selection = refs.refsGridDbBanking.getSelection() == null ? null : refs.refsGridDbBanking.getSelection();
		var dblBnkShip = "";
		if (selection == null) {
			dblBnkShip = "";
		} else {
			dblBnkShip = selection.get('dblBnkShip1');
		}

		this.lookupReference('refTxtNextJpvc').setDisabled(true);
		this.lookupReference('refTxtNextJpvc').setValue(dblBnkShip);
		// this.lookupReference('refTxtNextJpvc').refreshValue();
	},

	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */

	setCUDBtnActive: function (value) {
		var refs = this.getReferences();
		var btnArr = ['refBtnCreate', 'refBtnDelete', 'refBtnClear', 'refBtnSave'];
		for (i = 0; i < btnArr.length; i++) {
			refs[btnArr[i]].setDisabled(!value);
		}
	},

	initShftDblItm: function (type) {
		var newItm = Ext.create('MOST.model.operation.ShiftingDoubleBanking');
		this.getViewModel().set(type, newItm);
	},

	getActiveTabReference: function () {
		return this.lookupReference('tabpnl').getActiveTab().reference;
	},

	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */


	/* HHT TABLET - START
	 * ====================================================
	 * 
	 * DOUBLE BANKING AND SHIP TO SHIP
	 */
	SELECT: "R",
	INSERT: "C",
	UPDATE: "U",
	DELETE: "D",

	TAB_STS: '1',
	TAB_VSLSHT: '2',
	TAB_CGSHT: '3',

	onTblLoad: function () {
		var me = this;
		if (!me.checkGlobalJpvcNo()) {
			return;
		}
		var refs = me.getReferences();

		// var shiftCombo = me.getStore('shiftCombo');
		var bankingTypeCombo = me.getStore('bankingTypeCombo');
		var oprModeCombo = me.getStore('oprModeCombo');
		var hatchListCombo = me.getStore('hatchListCombo');
		var apFpListCombo = me.getStore('apFpListCombo');

		var shiftPositionListCombo = me.getStore('shiftPositionListCombo');
		var reasonListCombo = me.getStore('reasonListCombo');
		var berthsComboStore = me.getStore('berths');
		var shftStyleListCombo = me.getStore('shftStyleListCombo');
		var crewListCombo = me.getStore('crewListCombo');

		var cargoTypeCombo = me.getStore('cgTpAllListCombo');
		var cmdtCombo = me.getStore('cmdtCdAllListCombo');

		cargoTypeCombo.load();
		cmdtCombo.load();

		bankingTypeCombo.load();
		oprModeCombo.load();
		hatchListCombo.load();
		apFpListCombo.load();

		var blSnStore = me.getStore('blSnCombo')
		blSnStore.load({
			params: {
				vslCallId: me.getViewModel().get('globalVesselCallId')
			},
			callback: function (records, operation, success) {
				if (success) {
				}
			}
		});
		me.setDisableControl2nd(true, true, true, true, true, true);
		me.setDisableControl3rd(true, true, true, true, true, true);
		me.setDisableControl4th(true, true, true, true, true, true);
		me.isEdit = false;
		me.setDBankingControlbyMode();

		//by Truc: VesselShifting, CargoShifting
		crewListCombo.load();
		shftStyleListCombo.load();
		shiftPositionListCombo.load();
		reasonListCombo.load();
		berthsComboStore.load();
		me.onTblRetrieve();
	},
	setWorkingShiftDate: function () {
		var me = this;
		var refs = me.getReferences();
		var glbDt = Ext.Date.format(MOST.config.Token.getWorkDate(), 'd/m/Y');
		var glbShft = MOST.config.Token.getWorkShift();
		refs.refWorkingDate.setValue(glbDt);
		refs.refCbxShft.setValue(glbShft);

		me.setDateTimeWithShift(null);
	},

	onTblRetrieve: function () {
		var me = this;
		if (!me.checkGlobalJpvcNo()) {
			return;
		}

		var refs = me.getReferences();
		var vslCallId = me.getViewModel().get('globalVesselCallId').toUpperCase();
		var doubleBankingList = me.getStore('doubleBankingList');
		var stsOperationList = me.getStore('stsOperationList');

		var vslShftList = me.getStore('vslShftList');
		var cgShftList = me.getStore('cgShftList');
		var vslCurrWharftList = me.getStore('vslCurrWharftList');
		var vslShiftingBerthList = me.getStore('vesselShiftingBerthInfoCombo');

		if (!StringUtil.isNullorEmpty(vslCallId)) {
			var sftDblBankingList = me.getStore('sftDblBankingList');
			if (StringUtil.isNullorEmpty(vslCallId)) {
				MessageUtil.warning('warning', 'shiftingdoublebanking_search_jpvc_empty');
				return;
			}
			sftDblBankingList.load({
				params: {
					vslCallId: vslCallId,
					searchType: 'info'
				},
				callback: function (records, operation, success) {
					if (success) {

						me.getViewModel().setData({ vslDetail: records[0].get('vslInfo')[0] });
						me.jpvcData = records[0].get('vslInfo')[0];
						//DoubleBanking,Ship to Ship Tab:
						doubleBankingList.setData(records[0].get('doubleBankingList'));
						stsOperationList.setData(records[0].get('stsOperationList'));
						//VesselShifting/CarogShifting
						vslShftList.setData(records[0].get('vslShftList'));
						cgShftList.setData(records[0].get('crgShftList'));
						vslCurrWharftList.setData(records[0].get('vslCurrWharftList'));
						vslShiftingBerthList.setData(records[0].get('vslShiftingBerthList'));

						doubleBankingList.commitChanges();
						stsOperationList.commitChanges();

						vslShftList.commitChanges();
						cgShftList.commitChanges();
						vslCurrWharftList.commitChanges();
						vslShiftingBerthList.commitChanges();

						me.getViewModel().set('theVslShiftingShiftg', me.initVslShftgItem());
						me.onTblClearDBbanking();
						me.onTblClearSTS();
						me.onClearVslShiftg();
					}
				}
			});
		}
	},

	onTblAddDBbanking: function () {
		var me = this;
		var refs = me.getReferences();
		var dbStore = me.getStore('sftDblBankingList');
		var store = me.getStore('doubleBankingList');
		var validForm = refs.refFrmDBbanking.validate();

		//Check Grid selected:
		var grid = refs.refsGridDbBanking;
		var row = grid.getSelected();
		//		var sltIndex = store.indexOf(row);

		if (!validForm) {
			MessageUtil.warning('warning_msg', 'tbl_dbbanking_missing_require');
			return;
		}
		if (!me.validateDBbankingDateTime()) {
			MessageUtil.warning('Warning', 'tbl_dbbanking_InvalidDT');
			return;
		}
		var isBarge = refs.refCboDBbankingTypeTbl.getValue() === 'BG';
		var isExist2ndATB = refs.refTxtATB.getValue();
		if(isBarge && !isExist2ndATB){
			MessageUtil.warning('Warning', 'Please input ATB for 2nd ship');
			return;
		}
		
		//		var jpvc1 = refs.refTxtJpvcDB.getValue();
		//		var editItem = me.getViewModel().get('theDBbanking');
		//		var currentVsl =  me.getViewModel().get('globalVessel');
		var bkTp = refs.refCboDBbankingTypeTbl.getValue();
		var formatStr = MOST.config.Locale.getDefaultDateFormatWithNoSeconds();

		var masterItem = Ext.create('MOST.model.operation.ShiftingDoubleBanking');

		masterItem.set('searchType', 'doubleBanking');
		masterItem.set('dblBnkDivCd', bkTp);
		masterItem.set('vslCallId', me.getViewModel().get('globalVesselCallId'));
		masterItem.set('atb', Ext.Date.format(me.getViewModel().get('globalAtb'), formatStr));
		masterItem.data.atw = Ext.Date.format(me.getViewModel().get('globalAtw'), formatStr);
		masterItem.data.atc = Ext.Date.format(me.getViewModel().get('globalAtc'), formatStr);
		masterItem.set('atu', Ext.Date.format(me.getViewModel().get('globalAtu'), formatStr));
		masterItem.set('loa', me.getViewModel().get('globalVesselLoa'));
		masterItem.data.stDt = null;
		masterItem.data.endDt = null;

		masterItem.set('dblBnkShip1', refs.refTxtJpvcDB.getValue());
		masterItem.set('ship1Loa', refs.refTxtLOA.getValue());
		masterItem.data.ship1Atb = refs.refTxtATB.getValue(); 
		masterItem.data.ship1Atw = refs.refTxtATW.getValue();
		masterItem.data.ship1Atc = refs.refTxtATC.getValue();
		masterItem.data.ship1Atu = refs.refTxtATU.getValue();
		masterItem.set('ship1AtbDt', Ext.Date.parse(refs.refTxtATB.getValue(), formatStr));
		masterItem.set('ship1AtwDt', Ext.Date.parse(refs.refTxtATW.getValue(), formatStr));
		masterItem.set('ship1AtcDt', Ext.Date.parse(refs.refTxtATC.getValue(), formatStr));
		masterItem.set('ship1AtuDt', Ext.Date.parse(refs.refTxtATU.getValue(), formatStr));

		masterItem.set('dblBnkShip2', refs.refTxt3rdJpvcDB.getValue());
		masterItem.set('ship2Loa', refs.refTxt3rdLOA.getValue());
		masterItem.data.ship2Atb = refs.refTxt3rdATB.getValue();
		masterItem.data.ship2Atw = refs.refTxt3rdATW.getValue();
		masterItem.data.ship2Atc = refs.refTxt3rdATC.getValue();
		masterItem.data.ship2Atu = refs.refTxt3rdATU.getValue();
		masterItem.set('ship2AtbDt', Ext.Date.parse(refs.refTxt3rdATB.getValue(), formatStr));
		masterItem.set('ship2AtwDt', Ext.Date.parse(refs.refTxt3rdATW.getValue(), formatStr));
		masterItem.set('ship2AtcDt', Ext.Date.parse(refs.refTxt3rdATC.getValue(), formatStr));
		masterItem.set('ship2AtuDt', Ext.Date.parse(refs.refTxt3rdATU.getValue(), formatStr));

		masterItem.set('dblBnkShip3', refs.refTxt4thJpvcDB.getValue());
		masterItem.set('ship3Loa', refs.refTxt4thLOA.getValue());
		masterItem.data.ship3Atb = refs.refTxt4thATB.getValue();
		masterItem.data.ship3Atw = refs.refTxt4thATW.getValue();
		masterItem.data.ship3Atc = refs.refTxt4thATC.getValue();
		masterItem.data.ship3Atu = refs.refTxt4thATU.getValue();
		masterItem.set('ship3AtbDt', Ext.Date.parse(refs.refTxt4thATB.getValue(), formatStr));
		masterItem.set('ship3AtwDt', Ext.Date.parse(refs.refTxt4thATW.getValue(), formatStr));
		masterItem.set('ship3AtcDt', Ext.Date.parse(refs.refTxt4thATC.getValue(), formatStr));
		masterItem.set('ship3AtuDt', Ext.Date.parse(refs.refTxt4thATU.getValue(), formatStr));

		masterItem.set('workingStatus', me.INSERT);



		store.insert(0, masterItem);
		me.onSaveTblDbBanking(store);
		//me.onTblRetrieve();
		//		var proxy = masterItem.getProxy();
		//		proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/shifting/doubleBanking';
		//masterItem.save();
		//		MessageUtil.questionModern('tbl_confrm_add','tbl_dbbanking_addnew', null,function(button){
		//			if(button === 'ok'){
		//				masterItem.save({
		//					success: function(){
		//						MessageUtil.saveSuccess();
		//						me.resetData();
		//						dbStore.reload();
		//						if(bkTp === 'BT'){
		//							me.onTblLoadStsInfo(jpvc1);
		//							refs.refTxtNextJpvc.setValue(jpvc1);
		//							dbStore.reload();
		//						}
		//					}
		//				});
		//			}
		//		});

	},
	onTblUpdateDBbanking: function () {
		var me = this;
		var refs = me.getReferences();
		//		var dbStore = me.getStore('sftDblBankingList');
		var store = me.getStore('doubleBankingList');
		var validForm = refs.refFrmDBbanking.validate();

		//Check Grid selected:
		var grid = me.lookupReference('refsGridDbBanking');
		var selection = grid.getSelection();

		if (selection == null) {
			MessageUtil.warning('Warning', 'tbl_dbbanking_select_update');
			return;
		}
		if (!validForm) {
			MessageUtil.warning('Warning', 'tbl_dbbanking_missing_require');
			return;
		}
		if (!me.validateDBbankingDateTime()) {
			MessageUtil.warning('Warning', 'tbl_dbbanking_InvalidDT');
			return;
		}

		var formatStr = MOST.config.Locale.getDefaultDateFormatWithNoSeconds();
		//		var editItem = me.getViewModel().get('theDBbanking');
		//SetData:
		//		editItem.searchType = 'doubleBanking';
		//		editItem.vslCallId = me.getViewModel().get('globalVesselCallId');
		//		editItem.atb = Ext.Date.format(me.getViewModel().get('globalAtb'), formatStr);
		//		editItem.atw = Ext.Date.format(me.getViewModel().get('globalAtw'), formatStr);
		//		editItem.atc = Ext.Date.format(me.getViewModel().get('globalAtc'), formatStr);
		//		editItem.atu = Ext.Date.format(me.getViewModel().get('globalAtu'), formatStr);
		//		editItem.loa = me.getViewModel().get('globalVesselLoa');
		//		editItem.stDt = null;
		//		editItem.endDt = null;
		//		
		//		editItem.ship1Loa = refs.refTxtLOA.getValue();
		//		editItem.ship1Atb = refs.refTxtATB.getValue();
		//		editItem.ship1Atw = refs.refTxtATW.getValue();
		//		editItem.ship1Atc = refs.refTxtATC.getValue();
		//		editItem.ship1Atu = refs.refTxtATU.getValue();
		//		
		//		editItem.ship1Loa = refs.refTxtLOA.getValue();
		//		editItem.ship2Atb = refs.refTxt3rdATB.getValue();
		//		editItem.ship2Atw = refs.refTxt3rdATW.getValue();
		//		editItem.ship2Atc = refs.refTxt3rdATC.getValue();
		//		editItem.ship2Atu = refs.refTxt3rdATU.getValue();
		//		editItem.ship3Atb = refs.refTxt4thATB.getValue();
		//		editItem.ship3Atw = refs.refTxt4thATW.getValue();
		//		editItem.ship3Atc = refs.refTxt4thATC.getValue();
		//		editItem.ship3Atu = refs.refTxt4thATU.getValue();
		//		editItem.userId = MOST.config.Token.getUserId();
		//		editItem.workingStatus = me.UPDATE;

		selection.set('dblBnkShip1', refs.refTxtJpvcDB.getValue());
		selection.set('ship1Loa', refs.refTxtLOA.getValue());
		selection.set('ship1AtbDt', Ext.Date.parse(refs.refTxtATB.getValue(), formatStr));
		selection.set('ship1AtwDt', Ext.Date.parse(refs.refTxtATW.getValue(), formatStr));
		selection.set('ship1AtcDt', Ext.Date.parse(refs.refTxtATC.getValue(), formatStr));
		selection.set('ship1AtuDt', Ext.Date.parse(refs.refTxtATU.getValue(), formatStr));

		selection.set('dblBnkShip2', refs.refTxt3rdJpvcDB.getValue());
		selection.set('ship2Loa', refs.refTxt3rdLOA.getValue());
		selection.set('ship2AtbDt', Ext.Date.parse(refs.refTxt3rdATB.getValue(), formatStr));
		selection.set('ship2AtwDt', Ext.Date.parse(refs.refTxt3rdATW.getValue(), formatStr));
		selection.set('ship2AtcDt', Ext.Date.parse(refs.refTxt3rdATC.getValue(), formatStr));
		selection.set('ship2AtuDt', Ext.Date.parse(refs.refTxt3rdATU.getValue(), formatStr));

		selection.set('dblBnkShip3', refs.refTxt4thJpvcDB.getValue());
		selection.set('ship3Loa', refs.refTxt4thLOA.getValue());
		selection.set('ship3AtbDt', Ext.Date.parse(refs.refTxt4thATB.getValue(), formatStr));
		selection.set('ship3AtwDt', Ext.Date.parse(refs.refTxt4thATW.getValue(), formatStr));
		selection.set('ship3AtcDt', Ext.Date.parse(refs.refTxt4thATC.getValue(), formatStr));
		selection.set('ship3AtuDt', Ext.Date.parse(refs.refTxt4thATU.getValue(), formatStr));

		selection.set('version', me.generateUuid());
		selection.set('workingStatus', me.UPDATE);

		me.onSaveTblDbBanking(store);
		//		var itemArr = new Array();
		//		itemArr.push(editItem);
		//		
		//		var masterItem = Ext.create('MOST.model.operation.ShiftingDoubleBanking');
		//		var proxy = masterItem.getProxy();
		//		proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/shifting/doubleBanking/update';
		//		masterItem.set('newVersion',me.generateUuid());
		//		masterItem.set('cudList', itemArr);
		//		
		//		MessageUtil.questionModern('tbl_confrm_update','tbl_dbbanking_update', null,function(button){
		//			if(button === 'ok'){
		//				masterItem.save({
		//					success: function(){
		//						MessageUtil.saveSuccess();
		//						me.getViewModel().set('theDBbanking',null);
		//						dbStore.reload();
		//					}
		//				});
		//			}
		//		});				
	},

	onTblDeleteDBbanking: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('doubleBankingList');
		//		var dbStore = me.getStore('sftDblBankingList');

		var grid = me.lookupReference('refsGridDbBanking');

		//Check Grid selected:
		var record = grid.getSelection();
		if (record == null) {
			MessageUtil.warning('Warning', 'tbl_dbbanking_select_delete');
			return;
		}
		//		var editItem = me.getViewModel().get('theDBbanking');
		//		//SetData:
		//		editItem.searchType = 'doubleBanking';
		//		editItem.vslCallId = me.getViewModel().get('globalVesselCallId');
		//		editItem.userId = MOST.config.Token.getUserId();
		//		editItem.workingStatus = me.DELETE;
		//		var itemArr = new Array();
		//		itemArr.push(editItem);
		//		
		//		var masterItem = Ext.create('MOST.model.operation.ShiftingDoubleBanking');
		//		var proxy = masterItem.getProxy();
		//		proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/shifting/list';
		//		masterItem.set('newVersion',me.generateUuid());
		//		masterItem.set('cudList', itemArr);
		//		
		//		MessageUtil.questionModern('tbl_confrm_delete','tbl_dbbanking_delete', null,function(button){
		//			if(button === 'ok'){
		//				masterItem.save({
		//					success: function(){
		//						MessageUtil.saveSuccess();
		//						me.resetData();
		//						dbStore.reload();
		//					}
		//				});
		//			}
		//		});

		//		var searchType;
		//		var sendArray = [];

		//		var currTab = me.getActiveTabReference();
		//		var sftDblBankingList = me.getStore('sftDblBankingList');		
		//		var cudData = Ext.create('MOST.model.operation.ShiftingDoubleBanking');
		//
		//		grid = refs.refsGridDbBanking;
		//		searchType = 'doubleBanking';					
		//		var doubleBankingList = me.getStore('doubleBankingList');

		MessageUtil.questionModern('tbl_confrm_delete', 'tbl_dbbanking_delete', null, function (button) {
			if (button === 'ok') {
				store.remove(record);
				store.sync({
					success: function () {
						MessageUtil.saveSuccess();
						me.onTblRetrieve();

						// double banking
						//						var record = Ext.create('MOST.model.operation.ShiftingDoubleBanking');
						//						record.set('workingStatus', WorkingStatus.INSERT);
						//						me.getViewModel().set('theDoubleBanking',  record);
						//						
						//						refs.refTxtJpvcDB.setValue('');
						//						refs.refTxt3rdJpvcDB.setValue('');
						//						refs.refCboBankingType.setDisabled(false);
						//						refs.refCboBankingType.setValue('');
					}
				});

			}
		});

		return;
	},

	onSaveTblDbBanking: function (store) {
		var me = this;
		for (var i = 0; i < store.getModifiedRecords().length; i++) {
			var record = store.getModifiedRecords()[i];
			if (!StringUtil.isNullorEmpty(record.get('workingStatus'))) {

				//				if (!record.get('dblBnkDivCd')) {
				//					MessageUtil.info('info_msg', 'ShftDblBankNoneType');
				//					return;
				//				}
				//
				//				if (record.get('dblBnkDivCd') === 'BT' || record.get('dblBnkDivCd') === 'BG') {
				//					if (!record.get('dblBnkShip1')) {
				//						MessageUtil.warning('warning_msg', 'mandatoryField_msg', '2nd Jpvc');
				//						return;
				//					}
				//				} else if (record.get('dblBnkDivCd') === 'TG') {
				//					if (!record.get('ship1Loa')) {
				//						MessageUtil.warning('warning_msg', 'mandatoryField_msg', '2nd Loa');
				//						return;
				//					}
				//				} else if (record.get('dblBnkDivCd') === 'TA') {
				//					if (!record.get('ship1Loa')) {
				//						MessageUtil.warning('warning_msg', 'mandatoryField_msg', '2nd Loa');
				//						return;
				//					}
				//				} else if (record.get('dblBnkDivCd') === 'TR') {
				//					if (!record.get('ship1Loa')) {
				//						MessageUtil.warning('warning_msg', 'mandatoryField_msg', '2nd Loa');
				//						return;
				//					}
				//					if (!record.get('ship1Atu')) {
				//						MessageUtil.warning('warning_msg', 'mandatoryField_msg', '2nd Atu');
				//						return;
				//					}
				//					if (!record.get('dblBnkShip2')) {
				//						MessageUtil.warning('warning_msg', 'mandatoryField_msg', '2nd Jpvc');
				//						return;
				//					}
				//					if (!record.get('ship2Loa')) {
				//						MessageUtil.warning('warning_msg', 'mandatoryField_msg', '3nd Loa');
				//						return;
				//					}
				//					if (!record.get('ship2Atb')) {
				//						MessageUtil.warning('warning_msg', 'mandatoryField_msg', '3nd Atb');
				//						return;
				//					}
				//				} else if (record.get('dblBnkDivCd') === 'VL') {
				//					if (!record.get('dblBnkShip1')) {
				//						MessageUtil.warning('warning_msg', 'mandatoryField_msg', '2nd Jpvc');
				//						return;
				//					}
				//				}

				record.set('stDtNoSecond', record.get('stDt'));
				record.set('endDtNoSecond', record.get('endDt'));
				record.set('ship1AtbNoSecond', record.get('ship1Atb'));
				record.set('ship1AtwNoSecond', record.get('ship1Atw'));
				record.set('ship1AtcNoSecond', record.get('ship1Atc'));
				record.set('ship1AtuNoSecond', record.get('ship1Atu'));
				record.set('ship2AtbNoSecond', record.get('ship2Atb'));
				record.set('ship2AtwNoSecond', record.get('ship2Atw'));
				record.set('ship2AtcNoSecond', record.get('ship2Atc'));
				record.set('ship2AtuNoSecond', record.get('ship2Atu'));
				record.set('prevAtbNoSecond', record.get('prevAtb'));
				record.set('prevAtuNoSecond', record.get('prevAtu'));
				record.set('atuDtNoSecond', record.get('atuDt'));
				record.set('atbDtNoSecond', record.get('atbDt'));
				record.set('ataDtNoSecond', record.get('ataDt'));
				record.set('atwNoSecond', record.get('atwNo'));
				record.set('atcNoSecond', record.get('atcNo'));

				record.set('ship3AtbNoSecond', record.get('ship3Atb'));
				record.set('ship3AtwNoSecond', record.get('ship3Atw'));
				record.set('ship3AtcNoSecond', record.get('ship3Atc'));
				record.set('ship3AtuNoSecond', record.get('ship3Atu'));
				record.set('scn', me.getViewModel().get('theVessel').scn)
				var proxy = record.getProxy();
				proxy.url = store.getProxy().url;
				record.save({
					callback: function (record, operation, success) {
						if (success) {
							saveSuccess = true;
							MessageUtil.saveSuccess();
							me.onTblRetrieve()
						}
					}
				});
			}
		}
	},

	onTblClickDBJPVC2nd: function (field, button, e) {
		var me = this;
		var refs = me.getReferences();
		var params = {

		};
		if (field.getDisabled()) {
			return;
		}
		me.openCodePopup('app-jpvcpopuphht', 'refTxtJpvcDB', params);
	},
	onTblClickDBJPVC3rd: function (field, button, e) {
		var me = this;
		var refs = me.getReferences();
		var params = {

		};
		if (field.getDisabled()) {
			return;
		}
		me.openCodePopup('app-jpvcpopuphht', 'refTxt3rdJpvcDB', params);
	},
	onTblClearDBbanking: function () {
		var me = this;
		var refs = me.getReferences();
		me.setDisableControl2nd(true, true, true, true, true, true);
		me.setDisableControl3rd(true, true, true, true, true, true);
		me.getViewModel().set('theDBbanking', null);
		me.isEdit = false;
		me.setDBankingControlbyMode();
	},
	onTblCbxBankingTpChange: function (refsCbx) {
		var me = this;
		var value = refsCbx.getValue();
		me.setDisableVesselDbBkControl(refsCbx);
		me.setMandatoryBankingType(value);
		if (!me.isEdit) {
			me.setDefaultVesselbyBankingType(value);
		}
	},
	onTblSglTabDbbkGrid(ctl, location, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refsGridDbBanking;
		var selected = grid.getSelection();

		if (selected == null) {//Deselect
			me.getViewModel().set('theDBbanking', null);
			return;
		}
		me.getViewModel().set('theDBbanking', selected);
		me.bindDoubleBankingManual(selected);
		me.isEdit = true;//Edit mode
		me.setDBankingControlbyMode(); // set button Add Update Delete
	},

	bindDoubleBankingManual: function (selection) {
		var me = this;
		var refs = me.getReferences();
		if (selection) {
			refs.refTxtATB.setValue(selection.get('ship1Atb'));
			refs.refTxtATW.setValue(selection.get('ship1Atw'));
			refs.refTxtATC.setValue(selection.get('ship1Atc'));
			refs.refTxtATU.setValue(selection.get('ship1Atu'));

			refs.refTxt3rdATB.setValue(selection.get('ship2Atb'));
			refs.refTxt3rdATW.setValue(selection.get('ship2Atw'));
			refs.refTxt3rdATC.setValue(selection.get('ship2Atc'));
			refs.refTxt3rdATU.setValue(selection.get('ship2Atu'));

			refs.refTxt4thATB.setValue(selection.get('ship3Atb'));
			refs.refTxt4thATW.setValue(selection.get('ship3Atw'));
			refs.refTxt4thATC.setValue(selection.get('ship3Atc'));
			refs.refTxt4thATU.setValue(selection.get('ship3Atu'));
		}
	},

	setDBankingControlbyMode: function () { //Set by create or update
		var me = this;
		var refs = me.getReferences();
		refs.refCboDBbankingTypeTbl.setReadOnly(me.isEdit);
		refs.refCboDBbankingTypeTbl.setDisabled(me.isEdit);
		refs.refBtnDBAdd.setDisabled(me.isEdit);
		refs.refBtnDBUpdate.setDisabled(!me.isEdit);
		refs.refBtnDBDelete.setDisabled(!me.isEdit);
		if (!me.isEdit) {//Add mode
			refs.refCboDBbankingTypeTbl.setValue('');
			refs.refsGridDbBanking.setSelection(me.isEdit); //remove selection when add mode
		}
	},
	setDefaultVesselbyBankingType: function (bankingTP) {
		var me = this;
		var refs = me.getReferences();
		me.resetData();
		if (bankingTP === 'TG' || bankingTP === 'TA') {
			//2nd JPVC:
			var JPVC = me.getViewModel().get('globalVesselCallId');
			var ATB = me.getViewModel().get('globalAtb');
			var ATW = me.getViewModel().get('globalAtw');
			var ATC = me.getViewModel().get('globalAtc');
			var ATU = me.getViewModel().get('globalAtu');
			refs.refTxtJpvcDB.setValue(JPVC);
			refs.refTxtATB.setValue(ATB);
			refs.refTxtATW.setValue(ATW);
			refs.refTxtATC.setValue(ATC);
			refs.refTxtATU.setValue(ATU);
		}
		if (bankingTP === 'TR') {
			//2nd JPVC:
			var JPVC = me.getViewModel().get('globalVesselCallId');
			var ATB = me.getViewModel().get('globalAtb');
			var ATW = me.getViewModel().get('globalAtw');
			var ATC = me.getViewModel().get('globalAtc');
			var ATU = me.getViewModel().get('globalAtu');
			refs.refTxtJpvcDB.setValue(JPVC);
			refs.refTxtATB.setValue(ATB);
			refs.refTxtATW.setValue(ATW);
			refs.refTxtATC.setValue(ATC);
			refs.refTxtATU.setValue(ATU);
			//3rd JPVC:
			refs.refTxt3rdJpvcDB.setValue(JPVC);
			refs.refTxt3rdATB.setValue(ATB);
			refs.refTxt3rdATW.setValue(ATW);
			refs.refTxt3rdATC.setValue(ATC);
			refs.refTxt3rdATU.setValue(ATU);
		}
	},
	set2ndJPVCTblDBbanking: function () {
		var me = this;
		var refs = me.getReferences();
		var bkTp = refs.refCboDBbankingTypeTbl.getValue();
		if (bkTp === 'BT' || bkTp === 'VL' || bkTp === 'BG') { //set 
			var {atb, atw, atc, atu} = me.jpvcData
			var formatStr = MOST.config.Locale.getDefaultDateFormatWithNoSeconds(); 
			var vslAtb = atb ? Ext.Date.format(new Date(atb), formatStr) : null
			var vslAtw = atw ? Ext.Date.format(new Date(atw), formatStr) : null
			var vslAtc = atc ? Ext.Date.format(new Date(atc), formatStr) : null
			var vslAtu = atu ? Ext.Date.format(new Date(atu), formatStr) : null
			refs.refTxtJpvcDB.setValue(me.jpvcData.vslCallId);
			refs.refTxtLOA.setValue(me.jpvcData.loa); 
			refs.refTxtATB.setValue(vslAtb);
			refs.refTxtATW.setValue(vslAtw);
			refs.refTxtATC.setValue(vslAtc);
			refs.refTxtATU.setValue(vslAtu);
			if (bkTp === 'BT') {
				//3rd:
				refs.refTxt3rdJpvcDB.setValue(me.jpvcData.vslCallId);
				refs.refTxt3rdLOA.setValue(me.jpvcData.loa);
				refs.refTxt3rdATB.setValue(vslAtb);
				refs.refTxt3rdATW.setValue(vslAtw);
				refs.refTxt3rdATC.setValue(vslAtc);
				refs.refTxt3rdATU.setValue(vslAtu);
			}
		}
	},
	set3rdJPVCTblDBbanking: function () {
		var me = this;
		var refs = me.getReferences();
		refs.refTxt3rdJpvcDB.setValue(me.thirdJpvcData.vslCallId);
		refs.refTxt3rdLOA.setValue(me.thirdJpvcData.loa);
		refs.refTxt3rdATB.setValue(me.thirdJpvcData.atb);
		refs.refTxt3rdATW.setValue(me.thirdJpvcData.atw);
		refs.refTxt3rdATC.setValue(me.thirdJpvcData.atc);
		refs.refTxt3rdATU.setValue(me.thirdJpvcData.atu);
	},
	resetData: function () {
		var me = this;
		var refs = me.getReferences();
		refs.refTxtJpvcDB.setValue('');
		refs.refTxtLOA.setValue('');
		refs.refTxtATB.setValue('');
		refs.refTxtATW.setValue('');
		refs.refTxtATC.setValue('');
		refs.refTxtATU.setValue('');

		refs.refTxt3rdJpvcDB.setValue('');
		refs.refTxt3rdLOA.setValue('');
		refs.refTxt3rdATB.setValue('');
		refs.refTxt3rdATW.setValue('');
		refs.refTxt3rdATC.setValue('');
		refs.refTxt3rdATU.setValue('');

		refs.refsGridDbBanking.setSelection(false);
	},

	/*
	 * SHIP TO SHIP (STS) =============================================
	 * START:
	 * */

	//Search Package Type:
	onSearchPkgTpSTSHHT: function (refBtn) {
		var me = this;
		var targetCtl = '';
		var title = 'Package Type';
		var params = '';
		if (refBtn.reference === 'refTxtPkgTpSTS') {
			targetCtl = 'refTxtPkgTpSTS';
			params = {
				title: title,
				searchType: 'COMM',
				searchMcd: 'PKGTP',
				searchLcd: 'MT',
			};
		}
		if (params && targetCtl) {
			ViewUtil.openCodePopup(this, 'app-commoncodepopuphht', targetCtl, params);
		}
	},
	
	
	onTblSelectSTSGrid: function (clt, selected, eOpts) {
		if(this.previousSTSSelection && (selected.id == this.previousSTSSelection.id)) return;
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refGridTblSTS;
		var selected = grid.getSelection();
		this.previousSTSSelection = selected
		if (selected == null || selected.length == 0) {
			me.getViewModel().set('theTblSTS', null);
			return;
		}
		var selectedRow = selected.getData();

		//testing
		var cgTpListCombo = me.getStore('cgTpListCombo');
		var cmdtCdListCombo = me.getStore('cmdtCdListCombo');
		var amountByOPRModeList = me.getStore('amountByOPRModeList');
		cgTpListCombo.removeAll();
		cmdtCdListCombo.removeAll();
		amountByOPRModeList.removeAll();

		cgTpListCombo.commitChanges();
		cmdtCdListCombo.commitChanges();
		amountByOPRModeList.commitChanges();

		refs.refCboCgTP.reset();
		refs.refCboCmdtCd.reset();
		refs.refTxtActMt.reset();
		refs.refTxtActM3.reset();
		refs.refTxtActQty.reset();
		refs.refCboOpeMode.reset();
		me.onTblLoadStsInfo(selected.getData().nextCalCallId, selectedRow);

		//set Enanble Button
		var isCreate = false;
		me.setSTSControlByMode(isCreate);
	},

	//Load detail STS base on NextJPVC
	onTblLoadStsInfo: function (jpvc, selctedRow) {
		var me = this;
		var refs = me.getReferences();
		var stsInfo = me.getStore('stsInfo');
		var cgTpListCombo = me.getStore('cgTpListCombo');
		var cmdtCdListCombo = me.getStore('cmdtCdListCombo');
		var amountByOPRModeList = me.getStore('amountByOPRModeList');

		stsInfo.load({
			params: {
				searchType: 'stsInfo',
				vslCallId: jpvc
			},
			callback: function (records, success) {
				if (success) {
					cmdtCdListCombo.setData(records[0].get('commodityList'));
					cgTpListCombo.setData(records[0].get('cargoList'));
					amountByOPRModeList.setData(records[0].get('amountByOPRModeList'));
					me.setValueFromSTSGrid(selctedRow);
				}
			}
		})
	},


	//Handle Button Envent:
	onTblClearSTS: function () {
		var me = this;
		var refs = me.getReferences();
		var cgTpListCombo = me.getStore('cgTpListCombo');
		var cmdtCdListCombo = me.getStore('cmdtCdListCombo');
		var cgTpAllListCombo = me.getStore('cgTpAllListCombo');
		var cmdtCdAllListCombo = me.getStore('cmdtCdAllListCombo');

		var grid = refs.refGridTblSTS;
		grid.setSelection(false);
		me.getViewModel().set('theTblSTS', null);

		refs.refFrmDetail.reset();
		cgTpAllListCombo.clearFilter();
		cmdtCdAllListCombo.clearFilter();
		cgTpAllListCombo.commitChanges();
		cmdtCdAllListCombo.commitChanges();
		this.previousSTSSelection = null;

		var isCreate = true;
		me.setSTSControlByMode(isCreate);
		// me.setDateTimeWithShift(me.TAB_STS);
	},

	setDateTimeWithShift: function (tab) {
		var me = this;
		var refs = me.getReferences();

		var shift = refs.refCbxShft.getSelection();
		var strWKDate = Ext.Date.format(refs.refWorkingDate.getValue(), 'd/m/Y');
		var strStartDt = strWKDate + ' ' + shift.get('fmHhmm').substr(0, 2) + ':' + shift.get('fmHhmm').substr(2, 4);
		var strEndDt = strWKDate + ' ' + shift.get('toHhmm').substr(0, 2) + ':' + shift.get('toHhmm').substr(2, 4);

		if (shift.get('shftId') === 'SF0013') {
			var temp = Ext.Date.parse(strEndDt, 'd/m/Y H:i');
			var endShftDTime = new Date(temp.getTime() + (24 * 60 * 60 * 1000));
			strEndDt = Ext.Date.format(endShftDTime, 'd/m/Y H:i');
		}

		switch (tab) {
			case me.TAB_STS:
				refs.refDtStDtSTS.setValue(strStartDt);
				refs.refDtEndDtSTS.setValue(strEndDt);
				break;
			case me.TAB_CGSHT:
				refs.refStartTimeCgShiftfield.setValue(strStartDt);
				refs.refEndTimeCgShiftfield.setValue(strEndDt);
				break;
			default:
				refs.refDtStDtSTS.setValue(strStartDt);
				refs.refDtEndDtSTS.setValue(strEndDt);
				refs.refStartTimeCgShiftfield.setValue(strStartDt);
				refs.refEndTimeCgShiftfield.setValue(strEndDt);
				break;
		}

	},

	onTblUpdateSTS: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('stsOperationList');
		var grid = me.lookupReference('refGridTblSTS');
		var selection = grid.getSelection();
		var validForm = refs.refFrmDetail.validate();
		var formatStr = MOST.config.Locale.getDefaultDateFormatWithNoSeconds();
		//		var dbStore = me.getStore('sftDblBankingList');

		if (selection == null) {
			MessageUtil.warning('Warning', 'tbl_sts_select_update');
			return;
		}
		if (!validForm) {
			MessageUtil.warning('Warning', 'tbl_sts_missing_require');
			return;
		}
		if (!me.validateSTSDateTime()) {
			MessageUtil.warning('Warning', 'tbl_sts_InvalidDT');
			return;
		}

		//		var editItem = me.getViewModel().get('theTblSTS');
		//		//SetData:
		//		editItem.searchType = 'stsOperation';
		//		editItem.vslCallId = me.getViewModel().get('globalVesselCallId');
		//		editItem.stDt = refs.refDtStDtSTS.getValue();
		//		editItem.endDt = refs.refDtEndDtSTS.getValue();;
		//		editItem.userId = MOST.config.Token.getUserId();
		//
		//		editItem.mt = refs.refTxtActMt.getValue();
		//		editItem.m3 = refs.refTxtActM3.getValue();
		//		editItem.qty = refs.refTxtActQty.getValue();
		//
		//		editItem.workingStatus = me.UPDATE;
		//		
		//		var itemArr = new Array();
		//		itemArr.push(editItem);
		//		
		//		var masterItem = Ext.create('MOST.model.operation.ShiftingDoubleBanking');
		//		var proxy = masterItem.getProxy();
		//		proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/shifting/list';
		//		masterItem.set('newVersion',me.generateUuid());
		//		masterItem.set('cudList', itemArr);
		//		
		//		MessageUtil.questionModern('tbl_confrm_update','tbl_sts_update', null,function(button){
		//			if(button === 'ok'){
		//				masterItem.save({
		//					success: function(){
		//						MessageUtil.saveSuccess();
		//						me.resetData();
		//						dbStore.reload();
		//					}
		//				});
		//			}
		//		});
		var opeMode = refs.refCboOpeMode.getValue()
		selection.set('nextCalCallId', refs.refTxtNextJpvc.getValue());
		selection.set('stsOpTp', refs.refCboOpeMode.getValue());
		selection.set('cgTpCd', refs.refCboCgTP.getValue());
		selection.set('hatchNo', refs.refCboHatch.getValue());
		selection.set('hatchDrtCd', refs.refCboAPHatch.getValue());
		selection.set('cmdtCd', refs.refCboCmdtCd.getValue());
		selection.set('pkgTpCd', refs.refTxtPkgTpSTS.getValue());
		selection.set('stDate', Ext.Date.parse(refs.refDtStDtSTS.getValue(), formatStr));
		selection.set('endDate', Ext.Date.parse(refs.refDtEndDtSTS.getValue(), formatStr));
		selection.set('mt', refs.refTxtActMt.getValue());
		selection.set('m3', refs.refTxtActM3.getValue());
		selection.set('qty', refs.refTxtActQty.getValue());
		selection.set('version', me.generateUuid());
		selection.set('workingStatus', me.UPDATE);
		var blSnNo = refs.refBlSNCombo.getValue();
		if(opeMode === 'DS'){
			selection.set('blNo', blSnNo)
		}else if(opeMode === 'LD'){
			selection.set('snNo', blSnNo)
		}
		me.onSaveTblDbBanking(store);
	},

	onTblAddSTS: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('stsOperationList');
		var validForm = refs.refFrmDetail.validate();

		//Validate: required field, fromTime ToTime 
		if (!validForm) {
			MessageUtil.warning('Warning', 'tbl_sts_missing_require');
			return;
		}
		if (!me.validateSTSDateTime()) {
			return;
		}

		//		var editItem = me.getViewModel().get('theTblSTS');
		//		//SetData:
		//		editItem.searchType = 'stsOperation';
		//		editItem.vslCallId = me.getViewModel().get('globalVesselCallId');
		//		editItem.nextCalCallId = refs.refTxtNextJpvc.getValue();
		//		editItem.stsOpTp = refs.refCboOpeMode.getValue();
		//		editItem.cgTpCd = refs.refCboCgTP.getValue();
		//		editItem.stDt = refs.refDtStDtSTS.getValue();
		//		editItem.endDt = refs.refDtEndDtSTS.getValue();
		//		editItem.userId = MOST.config.Token.getUserId();
		//
		//		editItem.mt = refs.refTxtActMt.getValue();
		//		editItem.m3 = refs.refTxtActM3.getValue();
		//		editItem.qty = refs.refTxtActQty.getValue();
		//
		//		editItem.workingStatus = me.INSERT;
		//		
		//		var itemArr = new Array();
		//		itemArr.push(editItem);

		var masterItem = Ext.create('MOST.model.operation.ShiftingDoubleBanking');
		var formatStr = MOST.config.Locale.getDefaultDateFormatWithNoSeconds();
		var opeMode = refs.refCboOpeMode.getValue()
		masterItem.set('searchType', 'stsOperation');
		masterItem.set('vslCallId', me.getViewModel().get('globalVesselCallId'));
		masterItem.set('workingStatus', me.INSERT);
		// masterItem.set('version', me.generateUuid());
		masterItem.set('userId', MOST.config.Token.getUserId());

		masterItem.set('nextCalCallId', refs.refTxtNextJpvc.getValue());
		masterItem.set('stsOpTp', opeMode);
		masterItem.set('cgTpCd', refs.refCboCgTP.getValue());
		masterItem.set('hatchNo', refs.refCboHatch.getValue());
		masterItem.set('hatchDrtCd', refs.refCboAPHatch.getValue());
		masterItem.set('cmdtCd', refs.refCboCmdtCd.getValue());
		masterItem.set('pkgTpCd', refs.refTxtPkgTpSTS.getValue());
		masterItem.data.stDt = refs.refDtStDtSTS.getValue();
		masterItem.set('stDate', Ext.Date.parse(refs.refDtStDtSTS.getValue(), formatStr));
		masterItem.data.endDt = refs.refDtEndDtSTS.getValue();
		masterItem.set('endDate', Ext.Date.parse(refs.refDtEndDtSTS.getValue(), formatStr));
		masterItem.set('mt', refs.refTxtActMt.getValue());
		masterItem.set('m3', refs.refTxtActM3.getValue());
		masterItem.set('qty', refs.refTxtActQty.getValue());
		var blSnNo = refs.refBlSNCombo.getValue()
		if(opeMode === 'DS'){
			masterItem.set('blNo', blSnNo)
		}else if(opeMode === 'LD'){
			masterItem.set('snNo', blSnNo)
		}
		store.insert(0, masterItem);
		me.onSaveTblDbBanking(store);
		refs.refFrmDetail.reset();
		me.onTblClearSTS()
		//proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/shifting/list';
		//masterItem.set('cudList', itemArr);

		//		MessageUtil.questionModern('tbl_confrm_add','tbl_sts_addnew', null,function(button){
		//			if(button === 'ok'){
		//				masterItem.save({
		//					success: function(){
		//						MessageUtil.saveSuccess();
		//						me.resetData();
		//						dbStore.reload();
		//					}
		//				});
		//			}
		//		});	
	},
	onTblDeleteSTS: function () {
		var me = this;
		var refs = me.getReferences();
		//		var dbStore = me.getStore('sftDblBankingList');
		var store = me.getStore('stsOperationList');
		var grid = me.lookupReference('refGridTblSTS');

		//Check Grid selected:
		var record = grid.getSelection();
		if (record == null) {
			MessageUtil.warning('Warning', 'tbl_sts_select_delete');
			return;
		}

		//		var editItem = me.getViewModel().get('theTblSTS');
		//		//SetData:
		//		editItem.searchType = 'stsOperation';
		//		editItem.vslCallId = me.getViewModel().get('globalVesselCallId');
		//		editItem.userId = MOST.config.Token.getUserId();
		//		editItem.workingStatus = me.DELETE;
		//		var itemArr = new Array();
		//		itemArr.push(editItem);
		//		
		//		var masterItem = Ext.create('MOST.model.operation.ShiftingDoubleBanking');
		//		var proxy = masterItem.getProxy();
		//		proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/shifting/list';
		//		masterItem.set('newVersion',me.generateUuid());
		//		masterItem.set('cudList', itemArr);
		//		
		//		MessageUtil.questionModern('tbl_confrm_delete','tbl_sts_delete', null,function(button){
		//			if(button === 'ok'){
		//				masterItem.save({
		//					success: function(){
		//						MessageUtil.saveSuccess();
		//						me.resetData();
		//						dbStore.reload();
		//					}
		//				});
		//			}
		//		});

		MessageUtil.questionModern('tbl_confrm_delete', 'tbl_sts_delete', null, function (button) {
			if (button === 'ok') {
				store.remove(record);
				store.sync({
					success: function () {
						MessageUtil.saveSuccess();
						me.onTblRetrieve();

						// double banking
						//						var record = Ext.create('MOST.model.operation.ShiftingDoubleBanking');
						//						record.set('workingStatus', WorkingStatus.INSERT);
						//						me.getViewModel().set('theDoubleBanking',  record);
						//						
						//						refs.refTxtJpvcDB.setValue('');
						//						refs.refTxt3rdJpvcDB.setValue('');
						//						refs.refCboBankingType.setDisabled(false);
						//						refs.refCboBankingType.setValue('');
					}
				});

			}
		});

		return;
	},
	setDocAmountStsHHT: function () {
		var me = this;
		var refs = me.getReferences();
		var amountByOPRModeList = me.getStore('amountByOPRModeList');
		var opeType = refs.refCboOpeMode.getValue();
		var cgType = refs.refCboCgTP.getValue();
		var opeMode = '';

		if (opeType == 'DS') {
			opeMode = 'SD';
		} else if (opeType == 'LD') {
			opeMode = 'SL';
		} else
			return;
		amountByOPRModeList.clearFilter();
		amountByOPRModeList.filterBy(function (record, id) {
			if (record.get('cgOptTpCd') == opeMode && record.get('cgTpCd') == cgType) {
				return record;
			}
		});
		if (amountByOPRModeList.getData().items.length > 0) {
			var filterData = amountByOPRModeList.getData().items[0];

			refs.refTxtDocMt.setValue(filterData.get('mt'));
			refs.refTxtDocM3.setValue(filterData.get('m3'));
			refs.refTxtDocQty.setValue(filterData.get('qty'));

		} else {
			refs.refTxtDocMt.setValue(0);
			refs.refTxtDocM3.setValue(0);
			refs.refTxtDocQty.setValue(0);
		}
	},


	onTblSelectOpeMode: function (field, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var blSnCbStore = me.getStore('blSnCombo')
		refs.refCboCgTP.reset();
		refs.refTxtDocMt.setValue(0);
		refs.refTxtDocM3.setValue(0);
		refs.refTxtDocQty.setValue(0);
		if(newValue){
			refs.refBlSNCombo.setDisabled(false)
		}

		blSnCbStore.clearFilter();
		blSnCbStore.filterBy(function (record, id) {
			if(newValue === 'DS' && record.get('catgCd') == 'I'){
				return record;
			}else if(newValue === 'LD' && record.get('catgCd') == 'E'){
				return record;
			}
		});
	},
	onTblSelectBlSn: function (field, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var blSNComboStore = me.getStore('blSnCombo')
		var sltedBlSn = blSNComboStore.getAt(blSNComboStore.findExact('blNoSnNo', newValue));
		if(sltedBlSn){
			refs.refCboCmdtCd.setValue(sltedBlSn.data.cmdtCd)
			refs.refCboCgTP.setValue(sltedBlSn.data.cgTpCd)
			refs.refTxtPkgTpSTS.setValue(sltedBlSn.data.pkgTpCd)
		}
	},
	onTblSelectCargoType: function (field, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();

		var opeType = refs.refCboOpeMode.getValue();
		var cgType = refs.refCboCgTP.getValue();

		if (opeType && cgType) {
			me.setDocAmountStsHHT();
			me.clearAllAmount()
		}
	},
	clearAllAmount: function() {
		var me = this;
		var refs = me.getReferences();

		refs.refTxtActMt.reset()
		refs.refTxtActM3.reset()
		refs.refTxtActQty.reset()
		// refs.refTxtBalMt.setValue(0)
		// refs.refTxtBalM3.setValue(0)
		// refs.refTxtBalQty.setValue(0)
	},
	onActAmtChange: function (clt, newValue, oldValue, eOpts) {
		var me = this;
		//var errMsg = "";
		var refs = me.getReferences();

		if (clt.reference === 'refTxtActMt') {
			var balMT = refs.refTxtDocMt.getValue() - refs.refTxtActMt.getValue();
			//			if(balMT < 0){
			//				clt.setValue(refs.refTxtDocMt.getValue());
			//			    return;
			//		    }
			refs.refTxtBalMt.setValue(balMT);
		}
		//		else if(clt.reference === 'refTxtActM3'){
		//			var balM3 = refs.refTxtDocM3.getValue() - refs.refTxtActM3.getValue();
		//			if(balM3 < 0){
		//				clt.setValue(refs.refTxtDocM3.getValue());
		//			    return;
		//		    }
		//		    refs.refTxtBalM3.setValue(balM3);
		//		}else if(clt.reference === 'refTxtActQty'){
		//			var balQty = refs.refTxtDocQty.getValue() - refs.refTxtActQty.getValue();
		//			if(balQty < 0){
		//				clt.setValue(refs.refTxtDocQty.getValue());
		//			    return;
		//		    }
		//		    refs.refTxtBalQty.setValue(balQty);
		//		}
	},

	onActAm3Change: function (clt, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();

		if (clt.reference === 'refTxtActM3') {
			var balM3 = refs.refTxtDocM3.getValue() - refs.refTxtActM3.getValue();
			refs.refTxtBalM3.setValue(balM3);
		}
	},

	onActAQtyChange: function (clt, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		if (clt.reference === 'refTxtActQty') {
			var balQty = refs.refTxtDocQty.getValue() - refs.refTxtActQty.getValue();
			refs.refTxtBalQty.setValue(balQty);
		}
	},

	validateSTSDateTime: function () {
		var me = this;
		var refs = me.getReferences();
		var frmStDt = Ext.Date.parse(refs.refDtStDtSTS.getValue(), 'd/m/Y H:i');
		var strEndDt = Ext.Date.parse(refs.refDtEndDtSTS.getValue(), 'd/m/Y H:i');
		if (frmStDt >= strEndDt) {
			MessageUtil.warning('Warning', 'tbl_sts_InvalidDT');
			return false;
		}
		return true;
	},

	setSTSControlByMode(value) {
		var me = this;
		var refs = me.getReferences();
		refs.refBtnSTSAdd.setDisabled(!value);
		refs.refBtnSTSUpdate.setDisabled(value);
		refs.refBtnSTSDelete.setDisabled(value);

	},

	/* Bind data to detai when click record on grid */
	setValueFromSTSGrid: function (selectedData) {
		var me = this;
		var refs = me.getReferences();
		if (!selectedData) {
			return;
		}
		me.getViewModel().set('theTblSTS', selectedData);
		var blSnNo = selectedData.blNo ? selectedData.blNo : selectedData.snNo
		refs.refCboOpeMode.setValue(selectedData.stsOpTp);
		refs.refCboCgTP.setValue(selectedData.cgTpCd);
		refs.refCboCmdtCd.setValue(selectedData.cmdtCd);
		refs.refDtStDtSTS.setValue(selectedData.stDt);
		refs.refDtEndDtSTS.setValue(selectedData.endDt);
		refs.refBlSNCombo.setValue(blSnNo);

		me.bindSTSManual(selectedData);
	},

	bindSTSManual: function (selectedData) {
		var me = this;
		var refs = me.getReferences();
		if (selectedData) {
			refs.refTxtActMt.setValue(selectedData.mt);
			refs.refTxtActM3.setValue(selectedData.m3);
			refs.refTxtActQty.setValue(selectedData.qty);
		}
	},

	/* END STS
	 * */





	/* HHT TABLET - HANDLE EVENT - END
	 * ====================================================
	 */

	/*
	 * GENERATE FUNCTION
	 * */

	/*
		Vessel				VL
		Barge/Tug			BT
		Tug					TG
		Tug Replacement		TR
		Tug Alongside		TA
		
		
	*/
	setMandatoryBankingType: function (bkTp) {
		var me = this;
		var refs = me.getReferences();
		var jpvc = loa = atb = atw = atc = atu = jpvc2 = loa2 = atb2 = atw2 = atc2 = atu2 = jpvc3 = loa3 = atb3 = atw3 = atc3 = atu3 = false;
		if (bkTp === 'BT') {
			jpvc = jpvc2 = loa2 = atb2 = atw2 = atc2 = atu2 = true;
		}
		if (bkTp === 'BG') {
			jpvc = true;
		}
		if (bkTp === 'TG' || bkTp === 'TA') {
			loa = true;
		}
		if (bkTp === 'TR') {
			loa = atu = loa2 = atb2 = true;
		}
		if (bkTp === 'VL') {
			jpvc = loa = true;
		}
		//2nd
		refs.refTxtJpvcDB.setRequired(jpvc);
		refs.refTxtLOA.setRequired(loa);
		refs.refTxtATB.setRequired(atb);
		refs.refTxtATW.setRequired(atw);
		refs.refTxtATC.setRequired(atc);
		refs.refTxtATU.setRequired(atu);
		//3rd
		refs.refTxt3rdJpvcDB.setRequired(jpvc2);
		refs.refTxt3rdLOA.setRequired(loa2);
		refs.refTxt3rdATB.setRequired(atb2);
		refs.refTxt3rdATW.setRequired(atw2);
		refs.refTxt3rdATC.setRequired(atc2);
		refs.refTxt3rdATU.setRequired(atu2);
	},
	setDisableVesselDbBkControl: function (refsCbx) {
		var me = this;
		var refs = me.getReferences();
		var value = refsCbx.getValue();
		var JPVC = LOA = ATB = ATW = ATC = ATU = JPVC2 = LOA2 = ATB2 = ATW2 = ATC2 = ATU2 = JPVC3 = LOA3 = ATB3 = ATW3 = ATC3 = ATU3 = true;
		//true: is disable, false is enable.
		if (value === '') {
			JPVC = LOA = ATB = ATW = ATC = ATU = true;
			JPVC2 = LOA2 = ATB2 = ATW2 = ATC2 = ATU2 = true;
			JPVC3 = LOA3 = ATB3 = ATW3 = ATC3 = ATU3 = true;
		}
		if (value === 'BT' || value === 'BG') {
			//2nd, 3rd, 4th enable all except LOA
			LOA = true; JPVC = ATB = ATW = ATC = ATU = false;
			LOA2 = true; JPVC2 = ATB2 = ATW2 = ATC2 = ATU2 = false;
			LOA3 = true; JPVC3 = ATB3 = ATW3 = ATC3 = ATU3 = false;
		}
		if (value === 'TG') {
			JPVC = LOA = false; ATB = ATW = ATC = ATU = true;
			JPVC2 = false; LOA2 = ATB2 = ATW2 = ATC2 = ATU2 = true;
			JPVC3 = LOA3 = ATB3 = ATW3 = ATC3 = ATU3 = true;
		}
		if (value === 'TR') {
			LOA = ATU = false; JPVC = ATB = ATW = ATC = true;
			JPVC2 = LOA2 = ATB2 = false; ATW2 = ATC2 = ATU2 = true;
			JPVC3 = LOA3 = ATB3 = ATW3 = ATC3 = ATU3 = true;
		}
		if (value === 'TA') {
			JPVC = true; LOA = ATB = ATW = ATC = ATU = false;
			JPVC2 = LOA2 = ATB2 = ATW2 = ATC2 = ATU2 = true;
			JPVC3 = LOA3 = ATB3 = ATW3 = ATC3 = ATU3 = true;
		}
		if (value === 'VL') {
			JPVC = ATB = ATU = false; LOA = ATW = ATC = true
			JPVC2 = LOA2 = ATB2 = ATW2 = ATC2 = ATU2 = true;
			JPVC3 = LOA3 = ATB3 = ATW3 = ATC3 = ATU3 = true;
		}
		me.setDisableControl2nd(JPVC, LOA, ATB, ATW, ATC, ATU);
		me.setDisableControl3rd(JPVC2, LOA2, ATB2, ATW2, ATC2, ATU2);
		me.setDisableControl4th(JPVC3, LOA3, ATB3, ATW3, ATC3, ATU3);
	},
	setDisableControl2nd: function (JPVC, LOA, ATB, ATW, ATC, ATU) {
		var me = this;
		var refs = me.getReferences();
		refs.refTxtJpvcDB.setDisabled(JPVC);
		refs.refTxtLOA.setDisabled(LOA);
		refs.refTxtATB.setDisabled(ATB);
		refs.refTxtATW.setDisabled(ATW);
		refs.refTxtATC.setDisabled(ATC);
		refs.refTxtATU.setDisabled(ATU);
	},
	setDisableControl3rd: function (JPVC, LOA, ATB, ATW, ATC, ATU) {
		var me = this;
		var refs = me.getReferences();
		refs.refTxt3rdJpvcDB.setDisabled(JPVC);
		refs.refTxt3rdLOA.setDisabled(LOA);
		refs.refTxt3rdATB.setDisabled(ATB);
		refs.refTxt3rdATW.setDisabled(ATW);
		refs.refTxt3rdATC.setDisabled(ATC);
		refs.refTxt3rdATU.setDisabled(ATU);
	},

	setDisableControl4th: function (JPVC, LOA, ATB, ATW, ATC, ATU) {
		var me = this;
		var refs = me.getReferences();
		refs.refTxt4thJpvcDB.setDisabled(JPVC);
		refs.refTxt4thLOA.setDisabled(LOA);
		refs.refTxt4thATB.setDisabled(ATB);
		refs.refTxt4thATW.setDisabled(ATW);
		refs.refTxt4thATC.setDisabled(ATC);
		refs.refTxt4thATU.setDisabled(ATU);
	},

	validateDBbankingDateTime() {
		var me = this;
		var refs = me.getReferences();
		var atb = refs.refTxtATB.getValue();
		var atw = refs.refTxtATW.getValue();
		var atc = refs.refTxtATC.getValue();
		var atu = refs.refTxtATU.getValue();
		//
		var atb2 = refs.refTxt3rdATB.getValue();
		var atw2 = refs.refTxt3rdATW.getValue();
		var atc2 = refs.refTxt3rdATC.getValue();
		var atu2 = refs.refTxt3rdATU.getValue();
		//
		var is2ndVslValid = me.validateDateTime(atb, atw, atc, atu);
		var is3rdVslValid = me.validateDateTime(atb2, atw2, atc2, atu2);
		return (is2ndVslValid && is3rdVslValid);
	},

	validateDateTime: function (atb, atw, atc, atu) {
		var arrDt = new Array(atb, atw, atc, atu);
		for (var i = 0; i < arrDt.length - 1; i++) {
			if (arrDt[i] == null)
				continue;
			var dt1 = Ext.Date.parse(arrDt[i],
				MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			for (var j = i + 1; j < arrDt.length; j++) {
				if (arrDt[j] == null)
					continue;
				var dt2 = Ext.Date.parse(arrDt[j],
					MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
				if (dt1 >= dt2)
					return false;
			}
		}
		return true;
	},


	/*
	 * VESSEL SHIFTING AND CARGO SHIFTING =============================
	 * 
	 * */
	onGridVslShiftgClick: function (ctx, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refVslShiftingShiftgGrid');
		var vslCurrWharftList = me.getStore('vslCurrWharftList');
		var vslCurrWharftData = vslCurrWharftList.getData().items[0];
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		if (selection == null) return;
		me.rowIndex = rowIndex;
		me.getViewModel().set('theVslShiftingShiftg', selection);
		var theVslShiftingShiftg = me.getViewModel().get('theVslShiftingShiftg');
		theVslShiftingShiftg.data.prevAtb = vslCurrWharftData.get('prevAtb')
		theVslShiftingShiftg.data.prevAtu = vslCurrWharftData.get('prevAtu')
		refs.refNewWharfShiftgcbx.setValue(selection.get("nxBerthNo"));
		refs.refShiftgPositionCbx.setValue(selection.get("berthAlongside"));
		refs.refReasonShiftgCbx.setValue(selection.get("rsnCd"));
		refs.refAtuShiftgTimefield.setValue(selection.get("atuDt"));
		refs.refAtbShiftgTimefield.setValue(selection.get("atbDt"));
		refs.refAtaShiftgTimefield.setValue(selection.get("ataDt"));
		if (selection.get("pilotYn") == 'Y') {
			refs.refPilotShiftingChx._checked = true;
			refs.refPilotShiftingChx.updateChecked(true);
		} else {
			refs.refPilotShiftingChx._checked = false;
			refs.refPilotShiftingChx.updateChecked(false);
		}
		refs.refBtnAddVslShiftg.setDisabled(true);
	},

	onClearVslShiftg: function () {
		var me = this;
		var refs = me.getReferences();
		var vslCurrWharftList = me.getStore('vslCurrWharftList');
		var grid = me.lookupReference('refVslShiftingShiftgGrid');
		var vslCurrWharftData = vslCurrWharftList.getData().items[0];
		if (vslCurrWharftData == undefined || vslCurrWharftData == null) {
			MessageUtil.alert('Warning', 'shiftingdoublebanking_clear_empty');
			return;
		}
		grid.setSelection(false);
		me.getViewModel().set('theVslShiftingShiftg', null)
		refs.refBtnAddVslShiftg.setDisabled(false);
		refs.refCurWharftextField.setValue(vslCurrWharftData.get('currWharf'));
		refs.refCurrWharfMakrFmTextfield.setValue(vslCurrWharftData.get('currWharfMakrFm'));
		refs.refCurrWharfMakrToTextfield.setValue(vslCurrWharftData.get('currWharfMakrTo'));
		refs.refPrevAtbTextfield.setValue(vslCurrWharftData.get('prevAtb'));
		refs.refPrevAtuTextfield.setValue(vslCurrWharftData.get('prevAtu'));

		refs.refRequesterShiftgTextField.setValue('');
		refs.refAtuShiftgTimefield.setValue('');
		refs.refAtbShiftgTimefield.setValue(vslCurrWharftData.get('prevAtu'));
		refs.refNewWharfShiftgcbx.clearValue();
		refs.refBerthWharfSField.setValue('');
		refs.refBerthWharfEField.setValue('');
		refs.refWharfMarkStartfield.setValue(0);
		refs.refShiftgPositionCbx.clearValue();
		refs.refReasonShiftgCbx.clearValue();
		refs.refPilotShiftingChx._checked = false;
		refs.refPilotShiftingChx.updateChecked(false);
		refs.refMooringShiftgTextField.setValue('');
		refs.refTugShiftgTextField.setValue('');
	},

	onNewWharfShftgFocusleave: function () {
		var me = this;
		var refs = me.getReferences();
		var vesselInfo = me.getViewModel().get('vslDetail');

		var endsValue = refs.refWharfMarkStartfield.getValue() + parseInt(vesselInfo.loa);
		refs.refWharfMarkEndfield.setValue(endsValue);
	},
	onBerthLocationComboChange: function (combo, value, obj) {
		var me = this;
		var refs = me.getReferences();
		var berthCombo = me.getStore('vesselShiftingBerthInfoCombo');
		var index = berthCombo.findExact('berthCd', value);

		if (index > 0) {
			var berthTp = berthCombo.getAt(index).data.berthTp;
			var pstSta = berthCombo.getAt(index).data.pstSta;
			var pstEnd = berthCombo.getAt(index).data.pstEnd;

			if (berthTp !== 'WRF') {
				refs.refWharfMarkStartfield.setValue(0);
				refs.refWharfMarkStartfield.setReadOnly(true);
				refs.refWharfMarkEndfield.setReadOnly(true);

			} else {
				refs.refWharfMarkStartfield.setReadOnly(false);
				refs.refWharfMarkEndfield.setReadOnly(false);
			}
			refs.refBerthWharfSField.setValue(pstSta);
			refs.refBerthWharfEField.setValue(pstEnd);
		}
	},
	oncheckAddVslShiftgHHT: function () {
		var me = this;
		var refs = me.getReferences();
		var vslCurrWharftList = me.getStore('vslCurrWharftList');
		var vslCurrWharftData = vslCurrWharftList.getData().items[0];

		if (vslCurrWharftData.get('prevAtu') == '') {
			MessageUtil.alert('Warning', 'shiftingdoublebanking_Shftg_noAtu');
			return;
		} else if (refs.refAtbShiftgTimefield.getValue() != '') {
			var atuDateTime = Ext.Date.parse(vslCurrWharftData.get('prevAtu'), 'd/m/Y H:i');
			var newAtbDateTime = Ext.Date.parse(refs.refAtbShiftgTimefield.getValue(), 'd/m/Y H:i');
			if (newAtbDateTime < atuDateTime) {
				MessageUtil.error('warning_msg', 'shiftingdoublebanking_Shftg_time_follow');
				return;
			}
		}

		if (!me.onValidateShftgSubmit()) {
			return;
		}
		MessageUtil.questionModern('Confirm', 'infoinsert_msg', null,
			function (button) {
				if (button === 'ok') {
					me.AddVslShiftgHHT();
				} else if (button === 'cancel') {
					return;
				};
			}
		);
	},

	AddVslShiftgHHT: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('vslShftList');
		var sendArray = new Array();
		var masterItem = Ext.create('MOST.model.operation.ShiftingDoubleBanking');
		var formatStr = MOST.config.Locale.getDefaultDateFormatWithNoSeconds();
		var vslCurrWharftList = me.getStore('vslCurrWharftList');
		var vslCurrWharftData = vslCurrWharftList.getData().items[0];
		//		var record =Ext.create('MOST.model.operation.ShiftingDoubleBanking').data;
		//		var proxy = masterItem.getProxy();

		masterItem.set('searchType', 'vesselShifting');
		masterItem.set('vslCallId', me.getViewModel().get('globalVesselCallId'));
		masterItem.set('scn', me.getViewModel().get('theVessel').scn);
		masterItem.set('workingStatus', me.INSERT);
		// masterItem.set('version', me.generateUuid());
		masterItem.set('userId', MOST.config.Token.getUserId());

		masterItem.data.prevAtu = '';
		masterItem.data.atuDt = '';
		masterItem.data.atbDt = '';
		masterItem.data.prevAtb = '';
		masterItem.set('prevAtbDate', Ext.Date.parse(vslCurrWharftData.get('prevAtb')  , formatStr));
		masterItem.set('prevAtuDate', Ext.Date.parse(vslCurrWharftData.get('prevAtu'), formatStr));
		masterItem.set('atbDate', Ext.Date.parse(refs.refAtbShiftgTimefield.getValue(), formatStr));
		masterItem.set('ataDate', Ext.Date.parse(refs.refAtaShiftgTimefield.getValue(), formatStr));
		masterItem.set('atuDate', Ext.Date.parse(refs.refAtuShiftgTimefield.getValue(), formatStr));
		masterItem.set('reqr', refs.refRequesterShiftgTextField.getValue());
		masterItem.set('currWharf', refs.refCurWharftextField.getValue());
		//		masterItem.set('currWharfMakrFm', refs.refCurrWharfMakrFmTextfield.getValue());
		//		masterItem.set('currWharfMakrTo', refs.refCurrWharfMakrToTextfield.getValue());
		masterItem.set('wharfMarkFm', refs.refWharfMarkStartfield.getValue());
		masterItem.set('wharfMarkTo', refs.refWharfMarkEndfield.getValue());
		masterItem.set('rsnCd', refs.refReasonShiftgCbx.getValue());
		masterItem.set('berthAlongside', refs.refShiftgPositionCbx.getValue());
		masterItem.set('nxBerthNo', refs.refNewWharfShiftgcbx.getValue());
		masterItem.set('mooring', refs.refMooringShiftgTextField.getValue());
		masterItem.set('tug', refs.refTugShiftgTextField.getValue());

		store.insert(0, masterItem);
		me.onSaveTblDbBanking(store);

		//		record.workingStatus = me.INSERT;
		//		record.searchType = 'vesselShifting';
		//		record.vslCallId = me.getViewModel().get('globalVesselCallId').toUpperCase();
		//		record.userId = MOST.config.Token.getUserId();
		//		
		//		record.currWharf =  refs.refCurWharftextField.getValue();
		//		record.currWharfMakrFm = refs.refCurrWharfMakrFmTextfield.getValue();
		//		record.currWharfMakrTo = refs.refCurrWharfMakrToTextfield.getValue();
		//		record.prevAtb = refs.refPrevAtbTextfield.getValue();
		//		record.prevAtu = refs.refPrevAtuTextfield.getValue();
		//		record.reqr =  refs.refRequesterShiftgTextField.getValue();
		//		record.atuDt =  refs.refAtuShiftgTimefield.getValue();
		//		record.atbDt =  refs.refAtbShiftgTimefield.getValue();
		//		record.nxBerthNo =  refs.refNewWharfShiftgcbx.getValue();
		//		record.wharfMarkFm =   refs.refWharfMarkStartfield.getValue();
		//		record.wharfMarkTo = refs.refWharfMarkEndfield.getValue();
		//		record.berthAlongside =  refs.refShiftgPositionCbx.getValue();
		//		record.rsnCd =  refs.refReasonShiftgCbx.getValue();
		//		record.mooring =    refs.refMooringShiftgTextField.getValue();
		//		record.tug = refs.refTugShiftgTextField.getValue();
		//		if(refs.refPilotShiftingChx._checked == true){
		//			record.pilotYn = 'Y';
		//		}else{
		//			record.pilotYn = 'N';
		//		}
		//		var masterItem = Ext.create('MOST.model.operation.ShiftingDoubleBanking');
		//		sendArray.push(record);
		//	
		//			var proxy = masterItem.getProxy();
		//			proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/shifting/list'
		//			masterItem.set('cudList', sendArray);
		//			masterItem.save({
		//				success:function(){
		//					MessageUtil.saveSuccess();
		//					dbStore.reload();
		//					me.onClearVslShiftg();
		//				}
		//			});

	},
	onCheckUpdateVslShiftgHHT: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refVslShiftingShiftgGrid');
		var selection = grid.getSelection();
		var preAtu = Ext.Date.parse(refs.refPrevAtuTextfield.getValue(), 'd/m/Y H:i');

		if (selection == null) {
			MessageUtil.error('warning_msg', 'shiftingdoublebanking_update_empty');
			return;
		}
		if (!me.onValidateShftgSubmit()) {
			return;
		}
		if (preAtu == null || preAtu == '') {
			MessageUtil.alert('Warning', 'shiftingdoublebanking_Shftg_noAtu');
			return;
		}
		if (refs.refAtbShiftgTimefield.getValue() != '' && preAtu != '') {
			var newAtb = Ext.Date.parse(refs.refAtbShiftgTimefield.getValue(), 'd/m/Y H:i');
			if (newAtb < preAtu) {
				MessageUtil.error('warning_msg', 'shiftingdoublebanking_Shftg_time_follow');
				return;
			}
		}

		MessageUtil.questionModern('Confirm', 'infoupdate_msg', null,
			function (button) {
				if (button === 'ok') {
					me.UpdateVslShiftgHHT(selection);
				} else if (button === 'cancel') {
					return;
				};
			}
		);
	},

	UpdateVslShiftgHHT: function (selection) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('vslShftList');
		var formatStr = MOST.config.Locale.getDefaultDateFormatWithNoSeconds();
		//		var grid = refs.refVslShiftingShiftgGrid;
		//		var dbStore = me.getStore('sftDblBankingList');
		//		var selecedRecord = grid.getSelection() ;

		selection.set('searchType', 'vesselShifting');
		selection.set('vslCallId', me.getViewModel().get('globalVesselCallId'));
		selection.set('userId', MOST.config.Token.getUserId());
		selection.set('workingStatus', me.UPDATE);
		// selection.set('version', me.generateUuid());

		selection.set('prevAtbDate', Ext.Date.parse(me.getViewModel().get('globalAtb'), formatStr));
		selection.set('prevAtuDate', Ext.Date.parse(me.getViewModel().get('globalAtu'), formatStr));
		selection.set('atbDate', Ext.Date.parse(refs.refAtbShiftgTimefield.getValue(), formatStr));
		selection.set('atuDate', Ext.Date.parse(refs.refAtuShiftgTimefield.getValue(), formatStr));
		selection.set('currWharf', refs.refCurWharftextField.getValue());
		selection.set('reqr', refs.refRequesterShiftgTextField.getValue());
		selection.set('wharfMarkFm', refs.refWharfMarkStartfield.getValue());
		selection.set('wharfMarkTo', refs.refWharfMarkEndfield.getValue());
		selection.set('rsnCd', refs.refReasonShiftgCbx.getValue());
		selection.set('berthAlongside', refs.refShiftgPositionCbx.getValue());
		selection.set('nxBerthNo', refs.refNewWharfShiftgcbx.getValue());
		selection.set('mooring', refs.refMooringShiftgTextField.getValue());
		selection.set('tug', refs.refTugShiftgTextField.getValue());

		me.onSaveTblDbBanking(store);

		//		var sendArray = new Array();
		//		var detailData = me.getViewModel().get('theVslShiftingShiftg');
		//		
		//		var sltIndex = grid.store.indexOf(selecedRecord);
		//		var item =Ext.create('MOST.model.operation.ShiftingDoubleBanking');
		//		store.each(function(record, index){
		//			if(index === sltIndex){					
		//				record.set('workingStatus', me.UPDATE);
		//				record.set('searchType', 'vesselShifting');
		//				record.set('vslCallID', me.getViewModel().get('globalVesselCallId').toUpperCase());
		//				record.set('userId',MOST.config.Token.getUserId());
		//				
		//				record.set('currWharf', refs.refCurWharftextField.getValue());
		//				record.set('currWharfMakrFm',refs.refCurrWharfMakrFmTextfield.getValue());
		//				record.set('currWharfMakrTo',refs.refCurrWharfMakrToTextfield.getValue());
		//				record.set('reqr', refs.refRequesterShiftgTextField.getValue());
		//				record.set('atuDate', Ext.Date.parse(refs.refAtuShiftgTimefield.getValue(),MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		//				record.set('atbDate', Ext.Date.parse(refs.refAtbShiftgTimefield.getValue(),MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		//				record.set('nxBerthNo', refs.refNewWharfShiftgcbx.getValue());
		//				record.set('wharfMarkFm',  refs.refWharfMarkStartfield.getValue());
		//				record.set('wharfMarkTo',refs.refWharfMarkEndfield.getValue());
		//				record.set('berthAlongside', refs.refShiftgPositionCbx.getValue());
		//				record.set('rsnCd', refs.refReasonShiftgCbx.getValue());
		//				record.set('mooring',   refs.refMooringShiftgTextField.getValue());
		//				record.set('tug',refs.refTugShiftgTextField.getValue());
		//				
		//				if(refs.refPilotShiftingChx._checked == true){
		//					record.set('pilotYn','Y');
		//				}else{
		//					record.set('pilotYn','N');
		//				}
		//				record.dirty = true;
		//				sendArray.push(record.data);
		//			}
		//		});
		//	
		//		var masterItem = Ext.create('MOST.model.operation.ShiftingDoubleBanking');
		//		
		//	
		//			var proxy = masterItem.getProxy();
		//			proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/shifting/list'
		//			masterItem.set("newVersion",me.generateUuid());
		//			masterItem.set('cudList', sendArray);
		//			masterItem.save({
		//				success:function(){
		//					MessageUtil.saveSuccess();
		//					dbStore.reload();
		//					me.onClearVslShiftg();
		//				}
		//			});

	},

	onDeleteVslShiftgHHT: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refVslShiftingShiftgGrid');
		var store = me.getStore('vslShftList');
		var record = grid.getSelection();
		var dbStore = me.getStore('sftDblBankingList');
		var sendArray = new Array();
		var sltIndex = grid.store.indexOf(record);
		var vslCurrWharftList = me.getStore('vslCurrWharftList');
		var vslCurrWharftData = vslCurrWharftList.getData().items[0];
		//		var cudData = Ext.create('MOST.model.operation.ShiftingDoubleBanking');

		store.each(function (record, index) {
			if (index === sltIndex) {
				store.remove(record);
				record.set('workingStatus', me.DELETE);
				record.set('searchType', 'vesselShifting');
				record.set('userId', MOST.config.Token.getUserId());

				sendArray.push(record.data);
			}
		});

		//		if(sendArray.length == 0){
		//			MessageUtil.error('warning_msg','shiftingdoublebanking_delete_empty');
		//			return;
		//		}

		if (record == null) {
			MessageUtil.warning('Warning', 'shiftingdoublebanking_delete_empty');
			return;
		}

		var atuDateTime = Ext.Date.parse(sendArray[0].atuDt, 'd/m/Y H:i');
		var prevAtbDateTime = Ext.Date.parse(vslCurrWharftData.get('prevAtb'), 'd/m/Y H:i');
		if (atuDateTime != null || atuDateTime != '') {
			if (atuDateTime <= prevAtbDateTime) {
				MessageUtil.error('warning_msg', 'shiftingdoublebanking_remove_later');
				dbStore.reload();
				return;
			}
		}

		//		var proxy = cudData.getProxy();
		//		proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/shifting/list'	
		//		cudData.set('cudList', sendArray);
		//		MessageUtil.questionModern('tbl_confrm_delete', 'infodelete_msg',null,
		//		function(button){
		//			if (button === 'ok') {
		//				cudData.save({
		//					success:function(){
		//					MessageUtil.saveSuccess(); 
		//					dbStore.reload();
		//					me.onClearVslShiftg();
		//					}
		//				})
		//	        }else if(button === 'cancel'){
		//	        	dbStore.reload();
		//	        	return;
		//	        };
		//		}
		//	);
		MessageUtil.questionModern('tbl_confrm_delete', 'infodelete_msg', null, function (button) {
			if (button === 'ok') {
				store.remove(record);
				store.sync({
					success: function () {
						MessageUtil.saveSuccess();
						me.onTblRetrieve();

						// double banking
						//						var record = Ext.create('MOST.model.operation.ShiftingDoubleBanking');
						//						record.set('workingStatus', WorkingStatus.INSERT);
						//						me.getViewModel().set('theDoubleBanking',  record);
						//						
						//						refs.refTxtJpvcDB.setValue('');
						//						refs.refTxt3rdJpvcDB.setValue('');
						//						refs.refCboBankingType.setDisabled(false);
						//						refs.refCboBankingType.setValue('');
					}
				});

			}
		});

		return;
	},

	onValidateShftgSubmit: function () {
		var me = this;
		var refs = me.getReferences();
		var vesselInfo = me.getViewModel().get('vslDetail');

		var newAtuDt = refs.refAtuShiftgTimefield.getValue();
		var newAtbDt = refs.refAtbShiftgTimefield.getValue();
		var newAtbDateTime = Ext.Date.parse(newAtbDt, 'd/m/Y H:i');
		var newAtuDatetime = Ext.Date.parse(newAtuDt, 'd/m/Y H:i');
		var locFr = refs.refWharfMarkStartfield.getValue();
		var locTo = refs.refWharfMarkEndfield.getValue();

		var myFrom = refs.vslShiftingShftgDetail.validate();
		if (!myFrom) {
			Ext.Msg.alert('Validate', 'You are missing requires field');
			return false;
		}
		if (newAtuDatetime <= newAtbDateTime && newAtuDatetime != null) {
			MessageUtil.alert('Warning', 'shiftingdoublebanking_Shftg_time_follow');
			return false;
		}
		if (locFr != '' || locTo != '') {
			var loa = parseInt(vesselInfo.loa);
			if (locTo < locFr + loa) {
				MessageUtil.alert('Warning', 'shiftingdoublebanking_Shftg_WharfMark');
				return false;
			}
		}
		return true;
	},

	// cargo shifting

	onGridVslCgShiftClick: function (ctx, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refVslShiftingCgShiftGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		if (selection == null) return;
		me.rowIndex = rowIndex;
		me.getViewModel().set('theVslCgShiftHHT', selection.getData());

		refs.refHatchsVslCgShiftcbx.setValue(selection.get("hatchNo"));
		refs.refAPFPVslCgShiftcbx.setValue(selection.get("hatchDrtCd"));
		refs.refSCrewVslCgShiftcbx.setValue(selection.get("stcrDiv"));
		refs.refSfTypeVslCgShiftcbx.setValue(selection.get("sftTp"));
		refs.refNHatchVslCgShiftcbx.setValue(selection.get("nextHatchNo"));
		refs.refStartTimeCgShiftfield.setValue(selection.get("stDt"));
		refs.refEndTimeCgShiftfield.setValue(selection.get("endDt"));

	},

	onClearCgShiftHHT: function () {
		var me = this;
		var refs = me.getReferences();
		var dbStore = me.getStore('sftDblBankingList');
		me.getViewModel().set('theVslCgShiftHHT', null);
		refs.refHatchsVslCgShiftcbx.clearValue();
		refs.refAPFPVslCgShiftcbx.clearValue();
		refs.refSCrewVslCgShiftcbx.clearValue();
		refs.refSfTypeVslCgShiftcbx.clearValue();
		refs.refNHatchVslCgShiftcbx.clearValue();
		refs.refSMTCgShiftTextField.setValue('');
		refs.refSM3CgShiftTextField.setValue('');
		refs.refSQtyCgShiftTextField.setValue('');
		refs.refRmkCgShiftTextField.setValue('');
		refs.refPkgTypeCgShftTextField.setValue('');
		refs.refStartTimeCgShiftfield.setValue('');
		refs.refEndTimeCgShiftfield.setValue('');
		dbStore.reload();

		me.setDateTimeWithShift(me.TAB_CGSHT);
	},

	oncheckAddCgShiftHHT: function () {
		var me = this;
		var refs = me.getReferences();
		if (!me.onValidateCgShftSubmit()) {
			return;
		}
		MessageUtil.questionModern('Confirm', 'infoinsert_msg', null,
			function (button) {
				if (button === 'ok') {
					me.AddCgShiftHHT();
				} else if (button === 'cancel') {
					return;
				};
			}
		);
	},

	AddCgShiftHHT: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('cgShftList');
		var masterItem = Ext.create('MOST.model.operation.ShiftingDoubleBanking');
		var formatStr = MOST.config.Locale.getDefaultDateFormatWithNoSeconds();
		//		var dbStore = me.getStore('sftDblBankingList');
		//		var sendArray = new Array();

		//		var detailData =Ext.create('MOST.model.operation.ShiftingDoubleBanking').data;
		//
		//		detailData.workingStatus = me.INSERT;
		//		detailData.vslCallId =me.getViewModel().get('globalVesselCallId').toUpperCase();
		//		detailData.userId = MOST.config.Token.getUserId();
		//		detailData.searchType = 'cargoShifting';
		//		
		//		detailData.hatchNo = refs.refHatchsVslCgShiftcbx.getValue();
		//		detailData.hatchDrtCd = refs.refAPFPVslCgShiftcbx.getValue();
		//		detailData.stcrDiv = refs.refSCrewVslCgShiftcbx.getValue();
		//		detailData.sftTp = refs.refSfTypeVslCgShiftcbx.getValue();
		//		detailData.nextHatchNo = refs.refNHatchVslCgShiftcbx.getValue();
		//		
		//		detailData.mt = refs.refSMTCgShiftTextField.getValue();
		//		detailData.m3 = refs.refSM3CgShiftTextField.getValue();
		//		detailData.qty = refs.refSQtyCgShiftTextField.getValue();
		//		detailData.rmk = refs.refRmkCgShiftTextField.getValue();
		//		
		//		detailData.pkgTpCd = refs.refPkgTypeCgShftTextField.getValue();
		//		detailData.stDt = refs.refStartTimeCgShiftfield.getValue();
		//		detailData.endDt = refs.refEndTimeCgShiftfield.getValue();


		masterItem.set('searchType', 'cargoShifting');
		masterItem.set('vslCallId', me.getViewModel().get('globalVesselCallId'));
		masterItem.set('userId', MOST.config.Token.getUserId());
		masterItem.set('workingStatus', me.INSERT);
		masterItem.set('version', null);

		masterItem.set('hatchNo', refs.refHatchsVslCgShiftcbx.getValue());
		masterItem.set('hatchDrtCd', refs.refAPFPVslCgShiftcbx.getValue());
		masterItem.data.stDt = null;
		masterItem.data.endDt = null;
		masterItem.set('stDate', Ext.Date.parse(refs.refStartTimeCgShiftfield.getValue(), formatStr));
		masterItem.set('endDate', Ext.Date.parse(refs.refEndTimeCgShiftfield.getValue(), formatStr));
		masterItem.set('stcrDiv', refs.refSCrewVslCgShiftcbx.getValue());
		masterItem.set('sftTp', refs.refSfTypeVslCgShiftcbx.getValue());
		masterItem.set('nextHatchNo', refs.refNHatchVslCgShiftcbx.getValue());
		masterItem.set('mt', refs.refSMTCgShiftTextField.getValue());
		masterItem.set('m3', refs.refSM3CgShiftTextField.getValue());
		masterItem.set('qty', refs.refSQtyCgShiftTextField.getValue());
		masterItem.set('rmk', refs.refRmkCgShiftTextField.getValue());
		masterItem.set('pkgTpCd', refs.refPkgTypeCgShftTextField.getValue());

		store.insert(0, masterItem);
		me.onSaveTblDbBanking(store);
		//		var masterItem = Ext.create('MOST.model.operation.ShiftingDoubleBanking');
		//		sendArray.push(detailData);
		//			var proxy = masterItem.getProxy();
		//			proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/shifting/list'
		//			masterItem.set('cudList', sendArray);
		//			masterItem.save({
		//				success:function(){
		//					MessageUtil.saveSuccess();
		//					dbStore.reload();
		//					me.onClearCgShiftHHT();
		//				}
		//			});

	},
	onCheckUpdateCgShiftgHHT: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refVslShiftingCgShiftGrid');
		var selection = grid.getSelection();

		if (selection == null) {
			MessageUtil.error('warning_msg', 'shiftingdoublebanking_update_empty');
			return;
		}
		if (!me.onValidateCgShftSubmit()) {
			return;
		}
		MessageUtil.questionModern('Confirm', 'infoupdate_msg', null,
			function (button) {
				if (button === 'ok') {
					me.UpdateCgShiftgHHT(selection);
				} else if (button === 'cancel') {
					return;
				};
			}
		);
	},

	UpdateCgShiftgHHT: function (selection) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('cgShftList');
		//		var dbStore = me.getStore('sftDblBankingList');	
		//		var sendArray = new Array();
		//		var detailData = me.getViewModel().get('theVslCgShiftHHT');

		//		var sltIndex = grid.store.indexOf(selecedRecord);

		var formatStr = MOST.config.Locale.getDefaultDateFormatWithNoSeconds();

		selection.set('searchType', 'cargoShifting');
		selection.set('vslCallId', me.getViewModel().get('globalVesselCallId'));
		selection.set('version', me.generateUuid());
		selection.set('workingStatus', me.UPDATE);
		selection.set('userId', MOST.config.Token.getUserId());

		selection.set('hatchNo', refs.refHatchsVslCgShiftcbx.getValue());
		selection.set('hatchDrtCd', refs.refAPFPVslCgShiftcbx.getValue());
		selection.set('stcrDiv', refs.refSCrewVslCgShiftcbx.getValue());
		selection.set('sftTp', refs.refSfTypeVslCgShiftcbx.getValue());
		selection.set('nextHatchNo', refs.refNHatchVslCgShiftcbx.getValue());
		selection.set('stDate', Ext.Date.parse(refs.refStartTimeCgShiftfield.getValue(), formatStr));
		selection.set('endDate', Ext.Date.parse(refs.refEndTimeCgShiftfield.getValue(), formatStr));
		selection.set('mt', refs.refSMTCgShiftTextField.getValue());
		selection.set('m3', refs.refSM3CgShiftTextField.getValue());
		selection.set('qty', refs.refSQtyCgShiftTextField.getValue());
		selection.set('rmk', refs.refRmkCgShiftTextField.getValue());
		selection.set('pkgTpCd', refs.refPkgTypeCgShftTextField.getValue());

		me.onSaveTblDbBanking(store);

		//		store.each(function(record, index){
		//			if(index === sltIndex){					
		//				record.set('workingStatus', me.UPDATE);
		//				record.set('vslCallId',me.getViewModel().get('globalVesselCallId').toUpperCase());
		//				record.set('userId', MOST.config.Token.getUserId());
		//				record.set('searchType','cargoShifting');
		//				
		//				record.set('hatchNo', refs.refHatchsVslCgShiftcbx.getValue());
		//				record.set('hatchDrtCd', refs.refAPFPVslCgShiftcbx.getValue());
		//				record.set('stcrDiv', refs.refSCrewVslCgShiftcbx.getValue());
		//				record.set('sftTp', refs.refSfTypeVslCgShiftcbx.getValue());
		//				record.set('nextHatchNo', refs.refNHatchVslCgShiftcbx.getValue());			
		//				record.set('mt', refs.refSMTCgShiftTextField.getValue());
		//				record.set('m3', refs.refSM3CgShiftTextField.getValue());
		//				record.set('qty', refs.refSQtyCgShiftTextField.getValue());
		//				record.set('rmk', refs.refRmkCgShiftTextField.getValue());		
		//				record.set('pkgTpCd', refs.refPkgTypeCgShftTextField.getValue());
		//				record.set('stDate', Ext.Date.parse(refs.refStartTimeCgShiftfield.getValue(),MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		//				record.set('endDate', Ext.Date.parse(refs.refEndTimeCgShiftfield.getValue(),MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		//				record.dirty = true;
		//				sendArray.push(record.data);
		//			}
		//		});
		//		var masterItem = Ext.create('MOST.model.operation.ShiftingDoubleBanking');	
		//			var proxy = masterItem.getProxy();
		//			proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/shifting/list'
		//	
		//			masterItem.set('cudList', sendArray);
		//			masterItem.save({
		//				success:function(){
		//					MessageUtil.saveSuccess();
		//					dbStore.reload();
		//					me.onClearCgShiftHHT();
		//				}
		//			});

	},

	onDeleteCgShiftgHHT: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refVslShiftingCgShiftGrid;
		var store = me.getStore('cgShftList');
		var record = grid.getSelection();
		//		var dbStore = me.getStore('sftDblBankingList');
		//		var sendArray = new Array();
		//		var cudData = Ext.create('MOST.model.operation.ShiftingDoubleBanking');
		//		var selecedRecord = grid.getSelection() ;				
		//		var sltIndex = grid.store.indexOf(selecedRecord);

		//		store.each(function(record, index){
		//			if(index === sltIndex){			
		//				store.remove(record);
		//				record.set('workingStatus', me.DELETE);
		//				record.set('searchType', 'cargoShifting');
		//				record.set('userId',MOST.config.Token.getUserId());
		//				sendArray.push(record.data);
		//			}
		//		});

		if (record == null) {
			MessageUtil.error('warning_msg', 'shiftingdoublebanking_delete_empty');
			return;
		}

		MessageUtil.questionModern('tbl_confrm_delete', 'infodelete_msg', null, function (button) {
			if (button === 'ok') {
				store.remove(record);
				store.sync({
					success: function () {
						MessageUtil.saveSuccess();
						me.onTblRetrieve();

						// double banking
						//						var record = Ext.create('MOST.model.operation.ShiftingDoubleBanking');
						//						record.set('workingStatus', WorkingStatus.INSERT);
						//						me.getViewModel().set('theDoubleBanking',  record);
						//						
						//						refs.refTxtJpvcDB.setValue('');
						//						refs.refTxt3rdJpvcDB.setValue('');
						//						refs.refCboBankingType.setDisabled(false);
						//						refs.refCboBankingType.setValue('');
					}
				});

			}
		});
		//		var proxy = cudData.getProxy();
		//		proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/shifting/list'		
		//		cudData.set('cudList', sendArray);	
		//		
		//		MessageUtil.questionModern('Confirm', 'infodelete_msg',null,
		//				function(button){
		//					if (button === 'ok') {
		//						cudData.save({
		//							success:function(){
		//								MessageUtil.saveSuccess(); 
		//								dbStore.reload();
		//								me.onClearCgShiftHHT();
		//							}
		//						})
		//			        }else if(button === 'cancel'){
		//			        	dbStore.reload();
		//			        	return;
		//			        };
		//				}
		//			);
	},

	onSelectCgShftHHT: function (ele, rec, idx) {
		var me = this;
		var refs = me.getReferences();
		if (rec.get('scd') == 'S3') {
			refs.refNHatchVslCgShiftcbx.setDisabled(false);
			refs.refNHatchVslCgShiftcbx._required = true;
		} else {
			refs.refNHatchVslCgShiftcbx.setValue('');
			refs.refNHatchVslCgShiftcbx.setDisabled(true);
			refs.refNHatchVslCgShiftcbx._required = false;
		}
	},

	onValidateCgShftSubmit: function () {
		var me = this;
		var refs = me.getReferences();
		var newAtuDt = refs.refEndTimeCgShiftfield.getValue();
		var newAtbDt = refs.refStartTimeCgShiftfield.getValue();
		var newAtbDateTime = Ext.Date.parse(newAtbDt, 'd/m/Y H:i');
		var newAtuDatetime = Ext.Date.parse(newAtuDt, 'd/m/Y H:i');

		var mt = refs.refSMTCgShiftTextField.getValue();
		var m3 = refs.refSM3CgShiftTextField.getValue();
		var qty = refs.refSQtyCgShiftTextField.getValue();

		var myFrom = refs.vslCgShiftDetail.validate();
		if (!myFrom) {
			Ext.Msg.alert('Validate', 'You are missing requires field');
			return false;
		}

		if (newAtuDatetime <= newAtbDateTime) {
			MessageUtil.alert('Warning', 'shiftingdoublebanking_CgShft_stDatefailmessage');
			return false;
		}
		if (mt == null && m3 == null && qty == null) {
			MessageUtil.alert('Warning', 'shiftingdoublebanking_CgShft_mtM3Qty');
			return false;
		}

		return true;

	},
	checkGlobalJpvcNo: function () {
		var me = this;
		var refs = me.getReferences();
		var globalJpvcNo = me.getViewModel().get('globalVesselCallId');
		if (!globalJpvcNo) {
			MessageUtil.warning('warning_msg', 'tbl_global_jpvc_selected');
			return false;
		}
		return true;
	},
	refBtnSearchRequesterVSHHT: function () {
		var me = this;
		var params = {
			title: 'Requester',
			//ptyCd: 'STV'
		};
		ViewUtil.openCodePopup(me, 'app-requesterpopuphht', 'refSearchRequesterVSHHT', params);
	},
	onSearchPkgTypeCgShiftingHHT: function () {
		var me = this;
		var targetCtl = 'refPkgTypeCgShftTextField';
		var title = 'Package Type';
		var params = {
			title: title,
			searchType: 'COMM',
			searchDivCd: 'PKGTP',
			searchLcd: 'MT',
			searchCol1: '',
		};
		ViewUtil.openCodePopup(this, 'app-commoncodepopuphht', targetCtl, params);
	},
	onPartnerFocusleave: function (ref, event, type) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('VSRValidationCode');
		var tyCd = '';
		var col1 = '';

		if (StringUtil.isNullorEmpty(ref.getValue())) return;

		if (type.e === 'Contractor') {
			tyCd = "checkCTTForHHT";
			col1 = ref.getValue().toUpperCase();
		} else if (type.e === 'Requestor') {
			tyCd = "checkFWDForHHT";
			col1 = ref.getValue().toUpperCase();
		} else {
			return;
		}
		var params = {
			tyCd: tyCd,
			col1: col1,
		}
		store.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					if (records != null && records.length > 0) {
						if (records[0].get('isValidated') === 'N') {
							ref.setValue("");
							MessageUtil.warning('warning_msg', 'vslchecklist_input_wrongValue_msg', type.e);
						}
					}
				}
			}
		});
	},
});