Ext.define('MOST.view.planning.RoRoYardPlanModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.roroyardplan',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.planning.RoRoYardPlan'
	],
	
	data: {
		selectedColumn : null
	},
	
	stores: {
		roroYardPlanCargoItems: {
			model: 'MOST.model.planning.RoRoYardPlan',
			storeId: 'roroYardPlanCargoItemsStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/roroyardplan/cargolist'
			}
		},
		
		roroYardPlanUnitItems: {
			model: 'MOST.model.planning.RoRoYardPlan',
			storeId: 'roroYardPlanUnitItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/roroyardplan/unitlist'
			}
		},
		
		roroYardPlannedItems: {
			model: 'MOST.model.planning.RoRoYardPlan',
			storeId: 'roroYardPlannedItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/roroyardplan/plannedlist'
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
		},
		
		unitNoCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'unitNoComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_UNIT_NO
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  unitNo: ''
			          }]);
			     }
			}
		}
	}
});