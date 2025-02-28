Ext.define('MOST.view.foundation.usercontrol.BaseUserController', {
	extend: 'MOST.view.foundation.BaseViewController',
	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// Recusive search function
	getParent:function(view){
		var me = this;
		
		if(view.up("panel").getController()){
			return view.up("panel"); 
		} else {
			return me.getParent(view.up("panel"));
		}
	}
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
});