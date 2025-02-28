Ext.define('MOST.view.popup.WHCheckerSetLocPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.whcheckersetlocpopup',

	requires: [
		'Ext.data.proxy.Rest',
        'MOST.model.configuration.WhConfiguration',
        'MOST.model.operation.CargoMaster'
	],

	stores: {
		warehouseCombo: {
			model: 'MOST.model.operation.CargoMaster',
			storeId: 'warehouseComboPopupStore',
			proxy: {
			    type: 'ajax',
			    url:  MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/selectwhcombolist',
                writer: {
					type: 'json',
				}
			}
        },
        warehouseListRow:{
            model: 'MOST.model.configuration.WhConfiguration',
			storeId: 'warehouseListRowPopupStore',
			proxy: {
			    type: 'ajax',
			    url:  MOST.config.Locale.getRestApiDestUrl() + '/v1/warehouse/list',
                writer: {
					type: 'json',
				}
			}
        },
        warehouseListBay:{
            model: 'MOST.model.configuration.WhConfiguration',
			storeId: 'warehouseListBayPopupStore',
			proxy: {
			    type: 'ajax',
			    url:  MOST.config.Locale.getRestApiDestUrl() + '/v1/warehouse/list',
                writer: {
					type: 'json',
				}
			}
        },
        warehouseListUnused:{
            model: 'MOST.model.configuration.WhConfiguration',
			storeId: 'warehouseListUnusedPopupStore',
			proxy: {
			    type: 'ajax',
			    url:  MOST.config.Locale.getRestApiDestUrl() + '/v1/warehouse/list',
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
		warehouseOccupiedLocation:{
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
		warehouseList:{
            model: 'MOST.model.configuration.WhConfiguration',
		}
		
	}
});