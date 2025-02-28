Ext.define('MOST.view.document.TruckAssignmentOfROROModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

    alias: 'viewmodel.truckAssignmentOfRORO',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.foundation.dataitem.DataItem'
	],
	
	stores: {
		truckAssignmentOfROROList: {
			model: 'MOST.model.document.TruckAssignmentOfRORO',
			storeId: 'truckAssignmentOfROROListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/truckassignmentofroro/list'
			}
		},
		
		cargoTypeCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'commonComboItemsStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_CGTP
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
		
		snCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'snComboStore',
			proxy: {
				type: 'rest',
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
		
		assignedDriversAndTrucks: {
			model: 'MOST.model.document.TruckAssignmentOfRORO',
			pageSize:CommonConstants.PAGE_SIZE,
			storeId: 'assignedDriversAndTrucksStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/truckassignmentofroro/assigneddriversandtrucks'
			}
		},
		
		assigningDriversForVehicle: {
			model: 'MOST.model.document.TruckAssignmentOfRORO',
			pageSize:CommonConstants.PAGE_SIZE,
			storeId: 'assigningDriversForVehicleStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/truckassignmentofroro/assigningdriversforvehicle'
			}
		},
		
		assigningTrucksForVehicle: {
			model: 'MOST.model.document.TruckAssignmentOfRORO',
			storeId: 'assigningTrucksForVehicleStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/truckassignmentofroro/assigningtrucksforvehicle'
			}
		},
	}
});
