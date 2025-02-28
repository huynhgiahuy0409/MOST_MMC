Ext.define('MOST.view.popup.AssignmentYardTruckPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.assignmentyardtruckpopup',

	requires: [],
	
	stores: {
		assignmentYardTruckListPopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'assignmentYardTruckListPopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/assignmentyardtruckpopup'
			}
		}
	}
});