Ext.define('MOST.model.planning.ConfirmationSlip', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
	{
		name:'vslCallId',
		type:'string'
	},
	{
		name:'opeTpCd',
		type:'string'
	},
	{
		name:'shreTk',
		type:'string'
	},
	{
		name:'nofLines',
		type:'int'
	},
	{
		name:'dschHoseQty',
		type:'int'
	},
	{
		name:'loadHoseQty',
		type:'int'
	},
	{
		name:'dschArmQty',
		type:'int'
	},
	{
		name:'loadArmQty',
		type:'int'
	},
	{
		name:'sumitDt',
		type: 'date',
		dateFormat: 'time'
	},
	{
		name:'tempRedyDt',
		type: 'date',
		dateFormat: 'time'
	},
	{
		name:'docRedyDt',
		type: 'date',
		dateFormat: 'time'
	},
	{
		name:'cgRedyDt',
		type: 'date',
		dateFormat: 'time'
	},
	{
		name:'ultgRedyDt',
		type: 'date',
		dateFormat: 'time'
	},
	{
		name:'tkRedyDt',
		type: 'date',
		dateFormat: 'time'
	},
	{
		name:'fileCatgCd',
		type:'string'
	},
	{
		name:'shipper',
		type:'string'
	},
	{
		name:'csStatus',
		type:'string'
	},
	{
		name:'consignee',
		type:'string'
	},
	{
		name:'forwarder',
		type:'string'
	},
	{
		name:'seq',
		type:'int'
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
		name:'cmdtCd',
		type:'string'
	},
	{
		name:'cmdtCdNm',
		type:'string'
	},
	{
		name:'opeHr',
		type:'float'
	},
	{
		name:'workDd',
		type:'int'
	},
	{
		name:'workHatchNo',
		type:'string'
	},
	{
		name:'wgt',
		type:'float'
	},
	{
		name:'msrmt',
		type:'float'
	},
	{
		name:'qty',
		type:'float'
	},
	{
		name:'pkgTpCd',
		type:'string'
	},
	{
		name:'clnCd',
		type:'string'
	},
	{
		name:'topCgCd',
		type:'string'
	},
	{
		name:'topCln',
		type:'string'
	},
	{
		name:'tmnlOpr',
		type:'string'
	},
	{
		name:'shprCnsne',
		type:'string'
	},
	{
		name:'unno',
		type:'string'
	},
	{
		name:'imdg',
		type:'string'
	},
	{
		name:'fdest',
		type:'string'
	},
	{
		name:'crc',
		type:'int'
	},
	{
		name:'tkNo',
		type:'string'
	},
	{
		name:'blNo',
		type:'string'
	},
	{
		name:'dgTol',
		type:'string'
	},
	{
		name:'dgSeq',
		type:'string'
	},
	{
		name:'dgChk',
		type:'string'
	},
	{
		name:'cgOptTpCd',
		type:'string'
	},
	{
		name:'cgOptTpNm',
		type:'string'
	},
	{
		name:'opeTpNm',
		type:'string'
	},
	{
		name:'priorityYn',
		type:'string'
	},
	{
		name:'mthrVslCallId',
		type:'string'
	},
	{
		name:'dbYn',
		type:'string'
	},
	{
		name:'pol',
		type:'string'
	},
	{
		name:'cnsne',
		type:'string'
	},
	{
		name:'opeType',
		type:'string'
	},
	{
		name:'items',
		mapping: 'confirmaSlipMap'
	},
	{
		name:'uploadItems',
		mapping: 'confirmaSlipUploadMap'
	},
	{
		name:'dgItems',
		mapping: 'dgItemsMap'
	},
	{
		name: 'remark',
		type: 'string'
	},
	{
		name:'cnsneNm',
		type:'string'
	},
	{
		name:'cnsneAddr',
		type:'string'
	},
	{
		name:'shpNm',
		type:'string'
	},
	{
		name:'shpAddr',
		type:'string'
	},
	{
		name:'pkgTpNm',
		type:'string'
	}
	],
	
	hasOne: [
        {
        	name: 'vesselScheduleListDetail',
	        model: 'MOST.model.planning.VesselSchedule',
	        associationKey: 'vesselScheduleListDetail',
	        associatedName: 'vesselScheduleListDetailName'
        }
    ],

    associations: [{
		type: 'hasMany',
		name: 'confirmaSlipMap',
		model: 'MOST.model.planning.ConfirmationSlip'
	}, {
		type: 'hasMany',
		name: 'confirmaSlipUploadMap',
		model: 'MOST.model.common.FileUpload'
	},
	],
	associations: [{
		type: 'hasMany',
		name: 'dgItemsMap',
		model: 'MOST.model.document.DGDeclaration'
	}]
});