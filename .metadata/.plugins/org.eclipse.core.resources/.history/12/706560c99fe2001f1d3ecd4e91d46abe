Ext.define('MOST.view.operation.ServiceOrderController', {
    extend: 'MOST.view.foundation.BaseViewController',

    requires: [],

    alias: 'controller.serviceorder',

    /**
     * =========================================================================================================================
     * CONSTANT START
     */

    SUBMIT_TYPE_SUTMIT: 'SU',
    SUBMIT_TYPE_RESUBMIT: 'RSU',
    SUBMIT_TYPE_APPROVE: 'AP',
    SUBMIT_TYPE_REJECT: 'RJ',
    SUBMIT_TYPE_CANCEL: 'CA',
    SUBMIT_TYPE_COMPLETION: 'CP',

    COMBO_ALL_OPTION: {
        shftId: '',
        shftNm: 'All',
        scd: '',
        scdNm: 'All'
    },

    MAX_PERIOD_DAY : 30,
    NON_CALL_ID : 'STRG',

    /**
     * CONSTANT END
     * =========================================================================================================================
     */

    /**
     * =========================================================================================================================
     * INITIALIZE START
     */

    // After Renderer Event
    onLoad: function () {
        var me = this;
		var searchParm = Ext.create('MOST.model.operation.SearchServiceOrderParm');
		
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
        me.loadFilterStores();
        me.initializeDates();
    },

    loadFilterStores: function(){
        var me = this;
        var refs = me.getReferences();
        
        me.initializeFilterStores();

        me.loadFilterComboStore('category1FilterComboStore', CodeConstants.MCD_MT_SVCORDCTG1, null,
            function (refs) {
                refs.refCategory1FilterCombo.setValue('');
            });

        me.loadFilterComboStore('statusFilterComboStore', CodeConstants.MCD_MT_ODRSTAT, null,
            function (refs) {
                refs.refStatFilterCombo.setValue('');
            });

        me.getStore('shiftFilterComboStore').load({
            callback: function(records, operation, success){
                if(success){
                    me.getStore('shiftFilterComboStore').insert(0, me.COMBO_ALL_OPTION);
                    refs.refShiftFilterCombo.setValue('');
                }
            }
        })
    },

    initializeFilterStores: function () {
        var me = this;
        
        me.getStore('category1FilterComboStore').insert(0, me.COMBO_ALL_OPTION);
        me.getStore('shiftFilterComboStore').insert(0, me.COMBO_ALL_OPTION);
        me.getStore('statusFilterComboStore').insert(0, me.COMBO_ALL_OPTION);
    },

    initializeDates: function(){
        var me = this;
        
        me.setDateInDaysByDate('refSvcDtFm', -me.MAX_PERIOD_DAY, new Date());
        me.setDateInDaysByDate('refSvcDtTo', 0, new Date());
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
        var me = this;
        var serviceOrderConfListStore = me.getStore('serviceOrderListStore');
        
        serviceOrderConfListStore.load({
            params: me.getSearchCondition(),
            callback: function (records, operation, success) {
                if (success) {
                }
            }
        });
    },

    onRefresh: function () {
        var me = this;
        
        me.clearFilterValues();
        me.initializeDates();
        me.onSearch();
    },

    onAdd: function (){
        var me = this;
        
        me.getViewModel().setData({serviceOrderSettingItem : null});
        me.openCodePopup('popup-serviceordersetting', 'refServiceOrderSettingAddItem', {});
    },

    onGridProcessBtnAction: function(btn){
        var me = this;
        var grid = me.lookupReference('refServiceOrderConfGrid');
        var submitType = btn.type;
        var selArr = grid.getSelection();
        var validObj = me.getProcessInvalidItems(selArr);

        if(selArr == null || selArr == ''){
        	MessageUtil.warning('Warning', 'Please select data');
        	return;
        }
        
        if(!validObj.valid){
            var msg = validObj.odrArr.join('<br/>');
            MessageUtil.warning('Warning', msg);
            return;
        }

        me.updateServiceOrderItemsStatus(selArr, submitType);
    },

    getProcessInvalidItems: function(selArr){
        var me = this;
        var valid = true;
        var odrArr = [];
        
        odrArr.push(MOST.getApplication().bundle.getMsg('so_msg_sel_data_has_CP_CA'))

        Ext.Array.each(selArr, function(item){
            if(item.get('statCd') === me.SUBMIT_TYPE_COMPLETION || item.get('statCd') === me.SUBMIT_TYPE_CANCEL){
                odrArr.push(item.get('odrNo'));
                valid = false;
            }
        });
        
        return {valid : valid, odrArr : odrArr};
    },

    updateServiceOrderItemsStatus: function(selArr, submitType){
        var me = this;
        var serviceOrderProcessStore = me.getStore('serviceOrderProcessStore');
        var serviceOrderItem = Ext.create('MOST.model.operation.ServiceOrder');
        var arr = new Array();

        serviceOrderProcessStore.add(serviceOrderItem);
        serviceOrderItem.set({ processItemList : [], workingStatus: WorkingStatus.UPDATE, apprvBy: selArr[0].getData.apprvBy, apprvDt: selArr[0].getData().apprvDt});
        //OLD: serviceOrderItem.set({ processItemList : [], workingStatus: WorkingStatus.UPDATE});
        serviceOrderItem.crudState = WorkingStatus.UPDATE;
        serviceOrderItem.phantom = false;

        Ext.Array.each(selArr, function(item){
            item.set({
                statCd : submitType,
                workingStatus: WorkingStatus.UPDATE
            });
            
            arr.push(item.data)
        });
        
        serviceOrderItem.set("items", arr);

        serviceOrderProcessStore.sync({
            success: function(batch, options){
                MessageUtil.saveSuccess();
            },
            failure: function(batch, options){
                MessageUtil.error();
            },
            callback: function(batch, options){
                serviceOrderProcessStore.removeAll();
                serviceOrderProcessStore.clearData();
                me.onSearch();
            }
        });
    },

    onCategoryChange: function (combo, newValue, oldValue, eOpts) {
        var me = this;
        var filterRegex = /(filter)/gi;

        me.removeComboData(combo.getReference());

        if (newValue !== null && newValue !== '') {
            if (combo.getReference().match(filterRegex)) {
                me.loadCategoryFilterStore(combo, newValue);
            }
        }
    },

    loadCategoryFilterStore: function (combo, newValue) {
        var me = this;
        var filterStoreNm, mcd, scdLgv;
        
        if (combo.getReference() === 'refCategory1FilterCombo') {
            filterStoreNm = 'category2FilterComboStore';
            mcd = me.CODE_SEARCH_M_CD_CAT2;
            scdLgv = newValue;

        } else if (combo.getReference() === 'refCategory2FilterCombo') {
            filterStoreNm = 'category3FilterComboStore';
            mcd = me.CODE_SEARCH_M_CD_CAT3;
            scdLgv = newValue;
        } else {
            return;
        }

        me.loadFilterComboStore(filterStoreNm, mcd, scdLgv,
            function (refs) {
                refs.refCategory3FilterCombo.setValue('');
                if (combo.getReference() === 'refCategory1FilterCombo') {
                    refs.refCategory2FilterCombo.setValue('');
                }
            });
    },

    onDateChange:function( control, newValue, oldValue, eOpts ) {
        var me = this;
        var refs = me.getReferences();

        if(control == refs.refSvcDtFm && newValue !== control.getValue()){
            me.setDateInDaysByDate('refSvcDtTo', me.MAX_PERIOD_DAY, control.getValue());
        } else if(control == refs.refSvcDtTo && newValue !== control.getValue()) {
            me.setDateInDaysByDate('refSvcDtFm', -me.MAX_PERIOD_DAY, control.getValue());
        }
    },

    afterSetCodePopupData:function(xtype, targetControl, returnValue){
        var me = this;
        var refs = me.getReferences();
        
        if (xtype === 'popup-serviceordersetting'){
            me.getViewModel().setData({serviceOrderSettingItem : returnValue});
            me.openServiceOrderDetailPopup();
        } else if (xtype === 'popup-vesselcalllistpopup' && returnValue !== null) {
        	if(returnValue){
        		if(targetControl === 'refServiceOrderVslCallIdField' || targetControl === 'refServiceOrderVslCallId' || targetControl === 'refServiceOrderVslCallIdFieldDt'){
        		//OLD: if(targetControl === 'refServiceOrderVslCallIdFieldDt' || targetControl === 'refServiceOrderVslCallId'){
        			me.getViewModel().setData({serviceOrderVesselItem : returnValue.item.getData()});
        			
        			var serviceOrderItem = me.getViewModel().getData()['serviceOrderVesselItem'];
        			//OLD var serviceOrderItem = me.getViewModel().get('serviceOrderItem');
            		me.getBlComboItems();
        			me.getSnComboItems();
        		}
            }else{
            	me.getViewModel().setData({serviceOrderVesselItem:null});
        	}
        } else if (xtype === 'popup-partnercdpopup') {
            me.lookupReference('refPtnrNm').setValue(returnValue.item.get('ptnrName'));
        } else if (xtype === 'popup-cmmcdpopup') {
        	if(targetControl === 'refReqCmdtCd'){
        		me.lookupReference('refReqCmdtNm').setValue(returnValue.item.get('codeName'));
        	} else if(targetControl === 'refCompCmdtCd'){
        		me.lookupReference('refCompCmdtNm').setValue(returnValue.item.get('codeName'));
        	}
        }
    },

    getSnComboItems: function(){
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('serviceOrderVesselItem');
		
		if(theVslInfo){
			var snCombo = me.getStore('SNNoList');
			
			snCombo.load({
				params : {
					vslCallId:theVslInfo.vslCallId
				},
				callback: function(records, operation, success) {
					if (success) {
						if(records.length > 0){
							snCombo.insert(0, [{cdNm: 'Select',cd: ''}]);
						}
					}
				}
			});
		}
	},
	
	getBlComboItems: function(){
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('serviceOrderVesselItem');
		
		if(theVslInfo){
			var blCombo = me.getStore('BLNoList');
			blCombo.load({
				params : {
					vslCallId:theVslInfo.vslCallId
				},
				callback: function(records, operation, success) {
					if (success) {
						if(records.length > 0){
							blCombo.insert(0, [{cdNm: 'Select',cd: ''}]);
						}
					}
				}
			});
		}
	},
	
    onGridItemDoubleClick: function(grid, record, item, index, e, eOpts){
        var me = this;
        
        record.set({workingStatus : WorkingStatus.UPDATE});
        record.crud = WorkingStatus.UPDATE;
        me.openServiceOrderDetailPopup(record);
    },

    onGridItemSelect: function(grid, record, eOpts){
        var me = this;
        
        if(grid.getSelection().length > 0) {
            me.getViewModel().setData({selectedServiceOrderItem: grid.getSelection()[0].data});
        }
    },

    onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var refs = me.getReferences();
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.operation.SearchServiceOrderParm';
		searchBizParm.serviceID = 'MOST.serviceOrder.selectServiceOrderList'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
    /**
     * EVENT HANDLER END
     * =========================================================================================================================
     */

    /**
     * =========================================================================================================================
     * GENERAL METHOD START
     */

    loadFilterComboStore: function (filterStoreNm, mcd, scdLgv, callback) {
        var me = this;
        var refs = me.getReferences();
        var filterStore = me.getStore(filterStoreNm);

        filterStore.load({
            params: {
                scdLgv: scdLgv
            },
            callback: function (records, operation, success) {
                if (success) {
                    if (filterStore) {
                        filterStore.insert(0, me.COMBO_ALL_OPTION);
                    }

                    if (callback) {
                        callback(refs);
                    }
                }
            }
        });
    },

    removeComboData: function (reference) {
        var me = this;
        var filterRegex = /(filter)/gi;
        
        if (reference.match(filterRegex)) {
            me.removeFilterCategoryCombo(reference);
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

    getSearchCondition: function () {
        var me = this;
        var refs = me.getReferences();
        var searchParm = me.getViewModel().get('theSearch');
        var params = me.createParam(searchParm);

        params.category1 = refs.refCategory1FilterCombo.getValue();
        params.category2 = refs.refCategory2FilterCombo.getValue();
        params.category3 = refs.refCategory3FilterCombo.getValue();
        params.svcDtFm = Ext.Date.format(refs.refSvcDtFm.getValue(), MOST.config.Locale.getShortDate());
        params.svcDtTo = Ext.Date.format(refs.refSvcDtTo.getValue(), MOST.config.Locale.getShortDate());
        params.userId = MOST.config.Token.getUserId();

        return params;
    },

    clearFilterValues: function () {
        var me = this;
        var refs = me.getReferences();

        refs.refShiftFilterCombo.setValue('');
        refs.refStatFilterCombo.setValue('');
        refs.refCategory1FilterCombo.setValue('');
        refs.refCategory2FilterCombo.setValue('');
        refs.refCategory3FilterCombo.setValue('');
    },

    openServiceOrderDetailPopup: function(record){
        var me = this;
        
        if(!record){
            record = me.createServiceOrderItem();
            Ext.Object.merge(record.data, me.getViewModel().getData().serviceOrderSettingItem);
            record.set('workingStatus', WorkingStatus.INSERT);
        }
        
        me.openDetailPopup(record, 'Service Order Detail', true, true);
    },

    createServiceOrderItem: function(){
        return Ext.create('MOST.model.operation.ServiceOrder');
    },

    /**
     * GENERAL METHOD END
     * =========================================================================================================================
     */

    /**
     * =========================================================================================================================
     * DETAIL START
     */

    onDetailLoad: function(){
        var me = this;
        var recvData = me.getDetailBizView().items.get(0).recvData;
        var refs = me.getReferences();
        var SNBLNoItemsStore = me.getStore('SNBLGridList');
        var SNBLCompletionStore = me.getStore('SNBLCompletionGridList');
        var BLNoStore = me.getStore('BLNoList');
        var SNNoStore = me.getStore('SNNoList');
        var theSearch = me.getViewModel().get('theSearch');
        
        SNBLNoItemsStore.data.removeAll();
        SNBLNoItemsStore.commitChanges();
        SNBLCompletionStore.data.removeAll();
        SNBLCompletionStore.commitChanges();
        SNNoStore.data.removeAll();
        SNNoStore.commitChanges();
        BLNoStore.data.removeAll();
        BLNoStore.commitChanges();
        
        if(recvData.get('vslCallId') == 'STRG'){      	
        	refs.refServiceOrderVslCd.setValue('STRG');
        	refs.refServiceOrderVslNm.setValue('Storage Vessel');
        	refs.refServiceOrderVoyage.setValue('/');
        }
        
        if(recvData.get('documentTp') == 'BL' || recvData.get('dt1Tit') == 'BL'){
        	// 4th Layer
        	refs.refSearchBlno.setHidden(false);		// Combobox BL
        	refs.refSearchSnNo.setHidden(true);			// Combobox SN
        	
        	refs.btnSearchBLSNNo.setHidden(true);
        	
        	refs.refBtnBLCreate.setHidden(false); 		// Btn Create onAddBL
        	refs.refBtnBLDelete.setHidden(false); 		// Btn Delete onRemoveBL
        	refs.refBtnSNCreate.setHidden(true); 		// Btn Create onAddSN
        	refs.refBtnSNDelete.setHidden(true); 		// Btn Delete onRemoveSN
        	
        	refs.refBLSNListGrid.setHidden(false); 
        	
        	// 5th Layer
        	refs.refSNBLCompletionGrid.setHidden(false);
        	
        	refs.refSearchCompletionBlno.setHidden(false);
        	refs.refSearchCompletionSnNo.setHidden(true);
        	
        	refs.btnSearchCompletionBLSNNo.setHidden(true);
        	refs.refBtnCompletionCreateBL.setHidden(false);
        	refs.refBtnCompletionCreateSN.setHidden(true);
        	refs.refBtnCompletionDeleteSN.setHidden(true);
        	refs.refBtnCompletionDeleteBL.setHidden(false);
        	
        } else if(recvData.get('documentTp') == 'SN' || recvData.get('dt1Tit') == 'SN'){
        	
        	// 4th Layer
        	refs.refSearchBlno.setHidden(true);
        	refs.refSearchSnNo.setHidden(false);
        	
        	refs.btnSearchBLSNNo.setHidden(true);
        	
        	refs.refBtnBLCreate.setHidden(true); 		// Btn Create onAddBL
        	refs.refBtnBLDelete.setHidden(true); 		// Btn Delete onRemoveBL
        	refs.refBtnSNCreate.setHidden(false); 		// Btn Create onAddSN
        	refs.refBtnSNDelete.setHidden(false); 		// Btn Delete onRemoveSN
        	
        	refs.refBLSNListGrid.setHidden(false);
        	
        	// 5th Layer
        	refs.refSNBLCompletionGrid.setHidden(false);
        	
        	refs.refSearchCompletionBlno.setHidden(true);
        	refs.refSearchCompletionSnNo.setHidden(false);
        	
        	refs.btnSearchCompletionBLSNNo.setHidden(true);
        	refs.refBtnCompletionCreateBL.setHidden(true);
        	refs.refBtnCompletionCreateSN.setHidden(false);
        	refs.refBtnCompletionDeleteSN.setHidden(false);
        	refs.refBtnCompletionDeleteBL.setHidden(true);
        	
        } else {
        	
        	// 4th Layer
        	refs.refSearchBlno.setHidden(true);
        	refs.refSearchSnNo.setHidden(true);
        	refs.btnSearchBLSNNo.setHidden(true);
        	refs.refBtnBLCreate.setHidden(true); 		// Btn Create onAddBL
        	refs.refBtnBLDelete.setHidden(true); 		// Btn Delete onRemoveBL
        	refs.refBtnSNCreate.setHidden(true); 		// Btn Create onAddSN
        	refs.refBtnSNDelete.setHidden(true); 		// Btn Delete onRemoveSN
        	refs.refBLSNListGrid.setHidden(true);
        	
        	// 5th Layer
        	refs.refSNBLCompletionGrid.setHidden(true);
        	refs.refSearchCompletionBlno.setHidden(true);
        	refs.refSearchCompletionSnNo.setHidden(true);
        	
        	refs.btnSearchCompletionBLSNNo.setHidden(true);
        	refs.refBtnCompletionCreateBL.setHidden(true);
        	refs.refBtnCompletionCreateSN.setHidden(true);
        	refs.refBtnCompletionDeleteSN.setHidden(true);
        	refs.refBtnCompletionDeleteBL.setHidden(true);
        }
 
        if(recvData.get('workingStatus') === WorkingStatus.UPDATE){
        	me.loadServiceOrderDetailItem(recvData, function(recvData){
                me.loadDetailComboStores();
                me.configureToolButtons();
                me.initializeFields(recvData);
            });
        } else {
            me.loadDetailComboStores();
            me.configureToolButtons();
            me.setServiceOrderItem(recvData);
            me.initializeFields(recvData);
        }
        
        me.setFormatDateAll(recvData);
    },
    
    setFormatDateAll: function (recvData){
    	var me = this;
    	var refs = me.getReferences();
    	var serviceOrderItem = recvData.getData();
	   
    	if ((serviceOrderItem.svcDtFmt != null) && (serviceOrderItem.svcDtFmt != "")) {
    		refs.refReqSvcDtFm.format = serviceOrderItem.svcDtFmt;
    		refs.refReqSvcDtTo.format = serviceOrderItem.svcDtFmt;
    		refs.refCompSvcDtFm.format = serviceOrderItem.svcDtFmt;
    		refs.refCompSvcDtTo.format = serviceOrderItem.svcDtFmt;
    	}

    	if ((serviceOrderItem.dt1Fmt !== null) && (serviceOrderItem.dt1Fmt !=="")) {
    		refs.refReqDt1Fm.format = serviceOrderItem.dt1Fmt;
    		refs.refReqDt1To.format = serviceOrderItem.dt1Fmt;
    		refs.refCompDt1Fm.format = serviceOrderItem.dt1Fmt;
    		refs.refCompDt1To.format = serviceOrderItem.dt1Fmt;
    	}
   
    	if ((serviceOrderItem.dt2Fmt !== null) && (serviceOrderItem.dt2Fmt !=="")) {
    		refs.refReqDt2Fm.format = serviceOrderItem.dt2Fmt; 
    		refs.refReqDt2To.format = serviceOrderItem.dt2Fmt;
    		refs.refCompDt2Fm.format = serviceOrderItem.dt2Fmt;
    		refs.refCompDt2To.format = serviceOrderItem.dt2Fmt;
    	}	   
    },
    
    loadDetailComboStores: function(){
        var me = this;
        var shiftComboStore = me.getStore('shiftComboStore');
        
        shiftComboStore.load();
    },

    loadServiceOrderDetailItem: function(recvData, callback){
        var me = this;
        var store = me.getStore('serviceOrderDetailStore');

        store.load({
            params: {
                odrNo : recvData.get('odrNo')
            },
            callback: function(records, operation, success){
                if(success){
                    records[0].set('workingStatus', WorkingStatus.UPDATE);
                    me.setServiceOrderItem(records[0]);
                    
                    if(callback){
                        callback(recvData);
                    }
                }
            }
        })
    },

    configureToolButtons: function(){
        var me = this;
        var bizView = me.getDetailBizView();
        
        me.visibleDetailToolButton(ViewUtil.TOOL_DELETE, me.isUpdateDetail());
    },

    setServiceOrderItem: function(item){
        var me = this;
        me.getViewModel().setData({serviceOrderItem : item.getData()});
    },

    initializeFields: function(recvData){
        var me = this;
        var vslCallId = recvData.get('vslCallId');
        
        if(recvData.get('workingStatus') === WorkingStatus.UPDATE){
            me.setJpvcFieldOnUpdate(vslCallId);
            
            var blSNListStore = me.getStore('SNBLGridList');
            var blSNCompletionListStore = me.getStore('SNBLCompletionGridList');
            var reqRecord = Ext.create('MOST.model.operation.ServiceOrder');
            var comRecord = Ext.create('MOST.model.operation.ServiceOrder');

            blSNListStore.data.removeAll();
            blSNCompletionListStore.data.removeAll();
            
            reqRecord.set('vslCallId', recvData.get('vslCallId'));
        	reqRecord.set('blSNNo', recvData.get('reqDocNo'));
        	blSNListStore.insert(0, reqRecord);
        	
        	if(recvData.get('comUnitNo')){
            	comRecord.set('vslCallId', recvData.get('vslCallId'));
            	comRecord.set('blSNNo', recvData.get('reqDocNo'));
            	blSNCompletionListStore.insert(0, comRecord);
        	}
        	
            blSNListStore.commitChanges();
            blSNCompletionListStore.commitChanges();
        } else if (recvData.get('workingStatus') === WorkingStatus.INSERT){
            me.setJpvcFieldOnCreate();
        }
    },

    setJpvcFieldOnUpdate: function (vslCallId) {
        var me = this;
        
        if(vslCallId !== me.NON_CALL_ID){
            me.setJpvcFieldValue(vslCallId);
        } else {
            me.setNonJpvcFieldValue();
        }
    },

    setJpvcFieldValue: function(vslCallId){
        var me = this;
        var vslCallIdField = Ext.ComponentQuery.query('vesselcalllistfield[reference = "refServiceOrderVslCallId"] > ' +
            'textfield[reference = "ctlField"]')[0];
        
        me.lookupReference('refServiceOrderVslCallId').setDisabled(true);
        
        if ((vslCallIdField.getValue() === null || vslCallIdField.getValue() === "") && vslCallId !== "") {
        	vslCallIdField.setValue(vslCallId);
        }
        
        vslCallIdField.fireEvent('focusleave');
    },

    onSvcDtChange: function(picker, value){
        var me = this;
        
        if(picker.format !== 'd/m/Y'){
            me.selectServiceTimeShift(picker.reference, value);
        }
    },

    selectServiceTimeShift: function(reference, dateTime){
        var me = this;
        var shiftStore = me.getStore('shiftComboStore');
        var comboReference = (reference === 'refReqSvcDtFm')? 'refReqShift' : 'refCompShift';
        var shiftCombo = me.lookupReference(comboReference);

        shiftStore.each(function(shift){
            var dummyDt = Ext.Date.format(me.getUnixFirstDate(), 'Ymd');
            var compareDt = me.generateCompareTimeValue(dateTime);
            var shiftFmDt = Ext.Date.parse(dummyDt + shift.get('fmHhmm'), 'YmdHi');
            var shiftToDt = Ext.Date.parse(dummyDt + shift.get('toHhmm'), 'YmdHi');

            if(shiftToDt < shiftFmDt){
                shiftToDt = Ext.Date.add(shiftToDt, Ext.Date.DAY, 1);
                
                if(compareDt < shiftFmDt){
                    compareDt = Ext.Date.add(compareDt, Ext.Date.DAY, 1);
                }
            }

            if(Ext.Date.between(compareDt, shiftFmDt, shiftToDt)){
                shiftCombo.setValue(shift.get('shftId'));
            }
        });
    },

    generateCompareTimeValue: function(dateTime){
        var dummyDt = this.getUnixFirstDate();
        
        dummyDt.setHours(dateTime.getHours());
        dummyDt.setMinutes(dateTime.getMinutes());
        
        return dummyDt;
    },

    getUnixFirstDate: function(){
        return Ext.Date.parse('0000000001', 'timestamp');
    },

    setNonJpvcFieldValue: function(vslCallId){
        var me = this;
        me.lookupReference('refServiceOrderNonJpvcNo').setValue(me.NON_CALL_ID);
    },

    setJpvcFieldOnCreate: function(){
        var me = this;
        var refs = me.getReferences();
        var theSearch = me.getViewModel().get('theSearch');
        var vslCallId = theSearch.get('vslCallId');
        
        if(vslCallId !== null && vslCallId !== ""){
        	refs.refServiceOrderVslCallIdFieldDt.setValue(vslCallId);
			refs.refServiceOrderVslCallIdFieldDt.refs.ctlField.onFocusLeave();
        }
    },

    copyRequestInputToCompletionInput: function(){
        var me = this;
        var serviceOrderItem = me.getViewModel().getData().serviceOrderItem;
        var sourceFieldArr = ['cmdtyCd', 'cmdtyNm', 'chk', 'svcDtFm',
            'svcDtTo', 'dt1Fm', 'dt1To', 'dt2Fm', 'dt2To', 'shftId',
            'shftNm', 'unit', 'unit1', 'unit2', 'capaCd', 'capaDescr',
            'loc', 'reqRmk', 'locId'];

        var targetFieldArr = ['comCmdtyCd', 'comCmdtyNm', 'comChk', 'comSvcDtFm',
            'comSvcDtTo', 'comDt1Fm', 'comDt1To', 'comDt2Fm', 'comDt2To', 'comShftId',
            'comShftNm', 'comUnit', 'comUnit1', 'comUnit2', 'comCapaCd', 'comCapaDescr',
            'comLoc', 'comRmk', 'comLocId'];

        for(var i = 0; i < sourceFieldArr.length; i++){
            var sourceField = sourceFieldArr[i];
            var targetField = targetFieldArr[i];
            serviceOrderItem[targetField] = serviceOrderItem[sourceField];
        }

        me.getViewModel().setData({serviceOrderItem : serviceOrderItem});
    },

    clearCompletionInput: function(){
        var me = this;
        var serviceOrderItem = me.getViewModel().getData().serviceOrderItem;
        var targetFieldArr = ['comCmdtyCd', 'comCmdtyNm', 'comChk', 'comSvcDtFm',
            'comSvcDtTo', 'comDt1Fm', 'comDt1To', 'comDt2Fm', 'comDt2To', 'comShftId',
            'comShftNm', 'comUnit', 'comUnit1', 'comUnit2', 'comCapaCd', 'comCapaDescr',
            'comLoc', 'comRmk', 'comLocId'];

        for(var i = 0; i < targetFieldArr.length; i++){
            var targetField = targetFieldArr[i];
            
            if(typeof serviceOrderItem[targetField] === 'string'){
                serviceOrderItem[targetField] = "";
            } else if(typeof serviceOrderItem[targetField] === 'number'){
                serviceOrderItem[targetFieldArr[i]] = 0;
            }
        }

        me.getViewModel().setData({serviceOrderItem : serviceOrderItem});
    },

    onProcessBtnAction: function(btn){
        var me = this;
        var me = this;
        var store = me.getStore('serviceOrderDetailStore');
        
		var serviceOrderItem;										//TESTING ONLY
		
		const typeList = ["CP", "AP", "RJ", "RSU", "CA"];
		
		if(typeList.includes(btn.type)){											//TESTING ONLY
			serviceOrderItem = me.getViewModel().getData().serviceOrderItem;										//TESTING ONLY
		} else {
			serviceOrderItem = me.getViewModel().getData().serviceOrderVesselItem;										//TESTING ONLY
		}
		
        var serviceOrderItem2 =  me.getViewModel().getData().serviceOrderItem;										//TESTING ONLY
        
        if(serviceOrderItem2 !== null && serviceOrderItem !== null){										//TESTING ONLY
            for (var key in serviceOrderItem2) {										//TESTING ONLY
    			if(key !== null){										//TESTING ONLY
    				if ((serviceOrderItem[key] === null 
    						|| serviceOrderItem[key] === "" 
    							|| !serviceOrderItem.hasOwnProperty(key)) 
    							&& serviceOrderItem2.hasOwnProperty(key) 
    							&& (serviceOrderItem2[key] != null || serviceOrderItem2 != "") ) {										//TESTING ONLY
    	            	serviceOrderItem[key] = serviceOrderItem2[key];										//TESTING ONLY
    	            }										//TESTING ONLY
    			}										//TESTING ONLY
            }										//TESTING ONLY
        }										//TESTING ONLY

        //OLD 
        //		var serviceOrderItem =  me.getViewModel().getData().serviceOrderItem;
        
        var validObj = me.validateFormData(btn.type);

        serviceOrderItem.statCd = btn.type;
        
        var BLSNRequestListStore = me.getStore('SNBLGridList');
        var BLSNCompletionListStore = me.getStore('SNBLCompletionGridList');
        
        if(BLSNRequestListStore.data.length > 0){
        	var reqDocNo = BLSNRequestListStore.data.items[0].get('blSNNo');
        	serviceOrderItem.reqDocNo = reqDocNo;
        }
        
        if(BLSNCompletionListStore.data.length > 0){
        	var comDocNo = BLSNRequestListStore.data.items[0].get('blSNNo');
        	serviceOrderItem.comDocNo = comDocNo;
        }
        
        if(!validObj.valid){
            MessageUtil.warning('Warning', validObj.msg);
            return;
        }

        serviceOrderItem = me.formatDateFields(serviceOrderItem);

        if(btn.type === me.SUBMIT_TYPE_SUTMIT){
            me.onCreateAction(serviceOrderItem, store);
        } else {
            me.onUpdateAction(serviceOrderItem, store, btn.type);
        }

        store.sync({
            success: function(batch, options){
                me.onTransactionSuccess();
            },
            failure: function(batch, options) {
                MessageUtil.error();
            }
        });
    },

    formatDateFields: function(data){
        var dateFieldArr = ['svcDtFm', 'svcDtTo', 'dt1Fm', 'dt1To', 'dt2Fm', 'dt2To',
            'comSvcDtFm', 'comSvcDtTo', 'comDt1Fm', 'comDt1To', 'comDt2Fm', 'comDt2To'];

        Ext.Object.each(data, function(key, value, myself) {
            if (dateFieldArr.includes(key) && value instanceof Date) {
                myself[key] = Ext.Date.format(value, 'd/m/Y H:i');
            }
        });        
        
        if ((data['svcDtFmt'] == null) || (data['svcDtFmt'] == ""))  {
        	data['svcDtFmt'] = 'd/m/Y';
        }
        
        if ((data['dt1Fmt'] == null) || (data['dt1Fmt'] == "")) {
        	data['dt1Fmt'] = 'd/m/Y';
        }
        
        if ((data['dt2Fmt'] == null) || (data['dt2Fmt'] == "")) {
        	data['dt2Fmt'] = 'd/m/Y';
        }
        
        return data;
    },

    setServiceOrderItemStatus: function(statCd){
        var me = this;
        var serviceOrderItem =  me.getViewModel().getData().serviceOrderItem;
        
        statCd = (statCd === me.SUBMIT_TYPE_RESUBMIT)? me.SUBMIT_TYPE_SUTMIT : statCd;
        serviceOrderItem.statCd = statCd;
    },

    onCreateAction: function(serviceOrderItem, store){
        var me = this;
        var data = store.getAt(0);

        if(data === null){
            data = me.createServiceOrderItem();
            store.add(data);
        }

        Ext.Object.merge(data.data, serviceOrderItem);
        data.set('workingStatus', WorkingStatus.INSERT);
    },

    onUpdateAction: function(serviceOrderItem, store, statCd){
        store.each(function (data) {
            if (data.get('odrNo') === serviceOrderItem.odrNo) {
                data.set(serviceOrderItem);
                return;
            }
        });
    },

    onDetailRemove: function(){
        var me = this;
        var store = me.getStore('serviceOrderDetailStore');

        if(store.data.length > 0){
        	for(var i = 0; i< store.data.length; i++){
        		if(store.data.items[i].get('statCd') == 'CP' || store.data.items[i].get('statCd') == 'AP'){
        			MessageUtil.warning('Warning','so_verify_msg_to_delete');
		            return;
        		}
        	}
        }
        
        MessageUtil.question('confirm', 'adr_msg_delete_record',null,
	        function(button){
	            if (button === 'ok') {
	                store.removeAll();
	
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

    isUpdateDetail : function(){
        var me = this;
        
        if(me.getDetailBizView()){
            return me.getDetailBizView().items.get(0).recvData.get('workingStatus') === WorkingStatus.UPDATE;
        }
        
        return null;
    },

    onDestroyView: function () {
        var me = this;

        me.getStore('serviceOrderDetailStore').removeAll();
        me.getStore('serviceOrderDetailStore').clearData();
        me.getViewModel().setData({
            serviceOrderItem: null,
            serviceOrderSettingItem: null,
            serviceOrderVesselItem: null
        });
    },

    validateFormData: function(statCd){
        var me = this;
        var item = me.getViewModel().getData().serviceOrderItem;
        var validObj = {};
        var valid = true;
        var msgArr = new Array();
        var msg = '';

        if(me.isSubmitFieldsInvalid(item)){
            valid = false;
            msgArr.push(MOST.getApplication().bundle.getMsg('soc_msg_fillUpReqFields'));

            if(item !== null) {
                if(item.vslCallId === null || item.vslCallId === ''){
                    msgArr.push(MOST.getApplication().bundle.getMsg('so_jpvc'));
                }
                
                if(item.svcDtFm === null || item.svcDtFm === ''){
                    msgArr.push(MOST.getApplication().bundle.getMsg('so_svcDt'));
                }
                
                if(item.unit === null){
                    msgArr.push(item.unitUomNm);
                }
            }
            msg = msgArr.join('<br/>');
        } else if(me.isRejectFieldsInvalid(statCd, item)){
            valid = false;
            msgArr.push(MOST.getApplication().bundle.getMsg('so_prcRmk'));
            msg = msgArr.join('<br/>');
        }

        validObj.valid = valid
        validObj.msg = msg;
        validObj.msgArr = msgArr;

        return validObj;
    },

    isSubmitFieldsInvalid: function(item){
        return item === null || item.vslCallId === null || item.svcDtFm === null || item.vslCallId === '' || item.svcDtFm === '';
    },

    isRejectFieldsInvalid: function(statCd, item){
        var inValid = false;
        
        if(statCd === 'RJ' && (item.rmk === null || item.rmk === '')){
            var inValid = true;
        }

        return inValid;
    },
    
	onRemove: function() {
		var me = this;
		var store = me.getStore('serviceOrderListStore'); 
		var grid = me.lookupReference('refServiceOrderConfGrid');
		var selArr = grid.getSelection();
		
		if(selArr.length > 0){
			for(var i = 0; i < selArr.length; i++ ){	
				if(selArr[i].get('statCd') == 'CP' || selArr[i].get('statCd') == 'AP'){
					MessageUtil.warning('Warning','so_verify_msg_to_delete');
		            return;
				}
			}
		}else {
			MessageUtil.warning('Warning','selectdeletedata_msg');
            return;
		}
		
		MessageUtil.question('remove', 'infodelete_msg', null,
			function(button){
				if (button === 'ok') {
					store.data.each(function(record){
						
						for (var i = 0; i< selArr.length; i++ ){
							var selection = selArr[i];
							
							if(record.data.odrNo == selection.get("odrNo") ){						
								store.remove(record);								
							}
						}						
					});
					
					store.sync({
						success: function(){
							MessageUtil.saveSuccess();
							store.commitChanges();
							me.onSearch();
						}
					});
				}
			}
		);
	},

	onSelectBLSNNo:function(ownObj){
		var me = this;
		var refs = me.getReferences();
		var serviceOrderItem = me.getViewModel().get('serviceOrderItem');
		var reqUnitNo='';
		var searchRequestInputSNBL = me.getStore('searchRequestInputSNBL');
		
		if(ownObj == refs.refSearchBlno){
			serviceOrderItem.reqShipgNoteNo = "";
		} else if(ownObj == refs.refSearchSnNo){
			serviceOrderItem.reqBlNo = "";
		}
		
		if(serviceOrderItem.reqShipgNoteNo != null && serviceOrderItem.reqShipgNoteNo != ''){
			serviceOrderItem.blSNNo = serviceOrderItem.reqShipgNoteNo;
		} else{
			serviceOrderItem.blSNNo = serviceOrderItem.reqBlNo;
		}
		
		serviceOrderItem.reqDocNo = serviceOrderItem.reqShipgNoteNo;
		
		searchRequestInputSNBL.load({
            params: {
            	blSNNo: serviceOrderItem.blSNNo
            },
            callback: function (records, operation, success) {
                if (success) {
                	if(records > 0) {
                		serviceOrderItem.reqUnitNo= records[0].get('blSNNo');
	                	reqUnitNo = records[0].get('blSNNo');
                	}
                }
            }
        });
		
		refs.refNextSNNo.setValue(reqUnitNo);
	},
	
	onSelectCompletionBLSNNo:function(ownObj){
		var me = this;
		var refs = me.getReferences();
		var serviceOrderItem = me.getViewModel().get('serviceOrderItem');
		var searchCompletionSNBL = me.getStore('SNBLCompletionGridList');
		
		if(ownObj == refs.refSearchBlno){
			serviceOrderItem.reqShipgNoteNo = "";
		}else if(ownObj == refs.refSearchSnNo){
			serviceOrderItem.reqBlNo = "";
		}
		
		if(serviceOrderItem.comShipgNoteNo != null && serviceOrderItem.comShipgNoteNo != ''){
			serviceOrderItem.blSNNo = serviceOrderItem.comShipgNoteNo;
		}else{
			serviceOrderItem.blSNNo = serviceOrderItem.comBlNo;
		}
		
		serviceOrderItem.comDocNo = serviceOrderItem.comShipgNoteNo;
		
		searchCompletionSNBL.load({
            params: {
            	blSNNo: serviceOrderItem.blSNNo
            },
            callback: function (records, operation, success) {
                if (success) {
                	if(records > 0) {
                		serviceOrderItem.comUnitNo = record[0].get('blSNNo');
                	}
                }
            }
        });
	},
	
	onSearchSNBL:function(){
		var me = this;
		var refs = me.getReferences();
		var serviceOrderItem = me.getViewModel().get('serviceOrderItem');
		var searchRequestInputSNBL = me.getStore('SNBLGridList');
		
		searchRequestInputSNBL.load({
            params: {
            	blSNNo: serviceOrderItem.blSNNo
            },
            callback: function (records, operation, success) {
                if (success) {
                }
            }
        });
	},
	
	onSearchCompletionSNBL:function(){
		var me = this;
		var refs = me.getReferences();
		var serviceOrderItem = me.getViewModel().get('serviceOrderItem');
		var searchRequestInputSNBL = me.getStore('SNBLCompletionGridList');
		
		searchRequestInputSNBL.load({
            params: {
            	blSNNo: serviceOrderItem.blSNNo
            },
            callback: function (records, operation, success) {
                if (success) {
                	if(serviceOrderItem.category3 == 'SSTC012'){
                    	serviceOrderItem.unitNo = record[0].get('blSNNo');
                	}
                }
            }
        });
	},
	
	onAddBL:function(){
		var me = this;
		var refs = me.getReferences();
		var serviceOrderItem = me.getViewModel().get('serviceOrderItem');
		var record = Ext.create('MOST.model.operation.ServiceOrder');
		var searchRequestInputSNBL = me.getStore('SNBLGridList');
		var blSNNo = refs.refSearchBlno.getValue();
		
		if(blSNNo != null && blSNNo != ''){
			record.set('blSNNo', blSNNo);
			record.set('vslCallId',serviceOrderItem.vslCallId);
			searchRequestInputSNBL.insert(0,record);
		}else{
			MessageUtil.warning('Warning','Please select BL at first');
            return;
		}
	},
	
	onAddSN:function(){
		var me = this;
		var refs = me.getReferences();
		var serviceOrderItem = me.getViewModel().get('serviceOrderItem');
		var record = Ext.create('MOST.model.operation.ServiceOrder');
		var searchRequestInputSNBL = me.getStore('SNBLGridList');
		
		if(serviceOrderItem.blSNNo != null && serviceOrderItem.blSNNo != ''){
			record.set('blSNNo',serviceOrderItem.blSNNo);
			record.set('vslCallId',serviceOrderItem.vslCallId);
			searchRequestInputSNBL.insert(0,record);
		}else{
			MessageUtil.warning('Warning','Please select Shipping Note at first');
            return;
		}
	},
	
	onAddCompletionSN:function(){
		var me = this;
		var refs = me.getReferences();
		var serviceOrderItem = me.getViewModel().get('serviceOrderItem');
		var record = Ext.create('MOST.model.operation.ServiceOrder');
		var searchCompletionSNBL = me.getStore('SNBLCompletionGridList');
		
		if(serviceOrderItem.blSNNo != null && serviceOrderItem.blSNNo != ''){
			record.set('blSNNo',serviceOrderItem.blSNNo);
			record.set('vslCallId',serviceOrderItem.vslCallId);
			searchCompletionSNBL.insert(0,record);
		}else{
			MessageUtil.warning('Warning','Please select Shipping Note at first');
            return;
		}
	},
	
	onAddCompletionBL:function(){
		var me = this;
		var refs = me.getReferences();
		var serviceOrderItem = me.getViewModel().get('serviceOrderItem');
		var record = Ext.create('MOST.model.operation.ServiceOrder');
		var searchCompletionSNBL = me.getStore('SNBLCompletionGridList');
		
		if(serviceOrderItem.blSNNo != null && serviceOrderItem.blSNNo != ''){
			record.set('blSNNo',serviceOrderItem.blSNNo);
			record.set('vslCallId',serviceOrderItem.vslCallId);
			searchCompletionSNBL.insert(0,record);
		}else{
			MessageUtil.warning('Warning','Please select BL at first');
            return;
		}
	},
	
	onRemoveSN:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refBLSNListGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var store = grid.getStore();
		
		if(selection == null){
			MessageUtil.error('warning_msg','selectdeletedata_msg');
			return;
		}
		
		me.gridRemoveRow(grid, store);
	},
	
	onRemoveBL:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refBLSNListGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var store = grid.getStore();
		
		if(selection == null){
			MessageUtil.error('warning_msg','selectdeletedata_msg');
			return;
		}
		
		me.gridRemoveRow(grid, store);
	},
	
	onRemoveCompletionSN:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refSNBLCompletionGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var store = grid.getStore();
		
		if(selection == null){
			MessageUtil.error('warning_msg','selectdeletedata_msg');
			return;
		}
		
		me.gridRemoveRow(grid, store);
	},
	
	onRemoveCompletionBL:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refSNBLCompletionGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var store = grid.getStore();
		
		if(selection == null){
			MessageUtil.error('warning_msg','selectdeletedata_msg');
			return;
		}
		
		me.gridRemoveRow(grid, store);
	},
	
	onChangUnit1: function(){
		var me = this;
		var refs = me.getReferences();
		
		if(refs.refReqUnitField.getValue() < 0){
			MessageUtil.error('warning_msg','Unit 1 can not be negative');
			refs.refReqUnitField.setValue(0);
			return;
		}
	},
	
	onChangUnit2: function(){
		var me = this;
		var refs = me.getReferences();
		if(refs.refReqUnit1Field.getValue() < 0){
			MessageUtil.error('warning_msg','Unit 2 can not be negative');
			refs.refReqUnit1Field.setValue(0);
			return;
		}
	},
	
	onChangUnit3: function(){
		var me = this;
		var refs = me.getReferences();
		if(refs.refReqUnit2Field.getValue() < 0){
			MessageUtil.error('warning_msg','Unit 3 can not be negative');
			refs.refReqUnit2Field.setValue(0);
			return;
		}
	},
	
	// Unit of Completion 
	onChangCompUnitField: function(){
		var me = this;
		var refs = me.getReferences();
		
		if(refs.refCompUnitField.getValue() < 0){
			refs.refCompUnitField.setValue(0);
			return;
		}
	},
	
	onChangCompUnit1Field: function(){
		var me = this;
		var refs = me.getReferences();
		if(refs.refCompUnit1Field.getValue() < 0){
			refs.refCompUnit1Field.setValue(0);
			return;
		}
	},
	
	onChangCompUnit2Field: function(){
		var me = this;
		var refs = me.getReferences();
		if(refs.refCompUnit2Field.getValue() < 0){
			refs.refCompUnit2Field.setValue(0);
			return;
		}
	},
    /**
     * DETAIL END
     * =========================================================================================================================
     */

});