Ext.define('MOST.view.administrator.UserRegisterController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
    
	],

	alias: 'controller.userregister',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'userRegsiterGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'userRegister',            // Main Store Name
	
	DETAIL_AUTH_GRID_REF_NAME: 'refUserAuthGrid',  // Main Grid Name 
	DETAIL_AUTH_STORE_NAME: 'userAuthList',            // Main Store Name
	
	USER_TYPE_STORE: 'userTypeCombo',
	PARTNER_SELECTION_STORE: 'partnerSelection',
	CONFIRM_COMBO_STORE: 'confirmCombo',
	REGISTRY_STATUS_STORE: 'registryStatusCombo',
	JOB_TITLE_STORE: 'jobTitleCombo',
	USER_AUTHORITY_STORE: 'userAuthCombo',
	LARGE_CODE_STORE: 'largeCodeCombo',
	DEPARTMENT_COMBO_STORE: 'departmentCombo',
	USER_AUTHORITY_LIST_STORE: 'userAuthList',
	DUCPLICATE_CHECK_STORE: 'duplicateIdCheck',
	USER_DETAIL_UPLOAD_STORE: 'userDetailUpload',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */	
	authCd:'',
	agencyCd:'',
	isDupCheck: false,
	isDup:false,
	isIdNoDupCheck:false,
	isIdNoDup:false,
	
    onLoad:function(){
    	var me = this;
    	var refs = me.getReferences();
    	var searchParm = Ext.create('MOST.model.administrator.SearchUserRegisterParm');
    	var userTypeCombo = me.getStore(me.USER_TYPE_STORE);
    	var jobTitleCombo = me.getStore(me.JOB_TITLE_STORE);
    	var userAuthCombo = me.getStore(me.USER_AUTHORITY_STORE);
    	var confirmCombo = me.getStore(me.CONFIRM_COMBO_STORE);
    	var largeCodeCombo = me.getStore(me.LARGE_CODE_STORE);
    	var registryStatusCombo = me.getStore(me.REGISTRY_STATUS_STORE);
    	
    	searchParm.set("useYn","Y");
    	
    	me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.USER_REGISTRY_STATUS, me.REGISTRY_STATUS_STORE); 	// MOVE TYPE COMBO
		me.setComboBoxWithLocalCache(CacheServiceConstants.USER_CONFIRM_STATUS, me.CONFIRM_COMBO_STORE); 	// MOVE TYPE COMBO
		me.setComboBoxWithLocalCache(CacheServiceConstants.REGISTRY_SYSTEM, me.LARGE_CODE_STORE); 	// MOVE TYPE COMBO

		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
    	jobTitleCombo.load();
    	userTypeCombo.load();
    	userAuthCombo.load({
    		params:{
    			userType: MOST.config.Token.getUserType()
    		}
    	});
    	
    	userTypeCombo.commitChanges();
    	jobTitleCombo.commitChanges();
    	userAuthCombo.commitChanges();
    },
    
    onDetailLoad:function(){
    	var me = this;
		var detailView = me.getDetailBizView();
		var infoForm = detailView.down('form').getForm();
		infoForm.isValid(); // Mandatory to appear red for.
		
		me.setDetailInitialize();
    },
    
    setDetailInitialize:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;

    	if(recvData != undefined){
    		
    		me.getViewModel().setData({theDetail:recvData});   		
    		
    		refs.refTxtUserId.setEditable(false);
    		refs.refBtnCheckUserId.setDisabled(true);
    		
    		var userAuthList = me.getStore(me.DETAIL_AUTH_STORE_NAME);
    		
    		me.agencyCd = recvData.get('ptnrCd');
    		
    		if(!StringUtil.isNullorEmpty(recvData.data.ptnrType)){
    			var ptnrTypeArr = recvData.data.ptnrType.split('/');
    			me.bindingPntrType(ptnrTypeArr);
    		}
    		
    		userAuthList.load({
        		params:{
        			regUserId: recvData.get('regUserId')
        		}
        	});
        	
        	if(StringUtil.isNullorEmpty(recvData.get('deptCd'))){
        		refs.refCboDepartment.setDisabled(true);
        	}else{
        		refs.refCboDepartment.setDisabled(false);
        	}
    	
        	if(recvData.data.regUserType == CONSTANTS.USER_TYPE_INTERNAL){
        		refs.txtPtnrCd.setDisabled(true);
        		refs.refCboDepartment.setDisabled(false);
        	}else{
        		refs.txtPtnrCd.setDisabled(false);
        		refs.refCboDepartment.setDisabled(true);
        	}
        	
        	//added by Brian (2022/02/14)
        	var detailItem = me.getViewModel().get('theDetail');
        	
        	if(recvData.get("userImage") != null){
        		me.getViewModel().set('imgData','data:image/jpg;base64,'+recvData.get("userImage"));
        	}else{
        		me.getViewModel().set('imgData',"");
        	}
    		
        	refs.refImageUploadPreview.show();
        	
        	if(recvData.data.regUserType == 'I'){
    			refs.refChkGrpPtnrTypes.setDisabled(true);
    		}
    	}else{
    		recvData = Ext.create('MOST.model.administrator.UserRegister');
    		me.getViewModel().setData({theDetail:recvData});
    		
    		refs.refTxtUserId.setEditable(true);
    		refs.refBtnCheckUserId.setDisabled(false);
    		
    		var userAuthList = me.getStore(me.DETAIL_AUTH_STORE_NAME);
    		
    		userAuthList.removeAll();
    		userAuthList.commitChanges();
    		
        	//added by Brian (2022/02/14)
    		refs.refImageUploadPreview.setSrc('resources/images/logo/noimage.png');
        	refs.refImageUploadPreview.show();
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
    
    onGridAdd:function() {
		var me = this;
		me.openDetailPopup(null);
    },
	
    onGridRemove: function(isDetailClose) {
    	var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selections = grid.getSelection() == null ? null: grid.getSelection();
		var deleteItem = selections[0].copy();
		
		MessageUtil.question('remove', 'infodelete_msg', null, function(button) {
			if (button === 'ok') {
				me.deleteProcess(deleteItem, selections,isDetailClose );
			}
		});
    },
    
	onSearch: function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();
		
		if(params == null) {
			return;
		}
		
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if(success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
				}
			}
		});
	},
	
	onDblClick: function(grid, record, tr, rowIndex, e, eOpts) {
		var me = this;
		var refs  = me.getReferences();
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
			
		if(selection == null) return;

		me.openDetailPopup(selection, null, false);
	}, 
	
	/******************
	 * UserListDetail *
	 ******************/ 
	onGroupIdCmbSelect: function(combo, record, eOpts) {
		var partnerSelectionStore = Ext.getStore('partnerSelectionStore');
		
		partnerSelectionStore.reload({
			callback: function(records, operation, success) {
				if (success) {
					Ext.Array.each(record.get('partners'), function(partnerItem) {
						var partnerSelectionModel = partnerSelectionStore.findRecord('partnerType', partnerItem.partnerType);
						if (partnerSelectionModel) {
							partnerSelectionModel.set({
								check : true,
								partnerCode : partnerItem.partnerCode
							});
						}
					});
				}
			}
		});
	},
	
	onDetailRemove: function() {
		var me = this;
		
		me.onGridRemove(true);
	},
	
	onCancel: function() {
		this.getView().up('window').close();
	},
	
	onGroupDbClick: function(){
		var userAuthCombo = this.getStore(me.USER_AUTHORITY_STORE);
		
	    if (userAuthCombo && userAuthCombo.loadCount <= 0) {
	    	userAuthCombo.load();
	    }
	},
	
	onAddAuthRow:function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.DETAIL_AUTH_STORE_NAME);
		var grid =  me.lookupReference(me.DETAIL_AUTH_GRID_REF_NAME); 
		var editor = grid.getPlugin('userAuthGrpEditor');
		var userAuthComboStore = me.getStore(me.USER_AUTHORITY_STORE);
		var theDetail = me.getViewModel().getData().theDetail;
		var cnt = store.getData().items.length;
		
		editor.cancelEdit();

		cnt = cnt > 8 ? 8: cnt;

		var record = Ext.create('MOST.model.administrator.SearchUserRegisterParm', {
			authCd: me.authCd,
			grpOrd: cnt+1
		});
		
		store.insert(0, record);
		grid.getSelectionModel().select(record);
		
		editor.startEdit(record);
	},

	//Mantis: 0167785
	onRemoveAuthRow: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.DETAIL_AUTH_GRID_REF_NAME); 
		var store = me.getStore(me.DETAIL_AUTH_STORE_NAME);
		var selections = grid.getSelection() == null ? null: grid.getSelection();
		var deleteItem = selections[0] ? selections[0].copy() : null;
		var a = false;
		
		if (deleteItem == null) return; 
		
		for(var i=0; i<store.data.length; i++){
			if(store.data.items[i].data.authGrp == '' ){
				a = true;
				break;
			}
		}
		
		if(a == true && !selections[0].phantom){
			MessageUtil.warning('warning_msg','Please select Authority Group to complete your addition first');
			return;
		}
    	
    	store.remove(deleteItem);
	},
	
	onUploadImage:function(field){
		var me = this;
     	var refs = me.getReferences();
    	var reader = new FileReader();
    	var dom = Ext.getDom(field.fileInputEl);
		
    	reader.onload = function (e){  
			var imageFile = e.target.result;
			var saveImage = imageFile.split(',');
			
			me.getViewModel().set('imgData',imageFile); 
		}
		
		reader.readAsDataURL(dom.files[0]);
	},
	/**
	 * Etc
	 */
	openPartnerPopup: function(){
		var openedWindow = Ext.ComponentQuery.query('window[title="Partner Inquiry"]');
		var isWindowAlreadyOpened = openedWindow.length > 0 ? true : false;
		
		if (!isWindowAlreadyOpened) {
			this.createPartnerWindow();
		} else {
			Ext.WindowManager.bringToFront(openedWindow);
		}
	},
	
	openPartnerCdTypePopup:function(field, button, e){
		var me = this;
		var refs = me.getReferences();
		var params = {
			searchModule: 'MT'
		};
		
		me.openCodePopup('popup-partnercdtypepopup', field.reference, params);
	},
	
	onDetailSave:function(){
		var me = this;
		var control = me.lookupReference(Ext.String.format('ctl_ownDivCd'));
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
	
	onCancelEdit : function(rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},
	
	onEdit:function(editor, context){
		var me = this;
		var refs = me.getReferences();
	},
	
	onCboUserTypeSelect:function(ele, rec, idx){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().getData().theDetail;
		var departmentCombo = me.getStore(me.DEPARTMENT_COMBO_STORE);
		
		departmentCombo.clearFilter();
		
		if(refs.refCboUserType.getValue() == CONSTANTS.USER_TYPE_INTERNAL){
			refs.txtPtnrCd.setDisabled(true);
			refs.txtPtnrCd.setValue("");
			refs.refChkGrpPtnrTypes.setDisabled(true);
			refs.refChkSHP.setValue('');
			refs.refChkSHA.setValue('');
			refs.refChkTRK.setValue('');
			refs.refChkFWD.setValue('');
			refs.refChkCNS.setValue('');
			refs.refChkTLY.setValue('');
			refs.refCboDepartment.setDisabled(false);
			refs.refCboDepartment.setValue('');
			
//			departmentCombo.filterBy(function(record,id){
//				if(record.get('deptCd').indexOf('JP') > -1){
//					return record;
//				}
//			})
			
//				if(refs.refChkGrpPtnrTypes.getValue().rb != undefined){
//					var ptnrTypeArr = refs.refChkGrpPtnrTypes.getValue().rb;
//					
//					me.unBindingPntrType(ptnrTypeArr);
//				}
			
			//refs.refChkGrpPtnrTypes.setValue("");
		}else if(refs.refCboUserType.getValue() == CONSTANTS.USER_TYPE_EXTERNAL || refs.refCboUserType.getValue() == ''){
			refs.txtPtnrCd.setDisabled(false);
			refs.txtPtnrCd.setValue("");
			refs.refChkGrpPtnrTypes.setDisabled(false);
			refs.refChkSHP.setDisabled(false); refs.refChkSHP.setValue('');
			refs.refChkSHA.setDisabled(false); refs.refChkSHA.setValue('');
			refs.refChkTRK.setDisabled(false); refs.refChkTRK.setValue('');
			refs.refChkFWD.setDisabled(false); refs.refChkFWD.setValue('');
			refs.refChkCNS.setDisabled(false); refs.refChkCNS.setValue('');
			refs.refChkTLY.setDisabled(false); refs.refChkTLY.setValue('');												
			refs.refCboDepartment.setDisabled(true);
			refs.refCboDepartment.setValue('');
			
//				if(detailItem.workingStatus == "U"){
//					refs.txtPtnrCd.setValue(me.agencyCd);
//				}
		}
//		if(refs.refCboUserType.getValue() != ''){			
//		}else{
//			refs.txtPtnrCd.setDisabled(false);
//			refs.txtPtnrCd.setValue("");
//			refs.refChkGrpPtnrTypes.setDisabled(false);
//			refs.refChkSHP.setDisabled(false); refs.refChkSHP.setValue('');
//			refs.refChkSHA.setDisabled(false); refs.refChkSHA.setValue('');
//			refs.refChkTRK.setDisabled(false); refs.refChkTRK.setValue('');
//			refs.refChkFWD.setDisabled(false); refs.refChkFWD.setValue('');
//			refs.refChkCNS.setDisabled(false); refs.refChkCNS.setValue('');
//			refs.refChkTLY.setDisabled(false); refs.refChkTLY.setValue('');
//			refs.refCboDepartment.setDisabled(false);
//			refs.refCboDepartment.setValue('');
//		}
				
		me.onUpdateAuthCd();
	},
	
	onUpdateAuthCd:function(){
		var me = this;
		var refs = me.getReferences();
		var userAuthList = me.getStore(me.USER_AUTHORITY_LIST_STORE);
		
		if(userAuthList.getData().items.length > 0){
			userAuthList.each(function(record){
				record.set('authCd', me.authCd);
			})
		}
	},
	
	onAuthGrpSelect:function(ele, rec, idx){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.DETAIL_AUTH_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null :grid.getSelection()[0];
		var userAuthList = me.getStore(me.USER_AUTHORITY_LIST_STORE);
		var editor = grid.getPlugin('userAuthGrpEditor');
		var idx = userAuthList.find('authGrp', rec.get('authGrp'));
		
		if(selection == null){
			return;
		}
		
		if(idx > -1){
			MessageUtil.error('warning_msg','userlist_authgrp_select');
			ele.setValue('');
			selection.set('authGrp', '');
			return;
		}else{
			//sMantis: 0167785
			selection.set('authGrp', rec.get('authGrp'));
			selection.set('authGrpNm', rec.get('authGrpNm'))
			editor.completeEdit();
			//eMantis: 0167785
			// selection.store.data.items[0].data.authGrp = rec.get('authGrp');
		}
	},
	
	onCheckUserId:function(){
		var me = this;
		var refs = me.getReferences();
		var duplicateIdCheckStore = me.getStore(me.DUCPLICATE_CHECK_STORE);
		var userId = refs.refTxtUserId.getValue();
		
		if(StringUtil.isNullorEmpty(userId)){
			MessageUtil.error('warning_msg','userlist_user_id_blank');
			return;
		}
		
		duplicateIdCheckStore.load({
			params:{
				regUserId: userId
			},
			callback:function(records, operation, success){
				if(success){
					if(records.length > 0){
						MessageUtil.error('warning_msg','userlist_user_user_id_dup_true');
						me.isDup = true;
						me.isDupCheck = false;
					}else{
						MessageUtil.info('info_msg','userlist_user_user_id_dup_false');
						me.isDup = false;
						me.isDupCheck = true;
					}
				}
			}
		})
	},
	
	onCheckIdNo:function(){
		var me = this;
		var refs = me.getReferences();
		var duplicateIdCheckStore = me.getStore(me.DUCPLICATE_CHECK_STORE);
		
		me.isIdNoDupCheck = true;
		
		if(StringUtil.isNullorEmpty(idNo)){
			MessageUtil.error('warning_msg','userlist_id_no_blank');
			return;
		}
		
		duplicateIdCheckStore.load({
			params:{
				idNo: idNo
			},
			callback:function(records, operation, success){
				if(success){
					if(records.length > 0){
						MessageUtil.error('warning_msg','userlist_id_no_dup_true');
						me.isIdNoDup = true;
					}else{
						MessageUtil.info('info_msg','userlist_id_no_dup_false');
						me.isIdNoDup = false;
					}
				}
			}
		})
	},
	
	onAddForFileUpload: function(btn, fileField) {
		var me = this;
		var recvData = me.getDetailBizView().items.get(0).recvData;
		var store = me.getStore(me.USER_DETAIL_UPLOAD_STORE);
    	var input = document.querySelector("input[id='userDetailFileUpload-button-fileInputEl']");
    	var refs = me.getReferences();
    	
    	store.removeAll();
    	store.clearData();
    	store.commitChanges();
    	
    	for(var i=0; i<input.files.length; i++){
    		var record = Ext.create('MOST.model.common.FileUpload');
    		
    		file = input.files[i];
    		
    		record.set('pgmId', 'MPCD010');
    		record.set('fileStream', file);
    		record.set('fileName', file.name);
    		record.set('fileSize', file.size);
    		record.set('workingStatus', WorkingStatus.INSERT);
    		store.insert(0, record);
    	}
	},
	
	onRecopyUser:function(){
		var me = this;
		var refs = me.getReferences();
		var selection = refs.userlistMasterRef.getSelection() == null ? null :refs.userlistMasterRef.getSelection()[0]
		
		if(selection == null){
			MessageUtil.error('warning_msg','user_list_recopy_blank');
			return;
		}
		
		var record = Ext.create('MOST.model.administrator.UserRegister');
    	
    	record.set('workingStatus', 'C');
    	record.set('regUserType',selection.get('regUserType'));
    	record.set('regUserLevel',selection.get('regUserLevel'));
    	record.set('ptnrCd',selection.get('ptnrCd'));
    	record.set('faxNo',selection.get('faxNo'));
    	record.set('addr',selection.get('addr'));
    	record.set('mptsAp',selection.get('mptsAp'));
    	record.set('ptnrTypes',selection.get('ptnrTypes'));
    	record.set('grdCd',selection.get('grdCd'));
    	record.set('useYn','N');
    	
    	var userAuthList = me.getStore(me.USER_AUTHORITY_LIST_STORE);
		
		userAuthList.load({
    		params:{
    			regUserId: selection.get('regUserId')
    		}
    	});
    	
    	me.getViewModel().setData({detailItem:record.getData()});
    	me.openDetailPopup(record);
	},
	
	onTxtUserIdFocusLeave:function(){
		var me = this;
		var refs = me.getReferences();
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.administrator.SearchUserRegisterParm';
		searchBizParm.serviceID = 'MOST.userRegister.selectUserList'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	
	onImageRemove : function() {
		var me = this;
		var refs = me.getReferences();
		
  		me.getViewModel().set('imgData','');
	},
	
	  /**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */
	
	/**
	 * GENERAL METHOD START
	 * =========================================================================================================================
	 */
	getSearchCondition: function() {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		var frmDt = '';
		var toDt = '';
		
		if(refs.refDtFrom.getValue() != '' && refs.refDtFrom.getValue() != null){
			frmDt = Ext.Date.format(new Date(refs.refDtFrom.getValue()), 'd/m/Y')
		}
		
		if(refs.refDtTo.getValue() != '' && refs.refDtTo.getValue() != null){
			toDt = Ext.Date.format(new Date(refs.refDtTo.getValue()), 'd/m/Y')
		}
		
		params['regUserId'] = searchParm.data.regUserId;
		params['regUserNm'] = searchParm.data.regUserNm;
		params['ptnrType'] = searchParm.data.ptnrType;
		params['ptnrCd'] = searchParm.data.ptnrCd;
		params['regYn'] = searchParm.data.regYn;
		params['status'] = searchParm.data.status;
		params['regUserType'] = searchParm.data.regUserType;
		params['regUserLevel'] = searchParm.data.regUserLevel;
		params['useYn'] = searchParm.data.useYn;
		params['ptnrType'] = searchParm.data.ptnrType;
		params['idNo'] = searchParm.data.idNo;
		params['frmDt'] = frmDt;
		params['toDt'] = toDt;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		
		return params;
	},
	
	saveProcess: function() {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var userAuthListStore = me.getStore(me.DETAIL_AUTH_STORE_NAME);
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var detailItem = me.getViewModel().get('theDetail');
		var detailView = me.getDetailBizView();
		var isCreated = detailItem.phantom;
		var ptnrTypesArr = new Array();
		var ptnrSysListArr = new Array();
		var ptnrUserListArr = new Array();
		var userDetailUpload = me.getStore(me.USER_DETAIL_UPLOAD_STORE);
		var uploadData = userDetailUpload.getData().items;
		var frm = refs.fileForm;
		var isFileUpload = false;
		var formData = new FormData(frm);
		var sendArray = new Array();
		var regUserIdLength = detailItem.get("regUserId").length;
		var passwordLength = detailItem.get("password").length;
		
		if (detailItem == null) {
			return;
		}

		detailItem.set('userId', MOST.config.Token.getUserId());
		
		if(regUserIdLength < 4){
			MessageUtil.error('warning_msg','userlist_user_id_length');
			return;
		}
		
		if(passwordLength < 5){
			MessageUtil.error('warning_msg','userlist_password_length');
			return;
		}
		
		if(!me.isDupCheck && isCreated){
			MessageUtil.error('warning_msg','userlist_user_id_checkdup_false');
			return;
		}
		
		if(me.isDup && isCreated){
			MessageUtil.error('warning_msg','userlist_user_user_id_dup_true');
			return;
		}
		
		if(me.isIdNoDup && isCreated){
			MessageUtil.error('warning_msg','userlist_user_user_id_dup_true');
			return;
		}
		
		if((refs.refChkGrpPtnrTypes.getValue().rb == null || refs.refChkGrpPtnrTypes.getValue().rb == '') && refs.refCboUserType.getValue() != 'I'){
			MessageUtil.warning("warning_msg", "company_select_partnertype");
			return;
		}
		
		var authGrStore = me.getStore(me.DETAIL_AUTH_STORE_NAME);
		var checkAuthNull = false;
		
		for(var i = 0; i< authGrStore.data.length; i++){
			if(authGrStore.data.items[i].data.authGrp == ''){
				checkAuthNull = true;
				break;
			}
		}
		
		if(checkAuthNull){
			MessageUtil.warning("warning_msg", "Please select Authority Group");
			return;
		}
		
		var ptnrSysItem = Ext.create('MOST.model.administrator.SearchUserRegisterParm');
		var ptnrSysListArr = new Array();
		
		ptnrSysItem.set('regUserId', detailItem.get("regUserId"));
		ptnrSysItem.set('sysCd', 'MPTS');
		ptnrSysItem.set('useYn', 'Y');
		ptnrSysItem.set('sysOwnerAp', 'P');
		ptnrSysItem.set('sysOwner', MOST.config.Token.getUserId());
		
		ptnrSysListArr.push(ptnrSysItem.data)
		
		if(refs.refCboUserType.getValue() == "I"){
			detailItem.set("ptnrCd","");
		}else{
			ptnrSysItem.set("ptnrCd", detailItem.get("ptnrCd"));
		}
		
		if(refs.refChkGrpPtnrTypes.getValue().rb != null && refs.refChkGrpPtnrTypes.getValue().rb != ''){			
			ptnrTypesArr = refs.refChkGrpPtnrTypes.getValue().rb.toString();
		}
		
		if(ptnrTypesArr != null && ptnrTypesArr != ''){
			var ptrnTypes = ptnrTypesArr.split(',');
			if(ptrnTypes.length > 0){
				var newPtnrTypes = '';
				var i = 0;
				while(i < ptrnTypes.length){
					if(newPtnrTypes == ''){
						newPtnrTypes = ptrnTypes[i];
					}else{
						newPtnrTypes = newPtnrTypes + '/' + ptrnTypes[i]
					}
					
					var ptnrUserItem = Ext.create('MOST.model.administrator.SearchUserRegisterParm');
					
					ptnrUserItem.set('ptnrType', ptrnTypes[i]);
					ptnrUserItem.set('regUserId', detailItem.get("regUserId"));
					ptnrUserItem.set('ptnrCd', detailItem.get("ptnrCd"));
					
					ptnrUserListArr.push(ptnrUserItem.data);
					
					i++;
				}
				
				detailItem.data.ptnrUserList = ptnrUserListArr;
				detailItem.data.ptnrTypes= newPtnrTypes;
			}
		}
		
		if(userAuthListStore.getData().items.length > 0){
			var userAuthArr = new Array();
			
			userAuthListStore.each(function(record, index, array){
				record.set('regUserId', detailItem.get("regUserId"));
				userAuthArr.push(record.data);
			})
			
			detailItem.data.userAuthList= userAuthArr;
		}else{
			MessageUtil.error('warning_msg','userlist_user_auth_blank');
			return;
		}
		
		//added by Brian (2022/02/17)
		var imageFile = me.getViewModel().get('imgData'); 
		if(imageFile){
			var saveImage = imageFile.split(',');
			detailItem.set("userImage",saveImage[1]);
		}
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('item', detailItem.data);
		updateParm.get('item').exprDt = Ext.Date.format(detailItem.get('exprDt'), MOST.config.Locale.getShortDate());
		
		updateParm.save({
			success: function(record) {
				detailItem.commit();
				userAuthListStore.reload();
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
						if (button === 'ok') {
							detailView.close();
							store.reload();
						}
				});
				me.isDupCheck = false ;
				me.isDup = false ;
				me.isIdNoDupCheck = false ;
				me.isIdNoDup = false ;
			}
		});
	},
	
	deleteProcess:function(deleteItem, selections, isDetailClose) {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		// File Upload DELETE RECORD
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = false;
		updateParm.drop();
		updateParm.set('workingStatus', WorkingStatus.DELETE);
		updateParm.set('items', new Array());
		
		selections.forEach(function (item) {
			updateParm.get('items').push(item.data);
		});
		
		updateParm.save({
			success : function(record, operation) {
				selections.forEach(function (item) {
					item.commit();
					store.remove(item);
				});
				
				updateParm.set('workingStatus', WorkingStatus.DELETE);
				updateParm.commit();
				
				store.commitChanges();

				MessageUtil.saveSuccess();
				
				if (isDetailClose) {
					var detailView = me.getDetailBizView();
					
					if (detailView) {
						detailView.close();
					}
				}
				
				me.onSearch();
			}
		});
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		returnData = returnValue.item.getData();
		
		
		
		if(targetControl == 'txtPtnrCd'){
			refs.refTxtMobileNo.setValue(returnData.telNo);
			refs.refTxtAddress.setValue(returnData.addr);
			
			var ptnrTypeArr = returnValue.item.data.ptnrTypes.split('/');
			
			me.bindingPntrType(ptnrTypeArr);
		}
	},
	
	fcheckSpacePassword:function(){
		var me = this;
		var refs = me.getReferences();
		var ib_password = refs.refTxtPassword.getValue();
		var strAllowed = "abcdefghijklmnopqrstuvwxyz";
	    	strAllowed += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	    	strAllowed += "1234567890";
	    	strAllowed += "-=!@#$%^&*()_+[]\\;',./{}|:\"<>?";
	    	
		for (var i = 0; i <ib_password.length; i++) {
			if (strAllowed.indexOf(ib_password.charAt(i))==-1) { //Character Not Exist in strAllowed		
				alert('Password contains special character. Please check again.');
				form.PASSWORD.focus();
				return false;			
			}else if(strAllowed.indexOf(ib_password.charAt(i))== 88){ //added by Raizo 16/09/2019: Can't input " character
				alert('Cannot input " character.');
				form.PASSWORD.focus();
				return false;
			}		
		}
		return true;	
	},

	createPartnerWindow: function(){
		var me = this;
		var partnerWindow = Ext.create('widget.window',{
			title: 'Partner Inquiry',
			layout: 'fit',
			modal: true,
			resizable: false,
			collapsible: true,
			constrain: true,
			scrollable: true,
			width: 700,
			height: 500,
			items: [{
				xtype: 'partnerpopup'
			}],
			listeners:{
				close:function(){
                	me.setPtnrInfo();
                }
			}
		}).show();
	},
	
	setPtnrInfo: function(){
		var me = this;
		var partnerStore = Ext.data.StoreManager.lookup('selectPartnerStore');
		
		if(partnerStore != undefined){
			var userInfoForm = me.getView().down('form').getForm();
			userInfoForm.findField('ptnrCd').setValue(partnerStore.data.items[0].data.ptnrCode);
		}
	},
	
	bindingPntrType:function(ptnrTypeArr){
    	var me = this;
    	var refs = me.getReferences();
    	var i = 0;
    	//var departmentCombo = me.getStore(me.DEPARTMENT_COMBO_STORE);
    	
    	//departmentCombo.clearFilter();
    	
    	refs.refChkSHP.setDisabled(true);
		refs.refChkSHA.setDisabled(true);
        refs.refChkTRK.setDisabled(true);
        refs.refChkFWD.setDisabled(true);
        refs.refChkCNS.setDisabled(true);
        refs.refChkTLY.setDisabled(true);
        refs.refChkCTT.setDisabled(true);
        
        var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;

		var ptnrTypeArray;
		
		if(ptnrTypeArr.length === 1){
			ptnrTypeArray = ptnrTypeArr[0].split(",");
		} else {
			ptnrTypeArray = ptnrTypeArr;
		}

    	while(i < ptnrTypeArray.length){
    		var reference = 'refChk' + ptnrTypeArray[i];
    		
    		if(recvData != undefined){
				var ptnrTypeArrayFromRecvData = recvData.get('ptnrType').split(",");
    			if(ptnrTypeArrayFromRecvData.indexOf(ptnrTypeArray[i]) > -1){
    				me.lookupReference(reference).setValue(true);
				}
    		}
    		me.lookupReference(reference).setDisabled(false);
    		
    		/*if(ptnrTypeArr[i] == 'GVM'){
    			refs.refCboDepartment.setDisabled(false);
    			departmentCombo.filterBy(function(record,id){
    				if(record.get('deptCd').indexOf('GA') > -1){
    					return record;
    				}
    			})
    		}*/
    		
    		i++;
    	}
    },
    
	onGridComboRenderer:function(val, cell){
		var me = this;
		var refs = me.getReferences();
		var userAuthListStore = me.getStore(me.USER_AUTHORITY_LIST_STORE);
		var userAuthComboStore = me.getStore(me.USER_AUTHORITY_STORE);
		
		if(cell.column.dataIndex == 'authGrp'){
			if(!StringUtil.isNullorEmpty(val)){
				var indx = -1;
				indx = userAuthListStore.find('authGrp', val);
				
				if (indx != -1){
					if(userAuthListStore.getAt(indx).get('authGrpNm') != undefined){
						return userAuthListStore.getAt(indx).get('authGrpNm'); 
					}else{
						var indxAuthCombo = - 1;
						indxAuthCombo = userAuthComboStore.find('authGrp', val);
						return userAuthComboStore.getAt(indxAuthCombo).get('authGrpNm'); 
					}
				}else{
					if(userAuthListStore.getAt(0).get('authGrpNm') != undefined){
						return userAuthListStore.getAt(0).get('authGrpNm'); 
					}else{
						return userAuthComboStore.getAt(0).get('authGrpNm');
					}
				}
			}
		}
	},
    
    unBindingPntrType:function(ptnrTypeArr){
    	var me = this;
    	var refs = me.getReferences();
    	var i = 0;
    	
    	while(i < ptnrTypeArr.length){
    		var reference = 'refChk' + ptnrTypeArr[i];
    		me.lookupReference(reference).setValue(false);
    		me.lookupReference(reference).setDisabled(true);
    		i++;
    	}
    }
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});