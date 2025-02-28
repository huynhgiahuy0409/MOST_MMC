Ext.define('MOST.view.operation.hht.ListofDischargingCheckhhtPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.listofdischargingcheckhhtpopuphht',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.ApronCheckerHHT',
		'MOST.model.operation.CargoManualCtl',
		'MOST.model.operation.ConfirmDischargingOfRORO'
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
		// ======================================================
		// Combo Start
		brandCombo: {
			model: 'MOST.model.operation.ConfirmDischargingOfRORO',
			storeId: 'brandComboStoreHHT',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/brandcomboListHHT'
			}
		},
		
		blCombo: {
			model: 'MOST.model.operation.ConfirmDischargingOfRORO',
			storeId: 'blComboStoreHHT',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				//url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmdischargingofroro/comboListHHT'
			}
		},
		
		
		// Combo End
		// ======================================================
		
	},
	
});