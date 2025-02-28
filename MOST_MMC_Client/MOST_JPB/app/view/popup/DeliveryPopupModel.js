Ext.define('MOST.view.popup.DeliveryPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.deliverypopup',

	requires: [
		'Ext.data.proxy.Rest',
	],
	
	stores: {
		deliveryList: {
			storeId: 'cargoPopupStore',
			field: ['cd', 'cdNm'],
			data: [{cd: 'B', cdNm: 'Both'},
				{cd: 'D', cdNm: 'Dicrect'},
				{cd: 'I', cdNm: 'Indicrect'}]

		}

	}
});