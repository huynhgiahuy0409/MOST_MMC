Ext.define('MOST.view.popup.FindUnitNoPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.findunitnopopup',

	requires: [
		'Ext.data.proxy.Rest',
	],
	
	stores: {
		cargoItems: {
			model: 'MOST.model.popup.FindUnitNoPopup',
			storeId: 'cargoItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/cargoitems'
			}
		},
		unitItems: {
			model: 'MOST.model.popup.FindUnitNoPopup',
			storeId: 'unitItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofdamagecheckofroro/unititems'
			}
		}
	}
});