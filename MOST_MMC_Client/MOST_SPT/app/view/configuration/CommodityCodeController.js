Ext.define('MOST.view.configuration.CommodityCodeController', {
	extend: 'MOST.view.foundation.BaseViewController',
	
	requires: [
	],
		
	alias: 'controller.commoditycode',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refcommodityCodeGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'commodityCodeList',
	COMMODITY_CODE_CATEGORY_STORE: 'commodityCodeCategoryCombo',
	COMMODITY_CODE_GROUP_STORE: 'commodityCodeGroupCombo',
	COMMODITY_CODE_GROUP_CODE_STORE: 'commodityCodeGroupCdCombo',
	COMMODITY_CODE_IMDG_STORE: 'commodityCodeImdgCombo',
	DETAIL_REQUIRED_FIELDS: [],
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onLoad: function() {
		var me = this;
		var refs = me.getReferences();
		var categoryCombo = me.getStore(me.COMMODITY_CODE_CATEGORY_STORE);
		var unnoCombo = me.getStore(me.COMMODITY_CODE_IMDG_STORE);
		var groupCombo = me.getStore(me.COMMODITY_CODE_GROUP_STORE);
		var groupCdCombo = me.getStore(me.COMMODITY_CODE_GROUP_CODE_STORE)
		var searchParm = Ext.create('MOST.model.configuration.SearchCommodityCodeParm');
		
		categoryCombo.load();
		unnoCombo.load();
		groupCombo.load({
			callback: function(records, operation, success) {
				if(success){
					if(records != null && records.length > 0){
						groupCdCombo.removeAll();
						records.forEach(function (record, index){
							groupCdCombo.insert(index, record.copy());
						});
					}
				}
			}
		});
		
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
	},
	
	onDetailLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var categoryStore= me.getStore(me.COMMODITY_CODE_CATEGORY_STORE);
		var commodityGroupStore= me.getStore(me.COMMODITY_CODE_GROUP_STORE);
		var commodityGroupCodeStore= me.getStore(me.COMMODITY_CODE_GROUP_CODE_STORE);
		var UnoStore= me.getStore(me.COMMODITY_CODE_IMDG_STORE);
		
		categoryStore.load();
		commodityGroupStore.load({
			callback: function(records, operation, success) {
				if(success){
					if(records != null && records.length > 0){
						commodityGroupCodeStore.removeAll();
						records.forEach(function (record, index){
							commodityGroupCodeStore.insert(index, record.copy());
						});
					}
				}
			}
		});
		
		UnoStore.load();
		
		if(recvData){
			refs.refcmdtCd.setDisabled(true);
		}else{
			var recvData = Ext.create('MOST.model.configuration.CommodityCode');
		}
		
		me.DETAIL_REQUIRED_FIELDS = [
			'refcmdtCd', 
			'refcmdtGrpCd', 
			'refCgTp', 
			'refdescr'
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
	
	onSearch: function() {
		var me = this;
		var refs  = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();
		
		if (params == null) {
			return;
		}
		
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if(success){
				}
			}
		});
	},
	
	onAdd: function() {
		var me = this;
		var refs = me.getReferences();
		
		me.openDetailPopup();
	},
	
	onRemove: function() {
		var me = this;
		var grid = me.lookupReference('refcommodityCodeGrid');
		var store = me.getStore(me.MAIN_STORE_NAME); 
		
		me.gridRemoveRow(grid, store, me.removeComplete);
	},
	
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference('refcommodityCodeGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if (selection == null) return;
		
		me.openDetailPopup(selection);
	},
	
	onChangeUnno: function(field, newValue) {
		var me = this;
		var refs = me.getReferences();
		var unnoCheck = me.getStore(me.COMMODITY_CODE_IMDG_STORE);
		var index = unnoCheck.find('unno', newValue);
		
		if(index != -1) {
			refs.refImdg.setValue(unnoCheck.getAt(index).get('classes'));
		}else {
			refs.refImdg.setValue(null);
		}
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
		var detailItem = me.getViewModel().get('theDetail');
		var detailView = me.getDetailBizView();
		var isCreated = detailItem.phantom;
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		detailItem.set('userId',MOST.config.Token.getUserId())
		
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
	},
	
	removeComplete : function(me){
		MessageUtil.saveSuccess(); // Success Message
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});