Ext.define('MOST.view.operation.VesselOprSettingController', {
	extend: 'MOST.view.foundation.BaseViewController',
	
	requires: [
	],

	alias: 'controller.vesseloprsetting',	
	
	/**
	 * =========================================================================================================================
	 * VARIABLE/CONSTANT START
	 */
	APFP_COMBO_STORE: 'apfpCombo',
	TOPCLEAN_COMBO_STORE: 'topCleanCombo',
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
	
	BREAK_DRY_BULK_COMBO_STORE: 'breakDryBulkCombo',
	RTS_STORE: 'equipmentSettingRts',
	MODE_ADD: 'C',
	MODE_UPD: 'U',

	Actions: {
		MainGridSelected: 'MainGridSelected',
		BtnClearCliked: 'BtnClearCliked',
	},
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var shiftListStore = me.getStore('shiftList');
		shiftListStore.load();
		
		me.onComboRest('commonCode');
		
		var record = Ext.create('MOST.model.operation.VesselOprSetting');
		me.getViewModel().set('theEquipmentSetting', record);
		
		var searchParm = Ext.create('MOST.model.operation.SearchVesselOprSettingParm');
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		me.setComboBoxWithLocalCache(CacheServiceConstants.TOP_CLEAN_COMBOBOX, me.TOPCLEAN_COMBO_STORE); 	// MOVE TYPE COMBO
		me.setComboBoxWithLocalCache(CacheServiceConstants.APFP_COMBOBOX, me.APFP_COMBO_STORE); 	// MOVE TYPE COMBO
		me.setComboBoxWithLocalCache(CacheServiceConstants.BREAK_DRY_BULK_COMBOBOX, me.BREAK_DRY_BULK_COMBO_STORE); 	// MOVE TYPE COMBO
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
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
    	
    	//me.onComboRest('info');
    	
    	store.load({
			params: params,
			callback: function(records, operation, success) {
    			if(success){
    				me.onControlsInitialize();
    			}
    		}
		});
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
	
	onDblClick: function() {
		var me = this;	
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if (selection == null) {
			return;
		} else {
			me.prevAddData.cgTpCd = selection.data.cgTpCd;
			me.setComboEditable();
		}
	},
	
	onSelectionChange: function(selectable, selectRecords, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection && selection.data.workYmd != null){
			if(!StringUtil.isNullorEmpty(selection.data.dptAgent)){
			}
		}
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
		
		refs.refBtnSave.setDisabled(false);
		refs.refCboBreakDryBulk.setDisabled(false);
		refs.refWorkYmd.setDisabled(false);
		refs.refCboShift.setDisabled(false);
		refs.refBtnCreate.setDisabled(false);
		
		me.onCheckTopClean();
		me.onCheckFacility();
		me.oncheckAPFP();
		me.onCheckEquipmentNo();
		//me.onLoadEquipmentNo();
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
	
	onChkAgent: function(checkbox, checked) {
		var me = this;
		var refs = me.getReferences();
		me.regChkAgentMode = checked;
	},

	onRts: function (obj){
		var me = this;
		var refBtn = obj.reference;

		if(refBtn === 'btnRts1'){
			confirmmessage = 'equipmentsetting_rts1';
		}
		if(refBtn === 'btnRts'){
			confirmmessage = 'equipmentsetting_rts';
		}
		
		MessageUtil.question('confirm', confirmmessage, null,
			function(button){
				if (button === 'ok') {
					me.processRST(obj);
				}
		});
	},
	
	processRST: function(obj){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.RTS_STORE); 
		var refBtn = obj.reference;

		var rtsDataItem = Ext.create('MOST.model.operation.VesselOprSetting');
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var theEqSet = me.getViewModel().get('theEqSet');
		var rts1Dt = rtsDt = null;
		
		if(!theEqSet){
			MessageUtil.error('fail_msg', "requiredJpvcmessage");
			return;
		}
		if(refBtn === 'btnRts1'){
			rts1Dt = new Date();
		}
		if(refBtn === 'btnRts'){
			rtsDt = new Date();
		}
		
		rtsDataItem.set('vslCd', theEqSet.get('vslCd'));
		rtsDataItem.set('callYear', theEqSet.get('callYear'));
		rtsDataItem.set('callSeq', theEqSet.get('callSeq'));
		rtsDataItem.set('vslCallId', theEqSet.get('vslCallId'));
		rtsDataItem.set('rts1Dt', rts1Dt);
		rtsDataItem.set('rtsDt', rtsDt);

		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('userId', MOST.config.Token.getUserId());
		updateParm.set('item', rtsDataItem.data);
		updateParm.save({
			success: function(record) {
				rtsDataItem.set('version', record.get('newVersion'));
				rtsDataItem.commit();
				theEqSet.set('rts1Dt', rtsDataItem.get('rts1Dt')? rtsDataItem.get('rts1Dt'):theEqSet.get('rts1Dt'));
				theEqSet.set('rtsDt', rtsDataItem.get('rtsDt')? rtsDataItem.get('rtsDt'):theEqSet.get('rtsDt'));
				MessageUtil.saveSuccess();
			}
		});
	},
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	

	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	
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
				workYmd: refs.refWorkYmd.getValue(),
				workStDt: refs.refWorkStDt.getValue(),
				workEndDt: refs.refWorkEndDt.getValue(),
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
	
	onComboRest: function(searchType){
		var me = this;
		var refs = me.getReferences();
		return;
		var equipmentBreakBulkAllComboSet = me.getStore('equipmentBreakBulkAllComboSet');
		
		var vslCallId = refs.ctlVslCallId.getValue();
    	var params;
		
		equipmentBreakBulkAllComboSet.load({
    		params: {
    			vslCallId: vslCallId,
    			searchType: searchType
    		},
    		callback: function(records, operation, success) {
    			if(success){
    				if(records.length > 0){
    					me.onComboStore(records[0].data);
    				}
    			}
    		}
		});
	},
	
	onComboStore:function(metaItem){
		var me = this;
		var refs = me.getReferences();
		var shiftCombo = me.getStore('opeShiftCombo');
		var equipmentCombo = me.getStore('equipmentCombo');
		var facilityCombo = me.getStore('facilityCombo');
		
		if(metaItem.shiftCombo){
			shiftCombo.setData(metaItem.shiftCombo);
			shiftCombo.insert(0, [{shftNm: 'All',shftId: ''}]);
		}
		
		if(metaItem.equipmentCombo){
			orgEquipmentArr = metaItem.equipmentCombo;
		}
		
		if(metaItem.facilityCombo){
			facilityCombo.setData(metaItem.facilityCombo);
			facilityCombo.insert(0, [{eqFacNm: 'All',eqFacNo: ''}]);
		}
		
		me.onHatchDataSet();
		
	},
	
	onHatchDataSet: function(){
		var me = this;
		var store = me.getStore('hatchNoCombo');
		
		store.removeAll();
		store.insert(0, [{cdNm: 'All',cd: ''}]);
		for(var i = 0; i < me.MAX_HATCH_NO; i++){
			store.insert(i+1, [{cdNm: 'H' + (i+1),cd: 'H' + (i+1)}])
		}
		store.commitChanges();
	},
	
	// this function later DEV
	validCurAtb: function(atb, fromDt, toDt){
		var me = this;
		var refs = me.getReferences();
		var result = true;
	},
	
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
	
	onGridComboRenderer: function(val, cell){
		var me = this;
        var refs = me.getReferences();
		var codeComboStore = null;
		var displayFieldName = '';
		var codeFieldName = '';
		
		if(cell.column.dataIndex == 'shftId'){
			codeComboStore = me.getViewModel().getStore('opeShiftCombo');
			var displayFieldName = 'shftNm';
			var codeFieldName = 'shftId';
		}
		
		if(cell.column.dataIndex == 'eqFacNo'){
			codeComboStore = me.getViewModel().getStore(me.MAIN_STORE_NAME);
			var displayFieldName = 'eqFacNm';
			var codeFieldName = 'eqFacNo';
		}

		if(codeComboStore != null){
			var indx = -1;
			
			if(cell.column.dataIndex == 'shftId'){
				indx = codeComboStore.find(codeFieldName, val);
				
			} else {
				indx = codeComboStore.find(codeFieldName, val);
			}
			
			if(cell.column.dataIndex == 'eqFacNo'){
			
				indx = codeComboStore.find(codeFieldName, val);
			}else{
				indx = codeComboStore.find(codeFieldName, val);
			}

			if (indx != -1){
				return codeComboStore.getAt(indx).get(displayFieldName); 
			}
		}
		
		return '';
	},
	
	setComboEditable: function(){
		var me = this;
		var refs = me.getReferences();
			
		if (me.prevAddData.cgTpCd === 'BBK') {
			refs.refHatchDrtCd.getEditor().setEditable(true);
			refs.refHatchDrtCd.getEditor().setDisabled(false);
			
			refs.refTopClean.getEditor().setEditable(false);
			refs.refTopClean.getEditor().setDisabled(true);
			refs.refTopClean.getEditor().setValue('');
			
			refs.refFacilityName.getEditor().setEditable(false);
			refs.refFacilityName.getEditor().setDisabled(true);
			refs.refFacilityName.getEditor().setValue('');
			
		} else {
			refs.refHatchDrtCd.getEditor().setEditable(false);
			refs.refHatchDrtCd.getEditor().setDisabled(true);
			refs.refHatchDrtCd.getEditor().setValue('');
			
			refs.refTopClean.getEditor().setEditable(true);
			refs.refTopClean.getEditor().setDisabled(false);
			
			refs.refFacilityName.getEditor().setEditable(true);
			refs.refFacilityName.getEditor().setDisabled(false);
		}
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
	
	onCheckImageRenderer: function(val, cell){
		var me = this;
        var refs = me.getReferences();
        
        if(cell.column.dataIndex == 'vslShiftingYN'){
 			if(val === 'Y'){
 				return 'V';
 			} else {
 				return '';
 			}
		}
	},
	
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
	
	onBreakDryBulkSet: function(field, value){
		var me = this;
		var refs = me.getReferences();
		if(field != null){
			if (value === 'BBK') {
				me.prevAddData.cgTpCd = 'BBK';
				//refs.refCboEquip.allowBlank = false;
				me.getEquipmentCode();
			} else {
				me.prevAddData.cgTpCd = 'DBK';
				me.prevAddData.eqTpCd = 'FC';
				//refs.refCboEquip.allowBlank = false;
			}
			//me.getEquipmentCode();
			
			me.onCheckEquipmentNo();
			me.onCheckTopClean();
			me.onCheckFacility();
			me.oncheckAPFP();
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
	
	onCheckEquipmentNo: function(){
//		var me = this;
//		var refs = me.getReferences();
//		var grid = me.lookupReference('refEquipmentSettingGrid');
//		var backgroundColor = '';
//		var blank = true;
//		if (refs.refCboBreakDryBulk.getValue() == 'DBK'){
//			backgroundColor = 'background-color: #c7e2fd;';
//			blank = false;
//        }
//		grid.down('[dataIndex=eqFacNo]').setEditor({
//			xtype: 'combo',
//			bind: {store: '{equipmentCombo}'},
//			queryMode: 'local',
//			reference:'refCboEquip',
//	        displayField: 'eqFacNm',
//	        valueField: 'eqFacNo',
//	        emptyText: me.lblGridEmptyTextAll,
//	        forceSelection : true,
//	        allowBlank : blank,
//	        fieldStyle: backgroundColor
//	    })
	},
	

	setGridColumnEditable:function(isCreate){
		var me = this;
		var refs = me.getReferences();

		if(isCreate){ // ADD
			refs.refCgTpCd.getEditor().setEditable(true);
			refs.refCgTpCd.getEditor().setDisabled(false);
		} else { // UPDATE
			refs.refCgTpCd.getEditor().setEditable(false);
			refs.refCgTpCd.getEditor().setDisabled(true);
		}
	},
	
	// logic confirm required - hold by HS 190212
	onValidCriteriaSearch: function(shiftComboValue, workDtValue){
		var me = this;
		var refs = me.getReferences();
		var vslCallId = refs.ctlVslCallId.getValue();
		var flg = false;
		
		if (vslCallId != '' && shiftComboValue != '' && workDtValue != null) {
			flg = true;
		} 
		return flg;
	},
	
	getEquipmentCodeFromWorkDate:function( e, newDate, oldDate, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		var equipmentCombo = me.getStore('equipmentCombo');
			
		var cgTp = refs.refCboBreakDryBulk.getValue();
		
		if(me.validCriteriaSearch()){				
			var equipCombo = me.getStore('equipCombo');
			var portCraneCombo = me.getStore('portCraneCombo');
			
			var params = {
					searchType:'equipment',
					workYmd: Ext.Date.format(refs.refWorkYmd.getValue(), MOST.config.Locale.getShortDate()),
					vslCallId: refs.ctlVslCallId.getValue(),
					shift: refs.refCboShift.getValue()
			}
			
			equipmentCombo.removeAll();
			equipCombo.load({
				params: params,
				callback:function(records, operation, success){
					if(success){
						portCraneCombo.setData(records[0].get('equipmentCombo'));
						
						refs.refCboEquip.setStore(portCraneCombo);
					}
				}
			})
		};
		
		me.onCheckEquipmentNo();
		//me.onLoadEquipmentNo();
		
		var selectedRecord = me.getViewModel().get('theEquipmentSetting');
		if(selectedRecord && selectedRecord.phantom){
			selectedRecord.set('workYmd', newDate);
			var workDate = Ext.Date.format(selectedRecord.get('workYmd'), MOST.config.Locale.getShortDate());
			selectedRecord.set('workStDt', (me.setFmTimeByShift(selectedRecord.get('shftId'), workDate)));
			selectedRecord.set('workEndDt', (me.setToTimeByShift(selectedRecord.get('shftId'), workDate)));
		}
	},
	
	getEquipmentCode:function(){
		var me = this;
		var refs = me.getReferences();
		var cgTp = refs.refCboBreakDryBulk.getValue();
		
		var equipmentBreakBulkAllComboSet = me.getStore('equipmentBreakBulkAllComboSet');
		var equipmentCombo = me.getStore('equipmentCombo');
		equipmentCombo.removeAll();
		
		if(me.validCriteriaSearch()){
			var equipCombo = me.getStore('equipCombo');
			var portCraneCombo = me.getStore('portCraneCombo');
			
			var params = {
					searchType:'equipment',
					workYmd: Ext.Date.format(refs.refWorkYmd.getValue(), MOST.config.Locale.getShortDate()),
					vslCallId: refs.ctlVslCallId.getValue(),
					shift: refs.refCboShift.getValue()
			}
			
			equipCombo.load({
				params: params,
				callback:function(records, operation, success){
					if(success){
						portCraneCombo.setData(records[0].get('equipmentCombo'));
						
						refs.refCboEquip.setStore(portCraneCombo);
					}
				}
			})
		};
		
		me.onCheckEquipmentNo();
		//me.onLoadEquipmentNo();

		var selectedRecord = me.getViewModel().get('theEquipmentSetting');
		if(selectedRecord && selectedRecord.phantom){
			var workDate = Ext.Date.format(selectedRecord.get('workYmd'), MOST.config.Locale.getShortDate());
			var fromShiftTime = me.setFmTimeByShift(selectedRecord.get('shftId'), workDate);
			selectedRecord.set('workStDt', (fromShiftTime));
			selectedRecord.set('workEndDt', (me.setToTimeByShift(selectedRecord.get('shftId'), workDate, fromShiftTime)));
		}
		
	},
	
	onLoadEquipmentNo: function(){
		var me = this;
		var refs = me.getReferences();
		var jpvc = refs.ctlVslCallId.getValue();
		var workDate = refs.refWorkYmd.getValue();
		var shift = refs.refCboShift.getValue();
		var equipmentCombo = me.getStore('equipmentCombo');
		
		var params = {
				staffType: 'ST',
				workYmd: Ext.Date.format(workDate, MOST.config.Locale.getShortDate()),
				shftId: shift,
				vslCallId: jpvc,
		};
		
		staffAndEquipmentDetailStore = me.getStore('staffAndEquipmentDetail');
		if (workDate != null && workDate != '' && shift != null && shift != ''){
			staffAndEquipmentDetailStore.load({
				params: params,
				callback:function(records, operation, success){
					if(success){
						equipmentCombo.setData(records[0].get('portCraneDeployedList'));
						equipmentCombo.insert(0, [{eqFacNm: 'All',eqFacNo: ''}]);
					}
				}
			})
		}
		else{
			equipmentCombo.removeAll();
			equipmentCombo.insert(0, [{eqFacNm: 'All',eqFacNo: ''}]);
		}
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
	
	exportTo: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
    	
        var cfg = Ext.merge({
            title: 'Equipment Setting',
            fileName: 'EquipmentSetting' + '.' + (btn.cfg.ext || btn.cfg.type)
        }, btn.cfg);

        var grid = refs.refEquipmentSettingGrid;
        grid.saveDocumentAs(cfg);
    },
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	
	
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
	},

	
	setFmTimeByShift: function(shftId, workYmd){
		var me = this;
		var refs = me.getReferences();
		
		var shiftListStore = me.getStore('shiftList');
		if(shiftListStore.loadCount <= 0){
			shiftListStore.load();
		}
		var shift = shiftListStore.findRecord('shftId', shftId);
		var fmShiftTime;
		
		if(shift){
			fmShiftTime = Ext.Date.parse(workYmd + ' ' + shift.get('fmHhMm').substr(0,2) + ':' + shift.get('fmHhMm').substr(2,2),  MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		}
		
		return fmShiftTime;
		
		var toShiftTime = Ext.Date.parse(workYmd + ' ' + shift.get('toHhMm').substr(0,2) + ':' + shift.get('toHhMm').substr(2,2),  MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		if(shftId == 'SF0013'){
			toShiftTime.setDate(toShiftTime.getDate() + 1);
		}
	},
	
	setToTimeByShift: function(shftId, workYmd, fromShiftTime){
		var me = this;
		var refs = me.getReferences();
		
		var shiftListStore = me.getStore('shiftList');
		if(shiftListStore.loadCount <= 0){
			shiftListStore.load();
		}
		var shift = shiftListStore.findRecord('shftId', shftId);
		var toShiftTime;
		if(shift){
			toShiftTime = Ext.Date.parse(workYmd + ' ' + shift.get('toHhMm').substr(0,2) + ':' + shift.get('toHhMm').substr(2,2),  MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		}
		
		if(shftId == 'SF0013' || fromShiftTime > toShiftTime ){
			toShiftTime.setDate(toShiftTime.getDate() + 1);
		}
		
		return toShiftTime;
		
	},
	
	validateWorkingTime:function(workYmd, workStDt,workEndDt, selectShift){
		var me = this;
		var refs = me.getReferences();
		var shiftFrom = me.setFmTimeByShift(selectShift, Ext.Date.format(workYmd, MOST.config.Locale.getShortDate()));
		var shiftTo = me.setToTimeByShift(selectShift, Ext.Date.format(workYmd, MOST.config.Locale.getShortDate()), shiftFrom);
		
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
		
//		var ogaStatus = refs.txtOgaStatus.getValue();
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
		
//		var ogaStatus = refs.txtOgaStatus.getValue();
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

	//For UPDATE (button SAVE):
	onSave:function(){
		var me = this;
		
		//Temp Remove by APC:
		/*
		me.getView().getEl().mask('Processing...');
		saveTaskJob.delay(300, null, me, null);*/
		
		me.onSaveTask();
	},
	
	//For UPDATE
	onSaveTask:function(){
		var me = this;
		var refs = me.getReferences();
		var currAtb = me.getViewModel().get('theEqSet').get('currAtb');
//		var ogaStatus = refs.txtOgaStatus.getValue();
		var store = me.getStore(me.MAIN_STORE_NAME);

		//Temp Remove by APC:
//		if(me.onOverlapped() == false){
//			MessageUtil.warning('fail_msg', "euqipmentsetting_overlapped");
//			me.getView().getEl().unmask();
//			return;
//		}
		
		if(!me.onValidation()){
			me.getView().getEl().unmask();
			return
		}
		
		if(!me.onDuplicatedValidationForUpdating()){
			me.getView().getEl().unmask();
			return false;
		}
		
		//Temp Remove by APC:
		/*if(currAtb != null){
			if(!StringUtil.isNullorEmpty(ogaStatus)){
				if(ogaStatus === 'HOLD' || ogaStatus === 'IN PROGRESS' || ogaStatus === 'N/A' || ogaStatus === 'REJECT'){
					var msg = "Application for health clearance is " + ogaStatus + ". Vessel is " + refs.txtOgaQuarantine.getValue() + ". Do you want to continue?";
					
					MessageUtil.question('ogaTitle', msg, null, function(button){
						if (button === 'ok') {
							store.sync({
								success:function(){
									MessageUtil.saveSuccess(); 
									
									me.getView().getEl().unmask();
									me.onSearch();
								}
							})
						}
					});
				}
				else{
					store.sync({
						success:function(){
							MessageUtil.saveSuccess();
							me.getView().getEl().unmask();
							me.onSearch();
						}
					})
				}
			}
		}*/
		
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
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		searchBizParm.classID = 'com.tsb.most.biz.parm.controller.SearchVORDryBreakBulkParm';
		searchBizParm.serviceID = 'MOST.controller.getVORDryBreakBulk'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE HHT START
	 */
	onTblBeforeshow: function(){
		var me = this;
		var refs = me.getReferences();
		
		if(!me.getViewModel().get('globalAtb')){
			MessageUtil.alert('Warning', 'tbl_hatchequip_atb_first');
			me.getView().close();
		}
	},
	
	onTblLoad: function(){
		var me = this;
		var refs = me.getReferences();
		

		if(!me.checkGlobalJpvcNo()){
			return;
		}
		var theHatchEq = Ext.create('MOST.model.operation.VesselOprSetting');
		me.getViewModel().set('theHatchEq', theHatchEq);
		
		me.onTblComboLoad('commonCode');

		
		me.setDisableControl(null);
		return;
		
		//Load OGA:
		var vesselStore =  me.getStore('vesselPopupStore');
		vesselStore.load({
			params:{
				vslCallId : me.getViewModel().get('globalVesselCallId'),
			},
			callback: function(records, operation, success) {
				if(success){
					if(records.length > 0){
						me.getViewModel().set('theVslCallId',records[0].data);
					}
				}
			}
		});
	},
	
	/**
	 * INITIALIZE HHT END
	 * =========================================================================================================================
	 */	
	
	/**
	 * =========================================================================================================================
	 * EVENT HHT HANDLER START
	 */
	onTblComboLoad: function(searchType){
		var me = this;
		var refs = me.getReferences();
		var glbVslCallId = me.getViewModel().get('globalVesselCallId');
		var equipmentBreakBulkAllComboSet = me.getStore('equipmentBreakBulkAllComboSet');
		var shiftCombo = me.getStore('opeShiftCombo');
		var hatchNoCombo = me.getStore('hatchNoCombo');

		//shiftCombo.load();
		hatchNoCombo.load();			

		var equipmentCombo = me.getStore('equipmentCombo');
		var equipmentCombo2 = me.getStore('equipmentCombo2');
		var facilityCombo = me.getStore('facilityCombo');

		me.setComboBoxWithLocalCache(CacheServiceConstants.APFP_COMBOBOX, me.APFP_COMBO_STORE);
		me.setComboBoxWithLocalCache(CacheServiceConstants.TOP_CLEAN_COMBOBOX, me.TOPCLEAN_COMBO_STORE);

		equipmentBreakBulkAllComboSet.load({
			params: {
				searchType: searchType,				
				vslCallId: glbVslCallId,
				//shift: me.getViewModel().get('globalWorkShift') //refs.refCbxShft.getValue(),
				//workYmd: me.getViewModel().get('globalWorkDate'),
				//workYmd: Ext.Date.format(refs.refDtWorkDate.getValue(),  MOST.config.Locale.getShortDate()),
			},
			callback: function(records, operation, success) {
				if(success){
					if(records.length > 0){
						var metaItem = records[0].data;
						if(metaItem.shiftCombo){
							shiftCombo.setData(metaItem.shiftCombo);
							shiftCombo.commitChanges();
							//shiftCombo.insert(0, [{shftNm: 'All',shftId: ''}]);
						}

						if(metaItem.equipmentCombo){
							equipmentCombo.setData(metaItem.equipmentCombo);
							equipmentCombo.commitChanges();
							//equipmentCombo.insert(0, [{eqFacNm: 'All',eqFacNo: ''}]);
						}
						/*user rollback enhance:
						 * if(metaItem.equipmentCombo2){
							equipmentCombo2.setData(metaItem.equipmentCombo2);
							equipmentCombo2.commitChanges();
						}*/
						if(metaItem.facilityCombo){
							facilityCombo.setData(metaItem.facilityCombo);
							facilityCombo.commitChanges();
							//facilityCombo.insert(0, [{eqFacNm: 'All',eqFacNo: ''}]);
						}
						
						//me.setWorkDateShift();
						me.onTblRetrieve();
					}
				}
			}
		});
	},
	
	// onTblHatchDataSet: function(){
	// 	var me = this;
	// 	var store = me.getStore('hatchNoCombo');
		
	// 	store.insert(0, [{cdNm: 'All',cd: ''}]);
	// 	for(var i = 0; i < me.MAX_HATCH_NO; i++){
	// 		store.insert(i+1, [{cdNm: 'H' + (i+1),cd: 'H' + (i+1)}])
	// 	}
	// 	store.commitChanges();
	// },
	
	onTblCargoRaidoChange: function(raidoField, eOpts){
		var me = this;
		var refs = me.getReferences();
		var cgTpCd = raidoField.getValue();
		
		//me.setEqStore(cgTpCd);
		me.setDisableControl(cgTpCd);
	},
	
	onTblRetrieve: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refHatchEqGrid;

		if(!me.checkGlobalJpvcNo()){
			return;
		}
		var glbVslCallId = me.getViewModel().get('globalVesselCallId');
		var store = me.getStore(me.MAIN_STORE_NAME);
		
		store.load({
			params: {
				vslCallId: glbVslCallId,
				searchType: 'info',
				shift: me.getViewModel().get('globalWorkShift'),
				workYmd: me.getViewModel().get('globalWorkDate'),
				rsDivCd: 'EQ'
				
			},
			callback: function(records, operation, success) {
				if(success){
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
				}
			}
		});

		//Load Cargo TopClean list:
		// var cgTCStore = me.getStore('detailCgTopCleanList');
		// cgTCStore.load({
		// 	params: {
		// 		vslCallId: glbVslCallId,
		// 	},
		// 	callback: function(records, operation, success) {
		// 		if(success){
					
		// 		}
		// 	}
		// });
		
		grid.setSelection(false);
		var theHatchEq = Ext.create('MOST.model.operation.VesselOprSetting');
		me.getViewModel().set('theHatchEq', theHatchEq);
		me.setStartEndTimeWithShift();
		me.onTblClear();
	},
	
	onTblSelectHatchEqGrid: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refHatchEqGrid;
		var selectedRow = grid.getSelection();
		if(!selectedRow){
			return;
		}
		var theDetail = selectedRow;
		var bbk = (theDetail.get('cgTpCd') === 'BBK' ? true : false);
		var dbk = (theDetail.get('cgTpCd') === 'DBK' ? true : false);
		
		//refs.refDtWorkDate.setValue(theDetail.workYmd);
		//refs.refCbxShft.setValue(theDetail.shftId);
		//Set viewModel:
		me.getViewModel().set('theHatchEq', selectedRow);

		refs.refCgTypeRadioBBK.setChecked(bbk);
		refs.refCgTypeRadioDBK.setChecked(dbk);

		me.setDisableControl(me.Actions.MainGridSelected);
	},
	
	//Button:
	onTblClear: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refHatchEqGrid;
		var theHatchEq = Ext.create('MOST.model.operation.VesselOprSetting');
		
		grid.setSelection(false);
		me.getViewModel().set('theHatchEq', theHatchEq);
		me.setWorkDateShift();

		me.setDisableControl(me.Actions.BtnClearCliked);
	},
	
	setStartEndTimeWithShift: function(){
		var me = this;
		var refs = me.getReferences();
		var refStartTime = refs.refStartrTime;
		var refEndTime = refs.refEndTime;

		/*var shift = refs.refCbxShft.getSelection();
		var strWKDate = Ext.Date.format(refs.refDtWorkDate.getValue(), MOST.config.Locale.getShortDate());
		var strStartDt = strWKDate + ' ' + shift.get('fmHhMm').substr(0,2) + ':' + shift.get('fmHhMm').substr(2,4);
		var strEndDt = strWKDate + ' ' + shift.get('toHhMm').substr(0,2) + ':' + shift.get('toHhMm').substr(2,4);*/
		
		var strWKDate = me.getViewModel().get('globalWorkDate');
		var shift = me.getViewModel().get('globalWorkShiftInfo');
		
		var strStartDt = strWKDate + ' ' + shift.fmHhMm.substr(0, 2) + ':' + shift.fmHhMm.substr(2, 4);
		var strEndDt = strWKDate + ' ' + shift.toHhMm.substr(0, 2) + ':' + shift.toHhMm.substr(2, 4);
		

		//if(shift.get('shftId') === 'SF0013'){
		if(shift.shftId === 'SF0013'){
			var temp = Ext.Date.parse(strEndDt, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			var endShftDTime = new Date(temp.getTime() + (24 * 60 * 60 * 1000));
			strEndDt = Ext.Date.format(endShftDTime, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		}

		theEqSetting = me.getViewModel().get('theHatchEq');
		theEqSetting.set('workStDt', Ext.Date.parse(strStartDt, MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		theEqSetting.set('workEndDt', Ext.Date.parse(strEndDt, MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
	},
	
	onTblCreate: function(){
		var me = this;
		var refs = me.getReferences();
		//Validate Form:
		var detailForm = refs.refFrmDetail.validate();
		//Check required field:
		if(!detailForm){
			MessageUtil.warning("warning_msg", "tbl_hatchequip_missing_require");
			return;
		}

		var detailData = me.makeTblEqmentItem(me.MODE_ADD);

		//Check time with shift rule:
		if(!me.validateTimeShift (detailData)){
			return;
		}
		//Object.keys(detailData).map(k => detailData[k] = typeof detailData[k] == 'string' ? detailData[k].trim() : detailData[k]);
		//Process Create:
		//Validate Overlap decalre: isOverlapped
		// this.validateData(detailData, function(){
		// 	if(masterItem.data != null){
		// 		var proxy = masterItem.getProxy();
		// 		proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseloprsetting/list';
		// 		masterItem.set("workingStatus", "C");			
		// 		masterItem.set('newVersion', me.generateUuid());			
		// 		MessageUtil.questionModern('tbl_confrm_add', 'tbl_hatchequip_addnew', null, function(button){
		// 			if(button === 'ok'){
		// 				masterItem.save({
		// 					success:function(){
		// 						MessageUtil.saveSuccess();
		// 						masterItem.commit();
		// 						MessageUtil.saveSuccess();
		// 						me.onTblRetrieve();
		// 						me.onTblClear();
		// 					}
		// 				});
		// 			}
		// 		});
		// 	}
		// });

		// if(masterItem.data != null){
		// 	var proxy = masterItem.getProxy();
		// 	proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseloprsetting/list';
		// 	masterItem.set("workingStatus", "C");			
		// 	masterItem.set('newVersion', me.generateUuid());			
		// 	MessageUtil.questionModern('tbl_confrm_add', 'tbl_hatchequip_addnew', null, function(button){
		// 		if(button === 'ok'){
		// 			masterItem.save({
		// 				success:function(){
		// 					MessageUtil.saveSuccess();
		// 					masterItem.commit();
		// 					MessageUtil.saveSuccess();
		// 					me.onTblRetrieve();
		// 					me.onTblClear();
		// 				}
		// 			});
		// 		}
		// 	});
		// }

		var store = me.getStore(me.MAIN_STORE_NAME);
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var isCreated = detailData.phantom;
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('userId', MOST.config.Token.getUserId());
		updateParm.set('item', detailData.data);
		
		MessageUtil.questionModern('tbl_confrm_add', 'tbl_hatchequip_addnew', null, function(button){
			if(button === 'ok'){
				updateParm.save({
					success: function(){
						MessageUtil.saveSuccess();
							detailData.commit();
							MessageUtil.saveSuccess();
							me.onTblRetrieve();
							me.onTblClear();
					}
				});
			}
		});
	},
	
	onTblUpdate: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = refs.refHatchEqGrid;

		//Validate Form:
		var detailForm = refs.refFrmDetail.validate();
		
		var selectedRecord = grid.getSelection();
		if(!selectedRecord){
			MessageUtil.warning("warning_msg", "tbl_hatchequip_select_update");
			return;
		}

		//Check required field:
		if(!detailForm){
			MessageUtil.warning("warning_msg", "tbl_hatchequip_missing_require");
			return;
		}
				
		var sltIndex = grid.store.indexOf(selectedRecord);
		var editItem = me.makeTblEqmentItem(me.MODE_UPD);
			
		//Check time with shift rule:
		if(!me.validateTimeShift (editItem)){
			return;
		}
		
		//Validate Overlap decalre: isOverlapped
		// this.validateData(editItem, function(){
		// 	store.each(function (record, index){
		// 		if(index === sltIndex){
		// 			record = editItem;
		// 			record.dirty = true;
		// 		}
		// 	});
			
		// 	MessageUtil.questionModern('tbl_confrm_update','tbl_hatchequip_update', null,function(button){
		// 		if(button == 'ok'){
		//			me.saveProcessHHT(editItem);
		// 		}
		// 	});
		// });

		me.saveProcessHHT(editItem);
	},
	
	saveProcessHHT: function(editItem){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		
		var isCreate = false;
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = isCreate;
		updateParm.set('workingStatus', isCreate ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('userId', MOST.config.Token.getUserId());
		updateParm.set('item', editItem.data);

		updateParm.save({
			success: function(record) {
				me.onTblRetrieve();
				MessageUtil.saveSuccess();
			}
		});
	},
	
	makeTblEqmentItem: function (mode){
		var me = this;
		var refs = me.getReferences();
		var detailData = me.getViewModel().get('theHatchEq');
		
		var workStDt = Ext.Date.parse(refs.refStartrTime.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var workEndDt = Ext.Date.parse(refs.refEndTime.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var workStDtStr = Ext.Date.format(workStDt, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var workEndDtStr = Ext.Date.format(workEndDt, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());

		var workDate = Ext.Date.parse(me.getViewModel().get('globalWorkDate'), MOST.config.Locale.getShortDate()); //refs.refDtWorkDate.getValue();
		var shftId = me.getViewModel().get('globalWorkShift'); //refs.refCbxShft.getValue();
		var cgTpCd = me.getRaidoCgTpCdValue(); //refs.refCgTypeRadioGrp.getValues().cgType;
		
		detailData.set('workStDt', workStDt);
		detailData.set('workEndDt', workEndDt);
		detailData.set('workStDtStr', workStDtStr);//String
		detailData.set('workEndDtStr', workEndDtStr);//String
		detailData.set('workYmd', workDate);
		detailData.set('sWorkYmd', Ext.Date.format(workDate, MOST.config.Locale.getYmd()));//String
		detailData.set('shftId', shftId);
		detailData.set('cgTpCd', cgTpCd);
		
		if(mode == 'C'){
			detailData.set('seq', '');
			detailData.set('rsDivCd', 'EQ');
			detailData.set('vslCallId', me.getViewModel().get('globalVesselCallId'));
			detailData.set('vslCd', me.getViewModel().get('globalVesselCd'));
			detailData.set('callYear', me.getViewModel().get('globalVesselCallYear'));
			detailData.set('callSeq', me.getViewModel().get('globalVesselCallSeq'));
			detailData.phantom = true;
		}
		return detailData;
	},
	
	onTblDelete: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = refs.refHatchEqGrid;
		
		var selectedRecord = grid.getSelection();
		if(!selectedRecord){
			MessageUtil.warning('Warning', 'tbl_hatchequip_select_delete');
			return;
		}
		
		var sltIndex = grid.store.indexOf(selectedRecord);
		MessageUtil.questionModern('tbl_confrm_delete', 'tbl_hatchequip_delete',null,
			function(button){
				if (button === 'ok') {
					store.each(function (record, index){
						if(index === sltIndex){
							store.remove(record);
						}
					});
					store.sync({
						success:function(){
							MessageUtil.saveSuccess();
							me.onTblClear();
						}
					});
				}else if(button === 'cancel'){
					return;
				};
			}
		);
	},
	
	onShowHideCargoTopCleanHHT: function(btn){
		var me = this;
		var refs = me.getReferences();
		refs.refDetailControl.setHidden(btn.reference === 'btnShowCargoTopClean');
		refs.refHatchEqGrid.setHidden(btn.reference === 'btnShowCargoTopClean');
		refs.refButtonContainer.setHidden(btn.reference === 'btnShowCargoTopClean');
		refs.refOGAInfoContainer.setHidden(btn.reference === 'btnShowCargoTopClean');
		refs.refCgTypeRadioBBK.setHidden(btn.reference === 'btnShowCargoTopClean');
		refs.refCgTypeRadioDBK.setHidden(btn.reference === 'btnShowCargoTopClean');
		
		refs.refDetailCargoTopClean.setHidden(!(btn.reference === 'btnShowCargoTopClean'));
	},
	
	/*
	 *============= EVENT HHT HANDLER END =============
	 * 
	 **/
	
	/*
	 * ============= TABLET GENERAL METHOD START =============
	 * */	
	setWorkDateShift: function(){
		var me = this;
		var refs = me.getReferences();
		var workDate =  MOST.config.Token.getWorkDate();
		var workShift =  MOST.config.Token.getWorkShift();
		//refs.refDtWorkDate.setValue(Ext.Date.format(workDate,MOST.config.Locale.getShortDate()));
		//refs.refCbxShft.setValue(workShift);
		me.setStartEndTimeWithShift();
	},
	
	setDisableControl: function(action){
		var me = this;
		var refs = me.getReferences();

		cgTpCd = me.getRaidoCgTpCdValue();

		//BBK disable Facility and Top/Clean
		//DBK disable AP/FP 
		var bbk = (cgTpCd === 'BBK' ? true : false);
		var dbk = (cgTpCd === 'DBK' ? true : false);
		refs.refFacility.setDisabled(bbk);
		refs.refTopClean.setDisabled(bbk);
		refs.refCbhatchDrtCd.setDisabled(dbk);
		//If DBK: EqNo is required:
		//refs.refEqNo.setRequired(dbk);

		if(bbk){
			refs.refFacility.reset();
			refs.refTopClean.reset();
		}
		if(dbk){
			refs.refCbhatchDrtCd.reset();
		}

		if(action === me.Actions.MainGridSelected){
			refs.refCgTypeRadioBBK.setDisabled(true);
			refs.refCgTypeRadioDBK.setDisabled(true);
			refs.refBtnCreateHHT.setDisabled(true);
			refs.btnUpdateHHT.setDisabled(false);
			refs.btnDeleteHHT.setDisabled(false);

		}else if(action === me.Actions.BtnClearCliked){
			refs.refCgTypeRadioBBK.setDisabled(false);
			refs.refCgTypeRadioDBK.setDisabled(false);
			refs.refBtnCreateHHT.setDisabled(false);
			refs.btnUpdateHHT.setDisabled(true);
			refs.btnDeleteHHT.setDisabled(true);
		}
	},
	
	getRaidoCgTpCdValue(){
		var me = this;
		var refs = me.getReferences();
		if(refs.refCgTypeRadioBBK.getChecked())
			return refs.refCgTypeRadioBBK.getValue();
		if(refs.refCgTypeRadioDBK.getChecked())
			return refs.refCgTypeRadioDBK.getValue();
		
	},
	
	validateTimeShift: function(editItem){
		var me = this;
		var refs = me.getReferences();
		
		//var sltedShift = refs.refCbxShft.getSelection().data;

		var sltedShift = me.getViewModel().get('globalWorkShiftInfo');

		var strShftDt = Ext.Date.format(MOST.config.Token.getWorkDate(), MOST.config.Locale.getShortDate());
		//var sltedShift = me.getViewModel().get('globalWorkShiftInfo');
		//var strShftDt = me.getViewModel().get('globalWorkDate');
		
		var stShftDTime = null;
		var endShftDTime = null;
		var atu = me.getViewModel().get('globalAtu');
		
		//var strFromDt = strShftDt+' '+sltedShift.get('fmHhMm').substr(0,2)+':'+sltedShift.get('fmHhMm').substr(2,4);
		//var strToDt = strShftDt+' '+sltedShift.get('toHhMm').substr(0,2)+':'+sltedShift.get('toHhMm').substr(2,4);
		
		var strFromDt = strShftDt + ' '+ sltedShift.fmHhMm.substr(0,2) + ':' + sltedShift.fmHhMm.substr(2,4);
		var strToDt = strShftDt + ' ' + sltedShift.toHhMm.substr(0,2) + ':' + sltedShift.toHhMm.substr(2,4);
		
		stShftDTime =  Ext.Date.parse(strFromDt,  MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		endShftDTime = Ext.Date.parse(strToDt, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		
		//if(sltedShift.get('shftId') === 'SF0013'){
		if(sltedShift.shftId === 'SF0013'){
			endShftDTime = new Date(endShftDTime.getTime() + (24 * 60 * 60 * 1000));
		}
		
		var inputStDTime = Ext.Date.parse(refs.refStartrTime.getValue(),  MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var inputEndDTime = Ext.Date.parse(refs.refEndTime.getValue(),  MOST.config.Locale.getDefaultDateFormatWithNoSeconds());

		if(!refs.refEndTime.getValue() && (inputStDTime < stShftDTime || inputStDTime > endShftDTime)){
			MessageUtil.warning('warning_msg', 'tbl_hatchequip_timeshift');
			return false;
		}
		
		if(inputStDTime < stShftDTime || inputEndDTime > endShftDTime){
			MessageUtil.warning('warning_msg', 'tbl_hatchequip_timeshift');
			return false;
		}
		if(refs.refEndTime.getValue() && inputStDTime >= inputEndDTime){
			MessageUtil.warning('warning_msg', 'tbl_hatchequip_validtime');
			return false;
		}
		if(atu && atu < inputEndDTime){
			var atuStr = Ext.Date.format(atu, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			MessageUtil.warning('warning_msg', 'tbl_hatchequip_validtimewithatu', atuStr);
			return false;
		}
		return true;
	},
	
	//Validate Hatch Equipment Overlap time:
	validateData: function (theData, callBackFn){
		var me = this;
		var refs = me.getReferences();
		var validStore = me.getStore('equipmentSettingValidate');
		var workStDt = Ext.Date.format(theData.get('workStDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var workEndDt = Ext.Date.format(theData.get('workEndDt') , MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var workYmd = Ext.Date.format(theData.get('workYmd') , MOST.config.Locale.getYmd());
		validStore.load({
			params:{
				vslCallId: theData.get('vslCallId'),
				shftId: theData.get('shftId'),
				//cgTpCd: theData.get('cgTpCd'),
				hatchNo: theData.get('hatchNo'),
				//eqFacNo: theData.get('eqFacNo'),
				//hatchDrtCd: theData.get('hatchDrtCd'),
				//workStDt: workStDt,
				//workEndDt: workEndDt,
				workYmd: workYmd,
				seq: theData.get('seq'),
				
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						if(records[0].get('count') >= 1){
							/*MessageUtil.warning('warning_msg', 'tbl_hatchequip_blockAddUpdate');
							return;*/
							//User permit to add duplicate:
							MessageUtil.questionModern('tbl_confrm_save', 'tbl_hatchequip_continueAddUpdate',null,
								function(button){
									if (button === 'ok') {
										callBackFn();
									}else if(button === 'cancel'){
										return;
									};
								}
							);
							
						} else{
							callBackFn();
						}
						
					}
				}
			}
		});	
	},
	
	checkGlobalJpvcNo: function(){
		var me = this;
		var refs = me.getReferences();
		var globalVesselCallId = me.getViewModel().get('globalVesselCallId');
		if(!globalVesselCallId){
			MessageUtil.warning('warning_msg', 'tbl_global_jpvc_selected');
			return false;
		}
		return true;
	},
	
});


var saveTaskJob = new Ext.util.DelayedTask(function() {
	var me = this;
	me.onSaveTask();
});