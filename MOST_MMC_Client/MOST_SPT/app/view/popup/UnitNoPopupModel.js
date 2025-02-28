Ext.define('MOST.view.popup.UnitNoPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.unitnopopup',

	requires: [
		'Ext.data.proxy.Rest',
	],
	
	stores: {
		unitNoList: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'unitNoListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/unitno'
			}
		}
	}
});