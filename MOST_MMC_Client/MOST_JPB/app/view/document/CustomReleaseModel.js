Ext.define('MOST.view.controller.CustomReleaseModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.customrelease',

	requires: [
		'Ext.data.proxy.Rest',
		/*'MOST.model.controller.LorryDocumentChecklist',*/
		'MOST.model.document.CheckListCustomClearance'
	],
	
	formulas:{
		
	},
	
	stores: {
		
		customRelease: {
			model: 'MOST.model.document.CheckListCustomClearance',
			storeId: 'customReleaseStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/customRelease/list'
			}
		},
		statusCombo: {
			fields: ['scd','scdNm'],
			data :  [
						{"scd":"", "scdNm":""},
						{"scd":"RELEASE", "scdNm":"Release"},
						{"scd":"HOLD", "scdNm":"Hold"}
        	]
        },
		
		statusStore: {
			fields: ['scd','scdNm'],
			data :  [
						{"scd":"", "scdNm":""},
						{"scd":"RELEASE", "scdNm":"Release"},
						{"scd":"HOLD", "scdNm":"Hold"}
        	]
        },
		
		snCombo : {
			fields: ['snNoNm','cbr']
			
		},
		blCombo : {
			fields: ['blNoNm','blNo']
			
		},
		
		blSnCombo: {
			model: 'MOST.model.document.CheckListCustomClearance',
			storeId: 'blSnComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/customRelease/blSnCombo'
			}
		}, 
	},

});