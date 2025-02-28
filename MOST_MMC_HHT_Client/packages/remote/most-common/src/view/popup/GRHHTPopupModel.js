Ext.define('MOST.view.popup.GRHHTPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.grhhtpopup',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.popup.PopupService'
	],

	stores: {
		grPopupList: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'GrPopupListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/goodsreceiptpopup'
			}
		},
		
		snCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'snComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
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
		
		snHideCombo: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'snComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/snhidecombo'
			}
		},
		
		grInGateList: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'grInGateListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gatetransaction/gringatelist'
			}
		},
	}
});