Ext.define('MOST.view.popup.WHCheckeUnsetPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.whcheckerunsetpopup',

	requires: [
		'Ext.data.proxy.Rest',
        'MOST.model.configuration.WhConfiguration',
        'MOST.model.operation.CargoMaster'
	],

	stores: {
		exportList: {
			model: 'MOST.model.operation.CargoMaster',
			storeId: 'exportListStore',
			proxy: {
			    type: 'ajax',
			    url:  MOST.config.Locale.getRestApiDestUrl() + '/v1/cargomanualctl/cargomanualctlexportlist',
                writer: {
					type: 'json',
				}
			}
        },
        warehouseViewList:{
            model: 'MOST.model.configuration.WhConfiguration',
			storeId: 'warehouseListUnusedPopupStore',
			proxy: {
			    type: 'ajax',
			    url:  MOST.config.Locale.getRestApiDestUrl() + '/v1/warehouse/whviewlist',
                writer: {
					type: 'json',
				}
			}
		},
        locList:{
			fields: ['locId','strLoc','wgt','msrmt','pkgQty','whTpCd'],
			storeId: 'locListStore',
		},
		warehouseList:{
            model: 'MOST.model.configuration.WhConfiguration',
		}
		
	}
});