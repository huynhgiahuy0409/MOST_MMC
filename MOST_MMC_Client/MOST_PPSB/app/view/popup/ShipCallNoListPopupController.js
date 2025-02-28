Ext.define('MOST.view.popup.ShipCallNoListPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.shipcallnolistpopup',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MIN_DATE_PERIOD: 31,	// MIN PERIOD DATE
	MAX_DATE_PERIOD: 31,   // MAX PERIOD DATE
	MAX_PERIOD_DAY: 62,
	vslTp: '',
	MAIN_GRID_REF_NAME: 'refShipCallNoListPopupGrid',// Main Grid Name (SCN)
	
	MAIN_STORE_NAME: 'shipCallNoListPopup',	// SCN Grid Store
	VSL_STORE_NAME: 'vesselCallList',	// VesselCall Grid Store
	SCN_VSL_DETAIL_STORE_NAME: 'shipCallNoDetailList', // fetch Data from DB



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
		var mainStore = me.getStore(me.MAIN_STORE_NAME);
		var vslStore = me.getStore(me.VSL_STORE_NAME);
		var store = me.getStore(me.SCN_VSL_DETAIL_STORE_NAME);

		mainStore.removeAll();
		vslStore.removeAll();
		store.removeAll();

		var searchParm = Ext.create('MOST.model.popup.SearchVesselCallListParm');
		me.setSearchParm(searchParm);
		me.getViewModel().setData({ theSearch: searchParm });

		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		if(Ext.isClassic){
			me.setDateInDays("refScnEtaFromDt", - me.MIN_DATE_PERIOD);
			me.setDateInDays("refScnEtaToDt", + me.MAX_DATE_PERIOD);	
		}

		if (me.getView().recvData.scn) {
			if (!StringUtil.isNullorEmpty(me.getView().recvData.scn)) {
				let scn = me.getView().recvData.scn;
				let vslCallId = me.getView().recvData.vslCallId;

				store.load({
					params: {
						scn: scn,
						vslCallId: vslCallId
					},
					callback: function (records, operation, success) {
						if (success) {
							me.fillDataMainStore();
						}
					}
				});
			}

			if (!StringUtil.isNullorEmpty(me.getView().recvData.vslTp)) {
				me.vslTp = me.getView().recvData.vslTp;
			}
		}
	},

	// Search Event Handler
	onSearch: function () {
		var me = this;
		var refs = me.getReferences();
		var mainStore = me.getStore(me.MAIN_STORE_NAME);
		var store = me.getStore(me.SCN_VSL_DETAIL_STORE_NAME);
		var vslCallIdStore = me.getStore(me.VSL_STORE_NAME);

		var params = me.getSearchCondition();

		if (params == null) {
			return;
		}

		store.removeAll();
		mainStore.removeAll();
		vslCallIdStore.removeAll();

		if (Ext.isClassic) {
			var win = refs.refShipCallNoListPopup.up('panel');
			if (win) {
				win.getEl().mask('Searching...');
			}
		}

		store.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					me.fillDataMainStore();
					
				}
				if (Ext.isClassic) {
					if (win) {
						win.getEl().unmask();
					}
				}
			}
		});
	},
	
	
	/**
	 * Biz:
	 *  + One SCN maybe have n VesselCallId, one VesselCallId just belong to one SCN
	 *  + All vessel same SCN has same ETA/ETD ATA/ATD
	 * */
	fillDataMainStore: function () {
		var me = this;
		var mainStore = me.getStore(me.MAIN_STORE_NAME);
		var store = me.getStore(me.SCN_VSL_DETAIL_STORE_NAME);

		store.each(function (record) {
			let scn = record.get('scn'); // Get the vslCallId of the current record
			let existingRecord = mainStore.findRecord('scn', scn, 0, false, true, true);

			if (!existingRecord) {
				let newRecord = record.copy();
				mainStore.add(newRecord);
			}

		});

		mainStore.commitChanges();
	},

	//SCN Grid Row Double Click
	onDblClick: function (ctl, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var window = me.getView().up('window');
		var recvData = me.getView().recvData;

		window.returnValue = me.getReturnData(me.MAIN_GRID_REF_NAME);
		window.close();
	},

	//VesselCallId Grid Row Double Click
	onDblClickVslGrid: function (ctl, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var window = me.getView().up('window');
		var recvData = me.getView().recvData;

		window.returnValue = me.getReturnData('refGridVessel');
		window.close();
	},

	/**
	 * onClickScnGrid
	 * When one SCN selected. Display all VesselCallId belong that SCN.
	 * */
	onClickScnGrid: function () {
		var me = this;
		var masterStore = me.getStore(me.SCN_VSL_DETAIL_STORE_NAME);
		var scnStore = me.getStore('shipCallNoListPopup');
		var vslCallIdStore = me.getStore(me.VSL_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selectedRecord = grid.getSelection() == null ? null : grid.getSelection()[0];
		var scn = '', vslCd = '';

		if (selectedRecord == null) return;

		scn = selectedRecord.get('scn');
		vslCd = selectedRecord.get('vslCd');

		vslCallIdStore.removeAll();
		masterStore.each(function (record) {
			if (!StringUtil.isNullorEmpty(scn) && record.get('scn') === scn) {
				let newRecord = record.copy();
				vslCallIdStore.add(newRecord);
			}
		});

		vslCallIdStore.commitChanges();
	},

	// Store Filter
	onStoreFilter: function (field, newValue, oldValue) {
		var me = this;
		var refs = me.getReferences();

		var store = me.getStore(me.MAIN_STORE_NAME);

		store.clearFilter();

		field.setValue(newValue.toUpperCase());
	},

	onDateChange: function (control, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();

		if (control == refs.refScnEtaFromDt) {
			me.setDateInDaysByDate("refScnEtaToDt", me.MAX_PERIOD_DAY, control.getValue());
		} else {
			me.setDateInDaysByDate("refScnEtaFromDt", -me.MAX_PERIOD_DAY, control.getValue());
		}
	},

	/*onCheckStorageVsl: function (clt, obj) {
		var me = this;
		var refs = me.getReferences();

		var searchParm = me.getViewModel().get('theSearch');

		if (clt.getValue()) {
			searchParm.set('vslCd', '');
			searchParm.set('vslNm', '');
			searchParm.set('callSeq', '');
			searchParm.set('voyage', '');
			searchParm.set('callSign', '');

			refs.refScnEtaFromDt.setValue('');
			refs.refScnEtaToDt.setValue('');
		}

		refs.txtVslCd.setDisabled(clt.getValue());
		refs.txtVslNm.setDisabled(clt.getValue());
		refs.txtCallSeq.setDisabled(clt.getValue());
		refs.txtVoyage.setDisabled(clt.getValue());
		refs.txtCallSign.setDisabled(clt.getValue());
		refs.refScnEtaFromDt.setDisabled(clt.getValue());
		refs.refScnEtaToDt.setDisabled(clt.getValue());
		refs.ctnAlpha.setDisabled(clt.getValue());
	},*/
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
		var params;
		if (Ext.isClassic) {
			var recvData = me.getView().recvData;
			var searchParm = me.getViewModel().get('theSearch');

			var inputScn = searchParm.get('scn').toUpperCase();
			var pVslCallId = recvData.vslCallId;
			var dateCondition = me.checkFromToDate("refScnEtaFromDt", "refScnEtaToDt");
			
			if (StringUtil.isNullorEmpty(inputScn)) {
				var checkPeriodDate = DateUtil.checkPeriodDateTime (me, "refScnEtaFromDt", "refScnEtaToDt", me.MAX_PERIOD_DAY, true);
				if(!checkPeriodDate){
					return null;
				}				
			}

			params = {
				scn: inputScn,
				vslCallId: pVslCallId,
				//vslCd: inputVslCd,
				//vslNm: inputVslNm,
			}
			
			if(dateCondition != null){
				params["etaStart"] = dateCondition.fromDtString;
				params["etaEnd"] = dateCondition.toDtString;
			}
			
		} else if (Ext.isModern) {
			var inputStr = refs.refvesselCallList.getValue();
			if (inputStr == null || inputStr.trim().length < 4) {
				MessageUtil.warning('Warning', 'Search condition is at least 4 character');
				return null;
			}
			var inputVslCallId = (inputStr != null ? inputStr.toUpperCase() : inputStr);
			params = {
				vslCallId: inputVslCallId,
			}
		}
		return params;
	},

	// Returns the popup result.
	getReturnData: function (refGrid) {
		var me = this;
		var selection;
		var selectable;
		var returnItem;
		var grid = me.lookupReference(refGrid);
		selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if (selection === null) {
			return null;
		}

		if (refGrid == me.MAIN_GRID_REF_NAME) {
			var vslCallIdItem = me.pickupVesselItem(selection.data.scn);
			returnItem = {
				code: selection.data.scn,
				codeName: selection.data.scn,
				item: vslCallIdItem
			}

		} else {
			returnItem = {
				code: selection.data.scn,
				codeName: selection.data.scn,
				item: selection
			}
		}

		//Set Params on View again
		me.getView().recvData.scn = selection.data.scn;

		return returnItem;
	},

	/**
	 * Check: How many vessel with the specified SCN. If one => return it else return null
	 * */
	pickupVesselItem: function (scn) {
		var me = this;
		var store = me.getStore(me.SCN_VSL_DETAIL_STORE_NAME); //Master data store

		// Filter the store for records with the specified
		var matchingRecords = store.queryBy(function (record) {
			return record.get('scn') === scn;
		});

		if (matchingRecords.getCount() === 1) {
			return matchingRecords.getAt(0);
		} else {
			var scnItem = Ext.create('MOST.model.popup.VesselCallList');
			scnItem.set('scn', scn);
			scnItem.commit();
			return scnItem;
		}
	},

	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});