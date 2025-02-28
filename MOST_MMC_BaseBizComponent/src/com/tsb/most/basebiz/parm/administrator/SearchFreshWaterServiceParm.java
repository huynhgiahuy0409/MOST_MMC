package com.tsb.most.basebiz.parm.administrator;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchFreshWaterServiceParm extends BaseBizParm{
	private String vslCallId;
	private String scn;
	private String statCd;
	private String splyStDt;
	private String splyEndDt;
	private String prcTpCd;
	private String arrvSaId;
	private String userRole;
	private String searchType;
	private String alertYn;
	private String splyReq;
	private String splyEndReq;
	private String unitPrc;
	private String docNo;
	private String ptnrCd;
	private String rptNo;
	private String loc;
	private String chargeAmt;
	private String chargeRm;
	private String chargeTon;
    public String getDocNo() {
        return docNo;
    }
    public void setDocNo(String docNo) {
        this.docNo = docNo;
    }
    /**
     * @return Returns the alertYn.
     */
    public String getAlertYn() {
        return alertYn;
    }
    /**
     * @param alertYn The alertYn to set.
     */
    public void setAlertYn(String alertYn) {
        this.alertYn = alertYn;
    }
    /**
     * @return Returns the arrvSaId.
     */
    public String getArrvSaId() {
        return arrvSaId;
    }
    /**
     * @param arrvSaId The arrvSaId to set.
     */
    public void setArrvSaId(String arrvSaId) {
        this.arrvSaId = arrvSaId;
    }
    /**
     * @return Returns the prcTpCd.
     */
    public String getPrcTpCd() {
        return prcTpCd;
    }
    /**
     * @param prcTpCd The prcTpCd to set.
     */
    public void setPrcTpCd(String prcTpCd) {
        this.prcTpCd = prcTpCd;
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
     * @return Returns the splyEndDt.
     */
    public String getSplyEndDt() {
        return splyEndDt;
    }
    /**
     * @param splyEndDt The splyEndDt to set.
     */
    public void setSplyEndDt(String splyEndDt) {
        this.splyEndDt = splyEndDt;
    }
    /**
     * @return Returns the splyStDt.
     */
    public String getSplyStDt() {
        return splyStDt;
    }
    /**
     * @param splyStDt The splyStDt to set.
     */
    public void setSplyStDt(String splyStDt) {
        this.splyStDt = splyStDt;
    }
    /**
     * @return Returns the statCd.
     */
    public String getStatCd() {
        return statCd;
    }
    /**
     * @param statCd The statCd to set.
     */
    public void setStatCd(String statCd) {
        this.statCd = statCd;
    }
    /**
     * @return Returns the userRole.
     */
    public String getUserRole() {
        return userRole;
    }
    /**
     * @param userRole The userRole to set.
     */
    public void setUserRole(String userRole) {
        this.userRole = userRole;
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
    public String getSplyReq() {
        return splyReq;
    }
    public void setSplyReq(String splyReq) {
        this.splyReq = splyReq;
    }
    public String getSplyEndReq() {
        return splyEndReq;
    }
    public void setSplyEndReq(String splyEndReq) {
        this.splyEndReq = splyEndReq;
    }
    public String getUnitPrc() {
        return unitPrc;
    }
    public void setUnitPrc(String unitPrc) {
        this.unitPrc = unitPrc;
    }
	public String getPtnrCd() {
		return ptnrCd;
	}
	public void setPtnrCd(String ptnrCd) {
		this.ptnrCd = ptnrCd;
	}
	public String getRptNo() {
		return rptNo;
	}
	public void setRptNo(String rptNo) {
		this.rptNo = rptNo;
	}
	public String getLoc() {
		return loc;
	}
	public void setLoc(String loc) {
		this.loc = loc;
	}
	public String getChargeAmt() {
		return chargeAmt;
	}
	public void setChargeAmt(String chargeAmt) {
		this.chargeAmt = chargeAmt;
	}
	public String getChargeRm() {
		return chargeRm;
	}
	public void setChargeRm(String chargeRm) {
		this.chargeRm = chargeRm;
	}
	public String getChargeTon() {
		return chargeTon;
	}
	public void setChargeTon(String chargeTon) {
		this.chargeTon = chargeTon;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
}
