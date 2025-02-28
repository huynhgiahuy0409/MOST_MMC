Ext.define('MOST.view.operation.VSRCheckListHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.vsrchecklisthht',
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
	
	MAX_PERIOD_DAY : 7,
	empNm:'',
	engNm:'',
	capaCd:'',
	equNo:'',
	mbsCd:'',
	isDriver:'',
	cnrtCd:'',
	click: '0', //btnRetrieve
	
	/********* START CONSTANT ********/
	glbJPVC: '',
	ADD: 'add',
	UPD: 'update',
	TAB_MANPOWER: 0,
	TAB_PORTCRANE: 1,
	TAB_STEVEDORE: 2,
	TAB_FORKLIFT: 3,
	TAB_TRAILER: 4,
	TAB_EQU: 5,
	TAB_ACTIVE: null,
	
	//WorkingAreaName:
	AREA_HATCH: 'Hatch',
	AREA_WHARF: 'BulkWharf',
	AREA_OTHERS: 'Others',
	AREA_WHO: 'Warehouse',
	
	//WorkingAreaCode:
	AREA_LOCCD_WHO: 'WHO',
	AREA_LOCCD_HATCH: 'HTC',
	AREA_LOCCD_WHARF: 'WRF',
	AREA_LOCCD_WHS: 'WHS', //Weigh Scale
	AREA_LOCCD_EDIBLE: 'EDJ',
	AREA_LOCCD_NON_EDIBLE: 'NDJ',
	AREA_LOCCD_OTHERS: 'OTH',
	
	//Save Mode
	MODE_ADD: 1,
	MODE_UPDATE: 2,
	MODE_DELETE: 3,
	
	// VSR Confirmed , Not Confirmed Status
	ITEM_CONFIRMED: "Confirmed",
	ITEM_NOTCONFIRMED: "Not Confirmed",
	CONST_JPB: 'JPB',
	CONST_CTR: 'CTR',
	
	//WorkingArea Popup Result:
	wkAreaMPRes: {
		code: null,
		type: null,
		typeNm: null,
		item: null
	},
	wkAreaFLRes: {
		code: null,
		typeCd: null,
		typeNm: null,
		item: null
	},
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	/********* E CONSTANT ********/
	setWorkingDateShift: function(){ //Load and set Shift Working
		var me = this;
		var refs = me.getReferences();
		var workDate =  MOST.config.Token.getWorkDate();
		var workShift =  MOST.config.Token.getWorkShift();
		me.glbJPVC = me.getViewModel().get('globalVesselCallId');
		//refs.refWorkingDate.setValue(Ext.Date.format(workDate,MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		//refs.refCbxShft.setValue(workShift);
	},
	
	setDefaultRefNoHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var refNo = ''
		
		if((refs.refWorkingDate.getValue() != null && refs.refWorkingDate.getValue() != '')
				&& (refs.refCbxShft.getValue() != null && refs.refCbxShft.getValue() != '')){		
			var date = refs.refWorkingDate.getValue().substr(0,2) + refs.refWorkingDate.getValue().substr(3,2) + refs.refWorkingDate.getValue().substr(6,4);
			//var shft = refs.refCbxShft.getInputValue();
			var shft = refs.refCbxShft.getValue();
			refNo = date + "@" + shft;
		}
		return refNo;
	},
	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */	
	onLoadHHT(){
		var me = this;
		var refs = me.getReferences();
		
		//Load setWorking Date and Shift:
		var shiftListStore = me.getStore('shiftCombo'); 
		shiftListStore.load({
			callback: function(records, operation, success) {
				if (success) {
					me.setWorkingDateShift();
					me.loadComboHHT();
					me.setTimeWithShiftHHT(null);
					me.onSearchHHT();
				}
			}
		});
		
	},
	
	
	setTimeWithShiftHHT: function(tab){
		var me = this;
		var refs = me.getReferences();
		var shiftListStore = me.getStore('shiftCombo');
		//var refStartTime = refs.refDtStartTimeManPower;
		//var refEndTime = refs.refDtEndTimeManPower;

		if(shiftListStore.loadCount <= 0){
			shiftListStore.load();
		}
		
		var shiftId = refs.refCbxShft.getValue();
		var shift = shiftListStore.findRecord('shftId', shiftId);
		var strWKDate = Ext.Date.format(MOST.config.Token.getWorkDate(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
		var fmShiftTime;
		
		if(shift){
			var strStartDt = refs.refWorkingDate.getValue() + ' ' + shift.data.fmHhMm.substr(0, 2) + ':' + shift.data.fmHhMm.substr(2, 4);
			var strEndDt = refs.refWorkingDate.getValue() + ' ' + shift.data.toHhMm.substr(0, 2) + ':' + shift.data.toHhMm.substr(2, 4);
		}
		
		if(shift == 'SF0013'){
			var temp = Ext.Date.parse(strEndDt, 'd/m/Y H:i');
			var endShftDTime = new Date(temp.getTime() + (24 * 60 * 60 * 1000));
			strEndDt = Ext.Date.format(endShftDTime, 'd/m/Y H:i');
		}
		
        switch (tab) {
            case me.TAB_MANPOWER:
            	refs.refDtStartTimeManPower.setValue(strStartDt);
            	refs.refDtEndTimeManPower.setValue(strEndDt);
            	break;
            case me.TAB_PORTCRANE:
            	refs.refStartTimePortCranefield.setValue(strStartDt);
				refs.refEndTimePortCranefield.setValue(strEndDt);
				break;
            case me.TAB_STEVEDORE:
            	refs.refStartTimeYDStvTimefield.setValue(strStartDt);
            	refs.refEndTimeYDStvTimefield.setValue(strEndDt);
            	break;
            case me.TAB_FORKLIFT:
            	refs.refDtEQArrvFL.setValue(strStartDt);
            	refs.refDtStartTimeFL.setValue(strStartDt);
            	refs.refDtEndTimeFL.setValue(strEndDt);
            	break;
            case me.TAB_TRAILER:
            	refs.refTrailerEQArrTimeHHT.setValue(strStartDt);
            	refs.refStartTrailerTimefield.setValue(strStartDt);
            	refs.refEndTrailerTimefield.setValue(strEndDt);
            	break;
            case me.TAB_EQU:
				refs.refWorkDateEQARR.setValue(strStartDt);
            	refs.refWorkDateMEQStart.setValue(strStartDt);
            	refs.refWorkDateMEQEnd.setValue(strEndDt);
				break;
            default:
				refs.refDtStartTimeManPower.setValue(strStartDt);
				refs.refDtEndTimeManPower.setValue(strEndDt);
				refs.refDtEQArrvFL.setValue(strStartDt);
            	refs.refDtStartTimeFL.setValue(strStartDt);
				refs.refDtEndTimeFL.setValue(strEndDt);
				refs.refTrailerEQArrTimeHHT.setValue(strStartDt);
            	refs.refStartTrailerTimefield.setValue(strStartDt);
            	refs.refEndTrailerTimefield.setValue(strEndDt);
				refs.refStartTimeYDStvTimefield.setValue(strStartDt);
				refs.refEndTimeYDStvTimefield.setValue(strEndDt);
				refs.refStartTimePortCranefield.setValue(strStartDt);
				refs.refEndTimePortCranefield.setValue(strEndDt);
				refs.refWorkDateEQARR.setValue(strStartDt);
            	refs.refWorkDateMEQStart.setValue(strStartDt);
				refs.refWorkDateMEQEnd.setValue(strEndDt);
		}
	},
	
	onTabChange:function(tabPanel, tab){
		var me = this;
		var refs = me.getReferences();
		
	},
	
	onActivateTabHHT: function(ref){
		var me = this;
		var tab = ref.reference;
		var refs = me.getReferences();
		
		var activeTab = ref.name;
		if(activeTab == 'manPower'){
			me.TAB_ACTIVE = me.TAB_MANPOWER;
		}else if(activeTab == 'portCrane'){
			me.TAB_ACTIVE = me.TAB_PORTCRANE;
		}else if(activeTab == 'ydStevedore'){
			me.TAB_ACTIVE = me.TAB_STEVEDORE;
		}else if(activeTab == 'forklift'){
			me.TAB_ACTIVE = me.TAB_FORKLIFT;
		}else if(activeTab == 'trailer'){
			me.TAB_ACTIVE = me.TAB_TRAILER;
		}else if(activeTab == 'mechanicalEQ'){
			me.TAB_ACTIVE = me.TAB_EQU;
		}
		
	},
	
	onSearchHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var empFLCombo = me.getStore('empFLCombo');
		var eqPCCombo = me.getStore('eqPCCombo');
		var vsrCheckListDetailStore = me.getStore('vsrCheckListDetail');
		vsrCheckListDetailStore.load({
			params: {
				vslCallID: me.glbJPVC,
//				shftId: refs.refCbxShft.getValue(),
//				workYmd: refs.refWorkingDate.getDate(),
				searchType: 'HHT'
			},
			callback: function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						var theModel = Ext.create('MOST.model.operation.VSRCheckList');
						theModel.phantom = false; // UPDATE
						theModel.data = records[0].data;
						me.getViewModel().setData({theVSR:theModel});
						me.setManPowerHHT(records[0].data);
						me.setPortCraneHHT(records[0].data);
						me.setStevedoreHHT(records[0].data);
						me.setForkliftHHT(records[0].data);
						me.setTrailerHHT(records[0].data);
						me.setMEQHHT(records[0].data);
						me.setMegaFLHHT(records[0].data);
						me.setMegaTRHHT(records[0].data);
						me.setMegaMEHHT(records[0].data);
						
//						empFLCombo.setData(records[0].get('flEmpList'));
//						empFLCombo.insert(0, [{"empId":"", "empNm":"Select"},]);

						eqPCCombo.setData(records[0].get('pcList'));
						me.onClearForkLiftHHT();
					}
				}
			}
		});

	},

	loadComboHHT:function(){ //Load All Combobox Store for All Tab
		var me = this;
		var refs = me.getReferences();
		var workYmd  = refs.refWorkingDate.getDate();
		var shftId = refs.refCbxShft.getValue();
		var purposeCombo = me.getStore('purposeCombo');
		var eqTypeTRCombo = me.getStore('eqTypeTRCombo');
		var bulkWharfCombo = me.getStore('bulkWharfCombo');
		var warehouseCombo = me.getStore('warehouseCombo');
		var edjCombo = me.getStore('edjCombo');
		var ndjCombo = me.getStore('ndjCombo');
		var bulkWharfFLCombo = me.getStore('bulkWharfFLCombo');
		var warehouseFLCombo = me.getStore('warehouseFLCombo');
		var roleCombo = me.getStore('roleCombo');
		var empFLCombo = me.getStore('empFLCombo');
		var empMPCombo = me.getStore('empMPCombo');
		var cargoCombo = me.getStore('cargoCombo');
		var cttCompCombo = me.getStore('cttCompCombo');
		var requestorCombo = me.getStore('requestorCombo');
		var categoryCombo = me.getStore('categoryCombo');
		var workingAreaCombo = me.getStore('workingAreaCombo');
		var stvCompCombo = me.getStore('stvCompCombo');
		var eqCodeCombo = me.getStore('eqCodeCombo');
		var eqPCCombo = me.getStore('eqPCCombo');
		var flNoCombo = me.getStore('flNoCombo');
		var equipmentCombo = me.getViewModel().getStore('equipmentCombo');
		var empPCCombo = me.getStore('empPCCombo');
		var driverTp = me.getStore('driverTp');
		var hatchCombo = me.getStore('hatchCombo');
		var OthersLocCombo = me.getStore('locationCodeListStore');
		var hatchCombo = me.getStore('hatchCombo');
		
		equipmentCombo.clearFilter();
		if(equipmentCombo.loadCount <= 0){
			equipmentCombo.load({
				params : {
					divCd : ''
				},
			});
		}
		
		if(flNoCombo.loadCount <= 0){
			flNoCombo.load();
		}
		
		if(eqCodeCombo.loadCount <= 0){
			eqCodeCombo.load();
		}
		if(eqPCCombo.loadCount <= 0){
			eqPCCombo.load(
//					{
//				params : {
//					vslCallID : me.glbJPVC,
//					workYmd : workYmd,
//					shftId : shftId,
//				},
//			}
			);
		}
		if(workingAreaCombo.loadCount <= 0){
			workingAreaCombo.load();
		}
		if(categoryCombo.loadCount <= 0){
			categoryCombo.load();
		}
		if(requestorCombo.loadCount <= 0){
			requestorCombo.load();
		}
		if(cargoCombo.loadCount <= 0){
			cargoCombo.load();
		}
		var shiftListStore = me.getStore('shiftList');
		if(shiftListStore.loadCount <= 0){
			shiftListStore.load();
		}	
		if(empFLCombo.loadCount <= 0){
			empFLCombo.load({
				params : {
					vslCallID : me.glbJPVC,
					workYmd : workYmd,
					shftId : shftId
				},
			});
		}
		if(empMPCombo.loadCount <= 0){
			empMPCombo.load({
				params : {
					vslCallID : me.glbJPVC,
					workYmd : workYmd,
					shftId : shftId
				},
			});
		}
		
		if(empPCCombo.loadCount <= 0){
			empPCCombo.load({
				params : {
					vslCallID : me.glbJPVC,
					workYmd : workYmd,
					shftId : shftId
				},
			});
		};
		
		if(driverTp.loadCount <= 0){
			driverTp.load();
		}
		
		if(cttCompCombo.loadCount <= 0){
			cttCompCombo.load({
				params : {
					divCd : 'CTT',
					comboType: 'COMP'
				},
			});
		}
		if(stvCompCombo.loadCount <= 0){
			stvCompCombo.load({
				params : {
					divCd : 'STV'
				},
			});
		}
		if(roleCombo.loadCount <= 0){
			var workYmdStr = Ext.Date.format(MOST.config.Token.getWorkDate(), 'Ymd');
			roleCombo.load({
				params : {
					vslCallID : me.glbJPVC,
					workYmd : workYmdStr,
					shftId : shftId
				},
			});
		}
		if(edjCombo.loadCount <= 0){
			edjCombo.load();
		}
		if(ndjCombo.loadCount <= 0){
			ndjCombo.load();
		}
		if(eqTypeTRCombo.loadCount <= 0){
			eqTypeTRCombo.load();
		}
		if(bulkWharfCombo.loadCount <= 0){
			bulkWharfCombo.load();
		}
		if(warehouseCombo.loadCount <= 0){
			warehouseCombo.load();
		}
		if(bulkWharfFLCombo.loadCount <= 0){
			bulkWharfFLCombo.load();
		}
		if(warehouseFLCombo.loadCount <= 0){
			warehouseFLCombo.load();
		}
		if(hatchCombo.loadCount <= 0){
			hatchCombo.load();
		}
		if(purposeCombo.loadCount <= 0){
			purposeCombo.load();
		}
		if(OthersLocCombo.loadCount <= 0){
			OthersLocCombo.load();
		}
	},
	
	onClearForkLiftHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refGrdForkLift;
		grid.setSelection(false);
		me.getViewModel().set('theForkLift', null);
		
		refs.refTxtContractorFL.setValue('');
		refs.refTxtWorkingAreaFL.setValue('');
		refs.refRadioJPBFL.setChecked(true);
		refs.refCboJPBFL.setValue('');
		refs.refCboCargoTpFL.reset();
		refs.refCboCargoTpFL.setValue('BBK');

		me.setTimeWithShiftHHT(me.TAB_FORKLIFT);
		//set button:
		me.setButtonByMode(me.TAB_FORKLIFT, me.MODE_ADD, null);
	},
	
	onChangeUpperCase: function(field, newValue){
		field.setValue(newValue.toUpperCase());
	},
	
	setFmTimeByShift: function(){
		var me = this;
		var refs = me.getReferences();
		
		var shiftListStore = me.getStore('shiftList');
		if(shiftListStore.loadCount <= 0){
			shiftListStore.load();
		}
		
		var shftId= refs.refCbxShft.getValue();
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
		var shftId= refs.refCbxShft.getValue();
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
	
	setFromTimeByShift2: function(){
		var me = this;
		var refs = me.getReferences();
		var strShftDt = refs.refWorkingDate.getDate();
		
		var shiftListStore = me.getStore('shiftList');
		if(shiftListStore.loadCount <= 0){
			shiftListStore.load();
		}
		
		var shiftId = refs.refCbxShft.getValue();
		var shift = shiftListStore.findRecord('shftId', shiftId);
		
		var fromShiftTime;
		var strFromDt;
		
		
		if(shift){
			strFromDt = strShftDt + ' ' + shift.data.fmHhMm.substr(0, 2) + ':' + shift.data.fmHhMm.substr(2, 4);
		}
		
		fromShiftTime =  Ext.Date.parse(strFromDt,  'd/m/Y H:i');
		
		return fromShiftTime;
	},
	
	setToTimeByShift2: function(){ 
		var me = this;
		var refs = me.getReferences();
		var strShftDt = refs.refWorkingDate.getDate();
		
		var shiftListStore = me.getStore('shiftList');
		if(shiftListStore.loadCount <= 0){
			shiftListStore.load();
		}
		var shftId= refs.refCbxShft.getValue();
		var shift = shiftListStore.findRecord('shftId', shftId);
		
		var endShftDTime;
		var strToDt;
		
		if(shift){
			strToDt = strShftDt + ' ' + shift.data.toHhMm.substr(0, 2) + ':' + shift.data.toHhMm.substr(2, 4);
		}
		
		endShftDTime = Ext.Date.parse(strToDt, 'd/m/Y H:i');
		
		return endShftDTime;
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		if(targetControl == 'ctlVslCallId'){ 
			if(returnValue){
				refs.ctlFromDt.setValue('');
				refs.ctlToDt.setValue('');
				me.getViewModel().setData({theVsl:returnValue.item});
				refs.ctlVslCallId.refs.ctlF

				me.onSearch();
			} 
		}
		
		//HHT Tablet:
		if (Ext.platformTags.modern){
			if(targetControl == 'refTxtStaffId'){
				refs.refTxtStaffId.setValue(returnValue.code);
				refs.refTxtStaffNm.setValue(returnValue.codeName);
				refs.refCboRole.setValue(returnValue.item.get('roleCd'));
			}else if(targetControl == 'refTxtWorkingArea'){
				refs.refTxtWorkingArea.setValue(returnValue.code);
			}else if(targetControl == 'refMEQTypeCd'){
				me.getViewModel().setData({theMEQType:returnValue.item.data});
				refs.refMEQTypeCd.setValue(returnValue.code);
			}else if(targetControl == 'refMEQContractorCd'){
				refs.refMEQContractorCd.setValue(returnValue.code);
			}else if(targetControl == 'refMEQRequestor'){
				refs.refMEQRequestor.setValue(returnValue.code);
			}else if(targetControl == 'refTxtWorkingAreaFL'){
				me.wkAreaFLRes = returnValue;
				var wkAreaValue = returnValue.typeNm + ": "+ returnValue.code;
				me.lookupReference(targetControl).setValue(wkAreaValue);
			}else if(targetControl == 'refBtnRequesterPortCrane'){
				refs.refRequesterPortCraneField.setValue(returnValue.code);
			}else if(targetControl == 'refBtnSearchStvTabVSR'){
				refs.refStevedoreCompHHTField.setValue(returnValue.code);
			}else if(targetControl == 'refBtnSearchRequesterStv'){
				refs.refRequesterStvHHTField.setValue(returnValue.code);
			}else if(targetControl == 'refWAreaStvHHTField'){
				refs.refWAreaStvHHTField.setValue(returnValue.code);
			}else if(targetControl == 'refBtnSearchTrailerHHT'){
				refs.refTRRequestorHHT.setValue(returnValue.code);
			}else if(targetControl == 'refBtnEQTyeTrailerHHT'){
				refs.refEQTyeTrailerHHTField.setValue(returnValue.code);	
				refs.refCapacdTrailerHHTField.setValue(returnValue.item.data.capaCd);
				refs.refTREquipmentDivCdHHT.setValue(returnValue.item.data.eqDivCd);
			}else if(targetControl == 'refBtnEQTyeTrailerHHT'){

			}
			else if(targetControl == 'refTxtContractorFL'){//Contrartor Forklift
				me.lookupReference(targetControl).setValue(returnValue.code);
			}else if(targetControl == 'refContractorTrHHTField'){//Contrartor Trailer
				me.lookupReference(targetControl).setValue(returnValue.code);
			}else if(targetControl == 'refPCContractorHHTField'){//Contrartor PC
				me.lookupReference(targetControl).setValue(returnValue.code);
			}
		}
	},
	
	onPartnerFocusleave: function(ref,event,type) {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore('VSRValidationCode');
    	var tyCd ='';
    	var col1 = '';
    	
    	if(StringUtil.isNullorEmpty(ref.getValue())) return;
    	
    	if(type.e === 'Contractor'){
    			tyCd= "checkCTTForHHT";
    			col1= ref.getValue().toUpperCase();		
    	}else if(type.e === 'Requestor'){
    			tyCd= "checkFWDForHHT";
    			col1= ref.getValue().toUpperCase();
		}
		else{
			if(type.e === 'Working Area'){
				if(!me.validateWorkAreaMEQ(ref.getValue().toUpperCase().trim()))
				{
					ref.setValue("");
					MessageUtil.warning('warning_msg', 'vslchecklist_input_wrongValue_msg',type.e);
				}
				else
				{
					ref.setValue(ref.getValue().toUpperCase().trim());
				}
			}else if(type.e === 'Working Loc'){
				if(!me.validateWorkLocMEQ(ref.getValue().toUpperCase().trim()))
				{
					ref.setValue("");
					MessageUtil.warning('warning_msg', 'vslchecklist_input_wrongValue_msg',type.e);
					refs.ctlMEPurpose.setDisabled(true);
				}
				else
				{
					ref.setValue(ref.getValue().toUpperCase().trim());
					refs.ctlMEPurpose.setDisabled(false);
				}
			}
	    	return;
    	}
    	var params ={
			tyCd: tyCd,
			col1: col1,
    	}
    	store.load({
			params : params,		
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						if(records[0].get('isValidated') === 'N'){
							ref.setValue("");
							Ext.Msg.alert('warning', 'Please input right value', function(btn, text){
                                if (btn == 'ok'){
                                    return false;
                                }
                            });  
						} 
					}
				}
			}
		});
	},
	
	/**
	 * HHT TABLET MANPOWER TAB START:
	 */
	setManPowerHHT:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var manPowerList = me.getViewModel().getStore('manPowerList');
		manPowerList.removeAll();
		
		if(masterItem.checkVSRList[0].length > 0){
			manPowerList.setData(masterItem.checkVSRList[0]);
			manPowerList.commitChanges();
		}
		
		var empidlist = me.getStore('empidlist');
		var empList = me.getStore('empList');
		var workingYmd = refs.refWorkingDate.getValue();
		//var workingYmd = Ext.Date.format(refs.refWorkYmd.getValue(), MOST.config.Locale.getShortDate());
		//refs.refManPowerStartTime.setValue(me.setFmTimeByShift());
		//refs.refManPowerEndTime.setValue(me.setToTimeByShift());
		
		empidlist.load({
			params:{
				vslCallID : me.glbJPVC,
				shftId : refs.refCbxShft.getValue(),
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
	
	onClearManPowerHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refGrdManPower;
		grid.setSelection(false);
		me.getViewModel().set('theManPower', null);
		me.setTimeWithShiftHHT(me.TAB_MANPOWER);
	},
	
	onAddManPowerHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var dtForm = refs.refFrmVsrManPowerHHT;
		if(!dtForm.validate()){
			MessageUtil.warning("warning_msg", "tbl_vsr_missing_require");
			return;
		}
		var shiftId = me.getViewModel().get('globalWorkShift');
		var strWKDate = me.getViewModel().get('globalWorkDate');

		var strStartDt = Ext.Date.parse(refs.refDtStartTimeManPower.getValue(), 'd/m/Y H:i'); 
		var strEndDt = Ext.Date.parse(refs.refDtEndTimeManPower.getValue(), 'd/m/Y H:i'); 
		var detailItem = me.getViewModel().get('theManPower');
		detailItem.vslCallID = me.glbJPVC;
		detailItem.scn = me.getViewModel().get('theVessel').scn;
		detailItem.workYmd = strWKDate;
		detailItem.shftId = shiftId;
		detailItem.divCd = 'SD';
		detailItem.mbsCd = me.CONST_JPB;

		detailItem.workStDt = strStartDt;
		detailItem.workEndDt = strEndDt;
		detailItem.workingStatus = 'C';

		//Validate time with shift
		if(!me.validateTimeShift(refs.refDtStartTimeManPower, refs.refDtEndTimeManPower)){
			return;
		}
		//validate duplicated:
		if(!me.validateIsExisted(me.TAB_MANPOWER, me.MODE_ADD)){
			return;
		}

		var itemArr = new Array();
		itemArr.push(detailItem);

		var masterItem = Ext.create('MOST.model.operation.VSRCheckList');
		masterItem.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/detail';
		masterItem.phantom = false;
		masterItem.set('newVersion',me.generateUuid());
		masterItem.set('workingStatus',WorkingStatus.INSERT);
		masterItem.set('checkVSRList',itemArr);
		
		masterItem.save({
			success: function(){
				MessageUtil.saveSuccess();
				me.resetManPowerFormHHT();
				me.onSearchHHT();
			}
		});
		
	},
	
	onUpdateManPowerHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refGrdManPower;
		var selected = grid.getSelection();
		if(!selected){
			MessageUtil.warning("warning_msg", "tbl_vsr_select_update");
			return;
		}

		//Validate mandatory
		var dtForm = refs.refFrmVsrManPowerHHT;
		if(!dtForm.validate()){
			MessageUtil.warning("warning_msg", "tbl_vsr_missing_require");
			return;
		}
		//Validate time with shift
		if(!me.validateTimeShift(refs.refDtStartTimeManPower, refs.refDtEndTimeManPower)){
			return;
		}

		//Validate record updation when verify status
		if(selected.get('verifyStatus') === 'VERIFIED'){
			MessageUtil.warning("warning_msg", "tbl_verifystatus_block_msg");
			return;
		}
		//Validate duplicated:
		//...

		var shiftId = refs.refCbxShft.getValue();
		var strWKDate = refs.refWorkingDate.getDate();
		var strStartDt = Ext.Date.parse(refs.refDtStartTimeManPower.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()); 
		var strEndDt = Ext.Date.parse(refs.refDtEndTimeManPower.getValue(),  MOST.config.Locale.getDefaultDateFormatWithNoSeconds()); 
		var detailItem = me.getViewModel().get('theManPower');
		detailItem.vslCallId = me.glbJPVC;
		detailItem.workYmd = strWKDate;
		detailItem.shftId = shiftId;
		detailItem.divCd = 'SD';
		detailItem.mbsCd = me.CONST_JPB;

		detailItem.workStDt = strStartDt;
		detailItem.workEndDt = strEndDt;
		detailItem.workingStatus = 'U';

		//Validate time with shift
		if(!me.validateIsExisted(me.TAB_MANPOWER, me.MODE_UPDATE)){
			return;
		}

		var itemArr = new Array();
		itemArr.push(detailItem);

		var masterItem = Ext.create('MOST.model.operation.VSRCheckList');
		masterItem.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/detail'
		masterItem.phantom = false;
		masterItem.set('workingStatus', WorkingStatus.UPDATE);
		masterItem.set('newVersion',me.generateUuid());
		masterItem.set('checkVSRList',itemArr);

		MessageUtil.questionModern('tbl_confrm_update','tbl_vsr_confirm_update', null,function(button){
			if(button === 'ok'){
				masterItem.save({
					success: function(){
						MessageUtil.saveSuccess();
						me.resetManPowerFormHHT();
						me.onSearchHHT();
					}
				});
			}
		});
	},
	
	onDeleteManPowerHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var dtForm = refs.refFrmVsrManPowerHHT;
		if(!dtForm.validate()){
			MessageUtil.warning("warning_msg", "tbl_vsr_select_delete");
			return;
		}
		var shiftId = refs.refCbxShft.getValue();
		var strWKDate = refs.refWorkingDate.getDate();
		var strStartDt = Ext.Date.parse(refs.refDtStartTimeManPower.getValue(), 'd/m/Y H:i'); 
		var strEndDt = Ext.Date.parse(refs.refDtEndTimeManPower.getValue(), 'd/m/Y H:i'); 
		var detailItem = me.getViewModel().get('theManPower');
		detailItem.workingStatus = 'D';

		var itemArr = new Array();
		itemArr.push(detailItem);

		var masterItem = Ext.create('MOST.model.operation.VSRCheckList');
		masterItem.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/detail';
		masterItem.phantom = false;
		masterItem.set('newVersion',me.generateUuid());
		masterItem.set('workingStatus',WorkingStatus.INSERT);
		masterItem.set('checkVSRList', itemArr);	
		
		MessageUtil.questionModern('Confirm','tbl_vsr_confirm_delete', null,function(button){
			if(button === 'ok'){
				masterItem.save({
					success: function(){
						MessageUtil.saveSuccess();
						me.resetManPowerFormHHT();
						me.onSearchHHT();
					}
				});
			}
		});
	},
	
	onSelectGriddManPowerHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refGrdManPower;
		var selected = grid.getSelection();
		if(!selected){
			me.getViewModel().set('theManPower', null);
			//reset form: ...
			return;
		}
		me.getViewModel().set('theManPower', selected.getData());
		var rowDetail = me.getViewModel().get('theManPower');
		refs.refDtStartTimeManPower.setValue(rowDetail.workStDt);
		refs.refDtEndTimeManPower.setValue(rowDetail.workEndDt);

	},
	
	onJPBStaffHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var targetCtl = 'refTxtStaffId';
		var roleCd = refs.refCboRole.getValue();
		var params = {
			title: me.CONST_JPB,
			roleCd: roleCd,
			shftId: me.getViewModel().get('globalWorkShift'),
			workYmd: me.getViewModel().get('globalWorkDate'),
			vslCallID: me.glbJPVC,
		};
		ViewUtil.openCodePopup(this, 'app-contractorpopuphht', targetCtl, params);
	},
	
	onChangeStaffIdHHT: function(ref, newValue, oldValue, eOpts){
		var me = this;
		var refs = me.getReferences();
		if(!newValue){
			refs.refTxtStaffNm.setValue('');
		}
	},
	
	onSearchWorkingAreaManPowerHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var targetCtl = 'refTxtWorkingArea';
		params = {
			title: ViewUtil.getLabel('poup_title_vsrchecklist_workingarea'),
			searchType: 'COMM',
			lcd : 'MT',
			divCd : 'LOCDIV1',
			screenType : 'TYPE_MANPOWER'
		};		
		ViewUtil.openCodePopup(this, 'app-workingareapopuphht', targetCtl, params);
	},
	
	resetManPowerFormHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refGrdManPower;
		var dtForm = refs.refFrmVsrManPowerHHT;
		grid.setSelection(false);
		me.getViewModel().set('theManPower', null);
		
		refs.refDtStartTimeManPower.setValue('');
		refs.refDtEndTimeManPower.setValue('');
		refs.refWorkingDate.setValue('');
		refs.refCbxShft.setValue('');
	},
	/**
	 * HHT TABLET MANPOWER TAB END.
	 */
	
	
	
	
	/**
	 * START HHT TABLET Port Crane TAB
	 */
	setPortCraneHHT:function(masterItem){
		var me = this;
		var refs = me.getReferences();		
		var portCraneList = me.getViewModel().getStore('portCraneList');
		refs.refPCCargoTypeHHT.setValue('BBK');
		
		portCraneList.removeAll();
		if(masterItem.checkVSRList[3].length > 0){
			portCraneList.setData(masterItem.checkVSRList[3]);
		}
		
	},
	
	onGridPortCraneClick: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refPortCraneHHTGrid');
		var eqPCCombo = me.getStore('eqPCCombo');
		
		var selection = grid.getSelection();
		if(selection == null) return;
		
		if(StringUtil.isNullorEmpty(selection.get('capaCd'))){			
			refs.refShipCraneRdo._checked = true;
			refs.refShipCraneRdo.updateChecked(true);
		}else{
			refs.refPortCraneRdo._checked = true;
			refs.refPortCraneRdo.updateChecked(true);
		}
		me.getViewModel().set('theVSRPortCrane', selection.getData());
		var rowData = me.getViewModel().get('theVSRPortCrane');
		var mbsCd = rowData.mbsCd;
		var operator = rowData.operator;
		if(mbsCd === me.CONST_JPB){
			refs.refPortCraneJPBRdo._checked = true;
			refs.refPortCraneJPBRdo.updateChecked(true);
			rowData.empId = operator
		}else if(mbsCd === me.CONST_CTR){
			refs.refPortCraneContractorRdo._checked = true;
			refs.refPortCraneContractorRdo.updateChecked(true);
			rowData.cnrtCd = operator
		}
		
		var pcCombo = eqPCCombo.findRecord('capaCd', selection.get('capaCd'));
		if(refs.refShipCraneRdo._checked == true){
			refs.refPCShipCraneHHT.setValue(selection.get('eqNo'));
		}else{
			refs.refPCEqNoHHT.setValue(pcCombo.get('eqNo'));
		}
		refs.refStartTimePortCranefield.setValue(selection.get('workStDt'));
		refs.refEndTimePortCranefield.setValue(selection.get('workEndDt'));
	},
	
	onChangeJPBGroup: function(radioField,newValue, oldValue) {
		var me = this;
		var refs = me.getReferences();
		var rdoValue = me.getPortCraneRadioValueHHT();
		var isJPB = (rdoValue == 'JPB');
		var isCTR = (rdoValue == 'contractor');
		var isNonOpe = (rdoValue == '');
		
		if(newValue){
			if(isJPB){
				me.getViewModel().setData({JPBModeHHT:newValue});
				refs.refPCContractorHHTField.setValue('');
			}
			else if(isCTR){
				me.getViewModel().setData({JPBModeHHT:!newValue});
				refs.refVSRJPBscbx.setValue('');
			}
		}
	},
	
	onChangeCraneHHTGroup: function(radioField,newValue, oldValue) {
		var me = this;
		var refs = me.getReferences();
		
		if(radioField.getValue() == 'portCrane' && newValue){
			me.getViewModel().setData({CraneModeHHT:newValue});
			refs.refPCEqNoHHT.setHidden(false);
			refs.refPCShipCraneHHT.setHidden(true);
			refs.refPCShipCraneHHT.clearValue();
		}
		else if(radioField.getValue() == 'shipCrane' && newValue){
			me.getViewModel().setData({CraneModeHHT:!newValue});
			refs.refPCEqNoHHT.setHidden(true);
			refs.refPCShipCraneHHT.setHidden(false);
			refs.refPCEqNoHHT.clearValue();
		}
	},
	
	getPortCraneRadioValueHHT: function(){
		var me = this;
		var refs = me.getReferences();
		if(refs.refPortCraneJPBRdo.getChecked()){		// JPB
			return refs.refPortCraneJPBRdo.getValue();
		}else if(refs.refPortCraneContractorRdo.getChecked()){	// Contractor
			return refs.refPortCraneContractorRdo.getValue();
		}
		return null;
	},
	
	// cud Port Crane 
	onAddPortCraneHHT:function(){
		var me = this;
		var refs = me.getReferences();
		var eqPCCombo = me.getStore('eqPCCombo');
		var dbStore = me.getStore('vsrCheckListDetail');
		var sendArray = new Array();
		var detailData =Ext.create('MOST.model.operation.VSRCheckList').data;
		
		var dtForm = refs.refFrmVsrPortCraneHHT;
		if(!dtForm.validate()){
			MessageUtil.warning("warning_msg", "tbl_vsr_missing_require");
			return;
		}
		if(!me.validateTimeShift(refs.refStartTimePortCranefield, refs.refEndTimePortCranefield)){
			return;
		}
		detailData.workingStatus = "C";
		detailData.vslCallID = me.getViewModel().get('globalVesselCallId');
		detailData.scn = me.getViewModel().get('theVessel').scn;
		detailData.userID = MOST.config.Token.getUserId();
		detailData.divCd = "PC";
		
		detailData.workStDt = Ext.Date.parse(refs.refStartTimePortCranefield.getValue(), 'd/m/Y H:i');
		detailData.workEndDt = Ext.Date.parse(refs.refEndTimePortCranefield.getValue(), 'd/m/Y H:i');

		detailData.workYmd = me.getViewModel().get('globalWorkDate');
		detailData.shftId = me.getViewModel().get('globalWorkShift');
		
		detailData.purposeNm = refs.refPurposePortCranecbx.getInputValue();
		detailData.purpose = refs.refPurposePortCranecbx.getValue();
		detailData.capaDescr = refs.refPCCapaDescHHT.getValue();
		detailData.cnrtCd = refs.refPCContractorHHTField.getValue();
		detailData.empId = refs.refVSRJPBscbx.getValue();
		if (refs.refPortCraneJPBRdo.isChecked()){
			detailData.operator = refs.refVSRJPBscbx.getValue();
			detailData.mbsCd= me.CONST_JPB;
        }else if(refs.refPortCraneContractorRdo.isChecked()) {
			detailData.operator = refs.refPCContractorHHTField.getValue();
			detailData.mbsCd= me.CONST_CTR;
        }
		
		detailData.cgTpCd = refs.refPCCargoTypeHHT.getValue();
		detailData.payer = refs.refRequesterPortCraneField.getValue();
		detailData.empNm = refs.refVSRJPBscbx.getInputValue();
		detailData.rmk = refs.refPortCraneRmkHHTField.getValue();
		
		var strPCRsNm ="";
		var strPCEngNm ="";
		var strPCCapaCd="";
		if(refs.refShipCraneRdo._checked){
			strPCRsNm = refs.refPCShipCraneHHT.getValue();
			strPCEngNm = refs.refPCShipCraneHHT.getValue();
		}else if(refs.refPortCraneRdo._checked){
			strPCRsNm = refs.refPCEqNoHHT.getValue();
            strPCEngNm = refs.refPCEqNoHHT.getInputValue();
            if (!StringUtil.isNullorEmpty(strPCEngNm) && strPCEngNm.indexOf("/") > -1)
            {
                strPCEngNm = Ext.util.Format.substr(strPCEngNm, 0,strPCEngNm.indexOf("/")-1);
            }
		}
	
		// detailData.capaCd = strPCCapaCd
		detailData.capaCd =refs.refPCCapaCdHHT.getValue();
		detailData.engNm = strPCEngNm;
		detailData.rsNm = strPCRsNm;
		
		// validate duplicated:
		if(!me.validateIsExisted(me.TAB_PORTCRANE, me.MODE_ADD,detailData)){
			return;
		}
		sendArray.push(detailData);
		
		var masterItem = Ext.create('MOST.model.operation.VSRCheckList');
		masterItem.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/detail';
		masterItem.phantom = false;
		masterItem.set('newVersion',me.generateUuid());
		masterItem.set('workingStatus',WorkingStatus.INSERT);
		masterItem.set("checkVSRList", sendArray);
		masterItem.save({
			success:function(){
				MessageUtil.saveSuccess();		
				dbStore.reload();
				me.onClearPortCraneHHT();
			}
		});
		
	},
	
	onCheckUpdatePortCraneHHT:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refPortCraneHHTGrid;
		var selection = grid.getSelection();
		if(selection == null || selection == undefined){
			MessageUtil.error('warning_msg','VSRChLstNonJPVCReportMessage');
			return;
		}	
		// Validate mandatory
		var dtForm = refs.refFrmVsrPortCraneHHT;
		if(!dtForm.validate()){
			MessageUtil.warning("warning_msg", "tbl_vsr_missing_require");
			return;
		}
		if(!me.validateTimeShift(refs.refStartTimePortCranefield, refs.refEndTimePortCranefield)){
			return;
		}
		//Validate record updation when verify status
		if((selection.get('verifyStatus') === 'VERIFIED')){
			MessageUtil.warning("warning_msg", "tbl_verifystatus_block_msg");
			return;
		}
		MessageUtil.questionModern('Confirm', 'infoupdate_msg',null,
				function(button){
					if (button === 'ok') {
						me.UpdatePortCraneHHT();
			        }else if(button === 'cancel'){
			        	return;
			        };
				}
			);	
	},
	
	UpdatePortCraneHHT:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refPortCraneHHTGrid;
		var dbStore = me.getStore('vsrCheckListDetail');
		var store = me.getStore('portCraneList');
		var selecedRecord = grid.getSelection() ;
		
		var sendArray = new Array();
		var strPCRsNm ="";
		var strPCEngNm ="";
		var detailData = me.getViewModel().get('theVSRPortCrane');
		
		var sltIndex = grid.store.indexOf(selecedRecord);
	
		store.each(function(record, index){
			if(index === sltIndex){					
				record.set("workingStatus", 'U');
				record.set("vslCallID", me.getViewModel().get('globalVesselCallId').toUpperCase());
				record.set("userId", MOST.config.Token.getUserId());
				record.set("divCd", 'PC');
				record.set("capaCd", refs.refPCCapaCdHHT.getValue());
				record.set("capaDescr",refs.refPCCapaDescHHT.getValue());
				record.set("workStDt",Ext.Date.parse(refs.refStartTimePortCranefield.getValue(), 'd/m/Y H:i'));
				record.set("workEndDt",Ext.Date.parse(refs.refEndTimePortCranefield.getValue(), 'd/m/Y H:i'));
				record.set("workYmd",refs.refWorkingDate.getDate());
				record.set("shftId",refs.refCbxShft.getValue());
				record.set("purposeNm",refs.refPurposePortCranecbx.getInputValue());
				record.set("purpose",refs.refPurposePortCranecbx.getValue());
				record.set("capaDescr",refs.refPCCapaDescHHT.getValue());
				record.set("cnrtCd",refs.refPCContractorHHTField.getValue());
				
				if(refs.refPortCraneJPBRdo._checked){
					record.set("mbsCd", me.CONST_JPB);
				}else if(refs.refPortCraneContractorRdo._checked){
					record.set("mbsCd", me.CONST_CTR);
				}		
				record.set("empId", refs.refVSRJPBscbx.getValue());		
				record.set("cgTpCd",refs.refPCCargoTypeHHT.getValue());
				record.set("payer",refs.refRequesterPortCraneField.getValue());
				record.set("rmk",refs.refPortCraneRmkHHTField.getValue());
				if(refs.refShipCraneRdo._checked){
					strPCRsNm = refs.refPCShipCraneHHT.getValue();
					strPCEngNm = refs.refPCShipCraneHHT.getValue();
				}else if(refs.refPortCraneRdo._checked){
					strPCRsNm = refs.refPCEqNoHHT.getValue();
		            strPCEngNm = refs.refPCEqNoHHT.getInputValue();
		            if (!StringUtil.isNullorEmpty(strPCEngNm) && strPCEngNm.indexOf("/") > -1)
		            {
		                strPCEngNm=   Ext.util.Format.substr(strPCEngNm, 0,strPCEngNm.indexOf("/")-1);
		            }
				}
				record.set("engNm",strPCEngNm);
				record.set("rsNm",strPCRsNm);

				record.setupTime = refs.refStartTimePortCranefield.getValue();			
				record.dirty = true;
				sendArray.push(record.data);
			}
		});
		// Validate time with shift
		 if(!me.validateIsExisted(me.TAB_PORTCRANE, me.MODE_UPDATE,sendArray[0])){
			 return;
		 }
		 var masterItem = Ext.create('MOST.model.operation.VSRCheckList');
			masterItem.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/detail';
			masterItem.phantom = false;
			masterItem.set('newVersion',me.generateUuid());
			masterItem.set('workingStatus',WorkingStatus.UPDATE);
			masterItem.set('checkVSRList', sendArray);
			masterItem.save({
				success:function(){
					MessageUtil.saveSuccess();
					dbStore.reload();
					me.onClearPortCraneHHT();
				}
			});
	},

	onDeletePortCraneHHT:function(){
		var me = this;
		var me = this;
		var refs = me.getReferences();
		var dbStore = me.getStore('vsrCheckListDetail');
		var grid = refs.refPortCraneHHTGrid;
		var store = me.getStore('portCraneList');
		var selecedRecord = grid.getSelection() ;				
		var sltIndex = grid.store.indexOf(selecedRecord);
		var sendArray = new Array();
		
		store.each(function(record, index){
			if(index === sltIndex){			
				store.remove(record);
				record.set('workingStatus', 'D');
				record.set('userId',MOST.config.Token.getUserId());
				sendArray.push(record.data);
			}
		});
	
		if(sendArray.length == 0){
			MessageUtil.error('warning_msg','shiftingdoublebanking_delete_empty');
			return;
		}
		var cudData = Ext.create('MOST.model.operation.VSRCheckList');
		cudData.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/detail';
		cudData.phantom = false;
		cudData.set('newVersion',me.generateUuid());
		cudData.set('workingStatus',WorkingStatus.DELETE);
		cudData.set('checkVSRList', sendArray);
		
		MessageUtil.questionModern('Confirm', 'tbl_vsr_confirm_delete',null, function(button){
			if (button === 'ok') {
				cudData.save({
					success:function(){
						MessageUtil.saveSuccess(); 
						dbStore.reload()
					}
				})
	        }else if(button === 'cancel'){
	        	dbStore.reload()
	        	return;
	        };
		});
	},
	
	// end cud Port Crane 
	setFmTimeByShiftHHT: function(){
	 var me = this;
	 var refs = me.getReferences();
		
	 var shiftListStore = me.getStore('shiftList');
 	 if(shiftListStore.loadCount <= 0){
 		 shiftListStore.load();
 	 }
 	 // var shftId= refs.refShift.getValue();
 	 var shftIdx = refs.refCbxShft.getSelection().get('shftIdx');
 	 var shftId = MOST.config.Token.getWorkShift();
 	 var shift = shiftListStore.findRecord('shftIdx', shftIdx);
 	 var fmShiftTime;
		
 	 if(shift){
 		fmShiftTime = Ext.Date.parse(refs.refWorkingDate.getValue() + ' ' + shift.get('fmHhMm').substr(0,2) + ':' +
 		shift.get('fmHhMm').substr(2,2), 'd/m/Y H:i');
 	 }
		
 	 return fmShiftTime;
 	},
 	
 	setToTimeByShiftHHT: function(){ 
		var me = this;
		var refs = me.getReferences();
		
		var shiftListStore = me.getStore('shiftList');
		if(shiftListStore.loadCount <= 0){
			shiftListStore.load();
		}
		
		var shftIdx = refs.refCbxShft.getSelection().get('shftIdx');
		var shftId= refs.refCbxShft.getValue();
		var shift = shiftListStore.findRecord('shftIdx', shftIdx);
		var toShiftTime;
		if(shift){
			toShiftTime = Ext.Date.parse(refs.refWorkingDate.getValue() + ' ' + shift.get('toHhMm').substr(0,2) + ':' + shift.get('toHhMm').substr(2,2),  'd/m/Y H:i');
		}
		
//		if(shftId == 'SF0013'){
//			toShiftTime.setDate(toShiftTime.getDate() + 1);
//		}
		
		if(shftIdx == '3'){
			toShiftTime.setDate(toShiftTime.getDate() + 1);
		}
		
		return toShiftTime;
		
	},
 	
 	onSearchRequesterPCHHT:function(){
		var me = this;
		var title = ViewUtil.getLabel('poup_title_vsrchecklist_pctab_requester')
		var params = {
				title: title
			};		
		ViewUtil.openCodePopup(me, 'app-requesterpopuphht', 'refBtnRequesterPortCrane', params);
	},
	
	onClearPortCraneHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refPortCraneHHTGrid;
		grid.setSelection(false);
		me.getViewModel().set('theVSRPortCrane', null);
		refs.refPCEqNoHHT.setValue('');
		refs.refPCShipCraneHHT.setValue('');
		refs.refPCCargoTypeHHT.reset();
		refs.refPCCargoTypeHHT.setValue('BBK');
		me.setTimeWithShiftHHT(me.TAB_PORTCRANE);
	},
	
	onChangeEqTypeHHT:function(){
		var me = this;
		var refs = me.getReferences();
		var eqPCCombo = me.getStore('eqPCCombo');
		var index = eqPCCombo.find('eqNo', refs.refPCEqNoHHT.getValue());
		if(index != -1) {
			var capaDescr = eqPCCombo.getAt(index).get('capaDescr');
			var capaCd = eqPCCombo.getAt(index).get('capaCd');
			refs.refPCCapaCdHHT.setValue(capaCd);
			refs.refPCCapaDescHHT.setValue(capaDescr);
		}else {
			refs.refPCCapaCdHHT.setValue('');
			refs.refPCCapaDescHHT.setValue('');
		}
	},
	/**
	 * END HHT TABLET Port Crane TAB
	 * */
	
	
	/**
	 * START HHT TABLET stevedore TAB
	 * */
	setStevedoreHHT:function(masterItem){
		var me = this;
		var refs = me.getReferences();		
		var stevedoreList = me.getViewModel().getStore('stevedoreList');
		stevedoreList.removeAll();
		if(masterItem.checkVSRList[5].length > 0){
			stevedoreList.setData(masterItem.checkVSRList[5]);
		}
		stevedoreList.commitChanges();
	},
	
	onGridYDSteveDoreClick:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refVSRStevedoreHHTGrid');

		var selection = grid.getSelection();
		if(selection == null) return;
		me.getViewModel().set('theVSRSteveDoreHHT', selection.getData());
		
		refs.refStartTimeYDStvTimefield.setValue(selection.get('workStDt'));
		refs.refEndTimeYDStvTimefield.setValue(selection.get('workEndDt'));
	},
	
	onSearchSearchStvTabHHT: function(){
		var me = this;
		var targetCtl = 'refBtnSearchStvTabVSR';
		var title = ViewUtil.getLabel('poup_title_vsrchecklist_stevedore');
		var params = {
				title: title,
				searchType: 'STV',
			};
		ViewUtil.openCodePopup(me, 'app-commoncodepopuphht', targetCtl, params);
	},
	
	onSearchRequestorStvHHT:function(){
		var me = this;
		var params = {
				title: ViewUtil.getLabel('poup_title_vsrchecklist_requester'),
				ptyCd: ''
			};		
		ViewUtil.openCodePopup(me, 'app-requesterpopuphht', 'refRequesterStvHHTField', params);
	},
	
	onSearchWorkingAreaStvHHT:function(){
		var me = this;
		var params = {
				title: ViewUtil.getLabel('poup_title_vsrchecklist_workingarea'),
				searchType: 'COMM',
				lcd : 'MT',
				divCd : 'LOCDIV1',
				screenType : 'TYPE_STEVEDORE'
			};		
		ViewUtil.openCodePopup(me, 'app-workingareapopuphht', 'refWAreaStvHHTField', params);
	},
	
	onClearStevedoreVSRHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refVSRStevedoreHHTGrid;
		grid.setSelection(false);
		me.getViewModel().set('theVSRSteveDoreHHT', null);
		me.setTimeWithShiftHHT(me.TAB_STEVEDORE);
	},
	
	onAddStevedoreTabHHT: function() {
		var me = this;
		var refs = me.getReferences();
		var sendArray = new Array();
		var grid = me.lookupReference('refVSRStevedoreHHTGrid');
		var store = me.getStore('stevedoreList');
		var dbStore = me.getStore('vsrCheckListDetail');
		var dtForm = refs.refFrmVsrStevedoreHHT;
		if(!dtForm.validate()){
			MessageUtil.warning("warning_msg", "tbl_vsr_missing_require");
			return;
		}
		if(!me.validateTimeShift(refs.refStartTimeYDStvTimefield, refs.refEndTimeYDStvTimefield)){
			return;
		}
		var record = Ext.create('MOST.model.operation.VSRCheckList');
		
		record.set("stvdComp", refs.refStevedoreCompHHTField.getValue());
		record.set("nofStvdSprr", refs.refSupervisorStvHHTField.getValue());
		record.set("stvdNonTon", refs.refNonTonnageStvHHTField.getValue());
		record.set("workLoc", refs.refWAreaStvHHTField.getValue());
		record.set("rmk", refs.refStevedoreHHTRemarks.getValue());
		record.set("payer", refs.refRequesterStvHHTField.getValue());		
		record.set("purposeNm", refs.refPurposeStvHHTcbx.getInputValue());
		record.set("purpose", refs.refPurposeStvHHTcbx.getValue());
		record.set("vslCallID", me.getViewModel().get('globalVesselCallId').toUpperCase());
		record.set("scn", me.getViewModel().get('theVessel').scn);
		record.set("userId", MOST.config.Token.getUserId());
		record.set("workStDt",Ext.Date.parse(refs.refStartTimeYDStvTimefield.getValue(), 'd/m/Y H:i'));
		record.set("workEndDt",Ext.Date.parse(refs.refEndTimeYDStvTimefield.getValue(), 'd/m/Y H:i'));
		record.set("workYmd",refs.refWorkingDate.getDate());
		record.set("shftId",refs.refCbxShft.getValue());
		record.set("workingStatus", 'C');
		record.set("divCd", 'ST');
		
		if(!me.validateIsExisted(me.TAB_STEVEDORE, me.MODE_ADD,record.data)){
			return;
		}
		sendArray.push(record.data);
		
		var masterItem = Ext.create('MOST.model.operation.VSRCheckList');
		masterItem.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/detail';
		masterItem.phantom = false;
		masterItem.set('newVersion',me.generateUuid());
		masterItem.set('workingStatus',WorkingStatus.INSERT);
		masterItem.set("checkVSRList", sendArray);
		masterItem.save({
			success:function(){
				MessageUtil.saveSuccess();		
				dbStore.reload();
				me.onClearStevedoreVSRHHT();
			}
		});
	},
	
	onUpdateStevedoreHHT:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('stevedoreList');
		var grid = me.lookupReference('refVSRStevedoreHHTGrid');
		var dbStore = me.getStore('vsrCheckListDetail');
		var selecedRecord = grid.getSelection();
		var dtForm = refs.refFrmVsrStevedoreHHT;
		var sendArray = new Array();
		if (selecedRecord === null) return
		if(!dtForm.validate()){
			MessageUtil.warning("warning_msg", "tbl_vsr_missing_require");
			return;
		}
			
		if(!me.validateTimeShift(refs.refStartTimeYDStvTimefield, refs.refEndTimeYDStvTimefield)){
			return;
		}
		
		//Validate record updation when verify status
		if((selecedRecord.get('verifyStatus') === 'VERIFIED')){
			MessageUtil.warning("warning_msg", "tbl_verifystatus_block_msg");
			return;
		}
		var sltIndex = grid.store.indexOf(selecedRecord);	
			store.each(function(record, index){
				if(index === sltIndex){					
					record.set("stvdComp", refs.refStevedoreCompHHTField.getValue());
					record.set("nofStvdSprr", refs.refSupervisorStvHHTField.getValue());
					record.set("stvdNonTon", refs.refNonTonnageStvHHTField.getValue());
					record.set("workLoc", refs.refWAreaStvHHTField.getValue());
					record.set("rmk", refs.refStevedoreHHTRemarks.getValue());
					record.set("payer", refs.refRequesterStvHHTField.getValue());		
					record.set("purposeNm", refs.refPurposeStvHHTcbx.getInputValue());
					record.set("purpose", refs.refPurposeStvHHTcbx.getValue());
					record.set("vslCallID", me.getViewModel().get('globalVesselCallId').toUpperCase());
					record.set("userId", MOST.config.Token.getUserId());
					record.set("workStDt",Ext.Date.parse(refs.refStartTimeYDStvTimefield.getValue(), 'd/m/Y H:i'));
					record.set("workEndDt",Ext.Date.parse(refs.refEndTimeYDStvTimefield.getValue(), 'd/m/Y H:i'));
					record.set("workYmd",refs.refWorkingDate.getDate());
					record.set("shftId",refs.refCbxShft.getValue());
					record.set("workingStatus", 'U');
					record.set("divCd", 'ST');		
					record.dirty = true;
					sendArray.push(record.data);
				}
			});
			// validate duplicated:
			if(!me.validateIsExisted(me.TAB_STEVEDORE, me.MODE_UPDATE,sendArray[0])){
				return;
			}
			// validate duplicated:
			if(!me.validateIsExisted(me.TAB_STEVEDORE, me.MODE_UPDATE,sendArray[0])){
				return;
			}
		
			var masterItem = Ext.create('MOST.model.operation.VSRCheckList');
			masterItem.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/detail';
			masterItem.phantom = false;
			masterItem.set('newVersion',me.generateUuid());
			masterItem.set('workingStatus',WorkingStatus.UPDATE);
			masterItem.set("checkVSRList", sendArray);
			MessageUtil.questionModern('tbl_confrm_update','tbl_vsr_confirm_update', null,function(button){
				if(button === 'ok'){
					masterItem.save({
						success: function(){
							MessageUtil.saveSuccess();
							dbStore.reload();
							me.onClearStevedoreVSRHHT();
						}
					});
				}
			});
	},
	onRemoveStevedoreHHT: function() {
		var me = this;
		var refs = me.getReferences();
		var dbStore = me.getStore('vsrCheckListDetail');
		var sendArray = new Array();
		var cudData = Ext.create('MOST.model.operation.VSRCheckList');
		var grid = refs.refVSRStevedoreHHTGrid;
		var store = me.getStore('stevedoreList');
		var selecedRecord = grid.getSelection() ;				
		var sltIndex = grid.store.indexOf(selecedRecord);
		
		store.each(function(record, index){
			if(index === sltIndex){			
				store.remove(record);
				record.set('workingStatus', 'D');
				record.set('userId',MOST.config.Token.getUserId());
				sendArray.push(record.data);
			}
		});
		
		if(sendArray.length == 0){
			MessageUtil.error('warning_msg','shiftingdoublebanking_delete_empty');
			return;
		}
		
		var cudData = Ext.create('MOST.model.operation.VSRCheckList');
		cudData.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/detail';
		cudData.phantom = false;
		cudData.set('newVersion',me.generateUuid());
		cudData.set('workingStatus',WorkingStatus.INSERT);
		cudData.set('checkVSRList', sendArray);	
		
		MessageUtil.questionModern('Confirm', 'tbl_vsr_confirm_delete',null,function(button){
			if (button === 'ok') {
				cudData.save({
					success:function(){
						MessageUtil.saveSuccess(); 
						dbStore.reload();
						me.onClearStevedoreVSRHHT();
					}
				})
	        }else if(button === 'cancel'){
	        	dbStore.reload()
	        	return;
	        };
		});
	},		
	/**
	 * END HHT TABLET stevedore TAB
	 * */
	
	
	/**
	 * HHT TABLET FORKLIFT TAB START:
	 */
	onSearchRequestorTrailerHHT:function(){
		var me = this;
		var params = {
				title: ViewUtil.getLabel('poup_title_vsrchecklist_requester'),
				ptyCd: ''
			};		
		ViewUtil.openCodePopup(me, 'app-requesterpopuphht', 'refBtnSearchTrailerHHT', params);
	},
	
	setForkliftHHT:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var refNo = me.setDefaultRefNoHHT();
		if(refNo != ''){
			refs.refFLTxtRefNo.setValue(refNo);
		}
		var forkliftList = me.getViewModel().getStore('forkliftList');
		
		refs.refCboCargoTpFL.setValue('BBK');
		
		forkliftList.	setData(masterItem.checkVSRList[1]);
		forkliftList.each(function(item){
			item.data.confirmStatus = me.ITEM_CONFIRMED;
		});
		forkliftList.commitChanges();
	},
	
	onActivateFL: function (){
		var me = this;
		var refs = me.getReferences();
		var purposeCombo = me.getStore('purposeCombo');
		if(purposeCombo.loadCount <= 0){
			purposeCombo.load();
		}
	},

	setMegaFLHHT:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var megaFListStore = me.getViewModel().getStore('megaFList');
		var forkliftList = me.getViewModel().getStore('forkliftList');
		if(masterItem.megaFListHHT && masterItem.megaFListHHT.length > 0){
			megaFListStore.setData(masterItem.megaFListHHT);
			megaFListStore.each(function(item){
				var mega = item.data;
				mega.confirmStatus = me.ITEM_NOTCONFIRMED;
				me.setValueWorkDateEQ(mega);
				me.displayMegaForVSR(mega, forkliftList);
			});
			megaFListStore.commitChanges();
		}
	},

	setValueWorkDateEQ: function(megaVSR){
		var me = this;
		var refs = me.getReferences();

		var shift = refs.refCbxShft.getSelection();
//		var strWKDate = refs.refWorkingDate.getDate();
//		var strStartDt = strWKDate + ' ' + shift.get('fmHhMm').substr(0, 2) + ':' + shift.get('fmHhMm').substr(2, 4);
//		var strEndDt = strWKDate + ' ' + shift.get('toHhMm').substr(0, 2) + ':' + shift.get('toHhMm').substr(2, 4);
//
//		var stDt = Ext.Date.parse(strStartDt,  'd/m/Y H:i');
//		var endDt = Ext.Date.parse(strEndDt, 'd/m/Y H:i');
		
		var stDt = me.setFromByShift2();
		var endDt = me.setToTimeByShift2();
		
		if(shift.get('shftId') === 'SF0013'){
			endDt = new Date(endDt.getTime() + (24 * 60 * 60 * 1000));
		}

		megaVSR.setupTime = stDt;
		megaVSR.workStDt = stDt
		megaVSR.workEndDt = endDt;
	},
	
	onCheckRadioDriverFL: function(raidoField, newValue){
		var me = this;
		var refs = me.getReferences();
		var theForkLift = me.getViewModel().get('theForkLift');
		var rdoValue = me.getDriverRadioFLValueHHT();
		var isJPB = (rdoValue == 'JPB');
		var isCTR = (rdoValue == me.CONST_CTR);
		var isNonOpe = (rdoValue == '');

		if(isJPB){
			me.getViewModel().setData({isRdoJPBFL: true});
			refs.refTxtContractorFL.setValue('');
		}else if(isCTR){
			me.getViewModel().setData({isRdoJPBFL: false});
			refs.refCboJPBFL.setValue('');
		}else if(isNonOpe){
			/* */ 
			refs.refTxtContractorFL.setValue('')
			refs.refCboJPBFL.setValue('');
			refs.refTxtContractorFL.setDisabled(true)
			refs.refCboJPBFL.setDisabled(true)
			refs.refTxtContractorFL.setReadOnly(true)
			refs.refCboJPBFL.setReadOnly(true)
			refs.refTxtContractorFL.setRequired(false)
			refs.refCboJPBFL.setReadOnly(false)
		}
	},

	getDriverRadioFLValueHHT: function(){
		var me = this;
		var refs = me.getReferences();
		if(refs.refRadioNoDriverFL.getChecked()){
			return refs.refRadioNoDriverFL.getValue();
		}else if(refs.refRadioJPBFL.getChecked()){
			return refs.refRadioJPBFL.getValue();
		}else if(refs.refRadioContractorFL.getChecked()){
			return refs.refRadioContractorFL.getValue();
		}
		return null;
	},
	
	getOperatorForkliftHHT: function(){
	    var me = this;
		var refs = me.getReferences();
		var rdoValue = me.getDriverRadioFLValueHHT();
        var operator = '';
		if(rdoValue === me.CONST_JPB){
			operator = refs.refCboJPBFL.getValue()
		}
		if(rdoValue === me.CONST_CTR){
			operator = refs.refTxtContractorFL.getValue();
		}
		return operator;
	},

	onChangeCboForkLiftHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var selected = refs.refCboForkliftNo.getSelection();
		var capaDescr = (!selected ? null: selected.data.capaDescr)
		refs.refTxtForkliftCapa.setValue(capaDescr);
	},

	onAddForkLiftHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var detailForm = refs.refFrmVsrForkLiftHHT;
		if(!detailForm.validate()){
			MessageUtil.warning("warning_msg", "tbl_vsr_missing_require");
			return;
		}
		//Validate time with shift
		if(!me.validateTimeShift(refs.refDtStartTimeFL, refs.refDtEndTimeFL, refs.refDtEQArrvFL)){
			return;
		}
		var detailItem = me.makeForkLiftItem(me.MODE_ADD);
		//validate duplicated:
		if(!me.validateIsExisted(me.TAB_FORKLIFT, me.MODE_ADD, detailItem)){
			MessageUtil.warning('warning_msg', 'Duplicated forklift info.');//Testing
			return;
		}
		var itemArr = new Array();
		itemArr.push(detailItem);
		
		var masterItem = Ext.create('MOST.model.operation.VSRCheckList');
		masterItem.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/detail';
		masterItem.phantom = false; 
		masterItem.set('newVersion',me.generateUuid());
		masterItem.set('workingStatus',WorkingStatus.INSERT);
		masterItem.set('checkVSRList',itemArr);
		masterItem.save({
			success: function(){
				MessageUtil.saveSuccess();
				me.resetForkLiftFormHHT();
				me.onSearchHHT();
			}
		});
	},

	onUpdateForkLiftHHT: function(){
		var me = this;
		var refs = me.getReferences();

		var grid = refs.refGrdForkLift;
		var selected = grid.getSelection();
		if(!selected){
			MessageUtil.warning("warning_msg", "tbl_vsr_select_update");
			return;
		}

		//Validate mandatory
		var dtForm = refs.refFrmVsrForkLiftHHT;
		if(!dtForm.validate()){
			MessageUtil.warning("warning_msg", "tbl_vsr_missing_require");
			return;
		}
		//Validate time with shift
		if(!me.validateTimeShift(refs.refDtStartTimeFL, refs.refDtEndTimeFL, refs.refDtEQArrvFL)){
			return;
		}

		var detailItem = me.makeForkLiftItem(me.MODE_UPDATE);
		var msgContent = '';
		if(detailItem.confirmStatus == me.ITEM_NOTCONFIRMED && detailItem.refYn == 'Y'){
			msgContent = 'tbl_vsr_confirm_deploymega'; //Deploy from Mega
		}else{
			msgContent = 'tbl_vsr_confirm_update'; //Update VSR
		}

		//Validate exists:
		if(!me.validateIsExisted(me.TAB_FORKLIFT, me.MODE_UPDATE, detailItem)){
			MessageUtil.warning('warning_msg', 'Duplicated forklift info.');
			return;
		}

		if(selected.get('verifyStatus') === 'VERIFIED'){
			MessageUtil.warning("warning_msg", "tbl_verifystatus_block_msg");
			return;
		}

		var itemArr = new Array();
		itemArr.push(detailItem);

		var masterItem = Ext.create('MOST.model.operation.VSRCheckList');
		masterItem.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/detail'
		masterItem.phantom = false;
		masterItem.set('workingStatus', WorkingStatus.UPDATE);
		masterItem.set('newVersion',me.generateUuid());
		masterItem.set('checkVSRList',itemArr);
		MessageUtil.questionModern('tbl_confrm_update', msgContent, null,function(button){
			if(button === 'ok'){
				masterItem.save({
					success: function(){
						MessageUtil.saveSuccess();
						me.resetForkLiftFormHHT();
						me.onSearchHHT();
					}
				});
			}
		});
	},
	
	makeForkLiftItem: function(mode){
		var me = this;
		var refs = me.getReferences();
		var shiftId = me.getViewModel().get('globalWorkShift');
		var strWKDate = me.getViewModel().get('globalWorkDate');
		var strStartDt = Ext.Date.parse(refs.refDtStartTimeFL.getValue(), 'd/m/Y H:i'); 
		var strEndDt = Ext.Date.parse(refs.refDtEndTimeFL.getValue(), 'd/m/Y H:i');
		var setupTime = Ext.Date.parse(refs.refDtEQArrvFL.getValue(), 'd/m/Y H:i');
		var detailItem = me.getViewModel().get('theForkLift');
		var flift = refs.refCboForkliftNo.getSelection();

		detailItem.delvTpCd = refs.refCboDelvTpFL.getValue();
		detailItem.vslCallID = me.glbJPVC;
		detailItem.scn = me.getViewModel().get('theVessel').scn;
		detailItem.workYmd = strWKDate;
		detailItem.shftId = shiftId;
		detailItem.divCd = 'FL';
		detailItem.cgTpCd = refs.refCboCargoTpFL.getValue();

		if(flift){
			detailItem.capaCd = flift.data.capaCd;
		}
		
		detailItem.mbsCd = me.getDriverRadioFLValueHHT();
		if(detailItem.mbsCd == me.CONST_JPB){
			detailItem.empId = me.getOperatorForkliftHHT();
		}else if(detailItem.mbsCd == me.CONST_CTR){
			detailItem.cnrtCd = me.getOperatorForkliftHHT();
		}else{
			detailItem.cnrtCd = "";
		}

		detailItem.workLoc = me.wkAreaFLRes.code; // No contain Area Name
		detailItem.workLocTp = me.wkAreaFLRes.typeCd; // divLoc typeCd
		detailItem.workStDt = strStartDt;
		detailItem.workEndDt = strEndDt;
		detailItem.setupTime = setupTime;

		if(mode == me.MODE_ADD){
			//In case of add new from a Item which confirmed from Mega -> need to remove Mega RefNo and refYn also
			detailItem.refNo = me.setDefaultRefNoHHT();
			detailItem.refYn = 'N';
			detailItem.workingStatus = 'C';
		}else if(mode == me.MODE_UPDATE){
			if(detailItem.confirmStatus == me.ITEM_NOTCONFIRMED && detailItem.refYn == 'Y'){
				detailItem.workingStatus = 'C'; //Create from Mega
			}else{
				detailItem.workingStatus = 'U'; //Update VSR
			}	
		}
		return detailItem;
	},

	onDeleteForkLiftHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refGrdForkLift;
		var selected = grid.getSelection();
		if(!selected){
			MessageUtil.warning("warning_msg", "tbl_vsr_select_delete");
			return;
		}
		var shiftId = refs.refCbxShft.getValue();
		var strWKDate = refs.refWorkingDate.getDate();
		var strStartDt = Ext.Date.parse(refs.refDtStartTimeManPower.getValue(), 'd/m/Y H:i'); 
		var strEndDt = Ext.Date.parse(refs.refDtEndTimeManPower.getValue(), 'd/m/Y H:i'); 
		var detailItem = me.getViewModel().get('theForkLift');
		detailItem.workingStatus = 'D';

		var itemArr = new Array();
		itemArr.push(detailItem);

		var masterItem = Ext.create('MOST.model.operation.VSRCheckList');
		masterItem.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/detail';
		masterItem.phantom = false;
		masterItem.set('newVersion',me.generateUuid());
		masterItem.set('workingStatus',WorkingStatus.DELETE);
		masterItem.set('checkVSRList', itemArr);	
		
		MessageUtil.questionModern('Confirm','tbl_vsr_confirm_delete', null,function(button){
			if(button === 'ok'){
				masterItem.save({
					success: function(){
						MessageUtil.saveSuccess();
						me.resetForkLiftFormHHT();
						me.onSearchHHT();
					}
				});
			}
		});

	},

	onSearchWorkingAreaFLHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var targetCtl = 'refTxtWorkingAreaFL';
		params = {
			title: ViewUtil.getLabel('poup_title_vsrchecklist_workingarea'),
			searchType: 'COMM',
			lcd : 'MT',
			divCd : 'LOCDIV1',
			screenType : 'TYPE_FORKLIFT'
		};		
		ViewUtil.openCodePopup(this, 'app-workingareapopuphht', targetCtl, params);
	},

	onSearchRequesterFLHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var targetCtl = 'refTxtReqFL';
		var params = {
			title: ViewUtil.getLabel('poup_title_vsrchecklist_requester')
		};		
		ViewUtil.openCodePopup(this, 'app-requesterpopuphht', targetCtl, params);
	},

	resetForkLiftFormHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refGrdForkLift;
		var detailForm = refs.refFrmVsrManPowerHHT;
		grid.setSelection(false);
		me.getViewModel().set('theForkLift', null);
	},
	
	onSelectGridForkLiftHHT: function (){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refGrdForkLift;
		var selected = grid.getSelection();
		if(!selected){
			me.getViewModel().set('theForkLift', null);
			return;
		}
		me.getViewModel().set('theForkLift', selected.getData());
		var rowDetail = me.getViewModel().get('theForkLift');
		var mbsCd = rowDetail.mbsCd
		//Make string Working Area display from Grid to Form
		var wkAreaTpNm = me.getWorkingAreaTypeName(rowDetail.workLocTp);
		var wkAreaFLValue = wkAreaTpNm + ': ' + rowDetail.workLoc; //testing
		me.wkAreaFLRes.code = rowDetail.workLoc;
		me.wkAreaFLRes.typeCd = rowDetail.workLocTp;
		me.wkAreaFLRes.typeNm = wkAreaTpNm;//
		
		//Set Value to form
		refs.refTxtWorkingAreaFL.setValue(wkAreaFLValue);
		refs.refDtEQArrvFL.setValue(rowDetail.setupTime);
		refs.refDtStartTimeFL.setValue(rowDetail.workStDt);
		refs.refDtEndTimeFL.setValue(rowDetail.workEndDt);
		if(mbsCd === me.CONST_JPB){
			refs.refCboJPBFL.setValue(rowDetail.operator.trim());
		}else if(mbsCd === me.CONST_CTR){
			refs.refTxtContractorFL.setValue(rowDetail.operator.trim());
		}
		me.setCheckedRadioDriver(rowDetail);

		// Set enable button by mode:
		var mode = me.MODE_ADD;
		if(rowDetail.confirmStatus == me.ITEM_CONFIRMED || 
			(rowDetail.confirmStatus == me.ITEM_NOTCONFIRMED && rowDetail.refYn == 'Y')){
			mode = me.MODE_UPDATE;
		}
		me.setButtonByMode(me.TAB_FORKLIFT, mode, rowDetail.confirmStatus)
	},
	
	getWorkingAreaTypeName: function(workLocTp){ 
		var me = this;
		var workAreaTypeName = "";
		if (workLocTp == null)
			return "";
		switch (workLocTp){
			case "HTC":
				workAreaTypeName = "Hatch";
				break;
			case "WRF":
				workAreaTypeName = "Bulk Wharf";
				break;
			case "WHO":
				workAreaTypeName = "Warehouse";
				break;
			default:
				workAreaTypeName = workLocTp;
				break;
		}
		return workAreaTypeName;
	},
	
	setCheckedRadioDriver: function(rowDetail){
		var me = this;
		var refs = me.getReferences();
		var mbsCd = rowDetail.mbsCd.trim();
		var isJPB = (mbsCd === me.CONST_JPB);
		var isCTR = (mbsCd === me.CONST_CTR);
		var isNonOpe = (mbsCd === '');

		refs.refRadioJPBFL.setChecked(isJPB);
		refs.refRadioContractorFL.setChecked(isCTR);
		refs.refRadioNoDriverFL.setChecked(isNonOpe);

		refs.refCboJPBFL.setRequired(isJPB)
		refs.refCboJPBFL.setReadOnly(!isJPB);
		refs.refCboJPBFL.setDisabled(!isJPB);

		refs.refTxtContractorFL.setRequired(isCTR);
		refs.refTxtContractorFL.setReadOnly(!isCTR);
		refs.refTxtContractorFL.setDisabled(!isCTR);

		// refs.refBtnSearchCntrFL.setDisabled(!isCTR)
	},
	
	onClearTrailerVSRHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refVSRTrailerHHTGrid;
		grid.setSelection(false);
		refs.refAPFPTrailerHHTcbx.setHidden(true);
		refs.refAPFPTrailerHHTcbx.setValue('');
		me.getViewModel().set('theVSRTrailerHHT', null);
		refs.refTRTxtRefNoHHT.setValue(me.setDefaultRefNoHHT());
		refs.refNonTonnageTRHHTField.setDisabled(false);
		refs.refTRCargoTypeHHT.reset();
		refs.refTRCargoTypeHHT.setValue('BBK');
		refs.refBtnTRAddHHT.setDisabled(false);
		refs.refBtnTRDeleteHHT.setDisabled(false);
		me.setTimeWithShiftHHT(me.TAB_TRAILER);
	},
	/**
	 * HHT TABLET FORKLIFT TAB END.
	 */
	
	
	/**
	 * START HHT TABLET Trailer TAB
	 */
	setTrailerHHT:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var trailerList = me.getViewModel().getStore('trailerList');
		var refNo = me.setDefaultRefNoHHT();
		if(refNo != ''){
			refs.refTRTxtRefNo.setValue(refNo);
		}
		trailerList.removeAll();
		refs.refTRCargoTypeHHT.setValue('BBK');
		if(masterItem.checkVSRList[4].length > 0){
			masterItem.checkVSRList[4].forEach(function(item){
				
				item.confirmStatus = me.ITEM_CONFIRMED;
			});
			trailerList.setData(masterItem.checkVSRList[4]);
			trailerList.commitChanges();
		}		
	},
	//cud trailer
	onAddTrailerHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refTrailerGrid');
		var megaGrid = me.lookupReference('refMegaTRGrid');
		var store = me.getStore('trailerList');
		var sendArray = new Array();
				
		var dtForm = refs.refFrmVsrTrailerHHT;
		if(!dtForm.validate()){
			MessageUtil.warning("warning_msg", "tbl_vsr_missing_require");
			return;
		}		
		
		//Validate time with shift
		if(!me.validateTimeShift(refs.refStartTrailerTimefield, refs.refEndTrailerTimefield)){
			return;
		}
		
		var record = Ext.create('MOST.model.operation.VSRCheckList'); 
		
		record.set("rsNm", refs.refTREquipmentDivCdHHT.getValue());
		record.set("hatchDir", refs.refAPFPTrailerHHTcbx.getValue());
		record.set("capaDescr", refs.refEQTyeTrailerHHTField.getValue());
		record.set("capaCd", refs.refCapacdTrailerHHTField.getValue());//?
		record.set("rsQty", refs.refNonTonnageTRHHTField.getValue());//default 1
		record.set("workLocTp", refs.refWAreaTrailerHHTcbx.getValue());
		record.set("workLoc", refs.refTRWorkLocCdHHT.getValue());
		record.set("cnrtCd", refs.refContractorTrHHTField.getValue());		
		record.set("cgTpCd", refs.refTRCargoTypeHHT.getValue());
		record.set("payer", refs.refTRRequestorHHT.getValue());
		record.set("refNo", refs.refTRTxtRefNo.getValue());
		record.set("rmk", refs.refTRRemarksHHT.getValue());
		
		record.set("delvTpCd", refs.refTRDModeHHTcbx.getValue());
		record.set("setupTime", Ext.Date.parse(refs.refTrailerEQArrTimeHHT.getValue(), 'd/m/Y H:i'));
		record.set("workStDt",Ext.Date.parse(refs.refStartTrailerTimefield.getValue(), 'd/m/Y H:i'));
		record.set("workEndDt",Ext.Date.parse(refs.refEndTrailerTimefield.getValue(), 'd/m/Y H:i'));

		
		record.set("vslCallID", me.getViewModel().get('globalVesselCallId').toUpperCase());
		record.set("scn", me.getViewModel().get('theVessel').scn);
		record.set("userId", MOST.config.Token.getUserId());
		record.set("workYmd",refs.refWorkingDate.getDate());
		record.set("shftId",refs.refCbxShft.getValue());
		record.set("refYn",'Y');

	    record.set("purposeNm", refs.refPurposeTRHHTcbx.getInputValue());
		record.set("purpose", refs.refPurposeTRHHTcbx.getValue());
		
		record.set("divCd", 'TR');
		record.set("mbsCd", 'CTR');//Contractor
		record.set("workingStatus", 'C');
		//validate duplicated:
		if(!me.validateIsExisted(me.TAB_TRAILER, me.MODE_ADD,record.data)){
			return;
		}
			
		sendArray.push(record.data);
		var masterItem = Ext.create('MOST.model.operation.VSRCheckList');
		masterItem.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/detail';
		masterItem.phantom = false;
		masterItem.set('newVersion',me.generateUuid());
		masterItem.set('workingStatus',WorkingStatus.INSERT);
		masterItem.set("checkVSRList", sendArray);
		masterItem.save({
			success:function(){
				MessageUtil.saveSuccess();		
				me.onSearchHHT();
				me.onClearTrailerVSRHHT();
			}
		});
	},
	
	onUpdateTrailerHHT:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('trailerList');
		var grid = me.lookupReference('refVSRTrailerHHTGrid');
		var selecedRecord = grid.getSelection();
		var dbStore = me.getStore('vsrCheckListDetail');
		var dtForm = refs.refFrmVsrTrailerHHT;
		var sendArray = new Array();
		if (selecedRecord === null) return
		if(!dtForm.validate()){
			MessageUtil.warning("warning_msg", "tbl_vsr_missing_require");
			return;
		}			
		if(!me.validateTimeShift(refs.refStartTrailerTimefield, refs.refEndTrailerTimefield)){
			return;
		}
		//Validate record updation when verify status
		if(selecedRecord.get('verifyStatus') === 'VERIFIED'){
			MessageUtil.warning("warning_msg", "tbl_verifystatus_block_msg");
			return;
		}
		var sltIndex = grid.store.indexOf(selecedRecord);	
			store.each(function(record, index){
				if(index === sltIndex){					
					record.set("rsNm", refs.refTREquipmentDivCdHHT.getValue());
					record.set("hatchDir", refs.refAPFPTrailerHHTcbx.getValue());
					record.set("capaCd", refs.refCapacdTrailerHHTField.getValue());
					record.set("capaDescr", refs.refEQTyeTrailerHHTField.getValue());
					
					record.set("workLocTp", refs.refWAreaTrailerHHTcbx.getValue());
					record.set("workLoc", refs.refTRWorkLocCdHHT.getValue());
					record.set("cnrtCd", refs.refContractorTrHHTField.getValue());		
					record.set("cgTpCd", refs.refTRCargoTypeHHT.getValue());
					record.set("payer", refs.refTRRequestorHHT.getValue());
					record.set("mbsCd", 'CTR');
					record.set("refNo", refs.refTRCmbRefNo.getValue());

					record.set("delvTpCd", refs.refTRDModeHHTcbx.getValue());
					record.set("setupTime", Ext.Date.parse(refs.refTrailerEQArrTimeHHT.getValue(), 'd/m/Y H:i'));
					record.set("workStDt",Ext.Date.parse(refs.refStartTrailerTimefield.getValue(), 'd/m/Y H:i'));
					record.set("workEndDt",Ext.Date.parse(refs.refEndTrailerTimefield.getValue(), 'd/m/Y H:i'));
					record.set("rmk", refs.refTRRemarksHHT.getValue());
					record.set("purposeNm", refs.refPurposeTRHHTcbx.getInputValue());
					record.set("purpose", refs.refPurposeTRHHTcbx.getValue());
					
					record.set("vslCallID", me.getViewModel().get('globalVesselCallId').toUpperCase());
					record.set("userId", MOST.config.Token.getUserId());
					record.set("workYmd",me.getViewModel().get('globalWorkDate'));
					record.set("shftId", me.getViewModel().get('globalWorkShift'));
					record.set("refYn",'Y');
					if(record.get('confirmStatus') == me.ITEM_NOTCONFIRMED && record.get('refNo').startsWith('MGR'))
					{
						record.set("workingStatus", 'C');
						record.set("rsQty", 1);
					}else{
						record.set("workingStatus", 'U');
						record.set("rsQty", refs.refNonTonnageTRHHTField.getValue());
					}
					record.set("divCd", 'TR');		
					record.dirty = true;
					sendArray.push(record.data);
					}
				});
				
		// validate duplicated:
		if(!me.validateIsExisted(me.TAB_TRAILER, me.MODE_UPDATE,sendArray[0])){
			me.onClearTrailerVSRHHT();
			dbStore.reload();
			return;
		}
		var masterItem = Ext.create('MOST.model.operation.VSRCheckList');	
		masterItem.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/detail';
		masterItem.phantom = false;
		masterItem.set('newVersion',me.generateUuid());
		masterItem.set('workingStatus',WorkingStatus.UPDATE);
		masterItem.set('checkVSRList', sendArray);
		MessageUtil.questionModern('tbl_confrm_update', 'tbl_vsr_confirm_update', null,function(button){
			if(button === 'ok'){
				masterItem.save({
					success: function(){
						MessageUtil.saveSuccess();
						me.onSearchHHT();
						me.onClearTrailerVSRHHT();
					}
				});
			}
		});
	},
	
	onRemoveTrailerHHT: function() {
		var me = this;
		var refs = me.getReferences();
		var dbStore = me.getStore('vsrCheckListDetail');
		var sendArray = new Array();
		var cudData = Ext.create('MOST.model.operation.VSRCheckList');
		var grid = refs.refVSRTrailerHHTGrid;
		var store = me.getStore('trailerList');
		var selecedRecord = grid.getSelection() ;				
		var sltIndex = grid.store.indexOf(selecedRecord); 
		
		store.each(function(record, index){
			if(index === sltIndex){			
				store.remove(record);
				record.set('workingStatus', 'D');
				record.set('userId',MOST.config.Token.getUserId());
				sendArray.push(record.data);
			}
		});
		if(sendArray.length == 0){
			MessageUtil.error('warning_msg','shiftingdoublebanking_delete_empty');
			return;
		}
		
		cudData.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/detail';
		cudData.phantom = false;
		cudData.set('newVersion',me.generateUuid());
		cudData.set('workingStatus',WorkingStatus.INSERT);
		cudData.set('checkVSRList', sendArray);	
		
		
		MessageUtil.questionModern('Confirm', 'tbl_vsr_confirm_delete',null,
				function(button){
					if (button === 'ok') {
						cudData.save({
							success:function(){
								MessageUtil.saveSuccess(); 
								me.onSearchHHT();
								me.onClearTrailerVSRHHT();
							}
						})
			        }else if(button === 'cancel'){
			        	dbStore.reload()
			        	return;
			        };
				}
			);
	},	
	//end cud trailer
	
	onChangeTRWorkAreaHHT: function(field, newValue) {
		var me = this;
		var refs = me.getReferences();
		var workLocStore;
		refs.refTRWorkLocCdHHT.setDisabled(false);
		if (newValue.data.scd == 'HTC'){
			refs.refAPFPTrailerHHTcbx.setHidden(false);
			var hatchCombo = me.getStore('hatchCombo');
			workLocStore = hatchCombo;
		}else if (newValue.data.scd == 'WRF'){
			refs.refAPFPTrailerHHTcbx.setHidden(false);
			var bulkWharfCombo = me.getStore('bulkWharfCombo');
			workLocStore = bulkWharfCombo.load();
		}else if (newValue.data.scd == 'WHO'){
			refs.refAPFPTrailerHHTcbx.setHidden(true);
			refs.refAPFPTrailerHHTcbx.setValue('');
			var warehouseCombo = me.getStore('warehouseCombo');
			workLocStore = warehouseCombo.load();
		}else if (newValue.data.scd == 'OTH'){
			refs.refAPFPTrailerHHTcbx.setHidden(true);
			refs.refAPFPTrailerHHTcbx.setValue('');
			var warehouseCombo = me.getStore('locationCodeListStore');
			workLocStore = warehouseCombo;
		}else{
			refs.refAPFPTrailerHHTcbx.setHidden(false);
		}

		refs.refTRWorkLocCdHHT.setStore(workLocStore);
		refs.refTRWorkLocCdHHT.setDisabled(false);
	},
	
	onTrailerHHTClick:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refVSRTrailerHHTGrid');

		var selection = grid.getSelection();
		if(selection == null) return;
		refs.refAPFPTrailerHHTcbx.setHidden(false);
		
		me.getViewModel().set('theVSRTrailerHHT', selection.getData());
		
		refs.refTRTxtRefNo.setValue(selection.get('refNo'));
		if(selection.get('refNo').indexOf("MGR") == -1){
			refs.refBtnTRAddHHT.setDisabled(false);
			refs.refBtnTRDeleteHHT.setDisabled(false);
			refs.refNonTonnageTRHHTField.setDisabled(false);
		}else{
			refs.refNonTonnageTRHHTField.setDisabled(true);
			refs.refBtnTRAddHHT.setDisabled(true);
			if(selection.get('confirmStatus') == me.ITEM_NOTCONFIRMED){
				refs.refBtnTRDeleteHHT.setDisabled(true);
			}else{
				refs.refBtnTRDeleteHHT.setDisabled(false);
			}
		}
		refs.refTrailerEQArrTimeHHT.setValue(selection.get('setupTime'));
		refs.refStartTrailerTimefield.setValue(selection.get('workStDt'));
		refs.refEndTrailerTimefield.setValue(selection.get('workEndDt'));
		if(!StringUtil.isNullorEmpty(selection.get('workLocTp'))){
			me.onChangeWorkLocHHT('Trailer',selection.get('workLocTp'));
		}
	},
	
	onSearchEQTyeTrailerHHT:function(){
		var me = this;
		var params = {
			title: ViewUtil.getLabel('poup_title_vsrchecklist_mechanicalequipment'),	
			searchType: 'EQNO',
			eqDivCd: 'TR', // GR, TR, SC
			scdLgv: '',
			scdVal: '',
			eqDivCdType: 'TR'
		};		
		ViewUtil.openCodePopup(me, 'app-equipmentCdPopupHHT', 'refBtnEQTyeTrailerHHT', params);
	},
	/**
	 * End HHT TABLET trailer TAB
	 * */
	
	//Mechanical and trailer
	onChangeWorkLocHHT: function(bizName, newValue) {
		var me = this;
		var refs = me.getReferences();
		var workLocStore;
		if(bizName === 'Trailer'){
			var grid = me.lookupReference('refVSRTrailerHHTGrid');
			var selection = grid.getSelection()
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
			}else if (newValue == 'OTH'){
				var warehouseCombo = me.getStore('locationCodeListStore');
				workLocStore = warehouseCombo;
			}
			refs.refTRWorkLocCdHHT.setStore(workLocStore);
			
			if(workLocStore.loadCount <= 0){
				workLocStore.load();
			}
			var workLoc = workLocStore.findRecord('cd', selection.get('workLoc'));
			if(workLoc == null) return;
			refs.refTRWorkLocCdHHT.setValue(workLoc.get('cd'));
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
			refs.refMEWorkLocCd.setValue(workLoc.get('cd'));
		}

	},
	
	
	
	/**
	 * HHT TABLET MEQ TAB START
	 * 
	 */
    setValueWorkDateMEQ: function(item){
		var me = this;
		var refs = me.getReferences();
		var sltedShift = refs.refCbxShft.getSelection();
		var strShftDt = item.workDate;
		var stShftDTime = null;
		var endShftDTime = null;
		
		var strFromDt = strShftDt+' '+sltedShift.get('fmHhMm').substr(0,2)+':'+sltedShift.get('fmHhMm').substr(2,4);
		var strToDt = strShftDt+' '+sltedShift.get('toHhMm').substr(0,2)+':'+sltedShift.get('toHhMm').substr(2,4);
		stShftDTime =  Ext.Date.parse(strFromDt,  'd/m/Y H:i');
		endShftDTime = Ext.Date.parse(strToDt, 'd/m/Y H:i');
		if(sltedShift.get('shftId') === 'SF0013'){
			endShftDTime = new Date(endShftDTime.getTime() + (24 * 60 * 60 * 1000));
		}
		item.workStDt = stShftDTime;
		item.workEndDt = endShftDTime;
		item.setupTime = stShftDTime;
	},
	
	onSearchMechanicalEquipmentHHT:function(){;
		var me = this;
		var params = {
				title: ViewUtil.getLabel('poup_title_vsrchecklist_meqtab_meq'),
				meqTab:true
		};		
		ViewUtil.openCodePopup(me, 'app-mechanicalequipmenthht', 'refMEQTypeCd', params);
	},
	
	onSearchContractorHHT:function(){
		var me = this;
		var params = {
				title: 'Contractor'
		};		
		ViewUtil.openCodePopup(me, 'app-contractpopuphht', 'refMEQContractorCd', params);
	},
	
	onSearchRequesterHHT:function(){
		var me = this;
		var params = {
				title: ViewUtil.getLabel('poup_title_vsrchecklist_requester')
		};		
		ViewUtil.openCodePopup(me, 'app-requesterpopuphht', 'refMEQRequestor', params);
	},
	
	setMEQHHT:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var refNo = me.setDefaultRefNoHHT();
		if(refNo != ''){
			refs.refMETxtRefNo.setValue(refNo);
		}
		var mechanicalEqList = me.getViewModel().getStore('mechanicalEqList');
		mechanicalEqList.removeAll();
		if(masterItem.checkVSRList[2].length > 0){
			masterItem.checkVSRList[2].forEach(function(item){
				
				item.confirmStatus = me.ITEM_CONFIRMED;
			});
			mechanicalEqList.setData(masterItem.checkVSRList[2]);
			mechanicalEqList.commitChanges();
		}
	},
	
	validateMEQ: function(){
		var me=this;
		var refs = me.getReferences();
		if (!me.validateTimeShift(refs.refWorkDateMEQStart,refs.refWorkDateMEQEnd,refs.refWorkDateEQARR))
		{
			return false;
		}

		if (!me.validateContractor())
		{
			return false;
		}
		return true;
	},
	
	validateWorkLocMEQ: function(workLoc){
		var me = this;
		var refs = me.getReferences();
		var workLocStore = refs.refMEWorkLocCd.getStore();
		var exist = workLocStore.getData().items.find(item=>{
			return item.data.cd === workLoc;
		})
		return exist!=undefined;
	},
	
	validateWorkAreaMEQ: function(workLoctp){
		var me = this;
		var refs = me.getReferences();
		var workLocStore = refs.refCboWAreaMEQ.getStore();
		var exist = workLocStore.getData().items.find(item=>{
			return item.data.scd === workLoctp;
		})
		return exist!=undefined;
	},
	
	validateContractor: function(){
		var me = this;
		var refs = me.getReferences();
		if(refs.refRbtnEQCnrt.isChecked()&& !refs.refMEQContractorCd.getValue())
		{
			MessageUtil.alert('Warning', 'vsrchecklist_contractor_mechanicalEq_msg');
			return false;
		}
		return true;
	},
	
	onClearMEQHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refMechanicalMEQGrid;
		grid.setSelection(false);
		me.getViewModel().set('theMEQ', null);
		me.setTimeWithShiftHHT(me.TAB_EQU);
		refs.refCboWAreaMEQ.setValue('');
		refs.refBtnAddMEQ.setDisabled(false);
		refs.refCboEQCargoType.setValue('BBK');
	},
	
	onAddMEQHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var dtForm = refs.refFrmVsrMEquipmentHHT;
		if(!dtForm.validate()){
			MessageUtil.warning("warning_msg", "tbl_vsr_missing_require");
			return;
		}
		var shiftId = me.getViewModel().get('globalWorkShift');
		var strWKDate = me.getViewModel().get('globalWorkDate');
		var strStartDt = Ext.Date.parse(refs.refWorkDateMEQStart.getValue(), 'd/m/Y H:i'); 
		var strEndDt = Ext.Date.parse(refs.refWorkDateMEQEnd.getValue(), 'd/m/Y H:i'); 
		var eqArrDt = Ext.Date.parse(refs.refWorkDateEQARR.getValue(), 'd/m/Y H:i'); 
		var detailItem = me.getViewModel().get('theMEQ');
		detailItem.vslCallID = me.glbJPVC;
		detailItem.scn = me.getViewModel().get('theVessel').scn
		detailItem.workYmd = strWKDate;
		detailItem.shftId = shiftId;
		detailItem.divCd = 'ME';
		detailItem.mbsCd = 'CTR';
		detailItem.purpose = refs.ctlMEPurpose.getValue();
		detailItem.purposeNm =refs.ctlMEPurpose.getInputValue();
		detailItem.workOdrNo = refs.refMEWorkOdrNo.getValue();
		detailItem.workLocTp = refs.refCboWAreaMEQ.getValue();
		detailItem.workLoc = refs.refMEWorkLocCd.getValue();
		detailItem.shpCrew = refs.refRbtnEQCnrt.isChecked() ? "N" : "Y";
		detailItem.workStDt = strStartDt;
		detailItem.workEndDt = strEndDt;
		detailItem.workingStatus = 'C';
		detailItem.setupTime = eqArrDt;
		detailItem.refYn = 'N';
		var theMEQType = me.getViewModel().get('theMEQType');
		
		if(theMEQType)
		{
			detailItem.rsNm = theMEQType.eqDivCd;
			detailItem.capaDescr = theMEQType.capaDescr;
			detailItem.capaCd = theMEQType.capaCd;
		}
		detailItem.refNo = me.setDefaultRefNoHHT();
		//Validate time with shift
		if(!me.validateMEQ()){
			return;
		}
		//validate duplicated:
		if(!me.validateIsExisted(me.TAB_EQU, me.MODE_ADD,detailItem)){
			return;
		}

		var itemArr = new Array();
		itemArr.push(detailItem);

		var masterItem = Ext.create('MOST.model.operation.VSRCheckList');
		masterItem.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/detail';
		masterItem.phantom = false;
		masterItem.set('newVersion',me.generateUuid());
		masterItem.set('workingStatus',WorkingStatus.INSERT);
		masterItem.set('checkVSRList',itemArr);
		masterItem.save({
			success: function(){
				MessageUtil.saveSuccess();
				me.resetMEQForm();
				me.onSearchHHT();
			}
		});
		
	},
	
	onUpdateMEQHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refMechanicalMEQGrid;
		var store = me.getStore('vsrCheckListDetail');
		var selected = grid.getSelection();
		if(!selected){
			MessageUtil.warning("warning_msg", "tbl_vsr_select_update");
			return;
		}

		//Validate mandatory
		var dtForm = refs.refFrmVsrMEquipmentHHT;
		if(!dtForm.validate()){
			MessageUtil.warning("warning_msg", "tbl_vsr_missing_require");
			return;
		}
		//Validate time with shift
		if(!me.validateMEQ()){
			return;
		}
		//Validate record updation when verify status
		if(selected.get('verifyStatus') === 'VERIFIED'){
			MessageUtil.warning("warning_msg", "tbl_verifystatus_block_msg");
			return;
		}
		var shiftId = refs.refCbxShft.getValue();
		var strWKDate = refs.refWorkingDate.getDate();
		var strStartDt = Ext.Date.parse(refs.refWorkDateMEQStart.getValue(), 'd/m/Y H:i'); 
		var strEndDt = Ext.Date.parse(refs.refWorkDateMEQEnd.getValue(), 'd/m/Y H:i'); 
		var eqArrDt = Ext.Date.parse(refs.refWorkDateEQARR.getValue(), 'd/m/Y H:i'); 
		
		var detailItem = me.getViewModel().get('theMEQ');
		if(detailItem.confirmStatus == me.ITEM_NOTCONFIRMED && detailItem.refNo.startsWith('MGR'))
		{
			detailItem.workingStatus = 'C';
			detailItem.refYn == 'Y';
			detailItem.cnrtcd_temp = detailItem.operator;
			detailItem.mbscd_temp = detailItem.mbsCd;
		}
		else 
		{
			detailItem.workingStatus = 'U';
			detailItem.refYn = detailItem.refNo.startsWith('MGR') ? 'Y': 'N';
		}
		
		detailItem.vslCallId = me.glbJPVC;
		detailItem.workYmd = strWKDate;
		detailItem.shftId = shiftId;
		detailItem.divCd = 'ME';
		detailItem.mbsCd = 'CTR';
		detailItem.purpose = refs.ctlMEPurpose.getValue();
		detailItem.purposeNm =refs.ctlMEPurpose.getInputValue();
		detailItem.workLoc = refs.refMEWorkLocCd.getValue();
		detailItem.shpCrew = refs.refRbtnEQCnrt.isChecked() ? "N" : "Y";
		detailItem.workStDt = strStartDt;
		detailItem.workEndDt = strEndDt;
		detailItem.setupTime = eqArrDt;
	
		var theMEQType = me.getViewModel().get('theMEQType');
		if(theMEQType)
		{
			detailItem.rsNm = theMEQType.eqDivCd;
			detailItem.capaDescr = theMEQType.capaDescr;
			detailItem.capaCd = theMEQType.capaCd;
		}
		else
		{
			detailItem.rsNm = detailItem.eqNo;
		}
		//Validate time with shift
		if(!me.validateIsExisted(me.TAB_EQU, me.MODE_UPDATE,detailItem)){
			return;
		}

		var sendArray = new Array();
		sendArray.push(detailItem);
		
		var masterItem = Ext.create('MOST.model.operation.VSRCheckList');
		masterItem.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/detail'
		masterItem.phantom = false;
		masterItem.set('workingStatus', WorkingStatus.UPDATE);
		masterItem.set('newVersion',me.generateUuid());		
		masterItem.set("checkVSRList", sendArray);
		
		MessageUtil.questionModern('tbl_confrm_add','tbl_vsr_confirm_update', null,function(button){
			if(button === 'ok'){
				masterItem.save({
					success: function () {
						MessageUtil.saveSuccess();
						me.resetMEQForm();
						me.onSearchHHT();
					}
				});	
			}
		});
		
	},
	
	onDeleteMEQHHT: function(){
		var me = this;
		var refs = me.getReferences();
	
		var grid = refs.refMechanicalMEQGrid;
		var selectedRecord = grid.getSelection();
		var sltIndex = grid.store.indexOf(selectedRecord);
		if (sltIndex === -1) {
			MessageUtil.warning('warning_msg', 'tbl_vsr_select_delete');
			return false;
		}
		var shiftId = refs.refCbxShft.getValue();
		var detailItem = me.getViewModel().get('theMEQ');
		detailItem.workingStatus = 'D';

		var itemArr = new Array();
		itemArr.push(detailItem);

		var masterItem = Ext.create('MOST.model.operation.VSRCheckList');
		masterItem.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/detail';
		masterItem.phantom = false;
		masterItem.set('newVersion',me.generateUuid());
		masterItem.set('workingStatus',WorkingStatus.DELETE);
		masterItem.set('checkVSRList', itemArr);	
		
		MessageUtil.questionModern('Confirm','tbl_vsr_confirm_delete', null,function(button){
			if(button === 'ok'){
				masterItem.save({
					success: function(){
						MessageUtil.saveSuccess();
						me.resetMEQForm();
						me.onSearchHHT();
					}
				});
			}
		});
	},
	
	onSelectGridMEQHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refMechanicalMEQGrid;
		var selected = grid.getSelection();
		
		if(!selected){
			me.getViewModel().set('theMEQ', null);
			//reset form: ...
			return;
		}
		
		refs.refMETxtRefNo.setValue(selected.get('refNo'));
		me.getViewModel().set('theMEQ', selected.getData());
		var rowDetail = me.getViewModel().get('theMEQ');
		
		refs.refWorkDateMEQStart.setValue(rowDetail.workStDt);
		refs.refWorkDateMEQEnd.setValue(rowDetail.workEndDt);
		if(rowDetail.shpCrew === 'Y')
		{
			refs.refRbtnEQShipCrew.setChecked(true);
		}
		else{
			refs.refRbtnEQCnrt.setChecked(true);
		}
		if(rowDetail.setupTime)
		{
			refs.refWorkDateEQARR.setValue(rowDetail.setupTime);
		}
		else
		{
			refs.refWorkDateEQARR.setValue(rowDetail.setupTime);
		}

		var mode = me.MODE_ADD;
		if(rowDetail.confirmStatus == me.ITEM_CONFIRMED || 
			(rowDetail.confirmStatus == me.ITEM_NOTCONFIRMED && rowDetail.refYn == 'Y')){
			mode = me.MODE_UPDATE;
		}
		refs.refCboWAreaMEQ.setValue(rowDetail.workLocTp);
		refs.refCboWAreaMEQ.fireEvent('select', refs.refCboWAreaMEQ, [rowDetail]);
		me.setButtonByMode(me.TAB_EQU, mode, rowDetail.confirmStatus)
	},
	
	resetMEQForm: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refMechanicalMEQGrid;
		grid.setSelection(false);
		me.getViewModel().set('theMEQ', null);
	},
	
	onChangeMEQWorkAreaHHT: function() {
		var me = this;
		var refs = me.getReferences();
		if(refs.refMEWorkLocCd.getStore())
		{
			refs.refMEWorkLocCd.getStore().removeAll();
		}
		refs.refMEWorkLocCd.setDisabled(false);
		var newValue = refs.refCboWAreaMEQ.getValue();
		var workLocStore;
		if (newValue == 'HTC'){
			var hatchCombo = me.getStore('hatchCombo');
			workLocStore = hatchCombo;
		}else if (newValue == 'WRF'){
			var bulkWharfCombo = me.getStore('bulkWharfCombo');
			workLocStore = bulkWharfCombo;
		}else if (newValue == 'EDJ'){
			var edjCombo = me.getStore('edjCombo');
			workLocStore = edjCombo;
		}else if (newValue == 'NDJ'){
			var ndjCombo = me.getStore('ndjCombo');
			workLocStore = ndjCombo;
		}else if (newValue === ''){
			
		}
		else if (newValue == 'WHO')
		{
			var warehouseCombo = me.getStore('warehouseCombo');
			workLocStore = warehouseCombo;
		}
		if (workLocStore && workLocStore.data.length === 0) {
			workLocStore.load({
				callback: function (records, operation, success) {
					if (success) {
						refs.refMEWorkLocCd.setStore(workLocStore);
						var grid = refs.refMechanicalMEQGrid;
						var selected = grid.getSelection();
						
						if (selected) {
							var item = me.getViewModel().get('theMEQ');
							if (!item.workLoc.includes(',')) {
								refs.refMEWorkLocCd.setValue(item.workLoc);
							}
							else {
								refs.refMEWorkLocCd.setValue('');
							}
						}
					}
				}
			})
		}
		else
		{
			refs.refMEWorkLocCd.setStore(workLocStore);
			var grid = refs.refMechanicalMEQGrid;
			var selected = grid.getSelection();
			if (selected) {
				var item = me.getViewModel().get('theMEQ');
				if (!item.workLoc.includes(',')) {
					refs.refMEWorkLocCd.setValue(item.workLoc);
				}
				else {
					refs.refMEWorkLocCd.setValue('');
				}
			}
		}
		
	},
	
	setMegaMEHHT: function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var megaMEList = me.getViewModel().getStore('megaMEList');
		refs.refCboEQCargoType.setValue('BBK');
		if(masterItem.megaMEListHHT.length > 0){
			masterItem.megaMEListHHT.forEach(function(item){
				item.confirmStatus = me.ITEM_NOTCONFIRMED;
				item.refYn = 'Y';
				var strWkLocMega = item.workLoc;
				var locIdStr = me.getWorkingLocString(strWkLocMega);
				var locDivCd = me.getWorkingAreaTypeCode(strWkLocMega);
				item.workLocTp = locDivCd;
				item.workLoc = locIdStr;
				me.setValueWorkDateMEQ(item);
			});
			megaMEList.setData(masterItem.megaMEListHHT);
			megaMEList.commitChanges();
		}
		var mechanicalEqList= me.getViewModel().getStore('mechanicalEqList');
		megaMEList.each(function(record,idx){
			if(!me.isMegaExistInVSR(record,mechanicalEqList)){
				mechanicalEqList.add(record);
			}
		})
	},
	
	isMegaExistInVSR: function(mega,vsrStore){
		var isExist = false;
		vsrStore.each(function(record,idx){
			if(record.data.megaSeq == mega.data.seq && record.data.refNo == mega.data.refNo){
				isExist = true;
				return;
			}
		})
		return isExist;
	},
	
	setMegaTRHHT:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var megaTRList = me.getViewModel().getStore('megaTRList');
		var trailerList= me.getViewModel().getStore('trailerList');	
		if(masterItem.megaTRListHHT.length > 0){
			masterItem.megaTRListHHT.forEach(function(item){
				item.confirmStatus = me.ITEM_NOTCONFIRMED;
				me.setValueWorkDateEQ(item);
				me.displayMegaForVSR(item, trailerList);
			});
		}
	},
	
	onTblContractorMEQChange:function(raidoField, eOpts){
		var me = this;
		var refs = me.getReferences();
		var theMEQ = me.getViewModel().get('theMEQ');
		//var rdoValue = me.getShipCrewRadioFLValueHHT();
		
		if(!refs.refRbtnEQCnrt.isChecked()){
			refs.refMEQContractorCd.setValue('');
			refs.refMEQContractorCd.setDisabled(true);
			refs.refMEQF2.setDisabled(true);
		}else{
			refs.refMEQContractorCd.setDisabled(false);
			refs.refMEQF2.setDisabled(false);
		}
	},
	
