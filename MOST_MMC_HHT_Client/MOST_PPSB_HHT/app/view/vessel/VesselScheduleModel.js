Ext.define('MOST.view.vessel.VesselScheduleModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.vesselschedule',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.vessel.VesselSchedule',
		'MOST.model.planning.VesselSchedule',
	],
	
    formulas: {
        vesselDetailFormDisabled: function(get) {
            return (new Boolean(get('globalJpvcNo'))) == true ? false : true ;
        }
    },	
	
	stores: {

		VslCallIdPopupStore: {
			model: 'MOST.model.popup.VslCallIdPopup',
			storeId: 'VslCallIdPopupStoreId',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/vesselcalllistpopup'
			}
		},
		
		berthingListCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'vesselScheduleBerthInfoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codemaster',
				extraParams: {
					searchType: ComboboxServiceConstants.COMBO_BERTH_LOC
				}
			},
			listeners: {
				load: function(store, records) {
					store.insert(0, [{
						locNm: 'All',
						locId: ''
			        }]);
			     }
			}
		},
		
		// vesselScheduleDetailHHT: {
		// 	model:'MOST.model.planning.VesselSchedule',
		// 	storeId: 'vesselScheduleDetailHHTStore',

		// 	proxy: {
		// 		type: 'rest',
		// 		url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselscheduleinternal/vesseldetail'	
		// 	}
		// },

		vesselScheduleDetailHHT: {
			model:'MOST.model.popup.VslCallIdPopup',
			storeId: 'vesselScheduleDetailHHTStore',

			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/popup/vesselcalllistpopup'	
			}
		},

		vesseldetailHHT: {
			model:'MOST.model.vessel.VesselSchedule',
			storeId: 'vesseldetailHHTStore',

			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselinfo/vesseldetail'	
			}
		},
		
		globalShiftCombo:{
			fields: ['shftId','shftNm'],
			storeId: 'globalShiftComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/commonCode/shiftlist',
				extraParams: {
					useYn: 'Y',
					shftMethCd: 'Standard'
				}
			}
		},
		
		// HHT. Activate Operation
		/**
		 * TEST FOR YT
		 * */
		activeYT: {
			model: 'MOST.model.operation.OperationSetting',
			storeId: 'activeYTStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargomanualctl/activeyt'
			}
		},
	}
});