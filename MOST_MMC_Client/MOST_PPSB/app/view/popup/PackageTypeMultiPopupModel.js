Ext.define('MOST.view.popup.PackageTypeMultiPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.packagetypemultipopup',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.popup.CMMCdPopup'
	],
	
	stores: {
		commonCodeList: {
			model: 'MOST.model.popup.CMMCdPopup',
			storeId: 'commonCodeListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/packagetypelist'
			},
			listeners: 
			{
				load: function(store, records) {
					store.insert(0, [{
						scdNm: 'Select Data',
						scd: ''
					}]);
				}
			}
		},
		
		packageTypeMultiList: {
			model: 'MOST.model.popup.PackageTypeMultiPopup',
			storeId: 'packageTypeMultiListStore'
		}
	}
});