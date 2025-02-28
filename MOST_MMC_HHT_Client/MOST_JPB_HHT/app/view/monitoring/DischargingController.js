Ext.define('MOST.view.monitoring.DischargingController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.discharging',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_DATE_PERIOD : 7,	// MAX PERIOD DATE
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
		//var comboStore = me.getStore('dischargingCombo');
		var oprStore = me.getStore('dischargingOprCombo');
		var hatchNoStore = me.getStore('dischargingHatchNoCombo');
		var shiftStore = me.getStore('dischargingShiftCombo');
		
	
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
						
						//me.setDateInDays('ctlDischargingFromDt');
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
	// Search Event Handler
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore('discharging');
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					me.calcTotal();
					me.setBlList(records);
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
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Bl List Setting
	setBlList: function(records){
		var me = this;
		var blComboStore = me.getStore('dischargingBlNoCombo');
		
		blComboStore.removeAll();
		blComboStore.commitChanges();

		records.forEach(function(record, index){
			if(blComboStore.find('blNo', record.get('blNo')) < 0){
				blComboStore.insert(index, [{blNo: record.get('blNo')}]);
			}
		});
	},
	
	// Total Calculation
	calcTotal: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore('discharging');
    	var calcItem = Ext.create('MOST.model.monitoring.Discharging');
    	var docMtTotal = 0;
    	var docM3Total = 0;
    	var docQtyTotal = 0;
    	var actMtTotal = 0;
    	var actM3Total = 0;
    	var actQtyTotal = 0;
    	var compareMode = refs.ctlCompareCombo.getValue();
    	var prevBl = '';
    	
    	store.each(function(record){
    		actMtTotal += record.get('outWgt');
    		actM3Total += record.get('outMsrmt');
    		actQtyTotal += record.get('outQty');
    		
    		if(StringUtil.isNullorEmpty(prevBl) || record.get('blNo') !== prevBl){
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
			} else {
				me.getViewModel().setData({theVsl:null});
				me.searchBlList(true);
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
		var store = me.getStore('dischargingBlNoComboForAll');
		var comboStore = me.getStore('dischargingBlNoCombo');
		var params = me.getSearchCondition();
		
		if(isClear){
			store.removeAll();
		} else {
			store.load({
				params: params,
				callback: function(records, operation, success) {
					if (success) {
						if(records != null & records.length > 0){
							comboStore.setData(records[0].get('blList'));
						}
					}
				}
			});
		}
	},
	
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var vslItem = me.getViewModel().get('theVsl');
     	var jpvcNo = me.lookupReference('ctlDischargingJpvc').getValue();
     	var fwrAgent = me.lookupReference('ctlDischargingFwrAgent').getValue();
     	var blNo = me.lookupReference('ctlDischargingBlNoCombo').getValue();
     	var shiftId = me.lookupReference('ctlDischargingShiftCombo').getValue();
     	var doNo = me.lookupReference('ctlDischargingDo').getValue();
     	var hatchNo = me.lookupReference('ctlDischargingHatchCombo').getValue();
     	var modeOfOpr = me.lookupReference('ctlDischargingDeliveryModeCombo').getValue();
    	var dateCondition = me.checkPeriodDate('ctlDischargingFromDt', 'ctlDischargingToDt', me.MAX_DATE_PERIOD, false);
		
    	if(dateCondition == null){
    		return null;
    	}
    	
    	if((StringUtil.isNullorEmpty(dateCondition.fromDtString) || StringUtil.isNullorEmpty(shiftId)) &&
    	   StringUtil.isNullorEmpty(jpvcNo)){
    		MessageUtil.warning('warning_msg', 'loading_search_condition_msg');
    		return null;
    	}
    	
    	var params = {
    			jpvcNo : jpvcNo,
    			fwrAgent : fwrAgent,
    			blNo : blNo,
    			shiftId : shiftId,
    			doNo : doNo,
    			hatchNo : hatchNo,
    			modeOfOpr : modeOfOpr,
    			userType:MOST.config.Token.getUserType(),
    			ptnrCode:MOST.config.Token.getPtnrCode(),
    			searchType : 'Discharging'
		};
    	
    	if(dateCondition != null){
    		params['dischgStDt'] = dateCondition.fromDtString;
    		params['dischgEndDt'] = dateCondition.toDtString;
    	}
    	
    	return params;
	},
	
	exportTo: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
    	
        var cfg = Ext.merge({
            title: 'Discharging',
            fileName: 'Discharging' + '.' + (btn.cfg.ext || btn.cfg.type)
        }, btn.cfg);

        var grid = refs.refDischargingGrid;
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
 * HHT TABLET INITIALIZE START
 * 
 */
	onLoadTbl: function () {
	var me = this;
	var refs = me.getReferences();
	//m var comboStore = me.getStore('dischargingCombo');
	var oprStore = me.getStore('dischargingOprCombo');
	var hatchNoStore = me.getStore('dischargingHatchNoCombo');
	//m var shiftStore = me.getStore('dischargingShiftCombo');
	var vslItem = me.getViewModel().get('theVessel');
	me.SHFT = MOST.config.Token.getWorkShift();
	me.WORKDATE = MOST.config.Token.getWorkDate();
	
	var searchHatchComboParm = {
			mcd : 'HTC',
			lcd : 'MT'			
	};
	var searchOprComboParm = {
			mcd : 'DELVTP',
			lcd : 'MT'			
	};


//	comboStore.load({
//		callback: function (records, operation, success) {
//			if (success) {
//				if (records != null && records.length > 0) {
//					oprStore.setData(records[0].get('oprList'));
//					oprStore.insert(0, [{ tsptTpCdNm: 'Both', tsptTpCd: '' }]);
//
//					shiftStore.setData(records[0].get('shiftList'));
//					shiftStore.insert(0, [{ shftNm: 'All', shftId: '' }]);
//
//					//hatchNoStore.setData(records[0].get('hatchNoList'));
//					//hatchNoStore.insert(0, [{ scdNm: 'All', scd: '' }]);
//					
//					refs.refWorkDate.setValue(me.WORKDATE);
//					refs.refCboShift.setValue(me.SHFT);
//					refs.refCboHatch.setValue('');
//					me.searchBlListTbl(vslItem);
//					me.onSearchTbl();
//				}
//			}
//		}
//	});
	

	oprStore.load({		
		params: searchOprComboParm,
		callback: function(records, operation, success) {
			if (success) {
				oprStore.insert(0, [{scdNm: 'All',scd: ''}]);
			}
		}
	});
	
	
	hatchNoStore.load({
		params: searchHatchComboParm,
		callback: function(records, operation, success) {
			if (success) {
				hatchNoStore.insert(0, [{scdNm: 'All',scd: ''}]);					
			}
		}
	});		
	
	
	
	/*
	shiftStore.load({			
		callback: function(records, operation, success) {
			if (success) {
				//shiftStore.insert(0, [{shftNm: 'All',shftId: ''}]);
			}
		}
	});
	*/
	refs.refWorkDate.setValue(me.WORKDATE);
	refs.refCboShift.setValue(me.SHFT);
	refs.refCboHatch.setValue('');
	me.searchBlListTbl(vslItem);
	me.onSearchTbl();
	
},
/**
 *HHT TABLET INITIALIZE END 
 * =========================================================================================================================
 */
/**
 * =========================================================================================================================
 * HHT TABLET EVENT HANDLER START
 */
	hatchNoMap:  new Map(),
	onSearchTbl: function () {
		var me = this;
		var store = me.getStore('discharging');
		var params = me.getSearchConditionTbl();
		var refs = me.getReferences();
		if (params == null) {
			return;
		}
		store.load({
			params: params,
			callback: function (records, operation, success) {
				if (success) {
					/*if (refs.ctlCompareCombo.getValue()) {
						me.onCompareModeChangeTbl();
					}
					else {
						refs.ctlCompareCombo.setValue('Mt');
					}*/
					//Make Hatch Distinct:
					//getHatch Array:
					var blNoArr = store.collect('blNo');
					me.hatchNoMap.clear();
					blNoArr.forEach(function(arrItem){
						var hatchNoSet = new Set();
						store.filter('blNo',arrItem); 
						var hatchNoArr = store.collect('hatchNo');
						me.hatchNoMap.set(arrItem, hatchNoArr);
						store.clearFilter();
					})
					
					me.displayHatch();
					me.calcTotalTbl(); // Just caculate Amount base on one BL or all BL
					me.doFilterResult(); // Filter resulte/
					me.setFWDValue();
				}
			}
		});
	},
	
	onBlChange: function (ref) {
		var me = this;
		var refs = me.getReferences();
		refs.refCboHatch.clearValue ();
		refs.refcboActDelv.clearValue ();
		me.onSearchTbl();
	},
	
	displayHatch: function(){
		var me = this;
		var refs = me.getReferences();
		var hatchNoStore = me.getStore('dischargingHatchNoCombo');
		hatchNoStore.removeAll();
		var bl = refs.refcboBL.getValue();
		if(bl){
			var tempArr = me.hatchNoMap.get(bl);
			tempArr.forEach(function(setItem){
				hatchNoStore.insert(0, [{ scdNm: setItem, scd: setItem }]);
			});
		}else{
			var tempArr = new Array();
			me.hatchNoMap.forEach(function(mapItem){
				tempArr = tempArr.concat(Array.from(mapItem));
			});
			var uniqueHatch = tempArr.filter(function(value, index, self){
				return self.indexOf(value) === index;
			});
			uniqueHatch.forEach(function(setItem){
				hatchNoStore.insert(0, [{ scdNm: setItem, scd: setItem }]);
			});
		}
		hatchNoStore.insert(0, [{ scdNm: 'All', scd: '' }]);
	},
	
	setFWDValue: function(){
		var me = this;
		var refs = me.getReferences();
		var dischargeStore = me.getStore('discharging');

		if(!refs.refcboBL.getValue()){
			refs.reftxtFAgent.setValue('');
			return;
		}
		if(dischargeStore.data.items[0]){
			refs.reftxtFAgent.setValue( dischargeStore.data.items[0].get('fwrAgnt'));
		}
	},
	
	onChangeConditionTbl: function(){
		var me = this;
		me.doFilterResult();
	},
	
	//Enhance:
	doFilterResult: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('discharging');
		var fwrAgent = refs.reftxtFAgent.getValue();
		var blNo = refs.refcboBL.getValue();
		var hatchNo = refs.refCboHatch.getValue();
		var modeOfOpr = refs.refcboActDelv.getValue();
		store.filter([
			{
				property : 'fwrAgnt',
				value 	: fwrAgent == null ? "":fwrAgent
			},
			{
				property : 'blNo',
				value    : blNo == null ? "":blNo,
			},
			{
				property : 'hatchNo',
				value    : hatchNo == null ? "":hatchNo,
			},
			{
				property : 'modeOfOpr',
				value	: modeOfOpr == null ? "":modeOfOpr 
			}
		]);
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
	
	getSearchConditionTbl: function () {
		var me = this;
		var refs = me.getReferences();
		var vslItem = me.getViewModel().get('theVessel');
		var fwrAgent = refs.reftxtFAgent.getValue();
		var blNo = refs.refcboBL.getValue();
		var hatchNo = refs.refCboHatch.getValue();
		var modeOfOpr = refs.refcboActDelv.getValue();
		var params = {
			jpvcNo: vslItem.vslCallId,
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
					searchType: ComboboxServiceConstants.COMBO_BL_NO,
					vslCallId: record.vslCallId,
					shiftId: refs.refCboShift.getValue(),
					shiftDate: Ext.Date.format(me.WORKDATE, 'm/d/Y'),
					ptnrCd: fwrAgent,
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
		//ViewUtil.openCodePopup(this, 'app-requesterpopuphht', 'reftxtFAgent', params);
		ViewUtil.openHhtPopup(this, 'app-requesterpopuphht',  'reftxtFAgent', params);
	},
	
	onUpperCaseTextFWD: function(field, newValue){
		var me = this;
		field.setValue(newValue.toUpperCase());
		me.onChangeConditionTbl();
	},
/**
 * =========================================================================================================================
 * EVENT HANDLER END
 */

/*
 * HHT TABLET GENERAL METHOD START
 * =========================================================================================================================
 */
// Total Calculation
	calcTotalTbl: function () {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('discharging');
		store.clearFilter();
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