Ext.define('MOST.store.Popup',{
	extend: 'Ext.data.Store',
	alias: 'store.popup',
	model: 'MOST.model.popup.CommonCodePopup',
	proxy: {
		showProgressBar : false,
		type: 'rest',
		url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popupservice/popupList'
	}
});
