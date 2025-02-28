Ext.define('MOST.view.document.DeliveryOrderOfVehicleController', {
	extend: 'MOST.view.foundation.BaseViewController',
	requires: [
	],
	alias: 'controller.deliveryOrderOfVehicle',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refDeliveryOrderOfVehicleGrid',
	MAIN_STORE_NAME: 'listOfDeliveryOrderOfVehicle',
	cgIndex: 0,
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
		var searchParm = Ext.create('MOST.model.document.SearchDeliveryOrderOfVehicleParm');

		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({ theSearch: searchParm });

		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');

		refs.btnAdd.setDisabled(true);
		refs.btnUpdate.setDisabled(true);
		refs.btnRemove.setDisabled(true);
		refs.ctlAssinTrans.setDisabled(true);
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
		var cgGrid = me.lookupReference(me.MAIN_GRID_REF_NAME);
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
					else {
						cgGrid.getSelectionModel().select(me.cgIndex);
						me.onCellClick();
					}
				}
			}
		});
	},
	
	onCellClick: function (gridview, tdEl, cellIndex, record, trEl, rowIndex, e) {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if (selection == null) return;
		
		me.cgIndex = grid.store.indexOf(selection);
		me.getViewModel().setData({ theDO: selection });
		me.getSubDeliveryOrderOfVehicleItems(selection);

		refs.btnAdd.setDisabled(false);
		refs.btnUpdate.setDisabled(true);
		refs.btnRemove.setDisabled(true);
	},
	
	getSubDeliveryOrderOfVehicleItems: function (record) {
		var me = this;
		var refs = me.getReferences();
		
		if (record) {
			var sdoStore = me.getStore('listOfSubDeliveryOrderOfVehicle');
			sdoStore.load({
				params: {
					vslCallId: record.get('vslCallId'),
					blNo: record.get('blNo')
				},
				callback: function (records, operation, success) {
					if (success) {
					}
				}
			});
		}
	},
	
	updateExpectedDate: function (value) {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refSubDeliveryOrderOfVehicle');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if (!selection) return;

		selection.set('estArrvTime', Ext.Date.format(value, MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
	},
	
	onSubGridCellClick: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refSubDeliveryOrderOfVehicle');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if (selection == null) return;
		
		me.getViewModel().setData({ theSubDO: selection });
		
//		refs.ctlExpectedDate.setValue(Ext.Date.parse(selection.get('estArrvTime'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
//		refs.btnAdd.setDisabled(true);
//		refs.btnUpdate.setDisabled(false);
//		refs.btnRemove.setDisabled(false);
		refs.ctlAssinTrans.setDisabled(false);
	},

	onClear: function () {
		var me = this;
		var refs = me.getReferences();
		
//		refs.ctlQty.setValue('');
//		refs.ctlExpectedDate.setValue('');
//		refs.ctlPartnerCodeMultiField.setValue('');
	},

	onAdd: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var theVslInfo = me.getViewModel().get('theVslInfo');
		var item = Ext.create('MOST.model.document.DeliveryOrderOfVehicle');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if (selection == null) return;
		
		item.set('vslCd', theVslInfo.get('vslCd'));
		item.set('callYear', theVslInfo.get('callYear'));
		item.set('callSeq', theVslInfo.get('callSeq'));
		item.set('vslCallId', theVslInfo.get('vslCallId'));
		item.set('blNo', selection.data.blNo);
		item.set('nosOfVin', theVslInfo.get('nosOfVin'));
		item.set('ptnrCd', MOST.config.Token.getPtnrCode());
		item.set('userId', Token.getUserId());
		item.set('tsptr', refs.ctlPartnerCodeMultiField.getValue());
		item.set('estArrvTime', Ext.Date.format(refs.ctlExpectedDate.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));

		if (refs.ctlQty.getValue() > selection.data.vinRemain) {
			MessageUtil.warning('deliveryOrderOfVehicle', 'qtyMustLessThanRemain');
		} else {
			if (refs.ctlExpectedDate.getValue() == null || refs.ctlQty.getValue() == '' || refs.ctlPartnerCodeMultiField.getValue() == '') {
				MessageUtil.warning('deliveryOrderOfVehicle', 'missedValue');
			} else {
				var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
				
				updateParm.getProxy().url = store.getProxy().url;
				updateParm.set('items', new Array());

				updateParm.get('items').push(item.data);
				updateParm.save({
					success: function (record, operation) {
						store.commitChanges();
						MessageUtil.saveSuccess();
						me.onClear();
						me.onSearch();
					}
				});
			}
		}
	},

	onRemove: function () {
		var me = this;
		var grid = me.lookupReference('refSubDeliveryOrderOfVehicle');
		var selection = grid.getSelectionModel().getSelection()[0];
		
		if (!selection) {
			MessageUtil.warning("deliveryOrderOfVehicle", "LASelectDelete");
			return;
		}
		
		MessageUtil.question('remove', 'infodelete_msg', null, function (button) {
			if (button === 'ok') {
				var store = me.getStore(me.MAIN_STORE_NAME);
				var item = me.getViewModel().get('theSubDO');
				var theVslInfo = me.getViewModel().get('theVslInfo');
				var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
				
				item.set('vslCallId', theVslInfo.data.vslCallId);
				item.set('doNo', selection.data.doNo);
				item.set('userId', Token.getUserId());
				item.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
				
				updateParm.getProxy().url = store.getProxy().url;
				updateParm.phantom = false;
				updateParm.drop();
				updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
				updateParm.set('items', new Array());

				updateParm.get('items').push(item.data);
				updateParm.save({
					success: function (record, operation) {
						store.commitChanges();
						MessageUtil.saveSuccess();
						me.onClear();
						me.onSearch();
					}
				});
			}
		});
	},

	onUpdate: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refSubDeliveryOrderOfVehicle');
		var store = me.getStore(me.MAIN_STORE_NAME);
		var item = me.getViewModel().get('theSubDO');
		var selection = grid.getSelectionModel().getSelection()[0];
		var theVslInfo = me.getViewModel().get('theVslInfo');
		
		item.set('vslCallId', theVslInfo.data.vslCallId);
		item.set('doNo', selection.data.doNo);
		item.set('nosOfVin', refs.ctlQty.getValue());
		item.set('tsptr', refs.ctlPartnerCodeMultiField.getValue());
		item.set('userId', Token.getUserId());
		item.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		item.set('estArrvTime', Ext.Date.format(refs.ctlExpectedDate.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));

		if (refs.ctlExpectedDate.getValue() == null 
				|| refs.ctlExpectedDate.getValue() == ''
				|| item.get('estArrvTime') == ''
			    || refs.ctlQty.getValue() == null
				|| refs.ctlQty.getValue() == '') {
			MessageUtil.warning('deliveryOrderOfVehicle', 'missedValue');
		} else {
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			
			updateParm.getProxy().url = store.getProxy().url;
			updateParm.phantom = false;
			updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
			updateParm.set('items', new Array());

			updateParm.get('items').push(item.data);
			updateParm.save({
				success: function (record, operation) {
					store.commitChanges();
					MessageUtil.saveSuccess();
					me.onClear();
					me.onSearch();
				}
			});
		}
	},

	openAssignDriversAndTruckForVehiclePopup: function () {
		var me = this;
		var title = { type: 'bundle', key: 'assigningDriversAndTrucksForVehicle' };
		
		me.getView().detailViewAlias = 'app-assigningdriversandcartrucksforvehicle';
		me.openDetailPopup(null, title, false);
		
		var grid = me.lookupReference('refSubDeliveryOrderOfVehicle');
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
		var theDO = me.getViewModel().get('theDO');
		var vslCd = theVslInfo.data.vslCd;
		var callSeq = theVslInfo.data.callSeq;
		var callYear = theVslInfo.data.callYear;
		var vslCallId = theVslInfo.data.vslCallId;
		var theSubDO = me.getViewModel().get('theSubDO');
		var tsptCompCd = '';
		var blNo = theDO.data.blNo;
		var doNo = theSubDO.data.doNo;
		var sdoNo = theSubDO.data.subDoNo;
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
					var item = Ext.create('MOST.model.document.DeliveryOrderOfVehicle');
					var driverId = selections[i].data.driverId;
					var tsptCompCd = selections[i].data.tsptCompCd;
					
					item.set('vslCd', vslCd);
					item.set('callSeq', callSeq);
					item.set('callYear', callYear);
					item.set('vslCallId', vslCallId);
					item.set('tsptCompCd', tsptCompCd);
					item.set('truckNo', truckNo);
					item.set('driverId', driverId);
					item.set('blNo', blNo);
					item.set('doNo', doNo);
					item.set('subDoNo', sdoNo);
					item.set('userId', userId);
					item.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));

					updateParm.get('items').push(item.data);
				}
			}
		} else {
			var driverGrid = me.lookupReference('refAssigningTrucksTabGrid');
			var selection = driverGrid.getSelection() == null ? null : driverGrid.getSelection()[0];
			var selections = driverGrid.getSelection() == null ? null : driverGrid.getSelection();
			var driverId = '';
			
			if (selection == null) return;
			
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
					var item = Ext.create('MOST.model.document.DeliveryOrderOfVehicle');
					var truckNo = selections[i].data.truckNo;
					var tsptCompCd = selections[i].data.tsptCompCd;
					
					item.set('vslCd', vslCd);
					item.set('callSeq', callSeq);
					item.set('callYear', callYear);
					item.set('vslCallId', vslCallId);
					item.set('tsptCompCd', tsptCompCd);
					item.set('truckNo', truckNo);
					item.set('driverId', driverId);
					item.set('blNo', blNo);
					item.set('doNo', doNo);
					item.set('subDoNo', sdoNo);
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
				success: function (records, operation) {
					store.commitChanges();
					MessageUtil.saveSuccess();
					store.reload();
				}
			});
		} else {
			MessageUtil.warning('deliveryOrderOfVehicle', 'data_assigned');
		}
	},

	onAssigningDriversAndTrucksForVehicleRemove: function () {
		var me = this;
		var grid = me.lookupReference('refAssignedDriversAndTrucksForVehicleGrid');
		var selections = grid.getSelection() == null ? null : grid.getSelection();
		
		if (!selections) {
			MessageUtil.warning("deliveryOrderOfVehicle", "LASelectDelete");
			return;
		}

		MessageUtil.question('remove', 'infodelete_msg', null, function (button) {
			if (button === 'ok') {
				var store = me.getStore('assignedDriversAndTrucks');
				var theVslInfo = me.getViewModel().get('theVslInfo');
				var doNo = me.getViewModel().get('theSubDO').data.doNo;
				var sdoNo = me.getViewModel().get('theSubDO').data.subDoNo;
				var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
				
				updateParm.set('items', new Array());
				
				for (var i = 0; i < selections.length; i++) {
					var item = Ext.create('MOST.model.document.DeliveryOrderOfVehicle');
					
					item.set('vslCallId', theVslInfo.data.vslCallId);
					item.set('driverId', selections[i].data.driverId);
					item.set('truckNo', selections[i].data.truckNo);
					item.set('doNo', doNo);
					item.set('subDoNo', sdoNo);
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

		params['vslCallId'] = StringUtil.toUpperCase(searchParm.data.vslCallId);
		params['blNo'] = StringUtil.toUpperCase(searchParm.data.blNo);
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
				me.getBlComboItems();
			}else {
				me.getViewModel().setData({ theVslInfo: null });
				var blCombo = me.getStore('blCombo');
				blCombo.loadData([], false);
				refs.ctlBlNo.reset();
			}
		}
	},
	
	getBlComboItems: function () {
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('theVslInfo');
		
		if (theVslInfo) {
			var blCombo = me.getStore('blCombo');
			
			blCombo.load({
				params: {
					vslCallId: theVslInfo.get('vslCallId')
				},
				callback: function (records, operation, success) {
					if (success) {
						if (records.length > 0) {
							blCombo.insert(0, [{ blNo: 'Select', blNo: '' }]);
						}
					}
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
				doNo: record.data.doNo,
				subDoNo: record.data.subDoNo,
				vslCallId: theVslInfo.get('vslCallId')
			},
			callback: function (records, operation, success) {
				if (success) {
					me.getViewModel().setData({ assignedDriversAndTrucks: records });
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

	getTrucksAssigningForVehicle: function () {
		var me = this;
		var refs = me.getReferences();
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
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});

