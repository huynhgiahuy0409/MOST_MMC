Ext.define('MOST.view.popup.CountryCodePopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',
	
    alias: 'viewmodel.countrypopup',
    
    requires: [
       		'Ext.data.proxy.Rest'
    ],
       	
	stores: {
		countrylist: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'countrylist',
			autoLoad: false,
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/countrylist'
			}
		}
	}

});
