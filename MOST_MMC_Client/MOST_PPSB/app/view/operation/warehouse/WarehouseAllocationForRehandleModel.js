Ext.define('MOST.view.operation.warehouse.WarehouseAllocationForRehandleModel', {
	extend: 'MOST.view.common.warehouserenderer.WarehouseRendererCommonModel',	// extends and uses WarehouseRendererCommonModel model stores

	alias: 'viewmodel.warehouseallocationforrehandle',

	requires: [
		'Ext.data.proxy.Rest'
	],
	data: {
		cargoInfo: null,
		targetWarhouseLocation: null
	},	
	
	stores: {
		cargoInfoInSelectedCell: {
			model: 'MOST.model.configuration.WhConfiguration',
			storeId: 'cargoInfoInSelectedCellStore'
		},
		
		allocatedCargoAmount:{
			model: 'MOST.model.configuration.WhConfiguration',
			storeId: 'allocatedCargoAmountStore'
		}
	}
});