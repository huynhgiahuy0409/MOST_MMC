Ext.define('MOST.view.popup.GroupListPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',
	
    alias: 'viewmodel.grouplistpopup',
    
    requires: [],
       	
	stores: {
		groupList: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'groupList',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/group'
			}
		}
	}

});
