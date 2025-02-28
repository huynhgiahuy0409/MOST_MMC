Ext.define('MOST.view.popup.DOAmountIdentificationPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.doamountidentificationpopup',	
	searchType: '',
	
	onSave: function() {
		var me = this;
		var saveStore = me.getStore('updateDoWgtStore');
		var detailItem = me.getViewModel().get('theBL');
		var infoForm = me.getView().down('form').getForm();
		
		if(infoForm.isValid()){
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			
			updateParm.getProxy().url = saveStore.getProxy().url;
			updateParm.phantom = false;
			updateParm.set('workingStatus', WorkingStatus.UPDATE);
			updateParm.set('item', detailItem.data);
			updateParm.save({
				callback: function(record, operation, success) {
					if(success){
						var window = me.getView().up('window');
						me.getParentView().getViewModel().storeInfo.bllist.proxy.showProgressBar = false;
						me.getParentView().getController().onSearch();
						window.close();
						MessageUtil.show(Ext.Msg.INFO, 'success_msg', 'savesuccess_msg', '', function(button){
							if (button === 'ok') {
								var win = Ext.WindowManager.getActive();
								if (win) {
									win.suspendEvents();
									win.close();
									win.resumeEvents();
								}
							}
						});
					}
				}
			});
		} else {
			MessageUtil.mandatoryFieldInValid();
			return null;
		}
	},
});