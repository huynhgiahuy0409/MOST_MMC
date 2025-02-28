Ext.define('MOST.view.document.BondedWarehouseShippingNoteController', {
    extend: 'MOST.view.foundation.BaseViewController',
	
	requires: [

	],

    alias: 'controller.bondedwarehouseshippingnote',

    /**
     * =========================================================================================================================
     * CONSTANT START
     */

    DETAIL_VIEW: 'app-bondedwarehousedetail',

    MAIN_GRID_REF_NAME: 'refBondedWarehouseListGrid', // Main Grid Name 
    MAIN_STORE_NAME: 'bondedWarehouseList', // Main Store Name

    MAX_DATE_PERIOD: 90,
    MAX_DATE_ALLOW: 90,

    STAT_APPROVED: 'AP',
    cargoType: Ext.create('MOST.model.foundation.dataitem.DataItem'),
    SCREEN_MODE: '',

    /**
     * CONSTANT END
     * =========================================================================================================================
     */

    onLoad: function () {
        var me = this,
            refs = me.getReferences(),
            searchParm = Ext.create('MOST.model.document.SearchBondedWarehouseShippingNoteParm'),
            shippingNoteItem = new Ext.create('MOST.model.document.ShippingNote');

        me.getView().setShipNoteInitData(shippingNoteItem);
        me.setDateInDays("refDocDateFrom", -me.MAX_DATE_PERIOD);
        me.setDateInDays("refDocDateTo");

        me.setSearchParm(searchParm);
        me.getViewModel().setData({ theSearch: searchParm });
        me.updateViewStyle(me.getView());
        searchParm.set('progress', 'N');

        var theSearch = me.getViewModel().get('theSearch');

        theSearch.set('docDateFrom', me.lookupReference('refDocDateFrom').getValue());
        theSearch.set('docDateTo', me.lookupReference('refDocDateTo').getValue());
        theSearch.set('vslCallId', 'BDWH');
    },

    onSearch: function () {
        var me = this,
            refs = me.getReferences(),
            store = me.getStore(me.MAIN_STORE_NAME),
            params = me.getSearchCondition(),
            searchParm = me.getViewModel().get('theSearch'),
            shipgNoteNo = searchParm.data.shipgNoteNo,
            docDateFrom = searchParm.data.docDateFrom,
            docDateTo = searchParm.data.docDateTo;

        if (!docDateFrom && !docDateTo && !shipgNoteNo) {
            MessageUtil.warning('warning_msg', 'missingSearchCondition');
            return;
        }

        store.load({
            params: params,
            callback: function (records, operation, success) {
                if (success) {
                    if (records.length > 0) {
                        me.calcTotal();
                    }
                    else {
                        MessageUtil.noMatchData();
                    }
                }
            }
        });
    },

    calcTotal: function () {
        var me = this,
            refs = me.getReferences(),
            store = me.getStore(me.MAIN_STORE_NAME),
            calcItem = Ext.create('MOST.model.document.BondedWarehouseShippingNote'),
            docMtTotal = docM3Total = docQtyTotal = 0;

        store.each(function (record) {
            docMtTotal += Number(Number(record.get('cgWgt')).toFixed(3));
            docM3Total += Number(Number(record.get('cgMsrmt')).toFixed(3));
            docQtyTotal += Number(record.get('pkgQty'));
        });

        calcItem.set('docMtTotal', docMtTotal.toFixed(3));
        calcItem.set('docM3Total', docM3Total.toFixed(3));
        calcItem.set('docQtyTotal', docQtyTotal);

        me.getViewModel().setData({ theCalc: calcItem });
    },

    onAdd: function () {
        var me = this;
        var refs = me.getReferences();
        var theModel = Ext.create('MOST.model.document.BondedWarehouseShippingNote');
        var title = 'K8 Declaration';
        var initData = me.getView().shipNoteInitData;

        initData.set("searchType", CONSTANTS.SCREEN_MODE_CREATE);
        me.getView().detailViewAlias = me.DETAIL_VIEW;

        theModel.data.scn = 'BDWH';
        theModel.data.vslcd = 'BDWH';
        theModel.data.vslNm = 'Bonded Warehouse';
        me.openDetailPopup(theModel, title, false);
    },

    onDetailLoad: function () {
        var me = this;
        var refs = me.getReferences();
        var detailView = me.getDetailBizView();
        var recvData = detailView.items.get(0).recvData;
        var initData = me.getView().shipNoteInitData;
        var searchType = initData.get("searchType");

        // me.setDetailComboBox();

        me.getViewModel().setData({ bondedWarehouse: recvData });

        me.getViewModel().get("bondedWarehouse").set('cgTpCd', 'BBK');

        if (recvData.data.cgTpCd == 'DBN') {
            refs.refGrossWgt.setReadOnly(false);
            refs.refMeasurement.setReadOnly(true);
            refs.refQuantity.setReadOnly(true);
        }

        // if (searchType === "create") {
        //     refs.refMeasurement.setValue("0.000");
        //     refs.refQuantity.setValue("0");
        //     refs.refGrossWgt.setValue("0.000");
        // }

        me.setDetailInitialize();
        // me.setDetailSettingControl(searchType);
    },

    // setDetailComboBox: function () {
    //     var me = this,
    //         refs = me.getReferences(),
    //         deliveryModeCombo = me.getViewModel().getStore('deliveryModeCombo'),
    //         operationTypeCombo = me.getViewModel().getStore('operationTypeCombo'),
    //         typeCargoCombo = me.getViewModel().getStore('typeCargoCombo');

    //     deliveryModeCombo.load({
    //         params: {
    //             lcd: 'MT',
    //             mcd: 'DELVTP',
    //             col1: 'SN'
    //         }
    //     });
    //     operationTypeCombo.load({
    //         params: {
    //             lcd: 'MT',
    //             mcd: 'CATGTP',
    //             col1: 'SN'
    //         },
    //     });
    //     typeCargoCombo.load({
    //         params: {
    //             lcd: 'MT',
    //             mcd: 'CGTPNLQ'
    //         },
    //     });
    // },

    setDetailInitialize: function () {
        var me = this;
        var refs = me.getReferences();
        var detailView = me.getDetailBizView();
        var recvData = detailView.items.get(0).recvData;
        var bondedWarehouse = me.getViewModel().get('bondedWarehouse');
        var initData = me.getView().shipNoteInitData;

        if (initData != null) {
            me.SCREEN_MODE = initData.get("searchType");
        } else {
            return null;
        }

        bondedWarehouse.set('tsptTpCd', 'LR');
        bondedWarehouse.set("catgCd", 'S');
        bondedWarehouse.set("catgNm", 'Storage');
        bondedWarehouse.set("delvTpCd", 'I');
        bondedWarehouse.set("statCdNm", 'Approved');
        bondedWarehouse.set("domesticChk", 'Y');


    },

    afterSetCodePopupData: function (xtype, targetControl, returnValue) {
        
    },

    onCheckBox: function(ctl, obj){
		let me = this;
		let factoryChk = me.lookupReference('refFactoryChk');
        let importChk = me.lookupReference('refImportChk');
        let handlingChk = me.lookupReference('refHandlingChk');
        let containerNo = me.lookupReference('refContainerNo');
    
		// ctl.reference -> To check what box was selected by User, compare with reference value in UI - by LamLong
        // Sau khi check ctl dùng if(factoryChk) factoryChk.setAllowBlank(false);
        if(ctl.getValue()) {
            if(ctl.reference == 'refFactoryChk' && ctl.checked == true) {
                containerNo.setAllowBlank(false);
                importChk.setDisabled(true);
                handlingChk.setDisabled(true);
            }else if(ctl.reference == 'refImportChk' && ctl.checked == true) {
                factoryChk.setDisabled(true);
                handlingChk.setDisabled(true);
                return;
            }
        } else {
            containerNo.setAllowBlank(true);
            importChk.setDisabled(false);
            handlingChk.setDisabled(false);
            factoryChk.setDisabled(false);
        }
	},
    
    openBLDOPopup:function(field, button, e){
		var me = this;
		me.openCodePopup('popup-bldolistpopup',  'ctlBlDoNoField');
	},
    
    onComboBoxChange:function(field, newValue, oldValue, eOpts ) {
		var me = this,
            refs = me.getReferences(),
            displayFieldName = 'scdNm',
		    codeFieldName = 'scd',
		    detailItem = me.getViewModel().get('bondedWarehouse'),
		    detailView = me.getDetailBizView(),
		    recvData = null,
		    searchType = null,
		    comboStore = null;

		if (detailItem && detailItem.get('cgTpCd') == '') {
			me.resetCmdtByCargoType();
		}
		
		if (detailItem) {
			var cgTpCd = detailItem.get('cgTpCd');
			
			if(cgTpCd == 'BBK'){
				refs.refQuantity.setAllowBlank(false);
				refs.refMeasurement.setAllowBlank(true);
				refs.refGrossWgt.setAllowBlank(false);
				
				refs.refGrossWgt.setReadOnly(false);
				refs.refMeasurement.setReadOnly(false);
				refs.refQuantity.setReadOnly(false);
			} else if (cgTpCd == 'DBN'){
				refs.refQuantity.setAllowBlank(true);
				refs.refMeasurement.setAllowBlank(true);
				refs.refGrossWgt.setAllowBlank(false);
				
				refs.refGrossWgt.setReadOnly(false);
				refs.refMeasurement.setReadOnly(true);
				refs.refQuantity.setReadOnly(true);
				refs.refMeasurement.setValue('0');
				refs.refQuantity.setValue('0');
			} 
		}
		
		if(detailView !=null) {
			recvData = detailView.items.get(0).recvData;
			searchType = recvData.get("searchType");
			
		}else if(detailItem !=null){
			searchType = detailItem.get("searchType");
			
		}
		if(refs.refTypeofCargo === field){
			refs.refCommodityGroupCode.params.searchCol1 = refs.refTypeofCargo.getValue();
			refs.refCommodityGroupCode.params.searchDivCd = '';
			refs.refTypeofPackage.params.pkgTypeCd =  '';
			refs.refCommodityCode.params.pkgTypeCd =  '';
			
			comboStore = me.getViewModel().getStore('typeCargoCombo');

			me.checkCargoType();
			
		}else{
			comboStore = null;
		}

		if(detailItem != null && comboStore != null){
			var indx = -1;
			indx = comboStore.find(codeFieldName, newValue);

			if (indx != -1){
				detailItem.set("cgTpCdNm",comboStore.getAt(indx).get(displayFieldName));
			}
		}
		
	},

    checkCargoType:function(){
		var me = this,
		    refs = me.getReferences(),
		    cargoType = me.getViewModel().get("cargoType");
		
		if(cargoType && cargoType.get('cgTpCd') != '' && refs.refTypeofCargo.getValue() != '' && refs.refCommodityGroupCode.getValue() != '') {
			if (refs.refTypeofCargo.getValue() != cargoType.get('cgTpCd')) {
				MessageUtil.warning('warning_msg','differenceCargoType');
				refs.refTypeofCargo.setValue(cargoType.get('cgTpCd'));
                var params = {
                        searchType: 'CMDT_GRP',
                        searchCol1: cargoType.get('cgTpCd')
                    }
                    refs.refCommodityGroupCode.setParams(params);
				return;
			}
		}
	},

    resetCmdtByCargoType: function(){//Reset CMDT, CMDT GRP, PKGTP when change CargoType
		var me = this,
		    shipNote = me.getViewModel().get("bondedWarehouse");
		
		shipNote.set("cmdtGroupCd", "");
		shipNote.set("cmdtGroupCdNm", "");
		
		//Reset CMDT:
		shipNote.set("cmdtCd", "");
		shipNote.set("cmdtCdNm", "");
		
		shipNote.set("pkgTpCd", "");
		shipNote.set("pkgTpCdNm", "");
	},

    onDetailSave: function () {
        var me = this;

        if (!me.validationForm()) {
            return;
        }

        me.onCheckSNNo();
    },

    validationForm: function () {
        var me = this;
        var refs = me.getReferences();
        var detailView = me.getDetailBizView();
        var detailItem = me.getViewModel().get('bondedWarehouse');
        var infoForm = detailView.down('form').getForm();

        if (!detailView) {
            return false;
        }

        if (!infoForm.isValid()) {
            MessageUtil.mandatoryFieldInValid();
            return false;
        }

        return true;
    },

    onCheckSNNo: function () {
        var me = this,
            validationStore = me.getStore('validationStore'),
            theSN = me.getViewModel().get('bondedWarehouse'),
            snNo = Ext.String.format("'{0}'", theSN.get('shipgNoteNo')),
            vslCallId = theSN.get('vslCallId'),
            params = {
                col2: theSN.get('newShipgNoteNo'),
                col1: theSN.get('vslCallId'),
                tyCd: 'validationSN'
            };

        validationStore.load({
            params: params,
            callback: function (records, operation, success) {
                if (success) {
                    if (records != null && records.length > 0 && records[0].get('isValidated') === 'Y') {
                        if(me.SCREEN_MODE === CONSTANTS.SCREEN_MODE_CREATE
                            ||
                        (me.SCREEN_MODE === CONSTANTS.SCREEN_MODE_UPDATE
                                && theSN.get('shipgNoteNo') !== theSN.get('newShipgNoteNo'))){
                        
                        //Block insert/update duplicated SN
                        MessageUtil.info('info_msg','shippingNote_duplicatedSNNo',theSN.get('newShipgNoteNo'));
                        return ;
                    }
                    }
                    theSN.set('staffCd', MOST.config.Token.getStaffCd(MOST.config.Token.getPgmId()));
                    //If create mode => set sameSN MfDocId:
                    if (me.SCREEN_MODE === CONSTANTS.SCREEN_MODE_CREATE) {
                        theSN.set('shipgNoteNo', theSN.get('newShipgNoteNo'));
                        theSN.set('mfDocId', theSN.get('newMfDocId'));
                        me.validationSubmit();
                    } else {
                        if (theSN.get('shipgNoteNo') === theSN.get('newShipgNoteNo')) {
                            me.validateSNHasOperation(snNo, vslCallId);
                        } else {
                            //Check for Changing SNNo:
                            me.validateChangeSNNo(vslCallId, snNo,
                                function () {
                                    me.validationSubmit();
                                }, function () {
                                    MessageUtil.info('info_msg', 'shippingNote_cannotChangeSNNo', theSN.get('shipgNoteNo'));
                                    theSN.set('newShipgNoteNo', theSN.get('shipgNoteNo'));
                                }
                            );
                        }
                    }
                }
            }
        });
    },

    //ADP: Check SN has Operation or Not.
    validateSNHasOperation: function (snNo, vslCallId) {
        var me = this;
        var validationStore = me.getStore('validationStore');

        var params = {
            col1: vslCallId,
            col2: snNo,
            tyCd: 'checkOperationSN'
        }
        validationStore.load({
            params: params,
            callback: function (records, operation, success) {
                if (success) {
                    if (records != null && records.length > 0 && records[0].get('isValidated') === 'N') {
                        MessageUtil.info('info_msg', 'shippingNote_cannotChangeAmtSN', snNo);
                        return;
                    } else {
                        me.validationSubmit();
                    }
                }
            }
        });
    },

    //ADP: Check SN has GR or Not.
    validateChangeSNNo: function (vslCallId, sNNo, successFunc, failFunc) {
        var me = this;
        //Checking:
        var theSN = me.getViewModel().get('bondedWarehouse');
        var validationStore = me.getStore('validationStore');

        var params = {
            col1: sNNo,
            col2: vslCallId,
            tyCd: 'checkSNEmptyGR'
        }
        validationStore.load({
            params: params,
            callback: function (records, operation, success) {
                if (success) {
                    if (records != null && records.length > 0 && records[0].get('isValidated') === 'N') {
                        failFunc();
                    } else {
                        me.checkSNTruckAssign(vslCallId, sNNo, successFunc, failFunc);
                        //successFunc();	
                    }

                }
            }
        });
    },

    //ADP: Check SN has been AssignTruck or not.
    checkSNTruckAssign: function (vslCallId, sNNo, func1, func2) {
        var me = this;
        var theSN = me.getViewModel().get('bondedWarehouse');
        var validationStore = me.getStore('validationStore');

        var params = {
            col1: sNNo,
            col2: vslCallId,
            tyCd: 'checkSNTruckAssign'
        }
        validationStore.load({
            params: params,
            callback: function (records, operation, success) {
                if (success) {
                    if (records != null && records.length > 0 && records[0].get('isValidated') === 'N') {
                        func2();
                    } else {
                        func1();
                    }
                }
            }
        });
    },

    validationSubmit: function () {
        var me = this;
        var refs = me.getReferences();
        me.submitDocument();
    },

    submitDocument: function () {
        var me = this;
        var refs = me.getReferences();
        var detailView = me.getDetailBizView();
        var detailItem = me.getViewModel().get('bondedWarehouse');
        var recvData = detailView.items.get(0).recvData; //

        if (detailItem.get('authority') === "")
            detailItem.set("authority", recvData.get("authority"));

        if (detailItem.get('searchType') === "")
            detailItem.set("searchType", recvData.get("searchType"));

        //check Gross Weight:

        if ((detailItem.get("cgWgt") == "" || detailItem.get("cgWgt") == "0" || detailItem.get("cgWgt") == "0.0")) {
            MessageUtil.info('info_msg', 'shippingNoteInquiry_DM10101701');
            return;
        }
        var cgTp = refs.refTypeofCargo.getValue();
        if (cgTp === 'BBK') {
            if ((detailItem.get("pkgQty") == "" || detailItem.get("pkgQty") == "0" || detailItem.get("pkgQty") == "0.0")) {
                MessageUtil.info('info_msg', 'shippingNoteInquiry_DM10101702');
                return;
            }
        }

        me.saveProcess();
    },

    saveProcess: function () {
        var me = this,
            refs = me.getReferences(),
            store = me.getStore('shippingNoteDetail'),
            grid = me.lookupReference(me.MAIN_GRID_REF_NAME),
            inquiryGridstore = me.getStore('coldStorageList'),
            sendArray = new Array(),
            detailItem = me.getViewModel().get('bondedWarehouse'),
            detailView = me.getDetailBizView(),
            shipgNoteNo = null,
            isCreated = detailItem.phantom,
            shipgNoteDtlItem = Ext.create('MOST.model.document.ShippingNote');
        
        detailItem.set("userId", MOST.config.Token.getUserId());
        detailItem.set("statCd", me.STAT_APPROVED);
        detailItem.set('staffCd',MOST.config.Token.getStaffCd(MOST.config.Token.getPgmId()));

        detailItem.set('estArrvDt1', Ext.Date.format(detailItem.data.estArrvDt, MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));

        //SN Lorry MT and Second MT:
        shipgNoteDtlItem.set("userId", MOST.config.Token.getUserId());
        shipgNoteDtlItem.set('divCd', 'W');
        shipgNoteDtlItem.set('vslCallId', detailItem.get('vslCallId'));
        shipgNoteDtlItem.set('shipgNoteNo', detailItem.get('shipgNoteNo'));
        shipgNoteDtlItem.set('cmdtCdDtl', detailItem.get('cmdtCd'));
        shipgNoteDtlItem.set('pkgTpCdDtl', detailItem.get('pkgTpCd'));
        shipgNoteDtlItem.set('staffCd',MOST.config.Token.getStaffCd(MOST.config.Token.getPgmId()));

        shipgNoteDtlItem.set("vslCd", detailItem.get('vslCd'));
        shipgNoteDtlItem.set("callYear", detailItem.get('callYear'));
        shipgNoteDtlItem.set("callSeq", detailItem.get('callSeq'));

        shipgNoteNo = refs.refNewShipNoteNo.getValue();

        // To perform the save logic only when modified.
        if (detailItem.dirty || sendArray.length > 0) {
            var proxy = detailItem.getProxy();
            proxy.url = store.getProxy().url;

            detailItem.set('newVersion', me.generateUuid());

            var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
            var isCreated = detailItem.phantom;

            updateParm.getProxy().url = store.getProxy().url;
            updateParm.phantom = isCreated;
            updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
            updateParm.set('userId', MOST.config.Token.getUserId());
            updateParm.set('staffCd', MOST.config.Token.getStaffCd(MOST.config.Token.getPgmId()));
            updateParm.set('item', detailItem.data);

            updateParm.save({
                success: function (record) {
                    detailItem.set("version", detailItem.get('newVersion'));
                    detailItem.set("vslCallId", record.get('vslCallId'));
                    detailItem.set("shipgNoteNo", record.get('shipgNoteNo'));
                    detailItem.commit();

                    if (isCreated) {
                        inquiryGridstore.insert(0, detailItem);
                        grid.getSelectionModel().select(detailItem);
                    } else {
                        me.updateRecord(recvData, detailItem);
                    }

                    var recvData = me.lookupReference(me.getView().detailViewAlias).items.get(0).recvData

                    recvData.dirty = false;

                    detailItem.set('version', record.get('newVersion'));
                    detailItem.commit();

                    //MessageUtil.saveSuccess(); // Success Message
                    MessageUtil.confirmation('success_msg', 'savesuccess_msg', null,
                        function (button) {
                            if (button === 'ok') {
                                //MessageUtil.saveSuccess(); // Success Mesage
                                me.onSearch();
                                detailView.close();
                            }
                        }
                    );
                }
            });
        }
    },

    onDelete: function () {
        var me = this,
            grid = me.lookupReference(me.MAIN_GRID_REF_NAME),
            store = me.getStore('coldStorageList'),
            selections = grid.getSelection() === null ? null : grid.getSelection(),
            snNo = new Array(),
		    vslCallId = '';

        selections.forEach(selection => {
            vslCallId = selection.get('vslCallId');
			snNo.push(Ext.String.format("'{0}'", selection.get('shipgNoteNo')));
        });

        me.validateChangeSNNo(vslCallId, snNo,
            function () {
                MessageUtil.question('confirm', 'shippingNoteInquiry_delete_message', null,
                    function (button) {
                        if (button === 'ok') {
                            store.remove(selections);
                            store.sync({
                                success: function () {
                                    MessageUtil.saveSuccess(); // Success Message
                                }
                            });
                        }
                    }
                );
            },
            function () {
                MessageUtil.info('info_msg', 'shippingNote_cannotDelSN');
                return;
            }
        );
    },

    onDblClick: function () {
        var me = this;
        var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
        var initData = me.getView().shipNoteInitData;

        var selection = grid.getSelection() === null ? null : grid.getSelection()[0];

        if (selection === null) return;

        initData.set("searchType", CONSTANTS.SCREEN_MODE_UPDATE);

        me.getView().detailViewAlias = me.DETAIL_VIEW;

        selection.data.vslNm = 'Cold Store';

        me.openDetailPopup(selection);
    },

    openTransporterCdTypePopup: function () {
        var me = this,
            refs = me.getReferences(),
            grid = refs.refColdStorageListGrid,
            selectedItems = grid.getSelectionModel().getSelection();

        if (selectedItems.length === 0) {
            MessageUtil.info('Information', 'Please select the data first to assign the transport company.');
            return;
        }
        var params = {
            searchPtyDivCd: 'TRK',  // CNS, FWD, TRK
            initSearch: true		// true, false
        };
        me.openCodePopup('popup-partnercdformultipopup', 'truckAssignPopup', params);
    },

    onAssignTransporter: function () {
        var me = this;
        var refs = me.getReferences();
        var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
        var store = me.getStore("shippingNoteAck");
        var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');

        var arrData = new Array();
        var arrItems = grid.getSelection() === null ? null : grid.getSelection();

        arrItems.forEach(function (record, index) {
            record.set('userId', MOST.config.Token.getUserId());
            arrData.push(record.data);
        });

        var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
        updateParm.getProxy().url = store.getProxy().url;
        updateParm.phantom = false;
        updateParm.set('workingStatus', WorkingStatus.UPDATE);
        updateParm.set('userId', MOST.config.Token.getUserId());
        updateParm.set('staffCd',MOST.config.Token.getStaffCd(MOST.config.Token.getPgmId()));
        updateParm.set('items', arrData);
        updateParm.save({
            success: function (record, operation) {
                MessageUtil.saveSuccess(); // Success Message
            }
        });
    },

    onChangeMtM3Qty: function (clt, newValue, oldValue, eOpts) {
        var me = this,
            refs = me.getReferences(),
            cgMsrmt = refs.refMeasurement.getValue(),
            eachWgt = 0,
            eachM3 = 0,
            qty = refs.refQuantity.getValue(),
            cgLen = cgWth = cgHgt = m3 = 0;

        cgLen = refs.refWidth.getValue();
        cgWth = refs.refLength.getValue();
        cgHgt = refs.refHeight.getValue();
        eachM3 = (cgLen * cgWth * cgHgt) / 1e6;
        if (eachM3 > 0) {
            m3 = eachM3 * qty;
        } else {
            m3 = cgMsrmt;
        }
        if ((clt == refs.refGrossWgt || clt == refs.refQuantity)) {
            if (qty > 0) {
                eachWgt = refs.refGrossWgt.getValue() / qty;
                refs.refWgtEach.setValue(eachWgt);
            } else {
                refs.refWgtEach.setValue(0);
            }

        }
        if (clt == refs.refQuantity && eachM3 > 0) {
            refs.refMeasurement.suspendEvents();
            refs.refMeasurement.setValue(m3);
            refs.refMeasurement.resumeEvents();
        } else {
            if (qty > 0) {
                eachM3 = refs.refMeasurement.getValue() / qty;
                refs.refMeasurementEach.setValue(eachM3);
            } else {
                refs.refMeasurementEach.setValue(0);
            }
        }

        if (clt == refs.refMeasurement && oldValue != null) {
            if (qty > 0) {
                eachM3 = refs.refMeasurement.getValue() / qty;
                refs.refMeasurementEach.setValue(eachM3);
            } else {
                refs.refMeasurementEach.setValue(0);
            }
            refs.refWidth.setValue(0);
            refs.refHeight.setValue(0);
            refs.refLength.setValue(0);
        }
        var bondedWarehouse = me.getViewModel().get('bondedWarehouse');
        if (bondedWarehouse) {
            bondedWarehouse.data.eachMsrmt = eachM3;
            bondedWarehouse.data.cgMsrmt = m3;
        }

        if (clt == refs.refGrossWgt || clt == refs.refMeasurement) {
            refs.refFreightTon.setValue(Math.max(refs.refGrossWgt.getValue(), refs.refMeasurement.getValue()));
        }
    },

    onChangeLWH: function (ref) {
        var me = this,
            refs = me.getReferences(),
            cgLen = cgWth = cgHgt = m3 = eachM3 = 0,
            qty = refs.refQuantity.getValue(),
            bondedWarehouse = me.getViewModel().get('bondedWarehouse');

        cgLen = refs.refWidth.getValue();
        cgWth = refs.refLength.getValue();
        cgHgt = refs.refHeight.getValue();

        eachM3 = Number(((cgLen * cgWth * cgHgt) / 1e6).toFixed(3));
        m3 = Number((eachM3 * qty).toFixed(3));

        refs.refMeasurementEach.suspendEvents();
        refs.refMeasurementEach.setValue(eachM3);
        refs.refMeasurementEach.resumeEvents();

        refs.refMeasurement.suspendEvents();
        refs.refMeasurement.setValue(m3);
        refs.refMeasurement.resumeEvents();
        if (bondedWarehouse) {
            bondedWarehouse.data.eachMsrmt = eachM3;
            bondedWarehouse.data.cgMsrmt = m3;
        }
        refs.refFreightTon.setValue(Math.max(refs.refGrossWgt.getValue(), refs.refMeasurement.getValue()));
    },

    onCargoUpload: function () {
        var me = this;
        var refs = me.getReferences();
        var title = { type: 'bundle', key: 'coldStorageRequestList' };
        var popupAlias = "app-coldstoragecargoupload";

        me.openViewAliasDetailPopup(null, title, popupAlias);

    },

    onOpenGoodsReceipt: function () {
        var me = this,
            grid = me.lookupReference(me.MAIN_GRID_REF_NAME),
            selection = grid.getSelection() === null ? null : grid.getSelection()[0];

        if (selection === null || selection === undefined) {
            MessageUtil.info('info_msg', 'select_list_msg');
            return;
        }

        var recvData = {
            vslCallId: selection.get("vslCallId"),
            shipgNoteNo: selection.get("shipgNoteNo")
        };

        me.loadMenuView('app-goodsreceiptforcoldstore', recvData);

    },

    getSearchCondition: function () {
        var me = this,
            refs = me.getReferences(),
            searchParm = me.getViewModel().get('theSearch'),
            shipgNoteNo = searchParm.data.shipgNoteNo,
            containerNo = searchParm.data.containerNo,
            dateCondition = me.checkPeriodDate("refDocDateFrom", "refDocDateTo", me.MAX_DATE_ALLOW, true);

        var params = {
            searchType: 'master',
            shipgNoteNo: shipgNoteNo,
            containerNo: containerNo,
        };
        if (dateCondition != null) {
            params['docDateFrom'] = dateCondition.fromDtString;
            params['docDateTo'] = dateCondition.toDtString;
        }
        return params;
    },

    onExportExcelPdfWithServer: function (gridNameString, isExcel) {
        var me = this,
            searchBizParm = me.getSearchCondition();

        searchBizParm.classID = 'com.tsb.most.biz.parm.document.SearchColdStorageListParm';
        searchBizParm.serviceID = 'MOST.coldStorageList.selectShippingNoteList';

        me.exportExcelPdfWithServer(gridNameString, searchBizParm, isExcel);
    },

    onDateChange: function (control, newValue, oldValue, eOpts) {
        var me = this;
		var refs = me.getReferences();

		if(control == refs.refDocDateFrom){
			me.setDateInDaysByDate("refDocDateTo", me.MAX_DATE_ALLOW, control.getValue());
		} else {
			me.setDateInDaysByDate("refDocDateFrom", -me.MAX_DATE_ALLOW, control.getValue());
		}
		var theSearch = me.getViewModel().get('theSearch');
		
		theSearch.set('docDateFrom', me.lookupReference('refDocDateFrom').getValue());
		theSearch.set('docDateTo', me.lookupReference('refDocDateTo').getValue());
    },

    onUpperCase: function (control) {
        control.setValue(control.getValue().toUpperCase());
    },

});