Ext.define('MOST.view.popup.VesselCallIdListPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.vesselCallIdListPopup',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.popup.VesselCallList'
	],

	stores: {
		VesselCallIdPopupStore: {
			model: 'MOST.model.popup.VesselCallList',
			storeId: 'JPVCPopupStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/jpvcpopup'
			}
		},
		
		blCdStoreCombo: {
			model: 'MOST.model.popup.VesselCallList',
			storeId: 'blCdStoreComboId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/deliveryorderpopup',
				
			}
		},
		
		roleCombo: {
			fields: ['scdNm','scd'],
			storeId: 'roleComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/rolecombo',
				extraParams: {
					comboType: 'ROLECD'
		        }
			}
		},
		
		empPopupHHTList: {
			model: 'MOST.model.operation.VSRCheckList',
			storeId: 'vsrCheckListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vsrchecklist/emppopuphhtlist'
			}
		},
	}
});