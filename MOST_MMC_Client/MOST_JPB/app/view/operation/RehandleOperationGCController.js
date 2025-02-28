Ext.define('MOST.view.operation.RehandleOperationGCController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	
	],

	alias: 'controller.rehandleoperationlist',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_PERIOD_DAY : 62,	// MAX PERIOD DATE
	SHIPPING_AGENCY : 'SHA',
	FORWARDER : 'FWD',
	MAIN_GRID_REF_NAME: 'refRehandleOperationGrid',
	MAIN_STORE_NAME: 'rehandleOperationList',
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
		var rehandleModeStore = me.getStore('rehandleModeCombo');
		var cargoConditionStore = me.getStore('cargoConditionCombo');
		var specCargoConditionStore = me.getStore('specCargoConditionCombo');
		
		comboStore.load({
			params:{
				searchType : 'initComboList',
				screanNm : 'RHDL'
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						categoryStore.setData(records[0].get('categoryList'));
						rehandleModeStore.setData(records[0].get('rehandlingModeList'));
						cargoConditionStore.setData(records[0].get('cargoConditionList'));
						specCargoConditionStore.setData(records[0].get('specialCgList'));
					}
				}
			}
		});
		var searchParm = Ext.create('MOST.model.operation.SearchRehandleOperationParm');
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
	},
	
	// Combo Setting
	setCombo : function(masterItem){
		var me = this;
		var refs = me.getReferences();

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
    	var rehandleOperationList = me.getStore('rehandleOperationList');
    	
    	var chkNonJpvc = refs.chkNonJpvc;
    	var ctlRehandleJpvc = refs.ctlRehandleJpvc;
    	var dtRehandleFrom = refs.dtRehandleFrom;
    	var dtRehandleTo = refs.dtRehandleFrom;
    	var dtEstArrvDtFrom = refs.dtEstArrvDtFrom;
    	var dtEstArrvDtTo = refs.dtEstArrvDtTo;
    	
    	var isNonJpvc = chkNonJpvc.checked;
    	
    	if(!isNonJpvc){
    		if(ctlRehandleJpvc.getValue() != "" && ctlRehandleJpvc.getValue() != null){
    			dtRehandleFrom.setValue('');
    			dtRehandleTo.setValue('');
    		}
    		
    		if(ctlRehandleJpvc.getValue() == ""){
    			if((dtRehandleFrom.getValue() == ""|| dtRehandleFrom.getValue() == null) && (dtRehandleTo == "") || dtRehandleTo.getValue() == null){
    				MessageUtil.info('info_msg','confirmrehandleloading_warning_search_condition_msg');
        			return;
    			}
    		}
    	}else{
    		if(dtEstArrvDtFrom.getValue() == "" || dtEstArrvDtTo == ""){
    			MessageUtil.info('info_msg','confirmrehandleloading_warning_search_condition_msg');
    			return;
    		}
    	}
    	
    	var params = me.getSearchCondition();
    	
    	
    	
    	if(params == null){
    		return;
    	}
    	
    	rehandleOperationList.load({
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
	
	
	
	
	// Grid Row Double
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference('refRehandleOperationGrid');
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		me.setGridColumnEditable(selection.phantom);
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
						//blNoCombo.setData(records[0].get('blList'));
					}
				}
			}
		});
	},
	
	
	
	onNonJPVCChange: function(chk, newValue, oldValue, eOpts){
		var me = this;
     	var refs = me.getReferences();
		var dtEstArrvDtFrom = refs.dtEstArrvDtFrom;
		var dtEstArrvDtTo = refs.dtEstArrvDtTo;
		var btnFindNonJPVCSN = refs.btnFindNonJPVCSN;
		var cboNonJPVCSN = refs.cboNonJPVCSN;
		
		var ctlRehandleJpvc = refs.ctlRehandleJpvc;
		var ctlRehandleSn = refs.ctlRehandleSn;
		var txtGR = refs.txtGrNo;
		var dtRehandleFrom = refs.dtRehandleFrom;
		var dtRehandleTo = refs.dtRehandleTo;
		
		if(chk.value){
			dtEstArrvDtFrom.setDisabled(false);
			dtEstArrvDtTo.setDisabled(false);
			btnFindNonJPVCSN.setDisabled(false);
			cboNonJPVCSN.setDisabled(false);
			
			ctlRehandleJpvc.refs.ctlField.setDisabled(true);
			ctlRehandleJpvc.refs.ctlOpenPopupButton.setDisabled(true);
			ctlRehandleSn.setDisabled(true);
			txtGR.setDisabled(true);
			dtRehandleFrom.setDisabled(true);
			dtRehandleTo.setDisabled(true);
			
		}else{
			dtEstArrvDtFrom.setDisabled(true);
			dtEstArrvDtTo.setDisabled(true);
			btnFindNonJPVCSN.setDisabled(true);
			cboNonJPVCSN.setDisabled(true);
			
			ctlRehandleJpvc.refs.ctlField.setDisabled(false);
			ctlRehandleJpvc.refs.ctlOpenPopupButton.setDisabled(false);
			ctlRehandleSn.setDisabled(false);
			txtGR.setDisabled(false);
			dtRehandleFrom.setDisabled(false);
			dtRehandleTo.setDisabled(false);
		}
	},
	
	onFindNonJPVCSN:function(){
		var me = this;
		var refs = me.getReferences();
		
		var dtEstArrvDtFrom = refs.dtEstArrvDtFrom;
		var dtEstArrvDtTo = refs.dtEstArrvDtTo;
		
		
		if(dtEstArrvDtFrom.value == null || dtEstArrvDtFrom.value == null){
			MessageUtil.info('info_msg','rehandleoperation_estarrivaldate_empty_msg');
			return;
		};
		
		if(dtEstArrvDtFrom.getValue() > dtEstArrvDtTo.getValue()){
			MessageUtil.alert('Warning', 'validPeriod_msg');
			return false;
		};
		
		var store = me.getStore('shippingNoteNonJpvcGridList');
		var params = me.getSearchNonJPVCSNCondition();
		var nonJPVCSNComboStore = me.getStore('nonJPVCSNCombo');
		if(params != null){
			store.load({
				params: params,
	    			
	    			callback: function(records, operation, success) {
	    				if(success){
	    					nonJPVCSNComboStore.setData(records);
						}
	    			}
			})
		}
	},
	
	getSearchNonJPVCSNCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var fromEta = "";
     	var toEta  = "";
     	
     	var dateCondition = me.checkPeriodDate("dtEstArrvDtFrom", "dtEstArrvDtTo");
     	
    	if(dateCondition != null){
    		fromEta = dateCondition.fromDtString;
    		toEta = dateCondition.toDtString;
    		
     	}else{
     		return null;
     	}
    	
     	
    	var params = {
    		searchType : 'master',
    		snTp: 'NonJPVC',
    		vslCallId : 'NonCallId',
    		arrvDtFm: fromEta,
    		arrvDtTo: toEta,
    		
		};
    	
    	return params;
	},
	
	getSearchCondition:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var chkNonJpvc = refs.chkNonJpvc;
		var dtRehandleFrom = refs.dtRehandleFrom;
		var dtRehandleTo = refs.dtRehandleTo;
		var ctlRehandleSn = refs.ctlRehandleSn;
		var txtGrNo = refs.txtGrNo;
		var ctlRehandleJpvc = refs.ctlRehandleJpvc;
		var stRhdl = '';
		var endRhdl = '';
		var cboCategory = refs.cboCategory;
		var ctlRehandleRehandleMode = refs.ctlRehandleRehandleMode;
		var cboCGCondition = refs.cboCGCondition;
		var cboSpecCGCondition = refs.cboSpecCGCondition;
		
		if(chkNonJpvc.checked == false){
			var dateCondition = me.checkFromToDate("dtRehandleFrom", "dtRehandleTo", false);
			
			if(dateCondition != null){
				stRhdl = dateCondition.fromDtString;
				endRhdl = dateCondition.toDtString;
	    		
	     	}else{
	     		return;
	     	}
			var params = me.createParam(searchParm);
			params['vslCallId'] = StringUtil.toUpperCase(searchParm.data.vslCallId);
			params['blSn'] = ctlRehandleSn.getRawValue();
			params['grNo'] = txtGrNo.getValue();
			params['opeClassCd'] = cboCategory.getValue();
			params['rhdlMode'] = ctlRehandleRehandleMode.getValue();
			params['cgCoCd'] = cboCGCondition.getValue();
			params['spCaCoCd'] = cboSpecCGCondition.getValue();
			params['stRhdl'] = stRhdl;
			params['endRhdl'] = endRhdl;
			params['pageNo'] = pageNo;
			params['sizePerPage'] = sizePerPage;
			params['sort'] = grid.getSortString();
		}else{
			var dateCondition = me.checkFromToDate("dtEstArrvDtFrom", "dtEstArrvDtTo", true);
			
			if(dateCondition != null){
				stRhdl = dateCondition.fromDtString;
				endRhdl = dateCondition.toDtString;
	    		
	     	}else{
	     		return;
	     	}
			var params = me.createParam(searchParm);
			params['vslCallId'] = 'NonCallId';
			params['blSn'] = ctlRehandleSn.getRawValue();
			params['grNo'] = '';
			params['opeClassCd'] = cboCategory.getValue();
			params['rhdlMode'] = ctlRehandleRehandleMode.getValue();
			params['cgCoCd'] = cboCGCondition.getValue();
			params['spCaCoCd'] = cboSpecCGCondition.getValue();
			params['stRhdl'] = stRhdl;
			params['endRhdl'] = endRhdl;
			params['pageNo'] = pageNo;
			params['sizePerPage'] = sizePerPage;
			params['sort'] = grid.getSortString();
		}
		
		return params;
	},
	
	onDblClickForJobMonitoring: function(grid) {
		var me = this;
		var title = {type: 'bundle', key: 'jobMonitoringTitle'};
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		selection.set('parentAlias', 'app-rehandleoperationlist');
		me.getView().detailViewAlias = 'app-jobmonitoring';
		me.openDetailPopup(selection, title);
	},
	
	onOpenCargoOprSetting:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refRehandleOperationGrid;
		var chkNonJpvc = refs.chkNonJpvc;
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var ctlRehandleJpvc = refs.ctlRehandleJpvc;
		var shiftDataStore = me.getStore('shiftData');
		var shiftData = shiftDataStore.getAt(0);
		
		if(chkNonJpvc.checked){
			if(selection != undefined || selection != null){
				if(shiftData != null){
					var params = {
							vslCallId: selection.data.vslCallId,
							shiftDt: shiftDataStore.getAt(0).get('shiftDt'),
							shiftNo: shiftDataStore.getAt(0).get('shiftNo')
						};
				}else{
					var params = {
							vslCallId: selection.data.vslCallId
						};
				}
				
				
				me.openCodePopup('popup-cargooperationsettingpopup', '', params);
			}else{
				MessageUtil.info('info_msg','rehandleoperation_grid_selection_empty_msg');
				return;
			}
		}else{
			if(shiftData != null){
				var params = {
						vslCallId: ctlRehandleJpvc.getValue(),
						shiftDt: shiftDataStore.getAt(0).get('shiftDt'),
						shiftNo: shiftDataStore.getAt(0).get('shiftNo')
					};
			}else{
				var params = {
						vslCallId: ctlRehandleJpvc.getValue()
					};
			}
			me.openCodePopup('popup-cargooperationsettingpopup','', params);
		}
	},
	
	// Popup After Setting
	afterCloseDetailScreen:function(){
		var me = this;
		me.setDetailBizView('app-rehandleoperationlist');
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		var shiftDataStore = me.getStore('shiftData');
		
		if(returnValue != undefined || returnValue != null){
			if(xtype == 'popup-cargooperationsettingpopup'){
				shiftDataStore.clearData();
				shiftDataStore.add(returnValue);
			}
			
			if(targetControl == 'ctlRehandleJpvc'){
				var store = me.getStore('snBlCombo');
				var rehandleBlSnNoComboStore = me.getStore('rehandleBlSnNoCombo');
				var jpvc = returnValue.code;
				var searchType = 'rhdlop/sn/bl';
				
				rehandleBlSnNoComboStore.load({
					params:{
						vslCallId : jpvc,
						searchType : searchType
					},
					callback: function(records, operation, success) {
						if (success) {
							if(records != null && records.length > 0){
							
								//blNoCombo.setData(records[0].get('blList'));
							}
						}
					}
				});
				
				// Shift Date/Id
				var shiftDateListStore = me.getStore('shiftDateList');
				var shiftNoListStore = me.getStore('shiftNoList');
				shiftNoListStore.removeAll();
				shiftDateListStore.removeAll();
				shiftNoListStore.commitChanges();
				shiftDateListStore.commitChanges();
				refs.cboShiftDate.setValue('');
				refs.cboShiftNo.setValue('');
				
				if(jpvc){
					shiftDateListStore.load({
						params:{
							vslCallId: jpvc
						}
					});
				}
			}
		}
	},
	
	onSelectShiftDate:function(){
		var me = this;
		var refs = me.getReferences();
		var cboShiftDate = refs.cboShiftDate;
		var shiftDt = cboShiftDate.getValue();
		var vslCallId = refs.ctlRehandleJpvc.getValue();
		
		var shiftNoListStore = me.getStore('shiftNoList');
		
		shiftNoListStore.load({
			params:{
				shftDt: shiftDt,
				vslCallId: vslCallId
			},
			callback:function(records, operation, success){
				if(success){
				
				}
			}
		})
	},
	
	onConfirmRehandleLoading:function(){
		var me = this;
		var refs = me.getReferences();
		var shiftDataStore = me.getStore('shiftData');
		var grid = refs.refRehandleOperationGrid;
		var selection = grid.getSelection() == null ? null :grid.getSelection()[0];
		if(!me.checkWorkButtonMandatory()) return;
		var shftDt = refs.cboShiftDate.getValue();
		var shftId = refs.cboShiftNo.getValue();
		var shftNm = refs.cboShiftNo.selection.get('shftNm');
		
		if(!(shftDt && shftId)){
			MessageUtil.info('info_msg','rehandleoperation_shift_data_empty_msg');
			return;
		}
		
		var shiftRecord = Ext.create('MOST.model.operation.OperationSetting', {
			shftDt: shftDt,
			shiftNo: shftId,
			shftId: shftId,
			shftNm: shftNm
		});
		shiftDataStore.removeAll();
		shiftDataStore.add(shiftRecord);
		shiftDataStore.commitChanges();
		
		if(selection == null){
			MessageUtil.info('info_msg','rehandleoperation_grid_selection_empty_msg');
			return;
		}
		
		if(selection != null && selection.get('rhdlMode') != 'C'){
			MessageUtil.info('info_msg','rehandleoperation_rehandle_mode_c_msg');
			return;
		}else{
			var searchParm = [];
			searchParm['selection'] = selection.clone();
			searchParm['shiftInfo'] = shiftDataStore.getAt(0);
		}
		
		//me.openCodePopup('popup-confirmrehandleloadingpopup','',searchParm);
		me.getView().detailViewAlias = 'app-confirmrehandleloadingpopup';
		me.openDetailPopup(searchParm, 'Confirm Rehandle Loading');
	},
	
	checkWorkButtonMandatory:function(){
		var me = this;
		var refs = me.getReferences();
		var shiftDate = refs.cboShiftDate.getValue();
		var shiftNo = refs.cboShiftNo.getValue();
		
		if(StringUtil.isNullorEmpty(shiftDate)){
			MessageUtil.warning('warning_msg', 'mandatoryField_msg', 'Shift Date');
			refs.cboShiftDate.focus();
			return false;
		}
		
		if(StringUtil.isNullorEmpty(shiftNo)){
			MessageUtil.warning('warning_msg', 'mandatoryField_msg', 'Shift No');
			refs.cboShiftNo.focus();
			return false;
		}
		
		return true;
	},
	
	onConfirmRehandleHandlingOut:function(){
		var me = this;
		var refs = me.getReferences();
		var shiftDataStore = me.getStore('shiftData');
		var grid = refs.refRehandleOperationGrid;
		var selection = grid.getSelection() == null ? null :grid.getSelection()[0];
		
		if(selection == null){
			MessageUtil.info('info_msg','rehandleoperation_grid_selection_empty_msg');
			return;
		}
		
		if(selection != null && selection.get('rhdlMode') != 'R'){
			MessageUtil.info('info_msg','rehandleoperation_handlingout_mode_r_msg');
			return;
		}else{
			var searchParm = [];
			searchParm['selection'] = selection.clone();
		}
		
		me.getView().detailViewAlias = 'app-confirmrehandlehandlingoutpopup';
		me.openDetailPopup(searchParm, 'confirm rehandle handling-out');
	},
	
	onSelectBlSn:function(ele, rec, idx){
		var me = this;
		var txtGrNo = me.lookupReference('txtGrNo');
		
		txtGrNo.setValue(rec.get('grNo'));
	},
	
	exportTo: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
    	
        var cfg = Ext.merge({
            title: 'Rehandle Operation',
            fileName: 'RehandleOperation' + '.' + (btn.cfg.ext || btn.cfg.type)
        }, btn.cfg);

        var grid = refs.refRehandleOperationGrid;
        grid.saveDocumentAs(cfg);
    },
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});