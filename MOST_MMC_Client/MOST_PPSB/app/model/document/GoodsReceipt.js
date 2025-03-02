Ext.define('MOST.model.document.GoodsReceipt', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'gdsRecvNo',
			type:'string'
		},
		{
			name:'vslCallId',
			type:'string'
		},
		{
			name:'scn',
			type:'string'
		},
		{
			name:'shipgNoteNo',
			type:'string'
		},
		{
			name:'shipgNoteNoNm',
			type:'string'
		},
		{
			name:'tsptTpCd',
			type:'string'
		},
		{
			name:'lorryId',
			type:'string'
		},
		{
			name:'snWgt',
			type:'string'
		},
		{
			name:'cgWgt',
			type:'string'
		},
		{
			name:'grWgt',
			type:'string'
		},
		{
			name:'measurement',
			type:'string'
		},
		{
			name:'pkgQty',
			type:'string'
		},
		{
			name:'grMsrmt',
			type:'string'
		},
		{
			name:'grQty',
			type:'string'
		},
		{
			name:'pkgTpCd',
			type:'string'
		},
		{
			name:'cmdtCd',
			type:'string'
		},
		{
			name:'cmdtCdNm',
			type:'string'
		},
		{
			name:'snRmk',
			type:'string'
		},
		{
			name:'grRmk',
			type:'string'
		},
		{
			name:'sumitDt',
			type:'string'
		},
		{
			name:'estArrvDt',
			type:'string'
		},
		{
			name:'cbrNo',
			type:'string'
		},
		{
			name:'shipgAgnt',
			type:'string'
		},
		{
			name:'shipgAgntNm',
			type:'string'
		},
		{
			name:'saAddr',
			type:'string'
		},
		{
			name:'fwrAgnt',
			type:'string'
		},
		{
			name:'tsptr',
			type:'string'
		},
		{
			name:'tsptrNm',
			type:'string'
		},
		{
			name:'shpr',
			type:'string'
		},
		{
			name:'shprNm',
			type:'string'
		},
		{
			name:'shprAddr',
			type:'string'
		},
		{
			name:'sumitBy',
			type:'string'
		},
		{
			name:'cnsneNm',
			type:'string'
		},
		{
			name:'cgTpCd',
			type:'string'
		},
		{
			name:'imdg',
			type:'string'
		},
		{
			name:'unno',
			type:'string'
		},
		{
			name:'eta',
			type:'string'
		},
		{
			name:'etd',
			type:'string'
		},
		{
			name:'etb',
			type:'string'
		},
		{
			name:'berthLoc',
			type:'string'
		},
		{
			name:'whLoc',
			type:'string'
		},
		{
			name:'delvTpCd',
			type:'string'
		},
		{
			name:'delvTpNm',
			type:'string'
		},
		{
			name:'vslCd',
			type:'string'
		},
		{
			name:'vslNm',
			type:'string'
		},
		{
			name:'inbVoy',
			type:'string'
		},
		{
			name:'outbVoy',
			type:'string'
		},
		{
			name:'imdgUnno',
			type:'string'
		},
		{
			name:'portOfDis',
			type:'string'
		},
		{
			name:'sumQty',
			type:'string'
		},
		{
			name:'sumMt',
			type:'string'
		},
		{
			name:'sumM3',
			type:'string'
		},
		{
			name:'seq',
			type:'string'
		},
		{
			name:'tsptCompNm',
			type:'string'
		},
		{
			name:'gateInDt',
			type:'string'
		},
		{
			name:'gateOutDt',
			type:'string'
		},
		{
			name:'arrvQty',
			type:'string'
		},
		{
			name:'grTsptTpCd',
			type:'string'
		},
		{
			name:'grTsptTpCdNm',
			type:'string'
		},
		{
			name:'oldGrTsptTpCd',
			type:'string'
		},
		{
			name:'userId',
			type:'string'
		},
		{
			name:'tsptTpCdNm',
			type:'string'
		},
		{
			name:'pkgTpCdNm',
			type:'string'
		},
		{
			name:'cgTpCdNm',
			type:'string'
		},
		{
			name:'no',
			type:'string'
		},
		{
			name:'grSumitDt',
			type:'string'
		},
		{
			name:'sumGrQty',
			type:'string'
		},
		{
			name:'sumGrMt',
			type:'string'
		},
		{
			name:'sumGrM3',
			type:'string'
		},
		{
			name:'totGrQty',
			type:'string'
		},
		{
			name:'totGrMt',
			type:'string'
		},
		{
			name:'totGrM3',
			type:'string'
		},
		{
			name:'cnsneAddr',
			type:'string'
		},
		{
			name:'fwrdSumitDt',
			type:'string'
		},
		{
			name:'updDt',
			type:'string'
		},
		{
			name:'delvTpCdNm',
			type:'string'
		},
		{
			name:'loadEndTime',
			type:'string'
		},
		{
			name:'pkgRecivedTime',
			type:'string'
		},
		{
			name:'grQty1',
			type:'string'
		},
		{
			name:'grMsrmt1',
			type:'string'
		},
		{
			name:'grWgt1',
			type:'string'
		},
		{
			name:'goStat',
			type:'string'
		},
		{
			name:'wgtWegon',
			type:'string'
		},
		{
			name:'releaseNo',
			type:'string'
		},
		{
			name:'receiveNum',
			type:'string'
		},
		{
			name:'jpGroup',
			type:'string'
		},
		{
			name:'pkgNo',
			type:'string'
		},
		{
			name:'snDtlWgt',
			type:'string'
		},
		{
			name:'snDtlQty',
			type:'string'
		},
		{
			name:'curPage',
			type:'string'
		},
		{
			name:'totalPage',
			type:'string'
		},
		{
			name:'rn',
			type:'string'
		},
		{
			name:'chk',
			type:'string'
		},
		{
			name:'lorryNo',
			type:'string'
		},
		{
			name:'driverId',
			type:'string'
		},
		{
			name:'driverNm',
			type:'string'
		},
		{
			name:'licsNo',
			type:'string'
		},
		{
			name:'licsExprYmd',
			type:'string'
		},
		{
			name:'statCD',
			type:'string'
		},
		{
			name:'depSaId',
			type:'string'
		},
		{
			name:'arrvSaId',
			type:'string'
		},
		{
			name:'storLoc',
			type:'string'
		},
		{ 
			name: 'voyage',
			type:'string'
		},
		{
			name:'mfDocId',
			type:'string'
		},
		{
			name:'balanceQty',
			type:'string'
		},
		{
			name:'releasedQty',
			type:'string'
		},
		{
			name:'releaseBalQty',
			type:'string'
		},
		{ 
			name: 'damNo',
			type:'string'
		},
		{ 
			name: 'eachWgt',
			type:'string'
		},
		{ 
			name: 'eachVol',
			type:'string'
		},
		{ 
			name: 'domesticChk',
			type:'string'
		},
		{ 
			name: 'additionalChk',
			type:'string'
		},
		{ 
			name: 'wgtChk',
			type:'string'
		},
		{ 
			name: 'pkgDesc',
			type:'string'
		},
		{ 
			name: 'pkgMt',
			type:'string'
		},
		{ 
			name: 'pkgM3',
			type:'string'
		},
		{ 
			name: 'width',
			type:'string'
		},
		{ 
			name: 'height',
			type:'string'
		},
		{ 
			name: 'length',
			type:'string'
		},
		{ 
			name: 'projectCargo',
			type:'string'
		},
		{ 
			name: 'catgCd',
			type:'string'
		},
		{ 
			name: 'catgCdNm',
			type:'string'
		},
		{ 
			name: 'whtChk',
			type:'string'
		},
		{ 
			name: 'validDate',
			type:'string'
		},
		{ 
			name: 'grWgtReport',
			type:'string'
		},
		{ 
			name: 'grVoltReport',
			type:'string'
		},
		{ 
			name: 'grQtyReport',
			type:'string'
		},
		{ 
			name: 'grBalWgtReport',
			type:'string'
		},
		{
			name: 'pkgItems',
			mapping: 'OwnArrayMap'
		},
		{ 
			name: 'rtsLocId',
			type:'string'
		},
		{ 
			name: 'rtsLocNm',
			type:'string'
		},
		{ 
			name: 'scn',
			type:'string'
		},
	]
});