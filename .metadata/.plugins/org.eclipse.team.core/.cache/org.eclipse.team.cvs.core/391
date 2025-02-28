Ext.define('MOST.view.operation.RehandleGCModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.rehandle',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.RehandleGC'
	],

	data: {
		selectedItem: null
	},	
	
	stores: {
		rehandle: {
			model: 'MOST.model.operation.RehandleGC',
			storeId: 'rehandleStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandleGC/list'
			}
		},
		
		rehandleDetailList: {
			model: 'MOST.model.operation.RehandleGC',
			storeId: 'rehandleDetailListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandleGC/detailList'
			}
		},
		
		snBlCombo: {
			model: 'MOST.model.operation.RehandleGC',
			storeId: 'rehandleComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandleGC/snBlComboList'
			}
		},
		
		rehandleCombo: {
			model: 'MOST.model.operation.RehandleGC',
			storeId: 'rehandleComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandleGC/comboList'
			}
		},

		commodityGroupCombo: {
			fields: ['scdNm','scd'],
			model: 'MOST.model.operation.RehandleGC',
			storeId: 'commodityGroupComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandleGC/commoditygroupcombolist'
			}
		},

		commodityCodeCombo: {
			model: 'MOST.model.operation.RehandleGC',
			storeId: 'commodityCodeComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandleGC/commoditycodecombolist'
			}
		},
		
		categoryCombo: {
			fields: ['scdNm','scd']
		},
		
		rehandleModeSearchCombo: {
			fields: ['scdNm','scd']
		},
		
		rehandleModeCombo: {
		},
		
		rehandleMasterBlNoCombo:{
			fields: ['mfdocidNm', 'mfdocid']
		},
		
		rehandleBookingNoCombo:{
			fields: ['mfDocIdNm', 'mfDocId']
		},

		rehandleBlNoCombo:{
			fields: ['scdNm', 'blNo']
		},
		
		rehandleSnNoCombo:{
			fields: ['scdNm', 'shipgNoteNo']
		},
		
		rehandleNextSnNoCombo:{
			fields: ['scdNm', 'shipgNoteNo']
		},
		
		rehandleOpModeNextSnNoCombo:{
			fields: ['shipgNoteNo'],
			storeId: 'rehandleOpModeNextSnNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandleGC/rhdlShippingNoteComboList'
			}
		},
		
		rehandleOpModeNextGrNoCombo:{
			fields: ['nxCgNo'],
			storeId: 'rehandleOpModeNextGrNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandleGC/rhdlGrNoComboList'
			}
		},
		
		unitsStackedListStore:{
			model: 'MOST.model.planning.RoRoYardPlan',
			storeId: 'unitsStackedListStoreStore',
			proxy: {
				type: 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandleGC/unitlist'
			}
		},
		
		rehandleROROOperationModeStore:{
			model: 'MOST.model.operation.RehandlingOfRORO',
			storeId: 'rehandleROROOperationModeStoreStore',
			proxy: {
				type: 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandlingofroro/rehandlingUnitList'
			}
		},
		
		rehandlingUnitItems: {
			model: 'MOST.model.operation.RehandlingOfRORO',
			storeId: 'rehandlingUnitItemsStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandlingofroro/rehandlingUnitList'
			}
		},
		
		validationCheck: {
			storeId: 'validationCheck',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/validationcode/list',
				
			}
		},

		//sMantis: 0166809
		lorryAssignmentGridList: {
			model: 'MOST.model.document.TruckAssignment',
			storeId: 'lorryAssignmentGridListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/truckAssignment/lorryassignmentinquiry'
			}
		}
		//eMantis: 0166809
	}
});