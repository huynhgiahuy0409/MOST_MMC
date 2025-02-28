/**
* InternalStaffMngParm.java
*
* Created on   : 2007-09-03
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-09-03  Mr Tonny Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.basebiz.parm.configuration;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
* use InternalStaffMngParm Class as parameters to search  
*
* @author Mr Tonny Kim
* @version 1.0
*
* @see 
*/
public class SearchRosterConfigurationParm extends BaseBizParm {
    
    //Staff Management
    private String roleCd;
    private String cmDivCd;
    private String searchType;
    private String viewType;
    private String empName;
    private String conttDiv;
    private String costCentCd;
    private String useYn;
    
    //Unavailable Log for staff
    private String empId;
    private String scdLgv;		//VO : Vessel Operation, NV : None Vessel Operation
    private String col1;		//RV : Roster Setup View, MV : Mega View
    private String rsnCd;
    
    //Shift Type
    private String shftMethCd;
    private String shftGrpCd;
    private String chkItemCd;
    private String chkItemNm;
    private String fromDate;
    private String toDate;
    private String page;
    
    private String tUserId;
    
    //Group Definition
    private String shftId;
    private String divCd;
    //added by Tim 18/03/2024
    private String groupCd;
    private String plannedYmd;
    
	public String getRoleCd() {
		return roleCd;
	}
	public void setRoleCd(String roleCd) {
		this.roleCd = roleCd;
	}
	public String getCmDivCd() {
		return cmDivCd;
	}
	public void setCmDivCd(String cmDivCd) {
		this.cmDivCd = cmDivCd;
	}
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getViewType() {
		return viewType;
	}
	public void setViewType(String viewType) {
		this.viewType = viewType;
	}

	public String getConttDiv() {
		return conttDiv;
	}
	public void setConttDiv(String conttDiv) {
		this.conttDiv = conttDiv;
	}
	public String getCostCentCd() {
		return costCentCd;
	}
	public void setCostCentCd(String costCentCd) {
		this.costCentCd = costCentCd;
	}
	public String getUseYn() {
		return useYn;
	}
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}
	public String getEmpId() {
		return empId;
	}
	public void setEmpId(String empId) {
		this.empId = empId;
	}
	public String getScdLgv() {
		return scdLgv;
	}
	public void setScdLgv(String scdLgv) {
		this.scdLgv = scdLgv;
	}
	public String getCol1() {
		return col1;
	}
	public void setCol1(String col1) {
		this.col1 = col1;
	}
	public String getRsnCd() {
		return rsnCd;
	}
	public void setRsnCd(String rsnCd) {
		this.rsnCd = rsnCd;
	}
	public String getShftMethCd() {
		return shftMethCd;
	}
	public void setShftMethCd(String shftMethCd) {
		this.shftMethCd = shftMethCd;
	}
	public String getShftGrpCd() {
		return shftGrpCd;
	}
	public void setShftGrpCd(String shftGrpCd) {
		this.shftGrpCd = shftGrpCd;
	}
	public String getChkItemCd() {
		return chkItemCd;
	}
	public void setChkItemCd(String chkItemCd) {
		this.chkItemCd = chkItemCd;
	}
	public String getChkItemNm() {
		return chkItemNm;
	}
	public void setChkItemNm(String chkItemNm) {
		this.chkItemNm = chkItemNm;
	}
	public String getFromDate() {
		return fromDate;
	}
	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}
	public String getToDate() {
		return toDate;
	}
	public void setToDate(String toDate) {
		this.toDate = toDate;
	}
	public String getPage() {
		return page;
	}
	public void setPage(String page) {
		this.page = page;
	}
	public String gettUserId() {
		return tUserId;
	}
	public void settUserId(String tUserId) {
		this.tUserId = tUserId;
	}
	public String getShftId() {
		return shftId;
	}
	public void setShftId(String shftId) {
		this.shftId = shftId;
	}
	public String getDivCd() {
		return divCd;
	}
	public void setDivCd(String divCd) {
		this.divCd = divCd;
	}
	public String getEmpName() {
		return empName;
	}
	public void setEmpName(String empName) {
		this.empName = empName;
	}
	public String getGroupCd() {
		return groupCd;
	}
	public void setGroupCd(String groupCd) {
		this.groupCd = groupCd;
	}
	public String getPlannedYmd() {
		return plannedYmd;
	}
	public void setPlannedYmd(String plannedYmd) {
		this.plannedYmd = plannedYmd;
	}
}
