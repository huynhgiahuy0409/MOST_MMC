Ext.define('MOST.view.operation.RehandleGCController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.rehandle',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	DETAILVIEW: 'app-rehandleoperationmodepopup',
	MAIN_GRID_REF_NAME: 'refRehandleGrid', 
	RHD_DETAIL_GRID_REF_NAME: 'refRehandleDataGrid',
	MAIN_STORE_NAME: 'rehandle',
	RHD_DETAIL_STORE_NAME: 'rehandleDetailList',
	//sMantis: 0166809
	ASSIGNED_TRUCK_STORE_NAME : 'lorryAssignmentGridList', 
	//eMantis: 0166809

	CARGO_REHANDLING_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandleGC/cargoRehandling',
	CARGO_REHANDLING_FOR_UPDATE_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandleGC/cargoRehandlingForUpdate',
	MAX_PERIOD_DAY : 90,	// MAX PERIOD DATE
	SHIPPING_AGENCY : CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY,
	FORWARDER : CONSTANTS.PTNR_TYPE_FORWARDER,
	PARAMETTER_CHECK_REHANDLE_MODE_STORE: 'rehandleModeCombo',
	isAllocationCreate: false,
	isAllocationUpdate: false,
	
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
		var comboStore = me.getStore('rehandleCombo');
		var categoryStore = me.getStore('categoryCombo');
		var rehandleModeSearchStore = me.getStore('rehandleModeSearchCombo');
		var commodityGroupCombo = me.getStore('commodityGroupCombo');
		
		if( MOST.config.Token.getUserType() === CONSTANTS.USER_TYPE_INTERNAL ||
			me.existsPatnerType(me.SHIPPING_AGENCY) ||
			me.existsPatnerType(me.FORWARDER)){
			refs.ctlRehandleModeButton.setDisabled(false);
		} else {
			refs.ctlRehandleModeButton.setDisabled(true);
		}
		
		comboStore.load({
			params:{
				searchType : 'initComboList',
				screanNm : 'RHDL'
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						categoryStore.setData(records[0].get('categoryList'));
						rehandleModeSearchStore.setData(records[0].get('rehandlingModeList'));
						commodityGroupCombo.setData(records[0].get('commodityGroupList'));
						
						categoryStore.insert(0, [{scdNm: 'Select', scd: ''}]);
						rehandleModeSearchStore.insert(0, [{scdNm: 'Select', scd: ''}]);
						commodityGroupCombo.insert(0, [{scdNm: 'All', scd: ''}]);
					}
				}
			}
		});
		
		me.setDateInDays('ctlEstArrToDt');
		me.setDateInDays('ctlEstArrFromDt', -me.MAX_PERIOD_DAY);
		var searchParm = Ext.create('MOST.model.operation.SearchRehandlingParm');
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		var theSearch = me.getViewModel().get('theSearch');
		theSearch.set('yardInDateFrom', me.lookupReference('ctlEstArrFromDt').getValue());
		theSearch.set('yardInDateTo', me.lookupReference('ctlEstArrToDt').getValue());

		//me.setVessel();
	},
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// Est.Arrival Date Find - sn, bl
	onSnFind: function(){
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore('snBlCombo');
    	var dateCondition = me.checkPeriodDate('ctlEstArrFromDt', 'ctlEstArrToDt', me.MAX_PERIOD_DAY, false);
    	var opeClassCd = refs.ctlRehandleCategory.getValue();
		var snNoCombo = me.getStore('rehandleSnNoCombo');
		var blNoCombo = me.getStore('rehandleBlNoCombo');
		var nextSnNoCombo = me.getStore('rehandleNextSnNoCombo');
		var searchType;
    	
    	if(dateCondition == null){
    		return null;
    	}
    	
    	refs.ctlRehandleSn.setValue(null);
		refs.ctlRehandleBl.setValue(null);
    	
    	if(opeClassCd === 'S'){
    		searchType = 'storage/sn/bl';
    		refs.ctlRehandleJpvc.setValue(null);
    	} else {
    		searchType = 'sn/bl';
    	}
    	
    	var params = {
    			opeClassCd:opeClassCd,
    			searchType:searchType
    		};
    	
    	if(dateCondition != null){
    		params['arrvDtFm'] = dateCondition.fromDtString;
    		params['arrvDtTo'] = dateCondition.toDtString;
    	}
    	
		store.load({
			params:params,
			callback: function(records, operation, success) {
				if (success) {
					if(opeClassCd === 'S'){
						snNoCombo.removeAll();
						snNoCombo.commitChanges();
					}
					
					if(records != null && records.length > 0){
						if(opeClassCd === 'S'){
							records.forEach(function(record, index){
								snNoCombo.insert(index, {shipgNoteNo:record.orgBlSn})
							});
						} else {
							snNoCombo.setData(records[0].get('snList'));
							blNoCombo.setData(records[0].get('blList'));
							
							snNoCombo.insert(0, [{scdNm: 'Select', shipgNoteNo: ''}]);
							blNoCombo.insert(0, [{scdNm: 'Select', blNo: ''}]);
						}
					}
				}
			}
		});
	},
	
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
			callback : function(records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
					me.setDefaultCotrols();
					me.onSearchRhdlDetaillist();
				}
			}
		});
		
	},

	onSearchRhdlDetaillist:function(){
		var me = this;
		var refs = me.getReferences();
		//me.maskPanel(me, 'ctlRhdlCtnRehandleAmt');

		var store = me.getStore(me.RHD_DETAIL_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var paramDetail = me.getSearchConditionDetail();
		
		if(!paramDetail){
			//me.unMaskPanel(me, 'ctlRhdlCtnRehandleAmt');
			return;
		}

		store.load({
			params: paramDetail,
			callback : function(records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						//MessageUtil.noMatchData();
					}
				}
				
				//me.unMaskPanel(me, 'ctlRhdlCtnRehandleAmt');
			}
		});
		
		

		// store.load({
		// 	// params:{
		// 	// 	vslCallId : StringUtil.trim(recvData.get('vslCallId')),
		// 	// 	orgRefNo : StringUtil.trim(recvData.get('orgRefNo')),
		// 	// 	opeClassCd : StringUtil.trim(recvData.get('opeClassCd')),
		// 	// 	rhdlMode : StringUtil.trim(recvData.get('rhdlMode')),
		// 	// 	nxVslCallId : StringUtil.trim(recvData.get('nxVslCallId')),
		// 	// 	nxRefNo : StringUtil.trim(recvData.get('nxRefNo')),
		// 	// 	cgNo : StringUtil.trim(recvData.get('cgNo'))
		// 	// },
		// 	callback : function(records, operation, success) {
		// 		if (success) {
		// 			if (records && records.length <= 0) {
		// 				MessageUtil.noMatchData();
		// 			}
		// 		}
		// 	}
		// });
	},
	
	onSearchRhdlRORODetaillist:function(){
		var me = this;
		var refs = me.getReferences();

		var store = me.getStore('rehandleROROOperationModeStore');
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var paramDetail = me.getSearchConditionDetail();
		
		if(!paramDetail){
			return;
		}

		store.load({
			params: paramDetail,
			callback : function(records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						//MessageUtil.noMatchData();
					}
				}
				
				//me.unMaskPanel(me, 'ctlRhdlCtnRehandleAmt');
			}
		});
	},
	
	
	onCheckDateTimeValid: function(startDate, endDate) {
		var me = this;
		var date1 = me.lookupReference(startDate).getValue();	
		var date2 = me.lookupReference(endDate).getValue();
		if(date1 != null && date2 != null && date1 > date2){
			me.lookupReference(endDate).setValue('');
			MessageUtil.warning('Warning', 'End time must be greater than start time.');
			// return;
		}

	},
	
	getSearchConditionDetail: function(){
		var me = this;
		var refs = me.getReferences();
		
		var store = me.getStore(me.RHD_DETAIL_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var searchParm = me.getViewModel().get('theSearch');
     	var rhdlMode = StringUtil.toUpperCase(searchParm.data.rhdlMode);

     	var nxVslCallId = StringUtil.toUpperCase(searchParm.data.nxVslCallId);
		var nxRefNo = StringUtil.toUpperCase(refs.ctlRehandleNextSn.getValue());
		var rhdlMode = StringUtil.toUpperCase(searchParm.data.rhdlMode);

		var params = null;

		var selection = grid.getSelection()[0]; //Single Selection
		
		if(selection){
			var vslCallId =  StringUtil.trim(selection.get('vslCallId'));
			var orgRefNo =  StringUtil.trim(selection.get('orgRefNo'));
			params =  {
				vslCallId : vslCallId,
				orgRefNo : orgRefNo,
				rhdlMode: rhdlMode,
				nxVslCallId: nxVslCallId,
				nxRefNo: rhdlMode
			};
			return params;
		}
		if(!StringUtil.isNullorEmpty(nxVslCallId) || !StringUtil.isNullorEmpty(nxRefNo)) {
			params =  {
				nxVslCallId : nxVslCallId,
				nxRefNo : nxRefNo,
			};
			return params;
		}
		return null;
	},

	// Grid Before Editor
	onBeforeEdit:function(editor, context) {
		var me = this;
		
		if( MOST.config.Token.getUserType() === CONSTANTS.USER_TYPE_INTERNAL ||
			me.existsPatnerType(me.SHIPPING_AGENCY) ||
			me.existsPatnerType(me.FORWARDER)){
			return true;
		} else {
			return false;
		}
	},
	
	// Grid Edit
	onEdit : function(editor, context){
		//var me = this;
		//context.record.data.workingStatus = context.record.crudState;
		
		var me = this;
		me.gridEdit(editor, context);	
	},
	
	// Grid Cancel Edit
	onCancelEdit : function(rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},	
	
	// Grid Row Click
	onClick:function(grid, record) {
    	var me = this;
    	var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var mainStore = grid.getStore();
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(mainStore.getUpdatedRecords().length > 0 && !selection.dirty){
			MessageUtil.warning('warning_msg', 'Please process the current editing record');
			grid.setSelection(mainStore.getUpdatedRecords()[0]);
			return;
		}
		
		if(selection){
			if(selection != null && selection.dirty){
				return; // Record is editting...
			}
			//me.getViewModel().set('selectedItem', grid.getSelection()[0]);
			var theRHDAmtItem = Ext.create('MOST.model.operation.RehandleGC');
			me.getViewModel().set({theRHDAmt:theRHDAmtItem});
			if(selection.get('cgTpCd') != null && selection.get('cgTpCd') == 'RCV'){
				me.onSearchRhdlRORODetaillist();
			}else{
				me.onSearchRhdlDetaillist();
			}
			
			me.setUsageControls(me.MAIN_GRID_REF_NAME, selection);
		}
	},

	// Grid Detail Row Click
	onDetailClick:function(grid, record) {
    	var me = this;
    	var grid = me.lookupReference(me.RHD_DETAIL_GRID_REF_NAME);
		
		if(grid.getSelection()){
			var selection = grid.getSelection()[0];
			me.setUsageControls(me.RHD_DETAIL_GRID_REF_NAME, selection);
		}
	},

	setUsageControls: function(gridRef, selection){
		var me = this;
		var refs =  me.getReferences();
		var isSelectedDetail = false;

		if(gridRef == me.RHD_DETAIL_GRID_REF_NAME){
			isSelectedDetail = true;
		}

		refs.ctlRhdlPkgQty.setDisabled(isSelectedDetail);
		refs.ctlRhdlWgt.setDisabled(isSelectedDetail);
		refs.ctlRhdlM3.setDisabled(isSelectedDetail);
		refs.ctlRhdlBtnUpdate.setDisabled(isSelectedDetail);
		refs.ctlRhdlBtnRehandling.setDisabled(isSelectedDetail);
		refs.ctlRhdlBtnRemove.setDisabled(!isSelectedDetail); //Delete detail btn

		if(gridRef == me.MAIN_GRID_REF_NAME){			
			var isBBK = (selection.get('cgTpCd') == 'BBK');
			refs.ctlRhdlWgt.setEditable(!isBBK);
			refs.ctlRhdlM3.setEditable(!isBBK);
		}

		if (selection.get('caTgCd') == 'T' || selection.get('caTgCd') == 'R') {
			refs.ctlRhdlPkgQty.setEditable(false);
			refs.ctlRhdlWgt.setEditable(false);
			refs.ctlRhdlM3.setEditable(false);

			refs.ctlRhdlPkgQty.setValue(selection.get('balPkgQty'));
			refs.ctlRhdlWgt.setValue(selection.get('balWgt'));
			refs.ctlRhdlM3.setValue(selection.get('balMsrmt'));
		}
	},

	setDefaultCotrols: function(){
		var me = this;
		var refs =  me.getReferences();
		var gridMain = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var gridDetail = me.lookupReference(me.RHD_DETAIL_GRID_REF_NAME);

		refs.ctlRhdlPkgQty.setDisabled(true);
		refs.ctlRhdlWgt.setDisabled(true);
		refs.ctlRhdlM3.setDisabled(true);
		refs.ctlRhdlBtnUpdate.setDisabled(true);
		refs.ctlRhdlBtnRehandling.setDisabled(true);
		refs.ctlRhdlBtnRemove.setDisabled(true);

		var rhdlAmtItem = Ext.create('MOST.model.operation.RehandleGC', {
			rhdlPkgQty: 0,
			rhdlWgt: 0,
			rhdlMsrmt: 0
		});
		me.getViewModel().set({theRHDAmt:rhdlAmtItem});
		gridMain.setSelection(false);
		gridDetail.setSelection(false);
	},

	onChangeRhdlQty: function(ctl, newVal, oldValue){
		var me = this;
		var refs = me.getReferences();
		var theRHDAmt = me.getViewModel().get('theRHDAmt');
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection()[0];

		if(!grid.getSelection()){
			return;
		}
		
		if(!selection || selection.get('cgTpCd') != 'BBK'){
			return;
		}
		
		var rhdlMt = 0,
			rhdlM3 = 0,
			rhdlQty = theRHDAmt.get('rhdlPkgQty'),
			eachMt = selection.get('eachWgt'),
			eachM3 = selection.get('eachMsrmt'),
			balQty = selection.get('balPkgQty'),
			balMt = selection.get('balWgt'),
			balM3 = selection.get('balMsrmt');
		
		if (newVal == balQty) {
			rhdlMt = balMt;
			rhdlM3 = balM3; 
		}
		else {
			rhdlMt = (eachMt * newVal).toFixed(3);
			rhdlM3 = (eachM3 * newVal).toFixed(3);
		}

		theRHDAmt.set('rhdlWgt', rhdlMt);
		theRHDAmt.set('rhdlMsrmt', rhdlM3);
	},

	// Grid Row Double
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		me.getView().detailViewAlias = 'app-rehandledetail';
		me.openDetailPopup(selection);
	},

	//Update:
	onUpdateRHD: function (){
		var me = this;
		var refs =  me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);		
		var theRHDAmt = me.getViewModel().get('theRHDAmt');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if(!me.validateRhdlAmt()){
			return;
		}

		var theRHDAmt = Ext.create('MOST.model.operation.RehandleGC', {
			rhdlPkgQty   : refs.ctlRhdlPkgQty.getValue(),
			rhdlWgt : refs.ctlRhdlWgt.getValue(),
			rhdlMsrmt  : refs.ctlRhdlM3.getValue()
		});

		me.updateRecordWithNoCommit(selection, theRHDAmt, ['rhdlPkgQty','rhdlWgt','rhdlMsrmt']);
		selection.set('balPkgQty', selection.get('balPkgQty') - theRHDAmt.get('rhdlPkgQty'));
		selection.set('balWgt', selection.get('balWgt') - theRHDAmt.get('rhdlWgt'));
		selection.set('balMsrmt', selection.get('balMsrmt') - theRHDAmt.get('rhdlMsrmt'));
		
		if(!selection.dirty){
			MessageUtil.warning('warning_msg', 'Nothing changed');
			return;
		}
		refs.ctlRhdlBtnUpdate.setDisabled(true);
		selection.set('workingStatus', 'U');
	},

	validateRhdlAmt: function(){
		var me = this;
		var refs =  me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var theRHDAmt = me.getViewModel().get('theRHDAmt');

		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		} 

		if(selection.get('cgTpCd') === 'BBK'){
			if(theRHDAmt.get('rhdlPkgQty') == 0) {
				MessageUtil.warning('warning_msg', 'Please input the Qty');
				return false; 
			}else if(theRHDAmt.get('rhdlPkgQty') > selection.get('balPkgQty')){
				MessageUtil.warning('warning_msg', 'Qty cannot exceeds Balance');
				return false; 
			}	
		}else{
			if(theRHDAmt.get('rhdlPkgQty') == 0 && theRHDAmt.get('rhdlWgt') == 0){
				MessageUtil.warning('warning_msg', 'Please input the MT/M3');
				return false;
			}else if (theRHDAmt.get('rhdlPkgQty') > selection.get('balPkgQty')
				|| theRHDAmt.get('rhdlWgt') > selection.get('balWgt')
				|| theRHDAmt.get('rhdlMsrmt') > selection.get('balMsrmt')){
				
				MessageUtil.warning('warning_msg', 'Rehandling Amount cannot exceeds the Balance Amount');
				return false;
			}
		}
		return true;
	},

	// Rehandle Button
	onRehandle:function(){
		var me = this;
		me.getView().detailViewAlias = me.DETAILVIEW;
		var title = {type: 'bundle', key: 'rehandleOperationModeTitle'};
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		} else if(!(selection.dirty)){
			MessageUtil.warning('warning_msg', 'Please Update Rehandle Amount first');
			return;
		} else{
			if(selection.get('cgTpCd') != null && selection.get('cgTpCd') == 'RCV'){
				me.getView().detailViewAlias = 'app-rehandlerorooperationmodepopup';
			}else{
				me.getView().detailViewAlias = 'app-rehandleoperationmodepopup';
			}
			me.openDetailPopup(selection, title);
		}
	},
	
	onUpdateAfterCreate:function(){
		var me = this;
		me.getView().detailViewAlias = me.DETAILVIEW;
		var title = {type: 'bundle', key: 'rehandleOperationModeTitle'};
		var grid = me.lookupReference(me.RHD_DETAIL_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		}else{
			me.getView().detailViewAlias = 'app-rehandleoperationforupdatepopup';
			me.openDetailPopup(selection, title);
		}
	},
	
	// Key Column Editable
	setGridColumnEditable:function(isCreate){
		var me = this;
		var refs = me.getReferences();
	},
	
	// Date Change Event
	onDateChange:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		
		if(control == refs.ctlEstArrFromDt){
			me.setDateInDaysByDate('ctlEstArrToDt', me.MAX_PERIOD_DAY, control.getValue());
		} else {
			me.setDateInDaysByDate('ctlEstArrFromDt', -me.MAX_PERIOD_DAY, control.getValue());
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
	// Popup is closed and receives return value
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		var snNoCombo = me.getStore('rehandleSnNoCombo');
		var blNoCombo = me.getStore('rehandleBlNoCombo');
		var nextSnNoCombo = me.getStore('rehandleNextSnNoCombo');
		var opModeNextSnNoCombo = me.getStore('rehandleOpModeNextSnNoCombo');
		var commodityGroupCombo = me.getStore('commodityGroupCombo');
		var gridDetail = me.lookupReference(me.RHD_DETAIL_GRID_REF_NAME);
		
		if(targetControl === 'ctlRehandleJpvc'){ // JPVC
			gridDetail.getStore().removeAll();

			refs.ctlRehandleSn.setValue(null);
			refs.ctlRehandleBl.setValue(null);
			refs.ctlScn.setValue(returnValue.item.get('scn'));
			var searchParm = me.getViewModel().get('theSearch');
			searchParm.set('yardInDateFrom', null);
			searchParm.set('yardInDateTo', null);
			if(returnValue){
				me.searchJpvcSnBlList(returnValue.code, 'sn/bl');
				//me.setVessel(returnValue.code);
				commodityGroupCombo.load({
					params:{
						vslCallId : returnValue.code
					},
					callback: function(records, operation, success) {
						if (success) {
							commodityGroupCombo.insert(0, [{scdNm: 'All', scd: ''}]);
						}
					}
				});
			} else {
				me.setDateInDays('ctlEstArrToDt');
				me.setDateInDays('ctlEstArrFromDt', -me.MAX_PERIOD_DAY);
				var theSearch = me.getViewModel().get('theSearch');
				theSearch.set('yardInDateFrom', me.lookupReference('ctlEstArrFromDt').getValue());
				theSearch.set('yardInDateTo', me.lookupReference('ctlEstArrToDt').getValue());
				
				snNoCombo.removeAll();
				snNoCombo.commitChanges();
				
				blNoCombo.removeAll();
				snNoCombo.commitChanges();
				commodityGroupCombo.load({
					params:{
						vslCallId : ''
					},
					callback: function(records, operation, success) {
						if (success) {
							commodityGroupCombo.insert(0, [{scdNm: 'All', scd: ''}]);
						}
					}
				});
			}
		} else if(targetControl === 'ctlRehandleNextJpvc'){ // Next JPVC
			gridDetail.getStore().removeAll();
			refs.ctlRehandleNextSn.setValue(null);
			refs.ctlNextScn.setValue(returnValue.item.get('scn'));
			if(returnValue){
				var searchParm = me.getViewModel().get('theSearch');
				searchParm.set('yardInDateFrom', null);
				searchParm.set('yardInDateTo', null);

				me.searchJpvcNextSnList(returnValue.code, 'nxSn');
			} else {
				me.setDateInDays('ctlEstArrToDt');
				me.setDateInDays('ctlEstArrFromDt', -me.MAX_PERIOD_DAY);
				var theSearch = me.getViewModel().get('theSearch');
				theSearch.set('yardInDateFrom', me.lookupReference('ctlEstArrFromDt').getValue());
				theSearch.set('yardInDateTo', me.lookupReference('ctlEstArrToDt').getValue());

				nextSnNoCombo.removeAll();
				nextSnNoCombo.commitChanges();
			}
		} else if(targetControl === 'ctlRehandleOpModeNextJpvc'){ // Next JPVC
			if(returnValue){
				var detailItem = me.getViewModel().get('theDetail');
				
				if(returnValue.item.get('vslCallId') == detailItem.get('vslCallId')){
					detailItem.set('nxVslCallId','');
					MessageUtil.warning('warning_msg', 'rehandle_block_samevessel');
					return;
				}
				
				detailItem.set('nxScn', returnValue.item.get('scn'));
				detailItem.set('nxVslCallId', returnValue.item.get('vslCallId'));
				detailItem.set('vslCd', returnValue.item.get('vslCd'));
				detailItem.set('callYear', returnValue.item.get('callYear'));
				detailItem.set('callSeq', returnValue.item.get('callSeq'));
			}
		}else if(targetControl === 'ctlRehandleWhAllocation'){
			refs.ctlRehandleLocId.setValue(returnValue.data.whConfigurationMap.data.items[0].get('locId'));
			me.isAllocationCreate = true;
		}else if(targetControl === 'ctlRehandleWhAllocationForUpdate'){
			refs.ctlRehandleLocIdForUpdate.setValue(returnValue.data.whConfigurationMap.data.items[0].get('locId'));
			refs.refsRhdlMt.setValue(returnValue.get('wgt'));
			refs.refsRhdlM3.setValue(returnValue.get('msrmt'));
			refs.refsRhdlQty.setValue(returnValue.get('pkgQty'));
			me.isAllocationUpdate = true;
		} else if(targetControl === 'ctlScn' || targetControl === 'ctlNextScn'){ 
			if(returnValue){
				if(targetControl === 'ctlScn'){
					refs.ctlScn.setValue(returnValue.code);
					if(!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))){
						refs.ctlRehandleJpvc.setValue(returnValue.item.get('vslCallId'));
						me.getViewModel().setData({theVslInfo:returnValue.item});
					} else {
						refs.ctlRehandleJpvc.setValue('');
						me.getViewModel().setData({theVslInfo:null});
					}
				} else {
					refs.ctlNextScn.setValue(returnValue.code);
					if(!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))){
						refs.ctlRehandleNextJpvc.setValue(returnValue.item.get('vslCallId'));
						me.getViewModel().setData({theVslInfo:returnValue.item});
					} else {
						refs.ctlRehandleNextJpvc.setValue('');
						me.getViewModel().setData({theVslInfo:null});
					}
				}
			} 
		}
	},
	
	// Search S/N, B/L List
	searchJpvcSnBlList : function(jpvc, searchType){
		var me = this;
		var store = me.getStore('snBlCombo');
		var snNoCombo = me.getStore('rehandleSnNoCombo');
		var blNoCombo = me.getStore('rehandleBlNoCombo');
		var rehandleBookingNoCombo = me.getStore('rehandleBookingNoCombo');
		var rehandleMasterBlNoCombo = me.getStore('rehandleMasterBlNoCombo');
		
		store.load({
			params:{
				vslCallId : jpvc,
				searchType : searchType
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						records[0].get('snList').forEach(function(record, index){
							if(rehandleBookingNoCombo.find('mfDocId', record.mfDocId) < 0){
								rehandleBookingNoCombo.insert(index, [{scdNm: record.mfDocId,mfDocId: record.mfDocId}]);
							}
						});

						if (rehandleBookingNoCombo.find('scdNm', 'All') < 0) {
							rehandleBookingNoCombo.insert(0,[{
								scdNm:'All',
								mfDocId:''
							}]);
						}
						
						rehandleBookingNoCombo.commitChanges();

						records[0].get('blList').forEach(function(record, index){
							if(rehandleMasterBlNoCombo.find('mfdocid', record.mfdocid) < 0){
								rehandleMasterBlNoCombo.insert(index, [{scdNm: record.mfdocid,mfdocid: record.mfdocid}]);
							}
						});

						if (rehandleMasterBlNoCombo.find('scdNm', 'All') < 0) {
							rehandleMasterBlNoCombo.insert(0,[{
								scdNm:'All',
								mfdocid:''
							}]);
						}
						
						rehandleMasterBlNoCombo.commitChanges();
						
						snNoCombo.setData(records[0].get('snList'));
						blNoCombo.setData(records[0].get('blList'));
						snNoCombo.insert(0, [{scdNm: 'All', shipgNoteNo: ''}]);
						blNoCombo.insert(0, [{scdNm: 'All', blNo: ''}]);
					}
				}
			}
		});
	},

	onChangeMasterBl : function(){
		var me = this;
		var store = me.getStore('snBlCombo');
		var blNoCombo = me.getStore('rehandleBlNoCombo');
		var searchParm = me.getViewModel().get('theSearch');
		searchParm.set('bookingNo','');
		searchParm.set('shipgNoteNo','');
		store.load({
			params:{
				vslCallId : StringUtil.toUpperCase(searchParm.data.vslCallId),
				searchType : 'sn/bl',
				mfDocId: StringUtil.toUpperCase(searchParm.data.masterBlNo),
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						blNoCombo.setData(records[0].get('blList'));
						blNoCombo.insert(0, [{scdNm: 'All', blNo: ''}]);
					}
				}
			}
		});
	},

	onChangeBookingNo : function(ctl){
		var me = this;
		var store = me.getStore('snBlCombo');
		var snNoCombo = me.getStore('rehandleSnNoCombo');

		var searchParm = me.getViewModel().get('theSearch');
		searchParm.set('masterBlNo','');
		searchParm.set('blNo','');
		store.load({
			params:{
				vslCallId : StringUtil.toUpperCase(searchParm.data.vslCallId),
				searchType : 'sn/bl',
				mfDocId: StringUtil.toUpperCase(searchParm.data.bookingNo),
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						snNoCombo.setData(records[0].get('snList'));
						snNoCombo.insert(0, [{scdNm: 'All', shipgNoteNo: ''}]);
					}
				}
			}
		});
	},

	onChangeCommodityGroup: function() {
		var me = this;
		var refs = me.getReferences();
		var commodityCodeCombo = me.getStore('commodityCodeCombo');

		commodityCodeCombo.load({
			params:{
				cmdtGrCd: refs.ctlCommodityGroup.getValue()
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						commodityCodeCombo.insert(0, [{scdNm: 'All', shipgNoteNo: ''}]);
					}
				}
			}
		});
	},
	
	// Search Next S/N List
	searchJpvcNextSnList : function(jpvc, searchType){
		var me = this;
		var store = me.getStore('snBlCombo');
		var nextSnNoCombo = me.getStore('rehandleNextSnNoCombo');
		
		store.load({
			params:{
				vslCallId : jpvc,
				searchType : searchType
			},
			callback: function(records, operation, success) {
				if (success) {
					nextSnNoCombo.setData(records);
					nextSnNoCombo.insert(0, [{scdNm: 'Select', shipgNoteNo: ''}]);
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
     	var dateCondition = me.checkPeriodDate('ctlEstArrFromDt', 'ctlEstArrToDt', me.MAX_PERIOD_DAY, false);
		var searchParm = me.getViewModel().get('theSearch');
     	var rhdlMode = StringUtil.toUpperCase(searchParm.data.rhdlMode);
     	var nxRefNo = StringUtil.toUpperCase(refs.ctlRehandleNextSn.getValue());
     	var opeClassCd = StringUtil.toUpperCase(searchParm.data.opeClassCd);
     	var blNo = StringUtil.toUpperCase(searchParm.data.blNo);
     	var shipgNoteNo = StringUtil.toUpperCase(searchParm.data.shipgNoteNo);
     	var masterBlNo = StringUtil.toUpperCase(searchParm.data.masterBlNo);
     	var bookingNo = StringUtil.toUpperCase(searchParm.data.bookingNo);
     	var vslCallId = StringUtil.toUpperCase(searchParm.data.vslCallId);
     	var nxVslCallId = StringUtil.toUpperCase(searchParm.data.nxVslCallId);
     	var scn = StringUtil.toUpperCase(searchParm.data.scn);
     	var nxScn = StringUtil.toUpperCase(searchParm.data.nxScn);
     	var cmdtGrCd = StringUtil.toUpperCase(searchParm.data.cmdtGrCd);
     	var cmdtCd = StringUtil.toUpperCase(searchParm.data.cmdtCd);
     	var pkgNo = StringUtil.toUpperCase(searchParm.data.pkgNo);
     	var shipgAgentCd = StringUtil.toUpperCase(searchParm.data.shipgAgentCd);
     	var authoType = '';
     	
    	if(dateCondition == null){
    		return null;
    	}

    	if(me.existsPatnerType(me.SHIPPING_AGENCY) && me.existsPatnerType(me.FORWARDER)){
    		authoType = 'BOTH';
    	} else if(me.existsPatnerType(me.SHIPPING_AGENCY)){
    		authoType = me.SHIPPING_AGENCY;
    	} else if(me.existsPatnerType(me.FORWARDER)){
    		authoType = me.FORWARDER;
    	}
		
		
		var params = me.createParam(searchParm);
		params['authoType'] = authoType;
		params['searchType'] = 'rhdlOp';
		params['userType'] =  MOST.config.Token.getUserType();
		params['ptnrCode'] = MOST.config.Token.getPtnrCode();
		//params['rhdlMode'] = rhdlMode;
		params['nxVslCallId'] = nxVslCallId;
		params['nxRefNo'] = nxRefNo;
		params['opeClassCd'] = opeClassCd;
		params['blNo'] = blNo;
		params['shipgNoteNo'] = shipgNoteNo;
		params['masterBlNo'] = masterBlNo;
		params['bookingNo'] = bookingNo;
		params['vslCallId'] = vslCallId;
		params['cmdtGrCd'] = cmdtGrCd;
		params['cmdtCd'] = cmdtCd;
		params['pkgNo'] = pkgNo;
		params['shipgAgentCd'] = shipgAgentCd;
//		params['pageNo'] = pageNo;
//		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		params['scn'] = scn;
		params['nxScn'] = nxScn;
		params['yardInDateFrom'] = searchParm.data.yardInDateFrom ? Ext.Date.format(new Date(searchParm.data.yardInDateFrom), 'd/m/Y') : '';
		params['yardInDateTo'] = searchParm.data.yardInDateTo ? Ext.Date.format(new Date(searchParm.data.yardInDateTo), 'd/m/Y') : '';
    	
    	return params;
	},
	
	// ViewUtil visibleDetailSave
	visibleDetailSave : function(bizViewAlias){
		if(bizViewAlias === 'app-rehandledetail'){
			return false;
		} else {
			return true;
		}
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * Operation Mode DETAIL START
	 */
	// Detail Load
	//onOperationModeDetailLoad:function(){
	onDetailLoad:function(){
		var me = this;
		var detailItem = new Ext.create('MOST.model.operation.RehandleGC');
		
		me.isAllocationCreate = false;
		me.isAllocationUpdate = false;
		
		detailItem.phantom = false; // UPDATE
		detailItem.commit();
		me.getViewModel().setData({theDetail:detailItem});
		me.setComboBoxWithLocalCache(CacheServiceConstants.REHANDLE_MODE_COMBO, me.PARAMETTER_CHECK_REHANDLE_MODE_STORE); 
		me.setDetailInitialize();
	},
	
	
	//onOperationModeForRORODetailLoad:function(){
	onDetailRORORehandleLoad:function(){
		var me = this;
		var detailItem = new Ext.create('MOST.model.operation.RehandleGC');

		var recvData = me.getDetailBizView().items.get(0).recvData;
		detailItem.phantom = false; // UPDATE
		detailItem.commit();
		detailItem.set('wgt',recvData.get('wgt'));
		detailItem.set('pkgQty',recvData.get('pkgQty'));
		detailItem.set('rhdlPkgQty',recvData.get('rhdlPkgQty'));
		detailItem.set('rhdlWgt',recvData.get('rhdlWgt'));
		me.getViewModel().setData({theRRDetail:detailItem});
		me.setComboBoxWithLocalCache(CacheServiceConstants.REHANDLE_MODE_COMBO, me.PARAMETTER_CHECK_REHANDLE_MODE_STORE); 
		var assigneddListStore = me.getStore('rehandleROROOperationModeStore');
		var unitsStackedListStore = me.getStore('unitsStackedListStore');
		var searchType, cargoNo;
		unitsStackedListStore.removeAll();
		
		if(recvData.get('caTgCd') != null && recvData.get('caTgCd') == 'I'){
			searchType = 'WHIP';
			cargoNo = recvData.get('blNo');
		}else{
			cargoNo = recvData.get('shipgNoteNo');
		}
		assigneddListStore.load({
			params : {
				nextShipgNoteNo: recvData.get('nextShipgNoteNo'),
				nextVslCallId: recvData.get('nextVslCallId'),
				vslCallId: recvData.get('vslCallId'),
				rhdlNo: recvData.get('rhdlNo'),
				cargoNo: cargoNo
			},
				callback: function(records, operation, success) {
					if (success) {
					}
				}
			});
	},
	
	//Detail load for Update
	onDetailLoadForUpdate:function(){
		var me = this;
		var refs = me.getReferences();
		
		me.isAllocationCreate = false;
		me.isAllocationUpdate = false;
		
		me.getViewModel().setData({theDetail:(me.lookupReference(me.RHD_DETAIL_GRID_REF_NAME).getSelection()[0])});
		me.setComboBoxWithLocalCache(CacheServiceConstants.REHANDLE_MODE_COMBO, me.PARAMETTER_CHECK_REHANDLE_MODE_STORE);
		
		if(me.lookupReference(me.RHD_DETAIL_GRID_REF_NAME).getSelection()[0].get('rhdlMode') == 'R'){
			refs.ctlWhLocationFieldSet.setHidden(true);
		}else{
			refs.ctlWhLocationFieldSet.setHidden(false);
			refs.refsRhdlMt.setReadOnly(true);
			refs.refsRhdlM3.setReadOnly(true);
			refs.refsRhdlQty.setReadOnly(true);
		}
	},
	
	// Detail Initialize
	setDetailInitialize : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
			
		var theDetail = me.getViewModel().get('theDetail');
		
		refs.ctlRehandleLocId.setDisabled(true);
		refs.ctlRehandleWhAllocation.setDisabled(true);
		me.updateRecordWithNoCommit(theDetail, recvData); //, ['pkgQty','wgt','msrmt','rhdlPkgQty','rhdlWgt','rhdlMsrmt', 'caTgCd']
	},

	// Operation Mode Rehandle Mode Change
	onChangeRehandleMode: function(combo, value, obj){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theDetail');
		var recvData = detailView.items.get(0).recvData;

		var isChangeVSL = false, isRTS = false; //Change VSL, Return to Shipper.
		if(value === 'C'){
			isChangeVSL = true;
			detailItem.set('nxRefNo', recvData.get('orgRefNo'));
			
			//New process with Location in case Change Vessel
			refs.ctlRehandleLocId.setValue('');
			refs.ctlRehandleLocId.setDisabled(false);
			refs.ctlRehandleWhAllocation.setDisabled(false);
		}else if(value === 'R'){
			isRTS = true;
			refs.ctlRehandleOpModeNextJpvc.setValue();
			refs.ctlTxtRehandleOpModeSNNo.setValue();
			
			//New process with Location in case Change Vessel
			refs.ctlRehandleLocId.setDisabled(true);
			refs.ctlRehandleWhAllocation.setDisabled(true);
		}else if(value === '' || value === null){
			//New process with Location in case Change Vessel
			refs.ctlRehandleLocId.setDisabled(true);
			refs.ctlRehandleWhAllocation.setDisabled(true);
		}

		refs.ctlRehandleOpModeNextJpvc.setDisabled(!isChangeVSL);		
	},
	
	// Operation Mode Rehandle Mode Change
	onOpModeNextSnChange : function(combo, value, obj){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var opModeNextGrNoCombo = me.getStore('rehandleOpModeNextGrNoCombo');
		
		if(!StringUtil.isNullorEmpty(value)){
			opModeNextGrNoCombo.load({
				params:{
					vslCallId : detailItem.get('nxVslCallId'),
					shipgNoteNo : value
				},
				callback: function(records, operation, success) {
					if (success) {
						if(records != null && records.length > 0){
							refs.ctlRehandleOpModeGrNoCombo.setValue(records[0].get('nxCgNo'));
						}
					}
				}
			});
		}
	},
	
	// Detail Save
	onDetailSave:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var infoForm = detailView.down('form').getForm();

		if(infoForm.isValid()){
			if(detailView.viewModelKey == 'app-rehandleoperationforupdatepopup'){
				me.cudDataForUpdate();
			}else{				
				me.cudData();
			}
		}
	},
	
	// val()
	isNotValid : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		var mt = detailItem.get('rhdlWgt');
		var m3 = detailItem.get('rhdlMsrmt');
		var qty = detailItem.get('rhdlPkgQty');
		var cgTpCd = detailItem.get('cgTpCd');
		var msgTitle =  '<b>Please input the mandatory field(s):</b><br/>';
		var msgString = '';

		
		if((detailItem.get('caTgCd') == 'I' || detailItem.get('caTgCd') == 'T')
			&& detailItem.get('rhdlMode') == 'R'){
			
			MessageUtil.warning('warning_msg', 'rehandle_mode_block_msg');
			return true;
		}
		//Validate Cargo and Amount:
		if(cgTpCd == 'BBK' & qty <= 0){
			MessageUtil.warning('warning_msg', 'rehandle_amount_zero_msg'); // Amount value is zero
			return true;
		}else if(cgTpCd == 'DBN' & (mt <= 0 && m3 <=0)){
			MessageUtil.warning('warning_msg', 'rehandle_amount_zero_msg'); // Amount value is zero
			return true;
		}/*else if(cgTpCd !== 'BBK' && cgTpCd == 'DBN'){
			MessageUtil.warning('warning_msg', 'Cargo Not defined');
			return true;
		}*/
		
		//Check required fields:

		if(StringUtil.isNullorEmpty(detailItem.get('rhdlMode'))){
			msgString = TSB.locale.i18n.Bundle.instance.getMsg('rehandle_input_rehandle_mode_msg') + '<br/>';// INPUT REHANDLE MODE
		} else if (detailItem.get('rhdlMode') === 'C'){ //change vessel
			if(StringUtil.isNullorEmpty(detailItem.get('nxVslCallId'))){
				msgString = TSB.locale.i18n.Bundle.instance.getMsg('rehandle_selected_vslcallid_msg') + '<br/>';// INPUT REHANDLE MODE
			}
			if(StringUtil.isNullorEmpty(detailItem.get('nxRefNo'))){
				msgString = TSB.locale.i18n.Bundle.instance.getMsg('rehandle_selected_shipping_note_no_msg') + '<br/>';// INPUT REHANDLE MODE
			}
		}

		if(msgString.trim()){
			MessageUtil.warning('warning_msg', msgString);
			return true;
		}
		
		return false;
	},

	isNotValidofRORO: function(dataItem){
		var me = this;
		var detailItem = me.getViewModel().get('theRRDetail');
		var mt = detailItem.get('rhdlWgt');
		var m3 = detailItem.get('rhdlMsrmt');
		var qty = detailItem.get('rhdlPkgQty');
		var cgTpCd = detailItem.get('cgTpCd');
		var msgTitle =  '<b>Please input the mandatory field(s):</b><br/>';
		var msgString = '';

		
		if((detailItem.get('caTgCd') == 'I' || detailItem.get('caTgCd') == 'T')
			&& detailItem.get('rhdlMode') == 'R'){
			
			MessageUtil.warning('warning_msg', 'rehandle_mode_block_msg');
			return true;
		}
		
		if(cgTpCd == 'RCV' & (mt <= 0 && qty <=0)){
			MessageUtil.warning('warning_msg', 'rehandle_amount_zero_msg'); // Amount value is zero
			return true;
			
		}
		//Check required fields:

		if(StringUtil.isNullorEmpty(detailItem.get('rhdlMode'))){
			msgString = TSB.locale.i18n.Bundle.instance.getMsg('rehandle_input_rehandle_mode_msg') + '<br/>';// INPUT REHANDLE MODE
		} else if (detailItem.get('rhdlMode') === 'C'){ //change vessel
			if(StringUtil.isNullorEmpty(detailItem.get('nxVslCallId'))){
				msgString = TSB.locale.i18n.Bundle.instance.getMsg('rehandle_selected_vslcallid_msg') + '<br/>';// INPUT REHANDLE MODE
			}
			if(StringUtil.isNullorEmpty(detailItem.get('nxRefNo'))){
				msgString = TSB.locale.i18n.Bundle.instance.getMsg('rehandle_selected_shipping_note_no_msg') + '<br/>';// INPUT REHANDLE MODE
			}
		}

		if(msgString.trim()){
			MessageUtil.warning('warning_msg', msgString);
			return true;
		}
		
		return false;
	},
	
	// cudData
	cudData : function(){
		var me = this;
		var arrItems = new Array();
		var store = me.getStore(me.MAIN_STORE_NAME); 
		var detailStore = me.getStore(me.RHD_DETAIL_STORE_NAME);
		var detailItem = me.getViewModel().get('theDetail');
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var addItem = recvData.clone();
		recvData.commit();
		
		if(me.isNotValid()){
			return;
		}
		
		if(me.isAllocationCreate == false && detailItem.get('rhdlMode') === 'C'){
			MessageUtil.warning('warning_msg', 'Please select location by manual');
			return;
		}
		
		if(detailItem.get('rhdlMode') === 'C'){
			addItem.set('nxVslCallId', detailItem.get('nxVslCallId'));
			addItem.set('nxScn', detailItem.get('nxScn'));
			addItem.set('nxRefNo', detailItem.get('nxRefNo')); //SN
		} else {
			addItem.set('nxVslCallId', '');
			addItem.set('nxRefNo', '');
		}
		
		addItem.set('userId', MOST.config.Token.getUserId());
		addItem.set('rhdlMode', detailItem.get('rhdlMode'));
		addItem.set('locId', detailItem.get('locId'));
		addItem.set('vslCd', detailItem.get('vslCd'));
		addItem.set('callYear', detailItem.get('callYear'));
		addItem.set('callSeq', detailItem.get('callSeq'));

		if(StringUtil.isNullorEmpty(addItem.get('rhdlNo'))){
			addItem.set('workingStatus', WorkingStatus.INSERT);
		} else {
			addItem.set('workingStatus', WorkingStatus.UPDATE);
		}
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var isCreated = detailItem.phantom;
		var proxy = detailItem.getProxy();
		
		proxy.url = me.CARGO_REHANDLING_PROXY_URL;
		updateParm.getProxy().url = proxy.url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('item', addItem.data);
		
		updateParm.save({
			success : function(){
				
				detailItem.commit();
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
					if (button === 'ok') {
						detailStore.reload();

						var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
						var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
						if(selection){
							selection.set('workingStatus', 'R');
							selection.commit();
						}
						detailView.close();
					}
				});			
			}
		});
	},
	
	//cudData for Update
	cudDataForUpdate: function(){
		var me = this;
		var arrItems = new Array();
		var store = me.getStore(me.MAIN_STORE_NAME); 
		var detailStore = me.getStore(me.RHD_DETAIL_STORE_NAME);
		var detailItem = me.getViewModel().get('theDetail');
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var addItem = recvData.clone();
		var rhdlStore = me.getViewModel().get('rehandle');
		
		var balWgt = 0;
		var balVol = 0;
		var balQty = 0;
		
		var wgtForUpdate = 0;
		var volForUpdate = 0;
		var qtyForUpdate = 0;
		
		if(me.isAllocationUpdate == false && detailItem.get('rhdlMode') === 'C'){
			MessageUtil.warning('warning_msg', 'Please select location by manual');
			return;
		}
		
		if(detailItem.get('rhdlMode') == 'C'){	
			if(detailItem.get('canUpdateChgVsl') != null && detailItem.get('canUpdateChgVsl') != ''){
				if(detailItem.get('canUpdateChgVsl') == 'N'){
					MessageUtil.warning('warning_msg', 'rehandle_do_second_wgt_msg');
					return;
				}
			}
		}
		 
		if(detailItem.get('rhdlMode') == 'R'){		
			if(detailItem.get('canUpdateRts') != null && detailItem.get('canUpdateRts') != ''){
				if(detailItem.get('canUpdateRts') == 'N'){
					MessageUtil.warning('warning_msg', 'rehandle_do_second_wgt_msg');
					return;
				}
			}
		}
					
		//In case Change Vessel, Wgt can not be less than or equal zero when update
		if(detailItem.get('rhdlMode') == 'C'){		
			if(Number(detailItem.get('rhdlWgt')) <= 0){
				MessageUtil.warning('warning_msg', 'rehandle_negative_wgt_msg');
				return;
			}
		}
		
		//In case RTS, Wgt can not be negative and just be allowed to be equal zero if it has not done operation yet and existed GR when update
		if(detailItem.get('rhdlMode') == 'R'){	
			if(Number(detailItem.get('rhdlWgt')) < 0){
				MessageUtil.warning('warning_msg', 'rehandle_negative_wgt_msg');
				return;
			}
			
			if(Number(detailItem.get('rhdlWgt')) == 0 && (detailItem.get('canDeleteRts') == 'Y' || detailItem.get('isExistRtsOpe') == 'Y')){
				MessageUtil.warning('warning_msg', 'rehandle_zero_wgt_msg');
				return;
			}
		}
		
		rhdlStore.each(function(record){
			if(record.get('vslCallId') == detailItem.get('vslCallId') && record.get('orgRefNo') == detailItem.get('orgRefNo')){
				balWgt = Number(record.get('balWgt')) + Number(detailItem.get('oldRhdlWgt'));
				balVol = Number(record.get('balMsrmt')) + Number(detailItem.get('oldRhdlMsrmt'));
				balQty = Number(record.get('balPkgQty')) + Number(detailItem.get('oldRhdlPkgQty'));
			}
		});
		
		detailStore.each(function(record){
			if(record.get('rhdlNo') == detailItem.get('rhdlNo') && record.get('seq') != detailItem.get('seq')){
				wgtForUpdate += Number(record.get('rhdlWgt'));
				volForUpdate += Number(record.get('rhdlMsrmt'));
				qtyForUpdate += Number(record.get('rhdlPkgQty'));
			}
		});
		
		//In case change vessel, validate when it has operation or not
		if(detailItem.get('rhdlMode') == 'C'){	
			//Exist operation, validate with actual
			if(detailItem.get('canDeleteChgVsl') == 'N'){
				if(Number(detailItem.get('rhdlWgt')) > Number(detailItem.get('actMt'))
						|| Number(detailItem.get('rhdlMsrmt')) > Number(detailItem.get('actM3'))
								|| Number(detailItem.get('rhdlPkgQty')) > Number(detailItem.get('actQty'))){
					MessageUtil.warning('warning_msg', 'rehandle_exceed_ope_delete_msg');
					return;
				}
			}else{
				//Not exist operation, validate with document
//				if(Number(detailItem.get('rhdlWgt')) > balWgt || Number(detailItem.get('rhdlMsrmt')) > balVol || Number(detailItem.get('rhdlPkgQty')) > balQty){
//					MessageUtil.warning('warning_msg', 'rehandle_exceed_doc_delete_msg');
//					return;
//				}
			}
		}
		
		//In case RTS, validate when it has operation or not
		if(detailItem.get('rhdlMode') == 'R'){	
			//Exist operation, validate with actual
			if(detailItem.get('isExistRtsOpe') == 'Y'){
				if(Number(detailItem.get('rhdlWgt')) > Number(detailItem.get('actMt'))
						|| Number(detailItem.get('rhdlMsrmt')) > Number(detailItem.get('actM3'))
								|| Number(detailItem.get('rhdlPkgQty')) > Number(detailItem.get('actQty'))){
					MessageUtil.warning('warning_msg', 'rehandle_exceed_ope_delete_msg');
					return;
				}
			}else{
				//Not exist operation, validate with document
				if(Number(detailItem.get('rhdlWgt')) > balWgt || Number(detailItem.get('rhdlMsrmt')) > balVol || Number(detailItem.get('rhdlPkgQty')) > balQty){
					MessageUtil.warning('warning_msg', 'rehandle_exceed_doc_delete_msg');
					return;
				}
			}
		}
		
//		if(Number(detailItem.get('rhdlWgt')) > balWgt || Number(detailItem.get('rhdlMsrmt')) > balVol || Number(detailItem.get('rhdlPkgQty')) > balQty){
//			MessageUtil.warning('warning_msg', 'Exceed balance document');
//			return;
//		}
		
		//MT, M3, QTY for change vessel case
		addItem.set('sumChgVslUpdateWgt', wgtForUpdate + Number(detailItem.get('rhdlWgt')));
		addItem.set('sumChgVslUpdateMsrmt', volForUpdate + Number(detailItem.get('rhdlMsrmt')));
		addItem.set('sumChgVslUpdateQty', qtyForUpdate + Number(detailItem.get('rhdlPkgQty')));
		
		//MT, M3, QTY for change vessel case (In Inventory)
		addItem.set('sumChgVslInvUpdateWgt', -(wgtForUpdate + Number(detailItem.get('rhdlWgt'))));
		addItem.set('sumChgVslInvUpdateMsrmt', -(volForUpdate + Number(detailItem.get('rhdlMsrmt'))));
		addItem.set('sumChgVslInvUpdateQty', -(qtyForUpdate + Number(detailItem.get('rhdlPkgQty'))));
		
		addItem.set('userId', MOST.config.Token.getUserId());
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var isCreated = detailItem.phantom;
		var proxy = detailItem.getProxy();
		
		proxy.url = me.CARGO_REHANDLING_FOR_UPDATE_PROXY_URL;
		updateParm.getProxy().url = proxy.url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('item', addItem.data);
		
		updateParm.save({
			success : function(){				
				detailItem.commit();
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
					if (button === 'ok') {
						detailStore.reload();

						var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
						var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
						if(selection){
							selection.set('workingStatus', 'R');
							selection.commit();
						}
						detailView.close();
					}
				});			
			}
		});
		
		me.onSearch();
	},
	
	onChangeQtyForUpdate: function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		var refs = me.getReferences();
		
		if(detailItem.get('updateCgTp') == 'BBK'){
			var eachWgt = (Number(detailItem.get('wgt'))/Number(detailItem.get('pkgQty'))).toFixed(5);
			var eachMsrmt = (Number(detailItem.get('msrmt'))/Number(detailItem.get('pkgQty'))).toFixed(5);
			
			detailItem.set('rhdlWgt', Number(refs.refsRhdlQty.getValue()) * eachWgt);
			detailItem.set('rhdlMsrmt', Number(refs.refsRhdlQty.getValue()) * eachMsrmt);
		}
	},
		
	/**
	 * Operation Mode DETAIL END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * Rehandle DETAIL START
	 */
	// Detail Load
	onRehandleDetailLoad:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData.clone();
		var store = me.getStore(me.RHD_DETAIL_STORE_NAME);

		detailView.items.get(0).recvData = recvData.commit();
		
		store.load({
			params:{
				vslCallId : StringUtil.trim(recvData.get('vslCallId')),
				orgRefNo : StringUtil.trim(recvData.get('orgRefNo')),
				opeClassCd : StringUtil.trim(recvData.get('opeClassCd')),
				rhdlMode : StringUtil.trim(recvData.get('rhdlMode')),
				nxVslCallId : StringUtil.trim(recvData.get('nxVslCallId')),
				nxRefNo : StringUtil.trim(recvData.get('nxRefNo')),
				cgNo : StringUtil.trim(recvData.get('cgNo'))
			}
		});
	},
	
	onRehandleDetailRemove:function(){
		var me = this;
		var grid = me.lookupReference(me.RHD_DETAIL_GRID_REF_NAME);
		var store = me.getStore(me.RHD_DETAIL_STORE_NAME);
		var deleteItems = new Array();
		var assignedTrucksStore = me.getStore(me.ASSIGNED_TRUCK_STORE_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		if(selection.get('rhdlMode') == 'C'){			
			if(selection.get('canDeleteChgVsl') != null && selection.get('canDeleteChgVsl') != ''){
				if(selection.get('canDeleteChgVsl') == 'N'){
					MessageUtil.warning('warning_msg', 'rehandle_exist_ope_delete_msg');
					return;
				}
			}
		}
		
		if(selection.get('rhdlMode') == 'R'){
			if(selection.get('canDeleteRts') != null && selection.get('canDeleteRts') != ''){
				if(selection.get('canDeleteRts') == 'N'){
					MessageUtil.warning('warning_msg', 'rehandle_exist_gr_delete_msg');
					return;
				}
			}
		}
		//sMantis: 0166809
		assignedTrucksStore.load({
			params: {
				vslCallId: selection.data.nxVslCallId,
				shipgNoteNo: selection.data.nxRefNo
			},
			callback: function(record, operation, success) {
				if(success) {
					if(record.length > 0) {
						MessageUtil.warning('warning_msg', 'rehandle_exist_assigned_truck_delete_msg');
						return;
					} else {
						selection.set('workingStatus', WorkingStatus.DELETE);
		
						MessageUtil.question('remove', 'infodelete_msg', null,
							function(button){
								if (button === 'ok') {
									me.deleteProcessForRehandleDetail(selection);
								}
							}
						);
					}
				}
			}
		})
		//sMantis: 0166809
	},

	// Rehandle Detail Delete
	deleteProcessForRehandleDetail : function(selection){
		var me = this;
		var masterStore = me.getStore(me.MAIN_STORE_NAME);
		var store = me.getStore(me.RHD_DETAIL_STORE_NAME);
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var proxy = selection.getProxy();
		
		proxy.url = me.CARGO_REHANDLING_PROXY_URL;
		updateParm.getProxy().url = proxy.url;
		updateParm.phantom = false;
		updateParm.drop();
		updateParm.set('workingStatus', WorkingStatus.DELETE);
		
		updateParm.set('item', selection.data);
		updateParm.phantom = false;
		updateParm.drop();
		
		updateParm.save({
			callback: function(record, operation, success){

				var responseObj = JSON.parse(operation.getResponse().responseText).response;
				if(responseObj.errorNumber == 600) {
					if(responseObj.errorDescription === "existsOperation") {
						MessageUtil.warning('warning_msg', 'rehandle_block_delete_msg');
						return;
					}
					if(responseObj.errorDescription === "existsRtsGr") {
						MessageUtil.warning('warning_msg', 'rehandle_rst_gr_block_delete_msg');
						return;
					}
				}

				store.remove(selection);
				store.commitChanges();
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
					if (button === 'ok') {
						masterStore.reload();
					}
				});
			}
		});
	},
	
	exportTo: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
    	
        var cfg = Ext.merge({
            title: me.MAIN_STORE_NAME,
            fileName: 'Rehandle' + '.' + (btn.cfg.ext || btn.cfg.type)
        }, btn.cfg);

        var grid = refs.refRehandleGrid;
        grid.saveDocumentAs(cfg);
    },
	/**
	 * Rehandle DETAIL END
	 * =========================================================================================================================
	 */

	 /*
	 * HHT TABLET START 
	 * ===============================================================
	 * */

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	JPVCNo:'',
	NONCALLID:'NonCallId',
	WORKDATE:'',
	SHFTID:'',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onTblLoad: function () {
		var me = this;
		var refs = me.getReferences();
		me.WORKDATE = Ext.Date.format(MOST.config.Token.getWorkDate(), 'd/m/Y');
		me.SHFTID = MOST.config.Token.getWorkShift();
		theVessel = me.getViewModel().get('theVessel');
		me.JPVCNo = theVessel ? theVessel.vslCallId  : 'NonCallId';
		me.onSearchTbl();
		me.onLoadComboboxTbl();
	},
	getSearchConditionTbl: function(){
		var me = this;
     	var refs = me.getReferences();
		var jpvcNo = me.JPVCNo;
		var params = {
			vslCallId : jpvcNo,
		//	stRhdl: me.WORKDATE,
		//	endRhdl: me.WORKDATE
		//	col3 : 'RH',
		};
		if (me.getStore('categoryCombo').getCount() > 0)
		{
			params.opeClassCd = refs.refCboCategory.getValue();
		}
		if (me.getStore('cargoConditionCombo').getCount() > 0)
		{
			params.cgCoCd = refs.refCboCgCoCd.getValue();
		}
    	return params;
	},
	onSearchTbl: function(){
		var me = this;
		var refs = me.getReferences();
		var params = me.getSearchConditionTbl();
		var store = me.getStore('rehandleOperationlist');
		store.load({
			params: params
		});
	},
	onLoadingHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var item = refs.refRehandleOperationGridList.getSelection().data;
		var shift = me.getViewModel().get('globalWorkShiftInfo');
		var date = me.getViewModel().get('globalWorkDate').split('/');
		// convert dd/MM/yyyy to yyyyMMdd
		var shiftDt = date[2]+date[1]+date[0]
		var data = {
			vslCallId: me.JPVCNo,
			grNo: item.orgGrNo,
			cgNo: item.nxCgNo,
			cgTpCd: item.cgTpCd,
			shipgNoteNo: item.nxRefNo,
			jobCoCd: item.cgCoCd,
			rhdlNo: item.rhdlNo,
			orgVslCallId: item.orgVslCallId,
			orgCgNo: item.orgCgNo,
			cgCoCd: item.cgCoCd,
			spCaCoCd: item.spCaCoCd,
			opeClassCd: item.opeClassCd,
			rhdlGroupNo: item.rhdlGroupNo,
			orgRefNo: item.orgRefNo,
			orgBlSn: item.orgBlSn,
			shiftDt: shiftDt,
			shiftId: shift.shftId,
			searchType: 'HHT'
		}
		
		var title = 'Rehandle Loading Confirm';
		title += data.cgNo?' - '+data.cgNo:'';
		var params = {
			 data: data,
			 title: title
		}
		me.openCodePopup('popup-rehandleloadingpopuphht', 'refCboContractor', params);
	//	me.onSearchTbl();
	},
	onLoadComboboxTbl: function(){
		var me = this;
		var refs = me.getReferences();
		var comboStore = me.getStore('rehandleCombo');
		var categoryStore = me.getStore('categoryCombo');
		var cargoConditionStore = me.getStore('cargoConditionCombo');
		comboStore.load({
			params:{
				searchType : 'initComboList',
				screanNm : 'RHDL'
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						categoryStore.setData(records[0].get('categoryList'));
						cargoConditionStore.setData(records[0].get('cargoConditionList'))
						categoryStore.insert(0, [{scdNm: 'Select', scd: ''}]);
						cargoConditionStore.insert(0, [{scdNm: 'Select', scd: ''}]);
					}
				}
			}
		});
	},
	onCellClickTbl: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refRehandleOperationGridList;
		var item = grid.getSelection();
		if(item) 
		{
			refs.refBtnLoading.setDisabled(false);
		//	me.getViewModel().set('theRehandleItem', item.data);
		}
	},
	
	onWarehouseAllocation : function(controlName){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var selection = Ext.create('MOST.model.operation.CargoHandlingOut', {
			vslCallId: detailItem.get('vslCallId'),
			whTpCd:'G',
			catgCd : detailItem.get('catgCd'),
			blSn : detailItem.get('nxRefNo')
		});

		me.openCodePopup('app-warehouseallocationforrehandle',controlName, selection);	
	},
	
	onAssigningSearch:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theRRDetail');
		var unitsStackedListStore = me.getStore('unitsStackedListStore');
		var recvData = me.getDetailBizView().items.get(0).recvData;
		var searchType, blNo, shipgNoteNo;
		if(recvData.get('caTgCd') != null && recvData.get('caTgCd') == 'I'){
			searchType = 'WHIP';
			blNo = recvData.get('orgRefNo');
		}else{
			shipgNoteNo = recvData.get('orgRefNo');
		}
		unitsStackedListStore.load({
			params:{
				vslCallId : recvData.get('vslCallId'),
				catgCd: recvData.get('caTgCd'),
				searchType: searchType,
				shipgNoteNo : shipgNoteNo,
				blNo : blNo
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						records.forEach(function(record){
							record.set('blSnNo', record.get('cgNo'));
						})
						unitsStackedListStore.commitChanges();
					}
				}
			}
		});
	},
	
	// Operation Mode Rehandle Mode Change
	onChangeRehandleModeForRORO: function(combo, value, obj){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theRRDetail');
		var recvData = detailView.items.get(0).recvData;

		var isChangeVSL = false, isRTS = false; //Change VSL, Return to Shipper.
		if(value === 'C'){
			isChangeVSL = true;
			detailItem.set('nxRefNo', recvData.get('orgRefNo'));
		}else if(value === 'R'){
			isRTS = true;
			refs.ctlRehandleROROOpModeNextJpvc.setValue();
		}
		refs.ctlRehandleROROOpModeNextJpvc.setEditableControl(isChangeVSL);		
	},
	
	// Operation Mode Rehandle Mode Change For RORO
	onOpModeNextSnChangeForRORO : function(combo, value, obj){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRRDetail');
		var opModeNextGrNoCombo = me.getStore('rehandleOpModeNextSnNoCombo');
		
		if(!StringUtil.isNullorEmpty(value)){
			opModeNextGrNoCombo.load({
				params:{
					vslCallId : detailItem.get('nxVslCallId'),
					shipgNoteNo : value
				},
				callback: function(records, operation, success) {
					if (success) {
						if(records != null && records.length > 0){
						}
					}
				}
			});
		}
	},
	
	onSave: function () {
		var me = this;
		var refs = me.getReferences();
		var assignStore = me.getStore('rehandleROROOperationModeStore');
		var validate = true;
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.set('items', new Array());
		var unitNoGrid = me.lookupReference('refROROUnitsList');
		var selections = unitNoGrid.getSelection() == null ? null : unitNoGrid.getSelection();
		
		if (selections == null) return;
		
		for (var i = 0; i < assignStore.totalCount; i++) {
			for (var j = 0; j < selections.length; j++) {
				var blSnNo = selections[j].data.blSnNo;
				var unitNo = selections[j].data.unitNo;
				
				if (blSnNo == assignStore[i].data.blSnNo && unitNo == assignStore[i].data.unitNo) {
					validate = false;
				}
			}
		}
			
		if (validate) {
			for (var i = 0; i < selections.length; i++) {
				var item = Ext.create('MOST.model.operation.RehandleGC');
				var unitNo = selections[i].data.unitNo;
				var detailItem = me.getViewModel().get('theRRDetail');
				var detailView = me.getDetailBizView();
				var recvData = detailView.items.get(0).recvData;
				var orgCatgCd = recvData.get('caTgCd');
				
				var addItem = recvData.clone();
				recvData.commit();
				
				if(me.isNotValidofRORO(selections[i])){
					return;
				}

				if(detailItem.get('rhdlMode') === 'C'){
					addItem.set('nxVslCallId', detailItem.get('nxVslCallId'));
					addItem.set('nxRefNo', detailItem.get('nxRefNo')); //SN
					if(orgCatgCd === 'E' || orgCatgCd === 'S'){
						addItem.set('opeClassCd', 'X'); //From SN
					}else if(orgCatgCd === 'T' || orgCatgCd === 'I'){
						addItem.set('opeClassCd', 'I'); //From Import/Transshipment Import.
					}
				} else {
					addItem.set('nxVslCallId', '');
					addItem.set('nxRefNo', '');
				}
				
				addItem.set('userId', MOST.config.Token.getUserId());
				addItem.set('portCd', MOST.config.Token.getPortCd());
				addItem.set('rhdlMode', detailItem.get('rhdlMode'));
				addItem.set('vslCd', selections[i].get('vslCd'));
				addItem.set('callYear', selections[i].get('callYear'));
				addItem.set('callSeq', selections[i].get('callSeq'));
				addItem.set('assignedQty', selections[i].get('rhdlPkgQty'));
				addItem.set('unitNo', selections[i].get('unitNo'));


				if(StringUtil.isNullorEmpty(addItem.get('rhdlNo'))){
					addItem.set('workingStatus', WorkingStatus.INSERT);
				} else {
					addItem.set('workingStatus', WorkingStatus.UPDATE);
				}
				updateParm.get('items').push(addItem.data);
			}
		}
		
		if (validate) {
			updateParm.getProxy().url = me.getStore('rehandlingUnitItems').getProxy().url;
			updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));

			updateParm.save({
				success: function (record, operation) {
					assignStore.commitChanges();
					MessageUtil.saveSuccess();
					assignStore.reload();
				}
			});
		} else {
			MessageUtil.warning('truckAssignmentOfRORO', 'data_assigned');
		}
	},
	
	onAssigningUnitsForRehandleAdd: function(){
		var me = this;
		var refs = me.getReferences();
		
		var grid = me.lookupReference('refROROUnitsList');
		var selectionArr = grid.getSelection() == null ? null : grid.getSelection();
		if(selectionArr == null) return;
		
		//1.Mandantory
		if(StringUtil.isNullorEmpty(refs.ctlRehandleOpModeRehandleMode.getValue())){
			MessageUtil.warning("warning_msg", "mandatoryField_msg", ViewUtil.getLabel('rehandleRehandleMode'));
			return;
		}
		if(refs.ctlRehandleOpModeRehandleMode.getValue() === 'C'){
			if(StringUtil.isNullorEmpty(refs.ctlRehandleROROOpModeNextJpvc.getValue())
					|| StringUtil.isNullorEmpty(refs.ctlRehandleOpModeSnNoCombo.getValue())){
				MessageUtil.warning("warning_msg", "msgCT246001");
				return;
			}
		}
		
		//2.Douplication check
		if(me.onDuplicatedValidation(selectionArr) && me.onMatchedInfoValidation(selectionArr)){
			if(refs.ctlRehandleOpModeRehandleMode.getValue() === 'C'){
				me.onNextSnValidation(selectionArr);
			}
			else {
				me.fncSuccessToAssignVin(selectionArr);
			}
		}
	},
	
	onAssigningUnitsForRehandleRemove: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('rehandleROROOperationModeStore');
		
		var grid = me.lookupReference('refRehandleROROOperationModeGrid');
		var selectionArr = grid.getSelection() == null ? null : grid.getSelection();
		if(selectionArr == null) return;
		
		Ext.each(selectionArr, function (record) {
			record.set('workingStatus', WorkingStatus.DELETE);
			record.set('action', WorkingStatus.DELETE);
			if(record.get('workingStatus') == WorkingStatus.DELETE)
				store.remove(record);
		});
		refs.ctlTxtAssignedQTy.setValue(store.data.length);
		
	},
	
	onNextSnValidation: function(arr){
		var me = this;
		var refs = me.getReferences();
		
		var store = me.getStore('validationCheck');
		store.load({
			params : {
				tyCd: 'CHECK_DUPLICATED_SN_FOR_RHDL',
				col1: refs.ctlRehandleROROOpModeNextJpvc.getValue(),
				col2: refs.ctlRehandleOpModeSnNoCombo.getValue()
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
	
	
	fncSuccessToAssignVin: function(arr){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('rehandleROROOperationModeStore');	
		for(var i = 0; i < arr.length; i++){
			var record = Ext.create('MOST.model.operation.RehandlingOfRORO');
			//var record = me.recvItem.copy();
			record.set('vslCallId', arr[i].get('vslCallId'));
			record.set('docNo', arr[i].get('docNo'));
			record.set('cargoNo', arr[i].get('cgNo'));
			record.set('catgCd', arr[i].get('catgCd'));
			record.set('catgNm', arr[i].get('catgNm'));
			record.set('unitNo', arr[i].get('unitNo'));
			record.set('brandCd', arr[i].get('brandCd'));
			record.set('brandNm', arr[i].get('brandNm'));
			record.set('unitM3', arr[i].get('cbm'));
			record.set('docWgt', arr[i].get('docWgt'));
			record.set('ixCd', arr[i].get('ixCd'));
			record.set('rhdlModeCd', refs.ctlRehandleOpModeRehandleMode.getValue());
			
			record.set('userId', Token.getUserId());
			record.set('workingStatus', WorkingStatus.INSERT);
			record.set('action', WorkingStatus.INSERT);
			
			if(refs.ctlRehandleOpModeRehandleMode.getValue() === 'C'){
				record.set('shipgNoteNo', refs.ctlRehandleOpModeSnNoCombo.getValue());
				record.set('bookingNo', arr[i].get('docNo'));
				record.set('nextVslCallId', refs.ctlRehandleROROOpModeNextJpvc.getValue());
			}
			
			if(me.cudFlag === WorkingStatus.convertInt(WorkingStatus.UPDATE)){
				record.set('rhdlNo', me.recvItem.get('rhdlNo'));
				record.set('rhdlGroupNo', me.recvItem.get('rhdlGroupNo'));
			}

			store.insert(0, record);	
		}

		refs.ctlTxtAssignedQTy.setValue(store.data.length);
	},
	
	
	//Validation
	onDuplicatedValidation: function (arr){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('rehandleROROOperationModeStore');
		
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
		var store = me.getStore('rehandleROROOperationModeStore');
		
		if(store.data.length == 0){
			return true;
		}
		
		for(var i = 0; i < arr.length; i++){
			for(var j = 0; j < store.data.length; j++){
				if(refs.ctlRehandleOpModeRehandleMode.getValue() != store.data.items[j].get('rhdlMode')
						|| refs.ctlRehandleROROOpModeNextJpvc.getValue() != store.data.items[j].get('nxVslCallId')
						|| (!StringUtil.isNullorEmpty(refs.ctlRehandleOpModeSnNoCombo.getValue()) && refs.ctlRehandleOpModeSnNoCombo.getValue() != store.data.items[j].get('nxRefNo'))){
					MessageUtil.warning('warning_msg', 'msgCT246005');
					return false;
				}
			}
		}
		return true;
	},
	
	 /*
	 * HHT TABLET END 
	 * ===============================================================
	 * */
});