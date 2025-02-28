Ext.define('MOST.view.popup.LorryListPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.lorrylistpopup',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.popup.LorrysPopup',
		'MOST.model.popup.YardTruckPopup'
	],
	
	stores: {
		/*lorryListPopupStoreDataSet: {
			model: 'MOST.model.popup.LorrysPopup',
			storeId: 'lorryListPopupStoreDataSetId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/assignmentlorryspopup'
			}
		},*/
		
		lorryListPopup: {
			model: 'MOST.model.popup.LorrysPopup',
			storeId: 'lorryListPopupStore'
		},
		
		lorryAssinedListPopup: {//Assigned Lorry List
			model: 'MOST.model.popup.LorrysPopup',
			storeId: 'lorryListPopupStoreDataSetId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/assignedlorrylistpopup'
			}
		},

		lorryGateInListPopup: {//GateIn not Gate Out
			model: 'MOST.model.popup.LorrysPopup',
			storeId: 'lorryGateInListPopupId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/lorrygateinlistpopup'
			}
		},
		
		blslCombineItemsComboPopup: {
			fields: ['blNo', 'cdNm']
		},
		
		yardTruckList: {
			model: 'MOST.model.popup.YardTruckPopup',
			storeId: 'yardTruckListId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/yardtruckpopup'
			}
		},
	}
	
});