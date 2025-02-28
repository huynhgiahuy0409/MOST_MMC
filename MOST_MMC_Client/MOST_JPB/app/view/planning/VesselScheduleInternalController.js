Ext.define('MOST.view.planning.VesselScheduleInternalController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [],

	alias: 'controller.vesselscheduleinternal',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refVesselScheduleInternalGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'vesselScheduleInternal',			// Main Store Name
	MAX_PERIOD_DAY : 62,
	FILE_UPLOAD_PGM_ID : 'confirmSlip1',
	alertYn : '',
	alertTp: '',
	rowIndex:0,
	orgBerthLoc: '',
	
	VESSEL_SCHEDULE_BERTH_LABEL: 'vesselScheduleBerthLabelCombo',
	VESSEL_SCHEDULE_INTERNAL_PLAN_STORE: 'vesselScheduleInternalPlanSearchCombo',
	VESSEL_OPERATION_CATEGORY_STORE: 'vesselScheduleOpeTypeCombo',
	VESSEL_SCHEDULE_TOP_CLEAN_STORE: 'vesselScheduleTopCleanCombo',
	VESSEL_SCHEDULE_INTERNAL_DELIVERY_MODE_STORE: 'delvModeCombo',
	VESSEL_CONFIRMATION_SLIP_LIQUID_STORE: 'vesselScheduleCargoTypeLiquidCombo',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.planning.SearchVesselScheduleParm');
		var vslTypeCombo = me.getStore('vesselScheduleInternalVslTypeSearchCombo');
		var cargoTypeCombo = me.getStore('vesselScheduleInternalCargoTypeSearchCombo');
		var vslStatusCombo = me.getStore('vesselScheduleInternalVslStatusSearchCombo');
		var schStatusCombo = me.getStore('vesselScheduleInternalSchStatusSearchCombo');
		
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.PLAN_SEARCH_COMBOBOX, me.VESSEL_SCHEDULE_INTERNAL_PLAN_STORE);
		
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		vslTypeCombo.load();
		cargoTypeCombo.load();
		vslStatusCombo.load();
		schStatusCombo.load();
		

		me.setDateInDays('ctlFromDt');
		me.setDateInDays('ctlToDt',62);
		
		var recvData = me.getView().recvData;
		
		if(recvData != null){
			refs.ctlFromDt.setValue('');
			refs.ctlToDt.setValue('');
			
			me.alertYn = 'Y';
			me.alertTp = recvData.alertTp;
	     	me.onSearch();
		}
	},
	
	// Initialize Control
	onRefreshAll:function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		
		me.setDateInDays('ctlFromDt');
		
		searchParm.set('planned', '');
		searchParm.set('vslStatus', '');
		searchParm.set('vslTp', '');
		searchParm.set('vslCallId', '');
		searchParm.set('cgTpCd', '');
		searchParm.set('schStatus', '');
		searchParm.set('dbYn', false);
		searchParm.set('atdYn', false);
		
		refs.ctlAllBerth.setValue(false);
	},
	
	// JPVC Refresh
	onRefresh : function(controlName){
		var me = this;
		me.refreshControl(controlName);
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
	onSearchBtn: function() {
		var me = this;
     	me.alertYn = '';
     	me.onSearch();
	},
	
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore('vesselScheduleInternal');
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if(records.length === 0){
						//MessageUtil.info('info_msg','select_applyDate_msg');
					}
				}
			}
		});
	},
	
	// Date Change Event
	onDateChange:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		var toDate = refs.ctlToDt.getValue();
		var fromDate = refs.ctlFromDt.getValue();
        var Difference_In_Time = null; 
        var Difference_In_Days = null; 
        
        if(control === refs.ctlFromDt){
			Difference_In_Time = toDate.getTime() - control.getValue().getTime();
			Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)-1;
			  
			if (Difference_In_Days > 61){
				me.setDateInDaysByDate('ctlToDt', me.MAX_PERIOD_DAY, control.getValue());
			}
		} else {
			Difference_In_Time = control.getValue().getTime() - fromDate.getTime();
			Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)-1;
			   
			if (Difference_In_Days > 61){
				me.setDateInDaysByDate('ctlFromDt', -me.MAX_PERIOD_DAY, control.getValue());
			} 
		}
	},
	
	// JPVC OPEN POPUP
	openLegendPopup:function(){
		var me = this;
		me.openCodePopup('popup-vesselschedulelegendinfopopup');
	},
	
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference('refVesselScheduleInternalGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		me.getView().detailViewAlias = 'app-vesselscheduleinternaldetail';
				
		me.openDetailPopup(selection);
	},

	onClickRequestTime: function() {
		var me = this;
		var refs = me.getReferences();
		var theMain = me.getViewModel().get('theMain');
		var params = {
		};
		me.openCodePopup('popup-vesselschedulerequesttimepopup', 'refBtnRequestTime', params);
	},
	onClickTankerSubmission: function(){
		var me = this;
		var refs = me.getReferences();
		var theMain = me.getViewModel().get('theMain');
		var {vslCd, vslCallId, scn, callYear, callSeq} = theMain.data
		var params = {
			vslCd,
			vslCallId,
			scn,
			callYear,
			callSeq
		};
		me.openCodePopup('popup-vesselscheduletankersubmissionpopup', 'refBtnTankerSubmission', params);
	},
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Popup After Setting
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var mainItem = me.getView().getViewModel().get('theMain');
		var detailItem = me.getView().getViewModel().get('theConfirmationSlip');
		var refs = me.getReferences();
		
		if(targetControl === 'ctlDryBulkMthrVslCallId' || targetControl === 'ctlLiquidBulkMthrVslCallId'){	// Vessel POPUP
			if(returnValue){
				mainItem.set('dbYn', 'Y');
				detailItem.set('dbYn', 'Y');
			} else {
				mainItem.set('dbYn', 'N');
				detailItem.set('dbYn', 'N');
			}
		};
		
		if(targetControl === 'ctlVesselCallId'){
			if(returnValue){
				refs.ctlFromDt.setValue('');
				refs.ctlToDt.setValue('');
				
				refs.ctlFromDt.allowBlank = true;
				refs.ctlToDt.allowBlank = true;
				
				refs.ctlScn.setValue(returnValue.item.get('scn'));
			}
		};
		
		if(targetControl === 'ctlImdg'){
			if(returnValue && returnValue.item.get('code') && returnValue.item.get('codeName')){ 
				refs.ctlUnno.setValue(returnValue.item.get('code'));
				refs.ctlImdg.setValue(returnValue.item.get('codeName'));
			}else{
				refs.ctlUnno.setValue('');
				refs.ctlImdg.setValue('');
			}
		}
		
		if(targetControl === 'refCmdtCode'){
			detailItem.set("cmmdGrpCode",returnValue.item.get('cmmdGrpCode'));
			detailItem.set("cmmdGrpName",returnValue.item.get('cmmdGrpName'));
			detailItem.set("cmmdCode",returnValue.item.get('code'));
			detailItem.set("cmmdName",returnValue.item.get('codeName'));
		}
		
		if(targetControl === 'ctlCmdtCode'){
			if(returnValue && returnValue.item.get('code') && returnValue.item.get('codeName')){ 
				refs.ctlCmdtCode.setValue(returnValue.item.get('code'))
			}else{
				refs.ctlCmdtCode.setValue('');
			}
		}
		
		if(targetControl === 'ctlShipper'){
			if(returnValue){ 
				me.getViewModel().setData({theCnsne:returnValue.item});
			} else {
				me.getViewModel().setData({theCnsne:null});
			}
		} 
		
		if(targetControl === 'ctlConsignee'){
			if(returnValue){ 
				me.getViewModel().setData({theShp:returnValue.item});
			} else {
				me.getViewModel().setData({theShp:null});
			}
		}
		
		if(targetControl === 'ctlTypeofPackage'){
			if(returnValue){ 
				me.getViewModel().setData({thePkgTp:returnValue.item});
			} else {
				me.getViewModel().setData({thePkgTp:null});
			}
		}
		
		if(targetControl === 'ctlScn'){ 
			if(returnValue){
				refs.ctlScn.setValue(returnValue.code);

				if(!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))){
					refs.ctlFromDt.setValue('');
					refs.ctlToDt.setValue('');
					
					refs.ctlFromDt.allowBlank = true;
					refs.ctlToDt.allowBlank = true;
					refs.ctlVesselCallId.setValue(returnValue.item.get('vslCallId'));
					me.onSearch();
				}else {
					refs.ctlFromDt.setValue('');
					refs.ctlToDt.setValue('');
					
					refs.ctlFromDt.allowBlank = true;
					refs.ctlToDt.allowBlank = true;
					refs.ctlVesselCallId.setValue('');
				}
			} 
		}
	},
	
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.MAIN_STORE_NAME);
    	var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
    	var pageNo = store.currentPage;
    	var sizePerPage = CommonConstants.PAGE_SIZE;
    	var searchParm = me.getViewModel().get('theSearch');
     	var vslCallId = refs.ctlVesselCallId.getValue();
     	var scn = refs.ctlScn.getValue();
     	var dateCondition = null;

    	if(me.alertYn == ''){
    		if(vslCallId == ""){
        		if(refs.ctlFromDt.getValue() == null || refs.ctlFromDt.getValue() == "" || refs.ctlToDt.getValue() == null || refs.ctlToDt.getValue() == "" ){
        			refs.ctlFromDt.reset();
        			me.setDateInDays('ctlFromDt');
        		}
        		
        		dateCondition = me.checkPeriodDate('ctlFromDt', 'ctlToDt', me.MAX_PERIOD_DAY, true);
        	}else{
        		refs.ctlFromDt.reset();
        		refs.ctlToDt.reset();
        		
        		searchParm.set('dbYn', false);
        		searchParm.set('planned', '');
        		searchParm.set('vslTp', '');
        		searchParm.set('cgTpCd', '');
        		searchParm.set('vslStatus', '');
        		searchParm.set('schStatus', '');
        		
        		refs.ctlAllBerth.setValue(false);
        	}
    	}

     	var allBerth = refs.ctlAllBerth.getValue();
    	var locCd = '';	
    	
    	if(allBerth == false){
    		locCd = 'BBT';
		}
   	
		var vslTp = searchParm.data.vslTp;
		
    	if(vslTp == '00'){
    		var vslTp = '';
    	}
    	
    	var params = {
    		scn				: scn,
    		planned 		: searchParm.data.planned, 
    		searchType 		: 'list',
    		locCd 			: searchParm.data.locCd,
    		vslTp 			: vslTp,
    		vslStatus 		: searchParm.data.vslStatus,
    		schStatus 		: searchParm.data.schStatus,
    		cgTpCd 			: searchParm.data.cgTpCd,
    		dbYn 			: searchParm.data.dbYn,
    		atdYn 			: searchParm.data.atdYn,
    		vslCallId 		: searchParm.data.vslCallId,
			rptTp			: '',
    		userId			: MOST.config.Token.getUserId(),
    		alertYn			: me.alertYn,
    		alertTp			: me.alertTp,
			pageNo			: pageNo,
			sizePerPage 	: sizePerPage,
			sort			: grid.getSortString()
		};
    	
    	if(dateCondition != null){
    		params['etaFrom'] = dateCondition.fromDtString;
    		params['etaTo'] = dateCondition.toDtString;
    	}
    	
    	return params;
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * DETAIL START
	 */
	// DG Declaration
	onDgDeclaration : function(callName){
		var me = this;
		
		if(callName === 'ConfirmationSlip1'){
			
		} else {
			var me = this;
			var imdgCombo = me.getStore('vesselScheduleImdgCombo');
			var pkgTpCombo = me.getStore('vesselSchedulePkgTpCombo');
			var partnerCodeCombo = me.getStore('vesselSchedulePartnerCodeCombo');
			var grid = me.lookupReference('refConfirmationSlipLiquidBulkGrid');
			var cargoOperationCombo = me.getStore('vesselScheduleCargoOperationCombo');
			var title = {type: 'bundle', key: 'dgDeclTitle'};
			
			me.getView().detailViewAlias = 'app-dgdeclaration';
			
			var theDGModel = Ext.create('MOST.model.document.DGDeclaration');
			var detailVslItem = me.getViewModel().get('theMain');
			var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
			
			if(selection == null) return;
			
			if(selection.data.unno == ''){
				MessageUtil.error('submitConfirmationSlip','vessel_unno_message');
				return;
			}
			
			if(selection.data.cnsne == '' || selection.data.shprCnsne == ''){
				MessageUtil.error('submitConfirmationSlip','vessel_shpcons_message');
				return;
			}
			
			theDGModel.set("vslCallId",detailVslItem.get("vslCallId"));
			theDGModel.set("vslCd",detailVslItem.get("vslCd"));
			theDGModel.set("callYear",detailVslItem.get("callYear"));
			theDGModel.set("callSeq",detailVslItem.get("callSeq"));
			theDGModel.set("vslNm",detailVslItem.get("vslNm"));
			theDGModel.set("arrvSaId",detailVslItem.get("arrvSaId"));
			theDGModel.set("berthLoc",detailVslItem.get("berthLoc"));
			theDGModel.set("voyage",detailVslItem.get("voyage"));
			theDGModel.set("eta",detailVslItem.get("eta"));
			theDGModel.set("portCd",detailVslItem.get("lastPort"));
			theDGModel.set("portCdNext",detailVslItem.get("portCdNext"));
			theDGModel.set("freeZoneDiv",'FZN');
			theDGModel.set("impNm",selection.data.cnsne + " / " + selection.data.cnsneNm);
			theDGModel.set("impAddr", selection.data.cnsneAddr);
			theDGModel.set("expNm",selection.data.shprCnsne + " / " + selection.data.shpNm);
			theDGModel.set("expAddr", selection.data.shpAddr);
			theDGModel.set("unno",selection.data.unno);
			theDGModel.set("imdg",selection.data.imdg);
			theDGModel.set("catgCd",selection.data.cgOptTpCd);
			theDGModel.set("pkgtpcdnm",selection.data.pkgTpNm);
			theDGModel.set("cgNo", "CMSLP");
			theDGModel.set("pkgQty",selection.data.wgt);
			theDGModel.set("pkg",selection.data.pkgTpCd);
			
			if(selection.data.dgSeq != ''){
				theDGModel.set("seq",selection.data.dgSeq);
			}else{
				theDGModel.set("seq" , "NON");
			}
			
			var dgitems = selection.data.dgItems;
			
			if(dgitems != undefined && dgitems.length > 0){
				theDGModel.set("contactNm", dgitems[0].contactNm);
				theDGModel.set("contactNo", dgitems[0].contactNo);
				theDGModel.set("substance", dgitems[0].substance);
				theDGModel.set("flashPnt", dgitems[0].flashPnt);
				theDGModel.set("hazChem", dgitems[0].hazChem);
				theDGModel.set("imdg", dgitems[0].imdg);
				theDGModel.set("unno", dgitems[0].unno);
				theDGModel.set("rmk1", dgitems[0].rmk1);
				theDGModel.set("rmk2", dgitems[0].rmk1);
				theDGModel.set("freeZoneDiv", dgitems[0].freeZoneDiv);
				theDGModel.set("priCd", dgitems[0].priCd);
				theDGModel.set("priGrp", dgitems[0].priGrp);
				theDGModel.set("propSnm", dgitems[0].propSnm);
				theDGModel.set("pkg", dgitems[0].pkg);
				theDGModel.set("pkgQty", dgitems[0].pkgQty);
				theDGModel.set("crudDG", dgitems[0].crudDG);
			}
			
			me.openDetailPopup(theDGModel, title, true, false, false);
		}
	},
	
	onBeforeClose: function(){
		var me = this;
		me.getView().detailViewAlias = 'app-vesselscheduledetail';
	},
	
	onDGCancel:function(){
		var me = this;
		var dgView = me.getDetailBizView();
		
		me.getView().detailViewAlias = 'app-vesselscheduledetail';
		dgView.close();
	},
	
	saveDGProcess:function(){
		var me = this;
		var uploadItems = new Array();
		var dgItems = new Array();
		var store = me.getStore('confirmationSlipLiquidBulk');
		var grid = me.lookupReference('refConfirmationSlipLiquidBulkGrid');
		var detailVslItem = me.getViewModel().get('theMain');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var dgView = me.getDetailBizView();
		var fileUploadStore;
		var dgForm = dgView.down('form').getForm();
		var model = new MOST.model.document.DGDeclaration(dgForm.getValues());
		var dgItem = new MOST.model.document.DGDeclaration();
		
		if(dgView.items.items[0].getViewModel() && dgView.items.items[0].getViewModel().getStore('dgUpload')){
			 fileUploadStore = dgView.items.items[0].getViewModel().getStore('dgUpload');
		}
		
		dgItem.data.imdg = dgView.items.items[0].lookupReference('ctlImdg').getValue();
		dgItem.data.unno = dgView.items.items[0].lookupReference('ctlUnno').getValue();
		dgItem.data.substance = model.data.substance;
		dgItem.data.freeZoneDiv = model.data.freeZoneDiv;
		dgItem.data.flashPnt = model.data.flashPnt;
		dgItem.data.hazChem = model.data.hazChem;
		dgItem.data.priCd = model.data.priCd;
		dgItem.data.priGrp = model.data.priGrp;
		dgItem.data.pkg = dgView.items.items[0].lookupReference('ctlPkg').getValue();
		dgItem.data.pkgQty = model.data.pkgQty;
		dgItem.data.rmk1 = model.data.rmk1;
		dgItem.data.propSnm = model.data.propSnm;
		dgItem.data.contactNm = model.data.contactNm;
		dgItem.data.contactNo = model.data.contactNo;
		dgItem.data.impNm = model.data.impNm;
		dgItem.data.impAddr = model.data.impAddr;
		dgItem.data.expNm = model.data.expNm;
		dgItem.data.expAddr = model.data.expAddr;
		dgItem.data.vslCd = detailVslItem.data.vslCd;
		dgItem.data.callYear = detailVslItem.data.callYear;
		dgItem.data.callSeq = detailVslItem.data.callSeq;
		dgItem.data.userId = MOST.config.Token.getUserId();
		dgItem.data.cgNo =  "CMSLP";
		
		if(selection.get('workingStatus') != 'C'){
			dgItem.data.crudDG = 'U';
			dgItem.data.dgSeq = selection.data.dgSeq;
			dgItem.data.seq = selection.data.dgSeq;
			selection.set('dgChk', 'Y');
		}else{
			dgItem.data.crudDG = 'C';
			selection.set('dgChk', 'Y');
		}
		
		if(selection.get('imdg') != dgItem.data.imdg && selection.get('unno') != dgItem.data.unno){
			selection.set('imdg', dgItem.data.imdg);
			selection.set('unno', dgItem.data.unno);
		}
		
		dgItems.push(dgItem.data);
		
		if(fileUploadStore){
			// File Upload CREATE, UPDATE RECORD
			fileUploadStore.getModifiedRecords().forEach(function(record, index, array){
				//record.set('fileStream', null);
				uploadItems.push(record.data);
			});
			// File Upload DELETE RECORD
			fileUploadStore.getRemovedRecords().forEach(function(record, index, array){
				uploadItems.push(record.data);
			});
		}
		
		selection.data.uploadItems = uploadItems;
		selection.data.dgItems = dgItems;
		
		if(selection.crudState != 'C' && selection.crudState != 'U'){
			selection.crudState = 'U';
			selection.crudStateWas = 'U';
			selection.dirty = true;
			selection.workingStatus = 'U';
			selection.data.workingStatus = 'U';
			selection.modified = "dgChk";
		}
		
		me.getView().detailViewAlias = 'app-vesselscheduledetail';
		
		dgView.close();
	},
	
	// See BL List
	onSeeBlList : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theMain');
		var recvData = {
			vslCallId: detailItem.data.vslCallId
		};
		
		me.loadMenuView('app-forwardernomination',recvData);
	},
	
	// Detail Load
	onDetailLoad:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var infoForm = detailView.down('form').getForm();
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.DIRECT_INDIRECT_MODE, me.VESSEL_SCHEDULE_INTERNAL_DELIVERY_MODE_STORE);
		var deliveryModeStore = me.getStore(me.VESSEL_SCHEDULE_INTERNAL_DELIVERY_MODE_STORE)
		deliveryModeStore.add([{code: 'B', name: 'Direct and Indirect'}])

		infoForm.isValid(); // Mandatory to appear red for.
		
		var theMainModel = Ext.create('MOST.model.planning.VesselSchedule');
		me.getViewModel().setData({theMain:theMainModel});
		
		me.setDetailInitialize();
	},
	
	// Detail Initialize
	setDetailInitialize:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var berthCombo = me.getStore('vesselScheduleBerthInfoCombo');
		berthCombo.load();
		
		var recvData = detailView.items.get(0).recvData;
		
		me.setDetailControl(recvData);
	},
	
	// Add Berth Plan Button Click Event
	onAddBerthPlanClick:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theMain');
		var recvData = detailView.items.get(0).recvData;
		var berthCombo = refs.ctlBerthLocation.getStore();
		var index = berthCombo.findExact('locId', refs.ctlBerthLocation.getValue());
		
		if(index > 0){
			var length = berthCombo.getAt(index).data.length;
			var berthTp = berthCombo.getAt(index).data.berthTp;

			if(berthTp !== 'WRF'){
				detailItem.set('wharfMarkFrom', 0);
				detailItem.set('wharfMarkTo', 0);
				
				if(Number(length) < Number(recvData.get('loa'))){
					MessageUtil.warning('warning_msg', 'vesssel_addberth_loacompare_msg');
					return;
				}
			}
		}	
		
		var mainItem = me.getView().getViewModel().get('theMain');
		
		if(mainItem.dirty){
			MessageUtil.warning('warning_msg', 'vslInfo_changing_msg');
			return;
		}
		
		if(!StringUtil.isNullorEmpty(detailItem.get('berthLoc'))){
			var validationCode = me.getStore('berthOverlapValidation');
			validationCode.load({
	     		params : {
					berthLoc : detailItem.get('berthLoc'),
					vslCallID : detailItem.get('vslCallId')
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if(records[0].get("isValidated") === "Y"){
							me.onBerthOverlapValidationCallBack(recvData);
						} else {
							MessageUtil.question('confirmation_msg', 'berthoverlap_Msg',null, 
									function(button){
										if (button === 'ok') {
											me.onBerthOverlapValidationCallBack(recvData);
										}
									}
								);
						}
					}
				}
	     	});
		}			
	},
	
	onBerthOverlapValidationCallBack: function (recvData){
		var me = this;
			
		if(recvData.data.invoiceStatus === 'ON-GOING'){
			MessageUtil.question('confirm', 'vesselschedule_addberthplan_checkinvoice_confirm_msg',null, 
					function(button){
						if (button === 'ok') {
							me.addBerthPlanApprovalCheck(recvData);
						}
					}
				);
		} else if (StringUtil.isNullorEmpty(recvData.data.invoiceStatus)) {
			MessageUtil.question('confirm', 'vesselschedule_addberthplan_confirm_msg',null, 
				function(button){
					if (button === 'ok') {
						me.addBerthPlanData(recvData);
					}
				}
			);
		} else {
			me.addBerthPlanData(recvData);
		}
	},
	
	addBerthPlanApprovalCheck:function(recvData){
		var me = this;
		
		if(recvData.data.mptsStatus === 'AP'){
			me.addBerthPlanData(recvData);
		} else {
			MessageUtil.question('confirm', 'vesselschedule_addberthplan_not_approval_msg',null, 
				function(button){
					if (button === 'ok') {
						me.addBerthPlanData(recvData);
					}
				}
			);
		}
	},
	
	onBerthLocationComboChange: function(combo, value, obj){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theMain');
		var berthCombo = combo.store;
		var index = berthCombo.findExact('locId', value.data.locId);

		if(index > 0){
			var berthTp = berthCombo.getAt(index).data.berthTp;
			var pstSta = berthCombo.getAt(index).data.pstSta;
			var pstEnd = berthCombo.getAt(index).data.pstEnd;
			
			if(berthTp !== 'WRF'){
				detailItem.set('wharfMarkFrom', 0);
				detailItem.set('wharfMarkTo', 0);
				refs.ctlVesselScheduleDetailWharfMarkStarts.setReadOnly(true);
				refs.ctlVesselScheduleDetailWharfMarkEnds.setReadOnly(true);
			} else {
				refs.ctlVesselScheduleDetailWharfMarkStarts.setReadOnly(false);
				refs.ctlVesselScheduleDetailWharfMarkEnds.setReadOnly(false);
				detailItem.set('wharfMarkFrom', pstSta);
				detailItem.set('wharfMarkTo', pstEnd);
			}
		}
	},
	
	onWharfMarkStartsFocusleave : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theMain');
		var berthCombo = me.getStore('vesselScheduleBerthInfoCombo');
		var index = berthCombo.findExact('locId', detailItem.data.locId);
		
		if(index > 0){
			var berthTp = berthCombo.getAt(index).data.berthTp;
			
			if(berthTp === 'WRF'){
				var endsValue = refs.ctlVesselScheduleDetailWharfMarkStarts.getValue() + parseInt(detailItem.data.loa);
				refs.ctlVesselScheduleDetailWharfMarkEnds.setValue(endsValue);
			}
		}
	},
	
	addBerthPlanData:function(recvData){
		var me = this;
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theMain');
		var berthCombo = me.getStore('vesselScheduleBerthInfoCombo');
		
		if(StringUtil.isNullorEmpty(detailItem.berthLoc)){
			var index = berthCombo.findExact('locId', detailItem.get('berthLoc'));

			if(index > 0){
				var berthTp = berthCombo.getAt(index).data.berthTp;

				if(detailItem.get('summitStatName') === 'Rejected'){
					MessageUtil.warning('vesselSchedule', 'vesselschedule_addberthplan_rejected_msg');
					return;
				}
				
				if(berthTp !== 'WRF'){
					detailItem.set('wharfMarkFrom', 0);
					detailItem.set('wharfMarkTo', 0);
				}
				
				detailItem.set('berthType', berthTp);
				me.onLoadBerthPlan(detailItem);
			}
		}
	},

	onLoadBerthPlan: function(detailItem){
		var me = this;
		var prefix = 'menu';
		var menuId = 'MPPN103';
		var id = prefix + '_' + menuId;
		var mainView = me.getView().findParentByType('app-main');
		var tabs = mainView.lookupReference('ref-maintab');
		var tab = tabs.items.getByKey(id);
		
		var obj = detailItem.clone();

		if(!tab){
			me.loadMenuView('app-berthexplorer' ,obj);
		} else {
			me.fireEvent('onRedirectBerthTab', obj);
			tabs.setActiveTab(tab);
		}
	},
	
	// Set combobox & Detail Data
	setComboStore:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		//var berthCombo = me.getStore('vesselScheduleBerthInfoCombo');
		var cargoOperationCombo = me.getStore('vesselScheduleCargoOperationCombo');
		var cargoTypeUnLiquidCombo = me.getStore('vesselScheduleCargoTypeUnLiquidCombo');
		var commodityCodeCombo = me.getStore('vesselScheduleCommodityCodeCombo');
		var workableHatchCombo = me.getStore('vesselScheduleWorkableHatchCombo');
		var partnerCodeCombo = me.getStore('vesselSchedulePartnerCodeCombo');
		var pkgTpCombo = me.getStore('vesselSchedulePkgTpCombo');
		var imdgCombo = me.getStore('vesselScheduleImdgCombo');
		var portCombo = me.getStore('vesselSchedulePortCombo');		
		var purposeOfCallCombo = me.getStore('vesselSchedulePurposeOfCallCombo');
		var cargoToDischargeCombo = me.getStore('vesselScheduleCargoToDischargeCombo');
		var blSnNoCombo = me.getStore('vesselScheduleBlSnNoCombo');

		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
		blSnNoCombo.load({
				params: {
					vslCallId: recvData.data.vslCallId,
					cs2YN: true
				},
				callback:function(records, operation, success){
					if(success){
					}
				}
		});


		me.setComboBoxWithLocalCache(CacheServiceConstants.VESSEL_SCHEDULE_BERTH_LABEL_COMBOBOX, me.VESSEL_SCHEDULE_BERTH_LABEL);
		me.setComboBoxWithLocalCache(CacheServiceConstants.OPERATION_TYPE_COMBOBOX, me.VESSEL_OPERATION_CATEGORY_STORE);
		me.setComboBoxWithLocalCache(CacheServiceConstants.TOP_CLEAN_COMBOBOX, me.VESSEL_SCHEDULE_TOP_CLEAN_STORE);
		me.setComboBoxWithLocalCache(CacheServiceConstants.CONFIRMATION_SLIP_LIQUID_COMBO, me.VESSEL_CONFIRMATION_SLIP_LIQUID_STORE);
		
		//berthCombo.load();
		cargoOperationCombo.load();
		cargoTypeUnLiquidCombo.load();
		workableHatchCombo.load();
		purposeOfCallCombo.load();
		cargoToDischargeCombo.load();
		commodityCodeCombo.setData(masterItem.commodityCode);
		
		partnerCodeCombo.setData(masterItem.partnerCode);
		pkgTpCombo.setData(masterItem.pkgTpList);
		imdgCombo.setData(masterItem.imdgList);
		portCombo.setData(masterItem.portList);
	},
	
	// Settings Detail Control
	setDetailTabControl:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var dryBreakBulk = me.getStore('confirmationSlipDryBreakBulk');
		var liquidBulk = me.getStore('confirmationSlipLiquidBulk');
		var fileUpload = me.getStore('confirmationSlipStowagePlanUpload');
		
		dryBreakBulk.load({
			params: {
				vslCallId: recvData.data.vslCallId 
			}
		});
		dryBreakBulk.commitChanges();
		
		liquidBulk.load({
			params: {
				vslCallId: recvData.data.vslCallId				
			}
		});
		liquidBulk.commitChanges();
		
		me.onSetCrcAndOpeHrs();
		
		var theMainModel = Ext.create('MOST.model.planning.VesselSchedule');
		
		theMainModel.phantom = false; // UPDATE
		theMainModel.data = masterItem.vesselScheduleListDetail;
		
		me.getViewModel().setData({theMain:theMainModel});

		if(theMainModel.get('dbVslCallId')){
			refs.refChkDoubleBankingDtl.setValue(true);
		}

		me.orgBerthLoc = theMainModel.get('berthLoc');
		
		var berthCombo = refs.ctlBerthLocation.getStore();
		var index = berthCombo.findExact('locId', theMainModel.get('berthLoc'));
		
		if(index > 0){
			var berthTp = berthCombo.getAt(index).data.berthTp;
			
			if(berthTp !== 'WRF'){
				refs.ctlVesselScheduleDetailWharfMarkStarts.setReadOnly(true);
				refs.ctlVesselScheduleDetailWharfMarkEnds.setReadOnly(true);
			} else {
				refs.ctlVesselScheduleDetailWharfMarkStarts.setReadOnly(false);
				refs.ctlVesselScheduleDetailWharfMarkEnds.setReadOnly(false);
			}
		}
		
		var confirmationSlipItem = new Ext.create('MOST.model.planning.VesselSchedule');
		
		if(masterItem.confirmationSlip != null && masterItem.confirmationSlip.length > 0){
			confirmationSlipItem.phantom = false; // UPDATE
			confirmationSlipItem.data = masterItem.confirmationSlip[0];
			DateUtil.convertDateToLong(confirmationSlipItem.data, ['tempRedyDt', 'cgRedyDt', 'tkRedyDt', 'ultgRedyDt', 'docRedyDt']); // date to long
		}
		
		confirmationSlipItem.set('vslCallId', masterItem.vesselScheduleListDetail.vslCallId);
		me.getViewModel().setData({theConfirmationSlip:confirmationSlipItem});
		
		fileUpload.setData(masterItem.uploadItems);
		fileUpload.commitChanges();
		
		if(masterItem.confirmationSlipOperationType != null && masterItem.confirmationSlipOperationType.length > 0){
			refs.ctlConfirmationSlip1OperationType.setValue(masterItem.confirmationSlipOperationType[0].opeTpNm);
			refs.ctlConfirmationSlip2OperationType.setValue(masterItem.confirmationSlipOperationType[0].opeTpNm);
		}
	},
	
	// Detail Control Setting
	setDetailControl:function(recvData){
		var me = this;
		var refs = me.getReferences();
		var vesselScheduleDetailMain = me.getStore('vesselScheduleDetailMain');
		
		me.getViewModel().setData({externalMode:false}); // Internal
		
		//Set the Ope hrs of CS2 to 24 by default
		refs.refEstOprTime.setValue(24);
		
		vesselScheduleDetailMain.load({
			params: {
				vslCallId : recvData.data.vslCallId,
				vslCd : recvData.data.vslCd,
				callYear: recvData.data.callYear,
				callSeq: recvData.data.callSeq,
	    		pgmId : me.FILE_UPLOAD_PGM_ID,
	    		catgCd : recvData.data.vslCallId
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						me.setComboStore(records[0].data);
						me.setDetailTabControl(records[0].data);
					}
				}
			}
		});
	},
	
	notValidDate: function(startDate , endDate){
		var result = true;

		if(startDate == null || endDate == null){
			result =  false;
		}else{
			if(startDate < endDate){
				result =  false;
			}
		}
		
		return result;
	},
	
	//Validate Mother Vessel Jpvc
	validateMotherVesselJpvc:function(){
		var me = this;
		var refs = me.getReferences();
		
		if (refs.ctlDryBulkMthrVslCallId || refs.ctlLiquidBulkMthrVslCallId){
			if (refs.ctlDryBulkMthrVslCallId.getValue() === refs.txtJpvc.getValue()){
				return false
			} else if (refs.ctlLiquidBulkMthrVslCallId.getValue() === refs.txtJpvc.getValue()){
				return false
			}
			
			return true
		}
	},
	validateVesselScheduleDetail:function(){
		var isValidated = false
		var me = this
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theMain');
		var {readinessAta, vslDlRsn} = detailItem.data

		if(!readinessAta || !vslDlRsn){
			MessageUtil.warning("Warning", "mandatoryForm_msg");
		}else{
			isValidated = true
		}
		return isValidated;
	},

	// Toolbar Save Button
	onDetailSave:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theMain');
		var atb = Ext.Date.format(refs.txtATB.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var atu = Ext.Date.format(refs.txtATU.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		
		if(detailItem.get('berthLoc') == ''){
			MessageUtil.alert('Warning', 'vesssel_updateberth_msg');
			return;
		}
		
		if(detailView){
			if (!me.dateTimeValidation(atb, atu)) {
				MessageUtil.warning("Warning", "atbInvalid", [atu]);
				return;
			}if (!me.validateVesselScheduleDetail()) {
				return;
			} else {
				me.saveProcess();
			}
		}
		
		if(refs.ctlVesselDetailTabPanel.getActiveTab().name === 'cs1' || refs.ctlVesselDetailTabPanel.getActiveTab().name === 'cs2'){
			MessageUtil.alert('info_msg', 'cs1andcs2Submission_Msg');
		}
	},

	dateTimeValidation: function (strFromDate, strToDate) {
		var me = this;
		var result = new Date(me.changeFormatDateTime(strToDate)) - new Date(me.changeFormatDateTime(strFromDate));
		
		if (result < 0) {
			return false;
		}
		
		return true;
	},

	changeFormatDateTime(str) {
		var date = "";
		var splitDateTime = str.split(" ");
		var splitDate = splitDateTime[0].split("/");
		var result = date.concat(splitDate[1], '/', splitDate[0], '/', splitDate[2], ' ', splitDateTime[1]);
		
		return result;
	},
	
	vslTimeValidation: function(type){
		var me = this;
		var refs = me.getReferences();
		
		if(type === 'est'){
			var numETA2ETB = me.notValidDate(refs.txtETA.getValue(),refs.txtETB.getValue());
 			var numETA2ETW = me.notValidDate(refs.txtETA.getValue(),refs.txtETW.getValue());
 			var numETA2ETC = me.notValidDate(refs.txtETA.getValue(),refs.txtETC.getValue());
 			var numETA2ETU = me.notValidDate(refs.txtETA.getValue(),refs.txtETU.getValue());
 			var numETA2ETD = me.notValidDate(refs.txtETA.getValue(),refs.txtETD.getValue());
			
			var numETB2ETW = me.notValidDate(refs.txtETB.getValue(),refs.txtETW.getValue());
			var numETB2ETC = me.notValidDate(refs.txtETB.getValue(),refs.txtETC.getValue());
			var numETB2ETU = me.notValidDate(refs.txtETB.getValue(),refs.txtETU.getValue());
			var numETB2ETD = me.notValidDate(refs.txtETB.getValue(),refs.txtETD.getValue());
			
			var numETW2ETC = me.notValidDate(refs.txtETW.getValue(),refs.txtETC.getValue());
			var numETW2ETU = me.notValidDate(refs.txtETW.getValue(),refs.txtETU.getValue());
			var numETW2ETD = me.notValidDate(refs.txtETW.getValue(),refs.txtETD.getValue());
			
			var numETC2ETU = me.notValidDate(refs.txtETC.getValue(),refs.txtETU.getValue());
			var numETC2ETD = me.notValidDate(refs.txtETC.getValue(),refs.txtETD.getValue());
			
			var numETU2ETD = me.notValidDate(refs.txtETU.getValue(),refs.txtETD.getValue());
			
			if (numETA2ETB || numETA2ETW || numETA2ETC || numETA2ETU || numETA2ETD ||
					numETB2ETW || numETB2ETC || numETB2ETU  ||numETB2ETD || 
					numETW2ETC || numETW2ETU || numETW2ETD  ||
					numETC2ETU || numETC2ETD ||
					numETU2ETD) {
				MessageUtil.alert('Warning', 'vessel_esttimeline_msg');
				return false;
			}
		} else if(type === 'act'){
			var numATA2ATB = me.notValidDate(refs.txtATA.getValue(),refs.txtATB.getValue()) ;
			var numATA2ATW = me.notValidDate(refs.txtATA.getValue(),refs.txtATW.getValue()) ;
			var numATA2ATC = me.notValidDate(refs.txtATA.getValue(),refs.txtATC.getValue()) ;
			var numATA2ATU = me.notValidDate(refs.txtATA.getValue(),refs.txtATU.getValue()) ;
			var numATA2ATD = me.notValidDate(refs.txtATA.getValue(),refs.txtATD.getValue()) ;
			
			var numATB2ATW = me.notValidDate(refs.txtATB.getValue(),refs.txtATW.getValue()) ;
			var numATB2ATC = me.notValidDate(refs.txtATB.getValue(),refs.txtATC.getValue()) ;
			var numATB2ATU = me.notValidDate(refs.txtATB.getValue(),refs.txtATU.getValue()) ;
			var numATB2ATD = me.notValidDate(refs.txtATB.getValue(),refs.txtATD.getValue()) ;
			
			var numATW2ATC = me.notValidDate(refs.txtATW.getValue(),refs.txtATC.getValue()) ;
			var numATW2ATU = me.notValidDate(refs.txtATW.getValue(),refs.txtATU.getValue()) ;
			var numATW2ATD = me.notValidDate(refs.txtATW.getValue(),refs.txtATD.getValue()) ;
			
			var numATC2ATU = me.notValidDate(refs.txtATC.getValue(),refs.txtATU.getValue()) ;
			var numATC2ATD = me.notValidDate(refs.txtATC.getValue(),refs.txtATD.getValue()) ;
			
			var numATU2ATD = me.notValidDate(refs.txtATU.getValue(),refs.txtATD.getValue()) ;
			
			if (numATA2ATB || numATA2ATW || numATA2ATC  || numATA2ATU ||numATB2ATD|| 
					numATB2ATW || numATB2ATC || numATB2ATU  ||numATB2ATD || 
					numATW2ATC || numATW2ATU || numATW2ATD  ||
					numATC2ATU || numATC2ATD ||
					numATU2ATD) {
				MessageUtil.alert('Warning', 'vessel_timeline_msg');
				return false;
			}
		} else if(type === 'atu'){
			if(refs.txtATU.getValue() != null && refs.txtATB.getValue() == null){
				MessageUtil.alert('Warning', 'vesssel_updateatu_msg');
				return false;
			}
		}
		
		return true;
	},
	
	// Server Save Process
	saveProcess:function(){
		var me = this;
		var store = me.getStore('vesselScheduleInternal');
		var detailItem = me.getViewModel().get('theMain');
		var detailView = me.getDetailBizView();
		//Added by Harry to fix
		var refs = me.getReferences();
		
		if(refs.txtATB.getValue() != detailItem.data.curAtb && detailItem.crudState != 'U'){
			detailItem.data.atb = null;
			detailItem.crudState = 'U';
			detailItem.crudStateWas = 'U';
			detailItem.dirty = true;
		}
		// --------------------------
		
		if(detailItem.dirty){
			var proxy = detailItem.getProxy();
			proxy.url = store.getProxy().url; // You can set it as store Proxy Url, or you can put another URL.

			detailItem.save({
				success : function(){
					store.commitChanges();
					MessageUtil.saveSuccess(); // Success Message
					me.orgBerthLoc = detailItem.get('berthLoc');
				}
			});
		}
	},
	/**
	 * DETAIL END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * Confirmation Slip 1 START
	 */
	// ConfirmationSlip1 Grid Row Add
	onConfirmationSlip1GridAdd: function() {
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var detailGrid = me.lookupReference('refConfirmationSlipDryBulkBreakBulkGrid');
		var store = me.getStore('confirmationSlipDryBreakBulk');
		var editor = detailGrid.getPlugin('confirmationSlipDryBulkBreakBulkEditor');
		var record = Ext.create('MOST.model.planning.VesselSchedule');
		
		editor.cancelEdit();
		
		//Clear filter for Grid
		detailGrid.filters.clearFilters();
		detailGrid.filters.disable();
		
		//Clear filter for Store
		store.clearFilter();
		
		var idx = 0;
		
		if(detailGrid.getSelection() && detailGrid.getSelection().length>0) {
			idx = store.indexOfId(detailGrid.getSelection()[0].get('id'));
		}
		
		store.insert(idx, record);
		record.set('vslCallId', recvData.get('vslCallId'));
		detailGrid.getSelectionModel().select(record);
		
		editor.startEdit(record);
	},
	
	onAddConfirmationSlip1: function() {
		var me = this;
		var detailView = me.getDetailBizView();
		
		me.onAddCs1();
	},
	
	onAddCs1:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var detailGrid = me.lookupReference('refConfirmationSlipDryBulkBreakBulkGrid');
		var store = me.getStore('confirmationSlipDryBreakBulk');
		var record = Ext.create('MOST.model.planning.VesselSchedule');
		//Clear filter for Grid
		detailGrid.filters.clearFilters();
		detailGrid.filters.disable();
		
		//Clear filter for Store
		store.clearFilter();
		
		var idx = 0;
		
		if(detailGrid.getSelection() && detailGrid.getSelection().length>0) {
			idx = store.indexOfId(detailGrid.getSelection()[0].get('id'));
		}
		if((StringUtil.isNullorEmpty(refs.refCgTpNm.getValue())) || (StringUtil.isNullorEmpty(refs.refOpeType.getValue()))){
			MessageUtil.error('warning_msg','MANDATORY: Cargo Opeation, CargoType, OP.Category');
			return;
		}else if(StringUtil.isNullorEmpty(refs.refHatchSeq.getValue())){
			MessageUtil.warning('warning_msg','mandatoryField_msg', refs.refHatchSeq.fieldLabel);
			return;
		}
		
		record.set('vslCallId', recvData.get('vslCallId'));
		record.set('scn', recvData.get('scn'));
		record.set('cgTpCd', refs.refCgTpNm.getValue());
		record.set('cmdtCd', refs.refCmdtCode.getValue());
		record.set('cmdtGrCd', refs.refCmdtGrCd.getValue());
		record.set('cmdtCdNm', refs.refCmdtName.getValue());
		record.set('cmdtGr', refs.refCmdtGr.getValue());
		record.set('opeType', refs.refOpeType.getValue());
		record.set('opeHr', refs.refOpeHr.getValue());
		record.set('workDd', refs.refWorkDd.getValue());
		record.set('wgt', refs.refWgt.getValue());
		record.set('msrmt', refs.refMsrmt.getValue());
		record.set('qty', refs.refQty.getValue());
		
		record.set('workHatchNo', refs.refWorkHatchNo.getValue());
		record.set('topCln', refs.refTopCln.getValue());
		record.set('hatchSeq', refs.refHatchSeq.getValue());
		record.set('workingStatus', 'C');

		if(!me.validateAddConfirmationSlip1(true)){
			return
		}else{
			store.insert(idx, record);	
			detailGrid.getSelectionModel().select(record);
		}

	},
	validateAddConfirmationSlip1:function(isCreate){
		var me = this;
		var refs = me.getReferences();
		var mandatoryRefs = ['refWorkHatchNo', 'refHatchSeq'] 
		var isValid = true;
		var seq = refs.refHatchSeq.getValue();
		var hatch = refs.refWorkHatchNo.getValue();
		var store = me.getStore('confirmationSlipDryBreakBulk');
		var grid = refs.refConfirmationSlipDryBulkBreakBulkGrid
		mandatoryRefs.forEach(function(ref){
			if(StringUtil.isNullorEmpty(refs[ref].getValue())){
				MessageUtil.warning('warning_msg','mandatoryField_msg', refs[ref].fieldLabel);
				isValid = false
			}
		})

		if(!isCreate){
			var selectedRecord = grid.getSelection()[0]
			store.filterBy(function(rec){
				return rec.get('hatchSeq') != selectedRecord.get('hatchSeq') && rec.get('workHatchNo') != selectedRecord.get('workHatchNo');
			})
		}
		var existRecord = store.getRange().find(function (rec) {
			return rec.get('hatchSeq') == seq || rec.get('workHatchNo') == hatch;
		});
		
		if(existRecord){
			MessageUtil.warning('warning_msg','Data already exist. Please check again.');
			isValid = false
		}

		store.clearFilter();
		
		return isValid
	},
	onRefConfirmationSlipDryBreakBulkGrid_CellClick:function(ctx, td, cellIndex, record, tr, rowIndex, e, eOpts){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refConfirmationSlipDryBulkBreakBulkGrid');	
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		if(selection.data.vslCallId == null || selection.data.vslCallId == '') return;
		
		me.rowIndex = rowIndex;
		
		refs.refHatchSeq.setValue(selection.get("hatchSeq"));
		refs.refCgTpNm.setValue(selection.get("cgTpCd"));
		refs.refCmdtCode.setValue(selection.get("cmdtCd"));
		refs.refCmdtName.setValue(selection.get("cmdtCdNm"));
		refs.refCmdtGrCd.setValue(selection.get("cmdtGrCd"));
		refs.refCmdtGr.setValue(selection.get("cmdtGr"));
		refs.refOpeType.setValue(selection.get("opeType"));
		refs.refOpeHr.setValue(selection.get("opeHr"));
		refs.refWorkDd.setValue(selection.get("workDd"));
		refs.refWgt.setValue(selection.get("wgt"));
		refs.refMsrmt.setValue(selection.get("msrmt"));
		refs.refQty.setValue(selection.get("qty"));
		refs.refWorkHatchNo.setValue(selection.get("workHatchNo"));
		refs.refTopCln.setValue(selection.get("topCln"));	
	},
	
	onUpdateConfirmationSlip1:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refConfirmationSlipDryBulkBreakBulkGrid;
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var theConfirmationSlip = me.getViewModel().get('theConfirmationSlip');
		if(selection == null) return;
		if(selection.data.vslCallId == null || selection.data.vslCallId == '') return;
		
		
		me.onUpdateCs1();
	},
	
	onUpdateCs1: function() {
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refConfirmationSlipDryBulkBreakBulkGrid;
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if((StringUtil.isNullorEmpty(refs.refCgTpNm.getValue())) || (StringUtil.isNullorEmpty(refs.refOpeType.getValue()))){
			MessageUtil.error('warning_msg','MANDATORY: Cargo Opeation, CargoType, OP.Category');
			return;
		}else if(!me.validateAddConfirmationSlip1(false)){
			return
		}
		
		if(!selection.phantom){
			selection.set('workingStatus', WorkingStatus.UPDATE);
		}
		
		selection.set('hatchSeq', refs.refHatchSeq.getValue());
		selection.set('workHatchNo', refs.refWorkHatchNo.getValue());
		selection.set('cgTpCd', refs.refCgTpNm.getValue());
		selection.set('cmdtCd', refs.refCmdtCode.getValue());
		selection.set('cmdtGrCd', refs.refCmdtGrCd.getValue());
		selection.set('cmdtCdNm', refs.refCmdtName.getValue());
		selection.set('cmdtGr', refs.refCmdtGr.getValue());
		selection.set('opeType', refs.refOpeType.getValue());
		selection.set('opeHr', refs.refOpeHr.getValue());
		selection.set('workDd', refs.refWorkDd.getValue());
		selection.set('wgt', refs.refWgt.getValue());
		selection.set('msrmt', refs.refMsrmt.getValue());
		selection.set('qty', refs.refQty.getValue());
		
		selection.set('workHatchNo', refs.refWorkHatchNo.getValue());
		selection.set('topCln', refs.refTopCln.getValue());
	},
	
	// ConfirmationSlip1 Grid Edit
	onConfirmationSlip1Edit : function(editor, context){
		context.record.data.workingStatus = context.record.crudState;
	},
	
	// ConfirmationSlip1 Grid Validate Edit
	onConfirmationSlip1ValidateEdit : function(editor, context) {
		var me = this;
		
		if(context.record.phatom){
			var store = me.getStore('confirmationSlipDryBreakBulk');
			return true;
		}
	},
	
	// ConfirmationSlip1 Grid Cancel Edit
	onConfirmationSlip1CancelEdit : function(rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},
	
	// ConfirmationSlip1 Grid Remove
	onConfirmationSlip1GridRemove: function() {
		var me = this;
		var grid = me.lookupReference('refConfirmationSlipDryBulkBreakBulkGrid');
		var store = me.getStore('confirmationSlipDryBreakBulk');		
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection == null) return;
		
		Ext.each(selection, function (record) {
			record.set('workingStatus', WorkingStatus.DELETE);
			store.remove(record);
		});
	},
	
	onDeleteConfirmationSlip1:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('confirmationSlipDryBreakBulk');
		var vesselScheduleDetailMain = me.getStore('vesselScheduleDetailMain');
		var grid = refs.refConfirmationSlipDryBulkBreakBulkGrid;
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		if(selection.data.vslCallId == null || selection.data.vslCallId == '') return;
		
		if(selection.crudState == 'C'){
			Ext.each(selection, function (record) {
				record.set('workingStatus', WorkingStatus.DELETE);
				store.remove(record);
			});
		}
		else {
			Ext.each(selection, function (record) {
				if(vesselScheduleDetailMain.data.items[0].data.cargoSummary.length > 0 && MOST.config.Token.getUserType() === CONSTANTS.USER_TYPE_EXTERNAL){
					MessageUtil.warning("Warning", "vessel_confirmslip2_delete_msg");
					return;
			    } else {
			    	selection.set('workingStatus', WorkingStatus.DELETE);
			    }
			});
		}
	},
	
	onClearConfirmationSlip1:function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.refCgTpNm.setValue();		
		refs.refCmdtCode.setValue();
		refs.refOpeType.setValue();
		refs.refOpeHr.setValue();
		refs.refWorkDd.setValue();
		refs.refWgt.setValue();
		refs.refMsrmt.setValue();
		refs.refQty.setValue();
		refs.refWorkHatchNo.setValue();
		refs.refTopCln.setValue();
	},
	
	// ConfirmationSlip1 Stowage Plan File Upload Grid Remove
	onConfirmationSlip1FileUploadGridRemove: function() {
		var me = this;
		var grid = me.lookupReference('refConfirmationSlipStowagePlanUploadGrid');
		var store = me.getStore('confirmationSlipStowagePlanUpload');		
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection == null) return;
		
		Ext.each(selection, function (record) {
			record.set('workingStatus', WorkingStatus.DELETE);
			store.remove(record);
		});
	},
	
	// CargoType UnLiquid Combo Change Event
	onCargoTypeUnLiquidComboChange: function(combo, value, obj){
		var me = this;
		var refs = me.getReferences();
		var grid = combo.up('grid');
		
		if(value === 'BBK'){
			refs.refTopCln.setDisabled(true);
		} else {
			refs.refTopCln.setDisabled(false);
		}
	},
	
	// Dry Bulk Grid Combo Renderer
	onDryBulkGridComboRenderer: function(val, cell){
		var me = this;
        var refs = me.getReferences();
		var codeComboStore = null;
		var displayFieldName = 'scdNm';
		var codeFieldName = 'scd';
		
		if(cell.column.dataIndex == 'cgTpCd'){ 		// Cargo Type COMBO
			codeComboStore = me.getViewModel().getStore('vesselScheduleCargoTypeUnLiquidCombo');
		} else if(cell.column.dataIndex == 'opeType'){ 		// Cargo Type COMBO
			codeComboStore = me.getViewModel().getStore('vesselScheduleOpeTypeCombo');
		} else if(cell.column.dataIndex == 'cmdtCd'){ 		// Commodity COMBO
			codeComboStore = me.getViewModel().getStore('vesselScheduleCommodityCodeCombo');
		}

		if(codeComboStore != null){
			var indx = -1;
			
			if(cell.column.dataIndex == 'cgTpCd' || cell.column.dataIndex == 'opeType' || cell.column.dataIndex == 'cmdtCd'){
				indx = codeComboStore.find(codeFieldName, val);
			} else {
				indx = codeComboStore.find(codeFieldName, val);
			}

			if (indx != -1){
				return codeComboStore.getAt(indx).get(displayFieldName); 
			}
		}
		
		return '';
	},
	
	// Confirmation Slip1 File Download
	onFileDownloadDblClick: function() {
		var me = this;
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var grid = me.lookupReference('refConfirmationSlipStowagePlanUploadGrid');
		var store = me.getStore('confirmationSlipStowagePlanDownload');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;

		store.load({
			params : {
				'pgmId' : 'confirmSlip1',
				'catgCd' : recvData.get('vslCallId'),
				'ufileNm' : selection.get('ufileName')
			},
			callback: function(records, operation, success) {
				if (success) {
					var content = records[0].data.content.replace(/&lt;/gi,'<').replace(/&gt;/gi,'>');
		        	Ext.exporter.File.saveBinaryAs(content, records[0].data.fileName);
				}
			}
		})
	},
	
	// Stowage Plan Upload
	onAddForFileUpload: function(btn, fileField){
		var me = this;
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var store = me.getStore('confirmationSlipStowagePlanUpload');
		var input = document.querySelector("input[name='vesselScheduleDetailTabFileUpload']");

    	for(var i=0; i<input.files.length; i++){
    		var record = Ext.create('MOST.model.common.FileUpload');
    		
    		file = input.files[i];
    		
    		record.set('pgmId', 'confirmSlip1');
    		record.set('catgCd', recvData.get('vslCallId'));
    		record.set('fileStream', file);
    		record.set('fileName', file.name);
    		record.set('fileSize', file.size);
    		record.set('workingStatus', WorkingStatus.INSERT);
    		
    		store.insert(0, record);
    	}
	},
	
	// Submit Confirmation Slip1
	onSubmitConfirmationSlip1 : function() {
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var store = me.getStore('confirmationSlipStowagePlanUpload');
		var frm = refs.fileForm;
    	var isFileUpload = false;
		
    	if(!me.validateMotherVesselJpvc()){
    		MessageUtil.error('submitConfirmationSlip','vessel_motherjpvc_duplicated_msg');
    		return
    	}
    	
		if(detailView){
			var infoForm = detailView.down('form').getForm();
			var formData = new FormData(frm);
			
			store.getModifiedRecords().forEach(function(record, index, array){
				formData.append(record.data.fileName, record.data.fileStream);
				isFileUpload = true;
	    	});
			
			if(isFileUpload){
				this.stowagePlanFileUpload(formData);
			} else {
				me.submitConfirmaSlip1Process(); // SERVER SAVE
			}
		}
	},
	
	// File Upload
	stowagePlanFileUpload : function(formData){
		var me = this;
		var store = me.getStore('confirmationSlipStowagePlanUpload');
    	var xhr = new XMLHttpRequest();
    	
    	xhr.addEventListener('loadend', function(){
    		if(xhr.status === 200){
    			var rtnData = JSON.parse(xhr.responseText); // get filename - uuid
    			
    			store.getModifiedRecords().forEach(function(record, index, array){
    	    		record.set('ufileName', rtnData[record.get('fileName')]);
    	    	});
    			
    			me.submitConfirmaSlip1Process(); // SERVER SAVE
    		}else{
    			MessageUtil.warning('warning_msg', 'fail_msg');
    		}
    		
    		Ext.MessageBox.hide();
    	});
    	
    	xhr.open('POST', MOST.config.Locale.getRestApiDestUrl() + '/file/manage/fileupload');
    	xhr.setRequestHeader('Authorization', MOST.config.Token.getTokenType() + ' ' + MOST.config.Token.getAccessToken());
    	xhr.send(formData);
    	
    	var msgBox = Ext.MessageBox.show({
			msg: 'Uploading your data...',
			progressText: 'Progressing...',
			width:300,
			wait:true,
			waitConfig: {interval:200}
		});
	},
	
	// Submit Confirmation Slip2 Process
	submitConfirmaSlip1Process:function(){
		var me = this;
		var confirmationItems = new Array();
		var uploadItems = new Array();
		var detailItem = me.getViewModel().get('theConfirmationSlip');
		var confirmationSlipStore = me.getStore('confirmationSlipDryBreakBulk');
		var store = me.getStore('vesselScheduleDetailMain');
		var fileUploadStore = me.getStore('confirmationSlipStowagePlanUpload');

		// File Upload CREATE, UPDATE RECORD
		fileUploadStore.getModifiedRecords().forEach(function(record, index, array){
			record.set('fileStream', null);
			uploadItems.push(record.data);
		});
		
		// File Upload DELETE RECORD
		fileUploadStore.getRemovedRecords().forEach(function(record, index, array){
			uploadItems.push(record.data);
		});
		
		// Dry Bulk CREATE, UPDATE RECORD
		confirmationSlipStore.getModifiedRecords().forEach(function(record, index, array){
			confirmationItems.push(record.data);
		});
		
		// Dry Bulk DELETE RECORD
		confirmationSlipStore.getRemovedRecords().forEach(function(record, index, array){
			confirmationItems.push(record.data);
		});
		
		if(detailItem.dirty == true || confirmationItems.length > 0 || uploadItems.length > 0){
			var proxy = detailItem.getProxy();
			proxy.url = store.getProxy().url;
			
			detailItem.set('items', confirmationItems);
			detailItem.set('uploadItems', uploadItems);
			
			MessageUtil.question('confirm', 'vessel_confirm_submit',null, 
				function(button){
					if (button === 'ok') {
//						var proxy = detailItem.getProxy();
//						proxy.url = confirmationSlipStore.getProxy().url;
						
						detailItem.save({
							success : function(records,success){
								if(success){
									confirmationSlipStore.commitChanges();
									fileUploadStore.commitChanges();
									
									var storeData = confirmationSlipStore.getData();
									var idx = 0;
									
									for(idx =0;idx < storeData.length;idx++ ){
										if(storeData.getAt(idx).get("workingStatus") == 'D'){
											confirmationSlipStore.remove(storeData.getAt(idx));
										} else {
											storeData.getAt(idx).set("workingStatus", 'R');
										}
									}
									
									MessageUtil.saveSuccess();
									
									me.onClearConfirmationSlip1();
									me.onDetailLoad();
								}
							}
						});
					}
				}
			);
		}
	},
	/**
	 * Confirmation Slip1 END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * Confirmation Slip 2 START
	 */
	// ConfirmationSlip2 Grid Row Add
	onConfirmationSlip2GridAdd: function() {
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var detailGrid = me.lookupReference('refConfirmationSlipLiquidBulkGrid');
		var store = me.getStore('confirmationSlipLiquidBulk');
		var editor = detailGrid.getPlugin('confirmationSlipLiquidBulkEditor');
		var record = Ext.create('MOST.model.planning.VesselSchedule');
		
		editor.cancelEdit();
		
		//Clear filter for Grid
		detailGrid.filters.clearFilters();
		detailGrid.filters.disable();
		
		//Clear filter for Store
		store.clearFilter();
		
		var idx = 0;
		
		if(detailGrid.getSelection() && detailGrid.getSelection().length>0) {
			idx = store.indexOfId(detailGrid.getSelection()[0].get('id'));
		}
		
		store.insert(idx, record);
		record.set('vslCallId', recvData.get('vslCallId'));
		detailGrid.getSelectionModel().select(record);
		
		editor.startEdit(record);
	},
	
	onAddConfirmationSlip2: function() {
		var me = this;
		var detailView = me.getDetailBizView();

		if(detailView){
			var infoForm = detailView.down('form').getForm();
			
			if(infoForm.isValid()){
				me.onAddCs2();
			} else {
				MessageUtil.mandatoryFieldInValid();
			}
		}
	},
	
	onAddCs2:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var detailGrid = me.lookupReference('refConfirmationSlipLiquidBulkGrid');
		var store = me.getStore('confirmationSlipLiquidBulk');
		var record = Ext.create('MOST.model.planning.VesselSchedule');
		
		if( refs.refCgTpComboBox.getValue() === 'LQN' && refs.ctlUnno.getValue() ===''){
			MessageUtil.warning('warning_msg', 'Cargo Type is Liquid Non Edible. So UN No/Class can not be blank.');
			return;
		}
		
		//Clear filter for Grid
		detailGrid.filters.clearFilters();
		detailGrid.filters.disable();
		
		//Clear filter for Store
		store.clearFilter();
		
		var idx = 0;
		
		if(detailGrid.getSelection() && detailGrid.getSelection().length>0) {
			idx = store.indexOfId(detailGrid.getSelection()[0].get('id'));
		}
		var theConfirmationSlip = me.getViewModel().get('theConfirmationSlip')
		record.set('vslCallId', recvData.get('vslCallId'));
		record.set('scn', recvData.get('scn'));
		record.set('cgTpCd', theConfirmationSlip.get('cgTpCd'));
		record.set('cgOptTpCd', refs.refCgOpeComboBox.getValue());
		record.set('cmdtCd', theConfirmationSlip.get('cmdtCd'));
		record.set('pkgTpCd', theConfirmationSlip.get('pkgTpCd'));
		record.set('opeHr', refs.refEstOprTime.getValue());
		record.set('workDd', 0);
		record.set('wgt', refs.refTotalTonnage.getValue());
		record.set('msrmt', 0);
		record.set('qty', 0);
		record.set('tmnlOpr', refs.ctlTmnlOpr.getValue());
		record.set('shprCnsne', theConfirmationSlip.get('shprCnsne'));
		record.set('cnsne', theConfirmationSlip.get('cnsne'));
		record.set('unno', refs.ctlUnno.getValue());
		record.set('imdg', refs.ctlImdg.getValue());
		record.set('fdest', refs.ctlPOD.getValue());
		record.set('pol', refs.ctlPOL.getValue());
		record.set('crc', refs.refCRC.getValue());
		record.set('blNo', refs.refBlSnNoComboBox.getValue());
		record.set('remark', refs.refRemark.getValue());
		record.set('delvTpCd', refs.ctlDeliveryMode.getValue());
		record.set('eqTpCd', theConfirmationSlip.get('eqTpCd'));
		if(refs.ctlDeliveryMode.getValue() == 'D'){
			record.set('delvTpNm', 'Direct');
		} else if(refs.ctlDeliveryMode.getValue() == 'I'){
			record.set('delvTpNm', 'Indirect');
		}else if(refs.ctlDeliveryMode.getValue() == 'B'){
			record.set('delvTpNm', 'Direct and Indirect');
		}
		
		if(refs.ctlUnno.getValue() == ''){
			record.set('dgChk', 'N');
			record.set('dgSeq', '');
		};
		record.set('workingStatus', 'C');
		
		var cnsneItem = me.getViewModel().get('theCnsne');
		var shpItem = me.getViewModel().get('theShp');
		var pkgItem = me.getViewModel().get('thePkgTp');
		
		record.set('cnsneNm', (cnsneItem != null? cnsneItem.get('engPtyNm') : ''));
		record.set('cnsneAddr', (cnsneItem != null? cnsneItem.get('addr') : ''));
		record.set('shpNm', (shpItem != null? cnsneItem.get('engPtyNm') : ''));
		record.set('shpAddr', (shpItem != null? cnsneItem.get('addr') : ''));
		record.set('pkgTpNm', (pkgItem != null? pkgItem.get('cdNm') : ''));
		
		store.insert(idx, record);	
		detailGrid.getSelectionModel().select(record);
		
