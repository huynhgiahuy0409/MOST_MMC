package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.dataitem.planning.StaffAttendanceItem;
import com.tsb.most.biz.parm.planning.SearchStaffAttendanceParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class StaffAttendanceDao extends BaseDao implements IStaffAttendanceDao {

	public DataItemList selectStaffAttendanceVoucher(SearchStaffAttendanceParm parm) throws DaoException {
		return unifiedDao.getItems("staffattendance.selectStaffAttendanceVoucher", parm);
	}

	public DataItemList updateStaffAttendanceLeaveType(UpdateItemsBizParm parm) throws DaoException {
		try { 
			StaffAttendanceItem staffAttendanceItem = (StaffAttendanceItem) parm.getUpdateItem();
			DataItemList updateItems = new DataItemList();
			updateItems.add(staffAttendanceItem);
			
			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "staffattendance.updateStaffAttendanceDayType", updateItems);
			setVersion(updateItems);
			
			return updateItems;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}
	
	public DataItemList selectStaffAttendanceVoucher4JPVC(SearchStaffAttendanceParm parm) throws DaoException {
		return unifiedDao.getItems("staffattendance.selectStaffAttendanceVoucher4JPVC", parm);
	} 
	/* 

	public Integer countExistingOTVouchers(SearchStaffAttendanceParm parm) throws DaoException {
		return 0;
	}

	public DataItemList checkValidation(SearchStaffAttendanceParm parm) throws DaoException {
		return unifiedDao.selectItems("StaffAttendance.checkValidation", parm);
	}

	public DataItemList validateWorkDate(SearchStaffAttendanceParm parm) throws DaoException {
		return unifiedDao.selectItems("StaffAttendance.validateWorkDate", parm);
	}

	public DataItemList checkDeployStatus(SearchStaffAttendanceParm parm) throws DaoException {
		return unifiedDao.selectItems("StaffAttendance.checkDeployStatus", parm);
	}

	public DataItemList getPuclicHoliday(SearchStaffAttendanceParm parm) throws DaoException {
		return unifiedDao.selectItems("StaffAttendance.getPuclicHoliday", parm);
	}

	public DataItemList getMonthlyStaffOTRpt(SearchStaffAttendanceParm parm) throws DaoException {
		return unifiedDao.selectItems("StaffAttendance.selectMonthlyStaffOTRpt", parm);
	}

	public DataItemList getDailyTimeShiftRpt(SearchStaffAttendanceParm parm) throws DaoException {
		return unifiedDao.selectItems("StaffAttendance.selectDailyTimeShiftRpt", parm);
	}

	public List getMonthlyOTVoucher(SearchStaffAttendanceParm parm) throws DaoException {
		return unifiedDao.selectItems("StaffAttendance.selectMonthlyOTVoucher", parm);
	}

	public DataItemList getWHDailyDeploymentRpt(SearchStaffAttendanceParm parm) throws DaoException {
		return unifiedDao.selectItems("StaffAttendance.selectWHDailyDeploymentRpt", parm);
	}

	public DataItemList getStaffAttendanceSummary(SearchStaffAttendanceParm parm) throws DaoException {
		return unifiedDao.selectItems("StaffAttendance.selectStaffAttendanceSum", parm);
	}

	public DataItemList getStaffAttendanceSumDtl(SearchStaffAttendanceParm parm) throws DaoException {
		parm.setTest1(parm.getCurPage() * parm.getPageSize() + 1);
		parm.setTest2((parm.getCurPage() + 1) * parm.getPageSize());
		return unifiedDao.selectItems("StaffAttendance.selectStaffAttendanceSumDtl", parm);
	}

	public String countStaffAttendanceSumDtl(SearchStaffAttendanceParm parm) throws DaoException {
		return null;
	}

	public DataItemList getStaffAttendanceReportList(SearchStaffAttendanceParm parm) throws DaoException {
		parm.setTest1(parm.getCurPage() * parm.getPageSize() + 1);
		parm.setTest2((parm.getCurPage() + 1) * parm.getPageSize());
		return unifiedDao.selectItems("StaffAttendance.selectStaffAttendanceReportList", parm);
	}

	public DataItemList getAllStaffAttendanceReportList(SearchStaffAttendanceParm parm) throws DaoException {
		return unifiedDao.selectItems("StaffAttendance.selectAllStaffAttendanceReportList", parm);
	}

	public DataItemList getStaffAttendanceDaily(SearchStaffAttendanceParm parm) throws DaoException {
		return unifiedDao.selectItems("StaffAttendance.selectStaffAttendanceDaily", parm);
	}

	public String countStaffAttendanceReport(SearchStaffAttendanceParm parm) throws DaoException {
		return null;
	}

	public DataItemList getStaffAttendanceReport(SearchStaffAttendanceParm parm) throws DaoException {
		DataItemList rtnList = null;
		if ("RCS003".equals(parm.getSearchType())) {
			rtnList = unifiedDao.selectItems("StaffAttendance.selectStaffAttendanceVoucherRpt", parm);
		} else if ("RCS004".equals(parm.getSearchType())) {
			rtnList = unifiedDao.selectItems("StaffAttendance.selectMonthlyStaffOTRpt", parm);
		} else if ("RCS025".equals(parm.getSearchType())) {
			rtnList = unifiedDao.selectItems("StaffAttendance.selectDailyTimeShiftRpt", parm);
		} else if ("RCS026".equals(parm.getSearchType())) {
			rtnList = new ArrayList();

			List arr1 = unifiedDao.selectItems("StaffAttendance.selectMonthlyOTVoucherLst", parm);
			List arr2 = unifiedDao.selectItems("StaffAttendance.selectMonthlyOTVoucherAllowance", parm);
			rtnList.add(arr1);
			rtnList.add(arr2);
		}
		return rtnList;
	}

	public DataItemList getStandardShifts(SearchStaffAttendanceParm parm) throws DaoException {
		return unifiedDao.selectItems("StaffAttendance.selectStandardShifts", parm);
	}

	public String getShiftIdByShiftIdx(int shiftIdx) throws DaoException {
		return null;
	}

	public String getNormalShiftPurposeTpCd(StaffAttendanceItem parm) throws DaoException {
		return null;
	}

	public VesselServiceReportItem getVesselServiceReportItem(VesselServiceReportItem parm) throws DaoException {
		return null;
	}

	public String getVslCallIdFromNormalShift(StaffAttendanceItem parm) throws DaoException {
		return null;
	}

	public int insertStaffAttendance(TxTraceInfo info, DataItemCollection col) throws DaoException {
		return unifiedDao.insertItems(info, "StaffAttendance.insertStaffAttendance", col);
	}

	public int deleteOffDayVouchers(TxTraceInfo info, DataItemCollection col) throws DaoException {
		return unifiedDao.deleteItems(info, "StaffAttendance.deleteOffDayVouchers", col);
	}

	public int insertOffDayVouchers(TxTraceInfo info, DataItemCollection col) throws DaoException {
		int affectRow = 0;
		affectRow = unifiedDao.insertItems(info, "StaffAttendance.insertOffDayVouchers", col);
		affectRow = unifiedDao.insertItems(info, "StaffAttendance.deleteStaffInGroup", col);
		return affectRow;
	}

	public int updateStaffAttendanceVoucher(TxTraceInfo info, DataItemCollection col) throws DaoException {
		return unifiedDao.updateItems(info, "StaffAttendance.updateStaffAttendance", col);
	}

	public int deleteStaffAttendanceVoucher(TxTraceInfo info, DataItemCollection col) throws DaoException {
		return unifiedDao.deleteItems(info, "StaffAttendance.deleteStaffAttendance", col);
	}

	public int deleteStaffAttendanceDayTpVouchers(TxTraceInfo info, DataItemCollection col) throws DaoException {
		return unifiedDao.deleteItems(info, "StaffAttendance.deleteStaffAttendanceDayTpVoucher", col);
	}

	public int deleteStaffAttendanceOTVouchers(TxTraceInfo info, DataItemCollection col) throws DaoException {
		return unifiedDao.deleteItems(info, "StaffAttendance.deleteStaffAttendanceOTVoucher", col);
	}

	public int insertStaffAttendanceSum(TxTraceInfo txTraceInfo, DataItemCollection items) throws DaoException {
		int affectRow = 0;
		StaffAttendanceItem item = (StaffAttendanceItem) items.get(0);
		if ("Y".equals(item.getTransferType())) {
			affectRow = unifiedDao.insertItems(txTraceInfo, "StaffAttendance.insertStaffAttendanceSumByStaffNo", items);
		} else {
			affectRow = unifiedDao.insertItems(txTraceInfo, "StaffAttendance.insertStaffAttendanceSum", items);
		}
		return affectRow;
	}

	public int insertStaffAttendanceSum4HRMS(TxTraceInfo txTraceInfo, DataItemCollection items) throws DaoException {
		return unifiedDao.insertItems(txTraceInfo, "StaffAttendance.insertStaffAttendanceSum4HRMS", items);
	}

	public int insertStaffAttendanceSum4HRMSIncentive(TxTraceInfo txTraceInfo, DataItemCollection items)
			throws DaoException {
		return unifiedDao.insertItems(txTraceInfo, "StaffAttendance.insertStaffAttendanceSum4HRMSIncentive", items);
	}

	public int updateStaffAttendanceSum(TxTraceInfo txTraceInfo, DataItemCollection items) throws DaoException {
		return unifiedDao.updateItems(txTraceInfo, "StaffAttendance.updateStaffAttendanceSum", items);
	}

	public List getDailyTimeShift(SearchStaffAttendanceParm parm) throws DaoException {
		return unifiedDao.selectItems("StaffAttendance.selectgetDailyTimeShift", parm);
	}
	*/
}