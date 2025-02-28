Ext.define('MOST.view.administrator.ListOfFreshWaterModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.listoffws',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.administrator.ListOfFreshWater'
	],

	stores: {
		fwsList: {
			model: 'MOST.model.administrator.ListOfFreshWater',
			storeId: 'fwsListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/fws/fwslist'
			}
		},
		
		fwsNonJpvcList: {
			model: 'MOST.model.administrator.ListOfFreshWater',
			storeId: 'fwsNonJpvcListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/fws/fwslist'
			}
		},
		
		searchVesselCallDetail: {
			model: 'MOST.model.common.SearchVesselCall',
			storeId: 'searchVesselCallDetailStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/fws/selectSearchVesselCallId'
			}
		},
	}
});