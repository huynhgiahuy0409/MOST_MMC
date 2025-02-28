Ext.define('MOST.view.popup.UnitListHHTPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.unitlisthhtpopup',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.ConfirmDischargingOfRORO',
		'MOST.model.operation.ConfirmHandlingOutOfRORO',
	],
	
	data: {
		selectedColumn : null
	},

	stores: {
		
		unitItems: {
			model: 'MOST.model.operation.ConfirmDischargingOfRORO',
			storeId: 'unitItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmdischargingofroro/unitlisthht'
			}
		},
		
		stackedUnitItems: {
			model: 'MOST.model.operation.ConfirmHandlingOutOfRORO',
			storeId: 'stackedUnitItemsStoreHHT',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlingoutofrororehandling/stackedunitlist'
			}
		},
		
	}
});