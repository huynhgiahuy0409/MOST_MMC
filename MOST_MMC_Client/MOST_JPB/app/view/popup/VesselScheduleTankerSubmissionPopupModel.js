Ext.define('MOST.view.popup.VesselScheduleTankerSubmissionPopupModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

	alias: 'viewmodel.vesselscheduletankersubmissionpopup',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.planning.VesselSchedule',
		'MOST.model.common.FileUpload'
	],
	
	formulas:{
	},

	stores: {
		tankerSubmission:{
			model: 'MOST.model.planning.VesselSchedule',
			storeId: 'tankerSubmissionStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/vesselscheduleinternal/tankerSubmission'
			}
		},
	}
});