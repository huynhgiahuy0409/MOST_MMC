Ext.define('MOST.view.codes.DangerousGoodsCodeModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

    alias: 'viewmodel.dangerousgoodscode',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.foundation.dataitem.DataItem'
	],
	
	stores: {
		dangerousGoodsCode: {
			model: 'MOST.model.codes.DangerousGoodsCode',
			storeId: 'dangerousGoodsCodeStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/dangerousgoodscode/dangerousgoodscode'
			}
		}
	}
});
