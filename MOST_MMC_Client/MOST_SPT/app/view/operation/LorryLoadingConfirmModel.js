Ext.define('MOST.view.operation.LorryLoadingConfirmModel', {
    extend: 'MOST.view.foundation.BaseViewModel',
    
    alias: 'viewmodel.lorryloadingconfirm',

    requires: [
        'Ext.data.proxy.Rest'
    ],

    stores: {
        lorryLoadingConfirmItems: {
            model: 'MOST.model.operation.LorryLoadingConfirm',
            
            storeId: 'lorryLoadingConfirmItems',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/lorryloadingconfirm/lorryLoadingList'
            }
        }
    }
});