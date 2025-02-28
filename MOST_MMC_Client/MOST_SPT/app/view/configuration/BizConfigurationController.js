Ext.define('MOST.view.configuration.BizConfigurationController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],
	
	alias: 'controller.bizConfiguration',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refBizConfigurationGrid',
	MAIN_STORE_NAME: 'bizConfigurationItems',
	YES_NO_VALUE_STORE: 'yesNoValue',
	DUPLICATE_CHECK_STORE: 'duplicateCheck',
	DETAIL_REQUIRED_FIELDS: [],
	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad:function(){
		var me = this;
		var refs = me.getReferences();
		
		var searchParm = Ext.create('MOST.model.configuration.SearchBizConfigurationParm');
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
	},
	
	onDetailLoad: function(){
		var me = this;
		var refs = me.getReferences();
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.YES_NO, me.YES_NO_VALUE_STORE);
		
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;

		if(recvData){
			refs.refDetailCode.setDisabled(true);
		}else{
			var recvData = Ext.create('MOST.model.configuration.BizConfiguration');
			recvData.set('useYn', 'Y');
		}
		
		me.DETAIL_REQUIRED_FIELDS = [
			'refDetailCode', 
			'refDetailDesc'
		];
		
		me.setListRequiredField(me.DETAIL_REQUIRED_FIELDS, true);
		
		me.getViewModel().setData({theDetail:recvData});
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
	
	onSearch: function( combo, record, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.getSearchCondition();
		
		store.load({
			params: params,
			callback: function(records, operation, success){
				if(records.length == 0){
					Ext.Msg.alert('Warning', TSB.locale.i18n.Bundle.instance.getMsg('datanotfound_msg'));
			    }
			}
		});
	},

	onAdd: function() {
		var me = this;
		var refs = me.getReferences();
		
		me.openDetailPopup();
	},
	
	onDblClick: function() {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		me.openDetailPopup(selection);
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var refs = me.getReferences();
		var searchBizParm = me.getSearchCondition();
		searchBizParm.classID = 'com.tsb.most.biz.parm.configuration.SearchBizConfigurationParm';
		searchBizParm.serviceID = 'MOST.bizConfiguration.selectBizConfigurationItems'

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */
	
	/**
	 * GENERAL METHOD START
	 * =========================================================================================================================
	 */
	
	getSearchCondition : function() {
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		
		params['code'] = StringUtil.toUpperCase(searchParm.data.code);
        params['description'] = StringUtil.toUpperCase(searchParm.data.description);
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
		
		return params;
	},
	
	onDetailSave:function(){
		var me = this;
		var detailView = me.getDetailBizView();
		var detailItem = me.getViewModel().get('theDetail');
		
		if(detailView){
			if(me.validateDataByReference(me.DETAIL_REQUIRED_FIELDS, null) == false){
				MessageUtil.mandatoryFieldInValid();
				return;
			}
			
			me.saveProcess();
		}
	},
	
	saveProcess:function(){
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var duplicateStore = me.getStore(me.DUPLICATE_CHECK_STORE);
		var detailItem = me.getViewModel().get('theDetail');
		var detailView = me.getDetailBizView();
		var isCreated = detailItem.phantom;
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		detailItem.set('userId',MOST.config.Token.getUserId());
		
		duplicateStore.load({
			params: {
				code: detailItem.data.code
			},
			callback: function(records, operation, success){
				if(success){
					if(records.length > 0 && detailItem.crudState == 'C'){
						MessageUtil.error('warning_msg', 'duplicate_true');
						return;
				    } else {
						updateParm.getProxy().url = store.getProxy().url;
						updateParm.phantom = isCreated;
						updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
						updateParm.set('userId', MOST.config.Token.getUserId());
						updateParm.set('item', detailItem.data);
						
						updateParm.save({
							success: function(record) {
								MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
									function(button){
										if (button === 'ok') {
											store.commitChanges();
											store.reload();
											me.onSearch();
											detailView.close();
										}
								});
							}
						});
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