Ext.define('MOST.view.controller.LogMonitoringModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.logmonitoring',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.common.FileUpload',
	],

	stores: {
		listFilesMOST: {
			model: 'MOST.model.common.FileUpload',
			storeId: 'listFilesMOST',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/logmonitoring/listmost'
			}
		},
		
		listFilesWB: {
			model: 'MOST.model.common.FileUpload',
			storeId: 'listFilesWB',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/logmonitoring/listwb'
			}
		},
		
		listFilesHG: {
			model: 'MOST.model.common.FileUpload',
			storeId: 'listFilesHG',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/logmonitoring/listhg'
			}
		},
		
		fileDownloadMOSTStore: {
			model: 'MOST.model.common.FileUpload',
			storeId: 'fileDownloadStoreMOSTStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/logmonitoring/downloadlogmost'
			}
		},
		
		fileDownloadWBStore: {
			model: 'MOST.model.common.FileUpload',
			storeId: 'fileDownloadStoreWBStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/logmonitoring/downloadlogwb'
			}
		},
		
		fileDownloadHGStore: {
			model: 'MOST.model.common.FileUpload',
			storeId: 'fileDownloadStoreHGStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/logmonitoring/downloadloghg'
			}
		},
	}
});