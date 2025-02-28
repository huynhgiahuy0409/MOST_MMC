Ext.define('MOST.view.monitoring.LoadingController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.loading',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_DATE_PERIOD: 7,	// MAX PERIOD DATE
	WORKDATE: '',
	SHFT: '',
	CONST_AMNTMODE_MT: 'MT',
	CONST_AMNTMODE_M3: 'M3',
	CONST_AMNTMODE_QTY: 'QtY',
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
		//m var comboStore = me.getStore('loadingCombo');
		var oprStore = me.getStore('loadingOprCombo');
		var hatchNoStore = me.getStore('loadingHatchNoCombo');
		var shiftStore = me.getStore('loadingShiftCombo');		
	
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
						
//						me.setDateInDays('ctlLoadedFromDt');
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
    	var store = me.getStore('loading');
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
    	var store = me.getStore('loading');
    	store.clearFilter();
    	var calcItem = Ext.create('MOST.model.monitoring.Loading');
    	var docMtTotal = 0;
    	var docM3Total = 0;
    	var docQtyTotal = 0;
    	var actMtTotal = 0;
    	var actM3Total = 0;
    	var actQtyTotal = 0;
    	var compareMode = refs.ctlCompareCombo.getValue();
    	
		var tempDocNo = '';
		store.each(function (record) {
			if(record.get('snNo') !== tempDocNo){
				docMtTotal += parseFloat(record.get('wgt'));
				docM3Total += parseFloat(record.get('msrmt'));
				docQtyTotal += parseFloat(record.get('pkgQty'));
				
				tempBL = record.get('snNo');
			}
		});

		store.each(function(record){
    		actMtTotal += parseFloat(record.get('totInWgt'));
    		actM3Total += parseFloat(record.get('totInMsrmt'));
    		actQtyTotal += parseFloat(record.get('totInPkgQty'));
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
			} else {
				me.getViewModel().setData({theVsl:null});
				me.searchSnList(null);
			}
		}
		if(targetControl === 'reftxtFAgent'){ // Add for HHT
			if(returnValue){
				refs.reftxtFAgent.setValue(returnValue.code);
			}
		}
	},
	
	// Search Sn List
	searchSnList:function(record){
		var me = this;
		var store = me.getStore('loadingSnNoCombo');
		
		if(record){
			store.load({
				params: {
					searchType : 'ShippingNoteNoList',
					vslCallId : record.get('vslCallId')
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

// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var vslItem = me.getViewModel().get('theVsl');
     	var jpvcNo = me.lookupReference('ctlLoadingJpvc').getValue();
     	var fwrAgent = me.lookupReference('ctlLoadingFwrAgent').getValue();
     	var snNo = me.lookupReference('ctlLoadingSnNoCombo').getValue();
     	var shift = me.lookupReference('ctlLoadingShiftCombo').getValue();
     	var grNo = me.lookupReference('ctlLoadingGr').getValue();
     	var lorryNo = me.lookupReference('ctlLoadingLorryNo').getValue();
     	var hatchNo = me.lookupReference('ctlLoadingHatchCombo').getValue();
     	var modeOfOpr = me.lookupReference('ctlLoadingDeliveryModeCombo').getValue();
    	var dateCondition = me.checkPeriodDate('ctlLoadedFromDt', 'ctlLoadedToDt', me.MAX_DATE_PERIOD, false);
		
    	if(dateCondition == null){
    		return null;
    	}
    	
    	if((dateCondition.isEmpty || StringUtil.isNullorEmpty(shift)) &&
    	   StringUtil.isNullorEmpty(jpvcNo)){
    		MessageUtil.warning('warning_msg', 'loading_search_condition_msg');
    		return null;
    	}
    	
    	var params = {
    			jpvcNo : jpvcNo,
    			fwrAgent : fwrAgent,
    			snNo : snNo,
    			shift : shift,
    			grNo : grNo,
    			lorryNo : lorryNo,
    			hatchNo : hatchNo,
    			modeOfOpr : modeOfOpr
		};
    	
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
		//var comboStore = me.getStore('loadingCombo');
		var oprStore = me.getStore('loadingOprCombo');
		var hatchNoStore = me.getStore('loadingHatchNoCombo');
	//	var shiftStore = me.getStore('loadingShiftCombo');
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
//		comboStore.load({
//			callback: function (records, operation, success) {
//				if (success) {
//					if (records != null && records.length > 0) {
//						oprStore.setData(records[0].get('oprList'));
//						oprStore.insert(0, [{ tsptTpCdNm: 'All', tsptTpCd: '' }]);
//
//						shiftStore.setData(records[0].get('shiftList'));
//						shiftStore.insert(0, [{ shftNm: 'All', shftId: '' }]);
//
//						/*hatchNoStore.setData(records[0].get('hatchNoList'));
//						hatchNoStore.insert(0, [{ scdNm: 'All', scd: '' }]);*/
//						refs.refWorkDate.setValue(me.WORKDATE);
//						refs.refCboShift.setValue(me.SHFT);
//						me.searchSnListTbl(vslItem);
//						me.onSearchTbl();
//					}
//				}
//			}
//		});
		
		
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
		/*shiftStore.load({			
			callback: function(records, operation, success) {
				if (success) {
					shiftStore.insert(0, [{shftNm: 'All',shftId: ''}]);
				}
			}
		});*/
		
		
		refs.refWorkDate.setValue(me.WORKDATE);
		refs.refCboShift.setValue(me.SHFT);
		me.searchSnListTbl(vslItem);
		me.onSearchTbl();
		
	},
/**
 * INITIALIZE 	END
 * =========================================================================================================================
 */
/**
 * =========================================================================================================================
 * EVENT HANDLER START
 */
	hatchNoMap:  new Map(),
	onSearchTbl: function () {
		var me = this;
		var store = me.getStore('loading');
		store.clearFilter();
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
						refs.ctlCompareCombo.setValue('MT');
					}*/
					//Enhance:
					var snNoArr = store.collect('shipgNoteNo');
					me.hatchNoMap.clear();
					snNoArr.forEach(function(snNo){
						var hatchNoSet = new Set();
						store.filter('shipgNoteNo',snNo); 
						var hatchNoArr = store.collect('hatchNo');
						me.hatchNoMap.set(snNo, hatchNoArr);
						store.clearFilter();
					})
					
					me.displayHatch();
					me.calcTotal(); // Just caculate Amount base on one BL or all BL
					me.doFilterResult(); // Filter resulte/
					me.setFWDValue();
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
		var refs = me.getReferences();
		refs.refCboHatch.clearValue ();
		me.onSearchTbl();
	},
	
	onChangeConditionTbl: function(){
		var me = this;
		me.doFilterResult();
	},
	
	//Enhance:
	doFilterResult: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('loading');
		store.clearFilter();
		var fwrAgent = refs.reftxtFAgent.getValue();
		var snNo = refs.refcboSN.getValue();
		var hatchNo = refs.refCboHatch.getValue();
		
		store.filter([
			{
				property : 'fwrAgnt',
				value 	: fwrAgent == null ? "":fwrAgent
			},
			{
				property : 'shipgNoteNo',
				value    : snNo == null ? "":snNo,
			},
			{
				property : 'hatchNo',
				value    : hatchNo == null ? "":hatchNo,
			}
		]);
	},
	
	displayHatch: function(){
		var me = this;
		var refs = me.getReferences();
		var hatchNoStore = me.getStore('loadingHatchNoCombo');
		hatchNoStore.removeAll();
		var snNo = refs.refcboSN.getValue();
		if(snNo){
			if(!me.hatchNoMap.get(snNo)){
				return;
			}
			var tempArr = me.hatchNoMap.get(snNo);
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
		var loadingStore = me.getStore('loading');
		if(!refs.refcboSN.getValue()){
			refs.reftxtFAgent.clearValue();
			return;
		}
		if(loadingStore.data.items[0]){
			refs.reftxtFAgent.setValue( loadingStore.data.items[0].get('fwrAgnt'));
		}
	},
	
	getSearchConditionTbl: function () {
		var me = this;
		var refs = me.getReferences();
		var vslItem = me.getViewModel().get('theVessel');
		var fwrAgent = refs.reftxtFAgent.getValue();
		var snNo = refs.refcboSN.getValue();
		var hatchNo = refs.refCboHatch.getValue();
		var params = {
			jpvcNo: vslItem.vslCallId,
			fwrAgent: fwrAgent,
			snNo: snNo,
			shift: refs.refCboShift.getValue(),
			shiftFromDt: Ext.Date.format(me.WORKDATE, 'd/m/Y'),
			shiftToDt: Ext.Date.format(me.WORKDATE, 'd/m/Y'),
			hatchNo: hatchNo,
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
					//m searchType: 'SNNoTbl',
					searchType: ComboboxServiceConstants.COMBO_SN_NO,
					vslCallId: record.vslCallId,
					shift: refs.refCboShift.getValue(),
					shiftFromDt: Ext.Date.format(me.WORKDATE, 'd/m/Y'),
					shiftToDt: Ext.Date.format(me.WORKDATE, 'd/m/Y'),
					ptnrCd: fwrAgent,
					hatchNo: hatchNo
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
		//ViewUtil.openCodePopup(this, 'app-requesterpopuphht', 'reftxtFAgent', params);
		ViewUtil.openHhtPopup(me, 'app-requesterpopuphht', 'reftxtFAgent', params);
	}
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