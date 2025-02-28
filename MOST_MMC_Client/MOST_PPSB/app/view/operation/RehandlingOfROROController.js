Ext.define('MOST.view.operation.RehandlingOfROROController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.rehandlingofroro',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refCargoGrid',
	MAIN_STORE_NAME: 'cargoItems',
	cgItem:null,
	cgIndex:0,
	recvItem: null,
	cudFlag: "",
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
		
		var searchParm = Ext.create('MOST.model.operation.SearchRehandlingOfROROParm');
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		
		me.setDateInDays("ctlYardInFromDt", -30);
		me.setDateInDays("ctlYardInToDt");
		
		var categoryCombo = me.getStore('categoryCombo');
		categoryCombo.load();
		
		var rehandlingModeCombo = me.getStore('rehandlingModeCombo');
		rehandlingModeCombo.load();
	},
	
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onSearch_clickHandler: function() {
		var me = this;
		var refs = me.getReferences();
     	
		me.onSearch();
	},
	
	// Search Event Handler
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore(me.MAIN_STORE_NAME);
    	var cgGrid = me.lookupReference(me.MAIN_GRID_REF_NAME);
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
					else {
						cgGrid.getSelectionModel().select(me.cgIndex);
						me.onCargoGridItemClick();
					}
				}
			}
		});
	},
	
	onCargoGridItemClick:function(){
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		
		//get the Unit list base on cargo
		me.getRehandlingItems(selection);
		me.cgItem = selection;
		me.cgIndex = grid.store.indexOf(selection);
	},
	
	onRehandlingGridItemClick: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refRehandlingOfROROGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		
		//allow delete
		
	},
	
	onRehandlingGridItem_DblClick: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refRehandlingOfROROGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) return;
		
		selection.set('vslCallId', me.cgItem.get('vslCallId'));
		selection.set('docNo', me.cgItem.get('docNo'));
		selection.set('cargoNo', me.cgItem.get('cargoNo'));
		selection.set('ixCd', me.cgItem.get('ixCd'));
		
		selection.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
		me.getView().detailViewAlias = 'app-rehandlingofrorodetail';
		me.openDetailPopup(selection);
		
	},

	onAdd_clickHandler: function (){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(selection == null) {
			MessageUtil.warning("warning_msg", "rehandle_roro_no_select_msg");
			return;
		} 
		
		selection.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.INSERT));
		me.getView().detailViewAlias = 'app-rehandlingofrorodetail';
		me.openDetailPopup(selection);
	},

	onRemove_clickHandler: function (){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('rehandlingItems');
		var grid = me.lookupReference('refRehandlingOfROROGrid');
		var cudItem = grid.getSelection() == null ? null : grid.getSelection()[0];
		if(cudItem == null) return;
		
		cudItem.set('vslCallId', me.cgItem.get('vslCallId'));
		cudItem.set('cargoNo', me.cgItem.get('cargoNo'));
		cudItem.set('docNo', me.cgItem.get('docNo'));
		
		MessageUtil.question('remove', 'infodelete_msg', null, function(button) {
			if (button === 'ok') {
				me.deleteProcess(cudItem);
			}
		});
	},
	
	deleteProcess: function (cudItem){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('rehandlingItems');
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = false;
		updateParm.drop();
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
		updateParm.set('items', new Array());
		
		cudItem.set('userId', Token.getUserId());
		cudItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
		
		updateParm.get('items').push(cudItem.data);
		updateParm.save({
			success : function(record, operation) {
				store.commitChanges();
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
						function(button){
						if (button === 'ok') {
					       me.onSearch();
						}
					});
			}
		});
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		searchBizParm.classID = 'com.tsb.most.biz.parm.controller.SearchRehandlingOfROROParm';
		searchBizParm.serviceID = 'MOST.rehandlingOfRORO.selectRehandlingItemList'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
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
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');

		if(searchParm){
			var yardDateCondition = me.validateFromToDate("ctlYardInFromDt", "ctlYardInToDt");
			var estDateCondition = me.validateFromToDate("ctlEstArrvFromDt", "ctlEstArrvToDt");
 			
			var params = me.createParam(searchParm);
			params['pageNo'] = pageNo;
			params['sizePerPage'] = sizePerPage;
			params['sort'] = grid.getSortString();
			
			params['vslCallId'] = StringUtil.toUpperCase(searchParm.data.vslCallId);
			params['blNo'] = StringUtil.toUpperCase(searchParm.data.blNo);
			params['shipgNoteNo'] = StringUtil.toUpperCase(searchParm.data.shipgNoteNo);
			
			params['nextVslCallId'] = StringUtil.toUpperCase(searchParm.data.nextVslCallId);
			params['nextShipgNoteNo'] = StringUtil.toUpperCase(searchParm.data.nextShipgNoteNo);
			
			params['catgCd'] = StringUtil.toUpperCase(searchParm.data.catgCd);
			params['rhdlModeCd'] = StringUtil.toUpperCase(searchParm.data.rhdlModeCd);
			params['unitNo'] = StringUtil.toUpperCase(searchParm.data.unitNo);
			
			if(yardDateCondition){
				params['yardInDateFrom'] = Ext.Date.format(refs.ctlYardInFromDt.getValue(), MOST.config.Locale.getShortDate());
				params['yardInDateTo'] = Ext.Date.format(refs.ctlYardInToDt.getValue(), MOST.config.Locale.getShortDate());
			}
			else {
				refs.ctlYardInFromDt.setValue();
				refs.ctlYardInToDt.setValue();
				return null;
			}
			
			params['estArrvDateFrom'] = Ext.Date.format(refs.ctlEstArrvFromDt.getValue(), MOST.config.Locale.getShortDate());
			params['estArrvDateTo'] = Ext.Date.format(refs.ctlEstArrvToDt.getValue(), MOST.config.Locale.getShortDate());
				
			return params;
		}
		
    	return null;   	
	},
	
	getOrgDocumentComboItems: function(){
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('theVslInfo');
		var masterCombo = me.getStore('documentCombo');
		if(theVslInfo){
			masterCombo.load({
				params : {
					vslCallId:theVslInfo.get('vslCallId'),
					searchType: 'ORIGINAL'
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if(records.length > 0){
							me.setOrgCombo(records[0]);
						}
					}
				}
			});
		}
	},
	
	getNextDocumentComboItems: function(){
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('theNextVslInfo');
		var masterCombo = me.getStore('documentCombo');
		
		if(theVslInfo){
			masterCombo.load({
				params : {
					vslCallId:theVslInfo.get('vslCallId'),
					catgCd: refs.ctlRhdlMode.getValue(),
					searchType: 'NEXTSN'
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if(records.length > 0){
							me.setNextSnCombo(records[0]);
						}
					}
				}
			});
		}
	},
	
	// Combo Setting
	setOrgCombo : function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var blCombo = me.getStore('blCombo');
		var snCombo = me.getStore('snCombo');

		blCombo.setData(masterItem.data.blItems);
		blCombo.insert(0, [{cdNm: 'Select',cd: ''}]);
		refs.ctlBlNo.setValue('');
		
		snCombo.setData(masterItem.data.snItems);
		snCombo.insert(0, [{cdNm: 'Select',cd: ''}]);
		refs.ctlSnNo.setValue('');
	},
	
	setNextSnCombo : function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var nextSnCombo = me.getStore('nextSnCombo');
		
		nextSnCombo.setData(masterItem.data.nextSnItems);
		nextSnCombo.insert(0, [{cdNm: 'Select',cd: ''}]);
		refs.ctlNextSnNo.setValue('');
	},
	
	getRehandlingItems: function(record){
		var me = this;
		var refs = me.getReferences();
		if(record){
			var store = me.getStore('rehandlingItems');
			var grid = refs.refRehandlingOfROROGrid;
			store.load({
				params : {
					vslCallId: record.get('vslCallId'),
					catgCd: record.get('catgCd'),
					cargoNo: record.get('cargoNo')
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if (records && records.length > 0) {
						}
					}
				}
			});
		}
	},
	
	// Popup After Setting
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		if(targetControl === 'ctlVslCallId'){
			if(returnValue){
				me.getViewModel().setData({theVslInfo:returnValue.item});
				me.getOrgDocumentComboItems();
			} 
			else {
				me.getViewModel().setData({theVslInfo:null});
				var blCombo = me.getStore('blCombo');
				blCombo.loadData([],false);
				refs.ctlBlNo.reset();
				
				var snCombo = me.getStore('snCombo');
				snCombo.loadData([],false);
				refs.ctlSnNo.reset();
			}
		}
		else if(targetControl === 'ctlNextVslCallId'){
			if(returnValue){
				me.getViewModel().setData({theNextVslInfo:returnValue.item});
				me.getNextDocumentComboItems();
			} 
			else {
				me.getViewModel().setData({theNextVslInfo:null});
				
				var snCombo = me.getStore('nextSnCombo');
				snCombo.loadData([],false);
				refs.ctlNextSnNo.reset();
			}
		}
		else if(targetControl === 'ctlDtlNextVslCallId'){
			if(returnValue){
				me.getViewModel().setData({theDtlNextVslInfo:returnValue.item});
//				me.getDtlNextDocumentComboItems();
			} 
			else {
				me.getViewModel().setData({theDtlNextVslInfo:null});
				
				var snCombo = me.getStore('nextDtlSnCombo');
				snCombo.loadData([],false);
				refs.ctlDtlNextSnNo.reset();
			}
		}
	},
	
	// Text Upper Case
	onUpperCase : function(control){
		control.setValue(control.getValue().toUpperCase());
	},
	
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * DETAIL START
	 */
	// Detail Load
	onDetailLoad:function(){
		var me = this;
		var refs = me.getReferences();
		
		var detailView = me.getDetailBizView();
		me.recvItem = detailView.items.get(0).recvData;
		
		if(me.recvItem){
			me.cudFlag = me.recvItem.get('workingStatus');
			me.getStackedUnitItems();
			var workingStatus = me.recvItem.get('workingStatus');
			var rehandleStore = me.getStore('rehandlingUnitItems');
			var stackedStore = me.getStore('stackedUnitItems');
			rehandleStore.removeAll();
			stackedStore.removeAll();
			
			if(workingStatus == WorkingStatus.convertInt(WorkingStatus.INSERT) || workingStatus == WorkingStatus.convertInt(WorkingStatus.UPDATE)){
				refs.refBtnConfirm.setDisabled(false);
				refs.refBtnDtlAdd.setDisabled(false);
				refs.refBtnDtlRemove.setDisabled(false);
				if(me.recvItem.get('workingStatus') == WorkingStatus.convertInt(WorkingStatus.UPDATE)){
					refs.ctlDtlRhdlMode.setValue(me.recvItem.get('rhdlModeCd'));
					refs.ctlDtlNextVslCallId.setValue(me.recvItem.get('nextVslCallId'));
					me.getDtlNextDocumentComboItems();
					me.onDtlRhdlMode_changeHandler();
					me.getRehandlingUnitItems();
					refs.refBtnConfirm.setHidden(true);
				}

			}
			else {
				refs.refBtnConfirm.setDisabled(true);
				refs.refBtnDtlAdd.setDisabled(true);
				refs.refBtnDtlRemove.setDisabled(true);
			}
		}
	},
	
	getStackedUnitItems: function(){
		var me = this;
		var refs = me.getReferences();
		
		var store = me.getStore('stackedUnitItems');
		if(me.recvItem){
			store.load({
				params : {
					vslCallId:me.recvItem.get('vslCallId'),
					ixCd: me.recvItem.get('ixCd'),
					cargoNo: me.recvItem.get('cargoNo'),
					docNo: me.recvItem.get('docNo')
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if(records.length > 0){
						
						}
					}
				}
			});
		}
		
	},
	
	getRehandlingUnitItems: function(record){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('rehandlingUnitItems'); 

		var vslCallId = me.recvItem.get('nextVslCallId');
		var rhdlNo = me.recvItem.get('rhdlNo');
		var cargoNo = me.recvItem.get('shipgNoteNo');
		var rhdlModeCd = me.recvItem.get('rhdlModeCd');
		if(record) { 
			vslCallId = StringUtil.isNullorEmpty(vslCallId) ? record.get('nextVslCallId') : vslCallId;
			rhdlNo = StringUtil.isNullorEmpty(rhdlNo) ? record.get('rhdlNo') : rhdlNo;
			cargoNo = StringUtil.isNullorEmpty(cargoNo) ? record.get('shipgNoteNo') : cargoNo;
			rhdlModeCd = StringUtil.isNullorEmpty(rhdlModeCd) ? record.get('rhdlModeCd') : rhdlModeCd;	 
		}
		if(me.recvItem){
			store.load({
				params : {
					vslCallId: vslCallId,
					rhdlNo: rhdlNo,
					cargoNo: cargoNo,
					rhdlModeCd: rhdlModeCd
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if(records.length > 0){
							me.updateDocQty();
						}
					}
				}
			});
		}
		
	},
	
	onDtlCancel_clickHandler: function (){
		var me = this;
		var window = me.getView().up('window');
       	window.close();	
	},
	
	//Get data provider of Next Sn after input vessel call id 
	getDtlNextDocumentComboItems: function(){
		var me = this;
		var refs = me.getReferences();
		var theVslInfo = me.getViewModel().get('theDtlNextVslInfo');
		var masterCombo = me.getStore('documentCombo');
		
		if(theVslInfo){
			masterCombo.load({
				params : {
					vslCallId:theVslInfo.get('vslCallId'),
					catgCd: me.recvItem.get('catgCd'),
					searchType: 'NEXTSN'
				},
				
				callback: function(records, operation, success) {
					if (success) {
						if(records.length > 0){
							me.setDtlNextSnCombo(records[0]);
						}
					}
				}
			});
		}
	},

	setDtlNextSnCombo : function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var snCombo = me.getStore('nextDtlSnCombo');
		
		snCombo.setData(masterItem.data.nextSnItems);
		snCombo.insert(0, [{cdNm: 'Select',cd: ''}]);
		refs.ctlDtlNextSnNo.setValue('');
		
		if(me.cudFlag == WorkingStatus.convertInt(WorkingStatus.UPDATE)){
			refs.ctlDtlNextSnNo.setValue(me.recvItem.get('shipgNoteNo'));
			me.onDtlNextSn_changeHandler();
		}
	},
	
	//Rehandling Mode change event
	onDtlRhdlMode_changeHandler: function(){
		var me = this;
		var refs = me.getReferences();
		if(refs.ctlDtlRhdlMode.getValue() == 'C'){
			refs.ctlDtlNextVslCallId.setEditableControl(true);
			refs.ctlDtlNextSnNo.setDisabled(false);
			refs.ctlDtlNextSnNo.setValue(me.recvItem.get('cargoNo'))
		}
		else {
			refs.ctlDtlNextVslCallId.setEditableControl(false);
			refs.ctlDtlNextSnNo.setDisabled(true);
			refs.ctlDtlNextVslCallId.setValue();
			me.getViewModel().setData({theDtlNextVslInfo:null});
			
			var snCombo = me.getStore('nextDtlSnCombo');
			snCombo.loadData([],false);
			refs.ctlDtlNextSnNo.reset();
			
			if(refs.ctlDtlRhdlMode.getValue() == 'R'){
				if(me.recvItem.get('catgCd') != 'E' && me.recvItem.get('catgCd') != 'S'){
					MessageUtil.warning("warning_msg", "msgCT246002");
					refs.ctlDtlRhdlMode.setValue();
					return;
				}
			}
		}
	},
	
	//Next SN change event
	onDtlNextSn_changeHandler: function(){
		var me = this;
		var refs = me.getReferences();
		if(!StringUtil.isNullorEmpty(refs.ctlDtlNextSnNo.getValue())){
			me.updateDocQty();
		}
		else
			refs.ctlNextSnQty.setValue();
	},
	
	onDtlAdd_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference('refStackedUnitGrid');
		var selectionArr = grid.getSelection() == null ? null : grid.getSelection();
		if(selectionArr == null) return;
		
		//1.Mandantory
		if(StringUtil.isNullorEmpty(refs.ctlDtlRhdlMode.getValue())){
			MessageUtil.warning("warning_msg", "mandatoryField_msg", ViewUtil.getLabel('rehandleRehandleMode'));
			return;
		}
		if(refs.ctlDtlRhdlMode.getValue() === 'C'){
			if(StringUtil.isNullorEmpty(refs.ctlDtlNextVslCallId.getValue())
					|| StringUtil.isNullorEmpty(refs.ctlDtlNextSnNo.getValue())){
				MessageUtil.warning("warning_msg", "msgCT246001");
				return;
			}
		}
		
		//2.Douplication check
		if(me.onDuplicatedValidation(selectionArr) && me.onMatchedInfoValidation(selectionArr)){
			if(refs.ctlDtlRhdlMode.getValue() === 'C'){
				me.onNextSnValidation(selectionArr);
			}
			else {
				me.fncSuccessToAssignVin(selectionArr);
			}
		} 
	},
	
	fncSuccessToAssignVin: function(arr){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('rehandlingUnitItems');	
		for(var i = 0; i < arr.length; i++){
			var record = Ext.create('MOST.model.operation.RehandlingOfRORO');
			//var record = me.recvItem.copy();
			record.set('vslCallId', arr[i].get('vslCallId'));
			record.set('vslCd', arr[i].get('vslCd'));
			record.set('callSeq', arr[i].get('callSeq'));
			record.set('callYear', arr[i].get('callYear'));
			record.set('docNo', arr[i].get('docNo'));
			record.set('cargoNo', arr[i].get('cargoNo'));
			record.set('catgCd', arr[i].get('catgCd'));
			record.set('catgNm', arr[i].get('catgNm'));
			record.set('unitNo', arr[i].get('unitNo'));
			record.set('brandCd', arr[i].get('brandCd'));
			record.set('brandNm', arr[i].get('brandNm'));
			record.set('unitM3', arr[i].get('unitM3'));
			record.set('unitMt', arr[i].get('unitMt'));
			record.set('ixCd', arr[i].get('ixCd'));
			record.set('rhdlModeCd', refs.ctlDtlRhdlMode.getValue());
			record.set('modelCd', arr[i].get('modelCd'));
			record.set('modelNm', arr[i].get('modelNm'));
			record.set('locId', arr[i].get('locId'));
			
			record.set('userId', Token.getUserId());
			record.set('workingStatus', WorkingStatus.INSERT);
			record.set('action', WorkingStatus.INSERT);
			
			if(refs.ctlDtlRhdlMode.getValue() === 'C'){
				record.set('shipgNoteNo',refs.ctlDtlNextSnNo.getValue());
				record.set('bookingNo',  arr[i].get('docNo'));
				record.set('nextVslCallId', refs.ctlDtlNextVslCallId.getValue());
			}
			
			if(me.cudFlag === WorkingStatus.convertInt(WorkingStatus.UPDATE)){
				record.set('rhdlNo', me.recvItem.get('rhdlNo'));
				record.set('rhdlGroupNo', me.recvItem.get('rhdlGroupNo'));
			}

			store.insert(0, record);	
		}
		me.updateDocQty();
	},
	
	onDtlRemove_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('rehandlingUnitItems');
		
		var grid = me.lookupReference('refRehandlingUnitGrid');
		var selectionArr = grid.getSelection() == null ? null : grid.getSelection();
		if(selectionArr == null) return;
		
		Ext.each(selectionArr, function (record) {
			record.set('workingStatus', WorkingStatus.DELETE);
			record.set('action', WorkingStatus.DELETE);
			if(record.get('workingStatus') == WorkingStatus.INSERT)
				store.remove(record);
		});
		me.updateDocQty();
	},
	
	onDtlConfirm_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('rehandlingUnitItems');
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.set('items', new Array());
		if(me.cudFlag === WorkingStatus.convertInt(WorkingStatus.INSERT)){
			updateParm.phantom = true;
			updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.INSERT));
			for(var i = 0; i < store.data.length; i++){
				var workingStatus = store.data.items[i].get('workingStatus');
				if(workingStatus && workingStatus == WorkingStatus.INSERT) {
					updateParm.get('items').push(store.data.items[i].data);
				} 
			}
		} 	
		updateParm.save({
			success : function(record, operation) {
				store.commitChanges();			
				refs.refBtnConfirm.setHidden(true);
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
						function(button){
						if (button === 'ok') { 
							me.getStackedUnitItems();
							me.getRehandlingUnitItems(record);
						}
					});
			}
		});
	},
	
	//Validation
	onDuplicatedValidation: function (arr){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('rehandlingUnitItems');
		
		for(var i = 0; i < arr.length; i++){
			for(var j = 0; j < store.data.length; j++){
				if(arr[i].get('unitNo') === store.data.items[j].get('unitNo')){
					MessageUtil.warning('warning_msg', 'duplicatedata_msg');
					return false;
				}
			}
		}
		return true;
	},
	
	onMatchedInfoValidation: function (arr){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('rehandlingUnitItems');
		
		if(store.data.length == 0){
			return true;
		}
		
		for(var i = 0; i < arr.length; i++){
			for(var j = 0; j < store.data.length; j++){
				if(refs.ctlDtlRhdlMode.getValue() != store.data.items[j].get('rhdlModeCd')
						|| refs.ctlDtlNextVslCallId.getValue() != store.data.items[j].get('nextVslCallId')
						|| (!StringUtil.isNullorEmpty(refs.ctlDtlNextSnNo.getValue()) && refs.ctlDtlNextSnNo.getValue() != store.data.items[j].get('shipgNoteNo'))){
					MessageUtil.warning('warning_msg', 'msgCT246005');
					return false;
				}
			}
		}
		return true;
	},
	
	onNextSnValidation: function(arr){
		var me = this;
		var refs = me.getReferences();
		
		var store = me.getStore('validationCheck');
		store.load({
			params : {
				tyCd: 'CHECK_DUPLICATED_SN_FOR_RHDL',
				col1: refs.ctlDtlNextVslCallId.getValue(),
				col2: refs.ctlDtlNextSnNo.getValue()
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(records[0].get('isValidated') == 'N'){
							MessageUtil.warning('warning_msg', 'msgCT246006');
							return false;
						}
						else {
							me.fncSuccessToAssignVin(arr);
						}
					}
				}
			}
		});
	},

	updateDocQty: function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('rehandlingUnitItems');	
		var totalItems = store.getData().length;
		var deleteItems = store.getData().items.filter(item => item.data.action == 'D').length;
		refs.ctlNextSnQty.setValue(totalItems - deleteItems);
	}
	/**
	 * =========================================================================================================================
	 * DETAIL END
	 */
});