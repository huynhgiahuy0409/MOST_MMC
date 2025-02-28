Ext.define('MOST.view.codes.HSCodeModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.hscode',

	requires: [
		'Ext.data.proxy.Rest'
	],

	stores: {
		
		hsCodelist: {
			model: 'MOST.model.codes.HSCode',
			storeId: 'hsCodeListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/hscode/list'
			}
		},
		
		duplicateCheck:
		{
			model: 'MOST.model.codes.HSCode',
			storeId: 'duplicateCheckStore',
			proxy:
			{
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/hscode/duplicationHSCodeCheck'
			}
		},
		
		yesNoValue: {},
		
	}
});