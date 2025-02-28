Ext.define('MOST.model.configuration.EquipmentConfiguration', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	fields: [
		{
			name:'eqTpCd',
			type:'string'
		},
		{
			name:'useYN',
			type:'string'
		},
		{
			name:'contractor',
			type:'string'
		},
		{
			name:'eqFacNo',
			type:'string'
		},
		{
			name:'eqFacNm',
			type:'string'
		},
		{
			name:'divCd',
			type:'string'
		},
		{
			name:'loc',
			type:'string'
		},
		{
			name:'mdl',
			type:'string'
		},
		{
			name:'pductYear',
			type:'string'
		},
		{
			name:'fileRef1',
			type:'string'
		},
		{
			name:'fileRef2',
			type:'string'
		},
		{
			name:'avgHm',
			type:'int'
		},
		{
			name:'rmk',
			type:'string'
		},
		{
			name:'statCd',
			type:'string'
		},
		{
			name:'stopRsnCd',
			type:'string'
		},
		{
			name:'statNm',
			type:'string'
		},
		{
			name:'eqTpCdNm',
			type:'string'
		},
		{
			name:'searchType',
			type:'string'
		},
		{
			name:'userId',
			type:'string'
		},
		{
			name:'no',
			type:'string'
		},
		{
			name:'chk',
			type:'string'
		},
		{
			name:'instlYmd',
			type: 'string'
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
			name:'purpCd',
			type:'string'
		},
		{
			name:'mkrCd',
			type:'string'
		},
		{
			name:'mkrNm',
			type:'string'
		},
		{
			name:'ownDivCd',
			type:'string'
		},
		{
			name:'locId',
			type:'string'
		},
		{
			name:'locNm',
			type:'string'
		},
		{
			name:'uploadItems',
			mapping: 'equipmentUploadMap'
		},
		{
			name:'workingStatus',
			type:'string'
		},
		{
			name:'diameter',
			type:'string'
		},
		{
			name:'safetyLimit',
			type:'string'
		},
		{
			name:'workingStatus',
			type:'string'
		},
		{
			name:'workingStatus',
			type:'string'
		},
		{
			name: 'wharfMarkSta',
			type: 'number'
		},
		{
			name: 'wharfMarkEnd',
			type: 'number'
		},
		{
			name: 'periodSt',
			type: 'date'
		},
		{
			name: 'periodEd',
			type: 'date'
		}
		
		],
		
		associations: [{
			type: 'hasMany',
			name: 'equipmentUploadMap',
			model: 'MOST.model.common.FileUpload'
		}]
});
