Ext.define('MOST.view.operation.CargoMovementModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.cargomovement',

	requires: [
		'Ext.data.proxy.Rest'
	],

	stores: {
		confirmMovement: {
			model: 'MOST.model.operation.CargoMovement',
			storeId: 'confirmMovementStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargomovement/cargoMovementList'
			}
		},
		
		confirmMovementList: {
			model: 'MOST.model.configuration.WhConfiguration',
			storeId: 'confirmMovementStore'
		},
		
		confirmMovementShiftList: {
			fields: ['shftId', 'shftNm', 'shftDivCd', 'fmHhmm', 'toHhmm']
		},
		
		validationCheck: {
			storeId: 'validationCheck',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/validationcode/list',
				
			}
		},
		
		// HHT Tablet
		warehouseCombo: {
//			model: 'MOST.model.popup.CargoMaster',
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
	    locList:{
			fields: ['locId','strLoc','wgt','msrmt','pkgQty','whTpCd'],
			storeId: 'locListStore',
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
	}
});