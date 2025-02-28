Ext.define('MOST.view.operation.hht.DimensionCheckModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.dimensioncheckofhht',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.DimensionCheck'
	],

	stores: {
		theDimensionStore:{
			model: 'MOST.model.operation.DimensionCheck',
			storeId: 'theDimensionStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/damageDimensionCheck/listDimension'
			}
		},
		
		snBlCombo: {
			model: 'MOST.model.operation.DimensionCheck',	
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/damageDimensionCheck/blSnNo'
			}
		},
		
		doGrCombo: {
			model: 'MOST.model.operation.DimensionCheck',	
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/damageDimensionCheck/doGrNo'
			}
		},
		
	}
});