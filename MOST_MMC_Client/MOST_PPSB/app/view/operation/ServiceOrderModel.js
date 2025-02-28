Ext.define('MOST.view.operation.ServiceOrderModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

    alias: 'viewmodel.serviceorder',

    requires: [],

    data : {
        serviceOrderItem: null,
        serviceOrderSettingItem: null,
        serviceOrderVesselItem: null,
        selectedServiceOrderItem: null
    },

    stores: {
        serviceOrderListStore: {
            model: 'MOST.model.operation.ServiceOrder',
            storeId: 'serviceOrderListStore',
            autoLoad: false,
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/serviceorder/list'
            }
        },

        serviceOrderProcessStore: {
            model: 'MOST.model.operation.ServiceOrder',
            storeId: 'serviceOrderProcessStore',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/serviceorder/list'
            }
        },

        category1FilterComboStore : {
            model: 'MOST.model.combobox.ComboBoxService',
            storeId: 'category1FilterComboStore',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
                extraParams: {
                	lcd: CodeConstants.LCD_MOST,
                	mcd: CodeConstants.MCD_MT_SVCORDCTG1
                }
            }
        },

        category2FilterComboStore : {
        	model: 'MOST.model.combobox.ComboBoxService',
            storeId: 'category2FilterComboStore',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
                extraParams: {
                	lcd: CodeConstants.LCD_MOST,
                	mcd: CodeConstants.MCD_MT_SVCORDCTG2
                }
            }
        },

        category3FilterComboStore : {
        	model: 'MOST.model.combobox.ComboBoxService',
            storeId: 'category3FilterComboStore',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
                extraParams: {
                	lcd: CodeConstants.LCD_MOST,
                	mcd: CodeConstants.MCD_MT_SVCORDCTG3
                }
            }
        },

        shiftFilterComboStore : {
        	model: 'MOST.model.combobox.ComboBoxService',
            storeId: 'shiftFilterComboStore',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
                extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SHFTTP,
					divCd : CodeConstants.MT_SHFTTP_OT0005
				}
            }
        },

        statusFilterComboStore : {
        	model: 'MOST.model.combobox.ComboBoxService',
            storeId: 'statusFilterComboStore',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
                extraParams: {
                	lcd: CodeConstants.LCD_MOST,
                	mcd: CodeConstants.MCD_MT_ODRSTAT
                }
            }
        },

        serviceOrderDetailStore: {
            model: 'MOST.model.operation.ServiceOrder',
            storeId: 'serviceOrderDetailStore',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/serviceorder/detail'
            }
        },

        shiftComboStore : {
        	model: 'MOST.model.combobox.ComboBoxService',
            storeId: 'shiftComboStore',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
                extraParams: {
                	searchType: ComboboxServiceConstants.COMBO_SHFTTP,
                	divCd : CodeConstants.MT_SHFTTP_VO0001,
                	useYn: 'Y'
                }
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
		
		SNNoList: {
			model: 'MOST.model.operation.ServiceOrder',
			storeId: 'SNNoListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/serviceorder/snItems'
			}
		
		},
		
        SNBLGridList:{
            model: 'MOST.model.operation.ServiceOrder',
            storeId: 'SNBLGridListStore',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/serviceorder/blsnList'
            }
        },
        
        searchRequestInputSNBL:{
            model: 'MOST.model.operation.ServiceOrder',
            storeId: 'SNBLGridListStore',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/serviceorder/blsnList'
            }
        },
        
        SNBLCompletionGridList:{
            model: 'MOST.model.operation.ServiceOrder',
            storeId: 'SNBLCompletionGridListStore',
            autoLoad: false,
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/serviceorder/blsnList'
            }
        },
        
        roroYardPlannedItems: {
			model: 'MOST.model.planning.RoRoYardPlan',
			storeId: 'roroYardPlannedItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/roroyardplan/plannedlist'
			}
		},
    }
});