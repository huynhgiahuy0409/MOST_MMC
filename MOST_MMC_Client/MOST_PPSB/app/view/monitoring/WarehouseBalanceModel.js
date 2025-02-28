Ext.define('MOST.view.monitoring.WarehouseBalanceModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

    alias: 'viewmodel.warehousebalance',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.monitoring.WarehouseBalance',
		'MOST.model.foundation.dataitem.DataItem'
	],
	
	stores: {
		warehouseBalanceList: {
			model: 'MOST.model.monitoring.WarehouseBalance',
			storeId: 'warehouseBalanceListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/warehousebalance/list'
			}
		},
		warehouseViewCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'warehouseViewComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_WAREHOUSE_LOC,
					locDivCd: CodeConstants.MT_LOCDIV1_WHO
				}				
			}
		},
		
		masterBlCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'masterBlComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_MBL_NO
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  mfDocId: ''
			          }]);
			     }
			}
		},
		
		BLNoList: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'BLNoListStore',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BL_NO
				}
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  blNo: ''
			          }]);
			     }
			}
		},
		
		snNoList: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'snNoListStore',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SN_NO
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  shipgNoteNo: ''
			          }]);
			     }
			}
		},
		
		warehouseTypeCombo : {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'warehouseTypeComboComboStore',
			proxy: {
			   type: 'rest',
			   url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
			   extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_WHTP
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
	}
});
