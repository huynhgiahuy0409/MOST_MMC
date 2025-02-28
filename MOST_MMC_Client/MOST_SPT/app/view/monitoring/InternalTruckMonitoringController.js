Ext.define('MOST.view.monitoring.InternalTruckMonitoringController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.internaltruckmonitoring',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_DATE_PERIOD: 15,	// MAX PERIOD DATE
	MAIN_GRID_REF_NAME: 'ITMListGrid',
	MAIN_STORE_NAME: 'internalTruckMonitoringList',
	PARAMETTER_LOADING_COMPARE_COMBO_STORE: 'loadingCompareCombo',
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
		var searchParm = Ext.create('MOST.model.monitoring.SearchInternalTruckMonitoringParm');

		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		var warehouseListCombo = me.getStore('warehouseListCombo');
		warehouseListCombo.load();
		
		me.setDateInDays("ctlConfirmFromDt", -me.MAX_DATE_PERIOD);
		me.setDateInDays("ctlConfirmToDt", me.MAX_DATE_PERIOD);

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
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
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
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var refs = me.getReferences();
		var searchBizParm = me.getSearchCondition();
		searchBizParm.classID = 'com.tsb.most.biz.parm.monitoring.SearchInternalTruckMonitoringParm';
		searchBizParm.serviceID = 'MOST.internalTruckMonitoring.selectInternalTruckMonitoringList';

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
	// Popup is closed and receives return value
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl == 'refITMVslCallId') {
			if(returnValue){
				me.getViewModel().setData({theVsl:returnValue.item});
				refs.ctlBookingNoCombo.setDisabled(false);
				me.searchBookingNoCombo(returnValue.item);
				
				me.getSnComboItems();
				me.getBlComboItems();
			}
			else {
				me.getViewModel().setData({theVsl:null});
			}
		}
		//refs.refITMVslCallId.blur();
	},
	
	searchBookingNoCombo:function(record){
		var me = this;
		var refs = me.getReferences();
		var storeBooking = me.getStore('bookingNoCombo');
		var storeBl = me.getStore('masterBlNoCombo');
		var vslCallId = refs.refITMVslCallId.getValue();
		
		if(record){
			storeBooking.load({
				params: {
					vslCallId: vslCallId
				}
			});
			storeBl.load({
				params: {
					vslCallId: vslCallId
				}
			});
		}
	},
	

	onSelectBookingNoCombo: function(){
		var me = this;
		var refs = me.getReferences();
		var vslCallId = refs.refITMVslCallId.getValue();
		var bookingNo = refs.ctlBookingNoCombo.getValue();
		var mBlNo = refs.ctlMBlNoCombo.getValue();

		refs.refITMBlNo.setValue('');
		refs.refITMSnNoCombo.setValue('');
		
		refs.refITMGrNo.setValue('');
		refs.refITMSdoNo.setValue('');
		
		if(bookingNo != null && bookingNo != ''){
			refs.ctlMBlNoCombo.setValue('');
			me.getSnComboItems();
		}
		if(mBlNo != null && mBlNo != ''){
			refs.ctlBookingNoCombo.setValue('');
			me.getBlComboItems();
		}
	},

	getSnComboItems: function(){
		var me = this;
		var refs = me.getReferences();
		var vslCallId = refs.refITMVslCallId.getValue();
		var snCombo = me.getStore('snListCombo');
		
		snCombo.removeAll();
		
		snCombo.load({
			params : {
				vslCallId: vslCallId,
				mfDocNo: refs.ctlBookingNoCombo.getValue()
			}
		});
	},
	
	getBlComboItems: function(){
		var me = this;
		var refs = me.getReferences();
		var vslCallId = refs.refITMVslCallId.getValue();
		var blCombo = me.getStore('blListCombo');
		
		blCombo.removeAll();
		blCombo.load({
			params : {
				vslCallId: vslCallId,
				mfDocNo: refs.ctlMBlNoCombo.getValue()
			}
		});
	},
	
	onSelectSnCombo: function(){
		var me = this;
		var refs = me.getReferences();
		var grListStore = me.getStore('grListCombo');
		var vslCallId = refs.refITMVslCallId.getValue();
		var mfDocId = refs.ctlBookingNoCombo.getValue();
		var shipgNoteNo = refs.refITMSnNoCombo.getValue();
		
		refs.refITMGrNo.setValue('');
		grListStore.removeAll();

		if(shipgNoteNo != null && shipgNoteNo != ''){
			refs.refITMGrNo.setDisabled(false);
			
			grListStore.load({
				params: {
					vslCallId : vslCallId,
					mfDocId: mfDocId,
					shipgNoteNo : shipgNoteNo
				}
			});			
		}else {
			grListStore.removeAll();
			refs.refITMGrNo.setDisabled(true);
		}
	},
	
	onSelectBlNoCombo: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('subDoCombo');
		var vslCallId = refs.refITMVslCallId.getValue();
		var mfDocId = refs.ctlBookingNoCombo.getValue();
		var blNo = refs.refITMBlNo.getValue();
		
		refs.refITMSdoNo.setValue('');
		store.removeAll();
		
		if(blNo != null && blNo != ''){	
			refs.refITMSdoNo.setDisabled(false);
			
			store.load({
				params: {
					vslCallId : vslCallId,
					mfDocId: mfDocId,
					blNo : blNo
				}
			});
		}else{
			store.removeAll();
			refs.refITMSdoNo.setDisabled(true);	
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
    	params['confirmDtFromDt'] = Ext.Date.format(refs.ctlConfirmFromDt.getValue(), 'd/m/Y H:i');
    	params['confirmDtToDt'] = Ext.Date.format(refs.ctlConfirmToDt.getValue(), 'd/m/Y H:i');
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
    	return params;
	},
	
/*
 * INITIALIZE 	END
 * =========================================================================================================================
 */
});