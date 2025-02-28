Ext.define('MOST.view.operation.RehandlingOfGCModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.rehandle1',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.operation.RehandlingOfGC'
	],

	data: {
		selectedItem: null
	},	
	
	stores: {
		rehandle: {
			model: 'MOST.model.operation.RehandlingOfGC',
			storeId: 'rehandleStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandlingofgc/list'
			}
		},
		
		rehandleDetailList: {
			model: 'MOST.model.operation.RehandlingOfGC',
			storeId: 'rehandleDetailListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandlingofgc/detailList'
			}
		},
		
		snBlCombo: {
			model: 'MOST.model.operation.RehandlingOfGC',
			storeId: 'rehandleComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandlingofgc/snBlComboList'
			}
		},
		
		rehandleCombo: {
			model: 'MOST.model.operation.RehandlingOfGC',
			storeId: 'rehandleComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandlingofgc/comboList'
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
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandlingofgc/rhdlShippingNoteComboList'
			}
		},
		
		rehandleOpModeNextGrNoCombo:{
			fields: ['nxCgNo'],
			storeId: 'rehandleOpModeNextGrNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/rehandlingofgc/rhdlGrNoComboList'
			}
		}
	}
});