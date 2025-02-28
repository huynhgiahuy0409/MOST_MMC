Ext.define('MOST.view.document.TruckAssignmentOfROROController', {
	extend: 'MOST.view.foundation.BaseViewController',
	requires: [
	],
	alias: 'controller.truckAssignmentOfRORO',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refTruckAssignmentOfROROGrid',
	MAIN_STORE_NAME: 'truckAssignmentOfROROList',
	/**
	 * =========================================================================================================================
	 * CONSTANT END
	 */

	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onLoad: function () {
		var me = this;
		var refs = me.getReferences();
		var cargoTypeCombo = me.getStore('cargoTypeCombo');
		var searchParm = Ext.create('MOST.model.document.SearchTruckAssignmentOfROROParm');
		
		me.setSearchParm(searchParm);
		me.getViewModel().setData({ theSearch: searchParm });

		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		cargoTypeCombo.load();
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
		var store = me.getStore(me.MAIN_STORE_NAME);
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
					} else {
						me.getViewModel().setData({ theData: records });
					}
				}
			}
		});
	},
	
	onDblClick: function () {
		var me = this;
		var title = { type: 'bundle', key: 'assigningDriversAndTrucksForVehicle' };

		me.getView().detailViewAlias = 'app-assigningdriversandcartrucksforvehicleroroexport';
		me.openDetailPopup(null, title, false);
		
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelectionModel().getSelection()[0];

		me.getViewModel().setData({ theAssigning: selection });
		me.getAssignedDriversAndTrucksForVehicle(selection);
	},

	onClickOk: function (btn) {
		var me = this;
		
		btn.up('window').close();
		me.onSearch();
	},

	onAssigningDriversAndTrucksForVehicleAdd: function () {
		var me = this;
		var store = me.getStore('assignedDriversAndTrucks');
		var theVslInfo = me.getViewModel().get('theVslInfo');
		var theAssigning = me.getViewModel().get('theAssigning');
		var vslCd = theVslInfo.data.vslCd;
		var callSeq = theVslInfo.data.callSeq;
		var callYear = theVslInfo.data.callYear;
		var vslCallId = theVslInfo.data.vslCallId;
		var tsptCompCd = '';
		var shipgNoteNo = theAssigning.data.shipgNoteNo;
		var userId = Token.getUserId();
		var validate = true;
		var theAssignedDriversAndTrucks = me.getViewModel().get('assignedDriversAndTrucks');
		var tab = me.getReferences().refAssigningDriversAndTrucksForVehicle;
		var activeTab = tab.getActiveTab().activeTab;
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		updateParm.set('items', new Array());
		
		if (activeTab == 0) {
			var driverGrid = me.lookupReference('refAssigningDriversTabGrid');
			var selections = driverGrid.getSelection() == null ? null : driverGrid.getSelection();
			var truckNo = '';
			
			if (selections == null) return;
			
			for (var i = 0; i < theAssignedDriversAndTrucks.length; i++) {
				for (var j = 0; j < selections.length; j++) {
					var driverId = selections[j].data.driverId;
					
					if (driverId == theAssignedDriversAndTrucks[i].data.driverId) {
						validate = false;
					}
				}
			}
			
			if (validate) {
				for (var i = 0; i < selections.length; i++) {
					var item = Ext.create('MOST.model.document.TruckAssignmentOfRORO');
					var driverId = selections[i].data.driverId;
					var tsptCompCd = selections[i].data.tsptCompCd;
					
					item.set('vslCd', vslCd);
					item.set('callSeq', callSeq);
					item.set('callYear', callYear);
					item.set('vslCallId', vslCallId);
					item.set('tsptCompCd', tsptCompCd);
					item.set('truckNo', truckNo);
					item.set('driverId', driverId);
					item.set('shipgNoteNo', shipgNoteNo);
					item.set('userId', userId);
					item.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));

					updateParm.get('items').push(item.data);
				}
			}
		} else {
			var driverGrid = me.lookupReference('refAssigningTrucksTabGrid');
			var selections = driverGrid.getSelection() == null ? null : driverGrid.getSelection();
			var driverId = '';
			
			if (selections == null) return;
			
			for (var i = 0; i < theAssignedDriversAndTrucks.length; i++) {
				for (var j = 0; j < selections.length; j++) {
					var truckNo = selections[j].data.truckNo;
					
					if (truckNo == theAssignedDriversAndTrucks[i].data.truckNo) {
						validate = false;
					}
				}
			}
			
			if (validate) {
				for (var i = 0; i < selections.length; i++) {
					var item = Ext.create('MOST.model.document.TruckAssignmentOfRORO');
					var truckNo = selections[i].data.truckNo;
					var tsptCompCd = selections[i].data.tsptCompCd;
					
					item.set('vslCd', vslCd);
					item.set('callSeq', callSeq);
					item.set('callYear', callYear);
					item.set('vslCallId', vslCallId);
					item.set('tsptCompCd', tsptCompCd);
					item.set('truckNo', truckNo);
					item.set('driverId', driverId);
					item.set('shipgNoteNo', shipgNoteNo);
					item.set('userId', userId);
					item.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));

					updateParm.get('items').push(item.data);
				}
			}
		}
		
		if (validate) {
			updateParm.getProxy().url = store.getProxy().url;
			updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));

			updateParm.save({
				success: function (record, operation) {
					store.commitChanges();
					MessageUtil.saveSuccess();
					store.reload();
				}
			});
		} else {
			MessageUtil.warning('truckAssignmentOfRORO', 'data_assigned');
		}
	},

	onAssigningDriversAndTrucksForVehicleRemove: function () {
		var me = this;
		var grid = me.lookupReference('refAssignedDriversAndTrucksForVehicleROROExportGrid');
		var selections = grid.getSelection() == null ? null : grid.getSelection();
		
		if (!selections) {
			MessageUtil.warning("truckAssignmentOfRORO", "LASelectDelete");
			return;
		}

		MessageUtil.question('remove', 'infodelete_msg', null, function (button) {
			if (button === 'ok') {
				var store = me.getStore('assignedDriversAndTrucks');
				var item = me.getViewModel().get('theAssigning');
				var theVslInfo = me.getViewModel().get('theVslInfo');
				var shipgNoteNo = me.getViewModel().get('theAssigning').data.shipgNoteNo;
				var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
				
				updateParm.set('items', new Array());
				
				for (var i = 0; i < selections.length; i++) {
					var item = Ext.create('MOST.model.document.TruckAssignmentOfRORO');
					
					item.set('vslCallId', theVslInfo.data.vslCallId);
					item.set('driverId', selections[i].data.driverId);
					item.set('truckNo', selections[i].data.truckNo);
					item.set('shipgNoteNo', shipgNoteNo);
					item.set('userId', Token.getUserId());
					item.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));

					updateParm.get('items').push(item.data);
				}

				updateParm.getProxy().url = store.getProxy().url;
				updateParm.phantom = false;
				updateParm.drop();
				updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
				updateParm.save({
					success: function (record, operation) {
						store.commitChanges();
						store.reload();
					}
				});
			}
		});
	},

	onAssigningSearch: function () {
		var me = this;
		
		me.getDriversAssigningForVehicle();
		me.getTrucksAssigningForVehicle();
	},

	/**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */

	/**
	 * GENERAL METHOD START
	 * =========================================================================================================================
	 */
	getSearchCondition: function () {
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);

		params['vslCallId'] = StringUtil.toUpperCase(searchParm.get('vslCallId'));
		params['shipgNoteNo'] = StringUtil.toUpperCase(searchParm.get('shipgNoteNo'));
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;

		return params;
	},
	
	afterSetCodePopupData: function (xtype, targetControl, returnValue) {
		var me = this;
		var refs = me.getReferences();
		
		if (targetControl === 'ctlVslCallId') {
			if (returnValue) {
				me.getViewModel().setData({ theVslInfo: returnValue.item });
				me.getSnComboItems();
			}
			else {
				var snCombo = me.getStore('snCombo');

				me.getViewModel().setData({ theVslInfo: null });
				
				snCombo.loadData([], false);
				refs.ctlSnNo.reset();
			}
		}
	},
	
	getSnComboItems: function () {
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('theVslInfo');
		
		if (theVslInfo) {
			var snCombo = me.getStore('snCombo');
			
			snCombo.load({
				params: {
					vslCallId: theVslInfo.get('vslCallId')
				}
			});
		}
	},
	
	getAssignedDriversAndTrucksForVehicle: function (record) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('assignedDriversAndTrucks');
		var theVslInfo = me.getViewModel().get('theVslInfo');
		
		store.load({
			params: {
				shipgNoteNo: record.data.shipgNoteNo,
				vslCallId: theVslInfo.get('vslCallId')
			},
			callback: function (records, operation, success) {
				if (success) {
					me.getViewModel().setData({ assignedDriversAndTrucks: records });
				}
			}
		});
	},
	
	getTrucksAssigningForVehicle: function () {
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('theVslInfo');
		var store = me.getStore('assigningTrucksForVehicle');
		var tsptr = refs.refTsptr.getValue();
		var setTsptr = me.splitString(tsptr);
		
		store.load({
			params: {
				truckNo: StringUtil.toUpperCase(refs.refTruckNo.getValue()),
				tsptr: setTsptr
			},
			callback: function (records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
					}
				}
			}
		});
	},

	getDriversAssigningForVehicle: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('assigningDriversForVehicle');
		var tsptr = refs.refTsptr.getValue();
		var setTsptr = me.splitString(tsptr);
		
		store.load({
			params: {
				tsptr: setTsptr,
				driverNm: StringUtil.toUpperCase(refs.refDriverNm.getValue()),
			},
			callback: function (records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
					}
				}
			}
		});
	},
	
	splitString: function (string) {
		var splitedString = '';
		
		if (!StringUtil.isNullorEmpty(string)) {
			splitString = string.replace(/\s/gi, "").split(',');
			if (splitString.length > 0) {
				if (splitString.length == 1) {
					splitedString = "'" + splitString[0] + "'";
				} else {
					for (var i = 0; i < splitString.length; i++) {
						if (splitedString === '') {
							splitedString = "'" + splitString[i] + "'";
						} else {
							splitedString += ",'" + splitString[i] + "'";
						}
					}
				}
			}
		}
		return splitedString;
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});

