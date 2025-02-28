Ext.define('MOST.view.monitoring.AssignedTruckModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.assignedtruck',

	requires: [
		'Ext.data.proxy.Rest'
	],
	
	formulas:{
  		
	},
	
	stores: {
		assignedTruck: {
			model: 'MOST.model.monitoring.AssignedTruck',
			storeId: 'assignedLorryListStore',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/assignedtrucklist/list'
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
		
		SNNoList: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'SNNoListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SN_NO
				}
			}
		},
		
		locationList: {
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
			model: 'MOST.model.monitoring.pivot.AssignedTruckPivot',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/assignedtrucklist/pivot'
			}
		},
		
		cargoTpCombo: {
			storeId: 'cargoTpStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_CGTP
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
		
		unitNosList: {
			model: 'MOST.model.monitoring.AssignedTruck',
			id: 'unitNosListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			autoLoad:false,
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/assignedtrucklist/unitNoList'
			}
		},
		
	}
});