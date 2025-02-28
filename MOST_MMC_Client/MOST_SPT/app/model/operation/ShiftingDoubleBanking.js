Ext.define('MOST.model.operation.ShiftingDoubleBanking', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [{
		name: 'workingStatus',
		type: 'string'
	},{
		name: 'searchType',
		type: 'string'
	},{
		name: 'no',
		type: 'string'
	},{
		name: 'cgOptTpCd',
		type: 'string'
	},{
		name: 'vslCallId',
		type: 'string'
	},{
		name: 'seq',
		type: 'string'
	},{
		name: 'stDt',
		type: 'string',
		calculate: function (data) {
			if(data.stDate){
				return Ext.Date.format(new Date(data.stDate), 'd/m/Y H:i');
			}
		}
	},{
		name: 'endDt',
		type: 'string',
		calculate: function (data) {
			if(data.endDate){
				return Ext.Date.format(new Date(data.endDate), 'd/m/Y H:i');
			}
		}
	},{
		name: 'userId',
		type: 'string'
	},{
		name: 'dblBnkDivCd',
		type: 'string'
	},{
		name: 'vslCd',
		type: 'string'
	},{
		name: 'callYear',
		type: 'string'
	},{
		name: 'callSeq',
		type: 'string'
	},{
		name: 'berthLoc',
		type: 'string'
	},{
		name: 'loa',
		type: 'string'
	},{
		name: 'atb',
		type: 'string'
	},{
		name: 'atu',
		type: 'string'
	},{
		name: 'dblBnkShip1',
		type: 'string'
	},{
		name: 'dblBnkShip1Nm',
		type: 'string'
	},{
		name: 'ship1Loa',
		type: 'string'
	},{
		name: 'ship1AtbDt',
		type: 'date'
	},{
		name: 'ship1Atb',
		type: 'string',
		calculate: function (data) {
			if(data.ship1AtbDt){
				return Ext.Date.format(new Date(data.ship1AtbDt), 'd/m/Y H:i');
			}
		}
	},{
		name: 'ship1AtwDt',
		type: 'date'
	},{
		name: 'ship1Atw',
		type: 'string',
		calculate: function (data) {
			if(data.ship1AtwDt){
				return Ext.Date.format(new Date(data.ship1AtwDt), 'd/m/Y H:i');
			}
		}
	},{
		name: 'ship1AtcDt',
		type: 'date'
	},{
		name: 'ship1Atc',
		type: 'string',
		calculate: function (data) {
			if(data.ship1AtcDt){
				return Ext.Date.format(new Date(data.ship1AtcDt), 'd/m/Y H:i');
			}
		}
	},{
		name: 'ship1AtuDt',
		type: 'date'
	},{
		name: 'ship1Atu',
		type: 'string',
		calculate: function (data) {
			if(data.ship1AtuDt){
				return Ext.Date.format(new Date(data.ship1AtuDt), 'd/m/Y H:i');
			}
		}
	},{
		name: 'stDate',
		type: 'date'
	},{
		name: 'endDate',
		type: 'date'
	},{
		name: 'ship1VslCd',
		type: 'string'
	},{
		name: 'ship1CallYear',
		type: 'string'
	},{
		name: 'ship1CallSeq',
		type: 'string'
	},{
		name: 'dblBnkShip2',
		type: 'string'
	},{
		name: 'dblBnkShip2Nm',
		type: 'string'
	},{
		name: 'ship2Loa',
		type: 'string'
	},{
		name: 'ship2AtbDt',
		type: 'date'
	},{
		name: 'ship2Atb',
		type: 'string',
		calculate: function (data) {
			if(data.ship2AtbDt){
				return Ext.Date.format(new Date(data.ship2AtbDt), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			}
		}
	},{
		name: 'ship2AtwDt',
		type: 'date'
	},{
		name: 'ship2Atw',
		type: 'string',
		calculate: function (data) {
			if(data.ship2AtwDt){
				return Ext.Date.format(new Date(data.ship2AtwDt), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			}
		}
	},{
		name: 'ship2AtcDt',
		type: 'date'
	},{
		name: 'ship2Atc',
		type: 'string',
		calculate: function (data) {
			if(data.ship2AtcDt){
				return Ext.Date.format(new Date(data.ship2AtcDt), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			}
		}
	},{
		name: 'ship2AtuDt',
		type: 'date'
	},{
		name: 'ship2Atu',
		type: 'string',
		calculate: function (data) {
			if(data.ship2AtuDt){
				return Ext.Date.format(new Date(data.ship2AtuDt), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			}
		}
	},{
		name: 'ship2VslCd',
		type: 'string'
	},{
		name: 'ship2CallYear',
		type: 'string'
	},{
		name: 'ship2CallSeq',
		type: 'string'
	},{
		name: 'remark',
		type: 'string'
	},{
		name: 'dblBnkDivCdNm',
		type: 'string'
	},{
		name: 'prevBerthNo',
		type: 'string'
	},{
		name: 'prevWharfMarkFm',
		type: 'string'
	},{
		name: 'prevWharfMarkTo',
		type: 'string'
	},{
		name: 'nextCalCallId',
		type: 'string'
	},{
		name: 'stsOpTp',
		type: 'string'
	},{
		name: 'mt',
		type: 'string'
	},{
		name: 'm3',
		type: 'string'
	},{
		name: 'qty',
		type: 'string'
	},{
		name: 'hatchNo',
		type: 'string'
	},{
		name: 'cmdtCd',
		type: 'string'
	},{
		name: 'pkgTpCd',
		type: 'string'
	},{
		name: 'rmk',
		type: 'string'
	},{
		name: 'hatchDrtCd', //FP/AP
		type: 'string'
	},{
		name: 'cmdtNm',
		type: 'string'
	},{
		name: 'pkgTpNm',
		type: 'string'
	},{
		name: 'currWharf',
		type: 'string'
	},{
		name: 'currWharfMakrFm',
		type: 'string'
	},{
		name: 'currWharfMakrTo',
		type: 'string'
	},{
		name: 'reqr', //requestor
		type: 'string'
	},{
		name: 'nxBerthNo',
		type: 'string'
	},{
		name: 'wharfMarkFm',
		type: 'string'
	},{
		name: 'wharfMarkTo',
		type: 'string'
	},{
		name: 'berthAlongside', //Shifting Position
		type: 'string'
	},{
		name: 'rsnCd', // Reaon Code
		type: 'string'
	},{
		name: 'rsnNm', // Reaon Name
		type: 'string'
	},{
		name: 'pilotYn',
		type: 'string'
	},{
		name: 'mooring',
		type: 'string'
	},{
		name: 'tug',
		type: 'string'
	},{
		name: 'wharfMark',
		type: 'string'
	},{
		name: 'berthAlongsideNm',
		type: 'string'
	},{
		name: 'stcrDiv',// Stevedore / Ship Crew
		type: 'string'
	},{
		name: 'nextHatchNo', // NEXT HATCH NO
		type: 'string'
	},{
		name: 'sftTp', // SHIFTING TYPE
		type: 'string'
	},{
		name: 'sftTpNm', 
		type: 'string'
	},{
		name: 'svcId',
		type: 'string'
	},{
		name: 'cgTpCd',
		type: 'string'
	},{
		name: 'cgTpNm',
		type: 'string'
	},{
		name: 'dirtyYn',
		type: 'string'
	},{
		name: 'vslShiftingSeq',
		type: 'string'
	},{
		name:'berthCd',
		type:'string'
	},{
		name:'docMt',
		type:'float'
	},{
		name:'docM3',
		type:'float'
	},{
		name:'docQty',
		type:'float'
	},{
		name:'balMt',
		type:'float',
		// calculate: function (data) {
		// 	var docMT = 0, actMT = 0;
		// 	if(data.docMt){
		// 		docMT = parseFloat(data.docMt);
		// 	}
		// 	if(data.mt){
		// 		actMT = parseFloat(data.mt);
		// 	}
		// 	return docMT - actMT;
		// }
	},{
		name:'balM3',
		type:'float',
		// calculate: function (data) {
		// 	var docM3 = 0, actM3 = 0;
		// 	if(data.docM3){
		// 		docM3 = parseFloat(data.docM3);
		// 	}
		// 	if(data.m3){
		// 		actM3 = parseFloat(data.m3);
		// 	}
		// 	return docM3 - actM3;
		// }
	},{
		name:'balQty',
		type:'float',
		// calculate: function (data) {
		// 	var docQty = 0, actQty = 0;
		// 	if(data.docQty){
		// 		docQty = parseFloat(data.docQty);
		// 	}
		// 	if(data.qty){
		// 		actQty = parseFloat(data.qty);
		// 	}
		// 	return docQty - actQty;
		// }
	},{
		name: 'prevAtb',
		type: 'string',
		calculate: function (data) {
			if(data.prevAtbDate){
				return Ext.Date.format(new Date(data.prevAtbDate), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			}
		}
	},{
		name: 'prevAtu',
		type: 'string',
		calculate: function (data) {
			if(data.prevAtuDate){
				return Ext.Date.format(new Date(data.prevAtuDate), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			}
		}
	},{
		name: 'atuDt',
		type: 'string',
		calculate: function (data) {
			if(data.atuDate){
				return Ext.Date.format(new Date(data.atuDate), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			}
		}
	},{
		name: 'atbDt',
		type: 'string',
		calculate: function (data) {
			if(data.atbDate){
				return Ext.Date.format(new Date(data.atbDate), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			}
		}
	},{
		name: 'atw',
		type: 'string',
		calculate: function (data) {
			if(data.atwDate){
				return Ext.Date.format(new Date(data.atwDate), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			}
		}
	},{
		name: 'atc',
		type: 'string',
		calculate: function (data) {
			if(data.atcDate){
				return Ext.Date.format(new Date(data.atcDate), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			}
		}
	},{
		name: 'prevAtbDate',
		type: 'date'
	},{
		name: 'prevAtuDate',
		type: 'date'
	},{
		name: 'atuDate',
		type: 'date'
	},{
		name: 'atbDate',
		type: 'date'
	},{
		name: 'atwDate',
		type: 'date'
	},{
		name: 'atcDate',
		type: 'date'
	},
	{
		name: 'stDtNoSecond',
		type: 'string'
	},{
		name: 'endDtNoSecond',
		type: 'string'
	},
	{
		name: 'ship1AtbNoSecond',
		type: 'string'
	},
	{
		name: 'ship1AtwNoSecond',
		type: 'string'
	},
	{
		name: 'ship1AtcNoSecond',
		type: 'string'
	},
	{
		name: 'ship1AtuNoSecond',
		type: 'string'
	},	
	{
		name: 'ship2AtbNoSecond',
		type: 'string'
	},{
		name: 'ship2AtwNoSecond',
		type: 'string'
	},
	{
		name: 'ship2AtcNoSecond',
		type: 'string'
	},{
		name: 'ship2AtuNoSecond',
		type: 'string'
	},
	{
		name: 'prevAtbNoSecond',
		type: 'string'
	},{
		name: 'prevAtuNoSecond',
		type: 'string'
	},{
		name: 'atuDtNoSecond',
		type: 'string'
	},{
		name: 'atbDtNoSecond',
		type: 'string'
	},{
		name: 'atwNoSecond',
		type: 'string'
	},{
		name: 'atcNoSecond',
		type: 'string'
	},{
		name: 'dblBnkShip3',
		type: 'string'
	},{
		name: 'dblBnkShip3Nm',
		type: 'string'
	},{
		name: 'ship3Loa',
		type: 'string'
	},{
		name: 'ship3AtbDt',
		type: 'date'
	},{
		name: 'ship3Atb',
		type: 'string',
		calculate: function (data) {
			if(data.ship3AtbDt){
				return Ext.Date.format(new Date(data.ship3AtbDt), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			}
		}
	},{
		name: 'ship3AtwDt',
		type: 'date'
	},{
		name: 'ship3Atw',
		type: 'string',
		calculate: function (data) {
			if(data.ship3AtwDt){
				return Ext.Date.format(new Date(data.ship3AtwDt), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			}
		}
	},{
		name: 'ship3AtcDt',
		type: 'date'
	},{
		name: 'ship3Atc',
		type: 'string',
		calculate: function (data) {
			if(data.ship3AtcDt){
				return Ext.Date.format(new Date(data.ship3AtcDt), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			}
		}
	},{
		name: 'ship3AtuDt',
		type: 'date'
	},{
		name: 'ship3Atu',
		type: 'string',
		calculate: function (data) {
			if(data.ship3AtuDt){
				return Ext.Date.format(new Date(data.ship3AtuDt), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			}
		}
	},{
		name: 'ship3VslCd',
		type: 'string'
	},{
		name: 'ship3CallYear',
		type: 'string'
	},{
		name: 'ship3CallSeq',
		type: 'string'
	},	
	{
		name: 'ship3AtbNoSecond',
		type: 'string'
	},{
		name: 'ship3AtwNoSecond',
		type: 'string'
	},
	{
		name: 'ship3AtcNoSecond',
		type: 'string'
	},{
		name: 'ship3AtuNoSecond',
		type: 'string'
	},
	{
		name: 'blSnNo',
		type: 'string'
	},
	{
		name: 'blNo',
		type: 'string'
	},
	{
		name: 'snNo',
		type: 'string'
	}
	
	]
});