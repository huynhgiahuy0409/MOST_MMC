Ext.define('MOST.model.document.TruckAssignment', {
	extend : 'MOST.model.foundation.dataitem.DataItem',
	
	fields: [
		{
			name:'vslCallId',
			type:'string'
		},
		{
			name:'vslCd',
			type:'string'
		},
		{
			name:'callYear',
			type:'string'
		},
		{
			name:'callSeq',
			type:'string'
		},
		{
			name:'transport',
			type:'string'
		},
		{
			name:'ptnrCd',
			type:'string'
		},
		{
			name:'cd',
			type:'string'
		},
		{
			name:'cdNm',
			type:'string'
		},
		{
			name:'tyCd',
			type:'string'
		},
		{
			name:'seq',
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
			name:'lorryId',
			type:'string'
		},
		{
			name:'driverNm',
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
			name:'shipgNoteNo',
			type:'string'
		},
		{
			name:'blNo',
			type:'string'
		},
		{
			name:'delvTpCd',
			type:'string'
		},
		{
			name:'cmdtCd',
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
			name:'tsptr',
			type:'string'
		},
		{
			name:'tsptrNm',
			type:'string'
		},
		{
			name:'snBlNo',
			type:'string'
		},
		{
			name:'lorryTsptr',
			type:'string'
		},
		{
			name:'driverTsptr',
			type:'string'
		},
		{
			name:'doNo',
			type:'string'
		},
		{
			name:'grNo',
			type:'string'
		},
		{
			name:'dmt',
			type:'string'
		},
		{
			name:'dm3',
			type:'string'
		},
		{
			name:'dqty',
			type:'string'
		},
		{
			name:'pkgqty',
			type:'string'
		},
		{
			name:'wgt',
			type:'string'
		},
		{
			name:'vol',
			type:'string'
		},
		{
			name:'workingStatus',
			type:'string'
		},
		{
			name:'divCd',
			type:'string'
		},
		{
			name:'blNoList',
			mapping:'OwnArrayMap'
		},
		{
			name:'blItems',
			mapping:'OwnArrayMap'
		},
		{
			name:'shippingNoteItems',
			mapping:'OwnArrayMap'
		},
		{
			name:'assignmentLorrysList',
			mapping:'OwnArrayMap'
		},
		{
			name:'chassisNo',
			mapping:'string'
		},
		{
			name:'allowWgt',
			mapping:'string'
		},
		{
			name:'allowWgtVal',
			mapping:'string'
		},
		{
			name:'truckMode',
			mapping:'string'
		},
		{
			name:'subDoNo',
			mapping:'string'
		},
		{
			name:'permitYn',
			mapping:'string'
		},
		{
			name:'wbIfYn',
			mapping:'string'
		},
		{
			name:'customsReleasedYn',
			mapping:'string'
		},
		
		{
			name:'sdoNo',
			mapping:'string'
		},
		{
			name:'mfDocId',
			mapping:'string'
		},
		{
			name:'gateTxnNo',
			mapping:'string'
		},
		{
			name:'wbTransactionNo',
			mapping:'string'
		},
		{
			name:'weightCheckYn',
			mapping:'string'
		},
		{
			name:'gateInDate',
			mapping:'string'
		},
		{
			name:'gateOutDate',
			mapping:'string'
		},
		{
			name:'firstWgt',
			mapping:'string'
		},
		{
			name:'secondWgt',
			mapping:'string'
		},
		{
			name:'uploadItems',
			mapping: 'uploadMap'
		},
		{
			name:'truckVerify',
			mapping: 'string'
		},
		{
			name:'chassisVerify',
			mapping: 'string'
		},
		{
			name:'masterBlNo',
			mapping: 'string'
		},
		{
			name:'imtNo',
			mapping: 'string'
		}
	],
	
	associations: [{
		type: 'hasMany',
		name: 'uploadMap',
		model: 'MOST.model.common.FileUpload'
	}]

});
