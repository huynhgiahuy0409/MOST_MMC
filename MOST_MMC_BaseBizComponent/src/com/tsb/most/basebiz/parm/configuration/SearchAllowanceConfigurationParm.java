/**
* CommodityCodeParm.java
*
* Created on   : 2008-03-28
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	           REVISION    	
* 2008-03-28   Miss Nam-Sook Chang 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.basebiz.parm.configuration;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchAllowanceConfigurationParm extends BaseBizParm {
	private static final long serialVersionUID = 8024612241999395188L;

	private String appType;
	private String allowance;
	private String searchType;
	private String staffId;
	private String empIdHidden;

	public String getEmpIdHidden() {
		return empIdHidden;
	}

	public void setEmpIdHidden(String empIdHidden) {
		this.empIdHidden = empIdHidden;
	}

	public String getStaffId() {
		return staffId;
	}

	public void setStaffId(String staffId) {
		this.staffId = staffId;
	}

	public String getSearchType() {
		return searchType;
	}

	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}

	public String getAllowance() {
		return allowance;
	}

	public void setAllowance(String allowance) {
		this.allowance = allowance;
	}

	public String getAppType() {
		return appType;
	}

	public void setAppType(String appType) {
		this.appType = appType;
	}
}
