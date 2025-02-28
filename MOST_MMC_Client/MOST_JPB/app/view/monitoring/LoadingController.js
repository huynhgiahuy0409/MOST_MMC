Ext.define('MOST.view.monitoring.LoadingController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.loading',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_DATE_PERIOD: 92,	// MAX PERIOD DATE
	WORKDATE: '',
	SHFT: '',
	CONST_AMNTMODE_MT: 'MT',
	CONST_AMNTMODE_M3: 'M3',
	CONST_AMNTMODE_QTY: 'QtY',
	MAIN_GRID_REF_NAME: 'refLoadingGrid',
	MAIN_STORE_NAME: 'loading',
	PARAMETTER_LOADING_COMPARE_COMBO_STORE: 'loadingCompareCombo',
	
	REPORT_PDF_FILE: 'VesselLoadReport.jrxml',
	REPORT_PDF_FUNCTION: 'MOST.monitoringReport.selectVesselLoadListReport',
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
		var comboStore = me.getStore('loadingCombo');
		var oprStore = me.getStore('loadingOprCombo');
		var hatchNoStore = me.getStore('loadingHatchNoCombo');
		var shiftStore = me.getStore('loadingShiftCombo');
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.COMPARE_COMBO, me.PARAMETTER_LOADING_COMPARE_COMBO_STORE); 
		
		var searchParm = Ext.create('MOST.model.monitoring.SearchLoadingParm');
		
		var cargoTpCombo = me.getStore('cargoTpCombo');
		cargoTpCombo.load();
		
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		
		searchParm.set('progress', 'N');
		
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
						
						me.setDateInDays('ctlLoadedToDt');
					}
				}
			}
		});
	},

	onSelectBookingNo: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('loadingSnNoCombo');
		var searchParm = me.getViewModel().get('theSearch');
		
		searchParm.set('shipgNoteNo', '');
		searchParm.set('grNo', '');
		store.removeAll();

		var theVessel = me.getViewModel().get('theVsl');

		me.searchSnList(theVessel);
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
    	var store = me.getStore(me.MAIN_STORE_NAME);
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					me.calcTotal();
					me.setSnList(records);
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
		
		if(control == refs.ctlLoadedFromDt){
			validateDate = me.validatePeriodDate(newValue, refs.ctlLoadedToDt.getValue(), me.MAX_DATE_PERIOD);

			if(!validateDate){
				me.setDateInDaysByDate('ctlLoadedToDt', me.MAX_DATE_PERIOD, control.getValue());
			}
		} else {
			validateDate = me.validatePeriodDate(refs.ctlLoadedFromDt.getValue(), newValue, me.MAX_DATE_PERIOD);
			
			if(!validateDate){
				me.setDateInDaysByDate('ctlLoadedFromDt', -me.MAX_DATE_PERIOD, control.getValue());
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
		searchBizParm.classID = 'com.tsb.most.biz.parm.monitoring.SearchLoadingParm';
		searchBizParm.serviceID = 'MOST.loading.selectListOfLoading'

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
	
	onDownloadExport: function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('loadingReportList');
		var manifestComboStore = me.getStore('loadingManifestCombo');
		var snComboStore = me.getStore('loadingSnNoCombo');
		var theSearch = me.getViewModel().get('theSearch');
		var mfDocId = refs.ctlBookingNoCombo.getValue();
		var snNo = refs.ctlLoadingSnNoCombo.getValue();
		var vslCallId = StringUtil.toUpperCase(theSearch.data.vslCallId);
		var snNoRecord = snComboStore.findRecord('scd', snNo);
		var manifestRecord = manifestComboStore.findRecord('scd', mfDocId);
		
		store.load({
			params: {
				vslCallId: vslCallId,
				mfDocId: mfDocId
			},
			callback: function(records, operation, success) {
				if (records && records.length <= 0) {
					
					if((snNoRecord != null && snNoRecord.get('cgTpCd') == 'DBN') || 
							(manifestRecord != null && manifestRecord.get('cgTpCd') == 'DBN')){
						MessageUtil.warning('Warning', 'drybulk_no_data_msg');
					} else if((snNoRecord != null && snNoRecord.get('cgTpCd') == 'BBK') || 
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
	
	onDetailDownload: function() {
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create("MOST.model.pdfprint.SearchReportBizParm");
		var params = me.createParam(searchParm, ['file','serviceId','param1']);
		
		var theSearch = me.getViewModel().get('theSearch');
		var vslCallId = StringUtil.toUpperCase(theSearch.data.vslCallId);
		var mfDocId = refs.ctlBookingNoCombo.getValue();
		var printType = refs.refRadioReportType.getValue().rb;
		
		if(StringUtil.isNullorEmpty(vslCallId)){
			MessageUtil.warning('Warning', 'inputVslCallIdMsg');
			return;
     	}
		
		if(!StringUtil.isNullorEmpty(mfDocId)){
			params['param2'] = mfDocId;
     	} else {
     		params['param2'] = '';
     	}
		
		params['branchCode'] = MOST.config.Token.getBranchCode(); 	// branch code fro multi db
		params['param1'] = vslCallId; 								// Vessel Call id
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
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Bl List Setting
	setSnList: function(records){
		var me = this;
		var snComboStore = me.getStore('loadingSnNoCombo');
		
		snComboStore.removeAll();
		snComboStore.commitChanges();

		records.forEach(function(record, index){
			if(snComboStore.find('shipgNoteNo', record.get('shipgNoteNo')) < 0){
				snComboStore.insert(index, [{shipgNoteNo: record.get('shipgNoteNo')}]);
			}
		});
	},
	
	// Total Calculation
	calcTotal: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore(me.MAIN_STORE_NAME);
    	var calcItem = Ext.create('MOST.model.monitoring.Loading');
    	var docMtTotal = 0;
    	var docM3Total = 0;
    	var docQtyTotal = 0;
    	var actMtTotal = 0;
    	var actM3Total = 0;
    	var actQtyTotal = 0;
    	var compareMode = refs.ctlCompareCombo.getValue();
    	
		var tempDocNo = '';
		var job = refs.ctlJobPurpModeCombo.getValue();
		
		store.each(function (record) {

//			if(job || (!job && (record.get('jobPurpCd') === 'AV' || record.get('jobPurpCd') === 'GV'))){
    			actMtTotal += parseFloat(record.get('totInWgt'));
    			actM3Total += parseFloat(record.get('totInMsrmt'));
    			actQtyTotal += parseFloat(record.get('totInPkgQty'));
//			}

//			if(StringUtil.isNullorEmpty(tempDocNo) || record.get('shipgNoteNo') !== tempDocNo){
    			docMtTotal += parseFloat(record.get('wgt'));
    			docM3Total += parseFloat(record.get('msrmt'));
    			docQtyTotal += parseFloat(record.get('pkgQty'));
//				tempDocNo = record.get('shipgNoteNo');
//			}
		});

		store.each(function(record){
			
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
		
		if(targetControl === 'ctlLoadingJpvc'){ // JPVC Popup
			if(returnValue){
				me.getViewModel().setData({theVsl:returnValue.item});
				me.searchSnList(returnValue.item);
				me.searchBookingNoCombo(returnValue.item);
				refs.ctlScn.setValue(returnValue.item.get('scn'));
			} else {
				me.getViewModel().setData({theVsl:null});
				me.searchSnList(null);
				me.searchBookingNoCombo(null);
				refs.ctlScn.setValue('');
			}
		}
		if(targetControl === 'reftxtFAgent'){ // Add for HHT
			if(returnValue){
				refs.reftxtFAgent.setValue(returnValue.code);
			}
		}
		if(targetControl === 'ctlScn'){ 
			if(returnValue){
				refs.ctlScn.setValue(returnValue.code);

				if(!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))){
					refs.ctlLoadingJpvc.setValue(returnValue.item.get('vslCallId'));
					me.getViewModel().setData({theVslInfo:returnValue.item});
					me.onSearch();
				}else {
					refs.ctlLoadingJpvc.setValue('');
					me.getViewModel().setData({theVslInfo:null});
				}
			} 
		}
	},
	
	// Search Sn List
	searchSnList:function(record){
		var me = this;
		var store = me.getStore('loadingSnNoCombo');
		var searchParm = me.getViewModel().get('theSearch');

		if(record){
			store.load({
				params: {
					searchType : 'ShippingNoteNoList',
					vslCallId : record.get('vslCallId'),
					mfDocId: searchParm.get('mfDocId')
				},
				callback: function(records, operation, success) {
					if (success) {
						// SUCCES
					}
				}
			});
		} else {
			store.removeAll();
		}
	},

	// Search BookingNo Combo List:
	searchBookingNoCombo:function(record){
		var me = this;
		var store = me.getStore('loadingManifestCombo');

		var searchParm = me.getViewModel().get('theSearch');
		var vslCallId = StringUtil.toUpperCase(searchParm.data.vslCallId);
		var opeClassCd = 'E';
		
		if(record){
			store.load({
				params: {
					vslCallId: vslCallId,
					opeClassCd: opeClassCd
				},
				callback: function(records, operation, success) {
					if (success) {
						store.insert(0, [{scdNm: 'All', scd: '' }]);
					}
				}
			});
		} else {
			store.removeAll();
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
		
		var params = me.createParam(searchParm);

     	var vslCallId = StringUtil.toUpperCase(searchParm.data.vslCallId);
     	var scn = StringUtil.toUpperCase(searchParm.data.scn);
     	var fwrAgent = StringUtil.toUpperCase(searchParm.data.fwrAgnt);
		var mfDocId = searchParm.data.mfDocId;
     	var snNo = StringUtil.toUpperCase(searchParm.data.shipgNoteNo);
     	var shift = me.lookupReference('ctlLoadingShiftCombo').getValue();
     	var grNo = StringUtil.toUpperCase(searchParm.data.grNo);
     	var lorryNo = StringUtil.toUpperCase(searchParm.data.lorryNo);
     	var hatchNo = me.lookupReference('ctlLoadingHatchCombo').getValue();
    	var dateCondition = me.checkPeriodDate('ctlLoadedFromDt', 'ctlLoadedToDt', me.MAX_DATE_PERIOD, false);
    	
    	var jobPurpCd = me.lookupReference('ctlJobPurpModeCombo').getValue();
    	var cargoTp = searchParm.data.cargoTp;
    	var unitNo = searchParm.data.unitNo;
//		var jobPurpCdArr = new Array();
//
//		if(jobPurpCd === 'LD'){
//			jobPurpCdArr.push(Ext.String.format("'{0}'", 'AV'));
//			jobPurpCdArr.push(Ext.String.format("'{0}'", 'GV'));
//		}else{
//			jobPurpCdArr.push(Ext.String.format("'{0}'", jobPurpCd));
//		}
		
    	if(dateCondition == null){
    		return null;
    	}

    	if(dateCondition.isEmpty  && StringUtil.isNullorEmpty(vslCallId)){
    		MessageUtil.warning('warning_msg', 'loading_search_condition_msg');
    		return null;
    	}
		
    	params['vslCallId'] = vslCallId;
    	params['scn'] = scn;
    	params['fwrAgent'] = fwrAgent;
    	params['mfDocId'] = mfDocId;
		params['snNo'] = snNo;
    	params['shift'] = shift;
    	params['grNo'] = grNo;
    	params['lorryNo'] = lorryNo;
    	params['hatchNo'] = hatchNo;
    	params['jobPurpCd'] = jobPurpCd;
    	params['cargoTp'] = cargoTp;
    	params['unitNo'] = unitNo;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
    	
    	if(dateCondition != null){
    		params['shiftFromDt'] = dateCondition.fromDtString;
    		params['shiftToDt'] = dateCondition.toDtString;
    	}
    	
    	return params;
	},
	
	exportTo: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
    	
        var cfg = Ext.merge({
            title: 'Loading',
            fileName: 'Loading' + '.' + (btn.cfg.ext || btn.cfg.type)
        }, btn.cfg);

        var grid = refs.refLoadingGrid;
        grid.saveDocumentAs(cfg);
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
		var comboStore = me.getStore('loadingCombo');
		var oprStore = me.getStore('loadingOprCombo');
		var hatchNoStore = me.getStore('loadingHatchNoCombo');
		var shiftStore = me.getStore('loadingShiftCombo');
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
						me.searchSnListTbl(vslItem);
						me.onSearchTbl();
					}
				}
			}
		});
	},
/**
 * INITIALIZE 	END
 * =========================================================================================================================
 */
/**
 * =========================================================================================================================
 * EVENT HANDLER START
 */
	onSearchTbl: function () {
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
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
						refs.ctlCompareCombo.setValue('MT');
					}
				}
			}
		});
	},
	onCompareModeChangeTbl: function () {
		var me = this;
		me.calcTotal();
		var calcItem = me.getViewModel().get('theCalc');
		var refs = me.getReferences();
		var amntMode = refs.ctlCompareCombo.getValue();
		if (calcItem) {
			switch (amntMode) {
				case me.CONST_AMNTMODE_MT:
					calcItem.data.displayDocTotal = calcItem.data.docMtTotal;
					calcItem.data.displayActTotal = calcItem.data.actMtTotal;
					calcItem.data.displayBalanceTotal = calcItem.data.balanceMtTotal;
					break;
				case me.CONST_AMNTMODE_M3:
					calcItem.data.displayDocTotal = calcItem.data.docM3Total;
					calcItem.data.displayActTotal = calcItem.data.actM3Total;
					calcItem.data.displayBalanceTotal = calcItem.data.balanceM3Total;
					break;
				case me.CONST_AMNTMODE_QTY:
					calcItem.data.displayDocTotal = calcItem.data.docQtyTotal;
					calcItem.data.displayActTotal = calcItem.data.actQtyTotal;
					calcItem.data.displayBalanceTotal = calcItem.data.balanceQtyTotal;
					break;
			}
		}

	},
	onSNChange: function () {
		var me = this;
		me.onSearchTbl();
	},
	getSearchConditionTbl: function () {
		var me = this;
		var refs = me.getReferences();
		var vslItem = me.getViewModel().get('theVessel');
		var fwrAgent = refs.reftxtFAgent.getValue();
		var snNo = refs.refcboSN.getValue();
		var hatchNo = refs.refCboHatch.getValue();
		var params = {
			vslCallId: vslItem.vslCallId,
			fwrAgent: fwrAgent,
			snNo: snNo,
//			shift: refs.refCboShift.getValue(),
//			shiftFromDt: Ext.Date.format(me.WORKDATE, 'd/m/Y'),
//			shiftToDt: Ext.Date.format(me.WORKDATE, 'd/m/Y'),
//			hatchNo: hatchNo,
		};
		return params;
	},
	// Search Sn List
	searchSnListTbl: function (record) {
		var me = this;
		var store = me.getStore('loadingSNComboHHT');
		var refs = me.getReferences();
		var fwrAgent = refs.reftxtFAgent.getValue();
		var hatchNo = refs.refCboHatch.getValue();

		if (record) {
			store.load({
				params: {
					searchType: 'SNNoTbl',
					vslCallId: record.vslCallId,
//					shift: refs.refCboShift.getValue(),
//					shiftFromDt: Ext.Date.format(me.WORKDATE, 'd/m/Y'),
//					shiftToDt: Ext.Date.format(me.WORKDATE, 'd/m/Y'),
//					fwrAgent: fwrAgent,
//					hatchNo: hatchNo
				},
				callback: function (records, operation, success) {
					if (success) {
						refs.refcboSN.setPlaceholder('Select');
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
				title: 'Forwarder',
				ptyCd: ptyCd,
				ptyDivCd:'FWD'
		};		
		ViewUtil.openCodePopup(this, 'app-requesterpopuphht', 'reftxtFAgent', params);
	},
	
	onHandlingGridlClick:function(gridview, tdEl, cellIndex, record, trEl, rowIndex, e){
		var me = this;
		var refs = me.getReferences();
		
		me.totalDocMt = 0;
		me.totalDocM3 = 0;
		me.totalDocQty = 0;
		
		me.totalActMt = 0;
		me.totalActM3 = 0;
		me.totalActQty = 0;
		
		me.balanceMt = 0;
		me.balanceM3 = 0;
		me.balanceQty = 0;
		
//		docMtTotal += parseFloat(record.get('wgt'));
//		docM3Total += parseFloat(record.get('msrmt'));
//		docQtyTotal += parseFloat(record.get('pkgQty'));
//		actMtTotal += parseFloat(record.get('totInWgt'));
//		actM3Total += parseFloat(record.get('totInMsrmt'));
//		actQtyTotal += parseFloat(record.get('totInPkgQty'));
	
		
		me.totalDocMt = parseFloat(record.get('wgt'));
		me.totalDocM3 = parseFloat(record.get('msrmt'));
		me.totalDocQty = parseFloat(record.get('pkgQty'));
		
		me.totalActMt = parseFloat(record.get('totInWgt'));
		me.totalActM3 = parseFloat(record.get('totInMsrmt'));
		me.totalActQty = parseFloat(record.get('totInPkgQty'));
		
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
		var selection = refs.refLoadingGrid.getSelection() == null ? null : refs.refLoadingGrid.getSelection()[0];
		
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
				grNo: me.getViewModel().get('theDetail').get('grNo'),
				shipgNoteNo: me.getViewModel().get('theDetail').get('shipgNoteNo'),
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
/**
 * =========================================================================================================================
 * EVENT HANDLER END
 */

/*
 * GENERAL METHOD START
 * =========================================================================================================================
 */

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