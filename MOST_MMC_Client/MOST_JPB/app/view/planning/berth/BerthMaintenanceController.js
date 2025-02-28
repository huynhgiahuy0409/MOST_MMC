Ext.define('MOST.view.planning.berth.BerthMaintenanceController', {
    extend: 'MOST.view.foundation.BaseViewController',

    requires: [

    ],

    alias: 'controller.berthmaintenance',

    /**
     * =========================================================================================================================
     * CONSTANT START
     */
    MAIN_STORE_NAME: 'berthMaintenanceList',
    MAIN_GRID_REF_NAME: 'refBerthMaintenanceGrid',
    MAX_DATE_PERIOD: 0,
    MAX_DATE_LATER: 30,
    BERTH_TP: null,
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
        var me = this,
            refs = me.getReferences();

        me.setDateInDays("refStartTimeSearch", -me.MAX_DATE_PERIOD);
        me.setDateInDays("refEndTimeSearch", +me.MAX_DATE_LATER);

        me.loadCombo();

    },

    loadCombo: function () {
        var me = this,
            berthLocCombo = me.getStore('berthLocCombo'),
            stoppageReasonCombo = me.getStore('stoppageReasonCombo');

        berthLocCombo.load();
        stoppageReasonCombo.load();
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
        var me = this,
            store = me.getStore(me.MAIN_STORE_NAME),
            refs = me.getReferences(),
            params = me.getSearchCondition();

        store.load({
            params: params,
            callback: function (records, operation, success) {
                if (records != undefined && records.length == 0) {
                    MessageUtil.noMatchData();
                }
                me.resetData();
            }
        });
    },

    onChangeBerthNo: function (fromBitt, toBitt) {
        var me = this,
            bittCombo = me.getStore('bittCombo'),
            refs = me.getReferences();
        bittCombo.load({
            params:{
                berthCd: refs.refBerthNo.getValue()
            },
            callback: function (records, operation, success) {
                refs.refFromBitt.setValue(fromBitt);
                refs.refToBitt.setValue(toBitt);
            }
        });
    },

    onSelectBerthNo: function (combo , newValue, eOpts) {
        var me = this,
            bittCombo = me.getStore('bittCombo'),
            refs = me.getReferences();
        bittCombo.load({
            params:{
                berthCd: newValue.get('locId')
            },
            callback: function (records, operation, success) {
                refs.refFromBitt.setValue();
                refs.refToBitt.setValue();
            }
        });
        me.BERTH_TP = newValue.get('berthTp');
    },

    onSelectFromBitt: function (combo , newValue, eOpts) {
        var me = this,
            refs = me.getReferences(),
            toBitt = refs.refToPosition.getValue();

        if (toBitt && Number(toBitt) < Number(newValue.get('fromPos'))) {
            refs.refFromBitt.setValue();
            MessageUtil.warning('Warning', 'fromPosLessThanToPos');
            return false;
        } else {
            refs.refFromPosition.setValue(newValue.get('fromPos'));

        }
    },

    onSelectToBitt: function (combo , newValue, eOpts ) {
        var me = this,
            refs = me.getReferences(),
            fromBitt = refs.refFromPosition.getValue();

        if (fromBitt && Number(fromBitt) > Number(newValue.get('fromPos'))) {
            refs.refToBitt.setValue();
            MessageUtil.warning('Warning', 'toPosLessThanFromPos');
			return false;
        } else {
            refs.refToPosition.setValue(newValue.get('fromPos'));
        }
    },

    validationAddBerthMaintenance: function(){
    	var me = this,
		    refs = me.getReferences(),
            berthCd = refs.refBerthNo.getValue(),
            fromBitt = refs.refFromBitt.getValue(),
            toBitt = refs.refToBitt.getValue(),
            startTime = refs.refStartTime.getValue(),
            endTime = refs.refEndTime.getValue(),
            stoppageReason = refs.refStoppageReason.getValue();
		
		    msgTitle =  '<b>Please input the mandatory field(s):</b><br/>',
		    msgString = '';

		if(!berthCd){
			msgString = TSB.locale.i18n.Bundle.instance.getMsg('berthMaintenance_msg_berthNo') + '<br/>';
		}

		if(!fromBitt){
			msgString += TSB.locale.i18n.Bundle.instance.getMsg('berthMaintenance_msg_FromBitt') + '<br/>';
		}
		
		if(!toBitt){
			msgString += TSB.locale.i18n.Bundle.instance.getMsg('berthMaintenance_msg_ToBitt') + '<br/>';
		}

		if(!startTime){
			msgString += TSB.locale.i18n.Bundle.instance.getMsg('berthMaintenance_msg_startTime') + '<br/>';
		}

		if(!endTime){
			msgString += TSB.locale.i18n.Bundle.instance.getMsg('berthMaintenance_msg_endTime') + '<br/>';
		}
		if(!stoppageReason){
			msgString += TSB.locale.i18n.Bundle.instance.getMsg('berthMaintenance_msg_stoppageReason') + '<br/>';
		}

		if(msgString){
			MessageUtil.alert('Warning', msgTitle + msgString);
			return false;
		}

		return true;
    },

    checkDuplicate: function(berthCd, startTime) {
        var me = this,
            refs = me.getReferences(),
            duplicateStore = me.getStore('checkDuplicate');
        
        duplicateStore.load({
            params:{
                berthCd: berthCd,
                startTime: startTime
            },
            callback: function(records) {
                if (records.length > 0) {
                    MessageUtil.alert('Warning', msgTitle + msgString);
			        return false;
                }
                return 
            }
        })
    },

    onAdd: function() {
        var me = this,
            refs = me.getReferences(),
            store = me.getStore(me.MAIN_STORE_NAME),
            duplicateStore = me.getStore('checkDuplicate');
            berthItem = Ext.create('MOST.model.planning.berth.BerthMaintenance'),
            updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm'),
            berthCd = refs.refBerthNo.getValue(),
            berthTp = me.BERTH_TP,
            fromBitt = refs.refFromBitt.getValue(),
            toBitt = refs.refToBitt.getValue(),
            fromPos = refs.refFromPosition.getValue(),
            toPos = refs.refToPosition.getValue(),
            startTime = refs.refStartTime.getValue(),
            endTime = refs.refEndTime.getValue(),
            stoppageReason = refs.refStoppageReason.getValue();

        if (!me.validationAddBerthMaintenance()) return;

        if (startTime != '' && startTime != null) {
            startTime = Ext.Date.format(new Date(startTime), MOST.config.Locale.getDefaultDateFormatWithNoSeconds())
        }

        if (endTime != '' && endTime != null) {
            endTime = Ext.Date.format(new Date(endTime), MOST.config.Locale.getDefaultDateFormatWithNoSeconds())
        }

        duplicateStore.load({
            params:{
                berthCd: berthCd,
                startTime: startTime
            },
            callback: function(records) {
                if (records.length > 0) {
                    MessageUtil.warning('Warning','duplicateBerthNoAndStartTime');
			        return;
                } else {
                    updateParm.getProxy().url = store.getProxy().url;
                    berthItem.set("userId", MOST.config.Token.getUserId());
                    berthItem.set("berthCd", berthCd);
                    berthItem.set("berthTp", berthTp);
                    berthItem.set("fromBitt", fromBitt);
                    berthItem.set("toBitt", toBitt);
                    berthItem.set("fromPos", fromPos);
                    berthItem.set("toPos", toPos);
                    berthItem.set("startTime", startTime);
                    berthItem.set("endTime", endTime);
                    berthItem.set("stoppageReason", stoppageReason);
            
                    updateParm.set('item', berthItem.data);
                    updateParm.save({
                        callback: function (record, operation, success) {
                            if (success) {
                                MessageUtil.saveSuccess();
                                me.onSearch();
                            }
                        }
                    });
                }
                 
            }
        })
    },

    onSave: function() {
        var me = this,
            refs = me.getReferences(),
            store = me.getStore(me.MAIN_STORE_NAME),
            grid = me.lookupReference(me.MAIN_GRID_REF_NAME),
            selection = grid.getSelection() == null ? null : grid.getSelection()[0],
            duplicateStore = me.getStore('checkDuplicate');
            berthItem = Ext.create('MOST.model.planning.berth.BerthMaintenance'),
            updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm'),
            berthCd = refs.refBerthNo.getValue(),
            fromBitt = refs.refFromBitt.getValue(),
            toBitt = refs.refToBitt.getValue(),
            fromPos = refs.refFromPosition.getValue(),
            toPos = refs.refToPosition.getValue(),
            startTime = refs.refStartTime.getValue(),
            endTime = refs.refEndTime.getValue(),
            stoppageReason = refs.refStoppageReason.getValue();

        if (selection == null) {
            MessageUtil.warning("warning", "whCheckerUpdateRecordEmptyMsg");
            return;
        }
        if (!me.validationAddBerthMaintenance()) return;

        if (startTime != '' && startTime != null) {
            startTime = Ext.Date.format(new Date(startTime), MOST.config.Locale.getDefaultDateFormatWithNoSeconds())
        }

        if (endTime != '' && endTime != null) {
            endTime = Ext.Date.format(new Date(endTime), MOST.config.Locale.getDefaultDateFormatWithNoSeconds())
        }

        duplicateStore.load({
            params:{
                berthCd: berthCd,
                startTime: startTime
            },
            callback: function(records) {
                // if (records.length > 0) {
                //     MessageUtil.warning('Warning','duplicateBerthNoAndStartTime');
			    //     return;
                // } else {
                    updateParm.getProxy().url = store.getProxy().url;
                    updateParm.phantom = false;
                    updateParm.set('workingStatus', WorkingStatus.UPDATE);

                    berthItem.set("userId", MOST.config.Token.getUserId());
                    berthItem.set("berthCd", berthCd);
                    berthItem.set("fromBitt", fromBitt);
                    berthItem.set("toBitt", toBitt);
                    berthItem.set("fromPos", fromPos);
                    berthItem.set("toPos", toPos);
                    berthItem.set("startTime", startTime);
                    berthItem.set("endTime", endTime);
                    berthItem.set("stoppageReason", stoppageReason);
            
                    updateParm.set('item', berthItem.data);
                    updateParm.save({
                        callback: function (record, operation, success) {
                            if (success) {
                                MessageUtil.saveSuccess();
                                me.onSearch();
                            }
                        }
                    });
                // }
                 
            }
        })
    },

    onRemove: function () {
        var me = this,
            refs = me.getReferences(),
            store = me.getStore(me.MAIN_STORE_NAME),
            grid = me.lookupReference(me.MAIN_GRID_REF_NAME),
            selection = grid.getSelection() == null ? null : grid.getSelection()[0];

        if (selection == null) {
            MessageUtil.warning("warning", "deleteRecordEmptyMsg");
            return;
        }

        MessageUtil.question('remove', 'infodelete_msg', null,
            function (button) {
                if (button === 'ok') {
                    store.remove(selection);
                    store.sync({
                        success: function () {
                            MessageUtil.saveSuccess(); // Success Message
                            me.onSearch();
                        }
                    });
                }
            }
        );

    },

    onGridClick: function() {
        var me = this,
            refs = me.getReferences(),
            store = me.getStore(me.MAIN_STORE_NAME),
            grid = me.lookupReference(me.MAIN_GRID_REF_NAME),
            selection = grid.getSelection() == null ? null : grid.getSelection()[0],
            fromBitt = selection.get('fromBitt'),
            toBitt = selection.get('toBitt');

        if (selection == null) return;

        refs.refBerthNo.setDisabled(true);
        refs.refStartTime.setDisabled(true);
        refs.refBtnAdd.setDisabled(true);

        refs.refBerthNo.setValue(selection.get('berthCd'));
        refs.refFromPosition.setValue(selection.get('fromPos'));
        refs.refToPosition.setValue(selection.get('toPos'));
        refs.refStartTime.setValue(selection.get('startTime'));
        refs.refEndTime.setValue(selection.get('endTime'));
        refs.refStoppageReason.setValue(selection.get('stoppageReasonCd'));
        
        me.onChangeBerthNo(fromBitt, toBitt);
    },

    onExportExcelPdfWithServer: function (gridNameString, isExcel) {
        var me = this,
            searchBizParm = me.getSearchCondition();

        searchBizParm.classID = 'com.tsb.most.biz.parm.planning.SearchBerthMaintenanceParm';
        searchBizParm.serviceID = 'MOST.berthMaintenance.selectBerthMaintenanceList'

        me.exportExcelPdfWithServer(gridNameString, searchBizParm, isExcel);
    },

    /**
     * EVENT METHOD END
     * =========================================================================================================================
     */

    /**
     * GENERAL METHOD START
     * =========================================================================================================================
     */
    resetData: function () {
        var me = this,
            refs = me.getReferences();

        refs.refBtnAdd.setDisabled(false);
        refs.refBerthNo.setDisabled(false);
        refs.refStartTime.setDisabled(false);
        refs.refBerthNo.setValue();
        refs.refFromBitt.setValue();
        refs.refToBitt.setValue();
        refs.refFromPosition.setValue();
        refs.refToPosition.setValue();
        refs.refStartTime.setValue();
        refs.refEndTime.setValue();
        refs.refStoppageReason.setValue();
    },

    onUpperCase: function (control) {
        control.setValue(control.getValue().toUpperCase());
    },

    onCheckDateTimeValid: function (startDate, endDate) {
        var me = this,
            date1 = me.lookupReference(startDate).getValue(),
            date2 = me.lookupReference(endDate).getValue();

        if (date1 != null && date2 != null && date1 > date2) {
            me.lookupReference(endDate).setValue('');
            MessageUtil.warning('Warning', 'warningshifttimeinput');
            return;
        }

    },

    getSearchCondition: function () {
        var me = this,
            refs = me.getReferences()
            params = {},
            startTime = refs.refStartTimeSearch.getValue(),
            endTime = refs.refEndTimeSearch.getValue();


        if (startTime != '' && startTime != null) {
            startTime = Ext.Date.format(new Date(startTime), MOST.config.Locale.getDefaultDateFormatWithNoSeconds())
        }

        if (endTime != '' && endTime != null) {
            endTime = Ext.Date.format(new Date(endTime), MOST.config.Locale.getDefaultDateFormatWithNoSeconds())
        }

        params['startTime'] = startTime;
        params['endTime'] = endTime;

        return params;
    },

    /**
     * GENERAL METHOD END
     * =========================================================================================================================
     */



});
