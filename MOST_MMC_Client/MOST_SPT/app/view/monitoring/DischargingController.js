Ext.define('MOST.view.monitoring.DischargingController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.discharging',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_DATE_PERIOD : 91,	// MAX PERIOD DATE
	MAIN_GRID_REF_NAME: 'refDischargingGrid',
	MAIN_STORE_NAME: 'discharging',
	PARAMETTER_DISCHARGING_COMPARE_COMBO_STORE: 'dischargingCompareCombo',
	
	REPORT_PDF_FILE: 'VesselDischargeReport.jrxml',
	REPORT_PDF_FUNCTION: 'MOST.monitoringReport.selectVesselDischargeListReport',
	
	VSL_TP: '',
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
		var comboStore = me.getStore('dischargingCombo');
		var oprStore = me.getStore('dischargingOprCombo');
		var hatchNoStore = me.getStore('dischargingHatchNoCombo');
		var shiftStore = me.getStore('dischargingShiftCombo');
		me.setComboBoxWithLocalCache(CacheServiceConstants.COMPARE_COMBO, me.PARAMETTER_DISCHARGING_COMPARE_COMBO_STORE); 
		var searchParm = Ext.create('MOST.model.monitoring.SearchDischargingParm');
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		var cargoTpCombo = me.getStore('cargoTpCombo');
		cargoTpCombo.load();
		
		comboStore.load({
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						oprStore.setData(records[0].get('oprList'));
						oprStore.insert(0, [{tsptTpCdNm: 'All',tsptTpCd: ''}]);
						
						shiftStore.setData(records[0].get('shiftList'));
						shiftStore.insert(0, [{shftNm: 'All',shftId: ''}]);
						
						hatchNoStore.setData(records[0].get('hatchNoList'));
						hatchNoStore.insert(0, [{scdNm: 'All',scd: ''}]);
						
						me.setDateInDays('ctlDischargingToDt');
					}
				}
			}
		});
	},

	onSelectMasterBL: function(){
		var me = this;
		var refs = me.getReferences();
		var blStore = me.getStore('dischargingBlNoCombo');
		var searchParm = me.getViewModel().get('theSearch');
		
		searchParm.set('blNo', '');
		searchParm.set('doNo', '');
		
		blStore.removeAll();

		me.searchBlList();
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
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store =  me.getStore(me.MAIN_STORE_NAME);
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					me.calcTotal();
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
				}
			}
		});
	},
	
	// Date Change Event
	onDateChange:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		var validateDate = false;
		
		if(control == refs.ctlDischargingFromDt){
			validateDate = me.validatePeriodDate(newValue, refs.ctlDischargingToDt.getValue(), me.MAX_DATE_PERIOD);

			if(!validateDate){
				me.setDateInDaysByDate('ctlDischargingToDt', me.MAX_DATE_PERIOD, control.getValue());
			}
		} else {
			validateDate = me.validatePeriodDate(refs.ctlDischargingFromDt.getValue(), newValue, me.MAX_DATE_PERIOD);
			
			if(!validateDate){
				me.setDateInDaysByDate('ctlDischargingFromDt', -me.MAX_DATE_PERIOD, control.getValue());
			}
		}
	},
	
	// Mega Detail Purpose combo change event
	onCompareModeChange : function(combo, value, obj){
		var me = this;
		var calcItem = me.getViewModel().get('theCalc');
		
		if(calcItem){
	    	calcItem.set('displayDocTotal', value);
	    	calcItem.set('displayActTotal', value);
	    	calcItem.set('displayBalanceTotal', value);
		}
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var refs = me.getReferences();
		var searchBizParm = me.getSearchCondition();
		searchBizParm.classID = 'com.tsb.most.biz.parm.monitoring.SearchDischargingParm';
		searchBizParm.serviceID = 'MOST.discharging.selectListOfDischarging'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	
	onDownload:function(){
		var me = this;
		var refs = me.getReferences();
		
		var params = {
			initSearch: true
		};
		
		me.openCodePopup('popup-exporttypepopup','refBtnDownload', params);
	},
	
	onDetailDownload: function() {
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create("MOST.model.pdfprint.SearchReportBizParm");
		var params = me.createParam(searchParm, ['file','serviceId','param1']);
		
		var theSearch = me.getViewModel().get('theSearch');
		var vslCallId = StringUtil.toUpperCase(theSearch.data.vslCallId);
		var mfDocId = theSearch.data.mfDocId;
		var blNo = theSearch.data.blNo;
		var printType = refs.refRadioReportType.getValue().rb;
		
		if(StringUtil.isNullorEmpty(vslCallId)){
			MessageUtil.warning('Warning', 'inputVslCallIdMsg');
			return;
     	}
		
		params['branchCode'] = MOST.config.Token.getBranchCode(); 	// branch code fro multi db
		
		if(!StringUtil.isNullorEmpty(refs.ctlDischargingMasterCombo.getValue())){
			params['param2'] = refs.ctlDischargingMasterCombo.getValue();
     	} else {
     		params['param2'] = '';
     	}
		params['param1'] = vslCallId; 								// Vessel Call id
		params['param3'] = blNo;
		params['param4'] = MOST.config.Token.getUserId(); 			// User Id
		
		params['file'] = me.REPORT_PDF_FILE;
		params['serviceId'] = me.REPORT_PDF_FUNCTION;
		
		if(printType == 'PDF') {
			params['printType'] = 'PDF';		// print type PDF EXCEL
			me.openPDFPreview(params);
		} if (printType == 'EXCEL') {
			params['printType'] = 'EXCEL';		// print type PDF EXCEL
			me.downloadExcel(params);
		}
		
	},
	
	onDownloadExport:function(params){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('dischargingReportList');
		var blNoComboStore = me.getStore('dischargingBlNoCombo');
		var manifestComboStore = me.getStore('dischargingManifestCombo');
		var theSearch = me.getViewModel().get('theSearch');
		var vslCallId = StringUtil.toUpperCase(theSearch.data.vslCallId);
		var mfDocId = refs.ctlDischargingMasterCombo.getValue();
		var blNo = refs.ctlDischargingBlNoCombo.getValue();
		
		var blNoRecord = blNoComboStore.findRecord('scd', blNo);
		var manifestRecord = manifestComboStore.findRecord('scd', mfDocId);
		
		store.load({
			params: {
				vslCallId: vslCallId,
				mfDocId: mfDocId
			},
			callback: function(records, operation, success) {
				if (records && records.length <= 0) {
					
					if((blNoRecord != null && blNoRecord.get('cgTpCd') == 'DBN') || 
							(manifestRecord != null && manifestRecord.get('cgTpCd') == 'DBN')){
						MessageUtil.warning('Warning', 'drybulk_no_data_msg');
					} else if((blNoRecord != null && blNoRecord.get('cgTpCd') == 'BBK') || 
							(manifestRecord != null && manifestRecord.get('cgTpCd') == 'BBK')){
						MessageUtil.warning('Warning', 'breakbulk_no_data_msg');
					} else {
						MessageUtil.warning('Warning', 'cg_no_data_msg');
					}
					
					return;
				} else {
					me.onDetailDownload();
				}
			}
		});
	},
	
	onDownloadCancel:function(ownWin){
		var me = this;
		var winAlias = "popupAliaspopup-exporttypepopup";
		var win = me.lookupReference(winAlias);
		
		win.close();
		
	},
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Total Calculation
	calcTotal: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store =  me.getStore(me.MAIN_STORE_NAME);
    	var calcItem = Ext.create('MOST.model.monitoring.Discharging');
    	var docMtTotal = 0;
    	var docM3Total = 0;
    	var docQtyTotal = 0;
    	var actMtTotal = 0;
    	var actM3Total = 0;
    	var actQtyTotal = 0;
    	var compareMode = refs.ctlCompareCombo.getValue();
    	var prevBl = '';
    	var job = refs.ctlJobPurpModeCombo.getValue();
    	var count = 0;
    	var countMttotal = 0;
    	var countacttotal = 0;
//		actMtTotal += record.get('outWgtDir');
//		actMtTotal += record.get('outWgtIndir');
    	store.each(function(record){
//    		if(job
//				|| (!job && (record.get('jobPurpCd') === 'VA' || record.get('jobPurpCd') === 'VG' || record.get('jobPurpCd') === 'AB' ||record.get('jobPurpCd') === 'AW'))){
//    			actMtTotal += record.get('outWgt');
//        		actM3Total += record.get('outMsrmt');
//        		actQtyTotal += record.get('outQty');
//			}
    		
//    		if(job
//    			|| (!job && (record.get('jobPurpCd') in { VA:"", VG:"", AB:"", AW:"", VB:""} ))){
        		actMtTotal += record.get('outWgt');
            	actM3Total += record.get('outMsrmt');
            	actQtyTotal += record.get('outQty');	
//    		}
    		
    		if(record.get('blNo') != prevBl){
        		docMtTotal += record.get('wgt');
        		docM3Total += record.get('vol');
        		docQtyTotal += record.get('pkgQty');
        		prevBl = record.get('blNo');
    		}
    	});
    	
    	calcItem.set('docMtTotal', docMtTotal);
    	calcItem.set('docM3Total', docM3Total);
    	calcItem.set('docQtyTotal', docQtyTotal);
    	calcItem.set('actMtTotal', actMtTotal);
    	calcItem.set('actM3Total', actM3Total);
    	calcItem.set('actQtyTotal', actQtyTotal);
    	
    	calcItem.set('displayDocTotal', compareMode);
    	calcItem.set('displayActTotal', compareMode);
    	calcItem.set('displayBalanceTotal', compareMode);
    	
    	me.getViewModel().setData({theCalc:calcItem});
	},
	
	// Popup is closed and receives return value
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'ctlDischargingJpvc'){ // JPVC Popup
			if(returnValue){
				me.getViewModel().setData({theVsl:returnValue.item});
				me.searchBlList();
				me.searchMasterBLCombo();
			} else {
				me.getViewModel().setData({theVsl:null});
				me.searchBlList(true);
				me.searchMasterBLCombo(true);
			}
		}
		if(targetControl === 'reftxtFAgent'){ // Add for HHT
			if(returnValue){
				refs.reftxtFAgent.setValue(returnValue.code);
			}
		}
	},
	
	// Search Sn List
	searchBlList:function(isClear){
		var me = this;
		var store = me.getStore('dischargingBlNoCombo');
		
		var searchParm = me.getViewModel().get('theSearch');
		var vslCallId = StringUtil.toUpperCase(searchParm.data.vslCallId);
		var mfDocId = searchParm.data.mfDocId;

		if(isClear){
			store.removeAll();
		} else {
			store.load({
				params: {
					vslCallId: vslCallId,
					mfDocId: mfDocId
				},
				callback: function(records, operation, success) {
					if (success) {
						if(records != null & records.length > 0){
							store.insert(0, [{scdNm: 'All', scd: '' }]);
						}
					}
				}
			});
		}
	},
	
	// Search Master BL List:
	searchMasterBLCombo:function(isClear){
		var me = this;
		var store = me.getStore('dischargingManifestCombo');

		var searchParm = me.getViewModel().get('theSearch');
		var vslCallId = StringUtil.toUpperCase(searchParm.data.vslCallId);
		
		if(isClear){
			store.removeAll();
		} else {
			store.load({
				params: {
					vslCallId: vslCallId
				},
				callback: function(records, operation, success) {
					if (success) {
						store.insert(0, [{scdNm: 'All', scd: '' }]);
					}
				}
			});
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
		
		var params = me.createParam(searchParm)

     	var vslItem = me.getViewModel().get('theVsl');
     	var jpvcNo = StringUtil.toUpperCase(searchParm.data.vslCallId);
     	var fwrAgent = StringUtil.toUpperCase(searchParm.data.fwrAgnt);
     	var blNo = StringUtil.toUpperCase(searchParm.data.blNo);
     	var shiftId = me.lookupReference('ctlDischargingShiftCombo').getValue();
     	var doNo = StringUtil.toUpperCase(searchParm.data.doNo);
     	var hatchNo = me.lookupReference('ctlDischargingHatchCombo').getValue();
     	//var modeOfOpr = me.lookupReference('ctlDischargingDeliveryModeCombo').getValue();
    	var dateCondition = me.checkPeriodDate('ctlDischargingFromDt', 'ctlDischargingToDt', me.MAX_DATE_PERIOD, false);
		var mfDocId = searchParm.data.mfDocId;

		var jobPurpCd = me.lookupReference('ctlJobPurpModeCombo').getValue();
		var cargoTp = searchParm.data.cargoTp;
		var unitNo = searchParm.data.unitNo;
		
//		var jobPurpCdArr = new Array();
//		if(jobPurpCd === 'DS'){
//			jobPurpCdArr.push(Ext.String.format("'{0}'", 'VA'));
//			jobPurpCdArr.push(Ext.String.format("'{0}'", 'VG'));
//		}else{
//			jobPurpCdArr.push(Ext.String.format("'{0}'", jobPurpCd));
//		}
	

    	if(dateCondition == null){
    		return null;
    	}
		params['vslCallId'] = jpvcNo;
    	params['fwrAgent'] = fwrAgent;
    	params['blNo'] = blNo;
		params['mfDocId'] = mfDocId;
    	params['shiftId'] = shiftId;
    	params['doNo'] = doNo;
    	params['searchType'] = 'Discharging';
    	params['hatchNo'] = hatchNo;
    	//params['modeOfOpr'] = modeOfOpr;
		params['jobPurpCd'] = jobPurpCd;
    	params['userType'] = MOST.config.Token.getUserType();
    	params['ptnrCode'] = MOST.config.Token.getPtnrCode();
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
    	
    	if(dateCondition != null){
    		params['dischgStDt'] = dateCondition.fromDtString;
    		params['dischgEndDt'] = dateCondition.toDtString;
    	}
    	
    	return params;
	},

	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
		/*
	 * 
	 * ADD FOR MODERN - TABLET VERSION
	 * =========================================================================================================================
	 * */
	/**
 * =========================================================================================================================
 * INITIALIZE START
 */
	onLoadTbl: function () {
	var me = this;
	var refs = me.getReferences();
	var comboStore = me.getStore('dischargingCombo');
	var oprStore = me.getStore('dischargingOprCombo');
	var hatchNoStore = me.getStore('dischargingHatchNoCombo');
	var shiftStore = me.getStore('dischargingShiftCombo');
	var vslItem = me.getViewModel().get('theVessel');
	me.SHFT = MOST.config.Token.getWorkShift();
	me.WORKDATE = MOST.config.Token.getWorkDate();
	comboStore.load({
		callback: function (records, operation, success) {
			if (success) {
				if (records != null && records.length > 0) {
					oprStore.setData(records[0].get('oprList'));
					oprStore.insert(0, [{ tsptTpCdNm: 'All', tsptTpCd: '' }]);

					shiftStore.setData(records[0].get('shiftList'));
					shiftStore.insert(0, [{ shftNm: 'All', shftId: '' }]);

					hatchNoStore.setData(records[0].get('hatchNoList'));
					hatchNoStore.insert(0, [{ scdNm: 'All', scd: '' }]);
					refs.refWorkDate.setValue(me.WORKDATE);
					refs.refCboShift.setValue(me.SHFT);
					refs.refCboHatch.setValue('');
					me.searchBlListTbl(vslItem);
					me.onSearchTbl();
				}
			}
		}
	});
},
/**
 * INITIALIZE END
 * =========================================================================================================================
 */
/**
 * =========================================================================================================================
 * EVENT HANDLER START
 */
	onSearchTbl: function () {
		var me = this;
		var store =  me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchConditionTbl();
		var refs = me.getReferences();
		if (params == null) {
			return;
		}
		store.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					if (refs.ctlCompareCombo.getValue()) {
						me.onCompareModeChangeTbl();
					}
					else {
						refs.ctlCompareCombo.setValue('Mt');
					}
				}
			}
		});
	},
	onCompareModeChangeTbl: function () {
		var me = this;
		me.calcTotalTbl();
		var calcItem = me.getViewModel().get('theCalc');
		var refs = me.getReferences();
		var amntMode = refs.ctlCompareCombo.getValue();
		if (calcItem) {
			switch (amntMode) {
				case 'Mt':
					calcItem.data.displayDocTotal = calcItem.data.docMtTotal;
					calcItem.data.displayActTotal = calcItem.data.actMtTotal;
					calcItem.data.displayBalanceTotal = calcItem.data.balanceMtTotal;
					break;
				case 'M3':
					calcItem.data.displayDocTotal = calcItem.data.docM3Total;
					calcItem.data.displayActTotal = calcItem.data.actM3Total;
					calcItem.data.displayBalanceTotal = calcItem.data.balanceM3Total;
					break;
				case 'Qty':
					calcItem.data.displayDocTotal = calcItem.data.docQtyTotal;
					calcItem.data.displayActTotal = calcItem.data.actQtyTotal;
					calcItem.data.displayBalanceTotal = calcItem.data.balanceQtyTotal;
					break;
			}
		}

	},
	onBlChange: function () {
		var me = this;
		me.onSearchTbl();
	},
	getSearchConditionTbl: function () {
		var me = this;
		var refs = me.getReferences();
		var vslItem = me.getViewModel().get('theVessel');
		var fwrAgent = refs.reftxtFAgent.getValue();
		var blNo = refs.refcboBL.getValue();
		var hatchNo = refs.refCboHatch.getValue();
		var modeOfOpr = refs.refcboActDelv.getValue();
		var params = {
			vslCallId: vslItem.vslCallId,
			fwrAgent: fwrAgent,
			blNo: blNo,
			shiftId: me.getViewModel().get('globalWorkShift'),
			shiftDate: me.getViewModel().get('globalWorkDate'),
			shiftFromDt: Ext.Date.format(me.WORKDATE, 'd/m/Y'),
			shiftToDt: Ext.Date.format(me.WORKDATE, 'd/m/Y'),
			hatchNo: hatchNo,
			modeOfOpr: modeOfOpr
		};
		return params;
	},
