Ext.define('MOST.view.popup.BLDOListPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.bldolistpopup',

	requires: [],

	stores: {
		blDOListPopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'blDoGridListStore',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/bldoforgateoperationpopup',
			},
		},  

		masterBlCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'masterBlComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_MBL_NO,
				},
			},
			listeners: {
				load: function (store, records) {
					store.insert(0, [
						{
							scdNm: 'Select',
							mfDocId: '',
						},
					]);
				},
			},
		},
	},
});
