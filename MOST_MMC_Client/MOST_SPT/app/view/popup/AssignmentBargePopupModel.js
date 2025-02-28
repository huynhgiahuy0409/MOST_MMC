Ext.define('MOST.view.popup.AssignmentBargePopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.assignmentbargepopup',

	requires: [],
	
	stores: {
		assignmentBargeListPopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'assignmentBargeListPopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/bargenolist'
			}
		}
	}
});