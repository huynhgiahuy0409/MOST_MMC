Ext.define('MOST.view.configuration.AllowanceConfigurationController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [],

	alias: 'controller.allowanceconfiguration',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
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
		me.onSearch(true);
	},

	onSearch: function (isLoadAll = true) {
		var me = this;
		var refs = me.getReferences();
		var currentTab = me.checkCurrentTab();

		var allDataStore = me.getStore('allDataStore');
		var allowanceList = me.getStore('allowanceList');
		var multiskillList = me.getStore('multiskillList');
		var incentiveList = me.getStore('incentiveList');
		var fuelList = me.getStore('fuelList');
		var tonnageList = me.getStore('tonnageList');
		var dayoffList = me.getStore('dayoffList');
		var bonusRmList = me.getStore('bonusRmList');
		var allowanceType = me.getStore('allowanceType');

		var roleList = me.getStore('roleList');
		var gradeList = me.getStore('gradeList');

		allDataStore.load({
			callback: function (records, operations, success) {
				if (success && records.length > 0) {
					allowanceType.setData(records[0].get('allowanceType'));
					roleList.setData(records[0].get('roleList'));
					gradeList.setData(records[0].get('gradeList'));

					if (isLoadAll || currentTab === 'allowance') {
						allowanceList.setData(records[0].get('allowanceRateList'));
						allowanceList.commitChanges();
					}
					if (isLoadAll || currentTab === 'multiskill') {
						multiskillList.setData(records[0].get('multiSkillList'));
						multiskillList.commitChanges();
					}
					if (isLoadAll || currentTab === 'incentive') {
						incentiveList.setData(records[0].get('incentiveList'));
						incentiveList.commitChanges();
					}
					if (isLoadAll || currentTab === 'fuel') {
						fuelList.setData(records[0].get('fuelList'));
						fuelList.commitChanges();
					}
					if (isLoadAll || currentTab === 'tonnage') {
						tonnageList.setData(records[0].get('tonnageList'));
						tonnageList.commitChanges();
					}
					if (isLoadAll || currentTab === 'dayoff') {
						dayoffList.setData(records[0].get('dayoffList'));
						dayoffList.commitChanges();
					}
					if (isLoadAll || currentTab === 'bonusRmList') {
						bonusRmList.setData(records[0].get('bonusRmList'));
						bonusRmList.commitChanges();
					}
				}
			},
		});
	},

	/**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onTabChange: function (tabPanel, newCard, oldCard) {
		var me = this;
		var currentTab = me.checkCurrentTab();
		if (currentTab === 'multiskill') {
			oldCard.items.items[0].items.items[0].getPlugin(currentTab + 'Editor').cancelEdit();
		}
	},

	onCancelEdit: function (rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},

	onValidateEdit: function (editor, context) {
		var me = this;
		var refs = me.getReferences();
		var currentTab = me.checkCurrentTab();
		var editEvent = 'on' + me.capitalizeFirstLetter(currentTab) + 'Edit';
		var allowanceValidate = me.getStore('allowanceValidate');
		var edMonth = new Date(context.newValues.edMonth);
		var stMonth = new Date(context.newValues.stMonth);

		if (Ext.Date.diff(stMonth, edMonth, Ext.Date.DAY) < 0) {
			MessageUtil.error('warning_msg', 'invalid_Start Month_End Month');
			return false;
		} else {
			edMonth = Ext.Date.format(edMonth, 'd/m/Y');
			stMonth = Ext.Date.format(stMonth, 'd/m/Y');
		}
		if (context.record.phantom == true) {
			var params = me.paramsSetting(currentTab, context);

			allowanceValidate.load({
				params: params,
				callback: function (records, success, operations) {
					this.resumeEvent('edit');
					if (success) {
						if (records.length > 0) {
							var isValidated = records[0].get('isValidated');
							if (isValidated == 'N') {
								MessageUtil.error('warning_msg', 'allowanceconfig_period_overlapped');
								me.fireEvent('cancelEdit', editor, context);
							} else {
								me.gridEdit(editor, context, true, function () {
									me.onSearch(false);
								});
							}
						} else {
							me.fireEvent('cancelEdit', editor, context);
						}
					}
				},
				scope: me,
			});
		}
	},

	onEdit: function (editor, context) {
		var me = this;
		var currentTab = me.checkCurrentTab();
		var allDataStore = me.getStore('allDataStore');

		var proxy = context.store.getProxy();
		var edMonth = context.newValues.edMonth;
		var stMonth = context.newValues.stMonth;

		context.record.set({
			stMonth: Ext.Date.format(new Date(stMonth), 'd/m/Y'),
			edMonth: Ext.Date.format(new Date(edMonth), 'd/m/Y')
		});
		if (currentTab === 'multiskill') {
			var amount = context.record.get('amount');
			var empIdHidden = context.record.get('empIdHidden');
			var role2 = context.record.get('role2').replaceAll(',', '');
			context.record.set({
				amount1: amount,
				staffId: empIdHidden,
				role2: role2
			});
		} else if (currentTab === 'fuel' || currentTab === 'tonnage') {
			var empIdHidden = context.record.get('empIdHidden');
			context.record.set('staffId', empIdHidden);
		}
		proxy.url = allDataStore.getProxy().url;

		me.gridEdit(editor, context, true, function () {
			me.onSearch(false);
		});
	},

	onAdd: function () {
		var me = this;
		me.onAddRecord(me.checkCurrentTab());
	},

	onRemove: function () {
		var me = this;
		me.onRemoveRecord(me.checkCurrentTab());
	},

	onColAllowanceCdRenderer: function (val, cell) {
		var me = this;

		var allowanceType = me.getStore('allowanceType');

		if (allowanceType != null) {
			if (allowanceType.getData().items.length > 0) {
				if (!StringUtil.isNullorEmpty(val)) {
					var indx = -1;
					indx = allowanceType.find('scd', val);

					if (indx != -1) {
						return allowanceType.getAt(indx).get('scdNm');
					} else {
						return allowanceType.getAt(0).get('scdNm');
					}
				}
			}
		}
	},

	onColRoleListRenderer: function (val, cell) {
		var me = this;

		var roleList = me.getStore('roleList');

		if (roleList != null) {
			if (roleList.getData().items.length > 0) {
				if (!StringUtil.isNullorEmpty(val)) {
					var indx = -1;
					indx = roleList.find('scd', val);

					if (indx != -1) {
						return roleList.getAt(indx).get('scdNm');
					} else {
						return roleList.getAt(0).get('scdNm');
					}
				}
			}
		}
	 },

	onGridDblClick: function () {
		var me = this;
		var refs = me.getReferences();
		var currentTab = me.checkCurrentTab();
		var gridRef = 'ref' + me.capitalizeFirstLetter(currentTab) + 'Grid';
		var grid = refs[gridRef];
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		grid.getPlugin(currentTab + 'Editor').cancelEdit();
	},

	onStaffIdCellFocusLeave: function (cell) {
		var me = this;
		var refs = me.getReferences();
		var staffList = me.getStore('staffList');
		var currentTab = cell.column.currentTab;

		var staffId = cell.getValue();
		if (!StringUtil.isNullorEmpty(staffId)) {
			staffList.load({
				params: {
					staffId: staffId,
				},
				callback: function (records, operations, success) {
					if (records.length > 0) {
						refs["ref" + currentTab + "ColStaffNm"].getEditor().setValue(records[0].get('staffNm'));
						refs["ref" + currentTab + "ColRole"].getEditor().setValue(records[0].get('roleCd1'));
						refs["ref" + currentTab + "ColEmpIdHidden"].getEditor().setValue(records[0].get('empIdHidden'));
						
						if (currentTab === 'Multiskill') {
							var multiSkillTag = me.getStore('multiSkillTag');

							refs.refMultiskillColGrade.getEditor().setValue(records[0].get('gradeCd1'));
							multiSkillTag.findBy(function (item, index) {
								if (item.get('scd') == records[0].get('roleCd1')) {
									item.set('disabled', true);
								}
							});
						}
					}
				},
			});
		}
	},

	onTagFieldSelect: function (combo, record, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var isAll = false;
		var allIndex = 0;
		var allValue = new Array();

		record.forEach(function (data, index) {
			if (data.get('scd') == 'all') {
				isAll = true;
				allIndex = index;
			} else {
				allValue.push(data.get('scd'));
			}
		});

		if (isAll) {
			combo.reset();
			combo.setValue(combo.getStore().getRange().splice(1));
		}
	},

	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	onAddRecord: function (currentTab) {
		var me = this;
		var refs = me.getReferences();
		var gridRef = 'ref' + me.capitalizeFirstLetter(currentTab) + 'Grid';
		var grid = refs[gridRef];
		var record = me.createAllowanceConfigurationRecord(currentTab);

		if (currentTab === 'multiskill') {
			var multiSkillTag = me.getStore('multiSkillTag');
			var multiSkillTagData = multiSkillTag.getData().items;
			multiSkillTagData.forEach(function (record, index) {
				record.set('disabled', false);
			});
		}

		var targetStore = me.getStore(currentTab + 'List');
		var editor = grid.getPlugin(currentTab + 'Editor');

		editor.cancelEdit();
		grid.filters.clearFilters();
		grid.filters.disable();

		targetStore.insert(0, record);
		editor.startEdit(record);
	},

	createAllowanceConfigurationRecord: function (currentTab) {
		var record = Ext.create('MOST.model.configuration.AllowanceConfiguration');
		var stMonth = Ext.Date.format(new Date(), 'd/m/Y');
		var edMonth = Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, 1), 'd/m/Y');

		var data = {
			allowance: {
				appType: "ALRT",		allowanceCd: "",		allowance: ""
			},
			multiskill: {
				appType: "MUSK",		allowanceCd: "MUS",		allowance: "Multi Skill"
			},
			incentive: {
				appType: "INCE",		allowanceCd: "INC",		allowance: "Incentive"
			},
			fuel: {
				appType: "FUEL",		allowanceCd: "FUE",		allowance: "Fuel"
			},
			tonnage: {
				appType: "TONN",		allowanceCd: "TON",		allowance: "Tonnage"
			},
			dayoff: {
				appType: "DOFF",		allowanceCd: "DOF",		allowance: "DayOff",
				stMonth: stMonth,		edMonth: edMonth
			},
			bonusRm: {
				appType: "BNRM",		allowanceCd: "BRM",		allowance: "Bonus RM",
				stMonth: stMonth,		edMonth: edMonth
			}
		}

		record.set(data[currentTab]);
		return record;
	},

	onRemoveRecord: function (currentTab) {
		var me = this;
		var targetStore = me.getStore(currentTab + 'List');
		var grid = me.lookupReference('ref' + me.capitalizeFirstLetter(currentTab) + 'Grid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var allDataStore = me.getStore('allDataStore');
		var proxy = targetStore.getProxy();
		proxy.url = allDataStore.getProxy().url;

		MessageUtil.question('remove', 'infodelete_msg', null, function (button) {
			if (button === 'ok') {
				targetStore.remove(selection);
				targetStore.sync({
					success: function () {
						MessageUtil.saveSuccess();
					},
				});
			}
		});
	},

	checkCurrentTab: function () {
		var me = this;
		return me.lookupReference('tabpnl').getActiveTab().tabName;
	},

	capitalizeFirstLetter: function (str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	},

	paramsSetting: function (currentTab, context) {
		var edMonth = Ext.Date.format(new Date(context.newValues.edMonth), 'd/m/Y');
		var stMonth = Ext.Date.format(new Date(context.newValues.stMonth), 'd/m/Y');

		var params = {
			col2: stMonth,
			col3: edMonth,
		};

		if (currentTab === 'allowance') {
			params.tyCd = 'chkAllowExistedALLO';
			params.col1 = context.newValues.allowanceCd;
		} else if (currentTab === 'multiskill') {
			params.tyCd = 'chkMuskExisted';
			params.col1 = context.newValues.staffId;
		} else if (currentTab === 'incentive') {
			params.tyCd = 'chkAllowExisted';
			params.col1 = context.newValues.roleCd1;
		} else if (currentTab === 'fuel') {
			params.tyCd = 'chkAllowExistedFUEL';
			params.col1 = context.newValues.staffId;
		} else if (currentTab === 'tonnage') {
			params.tyCd = 'chkAllowExistedTON';
			params.col1 = context.newValues.staffId;
		} else if (currentTab === 'dayoff') {
			params.tyCd = 'chkAllowExistedDoff';
			params.col1 = context.newValues.amount;
		} else if (currentTab === 'bonusRm') {
			params.tyCd = 'chkAllowExistedBonusRm';
			params.col1 = context.newValues.roleCd1;
		}
		return params;
	},

	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});
