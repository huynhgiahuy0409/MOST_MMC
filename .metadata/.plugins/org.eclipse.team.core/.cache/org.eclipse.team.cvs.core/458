Ext.define('MOST.view.operation.hht.YardListOfHandlingInOfROROHHTModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.yardlistofhandlinginofrorohht',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.ConfirmHandlingInOfRORO',
		'MOST.model.foundation.dataitem.DataItem'
	],

	stores: {
		gateInItems: {
			model: 'MOST.model.operation.ConfirmHandlingInOfRORO',
			storeId: 'gateInItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlinginofroro/gateinlist'
			}
		},
		
		handlingInItems: {
			model: 'MOST.model.operation.ConfirmHandlingInOfRORO',
			storeId: 'handlingInItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlinginofroro/handlinginlist'
			}
		},
	}
});