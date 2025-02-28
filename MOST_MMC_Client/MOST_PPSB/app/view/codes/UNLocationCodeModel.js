Ext.define('MOST.view.codes.UNLocationCodeModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

    alias: 'viewmodel.unlocatioindscode',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.foundation.dataitem.DataItem'
	],
	
	stores: {
		unLocationCode: {
			model: 'MOST.model.codes.UNLocationCode',
			storeId: 'unLocationCodeStore',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/unlocationcode/unlocationcode'
			}
		},
		
		unLocationCodeDtl: {
			model: 'MOST.model.codes.UNLocationCode',
			storeId: 'unLocationCodeStoreDtl',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/unlocationcode/unlocationcodedtl'
			}
		},
		
		dangerousGoodsCodeDuplicateCheck: {
			model: 'MOST.model.codes.DangerousGoodsCode',
			storeId: 'dangerousGoodsCodeDuplicateCheckStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/unlocationcode/countryCodeDuplicateCheck'
			}
		},
		
		countryCombo:{
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'countryComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_CNTRY_CD
				}
			}
		}
	}
});
