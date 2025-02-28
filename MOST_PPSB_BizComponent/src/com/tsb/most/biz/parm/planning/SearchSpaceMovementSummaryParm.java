/**
* SpcMovRequestParm.java
*
* Created on   : 2008-01-28
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2008-01-28   Mr Sung-Yong Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.planning;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchSpaceMovementSummaryParm extends BaseBizParm {
    private String reqr;
    private String reqSeq;
    private String reqNo;
    private String seq;
    private String reqTpCd;
    private String statCd;
    private String reqStDt;
    private String reqEndDt;
    private String planStDt;
    private String planEndDt;
    private String vslCallId;
    private String shipgNoteNo;
    private String blNo;
    private String grNo;
    private String reqYn;
    private String searchType; //Search Type
    private Boolean isNotPlanned;
    private String jpvcTp;
    private String estArrStDt;
    private String estArrEndDt;
    private String reqPos;
    private String alertYn;
    
    private String delvTpCd;
    private String authority;
    private String cgInOutTp;
    
    private String masterBL;
    private String bookingNo;
    private String cmdtGrpCd;
    private String cngShp;
	private String pod;

	public String getAlertYn() {
        return alertYn;
    }
    public void setAlertYn(String alertYn) {
        this.alertYn = alertYn;
    }
    /**
     * @return Returns the reqPos.
     */
    public String getReqPos() {
        return reqPos;
    }
    /**
     * @param reqPos The reqPos to set.
     */
    public void setReqPos(String reqPos) {
        this.reqPos = reqPos;
    }
    /**
     * @return Returns the estArrEndDt.
     */
    public String getEstArrEndDt() {
        return estArrEndDt;
    }
    /**
     * @param estArrEndDt The estArrEndDt to set.
     */
    public void setEstArrEndDt(String estArrEndDt) {
        this.estArrEndDt = estArrEndDt;
    }
    /**
     * @return Returns the estArrStDt.
     */
    public String getEstArrStDt() {
        return estArrStDt;
    }
    /**
     * @param estArrStDt The estArrStDt to set.
     */
    public void setEstArrStDt(String estArrStDt) {
        this.estArrStDt = estArrStDt;
    }
    /**
     * @return Returns the jpvcTp.
     */
    public String getJpvcTp() {
        return jpvcTp;
    }
    /**
     * @param jpvcTp The jpvcTp to set.
     */
    public void setJpvcTp(String jpvcTp) {
        this.jpvcTp = jpvcTp;
    }
    /**
     * @return Returns the blNo.
     */
    public String getBlNo() {
        return blNo;
    }
    /**
     * @param blNo The blNo to set.
     */
    public void setBlNo(String blNo) {
        this.blNo = blNo;
    }
    /**
     * @return Returns the reqEndDt.
     */
    public String getReqEndDt() {
        return reqEndDt;
    }
    /**
     * @param reqEndDt The reqEndDt to set.
     */
    public void setReqEndDt(String reqEndDt) {
        this.reqEndDt = reqEndDt;
    }
    /**
     * @return Returns the reqNo.
     */
    public String getReqNo() {
        return reqNo;
    }
    /**
     * @param reqNo The reqNo to set.
     */
    public void setReqNo(String reqNo) {
        this.reqNo = reqNo;
    }
    /**
     * @return Returns the reqr.
     */
    public String getReqr() {
        return reqr;
    }
    /**
     * @param reqr The reqr to set.
     */
    public void setReqr(String reqr) {
        this.reqr = reqr;
    }
    /**
     * @return Returns the reqStDt.
     */
    public String getReqStDt() {
        return reqStDt;
    }
    /**
     * @param reqStDt The reqStDt to set.
     */
    public void setReqStDt(String reqStDt) {
        this.reqStDt = reqStDt;
    }
    /**
     * @return Returns the reqTpCd.
     */
    public String getReqTpCd() {
        return reqTpCd;
    }
    /**
     * @param reqTpCd The reqTpCd to set.
     */
    public void setReqTpCd(String reqTpCd) {
        this.reqTpCd = reqTpCd;
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
    public String getSeq() {
        return seq;
    }
    /**
     * @param seq The seq to set.
     */
    public void setSeq(String seq) {
        this.seq = seq;
    }
    /**
     * @return Returns the shipgNoteNo.
     */
    public String getShipgNoteNo() {
        return shipgNoteNo;
    }
    /**
     * @param shipgNoteNo The shipgNoteNo to set.
     */
    public void setShipgNoteNo(String shipgNoteNo) {
        this.shipgNoteNo = shipgNoteNo;
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
     * @return Returns the planEndDt.
     */
    public String getPlanEndDt() {
        return planEndDt;
    }
    /**
     * @param planEndDt The planEndDt to set.
     */
    public void setPlanEndDt(String planEndDt) {
        this.planEndDt = planEndDt;
    }
    /**
     * @return Returns the planStDt.
     */
    public String getPlanStDt() {
        return planStDt;
    }
    /**
     * @param planStDt The planStDt to set.
     */
    public void setPlanStDt(String planStDt) {
        this.planStDt = planStDt;
    }
    /**
     * @return Returns the reqSeq.
     */
    public String getReqSeq() {
        return reqSeq;
    }
    /**
     * @param reqSeq The reqSeq to set.
     */
    public void setReqSeq(String reqSeq) {
        this.reqSeq = reqSeq;
    }
    public String getGrNo() {
        return grNo;
    }
    public void setGrNo(String grNo) {
        this.grNo = grNo;
    }

    public String getReqYn() {
        return reqYn;
    }
    public void setReqYn(String reqYn) {
        this.reqYn = reqYn;
    }
    public Boolean getIsNotPlanned() {
        return isNotPlanned;
    }
    public void setIsNotPlanned(Boolean isNotPlanned) {
        this.isNotPlanned = isNotPlanned;
    }
	public String getDelvTpCd() {
		return delvTpCd;
	}
	public String getAuthority() {
		return authority;
	}
	public String getCgInOutTp() {
		return cgInOutTp;
	}
	public void setDelvTpCd(String delvTpCd) {
		this.delvTpCd = delvTpCd;
	}
	public void setAuthority(String authority) {
		this.authority = authority;
	}
	public void setCgInOutTp(String cgInOutTp) {
		this.cgInOutTp = cgInOutTp;
	}
	public String getMasterBL() {
		return masterBL;
	}
	public void setMasterBL(String masterBL) {
		this.masterBL = masterBL;
	}
	public String getBookingNo() {
		return bookingNo;
	}
	public void setBookingNo(String bookingNo) {
		this.bookingNo = bookingNo;
	}
	public String getCmdtGrpCd() {
		return cmdtGrpCd;
	}
	public void setCmdtGrpCd(String cmdtGrpCd) {
		this.cmdtGrpCd = cmdtGrpCd;
	}
	public String getPod() {
		return pod;
	}
	public void setPod(String pod) {
		this.pod = pod;
	}
	public String getCngShp() {
		return cngShp;
	}
	public void setCngShp(String cngShp) {
		this.cngShp = cngShp;
	}
}
