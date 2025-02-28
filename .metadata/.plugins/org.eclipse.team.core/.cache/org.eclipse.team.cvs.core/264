Ext.define('MOST.view.billing.DataGatheringModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.datagathering',

	requires: [
	],

	stores: {
		dataGatheringList: {
			model: 'MOST.model.billing.DataGathering',
			storeId: 'dataGatheringGridStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/datagathering/list'
			}
		},
		
		dataGatheringDetailList: {
			model: 'MOST.model.billing.DataGathering',
			storeId: 'dataGatheringGridStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/datagathering/detaillist'
			}
		},
		
		applyDataGathering: {
			model: 'MOST.model.billing.DataGathering',
			storeId: 'applyDataGatheringStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/datagathering/apply'
			}
		},
		
		saveDataGatheringDetail: {
			model: 'MOST.model.billing.DataGathering',
			storeId: 'applyDataGatheringDetailStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/datagathering/savedetail'
			}
		},
		
		removeDataGatheringDetail: {
			model: 'MOST.model.billing.DataGathering',
			storeId: 'removeDataGatheringDetailStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/datagathering/removedetail'
			}
		},
		
		dataGatheringValidationCode: {
			model: 'MOST.model.billing.DataGathering',
			storeId: 'dataGatheringValidationCodeStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/datagathering/validationVesselSchedule',
			}
		},
		
		dataGatheringGatheredDataList:{
			model:'MOST.model.billing.DataGathering',
			storeId: 'dataGatheringGatheredDataListStore'
		},
		dataGatheringVesselInfoList:{
			model:'MOST.model.billing.DataGathering',
			storeId: 'dataGatheringVesselInfoListStore'
		},
		dataGatheringCargoInfoList:{
			model:'MOST.model.billing.DataGathering',
			storeId: 'dataGatheringCargoInfoListStore'
		},
		dataGatheringCargoSummarizeInfoList:{
			model:'MOST.model.billing.DataGathering',
			storeId: 'dataGatheringCargoSummarizeInfoListStore'
		},
		dataGatheringEquipmentInfoList:{
			model:'MOST.model.billing.DataGathering',
			storeId: 'dataGatheringEquipmentInfoListStore'
		},
		dataGatheringPayerCombo:{
			fields: ['payerName','payer'],
			storeId: 'dataGatheringPayerCombo'
		},
		
		dataGatheringUserRefNoCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'dataGatheringUserRefNoCombo',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_MBL_NO_BOOKING_NO
				}
			}
		},
		
		dataGatheringSubBlSNNoCombo:{
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'dataGatheringSubBlSNNoCombo',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_BL_NO_SN_NO
				}
			}
		},
		
		cargoTypeCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'cargoTypeComboStore',
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
		statusCombo : {
			fields: ['scdNm','scd'],
			storeId: 'ivStatusComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams: {
					lcd: 'MT',
					mcd: 'IVSTAT'
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
			// fields: ['comName','comCode'],
			// storeId: 'statusComboStore',
			// data:[
			// 	{"comName":"Select", 		"comCode":""},
			// 	{"comName":"Gathered", 		"comCode":"GT"},
			// 	{"comName":"Verified", 		"comCode":"VF"},
			// 	{"comName":"Invoiced", 		"comCode":"IV"},
			// 	{"comName":"Invoicing", 	"comCode":"II"},
			// 	{"comName":"Partial Paid", 	"comCode":"PP"},
			// 	{"comName":"Paid Complete", "comCode":"PC"},
			// 	{"comName":"No Chargeable", "comCode":"NC"}
			// ]
		},
		
		generatePDFDataGathering: {
			model:'MOST.model.billing.DataGathering',
			storeId: 'generatePDFDataGatheringStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/datagathering/previewpdfdatagathering'
			}
		},
	}
});