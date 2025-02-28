Ext.define('MOST.view.popup.DelayCodePopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',
	
    alias: 'viewmodel.delaycodepopup',
    
    requires: [
       	],
       	
	stores: {
		delayCodePopup: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'delayCodePopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/selectDelayCodePopup'
			}
		},

		tpCombo : {
			fields: ['tpCd','tpNm'],
			storeId: 'tpComboStore',
			data :  [
						{"tpCd":"CD", "tpNm":"Code"},
						{"tpCd":"NM", "tpNm":"Name"}
					]
		},
	}

});
