Ext.define('MOST.view.operation.VesselDraftSurveyModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.vesseldraftsurvey',

	requires: ['Ext.data.proxy.Rest'],

	stores: { 

		vslDraftSurveyInfo: {
			model: 'MOST.model.operation.VesselDraftSurvey',
			id: 'vslDraftSurveyInfo',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseldraftsurvey/draftsurveyinfo',
			},
		},

		vslDraftSurveyList: {
			model: 'MOST.model.operation.VesselDraftSurvey',
			id: 'vslDraftSurveyList',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseldraftsurvey/list',
			},
		},

		vslDraftSurveyDetailList: {
			model: 'MOST.model.operation.VesselDraftSurvey',
			id: 'vslDraftSurveyList',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseldraftsurvey/detail',
			},
		},

		validation: {
			model: 'MOST.model.validation.ValidationCode',
			id: 'validation',
			pageSize: CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesseldraftsurvey/isValidated',
			},
		}
	},
});
