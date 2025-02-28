Ext.define('MOST.view.operation.warehouse.WarehouseOfGCModel', {
	extend: 'MOST.view.common.warehouserenderer.WarehouseRendererCommonModel',	// extends and uses WarehouseRendererCommonModel model stores

	alias: 'viewmodel.warehouseofgc',

	requires: [
		'Ext.data.proxy.Rest'
	],

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