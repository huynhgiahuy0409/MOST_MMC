Ext.define('MOST.view.operation.VSRCheckListController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.vsrchecklist',
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refVSRCheckListGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'vsrCheckList',			// Main Store Name

	MANPOWER_GRID_REF_NAME: 'refManPowerGrid',
	MANPOWER_STORE_NAME: 'manPowerList',

	STEVEDORE_GRID_REF_NAME: 'refStevedoreGrid',
	STEVEDORE_STORE_NAME: 'stevedoreList',
	
	ADP: 'ADP',
	
	MAX_PERIOD_DAY : 7,
	empNm:'',
	engNm:'',
	capaCd:'',
	equNo:'',
	mbsCd:'',
	isDriver:'',
	cnrtCd:'',
	click: '0', //btnRetrieve
	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */	
	
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var shiftStore = me.getStore('shiftCombo');
		shiftStore.load();
		
		var searchParm = Ext.create('MOST.model.operation.SearchVSRCheckListParm');
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		if(recvData != null){
	     	refs.ctlVslCallId.setValue(recvData.vslCallId);
	     	refs.ctlShift.setValue(recvData.shftId);
	     	refs.ctlFromDt.setValue('');
			refs.ctlToDt.setValue('');
	     	me.onSearch();
		}
		me.setDateInDays("ctlFromDt", -7);
	},
	
	/**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	

	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	//Role combo select
	 onSelectManPowerRoleCombo :function(combo, record, eOpts){
		var me = this;
		var refs = me.getReferences();

		refs.ctlEmpId.setValue();
		refs.refEmpNm.setValue();
		
		var newValue = record.get('scd');
		refs.refEmpPopupBtn.setDisabled(!(newValue !== null && newValue !== ''));

	 },

	// Date Change Event
	onDateChange:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		refs.ctlVslCallId.setValue('');
		if(control == refs.ctlFromDt){
			me.setDateInDaysByDate("ctlToDt", me.MAX_PERIOD_DAY, control.getValue());
		} else {
			me.setDateInDaysByDate("ctlFromDt", -me.MAX_PERIOD_DAY, control.getValue());
		}
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		if(targetControl == 'ctlVslCallId'){ 
			if(returnValue){
				refs.ctlFromDt.setValue('');
				refs.ctlToDt.setValue('');
				me.getViewModel().setData({theVsl:returnValue.item});
				/*refs.ctlVslCallId.refs.ctlF*/
				refs.ctlScn.setValue(returnValue.item.get('scn'));
				me.onSearch();
			} 
		}else if(targetControl == 'ctlWorkingArea'){ 
			if(returnValue){
				refs.refWorkingArea.getEditor().setValue(returnValue);
			} 
		}else if(targetControl == 'refCboContractor'){
			me.cnrtCd = returnValue.code;
		}else if(targetControl == 'refStevedoreRequestor'){
			refs.refStevedoreRequestor.setValue(returnValue.code);
		}else if(targetControl == 'refPCRequestor'){
			refs.refPCRequestor.setValue(returnValue.code);
		}else if(targetControl == 'refFLRequestor'){
			refs.refFLRequestor.setValue(returnValue.code);
		}else if(targetControl == 'refTRRequestor'){
			refs.refTRRequestor.setValue(returnValue.code);
		}else if(targetControl == 'refMERequestor'){
			refs.refMERequestor.setValue(returnValue.code);
		}else if(targetControl == 'ctlTREquipmentCode'){
			refs.ctlTREquipmentCode.setValue(returnValue.item.data.capaCd);
			refs.ctlTREquipmentCodeDesc.setValue(returnValue.code);
			refs.ctlTREquipmentDivCd.setValue(returnValue.item.data.eqDivCd);
		}else if(targetControl == 'ctlMEEquipmentCode'){
			refs.ctlMEEquipmentCode.setValue(returnValue.code);
			refs.ctlMEEquipmentName.setValue(returnValue.item.data.capaCd);
			refs.ctlMEEquipmentType.setValue(returnValue.item.data.eqDivCd);
		}else if(targetControl == 'refPCContractorCd'){
			refs.refPCContractorCd.setValue(returnValue.code);
		}else if(targetControl == 'refFLContractorCd'){
			refs.refFLContractorCd.setValue(returnValue.code);
		}else if(targetControl == 'refTRContractorCd'){
			refs.refTRContractorCd.setValue(returnValue.code);
		}else if(targetControl == 'refMEContractorCd'){
			refs.refMEContractorCd.setValue(returnValue.code);
		}else if(targetControl == 'ctlEmpId'){
			if(returnValue){
				refs.ctlEmpId.setValue(returnValue.item.data.empId);
				refs.refEmpNm.setValue(returnValue.item.data.empNm);
				refs.refRoleCd.setValue(refs.refRoleCd.getValue());
			}
		} else if(targetControl === 'ctlScn'){ 
			if(returnValue){
				refs.ctlScn.setValue(returnValue.code);

				if(!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))){
					refs.ctlFromDt.setValue('');
					refs.ctlToDt.setValue('');
					refs.ctlVslCallId.setValue(returnValue.item.get('vslCallId'));
					me.getViewModel().setData({theVsl:returnValue.item});
					me.onSearch();
				}else {
					refs.ctlFromDt.setValue('');
					refs.ctlToDt.setValue('');
					refs.ctlVslCallId.setValue('');
					me.getViewModel().setData({theVsl:null});
				}
			} 
		}
	},

	// Search Event Handler
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore('vsrCheckList');
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						var recvData = me.getView().recvData;
						
						if(recvData != null){
							me.openDetailPopup(records[0], 'Check List for Vessel Service Report');
						}
					}
				}
			}
		});
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
		
		
		var vslCallId = searchParm.get('vslCallID');
		var scn	= searchParm.get('scn');
		var shftId = searchParm.get('shftId');
		var workStDt = '';
		var workEndDt = '';
		
		if(refs.ctlFromDt.getValue() != null && refs.ctlToDt.getValue() != null){
			dateCondition = me.checkPeriodDate("ctlFromDt", "ctlToDt", me.MAX_DATE_ALLOW, true);
			workStDt = dateCondition.fromDtString;
			workEndDt = dateCondition.toDtString;
		}
		
	 	var searchType = 'VSRList';
		var params = {
			workStDt 		: workStDt,
			workEndDt 		: workEndDt,
			shftId 			: shftId,
			vslCallID 		: vslCallId,
			scn				: scn,
			searchType		: searchType,
			pageNo			: pageNo,
			sizePerPage 	: sizePerPage,
			sort			: grid.getSortString()
		};
		
		return params;
	},
	
	onCreate: function(){
		var me = this;
		var refs = me.getReferences();
		var purposeCombo = me.getStore('purposeCombo');
		if(purposeCombo.loadCount <= 0){
			purposeCombo.load();
		}
		if(refs.ctlVslCallId.getValue() == null || refs.ctlVslCallId.getValue() == ''){
			MessageUtil.alert('Warning', 'vslchecklist_selectjpvc');
		}else{
			var grid = me.lookupReference('refVSRCheckListGrid');
			var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
			if (selection) {
				var viewModel = me.getViewModel();
			    viewModel.set('theVsl.vslCallId', 	selection.data.vslCallID);
			    viewModel.set('theVsl.vslCd', 		selection.data.vslCd);
				viewModel.set('theVsl.vslNm', 		selection.data.vslName);
				viewModel.set('theVsl.voyage', 		selection.data.voyage);
				viewModel.set('theVsl.arrvSaId', 	selection.data.arrvSaId);
				viewModel.set('theVsl.eta', 		selection.data.eta);
				viewModel.set('theVsl.etd', 		selection.data.etd);
				viewModel.set('theVsl.berthLoc', 	selection.data.berthLoc);
			}		
			me.openDetailPopup(null, 'Check List for Vessel Service Report');
		}
	},
	
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference('refVSRCheckListGrid');

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		var purposeCombo = me.getStore('purposeCombo');
		if(purposeCombo.loadCount <= 0){
			purposeCombo.load();
		}
		//Get Vessel data from row selected
		var viewModel = me.getViewModel();
	    viewModel.set('theVsl.vslCallId', 	selection.data.vslCallID);
	    viewModel.set('theVsl.vslCd', 		selection.data.vslCd);
		viewModel.set('theVsl.vslNm', 		selection.data.vslName);
		viewModel.set('theVsl.voyage', 		selection.data.voyage);
		viewModel.set('theVsl.arrvSaId', 	selection.data.arrvSaId);
		viewModel.set('theVsl.eta', 		selection.data.eta);
		viewModel.set('theVsl.etd', 		selection.data.etd);
		viewModel.set('theVsl.berthLoc', 	selection.data.berthLoc);
	    
		me.getView().detailViewAlias = 'app-vsrchecklistdetail';
		me.openDetailPopup(selection, 'Check List for Vessel Service Report');
	},
	
	/**
	 * =========================================================================================================================
	 * DETAIL START
	 */
	// Detail Load
	onDetailLoad:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		me.setDetailInitialize();
	},
	
	// Detail Initialize
	setDetailInitialize:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		me.clearData();
		me.onRefreshAllVSRTab();
		me.setDetailControl(recvData);
	},
	
	// Detail Control Setting
	setDetailControl:function(recvData){
		var me = this;
		var refs = me.getReferences();
		var empFLCombo = me.getStore('empFLCombo');
		var eqPCCombo = me.getStore('eqPCCombo');

		refs.refFLCmbJPB.setValue('');
		
		me.loadCombo(recvData);	
		
		if(recvData != null){
			var vsrCheckListDetail = me.getStore('vsrCheckListDetail');
			refs.refWorkYmd.suspendEvents();
			refs.refShift.suspendEvents();
			
			refs.refWorkYmd.setValue(recvData.data.workYmd);
			refs.refShift.setValue(recvData.data.shftId);
			
			//refs.refBtnRetrieve.setDisabled(true);
			
			refs.refFLCmbJPB.setDisabled(true);
			refs.refFLContractorCd.setDisabled(true);
			
			refs.refPCCargoType.setValue('BBK');
			refs.refFLCargoType.setValue('BBK');
			refs.refTRCargoType.setValue('BBK');
			refs.refMECargoType.setValue('BBK');
			refs.refPCContractorCd.setDisabled(true);
			
			vsrCheckListDetail.load({
				params: {
					vslCallID : recvData.data.vslCallID,
					shftId : recvData.data.shftId,
					workYmd : recvData.data.workYmd
				},
				callback: function(records, operation, success) {
					if (success) {
						if (records.length > 0) {
							var theModel = Ext.create('MOST.model.operation.VSRCheckList');
							theModel.phantom = false; // UPDATE
							theModel.data = records[0].data;
							me.getViewModel().setData({theVSR:theModel});

							if(records[0].data.searchJPVCItem.length > 0){
								me.getViewModel().setData({theVsl:records[0].data.searchJPVCItem[0]});
							}
							me.setManPower(records[0].data);
							me.setForklift(records[0].data);
							me.setMechanicalEq(records[0].data);
							me.setPortCrane(records[0].data);
							me.setTrailer(records[0].data);
							me.setStevedore(records[0].data);
							me.setMegaPC(records[0].data);
							me.setMegaF(records[0].data);
							me.setMegaTR(records[0].data);
							me.setMegaME(records[0].data);
							
							// empFLCombo.setData(records[0].get('flEmpList'));
							// empFLCombo.insert(0, [{"empId":"", "empNm":"Select"},]);

							me.onControlsInitialze();
						}
					}
					refs.refWorkYmd.resumeEvents();
					refs.refShift.resumeEvents();
				}
			});
			
		}else{
			var theModel = Ext.create('MOST.model.operation.VSRCheckList');
			//theModel.phantom = false; // UPDATE
			//theModel.data = records[0].data;
			me.getViewModel().setData({theVSR:theModel});
			//me.onRetrieve();
		}
	},
	
	onControlsInitialze:function(){
		var me = this;
		var refs = me.getReferences();
		
		// Man Power
		refs.refRoleCd.setValue('');
		refs.ctlEmpId.setValue('');
		refs.refEmpNm.setValue('');
		refs.ctlManPowerWorkingArea.setValue('');
		refs.refManPowerRemarks.setValue('');
		
		// Stevedore
		refs.refStevedoreCompany.setValue('');
		refs.refSupervisor.setValue('0');
		refs.refNonTonnage.setValue('0');
		refs.ctlStevedoreWorkingArea.setValue('');
		refs.refStevedoreRemarks.setValue('');
		refs.refStevedoreRequestor.setValue('');
		
		// Port Crane
		refs.ctlPCPurpose.setValue('');
		refs.ctlPortCrane.setValue(true);
		refs.refPCEqNo.setValue('');
		refs.refPCShipCrane.setValue('');
		refs.refPCCapaCd.setValue('');
		refs.refPCCapaDesc.setValue('');
		refs.ctlPCJPB.setValue(true);
		refs.refPCCmbJPB.setValue('');
		refs.refPCContractorCd.setValue('');
		refs.refPCRequestor.setValue('');
		refs.refPCCargoType.setValue('');
		refs.refPCRemarks.setValue('');
		
		// ForkLift
		refs.ctlFLPurpose.setValue('');
		refs.refFlNo.setValue('');
		refs.refFLCapacity.setValue('');
		refs.refFLCapacityDescr.setValue('');
		refs.refFLWorkingArea.setValue('');
		refs.refFLApFp.setValue('');
		refs.ctlFLWorkingArea.setValue('');
		refs.ctlNoDriver.setValue(true);
		refs.refFLCmbJPB.setValue('');
		refs.refFLContractorCd.setValue('');
		refs.refFLCargoType.setValue('');
		refs.refFLRequestor.setValue('');
		refs.ctlFLTxtRef.setValue(true);
		refs.refFLCmbRefNo.setValue('');
		refs.refFLTxtRefNo.setValue('');
		refs.ctlFLDMode.setValue('');
		refs.refForkliftRemarks.setValue('');
		
		//Trailer
		refs.ctlTRPurpose.setValue('');
		refs.ctlTREquipmentCodeDesc.setValue('');
		refs.ctlTREquipmentDivCd.setValue('');
		refs.ctlTREquipmentCode.setValue('');
		refs.refTRWorkingArea.setValue('');
		refs.refTRWorkLocCd.setValue('');
		refs.ctlTRNos.setValue('');
		refs.refTRApFp.setValue('');
		refs.refTRContractorCd.setValue('');
		refs.refTRRemarks.setValue('');
		refs.refTRCargoType.setValue('');
		refs.refTRRequestor.setValue('');
		refs.refTRCmbRefNo.setValue('');
		refs.refTRTxtRefNo.setValue('');
		refs.ctlTRDMode.setValue('');
		
		// Mechanical Equipment
		refs.ctlMEPurpose.setValue('');
		refs.ctlMEEquipmentCode.setValue('');
		refs.ctlMEEquipmentName.setValue('');
		refs.ctlMEEquipmentType.setValue('');
		refs.ctlMENos.setValue('');
		refs.refMEWONo.setValue('');
		refs.refMEWorkingArea.setValue('');
		refs.refMEWorkLocCd.setValue('');
		refs.refMEContractorCd.setValue('');
		refs.refMECargoType.setValue('');
		refs.refMERequestor.setValue('');
		refs.refMECmbRefNo.setValue('');
		refs.ctlMEContractor.setValue(true);
		refs.refMETxtRefNo.setValue('');
		refs.refMERemarks.setValue('');
	},
	
	loadCombo:function(recvData){
		var me = this;
		var refs = me.getReferences();
		var eqTypeTRCombo = me.getStore('eqTypeTRCombo');
		eqTypeTRCombo.load();
		
		var bulkWharfCombo = me.getStore('bulkWharfCombo');
		bulkWharfCombo.load();
		
		var warehouseCombo = me.getStore('warehouseCombo');
		warehouseCombo.load();
		
		var edjCombo = me.getStore('edjCombo');
		edjCombo.load();
		
		var ndjCombo = me.getStore('ndjCombo');
		ndjCombo.load();
		
		var bulkWharfFLCombo = me.getStore('bulkWharfFLCombo');
		bulkWharfFLCombo.load();
		
		var warehouseFLCombo = me.getStore('warehouseFLCombo');
		warehouseFLCombo.load();

		var roleCombo = me.getStore('roleCombo');
		//Mantis: 0168010
		var handleEquipmentSCD = ["BC", "CC", "CO", "CS", "FD", "LS", "NR", "OC", "OD", "OE", "OS", "PS", "WC", "WS"];
		roleCombo.load({
			params: {
				vslCallID: recvData ? recvData.data.vslCallID : '',
				workYmd : recvData ? recvData.data.workYmd : '',
				shftId : recvData ? recvData.data.shftId : ''
			},
			callback: function(records, operation, success) {
				if(success) {
					if(records.length> 0) {
						var handleEquipmentRole = records.filter(record => handleEquipmentSCD.includes(record.data.scd));
						roleCombo.setData(handleEquipmentRole);
					}
				}
			}
		});
		
		var empFLCombo = me.getStore('empFLCombo');
		empFLCombo.load({
			params : {
				vslCallID : recvData ? recvData.data.vslCallID : '',
				workYmd : recvData ? recvData.data.workYmd : '',
				shftId : recvData ? recvData.data.shftId : ''
			}
		});
		
		var empMPCombo = me.getStore('empMPCombo');
		empMPCombo.load({
			params : {
				vslCallID : recvData ? recvData.data.vslCallID : '',
				workYmd : recvData ? recvData.data.workYmd : '',
				shftId : recvData ? recvData.data.shftId : ''
			},
		});
		
		var cargoCombo = me.getStore('cargoCombo');
		cargoCombo.load();
		
		var cttCompCombo = me.getStore('cttCompCombo');
		cttCompCombo.load({
			params : {
				divCd : 'CTT',
				comboType: 'COMP'
			},
		});
		
		var requestorCombo = me.getStore('requestorCombo');
		requestorCombo.load();
		
		var categoryCombo = me.getStore('categoryCombo');
		categoryCombo.load();
		
		var workingAreaCombo = me.getStore('workingAreaCombo');
		workingAreaCombo.load();
		
		var stvCompCombo = me.getStore('stvCompCombo');
		stvCompCombo.load({
			params : {
				divCd : 'STV'
			},
		});
		
		var eqCodeCombo = me.getStore('eqCodeCombo');
		eqCodeCombo.load();
		
		var eqPCCombo = me.getStore('eqPCCombo');
		eqPCCombo.load({
			params : {
				vslCallID : recvData ? recvData.data.vslCallID : '',
				workYmd : recvData ? recvData.data.workYmd : '',
				shftId : recvData ? recvData.data.shftId : ''
			}
		});
		
		var flNoCombo = me.getStore('flNoCombo');
		flNoCombo.load();
		
		var equipmentCombo = me.getViewModel().getStore('equipmentCombo');
		equipmentCombo.clearFilter();
		equipmentCombo.load({
			params : {
				divCd : ''
			},
		});
		
		var empPCCombo = me.getStore('empPCCombo');
		empPCCombo.load({
			params : {
				vslCallID : recvData ? recvData.data.vslCallID : '',
				workYmd : recvData ? recvData.data.workYmd : '',
				shftId : recvData ? recvData.data.shftId : ''
			},
		});
		
		var driverTp = me.getStore('driverTp');
		driverTp.load();
		
		var shiftListStore = me.getStore('shiftList');
		shiftListStore.load();
	},
	
	setDefaultRefNo: function(){
    	var me = this;
		var refs = me.getReferences();
		var date = refs.refWorkYmd.rawValue.substr(0,2) + refs.refWorkYmd.rawValue.substr(3,2) + refs.refWorkYmd.rawValue.substr(6,4); ;
		var shft = refs.refShift.getRawValue();
    	refNo = date + "@" + shft;
    	return refNo;
    },

	setFmTimeByShift: function(){
		var me = this;
		var refs = me.getReferences();
		
		var shiftListStore = me.getStore('shiftList');
		if(shiftListStore.loadCount <= 0){
			shiftListStore.load();
		}
		var shftId= refs.refShift.getValue();
		var shift = shiftListStore.findRecord('shftId', shftId);
		var fmShiftTime;
		
		if(shift){
			fmShiftTime = Ext.Date.parse(refs.refWorkYmd.rawValue + ' ' + shift.get('fmHhMm').substr(0,2) + ':' + shift.get('fmHhMm').substr(2,2),  'd/m/Y H:i');
		}
		
		return fmShiftTime;
		
		var toShiftTime = Ext.Date.parse(refs.refWorkYmd.rawValue + ' ' + shift.get('toHhMm').substr(0,2) + ':' + shift.get('toHhMm').substr(2,2),  'd/m/Y H:i');
		if(shftId == 'SF0013'){
			toShiftTime.setDate(toShiftTime.getDate() + 1);
		}
	},
	
	setToTimeByShift: function(){
		var me = this;
		var refs = me.getReferences();
		
		var shiftListStore = me.getStore('shiftList');
		if(shiftListStore.loadCount <= 0){
			shiftListStore.load();
		}
		var shftId= refs.refShift.getValue();
		var shift = shiftListStore.findRecord('shftId', shftId);
		var toShiftTime;
		if(shift){
			toShiftTime = Ext.Date.parse(refs.refWorkYmd.rawValue + ' ' + shift.get('toHhMm').substr(0,2) + ':' + shift.get('toHhMm').substr(2,2),  'd/m/Y H:i');
		}
		
		if(shftId == 'SF0013'){
			toShiftTime.setDate(toShiftTime.getDate() + 1);
		}
		
		return toShiftTime;
		
	},

	onVSRInfoByShift: function(){
		var me = this;
		var refs = me.getReferences();

		var shftId = refs.refShift.getValue();
		var workYmd = refs.refWorkYmd.rawValue;

		var fmShiftTime = '';
		var toShiftTime = '';
		var refNo = '';

		if((shftId != null && shftId != '') && (workYmd != null && workYmd != '')){
			fmShiftTime = me.setFmTimeByShift();
			toShiftTime = me.setToTimeByShift();
			refNo = me.setDefaultRefNo();
		}
		if(fmShiftTime != '' && toShiftTime != ''){
			//ManPower
			refs.refManPowerStartTime.setValue(fmShiftTime);
			refs.refManPowerEndTime.setValue(toShiftTime);
			
			//Stevedore
			refs.refStevedoreStartTime.setValue(fmShiftTime);
			refs.refStevedoreEndTime.setValue(toShiftTime);

			//PortCrane
			refs.refPortCraneStartTime.setValue(fmShiftTime);
			refs.refPortCraneEndTime.setValue(toShiftTime);

			//Forklift
			refs.refForkliftEQArrTime.setValue(fmShiftTime);
			refs.refForkliftStartTime.setValue(fmShiftTime);
			refs.refForkliftEndTime.setValue(toShiftTime);
			refs.refFLCargoType.setValue('BBK');
			if(refNo != ''){
				refs.refFLTxtRefNo.setValue(refNo);
				refs.ctlFLCmbRef.setDisabled(true);
				refs.refFLCmbRefNo.setDisabled(true);
				refs.ctlFLTxtRef.setValue(true);
				refs.ctlFLTxtRef.setDisabled(true);
				refs.refFLTxtRefNo.setDisabled(true);
			}

			//Trailer
			refs.refTrailerEQArrTime.setValue(fmShiftTime);
			refs.refTrailerStartTime.setValue(fmShiftTime);
			refs.refTrailerEndTime.setValue(toShiftTime);
			refs.refTRCargoType.setValue('BBK');
			if(refNo != ''){
				refs.refTRTxtRefNo.setValue(refNo);
				refs.ctlTRCmbRef.setDisabled(true);
				refs.refTRCmbRefNo.setDisabled(true);
				refs.ctlTRTxtRef.setValue(true);
				refs.ctlTRTxtRef.setDisabled(true);
				refs.refTRTxtRefNo.setDisabled(true);
			}

			//MechanicalEq
			refs.refMechanicalEqEQArrTime.setValue(fmShiftTime);
			refs.refMechanicalEqStartTime.setValue(fmShiftTime);
			refs.refMechanicalEqEndTime.setValue(toShiftTime);
			refs.refMECargoType.setValue('BBK');
			if(refNo != ''){
				refs.refMETxtRefNo.setValue(refNo);
				refs.ctlMECmbRef.setDisabled(true);
				refs.refMECmbRefNo.setDisabled(true);
				refs.ctlMETxtRef.setValue(true);
				refs.ctlMETxtRef.setDisabled(true);
				refs.refMETxtRefNo.setDisabled(true);
			}
		}
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
		if(recvData){
			recvData.set('vslCallID', refs.refVslCallId.getValue());
			recvData.set('workYmd', Ext.Date.format(refs.refWorkYmd.getValue(), MOST.config.Locale.getShortDate()));
			recvData.set('shftId', refs.refShift.getValue());
		}else{
			var theModel = Ext.create('MOST.model.operation.VSRCheckList');
			theModel.set('vslCallID', refs.refVslCallId.getValue());
			theModel.set('workYmd', Ext.Date.format(refs.refWorkYmd.getValue(), MOST.config.Locale.getShortDate()));
			theModel.set('shftId', refs.refShift.getValue());
			
			detailView.items.get(0).recvData = theModel;
		}
		
		if(detailView.items.get(0).recvData.data.vslCallID && detailView.items.get(0).recvData.data.workYmd && detailView.items.get(0).recvData.data.shftId){
			me.onDetailLoad();
		}
	},
	
	clearData: function(){
		var me = this;
		var manPowerList = me.getViewModel().getStore('manPowerList');
		var forkliftList = me.getViewModel().getStore('forkliftList');
		var mechanicalEqList = me.getViewModel().getStore('mechanicalEqList');
		var portCraneList = me.getViewModel().getStore('portCraneList');
		var trailerList = me.getViewModel().getStore('trailerList');
		var stevedoreList = me.getViewModel().getStore('stevedoreList');
		var megaPCList = me.getViewModel().getStore('megaPCList');
		var megaFList = me.getViewModel().getStore('megaFList');
		var megaTRList = me.getViewModel().getStore('megaTRList');
		var megaMEList = me.getViewModel().getStore('megaMEList');
		var empidlist = me.getStore('empidlist');
		var empList = me.getStore('empList');
		
		manPowerList.removeAll();
		forkliftList.removeAll();
//		mechanicalEqList.removeAll();
//		portCraneList.removeAll();
//		trailerList.removeAll();
//		stevedoreList.removeAll();
//		megaPCList.removeAll();
		megaFList.removeAll();
//		megaTRList.removeAll();
//		megaMEList.removeAll();
//		empidlist.removeAll();
//		empList.removeAll();

		manPowerList.clearData();
		forkliftList.clearData();
		mechanicalEqList.clearData();
		portCraneList.clearData();
		trailerList.clearData();
		stevedoreList.clearData();
		megaPCList.clearData();
		megaFList.clearData();
		megaTRList.clearData();
		megaMEList.clearData();
		empidlist.clearData();
		empList.clearData();
		
	},
	
	setManPower:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var manPowerList = me.getViewModel().getStore('manPowerList');
		var empidlist = me.getStore('empidlist');
		var empList = me.getStore('empList');
		
		var workingYmd = Ext.Date.format(refs.refWorkYmd.getValue(), MOST.config.Locale.getShortDate());
		
		refs.refManPowerStartTime.setValue(me.setFmTimeByShift());
		refs.refManPowerEndTime.setValue(me.setToTimeByShift());
		
		empidlist.load({
			params:{
				vslCallID : refs.refVslCallId.getValue(),
				shftId : refs.refShift.getValue(),
				workYmd : workingYmd,
				searchType:'InitEmpId'
			},
			callback:function(records, operation, success){
				if(success){
					empList.setData(records[0].get('empIdList'));
				}
			}
		})
		
		if(masterItem.checkVSRList && masterItem.checkVSRList[0].length > 0){
			manPowerList.setData(masterItem.checkVSRList[0]);
			manPowerList.commitChanges();
		}
	},
	
	setStevedore:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var stevedoreList = me.getViewModel().getStore('stevedoreList');
		
		refs.refStevedoreStartTime.setValue(me.setFmTimeByShift());
		refs.refStevedoreEndTime.setValue(me.setToTimeByShift());
		if(masterItem.checkVSRList){
			stevedoreList.setData(masterItem.checkVSRList[5]);
		}
		stevedoreList.commitChanges();
	},
	
	setForklift:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var forkliftList = me.getViewModel().getStore('forkliftList');
		
		refs.refForkliftEQArrTime.setValue(me.setFmTimeByShift());
		refs.refForkliftStartTime.setValue(me.setFmTimeByShift());
		refs.refForkliftEndTime.setValue(me.setToTimeByShift());
		refs.refFLCargoType.setValue('BBK');
		var refNo = me.setDefaultRefNo();
		if(refNo != ''){
			refs.refFLTxtRefNo.setValue(refNo);
			refs.ctlFLCmbRef.setDisabled(true);
			refs.refFLCmbRefNo.setDisabled(true);
			refs.ctlFLTxtRef.setValue(true);
			refs.ctlFLTxtRef.setDisabled(true);
			refs.refFLTxtRefNo.setDisabled(true);
		}
		if(masterItem.checkVSRList){
			forkliftList.setData(masterItem.checkVSRList[1]);
		}
		forkliftList.commitChanges();
	},
	
	setPortCrane:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var portCraneList = me.getViewModel().getStore('portCraneList');
		
		refs.refPortCraneStartTime.setValue(me.setFmTimeByShift());
		refs.refPortCraneEndTime.setValue(me.setToTimeByShift());
		
		if(masterItem.checkVSRList){
			portCraneList.setData(masterItem.checkVSRList[3]);
		}
		portCraneList.commitChanges();
		
	},
	
	setTrailer:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var trailerList = me.getViewModel().getStore('trailerList');
		
		refs.refTrailerEQArrTime.setValue(me.setFmTimeByShift());
		refs.refTrailerStartTime.setValue(me.setFmTimeByShift());
		refs.refTrailerEndTime.setValue(me.setToTimeByShift());
		refs.refTRCargoType.setValue('BBK');
		var refNo = me.setDefaultRefNo();
		if(refNo != ''){
			refs.refTRTxtRefNo.setValue(refNo);
			refs.ctlTRCmbRef.setDisabled(true);
			refs.refTRCmbRefNo.setDisabled(true);
			refs.ctlTRTxtRef.setValue(true);
			refs.ctlTRTxtRef.setDisabled(true);
			refs.refTRTxtRefNo.setDisabled(true);
		}
		if(masterItem.checkVSRList){
			trailerList.setData(masterItem.checkVSRList[4]);
		}
		trailerList.commitChanges();
	},
	
	setMechanicalEq:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var mechanicalEqList = me.getViewModel().getStore('mechanicalEqList');
		
		refs.refMechanicalEqEQArrTime.setValue(me.setFmTimeByShift());
		refs.refMechanicalEqStartTime.setValue(me.setFmTimeByShift());
		refs.refMechanicalEqEndTime.setValue(me.setToTimeByShift());
		refs.refMECargoType.setValue('BBK');
		var refNo = me.setDefaultRefNo();
		if(refNo != ''){
			refs.refMETxtRefNo.setValue(refNo);
			refs.ctlMECmbRef.setDisabled(true);
			refs.refMECmbRefNo.setDisabled(true);
			refs.ctlMETxtRef.setValue(true);
			refs.ctlMETxtRef.setDisabled(true);
			refs.refMETxtRefNo.setDisabled(true);
		}
		if(masterItem.checkVSRList){
			mechanicalEqList.setData(masterItem.checkVSRList[2]);
		}
		mechanicalEqList.commitChanges();
		
	},
	
	setMegaPC:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var megaPCList = me.getViewModel().getStore('megaPCList');
		if(masterItem.megaPCList && masterItem.megaPCList.length > 0){
			megaPCList.setData(masterItem.megaPCList);
			refs.ctlPCPurpose.setValue(masterItem.megaPCList[0].purpTpCd);
			megaPCList.commitChanges();
		}
	},
	
	setMegaF:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var megaFList = me.getViewModel().getStore('megaFList');
		if(masterItem.megaFList && masterItem.megaFList.length > 0){
			megaFList.setData(masterItem.megaFList);
			refs.ctlFLPurpose.setValue(masterItem.megaFList[0].purpTpCd);
			megaFList.commitChanges();
		}
	},
	
	setMegaTR:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var megaTRList = me.getViewModel().getStore('megaTRList');
		if(masterItem.megaTRList && masterItem.megaTRList.length > 0){
			megaTRList.setData(masterItem.megaTRList);
			refs.ctlTRPurpose.setValue(masterItem.megaTRList[0].purpTpCd);
			megaTRList.commitChanges();
		}
	},
	
	setMegaME:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var megaMEList = me.getViewModel().getStore('megaMEList');
		if(masterItem.megaMEList && masterItem.megaMEList.length > 0){
			megaMEList.setData(masterItem.megaMEList);
			refs.ctlMEPurpose.setValue(masterItem.megaMEList[0].purpTpCd);
			megaMEList.commitChanges();
		}
	},
	
	onRemoveManPower: function() {
		var me = this;
		var grid = me.lookupReference('refManPowerGrid');
		var store = me.getStore('manPowerList'); 
		
		var selection = grid.getSelection() === null ? null : grid.getSelection();
		if (!selection){
			MessageUtil.alert('Warning', 'vslchecklist_select_remove');
			return;
		}
		
		MessageUtil.question('confirm', 'vslchecklist_confirm_remove',null,
		function(button){
			if (button === 'ok') {
				Ext.each(selection, function (record) {
					if(record.get('workingStatus') == WorkingStatus.INSERT){
						store.remove(record);
					}else{
						record.set('workingStatus', WorkingStatus.DELETE);
					}
				});
			}
		});
	},
	
	onAddManPower: function() {
		var me = this;
		var refs = me.getReferences();
		if(refs.refWorkYmd.rawValue == '' ||  refs.refShift.getValue()== ''){
			MessageUtil.alert('Warning', 'vslchecklist_select_date_shift');
			return;
		}

		if(refs.refRoleCd.getValue() == null || refs.refRoleCd.getValue() == ''){
			MessageUtil.alert('Warning', 'vsrchecklist_roleCd_manpower_msg');
			return;
		}
		
		if(refs.ctlEmpId.getValue() == null || refs.ctlEmpId.getValue() == ''){
			MessageUtil.alert('Warning', 'vsrchecklist_JPB_manpower_msg');
			return;
		}
		
		if(refs.ctlManPowerWorkingArea.getValue() == null || refs.ctlManPowerWorkingArea.getValue() == ''){
			MessageUtil.alert('Warning', 'vsrchecklist_workingArea_manpower_msg');
			return;
		}
		
		if(refs.refManPowerStartTime.getValue() == null || refs.refManPowerStartTime.getValue() == ''){
			MessageUtil.alert('Warning', 'vsrchecklist_startTime_manpower_msg');
			return;
		}
		
		if(refs.refManPowerEndTime.getValue() == null || refs.refManPowerEndTime.getValue() == ''){
			MessageUtil.alert('Warning', 'vsrchecklist_endTime_manpower_msg');
			return;
		}

		var grid = me.lookupReference('refManPowerGrid');
		var store = me.getStore('manPowerList');
		var editor = grid.getPlugin('manPowerGridEditor');
		var record = Ext.create('MOST.model.operation.VSRCheckList'); 

		var insert = true;
		store.queryBy(function(rec, id){
			if(rec.get('empId') == refs.ctlEmpId.getValue()){
				insert = false;
				MessageUtil.alert('Warning', 'vsrchecklist_exist_staffid_msg');
				return;
			}
		})
		
		if(!insert){
			return;
		}

		//Clear filter for Grid
		grid.filters.clearFilters();
		grid.filters.disable();
		
		//Clear filter for Store
		store.clearFilter();
		
		
		var roleCombo = me.getStore('roleCombo');
		if(roleCombo.loadCount <= 0){
			roleCombo.load({
				params: {
					vslCallId: refs.refVslCallId.getValue(),
					workYmd: Ext.Date.format(refs.refWorkYmd.rawValue, 'Ymd'),
					shftId: refs.refShift.getValue()
				}
			});
		}
		
		var empMPCombo = me.getStore('empMPCombo');
		empMPCombo.clearFilter();
		
		var idx = 0;
		if(grid.getSelection() && grid.getSelection().length>0) {
			idx = store.indexOfId(grid.getSelection()[0].get('id'));
		}
		
		record.set("rsNm", refs.refRoleCd.getValue());
		record.set("empId", refs.ctlEmpId.getValue());
		record.set("empNm", refs.refEmpNm.getValue());
		record.set("workLoc", refs.ctlManPowerWorkingArea.getValue());
		record.set("rmk", refs.refManPowerRemarks.getValue());
		
		record.set("workStDt", refs.refManPowerStartTime.getValue());
		record.set("workEndDt", refs.refManPowerEndTime.getValue());
		
		record.set("userId", MOST.config.Token.getUserId());
		record.set("vslCallID", refs.refVslCallId.getValue());
		record.set("scn", refs.ctlScn.getValue());
		record.set("workYmd", refs.refWorkYmd.rawValue);
		record.set("shftId", refs.refShift.getValue());
		record.set("divCd", 'SD');
		record.set("mbsCd", me.ADP);
		record.set("userId", MOST.config.Token.getUserId());
		record.set("workingStatus", WorkingStatus.INSERT);
		
		if(insert && me.onValidationdDateTime(record)){
			store.insert(idx, record);
			record.commit();
		}
		grid.getSelectionModel().select(record);
	},
	
	onValidationdDateTime: function(record){
		var me = this;
		
		var shftStDateTime = me.setFmTimeByShift();
		var shftEndDateTime = me.setToTimeByShift();
		
		if(!(shftStDateTime <= record.get('workStDt') && record.get('workStDt')<=shftEndDateTime)){
			MessageUtil.alert('Warning', 'Start time must be in Shift.');
			return false;
		}
		
		if(!(shftStDateTime <= record.get('workEndDt') && record.get('workEndDt')<=shftEndDateTime)){
			MessageUtil.alert('Warning', 'End time must be in Shift.');
			return false;
		}
		
		return true;
	},
	
	onRemoveStevedore: function() {
		var me = this;
		var grid = me.lookupReference('refStevedoreGrid');
		var store = me.getStore('stevedoreList'); 
		
		var selection = grid.getSelection() === null ? null : grid.getSelection();
		if(!selection) {
			Message.alert('warning','vslchecklist_select_remove');
			return;
		}
		
		Ext.each(selection, function (record) {
			if(record.get('workingStatus') == WorkingStatus.INSERT){
				store.remove(record);
			}else{
				record.set('workingStatus', WorkingStatus.DELETE);
			}
		});
	},
	
	onAddStevedore: function() {
		
		var me = this;
		var refs = me.getReferences();
		if(refs.refWorkYmd.rawValue == '' ||  refs.refShift.getValue()== ''){
			MessageUtil.alert('Warning', 'vslchecklist_select_date_shift');
			return;
		}

		if(refs.refStevedoreCompany.getValue() == null || refs.refStevedoreCompany.getValue() == ''){
			MessageUtil.alert('Warning', 'vsrchecklist_stevedoreCompany_stevedore_msg');
			return;
		}
		
		if(refs.ctlStevedoreWorkingArea.getValue() == null || refs.ctlStevedoreWorkingArea.getValue() == ''){
			MessageUtil.alert('Warning', 'vsrchecklist_workingArea_stevedore_msg');
			return;
		}
		
		if(refs.refStevedoreStartTime.getValue() == null || refs.refStevedoreStartTime.getValue() == ''){
			MessageUtil.alert('Warning', 'vsrchecklist_startTime_stevedore_msg');
			return;
		}
		
		if(refs.refStevedoreEndTime.getValue() == null || refs.refStevedoreEndTime.getValue() == ''){
			MessageUtil.alert('Warning', 'vsrchecklist_endTime_stevedore_msg');
			return;
		}
		
		if(refs.refStevedoreRequestor.getValue() == null || refs.refStevedoreRequestor.getValue() == ''){
			MessageUtil.alert('Warning', 'vsrchecklist_requestor_stevedore_msg');
			return;
		}

		var grid = me.lookupReference('refStevedoreGrid');
		var store = me.getStore('stevedoreList');
		var editor = grid.getPlugin('stevedoreGridEditor');
		var record = Ext.create('MOST.model.operation.VSRCheckList'); 

		var insert = true;
		store.queryBy(function(rec, id){
			if(rec.get('stvdComp') == refs.refStevedoreCompany.getValue()){
				insert = false;
				MessageUtil.alert('Warning', 'vsrchecklist_exist_stevedore_msg');
				return;
			}
		})
		
		//Clear filter for Grid
		grid.filters.clearFilters();
		grid.filters.disable();
		
		//Clear filter for Store
		store.clearFilter();
		
		var idx = 0;
		if(grid.getSelection() && grid.getSelection().length>0) {
			idx = store.indexOfId(grid.getSelection()[0].get('id'));
		}
		
		record.set("stvdComp", refs.refStevedoreCompany.getValue());
		record.set("nofStvdSprr", refs.refSupervisor.getValue());
		record.set("stvdNonTon", refs.refNonTonnage.getValue());
		record.set("workLoc", refs.ctlStevedoreWorkingArea.getValue());
		record.set("rmk", refs.refStevedoreRemarks.getValue());
		record.set("payer", refs.refStevedoreRequestor.getValue());
		
		record.set("workStDt", refs.refStevedoreStartTime.getValue());
		record.set("workEndDt", refs.refStevedoreEndTime.getValue());
		record.set("userId", MOST.config.Token.getUserId());
		record.set("vslCallID", refs.refVslCallId.getValue());
		record.set("scn", refs.ctlScn.getValue());
		record.set("workYmd", refs.refWorkYmd.rawValue);
		record.set("shftId", refs.refShift.getValue());
		record.set("divCd", 'ST');
		record.set("userId", MOST.config.Token.getUserId());
		record.set("workingStatus", WorkingStatus.INSERT);

		if(insert && me.onValidationdDateTime(record)){
			store.insert(idx, record);
			record.commit();
		}
		grid.getSelectionModel().select(record);
		
	},
	
	onRemovePortCrane: function() {
		var me = this;
		var grid = me.lookupReference('refPortCraneGrid');
		var store = me.getStore('portCraneList'); 
		
		var selection = grid.getSelection() === null ? null : grid.getSelection();
		if(!selection) {
			Message.alert('warning','vslchecklist_select_remove');
			return;
		}
		
		Ext.each(selection, function (record) {
			if(record.get('workingStatus') == WorkingStatus.INSERT){
				store.remove(record);
			}else{
				record.set('workingStatus', WorkingStatus.DELETE);
			}
		});
	},
	
	onValidataionPortCrane:function(selection){
		var me = this;
		var refs = me.getReferences();
		
		if(refs.refWorkYmd.rawValue == '' ||  refs.refShift.getValue()== ''){
			MessageUtil.alert('Warning', 'vslchecklist_select_date_shift');
			return;
		}
		if(refs.ctlPCPurpose.getValue() == ''){
			 MessageUtil.alert('Warning', 'vsrchecklist_select_purpose_msg');
			 return;
		}

		if(refs.refPortCraneStartTime.getValue() == null || refs.refPortCraneStartTime.getValue() == ''){
			MessageUtil.alert('Warning', 'vsrchecklist_startTime_portCrane_msg');
			return;
	   }
	   
	   if(refs.refPortCraneEndTime.getValue() == null || refs.refPortCraneEndTime.getValue() == ''){
			MessageUtil.alert('Warning', 'vsrchecklist_endTime_portCrane_msg');
			return;
	   }
	   
	   if(refs.refPCRequestor.getValue() == null || refs.refPCRequestor.getValue() == ''){
			MessageUtil.alert('Warning', 'vsrchecklist_requestor_portCrane_msg');
			return;
	   }
	   
	   if(refs.refPCCargoType.getValue() == null || refs.refPCCargoType.getValue() == ''){
			MessageUtil.alert('Warning', 'vsrchecklist_cargoType_portCrane_msg');
			return;
	   }
	   
		if(refs.ctl_Crane.getValue().gr === 'shipCrane'){
			if(!refs.refPCShipCrane.getValue()){
				MessageUtil.alert('Warning', 'Please select the ship crane');
					return;
			}
		}else{
			if(!refs.refPCEqNo.getValue()){
				MessageUtil.alert('Warning', 'Please select the port crane');
				return;
			}			
		}	   
		
		if(refs.ctl_GroupPortCrane.getValue().portcranecontractor === me.ADP){
			if(!refs.refPCCmbJPB.getValue().trim()){
				MessageUtil.alert('Warning', 'Please select the staff of JPB');
				return;
			}					
		}else {
			if (!refs.refPCContractorCd.getValue()) {
				MessageUtil.alert('Warning', 'Please input the contractor');
				return;
			}
		}

		if(me.isDuplicatePortCrane(selection)){
			MessageUtil.alert('Warning', 'vslchecklist_portcrane_duplicate');
			return;
		}
		
		return true;
	},

	isDuplicatePortCrane : function (selection) {
		var me = this;
		var isValid = true;
		var refs = me.getReferences();
		var store = me.getStore('portCraneList');
		var isJpb = (refs.ctl_GroupPortCrane.getValue().portcranecontractor === me.ADP);

		if(isJpb){
			var empId = refs.refPCCmbJPB.getValue();

			store.each(function(record) {
				if (record !== selection && record.data.empId === empId) {
					if (record.crudState == 'R') {
						var recStDt = new Date(record.get('workStDt'));
						var recEndDt = new Date(record.get('workEndDt'));
						var editorStDt = refs.refPortCraneStartTime.getValue();
						var editorEndDt = refs.refPortCraneEndTime.getValue();

						if(Ext.Date.between(editorStDt, recStDt, recEndDt) || Ext.Date.between(editorEndDt, recStDt, recEndDt)){
							isValid = false;
							return isValid;
						}
					} else {
						isValid = false;
						return isValid;
					}
				}
			});
		}

		return !isValid;
	},
	
	onAddPortCrane: function() {
		var me = this;
		var refs = me.getReferences();
		
		if(me.onValidataionPortCrane()){
			var grid = me.lookupReference('refPortCraneGrid');
			var megaGrid = me.lookupReference('refMegaPCGrid');
			var store = me.getStore('portCraneList');
			var record = Ext.create('MOST.model.operation.VSRCheckList'); 
			
			//Clear filter for Grid
			grid.filters.clearFilters();
			grid.filters.disable();
			
			//Clear filter for Store
			store.clearFilter();

			var idx = 0;
			if(grid.getSelection() && grid.getSelection().length>0) {
				idx = store.indexOfId(grid.getSelection()[0].get('id'));
			}
			
			if(refs.ctl_Crane.getValue().gr === 'shipCrane'){
				record.set("rsNm", refs.refPCShipCrane.getValue());
				record.set("engNm", refs.refPCShipCrane.getDisplayValue());
				record.set("capaCd", '');
			}else{
				record.set("rsNm", refs.refPCEqNo.getValue());
				record.set("engNm", refs.refPCEqNo.getDisplayValue());
				record.set("capaCd", refs.refPCCapaCd.getValue());
				record.set("capaDescr", refs.refPCCapaDesc.getValue());
			}			
			record.set("divCd", 'PC');
			record.set("vslCallID", refs.refVslCallId.getValue());
			record.set("scn", refs.ctlScn.getValue());
			record.set("workYmd", refs.refWorkYmd.rawValue);
			record.set("shftId", refs.refShift.getValue());
			record.set("craneGroup", '');

			record.set("workStDt", refs.refPortCraneStartTime.getValue());
			record.set("workEndDt", refs.refPortCraneEndTime.getValue());
			
			record.set("userId", MOST.config.Token.getUserId());
			record.set("purposeNm", refs.ctlPCPurpose.getDisplayValue());
			record.set("purpose", refs.ctlPCPurpose.getValue());
			
			if(refs.ctl_GroupPortCrane.getValue().portcranecontractor === me.ADP){
				record.set("mbsCd", me.ADP);
				record.set("empId", refs.refPCCmbJPB.getValue());
			}else{
				record.set("mbsCd", 'CTR');
				record.set("empId", '');
				record.set("cnrtCd", refs.refPCContractorCd.getValue());
			}
			record.set("cgTpCd", refs.refPCCargoType.getValue());
			record.set("cgTpNm", refs.refPCCargoType.getDisplayValue());
			record.set("payer", refs.refPCRequestor.getValue());
			record.set("rmk", refs.refPCRemarks.getValue());
			record.set("workingStatus", WorkingStatus.INSERT);
			
			if(me.onValidationdDateTime(record)){
				store.insert(idx, record);
				record.commit();
			}
			grid.getSelectionModel().select(record);
		}
	},
	
	onUpdatePortCrane:function(){
		var me = this;
		var store = me.getStore('portCraneList');
		var refs = me.getReferences();
		var grid = me.lookupReference('refPortCraneGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if (!selection){
			MessageUtil.info('Information', 'No data is selected. Please select the data first on grid.');
			return;
		}
		var bValidation = true;
		if(me.onValidataionPortCrane(selection)){
			Ext.each(selection, function (record) {
				// Port Crane / Ship Crane
				if(refs.ctl_Crane.getValue().gr === 'shipCrane'){
					record.set("rsNm", refs.refPCShipCrane.getValue());
					record.set("engNm", refs.refPCShipCrane.getDisplayValue());
					record.set("capaCd", '');
				}else{
					record.set("rsNm", refs.refPCEqNo.getValue());
					record.set("engNm", refs.refPCEqNo.getDisplayValue());
					record.set("capaCd", refs.refPCCapaCd.getValue());
					record.set("capaDescr", refs.refPCCapaDesc.getValue());
				}			

				// ADP / Contractor
				if(refs.ctl_GroupPortCrane.getValue().portcranecontractor === me.ADP){
					record.set("mbsCd", me.ADP);
					record.set("empId", refs.refPCCmbJPB.getValue());
				}else{
					record.set("mbsCd", 'CTR');
					record.set("empId", '');
					record.set("cnrtCd", refs.refPCContractorCd.getValue());
				}

				record.set("divCd", 'PC');
				record.set("vslCallID", refs.refVslCallId.getValue());
				record.set("workYmd", refs.refWorkYmd.rawValue);
				record.set("shftId", refs.refShift.getValue());
				record.set("craneGroup", '');
				record.set("userId", MOST.config.Token.getUserId());
				
				record.set("workStDt", refs.refPortCraneStartTime.getValue());
				record.set("workEndDt", refs.refPortCraneEndTime.getValue());
				record.set("purposeNm", refs.ctlPCPurpose.getDisplayValue());
				record.set("purpose", refs.ctlPCPurpose.getValue());
				record.set("cgTpCd", refs.refPCCargoType.getValue());
				record.set("cgTpNm", refs.refPCCargoType.getDisplayValue());
				record.set("payer", refs.refPCRequestor.getValue());
				record.set("rmk", refs.refPCRemarks.getValue());
				
				if(record.data.workingStatus !== WorkingStatus.INSERT){
					record.set("workingStatus", WorkingStatus.UPDATE);			
				}
				
				bValidation = me.onValidationdDateTime(record);
			});
	
			if(bValidation){
				store.each(function(record,index){
					record.commit();
				});
			}
		}
	},	
	
	onRemoveForklift: function() {
		var me = this;
		var grid = me.lookupReference('refForkliftGrid');
		var store = me.getStore('forkliftList'); 
		
		var selection = grid.getSelection() === null ? null : grid.getSelection();
		if(!selection) {
			Message.alert('warning','vslchecklist_select_remove');
			return;
		}
		
		Ext.each(selection, function (record) {
			if(record.get('workingStatus') == WorkingStatus.INSERT){
				store.remove(record);
			}else{
				record.set('workingStatus', WorkingStatus.DELETE);
			}
		});
	},
	
	onAddForklift: function() {
		var me = this;
		var refs = me.getReferences();
		if(me.onValidationForkLift(me.MODE_ADD)){
			var grid = me.lookupReference('refForkliftGrid');
			var store = me.getStore('forkliftList');
			var record = Ext.create('MOST.model.operation.VSRCheckList'); 
			//Clear filter for Store
			store.clearFilter();
			
			var idx = 0;
			if(grid.getSelection() && grid.getSelection().length>0) {
				idx = store.indexOfId(grid.getSelection()[0].get('id'));
			}

			record.set("rsNm", refs.refFlNo.getValue());
			record.set("capaCd", refs.refFLCapacity.getValue());
			record.set("capaDescr", refs.refFLCapacityDescr.getValue());
			record.set("operator", refs.refFLContractorCd.getValue());
			record.set("workLocTp", refs.refFLWorkingArea.getValue());
			record.set("workLoc", refs.ctlFLWorkingArea.getValue());
			record.set("payer", refs.refFLRequestor.getValue());
			record.set("delvTpCd", refs.ctlFLDMode.getValue());
			record.set("rmk", refs.refForkliftRemarks.getValue());
			record.set("hatchDir", refs.refFLApFp.getValue());
			record.set("setupTime", me.setFmTimeByShift());
			
			record.set("workStDt", refs.refForkliftStartTime.getValue());
			record.set("workEndDt", refs.refForkliftEndTime.getValue());
			
			record.set("cgTpCd", refs.refFLCargoType.getValue());
			record.set("vslCallID", refs.refVslCallId.getValue());
			record.set("scn", refs.ctlScn.getValue());
			record.set("workYmd", refs.refWorkYmd.rawValue);
			record.set("shftId", refs.refShift.getValue());
			if(refs.ctlFLPurpose.getValue() != ''){
				record.set("purposeNm", refs.ctlFLPurpose.getDisplayValue());
				record.set("purpose", refs.ctlFLPurpose.getValue());
			}else{
				record.set("purposeNm", '');
				record.set("purpose", refs.ctlFLPurpose.getValue());
			}
			
			if(refs.ctl_GroupForklift.getValue().contractor === me.ADP){
				record.set("mbsCd", me.ADP);
				record.set("empId", refs.refFLCmbJPB.getValue());
				record.set("operator", refs.refFLCmbJPB.getValue());
			}else if(refs.ctl_GroupForklift.getValue().contractor ==='contractor'){
				record.set("mbsCd", 'CTR');
				record.set("empId", '');
				record.set("operator", refs.refFLContractorCd.getValue());
				record.set("cnrtCd", refs.refFLContractorCd.getValue());
			}else{
				record.set("mbsCd", null);
				record.set("empId", '');
			}
			
			if(refs.ctl_FL_RefNo.getValue().rfNo === 'Y'){
				record.set("refYn", 'Y');
				record.set('refNo', refs.refFLCmbRefNo.getValue());
			}else{
				record.set("refYn", 'N');
				record.set('refNo', refs.refFLTxtRefNo.getValue());
			}				
			
			record.set("divCd", 'FL');
			record.set("userId", MOST.config.Token.getUserId());
			record.set("workingStatus", WorkingStatus.INSERT);
			if(me.onValidationdDateTime(record)){
				store.insert(idx, record);
				record.commit();
			}
			grid.getSelectionModel().select(record);
		}
	},	
	
	onRemoveMechanicalEq: function() {
		var me = this;
		var grid = me.lookupReference('refMechanicalEqGrid');
		var store = me.getStore('mechanicalEqList'); 
		
		var selection = grid.getSelection() === null ? null : grid.getSelection();
		if(!selection) {
			Message.alert('warning','vslchecklist_select_remove');
			return;
		}
		
		Ext.each(selection, function (record) {
			if(record.get('workingStatus') == WorkingStatus.INSERT){			
				store.remove(record);
			}else{
				record.set('workingStatus', WorkingStatus.DELETE);
			}
		});
	},
	

	
	onRemoveTrailer: function() {
		var me = this;
		var grid = me.lookupReference('refTrailerGrid');
		var store = me.getStore('trailerList'); 
		
		var selection = grid.getSelection() === null ? null : grid.getSelection();
		if(!selection) {
			Message.alert('warning','vslchecklist_select_remove');
			return;
		}
		
		Ext.each(selection, function (record) {
			record.set('workingStatus', WorkingStatus.DELETE);
		});
	},
	
	onValidationTrailer: function(mode){
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference('refTrailerGrid');
		var selection = grid.getSelection() === null ? null : grid.getSelection();
		
		var store = me.getStore('trailerList'); 
		var trailerList = me.getStore('trailerList');
		for(var i = 0; i < trailerList.data.length; i++){
			var item = trailerList.data.items[i];
			
			var bCurrentRecord = false;
			if(selection && selection[0]){
				if(mode === me.MODE_UPDATE && selection[0].get('seq') === item.get('seq')){
					bCurrentRecord = true;
				}
			}
			
			if(	!bCurrentRecord && 
				item.get('capaCd') ===  refs.ctlTREquipmentCode.getValue() && 
				item.get('workLocTp')  === refs.refTRWorkingArea.getValue() && 
				item.get('workLoc') ===  refs.refTRWorkLocCd.getValue() &&	
				item.get('hatchDir') === refs.refTRApFp.getValue()){
				
				MessageUtil.alert('Warning', 'Duplicate EQ, Hatch and AP/FP');
				return false;
			}
		}
		
		if(refs.refWorkYmd.rawValue == '' ||  refs.refShift.getValue()== ''){
			MessageUtil.alert('Warning', 'vslchecklist_select_date_shift');
			return false;
		}
		if(refs.ctlTRPurpose.getValue() == ''){
			 MessageUtil.alert('Warning', 'vsrchecklist_select_purpose_msg');
			 return false;
		}

		if(refs.ctlTREquipmentCode.getValue() == null ||  refs.ctlTREquipmentCode.getValue() == ''){
			MessageUtil.alert('Warning', 'vsrchecklist_EQType_trailer_msg');
			return false;
		}
		
		if(refs.refTRWorkLocCd.getValue() == null ||  refs.refTRWorkLocCd.getValue() == ''){
			MessageUtil.alert('Warning', 'vsrchecklist_workingArea_trailer_msg');
			return false;
		}
		
		if(refs.refTRContractorCd.getValue() == null ||  refs.refTRContractorCd.getValue() == ''){
			MessageUtil.alert('Warning', 'vsrchecklist_contractor_trailer_msg');
			return false;
		}
		
		if(refs.refTRCargoType.getValue() == null ||  refs.refTRCargoType.getValue() == ''){
			MessageUtil.alert('Warning', 'vsrchecklist_cargoType_trailer_msg');
			return false;
		}
		
		if(refs.refTRRequestor.getValue() == null ||  refs.refTRRequestor.getValue() == ''){
			MessageUtil.alert('Warning', 'vsrchecklist_requestor_trailer_msg');
			return false;
		}
		
		if(refs.ctlTRDMode.getValue() == null ||  refs.ctlTRDMode.getValue() == ''){
			MessageUtil.alert('Warning', 'vsrchecklist_dMode_trailer_msg');
			return false;
		}
		
		if(refs.refTrailerEQArrTime.getValue() == null ||  refs.refTrailerEQArrTime.getValue() == ''){
			MessageUtil.alert('Warning', 'vsrchecklist_EQArrTime_trailer_msg');
			return false;
		}
		
		if(refs.refTrailerStartTime.getValue() == null ||  refs.refTrailerStartTime.getValue() == ''){
			MessageUtil.alert('Warning', 'vsrchecklist_startTime_trailer_msg');
			return false;
		}
		
		if(refs.refTrailerEndTime.getValue() == null ||  refs.refTrailerEndTime.getValue() == ''){
			MessageUtil.alert('Warning', 'vsrchecklist_endTime_trailer_msg');
			return false;
		}
		
		return true;
	},
	
	onAddTrailer: function() {
		var me = this;
		var refs = me.getReferences();
		
		if(!me.onValidationTrailer(me.MODE_CREATE)){
			return;
		}
		
		var grid = me.lookupReference('refTrailerGrid');
		var megaGrid = me.lookupReference('refMegaTRGrid');
		var store = me.getStore('trailerList');
		var record = Ext.create('MOST.model.operation.VSRCheckList'); 
		
		//Clear filter for Grid
		grid.filters.clearFilters();
		grid.filters.disable();
		
		//Clear filter for Store
		store.clearFilter();
		
		var cargoCombo = me.getStore('cargoCombo');
		var eqTypeTRCombo = me.getStore('eqTypeTRCombo');
		var hatchCombo = me.getStore('hatchCombo');
		var bulkWharfCombo = me.getStore('bulkWharfCombo');
		var warehouseCombo = me.getStore('warehouseCombo');
		
		cargoCombo.load();
		eqTypeTRCombo.load();
		hatchCombo.load();
		bulkWharfCombo.load();
		warehouseCombo.load();
		
		record.set("capaDescr", refs.ctlTREquipmentCodeDesc.getValue());
		record.set("capaCd", refs.ctlTREquipmentCode.getValue());
		record.set("workLocTp", refs.refTRWorkingArea.getValue());
		record.set("workLoc", refs.refTRWorkLocCd.getValue());
		record.set("rsQty", refs.ctlTRNos.getValue());
		record.set("cnrtCd", refs.refTRContractorCd.getValue());
		record.set("rmk", refs.refTRRemarks.getValue());
		record.set("cgTpCd", refs.refTRCargoType.getValue());
		record.set("payer", refs.refTRRequestor.getValue());
		record.set("delvTpCd", refs.ctlTRDMode.getValue());
		record.set("hatchDir", refs.refTRApFp.getValue());
		record.set("purposeNm", refs.ctlTRPurpose.getDisplayValue());
		record.set("purpose", refs.ctlTRPurpose.getValue());

		if(record.data.workLoc != ''){
			var temp = record.data.workLoc;
			var locTp = temp.substring(0,1);
			var workLocStore;
			if(locTp == "H"){
				record.set('workLocTp','HTC');
				workLocStore = me.getStore('hatchCombo');
			} else if(locTp == "B" || locTp == "W"){
				if(temp == "BT1" || temp == "BT2" || temp == "BT3" || temp == "BT4" || temp == "CT3A"){
					record.set('workLocTp','NDJ');
					workLocStore = me.getStore('ndjCombo');
				} 
				else if(temp == "BT5" || temp == "BT6" || temp == "BT7" || temp == "BT8"){
					record.set('workLocTp','EDJ');
					workLocStore = me.getStore('edjCombo');
				} 
				else{
					record.set('workLocTp','WRF');
					workLocStore = me.getStore('bulkWharfCombo');
				}
				
				if(temp.substr(0,5) == "Wharf"){
					temp = temp.substring(6, temp.length -1);
				}
			} else {
				record.set('workLocTp','WHO');
				workLocStore = me.getStore('warehouseCombo');
			}
		}
		
		me.mbsCd = 'CTR';
		record.set("setupTime", me.setFmTimeByShift());
		record.set("workStDt", refs.refTrailerStartTime.getValue());
		record.set("workEndDt", refs.refTrailerEndTime.getValue());
		
		record.set("userId", MOST.config.Token.getUserId());
		record.set("vslCallID", refs.refVslCallId.getValue());
		record.set("scn", refs.ctlScn.getValue());
		record.set("workYmd", refs.refWorkYmd.rawValue);
		record.set("shftId", refs.refShift.getValue());
		record.set("cgTpCd", 'BBK');
		record.set("divCd", 'TRL');
		record.set("rsNm", 'TRL');
		record.set("mbsCd", 'CTR');
		record.set("userId", MOST.config.Token.getUserId());
		record.set("workingStatus", WorkingStatus.INSERT);
		
		if(refs.ctl_TR_RefNo.getValue().rfNo === 'Y'){
			record.set("refYn", 'Y');
			record.set('refNo', refs.refTRCmbRefNo.getValue());
		}else{
			record.set("refYn", 'N');
			record.set('refNo', refs.refTRTxtRefNo.getValue());
		}				
		if(me.onValidationdDateTime(record)){
			store.insert(store.data.length, record);
			record.commit();
		}
		grid.getSelectionModel().select(record);
	},
	
	onUpdateTrailer:function(){
		var me = this;
		var store = me.getStore('trailerList');
		var refs = me.getReferences();
		var grid = me.lookupReference('refTrailerGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		
		if(!me.onValidationTrailer(me.MODE_UPDATE)){
			return;
		}
		
		selection.data.rsNm = refs.ctlTREquipmentDivCd.getValue();
		selection.data.hatchDir = refs.refTRApFp.getValue();
		selection.data.capaCd = refs.ctlTREquipmentCode.getValue();
		selection.data.rsQty = refs.ctlTRNos.getValue();
		selection.data.workLocTp = refs.refTRWorkingArea.getValue();
		selection.data.workLoc = refs.refTRWorkLocCd.getValue();
		
		selection.data.cnrtCd = refs.refTRContractorCd.getValue();
		selection.data.cgTpCd = refs.refTRCargoType.getValue();
		selection.data.payer = refs.refTRRequestor.getValue();
		selection.data.rmk = refs.refTRRemarks.getValue();
		selection.data.purposeNm = refs.ctlTRPurpose.getDisplayValue();
		selection.data.purpose = refs.ctlTRPurpose.getValue();
		
		if(refs.ctl_TR_RefNo.getValue().rfNo === 'Y'){
			selection.set("refYn", 'Y');
			selection.set('refNo', refs.refTRCmbRefNo.getValue());
		}else{
			selection.set("refYn", 'N');
			selection.set('refNo', refs.refTRTxtRefNo.getValue());
		}				
		
		selection.data.delvTpCd = refs.ctlTRDMode.getValue();
		selection.data.setupTime = refs.refTrailerEQArrTime.getValue();
		selection.data.workStDt = refs.refTrailerStartTime.getValue();
		selection.data.workEndDt = refs.refTrailerEndTime.getValue();
		if(selection.data.workingStatus !== WorkingStatus.INSERT){
			selection.data.workingStatus =  WorkingStatus.UPDATE;
		}
		if(me.onValidationdDateTime(selection)){
			selection.commit();
		}
	},	
	
	onCancelEdit : function(rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},
	
	// Grid Edit
	onEdit:function(editor, context){
		var me = this;
		var refs = me.getReferences();
		var cboEquipment = refs.cboEquipment;
		context.record.data.workingStatus = context.record.crudState;
		
		if(StringUtil.isNullorEmpty(context.record.data.rsNm)){
			context.record.data.rsNm = me.eqNo;
		}
		
		context.record.data.capaCd = me.capaCd;
		context.record.data.cnrtCd = context.record.data.empId;
		
		if(StringUtil.isNullorEmpty(context.record.data.mbsCd)){
			context.record.data.mbsCd = me.mbsCd;
		}
		
		if(StringUtil.isNullorEmpty(context.record.data.cnrtCd)){
			context.record.data.cnrtCd = me.cnrtCd;
		}
		
	},
	
	onValidateMPEdit : function(editor, context) {
		var me = this;
		var refs = me.getReferences();
		var record = context.record;
		var isValid = true;
		
		if(!me.validateDateRange(editor))
			return false;
		
		var store = me.getStore('manPowerList');
		var curItem = store.data.items[editor.context.rowIdx].data;
		store.each(function(record) {
	       if (record.data.empId == editor.grid.down('[dataIndex=empId]').getEditor().getValue()){
	    	   if(record.crudState == 'R'){
	    		   if(record.data.empId != curItem.empId){
	    			   MessageUtil.alert('Warning', 'vsrchecklist_exist_staffid_msg');
	    	    	   isValid = false;
	    	    	   return false;
	    		   }
	    	   }else{
	    		   MessageUtil.alert('Warning', 'vsrchecklist_exist_staffid_msg');
		    	   isValid = false;
		    	   return false;
	    	   }
	       }
	    });
		
		if(!isValid){
			return false;
		}
		
		return true;
	},
	
	onValidateSDEdit : function(editor, context) {
		var me = this;
		var refs = me.getReferences();
		var record = context.record;
		var isValid = true;
		
		if(!me.validateDateRange(editor))
			return false;
		
		var store = me.getStore('stevedoreList');
		var curItem = store.data.items[editor.context.rowIdx].data;
		if(editor.grid.down('[dataIndex=stvdComp]').getEditor().getValue() != ''){
			store.each(function(record) {
			       if (record.data.stvdComp == editor.grid.down('[dataIndex=stvdComp]').getEditor().getValue()){
			    	   if(record.crudState == 'R'){
			    		   if(record.data.stvdComp != curItem.stvdComp){
			    			   MessageUtil.alert('Warning', 'vsrchecklist_exist_stevedore_msg');
			    	    	   isValid = false;
			    	    	   return false;
			    		   }
			    	   }else{
			    		   MessageUtil.alert('Warning', 'vsrchecklist_exist_stevedore_msg');
				    	   isValid = false;
				    	   return false;
			    	   }
			       }
			    });
		}
		
		if(!isValid){
			return false;
		}
		
		return true;
	},
	
	onValidateFLEdit : function(editor, context) {
		var me = this;
		var refs = me.getReferences();
		var record = context.record;
		var isValid = true;
		
		if(!me.validateDateRange(editor))
			return false;
		
		var store = me.getStore('forkliftList');
		var curItem = store.data.items[editor.context.rowIdx].data;
		store.each(function(record) {
	       if (record.data.capaCd == editor.grid.down('[dataIndex=capaCd]').getEditor().getValue()
	    		   && record.data.workLoc == editor.grid.down('[dataIndex=workLoc]').getEditor().getValue()
	    		   && ((record.data.workLocTp == 'HTC' && editor.grid.down('[dataIndex=workLocTp]').getEditor().getValue() == 'HTC')
	    			|| (record.data.workLocTp == 'WRF' && editor.grid.down('[dataIndex=workLocTp]').getEditor().getValue() == 'WRF'))
	    		   && record.data.hatchDir == editor.grid.down('[dataIndex=hatchDir]').getEditor().getValue()){
	    	   if(record.crudState == 'R'){
	    		   if(!(record.data.capaCd == curItem.capaCd
	    	    		   && record.data.workLoc == curItem.workLoc
	    	    		   && ((record.data.workLocTp == 'HTC' && curItem.workLocTp == 'HTC')
	    	    			|| (record.data.workLocTp == 'WRF' && curItem.workLocTp == 'WRF'))
	    	    		   && record.data.hatchDir == curItem.hatchDir)){
	    			   MessageUtil.alert('Warning', 'vslchecklist_trailer_duplicate');
	    	    	   isValid = false;
	    	    	   return false;
	    		   }
	    	   }else{
	    		   MessageUtil.alert('Warning', 'vslchecklist_trailer_duplicate');
		    	   isValid = false;
		    	   return false;
	    	   }
	       }
	    });
		
		if(!isValid){
			return false;
		}
		
		return true;
	},
	
	onValidateTREdit : function(editor, context) {
		var me = this;
		var refs = me.getReferences();
		var record = context.record;
		var isValid = true;
		
		if(!me.validateDateRange(editor))
			return false;
		
		var store = me.getStore('trailerList');
		var curItem = store.data.items[editor.context.rowIdx].data;
		store.each(function(record) {
	       if (record.data.capaCd == editor.grid.down('[dataIndex=capaCd]').getEditor().getValue()
	    		   && record.data.workLoc == editor.grid.down('[dataIndex=workLoc]').getEditor().getValue()
	    		   && ((record.data.workLocTp == 'HTC' && editor.grid.down('[dataIndex=workLocTp]').getEditor().getValue() == 'HTC')
	    			|| (record.data.workLocTp == 'WRF' && editor.grid.down('[dataIndex=workLocTp]').getEditor().getValue() == 'WRF'))
	    		   && record.data.hatchDir == editor.grid.down('[dataIndex=hatchDir]').getEditor().getValue()){
	    	   if(record.crudState == 'R'){
	    		   if(!(record.data.capaCd == curItem.capaCd
	    	    		   && record.data.workLoc == curItem.workLoc
	    	    		   && ((record.data.workLocTp == 'HTC' && curItem.workLocTp == 'HTC')
	    	    			|| (record.data.workLocTp == 'WRF' && curItem.workLocTp == 'WRF'))
	    	    		   && record.data.hatchDir == curItem.hatchDir)){
	    			   MessageUtil.alert('Warning', 'vslchecklist_trailer_duplicate');
	    	    	   isValid = false;
	    	    	   return false;
	    		   }
	    	   }else{
	    		   MessageUtil.alert('Warning', 'vslchecklist_trailer_duplicate');
		    	   isValid = false;
		    	   return false;
	    	   }
	       }
	    });
		
		if(!isValid){
			return false;
		}
		
		return true;
	},
	
	onValidateMEEdit : function(editor, context) {
		var me = this;
		var refs = me.getReferences();
		var record = context.record;
		var isValid = true;
		
		if(!me.validateDateRange(editor))
			return false;
		
		var store = me.getStore('mechanicalEqList');
		var curItem = store.data.items[editor.context.rowIdx].data;
		
		store.each(function(record) {
		if (record.data.workLoc == editor.grid.down('[dataIndex=workLoc]').getEditor().getValue() &&
   			record.data.workLocTp == editor.grid.down('[dataIndex=workLocTp]').getEditor().getValue() &&
   			record.data.workOdrNo == editor.grid.down('[dataIndex=workOdrNo]').getEditor().getValue() &&
   			record.data.capaCd == editor.grid.down('[dataIndex=capaCd]').getEditor().getValue() &&
   			record.data.rsQty == editor.grid.down('[dataIndex=rsQty]').getEditor().getValue() &&
   			(Ext.Date.diff(record.data.workStDt, editor.grid.down('[dataIndex=workStDt]').getEditor().getValue(), Ext.Date.MINUTE) == 0)&&
   			(Ext.Date.diff(record.data.workEndDt, editor.grid.down('[dataIndex=workEndDt]').getEditor().getValue(), Ext.Date.MINUTE) == 0)&&
   			(Ext.Date.diff(record.data.setupTime, editor.grid.down('[dataIndex=setupTime]').getEditor().getValue(), Ext.Date.MINUTE) == 0)&&
   			record.data.cnrtCd == editor.grid.down('[dataIndex=cnrtCd]').getEditor().getValue() &&
   			record.data.rsNm == editor.grid.down('[dataIndex=rsNm]').getEditor().getValue() &&
   			record.data.purposeNm == editor.grid.down('[dataIndex=purposeNm]').getEditor().getValue() &&
   			record.data.payer == editor.grid.down('[dataIndex=payer]').getEditor().getValue() &&
   			record.data.cgTpCd == editor.grid.down('[dataIndex=cgTpCd]').getEditor().getValue()){
	    	   if(record.crudState == 'R'){
	    		   if(!(record.data.workLoc == curItem.workLoc &&
	    		   			record.data.workLocTp == curItem.workLocTp &&
	    		   			record.data.workOdrNo == curItem.workOdrNo &&
	    		   			record.data.capaCd == curItem.capaCd &&
	    		   			record.data.rsQty == curItem.rsQty &&
	    		   			(Ext.Date.diff(record.data.workStDt, curItem.workStDt, Ext.Date.MINUTE) == 0)&&
	    		   			(Ext.Date.diff(record.data.workEndDt, curItem.workEndDt, Ext.Date.MINUTE) == 0)&&
	    		   			(Ext.Date.diff(record.data.setupTime, curItem.setupTime, Ext.Date.MINUTE) == 0)&&
	    		   			record.data.cnrtCd == curItem.cnrtCd &&
	    		   			record.data.rsNm == curItem.rsNm &&
	    		   			record.data.purposeNm == curItem.purposeNm &&
	    		   			record.data.payer == curItem.payer &&
	    		   			record.data.cgTpCd == curItem.cgTpCd)){
	    			   MessageUtil.alert('Warning', 'vslchecklist_mechanicaleq_duplicate');
	    	    	   isValid = false;
	    	    	   return false;
	    		   }
	    	   }else{
	    		   MessageUtil.alert('Warning', 'vslchecklist_mechanicaleq_duplicate');
		    	   isValid = false;
		    	   return false;
	    	   }
	       }
	    });
		
		if(!isValid){
			return false;
		}
		
		return true;
	},
	
	validateDateRange: function(editor){
		var me = this;
		var refs = me.getReferences();
		var startDate = editor.grid.down('[dataIndex=workStDt]').getEditor().getValue();
		var endDate = editor.grid.down('[dataIndex=workEndDt]').getEditor().getValue();
		var dateValidation = me.validateFromToDate(startDate, endDate);

		if(startDate != '' && endDate != ''){
			if(!dateValidation){
				return false;
			}
			var shiftListStore = me.getStore('shiftList');
			var shftId= refs.refShift.getValue();
			var shift = shiftListStore.findRecord('shftId', shftId);
			var fmShiftTime = Ext.Date.parse(refs.refWorkYmd.rawValue + ' ' + shift.get('fmHhMm').substr(0,2) + ':' + shift.get('fmHhMm').substr(2,2),  'd/m/Y H:i');
			var toShiftTime = Ext.Date.parse(refs.refWorkYmd.rawValue + ' ' + shift.get('toHhMm').substr(0,2) + ':' + shift.get('toHhMm').substr(2,2),  'd/m/Y H:i');
			
			if(shftId == 'SF0013'){
				toShiftTime.setDate(toShiftTime.getDate() + 1);
			}
			
			if(startDate < fmShiftTime ||  startDate> toShiftTime){
				MessageUtil.alert('Warning', 'vsrchecklist_start_shift_time__msg');
				return false;
			}
			
			if(endDate < fmShiftTime ||  endDate> toShiftTime){
				MessageUtil.alert('Warning', 'vsrchecklist_end_shift_time_msg');
				return false;
			}
		}
		
		return true;
	},
	
	// Toolbar Save Button
	onDetailSave:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theMain');
		var manPowerStore = me.getStore('manPowerList');
		var stevedoreStore = me.getStore('stevedoreList');
		var portCraneStore = me.getStore('portCraneList');
		var forkliftStore = me.getStore('forkliftList');
		var mechanicalEqStore = me.getStore('mechanicalEqList');
		var trailerStore = me.getStore('trailerList');
		if(detailView){
			var infoForm = detailView.down('form').getForm();
			if(manPowerStore.data.length > 0 || 
					stevedoreStore.data.length > 0 || 
					portCraneStore.data.length > 0 || 
					forkliftStore.data.length > 0 || 
					mechanicalEqStore.data.length > 0 ||
					trailerStore.data.length > 0){
				me.saveProcess();
			}else{
				MessageUtil.warning('warning_msg', 'In other to save, You must input data at least one tab.')
				return;
			}
		}
	},
	
	saveProcess:function(){
		var me = this;
		var refs = me.getReferences();
		
		var store = me.getStore('vsrCheckListDetail');
		
		var manPowerStore = me.getStore('manPowerList');
		var stevedoreStore = me.getStore('stevedoreList');
		var portCraneStore = me.getStore('portCraneList');
		var forkliftStore = me.getStore('forkliftList');
		var mechanicalEqStore = me.getStore('mechanicalEqList');
		var trailerStore = me.getStore('trailerList');
		
		var sendArray = new Array();
		var detailItem = me.getViewModel().get('theVSR');
		var detailView = me.getDetailBizView();
		
		var workingYmd = Ext.Date.format(refs.refWorkYmd.getValue(), MOST.config.Locale.getShortDate());

		for(var i = 0; i< manPowerStore.data.length; i++){
			var record = manPowerStore.data.items[i];
			
			if(record.data.workingStatus === 'C' || record.data.workingStatus === 'U' || record.data.workingStatus === 'D'){
				if(record.data.rsNm == null || record.data.rsNm == ''){
					MessageUtil.alert('Warning', 'vsrchecklist_roleCd_manpower_msg');
					return;
				}
				if(record.data.empId == null || record.data.empId == ''){
					MessageUtil.alert('Warning', 'vsrchecklist_JPB_manpower_msg');
					return;
				}
				if(record.data.workLoc == null || record.data.workLoc == ''){
					MessageUtil.alert('Warning', 'vsrchecklist_workingArea_manpower_msg');
					return;
				}
				sendArray.push(record.data);
			}
        };
		
		for(var i = 0; i< stevedoreStore.data.length; i++){
			var record = stevedoreStore.data.items[i];
			if(record.data.workingStatus === 'C' || record.data.workingStatus === 'U' || record.data.workingStatus === 'D'){
				if(record.data.stvdComp == null || record.data.stvdComp == ''){
					MessageUtil.alert('Warning', 'vsrchecklist_stevedoreCompany_stevedore_msg');
					return;
				}
				if(record.data.workLoc == null || record.data.workLoc == ''){
					MessageUtil.alert('Warning', 'vsrchecklist_workingArea_stevedore_msg');
					return;
				}
				if(record.data.payer == null || record.data.payer == ''){
					MessageUtil.alert('Warning', 'vsrchecklist_requestor_stevedore_msg');
					return;
				}
				sendArray.push(record.data);
        	}
        };
		
		for(var i = 0; i< portCraneStore.data.length; i++){
			var record = portCraneStore.data.items[i];
			if(record.data.workingStatus === 'C' || record.data.workingStatus === 'U' || record.data.workingStatus === 'D'){
				if(record.data.payer == null || record.data.payer == ''){
					 MessageUtil.alert('Warning', 'vsrchecklist_requestor_portCrane_msg');
					 return;
				}
				
				if(record.data.cgTpCd == null || record.data.cgTpCd == ''){
					 MessageUtil.alert('Warning', 'vsrchecklist_cargoType_portCrane_msg');
					 return;
				}
				sendArray.push(record.data);
			}
        };
		
		for(var i = 0; i< forkliftStore.data.length; i++){
			var record = forkliftStore.data.items[i];
			if(record.data.workingStatus === 'C' || record.data.workingStatus === 'U' || record.data.workingStatus === 'D'){
				if(record.data.rsNm == null || record.data.rsNm == ''){
					MessageUtil.alert('Warning', 'vsrchecklist_FLNo_forklift_msg');
					return;
				}
				
				if(record.data.workLocTp == null || record.data.workLocTp == ''){
					MessageUtil.alert('Warning', 'vsrchecklist_workingArea_forklift_msg');
					return;
				}
				
				if(record.data.workLoc == null || record.data.workLoc == ''){
					MessageUtil.alert('Warning', 'vsrchecklist_workingArea_forklift_msg');
					return;
				}
				
				if(record.data.cgTpCd == null || record.data.cgTpCd == ''){
					MessageUtil.alert('Warning', 'vsrchecklist_cargoType_forklift_msg');
					return;
				}
				
				if(record.data.payer == null || record.data.payer == ''){
					MessageUtil.alert('Warning', 'vsrchecklist_requestor_forklift_msg');
					return;
				}
				
				if(record.data.delvTpCd == null || record.data.delvTpCd == ''){
					MessageUtil.alert('Warning', 'vsrchecklist_dMode_forklift_msg');
					return;
				}
			
				if(record.data.mbsCd == me.ADP){
					record.data.empId = record.data.operator;
				}else if (record.data.mbsCd == 'CTR'){
					record.data.cnrtCd = record.data.operator;
				}else{
					record.data.empId = '';
					record.data.cnrtCd = '';
				}
				sendArray.push(record.data);
			}
		};
		
		for(var i = 0; i< trailerStore.data.length; i++){
			var record = trailerStore.data.items[i];
			if(record.data.workingStatus === 'C' || record.data.workingStatus === 'U' || record.data.workingStatus === 'D'){
				if(record.data.rsNm == null || record.data.rsNm == ''){
					MessageUtil.alert('Warning', 'vsrchecklist_EQType_trailer_msg');
					return;
				}
				if(record.data.cnrtCd == null || record.data.cnrtCd == ''){
					MessageUtil.alert('Warning', 'vsrchecklist_contractor_trailer_msg');
					return;
				}
				if(record.data.cgTpCd == null || record.data.cgTpCd == ''){
					MessageUtil.alert('Warning', 'vsrchecklist_cargoType_trailer_msg');
					return;
				}
				if(record.data.payer == null || record.data.payer == ''){
					MessageUtil.alert('Warning', 'vsrchecklist_requestor_trailer_msg');
					return;
				}
				sendArray.push(record.data);
			}
		};	
		
		for(var i = 0; i< mechanicalEqStore.data.length; i++){
			var record = mechanicalEqStore.data.items[i];
			if(record.data.workingStatus === 'C' || record.data.workingStatus === 'U' || record.data.workingStatus === 'D'){
				if(record.data.capaCd == null || record.data.capaCd == ''){
					MessageUtil.alert('Warning', 'vsrchecklist_EQType_mechanicalEq_msg');
					return;
				}
				if(record.get('shpCrew') != 'Y'){
					if(record.data.cnrtCd == null || record.data.cnrtCd == ''){
						MessageUtil.alert('Warning', 'vsrchecklist_contractor_mechanicalEq_msg');
						return;
					}
				}
				if(record.data.cgTpCd == null || record.data.cgTpCd == ''){
					MessageUtil.alert('Warning', 'vsrchecklist_cargoType_mechanicalEq_msg');
					return;
				}
				if(record.data.payer == null || record.data.payer == ''){
					MessageUtil.alert('Warning', 'vsrchecklist_requestor_mechanicalEq_msg');
					return;
				}
				if(refs.refMEWONo.getValue() == null ||  refs.refMEWONo.getValue() == ''){
					MessageUtil.alert('Warning', 'vsrchecklist_woNo_mechanicalEq_msg');
					return;
				}
				sendArray.push(record.data);
			}
        };
		// DELETE RECORD
		manPowerStore.getRemovedRecords().forEach(function(record, index, array){
			sendArray.push(record.data);
		});
		stevedoreStore.getRemovedRecords().forEach(function(record, index, array){
			sendArray.push(record.data);
		});
		portCraneStore.getRemovedRecords().forEach(function(record, index, array){
			sendArray.push(record.data);
		});
		forkliftStore.getRemovedRecords().forEach(function(record, index, array){
			sendArray.push(record.data);
		});
		mechanicalEqStore.getRemovedRecords().forEach(function(record, index, array){
			sendArray.push(record.data);
		});
		trailerStore.getRemovedRecords().forEach(function(record, index, array){
			sendArray.push(record.data);
		});
		
		// To perform the save logic only when modified.
		if(sendArray.length > 0){
			var proxy = detailItem.getProxy();
			proxy.url = store.getProxy().url;
			
			detailItem.set("checkVSRList", sendArray);
			
			detailItem.save({
				success : function(records,success){
					
					records.set('vslCallID', refs.refVslCallId.getValue());
					records.set('shftId', refs.refShift.getValue());
					records.set('workYmd', workingYmd);
					
					me.setDetailControl(records);

					me.onRefreshAllVSRTab();
					MessageUtil.saveSuccess();				
				}
			});
		}
	},
	
	onGridComboRenderer: function(val, cell, gridView){
		var me = this;
        var refs = me.getReferences();
		
		var codeComboStore = null;
		var displayFieldName = 'scdNm';
		var codeFieldName = 'scd';
		if(cell.column.dataIndex == 'cgTpCd'){ 	
			codeComboStore = me.getViewModel().getStore('cargoCombo');
		}else if(cell.column.dataIndex == 'workLocTp'){ 	
			if(gridView.data.divCd == 'SD' || gridView.data.divCd == 'ST'){
				codeComboStore = me.getViewModel().getStore('categoryCombo');
			}else if(gridView.data.divCd == 'ME'){
				codeComboStore = me.getViewModel().getStore('workAreaMECombo');
			}else{
				codeComboStore = me.getViewModel().getStore('workAreaCombo');
			}
		}else if(cell.column.dataIndex == 'delvTpCd'){ 	
			codeComboStore = me.getViewModel().getStore('delvModeCombo');
		}else if(cell.column.dataIndex == 'mbsCd'){ 	
			codeComboStore = me.getViewModel().getStore('groupFLCombo');
		}else if(cell.column.dataIndex == 'shpCrew'){ 	
			codeComboStore = me.getViewModel().getStore('groupMECombo');
		}else if(cell.column.dataIndex == 'craneGroup'){ 
			codeComboStore = me.getViewModel().getStore('craneGroupCombo');
			var SR = "SHIP CRANE";
			if(gridView.data.engNm.indexOf(SR) == -1){
				gridView.data.craneGroup = 'PORTCR';
				val = 'PORTCR';
			}else{
				gridView.data.craneGroup = 'SHIPCR';
				val = 'SHIPCR';
			}
		}else if(cell.column.dataIndex == 'rsNm'){ 	
			if(gridView.data.divCd == 'SD'){
				codeComboStore = me.getViewModel().getStore('roleCombo');
			}else if(gridView.data.divCd == 'FL'){
				codeComboStore = me.getViewModel().getStore('flNoCombo');
				var displayFieldName = 'engNm';
				var codeFieldName = 'eqNo';
			}else if(gridView.data.divCd == 'ME'){
				codeComboStore = me.getViewModel().getStore('eqCodeCombo');
			}else if(gridView.data.divCd == 'PC'){
				var SR = "SHIP CRANE";
				if(gridView.data.engNm.indexOf(SR) == -1){
					codeComboStore = me.getViewModel().getStore('eqPCCombo');
					var displayFieldName = 'engNm';
					var codeFieldName = 'eqNo';
				}else{
					codeComboStore = me.getViewModel().getStore('shipCraneCombo');
				}
			}
		}else if(cell.column.dataIndex == 'workLoc'){ 	
			var displayFieldName = 'cdNm';
			var codeFieldName = 'cd';
			if (cell.record.data.workLocTp == 'HTC'){
				codeComboStore = me.getViewModel().getStore('hatchCombo');
			}else if (cell.record.data.workLocTp == 'WRF'){
				codeComboStore = me.getViewModel().getStore('bulkWharfCombo');
			}else if (cell.record.data.workLocTp == 'EDJ'){
				codeComboStore = me.getViewModel().getStore('edjCombo');
			}else if (cell.record.data.workLocTp == 'NDJ'){
				codeComboStore = me.getViewModel().getStore('ndjCombo');
			}else {
				codeComboStore = me.getViewModel().getStore('warehouseCombo');
			}
		}else if(cell.column.dataIndex == 'capaCd' && gridView.data.divCd == 'TRL'){ 	
			var displayFieldName = 'eqFacNm';
			var codeFieldName = 'eqFacNo';
			codeComboStore = me.getViewModel().getStore('eqTypeTRCombo');
		}else if(cell.column.dataIndex == 'capaCd' && gridView.data.divCd == 'ME'){ 	
			var displayFieldName = 'capaDescr';
			var codeFieldName = 'capaCd';
			codeComboStore = me.getViewModel().getStore('equipmentCombo');
		}else if(cell.column.dataIndex == 'eqNo'){
			var displayFieldName = 'engNm';
			var codeFieldName = 'eqNo';
			
			if(StringUtil.isNullorEmpty(val)){
				val = me.eqNo;
			}
			
			codeComboStore = me.getViewModel().getStore('eqPCCombo');
		}else if(cell.column.dataIndex == 'cnrtCd'){
			var displayFieldName = 'engPtyNm';
			var codeFieldName = 'ptyCd';
			
			if(StringUtil.isNullorEmpty(val)){
				val = me.cnrtCd;
			}
			
			codeComboStore = me.getViewModel().getStore('cttCompCombo');
		}
		if(codeComboStore != null){
			var indx = -1;
			
			indx = codeComboStore.find(codeFieldName, val);
			
			if(cell.column.dataIndex == 'capaCd' && gridView.data.divCd == 'TRL' && indx == -1){
				indx = codeComboStore.find('capaCd', val);
			}
			
			if (indx != -1){
				return codeComboStore.getAt(indx).get(displayFieldName); 
			}else{
				if(cell.column.dataIndex == 'mbsCd'){ 	
					return codeComboStore.getAt(0).get(displayFieldName); 
				}
			}
		}
		
		return '';
	},
	
	onChangeFlNo: function(field, newValue) {
		var me = this;
		var refs = me.getReferences();
		var flNoCombo = me.getStore('flNoCombo');
		var index = flNoCombo.find('eqNo', newValue);
		var grid = me.lookupReference('refForkliftGrid');
		if(index != -1) {
			var capaDescr = flNoCombo.getAt(index).get('capaDescr');
			var capaCd = flNoCombo.getAt(index).get('capaCd');
			refs.refFLCapacity.setValue(capaCd);
			refs.refFLCapacityDescr.setValue(capaDescr);
		}else {
			refs.refFLCapacity.setValue(capaCd);
			refs.refFLCapacityDescr.setValue(capaDescr);
		}
	},
	
	onChangeEqNo: function(field, newValue) {
		var me = this;
		var refs = me.getReferences();
		var flNoCombo = me.getStore('flNoCombo');
		var index = flNoCombo.find('eqNo', newValue);
		var grid = me.lookupReference('refForkliftGrid');
		if(index != -1) {
			var capaDescr = flNoCombo.getAt(index).get('capaDescr');
			var capaCd = flNoCombo.getAt(index).get('capaCd');
			refs.refFLCapacity.setValue(capaCd);
			refs.refFLCapacityDescr.setValue(capaDescr);
		}else {
			refs.refFLCapacity.setValue(capaCd);
			refs.refFLCapacityDescr.setValue(capaDescr);
		}
	},
	
	onChangeFLGroup: function(field, newValue) {
		var me = this;
		var refs = me.getReferences();
		if (newValue.data.scd == 'CTR'){
			refs.refOperator.setEditor({
				xtype: 'combo',
				bind: {store: '{cttCompCombo}'},
		        displayField: 'engPtyNm',
		        valueField: 'ptyCd',
		        queryMode: 'local',
		        editable: false,
		        emptyText: 'Select',
		        allowBlank: false
		    })
		}else if (newValue.data.scd == me.ADP){
			refs.refOperator.setEditor({
				xtype: 'combo',
				bind: {store: '{empFLCombo}'},
		        displayField: 'empNm',
		        valueField: 'empId',
		        queryMode: 'local',
		        editable: false,
		        emptyText: 'Select',
		        allowBlank: false
		    })
		}else {
			refs.refOperator.setEditor({
		        xtype: 'textfield',
		        editable: false
			})
		}
	},
	
	onChangeFLWorkArea: function(field, newValue) {
		var me = this;
		var refs = me.getReferences();
		var workLocStore;
		
		if(refs.ctlFLWorkingArea.refs.ctlLocationTypeField){
			refs.ctlFLWorkingArea.refs.ctlLocationTypeField.setValue(newValue.data.scd);
		}
		
		if (newValue.data.scd == 'HTC'){
			refs.refFLApFp.setHidden(false);
			var hatchCombo = me.getStore('hatchCombo');
			workLocStore = hatchCombo;
		}else if (newValue.data.scd == 'WRF'){
			refs.refFLApFp.setHidden(false);
			var bulkWharfCombo = me.getStore('bulkWharfFLCombo');
			workLocStore = bulkWharfCombo;
		}else if (newValue.data.scd == 'WHO'){
			refs.refFLApFp.setHidden(true);
			var warehouseCombo = me.getStore('warehouseFLCombo');
			workLocStore = warehouseCombo;
		}else{
			refs.refFLApFp.setHidden(true);
		}
		
		refs.ctlFLWorkingArea.setValue('');
	},

	onChangeJPB: function(field, newValue) {
		var me = this;
		var refs = me.getReferences();
		if (newValue.data.empId != ''){
			refs.ctlFLJPB.setValue(true);
		}
	},
	
	onHiddenFLApFp: function(field, newValue){
		var me = this;
		var refs = me.getReferences();
		if (newValue == ''){
			refs.refFLApFp.setHidden(true);
		}else{
			refs.refFLApFp.setHidden(false);
		}
	},
	
	onChangeTRWorkArea: function(field, newValue) {
		var me = this;
		var refs = me.getReferences();
		var workLocStore;
		if (newValue === 'HTC'){
			refs.refTRApFp.setHidden(false);
			var hatchCombo = me.getStore('hatchCombo');
			workLocStore = hatchCombo.load();
		}else if (newValue === 'WRF'){
			refs.refTRApFp.setHidden(false);
			var bulkWharfCombo = me.getStore('bulkWharfCombo');
			workLocStore = bulkWharfCombo.load();
		}else if (newValue === 'WHO'){
			refs.refTRApFp.setHidden(true);
			var warehouseCombo = me.getStore('warehouseCombo');
			workLocStore = warehouseCombo.load();
		}else{
			refs.refTRApFp.setHidden(true);
			workLocStore = me.getStore('noneStore');
		}
		refs.refTRWorkLocCd.bindStore(workLocStore);
		if (workLocStore && workLocStore.data.length === 0)
		{
			refs.refTRWorkLocCd.setValue('');
		}
	},
	
	onChangeMEWorkArea: function(field, newValue) {
		var me = this;
		var refs = me.getReferences();
		var workLocStore;
		if (newValue === 'HTC'){
			refs.refTRApFp.setHidden(false);
			var hatchCombo = me.getStore('hatchCombo');
			workLocStore = hatchCombo.load();
		}else if (newValue === 'WRF'){
			refs.refTRApFp.setHidden(false);
			var bulkWharfCombo = me.getStore('bulkWharfCombo');
			workLocStore = bulkWharfCombo.load();
		}else if (newValue === 'WHO'){
			refs.refTRApFp.setHidden(true);
			var warehouseCombo = me.getStore('warehouseCombo');
			workLocStore = warehouseCombo.load();
		}else{
			refs.refTRApFp.setHidden(true);
			workLocStore = me.getStore('noneStore');
		}
		refs.refMEWorkLocCd.bindStore(workLocStore);
		if (workLocStore && workLocStore.data.length === 0)
		{
			refs.refMEWorkLocCd.setValue('');
		}
	},
	
	onChangeCategory: function(combo, value, obj) {
		var me = this;
		var grid = combo.up('grid');
		
		grid.down('[dataIndex=workLoc]').getEditor().setValue('');
		me.workingAreaComboLoad(value.data.scd);
	},
	
	workingAreaComboLoad : function(value){
		var me = this;
		var workingAreaCombo = me.getStore('workingAreaCombo');
		if(workingAreaCombo.loadCount <= 0){
			workingAreaCombo.load();
		}
		if(workingAreaCombo != null){
			workingAreaCombo.clearFilter();
	    	
			workingAreaCombo.filter([{
				filterFn: function(item) {
			    	return (item.get('tyCd').trim().search(value) != -1);
			    }
	    	}]);
		}
	},
	
	onChangeRole: function(combo, value, obj) {
		var me = this;
		var grid = combo.up('grid');
		var empList = me.getStore('empList');
		
		grid.down('[dataIndex=empId]').getEditor().setValue('');
		grid.down('[dataIndex=empNm]').getEditor().setValue('');
		me.empMPComboLoad(value.data.scd);
		
		
		empList.clearFilter();
		
		empList.filter([{
			filterFn: function(item) {
				return item.get('roleCd').indexOf(value.get('scd')) > -1;
		    }
    	}]);
	},
	
	empMPComboLoad : function(value){
		var me = this;
		var refs = me.getReferences();
		var empMPCombo = me.getStore('empMPCombo');
		if(empMPCombo.loadCount <= 0){
			empMPCombo.load({
				params : {
					vslCallID : refs.refVslCallId.getValue(),
					workYmd : refs.refWorkYmd.rawValue,
					shftId : refs.refShift.getValue()
				},
			});
		}
		if(empMPCombo != null){
			empMPCombo.clearFilter();
			empMPCombo.filter([{
				filterFn: function(item) {
					if(item.get('roleCd') != null && item.get('roleCd') != ''){
						return (item.get('roleCd').trim().search(value) != -1);
					}
			    }
	    	}]);
		}
	},
	
	onChangeEmpMP: function(combo, value, obj) {
		var me = this;
		var grid = combo.up('grid');
		var empMPCombo = me.getStore('empMPCombo');
		var emp = empMPCombo.findRecord('empId', value.data.empId);
		grid.down('[dataIndex=empNm]').getEditor().setValue(emp.data.empNm);
		me.empNm = value.get('empNm');
	},
	
	onChangeTRPurpose: function(combo, value, obj) {
		var me = this;
		var megaTRList = me.getStore('megaTRList');
		if(megaTRList != null){
			megaTRList.clearFilter();
			megaTRList.filter([{
				filterFn: function(item) {
					return (item.get('purpTpCd').trim().search(value.data.scd) != -1);
			    }
	    	}]);
		}
	},
	
	onChangeFLPurpose: function(combo, value, obj) {
		var me = this;
		var megaFList = me.getStore('megaFList');
		if(megaFList != null){
			megaFList.clearFilter();
			megaFList.filter([{
				filterFn: function(item) {
					return (item.get('purpTpCd').trim().search(value.data.scd) != -1);
			    }
	    	}]);
		}
	},
	onChangePortCranePurpose: function(combo, value, obj) {
		var me = this;
		var megaPCist = me.getStore('megaPCList');
		if(megaPCist != null){
			megaPCist.clearFilter();
			megaPCist.filter([{
				filterFn: function(item) {
					return (item.get('purpTpCd').trim().search(value.data.scd) != -1);
				}
			}]);
		}
	},
	
	onChangeMEPurpose: function(combo, value, obj) {
		var me = this;
		var megaMEList = me.getStore('megaMEList');
		if(megaMEList != null){
			megaMEList.clearFilter();
			megaMEList.filter([{
				filterFn: function(item) {
					return (item.get('purpTpCd').trim().search(value.data.scd) != -1);
			    }
	    	}]);
		}
	},
	
	onChangeEqCode: function(combo, value, obj) {
		var me = this;
		var grid = combo.up('grid');
		var equipmentCombo = me.getStore('equipmentCombo');
		grid.down('[dataIndex=capaCd]').getEditor().setValue('');
		var eliminate = 'RC,MC,FC,FL,GS,BG,CU,TX,LL,PC,CP,RL,SR,TRL,WP,SR1,SR2,SR3'
		if(equipmentCombo != null){
			equipmentCombo.clearFilter();
			equipmentCombo.filter([{
				filterFn: function(item) {
					return (eliminate.indexOf(item.get('eqDivCd')) == -1 && item.get('eqDivCd').trim().search(value.data.scd) != -1);
				}
			}]);
		}
		
		var workAreaMECombo = me.getStore('workAreaMECombo');
		if(value.data.scd != 'GR'){
			if(workAreaMECombo.data.length > 3){
				workAreaMECombo.removeAt(4);
				workAreaMECombo.removeAt(3);
			}
		}else{
			if(workAreaMECombo.data.length <= 3){
				workAreaMECombo.insert(3, [
			        	  {"scd":"EDJ", "scdNm":"Edible Jetty"},
						  {"scd":"NDJ", "scdNm":"Non Edible Jetty"}]);
				
			}
		}
		
	},
	
	onChangeEquipment: function(combo, value, obj) {
		var me = this;
		var grid = combo.up('grid');
		me.capaCd = value.get('capaCd');
		grid.down('[dataIndex=rsNm]').getEditor().setValue(value.data.eqDivCd);
	},
	
	onChangeMEGroup: function(combo, value, obj) {
		var me = this;
		var refs = me.getReferences();
		if (value.data.scd == 'Y'){
			refs.refMEContractor.setEditor({
				xtype: 'textfield',
		        editable: false,
				width: 150
		    })
		}else{
			refs.refMEContractor.setEditor({
				xtype: 'combo',
					bind: {store: '{cttCompCombo}'},
			        displayField: 'engPtyNm',
			        valueField: 'ptyCd',
			        queryMode: 'local',
			        editable: false,
			        emptyText: 'Select',
			        allowBlank: false
		    })
		}
	},
	
	onChangeCraneGroup: function() {
		var me = this;
		var refs = me.getReferences();
		var craneStore;
		if(refs.ctl_Crane.getValue().gr === 'shipCrane'){
			refs.refPCShipCrane.setHidden(false);
			refs.refPCEqNo.setHidden(true);
		}else{
			refs.refPCShipCrane.setHidden(true);
			refs.refPCEqNo.setHidden(false);
		}
	},
	onChangeContractor: function() {
		var me = this;
		var refs = me.getReferences();
		if(refs.ctl_GroupPortCrane.getValue().portcranecontractor === me.ADP){
			refs.refPCCmbJPB.setDisabled(false);
			refs.refPCContractorCd.setDisabled(true);
			refs.refPCContractorCd.setValue('');
		}else{
			refs.refPCCmbJPB.setDisabled(true);
			refs.refPCCmbJPB.setValue('');;
			refs.refPCContractorCd.setDisabled(false);
    	}
	},

	onChangeForkliftContractor: function() {
		var me = this;
		var refs = me.getReferences();
		if(refs.ctl_GroupForklift.getValue().contractor ===me.ADP){
			refs.refFLCmbJPB.setDisabled(false);
			refs.refFLContractorCd.setDisabled(true);
			refs.refFLContractorCd.setValue("");
		}else if(refs.ctl_GroupForklift.getValue().contractor ==='contractor'){
			refs.refFLCmbJPB.setDisabled(true);
			refs.refFLCmbJPB.setValue("");
			refs.refFLContractorCd.setDisabled(false);
		}else{
			refs.refFLCmbJPB.setDisabled(true);
			refs.refFLCmbJPB.setValue("");
			refs.refFLContractorCd.setDisabled(true);
			refs.refFLContractorCd.setValue("");
		}
	},
	
	onChangeEqType:function(field, newValue) {
		var me = this;
		var refs = me.getReferences();
		var eqPCCombo = me.getStore('eqPCCombo');
		var index = eqPCCombo.find('eqNo', refs.refPCEqNo.getValue());
		if(index != -1) {
			var capaDescr = eqPCCombo.getAt(index).get('capaDescr');
			var capaCd = eqPCCombo.getAt(index).get('capaCd');
			refs.refPCCapaCd.setValue(capaCd);
			refs.refPCCapaDesc.setValue(capaDescr);
		}else {
			refs.refPCCapaCd.setValue('');
			refs.refPCCapaDesc.setValue('');
		}
	},
	
	onChangeShipCrane: function(combo, value, obj) {
		var me = this;
		var grid = combo.up('grid');
		grid.down('[dataIndex=capaDescr]').getEditor().setValue('-');
		grid.down('[dataIndex=engNm]').getEditor().setValue(value.data.scdNm);
	},
	
	onRetrieve:function(){
		var me = this;
		var refs = me.getReferences();

		if(refs.refWorkYmd.getValue() == '' || refs.refWorkYmd.getValue() == null){
			MessageUtil.alert('Warning', 'vslchecklist_select_date_shift');
			return;
		}
		
		if(refs.refShift.getValue() == '' || refs.refShift.getValue() == null){
			MessageUtil.alert('Warning', 'vslchecklist_select_date_shift');
			return;
		}
		
		var vsrCheckListDetail = me.getStore('vsrCheckListDetail');
		var empidlist = me.getStore('empidlist');
		var empList = me.getStore('empList');
		
		var workingYmd = Ext.Date.format(refs.refWorkYmd.getValue(), MOST.config.Locale.getShortDate());
		
		vsrCheckListDetail.load({
			params: {
				vslCallID : refs.refVslCallId.getValue(),
				shftId : refs.refShift.getValue(),
				workYmd : workingYmd
			},
			callback: function(records, operation, success) {
				if (success) {
					
					if (records.length > 0) {
						var theModel = Ext.create('MOST.model.operation.VSRCheckList');
						theModel.phantom = false; // UPDATE
						theModel.data = records[0].data;
						me.getViewModel().setData({theVSR:theModel});
						me.getViewModel().setData({theVsl:records[0].data.searchJPVCItem[0]});
						me.setManPower(records[0].data);
						me.setForklift(records[0].data);
						me.setMechanicalEq(records[0].data);
						me.setPortCrane(records[0].data);
						me.setTrailer(records[0].data);
						me.setStevedore(records[0].data);
						me.setMegaPC(records[0].data);
						me.setMegaF(records[0].data);
						me.setMegaTR(records[0].data);
						me.setMegaME(records[0].data);
					}
				}
			}
		});
		
		empidlist.load({
			params:{
				vslCallID : refs.refVslCallId.getValue(),
				shftId : refs.refShift.getValue(),
				workYmd : workingYmd,
				searchType:'InitEmpId'
			},
			callback:function(records, operation, success){
				if(success){
					empList.setData(records[0].get('empIdList'));
				}
			}
		})
		
	},
	
	onManPowerStaffNmRenderer:function(val){
		var me = this;
		var refs = me.getReferences();
		
		if(val != null || val != ''){
				return val
		}
		
	},
	
	onBtnRetrieveHandler:function(button, event){
		var me = this;
		
		me.click = '1';
		me.onRetrieve();
	},
	
	onEmpSelect:function(combo, value, obj){
		var me = this;
		var refs = me.getReferences();
		me.mbsCd = me.ADP;
	},
	
	onFlNoSelect:function(combo, value, obj){
		var me = this;
		var megaFList = me.getStore('megaFList');
		
		var data = megaFList.queryBy('eqNo', value.get('eqNo'));
		
		if(data.length > 0){
			me.isDriver = data.getAt(0).get('flStatus');
		}
	},
	
	onCapacitySelect:function(combo, value, obj){
		var me = this;

		me.capaCd = value.data.capaCd;
	},
		
	onContractorSelect:function(combo,value, obj){
		var me = this;
		me.cnrtCd = value.data.ptyCd;
	},
	
	onVerify:function(){
		var me = this;
		var refs = me.getReferences();
		
		if(refs.refVslCallId.getValue() === '' || refs.refWorkYmd.getValue() === '' || refs.refShift.getValue()===''){
			MessageUtil.alert('Warning', 'Please input JPVC and Date, Shift first.');
			return;
		}

		var manPowerList = me.getViewModel().getStore('manPowerList');
		var stevedoreList = me.getViewModel().getStore('stevedoreList');
		var portCraneList = me.getViewModel().getStore('portCraneList');
		var forkliftList = me.getViewModel().getStore('forkliftList');
		var trailerList = me.getViewModel().getStore('trailerList');
		var mechanicalEqList = me.getViewModel().getStore('mechanicalEqList');
		
		if(manPowerList.data.length === 0 && stevedoreList.data.length === 0 && portCraneList.data.length === 0 && 
				forkliftList.data.length === 0 && trailerList.data.length === 0  && mechanicalEqList.data.length === 0 ){
			MessageUtil.alert('Warning', 'There is no data to verify.');
			return
		}
		
		MessageUtil.question('confirm', 'vsrchecklist_confirm_verify_msg',null, function(button){
			if(button === 'ok'){
				var verifyVSRCheckList = me.getStore('verifyVSRCheckList');
				var verifyItem = Ext.create('MOST.model.operation.VSRCheckList');
				
				
				verifyItem.set('vslCallID', refs.refVslCallId.getValue());
				verifyItem.set('workYmd', refs.refWorkYmd.rawValue);
				verifyItem.set('shftId', refs.refShift.getValue());
				verifyItem.set('verifyStatus', 'VERIFIED');
				
				verifyVSRCheckList.insert(0, verifyItem);
				
				verifyVSRCheckList.sync({
					success:function(){
						MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
							function(button){
							if (button === 'ok') {
								var parentView = me.getParentView();
								if(parentView.getoperation().onSearch){
									parentView.getoperation().onSearch();
									me.getView().up('window').close();
								}
							}
						});
					}
				})
			}
		});
		
	},
	onDownloadPDF : function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refVSRCheckListGrid');

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		var params = me.setSrchStrReport(selection); 
		params.previewType = 'DOWNLOAD';
		params.srcNm = 'CT10608';
			
		me.getView().detailViewAlias = 'app-vsrcheckListgeneratepdfpopup';
		me.openDetailPopup(params, 'Report VSR Check List');
	
	},
	
	onPreviewPDF:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refVSRCheckListGrid');

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null){
			MessageUtil.alert('Warning', 'vslchecklist_export_record');
			return;
		}
		var params = me.setSrchStrReport(selection); 
		params.previewType = 'PREVIEW';
		params.srcNm = 'CT10608';
		
		me.getView().detailViewAlias = 'app-vsrcheckListgeneratepdfpopup';
		me.openDetailPopup(params, 'Report VSR Check List');
		
	},
	onDetailPreview:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refVSRCheckListGrid');

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		var params = me.setSrchStrReport(selection); 
		params.previewType = 'PREVIEW';
		params.srcNm = 'CT106';
		
		me.getView().detailViewAlias = 'app-vsrcheckListgeneratepdfpopup';
		me.openDetailPopup(params, 'Report VSR Check List');
		
	},
	onDetailDownload:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refVSRCheckListGrid');

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		var params = me.setSrchStrReport(selection); 
		params.previewType = 'DOWNLOAD';
		params.srcNm = 'CT106';
			
		me.getView().detailViewAlias = 'app-vsrcheckListgeneratepdfpopup';
		me.openDetailPopup(params, 'Report VSR Check List');
	},
	onBeforeClose: function(){
		var me = this;
		me.getView().detailViewAlias = 'app-app-vsrchecklistdetail';
	},
	setSrchStrReport:function(selection){
		var me = this;
		var refs = me.getReferences();
		var params = null;
		var vslCallId = selection.data.vslCallID;
		var userId = MOST.config.Token.getUserId();
		workYmd = selection.data.workYmd;
		shftId = selection.data.shftId;
		var vslNm = selection.data.vslName;
		var cgTpNm = selection.data.cgTpNm;
		var shftNm = selection.data.shftNm;
		var berthLoc = selection.data.berthLoc;
		var atb = selection.data.atb;
		params = {
				vslCallID : vslCallId,
				reportId: '',
				searchType: 'info',
				previewType: '',
				userId: userId,
		   		shftId:shftId,
		   		shftNm: shftNm,
		   		workYmd:workYmd,
		   		berthLoc: berthLoc,
		   		stgLoc: '',
		   		workStDt:'',
		   		workEndDt:'',
		   		seacrchType: 'craneList',
		   		srcNm: '',
		   		vslNm: vslNm,
		   		cgTpNm: cgTpNm,
		   		requester: '',
		   		purpose: '',
		   		atb:atb,
		   		sa:''
		}
		return params
	},
	
	onTriggerClick:function(field, button, e){
		var me = this;
		var refs = me.getReferences();
		var controlName = field.reference;
		
		me.openCodePopup('popup-workingareamultipopup', controlName);
	},
	
	onTabChange:function(tabPanel, tab){
		var me = this;
		var refs = me.getReferences();
		
		me.onTabChangeRemove('ManPower');
		me.onTabChangeRemove('Stevedore');
		me.onTabChangeRemove('PortCrane');
		me.onTabChangeRemove('Forklift');
		me.onTabChangeRemove('Trailer');
		me.onTabChangeRemove('MechanicalEq');
	},
	
	onTabChangeRemove: function(bizName) {
		var me = this;
		var grid = me.lookupReference(Ext.String.format('ref{0}Grid', bizName));
		var store = grid.getStore();
		var selection = grid.getSelection() === null ? null : grid.getSelection();
		
		if(selection == null) return;
		
		Ext.each(selection, function (record) {
			if(record.crudState == 'C' && record.data.workingStatus == undefined){
				store.remove(record);
			}
			
		});
	},
	
	onValidatePCEdit:function(editor, context){
		var me = this;
		var refs = me.getReferences();
		var record = context.record;
		var isValid = true;

		if(!me.validateDateRange(editor))
			return false;

		var store = me.getStore('portCraneList');
		var curItem = store.data.items[editor.context.rowIdx].data;
		store.each(function(record) {

	       if (record.data.empId == editor.grid.down('[dataIndex=empId]').getEditor().getValue()){
	    	   if(record.crudState == 'R'){
	    		   var recStDt = Ext.Date.format(new Date(record.get('workStDt')), 'YmdHi');
	    		   var recEndDt = Ext.Date.format(new Date(record.get('workEndDt')), 'YmdHi');
	    		   var edStdt = Ext.Date.format(new Date(editor.grid.down('[dataIndex=workStDt]').getEditor().getValue()), 'YmdHi');
	    		   var edEndDt = Ext.Date.format(new Date(editor.grid.down('[dataIndex=workEndDt]').getEditor().getValue()), 'YmdHi');

	    		  if(recStDt <= edStdt || recEndDt <= edEndDt){
	    			  MessageUtil.alert('Warning', 'vslchecklist_portcrane_duplicate');
	    	    	   isValid = false;
	    	    	   return false;
	    		  }

	    	   }else{
	    		   MessageUtil.alert('Warning', 'vslchecklist_portcrane_duplicate');
		    	   isValid = false;
		    	   return false;
	    	   }
	       }
	    });

		if(!isValid){
			return false;
		}

		return true;
	},
	
	onDriverTpSelect:function(ele, record){
		var me = this;
		var refs = me.getReferences();
		
		
		me.mbsCd = record.get('scd');
		
		if(record.get('scd') == 'CTR'){
			refs.refCboJpb.allowBlank = true;
			refs.refCboContractor.allowBlank = false;
			refs.refCboContractor.setDisabled(false);
			refs.refCboJpb.setDisabled(true);
			
			
			refs.refCboJpb.setValue('');
			
		}else if(record.get('scd') == me.ADP){
			refs.refCboJpb.allowBlank = false;
			refs.refCboContractor.allowBlank = true;
			
			refs.refCboContractor.setDisabled(true);
			refs.refCboJpb.setDisabled(false);
			
			refs.refCboContractor.setValue('');
		}
		
	},
	
	openPartnerCdTypePopup:function(){
		var me = this;
		var params = {
			searchModule: 'MT',
			searchScreen: 'VSRCheckList'
		};
		me.openCodePopup('popup-partnercdtypepopup', 'refCboContractor', params);
	},
	/**
	 * =========================================================================================================================
	 * DETAIL END
	 */
	
	onCboJpbRenderer:function(val, cell, gridView){
		var me = this;
		var refs = me.getReferences();
		
		var empPCCombo = me.getStore('empPCCombo');
		if(empPCCombo != null && empPCCombo.getData().items.length != 0){
			var indx = -1;
			indx = empPCCombo.find('empId', val);
			
			if (indx != -1){
				return empPCCombo.getAt(indx).get('empNm'); 
			}else{
				return '';
			}
		}
	},
	
	onDriverTpRenderer:function(val, cell, gridView){
		var me = this;
		var refs = me.getReferences();
		var driverTp = me.getStore('driverTp');
		
		if(driverTp != null){
			var indx = -1;
			
			indx = driverTp.find('scd', val);
			
			if (indx != -1){
				return driverTp.getAt(indx).get('scdNm'); 
			}else{
				return driverTp.getAt(0).get('scdNm');
			}
		}
	},
	
	onEquipmentComboRenderer:function(val, cell, gridView){
		var me = this;
		var refs = me.getReferences();
		var equipmentCombo = me.getStore('equipmentCombo');
		
		if(equipmentCombo != null){
			var indx = -1;
			
			indx = equipmentCombo.find('capaCd', val);
			
			if (indx != -1){
				return equipmentCombo.getAt(indx).get('capaDescr'); 
			}else{
				return equipmentCombo.getAt(0).get('capaDescr');
			}
		}
	},
	
	openEmpIdPopup:function(){
		var me = this;
		var refs = me.getReferences();
		var params = {
			roleCd: refs.refRoleCd.getValue(),
			workYmd : Ext.Date.format(refs.refWorkYmd.getValue(), MOST.config.Locale.getShortDate()),
			shftId : refs.refShift.getValue(),
			vslCallId : refs.refVslCallId.getValue()
		}
		me.openCodePopup('popup-empidpopup', 'ctlEmpId', params);
	},
	
	openStevedorePopup:function(){
		var me = this;
		var refs = me.getReferences();
		var params={
			searchDivCd: 'STV'
		}
		me.openCodePopup('popup-partnercdpopup', 'refStevedoreCompany',params );
	},
	
	openStevedoreRequestorPopup:function(){
		var me = this;
		var params = {
			searchModule: 'MT'
		};
		me.openCodePopup('popup-partnercdtypepopup', 'refStevedoreRequestor', params);
	},
	
	openPCRequestorPopup:function(){
		var me = this;
		var params = {
			searchModule: 'MT'
		};
		me.openCodePopup('popup-partnercdtypepopup', 'refPCRequestor', params);
	},
	
	openFLRequestorPopup:function(){
		var me = this;
		var params = {
			searchModule: 'MT'
		};
		me.openCodePopup('popup-partnercdtypepopup', 'refFLRequestor', params);
	},
	
	openTRRequestorPopup:function(){
		var me = this;
		var params = {
			searchModule: 'MT'
		};
		me.openCodePopup('popup-partnercdtypepopup', 'refTRRequestor', params);
	},
	
	openMERequestorPopup:function(){
		var me = this;
		var params = {
			searchModule: 'MT'
		};
		me.openCodePopup('popup-partnercdtypepopup', 'refMERequestor', params);
	},
	
	openPCContractorPopup:function(){
		var me = this;
		var refs = me.getReferences();
		var params={
			searchDivCd: 'VDPR'
		}
		me.openCodePopup('popup-partnercdpopup', 'refPCContractorCd',params );
	},
	
	openFLContractorPopup:function(){
		var me = this;
		var refs = me.getReferences();
		var params={
			searchDivCd: 'VDPR'
		}
		me.openCodePopup('popup-partnercdpopup', 'refFLContractorCd',params );
	},
	
	openTRContractorPopup:function(){
		var me = this;
		var refs = me.getReferences();
		var params={
			searchDivCd: 'VDPR'
		}
		me.openCodePopup('popup-partnercdpopup', 'refTRContractorCd',params );
	},
	
	openMEContractorPopup:function(){
		var me = this;
		var refs = me.getReferences();
		var params={
			searchDivCd: 'VDPR'
		}
		me.openCodePopup('popup-partnercdpopup', 'refMEContractorCd',params );
	},
	
	openTREquipmentCdPopup:function(){
		var me = this;
		var params = {
				searchType: 'EQNO', 	// equipmentcode, equipmentcapa
				 eqDivCd: 'TRL',					// GR, TRL, SC
				scdLgv: '',
				scdVal: '',
				eqDivCdType: 'TRL'
		};
		me.openCodePopup('popup-equipmentcdpopup', 'ctlTREquipmentCode', params);
	},
	
	openMEEquipmentCdPopup:function(){
		var me = this;
		var params = {
				searchType: 'equipmentcode', 	// equipmentcode, equipmentcapa
				eqDivCd: 'MC',					// GR, TRL, SC
				scdLgv: '',
				scdVal: ''
		};
		me.openCodePopup('popup-mechanicalcdpopup', 'ctlMEEquipmentCode', params);
	},
	
	onManPowerClick:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refManPowerGrid');

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;

		me.getViewModel().setData({theManPower: selection.clone()});
		refs.refsAddManPower.setDisabled(true);
	},
	
	onStevedoreClick:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refStevedoreGrid');

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;


		me.getViewModel().setData({theStevedore: selection.clone()});
		refs.refsAddStevedore.setDisabled(true);
	},
	
	onPortCraneClick:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refPortCraneGrid');
		var eqPCCombo = me.getStore('eqPCCombo');
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;

		if(selection.get('capaCd')){
			refs.ctlPortCrane.setValue(true);
		}else{
			refs.ctlShipCrane.setValue(true);
		}

		if(refs.ctl_Crane.getValue().gr === 'shipCrane'){
			refs.refPCShipCrane.setValue(selection.get('eqNo'));
		}else{
			refs.refPCEqNo.setValue(selection.get('eqNo'));
		}
		refs.refPCCmbJPB.setValue(selection.get('empId'));
		refs.refPCContractorCd.setValue(selection.get('cnrtCd'));
		refs.refPortCraneStartTime.setValue(selection.get('workStDt'));
		refs.refPortCraneEndTime.setValue(selection.get('workEndDt'));
		refs.refPCRequestor.setValue(selection.get('payer'));
		refs.refPCCargoType.setValue(selection.get('cgTpCd'));
		refs.refPCRemarks.setValue(selection.get('rmk'));
		refs.ctlPCPurpose.setValue(selection.get('purpose'));

		if(selection.get('mbsCd') ==='CTR'){
			refs.ctlPCContractor.setValue(true);
		}else{
			refs.ctlPCJPB.setValue(true);
		}
		
	},
	
	onForkliftMegaGridClick:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refMegaFGrid');

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		
		var temp = selection.get('locId');
		var locTp = temp.substr(0,1);
		if(locTp === 'H'){
			refs.refFLWorkingArea.setValue('HTC');
		} else if(locTp === 'B' || locTp === 'W'){
			refs.refFLWorkingArea.setValue('WRF');

			if(temp.substr(0,5) === 'Wharf'){
				temp = temp.substring(6, temp.length -1);
			}
		} else {
			refs.refFLWorkingArea.setValue('WHO');
		}
		refs.ctlFLWorkingArea.setValue(temp);
		
		if (selection.get('opeCompNm')){
			refs.ctlFLContractor.setValue(true);
			refs.ctl_GroupForklift.setValue('contractor');
			refs.refFLContractorCd.setValue(selection.get('opeCompNm'));
			refs.refFLCmbJPB.setValue('');
		}else if(selection.get('empId')) {
			refs.ctl_GroupForklift.setValue(me.ADP);
			refs.refFLCmbJPB.setValue(selection.get('empId'));
			refs.refFLContractorCd.setValue('');
			refs.ctlFLJPB.setValue(true);
		}else{
			refs.ctl_GroupForklift.setValue('nodriver');
			refs.ctlNoDriver.setValue(true);
		}		
		
		if(selection.get('cgTpCd')){
			refs.refFLCargoType.setValue(selection.get('cgTpCd'));
		} else {
			refs.refFLCargoType.setValue('BBK');
		}
		
		refs.refFlNo.setValue(selection.get('eqNo'));
		refs.refFLCapacity.setValue(selection.get('capaCd'));
		refs.refFLCapacityDescr.setValue(selection.get('capaDescr'));
		refs.refFLRequestor.setValue(selection.get('payer'));
		refs.ctlFLCmbRef.setValue(true);
		refs.refFLCmbRefNo.setValue(selection.get('refNo'));
		refs.refFLTxtRefNo.setValue('');
	},
	
	onPortCraneMegaGridClick:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refMegaPCGrid');

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
			
		if (selection.get('opeCompNm') !== me.ADP){
			refs.ctlPCContractor.setValue(true);
			refs.ctl_GroupPortCrane.setValue('contractor');
			refs.refPCContractorCd.setValue(selection.get('operator'));
			refs.ctlPCJPB.setValue('');
		}else{
			refs.ctl_GroupPortCrane.setValue(me.ADP);
			//refs.refPCCmbJPB.setValue(selection.get('empId'));
			refs.refPCContractorCd.setValue('');
			refs.ctlPCJPB.setValue(true);
		}		
		
		if(selection.get('capaCd')){
			refs.ctlPortCrane.setValue(true);
		}else{
			refs.ctlShipCrane.setValue(true);
		}

		if(refs.ctl_Crane.getValue().gr === 'shipCrane'){
			refs.refPCShipCrane.setValue(selection.get('eqNo'));
		}else{
			refs.refPCEqNo.setValue(selection.get('eqNo'));
		}
		
		refs.refPCRequestor.setValue(selection.get('payer'));
		refs.refPCCargoType.setValue(selection.get('cgTpCd'));
	},	
	
	
	onForkliftDevploymentGridClick:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refForkliftGrid');

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		
		refs.refFlNo.setValue(selection.get('rsNm'));
		refs.refFLCapacity.setValue(selection.get('capaCd'));
		refs.refFLCapacityDescr.setValue(selection.get('capaDescr'));
		refs.refFLWorkingArea.setValue(selection.get('workLocTp'));
		refs.ctlFLWorkingArea.setValue(selection.get('workLoc'));
		refs.refFLCargoType.setValue(selection.get('cgTpCd'));
		refs.refFLRequestor.setValue(selection.get('payer'));
		refs.refFLTxtRefNo.setValue(selection.get('refNo'));

		var purposeComboStore = me.getStore('purposeCombo');
		if(purposeComboStore.loadCount <= 0){
			purposeComboStore.load();
		}
		var purpose = purposeComboStore.findRecord('scdNm', selection.get('purposeNm'));
		if (purpose) {
			refs.ctlFLPurpose.setValue(purpose.get('scd'));
		}

		// refs.ctlFLPurpose.setValue(selection.get('purposeNm'));
		refs.ctlFLDMode.setValue(selection.get('delvTpCd'));
		refs.refForkliftEQArrTime.setValue(selection.get('setupTime'));
		refs.refForkliftStartTime.setValue(selection.get('workStDt'));
		refs.refForkliftEndTime.setValue(selection.get('workEndDt'));
		refs.refForkliftRemarks.setValue(selection.get('rmk'));
		refs.refFLContractorCd.setValue(selection.get('operator'));
		refs.refFLApFp.setValue(selection.get('hatchDir'));

	    if(refs.refFLWorkingArea.getValue() == 'HTC' || refs.refFLWorkingArea.getValue() == 'WRF'){
			refs.refFLApFp.setHidden(false);
		}else{
			refs.refFLApFp.setHidden(true);
		}
	    
	    if(selection.get('refYn') === 'Y'){
	    	refs.ctlFLCmbRef.setValue(true);
	    	refs.refFLCmbRefNo.setValue(selection.get('refNo'));
	    	refs.refFLTxtRefNo.setValue('');
	    }else{
	    	refs.ctlFLTxtRef.setValue(true);
	    	refs.refFLTxtRefNo.setValue(selection.get('refNo'));
	    	refs.refFLCmbRefNo.setValue('');
	    }
		
		if(selection.get('mbsCd') === 'CTR'){
			refs.ctlFLContractor.setValue(true);
			refs.ctl_GroupForklift.setValue('contractor');
			refs.refFLContractorCd.setValue(selection.get('operator'));
			refs.refFLCmbJPB.setValue('');
		}else if(selection.get('mbsCd') === me.ADP){ 
			refs.ctl_GroupForklift.setValue(me.ADP);
			refs.refFLCmbJPB.setValue(selection.get('empId'));
			refs.refFLContractorCd.setValue('');
			refs.ctlFLJPB.setValue(true);
		}else{
			refs.ctl_GroupForklift.setValue('nodriver');
			refs.ctlNoDriver.setValue(true);
		}
	},
	
	onTrailerMegaGridClick:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refMegaTRGrid');

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		
		var temp = selection.get('locId');
		var locTp = temp.substr(0,1);
		if(locTp === 'H'){
			refs.refTRWorkingArea.setValue('HTC');
		} else if(locTp === 'B' || locTp === 'W'){
			refs.refTRWorkingArea.setValue('WRF');

			if(temp.substr(0,5) === 'Wharf'){
				temp = temp.substring(6, temp.length -1);
			}
		} else {
			refs.refTRWorkingArea.setValue('WHO');
		}
		refs.refTRWorkLocCd.setValue(temp);
		refs.refTRContractorCd.setValue(selection.get('opeCompNm'));
		
		if(selection.get('cgTpCd')){
			refs.refTRCargoType.setValue(selection.get('cgTpCd'));
		} else {
			refs.refTRCargoType.setValue('BBK');
		}
		
		refs.ctlTREquipmentCode.setValue(selection.get('capaCd'));
		refs.ctlTREquipmentCodeDesc.setValue(selection.get('capaDescr'));
		refs.ctlTREquipmentDivCd.setValue(selection.get('eqDivCd'));
		refs.refTRRequestor.setValue(selection.get('payer'));
	
		refs.ctlTRCmbRef.setValue(true);
		refs.refTRCmbRefNo.setValue(selection.get('refNo'));
		refs.refTRTxtRefNo.setValue('');		
		
	},

	onTrailerDeploymentGridClick:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refTrailerGrid');

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		refs.refTRWorkingArea.setValue(selection.get('workLocTp'));
		refs.refTRWorkLocCd.setValue(selection.get('workLoc'));
		refs.ctlTRNos.setValue(selection.get('rsQty'));
		refs.refTRContractorCd.setValue(selection.get('cnrtCd'));
		refs.refTRRemarks.setValue(selection.get('rmk'));
		refs.refTRCargoType.setValue(selection.get('cgTpCd'));
		refs.refTRRequestor.setValue(selection.get('payer'));
		refs.refTRTxtRefNo.setValue(selection.get('refNo'));
		refs.ctlTREquipmentCodeDesc.setValue(selection.get('capaDescr'));
		refs.ctlTREquipmentCode.setValue(selection.get('capaCd'));
		refs.ctlTREquipmentDivCd.setValue(selection.get('divCd'));
		
		var purposeComboStore = me.getStore('purposeCombo');
		if(purposeComboStore.loadCount <= 0){
			purposeComboStore.load();
		}
		var purpose = purposeComboStore.findRecord('scdNm', selection.get('purposeNm'));
		refs.ctlTRPurpose.setValue(purpose.get('scd'));
		refs.ctlTRDMode.setValue(selection.get('delvTpCd'));
		refs.refTrailerEQArrTime.setValue(selection.get('setupTime'));
		refs.refTrailerStartTime.setValue(selection.get('workStDt'));
		refs.refTrailerEndTime.setValue(selection.get('workEndDt'));
		refs.refTRApFp.setValue(selection.get('hatchDir'));
		refs.refTRApFp.setHidden(false);
		
		if(refs.refTRTxtRefNo.getValue() != null && refs.refTRTxtRefNo.getValue() != ''){
			refs.ctlTRCmbRef.setDisabled(true);
			refs.refTRCmbRefNo.setDisabled(true);
			refs.ctlTRTxtRef.setValue(true);
			refs.ctlTRTxtRef.setDisabled(true);
			refs.refTRTxtRefNo.setDisabled(true);
		}
		
	    if(selection.get('refYn') === 'Y'){
	    	refs.ctlTRCmbRef.setValue(true);
	    	refs.refTRCmbRefNo.setValue(selection.get('refNo'));
	    	refs.refTRTxtRefNo.setValue('');
	    }else{
	    	refs.ctlTRTxtRef.setValue(true);
	    	refs.refTRTxtRefNo.setValue(selection.get('refNo'));
	    	refs.refTRCmbRefNo.setValue('');
	    }		
		
		me.onChangeWorkLoc('Trailer',selection.get('workLocTp'));
	},
	
	onMechanicalEquipmentGridClick:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refMegaMEGrid');

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		
		var temp = selection.get('locId');
		var locTp = temp.substr(0,1);
		if(locTp === 'H'){
			refs.refMEWorkingArea.setValue('HTC');
		} else if(locTp === 'B' || locTp === 'W'){
			refs.refMEWorkingArea.setValue('WRF');
			if(temp.substr(0,5) === 'Wharf'){
				temp = temp.substring(6, temp.length -1);
			}
		} else {
			refs.refMEWorkingArea.setValue('WHO');
		}
		refs.refMEWorkLocCd.setValue(temp);
		
		if(selection.get('opeCompNm')){
			refs.ctlMEContractor.setValue(true);
			refs.refMEContractorCd.setValue(selection.get('opeCompNm'));
		}else{
			refs.ctlMEShipCrew.setValue(true);
			refs.refMEContractorCd.setValue('');
		}
		
		if(selection.get('cgTpCd')){
			refs.refMECargoType.setValue(selection.get('cgTpCd'));
		} else {
			refs.refMECargoType.setValue('BBK');
		}
		
		refs.ctlMEEquipmentCode.setValue(selection.get('capaDescr'));
		refs.ctlMEEquipmentType.setValue(selection.get('eqDivCd'));
		refs.ctlMEEquipmentName.setValue(selection.get('capaCd'));
		refs.refMERequestor.setValue(selection.get('payer'));
		refs.ctlMECmbRef.setValue(true);
		refs.refMECmbRefNo.setValue(selection.get('refNo'));
		refs.refMETxtRefNo.setValue('');
		refs.refMEWONo.setValue('');
		refs.refMERemarks.setValue('');
		refs.ctlMENos.setValue(0);
	},	
	
	onMEClick:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refMechanicalEqGrid');

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		refs.ctlMEEquipmentType.setValue(selection.get('rsNm'));
		refs.ctlMEEquipmentCode.setValue(selection.get('capaDescr'));
		refs.ctlMEEquipmentName.setValue(selection.get('capaCd'));
		refs.ctlMENos.setValue(selection.get('rsQty'));
		refs.refMEWONo.setValue(selection.get('workOdrNo'));
		refs.refMEWorkingArea.setValue(selection.get('workLocTp'));
		refs.refMEWorkLocCd.setValue(selection.get('workLoc'));
		refs.refMEContractorCd.setValue(selection.get('cnrtCd'));
		
		var purposeComboStore = me.getStore('purposeCombo');
		if(purposeComboStore.loadCount <= 0){
			purposeComboStore.load();
		}
		var purpose = purposeComboStore.findRecord('scdNm', selection.get('purposeNm'));
		refs.ctlMEPurpose.setValue(purpose.get('scd'));
		
		refs.refMECargoType.setValue(selection.get('cgTpCd'));
		refs.refMERequestor.setValue(selection.get('payer'));
		refs.refMETxtRefNo.setValue(selection.get('refNo'));
		refs.refMechanicalEqEQArrTime.setValue(selection.get('setupTime'));
		refs.refMechanicalEqStartTime.setValue(selection.get('workStDt'));
		refs.refMechanicalEqEndTime.setValue(selection.get('workEndDt'));
		refs.refMERemarks.setValue(selection.get('rmk'));
		
		if(selection.get('shpCrew') != null && selection.get('shpCrew') != ''){
			if(selection.get('shpCrew') == 'Y'){
				refs.ctlMEShipCrew.setValue(true);
			}else{
				refs.ctlMEContractor.setValue(true);
			}
		}
		
		if(refs.refMETxtRefNo.getValue() != null && refs.refMETxtRefNo.getValue() != ''){
			refs.ctlMECmbRef.setDisabled(true);
			refs.refMECmbRefNo.setDisabled(true);
			refs.ctlMETxtRef.setValue(true);
			refs.ctlMETxtRef.setDisabled(true);
			refs.refMETxtRefNo.setDisabled(true);
		}
		
	    if(selection.get('refYn') === 'Y'){
	    	refs.ctlMECmbRef.setValue(true);
	    	refs.refMECmbRefNo.setValue(selection.get('refNo'));
	    	refs.refMETxtRefNo.setValue('');
	    }else{
	    	refs.ctlMETxtRef.setValue(true);
	    	refs.refMETxtRefNo.setValue(selection.get('refNo'));
	    	refs.refMECmbRefNo.setValue('');
	    }				
		me.onChangeWorkLoc('Mechanical',selection.get('workLocTp'));
	},
	
	onChangeWorkLoc: function(bizName, newValue) {
		var me = this;
		var refs = me.getReferences();
		var workLocStore;
		if(bizName === 'Trailer'){
			var grid = me.lookupReference('refTrailerGrid');
			var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
			if(selection == null) return;
			
			if (newValue == 'HTC'){
				var hatchCombo = me.getStore('hatchCombo');
				workLocStore = hatchCombo;
			}else if (newValue == 'WRF'){
				var bulkWharfCombo = me.getStore('bulkWharfCombo');
				workLocStore = bulkWharfCombo;
			}else if (newValue == 'WHO'){
				var warehouseCombo = me.getStore('warehouseCombo');
				workLocStore = warehouseCombo;
			}
			refs.refTRWorkLocCd.bindStore(workLocStore);
			
			if(workLocStore.loadCount <= 0){
				workLocStore.load();
			}
			var workLoc = workLocStore.findRecord('cd', selection.get('workLoc'));
			if(workLoc != null){
				refs.refTRWorkLocCd.setValue(workLoc.get('cd'));
			}
			
		}else if(bizName === 'Mechanical'){
			var grid = me.lookupReference('refMechanicalEqGrid');
			var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
			if(selection == null) return;
			
			if (newValue == 'HTC'){
				var hatchCombo = me.getStore('hatchCombo');
				workLocStore = hatchCombo;
			}else if (newValue == 'WRF'){
				var bulkWharfCombo = me.getStore('bulkWharfCombo');
				workLocStore = bulkWharfCombo;
			}else if (newValue== 'EDJ'){
				var edjCombo = me.getStore('edjCombo');
				workLocStore = edjCombo;
			}else if (newValue == 'NDJ'){
				var ndjCombo = me.getStore('ndjCombo');
				workLocStore = ndjCombo;
			}else {
				var warehouseCombo = me.getStore('warehouseCombo');
				workLocStore = warehouseCombo;
			}
			refs.refMEWorkLocCd.bindStore(workLocStore);
			
			if(workLocStore.loadCount <= 0){
				workLocStore.load();
			}
			var workLoc = workLocStore.findRecord('cd', selection.get('workLoc'));
			if(workLoc != null){
				refs.refMEWorkLocCd.setValue(workLoc.get('cd'));
			}
		}

	},
	
	onUpdateManPower:function(){
		var me = this;
		var store = me.getStore('manPowerList');
		var refs = me.getReferences();
		var grid = me.lookupReference('refManPowerGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if (!selection){
			MessageUtil.alert('Warning', 'vslchecklist_select_update');
			return;
		}

		var theManPower = me.getViewModel().get('theManPower');		
		if(!theManPower.dirty){
			MessageUtil.alert("Nothing has been changed");
			return;
		}

		var bValidation = true;
		Ext.each(selection, function (record) {
			record.data = theManPower.copy().data; //Copty to avoid change direct...
			if(record.data.workingStatus !== WorkingStatus.INSERT){
				record.data.workingStatus =  WorkingStatus.UPDATE;
			}
			bValidation = me.onValidationdDateTime(record);
			// record.data.eqNo = refs.refRoleCd.getValue();
			// record.data.empId = refs.ctlEmpId.getValue();
			// record.data.empNm = refs.refEmpNm.getValue();
			// record.data.workLoc = refs.ctlManPowerWorkingArea.getValue();
			// record.data.workStDt = refs.refManPowerStartTime.getValue();
			// record.data.workEndDt = refs.refManPowerEndTime.getValue();
			// record.data.rmk = refs.refManPowerRemarks.getValue();
			// record.data.workingStatus =  WorkingStatus.UPDATE;
			// record.data.rsNm = refs.refRoleCd.getValue();
			// record.commit();
		});

		if(bValidation){
			store.each(function(record,index){
				record.commit();
			});
		}
	},
	
	onUpdateStevedore:function(){
		var me = this;
		var store = me.getStore('stevedoreList');
		var refs = me.getReferences();
		var grid = me.lookupReference('refStevedoreGrid');	
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if (!selection){
			MessageUtil.alert('Warning', 'vslchecklist_select_update');
			return;
		}

		var theStevedore = me.getViewModel().get('theStevedore');		
		if(!theStevedore.dirty){
			MessageUtil.alert("Nothing has been changed");
			return;
		}
		
		var bValidation = true;
		Ext.each(selection, function (record) {
			record.data = theStevedore.copy().data; //Copty to avoid change direct...
			if(record.data.workingStatus !== WorkingStatus.INSERT){
				record.data.workingStatus =  WorkingStatus.UPDATE;
			}
			bValidation = me.onValidationdDateTime(record);
		});

		if(bValidation){
			store.each(function(record,index){
				record.commit();
			});
		}
	},
	
	onValidationForkLift:function(mode){
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference('refForkliftGrid');
		var selection = grid.getSelection() === null ? null : grid.getSelection();
		var forkliftList = me.getStore('forkliftList');
		
		var duplicate = false;
   		var empDup = false;
		
		for(var i = 0; i < forkliftList.data.length; i++){
			var item = forkliftList.data.items[i];
			empDup = false;
			var bCurrentRecord = false;
			if(selection && selection[0]){
				if(mode === me.MODE_UPDATE && selection[0].get('seq') === item.get('seq')){
					bCurrentRecord = true;
				}
			}

			if(!bCurrentRecord && 
				item.get('empId') === refs.refFLCmbJPB.getValue()){
				empDup = true;
			}
			
			if(empDup){
				var stDt = refs.refForkliftStartTime.getValue();
				var endDt = refs.refForkliftEndTime.getValue();
				var itemStDt = item.get('workStDt');
				var itemEndDt = item.get('workEndDt');
				
				if(refs.refForkliftEndTime.hasDateTime()){
					if(itemStDt.getTime() >= endDt.getTime()
							|| stDt.getTime() >= itemEndDt.getTime()){
						duplicate = false;
					}
					else {
						duplicate = true;
						break;
					}
				}
				else {
					if(stDt.getTime() == itemStDt.getTime()){
						duplicate = true;
						break;
					}
				}
			}
		}
		if(duplicate){
			MessageUtil.alert('warning_msg', 'vslchecklist_portcrane_duplicate');
			return false;
		}
		
		
		if(refs.ctlFLPurpose.getValue() === ''){
			MessageUtil.alert('Warning', 'Please select the Purpose');
			return;
		}		
		if(refs.refFlNo.getValue() === ''){
			MessageUtil.alert('Warning', 'Please select the forklift');
			return;
		}		

		if(refs.refFLWorkingArea.getValue() === ''){
			MessageUtil.alert('Warning', 'Please select the working area');
			return;
		}
		if(refs.refFLCargoType.getValue() === ''){
			MessageUtil.alert('Warning', 'Please select the cargo Type');
			return;
		}
		if(refs.refFLRequestor.getValue() === ''){
			MessageUtil.alert('Warning', 'Please select the requestor');
			return;
		}
		
		if(refs.ctlFLDMode.getValue() === ''){
			MessageUtil.alert('Warning', 'Please select the delivery mode');
			return;
		}
		
		if(refs.ctl_GroupForklift.getValue().contractor ===me.ADP && !refs.refFLCmbJPB.getValue()){
			MessageUtil.alert('Warning', 'Please select the staff of JPB');
			return;
		}else if(refs.ctl_GroupForklift.getValue().contractor ==='contractor' && !refs.refFLContractorCd.getValue()){
			MessageUtil.alert('Warning', 'Please select the contractor');
			return;
		}
		
		return true;
	},
	
	onUpdateForklift:function(){
		var me = this;
		var store = me.getStore('forkliftList');
		var refs = me.getReferences();
		var grid = me.lookupReference('refForkliftGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;

		if(me.onValidationForkLift(me.MODE_UPDATE)){
			selection.data.rsNm = refs.refFlNo.getValue();
			selection.data.hatchDir = refs.refFLApFp.getValue();
			selection.data.capaDescr = refs.refFLCapacityDescr.getValue();
			selection.data.capaCd = refs.refFLCapacity.getValue();
			
			// JPB / Contractor
			if(refs.ctl_GroupForklift.getValue().contractor === me.ADP){
				selection.set("mbsCd", me.ADP);
				selection.set("empId", refs.refFLCmbJPB.getValue());
				selection.set("operator", refs.refFLCmbJPB.getValue());
			}else if(refs.ctl_GroupForklift.getValue().contractor ==='contractor'){
				selection.set("mbsCd", 'CTR');
				selection.set("empId", '');
				selection.set("operator", refs.refFLContractorCd.getValue());
				selection.set("cnrtCd", refs.refFLContractorCd.getValue());
			}else{
				selection.set("mbsCd", null);
				selection.set("empId", '');
			}
			
			if(refs.ctl_FL_RefNo.getValue().rfNo === 'Y'){
				selection.set("refYn", 'Y');
				selection.set('refNo', refs.refFLCmbRefNo.getValue());
			}else{
				selection.set("refYn", 'N');
				selection.set('refNo', refs.refFLTxtRefNo.getValue());
			}				

			selection.data.workLocTp = refs.refFLWorkingArea.getValue();
			selection.data.workLoc = refs.ctlFLWorkingArea.getValue();
			selection.data.cgTpCd = refs.refFLCargoType.getValue();
			selection.data.payer = refs.refFLRequestor.getValue();
			selection.data.delvTpCd = refs.ctlFLDMode.getValue();
			selection.data.setupTime = refs.refForkliftEQArrTime.getValue();
			selection.data.workStDt = refs.refForkliftStartTime.getValue();
			selection.data.workEndDt = refs.refForkliftEndTime.getValue();
			selection.data.rmk = refs.refForkliftRemarks.getValue();
			if(selection.data.workingStatus !== WorkingStatus.INSERT){
				selection.data.workingStatus =  WorkingStatus.UPDATE;
			}
			
			if(me.onValidationdDateTime(selection)){
				selection.commit();
			}
		}
	},
	
	onValidataionMechanicalEq:function(){
		var me = this;
		var refs = me.getReferences();
	
		if(refs.refShift.getValue() === ''){
			MessageUtil.alert('Warning', 'vslchecklist_select_date_shift');
			return;
		}
		
		if(refs.ctlMEPurpose.getValue() === ''){
			 MessageUtil.alert('Warning', 'vsrchecklist_select_purpose_msg');
			 return;
		}
		
		if(refs.ctlMEEquipmentCode.getValue() == null ||  refs.ctlMEEquipmentCode.getValue() == ''){
			MessageUtil.alert('Warning', 'vsrchecklist_EQType_mechanicalEq_msg');
			return;
		}
		
		if(refs.ctl_GroupME.getValue().gr === 'contractor'){
			if(refs.refMEContractorCd.getValue() === ''){
				MessageUtil.alert('Warning', 'vsrchecklist_contractor_mechanicalEq_msg');
				return;
			}
		}
		if(refs.refMECargoType.getValue() === ''){
			MessageUtil.alert('Warning', 'vsrchecklist_cargoType_mechanicalEq_msg');
			return;
		}
		if(refs.refMERequestor.getValue() === ''){
			MessageUtil.alert('Warning', 'vsrchecklist_requestor_mechanicalEq_msg');
			return;
		}
		if(refs.refMEWONo.getValue() === ''){
			MessageUtil.alert('Warning', 'vsrchecklist_woNo_mechanicalEq_msg');
			return;
		}
		
		if(refs.refMechanicalEqEQArrTime.getValue() === null ||  refs.refMechanicalEqEQArrTime.getValue() === ''){
			MessageUtil.alert('Warning', 'vsrchecklist_EQArrTime_mechanicalEq_msg');
			return;
		}
		
		if(refs.refMechanicalEqStartTime.getValue() === null ||  refs.refMechanicalEqStartTime.getValue() === ''){
			MessageUtil.alert('Warning', 'vsrchecklist_startTime_mechanicalEq_msg');
			return;
		}
		
		if(refs.refMechanicalEqEndTime.getValue() === null ||  refs.refMechanicalEqEndTime.getValue() === ''){
			MessageUtil.alert('Warning', 'vsrchecklist_endTime_mechanicalEq_msg');
			return;
		}
		
		if(refs.refMEWorkingArea.getValue() === null ||  refs.refMEWorkingArea.getValue() === ''
			|| refs.refMEWorkLocCd.getValue() === null ||  refs.refMEWorkLocCd.getValue() === ''){
			MessageUtil.alert('Warning', 'vsrchecklist_workingArea_mechanicalEq_msg');
			return;
		}
		
		return true;
	},
	
	onAddMechanicalEq: function() {
		var me = this;
		var refs = me.getReferences();

		if(!me.onValidataionMechanicalEq()){
			return;
		}

		var grid = me.lookupReference('refMechanicalEqGrid');
		var megaGrid = me.lookupReference('refMegaMEGrid');
		var store = me.getStore('mechanicalEqList');
		var record = Ext.create('MOST.model.operation.VSRCheckList'); 
		
		//Clear filter for Grid
		grid.filters.clearFilters();
		grid.filters.disable();
		
		//Clear filter for Store
		store.clearFilter();
		
		var idx = 0;
		if(grid.getSelection() && grid.getSelection().length>0) {
			idx = store.indexOfId(grid.getSelection()[0].get('id'));
		}
	
		record.set("cgTpCd", 'BBK');

		record.set("setupTime", refs.refMechanicalEqEQArrTime.getValue());
		record.set("workStDt", refs.refMechanicalEqStartTime.getValue());
		record.set("workEndDt", refs.refMechanicalEqEndTime.getValue());
		
		record.set("userId", MOST.config.Token.getUserId());
		record.set("vslCallID", refs.refVslCallId.getValue());
		record.set("scn", refs.ctlScn.getValue());
		record.set("workYmd", refs.refWorkYmd.rawValue);
		record.set("shftId", refs.refShift.getValue());
		record.set("purposeNm", refs.ctlMEPurpose.getDisplayValue());
		record.set("purpose", refs.ctlMEPurpose.getValue());
		record.set("divCd", 'ME');
		record.set("mbsCd", 'CTR');
		record.set("userId", MOST.config.Token.getUserId());
		me.mbsCd = 'CTR'
		record.set("workingStatus", WorkingStatus.INSERT);
		record.set("rsNm", refs.ctlMEEquipmentType.getValue());
		
		record.set("capaDescr", refs.ctlMEEquipmentCode.getValue());
		record.set("capaCd", refs.ctlMEEquipmentName.getValue());
		
		record.set("rsQty", refs.ctlMENos.getValue());
		record.set("workOdrNo", refs.refMEWONo.getValue());
		record.set("workLocTp", refs.refMEWorkingArea.getValue());
		record.set("workLoc", refs.refMEWorkLocCd.getValue());
		record.set("cnrtCd", refs.refMEContractorCd.getValue());
		record.set("cgTpCd", refs.refMECargoType.getValue());
		record.set("payer", refs.refMERequestor.getValue());
		record.set("rmk", refs.refMERemarks.getValue());
		
		if(refs.ctl_ME_RefNo.getValue().rfNo === 'Y'){
			record.set("refYn", 'Y');
			record.set('refNo', refs.refMECmbRefNo.getValue());
		}else{
			record.set("refYn", 'N');
			record.set('refNo', refs.refMETxtRefNo.getValue());
		}
		
	    if(record.data.cnrtCd != ''){
			record.set("shpCrew", 'N');
		}else{
			record.set("shpCrew", 'Y');
		}
	    
		var insert = true;
		store.queryBy(function(rec, id){
			if(rec.get('rsNm') == record.get('rsNm') && rec.get('capaDescr') == record.get('capaDescr')
					&& rec.get('rsQty') == record.get('rsQty') && rec.get('workOdrNo') == record.get('workOdrNo')
					&& rec.get('workLocTp') == record.get('workLocTp') && rec.get('workLoc') == record.get('workLoc')
					&& rec.get('cnrtCd') == record.get('cnrtCd') && rec.get('cgTpCd') == record.get('cgTpCd')
					&& rec.get('payer') == record.get('payer')){
				insert = false;
				MessageUtil.alert('Warning', "vsrchecklist_duplicate_add_ME_msg");
				return;
			}
		})
		if(insert && me.onValidationdDateTime(record)){
			store.insert(idx, record);
			record.commit();
		}
		
		grid.getSelectionModel().select(record);
	},	
	
	onUpdateMechanicalEq:function(){
		var me = this;
		var store = me.getStore('mechanicalEqList');
		var refs = me.getReferences();
		var grid = me.lookupReference('refMechanicalEqGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		
		var bValidation = true; 
		if(me.onValidataionMechanicalEq()){
			Ext.each(selection, function (record) {
				record.data.rsNm = refs.ctlMEEquipmentType.getValue();
				record.data.capaDescr = refs.ctlMEEquipmentCode.getValue();
				record.data.capaCd = refs.ctlMEEquipmentName.getValue();
				record.data.rsQty = refs.ctlMENos.getValue();
				record.data.workOdrNo = refs.refMEWONo.getValue();
				record.data.workLocTp = refs.refMEWorkingArea.getValue();
				record.data.workLoc = refs.refMEWorkLocCd.getValue();
				
				if(refs.ctl_GroupME.getValue().gr === 'contractor'){
					record.data.cnrtCd = refs.refMEContractorCd.getValue();
					record.data.shpCrew = 'N';
				}else{
					record.data.cnrtCd = '';
					record.data.shpCrew = 'Y';
				}
				
				if(refs.ctl_ME_RefNo.getValue().rfNo === 'Y'){
					record.set("refYn", 'Y');
					record.set('refNo', refs.refMECmbRefNo.getValue());
				}else{
					record.set("refYn", 'N');
					record.set('refNo', refs.refMETxtRefNo.getValue());
				}				
				
				record.data.cgTpCd = refs.refMECargoType.getValue();
				record.data.payer = refs.refMERequestor.getValue();
				record.data.setupTime = refs.refMechanicalEqEQArrTime.getValue();
				record.data.workStDt = refs.refMechanicalEqStartTime.getValue();
				record.data.workEndDt = refs.refMechanicalEqEndTime.getValue();
				record.data.rmk = refs.refMERemarks.getValue();
				if(record.data.workingStatus !== WorkingStatus.INSERT){
					record.data.workingStatus =  WorkingStatus.UPDATE;
				}
				
				bValidation = me.onValidationdDateTime(record);
			});
	
			if(bValidation){
				store.each(function(record,index){
					record.commit();
				});
			}
		}
	},

	onClearManPower: function(){
		var me = this;
		var refs = me.getReferences();
		me.onRefreshManPower();
		refs.refsAddManPower.setDisabled(false);
	},

	onClearStevedore: function(){
		var me = this;
		var refs = me.getReferences();
		me.onRefreshStevedore();
		refs.refsAddStevedore.setDisabled(false);
	},
	
	onRefreshAllVSRTab: function(){
		var me = this;
		me.onRefreshManPower();
		me.onRefreshStevedore();
		me.onRefreshForklift();
		me.onRefreshTrailer();
		me.onRefreshMechanicalEq();
		me.onRefreshPortCrane();
	},

	onRefreshManPower:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MANPOWER_GRID_REF_NAME);
		var manPowerStore = me.getStore('manPowerList');

		var selection = grid.getSelection();
		manPowerStore.remove(selection);

		theModel = Ext.create('MOST.model.operation.VSRCheckList');
		grid.setSelection(false);
		if(refs.refWorkYmd.getValue()){
			var workingYmd = Ext.Date.format(refs.refWorkYmd.getValue(), MOST.config.Locale.getShortDate());
			theModel.set('workStDt',me.setToTimeByShift());
			theModel.set('workEndDt',me.setFmTimeByShift());
		}
		me.getViewModel().setData({theManPower: theModel});
	},

	onRefreshStevedore:function(){
		var me = this;
		var refs = me.getReferences();
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.STEVEDORE_GRID_REF_NAME);

		theModel = Ext.create('MOST.model.operation.VSRCheckList');
		grid.setSelection(false);
		if(refs.refWorkYmd.getValue()){
			var workingYmd = Ext.Date.format(refs.refWorkYmd.getValue(), MOST.config.Locale.getShortDate());
			theModel.set('workStDt',me.setToTimeByShift());
			theModel.set('workEndDt',me.setFmTimeByShift());
		}
		me.getViewModel().setData({theStevedore: theModel});
	},
	
	onRefreshPortCrane:function(){
		var me = this;
		var refs = me.getReferences();
		refs.ctlPCPurpose.setValue('');
		refs.refPCShipCrane.setValue('');
		refs.refPCEqNo.setValue('');
		refs.refPCCapaCd.setValue('');
		refs.refPCCapaDesc.setValue('');
		refs.ctlPCContractor.setValue(false);
		refs.ctlPCJPB.setValue(false);
		refs.ctlPortCrane.setValue(false);
		refs.ctlShipCrane.setValue(false);
		refs.refPCContractorCd.setValue('');
		refs.refPCCmbJPB.setValue('');
		refs.refPCRequestor.setValue('');
		refs.refPCRemarks.setValue('');
	},

	onRefreshForklift:function(){
		var me = this;
		var refs = me.getReferences();
		refs.refFlNo.setValue('');
		refs.refFLCapacity.setValue('');
		refs.refFLWorkingArea.setValue('');
		refs.ctlFLWorkingArea.setValue('');
		refs.refFLRequestor.setValue('');
		refs.ctlFLDMode.setValue('');
		refs.refFLCmbJPB.setValue('');
		refs.ctlFLContractor.setValue(false);
		refs.ctlFLJPB.setValue(false);
		refs.ctlNoDriver.setValue(true);
		refs.ctlFLPurpose.setValue('');
		refs.refFLApFp.setHidden(true);
		refs.refFLContractorCd.setValue('');
		refs.refForkliftRemarks.setValue('');
		refs.ctlFLTxtRef.setValue(true);
		refs.refFLCmbRefNo.setValue('');
		refs.refFLTxtRefNo.setValue(me.setDefaultRefNo());
	},
	
	onRefreshTrailer:function(){
		var me = this;
		var refs = me.getReferences();
		refs.ctlTREquipmentCode.setValue('');
		refs.refTRWorkingArea.setValue('');
		refs.refTRWorkLocCd.setValue('');
		refs.ctlTRNos.setValue('');
		refs.refTRContractorCd.setValue('');
		refs.refTRRemarks.setValue('');
		refs.refTRRequestor.setValue('');
		refs.ctlTRPurpose.setValue('');
		refs.ctlTRDMode.setValue('');
		refs.refTRApFp.setHidden(true);
		refs.ctlTREquipmentCodeDesc.setValue('');
		refs.ctlTRTxtRef.setValue(true);
		refs.refTRCmbRefNo.setValue('');
		refs.refTRTxtRefNo.setValue(me.setDefaultRefNo());
	},
	
	onRefreshMechanicalEq:function(){
		var me = this;
		var refs = me.getReferences();
		refs.ctlMEEquipmentCode.setValue('');
		refs.ctlMENos.setValue('');
		refs.refMEWONo.setValue('');
		refs.refMEWorkingArea.setValue('');
		refs.refMEWorkLocCd.setValue('');
		refs.refMEContractorCd.setValue('');
		refs.ctlMEPurpose.setValue('');
		refs.refMERequestor.setValue('');
		refs.refMERemarks.setValue('');
		refs.ctlMETxtRef.setValue(true);
		refs.refMECmbRefNo.setValue('');
		refs.refMETxtRefNo.setValue(me.setDefaultRefNo());
	},
	
	onChangeGroupME:function(){
		var me = this;
		var refs = me.getReferences();
		
		if(refs.ctl_GroupME.getValue().gr === 'shipCrew'){
			refs.refMEContractorCd.setValue('');
			refs.refMEContractorCd.setDisabled(true);
		}else{
			refs.refMEContractorCd.setDisabled(false);
		}
	},
	
	/**
	 * EVENT POPUP HANDLER START
	 * =========================================================================================================================
	 */
	recvJPBStaffHHT: null,
	// Search Event Handler
	onPopupHHTLoad : function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore('empPopupHHTList');
     	me.recvJPBStaffHHT = me.getView().recvData;
     	var roleCombo = me.getStore('roleCombo');
		if(roleCombo.loadCount <= 0){
			roleCombo.load({
				params: {
					vslCallId: refs.refVslCallId.getValue(),
					workYmd: Ext.Date.format(refs.refWorkYmd.rawValue, 'Ymd'),
					shftId: refs.refShift.getValue()
				},
				callback: function(records, operation, success) {
					if (success) {
						refs.refcomboRoleCode.setValue(me.recvJPBStaffHHT.roleCd);
					}
				}
			});
		}
	},
	onPopUPHHTSearch: function() {
		var me = this;
     	var refs = me.getReferences();
     	var recvDataHHT = me.getView().recvData
    	var store = me.getStore('empPopupHHTList');
		store.load({
			params:{
				roleCd: refs.refcomboRoleCode.getValue(),
				shftId: me.recvJPBStaffHHT.shftId,
				workYmd: me.recvJPBStaffHHT.workYmd,
				vslCallID: me.recvJPBStaffHHT.vslCallID,
			},
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
	},
	
	onChangeUpperCase: function(field, newValue){
		field.setValue(newValue.toUpperCase());
	},
	
	// Grid Row Double
	onHHTDblClick: function() {
		var me = this; 
		var window = me.getView().up('window');
		
    	window.returnValue = me.getContractorReturnData();
       	window.close();
	},
	
	// Returns the popup result.
	getContractorReturnData:function(){
		var me = this;
		var selection;
		var grid = me.lookupReference('refContractorPopupHHTGrid');
		selection = grid.getSelection() == null ? null : grid.getSelection();
		var returnItem = {
			code : selection.data.empId,
			codeName : selection.data.empNm,
			item : selection
		}
		
		return returnItem;
	},
	
	exportTo: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
    	
        var cfg = Ext.merge({
            title: 'VSR Check List',
            fileName: 'VSRCheckList' + '.' + (btn.cfg.ext || btn.cfg.type)
        }, btn.cfg);

        var grid = refs.refVSRCheckListGrid;
        grid.saveDocumentAs(cfg);
    },
	
	/**
	 * EVENT POPUP HANDLER END
	 * =========================================================================================================================
	 */
});