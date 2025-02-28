Ext.define('MOST.view.usercontrol.EqFieldController', {
    extend: 'MOST.view.foundation.usercontrol.PopupFieldViewController',
    
    requires: [ 
    ],
    
    alias: 'controller.eqfield',
    
    /**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
    
    openCodePopup: function() {
        let me = this;
        let popupAlias = null;
        
        if(me.getView().params == null){
			me.getView().params = {};
		}
        
        me.getView().params['vslCallId'] = me.getView().getVslCallId();
		me.getView().params['shipgNoteNo'] = me.getView().getShipgNoteNo();
		me.getView().params['blNo'] = me.getView().getBlNo();
		me.getView().params['eqCd'] = me.getView().getEqCd();
		
		popupAlias = "popup-eqfieldpopup";
		
		if(popupAlias){
			let parent = me.getParent(me.getView());
			
			if(me.getView().parent){
				parent = me.getView().parent;
			}
			
			ViewUtil.openCodePopup(parent.getController(), popupAlias, me.getView().reference, me.getView().params, me.afterSetCodePopupData, me);
		}
    }
});