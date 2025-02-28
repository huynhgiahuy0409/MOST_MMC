Ext.define('MOST.view.popup.SpaceMovementAllocationPopupModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.spacemovementallocationpopup',

    requires: [],

    data : {
        selectedCell: null,
        accumulatedCells: null
    },
    stores: {
        warehouseList: {
            model: 'MOST.model.configuration.WarehouseDefinition',
            storeId: 'warehouseList',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/warehouse/list'
            }
        },

        allocatedWarehouseStore: {
            id: 'allocatedWarehouseStore',
            fields: ['whId', 'locIdArr', 'items'],
            storeId: 'allocatedWarehouseStore'
        },

        warehouseTooltipList : {
            model: 'MOST.model.configuration.WarehouseDefinition',
            storeId: 'warehouseTooltipList'
        }
    }
});