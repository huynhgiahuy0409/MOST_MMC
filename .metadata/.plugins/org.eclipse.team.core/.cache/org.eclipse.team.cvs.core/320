Ext.define('MOST.view.document.DeliveryOrderOfVehicleModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

    alias: 'viewmodel.deliveryOrderOfVehicle',

	requires: [
	],
	
	stores: {
		listOfDeliveryOrderOfVehicle: {
			model: 'MOST.model.document.DeliveryOrderOfVehicle',
			storeId: 'listOfDeliveryOrderOfVehicleStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/deliveryorderofvehicle/list'
			}
		},
		
		listOfSubDeliveryOrderOfVehicle: {
			model: 'MOST.model.document.DeliveryOrderOfVehicle',
			storeId: 'listSubOfDeliveryOrderOfVehicleStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/deliveryorderofvehicle/subdeliveryorderofvehicle'
			}
		},
		
		blCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'blComboStore',
			proxy: {
				type: 'rest',
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
		
		assignedDriversAndTrucks: {
			model: 'MOST.model.document.DeliveryOrderOfVehicle',
			pageSize:CommonConstants.PAGE_SIZE,
			storeId: 'assignedDriversAndTrucksStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/deliveryorderofvehicle/assigneddriversandtrucks'
			}
		},
		
		assigningDriversForVehicle: {
			model: 'MOST.model.document.DeliveryOrderOfVehicle',
			pageSize:CommonConstants.PAGE_SIZE,
			storeId: 'assigningDriversForVehicleStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/deliveryorderofvehicle/assigningdriversforvehicle'
			}
		},
		
		assigningTrucksForVehicle: {
			model: 'MOST.model.document.DeliveryOrderOfVehicle',
			storeId: 'assigningTrucksForVehicleStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/deliveryorderofvehicle/assigningtrucksforvehicle'
			}
		},
	}
});
