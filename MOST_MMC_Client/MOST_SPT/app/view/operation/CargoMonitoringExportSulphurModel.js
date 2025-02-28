Ext.define('MOST.view.operation.CargoMonitoringExportSulphurModel', {
    extend: 'MOST.view.foundation.BaseViewModel',
    
    alias: 'viewmodel.cargomonitoringexportsulphur',

    requires: [
        'Ext.data.proxy.Rest'
    ],

    stores: {
        conveyorSulphurList: {
            model: 'MOST.model.operation.CargoMonitoringExportSulphur',
            
            storeId: 'conveyorSulphurList',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargomonitoringexportsulphur/conveyor'
            }
        },
        
        snlSulphurList: {
            model: 'MOST.model.operation.CargoMonitoringExportSulphur',
            
            storeId: 'snlSulphurList',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargomonitoringexportsulphur/snl'
            }
        },
        
        processExportSulphurList: {
            model: 'MOST.model.operation.CargoMonitoringExportSulphur',
            
            storeId: 'processExportSulphurList',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargomonitoringexportsulphur/processexportsulphurlist'
            }
        }
        
    }
});