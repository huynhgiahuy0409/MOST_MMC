Ext.define('MOST.view.popup.WHCheckerRoRoPopupController', {
    extend: 'MOST.view.foundation.BaseViewController',

    requires: [],

    alias: 'controller.whcheckerroropopupctl',

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
        
        if(me.m_parm){
        	me.getView().up('window').setTitle(me.m_parm.title);
        	me.m_displayOccupiedInfo = me.m_parm.displayOccupiedInfo
        }
        
        me.onLoadCombo();

        var refs = me.getReferences();
        refs.refDetail.validate();
    },
    onLoadCombo: function () {
        var me = this;
        var refs = me.getReferences();
        var warehouseCombo = me.getStore('warehouseList');
        warehouseCombo.load({
			params : {
				locDivCd : 'WHO',
				areaId : 'BBT',
				locUseYn : 'Y'
			},

			callback: function(records, operation, success) {
				if (success) {
					me.setHandlingCargoInformation();
				}
			}
		});
        refs.reftxtPlannedLoc.setLabel(me.m_displayOccupiedInfo ? 'Occupied' : 'Planned Loc');
        me.getPlannedOccupiedLocation();
    },
    
    setHandlingCargoInformation : function(){
		var me = this;
		var refs = me.getReferences();

		var recvData = me.getView().recvData;
		if(recvData){
			refs.refCgNo.setValue(recvData.data.cgNo);
			refs.reftxtPlannedLoc.setValue(recvData.get('yardPlanLoc'));
			
			if(recvData.get('yardLoc') == null){
				var whId = recvData.get('unitYardLoc').split('-');
			} else {
				var whId = recvData.get('yardLoc').split('-');
				refs.reftxtPlannedLoc.setValue(recvData.get('yardLoc'));
			}
			
			if(!whId[1]) return;
			var rowwId 	= whId[1].substring(0,1);
			var bayId 	= whId[1].replace(/^\D+/g, "");
			
			refs.refcboWHNO.setValue(whId[0]);
			refs.refcboRow.setValue(rowwId);
			refs.refcboBay.setValue(bayId);
		}
		
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
//        if (me.onValidate()) {
//            if (!me.isExistAlready()) {
                me.addWHInfo();
//            }
//            else {
//                MessageUtil.warning('warning_msg', 'whCheckerExist');
//            }
//        }
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
        return true;
    },
    onConfirm: function (location, eOpts) {
        var me = this;
        if (me.validateRequiredField()) {
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
        
        if(gridStore.data.length == 0){
        	newRow.data.whId = theWarehouse.whId;
            newRow.data.rowwId = theWarehouse.rowwId;
            newRow.data.bayId = theWarehouse.bayId;
            var strLocId = theWarehouse.whId + "-" + theWarehouse.rowwId + theWarehouse.bayId ;
            newRow.data.locId = strLocId
            newRow.data.whTpCd =  me.m_parm.whTpCd;
            newRow.data.vslCallId = me.m_parm.vslCallId;
            newRow.data.locTpCd = selectedWH.get('locTpCd');

            gridStore.add(newRow);
        } else {
        	me.updateWHInfo();
        }
    },
    updateWHInfo: function () {
        var me = this;
        var refs = me.getReferences();
        var grid = refs.refWHPopupHHTGrid;
        var selection = grid.getSelection();
        
        if(selection == null){
        	MessageUtil.warning('warning_msg', 'Please select data!');
			return;
        }
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
            parm.blSn == me.m_parm.ShipgNoteNo ? me.m_parm.ShipgNoteNo : me.m_parm.cgNo;
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
                    
                    if(me.m_parm.get('yardPlanLoc') == null 
                    		&& me.m_parm.get('yardPlanLoc') == '') {
                    	refs.reftxtPlannedLoc.setValue(strPlannedLoc);
                    }
                    
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

    returnWHInfo: function () {
        var me = this;
        var refs = me.getReferences();
        var grdData = refs.refWHPopupHHTGrid.getStore();
        if (grdData) {
            var rowsCnt = grdData.getCount();
            if (rowsCnt > 0) {
                // Get cell format, eg: 4A-E2
                var item = grdData.getAt(0);
//                var strLocId = item.data.whId + "(" + item.data.rowwId + item.data.bayId + "," + rowsCnt + ")";
                var strLocId = item.data.whId + "-" + item.data.rowwId + item.data.bayId;
                var returnItem = {
                    arrWHLocation: grdData.getData(),
                    locId: strLocId,
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
				if (button === 'ok') {
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
        
        me.returnWHInfo();
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