Ext.define('MOST.view.popup.InGateTruckListPopupHHTModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.ingatetrucklistpopuphht',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.popup.PopupService'
	],
	
	stores: {

		lorryGateInListPopup: {//GateIn not Gate Out
			model: 'MOST.model.popup.PopupService',
			storeId: 'lorryGateInListPopup',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/gateintruckpopup'
			},
			// data: [
			// 	{
			// 		lorryNo: 'AVC'
			// 	}
			// ]
		}
	}
	
});