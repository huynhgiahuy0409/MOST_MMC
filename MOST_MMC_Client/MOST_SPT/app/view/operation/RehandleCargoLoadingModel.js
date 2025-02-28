Ext.define('MOST.view.operation.RehandleCargoLoadingModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.confirmrehandleloadingpopup',

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
		
		cargoRehandlingLoadingList:{
			model:'MOST.model.operation.CargoLoading',
			storeId:'cargoRehandlingLoadingListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandlecargoloading/cargoRhdlLoadinglist'
			}
		},
		
		lorryAssignmentList:{
			model: 'MOST.model.document.TruckAssignment',
			storeId: 'lorryAssignmentListStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/truckAssignment/lorryAssignmentList'
			}
		},
		
		hatchNoCombo : {
			fields: ['hatchNo'],
			storeId: 'hatchNoComboStore',
		},
		
		modeOfOprCombo : {
			fields: ['scdNm', 'scd'],
			storeId: 'modeOfOprComboStore',
		},
		
		clearanceCombo : {
			storeId:'clearanceComboStore',
			fields: ['scdNm','scd'],
		    data :  [{"scd":"Hold", "scdNm":"Hold"},
		    	     {"scd":"Release", "scdNm":"Release"},
		    	     {"scd":"Inspection", "scdNm":"Inspection"}]
		},
		
		confirmLoadingHatchList: {
			model: 'MOST.model.operation.OperationSetting',
			storeId: 'confirmLoadingHatchListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargoloading/hatchList'
			}
		},
	}
});