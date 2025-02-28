Ext.define('MOST.view.planning.SpaceMovementPlanController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.spacemovementplan',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refSpaceMovementPlanGrid',
	MAIN_STORE_NAME: 'spaceMovementPlan',
	DETAIL_GRID_REF_NAME: 'refSpaceMovementPlanDetailGrid',
	DETAIL_STORE_NAME: 'spaceMovementPlanDetail',
	MAX_PERIOD_DAY : 31,	// MAX PERIOD DATE
	alertYN : 'N',
	alertTp: '',
	PARAMETTER_CHECK_SPACE_MOVEMENT_PLAN_FOR_REQ_TYPE_COMBO_STORE: 'spaceMovementPlanForReqTypeCombo',
	PARAMETTER_CHECK_SPACE_MOVEMENT_PLAN_FOR_STATUS_COMBO_STORE: 'spaceMovementPlanForStatusCombo',
	PARAMETTER_CHECK_SPACE_MOVEMENT_REQUEST_TYPE_COMBO_STORE: 'spaceMovementRequestTypeCombo',
	PARAMETTER_CHECK_SPACE_MOVEMENT_REQUEST_TYPE_EXTRA_COMBO_STORE: 'spaceMovementRequestTypeExtraCombo',
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
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.SPACE_MOVEMENT_PLAN_FOR_REQ_TYPE_COMBO, me.PARAMETTER_CHECK_SPACE_MOVEMENT_PLAN_FOR_REQ_TYPE_COMBO_STORE); 
		me.setComboBoxWithLocalCache(CacheServiceConstants.SPACE_MOVEMENT_PLAN_FOR_STATUS_COMBO, me.PARAMETTER_CHECK_SPACE_MOVEMENT_PLAN_FOR_STATUS_COMBO_STORE); 
		me.setDateInDays('ctlSpaceMovementPlanFromDt', -me.MAX_PERIOD_DAY);
		me.setDateInDays('ctlSpaceMovementPlanToDt');
		
		var recvData = me.getView().recvData;
		
		if(recvData != null){
			refs.ctlSpaceMovementPlanFromDt.setValue('');
			refs.ctlSpaceMovementPlanToDt.setValue('');
			me.alertYN = 'Y';
			me.alertTp = recvData.alertTp;
	     	
		}
		var searchParm = Ext.create('MOST.model.planning.SearchSpaceMovementPlanParm');
		
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		//me.onSearch();
	},
	
	onUnitListLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var store = me.getStore('unitNosList');
		
		store.load({
			params: {
				vslCallId	: recvData.get('vslCallId'),
				blNo		: recvData.get('blSn'),
				shipgNoteNo	: recvData.get('blSn'),
				doNo		: recvData.get('doNo'),
				sdoNo		: recvData.get('sdogrNo'),
				grNo		: recvData.get('sdogrNo'),
				catgCd		: recvData.get('catgCd')
				
			},
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
		
	},
	
	onDetailLoad: function(){
		var me = this;
		var mainItem = new Ext.create('MOST.model.planning.SpaceMovementPlan');
		var searchParm = Ext.create('MOST.model.planning.SearchSpaceMovementPlanParm');
		
		me.setDetailInitialize();
		me.setComboBoxWithLocalCache(CacheServiceConstants.SPACE_MOVEMENT_REQUEST_TYPE_EXTRA_COMBO, me.PARAMETTER_CHECK_SPACE_MOVEMENT_REQUEST_TYPE_EXTRA_COMBO_STORE); 
		me.setComboBoxWithLocalCache(CacheServiceConstants.SPACE_MOVEMENT_REQUEST_TYPE_COMBO, me.PARAMETTER_CHECK_SPACE_MOVEMENT_REQUEST_TYPE_COMBO_STORE);
		
		//me.getViewModel().setData({theMain:mainItem});

		//var formPanel = me.getView();

		//formPanel.isValid();
		
		//me.setSearchParm(searchParm);
		//me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
	},
	
	setDetailInitialize:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var store = me.getStore(me.DETAIL_STORE_NAME);
		var locationStore = me.getStore('locationCombo');
		var masterBLCombo = me.getStore('masterBLCombo');
		var bookingNoCombo = me.getStore('bookingNoCombo')
		var vesselDetail = me.getViewModel().get('vesselDetail');
		if (recvData.get('vslCallId') != '' && vesselDetail) {
			recvData.set({'vslNm': vesselDetail.get('vslNm')})
		}
		me.getViewModel().setData({theDetail:recvData});
		
    	locationStore.load();
    	
		refs.ctlSpaceMovementRequestDetailMvTp.setVisible(false);
		
    	if( !StringUtil.isNullorEmpty(recvData.get('reqNo')) ){
			refs.cttReqNo.setValue(recvData.get('reqNo'));
			refs.ctlJpvc.updateEditableControl(false);

			var params = me.getDetailSearchCondition();

			if(params == null){
				return;
			}

    		store.load({
    			params: params,
    			callback: function(records, operation, success) {
    				if (success) {
    					//refs.ctlJpvc.lookupReference('ctlField').onFocusLeave();
						store.commitChanges();
    				}
    			}
    		});
		} else {
    		me.setDetailInitializeForNewRequest();
    	}

		// FIX MANTIS 0201699
		if(recvData.get('vslCallId') != ''){
			me.clearAllBLSNCombo();
			var params = {
				vslCallId: recvData.get('vslCallId')
			};
	
			masterBLCombo.load({
				params: params,
				callback: function() {
					me.lookupReference('ctlMasterBL').reset();
				}
			})
	
			bookingNoCombo.load({
				params: params,
				callback: function() {
					me.lookupReference('ctlBookingNo').reset();
				}
			})
		}else{
			me.clearAllBLSNCombo();
		}
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
	onSearchBtn: function() {
		var me = this;
     	me.alertYN = 'N';
     	me.onSearch();
	},
	
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
    	var store = me.getStore('spaceMovementPlan');
    	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					//store.commitChanges();
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
				}
			}
		});
	},
	
	onAdd: function() {
		var me = this;
		var item = Ext.create('MOST.model.planning.SpaceMovementPlan');
		
		var vslCallIdValue = me.lookupReference('ctlSpaceMovementPlanVesselCallId').getValue();
			
		item.set('reqNo', '');
		if (vslCallIdValue) {
			item.set('vslCallId', vslCallIdValue);
		}
		me.getView().detailViewAlias = 'app-spacemovementplandetail';

		me.openDetailPopup(item);
	},
	
	onDblClick : function(){
		var me = this;
		var grid = me.lookupReference('refSpaceMovementPlanGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		me.getView().detailViewAlias = 'app-spacemovementplandetail';
		me.openDetailPopup(selection);
	},
	
	onDetailDblClick : function(){
		var me = this;
		var grid = me.lookupReference('refSpaceMovementPlanDetailGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		if(selection.get('cgTpCd') != 'RCV'){
			return;
		}else{
			me.getView().detailViewAlias = 'popup-spacemovementplanUnitdetail';
			me.openDetailPopup(selection);
		}
		
	},
	
	onRemove: function() {
		var me = this;
		var grid = me.lookupReference('refSpaceMovementPlanGrid');
		var store = me.getStore('spaceMovementPlan');
		var addItem = Ext.create('MOST.model.planning.SpaceMovementPlan');
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var selections = grid.getSelection() == null ? null : grid.getSelection();
		var validateDelete = true;
		var deleteItems = new Array();
		
		if(selections.length == 0){
			return;
		}
		
		selections.every(function(record){
			if(record.get('statCd') === 'CNF'){
				return (validateDelete = false);
			}
			record.set('workingStatus', WorkingStatus.DELETE);
			deleteItems.push(record.data);
		});
		
		if(!validateDelete){
			MessageUtil.warning('warning_msg', 'spacemovement_planned_msg'); // PN114018
			return;
		}
		
		MessageUtil.question('remove', 'infodelete_msg', null,
			function(button){
				if (button === 'ok') {
					me.deleteProcess(deleteItems, selections);
				}
			}
		);
	},
	
	onRetrieve: function () {
		var  me = this
			,store = me.getStore(me.DETAIL_STORE_NAME)
			,params = me.getDetailSearchCondition();

		if(params == null){
    		return;
    	}

		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					} else {
						store.commitChanges();
					}
				}
			}
		});
	},
	
	onCellLocBtnClicked: function(){
		var me = this
			,theDetail = me.getViewModel().get('theDetail');

		if(!theDetail){
			return;
		}
		
		if(me.lookupReference('ctlAreaLocation').getValue() == null || me.lookupReference('ctlAreaLocation').getValue() == ''){
			MessageUtil.warning('warning', 'msgSelectLocation');
			return;
		}else{		
			var params = {
					locId: me.lookupReference('ctlAreaLocation').getValue(),
					locIds: theDetail.get('locId')
			};
			
			me.openCodePopup('popup-spacemovementallocationpopup', 'ctlAreaLocation', params);
		}
	},
	
	onGridSelectionChange:function(grid, selected, eOtps){
		var  me = this
			,theDetail = me.getViewModel().get('theDetail')
			,selection = selected.getRecords()
			,totalMT = 0
			,totalM3 = 0
			,totalQty = 0;

		if(selection <= 0) {
			theDetail.set({
				 totalMT: totalMT
				,totalM3: totalM3
				,totalQty: totalQty
			});
			return;
		}

		var selectionData = selection[0].data;
		var tempData = {};
		
		Ext.Object.each(selectionData, function(key, value, myself) {
			if(!( (key == 'reqNo') || ( key == 'reqr') || ( key == 'reqTpCd' ))) {
				tempData[key]=value;
			}
		});

		for( record of selection ) {
			totalMT = totalMT + Number(record.get('reqWgt'));
			totalM3 = totalM3 + Number(record.get('reqMsrmt'));
			totalQty = totalQty + Number(record.get('reqQty'));
		}

		tempData['planList'] = tempData['locId'] ? tempData['locId'].split(',') : [];
		tempData['totalMT'] = totalMT;
		tempData['totalM3'] = totalM3;
		tempData['totalQty'] = totalQty;

		theDetail.set(tempData);
	},
	
	onSelectDate:function(){
		var me = this;
		var refs = me.getReferences();
		
		me.getPeriodDays();
	},
	
	onConfirm:function(){
		var me = this;
		
		MessageUtil.question('Space/Movement Plan', 'spcMovPlanConfirmMsg', null,
				function(button){
					if (button === 'ok') {
						me.fncConfirm();
					}
				}
			);
	},
	
    onReject:function(){
		var me = this;
		
		MessageUtil.question('Space/Movement Plan', 'spcMovPlanRejectMsg', null,
				function(button){
					if (button === 'ok') {
						me.fncReject();
					}
				}
			);
	},
	
	onRefresh:function(){
		var me = this;
		
		me.lookupReference('ctlMasterBL').setValue();
		me.lookupReference('ctlBookingNo').setValue();
		me.lookupReference('ctlCommodityGroup').setValue();
		me.lookupReference('ctlShpCns').setValue();
		me.lookupReference('ctlPod').setValue();
		me.lookupReference('ctlBlVessel').setValue();
		me.lookupReference('ctlSnVessel').setValue();
		me.lookupReference('ctlAreaLocation').setValue();
		me.lookupReference('ctlAreaCell').setValue();
		me.lookupReference('ctlAreaM2').setValue();
		me.lookupReference('ctlAreaMT').setValue();
		me.lookupReference('ctlEstArrvDt').setValue();
		me.lookupReference('ctlEstDelvDt').setValue();
		me.lookupReference('ctlPeriod').setValue();
		me.lookupReference('ctlRemark').setValue();
		
		me.getViewModel().setData({theCargoInfo:null});
	},
	
	onSelectLocation: function(combo, record, eOpts) {
		var  me = this
			,theDetail = me.getViewModel().get('theDetail')
			,whDefinitionStore = me.getStore('warehouseDefinitionList')
			,whLocation = record.data.scd
			,whRecord = whDefinitionStore.findRecord('locId', whLocation);

		theDetail.set({
			 reqM2: whRecord.get('totDims')
			,reqMt: whRecord.get('fbCapa')
		});
	},
	
	onSelectedMfDocId: function (combo, record, eOpts) {
		var me = this
			,snCombo = me.getViewModel().getStore('snCombo')
			,blCombo = me.getViewModel().getStore('blCombo')
			,grCombo = me.getViewModel().getStore('goodsReceiptCombo');

		if(combo.reference === 'ctlMasterBL' ) {
			me.lookupReference('ctlBookingNo').reset();
			me.lookupReference('ctlSnVessel').reset();
			me.lookupReference('refSearchGrNo').reset();
			snCombo.removeAll();
			grCombo.removeAll();
			me.getBlCombo();
		}else if(combo.reference === 'ctlBookingNo') {
			me.lookupReference('ctlMasterBL').reset();
			me.lookupReference('ctlBlVessel').reset();
			blCombo.removeAll();
			me.getSnCombo();
		}
	},
	
	clearAllBLSNCombo: function(){
		var me = this;
		var masterBLCombo = me.getStore('masterBLCombo');
		var blCombo = me.getStore('blCombo');
		var sdoCombo = me.getStore('subDoCombo');
		var bookingNoCombo = me.getStore('bookingNoCombo');
		var snNoCombo = me.getStore('snCombo');
		var grNoCombo = me.getStore('goodsReceiptCombo');

		masterBLCombo.removeAll();
		blCombo.removeAll();
		sdoCombo.removeAll();
		bookingNoCombo.removeAll();
		snNoCombo.removeAll();
		grNoCombo.removeAll();
	},

	onOpenTerminalView: function() {
		var  me = this;

		me.loadMenuView('app-terminalview', me);
	},
	
	onRemoveForDetail: function(){
		var me = this;
		
		MessageUtil.question('remove', 'infodelete_msg', null,
			function(button){
				if (button === 'ok') {
					me.fncDelete();
				}
			}
		);
	},
	
	onPlanLocComboLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var planLocStore = me.getStore('planLocationCombo');
		
		refs.ctlPlanBayRow.setValue();
		
		planLocStore.load({
			params:{
				reqPos: refs.ctlPlanLocation.getValue()
			}
		});
	},
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
    setDetailInitializeForNewRequest:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var vesselDetail = me.getViewModel().get('vesselDetail');
		if (recvData.get('vslCallId') != '' && vesselDetail) {
			recvData.set({'vslNm': vesselDetail.get('vslNm')})
		}
		me.getViewModel().setData({theDetail: recvData});
		refs.ctlRequester.setValue(MOST.config.Token.getUserId());
		
		me.fncClear();
	},
	
	deleteProcess : function(deleteItems, selections){
		var me = this;
		var store = me.getStore('spaceMovementPlan');
		var deleteItem = Ext.create('MOST.model.planning.SpaceMovementPlan');
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = false;
		updateParm.drop();
		updateParm.set('workingStatus', WorkingStatus.DELETE);
		updateParm.set('items', deleteItems);
		updateParm.save({
			success : function(record, operation) {
				selections.forEach(function (item) {
					item.commit();
					store.remove(item);
				});
				updateParm.commit();
				store.commitChanges();
				MessageUtil.saveSuccess();
			}
		});
	},
	
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
     	var reqr = StringUtil.toUpperCase(searchParm.data.reqr);
     	var reqTpCd = StringUtil.toUpperCase(searchParm.data.reqTpCd);
     	var statCd = StringUtil.toUpperCase(searchParm.data.statCd);
     	var vslCallId = searchParm.data.vslCallId;
     	var scn = searchParm.data.scn;
     	var reqPos = searchParm.data.reqPos;
     	var planLocId = searchParm.data.planLocId;
     	var lotNo = searchParm.data.lotNo;
     	
     	if(me.alertYN == 'N'){
     		var dateCondition = me.checkFromToDate('ctlSpaceMovementPlanFromDt', 'ctlSpaceMovementPlanToDt');
         	
        	if(dateCondition == null){
        		return null;
        	}
     	}else{
     		statCd = me.alertTp;
     		reqTpCd = '';
     		reqr = '';
     	}
     	
     	if(searchParm.data.nonVesselYN){
     		vslCallId = 'STRG';
     	}
	
		var params = me.createParam(searchParm);
		
		params['reqr'] = reqr;
		params['reqTpCd'] = reqTpCd;
		params['statCd'] = statCd;
		params['vslCallId'] = vslCallId;
		params['scn'] = scn;
		params['isPlanned'] = 'Y';
		params['isPlanned'] = 'infoList';
		params['alertYn'] = me.alertYN;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		params['reqPos'] = reqPos;
		params['planLocId'] = planLocId;
		params['lotNo'] = lotNo;
		
    	if(dateCondition != null){
    		params['reqStDt'] = dateCondition.fromDtString;
    		params['reqEndDt'] = dateCondition.toDtString;
    	}
    	
    	return params;
	},
	
	getDetailSearchCondition : function(){
		var me = this;
		var recvData = me.getDetailBizView().items.get(0).recvData;
		var searchParm = me.getViewModel().get('theSearch');
		var theDetail = me.getViewModel().get('theDetail');
		
		if(StringUtil.isNullorEmpty(theDetail.get('vslCallId'))) {
			MessageUtil.warning("warning", "Please set the Vessel Call Id first.")
			return;
		}
		
     	var params = {
			 vslCallId: (theDetail ? theDetail.get('vslCallId') : recvData.get('vslCallId') )
			,masterBL: searchParm.get('masterBL')
			,bookingNo: searchParm.get('bookingNo')
			,blNo: searchParm.get('blNo')
			,shipgNoteNo: searchParm.get('shipgNoteNo')
			,cmdtGrpCd: searchParm.get('cmdtGrpCd')
			,cngShp: searchParm.get('cngShp')
			,pod: searchParm.get('pod')
			,isNotPlanned: searchParm.get('isNotPlanned')
			,lotNo: searchParm.get('lotNo')
			,grNo: searchParm.get('grNo')
			,sdoNo: searchParm.get('subDoNo')
     	}

    	return params;
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		if (returnValue) {
			me.getViewModel().setData({vesselDetail:returnValue.item});
		}
		if(targetControl === 'ctlJpvc'){
			if(returnValue){ 
				refs.ctlScn.setValue(returnValue.item.get('scn'));
				refs.ctlVesselName.setValue(returnValue.codeName);
				me.getViewModel().setData({vesselDetail:returnValue.item});
				me.selectMfDocIdCombo();
				me.selectMultipleSearchFilterCombo(returnValue.code);
				var bLCombo = me.getStore('blCombo');
				var snNoCombo = me.getStore('snCombo');
				var sdoCombo = me.getStore('subDoCombo');
				var grNoCombo = me.getStore('goodsReceiptCombo');
				
				bLCombo.removeAll();
				bLCombo.commitChanges();
				
				snNoCombo.removeAll();
				snNoCombo.commitChanges();
				
				sdoCombo.removeAll();
				sdoCombo.commitChanges();
				
				grNoCombo.removeAll();
				grNoCombo.commitChanges();
			} else {
				var masterBLCombo = me.getStore('masterBLCombo');
				var bookingNoCombo = me.getStore('bookingNoCombo');

				masterBLCombo.removeAll();
				masterBLCombo.commitChanges();
				
				bookingNoCombo.removeAll();
				bookingNoCombo.commitChanges();
			}
		} else if (targetControl == "ctlSnNonVessel"){
			refs.ctlSnNonVessel.setValue(returnValue.code);
			if(refs.ctlSnNonVessel.getValue() != "" && refs.ctlSnNonVessel.getValue() != null){
				refs.ctlCategory.setValue("S");
				me.getGrNonJpvcCombo();
				me.getSpaceMmovementInfo(1);
			}
		} else if (targetControl === 'ctlPayer'){
			if(returnValue){ 
				refs.ctlPayer.setValue(returnValue.code);
				refs.ctlPayerNm.setValue(returnValue.codeName);
			} else {
				refs.ctlPayer.setValue("");
				refs.ctlPayerNm.setValue("");
			}
		} else if (xtype === 'popup-spacemovementallocationpopup') {
			me.setWhLocData(returnValue);
		} else if (targetControl === 'ctlRequester'){
			if(returnValue){ 
				refs.ctlRequesterNm.setValue(returnValue.codeName);
			} else {
				refs.ctlRequesterNm.setValue("");
			}
		} else if (targetControl === 'ctlScn' || targetControl === 'ctlScnDetail') {
			if (returnValue) {
				if(targetControl === 'ctlScn'){
					refs.ctlScn.setValue(returnValue.code);

					if (!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))) {
						refs.ctlSpaceMovementPlanVesselCallId.setValue(returnValue.item.get('vslCallId'));
					} else {
						refs.ctlSpaceMovementPlanVesselCallId.setValue('');
					}
				} else {
					refs.ctlScnDetail.setValue(returnValue.code);

					if (!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))) {
						refs.ctlJpvc.setValue(returnValue.item.get('vslCallId'));
						refs.ctlVesselName.setValue(returnValue.item.get('vslNm'));
					} else {
						refs.ctlJpvc.setValue('');
					}
				}
			}
		} if(targetControl === 'ctlSpaceMovementPlanVesselCallId'){
			if(returnValue){
				refs.ctlScn.setValue(returnValue.item.get('scn'));
			} else {
				refs.ctlScn.setValue('');
			}
		}
	},
	
	getPeriodDays:function(){
		var me = this;
		var refs = me.getReferences();
		
		if(refs.ctlEstArrvDt.getValue() !== "" && refs.ctlEstDelvDt.getValue() !== ""){
			var date1 = Ext.Date.format(refs.ctlEstArrvDt.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			var date2 = Ext.Date.format(refs.ctlEstDelvDt.getValue(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			var result = new Date(me.changeFormatDateTime(date2)) - new Date(me.changeFormatDateTime(date1));
			var differenceDays = (result / (1000 * 3600 * 24))+1;
			
			if (differenceDays < 0 || isNaN(differenceDays)) {
				refs.ctlPeriod.setValue(0);
				return;
			} else {
				refs.ctlPeriod.setValue(differenceDays);
				refs.btnAdd.setDisabled(false);
			}
		}
	},
	
	setWhLocData: function(whAllocData){
		var me = this;
		var locNmMap = me.getLocNmMap(whAllocData);
		var area = me.getM2AreaValue(whAllocData);

		locNmMap.planLocId = locNmMap.planLocId.join(',');
		me.setWhFieldValues(locNmMap.planLocId, area);
		me.setWhDataAtGridSelection(locNmMap.planLocId, locNmMap.locId, area);
	},
	
	getLocNmMap: function(whAllocData){
		var me = this;
		var planLocId = []; // planList
		var locId = [];		// planLocId

		Ext.Array.each(whAllocData, function(cell){
			planLocId.push(me.generateAccmWhNms(cell));
			locId = locId.concat(cell.get('locIdArr'));
		});

		return {planLocId: planLocId, locId: locId};
	},
	
	generateAccmWhNms: function(cellData){
		var whId = cellData.get('whId');
		var cellCnt = cellData.get('locIdArr').length;
		var firstCell = cellData.get('locIdArr')[0];
		
		firstCell = firstCell.substring(firstCell.lastIndexOf('-')+1, firstCell.length);

		return whId + '(' + firstCell + ',' + cellCnt + ')';
	},
	
	setWhFieldValues: function(planLocId, area){
		this.lookupReference('ctlAreaCell').setValue(planLocId);
		this.lookupReference('ctlAreaM2').setValue(area);
	},
	
	setWhDataAtGridSelection: function(planLocId, locId, area){
		var me = this
			,theDetail = me.getViewModel().get('theDetail')
		;

		theDetail.set({
			 'planLocId': planLocId
			,'planList': locId
			,'locId': locId
			,'reqM2': area
		})
	},
	
	getM2AreaValue: function(allocData){
		var area = 0;
		
		Ext.Array.each(allocData, function(data){
			Ext.Array.each(data.get('items'), function(cell){
				area += (cell.get('len') * cell.get('wth'));
			});
		});
		return area;
	},
	
	selectMfDocIdCombo: function () {
		var  me = this
			,vesselDetail = me.getViewModel().get('vesselDetail')
			,masterBLCombo = me.getStore('masterBLCombo')
			,bookingNoCombo = me.getStore('bookingNoCombo');

		var params = {
			vslCallId: vesselDetail.get('vslCallId') //refs.ctlJpvc.getValue()
		};

		masterBLCombo.load({
			params: params
		})

		bookingNoCombo.load({
			params: params
		})
	},
	
	selectMultipleSearchFilterCombo: function (targetVslCallId) {
		var  me = this
			,commdityGroupStore = me.getStore('commodityGroupCombo')
			,podCombo = me.getStore('podCombo') 
			,cngShpCombo = me.getStore('cngShpCombo') 
		;

		commdityGroupStore.load({
			params: {
				 searchType: 'cmdtGrpCombo'
				,vslCallId: targetVslCallId
			}
		});

		podCombo.load({
			params: {
				 searchType: 'podCombo'
				,vslCallId: targetVslCallId
			}
		});

		cngShpCombo.load({
			params: {
				 searchType: 'cngShpCombo'
				,vslCallId: targetVslCallId
			}
		});
	},
	
	getBlCombo : function(){
		var me = this;
		var refs = me.getReferences();
		var blStore = me.getViewModel().getStore('blCombo');
		var vesselDetail = me.getViewModel().get('vesselDetail');
		
     	var params = {
     		vslCallId : vesselDetail.get('vslCallId'),
     		mfDocNo : refs.ctlMasterBL.getValue(),
     	};
     	
     	blStore.load({
			params: params,
		});
	},
	
	getSnCombo : function(){
		var me = this;
		var refs = me.getReferences();
		var snStore = me.getViewModel().getStore('snCombo');
		var vesselDetail = me.getViewModel().get('vesselDetail');
		
     	var params = {
     		vslCallId : vesselDetail.get('vslCallId'),
     		mfDocNo : refs.ctlBookingNo.getValue()
     	};
     	
     	snStore.load({
			params: params,
		});
	},
	
	getGrNonJpvcCombo : function(){
		var me = this;
		var refs = me.getReferences();
		var grNonJpvcStore = me.getViewModel().getStore('grNonJpvcCombo');

     	var params = {
     		shipgNoteNo: refs.ctlSnNonVessel.getValue()
     	};
     	
     	grNonJpvcStore.load({
			params: params
		});
	},
	
	changeFormatDateTime(str) {
		var date = "";
		var splitDateTime = str.split(" ");
		var splitDate = splitDateTime[0].split("/");
		var result = date.concat(splitDate[1], '/', splitDate[0], '/', splitDate[2]);
		
		return result;
	},
	
	fncSubmit:function(){
		var  me = this
			,grid = me.lookupReference(me.DETAIL_GRID_REF_NAME)
			,theDetail = me.getViewModel().get('theDetail')
			,selection = grid.getSelection()
		;
		
		var detailView = me.getDetailBizView();
		
		var infoForm = detailView.down('form').getForm();
		
		if(!infoForm.isValid()){
			MessageUtil.mandatoryFieldInValid();
			return;
		}
		
		for( record of selection ) {
			record.set({
				 reqr: theDetail.get('reqr')
				,reqNo: theDetail.get('reqNo')
				,reqTpCd: theDetail.get('reqTpCd')
				,reqPos: theDetail.get('reqPos')
				,planLocId: theDetail.get('planLocId')
				,planList: theDetail.get('planList')
				,locId: theDetail.get('locId')
				,eta: theDetail.get('eta')
				,svcDt: theDetail.get('svcDt')
				,period: theDetail.get('period')
				,rmk: theDetail.get('rmk')
			})
		}
	},
	
	fncDelete:function(){
		var  me = this
			,store = me.getStore(me.DETAIL_STORE_NAME)
			,grid = me.lookupReference(me.DETAIL_GRID_REF_NAME)
			,selection = grid.getSelection()
			,deleteItems = new Array()
			,updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm')
		;

		var validObj = {
			valid: true
		}

		// Valid 01 :: need to selected
		if(selection <= 0) {
			MessageUtil.warning("spaceMovementPlanDetail", "spaceMovementPlan_SelectBeforeRemove");
			return;
		}

		// Valid 02 :: check the phantom of record.
		// check the working status is 'updated'.
		for( record of selection ) {
			var cloneRecord = record.copy();
			var recordStatus = record.get('workingStatus');
			
			if(recordStatus === WorkingStatus.INSERT) {
				validObj.valid = false; break;
			} else {
				deleteItems.push(cloneRecord.data); // push the array as dataitems
			}
		}

		if(!validObj.valid) {
			MessageUtil.warning("spaceMovementPlanDetail", "There isn't include the planned data.");
			return;
		}

		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = false;
		updateParm.set({
			'items': deleteItems
		});
		updateParm.erase({
			callback: function(records, operation, success) {
				if(success) {
					MessageUtil.confirmation("spaceMovementPlanDetail", "Success to remove.");
					me.onRetrieve();
				}
			}
		});
	},
	
	fncConfirm:function(){
		var  me = this
			,grid = me.lookupReference(me.DETAIL_GRID_REF_NAME)
			,theDetail = me.getViewModel().get('theDetail')
			,isCreated = theDetail.phantom
			,updateItems = new Array()
			,selectedRecords = grid.getSelection()
		;
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var roroParm = Ext.create('MOST.model.planning.RoRoYardPlan');
		var detailView = me.getDetailBizView();
//		if(theDetail.get('cgTpCd') == 'RCV'){
//			var store= me.getStore('roroYardPlanCargoItems');
//			if(selectedRecords.length > 0 ) {
//				selectedRecords.forEach(function(item, index, array){
//					roroParm.set('yardLoc',item.get('locId'));
//					roroParm.set('vslCallId', item.get('vslCallId'));
//					roroParm.set('vslCd', item.get('vslCd'));
//					roroParm.set('callYear', item.get('callYear'));
//					roroParm.set('callSeq', item.get('callSeq'));
//					roroParm.set('mfDocId',item.get('mfDocId'));
//					roroParm.set('catgCd', item.get('catgCd'));
//					roroParm.set('cgTpCd', item.get('cgTpCd'));
//					roroParm.set('docWgt', item.get('reqWgt'));
//					roroParm.set('cbm', item.get('reqMsrmt'));
//					roroParm.set('cgNo', item.get('blSn'));
//					roroParm.set('docNo', item.get('mfDocId'));
//					roroParm.set('sdogrNo', item.get('sdogrNo'));
//					roroParm.set('userId', Token.getUserId());
//					updateItems.push(roroParm.data);
//				});
//			}
//		}else{
			var store = me.getStore(me.DETAIL_STORE_NAME)
			var modifiedRecords = store.getModifiedRecords();
			// modified list, append the record in list.
			// or selection data
			if(modifiedRecords.length > 0 ) {
				modifiedRecords.forEach(function(item, index, array){
					var copyRecord = item.copy();
					copyRecord.set('insertType', 'confirm');
					copyRecord.set('userId', MOST.config.Token.getUserId());
					updateItems.push(copyRecord.data);
				});
			} else if( selectedRecords > 0 ) {
				for( record of selectedRecords) {
					var copyRecord = record.copy();
					copyRecord.set('insertType', 'confirm');
					copyRecord.set('userId', MOST.config.Token.getUserId());
					updateItems.push(copyRecord.data);
				}
			} else {
				MessageUtil.warning("warning", "Please select or modified any record.");
				return;
			}
//		}
		

		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = isCreated;
		
//		if(theDetail.get('cgTpCd') == 'RCV'){
//			updateParm.phantom = false;
//			updateParm.set({
//				 'workingStatus': WorkingStatus.convertInt(WorkingStatus.UPDATE)
//				,'items': updateItems
//			});
//		}else{
			updateParm.set({
				 'workingStatus': (isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE)
				,'items': updateItems
			});
//		}
		
		updateParm.save({
			callback: function(records, operation, success) {
				if(success) {
					var recvData = me.lookupReference(me.getView().detailViewAlias).items.get(0).recvData
					recvData.dirty = false;
					theDetail.commit();
					MessageUtil.confirmation('success_msg', 'savesuccess_msg',null,
						function(button){
							if (button === 'ok') {
								if(isCreated) {
									me.onSearch();
									detailView.close();
								} else
									me.onRetrieve();
							}
						}
					);
				}
			}
		});
	},
	
	fncReject: function () {
		var  me = this
			,store = me.getStore(me.DETAIL_STORE_NAME)
			,rejectData = me.getViewModel().get('theDetail').copy()
			,rejectItems = new Array();
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');

		rejectData.set('insertType', 'reject')
		rejectItems.push(rejectData.data);
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = false;
		updateParm.set({
			 'workingStatus': WorkingStatus.UPDATE
			,'items': rejectItems
		});
		updateParm.save({
			callback: function(records, operation, success) {
				if(success) {
					MessageUtil.saveSuccess();
					me.getParentView().getController().onSearch();
					me.getView().up('window').destroy();
				}
			}
		})
	},
	
	fncClear:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('spaceMovementPlanDetail');
		
		store.removeAll();
		
		me.lookupReference('cttReqNo').setValue();
		me.lookupReference('ctlStatus').setValue();
		me.lookupReference('ctlRequestTp').setValue();
		me.lookupReference('ctlSpaceMovementRequestDetailMvTp').setValue();
		me.lookupReference('ctlSpaceMovementRequestDetailMvTp').setVisible(false);
		
		me.onRefresh();
	},
	
	//Select SN combo
	onSelectSNNo: function(){
		var me = this;
		var refs = me.getReferences();
		var grListStore = me.getViewModel().getStore('goodsReceiptCombo');
		if(!StringUtil.isNullorEmpty(refs.ctlSnVessel.getValue())){
			grListStore.load({
				params: {
					searchType : ComboboxServiceConstants.COMBO_GR_NO,
					vslCallId : refs.ctlJpvc.getValue(),
					shipgNoteNo : refs.ctlSnVessel.getValue(),
					blNo: ''
				},
				
				callback:function(records,success){
					if (success) {
					}
				}
			});
		}
		else {
			grListStore.loadData([],false);
			refs.refSearchGrNo.reset();
		}
	},
	
	//Select BL combo
	onSelectBLNo: function(){
		var me = this;
		var refs = me.getReferences();
		var sdoListStore = me.getViewModel().getStore('subDoCombo');
		if(!StringUtil.isNullorEmpty(refs.ctlBlVessel.getValue())){
			sdoListStore.load({
				params: {
					searchType : ComboboxServiceConstants.COMBO_SUB_DO_NO,
					vslCallId : refs.ctlJpvc.getValue(),
					blNo : refs.ctlBlVessel.getValue(),
				},
				
				callback:function(records,success){
					if (success) {
					}
				}
			});
		}
		else {
			sdoListStore.loadData([],false);
			refs.refSearchSDONo.reset();
		}
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});