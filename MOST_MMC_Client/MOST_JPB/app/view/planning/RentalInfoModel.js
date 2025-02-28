Ext.define('MOST.view.planning.RentalModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.rentalinfo',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.planning.RentalInfo'
	],

	
	
	stores: {
		termCombo : {
			fields: ['name','code'],
			storeId: 'statusComboStore',
			data :  [
//					{"code":"", "name":"Select"},
					{"code":"SHT", "name":"Short term"},
					{"code":"LOT", "name":"Long term"},
					{"code":"LME", "name":"LME"},
					
            ]
		},
		
		periodCombo : {
			fields: ['name','code'],
			storeId: 'categoryComboStore',
			data :  [{"code":"", "name":"Select"},
					{"code":"FROM", "name":"FROM"},
					{"code":"TO", "name":"TO"},
					
            ]
		},
		
		rentalMaster: {
			model: 'MOST.model.planning.RentalInfo',
			storeId: 'dgListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rentalinfo/list'
			}
		},
		
		rentalList:{
			model: 'MOST.model.planning.RentalInfo',
			storeId: 'rentalListId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rentalinfo/gridList'
			}
		},
		
		rentalDetailList:{
			model: 'MOST.model.planning.RentalInfo',
			storeId: 'rentalDetailListId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rentalinfo/detailList'
			}
		},
		
		validYnCombo : {
			fields: ['name','code'],
			storeId: 'validYnComboStore',
			data :  [{"code":"N", "name":"No"},
					{"code":"Y", "name":"Yes"},
            ]
		},
		
		prdTpCdCombo : {
			fields: ['name','code'],
			storeId: 'prdTpCdComboStore',
			data :  [{"code":"", "name":"Select"},
					{"code":"MON", "name":"Monthly"},
					{"code":"30", "name":"30 days"},
					{"code":"WEK", "name":"Weekly"},
					{"code":"SHF", "name":"Shift"},
            ]
		},
		
		rentUnitCombo : {
			fields: ['name','code'],
			storeId: 'prdTpCdComboStore',
			data :  [{"code":"", "name":"Select"},
					{"code":"MT", "name":"MT"},
					{"code":"M2", "name":"M2"},
					{"code":"M3", "name":"M3"},
            ]
		},
		
		useTpCdCombo : {
			fields: ['name','code'],
			storeId: 'prdTpCdComboStore',
			data :  [{"code":"", "name":"All"},
					{"code":"EI", "name":"Export/Import"},
					{"code":"E", "name":"Export"},
					{"code":"I", "name":"Import"},
					{"code":"S", "name":"Storage"},
            ]
		},
		
		payTpCdCombo : {
			fields: ['name','code'],
			storeId: 'prdTpCdComboStore',
			data :  [{"code":"CA", "name":"Cash"},
					{"code":"CD", "name":"Credit"},
            ]
		},
		
		whrLocList: {
			model: 'MOST.model.planning.RentalInfo',
			storeId: 'whrLocListStore',
		},
		
		whrVesselList: {
			model: 'MOST.model.planning.RentalInfo',
			storeId: 'whrVesselListStore',
		},
		
		whrCommodityList: {
			model: 'MOST.model.planning.RentalInfo',
			storeId: 'whrCommodityListStore',
		},
		
		whrColorList: {
			model: 'MOST.model.planning.RentalInfo',
			storeId: 'whrLocListStore',
		},
		
		whConfigurationList: {
			model: 'MOST.model.planning.RentalInfo',
			storeId: 'whConfigurationListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rentalinfo/whConfigurationList'
			}
		},
		
		chkDupliRentNo: {
			model: 'MOST.model.planning.RentalInfo',
			storeId: 'whConfigurationListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rentalinfo/chkDupliRentNo'
			}
		},
		
        warehouseRIList: {
            model: 'MOST.model.configuration.WarehouseDefinition',
            storeId: 'warehouseRIList',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/warehouse/list',
                extraParams:{
                	locDivCd: 'WHO'
				}
            }
        },
	}
});