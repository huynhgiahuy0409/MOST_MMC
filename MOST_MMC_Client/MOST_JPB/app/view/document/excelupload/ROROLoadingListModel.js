Ext.define('MOST.view.document.excelupload.ROROLoadingListModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

    alias: 'viewmodel.roroloadinglist',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.document.excelupload.ROROLoadingList',
		'MOST.model.foundation.dataitem.DataItem'
	],
	
	data: {
		validObj: {
			excelItself: true,
			msgcode: null
		}
	},
	
	stores: {
		rOROloadinglist: {
			model: 'MOST.model.document.excelupload.ROROLoadingList',
			storeId: 'rOROListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/exceluploadforroro/roroloadinglist'
			}
		},
		
		rOROLoadingListDuplicateCheck: {
			model: 'MOST.model.document.excelupload.ROROLoadingList',
			storeId: 'rOROListDuplicateCheckStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/exceluploadforroro/roroLoadingListDuplicateCheck'
			}
		}
	}
});
