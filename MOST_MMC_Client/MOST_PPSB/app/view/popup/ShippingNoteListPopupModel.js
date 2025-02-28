Ext.define('MOST.view.popup.ShippingNoteListPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.shippingnotelistpopup',

	requires: [],

	stores: {
		shippingNoteListPopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'shippingNoteGridListStore',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/shippingnoteforgateoperationpopup',
			},
		},

		bookingNoCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'cargoManualCtlForBookingNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BOOKING_NO,
					tyCd: 'GC'
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  mfDocId: ''
			          }]);
			     }
			}
		},
	},
});
