Ext.define('MOST.view.planning.TerminalViewModel', {
	extend: 'MOST.view.foundation.BaseViewModel',
	
	alias: 'viewmodel.terminalview',

	requires: [
        'Ext.data.proxy.Rest',
		'MOST.model.common.Locale',
	],
	
	data: {
        selectedWarehouse : null,
		planIndex: -1,
	},
	stores: {
		meta: {
			model: 'MOST.model.common.Locale',
			storeId: 'metaDrawingStore',
			proxy: {
				type: 'ajax',
				url: 'resources/data/MetaTerminalDraw.json',
				reader: {
					showProgressBar : false,
					type: 'json',
					rootProperty: 'data'
				}
			}
        },

        terminals: {
            model: 'MOST.model.planning.TerminalView',
            storeId: 'terminalsStore',
            groupField: 'berthTp'
        },
        
        berths: {
			model: 'MOST.model.planning.TerminalView',
			storeId: 'berthsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/terminalView/berthstructure'
			}
		},
		
		warehouses : {
			model: 'MOST.model.planning.TerminalView',
			storeId: 'warehouseList',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/terminalView/list'
			}
		},
        
		warehouseListCombo: {
			model: 'MOST.model.planning.TerminalView',
			fields: ['locNm','locId'],
			storeId: 'warehouseList',
			proxy: {
				showProgressBar : false,
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/terminalView/list'
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  locNm: 'All',
			              locId: ''
			          }]);
			     }
			}
		},
  		
		terminalCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'terminalCombo',
			proxy: {
			    type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_AREA_LOC
				}
			}
		},
		
		masterBlCombo: {
			model: 'MOST.model.planning.TerminalView',
			storeId: 'masterBlComboId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/terminalView/masterBlList'
			}
		},
		
		bookingNoCombo: {
			model: 'MOST.model.planning.TerminalView',
			storeId: 'bookingNoComboId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/terminalView/BookingNoList'
			}
		},
		
		subBlCombo: {
			model: 'MOST.model.planning.TerminalView',
			storeId: 'subBlComboId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/terminalView/subBlList'
			}
		},
		
		shippingNoteCombo: {
			model: 'MOST.model.planning.TerminalView',
			storeId: 'shippingNoteComboId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/terminalView/shippingNoteList'
			}
		},
		
		cargoTypeCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'cargoTypeComboId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_CGTP
				}
			}
		},
		
		commodityCodeGroupCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'commodityCodeGroupComboId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd: CodeConstants.LCD_MOST,
					mcd: ComboboxServiceConstants.COMBO_COMMODITY_GROUP
				}
			}
		},
		
		commodityCodeCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'commodityCodeComboId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_CMDT_CD
				}
			}
		}
	}
});