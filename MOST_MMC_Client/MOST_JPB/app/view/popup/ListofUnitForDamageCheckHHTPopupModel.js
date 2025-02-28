Ext.define('MOST.view.popup.ListofUnitForDamageCheckHHTPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.listofunitfordamagecheckhhtpopup',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.TheListOfDamageCheckOfRORO',
	],
	
	data: {
		selectedColumn : null
	},

	stores: {
		unitItems: {
			model: 'MOST.model.popup.FindUnitNoPopup',
			storeId: 'unitItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/unititems'
			}
		},
		
		unitPopupItems: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'unitItemsStoreHHT',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/unititemsHHT'
			}
		},
		
		brCombo: {
			model: 'MOST.model.operation.TheListOfDamageCheckOfRORO',
			storeId: 'snComboHHTStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/branditemsHHT'
			}
		},
	}
});