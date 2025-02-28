Ext.define('MOST.view.codes.CommodityPackageTypeModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.commoditypackagetype',

	requires: [
		'Ext.data.proxy.Rest'
	],

	stores: {
		commodityCodeList: {
			model: 'MOST.model.codes.CommodityCode',
			storeId: 'commodityCodeGridList',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/commoditycode/commodityCodeGridList',
			}
		},
		
		commodityGroup: {
			model: 'MOST.model.codes.CommodityCode',
			storeId: 'commodityCodeGroup',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/commoditycode/commodityGroup',
			}
		},
		
		commodityCodeCargoTpCombo: {
			storeId: 'commodityCodeCargoTpStore',
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
			model: 'MOST.model.codes.CommodityCode'
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
		},
		checkDuplicate: {
			model: 'MOST.model.codes.CommodityCode',
			storeId: 'checkDuplicateStore',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/commoditycode/checkDuplicate'
			}
		}
	}
});