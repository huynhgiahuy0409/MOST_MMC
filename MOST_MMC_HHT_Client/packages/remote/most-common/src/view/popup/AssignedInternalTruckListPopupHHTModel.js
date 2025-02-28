Ext.define('MOST.view.popup.AssignedInternalTruckListPopupHHTModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.assignedinternaltrucklistpopuphht',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.popup.PopupService'
	],
	
	stores: {

		assignedInternalTruckListPopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'assignedInternalTruckListPopup',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/assignmentyardtruckpopup'
			}
		}
	}
	
});