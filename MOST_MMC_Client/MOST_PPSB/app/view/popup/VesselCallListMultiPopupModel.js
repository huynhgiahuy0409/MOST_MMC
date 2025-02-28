Ext.define('MOST.view.popup.VesselCallListMultiPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.vesselcalllistmultipopup',

	requires: [
	],

	stores: {
		vesselCallListPopupStore: {
			model: 'MOST.model.popup.VesselCallList',
			storeId: 'vslCallIdListPopupStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/vesselcalllistpopup'
			}
		},
		
	}
});