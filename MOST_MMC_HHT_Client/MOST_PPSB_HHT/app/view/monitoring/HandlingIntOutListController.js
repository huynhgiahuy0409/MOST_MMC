Ext.define('MOST.view.controller.HandlingInOutListController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.handlinginoutlist',
	MAX_DATE_PERIOD:30,
	MAX_DATE_ALLOW:9999,
	totalDocMt: 0,
	totalDocM3:0,
	totalDocQty:0,
	totalActMt: 0,
	totalActM3: 0,
	totalActQty: 0,
	balanceMt: 0,
	balanceM3: 0,
	balanceQty: 0,
	
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var categoryCombo = me.getStore('categoryCombo');
		var whCombo = me.getStore('whCombo');
		var shiftCombo = me.getStore('shiftCombo');
		shiftCombo.load();
		
		me.setDateInDays("ctlLoadedFromDt", -me.MAX_DATE_PERIOD);
		
		categoryCombo.load({
			callback: function(records, operation, success) {
				if (success) {
					categoryCombo.insert(0, [{scdNm: 'ALL',scd: ''}]);
				}
			}
		});
		whCombo.load({
			callback: function(records, operation, success) {
				if (success) {
					whCombo.insert(0, [{scdNm: 'ALL',scd: ''}]);
				}
			}
		});
		
		me.rgChange();
	},
	
	// Date Change Event
	onDateChange:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		
