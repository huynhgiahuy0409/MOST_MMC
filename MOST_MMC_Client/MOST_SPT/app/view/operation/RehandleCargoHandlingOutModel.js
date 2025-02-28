Ext.define('MOST.view.operation.RehandleCargoHandlingOutModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.confirmrehandlehandlingoutpopup',

	requires: [
		'Ext.data.proxy.Rest'
	],

	stores: {
		deliveryModeCombo:{
			fields: 'MOST.model.combobox.ComboBoxService',
			storeId: 'deliveryModeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_DELVTP
				}
			}
			
		},
		
		cargoRehandlingHandlingOutList:{
			model:'MOST.model.operation.CargoHandlingOut',
			storeId:'cargoRehandlingHandlingOutListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandlecargohandlingout/cargoRhdlHandlingOutlist'
			}
		},
		
		lorryAssignmentList:{
			model: 'MOST.model.document.TruckAssignment',
			storeId: 'lorryAssignmentListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/truckAssignment/lorryAssignmentList'
			}
		},
		
	}
});