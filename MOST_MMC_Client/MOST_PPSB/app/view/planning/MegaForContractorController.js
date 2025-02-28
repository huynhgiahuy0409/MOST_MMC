Ext.define('MOST.view.planning.MegaForContractorController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.megaforcontractor',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 * 
	 */
	DETAIL_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/mega/detail',
	MAX_PERIOD_DAY : 31,

	
	alertYN : 'N',
	alertTp: '',
	rptTp: '',
	nofGang: 0,
	nofWchmn:0,
	nofStvdSprr:0,
	nofStvdGwker:0,
	nofHatch: 0,
	nofSglmn: 0,
	nofDekmn: 0,
	nofHopmn: 0,
	nofTrmgGwker: 0,
	nofStvdGwker: 0,
	
	USER_TYPE_EXTERNAL : 'E',
	USER_TYPE_INTERNAL : 'I',
//	SHIPPING_AGENCY : CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY,
//	FORWARDER : CONSTANTS.PTNR_TYPE_FORWARDER,
	// modified for issue 56267
//	STAT_REQUEST_CANCELED : 'RC',	
//	APPROVAL_REQUEST_CANCELED : 5,
//	deployedYN: '',
	
//	EQUIPMENT_CREATE_UPDATE_FIELD_CONFIG : {
//		'Gears': {
//			'capaCd': 'cboCapacityGears',
//			'locId':'ctlWorkingAreaGears',
//			'confmQty':'confQtyFieldGears',
//			'reqQty':'reqQtyFieldGears',
//			'dspReqhhmm':'reqTimeHrGears,reqTimeMinGears'								
//		},
//		'Forklift': {
//			'capaCd' : 'cboCapacityForklift',			
//			'locId':  'ctlWorkingAreaForklift',
//			'confmQty': 'confQtyFieldForklift',
//			'reqQty': 'reqQtyFieldForklift',
//			'flStatus': 'cboForkliftDriver',
//			'dspReqhhmm':'reqTimeHrForklift,reqTimeMinForklift'
//		},
//		'Trailer': {
//			'capaCd': 'cboCapacityTrailer',
//			'locId':'ctlWorkingAreaTrailer',
//			'confmQty':'confQtyFieldTrailer',
//			'reqQty':'reqQtyFieldTrailer',
//			'dspReqhhmm':'reqTimeHrTrailer,reqTimeMinTrailer'								
//		},
//		'Mechanical': {
//			'eqDivCd': 'cboEqTypeMechanical',
//			'capaCd': 'cboCapacityMechanical',
//			'locId':'ctlWorkingAreaMechanical',
//			'confmQty':'confQtyFieldMechanical',
//			'reqQty':'reqQtyFieldMechanical',
//			'dspReqhhmm':'reqTimeHrMechanical,reqTimeMinMechanical'								
//		},
//		'PortCrane':{
//			'eqDivCd': 'cboEqTypePortCrane',
//			'capaCd': 'cboCapacityPortCrane',
//			'confmQty':'confQtyFieldPortCrane',
//			'reqQty':'reqQtyFieldPortCrane',
//			'dspReqhhmm':'reqTimeHrPortCrane,reqTimeMinPortCrane'	
//		}
//	},
//	
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
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var masterCombo = me.getStore('megaRequisitionCombo');
		var deploymentCombo = me.getStore('megaRequisitionDeploymentCombo');
		
		me.USER_TYPE = MOST.config.Token.getUserType();
		
		deploymentCombo.load();
		masterCombo.load({
			params : {
				searchType : 'megacombolist',
				subSearchType: 'searchcombolist',
				shftMethCd : 'Standard'
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						me.setCombo(records[0]);
					}
				}
			}
		});
		
		me.setDateInDays('ctlFromDt');
		
		var recvData = me.getView().recvData;
		
		if(recvData != null){
			refs.ctlFromDt.setValue('');
			refs.ctlToDt.setValue('');
			me.alertTp = recvData.alertTp;
			me.alertYN = 'Y';
	     	me.onSearch();
		}
	},
	
	// Combo Setting
	setCombo : function(masterItem){
		var me = this;
		var refs = me.getReferences();	
		var shiftCombo = me.getStore('megaRequisitionShiftCombo');
		var purposeCombo = me.getStore('megaRequisitionPurposeCombo');
		var megaStatusCombo = me.getStore('megaRequisitionMegaStatusCombo');

		shiftCombo.setData(masterItem.data.shiftList);
		shiftCombo.insert(0, [{shftNm: 'Select',shftId: ''}]);
		refs.ctlShiftCombo.setValue('');	
		
		purposeCombo.setData(masterItem.data.purposeList);
		purposeCombo.insert(0, [{scdNm: 'Select',scd: ''}]);
		refs.ctlPurposeCombo.setValue('');
		
		megaStatusCombo.setData(masterItem.data.megaStatusList);
		megaStatusCombo.insert(0, [{scdNm: 'Select',scd: ''}]);
		refs.ctlMegaStatusCombo.setValue('');
		
	},
	
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onSearchBtn: function() {
		var me = this;
     	me.alertYN = 'N';
     	me.onSearch();
	},
	
	// Search Event Handler
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore('megaContractor');
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if(records.length === 0){
						MessageUtil.info('info_msg','select_applyDate_msg');
					}
				}
			}
		});
	},
	
	// Refresh
	onRefresh : function(controlName){
		var me = this;
		me.refreshControl(controlName);
	},
	
	onMegaGridClick:function(gridview, tdEl, cellIndex, record, trEl, rowIndex, e){
		var me = this;
		var refs = me.getReferences();

		me.nofGang = 0;
		me.nofStvdSprr = 0;
		me.nofWchmn = 0;
		me.nofStvdGwker = 0;
		
		me.nofHatch = 0;
		me.nofSglmn = 0;
		me.nofDekmn = 0;
		me.nofHopmn = 0;
		me.nofTrmgGwker = 0;
		me.nofTrmgSprr = 0;
		
		me.nofGang = parseFloat(record.get('nofGang'));
		me.nofWchmn = parseFloat(record.get('nofWchmn'));
		me.nofStvdSprr = parseFloat(record.get('nofStvdSprr'));
		me.nofStvdGwker = parseFloat(record.get('nofStvdGwker'));
		
		me.nofHatch = parseFloat(record.get('nofHatch'));
		me.nofSglmn = parseFloat(record.get('nofSglmn'));
		me.nofDekmn = parseFloat(record.get('nofDekmn'));
		me.nofHopmn = parseFloat(record.get('nofHopmn'));
		me.nofTrmgGwker = parseFloat(record.get('nofTrmgGwker'));
		me.nofTrmgSprr = parseFloat(record.get('nofTrmgSprr'));
		
	
		refs.ctlNosofGang.setValue(me.nofGang.toFixed(0));
		refs.ctlBBSupervisor.setValue(me.nofStvdSprr.toFixed(0));
		refs.ctlWinchMen.setValue(me.nofWchmn.toFixed(0));
		refs.ctlBBGeneralWorkers.setValue(me.nofStvdGwker.toFixed(0));
		
		refs.ctlNosofHatch.setValue(me.nofHatch.toFixed(0));
		refs.ctlDBSupervisor.setValue(me.nofTrmgSprr.toFixed(0));
		refs.ctlSignalMen.setValue(me.nofSglmn.toFixed(0));
		refs.ctlDeckMen.setValue(me.nofDekmn.toFixed(0));
		refs.ctlHoperMen.setValue(me.nofHopmn.toFixed(0));
		refs.ctlDBGeneralWorkers.setValue(me.nofTrmgSprr.toFixed(0));
		
	},
	
	
	// Text Upper Case
	onUpperCase : function(control){
		control.setValue(control.getValue().toUpperCase());
	},
	
	// JPVC OPEN POPUP
	openJpvcPopup:function(){
		var me = this;
		me.openCodePopup('popup-vesselfindpopup', 'ctlJpvc');
	},
	
	// S/A OPEN POPUP
	openSaPopup:function(){
		var me = this;
		me.openCodePopup('popup-payercdtypepopup', 'ctlSa');
	},
	
	// Commodity POPUP
	openCommodityPopup:function(){
		var me = this;
		var params = {
			searchType : 'CMDT'
		};
		me.openCodePopup('popup-cmmcdpopup', 'ctlDetailCommodity', params);
	},
	
	// Requester POPUP
	openRequesterPopup:function(){
		var me = this;
		me.openCodePopup('popup-usertypepopup', 'ctlDetailRequester');
	},
	
	// Date Change Event
	onDateChange:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		
		if(newValue != null && newValue != ''){
			refs.ctlServiceDate.setValue('');
		}
		
		var toDate = refs.ctlToDt.getValue();
		var fromDate = refs.ctlFromDt.getValue();
        
        var Difference_In_Time = null; 
        var Difference_In_Days = null; 
		
		if(control == refs.ctlFromDt){
			me.setDateInDaysByDate('ctlToDt', me.MAX_PERIOD_DAY, control.getValue());
		} else {
			if(fromDate){
				Difference_In_Time = control.getValue().getTime() - fromDate.getTime();
	    	    Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
	    	    if (Difference_In_Days > me.MAX_PERIOD_DAY){
	    	    	me.setDateInDaysByDate('ctlFromDt', -me.MAX_PERIOD_DAY, control.getValue());
	    	    } else if (Difference_In_Days < 0){
	    	    	refs.ctlToDt.setValue(fromDate);
	    	    }
			}			
		}
	},
	
	// Grid combo Renderer
	onGridComboRenderer: function(val, cell){
		var me = this;
        var refs = me.getReferences();
		
		var codeComboStore = null;
		var displayFieldName = 'scdNm';
		var codeFieldName = 'scd';
		
		if(cell.column.dataIndex === 'eqDivCd'){ 		// Mecanical Tab
														// Equipment Type
			codeComboStore = me.getViewModel().getStore('megaDetailEqTypeCombo');
		} else if(cell.column.dataIndex === 'capaCd'){	// Mecanical Tab
														// Capacity
			codeComboStore = me.getViewModel().getStore('megaDetailCapacityCombo');
			displayFieldName = 'capaDescr';
			codeFieldName = 'capaCd';
			
			if(codeComboStore.getData().length == 0)
			{
				return cell.record.get('capaDescr'); 
			}
		} else if(cell.column.dataIndex === 'capaCd'){	// Mecanical Tab Working
														// area
			codeComboStore = me.getViewModel().getStore('megaDetaiWorkingAreaCombo');
			displayFieldName = 'cdNm';
			codeFieldName = 'cd';
		} else if (cell.column.dataIndex === 'shftId'){	// Shift Name
			codeComboStore = me.getViewModel().getStore('megaRequisitionShiftCombo');
			displayFieldName = 'shftNm';
			codeFieldName = 'shftId';
		}

		if(codeComboStore != null){
			var indx = codeComboStore.find(codeFieldName, val);

			if (indx != -1){
				return codeComboStore.getAt(indx).get(displayFieldName); 
			}
		}
		
		return '';
	},
	onShiftChange: function(){
		var me = this;
        var refs = me.getReferences();
        var shifrId = refs.ctlDetailMegaShift.getValue();
        var Hh = '';
        var hhstring;
        var stevedore = me.getViewModel().get('theStevedore');
        var tally = me.getViewModel().get('theTally');
        var lashing = me.getViewModel().get('theLashing');
        var trim = me.getViewModel().get('theTrimming');
        var trim = me.getViewModel().get('theTrimming');
        var crew = me.getViewModel().get('theCrew');
        
        if(shifrId== "SF0014"){
        	me.TIME_FOR_SHIFT = "07:00";
        	Hh = 7;
        	hhstring = '0700';
		}else if (shifrId == "SF0012"){
			me.TIME_FOR_SHIFT = "15:00";
			Hh = 15;
			hhstring = '1500';
		}else if (shifrId == "SF0013"){
			me.TIME_FOR_SHIFT = "23:00";
			Hh = 23;
			hhstring = '2300';
		}
        // Update by Harry      
        if(refs.ctlDetailMegaNo.getValue() != ""){       	
        	refs.ctlStvReqHh.setValue(stevedore.data.reqTime);
            refs.ctlTallyRegHh.setValue(tally.data.reqTime);
            refs.ctlLshRegHh.setValue(lashing.data.reqTime);
            refs.ctlVesselOperationRegHh.setValue(crew.data.reqTime);
    		refs.ctlTrimReqHh.setValue(trim.data.reqTime);
        }else{
        	refs.ctlStvReqHh.setValue(Hh);
            refs.ctlTallyRegHh.setValue(Hh);
            refs.ctlLshRegHh.setValue(Hh);
            refs.ctlVesselOperationRegHh.setValue(Hh);
    		refs.ctlTrimReqHh.setValue(Hh);
        }
             
		me.initDefaultReqTime();
		
		// var gears = me.getStore('megaDetailGears');
		// var forklift = me.getStore('megaDetailForklift');
		// var trailer = me.getStore('megaDetailTrailer');
		// var mechanical = me.getStore('megaDetailMechanical');
		// var portCrane = me.getStore('megaDetailPortCrane');
		/*if(shifrId){
			me.updateReqestTime(gears, hhstring);
			me.updateReqestTime(forklift, hhstring);
			me.updateReqestTime(trailer, hhstring);
			me.updateReqestTime(mechanical, hhstring);
			me.updateReqestTime(portCrane, hhstring);
		}*/
	},
	
	updateReqestTime:function(store, reqTime){
		for(var i = 0; i < store.data.length; i++){
			var record = store.data.items[i];
			record.set('dspReqhhmm',reqTime);
		}
	},
	
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Search Condition
	getSearchCondition:function(){
		var me = this;
     	var refs = me.getReferences();
     	var dateCondition = '';
     	var serviceDate = me.checkDate('ctlServiceDate');
     	var jpvcNo = refs.ctlJpvc.getValue();
     	var shift = refs.ctlShiftCombo.getValue();
     	var deployment = refs.ctlDeploymentCombo.getValue();
     	var purpose = refs.ctlPurposeCombo.getValue();
     	var megaStatus = refs.ctlMegaStatusCombo.getValue();
     	var commodity = refs.ctlCommodity.getValue();
     	var opeCompCd =refs.refCboContractorForklift.getValue();
     	var sa = refs.ctlSa.getValue();
		var scn = refs.ctlScn.getValue();
     	var ptnrType = '';
     	var userRole = null;
     	var alertYn = '';
     	var isMPTSBBBilling = MOST.config.Token.getIsMPTSBreakBulkBilling();
     	if(me.alertYN == 'N'){
     		if(jpvcNo == ""){
        		if(refs.ctlFromDt.getValue() == null || refs.ctlFromDt.getValue() == "" || refs.ctlToDt.getValue() == null || refs.ctlToDt.getValue() == "" ){
        			refs.ctlFromDt.reset();
        			// me.setDateInDays('ctlFromDt');
        		}
        		if((refs.ctlFromDt.getValue() == null || refs.ctlFromDt.getValue() == "") && (refs.ctlToDt.getValue() == null || refs.ctlToDt.getValue() == "") && serviceDate.dateString == '' && megaNo == ''){
        			MessageUtil.warning('Warning', 'megarequisition_jpvc_eta_mandatory_msg');
            		return null;
        		}
        		// dateCondition = me.checkPeriodDate('ctlFromDt', 'ctlToDt',
				// me.MAX_PERIOD_DAY, true);
        	}else{
        		refs.ctlFromDt.reset();
        		refs.ctlToDt.reset();
        	}
     	}else{
     		alertYn = 'Y';
     	}
     	
    	// msg : Please input at least 4 characters for Mega No.
//    	if(!StringUtil.isNullorEmpty(megaNo) && megaNo.length < 4){
//    		refs.ctlMegaNo.focus();
//    		MessageUtil.warning('Warning', 'megarequisition_megano_least_msg');
//    		return null;
//    	}
//    	
//    	if(!StringUtil.isNullorEmpty(megaNo)){
//    		refs.ctlFromDt.reset();
//    		refs.ctlToDt.reset();
//    	}
     	
     	if(refs.ctlFromDt.getValue() != null && refs.ctlToDt.getValue() != null){
            dateCondition = me.checkPeriodDate("ctlFromDt", "ctlToDt", me.MAX_DATE_ALLOW, true);
            workStDt = dateCondition.fromDtString;
            workEndDt = dateCondition.toDtString;
        }
    	
    	if(serviceDate.dateString != '' && serviceDate.dateString != null){
    		dateCondition.fromDtString = '';
    		dateCondition.toDtString = '';
    	}
    	
    	// msg : You should select either JPVC or ETA.
    	/*
		 * if(StringUtil.isNullorEmpty(jpvcNo) &&
		 * StringUtil.isNullorEmpty(dateCondition.fromDtString)){
		 * MessageUtil.warning('Warning',
		 * 'megarequisition_jpvc_eta_mandatory_msg'); return null; }
		 */
    	// setUserAuthority
    	if( MOST.config.Token.getUserType() === me.USER_TYPE_INTERNAL){
    		userRole = 'BS';
    	}
    	
    	if( MOST.config.Token.getUserType() == me.USER_TYPE_EXTERNAL){
    		opeCompCd = MOST.config.Token.getPtnrCode();
        }
    	
    	if(me.existsPatnerType(me.SHIPPING_AGENCY)){
    		ptnrType = me.SHIPPING_AGENCY;
    	} else if (me.existsPatnerType(me.FORWARDER)){
    		ptnrType = me.FORWARDER;
    	}
    	
    	var params = {
    		ptnrType : ptnrType,
    		searchType : 'megalist',
    		shftMethCd : 'Standard',
    		depyYn : 'N',
    		alertYn : 'N',
    		userRole : userRole,
    		vslCallId : jpvcNo,
    		purpTpCd : purpose,
    		cmdt : commodity,
    		etw : serviceDate.dateString,
    		saId : sa,
    		shftId : shift,
    		depyYn : deployment,
    		statCd : megaStatus,
    		rptTp: '',
    		exportTp:'',
    		userId: MOST.config.Token.getUserId(),
    		alertYn: alertYn,
     		alertTp: me.alertTp,
     		opeCompCd:opeCompCd,
     		isMPTSBBBilling:isMPTSBBBilling,
			scn: scn
     		
    	};
    	
    	if(dateCondition != null){
    		params['etaFrom'] = dateCondition.fromDtString;
    		params['etaTo'] = dateCondition.toDtString;
    	}
    	
    	return params;
	},
	
