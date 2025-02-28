Ext.define('MOST.view.operation.WHReconciliationModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.whreconciliation',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.WHReconciliation'
	],
	
	
	stores: {
		
		categoryCombo: {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'categoryComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_CATGTP
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
			}
		},
		
		warehouseListCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'warehouseListComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_WAREHOUSE_LOC,
					locDivCd: CodeConstants.MT_LOCDIV1_WHO
				}				
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
		
		warehouseTypeCombo : {
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'warehouseTypeComboComboStore',
			proxy: {
			   type: 'rest',
			   url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
			   extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_WHTP
				}
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
		
		blNoCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'blNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BL_NO
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
		
		bookingNoCombo: { //Booking No
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'bookingNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BOOKING_NO 
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

		snNoCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'snListComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SN_NO
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
		
		whReconcilList:{
			model: 'MOST.model.operation.WHReconciliation',
			storeId: 'whReconcilListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/whreconciliation/list',
			}
		},
		
		whReconcilDetail:{
			model: 'MOST.model.operation.WHReconciliation',
			storeId: 'whReconcilDetailStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/whreconciliation/detail',
			}
		},
		
		whReconcilDetailGrid:{
			model: 'MOST.model.operation.WHReconciliation',
			storeId: 'whReconcilDetailGridStore'
		},
		
		docList:{
			model: 'MOST.model.operation.WHReconciliation',
			storeId: 'docListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/whreconciliation/list',
			}
		},
		
		cargoReconilCondCombo:{
			fields:['scd', 'scdNm'],
			storeId: 'cargoReconilCondCombo',
		},
		
		/////////////////////////////Pivot/////////////////////////////
		pivotItems: {
			model: 'MOST.model.common.export.StringValueItem',
			proxy: {
		    	 type: 'memory',
		 		reader: {
		 			type: 'json',
		 			rootProperty: 'items'
		 		}
		     },
		},
		
		pivotList: {
			model: 'MOST.model.operation.pivot.WHReconciliationPivotItem',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/whreconciliation/pivot'
			}
		}
	}
});