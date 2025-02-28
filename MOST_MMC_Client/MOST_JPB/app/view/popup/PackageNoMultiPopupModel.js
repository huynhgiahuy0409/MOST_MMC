Ext.define('MOST.view.popup.PackageNoMultiPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.packagenomultipopup',

	requires: [],
	
	stores: {
		packageNoList: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'packageNoListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/packagenolist'
			}
		}
	}
});