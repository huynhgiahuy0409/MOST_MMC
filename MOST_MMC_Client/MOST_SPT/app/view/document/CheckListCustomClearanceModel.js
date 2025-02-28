Ext.define('MOST.view.document.CheckListCustomClearanceModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.checklistcustomclearance',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.document.CheckListCustomClearance'
	],
	
	stores: {
		customClearanceList: {
			model: 'MOST.model.document.CheckListCustomClearance',
			storeId: 'customClearanceListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/customclearance/list'
			}
		},
		
		exportList: {
			model: 'MOST.model.document.CheckListCustomClearance',
			storeId: 'exportListStore',
		},
		
		importList: {
			model: 'MOST.model.document.CheckListCustomClearance',
			storeId: 'importListStore',
		},
		
		transhipmentList: {
			model: 'MOST.model.document.CheckListCustomClearance',
			storeId: 'transhipmentListStore',
		}
	}
});