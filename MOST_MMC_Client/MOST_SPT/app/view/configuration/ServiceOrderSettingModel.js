Ext.define('MOST.view.configuration.ServiceOrderSettingModel', {
	extend: 'MOST.view.foundation.BaseViewModel',
	
    alias: 'viewmodel.serviceordersetting',

    requires:[],

    data: {
        filterProcessType : '',
        serviceOrderSettingItem : '',
        serviceOrderItem: null,
    },

    stores: {
        // Stores for List
        serviceOrderSettingListStore : {
            model: 'MOST.model.configuration.ServiceOrderSetting',
            storeId: 'serviceOrderSettingListStore',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/serviceordersetting/list'
            }
        },


         // Stores for Details
        serviceOrderSettingDetailStore: {
            model: 'MOST.model.configuration.ServiceOrderSetting',
            storeId: 'serviceOrderSettingDetailStore',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/serviceordersetting/detail'
            }
        },

        category1ComboStore : {
        	model: 'MOST.model.combobox.ComboBoxService',
            storeId: 'category1ComboStore',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
                extraParams: {
                	lcd: CodeConstants.LCD_MOST,
                	mcd: CodeConstants.MCD_MT_SVCORDCTG1
                }
            },
            listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			              scd: ''
			          }]);
			     }
			}
        },

        category2ComboStore : {
        	model: 'MOST.model.combobox.ComboBoxService',
            storeId: 'category2ComboStore',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
                extraParams: {
                	lcd: CodeConstants.LCD_MOST,
                	mcd: CodeConstants.MCD_MT_SVCORDCTG2
                }
            },
            listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			              scd: ''
			          }]);
			     }
			}
        },

        category3ComboStore : {
        	model: 'MOST.model.combobox.ComboBoxService',
            storeId: 'category3ComboStore',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
                extraParams: {
                	lcd: CodeConstants.LCD_MOST,
                	mcd: CodeConstants.MCD_MT_SVCORDCTG3
                }
            },
            listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			              scd: ''
			          }]);
			     }
			}
        },

        processTypeComboStore : {
        	model: 'MOST.model.combobox.ComboBoxService',
            storeId: 'processTypeFilterComboStore',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
                extraParams: {
                	lcd: CodeConstants.LCD_MOST,
                	mcd: CodeConstants.MCD_MT_ODRPRCTP
                }
            },
            listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			              scd: ''
			          }]);
			     }
			}
        },

        paymentMethodComboStore : {
        	model: 'MOST.model.combobox.ComboBoxService',
            storeId: 'category3FilterComboStore',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
                extraParams: {
                	lcd: CodeConstants.LCD_MOST,
                	mcd: CodeConstants.MCD_MT_PAYTP
                }
            },
            listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			              scd: ''
			          }]);
			     }
			}
        },

        dateFormatComboStore : {},

        unitUomComboStore : {
        	model: 'MOST.model.combobox.ComboBoxService',
            storeId: 'unitUomComboStore',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster'
            }
        },
        
        documentTypeComboStore: {},
        
        SNBLGridList:{
            model: 'MOST.model.operation.ServiceOrder',
            storeId: 'SNBLGridListStore',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/serviceorder/blsnList'
            }
        },
        
        SNNoList: {
			model: 'MOST.model.operation.ServiceOrder',
			storeId: 'SNNoListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/serviceorder/snItems'
			}
		
		},
        
        BLNoList: {
			model: 'MOST.model.operation.ServiceOrder',
			storeId: 'BLNoListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/serviceorder/blItems'
			}
		},
		
		unit1ComboStore: {
			model:'MOST.model.combobox.ComboBoxService',
			storeId: 'invoiceUnit1ComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_IV_UNIT,
					tyCd: CodeConstants.MT_INVUNITTP_UNIT1
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			              scd: ''
			          }]);
			     }
			}
		},
		
		unit2ComboStore: {
			model:'MOST.model.combobox.ComboBoxService',
			storeId: 'invoiceUnit1ComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_IV_UNIT,
					tyCd: CodeConstants.MT_INVUNITTP_UNIT2
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			              scd: ''
			          }]);
			     }
			}
		},
		
		unit3ComboStore: {
			model:'MOST.model.combobox.ComboBoxService',
			storeId: 'invoiceUnit1ComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_IV_UNIT,
					tyCd: CodeConstants.MT_INVUNITTP_UNIT3
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			              scd: ''
			          }]);
			     }
			}
		}
    }
});
