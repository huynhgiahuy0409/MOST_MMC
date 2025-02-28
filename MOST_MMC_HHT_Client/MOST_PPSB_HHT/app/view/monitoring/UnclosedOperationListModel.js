Ext.define('MOST.view.controller.UnclosedOperationListModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.unclosedoperationlist',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.controller.UnclosedOperationList'
	],
	
	formulas:{
  		
	},
	
	stores: {
		
		unclosedOperationList: {
			model: 'MOST.model.controller.UnclosedOperationList',
			storeId: 'unclosedOperationListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/unclosedoperationlist/list'
			}
		},
		JPVCPopupStore: {
			model: 'MOST.model.popup.VslCallIdPopup',
			storeId: 'JPVCPopupStoreId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/jpvcpopup'
			}
		},
		shiftCombo: {
			fields: ['shftId','shftNm'],
			storeId: 'shiftStore',
        },
	}
	
});