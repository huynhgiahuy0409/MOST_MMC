Ext.define('MOST.view.popup.WorkingAreaOfForkliftDriverPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [],

	alias: 'controller.workingareaofforkliftdriverpopup',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	
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
		
		me.onSearch();
	},
	
	// Initialize Control
	onRefresh:function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		
		refs.ctlVesselName.setValue("");
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
    	var store = me.getStore('deployWorkAreaList')
		//var params = me.getSearchCondition();
		var forkliftDeployedList =Array.from( me.getView().recvData.forkliftDeployedList.items);
		if(forkliftDeployedList.length > 0)
		{
			store.setData(forkliftDeployedList)
			refs.refGridWorkingAreaFLDriver.bindStore(store);
		}
    	// if(params == null){
    	// 	return;
    	// }
    	
		// store.load({
		// 	params: params,
		// 	callback: function(records, operation, success) {
		// 		if (success) {
		// 			// SUCCES
		// 		}
		// 	}
		// });
	},
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		if(targetControl === 'tfFindWorkingAreaFL'){ // JPVC POPUP
			if(returnValue){
				refs.tfFindWorkingAreaFL.setValue(returnValue.code);
			} 
		}
	},
	onClickBtnFind: function(field, button, e){
		var me = this;
		me.openCodePopup('popup-workingareamultipopup', 'tfFindWorkingAreaFL');
	},
	onUpdateWorkloc: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refGridWorkingAreaFLDriver;
		var selection = grid.getSelection()&& grid.getSelection()[0];
		if (!selection) {
			MessageUtil.warning('warning_msg', 'Please select a record to update');
			return false;
		}
		var workLoc = refs.tfFindWorkingAreaFL.getValue();
		if(!workLoc)
		{
			MessageUtil.warning('warning_msg', 'Please select Working Area to update');
			return;
		}
		//var store = grid.getStore();
		selection.set('workLoc', workLoc);
		selection.set('workYmd', me.getView().recvData.workYmd);
		selection.set('whUpdYn','Y');
		selection.set('workingStatus','U');
		selection.set("userId", MOST.config.Token.getUserId());
		selection.set('purpTpCd',me.getView().recvData.purpTpCd);
		selection.set('shftId',me.getView().recvData.shftId);
		grid.getView().refresh();
	},
	onSave: function(){
		var me = this;
		var refs = me.getReferences();

		var staffAndEquipmentDetailStore = me.getStore('staffAndEquipmentDetail');
		var forkliftDeployedListStore = me.getStore('deployWorkAreaList');
		var forkliftArray = new Array();
		var detailItem = Ext.create('MOST.model.planning.StaffAndDeployment');
		forkliftDeployedListStore.getModifiedRecords().forEach(function(record, index, array){
			forkliftArray.push(record.data);
		})
		if(forkliftArray.length >0){
			var proxy = detailItem.getProxy();
			proxy.url = staffAndEquipmentDetailStore.getProxy().url
			var headers = {
				Accept:'application/json'
			}
			
			proxy.headers = headers;
			
			detailItem.set('forkliftDeployedList', forkliftArray);
			detailItem.save({
				success : function(records,success){
					if(success.success){
					//	me.viewType = 'update';
						forkliftDeployedListStore.commitChanges();					
						MessageUtil.saveSuccess();
						MessageUtil.question('Close', 'modity_save_confirm_msg', null,
							function (button) {
								if (button === 'ok') {
									var window = me.getView().up('window');
									window.returnValue = me.getReturnData();
									window.close();
								}
							}
						);
					}
				}
			});
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
		var recvData = me.getView().recvData;
     	var params = {
			purpTpCd: recvData.purpTpCd,
			workYmd: recvData.workYmd,
			vslCallId: recvData.vslCallId,
			shftId: recvData.shftId,
			eqTpCd: 'FL'

		}
    	return params;
	},
	
	// Returns the popup result.
	getReturnData:function(){
		var me = this;
		var store = me.getStore('deployWorkAreaList')
		var data = store.getData();
		var returnItem = {
			data: data
		}
		return returnItem;
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
});