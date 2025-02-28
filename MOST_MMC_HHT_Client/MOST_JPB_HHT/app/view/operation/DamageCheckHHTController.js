Ext.define('MOST.view.controller.DamageCheckHHTController', {
    extend: 'MOST.view.foundation.BaseViewController',
	alias: 'controller.damagecheckhht',	

    requires: [
	],

    MAIN_GRID_REF_NAME: 'refGridDamageCheckHHT',				// Main Grid Name 
	MAIN_STORE_NAME: 'tblDamageCheckStore',
    DETAIL_GRID_REF_NAME: 'refTblGridDamageCheckDetail',
    DETAIL_POPUP_TITLE: 'The Detail of Damage Check',
    UNITNO_POPUP_TITLE: 'Find Unit No.',
    IMPORT_CD: 'I',
    EXPORT_CD: 'E',
    /**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */

    onTblLoad: function () {
        var  me = this
            ,refs = me.getReferences()
            ,searchParm = Ext.create('MOST.model.controller.SearchTheListOfDamageCheckOfGCParm')
            ,recvData = me.getView().recvData
        ;

        me.getViewModel().setData({ theSearch: searchParm });
        me.setTblComboStore();

        me.setTblRecvData(recvData, searchParm);

        me.onTblRetrieve();
    },

    setTblRecvData: function(recvData, searchParm) {
        var me = this;
        if(recvData) {
            if( recvData.get('catgCd') === me.IMPORT_CD ) {
                searchParm.set({
                     masterBlNo: recvData.get('mfDocId')
                    ,blNo: recvData.get('blNo')
                });
            } else if( recvData.get('catgCd') === me.EXPORT_CD ) {
                searchParm.set({
                     bookingNo: recvData.get('mfDocId')
                    ,snNo: recvData.get('shipgNoteNo')
                });
            }
        }
    },

    setTblComboStore: function () {
        var  me = this
            ,materBlCombo = me.getStore('tblMasterBlComboStore')
            ,bookingNoCombo = me.getStore('tblBookingNoComboStore')
        ;

        materBlCombo.load({
            params: {
                 vslCallId: me.getViewModel().get('globalVesselCallId')
                ,catgCd: me.IMPORT_CD
            }
        });

        bookingNoCombo.load({
            params: {
                 vslCallId: me.getViewModel().get('globalVesselCallId')
                ,catgCd: me.EXPORT_CD
           }
        });

        
    },

    onTblRetrieve: function() {
        var me = this
            gridStore = me.getStore(me.MAIN_STORE_NAME)
            params = me.getTblSearchCondition();
        ;

        gridStore.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					
				}
			}
		});
        gridStore.commitChanges();
    },
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */

    onTblAdd: function ( button, e, eOpts ) {
        var  me = this
            ,record = Ext.create('MOST.model.operation.DamageCheck')
            ,theVessel = me.getViewModel().get('theVessel')
            ,currentTimeFormatted = Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds())
        ;

        record.set({
             vslCallId: me.getViewModel().get('globalVesselCallId') 
            // ,vslCd: theVessel['vslCd']
            // ,callSeq: theVessel['callSeq']
            // ,callYear: theVessel['callYear']
            ,catgCd: me.IMPORT_CD
            ,checkedDt: currentTimeFormatted
            ,workingStatus: WorkingStatus.INSERT
        });
        me.openTblDetailPopup(button.reference, record);
    },

    onTblUpdate: function ( button, e, eOpts ) {
        var me = this,
            grid = me.lookupReference(me.MAIN_GRID_REF_NAME),
            selection = grid.getSelection()
        ;

        if(!selection) {
            MessageUtil.warning('warning_msg', 'container_updateRecordEmptyMsg');
            return;
        }
        selection.data.isOperationScreen = false;

        me.openTblDetailPopup(me.MAIN_GRID_REF_NAME, selection);
    },

    openTblDetailPopup: function(ref, record) {
        var  me = this
            ,detailData = me.getViewModel().get('tblDamageCheckDetail')
        ;

        Ext.Object.merge(detailData.data, record.data);
        detailData.phantom = record.phantom;
        record.title = me.DETAIL_POPUP_TITLE;
        ViewUtil.openHhtPopup(me, 'app-damagecheckhhtpopup', null, record);
    },

    onTblDelete: function ( button, e, eOpts ) {
        var me = this
            ,grid = me.lookupReference(me.MAIN_GRID_REF_NAME)
            ,gridStore = grid.getStore()
            ,selection = grid.getSelection()
        ;

        if(!selection) {
            MessageUtil.warning('warning_msg', 'whCheckerDeleteRecordEmptyMsg');
            return;
        }

        MessageUtil.questionModern('tbl_confrm_delete','infodelete_msg', null,function(button){
			if(button === 'ok'){
                // remove and save
                var copyRecord = selection.copy();
                var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
                updateParm.getProxy().url = gridStore.proxy.url;
                updateParm.phantom = selection.phantom;
                updateParm.set({
                    workingStatus: WorkingStatus.DELETE
                    ,items: [copyRecord.data]
                });

                updateParm.erase({
                    success : function(record, operation) {
                        MessageUtil.saveSuccess();
                        me.onTblRetrieve();
                    }
                });
			}
		});
    },

    onTblSelectMfDocIdCombo: function ( combo, newValue, eOpts )  {
        var  me = this
            ,searchParm = me.getViewModel().get('theSearch')
            ,refTargetCombo = combo['reference']
            ,refMasterBLCombo = 'refCboMasterBL'
            ,masterBLCombo = me.lookupReference(refMasterBLCombo)
            ,subBLCombo = me.lookupReference('refCboSubBL')
            ,subBlStore = subBLCombo.getStore()
            ,refBookingNoCombo = 'refCboBookingNo'
            ,bookingCombo = me.lookupReference(refBookingNoCombo)
            ,snCombo = me.lookupReference('refCboSN')
            ,snStore = snCombo.getStore()
        ;
        // check the combo refence ( is master BL or Book No)
        if(refTargetCombo == refMasterBLCombo) {
            bookingCombo.clearValue();
            snCombo.clearValue();
            snStore.removeAll();
            subBlStore.load({
                params: {
                     vslCallId: me.getViewModel().get('globalVesselCallId')
                    ,masterBlNo: searchParm.get('masterBlNo')
                }
            });
        } else if(refTargetCombo == refBookingNoCombo) {
            // Clear value in MasterBL value
            // Clear value in BL value
            // Clear BL Combo Store
            masterBLCombo.clearValue();
            subBLCombo.clearValue();
            subBlStore.removeAll();
            snStore.load({
                params: {
                     vslCallId: me.getViewModel().get('globalVesselCallId')
                    ,bookingNo: searchParm.get('bookingNo')
                }
            });
        }
    },
    /**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */

    /**
	 * GENERAL METHOD START
	 * =========================================================================================================================
	 */
    getTblSearchCondition: function () {
        var  me = this
            ,searchParm = me.getViewModel().get('theSearch')
            ,vslCallId = me.getViewModel().get('globalVesselCallId')
            ,params = {
                 vslCallId: me.getViewModel().get('globalVesselCallId')
                ,masterBlNo: searchParm.get('masterBlNo')
                ,bookingNo: searchParm.get('bookingNo')
                ,blNo: searchParm.get('blNo')
                ,snNo: searchParm.get('snNo')
                ,unitNo: searchParm.get('unitNo')
            }
      ;

      return params;
    },

    /**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */

    /**
	 * DETAIL METHOD START
	 * =========================================================================================================================
	 */
    onTblLoadDetail: function () {
        var  me = this
            ,refs = me.getReferences()
            ,theDetail = null
            ,recvData = me.getView().recvData
            ,bookingCombo = refs.refDtlCboBookingNo
            ,snCombo = refs.refDtlCboSN
            ,masterBlCombo = refs.refDtlCboMasterBL
            ,subBlCombo = refs.refDtlCboSubBL
            ,catgCd = recvData.get('catgCd')
        ;

        me.getViewModel().set('tblDamageCheckDetail', Ext.create('MOST.model.operation.DamageCheck'));
        theDetail = me.getViewModel().get('tblDamageCheckDetail');
        bookingCombo.clearValue();
        snCombo.clearValue();
        masterBlCombo.clearValue();
        subBlCombo.clearValue();
        // if (recvData.data.isOperationScreen) theDetail = Ext.create('MOST.model.controller.DamageCheck');
        Ext.Object.merge(theDetail.data, recvData.data);
        // Load combo Store
        me.setTblDetailComboStore();

        if (recvData.data.isOperationScreen) {
            refs.refTblDtlCheckedDt.setValue(recvData.data.checkedDt);
            theDetail.data.isOperationScreen = true;
            theDetail.phantom = false;
            refs.refVslCallId.setValue(recvData.data.vslCallId);
            refs.refTblDtlUnitNo.setDisabled(true);

            if (catgCd == 'I' || catgCd == 'T') {
                refs.refDtlCboBookingNo.setValue();
                refs.refDtlCboSN.setValue();
                refs.refDtlCboMasterBL.setValue(recvData.data.mfDocId);
                refs.refDtlCboSubBL.setValue(recvData.data.blNo);
                refs.refDtlCboBookingNo.setDisabled(true);
                refs.refDtlCboSN.setDisabled(true);
            } else if (catgCd == 'E' || catgCd == 'S'|| catgCd == 'R') {
                refs.refDtlCboMasterBL.setValue();
                refs.refDtlCboSubBL.setValue();
                refs.refDtlCboBookingNo.setValue(recvData.data.mfDocId);
                refs.refDtlCboSN.setValue(recvData.data.shipgNoteNo);
                refs.refDtlCboMasterBL.setDisabled(true);
                refs.refDtlCboSubBL.setDisabled(true);
            } else {
                theDetail.phantom = true;
            }

            if (recvData.get('vslCallId') != 'STRG' && recvData.get('vslCallId') != 'CSTO') {
                var vslCallIdStore = me.getStore('vslCallIdPopup');
                vslCallIdStore.load({
                    params: {
                        vslCallId : recvData.get('vslCallId'),
                        mode:'textfield'
                    },
                    callback: function (records, operation, success) {
                        if (success) {
                            if(records.length > 0) {
                                theDetail.set({
                                    vslCd: records[0].get("vslCd")
                                    ,callSeq: records[0].get("callSeq")
                                    ,callYear: records[0].get("callYear")
                                })
                            }
                        }
                    }
                });
            } else {
                theDetail.set({
                    vslCd: '0000'
                    ,callSeq: '0000'
                    ,callYear: '0000'
                })
            }

            
            if (recvData.data.locCd == 'VSL') {
                refs.refRadioVessel.setChecked(true);
            } else if (recvData.data.locCd == 'YARD') {
                refs.refRadioYards.setChecked(true);
            } else {
                refs.refRadioGate.setChecked(true);
            }
        } else {
            refs.refRadioVessel.setChecked(true);
        }
     

        if (theDetail.get('isOperationScreen')) {
            // load detail data
            //if(!theDetail.isPhantom())
             me.setTblDetailGridStore();
        }

        me.onTblDetailClear();
    },

    selectRecordToUpdate: function() {
        var me = this,
            theDetailParm = me.getViewModel().get('tblDamageCheckDetail'),
            regNo = theDetailParm.get('regNo'),
            store = me.getStore("tblDtlDamageCheckStore"),
            grid = me.lookupReference("refTblGridDamageCheckDetail"),
            record = store.findRecord('regNo', regNo);

            grid.select(record,true,true);
            me.onSelectGridDamageCheckHHT();
    },

    setTblDetailComboStore: function () {
        var  me = this
            ,refs = me.getReferences()
            ,theDetail = me.getViewModel().get('tblDamageCheckDetail')
            ,dtlMaterBlCombo = me.getStore('tblDtlMasterBlComboStore')
            ,dtlBookingNoCombo = me.getStore('tblDtlBookingNoComboStore')
            ,damagePartCombo = me.getStore('tblDamageParts')
            ,damageLevelCombo = me.getStore('tblDamageLevels')
            ,damageDescCombo = me.getStore('tblDamageDesc')
            ,bookingCombo = refs.refDtlCboBookingNo
            ,snCombo = refs.refDtlCboSN
            ,masterBlCombo = refs.refDtlCboMasterBL
            ,subBlCombo = refs.refDtlCboSubBL
        ;

        bookingCombo.clearValue();
        snCombo.clearValue();
        masterBlCombo.clearValue();
        subBlCombo.clearValue();

        dtlMaterBlCombo.load({
            params: {
                 vslCallId: theDetail.get('vslCallId')
                ,catgCd: me.IMPORT_CD
            },
            callback: function (records, operation, success) {
                if (success) {
                    if(theDetail.isPhantom()) {
                        bookingCombo.clearValue();
                        snCombo.clearValue();
                        masterBlCombo.clearValue();
                        subBlCombo.clearValue();
                        refs.refTblDetailCommodityGroup.clearValue();
                        refs.refTblDetailCommodity.clearValue();
                        refs.refDamageCheckDetailRemark.clearValue();
                    }
                }
            }
        });
        
        dtlBookingNoCombo.load({
            params: {
                 vslCallId: theDetail.get('vslCallId')
                ,catgCd: me.EXPORT_CD
           },
           callback: function (records, operation, success) {
            if (success) {
                if(theDetail.isPhantom()) {
                    bookingCombo.clearValue();
                    snCombo.clearValue();
                    masterBlCombo.clearValue();
                    subBlCombo.clearValue();
                    refs.refTblDetailCommodityGroup.clearValue();
                    refs.refTblDetailCommodity.clearValue();
                    refs.refDamageCheckDetailRemark.clearValue();
                }
            }
        }
        });

        damagePartCombo.load({
			callback: function (records, operation, success) {
				// if (success) {
				// 	damagePartCombo.insert(0, [{ invDesc: 'Select', invCd: '' }]);
				// }
			}
		});
        damageLevelCombo.load({
			// callback: function (records, operation, success) {
			// 	if (success) {
			// 		damageLevelCombo.insert(0, [{ invDesc: 'Select', invCd: '' }]);
			// 	}
			// }
		});
        damageDescCombo.load();
    },

    onCheckLocChange: function() {
		var me = this,
			refs = me.getReferences()
			,subBlStore = me.getStore("tblDtlBlComboStore")
            ,snStore = me.getStore("tblDtlSnComboStore")
            ,theDetailParm = me.getViewModel().get('tblDamageCheckDetail')
			,vslCallId = theDetailParm.get('vslCallId')
			,blNo = refs.refDtlCboSubBL.getValue()
            ,snNo = refs.refDtlCboSN.getValue()
			,locCd = refs.refTblDetailLocationRadioGroup.getValues().location
            ,masterBLCombo = refs.refDtlCboMasterBL.getValue()
            ,bookingCombo = refs.refDtlCboBookingNo.getValue()
;
		if (blNo && !snNo) {
            subBlStore.load({
                params: {
                     vslCallId: vslCallId
                    ,masterBlNo: masterBLCombo
                    ,locCd: locCd
                    ,blNo: blNo
                },
                callback: function(records, operation, success) {
                    if (success) {
                        refs.refDtlCboSubBL.setValue(blNo);
                    }
                }
            });
        } else if (!blNo && snNo) {
            snStore.load({
                params: {
                     vslCallId: vslCallId
                    ,bookingNo: bookingCombo
                    ,locCd: locCd
                    ,snNo: snNo
                },
                callback: function(records, operation, success) {
                    if (success) {
                      refs.refDtlCboSN.setValue(snNo);
                    }
                }
            });
        }
	},

    onTblSelectDetailMfDocIdCombo: function ( combo, newValue, eOpts )  {
        var  me = this
            ,refs = me.getReferences()
            ,theDetailParm = me.getViewModel().get('tblDamageCheckDetail')
            ,refTargetCombo = combo['reference']
            ,refMasterBLCombo = 'refDtlCboMasterBL'
            ,masterBLCombo = me.lookupReference(refMasterBLCombo)
            ,subBLCombo = me.lookupReference('refDtlCboSubBL')
            ,subBlStore = subBLCombo.getStore()
            ,refBookingNoCombo = 'refDtlCboBookingNo'
            ,bookingCombo = me.lookupReference(refBookingNoCombo)
            ,snCombo = me.lookupReference('refDtlCboSN')
            ,snStore = snCombo.getStore()
            ,locCd = refs.refTblDetailLocationRadioGroup.getValues().location
        ;
        // check the combo refence ( is master BL or Book No)
        if(refTargetCombo == refMasterBLCombo) {
            theDetailParm.set('catgCd', me.IMPORT_CD);
            bookingCombo.clearValue();
            snCombo.clearValue();
            snStore.removeAll();
            subBlStore.load({
                params: {
                     vslCallId: theDetailParm.get('vslCallId')
                    ,masterBlNo: masterBLCombo.getValue()
                    ,locCd: locCd
                },
                callback: function(records, operation, success) {
                    refs.refDamageCheckDetailDesc.setValue('OTH');
                }
            });
        } else if(refTargetCombo == refBookingNoCombo) {
            theDetailParm.set('catgCd', me.EXPORT_CD);
            // Clear value in MasterBL value
            // Clear value in BL value
            // Clear BL Combo Store
            masterBLCombo.clearValue();
            subBLCombo.clearValue();
            subBlStore.removeAll();
            snStore.load({
                params: {
                     vslCallId: theDetailParm.get('vslCallId')
                    ,bookingNo: bookingCombo.getValue()
                    ,locCd: locCd
                },
                callback: function(records, operation, success) {
                    refs.refDamageCheckDetailDesc.setValue('OTH');
                }
            });
        }
    },

    onTblSelectDetailCgNoCombo: function ( combo , newValue, eOpts )  {
        var  me = this
            ,refs = me.getReferences()
            ,theDetailParm = me.getViewModel().get('tblDamageCheckDetail')
            ,unitNoField = me.lookupReference('refTblDtlUnitNo')
            ,duplicateStore = me.getStore('tblDtlDuplicateDamageCheckStore'),
            cgTpCd = newValue.get('cgTpCd') || theDetailParm.get('cgTpCd');
        ;

        refs.refDamageCheckDetailQty.setReadOnly(true);
        refs.refDamageCheckDetailMt.setReadOnly(true);
        refs.refDamageCheckDetailM3.setReadOnly(true);

        refs.refDamageCheckBrand.setHidden(true);
        refs.refDamageCheckModel.setHidden(true);
        refs.refDamageCheckUnitNo.setHidden(true);
        refs.refDamageCheckDamagePart.setHidden(true);
        refs.refDamageCheckDamageLevel.setHidden(true);

        theDetailParm.set({
            cgTpCd: newValue.get('cgTpCd')
           ,cmdtGrpCd: newValue.get('cmdtGrpCd')
           ,cmdtCd: newValue.get('cmdtCd')
           ,docMsrmt: newValue.get('docMsrmt')
           ,docQty: newValue.get('docQty')
           ,docWgt: newValue.get('docWgt')
           ,eachVol: newValue.get('eachVol')
           ,eachWgt: newValue.get('eachWgt')
           ,unitNo: newValue.get('unitNo')
           ,brandCd: newValue.get('brandCd')
           ,modelCd: newValue.get('modelCd')
       });
       
        if(theDetailParm.isPhantom()) {
            refs.refDamageCheckDetailQty.setValue(0);
            refs.refDamageCheckDetailMt.setValue(0);
            refs.refDamageCheckDetailM3.setValue(0);
        }

        if (cgTpCd == 'BBK') {
            refs.refDamageCheckDetailQty.setReadOnly(false);

        } else if (cgTpCd == 'DBN') {
            refs.refDamageCheckDetailMt.setReadOnly(false);
        } else if (cgTpCd == 'RCV') {
            refs.refDamageCheckBrand.setHidden(false);
            refs.refDamageCheckModel.setHidden(false);
            refs.refDamageCheckUnitNo.setHidden(false);
            refs.refDamageCheckDamagePart.setHidden(false);
            refs.refDamageCheckDamageLevel.setHidden(false);
            refs.cboDamagePart.setDisabled(false);
            refs.cboDamageLevel.setDisabled(false);

            refs.refDamageCheckDetailQty.setValue(theDetailParm.get('docQty'));
            refs.refDamageCheckDetailMt.setValue(theDetailParm.get('docWgt'));
            refs.refDamageCheckDetailM3.setValue(theDetailParm.get('docMsrmt'));
            refs.refTblDtlUnitNo.setValue(theDetailParm.get('unitNo'));

            refs.refDamageCheckBrandCd.setValue(theDetailParm.get('brandCd'));
			refs.refDamageCheckModelCd.setValue(theDetailParm.get('modelCd'));
        }

        

       if(newValue.get('cgTpCd') != 'RCV') unitNoField.clearValue();

       if (!theDetailParm.get('isOperationScreen')) {
            me.setTblDetailGridStore();
       }

    },

    onChangeQty: function ( field, newValue, oldValue, eOpts ) {
        var  me = this
            ,theDetailParm = me.getViewModel().get('tblDamageCheckDetail')
        ;

        if(theDetailParm.get('cgTpCd') === 'BBK') {
            var wgt = newValue * theDetailParm.get('eachWgt');
            var msrmt = newValue * theDetailParm.get('eachVol'); 
            theDetailParm.set({
                 dmgMt: wgt
                ,dmgM3: msrmt
            });
        }
        // else if(theDetailParm.get('cgTpCd') === 'RCV') {
        //     theDetailParm.set({ 
        //          dmgQty: 1
        //         ,dmgMt: 0
        //         ,dmgM3: 0
        //    });
        // }
    },

    setTblDetailGridStore : function () {
        var  me = this 
            ,refs = me.getReferences()
            ,theDetailParm = me.getViewModel().get('tblDamageCheckDetail')
            ,gridStore = me.getStore('tblDtlDamageCheckStore')
            ,damageStore = me.getStore('damageStore')
            ,uploadStore = me.getStore('uploadedFileDamageStore')
            ,params = {
                vslCallId: theDetailParm.get('vslCallId')
               ,catgCd: theDetailParm.get('catgCd') 
               ,blNo: theDetailParm.get('blNo')
               ,snNo: theDetailParm.get('snNo')
               ,unitNo: theDetailParm.get('unitNo')
               ,cgNo: theDetailParm.get('snNo') ?  theDetailParm.get('snNo') : theDetailParm.get('blNo')
               ,pgmId : 'CF106'
           }
        ;


        damageStore.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					if(records.length > 0) {
                        uploadStore.removeAll();
                        uploadStore.setData(records[0].data.uploadItems);
		                uploadStore.commitChanges();

                        gridStore.setData(records[0].data.items)
                        gridStore.commitChanges()
                        me.selectRecordToUpdate();
                        refs.refDtlCboMasterBL.setReadOnly(true);
                        refs.refDtlCboSubBL.setReadOnly(true);
                        refs.refDtlCboBookingNo.setReadOnly(true);
                        refs.refDtlCboSN.setReadOnly(true);
					}
				}
			}
		});

        // gridStore.load({
        //     params: params,
        //     callback: function(records, operation, success) {
        //         if (theDetailParm.get('isOperationScreen') && !theDetailParm.get('isOperationScreen')) {
        //             me.selectRecordToUpdate();
        //             refs.refDtlCboMasterBL.setReadOnly(true);
        //             refs.refDtlCboSubBL.setReadOnly(true);
        //             refs.refDtlCboBookingNo.setReadOnly(true);
        //             refs.refDtlCboSN.setReadOnly(true);
        //         }
                
        //     }
        // });
    },

    onTblAddDetailGrid: function( button, e, eOpts ) {
        var  me = this
            ,refs = me.getReferences()
            ,gridStore = me.getStore('tblDtlDamageCheckStore')
            ,cboDamagePart = me.lookupReference('cboDamagePart')
            ,cboDamagelevel = me.lookupReference('cboDamageLevel')
            ,damageGroup = [cboDamagePart, cboDamagelevel]
            // ,dmgDesc = refs.refDamageCheckDetailDesc.getValue()
            // ,dmgDescNm = refs.refDamageCheckDetailDesc.getSelection().get('cdNm')
			,dmgRemark = refs.refDamageCheckDetailRemark.getValue()
			,cgNo = refs.refDtlCboSubBL.getValue() ? refs.refDtlCboSubBL.getValue() : refs.refDtlCboSN.getValue()
			,dmgQty = refs.refDamageCheckDetailQty.getValue()
			,dmgMt = refs.refDamageCheckDetailMt.getValue()
			,dmgM3 = refs.refDamageCheckDetailM3.getValue()
			,locCd = refs.refTblDetailLocationRadioGroup.getValues().location
			,unitNo = refs.refTblDtlUnitNo.getValue()
			,brandCd = refs.refDamageCheckBrandCd.getValue()
			,modelCd = refs.refDamageCheckModelCd.getValue()
            ,checkedDt = refs.refTblDtlCheckedDt.getFormattedValue()
            ,stevedoreId = refs.refStevedoreId.getValue()
            ,agentId = refs.refAgentId.getValue()
            ,gridTotalCount = gridStore.getTotalCount()
            ,record = Ext.create('MOST.model.operation.TheListOfDamageCheckOfGC')
            ,theDetail = me.getViewModel().get('tblDamageCheckDetail')
            ,damagePart = damageLevel = damagePartNm = damageLevelNm = null
            ,docQty = theDetail.get('docQty')
            ,docM3 = theDetail.get('docMsrmt')
            ,docMt = theDetail.get('docWgt')
            ,listData = gridStore.data.items
            ,gridQty = Number(dmgQty)
			,gridM3 = Number(dmgM3)
			,gridMt = Number(dmgMt)
            ,validate = true
            ,cgTpCd = theDetail.get('cgTpCd')
        ;

        dmgMt = Number(Number(dmgMt).toFixed(3));
        dmgM3 = Number(Number(dmgM3).toFixed(3));
        docM3 = Number(Number(docM3).toFixed(3));
        docMt = Number(Number(docMt).toFixed(3));

        if (!cgNo) {
            MessageUtil.warning('warning_msg', 'portsafetyconfirmation_validcheck_gate_mandatory_cargo');
            return;
        }

        if ((!dmgQty && !dmgMt && !dmgM3 ) || (dmgQty == 0 && dmgMt == 0 && dmgM3 == 0 )) {
            MessageUtil.warning('warning_msg', 'inputAmount');
            return;
        }

        for (let i = 0; i < listData.length; i++) {
			const item = listData[i];
			if (locCd == item.get('locCd')) {
				gridQty += Number(item.get('dmgQty'));
				gridMt += Number(Number(item.get('dmgMt')).toFixed(3));
				gridM3 += Number(Number(item.get('dmgM3')).toFixed(3));
			}
		}

        if (cgTpCd == 'BBK' && Number(gridQty) == Number(docQty)) {
			gridMt = Number(docMt);
			gridM3 = Number(docM3);
		}

        if (cgTpCd != 'RCV') {
            if ((Number(gridQty) > Number(docQty) || Number(gridMt) > Number(docMt) || Number(gridM3) > Number(docM3))) {
                MessageUtil.warning('warning_msg', 'inputAmtLessThanDocAmt');
                return;
            }
        } else {
            if(!me.onValidMandatoryBeforeAddDetailGrid(damageGroup)) {
                MessageUtil.warning('warning_msg', 'selectDamagePartLevel');
                return;
            } else {
                damagePart = cboDamagePart.getSelection().get('invCd');
                damagePartNm = cboDamagePart.getSelection().get('invDesc');
                damageLevel = cboDamagelevel.getSelection().get('invCd');
                damageLevelNm = cboDamagelevel.getSelection().get('invDesc');
            }
        }

        // TODO :: get Data from input fields
        record.set({
             dmgPart: damagePart
            ,dmgPartNm: damagePartNm
            ,dmgLevel: damageLevel
            ,dmgLevelNm: damageLevelNm
            ,dmgRemark: dmgRemark
            // ,dmgDesc: dmgDesc
            // ,dmgDescNm: dmgDescNm
            ,cgNo: cgNo
            ,dmgQty: dmgQty
            ,dmgMt: dmgMt
            ,dmgM3: dmgM3
            ,locCd: locCd
            ,unitNo: unitNo
            ,brandCd: brandCd
            ,modelCd: modelCd
            ,checkedDt:checkedDt
            ,stevedoreId
            ,agentId
            ,workingStatus: WorkingStatus.INSERT
        });

        gridStore.getData().getRange().forEach(function (record, index, array) {
            if (damagePart == record.data.dmgPart && damageLevel == record.data.dmgLevel && locCd == record.data.locCd) {
                validate = false;
            }
        });

        if (validate) {
            // TODO :: insert Data in gridStore
            gridStore.insert(gridTotalCount, record);
        } else {
            MessageUtil.warning('damageCheck', 'duplicatedata_msg');
        }

        if (cgTpCd != 'RCV') {
            me.onTblDetailClear();
        }
    },

    onValidMandatoryBeforeAddDetailGrid: function (damageComponentGroup) {
        for(component of damageComponentGroup) {
            var isNullValue = StringUtil.isNullorEmpty(component.getSelection())
            if( isNullValue )
                return false;
        }
        return true;
    },

    onTblUpdateDetailGrid: function( button, e, eOpts ) {
        var  me = this
            ,refs = me.getReferences()
            ,cboDamagePart = me.lookupReference('cboDamagePart')
            ,cboDamagelevel = me.lookupReference('cboDamageLevel')
            ,damageGroup = [cboDamagePart, cboDamagelevel]
            ,grid = me.lookupReference(me.DETAIL_GRID_REF_NAME)
            ,gridRecord = grid.getSelection()
            // ,dmgDesc = refs.refDamageCheckDetailDesc.getValue()
            // ,dmgDescNm = refs.refDamageCheckDetailDesc.getSelection().get('cdNm')
			,dmgRemark = refs.refDamageCheckDetailRemark.getValue()
			,cgNo = refs.refDtlCboSubBL.getValue() ? refs.refDtlCboSubBL.getValue() : refs.refDtlCboSN.getValue()
			,dmgQty = refs.refDamageCheckDetailQty.getValue()
			,dmgMt = refs.refDamageCheckDetailMt.getValue()
			,dmgM3 = refs.refDamageCheckDetailM3.getValue()
			,locCd = refs.refTblDetailLocationRadioGroup.getValues().location
			,unitNo = refs.refTblDtlUnitNo.getValue()
			,brandCd = refs.refDamageCheckBrandCd.getValue()
			,modelCd = refs.refDamageCheckModelCd.getValue()
            ,checkedDt = refs.refTblDtlCheckedDt.getFormattedValue()
            ,theDetail = me.getViewModel().get('tblDamageCheckDetail')
            ,damagePart = damageLevel = damagePartNm = damageLevelNm = null
            ,docQty = theDetail.get('docQty')
            ,docM3 = theDetail.get('docMsrmt')
            ,docMt = theDetail.get('docWgt')
            ,gridQty = Number(dmgQty)
			,gridM3 = Number(dmgM3)
			,gridMt = Number(dmgMt)
            ,gridStore = me.getStore('tblDtlDamageCheckStore')
            ,listData = gridStore.getModifiedRecords()
            ,selectionQty =  selectionM3 = selectionMt = ''
        ;

        if(!gridRecord) {
             MessageUtil.warning('warning_msg',  'spaceMovementPlan_WarnSelUpdRec');
            return;
        } else {
            selectionQty = gridRecord.get('dmgQty');
			selectionM3 = gridRecord.get('dmgM3');
			selectionMt = gridRecord.get('dmgMt');
        }

        if ((!dmgQty && !dmgMt && !dmgM3 ) || (dmgQty == 0 && dmgMt == 0 && dmgM3 == 0 )) {
            MessageUtil.warning('warning_msg', 'inputAmount');
            return;
        }

        for (let i = 0; i < listData.length; i++) {
			const item = listData[i];
			if (locCd == item.get('locCd')) {
				gridQty += Number(item.get('dmgQty'));
				gridMt += Number(Number(item.get('dmgMt')).toFixed(3));
				gridM3 += Number(Number(item.get('dmgM3')).toFixed(3));
			}
		}

        gridQty = gridQty - selectionQty;
        gridM3 = gridM3 - selectionM3;
        gridMt = gridMt - selectionMt;

        if ((Number(gridQty) > Number(docQty) || Number(gridMt) > Number(docMt) || Number(gridM3) > Number(docM3))) {
            MessageUtil.warning('warning_msg', 'inputAmtLessThanDocAmt');
            return;
        }

        if (theDetail.get('cgTpCd') == 'RCV') {
            if(!me.onValidMandatoryBeforeAddDetailGrid(damageGroup)) {
                MessageUtil.warning('warning_msg', 'selectDamagePartLevel');
                return;
            } else {
                damagePart = cboDamagePart.getSelection().get('invCd');
                damagePartNm = cboDamagePart.getSelection().get('invDesc');
                damageLevel = cboDamagelevel.getSelection().get('invCd');
                damageLevelNm = cboDamagelevel.getSelection().get('invDesc');
            }
        }

        gridRecord.set({
             dmgPart: damagePart
            ,dmgPartNm: damagePartNm
            ,dmgLevel: damageLevel
            ,dmgLevelNm: damageLevelNm
            // ,dmgDesc: dmgDesc
            // ,dmgDescNm: dmgDescNm
			,dmgRemark: dmgRemark
			,cgNo: cgNo
			,dmgQty: dmgQty
			,dmgMt: dmgMt
			,dmgM3: dmgM3
			,locCd: locCd
			,checkedDt: checkedDt
            ,unitNo: unitNo
			,brandCd: brandCd
			,modelCd: modelCd
            ,workingStatus: gridRecord.phantom ? WorkingStatus.INSERT : WorkingStatus.UPDATE
        });

        if (theDetail.get('cgTpCd') != 'RCV') {
            me.onTblDetailClear();
        }
    },

    onTblDeleteDetailGrid: function( button, e, eOpts ) {
        var  me = this
            ,grid = me.lookupReference(me.DETAIL_GRID_REF_NAME)
            ,gridStore = grid.getStore()
            ,gridRecord = grid.getSelection()
        ;

        if(!gridRecord) {
             MessageUtil.warning('warning_msg',  'Before Remove, Please select a record.');
            return;
        }
        MessageUtil.questionModern('tbl_confrm_delete','infodelete_msg', null,function(button){
			if(button === 'ok'){
                gridRecord.set('workingStatus', WorkingStatus.DELETE);
                gridStore.remove(gridRecord);
			}
		});

       
    },

    onTblDetailClear: function(button, e, eOpts) {
        var  me = this
            ,refs = me.getReferences()
            ,cboDamagePart = me.lookupReference('cboDamagePart')
            ,cboDamagelevel = me.lookupReference('cboDamageLevel')
        ;

        cboDamagePart.clearValue();
        cboDamagelevel.clearValue();
        refs.refDamageCheckDetailQty.clearValue();
        refs.refDamageCheckDetailMt.clearValue();
        refs.refDamageCheckDetailM3.clearValue();
        refs.refDamageCheckDetailRemark.clearValue();
    },

    onTblMainDetailConfirm: function() {
        var me = this,
		    refs = me.getReferences(),
		    store = me.getStore('uploadedFileDamageStore'),
		    frm = refs.fileForm,
		    formData = new FormData(frm),
		    isFileUpload = false;
				
		store.getModifiedRecords().forEach(function(record, index, array){
			formData.append(record.data.fileName, record.data.fileStream);
			isFileUpload = true;
		});
		if(isFileUpload){
			this.fileUpload(formData);
		} else {
			me.saveProcess(); 
		}
    },

    onTblDetailConfirm: function() {
        var  me = this
            ,recvData = me.getView().recvData
        ;
        if(recvData.data.isOperationScreen){
            me.onTblOprDetailConfirm()
        }else{
            me.onTblMainDetailConfirm()
        }
    },

    onTblOprDetailConfirm: function() {
        var  me = this
        ,uploadStore = me.getStore('uploadedFileDamageStore')
        ,gridStore = me.getStore('tblDtlDamageCheckStore')
        ,form = me.getView()
        ,isHaveRecord = gridStore.loadCount > 0
		,returnValue = {};		
        if(!form.isValid()) {
            MessageUtil.warning('warning_msg',  'mandatory');
            return;
        }
        
        // check whether grid have over one record.
        if(!isHaveRecord) {
            MessageUtil.warning('warning_msg',  'NeedOverOneRecord');
            return;
        }
        gridStore.getModifiedRecords()
        var damageChecks = new Array().concat(gridStore.getData().items.slice(), gridStore.removed );
        var modifiedFileUploads = uploadStore.getModifiedRecords()
        var detailItem = me.getViewModel().get('tblDamageCheckDetail')
        var checkedDtField = me.lookupReference('refTblDtlCheckedDt')
        detailItem.set({
            checkedDt: checkedDtField.getFormattedValue()
        });
        returnValue = {
            modifiedFileUploads,
            damageChecks,
            detailItem
        }
        var win = me.getView().up('window');
        if (win) {
            win.returnValue = returnValue
            win.close();
        }	
    },
    saveProcess: function () {
        var  me = this
            ,window = me.getView().up('window')
            ,theDamageStore = me.getStore('theDamageStore')
            ,currentUploadStore = me.getStore('uploadedFileDamageStore')
            ,radioGroup = me.lookupReference('refTblDetailLocationRadioGroup')
            ,selectedRadio = radioGroup.getValues()
            ,detailItem = me.getViewModel().get('tblDamageCheckDetail')
            ,checkedDtField = me.lookupReference('refTblDtlCheckedDt')
            ,gridStore = me.getStore('tblDtlDamageCheckStore')
            ,form = me.getView()
            ,isHaveRecord = gridStore.loadCount > 0
            ,uploadList = new Array()
            ,arrayItems = new Array()

        // check to mandatory as valid.
        if(!form.isValid()) {
             MessageUtil.warning('warning_msg',  'mandatory');
            return;
        }

        // check whether grid have over one record.
        if(!isHaveRecord) {
             MessageUtil.warning('warning_msg',  'NeedOverOneRecord');
            return;
        }
        // combine origin items, removed items, modified items.
        var targetList = new Array().concat( gridStore.getData().items.slice(), gridStore.removed );
        
        // makeup records C, U, D except R by gridDetailStore combining detailParm.
        for( targetRecord of targetList ) {
            var copyRecord = detailItem.copy();
            
            copyRecord.set({
                 cgNo: targetRecord.get('cgNo')
                ,ixCd: copyRecord.get('catgCd') === me.IMPORT_CD ? 'I' : 'X'
                ,dmgPart: targetRecord.get('dmgPart')
                ,dmgLevel: targetRecord.get('dmgLevel')
                ,dmgRemark: targetRecord.get('dmgRemark')
                // ,dmgDesc: targetRecord.get('dmgDesc')
                ,locCd:targetRecord.get('locCd')
                ,dmgQty:targetRecord.get('dmgQty')
                ,dmgMt:targetRecord.get('dmgMt')
                ,dmgM3:targetRecord.get('dmgM3')
                ,unitNo:targetRecord.get('unitNo')
                ,modelCd:targetRecord.get('modelCd')
                ,brandCd:targetRecord.get('brandCd')
                ,regNo:targetRecord.get('regNo')
                ,checkedDt: checkedDtField.getFormattedValue()
                ,userId: MOST.config.Token.getUserId()
                ,workingStatus: targetRecord.get('workingStatus')
            });
            arrayItems.push(copyRecord.data);
        }
        if(currentUploadStore.data.length > 0) {
			for(var i = 0; i < currentUploadStore.data.length; i++) {
				var uploadItem = currentUploadStore.data.items[i];
				var recordUpload = Ext.create('MOST.model.common.FileUpload');
				recordUpload.set('ufileName', uploadItem.get('ufileName'));
				recordUpload.set('pgmId', 'CF106');
				recordUpload.set('fileName', uploadItem.get('fileName'));
				recordUpload.set('fileSize', uploadItem.get('fileSize'));
				recordUpload.set('fileStream', null);
				recordUpload.set('userId', MOST.config.Token.getUserId());
				recordUpload.set('workingStatus', WorkingStatus.INSERT);
				uploadList.push(recordUpload.data);
			}
			
			// File Upload DELETE RECORD
			currentUploadStore.getRemovedRecords().forEach(function(record, index, array) {
				record.set('workingStatus', WorkingStatus.DELETE);
				uploadList.push(record.data);
			});
		}

        var proxy = detailItem.getProxy();
			proxy.url = theDamageStore.getProxy().url;
			detailItem.phantom = false;
			detailItem.set("items", arrayItems);
			detailItem.set('uploadItems', uploadList);
			detailItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
			detailItem.save({
				success : function(records,success){
					MessageUtil.saveSuccess();	
					var win = me.getView().up('window');
					if (win) {
						win.close();
					}	
				}
			});
    },

    onTblDetailCancel: function() {
        var me = this,
        window = me.getView().up('window');

        window.close(); 
    },

    onSelectGridDamageCheckHHT: function () {
		var me = this,
			refs = me.getReferences(),
			grid = me.lookupReference('refTblGridDamageCheckDetail'),
            detailItem = me.getViewModel('tblDamageCheckDetail'),
			selected = grid.getSelection();
			
		if(!selected){
			// me.getViewModel().set('tblDamageCheckDetail', null);
			//reset form: ...
			return;
		}

        if (selected.get('catgCd') == 'I') {
            refs.refDtlCboBookingNo.setValue();
            refs.refDtlCboSN.setValue();
            refs.refDtlCboMasterBL.setValue(selected.data.mfDocId);
            refs.refDtlCboSubBL.setValue(selected.data.cgNo);
        } else if (selected.get('catgCd') == 'E') {
            refs.refDtlCboMasterBL.setValue();
            refs.refDtlCboSubBL.setValue();
            refs.refDtlCboBookingNo.setValue(selected.data.mfDocId);
            refs.refDtlCboSN.setValue(selected.data.cgNo);
        }
       
        refs.cboDamagePart.setValue(selected.data.dmgPart);
		refs.cboDamageLevel.setValue(selected.data.dmgLevel);
		// refs.refDamageCheckDetailDesc.setValue(selected.data.dmgDesc);
		refs.refDamageCheckDetailQty.setValue(selected.data.dmgQty);
		refs.refDamageCheckDetailMt.setValue(selected.data.dmgMt);
		refs.refDamageCheckDetailM3.setValue(selected.data.dmgM3);
		refs.refTblDtlCheckedDt.setValue(selected.data.checkedDt);
		refs.refDamageCheckDetailRemark.setValue(selected.data.dmgRemark);
		refs.refTblDtlUnitNo.setValue(selected.data.unitNo);
		refs.refDamageCheckBrandCd.setValue(selected.data.brandCd);
		refs.refDamageCheckModelCd.setValue(selected.data.modelCd);
		if (selected.data.locCd == 'VSL') {
			refs.refRadioVessel.setChecked(true);
		} else if (selected.data.locCd == 'YARD') {
			refs.refRadioYards.setChecked(true);
		} else {
			refs.refRadioGate.setChecked(true);
		}

		// me.getViewModel().set('tblDamageCheckDetail', selected.getData());
		// var rowDetail = me.getViewModel().get('theGears');
		// refs.refDtStartTimeGears.setValue(rowDetail.workStDt);
		// refs.refDtEndTimeGears.setValue(rowDetail.workEndDt);
	},

    openUnitNoPopUp: function (button, e, eOpts) {
        var  me = this
            ,detailData = me.getViewModel().get('tblDamageCheckDetail')
        ;

        detailData.title = me.UNITNO_POPUP_TITLE;
        ViewUtil.openHhtPopup(me, 'app-unitnopopuphht', button.reference, detailData);
    },

    afterSetCodePopupData: function(xtype, targetControl, returnValue){ // app-unitnopopuphht, refTblDetailBtnUnitNo
        var  me = this
            ,refs = me.getReferences()
            ,detailParm = me.getViewModel().get('tblDamageCheckDetail')
        ;

        if(targetControl === 'refTblDetailBtnUnitNo') {
            if(returnValue) {
                refs.cboDamagePart.setDisabled(false);
                refs.cboDamageLevel.setDisabled(false);

                var returnItem = returnValue.item;

                detailParm.set({
                     unitNo: returnValue.code
                    ,brandCd: returnItem.get('brandCd')
                    ,brandNm: returnItem.get('brandNm')
                    ,modelCd: returnItem.get('modelCd')
                    ,modelNm: returnItem.get('modelNm')
                    ,dmgQty: 1
                    ,dmgMt: returnItem.get('dmgMt')
                    ,dmgM3: returnItem.get('dmgM3')
                });
            }
        }
    },

    onAddFile: function() {
	    var me = this,
            refs = me.getReferences(),
            fileUpload = refs.refFileDmgUpload;

        if(!fileUpload){
            fileUpload = Ext.create('Ext.form.Panel', {
                title : 'Upload Panel',
                reference: 'refFileDmgUpload',
                height : 0,
                hidden: true,
                width : 0,
                modal: true,
                items : [ {
                    xtype : 'filefield',
                    label : 'Damage Image',
                    reference: 'refFileField',
                    buttonText: 'Upload',
                    enctype: 'multipart/form-data',
                    multiple: true,
                    method: 'POST',
                    fileUpload: true,
                    listeners: {
                        change : function(field) {
                            me.fileSelected(field);
                        }
                  }
                } ]
            });

        }
	    
        me.getView().add(fileUpload);

        fileUpload.element.dom.querySelector('.x-button-el').click();

	},

    fileSelected: function (field) {
        var me = this,
		    store = me.getStore('uploadedFileDamageStore'),
            files = field.getFiles();

        for(var i = 0; i < files.length; i++) {
            var record = Ext.create('MOST.model.common.FileUpload');
            var file = files[i];
            record.set('pgmId', 'CF106');
            record.set('fileStream', file);
            record.set('fileName', file.name);
            record.set('fileSize', file.size);
            record.set('workingStatus', WorkingStatus.INSERT);
            store.insert(0, record);
        }
    },

    onAddFile_clickHandler : function() {
		var me = this,
		    refs = me.getReferences(),
		    store = me.getStore('uploadedFileDamageStore'),
    	    input = document.querySelector("#fileUploadDamageCGHHT input[name='fileUpload']"),
    	    frm = refs.fileForm,
            formData = new FormData(frm);

    	for(var i=0; i<input.files.length; i++) {
    		var record = Ext.create('MOST.model.common.FileUpload');
    		var file = input.files[i];
    		record.set('pgmId', 'CF106');
    		record.set('fileStream', file);
    		record.set('fileName', file.name);
    		record.set('fileSize', file.size);
    		record.set('workingStatus', WorkingStatus.INSERT);
    		store.insert(0, record);
    	}
	},

    fileUpload : function(formData) {
		var me = this;
		var store = me.getStore('uploadedFileDamageStore');
    	var xhr = new XMLHttpRequest();
    	
    	xhr.addEventListener('loadend', function() {
    		if(xhr.status === 200) {
    			var rtnData = JSON.parse(xhr.responseText); // get filename - uuid
    			
    			store.getModifiedRecords().forEach(function(record, index, array) {
    	    		record.set('ufileName', rtnData[record.get('fileName')]);
    	    	});
                me.saveProcess();
    		}else{
    			MessageUtil.warning('warning_msg', 'fail_msg');
    		}
    		
    	});
    	
    	xhr.open('POST',MOST.config.Locale.getRestApiDestUrl() + '/file/manage/fileupload');
    	xhr.setRequestHeader('Authorization', MOST.config.Token.getTokenType() + ' ' + MOST.config.Token.getAccessToken());
    	xhr.send(formData);
    	
	},

    onRemoveFile_clickHandler: function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('uploadedFileDamageStore');
		var grid = me.lookupReference('refFileUpload');
		
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection == null) return;

        MessageUtil.questionModern('tbl_confrm_delete','infodelete_msg', null,function(button){
			if(button === 'ok'){
                Ext.each(selection, function (record) {
                    store.remove(record);
                });
			}
		});
	},

    /**
	 * DETAIL METHOD END
	 * =========================================================================================================================
	 */

});