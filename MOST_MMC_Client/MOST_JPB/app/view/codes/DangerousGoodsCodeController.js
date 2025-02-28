Ext.define('MOST.view.codes.DangerousGoodsCodeController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.dangerousgoodscode',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refDangerousGoodsCodeGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'dangerousGoodsCode',	
	DETAIL_REQUIRED_FIELDS: [],
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onLoad:function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.codes.SearchDangerousGoodsCodeParm');
		
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
	},
	
	onDetailLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		
		if(recvData){
			refs.refColUnno.setDisabled(true);
			refs.refColClass.setDisabled(true);
			refs.refColSubstance.setDisabled(true);
		}else{
			var recvData = Ext.create('MOST.model.codes.DangerousGoodsCode');
		}
		
		me.DETAIL_REQUIRED_FIELDS = [
			'refColUnno', 
			'refColClass', 
			'refColSubstance'
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
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();
		
		if (params == null) {
			return;
		}
		
		store.load({
			params : params,
			callback: function(records, operation, success) {
				if (records.length <= 0) {
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

	onRemove: function() {
		var me = this;
		var refs = me.getReferences();
		var selection = refs.refDangerousGoodsCodeGrid.getSelection() == null ? null : refs.refDangerousGoodsCodeGrid.getSelection()[0];
		var store = me.getStore(me.MAIN_STORE_NAME);
		var temp;
		
		if(selection == null || selection == undefined){
			return;
		}
		
		Ext.Msg.show({
			title:	 MOST.getApplication().bundle.getMsg('remove'),
			message: MOST.getApplication().bundle.getMsg('removeyn_msg'),
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			fn: function(btn) {
				if (btn === 'yes') {
					store.remove(selection);
					store.sync({
						success: function(){
							store.reload({
								callback: function(records, operation, success) {
									if(success){
										var success = MOST.getApplication().bundle.getMsg('success_msg');
										var msg = MOST.getApplication().bundle.getMsg('savesuccess_msg');
										Ext.Msg.alert(success, msg);
									}
								}
							});
						}
					})
				}
			}
		});
		
		storecodeInUseCheck.load({
			params: {
				lcd: selection.data.lcd
			},
			
			callback: function(records, operation, success){
				if(records.length != 0) {
					Ext.Msg.alert('Warning', TSB.locale.i18n.Bundle.instance.getMsg('datainuse_msg'));
					record.set('check',null);
				}else{
					
				}
			}
		});
	},
	
	onDblClick : function() {
		var me = this;
		var refs = me.getReferences();
		var selection = refs.refDangerousGoodsCodeGrid.getSelection() == null ? null : refs.refDangerousGoodsCodeGrid.getSelection()[0];
		
		if(selection == null) return;
		
		me.openDetailPopup(selection);
	},
	
	onExportExcelPdfWithServer: function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.codes.SearchDangerousGoodsCodeParm';
		searchBizParm.serviceID = 'MOST.dangerousGoodsCode.selectDangerousGoodsCode'

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
		
		if(searchParm.data.unno == ''){
			MessageUtil.error('warning_msg','dangerousgoodscode_unno_empty_msg');
			return;
		}
		
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

		detailItem.set('userId',MOST.config.Token.getUserId());
		
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
							me.onSearch();
							detailItem.modified = null;
							var win = Ext.WindowManager.getActive();
							if (win) {
							    win.close();
							}
							detailView.close();
						}else{
							me.onSearch();
							detailItem.modified = null;
							
							var win = Ext.WindowManager.getActive();
							
							if (win) {
							    win.close();
							}
							
							detailView.close();
						}
					}
				);
			}
		});
	}
	
    /**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});