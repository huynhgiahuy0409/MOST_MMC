Ext.define('MOST.view.operation.RehandlingOfGCController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.rehandle1',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	CARGO_REHANDLING_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandlingofgc/cargoRehandling',
	MAX_PERIOD_DAY : 62,	// MAX PERIOD DATE
	SHIPPING_AGENCY : CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY,
	FORWARDER : CONSTANTS.PTNR_TYPE_FORWARDER,
	MAIN_GRID_REF_NAME: 'refRehandleGrid',
	MAIN_STORE_NAME: 'rehandle',
	PARAMETTER_CHECK_REHANDLE_MODE_STORE: 'rehandleModeCombo',
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
						
						categoryStore.insert(0, [{scdNm: 'Select', scd: ''}]);
						rehandleModeSearchStore.insert(0, [{scdNm: 'Select', scd: ''}]);
					}
				}
			}
		});
		
		me.setDateInDays('ctlEstArrFromDt');
		var searchParm = Ext.create('MOST.model.operation.SearchRehandlingOfGCParm');
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
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
    	var store = me.getStore('rehandle');
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
				}
			}
		});
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
    	var grid = me.lookupReference('refRehandleGrid');
		if(grid.getSelection() == null ? null : grid.getSelection()[0]){
			me.getViewModel().set('selectedItem', grid.getSelection()[0]);
		}	
	},
	// Grid Row Double
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference('refRehandleGrid');
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		me.getView().detailViewAlias = 'app-rehandledetail';
		me.openDetailPopup(selection);
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
	
	// Rehandle Button
	onRehandle:function(){
		var me = this;
		var title = {type: 'bundle', key: 'rehandleOperationModeTitle'};
		var grid = me.lookupReference('refRehandleGrid');
		var selections = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selections.length === 0 || selections == null){
			MessageUtil.warning('warning_msg', 'select_list_msg');
			return;
		} else {
			me.getView().detailViewAlias = 'app-rehandleoperationmodepopup';
			me.openDetailPopup(selections, title);
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
		
		if(targetControl === 'ctlRehandleJpvc'){ // JPVC
			refs.ctlRehandleSn.setValue(null);
			refs.ctlRehandleBl.setValue(null);
			
			if(returnValue){
				me.searchJpvcSnBlList(returnValue.code, 'sn/bl');
			} else {
				snNoCombo.removeAll();
				snNoCombo.commitChanges();
				
				blNoCombo.removeAll();
				snNoCombo.commitChanges();
			}
		} else if(targetControl === 'ctlRehandleNextJpvc'){ // Next JPVC
			refs.ctlRehandleNextSn.setValue(null);
			
			if(returnValue){
				me.searchJpvcNextSnList(returnValue.code, 'nxSn');
			} else {
				nextSnNoCombo.removeAll();
				nextSnNoCombo.commitChanges();
			}
		} else if(targetControl === 'ctlRehandleOpModeNextJpvc'){ // Next JPVC
			if(returnValue){
				var detailView = me.getDetailBizView();
				var recvData = detailView.items.get(0).recvData;
				opModeNextSnNoCombo.load({
					params:{
						vslCallId : returnValue.code,
						opeClassCd: (recvData != null && recvData.length > 0) ? recvData[0].get('opeClassCd') : 'T'
					}
				});
			}
		}
	},
	
	// Search S/N, B/L List
	searchJpvcSnBlList : function(jpvc, searchType){
		var me = this;
		var store = me.getStore('snBlCombo');
		var snNoCombo = me.getStore('rehandleSnNoCombo');
		var blNoCombo = me.getStore('rehandleBlNoCombo');
		
		store.load({
			params:{
				vslCallId : jpvc,
				searchType : searchType
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						snNoCombo.setData(records[0].get('snList'));
						blNoCombo.setData(records[0].get('blList'));
						
						snNoCombo.insert(0, [{scdNm: 'Select', shipgNoteNo: ''}]);
						blNoCombo.insert(0, [{scdNm: 'Select', blNo: ''}]);
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
     	var vslCallId = StringUtil.toUpperCase(searchParm.data.vslCallId);
     	var nxVslCallId = StringUtil.toUpperCase(searchParm.data.nxVslCallId);
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
		params['rhdlMode'] = rhdlMode;
		params['nxVslCallId'] = nxVslCallId;
		params['nxRefNo'] = nxRefNo;
		params['opeClassCd'] = opeClassCd;
		params['blNo'] = blNo;
		params['shipgNoteNo'] = shipgNoteNo;
		params['vslCallId'] = vslCallId;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
     	
    	if(dateCondition != null && 
			StringUtil.isNullorEmpty(vslCallId) &&
			StringUtil.isNullorEmpty(nxVslCallId)){
			params['estArrvDateFrm'] = dateCondition.fromDtString;
			params['estArrvDateTo'] = dateCondition.toDtString;
    	}
    	
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
	onOperationModeDetailLoad:function(){
		var me = this;
		var detailItem = new Ext.create('MOST.model.operation.RehandlingOfGC');
		
		detailItem.phantom = false; // UPDATE
		detailItem.commit();
		me.getViewModel().setData({theDetail:detailItem});
		me.setComboBoxWithLocalCache(CacheServiceConstants.REHANDLE_MODE_COMBO, me.PARAMETTER_CHECK_REHANDLE_MODE_STORE); 
		me.setDetailInitialize();
	},
	
	// Detail Initialize
	setDetailInitialize : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var sumQty = 0;
		var sumWgt = 0;
		var sumMsrmt = 0;
		var sumRhdlQty = 0;
		var sumRhdlWgt = 0;
		var sumRhdlMsrmt = 0;
		
		if(recvData.length > 1){
			refs.ctlRehandleOpModePartialOperation.setValue(true);
		} else {
			refs.ctlRehandleOpModePartialOperation.setValue(false);
		}
		
		recvData.forEach(function(record){
			sumQty += record.get('pkgQty');
			sumWgt += record.get('wgt');
			sumMsrmt += record.get('msrmt');
			sumRhdlQty += record.get('rhdlPkgQty');
			sumRhdlWgt += record.get('rhdlWgt');
			sumRhdlMsrmt += record.get('rhdlMsrmt');
		});
		
		detailItem.set('pkgQty', sumQty);
		detailItem.set('wgt', sumWgt);
		detailItem.set('msrmt', sumMsrmt);
		detailItem.set('rhdlPkgQty', sumRhdlQty);
		detailItem.set('rhdlWgt', sumRhdlWgt);
		detailItem.set('rhdlMsrmt', sumRhdlMsrmt);
	},
	
	// Operation Mode Rehandle Mode Change
	onOpModeRehandleModeChange : function(combo, value, obj){
		var me = this;
		var refs = me.getReferences();
		
		if(value === 'C'){
			refs.ctlRehandleOpModeNextJpvc.setEditableControl(true);
			refs.ctlRehandleOpModeSnNoCombo.setReadOnly(false);
		} else {
			refs.ctlRehandleOpModeNextJpvc.setEditableControl(false);
			refs.ctlRehandleOpModeSnNoCombo.setReadOnly(true);
		}
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
			me.cudData();
		}
	},
	
	// val()
	isNotValid : function(){
		var me = this;
		var detailItem = me.getViewModel().get('theDetail');
		
		var mt = detailItem.get('rhdlWgt');
		var m3 = detailItem.get('rhdlMsrmt');
		
		if(mt <= 0){
		  if(m3 <= 0){
		  	MessageUtil.warning('warning_msg', 'rehandle_amount_zero_msg'); // Amount value is zero
			 return true;
		  }
		}
		
		if(StringUtil.isNullorEmpty(detailItem.get('rhdlMode'))){
			MessageUtil.warning('warning_msg', 'rehandle_input_rehandle_mode_msg'); // INPUT REHANDLE MODE
			return true;
		} else if (detailItem.get('rhdlMode') === 'C'){ //change vessel
			if(StringUtil.isNullorEmpty(detailItem.get('nxRefNo'))){
				MessageUtil.warning('warning_msg', 'rehandle_selected_shipping_note_no_msg'); // SELECTED SHIPPING NOTE NO
				return true;
			}
			
			if(StringUtil.isNullorEmpty(detailItem.get('nxCgNo'))){
				MessageUtil.warning('warning_msg', 'rehandle_gr_no_not_exist_msg'); // Gr No does not exsist
				return true;
			}
			
			return false;
		}
		
		return false;
	},
	
	// cudData
	cudData : function(){
		var me = this;
		var arrItems = new Array();
		var store = me.getStore('rehandle');
		var detailItem = me.getViewModel().get('theDetail');
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var addItem;
		
		if(me.isNotValid()){
			return;
		}
		
		recvData.forEach(function(record){
			addItem = record.clone();
			
			if(detailItem.get('rhdlMode') === 'C'){
				addItem.set('nxVslCallId', detailItem.get('nxVslCallId'));
				addItem.set('nxRefNo', detailItem.get('nxRefNo'));
				addItem.set('nxCgNo', detailItem.get('nxCgNo'));
			} else {
				addItem.set('nxVslCallId', '');
				addItem.set('nxRefNo', '');
			}
			
			addItem.set('userId', MOST.config.Token.getUserId());
			addItem.set('rhdlMode', detailItem.get('rhdlMode'));
			
			if(StringUtil.isNullorEmpty(addItem.get('rhdlNo'))){
				addItem.set('workingStatus', WorkingStatus.INSERT);
			} else {
				addItem.set('workingStatus', WorkingStatus.UPDATE);
			}
			
			arrItems.push(addItem.data);
		});
		
		var proxy = detailItem.getProxy();
		proxy.url = me.CARGO_REHANDLING_PROXY_URL;
		
		detailItem.set('items', arrItems);
		detailItem.set('vslCallId', recvData[0].get('vslCallId'));
		detailItem.set('orgRefNo', recvData[0].get('orgRefNo'));
		detailItem.set('opeClassCd', recvData[0].get('opeClassCd'));
		detailItem.set('cgNo', recvData[0].get('cgNo'));
		detailItem.set('cgCoCd', recvData[0].get('cgCoCd'));
		detailItem.set('orgGrNo', recvData[0].get('orgGrNo'));
		detailItem.set('userId', MOST.config.Token.getUserId());
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var isCreated = detailItem.phantom;
		updateParm.getProxy().url = proxy.url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('item', detailItem.data);
		
		updateParm.save({
			success : function(){
				store.reload();
				detailView.close();
				MessageUtil.saveSuccess(); // Success Message
			}
		});
		
//		detailItem.save({
//			success : function(){
//				store.reload();
//				detailView.close();
//				MessageUtil.saveSuccess(); // Success Message
//			}
//		});
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
		var store = me.getStore('rehandleDetailList');

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
	
	// Rehandle Detail Remove
	onRehandleDetailRemove:function(){
		var me = this;
		var grid = me.lookupReference('refRehandleDetailGrid');
		var store = me.getStore('rehandleDetailList');
		var deleteItems = new Array();
		var selections = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selections == null || selections.length == 0) return;
		
		selections.forEach(function(record, index){
			record.set('workingStatus', WorkingStatus.DELETE);
			deleteItems.push(record.data);
		});
		
		MessageUtil.question('remove', 'infodelete_msg', null,
			function(button){
				if (button === 'ok') {
					me.deleteProcessForRehandleDetail(deleteItems, selections);
				}
			}
		);
	},
	
	// Rehandle Detail Delete
	deleteProcessForRehandleDetail : function(deleteItems, selections){
		var me = this;
		var masterStore = me.getStore('rehandle');
		var store = me.getStore('rehandleDetailList');
		var updateItem = Ext.create('MOST.model.operation.RehandlingOfGC');
		
		if(deleteItems.length > 0){
			var proxy = updateItem.getProxy();
			proxy.url = me.CARGO_REHANDLING_PROXY_URL;
			
			updateItem.set('items', deleteItems);
			updateItem.phantom = false;
			updateItem.drop();
			
			updateItem.save({
				success : function(record, operation) {
					store.remove(selections);
					store.commitChanges();
					masterStore.reload();
					MessageUtil.saveSuccess(); // Success Message
				}
			});
		}
	},
	
	exportTo: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
    	
        var cfg = Ext.merge({
            title: 'Rehandle',
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
		}
	},
	

	 /*
	 * HHT TABLET END 
	 * ===============================================================
	 * */
});