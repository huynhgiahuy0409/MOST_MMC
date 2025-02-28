Ext.define('MOST.view.operation.VesselOprSettingController', {
	extend: 'MOST.view.foundation.BaseViewController',
	
	requires: [
	],

	alias: 'controller.vesseloprsetting',	
	
	/**
	 * =========================================================================================================================
	 * VARIABLE/CONSTANT START
	 */
	
	MAX_HATCH_NO : 11,	// Hatch Setting
	regChkAgentMode: false,
	prevAddData:{
		cgTpCd: '',
		eqTpCd: ''
	},
	orgEquipmentArr: null,
	/**
	 * VARIABLE/CONSTANT END
	 * =========================================================================================================================
	 */	
	
	MAIN_GRID_REF_NAME: 'refVesselOprSettingGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'vesselOprSettingList',
	
	TOP_CLEAN_COMBO_STORE: 'topCleanCombo',
	APFP_COMBO_STORE: 'apfpCombo',
	BREAK_DRY_BULK_COMBO_STORE: 'breakDryBulkCombo',

	MODE_ADD: 'C',
	MODE_UPD: 'U',
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();

		var record = Ext.create('MOST.model.operation.VesselOprSetting');
		me.getViewModel().set('theEquipmentSetting', record);
		
		var searchParm = Ext.create('MOST.model.operation.SearchVesselOprSettingParm');
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		me.setComboBoxWithLocalCache(CacheServiceConstants.TOP_CLEAN_COMBOBOX, me.TOP_CLEAN_COMBO_STORE); 	// MOVE TYPE COMBO
		me.setComboBoxWithLocalCache(CacheServiceConstants.APFP_COMBOBOX, me.APFP_COMBO_STORE); 	// MOVE TYPE COMBO
		me.setComboBoxWithLocalCache(CacheServiceConstants.BREAK_DRY_BULK_COMBOBOX, me.BREAK_DRY_BULK_COMBO_STORE); 	// MOVE TYPE COMBO
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		me.onComboStore();
	},
	
	 /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// Search Event Handler
	
	onSearch: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();
		
    	if(params == null){
    		return;
    	}
    	
    	store.load({
			params: params,
			callback: function(records, operation, success) {
    			if(success){
    				me.onControlsInitialize();
    			}
    		}
		});
	},
	
	onAdd: function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);

		if(!refs.ctlVslCallId.getValue()){
			return;
		}
		//var record = Ext.create('MOST.model.operation.VesselOprSetting');
		var record = me.getViewModel().get('theEquipmentSetting');
		var theEqSetItem = me.getViewModel().get('theEqSet');
		if(theEqSetItem.get('currAtb') == null || theEqSetItem.get('currAtb') == ''){
			if(theEqSetItem.get('vslShiftingSeq') != null && theEqSetItem.get('vslShiftingSeq') != '')
				MessageUtil.warning('fail_msg', "requiredAtbShiftingmessage");
			else
				MessageUtil.warning('fail_msg', "requiredAtbSchedulemessage");
			
			return 
		}
		
		if(theEqSetItem){
			if(!StringUtil.isNullorEmpty(theEqSetItem.get('vslCallId'))){
				record.set('vslCallId', theEqSetItem.get('vslCallId'));
			}
			
			if(!StringUtil.isNullorEmpty(theEqSetItem.get('vslShiftingYN'))){
				record.set('vslShiftingYN', theEqSetItem.get('vslShiftingYN'));
			}
			
			if(!StringUtil.isNullorEmpty(theEqSetItem.get('vslShiftingSeq'))){
				record.set('vslShiftingSeq', theEqSetItem.get('vslShiftingSeq'));
			}
		}
		
		record.set('userId', MOST.config.Token.getUserId());
		record.set('rsDivCd', 'EQ');
		record.set('eqTpCd', me.prevAddData.eqTpCd);
		
		record.set('workYmd', Ext.Date.format(refs.refWorkYmd.getValue(), MOST.config.Locale.getShortDate()));
		record.set('vslCd', theEqSetItem.get('vslCd'));
		record.set('callYear', theEqSetItem.get('callYear'));
		record.set('callSeq', theEqSetItem.get('callSeq'));
		
		if(!me.onDuplicatedValidation(record)){
			return false;
		}
		
		if(!me.onValidationRecord(record)){
			return;
		}
		
		store.insert(0, record);
		store.sync({
			success: function(){
				store.reload({
					callback: function(records, operation, success) {
						if(success){
							store.commitChanges();
							MessageUtil.saveSuccess();
						}
					}
				});
			}
		})
		
		var record1 = Ext.create('MOST.model.operation.VesselOprSetting');
		me.getViewModel().set('theEquipmentSetting', record1);
		
		refs.refBtnSave.setDisabled(false);

		refs.refCboBreakDryBulk.setDisabled(false);
		refs.refWorkYmd.setDisabled(false);
		refs.refCboShift.setDisabled(false);
		
		me.onCheckTopClean();
		me.onCheckFacility();
		me.oncheckAPFP();
	},	
	
	onClear: function() {
		var me = this;
		var refs = me.getReferences();

		var record = Ext.create('MOST.model.operation.VesselOprSetting');
		me.getViewModel().set('theEquipmentSetting', record);
		
		refs.refWorkYmd.setValue();
		refs.refBtnSave.setDisabled(false);
		refs.refCboBreakDryBulk.setDisabled(false);
		refs.refWorkYmd.setDisabled(false);
		refs.refCboShift.setDisabled(false);
		refs.refBtnCreate.setDisabled(false);
		
		me.onCheckTopClean();
		me.onCheckFacility();
		me.oncheckAPFP();
	},	
	
	onRemove: function() { 
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME); 
		
		me.gridRemoveRow(grid, store, function(){
			MessageUtil.saveSuccess();
			me.onClear();
		});
	},
	
	//For UPDATE (button SAVE):
	onSave:function(){
		var me = this;
		
		//Temp Remove by APC:
		/*
		me.getView().getEl().mask('Processing...');
		saveTaskJob.delay(300, null, me, null);*/
		
		me.onSaveTask();
	},
	
	onChkAgent: function(checkbox, checked) {
		var me = this;
		var refs = me.getReferences();
		me.regChkAgentMode = checked;
	},

	onBreakDryBulkSet: function(field, value){
		var me = this;
		var refs = me.getReferences();
		if(field != null){
			if (value === 'BBK') {
				me.prevAddData.cgTpCd = 'BBK';
				me.getEquipmentCode();
			} else {
				me.prevAddData.cgTpCd = 'DBK';
				me.prevAddData.eqTpCd = 'FC';
			}
			
			me.onCheckTopClean();
			me.onCheckFacility();
			me.oncheckAPFP();
		}
	},

	getEquipmentCodeFromWorkDate:function( e, newDate, oldDate, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		var equipmentCombo = me.getStore('equipmentCombo');
			
		var cgTp = refs.refCboBreakDryBulk.getValue();
		
		if(me.validCriteriaSearch()){				
			var params = {
					workYmd: Ext.Date.format(refs.refWorkYmd.getValue(), MOST.config.Locale.getShortDate()),
					vslCallId: refs.ctlVslCallId.getValue(),
					shftId: refs.refCboShift.getValue()
			}
			
			equipmentCombo.removeAll();
			equipmentCombo.load({
				params: params,
				callback:function(records, operation, success){
					if(success){
					}
				}
			})
		};
		
		var selectedRecord = me.getViewModel().get('theEquipmentSetting');
		if(selectedRecord && selectedRecord.phantom){
			selectedRecord.set('workYmd', newDate);
			var workDate = Ext.Date.format(refs.refWorkYmd.getValue(), 'd/m/Y');
			selectedRecord.set('workStDt', (me.setFmTimeByShift(selectedRecord.get('shftId'), workDate)));
			selectedRecord.set('workEndDt', (me.setToTimeByShift(selectedRecord.get('shftId'), workDate)));
		}
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		searchBizParm.classID = 'com.tsb.most.biz.parm.operation.SearchVesselOprSettingParm';
		searchBizParm.serviceID = 'MOST.vesselOprSetting.selectVesselOprSettingList'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	
	onEquipmentSettingGridClick:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;

        if(selection.phantom === false){
        	refs.refBtnSave.setDisabled(false);
        	refs.refCboShift.setDisabled(true);
        	refs.refWorkYmd.setDisabled(true);
        }else{
			refs.refCboShift.setDisabled(false);
			refs.refWorkYmd.setDisabled(false);
        }
        refs.refBtnDelete.setDisabled(false);
        refs.refBtnCreate.setDisabled(true);
		
		me.getViewModel().set('theEquipmentSetting', selection);
		refs.refWorkYmd.setValue(selection.get('workYmd'));
	},

	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	

	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		var saChangeCombo = me.getStore('saChangeCombo');
		
		if(targetControl === 'ctlVslCallId'){
			if(returnValue){
				me.getViewModel().setData({theEqSet: returnValue.item});
				
				if(!StringUtil.isNullorEmpty(returnValue.item.get('depSaId'))){
					saChangeCombo.insert(0, [{data: returnValue.item.get('depSaId'), label: returnValue.item.get('depSaId')}]);
					saChangeCombo.commitChanges();
					if(returnValue.item.get('depSaId') === returnValue.item.get('arrvSaid')){
						saChangeCombo.removeAll();
						saChangeCombo.insert(0, [{data: '', label: ''}]);
						saChangeCombo.commitChanges();
					}
				}
				
				me.onSearch();
			}else{
				me.getViewModel().setData({theEqSet: null});
				
				var store = me.getStore(me.MAIN_STORE_NAME);
				store.removeAll();
				store.commitChanges();
				
				me.onControlsInitialize();
			}
		}
	},
	
	onControlsInitialize: function(){
		var me = this;
		var refs = me.getReferences();

		var record = Ext.create('MOST.model.operation.VesselOprSetting');
		me.getViewModel().set('theEquipmentSetting', record);

		refs.refBtnSave.setDisabled(true);
		refs.refBtnDelete.setDisabled(true);
		refs.refsEditTopClean.setDisabled(false);
		refs.refsEditFacility.setDisabled(false);
		refs.refsEditAPFP.setDisabled(false);
	},
	
	onComboStore:function(){
		var me = this;
		var refs = me.getReferences();
		var shiftCombo = me.getStore('shiftCombo');
		var equipmentCombo = me.getStore('equipmentCombo');
		var facilityCombo = me.getStore('facilityCombo');
		
		shiftCombo.load();
		facilityCombo.load();
		equipmentCombo.load({
    		params: {
    			vslCallId: refs.ctlVslCallId.getValue()
    		}
		});
		
		me.onHatchDataSet();
		
	},
	
	getEquipmentCode:function(){
		var me = this;
		var refs = me.getReferences();
		var cgTp = refs.refCboBreakDryBulk.getValue();

		var equipmentCombo = me.getStore('equipmentCombo');

		if(me.validCriteriaSearch()){
			equipmentCombo.removeAll();
			
			var params = {
					workYmd: Ext.Date.format(refs.refWorkYmd.getValue(), MOST.config.Locale.getShortDate()),
					vslCallId: refs.ctlVslCallId.getValue(),
					shftId: refs.refCboShift.getValue()
			}
			
			equipmentCombo.load({
				params: params,
				callback:function(records, operation, success){
					if(success){
					}
				}
			})
		};

		var selectedRecord = me.getViewModel().get('theEquipmentSetting');
		if(selectedRecord && selectedRecord.phantom){
			var workDate = Ext.Date.format(refs.refWorkYmd.getValue(), 'd/m/Y');
			var fromShiftTime = me.setFmTimeByShift(selectedRecord.get('shftId'), workDate);
			selectedRecord.set('workStDt', (fromShiftTime));
			selectedRecord.set('workEndDt', (me.setToTimeByShift(selectedRecord.get('shftId'), workDate, fromShiftTime)));
		}
		
	},
	
	onCheckTopClean: function(){
		var me = this;
		var refs = me.getReferences();
		var breadDryBulk = refs.refCboBreakDryBulk.getValue();
		if (breadDryBulk === null || breadDryBulk === '' || breadDryBulk === 'BBK'){
			refs.refsEditTopClean.setDisabled(true);
		}
		else{
			refs.refsEditTopClean.setDisabled(false);
		}
	},
	
	onCheckFacility: function(){
		var me = this;
		var refs = me.getReferences();
		var breadDryBulk = refs.refCboBreakDryBulk.getValue();
		
		if (breadDryBulk === null || breadDryBulk === '' || breadDryBulk === 'BBK'){
			refs.refsEditFacility.setDisabled(true);
		}
		else{
			refs.refsEditFacility.setDisabled(false);
		}
	},
	
	oncheckAPFP: function(){
		var me = this;
		var refs = me.getReferences();
		var breadDryBulk = refs.refCboBreakDryBulk.getValue();
		if (breadDryBulk === null || breadDryBulk === '' || breadDryBulk === 'DBK'){
			refs.refsEditAPFP.setDisabled(true);
		}
		else{
			refs.refsEditAPFP.setDisabled(false);
		}
	},
	
	//For UPDATE
	onSaveTask:function(){
		var me = this;
		var refs = me.getReferences();
		var currAtb = me.getViewModel().get('theEqSet').get('currAtb');
		var store = me.getStore(me.MAIN_STORE_NAME);

		if(me.onOverlapped() == false){
			MessageUtil.warning('fail_msg', "euqipmentsetting_overlapped");
			me.getView().getEl().unmask();
			return;
		}
		
		if(!me.onValidation()){
			me.getView().getEl().unmask();
			return
		}
		
		if(!me.onDuplicatedValidationForUpdating()){
			me.getView().getEl().unmask();
			return false;
		}
		
		var updateArr = new Array();
		
		store.getModifiedRecords().forEach(function(record, index, array){
			if(!record.phantom){
				record.data.workStDtStr = Ext.Date.format(record.data.workStDt, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
				record.data.workEndDtStr = Ext.Date.format(record.data.workEndDt, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
				updateArr.push(record.data);
			}
		});
		
		me.saveProcess(updateArr, false);
	},
	
	//Save for UPDATE:
	saveProcess: function(arrItems){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		
		if(!arrItems || arrItems.length <= 0){
			return;
		}
		
		var isCreate = false;
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = isCreate;
		updateParm.set('workingStatus', isCreate ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('userId', MOST.config.Token.getUserId());
		updateParm.set('items', arrItems);

		updateParm.save({
			success: function(record) {
				me.onClear();
				store.commitChanges();
				MessageUtil.saveSuccess();
				
			}
		});
	},
	
	getSearchCondition : function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		
		var vslCallId = searchParm.data.vslCallId;
		
		if(vslCallId != null && vslCallId != ''){ 
			params['vslCallId'] = vslCallId;
			params['strDate'] = '';
			params['endDate'] = '';
			params['searchType'] = 'info';
			params['pageNo'] = pageNo;
			params['sizePerPage'] = sizePerPage;
			params['sort'] = grid.getSortString();
		} else {
			MessageUtil.error('fail_msg', "requiredJpvcmessage");
			params = null;
		}
		
		return params;
	},
	
    onOverlapped: function(){
    	var me = this;
		var refs = me.getReferences();
		var isOverlapped = me.getStore('isOverlapped');
		isOverlapped.clearData();
		
		isOverlapped.load({
			params:{
				vslCallId: refs.ctlVslCallId.getValue(),
				shftId: refs.refCboShift.getValue(),
				cgTpCd: refs.refCboBreakDryBulk.getValue(), //AP/FP
				hatchNo: refs.refCboHatchNo.getValue(),
				workYmd: Ext.Date.format(refs.refWorkYmd.getValue(), MOST.config.Locale.getShortDate()),
				workStDt: Ext.Date.format(refs.refWorkStDt.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()),
				workEndDt: Ext.Date.format(refs.refWorkEndDt.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()),
				dptAgent: refs.refComboDptAgent.getValue(),
				remark: refs.refTextfieldRemark.getValue(),
			},
			callback:function(records, operation, success){
				if(success){
					if(parseInt(records[0].get('count')) > 0){
						return false;
					}else{
						return true;
					}
				}
			}
		})
    },
	
	onHatchDataSet: function(){
		var me = this;
		var store = me.getStore('hatchNoCombo');
		
		store.removeAll();
		store.insert(0, [{cdNm: 'Select',cd: ''}]);
		for(var i = 0; i < me.MAX_HATCH_NO; i++){
			store.insert(i+1, [{cdNm: 'H' + (i+1),cd: 'H' + (i+1)}])
		}
		store.commitChanges();
	},
	
	setFmTimeByShift: function(shftId, workYmd){
		var me = this;
		var refs = me.getReferences();
		
		var shftSelection = refs.refCboShift.getSelection();
		var fmShiftTime = Ext.Date.parse(workYmd + ' ' + shftSelection.get('fmHhMm').substr(0,2) + ':' + shftSelection.get('fmHhMm').substr(2,2),  'd/m/Y H:i');
		
		return fmShiftTime;
	},
	
	setToTimeByShift: function(shftId, workYmd, fromShiftTime){
		var me = this;
		var refs = me.getReferences();
		
		var shftSelection = refs.refCboShift.getSelection();
		var toShiftTime = Ext.Date.parse(workYmd + ' ' + shftSelection.get('toHhMm').substr(0,2) + ':' + shftSelection.get('toHhMm').substr(2,2),  'd/m/Y H:i');
		
		if(shftSelection.get('shftIdx') == "3" || fromShiftTime > toShiftTime ){
			toShiftTime.setDate(toShiftTime.getDate() + 1);
		}
		
		return toShiftTime;
		
	},
	
	onSaChangeCombo : function(field, newValue, oldValue) {
		var me = this;
		var refs = me.getReferences();
		
//		if(!StringUtil.isNullorEmpty(newValue)){
//			refs.txtCompany.setValue(me.getViewModel().get('theEqSet').get('depSaNm'));
//			
//		} else {
//			refs.txtCompany.setValue('');
//		}
		
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
    
    /**
	 * VALIDATION METHOD START
	 * =========================================================================================================================
	 */
	onValidCurAtb: function(startTime, endTime){
		var me = this;
		var refs = me.getReferences();
		var result = true;
		var currAtb = me.getViewModel().get('theEqSet').get('currAtb'); 
		
		if(currAtb != null && currAtb != undefined){
			currAtb = new Date(me.getViewModel().get('theEqSet').get('currAtb'));
		}
		 
			
		if(startTime != null && !DateUtil.validateFromToDate(currAtb, startTime)){
			result = false;
		} 
		
		if(endTime != null && !DateUtil.validateFromToDate(currAtb, endTime)){
			result = false;
		}
				
		return result;
	},
	
	onValidCurAtu: function(startTime, endTime){
		var me = this;
		var refs = me.getReferences();
		var result = true;
		var currAtu = me.getViewModel().get('theEqSet').get('currAtu');
		
		if(currAtu != null && currAtu != undefined){
			currAtu = new Date(me.getViewModel().get('theEqSet').get('currAtu'));
		}
		
		if(currAtu != null){
			
			if(startTime != null && !DateUtil.validateFromToDate(startTime, currAtu )){
				result = false;
			} 
			
			if(endTime != null && !DateUtil.validateFromToDate(endTime, currAtu)){
				result = false;
			}
		}
				
		return result;
	},
	
	validCriteriaSearch:function(){
		var me = this;
		var refs = me.getReferences();
		
		if(!Ext.isEmpty(refs.refWorkYmd.getValue()) && !Ext.isEmpty(refs.refCboShift.getValue())){
			return true;
		}else{
			return false;
		}
	},
	
	onValidationRecord: function (record){
		var me = this;
		var refs = me.getReferences();
		
		var workYmd = Ext.Date.parse(record.get('workYmd'), 'd/m/Y');
		var workStDt = record.get('workStDt');
		var workEndDt = record.get('workEndDt');
		var shftId = record.get('shftId');
		
		var currAtu = me.getViewModel().get('theEqSet').get('currAtu');
		var shiftSeq = me.getViewModel().get('theEqSet').get('vslShiftingSeq');
		var currAtb = me.getViewModel().get('theEqSet').get('currAtb');

		if(!me.validateWorkingTime(workYmd, workStDt, workEndDt, shftId)){
			MessageUtil.error('fail_msg', "euqipmentsetting_wrkDt_startdt_endt_error_msg");
			return false;
		}
		
		//Temp comment: 20210630:
		/*if(Ext.isEmpty(record.get('eqFacNo'))){
			MessageUtil.error('fail_msg', "equipmentsetting_equipment_blanl_msg");
			return false;
		}*/
		
		if(!record.get('hatchNo')){
			MessageUtil.error('fail_msg', "Please select the Hatch No.");
			return false;
		}
		
		if(!me.onValidateWorkingTime(workStDt, workEndDt)){
			return false;
		}
		
		if(currAtb != null){
			var resultCalculDateAtb = me.onValidCurAtb(workStDt , workEndDt);
			var resultCalculDateAtu = me.onValidCurAtu(workStDt , workEndDt);
			
			if(!resultCalculDateAtb){
				var currAtbStr = currAtb;
				var atbMessagePlus = '';
				if(shiftSeq != null && shiftSeq != ''){
					atbMessagePlus = Ext.String.format(': {0}<br>Refer to Vessel Shifting screen for more detail', currAtbStr);
				}else{
					atbMessagePlus = Ext.String.format(': {0}<br>Refer to Vessel Schedule screen for more detail', currAtbStr);
				}
				MessageUtil.error('fail_msg', "resultcalculAtbdatefailmessage", atbMessagePlus);
				return false;
			}
			
			if(!resultCalculDateAtu){
				var currAtuStr = currAtu.substr(0,16);
				var atuMessagePlus = '';
				if(shiftSeq != null &&  shiftSeq != ''){
					atuMessagePlus = ':' + currAtuStr + '.<br>Refer to Vessel Shifting screen for more detail';	
				}else{
					atuMessagePlus = ':' + currAtuStr + '.<br>Refer to Vessel Schedule screen for more detail';
				}
				MessageUtil.error('fail_msg', "resultcalculAtudatefailmessage", atuMessagePlus);
				return false;
			}
		} else {
			if(shiftSeq != null &&  shiftSeq != '')
				MessageUtil.warning('fail_msg', "requiredAtbShiftingmessage");
			else
				MessageUtil.warning('fail_msg', "requiredAtbSchedulemessage");
			return false;
		}	
		
		return true;
	},
	
	validateWorkingTime:function(workYmd, workStDt,workEndDt, selectShift){
		var me = this;
		var refs = me.getReferences();
		var shiftFrom = me.setFmTimeByShift(selectShift, Ext.Date.format(workYmd, 'd/m/Y'));
		var shiftTo = me.setToTimeByShift(selectShift, Ext.Date.format(workYmd, 'd/m/Y'), shiftFrom);
		
		if(workStDt >= shiftFrom && workEndDt <= shiftTo){
			return true;
		}else{
			return false;
		}
	},
	
	onValidateWorkingTime: function(workStDt, workEndDt){
		var me = this;
		var refs = me.getReferences();
		var iSuccess = true;
		
		if (workStDt != null && workEndDt != null) {
			if(!DateUtil.validateFromToDate(workStDt, workEndDt)){
				MessageUtil.warning('fromtimeTitle', "validateworkingtimeMessage");
				iSuccess = false;
			}
			
		} else if (workStDt != null || workEndDt != null) {
			MessageUtil.error('fail_msg', "validationWorkDateConfirm");
			iSuccess = false;
		}
		
		return iSuccess;
		
	},

	onDuplicatedValidation: function (record){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);	
		for(var i = 0; i < store.data.length; i++){
			var rec = store.data.items[i];
			if(rec!==record){
				if(Ext.Date.format(rec.get('workYmd'), MOST.config.Locale.getShortDate()) == Ext.Date.format(record.getData().workYmd, MOST.config.Locale.getShortDate())
						&& rec.get('shftId') == record.getData().shftId
						&& rec.get('hatchDrtCd') == record.getData().hatchDrtCd
						&& rec.get('eqFacNo') == record.getData().eqFacNo
						&& rec.get('hatchNo') == record.getData().hatchNo
						&& rec.get('cgTpCd') == record.getData().cgTpCd
						&& Ext.Date.format(rec.get('workStDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()) == Ext.Date.format(record.getData().workStDt, MOST.config.Locale.getDefaultDateFormatWithNoSeconds())
						&& Ext.Date.format(rec.get('workEndDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()) == Ext.Date.format(record.getData().workEndDt, MOST.config.Locale.getDefaultDateFormatWithNoSeconds())){
					MessageUtil.warning('warning_msg', 'duplicatedata_msg');
					return false;
				}
			}
		}
		return true;
	},
	
	onDuplicatedValidationForUpdating: function (){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);	
		for(var i = 0; i < store.data.length; i++){
			var rec1 = store.data.items[i];
			for(var j = i+1; j < store.data.length; j++){
				var rec2 = store.data.items[j];
				if(Ext.Date.format(rec1.get('workYmd'), MOST.config.Locale.getShortDate()) == Ext.Date.format(rec2.get('workYmd'), MOST.config.Locale.getShortDate())
						&& rec1.get('shftId') == rec2.get('shftId')
						&& rec1.get('hatchDrtCd') == rec2.get('hatchDrtCd')
						&& rec1.get('eqFacNo') == rec2.get('eqFacNo')
						&& rec1.get('hatchNo') == rec2.get('hatchNo')
						&& rec1.get('cgTpCd') == rec2.get('cgTpCd')
						&& Ext.Date.format(rec1.get('workStDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()) == Ext.Date.format(rec2.get('workStDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds())
						&& Ext.Date.format(rec1.get('workEndDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()) == Ext.Date.format(rec2.get('workEndDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds())){
					MessageUtil.warning('warning_msg', 'duplicatedata_msg');
					return false;
				}
			}
			
		}
		return true;
	},

	onValidation:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		
		var currAtu = me.getViewModel().get('theEqSet').get('currAtu');
		var shiftSeq = me.getViewModel().get('theEqSet').get('vslShiftingSeq');
		
        var bCheck = true;

		store.getModifiedRecords().forEach(function(record, index, array){
			bCheck = me.onValidationRecord(record);
			if(bCheck === false){
				return;
			}
		})

		return bCheck;
	},
	
	 /**
	 * VALIDATION METHOD END
	 * =========================================================================================================================
	 */
	
});


var saveTaskJob = new Ext.util.DelayedTask(function() {
	var me = this;
	me.onSaveTask();
});