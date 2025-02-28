/**
* SearchRoRoCargoReportParm.java
*
* Created on   : 2021-08-06
* Target OS    : Java VM 1.8 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2021-08-06     nd.hiep 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.operation;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchRoRoCargoReportParm extends BaseBizParm {
	private String searchType;
	private String vslCallId;
    private String workingDate;
    private String shiftCd;
    private String rptId;
    private String printTp;
    
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getWorkingDate() {
		return workingDate;
	}
	public void setWorkingDate(String workingDate) {
		this.workingDate = workingDate;
	}
	public String getShiftCd() {
		return shiftCd;
	}
	public void setShiftCd(String shiftCd) {
		this.shiftCd = shiftCd;
	}
	public String getRptId() {
		return rptId;
	}
	public void setRptId(String rptId) {
		this.rptId = rptId;
	}
	public String getPrintTp() {
		return printTp;
	}
	public void setPrintTp(String printTp) {
		this.printTp = printTp;
	}
	
}
