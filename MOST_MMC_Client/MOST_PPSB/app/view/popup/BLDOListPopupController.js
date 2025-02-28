Ext.define('MOST.view.popup.BLDOListPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [],

	alias: 'controller.bldolistpopup',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refBLDOPopupGrid', // Main Grid Name
	MAIN_STORE_NAME: 'blDOListPopup',
	COMBO_BOX_STORE: 'masterBlCombo',
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
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.popup.SearchPopupServiceParm');

		me.getViewModel().setData({
			theSearch: searchParm,
		});
	},

	onSearch: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();

		if (params == null) {
			return;
		}

		store.load({
			params: params,
			callback: function (records, operation, success) {},
		});
	},

	getSearchCondition: function () {
		var me = this;

		var { vslCd, vslCallId, scn, ptnrCd, mfDocId } = me.getViewModel().get('theSearch').getData();

		if (!scn && !ptnrCd) {
			MessageUtil.info('info', 'blDoPopup_missing_mandatory_msg');
			return;
		}

		return {
			vslCd,
			vslCallId,
			scn,
			ptnrCode: ptnrCd,
			mfDocId,
		};
	},

	onDblClick: function () {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var window = me.getView().up('window');

		if (selection == null) {
			return null;
		}

		var returnItem = {
			code: selection.get('blNo'),
			codeName: selection.get('blNo'),
			item: selection,
		};

		window.returnValue = returnItem;
		window.close();
	},

	afterSetCodePopupData: function (xtype, targetControl, returnValue, me, parent) {
		var me = this;
		var theSearch = me.getViewModel().get('theSearch');
		if (!returnValue) {
			return;
		}
		switch (targetControl) {
			case 'ctlVslCallId':
				theSearch.set('vslCd', returnValue.item.get('vslCd'));
				break;
			case 'ctlScn':
				theSearch.set('vslCd', returnValue.item.get('vslCd') || '');
				theSearch.set('vslCallId', returnValue.item.get('vslCallId') || '');
				break;
			case 'ctlPartner':
				break;
		}
		me.updateMasterBLCombo(returnValue);
	},

	updateMasterBLCombo: function (returnValue) {
		var me = this;
		var masterBlComboStore = me.getStore(me.COMBO_BOX_STORE);
		masterBlComboStore.load({
			params: {
				vslCallId: returnValue.item.get('vslCallId'),
				vslCd: returnValue.item.get('vslCd'),
				scn: returnValue.item.get('scn'),
			},
			callback: function (records, operation, success) {
				if (success && records.length > 0) {
				}
			},
		});
	},
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
});
