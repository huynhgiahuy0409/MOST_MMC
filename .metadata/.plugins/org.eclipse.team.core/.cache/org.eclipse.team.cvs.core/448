Ext.define('MOST.view.operation.hht.VesselDelayController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.vesseldelayhht',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_DATE_PERIOD : 7,	// MAX PERIOD DATE
	MAIN_GRID_REF_NAME: 'refVesselDelayGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'vesselDelayList',
	APFP_COMBO_STORE: 'apfpCombo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */

	

	/**
	 * =========================================================================================================================
	 * INITIALIZE END
	 */
	 onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var comboStore = me.getStore('vesselDelayCombo');
		var hatchNoStore = me.getStore('hatchNoCombo');
		var equipmentStore = me.getStore('equipmentCombo');
		var shiftStore = me.getStore('shiftCombo');
		var recvData = me.getView().recvData;
		
		me.getViewModel().set('theDelay', 	Ext.create('MOST.model.operation.VesselDelay'));
		
		comboStore.load({
			params: {
				searchType : 'comboList'
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						shiftStore.setData(records[0].get('shiftList'));
						shiftStore.insert(0, [{shftNm: 'All',shftId: ''}]);
						
						hatchNoStore.setData(records[0].get('hatchNoList'));
						hatchNoStore.insert(0, [{scdNm: 'All',scd: ''}]);
						
						equipmentStore.setData(records[0].get('equipmenNoList'));
						equipmentStore.insert(0, [{eqNm: 'All',eqNo: ''}]);
					}
				}
			}
		});
		
		var searchParm = Ext.create('MOST.model.operation.SearchVesselDelayParm');
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		me.setComboBoxWithLocalCache(CacheServiceConstants.APFP_COMBOBOX, me.APFP_COMBO_STORE); 	// MOVE TYPE COMBO
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		if(recvData != null || recvData != undefined){
			refs.ctlJpvc.setValue(recvData.vslCallId);
	     	refs.ctlShiftCombo.setValue(recvData.shftId);
//	     	refs.ctlJpvc.setValue(recvData.vslCallId);
	     	refs.ctlWorkYmdField.setValue(recvData.workYmd);
			refs.ctlHatchCombo.setValue(recvData.hatchNo);
	     	me.onSearch();
		}

		me.setVessel();
	},

	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */

	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore('vesselDelayList');
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					me.getView().getEl().unmask();
					me.onClear();
					
					//me.getEquipmentSettingList();
				}
			}
		});
	},

	onOpenDelayCodePopup:function(field, button, e){
		var me = this;
		var refs = me.getReferences();
		var params = {
			lcd: 'BBK'
		};
		me.openCodePopup('popup-delaycodepopup', 'refTxtDelayCode', params);
	},

	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'ctlJpvc'){ // JPVC Popup
			if(returnValue){
				me.getViewModel().setData({theVsl:returnValue.item});
				//me.onGettingHatchAndEq();
				me.setVessel(returnValue.code);
				//me.getEquipmentSettingList();
				me.onSearch();
				
			}else{
				me.getViewModel().setData({theVsl:null});
			}
		}else if(targetControl === 'refTxtDelayCode'){
			refs.refTxtDelayCode.setValue(returnValue.rsnCd);
			refs.refTxtDelayCodeName.setValue(returnValue.rsnCdNm);
			refs.refTxtAcptYN.setValue(returnValue.acptYN);
			
			// if(returnValue.rsnCd.substring(0,1) === 'E'){
			// 	refs.refTxtContractor.setDisabled(false);
			// }else{
			// 	refs.refTxtContractor.setValue('');
			// 	refs.refTxtContractor.setDisabled(true);
			// }
			
		}else if(targetControl === 'refTxtContractor'){
			if(returnValue){
				refs.refTxtContractor.setValue(returnValue.code);
			}
			
		}else if(targetControl === 'refTxtTblContractor'){
			if(returnValue){
				refs.refTxtTblContractor.setValue(returnValue.code);
			}
			
		} else if (targetControl === 'refVesselDelayCode') {
			refs.refVesselDelayCode.setValue(returnValue.rsnCd);
			refs.refVesselDelayDescription.setValue(returnValue.rsnCdNm);
			refs.refVesselDelayAccepted.setValue(returnValue.acptYN);
		} else if(targetControl === 'refVesselDelayStevedore'){
			refs.refVesselDelayStevedore.setValue(returnValue.code);
		}
	},

	onVerify:function(){
		var me = this;
		var store = me.getStore('vesselDelayList');
		var refs = me.getReferences();
		var arrItems = new Array();
		var grid = me.lookupReference('refVesselDelayGrid');
		var editor = grid.getPlugin('vesselDelayGridEditor');
		var masterItem = Ext.create('MOST.model.operation.VesselDelay');
		var selectedGrid = false;
		var valid = true;

		store.each(function(record,index){
			if(record.data.itChk && (record.data.verifyStatus != 'VERIFIED')){
				record.data.verifyStatus = 'VERIFIED';
				record.data.verifyBy = MOST.config.Token.getUserId();
				
				arrItems.push(record.data);
			}
		});
		
		if(masterItem.dirty||arrItems.length>0){
			var proxy = masterItem.getProxy();
			proxy.url= MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseldelay/verified';
			masterItem.set("items",arrItems);
			masterItem.save({
				success:function(){
					store.reload();
					MessageUtil.saveSuccess();
				}
			});
		}else{
			MessageUtil.warning("Vessel Delay", "vesselDelay_nodata_save_msg");
			return;
		}
	},

	onChangeDelayDate:function( e, newDate, oldDate, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refVesselDelayGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		var selectedRecord = me.getViewModel().get('theDelay');
		// if(selectedRecord){
		// 	var workDate = Ext.Date.format(newDate, 'd/m/Y');
		// 	var formShiftTime = me.setFmTimeByShift(selectedRecord.get('shftId'), workDate);
		// 	refs.refStartDate.setValue(formShiftTime);
		// 	refs.refEndDate.setValue((me.setToTimeByShift(selectedRecord.get('shftId'), workDate, formShiftTime)));
		// }

		if(selection){
			selection.set('inptDt', Ext.Date.format(newDate, 'd/m/Y'));
		}
	},

	updateDelayStartDate:function(value){
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference('refVesselDelayGrid');
		if (Ext.isClassic) {
			var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		} else {
			var selection = grid.getSelection();
		}

		var startDt = refs.refStartDate.getValue();
		var endDt = refs.refEndDate.getValue();

		if (typeof startDt === 'string' && typeof endDt === 'string') {
			startDt = me.convertStringToDate(startDt);
			endDt = me.convertStringToDate(endDt);
		}
		if(startDt && endDt && startDt >= endDt){
			MessageUtil.alert('Warning', 'vesselDelay_start_end_time_msg');
			refs.refStartDate.setValue(null);
			return;
		}else{
			refs.refHrsMins.setValue(me.getHrsMin(startDt, endDt));
		}
		
		if(!selection) 
			return;
		selection.set('stDt', Ext.Date.format(startDt, MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));

		// var totalHRS = me.getTotalHRS(selection);
		// if(totalHRS != selection.get('totalHRS')){
		// 	selection.set('totalHRS',	totalHRS);
		// 	selection.commit();
		// }
	},

	updateDelayEndDate:function(value){
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference('refVesselDelayGrid');
		if (Ext.isClassic) {
			var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		} else {
			var selection = grid.getSelection();
		}
		
		var startDt = refs.refStartDate.getValue();
		var endDt = refs.refEndDate.getValue();

		if (typeof startDt === 'string' && typeof endDt === 'string') {
			startDt = me.convertStringToDate(startDt);
			endDt = me.convertStringToDate(endDt);
		}
		if(startDt && endDt && startDt >= endDt){
			MessageUtil.alert('Warning', 'vesselDelay_start_end_time_msg');
			refs.refEndDate.setValue(null);
			return;
		}else{
			refs.refHrsMins.setValue(me.getHrsMin(startDt, endDt));
		}

		if(!selection) 
			return;
		selection.set('endDt', Ext.Date.format(endDt, MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		
		// var totalHRS = me.getTotalHRS(selection);
		// if(totalHRS != selection.get('totalHRS')){
			//selection.set('totalHRS',	totalHRS);
			//selection.commit();
		// }
	},

	onClear: function(){
    	var me = this;
    	var refs = me.getReferences();

    	refs.refInputDate.suspendEvents();
    	refs.refStartDate.suspendEvents();
    	refs.refEndDate.suspendEvents();
    	
    	me.getViewModel().set('theDelay', 	Ext.create('MOST.model.operation.VesselDelay'));
    	refs.refBtnSave.setDisabled(true);
    	refs.refBtnCreate.setDisabled(false);
    	
    	refs.refInputDate.setValue('');
    	refs.refStartDate.setValue('');
    	refs.refEndDate.setValue('');

    	refs.refInputDate.resumeEvents();
    	refs.refStartDate.resumeEvents();
    	refs.refEndDate.resumeEvents();
    }, 	

	onGridClick: function(){
		var me = this;
		var refs = me.getReferences();

		var grid = me.lookupReference('refVesselDelayGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(!selection) 
			return;
		me.getViewModel().set('theDelay',selection);
		
		refs.refInputDate.suspendEvents();
		refs.refStartDate.suspendEvents();
		refs.refEndDate.suspendEvents();

		// refs.refInputDate.setValue();
		// refs.refStartDate.setValue();
		// refs.refEndDate.setValue();

		refs.refInputDate.setValue(Ext.Date.parse(selection.get('inptDt'), MOST.config.Locale.getShortDate()));
		refs.refStartDate.setValue(Ext.Date.parse(selection.get('stDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		refs.refEndDate.setValue(Ext.Date.parse(selection.get('endDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));

		refs.refBtnSave.setDisabled(false);
		refs.refBtnDelete.setDisabled(false);		

		refs.refInputDate.resumeEvents();
		refs.refStartDate.resumeEvents();
		refs.refEndDate.resumeEvents();		
	},

	onChecked : function (model, record, index, eOpts) {
		if(record.data.itChk){
			record.data.itChk=false;
		}
		else{
			record.data.itChk=true;
		}
    },

	onAdd: function(){
    	var me = this;
    	addDelayTask.delay(300, null, me, [me]);
	},
	
	onAddEvent: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('vesselDelayList');
		var record = me.getViewModel().get('theDelay');
		
		if(refs.ctlJpvc.getValue() === null || refs.ctlJpvc.getValue() === ''){
			MessageUtil.info('Warning', 'vorExistedVslCallId');
			return;
		}else{
			if(record.phantom){
				var newRecord = Ext.create('MOST.model.operation.VesselDelay');
				newRecord.set("userId", 	MOST.config.Token.getUserId());
				newRecord.set("vslCallId", 	refs.ctlJpvc.getValue());
				newRecord.set('inptDt', 	Ext.Date.format(refs.refInputDate.getValue(), 	MOST.config.Locale.getShortDate()));
				newRecord.set('stDt', 		Ext.Date.format(refs.refStartDate.getValue(), 	MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
				newRecord.set('endDt', 		Ext.Date.format(refs.refEndDate.getValue(), 	MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
				newRecord.set('shftId', 	refs.refShiftId.getValue());
				newRecord.set('shftNm', 	refs.refShiftId.getDisplayValue());
				newRecord.set('hatchNo', 	refs.refVesselDelayHatchNo.getValue());
				newRecord.set('eqNo', 		refs.refVesselDelayEquipmentNo.getValue());
				newRecord.set('rsnCd', 		refs.refTxtDelayCode.getValue());
				newRecord.set('rsnCdNm', 	refs.refTxtDelayCodeName.getValue());
				newRecord.set('acptYN', 	refs.refTxtAcptYN.getValue());
				newRecord.set('hatchDrtCd', refs.refVesselDelayHatchDrtC.getValue());
				newRecord.set('contractor', refs.refTxtContractor.getValue());
				newRecord.set('rmk', 		refs.refVslDelayRemark.getValue());
				newRecord.set('hrs', 		refs.refHrsMins.getValue().split(':')[0]);    
				newRecord.set('mins', 		refs.refHrsMins.getValue().split(':')[1]);

				me.getViewModel().set('theDelay', newRecord);
				if(me.validationRecord(newRecord)){
					store.insert(0, newRecord);
					
				}
			}else{
				var newRecord = record.clone();
				var newRecord1 = Ext.create('MOST.model.operation.VesselDelay');
				newRecord.id = newRecord1.id;
				newRecord.phantom = true;

				newRecord.set("userId", 	MOST.config.Token.getUserId());
				newRecord.set("vslCallId", 	refs.ctlJpvc.getValue());
				newRecord.set('shftNm', 	refs.refShiftId.getDisplayValue());
				newRecord.set('inptDt', 	Ext.Date.format(refs.refInputDate.getValue(), 	MOST.config.Locale.getShortDate()));
				newRecord.set('stDt', 		Ext.Date.format(refs.refStartDate.getValue(), 	MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
				newRecord.set('endDt', 		Ext.Date.format(refs.refEndDate.getValue(), 	MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
				newRecord.set('hrs', 		refs.refHrsMins.getValue().split(':')[0]);    
				newRecord.set('mins', 		refs.refHrsMins.getValue().split(':')[1]);
				
				if(me.validationRecord(newRecord)){
					store.insert(0, newRecord);
				}
				record.reject();
			}
			refs.refBtnSave.setDisabled(false);
		}
	},

	//Event Save button:
	onSave: function(){
    	var me = this;
    	me.getView().getEl().mask('Processing...');
    	saveDelayTask.delay(200, null, me, [me]);
    },
    
	onDelaySave:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('vesselDelayList');

		store.getModifiedRecords().forEach(function(record, index, array){
			if(!me.validationRecord(record)){
				bValidation = false;
				if (Ext.isClassic) {
					me.getView().getEl().unmask();			
				}
				return
			}

			if(index === store.getModifiedRecords().length-1){
				store.sync({
					success:function(){
						MessageUtil.saveSuccess();
						if (Ext.isClassic) {
							me.getView().getEl().unmask();	
							me.onSearch();		
						}
						else {
							me.onTblRetrieve();
						}
						me.getViewModel().set('theDelay', Ext.create('MOST.model.operation.VesselDelay'));
					}
				});
				if (Ext.isClassic) {
					me.getView().getEl().unmask();			
				}
			}
		});
		if (Ext.isClassic) {
			me.getView().getEl().unmask();			
		}
	},

    // onDelaySave:function(){
    // 	var me = this;
	// 	var refs = me.getReferences();
	// 	var store = me.getStore('vesselDelayList');

	// 	var bValidation = true
	// 	store.getModifiedRecords().forEach(function(record, index, array){
	// 		if(!me.validationRecord(record)){
	// 			bValidation = false;
	// 			me.getView().getEl().unmask();
	// 			return
	// 		}
			
	// 		// if(!me.onValidationBeforeSave(record)){
	// 		// 	bValidation = false;
	// 		// 	me.getView().getEl().unmask();
	// 		// 	return
	// 		// }

	// 		//return true;
	// 		var vslCallId 	= refs.ctlJpvc.getValue();
	// 		var inptDt 		= record.get('inptDt');
	// 		var shftId 		= record.get('shftId');
	// 		var rsnCd 		= record.get('rsnCd');		
	// 		var eqNo 		= record.get('eqNo');
	// 		var hatchNo 	= record.get('hatchNo');
	// 		var acptYN 		= record.get('acptYN');
	// 		var hatchDrtCd 	= record.get('hatchDrtCd');
	// 		var stDt 		= record.get('stDt');
	// 		var endDt 		= record.get('endDt');
	// 		var seq 		= record.get('seq');
			
	// 		var params = {
	// 				tyCd : 'checkExisted',
	// 				col1 : vslCallId,
	// 				col2 : inptDt,
	// 				col3 : shftId,
	// 				col4 : rsnCd,
	// 				col5 : eqNo,
	// 				col6 : hatchNo,
	// 				col7 : acptYN,
	// 				col8 : hatchDrtCd,
	// 				col9 : stDt,
	// 				col10 : endDt,
	// 				col11 : seq
	// 		};
			
	// 		var validationCodeStore = me.getStore('vesselDelayDuplicatedValidationCode'); 	   	
	// 		validationCodeStore.load({
	// 			params : params,			
	// 			callback: function(records, operation, success) {
	// 				if (success) {
	// 					if(records[0].get("isValidated") !== "Y"){
	// 						MessageUtil.alert('warning', 'tbl_delayVessel_duplicate');
	// 						bValidation = false;
	// 						return;
	// 					}
                 
	// 					if(index === store.getModifiedRecords().length-1){
	// 						if(bValidation){
	// 							store.sync({
	// 								success:function(){
	// 									MessageUtil.saveSuccess();
	// 									me.getView().getEl().unmask();
	// 									me.onSearch();
	// 									me.getViewModel().set('theDelay', 	Ext.create('MOST.model.controller.VesselDelay'));
	// 								}
	// 							});
	// 						}
	// 						me.getView().getEl().unmask();
	// 					}
						
	// 				} else {
	// 					MessageUtil.alert('warning', 'tbl_delayVessel_duplicate');
	// 					bValidation = false;
	// 					return;
	// 				}
	// 			}
	// 		});	
							
	// 	});
	// 	me.getView().getEl().unmask();

    // },
	
	// Grid Row Remove
	onRemove: function() {
		var me = this;
		var store = me.getStore('vesselDelayList'); 
		var grid = me.lookupReference('refVesselDelayGrid');
		
		MessageUtil.question('remove', 'infodelete_msg', null,
			function(button){
				if (button === 'ok') {
					store.data.each(function(record){
						if(record.data.itChk){
							store.remove(record);
							
						}
					});
					
					store.sync({
						success: function(){
							MessageUtil.saveSuccess();
							me.onClear();
						}
					});
					store.commitChanges();
				}
			}
		);
	},

	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var refs = me.getReferences();
		var searchBizParm = me.getSearchCondition();
		searchBizParm.classID = 'com.tsb.most.biz.parm.operation.SearchVesselDelayParm';
		searchBizParm.serviceID = 'MOST.vesselDelay.selectVesselDelayList'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	

	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * EVENT HANDLER HHT START
	 */
	
	 onTblLoad: function () {
		var me = this,
			refs = me.getReferences(),
			hatchNoStore = me.getStore('hatchNoCombo'),
			searchParm = Ext.create('MOST.model.operation.SearchVesselDelayParm');
		var eqNoCombo = me.getStore('deployedEquipmentNoList');
		
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		eqNoCombo.load();
		hatchNoStore.load();
		me.onTblRetrieve();
		
	},

	onTblRetrieve: function () {
		var me = this,
			refs = me.getReferences(),
	   		store = me.getStore('vesselDelayList'),
			vslCallId =  me.getViewModel().get('globalVesselCallId');
		
	   store.load({
		   params: {
				vslCallId:  vslCallId,
				searchType: 'DelayRecordList'
		   },
		   callback: function(records, operation, success) {
			   if (success) {
				   me.onTblClear();
				   if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
			   }
		   }
	   });
	},

	onTblCreate: function () {
		var me = this,
			refs = me.getReferences(),
			store = me.getStore('vesselDelayList'),
			record = me.getViewModel().get('theDelay'),
			vslCallId =  me.getViewModel().get('globalVesselCallId');
		
		if(vslCallId === null || vslCallId === ''){
			MessageUtil.info('Warning', 'vorExistedVslCallId');
			return;
		}else{
			if(record.phantom){
				var newRecord = Ext.create('MOST.model.operation.VesselDelay');
				newRecord.set("userId", 	MOST.config.Token.getUserId());
				newRecord.set("vslCallId", 	vslCallId);
				// newRecord.set('inptDt', 	Ext.Date.format(refs.refInputDate.getValue(), 	MOST.config.Locale.getShortDate()));
				newRecord.set('stDt', 		refs.refStartDate.getValue());
				newRecord.set('endDt', 		refs.refEndDate.getValue());
				// newRecord.set('stDt', 		Ext.Date.format(refs.refStartDate.getValue(), 	MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
				// newRecord.set('endDt', 		Ext.Date.format(refs.refEndDate.getValue(), 	MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
				// newRecord.set('shftId', 	refs.refShiftId.getValue());
				// newRecord.set('shftNm', 	refs.refShiftId.getDisplayValue());
				newRecord.set('hatchNo', 	refs.refVesselDelayHatchNoCombo.getValue());
				// newRecord.set('eqNo', 		refs.refVesselDelayEquipmentNo.getValue());
				newRecord.set('rsnCd', 		refs.refVesselDelayCode.getValue());
				newRecord.set('rsnCdNm', 	refs.refVesselDelayDescription.getValue());
				newRecord.set('acptYN', 	refs.refVesselDelayAccepted.getValue());
				// newRecord.set('hatchDrtCd', refs.refVesselDelayHatchDrtC.getValue());
				newRecord.set('contractor', refs.refVesselDelayStevedore.getValue());
				newRecord.set('rmk', 		refs.refVesselDelayRemark.getValue());
				newRecord.set('hrs', 		refs.refHrsMins.getValue().split(':')[0]);    
				newRecord.set('mins', 		refs.refHrsMins.getValue().split(':')[1]);

				me.getViewModel().set('theDelay', newRecord);
				if(me.validationRecord(newRecord)){
					store.insert(0, newRecord);
					
				}
			}else{
				var newRecord = record;
				var newRecord1 = Ext.create('MOST.model.operation.VesselDelay');
				newRecord.id = newRecord1.id;
				newRecord.phantom = true;

				newRecord.set("userId", 	MOST.config.Token.getUserId());
				newRecord.set("vslCallId", 	vslCallId);
				// newRecord.set('shftNm', 	refs.refShiftId.getDisplayValue());
				// newRecord.set('inptDt', 	Ext.Date.format(refs.refInputDate.getValue(), 	MOST.config.Locale.getShortDate()));
				// newRecord.set('stDt', 		Ext.Date.format(refs.refStartDate.getValue(), 	MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
				// newRecord.set('endDt', 		Ext.Date.format(refs.refEndDate.getValue(), 	MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
				newRecord.set('stDt', 		refs.refStartDate.getValue());
				newRecord.set('endDt', 		refs.refEndDate.getValue());
				newRecord.set('hrs', 		refs.refHrsMins.getValue().split(':')[0]);    
				newRecord.set('mins', 		refs.refHrsMins.getValue().split(':')[1]);
				
				if(me.validationRecord(newRecord)){
					store.insert(0, newRecord);
				}
				record.reject();
			}
			// refs.refBtnSave.setDisabled(false);
			me.onDelaySave();
		}
	},

	onTblUpdate: function () {
		var me = this,
			grid = me.lookupReference('refVesselDelayGrid'),
			selected = grid.getSelection();

		if(!selected){
			MessageUtil.warning("warning_msg", "tbl_vsr_select_update");
			return;
		}

		MessageUtil.questionModern('tbl_confrm_update','tbl_vsr_confirm_update', null,function(button){
			if(button === 'ok'){
				me.onDelaySave();
			}
		});
	},

	onTblDelete: function () {
		var me = this,
			store = me.getStore('vesselDelayList'),
			grid = me.lookupReference('refVesselDelayGrid'),
			selected = grid.getSelection();

		if(!selected){
			MessageUtil.warning("warning_msg", "tbl_vsr_select_delete");
			return;
		}

		MessageUtil.questionModern('tbl_confrm_delete','infodelete_msg', null,function(button){
			if(button === 'ok'){
				store.remove(selected);
					
				store.sync({
					success: function(){
						MessageUtil.saveSuccess();
						me.onTblClear();
					}
				});
				store.commitChanges();
			}
		});
	},

	onTblClear: function () {
    	var me = this;
    	var refs = me.getReferences();
    	
    	me.getViewModel().set('theDelay', 	Ext.create('MOST.model.operation.VesselDelay'));
    	
    	refs.refStartDate.setValue('');
    	refs.refEndDate.setValue('');
    },
	
	onOpenDelayCodeHHTPopup: function (field, button, e) {
		var me = this;
		var refs = me.getReferences();
		var params = {
			lcd: 'BBK',
			title: 'Delay Code'
		};

		ViewUtil.openCodePopup(me, 'app-delaycodehhtpopup', 'refVesselDelayCode', params);
	},

	onOpenStevedoreHHTPopup: function () {
		var me = this,
			targetCtl = 'refVesselDelayStevedore',
			title = 'Stevedore',
			params = {
				title: title,
				//searchType: 'CTT',
			};
		ViewUtil.openCodePopup(me, 'app-commoncodepopuphht', targetCtl, params);
	},

	onTblSelectDelayVslGrid: function(){
		var me = this,
			refs = me.getReferences(),
			grid = me.lookupReference('refVesselDelayGrid'),
			selection = grid.getSelection() == null ? null : grid.getSelection();

		if(!selection) 
			return;
		me.getViewModel().set('theDelay',selection);
		
		refs.refStartDate.setValue(Ext.Date.parse(selection.get('stDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		refs.refEndDate.setValue(Ext.Date.parse(selection.get('endDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));

	},

	updateDelayStartDateHHT: function () {
		var me = this,
			refs = me.getReferences(),
			startDate = refs.refStartDate.getValue();

		me.updateDelayStartDate(startDate);	
	},

	updateDelayEndDateHHT: function () {
		
		var me = this,
			refs = me.getReferences(),
			endDate = refs.refEndDate.getValue();

		me.updateDelayEndDate(endDate);
	},

	/**
	 * EVENT HANDLER HHT END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */

	 getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		var workYmd = '';
     	var jpvcNo = searchParm.data.vslCallId;
		
		if (Ext.isClassic) {
			workYmd = DateUtil.checkDate(me, 'ctlWorkYmdField').dateString;
		}
    	
     	if(!StringUtil.isNullorEmpty(jpvcNo)){ 
     		params['vslCallId'] = jpvcNo;
     		params['stDt'] = workYmd;
     		params['searchType'] = 'DelayRecordList';
    		// params['pageNo'] = pageNo;
    		// params['sizePerPage'] = sizePerPage;
    		// params['sort'] = grid.getSortString();
     	}else{
     		MessageUtil.error('fail_msg', "requiredJpvcmessage");
			params = null;
     	}
    	
    	return params;
	},

	convertStringToDate: function (stringDate) {
		if (typeof stringDate === 'string') {
			const [dateValues, timeValues] = stringDate.split(' ');
			const [day, month, year] = dateValues.split('/');
			const [hours, minutes] = timeValues.split(':');

			return newDate = new Date(+year, +month - 1, +day, +hours, +minutes);
		}
	},

	getHrsMin: function(startTime,  endTime){
		var me = this;
		var refs = me.getReferences();

		var startTime = refs.refStartDate.getValue();
		var endTime = refs.refEndDate.getValue();
		var test  = typeof startTime;
		
		if (typeof startTime === 'string' && typeof endTime === 'string') {
			startTime = me.convertStringToDate(startTime);
			endTime = me.convertStringToDate(endTime);
			totalHours = Math.round((endTime.getTime()-startTime.getTime())*0.001/3600*100)/100;
		}
		else if (startTime instanceof Date && endTime instanceof Date) {
			totalHours = Math.round((endTime.getTime()-startTime.getTime())*0.001/3600*100)/100;
		}
		else{
			return '00:00';
		}
		
		var hrsArr = totalHours.toString().split('.');
		var mnsStr = '00';
		var hrsStr = hrsArr[0];

		if(hrsArr[0].length == 1){
			hrsStr = '0' + hrsStr;
		}else{
			hrsStr = hrsArr[0];
		}

		if(hrsArr[1] == undefined){
			mnsStr = '00';
		}else{
			var minStr = (Number('0.'+hrsArr[1]) * 60).toString().split('.')[0];
			if(minStr.length == 1){
				mnsStr = '0' + minStr;
			}else{
				mnsStr = minStr;
			}
		}		
		return (hrsStr + ":" + mnsStr);
	},

	getTotalHRS: function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refVesselDelayGrid');
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		//var editor = grid.getPlugin('vesselDelayGridEditor');
		
		var totalHours = 0;
		
		var startDate = selection.get('stDt'); 	//masterItem.data.stDt;
		var endDate = selection.get('endDt'); 	//masterItem.data.endDt;
		
		//if(startDate == null || startDate == ''){
		//	startDate = editor.grid.down('[dataIndex=stDt]').getEditor().getValue();
		//}
		//
		//if(endDate == null || endDate == ''){
		//	 endDate = editor.grid.down('[dataIndex=endDt]').getEditor().getValue();
		//}
		
		var startTime = Ext.Date.parse(startDate,  'd/m/Y H:i');
		var endTime = Ext.Date.parse(endDate,  'd/m/Y H:i');
		
		if (startTime != null && endTime != null) {
			totalHours = Math.round((endTime.getTime()-startTime.getTime())*0.001/3600*100)/100;
		}
		
		var hrsArr = totalHours.toString().split('.');
		var mnsStr = '';
		var hrsStr = hrsArr[0];

		if(hrsArr[0].length == 1){
			hrsStr = '0' + hrsStr;
		}else{
			hrsStr = hrsArr[0];
		}

		if(hrsArr[1] == undefined){
			mnsStr = '00';
		}else{
			mnsStr = (Number(hrsArr[1])/10 * 60).toString();
		}
		
		return (hrsStr + ":" + mnsStr);
		
		//refs.refTotalHRS.getEditor().setValue(Math.round(totalHours * 1000)/1000);
		//editor.grid.down('[dataIndex=totalHRS]').getEditor().setValue(Math.round(totalHours * 1000)/1000);
	},
	
	validationRecord: function(record){
    	var me = this;
		var refs = me.getReferences();
		var store = me.getStore('vesselDelayList');
		var shiftListStore = me.getStore('shiftCombo');
		
		var startDate = Ext.Date.parse(record.get('stDt'),MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var endDate = Ext.Date.parse(record.get('endDt'),MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var shftId = record.get('shftId');
		var inptDt = record.get('inptDt');
		
		var msgTitle =  '<b>Please input the mandatory field(s):</b><br/>';
		var msgString = '';

		if(!record.get('vslCallId')){
			msgString = TSB.locale.i18n.Bundle.instance.getMsg('vesseldelay_msg_vslcallid') + '<br/>';
		}

		// if(!record.get('inptDt')){
		// 	msgString += TSB.locale.i18n.Bundle.instance.getMsg('vesseldelay_msg_date') + '<br/>';
		// }
		
		if(!record.get('rsnCd')){
			msgString += TSB.locale.i18n.Bundle.instance.getMsg('vesseldelay_msg_code') + '<br/>';
		}

		if(!record.get('stDt')){
			msgString += TSB.locale.i18n.Bundle.instance.getMsg('vesseldelay_msg_fromtime') + '<br/>';
		}

		if(msgString){
			MessageUtil.alert('Warning', msgTitle + msgString);
			return false;
		}

		if(record.get('stDt') && record.get('endDt')){
			var startDt = Ext.Date.parse(record.get('stDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			var endDt = Ext.Date.parse(record.get('endDt'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			if(startDt >= endDt){
				MessageUtil.alert('Warning', 'vesselDelay_start_end_time_msg');
			return false;
			}
		}

		return true;
    },
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD END
	 */
});

var saveDelayTask = new Ext.util.DelayedTask(function() {
	arguments[0].onDelaySave();
});

var addDelayTask = new Ext.util.DelayedTask(function() {
	arguments[0].onAddEvent();
});