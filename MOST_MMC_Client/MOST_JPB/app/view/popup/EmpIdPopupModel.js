Ext.define('MOST.view.popup.EmpIdPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.empidpopup',

	requires: [
		'MOST.model.popup.PopupService'
	],

	stores: {
		empIdPopupDataSet: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'empIdPopupDataSetStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/checklistvsrpopup'
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
		
		empIdList: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'empIdListStore'
		},
		
		empIdCombo: {
			fields: ['scdNm','scd'],
			storeId: 'empIdComboStore'
		}
	}
});