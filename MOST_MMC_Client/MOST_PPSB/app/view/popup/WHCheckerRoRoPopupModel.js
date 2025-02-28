Ext.define('MOST.view.popup.WHCheckerRoRoPopupModel', {
//	extend: 'MOST.view.foundation.BaseViewModel',
	extend: 'MOST.view.common.warehouserenderer.WarehouseRendererCommonModel',	// extends and uses WarehouseRendererCommonModel model stores

	alias: 'viewmodel.whcheckerroropopup',

	requires: [
		'Ext.data.proxy.Rest',
        'MOST.model.configuration.WhConfiguration',
        'MOST.model.operation.CargoMaster'
	],

	stores: {
	
		cargoInfoInSelectedCell: {
			model: 'MOST.model.planning.ConfirmationSlip',
			storeId: 'cargoInfoInSelectedCellStoreHHT'
		},
		
		allocatedCargoAmount:{
			model: 'MOST.model.configuration.WhConfiguration',
			storeId: 'allocatedCargoAmountStoreHHT'
		},
		
		warehouseCombo: {
			model: 'MOST.model.operation.CargoMaster',
			storeId: 'warehouseComboPopupStore',
			proxy: {
			    type: 'ajax',
			    url:  MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/selectWHComboList',
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
			    url:  MOST.config.Locale.getRestApiDestUrl() + '/v1/warehouse/whViewList',
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
			    url:  MOST.config.Locale.getRestApiDestUrl() + '/v1/warehouse/whViewList',
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