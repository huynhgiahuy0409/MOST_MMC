Ext.define('MOST.view.operation.warehouse.WarehouseRehandleModel', {
	extend: 'MOST.view.common.warehouserenderer.WarehouseRendererCommonModel',	// extends and uses WarehouseRendererCommonModel model stores

	alias: 'viewmodel.warehouserehandle',

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
		},
		
		cargoCombo : {
			model: 'MOST.model.operation.CargoLoading',
			storeId: 'cargoCombo'
		}
	}
});