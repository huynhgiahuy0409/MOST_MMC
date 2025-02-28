Ext.define('MOST.view.codes.CapacityCodeController', {
	extend: 'MOST.view.foundation.BaseViewController',
	
	requires: [
	],
	
	alias: 'controller.capacitycode',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	
    MAIN_GRID_REF_NAME: 'refcapacityCodeGrid',
    MAIN_STORE_NAME: 'capacityCodeList',
    EQUIPMENT_COMBO_GRID_STORE_NAME: 'capacityCodeEquipmentTypeGridCombo',
    EQUIPMENT_COMBO_STORE_NAME: 'capacityCodeEquipmentTypeCombo',
	DETAIL_REQUIRED_FIELDS: [],
    
	/**
	 * =========================================================================================================================
	 * CONSTANT END
	 */
	
    /**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onLoad: function() {
		var me = this
		var refs = me.getReferences();
		var equipmentTypeCombo = me.getStore(me.EQUIPMENT_COMBO_STORE_NAME);
		var equipmentTypeGridCombo = me.getStore(me.EQUIPMENT_COMBO_GRID_STORE_NAME);
		var searchParm = Ext.create('MOST.model.codes.SearchCapacityCodeParm');
		
		equipmentTypeCombo.load();
		equipmentTypeGridCombo.load();

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
	
	onDetailLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var equipmentStore= me.getStore(me.EQUIPMENT_COMBO_GRID_STORE_NAME);
		
		equipmentStore.load();
		
		if(recvData){
			refs.refCapaCd.setDisabled(true);
		}else{
			var recvData = Ext.create('MOST.model.codes.CapacityCode');
		}
		
		me.DETAIL_REQUIRED_FIELDS = [
			'refEqTpCd', 
			'refCapaCd', 
			'refCapaDescr'
		];
		
		me.setListRequiredField(me.DETAIL_REQUIRED_FIELDS, true);
		me.getViewModel().setData({theDetail:recvData});
		me.updateViewStyle(me.getDetailBizView());
	},
	
	onSearch: function() {
		var me = this;
		var refs = me.getReferences();
		var allStore = me.getStore(me.MAIN_STORE_NAME);
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

	onAdd: function() {
		var me = this;
		var refs = me.getReferences();
		
		me.openDetailPopup();
	},
	
	onRemove: function() {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		
		me.gridRemoveRow(grid, store, function(){
			MessageUtil.saveSuccess();
		});
	},
	
	onDblClick: function() {
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if (selection == null) return;
		
		me.openDetailPopup(selection);
	},
	
	setGridColumnEditable: function(isCreate) {
		var me = this;
		var refs = me.getReferences();
		
		if(isCreate) { //ADD
			refs.refCapaCd.getEditor().setEditable(true);
			refs.refCapaCd.getEditor().setDisabled(false);
		}else {		//UPDATE
			refs.refCapaCd.getEditor().setEditable(false);
			refs.refCapaCd.getEditor().setDisabled(true);
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
	// Search Condition
	getSearchCondition: function() {
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
		var eqTpCd = refs.ctlEqTpCd.getValue();
		
		params['capaCd'] = StringUtil.toUpperCase(searchParm.data.capaCd);
		params['searchTp'] = 'CAPA_LIST';
		params['eqTpCd'] = eqTpCd;
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
		
		detailItem.set('userId', MOST.config.Token.getUserId());
		
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
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});