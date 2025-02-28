Ext.define('MOST.view.popup.SubDeliveryOrderPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.subdeliveryorderpopup',

	requires: [],
	
	stores: {
		subDeliveryOrderPopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'subDeliveryOrderPopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/subdeliveryorderpopup'
			}
		},
		
		blNoCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'blNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BL_NO
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  blNo: ''
			          }]);
			     }
			}
		},
	}
});