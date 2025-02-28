Ext.define('MOST.view.operation.CargoMonitoringPickupSulphurModel', {
    extend: 'MOST.view.foundation.BaseViewModel',
    
    alias: 'viewmodel.cargomonitoringpickupsulphur',

    requires: [
        'Ext.data.proxy.Rest'
    ],

    stores: {
        nonJPVCSNList: {
            model: 'MOST.model.operation.CargoMonitoringPickupSulphur',
            
            storeId: 'nonJPVCSNList',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargomonitoringpickupsulphur/list'
            },
            listeners: {
                load: function(store, records) {
                    store.insert(0, [{
                        shipgNoteNoNm: 'Select All',
                        shipgNoteNoCd: '',
                    }])
                }
            }
        },
        
        conveyorSulphurList: {
            model: 'MOST.model.operation.CargoMonitoringPickupSulphur',
            
            storeId: 'conveyorSulphurList',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargomonitoringpickupsulphur/conveyor'
            }
        },
        
        siloSulphurList: {
            model: 'MOST.model.operation.CargoMonitoringPickupSulphur',
            
            storeId: 'siloSulphurList',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargomonitoringpickupsulphur/silo'
            }
        },
        
        updatingPickupSulphurList: {
            model: 'MOST.model.operation.CargoMonitoringPickupSulphur',
            
            storeId: 'updatingPickupSulphurList',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargomonitoringpickupsulphur/updatingpickupsulphurlist'
            }
        }
        
    }
});