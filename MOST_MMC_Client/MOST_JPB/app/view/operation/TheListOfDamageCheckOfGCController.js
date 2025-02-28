Ext.define('MOST.view.operation.TheListOfDamageCheckOfGCController', {
	extend: 'MOST.view.foundation.BaseViewController',
	requires: [
	],
	alias: 'controller.thelistofdamagecheckofgc',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_PERIOD_DAY: 14,
	MAX_DATE_ALLOW: 14,
	NON_CALL_ID: CommonConstants.NON_CALL_ID,
	MAIN_GRID_REF_NAME: 'refTheListOfDamageCheckOfGCGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'theListOfDamageCheckOfGC',
	DAMAGE_STORE_NAME: 'theDamageStore',
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
		me.setDateInDays("ctlCheckTimeFromDt", -7);
		var searchParm = Ext.create('MOST.model.operation.SearchDamageCheckParm');
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
					}else{
						records.forEach(function(rec,idx){
							if(rec.get('blNo') != '' && rec.get('blNo') != null){
								rec.set('blSnNo',rec.get('blNo'));
								rec.commit();
							}else{
								rec.set('blSnNo',rec.get('snNo'));
								rec.commit();
							}
						});							
					}
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
				me.getSnComboItems();
			}
			else {
				var blCombo = me.getStore('blCombo');
				blCombo.loadData([], false);
				refs.ctlBlNo.reset();
			}
		}
		if (targetControl === 'ctlVsl') {
			me.getViewModel().setData({ theVslInfo: returnValue.item });
		}
		else {
			me.getViewModel().setData({ theUnitInfo: returnValue.item.data });
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
					if (records.length > 0) {
						blCombo.insert(0, [{ cdNm: 'Select', cd: '' }]);
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
						snCombo.insert(0, [{ cdNm: 'Select', cd: '' }]);
					}
				}
			}
		});
	},
		
	onAdd: function(){
		var me = this;
		me.getView().detailViewAlias = 'app-damagecheckregistration';
		var title = 'Damage Check';
		me.getViewModel().setData({ theDmg: null });
		me.openDetailPopup(null, title, false);
	},
	
	onRemove:function(){
		var me = this;
		var grid = me.lookupReference('refTheListOfDamageCheckOfGCGrid');	
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(!selection){			
			return;
		}
		
		MessageUtil.question('remove', 'infodelete_msg', null, function(button) {
			if (button === 'ok') {
				me.deleteProcess(selection);
			}
		});
	},
	
	deleteProcess: function(selection){
		var me = this;
		var grid = me.lookupReference('refTheListOfDamageCheckOfGCGrid');
		var store = me.getStore('gcDamageCheckDetail'); 
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = false;
		updateParm.drop();
		updateParm.set('workingStatus', WorkingStatus.DELETE);
		updateParm.set('items', new Array());
		
		selection.forEach(function (item) {
			updateParm.get('items').push(item.data);
		});
		
		updateParm.save({
			success : function(record, operation) {
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
						function(button){
						if (button === 'ok') {
					    	me.onSearch();
						}
					});
			}
		});
	},
	
	onDetailGCDamageCheck: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];		
		if (selection == null) return;

		me.getViewModel().setData({ theDmg: selection.data });
		me.getView().detailViewAlias = 'app-damagecheckregistration';
		var title = 'Damage Check';
		me.openDetailPopup(selection.clone(), title, false);
	},
	
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
		var blNo = StringUtil.toUpperCase(searchParm.data.blNo);
		var snNo = StringUtil.toUpperCase(searchParm.data.snNo);
		var catgCd = StringUtil.toUpperCase(searchParm.data.catgCd);

		if (refs.ctlCheckTimeFromDt.getValue() != null && refs.ctlCheckTimeToDt.getValue() != null) {
			dateCondition = me.checkPeriodDate("ctlCheckTimeFromDt", "ctlCheckTimeToDt", me.MAX_DATE_ALLOW, true);
			var checkDtFrom = dateCondition.fromDtString;
			var checkDtTo = dateCondition.toDtString;
		}

		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;

		params['vslCallId'] = vslCallId;
		params['blNo'] = blNo;
		params['snNo'] = snNo;
		params['catgCd'] = catgCd;
		params['checkDtFrom'] = checkDtFrom;
		params['checkDtTo'] = checkDtTo;

		return params;
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
});

