Ext.define('MOST.model.document.TerminalHoldReleaseControl', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields : [ 
		{
			name : 'vslCallId',
			type : 'string'
		}, {
			name : 'vslNm',
			type : 'string'
		}, {
			name : 'vslCd',
			type : 'string'
		}, {
			name : 'callYear',
			type : 'string'
		}, {
			name : 'callSeq',
			type : 'string'
		}, {
			name : 'scn',
			type : 'string'
		}, {
			name : 'masterBl',
			type : 'string'
		}, {
			name : 'bookingNo',
			type : 'string'
		}, {
			name : 'docNo',
			type : 'string'
		}, {
			name : 'holdCheck',
			type : 'boolean'
		}, {
			name : 'holdReasonCd',
			type : 'string'
		},
	
		{
			name : 'holdBy',
			type : 'string'
		}, {
			name : 'holdDt',
			type : 'string'
		},
	
		{
			name : 'releaseCheck',
			type : 'boolean'
		}, {
			name : 'releaseDt',
			type : 'string'
		}, {
			name : 'releaseBy',
			type : 'string'
		}, {
			name : 'ie',
			type : 'string'
		}, {
			name : 'mt',
			type : 'string'
		}, {
			name : 'pol',
			type : 'string'
		}, {
			name : 'pod',
			type : 'string'
		},
	
		{
			name : 'remark',
			type : 'string'
		}, {
			name : 'holdReasonDesc',
			type : 'string'
		}, {
			name : 'seq',
			type : 'string'
		}, {
			name : 'cudFlag',
			type : 'string'
		},
	
		{
			name : 'cgNo',
			type : 'string'
		}, {
			name : 'cd',
			type : 'string'
		}, {
			name : 'cdNm',
			type : 'string'
		}, {
			name : 'sunatYn',
			type : 'string'
		}, {
			name : 'vinNo',
			type : 'string'
		},
	
		// add Hold Remark, Release Remark
		{
			name : 'holdRemark',
			type : 'string'
		}, {
			name : 'releaseRemark',
			type : 'string'
		},
	
		{
			name : 'opToBeStopped',
			type : 'string'
		}, {
			name : 'opToBeStoppedNm',
			type : 'string'
		},
	
		{
			name : 'yardLoc',
			type : 'string'
		}, {
			name : 'ableToReleaseYn',
			type : 'string'
		}
	]
})