//		if(control == refs.ctlLoadedFromDt){
//			me.setDateInDaysByDate('ctlLoadedToDt', me.MAX_DATE_PERIOD, control.getValue());
//		} else {
//			me.setDateInDaysByDate('ctlLoadedFromDt', -me.MAX_DATE_PERIOD, control.getValue());
//		}
	},
	
	
	onSearch:function(){
		var me = this;
		var refs = me.getReferences();
		var handlingList = me.getStore('handlingList');
		var params = me.getSearchCondition();
		
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
		
		handlingList.load({
			params: params,
			callback:function(records,success){
				if(success){
					records.forEach(function(record, index, array){
						me.totalDocMt += parseFloat(record.get('docMt'));
						me.totalDocM3 += parseFloat(record.get('docM3'));
						me.totalDocQty += parseFloat(record.get('docQty'));
						
						me.totalActMt += parseFloat(record.get('wgt'));
						me.totalActM3 += parseFloat(record.get('msrmt'));
						me.totalActQty += parseFloat(record.get('pkgQty'));
						
					})
					
					if(refs.cboBL.store.data.length <= 0){
						refs.cboBL.setDisabled(true);
					}
					else{
						refs.cboBL.setDisabled(false);
					}
				
					me.balanceMt = me.totalDocMt - me.totalActMt;
					me.balanceM3 = me.totalDocM3 - me.totalActM3;
					me.balanceQty = me.totalDocQty - me.totalActQty;
					
					refs.txtDocTotal.setValue(me.totalDocMt);
					refs.txtActTotal.setValue(me.totalActMt);
					refs.txtBalTotal.setValue(me.balanceMt);
					
					refs.cboCompareMode.setValue("MT");
				}
			}
		});
	},
	
	
	
	getSearchCondition:function(){
		var me = this;
     	var refs = me.getReferences();
     	
     	var searchType;
     	
     	if(refs.rdHandlingIn.getValue() == true){
     		searchType = 'HI'
     	}else if(refs.rdHandlingOut.getValue() == true){
     		searchType = 'HO'
     	}
     	
     	var fromDate = Ext.Date.format(refs.ctlLoadedFromDt.getValue(), MOST.config.Locale.getShortDate());
     	var toDate = Ext.Date.format(refs.ctlLoadedToDt.getValue(), MOST.config.Locale.getShortDate());
     	var cgNo=refs.cboBL.getValue();
     	var SN = refs.cboSN.getValue();
     	var BL = refs.cboBL.getValue();
     	if(SN === 'SELECTED') SN = '';
     	if(BL === 'SELECTED') BL = '';
    	
     	var params = {
    		searchType : searchType,
    		vslCallId : refs.txtJpvc.getValue(),
    		shipgNoteNo: SN,
    		ptnrCode: refs.ctlFwdAgent.getValue(),
    		fromDate: fromDate,
    		toDate: toDate,
    		blNo: BL,
    		locId: refs.cboWH.getValue(),
    		catgCd: refs.cboCategory.getValue(),
    		fwrAgnt: refs.ctlFwdAgent.getValue(),
    		shftId: refs.cboShift.getValue()
		};
    	
    	return params;
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue, me, parent){
		var me = this;
		var refs = me.getReferences();
		var shippingNoteListCombo = me.getStore('shippingNoteListCombo');
		var blListCombo = me.getStore('blListCombo');
		var grListCombo = me.getStore('grListCombo');
		var listCombo = me.getStore('listCombo');
		
		if(targetControl === 'txtJpvc'){
			
			var ptnrCd;
			
			if(returnValue != null){
				refs.ctlLoadedFromDt.setValue('');
				refs.ctlLoadedToDt.setValue('');
			}else{
				//me.setDateInDays("ctlLoadedFromDt", -me.MAX_DATE_ALLOW);
				//me.setDateInDays("ctlLoadedToDt");
			}
			
			if(StringUtil.isNullorEmpty(MOST.config.Token.getPtnrCode())){
				ptnrCd = '';
			}else{
				ptnrCd = MOST.config.Token.getPtnrCode();
			}
			
			if(returnValue != null){
				listCombo.load({
					params:{
						ptnrCd: ptnrCd,
						vslCallId: refs.txtJpvc.getValue().toUpperCase()
					},
					callback:function(records,success){
						if(success){
							shippingNoteListCombo.setData(records[0].get('shipgNoteCombo'));
							if(shippingNoteListCombo.data.length > 0){
								shippingNoteListCombo.insert(0, [{
									shipgNoteNo: 'SELECTED'
								}]);
								refs.cboSN.setValue('SELECTED');
							}else{
								refs.cboSN.setValue('');
							}
								
							blListCombo.setData(records[0].get('blCombo'));
							if(blListCombo.data.length > 0){
								blListCombo.insert(0, [{
									blNo: 'SELECTED'
								}]);
								refs.cboBL.setValue('SELECTED');
							}else{
								refs.cboBL.setValue('');
							}
								
							shippingNoteListCombo.commitChanges();
							blListCombo.commitChanges();
						}
					}
				})
			}
			
		}

	},
	
	rgChange:function(){
		var me = this;
		var refs = me.getReferences();
		
		var rd = refs.refRdGrpHandlingInOut.getValue().rdgInOut;
		
		var grid = me.lookupReference('refHandlingGrid');
		var blListCombo = me.getStore('blListCombo');
		var shippingNoteListCombo = me.getStore('shippingNoteListCombo');
		var listCombo = me.getStore('listCombo');
		var handlingList= me.getStore('handlingList');
		
		refs.cboBL.setDisabled(false);
		refs.cboBL.setValue('');
		refs.cboSN.setValue('');
		
		handlingList.clearData();
		
		blListCombo.clearData();
		shippingNoteListCombo.clearData();
		
		if(rd === 'IN'){
			refs.refColHdlInDt.setHidden(false);
			refs.refColHdlOutDt.setHidden(true);
			refs.refWhStartDt.setText('Load/Delv Time');
		}else{
			refs.refColHdlInDt.setHidden(true);
			refs.refColHdlOutDt.setHidden(false);
			refs.refWhStartDt.setText('Discharge/HI Time');
		}
		
		if(!StringUtil.isNullorEmpty(refs.txtJpvc.getValue())){
			if(StringUtil.isNullorEmpty(MOST.config.Token.getPtnrCode())){
				ptnrCd = '';
			}else{
				ptnrCd = MOST.config.Token.getPtnrCode();
			}
			
			listCombo.load({
				params:{
					ptnrCd: ptnrCd,
					vslCallId: refs.txtJpvc.getValue().toUpperCase()
				},
				callback:function(records,success){
					if(success){
						shippingNoteListCombo.setData(records[0].get('shipgNoteCombo'));
						if(shippingNoteListCombo.data.length > 0){
							shippingNoteListCombo.insert(0, [{
								shipgNoteNo: 'SELECTED'
							}]);
							refs.cboSN.setValue('SELECTED');
						}else{
							refs.cboSN.setValue('');
						}
							
						blListCombo.setData(records[0].get('blCombo'));
						if(blListCombo.data.length > 0){
							blListCombo.insert(0, [{
								blNo: 'SELECTED'
							}]);
							refs.cboBL.setValue('SELECTED');
						}else{
							refs.cboBL.setValue('');
						}
							
						shippingNoteListCombo.commitChanges();
						blListCombo.commitChanges();
					}
				}
			});
		}
		
		
	},
	
	onCboCompareModeSelect:function(ele, rec, idx){
		var me = this;
		var refs = me.getReferences();
		
		switch(rec.get('scd')){
			case 'MT':
				refs.txtDocTotal.setValue(me.totalDocMt);
				refs.txtActTotal.setValue(me.totalActMt);
				refs.txtBalTotal.setValue(me.balanceMt);
				break;
			case 'M3':
				refs.txtDocTotal.setValue(me.totalDocM3);
				refs.txtActTotal.setValue(me.totalActM3);
				refs.txtBalTotal.setValue(me.balanceM3);
				break;
			case 'QTY':
				refs.txtDocTotal.setValue(me.totalDocQty);
				refs.txtActTotal.setValue(me.totalActQty);
				refs.txtBalTotal.setValue(me.balanceQty);
				break;
		}
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
		
		me.totalDocMt = parseFloat(record.get('docMt'));
		me.totalDocM3 = parseFloat(record.get('docM3'));
		me.totalDocQty = parseFloat(record.get('docQty'));
		
		me.totalActMt = parseFloat(record.get('wgt'));
		me.totalActM3 = parseFloat(record.get('msrmt'));
		me.totalActQty = parseFloat(record.get('pkgQty'));
		
		me.balanceMt = me.totalDocMt - me.totalActMt;
		me.balanceM3 = me.totalDocM3 - me.totalActM3;
		me.balanceQty = me.totalDocQty - me.totalActQty;
		
		refs.txtDocTotal.setValue(me.totalDocMt);
		refs.txtActTotal.setValue(me.totalActMt);
		refs.txtBalTotal.setValue(me.balanceMt);
		
		refs.cboCompareMode.setValue("MT");
	},
	
	
	onDblClick: function(){
		var me = this;
		var grid = me.lookupReference('refHandlingGrid');
		var refs = me.getReferences();
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		if(refs.rdHandlingIn.getValue() == true){
//			selection.set('viewType', 'HIOLIST');
			me.getView().detailViewAlias = 'app-jobmonitoring';
			me.openDetailPopup(selection);
		}
		
		/*var purposeCombo = me.getStore('purposeCombo');
		if(purposeCombo.loadCount() <= 0){
			purposeCombo.load();
		}*/
		
	},
	
	exportTo: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
    	
        var cfg = Ext.merge({
            title: 'Handling In/Out',
            fileName: 'HandlingInOut' + '.' + (btn.cfg.ext || btn.cfg.type)
        }, btn.cfg);

        var grid = refs.refHandlingGrid;
        grid.saveDocumentAs(cfg);
    },
    
	onClearSorters: function(btn) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('handlingList');
		
		//Clear Sorters
		store.sorters.clear();
		refs.refHandlingGrid.getView().refresh(); 
	},
	
	/**
	 * =========================================================================================================================
	 * DETAIL END
	 */
	
	/*
	 * HHT TABLET START 
	 * ===============================================================
	 * */

	onLoadHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var categoryCombo = me.getStore('categoryCombo');
		var whCombo = me.getStore('whCombo');
		categoryCombo.load({
			callback: function(records, operation, success) {
				if (success) {
					categoryCombo.insert(0, [{scdNm: 'ALL',scd: ''}]);
				}
			}
		});
		whCombo.load({
			callback: function(records, operation, success) {
				if (success) {
					whCombo.insert(0, [{scdNm: 'ALL',scd: ''}]);
				}
			}
		});
		// var shiftListStore = me.getStore('shiftList'); 
		// shiftListStore.load({
		// 	callback: function(records, operation, success) {
		// 		if (success) {
		// 			me.setWorkingDateShift();
		// 			me.setTimeWithShiftHHT();
		// 		}
		// 	}
		// });
	},
	onSearchHHT:function(){
		var me = this;
		var refs = me.getReferences();
		var handlingList = me.getStore('handlingList');
		var params = me.getSearchConditionHHT();
		handlingList.load({
			params: params,
			callback:function(records,success){
				if(success){
					records.forEach(function(record, index, array){
						
					})
				}
			}
		});
	},
	
	
	
	getSearchConditionHHT:function(){
		var me = this;
     	var refs = me.getReferences();
     	var searchType;
     	if(refs.refRdHandlingIn.getChecked()){
     		searchType = 'HI'
     	}else {
     		searchType = 'HO'
     	}
		var globalVslCallId = me.getViewModel().get('globalVesselCallId');
		if(!globalVslCallId)
		{
			globalVslCallId = 'NonCallId'
		}
     	var fromDate =refs.refStartTime.getValue();
     	var toDate = refs.refEndTime.getValue();
    	var params = {
    		searchType : searchType,
    		vslCallId : globalVslCallId,
    		fromDate: fromDate,
    		toDate: toDate,
    		locId: refs.refCboWH.getValue(),
    		catgCd: refs.refCboCategory.getValue(),
		};
    	
    	return params;
	},
	setTimeWithShiftHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var refStartTime = refs.refStartTime;
		var refEndTime = refs.refEndTime;

		var shift = refs.refCboShift.getSelection();
		var strWKDate = refs.refWorkDate.getDate();
		var strStartDt = strWKDate + ' ' + shift.get('fmHhmm').substr(0, 2) + ':' + shift.get('fmHhmm').substr(2, 4);
		var strEndDt = strWKDate + ' ' + shift.get('toHhmm').substr(0, 2) + ':' + shift.get('toHhmm').substr(2, 4);

		if(shift.get('shftId') === 'SF0013'){
			var temp = Ext.Date.parse(strEndDt, 'd/m/Y H:i');
			var endShftDTime = new Date(temp.getTime() + (24 * 60 * 60 * 1000));
			strEndDt = Ext.Date.format(endShftDTime, 'd/m/Y H:i');
		}
        refStartTime.setValue(strStartDt);
		refEndTime.setValue(strEndDt);
	},
	setWorkingDateShift: function(){ //Load and set Shift Working
		var me = this;
		var refs = me.getReferences();
		var workDate =  MOST.config.Token.getWorkDate();
		var workShift =  MOST.config.Token.getWorkShift();
		glbJPVC = me.getViewModel().get('globalJpvcNo');
		refs.refWorkDate.setValue(Ext.Date.format(workDate,MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		refs.refCboShift.setValue(workShift);
	},
	/* 
	 * HHT TABLET END 
	 * ===============================================================
	 * */
});