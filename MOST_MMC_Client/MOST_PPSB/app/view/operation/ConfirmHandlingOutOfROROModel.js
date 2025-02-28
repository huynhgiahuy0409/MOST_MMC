Ext.define('MOST.view.operation.ConfirmHandlingOutOfROROModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.confirmhandlingoutofroro',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.ConfirmHandlingOutOfRORO'
	],
	
	data: {
		selectedColumn : null
	},
	
	stores: {
		roroItems: {
			model: 'MOST.model.operation.ConfirmHandlingOutOfRORO',
			storeId: 'cargoItemsStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlingoutofroro/cargolist'
			}
		},
		
		doItems: {
			model: 'MOST.model.operation.ConfirmHandlingOutOfRORO',
			storeId: 'doItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlingoutofroro/dolist'
			}
		},
		
		handlingOutUnitItems: {
			model: 'MOST.model.operation.ConfirmHandlingOutOfRORO',
			storeId: 'handlingOutUnitItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlingoutofroro/handlingOutlist'
			}
		},
		
		handlingOutComboItems: {
			model: 'MOST.model.operation.ConfirmHandlingOutOfRORO',
			storeId: 'handlingOutComboItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlingoutofroro/handlingOutComboList'
			}
		},
		
		blCombo: {
			model: 'MOST.model.operation.ConfirmHandlingOutOfRORO',
			storeId: 'blComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmhandlingoutofroro/comboList'
			}
		},
		
		unitCombo: {
			fields: ['cdNm','cd']
		},
		
		truckCombo: {
			fields: ['cdNm','cd']
		},
		
		driverWithTruckCombo: {
			fields: ['cdNm','cd']
		},
		
		driverCombo: {
			fields: ['cdNm','cd']
		},
		
		validationCheck: {
			storeId: 'validationCheck',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/validationcode/list',
				
			}
		},
	}
});