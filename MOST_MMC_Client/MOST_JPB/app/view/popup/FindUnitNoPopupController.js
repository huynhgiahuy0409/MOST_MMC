Ext.define('MOST.view.popup.FindUnitNoPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [],

	alias: 'controller.findunitnopopup',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refCargoPopupGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'cargoItems',			// Main Store Name
	cgIndex: 0,
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * INITIALIZE START	
	 */
	onUnitPopupLoad: function (parms) {
		var me = this;
		var refs = me.getReferences();

		var store = this.getStore(me.MAIN_STORE_NAME);
		var cgGrid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		me.getViewModel().setData({ theSearch: parms.recvData.data });
		store.load({
			params: {
				vslCallId: parms.recvData.data.vslCallId,
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

	onSearch: function (parms) {
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var cgGrid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var params = me.getSearchCondition(parms);

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

	onCellClick: function () {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var vslCallId = selection.data.vslCallId;
		var cgNo = selection.data.cgNo;
		var store = this.getStore('unitItems');
		store.load({
			params: {
				vslCallId: vslCallId,
				cgNo: cgNo,
				ixCd: selection.data.ixCd
			},
			callback: function (records, operation, success) {
				if (success) {
				}
			}
		});
	},
	onDblClick: function () {
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

	afterSetCodePopupData: function (xtype, targetControl, returnValue) {
		var me = this;
		var refs = me.getReferences();
		me.getViewModel().setData({ theUnitInfo: returnValue.item });
	},
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	getSearchCondition: function (parms) {
		var me = this;
		var refs = me.getReferences();
		var ixCd = '';
		var searchParm = me.getViewModel().get('theSearch');
		(refs.ctlTypeOfTransport.getValue().tspt_radio == 'Import') ? ixCd = 'I' : ixCd = 'X';

		var params = {
			vslCallId: searchParm.vslCallId,
			ixCd: ixCd,
		}

		return params;
	},




	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */

});