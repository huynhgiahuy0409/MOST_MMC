package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.parm.planning.SearchStaffAttendanceParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IStaffAttendance {
	public DataItemList getStaffAttendance(SearchStaffAttendanceParm parm) throws BizException;

	public DataItemList updateStaffAttendanceLeaveType(UpdateItemsBizParm parm) throws BizException;
	
	public DataItemList getStaffAttendance4JPVC(SearchStaffAttendanceParm parm) throws BizException;
}
