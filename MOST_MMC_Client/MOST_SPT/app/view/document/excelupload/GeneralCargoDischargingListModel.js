Ext.define('MOST.view.document.excelupload.GeneralCargoDischargingListModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

    alias: 'viewmodel.generalcargodischaginglist',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.document.excelupload.GeneralCargoDischargingList',
		'MOST.model.foundation.dataitem.DataItem'
	],

	data: {
		validObj: {
			excelItself: true,
			msgcode: null
		}
	},
	
	stores: {
		generalCargoDischargingList: {
			model: 'MOST.model.document.excelupload.GeneralCargoDischargingList',
			storeId: 'generalCargoListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/exceluploadbl/generalcargodischarginglist'
			}
		},
		
		generalCargoDischargingListDuplicateCheckBL: {
			model: 'MOST.model.document.SearchBLParm',
			storeId: 'generalCargoListDuplicateCheckStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/exceluploadbl/duplicatecheckbl'
			}
		}
	}
});
