Ext.define('MOST.view.controller.WHReconciliationModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.whreconciliation',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.controller.WHReconciliationItem'
	],
	
	data: {
		selectedReconcileDetailData: null
	},
	stores: {
		categoryCombo: {
			fields: ['scdNm','scd'],
			storeId: 'categoryComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams: {
					lcd: 'MT',
					mcd: 'CATGTP',
					scdUse: 'Y'
				},
				listeners: 
				{
					load: function(store, records) {
				          store.insert(0, [{
				        	  scdNm: 'Select',
				              scd: ''
				          }]);
				     }
				}
			},
		},
		
		whCombo: {
			fields: ['cd','cdNm'],
			storeId: 'whComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/locationCodeList',
				extraParams: {
					locDivCd: 'WHO',
					searchType: 'LocDef'
				}
			}
		},
		
		shippingNoteListCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shippingNoteListComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_OPR_SNNO
				}
			},
			autoLoad: true
		},
		
		blListCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'blListComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_OPR_BLNO
				}
			},
			autoLoad: true	
		},
		
		grListCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'grListCombo',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_OPR_GR
				}
			},
			autoLoad: true
		},
		
		whReconcilList:{
			model: 'MOST.model.controller.WHReconciliationItem',
			storeId: 'whReconcilListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/whreconciliation/whreconciliationlist',
			}
		},
		
		whReconcilDetail:{
			model: 'MOST.model.controller.WHReconciliationItem',
			storeId: 'whReconcilDetailStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/whreconciliation/detail',
			}
		},
		
		whReconcilDetailGrid:{
			model: 'MOST.model.controller.WHReconciliationItem',
			storeId: 'whReconcilDetailGridStore'
		},
		
		// docList:{
		// 	model: 'MOST.model.controller.WHReconciliationItem',
		// 	storeId: 'docListStore',
		// 	proxy: {
		// 		type: 'rest',
		// 		url: MOST.config.Locale.getRestApiDestUrl() + '/v1/whreconciliation/list',
		// 	}
		// },
		
		cargoReconilCondCombo:{
			fields:['scd', 'scdNm'],
			storeId: 'cargoReconilCondCombo',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams: {
					lcd: 'MT',
					mcd: 'CGCOCD'
				}
			}
		}
	}
});