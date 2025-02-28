Ext.define('MOST.view.administrator.ParameterSettingModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.parametersetting',

	requires: [],

	stores: {
		
		parametersettinglist: {
			model: 'MOST.model.administrator.ParameterSetting',
			storeId: 'parametersettinglistStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl()  + '/v1/paramettersetting/searchItems'
			}
		},
		
		
		parametercheckCombo : {},
	}
});