Ext.define('MOST.view.common.warehouserenderer.WarehouseRendererCommonModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.warehouserenderercommon',

	requires: [
		'Ext.data.proxy.Rest'
	],

	
	stores: {
		warehouseList: {
			model: 'MOST.model.configuration.WarehouseDefinition',
			storeId: 'warehouseList',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/warehouse/list'
			}
		},
		WhViewList: {
			model: 'MOST.model.configuration.WarehouseDefinition',
			storeId: 'WhViewListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/warehouse/whViewList'
			}
		},
		
		cellInfomation: {
			model: 'MOST.model.configuration.WarehouseDrawItem',
			storeId: 'cellInfomationStore'
		},
		
		bayInformation: {
			model: 'MOST.model.configuration.WarehouseDrawItem',
			storeId: 'bayInformationStore'
		},
		rowInformation: {
			model: 'MOST.model.configuration.WarehouseDrawItem',
			storeId: 'rowInformationStore'
		},
		unUsedInformation: {
			model: 'MOST.model.configuration.WarehouseDrawItem',
			storeId: 'unUsedInformationtore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/warehouse/unusedblock'
			}
		},
		cargoInformation: {
			model: 'MOST.model.configuration.WarehouseDrawItem',
			storeId: 'cargoInformationStore'
		},
		rentalInformation : {
			model: 'MOST.model.configuration.WarehouseDrawItem',
			storeId: 'rentalInformationStore'
		},
		spaceMovementInformation : {
			model: 'MOST.model.configuration.WarehouseDrawItem',
			storeId: 'spaceMovementInformation'
		},
		meta: {
			model: 'MOST.model.common.Locale',
			storeId: 'metaWarehouseStore',
			proxy: {
				type: 'ajax',
				url: 'resources/data/MetaWarehouse.json',
				reader: {
					type: 'json',
					rootProperty: 'data'
				}
			}
		},
		warehouseDetailInfo: {
			model: 'MOST.model.common.Locale',
			storeId: 'metaWarehouseStore',
			proxy: {
				type: 'ajax',
				url: 'resources/data/MetaWarehouse.json',
				reader: {
					type: 'json',
					rootProperty: 'data'
				}
			}
		}
	}
});