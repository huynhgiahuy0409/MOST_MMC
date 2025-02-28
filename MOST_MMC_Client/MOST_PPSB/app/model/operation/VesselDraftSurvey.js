Ext.define('MOST.model.operation.VesselDraftSurvey', {
	extend: 'MOST.model.foundation.dataitem.DataItem',
	fields: [
		{
			name: 'scn',
			type: 'string',
		},
		{
			name: 'vslCd',
			type: 'string',
		},
		{
			name: 'vslNm',
			type: 'string',
		},

		{
			name: 'vslCallId',
			type: 'string',
		},
		{
			name: 'numberOfCalls',
			type: 'number',
		},
		{
			name: 'weighbridgeWgt',
			type: 'number',
		},
		{
			name: 'initialReadingWgt',
			type: 'number',
		},
		{
			name: 'finalReadingWgt',
			type: 'number',
		},
		{
			name: 'draftSurveyWgt',
			type: 'number',
		},
		{
			name: 'operationWgt',
			type: 'number',
		},
		{
			name: 'rmk',
			type: 'string',
		},
		{
			name: 'surveyorId',
			type: 'string',
		},
		{
			name: 'updateDt',
			type: 'string',
		},
		{
			name: 'cgNo',
			type: 'string',
		},
		{
			name: 'tsptTpNm',
			type: 'string',
		},
	],
});
