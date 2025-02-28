package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchStaffAttendanceParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IStaffAttendanceDao {

	public DataItemList selectStaffAttendanceVoucher(SearchStaffAttendanceParm parm) throws DaoException;

	public DataItemList updateStaffAttendanceLeaveType(UpdateItemsBizParm parm) throws DaoException;
	
	public DataItemList selectStaffAttendanceVoucher4JPVC(SearchStaffAttendanceParm parm) throws DaoException;
	
	/*
	
	public DataItemList getMonthlyStaffOTRpt(SearchStaffAttendanceParm parm) throws DaoException;

	public DataItemList getDailyTimeShiftRpt(SearchStaffAttendanceParm parm) throws DaoException;

	public DataItemList getMonthlyOTVoucher(SearchStaffAttendanceParm parm) throws DaoException;

	public DataItemList getWHDailyDeploymentRpt(SearchStaffAttendanceParm parm) throws DaoException;

	public DataItemList getStaffAttendanceSummary(SearchStaffAttendanceParm parm) throws DaoException;

	public DataItemList getStaffAttendanceSumDtl(SearchStaffAttendanceParm parm) throws DaoException;

	public DataItemList getStaffAttendanceReportDataItemList(SearchStaffAttendanceParm parm) throws DaoException;

	public DataItemList getStaffAttendanceReport(SearchStaffAttendanceParm parm) throws DaoException;

	public DataItemList checkValidation(SearchStaffAttendanceParm parm) throws DaoException;

	public DataItemList validateWorkDate(SearchStaffAttendanceParm parm) throws DaoException;

	public DataItemList checkDeployStatus(SearchStaffAttendanceParm parm) throws DaoException;

	public DataItemList getPuclicHoliday(SearchStaffAttendanceParm parm) throws DaoException;

	public DataItemList getStaffAttendanceDaily(SearchStaffAttendanceParm parm) throws DaoException;

	public DataItemList getStandardShifts(SearchStaffAttendanceParm parm) throws DaoException;

	public String getShiftIdByShiftIdx(int shiftIdx) throws DaoException;

	public Integer countExistingOTVouchers(SearchStaffAttendanceParm parm) throws DaoException;

	public String getNormalShiftPurposeTpCd(StaffAttendanceItem parm) throws DaoException;

	public String getVslCallIdFromNormalShift(StaffAttendanceItem parm) throws DaoException;

	public VesselServiceReportItem getVesselServiceReportItem(VesselServiceReportItem parm) throws DaoException;

	public String countStaffAttendanceReport(SearchStaffAttendanceParm parm) throws DaoException;

	public String countStaffAttendanceSumDtl(SearchStaffAttendanceParm parm) throws DaoException;

	public DataItemList getDailyTimeShift(SearchStaffAttendanceParm parm) throws DaoException;

	public DataItemList getAllStaffAttendanceReportList(SearchStaffAttendanceParm parm) throws DaoException;

	public int insertStaffAttendance(TxTraceInfo info, DataItemCollection col) throws DaoException;

	public int updateStaffAttendanceVoucher(TxTraceInfo info, DataItemCollection col) throws DaoException;

	public int deleteStaffAttendanceVoucher(TxTraceInfo info, DataItemCollection col) throws DaoException;

	public int deleteStaffAttendanceOTVouchers(TxTraceInfo info, DataItemCollection col) throws DaoException;

	public int deleteStaffAttendanceDayTpVouchers(TxTraceInfo info, DataItemCollection col) throws DaoException;

	public int deleteOffDayVouchers(TxTraceInfo info, DataItemCollection col) throws DaoException;

	public int insertOffDayVouchers(TxTraceInfo info, DataItemCollection col) throws DaoException;

	public int insertStaffAttendanceSum(TxTraceInfo info, DataItemCollection items) throws DaoException;

	public int updateStaffAttendanceSum(TxTraceInfo info, DataItemCollection items) throws DaoException;

	public int insertStaffAttendanceSum4HRMS(TxTraceInfo info, DataItemCollection items) throws DaoException;

	public int insertStaffAttendanceSum4HRMSIncentive(TxTraceInfo info, DataItemCollection items) throws DaoException;

	public int updateStaffAttendanceLeaveType(TxTraceInfo txTraceInfo, DataItemCollection items) throws DaoException;
	*/
}
