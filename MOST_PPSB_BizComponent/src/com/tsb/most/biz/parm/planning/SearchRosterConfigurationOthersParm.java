/**
* RosterSetupParm.java
*
* Created on   : 2007-09-30
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-09-30 Mr Tonny Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.planning;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
* use RosterSetupParm Class as parameters to search  
*
* @author Mr Tonny Kim
* @version 1.0
*
* @see 
*/
public class SearchRosterConfigurationOthersParm extends BaseBizParm {
    
    private String rstrYmd;
    private String cmDivCd;
    private int seq;
    private String vslCallId;
    private String roleCd;
    private String searchType; //cond : condition, list : search list
    private String scdLgv;     //VO : Vessel Operation, NV : None Vessel Operation
    private String workLocCd;  //OE : Office, NE : Non-Office
    private String col1;       //RV : Roster Setup View, MV : Mega View
    private String doffYmd;
    private String rsnCd;
    private String shftMethCd;
    private String costCentCd;
    private String calendar;
    private String startDate;
    private String endDate;
    private String exportTp;
    private String empId;
    private String shftId;
    private String userId;
    
    private String bbtYn;
    
    private String unitDiv;
    private String shftDivCd;

    //staff management
    private String viewType;	//'log':Unavailable Log for Staff Grid
    							//'edit':Shift Group Definition
								//'manager':Internal Staff Management
    							//'mega':Mega Condition
    private String userName;
    private String conttDiv;
    private String useYn;
    
    //Shift Type
    private String shftGroupCd;
    private String chkItemCd;
    private String chkItemNm;
    private String fromDate;
    private String toDate;
    private String page;
    private String tUserId;
    
    public String getShftDivCd() {
		return shftDivCd;
	}

	public void setShftDivCd(String shftDivCd) {
		this.shftDivCd = shftDivCd;
	}

	public String getCalendar() {
		return calendar;
	}

    public void setCalendar(String calendar) {
		this.calendar = calendar;
	}
    public String getStartDate() {
		return startDate;
	}
    public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
    public String getEndDate() {
		return endDate;
	}
    public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
    /**
     * @return Returns the cmDivCd.
     */
    public String getCmDivCd() {
        return cmDivCd;
    }
    /**
     * @param cmDivCd The cmDivCd to set.
     */
    public void setCmDivCd(String cmDivCd) {
        this.cmDivCd = cmDivCd;
    }
    /**
     * @return Returns the col1.
     */
    public String getCol1() {
        return col1;
    }
    /**
     * @param col1 The col1 to set.
     */
    public void setCol1(String col1) {
        this.col1 = col1;
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
     * @return Returns the doffYmd.
     */
    public String getDoffYmd() {
        return doffYmd;
    }
    /**
     * @param doffYmd The doffYmd to set.
     */
    public void setDoffYmd(String doffYmd) {
        this.doffYmd = doffYmd;
    }
    /**
     * @return Returns the roleCd.
     */
    public String getRoleCd() {
        return roleCd;
    }
    /**
     * @param roleCd The roleCd to set.
     */
    public void setRoleCd(String roleCd) {
        this.roleCd = roleCd;
    }
    /**
     * @return Returns the rsnCd.
     */
    public String getRsnCd() {
        return rsnCd;
    }
    /**
     * @param rsnCd The rsnCd to set.
     */
    public void setRsnCd(String rsnCd) {
        this.rsnCd = rsnCd;
    }
    /**
     * @return Returns the rstrYmd.
     */
    public String getRstrYmd() {
        return rstrYmd;
    }
    /**
     * @param rstrYmd The rstrYmd to set.
     */
    public void setRstrYmd(String rstrYmd) {
        this.rstrYmd = rstrYmd;
    }
    /**
     * @return Returns the scdLgv.
     */
    public String getScdLgv() {
        return scdLgv;
    }
    /**
     * @param scdLgv The scdLgv to set.
     */
    public void setScdLgv(String scdLgv) {
        this.scdLgv = scdLgv;
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
     * @return Returns the seq.
     */
    public int getSeq() {
        return seq;
    }
    /**
     * @param seq The seq to set.
     */
    public void setSeq(int seq) {
        this.seq = seq;
    }
    /**
     * @return Returns the shftMethCd.
     */
    public String getShftMethCd() {
        return shftMethCd;
    }
    /**
     * @param shftMethCd The shftMethCd to set.
     */
    public void setShftMethCd(String shftMethCd) {
        this.shftMethCd = shftMethCd;
    }
    /**
     * @return Returns the vslCallId.
     */
    public String getVslCallId() {
        return vslCallId;
    }
    /**
     * @param vslCallId The vslCallId to set.
     */
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    /**
     * @return Returns the workLocCd.
     */
    public String getWorkLocCd() {
        return workLocCd;
    }
    /**
     * @param workLocCd The workLocCd to set.
     */
    public void setWorkLocCd(String workLocCd) {
        this.workLocCd = workLocCd;
    }
    public String getExportTp() {
		return exportTp;
	}
    public void setExportTp(String exportTp) {
		this.exportTp = exportTp;
	}

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public String getShftId() {
        return shftId;
    }

    public void setShftId(String shftId) {
        this.shftId = shftId;
    }

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUnitDiv() {
		return unitDiv;
	}

	public void setUnitDiv(String unitDiv) {
		this.unitDiv = unitDiv;
	}

	public String getBbtYn() {
		return bbtYn;
	}

	public void setBbtYn(String bbtYn) {
		this.bbtYn = bbtYn;
	}

	public String getViewType() {
		return viewType;
	}

	public void setViewType(String viewType) {
		this.viewType = viewType;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getConttDiv() {
		return conttDiv;
	}

	public void setConttDiv(String conttDiv) {
		this.conttDiv = conttDiv;
	}

	public String getUseYn() {
		return useYn;
	}

	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}

	public String getShftGroupCd() {
		return shftGroupCd;
	}

	public void setShftGroupCd(String shftGroupCd) {
		this.shftGroupCd = shftGroupCd;
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
}
