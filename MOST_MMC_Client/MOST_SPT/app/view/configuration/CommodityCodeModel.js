Ext.define('MOST.view.configuration.CommodityCodeModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.commoditycode',

	requires: [
		'Ext.data.proxy.Rest'
	],

	stores: {
		commodityCodeList: {
			model: 'MOST.model.configuration.CommodityCode',
			storeId: 'commodityCodeGridList',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/commoditycode/commodityCodeGridList',
			}
		},
		
		commodityCodeCategoryCombo: {
			storeId: 'commodityCodeCategoryStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_CGTP
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
		
		commodityCodeGroupCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'commodityCodeGroupStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType:ComboboxServiceConstants.COMBO_CMDT_CD
				}
			},
		},
		
		commodityCodeGroupCdCombo: {
			model: 'MOST.model.configuration.CommodityCode'
		},
		
		commodityCodeImdgCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'commodityCodeGroupStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType:ComboboxServiceConstants.COMBO_IMDG
				}
			}
		}
	}
});