// Search BL List
	searchBlListTbl: function (record) {
		var me = this;
		var store = me.getStore('dischargingBlNoComboHHT');
		var refs = me.getReferences();
		var fwrAgent = refs.reftxtFAgent.getValue();
		var hatchNo = refs.refCboHatch.getValue();

		if (record) {
			store.load({
				params: {
					vslCallId: record.vslCallId,
//					shiftId: refs.refCboShift.getValue(),
//					shiftDate: Ext.Date.format(me.WORKDATE, 'd/m/Y'),
					fwrAgent: fwrAgent,
					hatchNo: hatchNo
				},
				callback: function (records, operation, success) {
					if (success) {
						var hits = {};
						store.filterBy(record => {
							var name = record.get('blNo');
							if (hits[name]) {
								return false;
							} else {
								hits[name] = true;
								return true;
							}
						})
						// delete the filtered out records
						delete store.snapshot;
						refs.refcboBL.setPlaceholder('Select');
					}
				}
			});
		} else {
			store.removeAll();
		}
	},
	onFAgentClick: function(){
		var me = this;
		var refs = me.getReferences();
		var ptyCd = refs.reftxtFAgent.getValue();
		var params = {
				title: 'Requester',
				ptyCd: ptyCd,
				ptyDivCd:'FWD'
		};		
		ViewUtil.openCodePopup(this, 'app-requesterpopuphht', 'reftxtFAgent', params);
	},
