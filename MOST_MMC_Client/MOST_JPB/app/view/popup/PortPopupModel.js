Ext.define('MOST.view.popup.PortPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',
	
	alias : 'viewmodel.portpopup',

	requires : [ 'Ext.data.proxy.Rest'],
	
	stores: {
		portPopup : {
			model: 'MOST.model.popup.PopupService',
			fields : [ 'countryCode', 'countryName', 'portCode', 'portName'],
			storeId : 'portPopupStore',
			proxy : {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/portcodelist'
			}
		}
	}
});
