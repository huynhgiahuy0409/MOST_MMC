Ext.define('MOST.view.monitoring.HandlingInOutListController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.handlinginoutlist',

    /**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	
		MAIN_GRID_REF_NAME: 'refHandlingGrid',  // Main Grid Name 
		MAIN_STORE_NAME: 'handlingList',// Main Store Name
		COMPARE_MODE_COMBO_STORE:'compareModeComboStore',
		WAREHOUSE_TYPE_COMBO_STORE_NAME : 'warehouseTypeCombo',
		PARAMETTER_COMPARE_COMBO_STORE: 'compareModeCombo',
	
		
		FILE_UPLOAD_PGM_ID: 'CF106',

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
		var categoryCombo = me.getStore('categoryCombo');
		var searchParm = Ext.create('MOST.model.operation.SearchCargoMasterParm');

		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		me.setComboBoxWithLocalCache(CacheServiceConstants.COMPARE_COMBO, me.PARAMETTER_COMPARE_COMBO_STORE);
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		var whCombo = me.getStore('whCombo');
		var shiftCombo = me.getStore('shiftCombo');
		var cargoTpCombo = me.getStore('cargoTpCombo');
		
		cargoTpCombo.load();
		shiftCombo.load();
		
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
					whCombo.insert(0, [{locNm: 'ALL',locId: ''}]);
				}
			}
		});
		
		var warehouseTypeCombo = me.getStore(me.WAREHOUSE_TYPE_COMBO_STORE_NAME);
		warehouseTypeCombo.load();
		
		me.rgChange();
	},
	
     /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */


     /**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */

	// Date Change Event
	onDateChange:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
	},
	
	
	onSearch:function(){
		var me = this;
		var refs = me.getReferences();
		var handlingList = me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();
		
		var prevCgNo = '';
		
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
						if(refs.rdHandlingOut.checked == true){
							if(record.get('cgNo') != prevCgNo){
								me.totalDocMt += parseFloat(record.get('docMt'));
								me.totalDocM3 += parseFloat(record.get('docM3'));
								me.totalDocQty += parseFloat(record.get('docQty'));
								prevCgNo = record.get('cgNo');
							}
						}else{							
							me.totalDocMt += parseFloat(record.get('docMt'));
							me.totalDocM3 += parseFloat(record.get('docM3'));
							me.totalDocQty += parseFloat(record.get('docQty'));
						}
						
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
					
					refs.txtDocTotal.setValue(me.totalDocMt.toFixed(3));
					refs.txtActTotal.setValue(me.totalActMt.toFixed(3));
					refs.txtBalTotal.setValue(me.balanceMt.toFixed(3));
					
					refs.cboCompareMode.setValue("MT");
				}
			}
		});
	},
	
	
	
	getSearchCondition:function(){
		var me = this;
     	var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
     	var searchType;
     	var cmdtCd = refs.ctlCommodity.getValue();
     	var cnsneCd = refs.ctlCnsnee.getValue();
     	var locTpCd = refs.ctlWarehouseType.getValue();
     	
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
     	
     	var searchParm = me.getViewModel().get('theSearch');
     	var params = me.createParam(searchParm);
     	params['searchType'] = searchType;
     	params['vslCallId'] = StringUtil.toUpperCase(searchParm.data.vslCallId);
     	params['shipgNoteNo'] = SN;
     	params['mfDocId'] = refs.cboMasterBL.getValue();
     	params['blNo'] = BL;
     	params['ptnrCode'] = StringUtil.toUpperCase(searchParm.data.ptnrCode);
     	params['locId'] = StringUtil.toUpperCase(searchParm.data.locId);
     	params['lotNo'] = StringUtil.toUpperCase(searchParm.data.lotNo);
     	params['fromDate'] = fromDate;
     	params['toDate'] = toDate;
     	
     	params['catgCd'] = StringUtil.toUpperCase(searchParm.data.catgCd);
     	params['fwrAgnt'] = StringUtil.toUpperCase(searchParm.data.fwrAgnt);
     	params['shftId'] = StringUtil.toUpperCase(searchParm.data.shftId);
     	params['cmdtCd'] = cmdtCd;
		params['cnsneCd'] = cnsneCd;
		params['locTpCd'] = locTpCd;
		params['cargoTp'] = searchParm.data.cargoTp;
		params['unitNo'] = searchParm.data.unitNo;
     	params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
     	
    	return params;
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue, me, parent){
		var me = this;
		var refs = me.getReferences();
		var shippingNoteListCombo = me.getStore('shippingNoteListCombo');
		var blListCombo = me.getStore('blListCombo');
		var grListCombo = me.getStore('grListCombo');
		var listCombo = me.getStore('listCombo');
		var blcombo = me.getStore('BLNoList');
		var masterBlCombo = me.getStore('masterBlCombo');
		
		if(targetControl === 'txtVslCallId'){			
			var ptnrCd;
			
			if(returnValue != null){
				refs.ctlLoadedFromDt.setValue('');
				refs.ctlLoadedToDt.setValue('');
			}
			
			if(StringUtil.isNullorEmpty(MOST.config.Token.getPtnrCode())){
				ptnrCd = '';
			}else{
				ptnrCd = MOST.config.Token.getPtnrCode();
			}
			
			masterBlCombo.load({
				params:{
					ptnrCd: ptnrCd,
					vslCallId: refs.txtVslCallId.getValue().toUpperCase()
				}
			});
			
			blcombo.load({
				params:{
					ptnrCd: ptnrCd,
					vslCallId: refs.txtVslCallId.getValue().toUpperCase()
				}
			});
			
			if(returnValue != null){
				listCombo.load({
					params:{
						ptnrCd: ptnrCd,
						vslCallId: refs.txtVslCallId.getValue().toUpperCase()
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
	
	onSelectMasterBl: function(){
		var me = this;
		var refs = me.getReferences();
		var blCombo = me.getStore('BLNoList');
		
		blCombo.removeAll();
		refs.cboBL.setValue('');
		blCombo.load({
			params:{
				vslCallId: refs.txtVslCallId.getValue(),
				mfDocNo: refs.cboMasterBL.getValue()
			}
		});
	},
	
	rgChange:function(){
		var me = this;
		var refs = me.getReferences();
		
		var rd = refs.refRdGrpHandlingInOut.getValue().rdgInOut;
		
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var blListCombo = me.getStore('blListCombo');
		var shippingNoteListCombo = me.getStore('shippingNoteListCombo');
		var listCombo = me.getStore('listCombo');
		var handlingList= me.getStore(me.MAIN_STORE_NAME);
		
		refs.cboBL.setDisabled(false);
		refs.cboBL.setValue('');
		refs.cboSN.setValue('');
		
		handlingList.removeAll();
		
		blListCombo.clearData();
		shippingNoteListCombo.clearData();
		
		if(rd === 'IN'){
			refs.refColHdlInDt.setHidden(false);
			refs.refLoadTime.setHidden(false);
			refs.refDisTime.setHidden(true);
			refs.refColHdlOutDt.setHidden(true);
			refs.refWhStartDt.setText('Load/Delv Time');
		}else{
			refs.refColHdlInDt.setHidden(true);
			refs.refLoadTime.setHidden(true);
			refs.refDisTime.setHidden(false);
			refs.refColHdlOutDt.setHidden(false);
			refs.refWhStartDt.setText('Discharge/HI Time');
		}
		
		if(!StringUtil.isNullorEmpty(refs.txtVslCallId.getValue())){
			if(StringUtil.isNullorEmpty(MOST.config.Token.getPtnrCode())){
				ptnrCd = '';
			}else{
				ptnrCd = MOST.config.Token.getPtnrCode();
			}
			
			listCombo.load({
				params:{
					ptnrCd: ptnrCd,
					vslCallId: refs.txtVslCallId.getValue().toUpperCase()
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
			case 'Mt':
				refs.txtDocTotal.setValue(me.totalDocMt);
				refs.txtActTotal.setValue(me.totalActMt);
				refs.txtBalTotal.setValue(me.balanceMt);
				break;
			case 'M3':
				refs.txtDocTotal.setValue(me.totalDocM3);
				refs.txtActTotal.setValue(me.totalActM3);
				refs.txtBalTotal.setValue(me.balanceM3);
				break;
			case 'Qty':
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
		
		refs.txtDocTotal.setValue(me.totalDocMt.toFixed(3));
		refs.txtActTotal.setValue(me.totalActMt.toFixed(3));
		refs.txtBalTotal.setValue(me.balanceMt.toFixed(3));
		
		refs.cboCompareMode.setValue("MT");
	},
	
	
	onDblClick: function(){
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
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

        var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
        grid.saveDocumentAs(cfg);
    },
    
    onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var refs = me.getReferences();
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.startDt = searchBizParm.fromDate;
		searchBizParm.endDt = searchBizParm.toDate;
		
		if(refs.rdHandlingIn.checked == true){
			searchBizParm.classID = 'com.tsb.most.biz.parm.operation.SearchCargoHandlingInParm';
			searchBizParm.serviceID = 'MOST.handlingInOutList.selectCargoHIList'
		}
		if(refs.rdHandlingOut.checked == true){
			searchBizParm.classID = 'com.tsb.most.biz.parm.operation.SearchCargoHandlingOutParm';
			searchBizParm.serviceID = 'MOST.handlingInOutList.selectCargoHOList'
		}

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
    
	onClearSorters: function(btn) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		
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
					whCombo.insert(0, [{locNm: 'ALL',locId: ''}]);
				}
			}
		});
		var shiftListStore = me.getStore('shiftList'); 
		shiftListStore.load({
			callback: function(records, operation, success) {
				if (success) {
					me.setWorkingDateShift();
					me.setTimeWithShiftHHT();
				}
			}
		});
	},
	onSearchHHT:function(){
		var me = this;
		var refs = me.getReferences();
		var handlingList = me.getStore(me.MAIN_STORE_NAME);
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
	
	 /**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */
	
    /**
	 * GENERAL METHOD START
	 * =========================================================================================================================
	 */
	getSearchConditionHHT:function(){
		var me = this;
     	var refs = me.getReferences();
     	var searchType;
     	if(refs.refRdHandlingIn.getChecked()){
     		searchType = 'HI'
     	}else {
     		searchType = 'HO'
     	}
		var globalJpvcNo = me.getViewModel().get('globalJpvcNo');
		if(!globalJpvcNo)
		{
			globalJpvcNo = 'NonCallId'
		}
     	var fromDate =refs.refStartTime.getValue();
     	var toDate = refs.refEndTime.getValue();
    	var params = {
    		searchType : searchType,
    		vslCallId : globalJpvcNo,
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
	
	onDblClick: function(){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME); 
		var refs = me.getReferences();
		var selection = refs.refHandlingGrid.getSelection() == null ? null : refs.refHandlingGrid.getSelection()[0];
		
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
				grNo: me.getViewModel().get('theDetail').get('grNo'),
				vslCallId: me.getViewModel().get('theDetail').get('vslCallId')
			}
		});
	},
	/* 
	 * HHT TABLET END 
	 * ===============================================================
	 * */

     /**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});