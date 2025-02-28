Ext.define('MOST.view.popup.DOPopupHHTModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.dopopuphht',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.popup.PopupService'
	],

	stores: {
		deliveryOrderPopupStore: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'deliveryOrderPopupStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/deliveryorderpopup'
			}
		},
		
		blCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'blComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
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
			
		}
	}
});