Ext.define('MOST.view.popup.UnitNosListForROROModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.unitnoforrorolistpopup',

	requires: [
		'Ext.data.proxy.Rest',
	],
	
	stores: {
		unitNosList: {
			model: 'MOST.model.planning.RoRoYardPlan',
			id: 'unitNosListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			autoLoad:false,
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/roroyardplan/unitlist'
			}
		},
		getJobRORO: {
			model: 'MOST.model.operation.CargoJob',
			id: 'getJobROROStore',
			pageSize:CommonConstants.PAGE_SIZE,
			autoLoad:false,
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/cargojob/list'
			}
		},
		
		unitNosListWHCheckImport: {
			model: 'MOST.model.planning.RoRoYardPlan',
			id: 'unitNosListWHCheckImportStore',
			pageSize:CommonConstants.PAGE_SIZE,
			autoLoad:false,
			proxy : {
				type : 'rest',
				url : MOST.config.Locale.getRestApiDestUrl() + '/v1/roroyardplan/unitlistforwhimport'
			}
		},
	}
});