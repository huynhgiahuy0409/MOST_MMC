Ext.define('MOST.view.configuration.ServiceOrderSettingController', {
    extend: 'MOST.view.foundation.BaseViewController',
    alias: 'controller.serviceordersetting',

    requires: [],

    /**
     * =========================================================================================================================
     * CONSTANT START
     */

    COMBO_ALL_OPTION: {
        scd: '',
        scdNm: 'All'
    },

    detailMode: '',
    isInitializing: false,
    isCategoryFieldsetValid: false,
    isDatesFieldsetValid: false,
    isUnitsFieldsetValid: false,
    isEtcFieldsetValid: false,
    
    SNBL_LIST_STORE:'SNBLGridList',
    
    DOCUMENT_TYPE_STORE: 'documentTypeComboStore',
    DATE_FORMAT_STORE: 'dateFormatComboStore',
    
    /**
     * CONSTANT END
     * =========================================================================================================================
     * =========================================================================================================================
     * INITIALIZE START
     */

    // After Renderer Event
    onLoad: function () {
        var me = this;
        var paymentMethodComboStore = me.getStore('paymentMethodComboStore');
        var processTypeComboStore = me.getStore('processTypeComboStore');
        var category1ComboStore = me.getStore('category1ComboStore');
        
        paymentMethodComboStore.load();
        paymentMethodComboStore.commitChanges();
        
        processTypeComboStore.load();
        processTypeComboStore.commitChanges();

        category1ComboStore.load();
        category1ComboStore.commitChanges();
    },

    /**
     * INITIALIZE END
     * =========================================================================================================================
     * =========================================================================================================================
     * EVENT HANDLER START
     */
    onCategoryChange: function (combo, newValue, oldValue, eOpts) {
        var me = this;
        var filterRegex = /(filter)/gi;
        var detailRegex = /(detail)/gi;

        me.removeComboData(combo.getReference());

        if (newValue !== null && newValue !== '') {

            if (combo.getReference().match(filterRegex)) {
                me.loadCategoryStore(combo, newValue);

            } else if (combo.getReference().match(detailRegex)) {
                me.loadCategoryDetailStore(combo, newValue);
            }
        }
    },

    loadCategoryStore: function (combo, newValue) {
        var me = this;
        var origStoreNm, scdLgv;
        
        if (combo.getReference() === 'refCategory1FilterCombo') {
            origStoreNm = 'category2ComboStore';
            scdLgv = newValue;
        } else if (combo.getReference() === 'refCategory2FilterCombo') {
            origStoreNm = 'category3ComboStore';
            scdLgv = newValue;
        } else {
            return;
        }

        me.loadComboStore(origStoreNm, scdLgv,
            function (refs) {
                refs.refCategory3FilterCombo.setValue('');
                if (combo.getReference() === 'refCategory1FilterCombo') {
                    refs.refCategory2FilterCombo.setValue('');
                }
            });
    },

    loadCategoryDetailStore: function (combo, newValue) {
        var me = this;
        var origStoreNm, scdLgv;
        
        if (combo.getReference() === 'refCategory1DetailCombo') {
            origStoreNm = 'category2ComboStore';
            scdLgv = newValue;
        } else if (combo.getReference() === 'refCategory2DetailCombo') {
            origStoreNm = 'category3ComboStore';
            scdLgv = newValue;
        } else {
            return;
        }

        me.loadComboStore(origStoreNm, scdLgv,
            function (refs, serviceOrderSettingItem) {
                if (me.isInitializing) {
                    if (combo.getReference() === 'refCategory1DetailCombo') {
                        var category2 = (serviceOrderSettingItem.category2) ? serviceOrderSettingItem.category2 : '';
                        refs.refCategory2DetailCombo.setValue(category2);
                    } else if (combo.getReference() === 'refCategory2DetailCombo') {
                        var category3 = (serviceOrderSettingItem.category3) ? serviceOrderSettingItem.category3 : '';
                        refs.refCategory3DetailCombo.setValue(category3);
                        me.isInitializing = false;
                    }
                } else {
                    refs.refCategory3DetailCombo.setValue('');
                    if (combo.getReference() === 'refCategory1DetailCombo') {
                        refs.refCategory2DetailCombo.setValue('');
                    }
                }
            });
    },

    onSearch: function () {
        var me = this;
        var refs = me.getReferences();
        var serviceOrderConfListStore = me.getStore('serviceOrderSettingListStore');
        
        serviceOrderConfListStore.load({
            params: me.getFilterValues()
        });
    },

    onRefresh: function () {
        var me = this;
        
        me.clearFilterValues();
        me.onSearch();
    },

    onAdd: function () {
        var me = this;
        var record = Ext.create('MOST.model.configuration.ServiceOrderSetting');
        
        record.set('workingStatus', WorkingStatus.INSERT);
        me.openServiceOrderSettingDetailPopup(record);
    },

    onFilterProcessTypeChanged: function (combo, newValue, oldValue, eOpts) {
        var me = this;
        me.getViewModel().setData({'filterProcessType': combo.getSelection().data});
    },

    onGridItemDoubleClick: function (grid, record, item, index, e, eOpts) {
        var me = this;
        var recordCopy = record.clone();
        
        recordCopy.set('workingStatus', WorkingStatus.UPDATE);
        me.openServiceOrderSettingDetailPopup(recordCopy);
    },

    getSnComboItems: function(){
		var me = this;
		var refs = me.getReferences();
		var snCombo = me.getStore('SNNoList');
		
		snCombo.load({
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						snCombo.insert(0, [{cdNm: 'Select',cd: ''}]);
					}
				}
			}
		});
	},
    
	getBlComboItems: function(){
		var me = this;
		var refs = me.getReferences();
		var blCombo = me.getStore('BLNoList');
		
		blCombo.load({
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						blCombo.insert(0, [{cdNm: 'Select',cd: ''}]);
					}
				}
			}
		});
	},
	
    /**
     * EVENT HANDLER END
     * =========================================================================================================================
     * =========================================================================================================================
     * GENERAL METHOD START
     */

    loadComboStore: function (storeNm, scdLgv, callback) {
        var me = this;
        var refs = me.getReferences();
        var sourceStore = me.getStore(storeNm);
        var serviceOrderSettingItem = me.getViewModel().getData().serviceOrderSettingItem;

        sourceStore.load({
            params: {
                scdLgv: scdLgv
            },

            callback: function (records, operation, success) {
                if (success) {
                    if (callback) {
                        callback(refs, serviceOrderSettingItem);
                    }
                }
            }
        });
    },

    removeComboData: function (reference) {
        var me = this;
        var filterRegex = /(filter)/gi;
        var detailRegex = /(detail)/gi;
        
        if (reference.match(filterRegex)) {
            me.removeFilterCategoryCombo(reference);
        } else if (reference.match(detailRegex)) {
            me.removeDetailCategoryCombo(reference);
        }
    },

    removeFilterCategoryCombo: function (reference) {
        var me = this;
        var refs = me.getReferences();
        
        refs.refCategory3FilterCombo.getStore().removeAll();
        refs.refCategory3FilterCombo.getStore().add(me.COMBO_ALL_OPTION);
        refs.refCategory3FilterCombo.setValue('');

        if (reference === 'refCategory1FilterCombo') {
            refs.refCategory2FilterCombo.getStore().removeAll();
            refs.refCategory2FilterCombo.getStore().add(me.COMBO_ALL_OPTION);
            refs.refCategory2FilterCombo.setValue('');
        }
    },

    removeDetailCategoryCombo: function (reference) {
        var me = this;
        var refs = me.getReferences();
        
        refs.refCategory3DetailCombo.getStore().removeAll();
        
        if (reference === 'refCategory1DetailCombo') {
            refs.refCategory2DetailCombo.getStore().removeAll();
        }
    },

    getFilterValues: function () {
        var me = this;
        var refs = me.getReferences();
        var params = {};

        params.category1 = refs.refCategory1FilterCombo.getValue();
        params.category2 = refs.refCategory2FilterCombo.getValue();
        params.category3 = refs.refCategory3FilterCombo.getValue();
        params.payTpCd = refs.refPaymentMethodFilterCombo.getValue();
        params.prcTpCd = refs.refProcessTypeFilterCombo.getValue();

        return params;
    },

    clearFilterValues: function () {
        var me = this;
        var refs = me.getReferences();
        
        refs.refCategory1FilterCombo.setValue('');
        refs.refCategory2FilterCombo.setValue('');
        refs.refCategory3FilterCombo.setValue('');
        refs.refPaymentMethodFilterCombo.setValue('');
        refs.refProcessTypeFilterCombo.setValue('');
    },

    openServiceOrderSettingDetailPopup: function (record) {
        var me = this;
        me.openDetailPopup(record, 'Service Order Configuration Detail');
    },

    /**
     * GENERAL METHOD END
     * =========================================================================================================================
     * =========================================================================================================================
     * DETAIL START
     */

    // Detail initialization
    onLoadDetail: function () {
        var me = this;
        var isInit = false;
        var refs = me.getReferences();
        var recvData = me.getDetailBizView().items.get(0).recvData;
        var blSN = recvData.data.documentNm.substring(0,2);
        
        if(blSN == 'BL') {
        	recvData.set('documentNm', recvData.data.documentNm.substring(2));
        }else if(blSN == 'SN') {
        	recvData.set('documentNm', recvData.data.documentNm.substring(2));
        }
        
        me.getViewModel().setData({serviceOrderSettingItem: recvData.getData()});

        if (recvData.get('workingStatus') === WorkingStatus.INSERT) {
            me.initializeForCreateDetail();
            isInit = true;
        } else {
            me.initializeForUpdateDetail(recvData);
        }
        
        me.setComboBoxWithLocalCache(CacheServiceConstants.DOCUMENT_TYPE, me.DOCUMENT_TYPE_STORE);
        me.setComboBoxWithLocalCache(CacheServiceConstants.DATE_FORMAT_COMBOBOX, me.DATE_FORMAT_STORE);
        
        me.toggleToolButtons(isInit);
        me.initializeComboStores(isInit);
    },

    toggleToolButtons: function (isInit) {
        var me = this;
        me.visibleDetailToolButton(ViewUtil.TOOL_DELETE, !isInit);
        me.visibleDetailToolButton(ViewUtil.TOOL_SAVE, true);
    },

    initializeComboStores: function (isInit) {
        var me = this;
        var refs = me.getReferences();
        var unit1ComboStore = me.getStore('unit1ComboStore');
        var unit2ComboStore = me.getStore('unit2ComboStore');
        var unit3ComboStore = me.getStore('unit3ComboStore');
        
        unit1ComboStore.load();
        unit2ComboStore.load();
        unit3ComboStore.load();
        
        me.loadUomStore(refs, isInit);
    },

    loadUomStore: function (refs, isInit) {
        var me = this;
        var uomStore = me.getStore('unitUomComboStore');

        uomStore.load({
            params: {
                lcd: CodeConstants.LCD_MOST,
                mcd: CodeConstants.MCD_MT_UOMTP
            },
            callback: function (records, operation, success) {
                if (success) {
                    if (isInit) {
//                        me.initUomValue(refs);
                        me.initDateFmtValue(refs);
                        me.initCashValue(refs);
                        me.initProcessValue(refs);
                    }
                }
            }
        });
    },

    initUomValue: function (refs) {
        var me = this;
        var uomStore = me.getStore('unitUomComboStore');
        
        refs.refUnitUomCombo.setValue(uomStore.getAt(0).get('scd'));
        refs.refUnit1UomCombo.setValue(uomStore.getAt(0).get('scd'));
        refs.refUnit2UomCombo.setValue(uomStore.getAt(0).get('scd'));
    },

    initDateFmtValue: function (refs) {
        var me = this;
        var value = me.getStore('dateFormatComboStore').getAt(0).get('scd');
        
        refs.refSvcDtFmtCombo.setValue(value);
        refs.refDt1FmtCombo.setValue(value);
        refs.refDt2FmtCombo.setValue(value);
    },

    initCashValue: function (refs) {
        var me = this;
        var value = me.getStore('paymentMethodComboStore').getAt(0).get('scd');
        
        refs.refPaymentTpCombo.setValue(value);
    },

    initProcessValue: function (refs) {
        var me = this;
        var value = me.getStore('processTypeComboStore').getAt(0).get('scd');
        
        refs.refProcessTpCombo.setValue(value);
    },

    initializeForCreateDetail: function () {
        var me = this;
        me.detailMode = WorkingStatus.INSERT;
    },

    initializeForUpdateDetail: function (recvData) {
        var me = this;

        me.isInitializing = true;
        me.detailMode = WorkingStatus.UPDATE;
        me.lookupReference('refCategory1DetailCombo').setDisabled(true);
        me.loadServiceOrderDetailItem(recvData.get('category1'), recvData.get('seq'));
    },

    loadServiceOrderDetailItem: function (category1, seq) {
        var me = this;
        var detailItemStore = me.getStore('serviceOrderSettingDetailStore');

        detailItemStore.load({
            params: {
                category1: category1,
                seq: seq
            },
            callback: function (records, operation, success) {
                if (success) {
                    var record = records[0].getData();
                    
                    record.workingStatus = WorkingStatus.UPDATE;
                    me.getViewModel().getData().serviceOrderSettingItem = record;
                    me.setCheckboxCheck(record);
                }
            }
        });
    },

    onCheckboxChanged: function (checkbox, newValue, oldValue, eOpts) {
        var me = this;
        var fieldNm = checkbox.getName();
        var refs = me.getReferences();
        var model = me.getViewModel().getData().serviceOrderSettingItem;
        
        if (newValue) {
            model[fieldNm] = 'Y';
            refs.refDocumentTpCombo.setDisabled(false);
        } else {
            model[fieldNm] = 'N';
            refs.refDocumentTpCombo.setDisabled(true);
        }
    },

    setCheckboxCheck: function (record) {
        var chkBoxArr = Ext.ComponentQuery.query('[xtype="checkboxfield"]');

        Ext.Array.each(chkBoxArr, function (chkBox) {
            var fieldNm = chkBox.getName();
            
            if (record[fieldNm] === 'Y') {
                chkBox.setValue(true);
            } else {
                chkBox.setValue(false);
            }
        });
    },

    onDetailProcessTpChange: function (combo, newValue, oldValue, eOpts) {
        var me = this;
        var record = combo.getSelectedRecord();
        me.lookupReference('refProcessTypeDetailDesc').setValue(record.get('scdDesc'));
    },

    // Detail manipulation
    onDetailSave: function () {
        var me = this;
        var validObj = me.validateServiceOrderSettingData();
        var refs = me.getReferences();
        
        if (!validObj.valid) {
            MessageUtil.warning('Warning', validObj.msg);
            return;
        }

        var detailStore =  me.getStore('serviceOrderSettingDetailStore');
        var settingItem = me.getViewModel().getData().serviceOrderSettingItem;
        
        if(refs.refChkDocument.getValue()){
        	settingItem.documentChk ='Y';
        }else{
        	settingItem.documentChk = 'N';
        }
        
        if(refs.refChkUnit.getValue()){
        	settingItem.unitChk = 'Y';
        }else{
        	settingItem.unitChk = 'N';
        }
        
        settingItem.documentNm = settingItem.documentTp + settingItem.documentNm;
        
        if(me.detailMode === WorkingStatus.INSERT){
            me.insertServiceOrderSettingItem(detailStore, settingItem);
        } else {
            me.updateServiceOrderSettingItem(detailStore, settingItem);
        }

        me.synchronizeDetailStore(detailStore);
    },

    insertServiceOrderSettingItem: function (detailStore, settingItem) {
        var me = this;
        var recvData = me.getDetailBizView().items.get(0).recvData;
        
        recvData.set(settingItem);
        detailStore.add(recvData);
    },

    updateServiceOrderSettingItem: function (detailStore, settingItem) {
        detailStore.each(function (data) {
            if (data.get('category1') === settingItem.category1 && data.get('seq') === settingItem.seq) {
                data.set(settingItem);
                return;
            }
        });
    },

    synchronizeDetailStore: function (detailStore) {
        var me = this;
        
        detailStore.sync({
            success: function (batch, options) {
                me.onTransactionSuccess();
            },
            failure: function (batch, options) {
                MessageUtil.error();
            }
        });
    },

    onDetailRemove: function () {
        var me = this;
        var store = me.getStore('serviceOrderSettingDetailStore');
        var recvData = me.getDetailBizView().items.get(0).recvData;

        MessageUtil.question('confirm', 'adr_msg_delete_record',null,
            function(button){
                if (button === 'ok') {
                    store.each(function(data){
                        if(data.get('category1') === recvData.get('category1')
                            && data.get('seq') === recvData.get('seq')){
                            store.remove(data);
                            return;
                        }
                    });

                    store.sync({
                        callback:function(records,success){
                            if(success){
                               me.onTransactionSuccess();
                            }
                        }
                    });
                }
            });
    },

    onTransactionSuccess: function(){
        var me = this;
        var detailView = me.getDetailBizView();
        
        MessageUtil.saveSuccess();
        me.getDetailBizView().items.get(0).recvData = null;
        detailView.close();
        me.onSearch();
    },

    validateServiceOrderSettingData: function () {
        var me = this;
        var validObj = {};
        var valid = true;
        var msgArr = new Array();
        var msg = '';

        if (!me.onMandantoryFieldsCheck().valid) {
            valid = false;
            msgArr.push(MOST.getApplication().bundle.getMsg('soc_msg_fillUpReqFields'));
            msgArr = msgArr.concat(me.onMandantoryFieldsCheck().missingFields);
            msg = msgArr.join('<br/>');
            //msg = MOST.getApplication().bundle.getMsg('soc_msg_fillUpReqFields');

        } else if (!me.validateAdditionalDates().valid) {
            valid = false;
            msgArr.push(MOST.getApplication().bundle.getMsg('soc_msg_fillUpReqDateFields'));
            msgArr = msgArr.concat(me.validateAdditionalDates().missingFields);
            msg = msgArr.join('<br/>');

        } else if (!me.validateAdditionalUnits().valid) {
            valid = false;
            msgArr.push(MOST.getApplication().bundle.getMsg('soc_msg_fillUpReqUnitFields'));
            msgArr = msgArr.concat(me.validateAdditionalUnits().missingFields);
            msg = msgArr.join('<br/>');
        }

        validObj.valid = valid
        validObj.msg = msg;

        return validObj;
    },
    
    onMandantoryFieldsCheck: function () {
        var me = this;
        var valid = true;
        var missingFields = new Array();

        if (me.lookupReference('refCategory1DetailCombo').getValue() === '') {
            valid = false;
            missingFields.push(MOST.getApplication().bundle.getMsg('soc_cat1'));
        }

        if (me.lookupReference('refSvcDtFmtCombo').getValue() === '') {
            valid = false;
            missingFields.push(MOST.getApplication().bundle.getMsg('soc_svcDtFmt'));
        }
        
//        if (me.lookupReference('refUnitTtlTxtFld').getValue() === '') {
//            valid = false;
//            missingFields.push(MOST.getApplication().bundle.getMsg('soc_unitTit'));
//        }

        return {valid: valid, missingFields: missingFields};
    },

    onCategoryFieldsetValidityChange: function (fieldset, field, isValid, eOpts) {
        var me = this;
        
        if(me.lookupReference('refCategory1DetailCombo').getValue() === ''){
            isValid = false;
        }
        
        me.isCategoryFieldsetValid = isValid;
    },

    onDatesFieldsetValidityChange: function (fieldset, field, isValid, eOpts) {
        var me = this;
        
        if(me.lookupReference('refSvcDtFmtCombo').getValue() === ''){
            isValid = false;
        }
        
        me.isDatesFieldsetValid = isValid;
    },

    onUnitsFieldsetValidityChange: function (fieldset, field, isValid, eOpts) {
        var me = this;
        
        if(me.lookupReference('refUnitTtlTxtFld').getValue() === ''){
            isValid = false;
        }
        
        me.isUnitsFieldsetValid = isValid;
    },

    onEtcFieldsetValidityChange: function (fieldset, field, isValid, eOpts) {
        var me = this;
        me.isEtcFieldsetValid = isValid;
    },

    validateAdditionalDates: function () {
        var me = this;
        var refs = me.getReferences();
        var valid = true;
        var missingFields = new Array();

        if (refs.refDt1ChkBox.getValue() && (refs.refDt1TtlTxtFld.getValue() === null || refs.refDt1TtlTxtFld.getValue() === '')) {
            valid = false;
            missingFields.push(MOST.getApplication().bundle.getMsg('soc_dt1Ttl'));
        }

        if (refs.refDt2ChkBox.getValue() && (refs.refDt2TtlTxtFld.getValue() === null || refs.refDt2TtlTxtFld.getValue() === '')) {
            valid = false;
            missingFields.push(MOST.getApplication().bundle.getMsg('soc_dt2Ttl'));
        }

        return {valid: valid, missingFields: missingFields};
    },

    validateAdditionalUnits: function () {
        var me = this;
        var refs = me.getReferences();
        var valid = true;
        var missingFields = new Array();

        if (refs.refUnit1ChkBox.getValue()
            && (refs.refUnit1TtlTxtFld.getValue() === null || refs.refUnit1TtlTxtFld.getValue() === '')) {
            valid = false;
            missingFields.push(MOST.getApplication().bundle.getMsg('soc_unit1Tit'));
        }

        if (refs.refUnit2ChkBox.getValue()
            && (refs.refUnit2TtlTxtFld.getValue() === null || refs.refUnit2TtlTxtFld.getValue() === '')) {
            valid = false;
            missingFields.push(MOST.getApplication().bundle.getMsg('soc_unit2Tit'));
        }

        return {valid: valid, missingFields: missingFields};
    },

    onDestroyView: function () {
        var me = this;

        me.detailMode = null;
        me.isInitializing = null;
        me.isCategoryFieldsetValid = false;
        me.isDatesFieldsetValid = false;
        me.isUnitsFieldsetValid = false;
        me.isEtcFieldsetValid = false;

        me.getStore('category2ComboStore').removeAll();
        me.getStore('category3ComboStore').removeAll();
        me.getStore('serviceOrderSettingDetailStore').removeAll();
        me.getViewModel().setData({
            serviceOrderSettingItem: null
        });
    },
    
    onSelectUnit: function(combo, newValue, oldValue, eOpts){
    	var me = this;
    	var refs = me.getReferences();
    	var serviceOrderSettingItem = me.getViewModel().get('serviceOrderSettingItem');

    	if(combo.getReference() == 'refUnit1UomCombo'){
    		if(newValue){
    			serviceOrderSettingItem.unit1Chk = 'Y';
    		} else {
    			serviceOrderSettingItem.unit1Chk = 'N';
    		}
    	} else {
    		if(newValue){
    			serviceOrderSettingItem.unit2Chk = 'Y';
    		} else {
    			serviceOrderSettingItem.unit2Chk = 'N';
    		}
    	}
    }

    /**
     * DETAIL END
     * =========================================================================================================================
     */
});