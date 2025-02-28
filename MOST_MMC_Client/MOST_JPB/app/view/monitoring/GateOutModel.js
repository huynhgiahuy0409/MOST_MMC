Ext.define('MOST.view.monitoring.GateOutModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.gateout',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.monitoring.GateOut'
	],

	stores: {
		gateOut: {
			model: 'MOST.model.monitoring.GateOut',
			storeId: 'gateOutStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gateout/list'
			}
		},
		
		gateOutBlNoCombo:{
			fields: ['blNo']
		},
		
		gateOutSnNoCombo:{
			fields: ['shipgNoteNo']
		},
		
		gateOutSnBlNoComboForAll: {
			model: 'MOST.model.monitoring.GateOut',
			storeId: 'gateOutSnBlNoComboForAllStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gateout/snBlComboList'
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
			}
		},
	}
});