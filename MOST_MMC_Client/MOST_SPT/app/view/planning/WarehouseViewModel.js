Ext.define('MOST.view.planning.WarehouseViewModel', {
    extend: 'MOST.view.common.warehouserenderer.WarehouseRendererCommonModel',

    alias: 'viewmodel.warehouseview',

    requires: [
    ],


    stores: {
        warehouseTooltipList : {
            model: 'MOST.model.configuration.WarehouseDefinition',
            storeId: 'warehouseTooltipList'
        }
    }
});