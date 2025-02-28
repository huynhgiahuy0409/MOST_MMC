Ext.define('MOST.view.operation.TheListOfDamageCheckOfROROController', {
	extend: 'MOST.view.foundation.BaseViewController',
	requires: [
	],
	alias: 'controller.theListOfDamageCheckOfRORO',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */

	/**
	 * =========================================================================================================================
	 * CONSTANT END
	 */
	MAX_PERIOD_DAY: 14,
	MAX_DATE_ALLOW: 14,
	NON_CALL_ID: CommonConstants.NON_CALL_ID,
	MAIN_GRID_REF_NAME: 'refTheListOfDamageCheckOfROROGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'theListOfDamageCheckOfRORO',
	FILE_UPLOAD_REF_NAME : 'refRoRoFileUpload',
	FILE_UPLOAD_STORE_NAME :'uploadedRoRoFileDamageStore',
	cgIndex: 0,
	
	SCREEN_MODE: '',
	VSL_CALL_ID: '',

	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onLoad: function () {
		var me = this;
		var refs = me.getReferences();
		me.setDateInDays("ctlCheckTimeFromDt", -7);
		var searchParm = Ext.create('MOST.model.operation.SearchTheListOfDamageCheckOfROROParm');
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({ theSearch: searchParm });

		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		var categoryCombo = me.getStore('categoryCombo');
		categoryCombo.load();

	},

	/**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * DETAIL INITIALIZE START
	 */
	onDetailLoad:function(){
		var me = this;
		var refs = me.getReferences();
		
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
		//refresh data
		var gridStore = me.getStore('roroDamageCheckDetail');
		gridStore.removeAll();
		var fileUpload = me.getStore(me.FILE_UPLOAD_STORE_NAME);
		fileUpload.removeAll();
		
		me.getViewModel().setData({ theVslInfo: null});
		
		var searchParm = Ext.create('MOST.model.operation.SearchTheListOfDamageCheckOfROROParm');
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({ theRORODamageSearch: searchParm });
		me.getViewModel().setData({ theUnitInfo: null });
		
		me.getComboBoxRORODamageCheck();
		
		if(me.SCREEN_MODE == 'C'){
			me.getInvList();
			me.getDmgList();
			
			if(me.VSL_CALL_ID) {
				refs.ctlVsl.setValue(me.VSL_CALL_ID);
				me.getVesselInfo(me.VSL_CALL_ID);
			}
		} else {
			var store = this.getStore('roroDamageCheckDetail');		
			var params = {
				vslCallId: recvData.data.vslCallId,
				cgNo: recvData.data.cgNo,
				unitNo: recvData.data.unitNo,
				pgmId: FileConstant.RORODAMAGECHECK_SCREEN_PGM_ID
			};
			store.load({
				params: params,
				callback: function (records, operation, success) {
					if (success) {
						me.getViewModel().setData({ theUnitInfo: recvData.data });
						me.getViewModel().setData({ damageCheckItems: records });
						me.onGetFileUpload();
						
						var item = me.getStore('roroDamageCheckDetail');
						item.setData(records[0].data.items);
						item.commitChanges();
						
					}
				}
			});
			
			me.getInvList(params);
			me.getVesselInfo(recvData.data.vslCallId);
		}
	},
	/**
	 * =========================================================================================================================
	 * DETAIL INITIALIZE END
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
					}
				}
			}
		});
	},

	onTblDamage: function(){
		var me = this;
		var refs = me.getReferences();
		me.SCREEN_MODE = 'C';
		me.VSL_CALL_ID =  refs.ctlVslCallId.getValue();
		
		me.getView().detailViewAlias = 'app-rorodamagecheck';
		var title = { type: 'bundle', key: 'roroDamageCheck' };
		me.openDetailPopup(null, title, false);
	},
	
	onDetailRORODamageCheck: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refTheListOfDamageCheckOfROROGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if (selection == null) return;

		me.SCREEN_MODE = 'U';
		me.getView().detailViewAlias = 'app-rorodamagecheck';
		var title = { type: 'bundle', key: 'roroDamageCheck' };
		me.openDetailPopup(selection, title, false);
	},

	getComboBoxRORODamageCheck: function () {
		var me = this;
		var theDamageLevelsStore = me.getStore('theDamageLevels');
		var theDamagePartsStore = me.getStore('theDamageParts');
		theDamageLevelsStore.load({
			callback: function (records, operation, success) {
				if (success) {
					theDamageLevelsStore.insert(0, [{ invNm: 'Select', invCd: '' }]);
				}
			}
		});

		theDamagePartsStore.load({
			callback: function (records, operation, success) {
				if (success) {
					theDamagePartsStore.insert(0, [{ invNm: 'Select', invCd: '' }]);
				}
			}
		});
	},

	onDateChange: function (control, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();

		if (control == refs.ctlCheckTimeFromDt) {
			me.setDateInDaysByDate("ctlCheckTimeToDt", me.MAX_PERIOD_DAY, control.getValue());
		} else {
			me.setDateInDaysByDate("ctlCheckTimeFromDt", -me.MAX_PERIOD_DAY, control.getValue());
		}
	},

	afterSetCodePopupData: function (xtype, targetControl, returnValue) {
		var me = this;
		var refs = me.getReferences();
		if (targetControl === 'ctlVslCallId') {
			if (returnValue) {
				me.getBlComboItems();
				me.getSnJPVCComboItems();
			}
			else {
				var blCombo = me.getStore('blCombo');
				blCombo.loadData([], false);
				refs.ctlBlNo.reset();
			}
		}
		if (targetControl === 'ctlVsl') {
			if (returnValue) {
				me.getViewModel().setData({ theVslInfo: returnValue.item });
			} else {
				me.getViewModel().setData({ theVslInfo: null});
			}
		}
		else {
			if (returnValue) {
				me.getViewModel().setData({ theUnitInfo: returnValue.item.data });
			}
		}
	},

	getBlComboItems: function () {
		var me = this;
		var refs = me.getReferences();
		var blCombo = me.getStore('blCombo');
		var searchParm = me.getViewModel().get('theSearch');
		blCombo.load({
			params: {
				vslCallId: searchParm.data.vslCallId
			},

			callback: function (records, operation, success) {
				if (success) {
				}
			}
		});
	},
	
	getSnJPVCComboItems: function () {
		var me = this;
		var refs = me.getReferences();
		var snCombo = me.getStore('snCombo');
		var searchParm = me.getViewModel().get('theSearch');
		snCombo.load({
			params: {
				vslCallId: searchParm.data.vslCallId
			},

			callback: function (records, operation, success) {
				if (success) {
				}
			}
		});
	},

	onDetailSave: function () {
		var me = this;
		var refs = me.getReferences();
		me.onUpload();
	},
	
	saveProcess: function () {
		var me = this;
		var refs = me.getReferences();
		var unitItem = me.getViewModel().get('theUnitInfo');
		var arrDamage = new Array();
		var storeDamage = me.getStore('roroDamageCheckDetail');
		var dmgItem = Ext.create('MOST.model.operation.TheListOfDamageCheckOfRORO');
		var currentUploadStore = me.getStore(me.FILE_UPLOAD_STORE_NAME);
		var uploadList = new Array();

		storeDamage.getData().getRange().forEach(function (record, index, array) {
			if (record.get('workingStatus') != WorkingStatus.DELETE) {
				record.set('vslCallId', unitItem.vslCallId);
				record.set('vslCd', unitItem.vslCd);
				record.set('callSeq', unitItem.callSeq);
				record.set('callYear', unitItem.callYear);
				record.set('docNo', unitItem.docNo);
				record.set('cgNo', unitItem.cgNo);
				record.set('unitNo', unitItem.unitNo);
				record.set('ixCd', unitItem.ixCd);
				record.set('catgCd', unitItem.catgCd);
				record.set('dmgChkCd', 'DMG');
				record.set('locCd', record.data.locCd);
				record.set('dmgPart', record.data.dmgPart);
				record.set('dmgLevel', record.data.dmgLevel);
				record.set('brandCd', unitItem.brandCd);
				record.set('modelCd', unitItem.modelCd);
				record.set('userId', Token.getUserId());
			}
			arrDamage.push(record.data);
		});
		
		if(currentUploadStore.data.length > 0){
			// File Upload CREATE, UPDATE RECORD
			currentUploadStore.getModifiedRecords().forEach(function(record, index, array){
				record.set('fileStream', null);
				record.set('userId', MOST.config.Token.getUserId());
				record.set('workingStatus', WorkingStatus.INSERT);
				uploadList.push(record.data);
			});

			// File Upload DELETE RECORD
			currentUploadStore.getRemovedRecords().forEach(function(record, index, array){
				record.set('workingStatus', WorkingStatus.DELETE);
				uploadList.push(record.data);
			});
		}

		if (arrDamage.length == 0) {
			dmgItem.set('vslCallId', unitItem.vslCallId);
			dmgItem.set('vslCd', unitItem.vslCd);
			dmgItem.set('callSeq', unitItem.callSeq);
			dmgItem.set('callYear', unitItem.callYear);
			dmgItem.set('docNo', unitItem.docNo);
			dmgItem.set('cgNo', unitItem.cgNo);
			dmgItem.set('unitNo', unitItem.unitNo);
			dmgItem.set('ixCd', unitItem.ixCd);
			dmgItem.set('catgCd', unitItem.catgCd);
			dmgItem.set('dmgChkCd', 'DMG');
			dmgItem.set('workingStatus', WorkingStatus.DELETE);
			dmgItem.set('uploadItems', uploadList);
			dmgItem.set('userId', MOST.config.Token.getUserId());
			
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			updateParm.getProxy().url = storeDamage.getProxy().url;
			updateParm.phantom = false;
			updateParm.drop();
			updateParm.set('workingStatus', WorkingStatus.DELETE);			
			updateParm.set('items', new Array());
			updateParm.get('items').push(dmgItem.data);
			updateParm.save({
				success: function (records) {
					storeDamage.commitChanges();
					me.onClearDamage();
					storeDamage.reload();
					MessageUtil.saveSuccess();
					me.onSearch();

				}
			});
		}

		if (arrDamage.length > 0) {
			dmgItem.set("items", arrDamage);
			dmgItem.set('remark', refs.ctlRemark.getValue());
			dmgItem.set('uploadItems', uploadList);
			dmgItem.set('workingStatus', WorkingStatus.INSERT);
			dmgItem.set('userId', MOST.config.Token.getUserId());
			
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			updateParm.getProxy().url = storeDamage.getProxy().url;
			updateParm.set('workingStatus', WorkingStatus.INSERT);
			updateParm.set('items', new Array());
			updateParm.get('items').push(dmgItem.data);
			updateParm.save({
				success: function (records) {
					storeDamage.commitChanges();
					me.onClearDamage();
					MessageUtil.saveSuccess();
					me.onSearch();
					me.onGetFileUpload();
				}
			});
		}
	},

	onAddDamageDetail: function () {
		var me = this;
		var refs = me.getReferences();
		var detailGrid = me.lookupReference('refRORODamageCheckGrid');
		var store = me.getStore('roroDamageCheckDetail');
		var record = Ext.create('MOST.model.operation.TheListOfDamageCheckOfRORO');
		var locNm = '';
		if(refs.ctlTypeOfLocation.getValue().location_radio == 'VSL') {
			locNm = 'Vessel';
		} else if(refs.ctlTypeOfLocation.getValue().location_radio == 'YARD') {
			locNm = 'Yard';
		} else {
			locNm = 'Gate';
		}
		
		var locCd = refs.ctlTypeOfLocation.getValue().location_radio;
		var dmgPart = refs.ctlTheDamagePart.getValue();
		var dmgLevel = refs.ctlTheDamageLevel.getValue();
		//Clear filter for Grid
		detailGrid.filters.clearFilters();
		detailGrid.filters.disable();

		//Clear filter for Store
		store.clearFilter();
		if (refs.ctlTheDamagePart.getValue() == null || refs.ctlTheDamageLevel.getValue() == null || refs.ctlBLSN.getValue() == '' || refs.ctlUnitNo.getValue() == '') {
			MessageUtil.warning('theListOfDamageCheckOfRORO', 'missedValue');
		} else {
			var idx = 0;

			if (detailGrid.getSelection() && detailGrid.getSelection().length > 0) {
				idx = store.indexOfId(detailGrid.getSelection()[0].get('id'));
			}
			record.set('dmgPartNm', refs.ctlTheDamagePart.displayTplData[0].invNm);
			record.set('dmgLevelNm', refs.ctlTheDamageLevel.displayTplData[0].invNm);
			record.set('locNm', locNm);
			record.set('dmgPart', dmgPart);
			record.set('dmgLevel', dmgLevel);
			record.set('locCd', locCd);

			var validate = true;
			store.getData().getRange().forEach(function (record, index, array) {
				if (locCd == record.data.locCd && dmgPart == record.data.dmgPart && dmgLevel == record.data.dmgLevel) {
					validate = false;
				}
			});
			if (validate) {
				store.insert(idx, record);
				detailGrid.getSelectionModel().select(record);

				me.onClearDamage();
			} else {
				MessageUtil.warning('roroDamageCheck', 'duplicatedata_msg');
			}
		}
	},

	onUpdateDamageDetail: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('roroDamageCheckDetail');
		var grid = me.lookupReference('refRORODamageCheckGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var locNm = '';
		if(refs.ctlTypeOfLocation.getValue().location_radio == 'VSL') {
			locNm = 'Vessel';
		} else if(refs.ctlTypeOfLocation.getValue().location_radio == 'YARD') {
			locNm = 'Yard';
		} else {
			locNm = 'Gate';
		}
		
		var locCd = refs.ctlTypeOfLocation.getValue().location_radio;
		var dmgPart = refs.ctlTheDamagePart.getValue();
		var dmgLevel = refs.ctlTheDamageLevel.getValue();
		var validate = true;
		store.getData().getRange().forEach(function (record, index, array) {
			if (locCd == record.data.locCd && dmgPart == record.data.dmgPart && dmgLevel == record.data.dmgLevel) {
				validate = false;
			}
		});
		if (validate) {
			selection.set('dmgPartNm', refs.ctlTheDamagePart.displayTplData[0].invNm);
			selection.set('dmgLevelNm', refs.ctlTheDamageLevel.displayTplData[0].invNm);
			selection.set('locNm', locNm);
			selection.set('dmgPart', dmgPart);
			selection.set('dmgLevel', dmgLevel);
			selection.set('locCd', locCd);
		} else {
			MessageUtil.warning('roroDamageCheck', 'duplicatedata_msg');
		}

	},

	getVesselInfo: function (vslCallId) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('JPVCPopupStore');
		var params;
		params = {
			vslCallId: vslCallId,
		}
		store.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					me.getViewModel().setData({ theVslInfo: records[0]});
//					refs.ctlVsl.setValue(records[0].data.vslCallId);
//					refs.ctlVesselCode.setValue(records[0].data.vslCd);
//					refs.ctlVesselName.setValue(records[0].data.vslNm);
//					refs.ctlASA.setValue(records[0].data.arrvSaId);
//					refs.ctlETA.setValue(records[0].data.eta);
//					refs.ctlBerthingLoc.setValue(records[0].data.berthLoc);
//					refs.ctlETD.setValue(records[0].data.etd);
					refs.ctlVsl.setDisabled(true);
					refs.ctlUnitNo.setDisabled(true);

				}
			}
		});
	},

	getInvList: function (params) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('roroDamageCheckInventory');
		store.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {

				}
			}
		});
	},

	getDmgList: function (params) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('roroDamageCheckDetail');
		store.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					me.getViewModel().setData({ damageCheckItems: records });
				}
			}
		});
	},

	onClickRORODamageCheck: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refRORODamageCheckGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		refs.ctlTheDamagePart.setValue(selection.data.dmgPart);
		refs.ctlTheDamageLevel.setValue(selection.data.dmgLevel);
		refs.ctlTypeOfLocation.setValue({ location_radio: selection.data.locCd });
		refs.ctlDamageCheckUpdate.setDisabled(false);
		refs.ctlDamageCheckRemove.setDisabled(false);
	},

	openUnitNoPopupDamage: function () {
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theRORODamageSearch');
		searchParm['vslCallId'] = refs.ctlVsl.getValue();
		me.openCodePopup('popup-findunitnopopup', 'ctlUnitNo', searchParm);
		//me.openCodePopup('popup-unitnopopup', 'ctlUnitNo', searchParm);
	},

	onUnitPopupLoad: function () {

		var me = this;
		var refs = me.getReferences();

		var store = this.getStore('cargoPopupItems');
		var cgGrid = me.lookupReference('refCargoPopupGrid');

		var searchParm = me.getViewModel().get('theRORODamageSearch');

		store.load({
			params: {
				vslCallId: StringUtil.toUpperCase(searchParm.data.vslCallId),
			},
			callback: function (records, operation, success) {
				if (success) {
					if (records && records.length > 0) {
						cgGrid.getSelectionModel().select(me.cgIndex);
						me.onCellClick();
					}
				}
			}
		});
	},

	onCellClick: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refCargoPopupGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var vslCallId = selection.data.vslCallId;
		var cgNo = selection.data.cgNo;
		var store = this.getStore('unitPopupItems');
		store.load({
			params: {
				vslCallId: vslCallId,
				cgNo: cgNo
			},
			callback: function (records, operation, success) {
				if (success) {
				}
			}
		});
	},

	onUnitPopupDblClick: function () {
		var me = this;
		var window = me.getView().up('window');

		window.returnValue = me.getReturnData();
		window.close();
	},

	getReturnData: function (eOpts) {
		var me = this;
		var grid = me.lookupReference('refUnitItems');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var returnItem = {
			code: selection.data.unitNo,
			item: selection
		}

		return returnItem;
	},

	onUnitPopupSearch: function () {
		var me = this;
		var store = me.getStore('cargoPopupItems');
		var cgGrid = me.lookupReference('refCargoPopupGrid');
		var params = me.getUnitPopupSearchCondition();

		if (params == null) {
			return;
		}

		store.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					if (records && records.length > 0) {
						cgGrid.getSelectionModel().select(me.cgIndex);
						me.onCellClick();
					}
				}
			}
		});
	},

	onDamageCheckRemove: function () {
		var me = this;
		refs = me.getReferences();
		var grid = me.lookupReference('refRORODamageCheckGrid');
		var refs = me.getReferences();

		MessageUtil.question('remove', 'infodelete_msg', null, function (button) {
			if (button === 'ok') {
				var storeDamage = me.getStore('roroDamageCheckDetail');
				var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
				//storeDamage.remove(selection);
				//me.onDetailSave();
				selection.set('workingStatus', WorkingStatus.DELETE);
				var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
				updateParm.getProxy().url = storeDamage.getProxy().url;
				updateParm.phantom = false;
				updateParm.drop();
				updateParm.set('workingStatus', WorkingStatus.DELETE);			
				updateParm.set('items', new Array());
				updateParm.get('items').push(selection.data);
				updateParm.save({
					success: function (records) {
						storeDamage.commitChanges();
						me.onClearDamage();
						storeDamage.reload();
						MessageUtil.saveSuccess();
						me.onSearch();

					}
				});
			}
		});
	},

	onClearDamage: function () {
		var me = this;
		var refs = me.getReferences();

		refs.ctlTheDamagePart.setValue();
		refs.ctlTheDamageLevel.setValue();

		refs.ctlTypeOfLocation.setValue({ location_radio: 'VSL' });
	},

	onDbClickROROInv: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refRORODamageCheckInventoryGrid');

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if (selection == null) return;

		//me.setInvGridColumnEditable(selection.phantom);
	},

	setInvGridColumnEditable: function (isCreate) {
		var me = this;
		var refs = me.getReferences();

		if (isCreate) { //ADD
			refs.refRORODamageCheckInventory.getEditor().setEditable(true);
			refs.refRORODamageCheckInventory.getEditor().setDisabled(false);
		} else {		//UPDATE
			refs.refRORODamageCheckInventory.getEditor().setEditable(false);
			refs.refRORODamageCheckInventory.getEditor().setDisabled(true);
		}
	},
	
	onCancelEdit: function (rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},

	onROROInvEdit: function (editor, context) {
		var me = this;
		var refs = me.getReferences();
		if (refs.ctlBLSN.getValue() == '' || refs.ctlUnitNo.getValue() == '') {
			MessageUtil.warning('theListOfDamageCheckOfRORO', 'missedValue');
		}
		else {
			var store = me.getStore('roroDamageCheckInventory');
			var unitItem = me.getViewModel().get('theUnitInfo');
			var workingStatus = WorkingStatus.convertInt(WorkingStatus.INSERT);
			var isCreated = true;
			var checkInventory = me.getStore('checkRoRoInventory');
			checkInventory.load({
				params: {
					vslCallId: unitItem.vslCallId,
					invCd: context.record.data.invCd,
					unitNo: unitItem.unitNo,
					cgNo: unitItem.cgNo,
				},
				callback: function (records, operation, success) {
					if (success) {
						if (records && records.length > 0) {
							var invItem = Ext.create('MOST.model.operation.TheListOfDamageCheckOfRORO');
							invItem.set('vslCallId', unitItem.vslCallId);
							invItem.set('docNo', unitItem.docNo);
							invItem.set('cgNo', unitItem.cgNo);
							invItem.set('unitNo', unitItem.unitNo);
							invItem.set('invCd', context.record.data.invCd);
							invItem.set('invCnt', context.record.data.invCnt);
							invItem.set('userId', Token.getUserId());
							var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
							updateParm.getProxy().url = store.getProxy().url;
							updateParm.phantom = false;

							updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
							updateParm.set('items', new Array());

							updateParm.get('items').push(invItem.data);
							updateParm.save({
								success: function (records, operation) {
									store.commitChanges();
									MessageUtil.saveSuccess();
									me.onClearDamage();
									store.reload();
									me.onSearch();
								}
							});
						}
						else {
							var invItem = Ext.create('MOST.model.operation.TheListOfDamageCheckOfRORO');
							invItem.set('vslCallId', unitItem.vslCallId);
							invItem.set('vslCd', unitItem.vslCd);
							invItem.set('callSeq', unitItem.callSeq);
							invItem.set('callYear', unitItem.callYear);
							invItem.set('docNo', unitItem.docNo);
							invItem.set('cgNo', unitItem.cgNo);
							invItem.set('unitNo', unitItem.unitNo);
							invItem.set('ixCd', unitItem.ixCd);
							invItem.set('catgCd', unitItem.catgCd);
							invItem.set('dmgChkCd', 'INV');
							invItem.set('locCd', null);
							invItem.set('dmgPart', null);
							invItem.set('dmgLevel', null);
							invItem.set('invCd', context.record.data.invCd);
							invItem.set('invCnt', context.record.data.invCnt);
							invItem.set('cdNum', context.record.data.cdNum);
							invItem.set('brandCd', unitItem.brandCd);
							invItem.set('modelCd', unitItem.modelCd);
							invItem.set('remark', refs.ctlRemark.getValue());
							invItem.set('userId', Token.getUserId());
							var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
							updateParm.getProxy().url = store.getProxy().url;
							// updateParm.phantom = false;

							// updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
							updateParm.set('items', new Array());

							updateParm.get('items').push(invItem.data);
							updateParm.save({
								success: function (records, operation) {
									store.commitChanges();
									MessageUtil.saveSuccess();
									me.onClearDamage();
									var params = {
										vslCallId: records.data.items[0].vslCallId,
										cgNo: records.data.items[0].cgNo,
										unitNo: records.data.items[0].unitNo,
									};
									me.getInvList(params);
									me.onSearch();
								}
							});
						}
					}
				}
			});

		}

	},
	
	onAddFile_clickHandler : function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.FILE_UPLOAD_STORE_NAME);
    	var input = document.querySelector("input[id='roroDmgFileUpload-button-fileInputEl']");
    	var unitItem = me.getViewModel().get('theUnitInfo');

    	if(!StringUtil.isNullorEmpty(unitItem.unitNo)){
    		for(var i=0; i<input.files.length; i++){
        		var record = Ext.create('MOST.model.common.FileUpload');
        		var file = input.files[i];
        		record.set('pgmId', FileConstant.RORODAMAGECHECK_SCREEN_PGM_ID);
        		record.set('catgCd', unitItem.vslCallId + '/' + unitItem.cgNo + '/' + unitItem.unitNo);
        		record.set('fileStream', file);
        		record.set('fileName', file.name);
        		record.set('fileSize', file.size);
        		record.set('workingStatus', WorkingStatus.INSERT);
        		store.insert(0, record);
        	}
    	}
	},
	
	onRemoveFile_clickHandler: function() {
		var me = this;
		
		var grid = me.lookupReference(me.FILE_UPLOAD_REF_NAME);
		var store = me.getStore(me.FILE_UPLOAD_STORE_NAME);		
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection == null) return;
		
		Ext.each(selection, function (record) {
			record.set('workingStatus', WorkingStatus.DELETE);
			store.remove(record);
		});
	},
	
	onFileDownloadDblClick: function() {
		var me = this;
		var unitItem = me.getViewModel().get('theUnitInfo');
		var grid = me.lookupReference(me.FILE_UPLOAD_REF_NAME);
		var store = me.getStore('fileDownload');	
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;

		store.load({
			params : {
				'pgmId' : FileConstant.RORODAMAGECHECK_SCREEN_PGM_ID,
				'catgCd' : unitItem.vslCallId + '/' + unitItem.cgNo + '/' + unitItem.unitNo,
				'ufileNm' : selection.get('ufileName')
			},
			callback: function(records, operation, success) {
				if (success) {
					var content = records[0].data.content.replace(/&lt;/gi,'<').replace(/&gt;/gi,'>');
		        	Ext.exporter.File.saveBinaryAs(content, records[0].data.fileName);
				}
			}
		})
		
	},
	
	onGetFileUpload: function() {
		var me = this;
		var fileUpload = me.getStore(me.FILE_UPLOAD_STORE_NAME);
		var unitItem = me.getViewModel().get('theUnitInfo');

		fileUpload.load({
			params: {
				pgmId: FileConstant.RORODAMAGECHECK_SCREEN_PGM_ID,
				catgCd: unitItem.vslCallId + '/' + unitItem.cgNo + '/' + unitItem.unitNo
			},
			callback: function(records, operation, success) {
				if(success) {
				}
			}
		});
	},
	
	onUpload: function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.FILE_UPLOAD_STORE_NAME);
		var frm = refs.fileForm;
    	var isFileUpload = false;
    	
    	var formData = new FormData(frm);
		
		store.getModifiedRecords().forEach(function(record, index, array){
			formData.append(record.data.fileName, record.data.fileStream);
			isFileUpload = true;
    	});
		
		if(isFileUpload){
			this.fileUpload(formData);
		} else {
			me.saveProcess();
		}
	},
	
	fileUpload : function(formData){
		var me = this;
		var store = me.getStore(me.FILE_UPLOAD_STORE_NAME);
    	var xhr = new XMLHttpRequest();
    	
    	xhr.addEventListener('loadend', function(){
    		if(xhr.status === 200){
    			var rtnData = JSON.parse(xhr.responseText);
    			
    			store.getModifiedRecords().forEach(function(record, index, array){
    	    		record.set('ufileName', rtnData[record.get('fileName')]);
    	    	});
  
    			me.saveProcess();
    		}else{
    			MessageUtil.warning('warning_msg', 'fail_msg');
    		}
    		
    		Ext.MessageBox.hide();
    	});
    	
    	xhr.open('POST',MOST.config.Locale.getRestApiDestUrl() + '/file/manage/fileupload');
    	xhr.setRequestHeader('Authorization', MOST.config.Token.getTokenType() + ' ' + MOST.config.Token.getAccessToken());
    	xhr.send(formData);
    	
    	var msgBox = Ext.MessageBox.show({
			msg: 'Uploading your data...',
			progressText: 'Progressing...',
			width:300,
			wait:true,
			waitConfig: {interval:200}
		});
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
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);

		var catgCd = searchParm.data.catgCd;
		var unitNo = StringUtil.toUpperCase(searchParm.data.unitNo);
		var vslCallId = StringUtil.toUpperCase(searchParm.data.vslCallId);
		var blNo = StringUtil.toUpperCase(searchParm.data.blNo);
		var snNo = StringUtil.toUpperCase(searchParm.data.snNo);

		if (refs.ctlCheckTimeFromDt.getValue() != null && refs.ctlCheckTimeToDt.getValue() != null) {
			dateCondition = me.checkPeriodDate("ctlCheckTimeFromDt", "ctlCheckTimeToDt", me.MAX_DATE_ALLOW, true);
			var checkDtFrom = dateCondition.fromDtString;
			var checkDtTo = dateCondition.toDtString;
		}

		params['unitNo'] = unitNo;
		params['ixCd'] = (catgCd == 'E') ? 'X' : catgCd;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;

		params['vslCallId'] = vslCallId;
		params['blNo'] = blNo;
		params['snNo'] = snNo;
		params['checkDtFrom'] = checkDtFrom;
		params['checkDtTo'] = checkDtTo;

		return params;
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});

