Ext.define('MOST.view.popup.ServiceOrderSettingPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

    alias: 'viewmodel.serviceordersettingpopup',

    requires: [],

    data : {
    },

    stores: {
        serviceOrderSettingPopupListStore : {
        	modedl: 'MOST.model.popup.PopupService',
            storeId: 'serviceOrderSettingPopupListStore',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/serviceordersetting'
            }
        },

        category1PopupFilterComboStore : {
        	model: 'MOST.model.combobox.ComboBoxService',
            storeId: 'category1PopupFilterComboStore',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
                extraParams: {
                	lcd: CodeConstants.LCD_MOST,
                	mcd: CodeConstants.MCD_MT_SVCORDCTG1
                }
            }
        },

        category2PopupFilterComboStore : {
        	model: 'MOST.model.combobox.ComboBoxService',
            storeId: 'category2PopupFilterComboStore',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
                extraParams: {
                	lcd: CodeConstants.LCD_MOST,
                	mcd: CodeConstants.MCD_MT_SVCORDCTG2
                }
            }
        },

        category3PopupFilterComboStore : {
        	model: 'MOST.model.combobox.ComboBoxService',
            storeId: 'category3PopupFilterComboStore',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
                extraParams: {
                	lcd: CodeConstants.LCD_MOST,
                	mcd: CodeConstants.MCD_MT_SVCORDCTG3
                }
            }
        }
    }
});