/**
 * =========================================================================================================================
 * EVENT HANDLER END
 */

/*
 * GENERAL METHOD START
 * =========================================================================================================================
 */
// Total Calculation
	calcTotalTbl: function () {
		var me = this;
		var refs = me.getReferences();
		var store =  me.getStore(me.MAIN_STORE_NAME);
		var calcItem = Ext.create('MOST.model.monitoring.Discharging');
		var docMtTotal = 0;
		var docM3Total = 0;
		var docQtyTotal = 0;
		var actMtTotal = 0;
		var actM3Total = 0;
		var actQtyTotal = 0;
		
		var tempBL = '';
		store.each(function (record) {
			if(record.get('blNo') !== tempBL){
				docMtTotal += parseFloat(record.get('wgt'));
				docM3Total += parseFloat(record.get('vol'));
				docQtyTotal += parseFloat(record.get('pkgQty'));
				
				tempBL = record.get('blNo');
			}
		});
		
		store.each(function (record) {
			actMtTotal += parseFloat(record.get('outWgt'));
			actM3Total += parseFloat(record.get('outMsrmt'));
			actQtyTotal += parseFloat(record.get('outQty'));
		});
		calcItem.set('docMtTotal', docMtTotal);
		calcItem.set('docM3Total', docM3Total);
		calcItem.set('docQtyTotal', docQtyTotal);
		calcItem.set('actMtTotal', actMtTotal);
		calcItem.set('actM3Total', actM3Total);
		calcItem.set('actQtyTotal', actQtyTotal);

		me.getViewModel().setData({ theCalc: calcItem });
	},
	
	onHandlingGridlClick:function(gridview, tdEl, cellIndex, record, trEl, rowIndex, e){
		var me = this;
		var refs = me.getReferences();
		
		me.totalDocMt = 0;
		me.totalDocMt = 0;
		me.totalDocM3 = 0;
		me.totalDocQty = 0;
		
		me.totalActMt = 0;
		me.totalActM3 = 0;
		me.totalActQty = 0;
		
		me.balanceMt = 0;
		me.balanceM3 = 0;
		me.balanceQty = 0;
		
//		actMtTotal += record.get('outWgt');
//		actM3Total += record.get('outMsrmt');
//		actQtyTotal += record.get('outQty');
//		docMtTotal += record.get('wgt');
//		docM3Total += record.get('vol');
//		docQtyTotal += record.get('pkgQty');
		
		me.totalDocMt = parseFloat(record.get('wgt'));
		me.totalDocM3 = parseFloat(record.get('vol'));
		me.totalDocQty = parseFloat(record.get('pkgQty'));
		
		me.totalActMt = parseFloat(record.get('outWgt'));
		me.totalActM3 = parseFloat(record.get('outMsrmt'));
		me.totalActQty = parseFloat(record.get('outQty'));
		
		me.balanceMt = me.totalDocMt - me.totalActMt;
		me.balanceM3 = me.totalDocM3 - me.totalActM3;
		me.balanceQty = me.totalDocQty - me.totalActQty;
		
		refs.ctlDocTotal.setValue(me.totalDocMt.toFixed(3));
		refs.ctlActTotal.setValue(me.totalActMt.toFixed(3));
		refs.ctlBalance.setValue(me.balanceMt.toFixed(3));
		
		var calcItem = me.getViewModel().get('theCalc');
		
		refs.ctlCompareCombo.setValue("MT");
		
		var compareMode = refs.ctlCompareCombo.getValue();

    	calcItem.set('displayDocTotal', compareMode);
    	calcItem.set('displayActTotal', compareMode);
    	calcItem.set('displayBalanceTotal', compareMode);
    	
    	me.getViewModel().setData({theCalc:calcItem});
	},
	
	onDblClick: function(){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME); 
		var refs = me.getReferences();
		var selection = refs.refDischargingGrid.getSelection() == null ? null : refs.refDischargingGrid.getSelection()[0];
		
		if (selection == null) {
			return;
		}
		
		if (selection.get('cgTpCd') != 'RCV') {
			MessageUtil.warning('warning_msg','msgCannotDblClick');
			return;
		}
		
		me.getViewModel().set('theDetail', selection);
		me.openDetailPopup(selection);
	},
	
	onUnitListDetailLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var unitNoStore = me.getStore('unitNosList'); 
		
		unitNoStore.removeAll();
		unitNoStore.load({
			params:{
				sdoNo: me.getViewModel().get('theDetail').get('sdoNo'),
				blNo: me.getViewModel().get('theDetail').get('blNo'),
				vslCallId: me.getViewModel().get('theDetail').get('vslCallId'),
				unitNo: me.getViewModel().get('theDetail').get('unitNo')
			}
		});
	},
	
	onSelectCargoTpCombo: function(){
		var me = this.getView();
		var refs = me.getReferences();
		var cargoTp = me.getViewModel().get('theSearch').get('cargoTp');
		
		if(cargoTp != 'RCV' && cargoTp != '' && cargoTp != null){
			refs.ctlUnitNo.setValue('');
			refs.ctlUnitNo.setHidden(true);
		}else{
			refs.ctlUnitNo.setHidden(false);
		}
	},
/*
 * GENERAL METHOD END
 * =========================================================================================================================
 */
/*
 * 
 * END FOR MODERN - TABLET VERSION
 * =========================================================================================================================
 * */
});