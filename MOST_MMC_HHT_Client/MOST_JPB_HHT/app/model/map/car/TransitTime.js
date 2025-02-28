Ext.define('MOST.model.map.car.TransitTime', {
	extend : 'MOST.model.map.foundation.dataitem.DataItem',

	fields : [ {
		name : 'vesselCode',
		type : 'string'
	}, {
		name : 'vesselName',
		type : 'string'
	}, {
		name : 'voyageNo',
		type : 'string'
	}, {
		name : 'loa',
		type : 'string'
	}, {
		name : 'width',
		type : 'string'
	}, {
		name : 'draft',
		type : 'string'
	}, {
		name : 'speedLaden',
		type : 'string'
	}, {
		name : 'buildYear',
		type : 'string'
	}, {
		name : 'speedBallast',
		type : 'string'
	}, {
		name : 'dwt',
		type : 'string'
	}, {
		name : 'grt',
		type : 'string'
	}, {
		name : 'flag',
		type : 'string'
	}, {
		name : 'flagName',
		type : 'string'
	}, {
		name : 'imoNo',
		type : 'string'
	}, {
		name : 'callSign',
		type : 'string'
	}, {
		name : 'vesselKind',
		type : 'string'
	}, {
		name : 'vesselStatus',
		type : 'string'
	}, {
		name : 'routeCode',
		type : 'string'
	}, {
		name : 'teamCode',
		type : 'string'
	}, {
		name : 'teamName',
		type : 'string'
	}, {
		name : 'latitude',
		type : 'string'
	}, {
		name : 'longitude',
		type : 'string'
	}, {
		name : 'heading',
		type : 'string'
	}, {
		name : 'speed',
		type : 'string'
	}, {
		name : 'continent',
		type : 'string'
	}, {
		name : 'customerCode',
		type : 'string'
	}, {
		name : 'customerName',
		type : 'string'
	}, {
		name : 'pod',
		type : 'string'
	}, {
		name : 'podName',
		type : 'string'
	}, {
		name : 'pol',
		type : 'string'
	}, {
		name : 'polName',
		type : 'string'
	}, {
		name : 'pvy',
		type : 'string'
	}, {
		name : 'pvyName',
		type : 'string'
	}, {
		name : 'unit',
		type : 'string'
	}, {
		name : 'onBoard',
		type : 'string'
	}, {
		name : 'eta',
		type : 'string'
	}, {
		name : 'transitTime',
		type : 'string'
	}, {
		name : 'contractedtTime',
		type : 'string'
	}, {
		name : 'diff',
		type : 'number'
	}, {
		name : 'quantity',
		type : 'number'
	//Set data from Priority Configuration		
	}, {
		name : 'customerAlias',
		type : 'string'
	}, {
		name : 'thredhold',
		type : 'number'
	}, {
		name : 'sequence',
		type : 'number'
	}, {
		name : 'kpi',
		type : 'string',
		calculate : function(data) {
			if(data.contractedtTime > 0) {
				if (data.diff <= data.thredhold) {
					return '1'; //normal
				} else {
					return '2'; //delayed
				}
			} else {
				return '3';		//No TTime
			}
		}

	} ]
});
