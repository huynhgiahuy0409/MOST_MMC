package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.dao.planning.IStaffAttendanceDao;
import com.tsb.most.biz.parm.planning.SearchStaffAttendanceParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class StaffAttendance implements IStaffAttendance {
	private IStaffAttendanceDao staffAttendanceDao;

	public void setStaffAttendanceDao(IStaffAttendanceDao staffAttendanceDao) {
		this.staffAttendanceDao = staffAttendanceDao;
	}

	public DataItemList getStaffAttendance(SearchStaffAttendanceParm parm) throws BizException {
		return staffAttendanceDao.selectStaffAttendanceVoucher(parm);
	}

	@Override
	public DataItemList updateStaffAttendanceLeaveType(UpdateItemsBizParm parm) throws BizException {
		return staffAttendanceDao.updateStaffAttendanceLeaveType(parm);
	}

	@Override
	public DataItemList getStaffAttendance4JPVC(SearchStaffAttendanceParm parm) throws BizException {
		return staffAttendanceDao.selectStaffAttendanceVoucher4JPVC(parm);
	}

}