//	getDetailSearchCondition:function(){
//		var me = this;
//     	var refs = me.getReferences();
//     	var dateCondition = '';
//     	var serviceDate = me.checkDate('ctlServiceDate');
//     	var jpvcNo = refs.ctlDetailJpvc.getValue();
//     	var shift = refs.ctlShiftCombo.getValue();
//     	var deployment = refs.ctlDeploymentCombo.getValue();
//     	var purpose = refs.ctlPurposeCombo.getValue();
//     	var megaStatus = refs.ctlMegaStatusCombo.getValue();
//     	var megaNo = refs.ctlMegaNo.getValue();
//     	var commodity = refs.ctlCommodity.getValue();
//     	var sa = refs.ctlSa.getValue();
//     	var ptnrType = '';
//     	var userRole = null;
//     	var alertYn = '';
//     	
//     	if(me.alertYN == 'N'){
//     		if(jpvcNo == ""){
//        		if(refs.ctlFromDt.getValue() == null || refs.ctlFromDt.getValue() == "" || refs.ctlToDt.getValue() == null || refs.ctlToDt.getValue() == "" ){
//        			refs.ctlFromDt.reset();
//        			//me.setDateInDays('ctlFromDt');
//        		}
//        		if((refs.ctlFromDt.getValue() == null || refs.ctlFromDt.getValue() == "") && (refs.ctlToDt.getValue() == null || refs.ctlToDt.getValue() == "") ){
//        			MessageUtil.warning('Warning', 'megarequisition_jpvc_eta_mandatory_msg');
//            		return null;
//        		}
//        		//dateCondition = me.checkPeriodDate('ctlFromDt', 'ctlToDt', me.MAX_PERIOD_DAY, true);
//        	}else{
//        		refs.ctlFromDt.reset();
//        		refs.ctlToDt.reset();
//        	}
//     	}else{
//     		alertYn = 'Y';
//     	}
//     	
//     	
//     	if(refs.ctlFromDt.getValue() != null && refs.ctlToDt.getValue() != null){
//            dateCondition = me.checkPeriodDate("ctlFromDt", "ctlToDt", me.MAX_DATE_ALLOW, true);
//            workStDt = dateCondition.fromDtString;
//            workEndDt = dateCondition.toDtString;
//        }
//    	
//    	// msg : Please input at least 4 characters for Mega No.
//    	if(!StringUtil.isNullorEmpty(megaNo) && megaNo.length < 4){
//    		refs.ctlMegaNo.focus();
//    		MessageUtil.warning('Warning', 'megarequisition_megano_least_msg');
//    		return null;
//    	}
//    	
//    	
//    	if(serviceDate.dateString != '' && serviceDate.dateString != null){
//    		dateCondition.fromDtString = '';
//    		dateCondition.toDtString = '';
//    	}
//    	
//    	// msg : You should select either JPVC or ETA.
//    	/*if(StringUtil.isNullorEmpty(jpvcNo) && StringUtil.isNullorEmpty(dateCondition.fromDtString)){
//    		MessageUtil.warning('Warning', 'megarequisition_jpvc_eta_mandatory_msg');
//    		return null;
//    	}*/
//    	// setUserAuthority
//    	if( MOST.config.Token.getUserType() === me.USER_TYPE_INTERNAL){
//    		userRole = 'BS';
//    	}
//    	
//    	if(me.existsPatnerType(me.SHIPPING_AGENCY)){
//    		ptnrType = me.SHIPPING_AGENCY;
//    	} else if (me.existsPatnerType(me.FORWARDER)){
//    		ptnrType = me.FORWARDER;
//    	}
//    	
//    	var params = {
//    		ptnrType : ptnrType,
//    		searchType : 'megalist',
//    		shftMethCd : 'Standard',
//    		depyYn : 'N',
//    		alertYn : 'N',
//    		userRole : userRole,
//    		vslCallId : jpvcNo,
//    		purpTpCd : purpose,
//    		cmdt : commodity,
//    		etw : serviceDate.dateString,
//    		saId : sa,
//    		shftId : shift,
//    		depyYn : deployment,
//    		statCd : megaStatus,
//    		megaNo : megaNo,
//    		rptTp: '',
//    		exportTp:'',
//    		userId: MOST.config.Token.getUserId(),
//    		alertYn: alertYn,
//     		alertTp: me.alertTp
//    	};
//    	
//    	if(dateCondition != null){
//    		params['etaFrom'] = dateCondition.fromDtString;
//    		params['etaTo'] = dateCondition.toDtString;
//    	}
//    	
//    	return params;
//	},
//	
//	/**
//	 * GENERAL METHOD END
//	 * =========================================================================================================================
//	 */
//	
//	/**
//	 * =========================================================================================================================
//	 * DETAIL START
//	 */
//	// Detail Load
//	onDetailLoad:function(){
//		var me = this;
//		var detailView = me.getDetailBizView();
//		var infoForm = detailView.down('form').getForm();
//		infoForm.isValid(); // Mandatory to appear red for.
//		
//		var mainItem = new Ext.create('MOST.model.planning.Mega');
//		me.getViewModel().setData({theMain:mainItem});
//		
//		me.setDetailInitialize();
//	},
//	
//	// Detail Initialize
//	setDetailInitialize:function(){
//		var me = this;
//		var refs = me.getReferences();
//		var detailView = me.getDetailBizView();
//		var recvData = detailView.items.get(0).recvData;
//		var megaCombo = me.getStore('megaRequisitionCombo');
//		var subSearchType;
//		
//		me.CURRENT_VIEW_TYPE = recvData.get('viewType');
//
//		recvData.commit(); // Close Check(dirty)
//		
//		if(me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_CREATE){
//			subSearchType = 'tabInitialCreate'
//		} else {
//			subSearchType = 'tabInitialUpdate'
//		}
//		
//		// modified for issue 56267
//		me.deployedYN = recvData.data.deployedYN;
//		
//		megaCombo.load({
//			params: {
//				shftMethCd : 'Standard',
//				searchType : 'megacombolist',
//				subSearchType : subSearchType,
//				purpTpCd : recvData.data.purpTpCd,
//				vslCallId : recvData.data.vslCallId,
//				megaNo: recvData.data.megaNo
//			},
//			callback: function(records, operation, success) {
//				if (success) {
//					if (records.length > 0) {
//						me.setComboStore(records[0].data);
//						me.setDetailTabControl(records[0].data, recvData);
//					}
//				}
//			}
//		});
//		
//		refs.ctlCargoDetailPackage.setDisabled(true);
//		refs.ctlCargoDetailCmdtCode.setDisabled(true);
//		refs.refCargoDetailMT.setDisabled(true);
//	},
//	
//	// Popup After Setting
//	afterSetCodePopupData:function(xtype, targetControl, returnValue){
//		var me = this;
//		var refs = me.getReferences();
//		
//		if(targetControl === 'ctlDetailJpvc'){ // MEGA DETAIL JPVC
//			var detailItem = me.getViewModel().get('theMain');
//			detailItem.set('shipgNoteNo', null);
//			detailItem.set('dono', null);
//
//			if(returnValue){
//				detailItem.set('vslCallId', returnValue.code);
//				me.getViewModel().setData({theVsl:returnValue.item});
//				//me.searchWarehouse();
//				me.setDetailInitializePopupData();
//			} else {
//				me.getViewModel().setData({theVsl:null});
//				me.searchWarehouse(true);
//			}
//		}
//		if(targetControl === 'ctlJpvc' && refs.ctlJpvc.getValue() != ""){
//			refs.ctlFromDt.setValue('');
//			refs.ctlToDt.setValue('');
//		}
//	},
//	
//	setDetailInitializePopupData:function(){
//		var me = this;
//		var refs = me.getReferences();
//		
//		//Get Sn/Do combo
//		me.searchWarehouse();
//		
//		var detailView = me.getDetailBizView();
//		var recvData = detailView.items.get(0).recvData;
//		var megaCombo = me.getStore('megaRequisitionCombo');
//		var subSearchType;
//		
//		me.CURRENT_VIEW_TYPE = 'CREATE';
//
//		recvData.commit(); // Close Check(dirty)
//		
//		if(me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_CREATE){
//			subSearchType = 'tabInitialCreate'
//		} else {
//			subSearchType = 'tabInitialUpdate'
//		}
//		
//		// modified for issue 56267
//		me.deployedYN = recvData.data.deployedYN;
//		
//		megaCombo.load({
//			params: {
//				shftMethCd : 'Standard',
//				searchType : 'megacombolist',
//				subSearchType : subSearchType,
//				purpTpCd : recvData.data.purpTpCd,
//				vslCallId : refs.ctlDetailJpvc.getValue(),
//				megaNo: recvData.data.megaNo
//			},
//			callback: function(records, operation, success) {
//				if (success) {
//					if (records.length > 0) {
//						me.setComboStore(records[0].data);
//						me.setDetailTabControl(records[0].data, recvData);
//					}
//				}
//			}
//		});
//	},
//	
//	// Mega Detail Purpose combo change event
//	onComboChangeForMegaDetailPurpose : function(combo, value, obj){
//		var me = this;
//		var grid = combo.up('grid');
//
////		if(!StringUtil.isNullorEmpty(value)){
////			me.setControlForPurpose(combo.selection.get('scdLgv'));
////		}
//		
//		if(value !== null){
//			me.setControlForPurpose(combo.selection.get('scdLgv'));
//		}
//	},
//	
//	// Set Purpose Change Control
//	setControlForPurpose:function(purpose){
//		var me = this;
//		var vslItem = me.getViewModel().get('theVsl');
//		var refs = me.getReferences();
//		var blnWh = true;
//		
//		if(purpose === '' || purpose === null){
//		    blnWh = false;
//		}
//		
//		refs.ctlMegaDetailHatchRadio.setDisabled(false);	
//		refs.ctlMegaDetailWorkHatchNo.setDisabled(false);
//
//		refs.ctlMegaDetailWarehouseRadio.setDisabled(true);	
//		refs.ctlMegaDetailSn.setDisabled(true);	
//		refs.ctlMegaDetailDo.setDisabled(true);	
//		
//		if(purpose === 'MP'){
//			blnWh = true;
//			refs.ctlCrewContainer.setActiveItem(me.CREW_WH_OPR);
//			
//			refs.ctlMegaDetailStrevdoreCrewVslOprContainer.setHidden(true);
//			refs.ctlMegaDetailStrevdoreCrewWhOprContainer.setHidden(false);
//			
//			refs.ctlMegaDetailHatchRadio.setDisabled(true);	
//			refs.ctlMegaDetailWorkHatchNo.setDisabled(true);	
//			
//			refs.ctlMegaDetailWarehouseRadio.setDisabled(false);	
//			refs.ctlMegaDetailSn.setDisabled(false);	
//			refs.ctlMegaDetailDo.setDisabled(false);	
//		} else {
//			blnWh = false;
//			if(purpose === 'VP'){
//				refs.ctlCrewContainer.setActiveItem(me.CREW_VSL_OPR);
//				refs.ctlMegaDetailStevedoreShipCrew.setValue(false);
//				
//				refs.ctlMegaDetailStrevdoreCrewVslOprContainer.setHidden(false);
//				refs.ctlMegaDetailStrevdoreCrewWhOprContainer.setHidden(true);
//				
//				refs.ctlMegaDetailHatchRadio.setDisabled(false);	
//				refs.ctlMegaDetailWorkHatchNo.setDisabled(false);
//				
//				refs.ctlMegaDetailWarehouseRadio.setDisabled(true);	
//				refs.ctlMegaDetailSn.setDisabled(true);	
//				refs.ctlMegaDetailDo.setDisabled(true);	
//			} else {
//				refs.ctlCrewContainer.setActiveItem(me.CREW_BLANK);
//			}
//		}
//		
//		me.setWarehouseRadio(blnWh);
//		
//		if(MOST.config.Token.getUserType() !== CONSTANTS.USER_TYPE_EXTERNAL){
//		    refs.ctlMegaDetailWhAppr.setValue(blnWh);
//		    refs.ctlMegaDetailWhAppr.setVisible(blnWh);
//		}else{
//			if(purpose === 'MP'){
//				
//			}else{
//				
//			}
//		    refs.ctlMegaDetailWhAppr.setValue(blnWh);
//		    refs.ctlMegaDetailWhAppr.setVisible(false);
//		}
//		
//		if(me.CURRENT_VIEW_TYPE !== me.VIEW_TYPE_UPDATE){
//			if(MOST.config.Token.getUserType() !== CONSTANTS.USER_TYPE_EXTERNAL){
//				// refs.ctlMegaDetailWhAppr.setValue(blnWh);
//				// refs.ctlMegaDetailWhAppr.setVisible(blnWh);
//			}
//		}
//		
//		if(me.CURRENT_VIEW_TYPE == me.VIEW_TYPE_UPDATE){
//			 refs.ctlMegaDetailWhAppr.setVisible(false);
//		}
//		
//		if(!StringUtil.isNullorEmpty(vslItem.get('vslCallId')) &&
//		   !StringUtil.isNullorEmpty(vslItem.get('arrvSaId')) &&
//		   (MOST.config.Token.getUserType() !== CONSTANTS.USER_TYPE_EXTERNAL) &&
//		   (me.CURRENT_VIEW_TYPE !== me.VIEW_TYPE_UPDATE)){
//			refs.ctlDetailRequester.setEditableControl(true);
//		} else {
//			refs.ctlDetailRequester.setEditableControl(false);
//		}
//		
//		if(MOST.config.Token.getUserType() == me.USER_TYPE_INTERNAL){
//			refs.refDetailForkliftWhQty.setVisible(blnWh);
//		}
//	},
//	
//	// Set Radio Warehouse
//	setWarehouseRadio : function(checked){
//		var me = this;
//		var refs = me.getReferences();
//		
//		refs.ctlMegaDetailWarehouseRadio.setValue(checked);
//		refs.ctlMegaDetailWarehouseRadio.setReadOnly(!checked);
//		
//		refs.ctlMegaDetailHatchRadio.setValue(!checked);
//		refs.ctlMegaDetailHatchRadio.setReadOnly(checked);
//		
//		refs.ctlMegaDetailSn.setReadOnly(!checked);
//		refs.ctlMegaDetailDo.setReadOnly(!checked);
//	},
//	
//	// Set combobox & Detail Data
//	setComboStore:function(masterItem){
//		var me = this;
//		var refs = me.getReferences();
//		var shiftCombo = me.getStore('megaDetailShiftCombo');
//		var purposeCombo = me.getStore('megaDetailPurposeCombo');
//		var purposeTypeCombo = me.getStore('megaDetailPurposeTypeCombo');
//		var cargoTypeCombo = me.getStore('megaDetailCargoTypeCombo');
//		var commodityCombo = me.getStore('megaDetailCommodityCombo');
//		var packageCombo = me.getStore('megaDetailPackageCombo');
//		var eqTypeComboForMechanical = me.getStore('megaDetailEqTypeComboForMechanical');
//		var eqTypeComboForPortCrane = me.getStore('megaDetailEqTypeComboForPortCrane');
//		var categoryCombo = me.getStore('megaDetailCategoryCombo');
//		var workingAreaComboForGears = me.getStore('megaDetailWorkingAreaComboForGears');
//		var workingAreaComboForForklift = me.getStore('megaDetailWorkingAreaComboForForklift');
//		var workingAreaComboForTrailer = me.getStore('megaDetailWorkingAreaComboForTrailer');
//		var workingAreaComboForMechanical = me.getStore('megaDetailWorkingAreaComboForMechanical');
//		var workingAreaComboForPortCrane = me.getStore('megaDetailWorkingAreaComboForPortCrane');
//		var companyCombo = me.getStore('megaDetailCompanyCombo');
//		var companyAddJpbiCombo = me.getStore('megaDetailCompanyAddJpbiCombo');
//		var gearsCapacityCombo = me.getStore('megaDetailGearsCapacityCombo');
//		var forkliftCapacityCombo = me.getStore('megaDetailForkliftCapacityCombo');
//		var trailerCapacityCombo = me.getStore('megaDetailTrailerCapacityCombo');
//		
//		purposeCombo.setData(masterItem.cscPurposeList);
//		purposeCombo.insert(0, [{scdNm: 'Select Purpose',scd: ''}]);
//		if(me.CURRENT_VIEW_TYPE  === me.VIEW_TYPE_CREATE){
//			refs.ctlDetailPurpose.setValue('');
//		}
//		
//		cargoTypeCombo.setData(masterItem.cargoTypeList);
//		cargoTypeCombo.insert(0, [{scdNm: 'Select',scd: ''}]);
//		
//		shiftCombo.setData(masterItem.shiftList);
//		
//		commodityCombo.setData(masterItem.commodityCodeList);
//		commodityCombo.insert(0, [{scdNm: 'Select',scd: ''}]);
//		
//		packageCombo.setData(masterItem.packageList);
//		packageCombo.insert(0, [{scdNm: 'Select',scd: ''}]);
//		
//		eqTypeComboForMechanical.setData(masterItem.mechanicalEquipmentTypeList);
//		eqTypeComboForMechanical.insert(0, [{scdNm: 'Select',scd: ''}]);
//		
//		eqTypeComboForPortCrane.setData(masterItem.portCraneEquipmentTypeList);
//		// eqTypeComboForPortCrane.insert(0, [{scdNm: 'Ship Crane',scd: 'SR'}]);
//		eqTypeComboForPortCrane.insert(0, [{scdNm: 'Select',scd: ''}]);
//		
//		categoryCombo.setData(masterItem.categoryList);
//		
//		workingAreaComboForGears.setData(masterItem.workingAreaList);
//		workingAreaComboForForklift.setData(masterItem.workingAreaList);
//		workingAreaComboForTrailer.setData(masterItem.workingAreaList);
//		workingAreaComboForMechanical.setData(masterItem.workingAreaList);
//		workingAreaComboForPortCrane.setData(masterItem.workingAreaList);
//		
//		companyCombo.setData(masterItem.companyList);
//		
//		// companyAddJpbiCombo.setData(masterItem.companyList);
//		// companyAddJpbiCombo.insert(0, [{engPtyNm: 'JPB',ptyCd: 'JPB'}]);
//		
//		gearsCapacityCombo.setData(masterItem.gearsRequisitionList);
//		forkliftCapacityCombo.setData(masterItem.forkliftEquipmentList);
//		trailerCapacityCombo.setData(masterItem.trailerEquipmentList);
//	},
//	
//	// Settings Detail Control
//	setDetailTabControl:function(masterItem, recvData){
//		var me = this;
//		var refs = me.getReferences();
//		var detailView = me.getDetailBizView();
//		var gears = me.getStore('megaDetailGears');
//		var forklift = me.getStore('megaDetailForklift');
//		var trailer = me.getStore('megaDetailTrailer');
//		var mechanical = me.getStore('megaDetailMechanical');
//		var portCrane = me.getStore('megaDetailPortCrane');
//		var cargoDetail = me.getStore('megaDetailCargoDetail');
//		var cargoDetailInfo = me.getStore('megaDetailCargoDetailInfo');
//		var gearsCompany = me.getStore('megaDetailTabGearsCompany');
//		var forkliftCompany = me.getStore('megaDetailTabForkliftCompany');
//		var trailerCompany = me.getStore('megaDetailTabTrailerCompany');
//		var mechanicalCompany = me.getStore('megaDetailTabMechanicalCompany');
//		var portCraneCompany = me.getStore('megaDetailTabPortCraneCompany');
//		var mainItem = null;
//		var theVsl = me.getViewModel().get('theVsl');
//		
//		// AccessAuthHandler.existAuthItem(this.id, UserConfig.APPROVAL) -
//		// temporary(Flex)
//		if( MOST.config.Token.getUserType() === CONSTANTS.USER_TYPE_INTERNAL){
//			me.hasAuthConfirm = true;
//			me.hasAuthApproval = true;
//		} else {
//			me.hasAuthConfirm = false;
//			me.hasAuthApproval = false;
//		}
//		
//		
//		if(recvData != null){
//			refs.ctlMegaDetailSn.suspendEvents();
//			refs.ctlMegaDetailDo.suspendEvents();
//			// JPVC Detail
//			var jpvcDetailItem = new Ext.create('MOST.model.planning.VesselSchedule');
//			
//			if(masterItem.vesselCallIdList != null && masterItem.vesselCallIdList.length > 0){
//				jpvcDetailItem.phantom = false; // UPDATE
//				jpvcDetailItem.data = masterItem.vesselCallIdList[0];
//				DateUtil.convertDateToLong(jpvcDetailItem.data, ['eta', 'etd', 'etw']); // date
//																						// to
//																						// long
//			}
//			
//			me.getViewModel().setData({theVsl:jpvcDetailItem});
//		
//			//refs.refDetailGearsDspReqhhmm.setValue(masterItem.gearsItem.dspReqhhmm.getValue());
//			// Equipment(Gears, Forklift, Trailer, Mechanical, PortCrane)
//			gears.removeAll();
//			gears.commitChanges();
//			gearsCompany.removeAll();
//			gearsCompany.commitChanges();
//								
//			forklift.removeAll();
//			forklift.commitChanges();
//			forkliftCompany.removeAll();
//			forkliftCompany.commitChanges();
//
//			trailer.removeAll();
//			trailer.commitChanges();
//			trailerCompany.removeAll();
//			trailerCompany.commitChanges();
//
//			mechanical.removeAll();
//			mechanical.commitChanges();
//			mechanicalCompany.removeAll();
//			mechanicalCompany.commitChanges();
//
//			portCrane.removeAll();
//			portCrane.commitChanges();
//			portCraneCompany.removeAll();
//			portCraneCompany.commitChanges();
//			
//			cargoDetailInfo.removeAll();
//			cargoDetailInfo.commitChanges();
//			
//			// CargoDetail tab
//			if(masterItem.cargoDetailList != null && masterItem.cargoDetailList.length > 0 ){
//				cargoDetail.setData(masterItem.cargoDetailList);
//				cargoDetail.commitChanges();
//			}
//			
//			// Cargo Detail Tab(Inputed Values)
//			if(masterItem.cargoDetailItems != null && masterItem.cargoDetailItems.length > 0 ){
//				cargoDetailInfo.setData(masterItem.cargoDetailItems);
//				cargoDetailInfo.commitChanges();
//				
//				for(var i = 0; i < masterItem.cargoDetailItems.length; i++){
//					var inputedCargoItem = masterItem.cargoDetailItems[i];
//					
//					for(var j =0; j <cargoDetail.data.length; j++){
//						var cargoItem = cargoDetail.data.getAt(j)
//						if(inputedCargoItem.cgDescCd === cargoItem.data.cd){
//						    cargoItem.set(Ext.String.format('hatchNo{0}', + inputedCargoItem.hatchNo), inputedCargoItem.cgDescVal);
//						    cargoItem.set('hatchNo', inputedCargoItem.hatchNo);
//						}
//					}
//				}
//				cargoDetail.commitChanges();
//			}
//			
//			if(me.CURRENT_VIEW_TYPE  === me.VIEW_TYPE_CREATE){
//				// Vessel Schedule Tab
//				mainItem = new Ext.create('MOST.model.planning.Mega');
//				if((refs.ctlJpvc.getValue() != "" && masterItem.confirmationSlipDryBreakBulk.length > 0)
//						||(refs.ctlDetailJpvc.getValue() != "" && masterItem.confirmationSlipDryBreakBulk.length > 0)){
//					mainItem.data = masterItem.confirmationSlipDryBreakBulk[0];
//				}
//					
//				mainItem.set('workYmd', new Date());
//				if(theVsl != null){
//					mainItem.set('vslCallId', theVsl.get('vslCallId'));
//				}
//				mainItem.set('statCd', 'CR');
//					
//				me.getViewModel().setData({theMain:mainItem});
//				
//				// Stevedore, Trimming empty binding
//				var stevedoreItem = new Ext.create('MOST.model.planning.Mega');
//				var stevedoreCrewItem = new Ext.create('MOST.model.planning.Mega');
//				var stevedoreTallyItem = new Ext.create('MOST.model.planning.Mega');
//				var stevedoreLashingItem = new Ext.create('MOST.model.planning.Mega');
//				var trimmingItem = new Ext.create('MOST.model.planning.Mega');
//				
//				me.getViewModel().setData({theStevedore:stevedoreItem});
//				me.getViewModel().setData({theCrew:stevedoreCrewItem});
//				me.getViewModel().setData({theTally:stevedoreTallyItem});
//				me.getViewModel().setData({theLashing:stevedoreLashingItem});
//				me.getViewModel().setData({theTrimming:trimmingItem});
//			} else {
//				// Vessel Schedule Tab
//				mainItem = new Ext.create('MOST.model.planning.Mega');
//				
//				if(masterItem.detailList != null && masterItem.detailList.length > 0){
//					mainItem.phantom = false; // UPDATE
//					// mainItem.data = masterItem.detailList[0];
//					if(masterItem.confirmationSlipDryBreakBulk.length > 0){
//						mainItem.data = masterItem.confirmationSlipDryBreakBulk[0];
//						DateUtil.convertDateToLong(mainItem.data, ['workYmd', 'reqDt']); // date
//					}																	
//					mainItem.set('workYmd',masterItem.detailList[0].workYmd);
//					mainItem.set('reqr',masterItem.detailList[0].reqr);
//					mainItem.set('reqComp',masterItem.detailList[0].reqComp);
//					mainItem.set('reqDt',masterItem.detailList[0].reqDt);
//					mainItem.set('appr',masterItem.detailList[0].appr);
//					mainItem.set('statCd',masterItem.detailList[0].statCd);
//					mainItem.set('statCdNm',masterItem.detailList[0].statCdNm);
//					mainItem.set('shftId',masterItem.detailList[0].shftId);
//					mainItem.set('purpTpCd',masterItem.detailList[0].purpTpCd);
//					mainItem.set('megaNo',masterItem.detailList[0].megaNo);
//					mainItem.set('rmk', masterItem.detailList[0].rmk);
//					mainItem.set('rejRmk', masterItem.detailList[0].rejRmk);
//					mainItem.set('refNo',masterItem.detailList[0].refNo);
//					mainItem.set('shipgNoteNo',masterItem.detailList[0].shipgNoteNo);
//					mainItem.set('dono',masterItem.detailList[0].dono);
//					mainItem.set('vslCallId', recvData.data.vslCallId);
//				}
//				
//				if(me.CURRENT_VIEW_TYPE  === me.VIEW_TYPE_COPY){
//					mainItem.phantom = true;
//					mainItem.set('vslCallId', recvData.data.vslCallId);
//					mainItem.set('megaNo', '');
//					mainItem.set('refNo', '');
//					mainItem.set('reqr', '');
//					mainItem.set('reqComp', '');
//					mainItem.set('reqDt', '');
//					mainItem.set('appr', '');
//					mainItem.set('appDt', '');
//					mainItem.set('statCd', '');
//					mainItem.set('megaWhYn', '');
//					mainItem.set('rmk', '');
//					mainItem.set('rejRmk', '');
//				}
//				
//				me.getViewModel().setData({theMain:mainItem});
//				
//				// Stevedore / Trimming Tab
//				var stevedoreItem = new Ext.create('MOST.model.planning.Mega');
//				var stevedoreCrewItem = new Ext.create('MOST.model.planning.Mega');
//				var stevedoreTallyItem = new Ext.create('MOST.model.planning.Mega');
//				var stevedoreLashingItem = new Ext.create('MOST.model.planning.Mega');
//				var trimmingItem = new Ext.create('MOST.model.planning.Mega');
//				
//				if(masterItem.stevedoreItems != null && masterItem.stevedoreItems.length == 5 && me.CURRENT_VIEW_TYPE  !== me.VIEW_TYPE_COPY){
//					stevedoreItem.phantom = false; // UPDATE
//					stevedoreItem.data = masterItem.stevedoreItems[0];
//					
//					stevedoreCrewItem.phantom = false; // UPDATE
//					stevedoreCrewItem.data = masterItem.stevedoreItems[1];
//					
//					stevedoreTallyItem.phantom = false; // UPDATE
//					stevedoreTallyItem.data = masterItem.stevedoreItems[3];
//					
//					stevedoreLashingItem.phantom = false; // UPDATE
//					stevedoreLashingItem.data = masterItem.stevedoreItems[4];
//					
//					trimmingItem.phantom = false; // UPDATE
//					trimmingItem.data = masterItem.stevedoreItems[2];
//				}
//				else if(masterItem.stevedoreItems != null && masterItem.stevedoreItems.length == 5 && me.CURRENT_VIEW_TYPE  === me.VIEW_TYPE_COPY){
//					stevedoreItem.phantom = true; // COPY
//					stevedoreItem.data = masterItem.stevedoreItems[0];
//					
//					stevedoreCrewItem.phantom = true; // COPY
//					stevedoreCrewItem.data = masterItem.stevedoreItems[1];
//					
//					stevedoreTallyItem.phantom = true; // COPY
//					stevedoreTallyItem.data = masterItem.stevedoreItems[3];
//					
//					stevedoreLashingItem.phantom = true; // COPY
//					stevedoreLashingItem.data = masterItem.stevedoreItems[4];
//					
//					trimmingItem.phantom = true; // COPY
//					trimmingItem.data = masterItem.stevedoreItems[2];
//				}
//				
//				me.getViewModel().setData({theStevedore:stevedoreItem});
//				me.getViewModel().setData({theCrew:stevedoreCrewItem});
//				me.getViewModel().setData({theTally:stevedoreTallyItem});
//				me.getViewModel().setData({theLashing:stevedoreLashingItem});
//				me.getViewModel().setData({theTrimming:trimmingItem});
//				
//				// Gears Tab
//				/*
//				 * if(masterItem.gearsItems != null &&
//				 * masterItem.gearsItems.length > 0 && me.CURRENT_VIEW_TYPE !==
//				 * me.VIEW_TYPE_COPY){ gears.setData(masterItem.gearsItems);
//				 * gears.commitChanges(); }
//				 *  // Forklift Tab if(masterItem.forkliftItems != null &&
//				 * masterItem.forkliftItems.length > 0 && me.CURRENT_VIEW_TYPE
//				 * !== me.VIEW_TYPE_COPY){
//				 * forklift.setData(masterItem.forkliftItems);
//				 * forklift.commitChanges(); }
//				 *  // Trailer Tab if(masterItem.trailerItems != null &&
//				 * masterItem.trailerItems.length > 0 && me.CURRENT_VIEW_TYPE
//				 * !== me.VIEW_TYPE_COPY){
//				 * trailer.setData(masterItem.trailerItems);
//				 * trailer.commitChanges(); }
//				 *  // Mechanical Tab if(masterItem.mechenicalItems != null &&
//				 * masterItem.mechenicalItems.length > 0 && me.CURRENT_VIEW_TYPE
//				 * !== me.VIEW_TYPE_COPY){
//				 * mechanical.setData(masterItem.mechenicalItems);
//				 * mechanical.commitChanges(); }
//				 *  // Port Crane Tab if(masterItem.portCraneItems != null &&
//				 * masterItem.portCraneItems.length > 0 && me.CURRENT_VIEW_TYPE
//				 * !== me.VIEW_TYPE_COPY){
//				 * portCrane.setData(masterItem.portCraneItems);
//				 * portCrane.commitChanges(); }
//				 */
//				// Gears Tab
//				if(masterItem.gearsItems != null && masterItem.gearsItems.length > 0){
//					if(me.CURRENT_VIEW_TYPE  === me.VIEW_TYPE_COPY){
//						for(var i = 0; i< masterItem.gearsItems.length; i++){
//							var record = masterItem.gearsItems[i];
//							record.confmQty = 0;
//							record.operInfoItems = new Array();
//						}
//					}
//					gears.setData(masterItem.gearsItems);
//					gears.commitChanges();
//				}
//				
//				// Forklift Tab
//				if(masterItem.forkliftItems != null && masterItem.forkliftItems.length > 0 ){
//					if(me.CURRENT_VIEW_TYPE  === me.VIEW_TYPE_COPY){
//						for(var i = 0; i< masterItem.forkliftItems.length; i++){
//							var record = masterItem.forkliftItems[i];
//							record.confmQty = 0;
//							record.operInfoItems = new Array();
//						}
//					}
//					
//					forklift.setData(masterItem.forkliftItems);
//					forklift.commitChanges();
//				}
//				
//				// Trailer Tab
//				if(masterItem.trailerItems != null && masterItem.trailerItems.length > 0 ){
//					if(me.CURRENT_VIEW_TYPE  === me.VIEW_TYPE_COPY){
//						for(var i = 0; i< masterItem.trailerItems.length; i++){
//							var record = masterItem.trailerItems[i];
//							record.confmQty = 0;
//							record.operInfoItems = new Array();
//						}
//					}
//					trailer.setData(masterItem.trailerItems);
//					trailer.commitChanges();
//				}
//				
//				// Mechanical Tab
//				if(masterItem.mechenicalItems != null && masterItem.mechenicalItems.length > 0 ){
//					if(me.CURRENT_VIEW_TYPE  === me.VIEW_TYPE_COPY){
//						for(var i = 0; i< masterItem.mechenicalItems.length; i++){
//							var record = masterItem.mechenicalItems[i];
//							record.confmQty = 0;
//							record.operInfoItems = new Array();
//						}
//					}
//					mechanical.setData(masterItem.mechenicalItems);
//					mechanical.commitChanges();
//				}
//				
//				// Port Crane Tab
//				if(masterItem.portCraneItems != null && masterItem.portCraneItems.length > 0 ){
//					if(me.CURRENT_VIEW_TYPE  === me.VIEW_TYPE_COPY){
//						for(var i = 0; i< masterItem.portCraneItems.length; i++){
//							var record = masterItem.portCraneItems[i];
//							record.confmQty = 0;
//							record.operInfoItems = new Array();
//						}
//					}
//					portCrane.setData(masterItem.portCraneItems);
//					portCrane.commitChanges();
//				}
//			}
//			
//			if(me.CURRENT_VIEW_TYPE  === me.VIEW_TYPE_CREATE ||
//			   me.CURRENT_VIEW_TYPE  === me.VIEW_TYPE_COPY){
//				detailView.items.get(0).recvData = mainItem;
//			}
//			
//			me.searchWarehouse();
//			me.visibleControlInTab(mainItem, recvData);
//			me.setControlForPurpose(recvData.data.purpType);
//			
//			refs.ctlMegaDetailSn.resumeEvents();
//			refs.ctlMegaDetailDo.resumeEvents();
//		}
//		
//		//Disabled Lashing
//		me.onLashingDisabledControl(true);
//	},
//	
//	/**
//	 * visibleControls hasAuthApproval =>
//	 * AccessAuthHandler.existAuthItem(this.id, UserConfig.APPROVAL)
//	 */
//	visibleControlInTab : function(mainItem, recvData){
//		var me = this;
//		var refs = me.getReferences();
//		
//		// Tool Save Button Visible
//		if(recvData.get('statCd') === me.STAT_CREATE ||
//		   me.CURRENT_VIEW_TYPE !== me.VIEW_TYPE_UPDATE){
//			me.visibleDetailToolButton(ViewUtil.TOOL_SAVE, true);
//		} else {
//			if( me.USER_TYPE === CONSTANTS.USER_TYPE_INTERNAL &&
//			    (recvData.get('statCd') === me.STAT_APPROVED || recvData.get('statCd') === me.STAT_CANCEL)){
//				me.visibleDetailToolButton(ViewUtil.TOOL_SAVE, false);
//			} else {
//				me.visibleDetailToolButton(ViewUtil.TOOL_SAVE, true);
//			}
//		}
//		
//		if(me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_CREATE){
//			// Vessel Schedule Tab Warehouse/Hatch Radio
//			me.setWarehouseRadio(false);
//		}
//		
//		// W/H Supervisor Approval CheckBox
//		refs.ctlMegaDetailWhAppr.setVisible(false);
//		
//		// Visible Equipment Tab
//		me.visibleDetailEquipmentGrid(recvData);
//		
//		// Stevedore Nos of Gang
//		refs.ctlDetailMegaStedoreNosofGang.setReadOnly(false);
//		
//		if(recvData != null){
//			if(me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_CREATE){
//				refs.ctlSubmitLabel.setText('');
//			} else if(me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_COPY){
//				refs.ctlSubmitLabel.setText(Ext.String.format('[{0}]', me.CURRENT_VIEW_TYPE));
//			} else {
//				refs.ctlSubmitLabel.setText(Ext.String.format('[{0}]', mainItem.get('statCdNm')));
//			}
//			
//			if(me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_CREATE ||
//			   me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_COPY){
//				refs.ctlApprovalContainer.setActiveItem(me.APPROVAL_SUBMIT);
//				me.visibleDetailJpvcPanel(false);
//			} else {
//				if(recvData.get('rejYn') === 'Y'){
//					refs.ctlDetailRejectMessage.setVisible(true);
//				} else {
//					refs.ctlDetailRejectMessage.setVisible(false);
//				}
//				
//				var strStat = recvData.get('statCd');
//				
//				if (strStat == me.STAT_CONFIRM){
//					strStat = me.STAT_SUBMIT;
//				}
//				
//				switch(strStat){
//					case me.STAT_REJECT:
//						refs.ctlDetailMegaWorkYmd.setReadOnly(true);
//						refs.ctlDetailMegaShift.setReadOnly(true);
//						
//						if(recvData.get('userMegaYn') == 'Y'){
//							refs.ctlApprovalContainer.setActiveItem(me.APPROVAL_RESUBMIT);
//						} else {
//							refs.ctlApprovalContainer.setVisible(false);
//						}
//						
//						refs.ctlDetailRejectMessage.setVisible(true);
//						break;
//					case me.STAT_CREATE:
//						refs.ctlApprovalContainer.setActiveItem(me.APPROVAL_SUBMIT);
//						break;
//					case me.STAT_CANCEL:
//						refs.ctlDetailMegaWorkYmd.setReadOnly(true);
//						refs.ctlDetailMegaShift.setReadOnly(true);
//						
//						refs.ctlApprovalContainer.setVisible(false);
//						break;
//					case me.STAT_REVIEW:
//						refs.ctlDetailMegaWorkYmd.setReadOnly(true);
//						refs.ctlDetailMegaShift.setReadOnly(true);
//						
//						refs.ctlApprovalContainer.setVisible(false);
//						break;
//					case me.STAT_SUBMIT: // MEGA status is Submit or Confirm
//						
//						// In case of UserRole is CSC
//						if(me.hasAuthApproval){
//							/*
//							 * In this case, can't approval Purpose is Warehouse
//							 * MEGA wasn't updated in internal MEGA
//							 */
//							if(recvData.get('purpType') === 'MP' && recvData.get('megaWhYn') != 'Y'){
//								// Forklift order is not
//								if(recvData.get('forkliftYn') != 'Y'){
//									if(recvData.get('userMegaYn') == 'Y'){
//										refs.ctlApprovalContainer.setActiveItem(me.APPROVAL_RESUBMITAPPROVAL);
//									} else {
//										refs.ctlApprovalContainer.setActiveItem(me.APPROVAL_APPROVAL);
//										refs.ctlDetailMegaWorkYmd.setReadOnly(true);
//										refs.ctlDetailMegaShift.setReadOnly(true);
//										refs.ctlDetailMegaStedoreNosofGang.setReadOnly(false);
//									}
//									
//									refs.ctlDetailRejectMessage.setVisible(true);
//								} else {
//									// In case of own MEGA, Resubmit is possible
//									if(recvData.get('userMegaYn') == 'Y'){
//										refs.ctlApprovalContainer.setActiveItem(me.APPROVAL_SUBMIT);
//									} else { // Nothing can do
//										refs.ctlApprovalContainer.setVisible(false);
//									}
//								}
//							} else {
//								// In case of own MEGA
//								if(recvData.get('userMegaYn') == 'Y'){
//									refs.ctlApprovalContainer.setActiveItem(me.APPROVAL_RESUBMITAPPROVAL);
//								} else {
//									refs.ctlApprovalContainer.setActiveItem(me.APPROVAL_APPROVAL);
//									refs.ctlDetailMegaWorkYmd.setReadOnly(true);
//									refs.ctlDetailMegaShift.setReadOnly(true);
//									refs.ctlDetailMegaStedoreNosofGang.setReadOnly(false);
//								}
//								
//								refs.ctlDetailRejectMessage.setVisible(true);
//							}
//						} else {
//							/*
//							 * Purpose is Warehouse MEGA was updated in internal
//							 * MEGA
//							 */
//							if(recvData.get('purpType') === 'MP' && recvData.get('megaWhYn') == 'Y'){
//								refs.ctlDetailMegaWorkYmd.setReadOnly(true);
//								refs.ctlDetailMegaShift.setReadOnly(true);
//								//need to checking.
//								//refs.ctlApprovalContainer.setVisible(false);
//							}
//							
//							// In case of own MEGA, Resubmit is possible
//							if(recvData.get('userMegaYn') == 'Y'){
//								refs.ctlApprovalContainer.setActiveItem(me.APPROVAL_RESUBMIT);
//							} else { // Nothing can do
//								refs.ctlApprovalContainer.setVisible(false);
//							}
//						}
//							
//						break;
//					case me.STAT_APPROVED:
//						refs.ctlDetailMegaWorkYmd.setReadOnly(true);
//						refs.ctlDetailMegaShift.setReadOnly(true);
//						
//						// In case of UserRole is CSC
//						if(me.hasAuthApproval){
//							refs.ctlApprovalContainer.setActiveItem(me.APPROVAL_APPROVAL);
//							refs.ctlDetailMegaStedoreNosofGang.setReadOnly(false);
//							refs.ctlDetailRejectMessage.setVisible(true);
//						} else {
//							if(recvData.get('userMegaYn') == 'Y'){
//								refs.ctlApprovalContainer.setActiveItem(me.APPROVAL_CANCEL);
//							} else { // Nothing can do
//								refs.ctlApprovalContainer.setVisible(false);
//							}
//						}
//						break;
//					case me.STAT_REQUEST_CANCELED:
//						// modified for issue 56267
//						refs.ctlDetailMegaWorkYmd.setReadOnly(true);
//						refs.ctlDetailMegaShift.setReadOnly(true);
//						// In case of UserRole is CSC
//						if(me.hasAuthApproval){
//							refs.ctlApprovalContainer.setActiveItem(me.APPROVAL_REQUEST_CANCELED);
//							refs.ctlDetailMegaStedoreNosofGang.setReadOnly(false);
//							refs.ctlDetailRejectMessage.setVisible(true);
//						} else {
//							refs.ctlApprovalContainer.setVisible(false);
//						}
//						break;
//					default:
//						break;
//				}
//				
//				me.visibleDetailJpvcPanel(true);
//			}
//		}
//	},
//	
//	// Control Visible/Disable
//	visibleDetailJpvcPanel:function(booleanValue){
//		var me = this;
//		var refs = me.getReferences();
//		
//		refs.ctlDetailJpvc.setEditableControl(!booleanValue);
//		refs.ctlDetailMegaNo.setVisible(booleanValue);
//		refs.ctlDetailPurpose.setReadOnly(booleanValue);
//	},
//	
//	// Editable Detail Grid Tab
//	isEditableDetailGridTab:function(bizName){
//		var me = this;
//		var detailView = me.getDetailBizView();
//		var recvData = detailView.items.get(0).recvData;
//		var refs = me.getReferences();
//		
//		var strStat = recvData.get('statCd');
//		var reqEditable = true;
//		
//		// AccessAuthHandler.existAuthItem(parentDocument.id,
//		// UserConfig.CONFIRM) - temporary(Flex)
//		if(me.hasAuthConfirm){
//			if(recvData.get('purpType') === 'MP' && recvData.get('megaWhYn') == 'Y'){
//				if(strStat == me.STAT_APPROVED ||
//				   strStat == me.STAT_CONFIRM ||
//				   (strStat == me.STAT_SUBMIT && recvData.get('forkliftYn') != 'Y')){
//					reqEditable = false;
//				}
//			} else {
//				if (strStat == me.STAT_APPROVED || strStat == me.STAT_SUBMIT){
//					reqEditable = false;
//				}
//			}
//		}
//		
//		return reqEditable;
//	},
//	
//	// All Equipment Grid Editable Column
//	visibleDetailEquipmentGrid:function(recvData){
//		
//		var me = this;
//		var refs = me.getReferences();
//		var visibleYN = false;
//		if(me.USER_TYPE === me.USER_TYPE_EXTERNAL){
//			visibleYN = true;
//		}
//		// Gears Image
//		refs.ctlCompanyGear.setVisible(!visibleYN); // test
//		refs.ctlDetailGearImage.setVisible(visibleYN); // true
//		
//		// Forklift Image & Company Grid(Operator)
//		refs.ctlCompanyForklift.setVisible(!visibleYN);
//		refs.ctlDetailForkliftImage.setVisible(visibleYN);
//		refs.refDetailForkliftWhQty.setVisible(!visibleYN);
//		
//		// Trailer Image
//		refs.ctlCompanyTrailer.setVisible(!visibleYN);
//		refs.ctlDetailTrailerImage.setVisible(visibleYN); // false
//		
//		// Mechanical Image
//		refs.ctlCompanyMechanical.setVisible(!visibleYN);
//		refs.ctlDetailMechanicalImage.setVisible(visibleYN); // false
//		
//		// PortCrane Image
//		refs.ctlCompanyPortCrane.setVisible(!visibleYN);
//		refs.ctlDetailPortCraneImage.setVisible(visibleYN);// false
//		
//		me.isAmendVisible = false;
//		
//		if(!me.hasAuthConfirm){
//			if((recvData.get('statCd') === me.STAT_SUBMIT ||
//			    recvData.get('statCd') === me.STAT_REVIEW ||
//			    recvData.get('statCd') === me.STAT_CONFIRM) &&
//			    recvData.get('megaTpCd') == 'A'){
//				me.isAmendVisible = true;
//			} else if (recvData.get('statCd') === me.STAT_APPROVED &&
//					   recvData.get('userMegaYn') === 'Y'){
//				me.isAmendVisible = true; 
//			}
//		}
//		
//		// Grid Equipment Button Setting - Gears
//		me.settingEquipmentButton('Gears');
//		
//		// Grid Equipment Button Setting - Forklift
//		me.settingEquipmentButton('Forklift');
//		
//		// Grid Equipment Button Setting - Trailer
//		me.settingEquipmentButton('Trailer');
//		
//		// Grid Equipment Button Setting - Mechanical
//		me.settingEquipmentButton('Mechanical');
//		
//		// Grid Equipment Button Setting - Port Crane
//		me.settingEquipmentButton('PortCrane');
//	},
//	
//	// Equipment CUD Button Setting
//	settingEquipmentButton : function(bizName){
//		var me = this;
//		var refs = me.getReferences();
//		var reqEditable = me.isEditableDetailGridTab();
//		// var btnAdd =
//		// me.lookupReference(Ext.String.format('ctlMegaDetailAddFor{0}',
//		// bizName));
//		// var btnDevare =
//		// me.lookupReference(Ext.String.format('ctlMegaDetailDevareFor{0}',
//		// bizName));
//		
//		// btnAdd.setVisible(!me.isAmendVisible);
//		// btnDevare.setVisible(!me.isAmendVisible);
//
//		var cudBtnView = me.lookupReference(Ext.String.format('cardCudBtnViewFor{0}', bizName));
//		var reqConfView = me.lookupReference(Ext.String.format('cardReqConfViewFor{0}', bizName));
//		var timeView = me.lookupReference(Ext.String.format('cardTimeViewFor{0}', bizName));
//
//		var confQtyField = me.lookupReference(Ext.String.format('confQtyField{0}', bizName));
//		var reqQtyField = me.lookupReference(Ext.String.format('reqQtyField{0}', bizName));
//
//		/*
//		if (!me.isAmendVisible)
//		{
//			cudBtnView.setActiveItem(me.UPDATE_BTN_CANVAS)
//		}
//		else{
//			cudBtnView.setActiveItem(me.AMEND_BTN_CANVAS)
//		}
//		*/
//
//		if(!reqEditable){
//			// reqConfView.setActiveItem(me.CONFIRM_QTY_BTN_VIEW)
//			// timeView.setActiveItem(me.HIDE_REQUEST_TIME)
//			confQtyField.setHidden(false)
//			reqQtyField.setHidden(true)	
//			timeView.setHidden(true)	
//		}
//		else{
//			// reqConfView.setActiveItem(me.REQUEST_QTY_BTN_VIEW)
//			// timeView.setActiveItem(me.SHOW_REQUEST_TIME)
//			confQtyField.setHidden(true)
//			reqQtyField.setHidden(false)
//			timeView.setHidden(false)
//		}
//	},
//	
//	// Equipment Grid Column editable ---------------OBSOvarE,
//	onBeforeEditForEquipment:function(editor, context) {
//		var me = this;
//		var grid = context.grid;
//		var reqTime = grid.down('[dataIndex=dspReqhhmm]').getEditor();
//		var reqQty = grid.down('[dataIndex=reqQty]').getEditor();
//		var confmQty = grid.down('[dataIndex=confmQty]').getEditor();
//		var reqEditable = me.isEditableDetailGridTab();
//		
//		reqTime.setReadOnly(!reqEditable);
//		reqQty.setReadOnly(!reqEditable);
//		confmQty.setReadOnly(reqEditable);
//		
//		// Not Created
//		if(!reqEditable){
//			confmQty.maxValue = context.record.get('reqQty');
//		}
//		
//		return true;
//	},
//	
//	// Toolbar Save Button
//	onDetailSave:function(){
//		var me = this;
//		var detailView = me.getDetailBizView();
//		var detailItem = me.getViewModel().get('theMain');
//		
//		if(detailView){
//			var infoForm = detailView.down('form').getForm();
//			
//			if(infoForm.isValid()){
//				me.validatePaymentAccount('save',function(){
//					return me.detailSaveProcess()
//				})	
//			} else {
//				MessageUtil.mandatoryFieldInValid();
//			}
//		}
//	},
//	
//	// Detail Save Process
//	detailSaveProcess : function(){
//		var me = this;
//		var refs = me.getReferences();
//		var detailView = me.getDetailBizView();
//		var vslItem = me.getViewModel().get('theVsl');
//		var validationCodeStore = me.getStore('megaDetailValidationCode');
//		var megaItem = me.getViewModel().get('theMain');;
//		var validationMsg = '';
//		
//		
//		if(me.USER_TYPE !== CONSTANTS.USER_TYPE_EXTERNAL && refs.ctlDetailRequester.getValue() === ''){
//			MessageUtil.warning('warning_msg', 'Please input the requester.');
//			return false;
//		}
//		
//		if(me.USER_TYPE === CONSTANTS.USER_TYPE_EXTERNAL){
//			if(vslItem.get('bbtLoc') === 'BBT'){
//				if(vslItem.get('cgTpCd') === 'BT'){
//					validationMsg = 'megadetail_submit_trade_vessel_eta_msg';
//				} else {
//					validationMsg = 'megadetail_submit_prior_eta_msg';
//				}
//				
//				validationCodeStore.load({
//					params : {
//						tyCd : 'createDocument',
//						col1 : vslItem.get('vslCallId'),
//						col2 : vslItem.get('cgTpCd')
//					},
//					
//					callback: function(records, operation, success) {
//						if (success) {
//							if(records != null && records.length > 0){
//								if(records[0].get('isValidated') === 'Y'){
//									me.saveMega(megaItem);
//								} else {
//									MessageUtil.warning('warning_msg', validationMsg, vslItem.get('configDoc'));
//								}
//							} else {
//								MessageUtil.warning('warning_msg', validationMsg, vslItem.get('configDoc'));
//							}
//						}
//					}
//				});
//			}else{
//				me.saveMega(megaItem);
//			}
//		} else {
//			me.saveMega(megaItem);
//		}
//	},
//	
//	/**
//	 * SAVE MEGA Perform save logic only when CREATE
//	 */
//	saveMega : function(recvData){
//		var me = this;
//
//		if(recvData.get('statCd') === me.STAT_CREATE ||
//		   me.CURRENT_VIEW_TYPE !== me.VIEW_TYPE_UPDATE){
//			me.serverSend(me.STAT_CREATE);
//			me.CURRENT_VIEW_TYPE = me.VIEW_TYPE_UPDATE;
//		} else {
//			if( me.USER_TYPE === CONSTANTS.USER_TYPE_INTERNAL &&
//				(recvData.get('statCd') === me.STAT_APPROVED || recvData.get('statCd') === me.STAT_CANCEL)){
//				me.serverSendForRmk();
//			}
//		}
//	},
//	
//	// Update Remark
//	serverSendForRmk : function(){
//		var me = this;
//		var masterItem = me.getViewModel().get('theMain');
//		
//		var proxy = masterItem.getProxy();
//		proxy.url = me.DETAIL_PROXY_URL;
//		
//		masterItem.set('insertType', 'updateRmk');
//		masterItem.save();
//	},
//	
//	// Server Send
//	serverSend : function(statusCode){
//		var me = this;
//		var refs = me.getReferences();
//		var detailView = me.getDetailBizView();
//		var recvData = detailView.items.get(0).recvData;
//		var searchMegaStore = me.getStore('megaRequisitionForInsertData');
//		var vslItem = me.getViewModel().get('theVsl');
//		var masterItem = me.getViewModel().get('theMain');
//		var forkliftStore = me.getStore('megaDetailForklift');
//		var gearsStore = me.getStore('megaDetailGears');
//		var mechanicalStore = me.getStore('megaDetailMechanical');
//		var trailerStore = me.getStore('megaDetailTrailer');
//		var portCraneStore = me.getStore('megaDetailPortCrane');
//		var grid = me.lookupReference('refMegaContractorGrid');
//		var store = me.getStore('megaRequisition');
//		var cargoDetail = me.getStore('megaDetailCargoDetail');
//
//		var isCreated = masterItem.phantom;
//		var infoForm = detailView.down('form').getForm();
//		
//		if(!infoForm.isValid()){
//			MessageUtil.mandatoryFieldInValid();
//			return;
//		}
//		
//    	if(refs.ctlDetailPurpose.getValue() === ''){
//    		MessageUtil.info('Information', 'Please select the purpose.');
//    		return;
//        }
//		
//		if(statusCode === me.STAT_APPROVED &&
//		   !me.validationApproval()){ // Approval Validation Check
//			return;
//		}
//		
//		// Madatory, Validation Check
//		if(statusCode!= me.STAT_REJECT && !me.validationServerSend(statusCode, masterItem)) {
////			var win = refs.refBtnSubmitMega.up('window');
////			if(win){
////				win.getEl().mask('Process data...');
////			}
//			
//			return;
//		}
//		
//		// Vessel Schedule DATA set STAT_CD
//		if(StringUtil.isNullorEmpty(masterItem.get('megaTpCd')) && me.USER_TYPE === CONSTANTS.USER_TYPE_INTERNAL){
//			masterItem.set('megaTpCd', 'A');
//		}
//		
//		if(me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_COPY){
//			
//			var purposeComboStore = me.getStore('megaDetailPurposeCombo');
//			if(purposeComboStore.loadCount <= 0){
//				purposeComboStore.load();
//			}
//			//var purpose = purposeComboStore.findRecord('scdNm', masterItem.get('purpTpCd'));
//			masterItem.set('purpTpCd', refs.ctlDetailPurpose.getValue() );
//			
//			if(me.USER_TYPE === CONSTANTS.USER_TYPE_INTERNAL){
//				masterItem.set('megaTpCd', 'CA');
//			} else {
//				masterItem.set('megaTpCd', me.COPY_MEGA);
//			}
//			
//			masterItem.set('copyMegaNo', masterItem.get('megaNo'));
//		} else if(me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_AMEND){
//			masterItem.set('megaTpCd', me.AMEND_MEGA);
//			masterItem.set('copyMegaNo', masterItem.get('megaNo'));
//			masterItem.set('amdBy', MOST.config.Token.getUserId());
//		}
//		
//		if(refs.ctlDetailMegaStedoreCompany.getValue() || refs.ctlStevedoreWorkingArea.getValue() || refs.ctlDetailMegaStedoreNosofGang.getValue()){
//			if(!(refs.ctlDetailMegaStedoreCompany.getValue() && refs.ctlStevedoreWorkingArea.getValue() && refs.ctlDetailMegaStedoreNosofGang.getValue())){
//				MessageUtil.info('Information', 'Please input related Steveore company.');
//				return;
//			}
//		}
//		
//		var proxy = masterItem.getProxy();
//		proxy.url = me.DETAIL_PROXY_URL;
//		
//		// Setting to Vessel Call Id
//		masterItem.set('vslCallId', vslItem.get('vslCallId'));
//		
//		// STATUS CODE
//		masterItem.set('statCd', statusCode);
//		
//		//Warehouse Operation
//		if(refs.ctlDetailPurpose.getValue() == 'MP0001'){
//			if(refs.ctlMegaDetailWhAppr.getValue() == true){
//				masterItem.set('whApprYn','Y');
//			}else{
//				masterItem.set('megaWhYn', 'Y');
//			}
//		}
//		
//		// Stevedore&Trimming Tab
//		masterItem.set('stevedoreItems', me.getStevedoreTrimmingItems());
//		
//		// Gears Tab
//		var gearsItem = me.getModifyDataForGears();
//		masterItem.set('gearsItems', gearsItem.updateItems);
//		masterItem.set('operInfoItemsForGears', gearsItem.compayItems);
//		
//		// Forklift Tab
//		var forkliftItem = me.getModifyDataForForklift();
//		masterItem.set('forkliftItems', forkliftItem.updateItems);
//		masterItem.set('operInfoItemsForForklift', forkliftItem.compayItems);
//		
//		// Trailer Tab
//		var trailerItem = me.getModifyDataForTrailer();
//		masterItem.set('trailerItems', trailerItem.updateItems);
//		masterItem.set('operInfoItemsForTrailer', trailerItem.compayItems);
//		
//		// Mechanical Tab
//		var mechanicalItem = me.getModifyDataForMechanical();
//		masterItem.set('mechenicalItems', mechanicalItem.updateItems);
//		masterItem.set('operInfoItemsForMechanical', mechanicalItem.compayItems);
//		
//		// PortCrane Tab
//		var portCraneItem = me.getModifyDataForPortCrane();
//		masterItem.set('portCraneItems', portCraneItem.updateItems);
//		masterItem.set('operInfoItemsForPortCrane', portCraneItem.compayItems);
//		
//		// Cargo Detail
//		var cargoDetailItem = me.getModifyDataForCargoDetail(cargoDetail);
//		masterItem.set('cargoDetailItems', cargoDetailItem.updateItems);
//		refs.refBtnSubmitMega.setDisabled(true);
//		// Server Send
//		masterItem.save({
//			success : function(record, operation) {
//				searchMegaStore.load({
//					params:{
//						megaNo : masterItem.get('megaNo')
//					},
//					callback : function(record, operation) {
//						if(record != null && record.length > 0){
//							me.updateRecord(recvData, record[0]);
//							
//							if(isCreated){
//								store.insert(0, recvData);
//								grid.getSelectionModel().select(recvData);
//							}
//							
//							recvData.set('viewType', me.VIEW_TYPE_UPDATE);
//							
//							me.onDetailLoad();
//							MessageUtil.saveSuccess();	// Success Message
//						} else {
//							MessageUtil.infoToast("success_msg", "fail_msg");
//							refs.refBtnSubmitMega.setDisabled(false);
//						}
//					}
//				});
//			}
//		});
//	},
//	
//	// Stevedore&Trimming Tab Modify Items
//	getStevedoreTrimmingItems : function(){
//		var me = this;
//		var stevedoreItem = me.getViewModel().get('theStevedore');
//		var crewItem = me.getViewModel().get('theCrew');
//		var tallyItem = me.getViewModel().get('theTally');
//		var lashingItem = me.getViewModel().get('theLashing');
//		var trimmingItem = me.getViewModel().get('theTrimming');
//		var addItems = new Array();
//		
//		addItems.push(stevedoreItem.data);
//		addItems.push(crewItem.data);
//		addItems.push(trimmingItem.data);
//		addItems.push(tallyItem.data);
//		addItems.push(lashingItem.data);
//		
//		return addItems;
//	},
//	
//	// Approval Validation Check
//	validationApproval : function(){
//		return true;
//	},
//	
//	// Validation serverSend
//	validationServerSend : function(statusCode, masterItem){
//		var me = this;
//		
//		// Internal User Requester Mandatory Check
//		if(me.USER_TYPE === CONSTANTS.USER_TYPE_INTERNAL &&
//		   StringUtil.isNullorEmpty(masterItem.get('reqr'))){
//			MessageUtil.warning('warning_msg', 'megadetail_mega_requester_msg');
//			return false;
//		}
//		
//		var reqEditable = me.isEditableDetailGridTab();
//		
//		if(reqEditable && (statusCode == me.STAT_SUBMIT || statusCode == me.STAT_CREATE)){ // Confirm Qty
//															// Editable
//			return true;
//		}
//		
//		// Equipment Grid(Gears, Forklift, Trailer, Mechanical, PortCrane)
//		if(me.validateEqupmentGridCheck('Gears')){
//			if(me.validateEqupmentGridCheck('Forklift')){
//				if(me.validateEqupmentGridCheck('Trailer')){
//					if(me.validateEqupmentGridCheck('Mechanical')){
//						if(me.validateEqupmentGridCheck('PortCrane')){
//							return true;
//						}
//					}
//				}
//			}
//		}
//		
//		return false;
//	},
//	
//	// Validation Working Area for Company
//	validateCompany : function(){
//
//		var me = this;
//		var refs = me.getReferences();
//		try	{
//			if ((!StringUtil.isNullorEmpty(refs.ctlDetailMegaStedoreCompany.getValue()) 
//				&& (StringUtil.isNullorEmpty(refs.ctlStevedoreWorkingArea.getValue())))
//			|| (!StringUtil.isNullorEmpty(refs.ctlDetailMegaStedoreTallyCompany.getValue()) 
//				&& (StringUtil.isNullorEmpty(refs.ctlWorkingAreaTally.getValue())))
//			|| (!StringUtil.isNullorEmpty(refs.ctlDetailMegaStedoreTrimmingCompany.getValue()) 
//				&& (StringUtil.isNullorEmpty(refs.ctlTrimmingWorkingArea.getValue())))){
//				
//				throw 'mega_workingarea_null_msg';
//			}
//			
//			if(me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_CREATE ||
//					me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_COPY){
//				if(refs.ctlDetailPurpose.getValue() == 'NP001'){
//					if(StringUtil.isNullorEmpty(refs.ctlWorkingAreaVesselOperation.getValue())){
//                        throw 'mega_workingarea_null_msg';
//					}
//				}
//			}else{
//				if(refs.ctlDetailPurpose.getValue() == 'Vessel Operation'){
//					if(StringUtil.isNullorEmpty(refs.ctlWorkingAreaVesselOperation.getValue())){
//						throw 'mega_workingarea_null_msg';
//					}
//				}
//			}
//				
//			if ((!StringUtil.isNullorEmpty(refs.ctlDetailMegaStedoreCompany.getValue()) 
//				&& ((!refs.ctlDetailMegaStedoreNosofGang.getValue()) || (refs.ctlDetailMegaStedoreNosofGang.getValue() === 0)))){
//				
//				throw 'no_gang_zero_msg';
//				
//			}
//			
//			//Lashing
//			if ((!StringUtil.isNullorEmpty(refs.ctlDetailMegaStedoreLashingCompany.getValue()) 
//				&& (StringUtil.isNullorEmpty(refs.ctlDetailMegaStevedoreLashingWorkingArea.getValue())))){
//				
//				throw 'mega_workingarea_null_msg';
//					
//			}
//			
//			if ((!StringUtil.isNullorEmpty(refs.ctlDetailMegaStedoreLashingCompany.getValue()) 
//				&& ((!refs.ctlDetailMegaStedoreLashingNosofGang.getValue()) || (refs.ctlDetailMegaStedoreLashingNosofGang.getValue() === 0)))){
//				
//				throw 'no_gang_zero_msg';
//					
//			}
//		}
//		catch(err){
//			MessageUtil.warning('submitMegaReq', err);	
//			return false
//		}
//		return true
//	},
//	
//	// Modified for GAP_PL-001 ID:108040
//	validatePaymentAccount: function(func, callback){
//		var me = this;
////		var ptnrCodeVal = MOST.config.Token.getPtnrCode();	
////		var store = this.getStore('ptnrList');
////		store.load({
////			scope: this,
////			params: {
////				ptnrCode: ptnrCodeVal
////			},
////			callback: function(records, operation, success){
////				if(success){
////					if (MOST.config.Token.getUserType() !== me.USER_TYPE_INTERNAL && (StringUtil.isNullorEmpty(ptnrCodeVal) || StringUtil.isNullorEmpty(records[0].data.accNo))){
////						MessageUtil.warning(func, 'no_acc_err_msg');
////						return
////					}
////					else{
////						callback();
////					}	
////				}					
////			}
////		});
//		if(Token.getUserType() === me.USER_TYPE_INTERNAL){
//			callback();
//		} else {
//			var validationCodeStore = me.getStore('megaDetailValidationCode');
//			validationCodeStore.load({
//				params : {
//					tyCd : 'EXISTED_ACCOUNTNO_PTNR_VALIDATION',
//					col1 : Token.getPtnrCode()
//				},
//				
//				callback: function(records, operation, success) {
//					if (success) {
//						if(records != null && records.length > 0){
//							if(records[0].get('isValidated') === 'Y'){
//								callback();
//							} else {
//								MessageUtil.warning('warning_msg', 'ptnr_accoutno_msg');
//								return;
//							}
//						} else {
//							MessageUtil.warning('warning_msg', 'ptnr_accoutno_msg');
//							return;
//						}
//					}
//				}
//			});
//		}
//	},
//
//	// Submit Mega
//	onSubmitMega : function(){
//		var me = this;
//		var refs = me.getReferences();
//		
//		//Check validate time stevedore
//		var isShftTimeStv = me.validateRequisitionTime2('Stv');
//		if (!isShftTimeStv){
//			return;
//		}
//		//Check validate time trimming
//		var isShftTimeTrim = me.validateRequisitionTime2('Trim');
//		if (!isShftTimeTrim){
//			return;
//		}
//		
//    	var win = refs.refBtnSubmitMega.up('window');
//		if(win){
//			win.getEl().mask('Process data...');
//		}
//		
//		if(!me.validateCompany()){
//			if(win){
//				win.getEl().unmask();
//			}
//			
//			return;
//		}			
//		
//		me.validatePaymentAccount('submitMegaReq', function() {
//			return me.validationSubmitAmendCancel(me.submitMega)
//		});	
//		
//	},
//	
//	onResubmitMega : function(){
//		var me = this;
//		me.onSubmitMega();
//	},
//	
//	// Approval Mega
//	onApprovalMega : function(){
//		var me = this;
//		var refs = me.getReferences();
//		var detailView = me.getDetailBizView();
//		var recvData = detailView.items.get(0).recvData;
//		
//		if(recvData.get('statCd') === me.STAT_APPROVED &&
//		   StringUtil.isNullorEmpty(refs.ctlDetailRemark.getValue())){
//			MessageUtil.warning('warning_msg', 'megadetail_remark_changed_msg');
//			refs.ctlMegaDetailTabPanel.setActiveItem(0); // Vessel Schedule
//															// Tab
//			refs.ctlDetailRemark.focus();
//		} else {
//			me.serverSend(me.STAT_APPROVED);
//		}
//	},
//	
//	// Reject Mega
//	onRejectMega : function(){
//		var me = this;
//		var refs = me.getReferences();
//		var detailView = me.getDetailBizView();
//		var recvData = detailView.items.get(0).recvData;
//		
//		if(StringUtil.isNullorEmpty(refs.ctlDetailRejectRemark.getValue())){
//			MessageUtil.warning('warning_msg', 'mandatoryField_msg', 'CSC Remark');
//			refs.ctlMegaDetailTabPanel.setActiveItem(0); // Vessel Schedule
//															// Tab
//			refs.ctlDetailRejectRemark.focus();
//		} else {
//			me.serverSend(me.STAT_REJECT);
//		}
//	},
//	
//	// Cancel Mega
//	onCancelMega : function(){
//		var me = this;
//		me.validationSubmitAmendCancel(me.cancelMega);
//	},
//	
//	// Amend Mega
//	onAmendMega : function(){
//		var me = this;
//		me.validationSubmitAmendCancel(me.amendMega);
//	},
//	
//	// Approval Cancelation Mega (56267)
//	onApprovalCancellationMega : function(){
//		var me = this;
//		if(me.deployedYN === "Y"){
//			MessageUtil.warning('warning_msg', 'megadetail_RejectRequestCancel_msg');
//			return;
//		}
//		me.serverSend(me.STAT_CANCEL);
//	},
//	
//	// Reject Cancelation Mega (56267)
//	onRejectCancellationMega : function(){
//		var me = this;
//		me.serverSend(me.STAT_APPROVED);
//	},
//
//	/**
//	 * Validation Submit, Amend, Cancel flex - validationSubmit(),
//	 * validationAmend(), validationCacel() integration
//	 */
//	validationSubmitAmendCancel : function(execFunc){
//		var me = this;
//		var refs = me.getReferences();
//		var detailView = me.getDetailBizView();
//		var vslItem = me.getViewModel().get('theVsl');
//		var validationCodeStore = me.getStore('megaDetailValidationCode');
//		var recvData = detailView.items.get(0).recvData;
//		var validationMsg = '';
//		
//		// if user does not input data in any tab, System will not allow user to
//		// submit Mega
//		var intGridRowGears = refs.refMegaDetailGearsGrid.getStore().getCount();
//		var intGridRowForklift = refs.refMegaDetailForkliftGrid.getStore().getCount();
//		var intGridRowTrailer = refs.refMegaDetailTrailerGrid.getStore().getCount();
//		var intGridRowMechanical = refs.refMegaDetailMechanicalGrid.getStore().getCount();
//		var intGridRowPortCrn = refs.refMegaDetailPortCraneGrid.getStore().getCount();
//		if(refs.ctlDetailPurpose.getValue() == 'MP0001'){
//			if(refs.ctlMegaDetailWhAppr.getValue() == true){
//				recvData.set('whApprYn','Y');
//			}else{
//				recvData.set('megaWhYn', 'Y');
//			}
//			
//		}
//		
////		if(refs.ctlDetailMegaStedoreCompany.getValue() !== '' ||
////			refs.ctlDetailMegaStedoreLashingCompany.getValue() !== '' ||
////			refs.ctlDetailMegaStedoreTallyCompany.getValue() == '' ||
////			refs.ctlDetailMegaStedoreTrimmingCompany.getValue() == '' ||){
////			
////		}
//		
////		if(
////			 refs.ctlDetailMegaStedoreCompany.getValue() == '' &&
////			 refs.ctlDetailMegaStedoreNosofGang.getValue() == '' &&
////			 refs.ctlStevedoreWorkingArea.getValue() == '' &&
////			 refs.ctlDetailMegaStedoreLashingCompany.getValue() == '' &&
////			 refs.ctlDetailMegaStevedoreLashingWorkingArea.getValue() == '' &&
////			 refs.ctlDetailMegaStevedoreNofStvdSprr.getValue() == '' &&
////			 refs.ctlDetailMegaStedoreTallyCompany.getValue() == '' &&
////			 refs.ctlWorkingAreaTally.getValue() == '' &&
////
////			// refs.ctlDetailCommodity.getValue() == '' &&
////			// refs.ctlDetailCgTpCd.getValue() == '' &&
////			// refs.ctlDetailCargoTonnage.getValue() == '' &&
////			// refs.ctlDetailRemark.getValue() == '' &&
////
////			 refs.ctlDetailMegaStedoreTrimmingCompany.getValue() == '' &&
////			 refs.ctlTrimmingWorkingArea.getValue() == '' &&
////			 refs.cltTrimmingNosofHatch.getValue() == '' &&
////			 refs.ctlTrimmingNofTrmgSprr.getValue() == '' &&
////			 refs.ctlTrimmingNofSglmn.getValue() == '' &&
////			 refs.ctlTrimmingNofDekmn.getValue() == '' &&
////			 refs.ctlTrimmingNofHopmn.getValue() == '' &&
////			 refs.ctlTrimmingNofTrmgGwker.getValue() == '' &&
////
////			intGridRowGears <= 0 && 
////			intGridRowForklift <= 0 && 
////			intGridRowTrailer <=0 && 
////			intGridRowMechanical <=0 && 
////			intGridRowPortCrn <=0){
////			
////		    	var win = refs.refBtnSubmitMega.up('window');
////				if(win){
////					//win.getEl().mask('Process data...');
////					win.getEl().unmask();
////				}
////			
////				MessageUtil.warning('warning_msg', 'In other to submit Mega,You must input data at least one tab.')
////				return;
////		}
//		
//		//Update by Harry
//		if(
//				(refs.ctlDetailCommodity.getValue() == '' ||	
//				refs.ctlDetailCgTpCd.getValue() == '' ||	
//				refs.ctlDetailCargoTonnage.getValue() == 0 ||	
//				refs.ctlDetailRemark.getValue() == '') &&			
//				refs.ctlDetailMegaStedoreCompany.getValue() == '' &&
//				refs.ctlDetailMegaStedoreNosofGang.getValue() == '' &&
//				refs.ctlStevedoreWorkingArea.getValue() == '' &&
//				refs.ctlDetailMegaStevedoreNofStvdSprr.getValue() == '' &&
//
//				intGridRowGears <= 0 && 
//				intGridRowForklift <= 0 && 
//				intGridRowTrailer <=0 && 
//				intGridRowMechanical <=0){
//					MessageUtil.warning('warning_msg', 'In other to submit Mega,You must input data at least one tab.')
//					return;
//			}
//		
//		//---------------------------
//		if(me.USER_TYPE === CONSTANTS.USER_TYPE_EXTERNAL){
//			if(vslItem.get('bbtLoc') === 'BBT'){
//				if(vslItem.get('cgTpCd') === 'BT'){
//					validationMsg = 'megadetail_batter_trade_vessel_msg';
//				} else {
//					validationMsg = 'megadetail_submit_before_document_msg';
//				}
//				
//				validationCodeStore.load({
//					params : {
//						tyCd : 'createDocument',
//						col1 : vslItem.get('vslCallId'),
//						col2 : vslItem.get('cgTpCd')
//					},
//					
//					callback: function(records, operation, success) {
//						if (success) {
//							if(records != null && records.length > 0){
//								if(records[0].get('isValidated') === 'Y'){
//									execFunc(me);
//								} else {
//									MessageUtil.warning('warning_msg', validationMsg, vslItem.get('configDoc'));
//								}
//							} else {
//								MessageUtil.warning('warning_msg', validationMsg, vslItem.get('configDoc'));
//							}
//						}
//					}
//				});
//			} else {
//				execFunc(me);
//			}
//		} else {
//			execFunc(me);
//		}
//	},
//	
//	// Cancel Mega
//	cancelMega : function(me){
//		var detailView = me.getDetailBizView();
//		var recvData = detailView.items.get(0).recvData;	
//		var refs = me.getReferences();
//		
//		if(recvData.get('statCd') === me.STAT_APPROVED){
//			// Modified for issue 56267
//			var parmWn = '';
//			var intGridRowGears = refs.refMegaDetailGearsGrid.getStore().getCount();
//			var intGridRowForklift = refs.refMegaDetailForkliftGrid.getStore().getCount();
//			var intGridRowTrailer = refs.refMegaDetailTrailerGrid.getStore().getCount();
//			var intGridRowMechanical = refs.refMegaDetailMechanicalGrid.getStore().getCount();
//			var intGridRowPortCrn = refs.refMegaDetailPortCraneGrid.getStore().getCount();
//			
//			if(me.lookupReference('ctlDetailMegaStedoreCompany').getValue() != '' || me.lookupReference('ctlDetailMegaStedoreLashingCompany').getValue() != '') {
//				parmWn += "Stevedore has been approved. If you continue, It will be charged.";
//			}
//			if(intGridRowGears >0 || intGridRowForklift >0 || intGridRowTrailer >0 || intGridRowMechanical >0 || intGridRowPortCrn >0){
//				parmWn += "\nThis MEGA has been approved and if you still continue, CSC will reject the request if deployment arrangement has been made.";	
//			}
//			
//			MessageUtil.question('info_msg', 'megadetail_requestCancel_msg', parmWn, 
//					function(button){
//						if (button === 'ok') {
//							me.checkCancelMegaPenalty();
//				        }
//					}
//			);
//		} else {
//			me.checkCancelMegaPenalty();
//		}
//	},
//	
//	// Check Cancel
//	checkCancelMegaPenalty : function(){
//		var me = this;
//		var refs = me.getReferences();
//		var masterItem = me.getViewModel().get('theMain');
//		var penaltyStore = me.getStore('megaDetailPenalty');
//		
//		penaltyStore.load({
//			params : {
//				searchType : 'penalty',
//				megaNo : masterItem.get('megaNo'),
//				penaltyTp : me.PNLT_CA
//			},
//			
//			callback: function(records, operation, success) {
//				if (success) {
//					if(records.length > 0){
//						if(records[0].get('penaltyCd') != 'N'){
//							var messageParm = '';
//							
//							if(records[0].get('penaltyCd') === 'LB1'){
//								messageParm = 'Cancellation for Shift 1';
//							} else if(records[0].get('penaltyCd') === 'LB3'){
//								messageParm = 'Cancellation for Shift 3';
//							} else {
//								messageParm = records[0].get('penaltyNm');
//							}
//								
//							MessageUtil.question('info_msg', 'megadetail_penalty_carged_msg', messageParm, 
//								function(button){
//									if (button === 'ok') {
//										// modified for issue 56267
//										// me.serverSend(me.STAT_CANCEL);
//										if(masterItem.get('statCd') === me.STAT_APPROVED)
//											me.serverSend(me.STAT_REQUEST_CANCELED);
//										else
//											me.serverSend(me.STAT_CANCEL);
//							        }
//								}
//							);
//						} else {
//							// modified for issue 56267
//							// me.serverSend(me.STAT_CANCEL);
//							if(masterItem.get('statCd') === me.STAT_APPROVED)
//								me.serverSend(me.STAT_REQUEST_CANCELED);
//							else
//								me.serverSend(me.STAT_CANCEL);
//						}
//					}
//				}
//			}
//		});
//	},
//	
//	// Amend Mega
//	amendMega : function(me){
//		var refs = me.getReferences();
//		var masterItem = me.getViewModel().get('theMain');
//		var penaltyStore = me.getStore('megaDetailPenalty');
//		var nofGang = refs.ctlDetailMegaStedoreNosofGang.getValue();
//		
//		penaltyStore.load({
//			params : {
//				searchType : 'penalty',
//				megaNo : masterItem.get('megaNo'),
//				nofGang : nofGang,
//				penaltyTp : me.PNLT_AD
//			},
//			
//			callback: function(records, operation, success) {
//				if (success) {
//					if(records.length > 0){
//						if(records[0].get('penaltyCd') != 'N'){
//							var messageParm = '';
//							
//							if(records[0].get('penaltyCd') === 'LB1'){
//								messageParm = 'Amendment for Shift 1';
//							} else if(records[0].get('penaltyCd') === 'LB3'){
//								messageParm = 'Amendment for Shift 3';
//							} else {
//								messageParm = records[0].get('penaltyNm');
//							}
//								
//							MessageUtil.question('info_msg', 'megadetail_penalty_carged_msg', messageParm, 
//								function(button){
//									if (button === 'ok') {
//										me.CURRENT_VIEW_TYPE = me.VIEW_TYPE_AMEND;
//										me.serverSend(me.STAT_SUBMIT);
//							        }
//								}
//							);
//						} else {
//							me.CURRENT_VIEW_TYPE = me.VIEW_TYPE_AMEND;
//							me.serverSend(me.STAT_SUBMIT);
//						}
//					}
//				}
//			}
//		});
//	},
//	
//	// Submit Mega
//	submitMega : function(me){
//		var detailView = me.getDetailBizView();
//		var recvData = detailView.items.get(0).recvData;
//		
//		if(recvData.get('statCd') === me.STAT_CREATE ||
//		   me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_CREATE){
//			me.validationExistsPayer();
//		} else {
//			me.processSubmitMega(me.PNLT_LB);
//		}
//	},
//	
//	// Validation Exists Player
//	validationExistsPayer : function(){
//		var me = this;
//		var validationCodeStore = me.getStore('megaDetailValidationCode');
//		
//		validationCodeStore.load({
//			params : {
//				tyCd : 'checkMegaPayer',
//				col1 : MOST.config.Token.getUserId()
//			},
//			
//			callback: function(records, operation, success) {
//				if (success) {
//					if(records != null && records.length > 0){
//						if(records[0].get('isValidated') === 'Y'){
//							me.validationVesselAgent(); // Validation Vessel
//														// Agent
//						} else {
//							MessageUtil.warning('warning_msg', 'megadetail_validation_payer_msg');
//						}
//					} else {
//						MessageUtil.warning('warning_msg', 'megadetail_validation_payer_msg');
//					}
//				}
//				
//			}
//		});
//	},
//	
//	// Validation Vessel Agent
//	validationVesselAgent : function(){
//		var me = this;
//		var vslItem = me.getViewModel().get('theVsl');
//		var validationCodeStore = me.getStore('megaDetailValidationCode');
//		var refs = me.getReferences();
//		validationCodeStore.load({
//			params : {
//				tyCd : 'checkShipgAgent',
//				col1 : vslItem.get('vslCallId'),
//				col2 : MOST.config.Token.getUserId()
//			},
//			
//			callback: function(records, operation, success) {
//				if (success) {
//					if(records != null && records.length > 0){
//						if(records[0].get('isValidated') === 'Y'){
//							me.processSubmitMega('C_MEGA');
//						} else {
//							MessageUtil.warning('warning_msg', 'megadetail_submit_vessel_msg');
//						}
//					} else {
//						MessageUtil.warning('warning_msg', 'megadetail_submit_vessel_msg');
//					}
//				}
//	        	var win = refs.refBtnSubmitMega.up('window');
//	    		if(win){
//	    			win.getEl().unmask();
//	    		}
//			}
//		});
//	},
//	
//	// Process Submit Mega
//	processSubmitMega : function(panaltyTpValue){
//		var me = this;
//		var refs = me.getReferences();
//		var masterItem = me.getViewModel().get('theMain');
//		var penaltyStore = me.getStore('megaDetailPenalty');
//		var nofGang = refs.ctlDetailMegaStedoreNosofGang.getValue();
//		var workYmd = masterItem.get('workYmd')==null?null:Ext.Date.format(masterItem.get('workYmd'), MOST.config.Locale.getShortDate());
//		
////		if(!masterItem.get('vslCallId')){
////			MessageUtil.warning('warning_msg', 'JPVC information is wrong. Please check again.');
////			return;
////		}
////		
////		if(masterItem.get('vslCallId') !== refs.ctlDetailJpvc.getValue()){
////			MessageUtil.warning('warning_msg', 'JPVC information is wrong. Please check again.');
////			return;
////		}
////		
//		penaltyStore.load({
//			params : {
//				searchType : 'penalty',
//				workYmd : workYmd,
//				shftId: masterItem.get('shftId'),
//				purpTpCd : masterItem.get('purpTpCd'),
//				nofGang : nofGang,
//				penaltyTp : panaltyTpValue
//			},
//			
//			callback: function(records, operation, success) {
//				if (success) {
//					if(records.length > 0){
//						if(records[0].get('penaltyCd') != 'N'){
//							MessageUtil.question('info_msg', 'megadetail_penalty_charged_msg', records[0].get('penaltyNm'), 
//								function(button){
//									if (button === 'ok') {
//										me.sendSubmit();
//							        } else if(button === 'cancel'){
//							        	
//							        };
//								}
//							);
//						} else {
//							me.sendSubmit();
//						}
//					}
//				}
//
//	        	var win = refs.refBtnSubmitMega.up('window');
//	    		if(win){
//	    			win.getEl().unmask();
//	    		}
//			}
//		});
//	},
//	
//	// Send Submit
//	sendSubmit : function(){
//		var me = this;
//		var detailView = me.getDetailBizView();
//		var recvData = detailView.items.get(0).recvData;
//		
//		// In case of Warehouse
//		if(recvData.get('statCd') === 'RV'){
//			me.serverSend(me.STAT_REVIEW);
//		} else {
//			me.serverSend(me.STAT_SUBMIT);
//		}
//	},
//	/**
//	 * DETAIL END
//	 * =========================================================================================================================
//	 */
//
//	/**
//	 * =========================================================================================================================
//	 * Equipment Grid Common (Gears, Forklift, Trailer, Mechanical, PortCrane)
//	 * START
//	 */
//	// Renderer Capacity
//	rendererCapacityGear : function(value, metaData, record, rowIndex, colIndex, store) {
//		var me = this;
//		var capacityCombo = me.getStore('megaDetailGearsCapacityCombo');
//		
//		var capaValue = '';
//		if(value != ''){
//			if(metaData.column.dataIndex == 'capaCd'){
//				capaValue = capacityCombo.findRecord('capaCd', value).get('capaDescr')
//			}
//		}
//		if(me.hasAuthApproval){
//			if(record.get('operInfoItems') && record.get('operInfoItems').length > 0){
//				return Ext.String.format('<span style="color:{0}">{1}</span>', 'black', capaValue);
//			} else {
//				return Ext.String.format('<span style="color:{0}">{1}</span>', 'red', capaValue);
//			}
//		} else {
//			return capaValue;
//		}
//	},
//	
//	rendererCapacityForkLift : function(value, metaData, record, rowIndex, colIndex, store) {
//		var me = this;
//		var capacityCombo = me.getStore('megaDetailForkliftCapacityCombo');
//		
//		var capaValue = '';
//		if(value != ''){
//			if(metaData.column.dataIndex == 'capaCd'){
//				capaValue = capacityCombo.findRecord('capaCd', value).get('capaDescr')
//			}
//		}
//		if(me.hasAuthApproval){
//			if(record.get('operInfoItems') && record.get('operInfoItems').length > 0){
//				return Ext.String.format('<span style="color:{0}">{1}</span>', 'black', capaValue);
//			} else {
//				return Ext.String.format('<span style="color:{0}">{1}</span>', 'red', capaValue);
//			}
//		} else {
//			return capaValue;
//		}
//	},
//	
//	rendererCapacityTrailer : function(value, metaData, record, rowIndex, colIndex, store) {
//		var me = this;
//
//		var capacityCombo = me.getStore('megaDetailTrailerCapacityCombo');
//		
//		var capaValue = '';
//		if(value != ''){
//			if(metaData.column.dataIndex == 'capaCd'){
//				capaValue = capacityCombo.findRecord('capaCd', value).get('capaDescr')
//			}
//		}
//		if(me.hasAuthApproval){
//			if(record.get('operInfoItems') && record.get('operInfoItems').length > 0){
//				return Ext.String.format('<span style="color:{0}">{1}</span>', 'black', capaValue);
//			} else {
//				return Ext.String.format('<span style="color:{0}">{1}</span>', 'red', capaValue);
//			}
//		} else {
//			return capaValue;
//		}
//	},
//	
//	rendererCapacityMechanical : function(value, metaData, record, rowIndex, colIndex, store) {
//		var me = this;
//		
//		var capacityCombo = me.getStore('megaDetailMechanicalCapacityCombo');
//		
//		var capaValue = '';
////		if(capacityCombo.getCount() > 0){
////			if(value != '')
////			{
////				if(metaData.column.dataIndex == 'capaCd'){
////					capaValue = capacityCombo.findRecord('capaCd', value).get('capaDescr')
////				}		
////			}						
////		}
////		else {
////			// if capacity combo hasn't loaded, get value from record
////			capaValue = record.getData().capaDescr;	
////		}
////		
//		capaValue = record.getData().capaDescr;	
//		
//		if(me.hasAuthApproval){
//			if(record.get('operInfoItems') && record.get('operInfoItems').length > 0){
//				return Ext.String.format('<span style="color:{0}">{1}</span>', 'black', capaValue);
//			} else {
//				return Ext.String.format('<span style="color:{0}">{1}</span>', 'red', capaValue);
//			}
//		} else {
//			return capaValue;
//		}
//	},
//	
//	rendererCapacityPortCrane : function(value, metaData, record, rowIndex, colIndex, store) {
//		var me = this;
//		
////		var capacityCombo = me.getStore('megaDetailPortCraneCapacityCombo');
//		var capaValue = '';
//
////		if(capacityCombo.getCount() > 0){
////			// value can be null here in ShipCrane case
////			if(metaData.column.dataIndex == 'capaCd'){
////				capaValue = capacityCombo.findRecord('capaCd', value).get('capaDescr')
////			}					
////		}
////		else {
////			// if capacity combo hasn't loaded, get value from record
////			capaValue = record.getData().capaDescr;	
////		}
//
//		capaValue = record.getData().capaDescr;
//		if(me.hasAuthApproval){
//			if(record.get('operInfoItems') && record.get('operInfoItems').length > 0){
//				return Ext.String.format('<span style="color:{0}">{1}</span>', 'black', capaValue);
//			} else {
//				return Ext.String.format('<span style="color:{0}">{1}</span>', 'red', capaValue);
//			}
//		} else {
//			return capaValue;
//		}
//	},
//
//	rendererEqDivPortCrane : function(value, metaData, record, rowIndex, colIndex, store) {
//		var me = this;
//		
//		var eqDivCombo = me.getStore('megaDetailEqTypeComboForPortCrane');
//		var eqValue = '';
//		if(value != ''){
//			if(metaData.column.dataIndex == 'eqDivCd'){				
//				if(value === 'SR'){
//					eqValue = 'Ship Crane'
//				}
//				else{
//					eqValue = eqDivCombo.findRecord('scd', value).get('scdNm')
//				}
//			}
//		}
//		
//		if(me.hasAuthApproval){
//			if(record.get('operInfoItems') && record.get('operInfoItems').length > 0){
//				return Ext.String.format('<span style="color:{0}">{1}</span>', 'black', eqValue);
//			} else {
//				return Ext.String.format('<span style="color:{0}">{1}</span>', 'red', eqValue);
//			}
//		} else {
//			return eqValue;
//		}
//	},
//	// Grid Edit
//	onEdit : function(editor, context){
//		context.record.data.workingStatus = context.record.crudState;
//	},
//	
//	// Grid Validate Edit
//	onValidateEdit : function(editor, context) {
//		var me = this;
//	},
//	
//	// Grid Cancel Edit
//	onCancelEdit : function(rowEditing, context) {
//		var me = this;
//
//		if (context.record.phantom) {
//			context.store.remove(context.record);
//		}
//	},
//	
//	// Validate Equipment Grid Check
//	validateEqupmentGridCheck:function(bizName){
//		var me = this;
//		var store = me.getStore(Ext.String.format('megaDetail{0}', bizName));
//		var companyQty = 0;
//		var returnValue = true;
//		
//		store.each(function(record, index, array){
//			if(record.get('flStatus') !== 'N' && returnValue === true){
//				if(me.hasAuthApproval){
//					if(record.get('operInfoItems') == null || record.get('operInfoItems').length <= 0){
//						MessageUtil.warning('warning_msg', 'megadetail_equipment_not_deployed_yet_msg', bizName);
//						returnValue = false;
//						return false;
//					}
//				}
//					
//				if(record.get('operInfoItems')){
//					record.get('operInfoItems').forEach(function(recordOperInfo, index){
//						if(recordOperInfo.constructor === (new Ext.data.Model()).constructor){
//							companyQty += recordOperInfo.get('nofOpe');
//						} else {
//							companyQty += recordOperInfo.nofOpe;
//						}
//					});
//					
//					if(record.get('confmQty') != companyQty){
//						MessageUtil.warning('warning_msg', 'megadetail_equipment_company_check_msg', bizName);
//						returnValue = false;
//						return false;
//					}
//					
//					companyQty = 0;
//				}
//			}
//		});
//		
//		return returnValue;
//	},
//	
//	initDefaultReqTime: function(bizName){
//		var me = this;
//		var refs = me.getReferences();
//		var shift = refs.ctlDetailMegaShift.getValue();
//
//		if (StringUtil.isNullorEmpty(shift))
//			return
//		me.setDefaultRequisitionTime('Gears');
//		me.setDefaultRequisitionTime('Forklift');
//		me.setDefaultRequisitionTime('Trailer');
//		me.setDefaultRequisitionTime('Mechanical');
//		me.setDefaultRequisitionTime('PortCrane');
//	},
//
//	setDefaultRequisitionTime: function(bizName){
//		var me = this;
//		var refs = me.getReferences();
//		var refTimeHr = me.lookupReference(Ext.String.format('reqTimeHr{0}', bizName));		
//		var refTimeMin = me.lookupReference(Ext.String.format('reqTimeMin{0}', bizName));
//		var shiftStartTime = me.getShiftStartTime();
//
//		refTimeHr.setValue(shiftStartTime.slice(0,2));
//		refTimeMin.setValue(shiftStartTime.slice(2,4))
//	},
//
//	validateRequisitionTime: function(bizName){
//		var me = this;
//		var refs = me.getReferences();
//
//		if(!refs.ctlDetailMegaShift.getValue()){
//			MessageUtil.alert('Information', 'Please select the shift first');
//			return 
//		}
//		var refTimeHr = me.lookupReference(Ext.String.format('reqTimeHr{0}', bizName));		
//		var refTimeMin = me.lookupReference(Ext.String.format('reqTimeMin{0}', bizName));	
//		//Get Shift Date Time
//		var megaWorkYmd = refs.ctlDetailMegaWorkYmd.rawValue;
//		var shiftId = refs.ctlDetailMegaShift.getValue();
//		var shiftStartTime = Ext.Date.parse(megaWorkYmd + ' ' + me.getShiftStartTime().substr(0,2) + ':' + me.getShiftStartTime().substr(2,2),  'd/m/Y H:i');
//		var shiftEndTime = Ext.Date.parse(megaWorkYmd + ' ' + me.getShiftEndTime().substr(0,2) + ':' + me.getShiftEndTime().substr(2,2),  'd/m/Y H:i');
//		
//		var timeHr = (refTimeHr.getValue() < 10)? '0' + refTimeHr.getValue().toString() : refTimeHr.getValue().toString();
//		var timeMin = (refTimeMin.getValue() < 10)? '0' + refTimeMin.getValue().toString() : refTimeMin.getValue().toString();
//		var curTime = timeHr + ':' + timeMin;
//
//        var reqTime = Ext.Date.parse(megaWorkYmd + ' ' + curTime, 'd/m/Y H:i');
//
//        if(shiftId == 'SF0013'){
//			shiftEndTime.setDate(shiftEndTime.getDate() + 1);
//		}
//		
//        // Modified by Harry
//        if(shiftId != 'SF0013'){
//        	if(reqTime < shiftStartTime ||  reqTime> shiftEndTime){
//     			MessageUtil.alert('Warning', 'vsrchecklist_start_shift_time__msg');
//    			return false;
//    		}
//        }else{
//        	reqTime.setDate(reqTime.getDate() + 1);
//        	if(reqTime > shiftEndTime){
//        		if(refTimeHr.getValue() != 23){
//        			MessageUtil.alert('Warning', 'vsrchecklist_start_shift_time__msg');
//        			return false;
//        		}    			
//    		}
//        }
//
//// 		if(shiftId === "SF0014" || shiftId === "SF0012"){
//// 			if (curTime < shiftStartTime || curTime > shiftEndTime)
//// 				return false
//// 		}
//// 		else if (shiftId === "SF0013"){
//// 			if((curTime >= shiftStartTime && curTime > shiftEndTime) || (curTime <= shiftEndTime &&  curTime < shiftStartTime))
//// 				return false
//// 		}
//		return true
//	},
//	
//	
//	validateRequisitionTime2: function(bizName){
//		var me = this;
//		var refs = me.getReferences();
//
//		if(!refs.ctlDetailMegaShift.getValue()){
//			MessageUtil.alert('Information', 'Please select the shift first');
//			return 
//		}
//		var refTimeHr = me.lookupReference(Ext.String.format('ctl{0}ReqHh', bizName));		
//		var refTimeMin = me.lookupReference(Ext.String.format('ctl{0}ReqMm', bizName));	
//		//Get Shift Date Time
//		var megaWorkYmd = refs.ctlDetailMegaWorkYmd.rawValue;
//		var shiftId = refs.ctlDetailMegaShift.getValue();
//		var shiftStartTime = Ext.Date.parse(megaWorkYmd + ' ' + me.getShiftStartTime().substr(0,2) + ':' + me.getShiftStartTime().substr(2,2),  'd/m/Y H:i');
//		var shiftEndTime = Ext.Date.parse(megaWorkYmd + ' ' + me.getShiftEndTime().substr(0,2) + ':' + me.getShiftEndTime().substr(2,2),  'd/m/Y H:i');
//		
//		var timeHr = (refTimeHr.getValue() < 10)? '0' + refTimeHr.getValue().toString() : refTimeHr.getValue().toString();
//		var timeMin = (refTimeMin.getValue() < 10)? '0' + refTimeMin.getValue().toString() : refTimeMin.getValue().toString();
//		var curTime = timeHr + ':' + timeMin;
//
//        var reqTime = Ext.Date.parse(megaWorkYmd + ' ' + curTime, 'd/m/Y H:i');
//
//        if(shiftId == 'SF0013'){
//			shiftEndTime.setDate(shiftEndTime.getDate() + 1);
//		}
//		
//        // Modified by Harry
//        if(shiftId != 'SF0013'){
//        	if(reqTime < shiftStartTime ||  reqTime> shiftEndTime){
//     			MessageUtil.alert('Warning', 'vsrchecklist_start_shift_time__msg');
//    			return false;
//    		}
//        }else{
//        	reqTime.setDate(reqTime.getDate() + 1);
//        	if(reqTime > shiftEndTime){
//        		if(refTimeHr.getValue() != 23){
//        			MessageUtil.alert('Warning', 'vsrchecklist_start_shift_time__msg');
//        			return false;
//        		}    			
//    		}
//        }
//
//// 		if(shiftId === "SF0014" || shiftId === "SF0012"){
//// 			if (curTime < shiftStartTime || curTime > shiftEndTime)
//// 				return false
//// 		}
//// 		else if (shiftId === "SF0013"){
//// 			if((curTime >= shiftStartTime && curTime > shiftEndTime) || (curTime <= shiftEndTime &&  curTime < shiftStartTime))
//// 				return false
//// 		}
//		return true
//	},
//
//	getShiftStartTime: function(){
//		var me = this;
//		var refs = me.getReferences();
//		// var workYmd = Ext.Date.format(refs.txtWorkYmd.getValue(),"dmY")
//		var shiftListStore = me.getStore('megaRequisitionShiftCombo');
//		var shiftData = shiftListStore.findRecord('shftId', refs.ctlDetailMegaShift.getValue())
//		var fmHhmm = (shiftData)? shiftData.get('fmHhmm'): null;
//		// if(fmHhmm == "2300")
//		// 	fmHhmm = '0000';
//		return fmHhmm
//	},
//
//	getShiftEndTime: function(){
//		var me = this;
//		var refs = me.getReferences();
//		// var workYmd = Ext.Date.format(refs.txtWorkYmd.getValue(),"dmY");
//		var shiftListStore = me.getStore('megaRequisitionShiftCombo');
//		var shiftData = shiftListStore.findRecord('shftId', refs.ctlDetailMegaShift.getValue())
//		var toHhmm =  (shiftData)? shiftData.get('toHhmm'): null;
//		// if(toHhmm == "0659")
//		// toHhmm = '2359';
//
//		// if(refs.txtWorkYmd.getValue().getDay() === 5 && shiftData.get('shiftId') === 'SF0014'){
//		// 	toHhmm = '1244';
//		// }
//		// var endTime = Ext.Date.parse(workYmd.concat(toHhmm),"dmYHi");
//		return toHhmm
//	},
//
//	// Cargo Detail Data
//	getModifyDataForCargoDetail:function(cargoDetail){
//		var me = this;
//		var refs = me.getReferences();
//		var cargoDetailInfo = me.getStore('megaDetailCargoDetailInfo');
//		var updateItems = new Array();
//		
//		for(var i = 0; i< cargoDetail.data.length; i ++){
//			var cargoItem = cargoDetail.data.getAt(i);
//			
//			for(var j = 1; j <= 12; j++){
//				var inputedValue = cargoItem.get(Ext.String.format('hatchNo{0}', + new String(j)));
//				if(inputedValue){
//					var bChanged = false;
//					for(var k = 0; k < cargoDetailInfo.data.length; k++){
//						var detailInfoItem =  cargoDetailInfo.data.getAt(k);
//						if(new String(j)[0] === detailInfoItem.data.hatchNo && cargoItem.data.cd === detailInfoItem.data.cgDescCd){
//							if(inputedValue !== detailInfoItem.data.cgDescVal){
//								var record = Ext.create('MOST.model.planning.MegaCargoDetail');
//								record.set('cgDescCd', detailInfoItem.data.cgDescCd);
//								record.set('cgDescNm', detailInfoItem.data.cgDescNm);
//								record.set('cgDescVal', inputedValue);
//								record.set('hatchNo', detailInfoItem.data.hatchNo);
//								record.set('megaNo', cargoItem.data.megaNo);								
//								record.set('crudState', 'U');	
//								updateItems.push(record.data);
//								bChanged = true;
//							}
//
//						}
//					}
//					if(!bChanged){
//						var record = Ext.create('MOST.model.planning.MegaCargoDetail');
//						record.set('cgDescCd', cargoItem.data.cd);
//						record.set('cgDescNm', cargoItem.data.cdNm);
//						record.set('cgDescVal', inputedValue);
//						record.set('hatchNo', new String(j)[0]);
//						record.set('megaNo', cargoItem.data.megaNo);
//						updateItems.push(record.data);
//					}	
//				}
//			}
//		}
//		return { updateItems };
//	},
//	
//	// Equipment CUD Data
//	getModifyDataForEquipment:function(bizName){
//		var me = this;
//		var updateItems = new Array();
//		var compayItems = new Array();
//		var temp;
//		var store = me.getStore(Ext.String.format('megaDetail{0}', bizName));
//		
//		// CREATE, UPDATE RECORD
//		for(var i = 0; i < store.data.length; i++){
//			var record = store.data.items[i];
//			if(record.get('operInfoItems')){
//				record.get('operInfoItems').forEach(function(recordOperInfo, index){
//					if(recordOperInfo.dirty){
//						recordOperInfo.commit();
//						compayItems.push(recordOperInfo.data);
//						record.dirty = true;
//					}
//				});
//			}
//			
//			if(record.get('operInfoDevareItems')){
//				record.get('operInfoDevareItems').forEach(function(recordOperInfo, index){
//					compayItems.push(recordOperInfo.data);
//					record.dirty = true;
//				});
//			}
//			
//			if(me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_CREATE ||
//			   me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_COPY){
//				record.set('workingStatus', WorkingStatus.INSERT);
//			}
//			
//			if(record.dirty){
//				temp = record.copy();
//				record.set('operInfoDevareItems', null);
//				devare temp.data.operInfoDevareItems;
//				devare temp.data.operInfoItems;
//				updateItems.push(temp.data);
//			}
//		}
//		
//		// DEvarE RECORD
//		store.getRemovedRecords().forEach(function(record, index, array){
//			updateItems.push(record.data);
//		});
//		
//		return { updateItems, compayItems };
//	},
//	
//	// Equipment Grid Remove Equipment
//	onGridRemoveForEquipment: function(bizName) {
//		var me = this;
//		var grid = me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
//		var store = me.getStore(Ext.String.format('megaDetail{0}', bizName));		
//		var selection = grid.getSelection() == null ? null : grid.getSelection();
//		
//		if(selection == null) return;
//		
//		Ext.each(selection, function (record) {
//			record.set('workingStatus', WorkingStatus.DEvarE);
//			store.remove(record);
//		});
//	},
//	
//	onGridUpdateForEquipment: function(bizName) {
//		var me = this;
//		var refs= me.getReferences();
//		var grid = me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
//		var store = me.getStore(Ext.String.format('megaDetail{0}', bizName));		
//		var selection = grid.getSelection() == null ? null : grid.getSelection();
//		
//		if(selection == null) return;
//
//		var reqEditable = me.isEditableDetailGridTab();
//		if(!reqEditable){
//			var userMode = 'INTERNAL'
//		}
//		else{
//			var userMode = 'EXTERNAL'
//		}
//
//		var record = selection[0];
//		if(record.get('workingStatus') !== WorkingStatus.INSERT){
//			record.set('workingStatus', WorkingStatus.UPDATE);
//		}
//		var editFields = me.EQUIPMENT_CREATE_UPDATE_FIELD_CONFIG[bizName];
//		
//		try{
//			if(!me.isAmendVisible)
//			{
//				var keys = Object.keys(editFields)
//				for (const key of keys){
//					
//					var formField = editFields[key];
//					
//					// Timefield
//					if (formField.includes(','))
//					{
//						if (userMode === 'EXTERNAL')
//						{
//							var hhField = refs[formField.split(',')[0]];
//							var mmField = refs[formField.split(',')[1]];
//
//							var hhFieldVal = hhField.getValue()
//																				
//							if (hhField && mmField){
//								
//								if(StringUtil.isNullorEmpty(hhField.getValue().toString()) || StringUtil.isNullorEmpty(mmField.getValue().toString()))
//								{	
//									throw 'mandatoryForm_msg'
//								}
//
//								var hhVal = (hhField.getValue() < 10)? '0' + hhField.getValue().toString() : hhField.getValue().toString();
//								var mmVal = (mmField.getValue() < 10)? '0' + mmField.getValue().toString() : mmField.getValue().toString();
//								var updateValue = hhVal + mmVal;
//							}
//						//}
//						//else if (userMode === 'INTERNAL'){
//							//var updateValue = me.TIME_FOR_SHIFT.replace(':','');
//						//	return;
//						}else{
//							return
//						}
//					}
//					// ShipCrane Tab
//					else if (bizName === 'PortCrane' && refs.ctlEqTypePortCrane.getChecked()
//					&& refs.ctlEqTypePortCrane.getChecked()[0].getSubmitValue() === 1
//					&& ((formField === 'cboEqTypePortCrane') || (formField === 'cboCapacityPortCrane'))){
//						if (formField === 'cboEqTypePortCrane'){
//							var updateValue = 'SR';
//						}
//						else if (formField === 'cboCapacityPortCrane')
//						{
//							var updateValue = '';
//						}
//						else 
//							return
//					}
//					// Other fields
//					else if (refs[formField] && !refs[formField].hidden)
//					{
//						if (!refs[formField].disabled && !refs[formField].hidden && (refs[formField].getValue() === null || refs[formField].getValue() === ''))
//						{
//							MessageUtil.warning('Information','Please fill in the required fields.');
//							return;
//						}				
//						var updateValue;
//						if(!refs[formField].hidden){ 
//							updateValue = refs[formField].getValue();
//						}
//					}
//					else {
//						continue
//					}
//					if(key === 'capaCd'){
//						record.set('capaDescr',refs[formField].getDisplayValue());
//					}
//					record.set(key,updateValue)
//				}
//			}
//			else{  // User can only change Req Qty in Amend mode
//				var updateValue = me.lookupReference(Ext.String.format('reqQtyField{0}', bizName));
//				record.set('reqQty',updateValue.getValue())
//			}
//		}
//		catch(err){
//			MessageUtil.warning('warning_msg',err)
//		}
//	},
//
//	// Equipment Company Tab
//	onGridRemoveForEquipmentCompany: function(bizName) {
//		var me = this;
//		var arrItems = new Array();
//		var masterGrid = me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
//		var grid = me.lookupReference(Ext.String.format('refMegaDetail{0}CompanyGrid', bizName));
//		var store = me.getStore(Ext.String.format('megaDetailTab{0}Company', bizName));		
//		var selection = grid.getSelection() == null ? null : grid.getSelection();
//		var masterSelection = masterGrid.getSelection() == null ? null : masterGrid.getSelection()[0];
//		var prevDirty;
//		
//		if(masterSelection != undefined){
//			if(selection == null) return;
//			
//			Ext.each(selection, function (record) {
//				if(record.data.workingStatus == null){
//					record.set('workingStatus', WorkingStatus.DEvarE);
//					
//					if(!masterSelection.get('operInfoDevareItems')){
//						masterSelection.set('operInfoDevareItems', new Array());
//					}
//			
//					prevDirty = masterSelection.dirty;
//					
//					// Relation Key
//					if(StringUtil.isNullorEmpty(masterSelection.get('relationKey'))){
//						masterSelection.set('relationKey', masterSelection.get('seq'));
//					}
//					
//					record.set('relationKey', masterSelection.get('relationKey'));
//					
//					masterSelection.get('operInfoDevareItems').push(record.copy());
//					masterSelection.dirty = prevDirty;
//				}
//				
//				store.remove(record);
//			});
//			
//			store.commitChanges();
//			
//			store.each(function(record, index){
//				arrItems.push(record);
//			});
//			
//			prevDirty = masterSelection.dirty;
//			masterSelection.set('operInfoItems', arrItems);
//			masterSelection.dirty = prevDirty;
//		}
//		
//	},
//	
//	// Update Form of Equipment
//	updateEquipmentForm: function(bizName) {		
//		var me = this;
//		var refs = me.getReferences();
//
//		var mainGrid = me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
//		var reqEditable = me.isEditableDetailGridTab();
//		var selection = mainGrid.getSelection() == null ? null : mainGrid.getSelection()[0];
//		
//		if (selection === null)
//			return
//
//		if(!reqEditable){
//			var userMode = 'INTERNAL'
//		}
//		else{
//			var userMode = 'EXTERNAL'
//		}
//		
//		try{
//			Ext.each(selection, function (record) {
//				var editFields = me.EQUIPMENT_CREATE_UPDATE_FIELD_CONFIG[bizName]
//				var keys = Object.keys(editFields)
//				
//				var isShpCrn = 0;
//				for (const key of keys){
//					var formField = editFields[key];
//					
//					var passValue = record.getData()[key];
//					
//					if (!formField.includes(',') && refs[formField].hidden)
//						continue
//								
//					// handle time field
//					if(formField.includes(',')){
//
//						var fieldHH = formField.split(',')[0];
//						var fieldMM = formField.split(',')[1];
//
//						if (userMode === 'EXTERNAL' && refs[fieldHH] && refs[fieldMM])
//						{								
//							refs[fieldHH].setValue(passValue.substring(0,2));						
//							refs[fieldMM].setValue(passValue.substring(2,4));
//						}
//						else{
//							continue
//						}
//
//					}
//					// Select ShipCrn if data is Ship Crane
//					else if(bizName === 'PortCrane' 
//					&& ((formField === 'cboEqTypePortCrane' && passValue === 'SR') 
//					|| (formField === 'cboCapacityPortCrane' && StringUtil.isNullorEmpty(passValue)))){	
//						isShpCrn++; 
//					}
//					else{
//						refs[formField].setValue(passValue);
//					}
//						
//							
//				}
//				if(refs.ctlEqTypePortCrane){
//					if (isShpCrn === 2){
//						refs.ctlEqTypePortCrane.setValue({radioRqBtn: 1});
//					}
//					else{
//						refs.ctlEqTypePortCrane.setValue({radioRqBtn: 2});
//					}
//				}
//				
//			
//			});
//
//			var isShftTime = me.validateRequisitionTime(bizName);
//			if (!isShftTime){
//				return;
//			}
//		}
//		catch (err){
//			MessageUtil.warning('warning_msg',err)
//		}
//
//
//		// //Update value of capacity combobox base on selection
//		// var cboCapacity =
//		// me.lookupReference(Ext.String.format('cboCapacity{0}', bizName));
//		// cboCapacity.setValue(selection.getData().capaCd);
//
//
//		// //Update value of working area field base on selection
//		// var ctlWorkingArea =
//		// me.lookupReference(Ext.String.format('ctlWorkingArea{0}', bizName));
//		// ctlWorkingArea.setValue(selection.getData().locId);
//
//		// if(!reqEditable){ //For Internal User account
//		// var confQtyField =
//		// me.lookupReference(Ext.String.format('confQtyField{0}', bizName));
//		// confQtyField.setValue(selection.getData().confmQty);
//		// }
//		// else{ //For SA account
//		// var reqQtyField =
//		// me.lookupReference(Ext.String.format('reqQtyField{0}', bizName));
//		// reqQtyField.setValue(selection.getData().reqQty);
//			
//		// var reqTimeHr = me.lookupReference(Ext.String.format('reqTimeHr{0}',
//		// bizName))
//		// var reqTimeMin =
//		// me.lookupReference(Ext.String.format('reqTimeMin{0}', bizName))
//
//		// reqTimeHr.setValue(selection.getData().dspReqhhmm.substring(0,2));
//		// reqTimeMin.setValue(selection.getData().dspReqhhmm.substring(2,4));
//		// }
//	},
//
//	// Update Form of Company Grid for Equipment
//	updateEquipmentCompanyForm: function(bizName) {		
//		var me = this;
//		var refs = me.getReferences();
//
//		var companyGrid = me.lookupReference(Ext.String.format('refMegaDetail{0}CompanyGrid', bizName));
//
//		var selection = companyGrid.getSelection() == null ? null : companyGrid.getSelection()[0];
//		
//		if (selection === null)
//			return	
//		// Update value of capacity combobox base on selection
//		if(bizName === 'Forklift' || bizName === 'PortCrane'){
//			var ctlContractor = me.lookupReference(Ext.String.format('ctlContractor{0}', bizName));
//			
//			// Toggle on/off radio btn depend on selection on company frid
//			var radioSelect = (selection.getData().opeCompCd === 'JPB')? 1 : 2;
//			
//			if(bizName === 'Forklift') {
//				ctlContractor.setValue({'radioFlBtn': radioSelect});
//			} else {
//				ctlContractor.setValue({'radioBtn': radioSelect});
//			}
//			
//
//			// Update Contractor combobox value if not JPB
//			if (radioSelect === 2){
//				var cboContractor = me.lookupReference(Ext.String.format('cboContractor{0}', bizName));
//				cboContractor.setValue(selection.getData().opeCompCd);
//			}
//
//		}	
//		else{
//			var cboContractor = me.lookupReference(Ext.String.format('cboContractor{0}', bizName));
//			cboContractor.setValue(selection.getData().opeCompCd);
//		}
//
//		var numEquip = me.lookupReference(Ext.String.format('ctlNoOf{0}', bizName))
//		numEquip.setValue(selection.getData().nofOpe);
//			
//	},
//
//	// Master Grid Selection Change Event
//	onMasterSelectionChangeForEquipment: function(bizName) {
//		var me = this;
//		var mainGrid = me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
//		var companyGrid = me.lookupReference(Ext.String.format('refMegaDetail{0}CompanyGrid', bizName));
//		var selection = mainGrid.getSelection() == null ? null : mainGrid.getSelection()[0];
//		
//		
//		companyGrid.getStore().removeAll();
//		
//		if(selection == null) {
//			return;
//		}
//		else{
//			me.updateEquipmentForm(bizName);
//		}
//		
//		// Added by Harry
//		if(selection.get('opeCompNm') != selection.get('opeCompCd')){
//			selection.set('opeCompCd', selection.get('opeCompNm'));
//		}
//		//-------------------------
//
//		if(selection.get('operInfoItems')){
//			companyGrid.getStore().setData(selection.get('operInfoItems'));
//		}
//	},
//	
//	onCompanySelectionChangeForEquipment: function(bizName) {
//		var me = this;
//		var companyGrid = me.lookupReference(Ext.String.format('refMegaDetail{0}CompanyGrid', bizName));
//		var selection = companyGrid.getSelection() == null ? null : companyGrid.getSelection()[0];
//		
//		if(selection == null) {
//			return;
//		}
//		else{
//			me.updateEquipmentCompanyForm(bizName);
//		}
//	},
//
//	// Company Grid Edit
//	// onEditCompanyForEquipment : function(editor, context, bizName){
//	// if(context.record.data.workingStatus == null){
//	// context.record.data.workingStatus = WorkingStatus.UPDATE;
//	// } else {
//	// context.record.data.workingStatus = context.record.crudState;
//	// }
//		
//	// var me = this;
//	// var arrItems = new Array();
//	// var mainGrid =
//	// me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
//	// var selection = mainGrid.getSelection() == null ? null :
//	// mainGrid.getSelection()[0];
//		
//	// if(selection == null){
//	// return;
//	// }
//		
//	// context.grid.getStore().each(function(record, index){
//	// arrItems.push(record);
//	// });
//
//	// var prevDirty = selection.dirty;
//	// selection.set('operInfoItems', arrItems);
//	// selection.dirty = prevDirty;
//	// },
//	onEditCompanyForEquipment : function(record, bizName){
//		if(record.data.workingStatus == null){
//			record.data.workingStatus = WorkingStatus.UPDATE;
//		} else {
//			record.data.workingStatus = record.crudState;
//		}
//		
//		var me = this;
//		var arrItems = new Array();
//		var mainGrid = me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
//		var grid = me.lookupReference(Ext.String.format('refMegaDetail{0}CompanyGrid', bizName));
//
//		var selection = mainGrid.getSelection() == null ? null : mainGrid.getSelection()[0];
//		
//		if(selection == null){
//			return;
//		}
//		
//		grid.getStore().each(function(rec, index){
//			arrItems.push(rec);
//		});
//
//		var prevDirty = selection.dirty;
//		selection.set('operInfoItems', arrItems);
//		selection.dirty = prevDirty;
//	},
//	
//	// Add Equipment Company
//	// onAddForEquipmentCompany: function(bizName, selectOpeDivCd) {
//	// var me = this;
//	// var refs = me.getReferences();
//	// var masterGrid =
//	// me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
//	// var grid =
//	// me.lookupReference(Ext.String.format('refMegaDetail{0}CompanyGrid',
//	// bizName));
//	// var store = me.getStore(Ext.String.format('megaDetailTab{0}Company',
//	// bizName));
//	// var editor =
//	// grid.getPlugin(Ext.String.format('megaDetailTab{0}CompanyEditor',
//	// bizName));
//	// var record = Ext.create('MOST.model.planning.OperInfo');
//	// var masterSelection = masterGrid.getSelection() == null ? null :
//	// masterGrid.getSelection()[0];
//		
//	// if(masterSelection == null){
//	// MessageUtil.warning('warning_msg', 'selectadddata_msg');
//	// return;
//	// }
//		
//	// editor.cancelEdit();
//		
//	// //Clear filter for Grid
//	// grid.filters.clearFilters();
//	// grid.filters.disable();
//		
//	// //Clear filter for Store
//	// store.clearFilter();
//		
//	// var idx = 0;
//	// if(grid.getSelection() && grid.getSelection().length>0) {
//	// idx = store.indexOfId(grid.getSelection()[0].get('id'));
//	// }
//		
//	// record.data.workingStatus = WorkingStatus.INSERT;
//
//	// if(StringUtil.isNullorEmpty(masterSelection.get('relationKey'))){
//	// masterSelection.set('relationKey', masterSelection.get('seq'));
//	// }
//		
//	// record.set('relationKey', masterSelection.get('relationKey'));
//	// record.set('eqDivCd', masterSelection.get('eqDivCd'));
//	// record.set('capaCd', masterSelection.get('capaCd'));
//		
//	// //opeDivCd : JPVC(P), Contractor(C)
//	// if(selectOpeDivCd){
//	// record.set('opeDivCd', selectOpeDivCd);
//	// } else {
//	// record.set('opeDivCd', 'C');
//	// }
//		
//	// record.set('nofOpe', 1);
//		
//	// store.insert(idx, record);
//	// grid.getSelectionModel().select(record);
//		
//	// editor.startEdit(record);
//	// },
//	onAddForEquipmentCompany: function(bizName, selectOpeDivCd) {
//		var me = this;
//		var refs = me.getReferences();
//		var masterGrid = me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
//		var grid = me.lookupReference(Ext.String.format('refMegaDetail{0}CompanyGrid', bizName));
//		var store = me.getStore(Ext.String.format('megaDetailTab{0}Company', bizName));
//		// var editor =
//		// grid.getPlugin(Ext.String.format('megaDetailTab{0}CompanyEditor',
//		// bizName));
//		var record = Ext.create('MOST.model.planning.OperInfo'); 
//		var masterSelection = masterGrid.getSelection() == null ? null : masterGrid.getSelection()[0];
//		
//		if(masterSelection == null){
//			MessageUtil.warning('warning_msg', 'selectadddata_msg');
//			return;
//		}
//		
//		// editor.cancelEdit();
//		
//		// Clear filter for Grid
//		grid.filters.clearFilters();
//		grid.filters.disable();
//		
//		// Clear filter for Store
//		store.clearFilter();
//		
//		var idx = 0;
//		if(grid.getSelection() && grid.getSelection().length>0) {
//			idx = store.indexOfId(grid.getSelection()[0].get('id'));
//		}
//		
//		record.data.workingStatus = WorkingStatus.INSERT;
//
//		if(StringUtil.isNullorEmpty(masterSelection.get('relationKey'))){
//			masterSelection.set('relationKey', masterSelection.get('seq'));
//		}
//		
//		record.set('relationKey', masterSelection.get('relationKey'));
//		record.set('eqDivCd', masterSelection.get('eqDivCd'));
//		record.set('capaCd', masterSelection.get('capaCd'));
//
//		// opeDivCd : JPVC(P), Contractor(C)
//		if(selectOpeDivCd){ 
//			record.set('opeDivCd', selectOpeDivCd);
//		} else {
//			record.set('opeDivCd', 'C');
//		}
//		
//		var cboContractor = me.lookupReference(Ext.String.format('cboContractor{0}', bizName));
//		var numEquip = me.lookupReference(Ext.String.format('ctlNoOf{0}', bizName))
//
//		// Forklift & PortCrane scr only
//		var ctlContractor = me.lookupReference(Ext.String.format('ctlContractor{0}', bizName));
//
//		// JPB selected case for Forklift and PortCrane
//		if (ctlContractor && ctlContractor.getChecked()[0].getSubmitValue() === 1){
//			record.set('opeCompCd', 'JPB')
//		}
//		// Normal case for all screens
//		else if(cboContractor && !StringUtil.isNullorEmpty(cboContractor.getValue()))
//		{
//			record.set('opeCompCd', cboContractor.getValue())
//		}
//		else{
//			MessageUtil.warning('warning_msg', 'mandatoryForm_msg');
//			return;
//		}
//
//
//		if(numEquip && !StringUtil.isNullorEmpty('opeCompCd', numEquip.getValue().toString()))
//		{
//			record.set('nofOpe', numEquip.getValue())
//		}
//		else{
//			MessageUtil.warning('warning_msg', 'mandatoryForm_msg');
//			return;
//		}
//		
//		var isValidated = (me.onValidateAddForCompany(record, bizName));
//
//		if (isValidated){
//			store.insert(idx, record);
//			me.onEditCompanyForEquipment(record, bizName);
//		}
//		
//		// grid.getSelectionModel().select(record);
//		
//		// editor.startEdit(record);
//	},
//	
//	onGridUpdateForEquipmentCompany: function(bizName, selectOpeDivCd) {
//		var me = this;
//		var refs = me.getReferences();
//		var masterGrid = me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
//		var grid = me.lookupReference(Ext.String.format('refMegaDetail{0}CompanyGrid', bizName));
//		var store = me.getStore(Ext.String.format('megaDetailTab{0}Company', bizName));
//		// var editor =
//		// grid.getPlugin(Ext.String.format('megaDetailTab{0}CompanyEditor',
//		// bizName));
//		var masterSelection = masterGrid.getSelection() == null ? null : masterGrid.getSelection()[0];
//		var companySelection = grid.getSelection() == null ? null : grid.getSelection()[0];
//
//		if(masterSelection == null){
//			MessageUtil.warning('warning_msg', 'selectadddata_msg');
//			return;
//		}
//		
//		if(companySelection == null){
//			return;
//		}
//		
//		// editor.cancelEdit();
//		
//		// Clear filter for Grid
//		grid.filters.clearFilters();
//		grid.filters.disable();
//		
//		// Clear filter for Store
//		store.clearFilter();
//		
//		var idx = 0;
//		if(grid.getSelection() && grid.getSelection().length>0) {
//			idx = store.indexOfId(grid.getSelection()[0].get('id'));
//		}
//		
//		companySelection.data.workingStatus = WorkingStatus.UPDATE;
//
//		var cboContractor = me.lookupReference(Ext.String.format('cboContractor{0}', bizName));
//		var numEquip = me.lookupReference(Ext.String.format('ctlNoOf{0}', bizName));
//
//		// Forklift & PortCrane scr only
//		var ctlContractor = me.lookupReference(Ext.String.format('ctlContractor{0}', bizName));
//		
//		// JPB selected case for Forklift and PortCrane
//		if (ctlContractor && ctlContractor.getChecked()[0].getSubmitValue() === 1){
//			companySelection.set('opeCompCd', 'JPB')
//		}
//		else if(!StringUtil.isNullorEmpty(cboContractor.getValue()))
//		{
//			companySelection.set('opeCompCd', cboContractor.getValue())
//		}		
//		else{
//			MessageUtil.warning('warning_msg', 'mandatoryForm_msg');
//			return;
//		}
//
//		if(!StringUtil.isNullorEmpty(numEquip.getValue().toString()))
//		{
//			companySelection.set('nofOpe', numEquip.getValue())
//		}
//		else{
//			MessageUtil.warning('warning_msg', 'mandatoryForm_msg');
//			return;
//		}
//		
//		
//		var isValidated = me.onValidateEditForCompany(bizName);
//
//		if (isValidated){
//			me.onEditCompanyForEquipment(companySelection, bizName);
//		}
//		
//		// grid.getSelectionModel().select(record);
//		
//		// editor.startEdit(record);
//	},
//
//
//	// Equipment Tab Double Click
//	onDblClickForEquipment: function(bizName, isWorkingArea, capacityFunc) {
//		var me = this;
//		var refs = me.getReferences();
//		var grid = me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
//		
//		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
//		
//		if(selection == null) return;
//		
//		if(capacityFunc){
//			capacityFunc(selection.get('eqDivCd'), me);
//		}
//		
//		if(isWorkingArea != false){
//			// Working Area All
//			var workingAreaCombo = me.getStore(Ext.String.format('megaDetailWorkingAreaComboFor{0}', bizName));
//			
//			var locIds = selection.get('locId').split(',');
//			
//			if(locIds.length > 0){
//				workingAreaCombo.clearFilter();
//				
//				var idx = workingAreaCombo.findExact('cd',locIds[0]);
//				
//				if(idx > 0){
//					var record = workingAreaCombo.getAt(idx);
//					me.workingAreaComboLoad(record.get('tyCd'), bizName);
//				}
//			}
//		}
//	},
//	
//	// Equipment Master Grid Add
//// onAddForEquipment: function(bizName, eqDivCd) {
//// var me = this;
//// var refs = me.getReferences();
//// var grid = me.lookupReference(Ext.String.format('refMegaDetail{0}Grid',
//// bizName));
//// var store = me.getStore(Ext.String.format('megaDetail{0}', bizName));
//// var editor = grid.getPlugin(Ext.String.format('megaDetailTab{0}Editor',
//// bizName));
//// var record = Ext.create('MOST.model.planning.Mega');
////		
//// editor.cancelEdit();
////		
//// //Clear filter for Grid
//// grid.filters.clearFilters();
//// grid.filters.disable();
////		
//// //Clear filter for Store
//// store.clearFilter();
////		
////		
////		
//// var idx = 0;
//// if(grid.getSelection() && grid.getSelection().length>0) {
//// idx = store.indexOfId(grid.getSelection()[0].get('id'));
//// }
////		
//// record.set('divCd', 'EQ');
////		
//// if(eqDivCd){
//// record.set('eqDivCd', eqDivCd);
//// }
////		
//// record.set('relationKey', store.getData().length + 1);
////		
//// store.insert(idx, record);
//// grid.getSelectionModel().select(record);
////		
//// editor.startEdit(record);
//// if(bizName == 'Forklift'){
//// editor.grid.down('[dataIndex=dspReqhhmm]').getEditor().setValue(me.TIME_FOR_SHIFT);
//// editor.grid.down('[dataIndex=reqQty]').getEditor().setValue(1);
//// }else if(bizName == 'Trailer'){
//// editor.grid.down('[dataIndex=dspReqhhmm]').getEditor().setValue(me.TIME_FOR_SHIFT);
//// editor.grid.down('[dataIndex=reqQty]').getEditor().setValue(1);
//// }else if(bizName == 'Gears'){
//// editor.grid.down('[dataIndex=dspReqhhmm]').getEditor().setValue(me.TIME_FOR_SHIFT);
//// editor.grid.down('[dataIndex=reqQty]').getEditor().setValue(1);
//// }else if(bizName == 'Mechanical'){
//// editor.grid.down('[dataIndex=dspReqhhmm]').getEditor().setValue(me.TIME_FOR_SHIFT);
//// editor.grid.down('[dataIndex=reqQty]').getEditor().setValue(1);
//// }else if(bizName == 'PortCrane'){
//// editor.grid.down('[dataIndex=dspReqhhmm]').getEditor().setValue(me.TIME_FOR_SHIFT);
//// editor.grid.down('[dataIndex=reqQty]').getEditor().setValue(1);
//// }
////		
//// },
////	
//	onAddForEquipment: function(bizName, eqDivCd) {	
//		var me = this;
//		var refs = me.getReferences();
//		var grid = me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
//		var store = me.getStore(Ext.String.format('megaDetail{0}', bizName));
//		// var editor =
//		// grid.getPlugin(Ext.String.format('megaDetailTab{0}Editor', bizName));
//		var record = Ext.create('MOST.model.planning.Mega'); 
//		var reqEditable = me.isEditableDetailGridTab();
//		// editor.cancelEdit();
//		
//		if(!reqEditable){
//			var userMode = 'INTERNAL'
//		}
//		else{
//			var userMode = 'EXTERNAL'
//		}
//
//		// Clear filter for Grid
//		grid.filters.clearFilters();
//		grid.filters.disable();
//		
//		// Clear filter for Store
//		store.clearFilter();
//		
//		var idx = 0;
//		if(grid.getSelection() && grid.getSelection().length>0) {
//			idx = store.indexOfId(grid.getSelection()[0].get('id'));
//		}
//		
//		record.set('divCd', 'EQ');
//		
//		if(eqDivCd){
//			record.set('eqDivCd', eqDivCd);
//		}
//
//		record.set('relationKey', 	store.getData().length + 1);
//		record.set('workingStatus', record.crudState);
//		var editFields = me.EQUIPMENT_CREATE_UPDATE_FIELD_CONFIG[bizName]
//		var keys = Object.keys(editFields)
//			for (const key of keys){
//				
//				var formField = editFields[key];
//
//				// Handle timefield
//				if (formField.includes(','))
//				{
//					if (userMode === 'EXTERNAL')
//					{
//						var hhField = refs[formField.split(',')[0]];
//						var mmField = refs[formField.split(',')[1]];
//
//						var hhFieldVal = hhField.getValue()
//																			
//						if (hhField && mmField){
//							
//							if(StringUtil.isNullorEmpty(hhField.getValue().toString()) || StringUtil.isNullorEmpty(mmField.getValue().toString()))
//							{	
//								throw 'mandatoryForm_msg'
//							}
//
//							var hhVal = (hhField.getValue() < 10)? '0' + hhField.getValue().toString() : hhField.getValue().toString();
//							var mmVal = (mmField.getValue() < 10)? '0' + mmField.getValue().toString() : mmField.getValue().toString();
//							var updateValue = hhVal + mmVal;
//						}
//					}
//					else if (userMode === 'INTERNAL'){
//						var updateValue = me.TIME_FOR_SHIFT.replace(':','');
//					}
//					else 
//						return
//				}
//				// ShipCrane case in PortCrane screen
//				else if (bizName === 'PortCrane' && refs.ctlEqTypePortCrane.getChecked()
//				&& refs.ctlEqTypePortCrane.getChecked()[0].getSubmitValue() === 1
//				&& ((formField === 'cboEqTypePortCrane') || (formField === 'cboCapacityPortCrane'))){
//					if (formField === 'cboEqTypePortCrane'){
//						var updateValue = 'SR';
//					}
//					else if (formField === 'cboCapacityPortCrane')
//					{
//						var updateValue = '';
//					}
//					else 
//						return
//				}
//				else if (refs[formField])
//				{
//					if (!refs[formField].disabled && !refs[formField].hidden && (refs[formField].getValue() === null || refs[formField].getValue() === ''))
//					{
//						MessageUtil.warning('Information','Please fill in the required fields.');
//						return;
//					}				
//					var updateValue;
//					if(!refs[formField].hidden){ 
//						updateValue = refs[formField].getValue();
//					}
//				}else {
//					continue
//				}
//			if(key === 'capaCd'){
//				record.set('capaDescr',refs[formField].getDisplayValue());
//			}
//
//			record.set(key,updateValue);
//		};
//
//		
//		var isValidated = (eval('me.onValidateAddFor' + bizName + '(record)'));
//		var isShftTime = me.validateRequisitionTime(bizName);
//		if (!isShftTime){
//			return;
//		}
//		
//		if(isValidated && isShftTime){
//			store.insert(idx, record);					
//		}
//	
//
//		// editor.startEdit(record);
//		// grid.getSelectionModel().select(record);
//		
//		// me.fireEvent('validateedit',editor,record);
//	},
//	
//	
//	// Category Combo Change Event
//	onCategoryComboChange: function(combo, value, obj){
//		var me = this;
//		var grid = combo.up('grid');
//		var detailView = me.getDetailBizView();
//		var bizName = me.getGirdBizName(grid.getReference());
//		
//		grid.down('[dataIndex=locId]').getEditor().setValue('');
//		me.workingAreaComboLoad(value, bizName);
//	},
//	
//	// Get grid biz name
//	getGirdBizName : function(gridName){
//		var regGridName = new RegExp('refMegaDetail([a-zA-Z.]+)Grid');
//		var bizName = regGridName.exec( gridName );
//
//		if ( bizName ) {
//		  bizName = bizName[1];
//		} else {
//		  bizName = '';
//		}
//		
//		return bizName;
//	},
//	
//	// Capacity Combo Load
//	workingAreaComboLoad : function(value, bizName){
//		var me = this;
//		var workingAreaCombo = me.getStore(Ext.String.format('megaDetailWorkingAreaComboFor{0}', bizName));
//		
//		if(workingAreaCombo != null){
//			workingAreaCombo.clearFilter();
//	    	
//			workingAreaCombo.filter([{
//				filterFn: function(item) {
//			    	return (item.get('tyCd').trim().search(value) != -1);
//			    }
//	    	}]);
//		}
//	},
//
//	// Grid Validate Edit for Equipment
//	// onValidateEditForEquipment : function(editor, context, keys,
//	// compareValue, isCompany) {
//	// var me = this;
//
//	// if(isCompany != true){
//	// var grid = context.grid;
//	// var reqQty = grid.down('[dataIndex=reqQty]').getEditor();
//	// var confmQty = grid.down('[dataIndex=confmQty]').getEditor();
//			
//	// if(me.isAmendVisible){
//	// if(context.newValues.reqQty === context.originalValues.reqQty){
//	// MessageUtil.warning('warning_msg',
//	// 'megadetail_amend_quantity_difference_msg');
//	// return false;
//	// }
//				
//	// confmQty.setValue(0);
//	// }
//	// }
//		
//	// var idx = context.store.findBy(function(item) {
//	// return me.getRecordConcatString(item, keys) === compareValue;
//	// });
//		
//	// if(idx >= 0){
//	// if(context.store.getAt(idx) == context.record){
//	// return true;
//	// } else {
//	// MessageUtil.warning('warning_msg', 'exsist_msg');
//	// return false;
//	// }
//	// }
//		
//	// return true;
//	// },
//	onValidateEditForEquipment : function(bizName, keys, compareValue, isCompany) {
//		var me = this;
//		var refs = me.getReferences();
//		if(!isCompany){
//			var grid = me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
//		}
//		
//		else{
//			var grid = me.lookupReference(Ext.String.format('refMegaDetail{0}CompanyGrid', bizName));
//		}
//
//		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
//		var store = grid.getStore();
//
//		if(selection == null) return;
//
//		if(isCompany != true){
//			var reqQty = selection.getData().reqQty;
//			var confmQty = selection.getData().confmQty;
//			
//			if(me.isAmendVisible){
//				var newValue = me.lookupReference(Ext.String.format('reqQtyField{0}', bizName)).getValue();
//				var origValue = reqQty;
//
//				if(newValue === origValue){
//					MessageUtil.warning('warning_msg', 'megadetail_amend_quantity_difference_msg');
//					return false;
//				}
//				// Reset Confirm Quantity when Amend Mega
//				selection.set('confmQty', 0)
//				
//			}
//		}
//		
//		
//		var idx = store.findBy(function(item) {
//						return me.getRecordConcatString(item, keys) === compareValue;
//				  });
//		
//		if(idx >= 0){
//			if(store.getAt(idx) == selection){
//				return true;
//			} else {
//				MessageUtil.warning('warning_msg', 'exsist_msg');
//				return false;
//			}
//		}
//		
//		return true;
//	},
//
//	onValidateAddForEquipment : function(bizName, keys, compareValue, record, isCompany) {
//		var me = this;
//		var refs = me.getReferences();
//
//		if(!isCompany){
//			var grid = me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
//		}
//		
//		else{
//			var grid = me.lookupReference(Ext.String.format('refMegaDetail{0}CompanyGrid', bizName));
//		}
//
//		var store = grid.getStore();
//
//		if(record == null) return;
//
//		if(isCompany != true){
//			var reqQty = record.getData().reqQty;
//			var confmQty = record.getData().confmQty;
//			
//			if(me.isAmendVisible){
//				var newValue = me.lookupReference(Ext.String.format('reqQtyField{0}', bizName)).getValue();
//				var origValue = reqQty;
//
//				if(newValue === origValue){
//					MessageUtil.warning('warning_msg', 'megadetail_amend_quantity_difference_msg');
//					return false;
//				}
//				
//				confmQty.setValue(0);
//			}
//		}
//		
//		
//		var idx = store.findBy(function(item) {
//						return me.getRecordConcatString(item, keys) === compareValue;
//				  });
//		
//		if(idx >= 0){
//			if(store.getAt(idx) == record){
//				return true;
//			} else {
//				MessageUtil.warning('warning_msg', 'exsist_msg');
//				return false;
//			}
//		}
//		
//		return true;
//	},
//
//	// Grid Validate Edit for Company
//	onValidateAddForCompany : function(record, bizName) {
//		var me = this;
//		var keys = ['opeCompCd'];
//		var compareValue = record.getData().opeCompCd;
//
//		return me.onValidateAddForEquipment( bizName, keys, compareValue, record, true);
//	},
//
//	// Grid Validate Edit for Company
//	onValidateEditForCompany : function(bizName) {
//		var me = this;
//		var refs = me.getReferences();
//		var keys = ['opeCompCd'];
//
//		var cboContractor = me.lookupReference(Ext.String.format('cboContractor{0}', bizName));
//		var compareValue = cboContractor.getValue();
//
//
//		return me.onValidateEditForEquipment( bizName, keys, compareValue, true);
//	},
//
//	onContractorSelectedChangeForklift : function(radio, newValue, oldValue){
//		var me = this;
//		var refs = me.getReferences()
//		refs.cboContractorForklift.setDisabled(true);	
//
//		if	(radio.getValue().radioFlBtn == 1 && newValue){
//			refs.cboContractorForklift.setDisabled(true)	
//		}
//		else if (radio.getValue().radioFlBtn == 2 && newValue){
//			refs.cboContractorForklift.setDisabled(false)	
//		}
//	},
//
//	/**
//	 * Equipment Grid Common (Gears, Forklift, Trailer, Mechanical, PortCrane)
//	 * END
//	 * =========================================================================================================================
//	 */
//	
//	/**
//	 * =========================================================================================================================
//	 * Vessel Schedule TAB START
//	 */
//	// Warehouse S/N, D/O List
//	searchWarehouse : function(isClear){
//		var me = this;
//		var refs = me.getReferences();
//		var vesselScheduleItem = me.getViewModel().get('theVsl');
//		var store = me.getStore('megaDetailVesselScheduleWarehouse');
//		var snStore = me.getStore('megaDetailVesselScheduleSn');
//		var doStore = me.getStore('megaDetailVesselScheduleDo');
//		var vslCallId = refs.ctlDetailJpvc.getValue();
//		
//		if(isClear){
//			snStore.removeAll();
//			doStore.removeAll();
//			return;
//		}
//		
//		if(!StringUtil.isNullorEmpty(vesselScheduleItem.get('vslCallId'))){
//			var params = {
//					vslCallId :  vesselScheduleItem.get('vslCallId')
//			};
//			
//			store.load({
//				params: params,
//				callback: function(records, operation, success) {
//					if(success){
//						if(records != null && records.length > 0){
//							snStore.setData(records[0].get('snList'));
//							doStore.setData(records[0].get('doList'));
//						}
//					}
//				}
//			});
//		} else {
//			snStore.removeAll();
//			doStore.removeAll();
//		}
//	},
//	/**
//	 * Vessel Schedule TAB END
//	 * =========================================================================================================================
//	 */
//	
//	/**
//	 * =========================================================================================================================
//	 * Gears TAB START
//	 */	
//	// Modify Gears Grid Data
//	getModifyDataForGears:function(){
//		var me = this;
//		return me.getModifyDataForEquipment('Gears');
//	},
//	
//	// Gears Add
//	onAddForGears: function() {
//		var me = this;
//		me.onAddForEquipment('Gears', 'GR');
//		
//	},
//	
//	// Gears Tab
//	onGridRemoveForGears: function() {
//		var me = this;
//		me.onGridRemoveForEquipment('Gears');
//	},
//	
//	onClickForMechanical:function(){
//		var me = this;
//		var refs = me.getReferences();
//		var grid = me.lookupReference('refMegaDetailMechanicalGrid');
//		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
//		if(selection == null) return;
//		refs.cboEqTypeMechanical.setValue(selection.get('eqDivCd'));
//		refs.cboCapacityMechanical.setValue(selection.get('capaCd'));
//		refs.ctlWorkingAreaMechanical.setValue(selection.get('locId'));
//		refs.confQtyFieldMechanical.setValue(selection.get('confmQty'));
//		
//		refs.reqQtyFieldMechanical.setValue(selection.get('reqQty'));
//	},
//	
//	// Gears Grid Edit
//	// onEditForGears : function(editor, context){
//	// context.record.data.workingStatus = context.record.crudState;
//	// },
//	onGridUpdateForGears: function() {
//		var me = this;	
//		if (me.onValidateEditForGears())
//		{
//			me.onGridUpdateForEquipment('Gears');
//		}		
//	},
//
//	// Grid Validate Edit for Gears
//	// onValidateEditForGears : function(editor, context) {
//	// var me = this;
//	// var keys = ['capaCd'];
//	// var compareValue = context.newValues.capaCd;
//	// return me.onValidateEditForEquipment(editor, context, keys,
//	// compareValue);
//	// },
//	onValidateEditForGears : function() {
//		var me = this;
//		var refs = me.getReferences()
//		var keys = ['capaCd'];	
//		
//		var compareValue = refs.cboCapacityGears.getValue();
//		
//		return me.onValidateEditForEquipment('Gears', keys, compareValue);
//	},
//	
//	onValidateAddForGears : function(record){
//		var me = this;
//		var keys = ['capaCd'];
//		var compareValue = record.getData().capaCd;
//		
//		return me.onValidateAddForEquipment('Gears', keys, compareValue, record);
//
//	},
//	// Gears Company
//	onEditCompanyForGears : function(editor, context){
//		var me = this;
//		me.onEditCompanyForEquipment(editor, context, 'Gears');
//	},
//	
//	// Gears Tab Double Click
//	onDblClickForGears: function(){
//		var me = this;
//		me.onDblClickForEquipment('Gears');
//	},
//	
//	// Gears Company Add
//	onAddForGearsCompany: function() {
//		var me = this;
//		me.onAddForEquipmentCompany('Gears');
//	},
//	
//	// Gears Company Update
//	onGridUpdateForGearsCompany: function(){
//		var me = this;
//		me.onGridUpdateForEquipmentCompany('Gears');
//	},
//
//	// Gears Company Tab
//	onGridRemoveForGearsCompany: function() {
//		var me = this;		
//		me.onGridRemoveForEquipmentCompany('Gears');
//	},
//	
//	// Gears Master Grid Selection Change Event
//	onMasterSelectionChangeForGears: function(selectable, selectRecords, eOpts) {
//		var me = this;
//		me.onMasterSelectionChangeForEquipment('Gears');
//	},
//
//	// Gears Company Grid Selection Change Event
//	onCompanySelectionChangeForGears: function(selectable, selectRecords, eOpts) {
//		var me = this;
//		me.onCompanySelectionChangeForEquipment('Gears');
//	},
//	/**
//	 * Gears TAB END
//	 * =========================================================================================================================
//	 */
//	
//	/**
//	 * =========================================================================================================================
//	 * Forklift TAB START
//	 */	
//	// Modify Forklift Grid Data
//	getModifyDataForForklift:function(){
//		var me = this;
//		return me.getModifyDataForEquipment('Forklift');
//	},
//	
//	// Forklift Add
//	onAddForForklift: function() {
//		var me = this;
//		me.onAddForEquipment('Forklift', 'FL');
//	},
//	
//	// Forklift Tab
//	onGridRemoveForForklift: function() {
//		var me = this;
//		me.onGridRemoveForEquipment('Forklift');
//	},
//	
//	// Forklift Grid Edit
//	// onEditForForklift : function(editor, context){
//	// var me = this;
//	// context.record.data.workingStatus = context.record.crudState;
//	// me.visibleCompanyImgage(context.newValues.flStatus);
//	// },
//	
//	onGridUpdateForForklift: function() {
//		var me = this;	
//		if (me.onValidateEditForForklift())
//		{
//			me.onGridUpdateForEquipment('Forklift');
//
//			var flStatus = me.lookupReference("cboForkliftDriver").getValue();;  
//			me.visibleCompanyImgage(flStatus);
//		}		
//	},
//
//	// Grid Validate Edit for Forklift
//	onValidateEditForForklift : function() {
//		var me = this;
//		var refs = me.getReferences()
//		var keys = ['capaCd', 'locId', 'flStatus'];
//		var compareValue = refs.cboCapacityForklift.getValue() 
//						 + refs.ctlWorkingAreaForklift.getValue() 
//						 + refs.cboForkliftDriver.getValue();
//		return me.onValidateEditForEquipment('Forklift', keys, compareValue);
//	},
//	
//	onValidateAddForForklift : function(record){
//		var me = this;
//		var keys = ['capaCd', 'locId', 'flStatus'];
//		var compareValue = record.getData().capaCd + record.getData().locId + record.getData().flStatus;
//		
//		return me.onValidateAddForEquipment('Forklift', keys, compareValue, record);
//	},
//
//	// Forklift Company
//	onEditCompanyForForklift : function(editor, context){
//		var me = this;
//		me.onEditCompanyForEquipment(editor, context, 'Forklift');
//	},
//	
//	// Forklift Tab Double Click
//	onDblClickForForklift: function(){
//		var me = this;
//		me.onDblClickForEquipment('Forklift');
//	},
//	
//	// Forklift Grid Add
//	onAddForForkliftCompany: function() {
//		var me = this;
//		me.onAddForEquipmentCompany('Forklift', 'P');
//	},
//	
//	// Forklift Company Update
//	onGridUpdateForForkliftCompany: function(){
//		var me = this;
//		me.onGridUpdateForEquipmentCompany('Forklift', 'P');
//	},
//
//	// Forklift Company Tab
//	onGridRemoveForForkliftCompany: function() {
//		var me = this;		
//		me.onGridRemoveForEquipmentCompany('Forklift');
//	},
//	
//	// Forklift Master Grid Selection Change Event
//	onMasterSelectionChangeForForklift: function(grid, selected, eOpts) {
//		var me = this;
//		
//		if(selected.selectedRecords.items.length > 0){
//			me.visibleCompanyImgage(selected.selectedRecords.items[0].get('flStatus'));
//		}
//		
//		me.onMasterSelectionChangeForEquipment('Forklift');
//	},
//	
//	// Forklift Company Grid Selection Change Event
//	onCompanySelectionChangeForForklift: function(selectable, selectRecords, eOpts) {
//		var me = this;
//		me.onCompanySelectionChangeForEquipment('Forklift');
//	},
//
//	// Visible Company Grid, Image
//	visibleCompanyImgage : function(flStatus){
//		
//		var me = this;
//		var refs = me.getReferences();
//		var isCompanyGridVisible = false;
//		
//		if( MOST.config.Token.getUserType() === CONSTANTS.USER_TYPE_INTERNAL){
//			if(flStatus === 'N'){
//				isCompanyGridVisible = false;
//			} else {
//				isCompanyGridVisible = true;
//			}
//		}
//		
//		refs.ctlCompanyForklift.setVisible(isCompanyGridVisible);
//		refs.ctlDetailForkliftImage.setVisible(!isCompanyGridVisible);
//	},
//	/**
//	 * Forklift TAB END
//	 * =========================================================================================================================
//	 */
//
//	/**
//	 * =========================================================================================================================
//	 * Trailer TAB START
//	 */	
//	// Modify Trailer Grid Data
//	getModifyDataForTrailer:function(){
//		var me = this;
//		return me.getModifyDataForEquipment('Trailer');
//	},
//	
//	// Trailer Add
//	onAddForTrailer: function() {
//		var me = this;
//		me.onAddForEquipment('Trailer', 'TR');
//	},
//	
//	// Trailer Tab
//	onGridRemoveForTrailer: function() {
//		var me = this;
//		me.onGridRemoveForEquipment('Trailer');
//	},
//	
//	// Trailer Grid Edit
//	// onEditForTrailer : function(editor, context){
//	// context.record.data.workingStatus = context.record.crudState;
//	// },
//	onGridUpdateForTrailer: function() {
//		var me = this;	
//		if (me.onValidateEditForTrailer())
//		{
//			me.onGridUpdateForEquipment('Trailer');
//		}		
//	},
//	
//	// Trailer Company
//	onEditCompanyForTrailer : function(editor, context){
//		var me = this;
//		me.onEditCompanyForEquipment(editor, context, 'Trailer');
//	},
//	
//	// Grid Validate Edit for Trailer
//	// onValidateEditForTrailer : function(editor, context) {
//	// var me = this;
//	// var keys = ['capaCd', 'locId'];
//	// var compareValue = context.newValues.capaCd +
//	// context.newValues.locId.toString();
//	// return me.onValidateEditForEquipment(editor, context, keys,
//	// compareValue);
//	// },
//	onValidateEditForTrailer : function() {
//		var me = this;
//		var refs = me.getReferences()
//		var keys = ['capaCd', 'locId'];	
//		var compareValue = refs.cboCapacityTrailer.getValue() + refs.ctlWorkingAreaTrailer.getValue();		
//		return me.onValidateEditForEquipment('Trailer', keys, compareValue);
//	},
//
//	onValidateAddForTrailer : function(record){
//		var me = this;
//		var keys = ['capaCd', 'locId'];	
//		var compareValue = record.getData().capaCd + record.getData().locId;
//		
//		return me.onValidateAddForEquipment('Trailer', keys, compareValue, record);
//
//	},
//
//	// Trailer Tab Double Click
//	onDblClickForTrailer: function(){
//		var me = this;
//		me.onDblClickForEquipment('Trailer');
//	},
//	
//	// Trailer Grid Add
//	onAddForTrailerCompany: function() {
//		var me = this;
//		me.onAddForEquipmentCompany('Trailer');
//	},
//	
//	// Trailer Company Update
//	onGridUpdateForTrailerCompany: function(){
//		var me = this;
//		me.onGridUpdateForEquipmentCompany('Trailer');
//	},
//
//	// Trailer Company Tab
//	onGridRemoveForTrailerCompany: function() {
//		var me = this;		
//		me.onGridRemoveForEquipmentCompany('Trailer');
//	},
//	
//	// Trailer Master Grid Selection Change Event
//	onMasterSelectionChangeForTrailer: function(selectable, selectRecords, eOpts) {
//		var me = this;
//		me.onMasterSelectionChangeForEquipment('Trailer');
//	},
//
//	// Trailer Company Grid Selection Change Event
//	onCompanySelectionChangeForTrailer: function(selectable, selectRecords, eOpts) {
//		var me = this;
//		me.onCompanySelectionChangeForEquipment('Trailer');
//	},
//	/**
//	 * Trailer TAB END
//	 * =========================================================================================================================
//	 */
//	
//	/**
//	 * =========================================================================================================================
//	 * MECANICAL TAB START
//	 */	
//	// Modify Mechanical Grid Data
//	getModifyDataForMechanical:function(){
//		var me = this;
//		return me.getModifyDataForEquipment('Mechanical');
//	},
//	
//	// Mechanical Tab
//	onGridRemoveForMechanical: function() {
//		var me = this;
//		me.onGridRemoveForEquipment('Mechanical');
//	},
//	
//	// Mechanical Company Tab
//	onGridRemoveForMechanicalCompany: function() {
//		var me = this;		
//		me.onGridRemoveForEquipmentCompany('Mechanical');
//	},
//	
//	// Equipment Master Grid Selection Change Event
//	onMasterSelectionChangeForMechanical: function(selectable, selectRecords, eOpts) {
//		var me = this;
//		me.onMasterSelectionChangeForEquipment('Mechanical');
//	},
//	
//	// Trailer Company Grid Selection Change Event
//	onCompanySelectionChangeForMechanical: function(selectable, selectRecords, eOpts) {
//		var me = this;
//		me.onCompanySelectionChangeForEquipment('Mechanical');
//	},
//	// Mechanical Grid Edit
//	// onEditForMechanical : function(editor, context){
//	// context.record.data.workingStatus = context.record.crudState;
//	// },
//	onGridUpdateForMechanical: function() {
//		var me = this;	
//		if (me.onValidateEditForMechanical())
//		{
//			me.onGridUpdateForEquipment('Mechanical');
//		}		
//	},
//
//	// Grid Validate Edit for Mechanical
//	onValidateEditForMechanical : function() {
//		var me = this;
//		var keys = ['capaCd'];
//
//		var compareValue = me.lookupReference('cboCapacityMechanical').getValue();
//
//		return me.onValidateEditForEquipment('Mechanical', keys, compareValue);
//	},
//	
//	onValidateAddForMechanical : function(record){
//		var me = this;
//		var keys = ['capaCd'];
//		var compareValue = record.getData().capaCd;
//		
//		return me.onValidateAddForEquipment('Mechanical', keys, compareValue, record);
//
//	},
//
//	onEditCompanyForMechanical : function(editor, context){
//		var me = this;
//		me.onEditCompanyForEquipment(editor, context, 'Mechanical');
//	},
//	
//	// Mechanical Master Grid Add
//	onAddForMechanical: function() {
//		var me = this;
//		me.onAddForEquipment('Mechanical');
//	},
//	
//	// Mechanical Grid Add
//	onAddForMechanicalCompany: function() {
//		var me = this;
//		me.onAddForEquipmentCompany('Mechanical');
//	},
//
//	// Mechanical Company Update
//	onGridUpdateForMechanicalCompany: function(){
//		var me = this;
//		me.onGridUpdateForEquipmentCompany('Mechanical');
//	},
//	
//	// Cargo Operation Combo Change Event
//	onEqTypeComboForMechanicalChange: function(combo, value, obj){
//		var me = this;
//		// var grid = combo.up('grid');
//		// var detailView = me.getDetailBizView();
//		// var recvData = detailView.items.get(0).recvData;
//		
//		// grid.down('[dataIndex=capaCd]').getEditor().setValue('');
//		me.lookupReference('cboCapacityMechanical').setDisabled(true);
//		me.lookupReference('cboCapacityMechanical').setValue('');
//		me.mechanicalCapacityComboLoad(value, me);
//	},
//	
//	// Mechanical Capacity Combo Load
//	mechanicalCapacityComboLoad : function(value, me){
//		var capacityCombo = me.getStore('megaDetailMechanicalCapacityCombo');
//		capacityCombo.removeAll();
//
//		if(!StringUtil.isNullorEmpty(value)){
//			capacityCombo.load({
//				params:{
//					scdLgv : 'EQ',
//					scdVal : 'MC',
//					searchType : 'equipmentcapa',
//					eqDivCd : value
//				},
//				callback:function(records,success){
//					if(success && records.length > 0){
//						me.lookupReference('cboCapacityMechanical').setDisabled(false);
//					}
//				}
//			});
//		}		
//	},
//	
//	// Mechanical Tab Double Click
//	onDblClickForMechanical: function() {
//		var me = this;
//		me.onDblClickForEquipment('Mechanical', true, me.mechanicalCapacityComboLoad);
//	},
//	/**
//	 * MECANICAL TAB END
//	 * =========================================================================================================================
//	 */
//	
//	/**
//	 * =========================================================================================================================
//	 * Port Crane TAB START
//	 */	
//	// Modify PortCrane Grid Data
//	getModifyDataForPortCrane:function(){
//		var me = this;
//		return me.getModifyDataForEquipment('PortCrane');
//	},
//	
//	// PortCrane Add
//	onAddForPortCrane: function() {
//		var me = this;
//		me.onAddForEquipment('PortCrane');
//	},
//	
//	// PortCrane Tab
//	onGridRemoveForPortCrane: function() {
//		var me = this;
//		me.onGridRemoveForEquipment('PortCrane');
//	},
//	
//	// PortCrane Update
//	onGridUpdateForPortCrane: function() {
//		var me = this;	
//		if (me.onValidateEditForPortCrane())
//		{
//			me.onGridUpdateForEquipment('PortCrane');
//		}		
//	},
//
//	// PortCrane Grid Edit
//	// onEditForPortCrane : function(editor, context){
//	// context.record.data.workingStatus = context.record.crudState;
//	// },
//	
//	// Grid Validate Edit for Port Crane
//	onValidateEditForPortCrane : function() {
//		var me = this;
//		var refs = me.getReferences()
//
//		if(refs.ctlEqTypePortCrane.getChecked()){
//			var eqSelected = refs.ctlEqTypePortCrane.getChecked()[0].getSubmitValue();
//		}
//		else
//			return
//
//		var keys = (eqSelected === 1)? ['eqDivCd']: ['capaCd'];
//		var compareValue = (eqSelected === 1)? 'SR': refs.cboCapacityPortCrane.getValue();
//		
//		return me.onValidateEditForEquipment('PortCrane', keys, compareValue);
//	},
//	
//	onValidateAddForPortCrane : function(record){
//		var me = this;
//		var refs = me.getReferences();
//
//		
//		
//		if(refs.ctlEqTypePortCrane.getChecked()){
//			var eqSelected = refs.ctlEqTypePortCrane.getChecked()[0].getSubmitValue();
//		}
//		else
//			return
//		var keys = (eqSelected === 1)? ['eqDivCd']: ['capaCd'];
//		var compareValue = (eqSelected === 1)? 'SR':  record.getData().capaCd;
//
//		return me.onValidateAddForEquipment('PortCrane', keys, compareValue, record);
//
//	},
//
//	// PortCrane Company
//	onEditCompanyForPortCrane : function(editor, context){
//		var me = this;
//		me.onEditCompanyForEquipment(editor, context, 'PortCrane');
//	},
//	
//	// PortCrane Tab Double Click
//	onDblClickForPortCrane: function(){
//		var me = this;
//		me.onDblClickForEquipment('PortCrane', false, me.portCraneCapacityComboLoad);
//	},
//	
//	// PortCrane Grid Add
//	onAddForPortCraneCompany: function() {
//		var me = this;
//		me.onAddForEquipmentCompany('PortCrane', 'P');
//	},
//	
//	// PortCrane Company Update
//	onGridUpdateForPortCraneCompany: function(){
//		var me = this;
//		me.onGridUpdateForEquipmentCompany('PortCrane', 'P');
//	},
//
//	// PortCrane Company Tab
//	onGridRemoveForPortCraneCompany: function() {
//		var me = this;		
//		me.onGridRemoveForEquipmentCompany('PortCrane');
//	},
//	
//	// PortCrane Master Grid Selection Change Event
//	onMasterSelectionChangeForPortCrane: function(selectable, selectRecords, eOpts) {
//		var me = this;
//		me.onMasterSelectionChangeForEquipment('PortCrane');
//	},
//	
//	// Forklift Company Grid Selection Change Event
//	onCompanySelectionChangeForPortCrane: function(selectable, selectRecords, eOpts) {
//		var me = this;
//		me.onCompanySelectionChangeForEquipment('PortCrane');
//	},
//
//	// PortCrane Combo Change Event
//	onEqTypeComboForPortCraneChange: function(combo, value, obj){
//		var me = this;
//		// var grid = combo.up('grid');
//		// var detailView = me.getDetailBizView();
//		// var recvData = detailView.items.get(0).recvData;
//		
//		// grid.down('[dataIndex=capaCd]').getEditor().setValue('');
//		me.lookupReference('cboCapacityPortCrane').setValue('');
//		me.lookupReference('cboCapacityPortCrane').setDisabled(true);
//		me.portCraneCapacityComboLoad(value, me);
//	},
//	
//	// PortCrane Capacity Combo Load
//	portCraneCapacityComboLoad : function(value, me){
//		var capacityCombo = me.getStore('megaDetailPortCraneCapacityCombo');
//		capacityCombo.removeAll();
//		
//		if(!StringUtil.isNullorEmpty(value)){
//			capacityCombo.load({
//				params:{
//					scdLgv : 'EQ',
//					scdVal : 'PC',
//					searchType : 'equipmentcapa',
//					eqDivCd : value
//				},
//				callback:function(records,success){
//					if(success && records.length > 0){
//						me.lookupReference('cboCapacityPortCrane').setDisabled(false);
//					}
//				}
//			});
//		}		
//	},
//	
//	onEqRadioChangePortCrane: function(radio, oldValue, newValue){
//		var me = this;
//		var refs = me.getReferences()
//		refs.cboEqTypePortCrane.setDisabled(true);
//		refs.cboCapacityPortCrane.setDisabled(true);	
//
//		if	(radio.getValue().radioRqBtn == 2 && newValue){
//			refs.cboEqTypePortCrane.setDisabled(false)
//			
//			if (!StringUtil.isNullorEmpty(refs.cboCapacityPortCrane.getValue()))
//			{
//				refs.cboCapacityPortCrane.setDisabled(false)
//			}	
//		}
//		
//	},
//
//	onContractorSelectedChangePortCrane : function(radio, newValue, oldValue){
//		var me = this;
//		var refs = me.getReferences()
//		refs.cboContractorPortCrane.setDisabled(true);	
//
//		if	(radio.getValue().radioBtn == 1 && newValue){
//			refs.cboContractorPortCrane.setDisabled(true)	
//		}
//		else if (radio.getValue().radioBtn == 2 && newValue){
//			refs.cboContractorPortCrane.setDisabled(false)	
//		}
//	},
//	// -------------------------------------------------------------
	
	onMegaPreviewPDF:function(){
		var me = this;
		var refs = me.getReferences();
		var selectedRecord = refs.refMegaContractorGrid.getSelectionModel().getSelection();
		var firstVslCallId = "";
		var isDiffVslCallId = false;
		var megaNo = "";
		var seq = "";
		var eqDivCdStr = ""; 
		var cnt = 0;
		var megaList = [];
		
		var params;
		
		if(selectedRecord == null || selectedRecord.length == 0){
			MessageUtil.warning('warning_msg', 'megarequisition_select_export');
			return;
		}
		
		selectedRecord.forEach(function(record, index, array){
			seq 	+= (cnt == 0 ? "" : ",") 		+ record.get('seq');

			if(record.get('eqDivCd') == ''){
				eqDivCdStr += (cnt == 0 ? "" : ",") + "stevedore"
			} else{
				eqDivCdStr += (cnt == 0 ? "" : ",") + record.get('eqDivCd');
			}
			
			cnt++;
			
			if(index == 0){
				firstVslCallId = record.get('vslCallId');
				megaNo = record.get('megaNo');
			}else{
				megaNo += "," + record.get('megaNo')
				if(record.get('vslCallId') != firstVslCallId){
					isDiffVslCallId = true;
				}
				
			}
		});
		
		if (cnt < 1){
			MessageUtil.warning('warning_msg', 'megarequisition_select_export');
			return;
		}
		
		if(isDiffVslCallId){
			MessageUtil.warning('warning_msg', 'megarequisition_diff_vsl_call_id');
			return;
		}
		
		if(me.getView().getXType() == 'app-megaforcontractor'){
			
			Ext.MessageBox.show({
				   title : 'MEGA For Contractor', 
			       msg: 'Printing...',
			       width:320,
			       height:0,
			       wait:true,
			       waitConfig: {interval:200, text:''}
			});
			
			
			var generatePDF = me.getStore('generatePDF');
			params = me.getSearchCondition();
			
			params['vslCallId'] = firstVslCallId;
			params['eqDivCdStr'] = eqDivCdStr;
			params['seqStr'] = seq.toString();
			params['megaStr'] = megaNo;
			params['megaList2'] = megaList;
			params['isCTT'] = 'Y';
			params['rptTp'] = 'MEGAForContractor';
			
			generatePDF.load({
				params: params,
				callback: function(records, operation, success) {
					if (success) {
						Ext.MessageBox.hide();
						me.openPDFPreview (records, operation, success);
					}
				}
			})
		}
	},
	
	onExport:function(){
		var me = this;
		var refs = me.getReferences();
		me.rptTp = 'MEGALIST';
		
		var params = {
			initSearch: true
		};
		
		me.openCodePopup('popup-exporttypepopup','refBtnDownload', params);
	},
