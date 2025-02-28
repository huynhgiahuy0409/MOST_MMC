Ext.define('MOST.view.administrator.administratorGroupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.authoritygroup',
	selectedGroup: '',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refAuthorityGroupGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'authGrpList',            // Main Store Name
	USER_GRID_REF_NAME: 'refUserListGrid',  // UserList Grid Name 
	USER_STORE_NAME: 'userList',            // UserList Store Name
	
	AUTH_ACCESS_CODE_STORE_NAME: 'accessAuthCodeList',
	AUTH_ACCESS_CONF_STORE_NAME: 'accessAuthConfList',
	AUTH_ACCESS_ADMIN_STORE_NAME: 'accessAuthAdminList',
	AUTH_ACCESS_DOC_STORE_NAME: 'accessAuthDocList',
	AUTH_ACCESS_PLAN_STORE_NAME: 'accessAuthPlanList',
	AUTH_ACCESS_OPE_STORE_NAME: 'accessAuthOpeList',
	AUTH_ACCESS_MONITOR_STORE_NAME: 'accessAuthMonitorList',
	AUTH_ACCESS_BILLING_STORE_NAME: 'accessAuthBillingList',
	AUTH_ACCESS_TABLET_STORE_NAME: 'accessAuthTabletList',
	
	PARAMETTER_CHECK_COMBOBOX_STORE: 'yesNoCombo',
	
	AUTH_USER_GROUP_ID: 'GROUP',
	USE_YES: 'Y',
	USE_NO: 'N',
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
		var searchParm = Ext.create('MOST.model.administrator.SearchAuthorityGroupParm');
		
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.YES_NO, me.PARAMETTER_CHECK_COMBOBOX_STORE); 
		me.updateViewStyle(me.getView());
	},
	
	onDetailLoad:function(){
    	var me = this;
		var detailView = me.getDetailBizView();
		
		me.setDetailInitialize();
    },
    
    setDetailInitialize:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var authUserId = me.AUTH_USER_GROUP_ID;
		var recvData = detailView.items.get(0).recvData;

		var accessAuthCodeList = me.getStore(me.AUTH_ACCESS_CODE_STORE_NAME);
		var accessAuthAdminList = me.getStore(me.AUTH_ACCESS_ADMIN_STORE_NAME);
		var accessAuthConfList = me.getStore(me.AUTH_ACCESS_CONF_STORE_NAME);
		var accessAuthDocList = me.getStore(me.AUTH_ACCESS_DOC_STORE_NAME);
		var accessAuthPlanList = me.getStore(me.AUTH_ACCESS_PLAN_STORE_NAME);
		var accessAuthOpeList = me.getStore(me.AUTH_ACCESS_OPE_STORE_NAME);
		var accessAuthMonitorList = me.getStore(me.AUTH_ACCESS_MONITOR_STORE_NAME);
		var accessAuthBillingList = me.getStore(me.AUTH_ACCESS_BILLING_STORE_NAME);
		var accessAuthTabletList = me.getStore(me.AUTH_ACCESS_TABLET_STORE_NAME);
		
		if(recvData){
    		me.getViewModel().setData({theDetail:recvData});
    		
    		me.searchAuthorityCodeList();
    		me.searchAuthorityAdminList();
    		me.searchAuthorityConfList();
    		me.searchAuthorityDocList();
    		me.searchAuthorityPlanList();
    		me.searchAuthorityOpeList();
    		me.searchAuthorityMonitorList();
    		me.searchAuthorityBillingList();
    		me.searchAuthorityTabletList();
		} else {
			recvData = Ext.create('MOST.model.administrator.AuthorityGroup');
			me.getViewModel().setData({theDetail:recvData});
			
			accessAuthCodeList.load({
	    		params:{
	    			authUserId: authUserId,
	    			lClsf: 0
	    		}
	    	});
			
			accessAuthConfList.load({
	    		params:{
	    			authUserId: authUserId,
	    			lClsf: 1
	    		}
	    	});
			
			accessAuthAdminList.load({
	    		params:{
	    			authUserId: authUserId,
	    			lClsf: 2
	    		}
	    	});
			
			accessAuthDocList.load({
	    		params:{
	    			authUserId: authUserId,
	    			lClsf: 3
	    		}
	    	});
			
			accessAuthPlanList.load({
	    		params:{
	    			authUserId: authUserId,
	    			lClsf: 4
	    		}
	    	});
			
			accessAuthOpeList.load({
	    		params:{
	    			authUserId: authUserId,
	    			lClsf: 5
	    		}
	    	});
			
			accessAuthMonitorList.load({
	    		params:{
	    			authUserId: authUserId,
	    			lClsf: 6
	    		}
	    	});
			
			accessAuthBillingList.load({
	    		params:{
	    			authUserId: authUserId,
	    			lClsf: 7
	    		}
	    	});
			
			accessAuthTabletList.load({
	    		params:{
	    			authUserId: authUserId,
	    			searchType: 'HHT'
	    		}
	    	});
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
	
	onAdd:function(){
		var me = this;
		
		me.openDetailPopup(null);
	},
	
	onRemove: function() {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var selections = grid.getSelection() == null ? null: grid.getSelection();
		
		if (me.getStore(me.USER_STORE_NAME).data.length > 0 ){
			MessageUtil.error('warning_msg','authorityGrp_user_check');
			return;
		}
		
		MessageUtil.question('remove', 'infodelete_msg', null, function(button) {
			if (button === 'ok') {
				me.deleteProcess(selections);
			}
		});
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.administrator.SearchAuthorityGroupParm';
		searchBizParm.serviceID = 'MOST.authorityGroup.selectAuthorityGroup';

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},

	onCellClick:function(gridview, tdEl, cellIndex, record, trEl, rowIndex, e){
		var me = this;
		var refs = me.getReferences();
		var userList = me.getStore(me.USER_STORE_NAME);
		
		userList.removeAll();
		
		if(!StringUtil.isNullorEmpty(record.get('authGrp'))){
//			if(gridview.getHeaderCt().getHeaderAtIndex(cellIndex).dataIndex === 'authGrpNm'){
//			}
			if(gridview.selection){
				me.selectedGroup = record.get('authGrp');
				me.searchUserList();	
			}
		}
	},
	
	onDblClick:function(){
		var me = this;
		var refs  = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
	
		if(selection == null) return;

		me.openDetailPopup(selection, null, false);
	},
	
	onDetailSave:function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var detailView = me.getDetailBizView();
		
		if(detailView){
			var infoForm = detailView.down('form').getForm();
			
			if(infoForm.isValid()){
				me.saveProcess();
			} else {
				MessageUtil.mandatoryFieldInValid();
			}
			
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
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.MAIN_STORE_NAME)
     	var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		var grantYn;
		
		if(refs.rdJPVC.checked == true){
			grantYn = 'Y';
		}else {
			grantYn = 'N';
		}
		
		params['authGrp'] = searchParm.data.authGrp;
		params['authGrpNm'] = searchParm.data.authGrpNm;
		params['grantYn'] = grantYn;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		
    	return params;
	},
	
	searchUserList : function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.USER_STORE_NAME);
     	var grid = me.lookupReference(me.USER_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		
		params['authGrp'] = me.selectedGroup;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		
		store.load({
			params: params
		});
	},
	
	searchAuthorityCodeList : function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.AUTH_ACCESS_CODE_STORE_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theDetail');
		var params = me.createParam(searchParm);
		
		params['authGrp'] = me.selectedGroup;
		params['authUserId'] = me.AUTH_USER_GROUP_ID;
		params['lClsf'] = 0;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		
		store.load({
			params: params
		});
	},
	
	searchAuthorityConfList : function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.AUTH_ACCESS_CONF_STORE_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theDetail');
		var params = me.createParam(searchParm);
		
		params['authGrp'] = me.selectedGroup;
		params['authUserId'] = me.AUTH_USER_GROUP_ID;
		params['lClsf'] = 1;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		
		store.load({
			params: params
		});
	},
	
	searchAuthorityAdminList : function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.AUTH_ACCESS_ADMIN_STORE_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theDetail');
		var params = me.createParam(searchParm);
		
		params['authGrp'] = me.selectedGroup;
		params['authUserId'] = me.AUTH_USER_GROUP_ID;
		params['lClsf'] = 2;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		
		store.load({
			params: params
		});
	},
	
	searchAuthorityDocList : function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.AUTH_ACCESS_DOC_STORE_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theDetail');
		var params = me.createParam(searchParm);
		
		params['authGrp'] = me.selectedGroup;
		params['authUserId'] = me.AUTH_USER_GROUP_ID;
		params['lClsf'] = 3;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		
		store.load({
			params: params
		});
	},
	
	searchAuthorityPlanList : function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.AUTH_ACCESS_PLAN_STORE_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theDetail');
		var params = me.createParam(searchParm);
		
		params['authGrp'] = me.selectedGroup;
		params['authUserId'] = me.AUTH_USER_GROUP_ID;
		params['lClsf'] = 4;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		
		store.load({
			params: params
		});
	},
	
	searchAuthorityOpeList : function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.AUTH_ACCESS_OPE_STORE_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theDetail');
		var params = me.createParam(searchParm);
		
		params['authGrp'] = me.selectedGroup;
		params['authUserId'] = me.AUTH_USER_GROUP_ID;
		params['lClsf'] = 5;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		
		store.load({
			params: params
		});
	},
	
	searchAuthorityMonitorList : function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.AUTH_ACCESS_MONITOR_STORE_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theDetail');
		var params = me.createParam(searchParm);
		
		params['authGrp'] = me.selectedGroup;
		params['authUserId'] = me.AUTH_USER_GROUP_ID;
		params['lClsf'] = 6;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		
		store.load({
			params: params
		});
	},
	
	searchAuthorityBillingList : function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.AUTH_ACCESS_BILLING_STORE_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theDetail');
		var params = me.createParam(searchParm);
		
		params['authGrp'] = me.selectedGroup;
		params['authUserId'] = me.AUTH_USER_GROUP_ID;
		params['lClsf'] = 7;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		
		store.load({
			params: params
		});
	},
	
	searchAuthorityTabletList : function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.AUTH_ACCESS_TABLET_STORE_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theDetail');
		var params = me.createParam(searchParm);
		
		params['authGrp'] = me.selectedGroup;
		params['authUserId'] = me.AUTH_USER_GROUP_ID;
		params['searchType'] = 'HHT';
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		
		store.load({
			params: params
		});
	},
	
	saveProcess: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var detailView = me.getDetailBizView();
		var accessAuthCodeList = me.getStore(me.AUTH_ACCESS_CODE_STORE_NAME);
		var accessAuthAdminList = me.getStore(me.AUTH_ACCESS_ADMIN_STORE_NAME);
		var accessAuthConfList = me.getStore(me.AUTH_ACCESS_CONF_STORE_NAME);
		var accessAuthDocList = me.getStore(me.AUTH_ACCESS_DOC_STORE_NAME);
		var accessAuthPlanList = me.getStore(me.AUTH_ACCESS_PLAN_STORE_NAME);
		var accessAuthOpeList = me.getStore(me.AUTH_ACCESS_OPE_STORE_NAME);
		var accessAuthMonitorList = me.getStore(me.AUTH_ACCESS_MONITOR_STORE_NAME);
		var accessAuthBillingList = me.getStore(me.AUTH_ACCESS_BILLING_STORE_NAME);
		var accessAuthTabletList = me.getStore(me.AUTH_ACCESS_TABLET_STORE_NAME);
		var storeArr = [accessAuthCodeList, accessAuthAdminList, accessAuthConfList, accessAuthDocList, accessAuthPlanList, accessAuthOpeList, accessAuthMonitorList, accessAuthBillingList, accessAuthTabletList];
		var store = '';
		var groupStore = me.getStore(me.MAIN_STORE_NAME);
		var arr = new Array();
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var isCreated = detailItem.phantom;
		
		for(var i = 0; i <storeArr.length; i++){
			store = storeArr[i];
			
			store.getModifiedRecords().forEach(function(item, index, array){
				if(item.get('cuseYn')){
			    	item.data.cuseYn = me.USE_YES;
			    }else{
			    	item.data.cuseYn = me.USE_NO;
			    }
				
			    if(item.get('cinquiry')){
			    	item.data.cinquiry = me.USE_YES;
			    }else{
			    	item.data.cinquiry = me.USE_NO;
			    }
			    
			    if(item.get('cclear')){
			    	item.data.cclear =  me.USE_YES;
			    }else{
			    	item.data.cclear =  me.USE_NO;
			    }
			    
			    if(item.get('ccreate')){
			    	item.data.ccreate =  me.USE_YES;
			    }else{
			    	item.data.ccreate =  me.USE_NO;
			    }
			    
			    if(item.get('cdelete')){
			    	item.data.cdelete =  me.USE_YES;
			    }else{
			    	item.data.cdelete =  me.USE_NO;
			    }
			    
			    if(item.get('cdownload')){
			    	item.data.cdownload =  me.USE_YES;
			    }else{
			    	item.data.cdownload =  me.USE_NO;
			    }
			    
			    if(item.get('chistory')){
			    	item.data.chistory =  me.USE_YES;
			    }else{
			    	item.data.chistory =  me.USE_NO;
			    }
			    
			    if(item.get('cpreview')){
			    	item.data.cpreview =  me.USE_YES;
			    }else{
			    	item.data.cpreview =  me.USE_NO;
			    }
			    
			    if(item.get('cprint')){
			    	item.data.cprint =  me.USE_YES;
			    }else{
			    	item.data.cprint =  me.USE_NO;
			    }
			    
			    if(item.get('csave')){
			    	item.data.csave =  me.USE_YES;
			    }else{
			    	item.data.csave =  me.USE_NO;
			    }

				item.data.authUserId = me.AUTH_USER_GROUP_ID;
				item.data.userId = MOST.config.Token.getUserId();
				arr.push(item.data);
			});
		}

		if(arr.length > 0 || isCreated != null){
			updateParm.getProxy().url = store.getProxy().url;
			updateParm.phantom = isCreated;
			updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
			detailItem.set('userList', arr);
			detailItem.set("userId", MOST.config.Token.getUserId());
			updateParm.set('item', detailItem.data);
			
			updateParm.save({
				success : function(records,success){
					detailItem.set("version", detailItem.get('newVersion'));
					detailItem.commit();
					
					MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
						function(button){
							if (button === 'ok') {
								me.onSearch();
								detailView.close();
							}
						}
					);
				}
			});
		}
	},
	
	deleteProcess:function(selections){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = false;
		updateParm.drop();
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
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
				
				updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
				updateParm.commit();
				
				MessageUtil.saveSuccess();
			}
		});
	},
	
	openGroupNamePopup:function(field, button, e){
		var me = this;
		var refs = me.getReferences();
		
		me.openCodePopup('popup-grouplistpopup', 'refTxtGroupNm');
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl === "refTxtGroupNm"){
			refs.refTxtGroupCd.setValue(returnValue.authGrp);
			refs.refTxtGroupNm.setValue(returnValue.authGrpNm);
		}
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});