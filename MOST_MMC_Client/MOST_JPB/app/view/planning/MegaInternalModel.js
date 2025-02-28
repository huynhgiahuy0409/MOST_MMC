Ext.define('MOST.view.planning.MegaInternalModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.megainternal',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.planning.Mega'
	],
	data: {
		selectedForkLift: null,
		selectedMechanical: null
	},	
	stores: {
		megaInternal: {
			model: 'MOST.model.planning.Mega',
			storeId: 'megaInternalStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/mega/internalList'
			}
		},
		
		megaInternalMechanical: {
			model: 'MOST.model.planning.Mega',
			storeId: 'megaInternalMechanicalStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/mega/internalList'
			}
		},
		
		megaInternalCombo: {
			model: 'MOST.model.planning.Mega',
			storeId: 'megaInternalComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/mega/internalList'
			}
		},
		
		megaInternalShiftCombo: {
			fields: ['shftNm','shftId']
		},
		
		megaInternalPurposeCombo: {
			fields: ['scdNm','scd']
		},
		
		megaInternalWarehouseCombo: {
			fields: ['locNm','locId']
		}
		
	}
});