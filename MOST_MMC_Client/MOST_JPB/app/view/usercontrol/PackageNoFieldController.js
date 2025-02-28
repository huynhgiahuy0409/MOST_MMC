Ext.define('MOST.view.usercontrol.PackageNoFieldController', {
	extend: 'MOST.view.foundation.usercontrol.PopupFieldViewController',

	requires: [
		
	],

	alias: 'controller.packagenofield',
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	
	openCodePopup: function(){
		var me = this;
		var popupAlias = null;
		var fieldControl = me.lookupReference("ctlField");
		
		if(me.getView().params == null){
			me.getView().params = {};
		}
		
		if(me.getViewModel().get('theDetail').id.indexOf('CargoDischarging') != -1){
			if(me.getViewModel().get('theDetail').get('abCheck') == 'Y'){		
				if(me.getViewModel().get('theDetail').get('abLorryNo') == null || me.getViewModel().get('theDetail').get('abLorryNo') == ''){
					MessageUtil.warning('warning_msg', 'Please select Truck first');
					return;
				}
			}
			
			if(me.getViewModel().get('theDetail').get('vaCheck') == 'Y'){
				if(me.getViewModel().get('theDetail').get('vaLorryNo') == null || me.getViewModel().get('theDetail').get('vaLorryNo') == ''){
					MessageUtil.warning('warning_msg', 'Please select Truck first');
					return;
				}
			}
			
			if(me.getViewModel().get('theDetail').get('vgCheck') == 'Y'){
				if(me.getViewModel().get('theDetail').get('externalLorryNo') == null || me.getViewModel().get('theDetail').get('externalLorryNo') == ''){
					MessageUtil.warning('warning_msg', 'Please select Truck first');
					return;
				}
			}
     	}
		
		me.getView().params['vslCallId'] = me.getView().getVslCallId();
		me.getView().params['shipgNoteNo'] = me.getView().getShipgNoteNo();
		me.getView().params['blNo'] = me.getView().getBlNo();
		me.getView().params['ixCd'] = me.getView().getIxCd();
		me.getView().params['jobPurpCd'] = me.getView().getJobPurpCd();
		
		popupAlias = "popup-packagenomultipopup";
		
		if(popupAlias){
			var parent = me.getParent(me.getView());
			
			if(me.getView().parent){
				parent = me.getView().parent;
			}
			
			ViewUtil.openCodePopup(parent.getController(), popupAlias, me.getView().reference, me.getView().params, me.afterSetCodePopupData, me);
		}
	},
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue, me, parent){
		var fieldControl = me.lookupReference("ctlField");
		
		if(returnValue){
			fieldControl.setValue(returnValue.code);
		} else {
			fieldControl.setValue("");
		}
	}
});