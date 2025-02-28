Ext.define('MOST.view.popup.WHCheckerPopupController', {
    extend: 'MOST.view.foundation.BaseViewController',

    requires: [],

    alias: 'controller.whcheckerpopup',

	/**
	 * =========================================================================================================================
	 * GLOBAL VARIABLE START
	 */
    m_unusedCells: [],
    m_rentalCells: [],
    m_displayOccupiedInfo: null,
    m_cachedWhLocId: '',  //Cached first whLocId
    m_cachedCell: '',
    m_parm: {},

	/**
	 * GLOBAL VARIABLE END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * INITIALIZE START	
	 */
    onLoad: function () {
        var me = this;
        var refs = me.getReferences();
        me.m_parm = me.getView().recvData;
        me.m_displayOccupiedInfo = me.m_parm.displayOccupiedInfo
        me.onLoadCombo();

        var refs = me.getReferences();
        refs.refDetail.validate();
    },
    onLoadCombo: function () {
        var me = this;
        var refs = me.getReferences();
        var warehouseCombo = me.getStore('warehouseCombo');
        warehouseCombo.load({
            params: {
                locDivCd: "WHO"
            },
            callback: function (records, operation, success) {
                if (success) {
                    refs.reftxtActMT.setValue(me.m_parm.totMt == null ? 0 : me.m_parm.totMt);
                    refs.reftxtActM3.setValue(me.m_parm.totM3 == null ? 0 : me.m_parm.totM3);
                    refs.reftxtActQty.setValue(me.m_parm.totQty == null ? 0 : me.m_parm.totQty);
                    refs.reftxtBalMT.setValue(me.m_parm.totMt == null ? 0 : me.m_parm.totMt);
                    refs.reftxtBalM3.setValue(me.m_parm.totM3 == null ? 0 : me.m_parm.totM3);
                    refs.reftxtBalQty.setValue(me.m_parm.totMt == null ? 0 : me.m_parm.totQty);
                }
            }
        });
        refs.reftxtPlannedLoc.setLabel(me.m_displayOccupiedInfo ? 'Occupied' : 'Planned Loc');
        me.getPlannedOccupiedLocation();
    },
    onCboWHNOChange: function (obj, newVal, oldVal, index) {
        var me = this;
        var refs = me.getReferences();
        me.initializeRowBay();
       // refs.refcboRow.setPlaceholder('Select');
       // refs.refcboBay.setPlaceholder('Select');
    },
    onAdd: function () {
        var me = this;
        if (me.onValidate()) {
            if (!me.isExistAlready()) {
                me.addWHInfo();
            }
            else {
                MessageUtil.warning('warning_msg', 'whCheckerExist');
            }
            me.calcAmount();
        }
    },
    onUpdate: function () {
        var me = this;
        var refs = me.getReferences();
        var grid = refs.refWHPopupHHTGrid;
        var selectedRecord = grid.getSelection();
        if (!selectedRecord) {
            MessageUtil.warning("warning_msg", "whCheckerUpdateRecordEmptyMsg");
            return;
        }
        if (me.onValidate()) {
            me.updateWHInfo();
            me.calcAmount();
        }
    },
    onDelete: function () {
        var me = this;
        var refs = me.getReferences();
        var grid = refs.refWHPopupHHTGrid;
        var selectedRecord = grid.getSelection();
        if (!selectedRecord) {
            MessageUtil.warning("warning_msg", "whCheckerDeleteRecordEmptyMsg");
            return;
        }
        me.deleteWHInfo();
        me.calcAmount();
    },
    onValidate: function () {
        var me = this;
        var refs = me.getReferences();
        if (!me.validateRequiredField()) {
            return false;
        }
        if (me.isUnusedOrRentalCell()) {
            return false;
        }
        if (!me.validateAmount()) {
            return false;
        }
        if (!me.isRealValues()) {
            return false;
        }
        return true;
    },
    onConfirm: function (location, eOpts) {
        var me = this;
        if (me.validateRequiredField() && me.validateConfirmAmount()) {
            var window = me.getView().up('window');
            window.returnValue = me.returnWHInfo();
            window.close();
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
    initializeRowBay: function () {
        var me = this;
        var refs = me.getReferences();
        var whId = refs.refcboWHNO.getValue();
        if (whId) {
            //ROW
            var warehouseListRow = me.getViewModel().getStore('warehouseListRow');
            warehouseListRow.load({
                params: {
                    whId: whId,
                    locDivCd: "ROW"
                },
                callback: function (records, operation, success) {
                    if (success) {
                        warehouseListRow.insert(0, { rowwId: 'Select' });
                    }
                }
            });
            //BAY
            var warehouseListBay = me.getViewModel().getStore('warehouseListBay');
            warehouseListBay.load({
                params: {
                    whId: whId,
                    locDivCd: "BAY"
                },
                callback: function (records, operation, success) {
                    if (success) {
                        warehouseListBay.insert(0, { rowwId: 'Select' });
                    }
                }
            });
            // Unused cell: A1,B5,C2
            me.m_unusedCells = [];
            var warehouseListUnused = me.getViewModel().getStore('warehouseListUnused');
            warehouseListUnused.load({
                params: {
                    whId: whId,
                    locUseYn: 'N',
                    locDivCd: "CEL"
                },
                callback: function (records, operation, success) {
                    if (success) {
                        records.forEach(function (item) {
                            me.m_unusedCells.push(item.data.rowwId + item.data.bayId);
                        })
                    }
                }
            });
            // Rental cell: 4A-B2
            me.m_rentalCells = [];
            var rentalList = me.getViewModel().getStore('warehouseViewList');
            rentalList.load({
                params: {
                    whId: whId,
                    searchType: 'HHT',
                },
                callback: function (records, operation, success) {
                    if (success) {
                        records.forEach(function (item) {
                            me.m_rentalCells.push(item.data.locId + item.data.locId);
                        })
                    }
                }
            });
            if (me.m_displayOccupiedInfo && me.m_cachedCell && me.m_cachedCell.length > 1) {
                // m_cachedCell = "4A-B12" ==> row = "B", bay = "12"
                var arrCellLoc = me.m_cachedCell.split('-');
                if (arrCellLoc != null && arrCellLoc.length > 1) {
                    // cell = "B12"
                    var cell = arrCellLoc[1];
                    if (cell && cell.length > 1) {
                        var row = cell.substring(0, 1);
                        var bay = cell.substring(1, cell.length);
                        refs.refcboRow.setValue(row);
                        refs.refcboBay.setValue(bay);
                    }
                }
            }
        }
    },
    addWHInfo: function () {
        var me = this;
        var refs = me.getReferences();
        var theWarehouse = me.getViewModel().get('theWarehouse');
        var selectedWH = refs.refcboWHNO.getSelection();
        var gridStore = refs.refWHPopupHHTGrid.getStore();
        var newRow = Ext.create('MOST.model.configuration.WhConfiguration');
        
        newRow.data.whId = theWarehouse.whId;
        newRow.data.rowwId = theWarehouse.rowwId;
        newRow.data.bayId = theWarehouse.bayId;
        newRow.data.wgt = theWarehouse.wgt;
        newRow.data.msrmt = theWarehouse.msrmt;
        newRow.data.pkgQty = theWarehouse.pkgQty;
        var strLocId = theWarehouse.whId + "-" + theWarehouse.rowwId + theWarehouse.bayId ;
        newRow.data.locId = strLocId
        newRow.data.whTpCd =  me.m_parm.whTpCd;
        newRow.data.vslCallId = me.m_parm.vslCallId;
        newRow.data.locTpCd = selectedWH.get('locTpCd');

        gridStore.add(newRow);
    },
    updateWHInfo: function () {
        var me = this;
        var refs = me.getReferences();
        var grid = refs.refWHPopupHHTGrid;
        var selection = grid.getSelection();
        var theWarehouse = me.getViewModel().get('theWarehouse')
        selection.data = theWarehouse;
        grid.refresh ();
    },
    deleteWHInfo: function () {
        var me = this;
        var refs = me.getReferences();
        var gridStore = refs.refWHPopupHHTGrid.getStore();
        var selection = refs.refWHPopupHHTGrid.getSelection()
        if (selection) {
            gridStore.remove(selection);
        }
    },
    getPlannedOccupiedLocation: function () {
        var me = this;
        var refs = me.getReferences();
        var parm={};
        if (me.m_displayOccupiedInfo) {
            parm.searchType = "occupiedInfoHHT";
            parm.cgNo = me.m_parm.cgNo;
        }
        else {
            // Display planned info of S/N or B/L
            parm.searchType = "planInfoHHT";
            parm.whId = "";
            parm.blSn = me.m_parm.shipgNoteNo ? me.m_parm.shipgNoteNo : me.m_parm.blNo;
        }
        parm.vslCallId = me.m_parm.vslCallId;
        var warehouseOccupiedLocation = me.getViewModel().getStore('warehouseOccupiedLocation');
        warehouseOccupiedLocation.load({
            params: parm,
            callback: function (records, operation, success) {
                if (success) {
                    var i = 0;
                    var strPlannedLoc='';
                    records.forEach(function (item) {
                        if (i > 0) {
                            strPlannedLoc += "," + item.data.locId;
                            if (item.data.whTpCdNm) {
                                strPlannedLoc += "[" + item.data.whTpCdNm + "]";
                            }
                        }
                        else {
                            // Cache first whLocId and cell
                            me.m_cachedWhLocId = item.data.whLocId;
                            me.m_cachedCell = item.data.locId;
                            strPlannedLoc += item.data.locId;
                            if (item.data.whTpCdNm) {
                                strPlannedLoc += "[" + item.data.whTpCdNm + "]";
                            }
                        }
                        i++;
                    });
                    refs.refcboWHNO.setValue(me.m_cachedWhLocId);
                    
                    refs.reftxtPlannedLoc.setValue(strPlannedLoc);
                    if (me.m_displayOccupiedInfo) {
                        // Display cached occupied WH ID and cell (in case of Loading Cancel)
                        // WH ID: displayed according to m_cachedWhLocId.
                        if (me.m_cachedWhLocId) {
                            refs.refcboWHNO.setValue(me.m_cachedWhLocId);
                        }
                    }
                }
            }
        });
    },

    calcAmount: function () {
        var me = this;
        var refs = me.getReferences();
        var grdData = refs.refWHPopupHHTGrid.getStore();
        var mt = 0;
        var m3 = 0;
        var qty = 0;

        var rowNum = grdData.getCount();
        if (grdData.getCount() > 0) {
            for (var i = 0; i < rowNum; i++) {
                var item = grdData.getAt(i);
                var curMT = item.data.wgt;
                var curM3 = item.data.msrmt;
                var curQty = item.data.pkgQty;
                mt = mt + curMT;
                m3 = m3 + curM3;
                qty = qty + curQty;
            }
        }
        var strMt = me.m_parm.totMt - mt;
        var strM3 = me.m_parm.totM3 - m3;
        var strQty = me.m_parm.totQty - qty;
        refs.reftxtActMT.setValue(strMt);
        refs.reftxtActM3.setValue(strM3);
        refs.reftxtActQty.setValue(strQty);
        refs.reftxtBalMT.setValue(strMt);
        refs.reftxtBalM3.setValue(strM3);
        refs.reftxtBalQty.setValue(strQty);
    },
    returnWHInfo: function () {
        var me = this;
        var refs = me.getReferences();
        var grdData = refs.refWHPopupHHTGrid.getStore();
        if (grdData) {
            var rowsCnt = grdData.getCount();
            if (rowsCnt > 0) {
                // Get cell format, eg: 4A-E2
                var item = grdData.getAt(0);
                var strLocId = item.data.whId + "(" + item.data.rowwId + item.data.bayId + "," + rowsCnt + ")";
                var returnItem = {
                    arrWHLocation: grdData.getData(),
                    locId: strLocId,
                    totMt: item.data.wgt,
                    totM3: item.data.msrmt,
                    totQty: item.data.pkgQty,
                    plannedLoc: refs.reftxtPlannedLoc.getValue()
                }
                return returnItem;
            }

        }
    },
    onCancel: function () {
        var me = this;
        var refs = me.getReferences();
        var gridStore = refs.refWHPopupHHTGrid.getStore();
        if(gridStore.getCount()>0)
        {
            MessageUtil.questionModern('confirm', 'Changes NOT saved. Commit changes', null,
			function (button) {
				if (button === 'cancel') {
                    var window = me.getView().up('window');
                    window.close();
				}
			});
        }
        else
        {
            var window = me.getView().up('window');
            window.close();
        }
    },
    onCellClick: function () {
        var me = this;
        var refs = me.getReferences();
        var grid = me.lookupReference('refWHPopupHHTGrid');
        var selection = grid.getSelection() == null ? null : grid.getSelection();
        me.getViewModel().set('theWarehouse', selection.getData());
    },
    isUnusedOrRentalCell: function () {
        var me = this;
        var refs = me.getReferences();
        // Selected cell: A2
        var selectedCell = refs.refcboRow.getValue() + refs.refcboBay.getValue();
        if (me.m_unusedCells.includes(selectedCell)) {
            MessageUtil.warning('warning_msg', 'whCheckerUnusedArea');
            return true;
        }
        // Selected cell: 4A-A2
        selectedCell = refs.refcboWHNO.getValue() + "-" + selectedCell;
        if (me.m_rentalCells.includes(selectedCell)) {
            MessageUtil.warning('warning_msg', 'whCheckerRental');
            return true;
        }
        return false;
    },
    isRealValues: function () {
        var me = this;
        var refs = me.getReferences();
        var bIsReal = true;
        var iCount = 0;
        if (!refs.reftxtActMT.getValue() || refs.reftxtActMT.getValue() == 0)
            iCount++;
        if (!refs.reftxtActM3.getValue() || refs.reftxtActM3.getValue() == 0)
            iCount++;
        if (!refs.reftxtActQty.getValue() || refs.reftxtActQty.getValue() == 0)
            iCount++;

        if (iCount == 3) {
            bIsReal = false;
            MessageUtil.warning('warning_msg', 'whCheckerRealValue');
        }

        return bIsReal;
    },
    validateRequiredField: function () {
        var me = this;
        var refs = me.getReferences();
        var detailForm = refs.refDetail.validate();
        //Check required field:
        if (!detailForm) {
            MessageUtil.warning('warning_msg', 'whCheckerMissingRequiredField');
            return false;
        }
        return true;
    },
    validateAmount: function () {
        var me = this;
        var refs = me.getReferences();
        var result = true;

        var balMt = refs.reftxtBalMT.getValue();
        var balM3 = refs.reftxtBalM3.getValue();
        var balQty = refs.reftxtBalQty.getValue();

        var actMt = refs.reftxtActMT.getValue();
        var actM3 = refs.reftxtActM3.getValue();
        var actQty = refs.reftxtActQty.getValue();

        if (balQty < actQty || balMt < actMt || balM3 < actM3) {
            MessageUtil.warning('warning_msg', 'whCheckerActualAmountExceed');
            result = false;
        }
        return result;
    },
    validateConfirmAmount: function () {
        var me = this;
        var refs = me.getReferences();
        var balMt = refs.reftxtBalMT.getValue();
        var balM3 = refs.reftxtBalM3.getValue();
        var balQty = refs.reftxtBalQty.getValue();

        if (balQty > 0 || balMt > 0 || balM3 > 0) {
            MessageUtil.warning('warning_msg', 'whCheckerConfirmAmount');
            return false;
        }

        return true;
    },
    isExistAlready: function () {
        var me = this;
        var refs = me.getReferences();
        var isExist = false;
        // Make sure WHID, ROW, BAY to be unique.
        var strWHId = refs.refcboWHNO.getValue();
        var strRow = refs.refcboRow.getValue();
        var strBay = refs.refcboBay.getValue();
        var grdData = refs.refWHPopupHHTGrid.getStore();
        var count = grdData.getCount();
        if (count > 0) {
            grdData.each(function (record) {
                var whId = record.data.whId;
                var row = record.data.rowwId;
                var bay = record.data.bayId;
                if (strWHId === whId && strRow === row && strBay === bay) {
                    isExist = true;
                    return isExist;
                }
            })
        }
        return isExist;
    }
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */

});