Ext.define('MOST.view.document.excelupload.GeneralCargoLoadingListModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

    alias: 'viewmodel.generalcargoloadinglist',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.document.excelupload.GeneralCargoLoadingList',
		'MOST.model.foundation.dataitem.DataItem'
	],
	
	data: {
		validObj: {
			excelItself: true,
			msgcode: null
		}
	},
	
	stores: {
		generalcargoloadinglist: {
			model: 'MOST.model.document.excelupload.GeneralCargoLoadingList',
			storeId: 'generalCargoListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/excelupload/generalcargoloadinglist'
			}
		},
		
		generalCargoLoadingListDuplicateCheck: {
			model: 'MOST.model.document.excelupload.GeneralCargoLoadingList',
			storeId: 'generalCargoListDuplicateCheckStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/excelupload/generalCargoLoadingListDuplicateCheck'
			}
		}
	}
});