//	
//	checkIfDuplicateExists: function (arr) {
//	    return new Set(arr).size !== arr.length;
//	},
	
	onDownloadExport:function(){
		var me = this;
		var refs = me.getReferences();
		var selectedRecord = refs.refMegaContractorGrid.getSelectionModel().getSelection();
		var firstVslCallId = "";
		var isDiffVslCallId = false;
		var megaNo = "";
		var seq = "";
		var eqDivCdStr = ""; 
		var cnt = 0;
		var megaList = [];
		
		var params;
		
		if(selectedRecord == null || selectedRecord.length == 0){
			MessageUtil.warning('warning_msg', 'megarequisition_select_export');
			return;
		}
		
		selectedRecord.forEach(function(record, index, array){
			seq 	+= (cnt == 0 ? "" : ",") 		+ record.get('seq');

			if(record.get('eqDivCd') == ''){
				eqDivCdStr += (cnt == 0 ? "" : ",") + "stevedore"
			} else{
				eqDivCdStr += (cnt == 0 ? "" : ",") + record.get('eqDivCd');
			}
			
			cnt++;
			
			if(index == 0){
				firstVslCallId = record.get('vslCallId');
				megaNo = record.get('megaNo');
			}else{
				megaNo += "," + record.get('megaNo')
				if(record.get('vslCallId') != firstVslCallId){
					isDiffVslCallId = true;
				}
				
			}
		});
		
		if (cnt < 1){
			MessageUtil.warning('warning_msg', 'megarequisition_select_export');
			return;
		}
		
		if(isDiffVslCallId){
			MessageUtil.warning('warning_msg', 'megarequisition_diff_vsl_call_id');
			return;
		}
		
		if(me.getView().getXType() == 'app-megaforcontractor'){
			
			Ext.MessageBox.show({
				   title : 'MEGA For Contractor', 
			       msg: 'Printing...',
			       width:320,
			       height:0,
			       wait:true,
			       waitConfig: {interval:200, text:''}
			});
			
			
			var generatePDF = me.getStore('generatePDF');
			params = me.getSearchCondition();
			
			params['exportTp'] = refs.refRadioReportType.getValue().rb
			params['vslCallId'] = firstVslCallId;
			params['eqDivCdStr'] = eqDivCdStr;
			params['seqStr'] = seq.toString();
			params['megaStr'] = megaNo;
			params['megaList2'] = megaList;
			params['isCTT'] = 'Y';
			params['rptTp'] = 'MEGAForContractor';
			
			generatePDF.load({
				params: params,
				callback: function(records, operation, success) {
					if (success) {
						Ext.MessageBox.hide();
						var content = records[0].data.content.replace(/&lt;/gi,'<').replace(/&gt;/gi,'>'); 
						Ext.exporter.File.saveBinaryAs(content, records[0].data.fileName);
					}
				}
			})
		}
	},
	
	onDownloadCancel:function(ownWin){
		var me = this;
		var winAlias = "popupAliaspopup-exporttypepopup";
		var win = me.lookupReference(winAlias);
		
		win.close();
		
	},
	
