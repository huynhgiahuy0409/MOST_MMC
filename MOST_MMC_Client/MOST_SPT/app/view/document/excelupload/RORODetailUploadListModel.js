Ext.define('MOST.view.document.excelupload.RORODetailUploadListModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

    alias: 'viewmodel.rorodetailuploadlist',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.document.excelupload.RORODetailUploadList',
		'MOST.model.foundation.dataitem.DataItem'
	],

	data: {
		validObj: {
			excelItself: true,
			msgcode: null
		}
	},
	
	stores: {
		rORODetailUploadList: {
			model: 'MOST.model.document.excelupload.RORODetailUploadList',
			storeId: 'rOROListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/exceluploadrorodetail/rorodetailuploadlist'
			}
		},
		
		rORODetailUploadListDuplicateCheck: {
			model: 'MOST.model.document.excelupload.RORODetailUploadList',
			storeId: 'rOROListDuplicateCheckStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/exceluploadrorodetail/duplicatecheck'
			}
		}
	}
});
