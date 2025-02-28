Ext.define('MOST.view.document.excelupload.PackageDetailListModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

    alias: 'viewmodel.packagedetaillist',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.document.excelupload.PackageDetailList',
		'MOST.model.foundation.dataitem.DataItem'
	],

	data: {
		validObj: {
			excelItself: true,
			msgcode: null
		}
	},
	
	stores: {
		packageDetailList: {
			model: 'MOST.model.document.excelupload.PackageDetailList',
			storeId: 'packageDetailListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/exceluploadpackagedetail/packagedetaillist'
			}
		},
		
		packageDetailListDuplicateCheck: {
			model: 'MOST.model.document.excelupload.PackageDetailList',
			storeId: 'packageDetailListDuplicateCheckStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/exceluploadpackagedetail/duplicatecheck'
			}
		}
	}
});
