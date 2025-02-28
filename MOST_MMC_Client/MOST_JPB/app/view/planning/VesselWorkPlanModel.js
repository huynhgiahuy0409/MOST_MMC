Ext.define('MOST.view.planning.VesselWorkPlanModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.vesselworkplan',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.planning.VesselWorkPlan',
	],
	
	stores: {
		vesselWorkPlanStore: {
			model: 'MOST.model.planning.VesselWorkPlan',
			storeId: 'vesselWorkPlanStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselworkplan/list'
			}
		},
		
		hatchNoCombo : {
			fields: ['scdNm','scd'],
			storeId: 'hatchNoComboStore'
		},
		
		deckLocCombo : {
			fields: ['scdNm','scd'],
			storeId: 'deckLocComboStore',
			data :  [
				{"scdNm": "Deck", "scd": "1"},
				{"scdNm": "Hold", "scd": "2"}
            ]
		},
	}
});