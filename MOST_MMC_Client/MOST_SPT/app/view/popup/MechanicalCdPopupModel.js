Ext.define('MOST.view.popup.MechanicalCdPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.mechanicalcdpopup',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.popup.EquipmentCommonPopup'
	],

	stores: {
		
//		mechanicalEquipmentComboStore: {
//			fields: ['scdNm', 'scd'],
//			storeId: 'mechanicalEquipmentComboStoreId',
//			proxy: {
//				type: 'rest',
//				showProgressBar : false,
//				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/commonCode/codeMasterList'
//			},
//			listeners: 
//			{
//				load: function(store, records) {
//					store.insert(0, [{
//						scdNm: 'Select Type',
//						scd: ''
//					}]);
//				}
//			}
//		},
		
		
		 mechanicalEquipmentComboStore : {
		 	fields: ['scdNm','scd'],
		 	storeId: 'mechanicalEquipmentComboStoreId',
		 	data :  [
		 		{"scd":"", "scdNm":"Select Type"},
		 		{"scd":"CC", "scdNm":"CEREAL CONVEYOR"},
		 		{"scd":"CH", "scdNm":"CHASSIS"},
		 		{"scd":"CU", "scdNm":"CONTINUOUS UNLOADER"},
		 		{"scd":"EV", "scdNm":"EXCAVATOR"},
		 		{"scd":"GS", "scdNm":"GENSET"},
		 		{"scd":"LL", "scdNm":"LEVEL LUFFING"},
		 		{"scd":"MC", "scdNm":"PORTABLE MOBILE CONVEYOR"},
		 		{"scd":"PC", "scdNm":"PIPE CONVEYOR"},
		 		{"scd":"RC", "scdNm":"FERTILIZER CONVEYOR"},
		 		{"scd":"RL", "scdNm":"RETRACTABLE LORRY"},
		 		{"scd":"SH", "scdNm":"SHOVEL"},
		 		{"scd":"SL", "scdNm":"SKYLIFT"},
		 		{"scd":"TX", "scdNm":"T_REX"},
		 		{"scd":"WP", "scdNm":"WATER PUMP"},
		 		{"scd":"YT", "scdNm":"TRUCK"},
		 	]
		 },
		
		
		mechanicalEquipmentListPopup: {
			model: 'MOST.model.popup.EquipmentCommonPopup',
			storeId: 'mechanicalEquipmentListPopupStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/mechanicalequipmentlistpopup'
			}
		},
		mechanicalEquipmentListGear: {
			model: 'MOST.model.popup.EquipmentCommonPopup',
			storeId: 'mechanicalEquipmentListGearStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/mechanicalequipmentlistgear'
			}
		},
		
		MechanicalEquipmentListPopupSearchCombo: {
			fields: ['comName','comCode'],
			storeId: 'MechanicalEquipmentListPopupSearchCombo',
			data :  [
				{"comName": "Description",	"comCode": "DESC"}
			]
		}
	}
});