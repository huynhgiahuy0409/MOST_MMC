Ext.define('MOST.view.planning.TheListOfYardPlanOfRoRoModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.thelistofyardplanofroro',

	requires: [
		'Ext.data.proxy.Rest',
	],
	
	data: {
		selectedColumn : null
	},
	
	stores: {
		roroYardPlanItems: {
			model: 'MOST.model.planning.TheListOfYardPlanOfRoRo',
			storeId: 'roroYardPlanItemsStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/thelistofyardplanofroro/list'
			}
		},
		
		blCombo: {
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
		
		shippingNoteCombo: {
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
		}
	}
});