//	onPreviewLoad:function(){
//		var me = this;
//		var refs = me.getReferences();
//		
//		me.visibleDetailToolButton(ViewUtil.TOOL_SAVE, false);
//		me.visibleDetailToolButton(ViewUtil.TOOL_DEvarE, false);
//		me.visibleDetailToolButton(ViewUtil.TOOL_PREVIEW, false);
//		me.visibleDetailToolButton(ViewUtil.TOOL_DOWNLOAD, false);
//	},
//	
//	onDetailDownload:function(){
//		var me = this;
//		var refs = me.getReferences();
//		
//		me.rptTp = 'MEGADTL';
//		var params = {
//			initSearch: true
//		};
//		me.openCodePopup('popup-exporttypepopup','refBtnDownload', params);
//	},
//	
//	onDetailPreview:function(){
//		var me = this;
//		var refs = me.getReferences();
//		
//		var generatePDF = me.getStore('generatePDF');
//		params = me.getDetailSearchCondition();
//		
//		params['megaStr'] = refs.ctlDetailMegaNo.getValue();
//		params['rptTp'] = 'MEGADTL';
//		
//		generatePDF.load({
//			params: params,
//			callback: function(records, operation, success) {
//				if (success) {
//					me.openPDFPreview (records, operation, success);
//				}
//			}
//		})
//	},
//	
//	onTriggerClick:function(field, button, e){
//		var me = this;
//		var refs = me.getReferences();
//		var controlName = field.reference;
//		me.openCodePopup('popup-workingareamultipopup', controlName);
//	},
//	
//	onTabChange:function(tabPanel, tab){
//		var me = this;
//		var refs = me.getReferences();
//		
//		me.onTabChangeRemove('Forklift');
//		me.onTabChangeRemove('Gears');
//		me.onTabChangeRemove('Mechanical');
//		me.onTabChangeRemove('Trailer');
//		me.onTabChangeRemove('PortCrane');
//	},
//	
//	onTabChangeRemove: function(bizName) {
//		var me = this;
//		var grid = me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
//		var store = me.getStore(Ext.String.format('megaDetail{0}', bizName));		
//		var selection = grid.getSelection() === null ? null : grid.getSelection();
//		
//		if(selection == null) return;
//		
//		Ext.each(selection, function (record) {
//			if(record.crudState == 'C' && record.data.workingStatus == undefined){
//				store.remove(record);
//			}
//			
//		});
//	},
//	
//	onServiceDateChange:function(control, newValue, oldValue, eOpts){
//		var me = this;
//		var refs = me.getReferences();
//		
//		if(newValue != null && newValue != ''){
//			refs.ctlFromDt.setValue('');
//			refs.ctlToDt.setValue('');
//		}
//	},
//	
//	onChangeCargoDetail:function(e, selected, eOpts) {
//		var me = this;
//		var refs = me.getReferences();
//		var grid = refs.refMegaDetailCargoDetailGrid;
//		var selection;
//		if(selected && selected.startCell){
//			selection = grid.getStore().data.items[selected.startCell.rowIdx] == null ? null : grid.getStore().data.items[selected.startCell.rowIdx];
//		}
//
//		if(selection){
//			var value;
//			
//			if(selected.startCell.colIdx > 1){
//				value = selection.get(Ext.String.format('hatchNo{0}', + new String(selected.startCell.colIdx - 1)));
//				me.getViewModel().set('selectedColumn', selected.startCell.colIdx - 1);
//			}else{
//				me.getViewModel().set('selectedColumn', null);
//			}
//			
//			if(selection.data.cd === 'DCG' || selection.data.cd === 'LCG'){
//				refs.ctlCargoDetailPackage.setDisabled(true);
//				refs.ctlCargoDetailCmdtCode.setDisabled(true);
//				refs.refCargoDetailMT.setDisabled(false);
//				
//				refs.refCargoDetailMT.setValue(value);
//				refs.ctlCargoDetailCmdtCode.setValue('');
//				refs.ctlCargoDetailPackage.setValue('');
//				
//			}else if(selection.data.cd === 'DCM' || selection.data.cd === 'LCM'){
//				refs.ctlCargoDetailPackage.setDisabled(true);
//				refs.ctlCargoDetailCmdtCode.setDisabled(false);
//				refs.refCargoDetailMT.setDisabled(true);				
//
//				refs.refCargoDetailMT.setValue('');
//				refs.ctlCargoDetailCmdtCode.setValue(value);
//				refs.ctlCargoDetailPackage.setValue('');
//			}else{
//				refs.ctlCargoDetailPackage.setDisabled(false);
//				refs.ctlCargoDetailCmdtCode.setDisabled(true);
//				refs.refCargoDetailMT.setDisabled(true);
//				
//				refs.refCargoDetailMT.setValue('');
//				refs.ctlCargoDetailCmdtCode.setValue('');
//				refs.ctlCargoDetailPackage.setValue(value);
//			}
//		}
//	},
//	
//	onUpdateCargoDetailInfo: function(){
//		var me = this;
//		var refs = me.getReferences();
//		var grid = refs.refMegaDetailCargoDetailGrid;
//		var cargoDetail = me.getStore('megaDetailCargoDetail');
//		
//		var selectColIdx = me.getViewModel().get('selectedColumn');
//		if(selectColIdx && grid.selection){
//			if(grid.selection.data.cd === 'DCG' || grid.selection.data.cd === 'LCG'){
//				grid.selection.set(Ext.String.format('hatchNo{0}', + new String(selectColIdx)),refs.refCargoDetailMT.getValue()); 
//			}else if(grid.selection.data.cd === 'DCM' || grid.selection.data.cd === 'LCM'){
//				grid.selection.set(Ext.String.format('hatchNo{0}', + new String(selectColIdx)),refs.ctlCargoDetailCmdtCode.getValue()); 
//			}else{
//				grid.selection.set(Ext.String.format('hatchNo{0}', + new String(selectColIdx)),refs.ctlCargoDetailPackage.getValue()); 
//			}
//		}
//	},
//
//	onChangeShipgNoteNo: function(e, newValue, oldValue, eOpts){
//		if(newValue){
//			var me = this;
//			var refs = me.getReferences();
//			
//			refs.ctlMegaDetailDo.setValue('');
//		}
//		e.setValue(newValue);
//	},
//	
//	onChangeDeliveryNo: function(e, newValue, oldValue, eOpts){
//		if(newValue){
//			var me = this;
//			var refs = me.getReferences();
//			
//			refs.ctlMegaDetailSn.setValue('');
//		}
//		e.setValue(newValue);
//	},
//	
//    exportTo: function(btn) {
//    	var me = this;
//    	var refs = me.getReferences();
//    	
//        var cfg = Ext.merge({
//            title: 'MEGA',
//            fileName: 'MEGA' + '.' + (btn.cfg.ext || btn.cfg.type)
//        }, btn.cfg);
//
//        var grid = refs.refMegaRequisitionGrid;
//        grid.saveDocumentAs(cfg);
//    },
//    
//    winchMenAndGeneralWorkerChange:function(e, newValue, oldValue, eOpts ) {
//    	var me = this;
//    	var refs = me.getReferences();
//    	
//    	var stevedoreItem = me.getViewModel().get('theStevedore');
//    	if(stevedoreItem){
//	    	var stvdNonTon = refs.ctlDetailMegaStevedoreNoStvdGwker.getValue() + refs.ctlDetailMegaStevedoreNofWchmn.getValue();
//	    	stevedoreItem.set('stvdNonTon', stvdNonTon);
//    	}
//    },
//    
//    onLashingDisabledControl: function (value){
//    	var me = this;
//    	var refs = me.getReferences();
//
//    	refs.ctlDetailMegaStedoreLashingCompany.setDisabled(value);
//    	refs.ctlDetailMegaStevedoreLashingWorkingArea.setDisabled(value);
//    	refs.ctlLshRegHh.setDisabled(value);
//    	refs.ctlLshRegMm.setDisabled(value);
//    	refs.ctlDetailMegaStedoreLashingNosofGang.setDisabled(value);
//    }
//
//
//	/**
//	 * Port Crane TAB END
//	 * =========================================================================================================================
//	 */
});