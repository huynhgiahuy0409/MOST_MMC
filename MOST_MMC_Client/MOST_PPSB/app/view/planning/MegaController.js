Ext.define('MOST.view.planning.MegaController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.mega',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refMegaRequisitionGrid',
	MAIN_STORE_NAME: 'megaRequisition',	
	DETAIL_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/mega/detail',
	PARAMETTER_MEGA_REQUISTION_DEPLOYMENT_COMBOBOX_STORE: 'megaRequisitionDeploymentCombo',
	PARAMETTER_MEGA_DETAIL_YN_COMBOBOX_STORE: 'megaDetailYNCombo',
	MAX_PERIOD_DAY : 31,
	VIEW_TYPE_CREATE : 'CREATE',
	VIEW_TYPE_UPDATE : 'UPDATE',
	VIEW_TYPE_COPY : 'COPY',
	VIEW_TYPE_AMEND : 'AMEND',
	CURRENT_VIEW_TYPE : '',
	COPY_MEGA : 'C',
	
	APPROVAL_SUBMIT : 0,			// Submit MEGA
	APPROVAL_RESUBMIT : 1,			// Resubmit MEGA, Cancel MEGA
	APPROVAL_RESUBMITAPPROVAL : 2,	// Resubmit MEGA, Cancel MEGA, Approval MEGA, Reject MEGA
	APPROVAL_CANCEL : 3,			// Cancel MEGA, Amend MEGA
	APPROVAL_APPROVAL : 4,			// Approval MEGA, Reject MEGA
	CREW_BLANK : 0,					// CREW Blank Operator
	CREW_VSL_OPR : 1,				// CREW Vessel Operator
	CREW_WH_OPR : 2,				// CREW Warehouse Operator
	hasAuthConfirm : true,			// AccessAuthHandler.existAuthItem(parentDocument.id, UserConfig.CONFIRM)
	hasAuthApproval : true,			// AccessAuthHandler.existAuthItem(this.id, UserConfig.APPROVAL)
	USER_TYPE : '',					// MOST.config.Token.getUserType()
	SHIPPING_AGENCY : CONSTANTS.PTNR_TYPE_SHIPPING_AGENCY,
	FORWARDER : CONSTANTS.PTNR_TYPE_FORWARDER,
	isAmendVisible : false,
	
	REQUEST_QTY_BTN_VIEW: 1,
	CONFIRM_QTY_BTN_VIEW: 0,

	UPDATE_BTN_CANVAS: 0,
	AMEND_BTN_CANVAS: 1,

	HIDE_REQUEST_TIME: 0,
	SHOW_REQUEST_TIME: 1,
		    
	V_TP_COPY : 'copy',
	V_TP_AMEND : 'amend',
	ERROR_CD : '',
	TIME_FOR_SHIFT: '',
	alertYN : 'N',
	alertTp: '',
	rptTp: '',
	
	// modified for issue 56267
	STAT_REQUEST_CANCELED : 'RC',	
	APPROVAL_REQUEST_CANCELED : 5,
	deployedYN: '',
	
	EQUIPMENT_CREATE_UPDATE_FIELD_CONFIG : {
		'Gears': {
			'eqDivCd': 'cboEqTypeGears',
			'capaCd': 'cboCapacityGears',
			'locId':'ctlWorkingAreaGears',
			'confmQty':'confQtyFieldGears',
			'reqQty':'reqQtyFieldGears'
			,'workStDt': 'refStartTimeGears'
			,'workEndDt': 'refEndTimeGears'
		},
		'Forklift': {
			'capaCd' : 'cboCapacityForklift',			
			'locId':  'ctlWorkingAreaForklift',
			'confmQty': 'confQtyFieldForklift',
			'reqQty': 'reqQtyFieldForklift',
			'flStatus': 'cboForkliftDriver'
			,'workStDt': 'refStartTimeForklift'
			,'workEndDt': 'refEndTimeForklift'
		},
		'Trailer': {
			'capaCd': 'cboCapacityTrailer',
			'locId':'ctlWorkingAreaTrailer',
			'confmQty':'confQtyFieldTrailer',
			'reqQty':'reqQtyFieldTrailer'
			,'workStDt': 'refStartTimeTrailer'
			,'workEndDt': 'refEndTimeTrailer'
		},
		'Mechanical': {
			'eqDivCd': 'cboEqTypeMechanical',
			'capaCd': 'cboCapacityMechanical',
			'locId':'ctlWorkingAreaMechanical',
			'confmQty':'confQtyFieldMechanical',
			'reqQty':'reqQtyFieldMechanical'
			,'workStDt': 'refStartTimeMechanical'
			,'workEndDt': 'refEndTimeMechanical'
		},
		'PortCrane':{
			'eqDivCd': 'cboEqTypePortCrane',
			'capaCd': 'cboCapacityPortCrane',
			'confmQty':'confQtyFieldPortCrane',
			'reqQty':'reqQtyFieldPortCrane'
			,'workStDt': 'refStartTimePortCrane'
			,'workEndDt': 'refEndTimePortCrane'
		}
	},
	
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
		var searchParm = Ext.create('MOST.model.planning.SearchMegaParm');
		var recvData = me.getView().recvData;
		var shiftCombo = me.getStore('megaRequisitionShiftCombo');
		var purposeCombo = me.getStore('megaRequisitionPurposeCombo');
		var megaStatusCombo = me.getStore('megaRequisitionMegaStatusCombo');

		me.setComboBoxWithLocalCache(CacheServiceConstants.MEGA_REQUISITION_DEPLOYMENT_COMBOBOX, me.PARAMETTER_MEGA_REQUISTION_DEPLOYMENT_COMBOBOX_STORE);
		me.USER_TYPE = MOST.config.Token.getUserType();
		
		shiftCombo.load();
		purposeCombo.load();
		megaStatusCombo.load();

		me.setDateInDays('ctlFromDt');

		if(recvData != null){
			refs.ctlFromDt.setValue('');
			refs.ctlToDt.setValue('');
			me.alertTp = recvData.alertTp;
			me.alertYN = 'Y';
	     	me.onSearch();
		}
		
		me.setSearchParm(searchParm);
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
	onSearchBtn: function() {
		var me = this;
		
     	me.alertYN = 'N';
     	me.onSearch();
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
			callback: function(records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
				}
			}
		});
	},
	
	// Grid Add
	onAdd: function() {
		var me = this;
		var refs = me.getReferences();
		
		if(Token.getUserType() == CodeConstants.USER_TYPE_INTERNAL){
			me.onAddingMegaProcess();
		}
		else {
			var validationCodeStore = me.getStore('megaDetailValidationCode');
			validationCodeStore.load({
				params : {
					tyCd : 'EXISTED_ACCOUNTNO_PTNR_VALIDATION',
					ptnrCode : Token.getPtnrCode()
				},
				
				callback: function(records, operation, success) {
					if (success) {}
				}
			});
			
			me.onAddingMegaProcess();
		}
	},
	
	// Grid Row Remove
	onRemove: function() {
		var me = this;
		var grid = me.lookupReference('refMegaRequisitionGrid');
		var store = me.getStore('megaRequisition');
		var masterItem = Ext.create('MOST.model.planning.Mega');
		var selection = grid.getSelection();
		var delItems = new Array();
		var clear = true;
		
		if(selection.length > 0) {
			Ext.each(selection, function (record) {
				if(record.data.statCd !== CodeConstants.MT_MEGASTAT_CR && record.data.statCd !== CodeConstants.MT_MEGASTAT_CA){
					me.ERROR_CD = 'megarequisition_PN00006_del_info';
					clear = false;
					
					return;
				}
				//Commented by Tim 12/03/2024
//				if (record.data.statCd == CodeConstants.MT_MEGASTAT_CA && record.data.appr !== " ") {
//					me.ERROR_CD = 'megarequisition_PN00033_del_info';
//					clear = false;
//					
//					return;
//				}
				
				if (record.data.statCd == CodeConstants.MT_MGTPCD_A) {
					me.ERROR_CD = 'megarequisition_PN00034_del_info';
					clear = false;
					
					return;
				}
				
				record.data.workingStatus = WorkingStatus.DELETE;
				delItems.push(record.data);
			});
			
			if(clear && (masterItem.dirty || delItems.length>0)){
				var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');

				masterItem.set("items",delItems);
				
				updateParm.getProxy().url = store.getProxy().url;
				updateParm.phantom = false;
				updateParm.drop();
				updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
				updateParm.set('items', new Array());

				for (var i = 0; i < delItems.length; i++) {
					updateParm.get('items').push(delItems[i]);
				}
				
				updateParm.save({
					success: function (record, operation) {
						store.commitChanges();
						store.reload();
						MessageUtil.saveSuccess();
					}
				});
			}else{
				MessageUtil.warning('Warning',me.ERROR_CD);
			}
		}else{
			MessageUtil.warning('Warning','megarequisition_del_no_data_info');
		}
	},
	
	removeComplete : function(me){
		MessageUtil.saveSuccess();
	},
	
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference('refMegaRequisitionGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		me.getView().detailViewAlias = 'app-megadetail';
		
		selection.set('viewType', me.VIEW_TYPE_UPDATE);
		me.openDetailPopup(selection);
	},
	
	onDateChange:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		
		if(newValue != null && newValue != ''){
			refs.ctlServiceDate.setValue('');
		}
		
		if(control == refs.ctlFromDt){
			me.setDateInDaysByDate('ctlToDt', me.MAX_PERIOD_DAY, control.getValue());
		} else {
			me.setDateInDaysByDate('ctlFromDt', -me.MAX_PERIOD_DAY, control.getValue());
		}
	},
	
	onGridComboRenderer: function(val, cell){
		var me = this;
        var refs = me.getReferences();
		var codeComboStore = null;
		var displayFieldName = 'scdNm';
		var codeFieldName = 'scd';
		
		if(cell.column.dataIndex === 'eqDivCd'){
			codeComboStore = me.getViewModel().getStore('megaDetailEqTypeCombo');
		} else if(cell.column.dataIndex === 'capaCd'){
			codeComboStore = me.getViewModel().getStore('megaDetailCapacityCombo');
			
			displayFieldName = 'capaDescr';
			codeFieldName = 'capaCd';
			
			if(codeComboStore.getData().length == 0){
				return cell.record.get('capaDescr'); 
			}
		} else if(cell.column.dataIndex === 'capaCd'){
			codeComboStore = me.getViewModel().getStore('megaDetaiWorkingAreaCombo');
			displayFieldName = 'cdNm';
			codeFieldName = 'cd';
		} else if (cell.column.dataIndex === 'shftId'){
			codeComboStore = me.getViewModel().getStore('megaRequisitionShiftCombo');
			displayFieldName = 'shftNm';
			codeFieldName = 'shftId';
		}

		if(codeComboStore != null){
			var indx = codeComboStore.find(codeFieldName, val);

			if (indx != -1){
				return codeComboStore.getAt(indx).get(displayFieldName); 
			}
		}
		
		return '';
	},
	
	onShiftChange: function(){
		var me = this;
        var refs = me.getReferences();
        var Hh = '';
        var hhstring;
        
        if(refs.ctlDetailMegaShift.getSelection() != null){       	
        	if(refs.ctlDetailMegaShift.getSelection().get('shftIdx') == "1"){
        		me.TIME_FOR_SHIFT = "07:00";
        		Hh = 7;
        		hhstring = '0700';
        	}else if (refs.ctlDetailMegaShift.getSelection().get('shftIdx')  == "2"){
        		me.TIME_FOR_SHIFT = "15:00";
        		Hh = 15;
        		hhstring = '1500';
        	}else if (refs.ctlDetailMegaShift.getSelection().get('shftIdx') == "3"){
        		me.TIME_FOR_SHIFT = "23:00";
        		Hh = 23;
        		hhstring = '2300';
        	}
        }
        
        //refs.ctlStvReqHh.setValue(Hh);
        //refs.ctlTallyRegHh.setValue(Hh);
        //refs.ctlLshRegHh.setValue(Hh);
        //refs.ctlVesselOperationRegHh.setValue(Hh);
		//refs.ctlTrimReqHh.setValue(Hh);
        
		me.initDefaultReqTime();
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
     	var dateCondition = '';
     	var serviceDate = me.checkDate('ctlServiceDate');
     	
     	var commodity = refs.ctlCommodity.getValue();
     	var sa = refs.ctlSa.getValue();
     	var ptnrType = '';
     	var userRole = null;
     	var alertYn = '';
     	var subSearchType = '';

		if(searchParm && searchParm.data) {
			var jpvcNo = StringUtil.toUpperCase(searchParm.get('vslCallId') );
			var shift = StringUtil.toUpperCase(searchParm.get('shftId'));
			var deployment = StringUtil.toUpperCase(searchParm.get('depyYn'));
			var purpose = StringUtil.toUpperCase(searchParm.get('purpTpCd'));
			var megaStatus = StringUtil.toUpperCase(searchParm.get('statCd'));
			var megaNo = StringUtil.toUpperCase(searchParm.get('megaNo'));
		}
		
     	
     	if(me.alertYN == 'N'){
     		if(jpvcNo == ""){
        		if(refs.ctlFromDt.getValue() == null || refs.ctlFromDt.getValue() == "" || refs.ctlToDt.getValue() == null || refs.ctlToDt.getValue() == "" ){
        			refs.ctlFromDt.reset();
        		}
        		if((refs.ctlFromDt.getValue() == null || refs.ctlFromDt.getValue() == "") && (refs.ctlToDt.getValue() == null || refs.ctlToDt.getValue() == "") && serviceDate.dateString == '' && megaNo == ''){
        			MessageUtil.warning('Warning', 'megarequisition_jpvc_eta_mandatory_msg');
            		return null;
        		}
        	}else{
        		refs.ctlFromDt.reset();
        		refs.ctlToDt.reset();
        	}
     	}else{
     		alertYn = 'Y';
     	}
     	
    	if(!StringUtil.isNullorEmpty(megaNo) && megaNo.length < 4){
    		refs.ctlMegaNo.focus();
    		MessageUtil.warning('Warning', 'megarequisition_megano_least_msg');
    		
    		return null;
    	}
    	
    	if(!StringUtil.isNullorEmpty(megaNo)){
    		refs.ctlFromDt.reset();
    		refs.ctlToDt.reset();
    	}
     	
     	if(refs.ctlFromDt.getValue() != null && refs.ctlToDt.getValue() != null){
            dateCondition = me.checkPeriodDate("ctlFromDt", "ctlToDt", me.MAX_DATE_ALLOW, true);
            workStDt = dateCondition.fromDtString;
            workEndDt = dateCondition.toDtString;
        }
    	
    	if(serviceDate.dateString != '' && serviceDate.dateString != null){
    		dateCondition.fromDtString = '';
    		dateCondition.toDtString = '';
    	}
    	
    	if( MOST.config.Token.getUserType() === CodeConstants.USER_TYPE_INTERNAL){
    		userRole = 'BS';
    	}
    	
    	if(me.existsPatnerType(me.SHIPPING_AGENCY)){
    		ptnrType = me.SHIPPING_AGENCY;
    	} else if (me.existsPatnerType(me.FORWARDER)){
    		ptnrType = me.FORWARDER;
    	}
    	
		var params = searchParm ? me.createParam(searchParm) : {};
		
    	params['ptnrType'] = ptnrType;
		params['searchType'] = 'megalist';
		params['shftMethCd'] = 'Standard';
		params['depyYn'] = 'N';
		params['alertYn'] = 'N';
		params['userRole'] = userRole;
		params['vslCallId'] = jpvcNo;
		params['purpTpCd'] = purpose;
		params['etw'] = serviceDate.dateString;
		params['shftId'] = shift;
		params['depyYn'] = deployment;
		params['statCd'] = megaStatus;
		params['megaNo'] = megaNo;
		params['rptTp'] = '';
		params['exportTp'] = '';
		params['userId'] = MOST.config.Token.getUserId();
		params['alertYn'] = alertYn;
		params['alertTp'] = me.alertTp;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		params['subSearchType'] = subSearchType;
		params['cmdt'] = StringUtil.toUpperCase(searchParm ? searchParm.get('cmdt') : null);
		params['saId'] = StringUtil.toUpperCase(searchParm ? searchParm.get('saId') : null);
		
    	if(dateCondition != null){
    		params['etaFrom'] = dateCondition.fromDtString;
    		params['etaTo'] = dateCondition.toDtString;
    	}
    	
    	return params;
	},
	
	onAddingMegaProcess: function() {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refMegaRequisitionGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) {
			selection = new Ext.create('MOST.model.planning.Mega');
			
			if(refs.ctlJpvc.getValue() != '' && refs.ctlJpvc.getValue() != null){
				selection.data.vslCallId = refs.ctlJpvc.getValue();
			}
			
			selection.data.purpTpCd = '';
			selection.set('viewType', me.VIEW_TYPE_CREATE);
		} else if(grid.getSelection().length > 1){
			MessageUtil.warning('warning_msg', 'megarequisition_copy_mega_msg');
			return null;
		} else {
			selection.set('viewType', me.VIEW_TYPE_COPY);
		}
		
		me.getView().detailViewAlias = 'app-megadetail';
		me.openDetailPopup(selection);
	},
	
	getDetailSearchCondition:function(){
		var me = this;
     	var refs = me.getReferences();
     	var dateCondition = '';
     	var serviceDate = me.checkDate('ctlServiceDate');
     	var jpvcNo = refs.ctlDetailJpvc.getValue();
     	var shift = refs.ctlShiftCombo.getValue();
     	var deployment = refs.ctlDeploymentCombo.getValue();
     	var purpose = refs.ctlPurposeCombo.getValue();
     	var megaStatus = refs.ctlMegaStatusCombo.getValue();
     	var megaNo = refs.ctlMegaNo.getValue();
     	var commodity = refs.ctlCommodity.getValue();
     	var sa = refs.ctlSa.getValue();
     	var ptnrType = '';
     	var userRole = null;
     	var alertYn = '';
     	
     	if(me.alertYN == 'N'){
     		if(jpvcNo == ""){
        		if(refs.ctlFromDt.getValue() == null || refs.ctlFromDt.getValue() == "" || refs.ctlToDt.getValue() == null || refs.ctlToDt.getValue() == "" ){
        			refs.ctlFromDt.reset();
        		}
        		
        		if((refs.ctlFromDt.getValue() == null || refs.ctlFromDt.getValue() == "") && (refs.ctlToDt.getValue() == null || refs.ctlToDt.getValue() == "") ){
        			MessageUtil.warning('Warning', 'megarequisition_jpvc_eta_mandatory_msg');
            		return null;
        		}
     		}else{
        		refs.ctlFromDt.reset();
        		refs.ctlToDt.reset();
        	}
     	}else{
     		alertYn = 'Y';
     	}
     	
     	if(refs.ctlFromDt.getValue() != null && refs.ctlToDt.getValue() != null){
            dateCondition = me.checkPeriodDate("ctlFromDt", "ctlToDt", me.MAX_DATE_ALLOW, true);
            workStDt = dateCondition.fromDtString;
            workEndDt = dateCondition.toDtString;
        }
    	
    	if(!StringUtil.isNullorEmpty(megaNo) && megaNo.length < 4){
    		refs.ctlMegaNo.focus();
    		MessageUtil.warning('Warning', 'megarequisition_megano_least_msg');
    		
    		return null;
    	}
    	
    	if(serviceDate.dateString != '' && serviceDate.dateString != null){
    		dateCondition.fromDtString = '';
    		dateCondition.toDtString = '';
    	}
    	
    	if( MOST.config.Token.getUserType() === CodeConstants.USER_TYPE_INTERNAL){
    		userRole = 'BS';
    	}
    	
    	if(me.existsPatnerType(me.SHIPPING_AGENCY)){
    		ptnrType = me.SHIPPING_AGENCY;
    	} else if (me.existsPatnerType(me.FORWARDER)){
    		ptnrType = me.FORWARDER;
    	}
    	
    	var params = {
    		ptnrType : ptnrType,
    		searchType : 'megalist',
    		shftMethCd : 'Standard',
    		depyYn : 'N',
    		alertYn : 'N',
    		userRole : userRole,
    		vslCallId : jpvcNo,
    		purpTpCd : purpose,
    		cmdt : commodity,
    		etw : serviceDate.dateString,
    		saId : sa,
    		shftId : shift,
    		depyYn : deployment,
    		statCd : megaStatus,
    		megaNo : megaNo,
    		rptTp: '',
    		exportTp:'',
    		userId: MOST.config.Token.getUserId(),
    		alertYn: alertYn,
     		alertTp: me.alertTp
    	};
    	
    	if(dateCondition != null){
    		params['etaFrom'] = dateCondition.fromDtString;
    		params['etaTo'] = dateCondition.toDtString;
    	}
    	
    	return params;
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * DETAIL START
	 */
	onDetailLoad:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var infoForm = detailView.down('form').getForm();
		var mainItem = new Ext.create('MOST.model.planning.Mega');
		
		infoForm.isValid();

		me.setComboBoxWithLocalCache(CacheServiceConstants.MEGA_DETAIL_YN_COMBOBOX, me.PARAMETTER_MEGA_DETAIL_YN_COMBOBOX_STORE);
		me.getViewModel().setData({theMain:mainItem});
		
		me.setDetailInitialize();
	},
	
	setDetailInitialize:function(){
		var me = this;
		var refs = me.getReferences();
		var megadetail = me.getStore('megaDetailList');
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var subSearchType;
		var copyType;
		
		me.CURRENT_VIEW_TYPE = recvData.get('viewType');

		recvData.commit();
		
		if(me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_CREATE){
			subSearchType = 'tabInitialCreate';
			copyType = 'C';
		} else {
			subSearchType = 'tabInitialUpdate';
			copyType = 'U';
		}
		
		me.deployedYN = recvData.data.deployedYN;
		
		var params = {
			subSearchType : subSearchType,
			purpTpCd : recvData.data.purpTpCd,
			vslCallId : recvData.data.vslCallId,
			megaNo : recvData.data.megaNo,
			copyType : copyType,
			shftId: recvData.data.shftId
		};
		
		me.setComboStore(params);
		me.setDetailTabControl(params, recvData);
		
		refs.ctlCargoDetailPackage.setDisabled(true);
		refs.refCargoDetailMT.setDisabled(true);
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === 'ctlDetailJpvc'){
			var detailItem = me.getViewModel().get('theMain');
			
			detailItem.set('shipgNoteNo', null);
			detailItem.set('dono', null);

			if(returnValue){
				detailItem.set('vslCallId', returnValue.code);
				me.getViewModel().setData({theVsl:returnValue.item});
				me.setDetailInitializePopupData();
			} else {
				me.getViewModel().setData({theVsl:null});
				me.searchWarehouse(true);
			}
		} else if(targetControl === 'ctlJpvc' && refs.ctlJpvc.getValue() != ""){
			refs.ctlFromDt.setValue('');
			refs.ctlToDt.setValue('');
		} else if(targetControl === 'ctlDetailCommodity'){
			refs.ctlDetailCommodityGroup.setValue(returnValue.item.data.cmmdGrpName);
			refs.ctlDetailCommodityGroupCd.setValue(returnValue.item.data.cmmdGrpCode);
		} else if (targetControl === 'ctlScn') {
			if (returnValue) {
				refs.ctlScn.setValue(returnValue.code);

				if (!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))) {
					refs.ctlJpvc.setValue(returnValue.item.get('vslCallId'));
					me.getViewModel().setData({ theVsl: returnValue.item });
				} else {
					refs.ctlJpvc.setValue('');
					me.getViewModel().setData({ theVsl: null });
				}
			}
		} else if (targetControl === 'ctlDetailScn') {
			if (returnValue) {
				refs.ctlDetailScn.setValue(returnValue.code);

				if (!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))) {
					refs.ctlDetailJpvc.setValue(returnValue.item.get('vslCallId'));
					me.getViewModel().setData({ theVsl: returnValue.item });
					me.onSearch();
				} else {
					refs.ctlDetailJpvc.setValue('');
					me.getViewModel().setData({ theVsl: null });
				}
			}
		}
	},
	
	setDetailInitializePopupData:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var subSearchType;
		
		me.searchWarehouse();
		
		me.CURRENT_VIEW_TYPE = 'CREATE';

		recvData.commit();
		
		if(me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_CREATE){
			subSearchType = 'tabInitialCreate'
		} else {
			subSearchType = 'tabInitialUpdate'
		}
		
		me.deployedYN = recvData.data.deployedYN;
	},
	
	onComboChangeForMegaDetailPurpose : function(combo, value, obj){
		var me = this;
		var grid = combo.up('grid');
		
		if(value !== null){
			me.setControlForPurpose(combo.selection.get('scdLgv'));
		}
	},
	
	setControlForPurpose:function(purpose){
		var me = this;
		var vslItem = me.getViewModel().get('theVsl');
		var refs = me.getReferences();
		var blnWh = true;
		
		if(purpose === '' || purpose === null){
		    blnWh = false;
		}
		
		refs.ctlMegaDetailHatchRadio.setDisabled(false);	
		refs.ctlMegaDetailWorkHatchNo.setDisabled(false);

		refs.ctlMegaDetailWarehouseRadio.setDisabled(true);	
		refs.ctlMegaDetailSn.setDisabled(true);	
		refs.ctlMegaDetailDo.setDisabled(true);	
		refs.ctlMegaDetailDo.setValue('');
		refs.ctlMegaDetailSn.setValue('');
		
		if(purpose === 'MP'){
			blnWh = true;
			
			refs.ctlCrewContainer.setActiveItem(me.CREW_WH_OPR);
			
			refs.ctlMegaDetailStrevdoreCrewVslOprContainer.setHidden(true);
			refs.ctlMegaDetailStrevdoreCrewWhOprContainer.setHidden(false);
			
			refs.ctlMegaDetailHatchRadio.setDisabled(true);	
			refs.ctlMegaDetailWorkHatchNo.setDisabled(true);	
			
			refs.ctlMegaDetailWarehouseRadio.setDisabled(false);	
			refs.ctlMegaDetailSn.setDisabled(false);	
			refs.ctlMegaDetailDo.setDisabled(false);	
		} else {
			blnWh = false;
			
			if(purpose === 'VP'){
				refs.ctlCrewContainer.setActiveItem(me.CREW_VSL_OPR);
				refs.ctlMegaDetailStevedoreShipCrew.setValue(false);
				
				refs.ctlMegaDetailStrevdoreCrewVslOprContainer.setHidden(false);
				refs.ctlMegaDetailStrevdoreCrewWhOprContainer.setHidden(true);
				
				refs.ctlMegaDetailHatchRadio.setDisabled(false);	
				refs.ctlMegaDetailWorkHatchNo.setDisabled(false);
				
				refs.ctlMegaDetailWarehouseRadio.setDisabled(true);	
				refs.ctlMegaDetailSn.setDisabled(true);	
				refs.ctlMegaDetailDo.setDisabled(true);	
			} else {
				refs.ctlCrewContainer.setActiveItem(me.CREW_BLANK);
			}
		}
		
		me.setWarehouseRadio(blnWh);
		
	    refs.ctlMegaDetailWhAppr.setValue(blnWh);
	    refs.ctlMegaDetailWhAppr.setVisible(blnWh);
		
		if(me.CURRENT_VIEW_TYPE == me.VIEW_TYPE_UPDATE){
			 refs.ctlMegaDetailWhAppr.setVisible(false);
		}
		
		if(!StringUtil.isNullorEmpty(vslItem.get('vslCallId')) 
				&& !StringUtil.isNullorEmpty(vslItem.get('arrvSaId')) 
				&& (MOST.config.Token.getUserType() !== CONSTANTS.USER_TYPE_EXTERNAL) 
				&& (me.CURRENT_VIEW_TYPE !== me.VIEW_TYPE_UPDATE)){
			refs.ctlDetailRequester.setEditableControl(true);
		} else {
			refs.ctlDetailRequester.setEditableControl(false);
			refs.ctlDetailRequester.setValue(MOST.config.Token.getUserId());
		}
		
		if(MOST.config.Token.getUserType() == CodeConstants.USER_TYPE_INTERNAL){
			refs.refDetailForkliftWhQty.setVisible(blnWh);
			refs.ctlDetailRequester.setValue(MOST.config.Token.getUserId());
		}
	},
	
	setWarehouseRadio : function(checked){
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlMegaDetailWarehouseRadio.setValue(checked);
		refs.ctlMegaDetailWarehouseRadio.setReadOnly(!checked);
		refs.ctlMegaDetailHatchRadio.setValue(!checked);
		refs.ctlMegaDetailHatchRadio.setReadOnly(checked);
		refs.ctlMegaDetailSn.setReadOnly(!checked);
		refs.ctlMegaDetailDo.setReadOnly(!checked);
	},
	
	setComboStore:function(recvData){
		var me = this;
		var refs = me.getReferences();
		var shiftCombo = me.getStore('megaDetailShiftCombo');
		var purposeCombo = me.getStore('megaDetailPurposeCombo');
		var cargoTypeCombo = me.getStore('megaDetailCargoTypeCombo');
		var eqTypeComboForGears = me.getStore('megaDetailEqTypeComboForGears');
		var eqTypeComboForMechanical = me.getStore('megaDetailEqTypeComboForMechanical');
		var eqTypeComboForPortCrane = me.getStore('megaDetailEqTypeComboForPortCrane');
		var forkliftCapacityCombo = me.getStore('megaDetailForkliftCapacityCombo');
		var trailerCapacityCombo = me.getStore('megaDetailTrailerCapacityCombo');
		
		shiftCombo.load({
			params:{
				//shftDivCd: recvData.purpTpCd,
				shftId: recvData.shftId
			}
		});
		purposeCombo.load();
		cargoTypeCombo.load();
		eqTypeComboForGears.load();
		eqTypeComboForMechanical.load();
		eqTypeComboForPortCrane.load();
		forkliftCapacityCombo.load();
		trailerCapacityCombo.load();
		//Mantis: 0167877
		me.gearsCapacityComboLoad(CodeConstants.MT_EQCD_GR, me);
	},
	
	// Settings Detail Control
	setDetailTabControl:function(masterItem, recvData){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var gears = me.getStore('megaDetailGears');
		var forklift = me.getStore('megaDetailForklift');
		var trailer = me.getStore('megaDetailTrailer');
		var mechanical = me.getStore('megaDetailMechanical');
		var portCrane = me.getStore('megaDetailPortCrane');
		var cargoDetail = me.getStore('megaDetailCargoDetail');
		var cargoDetailList = me.getStore('megaDetailCargoDetailList');
		var cargoDetailInfo = me.getStore('megaDetailCargoDetailInfo');
		var gearsCompany = me.getStore('megaDetailTabGearsCompany');
		var forkliftCompany = me.getStore('megaDetailTabForkliftCompany');
		var trailerCompany = me.getStore('megaDetailTabTrailerCompany');
		var mechanicalCompany = me.getStore('megaDetailTabMechanicalCompany');
		var portCraneCompany = me.getStore('megaDetailTabPortCraneCompany');
		var vesselCallIdList = me.getStore('vesselCallIdList');
		var confirmationSlipDryBreakBulk = me.getStore('confirmationSlipDryBreakBulk');
		var megadetail = me.getStore('megaDetailList');
		var megaStevedoreList = me.getStore('megaStevedoreList');
		var mainItem = null;
		var theVsl = me.getViewModel().get('theVsl');
		
		if( MOST.config.Token.getUserType() === CONSTANTS.USER_TYPE_INTERNAL){
			me.hasAuthConfirm = true;
			me.hasAuthApproval = true;
		} else {
			me.hasAuthConfirm = false;
			me.hasAuthApproval = false;
		}
		
		if(recvData != null){
			refs.ctlMegaDetailSn.suspendEvents();
			refs.ctlMegaDetailDo.suspendEvents();
			
			var jpvcDetailItem = new Ext.create('MOST.model.planning.VesselSchedule');
			if (masterItem.vslCallId != '' && masterItem.vslCallId != null)  {
				vesselCallIdList.load({
					params: masterItem,
					callback: function(records, operation, success){
						if(success){
							if(records.length > 0){
								jpvcDetailItem.phantom = false; // UPDATE
								jpvcDetailItem.data = records[0];
								DateUtil.convertDateToLong(jpvcDetailItem.data, ['eta', 'etd', 'etw']);
								
								me.getViewModel().setData({theVsl:jpvcDetailItem.data});
								
								me.searchWarehouse();
								me.setControlForPurpose(recvData.data.purpType);
							}
						}
					}
				});
			} else {
				var blankSearchVesselCall = new Ext.create('MOST.model.common.SearchVesselCall');
				this.getViewModel().set('theVsl', blankSearchVesselCall);
			}
			
			gears.data.removeAll();
			gears.commitChanges();
			gearsCompany.data.removeAll();
			gearsCompany.commitChanges();
								
			forklift.data.removeAll();
			forklift.commitChanges();
			forkliftCompany.data.removeAll();
			forkliftCompany.commitChanges();

			trailer.data.removeAll();
			trailer.commitChanges();
			trailerCompany.data.removeAll();
			trailerCompany.commitChanges();

			mechanical.data.removeAll();
			mechanical.commitChanges();
			mechanicalCompany.data.removeAll();
			mechanicalCompany.commitChanges();

			portCrane.data.removeAll();
			portCrane.commitChanges();
			portCraneCompany.data.removeAll();
			portCraneCompany.commitChanges();
			
			cargoDetailInfo.data.removeAll();
			cargoDetailInfo.commitChanges();

			if(me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_UPDATE){
				cargoDetail.load({
					callback: function(records, operation, success){
						if(success){
							cargoDetailList.load({
								params: masterItem,
								callback: function(records, operation, success){
									cargoDetailInfo.setData(records);
									cargoDetailInfo.commitChanges();
									
									for(var i = 0; i < records.length; i++){
										var inputedCargoItem = records[i];
										
										for(var j =0; j < cargoDetail.data.length; j++){
											var cargoItem = cargoDetail.data.getAt(j);
											
											if(inputedCargoItem.cgDescCd === cargoItem.data.cd){
												cargoItem.set(Ext.String.format('hatchNo{0}', + inputedCargoItem.hatchNo), inputedCargoItem.cgDescVal);
												cargoItem.set('hatchNo', inputedCargoItem.hatchNo);
											}
										}
									}
									
									cargoDetail.commitChanges();
								}
							})						
						}
					}
				});
			}
					
			if(me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_CREATE){
				mainItem = new Ext.create('MOST.model.planning.Mega');
				
				if(refs.ctlJpvc.getValue() != "" || refs.ctlDetailJpvc.getValue() != ""){
					confirmationSlipDryBreakBulk.load({
						params: masterItem,
						callback: function(records, operation, success){
							if(success){
								if(records.length > 0){
									mainItem.data = records[0];
								}
								
								me.getViewModel().setData({theMain:mainItem});
							}
						}
					})
				}
					
				mainItem.set('workYmd', new Date());
				mainItem.set('statCd', 'CR');
				
				if(theVsl != null){
					mainItem.set('vslCallId', theVsl.get('vslCallId'));
				}
				
				var stevedoreItem = new Ext.create('MOST.model.planning.Mega');
				var stevedoreCrewItem = new Ext.create('MOST.model.planning.Mega');
				var stevedoreTallyItem = new Ext.create('MOST.model.planning.Mega');
				var stevedoreLashingItem = new Ext.create('MOST.model.planning.Mega');
				var trimmingItem = new Ext.create('MOST.model.planning.Mega');
				
				me.getViewModel().setData({theStevedore:stevedoreItem});
				me.getViewModel().setData({theCrew:stevedoreCrewItem});
				me.getViewModel().setData({theTally:stevedoreTallyItem});
				me.getViewModel().setData({theLashing:stevedoreLashingItem});
				me.getViewModel().setData({theTrimming:trimmingItem});
				
				me.visibleControlInTab(mainItem, recvData);
			} else {
				mainItem = new Ext.create('MOST.model.planning.Mega');
				
				megadetail.load({
					params: masterItem,
					callback: function(records, operation, success){
						if(success){
							if(records.length > 0){
								mainItem.set('workYmd',records.at(0).data.workYmd);
								mainItem.set('reqr',records.at(0).data.reqr);
								mainItem.set('reqComp',records.at(0).data.reqComp);
								mainItem.set('reqDt',records.at(0).data.reqDt);
								mainItem.set('appr',records.at(0).data.appr);
								mainItem.set('statCd',records.at(0).data.statCd);
								mainItem.set('statCdNm',records.at(0).data.statCdNm);
								mainItem.set('shftId',records.at(0).data.shftId);
								mainItem.set('purpTpCd',records.at(0).data.purpTpCd);
								mainItem.set('megaNo',records.at(0).data.megaNo);
								mainItem.set('rmk', records.at(0).data.rmk);
								mainItem.set('rejRmk', records.at(0).data.rejRmk);
								mainItem.set('refNo',records.at(0).data.megaNo);
								mainItem.set('shipgNoteNo',records.at(0).data.shipgNoteNo);
								mainItem.set('dono',records.at(0).data.dono);
								mainItem.set('vslCallId', recvData.data.vslCallId);
								mainItem.set('cgTpCd', recvData.data.cgTpCd);
								mainItem.set('cgTpNm', recvData.data.cgTpNm);
								mainItem.set('cmdt', recvData.data.cmdt);
								mainItem.set('cmdtGr', recvData.data.cmdtGr);
								mainItem.set('cmdtGrCd', recvData.data.cmdtGrCd);
								
								confirmationSlipDryBreakBulk.load({
									params: masterItem,
									callback: function(records, operation, succecss){
										if(success){
											if(records.length > 0){
												mainItem.data = records[0];
												DateUtil.convertDateToLong(mainItem.data, ['workYmd', 'reqDt']);
											}
										}
									}
								})
								
								me.visibleControlInTab(mainItem, recvData);
							}
						}
					}
				});
				
				if(me.CURRENT_VIEW_TYPE  === me.VIEW_TYPE_COPY){
					mainItem.phantom = true;
					mainItem.set('vslCallId', recvData.data.vslCallId);
					mainItem.set('megaNo', '');
					mainItem.set('refNo', '');
					mainItem.set('reqr', '');
					mainItem.set('reqComp', '');
					mainItem.set('reqDt', '');
					mainItem.set('appr', '');
					mainItem.set('appDt', '');
					mainItem.set('statCd', '');
					mainItem.set('megaWhYn', '');
					mainItem.set('rmk', '');
					mainItem.set('rejRmk', '');
				}
				
				me.getViewModel().setData({theMain:mainItem});
				
				megaStevedoreList.load({
					params: masterItem,
					callback: function(records, operation, success){
						if(success){
							var stevedoreItem = new Ext.create('MOST.model.planning.Mega');
							var stevedoreCrewItem = new Ext.create('MOST.model.planning.Mega');
							var stevedoreTallyItem = new Ext.create('MOST.model.planning.Mega');
							var stevedoreLashingItem = new Ext.create('MOST.model.planning.Mega');
							var trimmingItem = new Ext.create('MOST.model.planning.Mega');
							
							if(records.length == 5 && me.CURRENT_VIEW_TYPE  !== me.VIEW_TYPE_COPY){
								stevedoreItem.phantom = false;
								stevedoreItem.data = records[0];
								
								stevedoreCrewItem.phantom = false;
								stevedoreCrewItem.data = records[1];
								
								stevedoreTallyItem.phantom = false;
								stevedoreTallyItem.data = records[3];
								
								stevedoreLashingItem.phantom = false;
								stevedoreLashingItem.data = records[4];
								
								trimmingItem.phantom = false;
								trimmingItem.data = records[2];
							} else if(records.length == 5 && me.CURRENT_VIEW_TYPE  === me.VIEW_TYPE_COPY){
								stevedoreItem.phantom = true;
								stevedoreItem.data = records[0];
								
								stevedoreCrewItem.phantom = true;
								stevedoreCrewItem.data = records[1];
								
								stevedoreTallyItem.phantom = true;
								stevedoreTallyItem.data = records[3];
								
								stevedoreLashingItem.phantom = true;
								stevedoreLashingItem.data = records[4];
								
								trimmingItem.phantom = true;
								trimmingItem.data = records[2];
							}
						}
						
						me.getViewModel().setData({theStevedore:stevedoreItem.data});
						me.getViewModel().setData({theCrew:stevedoreCrewItem.data});
						me.getViewModel().setData({theTally:stevedoreTallyItem.data});
						me.getViewModel().setData({theLashing:stevedoreLashingItem.data});
						me.getViewModel().setData({theTrimming:trimmingItem.data});
					}
				});
				
				gears.load({
					params: masterItem,
					callback: function(records, operation, success){
						if(me.CURRENT_VIEW_TYPE  === me.VIEW_TYPE_COPY){
							for(var i = 0; i< records.length; i++){
								var record = records[i];
								
								record.confmQty = 0;
								record.operInfoItems = new Array();
							}
							
							for(var i = 0; i< records.length; i++){
								var record =records[i];
								
			                    gearsCompany.setData(record.operInfoItems);
								gearsCompany.commitChanges();
							}
						}
					}
				});
				forklift.load({
					params: masterItem,
					callback: function(records, operation, success){
						if(me.CURRENT_VIEW_TYPE  === me.VIEW_TYPE_COPY){
							for(var i = 0; i< records.length; i++){
								var record = records[i];
								
								record.confmQty = 0;
								record.operInfoItems = new Array();
							}
							
							for(var i = 0; i< records.length; i++){
								var record =records[i];
								
								forkliftCompany.setData(record.operInfoItems);
								forkliftCompany.commitChanges();
							}
						}
					}
				});
				trailer.load({
					params: masterItem,
					callback: function(records, operation, success){
						if(me.CURRENT_VIEW_TYPE  === me.VIEW_TYPE_COPY){
							for(var i = 0; i< records.length; i++){
								var record = records[i];
								
								record.confmQty = 0;
								record.operInfoItems = new Array();
							}
							
							for(var i = 0; i< records.length; i++){
								var record =records[i];
								
								trailerCompany.setData(record.operInfoItems);
								trailerCompany.commitChanges();
							}
						}
					}
				});
				mechanical.load({
					params: masterItem,
					callback: function(records, operation, success){
						if(me.CURRENT_VIEW_TYPE  === me.VIEW_TYPE_COPY){
							for(var i = 0; i< records.length; i++){
								var record = records[i];
								
								record.confmQty = 0;
								record.operInfoItems = new Array();
							}
							
							for(var i = 0; i< records.length; i++){
								var record =records[i];
								
								mechanicalCompany.setData(record.operInfoItems);
								mechanicalCompany.commitChanges();
							}
						}
					}
				});
				portCrane.load({
					params: masterItem,
					callback: function(records, operation, success){
						if(me.CURRENT_VIEW_TYPE  === me.VIEW_TYPE_COPY){
							for(var i = 0; i< records.length; i++){
								var record = records[i];
								
								record.confmQty = 0;
								record.operInfoItems = new Array();
							}
							
							for(var i = 0; i< records.length; i++){
								var record =records[i];
								
								portCraneCompany.setData(record.operInfoItems);
								portCraneCompany.commitChanges();
							}
						}
					}
				});
			}
			
			if(me.CURRENT_VIEW_TYPE  === me.VIEW_TYPE_CREATE || me.CURRENT_VIEW_TYPE  === me.VIEW_TYPE_COPY){
				detailView.items.get(0).recvData = mainItem;
			}
			
			refs.ctlMegaDetailSn.resumeEvents();
			refs.ctlMegaDetailDo.resumeEvents();
		}
		
		me.onLashingDisabledControl(true);
	},
	
	visibleControlInTab : function(mainItem, recvData){
		var me = this;
		var refs = me.getReferences();
		
		if(recvData.get('statCd') === CodeConstants.MT_MEGASTAT_CR || me.CURRENT_VIEW_TYPE !== me.VIEW_TYPE_UPDATE){
			me.visibleDetailToolButton(ViewUtil.TOOL_SAVE, true);
		} else {
			if(me.USER_TYPE === CONSTANTS.USER_TYPE_INTERNAL && (recvData.get('statCd') === CodeConstants.MT_MEGASTAT_AP || recvData.get('statCd') === CodeConstants.MT_MEGASTAT_CA)){
				me.visibleDetailToolButton(ViewUtil.TOOL_SAVE, false);
			} else {
				me.visibleDetailToolButton(ViewUtil.TOOL_SAVE, true);
			}
		}
		
		if(me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_CREATE){
			me.setWarehouseRadio(false);
		}
		
		refs.ctlMegaDetailWhAppr.setVisible(false);
		
		me.visibleDetailEquipmentGrid(recvData);
		
		refs.ctlDetailMegaStedoreNosofGang.setReadOnly(false);
		
		if(recvData != null){
			if(me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_CREATE){
				refs.ctlSubmitLabel.setText('');
			} else if(me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_COPY){
				refs.ctlSubmitLabel.setText(Ext.String.format('[{0}]', me.CURRENT_VIEW_TYPE));
			} else {
				refs.ctlSubmitLabel.setText(Ext.String.format('[{0}]', mainItem.get('statCdNm')));
			}
			
			if(me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_CREATE || me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_COPY){
				refs.ctlApprovalContainer.setActiveItem(me.APPROVAL_SUBMIT);
				me.visibleDetailJpvcPanel(false);
			} else {
				if(recvData.get('rejYn') === 'Y'){
					refs.ctlDetailRejectMessage.setVisible(true);
				} else {
					refs.ctlDetailRejectMessage.setVisible(false);
				}
				
				var strStat = recvData.get('statCd');
				
				if (strStat == CodeConstants.MT_MEGASTAT_CF){
					strStat = CodeConstants.MT_MEGASTAT_SU;
				}
				
				switch(strStat){
					case CodeConstants.MT_MEGASTAT_RJ:
						refs.ctlDetailMegaWorkYmd.setReadOnly(true);
						refs.ctlDetailMegaShift.setReadOnly(true);
						
						if(recvData.get('userMegaYn') == 'Y'){
							refs.ctlApprovalContainer.setActiveItem(me.APPROVAL_RESUBMIT);
						} else {
							refs.ctlApprovalContainer.setVisible(false);
						}
						
						refs.ctlDetailRejectMessage.setVisible(true);
						
						break;
					case CodeConstants.MT_MEGASTAT_CR:
						refs.ctlApprovalContainer.setActiveItem(me.APPROVAL_SUBMIT);
						
						break;
					case CodeConstants.MT_MEGASTAT_CA:
						refs.ctlDetailMegaWorkYmd.setReadOnly(true);
						refs.ctlDetailMegaShift.setReadOnly(true);
						refs.ctlApprovalContainer.setVisible(false);
						
						break;
					case CodeConstants.MT_MEGASTAT_RV:
						refs.ctlDetailMegaWorkYmd.setReadOnly(true);
						refs.ctlDetailMegaShift.setReadOnly(true);
						refs.ctlApprovalContainer.setVisible(false);
						
						break;
					case CodeConstants.MT_MEGASTAT_SU:
						if(me.hasAuthApproval){
							refs.ctlApprovalContainer.setActiveItem(me.APPROVAL_APPROVAL);
							if(recvData.get('purpType') === 'MP' && recvData.get('megaWhYn') != 'Y'){
								// Forklift order is not
								if(recvData.get('forkliftYn') != 'Y'){
									if(recvData.get('userMegaYn') == 'Y'){
										refs.ctlApprovalContainer.setActiveItem(me.APPROVAL_RESUBMITAPPROVAL);
									} else {
										refs.ctlApprovalContainer.setActiveItem(me.APPROVAL_APPROVAL);
										refs.ctlDetailMegaWorkYmd.setReadOnly(true);
										refs.ctlDetailMegaShift.setReadOnly(true);
										refs.ctlDetailMegaStedoreNosofGang.setReadOnly(false);
									}
									
									refs.ctlDetailRejectMessage.setVisible(true);
								} else {
									if(recvData.get('userMegaYn') == 'Y'){
										//Distinguish internal planning user and internal supervisor part..
										if(MOST.config.Token.getIsSupervisor() == 'Y'){
											refs.ctlApprovalContainer.setActiveItem(me.APPROVAL_APPROVAL);
										} else {
											refs.ctlApprovalContainer.setActiveItem(me.APPROVAL_RESUBMIT);
										}
									} 
//									else {
//										refs.ctlApprovalContainer.setVisible(false);
//									}
								}
							} else {								
								if(recvData.get('userMegaYn') == 'Y'){
									refs.ctlApprovalContainer.setActiveItem(me.APPROVAL_RESUBMITAPPROVAL);
								} else {
									refs.ctlApprovalContainer.setActiveItem(me.APPROVAL_APPROVAL);
									refs.ctlDetailMegaWorkYmd.setReadOnly(true);
									refs.ctlDetailMegaShift.setReadOnly(true);
									refs.ctlDetailMegaStedoreNosofGang.setReadOnly(false);
								}
								
								refs.ctlDetailRejectMessage.setVisible(true);
							}
						} else {
							if(recvData.get('purpType') === 'MP' && recvData.get('megaWhYn') == 'Y'){
								refs.ctlDetailMegaWorkYmd.setReadOnly(true);
								refs.ctlDetailMegaShift.setReadOnly(true);
							}
							
							if(recvData.get('userMegaYn') == 'Y'){
								refs.ctlApprovalContainer.setActiveItem(me.APPROVAL_RESUBMIT);
							} else {
								refs.ctlApprovalContainer.setVisible(false);
							}
						}
							
						break;
					case CodeConstants.MT_MEGASTAT_AP:
						refs.ctlDetailMegaWorkYmd.setReadOnly(true);
						refs.ctlDetailMegaShift.setReadOnly(true);
						
						if(me.hasAuthApproval){
							refs.ctlApprovalContainer.setActiveItem(me.APPROVAL_APPROVAL);
							refs.ctlDetailMegaStedoreNosofGang.setReadOnly(false);
							refs.ctlDetailRejectMessage.setVisible(true);
						} else {
							if(recvData.get('userMegaYn') == 'Y'){
								refs.ctlApprovalContainer.setActiveItem(me.APPROVAL_CANCEL);
							} else {
								refs.ctlApprovalContainer.setVisible(false);
							}
						}
						
						break;
					case me.STAT_REQUEST_CANCELED:
						refs.ctlDetailMegaWorkYmd.setReadOnly(true);
						refs.ctlDetailMegaShift.setReadOnly(true);
						
						if(me.hasAuthApproval){
							refs.ctlApprovalContainer.setActiveItem(me.APPROVAL_REQUEST_CANCELED);
							refs.ctlDetailMegaStedoreNosofGang.setReadOnly(false);
							refs.ctlDetailRejectMessage.setVisible(true);
						} else {
							refs.ctlApprovalContainer.setVisible(false);
						}
						
						break;
					default:
						break;
				}
				
				me.visibleDetailJpvcPanel(true);
			}
		}
	},
	
	visibleDetailJpvcPanel:function(booleanValue){
		var me = this;
		var refs = me.getReferences();
		
		refs.ctlDetailJpvc.setEditableControl(!booleanValue);
		refs.ctlDetailMegaNo.setVisible(booleanValue);
		refs.ctlDetailPurpose.setReadOnly(booleanValue);
	},
	
	isEditableDetailGridTab:function(bizName){
		var me = this;
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var refs = me.getReferences();
		var strStat = recvData.get('statCd');
		var reqEditable = true;
		
		if(me.hasAuthConfirm){
			if(recvData.get('purpType') === 'MP' && recvData.get('megaWhYn') == 'Y'){
				if(strStat == CodeConstants.MT_MEGASTAT_AP || strStat == CodeConstants.MT_MEGASTAT_CF || (strStat == CodeConstants.MT_MEGASTAT_SU && recvData.get('forkliftYn') != 'Y')){
					reqEditable = false;
				}
			} else {
				if (strStat == CodeConstants.MT_MEGASTAT_AP || strStat == CodeConstants.MT_MEGASTAT_SU){
					reqEditable = false;
				}
			}
		}
		
		return reqEditable;
	},
	
	visibleDetailEquipmentGrid:function(recvData){
		var me = this;
		var refs = me.getReferences();
		var visibleYN = false;
		
		if(me.USER_TYPE === CodeConstants.USER_TYPE_EXTERNAL){
			visibleYN = true;
		}
		
		refs.ctlCompanyGear.setVisible(!visibleYN);
		refs.ctlDetailGearImage.setVisible(visibleYN);
		
		// Forklift Image & Company Grid(Operator)
		refs.ctlCompanyForklift.setVisible(!visibleYN);
		refs.ctlDetailForkliftImage.setVisible(visibleYN);
		refs.refDetailForkliftWhQty.setVisible(!visibleYN);
		
		// Trailer Image
		refs.ctlCompanyTrailer.setVisible(!visibleYN);
		refs.ctlDetailTrailerImage.setVisible(visibleYN); // false
		
		// Mechanical Image
		refs.ctlCompanyMechanical.setVisible(!visibleYN);
		refs.ctlDetailMechanicalImage.setVisible(visibleYN); // false
		
		// PortCrane Image
		refs.ctlCompanyPortCrane.setVisible(!visibleYN);
		refs.ctlDetailPortCraneImage.setVisible(visibleYN);// false
		
		me.isAmendVisible = false;
		
		if(!me.hasAuthConfirm){
			if((recvData.get('statCd') === CodeConstants.MT_MEGASTAT_SU || recvData.get('statCd') === CodeConstants.MT_MEGASTAT_RV ||
			    recvData.get('statCd') === CodeConstants.MT_MEGASTAT_CF) && recvData.get('megaTpCd') == CodeConstants.MT_MGTPCD_A){
				me.isAmendVisible = true;
			} else if (recvData.get('statCd') === CodeConstants.MT_MEGASTAT_AP && recvData.get('userMegaYn') === 'Y'){
				me.isAmendVisible = true; 
			}
		}
		
		me.settingEquipmentButton('Gears');
		me.settingEquipmentButton('Forklift');
		me.settingEquipmentButton('Trailer');
		me.settingEquipmentButton('Mechanical');
		me.settingEquipmentButton('PortCrane');
	},
	
	settingEquipmentButton : function(bizName){
		var me = this;
		var refs = me.getReferences();
		var reqEditable = me.isEditableDetailGridTab();
		var cudBtnView = me.lookupReference(Ext.String.format('cardCudBtnViewFor{0}', bizName));
		var reqConfView = me.lookupReference(Ext.String.format('cardReqConfViewFor{0}', bizName));
		var timeView = me.lookupReference(Ext.String.format('cardTimeViewFor{0}', bizName));
		var confQtyField = me.lookupReference(Ext.String.format('confQtyField{0}', bizName));
		var reqQtyField = me.lookupReference(Ext.String.format('reqQtyField{0}', bizName));

		if(!reqEditable){
			confQtyField.setHidden(false)
			reqQtyField.setHidden(true)	
		}else{
			confQtyField.setHidden(true)
			reqQtyField.setHidden(false)
		}
	},
	
	onBeforeEditForEquipment:function(editor, context) {
		var me = this;
		var grid = context.grid;
		var reqTime = grid.down('[dataIndex=dspReqhhmm]').getEditor();
		var reqQty = grid.down('[dataIndex=reqQty]').getEditor();
		var confmQty = grid.down('[dataIndex=confmQty]').getEditor();
		var reqEditable = me.isEditableDetailGridTab();
		
		reqTime.setReadOnly(!reqEditable);
		reqQty.setReadOnly(!reqEditable);
		confmQty.setReadOnly(reqEditable);
		
		if(!reqEditable){
			confmQty.maxValue = context.record.get('reqQty');
		}
		
		return true;
	},
	
	detailSaveProcess : function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var vslItem = me.getViewModel().get('theVsl');
		var validationCodeStore = me.getStore('megaDetailValidationCode');
		var megaItem = me.getViewModel().get('theMain');
		var validationMsg = '';
		
		if(me.USER_TYPE !== CONSTANTS.USER_TYPE_EXTERNAL && refs.ctlDetailRequester.getValue() === ''){
			MessageUtil.warning('warning_msg', 'Please input the requester.');
			
			return false;
		}
		
		if(me.USER_TYPE === CONSTANTS.USER_TYPE_EXTERNAL){
			if(vslItem.get('bbtLoc') === 'BBT'){
				if(vslItem.get('cgTpCd') === 'BT'){
					validationMsg = 'megadetail_submit_trade_vessel_eta_msg';
				} else {
					validationMsg = 'megadetail_submit_prior_eta_msg';
				}
				
				validationCodeStore.load({
					params : {
						tyCd : 'createDocument',
						vslCallId : vslItem.get('vslCallId'),
						cgTpCd : vslItem.get('cgTpCd')
					},
					callback: function(records, operation, success) {
						if (success) {
							if(records != null && records.length > 0){
								if(records[0].get('isValidated') === 'Y'){
									me.saveMega(megaItem);
								} else {
									MessageUtil.warning('warning_msg', validationMsg, vslItem.get('configDoc'));
								}
							} else {
								MessageUtil.warning('warning_msg', validationMsg, vslItem.get('configDoc'));
							}
						}
					}
				});
			}else{
				me.saveMega(megaItem);
			}
		} else {
			me.saveMega(megaItem);
		}
	},
	
	/**
	 * SAVE MEGA Perform save logic only when CREATE
	 */
	saveMega : function(recvData){
		var me = this;

		if(recvData.get('statCd') === CodeConstants.MT_MEGASTAT_CR || me.CURRENT_VIEW_TYPE !== me.VIEW_TYPE_UPDATE){
			me.serverSend(CodeConstants.MT_MEGASTAT_CR);
			me.CURRENT_VIEW_TYPE = me.VIEW_TYPE_UPDATE;
		} else {
			if( me.USER_TYPE === CONSTANTS.USER_TYPE_INTERNAL &&
				(recvData.get('statCd') === CodeConstants.MT_MEGASTAT_AP || recvData.get('statCd') === CodeConstants.MT_MEGASTAT_CA)){
				me.serverSendForRmk();
			}
		}
	},
	
	// Update Remark
	serverSendForRmk : function(){
		var me = this;
		var masterItem = me.getViewModel().get('theMain');
		var proxy = masterItem.getProxy();
		
		proxy.url = me.DETAIL_PROXY_URL;
		
		masterItem.set('insertType', 'updateRmk');
		masterItem.save();
	},
	
	// Server Send
	serverSend : function(statusCode){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var searchMegaStore = me.getStore('megaRequisitionForInsertData');
		var vslItem = me.getViewModel().get('theVsl');
		var masterItem = me.getViewModel().get('theMain');
		var forkliftStore = me.getStore('megaDetailForklift');
		var gearsStore = me.getStore('megaDetailGears');
		var mechanicalStore = me.getStore('megaDetailMechanical');
		var trailerStore = me.getStore('megaDetailTrailer');
		var portCraneStore = me.getStore('megaDetailPortCrane');
		var grid = me.lookupReference('refMegaRequisitionGrid');
		var store = me.getStore('megaRequisition');
		var cargoDetail = me.getStore('megaDetailCargoDetail');
		var isCreated = masterItem.phantom;
		var infoForm = detailView.down('form').getForm();
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		recvData.data.cmdtGr = masterItem.data.cmdtGr;
		recvData.data.cmdtGrCd = masterItem.data.cmdtGrCd;
		
		if(me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_UPDATE){
			masterItem.phantom = false;
			isCreated = masterItem.phantom;
		}
		
		if(!infoForm.isValid()){
			MessageUtil.mandatoryFieldInValid();
			
			return;
		}
		
    	if(refs.ctlDetailPurpose.getValue() === ''){
    		MessageUtil.info('Information', 'Please select the purpose.');
    		
    		return;
        }
		
		if(statusCode === CodeConstants.MT_MEGASTAT_AP && !me.validationApproval()){
			return;
		}
		
		if(statusCode!= CodeConstants.MT_MEGASTAT_RJ && !me.validationServerSend(statusCode, masterItem)) {
			return;
		}
		
		if(StringUtil.isNullorEmpty(masterItem.get('megaTpCd')) && me.USER_TYPE === CONSTANTS.USER_TYPE_INTERNAL){
			masterItem.set('megaTpCd', CodeConstants.MT_MGTPCD_A);
		}
		
		if(me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_COPY){
			var purposeComboStore = me.getStore('megaDetailPurposeCombo');
			
			if(purposeComboStore.loadCount <= 0){
				purposeComboStore.load();
			}
			
			masterItem.set('purpTpCd', refs.ctlDetailPurpose.getValue() );
			
			if(me.USER_TYPE === CONSTANTS.USER_TYPE_INTERNAL){
				masterItem.set('megaTpCd', CodeConstants.MT_MEGASTAT_CA);
			} else {
				masterItem.set('megaTpCd', me.COPY_MEGA);
			}
			
			masterItem.set('copyMegaNo', masterItem.get('megaNo'));
		} else if(me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_AMEND){
			masterItem.set('megaTpCd', CodeConstants.MT_MGTPCD_A);
			masterItem.set('copyMegaNo', masterItem.get('megaNo'));
			masterItem.set('amdBy', MOST.config.Token.getUserId());
		}
		
		if(refs.ctlDetailMegaStedoreCompany.getValue() || refs.ctlStevedoreWorkingArea.getValue() || refs.ctlDetailMegaStedoreNosofGang.getValue()){
			if(!(refs.ctlDetailMegaStedoreCompany.getValue() && refs.ctlStevedoreWorkingArea.getValue() && refs.ctlDetailMegaStedoreNosofGang.getValue())){
				MessageUtil.info('Information', 'Please input related Steveore company.');
				
				return;
			}
		}
		
		var proxy = masterItem.getProxy();
		proxy.url = me.DETAIL_PROXY_URL;
		
		masterItem.set('vslCallId', vslItem.get('vslCallId'));
		masterItem.set('statCd', statusCode);
		
		if(refs.ctlDetailPurpose.getValue() == 'MP0001'){
			if(refs.ctlMegaDetailWhAppr.getValue() == true){
				masterItem.set('whApprYn','Y');
			}else{
				masterItem.set('megaWhYn', 'Y');
			}
		}
		
		masterItem.set('stevedoreItems', me.getStevedoreTrimmingItems());
		
		var gearsItem = me.getModifyDataForGears();
		var forkliftItem = me.getModifyDataForForklift();
		var trailerItem = me.getModifyDataForTrailer();
		var mechanicalItem = me.getModifyDataForMechanical();
		var portCraneItem = me.getModifyDataForPortCrane();
		var cargoDetailItem = me.getModifyDataForCargoDetail(cargoDetail);
		var vslCallId  = refs.ctlDetailJpvc.getValue();
		
		refs.refBtnSubmitMega.setDisabled(true);

		masterItem.set('gearsItems', gearsItem.updateItems);
		masterItem.set('operInfoItemsForGears', gearsItem.compayItems);
		masterItem.set('forkliftItems', forkliftItem.updateItems);
		masterItem.set('operInfoItemsForForklift', forkliftItem.compayItems);
		masterItem.set('trailerItems', trailerItem.updateItems);
		masterItem.set('operInfoItemsForTrailer', trailerItem.compayItems);
		masterItem.set('mechenicalItems', mechanicalItem.updateItems);
		masterItem.set('operInfoItemsForMechanical', mechanicalItem.compayItems);
		masterItem.set('portCraneItems', portCraneItem.updateItems);
		masterItem.set('operInfoItemsForPortCrane', portCraneItem.compayItems);
		masterItem.set('cargoDetailItems', cargoDetailItem.updateItems);
		masterItem.set('userId', MOST.config.Token.getUserId());
		masterItem.set('copyType', isCreated ? 'C' : 'D');
		
		updateParm.getProxy().url = proxy.url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('item', masterItem.data);
		
//		var megaDetail = me.getStore('megaDetailList');
//		megaDetail.data.items[0].set('cmdtGr', masterItem.data.cmdtGr);
//		megaDetail.data.items[0].set('cmdtGrCd', masterItem.data.cmdtGrCd);
		
		updateParm.save({
			success : function(record, operation) {
				searchMegaStore.load({
					params:{
						megaNo : record.get('megaNo'),
						vslCallId: vslCallId,
						userRole: (Token.getUserType() == CodeConstants.USER_TYPE_INTERNAL)?'BS':''
					},
					callback : function(record, operation) {
						if(record != null && record.length > 0){
							me.updateRecord(recvData, record[0]);
							
							if(isCreated){
								store.insert(0, recvData);
								grid.getSelectionModel().select(recvData);
							}
							
							recvData.set('viewType', me.VIEW_TYPE_UPDATE);
							recvData.set('megaNo', record[0].data.megaNo);
							recvData.set('copyType', masterItem.get('copyType'));
							
							me.onDetailLoad();
							MessageUtil.saveSuccess();
						} else {
							MessageUtil.infoToast("warning_msg", "fail_msg");
							refs.refBtnSubmitMega.setDisabled(false);
						}
					}
				});
			}
		});
	},
	
	getStevedoreTrimmingItems : function(){
		var me = this;
		var addItems = new Array();
		
		var stevedoreItem = me.getViewModel().get('theStevedore');
		var crewItem = me.getViewModel().get('theCrew');
		var tallyItem = me.getViewModel().get('theTally');
		var lashingItem = me.getViewModel().get('theLashing');
		var trimmingItem = me.getViewModel().get('theTrimming');

		addItems.push(stevedoreItem.data);
		addItems.push(crewItem.data);
		addItems.push(trimmingItem.data);
		addItems.push(tallyItem.data);
		addItems.push(lashingItem.data);
		
		return addItems;
	},
	
	validationApproval : function(){
		return true;
	},
	
	validationServerSend : function(statusCode, masterItem){
		var me = this;
		var reqEditable = me.isEditableDetailGridTab();
		
		if((statusCode == CodeConstants.MT_MEGASTAT_SU || statusCode == CodeConstants.MT_MEGASTAT_CR)
				 || statusCode == CodeConstants.MT_MEGASTAT_CA){
			return true;
		}
		
		if(me.validateEqupmentGridCheck('Gears')){
			if(me.validateEqupmentGridCheck('Forklift')){
				if(me.validateEqupmentGridCheck('Trailer')){
					if(me.validateEqupmentGridCheck('Mechanical')){
						if(me.validateEqupmentGridCheck('PortCrane')){
							return true;
						}
					}
				}
			}
		}
		
		return false;
	},
	
	validateCompany : function(){
		var me = this;
		var refs = me.getReferences();
		
		try	{
			if ((!StringUtil.isNullorEmpty(refs.ctlDetailMegaStedoreCompany.getValue()) && (StringUtil.isNullorEmpty(refs.ctlStevedoreWorkingArea.getValue())))
				|| (!StringUtil.isNullorEmpty(refs.ctlDetailMegaStedoreTallyCompany.getValue()) && (StringUtil.isNullorEmpty(refs.ctlWorkingAreaTally.getValue())))
				|| (!StringUtil.isNullorEmpty(refs.ctlDetailMegaStedoreTrimmingCompany.getValue()) && (StringUtil.isNullorEmpty(refs.ctlTrimmingWorkingArea.getValue())))){
				throw 'mega_workingarea_null_msg';
			}
			
			if(me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_CREATE || me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_COPY){
				if(refs.ctlDetailPurpose.getValue() == 'NP001'){
					if(StringUtil.isNullorEmpty(refs.ctlWorkingAreaVesselOperation.getValue())){
                        throw 'mega_workingarea_null_msg';
					}
				}
			}else{
				if(refs.ctlDetailPurpose.getValue() == 'Vessel Operation'){
					if(StringUtil.isNullorEmpty(refs.ctlWorkingAreaVesselOperation.getValue())){
						throw 'mega_workingarea_null_msg';
					}
				}
			}
				
			if ((!StringUtil.isNullorEmpty(refs.ctlDetailMegaStedoreCompany.getValue()) && ((!refs.ctlDetailMegaStedoreNosofGang.getValue()) || (refs.ctlDetailMegaStedoreNosofGang.getValue() === 0)))){
				throw 'no_gang_zero_msg';
			}
			
			if ((!StringUtil.isNullorEmpty(refs.ctlDetailMegaStedoreLashingCompany.getValue()) && (StringUtil.isNullorEmpty(refs.ctlDetailMegaStevedoreLashingWorkingArea.getValue())))){
				throw 'mega_workingarea_null_msg';
			}
			
			if ((!StringUtil.isNullorEmpty(refs.ctlDetailMegaStedoreLashingCompany.getValue()) && ((!refs.ctlDetailMegaStedoreLashingNosofGang.getValue()) || (refs.ctlDetailMegaStedoreLashingNosofGang.getValue() === 0)))){
				throw 'no_gang_zero_msg';
			}
		}
		
		catch(err){
			MessageUtil.warning('submitMegaReq', err);
			
			return false;
		}
		
		return true;
	},
	
	onSubmitMega : function(){
		var me = this;
		var refs = me.getReferences();
    	var win = refs.refBtnSubmitMega.up('window');
    	var theMain = me.getViewModel().get('theMain');
    	
		if(win){
			win.getEl().mask('Process data...');
		}
		
		if(!me.validateCompany()){
			if(win){
				win.getEl().unmask();
			}
			
			return;
		}
		
		me.validationSubmitAmendCancel(me.submitMega); //comment temporary by Raizo 01/07/2021
	},
	
	onResubmitMega : function(){
		var me = this;
		
		me.onSubmitMega();
	},
	
	onApprovalMega : function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var theMain = me.getViewModel().get('theMain');
		
		theMain.phantom = false;
		
		if(recvData.get('statCd') === CodeConstants.MT_MEGASTAT_AP && StringUtil.isNullorEmpty(refs.ctlDetailRemark.getValue())){
			MessageUtil.warning('warning_msg', 'megadetail_remark_changed_msg');
			
			refs.ctlMegaDetailTabPanel.setActiveItem(0);
			refs.ctlDetailRemark.focus();
		} else {
			me.serverSend(CodeConstants.MT_MEGASTAT_AP);
		}
	},
	
	onRejectMega : function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
		if(StringUtil.isNullorEmpty(refs.ctlDetailRejectRemark.getValue())){
			MessageUtil.warning('warning_msg', 'mandatoryField_msg', 'CSC Remark');
			
			refs.ctlMegaDetailTabPanel.setActiveItem(0);
			refs.ctlDetailRejectRemark.focus();
		} else {
			me.serverSend(CodeConstants.MT_MEGASTAT_RJ);
		}
	},
	
	onCancelMega : function(){
		var me = this;
		me.validationSubmitAmendCancel(me.cancelMega);
	},
	
	onAmendMega : function(){
		var me = this;
		me.validationSubmitAmendCancel(me.amendMega);
	},
	
	onApprovalCancellationMega : function(){
		var me = this;
		
		if(me.deployedYN === "Y"){
			MessageUtil.warning('warning_msg', 'megadetail_RejectRequestCancel_msg');
			return;
		}
		
		me.serverSend(CodeConstants.MT_MEGASTAT_CA);
	},
	
	onRejectCancellationMega : function(){
		var me = this;
		me.serverSend(CodeConstants.MT_MEGASTAT_AP);
	},

	validationSubmitAmendCancel : function(execFunc){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var vslItem = me.getViewModel().get('theVsl');
		var recvData = detailView.items.get(0).recvData;
		var validationMsg = '';
		var intGridRowGears = refs.refMegaDetailGearsGrid.getStore().getCount();
		var intGridRowForklift = refs.refMegaDetailForkliftGrid.getStore().getCount();
		var intGridRowTrailer = refs.refMegaDetailTrailerGrid.getStore().getCount();
		var intGridRowMechanical = refs.refMegaDetailMechanicalGrid.getStore().getCount();
		var intGridRowPortCrn = refs.refMegaDetailPortCraneGrid.getStore().getCount();
		
		if(refs.ctlDetailPurpose.getValue() == 'MP0001'){
			if(refs.ctlMegaDetailWhAppr.getValue() == true){
				recvData.set('whApprYn','Y');
			}else{
				recvData.set('megaWhYn', 'Y');
			}
		}
		
		if(
			refs.ctlDetailMegaStedoreCompany.getValue() == '' &&
			refs.ctlDetailMegaStedoreNosofGang.getValue() == '' &&
			refs.ctlStevedoreWorkingArea.getValue() == '' &&
			refs.ctlDetailMegaStedoreLashingCompany.getValue() == '' &&
			refs.ctlDetailMegaStevedoreLashingWorkingArea.getValue() == '' &&
			refs.ctlDetailMegaStevedoreNofStvdSprr.getValue() == '' &&
			refs.ctlDetailMegaStedoreTallyCompany.getValue() == '' &&
			refs.ctlWorkingAreaTally.getValue() == '' &&
			refs.ctlDetailMegaStedoreTrimmingCompany.getValue() == '' &&
			refs.ctlTrimmingWorkingArea.getValue() == '' &&
			refs.cltTrimmingNosofHatch.getValue() == '' &&
			refs.ctlTrimmingNofTrmgSprr.getValue() == '' &&
			refs.ctlTrimmingNofSglmn.getValue() == '' &&
			refs.ctlTrimmingNofDekmn.getValue() == '' &&
			refs.ctlTrimmingNofHopmn.getValue() == '' &&
			refs.ctlTrimmingNofTrmgGwker.getValue() == '' &&

			intGridRowGears <= 0 && 
			intGridRowForklift <= 0 && 
			intGridRowTrailer <=0 && 
			intGridRowMechanical <=0 && 
			intGridRowPortCrn <=0){
			
	    	var win = refs.refBtnSubmitMega.up('window');
	    	
			if(win){
				win.getEl().unmask();
            }
			
			MessageUtil.warning('warning_msg', 'In other to submit Mega,You must input data at least one tab.');
			
			return;
		}
		
		execFunc(me);
	},
	
	cancelMega : function(me){
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;	
		var refs = me.getReferences();
		
		if(recvData.get('statCd') === CodeConstants.MT_MEGASTAT_AP){
			var parmWn = '';
			var intGridRowGears = refs.refMegaDetailGearsGrid.getStore().getCount();
			var intGridRowForklift = refs.refMegaDetailForkliftGrid.getStore().getCount();
			var intGridRowTrailer = refs.refMegaDetailTrailerGrid.getStore().getCount();
			var intGridRowMechanical = refs.refMegaDetailMechanicalGrid.getStore().getCount();
			var intGridRowPortCrn = refs.refMegaDetailPortCraneGrid.getStore().getCount();
			
			if(me.lookupReference('ctlDetailMegaStedoreCompany').getValue() != '' || me.lookupReference('ctlDetailMegaStedoreLashingCompany').getValue() != '') {
				parmWn += "Stevedore has been approved. If you continue, It will be charged.";
			}
			
			if(intGridRowGears >0 || intGridRowForklift >0 || intGridRowTrailer >0 || intGridRowMechanical >0 || intGridRowPortCrn >0){
				parmWn += "\nThis MEGA has been approved and if you still continue, CSC will reject the request if deployment arrangement has been made.";	
			}
			
			MessageUtil.question('info_msg', 'megadetail_requestCancel_msg', parmWn, 
					function(button){
						if (button === 'ok') {
							me.checkCancelMegaPenalty();
				        }
					}
			);
		} else {
			me.checkCancelMegaPenalty();
		}
	},
	
	checkCancelMegaPenalty : function(){
		var me = this;
		var refs = me.getReferences();
		var masterItem = me.getViewModel().get('theMain');
		var penaltyStore = me.getStore('megaDetailPenalty');
		
		penaltyStore.load({
			params : {
				searchType : 'penalty',
				megaNo : masterItem.get('megaNo'),
				penaltyTp : CodeConstants.PNLT_CA
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(records[0].get('penaltyCd') != 'N'){
							var messageParm = '';
							
							if(records[0].get('penaltyCd') === 'LB1'){
								messageParm = 'Cancellation for Shift 1';
							} else if(records[0].get('penaltyCd') === 'LB3'){
								messageParm = 'Cancellation for Shift 3';
							} else {
								messageParm = records[0].get('penaltyNm');
							}
								
							MessageUtil.question('info_msg', 'megadetail_penalty_carged_msg', messageParm, 
								function(button){
									if (button === 'ok') {
										if(masterItem.get('statCd') === CodeConstants.MT_MEGASTAT_AP)
											me.serverSend(me.STAT_REQUEST_CANCELED);
										else
											me.serverSend(CodeConstants.MT_MEGASTAT_CA);
							        }
								}
							);
						} else {
							if(masterItem.get('statCd') === CodeConstants.MT_MEGASTAT_AP)
								me.serverSend(me.STAT_REQUEST_CANCELED);
							else
								me.serverSend(CodeConstants.MT_MEGASTAT_CA);
						}
					}
				}
			}
		});
	},
	
	amendMega : function(me){
		var refs = me.getReferences();
		var masterItem = me.getViewModel().get('theMain');
		var penaltyStore = me.getStore('megaDetailPenalty');
		var nofGang = refs.ctlDetailMegaStedoreNosofGang.getValue();
		
		penaltyStore.load({
			params : {
				searchType : 'penalty',
				megaNo : masterItem.get('megaNo'),
				nofGang : nofGang,
				penaltyTp : CodeConstants.PNLT_AD
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(records[0].get('penaltyCd') != 'N'){
							var messageParm = '';
							
							if(records[0].get('penaltyCd') === 'LB1'){
								messageParm = 'Amendment for Shift 1';
							} else if(records[0].get('penaltyCd') === 'LB3'){
								messageParm = 'Amendment for Shift 3';
							} else {
								messageParm = records[0].get('penaltyNm');
							}
								
							MessageUtil.question('info_msg', 'megadetail_penalty_carged_msg', messageParm, 
								function(button){
									if (button === 'ok') {
										me.CURRENT_VIEW_TYPE = me.VIEW_TYPE_AMEND;
										me.serverSend(CodeConstants.MT_MEGASTAT_SU);
							        }
								}
							);
						} else {
							me.CURRENT_VIEW_TYPE = me.VIEW_TYPE_AMEND;
							me.serverSend(CodeConstants.MT_MEGASTAT_SU);
						}
					}
				}
			}
		});
	},
	
	submitMega : function(me){
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
		me.processSubmitMega(CodeConstants.PNLT_LB);
	},
	
	validationExistsPayer : function(){
		var me = this;
		var validationCodeStore = me.getStore('megaDetailValidationCode');
		
		validationCodeStore.load({
			params : {
				tyCd : 'checkMegaPayer',
				userId : MOST.config.Token.getUserId()
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						if(records[0].get('isValidated') === 'Y'){
							me.validationVesselAgent();
						} else {
							MessageUtil.warning('warning_msg', 'megadetail_validation_payer_msg');
						}
					} else {
						MessageUtil.warning('warning_msg', 'megadetail_validation_payer_msg');
					}
				}
			}
		});
	},
	
	validationVesselAgent : function(){
		var me = this;
		var vslItem = me.getViewModel().get('theVsl');
		var validationCodeStore = me.getStore('megaDetailValidationCode');
		var refs = me.getReferences();
		
		validationCodeStore.load({
			params : {
				tyCd : 'checkShipgAgent',
				vslCallId : vslItem.get('vslCallId'),
				userId : MOST.config.Token.getUserId()
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						if(records[0].get('isValidated') === 'Y'){
							me.processSubmitMega('C_MEGA');
						} else {
							MessageUtil.warning('warning_msg', 'megadetail_submit_vessel_msg');
						}
					} else {
						MessageUtil.warning('warning_msg', 'megadetail_submit_vessel_msg');
					}
				}
				
	        	var win = refs.refBtnSubmitMega.up('window');
	        	
	    		if(win){
	    			win.getEl().unmask();
	    		}
			}
		});
	},
	
	processSubmitMega : function(panaltyTpValue){
		var me = this;
		var refs = me.getReferences();
		var masterItem = me.getViewModel().get('theMain');
		var penaltyStore = me.getStore('megaDetailPenalty');
		var nofGang = refs.ctlDetailMegaStedoreNosofGang.getValue();
		var workYmd = masterItem.get('workYmd')==null?null:Ext.Date.format(masterItem.get('workYmd'), MOST.config.Locale.getShortDate());

		penaltyStore.load({
			params : {
				searchType : 'penalty',
				workYmd : workYmd,
				shftId: masterItem.get('shftId'),
				purpTpCd : masterItem.get('purpTpCd'),
				nofGang : nofGang,
				penaltyTp : panaltyTpValue
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(records[0].get('penaltyCd') != 'N'){
							MessageUtil.question('info_msg', 'megadetail_penalty_charged_msg', records[0].get('penaltyNm'), 
								function(button){
									if (button === 'ok') {
										me.sendSubmit();
							        }
								}
							);
						} else {
							me.sendSubmit();
						}
					}
				}

	        	var win = refs.refBtnSubmitMega.up('window');
	        	
	    		if(win){
	    			win.getEl().unmask();
	    		}
			}
		});
	},
	
	sendSubmit : function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
		if(recvData.get('statCd') === CodeConstants.MT_MEGASTAT_RV){
			me.serverSend(CodeConstants.MT_MEGASTAT_RV);
		} else {
			me.serverSend(CodeConstants.MT_MEGASTAT_SU);
		}
	},
	/**
	 * DETAIL END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * Equipment Grid Common (Gears, Forklift, Trailer, Mechanical, PortCrane)
	 * START
	 */
	// Renderer Capacity
	rendererCapacityGear : function(value, metaData, record, rowIndex, colIndex, store) {
		var me = this;
		var capacityCombo = me.getStore('megaDetailGearsCapacityCombo');
		var capaValue = '';
		
		if(value != ''){
			if(metaData.column.dataIndex == 'capaCd'){
				capaValue = capacityCombo.findRecord('capaCd', value).get('capaDescr')
			}
		}
		
		if(me.hasAuthApproval){
			if(record.get('operInfoItems') && record.get('operInfoItems').length > 0){
				return Ext.String.format('<span style="color:{0}">{1}</span>', 'black', capaValue);
			} else {
				return Ext.String.format('<span style="color:{0}">{1}</span>', 'red', capaValue);
			}
		} else {
			return capaValue;
		}
	},
	
	rendererCapacityForkLift : function(value, metaData, record, rowIndex, colIndex, store) {
		var me = this;
		var capacityCombo = me.getStore('megaDetailForkliftCapacityCombo');
		var capaValue = '';
		
		if(value != ''){
			if(metaData.column.dataIndex == 'capaCd'){
				capaValue = capacityCombo.findRecord('capaCd', value).get('capaDescr');
			}
		}
		
		if(me.hasAuthApproval){
			if(record.get('operInfoItems') && record.get('operInfoItems').length > 0){
				return Ext.String.format('<span style="color:{0}">{1}</span>', 'black', capaValue);
			} else {
				return Ext.String.format('<span style="color:{0}">{1}</span>', 'red', capaValue);
			}
		} else {
			return capaValue;
		}
	},
	
	rendererCapacityTrailer : function(value, metaData, record, rowIndex, colIndex, store) {
		var me = this;
		var capacityCombo = me.getStore('megaDetailTrailerCapacityCombo');
		var capaValue = '';
		
		if(value != ''){
			if(metaData.column.dataIndex == 'capaCd'){
				capaValue = capacityCombo.findRecord('capaCd', value).get('capaDescr')
			}
		}
		
		if(me.hasAuthApproval){
			if(record.get('operInfoItems') && record.get('operInfoItems').length > 0){
				return Ext.String.format('<span style="color:{0}">{1}</span>', 'black', capaValue);
			} else {
				return Ext.String.format('<span style="color:{0}">{1}</span>', 'red', capaValue);
			}
		} else {
			return capaValue;
		}
	},
	
	rendererCapacityMechanical : function(value, metaData, record, rowIndex, colIndex, store) {
		var me = this;
		var capacityCombo = me.getStore('megaDetailMechanicalCapacityCombo');
		var capaValue = '';
		
		capaValue = record.getData().capaDescr;	
		
		if(me.hasAuthApproval){
			if(record.get('operInfoItems') && record.get('operInfoItems').length > 0){
				return Ext.String.format('<span style="color:{0}">{1}</span>', 'black', capaValue);
			} else {
				return Ext.String.format('<span style="color:{0}">{1}</span>', 'red', capaValue);
			}
		} else {
			return capaValue;
		}
	},
	
	rendererCapacityPortCrane : function(value, metaData, record, rowIndex, colIndex, store) {
		var me = this;
		var capaValue = '';

		capaValue = record.getData().capaDescr;
		
		if(me.hasAuthApproval){
			if(record.get('operInfoItems') && record.get('operInfoItems').length > 0){
				return Ext.String.format('<span style="color:{0}">{1}</span>', 'black', capaValue);
			} else {
				return Ext.String.format('<span style="color:{0}">{1}</span>', 'red', capaValue);
			}
		} else {
			return capaValue;
		}
	},

	rendererEqDivPortCrane : function(value, metaData, record, rowIndex, colIndex, store) {
		var me = this;
		var eqDivCombo = me.getStore('megaDetailEqTypeComboForPortCrane');
		var eqValue = '';
		
		if(value != ''){
			if(metaData.column.dataIndex == 'eqDivCd'){				
				if(value === CodeConstants.MT_EQTP_SR){
					eqValue = 'Ship Crane'
				}
				else{
					eqValue = eqDivCombo.findRecord('scd', value).get('scdNm')
				}
			}
		}
		
		if(me.hasAuthApproval){
			if(record.get('operInfoItems') && record.get('operInfoItems').length > 0){
				return Ext.String.format('<span style="color:{0}">{1}</span>', 'black', eqValue);
			} else {
				return Ext.String.format('<span style="color:{0}">{1}</span>', 'red', eqValue);
			}
		} else {
			return eqValue;
		}
	},
	
	validateEqupmentGridCheck:function(bizName){
		var me = this;
		var store = me.getStore(Ext.String.format('megaDetail{0}', bizName));
		var companyQty = 0;
		var returnValue = true;
		
		store.each(function(record, index, array){
			if(record.get('flStatus') !== 'N' && returnValue === true){
				if(me.hasAuthApproval){
					if(record.get('operInfoItems') == null || record.get('operInfoItems').length <= 0){
						MessageUtil.warning('warning_msg', 'megadetail_equipment_not_deployed_yet_msg', bizName);
						returnValue = false;
						
						return false;
					}
				}
					
				if(record.get('operInfoItems')){
					record.get('operInfoItems').forEach(function(recordOperInfo, index){
						if(recordOperInfo.constructor === (new Ext.data.Model()).constructor){
							companyQty += recordOperInfo.get('nofOpe');
						} else {
							companyQty += recordOperInfo.nofOpe;
						}
					});
					
					if(record.get('confmQty') != companyQty){
						MessageUtil.warning('warning_msg', 'megadetail_equipment_company_check_msg', bizName);
						returnValue = false;
						
						return false;
					}
					
					companyQty = 0;
				}
			}
		});
		
		return returnValue;
	},
	
	initDefaultReqTime: function(bizName){
		var me = this;
		var refs = me.getReferences();
		var shift = refs.ctlDetailMegaShift.getValue();
		var megaWorkYmd = refs.ctlDetailMegaWorkYmd.rawValue;

		if (StringUtil.isNullorEmpty(shift) || StringUtil.isNullorEmpty(megaWorkYmd))
			return
			
		me.setDefaultRequisitionTime('Gears');
		me.setDefaultRequisitionTime('Forklift');
		me.setDefaultRequisitionTime('Trailer');
		me.setDefaultRequisitionTime('Mechanical');
		me.setDefaultRequisitionTime('PortCrane');
	},

	setDefaultRequisitionTime: function(bizName){
		var me = this;
		var refs = me.getReferences();
		var refStartTime = me.lookupReference(Ext.String.format('refStartTime{0}', bizName));		
		var refEndTime = me.lookupReference(Ext.String.format('refEndTime{0}', bizName));
		
		refStartTime.setValue(me.getShiftStartTime());
		refEndTime.setValue(me.getShiftEndTime())
	},

	validateRequisitionTime: function(bizName){
		var me = this;
		var refs = me.getReferences();

		if(!refs.ctlDetailMegaShift.getValue()){
			MessageUtil.alert('Information', 'Please select the shift first');
			return 
		}
		
		var refStartTime = me.lookupReference(Ext.String.format('refStartTime{0}', bizName));		
		var refEndTime = me.lookupReference(Ext.String.format('refEndTime{0}', bizName));
		var shiftStartTime = me.getShiftStartTime();
		var shiftEndTime = me.getShiftEndTime();
			
		if(refStartTime.getValue() >= shiftStartTime && refEndTime.getValue() <= shiftEndTime){
			return true;
		}else{
			return false;
		}
	},

	getShiftStartTime: function(){
		var me = this;
		var refs = me.getReferences();
		var shiftStartTime;
		var megaWorkYmd = refs.ctlDetailMegaWorkYmd.rawValue;
		var shftId = refs.ctlDetailMegaShift.getValue();
		var shiftListStore = me.getStore('megaRequisitionShiftCombo');
		var shiftData = shiftListStore.findRecord('shftId', refs.ctlDetailMegaShift.getValue())
		
		if(shiftData && !StringUtil.isNullorEmpty(megaWorkYmd)){
			shiftStartTime = Ext.Date.parse(megaWorkYmd + ' ' + shiftData.get('fmHhMm').substr(0,2) + ':' + shiftData.get('fmHhMm').substr(2,2),  'd/m/Y H:i');
		}

		return shiftStartTime
	},

	getShiftEndTime: function(){
		var me = this;
		var refs = me.getReferences();
		var shiftEndTime;
		var megaWorkYmd = refs.ctlDetailMegaWorkYmd.rawValue;
		var shftId = refs.ctlDetailMegaShift.getValue();
		var shiftListStore = me.getStore('megaRequisitionShiftCombo');
		var shiftData = shiftListStore.findRecord('shftId', refs.ctlDetailMegaShift.getValue())
		
		if(shiftData && !StringUtil.isNullorEmpty(megaWorkYmd)){
			shiftEndTime = Ext.Date.parse(megaWorkYmd + ' ' + shiftData.get('toHhMm').substr(0,2) + ':' + shiftData.get('toHhMm').substr(2,2),  'd/m/Y H:i');
		}
		
		if(refs.ctlDetailMegaShift.getSelection().get('shftIdx') == '3'){
			shiftEndTime.setDate(shiftEndTime.getDate() + 1);
		}

		return shiftEndTime;
	},

	getModifyDataForCargoDetail:function(cargoDetail){
		var me = this;
		var refs = me.getReferences();
		var cargoDetailInfo = me.getStore('megaDetailCargoDetailInfo');
		var updateItems = new Array();
		
		for(var i = 0; i< cargoDetail.data.length; i ++){
			var cargoItem = cargoDetail.data.getAt(i);
			
			for(var j = 1; j <= 12; j++){
				var inputedValue = cargoItem.get(Ext.String.format('hatchNo{0}', + new String(j)));
				if(inputedValue){
					var bChanged = false;
					for(var k = 0; k < cargoDetailInfo.data.length; k++){
						var detailInfoItem =  cargoDetailInfo.data.getAt(k);
						
						if(new String(j)[0] === detailInfoItem.data.hatchNo && cargoItem.data.cd === detailInfoItem.data.cgDescCd){
							if(inputedValue !== detailInfoItem.data.cgDescVal){
								var record = Ext.create('MOST.model.planning.Mega');
								
								record.set('cgDescCd', detailInfoItem.data.cgDescCd);
								record.set('cgDescNm', detailInfoItem.data.cgDescNm);
								record.set('cgDescVal', inputedValue);
								record.set('hatchNo', detailInfoItem.data.hatchNo);
								record.set('megaNo', cargoItem.data.megaNo);								
								record.set('crudState', 'U');	
								
								updateItems.push(record.data);
								bChanged = true;
							}

						}
					}
					
					if(!bChanged){
						var record = Ext.create('MOST.model.planning.Mega');
						
						record.set('cgDescCd', cargoItem.data.cd);
						record.set('cgDescNm', cargoItem.data.cdNm);
						record.set('cgDescVal', inputedValue);
						record.set('hatchNo', new String(j)[0]);
						record.set('megaNo', cargoItem.data.megaNo);
						
						updateItems.push(record.data);
					}	
				}
			}
		}
		
		return { updateItems };
	},
	
	getModifyDataForEquipment:function(bizName){
		var me = this;
		var updateItems = new Array();
		var compayItems = new Array();
		var temp;
		var store = me.getStore(Ext.String.format('megaDetail{0}', bizName));
		
		for(var i = 0; i < store.data.length; i++){
			var record = store.data.items[i];
			
			if(record.get('operInfoItems')){
				record.get('operInfoItems').forEach(function(recordOperInfo, index){
					if(recordOperInfo.dirty){
						recordOperInfo.commit();
						compayItems.push(recordOperInfo.data);
						record.dirty = true;
					}
				});
			}
			
			if(record.get('operInfoDeleteItems')){
				record.get('operInfoDeleteItems').forEach(function(recordOperInfo, index){
					compayItems.push(recordOperInfo.data);
					record.dirty = true;
				});
			}
			
			if(me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_CREATE || me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_COPY){
				record.set('workingStatus', WorkingStatus.INSERT);
			}
			
			if(record.dirty){
				temp = record.copy();
				record.set('operInfoDeleteItems', null);
				delete temp.data.operInfoDeleteItems;
				delete temp.data.operInfoItems;
				updateItems.push(temp.data);
			}
		}
		
		store.getRemovedRecords().forEach(function(record, index, array){
			updateItems.push(record.data);
		});
		
		return { updateItems, compayItems };
	},
	
	onGridRemoveForEquipment: function(bizName) {
		var me = this;
		var grid = me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
		var store = me.getStore(Ext.String.format('megaDetail{0}', bizName));		
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		
		if(selection == null) return;
		
		Ext.each(selection, function (record) {
			record.set('workingStatus', WorkingStatus.DELETE);
			store.remove(record);
		});
	},
	
	onGridUpdateForEquipment: function(bizName) {
		var me = this;
		var refs= me.getReferences();
		var grid = me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
		var store = me.getStore(Ext.String.format('megaDetail{0}', bizName));		
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		var record = selection[0];
		
		if(selection == null) return;

		var reqEditable = me.isEditableDetailGridTab();
		
		if(!reqEditable){
			var userMode = 'INTERNAL'
		}else{
			var userMode = 'EXTERNAL'
		}
		
		if(record.get('workingStatus') !== WorkingStatus.INSERT){
			record.set('workingStatus', WorkingStatus.UPDATE);
		}
		
		var editFields = me.EQUIPMENT_CREATE_UPDATE_FIELD_CONFIG[bizName];
		
		try{
			if(!me.isAmendVisible){
				var keys = Object.keys(editFields);
				
				for (const key of keys){
					var formField = editFields[key];
					
					if (formField.includes(',')){
						if (userMode === 'EXTERNAL'){
							var hhField = refs[formField.split(',')[0]];
							var mmField = refs[formField.split(',')[1]];
							var hhFieldVal = hhField.getValue()
																				
							if (hhField && mmField){
								if(StringUtil.isNullorEmpty(hhField.getValue().toString()) || StringUtil.isNullorEmpty(mmField.getValue().toString())){	
									throw 'mandatoryForm_msg'
								}

								var hhVal = (hhField.getValue() < 10)? '0' + hhField.getValue().toString() : hhField.getValue().toString();
								var mmVal = (mmField.getValue() < 10)? '0' + mmField.getValue().toString() : mmField.getValue().toString();
								var updateValue = hhVal + mmVal;
							}
						}else{
							return
						}
					} else if (bizName === 'PortCrane' && refs.ctlEqTypePortCrane.getChecked()
						&& refs.ctlEqTypePortCrane.getChecked()[0].getSubmitValue() === 1
						&& ((formField === 'cboEqTypePortCrane') || (formField === 'cboCapacityPortCrane'))){
						
						if (formField === 'cboEqTypePortCrane'){
							var updateValue = CodeConstants.MT_EQTP_SR;
						} else if (formField === 'cboCapacityPortCrane') {
							var updateValue = '';
						}else 
							return
					} else if (refs[formField] && !refs[formField].hidden){
						if (!refs[formField].disabled && !refs[formField].hidden && (refs[formField].getValue() === null || refs[formField].getValue() === '')){
							MessageUtil.warning('Information','Please fill in the required fields.');
							return;
						}				
						var updateValue;
						
						if(!refs[formField].hidden){ 
							updateValue = refs[formField].getValue();
						}
					} else {
						continue
					}
					
					if(key === 'capaCd'){
						record.set('capaDescr',refs[formField].getDisplayValue());
					}
					
					if(key === 'workStDt' || key === 'workEndDt'){
						updateValue = Ext.Date.format(updateValue, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
					}
					
					record.set(key,updateValue)
				}
			} else {
				var updateValue = me.lookupReference(Ext.String.format('reqQtyField{0}', bizName));
				
				record.set('reqQty',updateValue.getValue())
			}
		}
		catch(err){
			MessageUtil.warning('warning_msg',err)
		}
	},

	onGridRemoveForEquipmentCompany: function(bizName) {
		var me = this;
		var arrItems = new Array();
		var masterGrid = me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
		var grid = me.lookupReference(Ext.String.format('refMegaDetail{0}CompanyGrid', bizName));
		var store = me.getStore(Ext.String.format('megaDetailTab{0}Company', bizName));		
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		var masterSelection = masterGrid.getSelection() == null ? null : masterGrid.getSelection()[0];
		var prevDirty;
		
		if(masterSelection != undefined){
			if(selection == null) return;
			
			Ext.each(selection, function (record) {
				if(record.data.workingStatus == null){
					record.set('workingStatus', WorkingStatus.DELETE);
					
					if(!masterSelection.get('operInfoDeleteItems')){
						masterSelection.set('operInfoDeleteItems', new Array());
					}
			
					prevDirty = masterSelection.dirty;
					
					if(StringUtil.isNullorEmpty(masterSelection.get('relationKey'))){
						masterSelection.set('relationKey', masterSelection.get('seq'));
					}
					
					record.set('relationKey', masterSelection.get('relationKey'));
					
					masterSelection.get('operInfoDeleteItems').push(record.copy());
					masterSelection.dirty = prevDirty;
				}
				
				store.remove(record);
			});
			
			store.commitChanges();
			
			store.each(function(record, index){
				arrItems.push(record);
			});
			
			prevDirty = masterSelection.dirty;
			masterSelection.set('operInfoItems', arrItems);
			masterSelection.dirty = prevDirty;
		}
	},
	
	updateEquipmentForm: function(bizName) {		
		var me = this;
		var refs = me.getReferences();
		var mainGrid = me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
		var reqEditable = me.isEditableDetailGridTab();
		var selection = mainGrid.getSelection() == null ? null : mainGrid.getSelection()[0];
		
		if (selection === null)
			return

		if(!reqEditable){
			var userMode = 'INTERNAL'
		}else{
			var userMode = 'EXTERNAL'
		}
		
		try{
			Ext.each(selection, function (record) {
				var editFields = me.EQUIPMENT_CREATE_UPDATE_FIELD_CONFIG[bizName]
				var keys = Object.keys(editFields)
				var isShpCrn = 0;
				
				for (const key of keys){
					var formField = editFields[key];
					var passValue = record.getData()[key];
					
					if (!formField.includes(',') && refs[formField].hidden)
						continue
								
					if(formField.includes(',')){
						var fieldHH = formField.split(',')[0];
						var fieldMM = formField.split(',')[1];

						if (userMode === 'EXTERNAL' && refs[fieldHH] && refs[fieldMM]){								
							refs[fieldHH].setValue(passValue.substring(0,2));						
							refs[fieldMM].setValue(passValue.substring(2,4));
						}else{
							continue
						}
					}else if(bizName === 'PortCrane' && ((formField === 'cboEqTypePortCrane' && passValue === CodeConstants.MT_EQTP_SR) 
						|| (formField === 'cboCapacityPortCrane' && StringUtil.isNullorEmpty(passValue)))){	
						isShpCrn++; 
					}
					else{
						refs[formField].setValue(passValue);
					}
				}
				
				if(refs.ctlEqTypePortCrane){
					if (isShpCrn === 2){
						refs.ctlEqTypePortCrane.setValue({radioRqBtn: 1});
					}else{
						refs.ctlEqTypePortCrane.setValue({radioRqBtn: 2});
					}
				}
			});

//			var isShftTime = me.validateRequisitionTime(bizName);
//			
//			if (!isShftTime){
//				MessageUtil.warning('warning_msg', "warningdatetimeinshift");
//				return;
//			}
		}
		catch (err){
			MessageUtil.warning('warning_msg',err)
		}
	},

	updateEquipmentCompanyForm: function(bizName) {		
		var me = this;
		var refs = me.getReferences();
		var companyGrid = me.lookupReference(Ext.String.format('refMegaDetail{0}CompanyGrid', bizName));
		var selection = companyGrid.getSelection() == null ? null : companyGrid.getSelection()[0];
		
		if (selection === null){
			return	
		}
			
		if(bizName === 'Forklift' || bizName === 'PortCrane'){
			var ctlContractor = me.lookupReference(Ext.String.format('ctlContractor{0}', bizName));
			var radioSelect = (selection.getData().opeCompCd === 'JPB')? 1 : 2;
			
			if(bizName === 'Forklift') {
				ctlContractor.setValue({'radioFlBtn': radioSelect});
			} else {
				ctlContractor.setValue({'radioBtn': radioSelect});
			}
			
			if (radioSelect === 2){
				var cboContractor = me.lookupReference(Ext.String.format('cboContractor{0}', bizName));
				
				cboContractor.setValue(selection.getData().opeCompCd);
			}
		}else{
			var cboContractor = me.lookupReference(Ext.String.format('cboContractor{0}', bizName));
			
			cboContractor.setValue(selection.getData().opeCompCd);
		}

		var numEquip = me.lookupReference(Ext.String.format('ctlNoOf{0}', bizName));
		
		numEquip.setValue(selection.getData().nofOpe);
			
	},

	onMasterSelectionChangeForEquipment: function(bizName, record) {
		var me = this;
		var refs = me.getReferences();
		var mainGrid = me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
		var companyGrid = me.lookupReference(Ext.String.format('refMegaDetail{0}CompanyGrid', bizName));
		var selection = mainGrid.getSelection() == null ? null : mainGrid.getSelection()[0];
		var shiftComboStore = me.getStore('megaDetailShiftCombo');
		var shiftId1;
		var shiftId2;
		var shiftId3;
		
		//Get shiftId in shift combo store
		for(var i = 0; i < shiftComboStore.data.length; i++){
			if(shiftComboStore.data.items[i].data.shftIdx == '1'){
				shiftId1 = shiftComboStore.data.items[i].data.shftId;
			}
			if(shiftComboStore.data.items[i].data.shftIdx == '2'){
				shiftId2 = shiftComboStore.data.items[i].data.shftId;
			}
			if(shiftComboStore.data.items[i].data.shftIdx == '3'){
				shiftId3 = shiftComboStore.data.items[i].data.shftId;
			}
		}
		
		//get start and end datetime for each Shift 
		var shiftListStore = me.getStore('megaRequisitionShiftCombo');
		if (shiftId1) {
			var shiftData1 = shiftListStore.findRecord('shftId',shiftId1 )
			var startShift1 = shiftData1.get('fmHhMm').substr(0,2) + ':'+ shiftData1.get('fmHhMm').substr(2,2)
			var endShift1 = shiftData1.get('toHhMm').substr(0,2) + ':' + shiftData1.get('toHhMm').substr(2,2)
		}
		if (shiftId2) {
			var shiftData2 = shiftListStore.findRecord('shftId',shiftId2 )
			var startShift2 = shiftData2.get('fmHhMm').substr(0,2) + ':'+ shiftData2.get('fmHhMm').substr(2,2)
			var endShift2 = shiftData2.get('toHhMm').substr(0,2) + ':' + shiftData2.get('toHhMm').substr(2,2)
		}
		if (shiftId3) {
			var shiftData3 = shiftListStore.findRecord('shftId',shiftId3 )
			var startShift3 = shiftData3.get('fmHhMm').substr(0,2) + ':'+ shiftData3.get('fmHhMm').substr(2,2)
			var endShift3 = shiftData3.get('toHhMm').substr(0,2) + ':' + shiftData3.get('toHhMm').substr(2,2)
		}
		
		if(selection != undefined){			
			var startTime = (selection.data.workStDt).substring(11,16);
			var endTime = (selection.data.workEndDt).substring(11,16);
			var startDay = (selection.data.workStDt).substring(0,10);
			var endDay = (selection.data.workEndDt).substring(0,10);
			
			//Return shift type in shift combo
			if(startDay == endDay){			
				if (shiftId1) {
					if(startTime >= startShift1 && endTime <= endShift1){
						refs.ctlDetailMegaShift.setValue(shiftId1);
					}
				}
				if (shiftId2) {
					if(startTime >= startShift2 && endTime <= endShift2){
						refs.ctlDetailMegaShift.setValue(shiftId2);
					}
				}
				if (shiftId3) {
					if(startTime >= startShift3 && endTime <= endShift3){		
						refs.ctlDetailMegaShift.setValue(shiftId3);
					}
				}
				if(startTime >= '00:00' && endTime <= '07:00'){		
					refs.ctlDetailMegaShift.setValue(shiftId3);
				}
			}
			if(startDay < endDay){			
				if((startTime >= '23:00' && endTime <= '07:00') || (startTime >= '00:00' && endTime <= '07:00')){
					refs.ctlDetailMegaShift.setValue(shiftId3);
				}
			}
		}
		
		companyGrid.getStore().removeAll();
		
		if(selection == null) {
			return;
		}else{
			me.updateEquipmentForm(bizName);
		}

		if(selection.get('operInfoItems')){
			companyGrid.getStore().setData(selection.get('operInfoItems'));
		}
	},
	
	onCompanySelectionChangeForEquipment: function(bizName) {
		var me = this;
		var companyGrid = me.lookupReference(Ext.String.format('refMegaDetail{0}CompanyGrid', bizName));
		var selection = companyGrid.getSelection() == null ? null : companyGrid.getSelection()[0];
		
		if(selection == null) {
			return;
		}else{
			me.updateEquipmentCompanyForm(bizName);
		}
	},

	onEditCompanyForEquipment : function(record, bizName){
		if(record.data.workingStatus == null){
			record.data.workingStatus = WorkingStatus.UPDATE;
		} else {
			record.data.workingStatus = record.crudState;
		}
		
		var me = this;
		var arrItems = new Array();
		var mainGrid = me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
		var grid = me.lookupReference(Ext.String.format('refMegaDetail{0}CompanyGrid', bizName));
		var selection = mainGrid.getSelection() == null ? null : mainGrid.getSelection()[0];
		
		if(selection == null){
			return;
		}
		
		grid.getStore().each(function(rec, index){
			arrItems.push(rec);
		});

		var prevDirty = selection.dirty;
		
		selection.set('operInfoItems', arrItems);
		selection.dirty = prevDirty;
	},
	
	onAddForEquipmentCompany: function(bizName, selectOpeDivCd) {
		var me = this;
		var refs = me.getReferences();
		var idx = 0;
		var masterGrid = me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
		var grid = me.lookupReference(Ext.String.format('refMegaDetail{0}CompanyGrid', bizName));
		var store = me.getStore(Ext.String.format('megaDetailTab{0}Company', bizName));
		var record = Ext.create('MOST.model.planning.OperInfo'); 
		var masterSelection = masterGrid.getSelection() == null ? null : masterGrid.getSelection()[0];
		
		if(masterSelection == null){
			MessageUtil.warning('warning_msg', 'selectadddata_msg');
			return;
		}
		
		grid.filters.clearFilters();
		grid.filters.disable();
		
		store.clearFilter();
		
		
		if(grid.getSelection() && grid.getSelection().length>0) {
			idx = store.indexOfId(grid.getSelection()[0].get('id'));
		}
		
		record.data.workingStatus = WorkingStatus.INSERT;

		if(StringUtil.isNullorEmpty(masterSelection.get('relationKey'))){
			masterSelection.set('relationKey', masterSelection.get('seq'));
		}
		
		record.set('relationKey', masterSelection.get('relationKey'));
		record.set('eqDivCd', masterSelection.get('eqDivCd'));
		record.set('capaCd', masterSelection.get('capaCd'));

		if(selectOpeDivCd){ 
			record.set('opeDivCd', selectOpeDivCd);
		} else {
			record.set('opeDivCd', 'C');
		}
		
		var cboContractor = me.lookupReference(Ext.String.format('cboContractor{0}', bizName));
		var numEquip = me.lookupReference(Ext.String.format('ctlNoOf{0}', bizName))
		var ctlContractor = me.lookupReference(Ext.String.format('ctlContractor{0}', bizName));

		if (ctlContractor && ctlContractor.getChecked()[0].getSubmitValue() === 1){
			record.set('opeCompCd', 'MMC')
		}else if(cboContractor && !StringUtil.isNullorEmpty(cboContractor.getValue())){
			record.set('opeCompCd', cboContractor.getValue())
		}else{
			MessageUtil.warning('warning_msg', 'mandatoryForm_msg');
			
			return;
		}
		
		if(numEquip && !StringUtil.isNullorEmpty('opeCompCd', numEquip.getValue().toString())){
			record.set('nofOpe', numEquip.getValue())
		}else{
			MessageUtil.warning('warning_msg', 'mandatoryForm_msg');
			
			return;
		}
		
		var isValidated = (me.onValidateAddForCompany(record, bizName));

		if (isValidated){
			store.insert(idx, record);
			me.onEditCompanyForEquipment(record, bizName);
		}
	},
	
	onGridUpdateForEquipmentCompany: function(bizName, selectOpeDivCd) {
		var me = this;
		var refs = me.getReferences();
		var idx = 0;
		var masterGrid = me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
		var grid = me.lookupReference(Ext.String.format('refMegaDetail{0}CompanyGrid', bizName));
		var store = me.getStore(Ext.String.format('megaDetailTab{0}Company', bizName));
		var masterSelection = masterGrid.getSelection() == null ? null : masterGrid.getSelection()[0];
		var companySelection = grid.getSelection() == null ? null : grid.getSelection()[0];

		if(masterSelection == null){
			MessageUtil.warning('warning_msg', 'selectadddata_msg');
			
			return;
		}
		
		if(companySelection == null){
			return;
		}
		
		grid.filters.clearFilters();
		grid.filters.disable();
		
		store.clearFilter();
		
		if(grid.getSelection() && grid.getSelection().length>0) {
			idx = store.indexOfId(grid.getSelection()[0].get('id'));
		}
		
		companySelection.data.workingStatus = WorkingStatus.UPDATE;

		var cboContractor = me.lookupReference(Ext.String.format('cboContractor{0}', bizName));
		var numEquip = me.lookupReference(Ext.String.format('ctlNoOf{0}', bizName));
		var ctlContractor = me.lookupReference(Ext.String.format('ctlContractor{0}', bizName));
		
		if (ctlContractor && ctlContractor.getChecked()[0].getSubmitValue() === 1){
			companySelection.set('opeCompCd', 'JPB')
		}else if(!StringUtil.isNullorEmpty(cboContractor.getValue())){
			companySelection.set('opeCompCd', cboContractor.getValue())
		}else{
			MessageUtil.warning('warning_msg', 'mandatoryForm_msg');
			
			return;
		}

		if(!StringUtil.isNullorEmpty(numEquip.getValue().toString())){
			companySelection.set('nofOpe', numEquip.getValue())
		}else{
			MessageUtil.warning('warning_msg', 'mandatoryForm_msg');
			
			return;
		}
		
		var isValidated = me.onValidateEditForCompany(bizName);

		if (isValidated){
			me.onEditCompanyForEquipment(companySelection, bizName);
		}
	},


	// Equipment Tab Double Click
	onDblClickForEquipment: function(bizName, isWorkingArea, capacityFunc) {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		if(capacityFunc){
			capacityFunc(selection.get('eqDivCd'), me);
		}
		
		if(isWorkingArea != false){
			var workingAreaCombo = me.getStore(Ext.String.format('megaDetailWorkingAreaComboFor{0}', bizName));
			var locIds = selection.get('locId').split(',');
			
			if(locIds.length > 0){
				workingAreaCombo.clearFilter();
				
				var idx = workingAreaCombo.findExact('cd',locIds[0]);
				
				if(idx > 0){
					var record = workingAreaCombo.getAt(idx);
					me.workingAreaComboLoad(record.get('tyCd'), bizName);
				}
			}
		}
	},

	onAddForEquipment: function(bizName, eqDivCd) {	
		var me = this;
		var refs = me.getReferences();
		var idx = 0;
		var grid = me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
		var store = me.getStore(Ext.String.format('megaDetail{0}', bizName));
		var record = Ext.create('MOST.model.planning.Mega'); 
		var reqEditable = me.isEditableDetailGridTab();
		
		if(!reqEditable){
			var userMode = 'INTERNAL'
		}
		else{
			var userMode = 'EXTERNAL'
		}

		grid.filters.clearFilters();
		grid.filters.disable();
		
		store.clearFilter();
		
		if(grid.getSelection() && grid.getSelection().length>0) {
			idx = store.indexOfId(grid.getSelection()[0].get('id'));
		}
		
		record.set('divCd', 'EQ');
		
		if(eqDivCd){
			record.set('eqDivCd', eqDivCd);
		}

		record.set('relationKey', 	store.getData().length + 1);
		record.set('workingStatus', record.crudState);
		
		var editFields = me.EQUIPMENT_CREATE_UPDATE_FIELD_CONFIG[bizName]
		var keys = Object.keys(editFields);
		
		for (const key of keys){
			var formField = editFields[key];

			if (formField.includes(',')){
				if (userMode === 'EXTERNAL'){
					var hhField = refs[formField.split(',')[0]];
					var mmField = refs[formField.split(',')[1]];
					var hhFieldVal = hhField.getValue()
																		
					if (hhField && mmField){
						if(StringUtil.isNullorEmpty(hhField.getValue().toString()) || StringUtil.isNullorEmpty(mmField.getValue().toString())){	
							throw 'mandatoryForm_msg'
						}

						var hhVal = (hhField.getValue() < 10)? '0' + hhField.getValue().toString() : hhField.getValue().toString();
						var mmVal = (mmField.getValue() < 10)? '0' + mmField.getValue().toString() : mmField.getValue().toString();
						var updateValue = hhVal + mmVal;
					}
				}else if (userMode === 'INTERNAL'){
					var updateValue = me.TIME_FOR_SHIFT.replace(':','');
				}else 
					return
			}else if(bizName === 'PortCrane' && refs.ctlEqTypePortCrane.getChecked() && refs.ctlEqTypePortCrane.getChecked()[0].getSubmitValue() === 1
				&& ((formField === 'cboEqTypePortCrane') || (formField === 'cboCapacityPortCrane'))){
				if (formField === 'cboEqTypePortCrane'){
					var updateValue = CodeConstants.MT_EQTP_SR;
				} else if (formField === 'cboCapacityPortCrane'){
					var updateValue = '';
				}else 
					return
			}else if (refs[formField]){
				if (!refs[formField].disabled && !refs[formField].hidden && (refs[formField].getValue() === null || refs[formField].getValue() === '')){
					MessageUtil.warning('Information','Please fill in the required fields.');
					return;
				}
				
				var updateValue;
				
				if(!refs[formField].hidden){ 
					updateValue = refs[formField].getValue();
				}
			}else {
				continue
			}
			
			if(key === 'capaCd'){
				record.set('capaDescr',refs[formField].getDisplayValue());
			}

			if(key === 'reqQty') {
				if(refs.ctlMegaDetailWhAppr.getValue()) {
					record.set('reqQty',refs.reqQtyFieldForklift.getValue());
				} else {
					record.set('reqQty',refs[formField].getValue());
					record.set('confmQty',refs[formField].getValue());
					record.set('whQty',refs[formField].getValue());
				}
			}
			
			if(key === 'workStDt' || key === 'workEndDt'){
				updateValue = Ext.Date.format(updateValue, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			}	

			record.set(key,updateValue);
		};
		//check shift date valid or not
		var megaWorkYmd = refs.ctlDetailMegaWorkYmd.rawValue;
		
		if (!megaWorkYmd) {
			MessageUtil.alert('warning', 'Please select the shift date above');
			return;
		}
		
		var isValidated = (eval('me.onValidateAddFor' + bizName + '(record)'));
		var isShftTime = me.validateRequisitionTime(bizName);	
		
		if (!isShftTime){
			MessageUtil.warning('warning_msg', "warningdatetimeinshift");
			return;
		}
		
		// added by Tim 18/03/2024
		// Check time is overlapped for this Equipment or not
		var startTime;
		var endTime;
		var eqType;
		if (bizName === "PortCrane") {
			startTime 	= new Date(refs.refStartTimePortCrane.value);
			endTime 	= new Date(refs.refEndTimePortCrane.value);
			eqType 		= refs.cboEqTypePortCrane.value;
		} else if (bizName === "Forklift") {
			startTime 	= new Date(refs.refStartTimeForklift.value);
			endTime 	= new Date(refs.refEndTimeForklift.value);
			eqType 		= refs.cboCapacityForklift.value;
		} else if (bizName === "Trailer") {
			startTime 	= new Date(refs.refStartTimeTrailer.value);
			endTime 	= new Date(refs.refEndTimeTrailer.value);
			eqType 		= refs.cboCapacityTrailer.value;
		} else if (bizName === "Gears") {
			startTime 	= new Date(refs.refStartTimeGears.value);
			endTime 	= new Date(refs.refEndTimeGears.value);
			eqType 		= CodeConstants.MT_EQCD_GR;
		} else if (bizName === "Mechanical") {
			startTime 	= new Date(refs.refStartTimeMechanical.value);
			endTime 	= new Date(refs.refEndTimeMechanical.value);
			eqType 		= refs.cboEqTypeMechanical.value;
		}
		
		if (bizName === "Forklift" || bizName === "Trailer") {
			for (let i = 0; i < store.data.items.length; i++) {
			    const item = store.data.items[i].data;
			    if (item.capaCd === eqType) {
			        const workStDt = new Date(item.workStDt);
			        const workEndDt = new Date(item.workEndDt);
			        if (startTime >= workStDt && workStDt <= workEndDt || 
							endTime <= workEndDt && endTime >= workStDt) {
			            MessageUtil.warning('warning_msg', "The time for this equipment is overlapped, please choose another time");
			            return;
			        }
			    }
			} 
		} else {
			for (let i = 0; i < store.data.items.length; i++) {
			    const item = store.data.items[i].data;
			    if (item.eqDivCd === eqType) {
			        const workStDt = new Date(item.workStDt);
			        const workEndDt = new Date(item.workEndDt);
			        if (startTime >= workStDt && workStDt <= workEndDt || 
							endTime <= workEndDt && endTime >= workStDt) {
			            MessageUtil.warning('warning_msg', "The time for this equipment is overlapped, please choose another time");
			            return;
			        }
			    }
			} 
		}
		
		
		if(isValidated && isShftTime){
			store.insert(idx, record);					
		}
	},
	
	onCategoryComboChange: function(combo, value, obj){
		var me = this;
		var grid = combo.up('grid');
		var detailView = me.getDetailBizView();
		var bizName = me.getGirdBizName(grid.getReference());
		
		grid.down('[dataIndex=locId]').getEditor().setValue('');
		me.workingAreaComboLoad(value, bizName);
	},
	
	getGirdBizName : function(gridName){
		var regGridName = new RegExp('refMegaDetail([a-zA-Z.]+)Grid');
		var bizName = regGridName.exec( gridName );

		if ( bizName ) {
		  bizName = bizName[1];
		} else {
		  bizName = '';
		}
		
		return bizName;
	},
	
	workingAreaComboLoad : function(value, bizName){
		var me = this;
		var workingAreaCombo = me.getStore(Ext.String.format('megaDetailWorkingAreaComboFor{0}', bizName));
		
		if(workingAreaCombo != null){
			workingAreaCombo.clearFilter();
			workingAreaCombo.filter([{
				filterFn: function(item) {
			    	return (item.get('tyCd').trim().search(value) != -1);
			    }
	    	}]);
		}
	},

	onValidateEditForEquipment : function(bizName, keys, compareValue, isCompany) {
		var me = this;
		var refs = me.getReferences();
		
		if(!isCompany){
			var grid = me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
		}else{
			var grid = me.lookupReference(Ext.String.format('refMegaDetail{0}CompanyGrid', bizName));
		}

		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var store = grid.getStore();

		if(selection == null) return;

		if(isCompany != true){
			var reqQty = selection.getData().reqQty;
			var confmQty = selection.getData().confmQty;
			
			if(me.isAmendVisible){
				var newValue = me.lookupReference(Ext.String.format('reqQtyField{0}', bizName)).getValue();
				var origValue = reqQty;

				if(newValue === origValue){
					MessageUtil.warning('warning_msg', 'megadetail_amend_quantity_difference_msg');
					return false;
				}
				
				selection.set('confmQty', 0)
			}
		}
		
		var idx = store.findBy(function(item) {
			return me.getRecordConcatString(item, keys) === compareValue;
		});
		
		//Get startTime and endTime input in corresponding tab
		var startTimeOnTab = me.getStartTimeInCurrentTab(bizName); 
		var endTimeOnTab = me.getEndTimeInCurrentTab(bizName);
		
		//Get current shift type in shift combo
		var getShiftSelect = refs.ctlDetailMegaShift.getSelection().get('shftIdx');
		
		//Validate time range input		
		var validateTimeRange = me.isInShiftRange(getShiftSelect, startTimeOnTab.substring(11,16), endTimeOnTab.substring(11,16), startTimeOnTab.substring(0,10), endTimeOnTab.substring(0,10));
		
		if(startTimeOnTab > endTimeOnTab){
			MessageUtil.warning('warning_msg', 'Invalid time range input');
			return;
		}
		
		if(validateTimeRange == false){
			MessageUtil.warning('warning_msg', 'warningdatetimeinshift');
			return;
		}
		
		if(idx >= 0){
			var checkShiftExist = me.onValidateShiftExist(store, idx, bizName, startTimeOnTab, endTimeOnTab, getShiftSelect);
			
			// if(idx >= 0 && checkShiftExist == true){				
			// 	MessageUtil.warning('warning_msg', 'exsist_msg');
			// 	return false;
			// } else {
			// } 
			
			return true;
		}
		
		return true;
	},

	onValidateAddForEquipment : function(bizName, keys, compareValue, record, isCompany) {
		var me = this;
		var refs = me.getReferences();

		if(!isCompany){
			var grid = me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
		}else{
			var grid = me.lookupReference(Ext.String.format('refMegaDetail{0}CompanyGrid', bizName));
		}

		var store = grid.getStore();

		if(record == null) return;

		if(isCompany != true){
			var reqQty = record.getData().reqQty;
			var confmQty = record.getData().confmQty;
			
			if(me.isAmendVisible){
				var newValue = me.lookupReference(Ext.String.format('reqQtyField{0}', bizName)).getValue();
				var origValue = reqQty;

				if(newValue === origValue){
					MessageUtil.warning('warning_msg', 'megadetail_amend_quantity_difference_msg');
					return false;
				}
				
				confmQty.setValue(0);
			}
		}

		var idx = store.findBy(function(item) {
			return me.getRecordConcatString(item, keys) === compareValue;
		});
		
		//Get startTime and endTime input in corresponding tab
		var startTimeOnTab = me.getStartTimeInCurrentTab(bizName); 
		var endTimeOnTab = me.getEndTimeInCurrentTab(bizName);
		
		//Parse DateTime for Comparison
		var startTime = me.onParseDateTime(startTimeOnTab);
		var endTime = me.onParseDateTime(endTimeOnTab);
		
		//Get current shift type in shift combo
		if(!refs.ctlDetailMegaShift.getSelection()) {
			MessageUtil.warning('warning_msg', 'megarequisition_select_shift');
			return;
		}
		var getShiftSelect = refs.ctlDetailMegaShift.getSelection().get('shftIdx');
		
		//Validate time range input		
		var validateTimeRange = me.isInShiftRange(getShiftSelect, startTimeOnTab.substring(11,16), endTimeOnTab.substring(11,16), startTimeOnTab.substring(0,10), endTimeOnTab.substring(0,10));
		
		if(startTime >= endTime){
			MessageUtil.warning('warning_msg', 'Invalid time range input');
			return;
		}
		
		if(validateTimeRange == false){
			MessageUtil.warning('warning_msg', 'warningdatetimeinshift');
			return;
		}
		
		if(idx >= 0){			
			var checkShiftExist = me.onValidateShiftExist(store, idx, bizName, startTimeOnTab, endTimeOnTab, getShiftSelect);
			
			if(idx >= 0 && checkShiftExist == true){
				MessageUtil.warning('warning_msg', 'exsist_msg');
				return false;			
			}
		}
		
		return true;
	},
	
	onParseDateTime: function(dateTimeString) {
		var [date, time] = dateTimeString.split(' ');
		var [day, month, year] = date.split('/');
		return new Date(`${year}-${month}-${day}T${time}`);
   },
	
	onValidateShiftExist: function (store, idx, bizName, startTimeOnTab, endTimeOnTab, getShiftSelect){
		var me = this;
		var refs = me.getReferences();
		var checkShiftRange = false;
		var startDayOnTab = startTimeOnTab.substring(0,10);
		var endDayOnTab = endTimeOnTab.substring(0,10);
		var capaCdToValidate = store.data.items[idx].data.capaCd;
		
		if(store.data.length > 0){			
			for(var i = 0; i < store.data.length; i++){
				var capaCdItem = store.data.items[i].data.capaCd;
				var startTimeInStore = store.data.items[i].data.workStDt;
				var endTimeInStore = store.data.items[i].data.workEndDt;
				var startDayInStore = startTimeInStore.substring(0,10);
				var endDayInStore = endTimeInStore.substring(0,10);
				
				if(capaCdItem == capaCdToValidate){
					if(getShiftSelect != '3' && (startDayOnTab == startDayInStore && endDayOnTab == endDayInStore)){					
						if((endTimeInStore <= endTimeOnTab && startTimeInStore >= startTimeOnTab)
							|| (endTimeOnTab > startTimeInStore && endTimeOnTab <= endTimeInStore)
							|| (endTimeInStore > startTimeOnTab && endTimeInStore <= endTimeOnTab)){
							checkShiftRange = true;
						}
					}
					if(getShiftSelect == '3'){
						var subShift3 = me.checkSubShift3Range(startTimeInStore, endTimeInStore, startTimeOnTab, endTimeOnTab, startDayInStore, endDayInStore, startDayOnTab, endDayOnTab, getShiftSelect);
						if(subShift3 == true){
							checkShiftRange = true;
						}
					}
				}			
			}
		}
		
		return checkShiftRange;
	},
	
	checkSubShift3Range: function(startTime, endTime, startTimeOnTab, endTimeOnTab, startDay, endDay, startDayOnTab, endDayOnTab, shiftIdx){
		var isDuplicateTimeRange = false;
		
		//Check subshift3
		if(shiftIdx == '3'){
			//Check new time range and old time range if in the same day
			if(startDay == endDay && startDay == startDayOnTab && startDayOnTab == endDayOnTab){
				if(((startTimeOnTab >= startTime && startTimeOnTab < endTime && endTimeOnTab >= endTime) 
						|| (startTimeOnTab >= startTime && endTimeOnTab <= endTime)
						|| (startTimeOnTab <= startTime && endTimeOnTab >= endTime)
						|| (startTimeOnTab <= startTime && endTimeOnTab > startTime && endTimeOnTab <= endTime)) 
						&& (startTimeOnTab != endTimeOnTab && startTime != endTime)){
					isDuplicateTimeRange = true;
				}
			}
			
			//Check new time range and old time range if in the same transition time between 2 days
			if(startDay == startDayOnTab && startDay < endDay && startDayOnTab < endDayOnTab){
				if((startTimeOnTab <= startTime && endTimeOnTab >= endTime)
						|| (startTimeOnTab <= startTime && endTimeOnTab <= endTime)
						|| (startTimeOnTab >= startTime && endTimeOnTab <= endTime)
						|| (startTimeOnTab >= startTime && endTimeOnTab >= endTime)){
					isDuplicateTimeRange = true;
				}
			}
			
			//Check new time range if from 23:00 to 23:59 in the day and old time range if in transition time between 2 days
			if(startDay == startDayOnTab && startDayOnTab == endDayOnTab && startDay < endDay){
				if(endTimeOnTab > startTime){
					isDuplicateTimeRange = true;
				}
			}
			
			//Check new time range if from 00:00 to 07:00 in the day and old time range if in transition time between 2 days
			if(endDay == startDayOnTab && startDayOnTab == endDayOnTab && startDay < endDay){
				if(startTimeOnTab < endTime){
					isDuplicateTimeRange = true;
				}
			}
			
			//Check old time range if from 23:00 to 23:59 in the day and new time range if in transition time between 2 days
			if(startDay == endDay && startDay == startDayOnTab && startDayOnTab < endDayOnTab){
				if(endTime > startTimeOnTab){
					isDuplicateTimeRange = true;
				}
			}
			
			//Check old time range if from 00:00 to 07:00 in the day and new time range if in transition time between 2 days
			if(startDay == endDay && startDay == endDayOnTab && startDayOnTab < endDayOnTab){
				if(startTime < endTimeOnTab){
					isDuplicateTimeRange = true;
				}
			}
		}
								
		return isDuplicateTimeRange;
	},
	
	getStartTimeInCurrentTab: function(bizName){
		var me = this;
		var refs = me.getReferences();
		var startTime = '';
		
		if(bizName == "Gears"){			
			startTime = Ext.Date.format(refs.refStartTimeGears.getValue(), 'd/m/Y H:i');
		} else if(bizName == 'Forklift'){
			startTime = Ext.Date.format(refs.refStartTimeForklift.getValue(), 'd/m/Y H:i');
		} else if(bizName == "Trailer"){
			startTime = Ext.Date.format(refs.refStartTimeTrailer.getValue(), 'd/m/Y H:i');
		} else if(bizName == "Mechanical"){
			startTime = Ext.Date.format(refs.refStartTimeMechanical.getValue(), 'd/m/Y H:i');
		} else if(bizName == "PortCrane"){
			startTime = Ext.Date.format(refs.refStartTimePortCrane.getValue(), 'd/m/Y H:i');
		}
		
		return startTime;
	},
	
	getEndTimeInCurrentTab: function(bizName){
		var me = this;
		var refs = me.getReferences();
		var endtTime = '';
		
		if(bizName == "Gears"){ 
			endtTime = Ext.Date.format(refs.refEndTimeGears.getValue(), 'd/m/Y H:i');
		} else if(bizName == 'Forklift'){
			endtTime = Ext.Date.format(refs.refEndTimeForklift.getValue(), 'd/m/Y H:i');
		} else if(bizName == "Trailer"){ 
			endtTime = Ext.Date.format(refs.refEndTimeTrailer.getValue(), 'd/m/Y H:i');
		} else if(bizName == "Mechanical"){
			endtTime = Ext.Date.format(refs.refEndTimeMechanical.getValue(), 'd/m/Y H:i');
		} else if(bizName == "PortCrane"){ 
			endtTime = Ext.Date.format(refs.refEndTimePortCrane.getValue(), 'd/m/Y H:i');
		}
		
		return endtTime;
	},
	
	isInShiftRange: function(shiftIdx, startTime, endTime, startDayShift, endDayShift){
		var me = this;
		var refs = me.getReferences();
		var check = true;
		var shiftComboStore = me.getStore('megaDetailShiftCombo');
		var shiftId1;
		var shiftId2;
		var shiftId3;
		
		//Get shiftId in shift combo store
		for(var i = 0; i < shiftComboStore.data.length; i++){
			if(shiftComboStore.data.items[i].data.shftIdx == '1'){
				shiftId1 = shiftComboStore.data.items[i].data.shftId;
				// shiftId1StartTime = shiftComboStore.data.items[i].data.fmHhMm;
				//  shiftId1EndTime = shiftComboStore.data.items[i].data.toHhMm;
			}
			if(shiftComboStore.data.items[i].data.shftIdx == '2'){
				shiftId2 = shiftComboStore.data.items[i].data.shftId;
			}
			if(shiftComboStore.data.items[i].data.shftIdx == '3'){
				shiftId3 = shiftComboStore.data.items[i].data.shftId;
			}
		}
		
		//get start and end datetime for Shift 
		var shiftListStore = me.getStore('megaRequisitionShiftCombo');
		
		if (shiftId1) {
			var shiftData1 = shiftListStore.findRecord('shftId',shiftId1 )
			var startShift1 = shiftData1.get('fmHhMm').substr(0,2) + ':'+ shiftData1.get('fmHhMm').substr(2,2)
			var endShift1 = shiftData1.get('toHhMm').substr(0,2) + ':' + shiftData1.get('toHhMm').substr(2,2)
		}
		if (shiftId2) {
			var shiftData2 = shiftListStore.findRecord('shftId',shiftId2 )
			var startShift2 = shiftData2.get('fmHhMm').substr(0,2) + ':'+ shiftData2.get('fmHhMm').substr(2,2)
			var endShift2 = shiftData2.get('toHhMm').substr(0,2) + ':' + shiftData2.get('toHhMm').substr(2,2)
		}
		
		if (shiftId3) {
			var shiftData3 = shiftListStore.findRecord('shftId',shiftId3 )
			var startShift3 = shiftData3.get('fmHhMm').substr(0,2) + ':'+ shiftData3.get('fmHhMm').substr(2,2)
			var endShift3 = shiftData3.get('toHhMm').substr(0,2) + ':' + shiftData3.get('toHhMm').substr(2,2)
		}
		
		
		
		
		
		if(shiftIdx == '1'){
			if(startDayShift < endDayShift){				
					check = false;
			}
			
			if(startTime < startShift1 || startTime > endShift1 || endTime < startShift1 || endTime > endShift1){
				check = false;
			}
		}
		
		if(shiftIdx == '2'){
			if(startDayShift < endDayShift){				
				check = false;
			}

			if(startTime < startShift2 || startTime > endShift2 || endTime < startShift2 || endTime > endShift2){
				check = false;
			}
		}
		
		if(shiftIdx == '3'){
			if(startDayShift == endDayShift){				
				if((startTime < startShift3 && startTime > endShift3) || (endTime < startShift3 && endTime > endShift3)){
					check = false;
				}
			}
			if(startDayShift < endDayShift){				
				if(startTime < startShift3 || endTime > startShift1){
					check = false;
				}
			}
		}
		
		return check;
	},

	onValidateAddForCompany : function(record, bizName) {
		var me = this;
		var keys = ['opeCompCd'];
		var compareValue = record.getData().opeCompCd;

		return me.onValidateAddForEquipment( bizName, keys, compareValue, record, true);
	},

	onValidateEditForCompany : function(bizName) {
		var me = this;
		var refs = me.getReferences();
		var keys = ['opeCompCd'];
		var cboContractor = me.lookupReference(Ext.String.format('cboContractor{0}', bizName));
		var compareValue = cboContractor.getValue();

		return me.onValidateEditForEquipment( bizName, keys, compareValue, true);
	},

	onContractorSelectedChangeForklift : function(radio, newValue, oldValue){
		var me = this;
		var refs = me.getReferences();
		
		refs.cboContractorForklift.setDisabled(true);	

		if	(radio.getValue().radioFlBtn == 1 && newValue){
			refs.cboContractorForklift.setDisabled(true)	
		}else if (radio.getValue().radioFlBtn == 2 && newValue){
			refs.cboContractorForklift.setDisabled(false)	
		}
	},

	/**
	 * Equipment Grid Common (Gears, Forklift, Trailer, Mechanical, PortCrane)
	 * END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * Vessel Schedule TAB START
	 */
	// Warehouse S/N, D/O List
	searchWarehouse : function(isClear){
		var me = this;
		var refs = me.getReferences();
		var vesselScheduleItem = me.getViewModel().get('theVsl');
		var store = me.getStore('megaDetailVesselScheduleWarehouse');
		var snStore = me.getStore('megaDetailVesselScheduleSn');
		var doStore = me.getStore('megaDetailVesselScheduleDo');
		var vslCallId = refs.ctlDetailJpvc.getValue();
		
		if(isClear){
			snStore.removeAll();
			doStore.removeAll();
			return;
		}
		
		if(!StringUtil.isNullorEmpty(vesselScheduleItem.get('vslCallId'))){
			var params = {
					vslCallId :  vesselScheduleItem.get('vslCallId')
			};
			
			store.load({
				params: params,
				callback: function(records, operation, success) {
					if(success){
						if(records != null && records.length > 0){
							records.forEach(function(record) {
							    var doNo = record.get('dono');
							    var shipgNoteNo = record.get('shipgNoteNo');
							
							    if (doStore.find('doNo', doNo) ===-1) {
							        doStore.add({ dono: doNo });
							    }
							
							    if (snStore.find('shipgNoteNo', shipgNoteNo) === -1) {
							        snStore.add({ shipgNoteNo: shipgNoteNo });
							    }
							});
						}
					}
				}
			});
		} else {
			snStore.removeAll();
			doStore.removeAll();
		}
	},
	/**
	 * Vessel Schedule TAB END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * Gears TAB START
	 */	
	// Modify Gears Grid Data
	getModifyDataForGears:function(){
		var me = this;
		return me.getModifyDataForEquipment('Gears');
	},
	
	// Gears Add
	onAddForGears: function() {
		var me = this;
		me.onAddForEquipment('Gears', 'GR');
	},
	
	// Gears Tab
	onGridRemoveForGears: function() {
		var me = this;
		me.onGridRemoveForEquipment('Gears');
	},
	
	onGridUpdateForGears: function() {
		var me = this;	
		if (me.onValidateEditForGears()){
			me.onGridUpdateForEquipment('Gears');
		}		
	},

	onValidateEditForGears : function() {
		var me = this;
		var refs = me.getReferences()
		var keys = ['capaCd'];	
		var compareValue = refs.cboCapacityGears.getValue();
		
		return me.onValidateEditForEquipment('Gears', keys, compareValue);
	},
	
	onValidateAddForGears : function(record){
		var me = this;
		var keys = ['capaCd'];
		var compareValue = record.getData().capaCd;
		
		return me.onValidateAddForEquipment('Gears', keys, compareValue, record);

	},
	
	// Gears Tab Double Click
	onDblClickForGears: function(){
		var me = this;
		me.onDblClickForEquipment('Gears');
	},
	
	// Gears Company Add
	onAddForGearsCompany: function() {
		var me = this;
		me.onAddForEquipmentCompany('Gears');
	},
	
	// Gears Company Update
	onGridUpdateForGearsCompany: function(){
		var me = this;
		me.onGridUpdateForEquipmentCompany('Gears');
	},

	// Gears Company Tab
	onGridRemoveForGearsCompany: function() {
		var me = this;		
		me.onGridRemoveForEquipmentCompany('Gears');
	},
	
	// Gears Master Grid Selection Change Event
	onMasterSelectionChangeForGears: function(selectable, selectRecords, eOpts) {
		var me = this;
		me.onMasterSelectionChangeForEquipment('Gears');
	},

	// Gears Company Grid Selection Change Event
	onCompanySelectionChangeForGears: function(selectable, selectRecords, eOpts) {
		var me = this;
		me.onCompanySelectionChangeForEquipment('Gears');
	},
	
	// Gears Combo Change Event
	onEqTypeComboForGearsChange: function(combo, value, obj){
		var me = this;
		
		me.lookupReference('cboCapacityGears').setDisabled(true);
		me.lookupReference('cboCapacityGears').setValue('');
		me.gearsCapacityComboLoad(value, me);
	},
	
	// Gears Capacity Combo Load
	gearsCapacityComboLoad: function(value, me){
		var capacityCombo = me.getStore('megaDetailGearsCapacityCombo');
		
		capacityCombo.removeAll();
		
		if(!StringUtil.isNullorEmpty(value)){
			capacityCombo.load({
				params:{
					eqDivCd : value
				},
				callback:function(records,success){
					if(success && records.length > 0){
						me.lookupReference('cboCapacityGears').setDisabled(false);
					}
				}
			});
		}
	},
	/**
	 * Gears TAB END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * Forklift TAB START
	 */	
	// Modify Forklift Grid Data
	getModifyDataForForklift:function(){
		var me = this;
		return me.getModifyDataForEquipment('Forklift');
	},
	
	// Forklift Add
	onAddForForklift: function() {
		var me = this;
		me.onAddForEquipment('Forklift', 'FL');
	},
	
	// Forklift Tab
	onGridRemoveForForklift: function() {
		var me = this;
		me.onGridRemoveForEquipment('Forklift');
	},
	
	onGridUpdateForForklift: function() {
		var me = this;	
		
		if (me.onValidateEditForForklift()){
			var flStatus = me.lookupReference("cboForkliftDriver").getValue();
			
			me.onGridUpdateForEquipment('Forklift');
			me.visibleCompanyImgage(flStatus);
		}		
	},

	// Grid Validate Edit for Forklift
	onValidateEditForForklift : function() {
		var me = this;
		var refs = me.getReferences()
		var keys = ['capaCd', 'locId', 'flStatus'];
		var compareValue = refs.cboCapacityForklift.getValue()  + refs.ctlWorkingAreaForklift.getValue()  + refs.cboForkliftDriver.getValue();
		
		return me.onValidateEditForEquipment('Forklift', keys, compareValue);
	},
	
	onValidateAddForForklift : function(record){
		var me = this;
		var keys = ['capaCd', 'locId', 'flStatus'];
		var compareValue = record.getData().capaCd + record.getData().locId + record.getData().flStatus;
		
		return me.onValidateAddForEquipment('Forklift', keys, compareValue, record);
	},

	// Forklift Company
	onEditCompanyForForklift : function(editor, context){
		var me = this;
		me.onEditCompanyForEquipment(editor, context, 'Forklift');
	},
	
	onDblClickForForklift: function(){
		var me = this;
		me.onDblClickForEquipment('Forklift');
	},
	
	onAddForForkliftCompany: function() {
		var me = this;
		me.onAddForEquipmentCompany('Forklift', 'P');
	},
	
	onGridUpdateForForkliftCompany: function(){
		var me = this;
		me.onGridUpdateForEquipmentCompany('Forklift', 'P');
	},

	onGridRemoveForForkliftCompany: function() {
		var me = this;		
		me.onGridRemoveForEquipmentCompany('Forklift');
	},
	
	onMasterSelectionChangeForForklift: function(grid, selected, eOpts) {
		var me = this;
		
		if(selected.selectedRecords.items.length > 0){
			me.visibleCompanyImgage(selected.selectedRecords.items[0].get('flStatus'));
		}
		
		me.onMasterSelectionChangeForEquipment('Forklift');
	},
	
	onCompanySelectionChangeForForklift: function(selectable, selectRecords, eOpts) {
		var me = this;
		me.onCompanySelectionChangeForEquipment('Forklift');
	},

	visibleCompanyImgage : function(flStatus){
		var me = this;
		var refs = me.getReferences();
		var isCompanyGridVisible = false;
		
		if( MOST.config.Token.getUserType() === CONSTANTS.USER_TYPE_INTERNAL){
			if(flStatus === 'N'){
				isCompanyGridVisible = false;
			} else {
				isCompanyGridVisible = true;
			}
		}
		
		refs.ctlCompanyForklift.setVisible(isCompanyGridVisible);
		refs.ctlDetailForkliftImage.setVisible(!isCompanyGridVisible);
	},
	/**
	 * Forklift TAB END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * Trailer TAB START
	 */	
	// Modify Trailer Grid Data
	getModifyDataForTrailer:function(){
		var me = this;
		return me.getModifyDataForEquipment('Trailer');
	},
	
	// Trailer Add
	onAddForTrailer: function() {
		var me = this;
		me.onAddForEquipment('Trailer', 'TR');
	},
	
	// Trailer Tab
	onGridRemoveForTrailer: function() {
		var me = this;
		me.onGridRemoveForEquipment('Trailer');
	},
	
	onGridUpdateForTrailer: function() {
		var me = this;	
		
		if (me.onValidateEditForTrailer()){
			me.onGridUpdateForEquipment('Trailer');
		}		
	},
	
	onValidateEditForTrailer : function() {
		var me = this;
		var refs = me.getReferences()
		var keys = ['capaCd', 'locId'];	
		var compareValue = refs.cboCapacityTrailer.getValue() + refs.ctlWorkingAreaTrailer.getValue();	
		
		return me.onValidateEditForEquipment('Trailer', keys, compareValue);
	},

	onValidateAddForTrailer : function(record){
		var me = this;
		var keys = ['capaCd', 'locId'];	
		var compareValue = record.getData().capaCd + record.getData().locId;
		
		return me.onValidateAddForEquipment('Trailer', keys, compareValue, record);
	},
	
	onDblClickForTrailer: function(){
		var me = this;
		me.onDblClickForEquipment('Trailer');
	},
	
	onAddForTrailerCompany: function() {
		var me = this;
		me.onAddForEquipmentCompany('Trailer');
	},
	
	onGridUpdateForTrailerCompany: function(){
		var me = this;
		me.onGridUpdateForEquipmentCompany('Trailer');
	},

	onGridRemoveForTrailerCompany: function() {
		var me = this;		
		me.onGridRemoveForEquipmentCompany('Trailer');
	},
	
	onMasterSelectionChangeForTrailer: function(selectable, selectRecords, eOpts) {
		var me = this;
		me.onMasterSelectionChangeForEquipment('Trailer');
	},

	onCompanySelectionChangeForTrailer: function(selectable, selectRecords, eOpts) {
		var me = this;
		me.onCompanySelectionChangeForEquipment('Trailer');
	},
	/**
	 * Trailer TAB END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * MECANICAL TAB START
	 */	
	getModifyDataForMechanical:function(){
		var me = this;
		return me.getModifyDataForEquipment('Mechanical');
	},
	
	// Mechanical Tab
	onGridRemoveForMechanical: function() {
		var me = this;
		me.onGridRemoveForEquipment('Mechanical');
	},
	
	// Mechanical Company Tab
	onGridRemoveForMechanicalCompany: function() {
		var me = this;		
		me.onGridRemoveForEquipmentCompany('Mechanical');
	},
	
	// Equipment Master Grid Selection Change Event
	onMasterSelectionChangeForMechanical: function(selectable, selectRecords, eOpts) {
		var me = this;
		me.onMasterSelectionChangeForEquipment('Mechanical');
	},
	
	// Trailer Company Grid Selection Change Event
	onCompanySelectionChangeForMechanical: function(selectable, selectRecords, eOpts) {
		var me = this;
		me.onCompanySelectionChangeForEquipment('Mechanical');
	},
	
	onGridUpdateForMechanical: function() {
		var me = this;	
		
		if (me.onValidateEditForMechanical()){
			me.onGridUpdateForEquipment('Mechanical');
		}		
	},

	// Grid Validate Edit for Mechanical
	onValidateEditForMechanical : function() {
		var me = this;
		var keys = ['capaCd'];
		var compareValue = me.lookupReference('cboCapacityMechanical').getValue();

		return me.onValidateEditForEquipment('Mechanical', keys, compareValue);
	},
	
	onValidateAddForMechanical : function(record){
		var me = this;
		var keys = ['capaCd'];
		var compareValue = record.getData().capaCd;
		
		return me.onValidateAddForEquipment('Mechanical', keys, compareValue, record);
	},
	
	// Mechanical Master Grid Add
	onAddForMechanical: function() {
		var me = this;
		me.onAddForEquipment('Mechanical');
	},
	
	// Mechanical Grid Add
	onAddForMechanicalCompany: function() {
		var me = this;
		me.onAddForEquipmentCompany('Mechanical');
	},

	// Mechanical Company Update
	onGridUpdateForMechanicalCompany: function(){
		var me = this;
		me.onGridUpdateForEquipmentCompany('Mechanical');
	},
	
	// Cargo Operation Combo Change Event
	onEqTypeComboForMechanicalChange: function(combo, value, obj){
		var me = this;

		me.lookupReference('cboCapacityMechanical').setDisabled(true);
		me.lookupReference('cboCapacityMechanical').setValue('');
		me.mechanicalCapacityComboLoad(value, me);
	},
	
	// Mechanical Capacity Combo Load
	mechanicalCapacityComboLoad : function(value, me){
		var capacityCombo = me.getStore('megaDetailMechanicalCapacityCombo');
		capacityCombo.removeAll();

		if(!StringUtil.isNullorEmpty(value)){
			capacityCombo.load({
				params:{
					eqDivCd : value
				},
				callback:function(records,success){
					if(success && records.length > 0){
						me.lookupReference('cboCapacityMechanical').setDisabled(false);
					}
				}
			});
		}		
	},
	
	// Mechanical Tab Double Click
	onDblClickForMechanical: function() {
		var me = this;
		me.onDblClickForEquipment('Mechanical', true, me.mechanicalCapacityComboLoad);
	},
	/**
	 * MECANICAL TAB END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * Port Crane TAB START
	 */	
	// Modify PortCrane Grid Data
	getModifyDataForPortCrane:function(){
		var me = this;
		return me.getModifyDataForEquipment('PortCrane');
	},
	
	// PortCrane Add
	onAddForPortCrane: function() {
		var me = this;
		me.onAddForEquipment('PortCrane');
	},
	
	// PortCrane Tab
	onGridRemoveForPortCrane: function() {
		var me = this;
		me.onGridRemoveForEquipment('PortCrane');
	},
	
	// PortCrane Update
	onGridUpdateForPortCrane: function() {
		var me = this;
		if (me.onValidateEditForPortCrane()){
			me.onGridUpdateForEquipment('PortCrane');
		}		
	},

	// Grid Validate Edit for Port Crane
	onValidateEditForPortCrane : function() {
		var me = this;
		var refs = me.getReferences()

		if(refs.ctlEqTypePortCrane.getChecked()){
			var eqSelected = refs.ctlEqTypePortCrane.getChecked()[0].getSubmitValue();
		}else{
			return
		}

		var keys = (eqSelected === 1)? ['eqDivCd']: ['capaCd'];
		var compareValue = (eqSelected === 1)? CodeConstants.MT_EQTP_SR: refs.cboCapacityPortCrane.getValue();
		
		return me.onValidateEditForEquipment('PortCrane', keys, compareValue);
	},
	
	onValidateAddForPortCrane : function(record){
		var me = this;
		var refs = me.getReferences();
		
		if(refs.ctlEqTypePortCrane.getChecked()){
			var eqSelected = refs.ctlEqTypePortCrane.getChecked()[0].getSubmitValue();
		}else{
			return
		}
		
		var keys = (eqSelected === 1)? ['eqDivCd']: ['capaCd'];
		var compareValue = (eqSelected === 1)? 'SR':  record.getData().capaCd;

		return me.onValidateAddForEquipment('PortCrane', keys, compareValue, record);
	},

	// PortCrane Tab Double Click
	onDblClickForPortCrane: function(){
		var me = this;
		me.onDblClickForEquipment('PortCrane', false, me.portCraneCapacityComboLoad);
	},
	
	// PortCrane Grid Add
	onAddForPortCraneCompany: function() {
		var me = this;
		me.onAddForEquipmentCompany('PortCrane', 'P');
	},
	
	// PortCrane Company Update
	onGridUpdateForPortCraneCompany: function(){
		var me = this;
		me.onGridUpdateForEquipmentCompany('PortCrane', 'P');
	},

	// PortCrane Company Tab
	onGridRemoveForPortCraneCompany: function() {
		var me = this;		
		me.onGridRemoveForEquipmentCompany('PortCrane');
	},
	
	// PortCrane Master Grid Selection Change Event
	onMasterSelectionChangeForPortCrane: function(selectable, selectRecords, eOpts) {
		var me = this;
		me.onMasterSelectionChangeForEquipment('PortCrane');
	},
	
	// Forklift Company Grid Selection Change Event
	onCompanySelectionChangeForPortCrane: function(selectable, selectRecords, eOpts) {
		var me = this;
		me.onCompanySelectionChangeForEquipment('PortCrane');
	},

	// PortCrane Combo Change Event
	onEqTypeComboForPortCraneChange: function(combo, value, obj){
		var me = this;

		me.lookupReference('cboCapacityPortCrane').setDisabled(true);
		me.lookupReference('cboCapacityPortCrane').setValue('');
		me.portCraneCapacityComboLoad(value, me);
	},
	
	// PortCrane Capacity Combo Load
	portCraneCapacityComboLoad : function(value, me){
		var capacityCombo = me.getStore('megaDetailPortCraneCapacityCombo');
		
		capacityCombo.removeAll();
		
		if(!StringUtil.isNullorEmpty(value)){
			capacityCombo.load({
				params:{
					eqDivCd : value
				},
				callback:function(records,success){
					if(success && records.length > 0){
						me.lookupReference('cboCapacityPortCrane').setDisabled(false);
					}
				}
			});
		}		
	},
	
	onEqRadioChangePortCrane: function(radio, oldValue, newValue){
		var me = this;
		var refs = me.getReferences()
		
		refs.cboEqTypePortCrane.setDisabled(true);
		refs.cboCapacityPortCrane.setDisabled(true);	

		if	(radio.getValue().radioRqBtn == 2 && newValue){
			refs.cboEqTypePortCrane.setDisabled(false)
			
			if (!StringUtil.isNullorEmpty(refs.cboCapacityPortCrane.getValue()))
			{
				refs.cboCapacityPortCrane.setDisabled(false)
			}	
		}
	},

	onContractorSelectedChangePortCrane : function(radio, newValue, oldValue){
		var me = this;
		var refs = me.getReferences();
		
		refs.cboContractorPortCrane.setDisabled(true);	

		if	(radio.getValue().radioBtn == 1 && newValue){
			refs.cboContractorPortCrane.setDisabled(true)
		}
		else if (radio.getValue().radioBtn == 2 && newValue){
			refs.cboContractorPortCrane.setDisabled(false)	
		}
	},
	// -------------------------------------------------------------
	onMegaPreviewPDF:function(){
		var me = this;
		var refs = me.getReferences();
		var selectedRecord = refs.refMegaRequisitionGrid.getSelectionModel().getSelection();
		var firstVslCallId = "";
		var isDiffVslCallId = false;
		var megaNo = "";
		var megaList = [];
		
		var params;
		
		if(selectedRecord == null || selectedRecord.length == 0){
			MessageUtil.warning('warning_msg', 'megarequisition_select_export');
			return;
		}
		
		selectedRecord.forEach(function(record, index, array){
			if(index == 0){
				firstVslCallId = record.get('vslCallId');
				megaNo = "'" + record.get('megaNo') + "'";
			}else{
				
				megaNo += ",'" + record.get('megaNo') + "'"
				if(record.get('vslCallId') != firstVslCallId){
					isDiffVslCallId = true;
				}
			}
		});
		
		if(isDiffVslCallId){
			MessageUtil.warning('warning_msg', 'megarequisition_diff_vsl_call_id');
			return;
		}
		
		Ext.MessageBox.show({
			   title : 'MEGA', 
		       msg: 'Printing...',
		       width:320,
		       height:0,
		       wait:true,
		       waitConfig: {interval:200, text:''}
		});
		
		if(me.getView().getXType() == 'app-megarequisition'){
			var generatePDF = me.getStore('generatePDF');
			
			params = me.getSearchCondition();
			
			params['megaStr'] = megaNo;
			params['megaList2'] = megaList;
			params['rptTp'] = 'MEGALIST';
			
			generatePDF.load({
				params: params,
				callback: function(records, operation, success) {
					if (success) {
						Ext.MessageBox.hide();
						me.openPDFPreview (records, operation, success);
					}
				}
			})
		}
	},
	
	onExport:function(){
		var me = this;
		var refs = me.getReferences();
		
		me.rptTp = 'MEGALIST';
		
		var params = {
			initSearch: true
		};
		
		me.openCodePopup('popup-exporttypepopup','refBtnDownload', params);
	},
	
	onDownloadExport:function(){
		var me = this;
		var refs = me.getReferences();
		var selectedRecord = refs.refMegaRequisitionGrid.getSelectionModel().getSelection();
		var firstVslCallId = "";
		var isDiffVslCallId = false;
		var megaNo = "";
		var megaList = [];
		var params;
		
		if(selectedRecord == null || selectedRecord.length == 0){
			MessageUtil.warning('warning_msg', 'megarequisition_select_export');
			return;
		}
		
		selectedRecord.forEach(function(record, index, array){
			if(index == 0){
				firstVslCallId = record.get('vslCallId');
				megaNo = "'" + record.get('megaNo') + "'";
			}else{
				megaNo += ",'" + record.get('megaNo') + "'";
				
				if(record.get('vslCallId') != firstVslCallId){
					isDiffVslCallId = true;
				}
			}
		});
		
		if(isDiffVslCallId){
			MessageUtil.warning('warning_msg', 'megarequisition_diff_vsl_call_id');
			return;
		}
		
		var generatePDF = me.getStore('generatePDF');
		
		params = me.getSearchCondition();
		
		if(me.rptTp === 'MEGADTL'){
			megaNo = refs.ctlDetailMegaNo.getValue();
			params['vslCallId'] = refs.ctlDetailJpvc.getValue();
		}
		
		params['megaStr'] = megaNo;
		params['megaList2'] = megaList;
		params['rptTp'] = me.rptTp;
		params['exportTp'] = refs.refRadioReportType.getValue().rb
		
		generatePDF.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					var content = records[0].data.content.replace(/&lt;/gi,'<').replace(/&gt;/gi,'>'); 
					Ext.exporter.File.saveBinaryAs(content, records[0].data.fileName);
				}
			}
		})
	},
	
	onDownloadCancel:function(ownWin){
		var me = this;
		var winAlias = "popupAliaspopup-exporttypepopup";
		var win = me.lookupReference(winAlias);
		
		win.close();
		
	},
	
	onPreviewLoad:function(){
		var me = this;
		var refs = me.getReferences();
		
		me.visibleDetailToolButton(ViewUtil.TOOL_SAVE, false);
		me.visibleDetailToolButton(ViewUtil.TOOL_DELETE, false);
		me.visibleDetailToolButton(ViewUtil.TOOL_PREVIEW, false);
		me.visibleDetailToolButton(ViewUtil.TOOL_DOWNLOAD, false);
	},
	
	onDetailDownload:function(){
		var me = this;
		var refs = me.getReferences();
		
		me.rptTp = 'MEGADTL';
		var params = {
			initSearch: true
		};
		me.openCodePopup('popup-exporttypepopup','refBtnDownload', params);
	},
	
	onDetailPreview:function(){
		var me = this;
		var refs = me.getReferences();
		var generatePDF = me.getStore('generatePDF');
		
		params = me.getDetailSearchCondition();
		params['megaStr'] = refs.ctlDetailMegaNo.getValue();
		params['rptTp'] = 'MEGADTL';
		
		generatePDF.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					me.openPDFPreview (records, operation, success);
				}
			}
		})
	},
	
	onTriggerClick:function(field, button, e){
		var me = this;
		var refs = me.getReferences();
		var controlName = field.reference;
		
		me.openCodePopup('popup-workingareamultipopup', controlName);
	},
	
	onTabChange:function(tabPanel, tab){
		var me = this;
		var refs = me.getReferences();
		
		me.onTabChangeRemove('Forklift');
		me.onTabChangeRemove('Gears');
		me.onTabChangeRemove('Mechanical');
		me.onTabChangeRemove('Trailer');
		me.onTabChangeRemove('PortCrane');
	},
	
	onTabChangeRemove: function(bizName) {
		var me = this;
		var grid = me.lookupReference(Ext.String.format('refMegaDetail{0}Grid', bizName));
		var store = me.getStore(Ext.String.format('megaDetail{0}', bizName));		
		var selection = grid.getSelection() === null ? null : grid.getSelection();
		
		if(selection == null) return;
		
		Ext.each(selection, function (record) {
			if(record.crudState == 'C' && record.data.workingStatus == undefined){
				store.remove(record);
			}
			
		});
	},
	
	onServiceDateChange:function(control, newValue, oldValue, eOpts){
		var me = this;
		var refs = me.getReferences();
		
		if(newValue != null && newValue != ''){
			refs.ctlFromDt.setValue('');
			refs.ctlToDt.setValue('');
		}
	},
	
	onChangeCargoDetail:function(e, selected, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refMegaDetailCargoDetailGrid;
		var selection;
		
		if(selected && selected.startCell){
			selection = grid.getStore().data.items[selected.startCell.rowIdx] == null ? null : grid.getStore().data.items[selected.startCell.rowIdx];
		}

		if(selection){
			var value;
			
			if(selected.startCell.colIdx > 1){
				value = selection.get(Ext.String.format('hatchNo{0}', + new String(selected.startCell.colIdx - 1)));
				me.getViewModel().set('selectedColumn', selected.startCell.colIdx - 1);
			}else{
				me.getViewModel().set('selectedColumn', null);
			}
			
			if(selection.data.cd === CodeConstants.CG_DCG || selection.data.cd === CodeConstants.CG_LCG){
				refs.ctlCargoDetailPackage.setDisabled(true);
				refs.ctlCargoDetailCmdtCode.setDisabled(true);
				refs.refCargoDetailMT.setDisabled(false);
				
				refs.refCargoDetailMT.setValue(value);
				refs.ctlCargoDetailCmdtCode.setValue('');
				refs.ctlCargoDetailPackage.setValue('');
				
			}else if(selection.data.cd === CodeConstants.CG_DCM || selection.data.cd === CodeConstants.CG_LCM){
				refs.ctlCargoDetailPackage.setDisabled(true);
				refs.ctlCargoDetailCmdtCode.setDisabled(false);
				refs.refCargoDetailMT.setDisabled(true);				

				refs.refCargoDetailMT.setValue('');
				refs.ctlCargoDetailCmdtCode.setValue(value);
				refs.ctlCargoDetailPackage.setValue('');
			}else{
				refs.ctlCargoDetailPackage.setDisabled(false);
				refs.ctlCargoDetailCmdtCode.setDisabled(true);
				refs.refCargoDetailMT.setDisabled(true);
				
				refs.refCargoDetailMT.setValue('');
				refs.ctlCargoDetailCmdtCode.setValue('');
				refs.ctlCargoDetailPackage.setValue(value);
			}
		}
	},
	
	onUpdateCargoDetailInfo: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refMegaDetailCargoDetailGrid;
		var cargoDetail = me.getStore('megaDetailCargoDetail');
		var selectColIdx = me.getViewModel().get('selectedColumn');
		
		if(selectColIdx && grid.selection){
			if(grid.selection.data.cd === CodeConstants.CG_DCG || grid.selection.data.cd === CodeConstants.CG_LCG){
				grid.selection.set(Ext.String.format('hatchNo{0}', + new String(selectColIdx)),refs.refCargoDetailMT.getValue()); 
			}else if(grid.selection.data.cd === CodeConstants.CG_DCM || grid.selection.data.cd === CodeConstants.CG_LCM){
				grid.selection.set(Ext.String.format('hatchNo{0}', + new String(selectColIdx)),refs.ctlCargoDetailCmdtCode.getValue()); 
			}else{
				grid.selection.set(Ext.String.format('hatchNo{0}', + new String(selectColIdx)),refs.ctlCargoDetailPackage.getValue()); 
			}
		}
	},

	onChangeShipgNoteNo: function(e, newValue, oldValue, eOpts){
		if(newValue){
			var me = this;
			var refs = me.getReferences();
			
			refs.ctlMegaDetailDo.setValue('');
		}
		e.setValue(newValue);
	},
	
	onChangeDeliveryNo: function(e, newValue, oldValue, eOpts){
		if(newValue){
			var me = this;
			var refs = me.getReferences();
			
			refs.ctlMegaDetailSn.setValue('');
		}
		e.setValue(newValue);
	},
	
    exportTo: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
        var cfg = Ext.merge({
            title: 'MEGA',
            fileName: 'MEAG' + '.' + (btn.cfg.ext || btn.cfg.type)
        }, btn.cfg);

        var grid = refs.refMegaRequisitionGrid;
        
        grid.saveDocumentAs(cfg);
    },
    
    winchMenAndGeneralWorkerChange:function(e, newValue, oldValue, eOpts ) {
    	var me = this;
    	var refs = me.getReferences();
    	var stevedoreItem = me.getViewModel().get('theStevedore');
    	
    	if(stevedoreItem){
	    	var stvdNonTon = refs.ctlDetailMegaStevedoreNoStvdGwker.getValue() + refs.ctlDetailMegaStevedoreNofWchmn.getValue();
	    	stevedoreItem.set('stvdNonTon', stvdNonTon);
    	}
    },
    
    onLashingDisabledControl: function (value){
    	var me = this;
    	var refs = me.getReferences();

    	refs.ctlDetailMegaStedoreLashingCompany.setDisabled(value);
    	refs.ctlDetailMegaStevedoreLashingWorkingArea.setDisabled(value);
    	refs.ctlLshRegHh.setDisabled(value);
    	refs.ctlLshRegMm.setDisabled(value);
    	refs.ctlDetailMegaStedoreLashingNosofGang.setDisabled(value);
    },
    
    onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var refs = me.getReferences();
		var searchBizParm = me.getSearchCondition();
		searchBizParm.classID = 'com.tsb.most.biz.parm.planning.SearchMegaParm';
		searchBizParm.serviceID = 'MOST.mega.selectMegaList'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	}, 
	
	/**
	 * Port Crane TAB END
	 * =========================================================================================================================
	 */
});