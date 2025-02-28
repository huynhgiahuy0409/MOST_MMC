Ext.define('MOST.view.popup.DelayCodePopupHHTModel', {
	extend: 'MOST.view.foundation.BaseViewModel',	
    alias: 'viewmodel.delaycodepopuphht',
    
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
