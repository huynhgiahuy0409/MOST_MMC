Ext.define("MOST.view.planning.MegaForContractorController", {
    extend: "MOST.view.foundation.BaseViewController",

    requires: [],

    alias: "controller.megaforcontractor",

    /**
     * =========================================================================================================================
     * CONSTANT START
     */
    DETAIL_PROXY_URL:
        MOST.config.Locale.getRestApiDestUrl() + "/v1/mega/detail",
    MAX_PERIOD_DAY: 31,

    alertYN: "N",
    alertTp: "",
    rptTp: "",
    nofGang: 0,
    nofWchmn: 0,
    nofStvdSprr: 0,
    nofStvdGwker: 0,
    nofHatch: 0,
    nofSglmn: 0,
    nofDekmn: 0,
    nofHopmn: 0,
    nofTrmgGwker: 0,
    nofStvdGwker: 0,

    USER_TYPE_EXTERNAL: "E",
    USER_TYPE_INTERNAL: "I",

    FILE_GRID_REF_NAME: 'refMegaForContractorFileUploadGrid',
    FILE_UPLOAD_STORE_NAME: 'megaForContractorFileUpload',
    FILE_DOWNLOAD_STORE_NAME: 'megaForContractorFileDownload',
    
    /**
     * CONSTANT END
     * =========================================================================================================================
     *
     *
     * /**
     * =========================================================================================================================
     * INITIALIZE START
     */
    // After Renderer Event

    onLoad: function () {
        var me = this;
        var refs = me.getReferences();
        var deploymentCombo = me.getStore("megaRequisitionDeploymentCombo");

        me.USER_TYPE = MOST.config.Token.getUserType();

        deploymentCombo.load();
        me.setCombo();

        me.setDateInDays("ctlFromDt");

        var recvData = me.getView().recvData;

        if (recvData != null) {
            refs.ctlFromDt.setValue("");
            refs.ctlToDt.setValue("");
            me.alertTp = recvData.alertTp;
            me.alertYN = "Y";
            me.onSearch();
        }
    },

    // Combo Setting
    setCombo: function () {
        var me = this;
        var shiftCombo = me.getStore('megaRequisitionShiftCombo');
        var purposeCombo = me.getStore('megaRequisitionPurposeCombo');
        var megaStatusCombo = me.getStore('megaRequisitionMegaStatusCombo');

        shiftCombo.load();
        purposeCombo.load();
        megaStatusCombo.load();
    },

    /**
     * INITIALIZE END
     * =========================================================================================================================
     */

    /**
     * =========================================================================================================================
     * EVENT HANDLER START
     */
    onSearchBtn: function () {
        var me = this;
        me.alertYN = "N";
        me.onSearch();
    },

    // Search Event Handler
    onSearch: function () {
        var me = this;
        var refs = me.getReferences();
        var store = me.getStore("megaContractor");
        var params = me.getSearchCondition();

        if (params == null) {
            return;
        }

        store.load({
            params: params,
            callback: function (records, operation, success) {
                if (success) {
                    if (records.length === 0) {
                        MessageUtil.info("info_msg", "select_applyDate_msg");
                    }
                }
            },
        });
    },

    // Refresh
    onRefresh: function (controlName) {
        var me = this;
        me.refreshControl(controlName);
    },

    onMegaGridClick: function (gridview, tdEl, cellIndex, record, trEl, rowIndex, e) {
        var me = this;
        var refs = me.getReferences();

        me.nofGang = 0;
        me.nofStvdSprr = 0;
        me.nofWchmn = 0;
        me.nofStvdGwker = 0;

        me.nofHatch = 0;
        me.nofSglmn = 0;
        me.nofDekmn = 0;
        me.nofHopmn = 0;
        me.nofTrmgGwker = 0;
        me.nofTrmgSprr = 0;

        me.nofGang = parseFloat(record.get("nofGang"));
        me.nofWchmn = parseFloat(record.get("nofWchmn"));
        me.nofStvdSprr = parseFloat(record.get("nofStvdSprr"));
        me.nofStvdGwker = parseFloat(record.get("nofStvdGwker"));

        me.nofHatch = parseFloat(record.get("nofHatch"));
        me.nofSglmn = parseFloat(record.get("nofSglmn"));
        me.nofDekmn = parseFloat(record.get("nofDekmn"));
        me.nofHopmn = parseFloat(record.get("nofHopmn"));
        me.nofTrmgGwker = parseFloat(record.get("nofTrmgGwker"));
        me.nofTrmgSprr = parseFloat(record.get("nofTrmgSprr"));

        refs.ctlNosofGang.setValue(me.nofGang.toFixed(0));
        refs.ctlBBSupervisor.setValue(me.nofStvdSprr.toFixed(0));
        refs.ctlWinchMen.setValue(me.nofWchmn.toFixed(0));
        refs.ctlBBGeneralWorkers.setValue(me.nofStvdGwker.toFixed(0));

        refs.ctlNosofHatch.setValue(me.nofHatch.toFixed(0));
        refs.ctlDBSupervisor.setValue(me.nofTrmgSprr.toFixed(0));
        refs.ctlSignalMen.setValue(me.nofSglmn.toFixed(0));
        refs.ctlDeckMen.setValue(me.nofDekmn.toFixed(0));
        refs.ctlHoperMen.setValue(me.nofHopmn.toFixed(0));
        refs.ctlDBGeneralWorkers.setValue(me.nofTrmgSprr.toFixed(0));
    },

    // Text Upper Case
    onUpperCase: function (control) {
        control.setValue(control.getValue().toUpperCase());
    },

    // JPVC OPEN POPUP
    openJpvcPopup: function () {
        var me = this;
        me.openCodePopup("popup-vesselfindpopup", "ctlJpvc");
    },

    // S/A OPEN POPUP
    openSaPopup: function () {
        var me = this;
        me.openCodePopup("popup-payercdtypepopup", "ctlSa");
    },

    // Commodity POPUP
    openCommodityPopup: function () {
        var me = this;
        var params = {
            searchType: "CMDT",
        };
        me.openCodePopup("popup-cmmcdpopup", "ctlDetailCommodity", params);
    },

    // Requester POPUP
    openRequesterPopup: function () {
        var me = this;
        me.openCodePopup("popup-usertypepopup", "ctlDetailRequester");
    },

    // Date Change Event
    onDateChange: function (control, newValue, oldValue, eOpts) {
        var me = this;
        var refs = me.getReferences();

        if (newValue != null && newValue != "") {
            refs.ctlServiceDate.setValue("");
        }

        var toDate = refs.ctlToDt.getValue();
        var fromDate = refs.ctlFromDt.getValue();

        var Difference_In_Time = null;
        var Difference_In_Days = null;

        if (control == refs.ctlFromDt) {
            me.setDateInDaysByDate(
                "ctlToDt",
                me.MAX_PERIOD_DAY,
                control.getValue()
            );
        } else {
            if (fromDate) {
                Difference_In_Time =
                    control.getValue().getTime() - fromDate.getTime();
                Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                if (Difference_In_Days > me.MAX_PERIOD_DAY) {
                    me.setDateInDaysByDate(
                        "ctlFromDt",
                        -me.MAX_PERIOD_DAY,
                        control.getValue()
                    );
                } else if (Difference_In_Days < 0) {
                    refs.ctlToDt.setValue(fromDate);
                }
            }
        }
    },

    // Grid combo Renderer
    onGridComboRenderer: function (val, cell) {
        var me = this;
        var refs = me.getReferences();

        var codeComboStore = null;
        var displayFieldName = "scdNm";
        var codeFieldName = "scd";

        if (cell.column.dataIndex === "eqDivCd") {
            // Mecanical Tab
            // Equipment Type
            codeComboStore = me
                .getViewModel()
                .getStore("megaDetailEqTypeCombo");
        } else if (cell.column.dataIndex === "capaCd") {
            // Mecanical Tab
            // Capacity
            codeComboStore = me
                .getViewModel()
                .getStore("megaDetailCapacityCombo");
            displayFieldName = "capaDescr";
            codeFieldName = "capaCd";

            if (codeComboStore.getData().length == 0) {
                return cell.record.get("capaDescr");
            }
        } else if (cell.column.dataIndex === "capaCd") {
            // Mecanical Tab Working
            // area
            codeComboStore = me
                .getViewModel()
                .getStore("megaDetaiWorkingAreaCombo");
            displayFieldName = "cdNm";
            codeFieldName = "cd";
        } else if (cell.column.dataIndex === "shftId") {
            // Shift Name
            codeComboStore = me
                .getViewModel()
                .getStore("megaRequisitionShiftCombo");
            displayFieldName = "shftNm";
            codeFieldName = "shftId";
        }

        if (codeComboStore != null) {
            var indx = codeComboStore.find(codeFieldName, val);

            if (indx != -1) {
                return codeComboStore.getAt(indx).get(displayFieldName);
            }
        }

        return "";
    },
    onShiftChange: function () {
        var me = this;
        var refs = me.getReferences();
        var shifrId = refs.ctlDetailMegaShift.getValue();
        var Hh = "";
        var hhstring;
        var stevedore = me.getViewModel().get("theStevedore");
        var tally = me.getViewModel().get("theTally");
        var lashing = me.getViewModel().get("theLashing");
        var trim = me.getViewModel().get("theTrimming");
        var trim = me.getViewModel().get("theTrimming");
        var crew = me.getViewModel().get("theCrew");

        if (shifrId == "SF0014") {
            me.TIME_FOR_SHIFT = "07:00";
            Hh = 7;
            hhstring = "0700";
        } else if (shifrId == "SF0012") {
            me.TIME_FOR_SHIFT = "15:00";
            Hh = 15;
            hhstring = "1500";
        } else if (shifrId == "SF0013") {
            me.TIME_FOR_SHIFT = "23:00";
            Hh = 23;
            hhstring = "2300";
        }
        // Update by Harry
        if (refs.ctlDetailMegaNo.getValue() != "") {
            refs.ctlStvReqHh.setValue(stevedore.data.reqTime);
            refs.ctlTallyRegHh.setValue(tally.data.reqTime);
            refs.ctlLshRegHh.setValue(lashing.data.reqTime);
            refs.ctlVesselOperationRegHh.setValue(crew.data.reqTime);
            refs.ctlTrimReqHh.setValue(trim.data.reqTime);
        } else {
            refs.ctlStvReqHh.setValue(Hh);
            refs.ctlTallyRegHh.setValue(Hh);
            refs.ctlLshRegHh.setValue(Hh);
            refs.ctlVesselOperationRegHh.setValue(Hh);
            refs.ctlTrimReqHh.setValue(Hh);
        }

        me.initDefaultReqTime();

        var gears = me.getStore("megaDetailGears");
        var forklift = me.getStore("megaDetailForklift");
        var trailer = me.getStore("megaDetailTrailer");
        var mechanical = me.getStore("megaDetailMechanical");
        var portCrane = me.getStore("megaDetailPortCrane");
    },

    updateReqestTime: function (store, reqTime) {
        for (var i = 0; i < store.data.length; i++) {
            var record = store.data.items[i];
            record.set("dspReqhhmm", reqTime);
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
    // Search Condition
    getSearchCondition: function () {
        var me = this;
        var refs = me.getReferences();
        var dateCondition = "";
        var serviceDate = me.checkDate("ctlServiceDate");
        var jpvcNo = refs.ctlJpvc.getValue();
        var shift = refs.ctlShiftCombo.getValue();
        var deployment = refs.ctlDeploymentCombo.getValue();
        var purpose = refs.ctlPurposeCombo.getValue();
        var megaStatus = refs.ctlMegaStatusCombo.getValue();
        var commodity = refs.ctlCommodity.getValue();
        var opeCompCd = refs.refCboContractorForklift.getValue();
        var sa = refs.ctlSa.getValue();
        var ptnrType = "";
        var userRole = null;
        var alertYn = "";
        var isMPTSBBBilling = MOST.config.Token.getIsMPTSBreakBulkBilling();
        if (me.alertYN == "N") {
            if (jpvcNo == "") {
                if (
                    refs.ctlFromDt.getValue() == null ||
                    refs.ctlFromDt.getValue() == "" ||
                    refs.ctlToDt.getValue() == null ||
                    refs.ctlToDt.getValue() == ""
                ) {
                    refs.ctlFromDt.reset();
                    // me.setDateInDays('ctlFromDt');
                }
                if (
                    (refs.ctlFromDt.getValue() == null ||
                        refs.ctlFromDt.getValue() == "") &&
                    (refs.ctlToDt.getValue() == null ||
                        refs.ctlToDt.getValue() == "") &&
                    serviceDate.dateString == "" &&
                    megaNo == ""
                ) {
                    MessageUtil.warning(
                        "Warning",
                        "megarequisition_jpvc_eta_mandatory_msg"
                    );
                    return null;
                }
            } else {
                refs.ctlFromDt.reset();
                refs.ctlToDt.reset();
            }
        } else {
            alertYn = "Y";
        }
        if (
            refs.ctlFromDt.getValue() != null &&
            refs.ctlToDt.getValue() != null
        ) {
            dateCondition = me.checkPeriodDate(
                "ctlFromDt",
                "ctlToDt",
                me.MAX_DATE_ALLOW,
                true
            );
            workStDt = dateCondition.fromDtString;
            workEndDt = dateCondition.toDtString;
        }

        if (serviceDate.dateString != "" && serviceDate.dateString != null) {
            dateCondition.fromDtString = "";
            dateCondition.toDtString = "";
        }

        // setUserAuthority
        if (MOST.config.Token.getUserType() === me.USER_TYPE_INTERNAL) {
            userRole = "BS";
        }

        if (MOST.config.Token.getUserType() == me.USER_TYPE_EXTERNAL) {
            opeCompCd = MOST.config.Token.getPtnrCode();
        }

        if (me.existsPatnerType(me.SHIPPING_AGENCY)) {
            ptnrType = me.SHIPPING_AGENCY;
        } else if (me.existsPatnerType(me.FORWARDER)) {
            ptnrType = me.FORWARDER;
        }

        var params = {
            ptnrType: ptnrType,
            searchType: "megalist",
            shftMethCd: "Standard",
            depyYn: "N",
            alertYn: "N",
            userRole: userRole,
            vslCallId: jpvcNo,
            purpTpCd: purpose,
            cmdt: commodity,
            etw: serviceDate.dateString,
            saId: sa,
            shftId: shift,
            depyYn: deployment,
            statCd: megaStatus,
            rptTp: "",
            exportTp: "",
            userId: MOST.config.Token.getUserId(),
            alertYn: alertYn,
            alertTp: me.alertTp,
            opeCompCd: opeCompCd,
            isMPTSBBBilling: isMPTSBBBilling,
        };

        if (dateCondition != null) {
            params["etaFrom"] = dateCondition.fromDtString;
            params["etaTo"] = dateCondition.toDtString;
        }

        return params;
    },

    onMegaPreviewPDF: function () {
        var me = this;
        var refs = me.getReferences();
        var selectedRecord = refs.refMegaContractorGrid
            .getSelectionModel()
            .getSelection();
        var firstVslCallId = "";
        var isDiffVslCallId = false;
        var megaNo = "";
        var seq = "";
        var eqDivCdStr = "";
        var cnt = 0;
        var megaList = [];

        var params;

        if (selectedRecord == null || selectedRecord.length == 0) {
            MessageUtil.warning("warning_msg", "megarequisition_select_export");
            return;
        }

        selectedRecord.forEach(function (record, index, array) {
            seq += (cnt == 0 ? "" : ",") + record.get("seq");

            if (record.get("eqDivCd") == "") {
                eqDivCdStr += (cnt == 0 ? "" : ",") + "stevedore";
            } else {
                eqDivCdStr += (cnt == 0 ? "" : ",") + record.get("eqDivCd");
            }

            cnt++;

            if (index == 0) {
                firstVslCallId = record.get("vslCallId");
                megaNo = record.get("megaNo");
            } else {
                megaNo += "," + record.get("megaNo");
                if (record.get("vslCallId") != firstVslCallId) {
                    isDiffVslCallId = true;
                }
            }
        });

        if (cnt < 1) {
            MessageUtil.warning("warning_msg", "megarequisition_select_export");
            return;
        }

        if (isDiffVslCallId) {
            MessageUtil.warning(
                "warning_msg",
                "megarequisition_diff_vsl_call_id"
            );
            return;
        }

        if (me.getView().getXType() == "app-megaforcontractor") {
            Ext.MessageBox.show({
                title: "MEGA For Contractor",
                msg: "Printing...",
                width: 320,
                height: 0,
                wait: true,
                waitConfig: { interval: 200, text: "" },
            });

            var generatePDF = me.getStore("generatePDF");
            params = me.getSearchCondition();

            params["vslCallId"] = firstVslCallId;
            params["eqDivCdStr"] = eqDivCdStr;
            params["seqStr"] = seq.toString();
            params["megaStr"] = megaNo;
            params["megaList2"] = megaList;
            params["isCTT"] = "Y";
            params["rptTp"] = "MEGAForContractor";

            generatePDF.load({
                params: params,
                callback: function (records, operation, success) {
                    if (success) {
                        Ext.MessageBox.hide();
                        me.openPDFPreview(records, operation, success);
                    }
                },
            });
        }
    },

    onExport: function () {
        var me = this;
        var refs = me.getReferences();
        me.rptTp = "MEGALIST";

        var params = {
            initSearch: true,
        };

        me.openCodePopup("popup-exporttypepopup", "refBtnDownload", params);
    },
    //
    //	checkIfDuplicateExists: function (arr) {
    //	    return new Set(arr).size !== arr.length;
    //	},

    onDownloadExport: function () {
        var me = this;
        var refs = me.getReferences();
        var selectedRecord = refs.refMegaContractorGrid
            .getSelectionModel()
            .getSelection();
        var firstVslCallId = "";
        var isDiffVslCallId = false;
        var megaNo = "";
        var seq = "";
        var eqDivCdStr = "";
        var cnt = 0;
        var megaList = [];

        var params;

        if (selectedRecord == null || selectedRecord.length == 0) {
            MessageUtil.warning("warning_msg", "megarequisition_select_export");
            return;
        }

        selectedRecord.forEach(function (record, index, array) {
            seq += (cnt == 0 ? "" : ",") + record.get("seq");

            if (record.get("eqDivCd") == "") {
                eqDivCdStr += (cnt == 0 ? "" : ",") + "stevedore";
            } else {
                eqDivCdStr += (cnt == 0 ? "" : ",") + record.get("eqDivCd");
            }

            cnt++;

            if (index == 0) {
                firstVslCallId = record.get("vslCallId");
                megaNo = record.get("megaNo");
            } else {
                megaNo += "," + record.get("megaNo");
                if (record.get("vslCallId") != firstVslCallId) {
                    isDiffVslCallId = true;
                }
            }
        });

        if (cnt < 1) {
            MessageUtil.warning("warning_msg", "megarequisition_select_export");
            return;
        }

        if (isDiffVslCallId) {
            MessageUtil.warning(
                "warning_msg",
                "megarequisition_diff_vsl_call_id"
            );
            return;
        }

        if (me.getView().getXType() == "app-megaforcontractor") {
            Ext.MessageBox.show({
                title: "MEGA For Contractor",
                msg: "Printing...",
                width: 320,
                height: 0,
                wait: true,
                waitConfig: { interval: 200, text: "" },
            });

            var generatePDF = me.getStore("generatePDF");
            params = me.getSearchCondition();

            params["exportTp"] = refs.refRadioReportType.getValue().rb;
            params["vslCallId"] = firstVslCallId;
            params["eqDivCdStr"] = eqDivCdStr;
            params["seqStr"] = seq.toString();
            params["megaStr"] = megaNo;
            params["megaList2"] = megaList;
            params["isCTT"] = "Y";
            params["rptTp"] = "MEGAForContractor";

            generatePDF.load({
                params: params,
                callback: function (records, operation, success) {
                    if (success) {
                        Ext.MessageBox.hide();
                        var content = records[0].data.content
                            .replace(/&lt;/gi, "<")
                            .replace(/&gt;/gi, ">");
                        Ext.exporter.File.saveBinaryAs(
                            content,
                            records[0].data.fileName
                        );
                    }
                },
            });
        }
    },

    onDownloadCancel: function (ownWin) {
        var me = this;
        var winAlias = "popupAliaspopup-exporttypepopup";
        var win = me.lookupReference(winAlias);

        win.close();
    },

    onDblClick: function () {
        var me = this;
        var grid = me.lookupReference('refMegaContractorGrid');
        var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

        if (selection == null || selection.get('opeCompNm') == 'Stevedore' || selection.get('opeCompNm') == 'Trimming') {
            return;
        }

        selection.set('viewType', me.VIEW_TYPE_UPDATE);
        me.openDetailPopup(selection);
    },

    onDetailLoad: function () {
        var me = this;
        var refs = me.getReferences();
        var recvData = me.getDetailBizView().items.get(0).recvData;
        var fileUploadStore = me.getStore(me.FILE_UPLOAD_STORE_NAME);


        me.getViewModel().setData({ theDetail: recvData });

        var fileCatgCd = recvData.get('megaNo') + "_" + recvData.get('megaIdx') + "_" + recvData.get('seq');

        fileUploadStore.load({
            params: {
                pgmId: FileConstant.MEGAFORCONTRACTOR_SCREEN_PGM_ID,
                catgCd: fileCatgCd
            },
            callback: function (records, operation, success) {
                if (success) {

                }
            }
        });
    },

    onFileGridAdd: function (btn, fileField) {
        var me = this;
        var detailItem = me.getViewModel().get('theDetail');
        var store = me.getStore(me.FILE_UPLOAD_STORE_NAME);
        var input = document.querySelector("input[id='megaForContractorFileUpload-button-fileInputEl']");
        var keyId = detailItem.get('megaNo') + "_" + detailItem.get('megaIdx') + "_" + detailItem.get('seq');

        for (var i = 0; i < input.files.length; i++) {
            var record = Ext.create('MOST.model.common.FileUpload');
            file = input.files[i];

            record.set('pgmId', FileConstant.MEGAFORCONTRACTOR_SCREEN_PGM_ID);
            record.set('catgCd', keyId);
            record.set('fileStream', file);
            record.set('fileName', file.name);
            record.set('fileSize', file.size);
            record.set('workingStatus', WorkingStatus.INSERT);
            store.insert(0, record);
        }
    },

    onRemoveForFileUpload: function () {
        var me = this;
        var grid = me.lookupReference(me.FILE_GRID_REF_NAME);
        var store = me.getStore(me.FILE_UPLOAD_STORE_NAME);
        var selection = grid.getSelection() == null ? null : grid.getSelection();

        if (selection == null) return;

        Ext.each(selection, function (record) {
            record.set('workingStatus', WorkingStatus.DELETE);
            store.remove(record);
        });
    },

    onContractorDeny: function () {
        var me = this;
        var refs = me.getReferences();
        var detailView = me.getDetailBizView();
        var detailItem = me.getViewModel().get('theDetail');
        var store = me.getStore('denyMegaOperItem');

        var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
        var megaNo = detailItem.get('megaNo');
        var denyRmk = detailItem.get('denyRmk');

        if (StringUtil.isNullorEmpty(megaNo)) {
            return;
        }

        if (StringUtil.isNullorEmpty(denyRmk)) {
            MessageUtil.warning('warning_msg', 'missing_deny_remark_message');
            return;
        }

        detailItem.set('userId', MOST.config.Token.getUserId());

        updateParm.getProxy().url = store.proxy.url;
        updateParm.phantom = false;
        updateParm.set('workingStatus', WorkingStatus.UPDATE);
        updateParm.set('items', new Array());
        updateParm.get('items').push(detailItem.data);

        updateParm.save({
            success: function (records, operation) {
                detailItem.commit();
                detailView.close();
            }
        });
    },

    onContractorSupply: function () {
        var me = this;
        var fileUploadStore = me.getStore(me.FILE_UPLOAD_STORE_NAME);
        var isFileUploadChanged = (fileUploadStore.getModifiedRecords().length + fileUploadStore.getRemovedRecords().length) > 0;
        var isValidSupply = me.validateSupply();

        if (!isValidSupply) {
            return;
        }

        if (isFileUploadChanged) {
            me.uploadFile();
        } else {
            me.saveProcess();
        }
    },

    validateSupply: function () {
        var me = this;
        var refs = me.getReferences();
        var isValidQuantitySupply = refs.refNoOfOper.getValue() == refs.refSupplyQty.getValue();
        var isValid = true;

        if (!isValidQuantitySupply) {
            MessageUtil.warning('warning_msg', 'supply_qty_not_equal_oper_qty_message');
            isValid = false;
        };

        return isValid;
    },

    saveProcess: function () {
        var me = this;
        var refs = me.getReferences();
        var uploadItems = new Array();
        var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
        var detailItem = me.getViewModel().get('theDetail');
        var detailView = me.getDetailBizView();

        var store = me.getStore('megaContractor');
        var fileUploadStore = me.getStore(me.FILE_UPLOAD_STORE_NAME);

        fileUploadStore.getModifiedRecords().forEach((record, index, array) => {
            record.set('fileStream', null);
            record.set('userId', MOST.config.Token.getUserId());
            record.set('workingStatus', WorkingStatus.INSERT);
            uploadItems.push(record.data);
        });

        fileUploadStore.getRemovedRecords().forEach((record, index, array) => {
            record.set('workingStatus', WorkingStatus.DELETE);
            uploadItems.push(record.data);
        });

        var isHasUploadFile = fileUploadStore.data.items.length > 0 ? 'Y' : 'N';

        detailItem.set('uploadItems', uploadItems);
        detailItem.set('userId', MOST.config.Token.getUserId());
        detailItem.set('workingStatus', WorkingStatus.UPDATE);
        detailItem.set('fileYn', isHasUploadFile);
        detailItem.set('denyRmk', null);

        updateParm.getProxy().url = store.proxy.url;
        updateParm.phantom = false;
        updateParm.set('workingStatus', WorkingStatus.UPDATE);
        updateParm.set('items', new Array());
        updateParm.get('items').push(detailItem.data);

        updateParm.save({
            success: function (records, operation) {
                detailItem.commit();
                fileUploadStore.commitChanges();
                detailView.close();
            }
        });
    },

    uploadFile: function () {
        var me = this;
        var store = me.getStore(me.FILE_UPLOAD_STORE_NAME);
        var formData = new FormData();
        var xhr = new XMLHttpRequest();

        store.getModifiedRecords().forEach((record, index, array) => {
            formData.append(record.get('fileName'), record.get('fileStream'));
        });

        xhr.addEventListener("loadend", function () {
            if (xhr.status === 200) {
                var rtnData = JSON.parse(xhr.responseText);

                store.getModifiedRecords().forEach((record, index, array) => {
                    record.set('ufileName', rtnData[record.get('fileName')]);
                });

                me.saveProcess();
            } else {
                MessageUtil.warning('warning_msg', 'fail_msg');
            }
        });

        xhr.open('POST', MOST.config.Locale.getRestApiDestUrl() + '/file/manage/fileupload');
        xhr.setRequestHeader('Authorization', MOST.config.Token.getTokenType() + ' ' + MOST.config.Token.getAccessToken());
        xhr.send(formData);
    },

    afterSetCodePopupData: function (xtype, targetControl, returnValue) {
        var me = this;
        var refs = me.getReferences();

        if (targetControl === 'ctlDetailJpvc') { 
            var detailItem = me.getViewModel().get('theMain');
            detailItem.set('shipgNoteNo', null);
            detailItem.set('dono', null);

            if (returnValue) {
                detailItem.set('vslCallId', returnValue.code);
                me.getViewModel().setData({ theVsl: returnValue.item });
                me.setDetailInitializePopupData();
            } else {
                me.getViewModel().setData({ theVsl: null });
                me.searchWarehouse(true);
            }
        }
        if (targetControl === 'ctlJpvc' && refs.ctlJpvc.getValue() != "") {
            refs.ctlFromDt.setValue('');
            refs.ctlToDt.setValue('');
        }

        if (targetControl === 'ctlScn' || targetControl === 'ctlScnDetail') {
            if (returnValue) {
                if (targetControl === 'ctlScn') {
                    refs.ctlScn.setValue(returnValue.code);

                    if (!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))) {
                        refs.ctlJpvc.setValue(returnValue.item.get('vslCallId'));
                    } else {
                        refs.ctlJpvc.setValue('');
                    }
                } else {
                    refs.ctlScnDetail.setValue(returnValue.code);

                    if (!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))) {
                        refs.ctlJpvc.setValue(returnValue.item.get('vslCallId'));
                        refs.ctlVesselName.setValue(returnValue.item.get('vslNm'));
                    } else {
                        refs.ctlJpvc.setValue('');
                    }
                }
            }
        }
    },

    onFileDownloadDblClick: function () {
        var me = this;
        var detailView = me.getDetailBizView();
        var detailItem = me.getViewModel().get('theDetail');
        var grid = me.lookupReference(me.FILE_GRID_REF_NAME);
        var store = me.getStore(me.FILE_DOWNLOAD_STORE_NAME);
        var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

        if (selection == null) {
            return;
        }; 

        var keyId = detailItem.get('megaNo') + "_" + detailItem.get('megaIdx') + "_" + detailItem.get('seq');

        store.load({
            params: {
                'pgmId': FileConstant.MEGAFORCONTRACTOR_SCREEN_PGM_ID,
                'catgCd': keyId,
                'ufileNm': selection.get('ufileName')
            },
            callback: function (records, operation, success) {
                if (success) {
                    var content = records[0].data.content.replace(/&lt;/gi, '<').replace(/&gt;/gi, '>');
                    Ext.exporter.File.saveBinaryAs(content, records[0].data.fileName);
                }
            }
        })
    },
});