//		me.onClearConfirmationSlip2();
	},
	
	onSetCrcAndOpeHrs: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('confirmationSlipLiquidBulk');
		var storeData = store.getData();
		var idx = 0;
		var maxCrc = 0;
		var totalHrs = 0;
		
		if(storeData.length > 0){
			for(idx =0;idx < storeData.length;idx++ ){
				if(storeData.getAt(idx).get("workingStatus") != 'D'){
					if(storeData.getAt(idx).get("crc")){
						var compareValue = Number(storeData.getAt(idx).get("crc"));
						if(maxCrc < compareValue){
							maxCrc = compareValue;
						}
					}
					
					if(storeData.getAt(idx).get("opeHr")){
						totalHrs += storeData.getAt(idx).get("opeHr");
					}
				}
			}
		}
		
		refs.ctlCrc.setValue(maxCrc);
		refs.refTotalOpeHrs.setValue(totalHrs);
	},
	
	// ConfirmationSlip2 Grid Edit
	onConfirmationSlip2Edit : function(editor, context){
		context.record.data.workingStatus = context.record.crudState;
	},
	
	// ConfirmationSlip2 Grid Validate Edit
	onConfirmationSlip2ValidateEdit : function(editor, context) {
		var me = this;
		
		if(context.record.phatom){
			var store = me.getStore('confirmationSlipDryBreakBulk');
			return true;
		}
	},
	
	// ConfirmationSlip2 Grid Cancel Edit
	onConfirmationSlip2CancelEdit : function(rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},
	
	// ConfirmationSlip2 Grid Remove
	onConfirmationSlip2GridRemove: function() {
		var me = this;
		var grid = me.lookupReference('refConfirmationSlipLiquidBulkGrid');
		var store = me.getStore('confirmationSlipLiquidBulk');		
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection == null) return;
		
		Ext.each(selection, function (record) {
			record.set('workingStatus', WorkingStatus.DELETE);
			store.remove(record);
		});
	},
	
	// CargoType Liquid Combo Change Event
	onCargoTypeLiquidComboChange: function(combo, value, obj){
		var me = this;
		var refs = me.getReferences();

		if(value === 'SL' || value === 'SD' || value === 'LQN'){
			refs.refCRC.setValue(0);
			refs.refCRC.setDisabled(true);
		} else {
			refs.refCRC.setDisabled(false);
		}
	},
	
	// BL NO Combo Change
	onBlNoComboChange: function(combo, value, obj){
		var me = this;
		var refs = me.getReferences();
		if(!value) return
		var selection = combo.selection;
		var theConfirmationSlip = me.getViewModel().get('theConfirmationSlip')
		if(selection != null){
			var {delvTpCd, cgTpCd, shprCnsne, cnsne, cmdtCd, pkgTpCd, unno, imdg, pol, pod, shprNm, cnsneNm, cmdtDesc, pkgTpNm} = selection.data
			var wgt = selection.get('wgt');		
			if(wgt != null){
				refs.refTotalTonnage.setValue(wgt);
			} else {
				refs.refTotalTonnage.setValue(0);
			}
			theConfirmationSlip.set('delvTpCd', delvTpCd)
			theConfirmationSlip.set('cgTpCd', cgTpCd)
			theConfirmationSlip.set('shprCnsne', shprCnsne)
			theConfirmationSlip.set('cnsne', cnsne)
			theConfirmationSlip.set('cmdtCd', cmdtCd)
			theConfirmationSlip.set('pkgTpCd', pkgTpCd)
			theConfirmationSlip.set('unno', unno)
			theConfirmationSlip.set('imdg', imdg)
			theConfirmationSlip.set('pol', pol)
			theConfirmationSlip.set('fdest', pod)
			theConfirmationSlip.set('shprNm', shprNm)
			theConfirmationSlip.set('cnsneNm', cnsneNm)
			theConfirmationSlip.set('cmdtDesc', cmdtDesc)
			theConfirmationSlip.set('pkgTpNm', pkgTpNm)
		}
	},
	// Cargo Operation Combo Change Event
	onCargoOperationComboChange: function(combo, value, obj){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
		var blSnNoCombo = me.getStore('vesselScheduleBlSnNoCombo');
		var cgOprArr = ['DS', 'SD', 'TD']
		var isBLCb = cgOprArr.includes(value)
		
		if(!value){
			me.onClearConfirmationSlip2()
			refs.refBlSnNoComboBox.setDisabled(true)
			return
		}else{
			refs.refBlSnNoComboBox.setDisabled(false)
		}
		blSnNoCombo.clearFilter()
		if(isBLCb){
			blSnNoCombo.filterBy(function(record, id){
				if(record.get('catgCd') == 'I'){
					return record;
				}
			});
		}else{
			blSnNoCombo.filterBy(function(record, id){
				if(record.get('catgCd') == 'E'){
					return record;
				}
			});
		}
		
		// if(true){
		// 	var catgCd = 'I';
			
		// 	if(value === 'TD'){
		// 		catgCd = 'T';
		// 	}
			
		// 	blSnNoCombo.load({
		// 		params: {
		// 			vslCallId: recvData.data.vslCallId,
		// 			catgCd: catgCd
		// 		},
		// 		callback:function(records, operation, success){
		// 			if(success){
		// 				refs.refBlSnNoComboBox.setDisabled(false);
		// 			}
		// 		}
		// 	});
		// } else {
		// 	refs.refBlSnNoComboBox.setDisabled(true);
		// 	blSnNoCombo.removeAll();
		// 	blSnNoCombo.commitChanges();
		// }
		
		if(value === 'SL' || value === 'SD'){
			refs.refTemperatureReady.setDisabled(true);
			refs.refCargoready.setDisabled(true);
			refs.refTankready.setDisabled(true);
			refs.refUllageready.setDisabled(true);
			refs.refDocumentsready.setDisabled(true);
			
			refs.ctlTmnlOpr.getReferences().ctlField.setDisabled(true);
			refs.ctlTmnlOpr.getReferences().ctlField.setValue(null);
			refs.ctlTmnlOpr.getReferences().ctlField.setAllowBlank(true);
			refs.ctlTmnlOpr.setValue(null);
			refs.ctlTmnlOpr.setDisabled(true);
			refs.ctlTmnlOpr.setAllowBlank(true);
			
			refs.ctlPOL.setValue(null);
			refs.ctlPOL.setDisabled(true);
			refs.ctlPOL.setAllowBlank(true);
			
			refs.ctlPOD.setValue(null);
			refs.ctlPOD.setDisabled(true);
			refs.ctlPOD.setAllowBlank(true);
		}else{
			refs.refTemperatureReady.setDisabled(false);
			refs.refCargoready.setDisabled(false);
			refs.refTankready.setDisabled(false);
			refs.refUllageready.setDisabled(false);
			refs.refDocumentsready.setDisabled(false);
			
			refs.ctlTmnlOpr.getReferences().ctlField.setDisabled(false);
			refs.ctlTmnlOpr.getReferences().ctlField.setAllowBlank(false);
			
			refs.ctlTmnlOpr.setDisabled(false);
			refs.ctlTmnlOpr.setAllowBlank(false);
			
			refs.ctlPOL.setDisabled(false);
			refs.ctlPOL.setAllowBlank(false);
			
			refs.ctlPOD.setDisabled(false);
			refs.ctlPOD.setAllowBlank(false);
		}
	},
	
	// Control settings associated with [Cargo Operation Combo]
	setCargoOperationRelationControl: function(combo, value, obj){
		var grid = combo.up('grid');
		
		if(value === 'SL' || value === 'SD'){
			grid.down('[dataIndex=tmnlOpr]').getEditor().setValue(null);
			grid.down('[dataIndex=tmnlOpr]').getEditor().setDisabled(true);
			grid.down('[dataIndex=fdest]').getEditor().setValue(null);
			grid.down('[dataIndex=fdest]').getEditor().setDisabled(true);
		} else {
			grid.down('[dataIndex=tmnlOpr]').getEditor().setDisabled(false);
			grid.down('[dataIndex=fdest]').getEditor().setDisabled(false);
		}
	},
	
	// Liquid Bulk Grid Renderer
	onLiquidBulkGridComboRenderer: function(val, cell){
		var me = this;
        var refs = me.getReferences();
		
		var codeComboStore = null;
		var displayFieldName = 'scdNm';
		var codeFieldName = 'scd';
		
		if(cell.column.dataIndex == 'cgTpCd'){ 				// Cargo Type COMBO
			codeComboStore = me.getViewModel().getStore('vesselScheduleCargoTypeLiquidCombo');
		} else if(cell.column.dataIndex == 'opeType'){ 		// Cargo Operation COMBO
			codeComboStore = me.getViewModel().getStore('vesselScheduleOpeTypeCombo');
		} else if(cell.column.dataIndex == 'shprCnsne' ||
				  cell.column.dataIndex == 'cnsne' ||
				  cell.column.dataIndex == 'tmnlOpr'){ 	// Partner Code COMBO
			codeFieldName = 'ptyCd';
			displayFieldName = 'engPtyNm';
			codeComboStore = me.getViewModel().getStore('vesselSchedulePartnerCodeCombo');
		} else if(cell.column.dataIndex == 'pkgTpCd'){ 		// Package Type COMBO
			codeComboStore = me.getViewModel().getStore('vesselSchedulePkgTpCombo');
		} else if(cell.column.dataIndex == 'unno'){ 		// IMDG COMBO
			codeComboStore = me.getViewModel().getStore('vesselScheduleImdgCombo');
		} else if(cell.column.dataIndex == 'pol' |
				  cell.column.dataIndex == 'fdest'){ 			// Port COMBO
			codeComboStore = me.getViewModel().getStore('vesselSchedulePortCombo');
		}

		if(codeComboStore != null){
			var indx = codeComboStore.find(codeFieldName, val);	

			if (indx != -1){
				return codeComboStore.getAt(indx).get(displayFieldName); 
			}
		}
		
		return '';
	},
	
	onRefConfirmationSlipLiquidBulkGrid_CellClick:function(ctx, td, cellIndex, record, tr, rowIndex, e, eOpts){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refConfirmationSlipLiquidBulkGrid');	
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		if(selection.data.vslCallId == null || selection.data.vslCallId == '') return;
		
		me.rowIndex = rowIndex;
		
		refs.refBlSnNoComboBox.suspendEvent('change');
		
		refs.refCgTpComboBox.setValue(selection.get("cgTpCd"));
		refs.refCgOpeComboBox.setValue(selection.get("cgOptTpCd"));
		refs.ctlCmdtCode.setValue(selection.get("cmdtCd"));
		refs.ctlTypeofPackage.setValue(selection.get("pkgTpCd"));
		refs.refEstOprTime.setValue(selection.get("opeHr"));
		refs.refTotalTonnage.setValue(selection.get("wgt"));
		refs.ctlTmnlOpr.setValue(selection.get("tmnlOpr"));
		refs.ctlShipper.setValue(selection.get("shprCnsne"));
		refs.ctlConsignee.setValue(selection.get("cnsne"));
		refs.ctlUnno.setValue(selection.get("unno"));
		refs.ctlImdg.setValue(selection.get("imdg"));
		refs.ctlPOD.setValue(selection.get("fdest"));
		refs.ctlDeliveryMode.setValue(selection.get('delvTpCd'));
		
		refs.ctlPOL.setValue(selection.get("pol"));
		refs.refCRC.setValue(selection.get("crc"));
		refs.refBlSnNoComboBox.setValue(selection.get("blNo"));
		refs.refRemark.setValue(selection.get("remark"));
		refs.refCS2EqTp.setValue(selection.get("eqTpCd"));
		
		var cnsneItem = Ext.create('MOST.model.popup.PopupService');
		var shpItem = Ext.create('MOST.model.popup.PopupService');
		var pkgItem = Ext.create('MOST.model.popup.PopupService');
		
		cnsneItem.set('ptnrName', selection.get('cnsneNm'));
		cnsneItem.set('addr', selection.get('cnsneAddr'));
		
		shpItem.set('ptnrName', selection.get('shpNm'));
		shpItem.set('addr', selection.get('shpAddr'));
		pkgItem.set('codeName', selection.get('pkgTpNm'));
		
		me.getViewModel().setData({theCnsne:cnsneItem});
		me.getViewModel().setData({theShp:shpItem});
		me.getViewModel().setData({thePkgTp:pkgItem});
		
		refs.refBlSnNoComboBox.resumeEvent('change');
	},
	
	onUpdateConfirmationSlip2:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refConfirmationSlipLiquidBulkGrid;
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		if(selection.data.vslCallId == null || selection.data.vslCallId == '') return;
		
		var me = this;
		var detailView = me.getDetailBizView();
		
		if(!detailView){
			me.setDetailBizView('app-vesselscheduledetail');
			detailView = me.getDetailBizView();
		}
		
		if(detailView){
			var infoForm = detailView.down('form').getForm();
			
			if(infoForm.isValid()){
				me.onUpdateCs2();
			} else {
				MessageUtil.mandatoryFieldInValid();
			}
		}
	},
	
	onUpdateCs2: function() {
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refConfirmationSlipLiquidBulkGrid;
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		selection.set('workingStatus', WorkingStatus.UPDATE);
		selection.set('cgTpCd', refs.refCgTpComboBox.getValue());
		selection.set('cgOptTpCd', refs.refCgOpeComboBox.getValue());
		selection.set('cmdtCd', refs.ctlCmdtCode.getValue());
		selection.set('pkgTpCd', refs.ctlTypeofPackage.getValue());
		selection.set('opeHr', refs.refEstOprTime.getValue());
		selection.set('wgt', refs.refTotalTonnage.getValue());
		selection.set('tmnlOpr', refs.ctlTmnlOpr.getValue());
		selection.set('shprCnsne', refs.ctlShipper.getValue());
		selection.set('cnsne', refs.ctlConsignee.getValue());
		selection.set('unno', refs.ctlUnno.getValue());
		selection.set('imdg', refs.ctlImdg.getValue());
		selection.set('fdest', refs.ctlPOD.getValue());
		selection.set('pol', refs.ctlPOL.getValue());
		selection.set('crc', refs.refCRC.getValue());
		selection.set('blNo', refs.refBlSnNoComboBox.getValue());
		selection.set('remark', refs.refRemark.getValue());
		selection.set('eqTpCd', refs.refCS2EqTp.getValue());
	},
	
	onDeleteConfirmationSlip2:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('confirmationSlipLiquidBulk');
		var vesselScheduleDetailMain = me.getStore('vesselScheduleDetailMain');
		var grid = refs.refConfirmationSlipLiquidBulkGrid;
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		if(selection.data.vslCallId == null || selection.data.vslCallId == '') return;
		
		if(selection.crudState == 'C'){
			Ext.each(selection, function (record) {
				record.set('workingStatus', WorkingStatus.DELETE);
				store.remove(record);
			});
		} else {
			Ext.each(selection, function (record) {
				if(vesselScheduleDetailMain.data.items[0].data.cargoSummary.length > 0 && MOST.config.Token.getUserType() === CONSTANTS.USER_TYPE_EXTERNAL){
					MessageUtil.warning("Warning", "vessel_confirmslip2_delete_msg");
					return;
			    } else {
			    	selection.set('workingStatus', WorkingStatus.DELETE);
			    }
			});
		}
	},
	
	onClearConfirmationSlip2:function(){
		var me = this;
		var refs = me.getReferences();
		var confirmationSlipItem = new Ext.create('MOST.model.planning.VesselSchedule');
		me.getViewModel().setData({theConfirmationSlip:confirmationSlipItem});
		refs.refTotalTonnage.setValue();
		// refs.ctlDeliveryMode.setValue();
		// refs.refCgTpComboBox.setValue();
		// refs.refCgOpeComboBox.setValue();
		// refs.refBlSnNoComboBox.setValue();
		// refs.ctlCmdtCode.setValue();
		// refs.ctlTypeofPackage.setValue();
		// refs.refEstOprTime.setValue();
		// refs.ctlTmnlOpr.setValue();
		// refs.ctlShipper.setValue();
		// refs.ctlConsignee.setValue();
		// refs.ctlUnno.setValue();
		// refs.ctlImdg.setValue();
		// refs.ctlPOD.setValue();
		// refs.ctlPOL.setValue();
		// refs.refCRC.setValue();
		// refs.refRemark.setValue();
	},
	
	
	// Submit Confirmation Slip2
	onSubmitConfirmationSlip2 : function() {
		var me = this;
		var detailView = me.getDetailBizView();
		
		if(!me.validateMotherVesselJpvc()){
    		MessageUtil.error('submitConfirmationSlip','vessel_motherjpvc_duplicated_msg');
    		return
    	}
		
		if(detailView){
			var infoForm = detailView.down('form').getForm();
			
			if(infoForm.isValid()){
				me.submitConfirmaSlip2Process();
			} else {
				MessageUtil.mandatoryFieldInValid();
			}
		}
	},
	
	// Submit Confirmation Slip2 Process
	submitConfirmaSlip2Process:function(){
		var me = this;
		var arrItems = new Array();
		var detailItem = me.getViewModel().get('theConfirmationSlip');
		var confirmationSlipStore = me.getStore('confirmationSlipLiquidBulk');
		
		var unExistButNoDg = false;
		
		// CREATE, UPDATE RECORD
		confirmationSlipStore.getModifiedRecords().forEach(function(record, index, array){
//			if(record.data.unno != '' && record.data.dgChk != 'Y' && record.data.cgTpCd != 'LQE'){
//				unExistButNoDg = true;
//				return;
//			}
			//get the modified list except the record of Total information
			if(record.data.vslCallId != ''){
				arrItems.push(record.data);
			}
		});
		
//		if(unExistButNoDg){
//			MessageUtil.alert("submitConfirmationSlip", "vessel_inputdg_message");
//			return;
//		};
		
		// DELETE RECORD
		confirmationSlipStore.getRemovedRecords().forEach(function(record, index, array){
			arrItems.push(record.data);
		});
		
		if(detailItem.dirty == true || arrItems.length > 0){
			MessageUtil.question('confirm', 'vessel_confirm_submit',null, 
					function(button){
						if (button === 'ok') {
							me.onUploadDG(arrItems);
							me.onClearConfirmationSlip2();
						}
					}
				);
		}
	},
		
	submitConfirmaSlip2:function(arrItems){
		var me = this;
		var detailItem = me.getViewModel().get('theConfirmationSlip');
		var confirmationSlipStore = me.getStore('confirmationSlipLiquidBulk');
		var store = me.getStore('vesselScheduleDetailMain'); 
		var proxy = detailItem.getProxy();
		
		proxy.url = store.getProxy().url;
		
		detailItem.set('items', arrItems);
		
		detailItem.save({
			success : function(record, operation) {
				var grid = me.lookupReference('refConfirmationSlipLiquidBulkGrid');
				var selection = grid.getSelection().length == 0 ? null : grid.getSelection()[0];

				if(selection != null) {
					selection.data.dgSeq = record.data.dgSeq;
					confirmationSlipStore.commitChanges();
				}
				
				me.onDetailLoad();
				MessageUtil.saveSuccess();
			}
		});
	},
	
	onUploadDG: function(arrItems) {
    	var me = this;
		var refs = me.getReferences();
		var frm = refs.fileForm;
    	var isFileUpload = false;
		var formData = new FormData(frm);
				
		arrItems.forEach(function(records, index, array){
			if(records.dgItems != null && records.uploadItems != null){
				records.uploadItems.forEach(function(record, index, array){
					if(record.workingStatus != 'D'){
						formData.append(record.fileName, record.fileStream);
						isFileUpload = true;
					}
				});
			}
		});
		
		if(isFileUpload){
			this.dgFileUpload(arrItems, formData);
		} else {
			me.submitConfirmaSlip2(arrItems); // SERVER SAVE
		}
	},
	
	dgFileUpload : function(arrItems, formData){
		var me = this;
    	var xhr = new XMLHttpRequest();
    	
    	xhr.addEventListener('loadend', function(){
    		if(xhr.status === 200){
    			var rtnData = JSON.parse(xhr.responseText); // get filename - uuid
    			
    			arrItems.forEach(function(records, index, array){
					records.uploadItems.forEach(function(record, index, array){
						record.ufileName = rtnData[record.fileName];
						record.fileStream =  null;
					});
				});
    			
    			me.submitConfirmaSlip2(arrItems);  // SERVER SAVE
    		}else{
    			MessageUtil.warning('warning_msg', 'fail_msg');
    		}
    		
    		Ext.MessageBox.hide();
    	});
    	
    	xhr.open('POST', MOST.config.Locale.getRestApiDestUrl() + '/file/manage/fileupload');
    	xhr.setRequestHeader('Authorization', MOST.config.Token.getTokenType() + ' ' + MOST.config.Token.getAccessToken());
    	xhr.send(formData);
    	
    	var msgBox = Ext.MessageBox.show({
			msg: 'Uploading your data...',
			progressText: 'Progressing...',
			width:300,
			wait:true,
			waitConfig: {interval:200}
		});
	},
	/**
	 * Confirmation Slip2 END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * ISPS START
	 */
	setIsps:function(sourceItems){
		var me = this;
		
		if(sourceItems != null){
			sourceItems.forEach(function(record, index, array){
				me.setIspsValue(record);		// Control
				me.setIspsValue(record, true);	// Detail Control
			});
		}	
	},
	
	// set value to Isps Control
	setIspsValue: function(record, isDetail){
		var me = this;
		var control = null;
		var tempValue;
		var fieldName = me.getIspsFieldName(record);
		var propertyName = '';
		
		if(isDetail){
			propertyName = 'isQuestDtl';
			control = me.lookupReference(Ext.String.format('ctl_{0}_dtl', fieldName));
		} else {
			propertyName = 'isQuest';
			control = me.lookupReference(Ext.String.format('ctl_{0}', fieldName));
		}
		
		if(control != null){
			if(control.xtype === 'radiogroup'){
				tempValue = {};
				tempValue[fieldName] = record[propertyName];
			} else {
				tempValue = record[propertyName];
			}
			
			control.setValue(tempValue);
		}
	},
	
	getIspsFieldName: function(record, isDetail){
		var seq = parseInt(record.qseq);
		
		if(isDetail){
			return Ext.String.format('{0}_{1}_q_dtl', record.docId.toLowerCase(), seq);
		} else{
			return Ext.String.format('{0}_{1}_q', record.docId.toLowerCase(), seq);
		}
	},
	
	onVslInternalPreviewPDf:function(){

		var me = this;
		var refs = me.getReferences();
		
		me.getView().detailViewAlias = 'popup-vslschexporttypepopup';
		var record = {
			mode:'preview'
		}
		
		me.openDetailPopup(record);
	},
	
	onVslInternalExport:function(){
		var me = this;
		var refs = me.getReferences();
		
		me.getView().detailViewAlias = 'popup-vslschexporttypepopup';
		var record = {
			mode:'export'
		}
		
		me.openDetailPopup(record);
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.planning.SearchVesselScheduleParm';
		searchBizParm.serviceID = 'MOST.vesselScheduleInternal.selectVesselScheduleList';

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	
	onDetailDownload:function(){
		var me = this;
		var refs = me.getReferences();
		var params = me.getSearchCondition();
		var exportReport = me.getStore('exportReport');
		var exportSlip = me.getStore('exportSlip');
		var mainItem = me.getView().getViewModel().get('theMain');
		
		if(me.getView().detailViewAlias == 'app-vesselscheduledetail'){
			me.getView().detailViewAlias = 'popup-reportforconfirmationslippopup';
			var record = {
					mode:'download'
				}
			
			me.openDetailPopup(record);
			return;
		}else if(me.getView().detailViewAlias == 'popup-exporttypepopup'){
			params['rptTp'] = refs.refRadioReportType.getValue().rb;
			exportReport.load({
				params: params,
				callback: function(records, operation, success) {
					if (success) {
						var content = records[0].data.content.replace(/&lt;/gi,'<').replace(/&gt;/gi,'>'); 
						Ext.exporter.File.saveBinaryAs(content, records[0].data.fileName);
					}
				}
			})
		}else if(me.getView().detailViewAlias == 'popup-reportforconfirmationslippopup'){
			params['rptTp'] = refs.refRadioReportType.getValue().rb;
			params['vslCallId'] = mainItem.get('vslCallId');
			
			exportSlip.load({
				params: params,
				callback: function(records, operation, success) {
					if (success) {
						var content = records[0].data.content.replace(/&lt;/gi,'<').replace(/&gt;/gi,'>'); 
						Ext.exporter.File.saveBinaryAs(content, records[0].data.fileName);
					}
				}
			})
		}else if(me.getView().detailViewAlias == 'popup-vslschexporttypepopup'){
			
			if(StringUtil.isNullorEmpty(refs.refCboReportNm.getValue())){
				MessageUtil.error('Warning','rpt_nm_blank');
				return;
			}else{
				if(refs.refCboReportNm.getValue() == "shipsch"){
					if(StringUtil.isNullorEmpty(refs.refCboReportLocation.getValue())){
						MessageUtil.error('Warning','rpt_loc_blank');
						return;
					}
				}
			}
			
			params['rptTp'] = refs.refRadioReportType.getValue().rb;
			params['rptNm'] = refs.refCboReportNm.getValue();
			params['rptLoc'] = refs.refCboReportLocation.getValue();
			
			exportReport.load({
				params: params,
				callback: function(records, operation, success) {
					if (success) {
						var content = records[0].data.content.replace(/&lt;/gi,'<').replace(/&gt;/gi,'>'); 
						Ext.exporter.File.saveBinaryAs(content, records[0].data.fileName);
					}
				}
			})
		}
		
		
	},
	
	onDetailPreview:function(){
		var me = this;
		var refs = me.getReferences();
		var params = me.getSearchCondition();
		var generatePDF = me.getStore('generatePDF');
		var exportSlip = me.getStore('exportSlip');
		var mainItem = me.getView().getViewModel().get('theMain');
		
		if(me.getView().detailViewAlias == 'app-vesselscheduledetail'){
			me.getView().detailViewAlias = 'popup-reportforconfirmationslippopup';
			var record = {
					mode:'preview'
				}
			
			me.openDetailPopup(record);
			return;
		} else if(me.getView().detailViewAlias == 'popup-vslschexporttypepopup'){
			
			if(StringUtil.isNullorEmpty(refs.refCboReportNm.getValue())){
				MessageUtil.error('Warning','rpt_nm_blank');
				return;
			}else{
				if(refs.refCboReportNm.getValue() == "shipsch"){
					if(StringUtil.isNullorEmpty(refs.refCboReportLocation.getValue())){
						MessageUtil.error('Warning','rpt_loc_blank');
						return;
					}
				}
			}
			
			params['rptTp'] = refs.refRadioReportType.getValue().rb;
			params['rptNm'] = refs.refCboReportNm.getValue();
			params['rptLoc'] = refs.refCboReportLocation.getValue();
			
			generatePDF.load({
				params: params,
				callback: function(records, operation, success) {
					if (success) {
						me.openPDFPreview (records, operation, success);
					}
				}
			})
		} else if(me.getView().detailViewAlias == 'popup-reportforconfirmationslippopup'){
			params['rptTp'] = refs.refRadioReportType.getValue().rb;
			params['vslCallId'] = mainItem.get('vslCallId');
			exportSlip.load({
				params: params,
				callback: function(records, operation, success) {
					if (success) {
						me.openPDFPreview (records, operation, success);
					}
				}
			})
		}
	},
	
	onReportConfirmationSlipDestroy:function(){
		var me = this;
		var refs = me.getReferences();
		
		me.getView().detailViewAlias = 'app-vesselscheduledetail';
	},
	
	onPreviewLoad:function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getDetailBizView().items.get(0).recvData;
		
		me.visibleDetailToolButton(ViewUtil.TOOL_SAVE, false);
		
		if(recvData.mode == 'preview'){
			refs.refRadioExcel.setHidden(true);
			me.visibleDetailToolButton(ViewUtil.TOOL_PREVIEW, true);
			me.visibleDetailToolButton(ViewUtil.TOOL_DOWNLOAD, false);
		}else{
			refs.refRadioExcel.setHidden(false);
			me.visibleDetailToolButton(ViewUtil.TOOL_PREVIEW, false);
			me.visibleDetailToolButton(ViewUtil.TOOL_DOWNLOAD, true);
		}
		
	},
	
	onReportTypeSelect:function(ele, rec, idx){
		var me = this;
		var refs = me.getReferences();
		
		if(rec.get('scd') == 'shipsch'){
			refs.refCboReportLocation.setHidden(false);
		}else{
			refs.refCboReportLocation.setHidden(true);
		}
	},
	
	onPreviewDetailLoad:function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getDetailBizView().items.get(0).recvData;	
		me.visibleDetailToolButton(ViewUtil.TOOL_SAVE, false);
		
		if(recvData.mode == 'preview'){
			me.visibleDetailToolButton(ViewUtil.TOOL_PREVIEW, true);
			me.visibleDetailToolButton(ViewUtil.TOOL_DOWNLOAD, false);
		}else{
			me.visibleDetailToolButton(ViewUtil.TOOL_PREVIEW, false);
			me.visibleDetailToolButton(ViewUtil.TOOL_DOWNLOAD, true);
		}
		
	},
	
	onReportVslExportTpDestroy:function(){
		var me = this;
		var refs = me.getReferences();
		
		me.getView().detailViewAlias = 'app-vesselscheduledetail';
	},

    exportTo: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
    	
        var cfg = Ext.merge({
            title: 'Vessel Schedule',
            fileName: 'Vessel_Schedule' + '.' + (btn.cfg.ext || btn.cfg.type)
        }, btn.cfg);

        var grid = refs.refVesselScheduleInternalGrid;
        grid.saveDocumentAs(cfg);
    },
    
    openVslCallListPopup: function(){
    	var me = this;
		me.openCodePopup('popup-vesselcalllistpopup', 'ctlVesselCallId');
    },
	onRequestTimeLoad: function(){
		var me = this
		var refs = me.getReferences()
		var theDetail = me.getViewModel().get('theMain')
		var addPropStrings = ['readinessAta', 'vslDlRsn']

		addPropStrings.forEach(function(prop){
			var ref = "ref" + prop.charAt(0).toUpperCase () + prop.slice(1)
			if(refs[ref]) refs[ref].setValue(theDetail.get(prop))
		})
	},

	onRequestTimeOK: function(btn) {
		var me = this
		var refs = me.getReferences()
		var window = btn.up('window');
		var theDetail = me.getViewModel().get('theMain')
		var addPropStrings = ['readinessAta', 'vslDlRsn']
		var tabName = refs.ctlVesselDetailTabPanel.getActiveTab().name;


		if(window){
			addPropStrings.forEach(function(prop){
				var ref = "ref" + prop.charAt(0).toUpperCase () + prop.slice(1)
				if(refs[ref]) theDetail.set(prop, refs[ref].getValue())
			})
			if(tabName === 'cs2'){
				theDetail.set('eta', theDetail.get('readinessAta'))
			}
			window.close();	
		}
	},

	
	/**
	 * ISPS END
	 * =========================================================================================================================
	 */
});