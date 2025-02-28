Ext.define('MOST.model.popup.PopupService', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [{
		name:'searchType',
		type:'string'
	},
	{
		name:'ptnrName',
		type:'string'
	},
	{
		name:'ptnrType',
		type:'string'
	},
	{
		name:'ptnrCode',
		type:'string'
	},
	{
		name:'ptnrTpNm',
		type:'string'
	},
	{
		name:'addr',
		type:'string'
	},
	{
		name:'representative',
		type:'string'
	}, 
	{
		name: 'holdChk',
		type: 'string'
	},
	{
		name: 'accountNo',
		type: 'string'
	},
	{
		name: 'accountHold',
		type: 'string'
	}, 
	{
		name: 'telNo',
		type: 'string'
	}, 
	{
		name: 'faxNo',
		type: 'string'
	}, 
	{
		name: 'accNo',
		type: 'string'
	}, 
	{
		name: 'paymentType',
		type: 'string'
	}, 
	{
		name: 'code',
		type: 'string'
	}, 
	{
		name: 'codeName',
		type: 'string'
	},
	{
		name: 'codeType',
		type: 'string'
	}, 
	{
		name: 'codeDesc',
		type: 'string'
	},
	{
		name: 'authGrp',
		type: 'string'
	},
	{
		name: 'authGrpName',
		type: 'string'
	},
	{
		name: 'addr1',
		type: 'string'
	},
	{
		name: 'addr2',
		type: 'string'
	},
	{
		name: 'addr3',
		type: 'string'
	},
	{
		name: 'addr4',
		type: 'string'
	},
	{
		name: 'cmmdCode',
		type: 'string'
	},
	{
		name: 'cmmdName',
		type: 'string'
	},
	{
		name: 'cmmdTpCd',
		type: 'string'
	},
	{
		name: 'cmmdGrpCode',
		type: 'string'
	},
	{
		name: 'cmmdGrpName',
		type: 'string'
	},
	{
		name: 'countryCode',
		type: 'string'
	},
	{
		name: 'countryName',
		type: 'string'
	},
	{
		name: 'portCode',
		type: 'string'
	},
	{
		name: 'portName',
		type: 'string'
	},
	{
		name: 'unno',
		type: 'string'
	},
	{
		name: 'classLevel',
		type: 'string'
	},
	{
		name: 'substance',
		type: 'string'
	},
	{
		name: 'lorryNo',
		type: 'string'
	},
	{
		name: 'lorryId',
		type: 'string'
	},
	{
		name: 'transportName',
		type: 'string'
	},
	{
		name: 'driverId',
		type: 'string'
	},
	{
		name: 'driverName',
		type: 'string'
	},
	{
		name: 'licenseNo',
		type: 'string'
	},
	{
		name: 'licenseExpired',
		type: 'string'
	},
	{
		name: 'plateNo',
		type: 'string'
	},
	{
		name: 'allowWgt',
		type: 'string'
	},
	{
		name: 'tareWgt',
		type: 'string'
	},
	{
		name: 'vslCallId',
		type: 'string'
	},
	{
		name: 'shipgNoteNo',
		type: 'string'
	},
	{
		name: 'blNo',
		type: 'string'
	},
	{
		name:'yardLoc',
		type:'string'
	},
	{
		name: 'mt',
		type: 'string'
	},
	{
		name: 'm3',
		type: 'string'
	},
	{
		name: 'pkgQty',
		type: 'string'
	},
	{
		name: 'location',
		type: 'string'
	},
	{
		name: 'mfDocId',
		type: 'string'
	},
	{
		name: 'gateInDate',
		type: 'string'
	},
	{
		name: 'packageNo',
		type: 'string'
	},
	{
		name: 'packageDesc',
		type: 'string'
	},
	{
		name: 'length',
		type: 'string'
	},
	{
		name: 'width',
		type: 'string'
	},
	{
		name: 'height',
		type: 'string'
	},
	{
		name: 'remarks',
		type: 'string'
	},
	{
		name: 'bargeNo',
		type: 'string'
	},
	{
		name: 'vslNm',
		type: 'string'
	},
	{
		name: 'atb',
		type: 'string'
	},
	{
		name: 'atu',
		type: 'string'
	},
	{
		name: 'category1',
		type: 'string'
	},
	{
		name: 'category1Nm',
		type: 'string'
	},
	{
		name: 'category2',
		type: 'string'
	},
	{
		name: 'category2Nm',
		type: 'string'
	},
	{
		name: 'category3',
		type: 'string'
	},
	{
		name: 'category3Nm',
		type: 'string'
	},
	{
		name: 'svcDtTp',
		type: 'string'
	},
	{
		name: 'dt1Tit',
		type: 'string'
	},
	{
		name: 'dt1Chk',
		type: 'string'
	},
	{
		name: 'dt1Tp',
		type: 'string'
	},
	{
		name: 'dt1Fm',
		type: 'string'
	},
	{
		name: 'dt1To',
		type: 'string'
	},
	{
		name: 'dt2Tit',
		type: 'string'
	},
	{
		name: 'dt2Chk',
		type: 'string'
	},
	{
		name: 'dt2Tp',
		type: 'string'
	},
	{
		name: 'dt2Fm',
		type: 'string'
	},
	{
		name: 'dt2To',
		type: 'string'
	},
	{
		name: 'shftId',
		type: 'string'
	},
	{
		name: 'unitDec',
		type: 'string'
	},
	{
		name: 'unitTit',
		type: 'string'
	},
	{
		name: 'unit',
		type: 'string'
	},
	{
		name: 'unitUomNm',
		type: 'string'
	},
	{
		name: 'unit1Chk',
		type: 'string'
	},
	{
		name: 'unit1Dec',
		type: 'string'
	},
	{
		name: 'unit1Tit',
		type: 'string'
	},
	{
		name: 'unit1',
		type: 'string'
	},
	{
		name: 'unit1UomNm',
		type: 'string'
	},
	{
		name: 'unit2Chk',
		type: 'string'
	},
	{
		name: 'unit2Dec',
		type: 'string'
	},
	{
		name: 'unit2Tit',
		type: 'string'
	},
	{
		name: 'unit2',
		type: 'string'
	},
	{
		name: 'unit2UomNm',
		type: 'string'
	},
	{
		name: 'locChk',
		type: 'string'
	},
	{
		name: 'rmkChk',
		type: 'string'
	},
	{
		name: 'cmdtyChk',
		type: 'string'
	},
	{
		name: 'documentChk',
		type: 'string'
	},
	{
		name: 'unitChk',
		type: 'string'
	},
	{
		name: 'documentTp',
		type: 'string'
	},
	{
		name: 'documentNm',
		type: 'string'
	},
	{
		name: 'lcd',
		type: 'string'
	}, 
	{
		name: 'mcd',
		type: 'string'
	}, 
	{
		name: 'scd',
		type: 'string'
	}, 
	{
		name: 'scdNm',
		type: 'string'
	}, 
	{
		name: 'scdDesc',
		type: 'string'
	},
	{
		name: 'version',
		type: 'string'
	},
	{
		name: 'lcdNm',
		type: 'string'
	},
	{
		name: 'mcdNm',
		type: 'string'
	}, 
	{
		name: 'useYn',
		type: 'string'
	},
	{
		name: 'updUserId',
		type: 'string'
	},
	{
		name: 'updDtm',
		type: 'string'	
	},
	{
		name: 'scdLgv',
		type: 'string'
	},
	{
		name:'vslCallID',
		type:'string'
	},
	{
		name:'workYmd',
		type:'string'
	},
	{
		name:'workDate',
		type:'string'
	},
	{
		name:'rsNm',
		type:'string'
	},
	{
		name:'rsQty',
		type:'string'
	},
	{
		name:'refNo',
		type:'string'
	},
	{
		name:'refYn',
		type:'string'
	},
	{
		name:'verifyStatus',
		type:'string'
	},
	{
		name:'curPage',
		type:'string'
	},
	{
		name:'rn',
		type:'string'
	},
	{
		name:'rnm',
		type:'string'
	},
	{
		name:'totalPage',
		type:'string'
	},
	{
		name:'berthLoc',
		type:'string'
	},
	{
		name:'verifyDate',
		type:'string'
	},
	{
		name:'verifyBy',
		type:'string'
	},
	{
		name:'requester',
		type:'string'
	},
	{
		name:'cnrtcd_temp',
		type:'string'
	},
	{
		name:'mbscd_temp',
		type:'string'
	},
	{
		name:'workArea',
		type:'string'
	},
	{
		name:'mbsCd',
		type:'string'
	},
	{
		name:'cnrtCd',
		type:'string'
	},
	{
		name:'operator',
		type:'string'
	},
	{
		name:'opeCompCd',
		type:'string'
	},
	{
		name:'opeCompNm',
		type:'string'
	},
	{
		name:'chagYN',
		type:'string'
	},
	{
		name:'rmk',
		type:'string'
	},
	{
		name:'divCd',
		type:'string'
	},
	{
		name:'updateId',
		type:'string'
	},
	{
		name:'workLoc',
		type:'string'
	},
	{
		name:'workLocTp',
		type:'string'
	},
	{
		name:'workLocTpNm',
		type:'string'
	},
	{
		name:'capa',
		type:'string'
	},
	{
		name:'workStDt',
		type:'string'
	},
	{
		name:'workEndDt',
		type:'string'
	},
	{
		name:'workOdrNo',
		type:'string'
	},
	{
		name:'sumitBy',
		type:'string'
	},
	{
		name:'sumitDt',
		type:'string'
	},
	{
		name:'seq',
		type:'int'
	},
	{
		name:'no',
		type:'int'
	},
	{
		name:'capaCd',
		type:'string'
	},
	{
		name:'capaDescr',
		type:'string'
	},
	{
		name:'userId',
		type:'string'
	},
	{
		name:'engNm',
		type:'string'
	},
	{
		name:'empId',
		type:'string'
	},
	{
		name:'megaNo',
		type:'string'
	},
	{
		name:'hatchNo',
		type:'string'
	},
	{
		name:'hatchDir',
		type:'string'
	},
	{
		name:'eqNo,driver',
		type:'string'
	},
	{
		name:'empNm,roleCd',
		type:'string'
	},
	{
		name:'sRoleCd',
		type:'string'
	},
	{
		name:'crud',
		type:'string'
	},
	{
		name:'IsME',
		type:'string'
	},
	{
		name:'IsFL',
		type:'string'
	},
	{
		name:'IsPC',
		type:'string'
	},
	{
		name:'IsSD',
		type:'string'
	},
	{
		name:'IsST',
		type:'string'
	},
	{
		name:'IsTR',
		type:'string'
	},
	{
		name:'atb',
		type:'string'
	},
	{
		name:'vslName',
		type:'string'
	},
	{
		name:'updateDt',
		type:'string'
	},
	{
		name:'shftNm',
		type:'string'
	},
	{
		name:'shftLb',
		type:'string'
	},
	{
		name:'shftCg',
		type:'float'
	},
	{
		name:'nosLb',
		type:'string'
	},
	{
		name:'payer',
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
		name:'purpose',
		type:'string'
	},
	{
		name:'purposeNm',
		type:'string'
	},
	{
		name:'direct',
		type:'int'
	},
	{
		name:'indirect',
		type:'int'
	},
	{
		name:'setupTime',
		type:'string'
	},
	{
		name:'cgTpCd',
		type:'string'
	},
	{
		name:'cgTpNm',
		type:'string'
	},
	{
		name:'shpCrew',
		type:'string'
	},
	{
		name:'stvdComp',
		type:'string'
	},
	{
		name:'stvdCompNm',
		type:'string'
	},
	{
		name:'nofStvdSprr',
		type:'string'
	},
	{
		name:'stvdNonTon',
		type:'string'
	},
	{
		name:'ownDivCdNm',
		type:'string'
	},
	{
		name:'mt',
		type:'string'
	},
	{
		name:'NOS_SF1',
		type:'string'
	},
	{
		name:'NOS_SF2',
		type:'string'
	},
	{
		name:'NOS_SF3',
		type:'string'
	},
	{
		name:'nosCapa',
		type:'string'
	},
	{
		name:'crudFlag',
		type:'string'
	},
	{
		name:'trfTpCdNm',
		type:'string'
	},
	{
		name:'stdPrc',
		type:'string'
	},
	{
		name:'gstTpCd',
		type:'string'
	},
	{
		name:'gstRate',
		type:'string'
	},
	{
		name:'erpCostCntCd',
		type:'string'
	},
	{
		name:'towedWgt',
		type:'string'
	},
	{
		name:'gateTicketNo',
		type:'string'
	}]
});