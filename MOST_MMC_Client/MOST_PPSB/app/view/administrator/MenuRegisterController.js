Ext.define('MOST.view.administrator.MenuRegisterController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.menuregister',

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	
	MAIN_GRID_REF_NAME: 'refColPgmId',  // Main Grid Name 
	MAIN_STORE_NAME: 'menuList',            // Main Store Name
	DETAIL_GRID_REF_NAME: 'refProgramInfoGrid',				// Detail Grid Name 
	DETAIL_STORE_NAME: 'programInfoList',					// Detail Store Name
	PARAMETTER_CHECK_COMBOBOX_STORE: 'yesNoCombo',
	CHECK_PGMID_STORE: 'checkPgmIdDup',
	DETAIL_STORE_PROXY_URL: MOST.config.Locale.getRestApiDestUrl() + '/v1/programmanager/programinfolist',

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
		var searchParm = Ext.create('MOST.model.administrator.SearchMenuRegisterParm');
		
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.YES_NO, me.PARAMETTER_CHECK_COMBOBOX_STORE);
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
	},
	
	onDetailLoad:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var refs = me.getReferences();
		var recvData = detailView.items.get(0).recvData;
		var detailStore = me.getStore(me.DETAIL_STORE_NAME);
		var grid = me.lookupReference(me.DETAIL_GRID_REF_NAME);
		var editor = grid.getPlugin('programInfoEditor');
		var record = Ext.create('MOST.model.administrator.MenuRegister'); 
		
		me.updateViewStyle(me.getView());
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.YES_NO, me.PARAMETTER_CHECK_COMBOBOX_STORE);
		
		if(recvData == undefined){ // CREATE
			
			recvData = Ext.create('MOST.model.administrator.MenuRegister');
			recvData.data.workingStatus = WorkingStatus.INSERT;
			recvData.data.phantom=true;
			
			//Clear filter for Grid
			grid.filters.clearFilters();
			grid.filters.disable();
			
			//Clear filter for Store
			detailStore.clearFilter();
			detailStore.clearData();

			var idx = 0;
			if(grid.getSelection() && grid.getSelection().length>0) {
				idx = detailStore.indexOfId(grid.getSelection()[0].get('id'));
			}
			
			record.set('sysCd', 'MOST');
			record.set('workingStatus', WorkingStatus.INSERT);
			
			detailStore.insert(idx, record);

		} else { //update
			recvData.data.workingStatus = WorkingStatus.UPDATE;
			recvData.data.phantom = false;
			
			detailStore.load({
				params : {
					pgmId : recvData.data.pgmId,
				},
				callback : function(records, operation, success) {
					if (success) {
						if (records && records.length <= 0) {
							MessageUtil.noMatchData();
						}
					}
				}
			});
		}
				
		me.getViewModel().setData({theDetail:recvData.data});
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
		var store = me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();
		
		if (params == null) {
			return;
		}
		
		store.load({
			params : params,
			callback : function(records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}
				}
			}
		});
	},
	
	onAdd:function(){
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		
		if(grid.getSelection() == null){
			grid.setSelection(null);
		}
				
		me.openDetailPopup();
	},
	
	onCancelEdit:function(rowEditing, context) {
		var me = this;
		
		me.gridCancelEdit(rowEditing, context);
	},
	
	// Grid Edit
	onEdit : function(editor, context){
		var me = this;
		
		me.gridEdit(editor, context, false);
	},
	
	onValidateEdit:function(editor, context){
		var me = this;
		var refs = me.getReferences();
		var duplicateCheckStore = me.getStore(me.CHECK_PGMID_STORE);
		var params = {
				pgmId: context.newValues.pgmId,
				menuClsf: context.newValues.menuClsf
		}
		
		me.gridDupliationCheck(editor, context, duplicateCheckStore, params);
	},
	
	onRemove: function() {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selections = grid.getSelection() == null ? null: grid.getSelection();
		var deleteItem = selections[0].copy();
		
		deleteItem.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
		
		if(selections === null) return;
		
		MessageUtil.question('remove', 'infodelete_msg', null, function(button) {
			if (button === 'ok') {
				me.deleteProcess(deleteItem, selections, false);
			}
		});
	},

	onDblClick:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null: grid.getSelection()[0];
		
		me.openDetailPopup(selection);
	},
	
	onDetailSave:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var detailView = me.getDetailBizView();
		var infoForm = detailView.down('form').getForm();
		
		if(infoForm.isValid()){
			if(refs.refProgramId.value==''||refs.refProgramId.value==null){
				refs.refProgramId.value=detailItem.pgmId;
			}
			if(refs.refProgramNm.value==''||refs.refProgramNm.value==null){
				refs.refProgramNm.value=detailItem.pgmNm;
			}
			if(refs.refProgramPath.value==''||refs.refProgramId.value==null){
				refs.refProgramId.value='/MOST';
			}
			
			me.saveProcess();
		} else {
			MessageUtil.mandatoryFieldInValid();
		}
	},
	
	onDetailRemove:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selections = grid.getSelection() == null ? null: grid.getSelection();
		var deleteItem = selections[0].copy();
		
		me.deleteProcess(deleteItem,selections,true);
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var refs = me.getReferences();
		var searchBizParm = me.getSearchCondition();
		searchBizParm.classID = 'com.tsb.most.biz.parm.administrator.SearchMenuRegisterParm';
		searchBizParm.serviceID = 'MOST.menuRegister.selectMenuList'

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
	// Search Condition
	getSearchCondition : function(){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		
		params['pgmId'] = searchParm.data.pgmId.toLowerCase();
        params['pgmNm'] = searchParm.data.pgmNm.toUpperCase();
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		
    	return params;
	},
	
	deleteProcess: function(deleteItem, selections, isDetailClose) {
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var detailStore = me.getStore(me.DETAIL_STORE_NAME);
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var updateParm2 = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = false;
		updateParm.drop();
		updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
		updateParm.set('items', new Array());
		
		if(selections){
			selections.forEach(function (item) { 
				updateParm.get('items').push(item.data);
			});
		}
		
		//menuList
		updateParm.save({
			success : function(record, operation) {
				selections.forEach(function (item) {
					item.commit();
					store.remove(item);
				});
				
				updateParm.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
				updateParm.commit();
				
				store.commitChanges();

				MessageUtil.saveSuccess();
				
				if (isDetailClose) {
					var detailView = me.getDetailBizView();
					
					if (detailView) {
						detailView.close();
					}
				}
			}
		});
		
		//programInfo
		updateParm2.getProxy().url = detailStore.getProxy().url;
		updateParm2.phantom = false;
		updateParm2.drop();
		updateParm2.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
		updateParm2.set('items', new Array());

		selections.forEach(function (item) {
			updateParm2.get('items').push(item.data);
		});

		updateParm2.save({
			success : function(record, operation) {
				selections.forEach(function (item) {
					item.commit();
					store.remove(item);
				});
				
				updateParm2.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.DELETE));
				updateParm2.commit();
				
				detailStore.commitChanges();

				MessageUtil.saveSuccess();
				
				if (isDetailClose) {
					var detailView = me.getDetailBizView();
					
					if (detailView) {
						detailView.close();
					}
				}
			}
		});
	},
	
	saveProcess:function(){
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var detailStore = me.getStore(me.DETAIL_STORE_NAME);
		var detailItem = me.getViewModel().get('theDetail');
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var isCreated = detailItem.phantom;
		
		detailItem.userId=MOST.config.Token.getUserId(); //Object
		detailItem.menuClsf='4';

		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var updateParm2 = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.UPDATE : WorkingStatus.INSERT);
		updateParm.set('userId', MOST.config.Token.getUserId());
		updateParm.set('item', detailItem);
		
		updateParm.save({
			success: function(record) {
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg',
					function(button){
						if (button === 'ok') {
							me.onSearch();
							detailView.close();
						}
				});
			}
		});
		
		//programInfo
		updateParm2.getProxy().url = detailStore.getProxy().url;
		updateParm2.phantom = isCreated;
		updateParm2.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm2.set('items', new Array());
		updateParm2.set('pgmId',detailItem.pgmId);
		updateParm2.set('pgmNm',detailItem.pgmNm);
		updateParm2.set('pgmPath','/MOST');
		updateParm2.set('cClear',detailStore.data.items[0].data.cClear);
		updateParm2.set('cCreate',detailStore.data.items[0].data.cCreate);
		updateParm2.set('cDelete',detailStore.data.items[0].data.cDelete);
		updateParm2.set('cDownload',detailStore.data.items[0].data.cDownload);
		updateParm2.set('cHistory',detailStore.data.items[0].data.cHistory);
		updateParm2.set('cInquiry',detailStore.data.items[0].data.cInquiry);
		updateParm2.set('cPreview',detailStore.data.items[0].data.cPreview);
		updateParm2.set('cPrint',detailStore.data.items[0].data.cPrint);
		updateParm2.set('cSave',detailStore.data.items[0].data.cSave);
		updateParm2.set('useYn',detailStore.data.items[0].data.useYn);
		updateParm2.set('userId', MOST.config.Token.getUserId());
		
		updateParm2.save({
			success : function(record, operation) {
				updateParm2.set('workingStatus', WorkingStatus.convertInt(WorkingStatus.UPDATE));
				updateParm2.commit();
				
				detailStore.commitChanges();

				MessageUtil.saveSuccess();
				
				isDetailClose=true;
				
				if (isDetailClose) {
					var detailView = me.getDetailBizView();
					
					if (detailView) {
						me.onSearch();
						detailView.close();
					}
				}
			}
		});
	}
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});