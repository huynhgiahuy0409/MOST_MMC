Ext.define('MOST.view.planning.SpaceMovementSummaryController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.spacemovementsummary',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAX_DATE_PERIOD : 15,	// MAX PERIOD DATE
	MAIN_GRID_REF_NAME: 'refSingleGridGrid',
	MAIN_STORE_NAME: 'spaceMovementSummary',
	PARAMETTER_CHECK_SPACE_MOVEMENT_PLAN_FOR_REQ_TYPE_COMBO_STORE: 'spaceMovementPlanForReqTypeCombo',
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
		var searchParm = Ext.create('MOST.model.planning.SearchSpaceMovementPlanParm');
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.SPACE_MOVEMENT_PLAN_FOR_REQ_TYPE_COMBO, me.PARAMETTER_CHECK_SPACE_MOVEMENT_PLAN_FOR_REQ_TYPE_COMBO_STORE); 
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		//me.onSearch();
		
		var whCombo = me.getStore('whCombo');
		whCombo.load({
			callback: function(records, ope, success){
				if(success){
					whCombo.insert(0, [{
						codeName: 'Select Data',
						code: ''
			          }]);
				}
			}
			
		});
	},
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// Search Event Handler
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var masterStore = me.getStore('masterListspaceMovementSummary');
    	var spaceStore = me.getStore('spaceMovementSummary');
    	
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    
		spaceStore.load({
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
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var refs = me.getReferences();
		var searchBizParm = me.getSearchCondition();
		searchBizParm.classID = 'com.tsb.most.biz.parm.planning.SearchSpaceMovementSummaryParm';
		searchBizParm.serviceID = 'MOST.spaceMovementSummary.selectSpaceMovementSummaryList'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},

	openVslCallListPopup: function(){
    	var me = this;
		me.openCodePopup('popup-vesselcalllistpopup', 'txtJPVCNo');
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
     	var vslCallId = '';
     	var reqNo = '';
     	var reqTpCd = '';
    	var shipgNoteNo = '';
     	var grNo =  '';
     	var blNo =  '';
     	var reqr = '';
     	var reqPos = '';
     	var estArrStDt = '';
     	var estArrEndDt = '';
     	
		if(refs.refRadioJpvc.checked == true) {
			if(!StringUtil.isNullorEmpty(refs.txtJPVCNo.getValue())){
				vslCallId = StringUtil.toUpperCase(searchParm.data.vslCallId);
				shipgNoteNo = StringUtil.toUpperCase(searchParm.data.shipgNoteNo1);
				
				if(shipgNoteNo === '-') 
					shipgNoteNo='';
				
				blNo = StringUtil.toUpperCase(searchParm.data.blNo);
				
				if(blNo === '-') 
					blNo='';
				
				reqPos = refs.ctlWarehouseCombo.getValue();
				reqTpCd = refs.ctlReqTpNm.getValue();
				
				if(reqTpCd === 'All') 
					reqTpCd='';
			
				reqNo = StringUtil.toUpperCase(searchParm.data.reqNo);
				reqr = StringUtil.toUpperCase(searchParm.data.reqr);
				
				estArrStDt = Ext.Date.format(refs.ctlFromDt.getValue(), MOST.config.Locale.getShortDate());
				estArrEndDt = Ext.Date.format(refs.ctlToDt.getValue(), MOST.config.Locale.getShortDate());
			} else {
				reqPos = refs.ctlWarehouseCombo.getValue();
				reqTpCd = refs.ctlReqTpNm.getValue();
				reqNo = StringUtil.toUpperCase(searchParm.data.reqNo);
				reqr = StringUtil.toUpperCase(searchParm.data.reqr);
				
				estArrStDt = Ext.Date.format(refs.ctlFromDt.getValue(), MOST.config.Locale.getShortDate());
		      	estArrEndDt = Ext.Date.format(refs.ctlToDt.getValue(), MOST.config.Locale.getShortDate());
			}
		} else if (refs.refRadioNonJpvc.checked == true) {
			if(!StringUtil.isNullorEmpty(refs.ctlShippingNoteStorage.getValue())){
				shipgNoteNo = StringUtil.toUpperCase(searchParm.data.shipgNoteNo);
				grNo =  refs.ctlGRnonJPVC.getValue();
				
				if(grNo === '-') 
					grNo='';
			
				vslCallId = "NonCallId";
				
				reqPos = refs.ctlWarehouseCombo.getValue();
				reqTpCd = refs.ctlReqTpNm.getValue();
				reqNo = StringUtil.toUpperCase(searchParm.data.reqNo);
				reqr = StringUtil.toUpperCase(searchParm.data.reqr);
				
				estArrStDt = Ext.Date.format(refs.ctlFromDt.getValue(), MOST.config.Locale.getShortDate());
		      	estArrEndDt = Ext.Date.format(refs.ctlToDt.getValue(), MOST.config.Locale.getShortDate());
			} else {
				vslCallId = "NonCallId";
				reqPos = refs.ctlWarehouseCombo.getValue();
				reqTpCd = refs.ctlReqTpNm.getValue();
				reqNo = StringUtil.toUpperCase(searchParm.data.reqNo);
				reqr = StringUtil.toUpperCase(searchParm.data.reqr);
				estArrStDt = Ext.Date.format(refs.ctlFromDt.getValue(), MOST.config.Locale.getShortDate());
		      	estArrEndDt = Ext.Date.format(refs.ctlToDt.getValue(), MOST.config.Locale.getShortDate());
			}
		} else  {
			reqTpCd = refs.ctlReqTpNm.getValue();
			reqNo = StringUtil.toUpperCase(searchParm.data.reqNo);
			reqr = StringUtil.toUpperCase(searchParm.data.reqr);
			reqPos = refs.ctlWarehouseCombo.getValue();
			
			estArrStDt = Ext.Date.format(refs.ctlFromDt.getValue(), MOST.config.Locale.getShortDate());
			estArrEndDt = Ext.Date.format(refs.ctlToDt.getValue(), MOST.config.Locale.getShortDate());
		}

		var params = me.createParam(searchParm);
		
		params['searchType'] = 'SpaceMovementSummary';
		params['vslCallId'] = vslCallId;
		params['reqNo'] = reqNo;
		params['reqTpCd'] = reqTpCd;
		params['masterBL'] = searchParm.get('masterBL');
		params['bookingNo'] = searchParm.get('bookingNo');
		params['blNo'] = blNo;
		params['shipgNoteNo'] = shipgNoteNo;
		params['grNo'] = grNo;
		params['reqr'] = reqr;
		params['reqPos'] = reqPos;
		params['estArrEndDt'] = estArrEndDt;
		params['estArrStDt'] = estArrStDt;
		params['pageNo'] = pageNo;
		params['isNotPlanned'] = false;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
    	
    	return params;
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		var masterBLCombo = me.getStore('masterBLCombo');
		var bookingNoCombo = me.getStore('bookingNoCombo');
		//var snNoCombo = me.getStore('rehandleSnNoCombo');
		//var blNoCombo = me.getStore('rehandleBlNoCombo');
		
		if(targetControl === 'txtJPVCNo'){
			//refs.ctlShipgNoteNo.setValue(null);
			//refs.ctlBlLabel.setValue(null);
			
			if(returnValue){
				me.getViewModel().setData({theSearch:returnValue.item});
				me.selectMfDocIdCombo();
				//me.searchVesselCallSnBlList(returnValue.code, 'sn/bl');
			} else {
				masterBLCombo.removeAll();
				masterBLCombo.commitChanges();
				
				bookingNoCombo.removeAll();
				bookingNoCombo.commitChanges();

				//snNoCombo.removeAll();
				//snNoCombo.commitChanges();
				
				//blNoCombo.removeAll();
				//snNoCombo.commitChanges();
			}
		} else if(targetControl == "ctlShippingNoteStorage"){
			refs.ctlShippingNoteStorage.setValue(returnValue.code);
			
			if(refs.ctlShippingNoteStorage.getValue() != "" && refs.ctlShippingNoteStorage.getValue() != null){
				me.getGrNonJpvcCombo();
			}
		}
	},

	selectMfDocIdCombo: function (vslCallId) {
		var  me = this
			,theSearch = me.getViewModel().get('theSearch')
			,masterBLCombo = me.getStore('masterBLCombo')
			,bookingNoCombo = me.getStore('bookingNoCombo')
		;

		var params = {
			vslCallId: theSearch.get('vslCallId') //refs.ctlJpvc.getValue()
		};

		masterBLCombo.load({
			params: params
		});

		bookingNoCombo.load({
			params: params
		});
	},

	searchVesselCallSnBlList : function(jpvc, searchType){
		var me = this;
//		var store = me.getStore('snBlCombo');
		var snNoCombo = me.getStore('rehandleSnNoCombo');
		var blNoCombo = me.getStore('rehandleBlNoCombo');
		
//		store.load({
//			params:{
//				vslCallId : jpvc,
//				searchType : searchType
//			},
//			callback: function(records, operation, success) {
//				if (success) {
//					if(records != null && records.length > 0){
//						snNoCombo.setData(records[0].get('snList'));
//						blNoCombo.setData(records[0].get('blList'));
//					}
//					
//					snNoCombo.insert(0,[{
//						shipgNoteNo:'-'
//					}]);
//					blNoCombo.insert(0,[{
//						blNo:'-'
//					}]);
//				}
//			}
//		});
	},
	
	getGrNonJpvcCombo : function(){
		var me = this;
		var refs = me.getReferences();
		var grNonJpvcStore = me.getStore('grNonJpvcCombo');
     	var params = {
     		shipgNoteNo: refs.ctlShippingNoteStorage.getValue()
     	};
     	
     	grNonJpvcStore.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					grNonJpvcStore.insert(0,[{
						grNo:'-'
					}]);
				}
				
			}
		});
	},
	
	selectSN: function (ele,record,ope){
		var me = this;
		var refs = me.getReferences();
		var grCombo = me.getStore('grCombo');
     	var params = {
     		shipgNoteNo: record.get('shipgNoteNo'),
     	};
     	
     	grCombo.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					grCombo.insert(0,[{
						grNo:'-'
					}]);
				}
			}
		});
	},
	
	
	
	openJPVCPopup:function(field, button, e){
		var me = this;
		var refs = me.getReferences();
		
		me.openCodePopup('popup-jpvcpopup', field.getReference());
	},
	
	onTxtJpvcValueChange:function( e, newValue, oldValue, eOpts ){		
		var me = this;
		var refs = me.getReferences();
		
		e.setValue(e.getValue().toUpperCase());
	},
	
	onTxtJpvcFocusLeave:function(e, event, eOpts){
		var me = this;
		var refs = me.getReferences();
	},
	
	onJpvcRadioChange:function(obj, newValue, oldValue, eOpts){
		var me = this;
		var refs = me.getReferences();
		
		if(newValue.jpvc_radio == true){
			refs.txtJPVCNo.setValue(me.jpvc);
			refs.txtJPVCNo.setDisabled(false);
			refs.ctlShippingNoteStorage.setDisabled(true);
			refs.ctlShippingNoteStorage1.setDisabled(true);
			refs.ctlGRnonJPVC.setDisabled(true);
		}else{
			if(!StringUtil.isNullorEmpty(refs.txtJPVCNo.getValue()))
			{
				me.jpvc = refs.txtJPVCNo.getValue();
			}
			
			refs.txtJPVCNo.setValue('');
			refs.txtJPVCNo.setDisabled(true);
			refs.ctlShippingNoteStorage.setDisabled(false);
			refs.ctlShippingNoteStorage1.setDisabled(false);
			refs.ctlGRnonJPVC.setDisabled(false);
		}
	},
	
	onSelectedMfDocId: function (combo, record, eOpts) {
		var me = this;
		var snCombo = me.getViewModel().getStore('snCombo');
		var blCombo = me.getViewModel().getStore('blCombo');

		if(combo.reference === 'ctlMasterBL' ) {
			me.lookupReference('ctlBookingNo').reset();
			me.lookupReference('ctlShipgNoteNo').reset();
			snCombo.removeAll();
			me.getBlCombo();
			
		}else if(combo.reference === 'ctlBookingNo') {
			me.lookupReference('ctlMasterBL').reset();
			me.lookupReference('ctlBlLabel').reset();
			blCombo.removeAll();
			me.getSnCombo();
		}
	},
	
	openShippingNoteForStoragePopup:function(){
		var me = this;
		me.openCodePopup('popup-shippingnoteforstoragepopup', 'ctlShippingNoteStorage');
	},
	
	
	getBlCombo : function(){
		var me = this;
		var refs = me.getReferences();
		var blStore = me.getViewModel().getStore('blCombo');
		var theSearch = me.getViewModel().get('theSearch');
		
     	var params = {
     		vslCallId : theSearch.get('vslCallId'),
     		mfDocNo: refs.ctlMasterBL.getValue(),
     	};
     	
     	blStore.load({
			params: params,
		});
	},
	
	getSnCombo : function(){
		var me = this;
		var refs = me.getReferences();
		var snStore = me.getViewModel().getStore('snCombo');
		var theSearch = me.getViewModel().get('theSearch');
		
     	var params = {
     		vslCallId : theSearch.get('vslCallId'),
     		mfDocNo: refs.ctlBookingNo.getValue()
     	};
     	
     	snStore.load({
			params: params,
		});
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});