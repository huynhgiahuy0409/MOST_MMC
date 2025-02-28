Ext.define('MOST.view.popup.ShiftGroupMultiPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [],

	alias: 'controller.shiftgroupmultipopup',

	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event

	onLoad: function () {
		var me = this;
		var refs = me.getReferences();
		var shiftGroupGridContainer = refs.refShiftGroupGridContainer;
		var store = me.getStore('shiftList');
		var strDate = me.getView().recvData[0];
		var date = strDate.substr(6, 7) + '/' + strDate.substr(4, 2) + '/' + strDate.substr(0, 4);
		var shftDivCd = me.getView().recvData[1];
		var params = {};
		var colors = [
			"#F44336", "#3F51B5", "#4CAF50", "#FF9800", "#E91E63", "#2196F3", 
			"#8BC34A", "#FF5722", "#673AB7", "#009688", "#FFC107", "#607D8B" 
		];
		refs.txtDate.setText('Date : ' + date);

		params.divCd = shftDivCd;
		params.useYn = 'Y';
		store.getProxy().extraParams = params;

		store.load({
			callback: function (records, operation, success) {
				if (success && records.length > 0) {
					var dayoffShiftGroup = Ext.create('MOST.model.planning.RosterConfigurationMonthly');

					dayoffShiftGroup.set('shftId', 'DOSHFT');
					dayoffShiftGroup.set('shftIdx', store.totalCount + 1);
					dayoffShiftGroup.set('shftDivCd', shftDivCd);
					dayoffShiftGroup.set('shftNm', 'DAY OFF');
					records.push(dayoffShiftGroup);

					records.forEach((record) => {
						var shiftGroupStore = Ext.create('Ext.data.Store', {
							model: 'MOST.model.planning.RosterConfigurationMonthly',
							storeId: 'shiftGroupStore' + record.get('shftId'),
							autoLoad: false,
							proxy: {
								type: 'rest',
								showProgressBar: false,
								url:
									MOST.config.Locale.getRestApiDestUrl() +
									'/v1/rosterconfigurationmonthly/shiftgrouppopup',
							},
						});
						var shftIdx = new Number(record.get('shftIdx'));
						var color = (shftIdx && shftIdx >=1 && shftIdx <=12) ? colors[shftIdx - 1] : '#FFFFFF';
						var shiftGroupGrid = Ext.create('Ext.container.Container', {
							flex: 1,
							layout: {
								type: 'vbox',
								align: 'center',
							},
							items: [
								{
									xtype: 'container',
									height: 60,
									padding: '10 0 0 0',
									layout: {
										type: 'vbox',
										align: 'center',
									},
									items: [
										{
											xtype: 'label',
											reference: 'lbShft' + record.get('shftId'),
											text: record.get('shftNm'),
											style: {
												'text-align': 'center',
												'font-weight': 'bold',
												'color' : color
											},
										},
										{
											xtype: 'checkboxfield',
											reference: 'chkAllFor' + record.get('shftId'),
											boxLabel: 'Select All',
											boxLabelAlign: 'after',
											listeners: {
												change: 'onAllCheckForShift',
											},
										},
									],
								},
								{
									xtype: 'tsb-datagrid',
									reference: 'refShiftGroupGrid' + record.get('shftId'),
									usePagingToolbar: false,
									initDefaultColumn: false,
									margin: '0 5 0 0',
									width: '100%',
									stateful: true,
									viewConfig: {
										getRowClass: function (row, index) {
											var cls = '';
											if (row.get('chkShiftGroupMulti') == 1) {
												cls = 'shift' + record.get('shftIdx') + '-color';
											}
											return cls;
										},
									},
									plugins: ['gridexporter', 'gridfilters', 'clipboard'],
									selModel: {
										cellSelect: false,
									},
									columns: {
										defaults: {
											style: 'text-align:center',
											align: 'center',
										},
										items: GridUtil.getGridColumns('ShiftGroupList'),
									},
									store: shiftGroupStore,
									shiftId: record.get('shftId'),
								},
							],
						});

						shiftGroupGridContainer.add(shiftGroupGrid);
					});

					store.setData(records);
					store.commitChanges();
					me.onSetGroupData();
				}
			},
		});
	},

	onSetGroupData: function () {
		var me = this;
		var refs = me.getReferences();
		var shiftListStore = me.getStore('shiftList');
		var strDate = me.getView().recvData[0];
		var date = strDate.substr(6, 7) + '/' + strDate.substr(4, 2) + '/' + strDate.substr(0, 4);
		var shftDivCd = me.getView().recvData[1];
		var params = {};

		params.divCd = shftDivCd;
		params.useYn = 'Y';
		refs.txtDate.setText('Date : ' + date);

		shiftListStore.getData().items.forEach((shift) => {
			var ref = 'refShiftGroupGrid' + shift.get('shftId');
			var shiftGroupGridStore = me.lookupReference(ref).store;

			shiftGroupGridStore.load({
				params: params,
				callback: function (records, operation, success) {
					if (success && records.length > 0) {
						if (me.getView().recvData.length > 2) {
							for (var i = 2; i < me.getView().recvData.length; i++) {
								var item = me.getView().recvData[i];
								var shiftId = item.id.substr(8, 6);
								var shtGrpCds = item.id.substr(14).split('|');

								if (shiftId == shift.get('shftId')) {
									shiftGroupGridStore.each((shiftGroup) => {
										var chkShiftGroupMulti = shtGrpCds.includes(shiftGroup.get('groupCd')) ? 1 : 0;
										shiftGroup.set('chkShiftGroupMulti', chkShiftGroupMulti);
									});
								}
							}

							shiftGroupGridStore.commitChanges();
						}
					}
				},
			});
		});
	},

	onUpdate: function () {
		var me = this;
		var refs = me.getReferences();
		var shiftGroupGridContainer = me.lookupReference('refShiftGroupGridContainer');
		var shiftGroupGrids = shiftGroupGridContainer.query('tsb-datagrid');

		MessageUtil.question('confirmTitle', 'roster_add_grp_success', null, function (button) {
			if (button === 'ok') {
				var setChkGrpCdValues = '';
				var selectArray = new Array();
				var chkGrpCdValuesArray = [];
				
				shiftGroupGrids.forEach((grid) => {
					var store = grid.getStore();
					var selectedRecords = store.getData().items.filter((item) => item.get('chkShiftGroupMulti') == 1);

					if (selectedRecords.length > 0) {
						var groupCds = [...selectedRecords.map((record) => record.get('groupCd'))].join('|');
						var setChkGrpCdValue = grid.shiftId + groupCds;

						chkGrpCdValuesArray.push(setChkGrpCdValue);
						selectArray.concat(selectedRecords);
					}
				});

				setChkGrpCdValues = chkGrpCdValuesArray.join('&');

				if (!me.validateShiftDuplication(selectArray)) {
					MessageUtil.question(
						'confirmTitle',
						'Shift Group is already assigned, do you want to keep continue?',
						null,
						function (button) {
							if (button === 'ok') {
								me.onUpdateRoster(setChkGrpCdValues);
							}
							if (button === 'cancel') {
								selectArray = new Array();
							}
						},
					);
				} else {
					me.onUpdateRoster(setChkGrpCdValues);
				}
			}
		});
	},

	validateShiftDuplication: function (selectItems) {
		var valid = true;
		for (i = 0; i < selectItems.length; i++) {
			for (j = 0; j < selectItems.length; j++) {
				if (i != j && selectItems[i].groupCd === selectItems[j].groupCd) {
					valid = false;
					break;
				}
			}
		}
		return valid;
	},

	onUpdateRoster: function (setChkGrpCdValues) {
		var me = this;
		var window = me.getView().up('window');
		var returnItem = {
			code: setChkGrpCdValues,
			status: 'Success',
			shftTpCd: me.getView().recvData[1],
		};

		window.returnValue = returnItem;
		window.close(); //return afterSetCodePopupData() function RosterConfigurationMonthlyController.js
	},

	onShiftGroupMultiCheckChange: function (changedCheckbox, rowIdx, checked, record, e, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var groupCd = record.data.groupCd;

		if (checked) {
			var groupNm = record.data.groupNm;
			var shiftGroupListOnlyStore = me.getStore('shiftGroupListOnlyStore');

			shiftGroupListOnlyStore.load({
				params: {
					shftGrpCd: groupCd,
				},
				callback: function (records, operation, success) {
					if (success) {
						if (records.length == 0) {
							MessageUtil.warning('Warning', 'noStaffAddedInGroup', [groupNm]);
							return;
						} else {
							record.set('chkShiftGroupMulti', 1);
						}
					}
				},
			});
		} else {
			me.onSetLoadingAndDisable(true);

			var deployedGroupStaffListOnlyStore = me.getStore('deployedGroupStaffListOnlyStore');
			var date = refs.txtDate.text.split(':')[1].trim();
			var shftId = changedCheckbox.up('tsb-datagrid').shiftId;

			deployedGroupStaffListOnlyStore.load({
				params: {
					groupCd: groupCd,
					plannedYmd: date,
					shftId: shftId,
				},
				callback: function (records, operation, success) {
					if (success) {
						if (records.length > 0) {
							record.set(chkShiftGroupMulti, 1);
							MessageUtil.warning('Warning', 'The Group has been used for planning, cannot remove');
							return;
						} else {
							record.set('chkShiftGroupMulti', 0);
						}
						me.onSetLoadingAndDisable(false);
					}
				},
			});
		}

		record.store.commitChanges();
	},

	onSetLoadingAndDisable: function (flag) {
		var me = this;
		var refs = me.getReferences();
		var shiftGroupGridContainer = me.lookupReference('refShiftGroupGridContainer');
		var grids = shiftGroupGridContainer.query('tsb-datagrid');
		var checkboxes = shiftGroupGridContainer.query('checkboxfield');

		grids.forEach((grid) => grid.setLoading(flag));
		checkboxes.forEach((checkbox) => checkbox.setDisabled(flag));
		refs.btnUpdate.setDisabled(flag);
	},

	onAllCheckForShift: function (chk, newValue, oldValue, eOpts) {
		var me = this;
		var shiftId = chk.reference.slice(-6);
		var shiftGroupGridStore = me.lookupReference('refShiftGroupGrid' + shiftId).getStore();
		var staffListStore = me.getStore('staffListStore');

		if (chk.value) {
			staffListStore.load({
				callback: function (records, operation, success) {
					if (success) {
						me.onCheckAllMatchedRecordsOnGridShiftStore(staffListStore, shiftGroupGridStore);
					}
				},
			});
		} else {
			me.onSetLoadingAndDisable(true);
			var isBeingUsed = me.getAllGroupNameThatBeingUsed(shiftId);
			if (isBeingUsed != '') {
				var warningMessage = 'Group ' + isBeingUsed + ' have been used for planning, cannot remove';
				MessageUtil.warning('Warning', warningMessage);
				me.onSetLoadingAndDisable(false);
			} else {
				shiftGroupGridStore.each(function (record) {
					record.set('chkShiftGroupMulti', 0);
				});
				me.onSetLoadingAndDisable(false);
			}
		}

		shiftGroupGridStore.commitChanges();
	},

	onCheckAllMatchedRecordsOnGridShiftStore: function (staffListStore, gridShiftStore) {
		gridShiftStore.each(function (record) {
			var matchRecord = staffListStore.findRecord('shftGroupCd', record.get('groupCd'));
			if (matchRecord) record.set({ chkShiftGroupMulti: 1 });
		});
	},

	getAllGroupNameThatBeingUsed: function (shiftId) {
		var me = this;
		var combinedShftGrpCd = me.getView().recvData;
		var foundValues = [];
		var foundIndex = -1;

		combinedShftGrpCd.forEach(function (data, index) {
			if (data.id && data.id.indexOf(shiftId) !== -1) {
				foundValues.push(data.id);
				foundIndex = index;
			}
		});

		return foundIndex !== -1 ? combinedShftGrpCd[foundIndex].title : '';
	},
});
