Ext.define('MOST.view.popup.GoodsReceiptPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.goodsreceiptpopup',

	requires: [],
	
	stores: {
		goodsReceiptPopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'goodsReceiptPopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/goodsreceiptpopup'
			}
		},
		
		shipgNoteNoCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shipgNoteNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SN_NO
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  shipgNoteNo: ''
			          }]);
			     }
			}
		},
	}
});