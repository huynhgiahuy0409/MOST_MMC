Ext.define('MOST.model.document.BL', {
    extend: 'MOST.model.foundation.dataitem.DataItem',
    fields: [
	    {
	    	name: 'vslCd',
	    	type: 'string'
		},{
			name: 'callSeq',
	    	type: 'string'
		},{
			name: 'callYear',
	    	type: 'string'
		},{
			name: 'vslCallId',
	    	type: 'string'
		},{
			name: 'vslNm',
	    	type: 'string'
		},{
			name: 'mfDocId',
	    	type: 'string'
		},{
			name: 'blNo',
	    	type: 'string'
		},{
			name: 'dMt',
	    	type: 'string'
		},{
			name: 'dM3',
	    	type: 'string'
		},{
			name: 'dQty',
	    	type: 'string'
		},{
			name: 'dLorryMt',
	    	type: 'string'
		},{
			name: 'dWagonMt',
	    	type: 'string'
		},{
			name: 'dConveYorMt',
	    	type: 'string'
		},{
			name: 'dPipeLineMt',
	    	type: 'string'
		},{
			name: 'iMt',
	    	type: 'string'
		},{
			name: 'iM3',
	    	type: 'string'
		},{
			name: 'iQty',
	    	type: 'string'
		},{
			name: 'iLorryMt',
	    	type: 'string'
		},{
			name: 'iWagonMt',
	    	type: 'string'
		},{
			name: 'iTsptTpCd',
	    	type: 'string'
		},{
			name: 'issueDt',
	    	type: 'string'
		},{
			name: 'cgTpCd',
	    	type: 'string'
		},{
			name: 'cmdtCd',
	    	type: 'string'
		},{
			name: 'tsptr',
	    	type: 'string'
		},{
			name: 'delvTpCd',
	    	type: 'string'
		},{
			name: 'tsptTpCd',
	    	type: 'string'
		},{
			name: 'fDest',
	    	type: 'string'
		},{
			name: 'nilMarkYn',
	    	type: 'string'
		},{
			name: 'vslCallId',
	    	type: 'string'
		},{
			name: 'wgt1',
	    	type: 'string'
		},{
			name: 'wgt2',
	    	type: 'string'
		},{
			name: 'estArrvDt',
	    	type: 'string'
		},{
			name: 'catgCd',
	    	type: 'string'
		},{
			name: 'dgSeq',
	    	type: 'string'
		},{
			name: 'pkgQty',
			type: 'string',
			convert: function (value) {
				return (value === "") ? '0' : value;
			}
		},{
			name: 'pkgTpCd',
	    	type: 'string'
		},{
			name: 'fwrd',
	    	type: 'string'
		},{
			name: 'wgt',
			type: 'string',
			convert: function (value) {
				return (value === "") ? '0' : value;
			}
		},{
			name: 'wgtUnit',
	    	type: 'string'
		},{
			name: 'vol',
	    	type: 'string'
		},{
			name: 'volUnit',
	    	type: 'string'
		},{
			name: 'gdsRmk',
	    	type: 'string'
		},{
			name: 'pol',
	    	type: 'string'
		},{
			name: 'polNm',
	    	type: 'string'
		},{
			name: 'pod',
	    	type: 'string'
		},{
			name: 'podNm',
	    	type: 'string'
		},{
			name: 'fnlPortCd',
	    	type: 'string'
		},{
			name: 'fnlPortNm',
	    	type: 'string'
		},{
			name: 'opClassCd',
	    	type: 'string'
		},{
			name: 'imdgClass',
	    	type: 'string'
		},{
			name: 'unno',
	    	type: 'string'
		},{
			name: 'imdgunno',
	    	type: 'string'
		},{
			name: 'substance',
	    	type: 'string'
		},{
			name: 'ackDt',
	    	type: 'string'
		},{
			name: 'ackBy',
	    	type: 'string'
		},{
			name: 'customsAprvDt',
	    	type: 'string'
		},{
			name: 'customsAprvStat',
	    	type: 'string'
		},{
			name: 'custDeclNo',
	    	type: 'string'
		},{
			name: 'cnsne',
	    	type: 'string'
		},{
			name: 'cnsneNm',
	    	type: 'string'
		},{
			name: 'cnsneAddr',
	    	type: 'string'
		},{
			name: 'cnsneAddr2',
	    	type: 'string'
		},{
			name: 'cnsneAddr3',
	    	type: 'string'
		},{
			name: 'cnsneAddr4',
	    	type: 'string'
		},{
			name: 'shpr',
	    	type: 'string'
		},{
			name: 'shprNm',
	    	type: 'string'
		},{
			name: 'shprAddr',
	    	type: 'string'
		},{
			name: 'shprAddr2',
	    	type: 'string'
		},{
			name: 'shprAddr3',
	    	type: 'string'
		},{
			name: 'shprAddr4',
	    	type: 'string'
		},{
			name: 'hsCode',
	    	type: 'string'
		},{
			name: 'pgkTpCdFz',
	    	type: 'string'
		},{
			name: 'nominateDt',
	    	type: 'string'
		},{
			name: 'ptnrCd',
	    	type: 'string'
		},{
			name: 'fwdNm',
	    	type: 'string'
		},{
			name: 'fwdCd',
	    	type: 'string'
		},{
			name: 'shaCd',
	    	type: 'string'
		},{
			name: 'shaNm',
	    	type: 'string'
		},{
			name: 'unitNo',
	    	type: 'string'
		},{
			name: 'brandCd',
	    	type: 'string'
		},{
			name: 'brandNm',
	    	type: 'string'
		},{
			name: 'modelCd',
	    	type: 'string'
		},{
			name: 'modelNm',
	    	type: 'string'
		},{
			name: 'roroMt',
	    	type: 'string'
		},{
			name: 'cbm',
	    	type: 'string'
		},{
			name: 'newYn',
	    	type: 'string'
		},{
			name: 'ixCd',
	    	type: 'string'
		},{
			name: 'action',
	    	type: 'string'
		},{
			name: 'roroSeq',
	    	type: 'string'
		},{
			name: 'unitItems',
	    	mapping: 'blDetailMap'
		},{
			name: 'blDtlSeq',
	    	type: 'string'
		},{
			name: 'cgWidth',
	    	type: 'string'
		},{
			name: 'cgHeight',
	    	type: 'string'
		},{
			name: 'cgLength',
	    	type: 'string'
		},{
			name: 'msrmt',
	    	type: 'string'
		},{
			name: 'hatchNo',
	    	type: 'string'
		},{
			name: 'pkgNo',
	    	type: 'string'
		},{
			name: 'cmdtGrpCd',
	    	type: 'string'
		},{
			name: 'cmdtGrpNm',
	    	type: 'string'
		},{
			name: 'cmdtCdNm',
	    	type: 'string'
		},{
			name: 'eachWgt',
	    	type: 'string'
		},{
			name: 'eachVol',
	    	type: 'string'
		},{
			name: 'voyage',
	    	type: 'string'
		},{
			name: 'docStatCd',
	    	type: 'string'
		},{
			name: 'docStatNm',
	    	type: 'string'
		},{
			name: 'parentId',
	    	type: 'string'
		},{
			name: 'parentCgTp',
	    	type: 'string'
		},{
			name: 'freighTon',
	    	type: 'string'
		},{
			name: 'notifyNm',
	    	type: 'string'
		},{
			name: 'notifyCd',
	    	type: 'string'
		},{
			name: 'notifyAddr',
	    	type: 'string'
		},{
			name: 'notifyAddr2',
	    	type: 'string'
		},{
			name: 'notifyAddr3',
	    	type: 'string'
		},{
			name: 'notifyAddr4',
	    	type: 'string'
		},{
			name: 'pkgTpNm',
	    	type: 'string'
		},{
			name: 'oldBlNo',
	    	type: 'string'
		},{
			name: 'hblNo',
	    	type: 'string'
		},{
			name: 'oldMfDocId',
	    	type: 'string'
		},{
			name: 'hsNm',
	    	type: 'string'
		},{
			name: 'insUserId',
	    	type: 'string'
		},{
			name: 'insDate',
	    	type: 'string'
		},{
			name: 'updUserId',
	    	type: 'string'
		},{
			name: 'updDate',
	    	type: 'string'
		},{
			name: 'cgTpNm',
	    	type: 'string'
		},{
			name: 'opClassNm',
	    	type: 'string'
		},{
			name: 'delvTpNm',
	    	type: 'string'
		},{
			name: 'pkgMark',
	    	type: 'string'
		},{
			name: 'blDetailItems',
	    	mapping: 'blDetailMap'
		},{
			name: 'shipCallNo',
	    	type: 'string'
		},{
			name: 'vslName',
	    	type: 'string'
		},{
			name: 'shippingAgent',
	    	type: 'string'
		},{
			name: 'status',
	    	type: 'string'
		},{
			name: 'statusNm',
	    	type: 'string'
		},{
			name: 'cancelReg',
	    	type: 'string'
		},{
			name: 'submissionDate',
	    	type: 'string'
		},{
			name: 'cgInoutTp',
	    	type: 'string'
		},{
			name: 'mfRefNo',
	    	type: 'string'
		},{
			name: 'mfRmk',
	    	type: 'string'
		},
		{
			name: 'pkgRmk',
	    	type: 'string'
		},{
			name: 'insDtm',
	    	type: 'string'
		},{
			name: 'updDtm',
	    	type: 'string'
		},{
			name: 'inbVoy',
	    	type: 'string'
		},{
			name: 'outbVoy',
	    	type: 'string'
		},{
			name: 'vslTp',
	    	type: 'string'
		},{
			name: 'vslTpNm',
	    	type: 'string'
		},{
			name: 'container',
	    	type: 'string'
		},{
			name: 'cgOpTpNm',
	    	type: 'string'
		},{
			name: 'vslFlagCd',
	    	type: 'string'
		},{
			name: 'vslFlagNm',
	    	type: 'string'
		},{
			name: 'saCorpId',
	    	type: 'string'
		},{
			name: 'saCorpNm',
	    	type: 'string'
		},{
			name: 'lastPortCd',
	    	type: 'string'
		},{
			name: 'lastPortNm',
	    	type: 'string'
		},{
			name: 'nextPortCd',
	    	type: 'string'
		},{
			name: 'nextPortNm',
	    	type: 'string'
		},{
			name: 'berthLoc',
	    	type: 'string'
		},{
			name: 'berthLocNm',
	    	type: 'string'
		},{
			name: 'freezoneYn',
	    	type: 'string'
		},{
			name: 'eta',
			type: 'string'
		},{
			name: 'etd',
			type: 'string'
		},{
			name: 'atb',
			type: 'date',
			dateFormat: 'time'
		},{
			name: 'atd',
			type: 'date',
			dateFormat: 'time'
		},{
			name: 'ata',
			type: 'date',
			dateFormat: 'time'
		},{
			name: 'terminalType',
	    	type: 'string'
		},{
			name: 'docStatApprove',
	    	type: 'string'
		},{
			name: 'locCd',
	    	type: 'string'
		},{
			name: 'locNm',
	    	type: 'string'
		},{
			name: 'shippingAgentNm',
	    	type: 'string'
		},{
			name: 'cntrCount',
	    	type: 'string'
		},{
			name: 'blCount',
	    	type: 'string'
		},{
			name: 'nilMfYN',
	    	type: 'string'
		},{
			name: 'reqType',
	    	type: 'string'
		},{
			name: 'docApprvTpCd',
	    	type: 'string'
		},{
			name: 'rtnStatus',
	    	type: 'string'
		},{
			name: 'cntrNo',
	    	type: 'string'
		},{
			name: 'size',
	    	type: 'string'
		},{
			name: 'type',
	    	type: 'string'
		},{
			name: 'cntrTypeNm',
	    	type: 'string'
		},{
			name: 'sealNo',
	    	type: 'string'
		},{
			name: 'seq',
	    	type: 'string'
		},{
			name: 'fzOprCd',
	    	type: 'string'
		},{
			name: 'fzLocCd',
	    	type: 'string'
		},{
			name: 'confirmTpCd',
	    	type: 'string'
		},{
			name: 'sCd',
	    	type: 'string'
		},{
			name: 'sCdNm',
	    	type: 'string'
		},{
			name: 'projectCargo',
	    	type: 'string'
		},{
			name: 'domesticChk',
	    	type: 'string'
		},{
			name: 'pkgDesc',
	    	type: 'string'
		},{
			name: 'pkgMt',
	    	type: 'string'
		},{
			name: 'pkgM3',
	    	type: 'string'
		},{
			name: 'width',
	    	type: 'string'
		},{
			name: 'height',
	    	type: 'string'
		},{
			name: 'length',
	    	type: 'string'
		},{
			name: 'opeClassCd',
	    	type: 'string'
		},{
			name: 'validYn',
			type: 'boolean',
			convert: function (value) {
				if(value === "Y" || value === true){
					return true;
				}else{
					false;
				}
				
			}
		},{
			name: 'actlQty', type:'string',
			convert: function (value) {
				return (value === "") ? '0' : value;
			}
		},
		{
			name: 'diffQty', type:'string',
			convert: function (value) {
				return (value === "") ? '0' : value;
			}
		},
		{
			name: 'actlWgt', type:'string',
			convert: function (value) {
				return (value === "") ? '0' : value;
			}
		},
		{
			name: 'diffWgt', type:'string',
			convert: function (value) {
				return (value === "") ? '0' : value;
			}
		},
		
		{
			name: 'actlMsr', type:'string',
			convert: function (value) {
				return (value === "") ? '0' : value;
			}
		},
		{
			name: 'diffMsr', type:'string',
			convert: function (value) {
				return (value === "") ? '0' : value;
			}
		},
		{
			name: 'orgMgr', type:'string',
			convert: function (value) {
				return (value === "") ? '0' : value;
			}
		}, {
			name:'uploadItems',
			mapping: 'fileUploadMap'
		},
		{
			name: 'pkgItems',
			mapping: 'OwnArrayMap'
		},
		{
			name: 'wgtChk',
			mapping: 'string'
		},
		{
			name: 'markNo',
			type: 'string'
		},
		{
			name: 'orgBlNo',
			type: 'string'
		},
		{
			name: 'orgCgWgt',
			type: 'string'
		},
		{
			name: 'orgCgVol',
			type: 'string'
		},
		{
			name: 'orgPkgQty',
			type: 'string'
		},
		{
			name: 'splitCgWgt',
			type: 'string'
		},
		{
			name: 'splitCgVol',
			type: 'string'
		},
		{
			name: 'splitPkgQty',
			type: 'string'
		},
		{
			name: 'changeSplit',
			type: 'string'
		},
		{
			name: 'bondedWhYn',
			type: 'string'
		},
		{
			name: 'additionalChk',
			type: 'string'
		},
		{
			name: 'lotNo',
			type: 'string'
		},
		{
			name: 'disWgt',
			type: 'string'
		},
		{
			name: 'disVol',
			type: 'string'
		},
		{
			name: 'disPkgQty',
			type: 'string'
		},
		{
			name: 'arrvSaId',
			type: 'string'
		}
	],
	associations: [{
		type: 'hasMany',
		name: 'fileUploadMap',
		model: 'MOST.model.common.FileUpload'
	}],
	associations: [{
		type: 'hasMany',
		name: 'blDetailMap',
		model: 'MOST.model.document.BL'
	}]
});