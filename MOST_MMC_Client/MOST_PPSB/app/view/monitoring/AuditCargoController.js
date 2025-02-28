Ext.define('MOST.view.monitoring.AuditCargoController', {
	extend: 'MOST.view.foundation.BaseViewController',
    
	requires: [
	],
    
	alias: 'controller.auditcargo',

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
	
	MAIN_GRID_REF_NAME: 'refAuditCargoGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'auditCargo',
	UPDATE_TYPE_COMBO_STORE: 'updateTypeCombo',
	
	FILE_UPLOAD_REF_NAME : 'refRoRoFileUpload',
	FILE_UPLOAD_STORE_NAME :'uploadedRoRoFileDamageStore',
	cgIndex: 0,

	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onLoad: function () {
		var me = this;
		var refs = me.getReferences();
		var screenComboStore = me.getStore('screenCombo');
		var updateTypeComboStore = me.getStore('updateTypeCombo');
		var searchParm = Ext.create('MOST.model.monitoring.SearchAuditCargoParm');
		
		//me.setComboBoxWithLocalCache(CacheServiceConstants.UPDATE_TYPE_COMBO, me.UPDATE_TYPE_COMBO_STORE); 
		me.setDateInDays("ctlFromDt", -7);
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({ theSearch: searchParm });
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		screenComboStore.load();
		updateTypeComboStore.load();
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
					}
				}
			}
		});
	},

	onDateChange: function (control, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();

		if (control == refs.ctlFromDt) {
			me.setDateInDaysByDate("ctlToDt", me.MAX_PERIOD_DAY, control.getValue());
		} else {
			me.setDateInDaysByDate("ctlFromDt", -me.MAX_PERIOD_DAY, control.getValue());
		}
	},

	afterSetCodePopupData: function (xtype, targetControl, returnValue) {
		var me = this;
		var refs = me.getReferences();
		if (targetControl === 'ctlVslCallId') {
			if (returnValue) {
				me.getViewModel().setData({ theSearch: returnValue.item });
				me.getBlComboItems();
				me.getSnComboItems();
			}
			else {
				var blCombo = me.getStore('blCombo');
				blCombo.loadData([], false);
				refs.ctlBlNo.reset();
			}
		}
	},
	
	selectScreenComboItems: function () {
		var me = this;
		var refs = me.getReferences();
		var screenCombo = me.getStore('screenCombo');
		var screenName = refs.ctlScreenName.getValue();
		
		screenCombo.load({
			params: {
				screenName: screenName
			},

			callback: function (records, operation, success) {
				if (success) {
					if (records.length > 0) {
						screenCombo.insert(0, [{ cdNm: 'Select', cd: '' }]);
						screenCombo.commitChanges();
					}
				}
			}
		});
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
					if (records.length > 0) {
					}
				}
			}
		});
	},

	getSnComboItems: function () {
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
					if (records.length > 0) {
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

	onCancelEdit: function (rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},

	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var refs = me.getReferences();
		var searchBizParm = me.getSearchCondition();
		searchBizParm.classID = 'com.tsb.most.biz.parm.monitoring.SearchAuditCargoParm';
		searchBizParm.serviceID = 'MOST.auditCargo.selectAuditCargoItems'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
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

		var vslCallId = StringUtil.toUpperCase(searchParm.data.vslCallId);
		var pgmId = StringUtil.toUpperCase(searchParm.data.screenName);
		var blNo = StringUtil.toUpperCase(searchParm.data.blNo);
		var snNo = StringUtil.toUpperCase(searchParm.data.snNo);
		var scn = StringUtil.toUpperCase(searchParm.data.scn);
		var updateType = refs.refUpdateTypeCbo.getValue();
		
		
		if (refs.ctlFromDt.getValue() != null && refs.ctlToDt.getValue() != null) {
			dateCondition = me.checkPeriodDate("ctlFromDt", "ctlToDt", me.MAX_DATE_ALLOW, true);
			var transFromDt = dateCondition.fromDtString;
			var transToDt = dateCondition.toDtString;
		}
		
		/*if(StringUtil.isNullorEmpty(updateType)){ 
			MessageUtil.alert('warning', 'ACUpdateTypeMsg');
			return;
		}*/
		
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['vslCallId'] = vslCallId;
		params['transFromDt'] = transFromDt;
		params['transToDt'] = transToDt;
		params['blNo'] = blNo;
		params['snNo'] = snNo;
		params['pgmId'] = pgmId;
		params['updateType'] = updateType;
		params['scn'] = scn;
		
		
		return params;
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});