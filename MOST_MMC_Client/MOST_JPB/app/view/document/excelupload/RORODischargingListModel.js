Ext.define('MOST.view.document.excelupload.RORODischargingListModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

    alias: 'viewmodel.rorodischaginglist',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.document.excelupload.RORODischargingList',
		'MOST.model.foundation.dataitem.DataItem'
	],

	data: {
		validObj: {
			excelItself: true,
			msgcode: null
		}
	},
	
	stores: {
		rORODischargingList: {
			model: 'MOST.model.document.excelupload.RORODischargingList',
			storeId: 'rOROListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/exceluploadblforroro/rorodischarginglist'
			}
		},
		
		rORODischargingListDuplicateCheckBL: {
			model: 'MOST.model.document.SearchBLParm',
			storeId: 'rOROListDuplicateCheckStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/exceluploadblforroro/duplicatecheckbl'
			}
		}
	}
});
