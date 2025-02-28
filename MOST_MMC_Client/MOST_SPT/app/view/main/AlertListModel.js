Ext.define('MOST.view.main.AlertListModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.alertlist',

	requires: ['Ext.data.proxy.Rest', 'MOST.model.main.Alert', 'MOST.model.foundation.dataitem.DataItem'],

	stores: {
		alertList: {
			model: 'MOST.model.main.Alert',
			storeId: 'alertListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/commonCode/alertlist',
			},
		},
	},
});
