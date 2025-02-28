Ext.define('MOST.view.planning.warehouse.WarehouseAllocationModel', {
	extend: 'MOST.view.common.warehouserenderer.WarehouseRendererCommonModel',	// extends and uses WarehouseRendererCommonModel model stores

	alias: 'viewmodel.warehouseallocation',

	requires: [
		'Ext.data.proxy.Rest'
	],

	stores: {
		cargoInfoInSelectedCell: {
			model: 'MOST.model.planning.ConfirmationSlip',
			storeId: 'cargoInfoInSelectedCellStore'
		},
		
		allocatedCargoAmount:{
			model: 'MOST.model.configuration.WarehouseDefinition',
			storeId: 'allocatedCargoAmountStore'
		}
	}
});