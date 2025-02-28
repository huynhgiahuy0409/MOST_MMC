Ext.define('MOST.view.operation.VesselDraftSurveyController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [],

	alias: 'controller.vesseldraftsurvey',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */

	MAX_DATE_PERIOD: 7,
	MAIN_GRID_REF_NAME: 'refVesselDraftSurveyGrid',
	MAIN_STORE_NAME: 'vslDraftSurveyList',
	DTL_GRID_REF_NAME: 'refVesselDraftSurveyDtlGrid',
	DTL_STORE_NAME: 'vslDraftSurveyDetailList',
	VSL_DRAFT_SURVEY_INFO: 'vslDraftSurveyInfo',
	WORKING_STATUS: '',
	VALIDATION_STORE: 'validation',

	afterSetCodePopupData: function (xtype, targetControl, returnValue, me, parent) {
		if (returnValue) {
			var me = this;
			var returnItem = returnValue.item;

			switch (targetControl) {
				case 'ctlScn':
					me.getViewModel().setData({ theVsl: returnItem });
					break;
				case 'ctlDetailScn':
					me.getViewModel().setData({ theVsl: returnItem });
					me.getVesselDraftSurveyInfo(returnItem);
					break;
			}
		}
	},

	onSearch: function () {
		var me = this;
		var theVsl = me.getViewModel().get('theVsl');

		if (!theVsl || StringUtil.isNullorEmpty(theVsl.get('scn'))) {
			MessageUtil.info('info_msg', 'selectScn');
			return;
		}

		var mainStore = me.getStore(me.MAIN_STORE_NAME);
		var detailStore = me.getStore(me.DTL_STORE_NAME);

		detailStore.removeAll();
		mainStore.load({
			params: {
				scn: theVsl.get('scn'),
				vslCd: theVsl.get('vslCd'),
			},
			callback: function (records, operation, success) {
				if (success) {
				}
			},
		});
	},

	onLoad: function () {
		var me = this;
	},

	onAdd: function () {
		var me = this;
		var theVsl = me.getViewModel().get('theVsl');

		me.openDetailPopup(null);
	},

	onDetailLoad: function () {
		var me = this;
		var recvData = me.getDetailBizView().items.get(0).recvData;
		var theDetail = me.getViewModel().get('theDetail');

		if (!theDetail) {
			theDetail = Ext.create('MOST.model.operation.VesselDraftSurvey');
			me.getViewModel().setData({ theDetail: theDetail });
		}

		if (!recvData) {
			me.onCreateVslDraftSurvey();
		} else {
			me.onUpdateVslDraftSurvey(recvData);
		}
	},

	onCreateVslDraftSurvey: function () {
		var me = this;
		var theVsl = me.getViewModel().get('theVsl');
		me.WORKING_STATUS = 'C';
		if (theVsl) {
			me.getVesselDraftSurveyInfo(theVsl);
		}
	},

	onUpdateVslDraftSurvey: function (recvData) {
		var me = this;
		me.WORKING_STATUS = 'U';

		me.getViewModel().setData({ theDetail: recvData });
	},

	getVesselDraftSurveyInfo: function (theVsl) {
		var me = this;
		var store = me.getStore(me.VSL_DRAFT_SURVEY_INFO);

		var parms = {
			scn: theVsl.get('scn'),
			vslCd: theVsl.get('vslCd'),
		};

		store.load({
			params: parms,
			callback: function (records, operation, success) {
				if (success && records.length > 0) {
					me.getViewModel().setData({
						theDetail: records[0],
					});
				}
			},
		});
	},

	calculateVslDraftSurvey: function () {
		var me = this;
		var refs = me.getReferences();
		var initialReading = refs.refDetailInitialReading.getValue();
		var finalReading = refs.refDetailFinalReading.getValue();

		if (!initialReading || !finalReading) {
			return;
		}

		var draftSurveyMt = Math.abs(finalReading - initialReading);
		refs.refDetailDraftSurveyMT.setValue(draftSurveyMt);
	},

	onDetailSave: function () {
		var me = this;
		var theDetail = me.getViewModel().get('theDetail');

		if (me.WORKING_STATUS == 'C') {
			me.isCreated(theDetail).then(
				function (check) {
					if (check) {
						me.saveProcess(theDetail, me.WORKING_STATUS);
					} else {
						MessageUtil.warning(
							'Warning',
							'The vessel draft survey has already been created and cannot be created again!',
						);
					}
				},
				function (err) {
					MessageUtil.warning('Warning', 'Something went wrong!');
				},
			); 
		} else {
			me.isValidated(theDetail).then(
				function (check) {
					if (check) {
						me.saveProcess(theDetail, me.WORKING_STATUS);
					} else {
						MessageUtil.warning(
							'Warning',
							'The vessel has already completed the reconcile, cannot modify the vessel draft survey!',
						);
					}
				},
				function (err) {
					MessageUtil.warning('Warning', 'Something went wrong!');
				},
			);
		}
	},

	saveProcess: function (saveItem, workingStatus) {
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var detailView = me.getDetailBizView();
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');

		saveItem.set('userId', MOST.config.Token.getUserId());
		saveItem.set('crud', workingStatus);

		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = workingStatus == 'C';
		updateParm.set('item', saveItem.data);
		updateParm.save({
			success: function (records, operation, success) {
				var responseObj = JSON.parse(operation.getResponse().responseText).response;
				if (responseObj.errorNumber != 0) {
					MessageUtil.warning('Warning', 'draftSurveySystemErrorMsg');
					return;
				}

				saveItem.commit();
				detailView.close();
				MessageUtil.show(Ext.Msg.INFO, 'success_msg', 'savesuccess_msg', '', function (button) {
					if (button === 'ok') {
						me.onSearch();
					}
				});
			},
		});
	},

	onMainGridClick: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var detailStore = me.getStore('vslDraftSurveyDetailList');

		if (me.clickTimeout) {
			clearTimeout(this.clickTimeout);
		}

		me.clickTimeout = setTimeout(() => {
			detailStore.load({
				params: {
					vslCd: record.get('vslCd'),
					scn: record.get('scn'),
				},
				callback: function (records, operation, success) {},
			});
		}, 300);
	},

	onMainGridDblClick: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if (selection == null) {
			return;
		}

		if (me.clickTimeout) {
			clearTimeout(me.clickTimeout);
		}

		me.openDetailPopup(selection);
	},

	onRemove: function () {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if (selection == null) {
			return;
		}

		me.isValidated(selection).then(
			function (check) {
				if (check) {
					me.removeProcess(selection);
				} else {
					MessageUtil.warning(
						'Warning',
						'The vessel has already completed the reconcile, cannot modify the vessel draft survey!',
					);
				}
			},
			function (err) {
				MessageUtil.warning('Warning', 'Something went wrong!');
			},
		);

	},

	removeProcess: function (deleteItem) {
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);

		MessageUtil.question('confirm', 'infodelete_msg', null, function (button) {
			if (button === 'ok') {
				var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');

				updateParm.getProxy().url = store.getProxy().url;
				updateParm.phantom = false;
				updateParm.drop();
				updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
				updateParm.set('items', new Array());
				updateParm.get('items').push(deleteItem.data);

				updateParm.save({
					success: function (records, operation, success) {
						var responseObj = JSON.parse(operation.getResponse().responseText).response;
						if (responseObj.errorNumber != 0) {
							MessageUtil.warning('Warning', 'draftSurveySystemErrorMsg');
							return;
						}

						MessageUtil.show(Ext.Msg.INFO, 'success_msg', 'savesuccess_msg', '', function (button) {
							if (button === 'ok') {
								me.onSearch();
							}
						});
					},
				});
			}
		});
	},

	isValidated: function (item) {
		var me = this;
		var validationStore = me.getStore(me.VALIDATION_STORE);

		return new Ext.Promise(function (resolve, reject) {
			validationStore.load({
				params: {
					scn: item.get('scn'),
				},
				callback: function (records, operation, success) {
					if (success) {
						if (records.length > 0 && records[0].get('isValidated') == 'Y') {
							resolve(true);
						} else {
							resolve(false);
						}
					} else {
						reject(operation);
					}
				},
			});
		});
	},

	isCreated: function (item) {
		var me = this;
		var validationStore = me.getStore(me.MAIN_STORE_NAME);

		return new Ext.Promise(function (resolve, reject) {
			validationStore.load({
				params: {
					scn: item.get('scn'),
					vslCd: item.get('vslCd'),
				},
				callback: function (records, operation, success) {
					if (success) {
						if (records.length > 0) {
							resolve(false);
						} else {
							resolve(true);
						}
					} else {
						reject(operation);
					}
				},
			});
		});
	},
});
