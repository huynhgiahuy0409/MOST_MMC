Ext.define('MOST.view.monitoring.GateInModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.listofgatein',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.monitoring.GateIn'
	],

	stores: {
		listOfGateIn: {
			model: 'MOST.model.monitoring.GateIn',
			storeId: 'listOfGateInStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gatein/list'
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
		
		listOfGateInBlNoCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'blNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BL_NO
				}
			}
		},
		
		listOfGateInSnNoCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shipgNoteComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SN_NO
				}
			}
		},
		
		listOfCargoArrvDelvCombo: {
			model: 'MOST.model.monitoring.Discharging',
			storeId: 'listOfGateInSnBlNoComboForAllStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gatein/snBlComboList'
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
		},
		
		// HHT Tablet
		listOfGateInSnBlNoComboForAll: {
			model: 'MOST.model.monitoring.GateIn',
			storeId: 'listOfGateInSnBlNoComboForAllStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/gatein/snBlComboList'
			}
		}
	}
});