//	getShipCrewRadioFLValueHHT: function(){
//		var me = this;
//		var refs = me.getReferences();
//		if(refs.refRadioNoDriverFL.getChecked()){
//			return refs.refRadioNoDriverFL.getValue();
//		}else if(refs.refRadioJPBFL.getChecked()){
//			return refs.refRadioJPBFL.getValue();
//		}else if(refs.refRadioContractorFL.getChecked()){
//			return refs.refRadioContractorFL.getValue();
//		}
//		return null;
//	},
	
	 /**
	 * HHT TABLET MEQ TAB END
	 */
	
	displayMegaForVSR: function(mega, store){
		var me = this;
		var numOfRemain = parseInt(mega.rsQty);
		for(var i = 0; i < numOfRemain; i++){
			var temp = Ext.create('MOST.model.operation.VSRCheckList');
			temp.data = Object.assign({}, mega);
			//rest Data for Loc and Loc Area
			var strWkLocMega = temp.data.workLoc;
			var locIdStr = me.getWorkingLocString(strWkLocMega);
			var locDivCd = me.getWorkingAreaTypeCode(strWkLocMega);
			var locDivNm = me.getWorkingAreaTypeName(locDivCd);
			
			temp.set('rsQty', 1);
			temp.set('megaSeq', mega.seq);
			temp.set('refYn', 'Y');
			temp.set('cnrtcd_temp', mega.cnrtCd);
			temp.set('mbscd_temp', mega.mbsCd);
			temp.set('cgTpCd', mega.cgTpCd ? mega.cgTpCd : 'BBK');
			temp.set('workLocTp', locDivCd);
			temp.set('workLoc', locIdStr);
			if(mega.divCd == 'FL'){
				temp.set('rsNm', mega.rsNm);
			}else if (mega.divCd == 'TR'){
				temp.set('rsNm', mega.eqNo);
			}
			store.insert(0, temp);
		}
		store.commitChanges();
	},
	
	setButtonByMode: function(tab, mode, confirmStatus){ 
		var me = this;
		var refs = me.getReferences();
		var disableAdd = (mode == me.MODE_UPDATE && confirmStatus == me.ITEM_NOTCONFIRMED);
		var disableUpdate = (mode == me.MODE_ADD);
		var disableDelete = ((mode == me.MODE_UPDATE && confirmStatus == me.ITEM_NOTCONFIRMED) || mode == me.MODE_ADD);
		switch (tab) {
			case me.TAB_MANPOWER:
				break;
			case me.TAB_PORTCRANE:
				break;
			case me.TAB_STEVEDORE:
				break;
			case me.TAB_FORKLIFT:
				refs.refBtnAddFl.setDisabled(disableAdd);
				refs.refBtnUpdateFl.setDisabled(disableUpdate);
				refs.refBtnDeleteFl.setDisabled(disableDelete);
				break;
			case me.TAB_TRAILER:
				break;
			case me.TAB_EQU:
				refs.refBtnAddMEQ.setDisabled(disableAdd);
				refs.refBtnUpdateMEQ.setDisabled(disableUpdate);
				refs.refBtnDeleteMEQ.setDisabled(disableDelete);
			default:
				break;
		}
	},
	
	getWorkingAreaTypeCode: function(strignLocId){ //Check WorkingAreaType from Mega string LOC_ID - Mega did not save the LocType
		if(strignLocId == null) 
			return "";
		var me = this;
		var locType = "";
		if(strignLocId.toUpperCase().startsWith("WHARF")){ //ex: Wharf(H1,H2)
			return me.AREA_LOCCD_WHARF;
		}
		var firstChar = strignLocId.substr(0,1);
		switch (firstChar) {
			case "H":
				locType = me.AREA_LOCCD_HATCH;
				break;
			case "W":
			case "B":
				locType = me.AREA_LOCCD_WHARF;
				break;
			default:
				locType = me.AREA_LOCCD_OTHERS;
				break;
		}
		return locType;
	},
	
	getWorkingLocString: function (stringLocId){
		if(stringLocId == null) 
			return "";
		var strLocId = "";
		if(stringLocId.toUpperCase().startsWith("WHARF")){ //ex: Wharf(H1,H2,H3,H4,H5) -> return: H1,H2,H3,H4,H5 
			var myArray = stringLocId.split(/[()]+/).filter(function(e) { 
				return e; 
			});
			return myArray[1];
		}else
			return stringLocId;
	},
	
	/**
    ****************** Common Function HHT TABLET
    */
	onSearchPartnerHHT: function(ref){
		var me = this;
		var refs = me.getReferences();
		var searchType = 'CTT';
		var title = 'Common Code';
		var contractorTitle = ViewUtil.getLabel('poup_title_vsrchecklist_contractor')
		var targetCtl = '';
		if(ref.reference == 'refTxtContractorFL'){//Contrartor Forlift Tab
			if(refs.refRadioContractorFL._checked === false) return
			title = contractorTitle;
			searchType = 'CTT';
			targetCtl = 'refTxtContractorFL';
		} else if(ref.reference == 'refContractorTrHHTField'){//Contrartor trailer Tab
			title = contractorTitle;
			searchType = 'CTT';
			targetCtl = 'refContractorTrHHTField';
		}
		else if(ref.reference == 'refMEQContractorCd'){//Contrartor MEQ Tab
			title = contractorTitle;
			searchType = 'CTT';
			targetCtl = 'refMEQContractorCd';
		}else if(ref.reference == 'refPCContractorHHTField'){//Contrartor PC Tab
			if(refs.refPortCraneContractorRdo._checked === false) return
			title = contractorTitle;
			searchType = 'CTT';
			targetCtl = 'refPCContractorHHTField';
		}
		var params = {
			title: title,
			searchType: searchType,
		};		
		ViewUtil.openCodePopup(this, 'app-commoncodepopuphht', targetCtl, params);	
	},
	
	validateTimeShift: function(refStartTime, refEndTime, refSetUpTime){//'d/m/Y H:i'
		var me = this;
		var refs = me.getReferences();
		var shiftListStore = me.getStore('shiftList');
		if(shiftListStore.loadCount <= 0){
			shiftListStore.load();
		}
		var shiftId = me.getViewModel().get('globalWorkShift');
		var shftModel = shiftListStore.findRecord('shftId', shiftId);
		var strShftDt = me.getViewModel().get('globalWorkDate');
		var stShftDTime = null;
		var endShftDTime = null;
		
		var strFromDt = strShftDt + ' ' + shftModel.data.fmHhMm.substr(0, 2) + ':' + shftModel.data.fmHhMm.substr(2, 4);
		var strToDt = strShftDt + ' ' + shftModel.data.toHhMm.substr(0, 2) + ':' + shftModel.data.toHhMm.substr(2, 4);
		stShftDTime =  Ext.Date.parse(strFromDt,  'd/m/Y H:i');
		endShftDTime = Ext.Date.parse(strToDt, 'd/m/Y H:i');
		
		if(shftModel.get('shftIdx') === '3'){
			endShftDTime = new Date(endShftDTime.getTime() + (24 * 60 * 60 * 1000));
		}
		
		var inputStDTime = Ext.Date.parse(refStartTime.getValue(),  'd/m/Y H:i');
		var inputEndDTime = Ext.Date.parse(refEndTime.getValue(),  'd/m/Y H:i');

		if(inputStDTime < stShftDTime || inputEndDTime > endShftDTime){
			MessageUtil.warning('warning_msg', 'tbl_vsr_datetime_withshift');
			return false;
		}

		// if(refSetUpTime){
		// 	var inputSetUpDtime = Ext.Date.parse(refSetUpTime.getValue(),  'd/m/Y H:i');
		// 	if(inputSetUpDtime < stShftDTime || inputSetUpDtime > endShftDTime){
		// 		MessageUtil.warning('warning_msg', 'tbl_vsr_eqarrtime_withshift');
		// 		return false;
		// 	}
		// }
		if(refStartTime.getValue() >= refEndTime.getValue()){
			MessageUtil.warning('warning_msg', 'tbl_start_end_time');
			return false;
		}
		return true;
	},
	
	validateIsExisted: function (tab, mode, item) {// True: valid; False: invalid
		var me = this;
		var refs = me.getReferences();
		var uniquie = true;
		switch (tab) {
			case me.TAB_MANPOWER:
				if(mode === me.MODE_ADD){
					var staffId = refs.refTxtStaffId.getValue();
					var manPowerStore = me.getStore('manPowerList');
					if(manPowerStore.findExact('empId', staffId) != -1){
						MessageUtil.warning('warning_msg', 'vsrchecklist_exist_staffid_msg');
						uniquie = false;
					}
				}if(mode === me.MODE_UPDATE){
					var staffId = refs.refTxtStaffId.getValue();
					var grid = refs.refGrdManPower;
					var selection = grid.getSelection();
					var index = grid.store.indexOf(selection);
					var manPowerStore = me.getStore('manPowerList');
					var indexFound = manPowerStore.findExact('empId', staffId);
					if(indexFound != -1 &&  indexFound != index){
						MessageUtil.warning('warning_msg', 'vsrchecklist_exist_staffid_msg');
						uniquie = false;
					}
				}
				break;
			case me.TAB_PORTCRANE:
				var unique = true;
				var store = me.getViewModel().get('portCraneList');
				var StaffId ="";
				var oldStaffId ="empId";

				if(refs.refPortCraneJPBRdo.isChecked()){
					StaffId = item.empId;
					oldStaffId = "empId";
				}else{
					StaffId = item.cnrtCd;
					oldStaffId = "cnrtCd";
				}				
				store.queryBy(function(rec, id){
					if (mode == me.MODE_UPDATE && item.seq === rec.get('seq')) {
					}
					else if(rec.get(oldStaffId) == StaffId
							&&
    						(rec.get('rsNm') == item.rsNm && (rec.get('workStDt').getTime() == item.workStDt.getTime() 
    										&& rec.get('workEndDt').getTime() == item.workEndDt.getTime())
    						)){
						MessageUtil.alert('Warning', "vslchecklist_mechanicaleq_duplicate");
						unique = false;
					}
				})
				return unique;
			case me.TAB_STEVEDORE:
				var unique = true;
				var store = me.getViewModel().get('stevedoreList');
				store.queryBy(function(rec, id){
					if (mode == me.MODE_UPDATE && item.seq === rec.get('seq')) {
					}
					else if(rec.get('stvdComp') == item.stvdComp){
						unique = false;
						MessageUtil.alert('Warning', "vslchecklist_mechanicaleq_duplicate");
						return;
					}
				})
				return unique;
			case me.TAB_FORKLIFT:
				var flStore = me.getStore('forkliftList');
				flStore.each(function(record, index, array){
					if (mode == me.MODE_UPDATE && item.seq === record.get('seq')) {
						
					}
					else if(
							record.get('confirmStatus') == me.ITEM_CONFIRMED
    						&& (record.get('rsNm') == null ? "" : record.get('rsNm')) 						== (item.rsNm == null ? "" : item.rsNm)
    						&& (record.get('capaDescr') == null ? "" : record.get('capaDescr')) 			== (item.capaDescr == null ? "" : item.capaDescr)
    						&& (record.get('capaCd') == null ? "" : record.get('capaCd')) 					== (item.capaCd == null ? "" : item.capaCd)
    						&& (record.get('mbsCd') == null ? "" : record.get('mbsCd').trim())				== (item.mbsCd == null ? "" : item.mbsCd.trim())
    						&& (record.get('empId') == null ? "" : record.get('empId').trim()) 				== (item.empId == null ? "" : item.empId.trim())
    						&& (record.get('operator') == null ? "" : record.get('operator').trim()) 		== (item.operator == null ? "" : item.operator.trim())
    						&& (record.get('workLocTp') == null ? "" : record.get('workLocTp')) 			== (item.workLocTp== null ? "" : item.workLocTp)
    						&& (record.get('workLoc') == null ? "" : record.get('workLoc')) 				== (item.workLoc == null ? "" : item.workLoc)
    						&& (record.get('hatchDir') == null ? "" : record.get('hatchDir')) 				== (item.hatchDir == null ? "" : item.hatchDir)
    						&& (record.get('cgTpCd') == null ? "" : record.get('cgTpCd')) 					== (item.cgTpCd == null ? "" : item.cgTpCd)
    						&& (record.get('payer') == null ? "" : record.get('payer')) 					== (item.payer== null ? "" : item.payer)
							&& (record.get('delvTpCd') == null ? "" : record.get('delvTpCd')) 				== (item.delvTpCd == null ? "" : item.delvTpCd)
							&& record.get('workStDt').getTime() == item.workStDt.getTime() && record.get('workEndDt').getTime() == item.workEndDt.getTime()
							&& record.get('setupTime').getTime() == item.setupTime.getTime()
						){
							uniquie = false;
					}
				});
				break;
			case me.TAB_TRAILER:
				var unique = true;
				return true;
			case me.TAB_EQU:
				// Make sure Trailer No & Capacity & StartTime to be unique.
				var unique = true;
				var store = me.getViewModel().get('mechanicalEqList');
				
				store.queryBy(function(rec, id){
					if (mode == me.MODE_UPDATE && item.seq === rec.get('seq')) {
					}
					else if(rec.get('rsNm') == item.rsNm && rec.get('capaDescr') == item.capaDescr
						&& rec.get('rsQty') == item.rsQty && rec.get('workOdrNo') == item.workOdrNo
						&& rec.get('workLocTp') == item.workLocTp && rec.get('workLoc') == item.workLoc
						&& rec.get('cnrtCd') == item.cnrtCd && rec.get('cgTpCd').trim() == item.cgTpCd.trim()
						&& rec.get('payer') == item.payer && rec.get('purpose') == item.purpose && rec.get('workStDt').getTime() == item.workStDt.getTime()
						&& rec.get('workEndDt').getTime() == item.workEndDt.getTime() && rec.get('shpCrew') == item.shpCrew ){
						unique = false;
						MessageUtil.alert('Warning', "vslchecklist_mechanicaleq_duplicate");
						return;
					}
				})
				return unique;
			default:
				break;
		}
		return uniquie;
	},
	
	onClearSorters: function(btn) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('vsrCheckList');
		
		//Clear Sorters
		store.sorters.clear();
		refs.refVSRCheckListGrid.getView().refresh(); 
	},

	onClearSorters: function(btn) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('vsrCheckList');
		
		//Clear Sorters
		store.sorters.clear();
		refs.refVSRCheckListGrid.getView().refresh(); 
	},

	checkOverlapTime: function (vsr1, vsr2){//false: not overlap
		var st1 = vsr1.workStDt;
		var end1 = vsr1.workEndDt;
		var st2 = vsr2.workStDt;
		var end2 = vsr2.workEndDt;
		if((st1 >= st2 && st1 <= end2)
			|| (end1 >= st2 && end1 <= end2)){
			MessageUtil.warning("warning_msg", "Overlap time with same device");
			return true; //is overlap
		}
		return flase;
	},
	
	onVSRInfoByShift: function(){
		var me = this;
		var refs = me.getReferences();

		var shftId = refs.refCbxShft.getValue();
		//var shftIdx = refs.refCbxShft.getSelection().get('shftIdx');
		var workYmd = refs.refWorkingDate.getValue();

		var fmShiftTime = '';
		var toShiftTime = '';
		var refNo = '';

		if((shftId != null && shftId != '') && (workYmd != null && workYmd != '')){
			fmShiftTime = me.setFmTimeByShiftHHT();
			toShiftTime = me.setToTimeByShiftHHT();
			refNo = me.setDefaultRefNo();
		}
		if(fmShiftTime != '' && toShiftTime != ''){
			//ManPower
			refs.refDtStartTimeManPower.setValue(fmShiftTime);
			refs.refDtEndTimeManPower.setValue(toShiftTime);
			
			//Stevedore
			refs.refStartTimeYDStvTimefield.setValue(fmShiftTime);
			refs.refEndTimeYDStvTimefield.setValue(toShiftTime);

			//PortCrane
			refs.refStartTimePortCranefield.setValue(fmShiftTime);
			refs.refEndTimePortCranefield.setValue(toShiftTime);

			//Forklift
			refs.refDtEQArrvFL.setValue(fmShiftTime);
			refs.refDtStartTimeFL.setValue(fmShiftTime);
			refs.refDtEndTimeFL.setValue(toShiftTime);
			refs.refCboCargoTpFL.setValue('BBK');
			if(refNo != ''){
				refs.refFLTxtRefNo.setValue(refNo);
				refs.ctlFLCmbRef.setDisabled(true);
				refs.refFLCmbRefNo.setDisabled(true);
				refs.ctlFLTxtRef.setValue(true);
				refs.ctlFLTxtRef.setDisabled(true);
				refs.refFLTxtRefNo.setDisabled(true);
			}

			//Trailer
			refs.refTrailerEQArrTimeHHT.setValue(fmShiftTime);
			refs.refStartTrailerTimefield.setValue(fmShiftTime);
			refs.refEndTrailerTimefield.setValue(toShiftTime);
			refs.refTRCargoTypeHHT.setValue('BBK');
			if(refNo != ''){
				refs.refTRTxtRefNo.setValue(refNo);
				refs.ctlTRCmbRef.setDisabled(true);
				refs.refTRCmbRefNo.setDisabled(true);
				refs.ctlTRTxtRef.setValue(true);
				refs.ctlTRTxtRef.setDisabled(true);
				refs.refTRTxtRefNo.setDisabled(true);
			}

			//MechanicalEq
			refs.refWorkDateEQARR.setValue(fmShiftTime);
			refs.refWorkDateMEQStart.setValue(fmShiftTime);
			refs.refWorkDateMEQEnd.setValue(toShiftTime);
			refs.refCboEQCargoType.setValue('BBK');
			if(refNo != ''){
				refs.refMETxtRefNo.setValue(refNo);
				refs.ctlMECmbRef.setDisabled(true);
				refs.refMECmbRefNo.setDisabled(true);
				refs.ctlMETxtRef.setValue(true);
				refs.ctlMETxtRef.setDisabled(true);
				refs.refMETxtRefNo.setDisabled(true);
			}
		}
//		var view = me.getView();
//		var recvData = view.items.get(0).recvData;
//		
//		if(recvData){
//			recvData.set('vslCallID', refs.refVslCallId.getValue());
//			recvData.set('workYmd', Ext.Date.format(refs.refWorkYmd.getValue(), MOST.config.Locale.getShortDate()));
//			recvData.set('shftId', refs.refShift.getValue());
//		}else{
//			var theModel = Ext.create('MOST.model.operation.VSRCheckList');
//			theModel.set('vslCallID', refs.refVslCallId.getValue());
//			theModel.set('workYmd', Ext.Date.format(refs.refWorkYmd.getValue(), MOST.config.Locale.getShortDate()));
//			theModel.set('shftId', refs.refShift.getValue());
//			
//			detailView.items.get(0).recvData = theModel;
//		}
//		
//		if(detailView.items.get(0).recvData.data.vslCallID && detailView.items.get(0).recvData.data.workYmd && detailView.items.get(0).recvData.data.shftId){
//			me.onDetailLoad();
//		}
	},
	
	setDefaultRefNo: function(){
    	var me = this;
		var refs = me.getReferences();
		var date = refs.refWorkingDate.getValue().substr(0,2) + refs.refWorkingDate.getValue().substr(3,2) + refs.refWorkingDate.getValue().substr(6,4); 
		var shft = refs.refCbxShft.getValue();
    	refNo = date + "@" + shft;
    	return refNo;
    },
});