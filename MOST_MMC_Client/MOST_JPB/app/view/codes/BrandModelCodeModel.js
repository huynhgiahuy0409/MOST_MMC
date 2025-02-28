Ext.define('MOST.view.codes.BrandModelCodeModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

    alias: 'viewmodel.brandModelCode',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.foundation.dataitem.DataItem'
	],
	
	stores: {
		brandCode: {
			model: 'MOST.model.codes.BrandModelCode',
			storeId: 'brandCodeStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/brandmodelcode/brands'
			}
		},
		checkBrandCdDuplicate:{
			model: 'MOST.model.codes.BrandModelCode',
			storeId: 'checkBrandCdDuplicateStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/brandmodelcode/brandCodeDuplicateCheck'
			}
		},
		checkBrandCdRemove:{
			model: 'MOST.model.codes.BrandModelCode',
			storeId: 'checkBrandCdRemoveStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/brandmodelcode/brandCodeRemoveCheck'
			}
		},
		checkModelCdDuplicate:{
			model: 'MOST.model.codes.BrandModelCode',
			storeId: 'checkModelCdDuplicateStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/brandmodelcode/modelCodeDuplicateCheck'
			}
		},
		modelCode: {
			model: 'MOST.model.codes.BrandModelCode',
			storeId: 'modelCodeStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/brandmodelcode/models'
			}
		}
	}
});
