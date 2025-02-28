Ext.define('MOST.view.popup.WarehouseRentalPopupModel', {
    extend: 'Ext.app.ViewModel',
//    extend: 'MOST.view.common.warehouserenderer.WarehouseRendererCommonModel',

    alias: 'viewmodel.warehouserentalpopup',

    requires: [
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
        
        warehouseTooltipList : {
            model: 'MOST.model.configuration.WarehouseDefinition',
            storeId: 'warehouseTooltipList'
        }
    }
    
    
});