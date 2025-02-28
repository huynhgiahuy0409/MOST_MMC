Ext.define('MOST.view.document.TerminalHoldReleaseControlController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
        'Ext.exporter.text.CSV',
        'Ext.exporter.text.TSV',
        'Ext.exporter.text.Html',
        'Ext.exporter.excel.Xml',
        'Ext.exporter.excel.Xlsx'
    ],

	alias: 'controller.terminalholdreleasecontrol',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refTerminalHoldReleaseControlGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'terminalHoldReleaseControl',			// Main Store Name
	HISTORY_GRID_REF_NAME: 'refTerminalHoldReleaseControlHistoryGrid',  // History Grid Name 
	HISTORY_STORE_NAME: 'terminalHoldReleaseControlHistory',			// History Store Name
	HOLD_RELEASE_STATUE_STORE: 'statusCombo',
	opToBeStoppedCd: '',
	holdReasonDesc: '',
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
		var searchParm = Ext.create('MOST.model.document.SearchTerminalHoldReleaseControlParm');

		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		//Not to auto bind value for created date in search field
//		me.setDateInDays('ctlFromDt',-14);
//		me.setDateInDays('ctlToDt',0);
		
		var recvData = me.getView().recvData;
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.HOLD_RELEASE_STATUS_COMBO, me.HOLD_RELEASE_STATUE_STORE);
	},
	
	onDetailLoad: function() {
		var me = this;
		var detailView = me.getDetailBizView();
		var infoForm = detailView.down('form').getForm();
		
		infoForm.isValid(); // Mandatory to appear red for.
		
		me.setDetailInitialize();
		
		me.updateViewStyle(me.getDetailBizView());
	},
	
	onHoldLoad: function() {
		var me = this;
		var detailView = me.getDetailBizView();
		var infoForm = detailView.down('form').getForm();
		
		infoForm.isValid(); // Mandatory to appear red for.
		
		me.setHoldInitialize();
		
		me.updateViewStyle(me.getDetailBizView());
	},
	
	onReleaseLoad:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var infoForm = detailView.down('form').getForm();
		
		infoForm.isValid(); // Mandatory to appear red for.
		
		me.setReleaseInitialize();
		
		me.updateViewStyle(me.getDetailBizView());
	},
	
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
     	var store = this.getStore(me.MAIN_STORE_NAME);
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if(records.length === 0){
						MessageUtil.info('info_msg','data_not_found_msg');
					}
				}
			}
		});
	},
	
	onDblClick: function() {
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
    	var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
				
		me.getView().detailViewAlias = 'app-terminalholdreleasecontrolhistory';
		me.openDetailPopup(selection ,'Terminal Hold/Release Control History');

	},
	
	onRefresh:function(){
		var me = this;
		var refs = me.getReferences();
		var store = this.getStore(me.MAIN_STORE_NAME);
		var masterBlStore = this.getStore('masterBlItems');
		var blStore = this.getStore('blItems');
		var bookingNoStore = this.getStore('bookingNoItems');
		var snStore = this.getStore('snNoItems');
		
		refs.ctlFromDt.setValue("");
		refs.ctlToDt.setValue("");
		refs.ctlVslCallId.setValue("");

		refs.ctlMasterBlCombo.setValue("");
		refs.ctlBlCombo.setValue("");
		refs.ctlBookingNo.setValue("");
		refs.ctlSnNo.setValue("");
		refs.ctlStatusCombo.setValue("");
		
		masterBlStore.removeAll();
		blStore.removeAll();
		bookingNoStore.removeAll();
		snStore.removeAll();
		store.removeAll();
	},
    
    onSelectBookingNo: function(field, newValue, oldValue){
		var me = this;
		var refs = me.getReferences();
		
		me.getSnNoList();
	},
	
	onSelectMasterBl: function(field, newValue, oldValue){
		var me = this;
		var refs = me.getReferences();
		
		me.getBlNoList();
	},
	
	onSelectHoldReason: function(field, newValue, oldValue){
		var me = this;
		var refs = me.getReferences();
		var operationStopedCombo = me.getStore('operationStopedCombo');
		
		me.holdReasonDesc = newValue.get('scdNm');
		
		operationStopedCombo.load({
			params: {
				holdReasonCd :  newValue.get('scd')
			},
			callback:function(records,success){
				if (success) {
					refs.ctlOpeartionToBeStoped.setValue(records[0].get('scd'));
					me.opToBeStoppedCd = records[0].get('scd');
				}
			}
		});
	},
	
	onSelectHoldOprStoped : function(field, newValue, oldValue){
		var me = this;
		var refs = me.getReferences();
		
		me.opToBeStoppedCd = newValue.get('scd');
	},
	
	onAddHold: function() {
		
		var me = this;
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theDetail');
		
		if(detailView){
			var infoForm = detailView.down('form').getForm();
			
			if(infoForm.isValid()){
				me.saveProcess();
			} else {
				MessageUtil.mandatoryFieldInValid();
			}
		}
	},
	
	// Server Save Process
	saveProcess:function(){
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var detailItem = me.getViewModel().get('theDetail');
		var detailView = me.getDetailBizView();
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.set('workingStatus', WorkingStatus.INSERT);
		updateParm.set('userId', MOST.config.Token.getUserId());
		
		detailItem.set("userId",MOST.config.Token.getUserId());
		detailItem.set("holdBy",MOST.config.Token.getUserId());
		detailItem.set("opToBeStopped",me.opToBeStoppedCd);
		detailItem.set("holdReasonDesc",me.holdReasonDesc);
		
		updateParm.set('item', detailItem.data);
		
		updateParm.save({
			success: function(record) {
				detailItem.set('version', record.get('newVersion'));
				detailItem.commit();
				
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
						if (button === 'ok') {
							detailView.close();
							me.onSearch();
						}
				});
			}
		});
	},
	
	onRemove: function(){
    	var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var deleteItems = new Array();
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection == null) {
			return;
		}
		
		if((!selection[0].get('holdCheck') && selection[0].get('holdReasonCd')  != "ABD") || selection[0].get('holdReasonCd') == 'ABD'){
			MessageUtil.warning('warning_msg', 'terminalHoldReleaseControl_cannotdelete_msg'); 
			return;
		}
		
		MessageUtil.question('remove', 'infodelete_msg', null,
			function(button){
				if (button === 'ok') {
					var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');

					deleteItems.push(selection[0].data);
					
					updateParm.getProxy().url = store.getProxy().url;
					updateParm.phantom = false;
					updateParm.drop();
					updateParm.set('workingStatus', WorkingStatus.DELETE);
					updateParm.set('items', deleteItems);
					updateParm.save({
						success : function(record, operation) {
							MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
								function(button){
									if (button === 'ok') {
										updateParm.commit();
										store.reload();
									}
							});
						}
					});
				}
			}
		);
    },
    
    onChecked: function (model, record, index, eOpts) {
    	var me = this;
		var refs = me.getReferences();
		
		if(eOpts.get('releaseCheck')){
			var me = this;
			var refs = me.getReferences();
			var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
			
			me.getView().detailViewAlias = 'app-terminalholdreleasecontrolrelease';
			me.openDetailPopup(eOpts, 'Release Hold');
		}else{
			
		}
	},
	
	// Detail Initialize
	setReleaseInitialize: function() {
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
		recvData.set('releaseRemark','');
		
		me.getViewModel().setData({theDetail:recvData});
	},
    
    onRelease:function(){
    	var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var detailItem = me.getViewModel().get('theDetail');
		var detailView = me.getDetailBizView();
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('userId', MOST.config.Token.getUserId());
		
		detailItem.set("userId",MOST.config.Token.getUserId());
		detailItem.set("releaseBy",MOST.config.Token.getUserId());
		detailItem.data.releaseCheck = 'Y';
		
		updateParm.set('item', detailItem.data);
		
		updateParm.save({
			success: function(record) {
				detailItem.set('version', record.get('newVersion'));
				detailItem.commit();
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
						if (button === 'ok') {
							detailView.close();
							me.onSearch();
						}
				});
			}
		});
    },
    
    onSave: function(){
    	var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var arr = new Array();
		var masterItem = Ext.create('MOST.model.document.TerminalHoldReleaseControl');
		
		store.getModifiedRecords().forEach(function(item, index, array){
			if(item.get('releaseCheck')){
		    	item.data.releaseCheck = 'Y';
		    }else{
		    	item.data.releaseCheck = 'N';
		    	item.data.releaseBy =  "";
		    	item.data.releaseDt = "";
		    	item.data.releaseRemark = "";
		    }
			
		    item.set("userId", MOST.config.Token.getUserId());
			arr.push(item.data);
		});
		
		if(arr.length == 0){
			MessageUtil.warning("Terminal Hold Release Control", "nothingchange_msg");
    		return;
		}
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('userId', MOST.config.Token.getUserId());
		updateParm.set('items', arr);
		
		updateParm.save({
			success: function(record) {
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
						if (button === 'ok') {
							me.onSearch();
						}
				});
			}
		});
    },
    
    onReleaseAbandonoLegal: function(){
    	var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		if(selection == null) return;
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('userId', MOST.config.Token.getUserId());
		
		selection[0].set("userId",MOST.config.Token.getUserId());
		selection[0].set("releaseBy",MOST.config.Token.getUserId());
		selection[0].set("releaseRemark",'Released');
		selection[0].data.releaseCheck = 'Y';
		
		updateParm.set('item', selection[0].data);
		
		updateParm.save({
			success: function(record) {
				selection[0].set('version', record.get('newVersion'));
				selection[0].commit();
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
						if (button === 'ok') {
							me.onSearch();
						}
				});
			}
		});
    },
    
    onCellClick:function(gridview, tdEl, cellIndex, record, trEl, rowIndex, e){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection == null) {
			return;
		}
		
		if(selection[0].data.holdReasonCd == 'ABD' && !selection[0].data.releaseCheck){
			refs.ctlAbandonoLegal.setDisabled(false);
		}else{
			refs.ctlAbandonoLegal.setDisabled(true);
		}
	},

	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.document.SearchTerminalHoldReleaseControlParm';
		searchBizParm.serviceID = 'MOST.terminalHoldReleaseControl.selectTerminalHoldReleaseList'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	
	openHoldPopup:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection.length == 0) {
			return;
		}
		
		me.getView().detailViewAlias = 'app-terminalholdreleasecontrolhold';
		me.openDetailPopup(selection, 'Create Hold');
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
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.MAIN_STORE_NAME);
    	var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
    	var pageNo = store.currentPage;
    	var sizePerPage = CommonConstants.PAGE_SIZE;
    	var searchParm = me.getViewModel().get('theSearch');
    	var params = me.createParam(searchParm);
    	
    	if(searchParm.data.vslCallId == ''){
        	MessageUtil.warning("Terminal Hold Release Control", "customsCargoReleaseControl_vslCallId_msg");
    		return;
        }
     	
     	var dtFromVal = Ext.Date.format(refs.ctlFromDt.getValue(), MOST.config.Locale.getShortDate());
     	var dtToVal = Ext.Date.format(refs.ctlToDt.getValue(), MOST.config.Locale.getShortDate());

        params['vslCallId'] = searchParm.data.vslCallId;
		params['startDate'] = dtFromVal;
		params['endDate'] = dtToVal;
		params['blNo'] = searchParm.data.bl;
		params['masterBl'] = searchParm.data.masterBL;
		params['snNo'] = searchParm.data.snNo;
		params['bookingNo'] = searchParm.data.bookingNo;
		params['status'] = searchParm.data.status;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
     	
    	return params;
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var mainItem = me.getView().getViewModel().get('theMain');
		var refs = me.getReferences();
		
		if(targetControl === 'ctlVslCallId'){
			if(returnValue){
				me.getMasterBlNoList();
				me.getBlNoList();
				me.getBookingNoList();
				me.getSnNoList();
			}else{
			}
		}else if(targetControl === 'ctlVinNo'){
			if(returnValue){
				refs.ctlVinNo.setValue(returnValue)
			}else{
			}
		}
	},
	
	// Detail Initialize
	setDetailInitialize: function() {
		var me = this;
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var store = me.getStore(me.HISTORY_STORE_NAME);
    	var grid = me.lookupReference(me.HISTORY_GRID_REF_NAME);
    	
    	store.load({
			params: {
				vslCallId : recvData.data.vslCallId,
				docNo : recvData.data.docNo,
				seq : recvData.data.seq,
				ie : recvData.data.ie,
				cgNo : recvData.data.cgNo
			}
		});
	},
	
	// Detail Initialize
	setHoldInitialize: function() {
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData[0];
		var holdReasonCombo = me.getStore('holdReasonCombo');
		var operationStopedCombo = me.getStore('operationStopedCombo');
		
		operationStopedCombo.load();
		
		holdReasonCombo.load();
		
		recvData.set('holdReasonCd','');
		recvData.set('vinNo','');
		recvData.set('opToBeStoppedNm','');
		recvData.set('holdRemark','');
		
		me.getViewModel().setData({theDetail:recvData});
	},

	
	getMasterBlNoList: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var store = me.getStore('masterBlItems');
		
		store.load({
			params: {
				vslCallId : searchParm.data.vslCallId
			}
		});
	},
	
	getBookingNoList: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var store = me.getStore('bookingNoItems');
		
		store.load({
			params: {
				vslCallId : searchParm.data.vslCallId
			}
		});
	},
	
	getBlNoList: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var store = me.getStore('blItems');
		
		store.load({
			params: {
				vslCallId : searchParm.data.vslCallId,
				mfDocNo: searchParm.data.masterBL
			}
		});
	},
	
	getSnNoList: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var store = me.getStore('snNoItems');
		
		store.load({
			params: {
				vslCallId : searchParm.data.vslCallId,
				mfDocNo: searchParm.data.bookingNo
			}
		});
	},
	
	openUnitNoPopup: function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theDetail');
		var params = {
			vslCallId: detailItem.data.vslCallId,
			docNo: detailItem.data.docNo,
			ie: detailItem.data.ie,
        }
		
		me.openCodePopup('popup-unitnopopup', 'ctlVinNo', params);
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * DETAIL START
	 */

	/**
	 * ISPS END
	 * =========================================================================================================================
	 */
});