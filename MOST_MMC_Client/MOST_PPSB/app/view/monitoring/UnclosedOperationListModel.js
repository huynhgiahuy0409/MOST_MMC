Ext.define('MOST.view.monitoring.UnclosedOperationListModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.unclosedoperationlist',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.monitoring.UnclosedOperationList'
	],
	
	formulas:{
  		
	},
	
	stores: {
		
		unclosedOperationList: {
			model: 'MOST.model.monitoring.UnclosedOperationList',
			storeId: 'unclosedOperationListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/unclosedoperationlist/list'
			}
		},
		
		JPVCPopupStore: {
			model: 'MOST.model.popup.PopupService',
			storeId: 'JPVCPopupStoreId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/popupservice'
			}
		},
		
		shiftCombo: {
			fields: ['shftId','shftNm'],
			storeId: 'shiftStore',
        },
        
        statusCombo: {
        	model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'JstatusComboStoreId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_CGSTATUS
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			        	  scd: ''
			          }]);
			     }
			}
        },
        
        whLocCombo: {
        	model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'JstatusComboStoreId',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_WAREHOUSE_LOC,
					locDivCd: CodeConstants.MT_WPCD_WHO
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			        	  scd: ''
			          }]);
			     }
			}
        }
	}
});