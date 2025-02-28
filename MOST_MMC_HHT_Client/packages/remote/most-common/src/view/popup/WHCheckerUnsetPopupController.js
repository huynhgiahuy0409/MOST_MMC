Ext.define('MOST.view.popup.WHCheckerUnsetPopupController', {
    extend: 'MOST.view.foundation.BaseViewController',

    requires: [],

    alias: 'controller.whcheckerunsetpopup',

	/**
	 * =========================================================================================================================
	 * GLOBAL VARIABLE START
	 */
    WHTPCD_GENERAL: 'G',  // Normal cargo
    WHTPCD_SHUTOUT: 'S', // Shut-out cargo
    WHTPCD_DAMAGE: 'D',  // Damage cargo
    MODE_ADD: 1,
    MODE_UPDATE: 2,
    MODE_DELETE: 3,
    m_isSpareCg: false,
    gridSelected: false,
    m_whTpCd: '',
    m_whConfigItems: [],
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
        me.m_parm = me.getView().recvData;
        me.m_isSpareCg = me.m_parm.isSpareCg;
        me.onLoadCombo();
        me.setVisibleControl();
        
        var refs = me.getReferences();
        refs.refDetail.validate();
    
        var title = "";
        if(me.m_parm){
			me.getView().up('window').setTitle(me.m_parm.title);
		}
		
    },
    onLoadCombo: function () {
        var me = this;
        var refs = me.getReferences();
        refs.reftxtTotMt.setValue(me.m_parm.totMt == null ? 0 : me.m_parm.totMt);
        refs.reftxtTotM3.setValue(me.m_parm.totM3 == null ? 0 : me.m_parm.totM3);
        refs.reftxtTotQty.setValue(me.m_parm.totQty == null ? 0 : me.m_parm.totQty);
        if (me.m_isSpareCg) {
            me.initializeSpareCg();
        }
        else {
        	
        	if (me.m_parm.shipgNoteNo) {
                me.initializeLocation(me.m_parm.shipgNoteNo, true);
            } 
            else {
                me.initializeLocation(me.m_parm.cgNo);
            }
            //me.initializeLocation(me.m_parm.cgNo);
        }
    },
    onCboWHNOChange: function(){
        var me = this; 
        var refs = me.getReferences(); 
        me.initializeLocation(refs.refcboSpareCg.getValue());
    },
    oncboLocationChange: function () {
        var me = this;
        var refs = me.getReferences();
        me.m_whTpCd = '';
        var item = refs.refcboLocation.getSelection();
        if (item) {
            var strCellMt = item.data.wgt;
            var strCellM3 = item.data.msrmt;
            var strCellQty = parseInt(item.data.pkgQty);
            
            refs.reftxtCellMt.setValue(strCellMt);
            refs.reftxtCellM3.setValue(strCellM3);
            refs.reftxtCellQty.setValue(strCellQty);
            me.calcAmount(strCellMt, strCellM3, strCellQty);

            me.m_whTpCd = item.data.whTpCd;
        }
    },
    oncboSpareCg: function () {
        var me = this;
        var refs = me.getReferences();
        me.initializeLocation(refs.refcboSpareCg.getValue());
    },
    onAdd: function () {
        var me = this;
        if (me.onValidate(me.MODE_ADD)) {
            me.addWHInfo();
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
        if (me.onValidate(me.MODE_UPDATE)) {
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
    onValidate: function (mode) {
        var me = this;
        var refs = me.getReferences();
        if (!me.validateRequiredField()) {
            return false;
        }
        // Make sure LOCID to be unique.
        if (me.isExistAlready(mode)) {
            return false;
        }
        // Validate amount
        if (!me.validateAmount(mode)) {
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
                else if(button === 'ok'){
                    if (me.validateRequiredField() && me.validateConfirmAmount()) {
                        var window = me.getView().up('window');
                        window.returnValue = me.returnWHInfo();
                        window.close();
                    }
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
        var grid = refs.refWHPopupHHTGrid;
        var selection = grid.getSelection() == null ? null : grid.getSelection();
        me.gridSelected = true;
        me.getViewModel().set('theWarehouse', selection.getData());
       
        if (me.m_isSpareCg || (me.m_parm && 'S' === me.m_parm.SpCaCoCd)) {
            var strCgNo = selection.data.cgNo;
            refs.refcboSpareCg.setValue(strCgNo);
        }
    },
    setVisibleControl: function () {
        var me = this;
        var refs = me.getReferences();
    
        if (me.m_isSpareCg) {
            refs.refcboSpareCg.setHidden(false);
            refs.reftxtCgNo.setHidden(true);

            refs.refcboSpareCg.setRequired(true);
            refs.reftxtCgNo.setRequired(false);
        }
        else {
            refs.refcboSpareCg.setHidden(true);
            refs.reftxtCgNo.setHidden(false);
            refs.refcboSpareCg.setRequired(false);
            refs.reftxtCgNo.setRequired(true);
            refs.reftxtCgNo.setValue(me.m_parm.cgNo);

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
    initializeSpareCg: function () {
        var me = this;
        var refs = me.getReferences();
        var vslCallId = '';
        var sprYn = 'Y';
        var shipgNoteNo = '';
        if (me.m_parm != null) {
            vslCallId = me.m_parm.vslCallId;
            shipgNoteNo = me.m_parm.shipgNoteNo;
        }
        var exportList = me.getViewModel().getStore('exportList');
        exportList.load({
            params: {
                vslCallId: vslCallId,
                shipgNoteNo: shipgNoteNo,
                sprYn: sprYn
            },
            callback: function (records, operation, success) {
                if (success) {
                }
            }
        });


    },

    initializeLocation: function (strCgNo, isExport) {
        var me = this;
        var refs = me.getReferences();
        if (strCgNo ) {
            var spCaCoCd = '';
            var shipgNoteNo = '';
            var cgNo = strCgNo;
            var vslCallId = '';
            if (me.m_parm != null) {
                vslCallId = me.m_parm.vslCallId;
            }
            var whTpCd = me.preprocessWhTpCd();
            if (me.m_isSpareCg || !me.m_parm && 'S' === me.m_parm.SpCaCoCd) {
                spCaCoCd = 'S';
            }
            
            if (isExport) {
                shipgNoteNo = strCgNo
                cgNo = '';
            }
            
            var locList = me.getViewModel().getStore('locList');
            me.m_whConfigItems = [];
            var warehouseViewList = me.getViewModel().getStore('warehouseViewList');
            warehouseViewList.load({
                params: {
                	shipgNoteNo: shipgNoteNo,
                    cgNo: cgNo,
                    vslCallId: vslCallId,
                    searchType: 'occupiedInfoHHT',
                    spCaCoCd: spCaCoCd,
                    whTpCd: whTpCd,
                },
                callback: function (records, operation, success) {
                    if (success && locList.getCount()<=0) {
                        var i = 0;
                        records.forEach(function (item) {
                            var strLoc = item.data.locId + "[" + item.data.whTpCdNm + "]";
                            locList.insert(i, 
                                { 
                                    locId: item.data.locId, 
                                    strLoc: strLoc,
                                    wgt: item.data.wgt,
                                    msrmt: item.data.msrmt,
                                    pkgQty:  item.data.pkgQty,
                                    whTpCd: item.data.whTpCd,
                                    locTpCd: item.data.locTpCd
                                });
                            me.m_whConfigItems.push(item);
                            i++;
                        })
                    }
                }
            });
        }
    },
    preprocessWhTpCd: function () {
        // pre-process whTpCd as whTpCd = "D','S','G"
        var me = this;
        var strWhTpCd;
        if (me.m_parm.isGeneralCg) {
            if(!strWhTpCd)
            {
                 strWhTpCd = "G'";
            }
            else
            {
                strWhTpCd += ",'G'";
            }
        }
        if (me.m_parm.isDamageCg) {
            if(!strWhTpCd)
            {
                 strWhTpCd = "D'";
            }
            else
            {
                strWhTpCd += ",'D'";
            }
        } 
        if (me.m_parm.isShutoutCg) {
            if(!strWhTpCd)
            {
                 strWhTpCd = "S'";
            }
            else
            {
                strWhTpCd += ",'S'";
            }
        }
        // whTpCd = "D','S','G'"  --> whTpCd = "D','S','G"
        if (strWhTpCd && strWhTpCd.length > 1) {
            strWhTpCd = strWhTpCd.substring(0, strWhTpCd.length - 1);
        }
        
        return strWhTpCd;
    },

    addWHInfo: function () {
        var me = this;
        var refs = me.getReferences();
        var theWarehouse = me.getViewModel().get('theWarehouse');
        var selectedLoc = refs.refcboLocation.getSelection();

        var gridStore = refs.refWHPopupHHTGrid.getStore();
        var newRow = Ext.create('MOST.model.configuration.WhConfiguration');
        if (me.m_isSpareCg || (me.m_parm && 'S' === me.m_parm.SpCaCoCd))
        {
            newRow.data.cgNo = refs.refcboSpareCg.getValue();
            newRow.data.spCaCoCd = 'S'; 
        } 
        else
        {
            if (me.m_parm)
            {
                newRow.data.cgNo = me.m_parm.cgNo;
                newRow.data.spCaCoCd = '';
            }
        }
        newRow.data.whId = theWarehouse.whId;
        newRow.data.whTpCd = me.m_whTpCd;
        newRow.data.wgt = theWarehouse.wgt;
        newRow.data.msrmt = theWarehouse.msrmt;
        newRow.data.pkgQty = theWarehouse.pkgQty;
        newRow.data.vslCallId = me.m_parm.vslCallId;
        newRow.data.locId = theWarehouse.whId;
        newRow.data.locTpCd = selectedLoc.get('locTpCd');
        gridStore.add(newRow);
    },
    updateWHInfo: function () {
        var me = this;
        var refs = me.getReferences();
        var grid = refs.refWHPopupHHTGrid;
        var selection = grid.getSelection();
        var theWarehouse = me.getViewModel().get('theWarehouse')
        if (me.m_isSpareCg || (me.m_parm && 'S' === me.m_parm.spCaCoCd))
        {
            theWarehouse.cgNo = refs.refcboSpareCg.getValue();
        } 
        else if (me.m_parm)
        {
            theWarehouse.cgNo = me.m_parm.cgNo;
        }
        
        selection.data = theWarehouse
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
    calcAmount: function (dCellMt, dCellM3, iCellQty) {
        var me = this;
        var refs = me.getReferences();
        var grdData = refs.refWHPopupHHTGrid.getStore();
        // Total amount
        var dTotMt = refs.reftxtTotMt.getValue();
        var dTotM3 = refs.reftxtTotM3.getValue();
        var iTotQty = refs.reftxtTotQty.getValue();

        // Total of grid amount
        var dGrdMt = 0;
        var dGrdM3 = 0;
        var iGrdQty = 0;
        if(grdData)
        {
            var rowNum = grdData.getCount();
            if (grdData.getCount() > 0) {
                for (var i = 0; i < rowNum; i++) {
                    var item = grdData.getAt(i);
                    dGrdMt += item.data.wgt;
                    dGrdM3 += item.data.msrmt;
                    iGrdQty += item.data.pkgQty;
                }
            }
        }
       
        // Remained amount
        var dRemainedMt = dTotMt - dGrdMt;
        var dRemainedM3 = dTotM3 - dGrdM3;
        var iRemainedQty = iTotQty - iGrdQty;
        // Display the smaller one at actual amount text box.
        refs.reftxtMT.setValue(dCellMt > dRemainedMt ? dRemainedMt : dCellMt);
        refs.reftxtM3.setValue(dCellM3 > dRemainedM3 ? dRemainedM3 : dCellM3);
        refs.reftxtQty.setValue(iCellQty > iRemainedQty ? iRemainedQty : iCellQty);
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
                var strTmp = item.data.whId;
                var strLocId = strTmp.substring(0, (strTmp.lastIndexOf('-'))) + "(" + strTmp.substring(strTmp.lastIndexOf('-') + 1) + "," + rowsCnt + ")";
                var returnItem = {
                    arrWHLocation: grdData.getData(),
                    locId: strLocId,
                    totMt: item.data.wgt,
                    totM3: item.data.msrmt,
                    totQty: item.data.pkgQty,
                }
                return returnItem;
            }
        }
    },
  
    isExistAlready: function (mode) {
        var me = this;
        var refs = me.getReferences();
        var strWHId = refs.refcboLocation.getValue();
        var strCgNo = '';
        if (me.m_isSpareCg || (me.m_parm && "S" === me.m_parm.spCaCoCd)) {
            strCgNo = refs.refcboSpareCg.getValue();
        }
        else if (me.m_parm) {
            strCgNo = me.m_parm.cgNo;
        }
        var grdData = refs.refWHPopupHHTGrid.getStore();
        if (grdData) {
            var count = grdData.getCount()
            if(count > 0){
                var index = count - 1;
                var item = grdData.getAt(index);
                var cgNo = item.data.cgNo;
                var whId = item.data.whId;
                var grid =refs.refWHPopupHHTGrid;
                var selectedRecord = grid.getSelection();
                var currentRowIndex = grid.store.indexOf(selectedRecord);
                while (strCgNo !== cgNo || strWHId !== whId) {
                    index = index - 1;
                    item = grdData.getAt(index);
                    if (index < 0) {
                        return false;
                    }
                    if (mode == me.MODE_ADD || mode == me.MODE_UPDATE && index != currentRowIndex) {
                        cgNo = item.data.cgNo;
                        whId = item.data.whId;
                    }
                }
                if (mode == me.MODE_ADD) {
                    if (index >= 0) {
                        MessageUtil.warning('warning_msg', 'whCheckerExist');
                        return true;
                    }
                }
                else if (mode == me.MODE_UPDATE) {
                    if (index >= 0 && index != currentRowIndex) {
                        MessageUtil.warning('warning_msg', 'whCheckerExist');
                        return true;
                    }
                }
            }
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
    validateAmount: function () {
        var me = this;
        var refs = me.getReferences();
        // Validate amount: cell amount <= actual amount
        var cellMt = refs.reftxtCellMt.getValue();
        var cellM3 = refs.reftxtCellM3.getValue();
        var cellQty = refs.reftxtCellQty.getValue();
        var mt = refs.reftxtMT.getValue();
        var m3 = refs.reftxtM3.getValue();
        var qty = refs.reftxtQty.getValue();
        if (cellMt < mt || cellM3 < m3 || cellQty < qty) {
            MessageUtil.warning('warning_msg', 'whCheckerActualAmountExceedStacked');
            return false;
        }     
        // Validate amount: total actual amount <= inputted amount
        var inpMt = refs.reftxtTotMt.getValue();
        var inpM3 = refs.reftxtTotM3.getValue();
        var inpQty = refs.reftxtTotQty.getValue();
        var actTotMt = mt;
        var actTotM3 = m3;
        var actTotQty = qty;
        var grdData = refs.refWHPopupHHTGrid.getStore();
        if (grdData != null && grdData.DataTable != null && grdData.DataTable.Rows.Count > 0) {
            var rowCnt = grdData.DataTable.Rows.Count;
            for (var i = 0; i < rowCnt; i++) {
                if (mode != Constants.MODE_UPDATE || i != grdData.CurrentRowIndex) {
                    var item = grdData.getAt(i);
                    actTotMt += item.data.wgt;
                    actTotM3 += item.data.msrmt;
                    actTotQty += item.data.pkgQty;
                }
            }
        }
        if (inpMt > actTotMt || inpM3 > actTotM3 || inpQty > actTotQty) {
            MessageUtil.warning('warning_msg', 'whCheckerTotalActualAmountExceed');
            return false;
        }
        return true;
    },
    validateConfirmAmount: function () {
        var me = this;
        var refs = me.getReferences();
        var inpMt = refs.reftxtTotMt.getValue();
        var inpM3 = refs.reftxtTotM3.getValue();
        var inpQty = refs.reftxtTotQty.getValue();
        var grdData = refs.refWHPopupHHTGrid.getStore();
        var actTotMt = 0;
        var actTotM3 = 0;
        var actTotQty = 0;

        if (grdData && grdData.getCount() > 0) {
            var rowCnt = grdData.getCount();
            for (let i = 0; i < rowCnt; i++) {
                var item = grdData.getAt(i);
                actTotMt += item.data.wgt;
                actTotM3 += item.data.msrmt;
                actTotQty += item.data.pkgQty;
            }
        }
        if (inpMt != actTotMt || inpM3 != actTotM3 || inpQty != actTotQty) {
            MessageUtil.warning('warning_msg', 'whCheckerConfirmAmount');
            return false;
        }
        return true;
    },
   
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */

});