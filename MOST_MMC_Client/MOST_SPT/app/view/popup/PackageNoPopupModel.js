Ext.define('MOST.view.popup.PackageNpPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',
	
	alias : 'viewmodel.packagenopopup',

	requires : [ 'Ext.data.proxy.Rest'],
	
	stores: {
		packagePopup : {
			model: 'MOST.model.popup.PopupService',
			storeId : 'packagePopupStore',
			proxy : {
				type : 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/packagenolist'
			}
		}
	}
});
