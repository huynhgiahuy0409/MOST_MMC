/**
* SearchDeploymentListParm.java
*
* Created on   : 2021-11-01
* Target OS    : Java VM 1.8 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           	AUTHOR      	           	REVISION    	
* 2021-11-01   		nd.hiep						1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.planning;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
 * @author nd.hiep
 *
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class SearchDeploymentListParm extends BaseBizParm {
	private String vslCallId;
    private String deplDateFrom;
    private String deplDateTo;
    private String searchType;
    private String shiftId;
    private String staffNo;
    private String staffNm;
    
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getDeplDateFrom() {
		return deplDateFrom;
	}
	public void setDeplDateFrom(String deplDateFrom) {
		this.deplDateFrom = deplDateFrom;
	}
	public String getDeplDateTo() {
		return deplDateTo;
	}
	public void setDeplDateTo(String deplDateTo) {
		this.deplDateTo = deplDateTo;
	}
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getShiftId() {
		return shiftId;
	}
	public void setShiftId(String shiftId) {
		this.shiftId = shiftId;
	}
	public String getStaffNo() {
		return staffNo;
	}
	public void setStaffNo(String staffNo) {
		this.staffNo = staffNo;
	}
	public String getStaffNm() {
		return staffNm;
	}
	public void setStaffNm(String staffNm) {
		this.staffNm = staffNm;
	}
    
}
