Ext.define('MOST.view.popup.HsCodePopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',
	
	alias: 'viewmodel.hscodepopup',
	
	requires: [ 'Ext.data.proxy.Rest'],
	
	stores: 
	{
		hsCodePopup: 
		{
			model: 'MOST.model.popup.PopupService',
			storeId: 'hsCodePopup',
			proxy: 
			{
				type: 'rest',
				showProgressBar: false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/hscode/hscodepopuplist'
			}
		},
	}
});
