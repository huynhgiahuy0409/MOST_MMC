Ext.define('MOST.view.popup.CargoTypePopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.cargotypepopup',

	requires: [
	],
	
	stores: {
		cargoList: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'cargoPopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/codeMaster'
			}

		}
	}
});