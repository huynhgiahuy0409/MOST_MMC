Ext.define('MOST.model.operation.pivot.WHReconciliationPivotItem', {
	extend : 'MOST.model.foundation.dataitem.DataItem',

	fields:[{
		name: 'opeClassCd', type: 'string'
	},{
		name: 'opeClassNm', type: 'string'
	},{
		name: 'vslCallId', type: 'string'
	},{
		name: 'cmdtCd', type: 'string'
	},{
		name: 'cmdtGrpCd', type: 'string'
	},{
		name: 'locId', type: 'string'
	},{
		name: 'spCaCoCd', type: 'string'
	},{
		name: 'spcacoNm', type: 'string'
	},{
		name: 'fwrAgnt', type: 'string'
	},{
		name: 'shpr', type: 'string'
	},{
		name: 'shprNm', type: 'string'
	},{
		name: 'cnsne', type: 'string'
	},{
		name: 'cnsneNm', type: 'string'
	},{
		name: 'total', type:'float' , defaulValue: 0
	}]
});