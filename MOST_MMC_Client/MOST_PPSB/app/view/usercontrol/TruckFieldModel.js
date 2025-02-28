Ext.define('MOST.view.usercontrol.TruckFieldModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.truckfield',

	requires: [],
	
	stores: {
		assignmentTruckListPopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'assignmentTruckListPopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/assignmenttruckpopup'
			}
		},
		
		assignmentYardTruckListPopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'assignmentYardTruckListPopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/assignmentyardtruckpopup'
			}
		},
		
		gateInTruckListPopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'gateInTruckListPopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/gateintruckpopup'
			}
		},
		
		apronYardTruckListPopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'apronYardTruckListPopup',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/apronyardtruckpopup'
			}
		}
	}
});