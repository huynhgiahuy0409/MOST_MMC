Ext.define('MOST.view.operation.hht.ApronConfirmLoadingOfROROHHTModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.apronconfirmloadingofrorohht',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.popup.LorrysPopup',
		'MOST.model.operation.ConfirmLoadingOfRORO',
		'MOST.model.operation.ConfirmDischargingOfRORO',
		'MOST.model.operation.TheListOfDamageCheckOfRORO',
		'MOST.model.operation.DamageCheck',
	],


	stores: {
		unitItemsList: {
			model: 'MOST.model.operation.ConfirmLoadingOfRORO',
			storeId: 'unitItemsListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/confirmloadingofroro/unititemsHHT'
			}
		},
		
		validationCheck: {
			storeId: 'validationCheck',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/validationcode/list',
				
			}
		},
		
		roroDamageCheckDetail: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'roroDamageCheckDetailStoreHHT1',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/rorodamagecheckdetail'
			}
		},
		
		damageStore: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'roroDamageCheckDetailStoreHHT2',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/rorodamagecheckdetail'
			}
		},
		damageCheckStore: {
			model: 'MOST.model.operation.DamageCheck',
			storeId: 'damageCheckStoreHHT',
		},
		// Combo Start
		// ======================================================
		// D.Mode
		commonComboItems: {
			model: 'MOST.model.operation.ConfirmDischargingOfRORO',
			storeId: 'commonComboItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/commonComboListHHT'
			}
		},
		
		dmodeCombo : {
			fields: ['scdNm','scd'],
			data :  [{"scd":"", "scdNm":"Select"},
					{"scd":"D", "scdNm":"Direct"},
					{"scd":"I", "scdNm":"Indirect"}
	        ]
		},
		// Combo End
		// ======================================================

	}
});