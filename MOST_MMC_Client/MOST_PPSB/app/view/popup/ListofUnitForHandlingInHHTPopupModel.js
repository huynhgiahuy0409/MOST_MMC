Ext.define('MOST.view.popup.ListofUnitForHandlingInHHTPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.listofunitforhandlinginhhtpopup',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.ConfirmHandlingInOfRORO',
		'MOST.model.foundation.dataitem.DataItem'
	],
	
	data: {
		selectedColumn : null
	},

	stores: {
		gateInItems: {
			model: 'MOST.model.operation.ConfirmHandlingInOfRORO',
			storeId: 'gateInItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlinginofroro/gateinlistHHT'
			}
		},
	}
});