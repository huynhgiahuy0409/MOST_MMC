Ext.define('MOST.view.operation.RehandleOperationGCModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.rehandleoperationlist',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.RehandleOperationGC'
	],

	stores: {
		snBlCombo: {
			model: 'MOST.model.operation.RehandleOperationGC',
			storeId: 'rehandleComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandleoperationgc/snBlComboList'
			}
		},
		
		rehandleCombo: {
			model: 'MOST.model.operation.RehandleOperationGC',
			storeId: 'rehandleComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandleoperationgc/comboList'
			}
		},
		
		shippingNoteNonJpvcGridList: {
			model: 'MOST.model.document.ShippingNote',
			storeId: 'shippingNoteNonJpvcGridListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/shippingnoteNonVessel/shippingNoteNonVessellist'
			}
		},
		
		rehandleOperationList: {
			model: 'MOST.model.operation.RehandleOperationGC',
			storeId: 'rehandleOperationListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandleoperationgc/rehandleOperationlist'
			}
		},
		
		shiftDateList: {
			model: 'MOST.model.operation.OperationSetting',
			storeId: 'shiftDateListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargomanualctl/shiftDtList'
			}
		},
		shiftNoList: {
			model: 'MOST.model.operation.OperationSetting',
			storeId: 'shiftNoListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/cargomanualctl/shiftList'
			}
		},
		
		cargoConditionCombo: {
			fields: ['scdNm','scd']
		},
		
		categoryCombo: {
			fields: ['scdNm','scd']
		},
		
		specCargoConditionCombo: {
			fields: ['scdNm','scd']
		},
		
		rehandleModeCombo: {
			fields: ['scdNm','scd']
		},
		
		rehandleBlNoCombo:{
			fields: ['blNo']
		},
		
		rehandleSnNoCombo:{
			fields: ['shipgNoteNo']
		},
		
		rehandleNextSnNoCombo:{
			fields: ['shipgNoteNo']
		},
		
		nonJPVCSNCombo:{
			fields: ['shipgNoteNo']
		},
		
		shiftData : {
			fields: ['shiftDt','ShiftNo'],
			storeId: 'shiftDataStore',
		},
		
		rehandleBlSnNoCombo:{
			model: 'MOST.model.operation.RehandleOperationGC',
			storeId: 'rehandleBlSnNoCombo',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandleoperationgc/snBlComboList'
			}
		}
		
		
	}
});