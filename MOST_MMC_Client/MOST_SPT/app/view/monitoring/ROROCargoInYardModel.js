Ext.define('MOST.view.monitoring.ROROCargoInYardModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

    alias: 'viewmodel.roroCargoInYard',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.monitoring.ROROCargoInYard',
		'MOST.model.foundation.dataitem.DataItem'
	],
	
	stores: {
		ROROCargoInYardList: {
			model: 'MOST.model.monitoring.ROROCargoInYard',
			storeId: 'ROROCargoInYardStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rorocargoinyard/list'
			}
		},
		BLCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'blComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BL_NO,
					tyCd: CodeConstants.CGMST_TSPT_TP_RR
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  blNo: ''
			          }]);
			     }
			}
		},
		SNCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shippingNoteComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SN_NO,
					tyCd: CodeConstants.CGMST_TSPT_TP_RR
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
	}
});
