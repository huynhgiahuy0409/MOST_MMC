package com.tsb.most.biz.parm.planning;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchStaffAttendanceParm extends BaseBizParm {
	private static final long serialVersionUID = -231710094196797299L;

	private String workYmd;
	private String shiftId;
	private String shiftNm;
	private String searchTp;
	private String searchConditionTp;
	private String fmDt;
	private String toDt;
	private String fmStaffDt;
	private String toStaffDt;
	private String whDivCd;
	private String role;
	private String staffNo;
	private String staffNm;
	private String costCentCd;
	private String schDate;
	private String searchType;
	private String searchYear;
	private String searchMonth;
	private String isFriday;
	private String fromTime;
	private String toTime;
	private String status;
	private String pageNumber;
	private String empId;
	private int test1;
	private int test2;
	private String month;
	private String printType;

	public String getPrintType() {
		return printType;
	}

	public void setPrintType(String printType) {
		this.printType = printType;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	private String costCentCdNm;

	public int getTest1() {
		return test1;
	}

	public void setTest1(int test1) {
		this.test1 = test1;
	}

	public int getTest2() {
		return test2;
	}

	public void setTest2(int test2) {
		this.test2 = test2;
	}

	public String getEmpId() {
		return empId;
	}

	public void setEmpId(String empId) {
		this.empId = empId;
	}

	public String getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(String pageNumber) {
		this.pageNumber = pageNumber;
	}

	private String searchRadio;
	private int curPage;
	private String pagingSearchType;
	private int pageSize;

	public int getCurPage() {
		return curPage;
	}

	public void setCurPage(int curPage) {
		this.curPage = curPage;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public String getPagingSearchType() {
		return pagingSearchType;
	}

	public void setPagingSearchType(String pagingSearchType) {
		this.pagingSearchType = pagingSearchType;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getToTime() {
		return toTime;
	}

	public void setToTime(String toTime) {
		this.toTime = toTime;
	}

	public String getFromTime() {
		return fromTime;
	}

	public void setFromTime(String fromTime) {
		this.fromTime = fromTime;
	}

	public String getIsFriday() {
		return isFriday;
	}

	public void setIsFriday(String isFriday) {
		this.isFriday = isFriday;
	}

	/**
	 * @return Returns the shiftNm.
	 */
	public String getShiftNm() {
		return shiftNm;
	}

	/**
	 * @param shiftNm The shiftNm to set.
	 */
	public void setShiftNm(String shiftNm) {
		this.shiftNm = shiftNm;
	}

	/**
	 * @return Returns the costCentCd.
	 */
	public String getCostCentCd() {
		return costCentCd;
	}

	/**
	 * @param costCentCd The costCentCd to set.
	 */
	public void setCostCentCd(String costCentCd) {
		this.costCentCd = costCentCd;
	}

	/**
	 * @return Returns the fmDt.
	 */
	public String getFmDt() {
		return fmDt;
	}

	/**
	 * @param fmDt The fmDt to set.
	 */
	public void setFmDt(String fmDt) {
		this.fmDt = fmDt;
	}

	/**
	 * @return Returns the fmStaffDt.
	 */
	public String getFmStaffDt() {
		return fmStaffDt;
	}

	/**
	 * @param fmStaffDt The fmStaffDt to set.
	 */
	public void setFmStaffDt(String fmStaffDt) {
		this.fmStaffDt = fmStaffDt;
	}

	/**
	 * @return Returns the role.
	 */
	public String getRole() {
		return role;
	}

	/**
	 * @param role The role to set.
	 */
	public void setRole(String role) {
		this.role = role;
	}

	/**
	 * @return Returns the schDate.
	 */
	public String getSchDate() {
		return schDate;
	}

	/**
	 * @param schDate The schDate to set.
	 */
	public void setSchDate(String schDate) {
		this.schDate = schDate;
	}

	/**
	 * @return Returns the searchConditionTp.
	 */
	public String getSearchConditionTp() {
		return searchConditionTp;
	}

	/**
	 * @param searchConditionTp The searchConditionTp to set.
	 */
	public void setSearchConditionTp(String searchConditionTp) {
		this.searchConditionTp = searchConditionTp;
	}

	/**
	 * @return Returns the searchTp.
	 */
	public String getSearchTp() {
		return searchTp;
	}

	/**
	 * @param searchTp The searchTp to set.
	 */
	public void setSearchTp(String searchTp) {
		this.searchTp = searchTp;
	}

	/**
	 * @return Returns the searchType.
	 */
	public String getSearchType() {
		return searchType;
	}

	/**
	 * @param searchType The searchType to set.
	 */
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}

	/**
	 * @return Returns the shiftId.
	 */
	public String getShiftId() {
		return shiftId;
	}

	/**
	 * @param shiftId The shiftId to set.
	 */
	public void setShiftId(String shiftId) {
		this.shiftId = shiftId;
	}

	/**
	 * @return Returns the staffNm.
	 */
	public String getStaffNm() {
		return staffNm;
	}

	/**
	 * @param staffNm The staffNm to set.
	 */
	public void setStaffNm(String staffNm) {
		this.staffNm = staffNm;
	}

	/**
	 * @return Returns the staffNo.
	 */
	public String getStaffNo() {
		return staffNo;
	}

	/**
	 * @param staffNo The staffNo to set.
	 */
	public void setStaffNo(String staffNo) {
		this.staffNo = staffNo;
	}

	/**
	 * @return Returns the toDt.
	 */
	public String getToDt() {
		return toDt;
	}

	/**
	 * @param toDt The toDt to set.
	 */
	public void setToDt(String toDt) {
		this.toDt = toDt;
	}

	/**
	 * @return Returns the toStaffDt.
	 */
	public String getToStaffDt() {
		return toStaffDt;
	}

	/**
	 * @param toStaffDt The toStaffDt to set.
	 */
	public void setToStaffDt(String toStaffDt) {
		this.toStaffDt = toStaffDt;
	}

	/**
	 * @return Returns the whDivCd.
	 */
	public String getWhDivCd() {
		return whDivCd;
	}

	/**
	 * @param whDivCd The whDivCd to set.
	 */
	public void setWhDivCd(String whDivCd) {
		this.whDivCd = whDivCd;
	}

	/**
	 * @return Returns the workYmd.
	 */
	public String getWorkYmd() {
		return workYmd;
	}

	/**
	 * @param workYmd The workYmd to set.
	 */
	public void setWorkYmd(String workYmd) {
		this.workYmd = workYmd;
	}

	public String getSearchMonth() {
		return searchMonth;
	}

	public void setSearchMonth(String searchMonth) {
		this.searchMonth = searchMonth;
	}

	public String getSearchYear() {
		return searchYear;
	}

	public void setSearchYear(String searchYear) {
		this.searchYear = searchYear;
	}

	public String getSearchRadio() {
		return searchRadio;
	}

	public void setSearchRadio(String searchRadio) {
		this.searchRadio = searchRadio;
	}

	public String getCostCentCdNm() {
		return costCentCdNm;
	}

	public void setCostCentCdNm(String costCentCdNm) {
		this.costCentCdNm = costCentCdNm;
	}
}
