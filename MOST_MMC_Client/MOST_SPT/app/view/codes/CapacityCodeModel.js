Ext.define('MOST.view.codes.CapacityCodeModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.capacitycode',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.combobox.ComboBoxService'
	],

	stores: {
		capacityCodeList: {
			model: 'MOST.model.codes.CapacityCode',
			storeId: 'capacityCodeListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/capacitycode/capacityCodeList',
			}
		},
		
		capacityCodeEquipmentTypeGridCombo: {
			storeId: 'capacityCodeEquipmentTypeGridCombo',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd : CodeConstants.LCD_MOST,
					mcd : CodeConstants.MCD_MT_EQFCTPCD
				}
			}
		},
		
		capacityCodeEquipmentTypeCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'capacityCodeEquipmentTypeCombo',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd : CodeConstants.LCD_MOST,
					mcd : CodeConstants.MCD_MT_EQFCTPCD
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