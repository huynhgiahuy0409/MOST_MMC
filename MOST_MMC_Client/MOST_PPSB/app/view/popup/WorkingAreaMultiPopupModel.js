Ext.define('MOST.view.popup.WorkingAreaMultiPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.workingareamultipopup',

	requires: [
	],
	
	stores: {
		commonCodeList: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'commonCodeListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/cmmcdpopupmultiselect'
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
		
		workingAreaMultiList: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'workingAreaMultiListStore'
		}
	}
});