Ext.define('MOST.view.planning.VesselBaplieForGCModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.vesselbaplieforgc',

	requires: [
		'Ext.data.proxy.Rest',
	],
	
	stores: {
		vesselBaplieStore: {
			model: 'MOST.model.planning.SearchVesselBaplieForGCParm',
			storeId: 'VesselBaplieStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselbaplie/searchVesselBaplieItems'
			}
		},
	}
});