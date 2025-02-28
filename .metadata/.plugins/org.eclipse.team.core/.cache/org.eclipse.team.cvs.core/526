Ext.define('MOST.view.popup.GateInTruckPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.gateintruckpopup',

	requires: [],
	
	stores: {
		gateInTruckPopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'gateInTruckPopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/gateintruckpopup'
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
			        	  scd: ''
			          }]);
			     }
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
			        	  scd: ''
			          }]);
			     }
			}
		},
	}
});