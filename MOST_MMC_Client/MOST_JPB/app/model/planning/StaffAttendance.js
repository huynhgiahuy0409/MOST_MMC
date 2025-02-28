Ext.define('MOST.model.planning.StaffAttendance', {
	extend: 'MOST.model.foundation.dataitem.DataItem',
	fields: [
		{
			name: 'rosterShift',
			type: 'string'
		},
		{
			name: 'groupNm',
			type: 'string'
		},
		{
			name: 'roster',
			type: 'string'
		},
		{
			name: 'hiddenEmpId',
			type: 'string'
		},
		{
			name: 'bulkGantry',
			type: 'string'
		},
		{
			name: 'no',
			type: 'string'
		},
		{
			name: 'seq',
			type: 'string'
		},
		{
			name: 'staffNo',
			type: 'string'
		},
		{
			name: 'dspStaffNo',
			type: 'string'
		},
		{
			name: 'staffNm',
			type: 'string'
		},
		{
			name: 'role',
			type: 'string'
		},
		{
			name: 'roleNm',
			type: 'string'
		},
		{
			name: 'vslCallId',
			type: 'string'
		},
		{
			name: 'vslNm',
			type: 'string'
		},
		{
			name: 'shiftId',
			type: 'string'
		},
		{
			name: 'shiftNm',
			type: 'string'
		},
		{
			name: 'dayTp',
			type: 'string'
		},
		{
			name: 'dayTpNm',
			type: 'string'
		},
		{
			name: 'fmTime',
			type: 'string'
		},
		{
			name: 'toTime',
			type: 'string'
		},
		{
			name: 'workHrs',
			type: 'string'
		},
		{
			name: 'otFmTime',
			type: 'string'
		},
		{
			name: 'otToTime',
			type: 'string'
		},
		{
			name: 'otHrs',
			type: 'string'
		},
		{
			name: 'isFrday',
			type: 'string'
		},
		{
			name: 'isSixTurn',
			type: 'string'
		},
		{
			name: 'ma',
			type: 'string'
		},
		{
			name: 'ea',
			type: 'string'
		},
		{
			name: 'incentive',
			type: 'string'
		},
		{
			name: 'berthUnberthing',
			type: 'string'
		},
		{
			name: 'updUserId',
			type: 'string'
		},
		{
			name: 'updDate',
			type: 'string'
		},
		{
			name: 'isPublicHoliday',
			type: 'string'
		},
		{
			name: 'secondShft',
			type: 'string'
		},
		{
			name: 'thirdShft',
			type: 'string'
		},
		{
			name: 'transferType',
			type: 'string'
		},
		{
			name: 'purpose',
			type: 'string'
		},
		{
			name: 'changeShft',
			type: 'string'
		},
		{
			name: 'purpType',
			type: 'string'
		},
		{
			name: 'purpTpCdNm',
			type: 'string'
		},
		{
			name: 'grp',
			type: 'string'
		},
		{
			name: 'curPage',
			type: 'string'
		},
		{
			name: 'rn',
			type: 'string'
		},
		{
			name: 'totalPage',
			type: 'string'
		},
		{
			name: 'otFactor',
			type: 'string'
		},
		{
			name: 'fmHhMm',
			type: 'string'
		},
		{
			name: 'toHhMm',
			type: 'string'
		},
		{
			name: 'workCd',
			type: 'string'
		},
		{
			name: 'workCdNm',
			type: 'string'
		},
		{
			name: 'workNm',
			type: 'string'
		},
		{
			name: 'workYmd',
			type: 'string'
		},
		{
			name: 'dspWorkYmd',
			type: 'string'
		},
		{
			name: 'rsDivCd',
			type: 'string'
		},
		{
			name: 'purpTpCd',
			type: 'string'
		},
		{
			name: 'rsnCd',
			type: 'string'
		},
		{
			name: 'rsnNm',
			type: 'string'
		},
		{
			name: 'otFmHhMm',
			type: 'string'
		},
		{
			name: 'otToHhMm',
			type: 'string'
		},
		{
			name: 'opeComp',
			type: 'string'
		},
		{
			name: 'oprQty',
			type: 'string'
		},
		{
			name: 'dayWork',
			type: 'string'
		},
		{
			name: 'isFriday',
			type: 'string'
		},
		{
			name: 'saveType',
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
			name: 'tempCompare',
			type: 'string'
		},
		{
			name: 'normalShiftId',
			type: 'string'
		},
		{
			name: 'normalShiftIdx',
			type: 'integer'
		},
		{
			name: 'normalShift',
			type: 'string'
		},
		{
			name: 'ot1stFrom',
			type: 'string'
		},
		{
			name: 'ot1stTo',
			type: 'string'
		},
		{
			name: 'ot1stHours',
			type: 'string'
		},
		{
			name: 'ot2ndFrom',
			type: 'string'
		},
		{
			name: 'ot2ndTo',
			type: 'string'
		},
		{
			name: 'ot2ndHours',
			type: 'string'
		},
		{
			name: 'ot3rdFrom',
			type: 'string'
		},
		{
			name: 'ot3rdTo',
			type: 'string'
		},
		{
			name: 'ot3rdHours',
			type: 'string'
		},
		{
			name: 'fridayFrom',
			type: 'string'
		},
		{
			name: 'fridayTo',
			type: 'string'
		},
		{
			name: 'fridayHours',
			type: 'string'
		},
		{
			name: 'workLoc',
			type: 'string'
		},
		{
			name: 'userId',
			type: 'string'
		}
	]
});