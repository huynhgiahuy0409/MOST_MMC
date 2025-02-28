Ext.define('MOST.view.popup.YardTruckPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.yardtruckpopup',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.popup.YardTruckPopup'
	],

	stores: {
		yardTruckList: {
			model: 'MOST.model.popup.YardTruckPopup',
			storeId: 'yardTruckListId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/yardtruckpopup'
			}
		},
		
		
	}
});