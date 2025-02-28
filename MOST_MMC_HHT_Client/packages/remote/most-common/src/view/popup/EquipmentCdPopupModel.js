Ext.define('MOST.view.popup.EquipmentCdPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.equipmentcdpopup',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.popup.EquipmentCommonPopup'
	],

	stores: {
		equipmentListPopup: {
			model: 'MOST.model.popup.EquipmentCommonPopup',
			storeId: 'equipmentListPopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/equipmentlistpopup'
			}
		},
		
		equipmentListPopupSearchCombo: {
			fields: ['comName','comCode'],
			storeId: 'equipmentListPopupSearchComboId',
			data :  [
				{"comName": "Code",	"comCode": "CODE"},
				{"comName": "Description",	"comCode": "DESC"}
			]
		}
	}
});