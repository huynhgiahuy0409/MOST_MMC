Ext.define('MOST.view.planning.VesselWorkPlanController', {
	extend: 'MOST.view.foundation.BaseViewController',
	
	requires: [
	],

	alias: 'controller.vesselworkplan',	
	
	/**
	 * =========================================================================================================================
	 * VARIABLE/CONSTANT START
	 */
	
	MAX_HATCH_NO : 11,	// Hatch Setting
	/**
	 * VARIABLE/CONSTANT END
	 * =========================================================================================================================
	 */	
	
	MAIN_GRID_REF_NAME: 'refVesselWorkPlanGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'vesselWorkPlanStore',
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.planning.VesselWorkPlan');
		
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		me.onHatchDataSet();
	},
	
	 /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onSearch: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();
		var deckLocCombo = me.getStore('deckLocCombo');
		
		deckLocCombo.load();
		
    	if(params == null){
    		return;
    	}
    	
    	store.load({
			params: params,
			callback: function(records, operation, success) {
    			if(success){
    				if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
    			}
    		}
		});
	},
	
	onControlsInitialize: function(){
		var me = this;
		var refs = me.getReferences();
		var record = Ext.create('MOST.model.planning.VesselWorkPlan');
		
		me.getViewModel().set('theEquipmentSetting', record);

		refs.refBtnSave.setDisabled(true);
		refs.refBtnDelete.setDisabled(true);
		refs.refsEditTopClean.setDisabled(false);
		refs.refsEditFacility.setDisabled(false);
		refs.refsEditAPFP.setDisabled(false);
	},
	
	onVslWorkPlanGridClick: function() {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		refs.refVesselWorkPlanGrid.getPlugin('vesselWorkPLanEditor').cancelEdit();
		
		if(selection.get('craneNo') != null && selection.get('craneNo') != ''){
			refs.refCraneNo.getEditor().setEditable(false);
		}else{
			refs.refCraneNo.getEditor().setEditable(true);
		}
		
		if(selection.get('vslSeq') != null && selection.get('vslSeq') != ''){
			refs.refVslSeq.getEditor().setEditable(false);
		}else{
			refs.refVslSeq.getEditor().setEditable(true);
		} 
		
		if(selection.get('catgCd') == 'I'){
			if(selection.get('hatchNo') != null && selection.get('hatchNo') != ''){
				refs.refGridHatch.getEditor().setDisabled(true);
			}else{
				refs.refGridHatch.getEditor().setDisabled(false);
			}
			
			if(selection.get('deckLoc') != null && selection.get('deckLoc') != ''){
				refs.refDeckLock.getEditor().setDisabled(true);
			}else{
				refs.refDeckLock.getEditor().setDisabled(false);
			}
			
			if(selection.get('hatchSeq') != null && selection.get('hatchSeq') != ''){
				refs.refHatchSeq.getEditor().setEditable(false);
			}else{
				refs.refHatchSeq.getEditor().setEditable(true);
			}
		}else{
			refs.refGridHatch.getEditor().setDisabled(false);
			refs.refDeckLock.getEditor().setDisabled(false);
			refs.refHatchSeq.getEditor().setEditable(true);
		}
	},
	
	onCancelEdit : function(rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	}, 
	
	onAdd: function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var editor = grid.getPlugin('vesselWorkPLanEditor');
		var record = Ext.create('MOST.model.planning.VesselWorkPlan');
		var idx = 0;
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		editor.cancelEdit();

		grid.filters.clearFilters();
		grid.filters.disable();

		store.clearFilter();
		
		if (selection == null) {
			MessageUtil.warning('warning_msg', 'vesselworkplan_add_record_msg');
			return;
		} 
		
		idx = store.indexOfId(selection.get('id'));
		
		record.set('pod',selection.get('pod'));
		record.set('catgCd',selection.get('catgCd'));
		record.set('catgNm',selection.get('catgNm'));
		record.set('blSNNo',selection.get('blSNNo'));
		record.set('commodity',selection.get('commodity'));
		record.set('pkgType',selection.get('pkgType'));
		record.set('rmk',selection.get('rmk'));
		record.set('mt',selection.get('mt'));
		record.set('qty',selection.get('qty'));
		record.set('fwd',selection.get('fwd'));
		record.set('dgGoods',selection.get('dgGoods'));
		
		store.insert(idx, record);
		grid.getSelectionModel().select(record);

		store.commitChanges();
	},	
	
	onValidateEdit:	function(editor, context) {
		var me = this;
	},
	
	onEdit: function(editor, context){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		
		if(!me.onDuplicatedValidation(context.record)){
			return;
		}
		
		store.commitChanges();
	},
	
	onSave:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var updateArr = new Array();

		if(!me.onDuplicatedValidationForUpdating()){
			me.getView().getEl().unmask();
			return false;
		}
		
		store.each(function(record, index, array){
			if(!record.phantom){
				record.set('userId', MOST.config.Token.getUserId());
				updateArr.push(record.data);
			}
		});
		
		me.saveProcess(updateArr, false);
	},
	
	onRemove: function() { 
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME); 
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var blSNNo = selection.get('blSNNo');
		var qty = selection.get('qty');
		var mt = selection.get('mt');
		
		if(selection.get('craneNo') == null || selection.get('craneNo') == '' || selection.get('vslSeq') == null || selection.get('vslSeq') == ''){
			MessageUtil.warning('warning_msg', "vessel_work_plan_filled_in_data");
			return;
		}
		
		store.each(function(item){
			if(item != selection){
				if(item.get('blSNNo') == blSNNo && item.get('mt') == mt && item.get('qty') == qty){
					if(item.get('craneNo') == null || item.get('craneNo') == '' || item.get('vslSeq') == null || item.get('vslSeq') == '' ){
						MessageUtil.warning('warning_msg', "vessel_work_plan_filled_in_data");
						return;
					}else{
						item.set('craneNo','');
						item.set('vslSeq','');
						
						if(item.get('catgCd') == 'E'){
							item.set('hatchNo','');
							item.set('deckLoc','');
							item.set('hatchSeq','');
						}
					}
				}
			}
		})
		
		selection.set('craneNo','');
		selection.set('vslSeq','');
		
		if(selection.get('catgCd') == 'E'){
			selection.set('hatchNo','');
			selection.set('deckLoc','');
			selection.set('hatchSeq','');
		}

		store.commitChanges();
	},
	
	onRemoveAll: function() { 
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME); 
		
		store.each(function(item){
			item.set('craneNo','');
			item.set('vslSeq','');
			
			if(item.get('catgCd') == 'E'){
				item.set('hatchNo','');
				item.set('deckLoc','');
				item.set('hatchSeq','');
			}
		})
		
		store.commitChanges();
	},
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	

	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	
	onHatchDataSet: function(){
		var me = this;
		var store = me.getStore('hatchNoCombo');
		
		store.removeAll();

		for(var i = 0; i < me.MAX_HATCH_NO; i++){
			store.insert(i+1, [{scdNm: 'H' + (i+1),scd: 'H' + (i+1)}])
		}
		
		store.commitChanges();
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		var saChangeCombo = me.getStore('saChangeCombo');
		
		if(targetControl === 'ctlJpvc'){
			if(returnValue){
				me.getViewModel().setData({theEqSet: returnValue.item});
			}else{
				var store = me.getStore(me.MAIN_STORE_NAME);

				me.getViewModel().setData({theEqSet: null});
				
				store.removeAll();
				store.commitChanges();
				
				me.onControlsInitialize();
			}
		}
	},
	
	onValidCurAtb: function(startTime, endTime){
		var me = this;
		var refs = me.getReferences();
		var currAtb = me.getViewModel().get('theEqSet').get('currAtb'); 
		var result = true;
		
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
	
	setFmTimeByShift: function(shftId, workYmd){
		var me = this;
		var refs = me.getReferences();
		var shiftListStore = me.getStore('shiftList');
		var fmShiftTime;
		
		if(shiftListStore.loadCount <= 0){
			shiftListStore.load();
		}

		var shift = shiftListStore.findRecord('shftId', shftId);
		
		if(shift){
			fmShiftTime = Ext.Date.parse(workYmd + ' ' + shift.get('fmHhmm').substr(0,2) + ':' + shift.get('fmHhmm').substr(2,2),  'd/m/Y H:i');
		}
		
		return fmShiftTime;
	},
	
	setToTimeByShift: function(shftId, workYmd, fromShiftTime){
		var me = this;
		var refs = me.getReferences();
		var shiftListStore = me.getStore('shiftList');
		var toShiftTime;
		
		if(shiftListStore.loadCount <= 0){
			shiftListStore.load();
		}
		
		var shift = shiftListStore.findRecord('shftId', shftId);
		
		if(shift){
			toShiftTime = Ext.Date.parse(workYmd + ' ' + shift.get('toHhmm').substr(0,2) + ':' + shift.get('toHhmm').substr(2,2),  'd/m/Y H:i');
		}
		
		if(shftId == 'SF0013' || fromShiftTime > toShiftTime ){
			toShiftTime.setDate(toShiftTime.getDate() + 1);
		}
		
		return toShiftTime;
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

	onValidationRecord: function (record){
		var me = this;
		var refs = me.getReferences();
		var workYmd = record.get('workYmd');
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
	
	onDuplicatedValidation: function (record){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		
		for(var i = 0; i < store.data.length; i++){
			var rec = store.data.items[i];
			
			if(rec !== record){
				if(rec.get('craneNo') == record.get('craneNo')
						&& rec.get('vslSeq') == record.get('vslSeq')
						&& rec.get('hatchNo') == record.get('hatchNo')
						&& rec.get('deckLoc') == record.get('deckLoc')
						&& rec.get('hatchSeq') == record.get('hatchSeq')){
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

	onDuplicatedValidationForUpdating: function (){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		
		for(var i = 0; i < store.data.length; i++){
			var rec1 = store.data.items[i];
			
			for(var j = i+1; j < store.data.length; j++){
				var rec2 = store.data.items[j];
				if(rec2.get('craneNo') != null && rec2.get('craneNo') != ''){
					if(rec1.get('craneNo') == rec2.get('craneNo')
							&& rec1.get('vslSeq') == rec2.get('vslSeq')
							&& rec1.get('hatchNo') == rec2.get('hatchNo')
							&& rec1.get('deckLoc') == rec2.get('deckLoc')
							&& rec1.get('hatchSeq') == rec2.get('hatchSeq')){
						MessageUtil.warning('warning_msg', 'duplicatedata_msg');
						
						return false;
					}
				}
			}
		}
		
		return true;
	},
	
	saveProcess: function(arrItems){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var isCreate = false;
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		if(!arrItems || arrItems.length <= 0){
			return;
		}
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = isCreate;
		updateParm.set('workingStatus', isCreate ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('userId', MOST.config.Token.getUserId());
		updateParm.set('items', arrItems);

		updateParm.save({
			success: function(record) {
				store.commitChanges();
				MessageUtil.saveSuccess();
				me.onSearch();
			}
		});
	},
	
	getSearchCondition : function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		var vslCallId = searchParm.data.vslCallId;
		
		if(vslCallId != null && vslCallId != ''){ 
			params['vslCallId'] = vslCallId;
			params['sizePerPage'] = sizePerPage;
			params['sort'] = grid.getSortString();
		} else {
			MessageUtil.error('fail_msg', "customsCargoReleaseControl_vslCallId_msg");
			params = null;
		}
		
		return params;
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.controller.SearchVORDryBreakBulkParm';
		searchBizParm.serviceID = 'MOST.controller.getVORDryBreakBulk'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	}
});

/**
 * GENERAL METHOD END
 * =========================================================================================================================
 */

var saveTaskJob = new Ext.util.DelayedTask(function() {
	var me = this;
	me.onSave();
});